# Healio Hero: Zwei 3D-Konzepte zur Auswahl

Stand: 17. Juli 2026  
Status: Zwei getrennte Beispiele von Frank angefordert; schriftliche Spezifikation zur Abnahme

## 1. Ziel

Die bestehende 3D-Hero-Szene wirkt zu flach, typografisch unsauber und besitzt keinen überzeugenden visuellen Mittelpunkt. Sie wird nicht nur überarbeitet. Für die lokale Preview entstehen zwei eigenständige, hochwertige 3D-Beispiele, die Frank direkt miteinander vergleichen kann.

Beide Beispiele müssen mindestens einen starken 8/10-Wow-Effekt anstreben, dürfen aber nicht wie Gaming, Krypto oder eine beliebige Technologie-Demo wirken. Inhaltlich zeigen beide dieselbe Aussage: Healio verbindet ambulanten, Zahn- und stationären Zusatzschutz in einem digitalen Schutzsystem.

## 2. Vergleich in der lokalen Preview

Die beiden Konzepte werden ausschließlich in der lokalen Vorschau über einen kleinen Konzeptschalter umgeschaltet:

- `A · Glass Shield`
- `B · Protection Core`

Der Schalter verändert nur das visuelle Hero-Objekt. Überschrift, Beschreibung und CTAs bleiben identisch, damit Frank ausschließlich die 3D-Wirkung vergleichen kann.

Die Auswahl wird über den URL-Parameter `hero=glass` beziehungsweise `hero=core` abgebildet. Der lokale Schalter setzt diesen Parameter. Es erfolgt kein Deployment. Nach der Auswahl wird die verworfene Variante wieder entfernt und der Konzeptschalter gehört nicht zur späteren Live-Seite.

## 3. Beispiel A: Premium Glass Shield

### Bildidee

Ein großer, vertikaler Schutzschild ist das einzige dominante Objekt. Er besteht aus drei leicht versetzten Ebenen:

1. dunkle, präzise gefräste Rückenschicht
2. transluzente Glasschicht mit klaren Lichtkanten
3. ruhiger mintfarbener Healio-Kern

Der Kern ist kein beschrifteter Kreis. Er erscheint als leuchtendes, organisch gerundetes Schutzsymbol mit einer subtilen Healio-Kerbe. Material, Kantenlicht und Tiefe erzeugen den Wow-Effekt, nicht eine große Menge an Effekten.

### Schutzbereiche

Ambulant, Zahn und Stationär erscheinen als drei sauber gesetzte, scharfe HTML-Plaketten. Sie sind wie technische Produktkennzeichnungen am Schild befestigt und nicht frei im Raum verteilt. Eine feine Lichtkante verbindet jedes Modul mit einer eigenen Schildschicht.

### Bewegung

- Schildschichten fahren beim Laden präzise zusammen
- Mintlicht wandert einmal kontrolliert über die Kanten
- danach nur minimales Schweben und höchstens vier Grad Mausneigung
- keine Orbitrotation und kaum Partikel

### Wirkung

Premium, Vertrauen, Ruhe und technische Präzision. Dieses Beispiel soll wie ein hochwertiges digitales Versicherungsprodukt wirken.

## 4. Beispiel B: Protection Core

### Bildidee

Ein kompakter Glasschutzschild bleibt der zentrale Anker, wird aber von einem räumlichen Energiekern und einem klar definierten Schutzraum umgeben. Eine elliptische Lichtbahn durchschneidet mehrere Tiefenebenen. Wenige Partikel reagieren auf die Aktivierungsimpulse.

### Schutzbereiche

Ambulant, Zahn und Stationär erscheinen als scharfe HTML-Module auf drei unterschiedlichen Punkten der Energiebahn. Sie rasten nacheinander sichtbar ein. Lichtimpulse laufen vom Kern zu den Modulen und zeigen ihre Zusammengehörigkeit.

Farben:

- Ambulant: Healio Mint `#5EE0B1`
- Zahn: klares Eisblau `#8CCBFF`
- Stationär: ruhiges Lavendel `#B9A7FF`

### Bewegung

Die Startsequenz dauert ungefähr 2,5 Sekunden:

