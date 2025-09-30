# KollektivlyCSR - Comprehensive Security Analysis

**Analysis Date**: 2025-09-30
**Platform**: KollektivlyCSR (CSR Project Platform)
**Status**: Demo MVP (100%) → Planning Functional MVP

---

## Executive Summary

This security analysis evaluates the current Demo MVP and provides requirements for future phases. The current static demo has minimal security risks, but planned backend implementation requires robust security architecture.

**Key Findings**:
- ✅ **Current Demo MVP**: Low risk (7.5/10 security score)
- ⚠️ **Phase 1 (Functional MVP)**: Critical security implementation required (target: 9.0/10)
- 🔴 **Phase 3 (Revenue MVP)**: High-risk payment processing requires PCI-DSS compliance (target: 9.5/10)

---

## Table of Contents

1. [Current Demo MVP Security Analysis](#1-current-demo-mvp-security-analysis)
2. [Technical Operations & Infrastructure Security](#2-technical-operations--infrastructure-security)
3. [Security & Compliance Framework](#3-security--compliance-framework)
4. [Application Security (AppSec)](#4-application-security-appsec)
5. [Legal & Governance](#5-legal--governance)
6. [Phase-by-Phase Security Roadmap](#6-phase-by-phase-security-roadmap)
7. [Security Checklist](#7-security-checklist)

---

## 1. Current Demo MVP Security Analysis

### 1.1 Architecture Overview

**Current Stack**:
- Next.js 14.2.33 (Static frontend)
- React 18.x, TypeScript
- Vercel (Hosting with auto-deploy)
- No database, no authentication, no user input

**Security Score**: ✅ **7.5/10** (Low risk for static demo)

### 1.2 Identified Vulnerabilities

#### 🟡 MEDIUM SEVERITY

**1. Missing Content Security Policy (CSP)**
- **Location**: `next.config.mjs`
- **Risk**: No protection against XSS, clickjacking
- **Fix**: Add security headers

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' https://images.unsplash.com; script-src 'self' 'unsafe-eval' 'unsafe-inline';" },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }];
  },
  poweredByHeader: false
};
```

**2. Unsanitized Image URLs**
- **Location**: `ProjectCard.tsx:46`
- **Risk**: Potential XSS if data source compromised
- **Fix**: Use Next.js Image component with domain whitelist

**3. No Dependency Scanning**
- **Risk**: Outdated dependencies with known vulnerabilities
- **Fix**: Run `npm audit` and enable Dependabot

#### 🟢 LOW SEVERITY

- No rate limiting (Vercel provides infrastructure-level protection)
- No monitoring/logging (implement in Phase 1)

### 1.3 Immediate Actions (1 hour)

```bash
# 1. Run security audit
npm audit
npm audit fix

# 2. Update next.config.mjs with security headers (see above)

# 3. Enable Vercel security features
# - DDoS Protection (automatic)
# - HTTPS-only (automatic)
# - Enable GitHub Dependabot in repo settings
```

---

## 2. Technical Operations & Infrastructure Security

### 2.1 Scalability & Cloud Architecture

#### EU/EEA Data Residency (GDPR Requirement)

**Phase 1 Requirements**:
```typescript
// Database must be hosted in EU/EEA
const DATABASE_CONFIG = {
  provider: 'postgresql',
  region: 'eu-central-1', // Frankfurt or Stockholm
  ssl: true,
  encryption: 'AES-256'
};

// Recommended providers with EU regions
// - Neon (Frankfurt)
// - Supabase (Frankfurt)
// - AWS RDS (Stockholm)
// - DigitalOcean (Frankfurt)
```

**Infrastructure Checklist**:
- [ ] Database hosted in EU/EEA
- [ ] CDN configured with EU edge locations
- [ ] Backups stored in EU region
- [ ] Log storage in EU/EEA
- [ ] Email service with EU data centers (Resend EU)

#### Scalability Architecture

**Auto-Scaling Strategy**:
```javascript
// Vercel handles auto-scaling for frontend/API routes
// Database connection pooling for high traffic
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_POOLED // Use connection pooler
    }
  }
});

// Redis for caching (Upstash with EU region)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL, // EU region
  automaticDeserialization: false
});
```

**Performance Targets**:
- API response time: < 200ms (p95)
- Page load time: < 2s (p95)
- Database query time: < 50ms (p95)
- Concurrent users: 10,000+ (Phase 3)

### 2.2 API Management & Performance

#### External API Integrations

**Verification APIs** (Phase 1-3):
```typescript
// 1. Bolagsverket API (Organization verification)
const verifyOrgNumber = async (orgNr: string) => {
  const response = await fetch('https://bolagsverket.se/api/v1/organization', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.BOLAGSVERKET_API_KEY}` },
    body: JSON.stringify({ orgNumber: orgNr })
  });
  // Rate limit: 100 requests/minute
  // Cache results for 24 hours
};

// 2. RF (Riksförbund) API - Phase 3
// 3. Sanctions screening API (ComplyAdvantage) - Phase 3
// 4. Email verification API (Phase 1)
```

**API Security Requirements**:
- [ ] API keys stored in environment variables
- [ ] Rate limiting on all endpoints (10-100 req/min)
- [ ] Request/response logging for audit
- [ ] Retry logic with exponential backoff
- [ ] Circuit breaker for failing APIs
- [ ] API response caching (Redis)

#### Search & AI Matching Performance

**Phase 2 Requirements**:
```typescript
// Search optimization with Postgres full-text search
const searchProjects = async (query: string) => {
  return await prisma.$queryRaw`
    SELECT * FROM projects
    WHERE to_tsvector('swedish', title || ' ' || description)
    @@ plainto_tsquery('swedish', ${query})
    AND is_published = true
    ORDER BY ts_rank(to_tsvector('swedish', title || ' ' || description),
                     plainto_tsquery('swedish', ${query})) DESC
    LIMIT 50
  `;
};

// Redis caching for popular searches
const getCachedSearch = async (query: string) => {
  const cached = await redis.get(`search:${query}`);
  if (cached) return JSON.parse(cached);

  const results = await searchProjects(query);
  await redis.setex(`search:${query}`, 3600, JSON.stringify(results)); // 1 hour TTL
  return results;
};
```

**AI Matching** (Phase 2-3):
- Use OpenAI API or local model for CSR goal matching
- Cache AI results for identical queries
- Rate limit: 10 AI requests per user per hour
- Log all AI interactions for audit

### 2.3 Deployment & Monitoring

#### CI/CD Security (Phase 1)

**GitHub Actions Workflow**:
```yaml
# .github/workflows/security.yml
name: Security Checks
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run npm audit
        run: npm audit --audit-level=moderate
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      - name: TypeScript type check
        run: npx tsc --noEmit
      - name: Run tests
        run: npm test
```

**Deployment Checklist**:
- [ ] All tests pass before deploy
- [ ] Security scan passes (npm audit, Snyk)
- [ ] Environment variables validated
- [ ] Preview deployment requires authentication
- [ ] Production deploys require approval
- [ ] Automated rollback on errors

#### System Monitoring (Phase 1)

**Required Monitoring**:
```typescript
// 1. Error Tracking (Sentry)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Remove sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.authorization;
    }
    return event;
  }
});

// 2. Uptime Monitoring
// - Use UptimeRobot or Better Uptime
// - Monitor: /, /api/health, /api/projects
// - Alert if downtime > 1 minute

// 3. Performance Monitoring (Vercel Analytics)
// - Web Vitals (LCP, FID, CLS)
// - API response times
// - Database query performance

// 4. Security Event Monitoring
const logSecurityEvent = async (event: SecurityEvent) => {
  await prisma.securityLog.create({
    data: {
      type: event.type,
      severity: event.severity,
      userId: event.userId,
      ipAddress: event.ipAddress,
      details: event.details,
      timestamp: new Date()
    }
  });

  // Alert on critical events
  if (event.severity === 'CRITICAL') {
    await sendAlertToSlack(event);
  }
};
```

**Alert Triggers**:
- Failed login attempts > 5 per IP in 5 minutes
- Database connection failures
- API error rate > 5%
- Payment processing failures
- Suspicious data access patterns
- Abnormal traffic spikes

---

## 3. Security & Compliance Framework

### 3.1 GDPR & Data Privacy

#### Core GDPR Requirements

**Data Residency**: All personal data stored in EU/EEA
**Legal Basis**: Contract, Consent, Legitimate Interest
**Retention**: Account lifetime + 30 days after deletion

**Data Processing Inventory**:
| Data Type | Legal Basis | Retention | Location | Processor |
|-----------|-------------|-----------|----------|-----------|
| Email, org name | Contract | Account lifetime | EU | Vercel, DB provider |
| Session tokens | Contract | 7 days | EU | Vercel |
| Payment metadata | Legal obligation | 7 years | EU | Stripe (DPA signed) |
| Analytics | Consent | 90 days | EU | Plausible/Fathom |
| Audit logs | Legal obligation | 1 year | EU | DB provider |

#### GDPR Implementation (Phase 1)

**1. Data Subject Rights**:
```typescript
// Right to Access (Article 15)
export async function GET(req: Request) {
  const userId = await authenticate(req);
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    include: { organization: true, projects: true, messages: true }
  });
  return Response.json(userData);
}

// Right to Erasure (Article 17)
export async function DELETE(req: Request) {
  const userId = await authenticate(req);

  // Soft delete (30-day grace period)
  await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      email: `deleted-${userId}@deleted.com`,
      // Anonymize all personal data
    }
  });

  // Schedule hard delete after 30 days
  await scheduleHardDelete(userId, 30);
}

// Right to Data Portability (Article 20)
export async function exportUserData(userId: string) {
  const data = await fetchAllUserData(userId);
  return {
    format: 'application/json',
    data: data,
    schema: 'https://kollektivly.com/schema/user-data-v1.json'
  };
}
```

**2. Cookie Consent** (Phase 1):
```typescript
// Cookie categories
interface CookieConsent {
  necessary: boolean;   // Always true (no consent needed)
  functional: boolean;  // Remember preferences
  analytics: boolean;   // Usage tracking
  marketing: boolean;   // Future use
}

// Store consent in database
const saveConsent = async (userId: string, consent: CookieConsent) => {
  await prisma.cookieConsent.create({
    data: {
      userId,
      ...consent,
      consentedAt: new Date(),
      ipAddress: getClientIp() // Proof of consent
    }
  });
};
```

**3. Privacy Policy** (Phase 1):
- Must be published before collecting any data
- Clear explanation of data processing
- Contact info for Data Protection Officer (DPO)
- Link to IMY (Swedish Data Protection Authority)

**4. Data Processing Agreements (DPA)**:
Required with:
- [ ] Vercel (hosting)
- [ ] Database provider (Neon/Supabase)
- [ ] Email service (Resend)
- [ ] Payment processor (Stripe)
- [ ] File storage (Vercel Blob/S3)
- [ ] Analytics (Plausible/Fathom)

#### GDPR Compliance Checklist

- [ ] All data stored in EU/EEA
- [ ] Privacy policy published
- [ ] Cookie consent banner implemented
- [ ] Data export functionality (Article 15)
- [ ] Account deletion functionality (Article 17)
- [ ] Data rectification (profile editing)
- [ ] Data retention policy enforced
- [ ] DPAs signed with all processors
- [ ] Records of Processing Activities (ROPA) maintained
- [ ] Data breach notification procedure (72 hours to IMY)
- [ ] DPO appointed (if > 250 employees or high-risk processing)

### 3.2 Payment Security (PCI-DSS)

#### PCI-DSS Compliance Strategy (Phase 3)

**SAQ-A Compliance** (Simplest level):
- **NEVER** store card numbers, CVV, or PINs
- Use Stripe Elements (client-side card input)
- Stripe handles all card data (PCI-DSS Level 1 certified)

**Implementation**:
```typescript
// CLIENT-SIDE: Stripe Elements (no card data touches your server)
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// SERVER-SIDE: Create payment intent
export async function POST(req: Request) {
  const { amount, organizationId } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // SEK to öre
    currency: 'sek',
    automatic_payment_methods: { enabled: true },
    metadata: { organizationId }
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}

// Webhook for payment confirmation
export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'payment_intent.succeeded') {
    await handleSuccessfulPayment(event.data.object);
  }

  return Response.json({ received: true });
}
```

**PCI-DSS Requirements**:
- [ ] Use Stripe Elements for card input (SAQ-A)
- [ ] HTTPS enforced everywhere (HSTS)
- [ ] No card data logged or stored
- [ ] Webhook signature verification
- [ ] Strong access controls for Stripe dashboard
- [ ] Regular security updates
- [ ] Quarterly vulnerability scans
- [ ] Annual Stripe compliance review

**Transaction Security**:
```typescript
// Fraud detection (Stripe Radar)
const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency: 'sek',
  radar_options: { session: sessionId } // Enable fraud detection
});

// Log all transactions
await prisma.transaction.create({
  data: {
    stripePaymentId: paymentIntent.id,
    amount,
    status: paymentIntent.status,
    organizationId,
    riskLevel: paymentIntent.charges.data[0]?.outcome?.risk_level,
    createdAt: new Date()
  }
});
```

### 3.3 AML/KYC Automation

#### Know Your Customer (KYC) - Phase 3

**Level 1: Email Verification** (Phase 1)
```typescript
const verifyEmail = async (email: string) => {
  const token = crypto.randomBytes(32).toString('hex');
  await sendVerificationEmail(email, token);
  // Store hashed token with 24-hour expiration
};
```

**Level 2: Org.nr Verification** (Phase 1)
```typescript
// Bolagsverket API integration
const verifyOrganization = async (orgNr: string) => {
  const response = await fetch(`https://bolagsverket.se/api/v1/${orgNr}`);
  const data = await response.json();

  return {
    verified: data.status === 'active',
    legalName: data.name,
    registrationDate: data.registrationDate,
    address: data.address
  };
};
```

**Level 3: RF/Municipality Verification** (Phase 3)
- Manual review + API verification
- Check membership in Riksförbund
- Verify municipality registration

**Level 4: Enhanced Due Diligence** (Phase 3)
- Manual document review
- Financial statement analysis
- Background checks on organization representatives
- Required for high-value transactions (> 100,000 SEK)

#### Anti-Money Laundering (AML) - Phase 3

**Sanctions Screening**:
```typescript
// Screen against OFAC, EU sanctions lists
const screenOrganization = async (org: Organization) => {
  const response = await fetch('https://api.complyadvantage.com/searches', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.COMPLY_ADVANTAGE_KEY}` },
    body: JSON.stringify({
      search_term: org.legalName,
      search_profile: 'sanctions',
      fuzziness: 0.5
    })
  });

  const results = await response.json();

  if (results.total_hits > 0) {
    // Flag for manual review
    await flagForAMLReview(org.id, results);
    return { approved: false, reason: 'Sanctions match found' };
  }

  return { approved: true };
};
```

**Transaction Monitoring**:
```typescript
// Monitor for suspicious patterns
const monitorTransaction = async (tx: Transaction) => {
  const rules = [
    // Rule 1: High-value transaction (> 50,000 SEK)
    tx.amount > 50000,

    // Rule 2: Rapid succession of transactions
    await hasRecentTransactions(tx.organizationId, 5, 24), // 5 in 24 hours

    // Rule 3: First transaction is high value
    await isFirstTransaction(tx.organizationId) && tx.amount > 10000,

    // Rule 4: Geographic risk (future)
    await isHighRiskCountry(tx.organizationId)
  ];

  if (rules.some(rule => rule === true)) {
    await flagForAMLReview(tx.id);
  }
};
```

**AML Reporting**:
- Report suspicious transactions to Finanspolisen
- Maintain transaction records for 5 years (Swedish law)
- Annual AML policy review

#### KYC/AML Checklist

- [ ] Email verification (Level 1)
- [ ] Org.nr verification via Bolagsverket (Level 2)
- [ ] RF/Municipality verification (Level 3)
- [ ] Enhanced due diligence workflow (Level 4)
- [ ] Sanctions screening integration
- [ ] Transaction monitoring rules
- [ ] AML reporting procedure
- [ ] 5-year record retention
- [ ] Annual AML audit

### 3.4 Application Security (AppSec)

#### Authentication & Authorization (Phase 1)

**Magic Link Authentication**:
```typescript
// Generate secure token
const generateMagicLink = async (email: string) => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  await prisma.authToken.create({
    data: {
      token: hashedToken,
      email,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      used: false
    }
  });

  const magicLink = `https://kollektivly.com/auth/verify?token=${token}`;
  await sendEmail(email, magicLink);
};

