import React from 'react';

const formatNaira = (price) => {
  // Handle undefined or null price
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
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative'
};

const imageStyles = {
  width: '100%',
  height: '220px',
  objectFit: 'cover',
  backgroundColor: '#F3F4F6',
  transition: 'transform 0.5s ease'
};

const contentStyles = {
  padding: '20px'
};

const nameStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '6px',
  color: '#1F2937'
};

const brandStyles = {
  color: '#6B7280',
  marginBottom: '10px',
  fontSize: '14px'
};

const priceStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#065F46',
  marginBottom: '12px'
};

const availabilityStyles = (available) => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 'bold',
  backgroundColor: available ? '#D1FAE5' : '#FEE2E2',
  color: available ? '#065F46' : '#DC2626'
});

const colorInfoStyles = {
  marginTop: '12px',
  fontSize: '12px',
  color: '#6B7280',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap'
};

const colorDotsStyles = {
  display: 'flex',
  gap: '6px'
};

const colorDotStyles = (colorCode) => ({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: colorCode,
  border: '1px solid #E5E7EB'
});

function VehicleCard({ vehicle, onClick, language }) {
  // Safety check - if vehicle is undefined or null, don't render
  if (!vehicle) {
    return null;
  }

  // Get description safely
  const getDescription = () => {
    if (language === 'en') {
      return vehicle.description_en || vehicle.description || '';
    }
    return vehicle.description_ha || vehicle.description || '';
  };

  const description = getDescription();
  const shortDesc = description.length > 80 ? description.substring(0, 80) + '...' : description;

  // Safe color handling
  const colors = vehicle.colors || [];
  const colorCount = colors.length;
  const firstThreeColors = colors.slice(0, 3);
  const hasMoreColors = colors.length > 3;

  // Safe price handling
  const price = vehicle.price || 0;

  // Safe image handling
  const imageUrl = vehicle.mainImage || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400';

  return (
    <div 
      style={cardStyles}
      onClick={() => onClick && onClick(vehicle)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -12px rgba(0,0,0,0.2)';
        const img = e.currentTarget.querySelector('.vehicle-image');
        if (img) img.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        const img = e.currentTarget.querySelector('.vehicle-image');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <img 
          className="vehicle-image"
          src={imageUrl} 
          alt={vehicle.name || 'Motorcycle'}
          style={imageStyles}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400';
          }}
        />
      </div>
      <div style={contentStyles}>
        <h3 style={nameStyles}>{vehicle.name || 'Unknown Model'}</h3>
        <p style={brandStyles}>{vehicle.brand || 'Unknown Brand'}</p>
        <p style={priceStyles}>{formatNaira(price)}</p>
        {shortDesc && (
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
            {shortDesc}
          </p>
        )}
        <div style={colorInfoStyles}>
          <span>🎨 {colorCount} {language === 'en' ? 'colors' : 'launuka'}</span>
          {colorCount > 0 && (
            <div style={colorDotsStyles}>
              {firstThreeColors.map((color, idx) => (
                <div 
                  key={idx} 
                  style={colorDotStyles(color.code || '#CCCCCC')} 
                  title={color.name || 'Color'} 
                />
              ))}
              {hasMoreColors && <span>+{colorCount - 3}</span>}
            </div>
          )}
        </div>
        <span style={availabilityStyles(vehicle.available !== false)}>
          {vehicle.available !== false 
            ? (language === 'en' ? '✓ Available' : '✓ Akwai') 
            : (language === 'en' ? '✗ Sold Out' : '✗ An sayar')}
        </span>
      </div>
    </div>
  );
}

export default VehicleCard;