'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

export default function AssessmentResults() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<{
    company_name: string;
    recommended_services: string[];
    sponsorship_goals: string[];
    current_csr_maturity: string;
  } | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadResults() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/foretag-logga-in');
        return;
      }

      const { data: companyResults } = await supabase
        .from('companies')
        .select('company_name, recommended_services, sponsorship_goals, current_csr_maturity, assessment_completed')
        .eq('auth_user_id', session.user.id)
        .limit(1);

      const companyData = companyResults && companyResults.length > 0 ? companyResults[0] : null;

      if (!companyData || !companyData.assessment_completed) {
        router.push('/foretag-matningsfragor');
        return;
      }

      setCompany(companyData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading results:', error);
      router.push('/foretag-dashboard');
    }
  }

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

  const recommendsCSRD = company.recommended_services.includes('CSRD consultation') || company.recommended_services.includes('Both');
  const recommendsMarketing = company.recommended_services.includes('Marketing strategy') || company.recommended_services.includes('Both');
  const recommendsBoth = company.recommended_services.includes('Both');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Tack, {company.company_name}!
          </h1>
          <p className="text-xl text-gray-600">
            Vi har analyserat era svar och här är våra rekommendationer
          </p>
        </div>

        {/* Assessment Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Er profil</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Primära mål:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {company.sponsorship_goals.slice(0, 3).map((goal, i) => (
                  <li key={i}>• {goal}</li>
                ))}
                {company.sponsorship_goals.length > 3 && (
                  <li className="text-gray-500">+ {company.sponsorship_goals.length - 3} till</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Nuläge:</h3>
              <p className="text-sm text-gray-600">
                {company.current_csr_maturity === 'beginner' && '🌱 Nybörjare - precis påbörjat resan'}
                {company.current_csr_maturity === 'intermediate' && '🌿 Mellanstadiet - har några initiativ'}
                {company.current_csr_maturity === 'advanced' && '🌳 Avancerad - etablerat CSR-program'}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Våra rekommendationer för er</h2>

          {/* CSRD Consultation */}
          {recommendsCSRD && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">📋 CSRD Compliance Rådgivning</h3>
                  <p className="text-blue-100 text-lg">
                    Baserat på era svar rekommenderar vi ett samtal med vår CSRD-expert
                  </p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Vad vi hjälper er med:</h4>
                <ul className="space-y-2 text-blue-50">
                  <li>✓ Förstå CSRD-kraven för ert företag</li>
                  <li>✓ Sätta upp rätt rapporteringsprocess</li>
                  <li>✓ Koppla samhällsprojekt till hållbarhetsmål</li>
                  <li>✓ Automatisk ESG-rapportering via Kollektivly</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">Gratis 30-minuters konsultation</p>
                  <p className="text-2xl font-bold">0 kr</p>
                </div>
                <a
                  href="https://calendly.com/kollektivly/csrd-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Boka samtal →
                </a>
              </div>
            </div>
          )}

          {/* Marketing Strategy */}
          {recommendsMarketing && (
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">📢 Marknadsföring & Branding Strategi</h3>
                  <p className="text-green-100 text-lg">
                    Låt oss hjälpa er maximera synligheten av ert samhällsengagemang
                  </p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Vad vi hjälper er med:</h4>
                <ul className="space-y-2 text-green-50">
                  <li>✓ Content-strategi för sociala medier</li>
                  <li>✓ Storytelling kring samhällsprojekt</li>
                  <li>✓ Employer branding genom CSR</li>
                  <li>✓ Mätbara resultat och KPI:er</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-100">Gratis 30-minuters konsultation</p>
                  <p className="text-2xl font-bold">0 kr</p>
                </div>
                <a
                  href="https://calendly.com/kollektivly/marketing-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
                >
                  Boka samtal →
                </a>
              </div>
            </div>
          )}

          {/* Combined Consultation */}
          {recommendsBoth && (
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">🎯 Kombinerad Strategi (Rekommenderas)</h3>
                  <p className="text-purple-100 text-lg">
                    Ni får mest värde av att prata med båda våra experter
                  </p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">En helhetslösning för:</h4>
                <ul className="space-y-2 text-purple-50">
                  <li>✓ CSRD-compliance + synlighet i samma paket</li>
                  <li>✓ Rapportering som blir content för marknadsföring</li>
                  <li>✓ Maximera värde från varje samhällsinsats</li>
                  <li>✓ Koordinerad strategi från start</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-100">Gratis 60-minuters konsultation (båda experter)</p>
                  <p className="text-2xl font-bold">0 kr</p>
                </div>
                <a
                  href="https://calendly.com/kollektivly/combined-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
                >
                  Boka samtal →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nästa steg</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Boka er kostnadsfria konsultation</h3>
                <p className="text-gray-600">Välj det alternativ som passar er bäst ovan</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Utforska projekt på plattformen</h3>
                <p className="text-gray-600">Börja titta på projekt som passar era mål</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Starta ert första samarbete</h3>
                <p className="text-gray-600">Med vår hjälp väljer ni rätt projekt och sätter upp rätt process</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/foretag-dashboard"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Tillbaka till dashboard
          </Link>
          <Link
            href="/alla-projekt"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Utforska projekt
          </Link>
        </div>
      </div>
    </div>
  );
}
