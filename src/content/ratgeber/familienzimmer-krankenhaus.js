/**
 * Familien-Ratgeber (Serie, Stapel familienplanung), Seite: Familienzimmer im
 * Krankenhaus, Kosten und wer zahlt.
 *
 * SPERRLISTEN-KANDIDAT: Der Pfad /ratgeber/familienzimmer-krankenhaus gehört in
 * GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js), wie alle Schwangerschafts-
 * und Babyseiten, damit auf dieser Seite weder Werbe-Messung noch Remarketing
 * laufen. Die Seite spricht niemanden als schwanger an und stellt keine
 * Gesundheitsfrage an die Leserin.
 *
 * Quellen (Belege je Zahl in familienzimmer-krankenhaus.belege.md, Abruf
 * 07.10.2026): Preislisten der Kliniken mit Datum (Klinikum Hochsauerland,
 * Stand 2026; InnKlinikum Altötting, Flyer 27.03.2026; Universitätsmedizin
 * Mainz, Stand 01.01.2026; Klinikum Dessau, 01.01.2026); Klinikseiten für
 * Verfügbarkeit und Reservierung (Robert Bosch Krankenhaus, München Klinik
 * Schwabing, Alb Fils Klinikum, Flyer 08/2025); SGB V § 24f und § 11 Abs. 3;
 * KHEntgG § 17 Abs. 1 und 2; AOK NordWest (Gesundheitsbudget); AVB B 275000
 * (Stand 11/2024) § 3 Abs. 2; Tarifbedingungen Komfort B 275005 und Prestige
 * B 275006 (Stand 11/2024) Ziffer 2.1 und 2.3; Produktsteckbrief B 275010;
 * Fachauskunft der Bayerischen an Healio vom 05.10.2026 (Familienzimmer über den
 * Vertrag der Mutter); Produktseite healio.de/stationaer (live 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Spanne als Durchschnitt: Es gibt keine neutrale bundesweite
 *     Zahl. Die Seite zeigt vier datierte Preislisten als Beispiele; die zwei
 *     Summen aus Einbettzimmer und Begleitperson (Mainz, Dessau) sind eigene
 *     Rechnung und so gekennzeichnet. Preise ohne Datum der Liste (z. B. von
 *     Klinikseiten) stehen nicht in der Tabelle.
 *   - Der Flyer des InnKlinikums Altötting nennt das Familienzimmer eine
 *     Leistung nur für Selbstzahler, die Zusatzversicherungen nicht übernehmen.
 *     Das steht als Hinweis der Klinik auf der Seite (Ehrlich gesagt); die
 *     Bedingungen der Bayerischen stehen daneben.
 *   - Eine bestehende oder bekannte Schwangerschaft ist für die Entbindung und
 *     damit für das Familienzimmer nicht mitversichert; die Seite beschreibt
 *     keinen Weg, sie beim Abschluss zu übergehen. Die Fragen im Antrag werden
 *     wahrheitsgemäß beantwortet.
 *   - Kein Kinderwunsch-Wort, kein NIPT, keine Nackenfaltenmessung. Ambulante
 *     Hebammenleistungen der Bayerischen werden nicht erwähnt.
 *   - Komfort: "Kosten in Höhe des Zweibettzimmers" steht so in Ziffer 2.1; die
 *     Seite rechnet keine Differenz, weil die Auslegung je Klinik vom
 *     Zweibettzimmer-Preis abhängt.
 *   - Kein Hinweis auf Verdienst oder Vergütung, keine Zusage zur
 *     Annahme des Antrags.
 *   - Geprüft am 07.10.2026 (Prüfbericht PRÜFBERICHT-familienplanung.md): alle
 *     Klinikpreise gegen die vier Listen nachgelesen (Hochsauerland "Stand
 *     2026", Datei vom 21.01.2026; InnKlinikum Flyer Nr. 080 vom 27.03.2026;
 *     Mainz Stand 01.01.2026; Dessau 01.01.2026). AOK NordWest mit
 *     Satzungsfundstelle (§ 8e Abs. 4 und § 8 Abs. 3, Stand 16.12.2025).
 *
 * SEO-Ausbau 21.10.2026 (Suchbegriff "familienzimmer krankenhaus kosten",
 * Auftrag SEO Zusatzversicherung 5, H1 unverändert):
 *   - Seitentitel mit Preisspanne 135 bis 150 EUR (kleinster Wert Mainz
 *     134,84 EUR, größter InnKlinikum 150 EUR, wie Vorspann und FAQ).
 *     Mainz und Dessau am 21.10.2026 neu geladen, ohne Abweichung.
 *     Hochsauerland zeigte am 21.10.2026 "Webservices vorübergehend
 *     deaktiviert", InnKlinikum war nicht erreichbar; beide Werte bleiben mit
 *     dem Abruf vom 07.10.2026 stehen.
 *   - Neuer Abschnitt Kind im Krankenhaus: § 11 Abs. 3 SGB V; Ziffer 2.3 der
 *     Tarifbedingungen Komfort B 275005, Prestige B 275006 und Smart B 275004
 *     (Stand 11/2024, Smart am 21.10.2026 neu geladen); Smart leistet nur bei
 *     Unfall und den in § 2 genannten schweren Erkrankungen. Kinderbeiträge
 *     0 bis 15 Jahre laut Produktsteckbrief B 275010 (08.2025), am 21.10.2026
 *     auf diebayerische.de neu geladen und mit der lokalen Fassung
 *     textgleich: Prestige 4,10, Komfort 3,20, Smart 2,10 EUR im Monat.
 *     Jahresbeträge (12 mal) eigene Rechnung. SDK Rooming-in unter 16 nach
 *     SP1/SP2 Nr. 8 und healio.de/stationaer; einen SDK-Kinderbeitrag nennt
 *     die Produktseite nicht, die Seite nennt keinen.
 *   - Neuer Abschnitt bestehende Schwangerschaft: AVB B 275000 § 2 Abs. 2
 *     (am 21.10.2026 neu geladen) und § 198 Abs. 1 und 3 VVG. "Ohne
 *     Gesundheitsprüfung" nur mit Elternteil und Zwei-Monats-Frist im selben
 *     Satz (Franks Regel 06.10.2026). Der Abschnitt spricht die Leserin nicht
 *     als schwanger an ("Wenn die Schwangerschaft schon besteht"). SDK
 *     ambulant ohne Wartezeit nach AVB AP-Tarife 1.753a Abschnitt II (am
 *     21.10.2026 neu geladen); "Gesundheitsfragen ja, keine Ablehnung".
 *   - Kassenbonus als Geheimtipp am Ende: IKK classic laut Satzung bis zu
 *     810 EUR, in der Schwangerschaft bis zu 1.155 EUR, breite Masse 400 bis
 *     700 EUR, Gegenrechnung mit dem Zusatzbeitrag 3,85 Prozent (Seite der
 *     IKK classic zu den Beitragssätzen, wie im IKK-Ratgeber).
 *   - Elternzimmer als Wort in Text und FAQ, AOK-Frage mit der vorhandenen
 *     Satzungsstelle der AOK NordWest.
 */

