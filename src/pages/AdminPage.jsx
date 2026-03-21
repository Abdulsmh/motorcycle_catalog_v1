import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/Admin/AdminLogin';
import AddVehicleForm from '../components/Admin/AddVehicleForm';
import VehicleManagement from '../components/Admin/VehicleManagement';
import { loadMotorcycles, addMotorcycle, deleteMotorcycle } from '../utils/storage';

// Styles
const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const headerStyles = {
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '15px'
};

const titleStyles = {
  fontSize: '28px',
  color: '#1F2937',
  marginBottom: '0'
};

const logoutButtonStyles = {
  backgroundColor: '#6B7280',
  color: 'white',
  padding: '10px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease'
};

// Stats card styles
const statsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '30px'
};

const statCardStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '16px',
  textAlign: 'center',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

const statNumberStyles = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#065F46',
  marginBottom: '8px'
};

const statLabelStyles = {
  fontSize: '14px',
  color: '#6B7280',
  fontWeight: '500'
};

const copyButtonStyles = {
  marginTop: '12px',
  padding: '6px 12px',
  backgroundColor: '#065F46',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '500',
  transition: 'all 0.2s ease'
};

const loadingStyles = {
  textAlign: 'center',
  padding: '60px 20px',
  fontSize: '16px',
  color: '#065F46'
};

const errorStyles = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#FEF2F2',
  borderRadius: '12px',
  color: '#DC2626',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px'
};

const retryButtonStyles = {
  padding: '8px 16px',
  backgroundColor: '#DC2626',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
};

// Mobile responsive styles
const mobileStyles = `
  @media (max-width: 768px) {
    .admin-header {
      flex-direction: column !important;
      text-align: center !important;
    }
    .admin-title {
      font-size: 24px !important;
    }
    .stats-grid {
      gap: 12px !important;
    }
    .stat-card {
      padding: 16px !important;
    }
    .stat-number {
      font-size: 28px !important;
    }
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
      const totalColors = motorcycleArray.reduce((sum, bike) => {
        if (bike && bike.colors && Array.isArray(bike.colors)) {
          return sum + bike.colors.length;
        }
        return sum;
      }, 0);
      
      const totalStock = motorcycleArray.reduce((sum, bike) => {
        if (bike && bike.colors && Array.isArray(bike.colors)) {
          const bikeStock = bike.colors.reduce((colorSum, color) => {
            return colorSum + (color.quantity || 0);
          }, 0);
          return sum + bikeStock;
        }
        return sum;
      }, 0);
      
      const totalValue = motorcycleArray.reduce((sum, bike) => {
        if (bike && bike.price) {
          return sum + (bike.price * (bike.colors?.reduce((q, c) => q + (c.quantity || 0), 0) || 0));
        }
        return sum;
      }, 0);
      
      setStats({
        totalMotorcycles: motorcycleArray.length,
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
      alert('Motorcycle added successfully!');
    } catch (err) {
      console.error('Error adding motorcycle:', err);
      setError(err.message || 'Failed to add motorcycle');
      alert('Error adding motorcycle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMotorcycle = async (id, motorcycle) => {
  if (window.confirm('Are you sure you want to delete this motorcycle?')) {
    try {
      setLoading(true);
      setError(null);
      await deleteMotorcycle(id, motorcycle); // Pass motorcycle data
      await loadMotorcycleData();
      await calculateStats();
      alert('Motorcycle deleted successfully!');
    } catch (err) {
      console.error('Error deleting motorcycle:', err);
      setError(err.message || 'Failed to delete motorcycle');
      alert('Error deleting motorcycle. Please try again.');
    } finally {
      setLoading(false);
    }
  }
};
  const handleCopyLink = () => {
    const link = window.location.origin;
    navigator.clipboard.writeText(link);
    alert('Catalog link copied! Share with customers.');
  };

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
            🏍️ Admin Dashboard
          </h1>
          <button 
            style={logoutButtonStyles}
            onClick={() => setIsLoggedIn(false)}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4B5563'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6B7280'}
          >
            🔓 Logout
          </button>
        </div>
        
        {/* Error Display */}
        {error && (
          <div style={errorStyles}>
            <span>⚠️ {error}</span>
            <button 
              onClick={() => {
                setError(null);
                loadMotorcycleData();
              }}
              style={retryButtonStyles}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
            >
              Retry
            </button>
          </div>
        )}
        
        {/* Stats Section */}
        <div className="stats-grid" style={statsGridStyles}>
          <div 
            className="stat-card" 
            style={statCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            <div className="stat-number" style={statNumberStyles}>{stats.totalMotorcycles}</div>
            <div style={statLabelStyles}>Total Motorcycles</div>
          </div>
          
          <div 
            className="stat-card" 
            style={statCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            <div className="stat-number" style={statNumberStyles}>{stats.totalColors}</div>
            <div style={statLabelStyles}>Color Options</div>
          </div>
          
          <div 
            className="stat-card" 
            style={statCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            <div className="stat-number" style={statNumberStyles}>{stats.totalStock}</div>
            <div style={statLabelStyles}>Total Units</div>
          </div>
          
          <div 
            className="stat-card" 
            style={statCardStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
          >
            <div className="stat-number" style={statNumberStyles}>{formatNaira(stats.totalValue)}</div>
            <div style={statLabelStyles}>Inventory Value</div>
          </div>
        </div>
        
        {/* Share Link Card */}
        <div style={{ ...statCardStyles, marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📤</div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Share Your Catalog</div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
            Share this link with customers to view your motorcycles
          </div>
          <button 
            onClick={handleCopyLink}
            style={copyButtonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#065F46'}
          >
            📋 Copy Catalog Link
          </button>
        </div>
        
        {/* Loading Indicator */}
        {loading && (
          <div style={loadingStyles}>
            <div>⏳ Processing...</div>
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