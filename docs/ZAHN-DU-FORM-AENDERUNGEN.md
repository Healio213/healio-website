# /zahn: Du-Form und Leser-Perspektive (Jonas-Eisert-Regeln)

Stand: 21.09.2026 · Branch `feature/zahn-du-form`

Umgeschrieben wurden die deutschen Texte der Seite healio.de/zahn:

- `src/i18n/locales/de/zahn.json` (33 Textstellen)
- `src/components/sections/dental/dentalContent.js`, deutscher Block (12 Textstellen)
- `src/i18n/locales/de/seo.json`, Eintrag `zahn.title` (1 Textstelle)

Englische Texte (`en/`), `zahnaerzte.json` und alle Zahlen, Tarifnamen, Leistungsgrenzen
und Pflichthinweise bleiben unverändert.

## Zählungen `src/i18n/locales/de/zahn.json`

| Wort (exakt, `grep -ow`) | vorher | nachher |
| --- | --- | --- |
| Sie | 9 | 0 |
| Ihr | 1 | 0 |
| Ihre | 3 | 0 |
| Ihren | 1 | 0 |
| Ihnen | 0 | 0 |
| wir | 4 | 0 |
| unser | 2 | 0 |
| unsere | 1 | 0 |
| individuell | 1 | 0 |
| digital / innovativ / unkompliziert / flexibel / ganzheitlich | 0 | 0 |
| maßgeschneidert | 1 | 0 |
| Gedankenstrich (–) | 4 | 0 |

`src/components/sections/dental/dentalContent.js`, deutscher Block: Wir/wir von 13 auf 2
reduziert. Die beiden verbliebenen Stellen sind Pflicht- und Vertrauenshinweise und wurden
bewusst nicht umformuliert:

- „Wir versprechen keine Annahme. Verbindlich entscheidet immer der Versicherer.“
- „Healio ist als Versicherungsmakler registriert. Wir trennen Orientierung, Tarifberechnung
  und verbindliche Annahme …“ (FAQ-Antwort zur Registrierung, kein vorangestelltes Berufslabel
  in Überschriften oder Hero)

Sie/Ihr/Ihnen in `dentalContent.js`, `ZahnPage.jsx`, `DentalZahnCheck.jsx`,
`DentalBenefits.jsx`, `DentalInsurerChoice.jsx`: vorher 0, nachher 0.

## Faktencheck Alt → Neu

Keine Zahl, kein Prozentwert, keine Tarifbezeichnung, keine Leistungsgrenze und kein
Betrag wurde geändert. Vier Stellen haben einen geänderten Wortlaut bei einer Bedingung
oder einer Zuordnung und werden deshalb hier ausgewiesen:

| Schlüssel | Alt | Neu | Begründung |
| --- | --- | --- | --- |
| `zahn.json` `hero.subtitle` | „… bis zu 100 % refinanzieren, wie viel genau, prüfen wir individuell mit dir.“ | „… bis zu 100 % refinanzieren, wie viel genau, hängt von den Bonusmaßnahmen ab, die du erfüllst.“ | Floskel „individuell“ ersetzt. Die Aussage bleibt: die Höhe ist nicht pauschal. Formulierung deckungsgleich mit `faq` („hängt von deinen Aktivitäten und den jeweiligen Bedingungen ab“). Der Wert „bis zu 100 %“ ist unverändert. |
| `zahn.json` `check.disclaimer` | „Der Check ersetzt keine individuelle Beratung.“ | „Der Check ersetzt keine persönliche Beratung.“ | Nur Wortwahl wegen der Floskel-Regel, inhaltlich identischer Hinweis. Der Satz davor („Verbindlich geprüft wird die Annahme erst im Antrag …“) bleibt wörtlich. |
| `zahn.json` `zahnzusatz.hero.subtitle` | „Wir übernehmen die Kosten, die Ihre Krankenkasse nicht zahlt.“ | „Die Kosten, die deine Krankenkasse nicht zahlt, übernimmt deine Zusatzversicherung.“ | Perspektivwechsel. Zahlende Stelle korrekt benannt: nicht Healio, sondern der Tarif. Leistungsumfang unverändert. |
| `seo.json` `zahn.title` | `Zahnzusatzversicherung – Bis zu 100% Erstattung \| Healio` | `Zahnzusatzversicherung: Bis zu 100% Erstattung \| Healio` | Gedankenstrich raus, Schreibweise identisch zu `scripts/seo-routes.mjs`. Keine inhaltliche Änderung. `zahn.description` unverändert. |

Reine Zuordnungs-Umformulierungen ohne Faktenwirkung (gleicher Bezug, nur ohne Wir/Unser):
„unsere beiden Online-Strecken“ → „die beiden Online-Strecken hier“, „unsere beiden
Partner-Versicherer“ → „die beiden Partner-Versicherer hier“, „unser Preis-Leistungs-Tipp“
→ „der Preis-Leistungs-Tipp dieser Seite“, „Kein anderer unserer Wege“ → „auf keinem der
anderen Wege hier“.

## Tests

`npm run build` grün. Grün sind ebenfalls: `lint`, `test:homepage`, `test:company`,
`test:friendly-icons`, `test:services`, `test:kassenboost-bridge`, `test:kassenboost-rendered`,
`test:bav-model`, `test:bav-calculator`, `test:first-information`, `test:partner`,
`test:hebammen`, `test:dentists`, `test:zahn-checklist`, `test:blog-cta`, `test:blog-seo`,
`test:blog-build`, `test:block3-content`, `test:conversion`, `test:ambulant-bonus-model`,
`test:ambulant-bonus-rendered`, `test:privacy`, `test:contact-ui`, `test:about`,
`test:nita-knowledge`, `test:seo`, `test:llms-geo`, `test:prerender-resilience`,
`test:appointment`, `test:seo:rendered`.

Kein Vertragstest prüft die geänderten Textstellen, deshalb wurde kein Test angepasst.

Drei Skripte schlagen fehl, und zwar identisch auf HEAD ohne diese Änderungen
(per `git stash` gegengeprüft, also vorbestehend und nicht durch die Textarbeit verursacht):

- `test:security` → `check-form-hardening-contract.mjs`: „src/components/PregnancyBonusExample.jsx: Honeypot-Abbruch fehlt.“
- `test:whatsapp` → `check-whatsapp-contact-rendered.mjs`: Navigationsfehler beim Puppeteer-Aufruf.
- `test:pregnancy` → `check-pregnancy-integration.mjs`: „Der allgemeine Hero darf durch den Herkunftszweig nicht neu getextet werden.“
