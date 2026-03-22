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
  faCrown,
  faFire,
  faBolt
} from '@fortawesome/free-solid-svg-icons';

// Premium gradient colors - Nigerian flag inspired with luxury gold
const headerStyles = {
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 50%, #0B3B2F 100%)',
  color: 'white',
  padding: '12px 0',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 1px 8px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  borderBottom: '1px solid rgba(255,215,0,0.3)'
};

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const logoStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease'
};

const logoIconStyles = {
  fontSize: '24px',
  filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

const desktopNavStyles = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
  background: 'rgba(255,255,255,0.05)',
  padding: '4px',
  borderRadius: '50px',
  backdropFilter: 'blur(10px)'
};

const navLinkStyles = (isActive) => ({
  textDecoration: 'none',
  color: isActive ? '#FFD700' : 'rgba(255,255,255,0.9)',
  padding: '8px 16px',
  borderRadius: '40px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: isActive ? 'rgba(255,215,0,0.15)' : 'transparent',
  fontWeight: isActive ? 'bold' : '500',
  fontSize: '13px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap'
});

const adminButtonStyles = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  padding: '8px 20px',
  borderRadius: '40px',
  textDecoration: 'none',
  color: '#0B3B2F',
  transition: 'all 0.3s ease',
  fontSize: '13px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};

const mobileMenuButtonStyles = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,215,0,0.3)',
  color: '#FFD700',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  width: '44px',
  height: '44px'
};

const mobileNavStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '16px',
  gap: '10px',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  borderRadius: '20px',
  padding: '16px',
  animation: 'slideDown 0.3s ease',
  border: '1px solid rgba(255,215,0,0.2)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
};

const mobileNavLinkStyles = {
  textDecoration: 'none',
  color: 'white',
  padding: '12px',
  borderRadius: '12px',
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: '500',
  background: 'rgba(255,215,0,0.1)',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  border: '1px solid rgba(255,215,0,0.2)',
  WebkitTapHighlightColor: 'transparent'
};

const mobileAdminButtonStyles = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  padding: '12px',
  borderRadius: '12px',
  textDecoration: 'none',
  color: '#0B3B2F',
  textAlign: 'center',
  fontSize: '15px',
  fontWeight: 'bold',
  marginTop: '8px',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
  WebkitTapHighlightColor: 'transparent'
};

const languageButtonStyles = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
  padding: '8px 16px',
  borderRadius: '40px',
  border: '1px solid rgba(255,215,0,0.3)',
  color: '#FFD700',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  backdropFilter: 'blur(10px)',
  whiteSpace: 'nowrap'
};

const mobileLanguageButtonStyles = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
  padding: '12px',
  borderRadius: '12px',
  border: '1px solid rgba(255,215,0,0.3)',
  color: '#FFD700',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 'bold',
  width: '100%',
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  backdropFilter: 'blur(10px)',
  WebkitTapHighlightColor: 'transparent'
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
    
    // Close mobile menu on window resize (if screen becomes larger)
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (newCount >= 5) {
      setShowAdminButton(true);
      setLogoClickCount(0);
      setTimeout(() => {
        alert(language === 'en' ? '✨ Admin access granted!' : '✨ An ba da damar admin!');
      }, 100);
    }
    setTimeout(() => setLogoClickCount(0), 3000);
  };

  const dynamicHeaderStyles = {
    ...headerStyles,
    background: isScrolled 
      ? 'linear-gradient(135deg, #052E24 0%, #0B3B2F 100%)' 
      : 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 50%, #0B3B2F 100%)',
    padding: isScrolled ? '10px 0' : '12px 0',
    transition: 'all 0.3s ease'
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={dynamicHeaderStyles}>
      <div style={containerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span 
            style={logoIconStyles} 
            onClick={handleLogoClick}
            title={language === 'en' ? 'Tap 5 times for admin access' : 'Danna sau 5 don samun damar admin'}
          >
            <FontAwesomeIcon icon={faBolt} style={{ color: '#FFD700' }} />
          </span>
          <Link to="/" style={logoStyles}>
            <FontAwesomeIcon icon={faFire} style={{ color: '#FFD700' }} />
            <span style={{ fontSize: '16px' }}>{language === 'en' ? 'Fagge MotorCycleHub' : 'Fagge MotorCycleHub'}</span>
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
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = 'rgba(255,215,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
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
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(255,215,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 15px rgba(255,215,0,0.3)';
              }}
            >
              <FontAwesomeIcon icon={faCrown} />
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={mobileMenuButtonStyles}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button"
          aria-label="Menu"
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
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon={item.icon} />
                {language === 'en' ? item.label_en : item.label_ha}
              </Link>
            ))}
            <button 
              onClick={() => {
                toggleLanguage();
                closeMobileMenu();
              }}
              style={mobileLanguageButtonStyles}
            >
              <FontAwesomeIcon icon={faLanguage} />
              {language === 'en' ? 'Hausa' : 'English'}
            </button>
            
            {showAdminButton && (
              <Link 
                to="/admin" 
                style={mobileAdminButtonStyles}
                onClick={closeMobileMenu}
              >
                <FontAwesomeIcon icon={faCrown} />
                Admin Panel
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(255,215,0,0.5));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(255,215,0,0.8));
          }
        }
        
        /* Mobile menu button visibility */
        .mobile-menu-button {
          display: flex !important;
        }
        
        /* Desktop navigation visibility */
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
        
        /* Touch-friendly tap highlights */
        button, a {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;