'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StodProjekt() {
  const params = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    grantAmount: '50000',
    serviceTier: 'standard',
    companyName: '',
    companyEmail: '',
    contactPerson: '',
    agreedToTerms: false
  });

  const serviceTiers = {
    basic: { name: 'Basic', fee: 4, description: 'Enkel escrow + format checks' },
    standard: { name: 'Standard', fee: 7, description: 'AI-verifiering + ESG rapporter' },
    enhanced: { name: 'Enhanced', fee: 10, description: '+ Legitimitetskontroller + support' }
  };

  const calculateFee = () => {
    const amount = parseInt(formData.grantAmount) || 0;
    const tier = serviceTiers[formData.serviceTier as keyof typeof serviceTiers];
    return Math.round(amount * (tier.fee / 100));
  };

  const calculateTotal = () => {
    return parseInt(formData.grantAmount) + calculateFee();
  };

  const handleSubmit = () => {
    // Mock submission - in real app would create Stripe payment intent
    router.push(`/betalning-bekraftelse?projectId=${params.id}&amount=${formData.grantAmount}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
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
          {/* Step 1: Amount & Tier */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Välj bidragsbelopp</h2>
              <p className="text-gray-600 mb-6">Hur mycket vill ni bidra till projektet?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidragsbelopp (SEK) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10000"
                    value={formData.grantAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, grantAmount: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <p className="mt-1 text-sm text-gray-500">Minimum 10,000 SEK</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Välj servicenivå *
                  </label>
                  <div className="space-y-3">
                    {Object.entries(serviceTiers).map(([key, tier]) => (
                      <label
                        key={key}
                        className={`flex items-start space-x-3 p-4 border-2 rounded-md cursor-pointer transition-colors ${
                          formData.serviceTier === key
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceTier"
                          value={key}
                          checked={formData.serviceTier === key}
                          onChange={(e) => setFormData(prev => ({ ...prev, serviceTier: e.target.value }))}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900">{tier.name}</p>
                            <p className="font-bold text-gray-900">{tier.fee}%</p>
                          </div>
                          <p className="text-sm text-gray-600">{tier.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bidrag till förening</span>
                    <span className="font-medium">{parseInt(formData.grantAmount).toLocaleString('sv-SE')} kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Serviceavgift ({serviceTiers[formData.serviceTier as keyof typeof serviceTiers].fee}%)</span>
                    <span className="font-medium">{calculateFee().toLocaleString('sv-SE')} kr</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-semibold text-gray-900">Totalt belopp</span>
                    <span className="font-bold text-gray-900 text-lg">{calculateTotal().toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-900">
                  <p className="font-semibold mb-1">Hur det funkar:</p>
                  <p>Bidraget läggs i escrow (säker förvaring). Föreningen får pengarna först när de lämnat in en godkänd rapport.</p>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Nästa →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Company Info */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Företagsinformation</h2>
              <p className="text-gray-600 mb-6">För kvitto och ESG-rapportering</p>

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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kontaktperson *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                  />
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
                  disabled={!formData.companyName || !formData.companyEmail || !formData.contactPerson}
                  className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Nästa →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Granska och betala</h2>
              <p className="text-gray-600 mb-6">Kontrollera uppgifterna innan betalning</p>

              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-gray-50 rounded-md p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Företag</p>
                    <p className="font-medium">{formData.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Kontakt</p>
                    <p className="font-medium">{formData.contactPerson} ({formData.companyEmail})</p>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-sm text-gray-600 mb-1">Betalning</p>
                    <p className="font-medium">Bidrag: {parseInt(formData.grantAmount).toLocaleString('sv-SE')} kr</p>
                    <p className="font-medium">Serviceavgift: {calculateFee().toLocaleString('sv-SE')} kr</p>
                    <p className="font-bold text-lg mt-2">Totalt: {calculateTotal().toLocaleString('sv-SE')} kr</p>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                    className="mt-1 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">
                    Jag godkänner{' '}
                    <Link href="/villkor" className="text-gray-900 underline">
                      villkoren
                    </Link>{' '}
                    och förstår att bidraget hålls i escrow tills föreningen lämnat in en godkänd rapport
                  </span>
                </label>

                {/* Mock Stripe Payment UI */}
                <div className="border-2 border-gray-200 rounded-md p-6">
                  <p className="font-semibold text-gray-900 mb-4">Betalningsmetod</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">💳</div>
                      <span>Säker betalning via Stripe</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      I fullständig version: Kortbetalning, Swish, eller Faktura
                    </p>
                  </div>
                </div>
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
                  disabled={!formData.agreedToTerms}
                  className="bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Bekräfta betalning ({calculateTotal().toLocaleString('sv-SE')} kr)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
