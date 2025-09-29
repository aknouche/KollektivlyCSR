'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { Project } from '@/types';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <header className="bg-gradient-to-br from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">CSR</span>
              </div>
            </div>

            {/* Title and value proposition */}
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              KollektivlyCSR
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Plattformen som kopplar samman företag med verifierade CSR-projekt från lokala organisationer.
              <span className="block mt-2 text-blue-600 font-semibold">Trovärdig, datadriven och skalbar samhällsnytta.</span>
            </p>

            {/* Success Metrics */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-600">Verifierade Projekt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2.3M kr</div>
                <div className="text-sm text-gray-600">Donerat via Plattformen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Företagspartners</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
                Bläddra bland alla projekt
              </button>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                Lägg till ditt projekt
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Projects Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rekommenderade Projekt
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Handplockade CSR-projekt från verifierade organisationer. Alla projekt har genomgått vår kvalitetsgranskning
            och matchar företags hållbarhetsmål enligt FN:s globala mål.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Hitta fler projekt eller lägg till ditt eget
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Utforska vårt kompletta projektbibliotek eller hjälp din organisation att nå fler företag genom vår plattform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Se alla 150+ projekt
            </button>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors">
              Registrera din organisation
            </button>
          </div>
        </div>
      </main>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
