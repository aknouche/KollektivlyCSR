// @ts-nocheck
// Simplified Organization Registration with Supabase Auth
// SECURITY: Sections 3.1, 3.6, 5.1 of docs/SECURITY_ANALYSIS.md

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// SECURITY: Section 3.1 - Input validation with Zod
const registerSchema = z.object({
  organizationName: z.string().min(2).max(200).trim(),
  organizationNumber: z.string().regex(/^\d{6}-\d{4}$/).optional().or(z.literal('')),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(100),
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
  try {
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
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.HCAPTCHA_SECRET_KEY) {
      console.error('Missing hCaptcha secret key');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Get client IP
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Parse and validate
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

    // Create admin Supabase client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Check if email already exists in organizations table
    const { data: existingOrg } = await supabaseAdmin
      .from('organizations')
      .select('id, email')
      .eq('email', validated.email)
      .maybeSingle();

    if (existingOrg) {
      return NextResponse.json(
        { error: 'En organisation med denna e-post är redan registrerad.' },
        { status: 409 }
      );
    }

    // Step 1: Create auth user using admin API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: validated.email,
      password: validated.password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        organization_name: validated.organizationName,
        role: 'organization'
      }
    });

    if (authError) {
      console.error('Auth user creation error:', authError);

      // Check if user already exists in auth
      if (authError.message?.includes('already') || authError.message?.includes('exists')) {
        return NextResponse.json(
          { error: 'En användare med denna e-post finns redan.' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Ett fel uppstod vid skapande av konto. Försök igen.' },
        { status: 500 }
      );
    }

    if (!authData?.user) {
      console.error('No user data returned from auth creation');
      return NextResponse.json(
        { error: 'Ett fel uppstod vid skapande av konto. Försök igen.' },
        { status: 500 }
      );
    }

    // Step 2: Create organization profile
    const { data: organization, error: orgError } = await supabaseAdmin
      .from('organizations')
      .insert({
        auth_user_id: authData.user.id,
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
        status: 'APPROVED',
        email_verified: true
      })
      .select()
      .single();

    if (orgError) {
      console.error('Organization creation error:', orgError);

      // Clean up auth user if org creation fails
      try {
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      } catch (cleanupError) {
        console.error('Error cleaning up auth user:', cleanupError);
      }

      return NextResponse.json(
        { error: 'Ett fel uppstod vid registrering. Försök igen.' },
        { status: 500 }
      );
    }

    if (!organization) {
      console.error('No organization data returned');
      return NextResponse.json(
        { error: 'Ett fel uppstod vid registrering. Försök igen.' },
        { status: 500 }
      );
    }

    console.log('Registration successful:', organization.id);

    return NextResponse.json({
      message: 'Registrering lyckades!',
      organizationId: organization.id,
      email: organization.email
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues?.map((e) => e.message).join(', ') || 'Validation error';
      return NextResponse.json(
        { error: 'Ogiltiga uppgifter', details: errorMessages },
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
