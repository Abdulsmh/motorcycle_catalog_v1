import React, { useState } from 'react';

const containerStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '40px 20px'
};

const titleStyles = {
  fontSize: '32px',
  color: '#333',
  marginBottom: '20px',
  textAlign: 'center'
};

const formStyles = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const inputGroupStyles = {
  marginBottom: '20px'
};

const labelStyles = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#555'
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px'
};

const textareaStyles = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px',
  minHeight: '120px'
};

const buttonStyles = {
  backgroundColor: '#1a73e8',
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%'
};

const successStyles = {
  backgroundColor: '#e6f4ea',
  color: '#1e7e34',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '20px',
  textAlign: 'center'
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to an API
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Contact Us</h1>
      <div style={formStyles}>
        {submitted && (
          <div style={successStyles}>
            ✅ Message sent successfully! We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyles}>
            <label style={labelStyles}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyles}
              required
            />
          </div>
          
          <div style={inputGroupStyles}>
            <label style={labelStyles}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyles}
              required
            />
          </div>
          
          <div style={inputGroupStyles}>
            <label style={labelStyles}>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={textareaStyles}
              required
            />
          </div>
          
          <button type="submit" style={buttonStyles}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;