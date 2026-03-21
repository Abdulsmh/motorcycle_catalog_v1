import React, { useState } from 'react';

// Desktop styles
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
  fontWeight: 'bold'
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

const inputStyles = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '16px',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease',
  outline: 'none'
};

const inputFocusStyles = {
  borderColor: '#065F46',
  boxShadow: '0 0 0 3px rgba(6, 95, 70, 0.1)'
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
  marginTop: '8px'
};

const errorStyles = {
  color: '#DC2626',
  textAlign: 'center',
  marginTop: '16px',
  fontSize: '14px',
  padding: '8px',
  backgroundColor: '#FEF2F2',
  borderRadius: '8px'
};

const infoStyles = {
  textAlign: 'center',
  marginTop: '24px',
  fontSize: '12px',
  color: '#9CA3AF',
  padding: '12px',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px'
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
  padding: '8px'
};

// Mobile responsive styles
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
      padding: 10px 14px !important;
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
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate a small delay for better UX
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
          <span style={{ fontSize: '48px' }}>🔐</span>
        </div>
        <h2 className="admin-login-title" style={titleStyles}>Admin Access</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyles}>
            <label style={labelStyles}>Enter Password</label>
            <input
              className="admin-login-input"
              type="password"
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
                ...(isFocused ? inputFocusStyles : {})
              }}
              autoFocus
              disabled={isLoading}
            />
          </div>
          
          <button 
            className="admin-login-button"
            type="submit" 
            style={buttonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#065F46'}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Sign In'}
          </button>
          
          {error && (
            <div style={errorStyles}>
              ⚠️ {error}
            </div>
          )}
        </form>
        
        <div style={infoStyles}>
          <span>🔑 </span>
          {language === 'en' ? 'Default password: ' : 'kalmar sirri ta asali: '}
          <strong>ama1234</strong>
          <br />
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
            {language === 'en' ? '(For demo purposes)' : '(Domin dalilai na gwaji)'}
          </span>
        </div>
        
        <div style={backLinkStyles}>
          <button 
            onClick={handleBackToHome}
            style={backButtonStyles}
            onMouseEnter={(e) => e.target.style.color = '#047857'}
            onMouseLeave={(e) => e.target.style.color = '#065F46'}
          >
            ← {language === 'en' ? 'Back to Catalog' : 'Koma zuwa wajen ganin kaya'}
          </button>
        </div>
      </div>
    </>
  );
}

// Add language prop support
AdminLogin.defaultProps = {
  language: 'en'
};

export default AdminLogin;