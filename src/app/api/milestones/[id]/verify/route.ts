/**
 * API endpoint to trigger AI verification for a milestone
 * Called after documents/reports are uploaded
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyLegitimacy, verifyImpactReport } from '@/lib/ai/verification-gemini';
import { transferToOrganization } from '@/lib/stripe/payment';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const milestoneId = params.id;
    const supabase = createClient();

    // Get milestone with payment case and organization details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: milestone, error: milestoneError } = await (supabase
      .from('milestones') as any)
      .select(`
        *,
        payment_cases!inner (
          id,
          organization_id,
          organizations!inner (
            organization_name,
            organization_number,
            stripe_account_id
          )
        )
      `)
      .eq('id', milestoneId)
      .single();

    if (milestoneError || !milestone) {
      return NextResponse.json(
        { error: 'Milestone hittades inte' },
        { status: 404 }
      );
    }

    // Check if already verified
    if (milestone.status === 'PAID') {
      return NextResponse.json(
        { error: 'Milestone är redan betald' },
        { status: 400 }
      );
    }

    let verificationResult;

    // Milestone 1: Legitimacy Check
    if (milestone.milestone_number === 1) {
      if (!milestone.stadgar_url || !milestone.ekonomisk_redovisning_url) {
        return NextResponse.json(
          { error: 'Dokument saknas' },
          { status: 400 }
        );
      }

      // Run AI verification
      verificationResult = await verifyLegitimacy({
        stadgarUrl: milestone.stadgar_url,
        ekonomiskUrl: milestone.ekonomisk_redovisning_url,
        expectedOrgName: milestone.payment_cases.organizations.organization_name,
        expectedOrgNumber: milestone.payment_cases.organizations.organization_number,
      });
    }
    // Milestone 2: Impact Report
    else if (milestone.milestone_number === 2) {
      if (!milestone.social_media_link || !milestone.uploaded_photo_urls || !milestone.impact_description) {
        return NextResponse.json(
          { error: 'Impact-rapport är inkomplett' },
          { status: 400 }
        );
      }

      // Run AI verification
      verificationResult = await verifyImpactReport({
        socialMediaLink: milestone.social_media_link,
        photoUrls: milestone.uploaded_photo_urls,
        impactDescription: milestone.impact_description,
        projectCategory: 'General', // TODO: Get from project
      });
    }
    else {
      return NextResponse.json(
        { error: 'Ogiltigt milestone-nummer' },
        { status: 400 }
      );
    }

    // Save AI verification result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: verificationSaveError } = await (supabase
      .from('ai_verifications') as any)
      .insert({
        milestone_id: milestoneId,
        verification_type: milestone.milestone_number === 1 ? 'LEGITIMACY_CHECK' : 'IMPACT_REPORT',
        ai_model: verificationResult.metrics.model,
        ai_prompt: 'Verification prompt', // Would include full prompt
        ai_response: verificationResult,
        passed: verificationResult.passed,
        confidence_score: verificationResult.confidence,
        flags: verificationResult.flags,
        reasoning: verificationResult.reasoning,
        checks_performed: verificationResult.checks,
        processing_time_ms: verificationResult.metrics.processing_time_ms,
        tokens_used: verificationResult.metrics.tokens_used,
      });

    if (verificationSaveError) {
      console.error('Error saving verification:', verificationSaveError);
    }

    // Update milestone status based on verification result
    let newStatus = 'NEEDS_REVIEW';
    if (verificationResult.passed && verificationResult.confidence >= 0.85) {
      newStatus = 'APPROVED';
    } else if (verificationResult.confidence < 0.5) {
      newStatus = 'REJECTED';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase
      .from('milestones') as any)
      .update({
        ai_verification_status: verificationResult.passed ? 'PASSED' : 'FAILED',
        ai_verified_at: new Date().toISOString(),
        ai_confidence_score: verificationResult.confidence,
        status: newStatus,
      })
      .eq('id', milestoneId);

    // If auto-approved, trigger payment transfer
    if (newStatus === 'APPROVED') {
      const stripeAccountId = milestone.payment_cases.organizations.stripe_account_id;

      if (!stripeAccountId) {
        return NextResponse.json({
          success: true,
          verification: verificationResult,
          status: 'APPROVED',
          message: 'Verifiering godkänd, men organisationen måste koppla Stripe-konto först',
        });
      }

      try {
        const transferResult = await transferToOrganization({
          amount: milestone.amount,
          organizationStripeAccountId: stripeAccountId,
          paymentCaseId: milestone.payment_case_id,
          milestoneNumber: milestone.milestone_number,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase
          .from('milestones') as any)
          .update({
            status: 'PAID',
            paid_at: new Date().toISOString(),
            stripe_transfer_id: transferResult.transferId,
          })
          .eq('id', milestoneId);

        return NextResponse.json({
          success: true,
          verification: verificationResult,
          status: 'PAID',
          transfer: transferResult,
          message: `Verifiering godkänd! ${milestone.amount.toLocaleString('sv-SE')} SEK överförd till organisationen.`,
        });
      } catch (transferError) {
        console.error('Transfer error:', transferError);
        return NextResponse.json({
          success: true,
          verification: verificationResult,
          status: 'APPROVED',
          error: 'Verifiering godkänd, men överföring misslyckades',
        });
      }
    }

    return NextResponse.json({
      success: true,
      verification: verificationResult,
      status: newStatus,
      message: newStatus === 'NEEDS_REVIEW'
        ? 'Verifiering kräver manuell granskning'
        : 'Verifiering misslyckades',
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
