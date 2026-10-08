/**
 * Familien-Ratgeber (Serie, Stapel krankenhaus-familie), Bereichsseite:
 * Zusatzversicherung für Kinder, was die Kasse zahlt und welcher Zusatzschutz
 * passt. Wird als letzte Seite des Feldes geschrieben, mit Karten auf die Seiten
 * des Feldes aus Welle A und die bestehenden Ratgeber.
 *
 * Quellen (Belege in zusatzversicherung-kinder.belege.md, Abruf 07.10.2026):
 * SGB V § 10 Abs. 2, § 11 Abs. 3, § 22, § 26, § 29, § 33, § 39 Abs. 4, VVG § 198,
 * BMG Ratgeber Krankenhaus (2022), gesund.bund.de (Begleitperson im Krankenhaus,
 * Stand 23.04.2026, und Zuzahlungen, Stand 15.03.2023). Tarifaussagen nur wie auf
 * healio.de/stationaer (live 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Kindernachversicherung nach § 198 VVG steht immer mit ihren Voraussetzungen:
 *     Elternteil beim Versicherer am Tag der Geburt, Anmeldung spätestens zwei
 *     Monate nach der Geburt, Schutz höchstens so umfassend wie der des
 *     Elternteils, Mindestversicherungsdauer bis drei Monate vereinbar (Bayerische
 *     drei Monate, SDK keine Vorversicherungszeit laut Produktseite). Gilt für
 *     Neugeborene und Adoptivkinder, nicht für ältere Kinder.
 *   - Die Produktseite formuliert die Aufnahme des Neugeborenen bei der SDK mit
 *     dem Wort Gesundheitsprüfung. Das Sperrwort wird nicht übernommen; die
 *     Seite sagt "ohne Risikozuschlag und ohne Leistungsausschluss" wie dort.
 *   - Beitragsbeispiele für Kinder nennt die Produktseite nur für die Bayerische
 *     (bis 15 Jahre: Komfort 3,20 EUR, Prestige 4,10 EUR im Monat). Für die SDK
 *     steht dort kein Kinderbeitrag, die Seite sagt das.
 *   - Zahn und Brille nur als Kassenregel (Gesetz) und als Karte auf die Seiten
 *     zahnzusatzversicherung-kinder und brille-krankenkasse (Welle A); keine
 *     Tarifaussagen zu Zahn und Brille.
 *   - Nur Slugs aus Welle A der Themenliste und BESTAND.md verlinkt.
 *     Krankenhauszusatzversicherung für Kinder (Welle C) und Kinderbrille
 *     (Welle B) fehlen deshalb, die Familienversicherung steht ohne Link.
 *   - Entbindung: wer beim Antrag schon schwanger ist, bekommt diese Entbindung
 *     von keinem Klinik-Tarif gezahlt (Produktseite).
 *   - Kein Kinderwunsch, kein NIPT, keine Nackenfalte.
 *   - Kein Sperrlisten-Kandidat (Entscheidung der Marktanalyse-Sitzung
 *     07.10.2026): nur babybonus-krankenkasse kommt auf die Google-Ads-Sperrliste.
 *   - Zahnspange: Der Anteil von 20 bzw. 10 Prozent wird nach § 29 Abs. 3 SGB V
 *     bei Abschluss im geplanten Umfang zurückgezahlt; seit dem Prüflauf
 *     07.10.2026 steht das im Text.
 *   - Einbau 07.10.2026: Karte auf zahnzusatzversicherung-kinder bis zum Bau
 *     der Seite entfernt (serie/NACHZUTRAGEN.md).
 *   - Einbau 07.10.2026 (Stapel familienplanung): Karten auf
 *     baby-geplant-zusatzversicherung, neugeborenes-versichern und
 *     familienzimmer-krankenhaus ergänzt, Karten in zwei Blöcke geteilt.
 */

