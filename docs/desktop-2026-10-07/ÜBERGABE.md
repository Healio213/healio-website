# Desktop-Überarbeitung Healio

Stand: 07.10.2026 · Branch `codex/desktop-kassenboost-20261007`

Frank hat die Veröffentlichung und anschließend die finale Startseiten-Headline freigegeben. Der Releasekandidat führt die vorhandene mobile Karten-Fassung, die neue Desktop-Darstellung und den aktuellen Stand von `origin/main` zusammen. Veröffentlichung ausschließlich über GitHub `main` und Vercel-Autodeploy.

## Freigegebene Textrichtung

- Startseite: „Dein Kassenbonus ist zu wertvoll, um ihn ungenutzt zu lassen.“ Der konkrete Nutzen bis zu 3.000 EUR in 2 Jahren steht direkt darunter.
- Ambulant: „Warum bezahlst du Privatleistungen selbst, während dein Kassenbonus ungenutzt bleibt?“
- Zahn: „Dein Lächeln ist dein stärkstes Statussignal. Warum überlässt du es dem Kassenstandard?“
- Stationär: „Wenn es um deine Gesundheit geht, sind Arztwahl und Privatsphäre keine Nebensache.“
- Partner: „Wie viele hochwertige Behandlungspläne verlierst du an die Angst vor dem Eigenanteil?“

Frank hat die Startseiten-Headline und anschließend die A-Richtung für Produkt- und Partnerseiten gewählt. Die vorhandene Du-Ansprache bleibt; unbelegte Milliardenbehauptungen und vermeintliche medizinische Priorität wurden durch konkrete Bonusnutzung, Arztwahl und Privatsphäre ersetzt. Deutsche und englische Hero-Texte sind auf Desktop und mobil angepasst. Mobil wurden Abstände und Reihenfolge im Hero so korrigiert, dass die bestehenden primären Aktionen auch bei 320 px erreichbar bleiben.

## Umfang und mobile Basis

- Startseite `/`, Ambulant `/ambulant`, Zahn `/zahn` und Stationär `/stationaer`, jeweils mit deutscher und englischer Desktop-Fassung.
- Ausgangspunkt ist die mobile Karten-Fassung `7d49899` vom 07.10.2026. Ihre Swipe-Karten, Reihenfolge und Inhalte bleiben erhalten; die freigegebenen Hero-Texte sind bewusst neu.
- Die neue Darstellung beginnt bei `lg`, also 1.024 px. Darunter bleibt die bestehende Fassung sichtbar. Responsive H1/H2 erhalten eine klare Überschriftenhierarchie; pro Ansicht ist genau ein H1 vorgesehen.
- Bestehende Hashnavigation bleibt erreichbar. Auf der Desktop-Startseite werden `#so-funktioniert` und `#schutz` den neuen Abschnitten zugeordnet; die mobilen Sprungziele bleiben bestehen.
- Neue Desktop-Komponenten: [DesktopLead.jsx](../../src/components/desktop/DesktopLead.jsx), [desktopLeadContent.js](../../src/components/desktop/desktopLeadContent.js) und [DesktopHomeJourney.jsx](../../src/components/desktop/DesktopHomeJourney.jsx). Die vier Seiten und ihre bisherigen Hero-Komponenten integrieren die responsive Trennung; [useDesktopLayout.js](../../src/hooks/useDesktopLayout.js) und [ScrollToTop.jsx](../../src/components/ScrollToTop.jsx) sichern Überschriften und Sprungnavigation.

## Aussagen und Bedingungen

Tarifleistung, Versicherungsbeitrag und Kassenbonus werden getrennt erklärt. Der Kunde zahlt den Beitrag zunächst selbst. Ein späterer Bonusausgleich setzt die jeweiligen Bonusbedingungen und erforderlichen Aktivitäts- beziehungsweise Kostennachweise voraus und ist auf anrechenbare Kosten begrenzt.

Bis zu 3.000 EUR sind ein Tarifbudget für versicherte Leistungen über zwei Kalenderjahre, kein frei verfügbares Guthaben: 500 EUR Sehhilfen, 1.000 EUR Heilpraktiker, 500 EUR Vorsorge und 1.000 EUR Hilfsmittel/Zuzahlungen. Maßgeblich bleiben Tarifstufe, Leistungsgrenzen und Bedingungen. Zahn- und Kliniktexte versprechen keine automatische Annahme, garantierte medizinische Priorität oder pauschale vollständige Erstattung.

Die Produktquellen wurden fachlich geprüft:

