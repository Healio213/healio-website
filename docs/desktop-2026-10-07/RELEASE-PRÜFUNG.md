# Release-Prüfung der mobilen Basis

Stand: 07.10.2026. Geprüft im Desktop-Worktree auf Basis `7d49899` mit den noch nicht veröffentlichten Desktop-Änderungen. Alle neun ausgewählten Quellvertragstests bestehen. Die vier zunächst fehlgeschlagenen Prüfungen wurden nach gezielten Reparaturen erneut vollständig ausgeführt; die fünf unverändert erfolgreichen Prüfungen wurden nicht wiederholt. Kein Build, Browser-Rendertest, Commit, Push oder Deploy wurde in dieser Teilprüfung gestartet.

| Befehl | Ergebnis |
| --- | --- |
| `npm run test:homepage` | Bestanden |
| `npm run test:privacy` | Bestanden, einschließlich Footer-Filter auf sechs Routen in Desktop- und Mobil-Listen |
| `npm run test:conversion` | Bestanden, alle vier Produktfunnels |
| `npm run test:form-hardening` | Bestanden, alle 12 Formulare |
| `npm run test:contact-ui` | Bestanden |
| `npm run test:kassenboost-bridge` | Bestanden |
| `npm run test:partner` | Bestanden, 95 Übersetzungsschlüssel |
| `npm run test:dentists` | Bestanden, 51 direkte Übersetzungsschlüssel |
| `npm run test:hebammen` | Bestanden, DE und EN |

## Behobene Befunde

Die ursprünglichen Befunde bestanden bereits in der mobilen Basis und wurden nicht durch die Desktop-Arbeit eingeführt. Die Reparatur verändert ausschließlich die drei betroffenen Vertragstests und die nativen Fallback-Attribute zweier Formulare.

- **Formular-Fallbacks:** `src/components/funnel/LeadMagnetLanding.jsx` erhält `method="post" action="/kontakt"`. Im nächsten vollständigen Durchlauf wurde auch die fehlende `action="/kontakt"` in `src/components/sections/dental/DentalCallbackForm.jsx` entdeckt und ergänzt. Beide Formulare führen native Submits damit auf dieselbe sichere Same-Origin-Kontaktroute wie die übrigen Formulare; Angaben werden nicht als GET-Parameter in die URL geschrieben. `onSubmit`, `preventDefault`, Honeypot-Prüfung und EmailJS-Ablauf bleiben unverändert. Der abschließende Hardening-Test prüft alle 12 Formulare.
- **Consent-Platzierung:** `scripts/check-privacy-consent-contract.mjs` prüft die bereits in der mobilen Basis vorgesehene untere Bannerposition mit Safe-Area-Abstand und die bestehenden Desktop-Offsets als Klassentokens. `src/components/ConsentManager.jsx` wurde nicht verändert. Die Trennung zwischen initialem Banner und Einstellungsdialog bleibt erhalten.
- **Footer-Ausblendung:** Derselbe Test wertet die tatsächlichen Footer-Daten und die daraus abgeleiteten Mobil-/Desktop-Listen aus. Auf `/zahn` und `/en/dental` muss der Cookie-Eintrag fehlen, auf `/`, `/en`, `/ambulant` und `/en/outpatient` muss er genau einmal erreichbar sein. Zusätzlich wird geprüft, dass der einzige Cookie-Handler ausschließlich im Cookie-Zweig des gemeinsamen Renderers aufrufbar ist. Die Sicherheitsanforderung bleibt erhalten; die konkrete JSX-Schreibweise ist nicht mehr maßgeblich. `src/components/sections/Footer.jsx` wurde nicht verändert.
- **Conversion-Reihenfolge:** `scripts/check-conversion-disclosure-contract.mjs` identifiziert Tarif- und Bonusabschnitt anhand ihrer JSX-Merkmale, verlangt beide genau einmal und prüft sowohl die Quelltextposition als auch die mobile `order`-Reihenfolge. Die DE-only-Videobedingung wird anhand des übergeordneten Sprachguards für DE und EN geprüft, unabhängig von Layout-Wrappern. Die Zahn-/Stationär-Brücken müssen weiterhin je genau einmal mit ihrer richtigen Variante existieren; zusätzliche Layout-Props wie `mobileSwipe` sind zulässig. Keine fachliche Aussage oder Schutzbedingung wurde entfernt.
- **Zahnarzt-Klassen:** `scripts/check-dentists-contract.mjs` verlangt `w-full` und `overflow-hidden` weiterhin am selben `main`-Container, aber unabhängig von Tokenreihenfolge und dazwischenliegenden Klassen. Alle nachfolgenden Inhalts-, Übersetzungs- und Assetprüfungen laufen jetzt bis zum Ende.

## Abschließende Hauptprüfung

Nach der Hero-Auswahl und den Hebammen-Ergänzungen: elf relevante Vertragstests grün (zusätzlich Services und Erstinformation), gezieltes ESLint und Diff-Check grün. Finaler Produktionsbuild vollständig bestanden: 75 Prerenders ohne Fehler, 98 geprüfte Routen, 23 Blogartikel und zwei Hubs. Sensible Release-Dateien geprüft; keine sensiblen Dateipfade oder Secret-Muster.

Der neue Desktop-Hero ist durch `check-desktop-conversion-rendered.mjs` abgedeckt: acht Desktopansichten, vier mobile Produktseiten mit erhaltenen Swipe-Karten, vier Breakpoints und elf Navigationsprüfungen. Die Hebammenseite wurde zusätzlich in DE/EN auf 1.440/390/320 px einschließlich Downloads und FAQ bedient. Die drei neuen PDFs sind fachlich, strukturell und visuell geprüft. Veröffentlichung erfolgt ausschließlich über GitHub `main`; den passenden Vercel-Commit nach Push bestätigen.
