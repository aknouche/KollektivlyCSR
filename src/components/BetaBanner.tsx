'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem('beta-banner-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('beta-banner-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧪</span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-semibold text-sm sm:text-base">
                Beta Version
              </span>
              <span className="hidden sm:inline text-white/60">•</span>
              <span className="text-sm text-white/90">
                Kollektivly beta. Vi testar och utvärderar plattformen. Full funktionalitet med betalningar, verifiering, rapportering mm. släpps inom kort.
              </span>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Stäng banner"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Stäng</span>
          </button>
        </div>
      </div>
    </div>
  );
}
