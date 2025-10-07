
# 🎯 Supabase Setup Guide for Kollektivly (Beginner-Friendly)

**Great choice!** Supabase gives you Database + Auth + Storage in ONE place, all 100% FREE.

**Total time**: 15-20 minutes
**What you get**: Database (500MB), File Storage (1GB), Built-in Auth

---

## 📋 Quick Overview

We're setting up:
1. **Supabase** - Database + Auth + Storage (replaces Vercel Postgres + KV + Blob!)
2. **Resend** - Email service (for admin notifications only)
3. **Perspective API** - Content moderation
4. **hCaptcha** - Bot protection

**Cost**: 0 SEK/month for everything!

---

# PART 1: Supabase (10 minutes) - Most Important!

## Step 1.1: Create Supabase Account

1. Go to: https://supabase.com/dashboard
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with:
   - **GitHub** (recommended - easiest), or
   - **Email** (will need to verify)
4. After signing in, you'll see the Supabase Dashboard

---

## Step 1.2: Create a New Project

1. Click **"New Project"** button (big green button)
2. You'll see a form. Fill in:

   **Project Name**: `Kollektivly`

   **Database Password**:
   - Click the generate button 🎲 (creates a strong password)
   - **COPY THIS PASSWORD** and save it in Notepad!
   - You'll need it later (rarely, but keep it safe)

   **Region**:
   - ⚠️ **IMPORTANT**: Choose **"Frankfurt (EU Central)"** or **"London (EU West)"**
   - Why? GDPR compliance - keeps data in Europe

   **Pricing Plan**:
   - Should say **"Free"** - perfect!

3. Click **"Create new project"**
4. **Wait 2-3 minutes** while Supabase sets everything up
   - You'll see a progress screen
   - Be patient, it's creating your database!

---

## Step 1.3: Get Your API Keys

After your project is ready:

1. Look at the left sidebar menu
2. Click the **⚙️ Settings** icon (gear icon at bottom)
3. Click **"API"** in the settings menu

You'll see a screen with several keys. You need these 3:

### **Key #1: Project URL**
- Says **"Project URL"** or **"URL"**
- Looks like: `https://abcdefgh12345678.supabase.co`
- **Copy it** and paste in Notepad as:
  ```
  NEXT_PUBLIC_SUPABASE_URL="https://your-project-url.supabase.co"
  ```

### **Key #2: Anon/Public Key**
- Says **"anon public"** or **"API Key"**
- Long string starting with `eyJ...`
- **Copy it** (click the copy icon 📋)
- **Paste in Notepad** as:
  ```
  NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
  ```

### **Key #3: Service Role Key** (Keep this SECRET!)
- Says **"service_role"** (might be hidden - click **"Reveal"** button)
- ⚠️ **WARNING**: This is like a master password - NEVER share it publicly!
- Long string starting with `eyJ...`
- **Copy it**
- **Paste in Notepad** as:
  ```
  SUPABASE_SERVICE_ROLE_KEY="eyJ..."
  ```

✅ **Done with keys!** Keep that Notepad file safe.

---

## Step 1.4: Run the Database Migration

Now we need to create your database tables. Don't worry, it's automated!

1. In Supabase Dashboard, look at the left sidebar
2. Click **"SQL Editor"** (looks like </> icon)
3. Click **"+ New Query"** button (top right)
4. Now, **open your project folder**
5. Find the file: `supabase/migrations/20250101000000_initial_schema.sql`
6. **Open it** and **copy ALL the content** (Ctrl+A, then Ctrl+C)
7. **Go back to Supabase** SQL Editor
8. **Paste it** into the editor (Ctrl+V)
9. Click **"Run"** button (bottom right, or press Ctrl+Enter)

**What you'll see**:
- Text saying "Success. No rows returned"
- Or maybe "Success. Rows: 0"
- This means IT WORKED! ✅

**If you see an error**:
- Make sure you copied the ENTIRE file
- Make sure you're in a "New Query" (not an existing one)
- Try clicking "Run" again

---

## Step 1.5: Create Storage Bucket for Images

1. In left sidebar, click **"Storage"** (📦 icon)
2. Click **"Create a new bucket"** button
3. Fill in:
   - **Name**: `project-images` (exact name, no spaces!)
   - **Public bucket**: **YES** (toggle it ON) ✅
   - Why? So project images can be seen by everyone
4. Click **"Create bucket"**

✅ **Storage ready!**

