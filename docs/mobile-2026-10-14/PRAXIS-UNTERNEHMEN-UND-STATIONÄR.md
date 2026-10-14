# Mobile Folgekorrektur: Praxen, Unternehmen und Stationär

14.10.2026. Basis ist der veröffentlichte Website-Stand `9472626`. Franks Folgeauftrag: Praxis- und Unternehmensseite deutlich schlanker machen, die vier Stationär-Themen neu ordnen und den nicht wischbaren Versorgungscheck reparieren. Originalbilder bleiben groß; Desktop bleibt erhalten.

## Resultat

- **Praxen `/partner`:** Kurzer Patientennutzen im Hero, Video und Budgetbilder früh, klare Rollen und kurze Schritte. Wiederholte reine Textblöcke entfallen mobil. Ursprüngliche Bedingungen und Rolleninformationen bleiben vollständig aufklappbar. Alle fünf ursprünglichen Bildreihen lassen sich wischen; Englisch behält zusätzlich seinen bisherigen Video-Textfallback. Der Terminanker und die Buchungslogik sind unverändert.
- **Unternehmen `/unternehmen`:** Kürzere mobile Texte in Hero, Lösungen, Ablauf und Abschluss; wiederholte Einleitungen entfallen. Rund 29,1 % weniger initial sichtbare deutsche Wörter mit identischer Vorher-/Nachher-Messung. Modelle, Rechner, Quellen, steuerliche Einordnung und bestehende Details bleiben erhalten. Der Versorgungscheck war auf die intrinsische Kartenbreite gewachsen und besaß keinen inneren Scrollweg. Eine nur mobil begrenzte Gridspalte und `min-w-0` beheben dies: bei 390 px jetzt Track 390/1015 statt 1015/1015 px. Wischen vorwärts/rückwärts und Punktnavigation funktionieren.
- **Stationär `/stationaer`:** Wartezeit, Chefarzt, Beitrag und Schwangerschaft stehen mobil als vier ruhige Zeilen untereinander. Jeder Titel öffnet direkt den vollständigen Originaltext. Große Bilder, Preise, Links, CTA und Desktopabschnitt bleiben erhalten.

15 gezielte Quelldateien geändert. Die bisherigen DE-/EN-Übersetzungswerte bleiben unverändert; neue mobile Schlüssel ergänzen sie. Die einzige additive Shared-Änderung ist ein optionales String-Aria-Label für das Partner-Erklärvideo, dessen sichtbare Überschrift responsive React-Inhalte bekommt. Keine Änderung an Formularen, CRM, Booking, SEO, Tarifdaten oder Beitragsberechnung.

## Prüfung

- [Praxisprüfung](PRAXIS-PRÜFUNG.md): DE 360/390/767 und EN 390, fünf Bildreihen mit echten Touchgesten bis zur letzten Karte; Textdetails und Terminanker. Desktop DE/EN 1440 in Text und gemessener Geometrie unverändert.
- [Unternehmensprüfung](UNTERNEHMEN-MOBILE-PRÜFUNG.md): DE/EN 390 und 1440, 16/16 Funktionschecks; danach ein eng bestätigter deutscher Versorgungscheck mit Touch in beide Richtungen und Punkten. Bildmaße und Desktopgeometrie erhalten.
- [Stationärprüfung](STATIONÄR-FAKTEN-PRÜFUNG.md): DE 360/390/767, EN 390 und Desktopvergleich 1440; 20 Checks und Desktopvergleich bestanden.
- Homepage-, Partner-, Company-, Conversion-, FriendlyIcon- und bAV-Rechnerverträge sowie betroffener JSX-Lint und Diffprüfung bestanden. Unabhängige Quellprüfung ohne Befund.

Der erste Buildversuch in der Sandbox endete vor dem Prerendering, weil Chrome dort nicht starten konnte. Der freigegebene vollständige Build auf Basis `9472626` bestand mit 246 Prerenders, 0 Fehlern und 269 geprüften Routen. Vor dem Push wurden die inzwischen veröffentlichten fremden Blog-/SEO-Commits `cf76df2` und `4f6fa2e` konfliktfrei per Fast-forward übernommen. Alle 15 eigenen Quelldateien wurden danach bytegleich bestätigt; fremde Inhalte wurden nicht überschrieben. Homepage- und Blog-SEO-Verträge sowie Diffprüfung auf dem gemeinsamen Stand bestanden. Auch der vollständige Build dieses endgültigen gemeinsamen Stands endete erfolgreich: **246 Prerenders, 0 Fehler, 269 geprüfte Routen**, einschließlich 179 Ratgeberseiten, 23 Blogartikeln und 2 Bloghubs. Der anschließende frische Abruf von GitHub bestätigte die unveränderte Basis `4f6fa2e`.

Keine Produktänderung aufgrund der dokumentierten Browserharness-/Cache-Diagnosen. Rohbelege bleiben lokal, nur diese kurzen Berichte werden in Git aufgenommen. Die öffentliche Abschlussprüfung erfolgt erst nach bestätigtem Vercel-READY für den eigenen Release-SHA.

Keine echten Formulare, Kontakte, Buchungen oder Versicherungsanträge ausgelöst. Hauptcheckout und fremde Änderungen bleiben erhalten; keine Ordnersynchronisierung.
