# Healio Insurance-First Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the B2B-first root page with a fast, accessible, visually distinctive homepage that positions Healio as the digital broker for ambulant, dental and hospital supplementary insurance.

**Architecture:** Keep all existing product and audience routes intact. Build the new root experience from focused components under `src/components/home`, keep the 3D hero isolated behind a lazy boundary and a static fallback, and switch the global header CTA according to the active route. Localized content stays in the existing `home` and `common` namespaces, while `MainHomePage` owns composition and root SEO.

**Tech Stack:** React 18, React Router 6, Vite 4, Tailwind CSS 3, Framer Motion 10, Three.js 0.184, i18next, React Helmet.

## Global Constraints

- The visible hero must say `Krankenzusatzversicherung` in German and `Supplementary health insurance` in English.
- `3.000 EUR in 2 Jahren` belongs only to the ambulant product context.
- The German consumer homepage uses `du`; company pages may keep `Sie`.
- Existing routes `/ambulant`, `/zahn`, `/stationaer`, `/unternehmen` and `/partner` must not change.
- Existing referrer capture in `useReferrer` must remain active.
- Three.js must load in a separate lazy chunk and must not block visible hero copy or CTAs.
- Static fallback, `prefers-reduced-motion`, keyboard focus, WCAG-AA contrast and no-WebGL behavior are required.
- The floating Nita/ElevenLabs widget must not overlap hero copy or CTAs on mobile.
- Do not modify or stage `.claude/launch.json`.
- Do not deploy production as part of this implementation.

---

## File Map

**Create**

- `scripts/check-homepage-contract.mjs`: deterministic source/content contract checks without introducing a test framework.
- `src/components/home/HomeHero.jsx`: semantic hero copy, anchors and lazy 3D boundary.
- `src/components/home/HomeProtectionScene.jsx`: Three.js scene lifecycle, resize handling and cleanup.
- `src/components/home/InsurancePathway.jsx`: three product entry cards.
- `src/components/home/HowHealioWorks.jsx`: four-step service explanation and app visual.
- `src/components/home/AmbulantBudgetFeature.jsx`: ambulant-only 3.000-EUR story.
- `src/components/home/HomeTrust.jsx`: broker role and service trust signals.
- `src/components/home/AudienceLinks.jsx`: secondary company and practice entries.
- `src/components/home/HomeFinalCTA.jsx`: final category choice and consultation link.

**Modify**

- `package.json`: add the `test:homepage` contract command.
- `src/pages/MainHomePage.jsx`: compose the new sections and root schema.
- `src/components/Header.jsx`: new navigation labels and route-aware CTA.
- `src/components/Layout.jsx`: avoid the old corporate footer CTA on the new root page.
- `src/i18n/locales/de/home.json`: German homepage content.
- `src/i18n/locales/en/home.json`: English homepage content.
- `src/i18n/locales/de/common.json`: new navigation and CTA labels.
- `src/i18n/locales/en/common.json`: English navigation and CTA labels.
- `src/index.css`: Manrope import, homepage focus/motion utilities and mobile widget safe zone.
- `tailwind.config.js`: homepage color and font tokens.
- `index.html`: static root metadata, preload cleanup, JSON-LD and mobile widget positioning.
- `src/lib/createSchemaMarkup.js`: organization description aligned with Healio's broker role.

---

### Task 1: Add the homepage contract and localized content

**Files:**

- Create: `scripts/check-homepage-contract.mjs`
- Modify: `package.json`
- Modify: `src/i18n/locales/de/home.json`
- Modify: `src/i18n/locales/en/home.json`

**Interfaces:**

- Consumes: existing JSON namespaces `home` and `common`.
- Produces: translation keys under `hero`, `products`, `process`, `budget`, `trust`, `audiences`, `finalCta`, and `seo`; command `npm run test:homepage`.

- [ ] **Step 1: Write the failing homepage contract**

Create a Node script using `node:assert/strict`, `node:fs` and `node:path`. It must parse both home locale files and assert these exact values and arrays:

