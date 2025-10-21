# 🚀 Disable Email Verification (Quick Fix)

## Problem
When you register, Supabase sends a verification email. The link expires or doesn't work, blocking you from testing.

## Solution
Disable email verification in Supabase Dashboard (takes 30 seconds).

---

## Steps

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers** (in left sidebar)
4. Click on **Email** provider
5. Scroll down to **"Confirm email"**
6. **UNCHECK** the box that says "Confirm email"
7. Click **Save**

Done! ✅

---

## What This Does

**Before**:
- User registers → Email sent → Must click link → Then can login
- Link expires → User stuck ❌

**After**:
- User registers → Immediately verified → Can login right away ✅

---

## Test It Now

1. Make sure dev server is running:
```bash
npm run dev
```

2. Go to: http://localhost:3000/foretag-logga-in

3. Click **"Registrera"** tab

4. Fill in:
   - Company name: Test AB
   - Contact person: John Doe
   - Email: test2@example.com (use new email)
   - Password: testtest123
   - Phone: 0701234567
   - City: Stockholm
   - ✅ Accept GDPR

5. Click **"Registrera"**

**Expected**: Should immediately show "Registrering lyckades! Du kan nu logga in."

6. Switch to **"Logga in"** tab

7. Login with:
   - Email: test2@example.com
   - Password: testtest123

**Expected**: Redirects to `/foretag-dashboard` ✅

---

## Verification

You should see the dashboard with:
- Company name: "Test AB"
- Email: test2@example.com
- Banner: "Slutför din målsättningsformulär" (if assessment not done)
- Logout button

---

## Re-enable Later (Production)

When you're ready for production:
1. Go back to Supabase → Authentication → Providers → Email
2. ✅ **Check** "Confirm email"
3. Set up proper email templates
4. Use Resend for email sending (you already have API key!)

---

**Next**: Once login works, test the goals assessment form at `/foretag-matningsfragor`
