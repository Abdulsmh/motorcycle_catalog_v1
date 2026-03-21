import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/Admin/AdminLogin';
import AddVehicleForm from '../components/Admin/AddVehicleForm';
import VehicleManagement from '../components/Admin/VehicleManagement';
import { loadMotorcycles, addMotorcycle, deleteMotorcycle } from '../utils/storage';

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const headerStyles = {
  marginBottom: '30px'
};

const titleStyles = {
  fontSize: '28px',
  color: '#333',
  marginBottom: '10px'
};

const logoutButtonStyles = {
  backgroundColor: '#666',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '20px'
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
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const statNumberStyles = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#1a73e8',
  marginBottom: '10px'
};

const copyButtonStyles = {
  marginTop: '10px',
  padding: '5px 10px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const loadingStyles = {
  textAlign: 'center',
  padding: '40px',
  fontSize: '18px',
  color: '#065F46'
};

const errorStyles = {
  textAlign: 'center',
  padding: '40px',
  backgroundColor: '#FEF2F2',
  borderRadius: '10px',
  color: '#DC2626',
  marginBottom: '20px'
};

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalMotorcycles: 0,
    totalColors: 0,
    totalStock: 0,
    recentAdditions: []
  });

  useEffect(() => {
    if (isLoggedIn) {
      loadMotorcycleData();
      calculateStats();
    }
  }, [isLoggedIn]);

  const loadMotorcycleData = async () => {
    try {
      setLoading(true);
      setError(null);
      const allMotorcycles = await loadMotorcycles();
      // Ensure we're working with an array
      const motorcycleArray = Array.isArray(allMotorcycles) ? allMotorcycles : [];
      setMotorcycles(motorcycleArray);
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

  const calculateStats = async () => {
    try {
      const allMotorcycles = await loadMotorcycles();
      const motorcycleArray = Array.isArray(allMotorcycles) ? allMotorcycles : [];
      
      // Calculate total colors
      const totalColors = motorcycleArray.reduce((sum, bike) => {
        if (bike && bike.colors && Array.isArray(bike.colors)) {
          return sum + bike.colors.length;
        }
        return sum;
      }, 0);
      
      // Calculate total stock (sum of quantities across all colors)
      const totalStock = motorcycleArray.reduce((sum, bike) => {
        if (bike && bike.colors && Array.isArray(bike.colors)) {
          const bikeStock = bike.colors.reduce((colorSum, color) => {
            return colorSum + (color.quantity || 0);
          }, 0);
          return sum + bikeStock;
        }
        return sum;
      }, 0);
      
      // Get recent additions (last 5)
      const sortedByDate = [...motorcycleArray].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
      
      setStats({
        totalMotorcycles: motorcycleArray.length,
        totalColors: totalColors,
        totalStock: totalStock,
        recentAdditions: sortedByDate.slice(0, 5)
      });
    } catch (err) {
      console.error('Error calculating stats:', err);
      setStats({
        totalMotorcycles: 0,
        totalColors: 0,
        totalStock: 0,
        recentAdditions: []
      });
    }
  };

  const handleAddMotorcycle = async (newMotorcycle, mainImage, colorImages) => {
    try {
      setLoading(true);
      setError(null);
      await addMotorcycle(newMotorcycle, mainImage, colorImages);
      await loadMotorcycleData();
      await calculateStats();
      alert('Motorcycle added successfully!');
    } catch (err) {
      console.error('Error adding motorcycle:', err);
      setError(err.message || 'Failed to add motorcycle');
      alert('Error adding motorcycle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMotorcycle = async (id) => {
    if (window.confirm('Are you sure you want to delete this motorcycle?')) {
      try {
        setLoading(true);
        setError(null);
        await deleteMotorcycle(id);
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

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Admin Dashboard - Motorcycle Catalog</h1>
        <button 
          style={logoutButtonStyles}
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>
      </div>
      
      {error && (
        <div style={errorStyles}>
          <strong>Error:</strong> {error}
          <button 
            onClick={() => {
              setError(null);
              loadMotorcycleData();
              calculateStats();
            }}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#065F46',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Stats Section */}
      <div style={statsGridStyles}>
        <div style={statCardStyles}>
          <div style={statNumberStyles}>{stats.totalMotorcycles}</div>
          <p>Total Motorcycles</p>
        </div>
        <div style={statCardStyles}>
          <div style={statNumberStyles}>{stats.totalColors}</div>
          <p>Color Options</p>
        </div>
        <div style={statCardStyles}>
          <div style={statNumberStyles}>{stats.totalStock}</div>
          <p>Total Units in Stock</p>
        </div>
        <div style={statCardStyles}>
          <div style={statNumberStyles}>📤</div>
          <p>Share Catalog Link</p>
          <button 
            onClick={handleCopyLink}
            style={copyButtonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1557b0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1a73e8'}
          >
            Copy Link
          </button>
        </div>
      </div>
      
      {loading && (
        <div style={loadingStyles}>
          <div>Processing...</div>
        </div>
      )}
      
      <AddVehicleForm onAdd={handleAddMotorcycle} />
      <VehicleManagement 
        vehicles={motorcycles} 
        onDelete={handleDeleteMotorcycle}
      />
    </div>
  );
}

export default AdminPage;