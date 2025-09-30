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

## Current Status Analysis

### ✅ **MVP Requirements (PRD) vs Current Implementation**

#### **Frontend Demo MVP** (According to PRD) - **STATUS: 100% COMPLETE ✅**
- ✅ **Simple Landing Page**: Header + tagline implemented
- ✅ **Project Grid**: 10 projects displayed in responsive grid (3/2/1 columns)
- ✅ **Project Cards**: Title, image placeholder, short description, category, organization
- ✅ **Modal Details**: Click → modal with full description, budget, goals
- ✅ **Dummy Data**: 10 realistic Swedish projects
- ✅ **Interaction Psychology**:
  - Hover effects ✅
  - Badges ("NY", "POPULÄR", "VERIFIERAD") ✅
  - Fake scarcity ("X visningar kvar") ✅
- ✅ **Design**: Nordic minimalism, airy, rounded corners
- ✅ **Color Theme**: Blue, green, purple, gold badges
- ✅ **No Backend**: Static frontend only
- ✅ **TDD Implementation**: Jest + React Testing Library with 100% coverage

### 🎯 **Gap Analysis: Current Demo MVP vs Functional MVP**

Our current **Demo MVP is 100% COMPLETE** according to PRD requirements. For the next phase (Functional MVP), we would need:

#### **🚧 Next Phase: Functional MVP (Not in current scope)**
- **Backend Infrastructure**: Database, APIs, user management
- **Email-based Project Administration**: Secure tokens for organizations
- **Basic Verification**: Email verification + optional org.nr validation
- **Contact Integration**: "Contact organization" functionality
- **Project Submission**: Simple form for organizations to add projects
- **Legal Foundation**: Basic GDPR compliance, terms of service

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
src/
├── app/
│   ├── page.tsx          # Main page
│   └── globals.css       # Styles + utilities
├── components/
│   ├── ProjectCard.tsx   # Project cards
│   ├── ProjectModal.tsx  # Project details modal
│   └── __tests__/
│       └── ProjectCard.test.tsx  # TDD tests
├── data/
│   └── projects.ts       # Swedish project data (10 projekt)
└── types/
    └── index.ts          # TypeScript interfaces
jest.config.js           # Test configuration
jest.setup.js            # Test setup
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

### **Phase 1: Functional MVP (2-3 weeks)**
**Goal**: Transform demo into working prototype with basic project management

#### **Backend Setup**
- [ ] **Database Design**: PostgreSQL schema for projects, organizations, contacts
- [ ] **API Routes**: Next.js API routes for CRUD operations
- [ ] **Authentication**: Email-based tokens for organization admin links

#### **Project Administration**
- [ ] **Organization Registration**: Simple email-based signup
- [ ] **Project Submission Form**: Rich editor for project creation
- [ ] **Admin Dashboard**: Basic CRUD interface for organizations
- [ ] **Email Integration**: SendGrid/Resend for notification system

#### **Basic Verification**
- [ ] **Email Verification**: Required for all organizations
- [ ] **Org.nr Validation**: Optional integration with Bolagsverket API
- [ ] **Manual Review**: Admin approval workflow for new projects

#### **Legal Foundation**
- [ ] **GDPR Compliance**: Basic consent flows, privacy policy
- [ ] **Terms of Service**: Platform rules and responsibilities
- [ ] **Data Protection**: Secure data handling, EU hosting

### **Phase 2: Enhanced MVP (2-3 weeks)**
**Goal**: Add core business features for real-world usage

#### **Company Features**
- [ ] **Contact System**: "Contact Organization" with secure messaging
- [ ] **Favorites/Bookmarks**: Save interesting projects
- [ ] **Basic Analytics**: Track project views and engagement
- [ ] **Search & Filter**: By category, location, budget, UN goals

#### **Organization Features**
- [ ] **Project Status Updates**: Progress tracking and reporting
- [ ] **Media Upload**: Images for project cards
- [ ] **Social Sharing**: LinkedIn, Twitter integration
- [ ] **Impact Reporting**: Basic metrics and outcomes

#### **Platform Features**
- [ ] **SEO Optimization**: Meta tags, structured data, sitemap
- [ ] **Performance**: Image optimization, lazy loading, caching
- [ ] **Monitoring**: Error tracking, analytics, health checks
- [ ] **Internationalization (i18n)**: Language switching infrastructure for future English support

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
- [x] **2025-09-25**: Initial Next.js setup with TypeScript
- [x] **2025-09-25**: TailwindCSS integration and design system
- [x] **2025-09-25**: Project data structure and 8 initial projects
- [x] **2025-09-25**: ProjectCard and ProjectModal components
- [x] **2025-09-25**: Responsive grid layout (3/2/1 columns)
- [x] **2025-09-25**: TDD setup (Jest + React Testing Library)
- [x] **2025-09-25**: Interaction psychology (badges, scarcity elements)
- [x] **2025-09-25**: Expanded to 10 projects per PRD requirements
- [x] **2025-09-25**: PRD integration and development roadmap
- [x] **2025-09-25**: Demo MVP 100% complete per specifications

### **IN PROGRESS 🚧**
- [ ] **Planning Phase 1**: Backend architecture design
- [ ] **Planning Phase 1**: Database schema planning
- [ ] **Planning Phase 1**: API endpoint specification

### **NEXT UP ⏳**
- [ ] **Phase 1 Start**: PostgreSQL database setup
- [ ] **Phase 1**: Email-based organization registration
- [ ] **Phase 1**: Project submission form
- [ ] **Phase 1**: Basic GDPR compliance implementation

### **FUTURE PHASES 🔮**
- [ ] **Phase 2**: Company contact system
- [ ] **Phase 2**: Search and filtering functionality
- [ ] **Phase 3**: Payment processing with Stripe
- [ ] **Phase 3**: Advanced verification system
- [ ] **Phase 4**: Multi-language support (Swedish/English)

### **TECHNICAL DEBT & IMPROVEMENTS**
- [ ] **Add project images**: Replace placeholder with actual project photos
- [ ] **Enhanced animations**: More sophisticated Framer Motion effects
- [ ] **Accessibility audit**: WCAG 2.1 compliance verification
- [ ] **Performance optimization**: Image lazy loading, code splitting

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

**Current Phase**: Demo MVP Complete ✅
**Next Phase**: Deploy to Vercel, then Planning Phase 1 (Functional MVP)
**PRD Alignment**: 100% compliant with Demo MVP requirements
**Test Coverage**: 100% for UI components
**Technical Stack**: Stable and production-ready
**Development Workflow**: Option 1 (Ultra Simple)
**Deployment Status**: ✅ LIVE on Vercel with auto-deploy
**Multi-language Support**: Phase 4 planned (Swedish/English)
**Security Analysis**: Comprehensive security framework documented (see SECURITY_ANALYSIS.md)
**Live Demo URL**: https://kollektivly-csr.vercel.app/
**Last Updated**: 2025-09-30