// Verify token (one-time use)
const verifyToken = async (token: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const record = await prisma.authToken.findUnique({ where: { token: hashedToken } });

  if (!record || record.used || record.expiresAt < new Date()) {
    throw new Error('Invalid or expired token');
  }

  await prisma.authToken.update({
    where: { id: record.id },
    data: { used: true }
  });

  return record.email;
};
```

**Session Management**:
```typescript
// Create secure session (httpOnly cookie)
const createSession = async (userId: string, res: Response) => {
  const sessionToken = crypto.randomBytes(32).toString('hex');

  await prisma.session.create({
    data: {
      token: sessionToken,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  });

  res.headers.set('Set-Cookie',
    `session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800; Path=/`
  );
};
```

**Role-Based Access Control (RBAC)**:
```typescript
enum UserRole {
  ORG_ADMIN = 'ORG_ADMIN',        // Manage own projects
  PLATFORM_ADMIN = 'PLATFORM_ADMIN', // Approve projects
  COMPANY_USER = 'COMPANY_USER'      // View & contact
}

// Authorization middleware
const requireRole = (allowedRoles: UserRole[]) => {
  return async (req: Request) => {
    const user = await authenticate(req);
    if (!allowedRoles.includes(user.role)) {
      throw new Error('Forbidden');
    }
    return user;
  };
};
```

**Multi-Factor Authentication (MFA)** - Phase 3:
```typescript
// TOTP-based MFA for admin accounts
import * as speakeasy from 'speakeasy';

const enableMFA = async (userId: string) => {
  const secret = speakeasy.generateSecret();

  await prisma.user.update({
    where: { id: userId },
    data: { mfaSecret: secret.base32, mfaEnabled: true }
  });

  return secret.otpauth_url; // Generate QR code
};

const verifyMFA = (token: string, secret: string) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1
  });
};
```

#### Input Validation & Sanitization

**Zod Schema Validation**:
```typescript
import { z } from 'zod';

