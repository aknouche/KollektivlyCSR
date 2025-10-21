// Test utilities for Kollektivly
import { createClient } from '@supabase/supabase-js';

// Mock Supabase client for testing
export const createMockSupabaseClient = () => {
  return {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
          order: jest.fn(),
          limit: jest.fn(),
        })),
        in: jest.fn(),
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(),
      })),
    })),
    auth: {
      getSession: jest.fn(),
      getUser: jest.fn(),
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        download: jest.fn(),
        getPublicUrl: jest.fn(),
      })),
    },
  };
};

// Mock payment case data
export const mockPaymentCase = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  project_id: '123e4567-e89b-12d3-a456-426614174001',
  organization_id: '123e4567-e89b-12d3-a456-426614174002',
  company_id: '123e4567-e89b-12d3-a456-426614174003',
  company_email: 'test@company.com',
  grant_amount: 50000,
  service_fee: 3500,
  total_charged: 53500,
  service_tier: 'standard',
  status: 'PAID',
  stripe_payment_intent_id: 'pi_test_123',
  company_name: 'Test Company AB',
  created_at: new Date().toISOString(),
};

// Mock milestone data
export const mockMilestone1 = {
  id: '123e4567-e89b-12d3-a456-426614174010',
  payment_case_id: mockPaymentCase.id,
  milestone_number: 1,
  amount: 25000,
  status: 'PENDING',
  created_at: new Date().toISOString(),
};

export const mockMilestone2 = {
  id: '123e4567-e89b-12d3-a456-426614174011',
  payment_case_id: mockPaymentCase.id,
  milestone_number: 2,
  amount: 25000,
  status: 'PENDING',
  created_at: new Date().toISOString(),
};

// Mock AI verification result
export const mockAIVerificationResult = {
  legitimate: true,
  org_number: '556677-8899',
  org_name: 'Test Förening',
  documents_match: true,
  financial_health: 'good',
  confidence: 0.92,
  reasoning: 'Documents appear legitimate and match expected organization',
};

// Mock company data
export const mockCompany = {
  id: '123e4567-e89b-12d3-a456-426614174003',
  company_name: 'Test Company AB',
  email: 'test@company.com',
  contact_person: 'Test Person',
  assessment_completed: true,
  sponsorship_goals: ['CSRD compliance', 'ESG reporting'],
  current_csr_maturity: 'intermediate',
  recommended_services: ['CSRD consultation'],
};

// Mock organization data
export const mockOrganization = {
  id: '123e4567-e89b-12d3-a456-426614174002',
  organization_name: 'Test Förening',
  email: 'info@testforening.se',
  organization_number: '556677-8899',
  status: 'APPROVED',
};

// Helper to create mock request
export const createMockRequest = (body: any, headers: Record<string, string> = {}) => {
  return {
    json: async () => body,
    headers: new Headers(headers),
    nextUrl: {
      origin: 'http://localhost:3000',
    },
  } as any;
};

// Helper to create mock response
export const createMockResponse = () => {
  const response = {
    status: 200,
    json: null as any,
    headers: new Headers(),
  };

  return {
    json: (data: any) => {
      response.json = data;
      return response;
    },
    status: (code: number) => {
      response.status = code;
      return response;
    },
  };
};
