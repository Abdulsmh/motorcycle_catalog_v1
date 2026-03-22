import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faSearch, 
  faFilter,
  faThLarge,
  faThList,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '28px',
  padding: '20px 0',
  animation: 'fadeInUp 0.5s ease'
};

const listStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px 0',
  animation: 'fadeInUp 0.5s ease'
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  flexWrap: 'wrap',
  gap: '16px'
};

const resultsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#6B7280',
  fontSize: '14px'
};

const viewToggleStyles = {
  display: 'flex',
  gap: '8px',
  backgroundColor: '#F3F4F6',
  padding: '4px',
  borderRadius: '40px'
};

const viewButtonStyles = (isActive) => ({
  backgroundColor: isActive ? '#FFD700' : 'transparent',
  color: isActive ? '#0B3B2F' : '#6B7280',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '32px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const sortStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'white',
  padding: '6px 12px',
  borderRadius: '40px',
  border: '1px solid #E5E7EB',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const emptyStateStyles = {
  textAlign: 'center',
  padding: '80px 20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
  borderRadius: '32px',
  border: '1px solid rgba(255,215,0,0.2)',
  marginTop: '20px'
};

const emptyIconStyles = {
  fontSize: '80px',
  color: '#FFD700',
  marginBottom: '20px',
  animation: 'float 3s ease-in-out infinite'
};

const emptyTitleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1F2937',
  marginBottom: '12px'
};

const emptyTextStyles = {
  fontSize: '16px',
  color: '#6B7280',
  marginBottom: '24px'
};

const loadingStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '28px',
  padding: '20px 0'
};

const skeletonCardStyles = {
  backgroundColor: 'white',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
  border: '1px solid #F3F4F6'
};

const skeletonImageStyles = {
  width: '100%',
  height: '220px',
  backgroundColor: '#F3F4F6',
  background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite'
};

const skeletonContentStyles = {
  padding: '20px'
};

const skeletonLineStyles = {
  height: '20px',
  backgroundColor: '#F3F4F6',
  borderRadius: '8px',
  marginBottom: '12px',
  background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite'
};

const filterBarStyles = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const filterChipStyles = {
  backgroundColor: '#F3F4F6',
  padding: '6px 16px',
  borderRadius: '40px',
  fontSize: '13px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: '#6B7280'
};

const activeFilterChipStyles = {
  backgroundColor: '#FFD700',
  color: '#0B3B2F'
};

function VehicleGrid({ vehicles, onVehicleClick, language }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    // Simulate loading for smooth animation
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [vehicles]);

  // Get unique brands for filter
  const brands = ['all', ...new Set(vehicles.map(v => v.brand).filter(Boolean))];

  // Filter vehicles
  let filteredVehicles = vehicles;
  if (selectedBrand !== 'all') {
    filteredVehicles = filteredVehicles.filter(v => v.brand === selectedBrand);
  }

  // Sort vehicles
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'price-low') {
      return (a.price || 0) - (b.price || 0);
    }
    if (sortBy === 'price-high') {
      return (b.price || 0) - (a.price || 0);
    }
    if (sortBy === 'name-asc') {
      return (a.name || '').localeCompare(b.name || '');
    }
    return 0;
  });

  const getSortLabel = () => {
    const labels = {
      newest: 'Latest Arrivals',
      oldest: 'Oldest First',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      'name-asc': 'Name: A to Z'
    };
    return labels[sortBy] || 'Sort by';
  };

  if (isLoading) {
    return (
      <>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
        <div style={loadingStyles}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={skeletonCardStyles}>
              <div style={skeletonImageStyles} />
              <div style={skeletonContentStyles}>
                <div style={{ ...skeletonLineStyles, width: '80%' }} />
                <div style={{ ...skeletonLineStyles, width: '60%' }} />
                <div style={{ ...skeletonLineStyles, width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div style={emptyStateStyles}>
        <div style={emptyIconStyles}>
          <FontAwesomeIcon icon={faMotorcycle} />
        </div>
        <h3 style={emptyTitleStyles}>
          {language === 'en' ? 'No Motorcycles Available' : 'Babu Babura Masu Samuwa'}
        </h3>
        <p style={emptyTextStyles}>
          {language === 'en' 
            ? 'Check back later for new arrivals or add your first motorcycle.' 
            : 'Duba baya daga baya don sababbin masu zuwa ko ƙara babur ɗinku na farko.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (max-width: 640px) {
          .vehicle-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {/* Header with Results and Controls */}
      <div style={headerStyles}>
        <div style={resultsStyles}>
          <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
          <span>
            {sortedVehicles.length} {language === 'en' ? 'motorcycles found' : 'babura aka samu'}
          </span>
        </div>

        <div style={filterBarStyles}>
          {/* Brand Filters */}
          {brands.slice(0, 5).map(brand => (
            <button
              key={brand}
              style={{
                ...filterChipStyles,
                ...(selectedBrand === brand ? activeFilterChipStyles : {})
              }}
              onClick={() => setSelectedBrand(brand)}
              onMouseEnter={(e) => {
                if (selectedBrand !== brand) {
                  e.target.style.backgroundColor = '#E5E7EB';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedBrand !== brand) {
                  e.target.style.backgroundColor = '#F3F4F6';
                }
              }}
            >
              {brand === 'all' ? (language === 'en' ? 'All Brands' : 'Duk Kayayyakin') : brand}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              style={sortStyles}
              onClick={() => setShowSortMenu(!showSortMenu)}
              onMouseEnter={(e) => e.target.style.borderColor = '#FFD700'}
              onMouseLeave={(e) => e.target.style.borderColor = '#E5E7EB'}
            >
              <FontAwesomeIcon icon={sortBy === 'price-low' || sortBy === 'price-high' ? faArrowUp : faArrowDown} />
              {getSortLabel()}
            </button>
            {showSortMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                border: '1px solid #E5E7EB',
                zIndex: 10,
                minWidth: '180px',
                overflow: 'hidden'
              }}>
                {[
                  { value: 'newest', label: 'Latest Arrivals', icon: faArrowUp },
                  { value: 'oldest', label: 'Oldest First', icon: faArrowDown },
                  { value: 'price-low', label: 'Price: Low to High', icon: faArrowUp },
                  { value: 'price-high', label: 'Price: High to Low', icon: faArrowDown },
                  { value: 'name-asc', label: 'Name: A to Z', icon: faArrowUp }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: sortBy === option.value ? '#FEF9E6' : 'white',
                      color: sortBy === option.value ? '#FFD700' : '#374151',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = sortBy === option.value ? '#FEF9E6' : 'white'}
                  >
                    <FontAwesomeIcon icon={option.icon} />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div style={viewToggleStyles}>
            <button
              style={viewButtonStyles(viewMode === 'grid')}
              onClick={() => setViewMode('grid')}
            >
              <FontAwesomeIcon icon={faThLarge} />
            </button>
            <button
              style={viewButtonStyles(viewMode === 'list')}
              onClick={() => setViewMode('list')}
            >
              <FontAwesomeIcon icon={faThList} />
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Grid/List */}
      <div className="vehicle-grid" style={viewMode === 'grid' ? gridStyles : listStyles}>
        {sortedVehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            onClick={onVehicleClick}
            language={language}
          />
        ))}
      </div>

      {/* Load More Button (Optional) */}
      {sortedVehicles.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #FFD700',
              color: '#FFD700',
              padding: '12px 32px',
              borderRadius: '40px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FFD700';
              e.target.style.color = '#0B3B2F';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#FFD700';
            }}
          >
            Load More Motorcycles
          </button>
        </div>
      )}
    </>
  );
}

export default VehicleGrid;