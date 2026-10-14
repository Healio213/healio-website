# Mobile Prüfung: Artikel A

Stand: 14.10.2026. Geprüft auf dem stabilen gebauten Stand unter `http://127.0.0.1:4832`, ohne HMR.

**Ergebnis: 102 von 102 zugewiesenen Routen geprüft. Keine bestätigten mobilen Darstellungsfehler in diesem Teilbestand.**

Der Bestand umfasst die Artikel-Indizes 0–101 aus `/private/tmp/healio-mobile-alle-seiten-20261014-routes.json` nach Filter `^/(?:en/)?(?:ratgeber|blog)/`: 101 Artikel und den eigenständigen Hub `/ratgeber/altersvorsorgedepot`. Artikeltexte wurden als bewusst ausführliche Inhalte geprüft und nicht umgeschrieben.

## Prüfung

- Chrome Headless, 390 × 844 px, Touch-Viewport und reduzierte Bewegung. Alle Routen tatsächlich geladen, die Seiten bis zum Ende gescrollt und Lazy-Bilder nachgeladen.
- 102 HTTP-200-Antworten; auf jeder Route genau eine sichtbare H1 und tatsächlicher Hauptinhalt.
- Kein horizontaler Seiten- oder H1-Überlauf und kein bestätigter sichtbarer Überlauf durch lange Wörter.
- 1012 dargestellte Bildinstanzen über alle Routen geprüft: keine defekten oder verzerrten Bilder. Keine Siegelbilder in diesem Teilbestand.
- Kein wiederholtes DOM-ID-Vorkommen, keine JavaScript-Ausnahme und keine fehlgeschlagene Netzwerkantwort/-anfrage im Lauf.
- Artikel-Fließtext und längere Listenabsätze liegen zwischen 14 und 22 px. Keine gemessenen längeren Fließtext-/Listenstellen unter 14 px.
- Kein Formular abgesendet, kein Antrag und kein externer Link geöffnet; nur die Ablehnung optionaler Cookies wurde verwendet.

## Einordnung von Messwarnungen

Die Rohmessung enthält 122 Text-Range-Warnungen an `sr-only`-Tabellencaptions. Diese Captions sind visuell auf 1 px beschnitten; die Range-API liefert dennoch die volle unsichtbare Textbreite. Die Seitenscrollbreite bleibt 390 px. Diese Warnungen sind keine Produktfehler. Die geprüften Metriken behalten die Rohwarnungen zur Nachvollziehbarkeit getrennt.

Der Hub an Index 0 wurde zusätzlich über den vollständigen Hubinhalt gemessen: 762 Wörter mit H1, Themenwahl, 24 Ratgeberkarten und passenden Zielwegen. Ein fehlender Artikel-Wrapper oder die kurze erste Ratgeberkarte wurde nicht als Mangel gewertet.

Ein wiederholter UI-Text trat auf `/ratgeber/krankenkassen-bonus-zusatzversicherung` auf: drei Links „Jetzt Kasse prüfen“. Das sind wiederholte Zielwege in einem langen Artikel, kein ungültiges oder kaputtes Element. Eine spätere Textoptimierung kann diese Stelle gezielt prüfen; daraus wurde kein Fix abgeleitet.

Es musste keine Preview-API-Abweichung als Produktfehler behandelt werden; die tatsächlichen Artikelinhalte waren auf allen Routen vorhanden.

## Nachweise

- [Prüfmetriken mit Einordnung](alle-seiten-artikel-a/reviewed-metrics.json)
- [Rohmetriken](alle-seiten-artikel-a/metrics.json)
- [Vollständige Hubmessung](alle-seiten-artikel-a/hub-metrics.json)
- [Reproduzierbarer Prüflauf](alle-seiten-artikel-a/browser-artikel-a.mjs)
- 15 Ausschnitt-Screenshots im Nachweisordner, keine Vollseitenscreenshots je Route. Die Anfangsansichten des Blogartikels zu Heilpraktikerkosten und des AOK-Ratgebers wurden zusätzlich visuell geprüft.

## Routenabdeckung

