/**
 * Stripe payment integration for Kollektivly
 * Handles payment intents, transfers, and escrow
 */

import Stripe from 'stripe';

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeSingleton) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeSingleton = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    });
  }
  return stripeSingleton;
}

// Service tier fee percentages
const SERVICE_TIER_FEES: Record<string, number> = {
  basic: 0.04, // 4%
  standard: 0.07, // 7%
  enhanced: 0.10, // 10%
};

const MIN_GRANT_AMOUNT = 10000; // 10,000 SEK minimum

/**
 * Calculate service fee based on tier
 */
export function calculateServiceFee(grantAmount: number, tier: string): number {
  const feePercentage = SERVICE_TIER_FEES[tier] || SERVICE_TIER_FEES.standard;
  return Math.round(grantAmount * feePercentage);
}

/**
 * Create a payment intent for a grant
 * Company pays grant amount + service fee
 * Money goes to Kollektivly's account (escrow)
 */
export async function createPaymentIntent(params: {
  grantAmount: number;
  serviceTier: string;
  projectId: string;
  organizationId: string;
  companyEmail: string;
  companyName: string;
  companyId?: string;
}): Promise<{
  paymentIntentId: string;
  clientSecret: string;
  totalAmount: number;
  serviceFee: number;
}> {
  const { grantAmount, serviceTier, projectId, organizationId, companyEmail, companyName, companyId } = params;

  // Validation
  if (grantAmount < MIN_GRANT_AMOUNT) {
    throw new Error(`Grant amount must be at least ${MIN_GRANT_AMOUNT.toLocaleString('sv-SE')} SEK`);
  }

  // Calculate fees
  const serviceFee = calculateServiceFee(grantAmount, serviceTier);
  const totalAmount = grantAmount + serviceFee;

  // Create payment intent
  const paymentIntent = await getStripe().paymentIntents.create({
    amount: totalAmount * 100, // Convert to öre (SEK cents)
    currency: 'sek',
    metadata: {
      grant_amount: grantAmount.toString(),
      service_fee: serviceFee.toString(),
      service_tier: serviceTier,
      project_id: projectId,
      organization_id: organizationId,
      company_email: companyEmail,
      company_name: companyName,
      company_id: companyId || '',
    },
    description: `Grant payment: ${grantAmount.toLocaleString('sv-SE')} SEK + ${serviceFee.toLocaleString('sv-SE')} SEK service fee`,
  });

  return {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret!,
    totalAmount,
    serviceFee,
  };
}

/**
 * Transfer funds from escrow to organization's Stripe account
 * Called when a milestone is approved
 */
export async function transferToOrganization(params: {
  amount: number;
  organizationStripeAccountId: string;
  paymentCaseId: string;
  milestoneNumber: number;
}): Promise<{
  transferId: string;
  amount: number;
}> {
  const { amount, organizationStripeAccountId, paymentCaseId, milestoneNumber } = params;

  // Validation
  if (!organizationStripeAccountId) {
    throw new Error('Organization Stripe account ID is required');
  }

  if (amount <= 0) {
    throw new Error('Transfer amount must be greater than 0');
  }

  // Create transfer
  const transfer = await getStripe().transfers.create({
    amount: amount * 100, // Convert to öre
    currency: 'sek',
    destination: organizationStripeAccountId,
    metadata: {
      payment_case_id: paymentCaseId,
      milestone_number: milestoneNumber.toString(),
    },
    description: `Milestone ${milestoneNumber} payment: ${amount.toLocaleString('sv-SE')} SEK`,
  });

  return {
    transferId: transfer.id,
    amount,
  };
}

/**
 * Retrieve payment intent status
 */
export async function getPaymentIntentStatus(paymentIntentId: string): Promise<{
  status: string;
  amount: number;
  paid: boolean;
}> {
  const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId);

  return {
    status: paymentIntent.status,
    amount: paymentIntent.amount / 100, // Convert from öre to SEK
    paid: paymentIntent.status === 'succeeded',
  };
}

/**
 * Create Stripe Connect account for organization
 * Organizations need this to receive transfers
 */
export async function createConnectAccount(params: {
  organizationId: string;
  organizationName: string;
  email: string;
  orgNumber?: string;
}): Promise<{
  accountId: string;
  onboardingUrl: string;
}> {
  const { organizationId, organizationName, email, orgNumber } = params;

  // Create Express account (easiest for small organizations)
  const account = await getStripe().accounts.create({
    type: 'express',
    country: 'SE',
    email,
    business_type: 'non_profit',
    metadata: {
      organization_id: organizationId,
      organization_name: organizationName,
      org_number: orgNumber || '',
    },
    capabilities: {
      transfers: { requested: true },
    },
  });

  // Create account link for onboarding
  const accountLink = await getStripe().accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe_refresh=true`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe_connected=true`,
    type: 'account_onboarding',
  });

  return {
    accountId: account.id,
    onboardingUrl: accountLink.url,
  };
}

/**
 * Check if organization's Stripe account is fully onboarded
 */
export async function checkAccountOnboarding(accountId: string): Promise<{
  onboarded: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}> {
  const account = await getStripe().accounts.retrieve(accountId);

  return {
    onboarded: account.charges_enabled && account.payouts_enabled,
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
  };
}

export default getStripe;
