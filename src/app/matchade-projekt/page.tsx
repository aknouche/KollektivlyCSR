'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import ProjectModal from '@/components/ProjectModal';
import { Project } from '@/types';

interface MatchingPreferences {
  companyName: string;
  companyEmail: string;
  categories: string[];
  unGoals: string[];
  budget: string;
  location: string;
  preferences: {
    localFocus: boolean;
    impactReporting: boolean;
    quickStart: boolean;
  };
}

interface ProjectWithScore extends Project {
  matchScore: number;
}

export default function MatchadeProjekt() {
  const router = useRouter();
  const [matchedProjects, setMatchedProjects] = useState<ProjectWithScore[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<MatchingPreferences | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const loadMatchingResults = useCallback(async () => {
    // Get preferences from localStorage
    const prefsStr = localStorage.getItem('matching_preferences');
    if (!prefsStr) {
      router.push('/matcha-projekt');
      return;
    }

    const prefs = JSON.parse(prefsStr);
    setPreferences(prefs);

    // Fetch all published projects
    const { data: projects } = await supabase
      .from('projects')
      .select(`
        id,
        projektnamn,
        kort_beskrivning,
        full_beskrivning,
        csr_kategori,
        stad,
        budget,
        fn_mal,
        badges,
        view_count,
        image_url,
        organizations!inner (organization_name)
      `)
      .eq('status', 'PUBLISHED')
      .order('created_at', { ascending: false });

    if (projects) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformed = projects.map((p: any, idx: number) => ({
        id: idx + 1,
        projektnamn: p.projektnamn,
        kortBeskrivning: p.kort_beskrivning,
        fullBeskrivning: p.full_beskrivning,
        foreningsnamn: p.organizations?.organization_name || 'Okänd',
        stad: p.stad,
        budget: `${parseInt(p.budget).toLocaleString('sv-SE')} kr`,
        csrKategori: p.csr_kategori as 'Miljö' | 'Ungdom' | 'Inkludering',
        fnMal: p.fn_mal,
        badges: p.badges as Array<'NY' | 'POPULÄR' | 'VERIFIERAD'>,
        viewsLeft: p.view_count ? Math.max(0, 50 - (p.view_count % 50)) : undefined,
        imageUrl: p.image_url || undefined
      }));

      setAllProjects(transformed);

      // Simple rule-based matching
      const matched = matchProjects(transformed, prefs);
      setMatchedProjects(matched);
    }

    setLoading(false);
  }, [router, supabase]);

  useEffect(() => {
    loadMatchingResults();
  }, [loadMatchingResults]);

  const matchProjects = (projects: Project[], prefs: MatchingPreferences) => {
    return projects
      .map(project => {
        let score = 0;

        // Category match (high weight)
        if (prefs.categories.includes(project.csrKategori)) {
          score += 50;
        }

        // FN goals match
        const matchingGoals = project.fnMal.filter((goal: string) =>
          prefs.unGoals.some((prefGoal: string) => goal.includes(prefGoal.split(':')[1]?.trim() || ''))
        );
        score += matchingGoals.length * 10;

        // Location match
        if (prefs.location && prefs.preferences.localFocus &&
            project.stad.toLowerCase().includes(prefs.location.toLowerCase())) {
          score += 30;
        }

        // Budget match
        if (prefs.budget) {
          const projectBudget = parseInt(project.budget.replace(/[^0-9]/g, ''));
          const prefBudget = parseInt(prefs.budget);
          const difference = Math.abs(projectBudget - prefBudget);
          const percentDiff = difference / prefBudget;

          if (percentDiff < 0.2) score += 20; // Within 20%
          else if (percentDiff < 0.5) score += 10; // Within 50%
        }

        return { ...project, matchScore: score };
      })
      .filter(p => p.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const getMatchPercentage = (score: number) => {
    const maxScore = 130; // 50 (category) + 50 (5 goals * 10) + 30 (location)
    return Math.min(Math.round((score / maxScore) * 100), 100);
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Matchar projekt...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dina matchande projekt</h1>
          <p className="text-gray-600">
            Vi hittade {matchedProjects.length} projekt som matchar era preferenser
          </p>
        </div>

        {/* Preferences Summary */}
        {preferences && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-3">Era preferenser</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {preferences.categories.length > 0 && (
                <div>
                  <p className="text-gray-600 mb-1">Kategorier</p>
                  <p className="font-medium text-gray-900">{preferences.categories.join(', ')}</p>
                </div>
              )}
              {preferences.budget && (
                <div>
                  <p className="text-gray-600 mb-1">Budget</p>
                  <p className="font-medium text-gray-900">{parseInt(preferences.budget).toLocaleString('sv-SE')} kr</p>
                </div>
              )}
              {preferences.location && (
                <div>
                  <p className="text-gray-600 mb-1">Plats</p>
                  <p className="font-medium text-gray-900">{preferences.location}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => router.push('/matcha-projekt')}
              className="mt-4 text-sm text-gray-600 hover:text-gray-900"
            >
              Ändra preferenser →
            </button>
          </div>
        )}

        {/* Matched Projects */}
        {matchedProjects.length > 0 ? (
          <div className="space-y-6">
            {matchedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.projektnamn}</h3>
                    <p className="text-gray-600 mb-3">{project.kortBeskrivning}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{project.foreningsnamn}</span>
                      <span>{project.stad}</span>
                      <span className="font-medium text-gray-900">{project.budget}</span>
                    </div>
                  </div>
                  <div className="ml-6 flex flex-col items-end">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {getMatchPercentage(project.matchScore)}% match
                    </div>
                    <button
                      onClick={() => handleCardClick(project)}
                      className="text-gray-900 font-medium hover:underline"
                    >
                      Visa detaljer →
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {project.csrKategori}
                  </span>
                  {project.fnMal.slice(0, 3).map((goal: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {goal}
                    </span>
                  ))}
                  {project.fnMal.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{project.fnMal.length - 3} mer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">Inga projekt matchade era kriterier</p>
            <Link
              href="/alla-projekt"
              className="inline-block text-gray-900 font-medium hover:underline"
            >
              Bläddra bland alla projekt →
            </Link>
          </div>
        )}

        {/* Other Projects */}
        {matchedProjects.length > 0 && allProjects.length > matchedProjects.length && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Andra projekt</h2>
            <Link
              href="/alla-projekt"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Se alla {allProjects.length} projekt →
            </Link>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
