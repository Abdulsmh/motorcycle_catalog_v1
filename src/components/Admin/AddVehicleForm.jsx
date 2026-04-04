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
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const MOTORCYCLE_PLACEHOLDER = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop';

function AddVehicleForm({ onAdd }) {
  const [vehicle, setVehicle] = useState({
    name: '',
    brand: '',
    price: '',
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

  const handlePriceChange = (e) => {
    const raw = e.target.value;
    if (raw === '' || /^\d+$/.test(raw)) {
      setVehicle({ ...vehicle, price: raw });
    }
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
      
      setVehicle({
        name: '',
        brand: '',
        price: '',
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
    <div className="add-vehicle-form">
      <h3 className="form-title">
        <FontAwesomeIcon icon={faMotorcycle} style={{ color: '#FFD700' }} />
        Add New Motorcycle to Catalog
      </h3>
      
      <form onSubmit={handleSubmit}>
        {/* Section 1: Identity */}
        <fieldset className="form-section">
          <legend>Identity</legend>
          <div className="form-row">
            <div className="input-group">
              <label>
                <FontAwesomeIcon icon={faTag} style={{ color: '#FFD700' }} />
                Motorcycle Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={vehicle.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={getInputFocusStyle('name')}
                placeholder="e.g., Haojue HJ150, Honda CG125"
                required
              />
            </div>
            <div className="input-group">
              <label>
                <FontAwesomeIcon icon={faTag} style={{ color: '#FFD700' }} />
                Brand <span className="required">*</span>
              </label>
              <input
                type="text"
                name="brand"
                value={vehicle.brand}
                onChange={handleChange}
                onFocus={() => setFocusedField('brand')}
                onBlur={() => setFocusedField(null)}
                style={getInputFocusStyle('brand')}
                placeholder="e.g., Haojue, Honda, Lifan"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Section 2: Pricing */}
        <fieldset className="form-section">
          <legend>Pricing</legend>
          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faNairaSign} style={{ color: '#FFD700' }} />
              Price (₦) <span className="required">*</span>
            </label>
            <input
              type="text"
              name="price"
              value={vehicle.price}
              onChange={handlePriceChange}
              onFocus={() => setFocusedField('price')}
              onBlur={() => setFocusedField(null)}
              style={getInputFocusStyle('price')}
              placeholder="e.g., 850000"
              required
            />
            <div className="helper-text">
              <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '10px' }} />
              Enter price in Nigerian Naira (₦) - numbers only
            </div>
          </div>
        </fieldset>

        {/* Section 3: Descriptions */}
        <fieldset className="form-section">
          <legend>Descriptions</legend>
          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faLanguage} style={{ color: '#FFD700' }} />
              English Description
            </label>
            <textarea
              name="description_en"
              value={vehicle.description_en}
              onChange={handleChange}
              onFocus={() => setFocusedField('description_en')}
              onBlur={() => setFocusedField(null)}
              style={getInputFocusStyle('description_en')}
              rows="3"
              placeholder="Describe the motorcycle features, condition, etc. in English"
            />
          </div>
          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faLanguage} style={{ color: '#FFD700' }} />
              Hausa Description
            </label>
            <textarea
              name="description_ha"
              value={vehicle.description_ha}
              onChange={handleChange}
              onFocus={() => setFocusedField('description_ha')}
              onBlur={() => setFocusedField(null)}
              style={getInputFocusStyle('description_ha')}
              rows="3"
              placeholder="Bayani a cikin Hausa game da babur"
            />
          </div>
        </fieldset>

        {/* Section 4: Media */}
        <fieldset className="form-section">
          <legend>Media</legend>
          <div className="input-group">
            <label>
              <FontAwesomeIcon icon={faImage} style={{ color: '#FFD700' }} />
              Main Image <span className="required">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="file-input"
              required
            />
            {mainImagePreview && (
              <div className="image-preview">
                <img src={mainImagePreview} alt="Preview" />
                <div className="helper-text success">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Image ready for upload
                </div>
              </div>
            )}
          </div>
        </fieldset>

        {/* Section 5: Colors */}
        <fieldset className="form-section">
          <legend>Colors & Availability</legend>
          {vehicle.colors.map((color, index) => (
            <div key={index} className="color-card">
              <input
                type="text"
                placeholder="Color name (e.g., Red, Black, Blue)"
                value={color.name}
                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
              />
              <div className="color-controls">
                <div>
                  <label>Color Code</label>
                  <input
                    type="color"
                    value={color.code}
                    onChange={(e) => handleColorChange(index, 'code', e.target.value)}
                    className="color-picker"
                  />
                </div>
                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={color.quantity}
                    onChange={(e) => handleColorChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="quantity-input"
                    min="0"
                  />
                </div>
              </div>
              <div className="color-image-upload">
                <label>
                  <FontAwesomeIcon icon={faImage} /> Color Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleColorImageChange(index, e)}
                  className="file-input-small"
                />
                {colorImages[index] && (
                  <img 
                    src={URL.createObjectURL(colorImages[index])} 
                    alt="Color preview" 
                    className="color-preview"
                    onError={(e) => {
                      e.target.src = MOTORCYCLE_PLACEHOLDER;
                    }}
                  />
                )}
              </div>
              {vehicle.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="remove-color-btn"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Remove Color
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addColor} className="add-color-btn">
            <FontAwesomeIcon icon={faPlus} />
            Add Another Color
          </button>
        </fieldset>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="spinner" />
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
        .add-vehicle-form {
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 20px 35px -10px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,215,0,0.2);
          margin-bottom: 30px;
        }
        .form-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 2px solid rgba(255,215,0,0.3);
          padding-bottom: 15px;
        }
        .form-section {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          background: white;
        }
        legend {
          font-weight: 600;
          color: #1F2937;
          padding: 0 12px;
          width: auto;
          font-size: 14px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .input-group {
          margin-bottom: 16px;
        }
        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .input-group input, .input-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }
        .input-group input:focus, .input-group textarea:focus {
          border-color: #FFD700;
          box-shadow: 0 0 0 3px rgba(255,215,0,0.1);
        }
        .required {
          color: #FFD700;
        }
        .helper-text {
          font-size: 12px;
          color: #6B7280;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .helper-text.success {
          color: #10B981;
        }
        .file-input {
          width: 100%;
          padding: 10px;
          border: 2px dashed #E5E7EB;
          border-radius: 12px;
          background-color: #F9FAFB;
          cursor: pointer;
        }
        .image-preview {
          margin-top: 12px;
        }
        .image-preview img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid #FFD700;
        }
        .color-card {
          margin-bottom: 16px;
          padding: 16px;
          background-color: #F9FAFB;
          border-radius: 16px;
          position: relative;
        }
        .color-card input[type="text"] {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          margin-bottom: 12px;
        }
        .color-controls {
          display: flex;
          gap: 15px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .color-picker {
          width: 60px;
          height: 45px;
          border: 2px solid #E5E7EB;
          border-radius: 10px;
          cursor: pointer;
        }
        .quantity-input {
          width: 120px;
          padding: 10px;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
        }
        .color-image-upload {
          margin-top: 10px;
        }
        .color-image-upload label {
          font-size: 12px;
          color: #6B7280;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
        }
        .file-input-small {
          padding: 8px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          width: 100%;
        }
        .color-preview {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          margin-top: 10px;
          border: 2px solid #FFD700;
        }
        .remove-color-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #FEE2E2;
          color: #DC2626;
          border: none;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .remove-color-btn:hover {
          background: #DC2626;
          color: white;
        }
        .add-color-btn {
          background: linear-gradient(135deg, #0B3B2F 0%, #1A5D4A 100%);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: #0B3B2F;
          padding: 14px;
          border: none;
          border-radius: 40px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,215,0,0.4);
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #0B3B2F;
          border-top: 2px solid #FFD700;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .add-vehicle-form { padding: 20px; }
          .form-title { font-size: 20px; }
          .form-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </div>
  );
}

export default AddVehicleForm;