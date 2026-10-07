/**
 * Zahn-Ratgeber Welle 1, Seite Z1: Professionelle Zahnreinigung, Kosten und
 * Kassenzuschuss.
 *
 * Quellen (Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abruf
 * 06.10.2026): Teil A (Satzungszuschüsse AOK Hessen, Niedersachsen,
 * Rheinland-Pfalz/Saarland, Sachsen-Anhalt, Bremen/Bremerhaven, TK, BARMER),
 * B1 (PZR keine Regelleistung, BEMA 107, GOZ 1040 mit 1,57 / 3,62 / 5,51 EUR
 * je Zahn, Sitzungskosten laut KZBV, Verbraucherzentrale und IQWiG), B7
 * (Verbraucherzentrale zu gedeckelter PZR im Tarif) sowie PZR-KASSEN-TABELLE.md
 * (Kassentabelle mit Fundstelle). Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Empfehlung, wie oft eine PZR sinnvoll ist. Der IQWiG-Satz zum
 *     unklaren Nutzen steht als Fakt, nicht als Rat.
 *   - Die Kostenkarte rechnet mit ZahnPRIVAT 100 (PZR ohne Jahresdeckel) und
 *     schreibt keinen Rest von null, sondern "der Tarif erstattet den
 *     erstattungsfähigen Rest". ZahnPRIVAT 75 wird für die PZR nicht
 *     herangezogen, ZahnPRIVAT 90 ohne Prozentsatz.
 *   - Die AOK-Tabelle enthält alle elf AOKs, seit der Faktenprüfung vom
 *     06.10.2026 auch die AOK PLUS (Zeile aus PZR-KASSEN-TABELLE.md,
 *     KassenBoost-Erhebung, Satzung § 11c). Gesperrt bleiben nur
 *     Bonus-Aussagen zur AOK PLUS.
 *   - Der Rechner-Block fehlt bewusst (Briefing Abschnitt 5, Z1).
 *
 * Faktenprüfung 06.10.2026: Healio/Ratgeber/zahn-ratgeber-belege/PRUEFBERICHT-WELLE1.md
 */

export const article = {
  slug: 'professionelle-zahnreinigung-kosten',
  kind: 'ratgeber',

  metaTitle: 'Professionelle Zahnreinigung: Kosten und Kassenzuschuss | Healio',
  metaDescription:
    'Was eine professionelle Zahnreinigung kostet und welche Krankenkasse wie viel dazugibt: AOK, TK, BARMER, DAK, IKK classic und weitere, mit Satzungsfundstelle.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Professionelle Zahnreinigung: Kosten und was deine Kasse dazugibt',
  listTeaser:
    'Was eine Zahnreinigung kostet und was 27 Krankenkassen laut Satzung dazugeben, alle elf AOKs eingeschlossen, mit Fundstelle und Stand.',

  headline: 'Professionelle Zahnreinigung: Kosten und was deine Kasse dazugibt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '80 bis 120 EUR', label: 'kostet eine Sitzung im Durchschnitt laut KZBV' },
      { value: 'bis zu 40 EUR', label: 'im Jahr gibt die TK laut Satzung dazu' },
      { value: 'bis zu 120 EUR', label: 'im Jahr gibt die AOK Hessen für zwei Reinigungen' },
    ],
    text: 'Ob deine Kasse etwas dazugibt, steht in ihrer Satzung.',
    path: { to: '/zahn#zahn-check', text: 'Zahnreinigung mitversichern?', label: 'Zahn-Check starten' },
  },

  lead: 'Die professionelle Zahnreinigung kostet bei durchschnittlichem Aufwand laut KZBV 80 bis 120 EUR je Sitzung. Eine Regelleistung der gesetzlichen Kassen ist sie nicht, viele Kassen geben aber über ihre Satzung etwas dazu. Wie viel das ist und unter welchen Bedingungen, zeigen die Tabellen unten für 27 Kassen, darunter alle elf AOKs.',

  sections: [
    {
      id: 'was-ist-eine-pzr',
      heading: 'Was ist eine professionelle Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der professionellen Zahnreinigung, kurz PZR, entfernt die Praxis Beläge auf Zähnen und Wurzeloberflächen, reinigt die Zahnzwischenräume, entfernt den Biofilm und poliert die Oberflächen, dazu kommt eine geeignete Fluoridierung. So beschreibt es die Gebührenordnung für Zahnärzte unter der Nummer 1040, nach der die Praxis auch abrechnet.',
        },
        {
          type: 'paragraph',
          text: 'Ob die PZR besser vor Karies, Zahnfleischentzündungen oder Parodontitis schützt als die Zahnsteinentfernung, die die Kassen bezahlen, lässt sich laut IQWiG derzeit nicht eindeutig beurteilen. Wie oft eine Reinigung passt, entscheidet deine Praxis nach deinem Befund.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine professionelle Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Praxis rechnet je Zahn nach GOZ-Nummer 1040 ab. Die Nummer hat 28 Punkte, ein Punkt ist 5,62421 Cent wert, und der Faktor liegt zwischen dem Einfachen und dem Dreieinhalbfachen. Das ergibt je Zahn 1,57 EUR beim einfachen, 3,62 EUR beim 2,3-fachen und 5,51 EUR beim 3,5-fachen Satz, dieselben Werte nennt die Verbraucherzentrale. Bei 28 Zähnen und dem 2,3-fachen Satz sind das 101,36 EUR ohne weitere Positionen (eigene Rechnung).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Kosten einer professionellen Zahnreinigung je Sitzung laut drei Quellen',
          head: ['Quelle', 'Kosten je Sitzung', 'Stand'],
          rows: [
            ['KZBV', '80 bis 120 EUR bei durchschnittlichem Aufwand', 'Mai 2025'],
            ['Verbraucherzentrale', 'meist 80 bis 120 EUR, teilweise mehr als 150 EUR', '28.05.2024'],
            ['IQWiG', 'meist 100 bis 200 EUR', '23.08.2023'],
          ],
          note: 'Die Spannen weichen voneinander ab. Jahrespauschalen für mehrere Reinigungen im Voraus sind laut Verbraucherzentrale unzulässig (Verwaltungsgericht Münster, März 2016).',
        },
      ],
    },
    {
      id: 'kasse-zahlt',
      heading: 'Zahlt die Krankenkasse die professionelle Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Als Regelleistung nicht. Laut KZBV ist die Prophylaxe mit PZR keine regelhafte Leistung der gesetzlichen Krankenversicherung, und auch Verbraucherzentrale und IQWiG sagen, dass du sie normalerweise selbst bezahlst.',
        },
        {
          type: 'paragraph',
          text: 'Die Kasse bezahlt dafür die Zahnsteinentfernung, einmal im Kalenderjahr (BEMA-Nummer 107). Bei Versicherten mit Pflegegrad oder Eingliederungshilfe ist sie einmal im Kalenderhalbjahr möglich (BEMA-Nummer 107a).',
        },
        {
          type: 'paragraph',
          text: 'Darüber hinaus dürfen Kassen in ihrer Satzung Zuschüsse zur Zahnbehandlung vorsehen (§ 11 Abs. 6 SGB V). Eine Pflicht ist das nicht, und so unterscheiden sich die Zuschüsse von Kasse zu Kasse.',
        },
      ],
    },
    {
      id: 'aok',
      heading: 'Was zahlt die AOK zur Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Jede regionale AOK hat ihre eigene Satzung, eine einheitliche AOK-Regel gibt es nicht. Die Tabelle zeigt alle elf.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschuss zur professionellen Zahnreinigung laut Satzung, regionale AOKs, Stand der Satzungen Oktober 2026',
          head: ['Kasse', 'Zuschuss laut Satzung', 'Bedingungen', 'Fundstelle und Stand'],
          rows: [
            ['AOK Baden-Württemberg', 'kein Zuschuss in der Satzung', 'Satzung nennt Zahnreinigung nicht, nur das Bonusprogramm', '97. Satzungsänderung, 01.01.2026'],
            ['AOK Bayern', 'zweimal je bis zu 50 EUR, bis zu 100 EUR im Jahr', 'ab 15 Jahren, Vertragszahnarzt, Rechnung', '§ 10o Abs. 1 und 2, 71. Nachtrag, 27.02.2026'],
            ['AOK Bremen/Bremerhaven', 'zweimal je bis zu 60 EUR, bis zu 120 EUR im Jahr', 'tatsächliche Kosten, keine Altersgrenze', '§ 10i Abs. 1 bis 3, 55. Änderung, 16.03.2026'],
            ['AOK Hessen', 'zweimal je bis zu 60 EUR, bis zu 120 EUR im Jahr', 'ab 18 Jahren', '§ 16 Abs. 1 und 2, Lesefassung 01.07.2026'],
            ['AOK Niedersachsen', '80 % der Rechnung, zwei Behandlungen im Jahr', 'Gesamtdeckel 500 EUR im Jahr, geteilt mit weiteren Mehrleistungen', '§ 10g, § 10a Abs. 1, 142. Änderung, 10.03.2026'],
            ['AOK Nordost', 'bis zu 50 EUR im Jahr', 'Topf geteilt mit Füllungen, Versiegelung, Analgosedierung, Gesamtdeckel 218 EUR, Antrag bis 31.03. des Folgejahres', '§ 19h Abs. 1 Nr. 2 und Abs. 4, § 19 Abs. 2, 52. Nachtrag, 01.07.2026'],
            ['AOK NordWest', 'zweimal je bis zu 50 EUR, bis zu 100 EUR im Jahr', 'ohne die sonst übliche Kürzung auf 80 %', '§ 8b Abs. 1 und 2, 41. Nachtrag, 16.12.2025'],
            ['AOK PLUS', 'bis zu 40 EUR im Kalenderjahr', 'ab 18 Jahren, während einer festen Zahnspange stattdessen bis zu 50 EUR je Halbjahr für erweiterte Prophylaxe', '§ 11c Abs. 1 und 2, Fassung vom 01.02.2025'],
            ['AOK Rheinland/Hamburg', 'bis zu 35 EUR, eine Sitzung im Jahr', 'nur von 16 bis 25 Jahren, Bestandsschutz bei Beginn vor dem 26. Geburtstag', '§ 12f Abs. 1 und 2, 18. Nachtrag, 07.07.2026'],
            ['AOK Rheinland-Pfalz/Saarland', '100 % der Rechnung, bis zu 50 EUR im Jahr', 'ab 18 Jahren', '§ 31u Abs. 1 bis 3, Stand 29.07.2026'],
            ['AOK Sachsen-Anhalt', 'zweimal je bis zu 40 EUR, bis zu 80 EUR im Jahr', 'ab 18 Jahren, Gesamtdeckel 600 EUR im Jahr (Gesundes Konto)', '§ 11l, § 11, 52. Änderung, 01.07.2026'],
          ],
          note: 'Zuschüsse sind Höchstbeträge und nie mehr als deine Rechnung. Maßgeblich ist die Satzung deiner AOK.',
        },
      ],
    },
    {
      id: 'weitere-kassen',
      heading: 'Was zahlen TK, BARMER, DAK und die anderen Kassen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'BARMER, hkk, Knappschaft, SBK und Pronova BKK zahlen Erwachsenen keinen allgemeinen Satzungszuschuss. TK, DAK-Gesundheit, IKK classic, KKH und weitere Kassen geben etwas dazu.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschuss zur professionellen Zahnreinigung laut Satzung, weitere Kassen, Stand der Satzungen Oktober 2026',
          head: ['Kasse', 'Zuschuss laut Satzung', 'Bedingungen', 'Fundstelle und Stand'],
          rows: [
            ['TK', 'bis zu 40 EUR im Kalenderjahr', 'ab 18 Jahren, nachgewiesene Kosten', '§ 27o Abs. 1 bis 3, 130. Nachtrag, 17.04.2026'],
            ['BARMER', 'kein allgemeiner Satzungszuschuss', 'nur in der Schwangerschaft (Topf 200 EUR), sonst nur im Bonusprogramm', '§ 28d Abs. 1 Nr. 2, Abs. 3, 38. Nachtrag, 21.07.2026'],
            ['DAK-Gesundheit', '60 EUR im Kalenderjahr', 'Rechnung bis 31.03. des Folgejahres, Schwangere mit eigener Regel', '§ 19 Abs. 6 (Schwangere § 19a Abs. 10), 66. Nachtrag'],
            ['IKK classic', 'bis zu 40 EUR im Kalenderjahr', 'Zahl der Sitzungen nicht begrenzt, Rechnung einreichen', '§ 34j Abs. 2, Stand 01.08.2026'],
            ['KKH', 'zweimal 60 EUR, bis zu 120 EUR im Jahr', 'ohne Altersgrenze', '§ 29o Abs. 1 und 2, Stand Mai 2026'],
            ['hkk', 'kein Satzungszuschuss', 'Zahnkatalog kennt nur Vollnarkose, Lachgas, Fissurenversiegelung', '§ 25 i. V. m. § 25b Abs. 5, 27.05.2026'],
            ['HEK', '10 EUR im Kalenderjahr', 'ab 16 Jahren, in der Schwangerschaft einmalig die ganze Rechnung', '§ 24d Abs. 2, § 24b Abs. 3, 116. Nachtrag, 31.07.2026'],
            ['Knappschaft', 'kein Satzungszuschuss', 'nur über das gesundPlus-Guthaben, dann ohne AktivBonus', '§§ 57 bis 57l, § 68a Abs. 4'],
            ['mkk', 'zweimal je bis zu 40 EUR, bis zu 80 EUR im Jahr', 'höchstens die tatsächlichen Kosten, auf ein Jahresbudget von 500 EUR angerechnet', '§ 13 Abs. 15 Nr. 1 und 2, 38. Nachtrag'],
            ['Mobil Krankenkasse', '100 % der Rechnung, höchstens 60 EUR je Behandlung, zwei im Jahr', 'Jahrestopf von 200 EUR, geteilt mit Osteopathie und Retainer', '§ 10b Abs. 8 Nr. 2, Stand 01.01.2026'],
            ['SBK', 'kein Satzungszuschuss', 'einzige Zahn-Mehrleistung ist der festsitzende Retainer', '§ 22 i. V. m. § 22e, Stand 19.03.2026'],
            ['BKK firmus', 'bis zu 100 EUR im Kalenderjahr', 'ohne Altersgrenze, Sitzungen nicht begrenzt', '§ 12 Abschnitt XII, Stand 17.07.2026'],
            ['IKK Die Innovationskasse', 'zwei Reinigungen, zusammen bis zu 250 EUR im Jahr', 'ohne Bonusteilnahme', '§ 26e Abs. 2, 130. Nachtrag, 02.07.2026'],
            ['Pronova BKK', 'kein Satzungszuschuss', 'nur als Maßnahme im Bonusprogramm', '§ 14 Abs. XIII, § 27 Abs. I, Stand 01.01.2026'],
            ['VIACTIV', 'zweimal 30 EUR, bis zu 60 EUR im Jahr', 'Einzelheiten in der Satzung', '§ 12f, 18. Nachtrag, gültig ab 01.01.2026'],
            ['TUI BKK', '75 % von höchstens 65 EUR je Sitzung (bis zu 48,75 EUR), zweimal im Jahr', 'Einzelheiten in der Satzung', '§ 12 Abs. VI, 97. Nachtrag'],
          ],
          note: 'Zuschüsse sind Höchstbeträge und nie mehr als deine Rechnung. Fehlt deine Kasse, steht ihr Zuschuss in ihrer Satzung.',
        },
        {
          type: 'paragraph',
          text: 'Achte auf geteilte Töpfe. Bei der AOK Niedersachsen, der AOK Sachsen-Anhalt, der AOK Nordost, der mkk und der Mobil Krankenkasse teilt sich die Reinigung einen Jahresrahmen mit anderen Leistungen (Spalte Bedingungen). Was du dort für anderes bekommst, bleibt für die Reinigung nicht mehr übrig.',
        },
      ],
    },
    {
      id: 'satzung-oder-bonus',
      heading: 'Was ist der Unterschied zwischen Satzungszuschuss und Bonusprogramm?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ein Satzungszuschuss steht als Mehrleistung in der Satzung der Kasse. Du reichst die Rechnung ein und bekommst den Zuschuss, wenn die Bedingungen passen. Ein Bonusprogramm (§ 65a SGB V) belohnt dagegen gesundheitsbewusstes Verhalten wie Vorsorgeuntersuchungen oder Sport. Bei einigen Kassen gibt es für Erwachsene nur dort etwas zur Reinigung, etwa bei BARMER, Pronova BKK und AOK Baden-Württemberg.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Viele Kassen zahlen ihren Bonus auf Wunsch als Zuschuss zu einer Zusatzversicherung, wie viel das bringt, hängt von Kasse und Aktivitäten ab. Ein Beispiel ist das ' },
            { text: 'Bonusprogramm der IKK classic 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '. Gegenzurechnen ist immer der Zusatzbeitrag der Kasse, und du kannst jede Kasse wählen. Einen Vergleich bietet ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ' quellenbelegt anhand der Satzungen.' },
          ],
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Zahlt eine Zahnzusatzversicherung die professionelle Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt vom Tarif ab. Bei der UKV ZahnPRIVAT gibt es die professionelle Zahnreinigung in den Top-Stufen. ZahnPRIVAT 100 hat keine Wartezeiten und leistet für die professionelle Zahnreinigung ohne Jahresdeckel. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet.',
        },
        {
          type: 'paragraph',
          text: 'Schau bei jedem Tarif auf den Deckel. Laut Verbraucherzentrale ist die Reinigung in vielen Tarifen gedeckelt, zum Beispiel auf 100 EUR im Kalenderjahr.',
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Gehört die Reinigung bei dir regelmäßig dazu, ist ZahnPRIVAT ein Vergleichsweg.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'rechenbeispiel',
      heading: 'Was bleibt bei zwei Reinigungen im Jahr an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ein Rechenbeispiel mit drei Kassen. Angenommen sind zwei Reinigungen im Jahr für je 100 EUR, die Mitte der KZBV-Spanne.',
        },
        {
          type: 'costCard',
          title: 'Zwei Zahnreinigungen im Jahr',
          icon: 'calculator',
          tariffLabel: 'Beispiel für das Kalenderjahr 2026 mit UKV ZahnPRIVAT 100, Satzungsstand Oktober 2026, für eine Person ab 18 Jahren.',
          caption: 'Kostenkarte: zwei Zahnreinigungen zu je 100 EUR',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['AOK Hessen, zwei Reinigungen zu je 100 EUR', '120 EUR (zweimal 60 EUR)', '80 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['TK, zwei Reinigungen zu je 100 EUR', 'bis zu 40 EUR im Jahr', '160 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Kasse ohne Satzungszuschuss, zum Beispiel hkk', 'kein Satzungszuschuss', '200 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
          ],
          note: 'Beispiel, keine Preisangabe. Kassenzuschuss laut Satzung AOK Hessen (§ 16, Lesefassung 01.07.2026), TK (§ 27o, Stand 17.04.2026) und hkk (§ 25b, Stand 27.05.2026). Tarif nach den Unterlagen auf healio.de/zahn. Was im Einzelfall erstattungsfähig ist, steht in den Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Tabellen sind eine Momentaufnahme.', text: 'Stand der Satzungen ist Oktober 2026, Kassen können ihre Satzung ändern. Das Gesetz lässt Zuschüsse zur Zahnbehandlung auch ab 2027 zu, ob deine Kasse ihren behält, ist offen.' },
            { lead: 'Maßgeblich ist die Satzung deiner Kasse.', text: 'Prüfe dort Alter, Einreichfrist und geteilte Töpfe.' },
            { lead: 'Ein Zahntarif ist für künftige Kosten da.', text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert.' },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Vier kurze Fragen, dann siehst du den Tarifweg, den du als Nächstes prüfen kannst.',
          label: 'Zahn-Check starten',
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
              icon: 'dental',
              tone: 'sky',
              title: 'Wurzelbehandlung',
              text: 'Wann die Kasse zahlt und was privat kostet.',
              to: '/ratgeber/wurzelbehandlung-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'butter',
              title: 'Zahnzusatzversicherung ohne Wartezeit',
              text: 'Was ab dem ersten Tag gilt und wo die Staffel greift.',
              to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'dental',
              tone: 'lavender',
              title: 'Zahnzusatzversicherung bei fehlendem Zahn',
              text: 'Was bei ein bis drei fehlenden Zähnen geht.',
              to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn',
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
      question: 'Was kostet eine professionelle Zahnreinigung?',
      answer:
        'Laut KZBV bei durchschnittlichem Aufwand 80 bis 120 EUR je Sitzung (Stand Mai 2025). Das IQWiG nennt meist 100 bis 200 EUR (Stand 23.08.2023).',
    },
    {
      question: 'Wie viel zahlt die TK zur Zahnreinigung?',
      answer:
        'Bis zu 40 EUR je Kalenderjahr, ab 18 Jahren und auf Grundlage der nachgewiesenen Kosten (§ 27o der TK-Satzung, 130. Nachtrag, Stand 17.04.2026).',
    },
    {
      question: 'Wie viel zahlt die BARMER zur Zahnreinigung?',
      answer:
        'Einen allgemeinen Satzungszuschuss für Erwachsene gibt es nicht. In der Schwangerschaft erstattet sie die Reinigung aus dem Topf von 200 EUR je Schwangerschaft, wenn ein individueller Anlass vorliegt. Sonst taucht die Reinigung nur im Bonusprogramm auf.',
    },
    {
      question: 'Wie viel zahlt die AOK zur Zahnreinigung?',
      answer:
        'Das hängt von der regionalen AOK ab. Die AOK Hessen und die AOK Bremen/Bremerhaven zahlen je Reinigung bis zu 60 EUR, zweimal im Jahr, die AOK Baden-Württemberg hat in ihrer Satzung keinen Zuschuss. Die Werte aller elf AOKs stehen in der Tabelle oben.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung die Zahnreinigung?',
      answer:
        'Bei der UKV ZahnPRIVAT je nach Tarifstufe, in ZahnPRIVAT 100 ohne Jahresdeckel. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Maßgeblich sind die Tarifbedingungen.',
    },
    {
      question: 'Wie oft ist eine professionelle Zahnreinigung sinnvoll?',
      answer:
        'Das entscheidet deine Praxis nach deinem Befund.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welcher Zahn-Weg zu deiner Situation passt, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse bei Zahnersatz zahlt und welche Behandlung was kostet, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Kosten, Kassenleistung und die Zuschüsse der Tabellen stammen aus diesen Quellen.',
    items: [
      {
        label: 'Professionelle Zahnreinigung (Patienteninfo)',
        publisher: 'KZBV',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/',
        stand: 'Mai 2025',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Was kostet eine professionelle Zahnreinigung?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/was-kostet-eine-professionelle-zahnreinigung-12916',
        stand: '28.05.2024',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Welche Vor- und Nachteile hat die professionelle Zahnreinigung?',
        publisher: 'IQWiG (gesundheitsinformation.de)',
        href: 'https://www.gesundheitsinformation.de/welche-vor-und-nachteile-hat-die-professionelle-zahnreinigung.html',
        stand: '23.08.2023',
        accessedAt: '06.10.2026',
      },
      {
        label: 'BEMA, Nr. 107 und 107a',
        publisher: 'KZBV',
        href: 'https://www.kzbv.de/wp-content/uploads/KZBV_BEMA_2026-01-01.pdf',
        stand: '01.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GOZ, Anlage 1, Nr. 1040',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/goz_1987/anlage_1.html',
        stand: '05.12.2011',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GOZ § 5',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/goz_1987/__5.html',
        stand: 'zuletzt geändert 05.12.2011',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Zahnzusatzversicherung, Risiken und Vorteile',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293',
        stand: '23.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 11, Abs. 6',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        stand: '06.10.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung der TK',
        publisher: 'Techniker Krankenkasse',
        href: 'https://www.tk.de/resource/blob/2077108/5892771f11e082ade44439e64bbda68c/tk-satzung-data.pdf',
        stand: '130. Nachtrag, 17.04.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung der BARMER',
        publisher: 'BARMER',
        href: 'https://www.barmer.de/resource/blob/1022552/b2c26cec88be1e70caad268f9961fd09/barmer-satzung-der-barmer-barrierefrei-19-data.pdf',
        stand: '38. Nachtrag, 21.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung AOK Hessen',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/hessen/pdf/satzung-kv.pdf',
        stand: 'Lesefassung 01.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung AOK Niedersachsen',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/niedersachsen/pdf/Satzung_AOK_Niedersachsen.pdf',
        stand: '142. Änderung vom 10.03.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung AOK Rheinland-Pfalz/Saarland',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/rheinland-pfalz-saarland/pdf/Satzung/Satzung_29072026.pdf',
        stand: '29.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung AOK Sachsen-Anhalt',
        publisher: 'AOK',
        href: 'https://www.deine-gesundheitswelt.de/die-aok/satzung/satzung-der-aok-sachsen-anhalt-die-gesundheitskasse',
        stand: '52. Änderung, in Kraft seit 01.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzung AOK Bremen/Bremerhaven',
        publisher: 'AOK',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/bremen-bremerhaven/pdf/2026/PDF/55._%C3%84nderung_der_Satzung_Stand_01.04.2026.pdf',
        stand: '55. Änderung vom 16.03.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Satzungen der übrigen Kassen, Erhebung für kassenboost.de',
        publisher: 'KassenBoost',
        stand: '26.08.2026',
        note: 'Fundstelle je Kasse in der Tabelle',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        stand: '05.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Kassenzuschüsse nach dem Stand der Satzungen im Oktober 2026, Kosten nach den genannten Quellen. Maßgeblich sind immer die Satzung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
