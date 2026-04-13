import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileText, Briefcase, TrendingUp } from 'lucide-react';
import './AdminOverview.css';

const data = [
  { name: 'T1', users: 400, jobs: 240, cvs: 2400 },
  { name: 'T2', users: 300, jobs: 139, cvs: 2210 },
  { name: 'T3', users: 200, jobs: 980, cvs: 2290 },
  { name: 'T4', users: 278, jobs: 390, cvs: 2000 },
  { name: 'T5', users: 189, jobs: 480, cvs: 2181 },
  { name: 'T6', users: 239, jobs: 380, cvs: 2500 },
  { name: 'T7', users: 349, jobs: 430, cvs: 2100 },
];

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className="stat-icon-wrapper">{icon}</div>
      <div className="stat-trend positive">{trend}</div>
    </div>
    <div className="stat-card-body">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </div>
);

const AdminOverview: React.FC = () => {
  return (
    <div className="admin-overview">
      <h1 className="admin-page-title">Tổng quan hệ thống</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Tổng ứng viên" 
          value="1,234" 
          icon={<Users size={24} color="#3b82f6" />}
          trend="+12%"
        />
        <StatCard 
          title="Nhà tuyển dụng" 
          value="156" 
          icon={<Briefcase size={24} color="#8b5cf6" />}
          trend="+5%"
        />
        <StatCard 
          title="Việc làm đang mở" 
          value="892" 
          icon={<FileText size={24} color="#10b981" />}
          trend="+18%"
        />
        <StatCard 
          title="Lượt truy cập" 
          value="45.2K" 
          icon={<TrendingUp size={24} color="#f59e0b" />}
          trend="+22%"
        />
      </div>

      <div className="admin-card chart-section">
        <h2>Thống kê tăng trưởng 6 tháng gần đây</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCvs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip />
              <Area type="monotone" dataKey="cvs" stroke="#818cf8" fillOpacity={1} fill="url(#colorCvs)" name="Lượt nộp CV" />
              <Area type="monotone" dataKey="users" stroke="#38bdf8" fillOpacity={1} fill="url(#colorUsers)" name="Người dùng mới" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