| Index | Route | Ergebnis |
|---:|---|---|
| 0 | `/ratgeber/altersvorsorgedepot` | OK (Hub) |
| 1 | `/blog/heilpraktiker-kosten-guide-2026` | OK |
| 2 | `/blog/heilpraktiker-zusatzversicherung-vergleich-2026` | OK |
| 3 | `/blog/ikk-classic-bonus-700-euro` | OK |
| 4 | `/blog/osteopathie-krankenkasse-2026` | OK |
| 5 | `/blog/naturheilkunde-krankenkasse-2026` | OK |
| 6 | `/blog/gesundheitsbudget-3000-euro` | OK |
| 7 | `/blog/heilpraktiker-patienten-finanzierung-gesundheitsbudget` | OK |
| 8 | `/blog/digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung` | OK |
| 9 | `/blog/heilpraktiker-kosten-gkv-erstattung-healio` | OK |
| 10 | `/blog/zahnzusatzversicherung-trotz-angeratener-behandlung` | OK |
| 11 | `/blog/krankenhauszusatzversicherung-sportverein-best-ager` | OK |
| 12 | `/blog/healio-konzept-fuer-heilpraktiker` | OK |
| 13 | `/blog/healio-konzept-fuer-osteopathen` | OK |
| 14 | `/blog/healio-konzept-fuer-tcm-praxen` | OK |
| 15 | `/blog/healio-konzept-fuer-hebammen` | OK |
| 16 | `/blog/kassenbonus-was-ist-drin` | OK |
| 17 | `/blog/krankenkasse-wechseln-laufende-behandlung` | OK |
| 18 | `/blog/heilpraktiker-kosten-bonus-finanziert` | OK |
| 19 | `/blog/zahnersatz-beitrag-vom-bonus` | OK |
| 20 | `/blog/ikk-classic-bonus-schritt-fuer-schritt` | OK |
| 21 | `/blog/bkv-und-kassenbonus-fuer-arbeitgeber` | OK |
| 22 | `/blog/kassenbonus-schwangerschaft-vorsorge` | OK |
| 23 | `/blog/hebammen-gesundheitsbudget-erklaeren` | OK |
| 24 | `/ratgeber/schwangerschaft-worauf-achten` | OK |
| 25 | `/ratgeber/bonusprogramm-krankenkasse` | OK |
| 26 | `/ratgeber/ikk-classic-bonusprogramm-2026` | OK |
| 27 | `/ratgeber/mkk-bonusprogramm-2026` | OK |
| 28 | `/ratgeber/aok-bonusprogramm-2026` | OK |
| 29 | `/ratgeber/tk-bonusprogramm-2026` | OK |
| 30 | `/ratgeber/barmer-bonusprogramm-2026` | OK |
| 31 | `/ratgeber/krankenkassen-bonus-zusatzversicherung` | OK |
| 32 | `/ratgeber/zusatzbeitrag-krankenkasse-2026` | OK |
| 33 | `/ratgeber/krankenkasse-wechseln` | OK |
| 34 | `/ratgeber/aok-zuzahlungsbefreiung` | OK |
| 35 | `/ratgeber/zusatzbeitrag-rentner` | OK |
| 36 | `/ratgeber/praeventionskurs-krankenkasse` | OK |
| 37 | `/ratgeber/guenstigste-krankenkasse` | OK |
| 38 | `/ratgeber/mindestbeitrag-krankenkasse` | OK |
| 39 | `/ratgeber/dak-zuzahlungsbefreiung` | OK |
| 40 | `/ratgeber/krankenkasse-studenten` | OK |
| 41 | `/ratgeber/dak-bonusprogramm-2026` | OK |
| 42 | `/ratgeber/krankenkasse-zuschuss-fitnessstudio` | OK |
| 43 | `/ratgeber/zuzahlungsbefreiung-chronisch-krank` | OK |
| 44 | `/ratgeber/ikk-zuzahlungsbefreiung` | OK |
| 45 | `/ratgeber/zuzahlung-medikamente` | OK |
| 46 | `/ratgeber/krankenkasse-wechseln-nachteile` | OK |
| 47 | `/ratgeber/zuzahlungsbefreiung-schwerbehinderung` | OK |
| 48 | `/ratgeber/wechselpraemie-krankenkasse` | OK |
| 49 | `/ratgeber/hkk-bonusprogramm-2026` | OK |
| 50 | `/ratgeber/hek-bonusprogramm-2026` | OK |
| 51 | `/ratgeber/abnehmen-krankenkasse` | OK |
| 52 | `/ratgeber/beitragserhoehung-krankenkasse` | OK |
| 53 | `/ratgeber/mobil-krankenkasse-bonusprogramm` | OK |
| 54 | `/ratgeber/zuzahlungsbefreiung` | OK |
| 55 | `/ratgeber/krankenversicherung-beitrag-2026` | OK |
| 56 | `/ratgeber/tk-zuzahlungsbefreiung` | OK |
| 57 | `/ratgeber/barmer-zuzahlungsbefreiung` | OK |
| 58 | `/ratgeber/zuzahlungsbefreiung-rentner` | OK |
| 59 | `/ratgeber/bkk-firmus-bonusprogramm-2026` | OK |
| 60 | `/ratgeber/krankenkasse-wechseln-rentner` | OK |
| 61 | `/ratgeber/zahnersatz-kosten` | OK |
| 62 | `/ratgeber/professionelle-zahnreinigung-kosten` | OK |
| 63 | `/ratgeber/zahnimplantat-kosten` | OK |
| 64 | `/ratgeber/wurzelbehandlung-kosten` | OK |
| 65 | `/ratgeber/zahnkrone-kosten` | OK |
| 66 | `/ratgeber/bonusheft-zahnarzt` | OK |
| 67 | `/ratgeber/zahnzusatzversicherung-ohne-wartezeit` | OK |
| 68 | `/ratgeber/zahnzusatzversicherung-fehlender-zahn` | OK |
| 69 | `/ratgeber/zahnzusatzversicherung-lohnt-sich` | OK |
| 70 | `/ratgeber/ukv-zahnzusatzversicherung` | OK |
| 71 | `/ratgeber/bayerische-zahnzusatzversicherung` | OK |
| 72 | `/ratgeber/aok-zahnzusatzversicherung` | OK |
| 73 | `/ratgeber/dak-zahnreinigung` | OK |
| 74 | `/ratgeber/zahnbruecke-kosten` | OK |
| 75 | `/ratgeber/zahnprothese-kosten` | OK |
| 76 | `/ratgeber/zahnfuellung-kosten` | OK |
| 77 | `/ratgeber/parodontitis-behandlung-kosten` | OK |
| 78 | `/ratgeber/zahnersatz-moeglichkeiten` | OK |
| 79 | `/ratgeber/zahnersatz-haertefall` | OK |
| 80 | `/ratgeber/zahnzusatzversicherung-vergleich` | OK |
| 81 | `/ratgeber/aok-zahnreinigung` | OK |
| 82 | `/ratgeber/tk-zahnreinigung` | OK |
| 83 | `/ratgeber/barmer-zahnreinigung` | OK |
| 84 | `/ratgeber/tk-zahnzusatzversicherung` | OK |
| 85 | `/ratgeber/zahnzusatzversicherung-kosten` | OK |
| 86 | `/ratgeber/zahnzusatzversicherung-laufende-behandlung` | OK |
| 87 | `/ratgeber/professionelle-zahnreinigung-sinnvoll` | OK |
| 88 | `/ratgeber/zahnreinigung-wie-oft` | OK |
| 89 | `/ratgeber/weisheitszaehne-ziehen-kosten` | OK |
| 90 | `/ratgeber/vollnarkose-zahnarzt-kosten` | OK |
| 91 | `/ratgeber/barmer-zahnzusatzversicherung` | OK |
| 92 | `/ratgeber/zahnkrone-rausgefallen` | OK |
| 93 | `/ratgeber/dak-zahnzusatzversicherung` | OK |
| 94 | `/ratgeber/ikk-zahnreinigung` | OK |
| 95 | `/ratgeber/zahnersatz-guenstig` | OK |
| 96 | `/ratgeber/heil-und-kostenplan` | OK |
| 97 | `/ratgeber/zahnzusatzversicherung-senioren` | OK |
| 98 | `/ratgeber/implantat-oder-bruecke` | OK |
| 99 | `/ratgeber/ikk-zahnzusatzversicherung` | OK |
| 100 | `/ratgeber/zahnzusatzversicherung-kinder` | OK |
| 101 | `/ratgeber/zahnspange-kosten` | OK |

Produktdateien wurden in diesem Prüflauf nicht geändert. Medizinische, finanzielle und redaktionelle Aussagen wurden nicht neu bewertet oder umgeschrieben.
