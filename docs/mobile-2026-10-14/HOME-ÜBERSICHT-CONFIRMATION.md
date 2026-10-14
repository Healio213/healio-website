# Home und Übersicht: gezielte Bestätigung

Stand: 14.10.2026. Kandidat `http://127.0.0.1:4834`; Desktop-Referenz war die zu diesem Zeitpunkt live veröffentlichte Fassung `b3f42da` auf healio.de.

## Umfang

- Ein Confirmationpass: Home DE/EN bei 390 px, Home DE bei 360 und 767 px sowie Übersicht DE/EN bei 390 px.
- Desktop Home und Übersicht jeweils bei 1440 × 1000 px gegen die live veröffentlichte Referenz geprüft.
- Kein Formular abgesendet, keine Anträge oder externen Zielwege ausgelöst. Notwendiger Consent verwendet; reduzierte Bewegung aktiviert.

## Bestätigte Korrekturen

- Der zusätzliche mobile `budgetNote`-Absatz ist aus dem Hero entfernt. Große Hero-Bilddatei und bestehende Details bleiben erhalten.
- Die Appsektion zeigt den konkreten Nutzen-Titel und einen kurzen Satz, danach das große vollständige Smartphone-Bild und anschließend die FriendlyIcon-Wischkarten.
- Bestehende Bilder behalten ihre Größen und Proportionen. Keine defekten oder verzerrten Bilder, keine JavaScript-Ausnahmen in den sechs mobilen Ansichten.

Im ersten Pass trat ein konkreter Gridfehler in der neuen App-Reihenfolge auf: Das direkte Grid-Kind der Wischreihe hatte keine `min-w-0`-Begrenzung. Die Gridspalte wuchs auf rund 1.015 px; ein äußeres `overflow-hidden` verbarg den Seitenüberlauf und das Smartphone lag teilweise außerhalb des Bildschirms. Root ergänzte ausschließlich `min-w-0` an der Wischreihe. Danach wurde nur dieser betroffene Bereich in den vier angeforderten Home-Ansichten eng bestätigt.

| Ansicht | Gridbreite | Apppanel x/Breite | Smartphone x/Breite inklusive Rotation | Touch-Wischen |
|---|---:|---:|---:|---|
| /, 390 px | 390 px | 16 / 358 px | 82.59 / 224.82 px | Karte 2, bestanden |
| /, 360 px | 360 px | 16 / 328 px | 67.59 / 224.82 px | Karte 2, bestanden |
| /, 767 px | 767 px | 16 / 735 px | 252.27 / 262.45 px | Karte 2, bestanden |
| /en, 390 px | 390 px | 16 / 358 px | 82.59 / 224.82 px | Karte 2, bestanden |

Die CSS-Rahmenbreite des Telefons bleibt 210 px beziehungsweise 245 px ab `sm`; die Tabelle nennt die durch die ursprüngliche Rotation vergrößerte Bounding Box. Bildquelle bleibt 720 × 1565 px. Titel und Apppanel beginnen mobil bei x=16 px. Die Reihenfolge Titel → Bild → Wischreihe ist in allen vier Ansichten erfüllt.

Für die unveränderten Home-Reihen Hero/Ablauf/Produkte liegt weiterhin der frühere tatsächliche Live-Touch-Nachweis der Fassung `b3f42da` vor ([Live-Metriken](live-bilder-ambulant/metrics.json)); die aktuelle enge Nachprüfung misst die geänderte App-Wischreihe mit echten Touch-Ereignissen erneut. Die allgemeine Wischerfassung des anfänglichen Confirmation-Helfers lieferte keine Datensätze und wird nicht als frischer Wisch-Nachweis behauptet. Die neu auf vier Karten reduzierte Übersicht wurde deshalb in genau zwei zusätzlichen, ausdrücklich beauftragten Touch-Checks frisch geprüft (siehe unten).

## Frische Touch-Abnahme der Übersicht

Genau `/leistungen` und `/en/services` bei 390 × 844 px auf dem aktuellen Kandidaten4834 geprüft. Keine neue vollständige Browserrunde, keine zusätzlichen Screenshots, kein CTA-Klick und keine Navigation.

| Route | Tatsächliche Karten | Touch-Ergebnis | Tier-CTA |
|---|---|---|---|
| `/leistungen` | 4: Ambulant, Zahn, Klinik, Tier | 0 → 332 → 664 → 957 px, Karte 4 von 4 | `/tierkrankenversicherung`, sichtbar, fokussierbar, Pointer-Zentrum frei |
| `/en/services` | 4: Outpatient, Dental, Hospital, Pet | 0 → 332 → 664 → 957 px, Karte 4 von 4 | `/en/pet-insurance`, sichtbar, fokussierbar, Pointer-Zentrum frei |

Alle vier Karten sind tatsächlich im DOM und dargestellt. Drei reale Touch-Wischgesten erreichen jeweils die Tierkarte. Ihr Ziel-CTA liegt vollständig im mobilen Sichtbereich, ist 72 px hoch, erhält den Tastaturfokus und ist am Mittelpunkt nicht überdeckt. Beide URLs bleiben unverändert; kein horizontaler Bodyüberlauf. Beide Checks bestanden.

- [Messdaten und Touchfolge](home-übersicht-confirmation/services-touch-metrics.json)
- [Eng begrenzter reproduzierbarer Touch-Check](home-übersicht-confirmation/services-touch.mjs)

## Desktopvergleich

| Seite | Höhe Referenz/Kandidat | H1/CTA | Abschnitts-/Überschriftsgeometrie | Rastervergleich |
|---|---:|---|---|---|
| / | 5653 / 5653 px | identisch | 11 Einträge identisch | 0 Pixel über Differenzschwelle 12 |
| /leistungen | 8388 / 8388 px | identisch | 15 Einträge identisch | 14,64 % der Pixelmaske; Aufnahmeabweichung offen |

Home ist auch im Rastervergleich unverändert. Auf der Übersicht sind Höhe, Texte, H1, CTA und alle 15 unmittelbar vor der Aufnahme gemessenen Geometrieeinträge identisch. Die Vollseitenaufnahmen zeigen dennoch einen nachgelagerten Rasterversatz von ungefähr 20 bis 54 px; die Dokumentation erklärt diese Aufnahmeabweichung nicht als bestätigten Produktfehler. Eine pixelgleiche Desktop-Abnahme der Übersicht wird deshalb aus diesem Paar nicht behauptet. Es wurde keine weitere selbständige Gestaltungs- oder Galerierunde gestartet.

## Nachweise

- [Ursprünglicher Confirmationpass](home-übersicht-confirmation/metrics.json)
- [Gezielte App-Nachprüfung nach Gridfix](home-übersicht-confirmation/app-fixed-metrics.json)
- [Desktopvergleich](home-übersicht-confirmation/desktop-comparison.json)
- [App-Ausschnitt nach Gridfix](home-übersicht-confirmation/start-390-app-fixed.png)

Produktänderungen dieses Teilauftrags: `HomeHero.jsx`, `HomeTrust.jsx` und ausschließlich `mobile.trust.title`/`description` in DE/EN `home.json`. Gezieltes ESLint, Homepage-Vertrag und Diffprüfung bestanden; Root übernimmt gemeinsamen Build und Veröffentlichung.
