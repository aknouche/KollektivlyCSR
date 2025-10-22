'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';

type AssessmentData = {
  sponsorshipGoals: string[];
  currentMaturity: string;
  annualBudget: string;
  employeeCount: string;
  primaryChallenges: string[];
  interestedInCSRD: string;
  marketingPriority: string;
};

export default function ForetagMatningsfragor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [company, setCompany] = useState<{
    id: string;
    company_name: string;
    assessment_completed?: boolean;
  } | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [formData, setFormData] = useState<AssessmentData>({
    sponsorshipGoals: [],
    currentMaturity: '',
    annualBudget: '',
    employeeCount: '',
    primaryChallenges: [],
    interestedInCSRD: '',
    marketingPriority: ''
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/foretag-logga-in');
        return;
      }

      const { data: companyResults } = await supabase
        .from('companies')
        .select('id, company_name, assessment_completed')
        .eq('auth_user_id', session.user.id)
        .limit(1);

      const companyData = companyResults && companyResults.length > 0 ? companyResults[0] : null;

      if (!companyData) {
        router.push('/foretag-logga-in');
        return;
      }

      // Allow retaking the assessment even if completed
      setCompany(companyData);
      setLoading(false);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/foretag-logga-in');
    }
  }

  const toggleArrayValue = (field: 'sponsorshipGoals' | 'primaryChallenges', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Determine recommended services based on answers
      const recommendations: string[] = [];

      // CSRD recommendation logic
      if (
        formData.interestedInCSRD === 'yes' ||
        formData.interestedInCSRD === 'not_sure' ||
        formData.sponsorshipGoals.includes('CSRD compliance') ||
        formData.sponsorshipGoals.includes('ESG reporting')
      ) {
        recommendations.push('CSRD consultation');
      }

      // Marketing/branding recommendation logic
      if (
        formData.marketingPriority === 'high' ||
        formData.marketingPriority === 'medium' ||
        formData.sponsorshipGoals.includes('Brand awareness') ||
        formData.sponsorshipGoals.includes('Social media content') ||
        formData.primaryChallenges.includes('Kommunicera våra insatser externt')
      ) {
        recommendations.push('Marketing strategy');
      }

      // If both, add "Both"
      if (recommendations.includes('CSRD consultation') && recommendations.includes('Marketing strategy')) {
        recommendations.push('Both');
      }

      // Update company with assessment data
      const { error } = await supabase
        .from('companies')
        .update({
          sponsorship_goals: formData.sponsorshipGoals,
          current_csr_maturity: formData.currentMaturity,
          assessment_completed: true,
          assessment_completed_at: new Date().toISOString(),
          recommended_services: recommendations,
          employee_count: formData.employeeCount
        })
        .eq('id', company!.id);

      if (error) {
        console.error('Error saving assessment:', error);
        alert('Ett fel uppstod vid sparande. Försök igen.');
        setSubmitting(false);
        return;
      }

      // Redirect to results page
      router.push('/foretag-matningsfragor/resultat');

    } catch (error) {
      console.error('Submit error:', error);
      alert('Ett oväntat fel uppstod');
      setSubmitting(false);
    }
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

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.sponsorshipGoals.length > 0;
      case 2:
        return formData.currentMaturity !== '';
      case 3:
        return formData.employeeCount !== '' && formData.annualBudget !== '';
      case 4:
        return formData.primaryChallenges.length > 0;
      case 5:
        return formData.interestedInCSRD !== '' && formData.marketingPriority !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/foretag-dashboard" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Tillbaka till dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mål & Behov - Bedömning</h1>
          <p className="text-gray-600">Hjälp oss förstå era mål så vi kan ge bästa möjliga rekommendationer</p>
          {company?.assessment_completed && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 Du gör om bedömningen - dina nya svar kommer att uppdatera dina rekommendationer
              </p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Steg {step} av {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Step 1: Sponsorship Goals */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Vad vill ni uppnå med ert samhällsengagemang?
              </h2>
              <p className="text-gray-600 mb-6">Välj alla som passar (minst 1)</p>

              <div className="space-y-3">
                {[
                  'CSRD compliance',
                  'ESG reporting',
                  'Brand awareness',
                  'Employee engagement',
                  'Social media content',
                  'Local community impact',
                  'UN Sustainable Development Goals',
                  'Annat'
                ].map((goal) => (
                  <label
                    key={goal}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.sponsorshipGoals.includes(goal)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.sponsorshipGoals.includes(goal)}
                      onChange={() => toggleArrayValue('sponsorshipGoals', goal)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Current Maturity */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Hur skulle ni beskriva ert nuvarande CSR-arbete?
              </h2>
              <p className="text-gray-600 mb-6">Välj det alternativ som passar bäst</p>

              <div className="space-y-3">
                {[
                  { value: 'beginner', label: 'Nybörjare', desc: 'Vi har precis börjat eller planerar att börja' },
                  { value: 'intermediate', label: 'Mellanstadiet', desc: 'Vi har några initiativ men vill göra mer' },
                  { value: 'advanced', label: 'Avancerad', desc: 'Vi har ett etablerat CSR-program' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.currentMaturity === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="maturity"
                      value={option.value}
                      checked={formData.currentMaturity === option.value}
                      onChange={(e) => setFormData({ ...formData, currentMaturity: e.target.value })}
                      className="mt-1 w-5 h-5 text-blue-600"
                    />
                    <div className="ml-3">
                      <div className="text-gray-900 font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Company Size & Budget */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Några snabba frågor om ert företag
              </h2>
              <p className="text-gray-600 mb-6">Detta hjälper oss ge rätt rekommendationer</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Antal anställda
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Välj...</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Årlig budget för samhällsengagemang (ungefär)
                  </label>
                  <select
                    value={formData.annualBudget}
                    onChange={(e) => setFormData({ ...formData, annualBudget: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Välj...</option>
                    <option value="0-50k">0-50 000 SEK</option>
                    <option value="50k-200k">50 000-200 000 SEK</option>
                    <option value="200k-500k">200 000-500 000 SEK</option>
                    <option value="500k-1M">500 000-1 000 000 SEK</option>
                    <option value="1M+">1 000 000+ SEK</option>
                    <option value="not_sure">Vet inte ännu</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Primary Challenges */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Vilka är era största utmaningar?
              </h2>
              <p className="text-gray-600 mb-6">Välj alla som passar (minst 1)</p>

              <div className="space-y-3">
                {[
                  'Hitta rätt projekt att stödja',
                  'Mäta och rapportera impact',
                  'CSRD-compliance',
                  'Kommunicera våra insatser externt',
                  'Engagera medarbetare',
                  'Begränsad budget',
                  'Begränsad tid/resurser'
                ].map((challenge) => (
                  <label
                    key={challenge}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.primaryChallenges.includes(challenge)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.primaryChallenges.includes(challenge)}
                      onChange={() => toggleArrayValue('primaryChallenges', challenge)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-gray-900 font-medium">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Specific Interests */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Sista frågorna!
              </h2>
              <p className="text-gray-600 mb-6">Hjälp oss matcha er med rätt expert</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Är ni intresserade av CSRD-compliance rådgivning?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'yes', label: 'Ja, definitivt' },
                      { value: 'not_sure', label: 'Kanske, vill veta mer' },
                      { value: 'no', label: 'Nej, inte just nu' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.interestedInCSRD === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="csrd"
                          value={option.value}
                          checked={formData.interestedInCSRD === option.value}
                          onChange={(e) => setFormData({ ...formData, interestedInCSRD: e.target.value })}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="ml-3 text-gray-900">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hur viktig är marknadsföring/branding i ert samhällsengagemang?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'high', label: 'Mycket viktig - vi vill maximera synlighet' },
                      { value: 'medium', label: 'Medel - balans mellan impact och synlighet' },
                      { value: 'low', label: 'Mindre viktig - fokus på impact' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          formData.marketingPriority === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="marketing"
                          value={option.value}
                          checked={formData.marketingPriority === option.value}
                          onChange={(e) => setFormData({ ...formData, marketingPriority: e.target.value })}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="ml-3 text-gray-900">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                ← Föregående
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Nästa →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Skickar...' : 'Se resultat →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
