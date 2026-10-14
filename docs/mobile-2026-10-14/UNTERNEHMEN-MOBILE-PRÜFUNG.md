# Unternehmen: mobile Straffung und Wischkorrektur

Stand: 14.10.2026. Geprüfter Quellstand auf `9472626` plus dem beschriebenen lokalen Company-Paket. Kein Build, Commit oder Push durch diesen Agenten.

## Ursache und Änderung

Der Versorgungscheck war bei 390 Pixeln auf seine intrinsische Breite gewachsen: beide Gridchildren 983,39 Pixel; Wischtrack `clientWidth=1015`, `scrollWidth=1015`. Der äußere Seitenrahmen schnitt die Reihe ab. Es gab keinen Scrollweg innerhalb des Tracks.

Nur im CompanyRealityCheck begrenzt jetzt unter `md` eine `minmax(0,1fr)`-Spalte mit `min-w-0` die Reihe. Ab `md` gelten wieder die ursprüngliche Auto-Geometrie und das originale Raster. Der mobile Track misst nun 390/1015 Pixel und lässt sich in beide Richtungen wischen und mit den Punkten steuern. Shared-Komponenten bleiben unverändert.

Hero, Reality-Abschluss, Lösungskarten, Ablauf und Schluss zeigen kurze mobile Sätze. Wiederholte Video-, Lösungs-, Prozess- und Wirtschafts-Einleitungen sind mobil ausgeblendet. Die vollständigen ursprünglichen Lösungsbeschreibungen bleiben im vorhandenen Aufklapper. Originalbilder, FriendlyIcons, Videos, Quellen, Bedingungen, steuerliche Einordnung, Modellwerte, Rechner, Links, Anker und SEO bleiben erhalten. Alle bisherigen Werte beider Übersetzungsdateien sind nach Entfernen des neuen `mobile`-Objekts exakt gleich `HEAD`.

Geändert sind sieben vorhandene Company-Komponenten und nur neue mobile Copykeys in `de/en/unternehmen.json`. Die Seite selbst und alle globalen Shared-Komponenten sind unverändert.

## Erfasste Ansichten

Vier öffentliche Baselines und vier vollständig erfasste lokale Ansichten: `/unternehmen` und `/en/companies`, jeweils 390×844 und 1440×1000. Die lokalen Dateien behalten den Namen `interim-*`: Der Pass begann vor Roots endgültigem Browser-Go. Das Company-Paket wurde danach nicht geändert; die Daten wurden auf Vollständigkeit und Fehler geprüft. Kein View fehlt, der Lauf endete mit Exit 0. HMR-/Navigationsereignisse waren in diesem Pass nicht separat instrumentiert; ein absoluter Reload-Ausschluss wird daher nicht behauptet. Es gab keine Page-, Kontext- oder DOM-Ausführungsfehler.

| Initiale mobile Ansicht | Wörter vorher | Wörter nachher | Änderung | Höhe vorher → nachher |
|---|---:|---:|---:|---:|
| DE 390 | 783 | 555 | −228 / −29,1 % | 9.826 → 8.695 px |
| EN 390 | 801 | 621 | −180 / −22,5 % | 8.366 → 7.847 px |

Wortzählung: über CSS und DOM-Rechtecke sichtbare Texte, einschließlich aller Wischkarten; geschlossene Details und ausgeblendete Varianten ausgeschlossen. Identische Methode vorher/nachher. Die Wortzahl ist ein Beleg dieser Änderung, kein pauschales Ziel für andere Seiten.

Je Sprache acht aggregierte Funktionschecks: vier Reihen mit echten CDP-Touchgesten vorwärts/rückwärts und anschließender Punktnavigation zum letzten/ersten Element; außerdem Öffnen/Schließen der bestehenden Lösungen-, Wirtschaftlichkeits-, Quellen- und Mitarbeiter-Aufklapper. **16/16 bestanden.** Keine Formulare, Buchungen, Kontakte oder externen Antragslinks ausgelöst. Mutation-Requests waren gesperrt; keine aufgetreten.

Zusätzliche begrenzte Reality-Breitenmessungen bei 360, 430, 767 und 768 Pixeln sind im Rohbeleg enthalten. Beide 390-Ansichten und beide Desktopansichten ohne Body-Überbreite, doppelte IDs oder JavaScriptfehler. Alle neun sichtbaren DOM-Bilder behalten Quelle, Originalmaße, Darstellungsmaße und Object-Fit exakt bei.

Beide Desktopansichten behalten sämtliche sichtbaren Texte, Überschriften, Links, Abschnitts-/Bildgeometrien, Wischraster und Seitenhöhen exakt zur öffentlichen Baseline: DE 9.231 px, EN 7.854 px. Screenshotvergleich: maximale Kanalabweichung 1; kein Pixel über Schwelle 12. Deshalb geometrisch unverändert, keine Behauptung absoluter Pixelidentität.

Nach Partner-Freeze und Roots ausdrücklichem Browser-Go wurde **genau eine neue enge Ansicht `/unternehmen` bei 390 Pixeln** bestätigt, ohne zusätzliche Screenshots oder Copy-/Bildrunde. Track 390/1015 Pixel, Gridchild 358 Pixel, Body 390 Pixel. Echter Touch vorwärts **0 → 332**, rückwärts **332 → 0**; letzter Punkt **→ 625**, erster Punkt **→ 0**. Beide Punkte melden korrekt `aria-current=true`. Browser regulär geschlossen.

Der neue Pass zeigte keine Page-/Kontextfehler, keine Mutation und keine HMR-Update-/Reloadmeldung; nur ein initiales Vite-Verbindungspaar. Der automatische Endguard endete jedoch mit Exit 1: Er verlangte genau ein `framenavigated`-Ereignis, erfasst wurden zwei mit identischer URL. Dieser Listener trennt Dokumentnavigation und History-/Same-document-Ereignisse nicht. Die eigentliche Funktionsprüfung ist vollständig `passed=true`; der Navigationszähler wird als Harnessdiagnostik geführt, nicht als Produktfehler. Rohbefund unverändert aufbewahrt. Keine Wiederholung und keine Produktänderung daraus.

[Genau dieser neue Touchbeleg](unternehmen-qa/touch-confirmation.json), [begrenzte Auswertung mit Guard-Abgrenzung](unternehmen-qa/touch-confirmation-evaluation.json).

## Quellprüfungen und Belege

`test:company`, `test:bav-calculator`, gezieltes ESLint für die sieben JSX-Dateien und `git diff --check` bestanden. Impeccable-Detector: keine Befunde. Kein neuer Test, der nur die Umsetzung abbildet.

Rohdaten: [Integritätsprüfung](unternehmen-qa/integrity-review.json), [Baseline](unternehmen-qa/baseline-metrics.json), [vollständiger gespeicherter Pass](unternehmen-qa/interim-metrics.json), [Browserharness](unternehmen-qa/browser-unternehmen.mjs).

Aufnahmen: [DE Hero 390](unternehmen-qa/interim-de-390-hero.png), [DE Versorgungscheck 390](unternehmen-qa/interim-de-390-reality.png), [EN Hero 390](unternehmen-qa/interim-en-390-hero.png), [EN Versorgungscheck 390](unternehmen-qa/interim-en-390-reality.png). Desktopbelege im selben Ordner.

Prüfharnessdiagnostik: Zwei anfängliche Baseline-Abbrüche wurden vor gültigen Messungen behoben (Warten auf nicht geladene Bilder in geschlossenen Details; nicht übergebene Viewportvariable). Sie sind keine Produktbefunde.
