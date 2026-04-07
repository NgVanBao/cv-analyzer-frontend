import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">🤖</span>
              <span className="logo-text">CV<span className="gradient-text">Analyzer</span></span>
            </div>
            <p className="footer-desc">
              Hệ thống tiên phong ứng dụng trí tuệ nhân tạo (AI) trong phân tích kỹ năng CV và gợi ý lộ trình việc làm chuyên sâu trong lĩnh vực IT.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Dành Cho Ứng Viên</h4>
            <ul>
              <li><a href="#">Phân Tích CV</a></li>
              <li><a href="#">Tìm Việc IT</a></li>
              <li><a href="#">Tạo CV Online</a></li>
              <li><a href="#">Góc Nghề Nghiệp</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Dành Cho Nhà Tuyển Dụng</h4>
            <ul>
              <li><a href="#">Đăng Tin Tuyển Dụng</a></li>
              <li><a href="#">Tìm Kiếm Ứng Viên</a></li>
              <li><a href="#">Bảng Giá Dịch Vụ</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Liên Hệ</h4>
            <ul>
              <li>Email: hotro@cvanalyzer.vn</li>
              <li>Điện thoại: 0123 456 789</li>
              <li>Địa chỉ: Khu Công Nghệ Cao, TP.HCM</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AI CV Analyzer Project. Đề tài tốt nghiệp.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
