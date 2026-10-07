/**
 * Ambulant-Ratgeber Welle A: Akupunktur Kosten, Kassenleistung bei chronischen
 * Schmerzen der Lendenwirbelsäule und des Knies (G-BA), sonst privat.
 *
 * Quellen (Abruf 07.10.2026, Belege in akupunktur-kosten.belege.md):
 * G-BA Richtlinie Methoden vertragsärztliche Versorgung (zuletzt geändert
 * 18.06.2026, in Kraft seit 09.09.2026), Anlage I Nr. 12 und Anlage II Nr. 31;
 * Verbraucherzentrale (Akupunktur, Stand 04.06.2024); GOÄ Anlage Nr. 269, 269a
 * und § 5; Anlage 2 BBhV Nr. 21; SDK AVB Teil I und II.
 * Die Codex-Quellenprüfung vom 06.10.2026 (QUELLENPRÜFUNG.md, Abschnitt B) stützt
 * dieselbe Fassung der Richtlinie.
 *
 * Bewusste Grenzen:
 *   - Kassenleistung nur für die zwei Indikationen der Richtlinie, mit den
 *     Sitzungs- und Qualifikationsregeln wörtlich nach Anlage I Nr. 12. "100
 *     Prozent" wird nicht behauptet, die Seite sagt "als Kassenleistung".
 *   - Keine Euro-Angabe pro Sitzung beim Heilpraktiker: keine neutrale Quelle
 *     (auch die Verbraucherzentrale nennt keine). Als Orientierung nur die
 *     Beihilfe-Höchstbeträge der Anlage 2 BBhV (gekennzeichnet) und die GOÄ im
 *     einfachen Satz (eigene Rechnung).
 *   - Das Satzungsbeispiel AOK Nordost ist in der Prüfung am 07.10.2026 im
 *     Satzungs-PDF wörtlich gelesen (52. Nachtrag, § 19b Abs. 5 und 7) und deckt
 *     sich mit der KassenBoost-Erhebung vom 26.08.2026.
 *   - Keine Aufnahme in GOOGLE_ADS_EXCLUDED_PATHS und ANALYTICS_EXCLUDED_PATHS
 *     (Entscheidung der Marktanalyse-Sitzung 07.10.2026: Kosten-Seite; Krankheits-
 *     bilder nur als Kassenbedingung nach G-BA und Satzung).
 *   - Keine Aussage zur Wirkung der Akupunktur, keine Behandlungsempfehlung.
 *   - Rechenbeispiele arbeiten mit angenommenen Preisen.
 */

