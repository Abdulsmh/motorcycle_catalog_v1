import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faPalette, faBoxes, faNairaSign } from '@fortawesome/free-solid-svg-icons';

const DashboardStats = ({ stats }) => {
  const { totalMotorcycles, totalColors, totalStock, totalValue } = stats;

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    { id: 1, label: 'Total Motorcycles', value: totalMotorcycles, icon: faMotorcycle },
    { id: 2, label: 'Color Options', value: totalColors, icon: faPalette },
    { id: 3, label: 'Total Units', value: totalStock, icon: faBoxes },
    { id: 4, label: 'Total Inventory Value', value: formatNaira(totalValue), icon: faNairaSign, isHero: true },
  ];

  return (
    <div className="dashboard-stats-grid">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`stat-card ${card.isHero ? 'hero-card' : ''}`}
        >
          <div className="stat-icon-wrapper">
            <FontAwesomeIcon icon={card.icon} />
          </div>
          <div className="stat-value">{card.value}</div>
          <div className="stat-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;