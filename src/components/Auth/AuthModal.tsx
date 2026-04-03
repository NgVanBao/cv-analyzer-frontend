import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './Auth.css';

export type AuthViewType = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthViewType;
  onViewChange?: (view: AuthViewType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = 'login',
  onViewChange
}) => {
  const [view, setView] = useState<AuthViewType>(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const switchView = (newView: AuthViewType) => {
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  return (
    <div className="auth-overlay" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Đóng">
          &times;
        </button>
        
        {view === 'login' ? (
          <LoginForm onSwitchToRegister={() => switchView('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => switchView('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