---

## Step 1.6: Configure Authentication

Supabase Auth is mostly automatic, but let's configure email:

1. In left sidebar, click **"Authentication"** (🔐 icon)
2. Click **"Providers"** (in the sub-menu)
3. You'll see **"Email"** - it should be **enabled** by default ✅
4. Click on **"Email"** to expand settings
5. Make sure these are set:
   - **Enable Email provider**: ✅ ON
   - **Confirm email**: ✅ ON
   - **Secure email change**: ✅ ON

6. Scroll down, find **"Email Templates"**
7. This is where Supabase emails come from - you can customize later!

✅ **Auth configured!**

---

## Step 1.7: Set Site URL (Important!)

1. Still in **Authentication** settings
2. Click **"URL Configuration"** (in sub-menu)
3. You'll see **"Site URL"**
4. Set it to: `http://localhost:3000` (for development)
5. Under **"Redirect URLs"**, add:
   - `http://localhost:3000/**`
   - `https://kollektivly-csr.vercel.app/**` (your production URL)
6. Click **"Save"**

✅ **Supabase is 100% configured!**

---

# PART 2: Other Services (10 minutes)

Now the quick ones!

## Step 2.1: Resend Email (3 minutes)

**Note**: Supabase sends auth emails for free! Resend is only for admin notifications.

1. Go to: https://resend.com/signup
2. Sign up with your email
3. Verify your email (check inbox)
4. After login, click **"API Keys"** in left menu
5. Click **"+ Create API Key"**
6. Name: `Kollektivly`
7. Permission: **"Sending access"**
8. Click **"Create"**
9. **COPY THE KEY** (starts with `re_...`)
10. Save in Notepad as:
    ```
    RESEND_API_KEY="re_..."
    ```

For testing, add this too:
```
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

✅ **Resend done!**

---

## Step 2.2: Perspective API (4 minutes)

1. Go to: https://console.cloud.google.com/
2. Sign in with Google
3. Click **"Select a project"** → **"New Project"**
4. Name: `Kollektivly`
5. Click **"Create"**
6. Wait 10 seconds for project creation
7. In search bar (top), type: **"Perspective Comment Analyzer API"**
8. Click on it, then click **"Enable"**
9. After enabled, click **"Credentials"** (left menu)
10. Click **"+ Create Credentials"** → **"API Key"**
11. **COPY THE KEY** (looks like `AIzaSy...`)
12. Save in Notepad as:
    ```
    PERSPECTIVE_API_KEY="AIzaSy..."
    ```

Optional but recommended:
- Click **"Restrict Key"**
- Under "API restrictions" → Check **"Perspective Comment Analyzer API"**
- Click **"Save"**

✅ **Perspective done!**

---

## Step 2.3: hCaptcha (3 minutes)

1. Go to: https://www.hcaptcha.com/signup-interstitial
2. Sign up with email
3. Verify email (check inbox)
4. After login, click **"+ New Site"**
5. Fill in:
   - **Site name**: `Kollektivly`
   - **Hostnames**:
     - Add: `localhost`
     - Add: `kollektivly-csr.vercel.app`
6. Click **"Save"**
7. You'll see two keys:
   - **Sitekey** (public) - looks like `10000000-ffff-ffff-ffff-000000000001`
   - **Secret Key** (private) - click **"Settings"** tab to see it
8. Copy both and save in Notepad:
   ```
   NEXT_PUBLIC_HCAPTCHA_SITE_KEY="10000000-ffff..."
   HCAPTCHA_SECRET_KEY="0x..."
   ```

✅ **hCaptcha done!**

---

# PART 3: Configure Your Project (5 minutes)

## Step 3.1: Create .env.local File

1. Open your code editor (VS Code, Cursor, etc.)
2. Go to project folder: `KollektivlyCSR`
3. Create a new file called `.env.local` (note the dot at the start!)
4. Copy this template:

```bash
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL="paste-your-url-here"
NEXT_PUBLIC_SUPABASE_ANON_KEY="paste-your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="paste-your-service-role-key-here"

# RESEND
RESEND_API_KEY="paste-your-resend-key-here"
RESEND_FROM_EMAIL="onboarding@resend.dev"

# PERSPECTIVE API
PERSPECTIVE_API_KEY="paste-your-perspective-key-here"

# HCAPTCHA
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="paste-your-site-key-here"
HCAPTCHA_SECRET_KEY="paste-your-secret-key-here"

