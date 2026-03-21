import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faMotorcycle, 
  faInfoCircle, 
  faPhone, 
  faUserShield,
  faLanguage,
  faBars,
  faTimes,
  faCrown
} from '@fortawesome/free-solid-svg-icons';

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
  fontSize: '20px',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const desktopNavStyles = {
  display: 'flex',
  gap: '15px',
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
  fontWeight: isActive ? 'bold' : 'normal',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const adminButtonStyles = {
  backgroundColor: '#047857',
  padding: '8px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'white',
  transition: 'all 0.3s ease',
  fontSize: '14px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const mobileMenuButtonStyles = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const mobileNavStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '15px',
  gap: '10px',
  backgroundColor: '#065F46',
  borderRadius: '12px',
  padding: '15px',
  animation: 'slideDown 0.3s ease'
};

const mobileNavLinkStyles = {
  textDecoration: 'none',
  color: 'white',
  padding: '12px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: '500',
  backgroundColor: '#047857',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const mobileAdminButtonStyles = {
  backgroundColor: '#DC2626',
  padding: '12px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'white',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '5px',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const languageButtonStyles = {
  backgroundColor: '#047857',
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const mobileLanguageButtonStyles = {
  backgroundColor: '#047857',
  padding: '12px',
  borderRadius: '8px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  marginTop: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

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

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setShowAdminButton(true);
      setLogoClickCount(0);
      setTimeout(() => {
        alert(language === 'en' ? 'Admin access granted! Click the admin button to manage motorcycles.' : 'An ba da damar admin! Danna maɓallin admin don sarrafa babura.');
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
    { path: '/', label_en: 'Home', label_ha: 'Gida', icon: faHome },
    { path: '/catalog', label_en: 'Catalog', label_ha: 'Kataloji', icon: faMotorcycle },
    { path: '/about', label_en: 'About', label_ha: 'Game da', icon: faInfoCircle },
    { path: '/contact', label_en: 'Contact', label_ha: 'Tuntuɓi', icon: faPhone }
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
            title={language === 'en' ? 'Click 5 times for admin access' : 'Danna sau 5 don samun damar admin'}
          >
            <FontAwesomeIcon icon={faMotorcycle} />
          </span>
          <Link to="/" style={logoStyles}>
            
            {language === 'en' ? ' MotorCycleHub' : ' Cibiyar Babura'}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div style={desktopNavStyles} className="desktop-nav">
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
              <FontAwesomeIcon icon={item.icon} />
              {language === 'en' ? item.label_en : item.label_ha}
            </Link>
          ))}
          <button onClick={toggleLanguage} style={languageButtonStyles}>
            <FontAwesomeIcon icon={faLanguage} />
            {language === 'en' ? ' Hausa' : ' English'}
          </button>
          
          {showAdminButton && (
            <Link 
              to="/admin" 
              style={adminButtonStyles}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#065F46'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#047857'}
            >
              <FontAwesomeIcon icon={faUserShield} />
              {language === 'en' ? ' Admin' : ' Admin'}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={mobileMenuButtonStyles}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={mobileNavStyles}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={mobileNavLinkStyles}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#065F46'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#047857'}
              >
                <FontAwesomeIcon icon={item.icon} />
                {language === 'en' ? item.label_en : item.label_ha}
              </Link>
            ))}
            <button 
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              style={mobileLanguageButtonStyles}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#065F46'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#047857'}
            >
              <FontAwesomeIcon icon={faLanguage} />
              {language === 'en' ? ' Hausa' : ' English'}
            </button>
            
            {showAdminButton && (
              <Link 
                to="/admin" 
                style={mobileAdminButtonStyles}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
              >
                <FontAwesomeIcon icon={faCrown} />
                {language === 'en' ? ' Admin Panel' : ' Admin Panel'}
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}

export default Header;