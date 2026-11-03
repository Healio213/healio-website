# Qualitäts-Check healio.de, November 2026

Stand: 3. November 2026. Geprüft wurde der Stand von `main` (Commit `843cac1`) auf dem Branch `claude/peaceful-brahmagupta-ijpttl`. Alle 274 Adressen der Website wurden einzeln geprüft: 71 Seiten, 187 Ratgeber-Artikel und 16 Blogartikel. Jede Adresse wurde in einem echten Browser (Chromium, ohne Bildschirm) zweimal vollständig von oben bis unten geladen: als Handy mit 390 px Breite und als Desktop mit 1.440 px Breite. Die Abhakliste mit jeder einzelnen Seite steht am Ende dieses Berichts.

## Die 5 wichtigsten Punkte

1. **Vertrauliche Angaben im öffentlichen GitHub-Repository (hoch, H1).** Das Repository `Healio213/healio-website` ist öffentlich. In `TECHNICAL_DOCUMENTATION.md` stehen unter anderem ein Auth-Code für den Domain-Transfer im Klartext, die Server-Adresse und eine private E-Mail-Adresse. Den Code bitte sofort beim Registrar ungültig machen bzw. neu anfordern und die Datei aus dem Repository nehmen. Ich habe die Datei bewusst nicht angefasst, weil ein Löschen den Wert im Änderungsprotokoll noch einmal sichtbar machen würde.
2. **Verbotene Aussagen auf der Website (hoch, H2 und H3).** Der Ratgeber „Krankenzusatzversicherung ohne Gesundheitsfragen 2026“ sagt in der H1, der ambulante Tarif nehme „ohne Gesundheitsprüfung trotzdem sicher“ an. Außerdem wird an mehreren Stellen der Kinderwunsch als Grund für einen Abschluss genutzt: im Ratgeber „Baby geplant?“, auf `/schwangerschaft` („Wir planen ein Baby“, dann „Schließe den Klinikschutz jetzt ab“) und auf `/stationaer` („Mit Vorlauf günstiger“).
3. **IKK-Werte nicht überall nach Vorgabe (hoch, H4, H5, M5, M9).** Vier Kassen-Ratgeber schreiben, die IKK zahle den Zuschuss „ohne Höchstbetrag“. `/kassenbonus` stellt „1.155 EUR, belegter Höchstwert 2026“ groß heraus, statt „700 EUR+“. Der Hinweis unter dem Kassenbonus-Video widerspricht dem Video. Zwei PDF-Downloads weichen ebenfalls ab. Die vollständige Liste aller IKK-Stellen für die Umstellung zum 01.01.2027 steht im eigenen Abschnitt.
4. **Widersprüchliche Leistungsaussagen bei Zahn und Schwangerschaft (hoch, H6 bis H8).** 16 Zahn-Ratgeber sagen „Liegt das länger als 2 Jahre zurück, ist sie wieder versichert“, die Seite `/zahn` sagt richtig „nicht automatisch versichert“. Zur Wartezeit der Bayerischen gibt es drei verschiedene Aussagen. Bei Schwangerschaft vermischen mehrere Texte die Regeln von SDK und Bayerischer.
5. **24 Altersvorsorge-Ratgeber enden ohne Weg zur Leistungsseite (mittel, M1).** Alle übrigen 163 Ratgeber und alle 16 Blogartikel führen zwischendurch und am Ende sichtbar zu einer passenden Leistungsseite. Bei den Altersvorsorge-Artikeln steht der letzte Hinweis auf `/altersvorsorgedepot` schon nach 30 bis 46 % des Textes, danach kommt nichts mehr.

## Gesamteindruck

- **Technik ist solide.** Der Build läuft grün durch (vor und nach meinen Korrekturen), Lint ist sauber. Von 51 Testskripten sind 47 grün, 4 rot (zwei inhaltlich, eines ist eine Entscheidungsfrage, eines läuft nur auf einem Mac; Details in M15 und N11).
- **Darstellung ist sauber.** Auf keiner der 274 Seiten scrollt das Handy seitlich, kein Bild lädt nicht, jede Seite hat genau eine sichtbare H1, jedes Bild hat einen Alt-Text, jedes sichtbare Formularfeld hat eine Beschriftung.
- **SEO-Grundgerüst ist vollständig.** Jede Seite hat genau einen Title, eine Meta-Description, ein Canonical und strukturierte Daten. `sitemap.xml` enthält genau die 250 indexierbaren Seiten, die 24 bewusst gesperrten Seiten fehlen dort korrekt. Alle 33 Weiterleitungen zeigen auf existierende Seiten. 17.097 interne Links mit 271 verschiedenen Zielen: kein toter Link.
- **Die Arbeit liegt im Inhalt.** Die meisten Befunde betreffen Widersprüche zwischen Artikeln und die Inhaltsregeln. Echte Umlaute sind überall korrekt, „Versorgungswerk“ kommt nirgends vor.

## Was ich direkt korrigiert habe

Nur kleine, sichere Korrekturen, keine Überschrift umformuliert, kein Layout geändert. Build, Lint und alle Vertragstests danach erneut geprüft.

| Nr. | Was | Dateien und Zeilen |
|---|---|---|
| B1 | Gedankenstriche aus sichtbaren deutschen Texten und Meta-Angaben entfernt (ersetzt durch Komma, Doppelpunkt, Punkt oder „bis“) | `index.html:15`, `:19`, `:28`; `scripts/seo-routes.mjs:120`, `:129`, `:232`, `:242`, `:309`, `:310`, `:323`, `:329`, `:404`, `:439`, `:678`; `src/pages/VeterinaryHomePage.jsx:23`; `src/pages/KontoLoeschenPage.jsx:27`; `src/pages/KontaktPage.jsx:105`; `src/pages/BlogPage.jsx:110`; `src/components/sections/shared/SalesAiAssist.jsx:11`, `:30`; `src/components/sections/stationaer/StationaerBayerischeAlternative.jsx:129`; `src/components/sections/altersvorsorge/AltersvorsorgeVormerkung.jsx:30`; `src/components/sections/dental/DentalZahnCheck.jsx:142`; `src/i18n/locales/de/partner.json:215`; `src/i18n/locales/de/unternehmen.json:458`; `src/content/altersvorsorgedepotContent.js:209`, `:210` |
| B2 | Doppelte, voneinander abweichende Meta-Angaben angeglichen: Impressum, AGB und Datenschutz zeigten nach dem Laden „Impressum - Healio“ usw., im ausgelieferten HTML aber andere Titel. Jetzt überall gleich. Ebenso die Titel von `/partner` und `/about`. | `src/i18n/locales/de/seo.json:51` bis `:64`; `src/pages/AgbPage.jsx:27`; `scripts/seo-routes.mjs:232`, `:309` |
| B3 | „3.000 Euro“ durch „3.000 EUR“ ersetzt | `public/llms.txt:3`; `public/mia-knowledge-base.txt:9`, `:40`, `:280`, `:303` |

## Alle Befunde

Schwere: **hoch** = sollte vor der nächsten Kampagne geklärt werden, **mittel** = zeitnah, **niedrig** = bei Gelegenheit. Zeilenangaben beziehen sich auf den geprüften Stand.

### Hoch

#### H1: Vertrauliche Angaben im öffentlichen Repository
- **Seite:** keine Seite der Website; das GitHub-Repository ist öffentlich einsehbar.
- **Fundstellen:** `TECHNICAL_DOCUMENTATION.md:349` (Auth-Code für den Domain-Transfer im Klartext); Server-Adresse, private Konto-E-Mail und Kennungen von Cloudflare und EmailJS in den Zeilen 20, 26, 34 bis 36, 53, 59, 245, 285 bis 287, 339 und 341. Auch `docs/` enthält interne Abläufe (Supabase-Tabellen, n8n-Einrichtung).
- **Vorschlag:** 1. Auth-Code beim Registrar ungültig machen oder neu anfordern, falls der Transfer noch läuft. 2. Datei aus dem Repository entfernen oder das Repository auf privat stellen. 3. Die Git-Historie bereinigen lassen, sonst bleibt der Code in alten Ständen lesbar. 4. Private E-Mail-Adresse und Server-Adresse aus der Doku nehmen. Die Datei wird zwar nicht mit ausgeliefert (`.vercelignore`), auf GitHub ist sie aber sichtbar.
- **Behoben:** nein. Ein Löschen im Commit zeigt den Wert im Änderungsvergleich noch einmal; Schlüsseltausch und Entscheidung liegen bei dir.

#### H2: „ohne Gesundheitsfragen“ beim ambulanten Tarif
- **Artikel:** `/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026`
- **Fundstellen:** `src/content/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026.js:58` (H1 „… ohne Gesundheitsprüfung trotzdem sicher angenommen“), `:50` (Description „Im ambulanten SDK-Tarif wirst du 2026 trotz Vorerkrankung sicher angenommen“), außerdem `:49`, `:56`, `:73`, `:77`, `:180`; `public/llms.txt:355`.
- **Problem:** H1 und Description lesen sich als Aussage, der ambulante SDK-Tarif habe keine Gesundheitsprüfung. `/ambulant` sagt richtig „Gesundheitsfragen ja, keine Ablehnung“ (`src/components/sections/ambulant/AmbulantAufEinenBlick.jsx:76`). Als Suchbegriff im Titel ist der Ausdruck vertretbar, als Zusage nicht.
- **Vorschlag:** H1 von dir neu fassen lassen, etwa „Krankenzusatzversicherung ohne Gesundheitsfragen 2026: Mit Vorerkrankung trotzdem angenommen“. Description: „Gesundheitsfragen ja, Ablehnung nein“.
- **Behoben:** nein (Überschrift).

#### H3: Kinderwunsch als Abschlussargument
- **Seiten und Artikel:** `/ratgeber/baby-geplant-zusatzversicherung`, `/schwangerschaft`, `/stationaer`, dazu Verweise in sechs weiteren Ratgebern.
- **Fundstellen:**
  - `src/content/ratgeber/baby-geplant-zusatzversicherung.js:83` (H1 „Baby geplant? Die Zusatzversicherung vor der Schwangerschaft abschließen“), `:97` („Wer ein Baby plant, regelt den Klinikschutz am besten heute“), `:101`, `:191`, `:257` („Wer weitere Kinder plant …“)
  - `src/components/PregnancyGuidance.jsx:81` (Auswahl „Wir planen ein Baby“) und `:110` („Schließe den Klinikschutz jetzt ab und wähle eine Kasse mit Bonus.“), `:34` („Bereit fürs nächste Kind“)
  - `src/i18n/locales/de/stationaer.json:469` bis `:470` („Mit Vorlauf günstiger. Planst du früh, zahlst du … deutlich weniger“)
  - Verweise mit „Baby geplant: Klinikschutz vor der Schwangerschaft abschließen“: `familienzimmer-krankenhaus.js:235` bis `:236` und `:420`, `hebamme-rufbereitschaft.js:252` bis `:253`, `zusatzversicherung-kinder.js:205` bis `:206`, `neugeborenes-versichern.js:222` bis `:223` und `:306`, `hebamme-kosten-krankenkasse.js:355` bis `:356` und `:407` (alle unter `src/content/ratgeber/`)
  - Grenzfälle („Bei einer späteren Geburt …“): `schwanger-zusatzversicherung.js:233`, `src/components/BenefitFunnelPage.jsx:99`