```js
assert.equal(de.hero.title, 'Krankenzusatzversicherung, einfach digital.');
assert.equal(en.hero.title, 'Supplementary health insurance, made simple.');
assert.equal(de.products.items.length, 3);
assert.deepEqual(de.products.items.map((item) => item.routeKey), ['ambulant', 'zahn', 'stationaer']);
assert.equal(de.budget.amount, '3.000 EUR');
assert.equal(de.audiences.items.length, 2);
assert.deepEqual(de.audiences.items.map((item) => item.routeKey), ['unternehmen', 'partner']);
assert.match(de.seo.title, /Krankenzusatzversicherung/);
```

Add this package script:

```json
"test:homepage": "node scripts/check-homepage-contract.mjs"
```

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:homepage`

Expected: FAIL because `products`, `process`, `budget`, `trust`, `audiences` and `finalCta` do not exist yet.

- [ ] **Step 3: Add the complete German and English content objects**

Use these exact structural contracts in both locale files:

```json
{
  "hero": {
    "eyebrow": "Dein digitaler Versicherungsmakler",
    "title": "Krankenzusatzversicherung, einfach digital.",
    "description": "Ambulant, Zahn oder stationär: Wir zeigen dir verständlich, welcher Schutz zu deinem Leben passt – und begleiten dich auch nach dem Abschluss.",
    "primaryCta": "Schutz auswählen",
    "secondaryCta": "So funktioniert Healio",
    "sceneLabel": "Drei Schutzbereiche. Ein digitaler Begleiter."
  },
  "products": {
    "eyebrow": "Dein Schutz",
    "title": "Wähle, was du besser absichern möchtest.",
    "description": "Jeder Bereich führt dich direkt zu den passenden Leistungen und nächsten Schritten.",
    "items": [
      {"key":"ambulant","routeKey":"ambulant","label":"Ambulant","title":"Mehr Budget für Gesundheit","description":"Heilpraktiker, Osteopathie, Brille und Vorsorge – mit bis zu 3.000 EUR Gesundheitsbudget in 2 Jahren.","cta":"Ambulanten Schutz ansehen"},
      {"key":"dental","routeKey":"zahn","label":"Zahn","title":"Starker Schutz für dein Lächeln","description":"Zahnersatz, Zahnbehandlung und Vorsorge verständlich absichern.","cta":"Zahnschutz ansehen"},
      {"key":"hospital","routeKey":"stationaer","label":"Stationär","title":"Im Krankenhaus besser versorgt","description":"Einbettzimmer, Spezialisten und freie Klinikwahl – abhängig vom gewählten Tarif.","cta":"Klinikschutz ansehen"}
    ]
  }
}
```

The English file must mirror every key and keep `routeKey` values unchanged.

- [ ] **Step 4: Run the contract and lint JSON imports**

Run: `npm run test:homepage`

Expected: PASS with `Homepage contract passed.`

- [ ] **Step 5: Commit the content contract**

```bash
git add package.json scripts/check-homepage-contract.mjs src/i18n/locales/de/home.json src/i18n/locales/en/home.json
git commit -m "test: define homepage content contract"
```

---

### Task 2: Establish the visual foundation and route-aware navigation

**Files:**

- Modify: `src/i18n/locales/de/common.json`
- Modify: `src/i18n/locales/en/common.json`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Layout.jsx`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**

- Consumes: `useLanguage().getPath`, current `location.pathname`, anchors `#schutz` and `#so-funktioniert`.
- Produces: route-aware header CTA and Tailwind tokens `home-midnight`, `home-ice`, `home-mint`, `font-display`.

- [ ] **Step 1: Extend the contract for navigation and tokens**

Assert that the German common namespace contains:

```js
assert.equal(deCommon.nav.versicherungen, 'Versicherungen');
assert.equal(deCommon.nav.unternehmen, 'Für Unternehmen');
assert.equal(deCommon.nav.partner, 'Für Praxen');
assert.equal(deCommon.nav.ratgeber, 'Ratgeber');
assert.equal(deCommon.nav.schutzWaehlen, 'Schutz auswählen');
```

