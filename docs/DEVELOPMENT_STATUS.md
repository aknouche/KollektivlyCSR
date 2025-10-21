# Kollektivly - Development Status Report
**Last Updated**: 2025-01-21

## 📊 Executive Summary

**Current Phase**: Phase 3 (Payment & Escrow) - In Progress
**Overall Completion**: ~75% of core platform functionality
**Production URL**: https://kollektivly-csr.vercel.app/
**Cost**: 0 SEK/month (free tier)

---

## ✅ Phase 1: Foundation (COMPLETE)

### Authentication & Registration
- ✅ Organization registration with Supabase Auth
- ✅ Email verification workflow
- ✅ Magic link authentication
- ✅ Organization approval workflow (PENDING → VERIFIED → APPROVED)
- ✅ Row-Level Security (RLS) policies

### Core Pages
- ✅ Homepage with hero section
- ✅ About page (Om oss)
- ✅ Contact page (Kontakt)
- ✅ Privacy policy (Integritetspolicy)
- ✅ FAQ page
- ✅ Navigation component with auth states

### Database Schema
**Tables created**:
- `organizations` - Föreningar with auth integration
- `projects` - Samhällsprojekt with moderation
- `verification_tokens` - Email verification
- `contact_messages` - Company → Organization communication
- `audit_logs` - Admin action tracking

**Files**:
- `supabase/migrations/20250101000000_initial_schema.sql`
- `supabase/migrations/20250102000000_add_english_project_columns.sql`
- `supabase/migrations/add_project_dates.sql`
- `supabase/migrations/20250117000000_add_contact_count_function.sql`

---

## ✅ Phase 2: Core Features (COMPLETE)

### Search & Discovery
- ✅ Full-text search across projects
- ✅ Filter by category (Miljö, Ungdom, Inkludering)
- ✅ Filter by city/location
- ✅ Filter by UN Sustainable Development Goals
- ✅ Project cards with badges (NY, POPULÄR, VERIFIERAD)
- ✅ Project modal with full details
- ✅ View counter tracking

**Key Files**:
- `src/app/alla-projekt/page.tsx` - Browse all projects
- `src/components/AllaProjectPage.tsx` - Search/filter UI
- `src/components/ProjectCard.tsx` - Project cards
- `src/components/ProjectModal.tsx` - Project details modal

### AI-Powered Matching
- ✅ Matching form (MatchingForm.tsx)
- ✅ Company goals capture
- ⏳ Backend AI matching (planned)

### Contact System
- ✅ Contact form component
- ✅ API endpoint for sending messages
- ✅ Store messages in database with moderation
- ✅ Link to both project and organization
- ✅ Contact counter on projects
- ⏳ Email notifications (planned)

**Key Files**:
- `src/components/ContactForm.tsx`
- `src/app/api/contact/route.ts`

### Organization Dashboard
✅ **Full dashboard with analytics**:
- Project overview (total, published, drafts)
- Contact management (view recent, unread count)
- View counter per project
- Organization info display
- Quick link to create new project

**File**: `src/app/dashboard/page.tsx`

### Project Submission
- ✅ Multi-step project creation form
- ✅ Image upload to Supabase Storage
- ✅ Draft/Publish workflow
- ✅ Category selection
- ✅ UN SDG goals selection
- ✅ Budget tracking

**File**: `src/app/lagg-till-projekt/page.tsx`

### Company Authentication (NEW!)
✅ **Proper authentication system**:
- Company registration with Supabase Auth
- Login/Register combined page
- Password-based authentication
- Email verification
- Session management
- No more localStorage hacks!

**New Database Table**:
- `companies` - Full company profiles with auth

**Key Files**:
- `supabase/migrations/20250120000000_add_companies_table.sql`
- `src/app/api/companies/register/route.ts`
- `src/app/foretag-logga-in/page.tsx`
- `src/app/foretag-dashboard/page.tsx` (updated)

### Company Goals Assessment (NEW!)
✅ **5-step questionnaire system**:

**Step 1**: Sponsorship Goals
- CSRD compliance
- ESG reporting
- Brand awareness
- Employee engagement
- Social media content
- Local community impact
- UN SDG goals
- Other

**Step 2**: CSR Maturity Level
- Beginner (just starting)
- Intermediate (some initiatives)
- Advanced (established program)

**Step 3**: Company Profile
- Number of employees (1-10, 11-50, 51-200, 201-500, 500+)
- Annual CSR budget (0-50K, 50K-200K, 200K-500K, 500K-1M, 1M+)

**Step 4**: Primary Challenges
- Finding right projects
- Measuring/reporting impact
- CSRD compliance
- External communication
- Employee engagement
- Limited budget
- Limited time/resources

**Step 5**: Consultation Interests
- CSRD compliance advisory
- Marketing/branding strategy
- Both

✅ **Smart Recommendations**:
- AI logic determines which expert consultation to recommend
- CSRD Consultation - For companies interested in compliance/ESG
- Marketing Strategy - For companies focused on visibility/branding
- Both - Combined approach (recommended when relevant to both)

