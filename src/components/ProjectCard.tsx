'use client';

import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
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

  return (
    <div
      onClick={() => onClick(project)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 overflow-hidden"
    >
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
  );
};

export default ProjectCard;