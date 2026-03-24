import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faMinus, 
  faPlus,
  faPalette,
  faNairaSign,
  faMotorcycle,
  faCheckCircle,
  faShare,
  faHeart,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Motorcycle placeholder image (working URL)
const MOTORCYCLE_PLACEHOLDER = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop';

const formatNaira = (price) => {
  if (!price && price !== 0) return '₦0';
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
  backgroundColor: 'rgba(0,0,0,0.85)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
  animation: 'fadeIn 0.3s ease'
};

const modalContentStyles = {
  backgroundColor: 'white',
  borderRadius: '32px',
  maxWidth: '1100px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
  border: '1px solid rgba(255,215,0,0.2)'
};

const headerStyles = {
  padding: '24px 28px',
  borderBottom: '2px solid rgba(255,215,0,0.2)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #F9FAFB 0%, #ffffff 100%)',
  borderRadius: '32px 32px 0 0',
  position: 'sticky',
  top: 0,
  zIndex: 10
};

const titleStyles = {
  fontSize: '26px',
  fontWeight: 'bold',
  margin: 0,
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const closeButtonStyles = {
  background: 'rgba(0,0,0,0.05)',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#6B7280',
  padding: '10px',
  transition: 'all 0.3s ease',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const bodyStyles = {
  padding: '28px'
};

const twoColumnStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '40px'
};

const imageSectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const mainImageStyles = {
  width: '100%',
  height: '350px',
  objectFit: 'cover',
  borderRadius: '24px',
  backgroundColor: '#F3F4F6',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease'
};

const colorButtonsStyles = {
  display: 'flex',
  gap: '14px',
  marginTop: '12px',
  flexWrap: 'wrap',
  alignItems: 'center'
};

const colorButtonStyles = (color, isSelected) => ({
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  backgroundColor: color.code,
  border: isSelected ? '3px solid #FFD700' : '2px solid #E5E7EB',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: isSelected ? '0 0 0 2px white, 0 0 0 4px #FFD700' : '0 2px 4px rgba(0,0,0,0.1)'
});

const descriptionStyles = {
  color: '#4B5563',
  lineHeight: '1.8',
  marginBottom: '28px',
  fontSize: '15px'
};

const priceStyles = {
  fontSize: '36px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '24px'
};

const quantitySectionStyles = {
  marginBottom: '28px',
  backgroundColor: '#F9FAFB',
  padding: '20px',
  borderRadius: '20px'
};

const quantityControlsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginTop: '12px'
};

const quantityButtonStyles = {
  width: '44px',
  height: '44px',
  borderRadius: '40px',
  border: '1px solid #E5E7EB',
  backgroundColor: 'white',
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontWeight: 'bold',
  color: '#1F2937'
};

const quantityDisplayStyles = {
  fontSize: '22px',
  fontWeight: 'bold',
  minWidth: '60px',
  textAlign: 'center',
  color: '#0B3B2F'
};

const inquireButtonStyles = {
  width: '100%',
  padding: '16px',
  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '40px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '28px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px'
};

const totalPriceStyles = {
  marginTop: '24px',
  padding: '20px',
  background: 'linear-gradient(135deg, #FEF9E6 0%, #FFF5E0 100%)',
  borderRadius: '20px',
  border: '1px solid rgba(255,215,0,0.3)'
};

const infoRowStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: '1px solid #E5E7EB'
};

const badgeStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 12px',
  backgroundColor: '#FEF9E6',
  borderRadius: '40px',
  fontSize: '12px',
  color: '#FFD700'
};

const actionButtonsStyles = {
  display: 'flex',
  gap: '12px',
  marginTop: '20px'
};

const secondaryButtonStyles = {
  flex: 1,
  padding: '12px',
  backgroundColor: 'white',
  border: '2px solid #E5E7EB',
  borderRadius: '40px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  color: '#4B5563'
};

