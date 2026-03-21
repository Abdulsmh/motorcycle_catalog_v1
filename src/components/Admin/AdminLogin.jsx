import React, { useState } from 'react';

const loginContainerStyles = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const titleStyles = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#333'
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px'
};

const buttonStyles = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const errorStyles = {
  color: '#d93025',
  textAlign: 'center',
  marginTop: '10px'
};

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple password protection (you can change this)
    if (password === 'ama1234') {
      onLogin(true);
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={loginContainerStyles}>
      <h2 style={titleStyles}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyles}
        />
        <button type="submit" style={buttonStyles}>
          Login
        </button>
        {error && <p style={errorStyles}>{error}</p>}
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Default password: ama1234
      </p>
    </div>
  );
}

export default AdminLogin;