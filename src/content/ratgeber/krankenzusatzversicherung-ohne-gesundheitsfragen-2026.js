/**
 * SEO-Umsetzung 14.10.2026, Thema C1 (Healio/Marktanalyse-2026-10/semrush/
 * UMSETZUNG-AUFTRAG-2026-10-14.md). Suchbegriffe (Semrush DE, 14.10.2026):
 * „krankenzusatzversicherung ohne gesundheitsfragen“ 880, „krankenzusatz-
 * versicherung ohne gesundheitsprüfung“ 390, „zusatzversicherung ohne
 * gesundheitsprüfung“ 90, „krankenhauszusatzversicherung ohne
 * gesundheitsfragen“ 3.600.
 *
 * Franks Präzisierung 14.10.2026: Wer so sucht, will die Sicherheit, angenommen
 * zu werden. Kernaussage: Bei den ambulanten Tarifen ist die Annahme sicher,
 * auch mit Vorerkrankungen; Gesundheitsfragen werden gestellt, führen aber
 * nicht zur Ablehnung; laufende Behandlungen sind ausgenommen. „Sicher
 * angenommen“ nur, wo ein Beleg des Versicherers vorliegt.
 * Franks Entscheidung 14.10.2026: eine Hauptseite für beide Suchbegriffe,
 * URL /ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026, 301 von
 * /ratgeber/zusatzversicherung-ohne-gesundheitsfragen und
 * /ratgeber/zusatzversicherung-ohne-gesundheitspruefung-2026. Beide Begriffe in
 * Beschreibung und erstem Absatz. SDK ambulant: Vorerkrankungen per Zuschlag
 * voll mitversichert, keine Leistungsausschlüsse (Frank, Broschüre 1.781).
 * Prüfskript-Ausnahme nur für diesen Slug (scripts/check-ratgeber-
 * contract.mjs, OHNE_GF_AUSNAHME): Suchfrage „Zusatzversicherung ohne
 * Gesundheitsprüfung/-fragen“ und „sicher angenommen“ in begrenzter Zahl.
 *
 * Belege:
 *   - SDK-Broschüre Ambulante Zusatzversicherung 1.781/07.23: „Vorerkrankungen
 *     können direkt im Antrag über feste Zuschläge mitversichert werden (keine
 *     Ablehnungen, keine Leistungsausschlüsse, keine Arztanfragen).“ Basis für
 *     „sicher angenommen“ im SDK-Ambulanttarif. Frank bestätigt
 *     14.10.2026: keine Leistungsausschlüsse, /ambulant entsprechend korrigiert.
 *   - SDK AVB AP-Tarife 1.753a: keine Wartezeiten; Versicherungsfälle vor
 *     Beginn nicht versichert (wie healio.de/ambulant).
 *   - ARAG Antrag A842: „Für Tarif V100 müssen keine Gesundheitsfragen
 *     beantwortet werden“; kein gleichartiger Schutz bei anderem privatem
 *     Versicherer. Auf der Seite nach Franks Regel nur als „keine Ablehnung
 *     wegen Vorerkrankungen“ formuliert.
 *   - UKV VorsorgePRIVAT: Antrag fragt nach Sehhilfe und Gehör (ambulantFaqs.js).
 *   - Verbraucherzentrale 10425 (Stand 19.08.2025): Gesundheitsprüfung fast
 *     ausnahmslos, Ablehnung aus triftigen Gründen, Zuschläge, Ausschlüsse.
 *   - Krankenhaus SP1/SP2 mit Gesundheitsfragen, SPU nur Unfall und ohne
 *     Gesundheitsprüfung laut stationaer.json; keine Annahmezusage.
 *   - Zahn: UKV-Regeln wortgleich mit dentalContent.js und zahn.json.
 * Datenschutz: Seite steht in den Sperrlisten (google-ads.js, analytics.js,
 * meta-pixel.js, api/meta-events.js), weil Leser Vorerkrankungen mitbringen.
 */
