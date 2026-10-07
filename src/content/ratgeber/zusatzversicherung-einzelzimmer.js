/**
 * Krankenhaus-Ratgeber (Serie, Stapel krankenhaus-familie), Seite:
 * Zusatzversicherung Krankenhaus Einzelzimmer, was sie leistet und was sie kostet.
 *
 * Quellen (Belege je Zahl und Aussage in zusatzversicherung-einzelzimmer.belege.md,
 * Abruf 07.10.2026): Verbraucherzentrale (Stand 19.08.2025), BMG Ratgeber
 * Krankenhaus (2022), KHEntgG § 17. Preisbeispiele für Zimmer aus den datierten
 * Preislisten Mainz (Stand 01.01.2026) und Hochsauerland (Stand 2026), die der
 * Ratgeber einzelzimmer-krankenhaus-kosten ausweist (Preise am 07.10.2026 gegen
 * die PDFs geprüft; die Düsseldorfer Liste von 2019 ist gestrichen).
 * Tarifaussagen nur wie auf healio.de/stationaer (live 07.10.2026; Texte aus
 * src/i18n/locales/de/stationaer.json unter "refresh" und den Komponenten unter
 * src/components/sections/stationaer): SDK SP1, SP2, SPU und Bayerische
 * Prestige, Komfort, Smart, Wartezeiten laut Commit ae8eebe.
 *
 * Bewusste Grenzen:
 *   - Zimmer der Bayerischen: Die Produktseite nennt für Prestige, Komfort und
 *     Smart kein Ein- oder Zweibettzimmer, deshalb steht es hier nicht.
 *   - Wechseloption SP2 auf SP1, Höchstaufnahmealter und Ersatz-Krankenhaus-
 *     tagegeld stehen nicht auf der Live-Seite und werden nicht erwähnt.
 *   - SPU: Die Formulierung zur Gesundheitsprüfung wird nicht übernommen
 *     (Sperrwort-Regel), die Seite sagt "ausschließlich nach einem Unfall".
 *   - Keine Marktpreise für Beiträge anderer Versicherer, keine Testurteile.
 *   - Entbindung: wer beim Antrag schon schwanger ist, bekommt diese Entbindung
 *     von keinem Klinik-Tarif gezahlt (Produktseite).
 *   - Bonus nie als Geld: Der Kassenbonus kann den Beitrag als zweckgebundener
 *     Zuschuss mittragen, höchstens bis zum nachgewiesenen Beitrag.
 */

