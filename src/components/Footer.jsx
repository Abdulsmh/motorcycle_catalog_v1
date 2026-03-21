import React from 'react';
import { Link } from 'react-router-dom';

const footerStyles = {
  backgroundColor: '#333',
  color: 'white',
  padding: '40px 0 20px',
  marginTop: 'auto'
};

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '30px',
  marginBottom: '30px'
};

const sectionTitleStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#fff'
};

const linkStyles = {
  display: 'block',
  color: '#aaa',
  textDecoration: 'none',
  marginBottom: '8px',
  transition: 'color 0.3s'
};

const socialLinksStyles = {
  display: 'flex',
  gap: '15px',
  marginTop: '10px'
};

const socialButtonStyles = {
  backgroundColor: '#555',
  color: 'white',
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'background-color 0.3s'
};

const bottomStyles = {
  textAlign: 'center',
  paddingTop: '20px',
  borderTop: '1px solid #555',
  color: '#aaa',
  fontSize: '14px'
};

function Footer() {
  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={gridStyles}>
          <div>
            <h4 style={sectionTitleStyles}>Fagge MotorCycle Hub</h4>
            <p style={{ color: '#aaa', lineHeight: '1.6' }}>
              Your trusted marketplace for quality motorcycles in Nigeria.
            </p>
          </div>
          
          <div>
            <h4 style={sectionTitleStyles}>Quick Links</h4>
            <Link to="/" style={linkStyles} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Home</Link>
            <Link to="/catalog" style={linkStyles} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Catalog</Link>
            <Link to="/about" style={linkStyles} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>About Us</Link>
            <Link to="/contact" style={linkStyles} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Contact</Link>
            <Link to="/admin" style={linkStyles} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Admin Panel</Link>
          </div>
          
          <div>
            <h4 style={sectionTitleStyles}>Contact Info</h4>
            <p style={{ color: '#aaa' }}>📍 Kano, Nigeria</p>
            <p style={{ color: '#aaa' }}>📞 +234 81-1111-3205</p>
            <p style={{ color: '#aaa' }}>✉️ support@faggemotorcyclehub.com</p>
          </div>
          
          <div>
            <h4 style={sectionTitleStyles}>Follow Us</h4>
            <div style={socialLinksStyles}>
              <a href="#" style={socialButtonStyles} onMouseEnter={(e) => e.target.style.backgroundColor = '#1a73e8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}>📘</a>
              <a href="#" style={socialButtonStyles} onMouseEnter={(e) => e.target.style.backgroundColor = '#1a73e8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}>📷</a>
              <a href="#" style={socialButtonStyles} onMouseEnter={(e) => e.target.style.backgroundColor = '#1a73e8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}>🐦</a>
              <a href="#" style={socialButtonStyles} onMouseEnter={(e) => e.target.style.backgroundColor = '#1a73e8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}>💼</a>
            </div>
          </div>
        </div>
        
        <div style={bottomStyles}>
          <p>© 2026 FaggeMotorCycleHub. All rights reserved. | Designed for Nigerian motorcycle sellers</p>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>
            <Link to="/privacy" style={{ color: '#aaa', textDecoration: 'none' }}>Privacy Policy</Link> | 
            <Link to="/terms" style={{ color: '#aaa', textDecoration: 'none', marginLeft: '10px' }}>Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;