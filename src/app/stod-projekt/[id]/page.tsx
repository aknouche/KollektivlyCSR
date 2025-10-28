'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { CheckIcon, SparklesIcon, ShieldCheckIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import { createBrowserClient } from '@supabase/ssr'

export default function StodProjektPage() {
  const params = useParams()
  const projectId = params.id as string
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'enhanced'>('standard')
  const [grantAmount, setGrantAmount] = useState('50000')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    loadProject()
  }, [projectId])

  async function loadProject() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          organizations (
            organization_name,
            city
          )
        `)
        .eq('id', projectId)
        .single()

      if (error) throw error
      setProject(data)
    } catch (error) {
      console.error('Failed to load project:', error)
    } finally {
      setLoading(false)
    }
  }

  const tiers = {
    basic: {
      name: 'Basic',
      percentage: 4,
      description: 'Säker betalning med grundläggande verifiering',
      features: [
        'Säker escrow-betalning via Stripe',
        'Grundläggande dokumentvalidering',
        'Automatisk uppdelning i 2 milstolpar',
        'E-postnotifikationer',
      ],
      icon: ShieldCheckIcon,
      recommended: false
    },
    standard: {
      name: 'Standard',
      percentage: 7,
      description: 'AI-verifiering + ESG-rapportering',
      features: [
        'Allt i Basic +',
        'AI-verifierad legitimitetskontroll (stadgar, årsredovisning)',
        'AI-verifierad impact-rapportering',
        'Auto-genererad ESG-rapport (CSRD-kompatibel)',
        'Prioriterad support',
      ],
      icon: SparklesIcon,
      recommended: true
    },
    enhanced: {
      name: 'Enhanced',
      percentage: 10,
      description: 'Maximalt skydd + personlig support',
      features: [
        'Allt i Standard +',
        'Fördjupad AML/KYC-screening',
        'Manuell verifiering av admin',
        'Anpassade milstolpar',
        'Dedikerad kundansvarig',
        'Telefonsamtal med organisation innan betalning',
      ],
      icon: DocumentTextIcon,
      recommended: false
    }
  }

  const calculateFee = () => {
    const amount = parseFloat(grantAmount) || 0
    return Math.round(amount * tiers[selectedTier].percentage / 100)
  }

  const calculateTotal = () => {
    const amount = parseFloat(grantAmount) || 0
    return amount + calculateFee()
  }

  const handleProceed = async () => {
    setProcessing(true)
    // For demo purposes, just show that this is where payment would happen
    // In production, this would call the Stripe API
    setTimeout(() => {
      alert('DEMO MODE: I produktion skulle Stripe-betalning startas här.\n\nDu ser nu tydligt vad tjänsten kostar och vad du får.')
      setProcessing(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laddar projekt...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Projektet kunde inte hittas</p>
          <Link href="/alla-projekt" className="mt-4 inline-block text-teal-600 hover:underline">
            Tillbaka till alla projekt
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Demo Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="font-semibold text-yellow-900">🎬 DEMO MODE</span>
            <span className="text-yellow-800">|</span>
            <span className="text-yellow-700">
              Se tydligt vad tjänsten kostar och vad du får
            </span>
            <span className="text-yellow-800">|</span>
            <a
              href="https://forms.gle/YOUR_GOOGLE_FORM_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-900 font-semibold hover:underline"
            >
              Ge feedback → </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Hem</Link>
            <span>/</span>
            <Link href="/alla-projekt" className="hover:text-gray-900">Alla projekt</Link>
            <span>/</span>
            <span className="text-gray-900">Stöd projekt</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stöd {project.projektnamn}
          </h1>
          <p className="text-xl text-gray-600">
            {project.organizations?.organization_name} • {project.organizations?.city}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Grant Amount */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Grantbelopp</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hur mycket vill du bidra?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={grantAmount}
                    onChange={(e) => setGrantAmount(e.target.value)}
                    min="10000"
                    step="1000"
                    className="w-full px-4 py-3 pr-16 text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 font-medium">
                    SEK
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Minst 10,000 SEK</p>
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Grant till organisation</span>
                  <span className="font-semibold">{parseFloat(grantAmount || '0').toLocaleString('sv-SE')} SEK</span>
                </div>
                <div className="flex justify-between text-teal-600">
                  <span>Serviceavgift ({tiers[selectedTier].percentage}%)</span>
                  <span className="font-semibold">+{calculateFee().toLocaleString('sv-SE')} SEK</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Totalt</span>
                  <span>{calculateTotal().toLocaleString('sv-SE')} SEK</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-teal-900">
                  <strong>Viktigt:</strong> Avgiften läggs UTÖVER grantbeloppet. Organisationen får hela{' '}
                  {parseFloat(grantAmount || '0').toLocaleString('sv-SE')} SEK.
                </p>
              </div>

              <button
                onClick={handleProceed}
                disabled={processing || parseFloat(grantAmount) < 10000}
                className="w-full mt-6 bg-teal-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {processing ? 'Behandlar...' : 'Fortsätt till betalning'}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Säkert via Stripe • PCI-DSS certifierat
              </p>
            </div>
          </div>

          {/* Right: Pricing Tiers */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Välj verifieringsnivå</h2>
            <p className="text-gray-600 mb-6">
              Alla nivåer inkluderar säker escrow-betalning och automatisk milstolpshantering
            </p>

            <div className="grid grid-cols-1 gap-6">
              {(Object.keys(tiers) as Array<keyof typeof tiers>).map((tierId) => {
                const tier = tiers[tierId]
                const Icon = tier.icon
                const isSelected = selectedTier === tierId

                return (
                  <button
                    key={tierId}
                    onClick={() => setSelectedTier(tierId)}
                    className={`relative text-left p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-6 px-4 py-1 bg-teal-600 text-white text-sm font-bold rounded-full">
                        ⭐ REKOMMENDERAD
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-teal-100' : 'bg-gray-100'}`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-teal-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                          <p className="text-gray-600">{tier.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-teal-600">{tier.percentage}%</div>
                        <div className="text-sm text-gray-500">serviceavgift</div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <div className="mt-4 p-3 bg-teal-100 rounded-lg">
                        <p className="text-sm text-teal-900 font-medium">
                          Med {parseFloat(grantAmount || '0').toLocaleString('sv-SE')} SEK grant blir avgiften{' '}
                          {calculateFee().toLocaleString('sv-SE')} SEK
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Value Proposition */}
            <div className="mt-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Varför betala serviceavgift?</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">⏱️ Spara tid</h4>
                  <p className="text-gray-700 text-sm">
                    Ingen manuell uppföljning. Vi hanterar allt automatiskt. <strong>Sparar 15 timmar/grant</strong> (motsvarande 3,000+ SEK).{' '}
                    <Link href="/milestone-exempel" className="text-teal-600 font-semibold hover:underline">
                      Se hur →
                    </Link>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🛡️ Garanterad trygghet</h4>
                  <p className="text-gray-700 text-sm">
                    AI verifierar dokument och rapporter. Pengarna släpps ENDAST när kraven är uppfyllda. Ingen risk för missbruk.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">📊 CSRD-redo rapportering</h4>
                  <p className="text-gray-700 text-sm">
                    Få färdig ESG-rapport för styrelsen och CSRD-rapportering. <strong>Sparar 5 timmar</strong> i rapportskrivande.{' '}
                    <Link href="/esg-rapport-exempel" className="text-teal-600 font-semibold hover:underline">
                      Se exempel →
                    </Link>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">✅ Compliance-säkerhet</h4>
                  <p className="text-gray-700 text-sm">
                    AML/KYC-verifiering, säker betalning (PCI-DSS), GDPR-kompatibel. Allt juridiskt hanterat.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-teal-300">
                <p className="text-center text-gray-900">
                  <strong className="text-teal-600">Värde som levereras</strong> (18-20 timmars arbete + trygghet) <strong>&gt; Pris</strong> ({tiers[selectedTier].percentage}% avgift)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}