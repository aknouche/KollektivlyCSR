'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CloudArrowUpIcon, CheckCircleIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

export default function MilestoneExempelPage() {
  const [activeMilestone, setActiveMilestone] = useState<1 | 2>(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Demo Banner */}
      <div className="bg-purple-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-white">
            <span className="text-2xl">📋</span>
            <div>
              <h2 className="font-bold text-lg">Milstolpsrapportering - Exempel</h2>
              <p className="text-sm text-purple-100">Se hur organisationer rapporterar progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Hem</Link>
            <span>/</span>
            <span className="text-gray-900">Milstolpsrapportering exempel</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Så fungerar milstolpsrapportering
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Alla grants delas automatiskt i 2 milstolpar. Organisationen får utbetalning när de rapporterat och AI har verifierat.
          </p>
        </div>

        {/* Milestone Selector */}
        <div className="flex gap-4 mb-8 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveMilestone(1)}
            className={`flex-1 p-6 rounded-xl border-2 transition-all ${
              activeMilestone === 1
                ? 'border-purple-600 bg-purple-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">Milstolpe 1</h3>
              <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">50%</span>
            </div>
            <p className="text-sm text-gray-600">Legitimitetskontroll</p>
            <p className="text-xs text-gray-500 mt-1">Stadgar + Årsredovisning</p>
          </button>

          <button
            onClick={() => setActiveMilestone(2)}
            className={`flex-1 p-6 rounded-xl border-2 transition-all ${
              activeMilestone === 2
                ? 'border-purple-600 bg-purple-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">Milstolpe 2</h3>
              <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">50%</span>
            </div>
            <p className="text-sm text-gray-600">Impact-rapportering</p>
            <p className="text-xs text-gray-500 mt-1">Bilder + Text + Social media</p>
          </button>
        </div>

        {/* Milestone Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form Mockup */}
          <div>
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              {activeMilestone === 1 ? (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                    <DocumentCheckIcon className="w-8 h-8 text-purple-600" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Milstolpe 1</h2>
                      <p className="text-sm text-gray-600">Legitimitetskontroll</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Upload Stadgar */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Ladda upp stadgar (PDF)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50">
                        <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">
                          Klicka för att välja fil eller dra och släpp
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, max 10MB</p>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">
                            ✓ <strong>stadgar_2024.pdf</strong> uppladdad (2.3 MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Upload Årsredovisning */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Ladda upp senaste årsredovisning (PDF)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50">
                        <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">
                          Klicka för att välja fil eller dra och släpp
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, max 10MB</p>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">
                            ✓ <strong>arsredovisning_2024.pdf</strong> uppladdad (4.1 MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors">
                      Skicka för AI-verifiering
                    </button>

                    <p className="text-xs text-center text-gray-500">
                      Verifieringen tar normalt 2-5 minuter
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                    <DocumentCheckIcon className="w-8 h-8 text-purple-600" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Milstolpe 2</h2>
                      <p className="text-sm text-gray-600">Impact-rapportering</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Impact Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Beskriv projektets genomförande och impact (min 100 tecken)
                      </label>
                      <textarea
                        placeholder="Berätta vad som har hänt, hur många som nåtts, vilka resultat ni ser..."
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                        defaultValue="Vi genomförde 12 fotbollsträningar för 250 ungdomar i förorten. 92% av deltagarna rapporterade att de fått nya vänner och 85% ökade sin fysiska aktivitet. Tre turneringar arrangerades med stort lokalt engagemang."
                      />
                      <p className="text-xs text-gray-500 mt-1">185 / 100 tecken</p>
                    </div>

                    {/* Upload Photos */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Ladda upp bilder från projektet (min 1, max 5)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50">
                        <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">
                          Klicka för att välja filer eller dra och släpp
                        </p>
                        <p className="text-xs text-gray-500 mt-1">JPEG/PNG, max 5MB per bild</p>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Bild {i}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Media Link */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Länk till sociala medier eller webbpost
                      </label>
                      <input
                        type="url"
                        placeholder="https://facebook.com/post/... eller https://..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                        defaultValue="https://facebook.com/brommapojkarna/posts/fotboll-for-alla-2025"
                      />
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors">
                      Skicka för AI-verifiering
                    </button>

                    <p className="text-xs text-center text-gray-500">
                      Verifieringen tar normalt 2-5 minuter
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Info & AI Process */}
          <div className="space-y-6">
            {/* What AI Checks */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🤖</span>
                Vad AI verifierar
              </h3>

              {activeMilestone === 1 ? (
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Dokumentlegitimitet</div>
                      <div className="text-sm text-gray-600">Är stadgarna autentiska och välformaterade?</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Org.nummer-matchning</div>
                      <div className="text-sm text-gray-600">Stämmer org.numret med registreringen?</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Ekonomisk sundhet</div>
                      <div className="text-sm text-gray-600">Finns balansräkning och resultaträkning?</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Revisorsutlåtande</div>
                      <div className="text-sm text-gray-600">Finns godkänt revisorsutlåtande?</div>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Beskrivning matchar projekt</div>
                      <div className="text-sm text-gray-600">Stämmer rapporten med projektets syfte?</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Äkta bilder</div>
                      <div className="text-sm text-gray-600">Är bilderna från verklig aktivitet (ej stock)?</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Social media-bevis</div>
                      <div className="text-sm text-gray-600">Finns länk till verifierbar publikation?</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Rimliga siffror</div>
                      <div className="text-sm text-gray-600">Är impact-siffror trovärdiga och rimliga?</div>
                    </div>
                  </li>
                </ul>
              )}
            </div>

            {/* Verification Process */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verifieringsprocess</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="w-0.5 h-12 bg-purple-300"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Organisation skickar in</div>
                    <div className="text-sm text-gray-600">Uppladdning via dashboard</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="w-0.5 h-12 bg-purple-300"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">AI analyserar</div>
                    <div className="text-sm text-gray-600">Google Gemini (2-5 min)</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="w-0.5 h-12 bg-purple-300"></div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Resultat</div>
                    <div className="text-sm text-gray-600">
                      Godkänd (≥85%) → Automatisk<br />
                      Osäker (50-85%) → Manuell granskning<br />
                      Avvisad (&lt;50%) → Be om komplettering
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircleIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Utbetalning</div>
                    <div className="text-sm text-gray-600">Stripe transfer till organisation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">För organisationer</h3>
              <p className="text-sm text-gray-600 mb-4">
                Enkel rapportering med tydliga mallar. Ni vet exakt vad som krävs.
              </p>
              <Link
                href="/registrera-organisation"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
              >
                Registrera er organisation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border-2 border-teal-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Automatisk verifiering = 0 timmar uppföljning
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Traditionella grants kräver 10-20 timmar manuell uppföljning per projekt.
            Med Kollektivly får ni automatisk AI-verifiering och betalar endast när kraven är uppfyllda.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/alla-projekt"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors"
            >
              Testa med ett projekt →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}