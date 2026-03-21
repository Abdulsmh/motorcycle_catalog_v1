import React from 'react';
import VehicleCard from './VehicleCard';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
  padding: '20px 0'
};

// Add responsive styles via CSS
const responsiveStyles = `
  @media (max-width: 640px) {
    .vehicle-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
  }
`;

function VehicleGrid({ vehicles, onVehicleClick, language }) {
  if (!vehicles || vehicles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏍️</div>
        <h3 style={{ color: '#6B7280' }}>
          {language === 'en' ? 'No motorcycles available' : 'Babu babura masu samuwa'}
        </h3>
      </div>
    );
  }

  return (
    <>
      <style>{responsiveStyles}</style>
      <div className="vehicle-grid" style={gridStyles}>
        {vehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onClick={onVehicleClick}
            language={language}
          />
        ))}
      </div>
    </>
  );
}

export default VehicleGrid;