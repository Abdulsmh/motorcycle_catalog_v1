import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CatalogPage from './pages/CatalogPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { initializeDatabase } from './utils/storage';

function App() {
  const [language, setLanguage] = useState('en');
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    // Initialize Firebase with sample data if empty
    const init = async () => {
      try {
        await initializeDatabase();
        setDbReady(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setDbReady(true); // Still show app even if init fails
      }
    };
    init();
  }, []);

  if (!dbReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏍️</div>
          <div style={{ fontSize: '18px', color: '#065F46' }}>Loading Motorcycle Catalog...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB' }}>
        <Header language={language} setLanguage={setLanguage} />
        <main style={{ flex: 1, padding: '40px 0' }}>
          <Routes>
            <Route path="/" element={<CatalogPage language={language} />} />
            <Route path="/catalog" element={<CatalogPage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="/contact" element={<ContactPage language={language} />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  );
}

export default App;