'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
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

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
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

            {/* Content */}
            <div className="p-6 space-y-6">
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

              {/* CSR Category */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  CSR-kategori
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
              <p className="text-sm text-gray-600 text-center">
                Kontakta {project.foreningsnamn} för mer information om detta projekt
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;