export const article = {
  slug: 'familienzimmer-krankenhaus',
  kind: 'ratgeber',
  group: 'familie',

  metaTitle: 'Familienzimmer Krankenhaus Kosten 2026: 135 bis 150 EUR | Healio',
  metaDescription:
    'Familienzimmer: rund 135 bis 150 EUR je Nacht. Die Kasse zahlt meist nicht, Klinikschutz nur vor der Schwangerschaft. Plus der Weg für dein Kind.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  updatedAt: '2026-10-21',
  updatedAtLabel: '21. Oktober 2026',
  readingTimeMinutes: 17,

  listTitle: 'Familienzimmer im Krankenhaus: Kosten und wer zahlt',
  listTeaser:
    'Was ein Familienzimmer nach der Geburt kostet, was die Kasse dazu zahlt und wie der Klinikschutz es trägt, mit Preislisten aus 2026.',

  headline: 'Familienzimmer im Krankenhaus: Kosten und wer zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'hospital',
    facts: [
      { value: '135 bis 150 EUR', label: 'je Nacht in vier Preislisten von 2026, als Beispiel' },
      { value: 'Wahlleistung', label: 'der Klinik, die Kasse zahlt sie nicht als Regelleistung' },
      { value: '8 Monate', label: 'Wartezeit für die Entbindung beim Klinikschutz der Bayerischen' },
    ],
    text: 'Das Familienzimmer bezahlst du in der Regel selbst. Ein Klinikschutz kann es tragen, wenn beim Abschluss keine Schwangerschaft besteht oder bekannt ist. Bei der Bayerischen muss er außerdem mindestens acht Monate vor der Geburt beginnen. Ist es dafür zu spät, bleibt der Weg für dein Kind: Es lässt sich ab der Geburt versichern, und sein Tarif kann deine Unterkunft zahlen, wenn du später bei ihm im Krankenhaus bleibst.',
    path: { to: '/stationaer#familie', text: 'Familienzimmer und Klinikschutz im Überblick', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Ein Familienzimmer oder ein Einbettzimmer mit Begleitperson liegt in den vier Preislisten von 2026, die wir uns angesehen haben, bei rund 135 bis 150 EUR je Nacht. Die Krankenkasse zahlt es nicht als Regelleistung. Ein Klinikschutz übernimmt es nur unter Bedingungen, die vor der Schwangerschaft erfüllt sein müssen.',

  sections: [
    {
      id: 'was-ist',
      heading: 'Was ist ein Familienzimmer im Krankenhaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ein Familienzimmer ist ein Zimmer auf der Wochenstation, in dem der Vater, die Partnerin oder eine andere Begleitperson mit Mutter und Baby übernachtet. Kliniken bieten es als Wahlleistung an, gegen Aufpreis und nur, wenn eines frei ist. Die München Klinik Schwabing schreibt dazu, es sei ausschließlich für gesetzlich Versicherte gedacht und müsse selbst gezahlt werden.',
        },
        {
          type: 'paragraph',
          text: 'Manche sagen auch Elternzimmer. Das kann dasselbe meinen oder das Bett für Mutter oder Vater neben einem kranken Kind. Für beides gelten andere Regeln, frag also nach, was deine Klinik mit dem Wort meint.',
        },
        {
          type: 'paragraph',
          text: 'Was dazugehört, unterscheidet sich von Haus zu Haus. Das InnKlinikum Altötting beschreibt Übernachtung im Einzelzimmer mit zusätzlichem Bett für den Vater, dazu Vollpension. Im Alb Fils Klinikum können Geschwisterkinder nicht im Familienzimmer aufgenommen werden. Frag deine Klinik, was im Preis steckt.',
        },
        {
          type: 'paragraph',
          text: 'Auch das Wort Rooming-in meint zweierlei. In der Klinik heißt es, dass dein Baby die ganze Zeit bei dir im Zimmer ist. In den Unterlagen von SDK und Bayerischer steht es für etwas anderes: Ein Elternteil wird als Begleitperson neben einem versicherten Kind unter 16 Jahren aufgenommen, und der Tarif zahlt Unterkunft und Verpflegung (bei der Bayerischen Ziffer 2.3 der Tarifbedingungen). Mit dem Familienzimmer nach einer Geburt hat das nichts zu tun.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet ein Familienzimmer nach der Geburt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das legt jede Klinik selbst fest. Eine neutrale Euro-Angabe für ganz Deutschland gibt es nicht, und einen Durchschnitt erfinden wir nicht. Die Tabelle zeigt vier datierte Preislisten von 2026. Zwei nennen ein Familienzimmer, bei den anderen beiden setzt sich der Preis aus Einbettzimmer und Begleitperson zusammen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Familienzimmer und Begleitperson in vier Preislisten von 2026',
          head: ['Klinik', 'Preisliste', 'Preis', 'Was dahintersteht'],
          rows: [
            [
              'Klinikum Hochsauerland',
              'Wahlleistungspreise Unterkunft, Stand 2026, Datei vom 21.01.2026',
              '140,00 EUR je Berechnungstag',
              'Familienzimmer Geburtshilfe',
            ],
            [
              'InnKlinikum Altötting',
              'Flyer Familienzimmer, 27.03.2026',
              '150 EUR je Nacht',
              'Einzelzimmer mit zusätzlichem Bett für den Vater, Vollpension, eine Begleitperson inklusive',
            ],
            [
              'Universitätsmedizin Mainz',
              'Entgelte Wahlleistung Unterkunft, Stand 01.01.2026',
              '134,84 EUR je Berechnungstag, eigene Rechnung',
              'Einbettzimmer 70,64 EUR plus Pauschale für die Begleitperson 64,20 EUR, die nur mit dem Einbettzimmer gebucht wird',
            ],
            [
              'Klinikum Dessau',
              'Wahlleistungstarif, 01.01.2026',
              '141,37 EUR je Nacht, eigene Rechnung',
              'Einbettzimmer auf der Normalstation 73,37 EUR plus Begleitperson im Patientenzimmer mit Verpflegung 68,00 EUR',
            ],
          ],
          note: 'Beispiele aus vier Häusern, keine Durchschnittspreise. Die Summen für Mainz und Dessau sind eigene Rechnung aus zwei Einzelpreisen der jeweiligen Liste. Dessau berechnet das Zimmer je Berechnungstag und die Begleitperson je Nacht. Alle Preise abgerufen am 7. Oktober 2026. Deine Klinik muss dich vor der Vereinbarung schriftlich oder in Textform über ihre Preise informieren (§ 17 Abs. 2 KHEntgG).',
        },
        {
          type: 'paragraph',
          text: 'Als Rechenbeispiel für drei Nächte ergibt das etwa 400 bis 450 EUR: 420,00 EUR im Klinikum Hochsauerland, 450 EUR im InnKlinikum, 404,52 EUR in Mainz und 424,11 EUR in Dessau. Das ist eigene Rechnung und keine Aussage darüber, wie lange ein Aufenthalt dauert. Das hängt vom Verlauf der Geburt ab.',
        },
      ],
    },
    {
      id: 'kasse',
      heading: 'Was zahlt die Krankenkasse beim Familienzimmer?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für dich und dein Neugeborenes zahlt die Kasse Unterkunft, Pflege und Verpflegung, wenn du stationär entbindest (§ 24f SGB V). Das Familienzimmer für die Begleitperson gehört nicht dazu. Es ist eine Wahlleistung, die du mit der Klinik vereinbarst und selbst zahlst.',
        },
        {
          type: 'paragraph',
          text: 'Anders ist es, wenn dein Neugeborenes selbst stationär behandelt wird. Dann umfasst die Kassenleistung auch die aus medizinischen Gründen notwendige Mitaufnahme einer Begleitperson. Bei Kindern unter neun Jahren wird diese Notwendigkeit unwiderlegbar vermutet (§ 11 Abs. 3 SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Einzelne Kassen geben freiwillig etwas dazu. Die AOK NordWest nennt in ihrer Satzung die Unterbringung einer Begleitperson im Familienzimmer als Mehrleistung für Schwangere (§ 8e Abs. 4). Die Kasse erstattet 80 Prozent je Rechnung, zusammen mit ihren anderen Mehrleistungen höchstens 500 EUR je Kalenderjahr (§ 8 Abs. 3). Was deine Kasse zahlt, steht in ihrer Satzung.',
        },
      ],
    },
    {
      id: 'klinikschutz',
      heading: 'Wie trägt der Klinikschutz das Familienzimmer?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nach den Bedingungen der Bayerischen kann die versicherte Person bei einer stationären Entbindung ein Familienzimmer wählen. Im Prestige nennen die Tarifbedingungen keine Begrenzung, im Komfort übernimmt der Tarif die Kosten in Höhe des Zweibettzimmers (Ziffer 2.1). Im Smart ist das Familienzimmer nicht enthalten.',
        },
        {
          type: 'paragraph',
          text: 'Bei der Bayerischen läuft das Familienzimmer über den Vertrag der Mutter, die als versicherte Person stationär aufgenommen wird. Ein Vertrag nur des Vaters reicht nicht.',
        },
        {
          type: 'paragraph',
          text: 'Dazu gilt, was für jede Entbindung gilt. Die besondere Wartezeit beträgt acht Monate ab Versicherungsbeginn (AVB B 275000, § 3 Abs. 2), und eine beim Abschluss bestehende oder bekannte Schwangerschaft ist für die Entbindung nicht mitversichert. Wer jetzt schwanger ist, bekommt das Familienzimmer bei dieser Geburt deshalb nicht mehr über einen neuen Klinikschutz.',
        },
        {
          type: 'paragraph',
          text: 'Bei der SDK ist das Familienzimmer bei der Entbindung im Tarif SP1 zu 100 Prozent enthalten, ohne tarifliche Wartezeit. Auch dort gilt: Wer beim Antrag schon schwanger ist, bekommt diese Entbindung nicht mitversichert.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was bei einer bestehenden Schwangerschaft noch geht, steht im Ratgeber ' },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: ', die Reihenfolge für alle, die ein Baby planen, im Ratgeber ' },
            { text: 'Baby geplant: Klinikschutz vor der Schwangerschaft abschließen', to: '/ratgeber/baby-geplant-zusatzversicherung' },
            { text: '.' },
          ],
        },
        {
          type: 'costCard',
          title: 'Familienzimmer, drei Nächte: wer was trägt',
          icon: 'hospital',
          tariffLabel: 'Gerechnet mit den Preisen zweier Preislisten von 2026 und dem Klinikschutz der Bayerischen. Der Vertrag beginnt mindestens 8 Monate vor der Geburt, beim Abschluss besteht keine Schwangerschaft und ist keine bekannt.',
          caption: 'Kostenkarte: Familienzimmer mit und ohne Klinikschutz',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            [
              'Familienzimmer, 3 Nächte, Klinikum Hochsauerland (140,00 EUR je Berechnungstag)',
              'nein, Wahlleistung der Klinik',
              '420,00 EUR',
              'Prestige: Familienzimmer bei stationärer Entbindung wählbar, ohne tarifliche Begrenzung. Komfort: übernimmt die Kosten in Höhe des Zweibettzimmers (Ziffer 2.1)',
            ],
            [
              'Familienzimmer, 3 Nächte, InnKlinikum Altötting (150 EUR je Nacht, eine Begleitperson inklusive)',
              'nein',
              '450 EUR',
              'Wie oben. Die Klinik schreibt im Flyer, sie biete das Familienzimmer nur für Selbstzahler an und Zusatzversicherungen übernähmen es nicht. Kläre vorab, wie sie abrechnet',
            ],
            [
              'Der Vertrag besteht nur auf den Namen des Vaters',
              'nein',
              'wie oben',
              'Nicht versichert, das Familienzimmer läuft über den Vertrag der Mutter',
            ],
            [
              'Die Schwangerschaft besteht oder ist beim Abschluss bekannt, oder das Kind kommt vor Ablauf der 8 Monate zur Welt',
              'nein',
              'wie oben',
              'Nicht versichert',
            ],
          ],
          note: 'Beispielrechnung für drei Nächte, keine Preisangabe und keine Aussage zur üblichen Aufenthaltsdauer. Preise: Klinikum Hochsauerland, Stand 2026, und InnKlinikum Altötting, Flyer vom 27.03.2026 (eigene Rechnung: 3 mal 140,00 EUR und 3 mal 150 EUR). Tarif nach den Tarifbedingungen Prestige und Komfort, Ziffer 2.1 (Stand 11/2024), der Auskunft der Bayerischen vom 5. Oktober 2026 und healio.de/stationaer. Erstattet wird nach den Bedingungen auf eingereichte Kostenbelege.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'schwangerschaft-besteht',
      heading: 'Was geht noch, wenn die Schwangerschaft schon besteht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für das Familienzimmer dieser Geburt ist es dann zu spät. Ein neuer Klinikschutz zahlt weder die Entbindung noch das Zimmer, wenn die Schwangerschaft beim Abschluss besteht oder bekannt ist. Für dein Kind ist es dagegen nicht zu spät.',
        },
        {
          type: 'paragraph',
          text: 'Dein Baby kann ab der Geburt einen eigenen Klinikschutz bekommen, ohne Gesundheitsprüfung, ohne Risikozuschlag und ohne Wartezeit, wenn ein Elternteil am Tag der Geburt seit mindestens drei Monaten bei der Bayerischen versichert ist und du dein Baby spätestens zwei Monate nach der Geburt anmeldest (AVB B 275000, § 2 Abs. 2). Das gilt auch für Geburtsschäden, angeborene Krankheiten und Anomalien. Mehr als diese drei Monate darf kein Versicherer verlangen (§ 198 Abs. 3 VVG). Bei der SDK reicht es, wenn ein Elternteil am Tag der Geburt im Klinik-Tarif versichert ist.',
        },
        {
          type: 'paragraph',
          text: 'Eine Grenze hat das: Dein Kind ist höchstens so umfassend versichert wie der Elternteil (§ 198 Abs. 1 VVG). Soll es Prestige bekommen, braucht ein Elternteil selbst Prestige.',
        },
        {
          type: 'paragraph',
          text: 'Praktisch heißt das: Ein Elternteil schließt bei der Bayerischen spätestens drei Monate vor dem errechneten Termin ab. Für dein Kind reicht einer, das kann auch der Vater sein, anders als beim Familienzimmer, das über den Vertrag der Mutter läuft. Plan Puffer ein: Kommt dein Baby früher, zählt der Tag der Geburt, nicht der Termin. Die Gesundheitsfragen im Antrag werden wahrheitsgemäß und vollständig beantwortet.',
        },
        {
          type: 'paragraph',
          text: 'Auch ambulant geht in der Schwangerschaft noch etwas. Der Vorsorge-Topf der SDK zahlt Untersuchungen, die die Kasse nicht übernimmt, und die ambulanten Tarife der SDK haben keine Wartezeit (AVB AP-Tarife 1.753a, Abschnitt II). Gesundheitsfragen gibt es im Antrag, eine Ablehnung nicht.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was der Vorsorge-Topf zahlt und wo seine Grenzen liegen, steht auf ' },
            { text: 'healio.de/schwangerschaft', to: '/schwangerschaft' },
            { text: '. Alle Fristen für dein Baby findest du im Ratgeber ' },
            { text: 'Neugeborenes versichern', to: '/ratgeber/neugeborenes-versichern' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'kind-krankenhaus',
      heading: 'Wer zahlt das Familienzimmer, wenn dein Kind ins Krankenhaus muss?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dann geht es nicht um die Wochenstation, sondern darum, ob du als Begleitperson mit aufgenommen wirst. Bei Kindern unter neun Jahren gilt das als medizinisch notwendig, und die Kasse zahlt deine Unterkunft und Verpflegung (§ 11 Abs. 3 SGB V). Ab neun zahlt sie nur, wenn die Mitaufnahme im Einzelfall medizinisch notwendig ist. Ohne diesen Grund zahlst du in der Regel selbst.',
        },
        {
          type: 'paragraph',
          text: 'Hier hilft ein Klinikschutz, der auf dein Kind läuft. Bei der Bayerischen zahlen Komfort, Prestige und Smart Unterkunft und Verpflegung eines Elternteils zu 100 Prozent, wenn du als Begleitperson neben deinem versicherten Kind unter 16 aufgenommen wirst, soweit die Kasse die Kosten nicht trägt (Ziffer 2.3 der Tarifbedingungen). Komfort und Prestige leisten bei jedem medizinisch notwendigen Klinikaufenthalt. Smart leistet nur nach einem Unfall und bei den schweren Krankheiten, die der Tarif aufzählt, etwa Krebs oder Herzinfarkt. Bei der SDK heißt die Leistung Rooming-in, in SP1 und SP2 für Kinder, die zu Beginn der Behandlung jünger als 16 sind.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Klinikschutz für Kinder bis 15 Jahre: Beitrag und Elternteil im Krankenhaus',
          head: ['Tarif', 'Beitrag 0 bis 15 Jahre', 'Wann der Tarif leistet', 'Elternteil im Krankenhaus'],
          rows: [
            [
              'Bayerische Prestige',
              '4,10 EUR im Monat, 49,20 EUR im Jahr',
              'Bei jedem medizinisch notwendigen Klinikaufenthalt, Ein- oder Zweibettzimmer und Chefarzt',
              'Unterkunft und Verpflegung zu 100 Prozent, Kind unter 16, soweit die Kasse nicht zahlt',
            ],
            [
              'Bayerische Komfort',
              '3,20 EUR im Monat, 38,40 EUR im Jahr',
              'Bei jedem medizinisch notwendigen Klinikaufenthalt, Zweibettzimmer und Chefarzt',
              'Wie Prestige',
            ],
            [
              'Bayerische Smart',
              '2,10 EUR im Monat, 25,20 EUR im Jahr',
              'Nur nach einem Unfall und bei schweren Krankheiten aus der Liste des Tarifs, die erstmals nach Versicherungsbeginn festgestellt werden',
              'Wie Prestige, aber nur in diesen Fällen',
            ],
            [
              'SDK SP1 und SP2',
              'Für Kinder nennt healio.de/stationaer keinen Beitrag, das Angebot richtet sich nach dem Alter',
              'Bei Krankheit und Unfall, SP1 Ein- oder Zweibettzimmer, SP2 Zweibettzimmer',
              'Rooming-in für Kinder, die zu Beginn der Behandlung jünger als 16 sind',
            ],
          ],
          note: 'Beiträge der Bayerischen laut Produktsteckbrief B 275010 (08.2025), abgerufen am 21. Oktober 2026. Jahresbeträge eigene Rechnung (12 mal Monatsbeitrag). Leistungen nach den Tarifbedingungen Prestige B 275006, Komfort B 275005 und Smart B 275004 (Stand 11/2024), Ziffer 2.3, bei Smart zusätzlich § 2, für die SDK nach healio.de/stationaer. Beiträge können sich ändern, maßgeblich ist dein Angebot.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Für ein älteres Kind schließt du ganz normal ab und beantwortest die Gesundheitsfragen im Antrag. Für ein Neugeborenes gilt der Weg aus dem Abschnitt davor. Wie Kasse und Tarif bei Kindern zusammenspielen, steht im Ratgeber ' },
            { text: 'Krankenhauszusatzversicherung für Kinder', to: '/ratgeber/krankenhauszusatzversicherung-kinder' },
            { text: '.' },
          ],
        },
        {
          type: 'path',
          to: '/stationaer#familie',
          icon: 'family',
          text: 'Kinder-Tarife, Rooming-in und die Aufnahme deines Babys siehst du im Überblick für Familien.',
          label: 'Kinder-Klinikschutz ansehen',
        },
      ],
    },
    {
      id: 'vorab-buchen',
      heading: 'Kann ich das Familienzimmer vorab buchen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Meist nicht verbindlich. Das Robert Bosch Krankenhaus schreibt, dass sich Familienzimmer nicht vorab reservieren lassen und bei voller Belegung auch einmal nicht zu vergeben sind. Die München Klinik bietet es nur bei Verfügbarkeit an. Frag deshalb vor der Geburt, wie deine Klinik es handhabt.',
        },
        {
          type: 'paragraph',
          text: 'Eine Wahlleistung muss vor der Erbringung schriftlich oder in Textform vereinbart sein, und die Klinik muss dich vorher über die Entgelte informieren (§ 17 Abs. 2 KHEntgG). Lass dir den Preis je Nacht nennen und frag, ob die Begleitperson und die Verpflegung darin stecken.',
        },
        {
          type: 'path',
          to: '/stationaer#familie',
          icon: 'hospital',
          text: 'Wie Klinikschutz, Familienzimmer und die Aufnahme des Babys zusammenhängen, siehst du im Überblick für werdende Eltern.',
          label: 'Klinik-Tarife ansehen',
        },
      ],
    },
    {
      id: 'grenzen',
      heading: 'Wo liegen die Grenzen?',
      blocks: [
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Die Preise sind Beispiele aus vier Häusern.', text: 'Deine Klinik kann anders rechnen. Frag nach dem Preis je Nacht, nach der Begleitperson und danach, ob Verpflegung dabei ist.' },
            { lead: 'Eine Klinik kann die Abrechnung anders sehen als der Tarif.', text: 'Das InnKlinikum Altötting schreibt im Flyer, das Familienzimmer sei nur für Selbstzahler und werde von Zusatzversicherungen nicht übernommen. In den Tarifbedingungen der Bayerischen ist das Familienzimmer bei einer stationären Entbindung genannt. Frag vor der Geburt, wie deine Klinik abrechnet, und lass dir eine Rechnung geben, die du beim Versicherer einreichen kannst.' },
            { lead: 'Für diese Geburt ist es zu spät, wenn die Schwangerschaft besteht.', text: 'Eine beim Abschluss bestehende oder bekannte Schwangerschaft ist für die Entbindung nicht mitversichert. Die Fragen im Antrag beantwortest du wahrheitsgemäß und vollständig. Für dein Kind bleibt der Weg ab der Geburt, wie oben beschrieben.' },
            { lead: 'Smart ist kein Rundumschutz für Kinder.', text: 'Der günstigste Tarif der Bayerischen zahlt die Begleitperson nur nach einem Unfall und bei den schweren Krankheiten aus seiner Liste. Soll der Tarif bei jedem medizinisch notwendigen Klinikaufenthalt leisten, braucht dein Kind bei der Bayerischen Komfort oder Prestige.' },
            { lead: 'Auch ein versichertes Familienzimmer gibt es nur bei Verfügbarkeit.', text: 'Der Tarif zahlt, wenn die Klinik eines frei hat. Er sorgt nicht dafür, dass eines frei ist.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'family',
              tone: 'mint',
              title: 'Baby geplant: Klinikschutz vor der Schwangerschaft',
              text: 'Die Reihenfolge von der Kasse bis zur Anmeldung des Babys.',
              to: '/ratgeber/baby-geplant-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'butter',
              title: 'Neugeborenes versichern',
              text: 'Familienversicherung, Zusatzversicherung ab Geburt und alle Fristen.',
              to: '/ratgeber/neugeborenes-versichern',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'pregnancy',
              tone: 'lavender',
              title: 'Schwanger: welcher Zusatzschutz jetzt noch geht',
              text: 'Was bei einer bestehenden Schwangerschaft noch möglich ist.',
              to: '/ratgeber/schwanger-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'hospital',
              tone: 'sky',
              title: 'Stationäre Zusatzversicherung',
              text: 'Was die Kasse im Krankenhaus zahlt und was du selbst zahlst.',
              to: '/ratgeber/stationaere-zusatzversicherung',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
    {
      id: 'kassenbonus',
      heading: 'Geheimtipp: Wie trägt dein Kassenbonus den Beitrag mit?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Erst der Schutz, dann der Bonus. Viele Krankenkassen zahlen ihren Bonus auf Wunsch als Zuschuss zu einer Zusatzversicherung. Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, beides theoretische Höchstwerte. Realistisch liegen aktive Versicherte in der breiten Masse bei 400 bis 700 EUR im Jahr. Der Zuschuss trägt den Beitrag deiner Zusatzversicherung mit, höchstens bis zur Höhe der nachgewiesenen Kosten. Dagegen steht der Zusatzbeitrag der Kasse, bei der IKK classic 3,85 Prozent seit August 2026. Rechne also beides gegeneinander. Welche Kasse du wählst, entscheidest du.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Zum Vergleich: Der Kinder-Tarif der Bayerischen kostet je nach Stufe 25,20 bis 49,20 EUR im Jahr. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus. Welche Kasse wie viel zahlt, vergleichst du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: '.' },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK und der Bayerischen. Das Familienzimmer bei der Entbindung ist im Prestige der Bayerischen ohne tarifliche Begrenzung enthalten, im Komfort in Höhe des Zweibettzimmers, bei der SDK im Tarif SP1, jeweils nur, wenn beim Abschluss keine Schwangerschaft bestand oder bekannt war, bei der Bayerischen außerdem erst nach acht Monaten Wartezeit. Muss ein versichertes Kind unter 16 ins Krankenhaus, zahlen Komfort, Prestige und Smart der Bayerischen Unterkunft und Verpflegung eines Elternteils als Begleitperson, soweit die Kasse sie nicht trägt; Smart nur nach Unfall und bei den im Tarif genannten schweren Krankheiten. Ein Neugeborenes lässt sich nach § 198 VVG rückwirkend ab der Geburt nachversichern, wenn ein Elternteil am Tag der Geburt versichert ist, bei der Bayerischen seit mindestens drei Monaten, und die Anmeldung spätestens zwei Monate nach der Geburt erfolgt. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet ein Familienzimmer im Krankenhaus?',
      answer:
        'Das legt jede Klinik selbst fest. In vier datierten Preislisten von 2026 liegt ein Familienzimmer oder ein Einbettzimmer mit Begleitperson bei rund 135 bis 150 EUR je Nacht. Das sind Beispiele, keine Durchschnittspreise. Frag deine Klinik nach dem Preis und danach, was darin steckt.',
    },
    {
      question: 'Was kostet ein Elternzimmer im Krankenhaus?',
      answer:
        'Ist damit das Zimmer nach der Geburt gemeint, gilt dasselbe wie beim Familienzimmer: In vier Preislisten von 2026 kostet es rund 135 bis 150 EUR je Nacht. Geht es um ein Bett neben deinem kranken Kind, zahlt bei Kindern unter neun Jahren die Kasse (§ 11 Abs. 3 SGB V). Frag deshalb nach, welches Zimmer die Klinik meint.',
    },
    {
      question: 'Zahlt die Krankenkasse das Familienzimmer?',
      answer:
        'In der Regel nicht. Die Kasse zahlt für dich und dein Neugeborenes Unterkunft, Pflege und Verpflegung bei der stationären Entbindung. Das Familienzimmer für die Begleitperson ist eine Wahlleistung der Klinik. Einzelne Kassen geben laut Satzung etwas dazu, etwa die AOK NordWest mit 80 Prozent je Rechnung aus einem Jahrestopf von höchstens 500 EUR für alle ihre Mehrleistungen.',
    },
    {
      question: 'Zahlt die AOK das Familienzimmer?',
      answer:
        'Das hängt von deiner AOK ab, denn jede regelt solche Extras in ihrer eigenen Satzung. Die AOK NordWest nennt die Unterbringung einer Begleitperson im Familienzimmer als Mehrleistung für Schwangere (§ 8e Abs. 4). Die Kasse erstattet 80 Prozent je Rechnung, zusammen mit ihren anderen Mehrleistungen höchstens 500 EUR je Kalenderjahr (§ 8 Abs. 3, Satzung Stand 16.12.2025). Bist du bei einer anderen AOK, schau vor der Geburt in deren Satzung oder frag dort nach.',
    },
    {
      question: 'Was ist der Unterschied zwischen Familienzimmer und Rooming-in?',
      answer:
        'Das Familienzimmer ist ein Zimmer nach der Geburt, in dem eine Begleitperson mit Mutter und Baby übernachtet, als Wahlleistung der Klinik. Rooming-in heißt in der Klinik, dass dein Baby bei dir im Zimmer bleibt. In der Versicherung ist Rooming-in die Aufnahme eines Elternteils als Begleitperson neben einem versicherten Kind unter 16 Jahren.',
    },
    {
      question: 'Zahlt eine Zusatzversicherung das Familienzimmer bei der Geburt?',
      answer:
        'Bei den Klinik-Tarifen auf healio.de/stationaer ja, wenn der Schutz rechtzeitig besteht. Bei der Bayerischen wählt die versicherte Person das Familienzimmer bei stationärer Entbindung, im Prestige ohne tarifliche Begrenzung, im Komfort in Höhe des Zweibettzimmers, nach einer Wartezeit von acht Monaten. Bei der SDK zahlt SP1 das Familienzimmer bei der Entbindung. Bei beiden ist eine beim Abschluss bestehende oder bekannte Schwangerschaft für die Entbindung nicht mitversichert.',
    },
    {
      question: 'Gilt dafür der Vertrag des Vaters?',
      answer:
        'Nein. Bei der Bayerischen läuft das Familienzimmer über den Vertrag der Mutter als versicherte und stationär aufgenommene Person. Ein Vertrag nur des Vaters reicht nicht.',
    },
    {
      question: 'Was geht noch, wenn die Schwangerschaft schon besteht?',
      answer:
        'Das Familienzimmer dieser Geburt zahlt ein neuer Klinikschutz nicht mehr. Dein Baby kannst du aber ab der Geburt versichern, ohne Gesundheitsprüfung und ohne Wartezeit, wenn ein Elternteil am Tag der Geburt seit mindestens drei Monaten bei der Bayerischen versichert ist und du es spätestens zwei Monate nach der Geburt anmeldest. Bei der SDK reicht es, wenn ein Elternteil am Tag der Geburt versichert ist. Der Schutz deines Kindes reicht höchstens so weit wie der des Elternteils.',
    },
    {
      question: 'Wer zahlt, wenn ich bei meinem Kind im Krankenhaus bleibe?',
      answer:
        'Bei Kindern unter neun Jahren die Kasse, weil das Gesetz die medizinische Notwendigkeit vermutet (§ 11 Abs. 3 SGB V). Ab neun zahlt sie nur, wenn deine Mitaufnahme im Einzelfall medizinisch notwendig ist. Ist dein Kind bei der Bayerischen versichert, zahlen Komfort, Prestige und Smart deine Unterkunft und Verpflegung zu 100 Prozent, solange es jünger als 16 ist und soweit die Kasse nicht zahlt, Smart allerdings nur nach Unfall und bei schweren Krankheiten aus seiner Liste. Für Kinder bis 15 kostet das 2,10 bis 4,10 EUR im Monat.',
    },
    {
      question: 'Kann ich ein Familienzimmer vorab reservieren?',
      answer:
        'Meist nicht verbindlich. Kliniken vergeben es nach Belegung. Das Robert Bosch Krankenhaus schreibt, dass sich Familienzimmer nicht vorab reservieren lassen. Frag bei der Anmeldung zur Geburt, wie deine Klinik vorgeht, und lass dir die Preise schriftlich nennen.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Die Klinik-Tarife von SDK und Bayerischer vergleichst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Den Überblick für Familien mit Krankenhaus, Zahn und Brille gibt die Bereichsseite ' },
      { text: 'Zusatzversicherung Kinder: was die Kasse zahlt und welcher Zusatzschutz passt', to: '/ratgeber/zusatzversicherung-kinder' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-21',
    checkedAtLabel: '21. Oktober 2026',
    intro: 'Die Preise, die Regeln der Kasse und die Leistungen der Tarife stammen aus diesen Quellen. Die Preislisten aus Mainz und Dessau, die Kinderbeiträge, die Nachversicherung und die Wartezeit der ambulanten SDK-Tarife haben wir am 21. Oktober 2026 noch einmal nachgelesen.',
    items: [
      {
        label: 'Wahlleistungspreise Unterkunft, Familienzimmer Geburtshilfe',
        publisher: 'Klinikum Hochsauerland',
        href: 'https://www.klinikum-hochsauerland.de/fileadmin/user_upload/Klinikum-Hochsauerland/Patienten_und_Besucher/Wahlleistungspreise_Stand_2026.pdf',
        stand: 'Stand 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Flyer Familienzimmer, Kosten je Nacht',
        publisher: 'InnKlinikum Altötting und Mühldorf',
        href: 'https://www.innklinikum.de/fileadmin/user_upload/Altoetting/Gynaekologie_und_Geburtshilfe/PDF/Flyer_Familienzimmer_DRUCK_03.26.pdf',
        stand: '27.03.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Entgelte für Wahlleistung Unterkunft nach § 17 KHEntgG',
        publisher: 'Universitätsmedizin Mainz',
        href: 'https://www.unimedizin-mainz.de/fileadmin/kliniken/kl33/Dokumente/UEbersicht_Entgelte_fuer_Wahlleistung_Unterkunft_UM_Stand_01.01.2026.pdf',
        stand: '01.01.2026',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Entgelte für Wahlleistungen, Unterkunft und Begleitperson',
        publisher: 'Klinikum Dessau',
        href: 'https://klinikum-dessau.de/fileadmin/user_upload/Patienten_und_Besucher/Wahlleistungstarif_2026_01_01.pdf',
        stand: '01.01.2026',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Familienzimmer und Rooming-in auf der Wochenbettstation',
        publisher: 'Robert Bosch Krankenhaus Stuttgart',
        href: 'https://www.rbk.de/behandlung/schwangerschaft-und-geburt/ihr-kind-ist-da',
        stand: 'ohne Datum',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wahlleistungen, Familienzimmer',
        publisher: 'München Klinik Schwabing',
        href: 'https://www.muenchen-klinik.de/krankenhaus/schwabing/patientenservice/wahlleistungen/',
        stand: 'ohne Datum',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Flyer „Ich bin da“, Wahlleistung Familienzimmer',
        publisher: 'Alb Fils Klinikum Göppingen',
        href: 'https://www.alb-fils-klinikum.de/fileadmin/default/50_Kliniken/Geburtshilfe/Flyer_Ich_bin_da_NEU_WEB_08_2025.pdf',
        stand: '08/2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 24f (Entbindung) und § 11 Abs. 3 (Begleitperson)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__24f.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'KHEntgG § 17 (Wahlleistungen)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/khentgg/__17.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'VVG § 198 Abs. 1 und 3 (Kindernachversicherung, Mindestversicherungsdauer höchstens drei Monate)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__198.html',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Satzung der AOK NordWest, § 8 Abs. 3 und § 8e Abs. 4 (Familienzimmer, 80 Prozent, 500 EUR je Kalenderjahr)',
        publisher: 'AOK NordWest',
        href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/nordwest/pdf/satzung.pdf',
        stand: '16.12.2025 (41. Nachtrag)',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Gesundheitsbudget, Schwangerschaft und Geburt',
        publisher: 'AOK NordWest',
        href: 'https://www.aok.de/mk/nordwest/aok-gesundheitsbudget-aok-nordwest/schwangerschaft-geburt/',
        stand: 'ohne Datum',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen Krankheitskostenversicherung 2025 (B 275000), § 2 Abs. 2 (Neugeborene) und § 3 (Wartezeiten)',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:0159d4a8-b666-4f77-a345-9acdb8e95608/275000_allgemeine_versicherungsbedingungen_krankheitskostenversicherung.pdf',
        stand: '11/2024',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Prestige 2025 (B 275006), Ziffer 2.1 und 2.3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:4195af63-fc92-4395-88fc-8db70f6a0d47/275006_besondere_tarifbedingungen_krankenhauszusatzversicherung_2025_prestige.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Komfort 2025 (B 275005), Ziffer 2.1 und 2.3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:d6054602-ee8e-4fe9-ab8a-3f01aec1bdef/275005_besondere_tarifbedingungen-krankenhauszusatzversicherung_2025_komfort.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Smart 2025 (B 275004), § 2 (versicherte Erkrankungen und Unfall) und Ziffer 2.3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:1cf90a79-59c2-4ae7-bcb1-4bf2dc6353f0/275004_besondere-tarifbedingungen_krankenhauszusatzversicherung_2025_smart.pdf',
        stand: '11/2024',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Produktsteckbrief Krankenhauszusatzversicherung (B 275010), Familienzimmer je Tarif, Rooming-in und Monatsbeiträge 0 bis 15 Jahre',
        publisher: 'die Bayerische',
        href: 'https://www.diebayerische.de/dam/jcr:227f34cd-b427-43f6-8537-ff9afcd0d4f4/275010_produktsteckbrief_krankenhauszusatzversicherung_bf.pdf',
        stand: '08.2025',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Fachauskunft der Bayerischen an Healio zum Familienzimmer',
        publisher: 'die Bayerische',
        stand: '05.10.2026',
      },
      {
        label: 'Klinik-Tarife der SDK und der Bayerischen (Familienzimmer, Wartezeit)',
        publisher: 'healio.de/stationaer',
        href: 'https://healio.de/stationaer',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen Teil I (1.751), Abschnitt A.5, Neugeborene, und Tarife SP1 (1.754a) und SP2 (1.755a), Nr. 8 Rooming In',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        stand: '01.01.2022 und 01.08.2025',
      },
      {
        label: 'AVB Zusatzversicherung AP-Tarife (1.753a), Abschnitt II Wartezeiten',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Satzung der IKK classic (Bonusprogramm, Zuschusswerte)',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/19885-satzung-kv-incl-sana-78-80-20260801.pdf',
        stand: '01.08.2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Beitragssätze, Zusatzbeitrag 3,85 Prozent seit 1. August 2026',
        publisher: 'IKK classic',
        href: 'https://www.ikk-classic.de/pk/rv/beitraege/beitragssaetze',
        accessedAt: '21.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Preise nach den genannten Preislisten der Kliniken von 2026, zu Tarifen nach dem Stand der Unterlagen vom 7. und 21. Oktober 2026. Maßgeblich sind immer die Preisliste deiner Klinik und die Bedingungen des Versicherers.',
};

export default article;
