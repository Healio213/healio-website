# Alle Haupt- und Aktionsseiten mobil geprüft

Stand: 14.10.2026. **66/66 Haupt-/Aktionsrouten bei 390 px geprüft, 13/13 zusätzliche Router-Aliase korrekt**, plus genau eine zusätzliche relevante Schwangerschaftsband-Ansicht bei 767 px. Grundlage: gebauter Vite-preview-Stand auf Port 4832 ohne HMR; Prerender parallel auf 4904. Browser abgeschlossen, Erfassung Exit 0.

Alle 66 Ansichten hatten HTTP 200 und genau eine sichtbare Hauptüberschrift. Keine Bodyüberläufe, doppelten IDs, defekten oder gestreckten Bilder, JavaScript-Laufzeitfehler, fehlgeschlagenen Netzrequests oder mutativen Requests. 44 sichere Aufklapper-Pointerprüfungen und fünf Bandprüfungen bei 390 px bestanden. 19 Noindex-/Aktionsansichten wurden ausschließlich lesend geprüft. Keine Formulare, Anträge, Kontakt-/Gesundheits-/Login-/Löschaktionen oder Token. Nur 25 repräsentative/auffällige Viewportscreenshots, kein Vollseitenarchiv.

Der Pass erfasst bewusst den damaligen stabilen Build. Home/Leistungsübersicht sowie die unten genannten Siegel-/Robotsbefunde werden parallel im Quellstand korrigiert; deren alte Ergebnisse sind **Altstand**, keine Behauptung über den nachfolgenden Build. Wortzahlen sind Bestandserfassung. Artikel und Rechtstexte werden nicht allein wegen ihrer Länge gekürzt.

## Drei konkrete mobile Copy-Befunde

1. **Stationär – offener Bonusblock mit SPU-Modell:** `StationaerBonusBridge` wiederholt die Finanzierung aus `ZweiWegeFinanzierung` und erklärt zusätzlich ein langes Modell direkt vor dem realen Bonusrechner. Mobile Prosa kurz halten und Beispiel/Detailbedingungen im bestehenden Bonusaufklapper erreichbar machen; Bilder und CTA behalten. Root bearbeitet diesen Punkt.
2. **Hebammen – frühe Rollenprosa:** Die proof-Karten erklären die Übergabe an Healio, später folgen Zuständigkeiten und Ablauf erneut. Die frühen Karten brauchen mobil nur ihre kurzen Titel und erhalten ihre FriendlyIcons/Bilder. Die späteren konkreten Abrechnungs-/Versichererrollen sowie der Ablauf bleiben vollständig. Dieser minimale Folgefix ist umgesetzt und in DE/EN390 gezielt bestätigt.
3. **Hebammen – zweite Gesamtbudgeterklärung:** Der frühe Lösungskasten erklärt das 3.000-EUR-Budget bereits, die spätere dunkle Leiste nennt Wert und Bonus-/Tariftrennung nochmals. Großen Wert und Bildbestand behalten, nur die mobile wiederholende Prosa auf den positiven Satz „Tarifliche Erstattung für ergänzende ambulante Leistungen.“ reduzieren. Keine Versicherungszahlen oder Neugeborenenbedingungen ändern. Dieser minimale Folgefix ist umgesetzt und in DE/EN390 gezielt bestätigt.

Der zunächst aus dem inneren Komponentenquelltext abgeleitete SalesAiAssist-Hinweis wurde ausgenommen: Der exportierte Wrapper rendert bei deaktiviertem Voice-Flag null. Er ist kein sichtbarer Copybefund; keine Voice-Aktivierung und kein toter Copyfix.

## Konkrete Band-/Metabefunde und Quellkorrekturen

- **Zahn DE/EN:** vier relevante Originale in zwei getrennten mobilen Bereichen. **Klinik DE/EN:** drei Originale in zwei Bereichen. Die neue gemeinsame Regel war im erfassten Build noch nicht erfüllt. Aktueller Quellstand bestätigt jetzt `mobileWithIkk` oben sowie `sealsInMobileAwardsRow` unten: quellseitig behoben, Browserbelege Altstand.
- **Schwangerschaft 767 px:** Band 727 px, halbe laufende Originalliste nur 394,65625 px; die laufende Animation erzeugte Leerfläche. Der aktuelle `SiegelTicker` wiederholt jetzt alle laufenden Mehrfachlisten, auch ohne forceScroll. Bei drei Originalen entstehen zwei Wiederholungen; der Quellfix ist bestätigt. Keine weitere 767-Browserrunde in diesem Pass.
- **EN-Blog:** HTTP-Quellmeta bereits `noindex, nofollow`, nach Hydration im alten Build `index, follow`. Canonical in beiden Fällen `https://healio.de/en/blog`. Der aktuelle sprachabhängige `SEOHead`-Robotsprop ist bestätigt. HTTP-Quelle und Hydration sind getrennt in `en-blog-meta.json` belegt.

