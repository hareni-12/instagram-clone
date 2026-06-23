import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function SignupPage({ darkMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', fullName: '', username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.username.trim()) e.username = 'Username is required.';
    else if (form.username.length < 3) e.username = 'Username must be at least 3 characters.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setTimeout(() => {
      login({ username: form.username, fullName: form.fullName, email: form.email });
      navigate('/');
    }, 800);
  };

  const bg = darkMode ? '#000' : '#fafafa';
  const cardBg = darkMode ? '#000' : '#fff';
  const border = darkMode ? '#262626' : '#dbdbdb';
  const textColor = darkMode ? '#fff' : '#262626';

  const inputStyle = (field) => ({
    width: '100%', padding: '9px 10px', fontSize: '13px',
    background: darkMode ? '#121212' : '#fafafa',
    border: `1px solid ${errors[field] ? '#ed4956' : border}`,
    borderRadius: '4px', color: textColor, outline: 'none', boxSizing: 'border-box'
  });

  return (
    <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '350px' }}>
        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '4px', padding: '40px 40px 28px', marginBottom: '10px' }}>
          <h1 style={{ fontFamily: 'Billabong, cursive, sans-serif', fontSize: '48px', textAlign: 'center', color: textColor, marginBottom: '8px', letterSpacing: '-1px' }}>Instagram</h1>
          <p style={{ textAlign: 'center', color: '#8e8e8e', fontSize: '17px', fontWeight: '600', marginBottom: '20px', lineHeight: '1.4' }}>Sign up to see photos and videos from your friends.</p>

          <form onSubmit={handleSubmit} noValidate>
            {[
              { key: 'email', placeholder: 'Email', type: 'email' },
              { key: 'fullName', placeholder: 'Full Name', type: 'text' },
              { key: 'username', placeholder: 'Username', type: 'text' },
              { key: 'password', placeholder: 'Password', type: 'password' },
            ].map(({ key, placeholder, type }) => (
              <div key={key} style={{ marginBottom: '6px' }}>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
                  style={inputStyle(key)}
                />
                {errors[key] && <p style={{ color: '#ed4956', fontSize: '11px', marginTop: '4px' }}>{errors[key]}</p>}
              </div>
            ))}

            <p style={{ color: '#8e8e8e', fontSize: '12px', textAlign: 'center', margin: '14px 0' }}>
              By signing up, you agree to our <strong>Terms</strong>, <strong>Privacy Policy</strong> and <strong>Cookies Policy</strong>.
            </p>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '8px', background: loading ? '#b2dffc' : '#0095f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
        </div>

        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '4px', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: textColor }}>Have an account? </span>
          <Link to="/login" style={{ color: '#0095f6', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}