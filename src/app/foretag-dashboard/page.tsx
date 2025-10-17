'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function ForetagDashboard() {
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
    projects: { projektnamn: string };
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [companyEmail, setCompanyEmail] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loadDashboardData = useCallback(async (email: string) => {
    try {
      // Get bookmarked projects from localStorage
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
      const { data: contactsData } = await supabase
        .from('contact_messages')
        .select(`
          id,
          company_name,
          message,
          created_at,
          projects!inner (projektnamn)
        `)
        .eq('company_email', email)
        .order('created_at', { ascending: false })
        .limit(10);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setContacts(contactsData as any || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    // In a real implementation, this would use company authentication
    // For MVP, we'll use localStorage to store company email from contact forms
    const storedEmail = localStorage.getItem('company_email');
    if (storedEmail) {
      setCompanyEmail(storedEmail);
      loadDashboardData(storedEmail);
    } else {
      setLoading(false);
    }
  }, [loadDashboardData]);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;

    localStorage.setItem('company_email', email);
    setCompanyEmail(email);
    loadDashboardData(email);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Laddar...</p>
      </div>
    );
  }

  if (!companyEmail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Företagsdashboard</h1>
          <p className="text-gray-600 mb-6">
            Ange din företagsepost för att se dina kontakter och sparade projekt.
          </p>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="foretagsnamn@exempel.se"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 mb-4"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Visa dashboard
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            Observera: Detta är en förenklad version. Fullständig autentisering kommer i nästa version.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Företagsdashboard</h1>
          <p className="text-gray-600">{companyEmail}</p>
          <button
            onClick={() => {
              localStorage.removeItem('company_email');
              setCompanyEmail('');
            }}
            className="text-sm text-gray-600 hover:text-gray-900 mt-2"
          >
            Logga ut
          </button>
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
                    <h3 className="font-semibold text-gray-900">{contact.projects?.projektnamn}</h3>
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
