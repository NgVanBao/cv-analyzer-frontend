import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';
import CandidateLayout from './pages/candidate/CandidateLayout';
import CandidateOverview from './pages/candidate/CandidateOverview';
import CVAnalysis from './pages/candidate/CVAnalysis';
import SuitableJobs from './pages/candidate/SuitableJobs';
import SavedJobs from './pages/candidate/SavedJobs';
import { useAuth } from './context/AuthContext';
import './App.css';

// Component để bảo vệ các route dành cho admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Component để bảo vệ các route dành cho ứng viên
const CandidateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'user') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Route cho trang chủ (ứng viên/ng dùng thường) */}
      <Route path="/" element={<Home />} />
      
      {/* Các route dành cho khóa Admin */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="jobs" element={<AdminJobs />} />
      </Route>

      {/* Các route dành cho ứng viên */}
      <Route path="/candidate" element={
        <CandidateRoute>
          <CandidateLayout />
        </CandidateRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CandidateOverview />} />
        <Route path="cv-analysis" element={<CVAnalysis />} />
        <Route path="suitable-jobs" element={<SuitableJobs />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
      </Route>
      
      {/* Bắt các route không tồn tại */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