Keine einzelne Originalauszeichnung wurde im erfassten Bestand als animiertes Einzelsiegel gefunden; keine originale Siegeldatei erschien doppelt sichtbar auf derselben Seite. Schwangerschaft und Ambulant hatten bei 390 px bereits jeweils ein gemeinsames Band.

## Optionale Bildhinweise

Sieben starke `object-fit: cover`-Zuschnitte sind separat erfasst: Zahnarzt-Hero, Gründerporträt auf Zahnärzte/About DE/EN, Tier-Hero DE/EN und Lebenshilfe-Hero. Die Proportionen bleiben erhalten; es ist keine Streckung. Hintergrundbilder und Porträtausschnitte können beabsichtigt sein. Das sind Reviewhinweise, keine automatisch erforderliche Gestaltungsschleife.

## Prüfungsumgebung

`/api/altersvorsorge-startinfo` liefert im lokalen Preview HTML-200 statt JSON. Der Previewproxy ist nur für `/api/v1/content` konfiguriert; Blog-/Ratgeberlisten erhielten dort JSON-200. Der Startinfo-Fall ist daher Umgebungsdiagnostik, kein nachgewiesener Produktfehler. Keine API-Antwortinhalte oder Tokens gespeichert.

## Alle 66 erfassten Routen

| Route | Sichtbare H1 | Wörter | Dokumentbreite/Höhe | Bilder | Siegel/Bereiche | Sichere Aufklapper | Befunde im Altstand |
|---|---|---:|---|---:|---|---:|---|
| `/altersvorsorgedepot` | Bis zu 540 EUR im Jahr vom Staat für deine Rente. Plus bis zu 300 EUR je zugeordnetem Kind. | 1098 | 390/13684 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/altersvorsorgedepot/danke` · read-only/noindex | Dein nächster Schritt | 56 | 390/1997 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/` | Mehr aus deiner Krankenkasse holen. | 178 | 390/5219 px | 15 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/unternehmen` | Verwandeln Sie Lohnnebenkosten in Ihr stärkstes Bindungsinstrument für Leistungsträger. | 655 | 390/9826 px | 9 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/kassenboost` | Dein Bonus kann mehr für deine Gesundheit tun. | 839 | 390/10115 px | 5 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/kassenbonus` | Wie viel Geld lässt du jedes Jahr bei deiner Krankenkasse liegen? | 499 | 390/8636 px | 9 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/schwangerschaft` | Schwanger? Laut Satzung sind bis zu 1.155 EUR für dich drin. | 855 | 390/9751 px | 7 | 3/1 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/ambulant` | Bis zu 3.000 EUR für deine Gesundheit. | 540 | 390/9027 px | 17 | 3/1 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/partner` | Wie viele hochwertige Behandlungspläne verlierst du an die Angst vor dem Eigenanteil? | 743 | 390/9791 px | 19 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/hebammen` | Gute Betreuung braucht Zeit. Klär die Kosten frühzeitig. | 1064 | 390/13094 px | 23 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/zahnaerzte` | Damit der Eigenanteil nicht über die Behandlung entscheidet. | 946 | 390/11864 px | 21 | 0/0 | 2 | strong-image-crop (optional), strong-image-crop (optional) |
| `/heilberufe-vorsorge` | Gesundheit, die trägt. Für Menschen und ihre Therapeuten. | 507 | 390/8338 px | 19 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/zahn` | Starker Schutz für deine Zähne. | 753 | 390/10871 px | 20 | 4/2 | 2 | seals-distributed (Quellfix bestätigt) |
| `/stationaer` | Dein Zimmer. Deine Arztwahl. | 1168 | 390/14419 px | 30 | 3/2 | 2 | seals-distributed (Quellfix bestätigt) |
| `/leistungen` | Welcher Schutz passt zu dir? | 133 | 390/4157 px | 4 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/about` | Wir machen Gesundheitskosten planbarer. | 451 | 390/6475 px | 15 | 0/0 | 0 | strong-image-crop (optional) |
| `/kontakt` | Hier erreichst du uns | 129 | 390/3685 px | 5 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/blog` | Healio Ratgeber | 1042 | 390/9021 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/ratgeber` | Ratgeber zu Krankenkasse, Bonus und Zusatzschutz | 1196 | 390/11111 px | 72 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/potenzialanalyse` | Vorsorge-Check für Ihr Unternehmen. | 91 | 390/1808 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/terminvereinbarung` | Termin vereinbaren | 69 | 390/2255 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/confirmation` · read-only/noindex | Hier liegt noch keine bestätigte Anfrage vor. | 46 | 390/910 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/tierkrankenversicherung` | Damit im Ernstfall die Medizin entscheidet: nicht dein Kontostand. | 603 | 390/9251 px | 9 | 0/0 | 2 | strong-image-crop (optional) |
| `/presse` | Presse und Fakten | 383 | 390/5495 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/impressum` | Impressum | 103 | 390/2627 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/agb` | Allgemeine Geschäftsbedingungen für Versicherungsmakler | 827 | 390/8666 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/datenschutz` | Datenschutzerklärung | 4379 | 390/36710 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/erstinformation` | Erstinformation gemäß §§ 15 und 16 VersVermV | 487 | 390/8059 px | 6 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en` | Get more from your health fund. | 193 | 390/4810 px | 15 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/companies` | Turn employment costs into your strongest tool for retaining top performers. | 658 | 390/8366 px | 9 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/kassenboost` | Your bonus can do more for your health. | 925 | 390/9905 px | 5 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/health-insurance-bonus` | How much money do you leave with your health fund every year? | 523 | 390/7790 px | 9 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/outpatient` | Up to EUR 3,000 for your health. | 594 | 390/8475 px | 17 | 3/1 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/partner` | How many high-quality treatment plans do you lose to fear of out-of-pocket costs? | 777 | 390/9200 px | 19 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/healthcare-professionals-protection` | Health that holds. For people and their therapists. | 589 | 390/8413 px | 19 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/dental` | Strong cover for your teeth. | 742 | 390/9438 px | 19 | 4/2 | 2 | seals-distributed (Quellfix bestätigt) |
| `/en/inpatient` | Your room. Your choice of doctor. | 1302 | 390/13609 px | 30 | 3/2 | 2 | seals-distributed (Quellfix bestätigt) |
| `/en/services` | Which cover fits your needs? | 144 | 390/4054 px | 4 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/about` | We make healthcare costs easier to plan. | 518 | 390/6411 px | 15 | 0/0 | 0 | strong-image-crop (optional) |
| `/en/contact` | Get in Touch | 141 | 390/3709 px | 5 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/initial-information` | Initial information pursuant to §§ 15 and 16 VersVermV | 580 | 390/7794 px | 6 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/blog` · read-only/noindex | Healio Guide | 1076 | 390/9044 px | 0 | 0/0 | 0 | guard-noindex-missing (Quellfix bestätigt) |
| `/en/midwives` | Good care takes time. Clarify the costs early. | 1148 | 390/11867 px | 23 | 0/0 | 2 | keine technischen/strukturellen Auffälligkeiten |
| `/en/appointment` | Book an Appointment | 73 | 390/2318 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/potential-analysis` | Benefits review for your company. | 98 | 390/1731 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/pet-insurance` | So medicine decides in an emergency – not your bank balance. | 682 | 390/8820 px | 9 | 0/0 | 2 | strong-image-crop (optional) |
| `/en/legal-notice` | Legal Notice | 118 | 390/2678 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/terms` | General Terms and Conditions for Insurance Brokers | 839 | 390/8657 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/privacy` | Privacy Policy | 4887 | 390/33037 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/partner/leitfaden` | Der Therapieabbruch-Stopper: So machen deine Selbstzahler die Behandlungsserie zu Ende | 246 | 390/3650 px | 3 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/partner/leitfaden/danke` · read-only/noindex | Dein Leitfaden ist da | 113 | 390/2550 px | 4 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/lebenshilfe` · read-only/noindex | Kurs auf einen glücklichen Ruhestand. | 732 | 390/8967 px | 5 | 0/0 | 0 | strong-image-crop (optional) |
| `/unternehmen/vorsorge-rechner` · read-only/noindex | Was 676 EUR Vorsorge für Ihr Unternehmen wirklich bedeuten. | 987 | 390/11756 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/companies/pension-calculator` · read-only/noindex | What a EUR 676 pension contribution really means for your company. | 1165 | 390/11441 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/zahnaerzte/praxis-checkliste` · read-only/noindex | Die fünf Grenzen für sachliche Patienteninformation. | 170 | 390/3331 px | 2 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/unternehmen/team-vorteil` · read-only/noindex | Das beste Geschenk an Ihre Belegschaft kostet Sie keinen Cent. | 380 | 390/4567 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/heilberufe-vorsorge/praxis-material` · read-only/noindex | Die Lücke in Ihrem Terminkalender hat selten mit Ihnen zu tun. | 476 | 390/4937 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/zahnaerzte/praxis-material` · read-only/noindex | Der Heil- und Kostenplan liegt auf dem Tisch. Danach wird es still. | 491 | 390/5025 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/konto-loeschen` · read-only/noindex | Konto löschen | 264 | 390/3620 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/app-bestaetigt` · read-only/noindex | E-Mail bestätigt | 63 | 390/1009 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/reset-password` · read-only/noindex | Passwort zurücksetzen | 59 | 390/1024 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/confirmation` · read-only/noindex | There is no confirmed inquiry for this page yet. | 51 | 390/864 px | 0 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/tiktok` · read-only/noindex | Privatpatient. Ohne privat versichert zu sein. | 166 | 390/1580 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/tiktok` · read-only/noindex | Private patient. Without private insurance. | 185 | 390/1611 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/instagram` · read-only/noindex | Privatpatient. Ohne privat versichert zu sein. | 166 | 390/1580 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |
| `/en/instagram` · read-only/noindex | Private patient. Without private insurance. | 185 | 390/1611 px | 1 | 0/0 | 0 | keine technischen/strukturellen Auffälligkeiten |

## Öffentliche Router-Aliase

Alle 13 expliziten Navigate-Aliase fehlen im kanonischen Manifest, wurden zusätzlich per direktem GET ohne Query/Token gelesen und führten zum erwarteten Routerziel.

| Alias | Ziel | Prüfung |
|---|---|---|
| `/betriebliche-vorsorge` | `/unternehmen` | korrekt |
| `/bav-bkv` | `/unternehmen` | korrekt |
| `/heilpraktiker-vorsorge` | `/heilberufe-vorsorge` | korrekt |
| `/osteopathen-vorsorge` | `/heilberufe-vorsorge` | korrekt |
| `/praxis-absicherung` | `/heilberufe-vorsorge` | korrekt |
| `/heilpraktiker-zusatzversicherung` | `/ambulant` | korrekt |
| `/Ambulante-zusatzversicherung` | `/ambulant` | korrekt |
| `/healio-zahnzusatz` | `/zahn` | korrekt |
| `/klinik-upgrade` | `/stationaer` | korrekt |
| `/en/corporate-benefits` | `/en/companies` | korrekt |
| `/en/healio-dental` | `/en/dental` | korrekt |
| `/en/hospital-upgrade` | `/en/inpatient` | korrekt |
| `/auth/confirmed` | `/app-bestaetigt` | korrekt |

