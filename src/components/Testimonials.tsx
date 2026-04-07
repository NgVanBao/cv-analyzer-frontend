import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials">
      <div className="container">
         <div className="section-header text-center">
          <h2>Cảm Nhận <span className="gradient-text">Ứng Viên</span></h2>
          <p>Hàng ngàn ứng viên đã tìm được công việc trong mơ nhờ sự trợ giúp của AI.</p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="quote">"Nhờ phân tích CV bằng AI, tôi phát hiện ra mình thiếu một số keyword quan trọng trong CV. Sau khi chỉnh sửa theo gợi ý, tôi đã nhận được offer từ VNG."</p>
            <div className="author">
              <div className="author-avatar">N</div>
              <div>
                <strong>Nguyễn Tuấn</strong>
                <span>Backend Developer</span>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="quote">"Tính năng match việc làm quá chính xác. Những job hệ thống gợi ý rất sát với định hướng Frontend của mình. Giao diện cực mượt mà và dễ dùng."</p>
            <div className="author">
              <div className="author-avatar">M</div>
              <div>
                <strong>Trần Mai Hương</strong>
                <span>ReactJS Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
