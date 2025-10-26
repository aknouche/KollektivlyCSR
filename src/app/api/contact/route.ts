import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Force dynamic rendering for this route (required when using cookies)
export const dynamic = 'force-dynamic';

/**
 * Beta Contact API - Simplified for beta testing phase
 * - Gets company info from auth session (no manual input)
 * - Only requires project_id and message
 * - Sets status to BETA_INTEREST (hidden from föreningar during beta)
 * - Links to company_id for proper tracking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project_id, message } = body;

    // Validate required fields (simplified - only message and project_id)
    if (!project_id || !message) {
      return NextResponse.json(
        { error: 'Projekt och meddelande krävs' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json(
        { error: 'Du måste vara inloggad för att visa intresse' },
        { status: 401 }
      );
    }

    // Get company details from database using auth session
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, company_name, email, contact_person, phone_number')
      .eq('auth_user_id', session.user.id)
      .single<{ id: string; company_name: string; email: string; contact_person: string; phone_number: string | null }>();

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Företagsprofil hittades inte. Vänligen logga in igen.' },
        { status: 404 }
      );
    }

    // Get project and organization info
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, organization_id, projektnamn')
      .eq('id', project_id)
      .single<{ id: string; organization_id: string; projektnamn: string }>();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Projekt hittades inte' },
        { status: 404 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Insert contact message with company_id link and BETA_INTEREST status
    const contactData = {
      project_id: project.id,
      organization_id: project.organization_id,
      company_id: company.id, // Link to company for proper tracking
      company_name: company.company_name,
      company_email: company.email,
      contact_person: company.contact_person,
      phone_number: company.phone_number || null,
      message,
      sender_ip: ip,
      status: 'BETA_INTEREST' as const, // Beta status - hidden from föreningar
      sent_at: new Date().toISOString()
    };

    const { error: insertError } = await supabase
      .from('contact_messages')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(contactData as any);

    if (insertError) {
      console.error('Error inserting contact message:', insertError);
      return NextResponse.json(
        { error: 'Kunde inte spara intresseanmälan' },
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
      message: 'Intresse registrerat!'
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
