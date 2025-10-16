'use client';

import { useState } from 'react';

interface MatchingFormProps {
  onSubmit?: (data: MatchingFormData) => void;
}

export interface MatchingFormData {
  sdgs: string[];
  geography: string[];
  budgetMin: number;
  budgetMax: number;
  categories: string[];
}

export default function MatchingForm({ onSubmit }: MatchingFormProps) {
  const [formData, setFormData] = useState<MatchingFormData>({
    sdgs: [],
    geography: [],
    budgetMin: 10000,
    budgetMax: 500000,
    categories: []
  });

  const [submitted, setSubmitted] = useState(false);

  // FN:s globala mål (SDGs)
  const sdgOptions = [
    { id: '3', name: 'Hälsa och välbefinnande', icon: '🏥' },
    { id: '4', name: 'God utbildning', icon: '📚' },
    { id: '5', name: 'Jämställdhet', icon: '⚖️' },
    { id: '8', name: 'Anständiga arbetsvillkor', icon: '💼' },
    { id: '10', name: 'Minskad ojämlikhet', icon: '🤝' },
    { id: '11', name: 'Hållbara städer', icon: '🏙️' },
    { id: '13', name: 'Bekämpa klimatförändringen', icon: '🌍' },
    { id: '16', name: 'Fredliga samhällen', icon: '☮️' }
  ];

  // Swedish regions
  const geographyOptions = [
    'Stockholm',
    'Göteborg',
    'Malmö',
    'Uppsala',
    'Västerås',
    'Örebro',
    'Linköping',
    'Helsingborg',
    'Hela Sverige'
  ];

  // Project categories
  const categoryOptions = [
    { id: 'miljo', name: 'Miljö', icon: '🌱' },
    { id: 'ungdom', name: 'Ungdom', icon: '🎓' },
    { id: 'inkludering', name: 'Inkludering', icon: '🤗' }
  ];

  const handleSDGToggle = (sdgId: string) => {
    setFormData(prev => ({
      ...prev,
      sdgs: prev.sdgs.includes(sdgId)
        ? prev.sdgs.filter(id => id !== sdgId)
        : [...prev.sdgs, sdgId]
    }));
  };

  const handleGeographyToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      geography: prev.geography.includes(location)
        ? prev.geography.filter(loc => loc !== location)
        : [...prev.geography, location]
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-6">✨</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Perfekt! Vi har matchat dina preferenser
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Vi har hittat projekt som passar era hållbarhetsmål. Registrera er för att se matchningar och kontakta föreningar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/registrera"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Registrera företag (gratis) →
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            ← Ändra preferenser
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* SDGs Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Vilka FN-mål vill ni stötta? 🎯
          </h3>
          <p className="text-gray-600 mb-4">Välj ett eller flera globala hållbarhetsmål</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sdgOptions.map(sdg => (
              <button
                key={sdg.id}
                type="button"
                onClick={() => handleSDGToggle(sdg.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.sdgs.includes(sdg.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{sdg.icon}</div>
                <div className="text-sm font-medium text-gray-900">{sdg.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Vilka typer av projekt? 🎨
          </h3>
          <p className="text-gray-600 mb-4">Välj projektområden som intresserar er</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {categoryOptions.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.categories.includes(category.id)
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-900">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Geography Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Var vill ni göra skillnad? 📍
          </h3>
          <p className="text-gray-600 mb-4">Välj geografiska områden</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {geographyOptions.map(location => (
              <button
                key={location}
                type="button"
                onClick={() => handleGeographyToggle(location)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.geography.includes(location)
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{location}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Budget Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Budget per projekt? 💰
          </h3>
          <p className="text-gray-600 mb-4">
            Nuvarande intervall: {formData.budgetMin.toLocaleString('sv-SE')} - {formData.budgetMax.toLocaleString('sv-SE')} kr
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum: {formData.budgetMin.toLocaleString('sv-SE')} kr
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={formData.budgetMin}
                onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum: {formData.budgetMax.toLocaleString('sv-SE')} kr
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={formData.budgetMax}
                onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={formData.sdgs.length === 0 && formData.geography.length === 0 && formData.categories.length === 0}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
          >
            Hitta matchande projekt →
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            Välj minst ett alternativ för att fortsätta
          </p>
        </div>
      </div>
    </form>
  );
}
