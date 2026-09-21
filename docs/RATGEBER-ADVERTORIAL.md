# Ratgeber und Advertorials auf healio.de

Stand: 21.09.2026 · Branch `feature/ratgeber-advertorial` (setzt auf
`feature/meta-funnel-tracking` auf) · noch nicht in `main`

Der Bereich `/ratgeber` trägt zwei Arten von Seiten: Advertorials für
bezahlte Meta-Anzeigen und später organische Ratgeberartikel. Beide nutzen
dieselbe Vorlage, unterscheiden sich nur in einem Feld und in der
Indexierung.

---

## 1. Was gebaut wurde

| Adresse | Art | Suchmaschine |
|---|---|---|
| `/ratgeber` | Übersicht, schlichte Liste plus Verweis auf `/blog` | indexiert, in der Sitemap |
| `/ratgeber/krankenkassen-bonus-zusatzversicherung` | Advertorial 1 | `noindex, nofollow`, nicht in der Sitemap |

Nur im deutschen Routenbaum. Im englischen Baum gibt es bewusst keine Route.

### Beteiligte Dateien

| Datei | Rolle |
|---|---|
| `src/content/ratgeber/index.js` | Zentrales Inhaltsregister, eine Zeile pro Artikel |
| `src/content/ratgeber/krankenkassen-bonus-zusatzversicherung.js` | Advertorial 1 als strukturierte Daten |
| `src/components/ratgeber/RatgeberArticleLayout.jsx` | Wiederverwendbare Artikelvorlage |
| `src/pages/RatgeberPage.jsx` | Übersichtsseite |
| `src/pages/RatgeberArtikelPage.jsx` | Artikelroute, unbekannter Slug endet auf der 404-Seite |
| `src/lib/ratgeber-cta.js` | Ziel des Buttons samt UTM-Durchreichung |
| `src/App.jsx` | Routen `ratgeber` und `ratgeber/:slug` |
| `src/components/Header.jsx` | `/ratgeber` bekommt den festen, hellen Header |
| `src/lib/meta-pixel.js`, `api/meta-events.js` | Seitenschlüssel `ratgeber` für ViewContent |
| `scripts/seo-routes.mjs`, `public/sitemap.xml` | Titel, Beschreibung, Canonical, Robots |
| `scripts/check-ratgeber-contract.mjs` | Vertragstest, `npm run test:ratgeber` |
| `scripts/check-site-seo.mjs`, `scripts/check-privacy-consent-contract.mjs` | Um die neuen Routen und den vierten Seitenschlüssel erweitert |

### Gestaltung

Eine Textspalte mit `max-w-[68ch]`, große Zeilenhöhe, viel Weißraum, keine
Seitenleiste, keine Bilder, kein zusätzliches Skript. Oben steht der Hinweis
`Anzeige · Ratgeber von Healio` bzw. `Ratgeber von Healio`, gesteuert über
das Feld `kind`. Die Fußzeile des Artikels verlinkt sichtbar Impressum,
Datenschutzerklärung und Erstinformation nach § 15 VersVermV.

Der Button erscheint dreimal: nach dem im Inhalt markierten Abschnitt
(`ctaAfterSectionId`), am Ende des Textes und unter `md` als feste Leiste am
unteren Rand. Die Leiste blendet sich aus, sobald die Artikelfußzeile
sichtbar wird, damit sie nie über den Pflichtangaben liegt.

---

## 2. Ein weiteres Advertorial oder einen Ratgeberartikel anlegen

Drei Schritte, kein neuer Code.

**1. Inhaltsdatei** unter `src/content/ratgeber/<slug>.js` anlegen. Muster ist
`krankenkassen-bonus-zusatzversicherung.js`. Felder:

```js
export const article = {
  slug: 'mein-thema',
  kind: 'advertorial',        // oder 'ratgeber'
  metaTitle: '…',             // mindestens 12 Zeichen
  metaDescription: '…',       // mindestens 35 Zeichen
  listTitle: '…',             // Überschrift in der Übersicht
  listTeaser: '…',
  headline: '…',              // h1
  lead: '…',                  // Vorspann
  sections: [
    {
      id: 'abschnitt-id',
      heading: '…',           // h2
      blocks: [
        { type: 'paragraph', text: '…' },
        { type: 'list', items: ['…', '…'] },
      ],
    },
  ],
  ctaLabel: 'Jetzt Kasse prüfen',
  ctaAfterSectionId: 'abschnitt-id',
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft.',
};
```

