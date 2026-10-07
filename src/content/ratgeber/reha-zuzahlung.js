/**
 * Krankenhaus-Ratgeber (Serie, Stapel krankenhaus-familie), Seite: Zuzahlung bei der Reha.
 *
 * Quellen (Belege je Zahl in reha-zuzahlung.belege.md, Abruf 07.10.2026):
 * Deutsche Rentenversicherung (Seite Zuzahlung mit Einkommenstabelle 2026 und
 * Meldung vom 23.09.2026), SGB VI § 32, SGB V § 39 Abs. 4, § 40 Abs. 4 bis 6,
 * § 61, § 62, gesund.bund.de (Zuzahlungen und Zuzahlungsbefreiung, Stand
 * 15.03.2023), BMG Meldung vom 10.07.2026, GKV-Beitragssatzstabilisierungsgesetz
 * (BGBl. 2026 I Nr. 228, Art. 1 Nr. 23 und Art. 8 Abs. 2, am 07.10.2026 gelesen).
 * Tarifaussagen nur wie auf healio.de/stationaer (live 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Rentenversicherung und Krankenkasse getrennt erklärt, weil die Regeln
 *     unterschiedlich sind (42 Tage gegen 28 Tage bei Anschlussreha, Einkommens-
 *     tabelle gegen Belastungsgrenze).
 *   - Die Höchstdauer von 42 Tagen steht bei der Rentenversicherung auf ihrer
 *     Seite, nicht im Gesetzestext von § 32 SGB VI; sie wird deshalb als Angabe
 *     der Rentenversicherung bezeichnet.
 *   - 2027: Krankenkasse 15 EUR je Kalendertag nach § 61 Satz 2 SGB V neu
 *     (BGBl. 2026 I Nr. 228, Art. 1 Nr. 23, in Kraft 01.01.2027 nach Art. 8
 *     Abs. 2), auf den § 40 Abs. 5 und 6 SGB V verweisen; § 62 wird nicht
 *     geändert. § 32 Abs. 1 SGB VI verweist auf denselben Betrag; die
 *     Einkommenstabelle 2027 der Rentenversicherung lag am 07.10.2026 nicht
 *     vor, deshalb wird dazu nicht gerechnet.
 *   - Ambulante Reha der Krankenkasse: § 40 Abs. 5 SGB V gilt für Leistungen
 *     nach Abs. 1 (ambulant) und Abs. 2 (stationär); die Seite sagt das so
 *     (Korrektur im Prüflauf 07.10.2026).
 *   - Keine Steuerfragen (Themenliste), keine Behandlungsempfehlung.
 *   - Ein Klinik-Tarif ist keine Reha-Versicherung. Die Produktseite nennt
 *     eine Zuzahlungsübernahme nur je Kliniktag im Krankenhaus.
 *   - Einbau 07.10.2026: Link und Karte auf krankenhaus-zuzahlung-2027 bis zum
 *     Einbau des Anlass-Ratgebers entfernt (serie/NACHZUTRAGEN.md).
 */

