import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faSearch, 
  faTimes,
  faArrowDown,
  faArrowUp,
  faStar,
  faFire,
  faClock,
  faTag,
  faArrowRight,
  faFilter,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import VehicleGrid from '../components/VehicleGrid';
import VehicleModal from '../components/VehicleModal';
import { loadMotorcycles } from '../utils/storage';
import WhatsAppButton from '../components/WhatsAppButton';

const containerStyles = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 16px'
};

// Hero Section with Motorcycle Image Background
const heroSectionStyles = {
  position: 'relative',
  marginBottom: '40px',
  borderRadius: '24px',
  overflow: 'hidden',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundImage: 'url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
};

const heroOverlayStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 100%)',
  zIndex: 1
};

const heroContentStyles = {
  position: 'relative',
  zIndex: 2,
  padding: '60px 24px',
  maxWidth: '800px',
  margin: '0 auto',
  color: 'white'
};

const titleStyles = {
  fontSize: '42px',
  fontWeight: 'bold',
  marginBottom: '16px',
  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap'
};

const subtitleStyles = {
  fontSize: '16px',
  marginBottom: '28px',
  lineHeight: '1.6',
  opacity: 0.9
};

const ctaButtonStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  padding: '12px 28px',
  borderRadius: '40px',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  border: 'none',
  cursor: 'pointer'
};

const featuredBadgeStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'rgba(255,215,0,0.9)',
  color: '#0B3B2F',
  padding: '6px 16px',
  borderRadius: '40px',
  fontSize: '12px',
  fontWeight: 'bold',
  marginBottom: '20px'
};

// Search Section - Mobile Optimized
const searchSectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '30px',
  backgroundColor: 'white',
  padding: '16px',
  borderRadius: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #E5E7EB'
};

const searchWrapperStyles = {
  position: 'relative',
  width: '100%'
};

const searchInputStyles = {
  width: '100%',
  padding: '14px 20px 14px 48px',
  border: '1px solid #E5E7EB',
  borderRadius: '50px',
  fontSize: '15px',
  outline: 'none',
  backgroundColor: '#F9FAFB',
  transition: 'all 0.3s ease'
};

const searchIconStyles = {
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF'
};

const filterBarStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const filterChipsStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  flex: 1
};

const filterChipStyles = {
  padding: '8px 16px',
  borderRadius: '40px',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: '#F3F4F6',
  color: '#4B5563',
  border: 'none',
  whiteSpace: 'nowrap'
};

const activeFilterChipStyles = {
  backgroundColor: '#FFD700',
  color: '#0B3B2F'
};

const sortButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '40px',
  backgroundColor: '#F3F4F6',
  border: 'none',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
  color: '#4B5563',
  transition: 'all 0.3s ease',
  whiteSpace: 'nowrap'
};

const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  textAlign: 'center',
  padding: '40px'
};

const loadingSpinnerStyles = {
  width: '60px',
  height: '60px',
  border: '4px solid rgba(255,215,0,0.2)',
  borderTop: '4px solid #FFD700',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '20px'
};

const errorStyles = {
  textAlign: 'center',
  padding: '40px 20px',
  backgroundColor: '#FEF2F2',
  borderRadius: '24px',
  color: '#DC2626',
  maxWidth: '400px',
  margin: '0 auto'
};

const retryButtonStyles = {
  marginTop: '20px',
  padding: '10px 24px',
  backgroundColor: '#DC2626',
  color: 'white',
  border: 'none',
  borderRadius: '40px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px'
};

const emptyStyles = {
  textAlign: 'center',
  padding: '60px 20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #F9FAFB 100%)',
  borderRadius: '24px',
  marginTop: '20px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const emptyIconStyles = {
  fontSize: '60px',
  color: '#FFD700',
  marginBottom: '20px'
};

const emptyTitleStyles = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: '#1F2937',
  marginBottom: '8px'
};

const emptyTextStyles = {
  fontSize: '14px',
  color: '#6B7280',
  marginBottom: '20px'
};

const resultsInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '12px',
  color: '#6B7280',
  fontSize: '13px',
  marginBottom: '20px',
  padding: '0 4px'
};

const mobileStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  
  @media (max-width: 640px) {
    .hero-title {
      font-size: 28px !important;
    }
    .hero-content {
      padding: 40px 20px !important;
    }
    .filter-chips {
      flex-wrap: wrap !important;
    }
    .filter-chip {
      font-size: 12px !important;
      padding: 6px 12px !important;
    }
    .sort-button {
      font-size: 12px !important;
      padding: 6px 12px !important;
    }
    .search-input {
      padding: 12px 16px 12px 40px !important;
      font-size: 14px !important;
    }
  }
`;

function CatalogPage({ language }) {
  const [motorcycles, setMotorcycles] = useState([]);
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    loadMotorcycleData();
  }, []);

  useEffect(() => {
    filterAndSortMotorcycles();
  }, [motorcycles, searchTerm, selectedBrand, sortBy]);

  const loadMotorcycleData = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedMotorcycles = await loadMotorcycles();
      const motorcycleArray = Array.isArray(loadedMotorcycles) ? loadedMotorcycles : [];
      const availableMotorcycles = motorcycleArray.filter(m => m && m.available !== false);
      setMotorcycles(availableMotorcycles);
    } catch (err) {
      console.error('Error loading motorcycles:', err);
      setError(err.message || 'Failed to load motorcycles');
      setMotorcycles([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMotorcycles = () => {
    let filtered = [...motorcycles];
    
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(m => m.brand === selectedBrand);
    }
    
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
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
    
    setFilteredMotorcycles(filtered);
  };

  const handleMotorcycleClick = (motorcycle) => {
    setSelectedMotorcycle(motorcycle);
    setIsModalOpen(true);
  };

  const handleRetry = () => {
    loadMotorcycleData();
  };

  const getUniqueBrands = () => {
    const brands = motorcycles.map(m => m.brand).filter(Boolean);
    return ['all', ...new Set(brands)];
  };

  const getSortLabel = () => {
    const labels = {
      newest: language === 'en' ? 'Latest' : 'Sabbi',
      'price-low': language === 'en' ? 'Price: Low' : 'Farashi: Kasa',
      'price-high': language === 'en' ? 'Price: High' : 'Farashi: Babba',
      'name-asc': language === 'en' ? 'Name: A-Z' : 'Suna: A-Z'
    };
    return labels[sortBy] || (language === 'en' ? 'Sort' : 'Tsara');
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={loadingStyles}>
        <div style={loadingSpinnerStyles} />
        <div style={{ fontSize: '16px', color: '#FFD700', fontWeight: 'bold', marginBottom: '4px' }}>
          <FontAwesomeIcon icon={faMotorcycle} spin />
        </div>
        <div style={{ fontSize: '14px', color: '#065F46' }}>
          {language === 'en' ? 'Loading motorcycles...' : 'Ana loda babura...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyles}>
        <div style={errorStyles}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
            {language === 'en' ? 'Connection Error' : 'Kuskuren Haɗi'}
          </h3>
          <p style={{ marginBottom: '20px', fontSize: '13px' }}>{error}</p>
          <button 
            onClick={handleRetry}
            style={retryButtonStyles}
          >
            <FontAwesomeIcon icon={faArrowDown} />
            {language === 'en' ? 'Try Again' : 'Sake gwadawa'}
          </button>
        </div>
      </div>
    );
  }

  const title = language === 'en' ? 'Premium Motorcycles' : 'Manyan Babura';
  const subtitle = language === 'en' 
    ? 'Discover quality motorcycles for Nigerian roads' 
    : 'Bincika manyan babura don hanyoyin Najeriya';

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={containerStyles}>
        {/* Hero Section with Motorcycle Image */}
        <div style={heroSectionStyles}>
          <div style={heroOverlayStyles} />
          <div className="hero-content" style={heroContentStyles}>
            <div style={featuredBadgeStyles}>
              <FontAwesomeIcon icon={faFire} />
              <span>2026 Premium Collection</span>
            </div>
            <h1 className="hero-title" style={titleStyles}>
              <FontAwesomeIcon icon={faMotorcycle} />
              {title}
            </h1>
            <p style={subtitleStyles}>{subtitle}</p>
            <button 
              style={ctaButtonStyles}
              onClick={scrollToCatalog}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = '#FFA500';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = '#FFD700';
              }}
            >
              {language === 'en' ? 'Explore Now' : 'Bincika Yanzu'}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div id="catalog-section" style={searchSectionStyles}>
          <div style={searchWrapperStyles}>
            <div style={searchIconStyles}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              className="search-input"
              type="text"
              placeholder={language === 'en' ? 'Search by name or brand...' : 'Bincika da suna ko kamfani...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyles}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF'
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          
          <div style={filterBarStyles}>
            <div className="filter-chips" style={filterChipsStyles}>
              {getUniqueBrands().slice(0, 4).map(brand => (
                <button
                  key={brand}
                  className="filter-chip"
                  style={{
                    ...filterChipStyles,
                    ...(selectedBrand === brand ? activeFilterChipStyles : {})
                  }}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand === 'all' ? (language === 'en' ? 'All' : 'Duka') : brand}
                </button>
              ))}
            </div>
            
            {/* Sort Button */}
            <div style={{ position: 'relative' }}>
              <button
                className="sort-button"
                style={sortButtonStyles}
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <FontAwesomeIcon icon={faChevronDown} />
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
                  minWidth: '150px',
                  overflow: 'hidden'
                }}>
                  {[
                    { value: 'newest', label: language === 'en' ? 'Latest Arrivals' : 'Sabbin Zuwa', icon: faClock },
                    { value: 'price-low', label: language === 'en' ? 'Price: Low to High' : 'Farashi: Kasa zuwa Babba', icon: faArrowUp },
                    { value: 'price-high', label: language === 'en' ? 'Price: High to Low' : 'Farashi: Babba zuwa Kasa', icon: faArrowDown },
                    { value: 'name-asc', label: language === 'en' ? 'Name: A to Z' : 'Suna: A zuwa Z', icon: faTag }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        border: 'none',
                        backgroundColor: sortBy === option.value ? '#FEF9E6' : 'white',
                        color: sortBy === option.value ? '#FFD700' : '#374151',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px'
                      }}
                    >
                      <FontAwesomeIcon icon={option.icon} />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div style={resultsInfoStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
            <span>
              {filteredMotorcycles.length} {language === 'en' ? 'motorcycles' : 'babura'}
              {searchTerm && ` "${searchTerm}"`}
            </span>
          </div>
          {selectedBrand !== 'all' && (
            <button
              onClick={() => setSelectedBrand('all')}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFD700',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {language === 'en' ? 'Clear filter' : 'Share filta'} ✕
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredMotorcycles.length === 0 ? (
          <div style={emptyStyles}>
            <div style={emptyIconStyles}>
              <FontAwesomeIcon icon={faMotorcycle} />
            </div>
            <h3 style={emptyTitleStyles}>
              {language === 'en' ? 'No motorcycles found' : 'Babu babura da aka samu'}
            </h3>
            <p style={emptyTextStyles}>
              {language === 'en' 
                ? `Try a different search term or browse all motorcycles.`
                : `Gwada wani kalmar bincike daban ko duba duk babura.`}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedBrand('all');
              }}
              style={retryButtonStyles}
            >
              <FontAwesomeIcon icon={faTimes} />
              {language === 'en' ? 'Clear Filters' : 'Share Fitar'}
            </button>
          </div>
        ) : (
          <VehicleGrid 
            vehicles={filteredMotorcycles} 
            onVehicleClick={handleMotorcycleClick}
            language={language}
          />
        )}
        
        <VehicleModal 
          vehicle={selectedMotorcycle}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          language={language}
        />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default CatalogPage;