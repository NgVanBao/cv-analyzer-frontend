import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="ai-analysis" className="features-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Sức Mạnh Của <span className="gradient-text">AI Phân Tích</span></h2>
          <p>Hệ thống thông minh của chúng tôi sinh ra để giúp bạn tỏa sáng trước nhà tuyển dụng.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon icon-blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3>Đánh giá CV chi tiết</h3>
            <p>AI sẽ đọc, quét và hiểu CV của bạn như một chuyên gia tuyển dụng thực thụ. Chấm điểm kỹ năng và trải nghiệm chính xác.</p>
          </div>
          
          <div className="feature-card highlighted">
            <div className="feature-icon icon-purple">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3>Khớp nối Việc làm Thông minh</h3>
            <p>Thuật toán Semantic Matching đối chiếu CV của bạn với hàng ngàn JD (Job Description) IT để tìm ra cơ hội có độ phù hợp cao nhất.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon icon-teal">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h3>Gợi ý lộ trình sự nghiệp</h3>
            <p>Phát hiện lỗ hổng kỹ năng của bạn so với yêu cầu thị trường hiện tại, đưa ra lời khuyên để bạn nâng cấp bản thân.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