**2. Registereintrag** in `src/content/ratgeber/index.js`: importieren und in
`ratgeberArticles` aufnehmen. Die Reihenfolge im Array ist die Reihenfolge in
der Übersicht.

**3. SEO-Eintrag** in `scripts/seo-routes.mjs` mit `path`, `title`,
`description`, `canonical` und `lang: 'de'`. Advertorials bekommen zusätzlich
`robots: 'noindex, nofollow'` und **keinen** Sitemap-Eintrag. Organische
Ratgeberartikel bekommen kein `robots`-Feld und dafür einen Eintrag in
`public/sitemap.xml`. Außerdem den Pfad in `scripts/check-site-seo.mjs` in
`publicRouterPaths` aufnehmen (Advertorials zusätzlich in `noindexPaths`).

Danach `npm run test:ratgeber && npm run test:seo && npm run build`.

### Anrede zurück auf Sie stellen

Die Vorlage enthält keinen Anredetext. Ein Rückwechsel betrifft nur die
jeweilige Inhaltsdatei. Der Vertragstest prüft aktuell, dass kein `Sie` und
kein `Ihr/Ihre` im veröffentlichten Text steht; bei einer Umstellung muss
dieser Block in `scripts/check-ratgeber-contract.mjs` mitgeändert werden.

---

## 3. Das Ziel des Buttons

`src/lib/ratgeber-cta.js` baut die Adresse. Vorbild ist die Konstante
`KASSENBOOST_URL` in `src/pages/KassenbonusPage.jsx`.

- Basis: `https://kassenboost.de/`
- Anker: `#vergleich`, bleibt immer erhalten
- `utm_source`, `utm_medium`, `utm_campaign` und `utm_content` der
  aufrufenden Adresse werden durchgereicht, sofern vorhanden und unverdächtig
  (nur Buchstaben, Ziffern, Punkt, Bindestrich, Unterstrich, höchstens 64
  Zeichen)
- Standardwerte, wenn nichts mitkommt: `utm_source=healio`,
  `utm_medium=advertorial`, `utm_campaign=kassenboost-advertorial-1`
- `utm_content` hat keinen Standard und wird nie erfunden

Ohne UTM in der aufrufenden Adresse lautet das Ziel:

```
https://kassenboost.de/?utm_source=healio&utm_medium=advertorial&utm_campaign=kassenboost-advertorial-1#vergleich
```

Der Link ist extern, öffnet in einem neuen Tab und trägt `rel="noopener"`.
Bewusst ohne `noreferrer`, damit kassenboost.de healio.de als Herkunft sieht.

---

## 4. Tracking

Genutzt wird ausschließlich das vorhandene Modul `src/lib/meta-pixel.js`
(Pixel plus Conversions API, Deduplizierung über `event_id`). Kein zweiter
Pixel, kein zweites Skript. Ohne Zustimmung für den Zweck `marketing`
passiert nichts. Details und Aktivierungsschritte: `docs/META-FUNNEL-TRACKING.md`.

| Ereignis | Wann | Parameter |
|---|---|---|
| `PageView` | Routenwechsel, war bereits vorhanden | keine |
| `ViewContent` | Aufruf von `/ratgeber` und jeder Unterseite | `content_name` = `ratgeber` |
| `Lead` | Klick auf einen der drei Buttons | keine |

Ergänzt wurde nur der Seitenschlüssel: `META_PAGE_KEYS` und
`META_PAGE_KEY_BY_PREFIX` in `src/lib/meta-pixel.js` sowie
`ALLOWED_CONTENT_NAMES` in `api/meta-events.js` kennen jetzt `ratgeber`. Der
Slug des Artikels geht nie an Meta, alle Ratgeberseiten zählen als ein
einziger neutraler Seitenschlüssel. `PageView` und `ViewContent` feuern
weiterhin routenbasiert aus `src/App.jsx`, dort war nichts zu ergänzen.

---

## 5. Phase 2: liegt im KassenBoost-Repo, nicht hier

Zwei Punkte aus dem Briefing (Abschnitt 3, Punkte 5 und 6) gehören nicht in
dieses Repo und sind bewusst nicht gebaut:

1. **Abgeschlossener Check als Ereignis.** Der Check läuft auf
   kassenboost.de. Das Abschluss-Ereignis muss dort ausgelöst werden, auf
   denselben Meta-Datensatz. Solange das fehlt, endet die Messkette hier beim
   `Lead` auf den Button.
2. **E-Mail-Erfassung im Check.** Formular, Einwilligungstext, Verweis auf die
   Datenschutzerklärung und die Frage, wohin die Adressen gespeichert werden
   und welches Werkzeug die Nachfass-Mails verschickt. Alles im
   KassenBoost-Repo und erst nach Franks Entscheidung.

