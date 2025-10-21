/**
 * Tests for payment intent creation API
 */

import { POST } from '../route';
import { createMockRequest } from '@/lib/test-utils';

// Mock Stripe
jest.mock('@/lib/stripe/payment', () => ({
  createPaymentIntent: jest.fn().mockResolvedValue({
    paymentIntentId: 'pi_test_123',
    clientSecret: 'pi_test_123_secret_abc',
    totalAmount: 53500,
    serviceFee: 3500,
  }),
}));

// Mock Supabase
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({
            data: { id: 'case_123' },
            error: null,
          }),
        })),
      })),
    })),
  })),
}));

describe('POST /api/payments/create-intent', () => {
  it('should create payment intent successfully', async () => {
    const request = createMockRequest({
      projectId: 'proj_123',
      organizationId: 'org_123',
      grantAmount: 50000,
      serviceTier: 'standard',
      companyEmail: 'test@company.com',
      companyName: 'Test AB',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.paymentIntentId).toBe('pi_test_123');
    expect(data.clientSecret).toBe('pi_test_123_secret_abc');
  });

  it('should validate required fields', async () => {
    const request = createMockRequest({
      projectId: 'proj_123',
      // Missing other fields
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });

  it('should validate minimum grant amount', async () => {
    const request = createMockRequest({
      projectId: 'proj_123',
      organizationId: 'org_123',
      grantAmount: 5000, // Too low
      serviceTier: 'standard',
      companyEmail: 'test@company.com',
      companyName: 'Test AB',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('minimum');
  });

  it('should create payment case in database', async () => {
    const request = createMockRequest({
      projectId: 'proj_123',
      organizationId: 'org_123',
      grantAmount: 50000,
      serviceTier: 'standard',
      companyEmail: 'test@company.com',
      companyName: 'Test AB',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.paymentCaseId).toBeDefined();
  });
});
