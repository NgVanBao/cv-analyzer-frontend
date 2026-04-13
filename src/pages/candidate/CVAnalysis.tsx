import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FileText, Award, Sparkles, Zap, Upload, Loader2, Briefcase, TrendingUp } from 'lucide-react';
import './CandidateDashboard.css';

const pieData = [
  { name: 'Phù hợp', value: 78 },
  { name: 'Còn thiếu', value: 22 },
];
const COLORS = ['#6366f1', '#e2e8f0'];

const StatCard = ({ title, value, icon, subtext }: any) => (
  <div className="candidate-stat-card">
    <div className="candidate-stat-header">
      <div className="candidate-stat-title-group">
        <span className="candidate-stat-label">{title}</span>
        <div className="candidate-stat-icon-small">{icon}</div>
      </div>
    </div>
    <div className="candidate-stat-body" style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{value}</h3>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>{subtext}</p>
    </div>
  </div>
);

const CVAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [targetJob, setTargetJob] = useState('Backend Developer');

  const handleUpload = () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setHasResult(false);
    
    // Giả lập delay của AI phân tích
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
    }, 2500);
  };

  return (
    <div className="candidate-overview cv-analysis-page">
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>Phân Tích CV AI</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Tải lên và phân tích hồ sơ để được AI tối ưu tỷ lệ đậu phỏng vấn</p>
      </div>
      
      <div className="candidate-stats-grid">
        <StatCard 
          title="Lượt Phân Tích Còn Lại" 
          value="4/5" 
          subtext="Làm mới vào ngày mai" 
          icon={<Zap size={18} color="#f59e0b" />} 
        />
        <StatCard 
          title="Điểm CV Cao Nhất" 
          value="82/100" 
          subtext="Vị trí Frontend Developer" 
          icon={<Award size={18} color="#3b82f6" />} 
        />
        <StatCard 
          title="Kỹ Năng Đã Lưu" 
          value="24" 
          subtext="Tổng kỹ năng trích xuất" 
          icon={<Sparkles size={18} color="#8b5cf6" />} 
        />
        <StatCard 
          title="Vị Trí Đã Phân Tích" 
          value="3" 
          subtext="Backend, Frontend, Fullstack" 
          icon={<FileText size={18} color="#6366f1" />} 
        />
      </div>

      <div className={`cv-analysis-grid ${!hasResult && !isAnalyzing ? 'single-column' : ''}`}>
        {/* Upload Section */}
        <div className="candidate-card upload-section">
          <div className="upload-target-job" style={{ marginBottom: '20px' }}>
             <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Vị trí mục tiêu (Bắt buộc):</label>
             <select 
               value={targetJob} 
               onChange={(e) => setTargetJob(e.target.value)}
               className="input-field"
               style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
             >
                <option value="Backend Developer">Backend Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
             </select>
          </div>

          <div 
            className={`upload-dropzone ${isAnalyzing ? 'analyzing' : ''}`} 
            onClick={handleUpload}
          >
            {isAnalyzing ? (
              <div className="analyzing-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Loader2 size={40} className="spin-animation" color="#6366f1" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: '#4f46e5', margin: '0 0 8px 0' }}>AI đang quét hồ sơ...</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Đang đối chiếu với vị trí {targetJob}</p>
              </div>
            ) : (
              <>
                <div className="upload-icon-wrapper">
                  <Upload size={24} />
                </div>
                <p className="upload-primary-text"><strong>Kéo và thả hồ sơ của bạn vào đây</strong></p>
                <p className="upload-secondary-text">hoặc nhấn để gửi file PDF đi phân tích</p>
                <div className="upload-hint">Chấp nhận file PDF tối đa 10MB</div>
              </>
            )}
          </div>
        </div>

        {/* Analysis Result Section */}
        {hasResult && (
          <div className="candidate-card analysis-result-section slide-in-animation">
            <div className="analysis-header">
              <div className="analysis-title">
                <div className="analysis-icon"><Briefcase size={20} /></div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>{targetJob}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Kết quả đánh giá AI</p>
                </div>
              </div>
              <div className="analysis-badge">
               <TrendingUp size={14} /> Rất phù hợp
              </div>
            </div>

            <div className="analysis-content">
              <div className="analysis-chart">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-center-label">
                  <span className="chart-score">78%</span>
                  <span className="chart-text">Điểm phù hợp</span>
                </div>
                <p className="chart-bottom-text">So với yêu cầu chuẩn của vị trí</p>
              </div>

              <div className="analysis-details">
                <div className="skill-group">
                  <h4 className="skill-title success"><CheckCircleIcon /> Kỹ năng phù hợp (5)</h4>
                  <div className="skill-tags">
                    <span className="skill-tag success">PHP</span>
                    <span className="skill-tag success">Laravel</span>
                    <span className="skill-tag success">MySQL</span>
                    <span className="skill-tag success">REST API</span>
                    <span className="skill-tag success">Git</span>
                  </div>
                </div>

                <div className="skill-group" style={{ marginTop: '16px' }}>
                  <h4 className="skill-title danger"><XCircleIcon /> Kỹ năng còn thiếu (2)</h4>
                  <div className="skill-tags">
                    <span className="skill-tag danger">Kubernetes</span>
                    <span className="skill-tag danger">CI/CD</span>
                  </div>
                </div>

                <div className="analysis-recommendation">
                  <strong>Khuyến nghị từ AI:</strong> Kỹ năng của bạn khá vững cho vị trí {targetJob}. Tuy nhiên nhà tuyển dụng thường yêu cầu thêm khả năng thao tác với Docker/Kubernetes. Hãy bổ sung từ khóa CI/CD vào phần kinh nghiệm nếu bạn đã từng làm qua.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const XCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
);

export default CVAnalysis;
