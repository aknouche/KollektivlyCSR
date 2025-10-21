'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function ForetagLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  // If ?tab=register, show register tab; otherwise show login tab
  const [isLogin, setIsLogin] = useState(tab !== 'register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    company_name: '',
    email: '',
    contact_person: '',
    phone_number: '',
    city: '',
    password: '',
    confirmPassword: '',
    gdpr_consent: false
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
        // Check if this is a company user
        const { data: companyResults } = await supabase
          .from('companies')
          .select('id')
          .eq('auth_user_id', data.user.id)
          .limit(1);

        const company = companyResults && companyResults.length > 0 ? companyResults[0] : null;

        if (!company) {
          setError('Detta konto är inte registrerat som ett företag');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        router.push('/foretag-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ett fel uppstod vid inloggning');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Lösenorden matchar inte');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      setError('Lösenordet måste vara minst 8 tecken');
      setLoading(false);
      return;
    }

    if (!registerData.gdpr_consent) {
      setError('Du måste godkänna hantering av personuppgifter');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registrering misslyckades');
        setLoading(false);
        return;
      }

      setSuccess('Registrering lyckades! Kontrollera din e-post för att verifiera ditt konto.');
      setRegisterData({
        company_name: '',
        email: '',
        contact_person: '',
        phone_number: '',
        city: '',
        password: '',
        confirmPassword: '',
        gdpr_consent: false
      });
      setLoading(false);

      // Switch to login view after 3 seconds
      setTimeout(() => {
        setIsLogin(true);
        setSuccess(null);
      }, 3000);

    } catch (err) {
      console.error('Registration error:', err);
      setError('Ett oväntat fel uppstod');
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
              setSuccess(null);
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
              setSuccess(null);
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
          {isLogin ? 'Välkommen tillbaka' : 'Skapa företagskonto'}
        </h1>
        <p className="text-gray-600 mb-6">
          {isLogin
            ? 'Logga in på ditt företagskonto'
            : 'Registrera ditt företag för att börja stödja samhällsprojekt'}
        </p>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">{success}</p>
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
                placeholder="foretagsnamn@exempel.se"
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
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Företagsnamn *
              </label>
              <input
                type="text"
                required
                value={registerData.company_name}
                onChange={(e) => setRegisterData({ ...registerData, company_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-postadress *
              </label>
              <input
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontaktperson *
              </label>
              <input
                type="text"
                required
                value={registerData.contact_person}
                onChange={(e) => setRegisterData({ ...registerData, contact_person: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefonnummer
              </label>
              <input
                type="tel"
                value={registerData.phone_number}
                onChange={(e) => setRegisterData({ ...registerData, phone_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stad
              </label>
              <input
                type="text"
                value={registerData.city}
                onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lösenord *
              </label>
              <input
                type="password"
                required
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minst 8 tecken"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bekräfta lösenord *
              </label>
              <input
                type="password"
                required
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="gdpr"
                checked={registerData.gdpr_consent}
                onChange={(e) => setRegisterData({ ...registerData, gdpr_consent: e.target.checked })}
                className="mt-1"
              />
              <label htmlFor="gdpr" className="text-sm text-gray-600">
                Jag godkänner hantering av personuppgifter enligt{' '}
                <Link href="/integritetspolicy" className="text-blue-600 hover:underline">
                  integritetspolicyn
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrerar...' : 'Skapa konto'}
            </button>
          </form>
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
