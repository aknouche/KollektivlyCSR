# 🤖 Google Gemini AI Setup (FREE Alternative to OpenAI)

## Why Gemini?

✅ **Completely FREE** (no credit card required)
✅ **60 requests/minute** - More than enough for your use case
✅ **1,500 requests/day** - Handles 100+ grants/day easily
✅ **Can read PDFs natively** - Perfect for stadgar & årsredovisning
✅ **Can analyze images** - Verifies impact report photos
✅ **Same accuracy as GPT-4** for Swedish text analysis

---

## Step-by-Step Setup

### 1. Get Your Free Gemini API Key (2 minutes)

1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Select **"Create API key in new project"** (or use existing project)
4. Copy the key (starts with `AIza...`)

**Important**: Keep this key secret! Don't commit it to git.

---

### 2. Add to Environment Variables

Open your `.env.local` file and add:

```bash
# Google Gemini AI (FREE tier)
GOOGLE_AI_API_KEY="AIza..."
```

Replace `AIza...` with your actual key from Step 1.

**Your `.env.local` should now have**:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Stripe (get from dashboard.stripe.com)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google Gemini AI (FREE tier)
GOOGLE_AI_API_KEY="AIza..."
```

---

### 3. Verify Installation

Package already installed! ✅ (`@google/generative-ai`)

To verify it works, run:
```bash
npm run dev
```

---

## What's Already Done

✅ **Gemini implementation created**: `src/lib/ai/verification-gemini.ts`
✅ **API endpoints updated**: Now using Gemini instead of OpenAI
✅ **SDK installed**: `@google/generative-ai` package ready

---

## How It Works

### Milestone 1 - Legitimacy Check
```
Förening uploads:
├── Stadgar.pdf
└── Årsredovisning.pdf

Gemini AI analyzes:
├── Are documents legitimate Swedish förening documents?
├── Extract organization number
├── Extract organization name
├── Does it match expected organization?
└── Is financial health acceptable?

If confidence ≥ 85%:
  → Auto-approve ✅
  → Transfer 50% of grant (25,000 SEK)
```

### Milestone 2 - Impact Report
```
Förening submits:
├── Social media link (Instagram/Facebook post)
├── Photos (2-5 images)
└── Description (100+ words explaining spending)

Gemini AI analyzes:
├── Is link valid?
├── Are photos authentic (not stock images)?
├── Is description complete and detailed?
├── Does it explain where money was spent?
└── Does it match project category?

If confidence ≥ 85%:
  → Auto-approve ✅
  → Transfer remaining 50% (25,000 SEK)
  → Mark payment case as COMPLETED
```

---

## Gemini vs OpenAI Comparison

| Feature | Google Gemini | OpenAI GPT-4o |
|---------|---------------|---------------|
| **Cost** | FREE ✅ | $0.01-0.03 per verification |
| **PDF Reading** | Native ✅ | Via third-party tools |
| **Image Analysis** | Native ✅ | Native ✅ |
| **Swedish Text** | Excellent ✅ | Excellent ✅ |
| **Rate Limits** | 60/min, 1,500/day | Depends on tier |
| **Setup** | No credit card ✅ | Requires $10-20 credits |

**Recommendation**: Use Gemini! It's free, works great, and perfect for your use case.

---

## Testing Gemini Locally

Once you've added the API key to `.env.local`:

```bash
# 1. Start dev server
npm run dev

# 2. In another terminal, test the verification endpoint
curl -X POST http://localhost:3000/api/milestones/{milestone-id}/verify
```

You should see:
```json
{
  "success": true,
  "verification": {
    "passed": true,
    "confidence": 0.92,
    "reasoning": "Dokumenten ser legitima ut..."
  },
  "status": "APPROVED"
}
```

---

## Cost Calculator with Gemini

**At 100 grants/month (70% standard tier)**:

### Revenue:
- Service fees: **245,000 SEK/month**

### Costs:
- Stripe fees (1.4% + 1.80 SEK): ~3,000 SEK
- **Gemini AI**: **0 SEK** ✅ (completely free)
- Supabase (storage): 0 SEK (within free tier)
- Vercel (hosting): 0 SEK (free tier)

**Net Profit**: ~242,000 SEK/month (**99% margin!**)
**Break-even**: 2 grants/month

---

## Troubleshooting

### Error: "API key not valid"
- Check that you copied the full key (starts with `AIza`)
- Verify it's in `.env.local` as `GOOGLE_AI_API_KEY="..."`
- Restart dev server: `npm run dev`

### Error: "Resource exhausted"
- You've hit the 1,500/day limit
- Wait 24 hours or upgrade to paid tier (unlikely with <100 grants/day)

### Error: "Failed to parse JSON"
- Gemini sometimes returns markdown-formatted JSON
- Already handled in code (see `verification-gemini.ts:76-82`)

---

## Next Steps

1. ✅ Get Gemini API key → https://aistudio.google.com/app/apikey
2. ✅ Add to `.env.local` as `GOOGLE_AI_API_KEY`
3. ⏳ Apply database migrations (see DEPLOYMENT_COMPLETE_GUIDE.md)
4. ⏳ Create Supabase storage buckets
5. ⏳ Get Stripe API keys
6. ⏳ Test locally
7. ⏳ Deploy to production

---

## Production Deployment

When deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `GOOGLE_AI_API_KEY` with your API key
3. Redeploy: `git push origin main`

Done! 🚀

---

**Questions?** Check:
- `DEPLOYMENT_COMPLETE_GUIDE.md` - Full deployment steps
- `verification-gemini.ts` - Implementation details
- https://ai.google.dev/gemini-api/docs - Official Gemini docs
