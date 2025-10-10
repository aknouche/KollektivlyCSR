import { createClient } from '@/lib/supabase/server';
import { projects as fallbackProjects } from '@/data/projects';
import HomePage from '@/components/HomePage';
import { Project } from '@/types';

export const revalidate = 60; // Revalidate every 60 seconds

// Type for database project query result
type DatabaseProject = {
  id: string;
  created_at: string;
  projektnamn: string;
  kort_beskrivning: string;
  full_beskrivning: string;
  csr_kategori: string;
  stad: string;
  budget: string;
  image_url: string | null;
  fn_mal: string[];
  view_count: number;
  status: string;
  badges: string[];
  organizations: {
    organization_name: string;
    city: string;
  } | null;
};

async function getPublishedProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();

    // Fetch only PUBLISHED projects with organization data
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        created_at,
        projektnamn,
        kort_beskrivning,
        full_beskrivning,
        csr_kategori,
        stad,
        budget,
        image_url,
        fn_mal,
        view_count,
        status,
        badges,
        organizations (
          organization_name,
          city
        )
      `)
      .eq('status', 'PUBLISHED')
      .order('created_at', { ascending: false })
      .limit(12)
      .returns<DatabaseProject[]>();

    if (error) {
      console.error('Error fetching projects:', error);
      return fallbackProjects; // Use static projects as fallback
    }

    if (!data || data.length === 0) {
      // If no projects in database, show static projects
      return fallbackProjects;
    }

    // Transform database projects to match frontend Project type
    const transformedProjects: Project[] = data.map((project, index) => {
      const orgName = project.organizations?.organization_name || 'Okänd organisation';

      // Format budget as string with "kr" suffix like the static data
      const budgetNumber = parseInt(project.budget) || 0;
      const budgetFormatted = `${budgetNumber.toLocaleString('sv-SE')} kr`;

      return {
        id: index + 1, // Use index for frontend display
        projektnamn: project.projektnamn,
        kortBeskrivning: project.kort_beskrivning,
        fullBeskrivning: project.full_beskrivning || project.kort_beskrivning,
        foreningsnamn: orgName,
        stad: project.stad,
        budget: budgetFormatted,
        csrKategori: project.csr_kategori as 'Miljö' | 'Ungdom' | 'Inkludering',
        fnMal: project.fn_mal,
        badges: (project.badges.length > 0
          ? project.badges.filter((b): b is 'NY' | 'POPULÄR' | 'VERIFIERAD' =>
              ['NY', 'POPULÄR', 'VERIFIERAD'].includes(b))
          : getBadgesForProject(project)) as Array<'NY' | 'POPULÄR' | 'VERIFIERAD'>,
        viewsLeft: project.view_count ? Math.max(0, 50 - (project.view_count % 50)) : undefined,
        imageUrl: project.image_url || undefined
      };
    });

    return transformedProjects;

  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return fallbackProjects; // Fallback to static projects on error
  }
}

// Helper function to determine badges based on project data
function getBadgesForProject(project: DatabaseProject): string[] {
  const badges: string[] = [];

  // Add "NY" badge if created in last 7 days
  const createdAt = new Date(project.created_at);
  const daysSinceCreated = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceCreated < 7) {
    badges.push('NY');
  }

  // Add "POPULÄR" if view count is high
  if (project.view_count > 100) {
    badges.push('POPULÄR');
  }

  // Always add "VERIFIERAD" for published projects
  badges.push('VERIFIERAD');

  return badges;
}

export default async function Home() {
  const projects = await getPublishedProjects();

  return <HomePage projects={projects} />;
}
