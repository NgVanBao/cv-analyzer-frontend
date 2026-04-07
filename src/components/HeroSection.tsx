import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge">
            ✨ Trải nghiệm AI Phân Tích CV Thế Hệ Mới
          </div>
          <h1>
            Nâng Tầm Sự Nghiệp IT Của Bạn Cùng <span className="gradient-text">Trí Tuệ Nhân Tạo</span>
          </h1>
          <p className="hero-subtitle">
            Tải lên CV của bạn, nhận phân tích chuyên sâu từ AI về kỹ năng thực tế, và kết nối ngay với những cơ hội việc làm IT hàng đầu.
          </p>
          <div className="hero-search-box">
            <div className="search-input-group">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Vị trí, kỹ năng, công ty..." />
            </div>
            
            <div className="search-input-group">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="text" placeholder="Tất cả địa điểm" />
            </div>

            <button className="btn btn-primary">Tìm Việc Ngay</button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <strong>10k+</strong>
              <span>Việc làm IT</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <strong>98%</strong>
              <span>Tỷ lệ khớp nối</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <strong>5k+</strong>
              <span>CV Đã phân tích</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          {/* Abstract Floating UI/Mockup */}
          <div className="abstract-card main-card">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-body glass">
              <div className="skeleton-line full"></div>
              <div className="skeleton-line mid"></div>
              <div className="ai-score-ring">
                 <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray="92, 100"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">92</text>
                 </svg>
                 <span className="score-label">Điểm AI</span>
              </div>
            </div>
          </div>
          
          <div className="abstract-card small-card floating">
            <span className="icon">🚀</span>
            <div>
              <strong>Phù hợp: Senior React Dev</strong>
              <p>Trùng khớp 95% kỹ năng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
