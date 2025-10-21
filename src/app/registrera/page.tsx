'use client';

import Link from 'next/link';

export default function Registrera() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Registrera konto</h1>
          <p className="text-gray-600">Välj vad som stämmer för dig</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Företag */}
          <Link
            href="/foretag-logga-in?tab=register"
            className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-gray-900 transition-colors text-center group"
          >
            <div className="text-5xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700">Företag</h2>
            <p className="text-gray-600 mb-4">
              Registrera ert företag för att hitta och stödja samhällsprojekt
            </p>
            <div className="text-gray-900 font-medium group-hover:underline">
              Fortsätt →
            </div>
          </Link>

          {/* Förening */}
          <Link
            href="/forening-logga-in?tab=register"
            className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-gray-900 transition-colors text-center group"
          >
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700">Förening</h2>
            <p className="text-gray-600 mb-4">
              Registrera er förening för att publicera projekt och nå företag
            </p>
            <div className="text-gray-900 font-medium group-hover:underline">
              Fortsätt →
            </div>
          </Link>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          Har redan ett konto?{' '}
          <Link href="/logga-in" className="text-gray-900 font-medium hover:underline">
            Logga in här
          </Link>
        </div>
      </div>
    </div>
  );
}
