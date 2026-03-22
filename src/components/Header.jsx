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
  padding: '15px 0',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 1px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  borderBottom: '1px solid rgba(255,215,0,0.3)'
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
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease'
};

const logoIconStyles = {
  fontSize: '32px',
  filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))',
  animation: 'pulse 2s infinite'
};

const desktopNavStyles = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
  background: 'rgba(255,255,255,0.05)',
  padding: '5px',
  borderRadius: '50px',
  backdropFilter: 'blur(10px)'
};

const navLinkStyles = (isActive) => ({
  textDecoration: 'none',
  color: isActive ? '#FFD700' : 'rgba(255,255,255,0.9)',
  padding: '10px 20px',
  borderRadius: '40px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: isActive ? 'rgba(255,215,0,0.15)' : 'transparent',
  fontWeight: isActive ? 'bold' : '500',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
  overflow: 'hidden',
  letterSpacing: '0.5px'
});

const adminButtonStyles = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  padding: '10px 24px',
  borderRadius: '40px',
  textDecoration: 'none',
  color: '#0B3B2F',
  transition: 'all 0.3s ease',
  fontSize: '14px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
  border: 'none',
  cursor: 'pointer'
};

const mobileMenuButtonStyles = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,215,0,0.3)',
  color: '#FFD700',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)'
};

const mobileNavStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '20px',
  gap: '12px',
  background: 'linear-gradient(135deg, rgba(11,59,47,0.98) 0%, rgba(26,93,74,0.98) 100%)',
  borderRadius: '24px',
  padding: '20px',
  animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,215,0,0.2)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
};

const mobileNavLinkStyles = {
  textDecoration: 'none',
  color: 'white',
  padding: '14px',
  borderRadius: '16px',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: '500',
  background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const mobileAdminButtonStyles = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  padding: '14px',
  borderRadius: '16px',
  textDecoration: 'none',
  color: '#0B3B2F',
  textAlign: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '8px',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  boxShadow: '0 4px 15px rgba(255,215,0,0.3)'
};

const languageButtonStyles = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
  padding: '10px 20px',
  borderRadius: '40px',
  border: '1px solid rgba(255,215,0,0.3)',
  color: '#FFD700',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backdropFilter: 'blur(10px)'
};

const mobileLanguageButtonStyles = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
  padding: '14px',
  borderRadius: '16px',
  border: '1px solid rgba(255,215,0,0.3)',
  color: '#FFD700',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  backdropFilter: 'blur(10px)'
};

function Header({ language, setLanguage }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        alert(language === 'en' ? '✨ Admin access granted! Click the crown to manage motorcycles.' : '✨ An ba da damar admin! Danna madanni me kambu don sarrafa babura.');
      }, 100);
    }
    setTimeout(() => setLogoClickCount(0), 3000);
  };

  const dynamicHeaderStyles = {
    ...headerStyles,
    background: isScrolled 
      ? 'linear-gradient(135deg, #052E24 0%, #0B3B2F 100%)' 
      : 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 50%, #0B3B2F 100%)',
    padding: isScrolled ? '12px 0' : '15px 0',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const navItems = [
    { path: '/', label_en: 'Home', label_ha: 'Gida', icon: faHome },
    { path: '/catalog', label_en: 'Catalog', label_ha: 'Wajen Kaya', icon: faMotorcycle },
    { path: '/about', label_en: 'About Us', label_ha: 'Game da mu ', icon: faInfoCircle },
    { path: '/contact', label_en: 'Contact Us', label_ha: 'Tuntuɓemu', icon: faPhone }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ha' : 'en');
  };

  return (
    <header style={dynamicHeaderStyles}>
      <div style={containerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span 
            style={{ 
              ...logoIconStyles, 
              cursor: 'pointer',
              transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }} 
            onClick={handleLogoClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={language === 'en' ? 'Click 5 times for admin access' : 'Danna sau 5 don samun damar admin'}
          >
            <FontAwesomeIcon icon={faBolt} style={{ color: '#FFD700' }} />
          </span>
          <Link to="/" style={logoStyles} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            <FontAwesomeIcon icon={faFire} style={{ color: '#FFD700' }} />
            {language === 'en' ? 'Fagge MotorCycleHub' : ' Fagge Yan-Babura'}
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
              {language === 'en' ? ' Admin' : ' Admin'}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={mobileMenuButtonStyles}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button"
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
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
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateX(5px)';
                  e.target.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.1) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)';
                }}
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
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0.15) 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 100%)'}
            >
              <FontAwesomeIcon icon={faLanguage} />
              {language === 'en' ? ' Hausa' : ' English'}
            </button>
            
            {showAdminButton && (
              <Link 
                to="/admin" 
                style={mobileAdminButtonStyles}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255,215,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255,215,0,0.3)';
                }}
              >
                <FontAwesomeIcon icon={faCrown} />
                {language === 'en' ? ' Admin Panel' : ' Admin Panel'}
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
        
        /* Premium scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0B3B2F;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
        }
      `}</style>
    </header>
  );
}

export default Header;