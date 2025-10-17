'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI-verifierad samhällsnytta
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Kopplar företag med lokala föreningar. Ingen rapport, ingen betalning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/alla-projekt"
                className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Hitta projekt
              </Link>
              <Link
                href="/registrera"
                className="bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors border border-gray-600"
              >
                Registrera förening
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Prop Section */}
        <div className="py-20 grid md:grid-cols-2 gap-16">
          {/* For Företag */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">För Företag</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">AI-matchning</h3>
                <p className="text-gray-600">Hitta projekt som passar era hållbarhetsmål</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Automatisk verifiering</h3>
                <p className="text-gray-600">Rapporter granskas av AI, ingen manuell uppföljning</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Säker betalning</h3>
                <p className="text-gray-600">Medel frigörs endast vid godkänd rapport</p>
              </div>
            </div>
            <Link
              href="/alla-projekt"
              className="inline-block mt-8 text-gray-900 font-medium hover:underline"
            >
              Bläddra bland projekt →
            </Link>
          </div>

          {/* For Föreningar */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">För Föreningar</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Snabb process</h3>
                <p className="text-gray-600">2 veckor istället för 6-12 månader</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Garanterad betalning</h3>
                <p className="text-gray-600">Medel reserveras från start</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Helt gratis</h3>
                <p className="text-gray-600">Ingen kostnad att lista projekt</p>
              </div>
            </div>
            <Link
              href="/registrera"
              className="inline-block mt-8 text-gray-900 font-medium hover:underline"
            >
              Kom igång →
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Så funkar det</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl font-bold text-gray-300 mb-3">01</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Matchning</h3>
              <p className="text-gray-600">
                AI kopplar företag med projekt baserat på FN-mål och kategori
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-gray-300 mb-3">02</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Escrow</h3>
              <p className="text-gray-600">
                Bidraget reserveras direkt, föreningen kan starta projektet
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-gray-300 mb-3">03</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verifiering</h3>
              <p className="text-gray-600">
                AI verifierar rapporten automatiskt, betalning släpps
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="py-20 mb-20 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Redo att komma igång?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Modern samhällsnytta med AI-verifiering
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/alla-projekt"
                className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Se projekt
              </Link>
              <Link
                href="/registrera"
                className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors border border-gray-300"
              >
                Registrera förening
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
