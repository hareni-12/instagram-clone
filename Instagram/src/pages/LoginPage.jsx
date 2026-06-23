import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const MOCK_USERS = [
  { username: 'your_username', password: 'password123', fullName: 'Your Name' },
  { username: 'testuser', password: 'test123', fullName: 'Test User' },
];

export default function LoginPage({ darkMode }) {
  const { login } = useAuth(); // useEffect-ஐ தூக்கியாச்சு, logout தேவையில்லை
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required.';
    if (!form.password.trim()) e.password = 'Password is required.';
    else if (form.password.trim().length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setAuthError('');
    
    setTimeout(() => {
      const inputUsername = form.username.trim();
      const inputPassword = form.password.trim();

      const found = MOCK_USERS.find(
        u => u.username === inputUsername && u.password === inputPassword
      );
      
      if (found) {
        login({ username: found.username, fullName: found.fullName });
        navigate('/'); // இப்போ இது பெர்ஃபெக்ட்டா ஃபீட் பேஜுக்கு கூட்டிட்டு போகும்!
      } else {
        setAuthError('Incorrect username or password.');
      }
      setLoading(false);
    }, 800);
  };

  const bg = darkMode ? '#000' : '#fafafa';
  const cardBg = darkMode ? '#000' : '#fff';
  const border = darkMode ? '#262626' : '#dbdbdb';
  const textColor = darkMode ? '#fff' : '#262626';

  return (
    <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '350px' }}>
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '4px', padding: '40px 40px 28px', marginBottom: '10px' }}>
          <h1 style={{ fontFamily: 'Billabong, cursive, sans-serif', fontSize: '48px', textAlign: 'center', color: textColor, marginBottom: '28px', letterSpacing: '-1px' }}>Instagram</h1>

          {authError && (
            <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', padding: '10px 12px', marginBottom: '14px', fontSize: '13px', color: '#856404', textAlign: 'center' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '6px' }}>
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={e => { setForm({ ...form, username: e.target.value }); setErrors({ ...errors, username: '' }); }}
                style={{ width: '100%', padding: '9px 10px', fontSize: '13px', background: darkMode ? '#121212' : '#fafafa', border: `1px solid ${errors.username ? '#ed4956' : border}`, borderRadius: '4px', color: textColor, outline: 'none', boxSizing: 'border-box' }}
              />
              {errors.username && <p style={{ color: '#ed4956', fontSize: '11px', marginTop: '4px' }}>{errors.username}</p>}
            </div>

            <div style={{ marginBottom: '14px' }}>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                style={{ width: '100%', padding: '9px 10px', fontSize: '13px', background: darkMode ? '#121212' : '#fafafa', border: `1px solid ${errors.password ? '#ed4956' : border}`, borderRadius: '4px', color: textColor, outline: 'none', boxSizing: 'border-box' }}
              />
              {errors.password && <p style={{ color: '#ed4956', fontSize: '11px', marginTop: '4px' }}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '8px', background: loading ? '#b2dffc' : '#0095f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '18px 0', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: border }} />
            <span style={{ color: '#8e8e8e', fontSize: '13px', fontWeight: '600' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: border }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#8e8e8e', marginTop: '8px' }}>
            <strong style={{ color: textColor }}>Demo:</strong> username: <code>your_username</code> / pw: <code>password123</code>
          </p>
        </div>

        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '4px', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: textColor }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: '#0095f6', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}