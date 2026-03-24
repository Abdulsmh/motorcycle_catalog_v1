import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faTag, 
  faNairaSign, 
  faPalette,
  faTrash,
  faEye,
  faCheckCircle,
  faTimesCircle,
  faImage,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

// Motorcycle placeholder image (working URL)
const MOTORCYCLE_PLACEHOLDER = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop';

const containerStyles = {
  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
  padding: '24px',
  borderRadius: '24px',
  boxShadow: '0 20px 35px -10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)',
  border: '1px solid rgba(255,215,0,0.2)',
  position: 'relative',
  overflow: 'hidden'
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  flexWrap: 'wrap',
  gap: '15px'
};

const titleStyles = {
  fontSize: '22px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const statsBadgeStyles = {
  backgroundColor: 'rgba(255,215,0,0.15)',
  padding: '6px 14px',
  borderRadius: '40px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#FFD700',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const searchStyles = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

const searchInputStyles = {
  padding: '8px 16px',
  border: '2px solid #E5E7EB',
  borderRadius: '40px',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s ease',
  width: '200px'
};

const tableWrapperStyles = {
  overflowX: 'auto',
  borderRadius: '16px',
  border: '1px solid #E5E7EB',
  backgroundColor: 'white'
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '800px'
};

const thStyles = {
  textAlign: 'left',
  padding: '16px',
  backgroundColor: '#F9FAFB',
  borderBottom: '2px solid #E5E7EB',
  fontWeight: '600',
  color: '#1F2937',
  fontSize: '14px'
};

const tdStyles = {
  padding: '16px',
  borderBottom: '1px solid #F3F4F6',
  verticalAlign: 'middle',
  fontSize: '14px',
  color: '#374151'
};

const deleteButtonStyles = {
  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 2px 4px rgba(220,38,38,0.2)'
};

const viewButtonStyles = {
  background: 'rgba(255,215,0,0.1)',
  color: '#FFD700',
  padding: '8px 16px',
  border: '1px solid rgba(255,215,0,0.3)',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginRight: '8px'
};

const statusStyles = (available) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '5px 12px',
  borderRadius: '40px',
  fontSize: '12px',
  fontWeight: '600',
  backgroundColor: available ? '#D1FAE5' : '#FEE2E2',
  color: available ? '#065F46' : '#DC2626'
});

const thumbnailStyles = {
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '2px solid #FFD700'
};

const emptyStateStyles = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#6B7280'
};

const actionCellStyles = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center'
};

const colorChipStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#F3F4F6',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '12px'
};

function VehicleManagement({ vehicles, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const formatNaira = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id, vehicle) => {
    setShowDeleteConfirm(id);
    setTimeout(() => {
      if (window.confirm(`Are you sure you want to delete "${vehicle.name}"? This action cannot be undone.`)) {
        onDelete(id, vehicle);
      }
      setShowDeleteConfirm(null);
    }, 100);
  };

  const handleViewDetails = (vehicle) => {
    alert(`🏍️ ${vehicle.name}\n\nBrand: ${vehicle.brand}\nPrice: ${formatNaira(vehicle.price)}\nColors: ${vehicle.colors?.length || 0} options\nStatus: ${vehicle.available ? 'Available' : 'Sold Out'}`);
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={titleStyles}>
          <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
          Inventory Management
          <div style={statsBadgeStyles}>
            <FontAwesomeIcon icon={faTag} />
            {filteredVehicles.length} / {vehicles.length} Motorcycles
          </div>
        </div>
        
        <div style={searchStyles}>
          <FontAwesomeIcon icon={faSearch} style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyles}
            onFocus={(e) => e.target.style.borderColor = '#FFD700'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />
        </div>
      </div>
      
      <div style={tableWrapperStyles}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>
                <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px', color: '#FFD700' }} />
                Image
              </th>
              <th style={thStyles}>
                <FontAwesomeIcon icon={faMotorcycle} style={{ marginRight: '8px', color: '#FFD700' }} />
                Name
              </th>
              <th style={thStyles}>Brand</th>
              <th style={thStyles}>
                <FontAwesomeIcon icon={faNairaSign} style={{ marginRight: '8px', color: '#FFD700' }} />
                Price
              </th>
              <th style={thStyles}>
                <FontAwesomeIcon icon={faPalette} style={{ marginRight: '8px', color: '#FFD700' }} />
                Colors
              </th>
              <th style={thStyles}>Status</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} style={{ transition: 'all 0.3s ease' }}>
                  <td style={tdStyles}>
                    <img 
                      src={vehicle.main_image_url || vehicle.mainImage || MOTORCYCLE_PLACEHOLDER} 
                      alt={vehicle.name}
                      style={thumbnailStyles}
                      onError={(e) => {
                        e.target.src = MOTORCYCLE_PLACEHOLDER;
                      }}
                    />
                  </td>
                  <td style={{ ...tdStyles, fontWeight: '600' }}>{vehicle.name}</td>
                  <td style={tdStyles}>
                    <span style={colorChipStyles}>
                      <FontAwesomeIcon icon={faTag} style={{ fontSize: '10px' }} />
                      {vehicle.brand}
                    </span>
                  </td>
                  <td style={{ ...tdStyles, fontWeight: '600', color: '#065F46' }}>
                    {formatNaira(vehicle.price)}
                  </td>
                  <td style={tdStyles}>
                    <span style={colorChipStyles}>
                      <FontAwesomeIcon icon={faPalette} style={{ fontSize: '10px' }} />
                      {vehicle.colors?.length || 0} Colors
                    </span>
                  </td>
                  <td style={tdStyles}>
                    <span style={statusStyles(vehicle.available)}>
                      <FontAwesomeIcon icon={vehicle.available ? faCheckCircle : faTimesCircle} style={{ fontSize: '10px' }} />
                      {vehicle.available ? 'Available' : 'Sold Out'}
                    </span>
                  </td>
                  <td style={tdStyles}>
                    <div style={actionCellStyles}>
                      <button 
                        style={viewButtonStyles}
                        onClick={() => handleViewDetails(vehicle)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(255,215,0,0.2)';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'rgba(255,215,0,0.1)';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                        View
                      </button>
                      <button 
                        style={deleteButtonStyles}
                        onClick={() => handleDeleteClick(vehicle.id, vehicle)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(220,38,38,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 4px rgba(220,38,38,0.2)';
                        }}
                        disabled={showDeleteConfirm === vehicle.id}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        {showDeleteConfirm === vehicle.id ? 'Confirming...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={emptyStateStyles}>
                  <FontAwesomeIcon icon={faMotorcycle} style={{ fontSize: '48px', color: '#D1D5DB', marginBottom: '16px' }} />
                  <p style={{ marginBottom: '8px' }}>No motorcycles found</p>
                  <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {searchTerm ? 'Try a different search term' : 'Add your first motorcycle using the form above'}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleManagement;