'use client';

import { useState, type FormEvent } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Login failed. Please try again.'); return; }
      window.location.href = '/admin';
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return <main className="login-shell"><form onSubmit={handleLogin} className="login-card">
    <a className="brand" href="/"><span className="brand-mark">R</span><span>RUDRA <b>MOVIES</b></span></a>
    <div className="eyebrow gold-text" style={{ marginTop: 34 }}>PRIVATE ACCESS / 01</div>
    <h1>Welcome <em style={{ color: 'var(--gold)', fontFamily: 'Georgia,serif', fontWeight: 400 }}>back.</em></h1>
    <p>Sign in to manage your catalog, artwork and authorized destinations.</p>
    <label htmlFor="username">Username</label>
    <input id="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" required />
    <label htmlFor="password">Password</label>
    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
    {error && <p className="login-error" role="alert">{error}</p>}
    <button className="gold-button" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Enter dashboard ↗'}</button>
  </form></main>;
}
