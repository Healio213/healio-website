/**
 * Serie Zähne, Stapel zahn-kasse-partner, Seite aok-zahnzusatzversicherung
 * (Welle A, Hauptbegriff "aok zahnzusatzversicherung").
 *
 * Quellen (Abruf 07.10.2026, Belege je Aussage in aok-zahnzusatzversicherung.belege.md):
 *   - Festzuschuss: SGB V § 55 (Fassung bis 31.12.2026), Festzuschuss-Richtlinie
 *     des G-BA (Beträge ab 01.01.2026), BGBl. 2026 I Nr. 228 (ab 2027),
 *     Verbraucherzentrale und KZBV (Härtefall, Einkommensgrenze 2026: 1.582,00 EUR,
 *     beim Einbau am 07.10.2026 korrigiert, vorher stand der Wert 2025).
 *   - Zuschuss zur Zahnreinigung: die elf AOK-Satzungen, am 07.10.2026 neu
 *     geladen; SHA-256 stimmt für neun Dateien mit der Nachprüfung vom 06.10.2026
 *     überein, AOK PLUS (Fassung 17.09.2026) und AOK Rheinland-Pfalz/Saarland
 *     (Datei 29.07.2026) sind die dort beschriebenen neuen Fassungen. Die
 *     Werte decken sich mit der Tabelle im Zahn-Ratgeber professionelle-zahnreinigung-kosten.
 *   - Bonusprogramm: KassenBoost-Belegketten aok-*-bonus-2026.server.ts und der
 *     bestehende Ratgeber aok-bonusprogramm-2026 (Werte, Formulierungen und
 *     Zuschuss-Regel wie dort, keine Abweichung). AOK PLUS § 19a Abs. 7 und
 *     Teilnahmebedingungen Stand Juni 2026, AOK Rheinland/Hamburg Anhang 3
 *     Ziff. 1.2 und 6.6 sind am 07.10.2026 im Wortlaut gegengelesen.
 *   - Zusatzbeiträge: Krankenkassenliste des GKV-Spitzenverbands, Listenstand 07.10.2026.
 *   - Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Anbieterseite: Die Seite nennt keinen Kooperationspartner einer AOK,
 *     sagt nur neutral, dass die Satzungen aller elf AOKs die Vermittlung privater
 *     Zusatzversicherungen vorsehen und mehrere die Einzelheiten in Verträgen
 *     mit privaten Versicherern regeln.
 *   - Zuschuss für private Zusatzversicherungen nur bei AOK PLUS und AOK
 *     Rheinland/Hamburg, bei den übrigen neun "die Satzung regelt für Erwachsene
 *     keinen zweckgebundenen Zuschuss" (so auch im Ratgeber aok-bonusprogramm-2026),
 *     nie "bietet die Kasse nicht an". Ob ein bestimmter Tarif anerkannt wird,
 *     entscheidet die Kasse.
 *   - Bonus nicht als Geld beschrieben: Werte heißen "im Wert von". Die frühere
 *     Tabelle "Zahnvorsorge im Bonusprogramm" ist nach der Entscheidung der
 *     Marktanalyse-Sitzung vom 07.10.2026 durch zwei Sätze und den Link auf
 *     den Ratgeber aok-bonusprogramm-2026 ersetzt.
 *   - IKK-Hinweis nur mit Satzungswert 810 EUR, breiter Masse 400 bis 700 EUR,
 *     Zusatzbeitrag, Wahlfreiheit und ohne Kooperationshinweis.
 *   - Zum Zahnersatz keine Aussage zu Beträgen ab 2027 (G-BA legt sie neu fest).
 *   - Ausschnitt weiterer Zahn-Mehrleistungen nur dort, wo am 07.10.2026 im
 *     Satzungstext gelesen (Hessen, Nordost, Rheinland-Pfalz/Saarland), ohne
 *     Anspruch auf Vollständigkeit.
 *
 * Faktenprüfung 07.10.2026: PRUEFBERICHT-zahn-kasse-partner.md.
 */

