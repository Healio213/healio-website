/**
 * Krankenhaus-Ratgeber (Serie, Stapel krankenhaus-familie), Seite: Einzelzimmer im
 * Krankenhaus, Kosten und wer zahlt.
 *
 * Quellen (Belege je Zahl in einzelzimmer-krankenhaus-kosten.belege.md, Abruf
 * 07.10.2026): öffentlich einsehbare Preislisten für die Wahlleistung Unterkunft
 * von sechs Krankenhäusern (Universitätsmedizin Mainz Stand 01.01.2026, Klinikum
 * Dessau Wahlleistungstarif vom 01.01.2026, Klinikum Hochsauerland Stand 2026,
 * Universitätsklinikum Freiburg, Leipzig und Essen als Webseiten ohne eigenes
 * Gültigkeitsdatum, gekennzeichnet mit "abgerufen am 07.10.2026"). Alle Preise
 * am 07.10.2026 gegen die Quellen geprüft; die Düsseldorfer Liste (gültig ab
 * 01.06.2019) ist als zu alt gestrichen. KHEntgG § 17 und § 2, BMG Ratgeber Krankenhaus (2022),
 * Verbraucherzentrale (19.08.2025). Tarifaussagen nur wie auf healio.de/stationaer
 * (live 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Kein Durchschnittspreis. Die sechs Häuser sind Beispiele und kein
 *     Marktquerschnitt; die Seite sagt das und zeigt die Preise mit Stand oder
 *     Abrufdatum. Die Spanne 71 bis 210 EUR (Zweibett 29 bis 120 EUR) umfasst
 *     alle Erwachsenenstationen der sechs Listen; Kinderstationen (Dessau
 *     Pädiatrie 47,18 EUR) stehen nur in der Tabellennotiz.
 *   - Der Preis gilt je Berechnungstag (Aufnahmetag plus jeder weitere Tag, der
 *     Entlassungstag zählt nicht, laut Preisliste Dessau). Die Rechenbeispiele
 *     mit 5 Berechnungstagen und dem Vergleich zu SP1-Monatsbeiträgen sind eigene
 *     Rechnung und so gekennzeichnet.
 *   - Beitrag SP1 nur als Beispielbeitrag der Produktseite (30 Jahre, 50,72 EUR
 *     im Monat, Stand 07.10.2026), kein Preisversprechen.
 *   - Ob und wie viel ein Tarif im Einzelfall für das Zimmer erstattet, steht in
 *     den Bedingungen; die Produktseite nennt nur das Zimmerangebot je Tarif.
 *   - Entbindung: Ehrlich gesagt, wer beim Antrag schon schwanger ist, bekommt
 *     diese Entbindung von keinem Klinik-Tarif gezahlt (Produktseite).
 *   - Keine Behandlungsempfehlung, keine Steuerfragen.
 *   - Einbau 07.10.2026: Karte auf krankenhaus-zuzahlung-2027 bis zum Einbau
 *     des Anlass-Ratgebers entfernt (serie/NACHZUTRAGEN.md).
 */

