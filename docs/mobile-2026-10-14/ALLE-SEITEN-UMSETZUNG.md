# Mobile Seitenprüfung und gemeinsame Siegelbänder

Stand: 14.10.2026, Folgekandidat zu `b3f42da`.

Franks Vorgabe bleibt: mobil kurze Orientierung und weniger Wiederholungen, vorhandene Bilder groß und wischbar, Desktop erhalten. Relevant ist ein gemeinsames Band je Produktseite; ein einzelnes Siegel steht still.

## Umsetzung

- Ambulant: SDK-Anbieterbewertung 2025 sowie beide aktuellen IKK-Kassenbewertungen 09/2026 in einem Band. Der neutrale Bonus-Themeneinstieg behält allein die statische SDK-Bewertung.
- Zahn: zwei vorhandene Tarifbewertungen und die beiden IKK-Kassenbewertungen in einem Band. Die kurze Zuordnung zu den tatsächlich bewerteten Tarifen bleibt sichtbar, ausführliche Erläuterungen im Aufklapper.
- Klinik: SDK-Anbieterbewertung sowie beide IKK-Kassenbewertungen in einem Band. Die unteren mobilen IKK-Siegel entfallen nur auf diesen drei Produktseiten; Desktop behält seine bisherigen getrennten Bereiche.
- Schwangerschaft: das bestehende gemeinsame Band erhält genügend dekorative Wiederholungen für den nahtlosen Lauf bis 767 px. Einzelbewertungen werden auch mit `forceScroll` nicht animiert. Reduzierte Bewegung zeigt jedes Original einmal in einer Wischreihe; Fokus, Hover und Berührung pausieren den Lauf.
- Startseite: zusätzlicher mobiler Budget-Hinweis aus dem Hero entfernt. Die Appsektion zeigt einen kurzen Nutzen-Einstieg, danach das große vollständige Smartphone-Motiv und die erhaltenen Wischkarten. Mobile Außenabstände korrigiert; Desktop und Originalbilder erhalten.
- Versicherungsübersicht: zwei kurze Einstiegssätze, genau vier wischbare Bereiche Ambulant, Zahn, Klinik und Tier. Die zusätzliche ZAHN-Sofort-Karte und die wiederholte Budgetsektion entfallen mobil; ursprüngliche Desktopinhalte erhalten. Kein Kassenbonus-Versprechen für Tier.
- Englischer Bloghub: bestehende `noindex, nofollow`-Vorgabe auch nach React-Hydration erhalten; vorher überschrieben durch den SEOHead-Standard. Deutsche Indexierung unverändert.
- Klinik-Bonusbrücke: ein kurzer Titel und ein Satz ersetzen mobil die wiederholte Prosa. Bonuskarte, Icon und CTA bleiben offen; die vollständige SPU-Modellrechnung mit Alters-/Beitrags-/Bonusbedingungen ist optional aufklappbar. Desktop bleibt vollständig.
- Hebammen: frühe Rollen-Karten mobil mit kurzen Titeln und vorhandenen Bildern; der ausführliche spätere Rollen-/Abrechnungsblock bleibt. Die zweite Budgetleiste erhält einen kurzen positiven Satz statt wiederholter Erklärungen; Budgetwert und Icon bleiben sichtbar, alle Neugeborenen- und Tarifbedingungen unverändert.

Keine neuen Siegel, Versicherungsdaten, Assets, Formulare oder Produktwege hinzugefügt. Die bisherige Ambulant-Straffung und alle parallelen SEO-Korrekturen bleiben enthalten.

## Vollständige Bestandsprüfung

Alle **269 kanonischen Routen** gelesen: **66 Haupt-/Aktionsseiten** sowie **203 Ratgeber-/Blogseiten einschließlich Hubs**. Zusätzlich 13 explizite Router-Aliase und die relevante Schwangerschaftsansicht bei 767 px. Keine Anträge, Kontolöschungen, Kontakte oder sonstige schreibende Aktionen ausgelöst.

Artikel und Rechtsinformationen bleiben ausführlich. Geprüft wurden Darstellung, Textgrenzen, Lesbarkeit, Bilder, Überschriften, IDs und Laufzeit; keine neue fachliche Bewertung medizinischer oder finanzieller Artikel. Kein Seitenüberlauf, keine defekten oder gestreckten Bilder und keine JavaScript-Laufzeitfehler im vollständigen Bestand. Konkrete Band- und Hydrationsbefunde wurden oben korrigiert; beabsichtigte Bildausschnitte und weitere Copyhinweise sind im Hauptseitenbericht getrennt dokumentiert.

Nachweise: [Hauptseiten](ALLE-SEITEN-HAUPTSEITEN.md), [Artikel A](ALLE-SEITEN-ARTIKEL-A.md), [Artikel B](alle-seiten-artikel-b/ALLE-SEITEN-ARTIKEL-B.md), [gemeinsame Bandprüfung](alleseiten-bestätigung/SIEGEL-ABSCHLUSSPRÜFUNG.md), [Home und Übersicht](HOME-ÜBERSICHT-CONFIRMATION.md). Neun finale Bandansichten ohne Produktbefund; inklusive Schwangerschaft767 und statischem Einzel-SDK. Home-Appgrid nach einem konkreten Sichtbarkeitsfix in vier schmalen Ansichten bestätigt. Echte Touch-Gesten bestätigen die App-Wischkarten und die neue vierteilige Versicherungsübersicht DE/EN bis zur Tierkarte. Home-Desktop lokal/live pixelgleich; Übersichtsdesktop mit vollständig gleichen gemessenen Texten, CTA-/H1-/Abschnittsmaßen und Seitenhöhe, die Vollseiten-Rasteraufnahme ist kein Pixelgleichheitsnachweis.

Finaler Build erfolgreich: **246 Prerenders, 0 Fehler, 269 geprüfte Routen**, darunter 179 Ratgeberseiten sowie 23 Blogartikel und 2 Hubs. Homepage-, Services-, Hebammen- und Conversion-Verträge sowie gezieltes JSX-Lint und Diffprüfung bestanden. 21 Quelldateien und acht kleine Berichte für den Commit ausgewählt; keine sensiblen Pfade oder Secret-Marker im gestagten Bestand. Die Rohdaten/Screenshots bleiben lokal und werden nicht vollständig in Git übernommen. Veröffentlichung und öffentliche Abschlussprüfung folgen.

Die zusätzlichen Textfixes wurden eng bestätigt: [Klinik DE/EN mobil und Desktop](alleseiten-bestätigung/STATIONÄR-TEXTBESTÄTIGUNG.md), 14 Checks und direkter Desktop-Abschnittsvergleich; [Hebammen DE/EN mobil](HEBAMMEN-KURZCOPY-PRÜFUNG.md), 12/12 Checks. Eine unabhängige Quellprüfung bestätigt erhaltene Bilder, CTA, Tarif-/Neugeborenenbedingungen und eindeutige IDs. Der als Quellhinweis zunächst aufgefallene Nita-Baustein ist derzeit deaktiviert und wurde nicht verändert oder aktiviert.

Gezieltes JSX-Lint sowie Homepage-, Services- und Conversion-Verträge bestanden. Fremder Hauptcheckout bleibt unverändert; keine Ordnersynchronisierung, kein lokaler CLI-Deploy.
