# 🚀 Cloudflare Pages Migration Guide

## ✅ Build Error Fixed!

The Vercel build error has been **resolved**. The app now builds successfully without `RESEND_API_KEY`.

**What was fixed:**
- Made Resend email service optional (lazy-loaded)
- App works without email (logs warnings, doesn't crash)
- Build succeeds on any platform

---

## 🎯 Why Migrate to Cloudflare Pages?

### **vs Vercel:**
| Feature | Cloudflare Pages | Vercel (Free) |
|---------|------------------|---------------|
| **Bandwidth** | ✅ Unlimited | ⚠️ 100GB/month |
| **Build Minutes** | ✅ 500/month | ⚠️ 100/month |
| **Requests** | ✅ Unlimited | ⚠️ Limited |
| **Edge Functions** | ✅ 100,000/day | ⚠️ Limited |
| **Cold Starts** | ✅ None | ❌ Yes |
| **CDN** | ✅ 300+ locations | ⚠️ Limited |
| **Price After Limits** | ✅ Still free | ❌ Charges you |
| **Build Speed** | ✅ Fast | ⚠️ Medium |

### **Bottom Line:**
Cloudflare is **better in every way** for free tier.

---

## 📋 Migration Steps (30 minutes)

### **Step 1: Create Cloudflare Account** (5 min)

1. Go to: https://pages.cloudflare.com
2. Click **"Sign up"**
3. Verify your email
4. Complete setup wizard

### **Step 2: Connect GitHub** (5 min)

1. Click **"Create a project"**
2. Select **"Connect to Git"**
3. Choose **GitHub**
4. Authorize Cloudflare Pages
5. Select repository: `aknouche/KollektivlyCSR`

### **Step 3: Configure Build** (5 min)

**Framework preset:** Next.js

**Build settings:**
```
Build command: npm run build
Build output directory: .next
Root directory: (leave empty)
Node version: 18
```

**Environment Variables:**
Add these from your `.env.local`:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# App Configuration (Required)
NEXT_PUBLIC_APP_URL=https://your-site.pages.dev
ADMIN_EMAIL=admin@kollektivly.se

# Email (Optional - can add later)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@kollektivly.se

# Content Moderation (Optional)
PERSPECTIVE_API_KEY=...

# Captcha (Optional)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...
HCAPTCHA_SECRET_KEY=...
```

### **Step 4: Deploy** (10 min)

1. Click **"Save and Deploy"**
2. Wait for build (3-5 minutes)
3. Get your URL: `https://kollektivly-csr.pages.dev`
4. Test the site

### **Step 5: Custom Domain** (5 min - Optional)

1. Go to **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Add: `kollektivly.se`
4. Follow DNS instructions
5. SSL auto-configured

---

## 🔥 After Migration

### **What to do next:**

1. **Update Supabase:**
   - Go to Supabase dashboard
   - Update `NEXT_PUBLIC_APP_URL` in settings
   - Update redirect URLs for auth

2. **Delete Vercel:**
   - Go to Vercel dashboard
   - Delete project
   - Remove webhook from GitHub

3. **Update README:**
   - Change demo URL to Cloudflare
   - Update deployment instructions

---

## 🆘 Troubleshooting

### **Build fails:**
- Check Node version is 18+
- Verify environment variables are set
- Check build logs for specific errors

### **App loads but broken:**
- Verify Supabase URLs are correct
- Check browser console for errors
- Ensure all env vars copied correctly

### **Auth not working:**
- Update Supabase redirect URLs
- Check `NEXT_PUBLIC_APP_URL` matches site URL
- Clear browser cookies and retry

---

## 📊 Cost Comparison

| Platform | Free Tier | After Limits |
|----------|-----------|--------------|
| **Cloudflare** | Unlimited | Still free! |
| **Vercel** | 100GB/month | $20/month |
| **Netlify** | 100GB/month | $19/month |
| **Railway** | $5 credit/month | $5/month |

**Winner:** Cloudflare (best free tier + unlimited)

---

## ✅ Migration Checklist

- [ ] Create Cloudflare account
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy and test
- [ ] (Optional) Add custom domain
- [ ] Update Supabase redirect URLs
- [ ] Delete Vercel project
- [ ] Update documentation

---

## 🎯 Current Status

**Build Error:** ✅ FIXED (committed to GitHub)
**Vercel:** ⚠️ Should work now, but still recommend migration
**Cloudflare:** 🔄 Ready to deploy

**Next Step:** Follow Step 1 above or tell me to help you deploy!