export const article = {
  slug: 'krankenzusatzversicherung-ohne-gesundheitsfragen-2026',
  kind: 'ratgeber',
  group: 'ambulant',
  metaTitle: 'Krankenzusatzversicherung ohne Gesundheitsfragen 2026 | Healio',
  metaDescription: 'Krankenzusatzversicherung ohne Gesundheitsfragen oder ohne Gesundheitsprüfung? Im ambulanten SDK-Tarif wirst du 2026 trotz Vorerkrankung sicher angenommen.',
  publishedAt: '2026-10-14',
  publishedAtLabel: '14. Oktober 2026',
  updatedAt: '2026-10-27',
  updatedAtLabel: '27. Oktober 2026',
  readingTimeMinutes: 8,
  listTitle: 'Krankenzusatzversicherung ohne Gesundheitsfragen 2026',
  listTeaser: 'Trotz Vorerkrankung angenommen werden: wo das bei den Tarifen von Healio klappt und wo nicht.',
  headline: 'Krankenzusatzversicherung ohne Gesundheitsfragen 2026: ohne Gesundheitsprüfung trotzdem sicher angenommen',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'document',
    facts: [
      { value: 'Annahme ambulant', label: 'im SDK-Tarif auch mit Vorerkrankungen, laut SDK ohne Ablehnung' },
      { value: 'Kein Ausschluss', label: 'Vorerkrankungen per Zuschlag voll mitversichert' },
      { value: 'Ab Beginn', label: 'nur neue Fälle, laufende Behandlungen bleiben draußen' }
    ],
    text: 'Wer so sucht, will vor allem eins: angenommen werden. Im ambulanten Tarif der SDK klappt das. Du beantwortest Gesundheitsfragen, Vorerkrankungen versichert die SDK über feste Zuschläge mit. Eine Ablehnung gibt es dort laut SDK nicht.',
    path: { to: '/ambulant#tarifwahl', text: 'Beitrag nach Alter und Stufe ausrechnen', label: 'Zum ambulanten Rechner' }
  },
  lead: 'Wer 2026 eine Krankenzusatzversicherung ohne Gesundheitsfragen oder eine Zusatzversicherung ohne Gesundheitsprüfung sucht, hat meistens eine Vorgeschichte und Sorge vor der Absage. Die gute Nachricht: Im ambulanten Tarif der SDK wirst du auch mit Vorerkrankungen sicher angenommen. Gefragt wird trotzdem, denn davon hängt ein möglicher Zuschlag ab. Hier liest du, welche Tarife dich wirklich aufnehmen, was der Zuschlag bedeutet und warum die Annahme nicht automatisch den Schutz für bereits laufende Behandlungen einschließt.',
  sections: [
    {
      id: 'suchfrage',
      heading: 'Gibt es eine Zusatzversicherung ohne Gesundheitsprüfung?',
      blocks: [
        { type: 'paragraph', text: 'Kaum. Die Verbraucherzentrale schreibt zu privaten Zusatzversicherungen: Fast ausnahmslos ist eine Gesundheitsprüfung erforderlich. Der Versicherer will wissen, welches Risiko er übernimmt, und fragt deshalb im Antrag nach Beschwerden, Behandlungen und Befunden der letzten Jahre.' },
        { type: 'paragraph', text: 'Fragt ein Tarif nicht nach der Gesundheit, begrenzt er sein Risiko meist an anderer Stelle. Prüfe dann genau, wie: über einen engen Leistungsumfang, eine Wartezeit, niedrige Höchstbeträge in den ersten Jahren oder den Ausschluss von allem, was vor Vertragsbeginn schon bekannt war. Ein Beispiel aus dem Healio-Angebot ist der Klinik-Tarif SPU der SDK. Er verzichtet auf die Gesundheitsprüfung, leistet aber ausschließlich nach einem Unfall.' },
        { type: 'paragraph', text: 'Die eigentliche Frage hinter der Suche ist deshalb eine andere: Werde ich mit meiner Vorgeschichte angenommen? Darauf kommt es an, nicht darauf, ob der Antrag Fragen enthält.' }
      ]
    },
    {
      id: 'ablehnung',
      heading: 'Was kann nach den Gesundheitsfragen passieren?',
      blocks: [
        { type: 'paragraph', text: 'Mit deinen Antworten entscheidet der Versicherer, ob und zu welchen Bedingungen er dich aufnimmt. Laut Verbraucherzentrale dürfen private Versicherer aus triftigen Gründen ablehnen, etwa wegen einer Vorerkrankung. Statt abzulehnen, können Versicherer auch einen Risikozuschlag verlangen oder einzelne Risiken ausschließen.' },
        { type: 'table', mobile: 'cards', caption: 'Was nach den Gesundheitsfragen passieren kann',
          head: ['Ergebnis', 'Was es bedeutet', 'Worauf du achtest'],
          rows: [
            ['Annahme zum normalen Beitrag', 'Du bist zu den Tarifbedingungen versichert', 'Neue Fälle ab Versicherungsbeginn'],
            ['Annahme mit Risikozuschlag', 'Du zahlst einen höheren Beitrag', 'Gesamtbeitrag gegen Leistung rechnen'],
            ['Annahme mit Ausschluss', 'Eine bestimmte Erkrankung ist nicht versichert', 'Was außerhalb des Ausschlusses bleibt'],
            ['Ablehnung', 'Kein Vertrag zu diesem Tarif', 'Gibt es einen Tarif ohne Ablehnung?']
          ],
          note: 'Grundlage: Verbraucherzentrale, Zusatzversicherungen zur gesetzlichen Krankenversicherung, Stand 19.08.2025. Welche Folge eintritt, regeln Antrag und Annahmeregeln des Versicherers.' },
        { type: 'paragraph', text: 'Mit Vorerkrankung suchst du also einen Tarif, der die letzte Zeile ausschließt. Ein fester Zuschlag ist dann der faire Tausch: Du zahlst etwas mehr und bist dafür versichert.' }
      ]
    },
    {
      id: 'ambulant',
      heading: 'Bei welchen ambulanten Tarifen wirst du trotz Vorerkrankung angenommen?',
      blocks: [
        { type: 'paragraph', text: 'Im ambulanten SDK-Tarif, den Healio vermittelt. Die SDK schreibt in ihrer Produktbroschüre: Vorerkrankungen können direkt im Antrag über feste Zuschläge mitversichert werden, ohne Ablehnungen, ohne Leistungsausschlüsse und ohne Arztanfragen. Du beantwortest die Gesundheitsfragen also vollständig, aus deinen Antworten ergibt sich höchstens ein Zuschlag, und deine Vorerkrankung ist dann voll mitversichert. Eine allgemeine Wartezeit gibt es in den AP-Tarifen nicht.' },
        { type: 'paragraph', text: 'In der höchsten Stufe Ambulant 100 (AP1) stehen bis zu 3.000 EUR in zwei Jahren bereit, verteilt auf vier eigene Töpfe: 1.000 EUR für Naturheilverfahren wie Heilpraktiker und Osteopathie, 500 EUR für Sehhilfen, 500 EUR für Vorsorge und 1.000 EUR für Hilfsmittel und gesetzliche Zuzahlungen. Das ist kein frei verfügbares Guthaben, erstattet werden versicherte Rechnungen nach den Tarifbedingungen.' },
        { type: 'table', mobile: 'cards', caption: 'Ambulante Wege bei Healio und die Annahme, Stand 14. Oktober 2026',
          head: ['Tarif', 'Annahme mit Vorerkrankung', 'Wartezeit und Grenzen'],
          rows: [
            ['SDK Ambulant (AP1, AP9, AP7, AP5)', 'Gesundheitsfragen, Vorerkrankungen per festem Zuschlag voll mitversichert, keine Ablehnung, kein Leistungsausschluss', 'Keine allgemeine Wartezeit, vier Töpfe je zwei Kalenderjahre'],
            ['UKV VorsorgePRIVAT, zubuchbar', 'Der Antrag fragt nach Sehhilfe und Gehör', 'Keine allgemeine Wartezeit, Vorsorge nach Tarif'],
            ['ARAG V100, eigener Vorsorgeweg', 'Keine Ablehnung wegen Vorerkrankungen', '3 Monate allgemeine Wartezeit, nur Vorsorge aus dem Tarifkatalog']
          ],
          note: 'Quellen: SDK-Broschüre 1.781/07.23, ARAG-Antrag A842, healio.de/ambulant. Bei ARAG V100 darf kein gleichartiger Schutz bei einem anderen privaten Versicherer bestehen oder beantragt sein. Maßgeblich sind Antrag und Tarifbedingungen.' },
        { type: 'paragraph', text: 'Der Beitrag hängt bei der SDK von Alter und Stufe ab. Für Ambulant 100 sind es in der Altersgruppe 31 bis 40 Jahre 39,19 EUR im Monat, Beitragsstand 29. September 2026, ein Zuschlag für Vorerkrankungen kommt dazu. Viele Krankenkassen zahlen ihren Bonus auf Wunsch als zweckgebundenen Zuschuss zu einer Zusatzversicherung. Wie viel davon beim Beitrag hilft, hängt von deiner Kasse und deinen Aktivitäten ab.' },
        { type: 'path', to: '/ambulant#tarifwahl', icon: 'calculator', text: 'Stufe wählen, Geburtsjahr eingeben, Beitrag sehen. Die Gesundheitsfragen folgen erst im Antrag.', label: 'Zum ambulanten Rechner' }
      ]
    },
    {
      id: 'laufende-behandlung',
      heading: 'Zahlt ein neuer Tarif für Beschwerden, die du schon hast?',
      blocks: [
        { type: 'paragraph', text: 'Für eine schon laufende Behandlung nicht. Was vor Versicherungsbeginn schon behandelt wird oder angeraten ist, bleibt bei der SDK ausgenommen. Das gilt auch ohne Wartezeit: Der Schutz beginnt mit dem vereinbarten Datum und wirkt nicht zurück.' },
        { type: 'paragraph', text: 'Angenommen werden und eine laufende Behandlung bezahlt bekommen sind zwei verschiedene Dinge. Wirst du mit Rückenbeschwerden aufgenommen, ist deine bereits laufende Behandlungsserie trotzdem nicht versichert. Ein neuer Versicherungsfall nach Beginn kann dagegen erstattet werden, im Rahmen der Töpfe und der Bedingungen.' },
        { type: 'paragraph', text: 'Der normale ambulante SDK-Schutz übernimmt keine bereits vor Versicherungsbeginn eingetretenen Versicherungsfälle. Das ist keine Regel für sämtliche Zusatzverträge: Spezialisierte Lösungen wie ZAHN Sofort der Bayerischen können bereits angeratene oder begonnene Zahnbehandlungen nach ihren eigenen Bedingungen einbeziehen. Annahme, zeitliche Grenzen und Leistungsumfang müssen vor dem Abschluss konkret geprüft werden.' }
      ]
    },
    {
      id: 'krankenhaus',
      heading: 'Gibt es eine Krankenhauszusatzversicherung, die nicht nach der Gesundheit fragt?',
      blocks: [
        { type: 'paragraph', text: 'Bei den Krankenhaus-Tarifen auf Healio nur für Unfälle. Die SDK-Tarife SP1 und SP2 leisten bei Krankheit und Unfall, dort gehören Gesundheitsfragen zum Antrag. Ob und zu welchen Bedingungen du angenommen wirst, entscheidet der Versicherer im Antrag. Eine pauschale Zusage für Vorerkrankte gibt es für diese Tarife nicht.' },
        { type: 'paragraph', text: 'Der Tarif SPU verzichtet auf die Gesundheitsprüfung, leistet aber ausschließlich nach einem Unfall. Für eine Krankenhausbehandlung wegen Krankheit ist er keine Alternative. Das zeigt den typischen Tausch: Weniger Fragen bedeuten hier deutlich weniger Leistung.' },
        { type: 'table', mobile: 'cards', caption: 'Klinik-Tarife der SDK auf healio.de/stationaer, Beispielbeiträge mit 30 Jahren',
          head: ['Tarif', 'Leistet bei', 'Antrag'],
          rows: [
            ['SP2, 33,41 EUR im Monat', 'Krankheit und Unfall, Zweibettzimmer, private ärztliche Behandlung', 'Mit Gesundheitsfragen, individuelle Annahme'],
            ['SP1, 50,72 EUR im Monat', 'Krankheit und Unfall, Ein- oder Zweibettzimmer, private ärztliche Behandlung', 'Mit Gesundheitsfragen, individuelle Annahme'],
            ['SPU, 7,00 EUR im Monat', 'Nur nach einem Unfall', 'Verzichtet laut Produktseite auf die Gesundheitsprüfung']
          ],
          note: 'Beispielbeiträge für das Alter 30 laut healio.de/stationaer, Abruf 14. Oktober 2026. Der persönliche Beitrag hängt vom Eintrittsalter ab, bei SP1 und SP2 auch von den Gesundheitsangaben.' },
        { type: 'segments', segments: [
          { text: 'Wie der Antrag mit Vorerkrankung abläuft, steht im Ratgeber ' },
          { text: 'Krankenhauszusatzversicherung mit Vorerkrankung', to: '/ratgeber/krankenhauszusatzversicherung-vorerkrankung' },
          { text: '. Die Tarife vergleichst du auf ' },
          { text: 'healio.de/stationaer', to: '/stationaer' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'zahn',
      heading: 'Wie ist das bei der Zahnzusatzversicherung?',
      blocks: [
        { type: 'paragraph', text: 'Auch hier fragt der Antrag nach deiner Vorgeschichte. Häufig geht es um fehlende Zähne, laufende oder angeratene Behandlungen und bestimmte Vorerkrankungen. Bei der UKV ZahnPRIVAT haben die Fragen jeweils eigene Zeiträume. Bei 1 bis 3 fehlenden Zähnen prüft die UKV die Aufnahme mit Zuschlag je Zahn. Selbst bei Parodontitis innerhalb der letzten 2 Jahre gibt es die Annahme mit Ausschluss nur für Parodontose-Behandlungen statt Ablehnung.' },
        { type: 'paragraph', text: 'Eine Behandlung, die in den letzten 2 Jahren angeraten wurde oder schon läuft, ist im normalen Zahntarif nicht versichert. Für solche Fälle ohne fehlenden Zahn gibt es den Baustein ZAHN Sofort der Bayerischen, wenn der Abschluss vor der Rechnung erfolgt. Annahme und Leistungsumfang werden im Antrag geprüft.' },
        { type: 'segments', segments: [
          { text: 'Mehr dazu im Ratgeber ' },
          { text: 'Zahnzusatzversicherung bei laufender Behandlung', to: '/ratgeber/zahnzusatzversicherung-laufende-behandlung' },
          { text: '. Welcher Zahnweg zu dir passt, zeigt der Zahn-Check auf ' },
          { text: 'healio.de/zahn', to: '/zahn' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'antrag',
      heading: 'Wie beantwortest du die Gesundheitsfragen richtig?',
      blocks: [
        { type: 'paragraph', text: 'Vollständig und so, wie es in deinen Unterlagen steht. Auch wenn der Tarif nicht ablehnt, gilt § 19 VVG: Du musst die Umstände angeben, nach denen der Versicherer in Textform fragt und die du kennst. Maßgeblich sind die konkreten Fragen und ihre Zeiträume, nicht deine Einschätzung, ob etwas wichtig war.' },
        { type: 'steps', heading: 'So gehst du vor', items: [
          { title: 'Fragen zuerst lesen', text: 'Notiere dir die Zeiträume, nach denen gefragt wird, etwa drei oder fünf Jahre.' },
          { title: 'Unterlagen holen', text: 'Weißt du etwas nicht mehr genau, hilft eine Auskunft deiner Praxis oder deiner Krankenkasse über die abgerechneten Behandlungen.' },
          { title: 'Ehrlich antworten', text: 'Auch eine scheinbar kleine Behandlung gehört in den Antrag, wenn danach gefragt wird.' },
          { title: 'Angebot prüfen', text: 'Lies, welcher Zuschlag vereinbart ist, bevor du den Vertrag annimmst.' }
        ] },
        { type: 'paragraph', text: 'Falsche oder fehlende Angaben können teuer werden. Die Verbraucherzentrale warnt: Bei nachweislich falsch beantworteten Fragen droht eine Leistungsverweigerung, der Vertrag kann gekündigt werden. Wer heute etwas weglässt, riskiert also genau den Schutz, für den er zahlt.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Gefragt wird trotzdem.', text: 'Die Antworten bestimmen im SDK-Tarif nicht die Annahme, aber einen möglichen Zuschlag.' },
          { lead: 'Sicher angenommen heißt nicht rückwirkend versichert.', text: 'Beim normalen ambulanten SDK-Schutz sind bereits eingetretene Versicherungsfälle ausgeschlossen. Spezialisierte Zahnbausteine haben eigene Bedingungen.' },
          { lead: 'Im Krankenhaus und bei den Zähnen entscheidet der Antrag.', text: 'Dort gibt es keine pauschale Annahme für Vorerkrankte.' }
        ] }
      ]
    },
    {
      id: 'naechster-schritt',
      heading: 'Wie findest du den passenden Weg?',
      blocks: [
        { type: 'paragraph', text: 'Fang mit dem Bedarf an. Gehst du zum Heilpraktiker oder Osteopathen, brauchst du eine Brille oder willst du mehr Vorsorge, ist der ambulante SDK-Tarif der Weg, bei dem dir die Annahme laut SDK nicht verwehrt wird. Geht es um Zähne, entscheidet die Zahn-Vorgeschichte über den Tarif. Für das Krankenhaus prüfst du SP1 oder SP2 im Antrag.' },
        { type: 'path', to: '/ambulant', icon: 'naturopathy', text: 'Leistungen, Töpfe und Gesundheitsfragen im ambulanten Tarif ansehen.', label: 'Zum ambulanten Schutz' },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Heilpraktiker Kosten', text: 'Was Behandlungen kosten und wer was zahlt.', to: '/ratgeber/heilpraktiker-kosten', icon: 'money', linkLabel: 'Zur Übersicht' },
          { title: 'Ambulante Zusatzversicherung', text: 'Was der ambulante Schutz neben der Kasse leistet.', to: '/ratgeber/ambulante-zusatzversicherung', icon: 'naturopathy', linkLabel: 'Ratgeber lesen' },
          { title: 'Heilpraktiker-Zusatz ohne Wartezeit', text: 'Ab wann der Schutz für neue Fälle gilt.', to: '/ratgeber/heilpraktiker-zusatzversicherung-ohne-wartezeit', icon: 'calendar', linkLabel: 'Ratgeber lesen' },
          { title: 'Krankenzusatzversicherung vergleichen', text: 'Die Kriterien, die beim Vergleich wirklich zählen.', to: '/ratgeber/krankenzusatzversicherung-vergleichen', icon: 'comparison', linkLabel: 'Ratgeber lesen' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Private Zusatzversicherungen fragen fast immer nach der Gesundheit. Im ambulanten SDK-Tarif, den Healio vermittelt, werden Vorerkrankungen laut SDK über feste Zuschläge voll mitversichert, ohne Ablehnung und ohne Leistungsausschluss. Beim normalen ambulanten SDK-Schutz bleiben bereits eingetretene Versicherungsfälle ausgeschlossen. Spezialisierte Zahnbausteine können unter eigenen Bedingungen weitergehen.',
  faqs: [
    { question: 'Welche Krankenzusatzversicherung nimmt mich trotz Vorerkrankung an?', answer: 'Bei Healio der ambulante Tarif der SDK. Du beantwortest Gesundheitsfragen, laut SDK werden Vorerkrankungen über feste Zuschläge mitversichert, ohne Ablehnung. Laufende oder angeratene Behandlungen bleiben ausgenommen.' },
    { question: 'Gibt es eine Krankenhauszusatzversicherung, die nicht nach der Gesundheit fragt?', answer: 'Bei Healio nur für Unfälle: Der SDK-Tarif SPU verzichtet auf die Gesundheitsprüfung, leistet aber nur nach einem Unfall. Die Tarife SP1 und SP2 für Krankheit und Unfall haben Gesundheitsfragen, die Annahme entscheidet der Versicherer im Antrag.' },
    { question: 'Warum fragt der Tarif, wenn er mich sowieso annimmt?', answer: 'Weil sich aus deinen Angaben ein möglicher Zuschlag ergibt. Beantworte die Fragen deshalb vollständig nach § 19 VVG. Falsche Angaben können laut Verbraucherzentrale zur Leistungsverweigerung und zur Kündigung führen.' },
    { question: 'Zahlt die Versicherung meine laufende Behandlung, wenn ich jetzt abschließe?', answer: 'Beim normalen ambulanten SDK-Schutz sind bereits vor Versicherungsbeginn eingetretene Versicherungsfälle ausgeschlossen, auch ohne Wartezeit. Das gilt nicht pauschal für jeden Zusatzvertrag. Ein spezialisierter Zahnbaustein wie ZAHN Sofort der Bayerischen kann bereits angeratene oder begonnene Zahnbehandlungen nach seinen eigenen Bedingungen einbeziehen. Prüfe den konkreten Fall vor dem Abschluss; eine Leistungszusage folgt daraus nicht.' },
    { question: 'Was ist ein Risikozuschlag?', answer: 'Ein Aufschlag auf den Beitrag wegen deiner Gesundheitsangaben. Seine Höhe steht in deinem persönlichen Angebot. Rechne den Gesamtbeitrag gegen die Leistung, bevor du annimmst.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Den ambulanten Tarif und deinen Beitrag siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Für die Zähne startest du den Zahn-Check auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: ', für das Krankenhaus vergleichst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Welche Kasse den Beitrag mit ihrem Bonus mitträgt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-14',
    checkedAtLabel: '14. Oktober 2026',
    intro: 'Annahme mit Vorerkrankung, Gesundheitsprüfung und die Tarifangaben stammen aus diesen Quellen. Am 27.10.2026 wurde die Abgrenzung zwischen SDK-Vertragsbeginn und spezialisiertem Zahn-Sofortschutz nachgeprüft; die übrigen Quellen behalten ihren angegebenen Stand.',
    items: [
      { label: 'ZAHN Sofort bei laufender oder angeratener Behandlung', publisher: 'die Bayerische', href: 'https://www.diebayerische.de/zahn-sofort/laufende-behandlung/', stand: 'Öffentliche Produktinformation, Abruf 27.10.2026', accessedAt: '27.10.2026' },
      { label: 'Allgemeine Bedingungen der SDK: Versicherungsfall und Beginn des Schutzes, A.1 und A.4', publisher: 'SDK', href: 'https://gesundwerker.sdk.de/downloads/Bedingungen/1-751.pdf', stand: '1.751/01.22, Stand 01.01.2022', accessedAt: '27.10.2026' },
      { label: 'Broschüre Ambulante Zusatzversicherung, Annahme mit Vorerkrankungen', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Broschueren/Broschuere-Ambulante-Zusatzversicherung-1.781.pdf', stand: '1.781/07.23', accessedAt: '14.10.2026' },
      { label: 'AVB Zusatzversicherung AP-Tarife', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: '1.753a, Stand 1. Januar 2023', accessedAt: '14.10.2026' },
      { label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung', publisher: 'Verbraucherzentrale', href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425', stand: '19. August 2025', accessedAt: '14.10.2026' },
      { label: 'Anzeigepflicht, § 19 VVG', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html', stand: 'Geltende Fassung', accessedAt: '14.10.2026' },
      { label: 'Ambulanter Schutz: Gesundheitsfragen, Wartezeit, UKV und ARAG V100', publisher: 'Healio', href: 'https://healio.de/ambulant', stand: 'Live-Abruf 14. Oktober 2026, Beiträge 29. September 2026', accessedAt: '14.10.2026' },
      { label: 'Antrag Zusatzversicherung A842 mit Tarif V100', publisher: 'ARAG', href: 'https://www.arag-partnervertrieb.de/medien/pdf/KV/Antraege/arag_kv_antrag_zusatz_a842.pdf', stand: 'Abruf 14. Oktober 2026', accessedAt: '14.10.2026' },
      { label: 'Klinik bei Unfall: Kostenübernahme ohne Gesundheitsprüfung', publisher: 'SDK', href: 'https://www.sdk.de/versicherungen/zusatzversicherung/krankenhauszusatzversicherung', stand: 'Produktseite, Abschnitt Klinik bei Unfall', accessedAt: '27.10.2026' },
      { label: 'Klinik-Tarife SP1, SP2 und SPU', publisher: 'Healio', href: 'https://healio.de/stationaer', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' },
      { label: 'Zahn-Check und Annahmeregeln UKV und Bayerische', publisher: 'Healio', href: 'https://healio.de/zahn', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen vom 14. Oktober 2026. Maßgeblich sind der Antrag und die vereinbarten Bedingungen des Versicherers.'
};
