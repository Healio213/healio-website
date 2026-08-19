# KassenBoost × Healio × Arbeitgeberbrücke Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine neutrale KassenBoost→Healio-Brücke, einen privaten Mitarbeiterzugang für Arbeitgeber und einen belastbaren 676-/75-EUR-bAV-Hebel samt Arbeitgeber-Entscheidungsrechner veröffentlichen.

**Architecture:** KassenBoost bleibt der unabhängige GKV-Einstieg. Healio erhält eine neutrale Brückenseite und integriert KassenBoost als ersten Arbeitgeberbaustein; bAV, bKV und BGM bleiben getrennte Folgestrecken. Berechnungen liegen in reinen Funktionen, UI-Komponenten konsumieren nur getestete Ergebnisse.

**Tech Stack:** Vinext/React 19/TypeScript/Playwright (KassenBoost); Vite/React 18/React Router/i18next/Node-Contract-Tests (Healio); Cloudflare Workers und Vercel.

**Spec:** `docs/superpowers/specs/2026-08-19-kassenboost-healio-arbeitgeberbruecke.md`

## Global Constraints

- Bestehende und fremde Änderungen in beiden Arbeitsordnern bleiben erhalten.
- KassenBoost überträgt niemals Kasse, Region, Einkommen, Präferenzen oder Gesundheitsangaben an Healio oder Arbeitgeber.
- Das Kassenranking bleibt unabhängig von Vergütung, IKK-Beziehungen und Healio-Produkten.
- bAV-Copy: 676 EUR vollständig arbeitgeberfinanziert; rund 75 EUR möglicher Nettoeffekt; „fast zehnfach“, niemals exaktes 10X-Versprechen.
- Projektionen lassen 0–12 % Marktrendite zu, bieten 4/6/8/10/11,1 % als Schnellwerte an und ziehen standardmäßig 2,00 Prozentpunkte Effektivkosten sichtbar ab. Default: `10 % − 2 % = 8 %`. 11,1 % ist der belegte MSCI-USD-Net-Return-Rückblick Juli 2011 bis Juli 2026, keine Zukunftszusage.
- Healio-Arbeitgeber-CTA führt zu `/unternehmen` oder `/potenzialanalyse`, niemals zu `/partner`.
- Deutsche Texte verwenden echte Umlaute, 3.000 EUR und keine Gender-Sonderzeichen.
- Neue Verhaltensänderungen folgen Red→Green→Refactor; jede Regression wird zuerst als fehlschlagender Test sichtbar gemacht.

---

### Task 1: Neutrale Healio-Brückenseite

**Files:**
- Create: `src/pages/KassenBoostBridgePage.jsx`
- Create: `src/i18n/locales/de/kassenboost.json`
- Create: `src/i18n/locales/en/kassenboost.json`
- Create: `scripts/check-kassenboost-bridge-contract.mjs`
- Modify: `src/App.jsx`
- Modify: `src/i18n/index.js`
- Modify: `src/components/SEOHead.jsx`
- Modify: `scripts/seo-routes.mjs`
- Modify: `scripts/check-site-seo.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: öffentliche Route `/kassenboost`, englisches Gegenstück `/en/kassenboost`, feste externe URL `https://kassenboost.de/?utm_source=healio&utm_medium=bridge&utm_campaign=kassenboost`.
- Consumes: bestehende `SEOHead`, `Layout`, `useLanguage`, `createWebPageSchema` und Healio-Design-Tokens.

- [ ] **Step 1: Write the failing contract test**

Create `scripts/check-kassenboost-bridge-contract.mjs` with assertions that the route exists, its canonical is `https://healio.de/kassenboost`, the page contains exactly one `kassenboost.de` comparison CTA, no IKK claim, the privacy sentence `Keine Angaben aus deinem Vergleich wurden an Healio übertragen.` and employer CTA `/unternehmen#healio-belegschaft`.

- [ ] **Step 2: Run the contract and verify RED**

Run: `node scripts/check-kassenboost-bridge-contract.mjs`
Expected: FAIL because `src/pages/KassenBoostBridgePage.jsx` does not exist.

- [ ] **Step 3: Implement the minimal bridge**

Create a focused page with four sections: neutral intro, privacy confirmation, three optional protection areas linking to `/leistungen`, and employer path. Register German and English routes, namespaces, canonical/alternate URLs and SEO route entries. Add `test:kassenboost-bridge` to `package.json`.

- [ ] **Step 4: Verify GREEN**

Run: `npm run test:kassenboost-bridge`
Expected: `KassenBoost bridge contract passed.`

- [ ] **Step 5: Run adjacent contracts**

Run: `npm run test:services`
Expected: `Services contract passed.`

Run: `npm run test:seo`
Expected: SEO contract exits 0 and includes the two new public routes.

### Task 2: Arbeitgeberzugang, bAV-Hebel, Entscheidungsrechner und Potenzialanalyse

**Files:**
- Create: `src/lib/bavEmployerLeverage.js`
- Create: `src/components/company/CompanyBavLeverage.jsx`
- Create: `src/pages/EmployerBavCalculatorPage.jsx`
- Create: `scripts/check-bav-employer-leverage.mjs`
- Create: `scripts/check-bav-employer-calculator-contract.mjs`
- Modify: `src/pages/UnternehmenPage.jsx`
- Modify: `src/components/company/CompanyWorkforceConcept.jsx`
- Modify: `src/components/company/CohortImpactSection.jsx` or remove it from the page in favour of `CompanyBavLeverage`
- Modify: `src/i18n/locales/de/unternehmen.json`
- Modify: `src/i18n/locales/en/unternehmen.json`
- Modify: `src/pages/PotenzialanalysePage.jsx`
- Modify: `src/App.jsx`
- Modify: `scripts/seo-routes.mjs`
- Modify: `src/i18n/locales/de/contact.json`
- Modify: `src/i18n/locales/en/contact.json`
- Modify: `scripts/check-company-contract.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `calculateEmployerBavLeverage(...)`, `calculateEmployerPlan(...)` and `calculateBavScenarios({ monthlyContribution, years, annualRates })`; noindex route `/unternehmen/vorsorge-rechner`.
- Consumes: `futureValueOfMonthlyContributions` from `src/lib/companyProjection.js`.

- [ ] **Step 1: Write failing model tests**

Create `scripts/check-bav-employer-leverage.mjs` asserting:

```js
const leverage = calculateEmployerBavLeverage({
  monthlyContribution: 676,
  svFreeAmount: 338,
  employeeSocialRate: 0.2115,
});
assert.equal(leverage.svLiableAmount, 338);
assert.equal(Math.round(leverage.employeeNetImpact * 100) / 100, 71.49);
assert.equal(Math.round(leverage.leverageFactor * 100) / 100, 9.46);
```

Assert scenario values for 676 EUR over 25, 30 and 35 years at relevant market rates with 2.00 percentage points effective-cost reduction, contribution totals, sorted rates and rejection of invalid inputs. Explicitly assert that 10 % gross minus 2 % effective costs produces an 8-% model return. Add a provenance calculation: `(484.83 / 100) ** (1 / 15) - 1` equals approximately 11.10 % p. a.; 11.10 minus 2.00 equals approximately 9.10 %. Keep the 20-year 4-% net model value as a separate technical reference test.

Add the BBG-headroom test for 20 employees, 100 % participation, 3.750 EUR average gross, 676 EUR contribution and 3 Mio. EUR revenue: 162.240 EUR annual bAV contributions, 17.156,88 EUR additional employer social contributions, 179.396,88 EUR full annual employer cost, 19,93 % of payroll and 5,98 % of revenue. Validate salary headroom separately for KV/PV and RV/AV.

- [ ] **Step 2: Verify model RED**

Run: `node scripts/check-bav-employer-leverage.mjs`
Expected: FAIL because the module is missing.

- [ ] **Step 3: Implement pure calculations**

Use the existing month-end contribution formula. Return raw numbers only; formatting and the public rounded `75 EUR` stay in the component/copy layer. Throw `RangeError` for negative amounts, years or rates.

- [ ] **Step 4: Verify model GREEN**

Run: `node scripts/check-bav-employer-leverage.mjs`
Expected: `bAV employer leverage contract passed.`

- [ ] **Step 5: Make the company contract fail for the new journey**

Update `scripts/check-company-contract.mjs` to require `CompanyWorkforceConcept` directly after `CompanyRealityCheck`, require `CompanyBavLeverage`, reject the former 1,000-employee/1.5-vs-7 default contract, require the exact 676/75 wording and visible disclaimer, and require the new `anliegen` options in `PotenzialanalysePage.jsx`. Add a dedicated calculator contract that requires the three result groups, 2026 marker, noindex metadata, 338-EUR explanation, revenue context, die Schnellwerte 4/6/8/10/11,1 %, die sichtbare `10 % − 2 % = 8 %`-Logik, den belegten 15-Jahres-MSCI-Wert 11,10 %, BaFin-Quellenzeile und den payroll-review disclaimer.

- [ ] **Step 6: Verify company contract RED**

Run: `npm run test:company`
Expected: FAIL on missing component/copy/form options.

- [ ] **Step 7: Implement the employer journey**

Move the workforce component near the top, link its main CTA to KassenBoost and its secondary CTA to `/potenzialanalyse?interest=kassenboost`, remove the 3.000-EUR product promise from this entry module, and add a concise bAV leverage section with 25/30/35-year selection plus 2/4/6/8-percent cards. Remove the existing oversized cohort calculator from `/unternehmen`, ohne seine Dateien zu löschen, und verlinke stattdessen auf `/unternehmen/vorsorge-rechner`.

Build the dedicated calculator with compact sliders/presets for workforce size, participation, average gross salary, employer contribution, duration and revenue. Show three separate result groups: company cost, employee effect and capital projection. Use the 2026 BBG headroom per insurance branch, expose assumptions, and never label the projected capital as net pension or guarantee. Make market return adjustable from 0–12 %, with presets 4/6/8/10/11.1 and default 10. Mark 11.1 % as the historical 15-year MSCI USD Net Return observation and place the official source directly in the section. Add a 0.00–4.00-percentage-point effective-cost control with presets 0.90/1.30/1.70/2.00 and default 2.00; display gross rate, cost reduction and net model rate separately. Register the route as `noindex, nofollow`.

Add required `anliegen` with values `kassenboost`, `bav`, `bkv`, `gesamtsystem`, `unsicher`. Preselect `kassenboost` for `?interest=kassenboost`. Require the detailed bAV and bKV selectors only when the selected concern needs them. Preserve the existing Supabase schema by storing explanatory strings in the existing `fokus_bav` and `fokus_bkv` columns; include the concern explicitly in the EmailJS message.

- [ ] **Step 8: Verify company GREEN**

Run: `npm run test:company`
Expected: `Company contract passed.`

Run: `npm run test:bav-model`
Expected: `bAV employer leverage contract passed.`

Run: `npm run test:bav-calculator`
Expected: `bAV employer calculator contract passed.`

### Task 3: KassenBoost-Verlinkung und Unternehmensseite

**Files:**
- Modify: `/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/tests/rendered-html.test.mjs`
- Modify: `/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/tests/e2e/content-pages.spec.ts`
- Modify: `/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/app/page.tsx`
- Modify: `/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/app/ratgeber/page.tsx`
- Modify: `/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/app/components/SiteFooter.tsx`
- Modify: `/Users/franksteinfurt/Frank AI/GKV-Vergleichskampagne/website/app/unternehmen/page.tsx`

**Interfaces:**
- Produces: einheitlicher neutraler Healio-Link `https://healio.de/kassenboost?utm_source=kassenboost&utm_medium=website&utm_campaign=bruecke` und Arbeitgeberlink `https://healio.de/unternehmen#healio-belegschaft`.
- Consumes: die in Task 1 veröffentlichte Healio-Brücke.