1. Kern und Schild setzen sich aus der Tiefe zusammen.
2. Die Energiebahn wird mit einem Mintimpuls gezeichnet.
3. Die drei Schutzmodule rasten nacheinander ein.
4. Ein abschließender Lichtimpuls aktiviert das gesamte System.
5. Danach läuft nur ein ruhiger Schwebezustand mit seltenen Energieimpulsen.

### Wirkung

Mehr Bewegung, Tiefe und ein stärkerer cineastischer Moment als in Beispiel A. Das Beispiel bleibt seriös, zeigt aber deutlicher den gewünschten Bam- und Wow-Effekt.

## 5. Gemeinsame Typografie und Ebenen

Canvas-Texturen werden nicht mehr für sichtbare Produktbezeichnungen verwendet. Alle Texte liegen als normales HTML über der Szene und bleiben gestochen scharf.

Beide Beispiele verwenden kontrollierte Tiefenebenen:

1. ruhiger Midnight-Hintergrund
2. Licht und gegebenenfalls wenige Partikel
3. Schild beziehungsweise Energiebahn
4. scharfe HTML-Schutzmodule im Vordergrund

Überschrift und CTAs stehen immer über der 3D-Szene. Kein Modul darf Text oder Buttons überlagern.

## 6. Responsive Verhalten

### Desktop

- 3D-Objekt rechts neben der Hero-Typografie
- genügend Abstand zur Überschrift
- Schutzmodule bleiben innerhalb der rechten Hero-Hälfte
- Mausbewegung beeinflusst nur das Objekt, nicht die Lesbarkeit

### Mobil

- Text und CTAs stehen vollständig vor der Szene
- Objekt erscheint kompakt und mittig darunter
- Module werden enger angeordnet und bleiben innerhalb der Viewportbreite
- reduzierte Geometrie, Partikelzahl und Renderauflösung
- keine Steuerung durch Gerätesensoren

### Reduzierte Bewegung und Fallback

Bei `prefers-reduced-motion`, fehlendem WebGL oder Initialisierungsfehlern erscheint für jedes Konzept eine hochwertige statische Schutzschild-Komposition. H1 und CTAs funktionieren immer unabhängig von WebGL.

## 7. Technische Architektur

Die zwei Beispiele werden voneinander getrennt umgesetzt:

- `HomeHero`: Hero-Layout, Konzeptauswahl und gemeinsame Texte
- `GlassShieldScene`: WebGL-Szene für Beispiel A
- `ProtectionCoreScene`: WebGL-Szene für Beispiel B
- `ProtectionLabels`: scharfe HTML-Module mit konzeptspezifischer Position
- `HomeProtectionFallback`: statische Fallback-Komposition

Three.js bleibt lazy geladen. Beide Szenen werden nicht gleichzeitig initialisiert. Es wird nur das ausgewählte Konzept gerendert.

Performance-Regeln:

- Pixelratio maximal `1.5`, auf kleinen Geräten maximal `1.25`
- keine hochauflösenden externen Texturen
- Animation pausiert außerhalb des sichtbaren Heroes und bei inaktivem Tab
- vollständige Freigabe von Frames, Observern, Geometrien und Materialien
- kein schweres Bloom-Postprocessing; Lichtwirkung über additive Glow-Geometrien

## 8. Abnahmekriterien

Die zwei Beispiele sind bereit zur Entscheidung, wenn:

- beide Varianten in der lokalen Preview eindeutig umschaltbar sind
- der bisherige Kreis mit `Dein Schutz` vollständig verschwunden ist
- beide Varianten einen klaren visuellen Mittelpunkt besitzen
- Ambulant, Zahn und Stationär scharf, korrekt formatiert und ohne Überlagerung erscheinen
- A sichtbar ruhiger und materialorientierter wirkt
- B sichtbar dynamischer und energiegeladener wirkt
- bei 1280 Pixel Desktopbreite und 390 Pixel Mobilbreite kein horizontaler Überlauf entsteht
- `prefers-reduced-motion` und WebGL-Fallback funktionieren
- keine neuen Browserfehler entstehen
- Homepage-Vertrag, Lint und Produktions-Build erfolgreich laufen

## 9. Nicht im Umfang

- Audioeffekte
- Scroll-gesteuerte Produktübergänge
- Gerätesensorsteuerung
- Änderungen an Produktseiten
- Deployment oder Veröffentlichung
