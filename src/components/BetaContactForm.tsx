'use client';

import { useState } from 'react';

interface BetaContactFormProps {
  projectId: string;
  projectName: string;
  organizationName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * Simplified contact form for beta testing phase
 * - Auto-fills company info from logged-in session
 * - Only requires message from user
 * - Saves to database for stats tracking
 * - No communication to föreningar during beta
 */
export default function BetaContactForm({
  projectId,
  projectName,
  organizationName,
  onSuccess,
  onCancel
}: BetaContactFormProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: projectId,
          message
        })
      });

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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900 font-medium mb-1">
            🧪 Beta-testfunktion
          </p>
          <p className="text-xs text-blue-700">
            Ditt intresse sparas på din dashboard för spårning. Under beta-fasen skickas inga meddelanden till föreningar.
          </p>
        </div>

        <p className="text-sm text-gray-700 mb-2">
          Visa intresse för projektet <span className="font-semibold">{projectName}</span> hos{' '}
          <span className="font-semibold">{organizationName}</span>
        </p>
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Beskriv varför ni är intresserade av detta projekt..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          Dina företagsuppgifter hämtas automatiskt från ditt konto
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="flex-1 bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Sparar...' : 'Visa intresse'}
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
