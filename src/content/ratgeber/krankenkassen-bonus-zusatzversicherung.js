/**
 * Advertorial 1: Die KassenBoost-Geschichte.
 *
 * Quelle: Briefing "Ratgeber-Bereich und Advertorial 1 auf healio.de",
 * Abschnitt 5, Stand 21.09.2026. Der Text ist wortgleich uebernommen, nur
 * die Anrede wurde von Sie auf Du umgestellt (Franks Entscheidung, weil
 * alle Verbraucherseiten Du sprechen). Ein Rueckwechsel auf Sie betrifft
 * ausschliesslich diese Datei: die Vorlage enthaelt keinen Anredetext.
 *
 * Die inhaltlichen Grenzen aus Abschnitt 4 des Briefings gelten. Nichts an
 * diesem Text "verbessern": keine Unterstellung persoenlicher Merkmale,
 * keine Garantien, keine erfundenen Zahlen, keine politische Zuspitzung.
 */

export const article = {
  slug: 'krankenkassen-bonus-zusatzversicherung',
  kind: 'advertorial',

  // Meta-Angaben fuer SEOHead und scripts/seo-routes.mjs.
  metaTitle: 'Krankenkassen-Bonus nutzen und Zusatzschutz finanzieren | Healio',
  metaDescription:
    'Wie das Bonusprogramm der eigenen gesetzlichen Krankenkasse den größten Teil einer ambulanten Zusatzversicherung trägt. Erst prüfen, dann entscheiden.',

  // Darstellung in der Uebersicht /ratgeber.
  listTitle: 'Krankenkassen-Bonus: das Geld, mit dem sich Zusatzschutz finanzieren lässt',
  listTeaser:
    'Warum ein Blick in die Satzung der eigenen Krankenkasse oft mehr bringt als jeder Tarifwechsel.',

  headline:
    'Die meisten gesetzlich Versicherten lassen jedes Jahr mehrere hundert Euro liegen. Ohne es zu wissen.',
  lead:
    'Warum ein Blick in die Satzung der eigenen Krankenkasse oft mehr bringt als jeder Tarifwechsel. Und wie sich daraus eine Zusatzversicherung finanzieren lässt.',

  sections: [
    {
      id: 'beobachtung',
      heading: 'Erst einmal die unbequeme Beobachtung',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gesundheit ist in den letzten Jahren spürbar teurer geworden. Die Beiträge steigen, die Zusatzbeiträge steigen, und gleichzeitig wandert immer mehr in den Eigenanteil. Brille, Zahnersatz, Osteopathie, das Einbettzimmer im Krankenhaus. Wer das schon einmal selbst bezahlt hat, weiß, wie schnell da vierstellige Beträge zusammenkommen.',
        },
        {
          type: 'paragraph',
          text: 'Es sieht nicht so aus, als würde sich diese Richtung in den nächsten Jahren umdrehen. Also braucht es einen anderen Weg als warten und hoffen.',
        },
      ],
    },
    {
      id: 'bonusprogramme',
      heading: 'Was fast niemand ausnutzt',
      blocks: [
        {
          type: 'paragraph',
          text: 'Jede gesetzliche Krankenkasse in Deutschland darf ein Bonusprogramm anbieten. Das ist kein Werbegeschenk, sondern in der Satzung der Kasse geregelt. Wer bestimmte Dinge nachweist, bekommt Geld zurück.',
        },
        {
          // Im Briefing steht hier "Sie holen sich nur das Geld dafuer nicht
          // ab." Das "Sie" meint dort die meisten Menschen, nicht die
          // Leserin. In der Du-Fassung waere es missverstaendlich, deshalb
          // dieselbe Aussage in derselben Wortwahl wie Anzeigenvariante 2.
          type: 'paragraph',
          text: 'Das Erstaunliche daran: Die meisten Menschen tun diese Dinge ohnehin. Nur das Geld dafür holen sie sich nicht ab.',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel von der IKK Classic, weil deren Programm zu den stärkeren gehört. Nachgewiesen werden können unter anderem:',
        },
        {
          type: 'list',
          items: [
            'die Vorsorgeuntersuchung beim Hausarzt',
            'die zwei Zahnvorsorgetermine im Jahr',
            'ein vollständiger Impfschutz',
            'die Mitgliedschaft im Fitnessstudio oder Sportverein',
            'gesunde Werte bei Blutdruck, Body-Mass-Index und Nichtrauchen',
          ],
        },
        {
          type: 'paragraph',
          text: 'Wer regelmäßig Sport macht, zur Vorsorge geht und ordentliche Werte hat, landet damit schnell im Bereich von 350 bis 500 Euro im Jahr. Rechnerisch möglich sind bei voller Ausschöpfung sogar bis zu 1.155 Euro, das erreicht allerdings kaum jemand, weil dafür wirklich jede einzelne Maßnahme zusammenkommen müsste.',
        },
        // Platzhalter aus Briefing Abschnitt 5, bewusst NICHT veroeffentlicht.
        // Frank entscheidet, ob er persoenlich im Text auftritt. Zum
        // Aktivieren diesen Block einkommentieren:
        // {
        //   type: 'paragraph',
        //   text: 'Ich selbst komme auf rund 600 Euro im Jahr.',
        // },
      ],
    },
    {
      id: 'rechnung',
      heading: 'Und jetzt kommt der eigentliche Punkt',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nehmen wir die untere Kante, 350 Euro im Jahr. Nicht den Bestwert, sondern das, was realistisch drin ist.',
        },
        {
          type: 'paragraph',
          text: 'Mit diesem Geld lässt sich der überwiegende Teil einer ambulanten Zusatzversicherung finanzieren. Also genau die Absicherung, die die Lücken schließt, über die sich alle ärgern: Heilpraktiker, Sehhilfen, Vorsorge über den Kassenkatalog hinaus.',
        },
        {
          type: 'paragraph',
          text: 'Die Rechnung ist damit eine ganz andere als sonst. Es geht nicht um die Frage "Kann ich mir noch eine Versicherung leisten?", sondern um die Frage "Warum verschenke ich jedes Jahr das Geld, mit dem ich sie bezahlen könnte?"',
        },
      ],
    },
    {
      id: 'haken',
      heading: 'Der Haken, den man kennen sollte',
      blocks: [
        {
          type: 'paragraph',
          text: 'Zwei Dinge sind wichtig.',
        },
        {
          type: 'paragraph',
          text: 'Erstens: Die Bonusprogramme unterscheiden sich stark. Es gibt rund 93 gesetzliche Krankenkassen in Deutschland, und zwischen der besten und der schwächsten liegen mehrere hundert Euro im Jahr. Bei der eigenen Kasse nachzusehen lohnt sich also doppelt.',
        },
        {
          type: 'paragraph',
          text: 'Zweitens: Eine Zusatzversicherung greift nur für das, was neu beginnt. Laufende oder bereits angeratene Behandlungen sind nicht versichert. Wer also ohnehin weiß, dass etwas ansteht, sollte lieber früher als später schauen.',
        },
      ],
    },
    {
      id: 'naechster-schritt',
      heading: 'Was du jetzt tun kannst',
      blocks: [
        {
          type: 'paragraph',
          text: 'Wir haben die Bonusprogramme der gesetzlichen Krankenkassen ausgewertet und in einen kurzen Check gepackt. Du wählst deine Kasse aus und siehst, was für dich herauskommt. Das dauert keine zwei Minuten und kostet nichts.',
        },
        {
          type: 'paragraph',
          text: 'Wenn sich daraus etwas ergibt, zeigen wir dir im Anschluss, wie sich der Betrag in eine Absicherung umwandeln lässt. Wenn nicht, weißt du es wenigstens.',
        },
      ],
    },
  ],

  // Beschriftung und Positionen des Buttons. Der dritte Auftritt ist die
  // feste Leiste auf dem Handy, die die Vorlage unter md einblendet.
  ctaLabel: 'Jetzt Kasse prüfen',
  ctaAfterSectionId: 'rechnung',

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft.',
};

export default article;