const mobileStyles = `
  @media (max-width: 768px) {
    .modal-two-column {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
    .modal-header {
      padding: 18px 20px !important;
    }
    .modal-title {
      font-size: 20px !important;
    }
    .modal-body {
      padding: 20px !important;
    }
    .modal-main-image {
      height: 250px !important;
    }
    .modal-price {
      font-size: 28px !important;
    }
    .modal-total-price {
      font-size: 24px !important;
    }
    .modal-inquire-btn {
      padding: 14px !important;
      font-size: 15px !important;
    }
    .modal-quantity-btn {
      width: 40px !important;
      height: 40px !important;
      font-size: 18px !important;
    }
    .modal-color-btn {
      width: 44px !important;
      height: 44px !important;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function VehicleModal({ vehicle, isOpen, onClose, language }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (vehicle?.colors && vehicle.colors.length > 0) {
      setSelectedColor(vehicle.colors[0]);
      setQuantity(1);
    }
  }, [vehicle]);

  if (!isOpen || !vehicle) return null;

  const description = language === 'en' 
    ? (vehicle.description_en || vehicle.description || '') 
    : (vehicle.description_ha || vehicle.description || '');
    
  const colorText = language === 'en' ? 'Available Colors' : 'Launuka Masu Samuwa';
  const selectedColorText = language === 'en' ? 'Selected Color' : 'Launin Da Ka Zaɓa';
  const availableText = language === 'en' ? 'available' : 'akwai';
  const quantityText = language === 'en' ? 'Quantity' : 'Adadi';
  const totalText = language === 'en' ? 'Total Price' : 'Jimlar Kuɗi';
  const inquireText = language === 'en' ? 'Inquire via WhatsApp' : 'Tambaya ta WhatsApp';
  const specificationsText = language === 'en' ? 'Specifications' : 'Bayani';

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    const maxQuantity = selectedColor?.quantity || 1;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleWhatsAppInquiry = () => {
    const phoneNumber = '2347015102718';
    const imageUrl = vehicle.main_image_url || selectedColor?.images?.[0] || '';
    const message = encodeURIComponent(
      `🛵 *MOTORCYCLE INQUIRY* 🛵\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `📸 *Image:* ${imageUrl || 'No image available'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `🏍️ *Model:* ${vehicle.name}\n` +
      `🏷️ *Brand:* ${vehicle.brand}\n` +
      `🎨 *Color:* ${selectedColor?.name || 'N/A'}\n` +
      `🔢 *Quantity:* ${quantity}\n` +
      `💰 *Unit Price:* ${formatNaira(vehicle.price)}\n` +
      `💵 *Total:* ${formatNaira(vehicle.price * quantity)}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *Description:*\n${description?.substring(0, 200)}${description?.length > 200 ? '...' : ''}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏰ *Inquiry Time:* ${new Date().toLocaleString()}\n\n` +
      `Please respond with availability. 🙏`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle.name,
        text: `Check out this ${vehicle.brand} ${vehicle.name} at ${formatNaira(vehicle.price)}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const currentImage = selectedColor?.images?.[0] || vehicle.main_image_url || MOTORCYCLE_PLACEHOLDER;

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={modalOverlayStyles} onClick={onClose}>
        <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={headerStyles}>
            <h2 className="modal-title" style={titleStyles}>
              <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
              {vehicle.name}
            </h2>
            <button 
              style={closeButtonStyles} 
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#FEE2E2';
                e.target.style.color = '#DC2626';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0,0,0,0.05)';
                e.target.style.color = '#6B7280';
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
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
                    e.target.src = MOTORCYCLE_PLACEHOLDER;
                  }}
                />
                {vehicle.colors && vehicle.colors.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <FontAwesomeIcon icon={faPalette} style={{ color: '#FFD700' }} />
                      <span style={{ fontWeight: 'bold', color: '#1F2937' }}>{colorText}:</span>
                    </div>
                    <div style={colorButtonsStyles}>
                      {vehicle.colors.map((color, idx) => (
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
                        >
                          <span style={{ position: 'absolute', opacity: 0 }}>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column - Details */}
              <div>
                {/* Stock Badge */}
                <div style={{ marginBottom: '20px' }}>
                  <span style={badgeStyles}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {vehicle.available !== false ? 'In Stock' : 'Limited Stock'}
                  </span>
                </div>

                <p style={descriptionStyles}>{description}</p>
                
                {/* Specifications */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '12px', color: '#1F2937' }}>
                    <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700', marginRight: '8px' }} />
                    {specificationsText}
                  </h4>
                  <div style={infoRowStyles}>
                    <span style={{ color: '#6B7280' }}>Brand</span>
                    <span style={{ fontWeight: '500' }}>{vehicle.brand}</span>
                  </div>
                  {selectedColor && (
                    <>
                      <div style={infoRowStyles}>
                        <span style={{ color: '#6B7280' }}>Color</span>
                        <span style={{ fontWeight: '500' }}>{selectedColor.name}</span>
                      </div>
                      <div style={infoRowStyles}>
                        <span style={{ color: '#6B7280' }}>Availability</span>
                        <span style={{ fontWeight: '500', color: selectedColor.quantity > 0 ? '#065F46' : '#DC2626' }}>
                          {selectedColor.quantity} {availableText}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <p className="modal-price" style={priceStyles}>
                  <FontAwesomeIcon icon={faNairaSign} style={{ marginRight: '4px' }} />
                  {formatNaira(vehicle.price)} <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#6B7280' }}>each</span>
                </p>
                
                <div style={quantitySectionStyles}>
                  <p style={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '12px' }}>
                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#FFD700', marginRight: '8px' }} />
                    {quantityText}
                  </p>
                  <div style={quantityControlsStyles}>
                    <button 
                      className="modal-quantity-btn"
                      style={quantityButtonStyles}
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span style={quantityDisplayStyles}>{quantity}</span>
                    <button 
                      className="modal-quantity-btn"
                      style={quantityButtonStyles}
                      onClick={() => handleQuantityChange(1)}
                      disabled={selectedColor ? quantity >= (selectedColor.quantity || 1) : false}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                <div style={totalPriceStyles}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>{totalText}:</p>
                  <p className="modal-total-price" style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>
                    {formatNaira(vehicle.price * quantity)}
                  </p>
                </div>

                <div style={actionButtonsStyles}>
                  <button 
                    style={secondaryButtonStyles}
                    onClick={handleShare}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#FFD700';
                      e.target.style.color = '#FFD700';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                      e.target.style.color = '#4B5563';
                    }}
                  >
                    <FontAwesomeIcon icon={faShare} />
                    Share
                  </button>
                  <button 
                    style={secondaryButtonStyles}
                    onClick={() => setIsLiked(!isLiked)}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#FFD700';
                      e.target.style.color = '#FFD700';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                      e.target.style.color = '#4B5563';
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} style={{ color: isLiked ? '#DC2626' : 'inherit' }} />
                    {isLiked ? 'Liked' : 'Save'}
                  </button>
                </div>

                <button 
                  className="modal-inquire-btn"
                  style={inquireButtonStyles}
                  onClick={handleWhatsAppInquiry}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(37,211,102,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(37,211,102,0.3)';
                  }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '20px' }} />
                  {inquireText}
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