const createProjectSchema = z.object({
  title: z.string().min(3).max(200).trim(),
  description: z.string().min(50).max(5000).trim(),
  budget: z.string().regex(/^\d+\s*kr$/),
  category: z.enum(['Miljö', 'Ungdom', 'Inkludering']),
  imageUrl: z.string().url().optional(),
  fnMal: z.array(z.string()).min(1).max(5)
});

// API route with validation
export async function POST(req: Request) {
  const body = await req.json();
  const validated = createProjectSchema.parse(body); // Throws if invalid

  // Sanitize HTML content
  const sanitizedDescription = DOMPurify.sanitize(validated.description, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });

  // Create project with sanitized data
  const project = await prisma.project.create({
    data: { ...validated, description: sanitizedDescription }
  });

  return Response.json(project);
}
```

#### Rate Limiting (Phase 1)

```typescript
// Upstash Redis rate limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

// Apply to API routes
const identifier = req.headers.get('x-forwarded-for') ?? 'anonymous';
const { success } = await ratelimit.limit(identifier);

if (!success) {
  return new Response('Too many requests', { status: 429 });
}
```

**Rate Limit Configuration**:
- Magic link requests: 3 per email per hour
- Login attempts: 5 per IP per 15 minutes
- API requests: 100 per IP per minute
- Search queries: 20 per user per minute
- File uploads: 5 per user per hour
- Payment processing: 10 per organization per day

#### Penetration Testing (Pentesting)

**Phase 1**: Internal security review + automated scanning
**Phase 3**: Professional penetration test (before payment launch)

**Automated Security Scanning**:
```bash
# Weekly automated scans
npm audit                    # Dependency vulnerabilities
npx snyk test               # Snyk vulnerability scan
npx eslint-plugin-security  # Code security linting

# OWASP ZAP for web vulnerability scanning
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://kollektivly.com
```

**Penetration Test Scope** (Phase 3):
- [ ] Authentication & session management
- [ ] Authorization & access control
- [ ] Payment processing flow
- [ ] File upload functionality
- [ ] API security
- [ ] Database injection attacks
- [ ] XSS vulnerabilities
- [ ] CSRF protection
- [ ] Business logic flaws

**Expected Cost**: 25,000-50,000 SEK (Phase 3)

#### Security Incident Response

**Severity Levels**:
- **P0 (Critical)**: Data breach, payment system down → Immediate response
- **P1 (High)**: Authentication failure, API down → < 1 hour
- **P2 (Medium)**: Performance issues → < 4 hours
- **P3 (Low)**: UI bugs → < 24 hours

**Data Breach Procedure**:
1. Contain breach immediately
2. Assess scope and impact
3. Notify IMY within 72 hours: dataskydd@imy.se
4. Notify affected users (if high risk)
5. Document incident thoroughly
6. Implement preventive measures

**Security Contacts**:
- Internal: security@kollektivly.com
- IMY (Swedish DPA): dataskydd@imy.se
- CERT-SE: cert@cert.se
- Police Cybercrime: cyberbrottscentrum@polisen.se

---

## 4. Application Security (AppSec)

### 4.1 OWASP Top 10 Protection

| Vulnerability | Protection Measure | Implementation |
|---------------|-------------------|----------------|
| **A01: Broken Access Control** | RBAC, authorization checks | Phase 1 |
| **A02: Cryptographic Failures** | TLS 1.3, database encryption | Phase 1 |
| **A03: Injection** | Parameterized queries (Prisma), input validation | Phase 1 |
| **A04: Insecure Design** | Security requirements in design phase | Ongoing |
| **A05: Security Misconfiguration** | Security headers, hardened configs | Phase 1 |
| **A06: Vulnerable Components** | npm audit, Dependabot, Snyk | Phase 1 |
| **A07: Auth Failures** | Magic links, MFA (Phase 3), rate limiting | Phase 1/3 |
| **A08: Data Integrity Failures** | Code signing, SRI for CDN resources | Phase 1 |
| **A09: Logging Failures** | Comprehensive audit logs, Sentry | Phase 1 |
| **A10: SSRF** | Validate all URLs, whitelist domains | Phase 1 |

### 4.2 Secure Development Lifecycle

**Phase 1**:
1. Threat modeling before implementation
2. Security code review before merge
3. Automated security testing (CI/CD)
4. Manual penetration testing (external)

**Phase 3**:
1. Professional penetration test
2. PCI-DSS compliance audit
3. GDPR compliance review
4. AML policy review

---

## 5. Legal & Governance

### 5.1 Terms of Service (ToS)

**Kollektivly's Role**: Facilitator/intermediary platform

**Key ToS Clauses** (Phase 1):
```
1. Platform Role
   - Kollektivly facilitates connections between companies and organizations
   - We do NOT verify project outcomes or guarantee results
   - Organizations are solely responsible for project delivery