- **Problem:** Der Wunsch nach einem (weiteren) Kind wird als Grund genannt, jetzt einen Vertrag abzuschließen. Die Kommentare in den Dateien sperren nur das Wort „Kinderwunsch“, inhaltlich ist es dasselbe Argument.
- **Vorschlag:** Entscheiden, ob der Ratgeber „Baby geplant?“ bleibt. Wenn ja, rein als Information („Was gilt, wenn …“) ohne Abschlussaufforderung. Die Auswahl „Wir planen ein Baby“ und „Bereit fürs nächste Kind“ streichen oder neutral fassen, die Karte auf `/stationaer` neutral formulieren („Entbindung bei der Bayerischen erst nach 8 Monaten versichert“).
- **Behoben:** nein (Inhalt, teils Überschriften).

#### H4: IKK-Zuschuss „ohne Höchstbetrag“
- **Artikel:** `/ratgeber/mkk-bonusprogramm-2026`, `/ratgeber/aok-bonusprogramm-2026`, `/ratgeber/tk-bonusprogramm-2026`, `/ratgeber/barmer-bonusprogramm-2026`
- **Fundstellen:** `src/content/ratgeber/mkk-bonusprogramm-2026.js:301`, `aok-bonusprogramm-2026.js:616`, `tk-bonusprogramm-2026.js:368`, `barmer-bonusprogramm-2026.js:390`
- **Problem:** „… die ihren gesamten Bonus wahlweise in dreifacher Höhe und ohne Höchstbetrag als Zuschuss zahlt“. Das widerspricht der Vorgabe „laut Satzung bis 810 EUR“ und dem IKK-Ratgeber, aus dem genau diese Formulierung schon gestrichen wurde (Kommentar `ikk-classic-bonusprogramm-2026.js:40` bis `:43`).
- **Vorschlag:** „ohne Höchstbetrag“ ersetzen durch „laut Satzung bis 810 EUR, in der Regel 400 bis 700 EUR“.
- **Behoben:** nein (Leistungsaussage, Wortlaut sollte von dir freigegeben werden).

#### H5: `/kassenbonus` stellt 1.155 EUR heraus
- **Seite:** `/kassenbonus`
- **Fundstellen:** `src/i18n/locales/de/kassenbonus.json:51` bis `:52` („1.155 EUR“, „Belegter Höchstwert 2026“), `:55` („12 anerkannten Mutterschaftsvorsorgen“), `:43` („Die 810 EUR im Video sind kein allgemeiner Höchstbetrag“) gegenüber dem Video-Untertitel `public/videos/erklaerfilme/erklaervideo-kassenbonus-v1-de.vtt:72` („Laut Satzung sind so theoretisch bis zu 810 Euro im Jahr möglich“).
- **Problem:** Als Werbereferenz gilt „700 EUR+“, 1.155 EUR nur für Schwangere. Der IKK-Ratgeber nennt 1.155 EUR selbst „rechnerische Obergrenze, nicht belegt“ (`ikk-classic-bonusprogramm-2026.js:252`). Der Hinweis unter dem Video widerspricht dem Video. Die Zahl „12“ ist laut IKK-Ratgeber (`:267`) in keinem öffentlichen Dokument genannt.
- **Vorschlag:** Hervorgehobenen Betrag auf „700 EUR+“ setzen, 1.155 EUR als Schwangerschafts-Beispiel kennzeichnen, Video-Hinweis an die Vorgabe angleichen („laut Satzung bis 810 EUR, in der Regel 400 bis 700 EUR“).
- **Behoben:** nein.

#### H6: Zahn-Ratgeber versprechen „wieder versichert“
- **Artikel (16):** aok-zahnzusatzversicherung, bayerische-zahnzusatzversicherung, bonusheft-zahnarzt, dak-zahnreinigung, parodontitis-behandlung-kosten, professionelle-zahnreinigung-kosten, wurzelbehandlung-kosten, zahnbruecke-kosten, zahnersatz-haertefall, zahnersatz-kosten, zahnersatz-moeglichkeiten, zahnfuellung-kosten, zahnimplantat-kosten, zahnkrone-kosten, zahnprothese-kosten, zahnzusatzversicherung-ohne-wartezeit
- **Fundstellen:** zum Beispiel `src/content/ratgeber/aok-zahnzusatzversicherung.js:300`, `dak-zahnreinigung.js:228`, `zahnbruecke-kosten.js:257`, `zahnprothese-kosten.js:238`, `zahnfuellung-kosten.js:218`, `parodontitis-behandlung-kosten.js:214`, `zahnersatz-moeglichkeiten.js:202`, `zahnersatz-haertefall.js:241`, `zahnersatz-kosten.js:315` und `:811`, `professionelle-zahnreinigung-kosten.js:260`, `zahnimplantat-kosten.js:214`, `wurzelbehandlung-kosten.js:167`, `zahnkrone-kosten.js:243` und `:306`, `bonusheft-zahnarzt.js:221`; als Tabellenzeile „Die Behandlung ist wieder versichert“ in `bayerische-zahnzusatzversicherung.js:210` und `zahnzusatzversicherung-ohne-wartezeit.js:190`. Gegenstelle: `src/components/sections/dental/dentalContent.js:320` und `:324`.
- **Problem:** „Liegt das länger als 2 Jahre zurück, ist sie wieder versichert.“ ist eine pauschale Leistungszusage. `/zahn` sagt: „Eine ältere Empfehlung macht eine heute geplante Behandlung nicht automatisch versichert.“ Der Artikel „ohne Wartezeit“ widerspricht sich damit sogar selbst (`:145`, `:304`).
- **Vorschlag:** Den Satz überall durch die Formulierung von `/zahn` ersetzen: „… nicht automatisch versichert. Verbindlich prüft die UKV die Angaben im Antrag.“
- **Behoben:** nein.

#### H7: Drei verschiedene Aussagen zur Wartezeit der Bayerischen (Zahn)
- **Artikel:** zahnzusatzversicherung-sofort-2026, barmer-zahnzusatzversicherung, zahnzusatzversicherung-zahnreinigung-2026, zahnzusatzversicherung-fehlender-zahn, bayerische-zahnzusatzversicherung, zahnzusatzversicherung-ohne-wartezeit, wurzelbehandlung-kosten, zahnfuellung-kosten
- **Fundstellen:** „keine Wartezeiten“ für Smart, Komfort und Prestige: `zahnzusatzversicherung-sofort-2026.js:59`, `:76`, `:87`, `:181`, `:183`, `barmer-zahnzusatzversicherung.js:132`, `:145`, `zahnzusatzversicherung-zahnreinigung-2026.js:79`, `:83` bis `:85`, `:151`, `:154`. „Sechs Monate für Smart und Komfort, Prestige ohne“: `zahnzusatzversicherung-fehlender-zahn.js:220`. „Hängt vom Zahntarif ab“: `bayerische-zahnzusatzversicherung.js:186`, `:310`, `zahnzusatzversicherung-ohne-wartezeit.js:80`, `:289`, `wurzelbehandlung-kosten.js:190`, `zahnfuellung-kosten.js:246`.
- **Vorschlag:** Highlightblatt B 333551 und Annahmerichtlinien B 333546 der Bayerischen abgleichen und eine einzige Aussage überall verwenden.
- **Behoben:** nein.

#### H8: Schwangerschaft: Regeln von SDK und Bayerischer vermischt
- **Seiten und Artikel:** `/ambulant`, `/schwangerschaft`, vorsorgeuntersuchung-frauen, schwangerschaft-worauf-achten, babybonus-krankenkasse, hebamme-rufbereitschaft, baby-geplant-zusatzversicherung
- **Fundstellen:**
  - `src/i18n/locales/de/ambulant.json:997` („Für eine schon festgestellte Schwangerschaft ist der Vorsorge-Topf der SDK der richtige Weg.“) gegenüber `src/content/ratgeber/vorsorgeuntersuchung-frauen.js:174` (SDK schließt bereits eingetretene Versicherungsfälle aus, keine pauschale Zusage für spätere Termine derselben Schwangerschaft)
  - `src/content/ratgeber/schwangerschaft-worauf-achten.js:268` überträgt das SDK-Kriterium „ärztlich festgestellt“ auf die Bayerische; richtig ist dort „besteht oder bekannt“ (`baby-geplant-zusatzversicherung.js:162`); ebenso `babybonus-krankenkasse.js:331`, `hebamme-rufbereitschaft.js:197`
  - `src/components/PregnancyGuidance.jsx:6` und `:34` nennen 8 Monate Wartezeit für die Entbindung ohne Versicherer; die gilt nur bei der Bayerischen (`src/i18n/locales/de/stationaer.json:448`, `:595`)
- **Vorschlag:** Fachlich mit den Bedingungen klären und überall nach Versicherer trennen. Die Zeile auf `/ambulant` vorsichtiger fassen, etwa „vor Abschluss klären, was der Vorsorge-Topf der SDK noch erstattet“.
- **Behoben:** nein.

### Mittel

#### M1: Altersvorsorge-Ratgeber ohne Hinweis am Ende
- **Artikel (24):** alle `/ratgeber/altersvorsorgedepot-…` und `/ratgeber/riester-…` (Liste in der Abhakliste, Befund M1)
- **Fundstellen:** `src/components/ratgeber/RatgeberArticleLayout.jsx:508` blendet den Schlussknopf bei Thema Altersvorsorge aus; der Leistungsweg dieser Artikel endet laut `src/content/leistungsweg.js` mit „eigen“ ohne Abschlussblock.
- **Problem:** Der Zuschuss-Check (Weg zu `/altersvorsorgedepot`) steht bei 30 bis 46 % der Artikellänge. Danach folgen FAQ, Weiterlesen und Quellen ohne weiteren Weg zur Leistungsseite. Die Vorgabe verlangt „zwischendurch UND am Ende“.
- **Vorschlag:** Am Ende dieselbe Abschluss-Karte wie bei allen anderen Ratgebern mit Ziel `/altersvorsorgedepot` zeigen.
- **Behoben:** nein (neuer Abschnitt).

#### M2: Doppelte Textblöcke in 43 Ratgebern
- **Fundstellen:** Der Kasten „Das Wichtigste in Kürze“ wiederholt den Vorspann wörtlich, Beispiel `src/content/ratgeber/aok-osteopathie.js:39` und `:46` (angezeigt über `src/components/ratgeber/RatgeberBausteine.jsx:122` bis `:123` und `src/components/ratgeber/RatgeberArticleLayout.jsx:439`). In einigen Zahn-Ratgebern steht derselbe Quellenhinweis zweimal, Beispiel `zahnkrone-rausgefallen.js:123` und `:153`. Betroffene Artikel: siehe Abhakliste, Befund M2.
- **Vorschlag:** Den Text im Kasten weglassen, wenn er dem Vorspann gleicht (eine Bedingung an einer Stelle), doppelte Quellenhinweise in den Artikeldateien streichen.
- **Behoben:** nein.

#### M3: Sehr lange oder überladene Seiten am Handy
- **Fundstellen:** 24 Ratgeber sind am Handy länger als 25 Bildschirmhöhen, an der Spitze `osteopathie-krankenkasse` (61), `aok-bonusprogramm-2026` (42), `heilpraktiker-zusatzversicherung` und `heilpraktiker-kosten` (je 36). `/hebammen` ist mit rund 12.000 px Inhalt sehr textlastig: „bis zu 3.000 EUR“ steht zweimal groß hintereinander, der Hinweis auf acht Monate Wartezeit kommt zweimal (`src/pages/HebammenPage.jsx`).
- **Vorschlag:** Wie bei `/stationaer` eine kürzere Handy-Fassung; lange Tabellen in den Ratgebern einklappbar machen.
- **Behoben:** nein.

