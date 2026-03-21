import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, 
  faArrowLeft, 
  faKey, 
  faShieldAlt,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

const loginContainerStyles = {
  maxWidth: '400px',
  width: '90%',
  margin: '50px auto',
  padding: '32px 24px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.02)'
};

const titleStyles = {
  textAlign: 'center',
  marginBottom: '28px',
  color: '#1F2937',
  fontSize: '24px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px'
};

const inputGroupStyles = {
  marginBottom: '20px'
};

const labelStyles = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '500',
  color: '#374151',
  fontSize: '14px'
};

const inputWrapperStyles = {
  position: 'relative',
  width: '100%'
};

const inputStyles = {
  width: '100%',
  padding: '12px 40px 12px 40px',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '16px',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease',
  outline: 'none'
};

const inputIconStyles = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF',
  fontSize: '16px'
};

const eyeIconStyles = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF',
  cursor: 'pointer',
  fontSize: '16px'
};

const buttonStyles = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#065F46',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const errorStyles = {
  color: '#DC2626',
  textAlign: 'center',
  marginTop: '16px',
  fontSize: '14px',
  padding: '8px',
  backgroundColor: '#FEF2F2',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const infoStyles = {
  textAlign: 'center',
  marginTop: '24px',
  fontSize: '12px',
  color: '#9CA3AF',
  padding: '12px',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const backLinkStyles = {
  textAlign: 'center',
  marginTop: '20px'
};

const backButtonStyles = {
  background: 'none',
  border: 'none',
  color: '#065F46',
  cursor: 'pointer',
  fontSize: '14px',
  textDecoration: 'underline',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  margin: '0 auto'
};

const mobileStyles = `
  @media (max-width: 640px) {
    .admin-login-container {
      margin: 30px auto !important;
      padding: 24px 20px !important;
      width: 95% !important;
    }
    .admin-login-title {
      font-size: 20px !important;
      margin-bottom: 24px !important;
    }
    .admin-login-input {
      padding: 10px 38px !important;
      font-size: 15px !important;
    }
    .admin-login-button {
      padding: 12px !important;
      font-size: 15px !important;
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
    }, 500);
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <style>{mobileStyles}</style>
      <div className="admin-login-container" style={loginContainerStyles}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <FontAwesomeIcon icon={faShieldAlt} style={{ fontSize: '48px', color: '#065F46' }} />
        </div>
        <h2 className="admin-login-title" style={titleStyles}>
          <FontAwesomeIcon icon={faLock} />
          Admin Access
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyles}>
            <label style={labelStyles}>
              <FontAwesomeIcon icon={faKey} style={{ marginRight: '8px' }} />
              Enter Password
            </label>
            <div style={inputWrapperStyles}>
              <div style={inputIconStyles}>
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                className="admin-login-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  ...inputStyles,
                  ...(isFocused ? { borderColor: '#065F46', boxShadow: '0 0 0 3px rgba(6, 95, 70, 0.1)' } : {})
                }}
                autoFocus
                disabled={isLoading}
              />
              <div 
                style={eyeIconStyles}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
          </div>
          
          <button 
            className="admin-login-button"
            type="submit" 
            style={buttonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#065F46'}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faKey} />
            {isLoading ? 'Verifying...' : 'Sign In'}
          </button>
          
          {error && (
            <div style={errorStyles}>
              <FontAwesomeIcon icon={faLock} />
              {error}
            </div>
          )}
        </form>
        
        <div style={infoStyles}>
          <FontAwesomeIcon icon={faKey} />
          <span>
            Default password: <strong>ama1234</strong>
          </span>
        </div>
        
        <div style={backLinkStyles}>
          <button 
            onClick={handleBackToHome}
            style={backButtonStyles}
            onMouseEnter={(e) => e.target.style.color = '#047857'}
            onMouseLeave={(e) => e.target.style.color = '#065F46'}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Catalog
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;