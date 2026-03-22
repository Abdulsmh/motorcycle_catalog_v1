import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faBullhorn, 
  faShoppingCart, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faCheckCircle,
  faStar,
  faUsers,
  faGlobe,
  faShieldAlt,
  faRocket,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '24px 16px'
};

// Hero Section - Mobile Optimized
const heroStyles = {
  textAlign: 'center',
  marginBottom: '40px',
  padding: '40px 20px',
  background: 'linear-gradient(135deg, #FEF9E6 0%, #ffffff 100%)',
  borderRadius: '24px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const titleStyles = {
  fontSize: '36px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  flexWrap: 'wrap'
};

const subtitleStyles = {
  fontSize: '15px',
  color: '#6B7280',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
};

// Stats Section - Mobile Responsive
const statsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  marginBottom: '40px'
};

const statCardStyles = {
  textAlign: 'center',
  padding: '20px 16px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)',
  transition: 'all 0.3s ease'
};

const statNumberStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '4px'
};

const statLabelStyles = {
  fontSize: '12px',
  color: '#6B7280'
};

// Mission Section - Mobile Responsive
const missionSectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginBottom: '40px'
};

const missionContentStyles = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '20px',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)'
};

const sectionTitleStyles = {
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '16px',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const missionImageStyles = {
  width: '100%',
  borderRadius: '20px',
  boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)',
  height: '200px',
  objectFit: 'cover'
};

const badgeContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '20px'
};

const badgeStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  backgroundColor: '#FEF9E6',
  borderRadius: '40px',
  fontSize: '12px'
};

// Features Section - Mobile Responsive
const featuresGridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  marginBottom: '40px'
};

const featureCardStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '20px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255,215,0,0.2)'
};

const featureIconStyles = {
  width: '55px',
  height: '55px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  color: '#FFD700',
  fontSize: '24px'
};

const featureTitleStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#1F2937'
};

const featureTextStyles = {
  fontSize: '13px',
  color: '#6B7280',
  lineHeight: '1.5'
};

// Contact Section - Mobile Responsive
const contactSectionStyles = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '20px',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)',
  textAlign: 'center'
};

const contactGridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '12px',
  marginTop: '24px'
};

const contactItemStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '12px',
  backgroundColor: '#F9FAFB',
  borderRadius: '16px',
  transition: 'all 0.3s ease'
};

const contactIconStyles = {
  width: '40px',
  height: '40px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFD700',
  fontSize: '18px'
};

const ctaButtonStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  padding: '12px 24px',
  borderRadius: '40px',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  marginTop: '24px',
  transition: 'all 0.3s ease',
  border: 'none',
  cursor: 'pointer'
};

// Section Header for Features
const sectionHeaderStyles = {
  textAlign: 'center',
  marginBottom: '24px'
};

const sectionTitleCenterStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  justifyContent: 'center'
};

