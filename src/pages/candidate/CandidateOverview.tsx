import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, Briefcase, Eye, Star, FileText, Bookmark } from 'lucide-react';
import './CandidateDashboard.css';

const chartData = [
  { name: 'T2', views: 12, jobs: 4 },
  { name: 'T3', views: 24, jobs: 7 },
  { name: 'T4', views: 18, jobs: 5 },
  { name: 'T5', views: 35, jobs: 12 },
  { name: 'T6', views: 28, jobs: 8 },
  { name: 'T7', views: 42, jobs: 15 },
  { name: 'CN', views: 30, jobs: 10 },
];

const CandidateOverview: React.FC = () => {
  return (
    <div className="candidate-overview">
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Trang Chủ</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Chào mừng trở lại! Đây là tổng quan hoạt động của bạn.</p>
      </div>
      
      <div className="candidate-stats-grid">
        <div className="candidate-stat-card">
          <div className="candidate-stat-header">
            <div className="candidate-stat-icon-wrapper" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
              <FileText size={24} />
            </div>
            <div className="candidate-stat-trend positive">+12% so với tháng trước</div>
          </div>
          <div className="candidate-stat-body">
            <h3>85%</h3>
            <p>Mức Độ Hoàn Thiện Hồ Sơ</p>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="candidate-stat-header">
            <div className="candidate-stat-icon-wrapper" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
              <Briefcase size={24} />
            </div>
            <div className="candidate-stat-trend positive">+8% so với tuần trước</div>
          </div>
          <div className="candidate-stat-body">
            <h3>42</h3>
            <p>Công Việc Phù Hợp</p>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="candidate-stat-header">
            <div className="candidate-stat-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#f59e0b' }}>
              <Eye size={24} />
            </div>
            <div className="candidate-stat-trend positive">+24% so với tháng trước</div>
          </div>
          <div className="candidate-stat-body">
            <h3>128</h3>
            <p>Lượt Xem Hồ Sơ</p>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="candidate-stat-header">
            <div className="candidate-stat-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
              <Star size={24} />
            </div>
          </div>
          <div className="candidate-stat-body">
            <h3>9.2/10</h3>
            <p>Điểm Đánh Giá CV (AI)</p>
          </div>
        </div>
      </div>

      <div className="candidate-dashboard-grid">
        <div className="candidate-card">
          <h2>Hoạt Động Trong Tuần</h2>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="views" name="Lượt xem hồ sơ" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="jobs" name="Việc làm phù hợp" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorJobs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="candidate-card">
          <h2>
            Hoạt Động Gần Đây 
            <a href="#all">Xem tất cả</a>
          </h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">
                <CheckCircle size={18} />
              </div>
              <div className="activity-content">
                <h4>CV được phân tích thành công</h4>
                <p>CV "Frontend Developer.pdf" • 2 phút trước</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon primary">
                <Briefcase size={18} />
              </div>
              <div className="activity-content">
                <h4>3 công việc phù hợp mới</h4>
                <p>Khớp với kỹ năng React, TypeScript • 15 phút trước</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon warning">
                <Bookmark size={18} />
              </div>
              <div className="activity-content">
                <h4>Đã lưu công việc mới</h4>
                <p>Senior Frontend Engineer tại VNG • 1 giờ trước</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon success">
                <CheckCircle size={18} />
              </div>
              <div className="activity-content">
                <h4>Hoàn thiện hồ sơ cá nhân</h4>
                <p>Thêm kỹ năng: GraphQL, NodeJS • 3 giờ trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateOverview;
