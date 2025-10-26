'use client';

// Force dynamic rendering to prevent build-time errors with Supabase client
export const dynamic = 'force-dynamic';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

function ProjectForm() {
  const router = useRouter();
  const [organization, setOrganization] = useState<{ id: string; organization_name: string; status: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'MILJÖ',
    location: '',
    budget: '',
    goal: '',
    un_goals: [] as string[],
    image_url: '',
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/logga-in');
        return;
      }

      // Get organization
      const { data: orgResults } = await supabase
        .from('organizations')
        .select('*')
        .eq('email', session.user.email)
        .limit(1);

      const org = orgResults && orgResults.length > 0 ? orgResults[0] : null;

      if (!org) {
        router.push('/registrera');
        return;
      }

      if (org.status !== 'APPROVED') {
        setError('Din organisation är inte godkänd än. Vänta på godkännande från admin.');
        setLoading(false);
        return;
      }

      setOrganization(org);
      setLoading(false);
    }

    checkAuth();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!organization) {
      setError('Organisation hittades inte');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organization_id: organization.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte skapa projekt');
      }

      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUNGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      un_goals: prev.un_goals.includes(goal)
        ? prev.un_goals.filter(g => g !== goal)
        : [...prev.un_goals, goal]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600">Laddar...</p>
        </div>
      </div>
    );
  }

  if (error && !organization) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Väntar på godkännande</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Tillbaka till Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projekt skapat! ✅</h2>
          <p className="text-gray-600 mb-6">
            Ditt projekt har skickats för granskning. Du får ett mejl när det är godkänt.
          </p>
          <p className="text-sm text-gray-500">Omdirigerar till dashboard...</p>
        </div>
      </div>
    );
  }

  const categories = ['MILJÖ', 'UTBILDNING', 'HÄLSA', 'JÄMLIKHET', 'INTEGRATION', 'SPORT', 'KULTUR', 'INNOVATION'];
  const unGoals = [
    'Ingen fattigdom',
    'Ingen hunger',
    'God hälsa och välbefinnande',
    'God utbildning för alla',
    'Jämställdhet',
    'Rent vatten och sanitet',
    'Hållbar energi för alla',
    'Anständiga arbetsvillkor',
    'Hållbar industri',
    'Minskad ojämlikhet',
    'Hållbara städer',
    'Hållbar konsumtion',
    'Bekämpa klimatförändringarna',
    'Hav och marina resurser',
    'Ekosystem och biologisk mångfald',
    'Fredliga och inkluderande samhällen',
    'Genomförande och partnerskap',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <span>›</span>
            <span className="text-gray-900">Lägg till Projekt</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skapa nytt projekt
          </h1>
          <p className="text-lg text-gray-600">
            Fyll i information om ditt CSR-projekt. Det kommer granskas innan publicering.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Projekttitel *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              minLength={5}
              maxLength={100}
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="T.ex. Återplantering av lokal skog"
            />
            <p className={`mt-1 text-sm ${formData.title.length < 5 && formData.title.length > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
              {formData.title.length}/100 tecken {formData.title.length < 5 && formData.title.length > 0 && `(minst 5 tecken krävs)`}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Beskrivning *
            </label>
            <textarea
              id="description"
              name="description"
              required
              minLength={50}
              maxLength={5000}
              rows={8}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Beskriv projektets syfte, aktiviteter, mål och förväntad påverkan..."
            />
            <p className={`mt-1 text-sm ${formData.description.length < 50 ? 'text-orange-600' : 'text-gray-500'}`}>
              {formData.description.length}/5000 tecken {formData.description.length < 50 && `(minst 50 tecken krävs)`}
            </p>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Plats *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              maxLength={100}
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="T.ex. Stockholm, Sverige"
            />
          </div>

          {/* Budget */}
          <div className="mb-6">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget (SEK) *
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              required
              min="0"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="T.ex. 50000"
            />
          </div>

          {/* Goal */}
          <div className="mb-6">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Projektmål *
            </label>
            <textarea
              id="goal"
              name="goal"
              required
              minLength={10}
              maxLength={500}
              rows={3}
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="T.ex. Plantera 1000 träd och engagera 100 volontärer"
            />
            <p className={`mt-1 text-sm ${formData.goal.length < 10 && formData.goal.length > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
              {formData.goal.length}/500 tecken {formData.goal.length < 10 && formData.goal.length > 0 && `(minst 10 tecken krävs)`}
            </p>
          </div>

          {/* UN Goals */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              FN:s globala mål *
            </label>
            <p className="text-sm text-gray-500 mb-3">Välj minst ett mål som projektet bidrar till</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {unGoals.map((goal, index) => (
                <label key={goal} className="flex items-start space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={formData.un_goals.includes(goal)}
                    onChange={() => handleUNGoalToggle(goal)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{index + 1}. {goal}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">Valt: {formData.un_goals.length} mål</p>
          </div>

          {/* Image URL (optional for MVP) */}
          <div className="mb-6">
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
              Bild-URL (valfritt)
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/project-image.jpg"
            />
            <p className="mt-1 text-sm text-gray-500">Bilduppladdning kommer i nästa version</p>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ← Avbryt
            </Link>
            <button
              type="submit"
              disabled={submitting || formData.un_goals.length === 0}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {submitting ? 'Skapar projekt...' : 'Skapa projekt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LaggTillProjekt() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600">Laddar...</p>
        </div>
      </div>
    }>
      <ProjectForm />
    </Suspense>
  );
}
