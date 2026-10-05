/**
 * Ratgeberartikel AOK Bonusprogramm 2026. Organischer Ratgeber, keine
 * bezahlte Werbung: Die Seite soll über die Google-Suche gefunden und in
 * KI-Antworten zitiert werden. Kein interner Button (internalCta), weil nur
 * die drei Artikel aus INTERNAL_BUTTONS in scripts/check-ratgeber-contract.mjs
 * einen tragen dürfen. Healios Angebot steht nur als Textlinks am Ende des
 * Abschnitts "zusatzversicherung".
 *
 * Quellen (einzige Faktenquelle, nur gelesen): die elf KassenBoost-Belegketten
 * GKV-Vergleichskampagne/website/app/
 *   aok-bayern-bonus-2026.server.ts            (Satzung 71. Nachtrag ab 27.02.2026, Anlage 3)
 *   aok-bremen-bremerhaven-bonus-2026.server.ts (Satzung 55. Änderung ab 01.04.2026, Anlage 2)
 *   aok-bw-bonus-2026.server.ts                (Satzung 97. Änderung, Ausführungsbestimmungen Mai 2025)
 *   aok-hessen-bonus-2026.server.ts            (Satzung Stand 01.07.2026, Ausführungsbestimmungen BONUS fit)
 *   aok-ni-bonus-2026.server.ts                (Satzung 142. Änderung, Anhang zu § 13 AOK Aktiv-Bonus)
 *   aok-nordost-bonus-2026.server.ts           (Satzung 52. Nachtrag ab 01.07.2026, Teilnahmebedingungen ab 01.07.2024)
 *   aok-nw-bonus-2026.server.ts                (Satzung 41. Nachtrag, Anhang 3 ab 01.01.2026)
 *   aok-plus-bonus-2026.server.ts              (Satzung Stand 01.02.2025, Teilnahmebedingungen Juni 2026)
 *   aok-rh-bonus-2026.server.ts                (Satzung 18. Nachtrag ab 01.07.2026, Anhang 3)
 *   aok-rps-bonus-2026.server.ts               (Satzung ab 01.07.2026, Infoblatt, Foto-Coupon 2026)
 *   aok-sachsen-anhalt-bonus-2026.server.ts    (Satzung 52. Änderung, Tarifbedingungen, Produktseite)
 * Alle Fundstellen laut Belegketten am 26.08.2026 aus den Originalquellen
 * geprüft. Satzung ist maßgeblich; wo der Katalog nur in kasseneigenen
 * Dokumenten steht (BW, Hessen, Nordost, RPS, Sachsen-Anhalt), sagt der Text
 * das und verweist auf die aktuelle Fassung.
 *
 * Stand des Artikels: 05.10.2026.
 *
 * Suchbegriffe (Semrush DE, 05.10.2026, Suchen im Monat): aok bonusprogramm
 * 6.600; bonusprogramm aok 2.400; bonusprogramm der aok 1.300; aok bayern
 * bonusprogramm 1.300; bonusprogramm aok plus 880; aok bonus 880; aok
 * bonusheft 720; aok bonusprogramm bw 720; aok prämienprogramm 590; aok
 * niedersachsen bonusprogramm 480; aok bonusprogramme 210; bonuszahlung aok
 * 210; aok bw bonusprogramm 170; prämienprogramm aok 170; prämienprogramm aok
 * bayern 140.
 *
 * Bewusste Festlegungen, alle aus den Belegketten übernommen:
 *   - Kernantwort im Vorspann: Es gibt nicht DAS AOK-Bonusprogramm, sondern
 *     elf regionale Programme.
 *   - Zuschuss zur privaten Zusatzversicherung nur bei AOK PLUS (Nennung im
 *     PLUS Leistungsverzeichnis der Teilnahmebedingungen, Zuschussweg und
 *     Faktor in § 19a Abs. 7 der Satzung) und AOK Rheinland/Hamburg (Vital+,
 *     Anhang 3 Ziff. 6.6 als Satzungsbestandteil). Bei den übrigen neun
 *     steht "regeln ihre Satzungen nicht", nie "bietet die Kasse nicht an".
 *     Ob ein bestimmter Tarif anerkannt wird, belegt keine Datei; der Text
 *     sagt deshalb: Das entscheidet die Kasse.
 *   - Beispielwerte sind die Szenariowerte der Belegketten (Referenzperson
 *     38 Jahre, weiblich, zwei Zahntermine, Check-up, eine Impfung, eine
 *     Mitgliedschaft, ein Präventionskurs, Sport ohne belegte
 *     Trainingshäufigkeit). Werte "mit erfüllter Auflage" nur dort, wo die
 *     Datei sie selbst nennt (Bremen, NordWest, RPS).
 *   - Kein Satz der Art "kein Jahreshöchstbetrag": liest sich wie "ohne
 *     Obergrenze" (Sperrliste). Genannt wird nur der echte Deckel der AOK
 *     Sachsen-Anhalt von 200 EUR.
 *   - Werbewert "bis zu 225 EUR" der AOK BW nur mit der Erklärung der Datei
 *     (Summe der Erwachsenentabelle). Der Nordost-Werbewert "bis zu 390 EUR"
 *     ist laut Datei nicht satzungsgedeckt und wird nicht genannt.
 *   - Prämienprogramm: AOK Bayern § 13 endete zum 31.12.2024, ProFit der AOK
 *     BW existiert 2026 nicht mehr, alte NordWest-Datei Stand 2018 mit
 *     Prämienpunkten ist abgeschafft. Sachprämien: keine der Bonusregelungen.
 *   - Gesundheitskonten (BW § 14, Hessen § 12f, Sachsen-Anhalt § 11) sind
 *     Erstattungsdeckel, kein Bonus; im Text als solche benannt.
 *   - Zusatzbeiträge, Steuerfragen und Bearbeitungszeiten stehen nicht für
 *     alle elf Kassen in den Belegketten und sind deshalb weggelassen.
 *   - Brücke zu Kassen mit zweckgebundenem Zuschuss über den Ratgeber IKK
 *     classic (dreifacher Zuschuss, Vorlage) und kassenboost.de.
 *
 * 05.10.2026: Abschnitt tipp-ikk-classic (Unser Tipp mit Gegenrechnung des
 * Zusatzbeitrags) vor den Fristen. Beleg: KassenBoost-Prüfung IKK classic gegen
 * den Markt, Zusatzbeiträge aus website/app/funds.ts, Stand 05.10.2026. Frank
 * 05.10.2026: kein Hinweis auf eine Zusammenarbeit mit der IKK classic.
 */

