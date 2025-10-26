'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Vanliga frågor</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Här hittar du svar på de vanligaste frågorna om Kollektivly
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Allmänt */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Allmänt</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vad kostar det?</h3>
                <p className="text-gray-600 text-sm">
                  Plattformen är gratis att använda. Avgift (7%) tillkommer endast vid bidragsbetalningar för verifiering och ESG-rapportering.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hur fungerar verifieringen?</h3>
                <p className="text-gray-600 text-sm">AI granskar rapporter automatiskt innan betalning frigörs.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Är pengarna säkra?</h3>
                <p className="text-gray-600 text-sm">Ja, alla betalningar hanteras via Stripe och hålls i escrow.</p>
              </div>
            </div>
          </div>

          {/* Föreningar */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Föreningar</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vem kan publicera projekt?</h3>
                <p className="text-gray-600 text-sm">Alla svenska ideella föreningar och organisationer.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">När betalas bidrag ut?</h3>
                <p className="text-gray-600 text-sm">Efter godkänd rapport. Pengarna finns dock tillgängliga direkt.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vilka rapporter krävs?</h3>
                <p className="text-gray-600 text-sm">Enkla milstolpsrapporter enligt överenskommen plan.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kostar det att publicera?</h3>
                <p className="text-gray-600 text-sm">Nej, det är helt gratis att lägga upp och visa projekt på plattformen.</p>
              </div>
            </div>
          </div>

          {/* Företag */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Företag</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hur hittar vi rätt projekt?</h3>
                <p className="text-gray-600 text-sm">Via automatisk matchning baserat på era värderingar och mål.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Vad kostar tjänsten?</h3>
                <p className="text-gray-600 text-sm">7% avgift utöver bidraget för verifiering och ESG-rapport.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Får vi ESG-rapporter?</h3>
                <p className="text-gray-600 text-sm">Ja, färdiga rapporter genereras automatiskt efter projektet.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kan vi följa projekten?</h3>
                <p className="text-gray-600 text-sm">Ja, i er dashboard ser ni alla milstolpar och rapporter.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
