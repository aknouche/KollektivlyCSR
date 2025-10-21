/**
 * API endpoint to upload Milestone 1 documents
 * Stadgar and Årsredovisning for legitimacy check
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

    const stadgarFile = formData.get('stadgar') as File;
    const ekonomiskFile = formData.get('ekonomisk_redovisning') as File;

    if (!stadgarFile || !ekonomiskFile) {
      return NextResponse.json(
        { error: 'Båda dokumenten krävs' },
        { status: 400 }
      );
    }

    // Validate file types
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(stadgarFile.type) || !allowedTypes.includes(ekonomiskFile.type)) {
      return NextResponse.json(
        { error: 'Endast PDF-filer är tillåtna' },
        { status: 400 }
      );
    }

    // Validate file sizes (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (stadgarFile.size > maxSize || ekonomiskFile.size > maxSize) {
      return NextResponse.json(
        { error: 'Filer får inte vara större än 10MB' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get milestone to verify it exists and belongs to org
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

    if (milestone.milestone_number !== 1) {
      return NextResponse.json(
        { error: 'Denna endpoint är endast för Milestone 1' },
        { status: 400 }
      );
    }

    const orgId = milestone.payment_cases.organization_id;

    // Upload files to Supabase Storage
    const timestamp = Date.now();
    const stadgarPath = `documents/${orgId}/milestone-${milestoneId}-stadgar-${timestamp}.pdf`;
    const ekonomiskPath = `documents/${orgId}/milestone-${milestoneId}-ekonomisk-${timestamp}.pdf`;

    const stadgarBuffer = await stadgarFile.arrayBuffer();
    const ekonomiskBuffer = await ekonomiskFile.arrayBuffer();

    const { error: stadgarError } = await supabase.storage
      .from('documents')
      .upload(stadgarPath, stadgarBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (stadgarError) {
      console.error('Stadgar upload error:', stadgarError);
      return NextResponse.json(
        { error: 'Uppladdning av stadgar misslyckades' },
        { status: 500 }
      );
    }

    const { error: ekonomiskError } = await supabase.storage
      .from('documents')
      .upload(ekonomiskPath, ekonomiskBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (ekonomiskError) {
      console.error('Ekonomisk upload error:', ekonomiskError);
      // Clean up stadgar file
      await supabase.storage.from('documents').remove([stadgarPath]);
      return NextResponse.json(
        { error: 'Uppladdning av ekonomisk redovisning misslyckades' },
        { status: 500 }
      );
    }

    // Get public URLs
    const { data: stadgarUrl } = supabase.storage
      .from('documents')
      .getPublicUrl(stadgarPath);

    const { data: ekonomiskUrl } = supabase.storage
      .from('documents')
      .getPublicUrl(ekonomiskPath);

    // Update milestone with document URLs
    const { error: updateError } = await supabase
      .from('milestones')
      .update({
        stadgar_url: stadgarUrl.publicUrl,
        ekonomisk_redovisning_url: ekonomiskUrl.publicUrl,
        legitimacy_documents_uploaded_at: new Date().toISOString(),
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
      message: 'Dokument uppladdade! AI-verifiering startar automatiskt.',
      stadgarUrl: stadgarUrl.publicUrl,
      ekonomiskUrl: ekonomiskUrl.publicUrl,
    });

  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