Also assert `src/index.css` contains `family=Manrope` and `tailwind.config.js` contains `'home-midnight': '#07111F'`.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:homepage`

Expected: FAIL on the first missing navigation key.

- [ ] **Step 3: Add navigation keys and visual tokens**

Add German/English labels for `versicherungen`, `unternehmen`, `partner`, `about`, `ratgeber`, `schutzWaehlen`, `beratung` and `toggleDropdown`.

Add Tailwind tokens:

```js
'home-midnight': '#07111F',
'home-slate': '#46515E',
'home-mint': '#25C990',
'home-mint-active': '#5EE0B1',
'home-ice': '#F4FAF7'
```

Add font families:

```js
fontFamily: {
  display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

- [ ] **Step 4: Refactor Header and Layout**

Use `isHome`, `isCompany` and `isPartner` booleans. On home, render `<a href="#schutz">`; on company link to `potenzialanalyse`; on partner link to `terminvereinbarung`; otherwise keep the consultation route. Replace the old `Für Heilberufe` and `Kontakt` top-level items with `Über Healio` and `Ratgeber`. Keep pet insurance inside the insurance dropdown but not on the homepage cards.

Change `Layout` so the old footer CTA is shown only on `/partner` and `/en/partner`.

- [ ] **Step 5: Run contract, lint and build**

Run: `npm run test:homepage`

Expected: PASS.

Run: `npm run lint`

Expected: exit 0.

Run: `npm run build`

Expected: Vite build succeeds and static SEO pages are generated.

- [ ] **Step 6: Commit the foundation**

```bash
git add src/components/Header.jsx src/components/Layout.jsx src/i18n/locales/de/common.json src/i18n/locales/en/common.json src/index.css tailwind.config.js scripts/check-homepage-contract.mjs
git commit -m "feat: align navigation with insurance homepage"
```

---

### Task 3: Build the accessible hero and lazy 3D protection scene

**Files:**

- Create: `src/components/home/HomeHero.jsx`
- Create: `src/components/home/HomeProtectionScene.jsx`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**

- `HomeHero(): JSX.Element` consumes `home.hero` translations.
- `HomeProtectionScene({ reducedMotion: boolean }): JSX.Element` renders a decorative canvas and owns all Three.js cleanup.
- Produces DOM anchors to `#schutz` and `#so-funktioniert`.

- [ ] **Step 1: Extend the contract for hero accessibility**

Assert both files exist, `HomeHero.jsx` contains `id="home-hero-heading"`, and `HomeProtectionScene.jsx` contains `renderer.dispose()`, `cancelAnimationFrame`, and `aria-hidden="true"`.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:homepage`

Expected: FAIL because `HomeHero.jsx` does not exist.

- [ ] **Step 3: Implement HomeProtectionScene**

Create one central rounded `THREE.Mesh` protection pass and three labeled orbit modules. Use `CanvasTexture` for short labels, a low-poly ring and soft point lights. Cap `renderer.setPixelRatio` at `1.5`, resize with `ResizeObserver`, stop animation for reduced motion, and clean up geometries, materials, textures, the observer, frame id and renderer on unmount.

The component returns a canvas container plus an always-visible CSS fallback with the three labels. Hide the fallback only after the first successful rendered frame.

- [ ] **Step 4: Implement HomeHero**

Use a dark split layout, one semantic H1, normal HTML links, a `Suspense` fallback and a small `useEffect` media-query listener for `prefers-reduced-motion`. Keep text before canvas in DOM and visual order on mobile. In a second effect, add `home-hero-active` to `document.documentElement`, toggle `home-hero-passed` when `window.scrollY > window.innerHeight * 0.65`, and remove both classes plus the scroll listener on unmount.

- [ ] **Step 5: Run contract, lint and build**

Run: `npm run test:homepage && npm run lint && npm run build`

Expected: all commands exit 0; build output includes a separate Three.js/home scene chunk.

- [ ] **Step 6: Commit the hero**

```bash
git add src/components/home/HomeHero.jsx src/components/home/HomeProtectionScene.jsx scripts/check-homepage-contract.mjs
git commit -m "feat: add Healio protection hero"
```

---

### Task 4: Build product selection and the Healio service story

**Files:**

- Create: `src/components/home/InsurancePathway.jsx`
- Create: `src/components/home/HowHealioWorks.jsx`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**

- `InsurancePathway(): JSX.Element` consumes `home.products.items` and `getPath(routeKey)`.
- `HowHealioWorks(): JSX.Element` consumes `home.process.steps` and the existing `/images/healio-app-dashboard.png` asset.

- [ ] **Step 1: Extend the contract for product routes and section anchors**

Assert `InsurancePathway.jsx` contains `id="schutz"`, `getPath(item.routeKey)` and exactly the icon mapping keys `ambulant`, `dental`, `hospital`. Assert `HowHealioWorks.jsx` contains `id="so-funktioniert"` and the app image path.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:homepage`

Expected: FAIL because the new component files do not exist.

- [ ] **Step 3: Implement InsurancePathway**

Build three large cards with distinct restrained visual motifs: a flowing path for ambulant, a precise arc for dental and layered vertical planes for hospital. Use Lucide icons only as supporting marks. Each card has one translated CTA and a visible focus ring.

- [ ] **Step 4: Implement HowHealioWorks**

Render four ordered steps with real sequence numbering and a companion app panel. Keep the app panel secondary to the process copy and use `loading="lazy"` for the image.

- [ ] **Step 5: Run checks and commit**

Run: `npm run test:homepage && npm run lint && npm run build`

Expected: all commands exit 0.

```bash
git add src/components/home/InsurancePathway.jsx src/components/home/HowHealioWorks.jsx scripts/check-homepage-contract.mjs
git commit -m "feat: add homepage insurance pathways"
```

---

### Task 5: Add the ambulant highlight, trust, audiences and final decision

**Files:**

- Create: `src/components/home/AmbulantBudgetFeature.jsx`
- Create: `src/components/home/HomeTrust.jsx`
- Create: `src/components/home/AudienceLinks.jsx`
- Create: `src/components/home/HomeFinalCTA.jsx`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**

- Each component is translation-driven and uses existing `getPath` route keys.
- `AmbulantBudgetFeature` is the only homepage component allowed to render `3.000 EUR`.

- [ ] **Step 1: Add exclusivity checks for the budget claim**

Read all files under `src/components/home`. Strip `AmbulantBudgetFeature.jsx` from the list and assert no remaining source contains `3.000 EUR` or `3,000 EUR`. Assert the four new files exist.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:homepage`

Expected: FAIL because the four files do not exist.

- [ ] **Step 3: Implement the four sections**

`AmbulantBudgetFeature` uses a large numeric panel, clearly labels `in 2 Jahren`, explains tariff and bonus dependence, and links only to `ambulant`.

`HomeTrust` renders four concise facts: independent broker, understandable comparison, personal contact and continued app/service support. Do not add unverifiable customer counts or ratings.

`AudienceLinks` renders two secondary links only: company and practice.

`HomeFinalCTA` renders category links for ambulant, dental and hospital plus a consultation link to `terminvereinbarung`.

- [ ] **Step 4: Run checks and commit**

Run: `npm run test:homepage && npm run lint && npm run build`

Expected: all commands exit 0.

```bash
git add src/components/home/AmbulantBudgetFeature.jsx src/components/home/HomeTrust.jsx src/components/home/AudienceLinks.jsx src/components/home/HomeFinalCTA.jsx scripts/check-homepage-contract.mjs
git commit -m "feat: complete homepage decision journey"
```

---

### Task 6: Integrate the root page and update static SEO

**Files:**

- Modify: `src/pages/MainHomePage.jsx`
- Modify: `src/lib/createSchemaMarkup.js`
- Modify: `index.html`
- Modify: `scripts/check-homepage-contract.mjs`

**Interfaces:**

- `MainHomePage` imports all homepage sections and provides the root `SEOHead` schema array.
- Static and runtime metadata use the same root positioning.

- [ ] **Step 1: Extend the contract for composition and SEO**

Assert `MainHomePage.jsx` contains all eight homepage imports and none of `BavProviderComparison`, `CompoundInterestCalculator`, `CombinedZeitfalleRenditeSection`, `GesundheitSection`, `WhyBkvWithHealio`, or `Contact`. Assert `index.html` contains `Krankenzusatzversicherung einfach digital | Healio` and no `Healio B2B`.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run test:homepage`

Expected: FAIL on the old B2B composition.

- [ ] **Step 3: Replace MainHomePage composition**

Render sections in this order:

```jsx
<HomeHero />
<InsurancePathway />
<HowHealioWorks />
<AmbulantBudgetFeature />
<HomeTrust />
<AudienceLinks />
<HomeFinalCTA />
```

Use root translations for title, description and Open Graph. Build schema from `createOrganizationSchema()` plus three `createServiceSchema()` calls whose service types are ambulant, dental and hospital supplementary insurance.

- [ ] **Step 4: Update static metadata and widget safe zone**

Replace B2B title, description, keywords, OG, Twitter and JSON-LD in `index.html`. Remove obsolete `hero-bg` preloads because the new hero uses a CSS fallback and lazy WebGL. On screens below 768px, position `elevenlabs-convai` at `right: 12px; top: auto; bottom: 16px; transform: none;` and hide it until the document receives the `home-hero-passed` class or the user scrolls beyond the first viewport.

- [ ] **Step 5: Run full static checks**

Run: `npm run test:homepage`

Expected: PASS.

Run: `npm run lint`

Expected: exit 0.

Run: `npm run build`

Expected: exit 0 and generated `/dist/index.html` contains the new root title.

- [ ] **Step 6: Commit the integration**

```bash
git add src/pages/MainHomePage.jsx src/lib/createSchemaMarkup.js index.html scripts/check-homepage-contract.mjs
git commit -m "feat: launch insurance-first homepage"
```

---

### Task 7: Visual verification and user-facing results

**Files:**

- Modify only files with defects found during verification.
- Save screenshots outside the repo under `/private/tmp/healio-homepage-preview/`.

**Interfaces:**

- Consumes: local Vite server at `http://127.0.0.1:3000/`.
- Produces: verified desktop and mobile screenshots and a concise results summary.

- [ ] **Step 1: Start the local preview**

Run: `npm run dev`

Expected: Vite serves the site on port 3000 without startup errors.

- [ ] **Step 2: Verify desktop**

Use the in-app browser at 1440×900 and 1280×720. Verify the H1, hero CTAs, 3D fallback/scene, all section transitions, route links, focus states and absence of console errors. Capture a hero screenshot and one full-page or representative lower-page screenshot.

- [ ] **Step 3: Verify mobile and reduced motion**

Use 390×844 and inspect 320px width. Confirm no horizontal overflow, no Nita overlap, correct hero order, usable cards, and visible CTAs. Emulate reduced motion or disable the animation path and verify the static fallback remains complete.

- [ ] **Step 4: Verify regression routes**

Open `/ambulant`, `/zahn`, `/stationaer`, `/unternehmen` and `/partner`. Confirm each returns the original H1. Confirm `/unternehmen` uses the potential-analysis CTA, `/partner` uses the consultation CTA, and each product route retains the general consultation CTA.

- [ ] **Step 5: Fix only observed defects and rerun checks**

Run: `npm run test:homepage && npm run lint && npm run build`

Expected: all commands exit 0.

- [ ] **Step 6: Commit verification fixes if needed**

If verification changed homepage files, inspect `git status --short`, stage only the files changed during Task 7, and commit them with `git commit -m "fix: polish homepage responsive behavior"`. If verification required no code change, record that no additional commit was necessary.

- [ ] **Step 7: Present the result**

Show the desktop and mobile screenshots to Frank. Report changed paths, test results, the untouched `.claude/launch.json` modification, and that production is not deployed. If a safe public preview is requested after visual approval, use a non-production preview flow and set `noindex, nofollow`.
