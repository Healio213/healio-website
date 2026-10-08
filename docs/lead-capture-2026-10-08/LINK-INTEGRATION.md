# Antragslinks und Lead-Erfassung

Stand: 08.10.2026. Umsetzung im isolierten Worktree `website-b2b-src-lead-capture-20261008`; keine Veröffentlichung durch diesen Integrationsschritt.

Der zentrale `LeadCaptureProvider` umschließt die bestehenden Routen in `src/App.jsx`. Nur echte Versicherer-Antragslinks verwenden `LeadCaptureLink`. Die bisherigen Ziel-URLs, Darstellung, `target="_blank"`, `rel="noopener noreferrer"` und argumentlos beziehungsweise neutral arbeitenden Trackingfunktionen bleiben erhalten. Bei abgefangenen Links führt der Provider den bestehenden `onClick` erst nach tatsächlichem Öffnen des Rechners aus. Ein abgebrochenes Modal zählt damit nicht als geöffneter Antrag.

| Seite | Komponente | Zielhost | Neutrale Kategorie |
| --- | --- | --- | --- |
| Ambulant | `Header.jsx` (Desktop/Mobil), `AmbulantConversionFlow.jsx`, Tarifwahl und Abschluss | `insurances-online.levelnine.biz` | `sdk-ambulant` |
| Ambulant | `AmbulantBonusCalculator.jsx`, Rechner-CTA ohne Überschreibung | `insurances-online.levelnine.biz` | `sdk-ambulant` |
| Ambulant | `AmbulantVorsorgeBaustein.jsx`, UKV Vorsorge | `insurances-online.levelnine.biz` | `ukv-vorsorge` |
| Zahn | `DentalZahnCheck.jsx`, Ergebnis-CTA | `insurances-online.levelnine.biz` oder `www.diebayerische.de` | `zahn-antrag` |

Die Kategorien enthalten keine Zahn-Check-Antworten, Tarifstufen, Bonusbeträge oder persönlichen Eingaben. Der lokale Zahn-Check bleibt lokal; seine Antworten werden nicht an die Lead-Erfassung übergeben. Desktop und Mobil verwenden dieselben Antragskomponenten. Englische Seiten teilen sich diese Komponenten ebenfalls; die Routenbegrenzung liegt im Provider.

## Bewusst unveränderte Wege

- `/kassenbonus` enthält aktuell nur KassenBoost-Vergleichslinks und interne Produktwege, keine Levelnine- oder Versicherer-Antragslinks. Der kostenlose Kassenvergleich bleibt ohne vorgeschaltete Kontakthürde.
- `/tierkrankenversicherung` führt aus der lokalen Tier-/Schutzauswahl in das vorhandene Fachberatungsformular. Es gibt aktuell keinen direkten externen Versicherer-Antragslink. Das vorhandene Formular und seine Pflichtangaben erhalten keine zweite Kontaktabfrage.
- Der Zahn-Bonusrechner verwendet weiterhin die in `ZahnPage.jsx` gesetzte interne CTA-Überschreibung `#zahn-check`.
- IKK-Informations- und Mitgliedslinks, PDF-Links, interne Anker, WhatsApp und Kontaktwege bleiben normale Links.
- Der gemeinsame Bonusrechner wird auch auf anderen Seiten verwendet. `LeadCaptureLink` darf dort nur dann abfangen, wenn der Provider die aktuelle Route ausdrücklich freigibt.

## Prüfung dieses Integrationsschritts

Bestanden: Conversion-, Datenschutz-, Google-Ads-, UKV-Vorsorge-Verträge, Bonus-Rechenmodell und `git diff --check`. Die UKV-Vertragsassertion wurde eng auf `LeadCaptureLink` angepasst; die bisherigen Anforderungen an Ziel, neuen Tab und argumentloses Tracking bleiben geprüft.

19 Client-Verhaltenstests mit tatsächlichem React-/Radix-Render prüfen Modal, Weiterleitung, Fehler, Sitzung, Fokus, Scrollsperre und verspätete Antworten. 19 API-Fälle und die gerenderten Bonus-/Tarifauswahl-Regressionsprüfungen sind bestanden. Desktop und Handyansicht des Modals wurden zusätzlich in Chrome geprüft. Es wurden keine echten Anträge oder Kundendaten versendet.
