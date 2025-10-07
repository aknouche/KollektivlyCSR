'use client';

import { useState } from 'react';
import Link from 'next/link';
import CallbackHandler from './callback-handler';

export default function LoggaIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Inloggning misslyckades');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Kolla din inkorg! 📧
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Vi har skickat en inloggningslänk till <strong>{email}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Nästa steg:</h3>
              <ol className="text-left text-gray-700 space-y-2 text-sm">
                <li>1. Öppna din inkorg</li>
                <li>2. Klicka på länken i mejlet</li>
                <li>3. Du loggas in automatiskt</li>
              </ol>
            </div>
            <p className="text-sm text-gray-500">
              Länken är giltig i 60 minuter
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 text-gray-600 hover:text-gray-900 transition"
            >
              Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CallbackHandler />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <span className="text-gray-900">Logga in</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Logga in
          </h1>
          <p className="text-lg text-gray-600">
            Ange din e-postadress så skickar vi en inloggningslänk
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-postadress
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="din@organisation.se"
              disabled={loading}
            />
            <p className="mt-2 text-sm text-gray-500">
              Vi skickar en säker inloggningslänk till din e-post
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Skickar länk...' : 'Skicka inloggningslänk'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lösenordsfri inloggning
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Vi använder magiska länkar istället för lösenord. Det är säkrare och enklare!
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Inget lösenord att komma ihåg
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Säkrare än traditionella lösenord
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Logga in med ett klick från din inkorg
            </li>
          </ul>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Har du inget konto?{' '}
            <Link href="/registrera" className="text-blue-600 hover:underline font-semibold">
              Registrera din organisation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
