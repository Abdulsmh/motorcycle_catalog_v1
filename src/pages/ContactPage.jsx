import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faCheckCircle,
  faSpinner,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, 
  faFacebook, 
  faInstagram, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '24px 16px'
};

// Hero Section - Mobile Optimized
const heroSectionStyles = {
  textAlign: 'center',
  marginBottom: '32px',
  padding: '40px 20px',
  background: 'linear-gradient(135deg, #FEF9E6 0%, #ffffff 100%)',
  borderRadius: '24px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const titleStyles = {
  fontSize: '32px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap'
};

const subtitleStyles = {
  fontSize: '14px',
  color: '#6B7280',
  maxWidth: '500px',
  margin: '0 auto',
  lineHeight: '1.5'
};

// Grid - Mobile Optimized
const gridStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
};

// Contact Info Section - Mobile Optimized
const infoSectionStyles = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '20px',
  border: '1px solid rgba(255,215,0,0.2)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const infoTitleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#1F2937',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const contactItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 0',
  borderBottom: '1px solid #F3F4F6'
};

const contactIconStyles = {
  width: '44px',
  height: '44px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  color: '#FFD700'
};

const contactContentStyles = {
  flex: 1
};

const contactLabelStyles = {
  fontSize: '11px',
  color: '#9CA3AF',
  marginBottom: '2px',
  textTransform: 'uppercase',
  letterSpacing: '0.3px'
};

const contactValueStyles = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#1F2937'
};

// Social Links - Mobile Optimized
const socialLinksStyles = {
  display: 'flex',
  gap: '12px',
  marginTop: '20px',
  justifyContent: 'center'
};

const socialButtonStyles = {
  width: '44px',
  height: '44px',
  backgroundColor: '#F3F4F6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: '#6B7280',
  fontSize: '20px',
  border: 'none'
};

// Form Section - Mobile Optimized
const formSectionStyles = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '20px',
  border: '1px solid rgba(255,215,0,0.2)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const formTitleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '6px',
  color: '#1F2937'
};

const formSubtitleStyles = {
  fontSize: '13px',
  color: '#6B7280',
  marginBottom: '20px'
};

const inputGroupStyles = {
  marginBottom: '16px'
};

const labelStyles = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '500',
  color: '#374151',
  fontSize: '13px'
};

const inputStyles = {
  width: '100%',
  padding: '12px 14px',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};

const textareaStyles = {
  width: '100%',
  padding: '12px 14px',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  minHeight: '100px',
  transition: 'all 0.3s ease',
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical',
  boxSizing: 'border-box'
};

const buttonStyles = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  color: '#0B3B2F',
  border: 'none',
  borderRadius: '40px',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
};

const successStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#D1FAE5',
  color: '#065F46',
  padding: '12px',
  borderRadius: '12px',
  marginBottom: '20px',
  border: '1px solid #A7F3D0',
  fontSize: '13px'
};

