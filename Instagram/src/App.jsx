import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Suggestions from './Suggestions';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './AuthContext';

function MainLayout({ darkMode, setDarkMode }) {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className={darkMode ? 'dark-mode app-main-container' : 'light-mode app-main-container'}>
      <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <div className="container-fluid">
        <div className="main-insta-layout">
          <div className="sidebar-wrapper">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="middle-divider-line"></div>
          </div>

          <div className="feed-wrapper">
            {activePage === 'home' && <Feed />}
            {activePage === 'search' && <SearchPage darkMode={darkMode} />}
          </div>

          {activePage === 'home' && (
            <div className="suggestions-wrapper">
              <Suggestions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth(); 

  return (
    <Routes>
      <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
      <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
      
      <Route
        path="/*"
        element={
          user ? (
            <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;