- [ ] **Step 1: Add failing SSR and E2E assertions**

Require one neutral result CTA, reject direct `/ambulant`, `/zahn` and `/stationaer` links inside the result bridge, require `Für Unternehmen` in the footer, include `/unternehmen` in canonical/sitemap coverage, and require its CTA to use `/unternehmen` instead of `/partner`.

- [ ] **Step 2: Verify RED**

Run: `npm run build && node --test tests/rendered-html.test.mjs`
Expected: FAIL on the new bridge/footer assertions.

- [ ] **Step 3: Implement minimal KassenBoost changes**

Replace the three result links with one CTA `Möglichkeiten bei Healio ansehen`. Point the Ratgeber bridge to the neutral page without transmitting any funnel values. Add internal `/unternehmen` and external Healio employer navigation. Rewrite the existing company route to promise only the currently verified contribution comparison and private orientation.

- [ ] **Step 4: Verify GREEN**

Run: `npm run build && node --test tests/rendered-html.test.mjs`
Expected: all rendered HTML tests pass.

Run: `npx playwright test tests/e2e/content-pages.spec.ts`
Expected: all content-page tests pass.

### Task 4: Arbeitgebertag- und LinkedIn-Kommunikation dokumentieren

**Files:**
- Create: `/Users/franksteinfurt/Frank AI/Healio/KASSENBOOST-ARBEITGEBERTAG-LINKEDIN-2026-08-19.md`
- Modify: `/Users/franksteinfurt/Frank AI/Healio/STRATEGIE-SYNTHESE-2026-08-19.md`

