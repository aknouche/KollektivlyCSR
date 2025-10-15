'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { Project } from '@/types';

interface HomePageProps {
  projects: Project[];
}

export default function HomePage({ projects }: HomePageProps) {
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

  // Calculate real metrics from projects
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((sum, p) => {
    const budget = typeof p.budget === 'string' ? parseInt(p.budget) : p.budget;
    return sum + (budget || 0);
  }, 0);
  const verifiedProjects = projects.filter(p => p.badges?.includes('VERIFIERAD')).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <header className="bg-gradient-to-br from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
            </div>

            {/* Title and value proposition */}
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Kollektivly
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Plattformen som kopplar samman företag med projekt från lokala organisationer som bidrar till hållbar utveckling och samhällsnytta.
              <span className="block mt-2 text-blue-600 font-semibold">Enkel väg till hållbar utveckling och meningsfull samhällsnytta.</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/alla-projekt"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Bläddra bland alla projekt
              </Link>
              <Link
                href="/lagg-till-projekt"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Lägg till ditt projekt, helt gratis!
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Projects Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {projects.length > 0 ? 'Rekommenderade Projekt' : 'Inga projekt ännu'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {projects.length > 0
              ? 'Handplockade projekt från verifierade organisationer. Alla projekt har genomgått vår kvalitetsgranskning och matchar företags hållbarhetsmål enligt FN:s globala mål.'
              : 'Bli den första att lägga till ett projekt på plattformen!'}
          </p>
        </div>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">Inga projekt eller event har publicerats ännu.</p>
            <Link
              href="/lagg-till-projekt"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Lägg till första projektet eller eventet. Det är helt gratis.
            </Link>
          </div>
        )}

        {/* Bottom Call-to-Action with Metrics */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 text-center border border-blue-100">
          {/* Trust Metrics - Real data from database */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalProjects}</div>
              <div className="text-sm text-gray-600">Publicerade Projekt och Event</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {(totalBudget / 1000000).toFixed(1)}M kr
              </div>
              <div className="text-sm text-gray-600">Total budget</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{verifiedProjects}</div>
              <div className="text-sm text-gray-600">Verifierade Projekt och Event</div>
            </div>
          </div>

          {/* Trust Statement */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Trovärdig, datadriven och skalbar samhällsnytta
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Alla projekt och event är verifierade, handplockade och matchade enligt FN:s globala mål.
              Gör skillnad genom vårt kvalitetssäkrade nätverk av organisationer.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/alla-projekt"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Se alla {totalProjects} projekt och event
            </Link>
            <Link
              href="/registrera"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Kom igång idag. Registrera din organisation och lägg upp era projekt. Det är helt gratis.
            </Link>
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
