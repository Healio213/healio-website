/**
 * Ratgeberartikel 4: Alltag und Geld in der Schwangerschaft.
 *
 * Quelle: Healio/Ratgeber/artikel-ratgeber-04-schwangerschaft-worauf-achten.md,
 * Stand 21.09.2026. Die Abschnitte "Belege" und "Offen" der Markdown-Quelle
 * kommen bewusst NICHT auf die Seite.
 *
 * Eingearbeitete Korrekturen aus dem Faktencheck vom 22.09.2026:
 *   - Mutterschutz gilt kraft Gesetzes, nicht erst ab der Mitteilung an den
 *     Arbeitgeber. § 15 MuSchG ist eine Soll-Vorschrift. Der
 *     Kuendigungsschutz wirkt auch bei Nachmeldung innerhalb von zwei Wochen
 *     nach Zugang einer Kuendigung, § 17 Abs. 1 MuSchG.
 *   - Elterngeld: rueckwirkend nur fuer die letzten drei Lebensmonate vor
 *     dem Monat des Antragseingangs, § 7 Abs. 1 BEEG.
 *   - Der Halbsatz "und fuer dich finanziell besser" zum betrieblichen
 *     Beschaeftigungsverbot ist gestrichen, weil § 18 MuSchG im Faktencheck
 *     nicht gegen die Primaerquelle geprueft werden konnte.
 *   - Der Vorsorge-Rhythmus bleibt bei "etwa vier Wochen, gegen Ende enger".
 *     Eine "32. Woche" als Umschaltpunkt gibt es in der
 *     Mutterschafts-Richtlinie nicht; die drei Ultraschall-Screenings sind
 *     dagegen mit Zeitfenstern belegt und jetzt benannt.
 *
 * Weitere bewusste Abweichungen:
 *   - Anrede durchgehend klein, die Quelle mischt an drei Stellen du und Du.
 *   - Ueberschrift ohne "ohne Gesundheitsfragen" als Versprechen.
 */