#### M4: Titel und Beschreibung an zwei Stellen gepflegt
- **Fundstellen:** Das ausgelieferte HTML nimmt Titel und Beschreibung aus `scripts/seo-routes.mjs`, nach dem Laden setzt jede Seite eigene Werte (Seitenkomponenten und `src/i18n/locales/*/seo.json`). Bei den in der Abhakliste mit M4 markierten Seiten unterscheiden sie sich, zum Beispiel `/hebammen` („Für Hebammen: Gesundheitsbudget für Familien“ gegen „Für Hebammen | Healio Partnernetzwerk“), `/tierkrankenversicherung` („Hund & Katze“ gegen „Hund, Katze & Pferd“), `/potenzialanalyse` (nach dem Laden in Sie-Form), `/en`.
- **Vorschlag:** Eine Quelle festlegen, am einfachsten liest `SEOHead` die Werte aus `scripts/seo-routes.mjs`.
- **Behoben:** teilweise (B2).

#### M5: Blogartikel: Regeln und Fakten
- **Artikel:** alle 16 Blogartikel; Quelle ist das Content-System auf `app.healio.de`, im Repository als Kopie `public/data/blog-articles-cache.json` (Zeilenangaben unten beziehen sich auf diese Datei).
- **Befunde:**
  - „3.000 Euro“ statt „3.000 EUR“ in den vier „Healio-Konzept“-Artikeln (Zeilen 377 bis 379, 390, 454, 455, 474, 530, 531, 606, 607, 626) und dadurch auch in den Anrisstexten auf `/blog` und `/ratgeber`.
  - IKK-Werte ohne „in der Regel 400 bis 700 EUR“ (Zeilen 54, 108, 216, 270, 378, 454, 530, 606, 682, 758, 849).
  - „rund 550 EUR und liegt damit mitten in dieser Spanne“, die Spanne steht nicht mehr im Text (270).
  - „Der ambulante Zusatztarif deckt Vorsorgeuntersuchungen auch bei einer bereits bestehenden Schwangerschaft“ (216, 270) widerspricht Zeile 8 und 958.
  - 1.000-EUR-Topf einmal „Arznei-, Heil- und Verbandmittel“, einmal „Hilfsmittel“ (758 gegen 849); richtig ist „Hilfsmittel und gesetzliche Zuzahlungen“.
  - Krankenhaus-Zuzahlung „10 EUR pro Tag“ ohne Hinweis auf 15 EUR ab 2027 (682).
  - „angenommene 80 % Restkostenerstattung“, diese SDK-Stufe gibt es nicht (1042).
  - „Drei Wege sind möglich“ für den IKK-Zuschuss, der IKK-Ratgeber nennt acht (216, 54).
- **Vorschlag:** Im Content-System korrigieren und danach `npm run sync:blog-cache` ausführen.
- **Behoben:** nein (Inhalte kommen aus dem Content-System; eine Änderung nur an der Kopie würde beim nächsten Abgleich überschrieben).

#### M6: Faktenwidersprüche Ambulant, Heilpraktiker, Brille
- **Fundstellen (alle unter `src/content/ratgeber/`):**
  - `heilpraktiker-zusatzversicherung-vergleich-2026.js:257` und `:372`: „80 bis 100 %“ Erstattung, im selben Artikel (`:87`) und auf `/ambulant` „50 bis 100 %“.
  - Derselbe Artikel führt „UKV NaturPRIVAT“ als Vergleichstarif (`:215` bis `:235`, `:308` bis `:310`, `:375` bis `:376`, außerdem `public/llms.txt:356`). Laut Vorgabe in `src/components/sections/ambulant/AmbulantVorsorgeBaustein.jsx:16` bis `:17` wird kein zweiter ambulanter UKV-Tarif genannt; deshalb ist auch `test:ukv-vorsorge` rot.
  - Homöopathie ab 2027: `tk-heilpraktiker.js:71`, `:75`, `:291` und `heilpraktiker-zusatzversicherung.js:143` nennen den TK-Zuschuss für homöopathische Mittel ohne Befristung, `homoeopathie-krankenkasse-2027.js:19`, `:57`, `:260` sagen, dass das ab 01.01.2027 entfällt.
  - Barmer und Osteopathie: `osteopathie-krankenkasse.js:162` „kein Zuschuss“, dagegen `heilpraktiker-kosten.js:188` und `barmer-osteopathie.js:115` (Bonuszuschuss bis 200 EUR).
  - Brille verloren oder kaputt: `brille-verloren-versicherung.js:192`, `:311`, `brillenversicherung-kinder.js:204`, `kontaktlinsen-krankenkasse.js:213` gegen `brillenversicherung.js:171`, `:242` und `fielmann-brillenversicherung-kuendigen-2026.js:122`, `:130`.
  - Name des vierten Topfs uneinheitlich: `physiotherapie-kosten.js:83`, `naturheilkunde.js:175`, `fielmann-brillenversicherung-kuendigen-2026.js:122`, `heilpraktiker-zusatzversicherung.js:168` gegen „Hilfsmittel & Zuzahlungen“ auf `/ambulant`.
  - `homoeopathie-krankenkasse-2027.js:84` bis `:87` „Stufe 50 (SDK AP5)“ statt „Ambulant 50 (AP5)“, `:93` „Gesundheitsbudget von 3.000 EUR“ ohne „bis zu“.
  - `gebuehrenordnung-heilpraktiker.js:112` sagt, der Ratgeber drucke keine GebüH-Beträge, `heilpraktiker-kosten.js:129` bis `:139` tut es.
- **Behoben:** nein.

#### M7: Faktenwidersprüche Zahn
- **Fundstellen:**
  - „ZahnPRIVAT 75 erstattet 75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung“ (`ukv-zahnzusatzversicherung.js:115` und zehn weitere Zahn-Ratgeber, `src/lib/zahnkostenRechner.js:171`, `src/components/sections/dental/DentalHighlightCards.jsx:58`) liest sich anders, als gerechnet wird; klar formuliert ist `dentalContent.js:208`.
  - „danach gelten allein die Erstattungssätze“ (`dentalContent.js:196`, `:212` und 16 Artikel) gegen fortbestehende KFO-Grenzen (`zahnzusatzversicherung-kinder.js:203`, `zahnzusatzversicherung-kieferorthopaedie.js:105`, `zahnzusatzversicherung-familie.js:175`).
  - `/zahn`: „ab rund 10 € im Monat“ (`src/pages/ZahnPage.jsx:363` bis `:364`, `src/i18n/locales/de/zahn.json:516`) gegen die eigene FAQ „kein pauschaler Lockpreis“ (`dentalContent.js:336`) und 11,70 EUR in `barmer-zahnzusatzversicherung.js:186`.
  - Bonusheft ab 6 oder ab 12 Jahren: `bonusheft-zahnarzt.js:99`, `:248` gegen `zahnzusatzversicherung-familie.js:390`.
  - Rolle der Bayerischen (nur ZAHN Sofort oder allgemeiner Zahntarif): `zahnzusatzversicherung-zahnreinigung-2026.js:51`, `zahnzusatzversicherung-sofort-2026.js:104` bis `:112` gegen `bayerische-zahnzusatzversicherung.js:86`, `:90`.
  - Zahnreinigung ohne Jahresgrenze nur in Stufe 100 oder auch 90: `ukv-zahnzusatzversicherung.js:117` gegen `dentalContent.js:183`.
  - Fehlende Zähne bei der Bayerischen: `zahnzusatzversicherung-fehlender-zahn.js:155` gegen `:75`, `:247` und `dentalContent.js:268`.
  - Kleinere Abweichungen bei AOK-Zuschüssen und PZR-Beispielrechnungen (`aok-zahnreinigung.js:81`, `:111`, `zahnzusatzversicherung-zahnreinigung-2026.js:65` gegen `zahnreinigung-wie-oft.js:134`).
- **Behoben:** nein.

#### M8: Faktenwidersprüche Kassen, Klinik, Familie, Altersvorsorge
- **Kassen:** „keine pauschale 810-EUR-Grenze“ (`bonusprogramm-krankenkasse.js:154`, `bkk-firmus-bonusprogramm-2026.js:311`) relativiert die Vorgabe; „In der breiten Masse kommen 400 bis 700 Euro zusammen“ ohne Kennzeichnung als Einschätzung (`krankenkassen-bonus-zusatzversicherung.js:92`); „93 gesetzliche Krankenkassen“ ohne Quelle (`:124`); BKK-firmus-Gebiet unterschiedlich (`guenstigste-krankenkasse.js:109` bis `:113` gegen `bkk-firmus-bonusprogramm-2026.js:61`); Zusatzbeiträge mit „Stand 05.10.2026“ ohne Quelle (`mkk-bonusprogramm-2026.js:305` und drei weitere).
- **Klinik und Familie:** SDK-Kinderbeiträge auf `/schwangerschaft` genannt (`src/components/BenefitFunnelPage.jsx:388`), in den Ratgebern „nicht genannt“ (`zusatzversicherung-kinder.js:164`); AOK-Rufbereitschaft „nicht genannt“ gegen „bis 250 EUR“ (`schwangerschaft-was-steht-mir-zu.js:395` gegen `babybonus-krankenkasse.js:129`); Krankenhaus-Zuzahlung 10 EUR je Tag ohne Hinweis auf 15 EUR ab 2027 (`src/i18n/locales/de/stationaer.json:406`, `stationaere-zusatzversicherung.js:125`, `einzelzimmer-krankenhaus-kosten.js:190`); Hebammenleistungen der Bayerischen stärker dargestellt als auf `/stationaer` (`BenefitFunnelPage.jsx:175`, `schwanger-zusatzversicherung.js:364` gegen `stationaer.json:517` bis `:518`); Begleitperson unter 9 Jahren „ohne Bescheinigung“ (`zusatzversicherung-kinder.js:77`) gegen `begleitperson-krankenhaus.js:81`; Bayerische-Beiträge „Stand 08.2025“ (`krankenhauszusatzversicherung-senioren.js:152`) gegen „09/2026“ (`stationaer.json:472`).
- **Altersvorsorge:** Ratgeber verweisen auf ein Webinar, für das es keinen Termin gibt (`altersvorsorgedepot-etf-sparplan.js:63`, `-garantie.js:60`, `-auszahlung.js:61`, `-passt-das-zu-mir.js:54` gegen `src/content/altersvorsorgedepotContent.js:24`); „bis zum 85. Lebensjahr“ gegen „bis zum 85. Geburtstag“ (`altersvorsorgedepot-was-ist-das.js:47`); „Startbonus“ und „Berufseinsteigerbonus“ für dieselben 200 EUR; „mindestens 10 EUR im Monat“ (`altersvorsorgedepotContent.js:201`) gegen 120 EUR im Jahr; Kreis der berechtigten Selbstständigen zu weit (`altersvorsorgedepotContent.js:51`); Kinderzulage an Kindergeld statt an Zuordnung geknüpft (`altersvorsorgedepotContent.js:275`).
- **Behoben:** nein.

