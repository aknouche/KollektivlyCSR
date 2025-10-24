'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StodProjekt() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coming Soon Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">💰</span>
              <h1 className="text-2xl font-bold">Betalningar Kommer Snart</h1>
            </div>
            <p className="text-blue-100">Vi testar matchningsplattformen först</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                Tack för ditt intresse! Just nu testar vi plattformens matchningsfunktion i en beta-version.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Vad du kan göra just nu:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Bläddra bland samhällsprojekt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Kontakta föreningar direkt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Spara intressanta projekt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-gray-700">Utforska matchningar baserat på era mål</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Betalningsfunktionen lanseras snart</h3>
                <p className="text-blue-800 text-sm mb-3">
                  När den är klar kommer ni kunna:
                </p>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Stödja projekt med säkra escrow-betalningar</li>
                  <li>• Få AI-verifierade rapporter automatiskt</li>
                  <li>• Ladda ner färdiga ESG-rapporter</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/alla-projekt"
                  className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tillbaka till Projekt
                </Link>
                <Link
                  href="/matcha-projekt"
                  className="flex items-center justify-center border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Matcha Projekt
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Vill du stödja ett projekt redan nu?</h3>
          <p className="text-gray-700 mb-4">
            Använd kontaktformuläret för att ta kontakt med föreningen direkt. Ni kan arrangera stöd utanför plattformen under beta-perioden.
          </p>
          <p className="text-sm text-gray-600">
            <strong>OBS:</strong> När betalningsfunktionen lanseras får ni tillgång till AI-verifierad rapportering, escrow-säkerhet och automatiska ESG-rapporter.
          </p>
        </div>
      </div>
    </div>
  );
}
