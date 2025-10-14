# Kollektivly - CSR Platform

Swedish platform connecting companies with verified non-profit projects for ESG and sustainability initiatives.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production

**Live**: https://kollektivly-csr.vercel.app/

## Tech Stack

- **Next.js 14** - React framework
- **Supabase** - Database, auth, storage
- **Vercel** - Hosting (auto-deploy from main branch)
- **TypeScript** - Type safety
- **TailwindCSS** - Styling

## Project Status

- ✅ Phase 1 Complete: Functional MVP with backend
- 🚧 Phase 2 Next: Search, contact system, analytics

## Documentation

- **CLAUDE.md** - Full development guide, PRD, architecture
- **docs/SECURITY_ANALYSIS.md** - Security guidelines
- **docs/SUPABASE_SETUP.md** - Database setup instructions

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm test             # Run tests
npm run lint         # Check code quality
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and add:
- Supabase credentials
- Email service keys (Resend)
- hCaptcha keys

See `docs/SUPABASE_SETUP.md` for details.

## Development Workflow

```bash
git pull origin main                    # Get latest
npm run dev                             # Work locally
npm test                                # Verify tests pass
git add . && git commit -m "message"    # Commit changes
git push origin main                    # Auto-deploy to Vercel
```

## For AI Assistants

Read **CLAUDE.md** first - contains full context, PRD, and development guidelines.

---

Built with Claude Code | Cost: 0 SEK/month (free tier)
