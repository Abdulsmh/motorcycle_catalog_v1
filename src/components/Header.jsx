import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const headerStyles = {
  backgroundColor: '#065F46',
  color: 'white',
  padding: '15px 0',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const logoStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const navStyles = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const navLinkStyles = (isActive) => ({
  textDecoration: 'none',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  backgroundColor: isActive ? '#047857' : 'transparent',
  fontWeight: isActive ? 'bold' : 'normal'
});

const adminButtonStyles = {
  backgroundColor: '#047857',
  padding: '8px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'white',
  transition: 'all 0.3s ease'
};

const languageButtonStyles = {
  backgroundColor: '#047857',
  padding: '6px 12px',
  borderRadius: '6px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

// Secret admin access - only shows if you click logo 5 times
function Header({ language, setLanguage }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret admin access - click logo 5 times to reveal admin button
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setShowAdminButton(true);
      setLogoClickCount(0);
      setTimeout(() => {
        alert('Admin access granted! Click the admin button to manage motorcycles.');
      }, 100);
    }
    setTimeout(() => setLogoClickCount(0), 3000);
  };

  const dynamicHeaderStyles = {
    ...headerStyles,
    backgroundColor: isScrolled ? '#047857' : '#065F46',
    padding: isScrolled ? '10px 0' : '15px 0',
    transition: 'all 0.3s'
  };

  const navItems = [
    { path: '/', label_en: 'Home', label_ha: 'Gida', icon: '🏠' },
    { path: '/catalog', label_en: 'Catalog', label_ha: 'Kataloji', icon: '🏍️' },
    { path: '/about', label_en: 'About', label_ha: 'Game da', icon: 'ℹ️' },
    { path: '/contact', label_en: 'Contact', label_ha: 'Tuntuɓi', icon: '📞' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ha' : 'en');
  };

  return (
    <header style={dynamicHeaderStyles}>
      <div style={containerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span 
            style={{ fontSize: '28px', cursor: 'pointer' }} 
            onClick={handleLogoClick}
            title="Click 5 times for admin access"
          >
            🏍️
          </span>
          <Link to="/" style={logoStyles}>
            {language === 'en' ? 'MotorCycleHub Nigeria' : 'Cibiyar Babura Nigeria'}
          </Link>
        </div>

        <div style={{ ...navStyles, display: 'flex' }} className="desktop-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={navLinkStyles(location.pathname === item.path)}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = '#047857';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.icon} {language === 'en' ? item.label_en : item.label_ha}
            </Link>
          ))}
          <button onClick={toggleLanguage} style={languageButtonStyles}>
            {language === 'en' ? '🇳🇬 Hausa' : '🇬🇧 English'}
          </button>
          
          {/* Admin button - only visible when showAdminButton is true */}
          {showAdminButton && (
            <Link 
              to="/admin" 
              style={adminButtonStyles}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#065F46'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#047857'}
            >
              🔧 {language === 'en' ? 'Admin' : 'Admin'}
            </Link>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;