import React, { useState } from 'react';
import { CheckCircle, XCircle, Trash2, Search, ExternalLink } from 'lucide-react';
import './AdminTable.css';

interface Job {
  id: string;
  title: string;
  company: string;
  postDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockJobs: Job[] = [
  { id: '101', title: 'Senior React Developer', company: 'TechNova', postDate: '2026-04-05', status: 'pending' },
  { id: '102', title: 'Marketing Manager', company: 'Creative Digital', postDate: '2026-04-06', status: 'pending' },
  { id: '103', title: 'Data Scientist', company: 'AI Solutions', postDate: '2026-04-01', status: 'approved' },
  { id: '104', title: 'Backend Node.js', company: 'Startup XYZ', postDate: '2026-04-02', status: 'rejected' },
];

const AdminJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'approved' } : j));
  };

  const handleReject = (id: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'rejected' } : j));
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Quản lý Tin tuyển dụng</h1>
        <div className="admin-search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm công việc, công ty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề công việc</th>
                <th>Công ty</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id}>
                  <td>#{job.id}</td>
                  <td><strong>{job.title}</strong></td>
                  <td>{job.company}</td>
                  <td>{job.postDate}</td>
                  <td>
                    <span className={`badge status-${job.status}`}>
                      {job.status === 'approved' ? 'Đã duyệt' : job.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action view" title="Xem chi tiết">
                        <ExternalLink size={16} />
                      </button>
                      {job.status === 'pending' && (
                        <>
                          <button 
                            className="btn-action approve" 
                            onClick={() => handleApprove(job.id)}
                            title="Duyệt duyệt"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            className="btn-action reject" 
                            onClick={() => handleReject(job.id)}
                            title="Từ chối"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        className="btn-action delete" 
                        onClick={() => handleDelete(job.id)}
                        title="Xóa tin"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">Không tìm thấy tin tuyển dụng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
