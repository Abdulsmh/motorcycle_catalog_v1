import React, { useState, useEffect } from 'react';
import VehicleGrid from '../components/VehicleGrid';
import VehicleModal from '../components/VehicleModal';
import { loadMotorcycles } from '../utils/storage';
import WhatsAppButton from '../components/WhatsAppButton';

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '48px'
};

const titleStyles = {
  fontSize: '42px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '16px'
};

const subtitleStyles = {
  fontSize: '18px',
  color: '#6B7280'
};

const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  textAlign: 'center'
};

const loadingSpinnerStyles = {
  width: '60px',
  height: '60px',
  border: '4px solid #E5E7EB',
  borderTop: '4px solid #065F46',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '20px'
};

const errorStyles = {
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: '#FEF2F2',
  borderRadius: '16px',
  color: '#DC2626',
  maxWidth: '500px',
  margin: '0 auto'
};

const retryButtonStyles = {
  marginTop: '20px',
  padding: '10px 24px',
  backgroundColor: '#065F46',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

const emptyStyles = {
  textAlign: 'center',
  padding: '80px 20px',
  backgroundColor: 'white',
  borderRadius: '16px',
  marginTop: '40px'
};

const emptyTitleStyles = {
  fontSize: '24px',
  color: '#1F2937',
  marginBottom: '12px'
};

const emptyTextStyles = {
  fontSize: '16px',
  color: '#6B7280',
  marginBottom: '20px'
};

function CatalogPage({ language }) {
  const [motorcycles, setMotorcycles] = useState([]);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMotorcycleData();
  }, []);

  const loadMotorcycleData = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedMotorcycles = await loadMotorcycles();
      
      // Ensure we're working with an array
      const motorcycleArray = Array.isArray(loadedMotorcycles) ? loadedMotorcycles : [];
      
      // Filter only available motorcycles
      const availableMotorcycles = motorcycleArray.filter(m => m && m.available !== false);
      
      setMotorcycles(availableMotorcycles);
    } catch (err) {
      console.error('Error loading motorcycles:', err);
      setError(err.message || 'Failed to load motorcycles. Please check your connection.');
      setMotorcycles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMotorcycleClick = (motorcycle) => {
    setSelectedMotorcycle(motorcycle);
    setIsModalOpen(true);
  };

  const handleRetry = () => {
    setRefreshing(true);
    loadMotorcycleData();
  };

  // Add CSS animation for spinner
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (loading) {
    return (
      <div style={loadingStyles}>
        <div style={loadingSpinnerStyles} />
        <div style={{ fontSize: '18px', color: '#065F46' }}>
          {language === 'en' ? 'Loading motorcycles...' : 'Ana loda babura...'}
        </div>
        <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
          {language === 'en' ? 'Please wait' : 'Da fatan a jira'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyles}>
        <div style={errorStyles}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h3 style={{ marginBottom: '8px' }}>
            {language === 'en' ? 'Something went wrong' : 'Wani abu ya faru'}
          </h3>
          <p style={{ marginBottom: '16px', fontSize: '14px' }}>{error}</p>
          <button 
            onClick={handleRetry}
            style={retryButtonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#065F46'}
            disabled={refreshing}
          >
            {refreshing 
              ? (language === 'en' ? 'Retrying...' : 'Ana sake gwadawa...')
              : (language === 'en' ? 'Try Again' : 'Sake gwadawa')
            }
          </button>
        </div>
      </div>
    );
  }

  if (motorcycles.length === 0) {
    return (
      <div style={containerStyles}>
        <div style={headerStyles}>
          <h1 style={titleStyles}>
            {language === 'en' ? 'Premium Motorcycles' : 'Manyan Babura'}
          </h1>
          <p style={subtitleStyles}>
            {language === 'en' 
              ? 'Discover our collection of quality motorcycles for Nigerian roads' 
              : 'Bincika tarin manyan baburan mu don hanyoyin Najeriya'}
          </p>
        </div>
        <div style={emptyStyles}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏍️</div>
          <h3 style={emptyTitleStyles}>
            {language === 'en' ? 'No motorcycles available' : 'Babu babura masu samuwa'}
          </h3>
          <p style={emptyTextStyles}>
            {language === 'en' 
              ? 'Check back later for new arrivals!' 
              : 'Duba baya daga baya don sababbin masu zuwa!'}
          </p>
          <button 
            onClick={handleRetry}
            style={retryButtonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#065F46'}
          >
            {language === 'en' ? 'Refresh' : 'Sabunta'}
          </button>
        </div>
      </div>
    );
  }

  const title = language === 'en' ? 'Premium Motorcycles' : 'Manyan Babura';
  const subtitle = language === 'en' 
    ? 'Discover our collection of quality motorcycles for Nigerian roads' 
    : 'Bincika tarin manyan baburan mu don hanyoyin Najeriya';

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>{title}</h1>
        <p style={subtitleStyles}>{subtitle}</p>
      </div>
      
      <VehicleGrid 
        vehicles={motorcycles} 
        onVehicleClick={handleMotorcycleClick}
        language={language}
      />
      
      <VehicleModal 
        vehicle={selectedMotorcycle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
      <WhatsAppButton />
    </div>
  );
}

export default CatalogPage;