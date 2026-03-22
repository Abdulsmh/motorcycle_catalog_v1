import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faCheckCircle,
  faSpinner
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
  padding: '40px 24px'
};

const heroSectionStyles = {
  textAlign: 'center',
  marginBottom: '60px',
  padding: '60px 20px',
  background: 'linear-gradient(135deg, #FEF9E6 0%, #ffffff 100%)',
  borderRadius: '32px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const titleStyles = {
  fontSize: '48px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px'
};

const subtitleStyles = {
  fontSize: '18px',
  color: '#6B7280',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '40px'
};

const infoSectionStyles = {
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '24px',
  border: '1px solid rgba(255,215,0,0.2)',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)'
};

const infoTitleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '24px',
  color: '#1F2937',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const contactItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 0',
  borderBottom: '1px solid #F3F4F6'
};

const contactIconStyles = {
  width: '50px',
  height: '50px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: '#FFD700'
};

const contactContentStyles = {
  flex: 1
};

const contactLabelStyles = {
  fontSize: '12px',
  color: '#9CA3AF',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const contactValueStyles = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#1F2937'
};

const socialLinksStyles = {
  display: 'flex',
  gap: '16px',
  marginTop: '24px'
};

const socialButtonStyles = {
  width: '45px',
  height: '45px',
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

const formSectionStyles = {
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '24px',
  border: '1px solid rgba(255,215,0,0.2)',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)'
};

const formTitleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#1F2937'
};

const formSubtitleStyles = {
  fontSize: '14px',
  color: '#6B7280',
  marginBottom: '24px'
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
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  outline: 'none',
  fontFamily: 'inherit'
};

const textareaStyles = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  minHeight: '120px',
  transition: 'all 0.3s ease',
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical'
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
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const successStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#D1FAE5',
  color: '#065F46',
  padding: '16px',
  borderRadius: '12px',
  marginBottom: '24px',
  border: '1px solid #A7F3D0'
};

const mobileStyles = `
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
    .hero-title {
      font-size: 32px !important;
    }
    .info-section, .form-section {
      padding: 24px !important;
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
    
    // Simulate API call
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
      label: language === 'en' ? 'Email Us' : 'Turo mana Email',
      value: 'support@faggemotorcyclehub.com',
      link: 'mailto:support@faggemotorcyclehub.com'
    },
    {
      icon: faPhone,
      label: language === 'en' ? 'Call Us' : 'Kira Mu',
      value: '+234 81-1111-3205',
      link: 'tel:+2348111113205'
    },
    {
      icon: faWhatsapp,
      label: language === 'en' ? 'WhatsApp' : 'WhatsApp',
      value: '+234 701 510 2718',
      link: 'https://wa.me/2347015102718'
    },
    {
      icon: faMapMarkerAlt,
      label: language === 'en' ? 'Visit Us' : 'Ziyarce Mu',
      value: language === 'en' ? 'Kano, Nigeria' : 'Kano, Nigeria',
      link: null
    },
    {
      icon: faClock,
      label: language === 'en' ? 'Business Hours' : 'Lokutan Aiki',
      value: language === 'en' ? 'Mon - Sat: 9:00 AM - 6:00 PM' : 'Lit - Asabar: 9:00 na safe - 6:00 na yamma',
      link: null
    }
  ];

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={containerStyles}>
        {/* Hero Section */}
        <div style={heroSectionStyles}>
          <h1 className="hero-title" style={titleStyles}>
            <FontAwesomeIcon icon={faEnvelope} style={{ color: '#FFD700' }} />
            {language === 'en' ? 'Contact Us' : 'Tuntuɓi Mu'}
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#FFD700' }} />
          </h1>
          <p style={subtitleStyles}>
            {language === 'en' 
              ? 'Have questions about our motorcycles? We\'re here to help you find the perfect ride.'
              : 'Kuna da tambayoyi game da baburan mu? Muna nan don taimaka muku wajen samun abun hawa daya dace daku'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid" style={gridStyles}>
          {/* Left Column - Contact Info */}
          <div className="info-section" style={infoSectionStyles}>
            <h2 style={infoTitleStyles}>
              <FontAwesomeIcon icon={faPhone} style={{ color: '#FFD700' }} />
              {language === 'en' ? 'Get in Touch' : 'Tuntuɓe Mu'}
            </h2>
            
            {contactInfo.map((item, index) => (
              <div key={index} style={contactItemStyles}>
                <div style={contactIconStyles}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div style={contactContentStyles}>
                  <div style={contactLabelStyles}>{item.label}</div>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      style={{ ...contactValueStyles, textDecoration: 'none', color: '#1F2937' }}
                      onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                      onMouseLeave={(e) => e.target.style.color = '#1F2937'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div style={contactValueStyles}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Social Links */}
            <div style={socialLinksStyles}>
              <button 
                style={socialButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1877f2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
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
                style={socialButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E4405F';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
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
                style={socialButtonStyles}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1DA1F2';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
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
                style={socialButtonStyles}
                onClick={handleWhatsAppClick}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#25D366';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
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
            <h2 style={formTitleStyles}>
              <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#FFD700', marginRight: '8px' }} />
              {language === 'en' ? 'Send us a Message' : 'Turo mana Sako'}
            </h2>
            <p style={formSubtitleStyles}>
              {language === 'en' 
                ? 'Fill out the form below and we\'ll get back to you within 24 hours.'
                : 'Cike fom ɗin da ke ƙasa kuma za mu dawo gare ku cikin awanni 24.'}
            </p>
            
            {submitted && (
              <div style={successStyles}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '20px' }} />
                <div>
                  <strong>{language === 'en' ? 'Message Sent!' : 'An Turo Sako!'}</strong>
                  <br />
                  <span style={{ fontSize: '13px' }}>
                    {language === 'en' 
                      ? 'Thank you for reaching out. We\'ll respond shortly.'
                      : 'Mungode da tuntuɓar mu. Za mu amsa nan ba da jimawa ba.'}
                  </span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={inputGroupStyles}>
                <label style={labelStyles}>
                  {language === 'en' ? 'Full Name' : 'Cikakken Suna'} *
                </label>
                <input
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
                  placeholder={language === 'en' ? 'Enter your full name' : 'Rubuta mana cikakken sunan ku'}
                  required
                />
              </div>
              
              <div style={inputGroupStyles}>
                <label style={labelStyles}>
                  {language === 'en' ? 'Email Address' : 'Adireshin Email'} *
                </label>
                <input
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
                  placeholder={language === 'en' ? 'Enter your email address' : 'Shigar da adireshin email ɗin ku'}
                  required
                />
              </div>
              
              <div style={inputGroupStyles}>
                <label style={labelStyles}>
                  {language === 'en' ? 'Message' : 'Sako'} *
                </label>
                <textarea
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
                    ? 'Tell us about your motorcycle needs or questions...' 
                    : 'Faɗa mana buƙatun ku game da babura ko tambayoyinku...'}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                style={buttonStyles}
                disabled={isLoading}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(255,215,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    {language === 'en' ? 'Sending...' : 'Ana turawa...'}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    {language === 'en' ? 'Send Message' : 'Tura Sako'}
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