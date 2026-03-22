import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faPalette, 
  faBoxes, 
  faNairaSign,
  faSignOutAlt,
  faCopy,
  faSpinner,
  faExclamationTriangle,
  faChartLine,
  faUsers,
  faShoppingCart,
  faCrown
} from '@fortawesome/free-solid-svg-icons';
import AdminLogin from '../components/Admin/AdminLogin';
import AddVehicleForm from '../components/Admin/AddVehicleForm';
import VehicleManagement from '../components/Admin/VehicleManagement';
import { loadMotorcycles, addMotorcycle, deleteMotorcycle } from '../utils/storage';

// Styles
const containerStyles = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 24px'
};

const headerStyles = {
  marginBottom: '40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #F9FAFB 100%)',
  padding: '20px 28px',
  borderRadius: '24px',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)'
};

const titleStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  margin: 0
};

const logoutButtonStyles = {
  backgroundColor: '#FEF2F2',
  color: '#DC2626',
  padding: '10px 24px',
  border: '1px solid #FECACA',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

// Stats card styles
const statsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  marginBottom: '40px'
};

const statCardStyles = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '24px',
  textAlign: 'center',
  boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(255,215,0,0.2)',
  position: 'relative',
  overflow: 'hidden'
};

const statIconStyles = {
  width: '50px',
  height: '50px',
  backgroundColor: '#FEF9E6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  fontSize: '24px',
  color: '#FFD700'
};

const statNumberStyles = {
  fontSize: '36px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '8px'
};

const statLabelStyles = {
  fontSize: '14px',
  color: '#6B7280',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const shareCardStyles = {
  backgroundColor: 'white',
  padding: '28px',
  borderRadius: '24px',
  textAlign: 'center',
  marginBottom: '40px',
  border: '1px solid rgba(255,215,0,0.2)',
  background: 'linear-gradient(135deg, #FEF9E6 0%, #ffffff 100%)'
};

const copyButtonStyles = {
  marginTop: '16px',
  padding: '12px 28px',
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  border: 'none',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px'
};

const loadingStyles = {
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: 'white',
  borderRadius: '24px',
  marginBottom: '30px'
};

const errorStyles = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#FEF2F2',
  borderRadius: '20px',
  color: '#DC2626',
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '15px',
  border: '1px solid #FECACA'
};

const retryButtonStyles = {
  padding: '8px 20px',
  backgroundColor: '#DC2626',
  color: 'white',
  border: 'none',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease'
};

