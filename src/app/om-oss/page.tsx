import Link from 'next/link';

export default function OmOss() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <span className="text-gray-900">Om Oss</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Om KollektivlyCSR
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vi bygger Sveriges ledande plattform för CSR och samhällsinitiativ
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vår Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            KollektivlyCSR skapades för att lösa ett verkligt problem: företag vill göra samhällsnytta men vet inte hur,
            medan lokala organisationer har fantastiska projekt men når inte fram till företagen. Vi är bryggan som
            kopplar samman dessa två världar på ett trovärdig, datadriven och skalbart sätt.
          </p>
        </div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-xl p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">För Företag</h3>
            <p className="text-gray-600">
              Hitta verifierade CSR-projekt som matchar era hållbarhetsmål. Spara tid, stärk varumärket och
              rapportera trovärd samhällsnytta som följer CSRD och ESG-krav.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-8">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 119.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">För Organisationer</h3>
            <p className="text-gray-600">
              Nå fler företag med era samhällsprojekt. Presentera era initiativ professionellt och få
              stöd snabbare genom vårt kvalitetssäkrade nätverk.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Våra Värderingar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trovärdighet</h3>
              <p className="text-gray-600">Alla projekt är verifierade och kvalitetssäkrade</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Datadriven</h3>
              <p className="text-gray-600">Beslut baserade på mätbar påverkan och resultat</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skalbarhet</h3>
              <p className="text-gray-600">Byggd för att växa och hantera stora volymer</p>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Plattformen under utveckling
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Vi bygger KollektivlyCSR med användarfokus och högsta kvalitetsstandard.
            Denna demo visar vår vision - den fullständiga plattformen lanseras snart.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Utforska Rekommenderade Projekt
          </Link>
        </div>
      </div>
    </div>
  );
}