export const article = {
  slug: 'einzelzimmer-krankenhaus-kosten',
  kind: 'ratgeber',
  group: 'krankenhaus',

  metaTitle: 'Einzelzimmer Krankenhaus Kosten: Preis je Tag, wer zahlt | Healio',
  metaDescription:
    'Was kostet ein Einzelzimmer im Krankenhaus pro Tag? Beispiele aus sechs Preislisten, wer das Zimmer zahlt und wann sich eine Zusatzversicherung lohnt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Einzelzimmer im Krankenhaus: Kosten pro Tag und wer zahlt',
  listTeaser:
    'Was das Einbettzimmer im Krankenhaus pro Tag kostet, mit Beispielen aus sechs Preislisten, wer es zahlt und wann sich der Selbstkauf oder ein Tarif eher lohnt.',

  headline: 'Einzelzimmer im Krankenhaus: Kosten pro Tag und wer zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'hospital',
    facts: [
      { value: '71 bis 210 EUR', label: 'je Berechnungstag im Einbettzimmer, Beispiele aus sechs Kliniken' },
      { value: 'Medizinisch nötig', label: 'nur dann zahlt die Kasse das Einzelzimmer' },
      { value: 'Nur Beispiele', label: 'jedes Haus legt seine Preise selbst fest' },
    ],
    text: 'Ein Einbettzimmer kostet in den hier gezeigten Preislisten zwischen rund 71 und 210 EUR je Berechnungstag. Die gesetzliche Kasse zahlt es nur, wenn es medizinisch erforderlich ist. Sonst vereinbarst du es als Wahlleistung und zahlst selbst, oder dein Tarif übernimmt es.',
    path: { to: '/stationaer', text: 'Einbett- oder Zweibettzimmer über einen Tarif', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Was ein Einzelzimmer im Krankenhaus kostet, legt jedes Haus selbst fest. Neutrale Durchschnittspreise liegen uns nicht vor, deshalb zeigt diese Seite Beispiele aus öffentlich einsehbaren Preislisten von sechs Krankenhäusern, jeweils mit Stand oder Abrufdatum. Dazu kommt, wer das Zimmer zahlt, was zum Zimmerpreis noch dazukommt und wann sich der Selbstkauf oder ein Klinik-Tarif eher lohnt.',

  sections: [
    {
      id: 'preise',
      heading: 'Was kostet ein Einzelzimmer im Krankenhaus pro Tag?',
      blocks: [
        {
          type: 'paragraph',
          text: 'In den hier gezeigten Preislisten liegt das Einbettzimmer auf den Stationen für Erwachsene zwischen rund 71 und 210 EUR je Berechnungstag, das Zweibettzimmer zwischen rund 29 und 120 EUR. Die Spanne ist groß, weil jedes Haus seine Preise selbst festlegt. Für nichtärztliche Wahlleistungen wie die Unterkunft bestimmen die Kliniken die Kosten eigenständig, so beschreibt es das Bundesgesundheitsministerium.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Wahlleistung Einbettzimmer in sechs Krankenhäusern, Preis je Berechnungstag laut Preisliste des Hauses',
          head: ['Krankenhaus und Stand der Preisliste', 'Einbettzimmer', 'Zweibettzimmer'],
          rows: [
            ['Universitätsmedizin Mainz, Stand 01.01.2026', '70,64 EUR', '28,87 EUR'],
            ['Klinikum Dessau, Entgelte vom 01.01.2026', '73,37 EUR auf der Normalstation, 107,77 EUR auf der Hotelstation', '38,51 EUR auf der Normalstation, 61,90 EUR auf der Hotelstation'],
            ['Klinikum Hochsauerland, Stand 2026', '120 bis 199 EUR je nach Kategorie', '60 bis 99 EUR je nach Kategorie'],
            ['Universitätsklinikum Freiburg, Preisliste ohne eigenes Datum, abgerufen am 07.10.2026', '160 EUR allgemein, 180 EUR auf der Komfortstation, bis 210 EUR am Standort Bad Krozingen', '80 EUR allgemein, 85 EUR auf der Komfortstation, bis 120 EUR in Bad Krozingen'],
            ['Universitätsklinikum Essen, Preisliste ohne eigenes Datum, abgerufen am 07.10.2026', '169 EUR Komfort, 199 EUR Premium je Nacht', '89 EUR Komfort, 99 EUR Premium je Patient und Nacht'],
            ['Universitätsklinikum Leipzig, Preisliste ohne eigenes Datum, abgerufen am 07.10.2026', '190 EUR mit Komfort- und Serviceleistungen, in der Geburtsmedizin 200 EUR, 95 EUR ohne', '90 EUR mit Komfort- und Serviceleistungen'],
          ],
          note: 'Beispiele aus öffentlich einsehbaren Preislisten, kein Marktdurchschnitt und keine Auswahl nach Qualität. Spalten in Euro je Berechnungstag, soweit die Quelle nicht Nacht schreibt. Freiburg nennt weitere Stationen, etwa das Tumorzentrum mit 100 EUR und die Psychiatrie mit 195 EUR für das Einbettzimmer, bei Hochsauerland ordnet die medizinische Indikation die Kategorie zu. Kinderstationen sind günstiger und hier nicht aufgeführt, in Dessau kostet das Einbettzimmer in der Pädiatrie 47,18 EUR. Die Preise gelten nur für das Zimmer, ärztliche Wahlleistungen kommen hinzu. Quellen und Stand siehe unten.',
        },
      ],
    },
    {
      id: 'abhaengigkeit',
      heading: 'Wovon hängt der Preis für das Einzelzimmer ab?',
      blocks: [
        {
          type: 'list',
          items: [
            { lead: 'Vom Haus.', text: 'Mainz verlangt 70,64 EUR, Leipzig 190 EUR für ein Zimmer mit Komfort und Service. Beides sind Universitätskliniken.' },
            { lead: 'Von der Station.', text: 'In Dessau kostet das Einbettzimmer auf der Normalstation 73,37 EUR, auf der Hotelstation 107,77 EUR. Freiburg unterscheidet allgemeine Stationen, Komfortstation und Tumorzentrum.' },
            { lead: 'Vom Komfort.', text: 'Leipzig bietet das Einbettzimmer ohne Komfort- und Serviceleistungen für 95 EUR, mit für 190 EUR. Essen führt Komfort- und Premiumstufen, Freiburg eine eigene Komfortstation.' },
            { lead: 'Vom Berechnungstag.', text: 'Berechnet werden der Aufnahmetag und jeder weitere Aufenthaltstag, der Entlassungstag zählt nicht (Preisliste Dessau).' },
            { lead: 'Von Nebenposten.', text: 'Manche Häuser berechnen eine Reservierungspauschale, etwa wenn das Zimmer während der Intensivstation freigehalten wird: Mainz 52,98 EUR je Berechnungstag für einen Zeitraum von vier Kalendertagen, Leipzig 142,50 EUR je Tag.' },
          ],
        },
      ],
    },
    {
      id: 'wer-zahlt',
      heading: 'Wer zahlt das Einzelzimmer, wenn du gesetzlich versichert bist?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Kasse zahlt es nur, wenn es medizinisch erforderlich ist. Das Bundesgesundheitsministerium schreibt: Soweit medizinisch erforderlich, können zu den allgemeinen Krankenhausleistungen auch die Unterbringung in einem Einzelzimmer, eine Behandlung durch die Chefärztin oder den Chefarzt oder die Aufnahme einer Begleitperson gehören. Allgemeine Krankenhausleistungen sind die Leistungen, die nach Art und Schwere der Krankheit für die medizinisch zweckmäßige und ausreichende Versorgung notwendig sind (§ 2 Abs. 2 KHEntgG).',
        },
        {
          type: 'paragraph',
          text: 'Ohne diese Notwendigkeit gilt das Einzelzimmer als Wahlleistung. Dann musst du es gesondert vereinbaren und selbst bezahlen. Vertragspartner des Krankenhauses bist du, unabhängig davon, ob du gesetzlich, privat oder zusatzversichert bist, du musst zunächst selbst für die zusätzlichen Leistungen aufkommen (BMG, Ratgeber Krankenhaus). Hast du eine Zusatzversicherung, bekommst du den Betrag nach deinen Tarifbedingungen erstattet.',
        },
        {
          type: 'paragraph',
          text: 'Unabhängig vom Zimmer bleibt die gesetzliche Zuzahlung: 10 EUR je Kalendertag für längstens 28 Tage im Kalenderjahr, wenn du das 18. Lebensjahr vollendet hast (§ 39 Abs. 4 SGB V). Ab dem 01.01.2027 sind es 15 EUR je Kalendertag (§ 61 SGB V in der neuen Fassung).',
        },
      ],
    },
    {
      id: 'vereinbarung',
      heading: 'Wie läuft die Wahlleistungsvereinbarung ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wahlleistungen sind vor der Erbringung schriftlich zu vereinbaren, und das Krankenhaus muss dich vor Abschluss schriftlich über die Entgelte und deren Inhalt im Einzelnen unterrichten (§ 17 Abs. 2 KHEntgG). Das kann auch in Textform geschehen, wenn du vorher in geeigneter Weise in Textform informiert wurdest. Die Entgelte dürfen in keinem unangemessenen Verhältnis zu den Leistungen stehen (§ 17 Abs. 1 KHEntgG).',
        },
        {
          type: 'paragraph',
          text: 'Die Unterkunft darf nicht von einer Vereinbarung über ärztliche Wahlleistungen abhängig gemacht werden (§ 17 Abs. 4 KHEntgG). Wer das Einbettzimmer wählt, vereinbart also nicht automatisch die Chefarztbehandlung. Das Arzthonorar wird getrennt nach der Gebührenordnung für Ärzte abgerechnet.',
        },
        {
          type: 'steps',
          heading: 'So gehst du bei einem geplanten Aufenthalt vor',
          items: [
            { title: 'Preisliste anfordern', text: 'Frag das Krankenhaus nach dem Entgeltverzeichnis für Wahlleistungen und nach dem Preis für deine Station.' },
            { title: 'Zimmer ist nicht zugesagt', text: 'Ein Wahlleistungszimmer kann trotz Reservierung nicht verbindlich zugesagt werden, so sagt es Leipzig auf seiner Seite.' },
            { title: 'Mit der Versicherung abgleichen', text: 'Prüfe vor dem Vertrag, ob Zusatzversicherung oder Beihilfe die Unterkunft übernimmt, und was sie höchstens erstattet.' },
          ],
        },
      ],
    },
    {
      id: 'zusatz-oder-selbst',
      heading: 'Lohnt sich eine Zusatzversicherung oder zahlst du das Zimmer selbst?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale rät, zu prüfen, ob es nicht günstiger ist, den Aufpreis für das Zimmer selbst zu bezahlen, statt eine teure Zusatzversicherung abzuschließen, wenn es dir nur aufs Einzelzimmer ankommt (Stand 19.08.2025). Ein Beispiel als eigene Rechnung hilft beim Abwägen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Fünf Berechnungstage Einbettzimmer selbst gezahlt, verglichen mit dem Beispielbeitrag des SDK-Tarifs Klinik 1-Bett (SP1)',
          head: ['Beispiel', 'Einbettzimmer selbst gezahlt', 'Entspricht SP1-Monatsbeiträgen'],
          rows: [
            ['5 Berechnungstage zum Preis von Mainz (70,64 EUR)', '353,20 EUR', 'rund 7 Monatsbeiträge'],
            ['5 Berechnungstage zum Preis von Leipzig (190 EUR)', '950 EUR', 'rund 19 Monatsbeiträge'],
            ['5 Berechnungstage zum Preis der Premium-Stufe in Essen (199 EUR)', '995 EUR', 'rund 20 Monatsbeiträge'],
          ],
          note: 'Eigene Rechnung, keine Preisangabe und keine Empfehlung. Beispielbeitrag SP1 laut Produktseite healio.de/stationaer, abgerufen am 07.10.2026: 50,72 EUR im Monat für 30-Jährige, der Beitrag hängt vom Eintrittsalter ab. Ein Tarif erstattet nach seinen Bedingungen und deckt mehr ab als das Zimmer. Der Vergleich ersetzt keine Beratung.',
        },
        {
          type: 'paragraph',
          text: 'Auf der Produktseite von Healio stehen drei SDK-Tarife. SP2 bietet das Zweibettzimmer, SP1 bietet Ein- oder Zweibettzimmer, SPU leistet ausschließlich nach einem Unfall. Dazu kommen die Tarife Prestige, Komfort und Smart der Bayerischen. Beitragsbeispiele für 30-Jährige nennt die Seite für die SDK: SPU 7,00 EUR, SP2 33,41 EUR und SP1 50,72 EUR im Monat.',
        },
        {
          type: 'costCard',
          title: 'Einbettzimmer: wer was trägt, ein Rechenbeispiel',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit fünf Berechnungstagen und den Preisen der Beispielhäuser. Der SDK-Tarif Klinik 1-Bett (SP1) bietet laut Produktseite Ein- oder Zweibettzimmer, die Erstattung regeln die Tarifbedingungen. Der Vertrag besteht schon, bevor der Aufenthalt feststeht.',
          caption: 'Kostenkarte: Einbettzimmer mit und ohne Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Einbettzimmer ist medizinisch erforderlich', 'das Zimmer als allgemeine Krankenhausleistung', 'nur die gesetzliche Zuzahlung, 10 EUR je Tag', 'SP1 übernimmt die gesetzliche Zuzahlung von 10 EUR je Kliniktag nach der Produktseite'],
            ['5 Berechnungstage, Haus mit 70,64 EUR', 'die Behandlung, das Zimmer nicht', '353,20 EUR für das Zimmer', 'SP1: Ein- oder Zweibettzimmer nach Tarifbedingungen'],
            ['5 Berechnungstage, Haus mit 199 EUR', 'die Behandlung, das Zimmer nicht', '995 EUR für das Zimmer', 'SP1: Ein- oder Zweibettzimmer nach Tarifbedingungen'],
            ['Aufenthalt steht schon fest, Tarif noch nicht abgeschlossen', 'die Behandlung', 'das Zimmer selbst', 'Bereits eingetretene Versicherungsfälle sind nicht versichert'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Preise je Berechnungstag aus den Preislisten unten, Stand wie dort angegeben. Zuzahlung nach § 39 Abs. 4 SGB V. Tarifleistungen nach healio.de/stationaer, abgerufen am 07.10.2026. Die Ersatzhöhe im Einzelfall steht in den Bedingungen. Annahmen: gesetzlich versichert, Erwachsener, Tarif schon vor dem Versicherungsfall abgeschlossen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Sechs Häuser sind kein Marktquerschnitt.', text: 'Die Preise zeigen eine Spanne, keinen Durchschnitt. Dein Krankenhaus nennt dir seine Preisliste, nur sie gilt für dich.' },
            { lead: 'Das Zimmer ist nicht die ganze Rechnung.', text: 'Ärztliche Wahlleistungen wie die Chefarztbehandlung kommen nach der Gebührenordnung für Ärzte dazu. Hinzu können Telefon, Internet oder die Unterkunft einer Begleitperson kommen, in Mainz 64,20 EUR je Berechnungstag.' },
            { lead: 'Ein Tarif gilt nur für Neues.', text: 'Neue Versicherungsfälle sind ab Versicherungsbeginn geschützt, bereits eingetretene sind nicht versichert. SP1 und SP2 haben Gesundheitsfragen im Antrag. SPU leistet ausschließlich nach einem Unfall.' },
            { lead: 'Eine Entbindung zahlt kein Klinik-Tarif, wenn du beim Antrag schon schwanger bist.', text: 'Das steht für beide Versicherer auf der Produktseite. Für spätere Entbindungen gelten bei der Bayerischen im Komfort und im Prestige acht Monate Wartezeit.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'hospital',
          text: 'Zweibettzimmer, Einbettzimmer oder nur nach Unfall: Du siehst zuerst die Unterschiede, dann deinen Beitrag.',
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
              icon: 'protection',
              tone: 'lavender',
              title: 'Einzelzimmer-Zusatzversicherung',
              text: 'Was sie leistet und was die Produktseite dazu sagt.',
              to: '/ratgeber/zusatzversicherung-einzelzimmer',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'money',
              tone: 'sky',
              title: 'Krankenhaustagegeld',
              text: 'Wie hoch, wie lange und was bei Reha gilt.',
              to: '/ratgeber/krankenhaustagegeld',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK (SP1, SP2 und SPU) und der Bayerischen. Die Preise für das Einzelzimmer legt jedes Krankenhaus selbst fest, diese Seite zeigt sie als datierte Beispiele. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet ein Einzelzimmer im Krankenhaus pro Tag?',
      answer:
        'Das legt jedes Haus selbst fest. In den sechs Preislisten dieser Seite liegt das Einbettzimmer zwischen rund 71 EUR (Mainz, Stand 01.01.2026) und 210 EUR je Berechnungstag (Universitätsklinikum Freiburg, Standort Bad Krozingen). Frag dein Krankenhaus nach seiner aktuellen Preisliste.',
    },
    {
      question: 'Zahlt die Krankenkasse das Einzelzimmer?',
      answer:
        'Nur wenn es medizinisch erforderlich ist. Dann gehört es zu den allgemeinen Krankenhausleistungen. Ohne diese Notwendigkeit ist das Einzelzimmer eine Wahlleistung, die du gesondert vereinbarst und zunächst selbst zahlst.',
    },
    {
      question: 'Was ist ein Berechnungstag?',
      answer:
        'Berechnet werden der Tag der Aufnahme und jeder weitere Aufenthaltstag. Der Tag der Entlassung oder Verlegung wird nicht berechnet, so steht es etwa in der Preisliste des Klinikums Dessau.',
    },
    {
      question: 'Muss ich ein Wahlleistungszimmer schriftlich vereinbaren?',
      answer:
        'Ja. Wahlleistungen sind vor der Erbringung schriftlich zu vereinbaren, und das Krankenhaus muss dich vorher schriftlich über Entgelte und Inhalt unterrichten. Auch die Textform ist möglich, wenn du zuvor in Textform informiert wurdest (§ 17 Abs. 2 KHEntgG).',
    },
    {
      question: 'Bekomme ich das Einbettzimmer, wenn ich es gebucht habe?',
      answer:
        'Nicht verbindlich. Das Universitätsklinikum Leipzig schreibt, dass ein Wahlleistungszimmer trotz Reservierung nicht verbindlich zugesagt werden kann, vor allem bei Notfällen kann es zu Abweichungen kommen.',
    },
    {
      question: 'Was bietet die Zusatzversicherung bei Healio für das Zimmer?',
      answer:
        'Der SDK-Tarif Klinik 1-Bett (SP1) bietet Ein- oder Zweibettzimmer, der SDK-Tarif Klinik 2-Bett (SP2) das Zweibettzimmer. SPU gilt ausschließlich nach einem Unfall. Zusätzlich gibt es die Tarife Prestige, Komfort und Smart der Bayerischen. Die Erstattung regeln die Tarifbedingungen.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Hol dir vor einem geplanten Aufenthalt die Preisliste deines Krankenhauses. Welche Klinik-Tarife es gibt, siehst du auf ' },
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
    intro: 'Die Zimmerpreise stammen aus den öffentlichen Preislisten der Krankenhäuser, die Regeln aus Gesetz und Bundesgesundheitsministerium, die Tarifaussagen von der Produktseite.',
    items: [
      {
        label: 'Entgelte für Wahlleistung Unterkunft nach § 17 KHEntgG',
        publisher: 'Universitätsmedizin Mainz',
        href: 'https://www.unimedizin-mainz.de/fileadmin/kliniken/kl33/Dokumente/UEbersicht_Entgelte_fuer_Wahlleistung_Unterkunft_UM_Stand_01.01.2026.pdf',
        stand: '01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Entgelte für Wahlleistungen (Wahlleistungstarif)',
        publisher: 'Klinikum Dessau, Akademisches Lehrkrankenhaus der Universitätsmedizin Magdeburg',
        href: 'https://klinikum-dessau.de/fileadmin/user_upload/Patienten_und_Besucher/Wahlleistungstarif_2026_01_01.pdf',
        stand: '01.01.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wahlleistungspreise Unterkunft',
        publisher: 'Klinikum Hochsauerland',
        href: 'https://www.klinikum-hochsauerland.de/fileadmin/user_upload/Klinikum-Hochsauerland/Patienten_und_Besucher/Wahlleistungspreise_Stand_2026.pdf',
        stand: '2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wahlleistung Unterkunft am Universitätsklinikum Freiburg',
        publisher: 'Universitätsklinikum Freiburg',
        href: 'https://www.uniklinik-freiburg.de/behandlung/klinikaufenthalt/wahlleistung-unterkunft.html',
        stand: 'Preisliste ohne eigenes Datum, abgerufen am 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wahlleistung Unterkunft am Universitätsklinikum Leipzig',
        publisher: 'Universitätsklinikum Leipzig',
        href: 'https://www.uniklinikum-leipzig.de/Seiten/wahlleistung-unterkunft.aspx',
        stand: 'Preisliste ohne eigenes Datum, abgerufen am 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Einzelzimmer am Universitätsklinikum Essen',
        publisher: 'Universitätsmedizin Essen',
        href: 'https://wahlleistung.ume.de/universitaetsklinikum-essen-einzelzimmer/',
        stand: 'Preisliste ohne eigenes Datum, abgerufen am 07.10.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'KHEntgG § 17 Wahlleistungen und § 2 Krankenhausleistungen',
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
        label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung: Sinnvoll oder nicht?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425',
        stand: '19.08.2025',
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
        note: 'Leistungen und Beitragsbeispiele wortgleich mit der Seite healio.de/stationaer',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Zimmerpreise nach den genannten Preislisten mit dem jeweils genannten Stand, Beispielbeiträge nach der Produktseite vom 7. Oktober 2026. Maßgeblich sind immer die Preisliste deines Krankenhauses und die Bedingungen des Versicherers.',
};

export default article;
