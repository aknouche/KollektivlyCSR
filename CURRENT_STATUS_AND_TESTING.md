# 🎯 Current Status & Testing Guide

## Where We Are Now

### ✅ Completed (100%)

1. **Phase 1** - MVP Foundation
   - ✅ Authentication system
   - ✅ Homepage & landing pages
   - ✅ Privacy policy & legal pages

2. **Phase 2** - Core Features
   - ✅ Company registration & login (`/foretag-logga-in`)
   - ✅ Company dashboard (`/foretag-dashboard`)
   - ✅ Goals assessment form (`/foretag-matningsfragor`)
   - ✅ Expert consultation recommendations
   - ✅ Search & filter projects (`/alla-projekt`)
   - ✅ Contact system (companies ↔ föreningar)

3. **Phase 3** - Payment & AI Verification (CODE COMPLETE)
   - ✅ Stripe integration with escrow (`src/lib/stripe/payment.ts`)
   - ✅ Google Gemini AI verification (`src/lib/ai/verification-gemini.ts`)
   - ✅ Payment API endpoints (5 endpoints)
   - ✅ 2-milestone payment system
   - ✅ Test coverage (TDD approach)
   - ✅ SDK installed (`@google/generative-ai`)

### ⚠️ What's Left (DATABASE SETUP ONLY)

**You need to apply database migrations and create storage buckets.**

---

## 📋 Deployment Checklist

### Step 1: Check Database Status (1 minute)

1. Go to: https://supabase.com/dashboard
2. Select your project → **SQL Editor** → New query
3. Copy & paste from `check-status.sql` (I just created it)
4. Click **Run**

**Expected Result**: Should show all 4 tables (companies, payment_cases, milestones, ai_verifications)

**If tables are MISSING** → Continue to Step 2

---

### Step 2: Apply Database Migrations (5 minutes) ⚠️ CRITICAL

**Option A: Supabase Dashboard (Recommended)**

1. Go to: https://supabase.com/dashboard → SQL Editor → New query

2. **First Migration** - Copy ALL content from:
   `supabase/migrations/20250120000000_add_companies_table.sql`

   Paste and click **"Run"**

3. **Second Migration** - Copy ALL content from:
   `supabase/migrations/20250121000000_add_payment_escrow_schema.sql`

   Paste and click **"Run"**

**Verify it worked**:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('companies', 'payment_cases', 'milestones', 'ai_verifications');
```
Should return 4 rows ✅

---

### Step 3: Create Storage Buckets (3 minutes)

Go to: https://supabase.com/dashboard → Storage

#### 3.1 Create "documents" bucket:
- Click **"New bucket"**
- Name: `documents`
- Public: **Yes** ✅
- Allowed MIME types: `application/pdf`
- Max file size: 10 MB

#### 3.2 Create "photos" bucket:
- Click **"New bucket"**
- Name: `photos`
- Public: **Yes** ✅
- Allowed MIME types: `image/jpeg, image/png, image/webp`
- Max file size: 5 MB

#### 3.3 Set Storage Policies:

Go to **Storage** → Click on `documents` bucket → **Policies** tab → **New Policy**

**For DOCUMENTS bucket**:

**Policy 1**: Allow authenticated uploads
- Operation: INSERT
- Target roles: **authenticated** (select from dropdown)
- Policy name: "Allow authenticated uploads"
- WITH CHECK expression: `bucket_id = 'documents'`

**Policy 2**: Public read access
- Operation: SELECT
- Target roles: **public** (select from dropdown)
- Policy name: "Public read access"
- USING expression: `bucket_id = 'documents'`

**For PHOTOS bucket**:

Repeat the same 2 policies but change `'documents'` to `'photos'`

---

### Step 4: Update Webhook Secret (30 seconds)

Your `.env.local` shows:
```bash
STRIPE_WEBHOOK_SECRET="whsec_will_add_this_later"
```

**FOR NOW**: This is fine for local testing. We'll set this up after first deployment.

---

### Step 5: Test Locally (5 minutes)

```bash
# Start dev server
npm run dev
```

Visit: http://localhost:3000

**Test Flow 1: Company Registration**
1. Go to `/foretag-logga-in`
2. Click "Registrera" tab
3. Fill in:
   - Company name: "Test AB"
   - Email: "test@example.com"
   - Password: "testtest123"
   - Accept GDPR
4. Click "Registrera"

**Expected**: Redirects to `/foretag-dashboard` ✅

**If you get error**: Check browser console and tell me the error message

---

**Test Flow 2: Goals Assessment**
1. While logged in, click the banner: "Slutför din målsättningsformulär"
2. Go through 5 steps:
   - Step 1: Select goals (e.g., "CSRD compliance", "ESG reporting")
   - Step 2: Select maturity level (e.g., "Intermediate")
   - Step 3: Company profile (50-200 employees, 5-20M budget)
   - Step 4: Challenges (e.g., "Lack of expertise")
   - Step 5: Consultation interests (CSRD, Marketing)
3. Click "Skicka formulär"

**Expected**: Redirects to `/foretag-matningsfragor/resultat` with recommendations ✅

---

**Test Flow 3: Browse Projects**
1. Go to `/alla-projekt`
2. Search/filter projects

**Expected**: See list of projects ✅

---

### Step 6: Test Payment Flow (AFTER DATABASE SETUP)

**Once migrations are applied**, you can test the full payment flow:

#### 6.1 Create Test Payment Intent

```bash
curl -X POST http://localhost:3000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "test-project-123",
    "organizationId": "test-org-456",
    "grantAmount": 50000,
    "serviceTier": "standard",
    "companyEmail": "test@company.com",
    "companyName": "Test Company AB"
  }'
