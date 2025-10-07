'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function Dashboard() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<{
    id: string;
    organization_name: string;
    status: string;
    email: string;
    contact_person?: string;
    phone?: string;
    org_number?: string;
    city?: string;
    organization_number?: string;
  } | null>(null);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/logga-in');
        return;
      }


      // Get organization data
      const { data: org } = await supabase
        .from('organizations')
        .select('*')
        .eq('email', session.user.email)
        .single();

      setOrganization(org);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/logga-in');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-600">Laddar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                {organization?.organization_name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
            >
              Logga ut
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">
            Välkommen, {organization?.organization_name}! 🎉
          </h2>
          <p className="text-blue-100">
            Du är nu inloggad på Kollektivly
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/lagg-till-projekt"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Lägg till projekt
                </h3>
                <p className="text-sm text-gray-600">
                  Skapa ett nytt CSR-projekt och publicera det på plattformen
                </p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 opacity-50 cursor-not-allowed">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Mina projekt
                </h3>
                <p className="text-sm text-gray-600">
                  Visa och hantera dina publicerade projekt (kommer snart)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Organisationsinformation
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organisationsnamn
              </label>
              <p className="text-gray-900">{organization?.organization_name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-postadress
              </label>
              <p className="text-gray-900">{organization?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontaktperson
              </label>
              <p className="text-gray-900">{organization?.contact_person}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stad
              </label>
              <p className="text-gray-900">{organization?.city}</p>
            </div>

            {organization?.organization_number && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organisationsnummer
                </label>
                <p className="text-gray-900">{organization.organization_number}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                organization?.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                organization?.status === 'VERIFIED' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {organization?.status === 'APPROVED' ? 'Godkänd' :
                 organization?.status === 'VERIFIED' ? 'Verifierad' :
                 organization?.status === 'PENDING' ? 'Väntar på verifiering' :
                 organization?.status}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
