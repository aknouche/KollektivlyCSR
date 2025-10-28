'use client'

import Link from 'next/link'
import ESGReportPreview from '@/components/ESGReportPreview'

export default function ESGRapportExempelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Demo Banner */}
      <div className="bg-teal-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-white">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="font-bold text-lg">ESG-rapport - Exempel</h2>
              <p className="text-sm text-teal-100">Se vad du får med Standard & Enhanced tiers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Hem</Link>
            <span>/</span>
            <span className="text-gray-900">ESG-rapport exempel</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Automatiskt genererad ESG-rapport
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Varje grant genererar en färdig ESG-rapport som är CSRD-kompatibel och kan användas direkt i er hållbarhetsrapportering
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border-2 border-teal-200 p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Spara 5 timmar</h3>
            <p className="text-sm text-gray-600">Rapporten genereras automatiskt från verifierad data</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-teal-200 p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-gray-900 mb-2">CSRD-redo</h3>
            <p className="text-sm text-gray-600">Uppfyller krav för Corporate Sustainability Reporting Directive</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-teal-200 p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">SDG-aligned</h3>
            <p className="text-sm text-gray-600">Kopplad till FN:s 17 globala mål för hållbar utveckling</p>
          </div>
        </div>

        {/* Report Preview */}
        <ESGReportPreview
          companyName="Exempel AB"
          projectTitle="Fotboll för alla - inkluderingsprojekt i Stockholmsförorten"
          grantAmount={50000}
          organizationName="IF Brommapojkarna Förening"
          sdgGoals={[
            'SDG 3: God hälsa och välbefinnande',
            'SDG 10: Minskad ojämlikhet',
            'SDG 11: Hållbara städer och samhällen'
          ]}
        />

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border-2 border-teal-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Får du ESG-rapporter idag?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            De flesta företag spenderar 5-10 timmar per grant på att sammanställa impact-data och skriva rapporter för styrelsen.
            Med Kollektivly får du allt automatiskt efter att organisationen slutfört projektet.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/alla-projekt"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors"
            >
              Testa med ett projekt →
            </Link>
            <Link
              href="/"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors border-2 border-gray-300"
            >
              Läs mer om Kollektivly
            </Link>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Inkluderad i <span className="font-semibold text-teal-600">Standard (7%)</span> och <span className="font-semibold text-teal-600">Enhanced (10%)</span> tiers
          </p>
        </div>
      </div>
    </div>
  )
}