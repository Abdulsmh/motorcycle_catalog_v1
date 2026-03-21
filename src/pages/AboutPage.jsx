import React from 'react';

const containerStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px 20px'
};

const titleStyles = {
  fontSize: '32px',
  color: '#333',
  marginBottom: '20px',
  textAlign: 'center'
};

const contentStyles = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  lineHeight: '1.6'
};

function AboutPage() {
  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>About FaggeMotorCycleHub</h1>
      <div style={contentStyles}>
        <p>Welcome to FaggeMotorCycleHub - your trusted marketplace for quality motorcycles in Nigeria.</p>
        
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Our Mission</h3>
        <p>To connect motorcycle sellers with buyers through a simple, transparent, and efficient digital catalog system.</p>
        
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>For Sellers</h3>
        <p>Create your digital catalog, showcase your motorcycles with multiple colors and images,
             and share a single link with customers instead of sending individual photos.</p>
        
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>For Buyers</h3>
        <p>Browse available motorcycles, compare colors, check prices, and inquire about your preferred options -
             all in one place.</p>
        
        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Contact Us</h3>
        <p>Email: support@faggemotorcyclehub.com<br />
        Phone: +234 81-1111-3205<br />
        Location: Kano, Nigeria</p>
      </div>
    </div>
  );
}

export default AboutPage;