# Praxis: mobile Kürzung und Abschlussprüfung

Geprüfter Kandidat: http://127.0.0.1:4834, eingefrorener Quellbatch nach Root-Aria-/Copykorrektur. Desktopvergleich gegen Live-SHA `9472626feda1ced6acf4d075913d605d7d0af7e3`.

Alle vier mobilen Ansichten und beide Desktop-Sprachvergleiche bestätigt. Keine ausgelieferte Regression festgestellt.

| Route | Ansicht | Bodybreite | Bild-Wischreihen | Ergebnis |
| --- | --- | --- | --- | --- |
| /partner | 360 px | 360 px | 5 | Bestätigt |
| /partner | 390 px | 390 px | 5 | Bestätigt |
| /partner | 767 px | 767 px | 5 | Bestätigt |
| /en/partner | 390 px | 390 px | 5 | Bestätigt |

Mobil bleiben Scene und Video in den originalen Formaten 720×480 (3:2) bzw. 16:9. Scene-Bildbreite 326 px bei 360, 356 px bei 390 und 446 px bei 767; vollständige Ausschnitte, keine gestreckten/defekten angezeigten Bilder. Alle fünf bestehenden Bild-/FriendlyIcon-Reihen haben clientWidth kleiner als scrollWidth und sind durch echte Touchgesten bis zur vollständig sichtbaren letzten Karte bedienbar. Englisch erhält zusätzlich die vorhandene reine Text-Wischreihe des Video-Fallbacks. Keine Objekt-Fragmente in Aria-Labels.

Der kurze Patientennutzen-Hero, die Konzept-Copy und die neue Reihenfolge sind sichtbar. Beide nativen Textdetails starten geschlossen, öffnen per Zeigerkontakt bzw. Enter und enthalten die ursprünglichen Tarif-/Bonusbedingungen und Rolleninfos vollständig, einschließlich neutraler Praxisrolle, fehlender Provision, eigenständiger Kontaktentscheidung, keiner Patientendatenübermittlung und fachlicher Unabhängigkeit. Keine sichtbaren Highlight-Tags oder doppelten IDs. Die Hero-CTA erreicht weiterhin `#google-termin` (y 96 px) ohne Kalenderfreigabe, Buchung oder Formularaktion.

Desktop 1440: Deutsch und Englisch haben identischen Text und Wortzahl sowie dieselben gezielt gemessenen Überschriften-, Bild-, Abschnitts- und Terminmaße gegenüber Live. Seitenhöhe Deutsch 11387 px, Englisch 10698 px, jeweils unverändert. Keine Desktop-Vollseitengalerie angelegt.

Die erste Messung enthielt ausschließlich Harness-/Umgebungsflags: Wiederholte Vite-HTML-GETs lieferten gültige 304-Cacheantworten; Englisch hat sechs statt fünf Reihen, weil die vorhandene Video-Fallback-Textreihe mitzählt. Die zwei zunächst nicht zuverlässig ausgelösten Touchansichten wurden nur im betroffenen Ausschnitt bestätigt, mit frischer Hit-Position auf vollständig sichtbaren Karten. Bei 767 px liegt die letzte Berufsgruppenkarte vollständig x 423–743 nach scrollLeft 0→332→664→996→1261; bei EN 390 vollständig x 62–374 nach 0→324→648→972→1296→1574. Bei 767 dürfen zwei Karten sichtbar sein, weshalb der aktive linke Dot nicht die letzte Karte nennen muss. Ein abgewiesener CDP-touchCancel-Aufruf endete vor einer Geste; die korrigierte Bestätigung endete mit Exit 0. Kein Produktfix aus dieser Prüfung. Ein abgebrochener EN-Visual-Editor-Devrequest ist getrennt protokolliert; keine JS-Fehler.

Browser geschlossen. Schreibende Requests gesperrt, tatsächlich keine ausgelöst. Keine Buchungs-/Kontakt-/Antragsaktion, keine zusätzlichen Seiten und keine weitere Gestaltungsrunde. Genau zwei repräsentative Viewports: [Hero 390](partner-qa/partner-390-hero.png), [Rollen 767](partner-qa/partner-767-rollen.png).

Belege: [verdichtete Prüfung](partner-qa/reviewed-metrics.json), [erste Rohmessung](partner-qa/metrics.json), [enge Touchbestätigung](partner-qa/touch-confirmation.json). Quellprüfungen vor Browserpass: Partnervertrag 125 Übersetzungsschlüssel, Conversionvertrag, FriendlyIcons, gezielter JSX-Lint und Diffprüfung grün; Original-DE/EN-Partnercopy per JSONvergleich erhalten.
