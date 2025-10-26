'use client';

// Force dynamic rendering to prevent build-time errors with Supabase client
export const dynamic = 'force-dynamic';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  // If ?tab=register, show register tab; otherwise show login tab
  const [isLogin, setIsLogin] = useState(tab !== 'register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });

      if (signInError) {
        setError('Felaktig e-post eller lösenord');
        setLoading(false);
        return;
      }

      if (data.user) {
        // Check if this is a förening user
        const { data: orgResults } = await supabase
          .from('organizations')
          .select('id')
          .eq('email', data.user.email)
          .limit(1);

        const org = orgResults && orgResults.length > 0 ? orgResults[0] : null;

        if (!org) {
          setError('Detta konto är inte registrerat som en förening');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ett fel uppstod vid inloggning');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full">
        {/* Toggle */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Logga in
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              !isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Registrera
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Välkommen tillbaka' : 'Registrera förening'}
        </h1>
        <p className="text-gray-600 mb-6">
          {isLogin
            ? 'Logga in för att hantera era projekt'
            : 'För fullständig registrering, använd formuläret nedan'}
        </p>

        {/* Error Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-postadress *
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="forening@exempel.se"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lösenord *
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loggar in...' : 'Logga in'}
            </button>
          </form>
        ) : (
          /* Register redirect */
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">
              Registrering av föreningar kräver ytterligare information för verifiering.
            </p>
            <Link
              href="/registrera-forening"
              className="inline-block w-full bg-gray-900 text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Gå till registreringsformulär
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ForeningLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Laddar...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
