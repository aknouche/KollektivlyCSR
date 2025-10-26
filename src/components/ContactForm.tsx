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
  projectId,
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

    console.log('[ContactForm] Submitting with projectId:', projectId);

    try {
      const requestBody = {
        project_id: projectId,
        ...formData
      };
      console.log('[ContactForm] Request body:', requestBody);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('[ContactForm] Response status:', response.status);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Något gick fel');
      }

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
