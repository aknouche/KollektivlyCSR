import { createClient } from '@/lib/supabase/server';
import { projects as fallbackProjects } from '@/data/projects';
import AllaProjectPage from '@/components/AllaProjectPage';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

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
      .returns<DatabaseProject[]>();

    if (error) {
      console.error('Error fetching projects:', error);
      return fallbackProjects;
    }

    if (!data || data.length === 0) {
      return fallbackProjects;
    }

    const transformedProjects: Project[] = data.map((project, index) => {
      const orgName = project.organizations?.organization_name || 'Okänd organisation';
      const budgetNumber = parseInt(project.budget) || 0;
      const budgetFormatted = `${budgetNumber.toLocaleString('sv-SE')} kr`;

      return {
        id: index + 1,
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
    return fallbackProjects;
  }
}

function getBadgesForProject(project: DatabaseProject): string[] {
  const badges: string[] = [];

  const createdAt = new Date(project.created_at);
  const daysSinceCreated = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceCreated < 7) {
    badges.push('NY');
  }

  if (project.view_count > 100) {
    badges.push('POPULÄR');
  }

  badges.push('VERIFIERAD');

  return badges;
}

export default async function AllaProject() {
  const projects = await getPublishedProjects();

  return <AllaProjectPage projects={projects} />;
}
