import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header text-center">
          <h2>Cách Thức <span className="gradient-text">Hoạt Động</span></h2>
          <p>Mọi thứ diễn ra chỉ trong vài giây.</p>
        </div>
        
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">01</div>
            <h3>Tải CV Lên</h3>
            <p>Tải lên tệp CV gốc bằng định dạng PDF để bắt đầu hệ thống quét.</p>
          </div>
          
          <div className="step-connector">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12h38m0 0l-10-10m10 10l-10 10" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="step-item">
            <div className="step-number">02</div>
            <h3>AI Phân Tích</h3>
            <p>Thuật toán trích xuất kỹ năng, kinh nghiệm và tính toán điểm phù hợp IT.</p>
          </div>
          
          <div className="step-connector">
             <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 12h38m0 0l-10-10m10 10l-10 10" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="step-item">
            <div className="step-number">03</div>
            <h3>Nhận Việc Làm Ứng Ý</h3>
            <p>Xem danh sách các công ty phù hợp với bạn trên 85% và apply nhanh.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
