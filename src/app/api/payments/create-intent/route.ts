/**
 * API endpoint to create payment intent
 * Company initiates payment for a grant
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createPaymentIntent } from '@/lib/stripe/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectId,
      organizationId,
      grantAmount,
      serviceTier,
      companyEmail,
      companyName,
      companyId,
      contactPerson,
    } = body;

    // Validation
    if (!projectId || !organizationId || !grantAmount || !serviceTier || !companyEmail || !companyName) {
      return NextResponse.json(
        { error: 'Saknade obligatoriska fält' },
        { status: 400 }
      );
    }

    if (grantAmount < 10000) {
      return NextResponse.json(
        { error: 'Bidragsbelopp måste vara minst 10 000 SEK' },
        { status: 400 }
      );
    }

    const validTiers = ['basic', 'standard', 'enhanced'];
    if (!validTiers.includes(serviceTier)) {
      return NextResponse.json(
        { error: 'Ogiltig servicenivå' },
        { status: 400 }
      );
    }

    // Create Stripe payment intent
    const paymentResult = await createPaymentIntent({
      grantAmount,
      serviceTier,
      projectId,
      organizationId,
      companyEmail,
      companyName,
      companyId,
    });

    // Create payment case in database
    const supabase = createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: paymentCase, error: dbError } = await (supabase
      .from('payment_cases') as any)
      .insert({
        project_id: projectId,
        organization_id: organizationId,
        company_id: companyId || null,
        company_email: companyEmail,
        company_name: companyName,
        company_contact_person: contactPerson || null,
        grant_amount: grantAmount,
        service_fee: paymentResult.serviceFee,
        total_charged: paymentResult.totalAmount,
        service_tier: serviceTier,
        stripe_payment_intent_id: paymentResult.paymentIntentId,
        stripe_payment_status: 'pending',
        status: 'AWAITING_PAYMENT',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Ett fel uppstod vid skapande av betalning' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentResult.paymentIntentId,
      clientSecret: paymentResult.clientSecret,
      totalAmount: paymentResult.totalAmount,
      serviceFee: paymentResult.serviceFee,
      paymentCaseId: paymentCase.id,
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ett oväntat fel uppstod' },
      { status: 500 }
    );
  }
}
