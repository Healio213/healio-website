/**
 * Serie Zähne, Stapel zahn-kasse-partner, Seite dak-zahnreinigung
 * (Welle A, Hauptbegriff "zahnreinigung dak").
 *
 * Quellen (Abruf 07.10.2026, Belege je Aussage in dak-zahnreinigung.belege.md):
 *   - Satzung der DAK-Gesundheit, 66. Nachtrag, Stand 01.08.2026: § 19 Abs. 6
 *     (Zuschuss PZR 60 EUR je Kalenderjahr, Frist 31.03.), § 25 (Bonusprogramm). PDF am 07.10.2026 neu geladen, SHA-256
 *     identisch mit der KassenBoost-Belegkette dak-bonus-2026.server.ts.
 *   - Anlage zu § 25 (Stand 25.07.2026): Punktekatalog, Faktor 1,2 für
 *     Kategorie A (darin professionelle Zahnreinigung und Zusatzversicherung
 *     nach § 194 Abs. 1a SGB V), 500 EUR im Jahr, 24 Monate, einmal je Rechnung.
 *   - KZBV, IQWiG, Verbraucherzentrale, SGB V § 11 und § 194, GKV-Spitzenverband
 *     (Krankenkassenliste, Listenstand 07.10.2026, DAK 3,20 Prozent).
 *   - Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Aussage, ob sich der Satzungszuschuss (§ 19 Abs. 6) und der
 *     Bonus-Zuschuss für dieselbe Rechnung addieren: Die Anlage gewährt den
 *     Zuschuss nur, "soweit keine Leistungspflicht nach anderen Regelungen
 *     besteht". Der Text gibt diese Bedingung wieder und rechnet nichts zusammen.
 *   - Kein Verfahren zum Einreichen (App, Post): Die Satzung nennt nur Rechnung
 *     und Frist.
 *   - Kein Beitrag für ZahnPRIVAT, keine Test- oder Siegelnote (Nutzungsrechte
 *     laut HealioAwardsRow noch offen), keine Aussage zu ZAHN Sofort.
 *   - Kein Abschnitt zur Schwangerschaft (§ 19a Abs. 10): Die Seite bleibt beim
 *     Thema Zahnreinigung (Entscheidung der Marktanalyse-Sitzung 07.10.2026),
 *     damit auch kein Sperrlisten-Fall. Keine Behandlungsempfehlung, keine
 *     Aussage, wie oft eine Reinigung sinnvoll ist.
 *   - Bonus nie als Geld: Genannt wird nur die Verwendung als zweckgebundener
 *     Zuschuss (§ 25 Abs. 3), nicht die Barauszahlung. Keine eigene Bonuszahl
 *     für DAK-Versicherte außer der gekennzeichneten Beispielrechnung.
 *
 * Faktenprüfung 07.10.2026: PRUEFBERICHT-zahn-kasse-partner.md.
 */

