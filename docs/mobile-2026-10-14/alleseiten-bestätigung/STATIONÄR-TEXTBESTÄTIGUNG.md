# Stationär: enge Textbestätigung

14.10.2026 · Dev `http://127.0.0.1:4834` · DE/EN bei 390 px und DE bei 1440 px, dazu ein direkter Desktopvergleich des Bonusabschnitts mit `https://healio.de/stationaer`.

**Keine Produktbefunde.** Alle 14 Einzelchecks und der Desktopvergleich sind grün.

- Mobil bleibt das SPU-Beispiel anfangs geschlossen. Beide Sprachversionen öffnen es durch einen echten Zeigerklick auf die sichtbare Summary. Sämtliche Modellbeträge, Texte und Bedingungen sind anschließend vorhanden; nichts fehlt.
- Die große offene Bonus-Stempelkarte, ihr Motiv und das Entscheidungsbild bleiben sichtbar. Bonus-CTA und der nachfolgende Bonusrechner sind erreichbar. Der Rechner wurde nicht geöffnet.
- Keine Überbreite, doppelten IDs oder JavaScript-Fehler. Keine Formulare, Anträge oder Versichererlinks betätigt; keine schreibenden Netzaufrufe ausgelöst.
- Desktop: Titel, Originalprosa, vollständiges Modell, Bilder, CTA und relative Geometrie stimmen mit dem direkt geprüften Liveabschnitt überein. Der Modellinhalt steht auf Desktop offen im Layout.

Nachweise: `stationaer-text-metrics.json`, `stationaer-text-de-390.png`, `stationaer-text-en-390.png`, `stationaer-text-de-1440.png`, `stationaer-text-live-1440.png`.

Zwei Harnessannahmen wurden korrigiert: Der geschlossene Aufklapper wurde über seine sichtbare Summary bewertet, und nur sichtbare, bereits geladene Bilder wurden dekodiert. Zwei Labelvergleiche wurden anschließend ausschließlich anhand der gespeicherten Browsersnapshots korrigiert, weil CSS den sichtbaren Text großschreibt. Kein zusätzlicher Browserlauf dafür.

Browser geschlossen. Keine Produktdateien geändert, kein Build, Commit oder Push.
