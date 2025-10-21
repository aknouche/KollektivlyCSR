# Phase 3 Implementation Guide - Test-Driven Development

## 🎯 What We've Built (TDD Approach)

Following **Test-Driven Development**, I've created:
1. ✅ Comprehensive test suites FIRST
2. ✅ Clean implementations to pass the tests
3. ✅ Full TypeScript type safety
4. ✅ Production-ready error handling

---

## 📦 New Dependencies Installed

```bash
npm install stripe       # Payment processing & escrow
npm install openai       # AI verification (GPT-4o)
```

---

## 🧪 Test Coverage Created

### 1. Stripe Payment Tests (`src/lib/stripe/__tests__/payment.test.ts`)

**Test Cases**:
- ✅ Service fee calculation (4%/7%/10% tiers)
- ✅ Payment intent creation
- ✅ Minimum amount validation (10,000 SEK)
- ✅ Transfer to organization
- ✅ Metadata inclusion
- ✅ Error handling

**Run tests**:
```bash
npm test -- src/lib/stripe/__tests__/payment.test.ts
```

### 2. AI Verification Tests (`src/lib/ai/__tests__/verification.test.ts`)

**Test Cases**:
- ✅ Legitimacy verification (stadgar + årsredovisning)
- ✅ Organization name/number matching
- ✅ Financial health assessment
- ✅ Impact report verification (photos + description)
- ✅ Confidence scoring (auto-approve > 85%)
- ✅ Flag detection for suspicious content
- ✅ Processing metrics tracking

**Run tests**:
```bash
npm test -- src/lib/ai/__tests__/verification.test.ts
```

---

## 🔧 Implementations Created

### 1. Stripe Payment Integration (`src/lib/stripe/payment.ts`)

**Functions**:

#### `calculateServiceFee(grantAmount, tier)`
```typescript
// Calculate fee based on tier
calculateServiceFee(50000, 'standard') // Returns 3500 (7%)
calculateServiceFee(50000, 'basic')    // Returns 2000 (4%)
calculateServiceFee(50000, 'enhanced') // Returns 5000 (10%)
```

#### `createPaymentIntent(params)`
```typescript
// Create payment intent - company pays
const result = await createPaymentIntent({
  grantAmount: 50000,
  serviceTier: 'standard',
  projectId: 'proj_123',
  organizationId: 'org_123',
  companyEmail: 'test@company.com',
  companyName: 'Test AB',
});

// Returns:
// {
//   paymentIntentId: 'pi_xxx',
//   clientSecret: 'pi_xxx_secret_yyy',
//   totalAmount: 53500,  // 50,000 + 3,500
//   serviceFee: 3500
// }
```

#### `transferToOrganization(params)`
```typescript
// Release milestone payment to förening
const result = await transferToOrganization({
  amount: 25000,
  organizationStripeAccountId: 'acct_xxx',
  paymentCaseId: 'case_123',
  milestoneNumber: 1,
});

// Returns:
// {
//   transferId: 'tr_xxx',
//   amount: 25000
// }
```

#### `createConnectAccount(params)`
```typescript
// Onboard förening to Stripe
const result = await createConnectAccount({
  organizationId: 'org_123',
  organizationName: 'Test Förening',
  email: 'info@testforening.se',
  orgNumber: '556677-8899',
});

// Returns:
// {
//   accountId: 'acct_xxx',
//   onboardingUrl: 'https://connect.stripe.com/setup/...'
// }
```

---

### 2. AI Verification System (`src/lib/ai/verification.ts`)

**Functions**:

#### `verifyLegitimacy(params)`
```typescript
// Verify Milestone 1 documents
const result = await verifyLegitimacy({
  stadgarUrl: 'https://storage.supabase.co/documents/stadgar.pdf',
  ekonomiskUrl: 'https://storage.supabase.co/documents/arsredovisning.pdf',
  expectedOrgName: 'Test Förening',
  expectedOrgNumber: '556677-8899',
});

// Returns:
// {
//   passed: true,
//   confidence: 0.92,
//   checks: {
//     documents_legitimate: true,
//     org_number_match: true,
//     financial_health_acceptable: true,
//     documents_recent: true,
//     stadgar_legitimate: true
//   },
//   details: {
//     org_number: '556677-8899',
//     org_name: 'Test Förening',
//     financial_health: 'good'
//   },
//   reasoning: 'Documents appear legitimate...',
//   flags: [],
//   metrics: {
//     tokens_used: 1500,
//     processing_time_ms: 2300,
//     model: 'gpt-4o'
//   }
// }
```

#### `verifyImpactReport(params)`
```typescript
// Verify Milestone 2 report
const result = await verifyImpactReport({
  socialMediaLink: 'https://instagram.com/p/example',
  photoUrls: ['https://storage.../photo1.jpg', 'https://storage.../photo2.jpg'],
  impactDescription: 'Vi genomförde ett fotbollsläger för 50 ungdomar...',
  projectCategory: 'Ungdom',
});

// Returns:
// {
//   passed: true,
//   confidence: 0.88,
//   checks: {
//     link_valid: true,
//     photos_included: true,
//     photos_authentic: true,
//     description_complete: true,
//     spending_explained: true,
//     matches_category: true,
//     impact_described: true
//   },
//   reasoning: 'Report is complete and credible...',
//   flags: [],
//   metrics: { ... }
// }
```

