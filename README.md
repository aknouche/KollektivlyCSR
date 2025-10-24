# Kollektivly

Swedish platform connecting companies with verified föreningar through AI-verified escrow payments.

**Core Value**: "No Report, No Payment" - We guarantee impact by holding grant money until AI verifies förening reports.

## Quick Start

```bash
npm install
npm run dev  # Open http://localhost:3000
```

## Live Site

**Production**: https://kollektivly-csr.vercel.app/

## What We Do

**For Companies**: Support samhällsprojekt with zero risk. We hold payment until AI verifies impact reports.

**For Föreningar**: Get guaranteed funding access. Submit verified reports, receive payment.

**Revenue**: Service fee (4-10%) charged ON TOP of grant amount for escrow + AI verification.

## Tech Stack

- **Next.js 14** + TypeScript
- **Supabase** (database, auth, storage)
- **Stripe Connect** (escrow)
- **Google Gemini** (AI report verification, FREE tier)
- **Vercel** (hosting, 0 SEK/month)

## Status

- ✅ Phase 1: MVP complete
- ✅ Phase 2: Search, contact, dashboards
- 🟡 Phase 3: Code complete (MVP simulation mode)

## Commands

```bash
npm run dev          # Development
npm run build        # Production build
npm test             # Run tests
git push origin main # Auto-deploy
```

## Documentation

- **QUICKSTART.md** - Start here! Navigation guide
- **CLAUDE.md** - Development guide & business model
- **docs/reference/SECURITY_ANALYSIS.md** - Security guidelines
- **docs/setup/DATABASE_SETUP.md** - Database setup

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
- `HCAPTCHA_SECRET_KEY`

See docs for details.

---

**Last Updated**: 2025-10-23 | Built with Claude Code