export const article = {
  slug: 'reha-zuzahlung',
  kind: 'ratgeber',
  group: 'krankenhaus',

  metaTitle: 'Zuzahlung Reha: 10 Euro am Tag, Befreiung und Dauer | Healio',
  metaDescription:
    'Zuzahlung bei der Reha: 10 EUR je Tag, wie lange du zahlst, wann sie entfällt und was bei Rentenversicherung und Krankenkasse unterschiedlich gilt.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 9,

  listTitle: 'Zuzahlung Reha: 10 Euro am Tag, Befreiung und Höchstdauer',
  listTeaser:
    'Was du bei der Reha zuzahlst, getrennt nach Rentenversicherung und Krankenkasse, wann die Zuzahlung entfällt und wie die Belastungsgrenze wirkt.',

  headline: 'Zuzahlung Reha: 10 Euro am Tag, Befreiung und Höchstdauer',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'medication',
    facts: [
      { value: 'bis zu 10 EUR je Tag', label: 'Zuzahlung 2026, bei der Krankenkasse ab 2027 dann 15 EUR' },
      { value: '42 Tage', label: 'höchstens bei der Rentenversicherung, Anschlussreha 14 Tage' },
      { value: 'unter 1.583 EUR', label: 'monatliches Netto 2026: Befreiung bei der Rentenversicherung' },
    ],
    text: 'Bei einer Reha zahlst du als Erwachsener 2026 bis zu 10 EUR je Tag zu. Wie viel, wie lange und ob du befreit wirst, hängt davon ab, ob die Rentenversicherung oder die Krankenkasse die Reha trägt.',
    path: { to: '/stationaer', text: 'Krankenhaus und Klinik-Tarife im Blick', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Bei einer Reha zahlst du als Erwachsener bis zu 10 EUR je Kalendertag zu. Bei der Rentenversicherung gilt das nur für die stationäre Reha und hängt vom Einkommen ab, bei der Krankenkasse für ambulante und stationäre Reha. Auch die Regeln zur Dauer und zur Befreiung unterscheiden sich. Hier findest du beide getrennt, mit der Einkommenstabelle der Rentenversicherung für 2026, der Belastungsgrenze der Krankenkasse und dem, was sich 2027 ändert.',

  sections: [
    {
      id: 'wer-zahlt',
      heading: 'Wer zahlt die Reha, die Rentenversicherung oder die Krankenkasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Beide können zuständig sein, je nach Lage. Die Krankenkasse erbringt Rehabilitationsleistungen im Grundsatz nur dann, wenn nach den Vorschriften anderer Träger der Sozialversicherung solche Leistungen nicht erbracht werden können (§ 40 Abs. 4 SGB V). Ein Beispiel für einen anderen Träger ist die Rentenversicherung. Welcher Träger bei dir zuständig ist, klärt der Antrag, den du mit deiner Ärztin oder deinem Arzt stellst.',
        },
        {
          type: 'paragraph',
          text: 'Das ist für die Zuzahlung wichtig, weil jeder Träger eigene Regeln hat. Hast du im selben Jahr schon Rehabilitationsleistungen in Anspruch genommen, auch von der Krankenkasse, werden alle Tage der Zuzahlung berücksichtigt und gegenseitig angerechnet, so schreibt es die Rentenversicherung.',
        },
      ],
    },
    {
      id: 'rentenversicherung',
      heading: 'Wie hoch ist die Zuzahlung bei der Reha der Rentenversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Zuzahlung beträgt höchstens 10 EUR pro Tag für längstens 42 Tage, bei einer Anschlussrehabilitation für längstens 14 Tage im Kalenderjahr. Das schreibt die Deutsche Rentenversicherung auf ihrer Seite zur Zuzahlung. Du zahlst nur bei einer stationären Leistung, bei ambulanter Reha fällt grundsätzlich keine Zuzahlung an.',
        },
        {
          type: 'paragraph',
          text: 'Eine Anschlussrehabilitation folgt unmittelbar auf eine Krankenhausbehandlung. Unmittelbar ist der Anschluss auch, wenn die Maßnahme innerhalb von 14 Tagen beginnt, außer zwingende tatsächliche oder medizinische Gründe verhindern das (§ 32 Abs. 1 SGB VI). Für Menschen unter 18 und für Bezieher von Übergangsgeld entfällt die Zuzahlung.',
        },
      ],
    },
    {
      id: 'befreiung-rv',
      heading: 'Wann entfällt die Zuzahlung bei der Reha der Rentenversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Zuzahlung hängt von deinem Einkommen ab. Liegt dein monatliches Nettoeinkommen unter 1.583 EUR, bist du auf Antrag ohne weitere Voraussetzungen befreit. Die gestaffelten Beträge in der Tabelle gelten nach Angabe der Rentenversicherung nur, wenn Kinder mit Kindergeldanspruch im Haushalt leben, oder wenn für dich oder deinen Ehe- oder Lebenspartner eine Pflegebedürftigkeit anerkannt ist. Wer nur über der ersten Grenze liegt und keine Kinder oder Pflegebedürftigkeit hat, zahlt den vollen Betrag.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zuzahlung bei stationärer Reha der Rentenversicherung nach monatlichem Nettoeinkommen im Kalenderjahr 2026',
          head: ['Monatliches Nettoeinkommen 2026', 'Zuzahlung je Kalendertag'],
          rows: [
            ['unter 1.583 EUR', 'keine Zuzahlung'],
            ['ab 1.583 EUR', '5,00 EUR'],
            ['ab 1.740,20 EUR', '6,00 EUR'],
            ['ab 1.898,40 EUR', '7,00 EUR'],
            ['ab 2.056,60 EUR', '8,00 EUR'],
            ['ab 2.214,80 EUR', '9,00 EUR'],
            ['ab 2.373 EUR', '10,00 EUR'],
          ],
          note: 'Quelle: Deutsche Rentenversicherung, Seite Zuzahlung, Tabelle für das Kalenderjahr 2026, abgerufen am 07.10.2026. Die Staffelung gilt mit Kindergeldanspruch im Haushalt oder bei anerkannter Pflegebedürftigkeit. Die Zuzahlung ist nach dem Recht zu leisten, das bei der Antragstellung gilt. Den Befreiungsantrag gibt es beim Rentenversicherungsträger.',
        },
      ],
    },
    {
      id: 'krankenkasse',
      heading: 'Wie hoch ist die Zuzahlung bei der Reha der Krankenkasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hier sind es 10 EUR je Kalendertag, wenn du das 18. Lebensjahr vollendet hast, bei ambulanter und bei stationärer Reha (§ 40 Abs. 5 mit Abs. 1 und 2 und § 61 Satz 2 SGB V). Bei einer Anschlussrehabilitation zahlst du für längstens 28 Tage je Kalenderjahr. Als unmittelbar gilt der Anschluss auch, wenn die Maßnahme innerhalb von 14 Tagen beginnt (§ 40 Abs. 6 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Eine Einkommenstabelle wie bei der Rentenversicherung gibt es bei der Krankenkasse nicht. Dort schützt dich die Belastungsgrenze, mehr dazu weiter unten.',
        },
      ],
    },
    {
      id: 'krankenhaus-und-reha',
      heading: 'Wie lange zahlst du zu, wenn Krankenhaus und Reha zusammenkommen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der Krankenkasse teilen sich Krankenhaus und Anschlussreha eine Höchstdauer. Was du im selben Kalenderjahr schon für das Krankenhaus gezahlt hast, wird auf die Zuzahlung für die Anschlussreha angerechnet, und umgekehrt (§ 39 Abs. 4 und § 40 Abs. 6 SGB V). Zusammen zahlst du höchstens für 28 Tage, also bis zu 280 EUR im Jahr.',
        },
        {
          type: 'costCard',
          title: 'Reha und Krankenhaus: Zuzahlung im Rechenbeispiel',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit 10 EUR je Kalendertag nach geltendem Recht und für die Krankenhaustage mit dem SDK-Tarif Klinik 1-Bett (SP1) nach der Produktseite: Der Tarif übernimmt die gesetzliche Zuzahlung von 10 EUR je Kliniktag. Zur Reha-Zuzahlung steht auf der Produktseite nichts. Der Vertrag besteht schon, bevor der Aufenthalt feststeht.',
          caption: 'Kostenkarte: Zuzahlung bei Reha und Krankenhaus mit und ohne Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['21 Tage stationäre Reha der Krankenkasse', 'die Reha, bis auf die Zuzahlung', '210 EUR (21 mal 10 EUR)', 'Die Produktseite macht zur Reha-Zuzahlung keine Angabe'],
            ['21 Tage stationäre Reha der Krankenkasse ab 01.01.2027', 'die Reha, bis auf die Zuzahlung', '315 EUR (21 mal 15 EUR)', 'Die Produktseite macht zur Reha-Zuzahlung keine Angabe'],
            ['10 Tage Krankenhaus, danach 21 Tage Anschlussreha der Krankenkasse', 'Krankenhaus und Reha, bis auf die Zuzahlung', '280 EUR (10 Tage zu 10 EUR, dazu 18 Tage zu 10 EUR bis zur Höchstdauer von 28 Tagen)', 'Der Tarif übernimmt die 100 EUR für die 10 Krankenhaustage, für die Reha-Tage steht auf der Produktseite nichts'],
            ['21 Tage Reha der Rentenversicherung, monatliches Netto unter 1.583 EUR', 'die Reha', 'keine Zuzahlung nach Befreiungsantrag', 'nicht nötig'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Quellen: § 39 Abs. 4, § 40 Abs. 5 und 6, § 61 SGB V, Deutsche Rentenversicherung (Einkommenstabelle 2026), für 2027 § 61 SGB V in der Fassung des GKV-Beitragssatzstabilisierungsgesetzes (BGBl. 2026 I Nr. 228). Annahmen: erwachsen, vollstationär, keine Befreiung durch die Belastungsgrenze. Verbindlich sind der Bescheid deines Trägers und die Bedingungen deines Tarifs.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'belastungsgrenze',
      heading: 'Wann ist Schluss mit den Zuzahlungen der Krankenkasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wenn du deine Belastungsgrenze erreicht hast. Die Grenze liegt bei 2 Prozent der jährlichen Bruttoeinnahmen zum Lebensunterhalt, für schwerwiegend chronisch Kranke in Dauerbehandlung 1 Prozent (§ 62 SGB V). Hast du sie erreicht, stellt dir die Krankenkasse eine Bescheinigung aus, dass du für den Rest des Kalenderjahres nichts mehr zuzahlst.',
        },
        {
          type: 'paragraph',
          text: 'Ein einfaches Beispiel als eigene Rechnung: Bei Bruttoeinnahmen von 30.000 EUR im Jahr und ohne Familie im Haushalt sind 2 Prozent genau 600 EUR, bei 1 Prozent 300 EUR. Familienmitglieder im gemeinsamen Haushalt werden zusammengerechnet, es gibt Freibeträge. Berücksichtigt werden nur Zuzahlungen, die die gesetzlichen Krankenkassen für medizinisch notwendige Leistungen verlangen, nachgewiesen durch Quittungen (gesund.bund.de). Von selbst befreit dich die Kasse nicht, du musst die Belege im Blick behalten und die Befreiung beantragen.',
        },
      ],
    },
    {
      id: 'ab-2027',
      heading: 'Was ändert sich bei der Reha-Zuzahlung ab 2027?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der Krankenkasse steigt die Zuzahlung am 01.01.2027 auf 15 EUR je Kalendertag. Das steht im neu gefassten § 61 SGB V (GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228), auf den § 40 Abs. 5 und 6 SGB V für die Reha verweisen. Bei 21 Tagen sind das 315 statt 210 EUR. Die Belastungsgrenze nach § 62 SGB V ändert das Gesetz nicht.',
        },
        {
          type: 'paragraph',
          text: 'Für die Rentenversicherung verweist § 32 Abs. 1 SGB VI auf denselben Tagesbetrag. Eine Einkommenstabelle für 2027 hat die Rentenversicherung bis zum 07.10.2026 nicht veröffentlicht, ihre Seite zeigt die Werte für 2026. Darum rechnen wir dazu nichts.',
        },
      ],
    },
    {
      id: 'klinik-tarif',
      heading: 'Zahlt ein Klinik-Tarif die Reha-Zuzahlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dazu steht auf healio.de/stationaer nichts. Die Produktseite sagt nur: Der SDK-Tarif Klinik 1-Bett (SP1) übernimmt die gesetzliche Zuzahlung von 10 EUR je Kliniktag, an Tagen ohne Zuzahlung zahlt er 10 EUR Krankenhaustagegeld. Das bezieht sich auf das Krankenhaus. Eine Aussage zur Reha-Zuzahlung macht die Seite nicht, deshalb machen wir sie hier auch nicht.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Ein Klinik-Tarif ist keine Reha-Versicherung.', text: 'Die Klinik-Tarife auf healio.de/stationaer ergänzen den Aufenthalt im Krankenhaus mit Zimmer, privatärztlicher Behandlung und Klinikwahl. Zur Reha stehen dort keine Leistungen.' },
            { lead: 'Die Rentenversicherung rechnet nach Einkommen, die Kasse nach Belastungsgrenze.', text: 'Beide Wege führen zu unterschiedlichen Beträgen. Welcher Träger zuständig ist, entscheidet der Antrag, nicht diese Seite.' },
            { lead: 'Die Tabelle der Rentenversicherung gilt nur für 2026.', text: 'Die Rentenversicherung gibt ihre Einkommenstabelle jedes Jahr neu heraus. Für die Krankenkasse steht der Betrag ab 2027 schon im Gesetz, 15 EUR je Kalendertag.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'hospital',
          text: 'Du willst wissen, was ein Klinik-Tarif im Krankenhaus ergänzt? SP2, SP1 und SPU stehen nebeneinander.',
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
              tone: 'sky',
              title: 'Krankenhaustagegeld',
              text: 'Wie hoch, wie lange und was bei Reha gilt.',
              to: '/ratgeber/krankenhaustagegeld',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'protection',
              tone: 'lavender',
              title: 'Einzelzimmer-Zusatzversicherung',
              text: 'Was sie leistet, wenn dir das Zimmer wichtig ist.',
              to: '/ratgeber/zusatzversicherung-einzelzimmer',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK (SP1, SP2 und SPU) und der Bayerischen, für die Reha gibt es dort keine Leistung. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie hoch ist die Zuzahlung bei der Reha?',
      answer:
        'Als Erwachsener höchstens 10 EUR je Kalendertag, bei der Krankenkasse für ambulante und stationäre Reha, bei der Rentenversicherung nur für die stationäre. Die Rentenversicherung staffelt die Beträge in einer Tabelle nach Einkommen, wenn Kinder mit Kindergeldanspruch im Haushalt leben oder Pflegebedürftigkeit anerkannt ist. Ab 01.01.2027 sind es bei der Krankenkasse 15 EUR je Kalendertag.',
    },
    {
      question: 'Wie lange muss ich bei der Reha zuzahlen?',
      answer:
        'Bei der Rentenversicherung nach ihrer Angabe höchstens 42 Tage im Kalenderjahr, bei einer Anschlussrehabilitation höchstens 14 Tage. Bei der Krankenkasse gilt für die Anschlussreha eine Grenze von 28 Tagen im Kalenderjahr, die sie mit dem Krankenhaus teilt.',
    },
    {
      question: 'Wann entfällt die Zuzahlung bei der Reha?',
      answer:
        'Bei der Rentenversicherung für Menschen unter 18, für Bezieher von Übergangsgeld oder Bürgergeld und bei einem monatlichen Nettoeinkommen unter 1.583 EUR auf Antrag (Tabelle 2026). Bei der Krankenkasse, wenn du deine Belastungsgrenze von 2 Prozent der Bruttoeinnahmen erreicht hast, bei schwerwiegend chronisch Kranken 1 Prozent, und auch für Menschen unter 18.',
    },
    {
      question: 'Wie viel Reha-Zuzahlung gilt ab 2027?',
      answer:
        'Bei der Krankenkasse 15 statt 10 EUR je Kalendertag ab 01.01.2027, so steht es im neu gefassten § 61 SGB V. Bei 21 Tagen sind das 315 statt 210 EUR. Die Rentenversicherung zeigt auf ihrer Seite die Einkommenstabelle für 2026, die für 2027 hat sie bis zum 07.10.2026 nicht veröffentlicht.',
    },
    {
      question: 'Zählen Krankenhaus und Reha zusammen?',
      answer:
        'Ja, bei der Krankenkasse. Was du im selben Kalenderjahr für das Krankenhaus gezahlt hast, wird auf die Zuzahlung für die Anschlussreha angerechnet, zusammen höchstens für 28 Tage. Auch Zahlungen an die Rentenversicherung werden gegenseitig angerechnet.',
    },
    {
      question: 'Übernimmt mein Klinik-Tarif die Reha-Zuzahlung?',
      answer:
        'Auf healio.de/stationaer steht das nicht. Dort übernimmt der SDK-Tarif Klinik 1-Bett (SP1) die gesetzliche Zuzahlung von 10 EUR je Kliniktag im Krankenhaus. Zur Reha-Zuzahlung macht die Seite keine Aussage.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welcher Träger deine Reha zahlt, klärt der Antrag mit deiner Ärztin oder deinem Arzt. Zum Krankenhaus steht mehr im ' },
      { text: 'Krankenhaus-Überblick', to: '/ratgeber/stationaere-zusatzversicherung' },
      { text: ', die Klinik-Tarife findest du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Beträge, Dauer und Befreiung stammen von der Rentenversicherung, aus dem Gesetz und von gesund.bund.de, die Tarifaussagen von der Produktseite.',
    items: [
      {
        label: 'Zuzahlung (Warum Reha?)',
        publisher: 'Deutsche Rentenversicherung',
        href: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/Warum-Reha/zuzahlung',
        stand: 'Tabelle Kalenderjahr 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zuzahlung bei Rehabilitation (Meldung)',
        publisher: 'Deutsche Rentenversicherung',
        href: 'https://www.deutsche-rentenversicherung.de/DRV/DE/Ueber-uns-und-Presse/Presse/Meldungen/2025/251001-zuzahlung-bei-rehabilitation',
        stand: '23.09.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB VI § 32 Zuzahlung bei Leistungen zur medizinischen Rehabilitation',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_6/__32.html',
        stand: 'Fassung vor dem 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 40 Leistungen zur medizinischen Rehabilitation, Absatz 4 bis 6',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__40.html',
        stand: 'Fassung vor dem 01.01.2027',
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
        label: 'SGB V § 62 Belastungsgrenze',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__62.html',
        stand: 'Fassung vor dem 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Zuzahlungen und Zuzahlungsbefreiung',
        publisher: 'gesund.bund.de (Bundesgesundheitsministerium)',
        href: 'https://gesund.bund.de/zuzahlungen-und-zuzahlungsbefreiung',
        stand: '15.03.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Bundestag beschließt GKV-Beitragssatzstabilisierungsgesetz (Zuzahlungen plus 50 Prozent)',
        publisher: 'Bundesministerium für Gesundheit',
        href: 'https://www.bundesgesundheitsministerium.de/ministerium/meldungen/bundestag-beschliesst-gkv-beitragssatzstabilisierunggesetz-pm-10-07-2026',
        stand: '10.07.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228, Art. 1 Nr. 23 (§ 61 SGB V neu) und Art. 8 Abs. 2',
        publisher: 'Bundesgesetzblatt',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/VO.html',
        stand: 'Gesetz vom 24.07.2026, verkündet am 29.07.2026',
        accessedAt: '07.10.2026',
        note: '15 EUR je Kalendertag bei stationären Maßnahmen ab 01.01.2027, § 62 SGB V unverändert',
      },
      {
        label: 'Klinik-Tarife SDK (SP1, SP2, SPU) und Bayerische, Produktseite von Healio',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/stationaer',
        stand: '07.10.2026',
        accessedAt: '07.10.2026',
        note: 'Leistungen wortgleich mit der Seite healio.de/stationaer',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Zuzahlung und Befreiung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Produktseite. Maßgeblich sind immer der Bescheid deines Trägers und die Bedingungen des Versicherers.',
};

export default article;
