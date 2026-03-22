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
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 20px'
};

const heroStyles = {
  textAlign: 'center',
  marginBottom: '60px',
  position: 'relative'
};

const titleStyles = {
  fontSize: '48px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '16px'
};

const subtitleStyles = {
  fontSize: '18px',
  color: '#6B7280',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
};

const statsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '30px',
  marginBottom: '60px'
};

const statCardStyles = {
  textAlign: 'center',
  padding: '30px 20px',
  backgroundColor: 'white',
  borderRadius: '24px',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)',
  transition: 'all 0.3s ease'
};

const statNumberStyles = {
  fontSize: '36px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '8px'
};

const statLabelStyles = {
  fontSize: '14px',
  color: '#6B7280'
};

const missionSectionStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '40px',
  marginBottom: '60px',
  alignItems: 'center'
};

const missionContentStyles = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '24px',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)'
};

const sectionTitleStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const missionImageStyles = {
  width: '100%',
  borderRadius: '24px',
  boxShadow: '0 20px 35px -10px rgba(0,0,0,0.1)'
};

const featuresGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '30px',
  marginBottom: '60px'
};

const featureCardStyles = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '24px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255,215,0,0.2)'
};

const featureIconStyles = {
  width: '70px',
  height: '70px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  color: '#FFD700',
  fontSize: '30px'
};

const featureTitleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '12px',
  color: '#1F2937'
};

const featureTextStyles = {
  fontSize: '14px',
  color: '#6B7280',
  lineHeight: '1.6'
};

const contactSectionStyles = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '24px',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)',
  textAlign: 'center'
};

const contactGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '30px',
  marginTop: '30px'
};

const contactItemStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '15px',
  backgroundColor: '#F9FAFB',
  borderRadius: '16px',
  transition: 'all 0.3s ease'
};

const contactIconStyles = {
  width: '45px',
  height: '45px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#FFD700',
  fontSize: '20px'
};

const ctaButtonStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  padding: '14px 32px',
  borderRadius: '40px',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  marginTop: '30px',
  transition: 'all 0.3s ease',
  border: 'none',
  cursor: 'pointer'
};

