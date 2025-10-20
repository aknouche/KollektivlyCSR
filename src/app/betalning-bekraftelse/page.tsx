'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function BetalningBekraftelseContent() {
  const searchParams = useSearchParams();
  const [transactionId] = useState(() => `TXN-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`);
  const amount = searchParams.get('amount') || '0';

  // Auto-login företag after payment
  useState(() => {
    const companyEmail = localStorage.getItem('company_email');
    if (companyEmail) {
      localStorage.setItem('company_logged_in', 'true');
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Betalning bekräftad!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Tack för ert bidrag. Pengarna hålls nu säkert i escrow.
        </p>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-md p-6 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaktions-ID</span>
            <span className="font-mono text-sm">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bidragsbelopp</span>
            <span className="font-semibold">{parseInt(amount).toLocaleString('sv-SE')} kr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
              I escrow
            </span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Vad händer nu?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Föreningen startar projektet</p>
                <p className="text-sm text-gray-600">De får en notifikation och kan börja arbeta</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Föreningen rapporterar framsteg</p>
                <p className="text-sm text-gray-600">AI verifierar rapportens kvalitet och completeness</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Betalning frigörs</p>
                <p className="text-sm text-gray-600">Pengarna överförs till föreningen automatiskt</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">Ni får ESG-rapport</p>
                <p className="text-sm text-gray-600">Auto-genererad rapport klar för era stakeholders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-sm text-blue-900">
            <strong>Viktigt:</strong> Vi har skickat en bekräftelse till er e-post. Där hittar ni ett kvitto och kan följa projektets framsteg.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/foretag-dashboard"
            className="flex-1 text-center bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Till Dashboard
          </Link>
          <Link
            href="/alla-projekt"
            className="flex-1 text-center bg-white text-gray-900 border-2 border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Stötta fler projekt
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Frågor? Kontakta oss på{' '}
          <a href="mailto:support@kollektivly.se" className="text-gray-900 underline">
            support@kollektivly.se
          </a>
        </p>
      </div>
    </div>
  );
}

export default function BetalningBekraftelse() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-600">Laddar...</p>
        </div>
      </div>
    }>
      <BetalningBekraftelseContent />
    </Suspense>
  );
}