export const article = {
  slug: 'zusatzversicherung-kinder',
  kind: 'ratgeber',
  group: 'familie',

  metaTitle: 'Zusatzversicherung Kinder: Kasse und Zusatzschutz | Healio',
  metaDescription:
    'Zusatzversicherung für Kinder: was die Kasse bei Krankenhaus, Zahn und Brille zahlt, wie du Neugeborene nachversicherst und welche Voraussetzungen dafür gelten.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  updatedAt: '2026-10-08',
  updatedAtLabel: '8. Oktober 2026',
  readingTimeMinutes: 11,

  listTitle: 'Zusatzversicherung für Kinder: was die Kasse zahlt und welcher Zusatzschutz passt',
  listTeaser:
    'Der Überblick für Familien: Kassenleistung bei Krankenhaus, Zahn und Brille, Kinder nachversichern mit allen Voraussetzungen und der Weg zu jedem Familien-Ratgeber.',

  headline: 'Zusatzversicherung Kinder: was die Kasse zahlt und welcher Zusatzschutz passt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'family',
    facts: [
      { value: '2 Monate', label: 'nach der Geburt anmelden, dann gilt der Schutz rückwirkend' },
      { value: 'Unter 9 Jahren', label: 'Begleitperson im Krankenhaus ohne ärztliche Bescheinigung' },
      { value: '3,20 EUR im Monat', label: 'Bayerische Komfort für Kinder bis 15 Jahre, Prestige 4,10 EUR' },
    ],
    text: 'Die Kasse zahlt für Kinder viel, aber nicht alles: Zimmer, Chefarzt und die Begleitung ab neun Jahren sind im Krankenhaus oft offen. Neugeborene lassen sich nur unter Bedingungen nachversichern, die weiter unten stehen.',
    path: { to: '/stationaer', text: 'Klinik-Tarife für Kinder und Familie', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Für Kinder zahlt die gesetzliche Kasse die medizinisch notwendige Versorgung, im Krankenhaus ohne Zuzahlung. Offen bleiben Wahlleistungen wie Zimmer und Chefarzt, im Krankenhaus die Begleitung älterer Kinder ohne Attest, beim Zahnarzt Mehrleistungen und bei der Brille das Gestell. Diese Seite ordnet das ein, zeigt, wie du ein Neugeborenes nach § 198 VVG nachversicherst, und führt dich zum passenden Ratgeber für Krankenhaus, Zahn, Brille und Babybonus.',

  sections: [
    {
      id: 'kasse-zahlt',
      heading: 'Was zahlt die gesetzliche Krankenkasse für Kinder?',
      blocks: [
        {
          type: 'list',
          items: [
            { lead: 'Familienversicherung.', text: 'Kinder sind unter den Voraussetzungen des Gesetzes über die Eltern versichert, bis zur Vollendung des 18. Lebensjahres, in bestimmten Fällen länger (§ 10 Abs. 2 SGB V). Die Voraussetzungen im Einzelnen stehen im Gesetz.' },
            { lead: 'Früherkennung.', text: 'Versicherte Kinder und Jugendliche haben bis zur Vollendung des 18. Lebensjahres Anspruch auf Untersuchungen zur Früherkennung von Krankheiten, die ihre Entwicklung gefährden (§ 26 SGB V).' },
            { lead: 'Krankenhaus.', text: 'Die Kasse zahlt die notwendige Behandlung. Kinder und Jugendliche unter 18 zahlen keine Zuzahlung (BMG, Ratgeber Krankenhaus). Bei Kindern unter neun Jahren wird die Notwendigkeit der Mitaufnahme einer Begleitperson unwiderlegbar vermutet (§ 11 Abs. 3 SGB V).' },
            { lead: 'Zahnarzt.', text: 'Zwischen sechs und 18 Jahren kann dein Kind einmal je Kalenderhalbjahr zur zahnärztlichen Vorsorge, dazu kommt die Fissurenversiegelung der Molaren (§ 22 SGB V). Bei einer Zahnspange in medizinisch begründeten Fällen zahlst du zunächst 20 Prozent der Kosten, für das zweite Kind in Behandlung 10 Prozent. Diesen Anteil zahlt die Kasse zurück, wenn die Behandlung im geplanten Umfang abgeschlossen ist (§ 29 SGB V).' },
            { lead: 'Brille.', text: 'Bis zur Vollendung des 18. Lebensjahres besteht Anspruch auf Sehhilfen, nicht aber auf die Kosten des Brillengestells (§ 33 Abs. 2 SGB V). Ab 14 Jahren gibt es einen neuen Anspruch nur bei einer Änderung der Sehfähigkeit um mindestens 0,5 Dioptrien (§ 33 Abs. 4 SGB V).' },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was dir rund um Schwangerschaft und Baby zusteht, steht im Ratgeber ' },
            { text: 'Was steht mir in der Schwangerschaft zu?', to: '/ratgeber/schwangerschaft-was-steht-mir-zu' },
            { text: ', die Zusatzleistungen mancher Kassen im Ratgeber ' },
            { text: 'Babybonus Krankenkasse 2026', to: '/ratgeber/babybonus-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'luecken',
      heading: 'Wo bleibt bei Kindern trotzdem eine Lücke?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Im Krankenhaus ist es die Begleitung ab neun Jahren. Die gesetzliche Kasse übernimmt sie bei älteren Kindern, wenn sie medizinisch notwendig ist und die Ärztin oder der Arzt im Krankenhaus das schriftlich bescheinigt. Einige Kassen zahlen auch ohne Bescheinigung bis zum 12. Geburtstag, das erfragst du vorab bei deiner Kasse. Ohne medizinische Notwendigkeit können Eltern in vielen Kliniken trotzdem mit aufgenommen werden, die Kosten müssen dann in der Regel selbst getragen werden (gesund.bund.de, Stand 23.04.2026).',
        },
        {
          type: 'paragraph',
          text: 'Dazu kommen die Wahlleistungen. Ein Einbett- oder Zweibettzimmer und die Behandlung durch den Chefarzt zahlt die Kasse nur bei medizinischer Erforderlichkeit. Bei der Zahnspange streckst du deinen Anteil bis zum Abschluss vor, und wählst du Leistungen über die Kassenversorgung hinaus, trägst du die Mehrkosten selbst (§ 29 Abs. 5 SGB V). Bei der Brille fehlt das Gestell.',
        },
      ],
    },
    {
      id: 'nachversicherung',
      heading: 'Wie versicherst du ein Neugeborenes nach § 198 VVG nach?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mit einer Anmeldung innerhalb von zwei Monaten und unter mehreren Voraussetzungen. Besteht am Tag der Geburt für mindestens einen Elternteil eine Krankenversicherung, ist der Versicherer verpflichtet, das neugeborene Kind ab Vollendung der Geburt ohne Risikozuschläge und Wartezeiten zu versichern, wenn die Anmeldung spätestens zwei Monate nach dem Tag der Geburt rückwirkend erfolgt (§ 198 Abs. 1 VVG).',
        },
        {
          type: 'steps',
          heading: 'Die Voraussetzungen im Überblick',
          items: [
            { title: 'Ein Elternteil ist versichert', text: 'Am Tag der Geburt besteht für mindestens einen Elternteil eine Krankenversicherung beim Versicherer. Der Versicherer darf eine Mindestversicherungsdauer des Elternteils von bis zu drei Monaten vereinbaren (§ 198 Abs. 3 VVG).' },
            { title: 'Anmeldung binnen zwei Monaten', text: 'Die Anmeldung muss spätestens zwei Monate nach dem Tag der Geburt erfolgen. Dann gilt der Schutz rückwirkend ab der Geburt.' },
            { title: 'Nicht mehr als der Elternteil', text: 'Der Schutz des Neugeborenen darf nicht höher und nicht umfassender sein als der des versicherten Elternteils.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Auf healio.de/stationaer steht dazu: Bei der SDK nimmt der Tarif das Kind auf, wenn ein Elternteil am Tag der Geburt im Klinik-Tarif versichert ist, ohne Risikozuschlag und ohne Leistungsausschluss, auch bei Geburtsschäden oder angeborenen Krankheiten. Eine Vorversicherungszeit gibt es dort nicht, die Anmeldung muss spätestens zwei Monate nach der Geburt bei der SDK eingehen. Bei der Bayerischen muss ein Elternteil am Tag der Geburt schon mindestens drei Monate dort versichert sein. Das Kind kann höchstens so umfassend versichert werden wie der besser versicherte Elternteil. Soll es SP1 bekommen, braucht ein Elternteil selbst SP1.',
        },
        {
          type: 'paragraph',
          text: 'Das Gesetz regelt die Nachversicherung für Neugeborene und für Adoptivkinder, die noch minderjährig sind (§ 198 Abs. 2 VVG). Für ältere Kinder läuft der normale Antrag, bei SP1 und SP2 mit Gesundheitsfragen im Antrag.',
        },
      ],
    },
    {
      id: 'tarife',
      heading: 'Welcher Klinik-Tarif passt für Kinder?',
      blocks: [
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Klinik-Tarife der SDK und der Bayerischen für Kinder laut healio.de/stationaer, Stand 07.10.2026',
          head: ['Tarif', 'Was die Produktseite für Kinder nennt', 'Beitrag fürs Kind'],
          rows: [
            ['SDK SP1, Klinik 1-Bett', 'Ein- oder Zweibettzimmer und privatärztliche Behandlung bei Krankheit und Unfall, Rooming-in für versicherte Kinder unter 16 Jahren', 'nennt die Produktseite für Kinder nicht'],
            ['SDK SP2, Klinik 2-Bett', 'Zweibettzimmer und privatärztliche Behandlung bei Krankheit und Unfall, Rooming-in für versicherte Kinder unter 16 Jahren', 'nennt die Produktseite für Kinder nicht'],
            ['SDK SPU, Klinik bei Unfall', 'Ein- oder Zweibettzimmer und privatärztliche Behandlung ausschließlich nach einem Unfall, kein allgemeiner Kinder-Klinikschutz', 'nennt die Produktseite für Kinder nicht'],
            ['Bayerische Komfort und Prestige', 'Unterkunft und Verpflegung der Begleitperson zu 100 Prozent, soweit die Kasse sie nicht trägt, wenn das Kind unter 16 ist', 'bis 15 Jahre: Komfort 3,20 EUR, Prestige 4,10 EUR im Monat'],
          ],
          note: 'Quelle: healio.de/stationaer, abgerufen am 07.10.2026. Leistungen gelten im tariflich vereinbarten Umfang. SP1 und SP2 enthalten Gesundheitsfragen im Antrag, SPU gilt ausschließlich für unfallbedingte Behandlungen. Verbindlich sind die Tarifbedingungen.',
        },
        {
          type: 'costCard',
          title: 'Kind im Krankenhaus: wer was trägt, ein Überblick',
          icon: 'calculator',
          tariffLabel: 'Aufgestellt nach Gesetz und Produktseite. Die Tarife gelten, wenn das Kind schon vor dem Versicherungsfall versichert ist und die Voraussetzungen von § 198 VVG oder des normalen Antrags erfüllt waren.',
          caption: 'Kostenkarte: Kind im Krankenhaus mit und ohne Klinik-Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Kind unter 9 Jahren, ein Elternteil bleibt im Krankenhaus', 'die Behandlung und die Begleitperson ohne ärztliche Bescheinigung', 'keine Zuzahlung für das Kind, für die Begleitperson fällt keine an', 'Rooming-in für versicherte Kinder unter 16 Jahren laut Produktseite'],
            ['Kind mit 12 Jahren, Begleitung gewünscht', 'die Begleitperson in der Regel nur bei medizinischer Notwendigkeit mit ärztlicher Bescheinigung', 'die Kosten der Begleitperson, wenn sie nicht notwendig ist', 'Bayerische Komfort und Prestige: Unterkunft und Verpflegung der Begleitperson zu 100 Prozent, soweit die Kasse sie nicht trägt'],
            ['Kind im Krankenhaus nach einem Unfall', 'die Behandlung im Mehrbettzimmer', 'Zimmer und Chefarzt als Wahlleistung selbst', 'SPU, SP1 und SP2 bieten Zimmer und privatärztliche Behandlung nach Unfall'],
            ['Kind im Krankenhaus wegen Krankheit', 'die Behandlung im Mehrbettzimmer', 'Zimmer und Chefarzt als Wahlleistung selbst', 'SP1 und SP2 bieten sie bei Krankheit, SPU leistet bei Krankheit nicht'],
          ],
          note: 'Überblick, keine Preisangabe. Quellen: § 11 Abs. 3 SGB V, BMG Ratgeber Krankenhaus (2022), gesund.bund.de zur Begleitperson (Stand 23.04.2026), healio.de/stationaer (abgerufen am 07.10.2026). Annahmen: Kind gesetzlich versichert, Tarif vor dem Versicherungsfall abgeschlossen. Verbindlich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Familien-Ratgeber hilft dir weiter?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Je nach Thema führt dich einer dieser Ratgeber weiter.',
        },
        {
          type: 'cards',
          heading: 'Vor der Schwangerschaft und rund um die Geburt',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'pregnancy',
              tone: 'mint',
              eyebrow: 'Baby geplant',
              title: 'Klinikschutz vor der Schwangerschaft',
              text: 'Warum der Zeitpunkt zählt, welche Wartezeit gilt und wie dein Baby später mitversichert wird.',
              to: '/ratgeber/baby-geplant-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'family',
              tone: 'sky',
              eyebrow: 'Neugeborenes',
              title: 'Neugeborenes versichern',
              text: 'Familienversicherung bei der Kasse und die Frist für die Zusatzversicherung als Checkliste.',
              to: '/ratgeber/neugeborenes-versichern',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'hospital',
              tone: 'butter',
              eyebrow: 'Geburt',
              title: 'Familienzimmer im Krankenhaus',
              text: 'Was ein Familienzimmer kostet, wer es zahlt und welche Bedingungen ein Klinikschutz stellt.',
              to: '/ratgeber/familienzimmer-krankenhaus',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'hospital',
              tone: 'sky',
              eyebrow: 'Krankenhaus',
              title: 'Krankenhaus-Ratgeber im Überblick',
              text: 'Was die Kasse im Krankenhaus zahlt, Zuzahlung, Wahlleistungen und Klinik-Tarife.',
              to: '/ratgeber/stationaere-zusatzversicherung',
              linkLabel: 'Zur Übersicht',
            },
          ],
        },
        {
          type: 'cards',
          heading: 'Schwangerschaft, Bonus und Kinder',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'bonus',
              tone: 'lavender',
              eyebrow: 'Baby',
              title: 'Babybonus Krankenkasse 2026',
              text: 'Wer wie viel zahlt, mit Fundstelle in der Satzung.',
              to: '/ratgeber/babybonus-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'pregnancy',
              tone: 'coral',
              eyebrow: 'Schwanger',
              title: 'Schwanger: welcher Zusatzschutz noch geht',
              text: 'Was bei bestehender Schwangerschaft noch möglich ist und was zu spät kommt.',
              to: '/ratgeber/schwanger-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'support',
              tone: 'mint',
              eyebrow: 'Hebamme',
              title: 'Hebamme: was die Krankenkasse zahlt',
              text: 'Hebammenhilfe, Rufbereitschaft und was du selbst zahlst.',
              to: '/ratgeber/hebamme-kosten-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'coral',
              eyebrow: 'Hebamme',
              title: 'Rufbereitschaft der Hebamme',
              text: 'Was die Pauschale ist und welche Kassen laut Satzung etwas erstatten.',
              to: '/ratgeber/hebamme-rufbereitschaft',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'document',
              tone: 'sky',
              eyebrow: 'Vor der Geburt',
              title: 'Was steht mir in der Schwangerschaft zu?',
              text: 'Kassenleistungen, Extras und Fristen im Überblick.',
              to: '/ratgeber/schwangerschaft-was-steht-mir-zu',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'glasses',
              tone: 'butter',
              eyebrow: 'Brille',
              title: 'Brille und Krankenkasse',
              text: 'Wann die Kasse zahlt und wie viel, auch für Kinder.',
              to: '/ratgeber/brille-krankenkasse',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
    {
      id: 'zeitpunkt',
      heading: 'Wann ist der richtige Zeitpunkt für den Zusatzschutz eines Kindes?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für das Neugeborene innerhalb der zwei Monate nach der Geburt, sonst vor der Behandlung. Auf der Produktseite steht: Neue Versicherungsfälle sind ab Versicherungsbeginn geschützt, bereits vorher eingetretene sind nicht versichert. Bei der SDK gibt es keine tarifliche Wartezeit. Die Bayerische kennt keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie gelten acht Monate, nach einem Unfall entfallen auch diese.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Nachversicherung ist kein Freifahrtschein.', text: 'Das Kind bekommt höchstens den Schutz des Elternteils, die Anmeldung muss binnen zwei Monaten erfolgen, und bei der Bayerischen muss ein Elternteil schon drei Monate versichert sein.' },
            { lead: 'Ältere Kinder gehen den normalen Weg.', text: 'Die Frist von zwei Monaten gilt nur für Neugeborene und minderjährige Adoptivkinder. Bei SP1 und SP2 gehören Gesundheitsfragen zum Antrag, die verbindliche Annahme erfolgt dort.' },
            { lead: 'SPU ist kein Krankheitsschutz.', text: 'Der Unfalltarif leistet ausschließlich nach einem Unfall. Bei einem Krankenhausaufenthalt wegen Krankheit leistet er nicht.' },
            { lead: 'Eine Entbindung zahlt kein Klinik-Tarif, wenn du beim Antrag schon schwanger bist.', text: 'Das steht für beide Versicherer auf der Produktseite. Für das Baby gilt die Nachversicherung mit den genannten Voraussetzungen.' },
            { lead: 'Beiträge für Kinder nennt die Seite nur teilweise.', text: 'Für die Bayerische bis 15 Jahre ja, für die SDK nicht. Deinen Beitrag siehst du im Rechner nach Eintrittsalter.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'family',
          text: 'SP2, SP1 und SPU nebeneinander: Du siehst zuerst die Unterschiede und berechnest danach deinen Beitrag.',
          label: 'Klinik-Tarife ansehen',
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK (SP1, SP2 und SPU) und der Bayerischen. Neugeborene lassen sich nach § 198 VVG nachversichern, wenn ein Elternteil am Tag der Geburt beim Versicherer versichert ist und die Anmeldung spätestens zwei Monate nach der Geburt erfolgt. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie kann ich mein Neugeborenes nachversichern?',
      answer:
        'Besteht am Tag der Geburt für mindestens einen Elternteil eine Krankenversicherung beim Versicherer, nimmt dieser das Kind ohne Risikozuschläge und Wartezeiten auf, wenn die Anmeldung spätestens zwei Monate nach der Geburt rückwirkend erfolgt. Das Kind bekommt höchstens den Schutz des Elternteils, und der Versicherer darf eine Mindestversicherungsdauer des Elternteils von bis zu drei Monaten verlangen (§ 198 VVG).',
    },
    {
      question: 'Gilt die Nachversicherung auch für ältere Kinder?',
      answer:
        'Nein. § 198 VVG regelt Neugeborene und minderjährige Adoptivkinder. Bei älteren Kindern läuft der normale Antrag, bei den SDK-Tarifen SP1 und SP2 mit Gesundheitsfragen im Antrag.',
    },
    {
      question: 'Muss ein Elternteil schon länger beim Versicherer sein?',
      answer:
        'Das hängt vom Versicherer. Bei der Bayerischen muss ein Elternteil am Tag der Geburt schon mindestens drei Monate dort versichert sein, laut Produktseite. Bei der SDK gibt es keine Vorversicherungszeit, die Anmeldung muss spätestens zwei Monate nach der Geburt eingehen.',
    },
    {
      question: 'Zahlt die Kasse die Begleitperson im Krankenhaus?',
      answer:
        'Bei Kindern unter neun Jahren ja, ohne ärztliche Bescheinigung. Bei älteren Kindern nur, wenn die Begleitung medizinisch notwendig ist und die Ärztin oder der Arzt im Krankenhaus das schriftlich bescheinigt. Für die Begleitperson fällt keine Zuzahlung an.',
    },
    {
      question: 'Was kostet ein Klinik-Tarif für mein Kind?',
      answer:
        'Für die Bayerische nennt die Produktseite bis 15 Jahre im Komfort 3,20 EUR und im Prestige 4,10 EUR im Monat. Für die SDK nennt sie keinen Kinderbeitrag, deinen Beitrag rechnest du im Beitragsrechner nach Eintrittsalter.',
    },
    {
      question: 'Zahlt die Kasse für Kinder die Brille und die Zahnspange?',
      answer:
        'Bis zum 18. Geburtstag besteht Anspruch auf Sehhilfen, nicht aber auf das Brillengestell. Eine Zahnspange zahlt die Kasse in medizinisch begründeten Fällen. Du streckst 20 Prozent vor, für das zweite Kind in Behandlung 10 Prozent, und bekommst den Anteil nach Abschluss der Behandlung im geplanten Umfang zurück. Mehrleistungen zahlst du selbst.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir oben den Ratgeber zu deinem Thema aus. Welche Klinik-Tarife es gibt, siehst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: ', was die Kasse im Krankenhaus zahlt, im ' },
      { text: 'Krankenhaus-Überblick', to: '/ratgeber/stationaere-zusatzversicherung' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Kassenleistung und Nachversicherung stammen aus Gesetz und Bundesgesundheitsministerium, die Tarifaussagen und Beiträge von der Produktseite.',
    items: [
      {
        label: 'VVG § 198 Kindernachversicherung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__198.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 10 Familienversicherung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__10.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 3 (Mitaufnahme einer Begleitperson)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 22 Individualprophylaxe und § 26 Gesundheitsuntersuchungen für Kinder und Jugendliche',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__22.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 29 Kieferorthopädische Behandlung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__29.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 33 Hilfsmittel, Absatz 2 und 4 (Sehhilfen)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__33.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Begleitperson im Krankenhaus: Anspruch und Kosten',
        publisher: 'gesund.bund.de (Bundesgesundheitsministerium)',
        href: 'https://gesund.bund.de/gesundheitsversorgung/begleitperson-im-krankenhaus',
        stand: '23.04.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Ratgeber Krankenhaus, Abschnitt 2.4.2 Befreiung von der Zuzahlung',
        publisher: 'Bundesministerium für Gesundheit',
        href: 'https://www.bundesgesundheitsministerium.de/fileadmin/user_upload/220315_148x210_BMG_Ratgeber-Krankenhaus_bf.pdf',
        stand: 'Ausgabe 2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Klinik-Tarife SDK (SP1, SP2, SPU) und Bayerische, Produktseite von Healio',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/stationaer',
        stand: '07.10.2026',
        accessedAt: '07.10.2026',
        note: 'Leistungen, Beiträge, Nachversicherung und Wartezeiten wortgleich mit der Seite healio.de/stationaer',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Produktseite. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
