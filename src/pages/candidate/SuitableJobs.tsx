import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Bookmark, ArrowRight, Target } from 'lucide-react';
import './CandidateDashboard.css';

const mockJobs = [
  { 
    id: 1, 
    title: 'Senior React Developer', 
    company: 'TechCorp Vietnam', 
    location: 'Hà Nội', 
    salary: '30Tr - 45Tr', 
    matchScore: 95, 
    skills: ['React', 'TypeScript', 'Redux', 'System Design'], 
    tags: ['Remote', 'Urgent'] 
  },
  { 
    id: 2, 
    title: 'Frontend Engineer', 
    company: 'FPT Software', 
    location: 'Đà Nẵng', 
    salary: '15Tr - 25Tr', 
    matchScore: 88, 
    skills: ['React', 'JavaScript', 'CSS', 'HTML'], 
    tags: ['On-site'] 
  },
  { 
    id: 3, 
    title: 'Fullstack Developer (NodeJS/React)', 
    company: 'VNG Corporation', 
    location: 'Hồ Chí Minh', 
    salary: 'Thoả thuận', 
    matchScore: 82, 
    skills: ['NodeJS', 'React', 'MongoDB'], 
    tags: ['Hybrid'] 
  },
  { 
    id: 4, 
    title: 'UI/UX Engineer', 
    company: 'Shopee Vietnam', 
    location: 'Hồ Chí Minh', 
    salary: '25Tr - 40Tr', 
    matchScore: 78, 
    skills: ['Figma', 'React', 'Tailwind CSS'], 
    tags: ['On-site'] 
  },
  { 
    id: 5, 
    title: 'Web Developer', 
    company: 'Momo Company', 
    location: 'Hà Nội', 
    salary: '18Tr - 30Tr', 
    matchScore: 75, 
    skills: ['Vue', 'JavaScript', 'REST API'], 
    tags: ['Hybrid'] 
  },
  { 
    id: 6, 
    title: 'Junior Frontend Developer', 
    company: 'Tiki', 
    location: 'Hồ Chí Minh', 
    salary: '10Tr - 15Tr', 
    matchScore: 68, 
    skills: ['HTML', 'CSS', 'JavaScript', 'React'], 
    tags: ['On-site'] 
  }
];

const SuitableJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  const filteredJobs = mockJobs.filter(job => {
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
        {filteredJobs.map(job => (
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
