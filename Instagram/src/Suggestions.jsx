import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function Suggestions() {
  const { user } = useAuth();

  const [followingState, setFollowingState] = useState({
    user1: false, user2: false, user3: false, user4: false, user5: false
  });

  const handleFollowToggle = (userKey) => {
    setFollowingState(prev => ({ ...prev, [userKey]: !prev[userKey] }));
  };

  return (
    <div className="suggestions-sidebar">
      {/* Current Active Account Profile Header */}
      <div className="current-user-item">
        <i className="bi bi-person-circle main-avatar-icon"></i>
        <div className="user-meta">
          <span className="current-username">{user?.username || 'your_username'}</span>
          <span className="current-fullname">{user?.fullName || 'Your Name'}</span>
        </div>
        <button className="action-link-btn text-blue">Switch</button>
      </div>

      <div className="suggestions-header-row">
        <span className="section-title-gray">Suggestions For You</span>
        <button className="action-link-btn text-dark">See All</button>
      </div>

      {[
        { key: 'user1', username: 'pratiiii_!!!', subtitle: 'Suggested for you' },
        { key: 'user2', username: 'sarahh_14', subtitle: 'Followed by dafaqjesh' },
        { key: 'user3', username: 'toxii_srii', subtitle: 'Followed by mikasaa...' },
        { key: 'user4', username: 'koushi_thecomet', subtitle: 'Suggested for you' },
        { key: 'user5', username: 'kennath_sameull', subtitle: 'Followed by gersiii and 7 more' },
      ].map(({ key, username, subtitle }) => (
        <div key={key} className="suggestion-user-item">
          <i className="bi bi-person-circle list-avatar-icon"></i>
          <div className="user-meta">
            <span className="suggestion-username">{username}</span>
            <span className="suggestion-subtitle">{subtitle}</span>
          </div>
          <button
            onClick={() => handleFollowToggle(key)}
            className={`action-link-btn ${followingState[key] ? 'text-gray' : 'text-blue'}`}
          >
            {followingState[key] ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}

      <div className="suggestions-footer">
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p style={{ marginTop: '15px' }}>© 2026 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}

export default Suggestions;