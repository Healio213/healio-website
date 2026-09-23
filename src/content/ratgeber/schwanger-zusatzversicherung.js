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
 *     stehen; im Text bleibt es bei "in der Regel" mit Verweis auf § 198 VVG.
 *   - Rooming-in ist ausdruecklich als Leistung im Kindertarif benannt.
 *
 * Harte Grenzen: Die Entbindung der Mutter ist bei bereits festgestellter
 * Schwangerschaft nicht versichert. Kein Kinderwunsch als Argument. Keine
 * Tarifbeitraege, keine Zusagen.
 */

export const article = {
  slug: 'schwanger-zusatzversicherung',
  kind: 'ratgeber',

  metaTitle: 'Schwanger: welcher Zusatzschutz jetzt noch geht | Healio',
  metaDescription:
    'Schwanger ohne Zusatzschutz? Was der ambulante Vorsorge-Topf jetzt noch zahlt, warum die Geburt stationär zu spät ist und was fürs Kind gilt.',

  publishedAt: '2026-09-22',
  publishedAtLabel: '22. September 2026',
  readingTimeMinutes: 6,

  listTitle: 'Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt',
  listTeaser:
    'Die Trennlinie verläuft zwischen Vorsorge und Entbindung. Was ambulant noch möglich ist, was stationär nicht mehr, und was fürs Kind gilt.',

  headline: 'Schwanger: welcher Zusatzschutz jetzt noch geht und welcher zu spät kommt',
  lead:
    'Wenn die Schwangerschaft schon feststeht, ist ein Teil des Zusatzschutzes noch erreichbar und ein anderer Teil nicht mehr: Der ambulante Vorsorge-Topf greift auch bei bereits festgestellter Schwangerschaft, die Entbindung selbst bekommst du stationär nach den Bedingungen, die wir geprüft haben, nicht mehr versichert. Genau in dieser Phase liegt der Kassenbonus so hoch wie in kaum einer anderen Lebenslage, weil jede Mutterschaftsvorsorge einzeln zählt.',

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
              text: 'Ein jetzt abgeschlossener Krankenhauszusatz deckt diese Entbindung und das Familienzimmer bei dieser Geburt nicht. Dafür sorgen die besondere Wartezeit von 8 Monaten und der Antragshinweis zu laufenden Behandlungen.',
            },
            {
              lead: 'Wofür dein Stationärtarif trotzdem zählt:',
              text: 'für die Zeit danach. Er ist die Grundlage dafür, dass dein Kind nachversichert werden kann, und Rooming-in als Begleitperson ist dann eine Leistung im Tarif deines Kindes, bis 16 Jahre zu 100 Prozent und bei jedem Klinikaufenthalt.',
            },
            {
              lead: 'Fürs Kind ist die Nachversicherung der Weg.',
              text: 'In der Regel kann ein Neugeborenes innerhalb von zwei Monaten nach der Geburt ohne erneute Gesundheitsprüfung aufgenommen werden. Ob dafür ein Elternvertrag mit Mindestlaufzeit nötig ist, gehört vorher geprüft.',
            },
            {
              lead: 'Der Bonus ist jetzt am höchsten.',
              text: 'Laut Satzung der IKK classic sind bis zu 1.155 EUR Zuschusswert möglich, ein rechnerischer Höchstwert, den niemand einfach so abruft. Ausgezahlt wird höchstens so viel, wie du an eigenen Kosten nachweist, zum Beispiel über den Jahresbeitrag deiner Zusatzversicherung. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab, wir rechnen es individuell für dich aus.',
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
          text: 'Stationär sieht es anders aus. Im Antrag der Bayerischen steht wörtlich, dass laufende oder angeratene Untersuchungen und Behandlungen, auch im Zusammenhang mit Schwangerschaft und Entbindung, nicht mitversichert sind. Dazu kommt eine besondere Wartezeit von 8 Monaten für die Entbindung. Einen stationären Sofort-Baustein für eine bereits festgestellte Schwangerschaft haben wir bei den Anbietern, deren Bedingungen wir geprüft haben, nicht gefunden: die Bayerische schließt ihn im Antrag ausdrücklich aus, die SDK in den SP-Tarifen ebenso.',
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
          text: 'Ebenfalls nicht versichert ist die Behandlung wegen der Schwangerschaft selbst, also Schwangerschaftsbeschwerden, Wassereinlagerungen, Übelkeit und die Entbindung. Eine wichtige Ausnahme gibt es: Komplikationen, Frühgeburten bis zur 36. Schwangerschaftswoche, Fehlgeburten und ein medizinisch indizierter Abbruch sind versichert.',
        },
      ],
    },
    {
      id: 'stationaer',
      heading: 'Deckt ein Stationärtarif die Geburt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Diese Geburt nicht. Das ist der Punkt, an dem viele Beratungen unsauber werden, deshalb hier deutlich: Schließt du den Krankenhauszusatz während der laufenden Schwangerschaft ab, bekommst du für diese Entbindung weder die Chefarztbehandlung noch das Familienzimmer. Die 8 Monate besondere Wartezeit laufen an, und der Antragshinweis schließt das bereits Bekannte ohnehin aus.',
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
              text: '100 Prozent bis 16 Jahre, bei jedem Klinikaufenthalt deines Kindes. Diese Leistung steckt im Tarif des Kindes, dein eigener Vertrag ist die Voraussetzung dafür, dass dein Kind überhaupt nachversichert werden kann.',
            },
            {
              lead: 'Deine eigene Versorgung',
              text: 'bei jedem medizinisch notwendigen Krankenhausaufenthalt, der nichts mit dieser Schwangerschaft zu tun hat: Chefarzt, Zweibettzimmer, freie Krankenhauswahl.',
            },
            {
              lead: 'Das Familienzimmer bei einer späteren Entbindung,',
              text: 'nach Ablauf der Wartezeit. Beim Komfort-Tarif bis Zweibettzimmer-Niveau, beim Prestige ohne Begrenzung, beim Smart gar nicht.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wenn dir jemand einen Stationärtarif mit dem Argument verkauft, du könntest damit bei dieser Geburt im Familienzimmer bleiben, dann lass dir die Stelle in den Bedingungen zeigen. Nach den Bedingungen, die wir geprüft haben, stimmt das nicht.',
        },
      ],
    },
    {
      id: 'nachversicherung',
      heading: 'Wie wird mein Kind nachversichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Über die Nachversicherung. In der Regel kann ein Neugeborenes innerhalb von zwei Monaten nach der Geburt ohne erneute Gesundheitsprüfung in den Tarif aufgenommen werden. Der Antrag muss rückwirkend zum Tag der Geburt gestellt werden.',
        },
        {
          type: 'paragraph',
          text: 'Zu prüfen ist die Bedingung dahinter, und die ist entscheidend: Üblich ist, dass ein Elternteil zum Zeitpunkt der Geburt bereits mindestens drei Monate versichert sein muss, so die Grundregel des § 198 VVG. Ob und in welcher Form dein Versicherer das verlangt, steht in den Bedingungen des jeweiligen Tarifs. Für die Tarifart gilt die gesetzliche Grenze: Der Schutz des Kindes darf nach § 198 VVG nicht umfassender sein als der des versicherten Elternteils. Ein rein ambulanter Elternvertrag trägt also keinen stationären Schutz fürs Kind. Wir prüfen das für deinen Tarif vor Abschluss, nicht danach.',
        },
        {
          type: 'paragraph',
          text: 'Praktische Folge: Wo ein Versicherer eine Vorversicherungszeit verlangt, ist sie in der Schwangerschaft meist noch zu schaffen, kurz vor der Geburt nicht mehr. Manche Versicherer verzichten darauf und stellen nur darauf ab, dass ein Elternteil am Tag der Geburt versichert ist. Das gehört vor Abschluss für deinen Tarif geklärt.',
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
          text: 'Nur vier Positionen sind überhaupt mehrfach anrechenbar, und Nummer 09 ist eine davon. Deshalb kommt in der Schwangerschaft mehr zusammen als in einem Jahr ohne sie. Laut Satzung sind bis zu 1.155 EUR Zuschusswert möglich, ohne Schwangerschaftsvorsorge bis zu 810 EUR. Das sind rechnerische Höchstwerte aus einem Korb, in dem alles gleichzeitig zutrifft, keine Beträge, die die IKK classic irgendwo nennt. Einen Maximalbetrag gibt es laut Teilnahmebedingungen ohnehin nicht. In der breiten Masse liegen aktive Versicherte bei 400 bis 700 EUR im Jahr.',
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
          caption: 'Überblick über versicherte und offene Punkte',
          head: ['Versichert', 'Nicht versichert', 'Zu prüfen'],
          rows: [
            [
              'Vorsorge während der Schwangerschaft, ambulant im Vorsorge-Topf, auch bei bestehender Schwangerschaft',
              'Behandlung wegen Schwangerschaft, Schwangerschaftsbeschwerden, Entbindung',
              'Mindestlaufzeit des Elternvertrags vor der Geburt (übliche 3-Monats-Regel, § 198 VVG)',
            ],
            [
              'Feinultraschall, zusätzliche Ultraschalls, Toxoplasmose, Streptokokken, Cytomegalie, Nackenfaltenmessung',
              'NIPT und alle gendiagnostischen Untersuchungen',
              'Welche Tarifart der Elternvertrag für die Nachversicherung haben muss, ambulant oder stationär',
            ],
            [
              'Komplikationen, Frühgeburten bis 36. SSW, Fehlgeburten, medizinisch indizierter Abbruch',
              'Chefarzt und Familienzimmer bei dieser Entbindung, wenn der Stationärtarif erst jetzt abgeschlossen wird',
              'Welche Kasse in deinem Fall den höchsten Bonus zahlt und ob der Zusatzbeitrag das aufzehrt',
            ],
            [
              'Rooming-in als Begleitperson, 100 Prozent bis 16 Jahre, aus dem Tarif des nachversicherten Kindes',
              'Kein stationärer Sofortschutz für bereits Angeratenes bei den von uns geprüften Anbietern (SDK, die Bayerische)',
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
        'Die reguläre Hebammenleistung rechnet die Kasse ab. Privat abrechnende Hebammen sind ein stationäres Thema, bei der Bayerischen in Komfort und Prestige enthalten. Für diese Entbindung greift das wegen der Wartezeit nicht.',
    },
    {
      question: 'Was ist mit Komplikationen, wenn ich jetzt abschließe?',
      answer:
        'Ambulant sind Komplikationen, Frühgeburten bis zur 36. Woche und Fehlgeburten ausdrücklich als Ausnahme vom Behandlungsausschluss versichert.',
    },
    {
      question: 'Kann ich den Stationärtarif später upgraden?',
      answer:
        'Beim Smart-Tarif der Bayerischen gibt es nach den Tarifbedingungen, Stand 24.04.2025, ein Optionsrecht: Wer vor dem 40. Lebensjahr abschließt, kann danach zum Ende des dritten oder sechsten Versicherungsjahres in der Regel ohne neue Gesundheitsprüfung in Komfort oder Prestige wechseln. Maßgeblich sind die Tarifbedingungen, die bei deinem Abschluss gelten. Lass dir die Klausel vor der Unterschrift zeigen.',
    },
    {
      question: 'Muss ich für den Bonus jede Vorsorge einzeln einreichen?',
      answer:
        'Ja. Jede Mutterschaftsvorsorge bekommt ein eigenes Antragsfeld, und ein schriftlicher Nachweis ist Pflicht. Der Mutterpass reicht dafür aus, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen. Alle Maßnahmen müssen in dasselbe Kalenderjahr fallen. Für das Bonusjahr 2026 muss der vollständige Antrag bis zum 31.03.2027 bei der IKK classic sein, danach verfällt der Anspruch.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' siehst du, was der Vorsorge-Topf je Tarifstufe erstattet und was nach Anrechnung des Bonus an Beitrag übrig bleibt, auf ',
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
