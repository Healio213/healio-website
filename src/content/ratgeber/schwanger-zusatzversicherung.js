/**
 * Ratgeberartikel 3: Zusatzschutz bei bereits festgestellter Schwangerschaft.
 *
 * Quelle: Healio/Ratgeber/artikel-ratgeber-03-schwanger-zusatzschutz.md,
 * Stand 21.09.2026. Die Abschnitte "Belege" und "Offen" der Markdown-Quelle
 * kommen bewusst NICHT auf die Seite.
 *
 * Abweichungen von der Quelle, alle bewusst:
 *   - Die Ueberschrift "Wie kommt mein Kind ohne Gesundheitsfragen in den
 *     Tarif?" wurde zu "Wie wird mein Kind nachversichert?". "Ohne
 *     Gesundheitsfragen" darf nicht als Versprechen in einer Ueberschrift
 *     stehen.
 *   - Rooming-in ist ausdruecklich als Leistung im Kindertarif benannt.
 *
 * Korrektur 28.09.2026 nach AVB-Pruefung der Bayerischen
 * (Healio/Vertraege/Bayerische-Direktanbindung-2026-09/
 * AVB-PRUEFUNG-HEBAMME-STATIONAER-WEBSITE-ABGLEICH.md, Abschnitt 4a):
 *   - Kindernachversicherung: Bayerische verlangt drei Monate Elternversicherung
 *     (AVB § 2 Abs. 2), SDK keine. § 198 VVG erlaubt diese Mindestzeit nur als
 *     Vereinbarung, sie ist keine gesetzliche Grundregel.
 *   - Rooming-in unter 16 (TB 2.3), soweit nicht die Krankenkasse traegt.
 *   - Hebamme Bayerische: laut Produktsteckbrief B 275010 und Highlightblatt
 *     275008 (Kosten über GKV-Leistung, privat abrechnende Hebammen, Komfort und
 *     Prestige). Von Frank am 29.09.2026 als Grundlage freigegeben. Die mündlich
 *     genannten 90 EUR je Hausbesuch bleiben draußen.
 *   - Smart-Optionsrecht nach TB-S § 5, Stand 11/2024.
 *   - Allgemeine Wartezeit drei Monate, bei Unfall sofort (AVB § 3 Abs. 2).
 *
 * Harte Grenzen: Die Entbindung der Mutter ist bei bereits festgestellter
 * Schwangerschaft nicht versichert. Kein Kinderwunsch als Argument. Keine
 * Tarifbeitraege, keine Zusagen.
 *
 * Korrektur 28.09.2026 nach SDK-Bedingungspruefung
 * (Healio/Vertraege/SDK-Klinik-Bedingungen-2026-09/):
 *   - SDK SP1/SP2 Ziff. 10: Entbindung nicht versichert, wenn die Schwangerschaft
 *     beim Antrag aerztlich festgestellt war; SDK ohne Wartezeiten.
 *   - Beleghebamme in SP1/SP2 nur waehrend des Klinikaufenthalts.
 *   - AP 1.753a: Komplikationen, Fruehgeburten, Fehlgeburten nur in der
 *     Auslandsreiseversicherung (Ziff. 7) versichert.
 *
 * Korrektur 05.10.2026 (Gegenpruefung der Demand-Gen-Anzeige):
 *   - Neuer interner Button zur SDK (internalCta) und klare Aussage im Weg am
 *     Ende: Fuer eine bestehende Schwangerschaft gilt der Vorsorge-Topf der
 *     SDK, nicht der UKV-Vorsorge-Baustein, der seit 05.10. auf /ambulant steht.
 *   - "Kurz gesagt": der realistische Bonuswert 400 bis 700 EUR steht jetzt
 *     direkt neben dem rechnerischen Hoechstwert.
 *   - Gegenpruefung Website am Abend: Der Button-Absatz verspricht nicht mehr
 *     alle Selbstzahlerleistungen, sondern die Vorsorge-Untersuchungen aus der
 *     Tabelle und sagt, dass Gentests wie NIPT nicht dazugehoeren. Der Satz
 *     "Einen Maximalbetrag gibt es ... nicht" ist gestrichen (Sperrliste
 *     "ohne Obergrenze"). Button-Ziel jetzt /ambulant#tarifwahl.
 */

