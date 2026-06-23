import React, { useState, useEffect } from 'react';

export default function CommentSection({ postId, darkMode }) {
  const storageKey = `ig_comments_${postId}`;

  const [comments, setComments] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const addComment = () => {
    if (!input.trim()) return;
    const newComment = { id: Date.now(), text: input.trim(), user: 'your_username', time: 'Just now' };
    setComments(prev => [...prev, newComment]);
    setInput('');
  };

  const deleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const border = darkMode ? '#262626' : '#dbdbdb';
  const textColor = darkMode ? '#fff' : '#262626';
  const subColor = '#8e8e8e';

  return (
    <div style={{ borderTop: `1px solid ${border}`, paddingTop: '8px' }}>
      {/* Toggle comments */}
      {comments.length > 0 && (
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: subColor, fontSize: '13px', cursor: 'pointer', padding: '4px 0', marginBottom: '4px' }}>
          {open ? 'Hide comments' : `View all ${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
        </button>
      )}

      {/* Comment list */}
      {open && comments.map(c => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
          <i className="bi bi-person-circle" style={{ fontSize: '24px', color: subColor, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: '600', fontSize: '13px', color: textColor }}>{c.user} </span>
            <span style={{ fontSize: '13px', color: textColor }}>{c.text}</span>
            <div style={{ fontSize: '11px', color: subColor, marginTop: '2px' }}>{c.time}</div>
          </div>
          <button onClick={() => deleteComment(c.id)} style={{ background: 'none', border: 'none', color: subColor, cursor: 'pointer', fontSize: '13px', padding: '0 4px', flexShrink: 0 }} title="Delete">✕</button>
        </div>
      ))}

      {/* Input row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
        <i className="bi bi-person-circle" style={{ fontSize: '28px', color: subColor, flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Add a comment…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addComment()}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '13px', color: textColor, padding: '6px 0' }}
        />
        {input.trim() && (
          <button onClick={addComment} style={{ background: 'none', border: 'none', color: '#0095f6', fontWeight: '600', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Post</button>
        )}
      </div>
    </div>
  );
}