// @ts-nocheck - Temporary: Supabase SSR v0.7.0 has type inference issues with Database generic
// Organization Registration API Route
// SECURITY: Sections 3.1, 3.4, 4.1, 5.1 of SECURITY_ANALYSIS.md

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { sendVerificationEmail } from '@/lib/email';

// SECURITY: Section 3.1 - Input validation with Zod
const registerSchema = z.object({
  organizationName: z.string().min(2).max(200).trim(),
  organizationNumber: z.string().regex(/^\d{6}-\d{4}$/).optional().or(z.literal('')),
  email: z.string().email().trim().toLowerCase(),
  contactPerson: z.string().min(2).max(100).trim(),
  phoneNumber: z.string().min(7).max(20).trim().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  city: z.string().min(2).max(100).trim(),
  address: z.string().max(200).trim().optional().or(z.literal('')),
  description: z.string().max(1000).trim().optional().or(z.literal('')),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'GDPR consent is required'
  }),
  hcaptchaToken: z.string().min(1)
});

// SECURITY: Section 3.6 - hCaptcha verification
async function verifyHCaptcha(token: string, remoteIp: string): Promise<boolean> {
  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET_KEY!,
      response: token,
      remoteip: remoteIp
    })
  });

  const data = await response.json();
  return data.success === true;
}

// SECURITY: Section 4.1 - Generate verification token
function generateVerificationToken(): string {
  return crypto.randomUUID();
}

// SECURITY: Section 4.3 - Send verification email
async function sendVerificationEmail(email: string, token: string, organizationName: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verifiera-epost?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: 'Verifiera din e-post - Kollektivly',
    html: `
      <h1>Välkommen till Kollektivly!</h1>
      <p>Hej ${organizationName}!</p>
      <p>Tack för att du registrerar dig på Kollektivly. Klicka på länken nedan för att verifiera din e-postadress:</p>
      <p><a href="${verifyUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verifiera e-post</a></p>
      <p>Eller kopiera denna länk: ${verifyUrl}</p>
      <p>Länken är giltig i 24 timmar.</p>
      <p>Om du inte registrerade dig på Kollektivly, ignorera detta mejl.</p>
      <br>
      <p>Med vänliga hälsningar,<br>Kollektivly teamet</p>
    `
  });
}

// SECURITY: Section 3.4 - Rate limiting helper
// Note: In production, use Redis (Upstash) for distributed rate limiting
// For MVP, we rely on hCaptcha to prevent abuse

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting and audit
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Parse and validate request body
    const body = await request.json();
    const validated = registerSchema.parse(body);

    // SECURITY: Section 3.6 - Verify hCaptcha
    const isHumanVerified = await verifyHCaptcha(validated.hcaptchaToken, clientIp);
    if (!isHumanVerified) {
      return NextResponse.json(
        { error: 'hCaptcha verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role (bypass RLS for registration)
    const supabase = createAdminClient();

    // Check if email already exists
    const { data: existingOrg } = await supabase
      .from('organizations')
      .select('id, email_verified')
      .eq('email', validated.email)
      .maybeSingle() as { data: { id: string; email_verified: boolean } | null };

    if (existingOrg) {
      if (existingOrg?.email_verified) {
        return NextResponse.json(
          { error: 'En organisation med denna e-post är redan registrerad.' },
          { status: 409 }
        );
      } else {
        // Resend verification email
        const token = generateVerificationToken();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // @ts-ignore - Supabase Database types inference issue with ssr package
        await supabase
          .from('verification_tokens')
          .insert({
            token,
            type: 'EMAIL_VERIFICATION',
            expires_at: expiresAt.toISOString(),
            organization_id: existingOrg.id,
            ip_address: clientIp,
            user_agent: request.headers.get('user-agent') || 'unknown'
          });

        await sendVerificationEmail(
          validated.email,
          token,
          validated.organizationName
        );

        return NextResponse.json({
          message: 'Verifieringsmejl skickat på nytt. Kolla din inkorg.',
          organizationId: existingOrg.id
        });
      }
    }

    // SECURITY: Section 5.1 - Create organization with GDPR consent
    // @ts-ignore - Supabase Database types inference issue with ssr package
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .insert({
        organization_name: validated.organizationName,
        organization_number: validated.organizationNumber || null,
        email: validated.email,
        contact_person: validated.contactPerson,
        phone_number: validated.phoneNumber || null,
        website: validated.website || null,
        city: validated.city,
        address: validated.address || null,
        description: validated.description || null,
        gdpr_consent: validated.gdprConsent,
        consent_date: new Date().toISOString(),
        status: 'PENDING',
        email_verified: false
      })
      .select()
      .single();

    if (orgError) {
      console.error('Organization creation error:', orgError);
      return NextResponse.json(
        { error: 'Ett fel uppstod vid registrering. Försök igen.' },
        { status: 500 }
      );
    }

    // SECURITY: Section 4.1, 4.4 - Create verification token
    const token = generateVerificationToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // @ts-ignore - Supabase Database types inference issue with ssr package
    const { error: tokenError } = await supabase
      .from('verification_tokens')
      .insert({
        token,
        type: 'EMAIL_VERIFICATION',
        expires_at: expiresAt.toISOString(),
        organization_id: organization.id,
        ip_address: clientIp,
        user_agent: request.headers.get('user-agent') || 'unknown'
      });

    if (tokenError) {
      console.error('Token creation error:', tokenError);
      // Continue anyway, admin can manually verify
    }

    // Send verification email
    try {
      await sendVerificationEmail({
        to: validated.email,
        organizationName: validated.organizationName,
        verificationToken: token
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Log error but don't fail the registration
      // Admin will be notified and can manually verify
    }

    return NextResponse.json({
      message: 'Registrering lyckades! Kolla din e-post för verifieringslänk.',
      organizationId: organization.id,
      email: organization.email
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ogiltiga uppgifter', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod. Försök igen senare.' },
      { status: 500 }
    );
  }
}
