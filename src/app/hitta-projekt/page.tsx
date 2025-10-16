import Link from 'next/link';
import MatchingForm from '@/components/MatchingForm';

export default function HittaProjektPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <span className="text-gray-900">Hitta Projekt</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hitta projekt som matchar era mål
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Berätta vad ni söker så matchar vi er med verifierade samhällsprojekt från lokala föreningar
          </p>
          <p className="text-lg text-blue-600 font-semibold">
            ⚡ Tar mindre än 2 minuter
          </p>
        </div>

        {/* Matching Form */}
        <MatchingForm />

        {/* Info Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Varför använda matchning?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Spara tid</h4>
                  <p className="text-gray-600 text-sm">Få automatiskt förslag istället för att söka manuellt</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Bättre träffar</h4>
                  <p className="text-gray-600 text-sm">AI matchar projekt med era specifika hållbarhetsmål</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Helt gratis</h4>
                  <p className="text-gray-600 text-sm">Ingen kostnad att använda matchningsfunktionen</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Vill du bläddra själv?</p>
            <Link
              href="/alla-projekt"
              className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Se alla projekt utan matchning →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
