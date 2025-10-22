# MVP Simulation Mode

## Current Status: MOCK MODE ✅

For MVP testing, **all payments and AI verification are simulated**. No real money, no API keys needed.

---

## What's Simulated

### 1. **AI Verification** (Mock)
- **File**: `src/lib/ai/verification-gemini.mock.ts`
- **Behavior**: Always returns success after 1-second delay
- **Legitimacy Check**: Auto-approves all documents
- **Impact Reports**: Auto-approves all reports
- **Flags**: Results marked with `MOCK_VERIFICATION`

### 2. **Stripe Payments** (Real SDK, Test Mode)
- **File**: `src/lib/stripe/payment.ts`
- **Behavior**: Uses Stripe test mode (when STRIPE_SECRET_KEY is test key)
- **Status**: Ready for testing with Stripe test cards

---

## What Works in MVP

✅ Full payment flow UI
✅ Milestone creation
✅ Document upload simulation
✅ AI verification simulation (always passes)
✅ Payment status tracking
✅ Transfer simulation

---

## What's Disabled for MVP

❌ Real AI analysis (Google Gemini API)
❌ Real bank transfers
❌ Email notifications
❌ PDF ESG report generation

**File disabled**: `src/lib/ai/verification-gemini.ts.disabled`

---

## For Production

### Step 1: Enable Real AI Verification
```bash
# Rename the file back
mv src/lib/ai/verification-gemini.ts.disabled src/lib/ai/verification-gemini.ts

# Add to Vercel Environment Variables
GOOGLE_AI_API_KEY=your_actual_key_here

# Update imports in src/app/api/milestones/[id]/verify/route.ts
# Change .mock to real imports
```

### Step 2: Enable Real Payments
```bash
# Replace Stripe test key with live key in Vercel
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Step 3: Enable Notifications
```bash
# Add email service credentials
# Implement notification endpoints
```

---

## Testing the MVP

### Test Payment Flow
1. Browse projects as company
2. Click "Support Project"
3. Enter grant amount (min 10,000 SEK)
4. Choose service tier (Standard 7% recommended)
5. Use Stripe test card: `4242 4242 4242 4242`
6. Payment creates 2 milestones (50% each)

### Test Milestone Verification
1. Förening uploads documents (Milestone 1)
2. Click "Verify" → Mock AI auto-approves
3. Payment released (simulated transfer)
4. Förening uploads impact report (Milestone 2)
5. Click "Verify" → Mock AI auto-approves
6. Second payment released

---

## Key Files

- `src/lib/ai/verification-gemini.mock.ts` - Mock AI (active)
- `src/lib/ai/verification-gemini.ts.disabled` - Real AI (disabled)
- `src/lib/stripe/payment.ts` - Stripe integration
- `src/app/api/milestones/[id]/verify/route.ts` - Verification endpoint
- `src/app/api/payments/webhook/route.ts` - Stripe webhooks

---

**Last Updated**: 2025-01-22
**Mode**: MVP Simulation
**Cost**: 0 SEK/month (all simulated)