---

## 6. Tests

```bash
npm run test:ratgeber   # Vertragstest dieses Bereichs
npm run test:privacy    # Meta-Funnel inklusive des neuen Seitenschlüssels
npm run test:seo        # Routen, Canonicals, Sitemap, Noindex
npm run test:seo:rendered
npm run lint
npm run build
```

`scripts/check-ratgeber-contract.mjs` prüft: beide Routen im Router und keine
englische Route, Advertorial auf `noindex, nofollow` und nicht in der
Sitemap, Übersicht indexiert und in der Sitemap, drei Buttons mit
KassenBoost-Ziel und `#vergleich`, UTM-Durchreichung und Standardwerte, den
Hinweis „Anzeige“, die drei Pflichtlinks, keine eckigen Klammern und keine
Gedankenstriche im veröffentlichten Text, keine Sie-Anrede. Liegt bereits ein
`dist` vor, wird zusätzlich das ausgelieferte HTML gegengeprüft.

Einen projektweiten Sammel-Test gibt es in `package.json` nicht;
`test:ratgeber` steht deshalb als eigenes Skript neben den anderen
`check-*`-Verträgen.

Bekannt rot, schon vor diesem Branch und hier nicht angefasst:
`test:security`, `test:form-hardening`, `test:pregnancy`, `test:whatsapp`.

---

## 7. Offene Punkte

Aus Briefing Abschnitt 7:

- [ ] Bonuszahlen (350 bis 500 Euro, 1.155 Euro) gegen die aktuelle Satzung
      der IKK Classic prüfen und im Text mit Jahreszahl versehen. Die Quellen
      stehen im Briefing, Abschnitt 9.
- [ ] Tritt Frank persönlich im Text auf? Der Satz „Ich selbst komme auf rund
      600 Euro im Jahr.“ liegt als auskommentierter Block in
      `src/content/ratgeber/krankenkassen-bonus-zusatzversicherung.js` und
      wird nicht gerendert. Zum Aktivieren einkommentieren.
- [ ] Die Zahl „93 gesetzliche Krankenkassen“ ist wortgleich aus dem Briefing
      übernommen und **nicht belegt**. Entweder mit Quelle und Stichtag
      versehen oder allgemeiner formulieren.
- [ ] Wohin gehen die E-Mail-Adressen aus dem Check, und welches Werkzeug
      verschickt die vier Nachfass-Nachrichten? Siehe Phase 2.
- [x] Soll das Advertorial auf noindex stehen? Ja, entschieden: `noindex,
      nofollow`. Die Übersicht `/ratgeber` bleibt indexiert.
- [x] Lädt der Meta-Pixel wirklich erst nach Einwilligung? Ja, technisch
      erzwungen in `src/lib/meta-pixel.js`, geprüft von `test:privacy`.

Zusätzlich aufgefallen:

- [ ] **Anrede.** Entschieden wurde Du, weil `/ambulant`, `/zahn` und
      `/kassenbonus` Du sprechen. Das Briefing sah Sie vor. Der Text ist sonst
      wortgleich. Eine Stelle musste dafür umgestellt werden: aus „Sie holen
      sich nur das Geld dafür nicht ab.“ wurde „Nur das Geld dafür holen sie
      sich nicht ab.“, weil das „Sie“ dort die meisten Menschen meint und in
      der Du-Fassung als Anrede missverstanden würde. Die Wortwahl entspricht
      Anzeigenvariante 2 aus dem Briefing.
- [ ] **Zahn-Sofortschutz.** Der Satz „Laufende oder bereits angeratene
      Behandlungen sind nicht versichert.“ ist als allgemeine Aussage für den
      Zahn-Sofortschutz ungenau. Der Text wurde nicht geändert, weil das
      Advertorial von ambulanter Zusatzversicherung spricht. Vor einem
      Advertorial mit Zahn-Bezug muss der Satz differenziert werden.
- [ ] **Datenschutzerklärung.** Vor der Aktivierung des Pixels fehlt weiterhin
      der Meta-Abschnitt in der Datenschutzerklärung, siehe
      `docs/META-FUNNEL-TRACKING.md`, Abschnitt 3.
- [ ] **Advertorial 2 und 3** (Therapieabbruch bei Naturheilkunde, Brille als
      Rechenbeispiel) sowie drei bis fünf organische Ratgeberartikel sind noch
      nicht geschrieben. Die Vorlage liegt dafür bereit.
