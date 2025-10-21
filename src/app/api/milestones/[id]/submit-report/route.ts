/**
 * API endpoint to submit Milestone 2 impact report
 * Social media link, photos, and description
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const milestoneId = params.id;
    const formData = await request.formData();

    const socialMediaLink = formData.get('social_media_link') as string;
    const impactDescription = formData.get('impact_description') as string;
    const photos = formData.getAll('photos') as File[];

    // Validation
    if (!socialMediaLink || !impactDescription) {
      return NextResponse.json(
        { error: 'Social media länk och beskrivning krävs' },
        { status: 400 }
      );
    }

    if (photos.length === 0) {
      return NextResponse.json(
        { error: 'Minst ett foto krävs' },
        { status: 400 }
      );
    }

    if (impactDescription.length < 100) {
      return NextResponse.json(
        { error: 'Beskrivning måste vara minst 100 tecken' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(socialMediaLink);
    } catch {
      return NextResponse.json(
        { error: 'Ogiltig URL för social media länk' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get milestone
    const { data: milestone, error: milestoneError } = await supabase
      .from('milestones')
      .select('*, payment_cases!inner(organization_id)')
      .eq('id', milestoneId)
      .single();

    if (milestoneError || !milestone) {
      return NextResponse.json(
        { error: 'Milestone hittades inte' },
        { status: 404 }
      );
    }

    if (milestone.milestone_number !== 2) {
      return NextResponse.json(
        { error: 'Denna endpoint är endast för Milestone 2' },
        { status: 400 }
      );
    }

    const orgId = milestone.payment_cases.organization_id;
    const photoUrls: string[] = [];

    // Upload photos
    const timestamp = Date.now();
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(photo.type)) {
        return NextResponse.json(
          { error: 'Endast JPEG, PNG, och WebP bilder är tillåtna' },
          { status: 400 }
        );
      }

      // Validate size (max 5MB per photo)
      if (photo.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Foton får inte vara större än 5MB' },
          { status: 400 }
        );
      }

      const photoPath = `photos/${orgId}/milestone-${milestoneId}-photo-${i}-${timestamp}.${photo.type.split('/')[1]}`;
      const photoBuffer = await photo.arrayBuffer();

      const { error: photoError } = await supabase.storage
        .from('photos')
        .upload(photoPath, photoBuffer, {
          contentType: photo.type,
          upsert: false,
        });

      if (photoError) {
        console.error('Photo upload error:', photoError);
        // Clean up already uploaded photos
        for (const url of photoUrls) {
          const path = url.split('/photos/')[1];
          await supabase.storage.from('photos').remove([path]);
        }
        return NextResponse.json(
          { error: `Uppladdning av foto ${i + 1} misslyckades` },
          { status: 500 }
        );
      }

      const { data: photoUrl } = supabase.storage
        .from('photos')
        .getPublicUrl(photoPath);

      photoUrls.push(photoUrl.publicUrl);
    }

    // Update milestone with impact report
    const { error: updateError } = await supabase
      .from('milestones')
      .update({
        social_media_link: socialMediaLink,
        uploaded_photo_urls: photoUrls,
        impact_description: impactDescription,
        impact_report_uploaded_at: new Date().toISOString(),
        status: 'DOCUMENTS_UPLOADED',
      })
      .eq('id', milestoneId);

    if (updateError) {
      console.error('Milestone update error:', updateError);
      return NextResponse.json(
        { error: 'Kunde inte uppdatera milestone' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Impact-rapport inskickad! AI-verifiering startar automatiskt.',
      photoUrls,
    });

  } catch (error) {
    console.error('Impact report submission error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
