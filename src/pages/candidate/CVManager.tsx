import React, { useState, useEffect, useRef } from 'react';
import { FileText, UploadCloud, Trash2, Eye, Download, Search, Filter, Star, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CVManager.css';

interface CVItem {
  id: number;
  name: string;
  uploadDate: string;
  size: string;
  status: string;
  score: number | null;
  fileUrl: string;
}

const CVManager: React.FC = () => {
  const { user } = useAuth();
  const [cvs, setCvs] = useState<CVItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [primaryId, setPrimaryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCVs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/ho-so-cv', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        // Lọc danh sách CV thuộc về user hiện tại (nếu user đã đăng nhập)
        const userCVs = data.filter((item: any) => user ? item.MaTaiKhoan.toString() === user.id : true);
        
        const mappedCVs: CVItem[] = userCVs.map((item: any) => {
          let score: number | null = null;
          // Tự động gán hoặc tính toán điểm số AI nếu trạng thái hoàn thành
          if (item.TrangThaiXuLy === 'Hoàn thành' || item.TrangThaiXuLy === 'Phân tích xong') {
            score = 85; // Điểm số mặc định minh họa
            try {
              if (item.DuLieuAITrichXuat) {
                const parsed = JSON.parse(item.DuLieuAITrichXuat);
                if (parsed.skills && parsed.skills.length > 0) {
                  score = Math.min(100, 70 + parsed.skills.length * 3);
                }
              }
            } catch (e) {
              // Bỏ qua lỗi parse
            }
          }

          return {
            id: item.MaCV,
            name: item.TenFile || 'CV_UngVien.pdf',
            uploadDate: item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
            size: 'Không rõ', // Database backend không lưu trữ dung lượng file
            status: item.TrangThaiXuLy === 'Hoàn thành' ? 'Phân tích xong' : item.TrangThaiXuLy || 'Chưa xử lý',
            score: score,
            fileUrl: item.DuongDanFile ? `http://localhost:8000/storage/${item.DuongDanFile}` : ''
          };
        });

        // Sắp xếp CV mới nhất lên đầu danh sách
        mappedCVs.sort((a, b) => b.id - a.id);

        setCvs(mappedCVs);
        // Tự động gán CV đầu tiên làm CV chính nếu chưa chọn
        if (mappedCVs.length > 0 && !primaryId) {
          setPrimaryId(mappedCVs[0].id);
        }
      } else {
        console.error('Lỗi khi tải dữ liệu CV từ máy chủ');
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, [user]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (!user?.id) {
        alert('Vui lòng đăng nhập tài khoản để tải lên CV!');
        return;
      }

      // Validate định dạng file PDF
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Hệ thống chỉ hỗ trợ định dạng file PDF để AI có thể phân tích chính xác nhất.');
        return;
      }

      const formData = new FormData();
      formData.append('MaTaiKhoan', user.id);
      formData.append('file_cv', file);

      setIsUploading(true);
      try {
        const response = await fetch('http://localhost:8000/api/ho-so-cv', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          alert('Tải lên CV thành công! Hệ thống đang tiến hành phân tích hồ sơ ngầm bằng AI...');
          fetchCVs();
        } else {
          alert(`Tải lên thất bại: ${result.message || 'Vui lòng kiểm tra lại dung lượng file (tối đa 5MB)'}`);
        }
      } catch (error) {
        console.error('Lỗi tải lên:', error);
        alert('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      } finally {
        setIsUploading(false);
        if (e.target) {
          e.target.value = '';
        }
      }
    }
  };

  const setPrimaryCv = (id: number) => {
    setPrimaryId(id);
    alert('Đã cập nhật CV chính thành công!');
  };

  const deleteCv = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn hồ sơ CV này khỏi cơ sở dữ liệu?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/ho-so-cv/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });

        if (response.ok) {
          const remainingCvs = cvs.filter(cv => cv.id !== id);
          setCvs(remainingCvs);
          if (primaryId === id) {
            setPrimaryId(remainingCvs.length > 0 ? remainingCvs[0].id : null);
          }
          alert('Đã xóa hồ sơ CV thành công!');
        } else {
          alert('Xóa CV thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Lỗi khi xóa CV:', error);
        alert('Lỗi kết nối máy chủ.');
      }
    }
  };

  const filteredCVs = cvs.filter(cv => {
    const matchSearch = cv.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchSearch) return false;
    if (filterStatus === 'primary') return cv.id === primaryId;
    if (filterStatus === 'analyzed') return cv.status === 'Phân tích xong';
    return true;
  });

  return (
    <div className="cv-manager">
      <div className="cv-manager-header">
        <div>
          <h2>Quản Lý Hồ Sơ (CV)</h2>
          <p>Tải lên, quản lý và theo dõi kết quả phân tích các bản CV của bạn</p>
        </div>
        <button className="btn-upload-primary" onClick={handleUploadClick} disabled={isUploading}>
          {isUploading ? <Loader2 size={20} className="spin-animation" /> : <UploadCloud size={20} />}
          <span>{isUploading ? 'Đang tải lên...' : 'Tải CV Mới'}</span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="cv-toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm CV theo tên file..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={18} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tất cả CV</option>
            <option value="primary">CV Chính</option>
            <option value="analyzed">Đã phân tích</option>
          </select>
        </div>
      </div>

      <div className="cv-grid">
        {isLoading ? (
          <div className="loading-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
            <Loader2 size={36} className="spin-animation" style={{ margin: '0 auto 16px auto', color: '#4f46e5' }} />
            <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>Đang tải dữ liệu CV...</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Hệ thống đang kết nối với cơ sở dữ liệu MySQL</p>
          </div>
        ) : filteredCVs.length > 0 ? (
          filteredCVs.map((cv) => (
            <div className={`cv-card ${cv.id === primaryId ? 'primary-card' : ''}`} key={cv.id}>
              {cv.id === primaryId && (
                <div className="primary-badge">
                  <Star size={10} fill="currentColor" />
                  Chính
                </div>
              )}
              
              <div className="cv-card-header">
                <div className={`cv-icon ${cv.id === primaryId ? 'bg-primary' : 'bg-gray'}`}>
                  <FileText size={24} />
                </div>
                <div className="cv-actions">
                  <button 
                    className="icon-btn" 
                    title="Xem trước" 
                    onClick={() => cv.fileUrl ? window.open(cv.fileUrl, '_blank') : alert('File chưa sẵn sàng')}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="icon-btn" 
                    title="Tải xuống" 
                    onClick={() => cv.fileUrl ? window.open(cv.fileUrl, '_blank') : alert('File chưa sẵn sàng')}
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    className="icon-btn danger" 
                    title="Xóa" 
                    onClick={() => deleteCv(cv.id)} 
                    disabled={cv.id === primaryId}
                  >
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
                <div className={`status-badge ${cv.status === 'Phân tích xong' ? 'success' : 'pending'}`}>
                  {cv.status}
                </div>
                {cv.score !== null && (
                  <div className="score-badge">
                    Điểm AI: <strong>{cv.score}</strong>
                  </div>
                )}
              </div>
              
              {cv.id !== primaryId && (
                <button className="btn-set-primary" onClick={() => setPrimaryCv(cv.id)}>
                  Đặt làm CV chính
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <FileText size={48} className="empty-icon" />
            <h3>Chưa có hồ sơ CV nào</h3>
            <p>Vui lòng tải lên CV mới của bạn dưới dạng file PDF để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVManager;
