'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForetagLoggaIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple email storage - in real version would use proper auth
    localStorage.setItem('company_email', email);
    localStorage.setItem('company_logged_in', 'true');

    setTimeout(() => {
      router.push('/foretag-dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Företagsinloggning</h1>
        <p className="text-gray-600 mb-6">
          Logga in för att se dina projekt och kontakter
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Företagsepost
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="foretagsnamn@exempel.se"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300"
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Ny på Kollektivly?</p>
          <Link
            href="/alla-projekt"
            className="block text-center bg-white text-gray-900 border-2 border-gray-300 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Bläddra bland projekt
          </Link>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-900">
            <strong>PoC-version:</strong> Detta är förenklad inloggning. Fullständig version kommer ha säker autentisering via Supabase Auth.
          </p>
        </div>
      </div>
    </div>
  );
}
