import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, DollarSign, Bookmark, ArrowRight, Target, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CandidateDashboard.css';

interface JobRecommendation {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  skills: string[];
  tags: string[];
}

const SuitableJobs: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [jobs, setJobs] = useState<JobRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopJobs = async () => {
      setIsLoading(true);
      try {
        // 1. Lấy CV mới nhất của ứng viên
        const cvResponse = await fetch('http://localhost:8000/api/ho-so-cv', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });
        const cvData = await cvResponse.json();
        const userCVs = cvData.filter((item: any) => user ? item.MaTaiKhoan.toString() === user.id : true);
        userCVs.sort((a: any, b: any) => b.MaCV - a.MaCV);

        if (userCVs.length === 0) {
          setIsLoading(false);
          return;
        }

        const latestCvId = userCVs[0].MaCV;

        // 2. Lấy gợi ý công việc cho CV này
        const recommendResponse = await fetch(`http://localhost:8000/api/ket-qua-goi-y/cv/${latestCvId}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });
        const recommendData = await recommendResponse.json();

        // Lọc bỏ Custom JD và lấy Top 4
        const topJobs = recommendData
          .filter((item: any) => item.tin_tuyen_dung && item.tin_tuyen_dung.TrangThai !== 'Custom')
          .slice(0, 4)
          .map((item: any) => {
            const job = item.tin_tuyen_dung;
            let salaryStr = 'Thoả thuận';
            if (job.LuongToiThieu && job.LuongToiDa) {
              salaryStr = `${(job.LuongToiThieu / 1000000).toFixed(0)}Tr - ${(job.LuongToiDa / 1000000).toFixed(0)}Tr`;
            } else if (job.LuongToiThieu) {
              salaryStr = `Từ ${(job.LuongToiThieu / 1000000).toFixed(0)}Tr`;
            }

            let matchedSkills: string[] = [];
            try {
                if (item.PhanTichChiTiet) {
                    const parsed = JSON.parse(item.PhanTichChiTiet);
                    if (parsed.kynang_phuhop) {
                        matchedSkills = parsed.kynang_phuhop.slice(0, 4); // Lấy tối đa 4 kỹ năng cho đẹp UI
                    }
                }
            } catch (e) {}

            return {
              id: item.MaKetQua,
              title: job.TieuDe || 'Không rõ',
              company: job.TenCongTy || 'Không rõ',
              location: job.DiaDiem || 'Không rõ',
              salary: salaryStr,
              matchScore: Math.round(item.TyLePhuHop),
              skills: matchedSkills,
              tags: [job.LoaiHinh, job.CapBac].filter(Boolean)
            };
          });

        setJobs(topJobs);
      } catch (error) {
        console.error('Lỗi khi tải công việc phù hợp:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTopJobs();
    }
  }, [user]);

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLocation = locationFilter === 'All' || job.location.includes(locationFilter);
    return matchSearch && matchLocation;
  });

  return (
    <div className="candidate-overview suitable-jobs-page">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Công Việc Phù Hợp</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Các vị trí việc làm được AI đề xuất dựa trên phân tích điểm số CV thiết kế của bạn.</p>
      </div>
      
      {/* Search and Filters */}
      <div className="candidate-card search-filter-section" style={{ marginBottom: '24px', padding: '16px 24px' }}>
        <div className="filter-row">
          <div className="search-input-group">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm công việc, công ty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="job-search-input"
            />
          </div>
          
          <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            className="job-filter-select"
          >
            <option value="All">Tất cả địa điểm</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>

          <button className="btn btn-primary" style={{ padding: '0 24px' }}>Lọc</button>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>TÌM THẤY {filteredJobs.length} KẾT QUẢ</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Sắp xếp theo:</span>
          <select className="sort-select">
            <option>Độ phù hợp (Giảm dần)</option>
            <option>Mới nhất</option>
            <option>Lương cao nhất</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="suitable-jobs-grid">
        {isLoading ? (
          <div className="loading-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
            <Loader2 size={36} className="spin-animation" style={{ margin: '0 auto 16px auto', color: '#4f46e5' }} />
            <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>AI Đang Phân Tích...</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Hệ thống đang đối chiếu CV của bạn với hàng ngàn tin tuyển dụng</p>
          </div>
        ) : filteredJobs.map(job => (
          <div key={job.id} className="job-match-card">
            <div className="job-match-header">
              <div className="job-company-logo">
                {job.company.charAt(0)}
              </div>
              <div className="job-match-info">
                <div className={`match-badge ${job.matchScore >= 90 ? 'excellent' : job.matchScore >= 80 ? 'good' : 'average'}`}>
                  <Target size={14} /> 
                  {job.matchScore}% Phù Hợp
                </div>
              </div>
            </div>
            
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company}</p>
            
            <div className="job-details-row">
              <div className="detail-item"><MapPin size={14} /> {job.location}</div>
              <div className="detail-item price"><DollarSign size={14} /> {job.salary}</div>
            </div>
            
            <div className="job-tags">
              {job.tags.map(tag => (
                <span key={tag} className="job-tag style-type">{tag}</span>
              ))}
            </div>

            <div className="job-skills-matched">
              <span className="skills-label">Kỹ năng khớp:</span>
              <div className="skills-list">
                {job.skills.map(skill => (
                  <span key={skill} className="matched-skill">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="job-card-actions">
              <button className="btn-icon-save" title="Lưu công việc">
                <Bookmark size={18} />
              </button>
              <button className="btn-apply-now">
                Ứng tuyển ngay <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
        {filteredJobs.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: 'white', borderRadius: '16px' }}>
             <Building size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
             <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Không tìm thấy công việc phù hợp</h3>
             <p style={{ color: '#64748b', margin: 0 }}>Vui lòng thay đổi từ khóa tìm kiếm hoặc cập nhật thêm kỹ năng vào CV.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuitableJobs;
