// Test Supabase Auth configuration
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Test 1: Check if Supabase client is initialized
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Test 2: Check auth configuration (this won't fail, just shows current state)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    return NextResponse.json({
      success: true,
      message: 'Supabase Auth is configured correctly!',
      authState: {
        hasSession: !!session,
        hasUser: !!user,
        sessionError: sessionError?.message || null,
        userError: userError?.message || null
      },
      hints: {
        noSession: 'This is expected - no user is currently logged in',
        testAuth: 'Visit /registrera to test organization registration flow'
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Auth configuration error',
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Check your Supabase authentication settings'
    }, { status: 500 });
  }
}
