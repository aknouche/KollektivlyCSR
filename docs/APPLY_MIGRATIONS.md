# How to Apply Database Migrations to Supabase

## 🚨 **You're getting errors because the new tables don't exist yet!**

The migrations are created but not applied to your Supabase database. Here's how to fix it:

---

## Option 1: Supabase Dashboard (Easiest - Recommended)

### Step 1: Go to Supabase SQL Editor
1. Open https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"**

### Step 2: Run Migrations One by One

Copy and paste each migration file content into the SQL Editor and run them **in order**:

#### Migration 1: Companies Table (REQUIRED)
```sql
-- Copy the entire content from:
supabase/migrations/20250120000000_add_companies_table.sql

-- Then click "Run" (or Ctrl+Enter)
```

#### Migration 2: Payment/Escrow Schema (For Phase 3)
```sql
-- Copy the entire content from:
supabase/migrations/20250121000000_add_payment_escrow_schema.sql

-- Then click "Run"
```

### Step 3: Verify Tables Created
In SQL Editor, run:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('companies', 'payment_cases', 'milestones', 'ai_verifications', 'esg_reports');
```

You should see all 5 tables listed.

---

## Option 2: Supabase CLI (Advanced)

### Prerequisites
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link to your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   (Find `YOUR_PROJECT_REF` in your Supabase Dashboard URL: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`)

### Apply Migrations
```bash
supabase db push
```

This will automatically apply all migrations in `supabase/migrations/` that haven't been applied yet.

---

## Option 3: Manual SQL Execution (Quick Fix)

### For Companies Table (REQUIRED NOW):

1. Go to Supabase Dashboard → SQL Editor
2. Paste this entire SQL:

```sql
-- Companies table for proper authentication
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Info
  company_name TEXT NOT NULL,
  org_number TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,

  -- Contact Details
  contact_person TEXT NOT NULL,
  phone_number TEXT,
  website TEXT,

  -- Location
  city TEXT,
  address TEXT,

  -- Industry & Goals
  industry TEXT,
  employee_count TEXT,

  -- Goals Assessment
  sponsorship_goals TEXT[],
  current_csr_maturity TEXT,
  assessment_completed BOOLEAN DEFAULT FALSE,
  assessment_completed_at TIMESTAMP WITH TIME ZONE,
  recommended_services TEXT[],

  -- GDPR Consent
  gdpr_consent BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP WITH TIME ZONE,

  -- Auth link
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_companies_email ON companies(email);
CREATE INDEX idx_companies_auth_user_id ON companies(auth_user_id);

-- Trigger for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own company"
  ON companies FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own company"
  ON companies FOR UPDATE
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Anyone can register company"
  ON companies FOR INSERT
  WITH CHECK (true);

-- Update contact_messages to link to companies
ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);

CREATE INDEX IF NOT EXISTS idx_contact_messages_company_id ON contact_messages(company_id);

-- Comments
COMMENT ON TABLE companies IS 'Companies registered on the platform (sponsors/supporters)';
```

3. Click **"Run"** or press **Ctrl+Enter**

---

## ✅ After Running Migration

### Test It Works:
1. Refresh your browser on http://localhost:3000
2. Go to `/foretag-logga-in`
3. Try registering a test company:
   - Company Name: Test AB
   - Email: test@example.com
   - Contact Person: Test Person
   - Password: testtest123
   - Check GDPR consent

4. You should see: "Registrering lyckades! Kontrollera din e-post..."

### Verify in Supabase:
1. Go to Supabase Dashboard → Table Editor
2. Look for `companies` table
3. You should see your test company record

---

## 🔍 Troubleshooting

### Error: "relation 'companies' does not exist"
→ Migration hasn't been applied yet. Follow Option 1 or 3 above.

### Error: "function update_updated_at_column() does not exist"
→ You need to run the initial schema migration first:
   `supabase/migrations/20250101000000_initial_schema.sql`

### Error: "duplicate key value violates unique constraint"
→ Table already exists. Check if migration was already applied:
```sql
SELECT * FROM pg_tables WHERE schemaname = 'public' AND tablename = 'companies';
```

### Still getting 500 errors?
1. Check your `.env.local` file has correct Supabase credentials
2. Check browser console for detailed error messages
3. Check Supabase Dashboard → Logs for server-side errors

---

## 📝 Migration Order (For Reference)

If you need to apply all migrations from scratch:

1. `20250101000000_initial_schema.sql` - Base tables (organizations, projects, etc.)
2. `20250102000000_add_english_project_columns.sql` - English support
3. `add_project_dates.sql` - Project date fields
4. `20250117000000_add_contact_count_function.sql` - Contact counter
5. **`20250120000000_add_companies_table.sql`** ← **YOU NEED THIS NOW**
6. `20250121000000_add_payment_escrow_schema.sql` ← For Phase 3

---

## 🚀 Quick Start (TL;DR)

**For immediate fix**:
1. Go to https://supabase.com/dashboard
2. Click your project → SQL Editor → New query
3. Copy ALL content from `supabase/migrations/20250120000000_add_companies_table.sql`
4. Paste and click "Run"
5. Refresh your browser
6. Company login/register should work now!

---

**Need help?** Check the Supabase logs at Dashboard → Logs → Database for detailed error messages.
