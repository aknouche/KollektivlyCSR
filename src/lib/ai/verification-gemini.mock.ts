/**
 * MOCK AI Verification System for Prototype
 * Returns dummy success results without calling Google AI
 * Use this during development when GOOGLE_AI_API_KEY is not available
 */

export interface VerificationResult {
  passed: boolean;
  confidence: number;
  checks: Record<string, boolean | string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: Record<string, any>;
  reasoning: string;
  flags: string[];
  metrics: {
    tokens_used: number;
    processing_time_ms: number;
    model: string;
  };
}

/**
 * MOCK: Verify legitimacy documents (Milestone 1)
 * Always returns success for prototype testing
 */
export async function verifyLegitimacy(params: {
  stadgarUrl: string;
  ekonomiskUrl: string;
  expectedOrgName: string;
  expectedOrgNumber?: string;
}): Promise<VerificationResult> {
  const { expectedOrgName, expectedOrgNumber } = params;

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    passed: true,
    confidence: 0.92,
    checks: {
      documents_legitimate: true,
      org_number_match: true,
      financial_health_acceptable: true,
      documents_recent: true,
      stadgar_legitimate: true,
    },
    details: {
      org_number: expectedOrgNumber || '802426-XXXX',
      org_name: expectedOrgName,
      financial_health: 'good',
    },
    reasoning: '[MOCK] Dokumenten verkar legitima. Detta är en mock-verifiering för prototyp-testning.',
    flags: ['MOCK_VERIFICATION'],
    metrics: {
      tokens_used: 0,
      processing_time_ms: 1000,
      model: 'mock-gemini-1.5-flash',
    },
  };
}

/**
 * MOCK: Verify impact report (Milestone 2)
 * Always returns success for prototype testing
 */
export async function verifyImpactReport(params: {
  socialMediaLink: string;
  photoUrls: string[];
  impactDescription: string;
  projectCategory: string;
}): Promise<VerificationResult> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    passed: true,
    confidence: 0.88,
    checks: {
      link_valid: true,
      photos_included: params.photoUrls.length > 0,
      photos_authentic: true,
      description_complete: params.impactDescription.length > 100,
      spending_explained: true,
      matches_category: true,
      impact_described: true,
    },
    details: {},
    reasoning: '[MOCK] Impact-rapporten är komplett och detaljerad. Detta är en mock-verifiering för prototyp-testning.',
    flags: ['MOCK_VERIFICATION'],
    metrics: {
      tokens_used: 0,
      processing_time_ms: 1000,
      model: 'mock-gemini-1.5-flash',
    },
  };
}

/**
 * Save verification result to database
 */
export async function saveVerificationResult(
  milestoneId: string,
  verificationType: 'LEGITIMACY_CHECK' | 'IMPACT_REPORT',
  result: VerificationResult
): Promise<void> {
  console.log('[MOCK] Saving verification result:', {
    milestoneId,
    verificationType,
    passed: result.passed,
    confidence: result.confidence,
  });
}
