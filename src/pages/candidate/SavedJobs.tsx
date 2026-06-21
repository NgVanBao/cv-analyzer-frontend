import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Trash2, ArrowRight, Bookmark, CircleDot } from 'lucide-react';
import './CandidateDashboard.css';

const mockSavedJobs = [
  { 
    id: 1, 
    title: 'Senior React Developer', 
    company: 'TechCorp Vietnam', 
    location: 'Hà Nội', 
    salary: '30Tr - 45Tr', 
    status: 'active',
    dateSaved: '2 ngày trước',
    tags: ['Remote', 'Urgent'] 
  },
  { 
    id: 2, 
    title: 'UI/UX Engineer', 
    company: 'Shopee Vietnam', 
    location: 'Hồ Chí Minh', 
    salary: '25Tr - 40Tr', 
    status: 'active',
    dateSaved: '4 ngày trước',
    tags: ['On-site'] 
  },
  { 
    id: 3, 
    title: 'Web Developer', 
    company: 'Momo Company', 
    location: 'Hà Nội', 
    salary: '18Tr - 30Tr', 
    status: 'closed',
    dateSaved: '1 tuần trước',
    tags: ['Hybrid'] 
  }
];

const SavedJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const savedStr = localStorage.getItem('savedJobs');
    if (savedStr && JSON.parse(savedStr).length > 0) {
      setJobs(JSON.parse(savedStr));
    } else {
      // Fallback for demo purposes
      setJobs(mockSavedJobs);
    }
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUnsave = (id: number) => {
    const newJobs = jobs.filter(j => j.id !== id);
    setJobs(newJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newJobs));
  };

  return (
    <div className="candidate-overview suitable-jobs-page">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Công Việc Đã Lưu</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Quản lý danh sách các công việc mà bạn đang phân vân hoặc dự định ứng tuyển.</p>
      </div>
      
      {/* Search and Filters */}
      <div className="candidate-card search-filter-section" style={{ marginBottom: '24px', padding: '16px 24px' }}>
        <div className="filter-row">
          <div className="search-input-group">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm công việc đã lưu..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="job-search-input"
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="job-filter-select"
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="active">Đang tuyển dụng</option>
            <option value="closed">Đã hết hạn</option>
          </select>

          <button className="btn btn-primary" style={{ padding: '0 24px' }}>Lọc</button>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>TÌM THẤY {filteredJobs.length} CÔNG VIỆC NHÓM LẠI</span>
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
                <div className={`status-badge ${job.status === 'active' ? 'active' : 'closed'}`}>
                  <CircleDot size={12} /> 
                  {job.status === 'active' ? 'Đang tuyển' : 'Đã hết hạn'}
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

            <div className="job-skills-matched style-date-saved" style={{ marginTop: 'auto', borderTop: '1px dashed #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bookmark size={14} /> Lưu vào {job.dateSaved}
              </span>
            </div>
            
            <div className="job-card-actions">
              <button className="btn-icon-unsave" title="Bỏ lưu công việc" onClick={() => handleUnsave(job.id)}>
                <Trash2 size={18} />
              </button>
              <button 
                className="btn-apply-now" 
                disabled={job.status === 'closed'}
                style={{ opacity: job.status === 'closed' ? 0.5 : 1, cursor: job.status === 'closed' ? 'not-allowed' : 'pointer' }}
              >
                Ứng tuyển ngay <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
        {filteredJobs.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', background: 'white', borderRadius: '16px' }}>
             <Bookmark size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
             <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Danh sách trống</h3>
             <p style={{ color: '#64748b', margin: 0 }}>Bạn chưa lưu công việc nào chứa từ khóa này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
