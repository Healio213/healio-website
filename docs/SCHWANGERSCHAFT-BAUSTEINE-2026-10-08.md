# Schwangerschaft: drei neue Bausteine

Stand: 08.10.2026. Auftrag: `Healio/Marktanalyse-2026-10/serie-codex/CODEX-AUFTRAG-SCHWANGERSCHAFT.md` im Frank-AI-Workspace.

## Arbeitsstand

Eigener Worktree `website-b2b-src-schwangerschaft-20261008`, Zweig `codex/schwangerschaft-bausteine-20261008`, Ursprüngliche Basis `origin/main` mit `bf125a238536e0e1011ce1a430cda20eee7d9552`. Abschließend konfliktfrei auf den während der Arbeit hinzugekommenen Ratgeber-Commit `706a408dbc12c78051f5da3c0666d2b6719db219` rebased und erneut vollständig geprüft. Hauptcheckout und fremde Worktrees unverändert gelassen. Keine Veröffentlichung und kein Push. Commit-Autor und Committer: `Healio213 <268944398+Healio213@users.noreply.github.com>`.

## Umsetzung

`src/components/PregnancyGuidance.jsx` enthält den freundlichen Hinweis direkt nach dem sichtbaren Hero, den Vergleich mit genau fünf Zeilen und die drei Auswahlkacheln direkt vor dem vorhandenen Bonus-Rechner. Desktop zeigt eine semantische Tabelle, Handy fünf Karten. Die Pflicht-Fußnote steht wörtlich unter dem Vergleich und ist den beiden Klinikzeilen zugeordnet. Kacheln sind mindestens 72 px hoch und per Tastatur bedienbar.

Die Auswahl lebt ausschließlich in React-Zustand. Sie verändert weder URL noch Cookies, Local Storage, Session Storage oder Messereignisse. Der Rechner erhält keine Vorauswahl. Der Schwangerschaftsweg öffnet das vorhandene Rechenbeispiel; dessen Ergebnisse und die Auswahl gelangen nicht in den weiterführenden Link. Bestehende Sperren für GA4, Google Ads und Meta bleiben erhalten.

`src/components/BenefitFunnelPage.jsx` bindet die Bausteine ein. Bestehende, im Auftrag verbotene Formulierungen wurden gezielt entfernt: „Nutz das Geld“, die genannten ausgeschlossenen Untersuchungsbegriffe und pauschale Aussagen ohne Wartezeit im Entbindungskontext. Die tatsächlich vorhandene alternative Geldbonus-Berechnung bleibt erhalten; der Zuschuss bis 1.155 EUR wird als Zuschuss zum Schutz dargestellt.

Tarifbelege wurden nur im Repo geprüft: SDK AP1 mit 100 % und 500 EUR im Vorsorge-Topf in `AmbulantConversionFlow.jsx`, Zeitraum in `AmbulantAufEinenBlick.jsx` und `ambulantFaqs.js`, bestehende Schwangerschaft und Untersuchungen in `src/i18n/locales/de/ambulant.json`, Zimmer und Begleitperson unter 16 in `src/i18n/locales/de/stationaer.json`. Die vorgegebene Fußnote ist wörtlich übernommen; keine zusätzliche SDK-Aussage zur Entbindung ohne Wartezeit.

## Notwendige Bestandskorrekturen für die Prüfungen

Der vollständige Ausgangsbuild und Lint waren grün. Von 51 unveränderten Prüfskripten bestanden 41. Neun Skripte hatten nachweislich veraltete Erwartungen: frühere Schrift und Hero-Struktur, Nita trotz deaktivierter Betriebsfreigabe, ältere mobile WhatsApp-Struktur, Footer-Linkdaten, optionale Wischkarten und starre Meta-Tag-Parser. Sie prüfen jetzt den vorhandenen Stand, weiterhin mit den fachlichen und Datenschutz-Assertions. Nita wurde nicht aktiviert. Fehlende, doppelte oder falsche Meta-Tags bleiben Fehler.

Der zehnte Fehler war eine echte Desktopüberlagerung des Hauptbuttons durch das Cookie-Banner. `ConsentManager.jsx` zeigt das Banner ab 768 px als schmale Karte rechts unten. Texte und Einwilligungslogik sind unverändert. Der bestehende Desktoptest wurde nicht abgeschwächt. Sein alter generischer Buchungsselektor wurde auf den konkreten Knopf im sichtbaren Partner-Hero berichtigt; tatsächlicher Klick und sichtbares Ziel bleiben geprüft. 15 frische Erstbesuche auf fünf Seiten bei 1024, 1280 und 1440 px bestätigen erreichbare Hauptbuttons, mindestens 44 px große Consentbuttons und bedienbare notwendige Einwilligung. Die Handykarte bei 320 und 390 px ist gegenüber `origin/main` in Geometrie und Text unverändert.

`scripts/prerender.mjs` unterstützt einen eigenen Port über `HEALIO_PRERENDER_PORT`, Standard weiterhin 4899. Dadurch können isolierte Worktree-Builds laufen, während fremde Builds ihren Port benutzen.

## Prüfung und Belege

- Vollständiger finaler Build: `HEALIO_PRERENDER_PORT=4917 npm run build`, 120 Prerenders, 143 Routen, 56 Ratgeber und 23 Blogartikel bestanden.
- `npm run lint` und `git diff --check` bestanden.
- Alle 52 `scripts/check-*.mjs` bestanden. Zusammen mit Build und Lint sind 54 von 54 Abschlussprüfungen grün.
- `npm run test:pregnancy` enthält jetzt auch den neuen Baustein- und Datenschutztest und wurde als vollständiger Befehl erfolgreich ausgeführt.
- Neues Skript `scripts/check-pregnancy-guidance-rendered.mjs`: 320, 390 und 1440 px, alle drei Auswahlwege, Pflicht-Fußnote, richtige Links, mindestens 44 px Tippfläche, keine Überbreite und bestehender Rechner bestanden.
- Netzwerkprüfung mit aktivem Analyse- und Marketing-Consent sowie synthetisch konfigurierten Anbieter-IDs: 875 gestartete Requests erfasst, kein Google-, Meta- oder Ereignisversuch. Speichermedien, Cookies und Provider-Warteschlangen bleiben bei Auswahl und Rechnerbedienung unverändert. Reload leert die Auswahl.
- Rechenbeispiel nach Einstieg: 630 EUR Zuschuss, alternativ 210 EUR Geldbonus; bei 800 EUR Beispielbeitrag 170 EUR Eigenanteil.

Zwölf Bildschirmfotos und das Netzwerkprotokoll liegen in `/Users/franksteinfurt/Frank AI/Healio/Ratgeber/serie-vorschau/`: `schwangerschaft-20261008-{320,390,1440}-{gesamt,hinweis,vergleich,einstieg}.png` und `schwangerschaft-20261008-guidance-netzwerk.json`. Hinweis, Auswahl und Vergleich wurden visuell geprüft.

Ausgangs- und Abschlussprotokoll liegen dort als `schwangerschaft-prüfungen-ausgangslage-2026-10-08.md` und `schwangerschaft-prüfungen-final-2026-10-08.md`. Der zusätzliche Consent-Nachweis liegt in `schwangerschaft-20261008-cookie-pruefung.json`. Die Änderungen sind lokal geprüft und noch nicht live.
