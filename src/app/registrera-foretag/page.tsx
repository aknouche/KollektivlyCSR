'use client';

import { useState } from 'react';
import Link from 'next/link';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function RegistreraForetag() {
  const [formData, setFormData] = useState({
    companyName: '',
    organizationNumber: '',
    email: '',
    password: '',
    contactPerson: '',
    phoneNumber: '',
    website: '',
    city: '',
    address: '',
    description: '',
    gdprConsent: false
  });

  const [hcaptchaToken, setHcaptchaToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!hcaptchaToken) {
      setError('Vänligen slutför captcha-verifieringen');
      return;
    }

    if (!formData.gdprConsent) {
      setError('Du måste godkänna behandling av personuppgifter');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hcaptchaToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registrering misslyckades');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Välkommen till Kollektivly! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Ert företagskonto är skapat och redo att användas!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Nu kan ni:</h3>
              <ol className="text-left text-gray-700 space-y-2">
                <li>✅ Logga in med <strong>{formData.email}</strong></li>
                <li>✅ Börja söka efter samhällsprojekt att stödja</li>
                <li>✅ Kontakta föreningar och följa era bidrag</li>
              </ol>
            </div>
            <Link
              href="/foretag-logga-in"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Logga in nu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>›</span>
            <Link href="/registrera" className="hover:text-blue-600">Registrera</Link>
            <span>›</span>
            <span className="text-gray-900">Företag</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Registrera ert företag. Det är gratis.
          </h1>
          <p className="text-lg text-gray-600">
            Fyll i formuläret nedan för att komma igång med Kollektivly, helt gratis.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Företagsnamn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Hållbara Lösningar AB"
              />
            </div>

            {/* Organization Number */}
            <div>
              <label htmlFor="organizationNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Organisationsnummer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="organizationNumber"
                name="organizationNumber"
                required
                value={formData.organizationNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="XXXXXX-XXXX"
                pattern="\d{6}-\d{4}"
              />
              <p className="mt-1 text-sm text-gray-500">Format: 123456-7890</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Företagsepost <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="info@foretag.se"
              />
              <p className="mt-1 text-sm text-gray-500">Används för inloggning</p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Lösenord <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Minst 8 tecken"
              />
              <p className="mt-1 text-sm text-gray-500">Minst 8 tecken</p>
            </div>

            {/* Contact Person */}
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                Kontaktperson <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                required
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Anna Andersson"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Telefonnummer <span className="text-gray-400">(valfritt)</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08-123 45 67"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Stad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Stockholm"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Adress <span className="text-gray-400">(valfritt)</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kungsgatan 1, 111 43 Stockholm"
              />
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Webbplats <span className="text-gray-400">(valfritt)</span>
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.foretag.se"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Beskrivning av verksamhet <span className="text-gray-400">(valfritt)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Berätta kort om ert företag och er verksamhet..."
                maxLength={1000}
              />
              <p className="mt-1 text-sm text-gray-500">{formData.description.length}/1000 tecken</p>
            </div>

            {/* GDPR Consent */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="gdprConsent"
                  name="gdprConsent"
                  checked={formData.gdprConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="gdprConsent" className="ml-3 text-sm text-gray-700">
                  Jag godkänner att Kollektivly behandlar företagets uppgifter enligt{' '}
                  <Link href="/integritetspolicy" className="text-blue-600 hover:underline">
                    integritetspolicyn
                  </Link>
                  . Uppgifterna används endast för registrering och kommunikation gällande ert företag och projekt.
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
            </div>

            {/* hCaptcha */}
            <div className="flex justify-center">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                onVerify={(token) => setHcaptchaToken(token)}
                onExpire={() => setHcaptchaToken('')}
                onError={() => setHcaptchaToken('')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !hcaptchaToken || !formData.gdprConsent}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrerar...' : 'Skicka registrering'}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Efter registrering:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Ni får omedelbar tillgång till ert konto
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Sök och hitta samhällsprojekt som matchar era värderingar
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Kontakta föreningar och följ era bidrag från er dashboard
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
