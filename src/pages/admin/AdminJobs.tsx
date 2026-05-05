import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, Search, ExternalLink } from 'lucide-react';
import './AdminTable.css';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  postDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminJobs: React.FC = () => {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/tin-tuyen-dung')
      .then(res => res.json())
      .then((data: any[]) => {
        const mappedJobs = data.map(j => {
          let status: 'pending' | 'approved' | 'rejected' = 'pending';
          if (j.TrangThai === 'DangMo' || j.TrangThai === 'approved') status = 'approved';
          else if (j.TrangThai === 'DaDong' || j.TrangThai === 'rejected') status = 'rejected';

          return {
            id: j.MaTuyenDung.toString(),
            title: j.TieuDe,
            company: j.TenCongTy,
            description: j.MoTaChiTiet,
            minSalary: j.LuongToiThieu,
            maxSalary: j.LuongToiDa,
            postDate: j.created_at ? new Date(j.created_at).toLocaleDateString('vi-VN') : 'Không rõ',
            status: status
          };
        });
        setJobs(mappedJobs);
      })
      .catch(err => console.error("Lỗi fetch Jobs:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleApprove = async (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    try {
      const response = await fetch(`http://localhost:8000/api/tin-tuyen-dung/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          TieuDe: job.title,
          TenCongTy: job.company,
          MoTaChiTiet: job.description,
          LuongToiThieu: job.minSalary,
          LuongToiDa: job.maxSalary,
          TrangThai: 'DangMo' // Cập nhật sang Trạng thái Đang Mở (Approved)
        })
      });

      if (response.ok) {
        setJobs(jobs.map(j => j.id === id ? { ...j, status: 'approved' } : j));
        alert("Đã duyệt tin thành công!");
      } else {
        alert("Lỗi khi duyệt tin, vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    try {
      const response = await fetch(`http://localhost:8000/api/tin-tuyen-dung/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          TieuDe: job.title,
          TenCongTy: job.company,
          MoTaChiTiet: job.description,
          LuongToiThieu: job.minSalary,
          LuongToiDa: job.maxSalary,
          TrangThai: 'TuChoi' // Cập nhật trạng thái Từ chối (Rejected)
        })
      });

      if (response.ok) {
        setJobs(jobs.map(j => j.id === id ? { ...j, status: 'rejected' } : j));
        alert("Đã từ chối tin tuyển dụng này.");
      } else {
        alert("Lỗi server, báo cáo lại hệ thống.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn tin tuyển dụng này khỏi database?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/tin-tuyen-dung/${id}`, {
          method: 'DELETE',
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          setJobs(jobs.filter(j => j.id !== id));
          alert("Xóa thành công!");
        } else {
          alert("Xóa thất bại!");
        }
      } catch (error) {
        console.error(error);
      }
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
                <th>Mã TD</th>
                <th>Tiêu đề công việc</th>
                <th>Công ty</th>
                <th>Mức lương</th>

                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id}>
                  <td>#{job.id}</td>
                  <td>
                    <strong>{job.title}</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>
                      {job.description}
                    </p>
                  </td>
                  <td>{job.company}</td>
                  <td style={{ fontWeight: 500, color: '#0f172a' }}>
                    {job.minSalary && job.maxSalary
                      ? `${(job.minSalary / 1000000).toLocaleString('vi-VN')}tr - ${(job.maxSalary / 1000000).toLocaleString('vi-VN')}tr`
                      : 'Chưa cập nhật'}
                  </td>
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

                      {job.status !== 'approved' && (
                        <button
                          className="btn-action approve"
                          onClick={() => handleApprove(job.id)}
                          title="Duyệt / Mở lại tin"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}

                      {job.status !== 'rejected' && (
                        <button
                          className="btn-action reject"
                          onClick={() => handleReject(job.id)}
                          title="Từ chối / Đóng tin"
                        >
                          <XCircle size={16} />
                        </button>
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
                  <td colSpan={7} className="text-center py-4">Không tìm thấy tin tuyển dụng nào.</td>
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