# APP SETTINGS
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL="your-email@example.com"
NODE_ENV="development"
```

5. **Replace all the `paste-your-...` parts** with the keys from your Notepad
6. **Save the file** (Ctrl+S)

---

## Step 3.2: Test Everything Works!

Open terminal in your project folder and run:

```bash
npm run dev
```

**What you should see**:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

**If you see errors**:
- Check that all environment variables are set
- Make sure `.env.local` is in the project root (not in a subfolder)
- Make sure there are no extra spaces or quotes

---

## Step 3.3: Verify Database Connection

Let's make sure your database is working:

1. Open browser: http://localhost:3000
2. Your site should load ✅
3. In terminal, you should see **no red errors** ✅

---

# 🎉 YOU'RE DONE!

## What You Just Set Up:

✅ **Supabase Database** - 500MB free (PostgreSQL)
✅ **Supabase Auth** - Built-in email authentication
✅ **Supabase Storage** - 1GB free for images
✅ **Resend** - 3,000 emails/month for admin notifications
✅ **Perspective API** - 1M requests/day for content moderation
✅ **hCaptcha** - Unlimited bot protection

## Free Tier Limits:

| Service | Free Tier | Your Usage | Enough? |
|---------|-----------|------------|---------|
| Supabase DB | 500MB | ~200-300 projects | ✅ Yes |
| Supabase Storage | 1GB | ~200 images @ 5MB | ✅ Yes |
| Supabase Auth | Unlimited | All your users | ✅ Yes |
| Resend | 3k emails/mo | ~100/day | ✅ Yes |
| Perspective | 1M req/day | 1 per project submit | ✅ Yes |
| hCaptcha | Unlimited | All forms | ✅ Yes |

**Total Cost**: **0 SEK/month** ✅

---

## 📊 Your Dashboard Links (Bookmark These!)

| Service | Dashboard | What to Check |
|---------|-----------|---------------|
| **Supabase** | https://supabase.com/dashboard | Database, Storage, Auth |
| **Resend** | https://resend.com/emails | Email logs |
| **Google Cloud** | https://console.cloud.google.com/ | API usage |
| **hCaptcha** | https://dashboard.hcaptcha.com/ | Captcha stats |

---

## ✅ Checklist Before Moving On:

- [ ] Supabase project created with EU region
- [ ] Database migration ran successfully (SQL Editor)
- [ ] Storage bucket `project-images` created (public)
- [ ] All 3 Supabase API keys copied
- [ ] Resend API key obtained
- [ ] Perspective API key obtained
- [ ] hCaptcha site key and secret key obtained
- [ ] `.env.local` file created with all keys
- [ ] `npm run dev` runs without errors
- [ ] Homepage loads at http://localhost:3000

---

## 🆘 Troubleshooting

### "Can't connect to database"
- Check `NEXT_PUBLIC_SUPABASE_URL` is correct (no trailing slash)
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the anon key (not service role)

### "SQL migration failed"
- Make sure you copied the ENTIRE SQL file content
- Run it again - it should work
- Check Supabase project is finished setting up (not still initializing)

### "Storage upload failed"
- Check bucket name is exactly `project-images`
- Check bucket is marked as **Public**
- Check you enabled Row Level Security policies

### "Auth not working"
- Check Site URL is set to `http://localhost:3000`
- Check Redirect URLs include `http://localhost:3000/**`

### "Environment variables not found"
- Make sure file is named `.env.local` (with dot at start!)
- Make sure it's in project root, not in `src/` folder
- Restart `npm run dev` after creating `.env.local`

---

## 🚀 Ready to Build!

Once all checkboxes above are ✅, tell me:

**"Supabase setup complete!"**

Then I'll build:
1. ✅ Organization registration form
2. ✅ Email verification flow
3. ✅ Project submission form
4. ✅ Admin dashboard
5. ✅ File upload for images
6. ✅ Content moderation

All using your new Supabase backend! 🎉

---

## 💡 Pro Tips

**During Development**:
- Check Supabase **Table Editor** to see your data
- Check Supabase **Logs** if something doesn't work
- Check Supabase **Auth** tab to see registered users

**Before Production**:
- Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
- Update `RESEND_FROM_EMAIL` to your own domain
- Add production URL to Supabase **Redirect URLs**
- Change `NODE_ENV` to "production"

---

**Need help?** Tell me what step you're stuck on and I'll guide you through it! 🙋‍♂️
