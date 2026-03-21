import React from 'react';

const containerStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const titleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333'
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  overflowX: 'auto',
  display: 'block'
};

const thStyles = {
  textAlign: 'left',
  padding: '12px',
  backgroundColor: '#f5f5f5',
  borderBottom: '2px solid #ddd'
};

const tdStyles = {
  padding: '12px',
  borderBottom: '1px solid #eee'
};

const deleteButtonStyles = {
  backgroundColor: '#d93025',
  color: 'white',
  padding: '5px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const statusStyles = (available) => ({
  display: 'inline-block',
  padding: '3px 8px',
  borderRadius: '3px',
  fontSize: '12px',
  backgroundColor: available ? '#e6f4ea' : '#fce8e6',
  color: available ? '#1e7e34' : '#d93025'
});

const thumbnailStyles = {
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  borderRadius: '5px'
};

function VehicleManagement({ vehicles, onDelete }) {
  return (
    <div style={containerStyles}>
      <h3 style={titleStyles}>Manage Motorcycles ({vehicles.length})</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Image</th>
              <th style={thStyles}>Name</th>
              <th style={thStyles}>Brand</th>
              <th style={thStyles}>Price</th>
              <th style={thStyles}>Colors</th>
              <th style={thStyles}>Status</th>
              <th style={thStyles}>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td style={tdStyles}>
                  <img 
                    src={vehicle.mainImage || 'https://via.placeholder.com/50x50?text=No+Image'} 
                    alt={vehicle.name}
                    style={thumbnailStyles}
                  />
                </td>
                <td style={tdStyles}>{vehicle.name}</td>
                <td style={tdStyles}>{vehicle.brand}</td>
                <td style={tdStyles}>₦{vehicle.price.toLocaleString()}</td>
                <td style={tdStyles}>{vehicle.colors.length}</td>
                <td style={tdStyles}>
                  <span style={statusStyles(vehicle.available)}>
                    {vehicle.available ? 'Available' : 'Sold Out'}
                  </span>
                </td>
                <td style={tdStyles}>
                  <button 
                    style={deleteButtonStyles}
                    onClick={() => onDelete(vehicle.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleManagement;