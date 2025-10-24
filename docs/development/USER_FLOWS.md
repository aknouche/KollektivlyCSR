# Kollektivly - User Flows Documentation

**Last Updated**: 2025-10-21

## Overview
This document maps all user authentication and registration flows for both Companies (Företag) and Organizations (Föreningar).

---

## 🏢 Company (Företag) Flow

### Entry Points
1. **Homepage** → "Hitta projekt" → Browse without account
2. **Navigation** → "För företag" → `/foretag-logga-in`
3. **Direct link** → `/registrera` → Choose "Företag" → `/foretag-logga-in`

### Authentication Page: `/foretag-logga-in`
- **Type**: Toggle tabs (Login ↔ Registrera)
- **Default tab**: Login (unless `?tab=register` is in URL)
- **URL Parameters**:
  - `/foretag-logga-in` → Shows login tab
  - `/foretag-logga-in?tab=register` → Shows register tab
- **Login redirects to**: `/foretag-dashboard`
- **Register redirects to**: Success message → Switch to login tab

### Registration Fields (Simple)
- Company name *
- Email *
- Contact person *
- Phone (optional)
- City (optional)
- Password *
- GDPR consent *

### Post-Login Destination
- **Dashboard**: `/foretag-dashboard`
- **Features**: View projects, track contacts, goals assessment

### Protected Routes
All redirect to `/foretag-logga-in` if not authenticated:
- `/foretag-dashboard`
- `/foretag-matningsfragor` (goals assessment)
- `/foretag-matningsfragor/resultat`

---

## 🤝 Organization (Förening) Flow

### Entry Points
1. **Homepage** → "Publicera projekt" → `/dashboard` → Redirects to `/forening-logga-in`
2. **Navigation** → "För föreningar" → `/forening-logga-in`
3. **Direct link** → `/registrera` → Choose "Förening" → `/forening-logga-in`

### Authentication Page: `/forening-logga-in`
- **Type**: Toggle tabs (Login ↔ Registrera)
- **Default tab**: Login (unless `?tab=register` is in URL)
- **URL Parameters**:
  - `/forening-logga-in` → Shows login tab
  - `/forening-logga-in?tab=register` → Shows register tab
- **Login redirects to**: `/dashboard`
- **Register tab**: Button linking to `/registrera-forening` (full form)

### Registration: `/registrera-forening`
- **Type**: Single detailed form with hCaptcha
- **Success redirects to**: `/forening-logga-in` (login tab)

### Registration Fields (Detailed)
- Organization name *
- Organization number * (XXXXXX-XXXX format)
- Email *
- Password *
- Contact person *
- Phone (optional)
- City *
- Address (optional)
- Website (optional)
- Description (optional)
- GDPR consent *
- hCaptcha verification *

### Post-Login Destination
- **Dashboard**: `/dashboard`
- **Features**: Manage projects, view contacts, analytics

### Protected Routes
All redirect to `/forening-logga-in` if not authenticated:
- `/dashboard`
- `/lagg-till-projekt` (add project)

---

## 🔄 Navigation Flow Summary

```
Homepage (/)
├── Hitta projekt → /matcha-projekt (public)
├── Publicera projekt → /dashboard → /forening-logga-in (if not auth)
└── Alla projekt → /alla-projekt (public)

General Login (/logga-in)
├── Företag → /foretag-logga-in (shows LOGIN tab) ✅
└── Förening → /forening-logga-in (shows LOGIN tab) ✅

General Registration (/registrera)
├── Företag → /foretag-logga-in?tab=register (shows REGISTER tab) ✅
└── Förening → /forening-logga-in?tab=register (shows REGISTER tab) ✅
    └── Register button → /registrera-forening (full form)
```

---

## ✅ Consistency Rules

1. **Toggle tabs** default based on context:
   - From `/logga-in` → Shows **Login** tab
   - From `/registrera` → Shows **Registrera** tab (via `?tab=register`)
2. **URL parameter `?tab=register`** forces register tab to show
3. **Company** uses simple inline registration (toggle page)
4. **Förening** uses detailed separate form (security + verification)
5. **Dashboard redirects**:
   - Company dashboard → `/foretag-logga-in` (login tab)
   - Förening dashboard → `/forening-logga-in` (login tab)
6. **Success flows**:
   - Company: Shows success → Auto-switch to login tab
   - Förening: Shows success → Link to `/forening-logga-in` (login tab)
7. **No circular redirects**: All auth checks redirect to specific login pages

---

## 📋 Page Inventory

### Company Pages
- `/foretag-logga-in` - Login/Register toggle
- `/foretag-dashboard` - Company dashboard (protected)
- `/foretag-matningsfragor` - Goals assessment (protected)
- `/foretag-matningsfragor/resultat` - Assessment results (protected)

### Förening Pages
- `/forening-logga-in` - Login/Register toggle (NEW)
- `/registrera-forening` - Full registration form
- `/dashboard` - Förening dashboard (protected)
- `/lagg-till-projekt` - Add project (protected)

### Shared Pages
- `/` - Homepage (public)
- `/registrera` - Choose user type (public)
- `/logga-in` - Choose user type (public)
- `/alla-projekt` - Browse projects (public)
- `/matcha-projekt` - Project matching (public)

---

## 🎯 User Journey Examples

### Example 1: New Company Wants to Support Projects
1. Visit homepage
2. Click "Hitta projekt"
3. Browse projects (no account needed)
4. Click "Kontakta" on a project
5. Prompted to login → Redirected to `/foretag-logga-in`
6. Switch to "Registrera" tab (default)
7. Fill simple form
8. Success → Auto-switched to login tab
9. Login → Redirected to `/foretag-dashboard`

### Example 2: New Förening Wants to List Projects
1. Visit homepage
2. Click "Publicera projekt"
3. Redirected to `/forening-logga-in` (not authenticated)
4. See "Registrera" tab (default)
5. Click "Gå till registreringsformulär"
6. Fill detailed form at `/registrera-forening`
7. Success → Click "Logga in nu" → `/forening-logga-in`
8. Login → Redirected to `/dashboard`

### Example 3: Returning User Login
**Company**:
- Go to `/logga-in` → Choose "Företag" → `/foretag-logga-in`
- Click "Logga in" tab
- Enter credentials → `/foretag-dashboard`

**Förening**:
- Go to `/logga-in` → Choose "Förening" → `/forening-logga-in`
- Click "Logga in" tab
- Enter credentials → `/dashboard`

---

## 🔧 Technical Details

### Authentication Method
- **Supabase Auth** for both user types
- Email/password authentication
- Email verification disabled for testing (auto-verified)

### Database Tables
- `companies` - Company accounts (linked to `auth.users`)
- `organizations` - Förening accounts (linked to `auth.users`)

### Session Checking
- Client-side: `supabase.auth.getSession()`
- Redirects happen in `useEffect` on page load
- No middleware (client-side routing)

---

## 🚨 Important Notes

1. **Do NOT** link directly to `/dashboard` for public users
   - Always use `/forening-logga-in` instead
2. **Do NOT** link directly to `/foretag-dashboard` for public users
   - Always use `/foretag-logga-in` instead
3. **Toggle tabs** should always default to Register for new user acquisition
4. **hCaptcha** only used for förening registration (fraud prevention)
5. **GDPR consent** required for both user types

---

## 📝 Future Improvements

- [ ] Add "Forgot Password" flow
- [ ] Add email verification option
- [ ] Add social login (Google, Microsoft)
- [ ] Add 2FA for company accounts
- [ ] Add organization verification workflow
- [ ] Add magic link login option
