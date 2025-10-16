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

  // Show only first 3 projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Stötta sociala projekt från lokala föreningar
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Kollektivly kopplar företag med verifierade samhällsprojekt. Snabbt, enkelt och modernt.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#foretag"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Jag är ett Företag
              </Link>
              <Link
                href="#foreningar"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white"
              >
                Jag är en Förening
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Value Prop Section */}
        <div className="py-16 grid md:grid-cols-2 gap-12">
          {/* For Företag */}
          <div id="foretag" className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
            <div className="text-4xl mb-4">🏢</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">För Företag</h2>
            <p className="text-lg text-gray-700 mb-6">
              Stötta lokala projekt med full kontroll och transparens
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-verifierade rapporter</h3>
                  <p className="text-gray-600 text-sm">Ingen manuell uppföljning behövs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Escrow-skydd</h3>
                  <p className="text-gray-600 text-sm">Pengarna släpps endast vid godkänd rapport</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Automatiska ESG-rapporter</h3>
                  <p className="text-gray-600 text-sm">Färdiga underlag för hållbarhetsredovisning</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-900 mb-2">Problem med traditionella bidrag:</h4>
              <ul className="space-y-1 text-sm text-red-800">
                <li>❌ Risk för missbruk av bidrag</li>
                <li>❌ Tidskrävande manuell uppföljning</li>
                <li>❌ Ingen garanti för resultat</li>
                <li>❌ Svårt att rapportera impact</li>
              </ul>
            </div>

            <Link
              href="/alla-projekt"
              className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Hitta projekt att stötta →
            </Link>
          </div>

          {/* For Föreningar */}
          <div id="foreningar" className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">För Föreningar</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nå företag snabbt och få finansiering till era projekt
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="text-purple-500 text-xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Blixtsnabb process</h3>
                  <p className="text-gray-600 text-sm">2 veckor istället för 6-12 månader</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-500 text-xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Garanterad betalning</h3>
                  <p className="text-gray-600 text-sm">Pengarna finns i escrow från dag 1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-500 text-xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Helt gratis att lista</h3>
                  <p className="text-gray-600 text-sm">Ingen kostnad för att publicera projekt</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Problem med kommunbidrag:</h4>
              <ul className="space-y-1 text-sm text-yellow-800">
                <li>⏰ Tar 6-12 månader att få svar</li>
                <li>📋 Krångliga ansökningsprocesser</li>
                <li>❓ Osäker finansiering år för år</li>
                <li>🐌 Långsam handläggning</li>
              </ul>
            </div>

            <Link
              href="/registrera"
              className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Registrera er förening (gratis) →
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Så funkar det</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En modern och snabb väg till verifierad samhällsnytta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Företag väljer projekt</h3>
              <p className="text-gray-600">
                Bläddra bland verifierade projekt som matchar era hållbarhetsmål
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pengarna går i escrow</h3>
              <p className="text-gray-600">
                Bidraget säkras direkt - föreningen kan starta projektet med trygghet
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI verifierar rapport</h3>
              <p className="text-gray-600">
                När projektet är klart verifieras rapporten automatiskt - betalning släpps
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-white rounded-lg shadow-md px-8 py-4 border-2 border-blue-600">
              <p className="text-lg font-semibold text-gray-900">
                ⚡ Resultat: Ingen rapport = ingen betalning. Full kontroll för företag, snabb process för föreningar.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Utvalda projekt just nu
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Upptäck lokala projekt som väntar på finansiering
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleCardClick}
                />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/alla-projekt"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Se alla {projects.length} projekt →
              </Link>
            </div>
          </div>
        )}

        {/* No Projects State */}
        {projects.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Inga projekt ännu - bli först!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Plattformen är redo. Lägg upp ert första projekt helt gratis och nå företag som vill göra skillnad.
            </p>
            <Link
              href="/registrera"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Registrera er förening (gratis) →
            </Link>
          </div>
        )}

        {/* Final CTA Section */}
        <div className="py-16 mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Redo att göra skillnad?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Gå med i Kollektivly idag och var med i den moderna vägen till samhällsnytta
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/alla-projekt"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Företag: Hitta projekt
              </Link>
              <Link
                href="/registrera"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Förening: Kom igång gratis
              </Link>
            </div>
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