export const article = {
  slug: 'schwanger-zusatzversicherung',
  kind: 'ratgeber',

  metaTitle: 'Schwanger: welcher Zusatzschutz jetzt noch geht | Healio',
  metaDescription:
    'Schwanger ohne Zusatzschutz? Was der ambulante Vorsorge-Topf jetzt noch zahlt, warum die Geburt stationär zu spät ist und was fürs Kind gilt.',

  publishedAt: '2026-09-28',
  publishedAtLabel: '28. September 2026',
  updatedAt: '2026-10-05',
  updatedAtLabel: '5. Oktober 2026',
  readingTimeMinutes: 6,

  listTitle: 'Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt',
  listTeaser:
    'Die Trennlinie verläuft zwischen Vorsorge und Entbindung. Was ambulant noch möglich ist, was stationär nicht mehr, und was fürs Kind gilt.',

  headline: 'Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt',
  lead:
    'Wenn die Schwangerschaft schon feststeht, ist ein Teil des Zusatzschutzes noch erreichbar und ein anderer Teil nicht mehr: Der ambulante Vorsorge-Topf greift auch bei bereits festgestellter Schwangerschaft, die Entbindung selbst bekommst du stationär nicht mehr versichert. Genau in dieser Phase liegt der Kassenbonus so hoch wie in kaum einer anderen Lebenslage, weil jede Mutterschaftsvorsorge einzeln zählt.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Ambulant geht noch etwas.',
              text: 'Der Vorsorge-Topf der SDK AP-Tarife zahlt die Untersuchungen, die die Kasse nicht übernimmt, und er greift auch dann, wenn die Schwangerschaft bereits festgestellt ist. Wartezeiten gibt es in den AP-Tarifen nicht. Die Schwangerschaft gehört trotzdem in den Antrag, der Versicherer prüft sie.',
            },
            {
              lead: 'Die Geburt ist stationär zu spät.',
              text: 'Ein jetzt abgeschlossener Krankenhauszusatz deckt diese Entbindung und das Familienzimmer bei dieser Geburt nicht. Bei der SDK ist eine Entbindung nicht versichert, wenn die Schwangerschaft beim Antrag schon ärztlich festgestellt ist. Bei der Bayerischen ist eine Entbindung erst nach acht Monaten Wartezeit versichert, laufende oder angeratene Untersuchungen zur Schwangerschaft sind dort nicht mitversichert.',
            },
            {
              lead: 'Wofür dein Stationärtarif trotzdem zählt:',
              text: 'für die Zeit danach. Er ist die Grundlage dafür, dass dein Kind nachversichert werden kann. Rooming-in als Begleitperson ist dann eine Leistung im Tarif deines Kindes: Ist dein Kind zu Beginn der Behandlung jünger als 16, übernimmt der Tarif Unterkunft und Verpflegung eines Elternteils, soweit die Krankenkasse sie nicht trägt. Das gilt bei medizinisch notwendigen Klinikaufenthalten in SP1 und SP2 der SDK und in Komfort und Prestige der Bayerischen.',
            },
            {
              lead: 'Fürs Kind ist die Nachversicherung der Weg.',
              text: 'Innerhalb von zwei Monaten nach der Geburt nimmt die Bayerische dein Kind ohne Gesundheitsprüfung, ohne Wartezeit und ohne Zuschlag auf, rückwirkend zum Tag der Geburt. Voraussetzung ist, dass ein Elternteil am Tag der Geburt seit mindestens drei Monaten bei der Bayerischen versichert ist. Die SDK verlangt diese drei Monate nicht.',
            },
            {
              lead: 'Der Bonus ist jetzt am höchsten.',
              text: 'Laut Satzung der IKK classic sind in der Schwangerschaft bis zu 1.155 EUR Zuschusswert möglich, ein rechnerischer Höchstwert, den niemand einfach so abruft. In der breiten Masse liegen aktive Versicherte bei 400 bis 700 EUR im Jahr. Ausgezahlt wird höchstens so viel, wie du an eigenen Kosten nachweist, zum Beispiel über den Jahresbeitrag deiner Zusatzversicherung. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab, wir rechnen es individuell für dich aus.',
            },
          ],
        },
      ],
    },
    {
      id: 'moeglich',
      heading: 'Bekomme ich in der Schwangerschaft noch eine Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, aber nicht mehr jede. Die Trennlinie verläuft zwischen Vorsorge und Entbindung.',
        },
        {
          type: 'paragraph',
          text: 'Ambulant ist der Abschluss möglich. Die SDK AP-Tarife haben keine Wartezeiten, der Schutz greift ab Versicherungsbeginn. Der Vorsorge-Topf nennt "die Vorsorge während der Schwangerschaft" ausdrücklich als versicherte Leistung, ohne die Einschränkung, dass die Schwangerschaft erst später eintreten müsste. Die bestehende Schwangerschaft gehört in die Gesundheitsfragen des Antrags. Der Versicherer prüft sie, und was am Ende in deinem Vertrag steht, siehst du in der Police.',
        },
        {
          type: 'paragraph',
          text: 'Stationär sieht es anders aus. In den Bedingungen der SDK für SP1 und SP2 steht, dass sie für diese Entbindung nicht leistet, wenn die Schwangerschaft beim Antrag schon ärztlich festgestellt ist. Im Antrag der Bayerischen steht wörtlich, dass laufende oder angeratene Untersuchungen und Behandlungen, auch im Zusammenhang mit Schwangerschaft und Entbindung, nicht mitversichert sind. Bei der Bayerischen kommt eine besondere Wartezeit von 8 Monaten für die Entbindung dazu, die SDK hat keine Wartezeit. Einen stationären Sofort-Baustein für eine bereits festgestellte Schwangerschaft gibt es deshalb weder bei der SDK noch bei der Bayerischen.',
        },
      ],
    },
    {
      id: 'ambulant',
      heading: 'Was zahlt der ambulante Tarif in der Schwangerschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Vorsorge-Topf deckt die Untersuchungen ab, die dir die Praxis als Selbstzahlerleistung anbietet: Feinultraschall, zusätzliche Ultraschalls, Toxoplasmose, Streptokokken, Cytomegalie und die Nackenfaltenmessung.',
        },
        {
          type: 'table',
          caption: 'Vorsorge-Topf je Tarifstufe',
          head: ['Tarif', 'Erstattung', 'Höchstbetrag je 2 Kalenderjahre'],
          rows: [
            ['AP1', '100 Prozent', '500 EUR'],
            ['AP9', '90 Prozent', '400 EUR'],
            ['AP7', '70 Prozent', '300 EUR'],
            ['AP5', '50 Prozent', '200 EUR'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Nicht im Topf sind gendiagnostische Untersuchungen. NIPT, also Praena, Harmony oder Panorama, und alle übrigen Pränatal-Gentests zahlt der Tarif nicht.',
        },
        {
          type: 'paragraph',
          text: 'Ebenfalls nicht versichert ist die Behandlung wegen der Schwangerschaft selbst, also Schwangerschaftsbeschwerden, Wassereinlagerungen, Übelkeit, Komplikationen und die Entbindung. Eine Ausnahme gilt nur auf Auslandsreisen: Dort zahlt der Tarif auch bei Komplikationen in der Schwangerschaft, Frühgeburten bis zum Ende der 36. Schwangerschaftswoche, Fehlgeburten und einem medizinisch indizierten Abbruch.',
        },
      ],
    },
    {
      id: 'stationaer',
      heading: 'Deckt ein Stationärtarif die Geburt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Diese Geburt nicht. Das ist der Punkt, an dem viele Beratungen unsauber werden, deshalb hier deutlich: Schließt du den Krankenhauszusatz während der laufenden Schwangerschaft ab, bekommst du für diese Entbindung weder die Chefarztbehandlung noch das Familienzimmer. Bei der SDK greift der Ausschluss für eine beim Antrag festgestellte Schwangerschaft, bei der Bayerischen zusätzlich die Wartezeit von acht Monaten.',
        },
        {
          type: 'paragraph',
          text: 'Der Stationärtarif sichert also nicht diese Geburt. Er sichert die Zeit danach, teils über deinen eigenen Vertrag, teils als Grundlage für den Vertrag deines Kindes:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Rooming-in als Begleitperson,',
              text: 'wenn dein Kind zu Beginn der Behandlung jünger als 16 ist. Der Tarif übernimmt Unterkunft und Verpflegung eines Elternteils, soweit die Krankenkasse sie nicht trägt, bei medizinisch notwendigen Klinikaufenthalten in SP1 und SP2 der SDK und in Komfort und Prestige der Bayerischen. Diese Leistung steckt im Tarif des Kindes, dein eigener Vertrag ist die Voraussetzung dafür, dass dein Kind überhaupt nachversichert werden kann.',
            },
            {
              lead: 'Deine eigene Versorgung',
              text: 'bei neu auftretenden, medizinisch notwendigen Krankenhausaufenthalten, die nichts mit dieser Schwangerschaft zu tun haben, bei der SDK ab Versicherungsbeginn, bei der Bayerischen im Komfort und im Prestige nach drei Monaten Wartezeit (stationäre Psychotherapie nach acht Monaten) und nach einem Unfall sofort: Chefarzt, Zweibettzimmer, freie Krankenhauswahl.',
            },
            {
              lead: 'Das Familienzimmer bei einer späteren Entbindung,',
              text: 'bei der SDK im SP1 ohne Wartezeit, wenn die nächste Schwangerschaft erst nach dem Antrag festgestellt wird. Bei der Bayerischen nach der Wartezeit von acht Monaten, im Komfort bis Zweibettzimmer-Niveau, im Prestige ohne Begrenzung, im Smart gar nicht.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wenn dir jemand einen Stationärtarif mit dem Argument verkauft, du könntest damit bei dieser Geburt im Familienzimmer bleiben, dann lass dir die Stelle in den Bedingungen zeigen. Das stimmt nicht: Bei einer bestehenden Schwangerschaft ist diese Entbindung nicht versichert.',
        },
      ],
    },
    {
      id: 'nachversicherung',
      heading: 'Wie wird mein Kind nachversichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Über die Nachversicherung. Meldest du dein Kind spätestens zwei Monate nach der Geburt an, wird es rückwirkend zum Tag der Geburt aufgenommen, ohne Gesundheitsprüfung, ohne Wartezeit und ohne Zuschlag. Das gilt auch für Geburtsschäden, angeborene Krankheiten und Anomalien.',
        },
        {
          type: 'paragraph',
          text: 'Entscheidend ist die Bedingung dahinter. Bei der Bayerischen muss ein Elternteil am Tag der Geburt seit mindestens drei Monaten versichert sein. Das Gesetz erlaubt diese Mindestzeit von höchstens drei Monaten (§ 198 VVG), die SDK verlangt keine. Der Schutz deines Kindes reicht so weit wie dein eigener Tarif: Nach § 198 VVG darf er nicht höher oder umfassender sein als der des versicherten Elternteils. Ein rein ambulanter Elternvertrag trägt also keinen stationären Schutz fürs Kind. Für einen Klinik-Tarif deines Kindes braucht ein Elternteil selbst einen Klinik-Tarif.',
        },
        {
          type: 'paragraph',
          text: 'Praktische Folge: Bei der Bayerischen muss dein Vertrag spätestens drei Monate vor der Geburt beginnen. Schließ deshalb jetzt ab und nicht erst kurz vor dem Termin. Bei der SDK genügt es, dass ein Elternteil am Tag der Geburt versichert ist.',
        },
      ],
    },
    {
      id: 'bonus',
      heading: 'Warum ist der Kassenbonus in der Schwangerschaft so hoch?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Weil die Mutterschaftsvorsorge bei der IKK classic unter Nummer 09 läuft und dort mehrfach im selben Jahr nachweisbar ist. Jede gesetzliche Untersuchung zählt als eigene Position, je 10 EUR Geldbonus oder 30 EUR Zuschusswert. Dazu kommt nach der Geburt die Rückbildungsgymnastik unter Nummer 44 mit 25 EUR Geldbonus oder 75 EUR Zuschusswert.',
        },
        {
          type: 'paragraph',
          text: 'Nur vier Positionen sind überhaupt mehrfach anrechenbar, und Nummer 09 ist eine davon. Deshalb kommt in der Schwangerschaft mehr zusammen als in einem Jahr ohne sie. Laut Satzung sind bis zu 1.155 EUR Zuschusswert möglich, ohne Schwangerschaftsvorsorge bis zu 810 EUR. Das sind rechnerische Höchstwerte aus einem Korb, in dem alles gleichzeitig zutrifft, keine Beträge, die die IKK classic irgendwo nennt. In der breiten Masse liegen aktive Versicherte bei 400 bis 700 EUR im Jahr.',
        },
        {
          type: 'paragraph',
          text: 'Der Zuschuss beträgt das Dreifache des Geldbonus, wird aber höchstens in Höhe deiner tatsächlichen Kosten ausgezahlt. Der Jahresbeitrag einer Krankenzusatzversicherung ist als Zuschussleistung Nummer 63 anrechenbar. Rechnerisch 405 EUR Zuschuss bei 240 EUR Jahresbeitrag ergeben also 240 EUR, nie mehr. Wichtig für den Nachweis: Für Mutterschaftsvorsorgen ist ein schriftlicher Nachweis Pflicht, der Mutterpass genügt, und es gibt je Untersuchung ein eigenes Antragsfeld. Für das Bonusjahr 2026 muss der vollständige Antrag bis zum 31.03.2027 bei der IKK classic sein. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus.',
        },
      ],
    },
    {
      id: 'uebersicht',
      heading: 'Versichert, nicht versichert, zu prüfen',
      blocks: [
        {
          type: 'table',
          caption: 'Überblick über versicherte, nicht versicherte und vorab zu klärende Punkte',
          head: ['Versichert', 'Nicht versichert', 'Zu prüfen'],
          rows: [
            [
              'Vorsorge während der Schwangerschaft, ambulant im Vorsorge-Topf, auch bei bestehender Schwangerschaft',
              'Behandlung wegen Schwangerschaft, Schwangerschaftsbeschwerden, Entbindung',
              'Vorversicherungszeit des Elternteils vor der Geburt: bei der Bayerischen drei Monate, bei der SDK keine',
            ],
            [
              'Feinultraschall, zusätzliche Ultraschalls, Toxoplasmose, Streptokokken, Cytomegalie, Nackenfaltenmessung',
              'NIPT und alle gendiagnostischen Untersuchungen',
              'Klinik-Tarif für einen Elternteil, wenn dein Kind einen Klinik-Tarif bekommen soll',
            ],
            [
              'Auf Auslandsreisen auch Komplikationen, Frühgeburten bis Ende der 36. SSW, Fehlgeburten, medizinisch indizierter Abbruch',
              'Chefarzt und Familienzimmer bei dieser Entbindung, wenn der Stationärtarif erst jetzt abgeschlossen wird',
              'Welche Kasse in deinem Fall den höchsten Bonus zahlt und ob der Zusatzbeitrag das aufzehrt',
            ],
            [
              'Rooming-in als Begleitperson für Kinder unter 16, aus dem Tarif des nachversicherten Kindes',
              'Stationärer Sofortschutz für bereits Angeratenes, weder bei der SDK noch bei der Bayerischen',
              'Anzahl der bonusfähigen Mutterschaftsvorsorgen, von der IKK classic nicht öffentlich beziffert',
            ],
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio kombiniert Kassenbonusprogramme mit Zusatzversicherungen zu einem Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus ist jährlich und wird als zweckgebundener Zuschuss auf den Jahresbeitrag der Zusatzversicherung angerechnet, höchstens bis zur Höhe des tatsächlich gezahlten Beitrags. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab, wir rechnen es individuell für dich aus. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Ich bin in der 20. Woche. Lohnt sich ein ambulanter Tarif überhaupt noch?',
      answer:
        'Für die restlichen Vorsorgetermine ja, denn es gibt keine Wartezeit und der Topf gilt je zwei Kalenderjahre. Ob sich der Beitrag für dich rechnet, hängt davon ab, wie viele Selbstzahlerleistungen noch anstehen.',
    },
    {
      question: 'Zahlt der ambulante Tarif meine Hebamme?',
      answer:
        'Die Hebammenhilfe in der Schwangerschaft, bei der Geburt und im Wochenbett rechnet deine Krankenkasse ab, auch den Rückbildungskurs. Bei der SDK übernehmen die Klinik-Tarife SP1 und SP2 zusätzlich die gesondert berechenbaren Leistungen einer Beleghebamme bei der Geburt im Krankenhaus. Die Betreuung zu Hause vor und nach der Geburt gehört dort nicht dazu. Ist die Schwangerschaft beim Antrag schon ärztlich festgestellt, gilt das bei der SDK nicht. Bei der Bayerischen erstatten die Klinik-Tarife Komfort und Prestige laut Produktunterlagen Hebammenkosten, die über die Leistungen der Krankenkasse hinausgehen, auch für privat abrechnende Hebammen. Dort gilt eine Wartezeit von drei Monaten, für die Entbindung von acht Monaten, und eine beim Antrag schon bestehende Schwangerschaft ist nicht mitversichert.',
    },
    {
      question: 'Was ist mit Komplikationen, wenn ich jetzt abschließe?',
      answer:
        'In Deutschland zahlt der ambulante Tarif weder die Entbindung noch die Behandlung von Beschwerden oder Komplikationen wegen der Schwangerschaft. Auf Auslandsreisen sind Komplikationen in der Schwangerschaft, Frühgeburten bis zum Ende der 36. Woche und Fehlgeburten dagegen versichert.',
    },
    {
      question: 'Kann ich den Stationärtarif später upgraden?',
      answer:
        'Ja, beim Smart-Tarif der Bayerischen hast du ein Optionsrecht. Wer beim ersten Abschluss jünger als 40 ist, wechselt zum Ende des dritten oder sechsten Versicherungsjahres ohne neue Gesundheitsprüfung und ohne Wartezeit in Komfort oder Prestige. Bei Kindern zählen die Versicherungsjahre ab dem Jahr, in dem sie 21 werden.',
    },
    {
      question: 'Muss ich für den Bonus jede Vorsorge einzeln einreichen?',
      answer:
        'Ja. Jede Mutterschaftsvorsorge bekommt ein eigenes Antragsfeld, und ein schriftlicher Nachweis ist Pflicht. Der Mutterpass reicht dafür aus, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen. Alle Maßnahmen müssen in dasselbe Kalenderjahr fallen. Für das Bonusjahr 2026 muss der vollständige Antrag bis zum 31.03.2027 bei der IKK classic sein, danach verfällt der Anspruch.',
    },
  ],

  // Einziger Button dieses Artikels, Ziel /ambulant. Der Weg führt bewusst
  // zur SDK: Auf /ambulant steht seit 05.10.2026 auch der UKV-Vorsorge-Baustein.
  // Der ist laut interner UKV-Prüfung für eine schon bestehende Schwangerschaft
  // nicht gedacht, deshalb sagt der Absatz ausdrücklich, welchen Tarif
  // Schwangere dort wählen. Der Anker #tarifwahl führt direkt zur
  // SDK-Tarifwahl; buildInternalRatgeberUrl setzt ihn hinter die UTM-Query.
  // Der Kampagnen-Standard ist bewusst neutral, damit kein "schwanger" in die
  // Adresse von /ambulant wandert.
  internalCta: {
    id: 'sdk-vorsorge',
    heading: 'Vorsorge in der Schwangerschaft: der Topf der SDK',
    to: '/ambulant#tarifwahl',
    label: 'SDK-Tarife ansehen',
    utmCampaign: 'ratgeber-a3',
    blocks: [
      {
        type: 'paragraph',
        text: 'Für eine schon festgestellte Schwangerschaft ist der Vorsorge-Topf der SDK der richtige Weg. Er gilt ohne Wartezeit und erstattet Feinultraschall, Toxoplasmose und die übrigen Vorsorge-Untersuchungen aus der Tabelle oben je nach Stufe zu 50 bis 100 Prozent, mit 200 bis 500 EUR in zwei Kalenderjahren. Gentests wie NIPT gehören nicht dazu. Der kleine Vorsorge-Baustein der UKV auf derselben Seite ist für eine bestehende Schwangerschaft nicht gedacht. Wähle dort deshalb eine SDK-Stufe.',
      },
    ],
  },

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' siehst du, was der Vorsorge-Topf der SDK je Tarifstufe erstattet und was nach Anrechnung des Bonus an Beitrag übrig bleibt. Für eine bestehende Schwangerschaft wählst du dort eine SDK-Stufe, nicht den UKV-Vorsorge-Baustein. Auf ',
      },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      {
        text: ' findest du die Krankenhausleistungen samt Rooming-in und Familienzimmer, den Alltagsteil dieser Monate haben wir im Ratgeber ',
      },
      { text: 'Worauf du in der Schwangerschaft achten solltest', to: '/ratgeber/schwangerschaft-worauf-achten' },
      { text: ' zusammengestellt, und auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' vergleichst du quellenbelegt anhand der Satzungen, welche Kasse in deiner Situation den höchsten Bonus zahlt.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den Bedingungen von SDK und der Bayerischen sowie der Satzung der IKK classic, maßgeblich sind immer die Originaldokumente.',
};

export default article;
