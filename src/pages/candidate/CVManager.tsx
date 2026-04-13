import React, { useState, useRef } from 'react';
import { FileText, UploadCloud, Trash2, Eye, Download, Search, Filter, Star } from 'lucide-react';
import './CVManager.css';

// Mock data for CVs
const mockCVs = [
  {
    id: 1,
    name: 'Nguyen_Van_A_Frontend_Dev.pdf',
    uploadDate: '12/04/2026',
    size: '1.2 MB',
    status: 'Phân tích xong',
    score: 85,
    isPrimary: true,
  },
  {
    id: 2,
    name: 'NguyenVanA_CV_v2_Backend.pdf',
    uploadDate: '10/04/2026',
    size: '1.5 MB',
    status: 'Phân tích xong',
    score: 72,
    isPrimary: false,
  },
  {
    id: 3,
    name: 'Draft_CV_Fullstack2026.pdf',
    uploadDate: '01/04/2026',
    size: '800 KB',
    status: 'Chưa phân tích',
    score: null,
    isPrimary: false,
  }
];

const CVManager: React.FC = () => {
  const [cvs, setCvs] = useState(mockCVs);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      const newCv = {
        id: Date.now(),
        name: newFile.name,
        uploadDate: new Date().toLocaleDateString('vi-VN'),
        size: (newFile.size / 1024 / 1024).toFixed(2) + ' MB',
        status: 'Vừa tải lên',
        score: null,
        isPrimary: false,
      };
      setCvs([newCv, ...cvs]);
      alert('Tải lên CV thành công!');
    }
  };

  const setPrimaryCv = (id: number) => {
    setCvs(cvs.map(cv => ({
      ...cv,
      isPrimary: cv.id === id
    })));
    alert('Đã cập nhật CV chính!');
  };

  const deleteCv = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa CV này? Nếu là CV chính, vui lòng chọn CV khác làm mặc định.')) {
      setCvs(cvs.filter(cv => cv.id !== id));
    }
  };

  const filteredCVs = cvs.filter(cv => cv.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="cv-manager">
      <div className="cv-manager-header">
        <div>
          <h2>Quản Lý Hồ Sơ (CV)</h2>
          <p>Tải lên, quản lý và theo dõi các bản CV của bạn</p>
        </div>
        <button className="btn-upload-primary" onClick={handleUploadClick}>
          <UploadCloud size={20} />
          <span>Tải CV Mới</span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <div className="cv-toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm CV theo tên..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} />
          <select>
            <option value="all">Tất cả CV</option>
            <option value="primary">CV Chính</option>
            <option value="analyzed">Đã phân tích</option>
          </select>
        </div>
      </div>

      <div className="cv-grid">
        {filteredCVs.length > 0 ? (
          filteredCVs.map((cv) => (
            <div className={`cv-card ${cv.isPrimary ? 'primary-card' : ''}`} key={cv.id}>
              {cv.isPrimary && (
                <div className="primary-badge">
                  <Star size={10} fill="currentColor" />
                  Chính
                </div>
              )}
              
              <div className="cv-card-header">
                <div className={`cv-icon ${cv.isPrimary ? 'bg-primary' : 'bg-gray'}`}>
                  <FileText size={24} />
                </div>
                <div className="cv-actions">
                  <button className="icon-btn" title="Xem trước"><Eye size={16} /></button>
                  <button className="icon-btn" title="Tải xuống"><Download size={16} /></button>
                  <button className="icon-btn danger" title="Xóa" onClick={() => deleteCv(cv.id)} disabled={cv.isPrimary}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="cv-info">
                <h3 className="cv-name" title={cv.name}>{cv.name}</h3>
                <div className="cv-meta">
                  <span>{cv.uploadDate}</span> • <span>{cv.size}</span>
                </div>
              </div>
              
              <div className="cv-footer">
                <div className={`status-badge ${cv.score ? 'success' : 'pending'}`}>
                  {cv.status}
                </div>
                {cv.score !== null && (
                  <div className="score-badge">
                    Điểm AI: <strong>{cv.score}</strong>
                  </div>
                )}
              </div>
              
              {!cv.isPrimary && (
                <button className="btn-set-primary" onClick={() => setPrimaryCv(cv.id)}>
                  Đặt làm CV chính
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FileText size={48} className="empty-icon" />
            <h3>Không tìm thấy CV nào</h3>
            <p>Vui lòng tải lên CV mới hoặc đổi từ khóa tìm kiếm.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVManager;
