# Demo Validation Guide - Kollektivly
**Created:** 2025-10-28
**Purpose:** Guide för att validera kundbetalvilja och idé med potentiella användare

---

## 🎯 Vad har byggts?

### 1. ✅ Payment Flow Demo UI (`/stod-projekt/[projectId]`)
**Syfte:** Visa tydligt vad tjänsten kostar och vad kunden får

**Funktioner:**
- **Tre prissättningsnivåer** (Basic 4%, Standard 7%, Enhanced 10%)
- **Interaktiv grantbelopp-kalkylator** (visa total kostnad i realtid)
- **Tydlig kostnadsuppdelning:**
  - Grant till organisation: 50,000 SEK
  - + Serviceavgift (7%): 3,500 SEK
  - = Totalt: 53,500 SEK
- **Värdeförslag per nivå:** Vad ingår, varför det är värt det
- **"Varför betala serviceavgift?"-sektion** med konkreta värden:
  - Spara 15 timmar = 3,000+ SEK
  - CSRD-redo rapportering = 5 timmar sparade
  - Trygghet = ingen risk för missbruk
  - Compliance = juridiskt hanterat

**Demo-banner:** Gul banner högst upp med plats för din Google Forms-länk

**Hur det testas:**
1. Användare klickar "Stöd detta projekt" på valfritt projekt
2. Ser tydlig prissättning med alla tre nivåer
3. Kan ändra grantbelopp och se hur avgiften ändras
4. Klickar "Fortsätt till betalning" → får demo-meddelande
5. **Feedback samlas:** "Skulle du betala X SEK för detta?"

---

### 2. ✅ ESG-rapport mockup (`/esg-rapport-exempel`)
**Syfte:** Visa konkret vad kunden får som leverans

**Innehåll:**
- **Komplett ESG-rapport-preview** (så det skulle se ut i verkligheten)
  - Företagsinformation (namn, grant-belopp, projekt)
  - FN:s globala mål (SDG-ikoner och förklaring)
  - Impact Summary (konkreta siffror: "250 personer nådda", "92% positiv feedback")
  - Verifieringsstatus (AI confidence scores för båda milstolparna)
  - Projekttidslinje (betalning → M1 → M2 → slutfört)
  - PDF-nedladdningsknapp (disabled i demo)

**Värdepropsar:**
- ⚡ Spara 5 timmar (auto-genererad)
- ✅ CSRD-redo (uppfyller CSRD-krav)
- 🎯 SDG-aligned (kopplad till FN-mål)

**Hur det testas:**
1. Länk från betalningssidan: "Se exempel →" under ESG-rapportering
2. Eller direkt till `/esg-rapport-exempel`
3. Användare ser **exakt** vad de får som leverans
4. **Feedback:** "Är detta värt 3,500 SEK?"

---

### 3. ✅ Milestone submission UI mockup (`/milestone-exempel`)
**Syfte:** Visa hela verifieringsprocessen och automatiseringen

**Funktioner:**
- **Två milstolpar** (kan växla mellan dem):
  - **Milstolpe 1:** Legitimitet (stadgar + årsredovisning)
  - **Milstolpe 2:** Impact (text + bilder + social media)
- **Interaktiva formulär** (mockade men visar hur det skulle fungera)
- **AI-verifieringschecklista:** Vad AI kontrollerar per milstolpe
- **Verifieringsprocess-flöde:** Steg-för-steg visualisering
  - Organisation skickar in → AI analyserar (2-5 min) → Resultat → Utbetalning

**Värdeprops:**
- 0 timmar manuell uppföljning
- Automatisk AI-verifiering
- Pengarna släpps ENDAST när kraven är uppfyllda

**Hur det testas:**
1. Länk från betalningssidan: "Se hur →" under "Spara tid"
2. Eller direkt till `/milestone-exempel`
3. Användare ser **hur enkelt** det är för organisationer att rapportera
4. **Feedback:** "Känns denna automatisering trygg?"

---

## 📊 Validering Strategy

### Mål: Validera att kunder vill betala

**Target:** 10-15 företag testar demo → 30%+ säger "Ja, jag skulle betala"

### Validation Flow

```
1. Demo-intro (du guider)
   ↓
2. Titta på projekt → Klicka "Stöd detta projekt"
   ↓
3. Se prissättning (betalningsflöde)
   ↓
4. Klicka länkar:
   - "Se ESG-rapport exempel"
   - "Se milestone-exempel"
   ↓
5. Tillbaka till betalning → Klicka "Fortsätt"
   ↓
6. Demo-popup: "DEMO MODE - I produktion skulle Stripe-betalning startas här"
   ↓
7. Google Forms: "Skulle du betala för detta?"
```

---

## 📝 Google Forms - Setup Guide

### Frågor att ställa (kopiera till Google Forms)

**Sektion 1: Betalvilja**

1. **Skulle du betala 3,500 SEK (7%) för AI-verifiering + ESG-rapport på ett 50,000 SEK grant?**
   - [ ] Ja, definitivt värda pengarna
   - [ ] Ja, troligtvis
   - [ ] Kanske, beror på...
   - [ ] Nej, för dyrt
   - [ ] Nej, behöver inte tjänsten
   - [ ] Fritext: ___________

2. **Vad tycker du om priset (7% serviceavgift)?**
   - [ ] För lågt – jag hade betalat mer för denna trygghet
   - [ ] Lagom – värdet matchar priset
   - [ ] Lite högt – men kanske värt det
   - [ ] För högt – skulle inte betala detta

**Sektion 2: Företagsinformation**

3. **Vad är ett typiskt grant-belopp för ert företag?**
   - [ ] 10,000 - 50,000 SEK
   - [ ] 50,000 - 100,000 SEK
   - [ ] 100,000 - 250,000 SEK
   - [ ] Över 250,000 SEK
   - [ ] Vi ger inga grants ännu

4. **Vad är din roll?**
   - [ ] VD / Grundare
   - [ ] CSR / Hållbarhetsansvarig
   - [ ] Marknadschef
   - [ ] HR
   - [ ] Annan roll: ___________

5. **Hur många anställda har ert företag?**
   - [ ] 1-10
   - [ ] 11-50
   - [ ] 51-250
   - [ ] Över 250

**Sektion 3: Pain Points**

6. **Vad är din största oro när det gäller samhällsstöd idag?**
   - [ ] Svårt att veta om organisationer är pålitliga
   - [ ] För tidskrävande att följa upp
   - [ ] Svårt att rapportera impact till styrelse/CSRD
   - [ ] Svårt att hitta rätt projekt
   - [ ] Ingen oro – allt fungerar bra idag

**Sektion 4: Contact & Early Access**

7. **E-postadress (för early access)**
   - Fritext: ___________

8. **Vill du ha 50% rabatt på första transaktionen + gratis konsultation när vi lanserar (December 2025)?**
   - [ ] Ja, jag vill ha early access!
   - [ ] Nej tack

---

## 🔗 Hur du lägger till Google Form

### Steg 1: Skapa Google Form
1. Gå till [forms.google.com](https://forms.google.com)
2. Klicka "Blank form"
3. Kopiera frågorna ovan
4. Publicera formuläret

### Steg 2: Få länken
1. Klicka "Send" i Google Forms
2. Klicka på länk-ikonen
3. Kopiera länken (t.ex. `https://forms.gle/ABC123xyz`)

### Steg 3: Uppdatera demo-banner
Öppna filen `src/app/stod-projekt/[projectId]/page.tsx` och hitta raden:

```tsx
<a
  href="https://forms.gle/YOUR_GOOGLE_FORM_ID"  // ← Byt ut denna
  target="_blank"
  rel="noopener noreferrer"
  className="text-yellow-900 font-semibold hover:underline"
>
  Ge feedback →
</a>
```

Byt ut `https://forms.gle/YOUR_GOOGLE_FORM_ID` mot din faktiska Google Forms-länk.

**Alternativ:** Byt till en dedikerad feedback-sida på plattformen:
```tsx
href="/feedback"  // Skapa en /feedback-sida som embeddar Google Form via <iframe>
```

---

## 📈 Success Metrics

### Validation Goals

| Metric | Target | Signal |
|--------|--------|--------|
| Demo completion rate | >50% | Produkten är engagerande |
| "Ja, skulle betala" | >30% | Stark produkt-marknad fit |
| "För dyrt" | <20% | Priset är rimligt |
| "Early access"-registreringar | >40% | Kundintresse |
| Genomsnittlig grant-storlek | 50K+ SEK | Target-kund validerad |

### Red Flags
- **>50% säger "för dyrt"** → Sänk pris till 5% eller öka värdet
- **>30% säger "behöver inte tjänsten"** → Fel målgrupp, justera positionering
- **<20% early access** → Ointresserade, problem-lösning match är svag

---

## 🚀 Next Steps efter Validation

### Om Positiv Feedback (>30% skulle betala)

**Vecka 1-2: Bygg frontend för milstolpar**
- Formulär för organisation att ladda upp stadgar/årsredovisning
- Formulär för impact-rapport med bilder
- Progress-indikator i dashboard

**Vecka 3-4: Bygg admin-dashboard**
- Granska flaggade organisationer
- Godkänn/avvisa milstolpar
- Visa AI reasoning

**Vecka 5-6: ESG-rapportgenerator**
- PDF-generering (Pdfmonkey eller react-pdf)
- Auto-trigger när Milstolpe 2 = APPROVED
- Nedladdning i företagsdashboard

**Vecka 7-8: Production deployment**
- Aktivera riktig AI (byt från mock)
- Sätt Stripe production keys
- Konfigurera webhooks
- Beta-lansering med 5-10 kunder

### Om Negativ Feedback (<20% skulle betala)

**Alternativ A: Pivotera prissättning**
- Testa 5% istället för 7%
- Eller flat fee: 2,500 SEK per grant (oavsett storlek)

**Alternativ B: Ändra målgrupp**
- Target större företag (250+ anställda) som har större budget
- Eller kommuner som köper bulk-licenser

**Alternativ C: Reducera scope**
- Ta bort AI-verifiering, fokusera på enkel escrow + rapportering
- Sänk pris till 3-4%

---

## 📞 Validation Checklist

### Innan du kör demo:
- [ ] Skapat Google Form med alla frågor
- [ ] Lagt till Google Form-länk i demo-banner
- [ ] Testat hela flödet själv (alla projekt → betalning → ESG → milestones)
- [ ] Förberett pitch (1-2 minuter förklaring innan demo)

### Under demo:
- [ ] Förklara problemet först: "15 timmar manuell uppföljning per grant"
- [ ] Visa betalningsflödet: "Tydliga priser, inget dolt"
- [ ] Visa ESG-rapport: "Detta får du automatiskt"
- [ ] Visa milestone-process: "Så enkelt är det"
- [ ] Fråga: "Skulle du betala 3,500 SEK för detta på ett 50K grant?"
- [ ] Be dem fylla i Google Form

### Efter demo:
- [ ] Samla feedback från Google Forms
- [ ] Räkna andel "Ja, skulle betala"
- [ ] Identifiera vanligaste oro/invändningar
- [ ] Uppdatera PRD baserat på feedback
- [ ] Beslut: Fortsätt bygga eller pivotera?

---

## 🎨 Design/UX Improvements (Optional)

Om du har tid innan demo:

1. **Lägg till en "Guided Tour"-overlay:**
   - Använd [Intro.js](https://introjs.com/) eller liknande
   - Highlighta: Pricing tiers → ESG länk → Milestone länk
   - "Steg 1/4: Se vad tjänsten kostar"

2. **Lägg till testimonials (mockade):**
   ```tsx
   "Vi sparade 20 timmar på första grantet" – Anna Svensson, CSR-chef, TechCorp AB
   ```

3. **Lägg till "Beräkna din besparing"-kalkylator:**
   ```
   Antal grants/år: [5]
   Timmar per grant idag: [15]
   Timpris (SEK): [300]

   = Din besparing: 22,500 SEK/år
   = Vår kostnad (7% på 50K grants): 17,500 SEK/år
   = Nettobesparing: 5,000 SEK + trygghet ✅
   ```

---

## 📂 Filer som skapats

### Pages
1. `/src/app/stod-projekt/[projectId]/page.tsx` - Betalningsflöde med pricing tiers
2. `/src/app/esg-rapport-exempel/page.tsx` - ESG-rapport preview
3. `/src/app/milestone-exempel/page.tsx` - Milestone submission mockup

### Components
1. `/src/components/ESGReportPreview.tsx` - Reusable ESG report component

### Documentation
1. `/docs/PRD_KOLLEKTIVLY.md` - Uppdaterad PRD med implementeringsstatus
2. `/docs/DEMO_VALIDATION_GUIDE.md` - Denna guide

---

## ✅ Sammanfattning

**Du har nu:**
- ✅ Tydlig betalningsflöde som visar priser och värde
- ✅ ESG-rapport mockup som visar leveransen
- ✅ Milestone-exempel som visar automatiseringen
- ✅ Demo-banners för Google Forms-länk
- ✅ Komplett validation strategy

**Nästa steg:**
1. Skapa Google Form (10 min)
2. Lägg till länken i demo-banner
3. Testa hela flödet själv
4. Boka 10-15 demo-möten med potentiella kunder
5. Samla feedback och analysera
6. Beslut: Bygga vidare eller pivotera?

**Good luck med valideringen! 🚀**