const mobileStyles = `
  @media (min-width: 640px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 20px !important;
    }
    .mission-section {
      flex-direction: row !important;
    }
    .features-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 20px !important;
    }
    .contact-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .badge-container {
      flex-direction: row !important;
      justify-content: center !important;
    }
  }
  
  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 24px !important;
    }
    .contact-grid {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    .hero-title {
      font-size: 48px !important;
    }
    .stat-number {
      font-size: 36px !important;
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

function AboutPage({ language = 'en' }) {
  const stats = [
    { number: '500+', label: language === 'en' ? 'Motorcycles Sold' : 'Babura da aka Sayar' },
    { number: '50+', label: language === 'en' ? 'Happy Sellers' : 'Masu Siyarwa' },
    { number: '1000+', label: language === 'en' ? 'Customers' : 'Abokan Ciniki' },
    { number: '4.9', label: language === 'en' ? 'Rating' : 'Ƙima' }
  ];

  const features = [
    {
      icon: faMotorcycle,
      title: language === 'en' ? 'Premium Motorcycles' : 'Babura Masu Inganci',
      description: language === 'en' 
        ? 'Curated selection of the best motorcycles from top brands.'
        : 'Zaɓaɓɓun babura mafi kyau daga manyan kamfanoni.'
    },
    {
      icon: faGlobe,
      title: language === 'en' ? 'Digital Catalog' : 'Kataloji na Dijital',
      description: language === 'en'
        ? 'Share your catalog with a single link. No more sending individual photos.'
        : 'Raba kataloji ɗinku da mahada ɗaya. Ba sauran aika hotuna daban-daban.'
    },
    {
      icon: faShieldAlt,
      title: language === 'en' ? 'Trusted Platform' : 'Amintaccen Dandali',
      description: language === 'en'
        ? 'Secure and transparent transactions between buyers and sellers.'
        : 'Amintacciyar ma\'amala tsakanin masu siye da masu siyarwa.'
    },
    {
      icon: faRocket,
      title: language === 'en' ? 'Fast & Easy' : 'Sauri da Sauƙi',
      description: language === 'en'
        ? 'Simple interface for both sellers and buyers. Get started in minutes.'
        : 'Sauƙin amfani ga masu siye da masu siyarwa. Fara cikin mintuna.'
    }
  ];

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/2347015102718?text=Hello! I have a question about FaggeMotorCycleHub.', '_blank');
  };

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={containerStyles}>
        {/* Hero Section */}
        <div style={heroStyles}>
          <h1 className="hero-title" style={titleStyles}>
            <FontAwesomeIcon icon={faMotorcycle} />
            FaggeMotorCycleHub
          </h1>
          <p style={subtitleStyles}>
            {language === 'en' 
              ? 'Your trusted marketplace for quality motorcycles in Nigeria.'
              : 'Kasuwancinku cikin aminci domin saida nagartattun babura.'}
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-grid" style={statsGridStyles}>
          {stats.map((stat, index) => (
            <div key={index} style={statCardStyles}>
              <div className="stat-number" style={statNumberStyles}>{stat.number}</div>
              <div style={statLabelStyles}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mission-section" style={missionSectionStyles}>
          <div style={missionContentStyles}>
            <h2 style={sectionTitleStyles}>
              <FontAwesomeIcon icon={faBullhorn} />
              {language === 'en' ? 'Our Mission' : 'Manufar Mu'}
            </h2>
            <p style={{ color: '#4B5563', lineHeight: '1.7', fontSize: '14px' }}>
              {language === 'en'
                ? 'To revolutionize the motorcycle trading experience in Nigeria by providing a simple, transparent, and efficient digital catalog system.'
                : 'Don kawo sauyi ga cinikin babura a Najeriya ta hanyar samar da tsarin zamani mai sauƙi, gaskiya, da inganci.'}
            </p>
            <div className="badge-container" style={badgeContainerStyles}>
              <div style={badgeStyles}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#FFD700' }} />
                <span>{language === 'en' ? 'Trusted by 50+ sellers' : 'Amincewa da masu siyarwa 50+'}</span>
              </div>
              <div style={badgeStyles}>
                <FontAwesomeIcon icon={faStar} style={{ color: '#FFD700' }} />
                <span>{language === 'en' ? '4.9/5 Customer Rating' : '4.9/5 Ƙimar Abokan Ciniki'}</span>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600"
              alt="Motorcycle"
              style={missionImageStyles}
            />
          </div>
        </div>

        {/* Features Section */}
        <div style={sectionHeaderStyles}>
          <h2 style={sectionTitleCenterStyles}>
            <FontAwesomeIcon icon={faStar} />
            {language === 'en' ? 'Why Choose Us?' : 'Me Ya Sa Za Ku Zaɓe Mu?'}
          </h2>
        </div>
        <div className="features-grid" style={featuresGridStyles}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={featureCardStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 20px -10px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -2px rgba(0,0,0,0.05)';
              }}
            >
              <div style={featureIconStyles}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 style={featureTitleStyles}>{feature.title}</h3>
              <p style={featureTextStyles}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div style={contactSectionStyles}>
          <h2 style={{ ...sectionTitleStyles, justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faPhone} />
            {language === 'en' ? 'Get In Touch' : 'Tuntuɓe Mu'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            {language === 'en'
              ? 'Have questions? We\'re here to help.'
              : 'Kuna da tambayoyi? Muna nan don taimaka muku.'}
          </p>
          
          <div className="contact-grid" style={contactGridStyles}>
            <div style={contactItemStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{language === 'en' ? 'Location' : 'Wuri'}</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>Kano, Nigeria</div>
              </div>
            </div>
            
            <div style={contactItemStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Phone</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>+234 81-1111-3205</div>
              </div>
            </div>
            
            <div style={contactItemStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>WhatsApp</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>+234 701 510 2718</div>
              </div>
            </div>
            
            <div style={contactItemStyles}>
              <div style={contactIconStyles}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Email</div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>support@faggemotorcyclehub.com</div>
              </div>
            </div>
          </div>
          
          <button 
            style={ctaButtonStyles}
            onClick={handleWhatsAppContact}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 15px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            {language === 'en' ? 'Chat on WhatsApp' : 'Yi Magana a WhatsApp'}
            <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '12px' }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AboutPage;