✅ **Results Page**:
- Personalized recommendations based on answers
- Free 30-minute consultation booking (Calendly integration)
- Next steps guidance
- CTA to explore projects or return to dashboard

**Key Files**:
- `src/app/foretag-matningsfragor/page.tsx` - Assessment form
- `src/app/foretag-matningsfragor/resultat/page.tsx` - Results & booking

---

## 🔄 Phase 3: Payment & Escrow (IN PROGRESS)

### Database Schema ✅
**Completed**: 2025-01-21

**New Tables**:

1. **`payment_cases`** - Payment container
   - Grant amount (förening receives)
   - Service fee (Kollektivly keeps)
   - Total charged (grant + fee)
   - Service tier (basic 4%, standard 7%, enhanced 10%)
   - Stripe payment intent ID
   - Status tracking (AWAITING_PAYMENT → PAID → MILESTONE_1_PENDING → etc.)
   - Company & organization links

2. **`milestones`** - Payment stages (2 per case)
   - Milestone 1: Legitimacy Check (50%)
     - Stadgar (bylaws) PDF upload
     - Ekonomisk redovisning (financial statement) PDF upload
   - Milestone 2: Impact Report (50%)
     - Social media link (showing project/event)
     - Uploaded photos
     - Impact description text
   - AI verification status
   - Admin override capability
   - Stripe transfer ID (when paid)

3. **`ai_verifications`** - Audit trail
   - Verification type (LEGITIMACY_CHECK or IMPACT_REPORT)
   - AI model used (gpt-4o, etc.)
   - Full AI prompt & response
   - Pass/fail result
   - Confidence score (0-1)
   - Flags/warnings
   - Structured checks performed
   - Processing time & token usage

4. **`esg_reports`** - Auto-generated reports
   - Report type (MILESTONE, FINAL, ANNUAL)
   - Reporting period
   - Generated PDF URL
   - Structured ESG data (JSONB)
   - Projects included
   - Total impact value
   - SDG goals supported

**Key File**: `supabase/migrations/20250121000000_add_payment_escrow_schema.sql`

### Payment Flow Design

**2-Milestone System** (50/50 split):

**Company Pays** (Example: 50,000 SEK grant):
```
Grant amount:    50,000 SEK (to förening, held in escrow)
Service fee:      3,500 SEK (7% - Kollektivly keeps immediately)
Total charged:   53,500 SEK
```

**Milestone 1 - Legitimacy Check** (25,000 SEK):
1. Förening uploads:
   - Stadgar (bylaws) PDF
   - Årsredovisning (financial statement) PDF
2. AI verifies:
   - Documents are legitimate
   - Organization number matches
   - Financial health is acceptable
   - Documents are recent (within 2 years)
3. Payment released: 25,000 SEK → Förening's Stripe account

**Milestone 2 - Impact Report** (25,000 SEK):
1. Förening submits:
   - Link to social media/web post (with photos of project)
   - At least 1 additional photo uploaded
   - Text description (200-500 words) of where money was spent
2. AI verifies:
   - Link is valid and accessible
   - Photos show authentic activity
   - Description is complete and coherent
   - Spending matches project category
3. Payment released: 25,000 SEK → Förening's Stripe account

**AI Confidence Thresholds**:
- `> 0.85` - Auto-approve
- `0.50 - 0.85` - Flag for manual review
- `< 0.50` - Auto-reject (or require resubmission)

### Remaining Phase 3 Tasks

⏳ **Stripe Connect Integration**:
- [ ] Stripe Connect onboarding for föreningar
- [ ] Payment intent creation API
- [ ] Stripe webhooks handler
- [ ] Transfer money to förenings API
- [ ] Refund handling

⏳ **Milestone Submission UI**:
- [ ] `/stod-projekt/[id]` - Company commitment page (update from mock)
- [ ] `/organisation/milestones/[id]/upload` - Förening document upload
- [ ] `/organisation/milestones/[id]/impact-report` - Impact report form
- [ ] File upload to Supabase Storage
- [ ] Progress tracking UI

⏳ **AI Verification System**:
- [ ] OpenAI API integration (GPT-4o)
- [ ] Legitimacy check prompt engineering
- [ ] Impact report verification prompts
- [ ] PDF reading & analysis
- [ ] Image analysis (authenticity check)
- [ ] Structured response parsing
- [ ] Confidence scoring logic

⏳ **ESG Report Generation**:
- [ ] Report data compilation
- [ ] PDF template design
- [ ] Pdfmonkey.io integration (or alternative)
- [ ] Auto-generation on milestone completion
- [ ] Download/email functionality

---

## 📁 Project Structure

