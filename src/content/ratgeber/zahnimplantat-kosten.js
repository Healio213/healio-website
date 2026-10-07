/**
 * Zahn-Ratgeber Welle 1, Z2: "Zahnimplantat Kosten".
 *
 * Quellen: Healio/Ratgeber/zahn-ratgeber-belege/BELEGE-WELLE1.md, Abschnitt B2
 * (§ 28 Abs. 2 SGB V, G-BA-Behandlungsrichtlinie B.VII, §§ 55 und 56 SGB V,
 * Festzuschuss-Richtlinie Teil A Nr. 6 und 7, Verbraucherzentrale
 * 1.500 bis 3.500 EUR), B4 (Festzuschüsse 2026 für Befund 2.1), B5
 * (Prozentsätze bis 2026 und ab 2027), B6 (Heil- und Kostenplan, Fristen).
 * Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen: keine Euro-Zahl für den Knochenaufbau (nicht belegt, die
 * Seite verweist auf den Heil- und Kostenplan), kein Rechenbeispiel mit einem
 * Zahn, der schon vor Vertragsbeginn fehlte, kein Beitrag für ZAHN Sofort,
 * keine Behandlungsempfehlung.
 *
 * Faktenprüfung 06.10.2026: Healio/Ratgeber/zahn-ratgeber-belege/PRUEFBERICHT-WELLE1.md
 */
