import React from 'react';

const buttonStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#25D366',
  color: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  zIndex: 100,
  border: 'none',
  fontSize: '30px'
};

function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/2347015102718?text=Hello! I have a question about the motorcycles.', '_blank');
  };

  return (
    <button 
      style={buttonStyles}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      }}
    >
      💬
    </button>
  );
}

export default WhatsAppButton;