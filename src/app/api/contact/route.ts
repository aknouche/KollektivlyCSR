import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      project_id,
      company_name,
      company_email,
      contact_person,
      phone_number,
      message
    } = body;

    console.log('[Contact API] Received request:', {
      project_id,
      company_name,
      company_email,
      contact_person,
      has_message: !!message
    });

    // Validate required fields
    if (!project_id || !company_name || !company_email || !contact_person || !message) {
      console.error('[Contact API] Missing required fields');
      return NextResponse.json(
        { error: 'Alla obligatoriska fält måste fyllas i' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(company_email)) {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress' },
        { status: 400 }
      );
    }

    // Create Supabase client directly in the route handler
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // Not needed for this route
          },
          remove(name: string, options: CookieOptions) {
            // Not needed for this route
          },
        },
      }
    );

    // Get project and organization info
    console.log('[Contact API] Looking up project with id:', project_id);
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, organization_id, projektnamn')
      .eq('id', project_id)
      .single<{ id: string; organization_id: string; projektnamn: string }>();

    console.log('[Contact API] Project lookup result:', {
      found: !!project,
      error: projectError?.message,
      projectData: project
    });

    if (projectError || !project) {
      console.error('[Contact API] Project not found:', {
        project_id,
        error: projectError
      });
      return NextResponse.json(
        { error: 'Projekt hittades inte' },
        { status: 404 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Insert contact message
    const contactData = {
      project_id: project.id,
      organization_id: project.organization_id,
      company_name,
      company_email,
      contact_person,
      phone_number: phone_number || null,
      message,
      sender_ip: ip,
      status: 'SENT' as const,
      sent_at: new Date().toISOString()
    };

    const { error: insertError } = await supabase
      .from('contact_messages')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(contactData as any);

    if (insertError) {
      console.error('Error inserting contact message:', insertError);
      return NextResponse.json(
        { error: 'Kunde inte skicka meddelande' },
        { status: 500 }
      );
    }

    // Increment project contact count
    try {
      await supabase.rpc('increment_project_contact_count', {
        project_uuid: project.id
      } as never);
    } catch (error) {
      console.warn('Failed to increment contact count:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Meddelande skickat!'
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