export const article = {
  slug: 'akupunktur-kosten',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Akupunktur Kosten: wann die Kasse zahlt, sonst privat | Healio',
  metaDescription:
    'Akupunktur Kosten: Kassenleistung bei chronischen Schmerzen der Lendenwirbelsäule oder im Knie laut G-BA, Abrechnung privat und was ein Tarif erstattet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Akupunktur Kosten: wann die Kasse zahlt, was privat bleibt und was ein Tarif erstattet',
  listTeaser:
    'Die Kasse zahlt Akupunktur nur bei chronischen Schmerzen der Lendenwirbelsäule und des Knies. Hier siehst du die Regeln, die Kosten und was ein Zusatztarif übernimmt.',

  headline: 'Akupunktur Kosten: wann die Kasse zahlt, was privat bleibt und was ein Tarif erstattet',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'naturopathy',
    facts: [
      { value: 'Lendenwirbelsäule, Knie', label: 'chronische Schmerzen seit mindestens 6 Monaten (G-BA)' },
      { value: 'bis zu 10 Sitzungen', label: 'in 6 Wochen, im Ausnahmefall 15 in 12 Wochen' },
      { value: 'Sonst meist privat', label: 'bei anderen Beschwerden und beim Heilpraktiker' },
    ],
    text: 'Die Kasse zahlt Akupunktur als Kassenleistung nur bei zwei Indikationen und nur beim qualifizierten Vertragsarzt. Alles andere trägst du selbst, es sei denn, deine Kasse bezuschusst es in der Satzung oder ein Zusatztarif erstattet es.',
    path: { to: '/ambulant', text: 'Akupunktur selbst getragen?', label: 'Ambulante Tarife ansehen' },
  },

  lead:
    'Akupunktur ist Kassenleistung, wenn die Beschwerden zu einer der zwei Indikationen des Gemeinsamen Bundesausschusses (G-BA) passen: chronische Schmerzen der Lendenwirbelsäule oder chronische Schmerzen im Knie durch Gonarthrose, jeweils seit mindestens sechs Monaten. Dann muss ein Vertragsarzt mit der passenden Qualifikation behandeln. In allen anderen Fällen und beim Heilpraktiker zahlst du in der Regel selbst. Hier siehst du die Regeln im Wortlaut, die Kosten und was ein Zusatztarif beiträgt.',

  sections: [
    {
      id: 'wann-kasse',
      heading: 'Wann zahlt die Krankenkasse Akupunktur?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wenn deine Beschwerden zu einer der beiden zugelassenen Indikationen gehören. Die Methoden-Richtlinie des G-BA lässt die Körperakupunktur mit Nadeln ohne elektrische Stimulation bei chronisch schmerzkranken Patienten für diese Fälle zu:',
        },
        {
          type: 'list',
          items: [
            'Chronische Schmerzen der Lendenwirbelsäule, die seit mindestens 6 Monaten bestehen und gegebenenfalls nicht-segmental bis maximal zum Kniegelenk ausstrahlen.',
            'Chronische Schmerzen in mindestens einem Kniegelenk durch Gonarthrose, die seit mindestens 6 Monaten bestehen.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale fasst es so zusammen: Die Kasse übernimmt die Kosten bei chronischen Schmerzen der Lendenwirbelsäule oder bei Kniegelenkarthrose, wenn die Schmerzen seit mindestens sechs Monaten bestehen. Für Akupunktur bei anderen Beschwerden gilt die Methode nach der Richtlinie nicht als vertragsärztliche Leistung zu Lasten der Kassen: Anlage II der Richtlinie führt Akupunktur mit Ausnahme der in Anlage I genannten Indikationen unter den Methoden, die nicht erbracht werden dürfen.',
        },
      ],
    },
    {
      id: 'sitzungen',
      heading: 'Wie viele Sitzungen zahlt die Kasse und wer darf behandeln?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pro Behandlungsserie sind bis zu 10 Sitzungen innerhalb von höchstens 6 Wochen vorgesehen, in begründeten Ausnahmefällen bis zu 15 Sitzungen innerhalb von höchstens 12 Wochen. Jede Sitzung dauert mindestens 30 Minuten, bei Rückenschmerzen mit 14 bis 20 Nadeln, bei Knieschmerzen mit 7 bis 15 Nadeln je behandeltem Knie. Eine erneute Behandlung kann frühestens 12 Monate nach Abschluss einer Akupunkturbehandlung erfolgen.',
        },
        {
          type: 'paragraph',
          text: 'Behandeln darf nur ein Vertragsarzt, der bestimmte Qualifikationen nachweist. Die Richtlinie verlangt eine Zusatz-Weiterbildung Akupunktur oder eine gleichwertige Qualifikation, Kenntnisse in der psychosomatischen Grundversorgung und einen von der Ärztekammer anerkannten Kurs über Schmerztherapie von 80 Stunden. Dazu kommen Qualitätsanforderungen wie ein Therapieplan, eine Schmerzerhebung vor und nach der Behandlung und sterile Einmalnadeln.',
        },
        {
          type: 'paragraph',
          text: 'Frag deshalb vor dem ersten Termin, ob die Praxis die Akupunktur als Kassenleistung abrechnet oder privat. Beides gibt es, und es hängt von Beschwerde und Praxis ab.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet Akupunktur privat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine neutrale Euro-Angabe pro Sitzung gibt es nicht, auch die Verbraucherzentrale nennt keine. Beim Heilpraktiker ist das Honorar frei vereinbar, das Gebührenverzeichnis ist nur eine Berechnungshilfe. Ein Arzt rechnet privat nach der Gebührenordnung für Ärzte (GOÄ) ab. Dort stehen für Akupunktur zur Behandlung von Schmerzen zwei Nummern, die du auf Rechnungen findest.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Akupunktur nach der GOÄ im einfachen Satz, eigene Rechnung nach § 5 GOÄ',
          head: ['GOÄ-Nummer', 'Leistung', 'Punkte', 'Einfacher Satz'],
          rows: [
            ['269', 'Akupunktur (Nadelstich-Technik) zur Behandlung von Schmerzen, je Sitzung', '200', 'rund 11,66 EUR'],
            ['269a', 'Akupunktur (Nadelstich-Technik) mit einer Mindestdauer von 20 Minuten zur Behandlung von Schmerzen, je Sitzung', '350', 'rund 20,40 EUR'],
          ],
          note: 'Eigene Rechnung: Punktzahl mal Punktwert 5,82873 Cent, auf volle Cent gerundet. Die Praxis multipliziert den einfachen Satz mit einem Faktor, der in der Regel zwischen 1 und 2,3 liegt, bis höchstens 3,5 (§ 5 GOÄ). Neben Nummer 269a ist Nummer 269 nicht berechnungsfähig. Quelle: Anlage zur GOÄ und § 5 GOÄ, gesetze-im-internet.de, Abruf 07.10.2026. Die Rechnung einer Praxis enthält meist weitere Positionen, etwa Beratung oder Untersuchung.',
        },
        {
          type: 'paragraph',
          text: 'Für Heilpraktiker nennt die Beihilfe des Bundes in Anlage 2 der Bundesbeihilfeverordnung Höchstbeträge, bis zu denen sie Aufwendungen als angemessen anerkennt: 23,00 EUR für Akupunktur einschließlich Pulsdiagnose (Nr. 21.1) und 7,00 EUR für Moxibustionen, Injektionen und Quaddelungen in Akupunkturpunkte (Nr. 21.2). Das sind Grenzen der Beihilfe, keine Preise. Was deine Praxis berechnet, kann darüber oder darunter liegen, frag danach vor dem Termin.',
        },
      ],
    },
    {
      id: 'satzung',
      heading: 'Bezuschussen Krankenkassen Akupunktur auch bei anderen Beschwerden?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Manche tun es. Die Verbraucherzentrale schreibt, viele Krankenkassen bezahlten oder bezuschussten Akupunktur auch bei anderen Erkrankungen, über Satzungsleistungen oder Bonusprogramme. Das ist keine Regelleistung, sondern ein zusätzliches Angebot der einzelnen Kasse nach § 11 Abs. 6 SGB V, und die Kasse bestimmt Art, Dauer und Umfang selbst.',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel ist die AOK Nordost. Nach ihrer Satzung (52. Nachtrag, gültig ab 01.07.2026, § 19b Abs. 5 und 7) erstattet sie Akupunktur über die gesetzlich anerkannten Indikationen hinaus auch bei Migräne und Allergien, wenn ein zugelassener Arzt mit der Zusatzbezeichnung Akupunktur behandelt. Zusammen mit kinesiologischen Tapings zahlt sie dafür höchstens 40 EUR je Kalenderjahr. Andere Kassen regeln es anders oder gar nicht. Wer Akupunktur über die Kasse sucht, liest die Satzung der eigenen Kasse.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'naturopathy',
          text: 'Du siehst, wie viel Naturheilverfahren die einzelnen Stufen erstatten.',
          label: 'Tarifstufen ansehen',
        },
      ],
    },
    {
      id: 'tarif',
      heading: 'Erstattet eine Zusatzversicherung die Akupunktur?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt vom Tarif. Bei den ambulanten SDK-Tarifen, die Healio auf der Seite Ambulant vermittelt, gehört Akupunktur zum Bereich Heilpraktiker und Naturheilverfahren. Erstattet werden alle Leistungen, die im aktuellen Gebührenverzeichnis für Heilpraktiker stehen, und Akupunktur ist dort aufgeführt. Dieser Topf erstattet 50 bis 100 Prozent der erstattungsfähigen Kosten, bis 500 bis 1.000 EUR in zwei Kalenderjahren, je nach Stufe. Heilpraktiker müssen nach dem Gebührenverzeichnis abrechnen, bei Ärzten gilt die GOÄ. Zahlen mehrere Kostenträger, darf die gesamte Erstattung die Kosten nicht übersteigen.',
        },
        {
          type: 'paragraph',
          text: 'Beachte die Methodenprüfung. Der Versicherer leistet für Methoden, die von der Schulmedizin überwiegend anerkannt sind, und für solche, die sich in der Praxis als ebenso erfolgversprechend bewährt haben. Bei den bewährten darf er auf den Betrag kürzen, der bei einer schulmedizinischen Behandlung angefallen wäre.',
        },
        {
          type: 'costCard',
          title: 'Akupunktur: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: Akupunktur mit und ohne Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Chronische Lendenwirbelsäulenschmerzen seit über 6 Monaten, bis zu 10 Sitzungen beim qualifizierten Vertragsarzt', 'die Akupunktur als Kassenleistung', 'nichts für die Akupunktur selbst', 'Nichts zu erstatten'],
            ['Privatakupunktur beim Arzt, 8 Sitzungen, angenommen 40 EUR je Sitzung (320 EUR)', 'nichts, wenn die Indikation nicht passt', '320 EUR', 'Der Tarif erstattet bis zu 320 EUR, soweit erstattungsfähig und nach Methodenprüfung'],
            ['Heilpraktiker, 8 Sitzungen, angenommen 50 EUR je Sitzung (400 EUR)', 'meist nichts', '400 EUR', 'Der Tarif erstattet bis zu 400 EUR, soweit die Rechnung nach GebüH erstattungsfähig ist'],
            ['Beitrag Ambulant 100 über zwei Jahre, 21 bis 30 Jahre (31,64 EUR im Monat)', 'nicht betroffen', 'nichts', '759,36 EUR Beitrag, den ein Kassenbonus teilweise mittragen kann'],
          ],
          note: 'Rechenbeispiel mit angenommenen Preisen, keine Preisangabe. Eigene Rechnung: 31,64 EUR mal 12 mal 2 ergibt 759,36 EUR. Kassenleistung nach G-BA Methoden-Richtlinie, Anlage I Nr. 12 (in Kraft seit 09.09.2026), Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Abschnitt I.5, Anrechnung und Methodenprüfung nach Teil I, Stand 01.01.2022, Abschnitte A.7 und A.8. Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant (Stand 29.09.2026).',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Kassenleistung ist eng umrissen.', text: 'Die Leistung gilt für chronische Schmerzen der Lendenwirbelsäule und des Knies durch Gonarthrose, seit mindestens sechs Monaten, beim qualifizierten Vertragsarzt. Wer eine andere Beschwerde hat, zahlt Akupunktur meist selbst.' },
            { lead: 'Ob dein Fall dazugehört, entscheidet die Praxis.', text: 'Dieser Ratgeber stellt keine Diagnose und gibt keine Behandlungsempfehlung. Zur Wirkung der Akupunktur macht er keine Aussage.' },
            { lead: 'Einen Durchschnittspreis nennen wir nicht.', text: 'Es gibt keine neutrale Quelle dafür. Die GOÄ-Werte sind der einfache Satz, die Beihilfe-Höchstbeträge sind keine Preise.' },
            { lead: 'Der Tarif prüft die Methode.', text: 'Er kann bei bewährten Methoden auf den schulmedizinischen Betrag kürzen. Außerdem leistet er nicht für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind. Gesundheitsfragen im Antrag beantwortest du vollständig und wahrheitsgemäß.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'naturopathy',
              tone: 'mint',
              title: 'Heilpraktiker Kosten: wer zahlt was',
              text: 'Alle Bereiche der Naturheilkunde auf einer Seite.',
              to: '/ratgeber/heilpraktiker-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'protection',
              tone: 'butter',
              title: 'Heilpraktiker-Zusatzversicherung',
              text: 'Kriterien statt Rangliste, Gesundheitsfragen und Grenzen.',
              to: '/ratgeber/heilpraktiker-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'document',
              tone: 'sky',
              title: 'Gebührenordnung für Heilpraktiker',
              text: 'Warum das GebüH nur eine Berechnungshilfe ist.',
              to: '/ratgeber/gebuehrenordnung-heilpraktiker',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'lavender',
              title: 'Chiropraktiker Kosten',
              text: 'Arzt oder Heilpraktiker: wer behandelt und wer zahlt.',
              to: '/ratgeber/chiropraktiker-kosten',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Heilpraktiker und Osteopathie, Brille, Vorsorge und gesetzliche Zuzahlungen vermittelt Healio die ambulanten Tarife der SDK, in der höchsten Stufe mit bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wann zahlt die Krankenkasse Akupunktur?',
      answer:
        'Bei chronischen Schmerzen der Lendenwirbelsäule und bei chronischen Knieschmerzen durch Gonarthrose, jeweils seit mindestens 6 Monaten, und nur beim Vertragsarzt mit der geforderten Qualifikation (G-BA Methoden-Richtlinie, Anlage I Nr. 12). Bei anderen Beschwerden ist Akupunktur in der Regel keine Kassenleistung.',
    },
    {
      question: 'Wie viele Akupunktur-Sitzungen zahlt die Kasse?',
      answer:
        'Bis zu 10 Sitzungen innerhalb von höchstens 6 Wochen, in begründeten Ausnahmefällen bis zu 15 Sitzungen innerhalb von höchstens 12 Wochen. Eine erneute Behandlung ist frühestens 12 Monate nach Abschluss möglich.',
    },
    {
      question: 'Was kostet Akupunktur pro Sitzung?',
      answer:
        'Dafür gibt es keine neutrale Euro-Angabe. Beim Heilpraktiker ist das Honorar frei vereinbar, beim Arzt gilt die GOÄ. Als Beispiel: Nr. 269a (mindestens 20 Minuten) kommt im einfachen Satz auf rund 20,40 EUR, dazu kommen Faktor und weitere Positionen. Frag deine Praxis vorab nach dem Honorar.',
    },
    {
      question: 'Zahlt die Kasse Akupunktur beim Heilpraktiker?',
      answer:
        'In der Regel nicht. Die Verbraucherzentrale schreibt, dass Akupunktursitzungen beim Heilpraktiker aus eigener Tasche zu zahlen sind. Einzelne Kassen bezuschussen Akupunktur in der Satzung. Bei der AOK Nordost etwa gilt das nur beim Arzt mit Zusatzbezeichnung und mit Jahresdeckel.',
    },
    {
      question: 'Erstattet eine Zusatzversicherung Akupunktur?',
      answer:
        'Je nach Tarif. Bei den ambulanten SDK-Tarifen gehört Akupunktur zum Bereich Heilpraktiker und Naturheilverfahren mit 500 bis 1.000 EUR je zwei Kalenderjahre. Heilpraktiker müssen nach dem Gebührenverzeichnis abrechnen, der Versicherer prüft zudem die Methode.',
    },
    {
      question: 'Ist eine schon laufende Akupunktur-Behandlung versichert?',
      answer:
        'Nein, nicht für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind. Schließe einen Tarif deshalb vor der Behandlung ab und frag vorher nach, wie dein Fall eingeordnet wird.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Frag deine Praxis, ob sie die Akupunktur als Kassenleistung abrechnet und mit welchem Honorar privat. Was ein Tarif für Naturheilverfahren erstattet, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Wie das Gebührenverzeichnis zu lesen ist, erklärt der Ratgeber ' },
      { text: 'Gebührenordnung für Heilpraktiker', to: '/ratgeber/gebuehrenordnung-heilpraktiker' },
      { text: ', und alle Kostenfragen rund um Heilpraktiker sammelt die Seite ' },
      { text: 'Heilpraktiker Kosten', to: '/ratgeber/heilpraktiker-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Kassenleistung stammt aus der Richtlinie des G-BA, die Hinweise zu Heilpraktikern und Satzungsleistungen von der Verbraucherzentrale, die Gebühren aus GOÄ und Bundesbeihilfeverordnung, die Tarifregeln aus den SDK-Bedingungen.',
    items: [
      {
        label: 'Richtlinie Methoden vertragsärztliche Versorgung, Anlage I Nr. 12 (Körperakupunktur) und Anlage II Nr. 31',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4212/MVV-RL_2026-06-18_iK-2026-09-09.pdf',
        stand: 'zuletzt geändert 18.06.2026, in Kraft seit 09.09.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Akupunktur: Wann zahlt die Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/akupunktur-wann-zahlt-die-krankenkasse-12462',
        stand: '04.06.2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOÄ, Anlage Gebührenverzeichnis, Nummern 269 und 269a',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/go__1982/anlage.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOÄ § 5 Bemessung der Gebühren',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/go__1982/__5.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'BBhV Anlage 2: Höchstbeträge für Heilpraktikerleistungen, Nr. 21',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/bbhv/anlage_2.html',
        stand: 'BGBl. I 2012, 1947 bis 1952, mit späteren Änderungen',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 6',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil II: Tarife AP5, AP7, AP9 und AP1 (1.753a/01.23)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil I: Allgemeiner Teil (1.751)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://gesundwerker.sdk.de/downloads/Bedingungen/1-751.pdf',
        stand: '01.01.2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der AOK Nordost, § 19b Alternative Heilmethoden, Absätze 5 und 7',
        publisher: 'AOK Nordost',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/nordost/pdf/noindex/aok-no-satzung-krankenkasse.pdf',
        stand: '52. Nachtrag, beschlossen am 19.06.2026, gültig ab 01.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gebührenverzeichnis für Heilpraktiker (GebüH), Register: Akupunktur Nr. 21',
        publisher: 'Fachverband Deutscher Heilpraktiker',
        href: 'https://www.heilpraktiker.org/gebuehrenverzeichnis-fuer-heilpraktiker',
        stand: 'GebüH 85, Fassung 2002',
        accessedAt: '07.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Bedingungen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
