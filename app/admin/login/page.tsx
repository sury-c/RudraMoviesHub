
'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || 'Login failed. Please try again.'
        );
        return;
      }

      window.location.href = '/admin';

    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080b0a] text-white flex items-center justify-center p-5">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-lime-400/30 bg-[#111613] p-7 shadow-2xl"
      >
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-lime-400">
          RUDRA MOVIES
        </p>

        <h1 className="mb-2 text-3xl font-bold">
          Admin Login
        </h1>

        <p className="mb-7 text-sm text-gray-400">
          Sign in to manage your movie catalog.
        </p>

        <label className="mb-2 block text-sm">
          Username
        </label>

        <input
          type="text"
          className="mb-5 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-lime-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label className="mb-2 block text-sm">
          Password
        </label>

        <input
          type="password"
          className="mb-5 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-lime-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <p
            role="alert"
            className="mb-4 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-lime-400 p-3 font-bold text-black disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

      </form>
    </main>
  );
}
