# Healio: mobile Ansicht straffen

Stand: 14.10.2026. Auftrag von Frank: Die mobile Healio-Website soll weniger Text zeigen, schlank und luftig wirken und das Wesentliche erkennen lassen. Desktop bleibt bestehen.

## Umsetzung

Die Anpassung betrifft die Startseite, die Versicherungsübersicht sowie Ambulant, Zahn und Stationär auf Deutsch und Englisch. Unter 768 px werden eigene kurze Einstiege und übersichtliche Zielwege gezeigt. Die bestehenden Texte und Desktopdarstellungen ab 768 px bleiben erhalten; die separaten Desktop-Szenen ab 1.024 px wurden nicht bearbeitet.

- Startseite: kurze Überschrift, KassenBoost als Hauptaktion, Budgetlink mit Einordnung und drei sichtbare Zielwege. Ablauf und Schutzbereiche als leichte Zeilen statt hoher Wischkarten. Beispielrechnung und längere Erklärungen sind aufklappbar.
- Versicherungsübersicht: vier direkt erkennbare Schutzbereiche mit kurzem Nutzen. Weniger wiederholte Überschriften, Knöpfe und Erläuterungen.
- Produktseiten: kurze Einstiege; ausgewählte Zusatzinformationen, Stufenübersichten und Zimmerkostenrechnung aufklappbar. Tarifwahl, Preisberechnung, Antragswege und wichtige Leistungsgrenzen bleiben erreichbar.
- Gemeinsame Elemente: Video-Hinweise auf Wunsch öffnen, schlanker Bonus-Rechner-Einstieg mit vorhandener Figur, kurze mobile App-Beschreibung im Seitenfuß.

Es wurden keine Tarife, Preise, Berechnungsmodelle, Antragsziele, Consent-Regeln oder Versandabläufe geändert. Der native Altersgruppen-Aufklapper wird nur einmal gerendert. Die alte Zeilenbegrenzung der Zahnkarten bleibt am Desktop erhalten.

## Arbeitsstand und Prüfung

Basis: GitHub `main`, `eeaaac0`. Umsetzung im isolierten Arbeitsordner `Website Healio/website-b2b-src-mobile-20261014`, Branch `codex/mobile-luftig-20261014`. Der Hauptcheckout enthält fremde Änderungen und wurde nicht zurückgesetzt oder überschrieben.

Die lokale Baseline stammt aus dem unveränderten Commit. Vollbilder und Messwerte liegen in `baseline/`. Der Browservergleich erfasst tatsächlich lesbaren Haupttext, schließt geschlossene Aufklapper und horizontal abgeschnittene Karten aus. Die Zahlen sind eine Vergleichsmessung der jeweiligen Standardansicht, keine Nutzerstudie.

Finale Build-, Browser- und Veröffentlichungsnachweise werden nach Abschluss ergänzt.

## Finale Browserprüfung

70 Ansichten im ersten Durchgang, danach 19 Ansichten in einer gebündelten Bestätigung. Bildschirmbreiten: 320, 360, 390, 430, 640, 768 und 1.440 px. Deutsch und Englisch. Alle fünf Desktopseiten behalten Haupttext, H1- und CTA-Maße sowie Seitenhöhe. Minimale verstreute Rasterunterschiede ohne Layoutänderung bleiben unter 0,001 %.

Keine Seitenüberbreite, keine doppelten IDs und keine kaputten Bilder. Native Aufklapper mit Pointer und Tastatur, Bonus-Einstiege sowie Tarifwahl geprüft. Zwei anfänglich unbestätigte Stufenklicks des Testablaufs wurden nach stabilem Scrollen mit echtem Pointer erfolgreich bestätigt; kein Produktfix dafür. Keine Formulare versendet und keine persönlichen Angaben eingegeben.

| Seite (390 px) | Sichtbare Wörter vorher | Danach | Weniger |
|---|---:|---:|---:|
| / | 354 | 154 | 56,5 % |
| /leistungen | 302 | 134 | 55,6 % |
| /ambulant | 1221 | 902 | 26,1 % |
| /zahn | 1106 | 753 | 31,9 % |
| /stationaer | 1447 | 1166 | 19,4 % |

Prüfung: sechs Quellverträge und gezieltes ESLint aller geänderten JSX-Dateien bestanden. Impeccable-Detector: ausschließlich der bestehende Desktop-Textverlauf in `ServicesHero.jsx`; bewusst erhalten, da Desktop unverändert bleiben soll.

Screenshots und Rohmessungen liegen lokal in diesem Arbeitsordner; sie werden nicht vollständig in Git aufgenommen. `verification-summary.json` enthält den kompakten Vergleich. Build und Veröffentlichungsstatus werden abschließend ergänzt.

## Vollständiger Build

`npm run build` bestanden: 246 Seiten vorgerendert, 0 Fehler; 269 SEO-/Schema-Routen, 179 Ratgeber und 23 Blogartikel geprüft. Der vorherige Build wurde für den gebündelten Browserfix kontrolliert abgebrochen; dieser Nachweis betrifft ausschließlich die finale Fassung.