**Interfaces:**
- Produces: freigabefertiger 60-Sekunden-Pitch, 5-Minuten-Gliederung, Handwerksansprache, LinkedIn-Profilzeile und drei Posts.
- Consumes: exakt die Claims und Grenzen aus der Spec; keine zusätzlichen Rendite- oder Nettorentenversprechen.

- [ ] **Step 1: Write the communication asset**

Include the exact slogans, the 676/75 example, the visible explanation, the separation between employer-funded bAV and salary conversion, the physical-work narrative, die Gesprächslogik des Arbeitgeberrechners, den Default `10−2=8` und den belegten 15-Jahres-Wert `11,10−2=9,10`. Explicitly forbid `2.000–3.000 EUR netto` without tariff-specific evidence and distinguish the historical MSCI USD-/EUR-Reihen from a future product return.

- [ ] **Step 2: Update the strategy synthesis**

Correct the employer CTA from `/partner` to `/unternehmen`, add the neutral brand architecture and record the bAV model as fully employer-funded rather than mixed with salary conversion.

- [ ] **Step 3: Self-check forbidden claims**

Run:

```bash
rg -n "garantiert|sichere Rendite|2\.000.*netto|3\.000.*netto|healio\.de/partner" "/Users/franksteinfurt/Frank AI/Healio/KASSENBOOST-ARBEITGEBERTAG-LINKEDIN-2026-08-19.md"
```

Expected: only explanatory/forbidden-use passages, no promotional guarantee or wrong CTA.

### Task 5: Gesamtprüfung und Veröffentlichung

**Files:**
- Verify all files from Tasks 1–4.
- Update handoff/status documentation only if the implementation changes its documented state.

**Interfaces:**
- Produces: live Healio bridge first, then live KassenBoost links, both visually inspected.

- [ ] **Step 1: Verify Healio completely**

Run relevant contract tests, `npm run lint`, and `npm run build` in the isolated Healio worktree. Expected: exit 0 for every command.

- [ ] **Step 2: Review and deploy Healio**

Review the complete diff for secrets and unrelated changes, commit only the bridge files, push the isolated branch commit to `origin/main`, and wait for `https://healio.de/kassenboost` plus `https://healio.de/unternehmen` to return the new content.

- [ ] **Step 3: Verify KassenBoost completely**

Run `npm run typecheck`, `npm run lint`, `npm run build`, `node --test tests/*.test.mjs`, and `npm run test:e2e`. Expected: 0 failures.

- [ ] **Step 4: Deploy KassenBoost**

Run `npx wrangler deploy` from the verified build. Confirm both `https://kassenboost.de` and `https://www.kassenboost.de` return the new page and all indexable routes return 200.

- [ ] **Step 5: Live visual verification**

Test desktop and 390-pixel mobile flows: KassenBoost compare→result→neutral Healio bridge, KassenBoost company page, Healio bridge, Healio employer page, bAV year selector and Potenzialanalyse preselection. Check console errors, horizontal overflow, keyboard focus and external link targets.

- [ ] **Step 6: Open final preview**

Open the live KassenBoost page in a dedicated large Google Chrome window and leave the primary flow visible for Frank.
