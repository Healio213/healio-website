/**
 * SEO-Umsetzung 14.10.2026, Thema D (Healio/Marktanalyse-2026-10/semrush/
 * KEYWORD-SEITEN-KANDIDATEN-2026-10-14.md, Nr. 5). Suchbegriffe
 * „zahnzusatzversicherung zahnreinigung“ (720) und „zahnreinigung versicherung“
 * (480), Frank-Freigabe 14.10.2026.
 *
 * Abgrenzung: zahnreinigung-krankenkasse beantwortet die Kassenfrage
 * (Regelleistung, Satzungszuschuss je Kasse). Diese Seite beantwortet die
 * Tariffrage: welche Zahnzusatzversicherung die PZR zahlt, wie viel, mit
 * welchem Deckel, und ob sich das gegen den Beitrag rechnet. Gegenseitig
 * verlinkt.
 *
 * Quellen, Abruf 14.10.2026:
 *   - die Bayerische, Highlightblatt Zahn B 333551 (07.2026): PZR Smart 80 EUR
 *     je Kalenderjahr, Komfort 100 EUR je Behandlung, max. 150 EUR je
 *     Kalenderjahr, Prestige 100 EUR je Behandlung, max. 200 EUR je
 *     Kalenderjahr; keine Wartezeiten; Jahresbeitrag eines 33-Jährigen
 *     Smart 152,40 EUR; max. Erstattungssatz 3,5 GOZ.
 *   - IPID ZAHN Prestige und Komfort 2023 (lokal Healio/Zahnzusatz-Unterlagen):
 *     „zahnmedizinische Individualprophylaxe (professionelle Zahnreinigung) zu
 *     100 % bis maximal 100 EUR je Anwendung und 200 EUR (Komfort 150 EUR)
 *     innerhalb eines Kalenderjahres“, deckungsgleich mit dem Highlightblatt.
 *   - UKV ZahnPRIVAT wortgleich mit src/components/sections/dental/
 *     dentalContent.js: PZR in den Top-Stufen, 90 und 100 ohne Jahresdeckel,
 *     in Stufe 75 eigene Jahresgrenze (Betrag dort nicht genannt, deshalb
 *     hier auch nicht), keine Wartezeiten, 100 % nach Abzug der Kassenleistung
 *     in ZahnPRIVAT 100.
 *   - Kassenseite wie zahnreinigung-krankenkasse.js: TK § 27o bis zu 40 EUR,
 *     KZBV 80 bis 120 EUR je Sitzung, BEMA 107.
 * Die Kostenkarte ist eigene Rechnung mit Annahmen, so gekennzeichnet.
 */