#### M9: PDF-Downloads mit abweichenden IKK-Werten
- **Fundstellen:** `public/downloads/healio-leitfaden-therapieabbruch-stopper-2026.pdf` (Abschnitt „Baustein eins“: „Bei der IKK classic sind laut Satzung bis zu 1.155 EUR im Jahr erreichbar“, ohne Hinweis auf Schwangerschaft); `public/downloads/kassenbonus-leitfaden-2026-10-08.pdf` („Ein fester allgemeiner Höchstbetrag wie 810 EUR steht nicht in den Teilnahmebedingungen.“). `public/downloads/healio-zuschuss-fahrplan-2027.pdf` ist ein reines Bild-PDF, sein Text ließ sich nicht maschinell prüfen. `public/downloads/praxis-checkliste-zahnaerzte-2026-08.pdf` enthält Gedankenstriche.
- **Vorschlag:** PDFs neu erzeugen, spätestens mit den Werten ab 2027.
- **Behoben:** nein.

#### M10: KI-Hinweise
- **Fundstellen:** `/partner` zeigt direkt unter dem Video „Hinweis: Die digitale Sprecherin Nita und ihre Stimme wurden mit KI erstellt.“ (`src/i18n/locales/de/partner.json:45`, angezeigt in `src/components/sections/B2BExplainerVideo.jsx:184`). Laut Code-Kommentar steht er dort bewusst wegen Art. 50 der KI-Verordnung. Umgekehrt enthalten Fußzeile und Impressum keinen KI-Hinweis, obwohl die Website KI-erzeugtes Bildmaterial nutzt (z. B. das Video `public/videos/ikk-bridge-walk.webm` auf `/ambulant`, laut Dateinamen mit Dreamina erzeugt; vermutlich auch die Illustrationen auf der Startseite). Auf Fotos selbst steht kein KI-Hinweis.
- **Vorschlag:** Rechtlich entscheiden, ob der Hinweis am Video bleiben muss. Einen kurzen Satz zu KI-Bildern im Impressum oder in der Fußzeile ergänzen.
- **Behoben:** nein.

#### M11: Kontraste zu schwach
- **Fundstellen:**
  - Fußzeilen-Hinweis „Die Healio GmbH ist als Versicherungsmakler …“ am Desktop 4,2 : 1 auf Dunkelblau (`src/components/sections/Footer.jsx:261`, `md:text-slate-500`), auf 240 Seiten. Mindestens 4,5 : 1 nötig.
  - Kopfzeile „Ratgeber von Healio“ und Kasten-Überschriften hellgrau auf Weiß 2,6 : 1 (`src/components/ratgeber/RatgeberArticleLayout.jsx:398`, `src/components/ratgeber/RatgeberBausteine.jsx:509`), auf 187 Seiten.
  - Tabellen-Hinweise 4,4 : 1 (`RatgeberBausteine.jsx:245`), auf 58 Seiten.
  - Markengrün #25c990 als Schrift auf Weiß 2,1 : 1: Links in Blogartikeln, Link „Healio“ auf `/impressum`, `/presse`, `/datenschutz`, Kennzeichnungen auf `/ambulant` und `/stationaer`; weiße Schrift auf Markengrün beim Umschalter auf `/altersvorsorgedepot`.
  - `/heilberufe-vorsorge`: weiße Schrift auf hellem Grün 1,7 bis 1,9 : 1, kaum lesbar (`src/pages/HeilberufeVorsorgePage.jsx:499` und umliegende Karten).
  - `/konto-loeschen`: Link im Fließtext kaum vom Text zu unterscheiden (1,5 : 1).
- **Vorschlag:** Für Schrift das dunkle Grün #087654 verwenden, Grautöne eine Stufe dunkler (Fußzeile `md:text-slate-400`).
- **Behoben:** nein (Gestaltung).

#### M12: Formulare über EmailJS ohne Missbrauchsschutz
- **Fundstellen:** Mehrere Formulare (u. a. Kontakt, Zahn, Klinik, Tier, Leistungen) senden direkt aus dem Browser über EmailJS (`src/services/emailjsService.js:57`, `src/services/emailService.js:61` und `:103`). Im Code gibt es dort kein verstecktes Bot-Feld und keine Begrenzung je Absender, und die Empfängeradresse wird vom Browser mitgeschickt. Die eigenen Server-Endpunkte unter `api/` sind dagegen gut geschützt (Bot-Feld, Begrenzung, Herkunftsprüfung, Cron nur mit Geheimnis).
- **Risiko:** Wenn die EmailJS-Vorlage den Empfänger aus diesem Feld übernimmt, kann jeder über das Healio-Konto Mails an beliebige Adressen schicken. Ohne Begrenzung ist auch Spam an info@healio.de leicht.
- **Vorschlag:** In EmailJS prüfen: Empfänger fest in der Vorlage, nur Domain healio.de erlauben, Captcha und Limit aktivieren. Mittelfristig auf eigene Endpunkte umstellen wie bei Kurzcheck und Partner.
- **Behoben:** nein.

#### M13: Sicherheitsregel für Skripte nur im Beobachtungsmodus
- **Fundstelle:** `vercel.json:31` (`Content-Security-Policy-Report-Only`). Alle anderen Sicherheits-Header sind vorhanden (Schutz gegen Einbetten, MIME-Schutz, HSTS, Referrer-Policy, Permissions-Policy).
- **Vorschlag:** Nach Durchsicht der Browser-Meldungen scharf schalten, wie in `docs/META-FUNNEL-TRACKING.md` Schritt 6 vorgesehen.
- **Behoben:** nein.

#### M14: Ladezeit und Auslieferungsgröße
- **Fundstellen:** Das Haupt-Skript ist 597 kB groß (192 kB komprimiert) und lädt auf jeder Seite, inklusive EmailJS, DOMPurify und Framer Motion. Am Handy laden `/ambulant` 2,8 MB, `/zahn` 2,3 MB, `/stationaer` 2,1 MB und die Startseite 2,0 MB. In `public/` liegen rund 172 MB Videos und Bilder, auf die keine Seite verweist, die aber mit ausgeliefert werden, zum Beispiel `public/erklaervideo-ambulant.mp4`, `public/erklaervideo-zahn.mp4`, `public/hero-b2b-original.png`, `public/videos/unternehmen/bav-zahlenbeispiel-b-v1.mp4` und `-v3.mp4`.
- **Positiv:** Bilder unterhalb des sichtbaren Bereichs laden verzögert, Videos erst auf Klick (`preload="none"`), keine zu großen Bilder auf den Hauptseiten.
- **Vorschlag:** EmailJS und DOMPurify nur auf Seiten mit Formular bzw. Blog laden; ungenutzte Medien aus `public/` entfernen.
- **Behoben:** nein.

#### M15: Zwei rote Tests mit Entscheidungsbedarf
- `test:ukv-vorsorge`: schlägt an, weil `public/llms.txt:356` „UKV NaturPRIVAT“ nennt (siehe M6). Entscheidung: gilt die Vorgabe „nur Vorsorge-Baustein“ auch für Vergleichsartikel?
- `test:whatsapp`: Der Test erwartet nach dem Hero der Startseite den schwebenden WhatsApp-Knopf. Die Startseite zählt aber als „geführte Beratungsfläche“ (`src/lib/guided-callback.js:17` erfasst auch `/`, Bedingung in `src/App.jsx:209`), deshalb erscheint dort weder WhatsApp noch Nita. Entscheidung: Absicht (dann Test anpassen) oder Fehler.
- **Behoben:** nein.

### Niedrig

#### N1: Lange Titel und Beschreibungen
67 Titel sind länger als 60 Zeichen, 22 Beschreibungen länger als 160 Zeichen. Google kürzt sie in den Suchergebnissen. Kein Fehler, aber bei Gelegenheit kürzen. **Behoben:** nein.

#### N2: Gleicher Titel auf zwei Dankeseiten
`/check/naturheilkunde/danke` und `/check/schwangerschaft/danke` haben denselben Titel und dieselbe Beschreibung. Beide sind gesperrt (noindex), daher unkritisch. **Behoben:** nein.

#### N3: Abgeschnittene Anrisstexte
Auf `/blog` werden 28 Karten-Überschriften am Desktop nach zwei Zeilen abgeschnitten, auf `/ratgeber` die Anrisse nach zwei Zeilen, auf `/zahn` sieben Kartentexte nach drei Zeilen. Gewollt (Zeilenbegrenzung), aber bei Überschriften schade. **Behoben:** nein.

#### N4: Startseite
„Passender Schutz. Gemeinsam geklärt.“ und direkt danach „Dein Schutz. Gemeinsam geklärt.“ wirken fast doppelt (Überschriften, nicht geändert). Die App-Abbildung zeigt „3.000 €“ statt „3.000 EUR“ (Bild). **Behoben:** nein.

#### N5: Verbleibende Gedankenstriche
- H2 auf `/zahnaerzte/praxis-checkliste`: „Fachlicher Arbeitsstand – noch keine berufsrechtliche Freigabe“ (`src/pages/ZahnaerztePraxisChecklistePage.jsx:112`). Überschrift, daher nicht geändert.
- „§§ 15–16“ (`src/pages/ErstinformationPage.jsx:153`) und „0–338 EUR“, „338–676 EUR“ (`src/pages/EmployerBavCalculatorPage.jsx:298` bis `:299`) in schmalen Kästen; nicht geändert, weil längerer Text dort umbrechen würde.
- Platzhalter „–“ für leere Werte (`EmployerBavCalculatorPage.jsx:494`, `:498`, `src/components/sections/VeterinaryContactForm.jsx:174`) und in einer Blog-Tabelle (`naturheilkunde-krankenkasse-2026`, Content-System). „mkk – meine krankenkasse“ ist der offizielle Kassenname.
- Englische Seiten: rund 25 Stellen, z. B. `scripts/seo-routes.mjs:616`, `:624`, `:640`, `:664`, `:692`, `:701`, `:709`, `:736` und mehrere Texte in `src/i18n/locales/en/`.
- Maschinenlesbare Dateien: `public/llms.txt` (8 Stellen), `public/mia-knowledge-base.txt` (15 Stellen).
- **Behoben:** nein.

#### N6: „Versicherungsmakler“ als vorangestelltes Label
Auf `/about` steht „Healio GmbH · Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 GewO“ (`src/i18n/locales/de/about.json:8`) und das Laufband beginnt mit „Unabhängiger Versicherungsmakler nach § 34d Abs. 1 GewO“ (`about.json:100`). Ebenso der erste Vertrauens-Chip in `src/components/desktop/desktopLeadContent.js:83`. Bitte prüfen, ob das unter die Regel fällt. Alle übrigen Stellen sind Fließtext oder Pflichtangaben. **Behoben:** nein.

#### N7: Bilder und Datenmengen
Die Tierbilder auf `/tierkrankenversicherung` sind 1.254 px breit, werden aber nur 160 bis 280 px breit angezeigt (220 bis 347 kB je Bild, `public/images/veterinary/animal-*.webp`). Vorschaubilder für soziale Netzwerke bis 1,7 MB (`public/images/hero-unternehmen-b2b.png`). Die Blog-Datendatei (172 kB) lädt auf `/blog`, `/ratgeber` und jedem Blogartikel. **Behoben:** nein.

#### N8: Barrierefreiheit, Kleinigkeiten
Wischleisten (Karussells) auf 21 Seiten sind per Tastatur nicht erreichbar, z. B. „Dein Weg mit Healio in Bildern“ auf der Startseite. Der Fragebogen auf `/zahn` setzt eine Beschriftung auf ein Element ohne Rolle (`src/components/sections/dental/DentalZahnCheck.jsx`). Zwei Blogartikel haben falsch verschachtelte Listen (`heilpraktiker-patienten-finanzierung-gesundheitsbudget`, `digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung`). **Behoben:** nein.