// Tablet and Desktop Styles
const tabletStyles = `
  @media (min-width: 768px) {
    .contact-container {
      padding: 32px 24px !important;
    }
    .hero-section {
      padding: 50px 30px !important;
      margin-bottom: 48px !important;
    }
    .hero-title {
      font-size: 40px !important;
    }
    .hero-subtitle {
      font-size: 16px !important;
    }
    .contact-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 32px !important;
    }
    .info-section, .form-section {
      padding: 32px !important;
    }
    .info-title, .form-title {
      font-size: 22px !important;
    }
    .contact-item {
      padding: 14px 0 !important;
    }
    .contact-icon {
      width: 48px !important;
      height: 48px !important;
      font-size: 20px !important;
    }
    .contact-value {
      font-size: 15px !important;
    }
    .social-button {
      width: 48px !important;
      height: 48px !important;
      font-size: 22px !important;
    }
    .form-subtitle {
      font-size: 14px !important;
    }
    .input, .textarea {
      padding: 12px 16px !important;
    }
  }
  
  @media (min-width: 1024px) {
    .contact-container {
      padding: 40px 32px !important;
    }
    .hero-title {
      font-size: 48px !important;
    }
    .hero-subtitle {
      font-size: 18px !important;
    }
    .contact-grid {
      gap: 48px !important;
    }
    .info-section, .form-section {
      padding: 40px !important;
    }
    .info-title, .form-title {
      font-size: 24px !important;
    }
    .contact-value {
      font-size: 16px !important;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function ContactPage({ language = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setIsLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const getInputFocusStyle = (fieldName) => {
    return focusedField === fieldName ? {
      borderColor: '#FFD700',
      boxShadow: '0 0 0 3px rgba(255,215,0,0.1)'
    } : {};
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2347015102718?text=Hello! I have a question about your motorcycles.', '_blank');
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      label: language === 'en' ? 'Email' : 'Imel',
      value: 'support@faggemotorcyclehub.com',
      link: 'mailto:support@faggemotorcyclehub.com'
    },
    {
      icon: faPhone,
      label: language === 'en' ? 'Phone' : 'Waya',
      value: '+234 81-1111-3205',
      link: 'tel:+2348111113205'
    },
    {
      icon: faWhatsapp,
      label: 'WhatsApp',
      value: '+234 701 510 2718',
      link: 'https://wa.me/2347015102718'
    },
    {
      icon: faMapMarkerAlt,
      label: language === 'en' ? 'Location' : 'Wuri',
      value: 'Kano, Nigeria',
      link: null
    },
    {
      icon: faClock,
      label: language === 'en' ? 'Hours' : 'Lokuta',
      value: language === 'en' ? 'Mon-Sat: 9AM-6PM' : 'Lit-Asa: 9-6 na safe/yamma',
      link: null
    }
  ];

  return (
    <>
      <style>{tabletStyles}</style>
      <div className="contact-container" style={containerStyles}>
        {/* Hero Section */}
        <div className="hero-section" style={heroSectionStyles}>
          <h1 className="hero-title" style={titleStyles}>
            <FontAwesomeIcon icon={faEnvelope} />
            {language === 'en' ? 'Contact Us' : 'Tuntuɓi Mu'}
          </h1>
          <p className="hero-subtitle" style={subtitleStyles}>
            {language === 'en' 
              ? 'Have questions? We\'re here to help you find the perfect ride.'
              : 'Kuna da tambayoyi? Muna nan don taimaka muku samun abun hawa daya dace.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid" style={gridStyles}>
          {/* Left Column - Contact Info */}
          <div className="info-section" style={infoSectionStyles}>
            <h2 className="info-title" style={infoTitleStyles}>
              <FontAwesomeIcon icon={faPhone} />
              {language === 'en' ? 'Get in Touch' : 'Tuntuɓe Mu'}
            </h2>
            
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-item" style={contactItemStyles}>
                <div className="contact-icon" style={contactIconStyles}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div style={contactContentStyles}>
                  <div style={contactLabelStyles}>{item.label}</div>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      className="contact-value"
                      style={{ ...contactValueStyles, textDecoration: 'none', color: '#1F2937' }}
                      onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                      onMouseLeave={(e) => e.target.style.color = '#1F2937'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="contact-value" style={contactValueStyles}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Social Links */}
            <div style={socialLinksStyles}>
              <button 
                className="social-button"
                style={socialButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1877f2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.color = '#6B7280';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button 
                className="social-button"
                style={socialButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E4405F';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.color = '#6B7280';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </button>
              <button 
                className="social-button"
                style={socialButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1DA1F2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.color = '#6B7280';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </button>
              <button 
                className="social-button"
                style={socialButtonStyles}
                onClick={handleWhatsAppClick}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#25D366';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#F3F4F6';
                  e.target.style.color = '#6B7280';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="form-section" style={formSectionStyles}>
            <h2 className="form-title" style={formTitleStyles}>
              <FontAwesomeIcon icon={faPaperPlane} />
              {language === 'en' ? 'Send Message' : 'Aika Sako'}
            </h2>
            <p className="form-subtitle" style={formSubtitleStyles}>
              {language === 'en' 
                ? 'Fill out the form and we\'ll respond within 24 hours.'
                : 'Cike fom ɗin kuma za mu amsa cikin awanni 24.'}
            </p>
            
            {submitted && (
              <div style={successStyles}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <div>
                  <strong>{language === 'en' ? 'Message Sent!' : 'An Aika Sako!'}</strong>
                  <br />
                  <span>{language === 'en' ? 'We\'ll respond shortly.' : 'Za mu amsa nan ba da jimawa ba.'}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={inputGroupStyles}>
                <label style={labelStyles}>
                  {language === 'en' ? 'Full Name' : 'Cikakken Suna'} *
                </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyles,
                    ...getInputFocusStyle('name')
                  }}
                  placeholder={language === 'en' ? 'Your name' : 'Sunan ku'}
                  required
                />
              </div>
              
              <div style={inputGroupStyles}>
                <label style={labelStyles}>
                  {language === 'en' ? 'Email Address' : 'Adireshin Email'} *
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyles,
                    ...getInputFocusStyle('email')
                  }}
                  placeholder={language === 'en' ? 'Your email' : 'Email ɗin ku'}
                  required
                />
              </div>
              
              <div style={inputGroupStyles}>
                <label style={labelStyles}>
                  {language === 'en' ? 'Message' : 'Sako'} *
                </label>
                <textarea
                  className="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...textareaStyles,
                    ...getInputFocusStyle('message')
                  }}
                  placeholder={language === 'en' 
                    ? 'Tell us about your motorcycle needs...' 
                    : 'Faɗa mana buƙatun ku game da babura...'}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                style={buttonStyles}
                disabled={isLoading}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 15px rgba(255,215,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    {language === 'en' ? 'Sending...' : 'Ana aikawa...'}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    {language === 'en' ? 'Send Message' : 'Aika Sako'}
                    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '12px' }} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;