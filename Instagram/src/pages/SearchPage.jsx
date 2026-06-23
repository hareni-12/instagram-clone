import React, { useState, useMemo } from 'react';
import { mockAccounts, mockTags, mockAudio, mockPlaces } from '../searchMockData';

const TABS = ['Top', 'Accounts', 'Audio', 'Tags', 'Places'];

function Avatar({ size = 44 }) {
  return <i className="bi bi-person-circle" style={{ fontSize: size, color: '#8e8e8e' }} />;
}

export default function SearchPage({ darkMode }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Top');
  const [loading, setLoading] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');

  const border = darkMode ? '#262626' : '#dbdbdb';
  const inputBg = darkMode ? '#121212' : '#efefef';
  const textColor = darkMode ? '#fff' : '#262626';
  const subColor = '#8e8e8e';

  const triggerSearch = (val) => {
    if (val === prevQuery) return;
    setLoading(true);
    setPrevQuery(val);
    setTimeout(() => setLoading(false), 400);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    triggerSearch(e.target.value);
  };

  const q = query.toLowerCase();

  const filtered = useMemo(() => ({
    accounts: mockAccounts.filter(a => a.username.toLowerCase().includes(q) || a.fullName.toLowerCase().includes(q)),
    tags: mockTags.filter(t => t.tag.toLowerCase().includes(q)),
    audio: mockAudio.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)),
    places: mockPlaces.filter(p => p.name.toLowerCase().includes(q) || p.region.toLowerCase().includes(q)),
  }), [q]);

  const topResults = [
    ...filtered.accounts.slice(0, 2).map(a => ({ ...a, _type: 'account' })),
    ...filtered.tags.slice(0, 2).map(t => ({ ...t, _type: 'tag' })),
    ...filtered.audio.slice(0, 1).map(a => ({ ...a, _type: 'audio' })),
    ...filtered.places.slice(0, 1).map(p => ({ ...p, _type: 'place' })),
  ];

  const totalResults = topResults.length + filtered.accounts.length + filtered.tags.length + filtered.audio.length + filtered.places.length;
  const isEmpty = query && !loading && totalResults === 0;

  const tabCount = {
    Top: topResults.length,
    Accounts: filtered.accounts.length,
    Audio: filtered.audio.length,
    Tags: filtered.tags.length,
    Places: filtered.places.length,
  };

  const rowStyle = { display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 0', borderBottom: `1px solid ${border}` };
  const metaStyle = { fontSize: '12px', color: subColor };
  const nameStyle = { fontSize: '14px', fontWeight: '600', color: textColor };

  function AccountRow({ item }) {
    return (
      <div style={rowStyle}>
        <Avatar size={44} />
        <div style={{ flex: 1 }}>
          <div style={nameStyle}>{item.username}</div>
          <div style={metaStyle}>{item.fullName} · {item.followers} followers</div>
        </div>
        <button style={{ background: '#0095f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Follow</button>
      </div>
    );
  }

  function TagRow({ item }) {
    return (
      <div style={rowStyle}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-hash" style={{ fontSize: '22px', color: textColor }} />
        </div>
        <div>
          <div style={nameStyle}>{item.tag}</div>
          <div style={metaStyle}>{item.posts} posts</div>
        </div>
      </div>
    );
  }

  function AudioRow({ item }) {
    return (
      <div style={rowStyle}>
        <div style={{ width: 44, height: 44, borderRadius: '8px', background: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-music-note" style={{ fontSize: '20px', color: '#fff' }} />
        </div>
        <div>
          <div style={nameStyle}>{item.title}</div>
          <div style={metaStyle}>{item.artist} · {item.uses}</div>
        </div>
      </div>
    );
  }

  function PlaceRow({ item }) {
    return (
      <div style={rowStyle}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-geo-alt" style={{ fontSize: '22px', color: '#ed4956' }} />
        </div>
        <div>
          <div style={nameStyle}>{item.name}</div>
          <div style={metaStyle}>{item.region} · {item.posts} posts</div>
        </div>
      </div>
    );
  }

  function renderTabContent() {
    if (loading) return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: subColor }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
        <div style={{ fontSize: '14px' }}>Searching...</div>
      </div>
    );

    if (isEmpty) return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: subColor }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔎</div>
        <div style={{ fontWeight: '600', fontSize: '18px', color: textColor, marginBottom: '6px' }}>No results found</div>
        <div style={{ fontSize: '14px' }}>Try searching for something else.</div>
      </div>
    );

    if (!query) return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: subColor }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
        <div style={{ fontWeight: '600', fontSize: '16px', color: textColor }}>Search Instagram</div>
        <div style={{ fontSize: '14px', marginTop: '6px' }}>Find accounts, audio, tags and places</div>
      </div>
    );

    switch (activeTab) {
      case 'Top':
        return topResults.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px', color: subColor, fontSize: '14px' }}>No top results.</div>
          : topResults.map(item => {
              if (item._type === 'account') return <AccountRow key={item.id} item={item} />;
              if (item._type === 'tag') return <TagRow key={item.id} item={item} />;
              if (item._type === 'audio') return <AudioRow key={item.id} item={item} />;
              if (item._type === 'place') return <PlaceRow key={item.id} item={item} />;
              return null;
            });
      case 'Accounts':
        return filtered.accounts.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px', color: subColor, fontSize: '14px' }}>No accounts found.</div>
          : filtered.accounts.map(a => <AccountRow key={a.id} item={a} />);
      case 'Tags':
        return filtered.tags.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px', color: subColor, fontSize: '14px' }}>No tags found.</div>
          : filtered.tags.map(t => <TagRow key={t.id} item={t} />);
      case 'Audio':
        return filtered.audio.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px', color: subColor, fontSize: '14px' }}>No audio found.</div>
          : filtered.audio.map(a => <AudioRow key={a.id} item={a} />);
      case 'Places':
        return filtered.places.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px', color: subColor, fontSize: '14px' }}>No places found.</div>
          : filtered.places.map(p => <PlaceRow key={p.id} item={p} />);
      default: return null;
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px 0' }}>
      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <i className="bi bi-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: subColor, fontSize: '16px' }} />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInput}
          style={{ width: '100%', padding: '10px 14px 10px 42px', fontSize: '16px', background: inputBg, border: 'none', borderRadius: '10px', color: textColor, outline: 'none', boxSizing: 'border-box' }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setPrevQuery(''); }} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: subColor, cursor: 'pointer', fontSize: '18px', padding: 0 }}>✕</button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${border}`, marginBottom: '8px' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ flex: 1, background: 'none', border: 'none', padding: '12px 4px', fontSize: '13px', fontWeight: '600', color: activeTab === tab ? textColor : subColor, borderBottom: activeTab === tab ? `2px solid ${textColor}` : '2px solid transparent', cursor: 'pointer', transition: 'color 0.2s' }}
          >
            {tab}
            {query && tabCount[tab] > 0 && (
              <span style={{ marginLeft: '4px', fontSize: '11px', color: '#0095f6' }}>({tabCount[tab]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>{renderTabContent()}</div>
    </div>
  );
}