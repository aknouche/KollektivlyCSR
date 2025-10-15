// @ts-nocheck - Supabase type inference issues with direct client creation
// Simplified Organization Registration with Supabase Auth
// SECURITY: Sections 3.1, 3.6, 5.1 of docs/SECURITY_ANALYSIS.md

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/database.types';

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

    // Create Supabase client with service role
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Step 1: Create auth user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: validated.email,
      password: validated.password,
      email_confirm: true, // Auto-confirm email (no verification needed)
      user_metadata: {
        organization_name: validated.organizationName,
        role: 'organization'
      }
    });

    if (authError || !authData.user) {
      console.error('Auth user creation error:', authError);

      // Check if email already exists
      if (authError?.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'En användare med denna e-post finns redan registrerad.' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Ett fel uppstod vid registrering. Försök igen.' },
        { status: 500 }
      );
    }

    // Step 2: Create organization profile linked to auth user
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .insert([{
        auth_user_id: authData.user.id, // Link to auth user
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
        status: 'APPROVED', // Auto-approve for MVP
        email_verified: true // Auto-verified for MVP
      }])
      .select()
      .single();

    if (orgError || !organization) {
      console.error('Organization creation error:', orgError);

      // Clean up auth user if org creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        { error: 'Ett fel uppstod vid registrering. Försök igen.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Registrering lyckades!',
      organizationId: organization.id,
      email: organization.email
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((e) => e.message).join(', ');
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
