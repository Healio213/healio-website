/**
 * Krankenhaus-Ratgeber (Serie, Stapel krankenhaus-familie), Seite: Krankenhaustagegeld.
 *
 * Quellen (Belege je Zahl und Aussage in krankenhaustagegeld.belege.md, Abruf
 * 07.10.2026): PKV-Verband Musterbedingungen MB/KK 2009 (Stand Juni 2024, § 1
 * Abs. 1 und 2, § 5 Abs. 1 Buchst. d), Verbraucherzentrale (Stand 19.08.2025),
 * SGB V § 39 Abs. 4, § 40 Abs. 6, § 61, BMG Ratgeber Krankenhaus (2022), BMG
 * Meldung vom 10.07.2026, GKV-Beitragssatzstabilisierungsgesetz (BGBl. 2026 I
 * Nr. 228, Art. 1 Nr. 23 und Art. 8 Abs. 2, Wortlaut am 07.10.2026 im Prüflauf
 * gelesen). Tarifaussagen nur wie auf healio.de/stationaer (live abgerufen
 * 07.10.2026, Texte aus den Dateien src/i18n/locales/de/stationaer.json unter
 * "refresh" und den Komponenten unter src/components/sections/stationaer).
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne für den Tagessatz am Markt: Die neutralen Quellen
 *     nennen keine. Genannt wird nur der Wert der Produktseite (SP1, 10 EUR).
 *   - Das Ersatz-Krankenhaustagegeld "bis zu 100 EUR pro Tag" steht in der
 *     Datei stationaer.json nur in alten, nicht mehr gerenderten Schlüsseln
 *     (concept, benefits, ticker), nicht auf der Live-Seite. Es wird deshalb
 *     nicht erwähnt.
 *   - Die Datei stationaer.json nennt "Reha-Maßnahmen eingeschlossen" nur im
 *     alten Schlüssel concept, nicht auf der Live-Seite. Zu Tagegeld bei Reha
 *     sagt die Seite deshalb nur, was die Musterbedingungen des PKV-Verbands
 *     sagen, und dass die Produktseite dazu schweigt.
 *   - Zuzahlung ab 01.01.2027: 15 EUR je Kalendertag laut § 61 Satz 2 SGB V in
 *     der Fassung von Art. 1 Nr. 23 BGBl. 2026 I Nr. 228, in Kraft nach Art. 8
 *     Abs. 2 (Prüfung 07.10.2026). Was der SP1 ab 2027 übernimmt, sagt die Seite
 *     bewusst nicht (wie der Anlass-Ratgeber krankenhaus-zuzahlung-2027, der die
 *     Einzelheiten behandelt).
 *   - SPU: Die Formulierung der Produktseite zur Gesundheitsprüfung wird nicht
 *     übernommen (Sperrwort-Regel), die Seite sagt nur "ausschließlich
 *     unfallbedingt".
 *   - Keine Steuerfragen, keine Behandlungsempfehlung, keine Beitragsangabe.
 *   - Einbau 07.10.2026: Link und Karte auf krankenhaus-zuzahlung-2027 bis zum
 *     Einbau des Anlass-Ratgebers entfernt (serie/NACHZUTRAGEN.md).
 */

