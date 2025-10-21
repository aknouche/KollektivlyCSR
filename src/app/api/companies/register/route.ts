import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      company_name,
      email,
      contact_person,
      phone_number,
      password,
      city,
      gdpr_consent
    } = body;

    // Validation
    if (!company_name || !email || !contact_person || !password) {
      return NextResponse.json(
        { error: 'Saknade obligatoriska fält' },
        { status: 400 }
      );
    }

    if (!gdpr_consent) {
      return NextResponse.json(
        { error: 'Du måste godkänna hantering av personuppgifter' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Check if company already exists
    const { data: existingCompany } = await supabase
      .from('companies')
      .select('id')
      .eq('email', email)
      .single();

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Ett företag med denna e-postadress finns redan' },
        { status: 400 }
      );
    }

    // Create auth user (email verification disabled for testing)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name,
          contact_person,
          user_type: 'company'
        },
        emailRedirectTo: `${request.nextUrl.origin}/auth/confirm`,
        // Disable email verification for now
        emailConfirm: false
      }
    });

    if (authError) {
      console.error('Auth error:', authError);

      // Provide more specific error messages
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Denna e-postadress är redan registrerad. Försök logga in istället.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: `Registrering misslyckades: ${authError.message}` },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Kunde inte skapa användare' },
        { status: 500 }
      );
    }

    // Create company record
    const { error: dbError } = await supabase
      .from('companies')
      .insert({
        company_name,
        email,
        contact_person,
        phone_number,
        city,
        gdpr_consent,
        consent_date: new Date().toISOString(),
        auth_user_id: authData.user.id,
        email_verified: true // Auto-verified for testing
      });

    if (dbError) {
      console.error('Database error:', dbError);

      // Check if it's a missing table error
      if (dbError.message.includes('relation "companies" does not exist')) {
        return NextResponse.json(
          { error: 'Databastabellen finns inte. Kontakta support eller kör migrations.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: `Databasfel: ${dbError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registrering lyckades! Du kan nu logga in.',
      user: authData.user
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
