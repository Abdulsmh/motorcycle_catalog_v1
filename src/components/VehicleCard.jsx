import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faPalette, 
  faCheckCircle, 
  faTimesCircle,
  faStar,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const formatNaira = (price) => {
  if (!price && price !== 0) return '₦0';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const cardStyles = {
  backgroundColor: 'white',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.02)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  border: '1px solid rgba(255,215,0,0.2)'
};

const badgeStyles = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  backgroundColor: 'rgba(255,215,0,0.95)',
  color: '#0B3B2F',
  padding: '4px 12px',
  borderRadius: '40px',
  fontSize: '11px',
  fontWeight: 'bold',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(4px)'
};

const imageWrapperStyles = {
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#F3F4F6'
};

const imageStyles = {
  width: '100%',
  height: '220px',
  objectFit: 'cover',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  filter: 'brightness(0.95)',
  '&:hover': {
    filter: 'brightness(1)'
  }
};

const overlayStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  padding: '20px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  justifyContent: 'center'
};

const viewDetailsStyles = {
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  padding: '6px 16px',
  borderRadius: '40px',
  fontSize: '12px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transform: 'translateY(10px)',
  transition: 'all 0.3s ease'
};

const contentStyles = {
  padding: '20px'
};

const nameStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '6px',
  color: '#1F2937',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '8px'
};

const brandStyles = {
  color: '#6B7280',
  marginBottom: '10px',
  fontSize: '13px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const priceStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '12px'
};

const descriptionStyles = {
  color: '#6B7280',
  fontSize: '13px',
  marginBottom: '16px',
  lineHeight: '1.6',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
};

const availabilityStyles = (available) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '5px 14px',
  borderRadius: '40px',
  fontSize: '12px',
  fontWeight: 'bold',
  backgroundColor: available ? '#D1FAE5' : '#FEE2E2',
  color: available ? '#065F46' : '#DC2626'
});

const colorInfoStyles = {
  marginTop: '12px',
  marginBottom: '16px',
  fontSize: '12px',
  color: '#6B7280',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
  padding: '8px 0',
  borderTop: '1px solid #F3F4F6',
  borderBottom: '1px solid #F3F4F6'
};

const colorDotsStyles = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center'
};

const colorDotStyles = (colorCode) => ({
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  backgroundColor: colorCode,
  border: '2px solid white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  cursor: 'pointer'
});

const footerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px'
};

const ratingStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#FFD700',
  fontSize: '12px'
};

function VehicleCard({ vehicle, onClick, language }) {
  if (!vehicle) return null;

  const getDescription = () => {
    if (language === 'en') {
      return vehicle.description_en || vehicle.description || '';
    }
    return vehicle.description_ha || vehicle.description || '';
  };

  const description = getDescription();
  const colors = vehicle.colors || [];
  const colorCount = colors.length;
  const firstThreeColors = colors.slice(0, 3);
  const hasMoreColors = colors.length > 3;
  const price = vehicle.price || 0;
  const imageUrl = vehicle.main_image_url || 'https://picsum.photos/id/100/400/300';

  return (
    <div 
      style={cardStyles}
      onClick={() => onClick && onClick(vehicle)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px)';
        e.currentTarget.style.boxShadow = '0 25px 35px -12px rgba(0,0,0,0.25)';
        const img = e.currentTarget.querySelector('.vehicle-card-image');
        if (img) img.style.transform = 'scale(1.08)';
        const overlay = e.currentTarget.querySelector('.card-overlay');
        if (overlay) overlay.style.opacity = '1';
        const viewBtn = e.currentTarget.querySelector('.view-details-btn');
        if (viewBtn) viewBtn.style.transform = 'translateY(0)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)';
        const img = e.currentTarget.querySelector('.vehicle-card-image');
        if (img) img.style.transform = 'scale(1)';
        const overlay = e.currentTarget.querySelector('.card-overlay');
        if (overlay) overlay.style.opacity = '0';
        const viewBtn = e.currentTarget.querySelector('.view-details-btn');
        if (viewBtn) viewBtn.style.transform = 'translateY(10px)';
      }}
    >
      {/* Premium Badge */}
      <div style={badgeStyles}>
        <FontAwesomeIcon icon={faStar} style={{ fontSize: '10px' }} />
        Featured
      </div>

      {/* Image Section */}
      <div style={imageWrapperStyles}>
        <img 
          className="vehicle-card-image"
          src={imageUrl} 
          alt={vehicle.name || 'Motorcycle'}
          style={imageStyles}
          onError={(e) => {
            e.target.src = 'https://picsum.photos/id/100/400/300';
          }}
        />
        <div className="card-overlay" style={overlayStyles}>
          <div className="view-details-btn" style={viewDetailsStyles}>
            <FontAwesomeIcon icon={faArrowRight} />
            Quick View
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={contentStyles}>
        <div style={nameStyles}>
          <span>{vehicle.name || 'Unknown Model'}</span>
          <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700', fontSize: '14px' }} />
        </div>
        
        <div style={brandStyles}>
          <span style={{ backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '12px' }}>
            {vehicle.brand || 'Unknown Brand'}
          </span>
        </div>
        
        <p style={priceStyles}>{formatNaira(price)}</p>
        
        {description && (
          <p style={descriptionStyles}>{description}</p>
        )}
        
        <div style={colorInfoStyles}>
          <div style={colorDotsStyles}>
            <FontAwesomeIcon icon={faPalette} style={{ color: '#FFD700' }} />
            <span>{colorCount} {language === 'en' ? 'colors' : 'launuka'}</span>
          </div>
          {colorCount > 0 && (
            <div style={colorDotsStyles}>
              {firstThreeColors.map((color, idx) => (
                <div 
                  key={idx} 
                  style={colorDotStyles(color.code || '#CCCCCC')} 
                  title={color.name || 'Color'}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
              {hasMoreColors && <span style={{ fontSize: '11px', color: '#9CA3AF' }}>+{colorCount - 3}</span>}
            </div>
          )}
        </div>
        
        <div style={footerStyles}>
          <span style={availabilityStyles(vehicle.available !== false)}>
            <FontAwesomeIcon icon={vehicle.available !== false ? faCheckCircle : faTimesCircle} style={{ fontSize: '11px' }} />
            {vehicle.available !== false 
              ? (language === 'en' ? 'Available' : 'Akwai') 
              : (language === 'en' ? 'Sold Out' : 'An sayar')}
          </span>
          
          <div style={ratingStyles}>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} style={{ opacity: 0.5 }} />
            <span style={{ color: '#9CA3AF', fontSize: '11px' }}>(24)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;