- IKK classic: [Bonusprogramm](https://www.ikk-classic.de/pk/rv/produkte/bonusprogramm), [Infoblatt](https://cdn.ikk-classic.de/exporter/19125-infoblatt-ikkbonus.pdf) und [Teilnahmebedingungen 2026](https://cdn.ikk-classic.de/exporter/19145-teilnahmebedingungen-ikk-bonus-website-2026.pdf).
- SDK: [Bedingungen der ambulanten AP-Tarife](https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf) und [Krankenhauszusatzversicherung](https://www.sdk.de/versicherungen/zusatzversicherung/krankenhauszusatzversicherung/).
- Die Bayerische: [Zahnzusatzversicherung](https://www.diebayerische.de/versicherungen/zahnzusatzversicherung/).

## Prüfung und Vorschau

- Vollständiger Build grün: 75 Prerenders; 79 indexierbare und 19 `noindex`-Seiten.
- Elf passende Vertragstests einschließlich Hebammen und zwölf Formularen, gezieltes ESLint und Diff-Check grün.
- Mobile Hero-Prüfung nach Copy-Anpassung: 24 deutsche/englische Ansichten bei 320/360/390 px grün, keine Textüberläufe, primäre Aktionen im ersten Sichtfeld, Trefferflächen mindestens 44 px.
- Finale Browserprüfung: acht Desktopansichten, vier mobile Produktseiten mit unveränderten Swipe-Karten und bedienbarer zweiter Karte, vier Breakpoints (767/768/1.023/1.024 px) und elf Navigationsprüfungen einschließlich Partner bei 320/360/390/1.440 px grün. Der reguläre Partner-Buchungstest wählt auf beiden Vergleichsseiten „Nur notwendige“; die First-Visit-Prüfungen der Desktop-CTAs bleiben bestehen. Belege: [ergebnis.json](./pruefung/ergebnis.json) und Screenshots in `pruefung/`.
- Hebammenseite in DE/EN bei 1.440/390/320 px geprüft: eine H1, volle Breite, kein Überlauf, Terminbutton vor dem Fold und frei vom Consent-Banner, zwei Fallkarten, sechs bedienbare FAQs und drei echte PDF-Downloads mit HTTP 200.
- Lokale Vorschau: [127.0.0.1:3198](http://127.0.0.1:3198/). Ein öffentlich weiterleitbarer Vorschau-Link erfordert noch Hosting oder einen Tunnel.

## Release-Abgleich

Die zuvor fehlenden Blogfixes `577cba2` und `c636b93` wurden mit Merge `5a352aa` konfliktfrei aus `origin/main` übernommen. Die fachlich korrigierte Osteopathie-Tabelle, ihre Prüfregel und das mobile Tabellen-Scrolling bleiben erhalten.

Die Veröffentlichung umfasst auch die bestehende mobile Experimentbasis mit 93 gegenüber dem vorherigen `main` geänderten Pfaden. Consent, Routing, neue Formulare und Tracking wurden zusätzlich geprüft: keine weiteren P1/P2-Befunde. Alle neun ausgewählten Vertragstests bestehen; Form-Hardening prüft zwölf Formulare. Zwei fehlende native POST-/Kontakt-Fallbacks wurden ergänzt, vorhandene JavaScript-Submitwege bleiben erhalten. Überholte Layout-Prüfregeln prüfen nun die tatsächlichen Klassen, Reihenfolgen und Footer-Daten. Details: [Release-Prüfung](./RELEASE-PRÜFUNG.md).

Für die Live-Website bleibt [DEPLOY.md im Live-Repository](../../../website-b2b-src/DEPLOY.md) verbindlich. Der finale Produktionsbuild mit sämtlichen Copy- und Hebammen-Ergänzungen ist bestanden: 75 Prerenders ohne Fehler, 79 indexierbare/19 noindex-Routen, 23 Blogartikel und zwei Hubs, 98 Schema-Routen geprüft. Release-Scan: 117 Pfade, keine sensiblen Dateipfade und keine Secret-Muster. Veröffentlichung auf `main` ist von Frank beauftragt; Vercel-Status zum veröffentlichten Commit vor Abschluss bestätigen.

## Hebammen: Originalprüfung und Muster

Die Bayerische-Korrespondenz wurde am 07.10. in Franks lokalem Outlook gelesen: „AW: Unterlagen Direktvereinbarung“, Bastian Lexhaller, 06.10.2026 um 12:47 und 16:43. Die erste Mail bestätigt die besondere Wartezeit von acht Monaten auch für die genannten ambulanten Hebammenleistungen während Schwangerschaft/Wochenbett. Dies geht über die ausdrückliche AVB-Nennung „Entbindung“ hinaus und beschreibt die aktuelle Leistungspraxis. Die zweite Mail stellt klar: 50 EUR waren ein einzelnes Abrechnungsbeispiel; zulässige Privatposition, Gebührenregelung und GKV-Abgrenzung sind im Einzelfall nötig. Keine Doppelabrechnung derselben Leistung.

Die neue Hebammenkommunikation richtet sich an frühzeitige Vorsorge, möglichst vor einer Schwangerschaft. Zwei Fallkarten erklären Restkosten und den Abrechnungsweg. Drei ausfüllbare PDFs mit ausschließlich leeren Feldern: Kosten-/Rechnungsmuster, Leistungs-/Honorarvereinbarung als individuell zu prüfende Arbeitsvorlage und Familien-Checkliste. Keine pauschalen Besuchssätze, Honorargarantien oder Erstattungszusagen. Generator: `scripts/build-hebammen-downloads.py`; PDFs: `public/downloads/hebammen-*.pdf`. Je eine Seite, 14/11/4 leere Formularfelder, PDF-Struktur und alle drei gerenderten Seiten geprüft.

Frank hat am 07.10. eine weitere Nachfrage an Bastian beauftragt; um 13:34 Uhr in lokalem Outlook versendet und im Ordner „Gesendet“ bestätigt. Erbeten sind die konkrete Grundlage der acht Monate für ambulante Leistungen sowie die Nutzung bei bestehender Schwangerschaft. Antwort offen, keine automatische Nachprüfung. Die Website gibt den aktuellen Stand der Fachauskunft wieder und verspricht keine Sofortdeckung. Der pauschale Ausschluss sämtlicher Leistungen einer bereits festgestellten Schwangerschaft wurde ausdrücklich vermieden: Laut Produktsteckbrief geht es um bereits laufende oder angeratene Untersuchungen/Behandlungen; spätere Leistungen bedürfen eigener schriftlicher Prüfung.
