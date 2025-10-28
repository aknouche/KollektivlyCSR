# Produktkravsdokument – Kollektivly
**Version:** 2.0
**Senast uppdaterad:** 2025-10-28
**Status:** Fas 3 pågår (Backend komplett, Frontend under utveckling)

---

## 📋 Innehållsförteckning

1. [Vision & Syfte](#vision--syfte)
2. [Målgrupper](#målgrupper)
3. [Affärsmodell](#affärsmodell)
4. [Funktioner & Features](#funktioner--features)
5. [Implementeringsstatus](#implementeringsstatus)
6. [Implementeringsplan](#implementeringsplan)
7. [Teknisk Stack](#teknisk-stack)
8. [Juridik & Compliance](#juridik--compliance)
9. [Konkurrensfördelar](#konkurrensfördelar)
10. [Framtida Utveckling](#framtida-utveckling)

---

## 🎯 Vision & Syfte

### Syfte
En plattform som kopplar samman **ideella organisationer** med **företag** för samhällsnytta och hållbar utveckling. Organisationerna driver projekt och initiativ, företag bidrar med finansiering genom verifierade, säkra betalningar.

### Kärnvärde
**"No Report, No Payment"** – Vi håller grantpengar i escrow och släpper endast utbetalningar när AI verifierat milstolpsrapporter.

### Unique Selling Proposition (USP)

#### Värde för Företag:
✅ **Automatisk matchning** – Hitta organisationer som matchar era hållbarhetsmål (FNs SDG:er, geografi, målgrupper)
✅ **Verifierade organisationer** – Endast välskötta organisationer med godkända stadgar och årsredovisningar
✅ **Trygg betalning** – Escrow-system med automatisk milstolpshantering
✅ **Automatisk återrapportering** – Kräv texter, bilder, sociala medier-poster vid varje utbetalning
✅ **ESG-rapportering** – Allt samlat på ett ställe, färdiga rapporter för CSRD/SDG-rapportering
✅ **Samlad kommunikation** – All kontakt med organisationer på en plattform
✅ **Experthjälp** – Tillgång till rådgivning inom CSR/ESG, varumärke, marknadsföring

**Värdeförslag:** Spara 15 timmar/projekt (motsvarande 3,000+ SEK) + trygghet + compliance-redo

#### Värde för Ideella Organisationer:
✅ **Bli hittade** – Låt företag hitta er automatiskt istället för att jaga sponsring
✅ **Projektfinansiering** – Få stöd för era samhällsprojekt
✅ **Öka synlighet** – Visa er räckvidd och engagemang för potentiella sponsors
✅ **Långsiktiga partnerskap** – Bevisa impact för att få fortsatt stöd
✅ **Enkel rapportering** – Standardiserade mallar och vägledning

**Värdeförslag:** Gratis publicering + automatisk matchning + enkel projektadministration

---

## 👥 Målgrupper

### Primära Kunder (Intäktsfokus)
**Små och Medelstora Företag (SME)**
- Storlek: 10-250 anställda
- Budget: 20,000-500,000 SEK/år för samhällsstöd
- Behov: Enkla, snabba, trygga, automatiserade lösningar för samhällsengagemang
- Pain points: Tidskrävande uppföljning, osäkra organisationer, svår ESG-rapportering

### Projektägare (Tillgångsfokus)
**Ideella Organisationer**
- Typer: Föreningar, stiftelser, trossamfund, ekonomiska föreningar
- Behov: Resurser, trovärdighet, enkel projektpresentation
- Pain points: Svårt att hitta sponsors, komplicerad administration, bristande synlighet

### Sekundära Kunder (Framtida Intäkter)
**Kommuner & Regioner**
- Köper aggregerade rapporter och insikter (50,000-300,000 SEK/år)
- Use case: Beslutsunderlag för sociala investeringar

**Konsultpartners & Investerare**
- Provision (10%) på förmedlade uppdrag där företag behöver fördjupad strategi/implementering

---

## 💰 Affärsmodell

### Intäktsströmmar

#### 1. Transaktionsavgifter (Primär Intäkt – År 1)
Företag betalar **serviceavgift UTÖVER grantbeloppet** (ej avdraget från).

**Prissättning:**
| Tier | Avgift | Inkluderar | Exempel (50K SEK grant) |
|------|--------|------------|-------------------------|
| **Basic** | 4% | Säker betalning + escrow + grundläggande verifiering | 2,000 SEK |
| **Standard** ⭐ | 7% | Basic + AI-verifiering + ESG-rapport | 3,500 SEK |
| **Enhanced** | 10% | Standard + legitimitetskontroll + support | 5,000 SEK |

**Betalningsflöde:**
```
1. Företag förbinder sig: 50,000 SEK grant till organisation
2. Väljer Standard-tier: +3,500 SEK serviceavgift
3. Totalt debiterat: 53,500 SEK
4. Kollektivly får: 3,500 SEK (omedelbart)
5. Escrow: 50,000 SEK (hålls inne)
6. Organisation rapporterar milstolpe 1 → AI verifierar → 25,000 SEK släpps
7. Organisation rapporterar milstolpe 2 → AI verifierar → 25,000 SEK släpps
8. Företag får auto-genererad ESG-rapport
```

**Intäktsprognos (År 1):**
- Target: 50 grants/månad @ 50,000 SEK genomsnitt
- 70% väljer Standard (7%)
- Månadlig intäkt: 122,500 SEK
- Årlig intäkt: **1,470,000 SEK**
- Break-even: 4 grants/månad

#### 2. Mikroboosts (Sekundär Intäkt – År 2)
Organisationer betalar för ökad synlighet:
- **20 SEK** – 7 dagars framhävning på startsidan
- **50 SEK** – 14 dagars topplacering i sökresultat
- **100 SEK** – 30 dagars premium-visning + nyhetsbrev

**Intäktsprognos (År 2):**
- Target: 200 boosts/månad @ 50 SEK genomsnitt
- Månadlig intäkt: 10,000 SEK
- Årlig intäkt: **120,000 SEK**

#### 3. Kommun/Region-licenser (Tertiär Intäkt – År 3)
Årsavgift för aggregerad ESG/impact-data:
- Portföljrapporter (vilka organisationer får mest stöd?)
- Kommunrapporter (geografisk impact-fördelning)
- Trendanalyser (vilka SDG:er prioriteras?)

**Prissättning:** 50,000-300,000 SEK/år beroende på befolkningsstorlek

**Intäktsprognos (År 3):**
- Target: 5 kommuner @ 100,000 SEK genomsnitt
- Årlig intäkt: **500,000 SEK**

#### 4. Konsultpartner-provisioner (Framtida)
- 10% provision på förmedlade uppdrag (CSRD-implementering, marknadsföring, etc.)
- Target: 10 förmedlingar/år @ 50,000 SEK genomsnitt
- Årlig intäkt: **50,000 SEK**

**Total ARR-projektion (År 3):** 2,140,000 SEK

---

## 🛠️ Funktioner & Features

### Core Plattform (Alla Användare)

#### 1. Projektkort & Detaljvyer ✅ **KLART**
**Status:** Implementerad i Fas 2

**Funktionalitet:**
- Tydlig presentation av projekt med:
  - Titel, beskrivning, kategori (idrott, utbildning, miljö, etc.)
  - Budget och finansieringsstatus
  - Organisation (namn, stad, org.nr)
  - Koppling till FN:s hållbarhetsmål (SDG:er)
  - Projektdatum (start/slut)
  - Kontaktstatistik (antal visningar, antal företag som visat intresse)

**Implementation:**
- Databas: `projects` tabell med fullständig metadata
- API: `GET /api/projects` med filter-stöd
- UI: Projekt-kort på `/hitta-projekt`, detaljvy på `/projekt/[id]`

#### 2. Sök & Filterfunktion ✅ **KLART**
**Status:** Implementerad i Fas 2

**Filteralternativ:**
- Kategori (10 kategorier: Idrott, Utbildning, Miljö, etc.)
- Stad/Geografi
- FN:s hållbarhetsmål (17 SDG:er)
- Budget (min/max)
- Projektdatum

**Implementation:**
- API: Query parameters på `/api/projects?category=idrott&city=Stockholm&goals=SDG3`
- UI: Filter-sidebar med multi-select

#### 3. Automatisk Matchning ⚠️ **50% KLART**
**Status:** Grundläggande filtrering klar, avancerad matchning saknas

**Nuvarande funktionalitet:**
- ✅ Matchning baserat på:
  - FN-mål (företagets assessment + projektets SDG:er)
  - Geografi (stad)
  - Kategori
  - Budget

**Saknas:**
- ❌ Demografi-matchning (ålder, kön, målgrupp)
- ❌ "Rekommenderade för dig"-algoritm
- ❌ Machine learning-baserad ranking
- ❌ Matchningspoäng (0-100%) synlig för användare

**Framtida implementation (Fas 4):**
```sql
-- Lägg till i projects tabell:
ALTER TABLE projects ADD COLUMN target_demographics JSONB;
-- Exempel: {"age_range": "13-18", "gender": "all", "focus": "ungdomar"}

ALTER TABLE projects ADD COLUMN social_media_followers INT DEFAULT 0;
ALTER TABLE projects ADD COLUMN estimated_reach INT;
```

#### 4. Reach-Potential ❌ **SAKNAS**
**Status:** Ej implementerad (planerad för Fas 4)

**Planerad funktionalitet:**
- Visa organisationens totala räckvidd:
  - Antal följare på sociala medier
  - Antal medlemmar i föreningen
  - Lokal publik (idrottsevenemang, konserter, etc.)
  - Potentiell exponering för företagets varumärke

**Implementation plan:**
```sql
CREATE TABLE organization_reach (
  organization_id UUID PRIMARY KEY REFERENCES organizations(id),
  social_media_followers INT DEFAULT 0,
  active_members INT DEFAULT 0,
  avg_event_attendance INT DEFAULT 0,
  website_monthly_visitors INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**UI:** Visa i projektkort: "📊 Räckvidd: 2,500 följare + 150 medlemmar"

#### 5. Verifiering av Organisationer ✅ **90% KLART**
**Status:** Backend komplett, admin-gränssnitt saknas

**Verifieringsprocess:**
1. Organisation registrerar sig → status `PENDING`
2. Laddar upp:
   - ✅ Stadgar (PDF)
   - ✅ Senaste årsredovisning (PDF)
3. AI (Google Gemini) analyserar:
   - ✅ Dokumentlegitimitet
   - ✅ Org.nummer-matchning
   - ✅ Ekonomisk sundhet
4. Verifieringsresultat:
   - ✅ Confidence score (0-1)
   - ✅ Flaggor (saknade uppgifter, varningar)
   - ✅ Auto-godkännande om confidence ≥ 0.85
5. Status uppdateras: `PENDING` → `APPROVED` eller `NEEDS_REVIEW`

**Nuvarande läge:**
- ✅ API-endpoints klara (`/api/milestones/[id]/upload-documents`, `/api/milestones/[id]/verify`)
- ✅ AI-verifiering implementerad (för närvarande mockad för MVP-demo)
- ✅ Databas-schema komplett (`ai_verifications` tabell)
- ❌ Admin-dashboard saknas för manuell granskning av flaggade organisationer

**Saknas (Fas 3):**
- Admin-gränssnitt på `/admin/organizations` för att:
  - Granska flaggade organisationer
  - Godkänna/avvisa manuellt
  - Läsa AI:s reasoning
  - Kontakta organisation för komplettering

#### 6. Kommunikation (Företag ↔ Organisation) ✅ **80% KLART**
**Status:** Kontaktformulär klart, real-time messaging saknas

**Nuvarande funktionalitet:**
- ✅ Företag kan kontakta organisation via projekt-detaljvy
- ✅ Meddelanden lagras i databas (`contact_messages` tabell)
- ✅ Status-tracking: SENT → READ → REPLIED → BLOCKED
- ✅ Content moderation (OpenAI Moderation API)
- ✅ Rate limiting (max 10 meddelanden/dag per IP)

**Saknas:**
- ❌ In-plattform messaging-system (chat)
- ❌ E-postnotifikationer när nytt meddelande tas emot
- ❌ Svarsfunktion i organisationsdashboard
- ❌ Konversationshistorik synlig för båda parter

**Implementation (Fas 3-4):**
- Aktivera e-postnotifikationer (Resend API redan integrerad, endast inaktiverad)
- Bygg messaging-UI i dashboards
- Överväg WebSocket eller Supabase Realtime för live-uppdateringar

#### 7. Favoriter & Bevakningar ❌ **SAKNAS**
**Status:** Ej implementerad (planerad för Fas 4)

**Planerad funktionalitet:**
- Företag kan "favorit-markera" projekt
- Få notifikationer när:
  - Projektet uppdateras
  - Ny milstolpsrapport publiceras
  - Organisation lägger till nya projekt

**Implementation plan:**
```sql
CREATE TABLE favorite_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  notify_on_updates BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, project_id)
);
```

**UI:** Stjärn-ikon på projektkort, lista under "Mina favoriter" i företagsdashboard

#### 8. Blog och Nyhetsbrev ❌ **SAKNAS**
**Status:** Ej implementerad (planerad för Fas 4)

**Planerad innehåll:**
- Tips för företag: "Så väljer du rätt samhällsprojekt"
- Inspiration: "5 föreningar som lyckades med företagssponsring"
- CSRD-updates: "Nya krav för ESG-rapportering 2025"
- Plattformsuppdateringar: "Vi lanserar nu Mikroboosts!"

**Implementation plan:**
- Alternativ 1: Headless CMS (Sanity, Contentful) + Next.js blogg
- Alternativ 2: Substack-integration (extern blogg)
- Nyhetsbrev: Mailchimp eller Resend (emails redan integrerad)

---

### Företagsfunktioner

#### 9. Gratis Översikt ✅ **KLART**
- Företag kan bläddra bland projekt utan inloggning
- Sök och filtrera fritt
- Se projektdetaljer

**Krav för mer:**
- Kontakta organisation → måste registrera sig
- Initiera betalning → måste registrera sig + genomföra goals assessment

#### 10. Goals Assessment ✅ **KLART**
**Status:** Implementerad i Fas 2

**Funktionalitet:**
- 5-stegs frågeformulär när företag registrerar sig:
  1. Vilka FN-mål prioriterar ni? (multi-select)
  2. Vilken geografisk räckvidd? (lokal/regional/nationell)
  3. Målgrupp? (barn, ungdomar, vuxna, äldre)
  4. CSR-mogenhet? (nybörjare/medel/avancerad)
  5. Budget? (10K-50K/50K-200K/200K+)

**Implementation:**
- API: `PATCH /api/companies/update-assessment`
- Databas: `companies` tabell med `goals_assessment` (JSONB)
- UI: Guidad onboarding på `/foretag/mal-formular`

#### 11. Premium Transaktionspaket ✅ **100% KLART**
**Status:** Backend komplett (Fas 3), frontend mockad för demo

**Funktionalitet:**
- Företag väljer tier i betalningsflöde:
  - Basic (4%)
  - Standard (7%) – rekommenderad
  - Enhanced (10%)
- Avgift läggs UTÖVER grantbelopp
- Stripe PaymentIntent skapas med metadata
- Webhook hanterar betalningsbekräftelse

**Implementation:**
- API: `POST /api/payments/create-intent`
- Stripe: Test mode (kan aktivera production mode via env vars)
- UI: `/betalning/[projectId]` visar tier-val + Stripe-formulär (mockad i demo)

**Saknas:**
- ❌ Full UI-integration med Stripe Elements (för närvarande placeholder)
- ❌ Betalningshistorik i företagsdashboard

#### 12. Företagsdashboard ✅ **80% KLART**
**Status:** Grundfunktioner klara, ESG-rapporter saknas

**Nuvarande funktionalitet:**
- ✅ Översikt över kontaktade projekt
- ✅ Goals assessment status
- ✅ Rekommendationer för expertkonsultation (CSRD/Marketing)

**Saknas:**
- ❌ Betalningshistorik (lista över grants)
- ❌ Milstolpsstatus för aktiva grants
- ❌ Nedladdning av ESG-rapporter
- ❌ Aggregerad impact-statistik (total SEK bidragit, antal organisationer stöttade)

**Implementation (Fas 3):**
- Lägg till panel: "Mina Grants" med lista från `payment_cases` tabell
- Visa milstolpsprogress (Milestone 1: ✅ Approved, Milestone 2: ⏳ Pending)
- Knapp "Ladda ner ESG-rapport" (PDF-generering, se punkt 18)

---

### Organisationsfunktioner

#### 13. Obligatorisk Registrering ✅ **KLART**
**Status:** Implementerad i Fas 1

**Registreringsprocess:**
1. Organisation fyller i formulär på `/registrera-organisation`:
   - Organisationsnamn
   - Org.nummer (valideras mot format)
   - E-post
   - Kontaktperson
   - Telefon
2. hCaptcha-verifiering (bot-skydd)
3. E-post med magic link för inloggning
4. Status sätts till `APPROVED` (för MVP, bör vara `PENDING` i production)

**Implementation:**
- API: `POST /api/organizations/register`
- Supabase Auth: E-post/lösenord + magic link
- Databas: `organizations` tabell

#### 14. Gratis Projektpublicering ✅ **KLART**
**Status:** Implementerad i Fas 2

**Funktionalitet:**
- Obegränsat antal projekt per organisation
- Projektformulär med:
  - Titel, beskrivning (min 50 tecken)
  - Kategori (dropdown)
  - FN-mål (multi-select)
  - Budget, stad, projektdatum
  - Profilbild (JPEG/PNG, max 5MB)

**Content Moderation:**
- ✅ OpenAI Moderation API analyserar titel + beskrivning
- Flaggade projekt → status `FLAGGED` (kräver admin-granskning)
- Rena projekt → status `PENDING_REVIEW` → admin godkänner → `PUBLISHED`

**Implementation:**
- API: `POST /api/projects/create`
- UI: `/dashboard` → "Skapa nytt projekt"

#### 15. Mikroboosts (Extra Synlighet) ❌ **SAKNAS**
**Status:** Ej implementerad (planerad för Fas 4)

**Planerad funktionalitet:**
- Organisation betalar för ökad synlighet av specifikt projekt:
  - **20 SEK** – 7 dagars framhävning på startsidan
  - **50 SEK** – 14 dagars topplacering i sökresultat + badge
  - **100 SEK** – 30 dagars premium-visning + nyhetsbrev + sociala medier

**Implementation plan:**
```sql
CREATE TABLE boost_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  project_id UUID REFERENCES projects(id),
  amount_sek INT NOT NULL, -- 20, 50, 100
  boost_duration_days INT NOT NULL, -- 7, 14, 30
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Lägg till i projects tabell:
ALTER TABLE projects ADD COLUMN boost_level INT DEFAULT 0; -- 0=none, 1-3=tiers
ALTER TABLE projects ADD COLUMN boosted_until TIMESTAMPTZ;
```

**UI:**
- Knapp i organisationsdashboard: "Boosta detta projekt"
- Stripe Checkout för engångsbetalning
- Rankingsalgoritm prioriterar boostade projekt

#### 16. Organisationsdashboard ✅ **100% KLART**
**Status:** Implementerad i Fas 2

**Funktionalitet:**
- ✅ Statistik:
  - Antal visningar per projekt
  - Antal kontakter från företag
  - Finansieringsstatus (om grant aktiv)
- ✅ Projekthantering:
  - Lista över alla projekt (draft/pending/published)
  - Redigera/radera projekt
- ✅ Rollhantering:
  - Lägg till team-medlemmar (framtida)

**Saknas:**
- ❌ Inbox för meddelanden från företag (se punkt 6)
- ❌ Milstolpsrapportering (se punkt 17)

---

### Betalnings- & Verifieringsfunktioner

#### 17. Milstolpssystem ✅ **90% KLART**
**Status:** Backend komplett, frontend UI saknas

**Funktionalitet:**
- Varje grant delas automatiskt i **2 milstolpar** (50% vardera):

**Milstolpe 1: Legitimitet (50%)**
- Organisation laddar upp:
  - ✅ Stadgar (PDF)
  - ✅ Senaste årsredovisning (PDF)
- AI verifierar dokumentens äkthet och org.nummer-matchning
- Status: PENDING → DOCUMENTS_UPLOADED → AI_VERIFYING → APPROVED → PAID

**Milstolpe 2: Impact (50%)**
- Organisation laddar upp:
  - ✅ Impact-beskrivning (text)
  - ✅ Bilder från projektet (JPEG/PNG)
  - ✅ Länk till sociala medier/webb-post
- AI verifierar att rapporten matchar projektbeskrivning
- Status: PENDING → DOCUMENTS_UPLOADED → AI_VERIFYING → APPROVED → PAID

**Konfigurerbarhet:**
- Företag kan anpassa (i framtiden):
  - Antal milstolpar (2, 3, 4...)
  - Fördelning (30/70%, 25/25/50%, etc.)
  - Krav per milstolpe (text + bild + video, etc.)
- Default: 2 milstolpar, 50/50%, text + bild + social media

**Implementation:**
- ✅ Databas: `milestones` tabell med `milestone_type`, `amount_sek`, `requirements` (JSONB)
- ✅ API:
  - `POST /api/milestones/[id]/upload-documents` (ladda upp filer)
  - `POST /api/milestones/[id]/submit-report` (skicka in rapport)
  - `POST /api/milestones/[id]/verify` (trigga AI-verifiering)
- ✅ Stripe: Transfer från Kollektivly → Organisation vid godkänd milstolpe
- ❌ UI: Saknas helt (behöver byggas i Fas 3)

**Saknas (Fas 3 - KRITISKT):**
- Formulär för organisation att ladda upp stadgar/årsredovisning
- Formulär för organisation att skicka impact-rapport
- Progress-indikator i organisationsdashboard
- Notifikationer när milstolpe godkänts/avvisats

#### 18. AI-Verifiering ✅ **90% KLART**
**Status:** Kod klar, för närvarande mockad

**Verifieringsprocess:**

**Legitimitetskontroll (Milstolpe 1):**
```
AI analyserar:
1. Är stadgarna autentiska? (layout, språk, formalia)
2. Matchar org.nummer i stadgar med registrering?
3. Är årsredovisningen komplett? (balansräkning, resultaträkning)
4. Visar ekonomin sundhet? (negativt eget kapital = varning)
5. Finns revisorsutlåtande?

Output:
- Confidence score (0-1)
- Flaggor: ["missing_auditor", "financial_concerns"]
- Reasoning: "Dokumenten verkar legitima men saknar..."
```

**Impact-kontroll (Milstolpe 2):**
```
AI analyserar:
1. Matchar impact-beskrivning projektets syfte?
2. Visar bilder verklig aktivitet? (ej stockfotos)
3. Finns bevis på sociala medier/webb?
4. Är antal deltagare/nyttan rimlig?

Output:
- Confidence score (0-1)
- Flaggor: ["vague_description", "missing_photos"]
- Reasoning: "Rapporten innehåller konkreta exempel..."
```

**Beslut:**
- Confidence ≥ 0.85 → Auto-godkänt (APPROVED)
- Confidence 0.50-0.85 → Manuell granskning (NEEDS_REVIEW)
- Confidence < 0.50 → Avvisad (REJECTED)

**Implementation:**
- ✅ AI-integration: Google Gemini 1.5 Flash (gratis tier)
- ✅ Kod: `src/lib/ai/verification-gemini.ts.disabled` (redo att aktiveras)
- ✅ Mock: `src/lib/ai/verification-gemini.mock.ts` (aktiv i demo)
- ✅ Databas: `ai_verifications` tabell med full audit trail

**Aktivering (Fas 3):**
1. Sätt `GOOGLE_AI_API_KEY` i Vercel env vars
2. Byt namn på fil: `verification-gemini.ts.disabled` → `verification-gemini.ts`
3. Uppdatera import i `verify/route.ts`

#### 19. ESG-Rapportgenerering ❌ **20% KLART**
**Status:** Databas-schema klart, generator saknas

**Planerad funktionalitet:**
- Automatisk generering av ESG-rapport när grant slutförs:
  - Företagslogo + varumärke
  - Sammanfattning av projektets syfte
  - FN-mål som adresserats (SDG-ikoner)
  - Impact-metrics:
    - Antal personer som nåtts
    - SEK investerat
    - CO2-besparing (om miljöprojekt)
    - Socialt värde (kvalitativ beskrivning)
  - Bilder från milstolpsrapporter
  - Verifieringsstatus (AI confidence scores)
  - Tidslinje (betalning → milstolpe 1 → milstolpe 2 → slutfört)
- Format: PDF (1-2 sidor, CSRD/SDG-kompatibel)

**Implementation plan:**
```typescript
// Pseudo-kod:
async function generateESGReport(paymentCaseId: string) {
  // Hämta data
  const payment = await getPaymentCase(paymentCaseId)
  const milestones = await getMilestones(paymentCaseId)
  const project = await getProject(payment.project_id)
  const company = await getCompany(payment.company_id)

  // Generera PDF (Pdfmonkey.io eller react-pdf)
  const pdfUrl = await pdfGenerator.create({
    template: 'esg_report_v1',
    data: {
      companyName: company.company_name,
      projectTitle: project.titel,
      grantAmount: payment.grant_amount,
      sdgGoals: project.fn_mal,
      impactData: milestones[1].impact_description,
      photos: milestones[1].uploaded_photo_urls,
      aiConfidence: milestones.map(m => m.ai_confidence_score),
      generatedAt: new Date()
    }
  })

  // Spara i databas
  await supabase.from('esg_reports').insert({
    payment_case_id: paymentCaseId,
    company_id: payment.company_id,
    pdf_url: pdfUrl,
    report_data: { /* JSONB med all data */ }
  })
}
```

**Saknas (Fas 3 - KRITISKT för värdeförslag):**
- PDF-generator (Pdfmonkey API-integration eller react-pdf)
- ESG-rapport-mall design
- Automatisk triggering när Milstolpe 2 godkänts
- Nedladdningsknapp i företagsdashboard

---

### Plattform & Administration

#### 20. GDPR-Compliance ✅ **90% KLART**
**Status:** Tekniskt implementerad, några UI-element saknas

**Implementerat:**
- ✅ Datakryptering (Supabase PostgreSQL)
- ✅ EU/EES-lagring (Supabase EU-region)
- ✅ Privacy policy (`/integritetspolicy`)
- ✅ Row-level security (RLS) – användare ser endast sin egen data
- ✅ Säker autentisering (Supabase Auth)

**Saknas:**
- ❌ Cookie consent-banner (GDPR-krav)
- ❌ Dataexport-funktionalitet (rätt till dataportabilitet)
- ❌ "Radera mitt konto"-knapp (rätt att bli bortglömd)

**Implementation (Fas 3):**
- Cookie consent: `react-cookie-consent` eller Cookiebot
- Dataexport: API-endpoint `/api/users/export-data` → returnerar JSON/ZIP
- Radera konto: Soft delete (`deleted_at` timestamp) för att bevara audit trail

#### 21. AML/KYC-Screening ⚠️ **30% KLART**
**Status:** Stripe har inbyggd KYC, ingen extern screening

**Nuvarande implementation:**
- ✅ Stripe Connect verifierar organisationer (org.nummer, bankuppgifter)
- ✅ Stripe blockerar automatiskt högriskkonton
- ⚠️ Ingen proaktiv sanktionslistscreening (OFAC, EU)
- ⚠️ Ingen PEP-kontroll (Politically Exposed Persons)

**Rekommenderad förbättring (Fas 4 vid högre volymer):**
```typescript
// Integration med Sumsub eller ComplyAdvantage:
async function screenEntity(entityType: 'company' | 'organization', entityId: string) {
  const entity = await getEntity(entityType, entityId)

  const result = await sumsubApi.checkSanctions({
    name: entity.name,
    country: 'SE',
    orgNumber: entity.org_number
  })

  if (result.isHighRisk) {
    await flagForManualReview(entityId, result.flags)
  }

  await saveKYCResult(entityId, result)
}
```

**Lagkrav:**
- För närvarande OK med Stripe (klarar EU:s AML-direktiv för betalningar)
- Vid >100,000 EUR/transaktion: Kräver fördjupad KYC (enhanced due diligence)

#### 22. Admin-Dashboard ❌ **SAKNAS**
**Status:** Ej implementerad (KRITISKT för Fas 3)

**Planerad funktionalitet:**
- `/admin/organizations` – Granska nya organisationsansökningar
- `/admin/projects` – Godkänna/avvisa flaggade projekt
- `/admin/payments` – Översikt över transaktioner
- `/admin/verifications` – Granska AI-flaggade milstolpar
- `/admin/users` – Hantera användarkonton (suspendera, radera)

**Access control:**
- Hårdkodat admin-konto (env var: `ADMIN_EMAIL`)
- Framtida: Admin-roll i databas

**Implementation (Fas 3 - KRITISKT):**
- Bygg UI med lista över pending items
- Knappar: "Godkänn", "Avvisa", "Be om komplettering"
- Visa AI:s reasoning för transparens
- Loggning av admin-beslut (audit trail)

#### 23. Monitoring & Logging ❌ **SAKNAS**
**Status:** Endast console.log, ingen strukturerad loggning

**Rekommenderad implementation (Fas 3):**
- **Error tracking:** Sentry (free tier för 5K errors/månad)
- **Logging:** Winston eller Pino för strukturerade loggar
- **Performance:** Vercel Analytics (redan tillgänglig)
- **Database:** Supabase slow query logs (aktivera i dashboard)

**Exempel:**
```typescript
import * as Sentry from '@sentry/nextjs'
import { logger } from '@/lib/logger'

try {
  await processPayment(paymentId)
  logger.info('Payment processed', { paymentId, amount })
} catch (error) {
  logger.error('Payment failed', { paymentId, error })
  Sentry.captureException(error, { tags: { feature: 'payments' } })
  throw error
}
```

---

## 📊 Implementeringsstatus

### Översikt per Fas

| Fas | Status | Färdig | Beskrivning |
|-----|--------|--------|-------------|
| **Fas 1** | ✅ Klar | 100% | Grundläggande plattform (registrering, auth, hemsida) |
| **Fas 2** | ✅ Klar | 100% | Kärnfunktioner (sök, kontakt, dashboards, projekt) |
| **Fas 3** | 🟡 Pågår | 70% | Betalning & verifiering (backend klar, frontend saknas) |
| **Fas 4** | ⏳ Planerad | 0% | Tillväxtfunktioner (boosts, favoriter, blog, ML-matchning) |

### Detaljerad Checklista

#### ✅ Fas 1 – Grundplattform (Klar 2024)
- [x] Supabase setup (databas, auth, storage)
- [x] Organisationsregistrering (med hCaptcha)
- [x] Företagsregistrering
- [x] Autentisering (magic link + email/password)
- [x] Hemsida (`/`)
- [x] Privacy policy (`/integritetspolicy`)
- [x] UI-cleanup (CSR → Samhällsnytta)

#### ✅ Fas 2 – Kärnfunktioner (Klar 2025)
- [x] Projektpublicering (formulär + databas)
- [x] Sök & filter (kategori, stad, FN-mål, budget)
- [x] Projektkort & detaljvyer
- [x] Kontaktsystem (företag → organisation)
- [x] Content moderation (OpenAI API)
- [x] Organisationsdashboard (statistik, projekthantering)
- [x] Företagsdashboard (kontaktade projekt)
- [x] Goals assessment (5-stegs frågeformulär)
- [x] Expertkonsultation-rekommendationer

#### 🟡 Fas 3 – Betalning & Verifiering (Pågår November-December 2025)

**Backend (✅ Klar):**
- [x] Databas-schema (payment_cases, milestones, ai_verifications, esg_reports)
- [x] Stripe Connect-integration (test mode)
- [x] Payment API (`create-intent`, `webhook`)
- [x] Milestone API (`upload-documents`, `submit-report`, `verify`)
- [x] AI-verifiering (Gemini 1.5 Flash, för närvarande mockad)
- [x] Escrow-logik (betalningar hålls inne tills verifierade)

**Frontend (❌ Saknas – 4-6 veckor):**
- [ ] Betalningsflöde UI (Stripe Elements-integration)
- [ ] Milstolpsrapportering UI för organisationer
  - [ ] Ladda upp stadgar + årsredovisning (Milstolpe 1)
  - [ ] Skicka impact-rapport + bilder (Milstolpe 2)
  - [ ] Progress-indikator i dashboard
- [ ] Admin-dashboard för moderering
  - [ ] Granska nya organisationer
  - [ ] Godkänn/avvisa flaggade projekt
  - [ ] Manuell granskning av AI-flaggade milstolpar
- [ ] ESG-rapportgenerator
  - [ ] PDF-mall design
  - [ ] Automatisk generering vid slutfört grant
  - [ ] Nedladdningsknapp i företagsdashboard
- [ ] E-postnotifikationer
  - [ ] Aktivera Resend API
  - [ ] Mallar (nytt meddelande, milstolpe godkänd, etc.)

**Production-deployment:**
- [ ] Applicera databas-migrationer till production
- [ ] Konfigurera Stripe webhook i production
- [ ] Aktivera riktig AI-verifiering (byt från mock)
- [ ] Sätt production API-nycklar (Stripe, Gemini, Resend)

#### ⏳ Fas 4 – Tillväxtfunktioner (Planerad Q1-Q2 2026)
- [ ] Reach-potential display (social media-följare)
- [ ] Favoriter & Bevakningar (watchlist)
- [ ] Mikroboosts (20-100 SEK för synlighet)
- [ ] Blog & nyhetsbrev (Mailchimp/Substack)
- [ ] Avancerad matchning (ML-algoritm)
- [ ] AML/KYC-screening (Sumsub)
- [ ] Cookie consent-banner
- [ ] Dataexport & radera konto
- [ ] Kommun-licensiering (aggregerade rapporter)
- [ ] Konsultpartner-program
- [ ] Flerspråkighet (Svenska/Engelska)
- [ ] Mobilapp (React Native)

---

## 🗺️ Implementeringsplan

### Fas 3: Betalning & Verifiering (November-December 2025)

#### Vecka 1-2 (4-15 November): Milstolpsrapportering UI
**Mål:** Organisation kan ladda upp dokument och rapporter

**Tasks:**
1. Skapa `/dashboard/grants` – Lista över aktiva grants med milstolpsstatus
2. Skapa `/dashboard/grants/[id]/milestone-1` – Formulär för stadgar + årsredovisning
   - Filuppladdning (drag-and-drop, PDF-preview)
   - Validering (max 10MB, endast PDF)
   - Success state: "Dokumenten granskas av AI..."
3. Skapa `/dashboard/grants/[id]/milestone-2` – Formulär för impact-rapport
   - Textfält (min 100 tecken)
   - Bilduppladdning (multi-file, max 5MB vardera)
   - Social media-länk (URL-validering)
   - Success state: "Rapporten skickades in!"
4. Progress-indikator:
   - Milstolpe 1: ⏳ Väntar → 📄 Inskickad → 🤖 Granskas → ✅ Godkänd → 💰 Utbetald
   - Milstolpe 2: (samma flöde)

**Test:**
- Ladda upp legitima stadgar/årsredovisningar → Ska godkännas av AI
- Ladda upp ogiltig PDF → Ska avvisas med tydligt felmeddelande
- Skicka impact-rapport → Ska visas i admin-dashboard för granskning

---

#### Vecka 3-4 (18 November - 29 November): Admin-Dashboard
**Mål:** Admin kan granska flaggade organisationer, projekt, och milstolpar

**Tasks:**
1. Skapa `/admin/login` – Hårdkodat admin-lösenord (env var)
2. Skapa `/admin/dashboard` – Översikt:
   - Antal pending organisations
   - Antal flaggade projekt
   - Antal milstolpar som behöver granskas
3. Skapa `/admin/organizations` – Tabell med:
   - Organisationsnamn, org.nummer, status
   - Knapp: "Granska" → Modal med AI:s reasoning
   - Knappar: "Godkänn", "Avvisa", "Be om komplettering"
4. Skapa `/admin/projects` – Samma struktur
5. Skapa `/admin/milestones` – Visa:
   - Projekt, organisation, milstolpe-typ
   - AI confidence score + flaggor
   - Länk till uppladdade dokument
   - Knappar: "Godkänn", "Avvisa"

**Test:**
- Flagga en organisation → Ska visas i admin-dashboard
- Godkänn organisation → Status ska uppdateras i databas
- Avvisa milstolpe → Organisation ska få notifikation (email)

---

#### Vecka 5-6 (2-13 December): ESG-Rapportgenerator
**Mål:** Företag får automatisk PDF-rapport när grant slutförs

**Tasks:**
1. Designa ESG-rapport-mall (1-2 sidor):
   - Sida 1: Företagslogo, projekttitel, SDG-ikoner, sammanfattning
   - Sida 2: Impact-metrics, bilder, timeline, AI-verifiering
2. Implementera PDF-generator:
   - Alternativ A: Pdfmonkey.io API (betald, enkel)
   - Alternativ B: `react-pdf` (gratis, mer kontroll)
3. Trigga generering automatiskt när Milstolpe 2 = APPROVED
4. Spara PDF-URL i `esg_reports` tabell
5. Visa i företagsdashboard:
   - Lista över färdigställda grants
   - Knapp: "Ladda ner ESG-rapport" (PDF-nedladdning)
6. E-postnotifikation till företag: "Din ESG-rapport är klar!"

**Test:**
- Slutför grant → ESG-rapport ska genereras automatiskt
- Öppna PDF → Ska innehålla korrekt data (projekt, bilder, SDG:er)
- Företag får email → Klickar på länk → Laddar ner PDF

---

### Fas 4: Tillväxtfunktioner (Q1-Q2 2026)

#### Månad 1: Reach-Potential + Favoriter
- Lägg till `social_media_followers`, `active_members` i organisation-tabell
- UI: Visa "📊 Räckvidd: 2,500 följare + 150 medlemmar" på projektkort
- Implementera `favorite_projects` tabell + API
- UI: Stjärn-ikon på projektkort, "Mina favoriter"-lista i företagsdashboard

#### Månad 2: Mikroboosts
- Skapa `boost_purchases` tabell
- Stripe Checkout för engångsbetalningar (20/50/100 SEK)
- Uppdatera rankingsalgoritm: Boostade projekt högre i sökresultat
- UI: "Boosta"-knapp i organisationsdashboard, "🚀 Boostad"-badge på projektkort

#### Månad 3: Blog & Nyhetsbrev
- Integrera Sanity CMS eller Substack för blogg
- Skapa nyhetsbrevsmall (Mailchimp eller Resend)
- Första blogginlägg: "Välkommen till Kollektivly – Så fungerar det"
- Nyhetsbrev: Månatlig sammanfattning av nya projekt

#### Månad 4-6: Avancerad Matchning & AML/KYC
- Machine learning-modell för projektrekommendationer (TensorFlow.js eller extern API)
- Integrera Sumsub för AML/KYC-screening (sanktionslistor, PEP)
- Cookie consent-banner (Cookiebot)
- Dataexport-funktionalitet (GDPR)

---

## 🛠️ Teknisk Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Språk:** TypeScript
- **Styling:** Tailwind CSS
- **UI-komponenter:** Headless UI, Radix UI
- **Formulär:** React Hook Form + Zod-validering
- **State management:** React Context (för enklare state), Zustand (vid behov)

### Backend
- **Databas:** Supabase PostgreSQL (EU-region)
- **Autentisering:** Supabase Auth (magic link + email/password)
- **Storage:** Supabase Storage (för PDF:er och bilder)
- **API:** Next.js API Routes (serverless)

### Betalningar & Verifiering
- **Betalningar:** Stripe Connect (escrow via Stripe Balance)
- **AI-verifiering:** Google Gemini 1.5 Flash (gratis tier, 15 requests/min)
- **Content moderation:** OpenAI Moderation API

### Kommunikation
- **Email:** Resend (för närvarande inaktiverad)
- **PDF-generering:** Pdfmonkey.io (planerad) eller react-pdf

### Hosting & DevOps
- **Hosting:** Vercel (gratis tier)
- **CI/CD:** Vercel auto-deploy (git push → production)
- **Monitoring:** Sentry (planerad), Vercel Analytics
- **Env vars:** Vercel Environment Variables

### Säkerhet
- **Row-level security:** Supabase RLS policies
- **Bot-skydd:** hCaptcha (organisationsregistrering)
- **Rate limiting:** Upstash Redis (planerad)
- **HTTPS:** Enforced via Vercel

---

## ⚖️ Juridik & Compliance

### GDPR (Dataskyddsförordningen)
**Status:** ✅ 90% kompatibel

**Implementerat:**
- ✅ Datakryptering (Supabase)
- ✅ EU/EES-lagring (Supabase EU-region)
- ✅ Privacy policy (`/integritetspolicy`)
- ✅ Samtycke vid registrering (checkbox)
- ✅ Dataminimering (endast nödvändiga fält)

**Saknas:**
- ❌ Cookie consent (krävs för analytics)
- ❌ Dataexport (rätt till dataportabilitet)
- ❌ Radera konto (rätt att bli bortglömd)

**Deadline:** Innan public launch (Fas 3)

---

### AML (Anti-Money Laundering) & KYC (Know Your Customer)
**Status:** ⚠️ 30% kompatibel (Stripe täcker basics)

**Implementerat:**
- ✅ Stripe Connect verifierar organisationer (org.nummer, bankuppgifter)
- ✅ Automatisk blockering av högriskkonton (via Stripe)

**Saknas:**
- ❌ Proaktiv sanktionslistscreening (OFAC, EU)
- ❌ PEP-kontroll (Politically Exposed Persons)
- ❌ Enhanced due diligence för >100K EUR/transaktion

**Rekommendation:**
- Fas 3: Acceptera Stripes KYC (OK för MVP)
- Fas 4: Integrera Sumsub eller ComplyAdvantage (vid högre volymer)

**Lagkrav:**
- EU:s 5:e AML-direktiv (2020/2022 update)
- Svensk penningtvättslag (2017:630)

---

### PCI-DSS (Payment Card Industry Data Security Standard)
**Status:** ✅ 100% kompatibel (Stripe hanterar)

- ✅ Ingen kortdata lagras på Kollektivly-servrar
- ✅ Stripe är PCI-DSS Level 1 certifierad
- ✅ HTTPS enforced

---

### CSRD (Corporate Sustainability Reporting Directive)
**Status:** ✅ Kompatibel (ESG-rapporter designade för CSRD)

**ESG-rapport-struktur:**
- ✅ FN:s hållbarhetsmål (SDG:er)
- ✅ Kvantitativa metrics (SEK bidragit, antal personer nådda)
- ✅ Kvalitativ beskrivning (projektets impact)
- ✅ Verifieringsstatus (AI confidence scores)

**CSRD-krav för företag:**
- Stora företag (>250 anställda): Obligatorisk från 2024
- Börsnoterade SME: Från 2026
- Kollektivlys rapporter kan användas som underlag för CSRD

---

### Juridiskt Ansvar
**Ansvarsbegränsning:**
- Kollektivly är **endast förmedlare och verifieringsagent**
- Vi är INTE ansvariga för projektets faktiska genomförande
- Organisationen är ansvarig för att leverera projektet
- Företaget har avtalat direkt med organisationen (vi faciliterar)

**Terms of Service:**
- Krävs: Tydliga användarvillkor på `/anvandarvillkor`
- Innehåll:
  - Ansvarsbegränsning
  - Återbetalningspolicy (vid AI-flaggad fraud → återbetalning)
  - Force majeure
  - Tvistlösning (svensk lag, Stockholms tingsrätt)

**Status:** ❌ Saknas (KRITISKT innan launch)

---

## 🏆 Konkurrensfördelar

### Problemet med Traditionella Grants

| Problem | Konsekvens för Företag | Konsekvens för Organisation |
|---------|------------------------|----------------------------|
| Ingen verifiering | Risk för missbruk, svårt att lita | Svårt att bevisa trovärdighet |
| Manuell uppföljning | 10-20 timmar/grant | Ingen vägledning, inkonsekvent rapportering |
| Ingen ESG-dokumentation | Svårt att rapportera till styrelse/CSRD | Ingen motivering att rapportera impact |
| Inkonsistent format | Omöjligt att jämföra projekt | Ingen standard att följa |
| Svårt att hitta organisationer | Tidskrävande research | Beroende av nätverk, svårt för små organisationer |

### Kollektivlys Lösning

| Funktion | Värde för Företag | Värde för Organisation |
|----------|-------------------|------------------------|
| **AI-verifiering** | Trygghet – ingen risk för missbruk | Trovärdighet – bevisar legitimitet |
| **Automatisk milstolpshantering** | 0 timmar uppföljning (tidigare 15h) | Tydlig struktur, enkel rapportering |
| **Auto-genererade ESG-rapporter** | Direkt CSRD-redo (sparar 5h/rapport) | Visar impact professionellt |
| **Standardiserat format** | Jämförbart över tid och projekt | Enkel mall att följa |
| **Matchningsalgoritm** | Hitta rätt projekt på 5 min (tidigare dagar) | Bli hittad utan att jaga sponsring |
| **Escrow-system** | Betalar endast för leverans | Motiverande – bättre rapporter = snabbare betalning |

### Value Proposition
**För Företag:**
- Spara: 15 timmar + 3,000 SEK/grant (värde)
- Kostnad: 7% avgift = 3,500 SEK (på 50K grant)
- **Värde > Pris** ✅

**För Organisationer:**
- Gratis publicering
- Automatisk synlighet
- Legitimitet genom verifiering
- **Inget att förlora** ✅

---

## 🔮 Framtida Utveckling (Fas 5+)

### Internationell Expansion
- **Sverige först** (2025-2026)
- **Norge & Danmark** (Q3 2026 – liknande non-profit-struktur)
- **Tyskland & UK** (2027 – större marknader)
- Flerspråkighet: Svenska, Engelska, Norska, Danska

### Produktutveckling
- **Impact Token (Blockchain):** Oföränderliga ESG-bevis på blockchain
- **API för Företag:** Integrera Kollektivly i befintliga CSR-plattformar
- **White-label:** Sälj plattformen till större företag (ex. SEB, H&M)
- **Mobilapp:** React Native (iOS + Android)

### Partnerskap
- **Accountingfirmor:** KPMG, Deloitte (förmedla CSRD-konsultation)
- **CSR-konsulter:** Revenue share på förmedlade uppdrag
- **Branschorganisationer:** SISU, Famna, LSU (marknadsföring till medlemmar)
- **Banker:** SEB, Swedbank (grant-facilitation via företagskonton)

---

## 📞 Kontakt & Nästa Steg

**Current Status:** Fas 3 pågår (70% klart)

**Nästa Milstolpe:** Validera idé med potentiella kunder (November 2025)

**Beräknad Beta-lansering:** December 2025

---

**Version History:**
- v1.0 (2025-01-15): Initial PRD
- v2.0 (2025-10-28): Uppdaterad med implementeringsstatus, tekniska detaljer och korrekt timeline

---

**Dokumentstatus:** ✅ Uppdaterad och synkroniserad med kodbasen