function AboutPage({ language = 'en' }) {
  const stats = [
    { number: '500+', label: language === 'en' ? 'Motorcycles Sold' : 'Baburan da aka Sayar' },
    { number: '50+', label: language === 'en' ? 'Happy Sellers' : 'Masu Siyarwa' },
    { number: '1000+', label: language === 'en' ? 'Satisfied Customers' : 'Abokan Cinikayya' },
    { number: '4.9', label: language === 'en' ? 'Customer Rating' : 'Ƙarramawar Abokan Cinikayya' }
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
      title: language === 'en' ? 'Digital Catalog' : 'Wajen Siyar na Zamani',
      description: language === 'en'
        ? 'Share your catalog with a single link. No more sending individual photos.'
        : 'Raba hotunan kayanku ba tare da tura hoto guda 1 a lokaci guda ba.'
    },
    {
      icon: faShieldAlt,
      title: language === 'en' ? 'Trusted Platform' : 'Amintaccenr Dandali',
      description: language === 'en'
        ? 'Secure and transparent transactions between buyers and sellers.'
        : 'Amintacciyar Mu\amala tsakanin masu cinikayya'
    },
    {
      icon: faRocket,
      title: language === 'en' ? 'Fast & Easy' : 'Sauri da Sauƙi',
      description: language === 'en'
        ? 'Simple interface for both sellers and buyers. Get started in minutes.'
        : 'Sauƙin amfani ga masu siye da masu siyarwa. zaku iya farawa cikin mintuna.'
    }
  ];

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/2347015102718?text=Hello! I have a question about FaggeMotorCycleHub.', '_blank');
  };

  return (
    <div style={containerStyles}>
      {/* Hero Section */}
      <div style={heroStyles}>
        <h1 style={titleStyles}>
          <FontAwesomeIcon icon={faMotorcycle} style={{ marginRight: '12px' }} />
          FaggeMotorCycleHub
        </h1>
        <p style={subtitleStyles}>
          {language === 'en' 
            ? 'Your trusted marketplace for quality motorcycles in Nigeria. Connecting buyers and sellers through innovative digital catalog solutions.'
            : 'kasuwancinku cikin aminci domin saida nagartattun babura. Haɗa masu siye da masu siyarwa ta hanyar sabbin hanyoyin zamani.'}
        </p>
      </div>

      {/* Stats Section */}
      <div style={statsGridStyles}>
        {stats.map((stat, index) => (
          <div key={index} style={statCardStyles}>
            <div style={statNumberStyles}>{stat.number}</div>
            <div style={statLabelStyles}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div style={missionSectionStyles}>
        <div style={missionContentStyles}>
          <h2 style={sectionTitleStyles}>
            <FontAwesomeIcon icon={faBullhorn} />
            {language === 'en' ? 'Our Mission' : 'Manufar Mu'}
          </h2>
          <p style={{ color: '#4B5563', lineHeight: '1.8', marginBottom: '20px' }}>
            {language === 'en'
              ? 'To revolutionize the motorcycle trading experience in Nigeria by providing a simple, transparent, and efficient digital catalog system that connects sellers with buyers seamlessly.'
              : 'Don kawo sauyi ga cinikin babura a Najeriya ta hanyar samar da tsarin zamani mai sauƙi, gaskiya, da inganci wanda ke haɗa masu siyarwa da masu siye cikin sauƙi.'}
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#FFD700' }} />
              <span style={{ fontSize: '14px' }}>{language === 'en' ? 'Trusted by 50+ sellers' : 'Amincewa da masu siyarwa 50+'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFD700' }} />
              <span style={{ fontSize: '14px' }}>{language === 'en' ? '4.9/5 Customer Rating' : '4.9/5 Ƙarramawar abokan cinikayyarmu'}</span>
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
      <h2 style={{ ...sectionTitleStyles, textAlign: 'center', justifyContent: 'center', marginBottom: '40px' }}>
        <FontAwesomeIcon icon={faStar} />
        {language === 'en' ? 'Why Choose Us?' : 'Me Ya Sa Za Ku Zaɓe Mu?'}
      </h2>
      <div style={featuresGridStyles}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            style={featureCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
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
        <p style={{ color: '#6B7280', marginBottom: '30px' }}>
          {language === 'en'
            ? 'Have questions? We\'re here to help you with anything you need.'
            : 'Kuna da tambayoyi? Muna nan don taimaka muku da duk abin da kuke buƙata.'}
        </p>
        
        <div style={contactGridStyles}>
          <div style={contactItemStyles}>
            <div style={contactIconStyles}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{language === 'en' ? 'Location' : 'Wuri'}</div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>Kano, Nigeria</div>
            </div>
          </div>
          
          <div style={contactItemStyles}>
            <div style={contactIconStyles}>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Phone</div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>+234 81-1111-3205</div>
            </div>
          </div>
          
          <div style={contactItemStyles}>
            <div style={contactIconStyles}>
              <FontAwesomeIcon icon={faWhatsapp} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>WhatsApp</div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>+234 701 510 2718</div>
            </div>
          </div>
          
          <div style={contactItemStyles}>
            <div style={contactIconStyles}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Email</div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>support@faggemotorcyclehub.com</div>
            </div>
          </div>
        </div>
        
        <button 
          style={ctaButtonStyles}
          onClick={handleWhatsAppContact}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 8px 20px rgba(255,215,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <FontAwesomeIcon icon={faWhatsapp} />
          {language === 'en' ? 'Chat with Us on WhatsApp' : 'Yi Magana da Mu a WhatsApp'}
        </button>
      </div>
    </div>
  );
}

export default AboutPage;