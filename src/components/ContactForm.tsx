'use client';

import { useState } from 'react';

interface ContactFormProps {
  projectId: string; // UUID from Supabase
  projectName: string;
  organizationName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ContactForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  projectId, // Currently unused in demo mode, will be used for API calls in production
  projectName,
  organizationName,
  onSuccess,
  onCancel
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    company_name: '',
    company_email: '',
    contact_person: '',
    phone_number: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // MVP DEMO MODE: Mock success without API call
    // This provides a smooth demo experience without backend dependencies
    try {
      // Simulate realistic network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Validate required fields
      if (!formData.company_name || !formData.company_email || !formData.contact_person || !formData.message) {
        throw new Error('Alla obligatoriska fält måste fyllas i');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.company_email)) {
        throw new Error('Ogiltig e-postadress');
      }

      // Log for demo tracking (optional - can be removed)
      console.log('📧 [DEMO] Contact message sent:', {
        project: projectName,
        organization: organizationName,
        from: formData.company_name
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett oväntat fel uppstod');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Kontakta <span className="font-semibold">{organizationName}</span> om projektet{' '}
          <span className="font-semibold">{projectName}</span>
        </p>
      </div>

      <div>
        <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
          Företagsnamn *
        </label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          required
          autoComplete="organization"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-1">
          Kontaktperson *
        </label>
        <input
          type="text"
          id="contact_person"
          name="contact_person"
          required
          autoComplete="name"
          value={formData.contact_person}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="company_email" className="block text-sm font-medium text-gray-700 mb-1">
          E-post *
        </label>
        <input
          type="email"
          id="company_email"
          name="company_email"
          required
          autoComplete="email"
          value={formData.company_email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          autoComplete="tel"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Meddelande *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Avbryt
          </button>
        )}
      </div>
    </form>
  );
}
