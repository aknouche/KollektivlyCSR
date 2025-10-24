# Kollektivly - Quick Start Guide

## 👋 New Developer? Start Here

**5 minutes to understand the platform:**

1. **What is Kollektivly?** → Read [README.md](README.md) (2 min)
2. **Business model & context** → Read [CLAUDE.md](CLAUDE.md) (3 min)

**30 minutes to get running locally:**

3. **Database setup** → Follow [docs/setup/DATABASE_SETUP.md](docs/setup/DATABASE_SETUP.md) (20 min)
4. **Environment variables** → Copy [.env.example](.env.example) to `.env.local` (5 min)
5. **Start dev server** → Run `npm install && npm run dev` (5 min)

---

## 🔍 Need Specific Help?

### Setup & Configuration
- **Database setup & errors?** → [docs/setup/DATABASE_SETUP.md](docs/setup/DATABASE_SETUP.md)
- **Disable email verification?** → [docs/deployment/DISABLE_EMAIL_VERIFICATION.md](docs/deployment/DISABLE_EMAIL_VERIFICATION.md)
- **Deploy to production?** → [docs/deployment/DEPLOYMENT_GUIDE.md](docs/deployment/DEPLOYMENT_GUIDE.md)
- **Using Gemini AI (FREE)?** → [docs/setup/GEMINI_SETUP_GUIDE.md](docs/setup/GEMINI_SETUP_GUIDE.md)

### Understanding the System
- **User flows & auth?** → [docs/development/USER_FLOWS.md](docs/development/USER_FLOWS.md)
- **Security analysis?** → [docs/reference/SECURITY_ANALYSIS.md](docs/reference/SECURITY_ANALYSIS.md)
- **MVP simulation mode?** → [docs/development/MVP_SIMULATION.md](docs/development/MVP_SIMULATION.md)

### Testing & Development
- **Testing checklist?** → [docs/reference/TESTING_GUIDE.md](docs/reference/TESTING_GUIDE.md)

### Archived (Reference Only)
- **Phase 3 implementation details?** → [docs/archive/PHASE_3_IMPLEMENTATION_GUIDE.md](docs/archive/PHASE_3_IMPLEMENTATION_GUIDE.md)
- **Old database guides?** → [docs/archive/](docs/archive/)

---

## 📌 Current Project Status

### **Phase 1: Foundation** ✅ COMPLETE
- Registration, authentication, homepage, privacy policy

### **Phase 2: Core Features** ✅ COMPLETE
- Search & filter, contact system, dashboards, project submission, goals assessment

### **Phase 3: Payments & AI** 🟡 CODE COMPLETE (MVP Simulation)
- **Backend:** Database schema + API endpoints written
- **Payments:** Stripe integration (test mode only)
- **AI Verification:** Gemini ready (currently using mocks)
- **Frontend:** Payment form UI (mockup), milestone submission forms pending
- **Status:** Functional for demos, not processing real transactions

**Current Mode:** MVP Simulation
- Mock AI verification (auto-approves)
- Test Stripe payments (no real money)
- Ready for investor demos

---

## 🚀 Quick Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Test production build
npm run test         # Run tests (if configured)

# Deployment
git push origin main # Auto-deploy to Vercel

# Database
# See docs/setup/DATABASE_SETUP.md for migration commands
```

---

## 💡 Common Questions

**Q: Can I test payments locally?**
A: Yes! Using Stripe test mode. See [docs/archive/PHASE_3_IMPLEMENTATION_GUIDE.md](docs/archive/PHASE_3_IMPLEMENTATION_GUIDE.md)

**Q: Do I need API keys for local development?**
A: Not for basic features. Phase 3 requires Stripe test keys. See [.env.example](.env.example)

**Q: Is AI verification working?**
A: Currently mocked for MVP. Real Gemini AI ready but disabled. See [docs/development/MVP_SIMULATION.md](docs/development/MVP_SIMULATION.md)

**Q: Where is the production site?**
A: https://kollektivly-csr.vercel.app/

**Q: How do I contribute?**
A: Read [CLAUDE.md](CLAUDE.md) for philosophy, then check [docs/reference/TESTING_GUIDE.md](docs/reference/TESTING_GUIDE.md)

---

## 📚 Documentation Structure

```
Root Level (quick access):
├── README.md                          # Project overview
├── CLAUDE.md                          # Business model & dev guide
├── QUICKSTART.md                      # This file - start here!
└── .env.example                       # Environment variable template

/docs - Organized Documentation:
├── setup/                             # Initial setup guides
│   ├── DATABASE_SETUP.md             # Comprehensive database guide (NEW!)
│   └── GEMINI_SETUP_GUIDE.md         # AI setup (FREE tier)
│
├── development/                       # Development resources
│   ├── USER_FLOWS.md                 # Auth & navigation flows
│   └── MVP_SIMULATION.md             # Current demo mode
│
├── deployment/                        # Deployment & operations
│   ├── DEPLOYMENT_GUIDE.md           # Production deployment
│   └── DISABLE_EMAIL_VERIFICATION.md # Dev email bypass
│
├── reference/                         # Technical reference
│   ├── SECURITY_ANALYSIS.md          # Security audit
│   └── TESTING_GUIDE.md              # Testing checklist
│
└── archive/                           # Old docs (reference only)
    ├── PHASE_3_IMPLEMENTATION_GUIDE.md
    ├── FIX_ERRORS_NOW.md
    ├── SUPABASE_SETUP.md
    ├── APPLY_MIGRATIONS.md
    └── DEVELOPMENT_STATUS.md
```

---

## 🎯 Next Steps

1. **For new developers:** Follow the 30-minute setup above
2. **For contributors:** Read [CLAUDE.md](CLAUDE.md) then [docs/reference/TESTING_GUIDE.md](docs/reference/TESTING_GUIDE.md)
3. **For deployment:** Follow [docs/deployment/DEPLOYMENT_GUIDE.md](docs/deployment/DEPLOYMENT_GUIDE.md)
4. **For testing:** Check [docs/reference/TESTING_GUIDE.md](docs/reference/TESTING_GUIDE.md)

**Questions?** Check the documentation structure above or open an issue.

---

**Last Updated:** 2025-10-23
**Maintained by:** Development team
**Philosophy:** Keep it simple. Build what scales. Charge for real value.