export const article = {
  slug: 'zahnzusatzversicherung-zahnreinigung-2026',
  kind: 'ratgeber',
  group: 'zaehne',
  metaTitle: 'Zahnzusatzversicherung Zahnreinigung 2026: PZR-Tarife | Healio',
  metaDescription: 'Zahnzusatzversicherung mit Zahnreinigung 2026: welche Tarife die PZR zahlen, wie hoch der Deckel je Jahr ist und wann sich das gegen den Beitrag rechnet.',
  publishedAt: '2026-10-14',
  publishedAtLabel: '14. Oktober 2026',
  readingTimeMinutes: 7,
  listTitle: 'Zahnzusatzversicherung mit Zahnreinigung 2026',
  listTeaser: 'Welche Zahntarife die professionelle Zahnreinigung zahlen, mit welchem Deckel und warum die PZR allein selten den Beitrag trägt.',
  headline: 'Zahnzusatzversicherung mit Zahnreinigung 2026: Welche Tarife die PZR zahlen',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '80 bis 200 EUR', label: 'im Jahr zahlt die Bayerische je nach Tarif für die Zahnreinigung' },
      { value: 'ohne Jahresdeckel', label: 'ist die PZR bei UKV ZahnPRIVAT 90 und 100' },
      { value: '80 bis 120 EUR', label: 'kostet eine Sitzung laut KZBV bei durchschnittlichem Aufwand' }
    ],
    text: 'Viele Zahntarife zahlen die professionelle Zahnreinigung mit, meist mit einem Deckel je Behandlung oder Jahr. Für die Reinigung allein lohnt sich kaum ein Tarif.',
    path: { to: '/zahn#zahn-check', text: 'Zahnreinigung im Tarif mitversichern?', label: 'Zahn-Check starten' }
  },
  lead: 'Zwei Reinigungen im Jahr, je rund 100 EUR, und die Kasse gibt vielleicht 40 EUR dazu. Wer das jedes Jahr selbst zahlt, fragt sich irgendwann: Zahlt eine Zahnzusatzversicherung die Zahnreinigung? Ja, viele tun das. Aber die Unterschiede sind groß, von 80 EUR im Jahr bis ohne Jahresdeckel. Hier siehst du, welche Tarife die professionelle Zahnreinigung, kurz PZR, zahlen, wo der Deckel liegt und warum du den Tarif nicht nur wegen der Reinigung abschließen solltest.',
  sections: [
    {
      id: 'kasse-zuerst',
      heading: 'Was zahlt die Krankenkasse, bevor der Tarif greift?',
      blocks: [
        { type: 'paragraph', text: 'Wenig. Die gesetzliche Kasse zahlt einmal im Kalenderjahr die Zahnsteinentfernung (BEMA-Nummer 107). Die PZR ist keine Regelleistung. Manche Kassen geben über ihre Satzung einen Zuschuss, die TK etwa bis zu 40 EUR im Kalenderjahr, andere nur über das Bonusprogramm oder gar nichts.' },
        { type: 'paragraph', text: 'Laut KZBV kostet eine PZR bei durchschnittlichem Aufwand 80 bis 120 EUR. Bei zwei Terminen im Jahr bleiben also schnell 120 bis 200 EUR an dir hängen. Genau diese Lücke soll ein Zahntarif schließen. Kasse und Tarif zusammen erstatten dabei nie mehr als die Rechnung.' },
        { type: 'segments', segments: [
          { text: 'Was deine Kasse genau gibt und wie du den Zuschuss holst, steht im Ratgeber ' },
          { text: 'Zahnreinigung: Was zahlt die Krankenkasse?', to: '/ratgeber/zahnreinigung-krankenkasse' },
          { text: '. Die Kosten nach Gebührenordnung erklärt ' },
          { text: 'Professionelle Zahnreinigung: Kosten', to: '/ratgeber/professionelle-zahnreinigung-kosten' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'tarife',
      heading: 'Welche Zahnzusatzversicherung zahlt die professionelle Zahnreinigung?',
      blocks: [
        { type: 'paragraph', text: 'Die beiden Zahnversicherer im Zahn-Check auf healio.de/zahn zahlen beide für die PZR, aber nach verschiedenen Regeln. Die Bayerische zahlt einen festen Betrag je Behandlung mit Jahresgrenze. Die UKV zahlt in den oberen Stufen ohne Jahresdeckel. Wartezeiten gibt es bei beiden nicht, die erste Reinigung nach Vertragsbeginn zählt schon.' },
        { type: 'table', mobile: 'cards', caption: 'Zahnreinigung in den Zahntarifen der Bayerischen und der UKV',
          head: ['Tarif', 'Leistung für die PZR', 'Grenze', 'Wartezeit'],
          rows: [
            ['Bayerische ZAHN Smart', 'bis 80 EUR', '80 EUR je Kalenderjahr', 'keine'],
            ['Bayerische ZAHN Komfort', 'bis 100 EUR je Behandlung', 'höchstens 150 EUR je Kalenderjahr', 'keine'],
            ['Bayerische ZAHN Prestige', 'bis 100 EUR je Behandlung', 'höchstens 200 EUR je Kalenderjahr', 'keine'],
            ['UKV ZahnPRIVAT 100', '100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung', 'ohne Jahresdeckel', 'keine'],
            ['UKV ZahnPRIVAT 90', 'Erstattung nach dem Satz der Stufe', 'ohne Jahresdeckel', 'keine'],
            ['UKV ZahnPRIVAT 75', 'Erstattung nach dem Satz der Stufe', 'eigene Jahresgrenze, Höhe im Tarifrechner', 'keine']
          ],
          note: 'Bayerische: Highlightblatt Zahn B 333551, Stand 07.2026, und Produktinformationsblätter ZAHN Komfort und Prestige. UKV: Tarifangaben wie auf healio.de/zahn, Abruf 14.10.2026. Verbindlich sind Antrag und Tarifbedingungen.' },
        { type: 'paragraph', text: 'Achte auf das Kleingedruckte zur Abrechnung. Die Bayerische erstattet höchstens bis zum 3,5-fachen Satz der Gebührenordnung für Zahnärzte. Die PZR rechnet die Praxis nach GOZ-Nummer 1040 je Zahn ab. Bei vielen Zähnen und hohem Steigerungssatz kann eine Sitzung über dem Deckel je Behandlung liegen.' }
      ]
    },
    {
      id: 'rechnung',
      heading: 'Wie viel bleibt bei zwei Reinigungen im Jahr bei dir?',
      blocks: [
        { type: 'paragraph', text: 'Ein Beispiel macht den Unterschied sichtbar. Du bist bei der TK, gehst zweimal im Jahr zur Reinigung und zahlst je 100 EUR. Die TK gibt bis zu 40 EUR dazu, den Rest erstattet je nach Tarif die Zahnzusatzversicherung.' },
        { type: 'costCard', title: 'Zwei Zahnreinigungen zu je 100 EUR im Kalenderjahr', icon: 'calculator',
          tariffLabel: 'Eigene Beispielrechnung für eine Person bei der TK, Kalenderjahr 2026. Annahmen: Rechnung voll erstattungsfähig, TK-Zuschuss zuerst, Kasse und Tarif zusammen höchstens die Rechnung.',
          caption: 'Kostenkarte: zwei Zahnreinigungen mit verschiedenen Tarifen',
          head: ['Tarif', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Bayerische ZAHN Smart', 'bis zu 40 EUR', '160 EUR', '80 EUR, der Tarif zahlt 80 EUR'],
            ['Bayerische ZAHN Komfort', 'bis zu 40 EUR', '160 EUR', '10 EUR, der Tarif zahlt 150 EUR'],
            ['Bayerische ZAHN Prestige', 'bis zu 40 EUR', '160 EUR', 'nichts mehr, der Tarif zahlt den Rest von 160 EUR'],
            ['UKV ZahnPRIVAT 100', 'bis zu 40 EUR', '160 EUR', 'nichts mehr, der Tarif erstattet den erstattungsfähigen Rest']
          ],
          note: 'Eigene Rechnung, keine Preisangabe. 100 EUR je Sitzung liegt in der KZBV-Spanne von 80 bis 120 EUR. TK-Zuschuss laut Satzung § 27o (130. Nachtrag), PZR-Grenzen laut Highlightblatt Zahn B 333551 und Tarifangaben der UKV. Ob eine Rechnung voll erstattungsfähig ist, hängt von GOZ-Satz und Tarifbedingungen ab.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.' }
      ]
    },
    {
      id: 'lohnt',
      heading: 'Lohnt sich eine Zahnzusatzversicherung nur für die Zahnreinigung?',
      blocks: [
        { type: 'paragraph', text: 'Meistens nicht. Ein Beispiel der Bayerischen: Für einen 33-Jährigen kostet ZAHN Smart 152,40 EUR im Jahr. Für die Reinigung zahlt der Tarif höchstens 80 EUR im Jahr. Wer nur wegen der PZR abschließt, zahlt drauf. In den höheren Stufen steigt der Beitrag schneller als der Reinigungsdeckel.' },
        { type: 'paragraph', text: 'Die Rechnung dreht sich, wenn du den Tarif ohnehin für Zahnersatz willst. Eine Krone, ein Inlay oder ein Implantat kostet schnell vierstellig, die Kasse zahlt nur den Festzuschuss. Die Reinigung ist dann der Teil, den du jedes Jahr zurückbekommst, auch wenn sonst nichts passiert. Und dein Kassenbonus kann einen Teil des Beitrags tragen. Gegenzurechnen ist immer der Zusatzbeitrag deiner Kasse.' },
        { type: 'segments', segments: [
          { text: 'Wie die UKV-Stufen sich sonst unterscheiden, steht im Ratgeber ' },
          { text: 'UKV Zahnzusatzversicherung', to: '/ratgeber/ukv-zahnzusatzversicherung' },
          { text: ', die drei Tarifvarianten der Bayerischen unter ' },
          { text: 'Bayerische Zahnzusatzversicherung', to: '/ratgeber/bayerische-zahnzusatzversicherung' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'grenzen',
      heading: 'Worauf musst du bei der Zahnreinigung im Tarif achten?',
      blocks: [
        { type: 'list', items: [
          { lead: 'Deckel je Behandlung und je Jahr:', text: 'Zwei Grenzen können gleichzeitig greifen. Bei ZAHN Komfort sind es 100 EUR je Behandlung und 150 EUR im Jahr.' },
          { lead: 'PZR ist nicht Zahnsteinentfernung:', text: 'Die Zahnsteinentfernung zahlt die Kasse. Der Tarif zahlt für die private PZR, die Praxis muss sie so abrechnen.' },
          { lead: 'Parodontitis ist ein anderer Weg:', text: 'Die Nachsorge nach einer Parodontitisbehandlung ist eine eigene Kassenleistung und keine PZR. Eine Parodontitis in der Vorgeschichte fragen die Versicherer im Antrag ab.' },
          { lead: 'Gesundheitsfragen beantworten:', text: 'Beide Versicherer stellen Fragen zu Zähnen und Behandlungen. Was in den letzten 2 Jahren angeraten wurde oder läuft, ist im normalen Tarif nicht versichert.' }
        ] },
        { type: 'path', to: '/zahn#zahn-check', icon: 'dental', text: 'Vier kurze Fragen, dann siehst du, welcher Zahntarifweg zu dir passt.', label: 'Zahn-Check starten' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Für die Reinigung allein rechnet sich kein Tarif.', text: 'Der Jahresbeitrag liegt in aller Regel über dem, was der Tarif für die PZR zahlt. Der Wert liegt im Schutz für Zahnersatz.' },
          { lead: 'Ob du zweimal im Jahr zur PZR solltest, entscheidet deine Praxis.', text: 'Ob die PZR bei guter Mundgesundheit besser schützt als die Zahnsteinentfernung, lässt sich laut IQWiG derzeit nicht eindeutig beurteilen.' },
          { lead: 'Tarife und Satzungen ändern sich.', text: 'Es zählt der Stand bei deinem Abschluss und bei deiner Rechnung.' }
        ] },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Zahnreinigung: Was zahlt die Krankenkasse?', text: 'Regelleistung, Satzungszuschuss und Bonus der großen Kassen.', to: '/ratgeber/zahnreinigung-krankenkasse', icon: 'dental', linkLabel: 'Ratgeber lesen' },
          { title: 'Zahnersatz Kosten', text: 'Was die Kasse beim Zahnarzt zahlt und was bei dir bleibt.', to: '/ratgeber/zahnersatz-kosten', icon: 'comparison', linkLabel: 'Zur Übersicht' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Die professionelle Zahnreinigung ist keine Regelleistung der Kasse und kostet laut KZBV 80 bis 120 EUR je Sitzung. Die Bayerische zahlt dafür je nach Tarif 80 EUR bis 200 EUR im Kalenderjahr, die UKV in ZahnPRIVAT 90 und 100 ohne Jahresdeckel. Beide Zahntarife haben keine Wartezeit.',
  faqs: [
    { question: 'Welche Zahnzusatzversicherung zahlt die Zahnreinigung?', answer: 'Viele Zahntarife zahlen die professionelle Zahnreinigung. Bei der Bayerischen sind es je nach Tarif 80 EUR bis 200 EUR im Kalenderjahr, bei der UKV in ZahnPRIVAT 90 und 100 ohne Jahresdeckel. In ZahnPRIVAT 75 gilt eine eigene Jahresgrenze.' },
    { question: 'Gibt es eine Zahnreinigung-Versicherung ohne Wartezeit?', answer: 'Ja. Die Zahntarife der Bayerischen und der UKV haben keine Wartezeiten. Die erste Reinigung nach Vertragsbeginn zählt schon.' },
    { question: 'Wie oft im Jahr zahlt die Zahnzusatzversicherung die PZR?', answer: 'Das hängt vom Tarif ab. Manche begrenzen den Betrag je Behandlung und je Jahr, etwa ZAHN Komfort mit 100 EUR je Behandlung und 150 EUR im Jahr. Ohne Jahresdeckel zählt nur, was erstattungsfähig ist.' },
    { question: 'Wird der Zuschuss der Krankenkasse angerechnet?', answer: 'Kasse und Zusatzversicherung erstatten zusammen nie mehr als die Rechnung. UKV ZahnPRIVAT 100 erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Reiche den Satzungszuschuss deiner Kasse deshalb immer mit ein.' },
    { question: 'Lohnt sich eine Zahnzusatzversicherung nur wegen der Zahnreinigung?', answer: 'Meistens nicht. Der Jahresbeitrag liegt in der Regel über der PZR-Leistung, bei ZAHN Smart etwa 152,40 EUR Beitrag für einen 33-Jährigen gegen höchstens 80 EUR für die Reinigung. Sinnvoll wird der Tarif, wenn du auch Zahnersatz mitversichern willst.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welcher Zahntarif zu dir passt, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Welche Kasse mit Zuschuss und Bonus zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-14',
    checkedAtLabel: '14. Oktober 2026',
    intro: 'Tarifleistungen, Kassenleistung, Kosten und Zuschuss stammen aus diesen Quellen. Die Kostenkarte ist eigene Rechnung.',
    items: [
      { label: 'Highlightblatt Zahnzusatzversicherung (B 333551), Tarifvarianten und PZR-Leistung', publisher: 'die Bayerische', href: 'https://www.diebayerische.de/dam/jcr:65e23042-960a-4478-90c7-a249e0b5f628/B%20333551%20Highlightblatt%20allgemein%20Stadt_Zahn.PDF', stand: '07.2026', accessedAt: '14.10.2026' },
      { label: 'Tarifunterlagen UKV ZahnPRIVAT, wie auf healio.de/zahn', publisher: 'UKV', href: 'https://healio.de/zahn', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' },
      { label: 'Professionelle Zahnreinigung (Patienteninfo)', publisher: 'KZBV', href: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/', stand: 'Mai 2025', accessedAt: '14.10.2026' },
      { label: 'BEMA, Nr. 107', publisher: 'KZBV', href: 'https://www.kzbv.de/wp-content/uploads/KZBV_BEMA_2026-01-01.pdf', stand: '01.01.2026', accessedAt: '06.10.2026' },
      { label: 'Satzung der TK, § 27o', publisher: 'Techniker Krankenkasse', href: 'https://www.tk.de/resource/blob/2077108/5892771f11e082ade44439e64bbda68c/tk-satzung-data.pdf', stand: '130. Nachtrag, 17.04.2026', accessedAt: '07.10.2026' },
      { label: 'Welche Vor- und Nachteile hat die professionelle Zahnreinigung?', publisher: 'IQWiG (gesundheitsinformation.de)', href: 'https://www.gesundheitsinformation.de/welche-vor-und-nachteile-hat-die-professionelle-zahnreinigung.html', stand: '23.08.2023', accessedAt: '06.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Tarifangaben nach den Unterlagen der Bayerischen und der UKV, Kassenzuschuss nach Satzung, Stand Oktober 2026. Maßgeblich sind Antrag, Versicherungsschein und Bedingungen des Versicherers.'
};

export default article;
