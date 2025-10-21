'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '@/types';
import ContactForm from './ContactForm';
import { createBrowserClient } from '@supabase/ssr';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const router = useRouter();
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setCheckingAuth(false);
    }
  }

  const getCategoryColor = (category: Project['csrKategori']) => {
    switch (category) {
      case 'Miljö':
        return 'bg-green-100 text-green-800';
      case 'Ungdom':
        return 'bg-blue-100 text-blue-800';
      case 'Inkludering':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContactClick = () => {
    if (!isLoggedIn) {
      // Redirect to login page with return URL
      router.push(`/logga-in?redirect=/alla-projekt`);
      return;
    }
    setShowContactForm(true);
  };

  const handleSupportClick = () => {
    if (!isLoggedIn) {
      // Redirect to login page with return URL
      router.push(`/logga-in?redirect=/stod-projekt/${project?.id}`);
      return;
    }
    // If logged in, proceed to support page
    router.push(`/stod-projekt/${project?.id}`);
  };

  const handleContactSuccess = () => {
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setShowContactForm(false);
      onClose();
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowContactForm(false);
    setContactSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.projektnamn}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-medium">{project.foreningsnamn}</span>
                    <span>{project.stad}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Success Message */}
            {contactSuccess && (
              <div className="p-6 bg-green-50 border-b border-green-200">
                <p className="text-green-800 font-medium text-center">
                  Meddelande skickat! Föreningen kontaktar dig inom kort.
                </p>
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Dates */}
              {(project.start_date || project.end_date) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Projektperiod
                  </h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {project.start_date && project.end_date ? (
                      <span>{new Date(project.start_date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(project.end_date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    ) : project.start_date ? (
                      <span>Startar: {new Date(project.start_date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    ) : (
                      <span>Slutar: {new Date(project.end_date!).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Projektbeskrivning
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.fullBeskrivning}
                </p>
              </div>

              {/* Budget */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Budget
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {project.budget}
                </p>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Samhällskategori
                </h3>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(project.csrKategori)}`}>
                  {project.csrKategori}
                </span>
              </div>

              {/* FN Goals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  FN:s globala mål
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.fnMal.map((mal, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {mal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl">
              {!showContactForm && !contactSuccess && (
                <>
                  {!isLoggedIn && !checkingAuth && (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900 font-medium mb-2 text-center">
                        🔒 Logga in för att kontakta eller stödja detta projekt
                      </p>
                      <button
                        onClick={() => router.push('/logga-in?redirect=/alla-projekt')}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                      >
                        Logga in
                      </button>
                    </div>
                  )}
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={handleSupportClick}
                      disabled={!isLoggedIn && !checkingAuth}
                      className={`flex-1 text-center px-6 py-3 rounded-md font-medium transition-colors ${
                        isLoggedIn || checkingAuth
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Stöd detta projekt
                    </button>
                    <button
                      onClick={handleContactClick}
                      disabled={!isLoggedIn && !checkingAuth}
                      className={`flex-1 border-2 px-6 py-3 rounded-md font-medium transition-colors ${
                        isLoggedIn || checkingAuth
                          ? 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Kontakta
                    </button>
                  </div>
                  {isLoggedIn && (
                    <p className="text-sm text-gray-600 text-center">
                      Bidra med escrow-betalning eller kontakta föreningen
                    </p>
                  )}
                </>
              )}

              {showContactForm && !contactSuccess && (
                <ContactForm
                  projectId={project.id}
                  projectName={project.projektnamn}
                  organizationName={project.foreningsnamn}
                  onSuccess={handleContactSuccess}
                  onCancel={() => setShowContactForm(false)}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;