#### N9: Uneinheitliche Quellenstände
Die IKK-Satzung wird in 20 Ratgebern in der Fassung vom 01.08.2026 verlinkt, in `heilpraktiker-kosten.js` in der Fassung vom 15.10.2026. Dasselbe Bayerische-Dokument 275004 hat zwei verschiedene Adressen (`familienzimmer-krankenhaus.js` und `krankenhauszusatzversicherung-senioren.js`). Die TK-Satzung ist mit zwei verschiedenen PDF-Fassungen verlinkt (`bonusprogramm-krankenkasse.js:723` gegen `krankenkasse-zuschuss-fitnessstudio.js:51`). Barmer-Satzung „38. Nachtrag, 21.07.2026“ (`barmer-bonusprogramm-2026.js:521` u. a.) gegen „39./40. Nachtrag, 15.10.2026“ (`heilpraktiker-kosten.js:191`, `barmer-zahnzusatzversicherung.js:550`). Weitere Abweichungen bei DAK, AOK PLUS, AOK Bremen und den Bayerischen Bedingungen B 261005. **Behoben:** nein.

#### N10: Dokumentation
`DEPLOY.md` fehlt, obwohl `docs/META-FUNNEL-TRACKING.md:267` darauf verweist. Den Commit-Autor habe ich deshalb nach dieser Stelle gesetzt (Healio213-noreply-Adresse). `TECHNICAL_DOCUMENTATION.md` ist veraltet (Stand März 2026, z. B. Zeile 313 „IKK classic Bonusprogramm (bis 550 EUR/Jahr)“). **Behoben:** nein.

#### N11: Zwei veraltete Tests
`test:kassenboost-bridge` erwartet einen festen Import der KassenBoost-Texte in `src/i18n`, die Texte werden inzwischen nachgeladen. `test:altersvorsorge-analytics-rendered` braucht Chrome unter einem festen macOS-Pfad (`scripts/check-altersvorsorge-analytics.mjs:7`) und läuft nur auf einem Mac. **Behoben:** nein.

#### N12: Toter Code mit alten Aussagen
`src/pages/HomePage.jsx` samt `Concept.jsx`, `Benefits.jsx`, `BonusCalculator.jsx`, `Hero.jsx` sowie `Videos.jsx`, `InsuranceOverview.jsx`, `ZeitfalleSection.jsx`, `HowItWorks.jsx`, `BkvEmployerBenefits.jsx` und `WhyBkvWithHealio.jsx` (alle unter `src/components/sections/`) sind nirgends eingebunden. Sie enthalten veraltete Aussagen wie „Keine Gesundheitsprüfung“ und Gedankenstriche. Vorschlag: entfernen, damit niemand sie versehentlich wieder einbindet. **Behoben:** nein.

#### N13: Sie- statt Du-Form
`/blog` hat als Vorschau-Titel „Healio Ratgeber: Ihr Weg zum Gesundheitsbudget“ (`src/pages/BlogPage.jsx:110`), `/potenzialanalyse` beschreibt sich nach dem Laden mit „Erfahren Sie …“ (`src/i18n/locales/de/seo.json`). Die übrige Website duzt. **Behoben:** nein.

#### N14: Nita-Wissensbasis und Einzelstellen
`public/mia-knowledge-base.txt:9` verspricht „effektiv für 0 Euro“, die Website sagt sonst „ganz oder teilweise“. `src/i18n/locales/de/ambulant.json:652` schreibt auf `/ambulant` „Neugeborene können innerhalb von zwei Monaten ohne Gesundheitsprüfung mitversichert werden“: rechtlich richtig (Kindernachversicherung), auf der ambulanten Seite aber missverständlich. `public/llms.txt:79` nennt „Zubehör zur Kinderwunscherfüllung“ als Teil der IKK-Leistungsliste; das ist kein Argument, nur zur Kenntnis. **Behoben:** nein.

#### N15: Externe Links nicht live geprüft
Die 546 verschiedenen externen Links konnten in dieser Prüfumgebung nicht aufgerufen werden, weil das Netzwerk dort nur freigegebene Adressen zulässt (gesperrt waren u. a. `healio.de`, `app.healio.de` und `www.ikk-classic.de`). Statisch geprüft: alle mit https, keine Tippfehler, plausible Ziele (Gesetze, G-BA, Kassen, Versicherer). Vorschlag: einmal lokal mit einem Linkprüfer laufen lassen oder die Domains für die Cloud-Umgebung freigeben. **Behoben:** nein.

## Umstellung der IKK-Werte zum 01.01.2027

Ab 01.01.2027 gilt: „laut Satzung bis zu 500 EUR Zuschuss im Jahr, in der Regel 400 bis 500 EUR“, für Schwangere „allein die vollständige Mutterschaftsvorsorge bringt 300 EUR Zuschuss“, Werbekurzform „bis 500 EUR“. Hier stehen alle Stellen, an denen heute IKK-Bonuswerte stehen. Nichts davon wurde geändert.

So ist die Liste aufgebaut:
- **A. Kernwerte:** Stellen mit 810 EUR, 700 EUR(+), 400 bis 700 EUR, 1.155 EUR oder Beispielsummen wie 405 EUR und 550 EUR. Diese müssen zum Stichtag geändert werden.
- **B. Weitere IKK-Beträge:** Stellen, die IKK und Euro-Beträge nennen, etwa Einzelboni je Maßnahme, Zuschüsse für Zahnreinigung oder Osteopathie und Beispielrechnungen. Hier bitte prüfen, ob die neue Satzung sie ändert.
- **C. Englische Seiten.**
- Kommentarzeilen im Code sind nicht aufgeführt. `src/content/ratgeber/registry.js` wird beim Build aus den Artikeldateien erzeugt und muss nicht von Hand geändert werden.

**Außerhalb der Textdateien:**
- **Rechner-Konstanten (Geldbonus und Zuschuss je Maßnahme):** `src/components/sections/ambulant/AmbulantBonusCalculator.jsx:25` bis `:50` und `src/lib/pregnancyBonus.js:6` bis `:12`. Diese Werte (5, 10 und 25 EUR Geldbonus bzw. 15, 30 und 75 EUR Zuschuss) müssen an die neue Satzung angepasst werden. Der Rechner auf `/schwangerschaft` zeigt heute „630 EUR Zuschuss / 210 EUR Geldbonus“.
- **Video:** `public/videos/erklaerfilme/erklaervideo-kassenbonus-v1.mp4` spricht die Werte aus (Untertitel `erklaervideo-kassenbonus-v1-de.vtt:72`, `:77`, `:82`: 810 Euro, 400 bis 700 Euro, 1.155 Euro).
- **PDFs:** `public/downloads/healio-leitfaden-therapieabbruch-stopper-2026.pdf` (1.155 EUR, 400 bis 700 EUR), `public/downloads/kassenbonus-leitfaden-2026-10-08.pdf` (810 EUR, Einzelboni), `public/downloads/healio-zuschuss-fahrplan-2027.pdf` (Bild-PDF, nicht maschinell prüfbar, bitte von Hand ansehen).
- **Content-System:** Die Blogartikel kommen aus `app.healio.de`. Die Zeilen unten beziehen sich auf die Kopie `public/data/blog-articles-cache.json`; geändert werden muss im Content-System.

#### A. Kernwerte des IKK-Bonus (810 EUR, 700 EUR+, 400 bis 700 EUR, 1.155 EUR, Beispielsummen) (88 Stellen in 35 Dateien)

