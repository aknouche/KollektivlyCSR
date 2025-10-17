'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GranskaRapport() {
  const params = useParams();
  const router = useRouter();

  // Mock data
  const [report] = useState({
    milestoneTitle: 'Material & installation',
    amount: 20000,
    submittedDate: '2025-03-28',
    content: 'Vi har genomfört första fasen av skolträdgårdsprojektet. Material har inköpts och installationen är slutförd enligt plan. Totalt 15 elever har deltagit aktivt i arbetet.',
    attachments: ['faktura_material.pdf', 'bilder_installation.jpg'],
    organization: 'Miljöföreningen Stockholm'
  });

  const [aiVerification] = useState({
    status: 'PASSED',
    score: 92,
    checks: [
      { name: 'Innehållskomplettering', passed: true, detail: 'Alla obligatoriska fält är ifyllda' },
      { name: 'Bilagor', passed: true, detail: '2 dokument bifogade' },
      { name: 'Budget överensstämmelse', passed: true, detail: 'Kostnader matchar budget (98%)' },
      { name: 'Impact beskrivning', passed: true, detail: 'Tydlig redogörelse för samhällsnytta' },
      { name: 'Legitimitetskontroll', passed: false, detail: 'Manuell granskning rekommenderas för stora belopp' }
    ]
  });

  const [decision, setDecision] = useState<'APPROVE' | 'REJECT' | null>(null);

  const handleDecision = (action: 'APPROVE' | 'REJECT') => {
    setDecision(action);
    setTimeout(() => {
      router.push(`/projekt-status/${params.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/projekt-status/${params.id}`} className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Tillbaka
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Granska rapport</h1>
          <p className="text-gray-600">{report.organization}</p>
        </div>

        {/* AI Verification Result */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">AI-verifiering</h2>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{aiVerification.score}/100</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                aiVerification.status === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {aiVerification.status === 'PASSED' ? 'Godkänd' : 'Underkänd'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {aiVerification.checks.map((check, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  check.passed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {check.passed ? '✓' : '!'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{check.name}</p>
                  <p className="text-sm text-gray-600">{check.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rapportdetaljer</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delmål</p>
              <p className="font-medium text-gray-900">{report.milestoneTitle}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Belopp</p>
              <p className="text-xl font-bold text-gray-900">{report.amount.toLocaleString('sv-SE')} kr</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Inlämnad</p>
              <p className="font-medium text-gray-900">
                {new Date(report.submittedDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Rapport</p>
              <p className="text-gray-900 leading-relaxed">{report.content}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Bilagor ({report.attachments.length})</p>
              <div className="space-y-2">
                {report.attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">📎</span>
                    <span className="text-sm text-gray-900">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decision */}
        {!decision ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ditt beslut</h2>
            <p className="text-gray-600 mb-6">
              AI-verifieringen rekommenderar godkännande. Granska rapporten och fatta beslut.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDecision('APPROVE')}
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Godkänn & frigör betalning
              </button>
              <button
                onClick={() => handleDecision('REJECT')}
                className="flex-1 bg-white text-gray-900 border-2 border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Avslå
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className={`flex items-center gap-3 ${decision === 'APPROVE' ? 'text-green-600' : 'text-red-600'}`}>
              <div className="w-12 h-12 rounded-full bg-current opacity-10 flex items-center justify-center">
                {decision === 'APPROVE' ? '✓' : '✕'}
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {decision === 'APPROVE' ? 'Rapport godkänd!' : 'Rapport avslagen'}
                </p>
                <p className="text-sm text-gray-600">
                  {decision === 'APPROVE' ? 'Betalning frigörs inom 24 timmar' : 'Föreningen får feedback'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
