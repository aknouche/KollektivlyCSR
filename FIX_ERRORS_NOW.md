# 🚨 URGENT: Fix Registration Errors

## What's Happening?

You're seeing these errors:
```
Failed to load resource: the server responded with a status of 400
api/companies/register:1 Failed to load resource: the server responded with a status of 500
```

## Why?

**The `companies` table doesn't exist in your Supabase database yet!**

I created the migration file (`20250120000000_add_companies_table.sql`), but it hasn't been **applied** to your live database.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Open Supabase Dashboard
Go to: https://supabase.com/dashboard

### Step 2: Find Your Project
Click on your Kollektivly project

### Step 3: Open SQL Editor
- Click **"SQL Editor"** in the left sidebar
- Click **"New query"**

### Step 4: Copy & Run Migration
1. Open this file on your computer:
   ```
   C:\Users\moulo\KollektivlyCSR\supabase\migrations\20250120000000_add_companies_table.sql
   ```

2. Copy **ALL** the content (Ctrl+A, Ctrl+C)

3. Paste it into the Supabase SQL Editor

4. Click **"Run"** (or press Ctrl+Enter)

5. You should see: ✅ **"Success. No rows returned"**

### Step 5: Verify
Run this query in the SQL Editor:
```sql
SELECT * FROM companies LIMIT 1;
```

You should see an empty result (no errors = table exists!)

### Step 6: Test
1. Go back to your browser: http://localhost:3000/foretag-logga-in
2. Click **"Registrera"** tab
3. Fill in the form:
   - Company Name: Test AB
   - Email: yourname@example.com
   - Contact Person: Your Name
   - Password: testtest123
   - Check GDPR consent box
4. Click **"Skapa konto"**

You should see: ✅ **"Registrering lyckades! Kontrollera din e-post..."**

---

## 🎯 What I Built (That Needs This Migration)

### New Company Authentication System:
- ✅ Proper Supabase Auth (no localStorage!)
- ✅ Company registration with email verification
- ✅ Company login/logout
- ✅ Company dashboard with auth check
- ✅ Goals assessment form (5 steps)
- ✅ Expert consultation recommendations

### Database Schema:
The `companies` table stores:
- Company info (name, email, contact person)
- Industry and employee count
- Sponsorship goals (from assessment)
- CSR maturity level
- Recommended consultation services (CSRD, Marketing, Both)
- Links to Supabase Auth users

---

## 📋 Other Migrations (Optional - For Phase 3)

Once companies table is working, you can also apply the payment/escrow schema:

**File**: `supabase/migrations/20250121000000_add_payment_escrow_schema.sql`

This creates:
- `payment_cases` - Payment container with escrow
- `milestones` - 2-stage payment system
- `ai_verifications` - AI check audit trail
- `esg_reports` - Auto-generated reports

**When to apply**: When you're ready to implement Stripe payments (Phase 3)

---

## 🔍 Still Having Issues?

### Check Supabase Logs:
1. Supabase Dashboard → Logs → Database
2. Look for error messages related to `companies` table

### Check Your .env.local:
Make sure these are set:
```
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### Restart Dev Server:
```bash
npm run dev
```

---

## ✅ Once Fixed, You'll Have:

- Company registration working ✅
- Company login working ✅
- Company dashboard showing ✅
- Goals assessment accessible ✅
- Expert recommendations showing ✅

---

## 📚 Detailed Guide

See `docs/APPLY_MIGRATIONS.md` for more options (Supabase CLI, etc.)

---

**TL;DR**: Copy the content of `20250120000000_add_companies_table.sql` into Supabase SQL Editor and click Run. That's it! 🚀