- `public/data/blog-articles-cache.json`: Zeilen 54 (10 EUR, 30 EUR, 25 EUR, 75 EUR, 1.155 EUR, 810 EUR, 405 EUR, 240 EUR); 108 (10 EUR, 810 EUR, 1.155 EUR); 109 (10 EUR, 810 EUR, 1.155 EUR); 213 (810 EUR); 216 (1.155 EUR, 810 EUR, 30 EUR, 15 EUR, 75 EUR, 150 EUR, 550 EUR); 217 (810 EUR, 1.155 EUR); 228 (810 EUR, 1.155 EUR); 270 (810 EUR, 1.155 EUR, 550 EUR); 271 (810 EUR, 1.155 EUR); 378 (3.000 Euro, 1.000 Euro, 500 Euro, 810 Euro, 1.155 Euro); 379 (3.000 Euro, 500 Euro, 810 Euro, 1.155 Euro); 454 (810 Euro, 1.155 Euro, 1.000 Euro, 3.000 Euro); 455 (810 Euro, 1.155 Euro, 1.000 Euro, 3.000 Euro); 530 (40 Euro, 160 Euro, 120 Euro, 1.000 Euro, 3.000 Euro, 810 Euro, 1.155 Euro, 500 Euro); 531 (40 Euro, 160 Euro, 1.000 Euro, 3.000 Euro, 810 Euro, 1.155 Euro); 606 (3.000 Euro, 1.000 Euro, 500 Euro, 810 Euro, 1.155 Euro); 607 (1.000 Euro, 3.000 Euro, 810 Euro, 1.155 Euro); 682 (10 EUR, 75 Euro, 810 Euro, 7,00 Euro, 33,41 Euro, 50,72 Euro); 702 (810 Eur); 758 (3.000 EUR, 1.000 EUR, 810 EUR, 1.155 EUR, 500 EUR); 849 (1.000 EUR, 3.000 EUR, 810 EUR, 1.155 EUR, 500 EUR); 877 (810 EUR, 1.155 EUR)
- `public/llms.txt`: Zeilen 95 (600 Euro)
- `public/mia-knowledge-base.txt`: Zeilen 23 (700 EUR+); 121 (700 EUR+); 123 (700 EUR+)
- `src/components/BenefitFunnelPage.jsx`: Zeilen 36 (400 bis 700); 51; 436 (1.155 EUR, 700 EUR)
- `src/components/PregnancyGuidance.jsx`: Zeilen 21 (1.155 EUR, 700 EUR)
- `src/components/sections/dental/dentalContent.js`: Zeilen 296 (810 EUR); 299 (1.155 EUR); 636 (400 to 700)
- `src/content/ratgeber/aok-zahnzusatzversicherung.js`: Zeilen 218 (810 EUR, 700 EUR)
- `src/content/ratgeber/baby-geplant-zusatzversicherung.js`: Zeilen 188 (810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/babybonus-krankenkasse.js`: Zeilen 83 (700 EUR); 147 (810 EUR, 1.155 EUR, 700 EUR); 236 (1.155 EUR, 700 EUR); 300 (810 EUR, 1.155 EUR, 700 EUR); 311 (810 EUR, 1.155 EUR, 700 EUR, 10 EUR, 30 EUR)
- `src/content/ratgeber/barmer-zahnzusatzversicherung.js`: Zeilen 420 (810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/bkk-firmus-bonusprogramm-2026.js`: Zeilen 311 (810 EUR, 700 EUR); 347 (10 EUR+, 5 EUR, 35 EUR, 105 EUR, 25 EUR, 135 EUR, 405 EUR, 350,70 EUR, 50 EUR)
- `src/content/ratgeber/bonusheft-zahnarzt.js`: Zeilen 181 (810 EUR, 700 EUR)
- `src/content/ratgeber/bonusprogramm-krankenkasse.js`: Zeilen 154 (810 EUR, 700 EUR); 189 (350,70 EUR, 405 EUR, 50 EUR, 4,30 EUR)
- `src/content/ratgeber/familienzimmer-krankenhaus.js`: Zeilen 459 (810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/hebamme-kosten-krankenkasse.js`: Zeilen 352 (10 EUR, 30 EUR, 25 EUR, 75 EUR, 700 EUR)
- `src/content/ratgeber/heilpraktiker-kosten.js`: Zeilen 324 (810 EUR, 1.155 EUR, 700 EUR); 637 (405 EUR)
- `src/content/ratgeber/heilpraktiker-zusatzversicherung.js`: Zeilen 387 (405 EUR); 446 (810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/homoeopathie-krankenkasse-2027.js`: Zeilen 208 (810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/ikk-classic-bonusprogramm-2026.js`: Zeilen 95 (810 EUR); 96 (400 bis 700); 251 (810 EUR); 252 (1.155 EUR); 257 (1.155 EUR); 267 (1.155 EUR); 324 (810 EUR)
- `src/content/ratgeber/krankenhauszusatzversicherung-senioren.js`: Zeilen 444 (810 EUR, 700 EUR, 652,80 EUR)
- `src/content/ratgeber/krankenkassen-bonus-zusatzversicherung.js`: Zeilen 92 (810 Eur)
- `src/content/ratgeber/schwanger-zusatzversicherung.js`: Zeilen 117 (1.155 EUR, 700 EUR); 271 (1.155 EUR, 810 EUR, 700 EUR); 275 (405 EUR, 240 EUR)
- `src/content/ratgeber/schwangerschaft-was-steht-mir-zu.js`: Zeilen 407 (810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/schwangerschaft-worauf-achten.js`: Zeilen 219 (1.155 EUR)
- `src/content/ratgeber/zahnzusatzversicherung-fehlender-zahn.js`: Zeilen 241 (3.000 EUR, 810 EUR, 1.155 EUR, 700 EUR)
- `src/content/ratgeber/zahnzusatzversicherung-laufende-behandlung.js`: Zeilen 433 (810 EUR, 1.155 EUR, 700 EUR); 437 (400 bis 700)
- `src/i18n/locales/de/about.json`: Zeilen 96 (700 EUR+)
- `src/i18n/locales/de/ambulant.json`: Zeilen 705 (700 EUR+)
- `src/i18n/locales/de/home.json`: Zeilen 107 (700 EUR+)
- `src/i18n/locales/de/instagram.json`: Zeilen 62 (700 EUR+)
- `src/i18n/locales/de/kassenbonus.json`: Zeilen 43 (810 EUR); 51 (1.155 EUR)
- `src/i18n/locales/de/partner.json`: Zeilen 75 (3.000 EUR, 810 EUR)
- `src/i18n/locales/de/stationaer.json`: Zeilen 547 (400 bis 700)
- `src/i18n/locales/de/tiktok.json`: Zeilen 62 (700 EUR+)
- `src/lib/blogEditorialFixes.js`: Zeilen 37 (700 Euro, 700 EUR+); 38 (700 Euro, 700 EUR+); 59 (700 Euro, 50 Euro, 700 EUR+); 100 (700 Euro, 700 EUR+); 108 (700 Euro, 700 EUR+); 115 (700 Euro, 700 EUR+); 141 (3.000 EUR, 700 EUR, 50 EUR, 1.000 EUR); 145 (700 EUR, 700 EUR+); 146 (700 EUR+)

#### B. Weitere IKK-Beträge (Einzelboni, Zuschüsse je Maßnahme, Beispielrechnungen): prüfen, ob die Satzung 2027 sie ändert (87 Stellen in 37 Dateien)

- `public/data/blog-articles-cache.json`: Zeilen 1042 (160 EUR, 40 EUR, 50 EUR, 300 EUR, 360 EUR, 240 EUR, 120 EUR, 200 EUR, 180 EUR, 60 EUR, 3.000 EUR, 80 EUR, 320 EUR, 256 EUR, 64 EUR, 920 EUR, 608 EUR, 152 EUR)
- `public/llms.txt`: Zeilen 3 (3.000 Euro); 5 (3.000 EUR); 50 (5 Euro, 15 Euro); 85 (180 Euro, 90 Euro); 162 (50 Euro, 45 Euro); 189 (180 Euro, 90 Euro); 272 (3.000 EUR); 286 (90 EUR); 312 (40 EUR)
- `public/mia-knowledge-base.txt`: Zeilen 228 (160 Euro, 40 Euro); 332 (45 Euro)
- `src/components/BenefitFunnelPage.jsx`: Zeilen 409 (10 EUR, 30 EUR, 75 EUR)
- `src/components/desktop/desktopLeadContent.js`: Zeilen 25 (400,00 EUR); 111 (EUR 400.00)
- `src/content/ratgeber/babybonus-krankenkasse.js`: Zeilen 124 (10 EUR, 30 EUR, 250 EUR, 100 EUR); 175 (10 EUR, 30 EUR); 184 (10 EUR, 30 EUR, 3,20 EUR); 203 (3.500 EUR, 243,60 EUR)
- `src/content/ratgeber/barmer-bonusprogramm-2026.js`: Zeilen 394 (200 EUR)
- `src/content/ratgeber/bkk-firmus-bonusprogramm-2026.js`: Zeilen 315 (3.500 EUR, 42.000 EUR, 350,70 EUR, 50 EUR, 400,70 EUR); 320 (3.500 EUR)
- `src/content/ratgeber/bonusprogramm-krankenkasse.js`: Zeilen 164 (100 EUR); 438 (90 EUR)
- `src/content/ratgeber/geburtsvorbereitungskurs-partner.js`: Zeilen 21 (100 EUR)
- `src/content/ratgeber/hautkrebsscreening.js`: Zeilen 175 (30 EUR)
- `src/content/ratgeber/hebamme-kosten-krankenkasse.js`: Zeilen 90 (1.000 EUR, 1.250 EUR, 250 EUR); 297 (1.000 EUR, 1.250 EUR, 250 EUR, 750 EUR, 500 EUR); 344 (250 EUR); 435 (250 EUR, 1.000 EUR, 1.250 EUR)
- `src/content/ratgeber/hebamme-rufbereitschaft.js`: Zeilen 60 (250 EUR); 124 (250 EUR)
- `src/content/ratgeber/ikk-classic-bonusprogramm-2026.js`: Zeilen 334 (40 EUR, 160 EUR)
- `src/content/ratgeber/ikk-zahnreinigung.js`: Zeilen 13 (40 EUR); 18 (40 EUR); 32 (40 EUR); 39 (40 EUR); 47 (40 EUR); 99 (100 EUR, 40 EUR, 60 EUR); 125 (100 EUR, 40 EUR, 60 EUR); 173 (3.000 EUR, 12,75 EUR, 153 EUR); 177 (40 EUR); 282 (40 EUR)
- `src/content/ratgeber/ikk-zahnzusatzversicherung.js`: Zeilen 157 (40 EUR)
- `src/content/ratgeber/mkk-bonusprogramm-2026.js`: Zeilen 305 (100 EUR, 70 EUR)
- `src/content/ratgeber/osteopathie-krankenkasse.js`: Zeilen 643 (100 EUR, 600 EUR); 667 (31,64 EUR, 759,36 EUR); 746 (400 EUR, 50 EUR, 360 EUR, 300 EUR, 120 EUR, 160 EUR)
- `src/content/ratgeber/praeventionskurs-krankenkasse.js`: Zeilen 16 (90 EUR); 45 (90 EUR); 150 (180 EUR, 90 EUR); 295 (90 EUR)
- `src/content/ratgeber/professionelle-zahnreinigung-kosten.js`: Zeilen 168 (40 EUR); 177 (250 EUR)
- `src/content/ratgeber/schwanger-zusatzversicherung.js`: Zeilen 267 (10 EUR, 30 EUR, 25 EUR, 75 EUR)
- `src/content/ratgeber/schwangerschaft-was-steht-mir-zu.js`: Zeilen 297 (75 EUR); 522 (30 EUR)
- `src/content/ratgeber/schwangerschaft-worauf-achten.js`: Zeilen 191 (10 EUR, 30 EUR); 215 (10 EUR, 30 EUR, 25 EUR, 75 EUR); 387 (10 EUR, 30 EUR)
- `src/content/ratgeber/tk-bonusprogramm-2026.js`: Zeilen 372 (4.000 EUR, 278 EUR, 15 EUR, 30 EUR, 75 EUR)
- `src/content/ratgeber/vorsorgeuntersuchung.js`: Zeilen 98 (61 EUR)
- `src/content/ratgeber/vorsorgeuntersuchungen-kinder.js`: Zeilen 180 (61 EUR); 198 (61 EUR); 348 (61 EUR)
- `src/content/ratgeber/zahnersatz-kosten.js`: Zeilen 440 (40 EUR)
- `src/content/ratgeber/zahnersatz-moeglichkeiten.js`: Zeilen 87 (398,39 EUR, 239,03 EUR)
- `src/content/ratgeber/zahnkrone-kosten.js`: Zeilen 281 (398,39 EUR, 366 EUR)
- `src/content/ratgeber/zahnreinigung-krankenkasse.js`: Zeilen 65 (40 EUR); 143 (40 EUR, 60 EUR, 120 EUR)
- `src/i18n/locales/de/ambulant-faq.json`: Zeilen 14 (10,36 Euro, 15,82 Euro, 31,64 Euro); 18 (1.000 Euro, 160 Euro, 40 Euro); 35 (1.000 Euro, 160 Euro, 40 Euro); 68 (3.000 EUR)
- `src/i18n/locales/de/ambulant.json`: Zeilen 267 (3.000 EUR); 622 (80 Euro, 1.000 Euro); 634 (500 Euro, 75 Euro, 15 Euro, 31,64 Euro); 646 (680 Euro, 500 Euro); 713 (3.000 EUR); 864 (3.000 EUR)
- `src/i18n/locales/de/hebammen.json`: Zeilen 241 (250 EUR)
- `src/i18n/locales/de/partner.json`: Zeilen 99 (500 EUR); 161 (500 EUR)
- `src/i18n/locales/de/presse.json`: Zeilen 20 (3.000 EUR)
- `src/i18n/locales/de/zahn.json`: Zeilen 4 (10 EUR)
- `src/lib/blogEditorialFixes.js`: Zeilen 57 (3.000 EUR); 153 (3.000 EUR)

#### C. Englische Seiten (16 Stellen in 11 Dateien)

- `src/i18n/locales/en/about.json`: Zeilen 96 (EUR 700+)
- `src/i18n/locales/en/ambulant.json`: Zeilen 219; 657 (EUR 700+); 665 (EUR 3,000); 816
- `src/i18n/locales/en/hebammen.json`: Zeilen 241 (EUR 250)
- `src/i18n/locales/en/home.json`: Zeilen 105 (EUR 700+)
- `src/i18n/locales/en/instagram.json`: Zeilen 62 (EUR 700+)
- `src/i18n/locales/en/kassenbonus.json`: Zeilen 49 (EUR 1,155)
- `src/i18n/locales/en/partner.json`: Zeilen 75 (EUR 3,000, EUR 810); 99 (EUR 500); 161 (EUR 500)
- `src/i18n/locales/en/presse.json`: Zeilen 20 (3.000 EUR)
- `src/i18n/locales/en/stationaer.json`: Zeilen 547 (400 to 700)
- `src/i18n/locales/en/tiktok.json`: Zeilen 62 (EUR 700+)
- `src/i18n/locales/en/zahn.json`: Zeilen 4 (10 EUR)

## Abhakliste: alle Seiten und Artikel

Legende: **Handy 390 px** und **Desktop 1.440 px**: „ok“ heißt geladen ohne Fehler, kein seitliches Scrollen, kein Element ragt aus dem Bildschirm, alle Bilder geladen, genau eine sichtbare H1. **SEO**: „ok“ heißt genau ein Title, eine Description, ein Canonical, eine H1 im ausgelieferten HTML und strukturierte Daten vorhanden; „noindex“ heißt bewusst für Suchmaschinen gesperrt und korrekt nicht in der Sitemap. **Leistung zwischendurch / am Ende**: sichtbarer, gestalteter Link zu einer Leistungsseite im Textverlauf bzw. im Schlussteil des Artikels. **Ziel**: alle verlinkten Leistungsseiten. **Befunde**: Nummern aus diesem Bericht. Für alle Seiten gelten zusätzlich die allgemeinen Befunde M11 (Fußzeile), M12, M13, M14 und N1.

### A. Seiten (71)

| Nr. | Seite | Geprüft | Handy 390 px | Desktop 1440 px | SEO | Befunde |
|---:|---|:-:|:-:|:-:|---|---|
| 1 | `/altersvorsorgedepot` | ✅ | ok | ok | ok | M4, M8, M11, N8 |
| 2 | `/altersvorsorgedepot/danke` | ✅ | ok | ok | ok, noindex | M4 |
| 3 | `/ratgeber/altersvorsorgedepot` | ✅ | ok | ok | ok | keine |
| 4 | `/` | ✅ | ok | ok | ok | N4, N8 |
| 5 | `/unternehmen` | ✅ | ok | ok | ok | N8 |
| 6 | `/kassenboost` | ✅ | ok | ok | ok | M4 |
| 7 | `/kassenbonus` | ✅ | ok | ok | ok | H5 |
| 8 | `/schwangerschaft` | ✅ | ok | ok | ok | H3, H8, M8, N8 |
| 9 | `/ambulant` | ✅ | ok | ok | ok | H8, M10 |
| 10 | `/partner` | ✅ | ok | ok | ok | M4, M10, N8 |
| 11 | `/hebammen` | ✅ | ok | ok | ok | M3, M4, N8 |
| 12 | `/zahnaerzte` | ✅ | ok | ok | ok | N8 |
| 13 | `/heilberufe-vorsorge` | ✅ | ok | ok | ok | M4, M11, N8 |
| 14 | `/zahn` | ✅ | ok | ok | ok | M4, M7, N3, N8 |
| 15 | `/stationaer` | ✅ | ok | ok | ok | H3, M8, N8 |
| 16 | `/leistungen` | ✅ | ok | ok | ok | keine |
| 17 | `/about` | ✅ | ok | ok | ok | N6, N8 |
| 18 | `/kontakt` | ✅ | ok | ok | ok | keine |
| 19 | `/blog` | ✅ | ok | ok | ok | M4, M5, N3 |
| 20 | `/ratgeber` | ✅ | ok | ok | ok | M5, N3 |
| 21 | `/potenzialanalyse` | ✅ | ok | ok | ok | M4 |
| 22 | `/terminvereinbarung` | ✅ | ok | ok | ok | M4 |
| 23 | `/confirmation` | ✅ | ok | ok | ok, noindex | keine |
| 24 | `/tierkrankenversicherung` | ✅ | ok | ok | ok | M4, N7, N8 |
| 25 | `/presse` | ✅ | ok | ok | ok | M11, N8 |
| 26 | `/impressum` | ✅ | ok | ok | ok | M10, M11 |
| 27 | `/agb` | ✅ | ok | ok | ok | keine |
| 28 | `/datenschutz` | ✅ | ok | ok | ok | keine |
| 29 | `/erstinformation` | ✅ | ok | ok | ok | N5 |
| 30 | `/en` | ✅ | ok | ok | ok | M4, N5, N8 |
| 31 | `/en/companies` | ✅ | ok | ok | ok | N5, N8 |
| 32 | `/en/kassenboost` | ✅ | ok | ok | ok | M4, N5 |
| 33 | `/en/health-insurance-bonus` | ✅ | ok | ok | ok | M4, N5 |
| 34 | `/en/outpatient` | ✅ | ok | ok | ok | M4, N5 |
| 35 | `/en/partner` | ✅ | ok | ok | ok | M4, N5, N8 |
| 36 | `/en/healthcare-professionals-protection` | ✅ | ok | ok | ok | M4, N5, N8 |
| 37 | `/en/dental` | ✅ | ok | ok | ok | M4, N5, N8 |
| 38 | `/en/inpatient` | ✅ | ok | ok | ok | N5, N8 |
| 39 | `/en/services` | ✅ | ok | ok | ok | N5 |
| 40 | `/en/about` | ✅ | ok | ok | ok | N5, N8 |
| 41 | `/en/contact` | ✅ | ok | ok | ok | N5 |
| 42 | `/en/initial-information` | ✅ | ok | ok | ok | N5 |
| 43 | `/en/blog` | ✅ | ok | ok | ok, noindex | M4, N5 |
| 44 | `/en/midwives` | ✅ | ok | ok | ok | M4, N5, N8 |
| 45 | `/en/appointment` | ✅ | ok | ok | ok | M4, N5 |
| 46 | `/en/potential-analysis` | ✅ | ok | ok | ok | M4, N5 |
| 47 | `/en/pet-insurance` | ✅ | ok | ok | ok | M4, N5, N7, N8 |
| 48 | `/en/legal-notice` | ✅ | ok | ok | ok | M4, N5 |
| 49 | `/en/terms` | ✅ | ok | ok | ok | M4, N5 |
| 50 | `/en/privacy` | ✅ | ok | ok | ok | M4, N5 |
| 51 | `/partner/leitfaden` | ✅ | ok | ok | ok | keine |
| 52 | `/partner/leitfaden/danke` | ✅ | ok | ok | ok, noindex | M4 |
| 53 | `/lebenshilfe` | ✅ | ok | ok | ok, noindex | M4 |
| 54 | `/unternehmen/vorsorge-rechner` | ✅ | ok | ok | ok, noindex | N5 |
| 55 | `/en/companies/pension-calculator` | ✅ | ok | ok | ok, noindex | N5 |
| 56 | `/zahnaerzte/praxis-checkliste` | ✅ | ok | ok | ok, noindex | N5 |
| 57 | `/unternehmen/team-vorteil` | ✅ | ok | ok | ok, noindex | keine |
| 58 | `/heilberufe-vorsorge/praxis-material` | ✅ | ok | ok | ok, noindex | keine |
| 59 | `/zahnaerzte/praxis-material` | ✅ | ok | ok | ok, noindex | keine |
| 60 | `/konto-loeschen` | ✅ | ok | ok | ok, noindex | M4, M11, N8 |
| 61 | `/app-bestaetigt` | ✅ | ok | ok | ok, noindex | M4 |
| 62 | `/reset-password` | ✅ | ok | ok | ok, noindex | M4 |
| 63 | `/en/confirmation` | ✅ | ok | ok | ok, noindex | M4, N5 |
| 64 | `/check/naturheilkunde` | ✅ | ok | ok | ok, noindex | keine |
| 65 | `/check/naturheilkunde/danke` | ✅ | ok | ok | ok, noindex | N2 |
| 66 | `/check/schwangerschaft` | ✅ | ok | ok | ok, noindex | keine |
| 67 | `/check/schwangerschaft/danke` | ✅ | ok | ok | ok, noindex | N2 |
| 68 | `/tiktok` | ✅ | ok | ok | ok, noindex | M4 |
| 69 | `/en/tiktok` | ✅ | ok | ok | ok, noindex | M4, N5 |
| 70 | `/instagram` | ✅ | ok | ok | ok, noindex | M4 |
| 71 | `/en/instagram` | ✅ | ok | ok | ok, noindex | M4, N5 |

### B. Ratgeber-Artikel (187)

| Nr. | Artikel `/ratgeber/…` | Geprüft | Handy 390 px | Desktop | SEO | Leistung zwischendurch | Leistung am Ende | Ziel | Befunde |
|---:|---|:-:|:-:|:-:|---|:-:|:-:|---|---|
| 1 | `schwangerschaft-worauf-achten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | H8 |
| 2 | `bonusprogramm-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M8 |
| 3 | `ikk-classic-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer, /zahn | M2 |
| 4 | `mkk-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer, /zahn | H4 |
| 5 | `aok-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer, /zahn | H4, M3 |
| 6 | `tk-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer, /zahn | H4 |
| 7 | `barmer-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer, /zahn | H4 |
| 8 | `krankenkassen-bonus-zusatzversicherung` (Advertorial) | ✅ | ok | ok | ok, noindex | ja | ja | /leistungen | M8 |
| 9 | `zusatzbeitrag-krankenkasse-2026` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 10 | `krankenkasse-wechseln` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 11 | `aok-zuzahlungsbefreiung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 12 | `zusatzbeitrag-rentner` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 13 | `praeventionskurs-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 14 | `guenstigste-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | M8 |
| 15 | `mindestbeitrag-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 16 | `dak-zuzahlungsbefreiung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 17 | `krankenkasse-studenten` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 18 | `dak-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 19 | `krankenkasse-zuschuss-fitnessstudio` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M2 |
| 20 | `zuzahlungsbefreiung-chronisch-krank` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 21 | `ikk-zuzahlungsbefreiung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 22 | `zuzahlung-medikamente` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 23 | `krankenkasse-wechseln-nachteile` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | M2 |
| 24 | `zuzahlungsbefreiung-schwerbehinderung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 25 | `wechselpraemie-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 26 | `hkk-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 27 | `hek-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 28 | `abnehmen-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 29 | `beitragserhoehung-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen | keine |
| 30 | `mobil-krankenkasse-bonusprogramm` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M2 |
| 31 | `zuzahlungsbefreiung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M3, M8 |
| 32 | `krankenversicherung-beitrag-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 33 | `tk-zuzahlungsbefreiung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M8 |
| 34 | `barmer-zuzahlungsbefreiung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M8 |
| 35 | `zuzahlungsbefreiung-rentner` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M8 |
| 36 | `bkk-firmus-bonusprogramm-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M3, M8 |
| 37 | `krankenkasse-wechseln-rentner` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 38 | `krankenzusatzversicherung-vergleichen` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen, /stationaer, /zahn | keine |
| 39 | `zahnersatz-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M3 |
| 40 | `professionelle-zahnreinigung-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M3, M7 |
| 41 | `zahnimplantat-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M7 |
| 42 | `wurzelbehandlung-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, H7 |
| 43 | `zahnkrone-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M7 |
| 44 | `bonusheft-zahnarzt` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M7 |
| 45 | `zahnzusatzversicherung-ohne-wartezeit` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, H7 |
| 46 | `zahnzusatzversicherung-fehlender-zahn` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H7 |
| 47 | `zahnzusatzversicherung-lohnt-sich` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M7 |
| 48 | `ukv-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M7 |
| 49 | `bayerische-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, H7 |
| 50 | `aok-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M3, M7 |
| 51 | `dak-zahnreinigung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6 |
| 52 | `zahnbruecke-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M3 |
| 53 | `zahnprothese-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, M3 |
| 54 | `zahnfuellung-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6, H7 |
| 55 | `parodontitis-behandlung-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6 |
| 56 | `zahnersatz-moeglichkeiten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6 |
| 57 | `zahnersatz-haertefall` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H6 |
| 58 | `zahnzusatzversicherung-vergleich` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 59 | `aok-zahnreinigung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2, M7 |
| 60 | `tk-zahnreinigung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 61 | `barmer-zahnreinigung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 62 | `tk-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 63 | `zahnzusatzversicherung-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2, M7 |
| 64 | `zahnzusatzversicherung-laufende-behandlung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M3 |
| 65 | `professionelle-zahnreinigung-sinnvoll` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2, M7 |
| 66 | `zahnreinigung-wie-oft` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2, M7 |
| 67 | `weisheitszaehne-ziehen-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 68 | `vollnarkose-zahnarzt-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 69 | `barmer-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H7, M3, M7 |
| 70 | `zahnkrone-rausgefallen` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 71 | `dak-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 72 | `ikk-zahnreinigung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 73 | `zahnersatz-guenstig` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 74 | `heil-und-kostenplan` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 75 | `zahnzusatzversicherung-senioren` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 76 | `implantat-oder-bruecke` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 77 | `ikk-zahnzusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2 |
| 78 | `zahnzusatzversicherung-kinder` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M3, M7 |
| 79 | `zahnspange-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M3, M7 |
| 80 | `zahnspange-erwachsene` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M7 |
| 81 | `unsichtbare-zahnspange-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M7 |
| 82 | `zahnzusatzversicherung-kieferorthopaedie` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M2, M7 |
| 83 | `zahnzusatzversicherung-familie` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M3, M7 |
| 84 | `zahnreinigung-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M7 |
| 85 | `zahnzusatzversicherung-sofort-2026` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H7 |
| 86 | `zahnzusatzversicherung-zahnreinigung-2026` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | H7, M7 |
| 87 | `heilpraktiker-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M3, M6 |
| 88 | `heilpraktiker-zusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M3, M6 |
| 89 | `ambulante-zusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M3 |
| 90 | `akupunktur-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 91 | `tk-osteopathie` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 92 | `chiropraktiker-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 93 | `physiotherapie-zuzahlung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 94 | `gebuehrenordnung-heilpraktiker` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 95 | `osteopathie-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 96 | `naturheilkunde` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 97 | `osteopathie-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M3, M6 |
| 98 | `physiotherapie-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 99 | `akupunktur-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 100 | `aok-osteopathie` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 101 | `tcm-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 102 | `homoeopathie-krankenkasse-2027` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 103 | `aok-heilpraktiker` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 104 | `zusatzversicherung-osteopathie` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 105 | `heilpraktiker-zusatzversicherung-ohne-wartezeit` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 106 | `barmer-osteopathie` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2, M6 |
| 107 | `tk-heilpraktiker` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2, M6 |
| 108 | `mobil-krankenkasse-osteopathie` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 109 | `krankenzusatzversicherung-ohne-gesundheitsfragen-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer, /zahn | H2 |
| 110 | `heilpraktiker-zusatzversicherung-vergleich-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 111 | `stationaere-zusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M8 |
| 112 | `einzelzimmer-krankenhaus-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M8 |
| 113 | `zusatzversicherung-einzelzimmer` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 114 | `krankenhaustagegeld` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M8 |
| 115 | `reha-zuzahlung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 116 | `krankenhauszusatzversicherung-vergleich` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 117 | `chefarztbehandlung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 118 | `krankenhauszusatzversicherung-kosten` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 119 | `krankenhauszusatzversicherung-ohne-wartezeit` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 120 | `begleitperson-krankenhaus` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M2, M8 |
| 121 | `aok-krankenhauszusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | keine |
| 122 | `tk-krankenhauszusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M2 |
| 123 | `krankenhauszusatzversicherung-vorerkrankung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M2 |
| 124 | `krankenhauszusatzversicherung-kinder` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M2, M8 |
| 125 | `krankenhauszusatzversicherung-senioren` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | M3, M8 |
| 126 | `zusatzversicherung-kinder` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer, /zahn | H3, M8 |
| 127 | `baby-geplant-zusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | H3, H8, M3 |
| 128 | `neugeborenes-versichern` | ✅ | ok | ok | ok | ja | ja | /leistungen, /stationaer | H3, M8 |
| 129 | `familienzimmer-krankenhaus` | ✅ | ok | ok | ok | ja | ja | /leistungen, /schwangerschaft, /stationaer | H3, M3, M8 |
| 130 | `babybonus-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /leistungen, /schwangerschaft, /stationaer | H8, M3, M8 |
| 131 | `hebamme-rufbereitschaft` | ✅ | ok | ok | ok | ja | ja | /leistungen, /schwangerschaft, /stationaer | H3, H8, M8 |
| 132 | `schwanger-zusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer | H3, M8 |
| 133 | `schwangerschaft-was-steht-mir-zu` | ✅ | ok | ok | ok | ja | ja | /leistungen, /schwangerschaft | M3, M8 |
| 134 | `hebamme-kosten-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /leistungen, /schwangerschaft, /stationaer | H3 |
| 135 | `geburtsvorbereitungskurs` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | keine |
| 136 | `familienversicherung-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /stationaer | keine |
| 137 | `aok-babybonus` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | M2 |
| 138 | `geburtsvorbereitungskurs-partner` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | keine |
| 139 | `schwangerschaft-krankenkasse-melden` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | M2 |
| 140 | `tk-schwangerschaft` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | M2 |
| 141 | `vorsorgeuntersuchung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M3 |
| 142 | `vorsorgeuntersuchung-frauen` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | H8 |
| 143 | `vorsorgeuntersuchung-maenner` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 144 | `hautkrebsscreening` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 145 | `tk-reiseimpfung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 146 | `check-up-35` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 147 | `reiseimpfung-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 148 | `tk-hautkrebsscreening` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 149 | `vorsorgeuntersuchungen-kinder` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 150 | `aok-reiseimpfung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 151 | `vorsorge-zusatzversicherung-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 152 | `brille-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M3 |
| 153 | `brillenversicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 154 | `gleitsichtbrille-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 155 | `augenlasern-kosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 156 | `brillenversicherung-kinder` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 157 | `tk-brille` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | keine |
| 158 | `aok-brille` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 159 | `kontaktlinsen-krankenkasse` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 160 | `brille-verloren-versicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2, M6 |
| 161 | `brillenkosten` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M2 |
| 162 | `zahn-und-brillenversicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /zahn | M2 |
| 163 | `fielmann-brillenversicherung-kuendigen-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M6 |
| 164 | `altersvorsorgedepot-was-ist-das` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1, M8 |
| 165 | `altersvorsorgedepot-ab-wann` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 166 | `altersvorsorgedepot-foerderung` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 167 | `altersvorsorgedepot-wer-ist-berechtigt` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 168 | `riester-altersvorsorgedepot-wechsel` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 169 | `riester-kuendigen-oder-behalten` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 170 | `riester-jahresmitteilung-checkliste` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 171 | `riester-alte-oder-neue-foerderung` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 172 | `altersvorsorgedepot-kinderzulage` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 173 | `altersvorsorgedepot-kinderzulage-elternteil` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1, M8 |
| 174 | `altersvorsorgedepot-teilzeit-elternzeit` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 175 | `altersvorsorgedepot-kindergeld-ende` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 176 | `altersvorsorgedepot-selbststaendige` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 177 | `altersvorsorgedepot-schwankendes-einkommen` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 178 | `altersvorsorgedepot-heilpraktiker` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 179 | `altersvorsorgedepot-oder-ruerup` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 180 | `altersvorsorgedepot-kosten` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 181 | `altersvorsorgedepot-garantie` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1, M8 |
| 182 | `altersvorsorgedepot-etf-sparplan` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1, M8 |
| 183 | `altersvorsorgedepot-steuern` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 184 | `altersvorsorgedepot-geld-entnehmen` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 185 | `altersvorsorgedepot-auszahlung` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1, M8 |
| 186 | `altersvorsorgedepot-anbieterwechsel` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1 |
| 187 | `altersvorsorgedepot-passt-das-zu-mir` | ✅ | ok | ok | ok | ja | nein | /altersvorsorgedepot | M1, M8 |

### C. Blogartikel (16)

| Nr. | Artikel `/blog/…` | Geprüft | Handy 390 px | Desktop | SEO | Leistung zwischendurch | Leistung am Ende | Ziel | Befunde |
|---:|---|:-:|:-:|:-:|---|:-:|:-:|---|---|
| 1 | `hebammen-gesundheitsbudget-erklaeren` | ✅ | ok | ok | ok | ja | ja | /hebammen, /leistungen, /schwangerschaft | M5 |
| 2 | `kassenbonus-schwangerschaft-vorsorge` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen, /schwangerschaft | M5 |
| 3 | `zahnersatz-beitrag-vom-bonus` | ✅ | ok | ok | ok | ja | ja | /leistungen, /zahn | M5 |
| 4 | `krankenkasse-wechseln-laufende-behandlung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | keine |
| 5 | `kassenbonus-was-ist-drin` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M5 |
| 6 | `ikk-classic-bonus-schritt-fuer-schritt` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M5 |
| 7 | `bkv-und-kassenbonus-fuer-arbeitgeber` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /unternehmen | keine |
| 8 | `healio-konzept-fuer-hebammen` | ✅ | ok | ok | ok | ja | ja | /hebammen, /leistungen, /schwangerschaft | M5 |
| 9 | `healio-konzept-fuer-heilpraktiker` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M5 |
| 10 | `healio-konzept-fuer-osteopathen` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M5 |
| 11 | `healio-konzept-fuer-tcm-praxen` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M5 |
| 12 | `krankenhauszusatzversicherung-sportverein-best-ager` | ✅ | ok | ok | ok | ja | ja | /kassenbonus, /leistungen, /stationaer | M5 |
| 13 | `digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M5, N8 |
| 14 | `heilpraktiker-patienten-finanzierung-gesundheitsbudget` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M5, N8 |
| 15 | `gesundheitsbudget-3000-euro` | ✅ | ok | ok | ok | ja | ja | /ambulant, /kassenbonus, /leistungen | M5 |
| 16 | `naturheilkunde-krankenkasse-2026` | ✅ | ok | ok | ok | ja | ja | /ambulant, /leistungen | M5, N5, N8 |

## Prüfumfang und Grenzen

- **Build:** `npm run build` mit Vorab-Rendern aller Seiten, vor und nach den Korrekturen grün (258 vorgerenderte Seiten plus 16 Blogseiten, alle eingebauten Prüfungen bestanden).
- **Lint:** `npm run lint` ohne Meldungen.
- **Tests:** 51 Testskripte. Grün: 47. Rot: `test:ukv-vorsorge` (M6, M15), `test:whatsapp` (M15), `test:kassenboost-bridge` und `test:altersvorsorge-analytics-rendered` (N11). `test:altersvorsorge-vormerkung-rendered` braucht einen laufenden Vorschau-Server und war damit grün.
- **Browser-Durchlauf:** 548 Seitenaufrufe (274 Adressen in zwei Breiten), jede Seite komplett durchgescrollt, Barrierefreiheit mit axe-core (WCAG 2.1 AA) geprüft. Die Prüfwerkzeuge lagen nur in einem temporären Ordner, nichts davon ist im Repository.
- **Inhalte:** alle Quelltexte der deutschen Seiten, 187 Ratgeber, 16 Blogartikel, PDFs und Video-Untertitel auf die Regeln durchsucht; Faktenabgleich zwischen den Artikeln nach Themen (Kassen und Bonus, Ambulant, Zahn, Klinik, Familie, Altersvorsorge). Werte wurden untereinander und mit den Produktseiten verglichen, nicht mit den Originalquellen der Versicherer.
- **Nicht möglich:** Live-Aufruf externer Links und von `app.healio.de` (Netzwerk der Prüfumgebung, siehe N15); Inhalte in Bildern und Videos nur über Untertitel prüfbar.
- **Nichts gepusht auf `main`, nichts zusammengeführt, keine Vercel-Befehle.** Alle Änderungen liegen auf dem Branch und im Entwurfs-PR.
