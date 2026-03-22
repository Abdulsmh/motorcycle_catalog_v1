import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faSearch, 
  faFilter,
  faTimes,
  faArrowDown,
  faArrowUp,
  faStar,
  faFire,
  faClock,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import VehicleGrid from '../components/VehicleGrid';
import VehicleModal from '../components/VehicleModal';
import { loadMotorcycles } from '../utils/storage';
import WhatsAppButton from '../components/WhatsAppButton';

const containerStyles = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 24px'
};

const heroSectionStyles = {
  textAlign: 'center',
  marginBottom: '60px',
  position: 'relative',
  padding: '60px 20px',
  background: 'linear-gradient(135deg, #FEF9E6 0%, #ffffff 100%)',
  borderRadius: '32px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const titleStyles = {
  fontSize: '56px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  flexWrap: 'wrap'
};

const subtitleStyles = {
  fontSize: '18px',
  color: '#6B7280',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
};

const featuredBadgeStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#FFD700',
  color: '#0B3B2F',
  padding: '8px 20px',
  borderRadius: '40px',
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '24px'
};

const searchSectionStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px',
  marginBottom: '40px',
  backgroundColor: 'white',
  padding: '16px 24px',
  borderRadius: '60px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #E5E7EB'
};

const searchWrapperStyles = {
  flex: 1,
  position: 'relative',
  minWidth: '200px'
};

const searchInputStyles = {
  width: '100%',
  padding: '12px 20px 12px 48px',
  border: 'none',
  borderRadius: '40px',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#F9FAFB'
};

const searchIconStyles = {
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9CA3AF'
};

const filterWrapperStyles = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap'
};

const filterChipStyles = {
  padding: '8px 20px',
  borderRadius: '40px',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: '#F3F4F6',
  color: '#4B5563',
  border: 'none'
};

const activeFilterChipStyles = {
  backgroundColor: '#FFD700',
  color: '#0B3B2F'
};

const sortButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 20px',
  borderRadius: '40px',
  backgroundColor: '#F3F4F6',
  border: 'none',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
  color: '#4B5563',
  transition: 'all 0.3s ease'
};

const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '500px',
  textAlign: 'center'
};

const loadingSpinnerStyles = {
  width: '70px',
  height: '70px',
  border: '4px solid rgba(255,215,0,0.2)',
  borderTop: '4px solid #FFD700',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '24px'
};

const errorStyles = {
  textAlign: 'center',
  padding: '60px 40px',
  backgroundColor: '#FEF2F2',
  borderRadius: '32px',
  color: '#DC2626',
  maxWidth: '500px',
  margin: '0 auto',
  border: '1px solid #FECACA'
};

const retryButtonStyles = {
  marginTop: '24px',
  padding: '12px 28px',
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
  padding: '80px 40px',
  background: 'linear-gradient(135deg, #ffffff 0%, #F9FAFB 100%)',
  borderRadius: '32px',
  marginTop: '20px',
  border: '1px solid rgba(255,215,0,0.2)'
};

const emptyIconStyles = {
  fontSize: '80px',
  color: '#FFD700',
  marginBottom: '24px',
  animation: 'float 3s ease-in-out infinite'
};

const emptyTitleStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1F2937',
  marginBottom: '12px'
};

const emptyTextStyles = {
  fontSize: '16px',
  color: '#6B7280',
  marginBottom: '28px'
};

const resultsInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#6B7280',
  fontSize: '14px',
  marginBottom: '20px'
};

const mobileStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
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
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 36px !important;
    }
    .search-section {
      flex-direction: column !important;
      padding: 16px !important;
      border-radius: 24px !important;
    }
    .search-wrapper {
      width: 100% !important;
    }
    .filter-wrapper {
      width: 100% !important;
      justify-content: center !important;
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
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(m => m.brand === selectedBrand);
    }
    
    // Sort
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
      newest: 'Latest Arrivals',
      'price-low': 'Price: Low to High',
      'price-high': 'Price: High to Low',
      'name-asc': 'Name: A to Z'
    };
    return labels[sortBy] || 'Sort by';
  };

  if (loading) {
    return (
      <div style={loadingStyles}>
        <div style={loadingSpinnerStyles} />
        <div style={{ fontSize: '20px', color: '#FFD700', fontWeight: 'bold', marginBottom: '8px' }}>
          <FontAwesomeIcon icon={faMotorcycle} spin />
        </div>
        <div style={{ fontSize: '16px', color: '#065F46' }}>
          {language === 'en' ? 'Loading premium motorcycles...' : 'Ana loda manyan babura...'}
        </div>
        <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '8px' }}>
          {language === 'en' ? 'Please wait' : 'Da fatan a jira'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyles}>
        <div style={errorStyles}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
          <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>
            {language === 'en' ? 'Connection Error' : 'Kuskuren Haɗi'}
          </h3>
          <p style={{ marginBottom: '24px', fontSize: '14px' }}>{error}</p>
          <button 
            onClick={handleRetry}
            style={retryButtonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
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
    ? 'Discover our collection of quality motorcycles for Nigerian roads' 
    : 'Bincika tarin manyan baburan mu don hanyoyin Najeriya';

  return (
    <>
      <style>{mobileStyles}</style>
      <div style={containerStyles}>
        {/* Hero Section */}
        <div style={heroSectionStyles}>
          <div style={featuredBadgeStyles}>
            <FontAwesomeIcon icon={faFire} />
            <span>Premium Collection 2026</span>
          </div>
          <h1 className="hero-title" style={titleStyles}>
            <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
            {title}
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD700' }} />
          </h1>
          <p style={subtitleStyles}>{subtitle}</p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section" style={searchSectionStyles}>
          <div className="search-wrapper" style={searchWrapperStyles}>
            <div style={searchIconStyles}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              type="text"
              placeholder={language === 'en' ? 'Search by name or brand...' : 'Bincika da sunan babur ko kamfani...'}
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
          
          <div className="filter-wrapper" style={filterWrapperStyles}>
            {/* Brand Filters */}
            {getUniqueBrands().slice(0, 5).map(brand => (
              <button
                key={brand}
                style={{
                  ...filterChipStyles,
                  ...(selectedBrand === brand ? activeFilterChipStyles : {})
                }}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand === 'all' ? (language === 'en' ? 'All' : 'Duka') : brand}
              </button>
            ))}
            
            {/* Sort Button */}
            <div style={{ position: 'relative' }}>
              <button
                style={sortButtonStyles}
                onClick={() => setShowSortMenu(!showSortMenu)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#F3F4F6'}
              >
                <FontAwesomeIcon icon={sortBy === 'price-low' ? faArrowUp : faArrowDown} />
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
                    { value: 'newest', label: language === 'en' ? 'Latest Arrivals' : 'Sabbin Zuwa', icon: faClock },
                    { value: 'price-low', label: language === 'en' ? 'Price: Low to High' : 'Farashi: Karami zuwa Babba', icon: faArrowUp },
                    { value: 'price-high', label: language === 'en' ? 'Price: High to Low' : 'Farashi: Babba zuwa Karami', icon: faArrowDown },
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
          <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
          <span>
            {filteredMotorcycles.length} {language === 'en' ? 'motorcycles found' : 'baburan da aka samu'}
            {searchTerm && ` ${language === 'en' ? 'for' : 'domin'} "${searchTerm}"`}
          </span>
        </div>

        {/* Empty State */}
        {filteredMotorcycles.length === 0 ? (
          <div style={emptyStyles}>
            <div style={emptyIconStyles}>
              <FontAwesomeIcon icon={faMotorcycle} />
            </div>
            <h3 style={emptyTitleStyles}>
              {language === 'en' ? 'No motorcycles found' : 'Babu baburan da aka samu'}
            </h3>
            <p style={emptyTextStyles}>
              {language === 'en' 
                ? `We couldn't find any motorcycles matching "${searchTerm}". Try a different search term.`
                : `Ba mu sami wani babur da ya dace da "${searchTerm}" ba. Gwada wani kalmar bincike daban.`}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedBrand('all');
              }}
              style={retryButtonStyles}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#065F46'}
            >
              <FontAwesomeIcon icon={faTimes} />
              {language === 'en' ? 'Clear Filters' : 'Share Filta'}
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