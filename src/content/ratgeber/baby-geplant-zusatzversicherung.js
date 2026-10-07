/**
 * Familien-Ratgeber (Serie, Stapel familienplanung), Seite: Baby geplant,
 * Zusatzversicherung vor der Schwangerschaft abschließen.
 *
 * SPERRLISTEN-KANDIDAT: Der Pfad /ratgeber/baby-geplant-zusatzversicherung
 * gehört in GOOGLE_ADS_EXCLUDED_PATHS (src/lib/google-ads.js), wie alle
 * Schwangerschafts- und Babyseiten, damit auf dieser Seite weder Werbe-Messung
 * noch Remarketing laufen. Die Seite spricht niemanden als schwanger an, stellt
 * keine Gesundheitsfrage an die Leserin und führt keine Gesundheitsdaten.
 *
 * Quellen (Belege je Zahl in baby-geplant-zusatzversicherung.belege.md, Abruf
 * 07.10.2026): AVB B 275000 (Stand 11/2024) § 1 Abs. 2, § 2 Abs. 1 und 2, § 3
 * Abs. 2; Tarifbedingungen Komfort B 275005 und Prestige B 275006 (Stand
 * 11/2024) Ziffer 2.1 bis 2.3 und § 1; Informationsblatt B 275003 (Mindest-
 * vertragsdauer); Produktsteckbrief B 275010 (08.2025, Beitragstabelle und
 * Wortlaut der Gesundheitsfrage); Fachauskunft der Bayerischen an Healio vom
 * 05.10.2026 und Franks Bestätigung vom 07.10.2026 (Familienzimmer über den
 * Vertrag der Mutter, Abschluss vor einer bekannten Schwangerschaft); SGB V
 * § 24f und § 175; VVG § 19; Preisliste Klinikum Hochsauerland (Stand 2026);
 * Produktseiten healio.de/stationaer und healio.de/ambulant (live 07.10.2026).
 *
 * Bewusste Grenzen:
 *   - Eine bestehende oder bekannte Schwangerschaft (auch nach einem positiven
 *     Test) ist für die Entbindung nicht mitversichert; die Seite beschreibt
 *     keinen Weg, sie beim Abschluss zu übergehen, und nennt die wahrheitsgemäße
 *     Beantwortung der Fragen im Antrag (§ 19 VVG) ausdrücklich.
 *   - Kein Kinderwunsch-Wort, keine Kinderwunsch-Behandlung, kein NIPT, keine
 *     Nackenfaltenmessung. Ambulante Hebammenleistungen der Bayerischen werden
 *     nicht beworben (stehen nicht in den Bedingungen); Hebammenhilfe zu Hause
 *     wird als Kassenleistung genannt.
 *   - Die Wartezeit von acht Monaten steht nur für die Bayerische (AVB § 3
 *     Abs. 2). Die SDK hat laut Produktseite keine tarifliche Wartezeit; für
 *     beide gilt auf der Produktseite: Wer beim Antrag schon schwanger ist,
 *     bekommt diese Entbindung nicht mitversichert.
 *   - IKK classic: laut Satzung bis zu 810 EUR Zuschusswert im Jahr, in der
 *     Schwangerschaft bis zu 1.155 EUR, beides theoretische Höchstwerte;
 *     "realistisch 400 bis 700 EUR" in der breiten Masse ohne Zuschreibung,
 *     wie in den übrigen Ratgebern (Entscheidung Marktanalyse 07.10.2026). Die
 *     Gegenrechnung mit dem Zusatzbeitrag und die Wahlfreiheit stehen im selben
 *     Absatz. Bonus nie als Geld, immer als zweckgebundener Zuschuss zum Beitrag.
 *   - Kind ab Geburt "ohne Gesundheitsprüfung" nur mit den Voraussetzungen im
 *     selben Satz (Franks Regel 06.10.2026, AVB § 2 Abs. 2: Elternteil am Tag
 *     der Geburt mindestens drei Monate versichert, Anmeldung binnen zwei
 *     Monaten). Der Vertragstest des Serienzweigs sperrt die Formel bisher auch
 *     im Kind-Zusammenhang; beim Einbau anpassen wie Commit 5bf4c8c.
 *   - Maßgeblich ist, ob beim Abschluss eine Schwangerschaft besteht oder
 *     bekannt ist (Fachauskunft Lexhaller 05.10. und 07.10.2026), nicht eine
 *     ärztliche Feststellung. Die Seite beschreibt keinen Weg über die Zeit
 *     zwischen Test und Arztbesuch.
 *   - Leitgedanke Franks vom 07.10.2026 für den Werbetest (Anzeigentitel
 *     "Heute regeln, später froh sein", "Die Entscheidung vor dem Baby"): im
 *     Vorspann als Feststellung an alle Lesenden, Checkliste nach Zeitpunkten
 *     (heute, ab Versicherungsbeginn, nach der Geburt), Abschnitte zum Kind ab
 *     Geburt und zur nächsten Schwangerschaft (nur, was AVB § 2 Abs. 1 bis 3,
 *     § 3, TB Ziffer 2.1 bis 2.3 und SDK AVB A.5, SP1/SP2 Nr. 8 tragen; keine
 *     pauschale Zusage für alle Geburtskomplikationen). Nie als Ansprache an
 *     Schwangere. Merken nur über Lesezeichen oder Teilen, kein Formular, keine
 *     E-Mail-Erinnerung (Double-Opt-in entscheidet Frank später).
 *   - Geprüft am 07.10.2026 (Prüfbericht PRÜFBERICHT-familienplanung.md).
 *   - Kosten der Klinik nur aus einer datierten Preisliste (Klinikum
 *     Hochsauerland, Stand 2026) als Beispiel, keine Durchschnittspreise.
 *   - Keine Aussage zu Verdienst oder Vergütung, keine Zusage zur Annahme des
 *     Antrags.
 */

