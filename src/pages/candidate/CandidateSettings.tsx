import React, { useState } from 'react';
import { Mail, Lock, Save, Shield } from 'lucide-react';
import './CandidateSettings.css';

const CandidateSettings: React.FC = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate can be added here
    alert('Cập nhật email thành công!');
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận không khớp!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện chức năng này!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cập nhật mật khẩu thành công!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert('Cập nhật thất bại: ' + (data.message || 'Mật khẩu hiện tại không đúng.'));
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật mật khẩu:', error);
      alert('Không thể kết nối tới máy chủ. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="candidate-settings">
      <div className="settings-header">
        <h2>Cài Đặt Tài Khoản</h2>
        <p>Quản lý thông tin bảo mật và tài khoản của bạn</p>
      </div>

      <div className="settings-grid">



        {/* Password Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="icon-wrapper warning">
              <Lock size={24} />
            </div>
            <div>
              <h3>Đổi Mật Khẩu</h3>
              <p>Đảm bảo tài khoản của bạn sử dụng mật khẩu mạnh</p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} className="settings-form">
            <div className="form-group">
              <label>Mật khẩu hiện tại</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-save">
              <Shield size={18} />
              Cập Nhật Mật Khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateSettings;
