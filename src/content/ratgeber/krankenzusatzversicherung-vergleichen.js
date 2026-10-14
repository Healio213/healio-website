/**
 * SEO-Umsetzung 14.10.2026, Thema C2 (Healio/Marktanalyse-2026-10/semrush/
 * UMSETZUNG-AUFTRAG-2026-10-14.md). Suchbegriffe „vergleich
 * krankenzusatzversicherung“ (880), „vergleich private
 * krankenzusatzversicherung“ (1.000), „beste krankenzusatzversicherung“ (320).
 *
 * Keine Testurteile, kein „bester Tarif für alle“. Vergleichskriterien nach
 * Verbraucherzentrale 10425 (Stand 19.08.2025) und § 197 VVG. Tarifangaben
 * wortgleich mit den Produktseiten: SDK AP (ambulantFaqs.js,
 * sdkAmbulantBeitraege.js, Stand 29.09.2026), UKV ZahnPRIVAT
 * (dentalContent.js), SDK SP1/SP2/SPU (stationaer.json). Kassenbonus als
 * zweckgebundener Zuschuss, nie als Auszahlung: § 65a SGB V, BARMER-Satzung
 * (38. Nachtrag), wie barmer-bonusprogramm-2026.js.
 */
export const article = {
  slug: 'krankenzusatzversicherung-vergleichen',
  kind: 'ratgeber',
  group: 'kasse-bonus',
  metaTitle: 'Krankenzusatzversicherung vergleichen: die Kriterien | Healio',
  metaDescription: 'Krankenzusatzversicherung vergleichen: Welche Kriterien zählen, welcher Baustein zuerst passt und wie dein Kassenbonus den Beitrag mittragen kann.',
  publishedAt: '2026-10-14',
  publishedAtLabel: '14. Oktober 2026',
  readingTimeMinutes: 8,
  listTitle: 'Krankenzusatzversicherung vergleichen',
  listTeaser: 'Leistung, Grenzen, Wartezeit, Gesundheitsfragen und Beitrag: worauf es beim Vergleich wirklich ankommt.',
  headline: 'Krankenzusatzversicherung vergleichen: Worauf es wirklich ankommt',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'comparison',
    facts: [
      { value: '3 Bausteine', label: 'ambulant, Zähne und Krankenhaus getrennt vergleichen' },
      { value: 'bis zu 3.000 EUR', label: 'in zwei Jahren im ambulanten SDK-Tarif Ambulant 100' },
      { value: 'Kassenbonus', label: 'kann bei vielen Kassen den Beitrag mittragen' }
    ],
    text: 'Den einen besten Tarif für alle gibt es nicht. Vergleiche zuerst, was du brauchst, dann Leistung, Grenzen, Wartezeit und Gesundheitsfragen. Der Beitrag kommt erst danach, und dein Kassenbonus kann ihn mittragen.',
    path: { to: '/ambulant', text: 'Ambulanten Schutz mit Bonus vergleichen', label: 'Zum ambulanten Schutz' }
  },
  lead: 'Wer Krankenzusatzversicherungen vergleicht, landet schnell bei Ranglisten und Preisen ab wenigen Euro. Das verrät wenig. Eine Zusatzversicherung ist nur so gut wie die Rechnung, die sie am Ende tatsächlich zahlt. Hier steht, in welcher Reihenfolge du vergleichst, welche Kriterien zählen und wie du den Beitrag über den Bonus deiner Krankenkasse finanzieren kannst.',
  sections: [
    {
      id: 'reihenfolge',
      heading: 'Womit fängst du beim Vergleich an?',
      blocks: [
        { type: 'paragraph', text: 'Mit deinem Bedarf, nicht mit dem Preis. Krankenzusatzversicherung ist ein Sammelbegriff für sehr unterschiedliche Verträge: ambulanter Schutz für Heilpraktiker, Osteopathie, Brille und Vorsorge, die Zahnzusatzversicherung und die Krankenhauszusatzversicherung. Jeder Baustein deckt andere Rechnungen ab und wird für sich verglichen.' },
        { type: 'paragraph', text: 'Die Verbraucherzentrale rät, vor jedem Vergleich zu fragen, ob die Versicherung notwendig ist, welche Leistungen sie bietet und ob du alle davon brauchst. Wer nie zum Heilpraktiker geht, braucht keinen großen Naturheil-Topf. Wer viel selbst zahlt, für den rechnet sich der Schutz eher.' },
        { type: 'table', mobile: 'cards', caption: 'Welcher Baustein welche Lücke schließt',
          head: ['Baustein', 'Typische Kosten, die du sonst selbst trägst', 'Passender Weg bei Healio'],
          rows: [
            ['Ambulant', 'Heilpraktiker, Osteopathie, Brille, Vorsorge, gesetzliche Zuzahlungen', 'SDK Ambulant, healio.de/ambulant'],
            ['Zähne', 'Eigenanteil bei Zahnersatz, Implantate, professionelle Zahnreinigung', 'UKV ZahnPRIVAT, healio.de/zahn'],
            ['Krankenhaus', 'Ein- oder Zweibettzimmer, private ärztliche Behandlung', 'SDK SP1 und SP2, healio.de/stationaer']
          ],
          note: 'Angaben nach den Produktseiten von Healio, Abruf 14. Oktober 2026. Was erstattet wird, regeln die Tarifbedingungen.' }
      ]
    },
    {
      id: 'kriterien',
      heading: 'Welche Kriterien zählen beim Vergleich wirklich?',
      blocks: [
        { type: 'paragraph', text: 'Fünf Punkte entscheiden, ob ein Tarif im Ernstfall zahlt. Der Monatsbeitrag gehört dazu, aber erst am Schluss. Ein günstiger Tarif mit niedrigem Höchstbetrag kann dich am Ende mehr kosten als ein teurerer, der die Rechnung wirklich übernimmt.' },
        { type: 'steps', heading: 'Die fünf Vergleichsfragen', items: [
          { title: 'Erstattungssatz', text: 'Wie viel Prozent der erstattungsfähigen Rechnung zahlt der Tarif, und nach welcher Abrechnungsgrundlage?' },
          { title: 'Höchstbeträge und Staffeln', text: 'Wie viel gibt es je Jahr oder je zwei Jahre, und ist der Betrag in den ersten Jahren begrenzt?' },
          { title: 'Wartezeit', text: 'Ab wann leistet der Tarif? Eine vereinbarte allgemeine Wartezeit darf nach § 197 VVG höchstens drei Monate betragen.' },
          { title: 'Gesundheitsfragen und Annahme', text: 'Was fragt der Antrag, und lehnt der Versicherer bei Vorerkrankungen ab oder verlangt einen Zuschlag?' },
          { title: 'Beitrag über die Jahre', text: 'Wie steigt der Beitrag mit dem Alter, und was trägt dein Kassenbonus davon?' }
        ] },
        { type: 'paragraph', text: 'Die Verbraucherzentrale weist darauf hin, dass viele Gesellschaften die Leistungen in den ersten Jahren begrenzen, teils dauerhaft auf einen Höchstbetrag. Was genau versichert ist, steht nur in den Bedingungen und Tarifbeschreibungen. Ein Vergleich, der diese Punkte nicht zeigt, bleibt ein Preisvergleich.' }
      ]
    },
    {
      id: 'annahme',
      heading: 'Warum gehören Gesundheitsfragen und laufende Behandlungen in den Vergleich?',
      blocks: [
        { type: 'paragraph', text: 'Weil der beste Tarif nichts nützt, wenn du nicht aufgenommen wirst. Private Zusatzversicherungen fragen fast immer nach der Gesundheit. Manche lehnen bei Vorerkrankungen ab, andere nehmen mit Risikozuschlag oder einem Ausschluss an. Für Menschen mit Vorgeschichte ist das oft das wichtigste Kriterium überhaupt.' },
        { type: 'paragraph', text: 'Im ambulanten SDK-Tarif beantwortest du Gesundheitsfragen, wirst deshalb aber nicht abgelehnt. Vorerkrankungen versichert die SDK über einen Zuschlag mit, ohne Leistungsausschluss. Bei den Klinik-Tarifen SP1 und SP2 entscheidet der Versicherer die Annahme im Antrag. Bei der UKV ZahnPRIVAT haben die Fragen jeweils eigene Zeiträume.' },
        { type: 'paragraph', text: 'In jedem Baustein gilt: Was vor Versicherungsbeginn schon läuft oder angeraten ist, zahlt der neue Vertrag nicht. Wer vergleicht, während die Behandlung schon geplant ist, vergleicht deshalb oft zu spät.' },
        { type: 'segments', segments: [
          { text: 'Wo du trotz Vorerkrankung angenommen wirst, erklärt der Ratgeber ' },
          { text: 'Zusatzversicherung trotz Vorerkrankung', to: '/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'healio-tarife',
      heading: 'Wie schneiden die Tarife ab, die Healio vermittelt?',
      blocks: [
        { type: 'paragraph', text: 'Healio vermittelt je Baustein wenige, geprüfte Tarife und zeigt ihre Grenzen offen. Die Tabelle fasst die Vergleichsfragen für die Hauptwege zusammen. Die Beiträge sind Beispiele für ein Alter, dein persönlicher Beitrag steht im Rechner des Versicherers.' },
        { type: 'table', mobile: 'cards', caption: 'Vergleichskriterien der Healio-Hauptwege, Stand 14. Oktober 2026',
          head: ['Kriterium', 'SDK Ambulant 100 (AP1)', 'UKV ZahnPRIVAT 100', 'SDK Klinik SP2'],
          rows: [
            ['Leistung', '100 %, vier Töpfe mit zusammen bis zu 3.000 EUR in zwei Jahren', '100 % der erstattungsfähigen Kosten nach Kassenleistung', 'Zweibettzimmer und private ärztliche Behandlung'],
            ['Wartezeit', 'Keine allgemeine Wartezeit', 'Keine Wartezeiten', 'Ohne allgemeine Wartezeit für neue Fälle laut Produktseite'],
            ['Gesundheitsfragen', 'Ja, ohne Ablehnung, Vorerkrankungen per Zuschlag mitversichert', 'Ja, mit eigenen Zeiträumen je Frage', 'Ja, individuelle Annahme im Antrag'],
            ['Beispielbeitrag', '39,19 EUR im Monat, Alter 31 bis 40', 'Im Rechner nach Alter', '33,41 EUR im Monat, Alter 30']
          ],
          note: 'Quellen: healio.de/ambulant (SDK-Beiträge Stand 29.09.2026), healio.de/zahn, healio.de/stationaer, Abruf 14. Oktober 2026. Laufende oder angeratene Behandlungen sind in keinem der Tarife versichert.' },
        { type: 'paragraph', text: 'Die 3.000 EUR im ambulanten Tarif sind kein frei verfügbares Guthaben. Der Betrag verteilt sich auf 1.000 EUR für Naturheilverfahren, 500 EUR für Sehhilfen, 500 EUR für Vorsorge und 1.000 EUR für Hilfsmittel und gesetzliche Zuzahlungen, je zwei Kalenderjahre ab Versicherungsbeginn.' },
        { type: 'path', to: '/ambulant#tarifwahl', icon: 'calculator', text: 'Stufe wählen, Geburtsjahr eingeben und den Beitrag neben die Töpfe legen.', label: 'Zum ambulanten Rechner' }
      ]
    },
    {
      id: 'kassenbonus',
      heading: 'Wie kann dein Kassenbonus den Beitrag finanzieren?',
      blocks: [
        { type: 'paragraph', text: 'Viele gesetzliche Krankenkassen belohnen Vorsorge, Impfungen und Sport über ein Bonusprogramm nach § 65a SGB V. Einige zahlen den Bonus wahlweise als zweckgebundenen Zuschuss, mit dem du den Beitrag einer privaten Zusatzversicherung mitfinanzierst. Bei der BARMER ist dieser Zuschuss laut Satzung doppelt so hoch wie die Auszahlung, höchstens 200 EUR im Jahr.' },
        { type: 'paragraph', text: 'Damit verschiebt sich die Rechnung. Die Frage ist nicht mehr, ob du dir eine weitere Versicherung leisten kannst, sondern ob du den Bonus liegen lässt, der sie mitbezahlen könnte. Wie viel bei dir zusammenkommt, hängt von deiner Kasse und deinen Aktivitäten ab. Mehr als die nachgewiesenen Kosten wird nie erstattet.' },
        { type: 'segments', segments: [
          { text: 'Wie Bonus und Zusatzversicherung zusammenspielen, zeigt der Ratgeber ' },
          { text: 'Krankenkassenbonus und Zusatzversicherung', to: '/ratgeber/krankenkassen-bonus-zusatzversicherung' },
          { text: '. Gegenzurechnen ist immer der Zusatzbeitrag deiner Kasse, mehr dazu unter ' },
          { text: 'Zusatzbeitrag 2026', to: '/ratgeber/zusatzbeitrag-krankenkasse-2026' },
          { text: '. Welche Kasse mit Bonus und Beitrag am besten zu deinem Tarif passt, vergleichst du auf ' },
          { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'fehler',
      heading: 'Welche Fehler machen Vergleiche oft?',
      blocks: [
        { type: 'paragraph', text: 'Der häufigste Fehler ist, nur den Monatsbeitrag zu sortieren. Dann rutschen Tarife nach oben, die in den ersten Jahren wenig zahlen oder Leistungen ausschließen, die du gerade brauchst. Ebenso trügerisch sind Durchschnittsnoten, die nicht zeigen, wie ein Tarif bei deiner Rechnung leistet.' },
        { type: 'paragraph', text: 'Der zweite Fehler ist der Zeitpunkt. Wer erst vergleicht, wenn der Zahnarzt eine Krone angeraten hat oder ein Krankenhausaufenthalt geplant ist, findet keinen Tarif mehr, der genau diese Behandlung übernimmt. Und der dritte: Die Krankenkasse wird nicht mitgedacht, obwohl ihr Bonus und ihr Zusatzbeitrag den echten Preis des Schutzes mitbestimmen.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Den besten Tarif für alle gibt es nicht.', text: 'Welcher Tarif passt, hängt von deinem Bedarf und deiner Vorgeschichte ab.' },
          { lead: 'Der Bonus ist kein fester Betrag.', text: 'Er hängt von Kasse und Aktivitäten ab und wird nur zweckgebunden gezahlt.' },
          { lead: 'Zu spät ist zu spät.', text: 'Laufende oder angeratene Behandlungen zahlt kein neuer Vertrag.' }
        ] }
      ]
    },
    {
      id: 'weiter',
      heading: 'Wie gehst du jetzt am besten vor?',
      blocks: [
        { type: 'paragraph', text: 'Leg fest, welchen Baustein du zuerst brauchst. Vergleiche ihn mit den fünf Fragen, prüfe die Gesundheitsfragen im Antrag und rechne zum Schluss den Beitrag gegen deinen möglichen Kassenbonus. Für die Zähne startest du den Zahn-Check, für das Krankenhaus den Klinik-Rechner, für alles Ambulante den Beitragsrechner.' },
        { type: 'segments', segments: [
          { text: 'Zu den Bausteinen: ' },
          { text: 'healio.de/ambulant', to: '/ambulant' },
          { text: ', ' },
          { text: 'healio.de/zahn', to: '/zahn' },
          { text: ' und ' },
          { text: 'healio.de/stationaer', to: '/stationaer' },
          { text: '.' }
        ] },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Bonusprogramme der Krankenkassen', text: 'Was die Kassen zahlen und wie du den Bonus abholst.', to: '/ratgeber/bonusprogramm-krankenkasse', icon: 'bonus', linkLabel: 'Zur Übersicht' },
          { title: 'Krankenkasse wechseln', text: 'Wann ein Wechsel wegen Bonus und Beitrag passt.', to: '/ratgeber/krankenkasse-wechseln', icon: 'comparison', linkLabel: 'Ratgeber lesen' },
          { title: 'Zahnzusatzversicherung vergleichen', text: 'Worauf du bei Zahntarifen achtest.', to: '/ratgeber/zahnzusatzversicherung-vergleich', icon: 'dental', linkLabel: 'Ratgeber lesen' },
          { title: 'Krankenhauszusatzversicherung vergleichen', text: 'Zimmer, Arztwahl und Beitrag nebeneinander.', to: '/ratgeber/krankenhauszusatzversicherung-vergleich', icon: 'hospital', linkLabel: 'Ratgeber lesen' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Beim Vergleich zählen Erstattungssatz, Höchstbeträge, Wartezeit, Gesundheitsfragen und erst danach der Beitrag. Im ambulanten SDK-Tarif Ambulant 100 stehen bis zu 3.000 EUR in zwei Jahren in vier Töpfen bereit. Ein Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss den Beitrag mittragen.',
  faqs: [
    { question: 'Welche Krankenzusatzversicherung ist die beste?', answer: 'Das hängt von deinem Bedarf ab. Vergleiche zuerst den Baustein, den du brauchst, dann Erstattungssatz, Höchstbeträge, Wartezeit, Gesundheitsfragen und Beitrag. Eine Durchschnittsnote ersetzt diesen Abgleich nicht.' },
    { question: 'Was ist beim Vergleich wichtiger, Beitrag oder Leistung?', answer: 'Die Leistung. Ein günstiger Tarif mit niedrigen Höchstbeträgen oder Staffeln in den ersten Jahren zahlt im Ernstfall oft wenig. Den Beitrag vergleichst du erst, wenn Leistung und Annahme passen.' },
    { question: 'Kann ich mehrere Zusatzversicherungen kombinieren?', answer: 'Ja, ambulant, Zähne und Krankenhaus sind getrennte Bausteine. Bei gleichartigem Schutz prüft mancher Versicherer im Antrag, ob du schon einen Vertrag bei einer anderen Gesellschaft hast.' },
    { question: 'Zahlt meine Krankenkasse einen Zuschuss zur Zusatzversicherung?', answer: 'Manche Kassen zahlen ihren Bonus wahlweise als zweckgebundenen Zuschuss für eine private Zusatzversicherung. Die BARMER zum Beispiel laut Satzung bis zu 200 EUR im Jahr. Wie viel bei dir möglich ist, hängt von Kasse und Aktivitäten ab.' },
    { question: 'Ab wann leistet eine Krankenzusatzversicherung?', answer: 'Das regelt der Tarif. Eine allgemeine Wartezeit darf nach § 197 VVG höchstens drei Monate betragen. Die ambulanten SDK-Tarife haben keine allgemeine Wartezeit. Behandlungen, die vor Beginn laufen oder angeraten sind, sind in keinem Fall versichert.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Den ambulanten Schutz mit bis zu 3.000 EUR in zwei Jahren siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Wie dein Bonus den Beitrag mitträgt, steht auf ' },
      { text: 'healio.de/kassenbonus', to: '/kassenbonus' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-14',
    checkedAtLabel: '14. Oktober 2026',
    intro: 'Vergleichskriterien, gesetzliche Grenzen, Tarifangaben und Bonusregeln stammen aus diesen Quellen.',
    items: [
      { label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung', publisher: 'Verbraucherzentrale', href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425', stand: '19. August 2025', accessedAt: '14.10.2026' },
      { label: 'Vereinbarte Wartezeiten, § 197 VVG', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/vvg_2008/__197.html', stand: 'Geltende Fassung', accessedAt: '14.10.2026' },
      { label: 'Bonus für gesundheitsbewusstes Verhalten, § 65a SGB V', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/sgb_5/__65a.html', stand: 'Geltende Fassung', accessedAt: '14.10.2026' },
      { label: 'Satzung der BARMER, Bonusprogramm', publisher: 'BARMER', href: 'https://www.barmer.de/resource/blob/1022552/b2c26cec88be1e70caad268f9961fd09/barmer-satzung-der-barmer-barrierefrei-19-data.pdf', stand: '38. Nachtrag, Stand 21.07.2026', accessedAt: '07.10.2026' },
      { label: 'Ambulanter Schutz und SDK-Beiträge', publisher: 'Healio', href: 'https://healio.de/ambulant', stand: 'Live-Abruf 14. Oktober 2026, Beiträge 29. September 2026', accessedAt: '14.10.2026' },
      { label: 'AVB Zusatzversicherung AP-Tarife', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: '1.753a, Stand 1. Januar 2023', accessedAt: '14.10.2026' },
      { label: 'Zahntarife UKV ZahnPRIVAT', publisher: 'Healio', href: 'https://healio.de/zahn', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' },
      { label: 'Klinik-Tarife SP1, SP2 und SPU', publisher: 'Healio', href: 'https://healio.de/stationaer', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen vom 14. Oktober 2026. Maßgeblich sind die Satzung deiner Kasse und die vereinbarten Bedingungen des Versicherers.'
};
