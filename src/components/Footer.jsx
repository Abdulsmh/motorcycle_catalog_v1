import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faWhatsapp,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faMotorcycle,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';

const footerStyles = {
  background: 'linear-gradient(135deg, #0B3B2F 0%, #052E24 50%, #0B3B2F 100%)',
  color: 'white',
  padding: '60px 0 20px',
  marginTop: 'auto',
  position: 'relative',
  borderTop: '2px solid rgba(255,215,0,0.3)',
  boxShadow: '0 -10px 30px rgba(0,0,0,0.2)'
};

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  marginBottom: '40px'
};

const sectionTitleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
  position: 'relative',
  paddingBottom: '10px'
};

const sectionTitleUnderline = {
  content: '""',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '50px',
  height: '3px',
  background: 'linear-gradient(90deg, #FFD700, #FFA500)',
  borderRadius: '3px'
};

const linkStyles = {
  display: 'block',
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  marginBottom: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '14px',
  position: 'relative',
  paddingLeft: '0'
};

const socialLinksStyles = {
  display: 'flex',
  gap: '15px',
  marginTop: '20px',
  flexWrap: 'wrap'
};

const socialButtonStyles = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: '#FFD700',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(255,215,0,0.3)',
  fontSize: '18px'
};

const bottomStyles = {
  textAlign: 'center',
  paddingTop: '30px',
  borderTop: '1px solid rgba(255,215,0,0.2)',
  color: 'rgba(255,255,255,0.6)',
  fontSize: '13px'
};

const contactInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '15px',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '14px',
  transition: 'all 0.3s ease'
};

const contactIconStyles = {
  width: '35px',
  height: '35px',
  backgroundColor: 'rgba(255,215,0,0.15)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFD700',
  fontSize: '16px'
};

const scrollTopButtonStyles = {
  position: 'absolute',
  top: '-25px',
  right: '50px',
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: 'none',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  fontSize: '24px'
};

const badgeStyles = {
  display: 'inline-block',
  backgroundColor: 'rgba(255,215,0,0.15)',
  padding: '5px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  color: '#FFD700',
  marginTop: '15px'
};

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={footerStyles}>
      {/* Scroll to Top Button */}
      <button 
        style={scrollTopButtonStyles}
        onClick={scrollToTop}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.backgroundColor = '#FFA500';
          e.target.style.boxShadow = '0 6px 20px rgba(255,215,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.backgroundColor = '#FFD700';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <div style={containerStyles}>
        <div style={gridStyles}>
          {/* Brand Section */}
          <div>
            <h4 style={sectionTitleStyles}>
              <FontAwesomeIcon icon={faMotorcycle} style={{ marginRight: '8px', color: '#FFD700' }} />
              Fagge MotorCycle Hub
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '20px' }}>
              Your trusted marketplace for quality motorcycles in Nigeria. 
              Premium bikes, best prices, and exceptional service.
            </p>
            <div style={badgeStyles}>
              ⭐ Trusted Since 2026
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h4 style={sectionTitleStyles}>Quick Links</h4>
            <Link 
              to="/" 
              style={linkStyles} 
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD700';
                e.target.style.transform = 'translateX(5px)';
              }} 
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.7)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              🏠 Home
            </Link>
            <Link 
              to="/catalog" 
              style={linkStyles} 
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD700';
                e.target.style.transform = 'translateX(5px)';
              }} 
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.7)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              🏍️ Catalog
            </Link>
            <Link 
              to="/about" 
              style={linkStyles} 
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD700';
                e.target.style.transform = 'translateX(5px)';
              }} 
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.7)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              ℹ️ About Us
            </Link>
            <Link 
              to="/contact" 
              style={linkStyles} 
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD700';
                e.target.style.transform = 'translateX(5px)';
              }} 
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255,255,255,0.7)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              📞 Contact
            </Link>
          </div>
          
          {/* Contact Info Section */}
          <div>
            <h4 style={sectionTitleStyles}>Contact Info</h4>
            <div style={contactInfoStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <span>Kano, Nigeria</span>
            </div>
            <div style={contactInfoStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <span>+234 81-1111-3205</span>
            </div>
            <div style={contactInfoStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <span>support@faggemotorcyclehub.com</span>
            </div>
            <div style={contactInfoStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
              <span>+234 701 510 2718 (WhatsApp)</span>
            </div>
          </div>
          
          {/* Social & Newsletter Section */}
          <div>
            <h4 style={sectionTitleStyles}>Connect With Us</h4>
            <div style={socialLinksStyles}>
              <a 
                href="#" 
                style={socialButtonStyles} 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1877f2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                }} 
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#FFD700';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a 
                href="#" 
                style={socialButtonStyles} 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E4405F';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                }} 
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#FFD700';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a 
                href="#" 
                style={socialButtonStyles} 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1DA1F2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                }} 
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#FFD700';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a 
                href="#" 
                style={socialButtonStyles} 
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#25D366';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                }} 
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = '#FFD700';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div style={{ marginTop: '25px' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '10px' }}>
                Subscribe for new arrivals & offers
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '25px',
                    border: '1px solid rgba(255,215,0,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button 
                  style={{
                    padding: '10px 20px',
                    borderRadius: '25px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#0B3B2F',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div style={bottomStyles}>
          <p>© 2026 Fagge MotorCycle Hub. All rights reserved.</p>
          <p style={{ marginTop: '12px', fontSize: '12px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD700'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD700'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
              Terms of Service
            </Link>
            <span>|</span>
            <Link to="/refund" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD700'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
              Refund Policy
            </Link>
          </p>
          <p style={{ marginTop: '15px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
            Designed with ❤️ for Fagge motorcycle sellers | Premium Quality Since 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;