'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Verifiering() {
  // Mock data - params used for future dynamic loading
  const [organization] = useState({
    name: 'Miljöföreningen Stockholm',
    orgNumber: '802466-1234',
    registrationDate: '2020-03-15',
    website: 'miljöföreningen-stockholm.se',
    email: 'info@miljoforeningen.se',
    phone: '08-123 456 78'
  });

  const [verification] = useState({
    status: 'VERIFIED',
    score: 95,
    checks: [
      {
        name: 'Organisationsnummer',
        passed: true,
        detail: 'Giltigt nummer registrerat hos Bolagsverket',
        timestamp: '2025-01-15'
      },
      {
        name: 'Stadgar',
        passed: true,
        detail: 'Stadgar inlämnade och AI-granskade (ideell förening bekräftad)',
        timestamp: '2025-01-15'
      },
      {
        name: 'Årsredovisning',
        passed: true,
        detail: 'Senaste årsredovisning (2024) granskad och godkänd',
        timestamp: '2025-01-16'
      },
      {
        name: 'Bankuppgifter',
        passed: true,
        detail: 'Bankkonto verifierat via Stripe Connect',
        timestamp: '2025-01-16'
      },
      {
        name: 'Legitimitet',
        passed: false,
        detail: 'Manuell granskning pågår (väntar på styrelsebeslut)',
        timestamp: '2025-01-17'
      }
    ],
    documents: [
      { name: 'stadgar_2020.pdf', uploadDate: '2025-01-15', verified: true },
      { name: 'arsredovisning_2024.pdf', uploadDate: '2025-01-16', verified: true },
      { name: 'styrelseprotokoll.pdf', uploadDate: '2025-01-17', verified: false }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Tillbaka till dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Förening verifiering</h1>
          <p className="text-gray-600">{organization.name}</p>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Verifieringsstatus</h2>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{verification.score}/100</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                verification.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                verification.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {verification.status === 'VERIFIED' ? 'Verifierad' :
                 verification.status === 'PENDING' ? 'Granskas' : 'Avvisad'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {verification.checks.map((check, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    check.passed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {check.passed ? '✓' : '⋯'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">{check.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(check.timestamp).toLocaleDateString('sv-SE')}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{check.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organization Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organisationsinformation</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Organisationsnummer</p>
              <p className="font-medium text-gray-900">{organization.orgNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Registrerad</p>
              <p className="font-medium text-gray-900">
                {new Date(organization.registrationDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">E-post</p>
              <p className="font-medium text-gray-900">{organization.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Telefon</p>
              <p className="font-medium text-gray-900">{organization.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">Webbplats</p>
              <p className="font-medium text-gray-900">{organization.website}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Uppladdade dokument</h2>
          <div className="space-y-3">
            {verification.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">📄</span>
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-600">
                      Uppladdad: {new Date(doc.uploadDate).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.verified ? 'Verifierad' : 'Granskas'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Obs:</strong> Detta är en mockup av verifieringsprocessen. I fullständig version kommer AI att granska dokument automatiskt via OpenAI API.
          </p>
        </div>
      </div>
    </div>
  );
}
