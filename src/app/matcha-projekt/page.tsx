'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MatchaProjekt() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    categories: [] as string[],
    unGoals: [] as string[],
    budget: '',
    location: '',
    preferences: {
      localFocus: false,
      impactReporting: true,
      quickStart: false
    }
  });

  const categories = ['Miljö', 'Ungdom', 'Inkludering'];
  const unGoals = [
    'Mål 1: Ingen fattigdom',
    'Mål 2: Ingen hunger',
    'Mål 3: Hälsa och välbefinnande',
    'Mål 4: God utbildning',
    'Mål 5: Jämställdhet',
    'Mål 7: Hållbar energi',
    'Mål 8: Anständiga arbetsvillkor',
    'Mål 10: Minskad ojämlikhet',
    'Mål 11: Hållbara städer',
    'Mål 12: Hållbar konsumtion',
    'Mål 13: Klimatåtgärder',
    'Mål 15: Ekosystem på land'
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      unGoals: prev.unGoals.includes(goal)
        ? prev.unGoals.filter(g => g !== goal)
        : [...prev.unGoals, goal]
    }));
  };

  const handleSubmit = () => {
    // Store preferences for matching
    localStorage.setItem('matching_preferences', JSON.stringify(formData));
    localStorage.setItem('company_email', formData.companyEmail);

    // Redirect to results with matching
    router.push('/matchade-projekt');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Steg {step} av 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Step 1: Company Info */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Företagsinformation</h2>
              <p className="text-gray-600 mb-6">Berätta lite om ert företag</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Företagsnamn *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Ex. Acme AB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-post *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.companyEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyEmail: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="kontakt@acme.se"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ungefärlig budget (SEK)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Ex. 50000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Föredragen plats (valfritt)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Ex. Stockholm"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.companyName || !formData.companyEmail}
                  className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Nästa →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Categories & Goals */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Välj fokusområden</h2>
              <p className="text-gray-600 mb-6">Vilka områden vill ni stötta?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Kategorier
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-4 py-2 rounded-md border-2 font-medium transition-colors ${
                          formData.categories.includes(category)
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    FN:s globala mål
                  </label>
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md p-3 space-y-2">
                    {unGoals.map(goal => (
                      <label key={goal} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.unGoals.includes(goal)}
                          onChange={() => handleGoalToggle(goal)}
                          className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                        />
                        <span className="text-sm text-gray-700">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  ← Tillbaka
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Nästa →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferenser</h2>
              <p className="text-gray-600 mb-6">Finjustera er matchning</p>

              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    checked={formData.preferences.localFocus}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, localFocus: e.target.checked }
                    }))}
                    className="mt-1 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Lokalt fokus</p>
                    <p className="text-sm text-gray-600">Prioritera projekt i er närhet</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    checked={formData.preferences.impactReporting}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, impactReporting: e.target.checked }
                    }))}
                    className="mt-1 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <div>
                    <p className="font-medium text-gray-900">AI-verifierad rapportering</p>
                    <p className="text-sm text-gray-600">Få automatiska impact-rapporter</p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-md">
                  <input
                    type="checkbox"
                    checked={formData.preferences.quickStart}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, quickStart: e.target.checked }
                    }))}
                    className="mt-1 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Snabbstart</p>
                    <p className="text-sm text-gray-600">Projekt som kan starta omgående</p>
                  </div>
                </label>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-900">
                  Baserat på era val kommer vi matcha er med de mest relevanta projekten
                </p>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  ← Tillbaka
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Hitta matchande projekt →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
