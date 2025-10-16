'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import AuthPrompt from './AuthPrompt';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const getBadgeColor = (badge: 'NY' | 'POPULÄR' | 'VERIFIERAD') => {
    switch (badge) {
      case 'NY':
        return 'bg-yellow-100 text-yellow-800';
      case 'POPULÄR':
        return 'bg-orange-100 text-orange-800';
      case 'VERIFIERAD':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAuthPrompt(true);
  };

  return (
    <>
      <div
        onClick={() => onClick(project)}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 overflow-hidden relative"
      >
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          title="Spara till favoriter"
        >
          {isBookmarked ? (
            <svg className="w-6 h-6 text-blue-600 fill-current" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
          )}
        </button>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="h-48 w-full overflow-hidden relative">
            <Image
              src={project.imageUrl}
              alt={project.projektnamn}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          {/* Interaktionspsykologi badges */}
          {project.badges && project.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {project.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-bold uppercase ${getBadgeColor(badge)}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {project.projektnamn}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">{project.foreningsnamn}</span>
            <span>{project.stad}</span>
          </div>

          {/* Scarcity-element */}
          {project.viewsLeft !== undefined && (
            <div className="text-xs text-red-600 font-medium">
              Visningar kvar: {project.viewsLeft}
            </div>
          )}
        </div>

        {/* Project Dates */}
        {(project.start_date || project.end_date) && (
          <div className="mb-3 text-sm text-gray-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {project.start_date && project.end_date ? (
              <span>{new Date(project.start_date).toLocaleDateString('sv-SE')} - {new Date(project.end_date).toLocaleDateString('sv-SE')}</span>
            ) : project.start_date ? (
              <span>Startar: {new Date(project.start_date).toLocaleDateString('sv-SE')}</span>
            ) : (
              <span>Slutar: {new Date(project.end_date!).toLocaleDateString('sv-SE')}</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.kortBeskrivning}
        </p>

        {/* Badges */}
        <div className="space-y-2">
          {/* CSR Category */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.csrKategori)}`}>
              {project.csrKategori}
            </span>
          </div>

          {/* FN Goals */}
          <div className="flex flex-wrap gap-1">
            {project.fnMal.slice(0, 2).map((mal, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                {mal}
              </span>
            ))}
            {project.fnMal.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                +{project.fnMal.length - 2} till
              </span>
            )}
          </div>
        </div>
      </div>
    </div>

      {/* Auth Prompt Modal */}
      <AuthPrompt
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        action="bookmark"
        projectName={project.projektnamn}
      />
    </>
  );
};

export default ProjectCard;