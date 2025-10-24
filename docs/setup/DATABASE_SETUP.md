# 🎯 Database Setup Guide - Kollektivly

**Complete guide for setting up and managing your Kollektivly database with Supabase.**

---

## Quick Navigation

- **New to Kollektivly?** → Start with [Complete Setup](#complete-setup-for-new-projects)
- **Getting migration errors?** → Jump to [Apply Migrations](#apply-migrations-quick-fix)
- **Need to troubleshoot?** → See [Troubleshooting](#troubleshooting)

---

## Complete Setup (For New Projects)

### Prerequisites
- GitHub account (recommended) or email address
- 15-20 minutes of time

### What You'll Get
- **Database**: PostgreSQL (500 MB free)
- **Authentication**: Built-in user management
- **Storage**: File uploads (1 GB free)
- **Cost**: 0 SEK/month

---

## Step 1: Create Supabase Account

1. Go to: https://supabase.com/dashboard
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with:
   - **GitHub** (recommended - easiest), OR
   - **Email** (requires verification)

---

## Step 2: Create New Project

1. Click **"New Project"** (green button)

2. Fill in the form:

   **Project Name**: `Kollektivly`

   **Database Password**:
   - Click the generate button 🎲
   - **SAVE THIS PASSWORD** in a safe place
   - You'll rarely need it, but keep it secure

   **Region**: Choose **"Frankfurt (EU Central)"** or **"London (EU West)"**
   - ⚠️ **Important**: EU region for GDPR compliance

   **Pricing Plan**: **"Free"** (perfect for getting started)

3. Click **"Create new project"**

4. **Wait 2-3 minutes** while Supabase provisions your database

---

## Step 3: Get Your API Keys

Once your project is ready:

1. Click **⚙️ Settings** icon (bottom of left sidebar)
2. Click **"API"** in settings menu

You'll need **3 keys**:

### Key #1: Project URL
```
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
```
- Copy the URL shown under "Project URL"

### Key #2: Anon/Public Key
```
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
```
- Copy the key under "anon public"
- Click the copy icon 📋

### Key #3: Service Role Key (Keep SECRET!)
```
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."
```
- Click **"Reveal"** to show the service_role key
- ⚠️ **Never commit this to git or share publicly**
- This is your admin key with full database access

### Save Your Keys

1. Open your project folder
2. Copy `.env.example` to `.env.local`
3. Paste your 3 keys into `.env.local`

---

## Step 4: Apply Database Migrations

Now create your database tables.

### Option A: Supabase Dashboard (Recommended)

1. In Supabase Dashboard, click **"SQL Editor"** (</> icon in sidebar)
2. Click **"+ New Query"** button

3. **Run Migration 1: Base Schema**
   - Open: `supabase/migrations/20250101000000_initial_schema.sql`
   - Copy **ALL** content (Ctrl+A, Ctrl+C)
   - Paste into SQL Editor (Ctrl+V)
   - Click **"Run"** (or Ctrl+Enter)
   - Should see: ✅ "Success. No rows returned"

4. **Run Migration 2: Companies Table**
   - Open: `supabase/migrations/20250120000000_add_companies_table.sql`
   - Copy ALL content
   - Create **New Query** in SQL Editor
   - Paste and click **"Run"**
   - Should see: ✅ "Success. No rows returned"

5. **Run Migration 3: Payment Schema** (Optional - Phase 3 only)
   - Open: `supabase/migrations/20250121000000_add_payment_escrow_schema.sql`
   - Copy ALL content
   - Create **New Query** in SQL Editor
   - Paste and click **"Run"**
   - Should see: ✅ "Success. No rows returned"

### Option B: Supabase CLI (Advanced)

**Prerequisites:**
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF
```

**Apply all migrations:**
```bash
supabase db push
```

This automatically applies all pending migrations in order.

---

## Step 5: Create Storage Buckets

### For Project Images (Phase 1 & 2)

1. Click **"Storage"** (📦 icon in sidebar)
2. Click **"Create a new bucket"**
3. Fill in:
   - **Name**: `project-images`
   - **Public bucket**: **YES** ✅
4. Click **"Create bucket"**

### For Payment Documents (Phase 3)

**When you're ready for Phase 3:**

1. Create **"documents"** bucket:
   - Name: `documents`
   - Public: **NO** ❌ (private documents)
   - Click **"Create bucket"**

2. Create **"photos"** bucket:
   - Name: `photos`
   - Public: **YES** ✅ (for impact reports)
   - Click **"Create bucket"**

---

## Step 6: Configure Authentication

1. Click **"Authentication"** (🔐 icon in sidebar)
2. Click **"Providers"**
3. Verify **"Email"** is enabled ✅
4. Optional: Configure email templates
   - Click **"Email Templates"** → **"Confirm signup"**
   - Customize Swedish welcome message

### Disable Email Verification (Dev Only)

For faster local testing, you can disable email verification:

1. Go to **Authentication** → **Settings**
2. Toggle **"Enable email confirmations"** to **OFF**
3. **Remember to re-enable for production!**

Or use environment variable (see `DISABLE_EMAIL_VERIFICATION.md`):
```bash
EMAIL_VERIFICATION_DISABLED="true"
```

---

## Step 7: Verify Setup

Run this query in SQL Editor to check all tables exist:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'organizations',
  'projects',
  'companies',
  'payment_cases',
  'milestones',
  'ai_verifications'
)
ORDER BY table_name;
```

**Expected result**: 6 tables listed (or 3 if you skipped Phase 3 migration)

---

## Apply Migrations (Quick Fix)

**Already have Supabase set up but getting database errors?**

### Quick Diagnosis

Run this in Supabase SQL Editor:
```sql
SELECT * FROM companies LIMIT 1;
```

- ✅ **No error**: Companies table exists
- ❌ **"relation 'companies' does not exist"**: Need to apply migration

### Fix: Apply Missing Migrations

1. Go to https://supabase.com/dashboard
2. Select your project → **SQL Editor** → **New query**

3. **Check which tables you have**:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';
   ```

4. **Apply missing migrations**:

   **Missing companies table?**
   - Open: `supabase/migrations/20250120000000_add_companies_table.sql`
   - Copy and paste into SQL Editor
   - Click "Run"

   **Need Phase 3 tables?**
   - Open: `supabase/migrations/20250121000000_add_payment_escrow_schema.sql`
   - Copy and paste into SQL Editor
   - Click "Run"

5. **Restart your dev server**:
   ```bash
   npm run dev
   ```

---

## Troubleshooting

### Error: "relation 'companies' does not exist"

**Cause**: Companies migration not applied

**Fix**:
1. Go to Supabase Dashboard → SQL Editor
2. Run the companies migration (see [Apply Migrations](#apply-migrations-quick-fix))
3. Restart dev server

### Error: "function update_updated_at_column() does not exist"

**Cause**: Base schema migration not applied first

**Fix**:
1. Run migrations in order:
   - First: `20250101000000_initial_schema.sql`
   - Then: `20250120000000_add_companies_table.sql`

### Error: "duplicate key value violates unique constraint"

**Cause**: Table already exists or data conflict

**Fix**:
1. Check if table exists:
   ```sql
   SELECT * FROM pg_tables
   WHERE schemaname = 'public'
   AND tablename = 'companies';
   ```
2. If table exists, migration is already applied
3. If you need to reset, you can drop and recreate (⚠️ **DELETES ALL DATA**):
   ```sql
   DROP TABLE IF EXISTS companies CASCADE;
   -- Then run migration again
   ```

### Error: 500 on API routes

**Possible causes**:
1. Missing environment variables
2. Wrong Supabase keys
3. Database tables not created
4. RLS policies blocking access

**Fix**:
1. Check `.env.local` has all 3 Supabase keys
2. Verify keys are correct (Settings → API in Supabase)
3. Check tables exist (see [Verify Setup](#step-7-verify-setup))
4. Check Supabase Dashboard → Logs → Database for errors

### Storage Upload Fails

**Cause**: Bucket doesn't exist or wrong permissions

**Fix**:
1. Go to Supabase Dashboard → Storage
2. Verify bucket exists
3. Check bucket is Public (for project-images, photos)
4. Check RLS policies allow uploads

---

## Migration Reference

### Migration Order

Apply migrations in this order:

1. **`20250101000000_initial_schema.sql`** - Base tables
   - organizations
   - projects
   - contact_messages
   - Helper functions

2. **`20250102000000_add_english_project_columns.sql`** - English support

3. **`add_project_dates.sql`** - Project date fields

4. **`20250117000000_add_contact_count_function.sql`** - Contact counter

5. **`20250120000000_add_companies_table.sql`** - Company authentication
   - **Required for company login/registration**

6. **`20250121000000_add_payment_escrow_schema.sql`** - Phase 3 payments
   - payment_cases
   - milestones
   - ai_verifications
   - esg_reports

### What Each Migration Creates

**Initial Schema**:
- `organizations` - Föreningar (associations)
- `projects` - Samhällsprojekt
- `contact_messages` - Company contact requests
- `update_updated_at_column()` - Timestamp trigger

**Companies Table**:
- `companies` - Company accounts
- Links to Supabase Auth
- Stores goals assessment data
- GDPR consent tracking

**Payment Schema**:
- `payment_cases` - Escrow payment container
- `milestones` - 2-stage payment system
- `ai_verifications` - AI verification audit trail
- `esg_reports` - Auto-generated ESG reports

---

## Database Maintenance

### Check Database Size

```sql
SELECT
  pg_size_pretty(pg_database_size(current_database())) as database_size;
```

### View All Tables

```sql
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Reset Test Data (Development Only)

**⚠️ WARNING: Deletes all data!**

```sql
-- Clear companies (keeps table structure)
TRUNCATE companies CASCADE;

-- Clear payment data
TRUNCATE payment_cases, milestones, ai_verifications, esg_reports CASCADE;

-- Clear projects and organizations
TRUNCATE projects, organizations, contact_messages CASCADE;
```

---

## Production Deployment

### Before Deploying to Production

1. ✅ **Apply all migrations** to production database
2. ✅ **Create all storage buckets** (project-images, documents, photos)
3. ✅ **Enable email verification** (disable dev bypass)
4. ✅ **Update environment variables** in Vercel:
   - Use production Supabase URL and keys
   - Remove `EMAIL_VERIFICATION_DISABLED`
5. ✅ **Test authentication flow** end-to-end
6. ✅ **Verify RLS policies** are working
7. ✅ **Check Supabase logs** for any errors

### Production Checklist

- [ ] Supabase project created in EU region
- [ ] All 6 migrations applied successfully
- [ ] Storage buckets created (project-images, documents, photos)
- [ ] Email provider configured
- [ ] Production keys added to Vercel
- [ ] Test company registration works
- [ ] Test organization registration works
- [ ] Test payment flow (if Phase 3 deployed)

---

## Additional Resources

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Supabase Docs**: https://supabase.com/docs
- **Supabase CLI**: https://supabase.com/docs/guides/cli

**Related Docs**:
- `QUICKSTART.md` - Getting started guide
- `DISABLE_EMAIL_VERIFICATION.md` - Dev mode email bypass
- `CURRENT_STATUS_AND_TESTING.md` - Testing guide
- `DEPLOYMENT_COMPLETE_GUIDE.md` - Production deployment

---

**Last Updated**: 2025-10-23
**Maintained By**: Development Team

**Need Help?** Check Supabase Dashboard → Logs → Database for detailed error messages.