export const article = {
  slug: 'aok-bonusprogramm-2026',
  kind: 'ratgeber',

  metaTitle: 'AOK Bonusprogramm 2026: alle 11 AOKs im Vergleich | Healio',
  metaDescription:
    'AOK Bonus 2026: Jede der elf AOKs hat ein eigenes Programm. Beträge, Bonusheft, Fristen und wo der Bonus eine Zusatzversicherung mitfinanzieren kann.',

  publishedAt: '2026-10-05',
  publishedAtLabel: '5. Oktober 2026',
  updatedAt: '2026-10-05',
  updatedAtLabel: '5. Oktober 2026',
  readingTimeMinutes: 18,

  listTitle: 'AOK Bonusprogramm 2026: alle elf AOKs mit Beträgen, Bonusheft und Fristen',
  listTeaser:
    'Welche AOK für dich zuständig ist, was sie je Maßnahme zahlt, bis wann du einreichst und wo der Bonus als Zuschuss in eine Zusatzversicherung fließen kann.',

  headline:
    'AOK Bonusprogramm 2026: alle elf AOKs, ihre Beträge, Fristen und wo der Bonus eine Zusatzversicherung mitfinanzieren kann',
  lead:
    'Ein einheitliches AOK-Bonusprogramm gibt es nicht. Hinter dem Namen AOK stehen elf regionale Krankenkassen, und jede hat 2026 ein eigenes Bonusprogramm mit eigenen Beträgen, Fristen und Nachweiswegen; welches für dich gilt, hängt davon ab, bei welcher AOK du versichert bist. Neun AOKs zahlen den Bonus als Geld, nur die AOK PLUS (Sachsen, Thüringen) und die AOK Rheinland/Hamburg (Rheinland, Hamburg) bieten wahlweise einen zweckgebundenen Zuschuss, der laut ihren Bonusregeln auch private Zusatzversicherungen umfassen kann. Wie viel zusammenkommt, hängt von deinen Maßnahmen und deiner AOK ab.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Es gibt elf AOK-Bonusprogramme.',
              text: 'Jede AOK ist nur in ihrem Gebiet wählbar und regelt ihren Bonus in der eigenen Satzung. Beträge der AOK eines anderen Bundeslands gelten für dich nicht.',
            },
            {
              lead: 'Meistens gibt es Geld.',
              text: 'Neun AOKs zahlen den Bonus für Erwachsene ausschließlich als Geld aufs Konto. Je Maßnahme sind es je nach AOK meist 5 bis 30 EUR, einzelne Positionen wie Sport mit Auflagen bringen mehr.',
            },
            {
              lead: 'Zuschuss für die Zusatzversicherung nur bei zwei AOKs.',
              text: 'Die AOK PLUS zahlt den Zuschuss in doppelter Höhe des Geldbonus, die AOK Rheinland/Hamburg im Modell Vital+ 20 EUR je Maßnahme. Beide nennen private Zusatzversicherungen und zahlen höchstens, was du nachweislich bezahlt hast.',
            },
            {
              lead: 'Gleiche Maßnahmen, sehr unterschiedliche Beträge.',
              text: 'Für zwei Zahnarzttermine, Check-up, Impfung, Sport und einen Präventionskurs ergeben die Bonusregeln 2026 zwischen 20 EUR (Rheinland-Pfalz/Saarland) und 100 EUR Zuschuss (Rheinland/Hamburg). Das sind Beispielwerte, die Höhe hängt von deinen Maßnahmen und deiner AOK ab.',
            },
            {
              lead: 'Fristen von Februar bis Dezember 2027.',
              text: 'Die AOK Baden-Württemberg will die Nachweise für 2026 bis 28.02.2027, die meisten AOKs bis 31.03.2027, Niedersachsen und Sachsen-Anhalt bis 30.06.2027, Rheinland/Hamburg bis 31.12.2027.',
            },
            {
              lead: 'Ein Prämienprogramm mit Sachprämien gibt es 2026 nicht.',
              text: 'Das frühere Prämienprogramm der AOK Bayern endete laut Satzung zum 31.12.2024.',
            },
          ],
        },
      ],
    },
    {
      id: 'zustaendigkeit',
      heading: 'Welche AOK ist für dich zuständig?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hinter dem Namen AOK stehen elf eigenständige Krankenkassen. Jede ist nur in ihrem Gebiet wählbar, und ihr Bonusprogramm steht in ihrer eigenen Satzung. Welche AOK deine ist, steht auf deiner Gesundheitskarte. Nach Bundesland sieht die Zuständigkeit so aus:',
        },
        {
          type: 'list',
          items: [
            { lead: 'Baden-Württemberg:', text: 'AOK Baden-Württemberg' },
            { lead: 'Bayern:', text: 'AOK Bayern' },
            { lead: 'Berlin, Brandenburg und Mecklenburg-Vorpommern:', text: 'AOK Nordost' },
            { lead: 'Bremen und Bremerhaven:', text: 'AOK Bremen/Bremerhaven' },
            { lead: 'Hamburg:', text: 'AOK Rheinland/Hamburg' },
            { lead: 'Hessen:', text: 'AOK Hessen' },
            { lead: 'Niedersachsen:', text: 'AOK Niedersachsen' },
            { lead: 'Nordrhein-Westfalen, Rheinland (Regierungsbezirke Düsseldorf und Köln):', text: 'AOK Rheinland/Hamburg' },
            { lead: 'Nordrhein-Westfalen, Westfalen-Lippe (Regierungsbezirke Arnsberg, Detmold und Münster):', text: 'AOK NordWest' },
            { lead: 'Rheinland-Pfalz und Saarland:', text: 'AOK Rheinland-Pfalz/Saarland' },
            { lead: 'Sachsen und Thüringen:', text: 'AOK PLUS' },
            { lead: 'Sachsen-Anhalt:', text: 'AOK Sachsen-Anhalt' },
            { lead: 'Schleswig-Holstein:', text: 'AOK NordWest' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Nordrhein-Westfalen teilen sich also zwei AOKs mit sehr unterschiedlichen Programmen. Zwischen allen elf liegen große Unterschiede bei den Beträgen, den Regeln für Sport und den Fristen.',
        },
      ],
    },
    {
      id: 'ueberblick',
      heading: 'AOK-Bonusprogramme 2026 im Überblick',
      blocks: [
        {
          type: 'table',
          caption: 'Die elf AOK-Bonusprogramme 2026',
          head: ['AOK', 'Region', 'Programm', 'Auszahlung', 'Zuschuss für private Zusatzversicherung'],
          rows: [
            ['AOK Baden-Württemberg', 'Baden-Württemberg', 'AOK-Bonusprogramm', 'Geld, Eurobeträge je Maßnahme', 'nein'],
            ['AOK Bayern', 'Bayern', 'AOK-Bonusprogramm', 'Geld, 100 Punkte = 1 EUR', 'nein'],
            ['AOK Bremen/Bremerhaven', 'Bremen, Bremerhaven', 'AOK-Bonusprogramm', 'Geld, 100 Punkte = 1 EUR', 'nein'],
            ['AOK Hessen', 'Hessen', 'BONUS fit', 'Geld, 1 Punkt = 1 EUR', 'nein'],
            ['AOK Niedersachsen', 'Niedersachsen', 'AOK Aktiv-Bonus', 'Geld, 1 Punkt = 1 EUR', 'nein'],
            ['AOK Nordost', 'Berlin, Brandenburg, Mecklenburg-Vorpommern', 'Bonusprogramm der AOK Nordost', 'Geld, 100 Punkte = 1 EUR', 'nein'],
            ['AOK NordWest', 'Schleswig-Holstein, Westfalen-Lippe', 'AOK-Bonusprogramm', 'Geld, Eurobeträge je Maßnahme', 'nein'],
            ['AOK PLUS', 'Sachsen, Thüringen', 'AOK PLUS Bonusprogramm', 'Geld oder Zuschuss, 100 Punkte = 1 EUR bzw. 2 EUR', 'ja, laut Teilnahmebedingungen'],
            ['AOK Rheinland/Hamburg', 'Rheinland, Hamburg', 'AOK-Fit+ oder AOK-Vital+', 'Geld (Fit+) oder Zuschuss (Vital+)', 'ja, im Vital+'],
            ['AOK Rheinland-Pfalz/Saarland', 'Rheinland-Pfalz, Saarland', 'AOK-Bonusprogramm', 'Geld, 100 Punkte = 1 EUR', 'nein'],
            ['AOK Sachsen-Anhalt', 'Sachsen-Anhalt', 'AOK-Gesundheitsbonus', 'Geld, 1 Punkt = 1 EUR, höchstens 200 EUR im Jahr', 'nein'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Wo nein steht, regelt die Satzung für das Bonusprogramm der Erwachsenen keinen zweckgebundenen Zuschuss; die Kasse zahlt den Bonus als Geld. Gemeinsam haben alle elf Programme die Grundlage in § 65a SGB V, das Kalenderjahr als Bonusjahr und den Anspruch über Nachweise, etwa die Bestätigung von Arztpraxis, Kursleitung, Verein oder Studio.',
        },
      ],
    },
    {
      id: 'hoehe',
      heading: 'Wie viel Bonus zahlt die AOK 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt von deiner AOK und deinen Maßnahmen ab. Zum Vergleich ist für alle elf AOKs derselbe Beispielkorb einer 38-jährigen Versicherten nach den Bonusregeln 2026 durchgerechnet: zwei Zahnarzttermine, ein Check-up, eine Impfung, eine Mitgliedschaft in Sportverein oder Studio und ein Präventionskurs. Jede AOK zahlt davon nur, was ihr Katalog vorsieht; Sport zählt nur dort, wo keine nachgewiesene Trainingshäufigkeit verlangt wird.',
        },
        {
          type: 'table',
          caption: 'Beispielkorb 2026 je AOK',
          head: ['AOK', 'Beispielwert', 'Was davon zählt'],
          rows: [
            ['AOK Rheinland/Hamburg', '90 EUR Geld (Fit+) oder 100 EUR Zuschuss (Vital+)', 'zwei Zahntermine, Check-up, Impfung, Kurs; Sport nur mit Trainingshäufigkeit'],
            ['AOK Bremen/Bremerhaven', '70 EUR', 'zwei Zahntermine, Check-up, Impfung; Sport nur mit Aktivitätsnachweis, kein Präventionskurs im Katalog'],
            ['AOK Hessen', '60 EUR', 'ein Zahntermin, Check-up, Impfung, Mitgliedschaft, ein Kurs'],
            ['AOK Sachsen-Anhalt', '60 EUR', 'ein Zahntermin, Check-up, Impfung, Sport, ein Gesundheitsangebot'],
            ['AOK Nordost', '45 EUR', 'ein Zahntermin, Impfung, Mitgliedschaft; Check-up und Präventionskurs nicht im Katalog'],
            ['AOK Niedersachsen', '40 EUR', 'ein Zahntermin, Check-up, Impfung, Kurs; Sport nur mit Trainer und monatlicher Teilnahme'],
            ['AOK NordWest', '40 EUR', 'ein Zahntermin, Check-up, Impfung, Kurs; Sport nur mit Trainingshäufigkeit'],
            ['AOK Baden-Württemberg', '30 EUR', 'ein Zahntermin, Check-up, Impfung; Sport nur mit Regelmäßigkeit, kein Präventionskurs im Katalog'],
            ['AOK PLUS', '25 EUR Geld oder 50 EUR Zuschuss', 'ein Zahntermin, Check-up, Impfung, Mitgliedschaft; kein Präventionskurs im Katalog'],
            ['AOK Bayern', '25 EUR', 'ein Zahntermin, Check-up, Impfung, Mitgliedschaft; kein Präventionskurs im Katalog'],
            ['AOK Rheinland-Pfalz/Saarland', '20 EUR', 'ein Zahntermin, Check-up, Impfung, Kurs; Sport nur mit 40 Trainingseinheiten im Jahr'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Das sind Beispielwerte, keine Zusagen. Zwei Zahntermine zählen bei den meisten AOKs nur einmal, doppelt nur bei Bremen/Bremerhaven und Rheinland/Hamburg. Wer Sport mit erfüllten Auflagen, weitere Vorsorge oder Kinderuntersuchungen nachweist, kommt höher, bei der AOK NordWest etwa mit zertifiziertem Studio auf 90 EUR statt 40 EUR. Die AOK Sachsen-Anhalt begrenzt den Bonus auf 200 EUR im Jahr.',
        },
      ],
    },
    {
      id: 'einreichen',
      heading: 'Wie reiche ich den AOK-Bonus ein: App, Bonusheft oder Portal?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auch hier hat jede AOK eigene Wege. Viele kombinieren die App Meine AOK mit einem Papierweg über Bonusheft oder Coupons, einige setzen allein auf Bestätigungen oder ein Formular:',
        },
        {
          type: 'table',
          caption: 'Nachweiswege der elf AOKs 2026',
          head: ['AOK', 'So weist du deine Maßnahmen nach'],
          rows: [
            ['AOK Baden-Württemberg', 'digital im AOK-Bonusprogramm der Kasse oder mit ausgefüllten Maßnahmencoupons; vor dem 15. Geburtstag nur analog'],
            ['AOK Bayern', 'elektronisch oder mit Bonus-Coupons samt Bestätigung; Fitnesstracking nur über die App Meine AOK; Kinder unter 15 auf Papier'],
            ['AOK Bremen/Bremerhaven', 'Bestätigung durch Arztpraxis, Apotheke, Kursleitung oder Anbieter; Sport mit Bestätigung von Verein, Studio oder Hochschulsport'],
            ['AOK Hessen', 'App Meine AOK oder Bonuscoupon auf Papier; Mitgliedschaft per Zahlungsnachweis, etwa Kontoauszug; Teilnahme ab 15'],
            ['AOK Niedersachsen', 'Bonusheft mit Stempel oder Unterschrift oder digital in Meine AOK ab 15, nicht beides zugleich'],
            ['AOK Nordost', 'App Meine AOK oder meine.aok.de mit Foto der Bescheinigung, QR-Code im Studio oder Verein, Messgerät; Bonusheft auf Papier möglich'],
            ['AOK NordWest', 'Nachweisformular der AOK mit Bestätigung von Praxis, Kursleitung, Verein oder Studio'],
            ['AOK PLUS', 'Bonusheft oder elektronisch; Fitnesstracking und Gesundheitsziele über die App der Kasse; Zuschuss gegen Rechnung und Zahlungsbeleg'],
            ['AOK Rheinland/Hamburg', 'Bestätigung der Leistungserbringer oder Scheckbogen der AOK, daneben die App; Zuschuss gegen Zahlungsbeleg'],
            ['AOK Rheinland-Pfalz/Saarland', 'Bonusheft, Foto-Coupon 2026 oder elektronisch; Fitnesstracker über die App Meine AOK; Kinder unter 15 sammeln beim Stammversicherten mit'],
            ['AOK Sachsen-Anhalt', 'gedrucktes Bonusheft aus dem Kundencenter oder über das Servicetelefon, daneben Nachweise der Leistung; keine App und kein Heft zum Herunterladen'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Melde dich früh an. Bei Bayern, Baden-Württemberg, Hessen, Niedersachsen, Nordost, PLUS und Rheinland-Pfalz/Saarland ist eine Einschreibung oder Teilnahmeerklärung Voraussetzung; bei der AOK PLUS gilt auch das fristgerechte Einreichen der Nachweise als Erklärung. Bei Nordost und Rheinland-Pfalz/Saarland beginnt die Teilnahme erst mit dem Tag der Anmeldung, eine rückwirkende Einschreibung schließt die AOK Rheinland-Pfalz/Saarland ausdrücklich aus. Bei Bremen/Bremerhaven, NordWest und Rheinland/Hamburg hat die Teilnahmeerklärung nur bestätigende Wirkung, der Anspruch hängt an den Nachweisen. Bei der AOK Sachsen-Anhalt genügt die Abgabe des Bonushefts.',
        },
      ],
    },
    {
      id: 'praemienprogramm',
      heading: 'Was ist das AOK-Prämienprogramm?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Viele suchen noch nach dem AOK-Prämienprogramm. Für 2026 sehen die Bonusregeln der elf AOKs keine Sachprämien und keinen Prämienshop vor. Es gibt Geld und bei zwei AOKs wahlweise einen zweckgebundenen Zuschuss. Drei Fälle, die oft für Verwirrung sorgen:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'AOK Bayern:',
              text: 'Das frühere AOK-Prämienprogramm nach § 13 der Satzung endete laut Satzung verbindlich für alle Teilnehmer zum 31.12.2024, ebenso der Gesundheitsbonus im Bonustarif. Seitdem gilt allein das Bonusprogramm nach § 13a mit Geldbonus.',
            },
            {
              lead: 'AOK Baden-Württemberg:',
              text: 'Das frühere Prämienprogramm ProFit ist ausgelaufen und existiert 2026 nicht mehr.',
            },
            {
              lead: 'AOK NordWest:',
              text: 'Unterlagen mit Prämienpunkten und Familienbonus stammen aus einer alten Fassung mit Stand 2018 und sind abgeschafft. Für 2026 gilt die Geldprämie nach Anhang 3 der Satzung.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Nicht verwechseln solltest du das Bonusprogramm mit Wahltarifen, bei denen die Kasse eine Prämie gegen einen Selbstbehalt zahlt, etwa AOK PLUS aktiv. Solche Tarife haben teils eine Bindung von drei Jahren und schließen bei einigen AOKs das Bonusprogramm aus, so bei der AOK PLUS, der AOK Baden-Württemberg, der AOK Hessen und der AOK Sachsen-Anhalt.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Kann der AOK-Bonus eine Zusatzversicherung mitfinanzieren?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt von deiner AOK ab. Neun der elf AOKs, nämlich Baden-Württemberg, Bayern, Bremen/Bremerhaven, Hessen, Niedersachsen, Nordost, NordWest, Rheinland-Pfalz/Saarland und Sachsen-Anhalt, zahlen den Bonus als Geld aufs Konto. Ein zweckgebundenes Budget, das ausdrücklich in Gesundheitsausgaben oder den Beitrag einer Zusatzversicherung fließt, regeln ihre Satzungen für Erwachsene nicht. Zwei AOKs haben einen solchen Weg:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'AOK PLUS (Sachsen, Thüringen):',
              text: 'Wählst du statt Geld den Zuschuss, sind 100 Punkte 2 EUR statt 1 EUR wert. Im PLUS Leistungsverzeichnis der Teilnahmebedingungen (Stand Juni 2026) stehen ausdrücklich private Zusatzversicherungsverträge nach § 7 der Satzung der AOK PLUS. Erstattet wird gegen Rechnung und Zahlungsbeleg, höchstens in Höhe deiner Kosten und deiner Punkte. Der Zuschussweg selbst steht in der Satzung, die Liste der Leistungen in den Teilnahmebedingungen.',
            },
            {
              lead: 'AOK Rheinland/Hamburg (Rheinland, Hamburg):',
              text: 'Im Modell AOK-Vital+ bezuschusst die Kasse laut Anhang 3 ihrer Satzung Beiträge zu privaten Zusatzversicherungen, die nach ihrem Hauptzweck unmittelbar mit der Gesundheit zusammenhängen; genannt sind Zahnersatz, Brillen und alternative Behandlungsmethoden. Ausgenommen sind Komfortversicherungen wie Chefarztbehandlung oder Ein- und Zweibettzimmer. Je Maßnahme gibt es 20 EUR Zuschuss, höchstens in Höhe der tatsächlichen Kosten und des erreichten Bonusbetrags.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Ob ein bestimmter Tarif anerkannt wird, entscheidet in beiden Fällen die Kasse. Die AOK Nordost kennt einen zweckgebundenen Zuschuss nur im Kinderbonus bis zum 15. Geburtstag, dort ohne höheren Wert als das Geld. Und rechne nach: Bei der AOK Rheinland/Hamburg bringt der Zuschuss etwa für Check-up, Impfung und Krebsfrüherkennung weniger als das Geld, bei der AOK PLUS ist er rechnerisch immer doppelt so hoch, gedeckelt auf deine Kosten.',
        },
        {
          type: 'paragraph',
          text: 'Nicht zu verwechseln mit dem Bonus sind die Gesundheitskonten einiger AOKs, etwa das Gesundheitskonto der AOK Baden-Württemberg mit 300 EUR im Jahr, das der AOK Hessen oder das GESUNDESKONTO der AOK Sachsen-Anhalt mit 600 EUR im Jahr. Das sind Obergrenzen für Erstattungen einzelner Satzungsleistungen wie Osteopathie, jeweils mit eigener Voraussetzung. Ein Guthaben aus dem Bonusprogramm sind sie nicht, und für Versicherungsbeiträge sind sie nicht vorgesehen. Bei der AOK Sachsen-Anhalt schließen sich GESUNDESKONTO und Gesundheitsbonus im selben Jahr sogar aus.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Wenn du den Bonus gezielt für eine Zusatzversicherung nutzen willst, lohnt der Blick über die AOK hinaus. Andere Kassen geben für vergleichbare Maßnahmen einen zweckgebundenen Zuschuss, der ausdrücklich den Beitrag einer Zusatzversicherung tragen kann. Die IKK classic etwa zahlt ihn in dreifacher Höhe des Geldbonus, höchstens bis zu den selbst nachgewiesenen Kosten; die Einzelheiten stehen im Ratgeber ',
            },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '. Welche Kasse für deine Maßnahmen am meisten bringt, vergleichst du quellenbelegt auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: '.' },
          ],
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Für den Beitrag, in den so ein Zuschuss fließen kann, haben wir bei Healio ein Angebot zusammengestellt. Bist du bei der AOK PLUS oder der AOK Rheinland/Hamburg versichert und wählst den Zuschuss, kann er den Jahresbeitrag einer Zusatzversicherung ganz oder teilweise tragen, ob ',
            },
            { text: 'ambulant für Heilpraktiker, Osteopathie, Brille und Vorsorge', to: '/ambulant' },
            { text: ', ' },
            { text: 'für die Zähne', to: '/zahn' },
            { text: ' oder ' },
            { text: 'fürs Krankenhaus', to: '/stationaer' },
            { text: '. Ob deine AOK einen bestimmten Tarif anerkennt, entscheidet sie selbst. Der ambulante Tarif selbst bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Zuschuss hilft beim Beitrag. Wie viel dein Bonus beiträgt, hängt von deiner AOK, deinen Maßnahmen und deinen eigenen Kosten ab; das rechnest du auf der jeweiligen Seite individuell durch.' },
          ],
        },
      ],
    },
    {
      id: 'aok-bayern',
      heading: 'AOK Bayern Bonusprogramm 2026: Punkte, Beträge und Frist',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die AOK Bayern zahlt nach § 13a ihrer Satzung einen reinen Geldbonus. 100 Bonuspunkte entsprechen 1 EUR, ausgezahlt wird jederzeit ab 500 Punkten, also ab 5 EUR. Punkte darunter bleiben stehen und lassen sich in die Folgejahre mitnehmen. Der Katalog steht in Anlage 3 der Satzung:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Je 500 Punkte (5 EUR):',
              text: 'Schutzimpfung je vollständiger Impfung, Check-up, Krebsfrüherkennung, organisiertes Früherkennungsprogramm, Zahnvorsorge (bei Erwachsenen einmal im Jahr, zwei Termine bringen also 5 EUR), Hautcheck alle zwei Kalenderjahre, Rauchentwöhnungskurs, Erste-Hilfe-Kurs, Sportveranstaltung und Sportabzeichen.',
            },
            {
              lead: 'Je 1.000 Punkte (10 EUR):',
              text: 'Mitgliedschaft im Sportverein, Betriebs- oder Hochschulsport und Mitgliedschaft im Fitnessstudio als zwei getrennte Positionen, dazu Blut- oder Plasmaspende. Knochenmarktypisierung und Organspendeausweis zählen je einmal im Leben.',
            },
            {
              lead: 'Fitness mit Gerät und App:',
              text: 'Der Kauf eines Fitnesstrackers bringt 2.500 Punkte (25 EUR) alle drei Kalenderjahre. Gemessene Aktivitäten über die App Meine AOK bringen je 50 Punkte, höchstens 15 im Monat.',
            },
            {
              lead: 'Kinder und Jugendliche:',
              text: '500 Punkte je Früherkennungsuntersuchung. Wer bis 17 Jahre alt ist und ab dem 01.01.2026 erstmals teilnimmt, bekommt zur ersten bonifizierten Maßnahme einmalig einen Starterbonus von 10.000 Punkten (100 EUR).',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Einen allgemeinen Präventionskurs bonifiziert die AOK Bayern nicht, nur den Rauchentwöhnungs- und den Erste-Hilfe-Kurs. Nachweise für 2026 reichst du bis 31.03.2027 ein. Für zwei Zahnarzttermine, Check-up, eine Impfung und eine Mitgliedschaft kommen 25 EUR zusammen; wie viel es bei dir wird, hängt von deinen Maßnahmen ab. Professionelle Zahnreinigung oder Homöopathie zahlt die AOK Bayern als eigene Satzungsleistungen mit eigenen Grenzen, das ist kein Bonus.',
        },
      ],
    },
    {
      id: 'aok-plus',
      heading: 'AOK PLUS Bonusprogramm 2026: Geldbonus oder doppelter Zuschuss',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der AOK PLUS für Sachsen und Thüringen wählst du auf demselben Punktekonto zwischen Geld und Zuschuss (§ 19a Abs. 7 der Satzung). Als Geldbonus sind 100 Punkte 1 EUR wert, ausgezahlt ab 500 Punkten. Als Zuschuss zu selbst bezahlten Gesundheitsleistungen sind dieselben 100 Punkte 2 EUR wert. Beides zusammen geht nicht.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Je 500 Punkte (5 EUR Geld oder 10 EUR Zuschuss):',
              text: 'Schutzimpfung je empfohlener Impfung, Check-up, Krebsfrüherkennung, Zahnvorsorge ab 18 einmal im Jahr, professionelle Zahnreinigung, Nichtraucherkurs, sportmedizinische Vorsorge, Hautcheck zwischen 14 und 34 Jahren jedes zweite Kalenderjahr, Sportveranstaltung und Sportabzeichen.',
            },
            {
              lead: 'Je 1.000 Punkte (10 EUR Geld oder 20 EUR Zuschuss):',
              text: 'Sportverein, Hochschul- oder Betriebssport und Fitnessstudio als getrennte Positionen, Kauf eines Fitnesstrackers, Blutspende und Knochenmarktypisierung.',
            },
            {
              lead: 'Über die App:',
              text: 'Gemessene Aktivitäten bringen je 50 Punkte, höchstens 15 im Monat; erreichte Gesundheitsziele je 1.500 Punkte, bis zu vier im Jahr.',
            },
            {
              lead: 'Kinder:',
              text: 'U1 bis U3 zusammen 1.500 Punkte, weitere U-Untersuchungen je 500 Punkte.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Den Zuschuss gibt es für Leistungen aus dem PLUS Leistungsverzeichnis, das in den Teilnahmebedingungen steht (Stand Juni 2026). Genannt sind unter anderem Zahnersatz und Zahnprophylaxe, Brillen und Kontaktlinsen, Hörhilfen, individuelle Gesundheitsleistungen, Leistungen besonderer Therapierichtungen nach dem Hufeland-Leistungsverzeichnis, Physiotherapie, Gesundheitskurse, Beiträge für Sportverein oder Fitnessstudio und private Zusatzversicherungsverträge nach § 7 der Satzung. Du reichst Rechnung und Zahlungsbeleg ein; erstattet werden höchstens die tatsächlichen Kosten und höchstens der Wert deiner Punkte, jeder Beleg zählt nur einmal. Berücksichtigt werden selbst in Anspruch genommene Leistungen ab dem 01.01.2023.',
        },
        {
          type: 'paragraph',
          text: 'Frist für Nachweise und Belege ist der 31.03.2027. Für zwei Zahnarzttermine, Check-up, eine Impfung und eine Mitgliedschaft ergeben sich 2.500 Punkte, also 25 EUR Geld oder bis zu 50 EUR Zuschuss. Einen allgemeinen Präventionskurs bonifiziert die AOK PLUS nicht. Wer den Wahltarif AOK PLUS aktiv mit Selbstbehalt hat, kann am Bonusprogramm nicht teilnehmen.',
        },
      ],
    },
    {
      id: 'aok-bw',
      heading: 'AOK Baden-Württemberg (AOK BW) Bonusprogramm 2026: was es je Maßnahme gibt',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die AOK Baden-Württemberg rechnet ohne Punkte direkt in Euro und zahlt ausschließlich Geld aufs Konto (§ 8a der Satzung). Jede Maßnahme zählt höchstens einmal im Kalenderjahr.',
        },
        {
          type: 'list',
          items: [
            {
              lead: '10 EUR je Maßnahme:',
              text: 'Schutzimpfung (einmal im Jahr, egal wie viele Impfungen), Check-up, Krebsfrüherkennung je Untersuchung, Zahnvorsorge ab 18 einmal im Jahr, Hautkrebsscreening, Untersuchungen im Mutterpass (höchstens drei im Jahr) und Erste-Hilfe-Kurs (einmalig).',
            },
            {
              lead: '15 EUR:',
              text: 'professionelle Zahnreinigung.',
            },
            {
              lead: 'Sport je 10 EUR:',
              text: 'Sportverein, Fitnessstudio, Betriebssportgruppe sowie Bundesjugendspiele oder Hochschulsport als vier getrennte Positionen. Eine bloße Mitgliedschaft reicht nicht, Verein oder Studio bestätigen regelmäßige Betätigung; beim Studio verlangt die Kasse zusätzlich ein Gütesiegel.',
            },
            {
              lead: 'Digital:',
              text: '0,25 EUR je gemessener Bewegungseinheit, höchstens 60 EUR im Jahr, und ab 18 Jahren zweimal 10 EUR für erreichte Gesundheitsziele in einer App der Kasse.',
            },
            {
              lead: 'Kinder:',
              text: 'U1 bis U6 zusammen einmalig 10 EUR, danach 10 EUR je Untersuchung.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Einen allgemeinen Präventionskurs bonifiziert die AOK Baden-Württemberg nicht. Die Kasse wirbt mit bis zu 225 EUR; das ist die Summe der ganzen Erwachsenentabelle einschließlich dreier Mutterpass-Untersuchungen. Für zwei Zahnarzttermine, Check-up und eine Impfung kommen 30 EUR zusammen, Sport zählt nur mit bestätigter Regelmäßigkeit. Wichtig ist die frühe Frist: Nachweise für 2026 müssen bis 28.02.2027 bei der Kasse sein.',
        },
        {
          type: 'paragraph',
          text: 'Teilnehmen kannst du per Einschreibung, vor dem 15. Geburtstag nur analog mit Einverständnis der gesetzlichen Vertretung. Wer den Wahltarif Selbstbehalt mit Gesundheitsbonus gewählt hat, ist vom Bonusprogramm ausgeschlossen. Der Katalog steht in Ausführungsbestimmungen des Vorstandes (Stand Mai 2025), die die Kasse ohne Satzungsänderung anpassen kann; maßgeblich ist die jeweils aktuelle Fassung.',
        },
      ],
    },
    {
      id: 'aok-niedersachsen',
      heading: 'AOK Niedersachsen Bonusprogramm 2026: der AOK Aktiv-Bonus',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der AOK Niedersachsen heißt das Programm AOK Aktiv-Bonus (§ 13 der Satzung mit Anhang). Ein Punkt ist 1 EUR, jede Position bringt 10 Punkte, also 10 EUR, ausgezahlt per Überweisung. Eine Mindestsumme für die Auszahlung gibt es nicht.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Vorsorge:',
              text: 'Gesundheitsuntersuchung, Krebsvorsorge (Frauen ab 20, Männer ab 45, eine im Jahr), Hautkrebs-Screening alle zwei Jahre, Impfungen (bis zu fünf Impfkomplexe im Jahr), Zahnprophylaxe (bei Erwachsenen Untersuchung oder professionelle Zahnreinigung einmal im Jahr).',
            },
            {
              lead: 'Kurse und Aktionen:',
              text: 'Präventionskurse (bis zu zwei im Jahr), AOK Aktiv-Bonus-Veranstaltungen und ein Sport- oder Leistungsabzeichen oder eine öffentliche Sportveranstaltung (zusammen einmal im Jahr).',
            },
            {
              lead: 'Sport:',
              text: 'Sportverein, Fitnessstudio, Hochschul- oder Betriebssport nur mit Trainerbegleitung und mindestens monatlicher Teilnahme.',
            },
            {
              lead: 'Familie:',
              text: 'Mutterschaftsvorsorge, Geburtsvorbereitung, Rückbildungsgymnastik, U1 bis U4 als Komplex, U5 bis J2 je Untersuchung und eine erfolgreich abgeschlossene kieferorthopädische Behandlung.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Du sammelst entweder analog im Bonusheft mit Stempel oder Unterschrift oder digital in Meine AOK, nicht beides zugleich. Das Bonusheft steht allen Versicherten offen, Kinder unter 15 sammeln über die stammversicherte Person; digital geht es erst ab 15. Die Nachweise sollen innerhalb von sechs Monaten nach Jahresende bei der Kasse sein, für 2026 also bis 30.06.2027.',
        },
        {
          type: 'paragraph',
          text: 'Für zwei Zahnarzttermine, Check-up, eine Impfung und einen Präventionskurs ergeben sich 40 EUR; Sport zählt nur mit Trainer und mindestens monatlicher Teilnahme. Setzt dein Arbeitgeber betriebliche Gesundheitsförderung dauerhaft um und weist das der AOK nach, gibt es für dich als Teilnehmerin oder Teilnehmer zusätzlich 100 EUR, höchstens drei Jahre in Folge.',
        },
      ],
    },
    {
      id: 'aok-nordwest',
      heading: 'AOK NordWest Bonusprogramm 2026: Schleswig-Holstein und Westfalen-Lippe',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die AOK NordWest ist für Schleswig-Holstein und Westfalen-Lippe zuständig, also die Regierungsbezirke Arnsberg, Detmold und Münster. Gezahlt wird nach § 10d der Satzung eine Geldprämie in Euro, ohne Punkte und schon ab der ersten Maßnahme. Guthaben lassen sich nicht auf Familienmitglieder übertragen.',
        },
        {
          type: 'list',
          items: [
            {
              lead: '10 EUR je Position:',
              text: 'Check-up (zwischen 18 und 34 einmal, ab 35 alle drei Jahre), Krebsfrüherkennung, Hautkrebs-Screening ab 35 alle zwei Jahre, Schutzimpfung (höchstens 10 EUR im Jahr), Zahnvorsorge ab 18 einmal im Jahr, professionelle Zahnreinigung einmal im Jahr, Präventionskurs und digitale Prävention (je bis zu zwei), Sportabzeichen, Geburtsvorbereitungs- und Rückbildungskurs.',
            },
            {
              lead: 'Sportverein 10 EUR:',
              text: 'bei sportlicher Aktivität mindestens zweimal im Monat.',
            },
            {
              lead: 'Fitnessstudio 50 EUR:',
              text: 'bei mindestens zwei Trainingseinheiten im Monat in einem Studio, das nach DIN 33961 oder DIN EN 17229 zertifiziert ist, oder mit Betreuung durch Trainer mit mindestens C-Lizenz an TÜV-geprüften Geräten.',
            },
            {
              lead: 'Familie:',
              text: 'vollständige U1 bis U6 50 EUR, vollständige Schwangerschaftsvorsorge 30 EUR je Schwangerschaft.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Kurse anderer Anbieter, etwa der Volkshochschule, zählen, wenn sie qualitätsgesichert sind. Den Nachweis führst du auf dem Nachweisformular der AOK. Die Nachweise sollen möglichst bis 31.03.2027 bei der Kasse sein; verjährt sind die Ansprüche erst vier Jahre nach Ablauf des Jahres, für 2026 also mit Ende 2030.',
        },
        {
          type: 'paragraph',
          text: 'Für zwei Zahnarzttermine, Check-up, eine Impfung und einen Präventionskurs kommen 40 EUR zusammen, mit aktivem Sportverein 50 EUR, mit zertifiziertem Studio 90 EUR. Bei betrieblicher Gesundheitsförderung gibt es zusätzlich 25 EUR je Maßnahme in Präsenz, höchstens 75 EUR im Jahr.',
        },
      ],
    },
    {
      id: 'aok-rheinland-hamburg',
      heading: 'AOK Rheinland/Hamburg 2026: AOK-Fit+ oder AOK-Vital+?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die AOK Rheinland/Hamburg ist für das Rheinland mit den Regierungsbezirken Düsseldorf und Köln sowie für Hamburg zuständig. Du wählst für ein Kalenderjahr eines von zwei Modellen, beide zugleich geht nicht (§ 38 der Satzung mit Anhang 3):',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'AOK-Fit+ (Geld):',
              text: 'Vorsorge nach § 65a Abs. 1 SGB V, also Check-up, Hautkrebsscreening ab 35, Krebsfrüherkennung, Schutzimpfung und Kinderuntersuchungen, bringt je 3.000 Punkte, also 30 EUR. Alle weiteren Maßnahmen bringen je 1.000 Punkte, also 10 EUR.',
            },
            {
              lead: 'AOK-Vital+ (Zuschuss):',
              text: 'Jede Maßnahme bringt 1.000 Punkte, die als Zuschuss für Gesundheitsleistungen 20 EUR wert sind.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Zu den weiteren Maßnahmen zählen Zahnvorsorge für Erwachsene einmal je Kalenderhalbjahr, also zweimal im Jahr, professionelle Zahnreinigung, Präventionskurse zweimal im Jahr, Fitnessstudio (mindestens zweimal im Monat, DIN-zertifiziert, ab 15), Sportverein (mindestens dreimal oder 2,5 Stunden im Monat), Sportabzeichen, sportmedizinische Untersuchung, Geburtsvorbereitung, Rückbildung und Gesundheitswerte wie BMI, Blutzucker, Cholesterin und Blutdruck, wenn du sie von außerhalb in den Normbereich gebracht hast. Wer an mindestens vier Sonderaktionen der AOK im Jahr teilnimmt, bekommt 4.000 Punkte.',
        },
        {
          type: 'paragraph',
          text: 'Den Zuschuss gibt es unter anderem für alternative Heilmethoden wie Ayurveda, Chiropraktik, Homöopathie oder Osteopathie, für Brillen alle drei Jahre, Gesundheits-Apps, Sport- und Fitnessbeiträge, Wearables, Zahnleistungen und Beiträge zu bestimmten privaten Zusatzversicherungen. Grundsätzlich gilt er nur, soweit die AOK nicht schon nach anderen Vorschriften zahlt.',
        },
        {
          type: 'paragraph',
          text: 'Der Zuschuss ist nicht in jedem Fall höher als das Geld: Für Check-up, Impfung, Krebsfrüherkennung, Hautkrebsscreening ab 35 und Kinderuntersuchungen zahlt Fit+ 30 EUR, Vital+ 20 EUR, für die weiteren Maßnahmen zahlt Vital+ das Doppelte. Für zwei Zahnarzttermine, Check-up, eine Impfung und einen Präventionskurs ergeben sich 90 EUR im Fit+ oder 100 EUR Zuschuss im Vital+. Eingelöst wird ab 1.000 Punkten, die Nachweise für 2026 sollen spätestens bis 31.12.2027 bei der Kasse sein.',
        },
      ],
    },
    {
      id: 'weitere-aoks',
      heading: 'AOK Hessen, Bremen, Nordost, Rheinland-Pfalz/Saarland und Sachsen-Anhalt: die Bonusprogramme kompakt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'AOK Hessen (BONUS fit):',
              text: 'Ein Punkt ist 1 EUR. Zahnvorsorge 15 EUR einmal im Jahr, Impfung, Check-up und Krebsvorsorge je 10 EUR, Mitgliedschaft in Verein oder Studio 20 EUR gegen Zahlungsnachweis, Präventionskurs 5 EUR je Kurs bei bis zu drei Kursen, Mit dem Rad zur Arbeit 20 EUR, einmaliger Online-Startbonus 25 EUR. Teilnahme ab 15, Auszahlung ab 5 EUR, Frist 31.03.2027. Beispielwert: 60 EUR.',
            },
            {
              lead: 'AOK Bremen/Bremerhaven:',
              text: '100 Punkte sind 1 EUR. Check-up, Krebsfrüherkennung, Haut-Check und professionelle Zahnreinigung je 20 EUR, Zahnvorsorge 20 EUR zweimal im Jahr, Schutzimpfung 10 EUR je Impfung, Kinderuntersuchungen U1 bis J2 je 20 EUR, aktive Mitgliedschaft in Verein, Studio mit Gütesiegel oder Hochschulsport 30 EUR bei mindestens zweimal monatlicher Aktivität. Keine Mindestauszahlung, Nachweise möglichst bis 31.03.2027. Beispielwert: 70 EUR, mit Sport 100 EUR.',
            },
            {
              lead: 'AOK Nordost (Berlin, Brandenburg, Mecklenburg-Vorpommern):',
              text: '100 Punkte sind 1 EUR. Fitnessstudio oder Sportverein je 25 EUR, Krebsvorsorge, Zahnvorsorge ab 15 und Erste-Hilfe-Kurs je 15 EUR, Blutspende 10 EUR, eine Impfung 5 EUR. Check-up und Präventionskurs stehen nicht im Katalog. Teilnahme ab 15 und erst ab dem Tag der Anmeldung, Auszahlung ab 10 EUR, Frist 31.03.2027, danach keine Gutschrift. Beispielwert: 45 EUR.',
            },
            {
              lead: 'AOK Rheinland-Pfalz/Saarland:',
              text: '100 Punkte sind 1 EUR. Check-up, Zahnvorsorge (einmal im Jahr), professionelle Zahnreinigung, Impfung, Präventionskurs (bis zu zwei) und viele weitere Positionen je 5 EUR; Mitgliedschaft in Verein, Studio, Hochschul- oder Betriebssport 50 EUR, laut Foto-Coupon 2026 nur mit mindestens 40 Trainingseinheiten im Jahr; Sehhilfe 40 EUR alle drei Jahre. Teilnahme ab 15 und nicht rückwirkend, Auszahlung ab 5 EUR, Frist 31.03.2027. Beispielwert: 20 EUR, mit erfüllter Trainingsauflage 70 EUR.',
            },
            {
              lead: 'AOK Sachsen-Anhalt (AOK-Gesundheitsbonus):',
              text: 'Ein Punkt ist 1 EUR, höchstens 200 EUR im Jahr. Check-up, Schutzimpfung, Zahnvorsorge, Sehtest und Hautcheck je 10 EUR, Sport in Verein, Hochschulsport oder Studio 20 EUR, vollständige Mutterschaftsvorsorge 50 EUR. Gesammelt wird im gedruckten Bonusheft, eine App gibt es nicht; Bonusheft und Nachweise müssen bis 30.06.2027 bei der Kasse sein. Beispielwert: 60 EUR.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Bei Hessen, Nordost, Rheinland-Pfalz/Saarland und Sachsen-Anhalt stehen die Beträge je Maßnahme nicht in der Satzung selbst, sondern in Unterlagen der Kasse wie Ausführungsbestimmungen, Teilnahmebedingungen, Infoblatt oder Produktseite. Prüfe deshalb vor dem Einreichen die aktuelle Fassung.',
        },
      ],
    },
    {
      id: 'tipp-ikk-classic',
      heading: 'Unser Tipp: Die IKK classic gegen deine AOK rechnen',
      blocks: [
        {
          type: 'paragraph',
          text: 'Unsere Einschätzung bei Healio: Wenn du Bonus und Zusatzschutz verbinden willst, ist die IKK classic für uns ein besonders starker Weg. Unter den von kassenboost.de geprüften Satzungen ist sie die einzige Kasse, die ihren gesamten Bonus wahlweise in dreifacher Höhe und ohne Höchstbetrag als Zuschuss zahlt, auch für den Jahresbeitrag einer privaten Zusatzversicherung; ausgezahlt wird dabei höchstens der Beitrag, den du tatsächlich gezahlt hast.',
        },
        {
          type: 'paragraph',
          text: 'Dagegen steht der Zusatzbeitrag: 3,85 Prozent bei der IKK classic, bei den AOKs zwischen 2,47 Prozent (AOK Rheinland-Pfalz/Saarland) und 3,50 Prozent (AOK Nordost), Stand 05.10.2026. Wechselst du, zahlst du je nach AOK 0,35 bis 1,38 Prozentpunkte mehr, und diesen Mehrbeitrag musst du gegen den Zuschuss rechnen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die Rechnung steht im Ratgeber ' },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', den Vergleich der Satzungen findest du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ', und du kannst genauso bei deiner AOK bleiben, denn ein Wechsel lohnt sich nicht für jeden.' },
          ],
        },
      ],
    },
    {
      id: 'fristen',
      heading: 'Bis wann muss ich den AOK-Bonus 2026 einreichen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei allen elf AOKs ist das Bonusjahr das Kalenderjahr, für den Bonus 2026 zählen also Maßnahmen aus 2026. Die Fristen für die Nachweise unterscheiden sich deutlich:',
        },
        {
          type: 'table',
          caption: 'Fristen für den AOK-Bonus 2026',
          head: ['AOK', 'Nachweise für 2026', 'Gut zu wissen'],
          rows: [
            ['AOK Baden-Württemberg', 'bis 28.02.2027', 'früheste Frist der elf AOKs'],
            ['AOK Bayern', 'bis 31.03.2027', 'Auszahlung ab 500 Punkten (5 EUR)'],
            ['AOK Bremen/Bremerhaven', 'möglichst bis 31.03.2027', 'Soll-Frist, Ansprüche verjähren nach vier Jahren'],
            ['AOK Hessen', 'bis 31.03.2027', 'Auszahlung ab 5 EUR Guthaben'],
            ['AOK Niedersachsen', 'bis 30.06.2027', 'sechs Monate nach Jahresende'],
            ['AOK Nordost', 'bis 31.03.2027', 'danach keine Gutschrift, Auszahlung ab 10 EUR'],
            ['AOK NordWest', 'möglichst bis 31.03.2027', 'Soll-Frist, Verjährung Ende 2030'],
            ['AOK PLUS', 'bis 31.03.2027', 'gilt auch für Rechnungen beim Zuschuss, Geldbonus ab 500 Punkten'],
            ['AOK Rheinland/Hamburg', 'spätestens bis 31.12.2027', 'Einlösung ab 1.000 Punkten'],
            ['AOK Rheinland-Pfalz/Saarland', 'bis 31.03.2027', 'Auszahlung ab 500 Punkten (5 EUR)'],
            ['AOK Sachsen-Anhalt', 'bis 30.06.2027', 'später eingereichte Bonushefte zählen nicht'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Reiche lieber früh ein. Bei der AOK Nordost und der AOK Sachsen-Anhalt steht ausdrücklich in den Regeln, dass nach Fristende nichts mehr zählt. Bei der AOK Nordost müssen Teilnehmende auf Papier ihre Punkte außerdem bis 31.03. abrechnen, während Punkte in der App ins Folgejahr wandern.',
        },
      ],
    },
  ],

  factNugget:
    'Healio verbindet Kassenbonusprogramme mit Zusatzversicherungen: Der ambulante Tarif bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Kassenbonus kann je nach Kasse beim Beitrag helfen. Bei den AOKs hängt der Weg von der Region ab: Nur die AOK PLUS und die AOK Rheinland/Hamburg sehen in ihren Bonusregeln einen zweckgebundenen Zuschuss vor, der auch private Zusatzversicherungen umfassen kann, höchstens bis zu den nachgewiesenen Kosten; die übrigen neun AOKs zahlen den Bonus als Geld. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie viel Bonus zahlt die AOK 2026?',
      answer:
        'Das hängt von deiner AOK und deinen Maßnahmen ab. Für denselben Beispielkorb mit zwei Zahnarztterminen, Check-up, Impfung, Sport und Präventionskurs ergeben die Bonusregeln 2026 zwischen 20 EUR bei der AOK Rheinland-Pfalz/Saarland und 90 EUR Geld oder 100 EUR Zuschuss bei der AOK Rheinland/Hamburg. Die AOK Sachsen-Anhalt begrenzt den Bonus auf 200 EUR im Jahr.',
    },
    {
      question: 'Gibt es ein AOK-Bonusheft?',
      answer:
        'Bei mehreren AOKs ja. Die AOK Niedersachsen bietet ein Bonusheft neben der App Meine AOK an, die AOK Sachsen-Anhalt ein gedrucktes Bonusheft aus dem Kundencenter oder über das Servicetelefon, eine App gibt es dort nicht. AOK PLUS, AOK Nordost und AOK Rheinland-Pfalz/Saarland nennen das Bonusheft neben dem digitalen Weg. Bayern, Baden-Württemberg und Hessen arbeiten mit Coupons, Rheinland/Hamburg mit einem Scheckbogen und NordWest mit einem Nachweisformular.',
    },
    {
      question: 'Bis wann muss ich den AOK-Bonus 2026 einreichen?',
      answer:
        'Je nach AOK zwischen dem 28.02.2027 (Baden-Württemberg) und dem 31.12.2027 (Rheinland/Hamburg). Bayern, Hessen, Nordost, PLUS und Rheinland-Pfalz/Saarland verlangen die Nachweise bis 31.03.2027, Sachsen-Anhalt bis 30.06.2027. Niedersachsen nennt sechs Monate nach Jahresende, also den 30.06.2027, Bremen/Bremerhaven und NordWest bitten um Einreichung möglichst bis 31.03.2027.',
    },
    {
      question: 'Zahlt die AOK einen Zuschuss zur Zusatzversicherung?',
      answer:
        'Nur zwei AOKs haben dafür einen Weg: die AOK PLUS mit dem Zuschuss in doppelter Höhe des Geldbonus und die AOK Rheinland/Hamburg im Modell Vital+ mit 20 EUR je Maßnahme. Beide zahlen höchstens die nachgewiesenen Kosten, und ob ein bestimmter Tarif anerkannt wird, entscheidet die Kasse. Die übrigen neun AOKs zahlen den Bonus als Geld.',
    },
    {
      question: 'Gibt es noch ein AOK-Prämienprogramm?',
      answer:
        'Nein. Das Prämienprogramm der AOK Bayern endete laut Satzung zum 31.12.2024, das Programm ProFit der AOK Baden-Württemberg gibt es 2026 nicht mehr. Sachprämien sehen die Bonusregeln der elf AOKs für 2026 nicht vor.',
    },
    {
      question: 'Zahlt die AOK einen Bonus fürs Fitnessstudio?',
      answer:
        'Bei den meisten ja, aber mit unterschiedlichen Auflagen. Ohne Vorgabe zur Trainingshäufigkeit zahlen Hessen und Sachsen-Anhalt 20 EUR, Nordost 25 EUR, Bayern und PLUS 10 EUR Geld. Die AOK NordWest zahlt 50 EUR nur bei zertifiziertem Studio und mindestens zwei Trainingseinheiten im Monat, die AOK Rheinland-Pfalz/Saarland 50 EUR laut Foto-Coupon 2026 nur mit mindestens 40 Trainingseinheiten im Jahr.',
    },
    {
      question: 'Kann ich bei der AOK Geld und Zuschuss kombinieren?',
      answer:
        'Nein. Bei der AOK PLUS wählst du auf demselben Punktekonto entweder Geld oder Zuschuss, bei der AOK Rheinland/Hamburg für ein Kalenderjahr entweder Fit+ oder Vital+. Bei den anderen neun AOKs gibt es nur Geld.',
    },
  ],

  // Bewusst kein internalCta: Nur die drei Artikel aus INTERNAL_BUTTONS im
  // Vertragstest dürfen einen Button tragen.

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      {
        text: 'Welche AOK für dich zuständig ist, hängt von deinem Bundesland ab, wie viel Bonus du bekommst, von deinen Maßnahmen. Auf ',
      },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' vergleichst du Bonusprogramme quellenbelegt anhand der Satzungen, auch mit Kassen, die einen zweckgebundenen Zuschuss zahlen, auf ',
      },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' rechnest du durch, wie viel Beitrag einer Zusatzversicherung nach dem individuell anrechenbaren Bonus selbst zu tragen bleibt.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den Satzungen und Bonusbestimmungen der elf AOKs zum Bonusjahr 2026, Stand der ausgewerteten Fassungen 26.08.2026; maßgeblich sind immer die Originaldokumente der Kassen.',
};

export default article;
