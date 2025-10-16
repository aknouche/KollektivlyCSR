# Kollektivly - Development Guide

## 🎯 Core Purpose
Platform connecting Swedish companies with verified non-profit organizations running samhällsprojekt (social impact projects). Focus on hållbar utveckling and measurable samhällsnytta.

## Current Status

**Phase 1: ✅ COMPLETE**
- **Production**: https://kollektivly-csr.vercel.app/
- **Stack**: Next.js 14 + Supabase + Vercel
- **Cost**: 0 SEK/month (free tier)
- **Features**: Dynamic homepage, organization registration, hCaptcha, GDPR compliant

**Phase 2: IN PROGRESS**
- [ ] Search and filtering
- [ ] Contact system
- [ ] Organization dashboard
- [ ] Project submission form

---

## 💰 Business Model (UPDATED)

### **Free for Everyone (Browsing & Communication)**
- ✅ Companies browse all projects **FREE**
- ✅ Companies contact organizations **FREE**
- ✅ Organizations register and list projects **FREE**
- ✅ No subscription fees

### **Revenue: Transaction-Based (Companies Pay When Supporting Projects)**

**Payment flow**: Company finds project → Decides to support → **Checkout with add-on services** → Payment goes to förening

**Base Transaction**:
- Stripe payment processing (3-5% fee)
- Secure transfer to organization

**Optional Add-On Services at Checkout**:
1. **Milestone Payments** (pay in phases)
   - Set payment milestones
   - Require progress reports before each payment
   - Automatic payment release after approval
   - **Price**: +2% of transaction or 500 SEK minimum

2. **Simple ESG Report** (NOT CSRD)
   - Professional PDF with company branding
   - SDG alignment, project details, impact summary
   - Suitable for LinkedIn, website, stakeholder presentations
   - **Price**: 299 SEK per report

3. **Social Media Material**
   - Branded graphics for LinkedIn, Facebook, Instagram
   - Ready-to-share announcement posts
   - "We support [project]" templates
   - **Price**: 199 SEK per project

4. **AI Verification** (Enhanced due diligence)
   - Automated check of organization's stadgar
   - Analysis of årsredovisning
   - Legitimacy verification report
   - **Price**: 499 SEK per organization

**Example Revenue**:
```
Company pays 50,000 SEK to support project:
- Base fee (4%): 2,000 SEK
- Milestone payments addon: +500 SEK
- ESG report: +299 SEK
- Social media pack: +199 SEK
- AI verification: +499 SEK

Total platform revenue: 3,497 SEK (7% of transaction)
Förening receives: 46,503 SEK (93%)
```

### **Revenue Projections**
```
Target: 100 transactions/month at average 25,000 SEK

Conservative estimate:
- 50% add milestone payments: 50 × 500 = 25,000 SEK
- 30% add ESG report: 30 × 299 = 8,970 SEK
- 20% add social media: 20 × 199 = 3,980 SEK
- 40% add AI verification: 40 × 499 = 19,960 SEK
- Base fees (4%): 100 × 1,000 = 100,000 SEK

Monthly revenue: ~158,000 SEK
Annual revenue: ~1,900,000 SEK
Operating cost: ~5,000 SEK/month
```

**Path to Profitability**: Clear and transaction-driven ✅

---

## 🗺️ Development Roadmap

### **Phase 2: Core Features (4-6 weeks) - FREE HOSTING**
- [ ] **Search & Filter**: By category, location, budget, UN goals, dates
- [ ] **Contact System**: Companies contact organizations directly
- [ ] **Organization Dashboard**: See project views, contact requests
- [ ] **Project Submission Form**: Organizations create projects
- [ ] **Company Dashboard**: Track viewed projects, contacts sent

### **Phase 3: Payment System (6-8 weeks)**
- [ ] **Stripe Integration**: Secure payment processing
- [ ] **Checkout Flow**: Base payment + optional add-on services
- [ ] **Milestone System**: Pay in phases with reporting requirements
- [ ] **ESG Report Generator**: Simple PDF with SDG alignment
- [ ] **Social Media Generator**: Branded graphics and templates
- [ ] **AI Verification**: Automated legitimacy checks

### **Phase 4: Advanced Features (Optional)**
- [ ] **Multi-language**: Swedish/English support
- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **Advanced Analytics**: Detailed impact tracking
- [ ] **CSRD-Lite**: Data export for companies needing ESRS Social (S) evidence

---

## Tech Stack

**Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS, Framer Motion
**Backend**: Supabase (PostgreSQL, Auth, Storage)
**Payments**: Stripe
**AI**: OpenAI API for verification
**PDF Generation**: Pdfmonkey.io or similar
**Hosting**: Vercel (0 SEK/month on free tier)

**File Structure**:
```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── registrera/           # Organization registration
│   ├── alla-projekt/         # Project browsing
│   └── api/                  # API routes
├── components/               # React components
├── lib/supabase/            # Database client
└── types/                    # TypeScript types
```

---

## Commands

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm test             # Run tests
npm run lint         # ESLint check
```

---

## Development Workflow

```bash
1. npm run dev              # Work locally
2. npm test                 # Verify tests pass
3. git add . && git commit -m "description"
4. git push origin main     # Auto-deploys to Vercel
```

**Philosophy**: Keep it simple. Add complexity only when needed.

---

## Key Technical Decisions

### ✅ What We Use
- **Next.js 14.x** (avoid 15.x - Turbopack issues)
- **TailwindCSS 3.x** (avoid v4 - PostCSS conflicts)
- **Supabase** for database/auth (free tier, 0 SEK/month)
- **TypeScript** for type safety
- **Simple Stats** over CSRD compliance (95% of target market doesn't need CSRD)

### ❌ What We Avoid
- Complex subscription tiers (use transaction-based revenue instead)
- Full CSRD compliance software (too complex, wrong market)
- Enterprise sales (focus on self-service SMEs)
- Rich text editors (security risk, use simple textareas)

---

## Business Strategy

### **Why Transaction-Based Model Works**
- ✅ **No barrier to entry**: Free browsing removes friction
- ✅ **Pay when value is clear**: Companies only pay when committing to support
- ✅ **Higher conversion**: Easier to convert than monthly subscriptions
- ✅ **Scalable**: Revenue grows with platform usage
- ✅ **Add-on upsells**: Optional services increase average transaction value

### **Target Market**
- **Companies**: Swedish SMEs (0-250 employees) seeking samhällsnytta
- **Organizations**: Non-profits, föreningar, ideella organisationer
- **Geography**: Sweden-focused, expand to Nordics later

### **Competitive Advantage**
- 🎯 **Transaction-based** (not subscription burden)
- 🎯 **Swedish-focused** (local föreningar, local companies)
- 🎯 **Affordable add-ons** (299-499 SEK vs 50,000+ SEK consultants)
- 🎯 **Self-service** (no sales team needed)
- 🎯 **Action-oriented** (real projects, real impact, not just paperwork)

---

## Security & Compliance

- ✅ **GDPR**: Privacy policy, consent flows, EU data storage
- ✅ **PCI-DSS**: Stripe handles all payment data
- ✅ **AML/KYC**: Organization number verification via Bolagsverket API
- ✅ **Content Moderation**: Perspective API for spam/toxicity detection
- ✅ **Rate Limiting**: Prevent abuse (registration, contact forms)

See `docs/SECURITY_ANALYSIS.md` for detailed security guidelines.

---

## Cost Structure

### **Current (Phase 1-2)**: 0 SEK/month
- Vercel hosting (free tier)
- Supabase database (free tier)
- Supabase storage (free tier)

### **Phase 3 (Payment System)**: ~2,500 SEK/month
- Stripe fees: 3-5% per transaction only
- PDF generation: ~500 SEK/month
- OpenAI API: ~1,000 SEK/month
- Buffer for scaling: ~1,000 SEK/month

**Break-even**: ~20 transactions/month

---

## Progress Tracker

**COMPLETED** ✅
- [x] Demo MVP (2025-09-25)
- [x] Supabase integration (2025-10-09)
- [x] Phase 1 complete (2025-10-10)
- [x] Production deployment (2025-10-10)
- [x] Privacy policy (2025-10-13)
- [x] UI cleanup: CSR → Samhällsnytta (2025-10-16)

**NEXT UP** ⏳
- [ ] Phase 2: Search and filtering
- [ ] Phase 2: Contact system
- [ ] Phase 2: Dashboards

**FUTURE** 🔮
- [ ] Phase 3: Payment system with add-ons
- [ ] Phase 4: Multi-language support

---

**Last Updated**: 2025-10-16
**Current Phase**: Phase 2 (Core Features)
**Goal**: Keep development simple, smooth, and transaction-driven while building a meaningful platform for Swedish samhällsnytta.
