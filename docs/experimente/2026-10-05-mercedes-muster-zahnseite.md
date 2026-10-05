# Experiment: Mercedes-Muster auf healio.de/zahn

Stand: 05.10.2026 · Zweig `experiment/mercedes-karten` · nur lokal, nicht live

## Was die Mercedes-Seite gut macht

Angesehen: Modellseite der elektrischen C-Klasse (mobil), dazu Franks sechs Screenshots.

1. **Ein Hauptknopf bleibt immer oben** („Fahrzeug konfigurieren“), egal wie weit man scrollt.
2. **Highlight-Karten zum Wischen**: großes Bild oben, dunkles Textband unten, zwei Zeilen Vorschau, die nächste Karte schaut am Rand heraus. Antippen öffnet die Details.
3. **Reiter mit Listenkarten** („Multimedia / Assistenzsysteme / Sicherheit“): viel Inhalt, aber immer nur ein Thema sichtbar.
4. **Schwebender KI-Knopf** („Frag KI“) mittig unten, immer in Daumennähe.
5. **Dunkles Zwischenbanner** mit einem einzigen Knopf („Simulatoren entdecken“).
6. **Kontaktformular ganz unten**, damit niemand am Seitenende ins Leere läuft.

Reihenfolge der Seite: Angebot mit Preis, Highlights, Außen, Innen, Ausstattung (Reiter), Antrieb, Technische Daten, Kontaktformular.

## Was im Experiment umgesetzt ist (alles in Healio-Farben)

| Muster | Umsetzung auf /zahn | Datei |
|---|---|---|
| Karten zum Wischen | 6 Karten direkt unter den Siegeln: angeraten (1.500 EUR), Maximalschutz (100 %), Lücke (1 bis 3 Zähne), Familie, Einstieg (75 %), Kassenbonus. Antippen öffnet ein Detailfenster von unten. | `src/components/sections/dental/DentalHighlightCards.jsx` |
| Hauptknopf oben | Beim Scrollen erscheint oben „Zahn-Check“ (Handy) bzw. „Zahn-Check starten“ (Desktop). | `src/components/Header.jsx` |
| Frag KI | Leiste „Frag Nita · am Telefon“ mittig unten, rechts daneben WhatsApp. Ruft heute die Nita-Telefonlinie an; sobald Nita im Browser freigeschaltet ist, öffnet derselbe Knopf Nita direkt auf der Seite. Verschwindet über dem Zahn-Check, dem Formular und dem Footer. | `src/components/sections/shared/NitaQuickPill.jsx` |
| Kontaktformular unten | „Lieber kurz sprechen?“ mit nur zwei Pflichtfeldern (Vorname, Telefon), Thema und Wunschzeit zum Antippen. Versand über den bestehenden Mailweg der Website. | `src/components/sections/dental/DentalCallbackForm.jsx` |

Alle Texte in Karten und Detailfenstern kommen 1:1 aus den geprüften Ergebnissen des Zahn-Checks (`dentalContent.js`). Neue Zahlen oder Versprechen gibt es nicht.

## Meine Einschätzung

- **Kontaktformular unten: klar ja.** Wer bis zum Ende liest, ist interessiert, findet aber bisher nur den Zahn-Check-Knopf. Zwei Pflichtfelder sind die kleinste mögliche Hürde. Lohnt sich auf allen Produktseiten.
- **Karten: ja, mit einer Folge.** Die Karten erklären die Zwei-Wege-Logik (Bayerische nur bei angeratener Behandlung, sonst UKV) schneller als Fließtext. Bei Übernahme sollte der bisherige Abschnitt „Zwei Wege. Sauber getrennt.“ weiter unten entfallen, sonst steht dasselbe doppelt da.
- **Frag Nita: erst live, wenn die Agentin abgenommen ist.** Ein prominenter Knopf, der eine halbfertige Stimme anruft, schadet mehr als er hilft.
- **Nächste sinnvolle Orte für Karten:** /schwangerschaft (Bonus, Vorsorge, Zusatzschutz sauber getrennt) und die Übersicht /leistungen mit Reitern „Ambulant / Stationär / Zahn / Tier“ nach dem Ausstattungs-Muster von Mercedes.

## Vor einem Livegang zu klären

1. Soll eine Formular-Anfrage in Google Ads und Meta als „Anfrage“ zählen? Ist im Experiment bewusst noch nicht eingebaut.
2. Die Mail-Vorlage zeigt die Herkunft „Zahnseite Rückruf“; kurz prüfen, ob sie im Postfach gut auffällt.
3. Die Prüfung `scripts/check-whatsapp-contact-rendered.mjs` schlägt schon vorher fehl, weil sie zwei schwebende Knöpfe (Nita und WhatsApp) erwartet, Nita im Browser aber ausgeschaltet ist. Das betrifft /partner, nicht dieses Experiment.
