# Meta-Funnel-Tracking für healio.de

Stand: 21.09.2026 · Branch `feature/meta-funnel-tracking` · noch nicht in `main`

Meta-Pixel plus Conversions API (CAPI) mit Ereignis-Deduplizierung, hinter dem
bestehenden Consent-Manager. Umsetzung nach Jonas Eiserts Schritt 7.

**Der Code ist ohne Konfiguration vollständig inaktiv.** Solange Frank keine
Pixel-ID und kein Token setzt, wird kein Skript geladen, kein Ereignis
gesendet und kein Cookie geschrieben. Es fließt kein Werbeeuro.

---

## 1. Architektur: Consent → Pixel → CAPI → Dedup

```
Besucher ruft healio.de auf
        │
        ▼
ConsentManager (Banner / Einstellungen)
        │  Zweck "marketing", Standard: AUS
        │
        ├── keine Zustimmung ──► Ende. Kein fbevents.js, kein fbq,
        │                        keine _fbp/_fbc-Cookies, kein CAPI-Aufruf.
        │
        └── Zustimmung erteilt
                │
                ▼
        src/lib/meta-pixel.js
                │  prüft zusätzlich:
                │   • VITE_META_PIXEL_ID gesetzt?      sonst Ende
                │   • Route nicht gesperrt?            sonst Ende
                │
                ├─► lädt https://connect.facebook.net/en_US/fbevents.js
                │   fbq('consent','revoke') → autoConfig=false → init → grant
                │
                ▼
        Ereignis wird ausgelöst
                │  event_id = crypto.randomUUID()
                │
        ┌───────┴────────────────────────────┐
        ▼                                    ▼
  Browser-Pixel                        Server (CAPI)
  fbq('track'|'trackCustom',           POST /api/meta-events
      name, customData,                  ├─ Origin-Prüfung
      { eventID })                       ├─ Whitelist der 4 Ereignisnamen
                                         ├─ Pfad-/Query-Bereinigung erneut
                                         └─ POST graph.facebook.com/v21.0/
                                              {PIXEL_ID}/events
                                            action_source: website
                                            event_time: jetzt
        └───────┬────────────────────────────┘
                ▼
        Meta erhält dasselbe Ereignis zweimal mit identischer event_id
        und zählt es genau einmal (Deduplizierung).
```

Warum beide Wege: Der Browser-Pixel wird von Adblockern und ITP häufig
geblockt, die CAPI nicht. Die gemeinsame `event_id` verhindert, dass daraus
doppelte Conversions werden.

### Beteiligte Dateien

| Datei | Rolle |
|---|---|
| `src/lib/consent.js` | Zweck `marketing`, Standard `false` |
| `src/components/ConsentManager.jsx` | Texte de/en für den Zweck |
| `src/lib/meta-pixel.js` | Einziger Ausgang für alle Meta-Ereignisse |
| `api/meta-events.js` | CAPI-Relay, hält Token serverseitig |
| `src/App.jsx` | PageView und ViewContent bei Routenwechsel |
| `src/lib/sdk-url.js` | RechnerStart (Beitragsrechner), Lead (Bonus sichern) |
| `src/pages/ZahnPage.jsx` | RechnerStart auf /zahn |
| `src/services/emailjsService.js` | Lead bei abgeschicktem Kontaktformular |
| `src/components/CalendlyEmbed.jsx`, `src/components/ExternalProviderGate.jsx` | Lead beim Terminlink |
| `scripts/check-privacy-consent-contract.mjs` | Vertragstest, `npm run test:privacy` |
| `vercel.json` | CSP (Report-Only) um die Meta-Hosts erweitert |
| `.env.example` | Dokumentation der Variablen, keine echten Werte |

---

## 2. Ereignistabelle

Es gibt genau vier Ereignisse. Mehr nimmt weder der Client noch die
Serverfunktion an.

| Ereignis | Typ | Wann | Parameter | Auslöser im Code |
|---|---|---|---|---|
| `PageView` | Standard | Bei jedem Routenwechsel | keine | `src/App.jsx` |
| `ViewContent` | Standard | Auf /zahn, /ambulant, /partner (inkl. /en-Pendants) | `content_name` = `zahn` \| `ambulant` \| `partner` | `src/App.jsx` |
| `RechnerStart` | Custom | Klick auf den primären Rechner-CTA auf /ambulant und /zahn | keine | `trackSdkClick()`, `scrollToCheck()` in `ZahnPage.jsx` |
| `Lead` | Standard | Kontaktformular abgeschickt, Terminlink geklickt, „Bonus sichern“ geklickt | keine | `emailjsService`, `trackIkkClick()`, `CalendlyEmbed`, `ExternalProviderGate` |