**Auto-Approval Logic**:
- Confidence ≥ 85% → **AUTO-APPROVE** ✅
- Confidence 50-85% → **FLAG FOR MANUAL REVIEW** ⚠️
- Confidence < 50% → **AUTO-REJECT** ❌

---

## 🧪 Test Utilities Created (`src/lib/test-utils.ts`)

**Mock Data**:
- `mockPaymentCase` - Sample payment case
- `mockMilestone1`, `mockMilestone2` - Milestone data
- `mockAIVerificationResult` - AI response
- `mockCompany`, `mockOrganization` - User data

**Mock Functions**:
- `createMockSupabaseClient()` - Mock Supabase
- `createMockRequest()` - Mock Next.js request
- `createMockResponse()` - Mock Next.js response

---

## 📋 Next Steps to Complete Phase 3

### Step 1: Apply Database Migrations ⚠️ **DO THIS FIRST**

```bash
# Go to Supabase Dashboard → SQL Editor
# Run these migrations in order:

1. supabase/migrations/20250120000000_add_companies_table.sql
2. supabase/migrations/20250121000000_add_payment_escrow_schema.sql
```

See `FIX_ERRORS_NOW.md` for detailed instructions.

### Step 2: Add Environment Variables

Add to your `.env.local`:

```bash
# Stripe (get from dashboard.stripe.com)
STRIPE_SECRET_KEY="sk_test_your_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"

# OpenAI (get from platform.openai.com)
OPENAI_API_KEY="sk-your_openai_key_here"
```

### Step 3: Create API Endpoints

I'll create these next:
- [ ] `/api/payments/create-intent` - Start payment
- [ ] `/api/payments/webhook` - Stripe webhook
- [ ] `/api/milestones/[id]/upload-documents` - Milestone 1 upload
- [ ] `/api/milestones/[id]/verify` - Trigger AI verification
- [ ] `/api/milestones/[id]/submit-report` - Milestone 2 submit
- [ ] `/api/milestones/[id]/release-payment` - Transfer money

### Step 4: Create UI Pages

- [ ] `/stod-projekt/[id]` - Company payment page (update from mock)
- [ ] `/organisation/milestones/[id]/upload` - Document upload
- [ ] `/organisation/milestones/[id]/report` - Impact report form
- [ ] `/organisation/stripe-onboarding` - Connect Stripe

### Step 5: Run All Tests

```bash
npm test
```

Should pass all tests!

---

## 🎯 Complete Payment Flow (Once Implemented)

### Company Journey:
1. Browse projects → Click "Stöd projekt"
2. Choose grant amount + service tier
3. Pay via Stripe (grant + fee)
4. Wait for milestones

### Förening Journey:
1. **Stripe Onboarding**: Connect bank account
2. **Milestone 1** (50%):
   - Upload stadgar + årsredovisning
   - AI verifies → Auto-approve (if 85%+)
   - Receive 50% payment
3. **Milestone 2** (50%):
   - Post on social media
   - Upload photos + description
   - AI verifies → Auto-approve
   - Receive final 50%

### Company Gets:
- Real-time notifications
- Auto-generated ESG report (PDF)
- Verified impact data

---

## 💰 Cost Estimates

**At 100 grants/month (50,000 SEK avg)**:

### Revenue:
- Service fees (70% standard tier): **245,000 SEK/month**

### Costs:
- Stripe: ~3,000 SEK (1.4% + 1.80 SEK per transaction)
- OpenAI: ~2,000 SEK (~1,000 tokens per verification × 200 verifications)
- Supabase Storage: ~0 SEK (10 GB free)

**Net profit**: ~240,000 SEK/month (98% margin) 🚀

---

## 🔒 Security Features

✅ **Payment Security**:
- PCI compliance via Stripe
- No credit card data touches our servers
- Escrow held by Stripe

✅ **AI Verification**:
- 85% confidence threshold
- Manual review for edge cases
- Complete audit trail in database

✅ **Data Protection**:
- RLS policies on all tables
- Service role only for sensitive operations
- Encrypted storage for documents

---

## 📚 Files Created

### Tests:
1. `src/lib/stripe/__tests__/payment.test.ts`
2. `src/lib/ai/__tests__/verification.test.ts`

### Implementations:
3. `src/lib/stripe/payment.ts`
4. `src/lib/ai/verification.ts`

### Utilities:
5. `src/lib/test-utils.ts`
6. `.env.test`

### Documentation:
7. `PHASE_3_IMPLEMENTATION_GUIDE.md` (this file)
8. `FIX_ERRORS_NOW.md`
9. `docs/APPLY_MIGRATIONS.md`
10. `docs/DEVELOPMENT_STATUS.md`

---

## ✅ Progress Summary

**Done**:
- ✅ Database schema (payment_cases, milestones, ai_verifications, esg_reports)
- ✅ Stripe integration with tests
- ✅ AI verification with tests
- ✅ Test utilities and mocks
- ✅ Type-safe implementations

**Remaining** (~4-6 hours):
- API endpoints (2 hours)
- UI pages (2-3 hours)
- E2E testing (1 hour)

**Ready to deploy!** Once API + UI are done.

---

Want me to continue with the API endpoints and UI pages? 🚀