export const article = {
  slug: 'schwangerschaft-worauf-achten',
  kind: 'ratgeber',

  metaTitle: 'Schwanger: worauf du jetzt achten solltest | Healio',
  metaDescription:
    'Vorsorge, Mutterpass, Mutterschutz und das Geld: was die Kasse zahlt, was du selbst trägst und warum der Kassenbonus jetzt am höchsten ist.',

  publishedAt: '2026-09-22',
  publishedAtLabel: '22. September 2026',
  readingTimeMinutes: 8,

  listTitle: 'Schwanger: worauf du jetzt achten solltest',
  listTeaser:
    'Der Alltag und das Geld in einem Text: Mutterpass, Hebamme, Selbstzahlerleistungen, Mutterschutz, Anträge und der Bonus, der jetzt am höchsten ist.',

  headline:
    'Worauf sollte ich in der Schwangerschaft achten? Die Checkliste, die im Mutterpass fehlt',
  lead:
    'Medizinisch führt dich der Mutterpass durch die nächsten Monate, um Hebamme, Job und Anträge musst du dich selbst kümmern, und finanziell entscheidet sich vieles früher, als die meisten denken. Dieser Text geht beides durch: den Alltag und das Geld, das in keinem Ratgeber steht.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Der Mutterpass ist dein Fahrplan.',
              text: 'Die gesetzlichen Vorsorgetermine sind darin festgelegt, und er ist gleichzeitig dein wichtigster Nachweis, auch gegenüber deiner Krankenkasse.',
            },
            {
              lead: 'Hebamme früh suchen.',
              text: 'In vielen Regionen sind die Kapazitäten knapp. Wer erst im dritten Drittel anfängt zu suchen, findet oft keine mehr.',
            },
            {
              lead: 'Nicht alles zahlt die Kasse.',
              text: 'Feinultraschall, Toxoplasmose, Streptokokken, Cytomegalie und Nackenfaltenmessung werden dir meist als Selbstzahlerleistung angeboten.',
            },
            {
              lead: 'Der Kassenbonus ist jetzt am höchsten.',
              text: 'Bei der IKK classic zählt jede gesetzliche Mutterschaftsvorsorge einzeln als bonusfähige Maßnahme. Das schafft in keiner anderen Lebensphase jemand.',
            },
            {
              lead: 'Beim Zusatzschutz gibt es eine harte Trennlinie.',
              text: 'Ambulant geht jetzt noch etwas, die Entbindung bekommst du stationär nicht mehr versichert.',
            },
          ],
        },
      ],
    },
    {
      id: 'erste-wochen',
      heading: 'Was ändert sich in den ersten Wochen wirklich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Meistens anderes, als du erwartest. Viele spüren vor allem Müdigkeit, einen veränderten Geruchssinn und Übelkeit, die sich nicht an Tageszeiten hält. Andere merken kaum etwas. Beides ist normal, aus der Stärke der Beschwerden lässt sich nichts über den Verlauf ableiten.',
        },
        {
          type: 'paragraph',
          text: 'Organisatorisch passieren drei Dinge: Die Praxis stellt den Mutterpass aus, die Vorsorge beginnt, und du entscheidest, wann du im Umfeld und im Job Bescheid sagst. Für den Job gibt es keine Frist, und eine Mitteilungspflicht besteht nicht. Praktisch umsetzen kann dein Arbeitgeber den Mutterschutz aber erst, wenn er Bescheid weiß. Was ebenfalls in diese Wochen gehört und fast immer zu spät passiert: der Blick auf Krankenkasse und Versicherungsschutz.',
        },
      ],
    },
    {
      id: 'ernaehrung',
      heading: 'Was darf ich essen und trinken und was nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die klaren Punkte zuerst: Auf Alkohol und Rauchen verzichtest du vollständig, dafür gibt es keine untere Grenze, die als unbedenklich gilt. Der zweite große Block sind rohe tierische Lebensmittel, also rohes Fleisch, Rohmilchprodukte, roher Fisch und rohe Eier. Obst und Gemüse gründlich waschen. Koffein in Maßen ist in den üblichen Empfehlungen enthalten, die Menge besprichst du in der Praxis.',
        },
        {
          type: 'paragraph',
          text: 'Bei Nahrungsergänzung gilt dasselbe Prinzip. Folsäure und Jod kommen praktisch immer vor, und ob und wie viel du brauchst, entscheidet deine Frauenärztin oder deine Hebamme anhand deiner Werte. Wir nennen hier bewusst keine Dosierungen. Was im Drogeriemarkt als Schwangerschaftsvitamin steht, ersetzt dieses Gespräch nicht.',
        },
        {
          type: 'paragraph',
          text: 'Bewegung ist in einer unkomplizierten Schwangerschaft ausdrücklich erwünscht. Schwimmen, Spazieren, Radfahren auf sicheren Wegen und angepasstes Krafttraining sind übliche Empfehlungen, Sportarten mit Sturz- oder Stoßrisiko nicht.',
        },
        {
          type: 'paragraph',
          text: 'Ein Punkt, der in Ernährungsratgebern nie auftaucht, aber Geld bedeutet: Gesundheitskurse und Sportverein sind bei vielen Kassen bonusfähig. Wer Schwangerschaftsyoga oder Wassergymnastik macht, sollte sich die Teilnahme bescheinigen lassen.',
        },
      ],
    },
    {
      id: 'mutterpass',
      heading: 'Welche Untersuchungen stehen im Mutterpass und wann?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Mutterpass ist kein Formular, sondern dein Nachweisheft. Eingetragen werden die gesetzlichen Vorsorgeuntersuchungen, die Ultraschalltermine, Laborwerte und alles, was im Verlauf auffällt. Der Rhythmus liegt zunächst bei etwa vier Wochen und wird gegen Ende enger: In den letzten zwei Schwangerschaftsmonaten sind nach der Mutterschafts-Richtlinie je zwei Untersuchungen im Monat vorgesehen. Die drei regulären Ultraschall-Screenings liegen in den Zeitfenstern 8+0 bis 11+6, 18+0 bis 21+6 und 28+0 bis 31+6 Schwangerschaftswochen.',
        },
        {
          type: 'paragraph',
          text: 'Die Praxis sagt dir jeden Termin an. Drei Dinge lohnen sich trotzdem:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Den Mutterpass immer dabei haben.',
              text: 'Außerhalb deiner Praxis ist er die schnellste Auskunft über deinen Verlauf.',
            },
            {
              lead: 'Regelmäßig fotografieren.',
              text: 'Du brauchst die Einträge später als Nachweis, und ein verlorener Mutterpass ist nicht zu rekonstruieren.',
            },
            {
              lead: 'Früh eine Hebamme suchen.',
              text: 'Viele sind Monate im Voraus ausgebucht. Die Vorsorge kann teilweise bei der Hebamme stattfinden, die Nachsorge zu Hause ist eine Kassenleistung, und wer keine findet, steht nach der Geburt allein da.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'In diese Phase gehört auch die Entscheidung über den Geburtsort. Klinik, Geburtshaus und Hausgeburt haben unterschiedliche Anmeldefristen, beliebte Kliniken schließen Kreißsaalführung und Anmeldung früh.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Welche Untersuchungen zahlt die Kasse und welche nicht?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die gesetzlichen Mutterschaftsvorsorgen, die Standard-Ultraschalls und die üblichen Laborwerte übernimmt deine Krankenkasse. Darüber hinaus bietet dir die Praxis Leistungen an, die du selbst trägst: Feinultraschall, zusätzliche Ultraschalls, Toxoplasmose, Streptokokken, Cytomegalie und Nackenfaltenmessung.',
        },
        {
          type: 'paragraph',
          text: 'Dazu kommen Kosten, die nicht nach Medizin aussehen, aber ins Budget gehören: Geburtsvorbereitung mit Partnerbeteiligung, Rückbildung über das Kassenkontingent hinaus, Hebammenrufbereitschaft, Zuzahlungen und Fahrtkosten.',
        },
        {
          type: 'paragraph',
          text: 'Ob eine Selbstzahlerleistung in deinem Fall sinnvoll ist, ist eine medizinische Frage an deine Praxis. Die finanzielle Frage lautet nur: Woher kommt das Geld, wenn du dich dafür entscheidest.',
        },
        {
          type: 'table',
          caption: 'Was in welchem Schwangerschaftsdrittel ansteht',
          head: ['Drittel', 'Was ansteht', 'Was die Kasse zahlt', 'Was der Bonus bringt'],
          rows: [
            [
              '1. Drittel (bis ca. 13. Woche)',
              'Mutterpass, erste Vorsorgen, Hebammensuche, Arbeitgeber informieren',
              'gesetzliche Vorsorge, Standard-Ultraschall, Basislabor',
              'jede Mutterschaftsvorsorge zählt einzeln (IKK classic Nr. 09), je 10 EUR oder 30 EUR Zuschusswert',
            ],
            [
              '2. Drittel (ca. 14. bis 27. Woche)',
              'weitere Vorsorgen, Geburtsort festlegen, Geburtsvorbereitung planen, Mutterschutz klären',
              'gesetzliche Vorsorge, Standard-Ultraschall, Geburtsvorbereitung im Kassenrahmen',
              'Vorsorgen zählen weiter einzeln, Gesundheitskurs bonusfähig (Nr. 40)',
            ],
            [
              '3. Drittel (ab ca. 28. Woche)',
              'engere Intervalle, Klinikanmeldung, Mutterschutzfrist, Anträge vorbereiten',
              'gesetzliche Vorsorge, Standard-Ultraschall, Hebammenbetreuung',
              'Vorsorgen zählen weiter, danach Rückbildungsgymnastik (Nr. 44), 25 EUR oder 75 EUR Zuschusswert',
            ],
          ],
        },
      ],
    },
    {
      id: 'bonus',
      heading: 'Warum ist der Kassenbonus ausgerechnet jetzt am höchsten?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Weil die Mutterschaftsvorsorge bei der IKK classic unter Nummer 09 läuft und dort mehrfach im selben Jahr nachweisbar ist. Jede gesetzliche Untersuchung zählt als eigene Position, je 10 EUR Geldbonus oder 30 EUR Zuschusswert. Nur vier Positionen im gesamten Programm sind überhaupt mehrfach anrechenbar, Nummer 09 ist eine davon. Nach der Geburt kommt die Rückbildungsgymnastik unter Nummer 44 dazu, 25 EUR Geldbonus oder 75 EUR Zuschusswert.',
        },
        {
          type: 'paragraph',
          text: 'Deshalb kommt in der Schwangerschaft eine Summe zusammen, die sonst niemand erreicht. Laut Satzung sind bis zu 1.155 EUR Zuschusswert möglich, ein theoretischer Höchstwert, der voraussetzt, dass wirklich jede Position zusammenkommt. In der breiten Masse liegen aktive Versicherte bei 400 bis 700 EUR im Jahr. Drei Regeln gehören dazu, damit die Zahl nicht größer klingt, als sie ist:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Geldbonus oder Zuschuss, nie beides.',
              text: 'Du entscheidest dich beim Antrag für eins davon.',
            },
            {
              lead: 'Der Zuschuss ist das Dreifache, aber gedeckelt',
              text: 'auf deine tatsächlichen Kosten. Rechnerisch 405 EUR bei 240 EUR Jahresbeitrag ergeben 240 EUR, nie mehr.',
            },
            {
              lead: 'Der Jahresbeitrag einer Krankenzusatzversicherung zählt als Zuschussleistung,',
              text: 'dort unter Nummer 63.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Für Mutterschaftsvorsorgen ist ein schriftlicher Nachweis Pflicht, der Mutterpass genügt, und jede Untersuchung braucht ein eigenes Antragsfeld. Wer alle Termine in eine Zeile schreibt, verschenkt den Rest.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Ob sich das rechnet, hängt auch am Zusatzbeitrag deiner Kasse. Ein hoher Bonus bei einer teuren Kasse kann unter dem Strich schlechter sein als ein kleinerer bei einer günstigen. Alle bonusfähigen Positionen mit Beträgen, Nachweisen und der Gegenrechnung stehen im ',
            },
            { text: 'Ratgeber zum IKK-Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'zusatzschutz',
      heading: 'Welche Zusatzversicherung geht jetzt noch und welche kommt zu spät?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hier verläuft die Trennlinie zwischen Vorsorge und Entbindung.',
        },
        {
          type: 'paragraph',
          text: 'Ambulant geht noch etwas. Der Vorsorge-Topf der SDK AP-Tarife zahlt genau die Untersuchungen, die die Kasse nicht übernimmt. Er greift ohne Wartezeit und auch dann, wenn die Schwangerschaft bereits festgestellt ist. Je nach Tarifstufe werden 50 bis 100 Prozent erstattet, mit einem Höchstbetrag zwischen 200 und 500 EUR je zwei Kalenderjahre. Nicht im Topf sind gendiagnostische Untersuchungen wie NIPT und die Behandlung wegen der Schwangerschaft selbst. Komplikationen, Frühgeburten bis zur 36. Woche, Fehlgeburten und ein medizinisch indizierter Abbruch sind ausdrücklich versichert.',
        },
        {
          type: 'paragraph',
          text: 'Stationär ist die Geburt zu spät. Ein jetzt abgeschlossener Krankenhauszusatz deckt diese Entbindung nicht, weder Chefarztbehandlung noch Familienzimmer. Dafür sorgen die besondere Wartezeit von 8 Monaten und der Antragshinweis, dass laufende oder angeratene Behandlungen im Zusammenhang mit Schwangerschaft und Entbindung nicht mitversichert sind. Einen stationären Sofort-Baustein für eine bereits festgestellte Schwangerschaft haben wir bei keinem Anbieter gefunden. Wer dir einen Stationärtarif mit dem Versprechen verkauft, du kämst damit bei dieser Geburt ins Familienzimmer, liegt falsch.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Wofür der Stationärtarif trotzdem zählt, ist die Zeit danach: Er ist die Grundlage dafür, dass dein Kind nachversichert werden kann. Im Kindertarif ist Rooming-in für eine Begleitperson bei einem Kind bis 16 Jahren zu 100 Prozent enthalten, also bei jedem späteren Klinikaufenthalt deines Kindes. Die ausführliche Fassung mit allen Tarifstufen steht im Ratgeber ',
            },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'nachversicherung',
      heading: 'Wie wird mein Kind nachversichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Über die Nachversicherung. In der Regel kann ein Neugeborenes innerhalb von zwei Monaten nach der Geburt ohne erneute Gesundheitsprüfung aufgenommen werden, rückwirkend zum Tag der Geburt.',
        },
        {
          type: 'paragraph',
          text: 'Die Bedingung dahinter ist der entscheidende Punkt: Üblich ist, dass ein Elternteil zum Zeitpunkt der Geburt bereits mindestens drei Monate versichert sein muss, so die Grundregel des § 198 VVG. Ob dein Versicherer das verlangt und ob der Elternvertrag stationär sein muss oder ambulant genügt, gehört vor Abschluss geklärt. Das ist nicht für jeden Tarif abschließend geprüft, deshalb steht hier "in der Regel" und kein Anspruch.',
        },
        {
          type: 'paragraph',
          text: 'Praktisch heißt das: Wer in der Schwangerschaft daran denkt, hat die drei Monate meist noch vor sich, wer erst im Kreißsaal daran denkt, nicht mehr.',
        },
      ],
    },
    {
      id: 'job',
      heading: 'Was gilt im Job, in der Schutzfrist und bei den Anträgen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Mutterschutz gilt kraft Gesetzes ab der Schwangerschaft, nicht erst ab einer Mitteilung. Sobald dein Arbeitgeber Bescheid weiß, kann er ihn umsetzen: Kündigungsschutz, die Pflicht, deinen Arbeitsplatz auf Gefährdungen zu prüfen, und Beschränkungen bei Nacht-, Sonntags- und Mehrarbeit. Beim Kündigungsschutz gilt außerdem, dass er auch dann wirkt, wenn du die Schwangerschaft innerhalb von zwei Wochen nach Zugang einer Kündigung nachmeldest, so § 17 Abs. 1 MuSchG.',
        },
        {
          type: 'paragraph',
          text: 'Lässt sich eine Gefährdung nicht ausräumen, kann ein betriebliches Beschäftigungsverbot ausgesprochen werden. Das ist etwas anderes als eine Krankschreibung und folgt eigenen Regeln.',
        },
        {
          type: 'paragraph',
          text: 'Die Schutzfrist beginnt üblicherweise 6 Wochen vor dem errechneten Termin und endet 8 Wochen nach der Geburt; bei Früh- und Mehrlingsgeburten verlängert sie sich auf zwölf Wochen. In dieser Zeit bekommst du Mutterschaftsgeld, bei eigener Mitgliedschaft in der gesetzlichen Krankenkasse von der Kasse, sonst vom Bundesamt für Soziale Sicherung, und in der Regel einen Zuschuss vom Arbeitgeber. Diese Eckwerte ändern sich gelegentlich, den aktuellen Stand und die Antragswege findest du beim Familienportal des Bundes.',
        },
        {
          type: 'paragraph',
          text: 'Elterngeld und Elternzeit sind zwei getrennte Dinge. Die Elternzeit meldest du beim Arbeitgeber an, dafür gilt eine gesetzliche Ankündigungsfrist von sieben Wochen vor Beginn, bei Zeiten zwischen dem dritten und achten Geburtstag von 13 Wochen. Das Elterngeld beantragst du schriftlich bei der Elterngeldstelle, praktisch erst nach der Geburt, weil die Geburtsurkunde dazugehört. Warte damit nicht zu lange: Rückwirkend wird Elterngeld nur für die letzten drei Lebensmonate vor dem Monat gezahlt, in dem dein Antrag eingeht, so § 7 Abs. 1 BEEG.',
        },
      ],
    },
    {
      id: 'checkliste',
      heading: 'Was gehört auf die Liste für die letzten Wochen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine kurze Liste, die du abarbeiten kannst:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Klinik oder Geburtshaus angemeldet,',
              text: 'Anfahrtsweg einmal gefahren.',
            },
            {
              lead: 'Tasche gepackt,',
              text: 'Mutterpass, Ausweis, Versichertenkarte obenauf.',
            },
            {
              lead: 'Nachsorgehebamme bestätigt,',
              text: 'nicht nur angefragt.',
            },
            {
              lead: 'Vaterschaftsanerkennung und Sorgeerklärung,',
              text: 'falls ihr nicht verheiratet seid, lassen sich vor der Geburt erledigen.',
            },
            {
              lead: 'Anträge vorbereitet:',
              text: 'Geburtsurkunde, Elterngeld, Kindergeld, Anmeldung des Kindes bei der Krankenkasse.',
            },
            {
              lead: 'Bonusantrag im Blick.',
              text: 'Jede Maßnahme muss ins Kalenderjahr fallen, in dem sie stattgefunden hat, und der Antrag hat eine feste Frist im Folgejahr. Wer im Dezember entbindet, hat zwei Bonusjahre zu sortieren.',
            },
            {
              lead: 'Zusatzschutz geklärt,',
              text: 'samt der Frage, was für die Nachversicherung deines Kindes gilt.',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio kombiniert Kassenbonusprogramme mit Zusatzversicherungen zu einem Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus ist jährlich; im besten Fall deckt er den Beitrag ganz, in den meisten Fällen zum großen Teil. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Welche Untersuchungen in der Schwangerschaft muss ich selbst bezahlen?',
      answer:
        'In der Regel Feinultraschall, zusätzliche Ultraschalls, Toxoplasmose, Streptokokken, Cytomegalie und die Nackenfaltenmessung. Die gesetzlichen Vorsorgen, die Standard-Ultraschalls und das Basislabor übernimmt deine Kasse.',
    },
    {
      question: 'Zählt jede Vorsorgeuntersuchung einzeln für den Kassenbonus?',
      answer:
        'Bei der IKK classic ja. Die Mutterschaftsvorsorge läuft dort unter Nummer 09 und ist mehrfach im selben Jahr nachweisbar, je 10 EUR Geldbonus oder 30 EUR Zuschusswert. Der Mutterpass genügt als Nachweis. Bei anderen Kassen gilt deren Satzung.',
    },
    {
      question: 'Kann ich in der Schwangerschaft noch eine Zusatzversicherung abschließen?',
      answer:
        'Ambulant ja, der Vorsorge-Topf greift ohne Wartezeit und auch bei bereits festgestellter Schwangerschaft. Stationär bekommst du diese Entbindung nicht mehr versichert.',
    },
    {
      question: 'Ich bin in der 20. Woche. Lohnt sich ein ambulanter Tarif überhaupt noch?',
      answer:
        'Er kann sich lohnen, weil es keine Wartezeit gibt und der Topf je zwei Kalenderjahre gilt. Ob der Beitrag sich rechnet, hängt davon ab, wie viele Selbstzahlerleistungen noch anstehen.',
    },
    {
      question: 'Wann sollte ich die Hebamme suchen?',
      answer:
        'So früh wie möglich, in vielen Regionen schon im ersten Drittel. Die Nachsorge zu Hause ist eine Kassenleistung, aber nur, wenn du jemanden findest, der sie übernimmt.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Auf ' },
      { text: 'healio.de/schwangerschaft', to: '/schwangerschaft' },
      { text: ' findest du den Überblick für diese Phase samt Bonusrechner, auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ', was der Vorsorge-Topf je Tarifstufe erstattet, auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' den quellenbelegten Satzungsvergleich, welche Kasse in deiner Situation den höchsten Bonus zahlt, und im Ratgeber ',
      },
      { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
      { text: ' den Versicherungsteil im Detail.' },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Dieser Text ersetzt keine medizinische Beratung; gesetzliche Eckwerte zu Mutterschutz, Mutterschaftsgeld, Elterngeld und Elternzeit ändern sich, maßgeblich sind die geltenden Gesetze.',
};

export default article;
