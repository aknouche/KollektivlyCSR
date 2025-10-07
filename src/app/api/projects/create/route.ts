// @ts-nocheck - Temporary: Supabase SSR v0.7.0 has type inference issues with Database generic
// Project Creation API Route
// SECURITY: Content moderation + validation before saving

export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';

const projectSchema = z.object({
  title: z.string().min(5).max(100).trim(),
  description: z.string().min(50).max(5000).trim(),
  category: z.enum(['MILJÖ', 'UTBILDNING', 'HÄLSA', 'JÄMLIKHET', 'INTEGRATION', 'SPORT', 'KULTUR', 'INNOVATION']),
  location: z.string().min(2).max(100).trim(),
  budget: z.string().regex(/^\d+$/),
  goal: z.string().min(10).max(500).trim(),
  un_goals: z.array(z.string()).min(1).max(17),
  image_url: z.string().url().optional().or(z.literal('')),
  organization_id: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);

    const supabase = createAdminClient();

    // Verify organization exists and is approved
    const { data: organization } = await supabase
      .from('organizations')
      .select('id, organization_name, status')
      .eq('id', validated.organization_id)
      .maybeSingle() as { data: { id: string; organization_name: string; status: string } | null };

    if (!organization) {
      return NextResponse.json(
        { error: 'Organisation hittades inte' },
        { status: 404 }
      );
    }

    if (organization.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Din organisation måste vara godkänd för att skapa projekt' },
        { status: 403 }
      );
    }

    // Content moderation using OpenAI (user has OPENAI_API_KEY configured)
    const moderationResult = { flagged: false, reason: '' };

    if (process.env.OPENAI_API_KEY) {
      try {
        const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            input: `${validated.title}\n\n${validated.description}\n\n${validated.goal}`,
          }),
        });

        const moderationData = await moderationResponse.json();

        if (moderationData.results && moderationData.results[0]) {
          const result = moderationData.results[0];
          if (result.flagged) {
            moderationResult.flagged = true;
            moderationResult.reason = Object.keys(result.categories)
              .filter(key => result.categories[key])
              .join(', ');

            console.warn('Content flagged by moderation:', {
              organization_id: validated.organization_id,
              title: validated.title,
              reason: moderationResult.reason,
            });
          }
        }
      } catch (moderationError) {
        console.error('Moderation API error:', moderationError);
        // Continue anyway - don't block on moderation failure
      }
    }

    // Create project with PENDING_REVIEW status
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: validated.title,
        description: validated.description,
        category: validated.category,
        location: validated.location,
        budget: parseInt(validated.budget),
        goal: validated.goal,
        un_goals: validated.un_goals,
        image_url: validated.image_url || null,
        organization_id: validated.organization_id,
        organization_name: organization.organization_name,
        status: moderationResult.flagged ? 'FLAGGED' : 'PENDING_REVIEW',
        moderation_notes: moderationResult.flagged ? `Auto-flagged: ${moderationResult.reason}` : null,
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single() as { data: { id: string } | null; error: { message: string } | null };

    if (projectError) {
      console.error('Project creation error:', projectError);
      return NextResponse.json(
        { error: 'Kunde inte skapa projekt. Försök igen.' },
        { status: 500 }
      );
    }

    // Send notification email to admin
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `Nytt projekt väntar på granskning: ${validated.title}`,
            html: `
              <h2>Nytt projekt skapat</h2>
              <p><strong>Organisation:</strong> ${organization.organization_name}</p>
              <p><strong>Projekttitel:</strong> ${validated.title}</p>
              <p><strong>Kategori:</strong> ${validated.category}</p>
              <p><strong>Budget:</strong> ${parseInt(validated.budget).toLocaleString('sv-SE')} SEK</p>
              <p><strong>Status:</strong> ${moderationResult.flagged ? '⚠️ FLAGGED' : 'PENDING_REVIEW'}</p>
              ${moderationResult.flagged ? `<p><strong>Flagged reason:</strong> ${moderationResult.reason}</p>` : ''}
              <p><strong>Beskrivning:</strong></p>
              <p>${validated.description.substring(0, 200)}...</p>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/projects/${project.id}">Granska projekt →</a></p>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Admin notification email error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      message: 'Projekt skapat! Det kommer granskas innan publicering.',
      project_id: project.id,
      status: moderationResult.flagged ? 'FLAGGED' : 'PENDING_REVIEW',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json(
        { error: 'Ogiltig projektdata. Kontrollera alla fält.', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Project creation error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod. Försök igen senare.' },
      { status: 500 }
    );
  }
}
