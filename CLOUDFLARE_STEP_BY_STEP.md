# 🚀 Cloudflare Pages Setup - Complete Beginner Guide

## ✋ Before You Start

**What you need:**
- ✅ A web browser
- ✅ Your GitHub account (the one with KollektivlyCSR)
- ✅ An email address (for Cloudflare account)
- ✅ 10 minutes of time

**What this will do:**
- Create a free Cloudflare account
- Connect it to your GitHub repository
- Deploy your website to the internet
- Give you a live URL like: `https://kollektivly-csr.pages.dev`

---

## 📋 Step 1: Create Cloudflare Account

### 1.1 Open Cloudflare Pages

**Action:** Click this link (or copy-paste to your browser):
```
https://dash.cloudflare.com/sign-up/pages
```

**What you'll see:** A signup form with email and password fields

### 1.2 Fill in the Form

**Type in:**
- **Email:** Your email address (use the same one as GitHub if possible)
- **Password:** Create a strong password (8+ characters)
- **Check the box:** "I agree to Cloudflare's Terms of Service"

**Then click:** The big blue **"Sign Up"** button

### 1.3 Verify Your Email

**What happens:** Cloudflare sends you an email

**Action:**
1. Open your email inbox
2. Look for email from: `no-reply@cloudflare.com`
3. Subject: "Verify your email address"
4. Click the **"Verify email"** button in the email

**Note:** If you don't see it, check spam/junk folder

### 1.4 Complete Profile (Optional)

**What you might see:** Questions about your usage

**You can:**
- Answer them if you want
- Or click **"Skip"** or **"Continue"**

**Goal:** Get to the Cloudflare dashboard (looks like a dark/blue interface)

---

## 📋 Step 2: Create Your First Project

### 2.1 Find "Pages" Section

**What you see:** Cloudflare dashboard (main page)

**Action:**
1. Look at the left sidebar
2. Find **"Workers & Pages"** (has an orange icon)
3. Click on it

