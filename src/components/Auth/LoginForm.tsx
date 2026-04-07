import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    
    // Đăng nhập giả lập (MOCK)
    if (email === 'admin@gmail.com' && password === 'admin') {
      login({ id: '1', email, name: 'Admin User', role: 'admin' });
      navigate('/admin/dashboard');
    } else {
      login({ id: '2', email, name: 'Candidate User', role: 'user' });
      // Đăng nhập thành công, có thể đóng modal hoặc điều hướng đi đâu đó tùy ý
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h2>Chào mừng trở lại</h2>
        <p>Đăng nhập để tiếp tục khám phá và tạo CV ấn tượng của bạn.</p>
      </div>
      
      <div className="auth-content">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="input-field" 
              placeholder="ví dụ: nva@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <div className="flex-header" style={{ alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ margin: 0 }} htmlFor="password">Mật khẩu</label>
              <button type="button" className="auth-link" style={{ fontSize: '0.85rem', fontWeight: 500 }}>Quên mật khẩu?</button>
            </div>
            <input 
              id="password"
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-large auth-submit">
            Đăng nhập
          </button>
        </form>

        <div className="auth-divider">hoặc tiếp tục với</div>

        <button type="button" className="btn-social">
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
        </button>

        <div className="auth-footer">
          Chưa có tài khoản? <button type="button" className="auth-link" onClick={onSwitchToRegister}>Đăng ký ngay</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
