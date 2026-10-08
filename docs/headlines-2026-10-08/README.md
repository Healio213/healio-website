# Healio: Headlines und Conversion-Texte

Stand: 08.10.2026. Umsetzung der von Frank eingefügten neun Seitenblöcke einschließlich Video-Karten und UI-Zuständen.

Basis: aktuelles GitHub `origin/main`, `f8e4918`. Eigener Branch `codex/healio-headlines-20261008`; die vielen parallelen Änderungen im primären Checkout wurden nicht berührt. Der separate Handy-Tempo-Kandidat ist keine Grundlage dieser Änderung.

## Umsetzung

| Bereich | Ergebnis |
| --- | --- |
| Startseite | Vorgegebene Frage „Warum lassen Sie jedes Jahr hunderte Euro bei Ihrer Krankenkasse liegen?“, direkte Subheadline, Kassenpotenzial-CTA mit Kostenfrei-Hinweis, scharfer Abschluss. Mobil und Desktop. |
| Video-Karten | Titel vor dem Player, Nutzenbotschaft, optionaler Badge, Subline und Bedingungen. Native Steuerung, Untertitel und `preload="none"` erhalten. Keine Audio- oder Videodatei verändert. |
| Ambulant | Bestehende scharfe Headline erhalten; CTA „Ambulantes Budget prüfen“; Bonusberechnung initial offen; Microcopy im dunklen Abschluss direkt nach dem Hauptbutton. |
| Zahn | Status-Headline erhalten, neue präzise Nutzen-Subline vor dem Button; Bedingungen direkt darunter. Video-Badge ZahnPRIVAT 100. Bonusberechnung initial offen. Nita-Hinweis frühestens nach 35 Sekunden, auch mit abschließendem Slash und bei englischer Route. |
| Kassenbonus | Vorgegebene Verlustfrage und Subheadline; Kostenfrei-Hinweis bleibt in derselben vertikalen Gruppe unter dem Button. Video mit Nutzen-Subline und individuell begrenztem Zuschuss. |
| Tier | „Jetzt kostenfreie Tarifprüfung anfordern.“ mit gewünschtem Subtext und neuem Submit-Text. Auftrag-/Datenschutzcheckboxen und rechtliche Links erhalten. |
| Partner | Verlust-Headline, direkte Subheadline, deutlicher Outline-Button zum Praxis-Leitfaden; Video mit Budget-Badge und Subline. Sie-Anrede konsistent. |
| Unternehmen | Vorgegebene Lohnnebenkosten-/Bindungsheadline; ganzheitliche Subheadline mit konkreter Betreuung statt absoluter Rechts-/Aufwandsgarantie. Mobile Abstände und Schriftgröße an längeren Titel angepasst. |
| Über uns | Gründerstory in Ichform, neben bestehendem Gründerfoto. |
| Kontakt | Google-Maps-Komponente durch Standortkarte mit Adresse und persönlicher Erreichbarkeit ersetzt. |

Die deutschen Headlines bleiben eng an Franks Vorlage. Neue Inhalte und Zustände sind auch für die englischen Seiten umgesetzt, ohne dort deutsche Filme einzublenden. Bestehende Icon-Pfeile bilden die Pfeile aus dem Briefing ab; keine doppelten Pfeile in Text und Icon.

## Sachlich notwendige Präzisierungen

