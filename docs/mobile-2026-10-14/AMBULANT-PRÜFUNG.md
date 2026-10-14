# Ambulant mobil gezielt geprüft

Stand: 14.10.2026. Lokal auf Port 4830, nach Franks weiterem Auftrag zur mobilen Ambulant-Straffung und nach dem letzten Fix für dynamische Topfbeträge im Stufendetails-Aufklapper. Keine Produktdateien bearbeitet und keine Veröffentlichung ausgeführt.

Sechs gezielte Ansichten und 130/130 fachliche Layout-/Interaktionsprüfungen bestätigt. Keine weitere Fünf-Seiten-Matrix. Zehn echte Touch-Gesten bewegen die beiden erhaltenen Hauptreihen (Hero-Erstattungstöpfe und Drei-Schritte-Bildkarten) in allen fünf mobilen Ansichten. Die URLs bleiben dabei gleich; der entfernte Ledger wird nicht als Wischreihe erwartet.

| Ansicht | Breite (px) | Sichtbare Haupttextwörter | Seitenhöhe (px) | Checks |
|---|---:|---:|---:|---:|
| `/ambulant` | 360 | 538 | 9373 | 26/26 |
| `/ambulant` | 390 | 538 | 9163 | 26/26 |
| `/ambulant` | 430 | 538 | 9030 | 26/26 |
| `/en/outpatient` | 390 | 594 | 8611 | 26/26 |
| `/ambulant` | 1440 | 1337 | 12653 | 6/6 |
| `/ambulant?src=bonus-check` | 390 | 406 | 7032 | 20/20 |

## Tatsächliches Textdelta

Ambulant bei 390 px: **538 statt 1.221 sichtbare Haupttextwörter** gegenüber `eeaaac0`, also 683 Wörter beziehungsweise 55,9 % weniger. Gegenüber der unmittelbar vorher geprüften Bildfassung sind es 327 Wörter weniger (865 → 538). Die Zählung berücksichtigt DOM-Rechtecke, CSS-Sichtbarkeit und geschlossene Details; horizontal außerhalb der Wischreihe liegende Texte werden ausgeschlossen. Es handelt sich um sofort sichtbaren Text, nicht um gelöschte fachliche Informationen.

Die Seitenhöhe beträgt 9.163 statt ursprünglich 13.952 px. Dieser Höhenwert wird getrennt bewertet: Frank wollte die große IKK-Brückenszene mobil offen erhalten. Sie ist bei 390 px **358 × 586,859 px** groß, mit vollständig sichtbarer, nicht gestreckter Darstellung (`object-fit: contain`). Das Herobild bleibt groß im originalen 3:2-Format: **356 × 237,328 px**.

## Bestätigte Funktionen

- „Auf einen Blick“, „So verteilt sich dein Budget“, der zusätzliche dunkle Bonus-Werbeblock und die Bonus-2026-Dringlichkeitszeile sind mobil unsichtbar.
- Geburtsjahr 1990 wird als fiktiver lokaler Prüffall angenommen. Alle vier Stufen zeigen die korrekten Beiträge der Gruppe 31–40: AP5 12,29 EUR, AP7 18,71 EUR, AP9 33,84 EUR und AP1 39,19 EUR. Die SDK-Linkparameter wählen jeweils die passende Stufe. Antragslinks wurden ausschließlich gelesen, niemals angeklickt.
- „Details zur gewählten Stufe“ startet geschlossen, öffnet per echtem Pointer und bleibt während der Stufenänderung offen. Seine vier Topfbeträge wechseln korrekt mit AP5/AP7/AP9/AP1. Kein weiterer offener Ledgerabschnitt und keine neue Wischerwartung.
- UKV bleibt eine freiwillige Ergänzung. Der optionale Detailsbutton öffnet die vollständigen vorhandenen Texte: Erwachsenen-/Kinderpreis, Sehhilfezuschlag, Altersregel, Leistungsstaffel, Antragsfragen, Laufzeit/Kündigung und Antragsweg. Danach lässt sich der Inhalt schließen.
- ARAG-Aufklapper und IKK-Detailsbutton öffnen sichtbar per echtem Pointer. Der Bonusrechner beginnt geschlossen, öffnet seinen Rechnerinhalt und schließt wieder. Drei Schritte, FAQ und deutscher Bonus-Leitfaden sind erreichbar; eine FAQ öffnet und schließt per Pointer.
- Der Bonus-Themeneinstieg `/ambulant?src=bonus-check` hält Leistungen und Beitrag getrennt von einer persönlichen Bonusprüfung. Er bestätigt keinen Bonus und zeigt die IKK-Wechsel-/Bonusrechnerstrecke sowie UKV nicht als zusätzlichen Pflichtweg.

Keine Seitenüberläufe, doppelten IDs, defekten sichtbaren Bilder, gestreckten Bilder oder JavaScript-Laufzeitfehler. Bekannte Entwicklungsdiagnostik: React-Warnungen zu fetchPriority/UNSAFE sowie die vorhandene englische Visual-Editor-404. Keine Formulare, Leads, Kontakt-, Beratungs- oder externe Antragsaktionen.

## Desktop und Prüfskript

Ambulant bei 1440 px ist gegenüber `eeaaac0` **pixelgleich**. Sichtbare Wörter (1.337), Seitenhöhe (12.653 px), H1 und Hero-CTA-Maße sind exakt gleich.

Zwei Harnessannahmen wurden aus den gespeicherten DOM-Belegen korrigiert: UKV verwendet ebenfalls den Level-Nine-Host, sodass SDK-Ziele anhand `mandant=sdk` gefiltert werden; der Bonusrechner hat zunächst Aktivitätsbuttons, während ein Input erst beim Bearbeiten erscheint. 24 ursprünglich zu streng gewertete Checks sind transparent mit `initialHarnessPassed` und `harnessAdjustment` markiert. Die Rohdaten bleiben in `metrics-raw-harness.json` erhalten. Es wurde keine fehlgeschlagene Produktprüfung verworfen und keine weitere Browserrunde benötigt. Ein anfänglicher Testabbruch durch die zusammengesetzte Stufenbutton-Beschriftung wurde vor dem vollständig erfassten Pass korrigiert.

Belege und Screenshots: `ambulant-qa/metrics.json`, `ambulant-qa/metrics-raw-harness.json`, `ambulant-qa/comparison.json`, `ambulant-qa/VERIFIKATION.json`, `ambulant-qa/browser-ambulant.mjs`. Die korrigierte Auswertung endete mit Exit 0 und 130/130 bestätigten Checks. Browser geschlossen; Vite kann für den Vollbuild gestoppt werden.
