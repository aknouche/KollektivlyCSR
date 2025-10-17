'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ESGRapport() {
  // Mock data - params used for future dynamic loading
  const [report] = useState({
    companyName: 'Acme AB',
    projectName: 'Grön Framtid - Skolträdgård',
    organization: 'Miljöföreningen Stockholm',
    grantAmount: 50000,
    period: { start: '2025-02-15', end: '2025-05-15' },
    category: 'Miljö',
    unGoals: ['Mål 4: God utbildning', 'Mål 11: Hållbara städer', 'Mål 13: Klimatåtgärder'],
    impact: {
      directBeneficiaries: 45,
      indirectBeneficiaries: 200,
      co2Reduction: 120,
      communityReach: 'Lokal skola med 200 elever'
    },
    milestones: [
      { title: 'Projektstart & planering', completed: true, impact: '15 elever deltog i planeringsworkshop' },
      { title: 'Material & installation', completed: true, impact: 'Trädgård etablerad, 25 växtarter planterade' },
      { title: 'Slutrapport & utvärdering', completed: true, impact: '45 elever utbildade i hållbar odling' }
    ]
  });

  const handleDownload = () => {
    alert('PDF-nedladdning kommer i fullständig version (integration med Pdfmonkey.io)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/foretag-dashboard" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
              ← Tillbaka till dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Impact Rapport</h1>
            <p className="text-gray-600">{report.projectName}</p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Ladda ner PDF
          </button>
        </div>

        {/* Preview Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            <strong>Förhandsvisning:</strong> Detta är en mockup. Fullständig version genereras automatiskt som PDF.
          </p>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
          {/* Executive Summary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sammanfattning</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Företag</p>
                <p className="font-semibold text-gray-900">{report.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Organisation</p>
                <p className="font-semibold text-gray-900">{report.organization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Bidragsbelopp</p>
                <p className="font-semibold text-gray-900">{report.grantAmount.toLocaleString('sv-SE')} kr</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Period</p>
                <p className="font-semibold text-gray-900">
                  {new Date(report.period.start).toLocaleDateString('sv-SE', { month: 'short', year: 'numeric' })} - {new Date(report.period.end).toLocaleDateString('sv-SE', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* UN Goals Alignment */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">FN:s globala mål</h2>
            <div className="flex flex-wrap gap-2">
              {report.unGoals.map((goal, index) => (
                <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                  {goal}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Impact Metrics */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Samhällspåverkan</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-gray-900 mb-1">{report.impact.directBeneficiaries}</p>
                <p className="text-sm text-gray-600">Direkta mottagare</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-gray-900 mb-1">{report.impact.indirectBeneficiaries}</p>
                <p className="text-sm text-gray-600">Indirekt påverkade</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-gray-900 mb-1">{report.impact.co2Reduction} kg</p>
                <p className="text-sm text-gray-600">CO₂-reduktion (uppskattad)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-1">{report.impact.communityReach}</p>
                <p className="text-sm text-gray-600">Samhällsräckvidd</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Milestones */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Projektmilstolpar</h2>
            <div className="space-y-4">
              {report.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{milestone.title}</p>
                    <p className="text-sm text-gray-600">{milestone.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Verification */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Verifiering</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <p className="font-semibold text-green-900">AI-verifierat av Kollektivly</p>
              </div>
              <p className="text-sm text-green-800">
                Alla rapporter har granskats och godkänts av vårt AI-verifieringssystem. Betalningar har frigjorts enligt milstolpar.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Genererad av Kollektivly ESG Platform • {new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
