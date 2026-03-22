import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMotorcycle, 
  faTag, 
  faNairaSign, 
  faLanguage,
  faImage,
  faPalette,
  faPlus,
  faTrash,
  faUpload,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const formStyles = {
  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
  padding: '30px',
  borderRadius: '24px',
  boxShadow: '0 20px 35px -10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)',
  marginBottom: '30px',
  border: '1px solid rgba(255,215,0,0.2)',
  position: 'relative',
  overflow: 'hidden'
};

const titleStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '25px',
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderBottom: '2px solid rgba(255,215,0,0.3)',
  paddingBottom: '15px'
};

const inputGroupStyles = {
  marginBottom: '20px'
};

const labelStyles = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: '#1F2937',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const inputStyles = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  transition: 'all 0.3s ease',
  outline: 'none',
  backgroundColor: 'white'
};

const textareaStyles = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  minHeight: '100px',
  transition: 'all 0.3s ease',
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical'
};

const fileInputStyles = {
  width: '100%',
  padding: '10px',
  border: '2px dashed #E5E7EB',
  borderRadius: '12px',
  fontSize: '14px',
  backgroundColor: '#F9FAFB',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const colorInputStyles = {
  width: '60px',
  height: '45px',
  border: '2px solid #E5E7EB',
  borderRadius: '10px',
  cursor: 'pointer',
  padding: '5px'
};

const addColorButtonStyles = {
  background: 'linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%)',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '40px',
  cursor: 'pointer',
  marginTop: '15px',
  fontSize: '14px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 8px rgba(11,59,47,0.2)'
};

const submitButtonStyles = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  color: '#0B3B2F',
  padding: '14px 28px',
  border: 'none',
  borderRadius: '40px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  marginTop: '20px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
};

const previewImageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  marginTop: '12px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  border: '2px solid #FFD700'
};

const colorCardStyles = {
  marginBottom: '15px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '16px',
  border: '1px solid #E5E7EB',
  transition: 'all 0.3s ease',
  position: 'relative'
};

const removeButtonStyles = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  backgroundColor: '#FEE2E2',
  color: '#DC2626',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  transition: 'all 0.3s ease'
};

const requiredStar = {
  color: '#FFD700',
  marginLeft: '4px'
};

