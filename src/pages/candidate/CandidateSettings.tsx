import React, { useState } from 'react';
import { Mail, Lock, Save, Shield } from 'lucide-react';
import './CandidateSettings.css';

const CandidateSettings: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate can be added here
    alert('Cập nhật email thành công!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận không khớp!');
      return;
    }
    // Update password logic can be added here
    alert('Cập nhật mật khẩu thành công!');
  };

  return (
    <div className="candidate-settings">
      <div className="settings-header">
        <h2>Cài Đặt Tài Khoản</h2>
        <p>Quản lý thông tin bảo mật và tài khoản của bạn</p>
      </div>

      <div className="settings-grid">
        {/* Email Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="icon-wrapper primary">
              <Mail size={24} />
            </div>
            <div>
              <h3>Cập Nhật Email</h3>
              <p>Thay đổi địa chỉ email liên kết với tài khoản</p>
            </div>
          </div>
          
          <form onSubmit={handleUpdateEmail} className="settings-form">
            <div className="form-group">
              <label>Email hiện tại</label>
              <input type="email" value={email} disabled className="form-input disabled" />
            </div>
            <div className="form-group">
              <label>Email mới</label>
              <input type="email" placeholder="Nhập email mới..." required className="form-input" />
            </div>
            <button type="submit" className="btn-save">
              <Save size={18} />
              Lưu Thay Đổi
            </button>
          </form>
        </div>

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