**Alternative:** You might already be on the Pages screen (you'll see "Create an application")

### 2.2 Start Creating a Project

**What you see:** Either:
- A button that says **"Create application"**, OR
- A button that says **"Create a project"**

**Action:** Click whichever button you see

### 2.3 Choose "Pages" Tab

**What you see:** Two tabs at the top:
- Workers
- Pages ← Click this one

**Action:** Click the **"Pages"** tab

### 2.4 Connect to Git

**What you see:** A big section that says "Connect to Git"

**Action:** Click the **"Connect to Git"** button

---

## 📋 Step 3: Connect GitHub

### 3.1 Choose GitHub

**What you see:** Options to connect different services

**Action:** Click the **"GitHub"** option (has the GitHub cat logo)

### 3.2 Install Cloudflare App

**What happens:** A popup window opens (GitHub website)

**Don't panic!** This is normal and safe. This lets Cloudflare access your code.

**What you see:** GitHub asking "Where do you want to install Cloudflare Pages?"

**Action:**
1. You'll see your GitHub username (e.g., `aknouche`)
2. Click on your username (might already be selected)
3. Click the green **"Install"** button

### 3.3 Authorize Access

**What you see:** GitHub asking which repositories Cloudflare can access

**Two options:**

**Option A - All repositories (easier):**
- Select: **"All repositories"**
- Click green **"Install & Authorize"** button

**Option B - Only KollektivlyCSR (more secure):**
- Select: **"Only select repositories"**
- Click the dropdown that appears
- Find and click: **"KollektivlyCSR"**
- Click green **"Install & Authorize"** button

**I recommend:** Option B (more secure)

### 3.4 Confirm Password

**What you might see:** GitHub asks for your password

**Action:**
1. Type your GitHub password
2. Click **"Confirm"**

**What happens:** Popup closes, you're back to Cloudflare

---

## 📋 Step 4: Select Your Repository

### 4.1 Find Your Repository

**What you see:** List of your repositories

**Action:**
1. Look for: **"aknouche/KollektivlyCSR"** (or whatever your repo is named)
2. Click the **"Begin setup"** button next to it

**Don't see it?**
- Wait 10 seconds and refresh the page
- If still missing, click "Add account" and repeat Step 3

---

## 📋 Step 5: Configure Build Settings

**What you see:** A form with many fields

**This is the most important part!** Follow exactly:

### 5.1 Project Name

**Field:** "Project name"
**Type:** `kollektivly-csr` (or any name you like)

**Note:** This will be your URL: `https://kollektivly-csr.pages.dev`

### 5.2 Production Branch

**Field:** "Production branch"
**Type:** `main`

**Leave as:** `main` (should already be set)

### 5.3 Framework Preset

**Field:** "Framework preset"

**Action:**
1. Click the dropdown
2. Scroll down to find: **"Next.js (Static & SSR)"**
3. Click it

**Important:** Make sure it says "Next.js (Static & SSR)" - not just "Next.js"

### 5.4 Build Command

**Field:** "Build command"

**Check it says:** `npm run build`

**If not:**
- Clear the field
- Type: `npm run build`

### 5.5 Build Output Directory

**Field:** "Build output directory"

**Check it says:** `.next`

**If not:**
- Clear the field
- Type: `.next`

### 5.6 Root Directory

**Field:** "Root directory (advanced)"

**Action:** Leave it **blank** (don't type anything)

---

## 📋 Step 6: Add Environment Variables

**This is critical!** Your app won't work without these.

### 6.1 Open Your .env.local File

**On your computer:**
1. Open VS Code (or your code editor)
2. Open file: `.env.local` (in your KollektivlyCSR folder)
3. Keep this open - you'll copy values from here

### 6.2 Add Variables in Cloudflare

**On the Cloudflare page, scroll down to:** "Environment variables"

**Click:** The **"Add variable"** button

**For each variable below, do this:**
1. Click **"Add variable"**
2. In **"Variable name"** field: Type the name (left side)
3. In **"Value"** field: Copy from your .env.local (the part after `=`)
4. Click **"Save"** or just move to next one

### 6.3 Required Variables (MUST add these)

**Copy these exactly from your .env.local:**

```
Variable name: NEXT_PUBLIC_SUPABASE_URL
Value: [Copy from .env.local - starts with https://]

Variable name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Copy from .env.local - long string starting with eyJ]

Variable name: SUPABASE_SERVICE_ROLE_KEY
Value: [Copy from .env.local - long string starting with eyJ]

Variable name: NEXT_PUBLIC_APP_URL
Value: https://kollektivly-csr.pages.dev
(or whatever project name you chose in 5.1)

Variable name: ADMIN_EMAIL
Value: [Your email address]
```

### 6.4 Optional Variables (Add if you have them)

**Only add these if they exist in your .env.local:**

```
Variable name: RESEND_API_KEY
Value: [Copy from .env.local if exists]

Variable name: RESEND_FROM_EMAIL
Value: noreply@kollektivly.se

Variable name: NEXT_PUBLIC_HCAPTCHA_SITE_KEY
Value: [Copy from .env.local if exists]

Variable name: HCAPTCHA_SECRET_KEY
Value: [Copy from .env.local if exists]

Variable name: PERSPECTIVE_API_KEY
Value: [Copy from .env.local if exists]
```

**Tip:** If a variable is missing or empty in .env.local, skip it. The app works without them.

---

## 📋 Step 7: Deploy!

### 7.1 Save and Deploy

**Action:** Scroll to the bottom and click the big **"Save and Deploy"** button

**What happens:** You'll see a build log (lots of text scrolling)

### 7.2 Wait for Build

**What you see:**
- A progress bar or spinner
- Text like "Initializing build environment..."
- Lots of npm install messages
- "Building application..."

**Time:** 3-5 minutes

**Status messages you'll see:**
1. ⏳ Initializing... (30 seconds)
2. ⏳ Installing dependencies... (1-2 minutes)
3. ⏳ Building... (2 minutes)
4. ✅ Build succeeded!
5. ✅ Deploying to Cloudflare's network...
6. ✅ Success! View site

### 7.3 Build Success!

**What you see:**
- Green checkmark ✅
- "Success! Your site is live at:"
- A URL: `https://kollektivly-csr.pages.dev`

**Action:** Click the URL to open your live website!

---

## 🎉 You're Done!

### What Just Happened?

✅ Created Cloudflare account
✅ Connected your GitHub repository
✅ Configured build settings
✅ Added environment variables
✅ Built and deployed your app
✅ Got a live URL!

### Your Live Website

**URL:** `https://[your-project-name].pages.dev`

**What to do:**
1. Click the URL
2. Test your website
3. Try registering an organization
4. Check if everything works

---

## ❓ Common Issues

### "Build failed"
**Solution:**
- Check build logs for red error messages
- Verify all environment variables are correct
- Make sure you selected "Next.js (Static & SSR)"

### "Can't find repository"
**Solution:**
- Go back to GitHub authorization
- Make sure you selected the right repository
- Wait 30 seconds and refresh

### "Site loads but looks broken"
**Solution:**
- Check browser console (F12) for errors
- Verify environment variables are exactly as in .env.local
- Make sure NEXT_PUBLIC_APP_URL matches your actual URL

### "Email verification not working"
**Solution:**
- That's normal if you don't have RESEND_API_KEY
- You can manually approve organizations in Supabase dashboard

---

## 🆘 Need Help?

**Tell me:**
- "I'm stuck at step X.X"
- "I see this error: [paste error]"
- "My build failed, here's the log: [paste]"
- Screenshot if possible

I'll help you fix it immediately!

---

**Ready to start? Tell me when you:**
- ✅ Opened the signup page
- ✅ Created your account
- ✅ Verified your email
- ❌ Got stuck somewhere
