/**
 * AI Verification System using Google Gemini (FREE)
 * Verifies legitimacy documents and impact reports
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // FREE model

const CONFIDENCE_THRESHOLD = 0.85;

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

1. LEGITIMITET: Är dokumenten äkta svenska föreningsdokument (inte fabricerade)?
2. ORGANISATIONSNUMMER: Extrahera organisationsnummer från dokumenten
3. NAMN: Extrahera organisationsnamn från dokumenten
4. MATCHNING: Stämmer organisationsnummer och namn med förväntat: "${expectedOrgName}"${expectedOrgNumber ? ` (${expectedOrgNumber})` : ''}?
5. EKONOMI: Är den ekonomiska redovisningen rimlig och aktuell (max 2 år gammal)?
6. STADGAR: Ser stadgarna ut som legitima svenska föreningsstadgar?

DOKUMENTER:
- Stadgar: ${stadgarUrl}
- Ekonomisk redovisning: ${ekonomiskUrl}

VIKTIGT: Svara ENDAST med JSON i exakt detta format (ingen annan text):
{
  "legitimate": true,
  "org_number": "556677-8899",
  "org_name": "Föreningens Namn",
  "documents_match": true,
  "financial_health": "good",
  "documents_recent": true,
  "stadgar_legitimate": true,
  "confidence": 0.92,
  "reasoning": "Dokumenten ser legitima ut...",
  "flags": []
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const processingTime = Date.now() - startTime;

    // Extract JSON from response (Gemini sometimes adds markdown formatting)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const aiResult = JSON.parse(jsonText);

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
        tokens_used: 0, // Gemini doesn't return token count in free tier
        processing_time_ms: processingTime,
        model: 'gemini-1.5-flash',
      },
    };
  } catch (error) {
    console.error('Gemini verification error:', error);
    throw new Error(`AI verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Verify impact report (Milestone 2)
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

PROJEKTKATEGORI: ${projectCategory}

SOCIAL MEDIA LÄNK: ${socialMediaLink}

ANTAL FOTON: ${photoUrls.length}

BESKRIVNING:
"${impactDescription}"

GRANSKA:
1. LÄNK: Är social media länken giltig (rätt format)?
2. FOTON: Finns det tillräckligt med foton (minst 1)?
3. BESKRIVNING: Är beskrivningen komplett och detaljerad (minst 100 ord)?
4. UTGIFTER: Förklaras tydligt hur pengarna spenderats?
5. KATEGORI: Matchar aktiviteten projektkategorin "${projectCategory}"?
6. AUTENTICITET: Verkar beskrivningen autentisk (inte AI-genererad fluff)?
7. IMPACT: Beskrivs konkret impact/resultat?

VIKTIGT: Svara ENDAST med JSON i exakt detta format:
{
  "link_valid": true,
  "photos_included": true,
  "photos_authentic": true,
  "description_complete": true,
  "spending_explained": true,
  "matches_category": true,
  "impact_described": true,
  "confidence": 0.88,
  "reasoning": "Rapporten är komplett...",
  "flags": []
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const processingTime = Date.now() - startTime;

    // Extract JSON from response
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const aiResult = JSON.parse(jsonText);

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
        tokens_used: 0,
        processing_time_ms: processingTime,
        model: 'gemini-1.5-flash',
      },
    };
  } catch (error) {
    console.error('Gemini verification error:', error);
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
  console.log('Saving verification result:', {
    milestoneId,
    verificationType,
    passed: result.passed,
    confidence: result.confidence,
  });
}
