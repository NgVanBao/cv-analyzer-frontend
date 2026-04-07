import React from 'react';

const FeaturedJobs: React.FC = () => {
  const mockJobs = [
    { title: "Senior React Developer", company: "FPT Software", salary: "1500 - 2500 USD", location: "Hồ Chí Minh", tags: ["ReactJS", "TypeScript", "Redux"] },
    { title: "AI/Machine Learning Engineer", company: "VNG", salary: "Up to 3000 USD", location: "Hà Nội", tags: ["Python", "TensorFlow", "NLP"] },
    { title: "NodeJS Backend Dev", company: "Tiki", salary: "1200 - 2000 USD", location: "Remote", tags: ["NodeJS", "MongoDB", "AWS"] },
    { title: "Data Scientist", company: "MoMo", salary: "1500 - 2800 USD", location: "Hồ Chí Minh", tags: ["SQL", "Data Modeling", "Python"] },
  ];

  return (
    <section id="jobs" className="featured-jobs-bg">
      <div className="container">
         <div className="section-header flex-header">
          <div>
            <h2>Việc Làm IT <span className="gradient-text">Nổi Bật</span></h2>
            <p>Những cơ hội tốt nhất được chọn lọc mỗi tuần.</p>
          </div>
          <button className="btn btn-outline">Xem tất cả</button>
        </div>
        
        <div className="jobs-grid">
          {mockJobs.map((job, idx) => (
            <div className="job-card" key={idx}>
              <div className="job-card-header">
                <div className="company-logo-placeholder">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h4 className="job-title">{job.title}</h4>
                  <p className="job-company">{job.company}</p>
                </div>
              </div>
              
              <div className="job-details">
                <span className="job-detail-item">
                   <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {job.salary}
                </span>
                <span className="job-detail-item">
                   <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                   {job.location}
                </span>
              </div>
              
              <div className="job-tags">
                {job.tags.map(tag => (
                  <span className="job-tag" key={tag}>{tag}</span>
                ))}
              </div>
              
              <button className="btn btn-primary btn-block">Ứng Tuyển Nhanh</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
