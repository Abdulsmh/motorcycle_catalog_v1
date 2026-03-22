import React, { useState } from 'react';

const formatNaira = (price) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '16px',
  animation: 'fadeIn 0.3s ease'
};

const modalContentStyles = {
  backgroundColor: 'white',
  borderRadius: '24px',
  maxWidth: '1000px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  animation: 'slideUp 0.3s ease'
};

const headerStyles = {
  padding: '20px 24px',
  borderBottom: '1px solid #E5E7EB',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#F9FAFB',
  borderRadius: '24px 24px 0 0',
  position: 'sticky',
  top: 0,
  zIndex: 10
};

const titleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: 0,
  color: '#1F2937'
};

const closeButtonStyles = {
  background: 'none',
  border: 'none',
  fontSize: '28px',
  cursor: 'pointer',
  color: '#6B7280',
  padding: '5px',
  transition: 'all 0.2s',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const bodyStyles = {
  padding: '24px'
};

const twoColumnStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px'
};

// Mobile responsive styles
const mobileStyles = `
  @media (max-width: 768px) {
    .modal-two-column {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
    .modal-header {
      padding: 16px !important;
    }
    .modal-title {
      font-size: 20px !important;
    }
    .modal-body {
      padding: 16px !important;
    }
    .modal-main-image {
      height: 220px !important;
    }
    .modal-price {
      font-size: 24px !important;
    }
    .modal-total-price {
      font-size: 22px !important;
    }
    .modal-inquire-btn {
      padding: 14px !important;
      font-size: 16px !important;
    }
    .modal-quantity-btn {
      width: 36px !important;
      height: 36px !important;
      font-size: 18px !important;
    }
    .modal-color-btn {
      width: 40px !important;
      height: 40px !important;
    }
  }
`;

const imageSectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const mainImageStyles = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '16px',
  backgroundColor: '#F3F4F6'
};

const colorButtonsStyles = {
  display: 'flex',
  gap: '12px',
  marginTop: '12px',
  flexWrap: 'wrap'
};

const colorButtonStyles = (color, isSelected) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: color.code,
  border: isSelected ? '3px solid #065F46' : '2px solid #E5E7EB',
  cursor: 'pointer',
  transition: 'all 0.2s',
  boxShadow: isSelected ? '0 0 0 2px white, 0 0 0 4px #065F46' : 'none'
});

const descriptionStyles = {
  color: '#4B5563',
  lineHeight: '1.7',
  marginBottom: '24px'
};

const priceStyles = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#065F46',
  marginBottom: '20px'
};

const quantitySectionStyles = {
  marginBottom: '24px'
};

const quantityControlsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginTop: '12px'
};

const quantityButtonStyles = {
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  backgroundColor: '#F9FAFB',
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: 'bold'
};

const quantityDisplayStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  minWidth: '50px',
  textAlign: 'center'
};

const inquireButtonStyles = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#25D366',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '24px',
  transition: 'all 0.3s',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const totalPriceStyles = {
  marginTop: '24px',
  padding: '20px',
  backgroundColor: '#F9FAFB',
  borderRadius: '16px'
};

function VehicleModal({ vehicle, isOpen, onClose, language }) {
  const [selectedColor, setSelectedColor] = useState(vehicle?.colors[0] || null);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !vehicle) return null;

  const description = language === 'en' ? vehicle.description_en : vehicle.description_ha;
  const colorText = language === 'en' ? 'Available Colors' : 'Launuka Masu Samuwa';
  const selectedColorText = language === 'en' ? 'Selected Color' : 'Launin Da Ka Zaɓa';
  const availableText = language === 'en' ? 'available' : 'akwai';
  const quantityText = language === 'en' ? 'Quantity' : 'Adadi';
  const totalText = language === 'en' ? 'Total Price' : 'Jimlar Kuɗi';
  const inquireText = language === 'en' ? 'Inquire via WhatsApp' : 'Tambaya ta WhatsApp';

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (selectedColor?.quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = '2347015102718'; // WhatsApp number (without +)
    const message = encodeURIComponent(
      `Hello! I'm interested in:\n\n` +
      `🏍️ Motorcycle: ${vehicle.name}\n` +
      `🎨 Color: ${selectedColor?.name}\n` +
      `🔢 Quantity: ${quantity}\n` +
      `💰 Total: ${formatNaira(vehicle.price * quantity)}\n\n` +
      `Please provide more information. Thank you!`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const currentImage = selectedColor?.images?.[0] || vehicle.main_image_url || 'https://picsum.photos/id/100/400/300';

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={modalOverlayStyles} onClick={onClose}>
        <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={headerStyles}>
            <h2 className="modal-title" style={titleStyles}>{vehicle.name}</h2>
            <button 
              style={closeButtonStyles} 
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F3F4F6';
                e.target.style.color = '#1F2937';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6B7280';
              }}
            >
              ✕
            </button>
          </div>
          
          <div className="modal-body" style={bodyStyles}>
            <div className="modal-two-column" style={twoColumnStyles}>
              {/* Left column - Images */}
              <div style={imageSectionStyles}>
                <img 
                  className="modal-main-image"
                  src={currentImage} 
                  alt={vehicle.name}
                  style={mainImageStyles}
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/id/100/400/300';
                  }}
                />
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>{colorText}:</p>
                  <div style={colorButtonsStyles}>
                    {vehicle.colors?.map((color, idx) => (
                      <button
                        key={idx}
                        className="modal-color-btn"
                        style={colorButtonStyles(color, selectedColor?.name === color.name)}
                        onClick={() => {
                          setSelectedColor(color);
                          setQuantity(1);
                        }}
                        title={color.name}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Details */}
              <div>
                <p style={descriptionStyles}>{description}</p>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontWeight: 'bold', color: '#1F2937' }}>{selectedColorText}:</p>
                  <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '5px' }}>{selectedColor?.name}</p>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    {availableText}: {selectedColor?.quantity} {language === 'en' ? 'units' : 'raka'}
                  </p>
                </div>

                <p className="modal-price" style={priceStyles}>
                  {formatNaira(vehicle.price)} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{language === 'en' ? 'each' : 'kowanne'}</span>
                </p>
                
                <div style={quantitySectionStyles}>
                  <p style={{ fontWeight: 'bold', color: '#1F2937' }}>{quantityText}:</p>
                  <div style={quantityControlsStyles}>
                    <button 
                      className="modal-quantity-btn"
                      style={quantityButtonStyles}
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                    >
                      -
                    </button>
                    <span style={quantityDisplayStyles}>{quantity}</span>
                    <button 
                      className="modal-quantity-btn"
                      style={quantityButtonStyles}
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (selectedColor?.quantity || 1)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                    >
                      +
                    </button>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>
                      {selectedColor?.quantity} {language === 'en' ? 'available' : 'akwai'}
                    </span>
                  </div>
                </div>

                <div style={totalPriceStyles}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>{totalText}:</p>
                  <p className="modal-total-price" style={{ fontSize: '28px', fontWeight: 'bold', color: '#065F46' }}>
                    {formatNaira(vehicle.price * quantity)}
                  </p>
                </div>

                <button 
                  className="modal-inquire-btn"
                  style={inquireButtonStyles}
                  onClick={handleWhatsAppInquiry}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#128C7E';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#25D366';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  💬 {inquireText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleModal;