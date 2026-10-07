/**
 * Krankenhaus-Ratgeber (Serie, Stapel krankenhaus-familie), Bereichsseite:
 * Stationäre Zusatzversicherung, was die Kasse im Krankenhaus zahlt und was du
 * selbst zahlst. Wird als letzte Seite des Feldes geschrieben, mit Karten auf
 * alle Seiten des Feldes aus Welle A und die bestehenden Ratgeber.
 *
 * Quellen (Belege in stationaere-zusatzversicherung.belege.md, Abruf 07.10.2026):
 * SGB V § 39, § 11 Abs. 3, KHEntgG § 2 und § 17, BMG Ratgeber Krankenhaus (2022),
 * gesund.bund.de (Begleitperson im Krankenhaus, Stand 23.04.2026),
 * Verbraucherzentrale (19.08.2025), SGB V § 62, GKV-Beitragssatzstabilisierungsgesetz
 * (BGBl. 2026 I Nr. 228, Art. 1 Nr. 23 und Art. 8 Abs. 2). Zimmerpreise nur als
 * Verweis auf die datierten Beispiele im Ratgeber einzelzimmer-krankenhaus-kosten.
 * Tarifaussagen nur wie auf healio.de/stationaer (live 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Keine eigenen Preise auf der Bereichsseite, nur Verweise und die Zuzahlung.
 *   - Rooming-in unter 16: nach Produktseite für versicherte Kinder (SDK) und
 *     Begleitperson bei der Bayerischen im Komfort und im Prestige.
 *   - Entbindung: Wer beim Antrag schon schwanger ist, bekommt diese Entbindung
 *     von keinem Klinik-Tarif gezahlt (Produktseite). Die Seite sagt das offen.
 *   - Keine Seiten der Wellen B und C verlinkt (Chefarztbehandlung, Vergleich,
 *     Kosten, ohne Wartezeit, Begleitperson, Kassen-Seiten, Kinder, Vorerkrankung,
 *     Senioren), weil sie noch nicht existieren.
 *   - Kein Testsieger, kein Siegel, keine Behandlungsempfehlung.
 *   - Einbau 07.10.2026: Link und Karte auf krankenhaus-zuzahlung-2027 bis zum
 *     Einbau des Anlass-Ratgebers entfernt (serie/NACHZUTRAGEN.md).
 */

export const article = {
  slug: 'stationaere-zusatzversicherung',
  kind: 'ratgeber',
  group: 'krankenhaus',

  metaTitle: 'Stationäre Zusatzversicherung: Krankenhaus-Ratgeber | Healio',
  metaDescription:
    'Was die Kasse im Krankenhaus zahlt, was Wahlleistungen kosten und was eine stationäre Zusatzversicherung ergänzt, mit Wegweiser zu allen Krankenhaus-Ratgebern.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Stationäre Zusatzversicherung: was die Kasse im Krankenhaus zahlt und was du selbst zahlst',
  listTeaser:
    'Der Überblick zum Krankenhaus: Kassenleistung, Zuzahlung, Wahlleistungen, Klinik-Tarife und der Weg zu jedem Krankenhaus-Ratgeber.',

  headline: 'Stationäre Zusatzversicherung: was die Kasse im Krankenhaus zahlt und was du selbst zahlst',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'hospital',
    facts: [
      { value: '10 EUR je Tag', label: 'gesetzliche Zuzahlung, höchstens 28 Tage im Jahr' },
      { value: 'Zimmer und Chefarzt', label: 'zahlt die Kasse nur bei medizinischer Erforderlichkeit' },
      { value: 'Vor der Behandlung', label: 'ein Tarif gilt nur für neue Versicherungsfälle' },
    ],
    text: 'Die Kasse zahlt im Krankenhaus die medizinisch notwendige Versorgung. Einbett- oder Zweibettzimmer und Chefarztbehandlung sind Wahlleistungen, die du sonst selbst zahlst. Eine stationäre Zusatzversicherung ergänzt sie.',
    path: { to: '/stationaer', text: 'Zimmer, Chefarzt, Klinikwahl im Tarifvergleich', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Im Krankenhaus zahlt die gesetzliche Kasse die medizinisch notwendige Versorgung, du zahlst 10 EUR Zuzahlung je Tag. Alles, was darüber hinausgeht, etwa das Einbettzimmer oder die Behandlung durch den Chefarzt, ist eine Wahlleistung, die du gesondert vereinbarst. Eine stationäre Zusatzversicherung deckt solche Wahlleistungen ab. Diese Seite ordnet das und führt dich zum passenden Krankenhaus-Ratgeber.',

  sections: [
    {
      id: 'kasse-zahlt',
      heading: 'Was zahlt die gesetzliche Krankenkasse im Krankenhaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Kasse zahlt alle Leistungen, die im Einzelfall nach Art und Schwere der Krankheit für deine medizinische Versorgung im Krankenhaus notwendig sind, dazu gehören ärztliche Behandlung, Krankenpflege, Arznei-, Heil- und Hilfsmittel sowie Unterkunft und Verpflegung (§ 39 Abs. 1 SGB V). Das Gesetz nennt das allgemeine Krankenhausleistungen (§ 2 Abs. 2 KHEntgG).',
        },
        {
          type: 'paragraph',
          text: 'Soweit es medizinisch erforderlich ist, können darunter auch die Unterbringung im Einzelzimmer, die Behandlung durch die Chefärztin oder den Chefarzt oder die Aufnahme einer Begleitperson fallen, so beschreibt es das Bundesgesundheitsministerium. Ohne diese Notwendigkeit sind Einzelzimmer und Chefarzt Wahlleistungen.',
        },
        {
          type: 'paragraph',
          text: 'Beteiligen musst du dich mit der Zuzahlung. Wer das 18. Lebensjahr vollendet hat, zahlt 10 EUR je Kalendertag der vollstationären Behandlung, längstens für 28 Tage im Kalenderjahr (§ 39 Abs. 4 SGB V). Das sind höchstens 280 EUR. Kinder und Jugendliche unter 18 und Schwangere, die zur Entbindung ins Krankenhaus kommen, zahlen nichts. Darüber hinaus schützt dich die Belastungsgrenze von 2 Prozent der Bruttoeinnahmen, bei schwerwiegend chronisch Kranken 1 Prozent.',
        },
        {
          type: 'paragraph',
          text: 'Ab 01.01.2027 sind es im Krankenhaus 15 statt 10 EUR je Kalendertag, so steht es im neu gefassten § 61 SGB V (GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228).',
        },
      ],
    },
    {
      id: 'wahlleistungen',
      heading: 'Was sind Wahlleistungen im Krankenhaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wahlleistungen sind Leistungen, die über die allgemeinen Krankenhausleistungen hinausgehen und gesondert berechnet werden dürfen, wenn du sie mit dem Krankenhaus vereinbarst (§ 17 Abs. 1 KHEntgG). Zwei Beispiele sind die Unterbringung im Ein- oder Zweibettzimmer und die wahlärztliche Behandlung durch die leitenden Krankenhausärzte.',
        },
        {
          type: 'paragraph',
          text: 'Du vereinbarst sie vor der Erbringung schriftlich, und das Krankenhaus muss dich vorher schriftlich über die Entgelte und deren Inhalt unterrichten (§ 17 Abs. 2 KHEntgG). Die Unterkunft darf nicht von einer Vereinbarung über ärztliche Wahlleistungen abhängig gemacht werden (§ 17 Abs. 4 KHEntgG). Du bist selbst Vertragspartner des Krankenhauses, unabhängig von deinem Versicherungsstatus, und musst zunächst selbst zahlen. Die Berechnung der ärztlichen Wahlleistungen richtet sich nach der Gebührenordnung für Ärzte (GOÄ), die Kliniken legen die nichtärztlichen Entgelte selbst fest.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was ein Einbettzimmer pro Tag kosten kann, zeigt der Ratgeber ' },
            { text: 'Einzelzimmer im Krankenhaus: Kosten pro Tag', to: '/ratgeber/einzelzimmer-krankenhaus-kosten' },
            { text: ' mit Beispielen aus datierten Preislisten.' },
          ],
        },
      ],
    },
    {
      id: 'uebersicht',
      heading: 'Wer trägt was bei einem Krankenhausaufenthalt?',
      blocks: [
        {
          type: 'costCard',
          title: 'Krankenhaus: wer was trägt, im Überblick',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der gesetzlichen Zuzahlung von 10 EUR je Kalendertag und den SDK-Klinik-Tarifen nach der Produktseite. Tarifleistungen gelten im tariflich vereinbarten Umfang. Der Vertrag besteht schon, bevor der Aufenthalt feststeht.',
          caption: 'Kostenkarte: Krankenhausaufenthalt mit und ohne Klinik-Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Medizinisch notwendige Behandlung im Mehrbettzimmer', 'die Behandlung, bis auf die Zuzahlung', 'Zuzahlung 10 EUR je Tag, höchstens 28 Tage, also bis zu 280 EUR im Jahr', 'SP1 übernimmt die gesetzliche Zuzahlung von 10 EUR je Kliniktag'],
            ['Einbettzimmer als Wahlleistung', 'das Zimmer nur bei medizinischer Erforderlichkeit', 'Zimmerpreis des Hauses, in den Beispielen 71 bis 210 EUR je Berechnungstag', 'SP1 bietet Ein- oder Zweibettzimmer, SP2 das Zweibettzimmer'],
            ['Behandlung durch den Chefarzt als Wahlleistung', 'sie nur bei medizinischer Erforderlichkeit', 'Arzthonorar nach der GOÄ, gesondert berechnet', 'privatärztliche Behandlung, in den SDK-Tarifen nicht auf die GOÄ-Höchstsätze begrenzt'],
            ['Kind unter 9 Jahren im Krankenhaus, ein Elternteil bleibt', 'die Begleitperson ohne ärztliche Bescheinigung', 'keine Zuzahlung für die Begleitperson', 'Rooming-in für versicherte Kinder unter 16 Jahren'],
            ['Entbindung, du bist beim Antrag schon schwanger', 'die medizinisch notwendige Versorgung, eine Zuzahlung entfällt', 'was über die Kassenleistung hinausgeht', 'Der Tarif zahlt diese Entbindung nicht'],
            ['Stationäre Reha nach dem Krankenhaus', 'Rentenversicherung oder Krankenkasse', 'Zuzahlung 10 EUR je Tag, Dauer und Befreiung je Träger verschieden', 'Zur Reha-Zuzahlung macht die Produktseite keine Angabe'],
          ],
          note: 'Überblick, keine Preisangabe. Quellen: § 39 und § 11 Abs. 3 SGB V, § 2 und § 17 KHEntgG, BMG Ratgeber Krankenhaus, gesund.bund.de zur Begleitperson (Stand 23.04.2026), Zimmerbeispiele aus dem Ratgeber Einzelzimmer im Krankenhaus mit Stand je Preisliste. Tarife nach healio.de/stationaer, abgerufen am 07.10.2026. Annahmen: gesetzlich versichert, Erwachsener, Tarif schon vor dem Versicherungsfall abgeschlossen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was zahlt eine stationäre Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die stationäre Zusatzversicherung ergänzt, was die Kasse nicht zahlt. Nach der Verbraucherzentrale kann ein Kassenpatient damit nahezu die gleichen Leistungen wie ein Privatpatient versichern: die Wahl der Klinik, die Behandlung durch den Chefarzt und ein Ein- oder Zweibett- statt eines Mehrbettzimmers. Was ein Tarif genau erstattet, regeln seine Bedingungen. Vor dem Abschluss lohnt es sich nach der Verbraucherzentrale zu prüfen, bis zu welcher Höhe ärztliche Honorare erstattet werden.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Klinik-Tarife auf healio.de/stationaer im Überblick, Stand 07.10.2026',
          head: ['Tarif', 'Wofür er steht', 'Beispielbeitrag, 30 Jahre'],
          rows: [
            ['SDK Klinik 2-Bett (SP2)', 'Zweibettzimmer und privatärztliche Behandlung bei Krankheit und Unfall', '33,41 EUR im Monat'],
            ['SDK Klinik 1-Bett (SP1)', 'Ein- oder Zweibettzimmer, privatärztliche Behandlung, Zuzahlung je Kliniktag, Familienzimmer bei der Entbindung', '50,72 EUR im Monat'],
            ['SDK Klinik bei Unfall (SPU)', 'Ein- oder Zweibettzimmer und privatärztliche Behandlung ausschließlich nach einem Unfall', '7,00 EUR im Monat'],
            ['Bayerische Prestige, Komfort, Smart', 'Chef- und Privatärzte im Komfort und im Prestige auch über den GOÄ-Höchstsätzen', 'Komfort 10,20 EUR, Prestige 13,40 EUR im Monat mit 21 bis 30 Jahren (Stand 09/2026)'],
          ],
          note: 'Quelle: healio.de/stationaer, abgerufen am 07.10.2026. Beitragsbeispiele, der persönliche Beitrag hängt insbesondere vom Eintrittsalter ab. SP1 und SP2 enthalten Gesundheitsfragen im Antrag, SPU gilt ausschließlich für unfallbedingte Behandlungen. Verbindlich sind die Tarifbedingungen.',
        },
        {
          type: 'paragraph',
          text: 'Bei der SDK gibt es in den Klinik-Tarifen keine tarifliche Wartezeit. Die Bayerische kennt keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie gelten acht Monate, nach einem Unfall entfallen auch diese.',
        },
      ],
    },
    {
      id: 'wegweiser',
      heading: 'Welcher Krankenhaus-Ratgeber hilft dir weiter?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Je nach Frage führt dich einer dieser Ratgeber weiter.',
        },
        {
          type: 'cards',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'protection',
              tone: 'lavender',
              eyebrow: 'Dir ist das Zimmer wichtig',
              title: 'Einzelzimmer-Zusatzversicherung',
              text: 'Was sie leistet, was sie im Monat kostet und wo ihre Grenzen liegen.',
              to: '/ratgeber/zusatzversicherung-einzelzimmer',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'money',
              tone: 'butter',
              eyebrow: 'Du fragst nach dem Preis',
              title: 'Einzelzimmer im Krankenhaus: Kosten',
              text: 'Preise pro Tag aus sechs Preislisten und wer das Zimmer zahlt.',
              to: '/ratgeber/einzelzimmer-krankenhaus-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'hospital',
              tone: 'mint',
              eyebrow: 'Tagegeld',
              title: 'Krankenhaustagegeld',
              text: 'Wie hoch, wie lange und was bei Reha gilt.',
              to: '/ratgeber/krankenhaustagegeld',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'medication',
              tone: 'sky',
              eyebrow: 'Reha',
              title: 'Zuzahlung bei der Reha',
              text: 'Rentenversicherung und Krankenkasse getrennt, mit Befreiung und Höchstdauer.',
              to: '/ratgeber/reha-zuzahlung',
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
              icon: 'family',
              tone: 'mint',
              eyebrow: 'Kinder und Familie',
              title: 'Zusatzversicherung für Kinder',
              text: 'Kinder nachversichern, Krankenhaus, Zahn und Brille im Überblick.',
              to: '/ratgeber/zusatzversicherung-kinder',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
    {
      id: 'kinder',
      heading: 'Was gilt für Kinder und Begleitpersonen im Krankenhaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der stationären Behandlung eines versicherten Kindes, das das neunte Lebensjahr noch nicht vollendet hat, wird die Notwendigkeit der Mitaufnahme einer Begleitperson aus medizinischen Gründen unwiderlegbar vermutet (§ 11 Abs. 3 SGB V). Eine ärztliche Bescheinigung ist dann nicht nötig. Bei älteren Kindern übernehmen die Kassen die Kosten, wenn die Begleitung medizinisch notwendig ist und die Ärztin oder der Arzt im Krankenhaus das bescheinigt (gesund.bund.de). Für die Begleitperson fällt keine Zuzahlung an.',
        },
        {
          type: 'paragraph',
          text: 'Ein Klinik-Tarif kann hier etwas ergänzen. Auf der Produktseite stehen Rooming-in für versicherte Kinder unter 16 Jahren bei der SDK und bei der Bayerischen die Unterkunft und Verpflegung der Begleitperson zu 100 Prozent, soweit die Kasse sie nicht trägt, wenn das Kind unter 16 ist. Der SDK-Tarif SPU ist kein allgemeiner Kinder-Klinikschutz, er leistet nur nach einem Unfall.',
        },
      ],
    },
    {
      id: 'zeitpunkt',
      heading: 'Wann ist der richtige Zeitpunkt für einen Klinik-Tarif?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Vor der Behandlung. Neue Versicherungsfälle sind ab Versicherungsbeginn geschützt, bereits vorher eingetretene Versicherungsfälle sind nicht versichert. Das steht so auf der Produktseite. Für einen Aufenthalt, der schon feststeht, hilft ein neuer Tarif also nicht.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Kasse zahlt die Behandlung, der Tarif nur die Extras.', text: 'Ein Klinik-Tarif ersetzt nicht die gesetzliche Krankenversicherung. Er ergänzt Zimmer, privatärztliche Behandlung und Klinikwahl.' },
            { lead: 'Eine Entbindung zahlt kein Klinik-Tarif, wenn du beim Antrag schon schwanger bist.', text: 'Das steht für beide Versicherer auf der Produktseite. Bei der Bayerischen gelten für spätere Entbindungen im Komfort und im Prestige acht Monate Wartezeit.' },
            { lead: 'Nicht jeder kommt in den Tarif.', text: 'SP1 und SP2 enthalten Gesundheitsfragen im Antrag, die verbindliche Annahme erfolgt dort. SPU leistet ausschließlich nach einem Unfall.' },
            { lead: 'Reha ist ein eigenes Thema.', text: 'Zur Reha-Zuzahlung macht die Produktseite keine Angabe, die Regeln der Rentenversicherung und der Kasse stehen im Ratgeber zur Reha-Zuzahlung.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'hospital',
          text: 'SP2, SP1 und SPU nebeneinander: Du siehst zuerst die Unterschiede und berechnest danach deinen Beitrag.',
          label: 'Klinik-Tarife ansehen',
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK (SP1, SP2 und SPU) und der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was ist eine stationäre Zusatzversicherung?',
      answer:
        'Eine stationäre Zusatzversicherung, auch Krankenhauszusatzversicherung genannt, ergänzt die gesetzliche Krankenkasse im Krankenhaus. Der Tarif erstattet Wahlleistungen wie das Ein- oder Zweibettzimmer und die privatärztliche Behandlung. Die medizinisch notwendige Behandlung zahlt weiter die Kasse.',
    },
    {
      question: 'Was zahle ich im Krankenhaus als Kassenpatient selbst?',
      answer:
        'Die gesetzliche Zuzahlung von 10 EUR je Kalendertag, längstens für 28 Tage im Kalenderjahr, wenn du 18 oder älter bist. Dazu kommen Wahlleistungen wie Einzelzimmer oder Chefarztbehandlung, wenn du sie vereinbarst und sie nicht medizinisch erforderlich sind.',
    },
    {
      question: 'Zahlt die Kasse das Einzelzimmer oder den Chefarzt?',
      answer:
        'Nur wenn es medizinisch erforderlich ist, dann gehören sie zu den allgemeinen Krankenhausleistungen. Sonst sind sie Wahlleistungen, die du gesondert vereinbarst und zunächst selbst zahlst.',
    },
    {
      question: 'Welche Klinik-Tarife gibt es bei Healio?',
      answer:
        'Auf healio.de/stationaer stehen die SDK-Tarife Klinik 2-Bett (SP2), Klinik 1-Bett (SP1) und Klinik bei Unfall (SPU) sowie die Tarife Prestige, Komfort und Smart der Bayerischen. Die Leistungen gelten im tariflich vereinbarten Umfang.',
    },
    {
      question: 'Gibt es Wartezeiten?',
      answer:
        'Bei der SDK gibt es in den Klinik-Tarifen keine tarifliche Wartezeit. Die Bayerische kennt keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie gelten acht Monate, nach einem Unfall entfallen sie. Bereits eingetretene Versicherungsfälle sind nicht versichert.',
    },
    {
      question: 'Zahlt ein Klinik-Tarif die Entbindung?',
      answer:
        'Nicht, wenn du beim Antrag schon schwanger bist. Das steht für beide Versicherer auf der Produktseite. Bei späteren Entbindungen gelten bei der Bayerischen im Komfort und im Prestige acht Monate Wartezeit.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Such dir oben den Ratgeber zu deiner Frage aus. Welche Klinik-Tarife es gibt und was sie unterscheidet, siehst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Was die Zuzahlung bei einer Reha bedeutet, steht im Ratgeber ' },
      { text: 'Zuzahlung bei der Reha', to: '/ratgeber/reha-zuzahlung' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Kassenleistung und Wahlleistungen stammen aus Gesetz und Bundesgesundheitsministerium, die Einordnung von der Verbraucherzentrale, die Tarifaussagen von der Produktseite.',
    items: [
      {
        label: 'SGB V § 39 Krankenhausbehandlung',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__39.html',
        stand: 'Fassung vor dem 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 11 Leistungsarten, Absatz 3',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'KHEntgG § 2 Krankenhausleistungen und § 17 Wahlleistungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/khentgg/__17.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Ratgeber Krankenhaus, Abschnitte 2.4 und 4.1.2',
        publisher: 'Bundesministerium für Gesundheit',
        href: 'https://www.bundesgesundheitsministerium.de/fileadmin/user_upload/220315_148x210_BMG_Ratgeber-Krankenhaus_bf.pdf',
        stand: 'Ausgabe 2022',
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
        label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung: Sinnvoll oder nicht?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425',
        stand: '19.08.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 62 Belastungsgrenze',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__62.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228, Art. 1 Nr. 23 (§ 61 SGB V neu) und Art. 8 Abs. 2',
        publisher: 'Bundesgesetzblatt',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026, verkündet am 29.07.2026',
        accessedAt: '07.10.2026',
        note: '15 EUR je Kalendertag bei stationären Maßnahmen ab 01.01.2027',
      },
      {
        label: 'Klinik-Tarife SDK (SP1, SP2, SPU) und Bayerische, Produktseite von Healio',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/stationaer',
        stand: '07.10.2026',
        accessedAt: '07.10.2026',
        note: 'Leistungen, Beitragsbeispiele und Wartezeiten wortgleich mit der Seite healio.de/stationaer',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Produktseite. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
