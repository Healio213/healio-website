# Mobilprüfung der Artikel, Teil B

Stand: 14.10.2026. **101 von 101 zugewiesenen Routen geprüft; keine konkreten Darstellungsfehler gefunden.**

Geprüft wurde der stabile gebaute Stand unter `http://127.0.0.1:4832`, ohne HMR, bei 390 × 844 Pixeln. Die Auswahl umfasst die nullbasierten Artikelindizes 102 bis 202 aus `/private/tmp/healio-mobile-alle-seiten-20261014-routes.json`. Alle 101 zugewiesenen Seiten sind deutsche Ratgeberartikel; keine Blogroute und kein Ratgeberhub liegt in dieser Hälfte.

## Ergebnis

| Prüfung | Ergebnis |
| --- | --- |
| Dokumentantwort und tatsächlicher Artikelinhalt | 101 × HTTP 200; jeweils vollständiger Artikelinhalt |
| Sichtbare Artikel-H1 | Genau eine pro Route |
| Seitenbreite | Auf allen Routen exakt 390 px; kein Bodyüberlauf |
| Lange Wörter und Textgrenzen | Keine unbeschnitten über den Viewport laufenden Textstellen |
| Sichtbare Bilder | Keine defekten oder verzerrten Bildelemente; bewusstes `cover`/`contain` gilt nicht als Verzerrung |
| Typografie | Kein geprüfter längerer Artikeltext unter 14 px; gewöhnlicher Fließtext 17–18 px, Metadaten und Tabellen kleiner |
| Doppelte UI-Struktur | Keine doppelten IDs, keine wiederholten sichtbaren H2; keine Siegelbänder in diesen Artikeln |
| Laufzeit und Ressourcen | Keine JavaScript-Fehler, HTTP-Fehlerantworten oder fehlgeschlagenen Ressourcenabrufe |

Die Texte bleiben bewusst ausführlich. Die gemessenen Artikel enthalten 972 bis 4.161 Wörter; ihre Seitenhöhen von 9.203 bis 43.188 px sind kein Fehlerkriterium. Breite Tabellen dürfen innerhalb ihres eigenen Wischrahmens scrollen, ohne die Seite zu verbreitern. Medizinische und finanzielle Inhalte wurden nicht geändert oder fachlich neu bewertet.

Fünf repräsentative Einstiege wurden visuell geprüft: Zahnspange für Erwachsene, Mobil Krankenkasse/Osteopathie, Geburtsvorbereitungskurs, Brillenkosten und Altersvorsorgedepot. Zwei zusätzliche Screenshots dokumentieren ursprüngliche Harness-Kandidaten. Es gibt keine große Screenshotgalerie.

## Abgrenzung der Prüfungsumgebung

Ein anfänglich versuchter sehr hoher Vollseiten-Screenshot scheiterte an Chrome `Page.captureScreenshot`. Danach wurde mit gespeicherten Ergebnissen fortgesetzt und ausschließlich mit normalen Viewportbildern gearbeitet; bereits erfasste Artikel wurden nicht erneut komplett geprüft.

Drei anfängliche `requestAnimationFrame`-basierte Content-Ready-Waits liefen ins Timeout, obwohl die anschließenden Messungen vollständigen Inhalt und eine richtige H1 zeigten:

- `/ratgeber/zahnspange-erwachsene`
- `/ratgeber/krankenhauszusatzversicherung-kinder`
- `/ratgeber/vorsorgeuntersuchung-frauen`

Diese drei Fälle wurden einmal eng begrenzt mit zeitbasiertem DOM-Polling nachgeprüft. Alle waren nach 1,1–1,4 Sekunden bereit, mit 12–15 Artikelabschnitten, 390 px Seitenbreite und fehlerfreien Bildern. Die Eingrenzung spricht für das Hintergrundtab-/RAF-Polling des parallelen Harness. Die ursprünglichen Rohmeldungen bleiben in den Metriken erhalten; die getrennte Diagnose belegt, dass daraus kein Produktbefund abgeleitet wird. API-Abweichungen traten in diesem Routenbestand nicht auf.

## Nachweise und Sicherheit

- `metrics.json`: alle 101 Routen, Titel, H1, Breiten, Text- und Bildmaße sowie ursprüngliche Rohmeldungen.
- `summary.json`: finale Einstufung jeder Route einschließlich der bestätigten Content-Ready-Fälle.
- `content-ready-diagnose.json`: getrennte Nachprüfung ausschließlich der drei Harness-Kandidaten.
- `browser-artikel-b.mjs`: lesender Prüfharness.
- `shared-measure.mjs`: unveränderte Messfunktion aus dem bestehenden `browser-qa.mjs`.

Es wurden nur Seiten geladen, Inhalte gelesen, gescrollt und Screenshots aufgenommen. Keine Links, Formulare, Rechner, Einwilligungen oder Anträge wurden betätigt. Schreibende Netzwerkaufrufe waren blockiert; kein solcher Aufruf wurde während dieser Prüfung ausgelöst. Keine Produktdatei geändert.
