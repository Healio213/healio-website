/**
 * Zahn-Ratgeber Welle 1, Seite Z6: Zahnzusatzversicherung ohne Wartezeit.
 *
 * Quellen (Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abruf
 * 06.10.2026): B7 (§ 197 VVG, Verbraucherzentrale zu Wartezeit, Zahnstaffel
 * und angeratenen Behandlungen), B2 (Einzelzahn-Implantat 1.500 bis 3.500 EUR
 * laut Verbraucherzentrale), B4 und B5 (Festzuschuss Befund 2.1 mit
 * 921,60 EUR Regelversorgung, 60 Prozent bis 31.12.2026). Tarifaussagen
 * wortgleich mit src/components/sections/dental/dentalContent.js (UKV
 * ZahnPRIVAT 75, 90 und 100, Zahnstaffel, Zwei-Jahres-Regel, ZAHN Sofort).
 *
 * Bewusste Grenzen:
 *   - § 197 VVG steht nur mit seinem Wortlaut. Der Gesetzestext nennt die
 *     Krankheitskostenversicherung ohne Unterscheidung zwischen Voll- und
 *     Zusatzversicherung; dass er Zahnzusatztarife ausdrücklich nennt, wird
 *     nicht behauptet (Beleg B7: Einordnung nicht belegt).
 *   - Zahnstaffel: keine gesetzliche Grenze belegt, die Seite sagt nur, dass
 *     sie keine Wartezeit ist.
 *   - ZahnPRIVAT 90 ohne Prozentsatz, ZAHN Sofort ohne Beitrag, Bayerische
 *     ohne Aussage zu Wartezeiten außer dem Satz aus dem Briefing.
 *   - Kostenkarte rechnet seit der Faktenprüfung vom 06.10.2026 mit dem
 *     belegten Einzelzahn-Implantat für 2.500 EUR (Mitte der Spanne der
 *     Verbraucherzentrale) statt mit einer angenommenen Krone für 1.600 EUR,
 *     und zeigt das erste Kalenderjahr mit Zahnstaffel statt eines Rests von
 *     null.
 *   - Der Rechner-Block fehlt bewusst (Briefing Abschnitt 5, Z6).
 *
 * Faktenprüfung 06.10.2026: Healio/Ratgeber/zahn-ratgeber-belege/PRUEFBERICHT-WELLE1.md
 */

export const article = {
  slug: 'zahnzusatzversicherung-ohne-wartezeit',
  kind: 'ratgeber',

  metaTitle: 'Zahnzusatzversicherung ohne Wartezeit: was gilt | Healio',
  metaDescription:
    'Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag versichert ist, wo die Zahnstaffel greift und warum Angeratenes nur ein Sofortbaustein abdeckt.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag gilt',
  listTeaser:
    'Ohne Wartezeit heißt nicht ohne Grenzen: was sofort gilt, was die Zahnstaffel begrenzt und wofür es den Sofortbaustein gibt.',

  headline: 'Zahnzusatzversicherung ohne Wartezeit: was ab dem ersten Tag gilt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'calendar',
    facts: [
      { value: 'keine Wartezeit', label: 'in allen drei Stufen der UKV ZahnPRIVAT' },
      { value: 'bis 1.000 EUR', label: 'erstattet der Tarif im ersten Kalenderjahr (Zahnstaffel)' },
      { value: '2 Jahre', label: 'zurück zählt, was angeraten oder geplant wurde' },
    ],
    text: 'Ohne Wartezeit leistet der Tarif ab Versicherungsbeginn. Das gilt nicht für Behandlungen, die schon angeraten sind oder laufen.',
    path: { to: '/zahn#zahn-check', text: 'Was passt zu deiner Situation?', label: 'Zahn-Check starten' },
  },

  lead: 'Eine Zahnzusatzversicherung ohne Wartezeit leistet ab dem Versicherungsbeginn, bei der UKV ZahnPRIVAT gilt das in allen drei Leistungsstufen. Das heißt aber nicht, dass sie jede Behandlung zahlt. In den ersten drei Kalenderjahren begrenzt eine Zahnstaffel die Erstattung, und was in den letzten 2 Jahren angeraten wurde oder schon läuft, ist nicht versichert.',

  sections: [
    {
      id: 'was-heisst-ohne-wartezeit',
      heading: 'Was heißt ohne Wartezeit bei einer Zahnzusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine Wartezeit ist die Zeit nach Vertragsbeginn, in der der Tarif noch nicht leistet. Ohne Wartezeit zahlt er ab dem Versicherungsbeginn für Behandlungen, die versichert sind. Die UKV ZahnPRIVAT hat drei Leistungsstufen ohne Wartezeiten.',
        },
        {
          type: 'paragraph',
          text: 'Bei anderen Verträgen ist das nicht so. Laut Verbraucherzentrale sind bei zahlreichen Verträgen Wartezeiten von acht Monaten vorgesehen, dazu kommen Zahnstaffeln (Stand 23.07.2026). Bei der Bayerischen hängen Wartezeiten am gewählten Zahntarif, sie stehen im Antrag und im Versicherungsschein.',
        },
      ],
    },
    {
      id: 'gesetz',
      heading: 'Wie lang darf eine Wartezeit höchstens sein?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Versicherungsvertragsgesetz setzt Höchstgrenzen. Soweit Wartezeiten vereinbart werden, dürfen sie nach § 197 VVG in der Krankheitskostenversicherung als allgemeine Wartezeit drei Monate und als besondere Wartezeit für Zahnbehandlung, Zahnersatz und Kieferorthopädie acht Monate nicht überschreiten. Eine Pflicht zu Wartezeiten gibt es also nicht.',
        },
        {
          type: 'paragraph',
          text: 'Der Gesetzestext spricht von der Krankheitskostenversicherung und unterscheidet nicht ausdrücklich zwischen Voll- und Zusatzversicherung, Zahnzusatztarife nennt er nicht eigens. Verbindlich ist deshalb, was in den Bedingungen deines Tarifs steht. Die Zahnstaffel ist keine Wartezeit, § 197 VVG regelt sie nicht.',
        },
      ],
    },
    {
      id: 'ab-tag-eins',
      heading: 'Was gilt bei der UKV ab dem ersten Tag?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'ZahnPRIVAT 75:',
              text: '75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Keine Wartezeiten, Implantate, Brücken und Prothesen erstattungsfähig.',
            },
            {
              lead: 'ZahnPRIVAT 90:',
              text: 'Die mittlere Stufe, auch sie ohne Wartezeiten. Den Erstattungssatz zeigen die Tarifunterlagen im Antrag.',
            },
            {
              lead: 'ZahnPRIVAT 100:',
              text: '100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig. Keine Wartezeiten, professionelle Zahnreinigung ohne Jahresdeckel.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Die Annahme und der genaue Leistungsumfang werden erst im Antrag verbindlich geprüft.',
        },
      ],
    },
    {
      id: 'staffel',
      heading: 'Was begrenzt die Erstattung trotz fehlender Wartezeit?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das ist die Zahnstaffel. Die Staffel ist keine Wartezeit, aber sie begrenzt die Erstattung in den ersten Jahren. In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
        },
        {
          type: 'paragraph',
          text: 'Solche Staffeln sind bei Zahnzusatzversicherungen verbreitet. Die Verbraucherzentrale schreibt, dass du die volle Leistung immer erst einige Jahre nach Vertragsabschluss erhältst.',
        },
      ],
    },
    {
      id: 'nicht-versichert',
      heading: 'Was ist nicht versichert, auch wenn es keine Wartezeit gibt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Behandlungen, die in den letzten 2 Jahren angeraten wurden oder schon laufen. Bei der UKV ist die Regel einfach. Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung. „Läuft schon“ zählt immer.',
        },
        {
          type: 'paragraph',
          text: 'Auch ein Eintrag in deiner Zahnarzt-Akte aus den letzten 2 Jahren kann zählen. Das deckt sich mit dem, was die Verbraucherzentrale allgemein sagt: Behandlungen, die schon notwendig sind, werden in der Regel nicht in den Vertrag einbezogen. Die Gesundheitsfragen im Antrag beantwortest du vollständig und wahrheitsgemäß, sonst riskierst du deinen Versicherungsschutz.',
        },
      ],
    },
    {
      id: 'zahn-sofort',
      heading: 'Wofür ist ZAHN Sofort da?',
      blocks: [
        {
          type: 'paragraph',
          text: 'ZAHN Sofort ist ein Baustein der Bayerischen für Behandlungen, die in den letzten 2 Jahren empfohlen oder geplant wurden oder schon laufen. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR, wenn Abschluss und Rechnung zeitlich richtig liegen. Dafür gelten feste Bedingungen:',
        },
        {
          type: 'list',
          items: [
            'Der Baustein ist nur zusammen mit einem neuen Zahntarif der Bayerischen wählbar.',
            'Der Baustein endet nach 24 Monaten, der Zahntarif läuft weiter.',
            'Der Abschluss muss vor der Rechnung erfolgen. Die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein.',
            'Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese.',
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Wurde bei dir in den letzten 2 Jahren etwas empfohlen? Der Zahn-Check zeigt dir den Weg, der heute offen ist.',
          label: 'Zahn-Check starten',
        },
      ],
    },
    {
      id: 'welcher-weg',
      heading: 'Welcher Weg passt zu welcher Situation?',
      blocks: [
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Situation, Weg und was gilt, nach den Tarifunterlagen auf healio.de/zahn',
          head: ['Situation', 'Weg', 'Was gilt'],
          rows: [
            ['Nichts empfohlen, nichts geplant, nichts läuft', 'UKV ZahnPRIVAT 75, 90 oder 100', 'Keine Wartezeiten, in den ersten drei Kalenderjahren die Zahnstaffel'],
            ['Vor mehr als 2 Jahren empfohlen, seitdem nichts geplant', 'UKV ZahnPRIVAT', 'Die Behandlung ist wieder versichert. Ausnahme Zahnspange: Da zählt auch eine ältere Empfehlung.'],
            ['In den letzten 2 Jahren empfohlen oder geplant', 'Bayerische mit ZAHN Sofort', 'Ein normaler Zahntarif zahlt genau diese Behandlung nicht. ZAHN Sofort: bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR, wenn keine Zähne fehlen und keine Zahn-Vorgeschichte besteht.'],
            ['Behandlung läuft schon', 'Bayerische mit ZAHN Sofort, solange nicht abgerechnet', '„Läuft schon“ zählt immer. Die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein.'],
            ['1 bis 3 Zähne fehlen, noch nicht ersetzt', 'UKV ZahnPRIVAT mit Zuschlag je Zahn', 'Der UKV-Antrag sieht eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich.'],
          ],
          note: 'Die Annahme und der genaue Leistungsumfang werden im Antrag verbindlich geprüft.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Bei fehlenden Zähnen zählen Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss nicht mit. Alles Weitere steht im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'kostenkarte',
      heading: 'Was bringt der Tarif bei einem Implantat im ersten Kalenderjahr?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nimm ein Einzelzahn-Implantat für 2.500 EUR, die Mitte der Spanne von 1.500 bis 3.500 EUR, die die Verbraucherzentrale inklusive Zahnersatz nennt. Die Kasse zahlt den Festzuschuss für den Befund vor dem Implantat, bei einer Lücke mit einem fehlenden Zahn ohne Bonusheft 552,96 EUR. Das sind 60 Prozent der Regelversorgung von 921,60 EUR.',
        },
        {
          type: 'costCard',
          title: 'Ein Implantat, drei Fälle',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung auf bis zu 1.000 EUR. In den ersten beiden Zeilen ging der Zahn erst nach Vertragsbeginn verloren, bei Vertragsbeginn war nichts angeraten oder geplant.',
          caption: 'Kostenkarte: Einzelzahn-Implantat für 2.500 EUR',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Erstes Kalenderjahr im Tarif', '552,96 EUR', '1.947,04 EUR', '947,04 EUR, der Tarif erstattet 1.000 EUR (Zahnstaffel)'],
            ['Ab dem vierten Kalenderjahr, Staffel beendet', '552,96 EUR', '1.947,04 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Implantat in den letzten 2 Jahren vor Abschluss angeraten', '552,96 EUR', '1.947,04 EUR', 'Nicht versichert, 1.947,04 EUR bleiben bei dir'],
          ],
          note: 'Beispiel, keine Preisangabe. Kosten: Mitte der Spanne der Verbraucherzentrale für ein Einzelzahn-Implantat inklusive Zahnersatz (Stand 01.07.2024), ohne Knochenaufbau. Festzuschuss: G-BA, Festzuschuss-Richtlinie, Beträge ab 01.01.2026, Befund 2.1, 60 Prozent von 921,60 EUR, für Zuschüsse, die bis 31.12.2026 bewilligt werden. Annahmen: alle Kosten erstattungsfähig, kein Bonusheft, im Jahr keine weiteren Erstattungen. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ohne Wartezeit heißt nicht ohne Grenzen.', text: 'Die Zahnstaffel begrenzt die Erstattung in den ersten drei Kalenderjahren, und für alles, was in den letzten 2 Jahren angeraten wurde oder schon läuft, zahlt ein normaler Zahntarif nicht.' },
            { lead: 'ZAHN Sofort hat Voraussetzungen.', text: 'Er ist nur mit einem neuen Zahntarif der Bayerischen wählbar, endet nach 24 Monaten und verlangt, dass keine Zähne fehlen und keine Zahn-Vorgeschichte besteht.' },
            { lead: 'Verbindlich entscheidet der Versicherer.', text: 'Er prüft Annahme und Leistungsumfang nach den Angaben im Antrag.' },
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
              icon: 'dental',
              tone: 'sky',
              title: 'Zahnkrone: Arten, Kosten und Festzuschuss',
              text: 'Welche Kronen es gibt und was der Festzuschuss deckt.',
              to: '/ratgeber/zahnkrone-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'butter',
              title: 'Zahnimplantat: Kosten, Kassenanteil und Eigenanteil',
              text: 'Was ein Implantat kostet und wie die Staffel wirkt.',
              to: '/ratgeber/zahnimplantat-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'prevention',
              tone: 'lavender',
              title: 'Wurzelbehandlung',
              text: 'Wann die Kasse zahlt und was privat kostet.',
              to: '/ratgeber/wurzelbehandlung-kosten',
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
      question: 'Gibt es eine Zahnzusatzversicherung ohne Wartezeit?',
      answer:
        'Bei der UKV ZahnPRIVAT ja, dort gibt es drei Leistungsstufen ohne Wartezeiten. Bei der Bayerischen hängen Wartezeiten am gewählten Zahntarif, sie stehen im Antrag und im Versicherungsschein. Laut Verbraucherzentrale sind bei zahlreichen Verträgen acht Monate vorgesehen.',
    },
    {
      question: 'Wie lang darf eine Wartezeit höchstens sein?',
      answer:
        'Nach § 197 VVG darf eine besondere Wartezeit für Zahnbehandlung, Zahnersatz und Kieferorthopädie acht Monate nicht überschreiten, soweit sie vereinbart wird. Der Gesetzestext nennt Zahnzusatztarife nicht ausdrücklich. Entscheidend sind die Bedingungen deines Tarifs.',
    },
    {
      question: 'Zahlt die Versicherung gleich nach Abschluss eine Krone?',
      answer:
        'Ohne Wartezeit leistet der Tarif ab Versicherungsbeginn, aber begrenzt. Im ersten Kalenderjahr gilt eine Zahnstaffel bis 1.000 EUR, bei Unfall gilt keine Staffel. Wurde die Krone in den letzten 2 Jahren angeraten oder läuft sie schon, ist sie nicht versichert.',
    },
    {
      question: 'Ist eine schon angeratene Behandlung versichert?',
      answer:
        'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Für Behandlungen aus den letzten 2 Jahren gibt es den Baustein ZAHN Sofort der Bayerischen, der vor der Rechnung abgeschlossen sein muss.',
    },
    {
      question: 'Was ist die Zahnstaffel?',
      answer:
        'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
    },
    {
      question: 'Was kostet eine Zahnzusatzversicherung ohne Wartezeit?',
      answer:
        'Der Beitrag hängt unter anderem von Alter, Tarif und Leistungsstufe ab. Deshalb steht hier kein pauschaler Preis. Im Tarifrechner siehst du deinen Beitrag, bevor du den Antrag abschickst.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welcher Weg bei deiner Situation offen ist, zeigt dir der Zahn-Check auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse bei Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Ob dein Kassenbonus den Beitrag mittragen kann und welche Kasse dafür passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Die Gesetzeslage, die Aussagen zu Wartezeit und Zahnstaffel, die Implantatkosten und der Festzuschuss stammen aus diesen Quellen.',
    items: [
      {
        label: 'VVG § 197 (Wartezeiten)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__197.html',
        stand: '06.10.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'VVG § 192 (Vertragstypische Leistungen des Versicherers)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__192.html',
        stand: '06.10.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Zahnzusatzversicherung: Risiken und Vorteile',
        publisher: 'Verbraucherzentrale (Hessen und Mecklenburg-Vorpommern)',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293',
        stand: '23.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Brücke, Krone, Implantat: Welche Unterschiede gibt es beim Zahnersatz?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/bruecke-krone-implantat-welche-unterschiede-gibt-es-beim-zahnersatz-7925',
        stand: '01.07.2024',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Festzuschuss-Richtlinie, Teil A Nr. 6 und Beträge ab 01.01.2026',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
        stand: 'geändert 05.12.2025, in Kraft seit 01.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 55 (Festzuschüsse), Fassung bis 31.12.2026',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: '06.10.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'verkündet 24.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        stand: '05.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen nach dem Stand der Unterlagen, zur Gesetzeslage nach den genannten Quellen vom 6. Oktober 2026. Maßgeblich sind immer die Bedingungen des Versicherers.',
};

export default article;
