import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, 
  faEdit, 
  faPalette, 
  faTrash,
  faEllipsisV,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const MOTORCYCLE_PLACEHOLDER = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop';

function VehicleManagementTable({ vehicles, onEditPrice, onManageColors, onDelete, onViewDetails }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const formatNaira = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Desktop Table View
  const DesktopTable = () => (
    <div className="table-wrapper">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Colors</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>
                <img 
                  src={vehicle.main_image_url || vehicle.mainImage || MOTORCYCLE_PLACEHOLDER} 
                  alt={vehicle.name}
                  className="thumbnail"
                  onError={(e) => { e.target.src = MOTORCYCLE_PLACEHOLDER; }}
                />
              </td>
              <td className="vehicle-name">{vehicle.name}</td>
              <td>{vehicle.brand}</td>
              <td className="vehicle-price">{formatNaira(vehicle.price)}</td>
              <td>
                <span className="color-chip">
                  {vehicle.colors?.length || 0} Colors
                </span>
              </td>
              <td>
                <span className={`status-badge ${vehicle.available ? 'available' : 'sold'}`}>
                  <FontAwesomeIcon icon={vehicle.available ? faCheckCircle : faTimesCircle} />
                  {vehicle.available ? 'Available' : 'Sold Out'}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => onViewDetails?.(vehicle)} className="action-btn view-btn" title="View Details">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button onClick={() => onEditPrice(vehicle.id, vehicle.price)} className="action-btn edit-btn" title="Edit Price">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => onManageColors(vehicle)} className="action-btn colors-btn" title="Manage Colors">
                    <FontAwesomeIcon icon={faPalette} />
                  </button>
                  <button onClick={() => onDelete(vehicle.id, vehicle)} className="action-btn delete-btn" title="Delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Mobile Card View with Dropdown Menu
  const MobileCards = () => (
    <div className="cards-container">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="vehicle-card">
          <img 
            src={vehicle.main_image_url || vehicle.mainImage || MOTORCYCLE_PLACEHOLDER} 
            alt={vehicle.name}
            className="card-image"
            onError={(e) => { e.target.src = MOTORCYCLE_PLACEHOLDER; }}
          />
          <div className="card-content">
            <div className="card-header">
              <h3>{vehicle.name}</h3>
              <div className="menu-wrapper">
                <button className="menu-trigger" onClick={() => toggleMenu(vehicle.id)}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                {openMenuId === vehicle.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => { onViewDetails?.(vehicle); setOpenMenuId(null); }}>
                      <FontAwesomeIcon icon={faEye} /> View Details
                    </button>
                    <button onClick={() => { onEditPrice(vehicle.id, vehicle.price); setOpenMenuId(null); }}>
                      <FontAwesomeIcon icon={faEdit} /> Edit Price
                    </button>
                    <button onClick={() => { onManageColors(vehicle); setOpenMenuId(null); }}>
                      <FontAwesomeIcon icon={faPalette} /> Manage Colors
                    </button>
                    <button onClick={() => { onDelete(vehicle.id, vehicle); setOpenMenuId(null); }} className="delete-option">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="card-brand">{vehicle.brand}</p>
            <p className="card-price">{formatNaira(vehicle.price)}</p>
            <div className="card-footer">
              <span className="color-chip">{vehicle.colors?.length || 0} Colors</span>
              <span className={`status-badge ${vehicle.available ? 'available' : 'sold'}`}>
                {vehicle.available ? 'Available' : 'Sold Out'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="desktop-view">
        <DesktopTable />
      </div>
      <div className="mobile-view">
        <MobileCards />
      </div>

      <style>{`
        .table-wrapper {
          overflow-x: auto;
          border-radius: 16px;
          border: 1px solid #E5E7EB;
          background: white;
        }
        .vehicle-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }
        .vehicle-table th {
          text-align: left;
          padding: 16px;
          background: #F9FAFB;
          border-bottom: 2px solid #E5E7EB;
          font-weight: 600;
          color: #1F2937;
        }
        .vehicle-table td {
          padding: 16px;
          border-bottom: 1px solid #F3F4F6;
          vertical-align: middle;
        }
        .thumbnail {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid #FFD700;
        }
        .vehicle-name {
          font-weight: 600;
        }
        .vehicle-price {
          font-weight: 600;
          color: #065F46;
        }
        .color-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F3F4F6;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 40px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-badge.available {
          background: #D1FAE5;
          color: #065F46;
        }
        .status-badge.sold {
          background: #FEE2E2;
          color: #DC2626;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .action-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .view-btn {
          background: rgba(255,215,0,0.1);
          color: #FFD700;
          border: 1px solid rgba(255,215,0,0.3);
        }
        .edit-btn {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: #0B3B2F;
        }
        .colors-btn {
          background: #FEF9E6;
          color: #FFD700;
          border: 1px solid rgba(255,215,0,0.3);
        }
        .delete-btn {
          background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
          color: white;
        }
        .action-btn:hover {
          transform: translateY(-2px);
        }

        /* Mobile Styles */
        .mobile-view {
          display: none;
        }
        .cards-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .vehicle-card {
          display: flex;
          gap: 16px;
          background: white;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #F3F4F6;
        }
        .card-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 16px;
        }
        .card-content {
          flex: 1;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .card-header h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .menu-trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #6B7280;
          border-radius: 50%;
        }
        .menu-wrapper {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 30px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
          z-index: 10;
          min-width: 160px;
          overflow: hidden;
        }
        .dropdown-menu button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          text-align: left;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dropdown-menu button:hover {
          background: #F9FAFB;
        }
        .dropdown-menu .delete-option {
          color: #DC2626;
        }
        .card-brand {
          color: #6B7280;
          font-size: 13px;
          margin: 4px 0;
        }
        .card-price {
          font-weight: 700;
          color: #065F46;
          margin: 8px 0;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .desktop-view {
            display: none;
          }
          .mobile-view {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

export default VehicleManagementTable;