# Kollektivly - Development Guide

## 🎯 What We Do
Platform connecting Swedish companies with verified föreningar. Companies support samhällsprojekt with guaranteed impact reporting through AI-verified escrow payments.

**Core Value**: "No Report, No Payment" - We hold grant money and only release it when AI verifies impact reports.

---

## Current Status

**Production**: https://kollektivly-csr.vercel.app/
**Stack**: Next.js 14 + Supabase + Vercel
**Cost**: 0 SEK/month (free tier)

**Phase 1**: ✅ Complete (registration, authentication, homepage)
**Phase 2**: 🔄 In progress (search, contact, dashboards, project submission)
**Phase 3**: ⏳ Next (payment escrow, AI verification, reporting)

---

## 💰 Business Model

### Free Platform
- Companies browse/contact föreningar: **FREE**
- Föreningar list projects: **FREE**

### Revenue: Escrow + Verification Service
Companies pay **service fee ON TOP of grant amount** (not deducted from it).

**How it works**:
1. Company commits 50,000 SEK grant to förening
2. Adds 3,500 SEK service fee (7%)
3. Total charged: **53,500 SEK**
4. Kollektivly receives: **3,500 SEK** (immediately)
5. Grant held in **escrow**: **50,000 SEK**
6. Förening submits milestone reports
7. **AI verifies** reports (completeness, quality, impact claims)
8. **Payment released** only when verified
9. Company gets **auto-generated ESG report**

**Verification Tiers**:
- **Basic (4%)**: Simple escrow + format checks - 2,000 SEK on 50K grant
- **Standard (7%)**: AI verification + ESG reports - 3,500 SEK on 50K grant ✅ Recommended
- **Enhanced (10%)**: + Legitimacy checks + custom support - 5,000 SEK on 50K grant

**Revenue Example**:
- 100 grants/month at avg 50,000 SEK
- 70% choose Standard (7%)
- Monthly: 245,000 SEK
- Annual: **2,940,000 SEK**
- Break-even: 4 grants/month

---

## 🗺️ Roadmap

**Phase 2 (4-6 weeks)**: Core Features
- Search & filter (category, location, UN goals, dates)
- Contact system (companies ↔ föreningar)
- Organization dashboard (views, contacts)
- Project submission form
- Company dashboard (tracking)

**Phase 3 (6-8 weeks)**: Payment & Verification
- Stripe escrow integration
- Milestone payment system
- AI report verification (OpenAI API)
- Auto ESG report generation (PDF)
- Förening verification (stadgar, årsredovisning via AI)

**Phase 4 (Optional)**: Advanced
- Multi-language (Swedish/English)
- Mobile app
- Advanced analytics

---

## Tech Stack

**Frontend**: Next.js 14, TypeScript, TailwindCSS
**Backend**: Supabase (PostgreSQL, Auth, Storage)
**Payments**: Stripe Connect (escrow)
**AI**: OpenAI GPT-4 for report verification
**PDF**: Pdfmonkey.io
**Hosting**: Vercel (0 SEK/month)

---

## Commands

```bash
npm run dev          # localhost:3000
npm run build        # Production build
npm test             # Run tests
git push origin main # Auto-deploy to Vercel
```

---

## Key Decisions

**✅ What We Do**:
- Transaction-based (not subscriptions)
- AI-verified escrow (not just payments)
- Fee ON TOP of grant (not deducted)
- Simple tiers (not complex add-ons)
- Self-service (not enterprise sales)

**❌ What We Avoid**:
- Subscriptions (barrier to entry)
- CSRD compliance software (too complex)
- Deducting fees from grant (bad optics)
- Manual verification (doesn't scale)

---

## Competitive Advantage

**Without Kollektivly** (traditional grants):
- No verification → risk of misuse
- Manual follow-up → 10-20 hours/grant
- No ESG docs → hard to report impact
- Inconsistent reporting → wasted time

**With Kollektivly**:
- AI-verified reports → guaranteed impact
- Zero follow-up → automated process
- Auto ESG reports → ready for stakeholders
- Standard format → clean data
- **Time saved**: 15 hours = 3,000+ SEK value
- **Cost**: 7% fee on 50K = 3,500 SEK

**Value delivered > Price charged** ✅

---

## Progress

**DONE** ✅
- [x] MVP with Supabase (2025-10-10)
- [x] Privacy policy (2025-10-13)
- [x] UI cleanup: CSR → Samhällsnytta (2025-10-16)
- [x] Business model: Transaction-based (2025-10-16)

**NEXT** ⏳
- [ ] Search & filter
- [ ] Contact system
- [ ] Dashboards
- [ ] Project submission

**LATER** 🔮
- [ ] Stripe escrow
- [ ] AI verification
- [ ] ESG reports

---

**Last Updated**: 2025-10-16
**Philosophy**: Keep it simple. Build what scales. Charge for real value.
