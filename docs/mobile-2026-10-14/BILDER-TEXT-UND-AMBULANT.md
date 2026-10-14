# Mobile Textkürzung, große Bilder und klarer Ambulant-Ablauf

Stand: 14.10.2026. Folgekandidat zu `50a32fb`, ursprüngliche Desktop-Referenz `eeaaac0`.

Vor Veröffentlichung den zwischenzeitlichen Main-Commit `7f2c338` konfliktfrei übernommen. Seine sieben SEO-/Ratgeber-/Cacheänderungen bleiben erhalten; der geprüfte mobile UI-Quellbestand ist bytegleich zum Stand vor dieser Integration.

Franks Korrektur: mobile Texte straffen, die vorhandenen schönen Bilder in ihrer ursprünglichen Größe und ihrem vollständigen Format erhalten. Bildsektionen bleiben wischbar; Siegel laufen mit knapper Anbieter-/Tarifzuordnung durch. Anschließend zuerst die Ambulant-Seite von Wiederholungen befreien.

## Bilder und Siegel

- Startseiten-Hero wieder im ursprünglichen Format 3:2; Bild- und FriendlyIcon-Karten auf Startseite, Versicherungsübersicht und den drei Produktseiten wieder sichtbar und wischbar.
- Vorhandene SDK-, UKV-/Bayerische- und IKK-Siegel mobil als 96 px hohes Laufband. Lange Bewertungstexte und Quellen stehen in optionalen Details. Desktop behält die statischen Reihen.
- Laufband pausiert bei Berührung, Hover und Tastaturfokus. Bei reduzierter Bewegung erscheinen die Originale einmal als wischbare Reihe. Wiederholungen sind rein dekorativ.
- Die alte mobile Ausblendung der IKK-Siegel im gemeinsamen IKK-Block entfernt; die Siegel bleiben an ihrem fachlichen Ort.

## Ambulant mobil

- Die zusätzliche Übersicht „Auf einen Blick“, die wiederholte Budgetverteilung und der weitere dunkle Bonus-Werbeblock entfallen mobil.
- Kein Bonus-Fristenhinweis im Hero. Der bestehende Bonus-Leitfaden bündelt Aktivitäten und Fristen.
- Die gute Leistungsübersicht mit Bildern, Stufenwahl und altersabhängigem Beitrag bleibt. Der Einstieg heißt kurz „Beitrag berechnen“; wiederholte Rechner- und Angebotserklärungen stehen in Details.
- UKV zunächst nur als kurzer freiwilliger Ergänzungssatz und optionaler Details-Einstieg. Preise, Staffeln, Bedingungen und Antragsweg bleiben vollständig erreichbar. ARAG bleibt als schmaler Alternativ-Aufklapper.
- Finanzierung einmal mit zwei kurzen Möglichkeiten erklären. Die große IKK-Brückenszene bleibt mobil offen; Einleitung knapp, Wechsel freiwillig. Bonusrechner, drei Schritte, Kontakt und FAQ bleiben erhalten.
- Originaltexte und Darstellung ab md bleiben erhalten. Englische Ambulant-Ansicht entsprechend angepasst. Rechnerdaten, Tarifgrenzen und Versichererantragsziele unverändert.

## Prüfstand

Homepage-, Versicherungsübersichts-, Conversion- und FriendlyIcon-Vertragstests sowie ESLint aller geänderten JSX-Dateien und `git diff --check` bestanden.

Die vorausgehende Bildphase umfasst 35 Layoutansichten, 48 echte Touch-Gesten sowie 96 Siegelprüfungen; zusammen 144/144 Interaktionsprüfungen bestanden. Alle fünf Desktopseiten geometrisch und textlich gleich zur ursprünglichen Referenz, vier pixelgleich und Leistungen mit einem abweichenden Pixel. Details in [BILD-PRÜFUNG.md](BILD-PRÜFUNG.md).

Die anschließend beauftragte Ambulant-Straffung ist in sechs gezielten Ansichten mit 130/130 Prüfungen bestätigt, darunter zehn echte Touch-Gesten sowie Stufenwechsel, altersabhängige Beiträge, dynamische Leistungsgrenzen, SDK-Ziele und alle wichtigen Aufklapper. Bei 390 px sinkt der sofort sichtbare Text von 1.221 auf 538 Wörter, rund 56 %. Hero und große IKK-Szene sind sichtbar; Desktop erneut pixelgleich. Details in [AMBULANT-PRÜFUNG.md](AMBULANT-PRÜFUNG.md).

Vollständiger `npm run build` sowohl vor als auch nach der Main-Integration mit Exit 0 bestanden: jeweils 246 Seiten gerendert, 0 fehlgeschlagen; 179 Ratgeberseiten und 23 Blogartikel/2 Hubs sowie 269 Schema-Routen geprüft. Die neu übernommenen Blog-SEO-/Ratgeberverträge sind ebenfalls grün. Ein Start kollidierte mit einem fremden Listener auf dem Standardport 4899; dieser Prozess blieb unangetastet, der erfolgreiche finale Build nutzte den vorhandenen `HEALIO_PRERENDER_PORT` auf Port 4904. Git-Veröffentlichung und öffentliche Prüfung stehen noch aus.

Keine Formulare oder externen Anträge abgesendet. Fremder Arbeitsstand im Hauptcheckout erhalten; Umsetzung ausschließlich im isolierten `website-b2b-src-mobile-20261014`. Keine Ordnersynchronisierung. Rohscreenshots bleiben lokal und werden nicht in den Release aufgenommen.

Franks weitere Gestaltungsrückmeldung zur Startseiten-Appsektion und zur Versicherungsübersicht ist als nächster separater Schritt vorgemerkt; in dieser Folgearbeit wird zuerst Ambulant bearbeitet.