2. Liability Limitations
   - No liability for project failures or disputes
   - No guarantees on verification accuracy
   - Force majeure clause

3. User Responsibilities
   - Organizations: Accurate project information, timely updates
   - Companies: Due diligence before supporting projects
   - Both: Compliance with Swedish law

4. Payment Terms (Phase 3)
   - All payments processed via Stripe
   - Transaction fees clearly disclosed
   - Refund policy (case-by-case basis)

5. Data Protection
   - GDPR compliance (see Privacy Policy)
   - Right to access, rectification, erasure
   - Data retention periods

6. Intellectual Property
   - Users retain ownership of content
   - Kollektivly has license to display content on platform

7. Dispute Resolution
   - Swedish law applies
   - Stockholm District Court has jurisdiction
   - Mediation before litigation

8. Service Modifications
   - Right to modify/terminate service with 30 days notice
   - No refunds for unused subscription periods

9. Prohibited Activities
   - No fraudulent projects
   - No money laundering
   - No misrepresentation

10. Account Termination
    - Immediate termination for ToS violations
    - 30-day notice for account deletion
```

### 5.2 Privacy Policy

**Required Sections** (GDPR Article 13):
1. Data controller identity
2. Data Protection Officer (DPO) contact
3. Purpose of data processing
4. Legal basis for processing
5. Data recipients (processors)
6. Data retention periods
7. Data subject rights
8. Right to lodge complaint with IMY
9. International data transfers (if any)
10. Automated decision-making (if any)

### 5.3 Organization Verification Disclaimer

**Verification Levels Disclosure**:
```
Level 1 (Email Verified):
- Email address has been confirmed
- No additional verification performed
- Use with caution