Zusätzlich inventarisiert: `/en/blog/:slug` → `/blog/:slug`, außerdem Entfernung eines abschließenden Slash unter Erhalt bestehender Query/Hash. Die dynamischen Muster wurden nicht mit persönlichen Parametern aufgerufen. `/ratgeber/altersvorsorgedepot` gehört in diesem Manifest zur 203er Ratgebergruppe und wird von der Artikelprüfung mitgeführt.

Belege unter `alle-seiten-hauptseiten/`: `metrics.json`, `inventory.json`, `aliases.json`, `band-cases.json`, `en-blog-meta.json`, `copy-review.json`, `VERIFIKATION.json`, `browser-hauptseiten.mjs` und repräsentative/auffällige Screenshots. Der Hauptpass ist vollständig. Neue minimale Quellkorrekturen werden gezielt bestätigt; dieser stabile Altstandpass wird nicht wiederholt.

Hebammen-Folgefix abgeschlossen: nur die drei erlaubten Dateien geändert, gezieltes ESLint/DE-EN-Vertrag/diffcheck grün und 12/12 Checks in zwei engen DE/EN390-Ansichten. Bilder, großer Budgetwert, bestehende Zahlen, spätere Rollen und Neugeborenenbedingungen erhalten. Siehe `HEBAMMEN-KURZCOPY-PRÜFUNG.md`. Der 66-Seiten-Pass selbst wurde nicht wiederholt.