export const article = {
  slug: 'baby-geplant-zusatzversicherung',
  kind: 'ratgeber',
  group: 'familie',

  metaTitle: 'Zusatzversicherung vor der Schwangerschaft abschließen | Healio',
  metaDescription:
    'Baby geplant? Warum der Klinikschutz vor der Schwangerschaft stehen muss, was die Wartezeit von 8 Monaten bedeutet und die Checkliste in der richtigen Reihenfolge.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 13,

  listTitle: 'Baby geplant: Klinikschutz vor der Schwangerschaft abschließen',
  listTeaser:
    'Warum die Zusatzversicherung vor der Schwangerschaft stehen muss, was nach 8 Monaten gilt und die Checkliste von der Krankenkasse bis zur Anmeldung des Babys.',

  headline: 'Baby geplant? Die Zusatzversicherung vor der Schwangerschaft abschließen',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'family',
    facts: [
      { value: 'Vor der Schwangerschaft', label: 'Klinikschutz abschließen, solange keine besteht oder bekannt ist' },
      { value: '8 Monate', label: 'Wartezeit für die Entbindung bei der Bayerischen' },
      { value: '2 Monate', label: 'nach der Geburt das Baby in der Zusatzversicherung anmelden' },
    ],
    text: 'Wer ein Baby plant, regelt den Klinikschutz am besten heute, solange keine Schwangerschaft besteht oder bekannt ist. Eine schon bestehende Schwangerschaft ist für diese Entbindung nicht mehr mitversichert.',
    path: { to: '/stationaer#familie', text: 'Klinikschutz für die Familie vergleichen', label: 'Klinik-Tarife ansehen' },
  },

  lead: 'Die eine Entscheidung vor dem Baby, über die du später froh bist: den Klinikschutz abschließen, solange keine Schwangerschaft besteht oder bekannt ist. Bei der Bayerischen kommt für die Entbindung eine Wartezeit von acht Monaten dazu. Hier findest du die Reihenfolge, die Fristen und die Grenzen, so wie sie in den Bedingungen stehen.',

  sections: [
    {
      id: 'wann-abschliessen',
      heading: 'Wann solltest du die Zusatzversicherung vor der Schwangerschaft abschließen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'So früh, dass der Vertrag schon läuft, wenn eine Schwangerschaft beginnt. Bei der Bayerischen gilt für die Entbindung eine besondere Wartezeit von acht Monaten, gerechnet ab Versicherungsbeginn (AVB B 275000, § 3 Abs. 2). Eine allgemeine Wartezeit gibt es dort nicht, nach einem Unfall entfallen die Wartezeiten.',
        },
        {
          type: 'paragraph',
          text: 'Auf healio.de/stationaer stehen zwei Klinik-Versicherer. Die SDK hat keine tarifliche Wartezeit. Wer beim Antrag schon schwanger ist, bekommt die Entbindung bei beiden nicht mitversichert. Die Tabelle zeigt für die Bayerische, was in welcher Lage gilt.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Was bei der Bayerischen gilt, je nachdem wann der Vertrag beginnt (Klinik-Tarife Komfort und Prestige)',
          head: ['Lage', 'Entbindung', 'Familienzimmer', 'Dein Baby'],
          rows: [
            [
              'Der Vertrag beginnt mindestens 8 Monate vor der Geburt. Beim Abschluss besteht keine Schwangerschaft und ist keine bekannt.',
              'Versichert nach den Tarifbedingungen',
              'Über den Vertrag der Mutter: im Prestige ohne tarifliche Begrenzung, im Komfort in Höhe des Zweibettzimmers',
              'Ist ein Elternteil am Tag der Geburt seit mindestens 3 Monaten versichert und meldest du dein Baby binnen 2 Monaten an, nimmt die Bayerische es ohne Gesundheitsprüfung auf',
            ],
            [
              'Das Kind kommt vor Ablauf der 8 Monate zur Welt, auch als Frühgeburt.',
              'Nicht versichert',
              'Nicht versichert',
              'Anmeldung möglich, wenn die Voraussetzungen erfüllt sind',
            ],
            [
              'Beim Abschluss oder bei Vertragsbeginn besteht schon eine Schwangerschaft oder ist bekannt, auch nach einem positiven Test.',
              'Für diese Entbindung nicht mitversichert',
              'Nicht versichert',
              'Anmeldung möglich, wenn ein Elternteil am Tag der Geburt seit mindestens 3 Monaten versichert ist',
            ],
          ],
          note: 'Nach AVB B 275000 § 2 und § 3, den Tarifbedingungen Komfort und Prestige (Stand 11/2024) und healio.de/stationaer. Das Familienzimmer läuft über den Vertrag der Mutter. Ob ein Antrag angenommen wird, entscheidet die Bayerische im Antrag.',
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
      id: 'schon-schwanger',
      heading: 'Was gilt, wenn die Schwangerschaft schon besteht oder bekannt ist?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dann ist die Entbindung dieser Schwangerschaft nicht mitversichert. Ein Vertrag, der erst während einer bekannten Schwangerschaft beginnt, deckt sie nicht nachträglich. Wer die Schwangerschaft kennt oder nach einem Test vermutet, schließt den Klinikschutz deshalb nicht mehr für diese Geburt ab.',
        },
        {
          type: 'paragraph',
          text: 'So steht es in den Unterlagen der Bayerischen. Untersuchung und Behandlung wegen Schwangerschaft und die Entbindung zählen als Versicherungsfall (AVB B 275000, § 1 Abs. 2), und für Versicherungsfälle vor Beginn des Versicherungsschutzes wird nicht geleistet (§ 2 Abs. 1). Im Produktsteckbrief steht unter den Gesundheitsfragen, dass laufende oder angeratene Untersuchungen oder Behandlungen, auch im Zusammenhang mit einer Schwangerschaft und Entbindung, nicht mitversichert sind. Die Bayerische hat uns bestätigt, dass der Tarif vor einer bekannten Schwangerschaft abgeschlossen sein muss. Es kommt darauf an, ob beim Abschluss eine Schwangerschaft besteht oder bekannt ist, nicht darauf, ob ein Arzt sie schon festgestellt hat.',
        },
        {
          type: 'paragraph',
          text: 'Die Fragen im Antrag beantwortest du wahrheitsgemäß und vollständig. Das verlangt das Gesetz: Wer dem Versicherer Umstände verschweigt, nach denen er gefragt hat, riskiert, dass der Versicherer vom Vertrag zurücktritt (§ 19 VVG). Wir sagen dir ehrlich, wenn ein Tarif für deine Lage nichts mehr bringt.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was bei einer bestehenden Schwangerschaft ambulant und für dein Baby noch geht, steht im Ratgeber ' },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'checkliste',
      heading: 'Was regelst du heute, und was erst nach der Geburt?',
      blocks: [
        {
          type: 'steps',
          heading: 'Heute regeln, später froh sein',
          items: [
            {
              title: 'Heute: Krankenkasse und Bonusprogramm prüfen',
              text: 'Viele Kassen zahlen rund um Schwangerschaft und Baby Extras, manche nur, wenn Mutter und Kind bei ihnen versichert sind. Dazu kommt das Bonusprogramm. Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, beides theoretische Höchstwerte. Realistisch liegen aktive Versicherte in der breiten Masse bei 400 bis 700 EUR im Jahr. Der Zuschuss kann den Beitrag deiner Zusatzversicherung mittragen, höchstens bis zur Höhe der nachgewiesenen Kosten. Dagegen steht der Zusatzbeitrag der Kasse, rechne beides gegeneinander. Welche Kasse du wählst, entscheidest du. Warst du mindestens zwölf Monate bei deiner Kasse, kannst du zum Ablauf des übernächsten Kalendermonats wechseln, an die neue Kasse bist du dann wieder mindestens zwölf Monate gebunden (§ 175 Abs. 4 SGB V). Den Klinikschutz musst du deshalb nicht aufschieben, denn die Tarife stehen gesetzlich Versicherten unabhängig von der Kasse offen.',
            },
            {
              title: 'Heute: Klinikschutz abschließen, solange keine Schwangerschaft besteht oder bekannt ist',
              text: 'Zur Wahl stehen Komfort und Prestige der Bayerischen sowie SP1 und SP2 der SDK, alle auf healio.de/stationaer. Bei der Bayerischen läuft der Vertrag zunächst 24 Monate. Mit 21 bis 30 Jahren kostet der Komfort 10,20 EUR im Monat und das Prestige 13,40 EUR, mit 31 bis 45 Jahren 13,90 EUR und 17,60 EUR. Das Familienzimmer bei der Entbindung ist im Prestige ohne tarifliche Begrenzung enthalten, im Komfort übernimmt der Tarif dafür die Kosten in Höhe des Zweibettzimmers.',
            },
            {
              title: 'Ab Versicherungsbeginn: die 8 Monate im Blick behalten',
              text: 'Bei der Bayerischen ist die Entbindung erst nach acht Monaten ab Versicherungsbeginn versichert. Kommt ein Kind vor Ablauf dieser Zeit zur Welt, auch als Frühgeburt, zahlt der Tarif die Entbindung nicht. Für dein Baby zählt außerdem, dass ein Elternteil am Tag der Geburt seit mindestens drei Monaten versichert ist. Je früher der Vertrag beginnt, desto mehr Puffer hast du, falls ein Baby früher kommt. Die SDK hat keine tarifliche Wartezeit.',
            },
            {
              title: 'Dazu: ambulanten Vorsorgeschutz prüfen',
              text: 'Der Vorsorge-Topf der SDK AP-Tarife zahlt Untersuchungen, die die Kasse nicht übernimmt, zum Beispiel Toxoplasmose-Test, Streptokokken-Test oder zusätzliche Ultraschall-Untersuchungen. Eine Wartezeit gibt es nicht. Je nach Tarifstufe werden 50 bis 100 Prozent erstattet, höchstens 200 bis 500 EUR je zwei Kalenderjahre. Entbindung und Schwangerschaftsbeschwerden zahlt der ambulante Tarif nicht. Insgesamt baut der ambulante Tarif nach healio.de/ambulant ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren auf, die Vorsorge ist ein Teil davon.',
            },
            {
              title: 'Nach der Geburt: dein Baby binnen 2 Monaten anmelden',
              text: 'Bei der Krankenkasse über die Familienversicherung, beim Zusatzversicherer spätestens zwei Monate nach der Geburt. Kommt die Anmeldung rechtzeitig und sind die Voraussetzungen erfüllt, ist dein Baby rückwirkend ab der Geburt versichert. Was das bringt, steht im nächsten Abschnitt.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Alle Fristen für dein Baby stehen im Ratgeber ' },
            { text: 'Neugeborenes versichern', to: '/ratgeber/neugeborenes-versichern' },
            { text: ', was die Kassen rund um das Baby zahlen, im Ratgeber ' },
            { text: 'Babybonus Krankenkasse 2026', to: '/ratgeber/babybonus-krankenkasse' },
            { text: '.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Damit du die Fristen nicht suchen musst, speichere dir diese Seite als Lesezeichen oder schick sie an die Person, mit der du das Baby planst.',
        },
      ],
    },
    {
      id: 'kind-ab-geburt',
      heading: 'Was hat dein Kind davon, wenn es ab der Geburt versichert ist?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Niemand weiß vorher, wie eine Geburt verläuft. Deshalb zählt neben der Entbindung auch der Schutz deines Kindes vom ersten Tag an. Ist ein Elternteil am Tag der Geburt seit mindestens drei Monaten bei der Bayerischen versichert und meldest du dein Kind spätestens zwei Monate nach der Geburt an, ist es rückwirkend ab Vollendung der Geburt versichert, ohne Gesundheitsprüfung, ohne Risikozuschlag und ohne Wartezeit (AVB B 275000, § 2 Abs. 2). Bei der SDK reicht es, wenn ein Elternteil zur Zeit der Geburt dort versichert ist und die Anmeldung binnen zwei Monaten kommt.',
        },
        {
          type: 'paragraph',
          text: 'Der Schutz gilt dann auch für Geburtsschäden, angeborene Krankheiten und Anomalien. Je nach Tarif bekommt dein Kind im Krankenhaus Chefarzt und Ein- oder Zweibettzimmer, höchstens so umfassend wie beim versicherten Elternteil. Ohne diese Nachversicherung stellt der Versicherer bei einem späteren Antrag fürs Kind Gesundheitsfragen, und ein Befund aus der Zeit der Geburt kann den Abschluss dann erschweren.',
        },
        {
          type: 'paragraph',
          text: 'Muss dein versichertes Kind ins Krankenhaus, kann ein Elternteil bei ihm bleiben. Komfort und Prestige der Bayerischen zahlen Unterkunft und Verpflegung eines Elternteils als Begleitperson zu 100 Prozent, solange das Kind jünger als 16 Jahre ist und soweit die Kasse die Kosten nicht trägt (Ziffer 2.3 der Tarifbedingungen). Bei der SDK heißt das Rooming-in und gilt ebenfalls für versicherte Kinder unter 16. Bei Kindern unter neun Jahren vermutet das Gesetz, dass die Mitaufnahme medizinisch notwendig ist, dann zahlt sie die Kasse (§ 11 Abs. 3 SGB V). Beides setzt voraus, dass dein Kind selbst versichert ist.',
        },
      ],
    },
    {
      id: 'naechste-schwangerschaft',
      heading: 'Was gilt in der nächsten Schwangerschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Jede Schwangerschaft ist anders. Wer weitere Kinder plant, hat dann schon den laufenden Vertrag. Beginnt die nächste Schwangerschaft nach dem Abschluss und sind bis zur Geburt die acht Monate um, ist bei der Bayerischen auch diese Entbindung versichert, mit dem Familienzimmer im Prestige ohne tarifliche Begrenzung und im Komfort in Höhe des Zweibettzimmers. Die SDK hat keine tarifliche Wartezeit.',
        },
        {
          type: 'paragraph',
          text: 'Wer erst während einer bestehenden oder bekannten Schwangerschaft abschließt, hat diese eine Entbindung nicht versichert. Das Kind lässt sich trotzdem nachversichern. Bei der Bayerischen muss der Vertrag eines Elternteils am Tag der Geburt seit mindestens drei Monaten laufen, bei der SDK reicht es, wenn ein Elternteil zur Zeit der Geburt versichert ist. Angemeldet wird bei beiden binnen zwei Monaten. Der versicherte Elternteil kann auch der Vater sein. Für die Entbindung und das Familienzimmer zählt dagegen der Vertrag der Mutter.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was in einer bestehenden Schwangerschaft sonst noch geht, steht im Ratgeber ' },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet die Klinik nach der Geburt und was trägt der Tarif?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Kasse zahlt die Entbindung selbst. Wer stationär entbindet, hat für sich und das Neugeborene Anspruch auf Unterkunft, Pflege und Verpflegung (§ 24f SGB V). Zimmerzuschlag und Familienzimmer sind Wahlleistungen der Klinik und kosten extra. Die Klinik legt die Preise selbst fest, deshalb zeigt die Karte ein datiertes Beispiel statt eines Durchschnitts.',
        },
        {
          type: 'costCard',
          title: 'Klinik nach der Geburt: wer was trägt',
          icon: 'hospital',
          tariffLabel: 'Gerechnet mit dem Prestige der Bayerischen. Der Vertrag beginnt mindestens 8 Monate vor der Geburt, beim Abschluss besteht keine Schwangerschaft und ist keine bekannt. Preise aus der Preisliste des Klinikums Hochsauerland, Stand 2026.',
          caption: 'Kostenkarte: Zimmer und Familienzimmer nach der Geburt, mit und ohne Klinikschutz',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            [
              'Entbindung und allgemeine Leistungen im Krankenhaus',
              'Unterkunft, Pflege und Verpflegung für dich und das Neugeborene',
              'nur, was du als Wahlleistung vereinbarst',
              'Die Kasse bleibt zuständig, der Tarif ergänzt die Wahlleistungen',
            ],
            [
              'Einbettzimmer als Wahlleistung, im Beispiel je Berechnungstag',
              'nein, das Zimmer ist Wahlleistung',
              '120,00 bis 199,00 EUR je Berechnungstag, je nach Kategorie',
              'Das Prestige ersetzt 100 % der gesondert berechenbaren Unterkunft und Verpflegung im Ein- oder Zweibettzimmer',
            ],
            [
              'Familienzimmer in der Geburtshilfe, im Beispiel je Berechnungstag',
              'nein',
              '140,00 EUR je Berechnungstag',
              'Prestige: Familienzimmer bei stationärer Entbindung wählbar, ohne tarifliche Begrenzung. Komfort: Kosten in Höhe des Zweibettzimmers',
            ],
            [
              'Wie die beiden Zeilen davor, aber beim Abschluss oder bei Vertragsbeginn besteht schon eine Schwangerschaft oder ist bekannt',
              'wie oben',
              'wie oben',
              'Für diese Entbindung nicht mitversichert',
            ],
            [
              'Wie die beiden Zeilen davor, aber das Kind kommt vor Ablauf der 8 Monate zur Welt, auch als Frühgeburt',
              'wie oben',
              'wie oben',
              'Nicht versichert',
            ],
          ],
          note: 'Beispielrechnung, keine Preisangabe. Preise: Klinikum Hochsauerland, Wahlleistungspreise Unterkunft, Stand 2026, abgerufen am 7. Oktober 2026. Kassenleistung nach § 24f SGB V. Tarif nach den Tarifbedingungen Prestige und Komfort (Stand 11/2024) und healio.de/stationaer. Erstattet wird nach den Bedingungen auf eingereichte Kostenbelege, ob die Bayerische einen Antrag annimmt, entscheidet sie im Antrag.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
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
            { lead: 'Eine bestehende oder bekannte Schwangerschaft ist für die Entbindung nicht mitversichert.', text: 'Das gilt bei der SDK und bei der Bayerischen für jeden Klinikschutz, der erst während der Schwangerschaft abgeschlossen wird. Die Fragen im Antrag beantwortest du wahrheitsgemäß und vollständig.' },
            { lead: 'Der Beitrag läuft, auch wenn das Baby auf sich warten lässt.', text: 'Der Vertrag läuft zunächst 24 Monate. Bezahlt wird er in dieser Zeit in jedem Fall.' },
            { lead: 'Die acht Monate sind eine harte Grenze.', text: 'Kommt ein Kind vor Ablauf der Wartezeit zur Welt, auch als Frühgeburt, zahlt der Tarif die Entbindung nicht.' },
            { lead: 'Den Antrag entscheidet der Versicherer.', text: 'Vor dem Abschluss stehen Gesundheitsfragen im Antrag, die verbindliche Annahme erfolgt erst dort.' },
            { lead: 'Die Hebammenhilfe zahlt deine Krankenkasse.', text: 'Vorsorge in der Schwangerschaft, Hausbesuche im Wochenbett und der Rückbildungskurs gehören zur Hebammenhilfe der gesetzlichen Krankenkasse.' },
          ],
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'hospital',
              tone: 'sky',
              title: 'Familienzimmer im Krankenhaus',
              text: 'Was es kostet, wer zahlt und wie der Klinikschutz es trägt.',
              to: '/ratgeber/familienzimmer-krankenhaus',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'family',
              tone: 'butter',
              title: 'Neugeborenes versichern',
              text: 'Familienversicherung, Zusatzversicherung ab Geburt und alle Fristen.',
              to: '/ratgeber/neugeborenes-versichern',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'bonus',
              tone: 'mint',
              title: 'Babybonus Krankenkasse 2026',
              text: 'Was die Kassen rund um Schwangerschaft und Baby zahlen.',
              to: '/ratgeber/babybonus-krankenkasse',
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
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für das Krankenhaus vermittelt Healio die Klinik-Tarife der SDK und der Bayerischen. Wer beim Antrag schon schwanger ist, bekommt diese Entbindung bei keinem der beiden mitversichert. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wann sollte man eine Krankenhauszusatzversicherung vor der Schwangerschaft abschließen?',
      answer:
        'Bevor eine Schwangerschaft besteht oder bekannt ist. Bei der Bayerischen muss der Vertrag außerdem mindestens acht Monate vor der Geburt beginnen, die SDK hat keine tarifliche Wartezeit. Für dein Baby gilt bei der Bayerischen eine zweite Frist: Ist ein Elternteil am Tag der Geburt seit mindestens drei Monaten versichert und meldest du dein Baby binnen zwei Monaten an, nimmt sie es ohne Gesundheitsprüfung auf.',
    },
    {
      question: 'Zahlt eine Zusatzversicherung die Geburt?',
      answer:
        'Die Kasse zahlt die Entbindung mit Unterkunft, Pflege und Verpflegung für dich und das Neugeborene. Ein Klinik-Tarif zahlt je nach Tarif Wahlleistungen wie Ein- oder Zweibettzimmer, privatärztliche Behandlung und das Familienzimmer. Bei der Bayerischen gilt dafür die Wartezeit von acht Monaten, und bei beiden Versicherern ist eine beim Abschluss bestehende oder bekannte Schwangerschaft nicht mitversichert.',
    },
    {
      question: 'Gibt es eine private Zusatzversicherung für die Schwangerschaft?',
      answer:
        'Es gibt Klinik-Tarife, die die Entbindung mitversichern, wenn sie vor der Schwangerschaft abgeschlossen wurden, und ambulante Tarife mit einem Vorsorge-Topf. Einen stationären Baustein, der eine bestehende oder bekannte Schwangerschaft nachträglich mitversichert, gibt es weder bei der SDK noch bei der Bayerischen.',
    },
    {
      question: 'Was gilt, wenn die Schwangerschaft schon bekannt ist?',
      answer:
        'Dann ist die Entbindung dieser Schwangerschaft nicht mitversichert. Die Antworten im Antrag müssen wahrheitsgemäß und vollständig sein. Was ambulant und für dein Baby noch geht, steht im Ratgeber „Schwanger: welcher Zusatzschutz jetzt noch geht“.',
    },
    {
      question: 'Wie lange dauert die Wartezeit bei der Entbindung?',
      answer:
        'Bei der Bayerischen acht Monate, gerechnet ab Versicherungsbeginn. Eine allgemeine Wartezeit gibt es nicht, nach einem Unfall entfallen die Wartezeiten. Die SDK hat keine tarifliche Wartezeit.',
    },
    {
      question: 'Was kostet der Klinikschutz für Erwachsene und Kinder bei der Bayerischen?',
      answer:
        'Mit 21 bis 30 Jahren zahlst du im Komfort 10,20 EUR und im Prestige 13,40 EUR im Monat, mit 31 bis 45 Jahren 13,90 EUR und 17,60 EUR. Für Kinder bis 15 Jahre kostet der Komfort 3,20 EUR und das Prestige 4,10 EUR im Monat. Die Beiträge hängen vom Alter ab.',
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
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Wartezeit, Familienzimmer, Beiträge und die Regeln der Kasse stammen aus diesen Quellen.',
    items: [
      {
        label: 'Allgemeine Versicherungsbedingungen Krankheitskostenversicherung 2025 (B 275000), § 1 Abs. 2, § 2 und § 3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:0159d4a8-b666-4f77-a345-9acdb8e95608/275000_allgemeine_versicherungsbedingungen_krankheitskostenversicherung.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Prestige 2025 (B 275006), Ziffer 2.1 bis 2.3',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:4195af63-fc92-4395-88fc-8db70f6a0d47/275006_besondere_tarifbedingungen_krankenhauszusatzversicherung_2025_prestige.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Besondere Tarifbedingungen Krankenhauszusatzversicherung Komfort 2025 (B 275005), Ziffer 2.1',
        publisher: 'die Bayerische (BA Allgemeine Versicherung AG)',
        href: 'https://www.diebayerische.de/dam/jcr:d6054602-ee8e-4fe9-ab8a-3f01aec1bdef/275005_besondere_tarifbedingungen-krankenhauszusatzversicherung_2025_komfort.pdf',
        stand: '11/2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Produktsteckbrief Krankenhauszusatzversicherung (B 275010), Beitragstabelle, Chefarzt, Unterbringung, Rooming-in und Gesundheitsfragen, und Informationsblatt Prestige (B 275003)',
        publisher: 'die Bayerische',
        stand: '08.2025 und 11.2024',
      },
      {
        label: 'Annahmerichtlinien Krankenhauszusatzversicherung (B 275012), Erkrankungen ohne Aufnahme',
        publisher: 'die Bayerische',
        stand: '12/2024',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen Teil I (1.751), Abschnitt A.5, und Tarife SP1 (1.754a) und SP2 (1.755a), Nr. 8 Rooming In',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        stand: '01.01.2022 und 01.08.2025',
      },
      {
        label: 'Fachauskunft der Bayerischen an Healio zu Familienzimmer, Wartezeit, Neugeborenen und Abschluss vor einer bekannten Schwangerschaft',
        publisher: 'die Bayerische',
        stand: '05.10.2026, bestätigt am 07.10.2026',
      },
      {
        label: 'SGB V § 24f (Entbindung), § 11 Abs. 3 (Begleitperson) und § 175 Abs. 4 (Bindung an die Krankenkasse, Kündigung)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__24f.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'VVG § 19 (Anzeigepflicht)',
        publisher: 'gesetze-im-internet.de',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Wahlleistungspreise Unterkunft, Familienzimmer Geburtshilfe und Einbettzimmer',
        publisher: 'Klinikum Hochsauerland',
        href: 'https://www.klinikum-hochsauerland.de/fileadmin/user_upload/Klinikum-Hochsauerland/Patienten_und_Besucher/Wahlleistungspreise_Stand_2026.pdf',
        stand: 'Stand 2026',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Satzung der IKK classic (Bonusprogramm, Zuschusswerte)',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/19885-satzung-kv-incl-sana-78-80-20260801.pdf',
        stand: '01.08.2026',
        accessedAt: '07.10.2026',
        note: 'Die Zuschusswerte laut Satzung sind im IKK-Ratgeber von Healio durchgerechnet',
      },
      {
        label: 'Klinik-Tarife der SDK und der Bayerischen (Wartezeit, Familie, Beiträge)',
        publisher: 'healio.de/stationaer',
        href: 'https://healio.de/stationaer',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Ambulante Tarife und Vorsorge-Topf',
        publisher: 'healio.de/ambulant',
        href: 'https://healio.de/ambulant',
        accessedAt: '07.10.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer die Bedingungen des Versicherers und die Entscheidung über deinen Antrag.',
};

export default article;