### Was NICHT übertragen wird

- Keine E-Mail-Adresse, kein Name, keine Telefonnummer, keine Adresse.
- Kein Automatic Advanced Matching (`fbq('set','autoConfig',false,...)`
  schaltet zusätzlich die automatische Button- und Formularerfassung ab).
- **Keine einzige Antwort** aus dem Zahn-Check, dem Budget-Kompass, dem
  Bonusrechner oder einer anderen Auswahlhilfe. Der Zahn-Check
  (`DentalZahnCheck.jsx`) importiert bewusst nichts aus diesem System; der
  Vertragstest erzwingt das.
- Kein Hashing nötig, weil es nichts zu hashen gibt.

Übertragen werden nur: Ereignisname, `event_id`, `event_source_url`,
`event_time`, `action_source`, optional `content_name`, sowie serverseitig
`client_ip_address`, `client_user_agent` und – falls vorhanden – `fbp`/`fbc`.

### Bereinigung der `event_source_url`

Client und Server entfernen unabhängig voneinander alle Query-Parameter außer
`utm_*` und `fbclid`, der Hash fällt weg.

```
https://healio.de/ambulant?utm_source=meta&fbclid=abc&src=reel-x&score=9
  →  https://healio.de/ambulant?utm_source=meta&fbclid=abc
```

### Gesperrte Routen für Meta

| Route / Fall | GA4 | Meta |
|---|---|---|
| `/schwangerschaft` | gesperrt | **gesperrt** |
| `?src=reel-f05`, `?src=bonus-check` (PRIVATE_FUNNEL_SOURCES) | gesperrt | **gesperrt** |
| `/zahn`, `/en/dental` | gesperrt | erlaubt (siehe unten) |
| `/ambulant`, `/en/outpatient` | erlaubt | erlaubt |

Die GA4-Sperrliste `ANALYTICS_EXCLUDED_PATHS` bleibt unverändert. Meta hat
eine eigene, engere Sperrliste.

---

## 3. Datenschutz-Entscheidungen

### Rechtsgrundlage

Art. 6 Abs. 1 lit. a DSGVO, ausdrückliche Einwilligung. Der Zweck `marketing`
ist standardmäßig aus und wird nur durch eine aktive Auswahl gesetzt
(„Alle erlauben“ oder Haken in den Einstellungen). Kein berechtigtes
Interesse, kein Vorab-Laden, keine Dark Patterns.

### Warum /zahn hier erlaubt ist, obwohl GA4 dort gesperrt bleibt

Der Zahn-Check ist eine Auswahlhilfe, deren Antworten Rückschlüsse auf den
Gesundheitszustand zulassen (Art. 9 DSGVO). Deshalb bleibt GA4 auf der ganzen
Route gesperrt: GA4 sendet ungefragt Seitenkontext, und ein Ausrutscher wäre
dort nicht beherrschbar.

Für Meta gilt eine andere Abwägung, weil drei Bedingungen zusammenkommen:

1. **Nur Ereignisnamen, keine Inhalte.** Übertragen wird „jemand hat /zahn
   aufgerufen“ bzw. „jemand hat den Rechner gestartet“. Die Antworten des
   Zahn-Checks verlassen das Gerät nie. Technisch abgesichert: der einzige
   erlaubte Parameter ist `content_name` mit einem von drei festen Werten,
   und `DentalZahnCheck.jsx` hat keinerlei Verbindung zu diesem Modul.
2. **Ausdrückliche, getrennte Einwilligung.** Der Zweck `marketing` ist ein
   eigener Haken mit eigenem Text, der genau das zusagt: „Antworten aus
   Rechnern und Auswahlhilfen werden nie übertragen.“
3. **Fachlich notwendig.** /zahn und /ambulant sind genau die Seiten, auf die
   geworben werden soll. Ohne Messung dort ist jede Anzeige blind.

Die sensibelste Route `/schwangerschaft` bleibt auch für Meta vollständig
gesperrt, ebenso die privaten Kampagnenquellen.

### Widerruf

Über „Datenschutz-Einstellungen“ im Footer. Beim Widerruf:
`fbq('consent','revoke')`, die Cookies `_fbp` und `_fbc` werden gelöscht
(analog zu `clearAnalyticsCookies`), und es geht kein Ereignis mehr raus –
weder an den Pixel noch an die CAPI.