- Gesundheitsbudget: immer **bis zu 3.000 EUR in 2 Jahren**, durch den ambulanten Tarif. Kassenbonus kann den Beitrag ganz oder teilweise ausgleichen; kein frei auszahlbares Guthaben und keine pauschal kostenfreie Versicherung.
- Boni werden nicht automatisch bezahlt und setzen Programmvoraussetzungen und Nachweise voraus. Die Vorlage unterstellt eine Absicht der Krankenkassen, die nicht nachgewiesen ist. Entsprechende Sätze präzisiert. [§ 65a SGB V](https://www.gesetze-im-internet.de/sgb_5/__65a.html).
- **810 EUR sind kein allgemeines Maximum** der IKK classic. Die aktuelle Belegkette enthält kein Maßnahmen-Szenario für 270 EUR × 3. Daher kein neues 810-EUR-Titelversprechen; die unveränderte Filmangabe wird direkt unter dem Player eingeordnet. Zuschuss und Geldbonus sind Alternativen, Zuschuss auf anerkannte eigene Kosten begrenzt. [IKK-Teilnahmebedingungen 2026](https://cdn.ikk-classic.de/exporter/19145-teilnahmebedingungen-ikk-bonus-website-2026.pdf), [IKK-Bonusprogramm](https://www.ikk-classic.de/pk/rv/produkte/bonusprogramm).
- ZahnPRIVAT 100: bis zu 100 % der **erstattungsfähigen Gesamtkosten einschließlich Kassenleistung**, mit Staffel und Tarifbedingungen. Keine universelle Null-Eigenanteil-Zusage. Bestehende Prüfwege für bereits angeratene Behandlungen erhalten. [UKV](https://www.ukv.de/v/krankenversicherung/krankenzusatzversicherung/zahnzusatzversicherung.html).
- Die vorhandenen Start- und Partnerfilme dauern jeweils ungefähr 73–75 Sekunden. „In 60 Sekunden“/„1 Minute“ im neuen Titel deshalb zu **„gut einer Minute“** präzisiert.
- Partner: Healio übernimmt Versicherungsberatung und Antragsbegleitung. Keine allgemeine Haftungsfreiheit behauptet.
- Kontakt: ohne nachgewiesene Servicezusage keine neue 24-Stunden-Garantie.
- Der Rechner zeigt seine tatsächlichen Werte; 19,68 EUR sind keine fest verdrahtete Zusage.

## Prüfung

- Homepage-, Company-, Partner-, About-, Conversion-, Datenschutz-, Kontaktoberflächen-, Formular-, Erstinformations- und Praxis-Leitfadenverträge bestanden; Bonusmodell bestanden.
- Bestehende Ambulant-Auswahl- und Bonus-Renderprüfungen bestanden: DE/EN, initial offene Rechner, persönliche Kommaeingabe, Stufen-/Beitragswechsel, Reset und Smartphone-CTA. Tests prüfen das initiale Öffnen tatsächlich und öffnen den Rechner nicht mehr vorab selbst.
- Gezielt ESLint und `git diff --check` bestanden.
- Neun deutsche Seiten bei 320, 390 und 1440 Pixeln: 27 Ansichten ohne seitlichen Überlauf oder JS-Seitenfehler, jeweils genau eine sichtbare H1. [Messdaten](ui-messungen.json), [Screenshots](screenshots/).
- Zahn-Button nach Kürzung der Nutzen-Subline: ungefähr 587 px Unterkante bei 390 px Breite und 844 px Höhe, statt ungefähr 831 px. Bedingungen bleiben direkt darunter lesbar.
- Vollständiger finaler Produktionsbuild: läuft; Ergebnis wird nach Abschluss ergänzt.

## Weitergabe

Auf Franks ausdrücklichen Auftrag wurden zwei Nachrichten gesendet:

- „Kianbord-Website optimieren“: vorhandene scharfe KI-an-Bord-Vorlagen als Wortlautquelle nutzen, Headlines/Video-/Formulartexte abgleichen. Keine Healio-Budgetclaims übertragen; bestehende Video-Freigaben bleiben gültig.
- „Kassenboost-Conversion verbessern“: Verlustfrage, passende Subline und mobil unmittelbar platzierter Kostenfrei-Hinweis abgleichen; abgeschlossenen Umbau bewahren. Keine neue Produktionsfreigabe aus der Weitergabe ableiten.

## Veröffentlichungsstand

Lokal umgesetzt und geprüft. Noch kein Push auf `main` und keine Veröffentlichung auf healio.de. Eine Vorschau wird separat vorbereitet; sie ist keine Produktionsfreigabe.
