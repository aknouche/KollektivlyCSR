// @ts-nocheck - Temporary: Supabase SSR v0.7.0 has type inference issues with Database generic
// Email Verification API Route
// SECURITY: Section 4.1, 4.4 - Token verification

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const verifySchema = z.object({
  token: z.string().uuid()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = verifySchema.parse(body);

    const supabase = createAdminClient();

    // SECURITY: Section 4.4 - Verify token exists, not used, and not expired
    const { data: tokenData, error: tokenError } = await supabase
      .from('verification_tokens')
      .select('*, organizations(*)')
      .eq('token', token)
      .eq('type', 'EMAIL_VERIFICATION')
      .eq('used', false)
      .single();

    if (tokenError || !tokenData) {
      return NextResponse.json(
        { error: 'Ogiltig eller utgången verifieringslänk.' },
        { status: 400 }
      );
    }

    // Check if token expired
    const now = new Date();
    const expiresAt = new Date(tokenData.expires_at);
    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Verifieringslänken har gått ut. Begär en ny.' },
        { status: 400 }
      );
    }

    // SECURITY: Section 4.4 - Mark token as used (one-time use)
    const { error: updateTokenError } = await supabase
      .from('verification_tokens')
      .update({
        used: true,
        used_at: new Date().toISOString()
      })
      .eq('id', tokenData.id);

    if (updateTokenError) {
      console.error('Token update error:', updateTokenError);
      return NextResponse.json(
        { error: 'Ett fel uppstod vid verifiering.' },
        { status: 500 }
      );
    }

    // Mark organization email as verified
    const { error: updateOrgError } = await supabase
      .from('organizations')
      .update({
        email_verified: true,
        status: 'VERIFIED' // Changed from PENDING to VERIFIED
      })
      .eq('id', tokenData.organization_id);

    if (updateOrgError) {
      console.error('Organization update error:', updateOrgError);
      return NextResponse.json(
        { error: 'Ett fel uppstod vid verifiering.' },
        { status: 500 }
      );
    }

    // Create Supabase Auth user for magic link login
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: tokenData.organizations.email,
      email_confirm: true,
      user_metadata: {
        organization_id: tokenData.organization_id,
        organization_name: tokenData.organizations.organization_name
      }
    });

    if (!authError && authUser) {
      // Link auth user to organization
      await supabase
        .from('organizations')
        .update({ auth_user_id: authUser.user.id })
        .eq('id', tokenData.organization_id);
    }

    // Send welcome email with next steps
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: tokenData.organizations.email,
        subject: 'E-post verifierad - Nästa steg | Kollektivly',
        html: `
          <h1>E-post verifierad! 🎉</h1>
          <p>Hej ${tokenData.organizations.organization_name}!</p>
          <p>Din e-postadress har verifierats. Din ansökan granskas nu av vårt team.</p>

          <h2>Nästa steg:</h2>
          <ol>
            <li>Vi granskar din organisation (tar vanligtvis 1-2 arbetsdagar)</li>
            <li>Du får ett mejl när din organisation är godkänd</li>
            <li>Då kan du börja lägga upp projekt på Kollektivly</li>
          </ol>

          <h2>Under tiden:</h2>
          <ul>
            <li>Förbered ditt första projekt (beskrivning, budget, mål)</li>
            <li>Samla bilder och material</li>
            <li>Tänk på vilka FN:s hållbarhetsmål ni jobbar mot</li>
          </ul>

          <p>Om du har frågor, svara på detta mejl så hör vi av oss!</p>

          <br>
          <p>Med vänliga hälsningar,<br>Kollektivly teamet</p>
        `
      });
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Non-critical
    }

    // Notify admin about verification
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.ADMIN_EMAIL!,
        subject: `Organisation verifierad: ${tokenData.organizations.organization_name}`,
        html: `
          <h2>${tokenData.organizations.organization_name} har verifierat sin e-post</h2>
          <p><strong>E-post:</strong> ${tokenData.organizations.email}</p>
          <p><strong>Status:</strong> VERIFIED (väntar på admin-godkännande)</p>
          <p><strong>Nästa steg:</strong> Godkänn organisationen i admin-panelen så de kan börja lägga upp projekt.</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/organizations">Granska organisation</a></p>
        `
      });
    } catch (adminEmailError) {
      console.error('Admin notification error:', adminEmailError);
    }

    return NextResponse.json({
      message: 'E-post verifierad! Du får ett mejl när din organisation är godkänd.',
      organization: {
        id: tokenData.organization_id,
        name: tokenData.organizations.organization_name,
        status: 'VERIFIED'
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ogiltig token' },
        { status: 400 }
      );
    }

    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod.' },
      { status: 500 }
    );
  }
}
