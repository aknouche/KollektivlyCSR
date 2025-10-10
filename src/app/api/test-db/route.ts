// Test database connection
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Test 1: Check if organizations table exists
    const { data: orgs, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .limit(1);

    if (orgError) {
      return NextResponse.json({
        success: false,
        message: 'Database tables not found. Run the migration SQL in Supabase dashboard.',
        error: orgError.message,
        hint: 'Open SUPABASE_SETUP.md and follow Step 3: Run Database Migration'
      }, { status: 500 });
    }

    // Test 2: Check if projects table exists
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (projectError) {
      return NextResponse.json({
        success: false,
        message: 'Projects table not found',
        error: projectError.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      stats: {
        organizationsCount: orgs?.length || 0,
        projectsCount: projects?.length || 0,
        tablesFound: ['organizations', 'projects']
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to Supabase',
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    }, { status: 500 });
  }
}
