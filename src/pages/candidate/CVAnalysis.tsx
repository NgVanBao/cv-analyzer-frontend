import React, { useState, useRef } from 'react';
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
  const [jobDescription, setJobDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleUpload = async () => {
    if (isAnalyzing) return;
    if (!jobDescription) {
      alert("Vui lòng nhập Job Description!");
      return;
    }
    if (!selectedFile) {
      alert("Vui lòng chọn file CV!");
      return;
    }
    
    setIsAnalyzing(true);
    setHasResult(false);
    setAnalysisResult(null);
    
    const formData = new FormData();
    formData.append('file_cv', selectedFile);
    formData.append('job_description', jobDescription);

    try {
      const response = await fetch('http://localhost:8000/api/ho-so-cv/analyze-custom-jd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.data) {
        setAnalysisResult(result.data);
        setHasResult(true);
      } else {
        alert(`Phân tích thất bại: ${result.message || 'Có lỗi xảy ra từ AI.'}`);
      }
    } catch (error) {
      console.error('Lỗi khi phân tích:', error);
      alert('Không thể kết nối đến máy chủ.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
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
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>Mô tả công việc - JD (Bắt buộc):</label>
            <textarea 
              value={jobDescription} 
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Dán toàn bộ yêu cầu công việc (Job Description) từ nhà tuyển dụng vào đây..."
              className="input-field"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', minHeight: '120px', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem' }}
            />
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>
              AI sẽ đối chiếu trực tiếp CV của bạn với các yêu cầu kỹ năng trong JD này để cho ra điểm số chính xác nhất.
            </p>
          </div>

          <div 
            className={`upload-dropzone ${isAnalyzing ? 'analyzing' : ''} ${selectedFile ? 'has-file' : ''}`} 
            onClick={() => !isAnalyzing && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf" 
              style={{ display: 'none' }} 
            />
            {isAnalyzing ? (
              <div className="analyzing-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Loader2 size={40} className="spin-animation" color="#6366f1" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: '#4f46e5', margin: '0 0 8px 0' }}>AI đang quét hồ sơ...</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  Đang trích xuất và đối chiếu với JD...
                </p>
              </div>
            ) : selectedFile ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <FileText size={48} color="#10b981" />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#0f172a' }}>{selectedFile.name}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>
                  Nhấn để chọn file khác
                </p>
              </div>
            ) : (
              <>
                <div className="upload-icon-wrapper">
                  <Upload size={24} />
                </div>
                <p className="upload-primary-text"><strong>Kéo và thả hồ sơ của bạn vào đây</strong></p>
                <p className="upload-secondary-text">hoặc nhấn để chọn file PDF</p>
                <div className="upload-hint">Chấp nhận file PDF tối đa 10MB</div>
              </>
            )}
          </div>

          <button 
            onClick={handleUpload}
            disabled={isAnalyzing || !selectedFile || !jobDescription}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '20px',
              background: isAnalyzing || !selectedFile || !jobDescription ? '#94a3b8' : '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1.05rem',
              cursor: isAnalyzing || !selectedFile || !jobDescription ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s',
              boxShadow: isAnalyzing || !selectedFile || !jobDescription ? 'none' : '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
            }}
          >
            {isAnalyzing ? (
              <><Loader2 size={18} className="spin-animation" /> Đang phân tích CV...</>
            ) : (
              <><Sparkles size={18} /> Phân Tích CV Của Tôi</>
            )}
          </button>
        </div>

        {/* Analysis Result Section */}
        {hasResult && analysisResult && (
          <div className="candidate-card analysis-result-section slide-in-animation">
            <div className="analysis-header">
              <div className="analysis-title">
                <div className="analysis-icon"><Briefcase size={20} /></div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>
                    Phân tích theo Job Description
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Kết quả đánh giá AI</p>
                </div>
              </div>
              <div className="analysis-badge">
               <TrendingUp size={14} /> {analysisResult.tyle_phuhop >= 70 ? 'Rất phù hợp' : analysisResult.tyle_phuhop >= 50 ? 'Phù hợp trung bình' : 'Cần cải thiện'}
              </div>
            </div>

            <div className="analysis-content">
              <div className="analysis-chart">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Phù hợp', value: analysisResult.tyle_phuhop || 0 },
                        { name: 'Còn thiếu', value: 100 - (analysisResult.tyle_phuhop || 0) },
                      ]}
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
                  <span className="chart-score">{analysisResult.tyle_phuhop || 0}%</span>
                  <span className="chart-text">Điểm phù hợp</span>
                </div>
                <p className="chart-bottom-text">So với yêu cầu chuẩn của vị trí</p>
              </div>

              <div className="analysis-details">
                <div className="skill-group">
                  <h4 className="skill-title success"><CheckCircleIcon /> Kỹ năng phù hợp ({(analysisResult.kynang_phuhop || []).length})</h4>
                  <div className="skill-tags">
                    {(analysisResult.kynang_phuhop || []).map((skill: string, idx: number) => (
                      <span key={idx} className="skill-tag success">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skill-group" style={{ marginTop: '16px' }}>
                  <h4 className="skill-title danger"><XCircleIcon /> Kỹ năng còn thiếu ({(analysisResult.kynang_thieu || []).length})</h4>
                  <div className="skill-tags">
                    {(analysisResult.kynang_thieu || []).map((skill: string, idx: number) => (
                      <span key={idx} className="skill-tag danger">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="analysis-recommendation">
                  <strong>Khuyến nghị từ AI:</strong> {analysisResult.khuyen_nghi || 'Không có nhận xét chi tiết.'}
                </div>

                {analysisResult.lotrinh && analysisResult.lotrinh.length > 0 && (
                  <div className="skill-group" style={{ marginTop: '20px' }}>
                    <h4 className="skill-title" style={{ color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem' }}>
                      <Sparkles size={16} color="#8b5cf6" /> Lộ trình phát triển đề xuất
                    </h4>
                    <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#334155', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {analysisResult.lotrinh.map((step: string, idx: number) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
