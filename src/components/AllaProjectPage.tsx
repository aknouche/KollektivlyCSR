'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { Project } from '@/types';

interface AllaProjectPageProps {
  projects: Project[];
}

export default function AllaProjectPage({ projects }: AllaProjectPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Extract unique values for filters
  const categories = useMemo(() =>
    Array.from(new Set(projects.map(p => p.csrKategori))).sort(),
    [projects]
  );

  const cities = useMemo(() =>
    Array.from(new Set(projects.map(p => p.stad))).sort(),
    [projects]
  );

  const allGoals = useMemo(() => {
    const goals = new Set<string>();
    projects.forEach(p => p.fnMal.forEach(goal => goals.add(goal)));
    return Array.from(goals).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === '' ||
        project.projektnamn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.kortBeskrivning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.foreningsnamn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || project.csrKategori === selectedCategory;
      const matchesCity = selectedCity === '' || project.stad === selectedCity;
      const matchesGoal = selectedGoal === '' || project.fnMal.includes(selectedGoal);

      return matchesSearch && matchesCategory && matchesCity && matchesGoal;
    });
  }, [projects, searchQuery, selectedCategory, selectedCity, selectedGoal]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedGoal('');
  };

  const activeFiltersCount = [selectedCategory, selectedCity, selectedGoal].filter(f => f !== '').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Hem</Link>
            <span>/</span>
            <span className="text-gray-900">Alla projekt</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Alla projekt
          </h1>
          <p className="text-gray-600">
            {filteredProjects.length} av {projects.length} projekt
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Sök projekt, förening..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="">Alla kategorier</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="">Alla städer</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="">Alla FN-mål</option>
              {allGoals.map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Rensa filter ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">Inga projekt matchar dina filter</p>
            <button
              onClick={clearFilters}
              className="text-gray-900 font-medium hover:underline"
            >
              Rensa filter
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
