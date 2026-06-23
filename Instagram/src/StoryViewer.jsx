import React, { useState, useEffect, useCallback } from 'react';

export default function StoryViewer({ stories, startIndex, onClose, onMarkViewed }) {
  const [current, setCurrent] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  const DURATION = 5000;

  const goNext = useCallback(() => {
    onMarkViewed(stories[current].id);
    if (current < stories.length - 1) {
      setCurrent(c => c + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [current, stories, onClose, onMarkViewed]);

  const goPrev = () => {
    if (current > 0) { setCurrent(c => c - 1); setProgress(0); }
  };

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + (100 / (DURATION / 100));
      });
    }, 100);
    const timeout = setTimeout(goNext, DURATION);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [current, goNext]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goNext, onClose]);

  const story = stories[current];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Story Card */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '100vh', maxHeight: '700px', background: '#111', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Progress bars */}
        <div style={{ display: 'flex', gap: '4px', padding: '12px 12px 0', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          {stories.map((_, i) => (
            <div key={i} style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#fff', borderRadius: '2px', width: i < current ? '100%' : i === current ? `${progress}%` : '0%', transition: i === current ? 'none' : undefined }} />
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ position: 'absolute', top: '24px', left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', padding: '8px 14px' }}>
          <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', marginRight: '10px' }}>
            <img src={story.profilePic} alt={story.username} style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #111', objectFit: 'cover' }} />
          </div>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{story.username}</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginLeft: '8px' }}>Just now</span>
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* Story Image */}
        <img src={story.profilePic} alt="story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

        {/* Nav areas */}
        <button onClick={goPrev} style={{ position: 'absolute', left: 0, top: 0, width: '40%', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 5 }} aria-label="Previous story" />
        <button onClick={goNext} style={{ position: 'absolute', right: 0, top: 0, width: '40%', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 5 }} aria-label="Next story" />
      </div>

      {/* Nav arrows outside card (desktop) */}
      {current > 0 && (
        <button onClick={goPrev} style={{ position: 'absolute', left: 'calc(50% - 230px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
      )}
      {current < stories.length - 1 && (
        <button onClick={goNext} style={{ position: 'absolute', right: 'calc(50% - 230px)', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      )}
    </div>
  );
}