const helperText = {
  fontSize: '12px',
  color: '#6B7280',
  marginTop: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

function AddVehicleForm({ onAdd }) {
  const [vehicle, setVehicle] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    description_en: '',
    description_ha: '',
    colors: [{ name: '', code: '#FFD700', quantity: 1 }]
  });
  
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [colorImages, setColorImages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value
    });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setMainImage(file);
      const previewUrl = URL.createObjectURL(file);
      setMainImagePreview(previewUrl);
    }
  };

  const handleColorImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setColorImages({
        ...colorImages,
        [index]: file
      });
    }
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...vehicle.colors];
    updatedColors[index][field] = value;
    setVehicle({ ...vehicle, colors: updatedColors });
  };

  const addColor = () => {
    setVehicle({
      ...vehicle,
      colors: [...vehicle.colors, { name: '', code: '#FFD700', quantity: 1 }]
    });
  };

  const removeColor = (index) => {
    const updatedColors = vehicle.colors.filter((_, i) => i !== index);
    setVehicle({ ...vehicle, colors: updatedColors });
    // Remove associated color image
    const newColorImages = { ...colorImages };
    delete newColorImages[index];
    setColorImages(newColorImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!vehicle.name || !vehicle.brand || !vehicle.price) {
      alert('Please fill in all required fields');
      return;
    }

    if (!mainImage) {
      alert('Please select a main image for the motorcycle');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAdd(vehicle, mainImage, colorImages);
      
      // Reset form
      setVehicle({
        name: '',
        brand: '',
        price: '',
        description: '',
        description_en: '',
        description_ha: '',
        colors: [{ name: '', code: '#FFD700', quantity: 1 }]
      });
      setMainImage(null);
      setMainImagePreview('');
      setColorImages({});
      
      alert('✅ Motorcycle added successfully!');
    } catch (error) {
      console.error('Error adding motorcycle:', error);
      alert('❌ Error adding motorcycle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputFocusStyle = (fieldName) => {
    return focusedField === fieldName ? {
      borderColor: '#FFD700',
      boxShadow: '0 0 0 3px rgba(255,215,0,0.1)'
    } : {};
  };

  return (
    <div style={formStyles}>
      <h3 style={titleStyles}>
        <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
        Add New Motorcycle to Catalog
      </h3>
      
      <form onSubmit={handleSubmit}>
        {/* Motorcycle Name */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faTag} style={{ color: '#FFD700' }} />
            Motorcycle Name <span style={requiredStar}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={vehicle.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...inputStyles,
              ...getInputFocusStyle('name')
            }}
            placeholder="e.g., Haojue HJ150, Honda CG125"
            required
          />
        </div>

        {/* Brand */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faTag} style={{ color: '#FFD700' }} />
            Brand <span style={requiredStar}>*</span>
          </label>
          <input
            type="text"
            name="brand"
            value={vehicle.brand}
            onChange={handleChange}
            onFocus={() => setFocusedField('brand')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...inputStyles,
              ...getInputFocusStyle('brand')
            }}
            placeholder="e.g., Haojue, Honda, Lifan, Royal Enfield"
            required
          />
        </div>

        {/* Price */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faNairaSign} style={{ color: '#FFD700' }} />
            Price (₦) <span style={requiredStar}>*</span>
          </label>
          <input
            type="number"
            name="price"
            value={vehicle.price}
            onChange={handleChange}
            onFocus={() => setFocusedField('price')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...inputStyles,
              ...getInputFocusStyle('price')
            }}
            placeholder="e.g., 850000"
            required
          />
          <div style={helperText}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '10px' }} />
            Enter price in Nigerian Naira (₦)
          </div>
        </div>

        {/* Description (English) */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faLanguage} style={{ color: '#FFD700' }} />
            Description (English)
          </label>
          <textarea
            name="description_en"
            value={vehicle.description_en}
            onChange={handleChange}
            onFocus={() => setFocusedField('description_en')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...textareaStyles,
              ...getInputFocusStyle('description_en')
            }}
            placeholder="Describe the motorcycle features, condition, etc. in English"
          />
        </div>

        {/* Description (Hausa) */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faLanguage} style={{ color: '#FFD700' }} />
            Description (Hausa)
          </label>
          <textarea
            name="description_ha"
            value={vehicle.description_ha}
            onChange={handleChange}
            onFocus={() => setFocusedField('description_ha')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...textareaStyles,
              ...getInputFocusStyle('description_ha')
            }}
            placeholder="Describe the motorcycle in Hausa language"
          />
        </div>

        {/* Main Image */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faImage} style={{ color: '#FFD700' }} />
            Main Image <span style={requiredStar}>*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            style={fileInputStyles}
            required
          />
          {mainImagePreview && (
            <div>
              <img src={mainImagePreview} alt="Preview" style={previewImageStyles} />
              <div style={helperText}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#10B981' }} />
                Image ready for upload
              </div>
            </div>
          )}
        </div>

        {/* Colors Section */}
        <div style={inputGroupStyles}>
          <label style={labelStyles}>
            <FontAwesomeIcon icon={faPalette} style={{ color: '#FFD700' }} />
            Colors & Availability
          </label>
          {vehicle.colors.map((color, index) => (
            <div key={index} style={colorCardStyles}>
              <input
                type="text"
                placeholder="Color name (e.g., Red, Black, Blue)"
                value={color.name}
                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                style={inputStyles}
              />
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6B7280' }}>Color Code</label>
                  <input
                    type="color"
                    value={color.code}
                    onChange={(e) => handleColorChange(index, 'code', e.target.value)}
                    style={colorInputStyles}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6B7280' }}>Quantity</label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={color.quantity}
                    onChange={(e) => handleColorChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    style={{ ...inputStyles, width: '120px' }}
                  />
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FontAwesomeIcon icon={faImage} /> Color Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleColorImageChange(index, e)}
                  style={{ ...fileInputStyles, marginTop: '5px' }}
                />
                {colorImages[index] && (
                  <img 
                    src={URL.createObjectURL(colorImages[index])} 
                    alt="Color preview" 
                    style={previewImageStyles} 
                  />
                )}
              </div>
              {vehicle.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  style={removeButtonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#DC2626';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FEE2E2';
                    e.target.style.color = '#DC2626';
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Remove
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addColor} 
            style={addColorButtonStyles}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(11,59,47,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(11,59,47,0.2)';
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Another Color
          </button>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          style={submitButtonStyles}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255,215,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255,215,0,0.3)';
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="spinner" style={{
                width: '20px',
                height: '20px',
                border: '2px solid #0B3B2F',
                borderTop: '2px solid #FFD700',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Adding Motorcycle...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUpload} />
              Add Motorcycle to Catalog
            </>
          )}
        </button>
      </form>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AddVehicleForm;