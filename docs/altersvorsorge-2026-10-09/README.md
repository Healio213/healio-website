# Altersvorsorgedepot: geprüfter Release vom 9. Oktober 2026

Frank hat die Veröffentlichung auf healio.de ausdrücklich beauftragt. Diese Fassung integriert die neuen Inhalte in den Website-main vom Commit `609fb20` und erhält dessen bestehenden Kassenbonus-Leitfaden.

24 neue Ratgeber mit zusammen 17.894 Wörtern, Themenübersicht, Zulagenrechner bis 150 EUR Monatsbeitrag, Werteübergabe in eine bearbeitbare Kontaktanfrage und eigener Menüeintrag. Der neue Hero verwendet das bestehende Healio-Markenrelief. Eigene gefüllte Vorsorge-Illustrationen ersetzen die bisherigen schlichten Inhaltssymbole. Der sieben Seiten umfassende Zuschuss-Fahrplan erhält dasselbe Motiv auf dem Cover; Förderberechtigung, Garantieumfang, Kosten und Kontaktwege sind geprüft.

Das Startinfo-Popup sammelt Vorname und E-Mail mit einer nicht vorbelegten Einwilligung. Die Server-API gibt nur einen Double-Opt-in-Auftrag an den getrennten authentifizierten Relay weiter. Die bisherige unbereite Webinar-API bleibt ausdrücklich deaktiviert. Webinar-Termine und eine neue Buchungsseite stehen noch aus; der bestehende Kontaktweg ist verfügbar.

## Prüfung vor Veröffentlichung

- Vollständiger `npm run build`: 245 Seiten gerendert, 0 Fehler. 248 indexierbare und 20 Noindex-Routen sowie 178 Ratgeber und 23 Blogartikel mit 2 Hubs geprüft; abschließender Schemavertrag für 268 Routen bestanden.
- Bestehender Ratgeber-Vertrag und alle 24 neuen Texte auch im ausgelieferten HTML geprüft. Die 154 bisherigen Artikel bleiben inhaltlich erhalten.
- Acht Rechner-/Kontakt-/Veröffentlichungsverträge, 81 API-/Einwilligungsverträge, Homepage, Unternehmen, Leistungen, Formularschutz, Datenschutz, SEO und Prerender-Resilienz bestanden. Gezielt geänderte Quell- und Prüfdateien ohne ESLint- oder Git-Formatierungsfehler.
- [Register-, Popup- und Browsernachweis](PRÜFUNG-REGISTER-POPUP.md): vollständige Artikel-, Hub-, Kontakt- und Popupprüfung im Produktionsbundle; Hero und Navigation bei 320/1280/1440/1536 px, alle Hero-Varianten auf schmalen Handys. Kein horizontaler Überlauf oder Menüüberlappung.
- Fahrplan: 7 Seiten visuell geprüft, QR aus der finalen PDF dekodiert. SHA256 `aa139cbb479a82c4f926b8471d323f0545b83ce60f150b71dd2239a31108c041`. Der bestehende Kassenbonus-Leitfaden bleibt bytegleich; beide Dateien stimmen mit den lokalen Build-Downloads überein.

Die Popup-Erfolgsfälle wurden simuliert. Eine echte Testanmeldung, Mailzustellung und Bestätigung durch einen realen Empfänger wurden nicht ausgelöst. Die öffentliche Produktionsprüfung wird im separaten Projektbericht `Healio/Altersvorsorgedepot-Funnel/LIVE-RELEASE-2026-10-09.md` nach dem Git-main-Deploy dokumentiert. Kein lokaler Vercel-Upload.