export const article = {
  slug: 'zusatzversicherung-einzelzimmer',
  kind: 'ratgeber',
  group: 'krankenhaus',

  metaTitle: 'Zusatzversicherung Krankenhaus Einzelzimmer: Leistungen | Healio',
  metaDescription:
    'Zusatzversicherung fürs Einzelzimmer im Krankenhaus: Was SDK SP1, SP2 und SPU leisten, was sie im Monat kosten und worauf du bei Wartezeit und Klinikwahl achtest.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Zusatzversicherung Krankenhaus Einzelzimmer: was sie leistet und kostet',
  listTeaser:
    'Was eine Zusatzversicherung fürs Einzelzimmer im Krankenhaus leistet, welche Tarife es gibt, was sie im Monat kosten und wo ihre Grenzen liegen.',

  headline: 'Zusatzversicherung Krankenhaus Einzelzimmer: was sie leistet und was sie kostet',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'hospital',
    facts: [
      { value: 'Ein- oder Zweibett', label: 'Zimmer im SDK-Tarif Klinik 1-Bett (SP1), im SP2 nur Zweibett' },
      { value: '33,41 EUR im Monat', label: 'Beispielbeitrag SP2 für 30-Jährige, SP1 50,72 EUR' },
      { value: 'Ohne Wartezeit', label: 'bei der SDK, Bayerische nur 8 Monate für Entbindung und Psychotherapie' },
    ],
    text: 'Eine Zusatzversicherung fürs Einzelzimmer ergänzt das, was die Kasse im Krankenhaus nicht zahlt: das Einbett- oder Zweibettzimmer, die Behandlung durch den Chefarzt und die freie Klinikwahl. Was genau erstattet wird, hängt vom Tarif ab.',
    path: { to: '/stationaer', text: 'Zimmer wählen, Beitrag berechnen', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Eine Zusatzversicherung fürs Einzelzimmer im Krankenhaus zahlt die Wahlleistung Unterkunft, die du sonst selbst tragen würdest, und meist noch mehr: privatärztliche Behandlung und freie Klinikwahl. Auf dieser Seite siehst du, was die Klinik-Tarife der SDK und der Bayerischen auf healio.de/stationaer leisten, was sie im Monat kosten und worauf du bei Wartezeit, Klinikwahl und Gesundheitsfragen achten solltest.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was leistet eine Zusatzversicherung für das Einzelzimmer im Krankenhaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Zusatzversicherung ergänzt, was die gesetzliche Kasse im Krankenhaus nicht zahlt. Die Kasse übernimmt die medizinisch notwendige Versorgung, in der Regel im nächstgelegenen Krankenhaus und im Mehrbettzimmer. Mit einer Zusatzversicherung kann ein Kassenpatient nach Angabe der Verbraucherzentrale nahezu die gleichen Leistungen wie ein Privatpatient versichern: die Wahl der Klinik, die Behandlung durch den Chefarzt und ein Ein- oder Zweibett- statt eines Mehrbettzimmers.',
        },
        {
          type: 'paragraph',
          text: 'Auf healio.de/stationaer sind das konkret die SDK-Tarife Klinik 2-Bett (SP2), Klinik 1-Bett (SP1) und Klinik bei Unfall (SPU) sowie die Tarife Prestige, Komfort und Smart der Bayerischen. Die gesetzliche Kasse bleibt dabei unverändert, du wechselst nicht in die private Krankenversicherung.',
        },
      ],
    },
    {
      id: 'tarife',
      heading: 'Welcher Tarif bietet welches Zimmer?',
      blocks: [
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Die SDK-Klinik-Tarife auf healio.de/stationaer im Überblick, Stand 07.10.2026',
          head: ['Tarif', 'Zimmer und Anlass', 'Beispielbeitrag, 30 Jahre'],
          rows: [
            ['SP2, Klinik 2-Bett', 'Zweibettzimmer und privatärztliche Behandlung bei Krankheit und Unfall', '33,41 EUR im Monat'],
            ['SP1, Klinik 1-Bett', 'Ein- oder Zweibettzimmer und privatärztliche Behandlung bei Krankheit und Unfall, Familienzimmer bei der Entbindung', '50,72 EUR im Monat'],
            ['SPU, Klinik bei Unfall', 'Ein- oder Zweibettzimmer und privatärztliche Behandlung ausschließlich nach einem Unfall', '7,00 EUR im Monat'],
          ],
          note: 'Quelle: healio.de/stationaer, abgerufen am 07.10.2026. Beitragsbeispiele gelten für 30-Jährige, der persönliche Beitrag hängt insbesondere vom Eintrittsalter ab. Leistungen gelten im tariflich vereinbarten Umfang. SP1 und SP2 enthalten Gesundheitsfragen im Antrag. Verbindlich sind die Tarifbedingungen.',
        },
        {
          type: 'paragraph',
          text: 'Die Bayerische bietet die Tarife Prestige, Komfort und Smart. Mit 21 bis 30 Jahren zahlst du im Komfort 10,20 EUR und im Prestige 13,40 EUR im Monat, mit 31 bis 45 im Prestige 17,60 EUR (Stand 09/2026). Der Beitrag steigt, wenn du in die nächste Altersgruppe kommst. Im Komfort und im Prestige zahlt die Bayerische im Krankenhaus die Rechnungen von Chef- und Privatärzten auch über den Höchstsätzen der Gebührenordnung für Ärzte.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine Zusatzversicherung für das Einzelzimmer im Monat?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Beitrag hängt vom Eintrittsalter und vom Tarif ab. Für 30-Jährige nennt die Produktseite als Beispiel 7,00 EUR im Monat für den Unfalltarif SPU, 33,41 EUR für SP2 und 50,72 EUR für SP1. Bei der Bayerischen sind es mit 21 bis 30 Jahren 10,20 EUR im Komfort und 13,40 EUR im Prestige. Für Kinder bis 15 Jahre nennt die Seite im Komfort 3,20 EUR und im Prestige 4,10 EUR im Monat.',
        },
        {
          type: 'paragraph',
          text: 'Neutrale Marktdurchschnitte für Beiträge liegen uns nicht vor, deshalb nennen wir nur die Werte der Produktseite. Die Verbraucherzentrale weist darauf hin, dass die Tarife bei einem Neuabschluss mit zunehmendem Alter steigen und dass Zusatzversicherungen fürs Krankenhaus häufig nur bis unter 65 abgeschlossen werden können. Zum Höchstaufnahmealter macht die Produktseite keine Angabe.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie viel das Zimmer ohne Tarif kostet, hängt vom Krankenhaus ab. Beispiele aus datierten Preislisten stehen im Ratgeber ' },
            { text: 'Einzelzimmer im Krankenhaus: Kosten pro Tag', to: '/ratgeber/einzelzimmer-krankenhaus-kosten' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'wartezeit',
      heading: 'Gibt es eine Wartezeit, und gilt der Schutz für geplante Aufenthalte?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der SDK gibt es in den Klinik-Tarifen keine tarifliche Wartezeit, neue Versicherungsfälle sind ab Versicherungsbeginn geschützt. Die Bayerische kennt keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie gelten acht Monate, nach einem Unfall entfallen auch diese. Die Verbraucherzentrale nennt bei einem Abschluss ohne Zutun der Kasse drei Monate Wartezeit als üblich und acht Monate bei der Entbindung im Krankenhaus.',
        },
        {
          type: 'paragraph',
          text: 'Ein geplanter Aufenthalt ist damit trotzdem nicht versichert, wenn der Versicherungsfall schon eingetreten ist. Auf der Produktseite steht: Bereits vorher eingetretene Versicherungsfälle sind nicht versichert. Wer ein Einzelzimmer für eine bekannte Operation möchte, kommt mit einem neuen Tarif zu spät.',
        },
      ],
    },
    {
      id: 'klinikwahl',
      heading: 'Zahlt die Zusatzversicherung auch Privatkliniken und Chefarzthonorare?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale nennt drei Punkte, die du vor dem Abschluss prüfen solltest: die Wahl der Klinik, die Höhe der ärztlichen Honorare und den Umgang mit Privatkliniken. Die Tabelle stellt ihre Hinweise der Produktseite von Healio gegenüber.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Prüfpunkte der Verbraucherzentrale und was die Produktseite von Healio dazu sagt',
          head: ['Prüfpunkt', 'Verbraucherzentrale', 'Produktseite von Healio'],
          rows: [
            ['Ärztliche Honorare', 'In der Regel bis zum 3,5-fachen Satz der Gebührenordnung für Ärzte, einige Versicherer ohne Begrenzung.', 'SDK: Erstattung in den Klinik-Tarifen nicht auf die GOÄ-Höchstsätze begrenzt. Bayerische Komfort und Prestige: auch über den Höchstsätzen.'],
            ['Privatklinik', 'Viele Versicherer übernehmen keine Behandlungskosten in einer Privatklinik, wenn kein Vertragsverhältnis mit der Kasse besteht.', 'Freie Klinikwahl, auch Fachklinik. In einer Privatklinik zahlt der Tarif die Kosten über dem Satz eines zugelassenen Krankenhauses, wenn deine Kasse diesen Satz übernimmt. Sonst trägst du die allgemeinen Krankenhauskosten selbst.'],
            ['Wartezeit', 'Bei Abschluss ohne Zutun der Kasse üblich drei Monate, bei Entbindung im Krankenhaus acht.', 'SDK ohne Wartezeit, Bayerische keine allgemeine, acht Monate nur für Entbindung und Psychotherapie.'],
            ['Gesundheitsprüfung', 'Fast ausnahmslos erforderlich, Fragen wahrheitsgemäß beantworten.', 'SP1 und SP2 mit Gesundheitsfragen im Antrag, SPU nur nach Unfall. Die verbindliche Annahme erfolgt erst im Antrag.'],
          ],
          note: 'Quellen: Verbraucherzentrale, Zusatzversicherungen zur gesetzlichen Krankenversicherung, Stand 19.08.2025, und healio.de/stationaer, abgerufen am 07.10.2026. Die Auflistung ist eine Gegenüberstellung, kein Test und keine Wertung.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Was bleibt an dir hängen, mit und ohne Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Karte rechnet drei Aufenthalte mit je fünf Berechnungstagen. Die Zimmerpreise sind zwei Beispiele aus dem Ratgeber zu den Zimmerkosten, die Universitätsmedizin Mainz und die teuerste Kategorie im Klinikum Hochsauerland. Dein Krankenhaus nennt dir seine eigenen.',
        },
        {
          type: 'costCard',
          title: 'Einzelzimmer: wer was trägt, ein Rechenbeispiel',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit fünf Berechnungstagen, der gesetzlichen Zuzahlung von 10 EUR je Kalendertag und den Zimmerpreisen der Preislisten (Einbettzimmer 70,64 EUR in Mainz und 199 EUR im Hochsauerland, Zweibettzimmer 28,87 und 99 EUR je Berechnungstag). Tarifleistung nach der Produktseite, die Erstattungshöhe regeln die Bedingungen. Der Vertrag besteht schon vor dem Versicherungsfall.',
          caption: 'Kostenkarte: Einbettzimmer und Zweibettzimmer mit und ohne Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Einbettzimmer nach einem Unfall', 'die Behandlung', 'Zimmer 353,20 bis 995 EUR, dazu Zuzahlung 50 EUR', 'SPU und SP1 bieten Ein- oder Zweibettzimmer nach einem Unfall'],
            ['Einbettzimmer bei Krankheit', 'die Behandlung', 'Zimmer 353,20 bis 995 EUR, dazu Zuzahlung 50 EUR', 'SP1 bietet Ein- oder Zweibettzimmer, SP2 nur Zweibettzimmer, SPU leistet bei Krankheit nicht'],
            ['Zweibettzimmer bei Krankheit', 'die Behandlung', 'Zimmer 144,35 bis 495 EUR, dazu Zuzahlung 50 EUR', 'SP2 und SP1 bieten das Zweibettzimmer'],
            ['Behandlung steht bei Vertragsbeginn schon fest', 'die Behandlung', 'das Zimmer selbst', 'Bereits eingetretene Versicherungsfälle sind nicht versichert'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Eigene Rechnung: 5 mal 70,64 EUR, 5 mal 199 EUR, 5 mal 28,87 EUR und 5 mal 99 EUR, Zuzahlung 5 mal 10 EUR nach § 39 Abs. 4 SGB V. Zimmerpreise aus den Preislisten der Universitätsmedizin Mainz (Stand 01.01.2026) und des Klinikums Hochsauerland (Stand 2026, Kategorie 1), siehe Ratgeber Einzelzimmer im Krankenhaus. Tarife nach healio.de/stationaer, abgerufen am 07.10.2026. Annahmen: gesetzlich versichert, Erwachsener, Tarif schon vor dem Versicherungsfall abgeschlossen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'bonus',
      heading: 'Kann der Kassenbonus den Beitrag mittragen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Auf der Produktseite steht: Beim günstigen SPU kann ein aktiver Kassenbonus den Jahresbeitrag ganz ausgleichen, bei SP1 und SP2 gleicht er den Beitrag meist teilweise aus. Gezahlt wird höchstens bis zur Höhe des nachgewiesenen Beitrags und erst nach dem Bonusjahr. Wie viel du persönlich erreichst, hängt von Krankenkasse, Aktivitäten, Nachweisen und Bonusbedingungen ab. Den Beitrag zahlst du ganz normal jeden Monat, den Zuschuss beantragst du nach Ende des Bonusjahres.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ein Tarif ersetzt nicht die Kasse.', text: 'Die medizinisch notwendige Behandlung zahlt weiter die gesetzliche Kasse. Der Tarif ergänzt Wahlleistungen wie Zimmer und Chefarzt.' },
            { lead: 'SPU ist kein Krankheitsschutz.', text: 'Der Unfalltarif leistet ausschließlich bei unfallbedingten Behandlungen. Für einen Krankenhausaufenthalt wegen Krankheit leistet er nicht.' },
            { lead: 'Nicht jeder kommt in den Tarif.', text: 'Gesundheitsfragen gehören bei SP1 und SP2 zum Antrag, die verbindliche Annahme erfolgt erst dort.' },
            { lead: 'Eine Entbindung zahlt kein Klinik-Tarif, wenn du beim Antrag schon schwanger bist.', text: 'Das steht für beide Versicherer auf der Produktseite. Bei der Bayerischen gelten für spätere Entbindungen im Komfort und im Prestige acht Monate Wartezeit.' },
            { lead: 'Nur fürs Zimmer abschließen?', text: 'Wem es nur aufs Einzelzimmer ankommt, sollte nach der Verbraucherzentrale prüfen, ob es günstiger ist, den Aufpreis selbst zu zahlen. Wie oft und wie lange du im Krankenhaus liegst, weiß vorher niemand.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'hospital',
          text: 'Zweibettzimmer, Einbettzimmer oder nur nach Unfall: Du siehst zuerst die Unterschiede und berechnest danach deinen Beitrag.',
          label: 'Klinik-Tarife ansehen',
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'hospital',
              tone: 'mint',
              title: 'Krankenhaus-Ratgeber im Überblick',
              text: 'Was die Kasse im Krankenhaus zahlt und was ein Klinik-Tarif ergänzt.',
              to: '/ratgeber/stationaere-zusatzversicherung',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'money',
              tone: 'butter',
              title: 'Einzelzimmer im Krankenhaus: Kosten',
              text: 'Preise pro Tag aus sechs Preislisten und wer zahlt.',
              to: '/ratgeber/einzelzimmer-krankenhaus-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'sky',
              title: 'Krankenhaustagegeld',
              text: 'Wie hoch, wie lange und was bei Reha gilt.',
              to: '/ratgeber/krankenhaustagegeld',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'family',
              tone: 'lavender',
              title: 'Zusatzversicherung für Kinder',
              text: 'Kinder nachversichern, Krankenhaus, Zahn und Brille im Überblick.',
              to: '/ratgeber/zusatzversicherung-kinder',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK (SP1, SP2 und SPU) und der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was leistet eine Zusatzversicherung für das Einzelzimmer im Krankenhaus?',
      answer:
        'Die Zusatzversicherung ergänzt, was die Kasse nicht zahlt: das Ein- oder Zweibettzimmer, die privatärztliche Behandlung und die freie Klinikwahl. Der SDK-Tarif Klinik 1-Bett (SP1) bietet Ein- oder Zweibettzimmer, der SP2 das Zweibettzimmer, der SPU nur nach einem Unfall. Wie viel im Einzelfall erstattet wird, steht in den Tarifbedingungen.',
    },
    {
      question: 'Was kostet eine Zusatzversicherung für das Einzelzimmer?',
      answer:
        'Das hängt vom Alter und vom Tarif ab. Laut Produktseite zahlt ein 30-Jähriger im Monat beispielhaft 7,00 EUR für den Unfalltarif SPU, 33,41 EUR für SP2 und 50,72 EUR für SP1. Bei der Bayerischen sind es mit 21 bis 30 Jahren 10,20 EUR im Komfort und 13,40 EUR im Prestige (Stand 09/2026).',
    },
    {
      question: 'Gibt es eine Wartezeit?',
      answer:
        'Bei der SDK gibt es in den Klinik-Tarifen keine tarifliche Wartezeit. Die Bayerische kennt keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie gelten acht Monate, nach einem Unfall entfallen sie. Was vor Versicherungsbeginn schon eingetreten ist, ist nicht versichert.',
    },
    {
      question: 'Muss ich Gesundheitsfragen beantworten?',
      answer:
        'Bei SP1 und SP2 gehören Gesundheitsfragen zum Antrag, die verbindliche Annahme erfolgt erst dort. SPU gilt ausschließlich für unfallbedingte Behandlungen. Die Verbraucherzentrale weist darauf hin, dass Fragen wahrheitsgemäß beantwortet werden sollten.',
    },
    {
      question: 'Zahlt die Zusatzversicherung auch das Einzelzimmer in einer Privatklinik?',
      answer:
        'Nach der Produktseite wählst du die Klinik frei. In einer Privatklinik zahlt der Tarif die Kosten über dem Satz eines zugelassenen Krankenhauses, wenn deine Krankenkasse diesen Satz übernimmt. Übernimmt deine Kasse ihn nicht, trägst du die allgemeinen Krankenhauskosten selbst.',
    },
    {
      question: 'Kann ich ein Einzelzimmer versichern, wenn die Operation schon geplant ist?',
      answer:
        'Für diesen Aufenthalt nein. Auf der Produktseite steht, dass bereits vor Versicherungsbeginn eingetretene Versicherungsfälle nicht versichert sind. Ein Tarif gilt für neue Versicherungsfälle ab Versicherungsbeginn.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welche Klinik-Tarife es gibt und was sie unterscheidet, siehst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Was das Zimmer ohne Tarif kostet, steht im Ratgeber ' },
      { text: 'Einzelzimmer im Krankenhaus', to: '/ratgeber/einzelzimmer-krankenhaus-kosten' },
      { text: ', den Überblick findest du im ' },
      { text: 'Krankenhaus-Ratgeber', to: '/ratgeber/stationaere-zusatzversicherung' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Einordnung stammt von der Verbraucherzentrale und aus dem Gesetz, die Tarifaussagen und Beiträge von der Produktseite.',
    items: [
      {
        label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung: Sinnvoll oder nicht?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425',
        stand: '19.08.2025',
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
        label: 'KHEntgG § 17 Wahlleistungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/khentgg/__17.html',
        stand: 'Abruf 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 39 Krankenhausbehandlung, Absatz 4',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__39.html',
        stand: 'Fassung vor dem 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Entgelte für Wahlleistung Unterkunft nach § 17 KHEntgG',
        publisher: 'Universitätsmedizin Mainz',
        href: 'https://www.unimedizin-mainz.de/fileadmin/kliniken/kl33/Dokumente/UEbersicht_Entgelte_fuer_Wahlleistung_Unterkunft_UM_Stand_01.01.2026.pdf',
        stand: '01.01.2026',
        accessedAt: '07.10.2026',
        note: 'Niedrigster Zimmerpreis der Rechenbeispiele',
      },
      {
        label: 'Wahlleistungspreise Unterkunft',
        publisher: 'Klinikum Hochsauerland',
        href: 'https://www.klinikum-hochsauerland.de/fileadmin/user_upload/Klinikum-Hochsauerland/Patienten_und_Besucher/Wahlleistungspreise_Stand_2026.pdf',
        stand: '2026',
        accessedAt: '07.10.2026',
        note: 'Höchster Zimmerpreis der Rechenbeispiele (Kategorie 1)',
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
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen und Beiträgen nach dem Stand der Produktseite vom 7. Oktober 2026, die verbindliche Annahme erfolgt im Antrag. Maßgeblich sind immer die Bedingungen des Versicherers.',
};

export default article;
