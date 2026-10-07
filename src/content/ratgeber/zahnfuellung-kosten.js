/**
 * Zahn-Ratgeber Serie, Stapel "zahnkosten", Welle A: "Zahnfüllung Kosten".
 *
 * Quellen (Belege je Zahl in zahnfuellung-kosten.belege.md, Abruf 07.10.2026):
 * Gemeinsame Pressemitteilung GKV-Spitzenverband und KZBV vom 11.10.2024
 * (Amalgamverbot, Verordnung (EU) 2024/1849, mehrkostenfreie Kassenfüllung),
 * Patienteninformation der KZV Berlin "Zuzahlungsfreie Zahnfüllungen" (Stand
 * Februar 2026), Verbraucherzentrale (Veränderungen in der zahnärztlichen
 * Behandlung 2025, Stand 07.01.2025), SGB V § 28 Abs. 2 (Mehrkostenregelung),
 * GOZ Anlage 1 Abschnitt C (Nr. 2060 bis 2120 und 2150 bis 2170), § 5 und § 9
 * GOZ. Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Angabe für den Kassenanteil bei Mehrkostenfüllungen: Der
 *     Betrag der Kassenfüllung (BEMA 13a bis 13d) hängt vom regionalen
 *     Punktwert ab, eine neutrale Euro-Zahl gibt es nicht. Die Seite rechnet
 *     nur die GOZ-Honorare aus Punktzahl, Punktwert und Faktor (eigene
 *     Rechnung, so gekennzeichnet) und sagt, dass Material und Labor dazukommen.
 *   - Keine Preisangabe für Materialkosten von Inlays und keine Durchschnitts-
 *     preise aus Versicherer- oder Portalseiten.
 *   - Kein Rechner-Block (das Preset gibt es nur für Krone, Brücke, Implantat).
 *   - Keine Aussage, ob ein Zahntarif Inlays oder Mehrkostenfüllungen im
 *     Einzelnen erstattet: Die Produktseite nennt dazu nur "Zahnbehandlung je
 *     nach Tarif" und "erstattungsfähige Kosten".
 *   - Keine Behandlungsempfehlung: Welches Material passt, entscheidet die
 *     Praxis nach dem Befund.
 *   - Kosten-Seite wie die Wurzelbehandlung der Welle 1, kein Kandidat für die
 *     Sperrlisten in google-ads.js und analytics.js (Entscheidung der
 *     Marktanalyse-Sitzung vom 07.10.2026).
 *   - Amalgamverbot: Die Verordnung (EU) 2024/1849 war auf EUR-Lex am
 *     07.10.2026 nicht abrufbar (Abwehrseite, leere Antwort, auch bei der
 *     Prüfung). Der Inhalt steht deshalb so, wie GKV-Spitzenverband und KZBV
 *     ihn in der Pressemitteilung vom 11.10.2024 zusammenfassen.
 *
 * Faktenprüfung 07.10.2026: serie/zahn/PRÜFBERICHT-zahnkosten.md
 */
