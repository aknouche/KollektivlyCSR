'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'bookmark' | 'contact' | 'notifications';
  projectName?: string;
}

export default function AuthPrompt({ isOpen, onClose, action, projectName }: AuthPromptProps) {
  const getContent = () => {
    switch (action) {
      case 'bookmark':
        return {
          icon: '🔖',
          title: 'Spara projekt till favoriter',
          description: projectName
            ? `Vill du spara "${projectName}" till dina favoriter?`
            : 'Vill du spara detta projekt till dina favoriter?',
          benefits: [
            'Snabb åtkomst till sparade projekt',
            'Få notiser om uppdateringar',
            'Bygg din projektportfölj'
          ]
        };
      case 'contact':
        return {
          icon: '📧',
          title: 'Kontakta föreningen',
          description: projectName
            ? `Vill du kontakta föreningen bakom "${projectName}"?`
            : 'Vill du kontakta föreningen bakom detta projekt?',
          benefits: [
            'Direkt kontakt med föreningar',
            'Diskutera projektdetaljer',
            'Starta samarbete snabbt'
          ]
        };
      case 'notifications':
        return {
          icon: '🔔',
          title: 'Aktivera notiser',
          description: 'Vill du få notiser om nya matchande projekt?',
          benefits: [
            'Få nya projekt direkt till din inkorg',
            'Missa aldrig relevanta projekt',
            'Anpassade efter dina preferenser'
          ]
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{content.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {content.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-lg text-gray-700 mb-6">
                {content.description}
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Med ett konto får du:</h3>
                <ul className="space-y-2">
                  {content.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/registrera"
                  className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Skapa konto (gratis) →
                </Link>
                <Link
                  href="/logga-in"
                  className="block w-full text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Har redan konto? Logga in
                </Link>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Registrering tar mindre än 2 minuter
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
