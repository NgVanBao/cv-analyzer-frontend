import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Bookmark, 
  Settings, 
  LogOut 
} from 'lucide-react';
import './CandidateDashboard.css';

const CandidateLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/candidate/dashboard', icon: <LayoutDashboard size={20} />, label: 'Trang Chủ' },
    { path: '/candidate/cv-analysis', icon: <FileText size={20} />, label: 'Phân Tích CV' },
    { path: '/candidate/suitable-jobs', icon: <Briefcase size={20} />, label: 'Công Việc Phù Hợp' },
    { path: '/candidate/saved-jobs', icon: <Bookmark size={20} />, label: 'Đã Lưu' },
  ];

  return (
    <div className="candidate-layout">
      {/* Sidebar */}
      <aside className="candidate-sidebar">
        <div className="candidate-sidebar-header">
          <span className="logo-icon" style={{ fontSize: '1.5rem' }}>🤖</span>
          <h2>CVAnalyzer</h2>
        </div>
        
        <nav className="candidate-sidebar-nav">
          <div className="candidate-nav-section-title">Chung</div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`candidate-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          
          <div className="candidate-nav-section-title">Quản Lý</div>
          <Link to="/candidate/settings" className={`candidate-nav-item ${location.pathname === '/candidate/settings' ? 'active' : ''}`}>
             <Settings size={20} />
             <span>Cài Đặt</span>
          </Link>
        </nav>

        <div className="candidate-sidebar-footer">
          <div className="candidate-user-profile">
            <div className="candidate-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="candidate-info">
              <h4>{user?.name || 'Ứng Viên'}</h4>
              <p>{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-outline" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #e2e8f0', color: '#64748b' }}>
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Areas */}
      <main className="candidate-main-content">
        <header className="candidate-header">
          <div className="candidate-header-title">
            Dashboard
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* You can add notification bells or something here */}
          </div>
        </header>
        
        <div className="candidate-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CandidateLayout;
