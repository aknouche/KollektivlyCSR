import Link from 'next/link';

export default function LaggTillProjekt() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <span className="text-gray-900">Lägg till Projekt</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Lägg till ditt CSR-projekt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Nå fler företag och få stöd för era samhällsinitiativ genom vår plattform
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-orange-100 text-orange-800 rounded-full font-semibold">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Registrering krävs först
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Så fungerar det</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Registrera Organisation</h3>
              <p className="text-gray-600">Verifiera er organisation med org.nr och kontaktuppgifter</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skapa Projekt</h3>
              <p className="text-gray-600">Beskriv ert CSR-projekt med mål, budget och förväntad påverkan</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Få Stöd</h3>
              <p className="text-gray-600">Företag kontaktar er direkt för samarbeten och sponsring</p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Vad krävs för att delta?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Organisationskrav:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Registrerat svenskt org.nr</li>
                <li>• Non-profit eller välgörenhetsorganisation</li>
                <li>• Aktivt verksam i Sverige</li>
                <li>• Verifierad kontaktperson</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Projektkrav:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Tydligt samhällsnytta-fokus</li>
                <li>• Koppling till FN:s globala mål</li>
                <li>• Realistisk budget och tidsplan</li>
                <li>• Mätbara resultat och påverkan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Link
            href="/registrera"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md inline-block"
          >
            Registrera din organisation
          </Link>
          <div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}