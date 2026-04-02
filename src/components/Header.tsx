import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header glass">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">CV<span className="gradient-text">Analyzer</span></span>
        </div>
        <nav className="nav-links">
          <a href="#jobs">Tìm việc IT</a>
          <a href="#ai-analysis">Phân tích CV AI</a>
          <a href="#companies">Công ty nổi bật</a>
        </nav>
        <div className="auth-buttons">
          <button className="btn btn-outline">Đăng nhập</button>
          <button className="btn btn-primary">Đăng ký</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
