/**
 * Ratgeber Homöopathie ab 2027 (Krankenkasse, Zusatzschutz, Labor, TCM).
 * Feld: Ambulant. Freigegebener Entwurf vom 11.10.2026.
 * Keine Wirksamkeitsaussage zu Homöopathie; der Ratgeber erklärt nur, wer welche Kosten trägt.
 * Tarifangaben nach den SDK-Versicherungsbedingungen AP-Tarife (AVB Teil II 1.753a), Stand 01.01.2023.
 */
export const article = {
  slug: 'homoeopathie-krankenkasse-2027',
  kind: 'ratgeber',
  group: 'ambulant',
  metaTitle: 'Homöopathie ab 2027: Krankenkasse und Zusatzschutz | Healio',
  metaDescription:
    'Homöopathie ab 2027: keine Kassenleistung mehr. Was eine Zusatzversicherung bei Globuli, Bluttest und TCM erstattet. Mit Stufen, Rechnungstipps und FAQ.',
  publishedAt: '2026-10-11',
  publishedAtLabel: '11. Oktober 2026',
  readingTimeMinutes: 7,
  listTitle: 'Homöopathie ab 2027: Krankenkasse und Zusatzschutz',
  listTeaser:
    'Seit Juli 2026 gibt es Homöopathie nicht mehr auf Kassenrezept, ab Januar 2027 dürfen die Kassen sie auch freiwillig nicht mehr bezahlen. Hier erfährst du, was das für dich heißt, ob eine Zusatzversicherung homöopathische Mittel und Bluttests beim Heilpraktiker erstattet und worauf du bei der Rechnung achten musst.',
  headline: 'Homöopathie ab 2027: Was die Krankenkasse nicht mehr zahlt und wie du die Kosten trotzdem auffängst',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'comparison',
    facts: [
      { value: '30. Juli 2026', label: 'Homöopathika nur noch auf Privatrezept.' },
      { value: '1. Januar 2027', label: 'Auch keine freiwillige Kassenleistung mehr.' },
      { value: 'Bis zu 1.000 EUR', label: 'Naturheilverfahren in 2 Jahren, Stufe 100.' },
    ],
    text: 'Wer weiter homöopathisch behandelt werden möchte, zahlt künftig selbst oder sorgt mit einem Tarif für Naturheilverfahren vor.',
    path: {
      to: '/ambulant',
      text: 'Passende Tarifstufe prüfen',
      label: 'Ambulante Tarife bei Healio öffnen',
    },
  },

  lead: 'Viele gesetzliche Krankenkassen haben bisher homöopathische Behandlungen und Mittel als Extra bezahlt. Damit ist bald Schluss. Mit dem GKV-Beitragssatzstabilisierungsgesetz hat der Gesetzgeber 2026 entschieden, dass homöopathische und anthroposophische Arzneimittel nicht mehr zur gesetzlichen Krankenversicherung gehören. Wer weiter homöopathisch behandelt werden möchte, zahlt künftig selbst. Oder er sorgt vor.',

  sections: [
    {
      id: 'aenderung',
      heading: 'Was sich genau ändert',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wir vergleichen nicht Tarif A mit Tarif B. Wir schauen zuerst, wie sich dein Schutz finanzieren lässt, beginnend bei deiner Krankenkasse. Dann finden wir den Schutz, der passt.',
        },
        { type: 'paragraph', text: 'Zwei Daten sind wichtig:' },
        {
          type: 'list',
          items: [
            { lead: 'Seit 30. Juli 2026:', text: 'Ärztinnen und Ärzte dürfen homöopathische und anthroposophische Arzneimittel nur noch privat verordnen, nicht mehr zulasten der Krankenkasse.' },
            { lead: 'Ab 1. Januar 2027:', text: 'Krankenkassen dürfen diese Mittel auch nicht mehr als freiwillige Zusatzleistung (Satzungsleistung) übernehmen.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Bis Ende 2026 kann es also noch sein, dass deine Kasse eine Erstattung auf Privatrezept leistet, wenn ihre Satzung das vorsieht. Frag am besten direkt bei deiner Kasse nach und reiche offene Rechnungen rechtzeitig ein. Ab 2027 ist dieser Weg für alle gesetzlich Versicherten zu.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Zahlt eine Zusatzversicherung Homöopathie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, wenn der Tarif Naturheilverfahren abdeckt. Das gilt auch für das Healio Gesundheitsbudget, das Healio mit den ambulanten Tarifen der SDK (AP5 bis AP1) vermittelt: In den Versicherungsbedingungen der SDK zählt Homöopathie ausdrücklich zu den klassischen Naturheilverfahren. Versichert sind Behandlungen durch Heilpraktikerinnen und Heilpraktiker, die nach dem Gebührenverzeichnis für Heilpraktiker (GebüH) abrechnen, und durch Ärztinnen und Ärzte, die nach der GOÄ abrechnen.',
        },
        {
          type: 'paragraph',
          text: 'Wie viel du zurückbekommst, hängt von der Tarifstufe ab. Für Naturheilverfahren gilt innerhalb von jeweils zwei Kalenderjahren:',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Naturheilverfahren im Healio Gesundheitsbudget (SDK AP-Tarife): Erstattung je Stufe',
          head: ['Stufe', 'Erstattung', 'Höchstens in 2 Jahren'],
          rows: [
            ['Stufe 50 (SDK AP5)', '50 %', '500 EUR'],
            ['Stufe 70 (SDK AP7)', '70 %', '700 EUR'],
            ['Stufe 90 (SDK AP9)', '90 %', '900 EUR'],
            ['Stufe 100 (SDK AP1)', '100 %', '1.000 EUR'],
          ],
          note: 'Nach den Versicherungsbedingungen der SDK für die AP-Tarife, Stand 01.01.2023.',
        },
        {
          type: 'paragraph',
          text: 'Insgesamt bietet die höchste Stufe ein Gesundheitsbudget von 3.000 EUR in zwei Jahren, verteilt auf Naturheilverfahren, Vorsorge, Sehhilfen sowie Hilfsmittel und Zuzahlungen.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'comparison',
          text: 'Tarifstufe und Naturheilverfahren prüfen',
          label: 'Ambulante Tarife bei Healio öffnen',
        },
      ],
    },
    {
      id: 'mittel',
      heading: 'Welche homöopathischen Mittel werden bezahlt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine feste Liste einzelner Präparate gibt es nicht. Entscheidend ist, wie das Mittel zu dir kommt. Der Tarif erstattet Arznei-, Heil- und Verbandmittel, die im Zusammenhang mit einer Naturheilbehandlung verordnet wurden. Zwei Dinge müssen dafür stimmen:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Das Mittel wurde dir von deiner Heilpraktikerin, deinem Heilpraktiker oder deiner Ärztin bzw. deinem Arzt im Rahmen der Behandlung verordnet.',
            'Du hast es in der Apotheke gekauft.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hebe also das Rezept und den Apothekenbeleg auf und reiche beides zusammen ein. Ein Mittel, das du dir ohne Behandlung selbst aus der Drogerie holst, fällt nicht darunter. Die Erstattung läuft über denselben Topf wie die Behandlung, also über die Beträge aus der Tabelle oben.',
        },
      ],
    },
    {
      id: 'labor',
      heading: 'Zahlt die Zusatzversicherung einen Bluttest beim Heilpraktiker?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Häufig ja. Der Tarif erstattet alle Leistungen, die im aktuellen Gebührenverzeichnis für Heilpraktiker stehen. Darunter fallen auch Laboruntersuchungen, die deine Heilpraktikerin oder dein Heilpraktiker selbst nach GebüH abrechnet, etwa ein Blutbild oder eine Urinuntersuchung. Auch das läuft über den Topf für Naturheilverfahren.',
        },
        {
          type: 'paragraph',
          text: 'Etwas anders ist es, wenn ein externes Labor dir eine eigene Rechnung schickt. Dieser Fall ist in den Bedingungen nicht ausdrücklich geregelt. Frag deshalb vorher bei uns nach, bevor du eine teure Untersuchung beauftragst.',
        },
        {
          type: 'paragraph',
          text: 'Labor und Behandlung teilen sich dasselbe Budget. Wer viele Tests machen lässt, hat weniger für die Behandlung selbst übrig. Sprich mit deiner Praxis ab, welche Untersuchung wirklich nötig ist.',
        },
      ],
    },
    {
      id: 'tcm',
      heading: 'Und was ist mit TCM und Akupunktur?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Unter den Naturheilverfahren trifft die Neuregelung nur Homöopathie und anthroposophische Medizin. Für Akupunktur ändert sich nichts. Die Krankenkasse zahlt Körperakupunktur weiterhin nur in engen Fällen: bei chronischen Schmerzen im unteren Rücken oder bei Kniearthrose, wenn die Beschwerden seit mindestens sechs Monaten bestehen und eine Ärztin oder ein Arzt mit passender Qualifikation behandelt. Alles andere aus der traditionellen chinesischen Medizin zahlst du in der Regel selbst.',
        },
        {
          type: 'paragraph',
          text: 'Lässt du dich von einer Heilpraktikerin oder einem Heilpraktiker mit Akupunktur behandeln, gilt im Healio Gesundheitsbudget dasselbe wie bei der Homöopathie: Erstattet wird aus dem Topf für Naturheilverfahren, wenn die Leistung nach dem Gebührenverzeichnis für Heilpraktiker abgerechnet wird.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Mehr dazu, wann die Kasse bei TCM zahlt, liest du im Ratgeber ' },
            { text: 'TCM und Krankenkasse', to: '/ratgeber/tcm-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'rechnung',
      heading: 'Darauf kommt es bei der Rechnung an',
      blocks: [
        { type: 'paragraph', text: 'Damit die Erstattung glatt läuft, sollte auf der Rechnung stehen:' },
        {
          type: 'list',
          items: [
            'dein Name und das Behandlungsdatum,',
            'die Diagnose,',
            'die einzelnen Leistungen mit GebüH-Ziffer (beim Heilpraktiker) oder GOÄ-Ziffer (beim Arzt),',
            'bei Arzneimitteln das Rezept und der Apothekenbeleg.',
          ],
        },
      ],
    },
    {
      id: 'grenzen',
      heading: 'Was die Zusatzversicherung nicht leistet',
      blocks: [
        {
          type: 'list',
          items: [
            'Behandlungen, die schon vor Versicherungsbeginn angefangen haben oder angeraten wurden, sind nicht versichert. Der Schutz gilt für neu beginnende Behandlungen.',
            'Psychotherapie durch Heilpraktiker erstattet der Tarif nicht.',
            'Über die Höchstbeträge hinaus zahlst du selbst.',
          ],
        },
        {
          type: 'honest',
          icon: 'document',
          heading: 'Ehrlich gesagt',
          text: 'Ob und wie gut Homöopathie wirkt, bewerten wir hier nicht. Dieser Ratgeber erklärt nur, wer welche Kosten trägt.',
        },
      ],
    },
    {
      id: 'finanzieren',
      heading: 'So finanzierst du den Schutz',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bevor du einen Beitrag zahlst, lohnt der Blick auf deine Krankenkasse. Viele Kassen zahlen einen Bonus für Vorsorge und gesundes Verhalten. Bei der IKK classic sind laut Satzung bis zu 810 EUR im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, das sind theoretische Höchstwerte. In der breiten Masse sind 400 bis 700 EUR realistisch. Rechne dagegen den Zusatzbeitrag deiner Kasse. Diesen Bonus kannst du nutzen, um deine Zusatzversicherung zu finanzieren. Ausgezahlt wird er höchstens bis zur Höhe deines Jahresbeitrags.',
        },
      ],
    },
    {
      id: 'vorgehen',
      heading: 'So gehst du vor',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Prüfe auf kassenboost.de, welchen Bonus deine Krankenkasse zahlt und ob sich ein Wechsel lohnt.',
            'Reiche Homöopathie-Rechnungen aus 2026 noch bei deiner Kasse ein, falls sie bisher Homöopathie bezahlt hat.',
            'Schau dir auf healio.de/ambulant an, welche Tarifstufe zu dir passt. Die SDK-Tarife haben keine Wartezeit.',
          ],
        },
      ],
    },
    {
      id: 'weiterlesen',
      heading: 'Welche Ratgeber helfen dir beim nächsten Schritt?',
      blocks: [
        {
          type: 'cards',
          heading: 'Das passt dazu',
          items: [
            { title: 'TCM und Krankenkasse', text: 'Wann die Kasse bei TCM zahlt.', to: '/ratgeber/tcm-krankenkasse', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Akupunktur und Krankenkasse', text: 'Die geregelte Leistung genauer einordnen.', to: '/ratgeber/akupunktur-krankenkasse', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Naturheilkunde', text: 'Begriffe, Berufe und Kosten abgrenzen.', to: '/ratgeber/naturheilkunde', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Gebührenverzeichnis für Heilpraktiker', text: 'Honorar und Erstattungsmaßstab unterscheiden.', to: '/ratgeber/gebuehrenordnung-heilpraktiker', icon: 'document', linkLabel: 'Ratgeber lesen' },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Alle Kostenfragen rund um Heilpraktiker sammelt die Seite ' },
            { text: 'Heilpraktiker Kosten', to: '/ratgeber/heilpraktiker-kosten' },
            { text: '.' },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio verbindet ambulanten Zusatzschutz mit dem Bonusprogramm der Krankenkasse. Das Healio Gesundheitsbudget bietet in der höchsten Stufe bis zu 3.000 EUR in zwei Jahren, davon bis zu 1.000 EUR für Naturheilverfahren. Homöopathie zählt in den Versicherungsbedingungen der SDK ausdrücklich zu den Naturheilverfahren. Ob und wie gut sie wirkt, bewertet dieser Ratgeber nicht.',

  faqs: [
    {
      question: 'Zahlt die Krankenkasse 2027 noch Homöopathie?',
      answer:
        'Nein. Ab dem 1. Januar 2027 dürfen gesetzliche Krankenkassen homöopathische und anthroposophische Arzneimittel nicht mehr übernehmen, auch nicht als freiwillige Satzungsleistung. Auf Kassenrezept gibt es sie schon seit dem 30. Juli 2026 nicht mehr.',
    },
    {
      question: 'Welche Zusatzversicherung zahlt Homöopathie?',
      answer:
        'Eine ambulante Zusatzversicherung mit Baustein für Naturheilverfahren, zum Beispiel das Healio Gesundheitsbudget mit den SDK-Tarifen AP5 bis AP1. Es erstattet je nach Stufe 50 bis 100 % bis 500 bis 1.000 EUR in zwei Kalenderjahren für Heilpraktiker- und Naturheilbehandlungen einschließlich verordneter Arzneimittel aus der Apotheke.',
    },
    {
      question: 'Werden homöopathische Globuli erstattet?',
      answer:
        'Ja, wenn sie dir im Rahmen einer Naturheilbehandlung verordnet wurden und du sie in der Apotheke gekauft hast. Selbst gekaufte Mittel ohne Verordnung fallen nicht darunter.',
    },
    {
      question: 'Fällt TCM 2027 auch aus der Krankenkasse?',
      answer:
        'Nein. Unter den Naturheilverfahren trifft die Neuregelung nur Homöopathie und anthroposophische Medizin. Akupunktur zahlt die Kasse weiter bei chronischen Schmerzen im unteren Rücken oder bei Kniearthrose. Andere TCM-Behandlungen beim Heilpraktiker kann eine Zusatzversicherung mit Naturheilverfahren erstatten.',
    },
    {
      question: 'Zahlt die Zusatzversicherung Laboruntersuchungen beim Heilpraktiker?',
      answer:
        'Laboruntersuchungen, die der Heilpraktiker nach GebüH abrechnet, erstattet das Healio Gesundheitsbudget aus dem Topf für Naturheilverfahren. Bei Rechnungen eines externen Labors frag am besten vorher bei uns nach.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welche Tarifstufe zu dir passt, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Welchen Bonus deine Krankenkasse zahlt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-11',
    checkedAtLabel: '11. Oktober 2026',
    intro: 'Die Neuregelung stammt aus der Praxisnachricht der Kassenärztlichen Bundesvereinigung, die Kassenleistung bei Akupunktur aus der Richtlinie des G-BA, die Tarifregeln aus den Versicherungsbedingungen der SDK.',
    items: [
      {
        label: 'Homöopathika, Anthroposophika und Cannabisblüten nicht mehr verordnungsfähig',
        publisher: 'Kassenärztliche Bundesvereinigung (KBV)',
        href: 'https://www.kbv.de/praxis/tools-und-services/praxisnachrichten/2026/07-30/homoeopathika-anthroposophika-und-cannabisblueten-nicht-mehr-verordnungsfaehig',
        stand: 'Praxisnachricht vom 30.07.2026',
        accessedAt: '11.10.2026',
      },
      {
        label: 'Richtlinie Methoden vertragsärztliche Versorgung, Anlage I Nr. 12 (Körperakupunktur)',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-4212/MVV-RL_2026-06-18_iK-2026-09-09.pdf',
        stand: 'zuletzt geändert 18.06.2026, in Kraft seit 09.09.2026',
        accessedAt: '11.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 6 (Satzungsleistungen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        accessedAt: '11.10.2026',
      },
      {
        label: 'SDK AP-Tarife: Naturheilverfahren, Stufen und Wartezeiten (AVB Teil II 1.753a)',
        publisher: 'SDK',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        accessedAt: '11.10.2026',
        stand: 'Stand 01.01.2023',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Dieser Ratgeber dient der Orientierung und ersetzt keine individuelle medizinische Beratung. Maßgeblich sind die konkrete Leistung, die aktuelle Kassensatzung und die Bedingungen sowie Annahme des gewählten Tarifs.',
};

export default article;
