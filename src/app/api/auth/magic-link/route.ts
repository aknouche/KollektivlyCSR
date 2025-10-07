// @ts-nocheck - Temporary: Supabase SSR v0.7.0 has type inference issues with Database generic
// Magic Link Authentication API Route
// SECURITY: Passwordless authentication via email

export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';

const magicLinkSchema = z.object({
  email: z.string().email().trim().toLowerCase()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = magicLinkSchema.parse(body);

    const supabase = createAdminClient();

    // Check if organization exists and is approved
    const { data: organization } = await supabase
      .from('organizations')
      .select('id, organization_name, email_verified, status')
      .eq('email', email)
      .maybeSingle() as { data: { id: string; organization_name: string; email_verified: boolean; status: string } | null };

    if (!organization) {
      return NextResponse.json(
        { error: 'Ingen organisation hittades med denna e-post. Registrera dig först.' },
        { status: 404 }
      );
    }

    if (!organization.email_verified) {
      return NextResponse.json(
        { error: 'E-post inte verifierad. Kolla din inkorg för verifieringslänk.' },
        { status: 403 }
      );
    }

    if (organization.status === 'PENDING' || organization.status === 'VERIFIED') {
      return NextResponse.json(
        { error: 'Din organisation väntar på godkännande från admin. Du kan inte logga in än.' },
        { status: 403 }
      );
    }

    if (organization.status === 'SUSPENDED' || organization.status === 'REJECTED') {
      return NextResponse.json(
        { error: 'Din organisation har inte tillgång till plattformen. Kontakta admin för mer info.' },
        { status: 403 }
      );
    }

    // Send magic link using Supabase Auth
    const { error: magicLinkError } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
        shouldCreateUser: false, // Don't create new user, must exist from registration
        data: {
          organization_id: organization.id,
          organization_name: organization.organization_name
        }
      }
    });

    if (magicLinkError) {
      console.error('Magic link error:', magicLinkError);
      return NextResponse.json(
        { error: 'Kunde inte skicka inloggningslänk. Försök igen.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Inloggningslänk skickad till din e-post!',
      email: email
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress' },
        { status: 400 }
      );
    }

    console.error('Magic link request error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod. Försök igen senare.' },
      { status: 500 }
    );
  }
}