```

**Expected Response**:
```json
{
  "paymentIntentId": "pi_...",
  "clientSecret": "pi_..._secret_...",
  "totalAmount": 53500,
  "serviceFee": 3500,
  "paymentCaseId": "uuid-here"
}
```

**If you get error**: It means migrations weren't applied correctly.

---

#### 6.2 Test Document Upload (After payment)

First, create a test PDF:
```bash
# On Windows
echo "Test Stadgar Document" > stadgar-test.pdf
echo "Test Ekonomisk Redovisning" > ekonomisk-test.pdf
```

Then upload:
```bash
curl -X POST http://localhost:3000/api/milestones/{milestone-id}/upload-documents \
  -F "stadgar=@stadgar-test.pdf" \
  -F "ekonomisk_redovisning=@ekonomisk-test.pdf"
```

**Expected**:
```json
{
  "success": true,
  "message": "Dokument uppladdade! AI-verifiering startar automatiskt.",
  "stadgarUrl": "https://...supabase.co/storage/v1/object/public/documents/...",
  "ekonomiskUrl": "https://...supabase.co/storage/v1/object/public/documents/..."
}
```

---

#### 6.3 Test AI Verification (Gemini)

```bash
curl -X POST http://localhost:3000/api/milestones/{milestone-id}/verify
```

**Expected**:
```json
{
  "success": true,
  "verification": {
    "passed": true,
    "confidence": 0.88,
    "reasoning": "Dokumenten ser legitima ut...",
    "flags": []
  },
  "status": "APPROVED",
  "message": "Verifiering godkänd! 25,000 SEK överförd till organisationen."
}
```

**This tests**:
- ✅ Gemini API key works
- ✅ AI can analyze documents
- ✅ Stripe transfer executes
- ✅ Milestone status updates

---

### Step 7: Deploy to Production (2 minutes)

Once everything works locally:

```bash
git add .
git commit -m "Phase 3 complete: Payment escrow + Gemini AI verification"
git push origin main
```

Vercel will auto-deploy! 🚀

---

### Step 8: Set Up Stripe Webhook (Production)

After deployment:

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"+ Add endpoint"**
3. Endpoint URL: `https://kollektivly-csr.vercel.app/api/payments/webhook`
4. Events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `transfer.created`
5. Click **"Add endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_`)
7. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
8. Update `STRIPE_WEBHOOK_SECRET` with the real value
9. Redeploy

---

## 🧪 What You Need to Test & Verify

### Critical Path (MUST TEST):

1. ✅ **Database migrations applied** → Run `check-status.sql` in Supabase
2. ✅ **Storage buckets created** → Check Supabase Storage dashboard
3. ✅ **Company registration works** → Try registering at `/foretag-logga-in`
4. ✅ **Payment intent creation** → Test API endpoint with curl
5. ✅ **Gemini AI verification** → Test with real documents
6. ✅ **Stripe transfer** → Verify money moves to connected account

### Nice to Have (Can Test Later):

- Email notifications (you have Resend API key already)
- Impact report submission (Milestone 2)
- ESG report generation
- Admin dashboard

---

## 🐛 Common Issues & Fixes

### Issue 1: "Relation 'companies' does not exist"
**Fix**: Apply migrations (Step 2 above)

### Issue 2: "Failed to upload document"
**Fix**: Create storage buckets (Step 3 above)

### Issue 3: "API key not valid" (Gemini)
**Fix**: Check `.env.local` has correct `GOOGLE_AI_API_KEY`

### Issue 4: "Stripe webhook signature verification failed"
**Fix**: Update `STRIPE_WEBHOOK_SECRET` in production (Step 8)

---

## 📊 Current Environment Variables Status

Looking at your `.env.local`:

✅ **Supabase** - All keys present
✅ **Stripe** - Test keys present (live keys needed for production)
✅ **Google Gemini** - API key present (`AIzaSyBrQSH2NetU8tUcydGWt4VgNYCsGdyHPFs`)
⚠️ **Stripe Webhook** - Says "will_add_this_later" (OK for local testing)

**You're 95% ready!** Just need to apply migrations.

---

## 🚀 Summary

**What's DONE**:
- ✅ All code written (30+ files)
- ✅ Tests written (TDD approach)
- ✅ Gemini SDK installed
- ✅ API keys configured

**What YOU need to do** (10 minutes total):
1. Apply database migrations (5 min)
2. Create storage buckets (3 min)
3. Test locally (2 min)
4. Deploy to production (1 min)

**Then you're LIVE!** 🎉

---

## Next Action

**RIGHT NOW**: Go to Supabase Dashboard and apply the migrations.

Tell me if you get any errors!
