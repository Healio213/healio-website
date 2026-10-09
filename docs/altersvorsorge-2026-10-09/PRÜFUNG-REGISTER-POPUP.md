# Prüfung von Register, Ratgebern und Startinfo-Popup

Stand: 9. Oktober 2026. Geprüft im Release-Worktree `codex/altersvorsorge-live-20261009`, vor Veröffentlichung. Zuerst wurde der aktuelle Quellcode auf Port 4184 geprüft, anschließend das frisch gebaute Vite-Produktionsbundle auf Port 4191. Dieser Bericht bestätigt keine Veröffentlichung und keinen tatsächlichen E-Mail-Versand.

## Artikel und Register

- Die 154 bestehenden Artikel der Ausgangsfassung bleiben inhaltlich unverändert und in ihrer bisherigen Reihenfolge registriert. Dazu kommen 24 Artikel zur Altersvorsorge, insgesamt 178.
- Jeder neue Artikel besitzt eine eigene Inhaltsdatei und einen eigenen dynamischen Import. Die Browserübersicht und der Hub laden keine Sammeldatei mit vollständigen Artikeltexten.
- Der Titelabruf für verwandte Artikel verwendet nur die 24 Titel des neuen Bereichs.
- Die 24 Artikel umfassen 17.894 Wörter, 690 bis 828 Wörter je Artikel. Quellenstand ist der 8. Oktober 2026; Veröffentlichungs- und Aktualisierungsdatum sind der 9. Oktober 2026. Als Autor wird die Redaktion von Healio geführt.
- Die Artikelprüfung bestätigt Quellenstruktur, interne Verlinkung, CTA, Textregeln, SEO-Daten und Veröffentlichungsstatus. Der Quellenstand wird getrennt vom Veröffentlichungsdatum dargestellt.

Prüfbefehl: `node scripts/check-altersvorsorge-ratgeber.mjs`. Ergebnis: bestanden.

## Browserprüfung von Artikeln und Kontaktwegen

Die Landingpage wurde bei 360, 390 und 1440 px geprüft. Hub und alle 24 Artikel wurden jeweils bei 390 und 1440 px geprüft. Alle Seiten füllen die Browserbreite ohne horizontale Überbreite; die Eingaben haben lesbare Beschriftungen. Jeder neue Artikel besitzt genau eine interne Haupt-CTA. Die Schieberegler enden bei 150 EUR Monatsbeitrag.

Ein vollständiger Ablauf per Tastatur und Klick bestätigt:

- 50 EUR Monatsbeitrag und drei berücksichtigte Kinder ergeben im dargestellten Beispiel 1.140 EUR jährliche Zulagen. Ein möglicher Startbonus von 200 EUR erscheint separat als einmaliger Betrag.
- Die Werte gelangen vom Artikel zur Landingpage und anschließend in die Nachricht des Kontaktformulars für die Check-Anfrage. Der Rückrufweg benennt den Rückrufwunsch.
- Kontaktwerte und Rechnerwerte werden nicht als persönliche URL-Parameter weitergereicht. Unfertige Buchungslinks sind nicht anklickbar.
- Der Riester-Artikel verwendet die passende Ansprache und den alternativen Weg zum Zuschuss-Fahrplan.
- Es traten keine JavaScript-Laufzeitfehler und keine versuchten Schreibanfragen auf.

Prüfbefehl: `HEALIO_ARTIKEL_PREVIEW_URL=http://127.0.0.1:4184 node scripts/check-altersvorsorge-ratgeber-rendered.mjs`. Ergebnis: bestanden.

## Startinfo-Popup und API

Die 81 API-, Routen-, Einwilligungs- und Popup-Verträge bestehen mit ausschließlich lokalen Mocks. Sie prüfen unter anderem Methoden und Ursprünge, Konfigurationsbereitschaft, JSON-Grenzen, die sieben erlaubten Request-Felder, Einwilligungsversion, normalisierte Eingaben, Honeypot, zu schnelle Abgabe, Anfragebegrenzungen und Upstream-Fehler. Erfolg wird nur bei einer bestätigten Annahme gemeldet. Kontaktwerte werden nicht in der API-Antwort wiederholt.

Die zusätzliche Browserprüfung bestätigt:

- Automatisches Öffnen erst nach 35 Sekunden und mindestens 25 Prozent Scrollfortschritt, höchstens einmal je Sitzung und nur im Altersvorsorgebereich.
- Ein bereits offener Dialog verhindert eine Überlagerung. Ohne verfügbare Anmeldung erscheint die Automatik nicht; beim manuellen Öffnen steht ein Kontaktweg bereit.
- Der native modale Dialog blockiert Fokus auf den Seiteninhalt. Escape und Schließen funktionieren. Chromes native BODY-Zwischenstation beim Tabben lässt den Hintergrund weiterhin inaktiv.
- Der Dialog passt bei 360, 390 und 1440 px sowie einer auf 360 px verkleinerten mobilen Fensterhöhe. Name und E-Mail werden mit mindestens 16 px dargestellt.
- Die Einwilligung ist nicht vorbelegt. Pflichtfelder und Datenschutzlink funktionieren.
- Fehler, Begrenzungen und eine abgelehnte Annahme erhalten die Eingaben und zeigen keine Erfolgsbestätigung. Eine HTTP-Fehlerantwort mit `accepted:true` gilt ebenfalls als Fehler.
- Schließen und Wiederöffnen verdoppeln keinen laufenden Request. Navigation beendet den Dialog und den Clientrequest. Kontaktwerte werden nicht in localStorage oder sessionStorage abgelegt.
- Sämtliche POSTs wurden abgefangen und mit Testantworten beantwortet. Es wurde kein tatsächlicher Kontakt angelegt, kein n8n- oder Brevo-Aufruf ausgeführt und keine E-Mail versendet.

