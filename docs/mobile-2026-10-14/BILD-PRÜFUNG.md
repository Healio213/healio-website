# Mobile Bilder, Wischkarten und Siegel geprüft

Stand: 14.10.2026. Lokale Prüfung auf Port 4830, vor der anschließend beauftragten weiteren Ambulant-Straffung. Keine Veröffentlichung oder endgültige Releasefreigabe.

35 Ansichten: alle fünf Kernseiten auf Deutsch und Englisch bei 360, 390 und 430 px; zusätzlich alle fünf deutschen Desktopseiten bei 1440 px. Große mobile Herobilder sind wieder 3:2 (Home bei 390 px: 356 × 237,328 px). Keine gestreckten Bilder, defekten sichtbaren Assets, doppelten IDs, Seitenüberläufe oder JavaScript-Laufzeitfehler.

16 gezielte Folgeansichten bestätigen 48 echte CDP-Touch-Gesten: jede sichtbare Wischreihe aller zehn Routen bei 390 px, Home zusätzlich bei 360/430 px und deutsche Produktseiten bei 767 px. Die nächste rechte Karte wird erreicht; Seitennavigation und Seitenbreite bleiben stabil. Der erste 35-Ansichten-Pass enthielt einen Testskriptfehler in der Sichtbarkeitsprüfung und liefert nur Bild-/Layoutbelege. Die Gesten stammen ausschließlich aus der korrigierten Folgeprüfung.

Desktop gegenüber eeaaac0: alle fünf Seiten haben exakt dieselben sichtbaren Wörter, Überschriften, Hero-CTA-Maße und Seitenhöhen. Vier Screenshots sind pixelgleich; Leistungen hat einen abweichenden Pixel über der Vergleichsschwelle (0,00001 %).

SDK-, UKV-/Bayerische- und IKK-Siegel: Originalbilder 96 px hoch; Laufband bewegt sich bei normaler Bewegungseinstellung und pausiert bei Hover sowie Tastaturfokus. Dekorative Wiederholungen sind aria-hidden und haben leere Alt-Texte. Bei reduzierter Bewegung stehen die Originale jeweils einmal ohne Animation. Bei 767 px ist eine halbe Laufbandliste mindestens so breit wie das Band, sodass keine Leerstelle entsteht.

Die zunächst versteckte IKK-Komponente wurde als echter Befund an Root gemeldet; Root hat die alte mobile Hüllenausblendung entfernt. Danach wurden IKK auf Ambulant, Zahn und Stationär jeweils frisch bei 390 und 767 px geprüft: 24/24 Prüfungen bestanden. Insgesamt 144/144 Bildfolge-/Interaktionsprüfungen bestanden (48 Touch-Gesten und 96 Siegelprüfungen).

Es wurden nur öffentliche Inhalte geladen und lokale Aufklapper bzw. Testgesten benutzt. Keine Formulare, Kontakte, Beratung oder externe Antragsaktionen. Entwicklungswarnungen zu fetchPriority/UNSAFE und die vorhandene englische Visual-Editor-404 sind als bekannte Entwicklungsdiagnostik dokumentiert.

Belege: `bilder-qa/metrics.json`, `bilder-qa/comparison.json`, `bilder-qa/VERIFIKATION.json`, `bilder-bestätigung/metrics.json` und `bilder-ikk-bestätigung/metrics.json`. Screenshots und ausführbare Testskripte liegen in den jeweiligen Unterordnern. Neue Ambulant-Änderungen benötigen anschließend eine gezielte eigene Bestätigung.
