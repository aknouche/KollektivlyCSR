'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Föreningar och företag möts för samhällsnytta
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Verifierade projekt och event för samhällsnytta och hållbar utveckling. Där pengar gör som mest nytta. Automatiserade processer och minimal administration.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2">
              <Link
                href="/matcha-projekt"
                className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Hitta projekt
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-700 text-white px-8 py-4 rounded-md font-semibold hover:bg-gray-600 transition-colors text-lg border-2 border-gray-600"
              >
                Publicera projekt
              </Link>
            </div>

            {/* Discrete info */}
            <div className="text-center space-y-1">
              <p className="text-gray-500 text-sm">Gratis att publicera och söka projekt</p>
              <Link
                href="/alla-projekt"
                className="text-gray-400 text-sm hover:text-gray-300 transition-colors block"
              >
                Alla projekt
              </Link>
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
                Hitta rätt samhällsprojekt via automatisk matchning. Trygg betalning och återrapportering. Stärk ert varumärke och arbeta mer datadrivet med ESG-projekt.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">För Föreningar</h3>
              <p className="text-gray-600">
                Låt företag hitta er. Bidra till samhället och utveckla er förening. Rätt stöd på rätt plats.
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
                  Företag hittar projekt via automatisk matchning eller bläddrar fritt
                </p>
              </div>

              <div>
                <div className="text-4xl font-bold text-gray-600 mb-3">02</div>
                <h3 className="text-lg font-semibold mb-2">Säker betalning och rapportering</h3>
                <p className="text-gray-300">
                  Bidraget hålls inne i väntan på rapportering. Föreningen kan starta direkt.
                </p>
              </div>

              <div>
                <div className="text-4xl font-bold text-gray-600 mb-3">03</div>
                <h3 className="text-lg font-semibold mb-2">Verifiering</h3>
                <p className="text-gray-300">
                  Föreningens rapporter verifieras automatiskt. Betalning frigörs. ESG-rapport genereras.
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