Prüfbefehle: `node scripts/check-altersvorsorge-startinfo.mjs` und `HEALIO_STARTINFO_PREVIEW_URL=http://127.0.0.1:4184 node scripts/check-altersvorsorge-startinfo.mjs --browser`. Ergebnis: beide bestanden.

Scoped ESLint für beide Browserprüfscripte ist ebenfalls bestanden.

## Neue Gestaltung und Navigation

Der ergänzte Direktlink zum Altersvorsorgedepot wurde mit dem finalen Header bei 1280, 1440 und 1536 px geprüft. Das Logo bleibt 120 × 48 px groß. Logo, Navigation und Menüpunkte überlappen nicht; die Seite läuft nicht horizontal über. Das aufgeklappte Handy-Menü bei 390 px zeigt den funktionierenden Direktlink mit hellem Text auf dunklem Grund.

Der dunkle Hero beginnt am oberen Fensterrand ohne weiße Kante. Die Angebotskarte wurde zusätzlich visuell bei 1440 und 360 px geprüft. Sie enthält die eigene Depotgrafik und vier thematische Kachelgrafiken. Bei 360 px liegen alle Kacheln und die Fußnote innerhalb der 328 px breiten Karte; der untere Kartenrand ist vollständig sichtbar. Keine zusätzlichen JavaScript-Fehler oder Schreibanfragen.

Lokale Bildbelege, außerhalb des Repos abgelegt:

- [Hero bei 1440 px](/private/tmp/altersvorsorge-design-2026-10-09/hero-desktop-1440.png)
- [Angebotskarte bei 1440 px](/private/tmp/altersvorsorge-design-2026-10-09/angebot-desktop-1440.png)
- [Hero bei 360 px](/private/tmp/altersvorsorge-design-2026-10-09/hero-mobile-360.png)
- [Vollständige Angebotskarte bei 360 px](/private/tmp/altersvorsorge-design-2026-10-09/angebot-mobile-360.png)
- [Unterer Kartenrand bei 360 px](/private/tmp/altersvorsorge-design-2026-10-09/angebot-mobile-360-unterer-rand.png)
- [Geöffnetes Handy-Menü bei 390 px](/private/tmp/altersvorsorge-design-2026-10-09/menu-mobile-390.png)

## Verbleibende Prüfgrenzen

Der vollständige Prerender und die Prüfung aller erzeugten HTML-Routen werden gesondert durch die Hauptsitzung bestätigt. Die nachfolgende Browserprüfung bestätigt das fertig kompilierte Produktionsbundle, nicht den Abschluss des gesamten Prerender-Laufs.

Die Tests bestätigen die lokale API- und Browserlogik. Ein tatsächlicher Double-Opt-in-Eingang einschließlich Brevo-Liste, Mailzustellung und Bestätigung eines realen Empfängers wurde nicht ausgelöst. Die API-Begrenzung arbeitet im Speicher der jeweiligen Serverinstanz.

## Wiederholung gegen das Produktionsbundle

Nach Abschluss des finalen Vite-Builds wurden beide vollständigen Browserläufe gegen `http://127.0.0.1:4191` wiederholt. Alle 24 Artikel und der Hub bei 390/1440 px, die Landingpage bei 360/390/1440 px, die Werteübergabe und beide Kontaktwege bestanden erneut. Auch die Popup-Prüfung einschließlich aller Mock-Erfolgs- und Fehlerfälle sowie die 81 API-Verträge bestanden.

Ein zusätzlicher Produktions-Smoke bei 320, 1280, 1440 und 1536 px bestätigt volle Hero- und Seitenbreite, den dunklen oberen Rand und passende Navigation. Das Desktoplogo bleibt 120 × 48 px; es gibt keine Menüüberlappung. Der mobile Direktlink funktioniert. Keine Browser-Laufzeitfehler und keine tatsächlichen Schreibanfragen.

Prüfbefehle: `HEALIO_ARTIKEL_PREVIEW_URL=http://127.0.0.1:4191 node scripts/check-altersvorsorge-ratgeber-rendered.mjs` und `HEALIO_STARTINFO_PREVIEW_URL=http://127.0.0.1:4191 node scripts/check-altersvorsorge-startinfo.mjs --browser`. Ergebnis: beide bestanden. Der Server auf Port 4191 gehört der Hauptsitzung und wurde durch diese Prüfung nicht verändert.