Level 2 (Org.nr Verified):
- Organization registered with Bolagsverket
- Legal name and registration verified
- Does not guarantee project legitimacy

Level 3 (RF/Municipality Verified):
- Member of recognized federation OR
- Registered with Swedish municipality
- Higher credibility, not absolute guarantee

Level 4 (Enhanced Due Diligence):
- Manual review by Kollektivly team
- Financial statements reviewed
- Background checks performed
- Highest credibility level

DISCLAIMER: Kollektivly performs verification as an intermediary
service. We do not guarantee project outcomes or organization
conduct. Users are responsible for their own due diligence.
```

### 5.4 Liability & Insurance

**Recommended Insurance** (Phase 3):
1. **Cyber Liability Insurance**: 5-10 million SEK coverage
   - Data breach costs
   - Business interruption
   - Regulatory fines
   - Legal defense costs

2. **Professional Indemnity Insurance**: 2-5 million SEK
   - Errors & omissions
   - Negligence claims
   - Professional liability

3. **General Liability Insurance**: 2 million SEK
   - Third-party injuries
   - Property damage

**Estimated Cost**: 30,000-60,000 SEK/year (Phase 3)

### 5.5 Regulatory Compliance

**Swedish Laws**:
- **GDPR** (EU 2016/679): Data protection
- **Lag om betalningar** (2010:751): Payment services
- **Penningtvättslagen** (2017:630): Anti-money laundering
- **Bokföringslagen**: Financial record keeping (7 years)
- **Marknadsföringslagen**: Marketing regulations

**EU Regulations**:
- **PSD2**: Payment Services Directive
- **CSRD**: Corporate Sustainability Reporting Directive (future)
- **Taxonomy Regulation**: ESG classification

### 5.6 Governance Checklist

- [ ] Terms of Service published (before Phase 1 launch)
- [ ] Privacy Policy published (before Phase 1 launch)
- [ ] Cookie Policy published
- [ ] Verification disclaimer visible
- [ ] Contact information for legal queries
- [ ] DPA templates for processors
- [ ] Data breach notification procedure
- [ ] Regular legal review (quarterly)
- [ ] Insurance coverage (Phase 3)
- [ ] Compliance audit (annual)

---

## 6. Phase-by-Phase Security Roadmap

### Phase 0: Demo MVP (Current) - Week 0
**Status**: ✅ **COMPLETE** | **Security Score**: 7.5/10

**Immediate Actions** (1 hour):
- [ ] Add security headers to `next.config.mjs`
- [ ] Run `npm audit && npm audit fix`
- [ ] Enable GitHub Dependabot
- [ ] Deploy security updates to Vercel

---

### Phase 1: Functional MVP - Weeks 1-3
**Target Security Score**: 9.0/10

#### Week 1: Infrastructure
- [ ] Set up PostgreSQL (EU region, SSL enabled)
- [ ] Configure Prisma with security best practices
- [ ] Set up Upstash Redis (EU region) for rate limiting
- [ ] Configure environment variable validation
- [ ] Enable Sentry error monitoring

#### Week 2: Authentication & Authorization
- [ ] Implement magic link authentication
- [ ] Add session management (httpOnly cookies)
- [ ] Implement RBAC (ORG_ADMIN, PLATFORM_ADMIN)
- [ ] Add rate limiting to auth endpoints
- [ ] Configure email service (Resend) with SPF/DKIM

#### Week 3: Data Protection & Compliance
- [ ] Input validation with Zod on all endpoints
- [ ] Secure file upload with validation
- [ ] Audit logging system
- [ ] GDPR: Privacy policy, cookie consent, data export
- [ ] Security testing (internal review + automated scans)

**Deliverables**:
- Secure authentication system
- Database with encryption
- GDPR-compliant data handling
- Comprehensive monitoring

**Budget**:
- Tools: ~100 SEK/month (Upstash, Sentry, Resend)
- Security consultant: 15,000-20,000 SEK (architecture review)

---

### Phase 2: Enhanced MVP - Weeks 4-6
**Target Security Score**: 9.0/10

- [ ] Secure messaging system with sanitization
- [ ] Privacy-respecting analytics (Plausible/Fathom)
- [ ] Advanced cookie consent management
- [ ] Search security (injection prevention)
- [ ] CAPTCHA for public forms

**Budget**: ~150 SEK/month (analytics, additional tools)

---

### Phase 3: Revenue MVP - Weeks 7-10
**Target Security Score**: 9.5/10

#### Week 7-8: Payment Integration
- [ ] Stripe integration (PCI-DSS SAQ-A)
- [ ] Webhook signature verification
- [ ] Fraud detection (Stripe Radar)
- [ ] Transaction logging
- [ ] Subscription management

#### Week 9: KYC/AML Compliance
- [ ] Bolagsverket API integration (Level 2 verification)
- [ ] Sanctions screening API (ComplyAdvantage)
- [ ] Transaction monitoring rules
- [ ] AML reporting workflow

#### Week 10: Security Audit
- [ ] Professional penetration test (external consultant)
- [ ] PCI-DSS compliance verification
- [ ] Fix identified vulnerabilities
- [ ] Final security review before payment launch

**Deliverables**:
- PCI-DSS compliant payment system
- 4-level verification system
- AML/KYC automation
- Professional security audit report

**Budget**:
- Stripe fees: 1.4% + 1.80 SEK per transaction
- Penetration test: 25,000-50,000 SEK
- AML screening: ~500 SEK/month (ComplyAdvantage)
- **Total One-Time**: 40,000-70,000 SEK

---

### Phase 4: International Expansion - Weeks 11-13

- [ ] Multi-language content sanitization
- [ ] Regional database routing (EU/non-EU)
- [ ] Multi-currency payment validation
- [ ] CCPA compliance (if targeting US)
- [ ] Standard Contractual Clauses (SCCs)

**Budget**: Legal consultation 20,000-40,000 SEK

---

### Ongoing Security (Post-Launch)

**Daily**:
- Monitor Sentry alerts
- Review failed auth attempts
- Check system health

**Weekly**:
- Review audit logs
- Dependency updates
- Security incident review

**Monthly**:
- Run npm audit
- Review access logs
- Rotate API keys/secrets
- Security metrics review

**Quarterly**:
- Test backup restoration
- Update incident response plan
- Review third-party processors
- Dependency major version updates

**Annually**:
- Professional penetration test: 30,000-50,000 SEK
- GDPR compliance audit: 20,000-30,000 SEK
- Legal review (ToS, Privacy Policy): 15,000-25,000 SEK
- Insurance renewal: 30,000-60,000 SEK

**Total Annual Security Budget**: 95,000-165,000 SEK/year

---

## 7. Security Checklist

### Pre-Launch (Phase 1)

#### Infrastructure ✅
- [ ] HTTPS enforced (TLS 1.3)
- [ ] HSTS header configured
- [ ] Security headers (CSP, X-Frame-Options, etc.)
- [ ] Database hosted in EU/EEA
- [ ] Database encryption (at rest + in transit)
- [ ] Rate limiting implemented
- [ ] CDN configured with security rules

#### Authentication & Authorization 🔒
- [ ] Magic link authentication tested
- [ ] Session management secure (httpOnly cookies)
- [ ] RBAC implemented
- [ ] Rate limiting on auth endpoints (3 magic links/hour)
- [ ] Account lockout after failed attempts

#### Data Protection 🛡️
- [ ] Input validation on all endpoints (Zod)
- [ ] Output encoding (XSS prevention)
- [ ] SQL injection prevention (Prisma ORM)
- [ ] CSRF protection
- [ ] Secure file upload (validation + malware scanning)
- [ ] Sensitive data encrypted

#### GDPR Compliance ⚖️
- [ ] Privacy policy published
- [ ] Cookie consent implemented
- [ ] Data export functionality (Article 15)
- [ ] Account deletion functionality (Article 17)
- [ ] DPAs signed with processors
- [ ] Data retention policy enforced
- [ ] Breach notification procedure documented

#### Monitoring & Logging 📊
- [ ] Error monitoring (Sentry)
- [ ] Audit logging for sensitive operations
- [ ] Uptime monitoring configured
- [ ] Security alerts configured
- [ ] Log retention policy (1 year)

#### Testing 🧪
- [ ] Security code review completed
- [ ] npm audit passed
- [ ] OWASP Top 10 tested
- [ ] Authentication flows tested
- [ ] Authorization tested
- [ ] Rate limiting tested

---

### Pre-Launch (Phase 3 - Payments)

#### Payment Security 💳
- [ ] Stripe integration (PCI-DSS SAQ-A)
- [ ] No card data stored on servers
- [ ] Webhook signature verification
- [ ] Fraud detection enabled (Stripe Radar)
- [ ] Transaction logging
- [ ] 3D Secure (SCA) enabled

#### KYC/AML Compliance 🔍
- [ ] Level 1-4 verification system implemented
- [ ] Bolagsverket API integration tested
- [ ] Sanctions screening configured
- [ ] Transaction monitoring rules active
- [ ] AML reporting procedure documented

#### Professional Review 🎯
- [ ] Penetration test completed
- [ ] PCI-DSS compliance verified
- [ ] All critical vulnerabilities fixed
- [ ] Security audit report reviewed
- [ ] Legal review completed (ToS, liability)

---

## Summary & Key Recommendations

### Current Status: Demo MVP
**Security Score**: 7.5/10
**Risk Level**: Low (static frontend)

**Immediate Actions** (1 hour):
1. Add security headers to `next.config.mjs`
2. Run `npm audit` and fix vulnerabilities
3. Enable Dependabot

---

### Phase 1: Functional MVP (CRITICAL)
**Target Score**: 9.0/10
**Timeline**: 3 weeks
**Budget**: ~15,000-20,000 SEK (one-time) + 100 SEK/month

**Critical Requirements**:
1. ✅ EU/EEA data residency (GDPR)
2. ✅ Secure authentication (magic links)
3. ✅ Database encryption (SSL/TLS + at-rest)
4. ✅ Input validation (Zod)
5. ✅ Rate limiting (Upstash Redis)
6. ✅ GDPR compliance (privacy policy, data rights)
7. ✅ Monitoring (Sentry, audit logs)

**Cannot launch without**: GDPR compliance, secure authentication, database encryption

---

### Phase 3: Revenue MVP (HIGH RISK)
**Target Score**: 9.5/10
**Timeline**: 4 weeks
**Budget**: 40,000-70,000 SEK (one-time) + 500 SEK/month

**Critical Requirements**:
1. ✅ PCI-DSS compliance (Stripe, SAQ-A)
2. ✅ KYC/AML automation (Bolagsverket + sanctions screening)
3. ✅ Professional penetration test (external)
4. ✅ 4-level verification system
5. ✅ Fraud detection (Stripe Radar)

**Cannot launch without**: PCI-DSS compliance, penetration test, KYC/AML procedures

---

### Annual Ongoing Costs

| Category | Cost (SEK/year) |
|----------|----------------|
| **Tools & Services** | 18,000 |
| **Penetration Testing** | 40,000 |
| **Compliance Audits** | 25,000 |
| **Legal Review** | 20,000 |
| **Insurance** | 45,000 |
| **TOTAL** | **148,000** |

---

### Key Takeaways

1. **Current demo is safe** ✅ (low risk, static frontend)

2. **Phase 1 requires immediate security investment** 🚨
   - GDPR compliance is mandatory (not optional)
   - Secure authentication is critical
   - Budget 3 weeks + 20,000 SEK

3. **Phase 3 requires professional security review** 🔐
   - Payment processing is high-risk
   - Penetration test is mandatory
   - Budget 4 weeks + 70,000 SEK

4. **GDPR compliance is non-negotiable** ⚖️
   - Must be implemented from Phase 1
   - Fines up to 4% of revenue for non-compliance
   - EU/EEA data residency required

5. **Security is an ongoing process** 🔄
   - Budget 150,000 SEK/year for security
   - Regular audits, updates, monitoring
   - Stay informed about emerging threats

---

**Recommendation**: Hire a security consultant for Phase 1 architecture review (15,000-20,000 SEK) to ensure proper foundation before development starts.

**Next Steps**:
1. Implement Phase 0 immediate actions (1 hour)
2. Consult security expert before Phase 1 development
3. Budget for penetration test before Phase 3 launch

---

**Document Version**: 1.0
**Last Updated**: 2025-09-30
**Next Review**: Before Phase 1 implementation