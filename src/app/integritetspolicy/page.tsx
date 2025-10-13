import Link from 'next/link';

export const metadata = {
  title: 'Integritetspolicy | Kollektivly',
  description: 'Läs om hur Kollektivly hanterar dina personuppgifter enligt GDPR'
};

export default function IntegritetspolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Tillbaka till startsidan
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Integritetspolicy
          </h1>
          <p className="text-gray-600">
            Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Personuppgiftsansvarig
            </h2>
            <p className="text-gray-700">
              Kollektivly är personuppgiftsansvarig för behandlingen av dina personuppgifter.
              För frågor om hur vi hanterar dina uppgifter, kontakta oss på:{' '}
              <a href="mailto:info@kollektivly.se" className="text-blue-600 hover:underline">
                info@kollektivly.se
              </a>
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Vilka personuppgifter samlar vi in?
            </h2>
            <p className="text-gray-700 mb-3">
              Vi samlar in och behandlar följande personuppgifter när du registrerar din organisation:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Organisationsnamn och organisationsnummer</li>
              <li>E-postadress</li>
              <li>Kontaktpersons namn</li>
              <li>Telefonnummer (valfritt)</li>
              <li>Stad och adress</li>
              <li>Webbplatsadress (valfritt)</li>
              <li>Beskrivning av verksamhet</li>
              <li>IP-adress och teknisk information (för säkerhet)</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Varför behandlar vi dina personuppgifter?
            </h2>
            <p className="text-gray-700 mb-3">
              Vi behandlar dina personuppgifter för att:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Verifiera och godkänna din organisations registrering</li>
              <li>Administrera ditt konto och dina CSR-projekt</li>
              <li>Kommunicera med dig angående plattformen och dina projekt</li>
              <li>Förbättra våra tjänster och användarupplevelse</li>
              <li>Följa juridiska krav och säkerställa plattformens säkerhet</li>
            </ul>
            <p className="text-gray-700 mt-3">
              <strong>Rättslig grund:</strong> Behandlingen sker med stöd av ditt samtycke
              samt för fullgörande av avtal (GDPR artikel 6.1a och 6.1b).
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Hur länge sparar vi dina uppgifter?
            </h2>
            <p className="text-gray-700">
              Vi sparar dina personuppgifter så länge ditt konto är aktivt. Om du
              begär radering av ditt konto raderas dina personuppgifter inom 30 dagar,
              förutom uppgifter vi är skyldiga att spara enligt lag (t.ex. bokföringsdata).
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Vem delar vi dina uppgifter med?
            </h2>
            <p className="text-gray-700 mb-3">
              Dina personuppgifter delas endast med:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Vercel:</strong> Hosting och infrastruktur (USA, EU-avtal)
              </li>
              <li>
                <strong>Supabase:</strong> Databas och autentisering (EU)
              </li>
              <li>
                <strong>Resend:</strong> E-posttjänst för verifieringsmejl (EU)
              </li>
              <li>
                <strong>Företag som visar intresse:</strong> Publika projektuppgifter
                (organisation, projekt, kontaktinformation) visas för registrerade företag
              </li>
            </ul>
            <p className="text-gray-700 mt-3">
              Vi säljer aldrig dina personuppgifter till tredje part.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Dina rättigheter enligt GDPR
            </h2>
            <p className="text-gray-700 mb-3">
              Du har rätt att:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Få tillgång</strong> till dina personuppgifter</li>
              <li><strong>Rätta</strong> felaktiga eller ofullständiga uppgifter</li>
              <li><strong>Radera</strong> dina uppgifter (&ldquo;rätten att bli glömd&rdquo;)</li>
              <li><strong>Begränsa</strong> behandlingen av dina uppgifter</li>
              <li><strong>Invända</strong> mot behandling</li>
              <li><strong>Dataportabilitet</strong> - få ut dina uppgifter i strukturerat format</li>
              <li><strong>Återkalla samtycke</strong> när som helst</li>
            </ul>
            <p className="text-gray-700 mt-3">
              För att utöva dina rättigheter, kontakta:{' '}
              <a href="mailto:privacy@kollektivly.se" className="text-blue-600 hover:underline">
                privacy@kollektivly.se
              </a>
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Säkerhet
            </h2>
            <p className="text-gray-700">
              Vi använder tekniska och organisatoriska säkerhetsåtgärder för att
              skydda dina personuppgifter mot obehörig åtkomst, förlust eller missbruk.
              Detta inkluderar kryptering, säkra servrar, åtkomstkontroller och
              regelbundna säkerhetsgranskningar.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Cookies
            </h2>
            <p className="text-gray-700">
              Vår plattform använder endast nödvändiga cookies för att säkerställa
              funktionalitet (t.ex. inloggningssessioner). Vi använder inga
              spårnings- eller marknadsföringscookies.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Ändringar i integritetspolicyn
            </h2>
            <p className="text-gray-700">
              Vi kan komma att uppdatera denna integritetspolicy. Väsentliga ändringar
              meddelas via e-post till registrerade användare. Den senaste versionen
              finns alltid tillgänglig på denna sida.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Klagomål
            </h2>
            <p className="text-gray-700">
              Om du anser att vi behandlar dina personuppgifter felaktigt har du
              rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY):{' '}
              <a
                href="https://www.imy.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.imy.se
              </a>
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/registrera"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Registrera din organisation
          </Link>
        </div>
      </div>
    </div>
  );
}
