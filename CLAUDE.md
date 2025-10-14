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
cd KollektivlyCSR
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
KollektivlyCSR/
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

### **Phase 2: Enhanced MVP (2-3 weeks) - STILL FREE**
**Goal**: Add core business features for real-world usage while maintaining 0 SEK/month cost

**Cost Target**: 0 SEK/month (free tiers sufficient for 100-500 users)

#### **Company Features (Free Tier)**
- [ ] **Contact System**: "Contact Organization" with secure messaging
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 6.1: Input sanitization on all messages
    - Section 3.4: Rate limiting (3 messages/hour per user)
    - Section 7.4: Message content moderation via Perspective API
- [ ] **Favorites/Bookmarks**: Save interesting projects (stored in Vercel KV)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.2: User session validation required
    - Section 2.3: User data isolation (can only access own favorites)
- [ ] **Basic Analytics**: Track project views and engagement (Vercel Analytics free tier)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 5.5: Anonymous analytics only (no PII tracking)
    - Section 8.3: GDPR-compliant event tracking
- [ ] **Search & Filter**: By category, location, budget, UN goals
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 3.1: Parameterized queries to prevent SQL injection
    - Section 3.4: Rate limiting on search endpoint

#### **Organization Features (Free Tools)**
- [ ] **Project Status Updates**: Progress tracking and reporting
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 7.1: Organization-only access to own projects
    - Section 7.2: Audit log of all status changes
- [ ] **Media Upload**: Images for project cards (Vercel Blob free tier: 500MB)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 6.5: File type validation (only images allowed)
    - Section 6.6: File size limits (max 5MB per image)
    - Section 6.7: Image scanning for inappropriate content
    - Section 8.4: Secure file URLs with expiry tokens
- [ ] **Social Sharing**: LinkedIn, Twitter integration (free APIs)
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 8.5: No social media tokens stored on server
- [ ] **Impact Reporting**: Basic metrics and outcomes
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 7.5: Data validation to prevent false reporting

#### **Platform Features (Free Services)**
- [ ] **SEO Optimization**: Meta tags, structured data, sitemap
  - Use Next.js built-in metadata API (free)
- [ ] **Performance**: Image optimization, lazy loading, caching
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 8.6: CDN caching with security headers
    - Use Next.js Image component (automatic optimization)
- [ ] **Monitoring**: Error tracking, analytics, health checks
  - Vercel Analytics (free tier: 2,500 events/month)
  - Sentry free tier (5k events/month) for error tracking
  - **Security** (SECURITY_ANALYSIS.md):
    - Section 9.1: Error sanitization (no sensitive data in logs)
    - Section 9.2: Security event monitoring
- [ ] **Internationalization (i18n)**: Language switching infrastructure for future English support
  - Use next-intl (free, open-source)

### **Phase 3: Revenue MVP (3-4 weeks)**
**Goal**: Implement subscription model and payment processing

#### **Payment Integration**
- [ ] **Stripe Setup**: Secure payment processing
- [ ] **Subscription Management**: Free/Premium tiers
- [ ] **Featured Projects**: Premium placement for organizations
- [ ] **Transaction Fees**: Revenue from donations/sponsorships

#### **Advanced Verification**
- [ ] **Multi-level System**: Levels 1-4 as per PRD
- [ ] **API Integrations**: RF (Riksförbund), municipality databases
- [ ] **Automated Checks**: Background verification processes
- [ ] **Trust Badges**: Enhanced credibility indicators

#### **Compliance & Reporting**
- [ ] **ESG Reporting**: Basic sustainability metrics
- [ ] **Data Export**: PDF/Excel reports for companies
- [ ] **AML/KYC**: Basic compliance for payment processing
- [ ] **CSRD Alignment**: EU sustainability reporting standards

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

### 💼 Corporate Features
- **Limited Free Access** – View limited number of projects without subscription
- **Premium Accounts** – Unlimited access, advanced reports, and API integration
- **ESG Compliance Reporting** – Linked to sustainability goals and regulatory requirements (CSRD)
- **Level 3-4 Verification Requests** – Request enhanced due diligence for non-profits

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

### 💰 Revenue Models
- **Corporate Subscriptions** – Free (limited access), Basic Subscription (unlimited viewing), Premium Subscription (Level 3-4 access, CSRD/SDG reporting, payment management)
- **Transaction Fees** – On payments via platform (grants, sponsorships, donations)
- **Non-Profit Fees** – Future payment for extra projects or featured placement
- **Premium Reports** – To municipalities and associations

### 🛡️ Legal & Compliance
- **GDPR Compliance**: Consent, right to erasure, minimization of collected data, encrypted communication, storage within the EU/EEA
- **AML/KYC**: Companies making payments must be verified (org. ID + payment method). Screening against sanction lists
- **Payment Security**: Use established PSP (Stripe, Swish). PCI-DSS compliance is mandatory
- **Legal Liability**: Platform is an intermediary, not responsible for project execution. Non-profits are responsible for accurate information, including their financial situation
- **Reporting / ESG / CSRD**: Platform reports must support the EU's CSRD. Projects must be linked to the UN Sustainable Development Goals (SDGs)

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
- **Phase 3 (Payment Processing)**: +0 SEK (Stripe fees only on transactions)
- **Phase 4 (Scaling)**: +300-500 SEK/month when exceeding free tiers
- **First Paying Customer Should Cover**: 500 SEK/month minimum subscription