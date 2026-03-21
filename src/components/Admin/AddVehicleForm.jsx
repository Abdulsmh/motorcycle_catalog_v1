import React, { useState } from 'react';

const formStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '30px'
};

const titleStyles = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333'
};

const inputGroupStyles = {
  marginBottom: '15px'
};

const labelStyles = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#555'
};

const inputStyles = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '14px'
};

const textareaStyles = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '14px',
  minHeight: '80px'
};

const fileInputStyles = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '14px',
  backgroundColor: '#f9f9f9'
};

const colorInputStyles = {
  width: '50px',
  height: '35px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  cursor: 'pointer'
};

const addColorButtonStyles = {
  backgroundColor: '#34a853',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

const submitButtonStyles = {
  backgroundColor: '#1a73e8',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  marginTop: '10px'
};

const previewImageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  marginTop: '10px',
  borderRadius: '5px'
};

function AddVehicleForm({ onAdd }) {
  const [vehicle, setVehicle] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    colors: [{ name: '', code: '#FF0000', quantity: 1 }]
  });
  
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [colorImages, setColorImages] = useState({});

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value
    });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const previewUrl = URL.createObjectURL(file);
      setMainImagePreview(previewUrl);
    }
  };

  const handleColorImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
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
      colors: [...vehicle.colors, { name: '', code: '#FF0000', quantity: 1 }]
    });
  };

  const removeColor = (index) => {
    const updatedColors = vehicle.colors.filter((_, i) => i !== index);
    setVehicle({ ...vehicle, colors: updatedColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!vehicle.name || !vehicle.brand || !vehicle.price || !vehicle.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Pass the images to the parent component
    await onAdd(vehicle, mainImage, colorImages);
    
    // Reset form
    setVehicle({
      name: '',
      brand: '',
      price: '',
      description: '',
      colors: [{ name: '', code: '#FF0000', quantity: 1 }]
    });
    setMainImage(null);
    setMainImagePreview('');
    setColorImages({});
  };

  return (
    <div style={formStyles}>
      <h3 style={titleStyles}>Add New Motorcycle</h3>
      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyles}>
          <label style={labelStyles}>Motorcycle Name *</label>
          <input
            type="text"
            name="name"
            value={vehicle.name}
            onChange={handleChange}
            style={inputStyles}
            placeholder="e.g., Honda-Dream"
            required
          />
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Brand *</label>
          <input
            type="text"
            name="brand"
            value={vehicle.brand}
            onChange={handleChange}
            style={inputStyles}
            placeholder="e.g., Haojue, Honda, lucky-Plus"
            required
          />
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Price (₦) *</label>
          <input
            type="number"
            name="price"
            value={vehicle.price}
            onChange={handleChange}
            style={inputStyles}
            placeholder="e.g., 933500"
            required
          />
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Description *</label>
          <textarea
            name="description"
            value={vehicle.description}
            onChange={handleChange}
            style={textareaStyles}
            placeholder="Describe the motorcycle features, condition, etc."
            required
          />
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Main Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            style={fileInputStyles}
            required
          />
          {mainImagePreview && (
            <img src={mainImagePreview} alt="Preview" style={previewImageStyles} />
          )}
        </div>

        <div style={inputGroupStyles}>
          <label style={labelStyles}>Colors & Availability</label>
          {vehicle.colors.map((color, index) => (
            <div key={index} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
              <input
                type="text"
                placeholder="Color name (e.g., Red)"
                value={color.name}
                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                style={{ ...inputStyles, marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="color"
                  value={color.code}
                  onChange={(e) => handleColorChange(index, 'code', e.target.value)}
                  style={colorInputStyles}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={color.quantity}
                  onChange={(e) => handleColorChange(index, 'quantity', parseInt(e.target.value))}
                  style={{ ...inputStyles, width: '100px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#666' }}>Color Image (optional):</label>
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
                  style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#d93025', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Remove Color
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addColor} style={addColorButtonStyles}>
            + Add Another Color
          </button>
        </div>

        <button type="submit" style={submitButtonStyles}>
          Add Motorcycle to Catalog
        </button>
      </form>
    </div>
  );
}

export default AddVehicleForm;