'use client';

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifieraEpostContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Ingen verifieringstoken hittades i länken.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/organizations/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verifiering misslyckades');
        }

        setStatus('success');
        setMessage(data.message);
        setOrganizationName(data.organization.name);
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Ett oväntat fel uppstod');
      }
    };

    verifyEmail();
  }, [token]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verifierar din e-post...
          </h1>
          <p className="text-gray-600">
            Vänligen vänta medan vi verifierar din e-postadress
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verifiering misslyckades
          </h1>
          <p className="text-gray-600 mb-8">
            {message}
          </p>
          <div className="space-y-3">
            <Link
              href="/registrera"
              className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Registrera på nytt
            </Link>
            <Link
              href="/"
              className="block px-6 py-3 text-gray-600 hover:text-gray-900 transition"
            >
              Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          E-post verifierad! 🎉
        </h1>

        {organizationName && (
          <p className="text-xl text-gray-700 mb-6">
            Välkommen till Kollektivly, <strong>{organizationName}</strong>!
          </p>
        )}

        <p className="text-gray-600 mb-8">
          {message}
        </p>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Nästa steg:</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                1
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Vänta på godkännande</h4>
                <p className="text-sm text-gray-600">
                  Vår admin granskar din ansökan. Detta tar vanligtvis 1-2 arbetsdagar.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                2
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Få godkännande-mejl</h4>
                <p className="text-sm text-gray-600">
                  När du är godkänd får du ett mejl med en inloggningslänk.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                3
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">Börja lägga upp projekt</h4>
                <p className="text-sm text-gray-600">
                  När du loggat in kan du skapa och publicera CSR-projekt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prepare Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-left">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Förbered ditt första projekt
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              Skriv en tydlig projektbeskrivning (50-500 ord)
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              Ta fram en budget och tidsplan
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              Välj relevanta FN:s hållbarhetsmål
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              Samla bilder och material (rekommenderat)
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Utforska projekt på Kollektivly
          </Link>
          <p className="text-sm text-gray-500">
            Har du frågor? Kontakta oss på{' '}
            <a href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'support@kollektivly.se'}`} className="text-blue-600 hover:underline">
              {process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'support@kollektivly.se'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifieraEpost() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Laddar...
          </h1>
        </div>
      </div>
    }>
      <VerifieraEpostContent />
    </Suspense>
  );
}
