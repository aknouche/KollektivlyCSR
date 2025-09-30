import Link from 'next/link';

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <span className="text-gray-900">Kontakt</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Kontakta oss
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vi hjälper gärna till med frågor om plattformen, samarbeten eller teknisk support
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">E-post</h3>
            <p className="text-gray-600 mb-4">
              För allmänna frågor, teknisk support och partnerskapsförfrågningar
            </p>
            <div className="space-y-2">
              <p className="text-blue-600 font-medium">info@kollektivly.se</p>
              <p className="text-blue-600 font-medium">support@kollektivly.se</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Telefon</h3>
            <p className="text-gray-600 mb-4">
              Direktkontakt för brådskande frågor och personlig support
            </p>
            <p className="text-green-600 font-medium">08-123 456 78</p>
            <p className="text-sm text-gray-500 mt-2">Vardagar 9:00-17:00</p>
          </div>
        </div>

        {/* Contact Form Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kontaktformulär under utveckling
              </h3>
              <p className="text-gray-600 mb-6">
                Ett säkert och användarvänligt kontaktformulär med automatiserade svar kommer i nästa version.
              </p>
            </div>
          </div>

          {/* Form Fields Preview */}
          <div className="space-y-6 opacity-60">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Namn</label>
                <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
                <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ämne</label>
              <div className="w-full h-12 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meddelande</label>
              <div className="w-full h-32 bg-gray-100 rounded-lg"></div>
            </div>
          </div>

          {/* Features Coming */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Inkluderat i kontaktformuläret:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Automatisk bekräftelse via e-post
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kategorisering av förfrågningar
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Integrerat CRM-system
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
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}