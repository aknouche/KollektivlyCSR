/**
 * AI Verification System using OpenAI GPT-4o
 * Verifies legitimacy documents and impact reports
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const AI_MODEL = 'gpt-4o'; // Can read PDFs and analyze images
const CONFIDENCE_THRESHOLD = 0.85; // Auto-approve if confidence > 85%

// Verification result types
export interface VerificationResult {
  passed: boolean;
  confidence: number;
  checks: Record<string, boolean | string>;
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
 * Verify legitimacy documents (Milestone 1)
 * Checks stadgar and årsredovisning for authenticity
 */
export async function verifyLegitimacy(params: {
  stadgarUrl: string;
  ekonomiskUrl: string;
  expectedOrgName: string;
  expectedOrgNumber?: string;
}): Promise<VerificationResult> {
  const { stadgarUrl, ekonomiskUrl, expectedOrgName, expectedOrgNumber } = params;
  const startTime = Date.now();

  const prompt = `Du analyserar dokument från en svensk ideell förening för att verifiera deras legitimitet.

UPPGIFT:
Granska stadgar och årsredovisning/ekonomisk redovisning från föreningen och verifiera:

1. LEGITIMITET: Är dokumenten äkta svenska föreningsdokument (inte fabricerade, inte stock photos)?
2. ORGANISATIONSNUMMER: Extrahera organisationsnummer från dokumenten
3. NAMN: Extrahera organisationsnamn från dokumenten
4. MATCHNING: Stämmer organisationsnummer och namn med förväntat: "${expectedOrgName}"${expectedOrgNumber ? ` (${expectedOrgNumber})` : ''}?
5. EKONOMI: Är den ekonomiska redovisningen rimlig och aktuell (max 2 år gammal)?
6. STADGAR: Ser stadgarna ut som legitima svenska föreningsstadgar?

DOKUMENTER:
- Stadgar: ${stadgarUrl}
- Ekonomisk redovisning: ${ekonomiskUrl}

SVARA I JSON-FORMAT:
{
  "legitimate": true/false,
  "org_number": "extracted org number",
  "org_name": "extracted org name",
  "documents_match": true/false,
  "financial_health": "good/warning/poor",
  "documents_recent": true/false,
  "stadgar_legitimate": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "detailed explanation in Swedish",
  "flags": ["array of any concerns or warnings"]
}

Var kritisk men rättvis. Om något ser suspekt ut, markera det i flags.`;

  try {
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Du är en expert på att granska svenska föreningsdokument och upptäcka bedrägeri.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3, // Lower temperature for more consistent, factual responses
    });

    const processingTime = Date.now() - startTime;
    const aiResult = JSON.parse(response.choices[0].message.content || '{}');
    const tokensUsed = response.usage?.total_tokens || 0;

    // Determine if verification passed
    const passed =
      aiResult.legitimate &&
      aiResult.documents_match &&
      aiResult.confidence >= CONFIDENCE_THRESHOLD;

    return {
      passed,
      confidence: aiResult.confidence || 0,
      checks: {
        documents_legitimate: aiResult.legitimate || false,
        org_number_match: aiResult.documents_match || false,
        financial_health_acceptable:
          aiResult.financial_health === 'good' || aiResult.financial_health === 'warning',
        documents_recent: aiResult.documents_recent || false,
        stadgar_legitimate: aiResult.stadgar_legitimate || false,
      },
      details: {
        org_number: aiResult.org_number,
        org_name: aiResult.org_name,
        financial_health: aiResult.financial_health,
      },
      reasoning: aiResult.reasoning || '',
      flags: aiResult.flags || [],
      metrics: {
        tokens_used: tokensUsed,
        processing_time_ms: processingTime,
        model: AI_MODEL,
      },
    };
  } catch (error) {
    console.error('AI verification error:', error);
    throw new Error(`AI verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Verify impact report (Milestone 2)
 * Checks social media links, photos, and description
 */
export async function verifyImpactReport(params: {
  socialMediaLink: string;
  photoUrls: string[];
  impactDescription: string;
  projectCategory: string;
}): Promise<VerificationResult> {
  const { socialMediaLink, photoUrls, impactDescription, projectCategory } = params;
  const startTime = Date.now();

  const prompt = `Du analyserar en impact-rapport från en svensk förening som genomfört ett samhällsprojekt.

UPPGIFT:
Verifiera att impact-rapporten är komplett och trovärdig.

PROJEKTKATEGORI: ${projectCategory}

SOCIAL MEDIA LÄNK: ${socialMediaLink}

ANTAL FOTON: ${photoUrls.length}
FOTO URLs: ${photoUrls.join(', ')}

BESKRIVNING:
"${impactDescription}"

GRANSKA:
1. LÄNK: Är social media länken giltig och tillgänglig?
2. FOTON: Finns det foton inkluderade (minst 1)?
3. BESKRIVNING: Är beskrivningen komplett och detaljerad (minst 100 ord)?
4. UTGIFTER: Förklaras tydligt hur pengarna spenderats?
5. KATEGORI: Matchar aktiviteten projektkategorin "${projectCategory}"?
6. AUTENTICITET: Ser fotona och beskrivningen autentiska ut (inte stock photos/AI-genererat)?
7. IMPACT: Beskrivs konkret impact/resultat?

SVARA I JSON-FORMAT:
{
  "link_valid": true/false,
  "photos_included": true/false,
  "photos_authentic": true/false,
  "description_complete": true/false,
  "spending_explained": true/false,
  "matches_category": true/false,
  "impact_described": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "detailed explanation in Swedish",
  "flags": ["array of any concerns"]
}

Var kritisk om beskrivningen är alltför vag eller fotona ser fabricerade ut.`;

  try {
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Du är en expert på att verifiera impact-rapporter och upptäcka bedrägliga eller överdrivna påståenden.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const processingTime = Date.now() - startTime;
    const aiResult = JSON.parse(response.choices[0].message.content || '{}');
    const tokensUsed = response.usage?.total_tokens || 0;

    // Determine if verification passed
    const passed =
      aiResult.description_complete &&
      aiResult.spending_explained &&
      aiResult.confidence >= CONFIDENCE_THRESHOLD;

    return {
      passed,
      confidence: aiResult.confidence || 0,
      checks: {
        link_valid: aiResult.link_valid || false,
        photos_included: aiResult.photos_included || false,
        photos_authentic: aiResult.photos_authentic || false,
        description_complete: aiResult.description_complete || false,
        spending_explained: aiResult.spending_explained || false,
        matches_category: aiResult.matches_category || false,
        impact_described: aiResult.impact_described || false,
      },
      details: {},
      reasoning: aiResult.reasoning || '',
      flags: aiResult.flags || [],
      metrics: {
        tokens_used: tokensUsed,
        processing_time_ms: processingTime,
        model: AI_MODEL,
      },
    };
  } catch (error) {
    console.error('AI verification error:', error);
    throw new Error(`AI verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Save verification result to database
 */
export async function saveVerificationResult(
  milestoneId: string,
  verificationType: 'LEGITIMACY_CHECK' | 'IMPACT_REPORT',
  result: VerificationResult,
  prompt: string
): Promise<void> {
  // This would save to ai_verifications table
  // Implementation depends on your database client setup
  console.log('Saving verification result:', {
    milestoneId,
    verificationType,
    passed: result.passed,
    confidence: result.confidence,
  });
}
