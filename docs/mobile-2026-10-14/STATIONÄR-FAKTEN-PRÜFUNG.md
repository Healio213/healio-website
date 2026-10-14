# Stationär: vier mobile Themen

14.10.2026 · Ein gebündelter Inspectionpass auf Dev `http://127.0.0.1:4834`: `/stationaer` bei 360, 390, 767 und 1440 px; `/en/inpatient` bei 390 px. Der Desktopabschnitt wurde einmal direkt mit `https://healio.de/stationaer` verglichen.

**Keine Regression am Themenquartett.** 20 Checks und der Desktopvergleich sind grün.

- Die vier Themen stehen mobil untereinander und sind anfangs geschlossen. Jede Summary ist 56 px hoch.
- Alle vier Themen öffnen durch echte Zeigerklicks. Tab erreicht die vier Summaries in Reihenfolge; Enter und Leertaste öffnen und schließen die nativen Details.
- Vollständige originale Texte, Beträge und Bedingungen passen in beiden Sprachen. Der Familienlink bleibt im Schwangerschaftsthema sichtbar und erreichbar; er wurde nicht angeklickt.
- Keine Überbreite, überstehenden Abschnittselemente, doppelten IDs oder JavaScript-Fehler. Bild- und CTA-Bereich bleiben vorhanden, sichtbare Bilder geladen.
- Bei 1440 px stimmen sichtbare Copy, Sektions- und Elementgeometrie, Bilder und Links exakt mit dem geprüften Liveabschnitt überein.

Die geschlossene DE-Ausschnittaufnahme enthält den vorhandenen festen Nita-Pill am unteren Viewportrand, der einen Teil der letzten Zeile überlagert. Nach Scrollen zur Zeile waren alle vier echten Klickziele frei und bedienbar. Das Quartett verändert diese vorhandene globale UI nicht.

Nachweise unter `alleseiten-bestätigung/`: `stationaer-facts-metrics.json`, `browser-stationaer-facts.mjs`, zwei Ausschnitte `facts-de-390-closed.png` und `facts-en-390-pregnancy-open.png`.

Keine Formulare, Buchungen oder Versichererlinks betätigt; keine schreibenden Netzaufrufe ausgelöst. Browser geschlossen. Keine Produktdateien geändert, kein Build oder Push.