// Mobile responsive styles
const mobileStyles = `
  @media (max-width: 768px) {
    .admin-header {
      flex-direction: column !important;
      text-align: center !important;
      padding: 16px !important;
    }
    .admin-title {
      font-size: 22px !important;
    }
    .stats-grid {
      gap: 16px !important;
    }
    .stat-card {
      padding: 16px !important;
    }
    .stat-number {
      font-size: 28px !important;
    }
    .stat-icon {
      width: 40px !important;
      height: 40px !important;
      font-size: 20px !important;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
`;

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalMotorcycles: 0,
    totalColors: 0,
    totalStock: 0,
    totalValue: 0
  });

  useEffect(() => {
    if (isLoggedIn) {
      loadMotorcycleData();
    }
  }, [isLoggedIn]);

  const loadMotorcycleData = async () => {
    try {
      setLoading(true);
      setError(null);
      const allMotorcycles = await loadMotorcycles();
      const motorcycleArray = Array.isArray(allMotorcycles) ? allMotorcycles : [];
      setMotorcycles(motorcycleArray);
      calculateStats(motorcycleArray);
      return motorcycleArray;
    } catch (err) {
      console.error('Error loading motorcycles:', err);
      setError(err.message || 'Failed to load motorcycles');
      setMotorcycles([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (motorcycleArray) => {
    try {
      const bikes = Array.isArray(motorcycleArray) ? motorcycleArray : [];
      
      const totalColors = bikes.reduce((sum, bike) => {
        if (bike && bike.colors && Array.isArray(bike.colors)) {
          return sum + bike.colors.length;
        }
        return sum;
      }, 0);
      
      const totalStock = bikes.reduce((sum, bike) => {
        if (bike && bike.colors && Array.isArray(bike.colors)) {
          const bikeStock = bike.colors.reduce((colorSum, color) => {
            return colorSum + (color?.quantity || 0);
          }, 0);
          return sum + bikeStock;
        }
        return sum;
      }, 0);
      
      const totalValue = bikes.reduce((sum, bike) => {
        if (bike && bike.price && bike.colors && Array.isArray(bike.colors)) {
          const totalQuantity = bike.colors.reduce((q, c) => q + (c?.quantity || 0), 0);
          return sum + (bike.price * totalQuantity);
        }
        return sum;
      }, 0);
      
      setStats({
        totalMotorcycles: bikes.length,
        totalColors: totalColors,
        totalStock: totalStock,
        totalValue: totalValue
      });
    } catch (err) {
      console.error('Error calculating stats:', err);
      setStats({
        totalMotorcycles: 0,
        totalColors: 0,
        totalStock: 0,
        totalValue: 0
      });
    }
  };

  const handleAddMotorcycle = async (newMotorcycle, mainImage, colorImages) => {
    try {
      setLoading(true);
      setError(null);
      await addMotorcycle(newMotorcycle, mainImage, colorImages);
      await loadMotorcycleData();
      alert('✅ Motorcycle added successfully!');
    } catch (err) {
      console.error('Error adding motorcycle:', err);
      setError(err.message || 'Failed to add motorcycle');
      alert('❌ Error adding motorcycle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMotorcycle = async (id, motorcycle) => {
    if (window.confirm('Are you sure you want to delete this motorcycle? This action cannot be undone.')) {
      try {
        setLoading(true);
        setError(null);
        await deleteMotorcycle(id, motorcycle);
        await loadMotorcycleData();
        alert('🗑️ Motorcycle deleted successfully!');
      } catch (err) {
        console.error('Error deleting motorcycle:', err);
        setError(err.message || 'Failed to delete motorcycle');
        alert('❌ Error deleting motorcycle. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCopyLink = () => {
    const link = window.location.origin;
    navigator.clipboard.writeText(link);
    alert('📋 Catalog link copied! Share with customers.');
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statItems = [
    { icon: faMotorcycle, label: 'Total Motorcycles', value: stats.totalMotorcycles, color: '#FFD700' },
    { icon: faPalette, label: 'Color Options', value: stats.totalColors, color: '#FFA500' },
    { icon: faBoxes, label: 'Total Units', value: stats.totalStock, color: '#065F46' },
    { icon: faNairaSign, label: 'Inventory Value', value: formatNaira(stats.totalValue), color: '#FFD700' }
  ];

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={containerStyles}>
        {/* Header */}
        <div className="admin-header" style={headerStyles}>
          <h1 className="admin-title" style={titleStyles}>
            <FontAwesomeIcon icon={faCrown} style={{ color: '#FFD700' }} />
            Admin Dashboard
          </h1>
          <button 
            style={logoutButtonStyles}
            onClick={() => setIsLoggedIn(false)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FEE2E2';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FEF2F2';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>
        
        {/* Error Display */}
        {error && (
          <div style={errorStyles}>
            <span>
              <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '8px' }} />
              {error}
            </span>
            <button 
              onClick={() => {
                setError(null);
                loadMotorcycleData();
              }}
              style={retryButtonStyles}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
            >
              <FontAwesomeIcon icon={faSpinner} style={{ marginRight: '6px' }} />
              Retry
            </button>
          </div>
        )}
        
        {/* Stats Section */}
        <div className="stats-grid" style={statsGridStyles}>
          {statItems.map((item, index) => (
            <div 
              key={index}
              className="stat-card" 
              style={statCardStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -2px rgba(0,0,0,0.05)';
              }}
            >
              <div className="stat-icon" style={statIconStyles}>
                <FontAwesomeIcon icon={item.icon} style={{ color: item.color }} />
              </div>
              <div className="stat-number" style={statNumberStyles}>{item.value}</div>
              <div style={statLabelStyles}>{item.label}</div>
            </div>
          ))}
        </div>
        
        {/* Share Link Card */}
        <div style={shareCardStyles}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>
            <FontAwesomeIcon icon={faCopy} style={{ color: '#FFD700' }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px', color: '#1F2937' }}>
            Share Your Catalog
          </div>
          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>
            Share this link with customers to view your motorcycle catalog
          </div>
          <button 
            onClick={handleCopyLink}
            style={copyButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 20px rgba(255,215,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FontAwesomeIcon icon={faCopy} />
            Copy Catalog Link
          </button>
        </div>
        
        {/* Loading Indicator */}
        {loading && (
          <div style={loadingStyles}>
            <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '32px', color: '#FFD700', marginBottom: '16px' }} />
            <div style={{ color: '#065F46', fontWeight: '500' }}>Processing...</div>
          </div>
        )}
        
        {/* Add Vehicle Form */}
        <AddVehicleForm onAdd={handleAddMotorcycle} />
        
        {/* Vehicle Management Table */}
        <VehicleManagement 
          vehicles={motorcycles} 
          onDelete={handleDeleteMotorcycle}
        />
      </div>
    </>
  );
}

export default AdminPage;