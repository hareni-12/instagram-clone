import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';

export default function Posts({ darkMode }) {
  const [posts, setPosts] = useState([]);

  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ig_saved_posts') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(r => r.json())
      .then(data => {
        const initialized = data.map(post => {
          let count = 0;
          if (post.likes !== undefined && post.likes !== null) {
            count = typeof post.likes === 'string' ? parseInt(post.likes.replace(/,/g, '')) : post.likes;
          }
          return { ...post, isLiked: false, displayLikes: isNaN(count) ? 0 : count };
        });
        setPosts(initialized);
      })
      .catch(err => console.log('Error loading posts:', err));
  }, []);

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const liked = !post.isLiked;
      return { ...post, isLiked: liked, displayLikes: liked ? post.displayLikes + 1 : post.displayLikes - 1 };
    }));
  };

  const handleSave = (postId) => {
    setSavedIds(prev => {
      const updated = prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId];
      localStorage.setItem('ig_saved_posts', JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Only these 3 variables needed now — used for dynamic values only
  const cardBg = darkMode ? '#000000' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#262626';
  const subColor = '#8e8e8e';
  const borderColor = darkMode ? '#262626' : '#dbdbdb';

  return (
    <div className="container py-3">
      {posts.length > 0 ? (
        <div className="d-flex flex-column align-items-center">
          {posts.map(post => {
            const isSaved = savedIds.includes(post.id);
            return (
              <div
                key={post.id}
                className="insta-card-post"
                style={{
                  maxWidth: '470px',
                  width: '100%',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  overflow: 'hidden',
                  marginBottom: '24px',
                  background: cardBg,   // ✅ Controlled by darkMode prop
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', background: cardBg }}>
                  <div style={{
                    padding: '2px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
                    marginRight: '10px'
                  }}>
                    <img
                      src={post.profilePic}
                      alt={post.username}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: `2px solid ${cardBg}`,
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div style={{ background: 'transparent' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: textColor }}>{post.username}</div>
                    {post.location && <div style={{ fontSize: '12px', color: subColor }}>{post.location}</div>}
                  </div>
                  <i className="bi bi-three-dots ms-auto" style={{ cursor: 'pointer', color: textColor }} />
                </div>

                {/* Image */}
                <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: cardBg }}>
                  <img
                    src={post.postImage}
                    alt="post"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 16px 6px',
                  fontSize: '24px',
                  background: cardBg   // ✅ No more white patch here
                }}>
                  <div style={{ display: 'flex', gap: '16px', background: 'transparent' }}>
                    <i
                      className={post.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}
                      style={{ cursor: 'pointer', color: post.isLiked ? '#ed4956' : textColor, transition: 'transform 0.2s' }}
                      onClick={() => handleLike(post.id)}
                    />
                    <i className="bi bi-chat" style={{ cursor: 'pointer', color: textColor }} />
                    <i className="bi bi-send" style={{ cursor: 'pointer', color: textColor }} />
                  </div>
                  <i
                    className={isSaved ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
                    style={{ cursor: 'pointer', color: textColor, transition: 'transform 0.2s' }}
                    onClick={() => handleSave(post.id)}
                    title={isSaved ? 'Remove from saved' : 'Save post'}
                  />
                </div>

                {/* Likes + Caption */}
                <div style={{ padding: '0 16px 10px', fontSize: '14px', background: cardBg }}>
                  <div style={{ fontWeight: '600', color: textColor, marginBottom: '4px' }}>
                    {post.displayLikes.toLocaleString()} likes
                  </div>
                  <div style={{ color: textColor, background: 'transparent' }}>
                    <span style={{ fontWeight: '600', marginRight: '6px', color: textColor }}>{post.username}</span>
                    {post.caption}
                  </div>
                  <div style={{ fontSize: '10px', color: subColor, textTransform: 'uppercase', marginTop: '4px' }}>
                    {post.timestamp}
                  </div>
                </div>

                {/* Comment Section */}
                <div style={{ padding: '0 16px 12px', background: cardBg }}>
                  <CommentSection postId={post.id} darkMode={darkMode} />
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-5" style={{ fontSize: '14px', color: subColor }}>
          Loading Feed Posts…<br />
          <span style={{ fontSize: '12px' }}>(Check if json-server port 3000 is running)</span>
        </div>
      )}
    </div>
  );
} 