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
  padding: '20px',
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
  padding: '24px',
  borderBottom: '1px solid #E5E7EB',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#F9FAFB',
  borderRadius: '24px 24px 0 0'
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

const imageSectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const mainImageStyles = {
  width: '100%',
  height: '320px',
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
  backgroundColor: '#065F46',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '24px',
  transition: 'all 0.3s',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
  const inquireText = language === 'en' ? 'Inquire About This Motorcycle' : 'Tambaya Game da Wannan Babur';

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (selectedColor?.quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleInquire = () => {
    const message = language === 'en' 
      ? `Inquiry sent!\n\nMotorcycle: ${vehicle.name}\nColor: ${selectedColor?.name}\nQuantity: ${quantity}\nTotal: ${formatNaira(vehicle.price * quantity)}\n\nThe seller will contact you soon.`
      : `An aika tambaya!\n\nBabur: ${vehicle.name}\nLauni: ${selectedColor?.name}\nAdadi: ${quantity}\nJimla: ${formatNaira(vehicle.price * quantity)}\n\nMai sayarwa zai tuntube ku nan ba da jimawa ba.`;
    alert(message);
    onClose();
  };

  const currentImage = selectedColor?.images[0] || vehicle.mainImage || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400';

  return (
    <div style={modalOverlayStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>{vehicle.name}</h2>
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
        
        <div style={bodyStyles}>
          <div style={twoColumnStyles}>
            <div style={imageSectionStyles}>
              <img 
                src={currentImage} 
                alt={vehicle.name}
                style={mainImageStyles}
              />
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>{colorText}:</p>
                <div style={colorButtonsStyles}>
                  {vehicle.colors.map(color => (
                    <button
                      key={color.name}
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

            <div>
              <p style={descriptionStyles}>{description}</p>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', color: '#1F2937' }}>{selectedColorText}:</p>
                <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '5px' }}>{selectedColor?.name}</p>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  {availableText}: {selectedColor?.quantity} {language === 'en' ? 'units' : 'raka\'a'}
                </p>
              </div>

              <p style={priceStyles}>{formatNaira(vehicle.price)} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{language === 'en' ? 'each' : 'kowanne'}</span></p>
              
              <div style={quantitySectionStyles}>
                <p style={{ fontWeight: 'bold', color: '#1F2937' }}>{quantityText}:</p>
                <div style={quantityControlsStyles}>
                  <button 
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

              <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '16px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>{totalText}:</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#065F46' }}>
                  {formatNaira(vehicle.price * quantity)}
                </p>
              </div>

              <button 
                style={inquireButtonStyles}
                onClick={handleInquire}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#047857';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#065F46';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                {inquireText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleModal;