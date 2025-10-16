# Kollektivly - Development Guide

## Product Requirements Document (PRD) - Revised

### 🎯 Core Purpose
To create a platform that connects companies focused on driving **Measurable Social Impact (ESG/Sustainability)** with verified non-profit associations that run projects. The platform must be **trustworthy, data-driven, and scalable**, while being simple and attractive to use.

### 👥 Target Audiences
- **Corporations** – Small, medium, and large companies seeking ESG and Sustainability projects
- **Non-Profits/Associations** – Seeking to reach companies with their projects and demonstrate financial transparency
- **Municipalities & Federations** – Secondary customers who can purchase reports and insights on local Social Impact
- **Investors/Partners** – Interested in scalable Sustainability Impact

### 💡 Value Proposition
- **For Corporations**: Save time, enhance brand reputation, ensure ESG compliance, and report measurable social impact
- **For Non-Profits**: Easier access to companies, professional project presentation, demonstrate financial transparency, and secure resources faster
- **For Society**: More targeted resources allocated to projects that create verified impact

### Tech Stack
- **Next.js 14.2.33** (App Router)
- **TypeScript** (Full type safety)
- **TailwindCSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

---

## Current Status

**Phase 1: ✅ COMPLETE - Functional MVP with Supabase Backend**

### Production
- **Live URL**: https://kollektivly-csr.vercel.app/
- **Database**: Supabase (PostgreSQL with RLS)
- **Storage**: Project images bucket configured
- **Auth**: Email verification system ready
- **Cost**: 0 SEK/month (free tier)

### Implemented Features
- ✅ Dynamic homepage (Supabase + static fallback)
- ✅ Organization registration with email verification
- ✅ hCaptcha bot protection
- ✅ Privacy policy (GDPR compliant)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Test coverage (Jest + React Testing Library)

### Next: Phase 2 (Enhanced Features)
- [ ] Search and filtering
- [ ] Contact system (companies ↔ organizations)
- [ ] Analytics dashboard
- [ ] Project submission form for organizations

### How to Run MVP
```bash
cd Kollektivly
npm install
npm run dev      # Development server
npm test         # Run tests (TDD)
npm run build    # Production build
# Opens at http://localhost:3000
```

---

## Development Best Practices

### 1. **Stable Versions Only**
- ✅ Next.js 14.x (avoid 15.x - has Turbopack issues)
- ✅ React 18.x (stable)
- ✅ TailwindCSS 3.x (avoid v4 - PostCSS conflicts)

### 2. **File Structure**
```
Kollektivly/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage (dynamic + fallback)
│   │   ├── registrera/page.tsx       # Registration form
│   │   ├── integritetspolicy/page.tsx # Privacy policy
│   │   └── api/
│   │       ├── organizations/register/route.ts  # Registration API
│   │       └── email/send/route.ts              # Email sending
│   ├── components/                   # React components
│   ├── lib/supabase/                # Supabase client & types
│   └── types/                        # TypeScript interfaces
├── docs/
│   ├── SECURITY_ANALYSIS.md         # Security guidelines
│   └── SUPABASE_SETUP.md            # Database setup
├── CLAUDE.md                        # This file - development guide
└── README.md                        # Quick start
```

### 3. **TypeScript Guidelines**
- Always use proper interfaces (`Project`)
- Type all props and state
- Use TypeScript file extensions (`.tsx`, `.ts`)

### 4. **Test-Driven Development (TDD)**
- Write tests FIRST (Red phase)
- Implement functionality (Green phase)
- Jest + React Testing Library setup
- Run `npm test` before committing
- Maintain test coverage for UI components

### 5. **Styling Standards**
- Use TailwindCSS utilities
- Add custom utilities to `@layer utilities` in globals.css
- Follow mobile-first responsive design

### 6. **Data Management**
- Keep Swedish content in `src/data/projects.ts`
- Use proper TypeScript typing for all data
- Follow consistent naming (camelCase for code, Swedish for content)

---

## 🗺️ Development Plan Forward

### **Phase 0: Demo MVP ✅ COMPLETE**
**Current Status**: Perfect for investor demos and concept validation
- Static frontend with 10 realistic projects
- All interaction psychology elements
- TDD foundation established
- Ready for Vercel deployment

### **Phase 1: Functional MVP (2-3 weeks) - FREE HOSTING**
**Goal**: Transform demo into working prototype with basic project management using 100% free services

**Cost Target**: 0 SEK/month (using free tiers only)

#### **Backend Setup (100% Free)**
- [ ] **Database Design**: Vercel Postgres (free tier: 256MB, 60 hours compute/month)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 2.1: Database encryption at rest (Vercel provides this)
    - Section 2.2: Prepared statements to prevent SQL injection
    - Section 2.3: Row-level security policies
- [ ] **Session Storage**: Vercel KV (free tier: 256MB, 30k commands/month)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.2: Secure session management with httpOnly cookies
    - Section 3.3: Session expiry and rotation
- [ ] **API Routes**: Next.js API routes for CRUD operations
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.1: Input validation on all endpoints (Zod schema validation)
    - Section 3.4: Rate limiting (5 requests/min per IP for registration)
    - Section 3.5: CSRF protection via Next.js built-in tokens

#### **Project Administration (Free Services)**
- [ ] **Organization Registration**: Simple email-based signup
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 4.1: Email verification required before project submission
    - Section 4.2: Email domain validation against common spam domains
    - Section 5.1: GDPR consent checkbox (explicit opt-in)
    - Section 5.2: Privacy policy link and data processing transparency
- [ ] **Email Service**: Resend (free tier: 3,000 emails/month, 100/day)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 4.3: Magic link authentication with 24h expiry
    - Section 6.1: Email content sanitization
- [ ] **Content Moderation**: Perspective API (free tier: 1M requests/day)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 6.2: Automated spam/toxicity detection
    - Section 6.3: Manual admin review for flagged content
- [ ] **Project Submission Form**: Simple textarea editor (no rich text = no XSS risk)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.1: Text sanitization before database storage
    - Section 6.4: Content length limits (5000 chars)
- [ ] **Admin Dashboard**: Basic CRUD interface for organizations
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 7.1: Admin-only routes with session verification
    - Section 7.2: Audit logging of all admin actions

#### **Basic Verification (Free APIs)**
- [ ] **Email Verification**: Required for all organizations
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 4.1: Token-based email verification (crypto.randomUUID)
    - Section 4.4: One-time use tokens stored in database
- [ ] **CAPTCHA**: hCaptcha (free tier: unlimited)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.6: Bot protection on registration forms
- [ ] **Manual Review**: Admin approval workflow for new projects
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 6.3: Human verification before publishing
    - Section 7.3: Admin notification system via email

#### **Legal Foundation (Free Templates)**
- [ ] **GDPR Compliance**: Basic consent flows, privacy policy
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 5.1: Explicit consent for data collection
    - Section 5.2: Right to erasure implementation
    - Section 5.3: Data minimization (only collect necessary fields)
    - Section 5.4: Cookie consent banner (no tracking cookies in MVP)
- [ ] **Terms of Service**: Platform rules and responsibilities
  - Use free legal templates from Termly.io or similar
- [ ] **Data Protection**: Secure data handling, EU hosting
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 2.4: All data stored in EU region (Vercel EU servers)
    - Section 8.1: HTTPS only (Vercel automatic SSL)
    - Section 8.2: Security headers (CSP, X-Frame-Options, etc.)

### **Phase 2: Enhanced MVP (2-3 weeks) - SIMPLE STATS & DASHBOARDS**
**Goal**: Add core business features with simple analytics (NOT full CSRD compliance)

**Cost Target**: 0 SEK/month (free tiers sufficient for 100-500 users)

**Philosophy**: Build simple, actionable stats that help organizations see engagement and companies track their samhällsnytta. Focus on volume of SME customers (99-299 SEK/month) rather than enterprise CSRD compliance.

#### **Company Features (Free Tier)**
- [ ] **Contact System**: "Contact Organization" with secure messaging
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 6.1: Input sanitization on all messages
    - Section 3.4: Rate limiting (3 messages/hour per user)
    - Section 7.4: Message content moderation via Perspective API
- [ ] **Simple Company Dashboard**: Track your hållbarhet activity
  - Projects viewed
  - Projects favorited
  - Contact messages sent
  - Föreningar connected with
  - Export: Simple CSV of activity
- [ ] **Search & Filter**: By category, location, budget, UN goals, dates
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.1: Parameterized queries to prevent SQL injection
    - Section 3.4: Rate limiting on search endpoint

#### **Organization Features (Free Tools)**
- [ ] **Simple Organization Dashboard**: See project engagement
  - Project views (last 30 days)
  - Company contact requests (count + details)
  - Project status tracking (Active/Completed)
  - Basic impact metrics (manual input):
    - Budget raised
    - People helped
    - Project duration (using start_date/end_date)
- [ ] **Project Submission Form**: Create and edit projects
  - Simple textarea editor (no rich text = no XSS risk)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.1: Text sanitization before database storage
    - Section 6.4: Content length limits (5000 chars)
- [ ] **Media Upload**: Images for project cards (Vercel Blob free tier: 500MB)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 6.5: File type validation (only images allowed)
    - Section 6.6: File size limits (max 5MB per image)
    - Section 6.7: Image scanning for inappropriate content
    - Section 8.4: Secure file URLs with expiry tokens

#### **Platform Features (Free Services)**
- [ ] **SEO Optimization**: Meta tags, structured data, sitemap
  - Use Next.js built-in metadata API (free)
- [ ] **Performance**: Image optimization, lazy loading, caching
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 8.6: CDN caching with security headers
    - Use Next.js Image component (automatic optimization)
- [ ] **Basic Analytics**: Track platform-wide engagement (Vercel Analytics free tier)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 5.5: Anonymous analytics only (no PII tracking)
    - Section 8.3: GDPR-compliant event tracking

### **Phase 3: Revenue MVP (3-4 weeks) - ESG-ALIGNED REPORTS (NOT CSRD)**
**Goal**: Add premium reporting features that justify subscription pricing

**Cost Target**: ~500 SEK/month (PDF generation service)

**Target Market**: Swedish SMEs (0-250 employees) who want simple ESG proof for stakeholders, NOT large companies needing full CSRD compliance reports.

#### **Pricing Tiers**
- [ ] **Free**: Basic project listing + simple dashboard
- [ ] **Basic (99 SEK/month)**: Enhanced dashboard + 5 PDF reports/month
- [ ] **Pro (299 SEK/month)**: Unlimited reports + SDG branding + timeline views
- [ ] **Premium (999 SEK/month)**: Custom branding + geographic impact maps + priority support

#### **Enhanced Reporting Features**
- [ ] **SDG Impact Alignment**: Leverage existing FN Mål data
  - Show which UN Sustainable Development Goals each company supports
  - Category breakdown (Miljö, Ungdom, Inkludering)
  - Timeline view using start_date/end_date fields
  - Geographic spread (stad field)
- [ ] **Simple PDF Export**: Professional reports (50-200 SEK each or included in subscription)
  - Company logo + branding
  - All projects supported with SDG logos
  - Total budget allocated
  - Geographic impact map
  - Suitable for website, LinkedIn, or stakeholder presentations
- [ ] **Export Options**: CSV, JSON for companies' own reporting needs

#### **Payment Integration**
- [ ] **Stripe Setup**: Secure subscription payment processing
- [ ] **Subscription Management**: Handle upgrades, downgrades, cancellations
- [ ] **Usage Tracking**: Monitor report generation limits per tier
- [ ] **Invoicing**: Automatic Swedish invoices (F-skatt support)

#### **Advanced Verification (Simple)**
- [ ] **Level 1**: Email Verified (automatic)
- [ ] **Level 2**: Organization Number Check via Bolagsverket API (free, automatic badge)
- [ ] **Level 3**: Manual review + Annual Report link (premium organizations only)
- [ ] **Trust Badges**: Display verification level on project cards

### **Phase 4: International Expansion (2-3 weeks)**
**Goal**: Add English language support for global market reach

#### **Multi-language Implementation**
- [ ] **i18n Framework**: Next-intl or similar internationalization setup
- [ ] **Language Toggle**: Swedish/English switcher in header
- [ ] **Content Translation**: All UI text, project data, and system messages
- [ ] **Localized URLs**: /sv/ and /en/ route structure
- [ ] **SEO Optimization**: Multi-language meta tags and sitemaps

#### **Content Management**
- [ ] **Dual Language Projects**: Support Swedish and English project descriptions
- [ ] **Translation Workflow**: CMS integration for content translation
- [ ] **Fallback System**: Default to Swedish if English translation missing
- [ ] **Language Preferences**: User preference persistence

#### **Global Considerations**
- [ ] **Currency Display**: Multi-currency support for international projects
- [ ] **Date/Number Formatting**: Locale-specific formatting
- [ ] **Legal Compliance**: GDPR compliance for international users
- [ ] **Performance**: Optimized loading for different regions

---

### **Phase 4+: CSRD-Lite (OPTIONAL - Only If Customers Request)**
**Goal**: Provide CSRD-compatible data export for companies that need it

**⚠️ IMPORTANT**: Only build this if you have paying customers explicitly asking for it. Do NOT build full CSRD compliance software.

**Cost Target**: ~2,000 SEK/month (CSRD taxonomy API, enhanced storage)

**Positioning**: "Evidence for Social Impact" NOT "Full CSRD Compliance Tool"

#### **CSRD-Ready Features (Enterprise Tier: 1,999 SEK/month)**
- [ ] **ESRS Data Point Mapping**: Structure data according to ESRS Social (S) standards only
  - Map project data to ESRS S1 (Own Workforce) - volunteering hours
  - Map project data to ESRS S2 (Workers in Value Chain)
  - Map project data to ESRS S3 (Affected Communities) - primary focus
  - Map project data to ESRS S4 (Consumers and End-users)
- [ ] **Audit Trail Enhancement**: Timestamped records of all project interactions
  - Who viewed which projects (anonymized)
  - Contact message history
  - Donation/sponsorship records (if payment feature added)
- [ ] **Data Export Package**: Structured data they can import into CSRD software
  - JSON format aligned with ESRS taxonomy
  - CSV with CSRD data point IDs
  - NOT a full report, just clean structured data
- [ ] **Documentation**: Clear explanation of what data can/cannot be used for CSRD
  - Disclaimer: "This is evidence of social impact activities, not a complete CSRD report"
  - Guidance: "Consult with your ESG advisor on how to incorporate this data"

#### **What We DON'T Build**
- ❌ **No full CSRD compliance software** (too complex, wrong market)
- ❌ **No audit-grade reports** (legal liability nightmare)
- ❌ **No double materiality assessment tools** (requires consulting expertise)
- ❌ **No Scope 1-3 emissions tracking** (different product entirely)
- ❌ **No financial systems integration** (enterprise complexity)
- ❌ **No XBRL tagging** (regulatory filing format, too specialized)

#### **Strategic Positioning**
- ✅ Position as **data provider** for Social (S) pillar of ESRS
- ✅ Partner with ESG consultants (they use our platform for client data)
- ✅ "CSRD-Ready" badge (your data can feed into their reports)
- ✅ Focus on evidence, not compliance (let their consultants do the hard work)

---

## Functional Requirements (Full Version)

### 🚀 Core Functions
- **Project Cards & Detail Views** – Visual cards with title, image, short description, and complete information (goals, budget, organization)
- **Verification** – Via open APIs (Corporate Registry/Bolagsverket, Sports Federations/RF, Municipalities)
- **AI Matching** – Companies receive proposals based on their defined ESG targets
- **Financial Transparency** – Non-profits must display their funding model and have the option to link to their Annual Report
- **Funding Status** – Clear specification of what funds are sought for and a live status against the budget
- **Favorites and Subscriptions** – Save projects and receive notifications for new matching projects
- **Transaction Management** – Grants, sponsorships, and donations are processed via the platform
- **Multi-language Support** – Swedish and English language options for global reach

### 💼 Corporate Features (Updated - Simple Approach)
- **Free Browsing** – View all projects without subscription (no artificial limits)
- **Simple Activity Dashboard** – Track viewed projects, contacts, föreningar connections
- **SDG Impact Reports** – Professional PDF reports showing samhällsnytta aligned with UN goals
- **ESG Evidence Export** – CSV/JSON export of activity for use in companies' own sustainability reports
- **NOT Full CSRD Compliance** – Platform provides evidence of social impact activities, not complete regulatory reports
- **Optional CSRD-Ready Data** – Enterprise tier only, structured data export for ESRS Social (S) pillar

### 🏢 Non-Profit Features
- **Free First Project** – Free to post the first project
- **Payment/Upgrade** – Payment for additional projects or "featured" status
- **Simple Editor** – For creating project cards
- **Admin Management** – Via unique, email-administered link (MVP) or logged-in dashboard (Full Version)
- **Financial Transparency** – Link to Annual Report and display funding model

### 🔐 Admin/Platform
- **Dashboard** – For revenue, project status, and users
- **Automated Verification** – Organization number (org.nr) and register verification
- **Analytics and Report Generation** – Platform-wide insights and custom reports

### 💰 Revenue Models (Updated - Simple Approach)

**Target Market**: Swedish SMEs (0-250 employees) who want simple ESG proof, NOT enterprise CSRD compliance.

#### **Company Subscriptions (Primary Revenue)**
- **Free**: Browse all projects, basic filtering
- **Basic (99 SEK/month)**: Enhanced dashboard + 5 PDF reports/month + contact organizations
- **Pro (299 SEK/month)**: Unlimited reports + SDG branding + timeline views + priority support
- **Premium (999 SEK/month)**: Custom branding + geographic impact maps + dedicated account manager
- **Enterprise (1,999 SEK/month)**: CSRD-ready data export + audit trails (OPTIONAL, only if requested)

#### **Organization Subscriptions (Secondary Revenue)**
- **Free**: 1 active project + basic dashboard
- **Basic (49 SEK/month)**: 3 active projects + analytics
- **Pro (149 SEK/month)**: Unlimited projects + featured placement + media uploads

#### **Future Revenue Streams (Phase 3+)**
- **Transaction Fees** – On payments via platform (grants, sponsorships, donations)
- **Premium Reports** – Sell aggregated impact data to municipalities and associations
- **Verification Services** – Charge for Level 3 manual verification (299 SEK/organization)

### 🛡️ Legal & Compliance (Updated)
- **GDPR Compliance**: Consent, right to erasure, minimization of collected data, encrypted communication, storage within the EU/EEA
- **AML/KYC**: Companies making payments must be verified (org. ID + payment method). Screening against sanction lists
- **Payment Security**: Use established PSP (Stripe, Swish). PCI-DSS compliance is mandatory
- **Legal Liability**: Platform is an intermediary, not responsible for project execution. Non-profits are responsible for accurate information, including their financial situation
- **ESG / CSRD Positioning**:
  - Platform provides **evidence of social impact activities**, NOT full CSRD compliance reports
  - Reports show alignment with UN SDGs and ESRS Social (S) data points
  - Clear disclaimers: "Consult with your ESG advisor for complete CSRD reporting"
  - No liability for companies' regulatory reporting obligations
  - Focus on data accuracy and verifiability, not regulatory interpretation

## Design & Interaction Guidelines

### Usability (UX)
- **Minimalism** – Clean, uncluttered interface
- **Accessibility** – WCAG 2.1 compliance
- **Responsiveness** – Mobile First design approach

### Psychological Triggers
- **Social Proof** – Badges: "VERIFIED," "FINANCIALLY VETTED"
- **Scarcity/FOMO** – "Views remaining" (implemented via LocalStorage/cookies as teaser)
- **Progression** – Clear project funding status and milestones

### Legal Design
- **Transparency** – Clear disclosure of what is verified
- **No Dark Patterns** – No hidden fees or misleading elements
- **Active Consent** – Opt-in for all data collection and marketing

## Verification & Revenue Model

### MVP Version
- **Email Confirmation** (free, mandatory)
- **Organization ID Check** (free, optional) – Badge: "Org. ID Valid"
- **Cost**: None for either party
- **"Views Remaining"** – Implemented only as a teaser via LocalStorage/cookies to encourage future signup

### Full Version (Future)

**Verification Levels**:
- **Level 1**: Email Verified
- **Level 2**: Org. ID verified against public registers (Bolagsverket)
- **Level 3 (Premium)**: Federation/Municipality-affiliated. Basic Financial Vetting (requires link to Annual Report)
- **Level 4 (Premium)**: AI Analysis & ESG Risk Report (Extra fee per report or via subscription)

**Revenue Model (Corporate Pays)**:
- Free (limited access)
- Basic Subscription (unlimited viewing)
- Premium Subscription (Level 3-4 access, CSRD/SDG reporting, payment management)

**Revenue Model (Non-Profits)**:
- Free for one project
- Future payment for extra projects or featured placement

## Technology & Structure

### Tech Stack
- **Frontend**: Next.js/React/Tailwind
- **Backend**: Node.js/Express/NestJS
- **Database**: PostgreSQL (EU/EEA hosted)
- **AI**: Matching (GPT/custom ML)

### Project Administration
- **MVP**: Via unique, secure admin link sent via email (no login required)
- **Full Version**: Dashboard with login, statistics, and roles (Admin, Project Owner)

---

## Commands Reference

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests (TDD)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### TypeScript
```bash
npx tsc --noEmit     # Type checking without build
```

### Troubleshooting
```bash
rm -rf .next         # Clear build cache
rm -rf node_modules  # Clear dependencies
npm install          # Reinstall dependencies
```

---

## Key Learnings

### ✅ What Works
- **Next.js 14.x**: Stable, reliable, fast builds
- **TailwindCSS 3.x**: Excellent developer experience
- **TypeScript**: Catches errors early, improves code quality
- **Component Architecture**: Modular, reusable components

### ❌ What to Avoid
- **Next.js 15.x**: Turbopack issues, PostCSS conflicts
- **TailwindCSS v4**: Compatibility problems
- **Missing TypeScript**: Runtime errors, harder debugging
- **Large Components**: Hard to maintain, test, debug

---

## Contact & Support

This project was built with **Claude Code**. For questions about:
- Architecture decisions → Check this file
- TypeScript issues → Check `src/types/index.ts`
- Styling problems → Check `src/app/globals.css`
- Data structure → Check `src/data/projects.ts`

---

## 📋 Recommended Next Steps

### **Immediate Actions (Demo MVP Complete)**
1. **Deploy to Vercel**: Make demo publicly accessible
2. **Investor Presentations**: Use current demo for fundraising
3. **User Feedback**: Gather input from potential pilot organizations
4. **Technical Documentation**: Complete API planning for Phase 1

### **Decision Points for Next Phase**
1. **Funding Status**: Secure resources for backend development
2. **Team Expansion**: Consider hiring backend developer
3. **Legal Consultation**: Engage GDPR/compliance lawyer
4. **Technology Choices**: Finalize database and hosting decisions

### **Success Metrics Tracking**
- **Demo Engagement**: Track modal opens, project views
- **Stakeholder Feedback**: Document feature requests and pain points
- **Technical Performance**: Monitor build times, test coverage
- **Business Validation**: Measure interest from companies and organizations

---

## 📊 Development Progress Tracker

### **COMPLETED ✅**
- [x] **2025-09-25**: Demo MVP (static frontend, 10 projects)
- [x] **2025-10-09**: Supabase integration (database, auth, storage)
- [x] **2025-10-10**: Phase 1 complete (registration API, email verification)
- [x] **2025-10-10**: Production deployment (Vercel + Supabase)
- [x] **2025-10-13**: Privacy policy page (GDPR compliant)
- [x] **2025-10-13**: Documentation cleanup

### **NEXT UP ⏳**
- [ ] **Phase 2**: Search and filtering
- [ ] **Phase 2**: Contact system
- [ ] **Phase 2**: Analytics dashboard
- [ ] **Phase 2**: Project submission form

### **FUTURE PHASES 🔮**
- [ ] **Phase 3**: Payment processing (Stripe)
- [ ] **Phase 3**: Advanced verification (API integrations)
- [ ] **Phase 4**: Multi-language (Swedish/English)

**Goal**: Keep development simple, smooth, and streamlined while building a meaningful platform for Swedish CSR initiatives that scales from demo to profitable business.

---

---

## 🔄 Simple Development Workflow

### **Current Approach: Option 1 (Ultra Simple)**
**Philosophy**: Keep it simple, add complexity only when needed

### **Daily Development Workflow**
```bash
1. npm run dev              # Work locally at localhost:3000
2. npm test                 # Ensure tests pass
3. git add . && git commit -m "description of what you changed"
4. git push origin main     # Goes live automatically via Vercel
5. Check live demo, share URL with stakeholders
```

### **Before Each Development Session**
```bash
git pull origin main        # Get any updates
npm run dev                 # Start local development
```

### **When to Add Complexity**
- ❌ **Not now**: Learning phase, single developer
- ✅ **Later**: When you have team members joining
- ✅ **Later**: When simple workflow causes real problems
- ✅ **Later**: When you have users reporting bugs from broken deployments

### **Future Workflow Evolution Plan**
1. **Phase 0 (Now)**: Direct to main branch, auto-deploy
2. **Phase 1**: Add `develop` branch when backend development starts
3. **Phase 2**: Add feature branches when team grows
4. **Phase 3**: Add code review when complexity increases

---

## 🔄 Development Status Reference

**Current Phase**: Phase 1 Complete ✅
**Production**: https://kollektivly-csr.vercel.app/
**Stack**: Next.js 14 + Supabase + Vercel
**Cost**: 0 SEK/month (free tier)
**Security**: GDPR compliant, RLS enabled (see docs/SECURITY_ANALYSIS.md)
**Last Updated**: 2025-10-13

## 🆓 Free Hosting Architecture (Phases 1-2)

### **Service Stack (100% Free)**
| Service | Free Tier | Usage Estimate | Cost |
|---------|-----------|----------------|------|
| **Vercel Hosting** | Unlimited bandwidth | Static + SSR pages | 0 SEK |
| **Vercel Postgres** | 256MB, 60h compute/mo | ~50 orgs, 200 projects | 0 SEK |
| **Vercel KV** | 256MB, 30k commands/mo | Sessions + favorites | 0 SEK |
| **Vercel Blob** | 500MB storage | Project images | 0 SEK |
| **Resend Email** | 3,000 emails/month | Verification + notifications | 0 SEK |
| **Perspective API** | 1M requests/day | Content moderation | 0 SEK |
| **hCaptcha** | Unlimited | Bot protection | 0 SEK |
| **Vercel Analytics** | 2,500 events/month | Basic tracking | 0 SEK |
| **Sentry** | 5,000 events/month | Error monitoring | 0 SEK |
| **Total Monthly Cost** | - | - | **0 SEK** |

### **Scaling Limits (When to Upgrade)**
- **Users**: Free tiers support 100-500 concurrent users
- **Projects**: Up to 200 projects comfortably
- **Emails**: 3,000/month = ~100 emails/day (sufficient for MVP)
- **Database**: 256MB = ~5,000 projects with images stored externally
- **Trigger Point**: When you hit 500+ users or 100+ emails/day

### **Cost Projection (Future Phases)**
- **Phase 2 (Dashboards & Stats)**: 0 SEK/month (database queries only)
- **Phase 3 (PDF Reports)**: ~500 SEK/month (PDF generation service like Pdfmonkey.io)
- **Phase 3 (Payment Processing)**: +0 SEK (Stripe fees ~3% per transaction only)
- **Phase 4 (Scaling)**: +300-500 SEK/month when exceeding free tiers (200-500 users)
- **Phase 4+ (CSRD-Lite)**: +2,000 SEK/month (ONLY if customers explicitly request it)
- **First Paying Customer Should Cover**: 99-299 SEK/month (much more achievable for SMEs)

---

## 💰 Business Model & Revenue Projections

### **Strategic Decision: Simple Stats vs CSRD Compliance**

**Decision Made**: Focus on **Simple Stats & SDG-Aligned Reports** for Swedish SMEs, NOT full CSRD compliance software.

**Why This Approach**:
- ✅ **Target market reality**: 95% of Swedish SMEs (0-250 employees) are NOT required to do CSRD reporting until 2026-2027, if at all
- ✅ **Lower complexity**: Simple aggregation & PDF generation vs complex regulatory software
- ✅ **Faster time-to-market**: 2-3 weeks vs 6-12 months development
- ✅ **Lower cost**: 50,000 SEK development vs 1,000,000+ SEK
- ✅ **Volume business model**: 1,000s of customers at 99-299 SEK/month vs 10s of enterprises at 50,000+ SEK/year
- ✅ **Lower support burden**: FAQ & email support vs consulting services
- ✅ **Competitive advantage**: Affordable pricing, Swedish-focused, action-based (not just paperwork)

### **Revenue Projection (Simple Stats Approach)**
```
Target Market: 5,000-10,000 Swedish SMEs (0-250 employees)
Marketing: Content marketing, LinkedIn, word-of-mouth
Conversion Rate: 2% paid conversion (realistic for B2B SaaS)
Expected Paid Customers (Year 1): 100-200 subscribers

Revenue Mix:
├── Basic (99 SEK/month): 60% = 60-120 customers = 5,940-11,880 SEK/month
├── Pro (299 SEK/month): 30% = 30-60 customers = 8,970-17,940 SEK/month
└── Premium (999 SEK/month): 10% = 10-20 customers = 9,990-19,980 SEK/month

Monthly Revenue (Year 1): 24,900-49,800 SEK/month
Annual Revenue (Year 1): 298,800-597,600 SEK/year
Total Development Cost: ~50,000 SEK (Phase 2-3)
Monthly Operating Cost: ~1,000 SEK (hosting, services)
Break-even: 3-6 months from launching Phase 3
```

**Path to Profitability**: Clear and achievable ✅

### **Comparison: Why NOT Full CSRD Compliance**

**IF we built Full CSRD Software** (NOT recommended):
```
Target Market: 500-1,000 Swedish large companies (250+ employees)
Marketing: Enterprise sales, consultants, trade shows
Conversion Rate: 1% (enterprise sales cycles are long & expensive)
Expected Customers (Year 1): 5-10 enterprise customers

Revenue:
└── Enterprise (50,000-200,000 SEK/year) = 5-10 customers = 250,000-2,000,000 SEK/year

Development Cost: 1,000,000-2,000,000 SEK (12+ months, specialized developers)
Monthly Operating Cost: ~10,000 SEK (regulatory APIs, compliance consultants, insurance)
Sales Cost: 50,000-100,000 SEK per customer (6-12 month sales cycles)
Break-even: 18-36 months (IF you survive)
Competition: SAP, Workiva, Bloomberg ESG (billion-dollar products)
```

**Path to Profitability**: Risky and capital-intensive ⚠️

### **Business Model Advantages (Simple Stats)**
- ✅ **Volume-based**: Target 1,000s of SMEs, not 10s of enterprises
- ✅ **Affordable pricing**: 99-999 SEK vs 50,000+ SEK enterprise tools
- ✅ **Self-service**: No enterprise sales team needed
- ✅ **Scalable**: Same product for all customers, minimal customization
- ✅ **Simple support**: FAQ and email, not consulting services
- ✅ **Quick value**: Companies see immediate value (engagement tracking, simple reports)
- ✅ **Emotional appeal**: Support real föreningar, not just regulatory checkbox
- ✅ **Positioning**: "ESG evidence" not "compliance software" (lower liability)