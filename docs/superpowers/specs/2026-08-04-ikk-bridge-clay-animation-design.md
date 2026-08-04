# IKK-Wechselbrücke im Healio-Clay-Stil

Stand: 2026-08-04

## Ziel

Der gemeinsame Abschnitt auf `/ambulant`, `/zahn` und `/stationaer` erklärt dieselbe wirtschaftliche Logik:

1. Eine Person wechselt innerhalb der gesetzlichen Krankenversicherung von ihrer bisherigen Kasse zur IKK classic.
2. Die gesetzliche Grundversorgung und der Versicherungsschutz bleiben bestehen.
3. Am Ziel erhält die Person den stärkeren IKK-Bonus.
4. Der Bonus kann die jeweils passende Zusatzversicherung ganz oder teilweise finanzieren.

Die visuelle Geschichte bleibt über alle Seiten gleich. Nur das versicherte Ziel und die dazugehörige Nutzenbotschaft unterscheiden sich.

## Visuelle Richtung

- Stil: hochwertiges, freundliches 3D-Clay-Rendering wie die bestehende Hängematten-Illustration.
- Signatur: eine Person überquert eine weiche, sichere Brücke aus abgerundeten Clay-Stufen; ein Schutzschild begleitet den Weg.
- Figur: professionell gerendertes Gesicht, erwachsene Proportionen, lavenderfarbener Blazer, cremefarbene Hose, klarer Vier-Phasen-Gangzyklus.
- Brücke: breiter, sicher begehbarer Bogen zwischen einer lavendelfarbenen Startplattform und einer warmen Zielplattform.
- Bewegung: ruhiger 10-Sekunden-Zyklus. Die Figur geht von links nach rechts, das Schild folgt, am Ziel erscheinen Bonus und Produktnutzen.
- Kein Konfetti. Der Erfolgsmoment entsteht durch weiches Licht, Bonusmünzen und die Aktivierung der Zielkarte.

## Gestaltungssystem

### Farben

- Healio Ink: `#211A3E`
- Lavender Clay: `#CFC2EC`
- Mint Clay: `#A9D7BD`
- Butter Clay: `#F4D98A`
- Warm Ivory: `#FFFCF5`
- Coral Detail: `#E9A589`

### Typografie

- Überschriften und starke Zahlen: vorhandene Healio-Display-Schrift.
- Erklärtexte: vorhandene Website-Body-Schrift.
- Texte werden nicht in Bilddateien eingebrannt, sondern bleiben als lokalisierbare HTML-Elemente erhalten.

## Varianten

### Ambulant

- Zielobjekt: Gesundheitsbudget-Karte mit Naturheilverfahren-Symbolik.
- Botschaft: „Bis zu 3.000 EUR Gesundheitsbudget in 2 Jahren“.
- Erklärung: Der IKK-Bonus kann den ambulanten Zusatzschutz ganz oder teilweise finanzieren.

### Zahn

- Zielobjekt: Zahn mit Schutzschild.
- Botschaft: „Bonus für deinen Zahnschutz“.
- Erklärung: Der Bonus kann die Zahnzusatzversicherung ganz oder teilweise finanzieren.
- Der restliche Abschnitt verweist auf die fachlich passenden Zahnwege, nicht auf den ambulanten SDK-Tarif.

### Stationär

- Zielobjekt: Klinikbett beziehungsweise Krankenhaus-Schutzsymbol.
- Botschaft: „Bonus für deinen Klinikschutz“.
- Erklärung: Der Bonus kann den stationären Zusatzschutz ganz oder teilweise finanzieren.
- Der restliche Abschnitt nennt die stationäre Wechsel- und Finanzierungslogik, nicht Heilpraktiker, Osteopathie oder Brille.

## Technische Architektur

- `AmbulantIKKWechsel` erhält die Prop `variant` mit `ambulant` als Standard.
- Die drei Seiten übergeben `ambulant`, `zahn` beziehungsweise `stationaer`.
- `IkkSwitch3DScene` wird zu einer leichten 2,5D-Komposition:
  - vorgerenderter Clay-Brückenhintergrund als WebP;
  - transparenter, vorgerenderter Vier-Phasen-Character-Sprite als WebP;
  - HTML/CSS für Schutzschild, Start-/Zielkarten, Bonus und lokalisierte Beschriftungen;
  - CSS-Keyframes für Weg, Gangzyklus, Schild und Zielaktivierung.
- Die bisherige prozedurale Three.js-Figur und die WebGL-Szene entfallen. Dadurch wird das Ergebnis visueller hochwertiger und zugleich leichter.
- Bei `prefers-reduced-motion` wird ein ruhiges Standbild mit der Figur am Ziel gezeigt.
- Alle Bilder werden mit festen Seitenverhältnissen, responsivem Zuschnitt und Lazy Loading eingebunden.

## Responsive Verhalten

- Desktop: komplette Brücke mit beiden Plattformen und allen drei Informationsebenen sichtbar.
- Mobil: gleicher horizontaler Weg innerhalb eines breiteren inneren Szenen-Canvas; die Kamera wird über `object-position` und skalierte Overlays so angepasst, dass Figur, Brückenmitte und Ziel lesbar bleiben.
- Zieltexte bleiben außerhalb kritischer Bildbereiche und umbrechen kontrolliert.

## Barrierefreiheit und SEO

- Die Animation ist dekorativ; die vollständige Aussage steht als sichtbarer HTML-Text und im Varianten-`aria-label`.
- Keine wichtige Information wird ausschließlich durch Bewegung vermittelt.
- Reduzierte Bewegung wird respektiert.
- Deutsche und englische Texte werden über i18next ausgeliefert.

## Prüfung

- Visuelle Abnahme auf `/ambulant`, `/zahn` und `/stationaer` in Desktop- und Mobilbreite.
- Prüfung auf korrektes variantspezifisches Ziel, keine ambulanten Aussagen auf Zahn/Stationär.
- Prüfung von `prefers-reduced-motion`.
- Lint, Produktionsbuild und Services-/SEO-Tests.