### Bestehende Zustimmungen

Gespeicherte v2-Entscheidungen bleiben gültig. Ein fehlender Zweck wird als
`false` gewertet (`clonePreferences` in `consent.js`). Wer früher „Alle
erlauben“ geklickt hat, hat **kein** Marketing-Einverständnis: der Zweck
existierte damals nicht und steht damit auf `false`. Das ist so gewollt.

### Datenschutzerklärung – noch zu ergänzen

> Die Datenschutzerklärung wurde bewusst **nicht** geändert. Frank muss sie
> vor der Aktivierung um einen Abschnitt zu Meta-Pixel und Conversions API
> ergänzen. Nötige Angaben:

- **Anbieter:** Meta Platforms Ireland Limited, Merrion Road, Dublin 4,
  D04 X2K5, Irland.
- **Zweck:** Messung der Wirksamkeit von Werbeanzeigen (Seitenaufrufe,
  Rechnerstarts, Anfragen) sowie Bildung von Retargeting-Zielgruppen.
- **Verarbeitete Daten:** IP-Adresse, User-Agent, aufgerufene URL (bereinigt),
  Cookie-Kennungen `_fbp`/`_fbc`, Ereignisname und Zeitpunkt. Keine
  Gesundheitsdaten, keine Antworten aus Rechnern oder Auswahlhilfen.
- **Rechtsgrundlage:** Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
- **Widerruf:** jederzeit über die Cookie-/Datenschutz-Einstellungen im
  Footer, mit Wirkung für die Zukunft.
- **Drittlandübermittlung:** USA, gestützt auf das EU-US Data Privacy
  Framework (Meta Platforms Inc. ist zertifiziert), ergänzend
  Standardvertragsklauseln.
- **Gemeinsame Verantwortlichkeit:** Für die Erhebung und Übermittlung
  besteht mit Meta eine gemeinsame Verantwortlichkeit nach Art. 26 DSGVO
  (Controller Addendum).

Auch die Speicherdauer der Cookies (`_fbp` in der Regel 90 Tage) gehört in
den Abschnitt.

---

## 4. Franks Schritte zur Aktivierung

Bis Schritt 3 abgeschlossen ist, passiert nichts. Danach wird gemessen.

**1. Meta Events Manager: Datensatz und Pixel anlegen**
- business.facebook.com → Events Manager → „Datenquellen verknüpfen“ →
  „Web“ → Datensatz benennen (z. B. „Healio Website“).
- Die **Datensatz-/Pixel-ID** notieren (eine reine Zahlenfolge).
- Installationsmethode: „Conversions API und Meta-Pixel“. Es muss **kein**
  Code-Snippet eingefügt werden, das erledigt dieses Repo.

**2. CAPI-Token erzeugen**
- Im selben Datensatz → Einstellungen → „Conversions API“ →
  „Zugriffsschlüssel generieren“.
- Das Token einmalig kopieren. Es wird nicht wieder angezeigt.
- Das Token **niemals** in eine Datei im Repo schreiben, nicht in Chats
  einfügen und nicht per Mail verschicken.

**3. In Vercel die drei Variablen setzen**

Vercel → Projekt `healio-website` → Settings → Environment Variables,
jeweils für Production (und optional Preview):

| Name | Wert | Sichtbarkeit |
|---|---|---|
| `VITE_META_PIXEL_ID` | die Pixel-ID | landet im Browser-Bundle, das ist bei einer Pixel-ID normal |
| `META_PIXEL_ID` | dieselbe Pixel-ID | nur Server |
| `META_CAPI_ACCESS_TOKEN` | das CAPI-Token | **nur Server, niemals mit VITE_-Präfix** |
| `META_TEST_EVENT_CODE` | optional, nur während des Tests | nur Server |

Nach dem Setzen ist ein neuer Deploy nötig, damit `VITE_META_PIXEL_ID` ins
Bundle kommt.

**4. Test-Events prüfen**
- Events Manager → Datensatz → „Testereignisse“ → den Testcode kopieren und
  als `META_TEST_EVENT_CODE` in Vercel eintragen.
- healio.de öffnen, im Banner „Alle erlauben“ wählen, dann /ambulant und
  /zahn aufrufen und den Rechner-CTA klicken.
- Im Events Manager müssen erscheinen: `PageView`, `ViewContent`,
  `RechnerStart`, ggf. `Lead` – jeweils **einmal**, mit dem Hinweis auf
  erfolgreiche Deduplizierung („Browser und Server“).
- Erscheint ein Ereignis doppelt, stimmt die `event_id` nicht überein. Dann
  nicht live gehen, sondern melden.
- Nach dem Test `META_TEST_EVENT_CODE` wieder entfernen.

**5. Merge nach main**
- Erst wenn Schritt 4 sauber ist und die Datenschutzerklärung ergänzt wurde.
- **Per Pull Request**, nicht per direktem Push auf `main`.
- Commit-Autor muss die Healio213-noreply-Adresse sein, sonst blockt Vercel
  (siehe `DEPLOY.md`). Deploy ausschließlich über GitHub `main` →
  Vercel Auto-Deploy. Kein `vercel deploy`, kein `vercel promote`.

**6. Nach dem Merge: CSP scharf prüfen**
- Die CSP steht auf `Content-Security-Policy-Report-Only`. Die Meta-Hosts
  sind eingetragen, aber die Browser-Konsole auf healio.de sollte einmal auf
  CSP-Meldungen durchgesehen werden.

---

## 5. Retargeting-Zielgruppen im Ads Manager

Nach den ersten Tagen mit Daten anzulegen unter Ads Manager → Zielgruppen →
„Custom Audience erstellen“ → „Website“.

| Zielgruppe | Regel | Zeitfenster | Wofür |
|---|---|---|---|
| **Zahn-Besucher** | `ViewContent` mit `content_name` = `zahn`, alternativ URL enthält `/zahn` | 30 Tage | Zahnzusatz-Anzeigen an Leute, die die Seite schon kennen |
| **Ambulant-Besucher** | `ViewContent` mit `content_name` = `ambulant`, alternativ URL enthält `/ambulant` | 30 Tage | Gesundheitsbudget-Story vertiefen |
| **RechnerStart ohne Lead** | Einschließen: `RechnerStart`. Ausschließen: `Lead` | 14 Tage Einschluss, 14 Tage Ausschluss | Die wertvollste Gruppe: hat gerechnet, aber nicht angefragt. Kurzes Fenster, weil die Kaufabsicht schnell abkühlt |
| **Video-Zuschauer 50 %** | Zielgruppentyp „Video“ → „Personen, die mindestens 50 % des Videos angesehen haben“ | 30 Tage | Aus Reichweitenvideos eine warme Gruppe bilden |

Hinweise:

- Die Video-Zielgruppe entsteht aus den Videoaufrufen in den Anzeigen selbst,
  nicht aus dem Website-Pixel. Sie braucht keinen zusätzlichen Code.
- `RechnerStart` ist ein Custom Event. Es taucht im Zielgruppen-Editor erst
  auf, nachdem es mindestens einmal real gefeuert hat.
- Die Zielgruppen sind absichtlich neutral: sie beschreiben nur Seitenbesuche
  und Rechnerstarts, keine Gesundheitsmerkmale. Aus `/schwangerschaft` wird
  bewusst **keine** Zielgruppe gebildet, weil dort nichts gemessen wird.

---

## 6. Tests

```bash
npm run test:privacy   # Vertragstest inkl. aller Meta-Regeln
npm run lint
npm run build
```

Der Vertragstest `scripts/check-privacy-consent-contract.mjs` prüft unter
anderem:

- kein `fbevents.js` und kein `fbq(`-Aufruf außerhalb von `meta-pixel.js`,
- kein Laden und kein Ereignis ohne Zustimmung `marketing`,
- kein Ereignis auf `/schwangerschaft` (Client und Server),
- kein Parameter, der auf den `SENSITIVE_PARAM_KEY`-Filter aus `analytics.js`
  passt,
- `META_CAPI_ACCESS_TOKEN` taucht nirgends im Client-Quelltext auf,
- die CAPI-Funktion loggt nichts und antwortet ohne Konfiguration mit 204.

### Dokumentierte Ausnahme im Test

Der Meta-Standardparameter `content_name` enthält den Teilstring `name` und
würde damit formal auf `SENSITIVE_PARAM_KEY` passen. Der Filter zielt jedoch
auf Personennamen. `content_name` ist ein festes Schlüsselwort aus dem
Meta-Schema und trägt keine Nutzerdaten. Der Test schneidet deshalb für genau
diesen einen Schlüssel den Schema-Präfix `content_` ab und prüft zusätzlich,
dass der Wertebereich auf die drei festen Seitenschlüssel geschlossen ist.
Jeder andere Parameter wird ungefiltert gegen `SENSITIVE_PARAM_KEY` geprüft.
