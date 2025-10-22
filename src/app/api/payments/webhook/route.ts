/**
 * Stripe webhook handler
 * Processes payment events from Stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, { apiVersion: '2025-09-30.clover' });
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Mark as dynamic to prevent static optimization during build
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const supabase = createClient();

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update payment case status
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: updateError } = await (supabase
          .from('payment_cases') as any)
          .update({
            stripe_payment_status: 'succeeded',
            status: 'PAID',
            paid_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (updateError) {
          console.error('Error updating payment case:', updateError);
          return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        // Get payment case to create milestones
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: paymentCase } = await (supabase
          .from('payment_cases') as any)
          .select('id, grant_amount')
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .single();

        if (paymentCase) {
          // Create 2 milestones (50% each)
          const milestoneAmount = Math.round(paymentCase.grant_amount / 2);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase.from('milestones') as any).insert([
            {
              payment_case_id: paymentCase.id,
              milestone_number: 1,
              amount: milestoneAmount,
              status: 'PENDING',
            },
            {
              payment_case_id: paymentCase.id,
              milestone_number: 2,
              amount: milestoneAmount,
              status: 'PENDING',
            },
          ]);

          console.log('Created milestones for payment case:', paymentCase.id);
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase
          .from('payment_cases') as any)
          .update({
            stripe_payment_status: 'failed',
            status: 'PAYMENT_FAILED',
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        break;
      }

      case 'transfer.created': {
        // Track when money is transferred to organization
        const transfer = event.data.object as Stripe.Transfer;
        const { payment_case_id, milestone_number } = transfer.metadata;

        if (payment_case_id && milestone_number) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase
            .from('milestones') as any)
            .update({
              stripe_transfer_id: transfer.id,
              status: 'PAID',
              paid_at: new Date().toISOString(),
            })
            .eq('payment_case_id', payment_case_id)
            .eq('milestone_number', parseInt(milestone_number));
        }

        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
