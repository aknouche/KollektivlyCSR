import Link from 'next/link';

export default function Registrera() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <Link href="/lagg-till-projekt" className="hover:text-blue-600">Lägg till Projekt</Link>
            <span>›</span>
            <span className="text-gray-900">Registrera</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Registrera din organisation
          </h1>
          <p className="text-lg text-gray-600">
            Verifiera er organisation för att börja lägga upp CSR-projekt
          </p>
        </div>

        {/* Registration Form Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Registreringsformulär under utveckling
              </h3>
              <p className="text-gray-600 mb-6">
                Vårt säkra registreringsformulär med e-postverifiering och automatisk org.nr-validering kommer i nästa version.
              </p>
            </div>
          </div>

          {/* Form Fields Preview */}
          <div className="space-y-6 opacity-60">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organisationsnamn</label>
              <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organisationsnummer</label>
              <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kontaktperson</label>
              <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-postadress</label>
              <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivning av verksamhet</label>
              <div className="w-full h-24 bg-gray-100 rounded-lg"></div>
            </div>
          </div>

          {/* Features Coming */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Inkluderat i registreringen:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Automatisk org.nr-validering via Bolagsverket
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Säker e-postverifiering
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Admin-dashboard för projekthantering
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                GDPR-kompatibel datahantering
              </li>
            </ul>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="text-center mt-8">
          <Link
            href="/lagg-till-projekt"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Tillbaka till projektinformation
          </Link>
        </div>
      </div>
    </div>
  );
}