export const article = {
  slug: 'krankenhaustagegeld',
  kind: 'ratgeber',
  group: 'krankenhaus',

  metaTitle: 'Krankenhaustagegeld: wie hoch, wie lange, auch bei Reha? | Healio',
  metaDescription:
    'Krankenhaustagegeld einfach erklärt: wie hoch der Tagessatz ist, wie lange er gezahlt wird, was bei Reha gilt und was ein Klinik-Tarif der SDK dazu leistet.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 8,

  listTitle: 'Krankenhaustagegeld: wie hoch, wie lange, auch bei Reha?',
  listTeaser:
    'Was ein Krankenhaustagegeld ist, wie hoch es sein kann, was bei Reha gilt und wie es zur gesetzlichen Zuzahlung im Krankenhaus passt.',

  headline: 'Krankenhaustagegeld: wie hoch, wie lange, auch bei Reha?',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'hospital',
    facts: [
      { value: '10 EUR je Kliniktag', label: 'im SDK-Tarif Klinik 1-Bett (SP1), laut Produktseite' },
      { value: '28 Tage im Jahr', label: 'so lange zahlst du höchstens die gesetzliche Zuzahlung' },
      { value: 'je nach Tarif', label: 'ob ein Tagegeld bei Reha zahlt, steht in den Bedingungen' },
    ],
    text: 'Ein Krankenhaustagegeld zahlt einen festen Betrag für jeden Tag im Krankenhaus, ganz gleich, wie hoch deine Rechnung ist. Wie hoch der Betrag ist und wie lange er fließt, bestimmt der Tarif.',
    path: { to: '/stationaer', text: 'Welcher Klinik-Tarif zu dir passt', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Ein Krankenhaustagegeld ist ein vereinbarter Tagessatz für jeden Tag, den du stationär im Krankenhaus verbringst. Die Höhe legt der Tarif fest, eine einheitliche Zahl gibt es nicht. Auf dieser Seite siehst du, was die Musterbedingungen der Versicherer dazu sagen, wie die gesetzliche Zuzahlung im Krankenhaus dazu passt, was bei einer Reha gilt und was der SDK-Tarif Klinik 1-Bett auf healio.de/stationaer an Tagegeld mitbringt.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was ist ein Krankenhaustagegeld?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ein Krankenhaustagegeld ist ein fester Betrag, den der Versicherer für jeden Tag zahlt, an dem du stationär behandelt wirst. So beschreiben es die Musterbedingungen des PKV-Verbands: In der Krankenhaustagegeldversicherung zahlt der Versicherer bei stationärer Heilbehandlung ein Krankenhaustagegeld. Die Verbraucherzentrale nennt es einen vereinbarten Tagessatz für den Klinikaufenthalt, den Versicherte für weitere Kosten nutzen können, zum Beispiel für Fernseh- oder Telefongebühren.',
        },
        {
          type: 'paragraph',
          text: 'Der Betrag hängt nicht von deiner Rechnung ab. Es zählt, dass eine medizinisch notwendige Heilbehandlung wegen Krankheit oder Unfallfolgen stattfindet (§ 1 Abs. 2 MB/KK 2009). Mit einem Krankentagegeld hat das nichts zu tun. Das gleicht den Unterschied zwischen Krankengeld und Nettogehalt aus, wenn du länger arbeitsunfähig bist, und folgt anderen Regeln.',
        },
      ],
    },
    {
      id: 'wie-hoch',
      heading: 'Wie hoch ist das Krankenhaustagegeld?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das legt der Tarif fest. In den Quellen dieser Seite steht kein Marktdurchschnitt für den Tagessatz, deshalb nennen wir keine Spanne. Konkret ist die Produktseite von Healio: Der SDK-Tarif Klinik 1-Bett (SP1) übernimmt die gesetzliche Zuzahlung von 10 EUR je Kliniktag, an Tagen ohne Zuzahlung zahlt er 10 EUR Krankenhaustagegeld.',
        },
        {
          type: 'paragraph',
          text: 'Zum Vergleich die gesetzliche Zuzahlung. Wer das 18. Lebensjahr vollendet hat, zahlt im Krankenhaus 10 EUR je Kalendertag, längstens für 28 Tage im Kalenderjahr (§ 39 Abs. 4 SGB V). Das sind höchstens 280 EUR im Jahr. Kinder und Jugendliche unter 18 zahlen nichts, ebenso Schwangere, die zur Entbindung ins Krankenhaus kommen (BMG, Ratgeber Krankenhaus).',
        },
        {
          type: 'paragraph',
          text: 'Ab dem 01.01.2027 steigt dieser Betrag auf 15 EUR je Kalendertag, die Grenze von 28 Tagen bleibt. So steht es im neu gefassten § 61 SGB V (GKV-Beitragssatzstabilisierungsgesetz, BGBl. 2026 I Nr. 228).',
        },
      ],
    },
    {
      id: 'wie-lange',
      heading: 'Wie lange zahlt das Krankenhaustagegeld?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das steht in den Bedingungen des Tarifs. In den Musterbedingungen beginnt der Versicherungsfall mit der Heilbehandlung und endet, wenn nach medizinischem Befund keine Behandlungsbedürftigkeit mehr besteht (§ 1 Abs. 2 MB/KK 2009). Ob ein Tarif die Tage je Jahr oder je Aufenthalt begrenzt, regeln seine eigenen Bedingungen. Die Produktseite von Healio nennt für den SP1 keine Höchstdauer. Im Antrag und in den Bedingungen steht, was genau gilt.',
        },
        {
          type: 'paragraph',
          text: 'Hinter der Frage steckt oft die Zuzahlung. Die gesetzliche Zuzahlung endet nach 28 Tagen im Kalenderjahr. Was du im selben Jahr schon für eine Anschlussrehabilitation gezahlt hast, an die Krankenkasse oder an die Rentenversicherung, wird angerechnet (§ 39 Abs. 4 SGB V). An Tagen ohne Zuzahlung zahlt der SP1 laut Produktseite 10 EUR Krankenhaustagegeld.',
        },
      ],
    },
    {
      id: 'reha',
      heading: 'Zahlt das Krankenhaustagegeld auch bei einer Reha?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das entscheidet der Tarif, nicht das Wort Krankenhaustagegeld. Nach den Musterbedingungen des PKV-Verbands besteht keine Leistungspflicht für Kur- und Sanatoriumsbehandlung sowie für Rehabilitationsmaßnahmen der gesetzlichen Rehabilitationsträger, wenn der Tarif nichts anderes vorsieht (§ 5 Abs. 1 Buchst. d MB/KK 2009). Ob dein Tarif eine Ausnahme macht, siehst du in seinen Bedingungen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Zu den Klinik-Tarifen auf healio.de/stationaer steht keine Aussage zum Tagegeld bei Reha. Darum behaupten wir hier nicht, dass es gezahlt wird. Was bei einer Reha gesetzlich auf dich zukommt, getrennt nach Rentenversicherung und Krankenkasse, steht im Ratgeber ' },
            { text: 'Zuzahlung bei der Reha', to: '/ratgeber/reha-zuzahlung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'lohnt-sich',
      heading: 'Lohnt sich ein Krankenhaustagegeld?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Verbraucherzentrale hält die Krankenhaustagegeldversicherung für nicht notwendig, weil die Police nur für die Tage im Krankenhaus zahle und die eigene wirtschaftliche Existenz bei Krankheit nicht trage (Stand 19.08.2025). Als reines Einzelprodukt ist das ein nachvollziehbares Urteil.',
        },
        {
          type: 'paragraph',
          text: 'Ein Tagegeld ersetzt weder das Einbett- oder Zweibettzimmer noch die Behandlung durch den Chefarzt. Wer diese Wahlleistungen im Krankenhaus möchte, schaut eher auf einen Klinik-Tarif, der Zimmer und privatärztliche Behandlung erstattet und ein Tagegeld wie beim SP1 als Baustein mitbringt. Auf healio.de/stationaer findest du deshalb kein reines Tagegeld, sondern Klinik-Tarife: SP1, SP2 und SPU der SDK sowie Prestige, Komfort und Smart der Bayerischen.',
        },
        {
          type: 'costCard',
          title: 'Krankenhaus: wer was trägt, ein Rechenbeispiel',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der gesetzlichen Zuzahlung von 10 EUR je Kalendertag und dem SDK-Tarif Klinik 1-Bett (SP1) nach der Produktseite: Der Tarif übernimmt die Zuzahlung, an Tagen ohne Zuzahlung zahlt er 10 EUR Krankenhaustagegeld. Der Vertrag besteht schon, bevor der Aufenthalt feststeht.',
          caption: 'Kostenkarte: Zuzahlung im Krankenhaus mit und ohne Tarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['7 Tage im Krankenhaus, Erwachsener', 'die medizinisch notwendige Behandlung', 'Zuzahlung 70 EUR (7 mal 10 EUR)', 'Der Tarif übernimmt die 70 EUR Zuzahlung'],
            ['35 Tage im Krankenhaus, Erwachsener', 'die medizinisch notwendige Behandlung', 'Zuzahlung 280 EUR (28 mal 10 EUR), danach keine mehr', 'Der Tarif übernimmt die 280 EUR und zahlt für die weiteren 7 Tage je 10 EUR Tagegeld, zusammen 350 EUR'],
            ['7 Tage im Krankenhaus ab 01.01.2027', 'die medizinisch notwendige Behandlung', 'Zuzahlung 105 EUR (7 mal 15 EUR)', 'Was der SP1 ab 2027 übernimmt, regeln seine Bedingungen, die Produktseite nennt 10 EUR je Kliniktag'],
            ['Stationäre Reha', 'Rentenversicherung oder Krankenkasse, mit eigener Zuzahlung', 'siehe Ratgeber Zuzahlung bei der Reha', 'Tagegeld bei Reha: nach den Tarifbedingungen, auf der Produktseite nicht angegeben'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Zuzahlung nach § 39 Abs. 4 und § 61 SGB V (10 EUR je Kalendertag, längstens 28 Tage). Ab 01.01.2027 gelten 15 EUR je Kalendertag nach § 61 SGB V in der Fassung des GKV-Beitragssatzstabilisierungsgesetzes (BGBl. 2026 I Nr. 228). Tarifleistung nach healio.de/stationaer, abgerufen am 07.10.2026. Annahmen: vollstationärer Aufenthalt, Vertrag schon vor dem Versicherungsfall, deine Belastungsgrenze ist noch nicht erreicht. Verbindlich sind die Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Das Tagegeld im SP1 ist klein.', text: 'Mit 10 EUR je Kliniktag deckt der Tarif die heutige gesetzliche Zuzahlung, mehr nicht. Als Ersatz für entgangenes Einkommen taugt ein Krankenhaustagegeld nicht. Dafür gibt es das Krankentagegeld, über das die Verbraucherzentrale gesondert informiert.' },
            { lead: 'Reha ist eine eigene Frage.', text: 'Ob ein Tagegeld bei Reha zahlt, hängt am Tarif. Die Musterbedingungen schließen Reha der gesetzlichen Träger aus, wenn der Tarif nichts anderes sagt, und die Produktseite macht dazu keine Angabe.' },
            { lead: 'Ein Tarif hilft nur für Neues.', text: 'Versicherungsfälle, die vor Versicherungsbeginn eingetreten sind, sind nicht versichert. Wer schon weiß, dass er bald ins Krankenhaus muss, kann auf diesem Weg nichts mehr erstatten lassen.' },
          ],
        },
      ],
    },
    {
      id: 'schon-feststeht',
      heading: 'Was gilt, wenn der Krankenhausaufenthalt schon feststeht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dann ist es für einen neuen Tarif meist zu spät. Auf der Produktseite steht: Neue Versicherungsfälle sind ab Versicherungsbeginn geschützt, bereits vorher eingetretene sind nicht versichert. Für die SDK-Klinik-Tarife gibt es keine tarifliche Wartezeit. Die Bayerische kennt keine allgemeine Wartezeit, nur für Entbindung und Psychotherapie gelten acht Monate, nach einem Unfall entfallen auch diese.',
        },
        {
          type: 'paragraph',
          text: 'Bei SP1 und SP2 gehören Gesundheitsfragen zum Antrag. SPU gilt ausschließlich für unfallbedingte Behandlungen. Die verbindliche Annahme erfolgt erst im Antrag.',
        },
        {
          type: 'path',
          to: '/stationaer',
          icon: 'hospital',
          text: 'SP2, SP1 und SPU nebeneinander: Du siehst zuerst die Unterschiede und berechnest danach deinen Beitrag.',
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
              icon: 'medication',
              tone: 'sky',
              title: 'Zuzahlung bei der Reha',
              text: 'Rentenversicherung und Krankenkasse getrennt erklärt, mit Belastungsgrenze.',
              to: '/ratgeber/reha-zuzahlung',
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
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK (SP1, SP2 und SPU) und der Bayerischen. Ein reines Krankenhaustagegeld ist nicht darunter, im SP1 gehört ein Tagegeld als Baustein dazu. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was ist ein Krankenhaustagegeld?',
      answer:
        'Ein Krankenhaustagegeld ist ein vereinbarter fester Betrag für jeden Tag, den du stationär im Krankenhaus bist. Er hängt nicht von deiner Rechnung ab. Die Voraussetzung ist eine medizinisch notwendige Heilbehandlung wegen Krankheit oder Unfallfolgen.',
    },
    {
      question: 'Wie hoch ist das Krankenhaustagegeld im SDK-Tarif Klinik 1-Bett?',
      answer:
        'Laut Produktseite übernimmt der SP1 die gesetzliche Zuzahlung von 10 EUR je Kliniktag, an Tagen ohne Zuzahlung zahlt er 10 EUR Krankenhaustagegeld. Für SP2 und SPU steht dort kein Tagegeld. Die Bedingungen im Antrag sind verbindlich.',
    },
    {
      question: 'Zahlt das Krankenhaustagegeld auch bei einer Reha?',
      answer:
        'Das hängt vom Tarif. Nach den Musterbedingungen des PKV-Verbands gibt es für Reha der gesetzlichen Rehabilitationsträger keine Leistung, wenn der Tarif nichts anderes vorsieht. Auf healio.de/stationaer steht zum Tagegeld bei Reha nichts, deshalb sagen wir nicht, dass es gezahlt wird.',
    },
    {
      question: 'Wie viele Tage zahle ich im Krankenhaus die gesetzliche Zuzahlung?',
      answer:
        'Als Erwachsener zahlst du 10 EUR je Kalendertag, längstens für 28 Tage im Kalenderjahr. Was du im selben Jahr schon für eine Anschlussreha gezahlt hast, an die Krankenkasse oder die Rentenversicherung, wird angerechnet. Ab 01.01.2027 sind es 15 EUR je Kalendertag, so steht es im neu gefassten § 61 SGB V.',
    },
    {
      question: 'Ist ein Krankenhaustagegeld notwendig?',
      answer:
        'Die Verbraucherzentrale hält es für nicht notwendig, weil es nur für die Tage im Krankenhaus zahlt und nicht dazu beiträgt, deine wirtschaftliche Existenz bei Krankheit zu tragen. Wer Einbett- oder Zweibettzimmer und Chefarztbehandlung möchte, vergleicht eher Klinik-Tarife, bei denen ein Tagegeld nur ein Baustein ist.',
    },
    {
      question: 'Kann ich noch ein Krankenhaustagegeld abschließen, wenn die Behandlung schon geplant ist?',
      answer:
        'Für den Aufenthalt, der schon feststeht, nicht. Laut Produktseite sind bereits vor Versicherungsbeginn eingetretene Versicherungsfälle nicht versichert. Ein Abschluss zählt für neue Versicherungsfälle ab Versicherungsbeginn.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welche Klinik-Tarife es gibt und was sie unterscheidet, siehst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Was die Kasse im Krankenhaus zahlt, steht im ' },
      { text: 'Krankenhaus-Überblick', to: '/ratgeber/stationaere-zusatzversicherung' },
      { text: ', die Reha-Zuzahlung im Ratgeber ' },
      { text: 'Zuzahlung bei der Reha', to: '/ratgeber/reha-zuzahlung' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Begriffe und Reha-Regel stammen aus den Musterbedingungen, die Zuzahlung aus Gesetz und Ministerium, die Tarifaussagen von der Produktseite.',
    items: [
      {
        label: 'Musterbedingungen 2009 für die Krankheitskosten- und Krankenhaustagegeldversicherung (MB/KK 2009), § 1 und § 5',
        publisher: 'PKV-Verband',
        href: 'https://www.pkv.de/fileadmin/user_upload/PKV/3_PDFs/ABV_und_MB/MB-KK.pdf',
        stand: 'Juni 2024',
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
        label: 'SGB V § 61 Zuzahlungen',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__61.html',
        stand: 'Fassung vor dem 01.01.2027',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Ratgeber Krankenhaus, Abschnitt 2.4 Kosten des Krankenhausaufenthaltes',
        publisher: 'Bundesministerium für Gesundheit',
        href: 'https://www.bundesgesundheitsministerium.de/fileadmin/user_upload/220315_148x210_BMG_Ratgeber-Krankenhaus_bf.pdf',
        stand: 'Ausgabe 2022',
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
        note: '15 EUR je Kalendertag bei stationären Maßnahmen ab 01.01.2027',
      },
      {
        label: 'Klinik-Tarife SDK (SP1, SP2, SPU) und Bayerische, Produktseite von Healio',
        publisher: 'Healio GmbH',
        href: 'https://healio.de/stationaer',
        stand: '07.10.2026',
        accessedAt: '07.10.2026',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/stationaer',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Produktseite. Maßgeblich sind immer die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