export const article = {
  slug: 'aok-zahnzusatzversicherung',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'AOK Zahnzusatzversicherung: was die AOK beim Zahn zahlt | Healio',
  metaDescription:
    'AOK Zahnzusatzversicherung: Was die AOK beim Zahnersatz zahlt, welche Zuschüsse es zur Zahnreinigung gibt und welche AOK den Bonus für einen Zahntarif nutzt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 13,

  listTitle: 'AOK und Zähne: was die AOK beim Zahnersatz zahlt und welche Zusatzversicherung passt',
  listTeaser:
    'Festzuschuss, Zahnreinigung und Bonusheft bei den elf AOKs, und welche AOK den Bonus als Zuschuss für eine Zahnzusatzversicherung vorsieht.',

  headline: 'AOK Zahnzusatzversicherung: was die AOK beim Zahn zahlt und was ein Zahntarif ergänzt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '60 Prozent', label: 'Festzuschuss ohne Bonusheft, bei Bewilligung bis Ende 2026' },
      { value: 'bis 60 EUR', label: 'je Zahnreinigung, zweimal im Jahr: AOK Hessen und Bremen' },
      { value: '2 von 11 AOKs', label: 'sehen den Bonus als Zuschuss für Zusatzversicherungen vor' },
    ],
    text: 'Beim Zahnersatz gilt für alle AOKs derselbe gesetzliche Festzuschuss. Bei Zahnreinigung und Bonus unterscheiden sich die elf AOKs je nach Region.',
    path: { to: '/zahn#zahn-check', text: 'Was ergänzt den Festzuschuss?', label: 'Zahn-Check starten' },
  },

  lead: 'Beim Zahnersatz zahlt jede AOK denselben gesetzlichen Festzuschuss: 60 Prozent der Regelversorgung, mit Bonusheft 70 oder 75 Prozent, wenn der Zuschuss bis Ende 2026 bewilligt wird. Alles darüber hinaus regelt die einzelne AOK in ihrer Satzung, zum Beispiel den Zuschuss zur Zahnreinigung. Den Bonus als Zuschuss für eine Zahnzusatzversicherung sehen nur die AOK PLUS und die AOK Rheinland/Hamburg vor. Welche AOK für dich zuständig ist, hängt von deinem Wohnort ab.',

  sections: [
    {
      id: 'zahnersatz',
      heading: 'Was zahlt die AOK beim Zahnersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die AOK zahlt beim Zahnersatz einen befundbezogenen Festzuschuss, wie jede gesetzliche Kasse. Der Festzuschuss umfasst 60 Prozent der Regelversorgung. Mit regelmäßigen Kontrollen steigt er auf 70 Prozent, mit zehn Jahren ohne Lücke auf 75 Prozent. Für Zuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50, 60 und 65 Prozent. Was vorher bewilligt wurde, bleibt bei den alten Sätzen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss in Prozent der Regelversorgung, § 55 SGB V bis 31.12.2026 und in der Fassung des GKV-Beitragssatzstabilisierungsgesetzes ab 01.01.2027',
          head: ['Stufe', 'Voraussetzung', 'Bis 31.12.2026', 'Ab 01.01.2027'],
          rows: [
            ['Ohne Bonusheft', 'Keine lückenlosen Kontrollen nachweisbar', '60 Prozent', '50 Prozent'],
            ['Bonus 1', 'Eigene Bemühungen um gesunde Zähne, belegt über die letzten 5 Jahre', '70 Prozent', '60 Prozent'],
            ['Bonus 2', 'Kontrollen in den letzten 10 Kalenderjahren ohne Unterbrechung', '75 Prozent', '65 Prozent'],
            ['Härtefall', 'Unzumutbare Belastung, zum Beispiel bei geringem Einkommen', '100 Prozent (40 Prozent Zusatzbetrag)', '100 Prozent (50 Prozent Zusatzbetrag)'],
          ],
          note: 'Maßgeblich ist das Datum der Bewilligung durch die Kasse. Quelle: § 55 SGB V und BGBl. 2026 I Nr. 228.',
        },
        {
          type: 'paragraph',
          text: 'In Euro heißt das für 2026: Für eine Metallkrone als Regelversorgung (Befund 1.1) setzt der G-BA 398,39 EUR an, der Festzuschuss beträgt 239,03 EUR ohne Bonusheft, 278,87 EUR mit fünf und 298,79 EUR mit zehn Jahren. Bei einer Brücke für eine Lücke mit einem fehlenden Zahn (Befund 2.1) sind es 921,60 EUR Regelversorgung und 552,96, 645,12 und 691,20 EUR Festzuschuss. Ein anderer Zahnersatz kostet mehr, dann trägst du die Mehrkosten selbst.',
        },
      ],
    },
    {
      id: 'rentner',
      heading: 'Zahlt die AOK Rentnern mehr beim Zahnersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein, für Rentner gilt derselbe Festzuschuss wie für alle Versicherten. Hilfreich kann die Härtefallregelung sein: Wer monatliche Bruttoeinnahmen von höchstens 40 Prozent der Bezugsgröße hat, erhält zusätzlich 40 Prozent und damit insgesamt 100 Prozent der Regelversorgung. 2026 liegt diese Grenze bei 1.582,00 EUR im Monat für Alleinstehende und bei 2.175,25 EUR mit einem Angehörigen, für jeden weiteren Angehörigen kommen 395,50 EUR dazu.',
        },
        {
          type: 'paragraph',
          text: 'Eine unzumutbare Belastung liegt nach dem Gesetz auch vor, wenn du bestimmte Sozialleistungen bekommst, etwa Hilfe zum Lebensunterhalt oder Leistungen der bedarfsorientierten Grundsicherung. Einnahmen von Angehörigen im selben Haushalt zählen mit. Ob du die Voraussetzungen erfüllst, prüft die AOK.',
        },
      ],
    },
    {
      id: 'weitere-zahnleistungen',
      heading: 'Was zahlt die AOK beim Zahn über den Zahnersatz hinaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hier unterscheiden sich die AOKs. Kassen dürfen in ihrer Satzung zusätzliche Leistungen zur zahnärztlichen Behandlung vorsehen (§ 11 Abs. 6 SGB V), und die elf regionalen AOKs haben elf Satzungen. Am deutlichsten zeigt sich das bei der professionellen Zahnreinigung, die als Regelleistung keine Kasse zahlt.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschuss zur professionellen Zahnreinigung laut Satzung, regionale AOKs, Satzungen abgerufen am 7. Oktober 2026',
          head: ['AOK', 'Zuschuss laut Satzung', 'Fundstelle'],
          rows: [
            ['AOK Baden-Württemberg', 'Kein Zuschuss in der Satzung, die Reinigung steht nur im Bonusprogramm', '97. Satzungsänderung, 01.01.2026'],
            ['AOK Bayern', 'Zweimal je bis zu 50 EUR im Jahr, ab 15 Jahren', '§ 10o, 71. Nachtrag, 27.02.2026'],
            ['AOK Bremen/Bremerhaven', 'Zweimal je bis zu 60 EUR im Jahr, höchstens die tatsächlichen Kosten', '§ 10i, 55. Änderung, 16.03.2026'],
            ['AOK Hessen', 'Zweimal je bis zu 60 EUR im Jahr, ab 18 Jahren', '§ 16, Lesefassung 01.07.2026'],
            ['AOK Niedersachsen', '80 % der Rechnung, zwei Behandlungen im Jahr, im Gesamtdeckel von 500 EUR mit weiteren Leistungen geteilt', '§ 10g, § 10a Abs. 1, 142. Änderung, 10.03.2026'],
            ['AOK Nordost', 'Bis zu 50 EUR im Jahr, geteilt mit Füllungen, Versiegelung und Analgosedierung', '§ 19h Abs. 1 Nr. 2 und Abs. 4, 52. Nachtrag, 01.07.2026'],
            ['AOK NordWest', 'Zweimal je bis zu 50 EUR im Jahr', '§ 8b Abs. 1 und 2, 41. Nachtrag, 16.12.2025'],
            ['AOK PLUS', 'Bis zu 40 EUR im Kalenderjahr, ab 18 Jahren', '§ 11c Abs. 1, Fassung vom 17.09.2026'],
            ['AOK Rheinland/Hamburg', 'Bis zu 35 EUR, eine Leistung im Jahr, grundsätzlich von 16 bis 25 Jahren', '§ 12f Abs. 1 und 2, 18. Nachtrag, 07.07.2026'],
            ['AOK Rheinland-Pfalz/Saarland', '100 % der Rechnung, bis zu 50 EUR im Jahr, ab 18 Jahren', '§ 31 u Abs. 1 bis 3, Stand 29.07.2026'],
            ['AOK Sachsen-Anhalt', 'Zweimal je bis zu 40 EUR im Jahr, ab 18 Jahren, im Gesamtdeckel von 600 EUR geteilt', '§ 11 l, § 11, 52. Änderung'],
          ],
          note: 'Zuschüsse sind Höchstbeträge und nie mehr als deine Rechnung. Maßgeblich ist die Satzung deiner AOK.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Kosten, Kassen im Vergleich und die Zahnsteinentfernung, die jede Kasse einmal im Jahr zahlt, erklärt der Ratgeber ' },
            { text: 'Professionelle Zahnreinigung', to: '/ratgeber/professionelle-zahnreinigung-kosten' },
            { text: '.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Einzelne AOKs führen weitere Zahnleistungen in der Satzung: die AOK Hessen Lachgas-Sedierung und Zahnversiegelung (§ 12f Abs. 4), die AOK Nordost Mehrkosten bei Füllungen und den Dämmerschlaf bei der Entfernung von Weisheitszähnen (§ 19h), die AOK Rheinland-Pfalz/Saarland im AOK-Zahnkonto Versiegelung und Sedierung bis zu 100 EUR je Kalenderjahr (§ 31 t). Was bei deiner AOK gilt, steht in ihrer Satzung.',
        },
      ],
    },
    {
      id: 'bonusheft',
      heading: 'Was ist der Unterschied zwischen Bonusheft beim Zahnarzt und AOK-Bonusprogramm?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Bonusheft beim Zahnarzt ist gesetzlich geregelt (§ 55 SGB V) und gilt bei jeder AOK gleich. Es belegt deine Kontrollen und erhöht den Festzuschuss beim Zahnersatz, wie die Tabelle oben zeigt. Das Bonusprogramm der AOK ist etwas anderes. Es beruht auf § 65a SGB V und belohnt Vorsorge, Impfungen und Sport nach der Satzung deiner AOK, bei einigen AOKs ebenfalls mit einem Heft, so bei der AOK Niedersachsen.',
        },
        {
          type: 'paragraph',
          text: 'Beides lässt sich nutzen, es sind zwei getrennte Wege. Die Zahnvorsorge bringt in allen elf AOK-Programmen Bonus, nur in unterschiedlicher Höhe, etwa im Wert von 5 EUR bei der AOK Bayern und 15 EUR bei der AOK Hessen. Wie du den Bonus einlöst, regelt jede AOK selbst.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was jede der elf AOKs für die Zahnvorsorge gibt und welche Fristen gelten, steht im Ratgeber ' },
            { text: 'AOK Bonusprogramm 2026', to: '/ratgeber/aok-bonusprogramm-2026' },
            { text: '. Die Stufen des Zahn-Bonusheftes erklärt der Ratgeber ' },
            { text: 'Bonusheft beim Zahnarzt', to: '/ratgeber/bonusheft-zahnarzt' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'zuschuss-zahntarif',
      heading: 'Kann der AOK-Bonus eine Zahnzusatzversicherung mitfinanzieren?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nur bei zwei der elf AOKs, der AOK PLUS und der AOK Rheinland/Hamburg. Dort gibt es einen zweckgebundenen Zuschuss, der auch den Beitrag einer privaten Zusatzversicherung tragen kann. Bei den übrigen neun regeln die Satzungen für das Bonusprogramm der Erwachsenen keinen solchen Zuschuss.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschuss aus dem Bonusprogramm für private Zusatzversicherungen, AOKs im Vergleich',
          head: ['AOK', 'Zuschuss für Zusatzversicherung', 'Fundstelle'],
          rows: [
            ['AOK PLUS (Sachsen, Thüringen)', 'Ja. Wählst du den Zuschuss, sind 100 Punkte 2 EUR wert. Im PLUS Leistungsverzeichnis stehen Zahnersatz und Zahnkronen sowie private Zusatzversicherungsverträge nach § 7 der Satzung', '§ 19a Abs. 7 der Satzung, Teilnahmebedingungen Stand Juni 2026'],
            ['AOK Rheinland/Hamburg (Rheinland, Hamburg)', 'Ja, im Modell Vital+. Jede Maßnahme bringt 1.000 Punkte und damit 20 EUR Zuschuss. Genannt sind Beiträge zu Zusatzversicherungen für Zahnersatz, Brillen oder alternative Behandlungsmethoden', 'Anhang 3 zur Satzung, Ziff. 1.2 und 6.6'],
            ['Die übrigen neun AOKs', 'Die Satzung regelt für das Bonusprogramm der Erwachsenen keinen zweckgebundenen Zuschuss. Die AOK Nordost kennt ihn nur im Kinderbonus bis zum 15. Geburtstag', 'Satzungen der jeweiligen AOK'],
          ],
          note: 'Erstattet wird bei beiden AOKs höchstens, was du an Kosten nachweist, und höchstens der Wert deiner Punkte. Ob ein bestimmter Tarif anerkannt wird, entscheidet die AOK. Beispielwerte aus dem Ratgeber zum AOK-Bonusprogramm, keine Zusagen: AOK Rheinland/Hamburg 100 EUR Zuschuss im Vital+ (zwei Zahnarzttermine, Check-up, Impfung, Präventionskurs), AOK PLUS bis zu 50 EUR (Zahnvorsorge, Check-up, Impfung, Mitgliedschaft).',
        },
        {
          type: 'paragraph',
          text: 'Alle elf AOK-Satzungen sehen vor, dass die AOK private Zusatzversicherungsverträge vermitteln kann (§ 194 Abs. 1a SGB V). Mehrere regeln die Einzelheiten in Verträgen mit privaten Versicherern. Ein solches Angebot ist eine Möglichkeit unter mehreren. Leistungen, Wartezeiten und Beitrag lassen sich mit anderen Tarifen vergleichen.',
        },
        {
          type: 'paragraph',
          text: 'Wenn du den Bonus gezielt für einen Zahntarif nutzen willst, lohnt auch der Blick über die AOK hinaus. Die IKK classic zahlt ihren Bonus laut Satzung wahlweise in dreifacher Höhe als Zuschuss, bis zu 810 EUR Zuschusswert im Jahr, in der breiten Masse sind es 400 bis 700 EUR, jeweils höchstens bis zu den nachgewiesenen Kosten. Gegenzurechnen ist der Zusatzbeitrag: 3,85 Prozent bei der IKK classic, bei den AOKs zwischen 2,47 Prozent (AOK Rheinland-Pfalz/Saarland) und 3,50 Prozent (AOK Nordost), Stand 7. Oktober 2026. Du kannst jede Kasse frei wählen, rechne Zuschuss und Zusatzbeitrag also gegeneinander.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die Rechnung steht im Ratgeber ' },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', einen Vergleich nach Satzungen bietet ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'kostenkarte',
      heading: 'Was bleibt bei einer Brücke mit AOK, Bonusheft und Zahntarif an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nimm die Brücke für eine Lücke mit einem fehlenden Zahn aus dem Abschnitt oben. Den Rest nach dem Festzuschuss trägst du, ein Zahntarif kann ihn erstatten.',
        },
        {
          type: 'costCard',
          title: 'Brücke bei der AOK: Festzuschuss und Eigenanteil',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100 im ersten Kalenderjahr: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR. Der Zahn ging erst nach Vertragsbeginn verloren, bei Vertragsbeginn war nichts angeraten oder geplant, außer in der letzten Zeile.',
          caption: 'Kostenkarte: Brücke als Regelversorgung (Befund 2.1), Festzuschuss bis 31.12.2026',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Ohne Bonusheft (60 Prozent)', '552,96 EUR', '368,64 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Bonusheft 5 Jahre (70 Prozent)', '645,12 EUR', '276,48 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Bonusheft 10 Jahre (75 Prozent)', '691,20 EUR', '230,40 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Brücke in den letzten 2 Jahren vor Abschluss angeraten, ohne Bonusheft', '552,96 EUR', '368,64 EUR', 'Nicht versichert, 368,64 EUR bleiben bei dir'],
          ],
          note: 'Beispiel, keine Preisangabe. Regelversorgung und Festzuschuss: G-BA, Festzuschuss-Richtlinie, Beträge ab 01.01.2026, Befund 2.1 (921,60 EUR); Eigenanteil ist eigene Rechnung. Die Verbraucherzentrale nennt dieselben Werte (Stand 26.01.2026). Annahmen: Die Rechnung entspricht genau der Regelversorgung, alle Kosten sind erstattungsfähig, kein Härtefall. Tarif nach den Unterlagen auf healio.de/zahn, verbindlich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen, wenn deine Kasse ihn als Zuschuss zu einer Zusatzversicherung vorsieht. Bei den AOKs sind das die AOK PLUS und die AOK Rheinland/Hamburg. Wie viel, hängt von deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'zahntarif',
      heading: 'Welche Zahnzusatzversicherung zeigt Healio für AOK-Versicherte?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Healio zeigt zwei Wege, getrennt nach deiner Zahnsituation. Wurde bei dir in den letzten 2 Jahren nichts empfohlen und läuft nichts, ist es die UKV ZahnPRIVAT mit drei Leistungsstufen ohne Wartezeiten, bei 1 bis 3 fehlenden Zähnen mit Risikozuschlag je Zahn. In ZahnPRIVAT 100 erstattet der Tarif 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet.',
        },
        {
          type: 'paragraph',
          text: 'Für Behandlungen, die in den letzten 2 Jahren empfohlen oder geplant wurden oder schon laufen, gibt es den Baustein ZAHN Sofort der Bayerischen. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR, der Abschluss muss vor der Rechnung erfolgen. Dafür gelten Voraussetzungen, die du im Überblick zur Bayerischen findest.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Stufen, Zahnstaffel und Grenzen der UKV stehen im Überblick ' },
            { text: 'UKV Zahnzusatzversicherung', to: '/ratgeber/ukv-zahnzusatzversicherung' },
            { text: ', den Sofortschutz erklärt der Überblick ' },
            { text: 'Bayerische Zahnzusatzversicherung', to: '/ratgeber/bayerische-zahnzusatzversicherung' },
            { text: '.' },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Vier kurze Fragen, keine Kontaktdaten: Der Zahn-Check zeigt, welcher Weg bei deiner Zahnsituation offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'ehrlich',
      heading: 'Wo hat der Weg über die AOK Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Beim Zahnersatz sind alle AOKs gleich, bei allem anderen nicht.', text: 'Zahnreinigung, weitere Zahnleistungen und Bonus regelt jede AOK selbst. Beträge einer anderen AOK gelten für dich nicht.' },
            { lead: 'Nur zwei AOKs sehen den Bonus als Zuschuss für Zusatzversicherungen vor.', text: 'Bei der AOK PLUS und der AOK Rheinland/Hamburg ist das so. Ob dein Tarif anerkannt wird, entscheidet die AOK, und erstattet wird höchstens, was du nachweist.' },
            { lead: 'Zuschüsse sind Höchstbeträge.', text: 'Mehr als deine Rechnung gibt es nie, und Satzungen ändern sich. Maßgeblich ist die Satzung deiner AOK zum Zeitpunkt deiner Rechnung.' },
            { lead: 'Ein Zahntarif ist für künftige Kosten da.', text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'comparison',
              tone: 'mint',
              title: 'Zahnersatz Kosten',
              text: 'Was die Kasse zahlt und was bei dir bleibt.',
              to: '/ratgeber/zahnersatz-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'Bonusheft beim Zahnarzt',
              text: 'Fünf oder zehn Jahre lückenlos und was das bringt.',
              to: '/ratgeber/bonusheft-zahnarzt',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'prevention',
              tone: 'sky',
              title: 'Professionelle Zahnreinigung',
              text: 'Was sie kostet und was 27 Kassen dazugeben.',
              to: '/ratgeber/professionelle-zahnreinigung-kosten',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was zahlt die AOK beim Zahnersatz?',
      answer:
        'Den gesetzlichen Festzuschuss: 60 Prozent der Regelversorgung, mit Bonusheft 70 oder 75 Prozent, wenn er bis Ende 2026 bewilligt wird. Für ab 2027 bewilligte Zuschüsse gelten 50, 60 und 65 Prozent. Bei einer Metallkrone sind das 2026 239,03, 278,87 und 298,79 EUR.',
    },
    {
      question: 'Zahlt die AOK Zahnersatz für Rentner?',
      answer:
        'Rentner bekommen denselben Festzuschuss wie alle Versicherten. Bei geringem Einkommen kann die Härtefallregelung greifen: Dann zahlt die Kasse 100 Prozent der Regelversorgung. 2026 liegt die Grenze für Alleinstehende bei 1.582,00 EUR Bruttoeinnahmen im Monat, mit einem Angehörigen bei 2.175,25 EUR.',
    },
    {
      question: 'Zahlt die AOK eine Zahnzusatzversicherung?',
      answer:
        'Die AOK ist keine Zusatzversicherung. Zwei AOKs, die AOK PLUS und die AOK Rheinland/Hamburg, sehen in ihren Bonusregeln einen zweckgebundenen Zuschuss vor, der auch Beiträge zu privaten Zusatzversicherungen tragen kann. Bei den übrigen neun regeln die Satzungen für Erwachsene keinen solchen Zuschuss.',
    },
    {
      question: 'Wie viel zahlt die AOK für die Zahnreinigung?',
      answer:
        'Das hängt von der AOK ab. Die AOK Hessen und die AOK Bremen/Bremerhaven zahlen je Reinigung bis zu 60 EUR, zweimal im Jahr, die AOK PLUS bis zu 40 EUR im Jahr, die AOK Baden-Württemberg hat keinen Zuschuss in der Satzung. Alle elf stehen in der Tabelle oben.',
    },
    {
      question: 'Gilt das Bonusheft vom Zahnarzt auch bei der AOK?',
      answer:
        'Ja, das Bonusheft beim Zahnarzt gilt bei jeder gesetzlichen Kasse, auch bei der AOK. Mit lückenlosen Kontrollen steigt der Festzuschuss beim Zahnersatz von 60 auf 70 oder 75 Prozent, wenn er bis Ende 2026 bewilligt wird.',
    },
    {
      question: 'Bringt die Zahnvorsorge Punkte im AOK-Bonusprogramm?',
      answer:
        'Ja, alle elf AOK-Programme bonifizieren die Zahnvorsorge, etwa im Wert von 5 EUR bei der AOK Bayern und 15 EUR bei der AOK Hessen. Beträge, Einlösung und Fristen deiner AOK stehen im Ratgeber zum AOK-Bonusprogramm.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Schau in die Satzung deiner AOK und notiere, was sie zur Zahnreinigung und zum Bonus sagt. Welcher Zahn-Weg zu deiner Situation passt, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse beim Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Festzuschuss und Härtefall stammen aus Gesetz und G-BA-Richtlinie, die Zuschüsse und Bonusregeln aus den Satzungen der AOKs.',
    items: [
      {
        label: 'SGB V § 55 Leistungsanspruch auf Festzuschüsse beim Zahnersatz',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: 'Fassung bis 31.12.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz (Verkündung)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026, Befunde 1.1 und 2.1',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Härtefallregelung beim Zahnersatz: Wer hat Anspruch?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/haertefallregelung-beim-zahnersatz-wer-hat-anspruch-12887',
        stand: '27.01.2026',
        accessedAt: '07.10.2026',
        note: 'Einkommensgrenzen für den Härtefall 2026',
      },
      {
        label: 'Festzuschuss und Eigenanteil (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/patient-und-krankenkasse/zahnersatz/festzuschuesse-zum-zahnersatz/',
        stand: '01.01.2026',
        accessedAt: '07.10.2026',
        note: 'Einkommensgrenzen für den Härtefall 2026',
      },
      {
        label: 'Zahnersatz: Wie viel übernimmt die gesetzliche Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnersatz-wie-viel-uebernimmt-die-gesetzliche-krankenkasse-12884',
        stand: '26.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 11, Abs. 6 (Mehrleistungen in der Satzung)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 194, Abs. 1a (Vermittlung privater Zusatzversicherungen)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__194.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Baden-Württemberg',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/baden-wuerttemberg/pdf/Satzung.pdf',
        stand: '97. Satzungsänderung, 01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Bayern',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/bayern/pdf/noindex/Satzung/satzung.pdf',
        stand: '71. Nachtrag, 27.02.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Bremen/Bremerhaven',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/bremen-bremerhaven/pdf/2026/PDF/55._%C3%84nderung_der_Satzung_Stand_01.04.2026.pdf',
        stand: '55. Änderung vom 16.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Hessen',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/hessen/pdf/satzung-kv.pdf',
        stand: 'Lesefassung 01.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Niedersachsen',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/niedersachsen/pdf/Satzung_AOK_Niedersachsen.pdf',
        stand: '142. Änderung vom 10.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Nordost',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/nordost/pdf/noindex/aok-no-satzung-krankenkasse.pdf',
        stand: '52. Nachtrag, ab 01.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK NordWest',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/nordwest/pdf/satzung.pdf',
        stand: '41. Nachtrag, 16.12.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK PLUS, § 11c, § 19a',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/plus/pdf/satzung.pdf',
        stand: 'Fassung vom 17.09.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Teilnahmebedingungen Bonusprogramm mit PLUS Leistungsverzeichnis',
        publisher: 'AOK PLUS',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/plus/pdf/noindex/bonusprogramm-teilnahmebedingungen.pdf',
        stand: 'Stand Juni 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Rheinland/Hamburg mit Anhang 3',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/fileadmin/user_upload/AOK-Rheinland-Hamburg/05-Content-PDF/satzung_kk_aokrhh.pdf',
        stand: '18. Nachtrag vom 07.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Rheinland-Pfalz/Saarland',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/rheinland-pfalz-saarland/pdf/Satzung/Satzung_29072026.pdf',
        stand: 'Datei vom 29.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung AOK Sachsen-Anhalt',
        publisher: 'AOK',
        href: 'https://www.deine-gesundheitswelt.de/die-aok/satzung/satzung-der-aok-sachsen-anhalt-die-gesundheitskasse',
        stand: '52. Änderung, Änderungsübersicht bis 01.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Krankenkassenliste mit Zusatzbeiträgen',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp',
        stand: 'Listenstand 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Bonusregeln der elf AOKs 2026, Belegketten für kassenboost.de',
        publisher: 'KassenBoost',
        stand: '26.08.2026, nachgeprüft 06.10.2026',
        note: 'Beträge je Maßnahme wie im Ratgeber zum AOK-Bonusprogramm 2026.',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        stand: '05.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu den AOKs nach den am 7. Oktober 2026 abgerufenen Satzungen, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer die Satzung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
