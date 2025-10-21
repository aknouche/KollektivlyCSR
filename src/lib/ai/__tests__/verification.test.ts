/**
 * Tests for AI verification system
 * Verifies legitimacy documents and impact reports
 */

import { verifyLegitimacy, verifyImpactReport } from '../verification';
import { mockAIVerificationResult } from '@/lib/test-utils';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{
              message: {
                content: JSON.stringify(mockAIVerificationResult),
              },
            }],
            usage: {
              total_tokens: 1500,
            },
          }),
        },
      },
    })),
  };
});

describe('AI Verification System', () => {
  describe('verifyLegitimacy', () => {
    const mockDocuments = {
      stadgarUrl: 'https://storage.supabase.co/documents/stadgar.pdf',
      ekonomiskUrl: 'https://storage.supabase.co/documents/arsredovisning.pdf',
      expectedOrgName: 'Test Förening',
      expectedOrgNumber: '556677-8899',
    };

    it('should verify legitimate documents', async () => {
      const result = await verifyLegitimacy(mockDocuments);

      expect(result.passed).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.85);
      expect(result.checks.documents_legitimate).toBe(true);
      expect(result.checks.org_number_match).toBe(true);
    });

    it('should return high confidence for good documents', async () => {
      const result = await verifyLegitimacy(mockDocuments);

      expect(result.confidence).toBeGreaterThanOrEqual(0.85);
      expect(result.confidence).toBeLessThanOrEqual(1.0);
    });

    it('should extract organization details', async () => {
      const result = await verifyLegitimacy(mockDocuments);

      expect(result.details.org_number).toBe('556677-8899');
      expect(result.details.org_name).toBe('Test Förening');
      expect(result.details.financial_health).toBe('good');
    });

    it('should flag mismatched organization names', async () => {
      // Mock a response with mismatch
      const OpenAI = jest.requireMock('openai').default;
      OpenAI.mockImplementationOnce(() => ({
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    ...mockAIVerificationResult,
                    documents_match: false,
                    confidence: 0.45,
                  }),
                },
              }],
              usage: { total_tokens: 1500 },
            }),
          },
        },
      }));

      const result = await verifyLegitimacy({
        ...mockDocuments,
        expectedOrgName: 'Different Organization',
      });

      expect(result.passed).toBe(false);
      expect(result.confidence).toBeLessThan(0.85);
    });

    it('should track processing metrics', async () => {
      const result = await verifyLegitimacy(mockDocuments);

      expect(result.metrics).toBeDefined();
      expect(result.metrics.tokens_used).toBeGreaterThan(0);
      expect(result.metrics.processing_time_ms).toBeGreaterThan(0);
    });
  });

  describe('verifyImpactReport', () => {
    const mockReport = {
      socialMediaLink: 'https://instagram.com/p/example',
      photoUrls: [
        'https://storage.supabase.co/photos/event1.jpg',
        'https://storage.supabase.co/photos/event2.jpg',
      ],
      impactDescription: 'Vi genomförde ett fotbollsläger för 50 ungdomar i åldrarna 10-15 år. Evenemanget hölls under 3 dagar i augusti och inkluderade träning, matcher och workshops om lagarbete. Pengarna användes till att hyra fotbollsplan, köpa träningsutrustning och mat till deltagarna.',
      projectCategory: 'Ungdom',
    };

    it('should verify complete impact report', async () => {
      const result = await verifyImpactReport(mockReport);

      expect(result.passed).toBe(true);
      expect(result.confidence).toBeGreaterThan(0.85);
      expect(result.checks.link_valid).toBe(true);
      expect(result.checks.description_complete).toBe(true);
    });

    it('should check social media link validity', async () => {
      const result = await verifyImpactReport(mockReport);

      expect(result.checks.link_valid).toBeDefined();
      expect(typeof result.checks.link_valid).toBe('boolean');
    });

    it('should verify photos are included', async () => {
      const result = await verifyImpactReport(mockReport);

      expect(result.checks.photos_included).toBe(true);
    });

    it('should verify description completeness', async () => {
      const result = await verifyImpactReport(mockReport);

      expect(result.checks.description_complete).toBe(true);
      expect(result.checks.spending_explained).toBe(true);
    });

    it('should fail for incomplete descriptions', async () => {
      const OpenAI = jest.requireMock('openai').default;
      OpenAI.mockImplementationOnce(() => ({
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    description_complete: false,
                    spending_explained: false,
                    confidence: 0.3,
                  }),
                },
              }],
              usage: { total_tokens: 1000 },
            }),
          },
        },
      }));

      const result = await verifyImpactReport({
        ...mockReport,
        impactDescription: 'Vi hade ett event.',
      });

      expect(result.passed).toBe(false);
      expect(result.confidence).toBeLessThan(0.85);
    });

    it('should match category with description', async () => {
      const result = await verifyImpactReport(mockReport);

      expect(result.checks.matches_category).toBe(true);
    });
  });
});
