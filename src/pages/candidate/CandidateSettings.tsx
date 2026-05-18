import React, { useState, useEffect } from 'react';
import { Mail, Lock, Save, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CandidateSettings.css';

const CandidateSettings: React.FC = () => {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic gọi API update profile sẽ thêm sau
    alert('Cập nhật thông tin cơ bản thành công! (Giao diện mẫu)');
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

        {/* Basic Info Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="icon-wrapper primary">
              <User size={24} />
            </div>
            <div>
              <h3>Thông Tin Cơ Bản</h3>
              <p>Quản lý tên hiển thị, email và số điện thoại liên lạc</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="settings-form">
            <div className="form-group">
              <label>Họ và Tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ Email</label>
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn-save">
              <Save size={18} />
              Lưu Thay Đổi
            </button>
          </form>
        </div>        {/* Password Settings */}
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
