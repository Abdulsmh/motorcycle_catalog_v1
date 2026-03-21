import React from 'react';
import VehicleCard from './VehicleCard';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '28px',
  padding: '20px 0'
};

const emptyStyles = {
  textAlign: 'center',
  padding: '80px 20px',
  backgroundColor: 'white',
  borderRadius: '16px',
  marginTop: '40px'
};

function VehicleGrid({ vehicles, onVehicleClick, language }) {
  // Safety check
  if (!vehicles || vehicles.length === 0) {
    return (
      <div style={emptyStyles}>
        <h3 style={{ color: '#6B7280', marginBottom: '10px' }}>
          {language === 'en' ? 'No motorcycles available' : 'Babu babura masu samuwa'}
        </h3>
        <p style={{ color: '#9CA3AF' }}>
          {language === 'en' ? 'Check back later for new arrivals!' : 'Duba baya daga baya don sababbin masu zuwa!'}
        </p>
      </div>
    );
  }

  return (
    <div style={gridStyles}>
      {vehicles.map((vehicle) => (
        <VehicleCard 
          key={vehicle.id} 
          vehicle={vehicle} 
          onClick={onVehicleClick}
          language={language}
        />
      ))}
    </div>
  );
}

export default VehicleGrid;