export const article = {
  slug: 'zahnimplantat-kosten',
  kind: 'ratgeber',

  metaTitle: 'Zahnimplantat Kosten: Kassenanteil und Eigenanteil | Healio',
  metaDescription:
    'Was ein Zahnimplantat kostet, welchen Festzuschuss die Kasse zahlt, was mit Bonusheft gilt und was eine Zahnzusatzversicherung im ersten Jahr erstattet.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Zahnimplantat: Kosten, Kassenanteil und Eigenanteil',
  listTeaser:
    'Warum die Kasse beim Implantat nur einen Festzuschuss zahlt, was übrig bleibt und wo die Zahnstaffel greift.',

  headline: 'Zahnimplantat: Kosten, Kassenanteil und Eigenanteil',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '1.500 bis 3.500 EUR', label: 'kostet ein Einzelimplantat mit Krone laut Verbraucherzentrale' },
      { value: '552,96 EUR', label: 'Festzuschuss 2026 für eine Einzelzahnlücke ohne Bonusheft' },
      { value: '1.000 EUR', label: 'Zahnstaffel der UKV ZahnPRIVAT im ersten Kalenderjahr' },
    ],
    text: 'Für das Implantat selbst zahlt die Kasse in der Regel nichts. Du bekommst den Festzuschuss für den Befund, der vor dem Implantat bestand.',
    path: { to: '/zahn#zahn-check', text: 'Implantat geplant oder angeraten?', label: 'Zahn-Check starten' },
  },

  lead:
    'Ein Zahnimplantat kostet als Einzelzahn-Implantat inklusive Zahnersatz laut Verbraucherzentrale in der Regel 1.500 bis 3.500 EUR. Für das Implantat selbst zahlt die gesetzliche Kasse in der Regel nichts, sie gibt den Festzuschuss für den Befund, der vor dem Implantat bestand, bei einer Lücke mit einem fehlenden Zahn 2026 ohne Bonusheft 552,96 EUR. Den Rest trägst du, soweit dein Zahntarif ihn nicht erstattet, und in den ersten Jahren begrenzt eine Zahnstaffel auch den Tarif.',

  sections: [
    {
      id: 'kosten',
      heading: 'Was kostet ein Zahnimplantat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Spanne von 1.500 bis 3.500 EUR für ein Einzelzahn-Implantat inklusive Zahnersatz stammt von der Verbraucherzentrale (Stand 01.07.2024). Bei mehreren Implantaten werden die Kosten laut Verbraucherzentrale schnell fünfstellig.',
        },
        {
          type: 'paragraph',
          text: 'In der Summe stecken das Setzen des Implantats, der Aufbau darauf, die Krone und die Laborkosten. Für das Setzen hat die Gebührenordnung für Zahnärzte eine eigene Position (GOZ 9010, Implantatinsertion je Implantat). Muss vorher Knochen aufgebaut werden, kommt ein weiterer Posten dazu. Wie hoch er bei dir ausfällt, steht im Heil- und Kostenplan, denn das hängt von Praxis, Befund und Material ab.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Zahlt die Krankenkasse für ein Implantat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'In der Regel nicht. Laut KZBV darf ein Implantat aufgrund gesetzlicher Vorschriften grundsätzlich nicht von der Kasse übernommen werden, und die Verbraucherzentrale nennt es eine reine Privatleistung. Auch Komplikationen zahlen gesetzlich Versicherte selbst.',
        },
        {
          type: 'paragraph',
          text: 'Das Gesetz kennt nur seltene Ausnahmen für besonders schwere Fälle (§ 28 Abs. 2 SGB V). Die Richtlinie des Gemeinsamen Bundesausschusses nennt dafür zum Beispiel größere Kiefer- oder Gesichtsdefekte nach Tumoroperationen oder Unfällen, eine dauerhaft extreme Mundtrockenheit und eine genetisch bedingte, allgemeine Nichtanlage von Zähnen. Voraussetzung ist, dass eine Versorgung ohne Implantate nicht möglich ist. Die Kasse lässt solche Fälle begutachten.',
        },
      ],
    },
    {
      id: 'festzuschuss',
      heading: 'Welchen Festzuschuss gibt es bei einem Implantat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Entscheidest du dich für ein Implantat, bekommst du trotzdem einen Zuschuss zur Versorgung. Nach der Festzuschuss-Richtlinie hast du bei einer Erstversorgung mit Implantaten Anspruch auf den Festzuschuss für die Befundsituation, die vor dem Setzen der Implantate bestand. Für die Implantate selbst, die Aufbauten und die implantatbedingten Verbindungselemente gibt es keine Festzuschüsse.',
        },
        {
          type: 'paragraph',
          text: 'Bei einem fehlenden Zahn mit Nachbarzähnen davor und dahinter ist das der Befund 2.1, Lücke mit einem fehlenden Zahn. Als Regelversorgung gilt dafür eine Brücke, denn das Gesetz verlangt zumindest bei kleinen Lücken festsitzenden Zahnersatz (§ 56 SGB V). Die Verbraucherzentrale beschreibt es so: Die Kasse erstattet 60 Prozent dessen, was die Basisversorgung mit einer Brücke oder Prothese kostet, den Rest zahlst du.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Festzuschuss 2026 für eine Lücke mit einem fehlenden Zahn, Befund 2.1, je Lücke',
          head: ['Stufe', 'Festzuschuss 2026', 'Anteil bis 31.12.2026', 'Anteil ab 01.01.2027'],
          rows: [
            ['Ohne Bonusheft', '552,96 EUR', '60 Prozent', '50 Prozent'],
            ['Bonusheft 5 Jahre', '645,12 EUR', '70 Prozent', '60 Prozent'],
            ['Bonusheft 10 Jahre', '691,20 EUR', '75 Prozent', '65 Prozent'],
            ['Härtefall', '921,60 EUR', '100 Prozent', '100 Prozent'],
          ],
          note: 'Quelle: G-BA, Festzuschuss-Richtlinie, Beträge gültig ab 1. Januar 2026 (Regelversorgung Brücke 921,60 EUR). Die Prozentsätze ab 2027 gelten für Festzuschüsse, die ab 01.01.2027 bewilligt werden (BGBl. 2026 I Nr. 228). Die Euro-Beträge für 2027 setzt der G-BA neu fest.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie dieselbe Logik bei einer einzelnen Krone aussieht, steht im Ratgeber ' },
            { text: 'Zahnkrone Kosten', to: '/ratgeber/zahnkrone-kosten' },
            { text: '. Eine Übersicht aller Zahnkosten findest du auf der Seite ' },
            { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'bonusheft',
      heading: 'Was bringt das Bonusheft bei einem Implantat?',
      blocks: [
        {
          type: 'segments',
          segments: [
            { text: 'Der Festzuschuss steigt mit lückenlosem Bonusheft von 60 auf 70 Prozent nach fünf und auf 75 Prozent nach zehn Jahren. Bei einem fehlenden Zahn sind das 92,16 EUR mehr nach fünf und 138,24 EUR mehr nach zehn Jahren, eigene Rechnung aus den Werten der Tabelle. Wie das Heft funktioniert und was bei einer Unterbrechung gilt, erklärt der Ratgeber ' },
            { text: 'Bonusheft beim Zahnarzt', to: '/ratgeber/bonusheft-zahnarzt' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Wie viel bleibt bei einem Implantat an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das Beispiel rechnet mit einem Einzelzahn-Implantat inklusive Krone und drei Kostenstufen aus der Spanne der Verbraucherzentrale. Beim Festzuschuss ist ein Bonusheft über 5 Jahre angenommen. Das Beispiel zeigt auch, was die Zahnstaffel im ersten Kalenderjahr bedeutet und wie es nach der Staffel aussieht.',
        },
        {
          type: 'costCard',
          title: 'Beispiel: Einzelzahn-Implantat inklusive Krone',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100, also 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung. Im ersten Kalenderjahr begrenzt die Zahnstaffel die Erstattung auf bis zu 1.000 EUR, ab dem vierten Kalenderjahr gelten allein die Erstattungssätze.',
          caption: 'Eigenanteil bei einem Einzelzahn-Implantat, Festzuschuss 2026 mit Bonusheft über 5 Jahre (645,12 EUR)',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['1.500 EUR, erstes Kalenderjahr', '645,12 EUR', '854,88 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
            ['2.500 EUR, erstes Kalenderjahr', '645,12 EUR', '1.854,88 EUR', '854,88 EUR, Zahnstaffel greift'],
            ['3.500 EUR, erstes Kalenderjahr', '645,12 EUR', '2.854,88 EUR', '1.854,88 EUR, Zahnstaffel greift'],
            ['2.500 EUR, ab dem vierten Kalenderjahr', '645,12 EUR', '1.854,88 EUR', 'Tarif erstattet den erstattungsfähigen Rest'],
          ],
          note: 'Beispielrechnung. Kosten: Spanne der Verbraucherzentrale für ein Einzelzahn-Implantat inklusive Zahnersatz, Stand 01.07.2024, ohne Knochenaufbau. Festzuschuss: G-BA, Befund 2.1, 70 Prozent von 921,60 EUR. Annahmen: Der Zahn ging erst nach Vertragsbeginn verloren, bei Vertragsbeginn war nichts angeraten oder geplant, im selben Jahr wurde nichts anderes erstattet, kein Härtefall.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'calculator',
          id: 'zahnkosten-rechner',
          preset: 'implantat',
          heading: 'Rechne dein Beispiel durch',
          intro: 'Der Rechner startet mit 2.500 EUR, der Mitte der Spanne. Hast du einen Heil- und Kostenplan, trägst du deinen Betrag selbst ein.',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft ein Implantat mit Heil- und Kostenplan ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auch beim Implantat schreibt die Praxis vor Beginn einen Heil- und Kostenplan. Darin stehen Befund, Regelversorgung und die tatsächlich geplante Versorgung samt Kosten (§ 87 SGB V). Die Kasse prüft den Plan und bewilligt den Festzuschuss. Für das Erstellen des Plans darf die Praxis keine Gebühr berechnen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zum Eigenanteil',
          items: [
            {
              title: 'Heil- und Kostenplan',
              text: 'Die Praxis plant Implantat und Krone und nennt die Kosten. Daneben steht die Regelversorgung.',
            },
            {
              title: 'Kasse genehmigt',
              text: 'Die Kasse bewilligt den Festzuschuss des Befunds vor dem Implantat. Mit der Behandlung soll erst begonnen werden, wenn die Genehmigung da ist.',
            },
            {
              title: 'Tarif erstattet',
              text: 'Dein Zahntarif erstattet nach seinen Bedingungen. Bei ZahnPRIVAT 100 sind Implantate inklusive Knochenaufbau erstattungsfähig.',
            },
          ],
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung beim Implantat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der UKV ZahnPRIVAT 100 sind Implantate inklusive Knochenaufbau, Brücken und Prothesen erstattungsfähig. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. ZahnPRIVAT 75 erstattet 75 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch dort sind Implantate, Brücken und Prothesen erstattungsfähig. Beide Tarife kommen ohne Wartezeiten aus.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Die Zahnstaffel gilt auch beim Implantat.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Fehlt der Zahn schon, gelten die Regeln von healio.de/zahn.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was bei einer Zahnlücke genau gilt, steht im Ratgeber ' },
            { text: 'Zahnzusatzversicherung bei fehlendem Zahn', to: '/ratgeber/zahnzusatzversicherung-fehlender-zahn' },
            { text: '. Was ab Tag eins gilt und was trotz fehlender Wartezeit nicht versichert ist, zeigt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
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
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet ein Zahnimplantat mit Krone?',
      answer:
        'Die Verbraucherzentrale nennt für ein Einzelzahn-Implantat inklusive Zahnersatz in der Regel 1.500 bis 3.500 EUR (Stand 01.07.2024). Bei mehreren Implantaten werden die Kosten schnell fünfstellig. Deinen Betrag nennt der Heil- und Kostenplan deiner Praxis.',
    },
    {
      question: 'Zahlt die gesetzliche Krankenkasse ein Zahnimplantat?',
      answer:
        'In der Regel nein. Ein Implantat darf laut KZBV grundsätzlich nicht von der Kasse übernommen werden. Ausnahmen gibt es nur in seltenen, besonders schweren Fällen, die die Kasse begutachten lässt.',
    },
    {
      question: 'Welchen Zuschuss bekomme ich bei einem Implantat trotzdem?',
      answer:
        'Du bekommst den Festzuschuss für den Befund, der vor dem Implantat bestand. Bei einer Lücke mit einem fehlenden Zahn ist das 2026 der Befund 2.1 mit 552,96 EUR ohne Bonusheft, 645,12 EUR mit fünf und 691,20 EUR mit zehn Jahren lückenlosem Bonusheft. Für Festzuschüsse, die ab 01.01.2027 bewilligt werden, gelten niedrigere Prozentsätze.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung Implantate?',
      answer:
        'In ZahnPRIVAT 75 und 100 der UKV sind Implantate, Brücken und Prothesen erstattungsfähig, in ZahnPRIVAT 100 inklusive Knochenaufbau. Nicht versichert ist, was in den letzten 2 Jahren angeraten oder geplant wurde oder schon läuft. Im ersten Kalenderjahr begrenzt außerdem die Zahnstaffel die Erstattung.',
    },
    {
      question: 'Was ist, wenn mir schon ein Zahn fehlt?',
      answer:
        'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich. Milch- und Weisheitszähne sowie ein vollständiger Lückenschluss zählen nicht. Mehr dazu steht im Ratgeber zum fehlenden Zahn.',
    },
    {
      question: 'Wie lange hat die Kasse Zeit, den Heil- und Kostenplan zu genehmigen?',
      answer:
        'Nach § 13 Abs. 3a SGB V entscheidet die Kasse innerhalb von drei Wochen, bei einem eingeholten Gutachten innerhalb von fünf Wochen und im zahnärztlichen Gutachterverfahren innerhalb von sechs Wochen. Kann sie die Frist nicht einhalten, muss sie das rechtzeitig mit Gründen mitteilen.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir vom Zahnarzt einen Heil- und Kostenplan geben und vergleiche ihn mit den Beispielen oben. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Alle Zahnkosten auf einen Blick findest du im Ratgeber ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-06',
    checkedAtLabel: '6. Oktober 2026',
    intro: 'Rechtslage und Festzuschüsse stammen aus Gesetz und Richtlinien, die Kosten aus den Patienteninformationen von Verbraucherzentrale und KZBV.',
    items: [
      {
        label: 'Brücke, Krone, Implantat: Welche Unterschiede gibt es beim Zahnersatz?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/bruecke-krone-implantat-welche-unterschiede-gibt-es-beim-zahnersatz-7925',
        stand: '01.07.2024',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Implantate können auch Risiken und Nebenwirkungen haben',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/implantate-koennen-auch-risiken-und-nebenwirkungen-haben-22243',
        stand: '11.12.2025',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Implantate (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/implantate/',
        stand: 'April 2022, Seite geändert 09.02.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 28 Ärztliche und zahnärztliche Behandlung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__28.html',
        stand: 'Fassung inklusive Beitragssatzstabilisierungsgesetz',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Behandlungsrichtlinie, Abschnitt B.VII Ausnahmeindikationen für implantologische Leistungen',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-2784/RL-Z_Behandlung_2021-12-16_iK-2022-03-09.pdf',
        stand: 'geändert 16.12.2021, in Kraft 09.03.2022',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Festzuschuss-Richtlinie, Teil A Nr. 6 und 7 und Beträge gültig ab 1. Januar 2026',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4045/FZ-RL_2025-12-05_iK-2026-01-01.pdf',
        stand: 'geändert 05.12.2025, in Kraft 01.01.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 55 und § 56 Festzuschüsse und Regelversorgung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        stand: '§ 55 in der Fassung bis 31.12.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228',
        publisher: 'Bundesministerium der Justiz und für Verbraucherschutz (Verkündung)',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Bundesmantelvertrag Zahnärzte, Anlage 2 (Heil- und Kostenplan)',
        publisher: 'KZBV und GKV-Spitzenverband',
        href: 'https://www.kzbv.de/wp-content/uploads/bmv-z-2026-04-01_gesamtausgabe.pdf',
        stand: 'Gesamtausgabe Stand 01.04.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'SGB V § 13 Absatz 3a (Genehmigungsfristen) und § 87 Absatz 1a (Heil- und Kostenplan)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__13.html',
        stand: 'Abruf 06.10.2026',
        accessedAt: '06.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/zahn.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Annahmeregeln nach dem Stand der genannten Unterlagen, maßgeblich sind immer der Bescheid deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
