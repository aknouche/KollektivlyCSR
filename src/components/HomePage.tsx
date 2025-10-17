'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Säkra samhällsprojekt med AI-verifierad impact
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ingen rapport, ingen betalning. Automatisk verifiering. Noll administration.
            </p>
          </div>

          {/* Two-Column CTA */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Företag */}
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-gray-700 hover:border-gray-600 transition-colors">
              <h2 className="text-2xl font-bold mb-3">För Företag</h2>
              <p className="text-gray-300 mb-6">
                Hitta verifierade projekt. Betala säkert. Få ESG-rapporter automatiskt.
              </p>
              <div className="space-y-3">
                <Link
                  href="/alla-projekt"
                  className="block text-center bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Hitta projekt
                </Link>
                <Link
                  href="/foretag-logga-in"
                  className="block text-center bg-gray-700 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 transition-colors"
                >
                  Logga in
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                ✓ Ingen registrering behövs för att bläddra
              </p>
            </div>

            {/* Föreningar */}
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-gray-700 hover:border-gray-600 transition-colors">
              <h2 className="text-2xl font-bold mb-3">För Föreningar</h2>
              <p className="text-gray-300 mb-6">
                Lista projekt gratis. Få finansiering snabbt. Garanterad betalning.
              </p>
              <div className="space-y-3">
                <Link
                  href="/registrera"
                  className="block text-center bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Registrera förening
                </Link>
                <Link
                  href="/logga-in"
                  className="block text-center bg-gray-700 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 transition-colors"
                >
                  Logga in
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                ✓ 100% gratis att använda
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* USP Section */}
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Varför Kollektivly?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">För Företag</h3>
              <p className="text-gray-600">
                Spara 15+ timmar per projekt. Automatiska ESG-rapporter. Noll risk för missbruk.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">För Föreningar</h3>
              <p className="text-gray-600">
                Finansiering på 2 veckor istället för 6 månader. Garanterad betalning från dag 1.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">För Samhället</h3>
              <p className="text-gray-600">
                Fler projekt förverkligas. Starkare lokalsamhällen. Verifierad samhällsnytta.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Så funkar det</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-4xl font-bold text-gray-600 mb-3">01</div>
                <h3 className="text-lg font-semibold mb-2">Matchning</h3>
                <p className="text-gray-300">
                  Företag hittar projekt via AI-matchning eller bläddrar fritt
                </p>
              </div>

              <div>
                <div className="text-4xl font-bold text-gray-600 mb-3">02</div>
                <h3 className="text-lg font-semibold mb-2">Säker betalning</h3>
                <p className="text-gray-300">
                  Bidraget läggs i escrow. Föreningen kan starta direkt.
                </p>
              </div>

              <div>
                <div className="text-4xl font-bold text-gray-600 mb-3">03</div>
                <h3 className="text-lg font-semibold mb-2">AI-verifiering</h3>
                <p className="text-gray-300">
                  Rapport verifieras automatiskt. Betalning frigörs. ESG-rapport genereras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