export const article = {
  slug: 'zahnfuellung-kosten',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Zahnfüllung Kosten: Kassenfüllung, Zement und Inlay | Healio',
  metaDescription:
    'Zahnfüllung seit dem Amalgamverbot: was die Kasse ohne Zuzahlung zahlt, welche Füllung privat ist und was ein Inlay über die Kassenfüllung hinaus kostet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Zahnfüllung: Kosten, Material und was die Kasse zahlt',
  listTeaser:
    'Was seit dem Amalgamverbot 2025 Kassenleistung ist, welche Füllungen privat bleiben und wie sich der Preis eines Inlays zusammensetzt.',

  headline: 'Zahnfüllung: Kosten, Material und was die Kasse zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: 'Kein Amalgam', label: 'seit 01.01.2025 in der EU nur noch in Ausnahmefällen' },
      { value: 'Kassenfüllung', label: 'für alle gesetzlich Versicherten ohne Zuzahlung' },
      { value: 'Privatleistung', label: 'Inlay aus Keramik, Kunststoff oder Edelmetall' },
    ],
    text: 'Die Kasse zahlt die Zahnfüllung ohne Zuzahlung, wenn du die Kassenfüllung nimmst. Bei einem Inlay zahlst du den Unterschied selbst.',
    path: { to: '/zahn#zahn-check', text: 'Füllung angeraten oder geplant?', label: 'Zahn-Check starten' },
  },

  lead: 'Eine Zahnfüllung ist Kassenleistung, und seit dem 1. Januar 2025 gilt das ohne Amalgam. Gesetzlich Versicherte haben Anspruch auf eine Füllung ohne Zuzahlung, im Frontzahnbereich als adhäsiv befestigte Füllung, im Seitenzahnbereich mit selbsthaftenden Materialien wie Zement oder Kunststoff. Wählst du mehr, etwa ein Inlay aus Keramik, ist das eine private Zusatzleistung, und die Kasse beteiligt sich in Höhe der Kassenfüllung.',

  sections: [
    {
      id: 'kasse',
      heading: 'Zahlt die Krankenkasse eine Zahnfüllung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja. Zur zahnärztlichen Behandlung gehört nach § 28 Abs. 2 SGB V die Tätigkeit, die zur Behandlung von Zahnkrankheiten ausreichend und zweckmäßig ist. Gesetzlich Versicherte haben auch ab dem 1. Januar 2025 Anspruch auf eine Füllung ohne Zuzahlung, sowohl bei den Frontzähnen als auch bei den seitlichen Zähnen. Das schreibt die Verbraucherzentrale, und GKV-Spitzenverband und KZBV bestätigen es in ihrer gemeinsamen Pressemitteilung vom 11.10.2024.',
        },
        {
          type: 'paragraph',
          text: 'Wählst du bei einer Füllung mehr als das, was nötig ist, trägst du die Mehrkosten selbst. Die Kasse rechnet dann die vergleichbare preisgünstigste plastische Füllung als Sachleistung ab (§ 28 Abs. 2 SGB V). Vor Beginn der Behandlung muss die Praxis dazu eine schriftliche Vereinbarung mit dir treffen. Die Mehrkostenregelung gilt nicht, wenn intakte plastische Füllungen ausgetauscht werden.',
        },
      ],
    },
    {
      id: 'amalgam',
      heading: 'Was ist seit dem Amalgamverbot 2025 die Kassenfüllung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Seit dem 1. Januar 2025 darf Dentalamalgam in der EU nicht mehr für die zahnärztliche Behandlung verwendet werden, es sei denn, die Zahnärztin oder der Zahnarzt hält es wegen der besonderen medizinischen Erfordernisse bei einer Patientin oder einem Patienten für zwingend notwendig. So fassen GKV-Spitzenverband und KZBV die Verordnung (EU) 2024/1849 vom 13. Juni 2024 zusammen. Die Verbraucherzentrale nennt als Beispiel für einen solchen Fall bestimmte Allergien. Bestehende Amalgamfüllungen können im Mund bleiben, das Verbot bezieht sich nur auf künftige Füllungen.',
        },
        {
          type: 'paragraph',
          text: 'Für dich bleibt der Anspruch auf eine Füllung ohne Zuzahlung bestehen. GKV-Spitzenverband und KZBV haben die Regeln im Bewertungsausschuss angepasst, damit alle Versicherten mit amalgamfreien Füllungen ohne Mehrkosten versorgt werden. Bis Ende 2024 galt für Kinder unter 15 Jahren, Schwangere und Stillende eine Sonderregel für Kompositfüllungen im Seitenzahnbereich. Seit dem 1. Januar 2025 haben nach der Verbraucherzentrale alle Versicherten Anspruch auf alternative Füllungsmaterialien im Seitenzahnbereich ohne Mehrkosten.',
        },
      ],
    },
    {
      id: 'arten',
      heading: 'Welche Zahnfüllungen zahlt die Kasse und welche sind privat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZV Berlin fasst es für Patientinnen und Patienten so zusammen. Welches Material bei dir in Frage kommt, entscheidet deine Praxis nach dem Befund und im Gespräch mit dir.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Füllungen nach der Patienteninformation der KZV Berlin (Stand Februar 2026) und ihre Einordnung bei der Kasse',
          head: ['Füllung', 'Einordnung bei der Kasse', 'Wo oder wann'],
          rows: [
            ['Adhäsiv befestigte Füllung (Kunststoff)', 'Kassenleistung', 'im Frontzahnbereich, an den sichtbaren Zähnen'],
            ['Zement: Glasionomerzement, kunststoffmodifizierter Glasionomerzement, Glashybrid', 'Kassenleistung', 'im Seitenzahnbereich'],
            ['Selbstadhäsiver Komposit-Hybrid (Kunststoff)', 'Kassenleistung', 'im Seitenzahnbereich'],
            ['Bulkfill-Kunststofffüllung', 'Kassenleistung', 'wenn eine selbsthaftende Füllung aus zahnmedizinischen oder technischen Gründen nicht möglich ist'],
            ['Geklebte Kompositfüllung im Seitenzahnbereich', 'Private Zusatzleistung', 'wenn du sie wählst, mit Mehrkostenvereinbarung'],
            ['Füllung in Mehrfarben- oder Mehrschichttechnik', 'Private Zusatzleistung', 'zur besonderen ästhetischen Optimierung'],
            ['Einlagefüllung (Inlay) aus Keramik, Kunststoff oder Edelmetall', 'Private Zusatzleistung', 'wenn du sie wählst, mit Mehrkostenvereinbarung'],
            ['Goldhämmerfüllung', 'Private Zusatzleistung', 'wenn du sie wählst, mit Mehrkostenvereinbarung'],
          ],
          note: 'Quelle: KZV Berlin, Patienteninformation Zuzahlungsfreie Zahnfüllungen, Stand Februar 2026, ergänzt durch die gemeinsame Pressemitteilung von GKV-Spitzenverband und KZBV vom 11.10.2024 zu selbstadhäsiven Materialien und Bulkfill-Kompositen.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine Zahnfüllung über die Kassenfüllung hinaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt von Material, Größe und Aufwand ab, eine feste Preisliste gibt es nicht. Bei einer Mehrkostenfüllung berechnet die Praxis das Honorar nach der Gebührenordnung für Zahnärzte (GOZ), die Kassenfüllung wird je nach Größe über die BEMA-Nummern 13a bis 13d auf dem Mehrkostenformular abgezogen. Das Honorar ergibt sich aus Punktzahl, Punktwert von 5,62421 Cent und Faktor. Der 2,3-fache Satz bildet die durchschnittliche Leistung ab, möglich ist das Einfache bis Dreieinhalbfache (§ 5 GOZ).',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Honorar nach GOZ für Kompositfüllungen in Adhäsivtechnik und Einlagefüllungen, eigene Rechnung',
          head: ['GOZ-Position', 'Punkte', 'Bei 2,3-fachem Satz', 'Einfach bis 3,5-fach'],
          rows: [
            ['2060 Kompositfüllung in Adhäsivtechnik, einflächig', '527', '68,17 EUR', '29,64 bis 103,74 EUR'],
            ['2080 Kompositfüllung in Adhäsivtechnik, zweiflächig', '556', '71,92 EUR', '31,27 bis 109,45 EUR'],
            ['2100 Kompositfüllung in Adhäsivtechnik, dreiflächig', '642', '83,05 EUR', '36,11 bis 126,38 EUR'],
            ['2120 Kompositfüllung in Adhäsivtechnik, mehr als dreiflächig', '770', '99,60 EUR', '43,31 bis 151,57 EUR'],
            ['2150 Einlagefüllung (Inlay), einflächig', '1.141', '147,60 EUR', '64,17 bis 224,60 EUR'],
            ['2160 Einlagefüllung (Inlay), zweiflächig', '1.356', '175,41 EUR', '76,26 bis 266,93 EUR'],
            ['2170 Einlagefüllung (Inlay), mehr als zweiflächig', '1.709', '221,07 EUR', '96,12 bis 336,41 EUR'],
          ],
          note: 'Eigene Rechnung nach GOZ Anlage 1 (Gebührenverzeichnis, zuletzt geändert 05.12.2011) und § 5 GOZ: Punktzahl mal Punktwert 5,62421 Cent mal Faktor, auf volle Cent gerundet. Das ist nur das zahnärztliche Honorar. Bei Inlays kommen Material und Labor als Auslagen dazu (§ 9 GOZ) und je nach Fall weitere Positionen wie die adhäsive Befestigung (GOZ 2197, 130 Punkte, 16,82 EUR beim 2,3-fachen Satz), davon geht der Betrag der Kassenfüllung ab. Eine Preisangabe ist das nicht, deine Praxis nennt dir ihre eigenen Beträge.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zur Mehrkostenfüllung',
          items: [
            {
              title: 'Aufklärung',
              text: 'Bevor dir eine private Füllung angeboten wird, muss die Praxis mindestens eine medizinisch geeignete Kassenfüllung erklären und anbieten.',
            },
            {
              title: 'Mehrkostenvereinbarung',
              text: 'Entscheidest du dich freiwillig für mehr, schließt die Praxis vor der Behandlung eine schriftliche Mehrkostenvereinbarung mit dir.',
            },
            {
              title: 'Abrechnung',
              text: 'Die Kassenfüllung wird über deine Gesundheitskarte mit der Kasse abgerechnet, den Rest zahlst du nach der Gebührenordnung.',
            },
          ],
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei einer Zahnfüllung an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Karte zeigt, wer welchen Teil trägt. Für den Kassenanteil nennt sie keinen Euro-Betrag, denn der hängt von der Größe der Füllung und vom Punktwert in deiner Region ab. Er steht in deiner Mehrkostenvereinbarung.',
        },
        {
          type: 'costCard',
          title: 'Zahnfüllung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, die Zahnstaffel begrenzt die Erstattung im ersten Kalenderjahr auf bis zu 1.000 EUR. Der Vertrag besteht schon, bevor die Füllung angeraten wird. Welche Leistungen erstattungsfähig sind, steht in den Tarifbedingungen.',
          caption: 'Kostenkarte: Zahnfüllung mit und ohne Zahntarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Kassenfüllung aus Zement oder selbsthaftendem Material', 'die ganze Füllung als Sachleistung', 'keine Zuzahlung', 'Nichts zu erstatten'],
            ['Geklebte Kompositfüllung, einflächig, GOZ 2060, 2,3-facher Satz: 68,17 EUR', 'den Betrag der Kassenfüllung, BEMA 13a bis 13d', '68,17 EUR minus Kassenanteil', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Geklebte Kompositfüllung, dreiflächig, GOZ 2100, 2,3-facher Satz: 83,05 EUR', 'den Betrag der Kassenfüllung, BEMA 13a bis 13d', '83,05 EUR minus Kassenanteil', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['Inlay, zweiflächig, GOZ 2160, 2,3-facher Satz: 175,41 EUR, dazu Material und Labor', 'den Betrag der Kassenfüllung, BEMA 13a bis 13d', '175,41 EUR plus Material und Labor minus Kassenanteil', 'Der Tarif erstattet den erstattungsfähigen Rest'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Die Euro-Beträge sind eigene Rechnung nach der Gebührenordnung für Zahnärzte: Punktzahl mal Punktwert 5,62421 Cent mal Faktor (§ 5 GOZ), auf volle Cent gerundet. Kassenfüllung und Mehrkostenregelung nach § 28 Abs. 2 SGB V und Patienteninformation der KZV Berlin, Stand Februar 2026. Annahmen: Bei Vertragsbeginn war nichts angeraten oder geplant, im selben Jahr wurde nichts anderes erstattet. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung bei der Zahnfüllung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die UKV ZahnPRIVAT hat drei Leistungsstufen ohne Wartezeiten, je nach Tarif für Zahnersatz, Zahnbehandlung und Vorsorge. In ZahnPRIVAT 100 erstattet der Tarif 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. In ZahnPRIVAT 75 sind es 75 % der erstattungsfähigen Kosten, ebenfalls nach Abzug der Kassenleistung.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Für die Kassenfüllung brauchst du keinen Tarif.',
              text: 'Die Kasse zahlt sie ohne Zuzahlung. Ein Zahntarif kommt erst ins Spiel, wenn du mehr als die Kassenfüllung wählst oder wenn später größere Behandlungen wie Zahnersatz anstehen.',
            },
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
            {
              lead: 'Fehlen schon Zähne, gelten die Regeln von healio.de/zahn.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wurde dir eine Füllung schon angeraten, gibt es für diesen Fall den Baustein ZAHN Sofort der Bayerischen. Möglich sind bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Dafür gelten feste Bedingungen.',
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
          type: 'segments',
          segments: [
            { text: 'Wartezeiten hängen bei der Bayerischen am gewählten Zahntarif, sie stehen im Antrag und im Versicherungsschein. Was ab Tag eins gilt und wo die Staffel greift, zeigt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
            { text: '. Was bei einer Zahnlücke gilt, steht im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '.' },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Ist die Füllung schon angeraten oder läuft sie? Der Zahn-Check zeigt dir den Weg, der heute noch offen ist.',
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
              icon: 'hospital',
              tone: 'sky',
              title: 'Wurzelbehandlung Kosten',
              text: 'Was die Kasse bei einer Wurzelbehandlung zahlt.',
              to: '/ratgeber/wurzelbehandlung-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'butter',
              title: 'Zahnkrone Kosten',
              text: 'Wenn von dem Zahn zu viel fehlt für eine Füllung.',
              to: '/ratgeber/zahnkrone-kosten',
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
      question: 'Zahlt die Krankenkasse eine Zahnfüllung?',
      answer:
        'Ja. Gesetzlich Versicherte haben Anspruch auf eine Füllung ohne Zuzahlung, im Frontzahnbereich als adhäsiv befestigte Füllung, im Seitenzahnbereich mit selbsthaftenden Materialien. Wählst du mehr, trägst du die Mehrkosten selbst, die Kasse übernimmt den Betrag der Kassenfüllung.',
    },
    {
      question: 'Gibt es seit 2025 noch Amalgamfüllungen?',
      answer:
        'Neue Füllungen aus Amalgam sind in der EU seit dem 1. Januar 2025 verboten, es sei denn, die Zahnärztin oder der Zahnarzt hält sie bei einer Patientin oder einem Patienten für zwingend notwendig. Bestehende Amalgamfüllungen können im Mund bleiben.',
    },
    {
      question: 'Welche Zahnfüllung zahlt die Kasse im Seitenzahnbereich?',
      answer:
        'Selbsthaftende Füllungsmaterialien wie Zement (Glasionomerzement, kunststoffmodifizierter Glasionomerzement), Glashybride oder selbstadhäsive Komposit-Hybride aus Kunststoff. Ist eine selbsthaftende Füllung aus zahnmedizinischen oder technischen Gründen nicht möglich, übernimmt die Kasse eine Bulkfill-Kunststofffüllung.',
    },
    {
      question: 'Was kostet eine Zahnfüllung?',
      answer:
        'Für die Kassenfüllung zahlst du nichts dazu. Wählst du eine geklebte Kompositfüllung, beträgt das Honorar nach GOZ beim 2,3-fachen Satz je nach Fläche 68,17 bis 99,60 EUR, abzüglich des Kassenanteils. Die Zahlen sind eigene Rechnung, deine Praxis nennt dir ihre Beträge.',
    },
    {
      question: 'Was kostet eine Keramikfüllung?',
      answer:
        'Ein Inlay aus Keramik ist eine private Zusatzleistung. Das Honorar nach GOZ liegt beim 2,3-fachen Satz je nach Fläche bei 147,60 bis 221,07 EUR, dazu kommen Material und Labor, davon geht der Kassenanteil ab. Eine feste Gesamtsumme gibt es nicht, sie steht in deiner Mehrkostenvereinbarung.',
    },
    {
      question: 'Zahlt meine Zahnzusatzversicherung die Füllung?',
      answer:
        'Das hängt vom Tarif und davon, was erstattungsfähig ist. In ZahnPRIVAT 100 erstattet die UKV 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Nicht versichert ist, was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir von deiner Praxis erklären, welche Kassenfüllung für deinen Zahn in Frage kommt, und frag nach der Mehrkostenvereinbarung, bevor du etwas unterschreibst. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Alle Zahnkosten auf einen Blick findest du im Ratgeber ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Regeln der Kasse stammen aus Gesetz, Pressemitteilung der Selbstverwaltung und Patienteninformationen, die Gebühren aus der Gebührenordnung für Zahnärzte.',
    items: [
      {
        label: 'Trotz Amalgam-Verbot ab 1. Januar 2025: Gemeinsame Selbstverwaltung sorgt für Erhalt einer umfassenden GKV-Versorgung',
        publisher: 'GKV-Spitzenverband und Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.gkv-spitzenverband.de/gkv_spitzenverband/presse/pressemitteilungen_und_statements/pressemitteilung_1908372.jsp',
        stand: 'gemeinsame Pressemitteilung vom 11.10.2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zuzahlungsfreie Zahnfüllungen (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Vereinigung Berlin',
        href: 'https://www.kzv-berlin.de/fileadmin/user_upload_kzv/Patienten/Informationsschreiben_zuzahlungsfreie_Kassenfuellungen_Patient.pdf',
        stand: 'Februar 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Veränderungen in der zahnärztlichen Behandlung 2025',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/veraenderungen-in-der-zahnaerztlichen-behandlung-2025-95961',
        stand: '07.01.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 28 Ärztliche und zahnärztliche Behandlung, Absatz 2 (Mehrkostenregelung bei Füllungen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__28.html',
        stand: 'Fassung inklusive Beitragssatzstabilisierungsgesetz',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOZ, Anlage 1 (Gebührenverzeichnis), Abschnitt C, Nr. 2060 bis 2120 und 2150 bis 2170',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/goz_1987/anlage_1.html',
        stand: '05.12.2011',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GOZ § 5 (Punktwert und Gebührenrahmen) und § 9 (Auslagen für zahntechnische Leistungen)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/goz_1987/__5.html',
        stand: '05.12.2011',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/zahn.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
