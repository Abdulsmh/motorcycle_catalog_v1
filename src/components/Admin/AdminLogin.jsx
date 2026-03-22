import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, 
  faArrowLeft, 
  faKey, 
  faShieldAlt,
  faEye,
  faEyeSlash,
  faCrown,
  faFingerprint,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

const loginContainerStyles = {
  maxWidth: '450px',
  width: '90%',
  margin: '60px auto',
  padding: '40px 32px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
  borderRadius: '32px',
  boxShadow: '0 25px 45px -12px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.05)',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255,215,0,0.2)'
};

const decorStyles = {
  position: 'absolute',
  top: '-50px',
  right: '-50px',
  width: '150px',
  height: '150px',
  background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)',
  borderRadius: '50%',
  zIndex: 0
};

const decorBottomStyles = {
  position: 'absolute',
  bottom: '-50px',
  left: '-50px',
  width: '150px',
  height: '150px',
  background: 'linear-gradient(135deg, rgba(11,59,47,0.05) 0%, rgba(11,59,47,0.02) 100%)',
  borderRadius: '50%',
  zIndex: 0
};

const titleStyles = {
  textAlign: 'center',
  marginBottom: '32px',
  color: '#1F2937',
  fontSize: '28px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  position: 'relative',
  zIndex: 1
};

const titleIconStyles = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  boxShadow: '0 8px 20px rgba(255,215,0,0.3)'
};

const inputGroupStyles = {
  marginBottom: '24px',
  position: 'relative',
  zIndex: 1
};

const labelStyles = {
  display: 'block',
  marginBottom: '10px',
  fontWeight: '600',
  color: '#374151',
  fontSize: '14px',
  letterSpacing: '0.5px'
};

const inputWrapperStyles = {
  position: 'relative',
  width: '100%'
};

const inputStyles = {
  width: '100%',
  padding: '14px 48px 14px 48px',
  border: '2px solid #E5E7EB',
  borderRadius: '16px',
  fontSize: '15px',
  boxSizing: 'border-box',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none',
  backgroundColor: 'white',
  fontFamily: 'inherit'
};

const inputIconStyles = {
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF',
  fontSize: '18px',
  transition: 'all 0.3s ease'
};

const eyeIconStyles = {
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF',
  cursor: 'pointer',
  fontSize: '18px',
  transition: 'all 0.3s ease',
  padding: '5px'
};

const buttonStyles = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  color: '#0B3B2F',
  border: 'none',
  borderRadius: '40px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  marginTop: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
  position: 'relative',
  zIndex: 1
};

const errorStyles = {
  color: '#DC2626',
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '13px',
  padding: '12px',
  backgroundColor: '#FEF2F2',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  border: '1px solid #FECACA',
  position: 'relative',
  zIndex: 1
};

const infoStyles = {
  textAlign: 'center',
  marginTop: '28px',
  fontSize: '12px',
  color: '#6B7280',
  padding: '12px 16px',
  backgroundColor: 'rgba(255,215,0,0.08)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  border: '1px solid rgba(255,215,0,0.2)',
  position: 'relative',
  zIndex: 1
};

const backLinkStyles = {
  textAlign: 'center',
  marginTop: '24px',
  position: 'relative',
  zIndex: 1
};

const backButtonStyles = {
  background: 'none',
  border: 'none',
  color: '#065F46',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  margin: '0 auto',
  transition: 'all 0.3s ease',
  borderRadius: '40px'
};

const fingerprintStyles = {
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '12px',
  color: '#9CA3AF',
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const mobileStyles = `
  @media (max-width: 640px) {
    .admin-login-container {
      margin: 40px auto !important;
      padding: 32px 24px !important;
      width: 92% !important;
    }
    .admin-login-title {
      font-size: 22px !important;
      margin-bottom: 28px !important;
    }
    .admin-login-input {
      padding: 12px 44px 12px 44px !important;
      font-size: 14px !important;
    }
    .admin-login-button {
      padding: 12px !important;
      font-size: 15px !important;
    }
    .admin-login-title-icon {
      width: 45px !important;
      height: 45px !important;
      margin-bottom: 16px !important;
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
`;

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (password === 'ama1234') {
        onLogin(true);
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const getInputFocusStyle = () => {
    return isFocused ? {
      borderColor: '#FFD700',
      boxShadow: '0 0 0 3px rgba(255,215,0,0.2)'
    } : {};
  };

  return (
    <>
      <style>{mobileStyles}</style>
      <div className="admin-login-container" style={loginContainerStyles}>
        <div style={decorStyles} />
        <div style={decorBottomStyles} />
        
        <div style={titleIconStyles} className="admin-login-title-icon">
          <FontAwesomeIcon icon={faCrown} style={{ fontSize: '28px', color: '#0B3B2F' }} />
        </div>
        
        <h2 className="admin-login-title" style={titleStyles}>
          <FontAwesomeIcon icon={faShieldAlt} style={{ color: '#FFD700' }} />
          Admin Portal
        </h2>
        
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: '14px', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
          Secure access to motorcycle catalog management
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyles}>
            <label style={labelStyles}>
              <FontAwesomeIcon icon={faKey} style={{ marginRight: '8px', color: '#FFD700' }} />
              Access Password
            </label>
            <div style={inputWrapperStyles}>
              <div style={inputIconStyles}>
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                className="admin-login-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  ...inputStyles,
                  ...getInputFocusStyle()
                }}
                autoFocus
                disabled={isLoading}
              />
              <div 
                style={eyeIconStyles}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
          </div>
          
          <button 
            className="admin-login-button"
            type="submit" 
            style={buttonStyles}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255,215,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255,215,0,0.3)';
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Verifying Access...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFingerprint} />
                Authenticate
              </>
            )}
          </button>
          
          {error && (
            <div style={errorStyles}>
              <FontAwesomeIcon icon={faLock} />
              {error}
            </div>
          )}
        </form>
        
        <div style={infoStyles}>
          <FontAwesomeIcon icon={faKey} style={{ color: '#FFD700' }} />
          <span>
            Demo Access: <strong style={{ color: '#065F46' }}>ama1234</strong>
          </span>
        </div>
        
        <div style={fingerprintStyles}>
          <FontAwesomeIcon icon={faFingerprint} />
          <span>Secure • Encrypted • Admin Only</span>
        </div>
        
        <div style={backLinkStyles}>
          <button 
            onClick={handleBackToHome}
            style={backButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.color = '#FFD700';
              e.target.style.transform = 'translateX(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#065F46';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Return to Catalog
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;