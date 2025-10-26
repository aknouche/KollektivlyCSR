'use client';

// Force dynamic rendering to prevent build-time errors with Supabase client
export const dynamic = 'force-dynamic';

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
  const [projects, setProjects] = useState<Array<{
    id: string;
    projektnamn: string;
    status: string;
    view_count: number;
    contact_count: number;
  }>>([]);
  const [contacts, setContacts] = useState<Array<{
    id: string;
    company_name: string;
    contact_person: string;
    company_email: string;
    phone_number?: string;
    message: string;
    created_at: string;
  }>>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalViews: 0
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/forening-logga-in');
        return;
      }


      // Get organization data
      const { data: orgResults } = await supabase
        .from('organizations')
        .select('*')
        .eq('email', session.user.email)
        .limit(1);

      const org = orgResults && orgResults.length > 0 ? orgResults[0] : null;

      setOrganization(org);

      if (org) {
        // Get projects
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .eq('organization_id', org.id)
          .order('created_at', { ascending: false });

        setProjects(projectsData || []);

        // Get contacts
        const { data: contactsData } = await supabase
          .from('contact_messages')
          .select('*')
          .eq('organization_id', org.id)
          .order('created_at', { ascending: false })
          .limit(10);

        setContacts(contactsData || []);

        // Calculate stats
        const published = projectsData?.filter(p => p.status === 'PUBLISHED').length || 0;
        const unread = contactsData?.filter(c => c.status === 'SENT').length || 0;
        const totalViews = projectsData?.reduce((sum, p) => sum + (p.view_count || 0), 0) || 0;

        setStats({
          totalProjects: projectsData?.length || 0,
          publishedProjects: published,
          totalContacts: contactsData?.length || 0,
          unreadContacts: unread,
          totalViews
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/forening-logga-in');
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Projekt</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            <p className="text-xs text-gray-500 mt-1">{stats.publishedProjects} publicerade</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Kontakter</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
            {stats.unreadContacts > 0 && (
              <p className="text-xs text-red-600 mt-1">{stats.unreadContacts} nya</p>
            )}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Visningar</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <Link
              href="/lagg-till-projekt"
              className="block text-center bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Lägg till projekt
            </Link>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Dina projekt</h2>
          {projects.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Projektnamn</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Visningar</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Kontakter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{project.projektnamn}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                          project.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{project.view_count || 0}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{project.contact_count || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-4">Inga projekt ännu</p>
              <Link
                href="/lagg-till-projekt"
                className="inline-block bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Skapa ditt första projekt
              </Link>
            </div>
          )}
        </div>

        {/* Contacts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Senaste kontakter</h2>
          {contacts.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{contact.company_name}</p>
                      <p className="text-sm text-gray-600">{contact.contact_person}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString('sv-SE')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{contact.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{contact.company_email}</span>
                    {contact.phone_number && <span>{contact.phone_number}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Inga kontakter ännu</p>
            </div>
          )}
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