```
kollektivly/
├── src/
│   ├── app/
│   │   ├── alla-projekt/          # Browse projects
│   │   ├── api/
│   │   │   ├── companies/
│   │   │   │   └── register/      # Company registration
│   │   │   ├── contact/           # Contact form API
│   │   │   ├── organizations/     # Organization APIs
│   │   │   └── projects/          # Project APIs
│   │   ├── auth/
│   │   │   └── confirm/           # Email verification
│   │   ├── dashboard/             # Organization dashboard
│   │   ├── foretag-dashboard/     # Company dashboard
│   │   ├── foretag-logga-in/      # Company login/register
│   │   ├── foretag-matningsfragor/ # Goals assessment
│   │   │   └── resultat/          # Assessment results
│   │   ├── hitta-projekt/         # AI matching
│   │   ├── lagg-till-projekt/     # Create project
│   │   ├── logga-in/              # Organization login
│   │   ├── registrera-forening/   # Organization register
│   │   └── ...
│   ├── components/
│   │   ├── AllaProjectPage.tsx    # Search/filter UI
│   │   ├── ContactForm.tsx        # Contact form
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── MatchingForm.tsx       # AI matching form
│   │   ├── Navigation.tsx         # Nav bar
│   │   ├── ProjectCard.tsx        # Project cards
│   │   └── ProjectModal.tsx       # Project details
│   └── lib/
│       └── supabase/              # Supabase client utils
├── supabase/
│   └── migrations/
│       ├── 20250101000000_initial_schema.sql
│       ├── 20250120000000_add_companies_table.sql
│       └── 20250121000000_add_payment_escrow_schema.sql
└── docs/
    ├── CLAUDE.md                  # Project guide
    ├── DEVELOPMENT_STATUS.md      # This file
    └── ...
```

---

## 🎯 Next Steps (Immediate Priorities)

### 1. Stripe Connect Setup (Next 1-2 days)
- [ ] Create Stripe Connect Express accounts for föreningar
- [ ] Implement payment flow in `/stod-projekt/[id]`
- [ ] Set up webhook endpoint for payment confirmations
- [ ] Test payment → escrow → transfer flow

### 2. Milestone Submission UI (Next 2-3 days)
- [ ] Build document upload UI for Milestone 1
- [ ] Build impact report form for Milestone 2
- [ ] Integrate Supabase Storage
- [ ] Add progress indicators

### 3. AI Verification (Next 3-4 days)
- [ ] Integrate OpenAI API (GPT-4o)
- [ ] Build legitimacy check function
- [ ] Build impact verification function
- [ ] Test with sample documents
- [ ] Fine-tune confidence thresholds

### 4. ESG Reports (Next 2-3 days)
- [ ] Design PDF template
- [ ] Implement auto-generation logic
- [ ] Set up PDF generation service
- [ ] Add download functionality

**Estimated Timeline**: Phase 3 completion in ~10-12 days

---

## 💼 Business Metrics Tracking

### Currently Trackable:
- ✅ Projects published
- ✅ Project views
- ✅ Contacts sent
- ✅ Organizations registered
- ✅ Companies registered (new!)
- ✅ Assessment forms completed (new!)

### Coming Soon (Phase 3):
- Payments processed
- Revenue generated (service fees)
- Milestones completed
- AI verifications performed
- ESG reports generated
- Average payment case duration

---

## 🔒 Security & Compliance

### Implemented:
- ✅ Row-Level Security (RLS) on all tables
- ✅ Email verification required
- ✅ GDPR consent tracking
- ✅ Audit logging for admin actions
- ✅ Input sanitization
- ✅ Authentication via Supabase Auth
- ✅ Password requirements (8+ characters)

### Coming in Phase 3:
- Stripe PCI compliance (handled by Stripe)
- Payment dispute handling
- Refund policies
- Data retention policies for financial records

---

## 📊 Cost Breakdown (Current: 0 SEK/month)

### Free Tiers:
- **Vercel**: Hosting (100 GB bandwidth/month free)
- **Supabase**: Database + Auth + Storage (500 MB database, 1 GB storage free)
- **Next.js**: Framework (open source)

### Paid Services (Phase 3):
- **Stripe**: 1.4% + 1.80 SEK per transaction (Sweden)
- **OpenAI API**: ~0.01-0.03 SEK per verification (GPT-4o)
- **Pdfmonkey.io** (or alternative): ~5-10 SEK/month for 100 PDFs

**Projected costs at 100 transactions/month**:
- Stripe fees: ~3,000 SEK
- OpenAI: ~2,000 SEK
- PDF: ~10 SEK
- **Total**: ~5,000 SEK/month
- **Revenue** (70% at 7% fee): 245,000 SEK/month
- **Net margin**: ~240,000 SEK/month (98%)

---

## 🎉 Summary

**We've built**:
- ✅ Full authentication for both föreningar and companies
- ✅ Complete project browsing/search/filter system
- ✅ Contact system connecting companies with föreningar
- ✅ Dashboards for both user types
- ✅ Company goals assessment with expert recommendations
- ✅ Database schema for payment escrow system
- ✅ 2-milestone payment framework (designed)

**We're ready to build**:
- Payment processing with Stripe
- AI verification of documents and reports
- Automated ESG reporting
- **Revenue generation starts here!**

**Current state**: Production-ready platform for browsing/contacting. Payment system fully designed and ready to implement.

---

**Questions or need clarification?** Check `CLAUDE.md` for development guide or reach out to the team.
