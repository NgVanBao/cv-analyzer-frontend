import React, { useState } from 'react';
import { Ban, Eye, Search } from 'lucide-react';
import './AdminTable.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'banned';
  joinDate: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'nva@gmail.com', role: 'Candidate', status: 'active', joinDate: '2026-01-15' },
  { id: '2', name: 'Trần Thị B', email: 'ttb@techvn.com', role: 'Employer', status: 'active', joinDate: '2026-02-20' },
  { id: '3', name: 'Lê Văn C', email: 'lvc@spam.com', role: 'Candidate', status: 'banned', joinDate: '2026-03-01' },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBan = (id: string, currentStatus: string) => {
    // Fake ban toggle API call
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: currentStatus === 'active' ? 'banned' : 'active' } : u
    ));
  };

  const handleViewProfile = (user: User) => {
    const roleVN = user.role === 'Candidate' ? 'Ứng viên' : user.role === 'Employer' ? 'Nhà tuyển dụng' : user.role;
    alert(`Xem chi tiết hồ sơ: ${user.name}\nEmail: ${user.email}\nVai trò: ${roleVN}\nTrạng thái: ${user.status === 'active' ? 'Hoạt động' : 'Bị cấm'}`);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Quản lý người dùng</h1>
        <div className="admin-search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm người dùng..." 
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
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Ngày tham gia</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge role-${user.role.toLowerCase()}`}>
                      {user.role === 'Candidate' ? 'Ứng viên' : user.role === 'Employer' ? 'Nhà tuyển dụng' : user.role}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <span className={`badge status-${user.status}`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Bị cấm'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action view" 
                        onClick={() => handleViewProfile(user)}
                        title="Xem hồ sơ"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className={`btn-action ${user.status === 'active' ? 'ban' : 'unban'}`} 
                        onClick={() => handleBan(user.id, user.status)}
                        title={user.status === 'active' ? 'Cấm tài khoản' : 'Mở khóa tài khoản'}
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4">Không tìm thấy người dùng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
