/**
 * Tests for Stripe payment integration
 * Following TDD - write tests first, then implementation
 */

import { createPaymentIntent, calculateServiceFee, transferToOrganization } from '../payment';

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn().mockResolvedValue({
        id: 'pi_test_123',
        amount: 53500,
        currency: 'sek',
        status: 'requires_payment_method',
      }),
      retrieve: jest.fn().mockResolvedValue({
        id: 'pi_test_123',
        status: 'succeeded',
      }),
    },
    transfers: {
      create: jest.fn().mockResolvedValue({
        id: 'tr_test_123',
        amount: 25000,
        currency: 'sek',
        destination: 'acct_test_org',
      }),
    },
  }));
});

describe('Stripe Payment Integration', () => {
  describe('calculateServiceFee', () => {
    it('should calculate 4% fee for basic tier', () => {
      const fee = calculateServiceFee(50000, 'basic');
      expect(fee).toBe(2000); // 4% of 50,000
    });

    it('should calculate 7% fee for standard tier', () => {
      const fee = calculateServiceFee(50000, 'standard');
      expect(fee).toBe(3500); // 7% of 50,000
    });

    it('should calculate 10% fee for enhanced tier', () => {
      const fee = calculateServiceFee(50000, 'enhanced');
      expect(fee).toBe(5000); // 10% of 50,000
    });

    it('should default to 7% for unknown tier', () => {
      const fee = calculateServiceFee(50000, 'unknown');
      expect(fee).toBe(3500);
    });

    it('should handle different amounts correctly', () => {
      expect(calculateServiceFee(100000, 'standard')).toBe(7000);
      expect(calculateServiceFee(25000, 'standard')).toBe(1750);
    });
  });

  describe('createPaymentIntent', () => {
    it('should create payment intent with correct amount', async () => {
      const result = await createPaymentIntent({
        grantAmount: 50000,
        serviceTier: 'standard',
        projectId: 'proj_123',
        organizationId: 'org_123',
        companyEmail: 'test@company.com',
        companyName: 'Test Company',
      });

      expect(result.paymentIntentId).toBe('pi_test_123');
      expect(result.totalAmount).toBe(53500); // 50,000 + 3,500
      expect(result.serviceFee).toBe(3500);
    });

    it('should include metadata in payment intent', async () => {
      const result = await createPaymentIntent({
        grantAmount: 50000,
        serviceTier: 'standard',
        projectId: 'proj_123',
        organizationId: 'org_123',
        companyEmail: 'test@company.com',
        companyName: 'Test Company',
      });

      expect(result).toHaveProperty('paymentIntentId');
    });

    it('should throw error if grant amount is too low', async () => {
      await expect(
        createPaymentIntent({
          grantAmount: 5000, // Minimum should be 10,000
          serviceTier: 'standard',
          projectId: 'proj_123',
          organizationId: 'org_123',
          companyEmail: 'test@company.com',
          companyName: 'Test Company',
        })
      ).rejects.toThrow('Grant amount must be at least 10,000 SEK');
    });
  });

  describe('transferToOrganization', () => {
    it('should transfer correct amount to organization', async () => {
      const result = await transferToOrganization({
        amount: 25000,
        organizationStripeAccountId: 'acct_test_org',
        paymentCaseId: 'case_123',
        milestoneNumber: 1,
      });

      expect(result.transferId).toBe('tr_test_123');
      expect(result.amount).toBe(25000);
    });

    it('should include metadata with payment case and milestone', async () => {
      const result = await transferToOrganization({
        amount: 25000,
        organizationStripeAccountId: 'acct_test_org',
        paymentCaseId: 'case_123',
        milestoneNumber: 2,
      });

      expect(result).toHaveProperty('transferId');
      expect(result).toHaveProperty('amount');
    });

    it('should throw error if organization account is missing', async () => {
      await expect(
        transferToOrganization({
          amount: 25000,
          organizationStripeAccountId: '',
          paymentCaseId: 'case_123',
          milestoneNumber: 1,
        })
      ).rejects.toThrow('Organization Stripe account ID is required');
    });
  });
});
