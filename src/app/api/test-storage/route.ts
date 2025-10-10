// Test Supabase Storage configuration
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Use service role for admin operations
    const supabaseAdmin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Test 1: Check if storage buckets exist
    const { data: buckets, error: bucketsError } = await supabaseAdmin
      .storage
      .listBuckets();

    if (bucketsError) {
      return NextResponse.json({
        success: false,
        message: 'Failed to access storage',
        error: bucketsError.message,
        hint: 'Check your SUPABASE_SERVICE_ROLE_KEY in .env.local'
      }, { status: 500 });
    }

    // Test 2: Check if 'project-images' bucket exists
    const projectImagesBucket = buckets?.find(b => b.name === 'project-images');

    if (!projectImagesBucket) {
      return NextResponse.json({
        success: false,
        message: 'Storage bucket "project-images" not found',
        hint: 'Create bucket in Supabase Dashboard: Storage > New Bucket > name: project-images, public: true',
        foundBuckets: buckets?.map(b => b.name) || []
      }, { status: 404 });
    }

    // Test 3: Try to list files in bucket (tests read access)
    const { error: filesError } = await supabaseAdmin
      .storage
      .from('project-images')
      .list('', { limit: 1 });

    return NextResponse.json({
      success: true,
      message: 'Storage configured correctly!',
      storage: {
        bucketsFound: buckets?.length || 0,
        projectImagesBucket: {
          name: projectImagesBucket.name,
          public: projectImagesBucket.public,
          id: projectImagesBucket.id,
          canRead: !filesError
        },
        allBuckets: buckets?.map(b => ({ name: b.name, public: b.public })) || []
      },
      hints: {
        uploadTest: 'Storage is ready for file uploads',
        bucketIsPublic: projectImagesBucket.public ? 'Yes - images will be publicly accessible' : 'No - make bucket public in Supabase dashboard'
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Storage test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      hint: 'Check your SUPABASE_SERVICE_ROLE_KEY in .env.local'
    }, { status: 500 });
  }
}
