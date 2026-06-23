import React from 'react';
import { useNavigate } from 'react-router-dom';
import instaText from './assets/instaText.png';
import { useAuth } from './AuthContext';

export default function Sidebar({ activePage, setActivePage }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar-container">
      <img className="logo-text" src={instaText} alt="Instagram" />

      <div className="sidebar-links-group">
        <div className={`Sidebar-item ${activePage === 'home' ? 'active-sidebar-item' : ''}`} onClick={() => setActivePage('home')}>
          <i className="bi bi-house-door"></i>
          <span className="sidebar-label">Home</span>
        </div>
        <div className={`Sidebar-item ${activePage === 'search' ? 'active-sidebar-item' : ''}`} onClick={() => setActivePage('search')}>
          <i className="bi bi-search"></i>
          <span className="sidebar-label">Search</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-compass"></i>
          <span className="sidebar-label">Explore</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-collection-play-fill"></i>
          <span className="sidebar-label">Reels</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-chat-left-text"></i>
          <span className="sidebar-label">Messages</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-heart"></i>
          <span className="sidebar-label">Notifications</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-plus-square"></i>
          <span className="sidebar-label">Create</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-person-circle profile-avatar-icon"></i>
          <span className="sidebar-label">Profile</span>
        </div>
      </div>

      <div className="sidebar-bottom-group">
        <div className="Sidebar-item">
          <i className="bi bi-threads"></i>
          <span className="sidebar-label">Threads</span>
        </div>
        <div className="Sidebar-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <i className="bi bi-box-arrow-left"></i>
          <span className="sidebar-label">Logout</span>
        </div>
        <div className="Sidebar-item">
          <i className="bi bi-list"></i>
          <span className="sidebar-label">More</span>
        </div>
      </div>
    </div>
  );
}