export const article = {
  slug: 'dak-zahnreinigung',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Zahnreinigung DAK: bis zu 60 EUR im Jahr | Healio',
  metaDescription:
    'Zahnreinigung DAK: Die DAK-Gesundheit gibt laut Satzung bis zu 60 EUR im Kalenderjahr dazu. Mit Frist, Bonus-Zuschuss und dem, was ein Zahntarif übernimmt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'DAK und Zahnreinigung: was die DAK erstattet',
  listTeaser:
    'Bis zu 60 EUR im Jahr laut Satzung, Rechnung bis 31. März des Folgejahres, dazu der Bonus als Zuschuss und was ein Zahntarif übernimmt.',

  headline: 'Zahnreinigung DAK: was die DAK erstattet und wie du den Zuschuss bekommst',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '60 EUR', label: 'Zuschuss je Kalenderjahr laut DAK-Satzung' },
      { value: '31. März', label: 'Frist für die Rechnungen des Vorjahres' },
      { value: 'Faktor 1,2', label: 'Wert der Bonuspunkte beim Zuschuss zur Reinigung' },
    ],
    text: 'Die DAK beteiligt sich an der Reinigung, die Rechnung übernimmt sie nicht. Mehr als deine Rechnung gibt es nie.',
    path: { to: '/zahn#zahn-check', text: 'Zahnreinigung im Tarif mitversichern?', label: 'Zahn-Check starten' },
  },

  lead: 'Die DAK-Gesundheit gibt laut Satzung 60 EUR je Kalenderjahr zur professionellen Zahnreinigung dazu, höchstens bis zur Höhe deiner Rechnung. Wer die Rechnung nicht bis zum 31. März des Folgejahres einreicht, verliert den Anspruch. Eine Regelleistung der Kassen ist die Reinigung nicht, der Zuschuss ist eine Mehrleistung der DAK. Was darüber hinaus bei dir bleibt, rechnet die Kostenkarte weiter unten vor.',

  sections: [
    {
      id: 'zahlt-die-dak',
      heading: 'Zahlt die DAK die professionelle Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Zum Teil. In ihrer Satzung sieht die DAK-Gesundheit unter den zusätzlichen Leistungen einen Zuschuss zur professionellen Zahnreinigung vor (§ 19 Abs. 6). Die ganze Rechnung übernimmt sie damit nicht.',
        },
        {
          type: 'paragraph',
          text: 'Als Regelleistung zahlen die gesetzlichen Kassen die Reinigung nicht. Laut KZBV ist die Prophylaxe mit professioneller Zahnreinigung keine regelhafte Leistung der gesetzlichen Krankenversicherung, viele Kassen geben aber freiwillig einen Zuschuss. Bezahlt wird dagegen die Zahnsteinentfernung, einmal im Kalenderjahr. Kassen dürfen zusätzliche Leistungen zur zahnärztlichen Behandlung in ihre Satzung schreiben (§ 11 Abs. 6 SGB V), und genau darauf beruht der DAK-Zuschuss.',
        },
      ],
    },
    {
      id: 'wie-viel',
      heading: 'Wie viel erstattet die DAK für die Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Zuschuss beträgt 60 EUR je Kalenderjahr, nie mehr als die nachgewiesenen tatsächlichen Kosten. Er gilt für das Jahr, nicht für jede Sitzung: Lässt du die Reinigung zweimal machen, bleibt es bei 60 EUR im Kalenderjahr.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuschuss der DAK-Gesundheit zur professionellen Zahnreinigung laut Satzung (66. Nachtrag, Stand 01.08.2026)',
          head: ['Regel', 'Was laut Satzung gilt', 'Fundstelle'],
          rows: [
            ['Höhe', '60 EUR je Kalenderjahr, höchstens die durch Rechnung nachgewiesenen tatsächlichen Kosten', '§ 19 Abs. 6'],
            ['Wer behandelt', 'Zugelassene oder nach § 13 Abs. 4 SGB V berechtigte Leistungserbringer, ausschließlich', '§ 19 Abs. 6'],
            ['Nachweis', 'Die Rechnung über die Reinigung', '§ 19 Abs. 6'],
            ['Frist', 'Rechnungen mit Ausstellungsdatum bis 31.12. müssen bis 31.03. des Folgejahres beantragt sein, sonst verfällt der Anspruch', '§ 19 Abs. 6'],
            ['Altersgrenze', 'Die Regel nennt keine', '§ 19 Abs. 6'],
          ],
          note: 'Maßgeblich ist die Satzung der DAK-Gesundheit in der jeweils geltenden Fassung. Stand des Abrufs: 7. Oktober 2026.',
        },
      ],
    },
    {
      id: 'frist',
      heading: 'Bis wann muss ich die Rechnung bei der DAK einreichen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bis zum 31. März des Folgejahres. Die Satzung sagt: Wird die Kostenerstattung für Rechnungen mit Ausstellungsdatum bis zum 31.12. nicht bis zum 31.03. des Folgejahres beantragt, verfällt der Anspruch.',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel: Die Reinigung im Februar 2026 und eine zweite im November 2026 reichst du beide bis zum 31. März 2027 ein. Danach ist für das Jahr 2026 nichts mehr zu holen. Wann du die Rechnung abschickst, entscheidest du selbst, am besten gleich nach dem Termin.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet die Zahnreinigung, und was bleibt nach dem DAK-Zuschuss?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei durchschnittlichem Aufwand nennt die KZBV 80 bis 120 EUR je Sitzung, das IQWiG meist 100 bis 200 EUR. Die 60 EUR der DAK decken davon also je nach Praxis einen guten Teil, aber selten alles. Liegt deine Rechnung bei 100 EUR, bleiben nach dem Zuschuss 40 EUR bei dir. Bei zwei Reinigungen zu je 100 EUR sind es 140 EUR.',
        },
        {
          type: 'costCard',
          title: 'Zahnreinigung: DAK-Zuschuss und Eigenanteil',
          icon: 'calculator',
          tariffLabel: 'Beispiel für das Kalenderjahr 2026 mit UKV ZahnPRIVAT 100: Keine Wartezeiten, professionelle Zahnreinigung ohne Jahresdeckel, 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Der Vertrag besteht schon, bevor die Behandlung angeraten wird.',
          caption: 'Kostenkarte: Zahnreinigung mit DAK-Zuschuss, ohne und mit Zahntarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Eine Reinigung für 80 EUR', '60 EUR (DAK-Zuschuss)', '20 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Eine Reinigung für 100 EUR', '60 EUR (DAK-Zuschuss)', '40 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Eine Reinigung für 120 EUR', '60 EUR (DAK-Zuschuss)', '60 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Zwei Reinigungen im Jahr, zusammen 200 EUR', '60 EUR, mehr gibt es im Kalenderjahr nicht', '140 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
          ],
          note: 'Beispiel, keine Preisangabe. Zuschuss: DAK-Satzung § 19 Abs. 6, 66. Nachtrag, Stand 01.08.2026. Die Rechnungsbeträge liegen in der Spanne, die die KZBV bei durchschnittlichem Aufwand nennt (80 bis 120 EUR, Stand Mai 2025); Rest ohne Tarif ist eigene Rechnung. Annahmen: Du bist bei der DAK versichert und reichst rechtzeitig ein. Tarif nach den Unterlagen auf healio.de/zahn, was im Einzelfall erstattungsfähig ist, steht in den Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'bonus',
      heading: 'Gibt es bei der DAK einen Bonus für die Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mittelbar ja. Das Bonusprogramm der DAK, der AktivBonus, belohnt die Zahnvorsorge mit 5 Punkten, ein Punkt hat den Gegenwert von 1 EUR. Die professionelle Zahnreinigung steht nicht im Punktekatalog. Dafür zählt sie zu den selbst bezahlten Gesundheitsleistungen, für die du gesammelte Punkte in einen zweckgebundenen Zuschuss tauschen kannst.',
        },
        {
          type: 'paragraph',
          text: 'Tauschst du die Punkte in einen solchen Zuschuss, steigt ihr Wert laut Anlage zu § 25 in der Kategorie A um den Faktor 1,2. In dieser Kategorie stehen die professionelle Zahnreinigung und die Zusatzversicherung nach § 194 Abs. 1a SGB V. Das ist die Vorschrift, nach der Kassen den Abschluss privater Zusatzversicherungen vermitteln dürfen.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Teilnahme erklären.', text: 'Die Teilnahme ist freiwillig und beginnt zum Ersten des Kalenderjahres, in dem du sie erklärst, nicht vor Beginn der Mitgliedschaft.' },
            { lead: 'Nur selbst bezahlte Leistungen.', text: 'Der Zuschuss gilt nur, soweit die DAK nicht schon nach anderen Regelungen leisten muss.' },
            { lead: 'Einmal je Rechnung, höchstens 500 EUR im Jahr.', text: 'Das Rechnungsdatum darf beim Antrag nicht mehr als 24 Monate zurückliegen.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Eine Beispielrechnung mit den Punktwerten der Anlage: Zahnvorsorge (5 Punkte), ein Check-up (10 Punkte) und eine Schutzimpfung (5 Punkte) ergeben 20 Punkte. Als Zuschuss mit Faktor 1,2 sind das 24 EUR. Die Höhe hängt von deinen Maßnahmen ab. Willst du den Zuschuss für den Beitrag eines Zahntarifs nutzen, entscheidet die DAK, ob sie den Tarif anerkennt.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Der Zusatzbeitrag der DAK liegt bei 3,20 Prozent (Krankenkassenliste des GKV-Spitzenverbands, Stand 7. Oktober 2026). Wie die Bonusprogramme der Kassen im Vergleich abschneiden, siehst du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ', quellenbelegt anhand der Satzungen.' },
          ],
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Zahlt eine Zahnzusatzversicherung die Zahnreinigung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt vom Tarif ab. Bei der UKV ZahnPRIVAT gibt es die professionelle Zahnreinigung in den Top-Stufen. ZahnPRIVAT 100 hat keine Wartezeiten und leistet für die professionelle Zahnreinigung ohne Jahresdeckel. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet.',
        },
        {
          type: 'paragraph',
          text: 'Schau bei jedem Tarif auf den Deckel. Laut Verbraucherzentrale ist die Reinigung in vielen Tarifen gedeckelt, zum Beispiel auf 100 EUR im Kalenderjahr. Der Beitrag hängt unter anderem vom Alter ab. Im Tarifrechner siehst du deinen Beitrag, bevor du den Antrag abschickst.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Welche Stufen es gibt und was sie leisten, steht im Überblick ' },
            { text: 'UKV ZahnPRIVAT', to: '/ratgeber/ukv-zahnzusatzversicherung' },
            { text: '. Ob sich ein Zahntarif für dich rechnet, zeigt der Ratgeber ' },
            { text: 'Lohnt sich eine Zahnzusatzversicherung?', to: '/ratgeber/zahnzusatzversicherung-lohnt-sich' },
            { text: '.' },
          ],
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
      id: 'ehrlich',
      heading: 'Wo hat der Zuschuss Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die 60 EUR sind ein Jahresbetrag.', text: 'Mehr als deine Rechnung zahlt die DAK nie, und bei einer Reinigung für 100 EUR bleibt ein Rest bei dir.' },
            { lead: 'Die Frist ist hart.', text: 'Wer die Rechnung nach dem 31. März des Folgejahres einreicht, bekommt laut Satzung nichts mehr.' },
            { lead: 'Satzungen ändern sich.', text: 'Diese Seite nutzt die Satzung in der Fassung des 66. Nachtrags, Stand 1. August 2026. Die DAK kann den Zuschuss ändern, maßgeblich ist die Satzung zum Zeitpunkt deiner Rechnung.' },
            { lead: 'Ein Zahntarif ist für künftige Kosten da.', text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert.' },
            { lead: 'Wie oft eine Reinigung sinnvoll ist, sagt deine Praxis.', text: 'Dieser Ratgeber gibt dazu keine Empfehlung.' },
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
              icon: 'prevention',
              tone: 'sky',
              title: 'Professionelle Zahnreinigung',
              text: 'Was sie kostet und was 27 Kassen dazugeben.',
              to: '/ratgeber/professionelle-zahnreinigung-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'weighing',
              tone: 'butter',
              title: 'Lohnt sich eine Zahnzusatzversicherung?',
              text: 'Rechnung statt Bauchgefühl, mit Grenzen.',
              to: '/ratgeber/zahnzusatzversicherung-lohnt-sich',
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
      question: 'Wie viel zahlt die DAK für die professionelle Zahnreinigung?',
      answer:
        'Die DAK-Gesundheit gibt laut Satzung 60 EUR je Kalenderjahr dazu, höchstens bis zur Höhe der nachgewiesenen Kosten (§ 19 Abs. 6, 66. Nachtrag, Stand 01.08.2026). Die Rechnung reichst du bis zum 31. März des Folgejahres ein.',
    },
    {
      question: 'Wie oft zahlt die DAK die Zahnreinigung?',
      answer:
        'Der Zuschuss ist ein Betrag je Kalenderjahr: 60 EUR, egal ob eine oder zwei Reinigungen in der Rechnung stehen. Wie oft eine Reinigung zu dir passt, entscheidet deine Praxis nach deinem Befund.',
    },
    {
      question: 'Bis wann muss ich die Rechnung für die Zahnreinigung bei der DAK einreichen?',
      answer:
        'Rechnungen mit Ausstellungsdatum bis zum 31.12. musst du bis zum 31.03. des Folgejahres beantragen. Danach verfällt der Anspruch auf die Erstattung.',
    },
    {
      question: 'Kann ich den DAK-Bonus für die Zahnreinigung nutzen?',
      answer:
        'Du kannst Bonuspunkte in einen zweckgebundenen Zuschuss tauschen, wenn du am AktivBonus teilnimmst. Die Zahnreinigung steht im Katalog der Gesundheitsleistungen mit Faktor 1,2, der Zuschuss gilt aber nur, soweit die DAK nicht schon nach anderen Regelungen zahlt. Er ist je Rechnung einmal möglich und im Jahr auf 500 EUR begrenzt.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung die Zahnreinigung?',
      answer:
        'Bei der UKV ZahnPRIVAT je nach Tarifstufe, in ZahnPRIVAT 100 ohne Jahresdeckel. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. Maßgeblich sind die Tarifbedingungen.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Hol dir die Rechnung deiner nächsten Reinigung und notiere den 31. März. Welcher Zahn-Weg zu deiner Situation passt, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Was die Kasse beim Zahnersatz zahlt, steht auf der Bereichsseite ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Die Zuschüsse weiterer Kassen findest du im Ratgeber ' },
      { text: 'Professionelle Zahnreinigung', to: '/ratgeber/professionelle-zahnreinigung-kosten' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Zuschuss, Frist und Bonusregeln stammen aus der Satzung der DAK, die Kosten aus neutralen Quellen.',
    items: [
      {
        label: 'Satzung der DAK-Gesundheit, § 19 Abs. 6 und § 25',
        publisher: 'DAK-Gesundheit',
        href: 'https://caas.content.dak.de/caas/v1/media/154844/data/8ba8688d145d424a196e94b034a00ed7/satzung-der-dak-gesundheit-in-der-fassung-des-66-nachtrag-stand-01-08-2026.pdf',
        stand: '66. Nachtrag, Stand 01.08.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Anlage zu § 25 der Satzung, Bonusprogramm und Gesundheitsleistungen',
        publisher: 'DAK-Gesundheit',
        href: 'https://caas.content.dak.de/caas/v1/media/224230/data/b3363239bea3a9d0e92d2b5cb2110299/anlage-zu-25-der-satzung-dak-g-bonusprogramm-stand-25-07-2026.pdf',
        stand: 'Stand 25.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Professionelle Zahnreinigung (Patienteninfo)',
        publisher: 'KZBV',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/',
        stand: 'Mai 2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Welche Vor- und Nachteile hat die professionelle Zahnreinigung?',
        publisher: 'IQWiG (gesundheitsinformation.de)',
        href: 'https://www.gesundheitsinformation.de/welche-vor-und-nachteile-hat-die-professionelle-zahnreinigung.html',
        stand: '23.08.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Welche Zahnvorsorge zahlt die Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/welche-zahnvorsorge-zahlt-die-krankenkasse-12913',
        stand: '17.04.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zahnzusatzversicherung, Risiken und Vorteile',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293',
        stand: '23.07.2026',
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
        label: 'Krankenkassenliste mit Zusatzbeiträgen',
        publisher: 'GKV-Spitzenverband',
        href: 'https://www.gkv-spitzenverband.de/service/krankenkassenliste/krankenkassen.jsp',
        stand: 'Listenstand 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT, wie auf healio.de/zahn',
        publisher: 'UKV',
        stand: '05.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur DAK nach der am 7. Oktober 2026 abgerufenen Satzung, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer die Satzung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
