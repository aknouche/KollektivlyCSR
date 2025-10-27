'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function ForetagDashboard() {
  const router = useRouter();
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Array<{
    id: string;
    projektnamn: string;
    kort_beskrivning: string;
    csr_kategori: string;
    stad: string;
    budget: string;
    organizations: { organization_name: string };
  }>>([]);
  const [contacts, setContacts] = useState<Array<{
    id: string;
    company_name: string;
    message: string;
    created_at: string;
    project_id: string;
    projects?: {
      projektnamn: string;
      organizations?: {
        organization_name: string;
      };
    };
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<{
    id: string;
    company_name: string;
    email: string;
    contact_person: string;
    assessment_completed: boolean;
  } | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/foretag-logga-in');
        return;
      }

      // Get company data
      const { data: companyResults } = await supabase
        .from('companies')
        .select('id, company_name, email, contact_person, assessment_completed')
        .eq('auth_user_id', session.user.id)
        .limit(1);

      const companyData = companyResults && companyResults.length > 0 ? companyResults[0] : null;

      if (!companyData) {
        router.push('/foretag-logga-in');
        return;
      }

      setCompany(companyData);

      // Get bookmarked projects from localStorage (keep this for now)
      const bookmarksStr = localStorage.getItem('bookmarked_projects');
      if (bookmarksStr) {
        const bookmarkIds = JSON.parse(bookmarksStr);
        if (bookmarkIds.length > 0) {
          const { data: projects } = await supabase
            .from('projects')
            .select(`
              id,
              projektnamn,
              kort_beskrivning,
              csr_kategori,
              stad,
              budget,
              organizations!inner (organization_name)
            `)
            .in('id', bookmarkIds)
            .eq('status', 'PUBLISHED');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setBookmarkedProjects(projects as any || []);
        }
      }

      // Get contact messages sent by this company
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_messages')
        .select(`
          id,
          company_name,
          message,
          created_at,
          project_id,
          projects!inner(projektnamn, organizations!inner(organization_name))
        `)
        .eq('company_id', companyData.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (contactsError) {
        console.error('Error fetching contacts:', contactsError);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setContacts(contactsData as any || []);

    } catch (error) {
      console.error('Auth error:', error);
      router.push('/foretag-logga-in');
    } finally {
      setLoading(false);
    }
  }, [supabase, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Laddar...</p>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Företagsdashboard</h1>
            <p className="text-gray-600">{company.company_name}</p>
            <p className="text-sm text-gray-500">{company.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            Logga ut
          </button>
        </div>

        {/* Goals Assessment Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📊 {company.assessment_completed ? 'Din målbedömning' : 'Få personlig rådgivning för era samhällsmål'}
              </h3>
              <p className="text-gray-700 mb-4">
                {company.assessment_completed
                  ? 'Se era resultat och rekommendationer, eller gör om bedömningen för att uppdatera.'
                  : 'Besvara några snabba frågor om era mål med samhällsengagemang och få skräddarsydda rekommendationer från våra experter.'
                }
              </p>
              <div className="flex gap-3">
                <Link
                  href={company.assessment_completed ? "/foretag-matningsfragor/resultat" : "/foretag-matningsfragor"}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  {company.assessment_completed ? 'Se resultat' : 'Starta bedömning (2 min)'}
                </Link>
                {company.assessment_completed && (
                  <Link
                    href="/foretag-matningsfragor"
                    className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
                  >
                    Gör om bedömning
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Sparade projekt</p>
            <p className="text-2xl font-bold text-gray-900">{bookmarkedProjects.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Skickade kontakter</p>
            <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <Link
              href="/matcha-projekt"
              className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors mb-2"
            >
              🎯 Matcha projekt
            </Link>
            <Link
              href="/alla-projekt"
              className="block text-center bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Hitta fler projekt
            </Link>
          </div>
        </div>

        {/* Bookmarked Projects */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sparade projekt</h2>
          {bookmarkedProjects.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {bookmarkedProjects.map((project) => (
                <div key={project.id} className="p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-1">{project.projektnamn}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.kort_beskrivning}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{project.organizations?.organization_name}</span>
                    <span>{project.stad}</span>
                    <span className="font-medium">{parseInt(project.budget).toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-4">Inga sparade projekt ännu</p>
              <Link
                href="/alla-projekt"
                className="inline-block text-gray-900 font-medium hover:underline"
              >
                Bläddra bland projekt →
              </Link>
            </div>
          )}
        </div>

        {/* Contact History */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kontakthistorik</h2>
          {contacts.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {contact.projects?.projektnamn || 'Kontakt skickad'}
                      </h3>
                      {contact.projects?.organizations?.organization_name && (
                        <p className="text-xs text-gray-500">
                          {contact.projects.organizations.organization_name}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString('sv-SE')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{contact.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">Inga kontakter ännu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
