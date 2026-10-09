import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-ab-wann',
    cluster: 'grundlagen',
    audience: 'standard',
    nextStep: 'webinar',
    metaTitle: 'Altersvorsorgedepot: Ab wann geht es los?',
    metaDescription: 'Produktstart am 1. Januar 2027: Was du vorher vorbereiten kannst und warum Beitragsjahr, Startdatum und Zulagenantragsfrist verschieden sind.',
    headline: 'Altersvorsorgedepot: Ab wann kannst du anfangen?',
    lead: 'Neue Altersvorsorgeprodukte können ab 1. Januar 2027 angeboten werden. Das Reformgesetz ist bereits beschlossen und in Kraft. Vor dem Produktstart kannst du deine Vorsorge prüfen und Informationen vormerken. Für die Förderung 2027 zählt der im Jahr 2027 geleistete Eigenbeitrag; ein Abschluss im Januar ist dafür keine allgemeine Voraussetzung.',
    listTeaser: 'Startdatum, Vorbereitung und die verschiedenen Fristen verständlich auseinanderhalten.',
    sections: [
      {
        id: 'gesetz-und-produktstart',
        heading: 'Das Gesetz steht, die konkreten Angebote müssen folgen',
        blocks: [
          { type: 'paragraph', text: 'Der Bundestag beschloss die Reform am 27. März 2026, der Bundesrat stimmte am 8. Mai zu. Ende Mai trat die Reform in Kraft. Die neue Produktwelt startet zum 1. Januar 2027. Deshalb solltest du zwei Aussagen unterscheiden: Die gesetzliche Grundlage steht bereits fest. Welche konkreten Verträge ein bestimmter Anbieter zum Start bereithält, ist eine eigene Frage.' },
          { type: 'paragraph', text: 'Ein Termin im Kalender sagt noch nichts über die Qualität eines Angebots aus. Vor einem Abschluss brauchst du die tatsächlichen Produktinformationen, Kosten, Anlagemöglichkeiten und Auszahlungsregeln. Ankündigungen oder eine Warteliste liefern diese Prüfung nicht. Ebenso wenig entsteht durch eine Webinar-Anmeldung ein Vorsorgevertrag oder eine staatliche Zulage.' },
        ],
      },
      {
        id: 'fristen-unterscheiden',
        heading: 'Drei Zeitpunkte, die du auseinanderhalten solltest',
        blocks: [
          { type: 'table', caption: 'Was die einzelnen Termine bedeuten', head: ['Zeitpunkt', 'Bedeutung', 'Praktische Folge'], rows: [
            ['1. Januar 2027', 'Neue Produkte können angeboten werden', 'Ab dann konkrete Angebote prüfen und gegebenenfalls abschließen'],
            ['Beitragsjahr 2027', 'Eigenbeiträge dieses Jahres bestimmen die Förderung', 'Einzahlungen rechtzeitig innerhalb dieses Jahres leisten'],
            ['31. Dezember 2029', 'Regelmäßiges Ende der Antragsfrist für die Zulage 2027', 'Zulage über den Anbieter beantragen; Dauerbevollmächtigung prüfen'],
          ], note: 'Die spätere Antragsfrist erlaubt keine nachträglichen Eigenbeiträge für ein bereits abgelaufenes Beitragsjahr.' },
          { type: 'paragraph', text: 'Diese Unterscheidung verhindert einen typischen Fehler: Wer erst später den Zulagenantrag stellt, kann dadurch eine fehlende Einzahlung im Vorjahr nicht nachholen. Umgekehrt bedeutet die jährliche Förderung nicht, dass du am ersten Tag des Jahres bereits einen Vertrag besitzen musst. Entscheidend sind die gesetzlichen Voraussetzungen und die tatsächlichen Beiträge im jeweiligen Jahr.' },
        ],
      },
      {
        id: 'einstieg-im-jahr',
        heading: 'Auch ein späterer Einstieg im Jahr kann gefördert werden',
        blocks: [
          { type: 'paragraph', text: 'Die neue Grundzulage wird anhand deiner Jahresbeiträge berechnet. Wenn du später im Jahr startest, bleibt weniger Zeit, um den geplanten Betrag einzuzahlen. Ein früher Start kann den Eigenbeitrag auf mehr Monate verteilen. Er ist aber kein allgemeiner Januar-Stichtag, nach dem die Förderung des ganzen Jahres entfällt.' },
          { type: 'paragraph', text: 'Beispiel: Wer 2027 unmittelbar förderberechtigt ist, insgesamt 1.800 EUR einzahlt und die weiteren Voraussetzungen erfüllt, kann die maximale Grundzulage von 540 EUR erhalten. Bei zwölf gleichen Monatsbeiträgen entspricht das 150 EUR im Monat. Bei einem späteren Beginn wäre für dieselbe Jahressumme ein höherer verbleibender Beitrag nötig. Ob Sonderzahlungen möglich sind und wann sie verbucht werden, musst du mit dem Anbieter klären.' },
        ],
      },
      {
        id: 'vorbereitung-2026',
        heading: 'Was du bis zum Start sinnvoll vorbereiten kannst',
        blocks: [
          { type: 'list', items: [
            { lead: 'Bestehende Vorsorge erfassen:', text: 'Notiere Riester-Verträge, andere Rentenverträge und frei verfügbares Sparvermögen getrennt.' },
            { lead: 'Beitrag festlegen:', text: 'Plane einen Betrag, der nach laufenden Ausgaben und Rücklagen dauerhaft tragbar ist.' },
            { lead: 'Berechtigung prüfen:', text: 'Kläre Beschäftigungsstatus, mögliche Selbstständigkeit und die Voraussetzungen für Kinderzulagen.' },
            { lead: 'Unterlagen sammeln:', text: 'Halte Jahresmitteilungen, aktuelle Kosteninformationen und vorhandene Garantien bereit.' },
            { lead: 'Fragen notieren:', text: 'Welche Informationen fehlen zu Risiko, Geldbindung, Steuern oder Auszahlung?' },
          ] },
          { type: 'paragraph', text: 'Für einen Riester-Bestand brauchst du außerdem einen Vergleich der alten und neuen Förderung. Ein späterer Wechsel muss nicht allein deshalb sinnvoll sein, weil ein Produkt neu ist. Kündige einen Vertrag nicht vorsorglich zur Vorbereitung. Bei Auszahlung des Guthabens können Zulagen und Steuerermäßigungen zurückgefordert werden.' },
        ],
      },
      {
        id: 'entscheidung-ohne-stichtagsdruck',
        heading: 'Den Abschluss an Informationen knüpfen, nicht an eine Warteliste',
        blocks: [
          { type: 'paragraph', text: 'Nutze die Zeit vor dem Start, um Begriffe und persönliche Ziele zu klären. Danach kannst du ein konkretes Angebot mit derselben Checkliste prüfen. Besonders hilfreich ist eine Gegenüberstellung des laufenden Eigenbeitrags, der erwarteten Zulage, der ausgewiesenen Kosten und der späteren Leistung unter verschiedenen Annahmen.' },
          { type: 'paragraph', text: 'Für Riester gibt es keine allgemeine Pflicht, bis Ende 2027 zu wechseln. Eine sachliche Zeitplanung berücksichtigt stattdessen Beitragszahlungen, Bearbeitungszeiten und die individuelle Vertragssituation. Wenn du Informationen vormerkst, achte darauf, wofür du deine Einwilligung erteilst. Eine Nachricht zum Produktstart und eine verbindliche Entscheidung über deine Altersvorsorge sind unterschiedliche Schritte.' },
        ],
      },
    ],
    faqs: [
      { question: 'Kann ich das neue Depot schon 2026 abschließen?', answer: 'Die neuen Produkte können erst ab 1. Januar 2027 angeboten werden. Vorher lassen sich Informationen sammeln und Interessen vormerken. Das ist noch kein Abschluss eines neuen geförderten Vertrags.' },
      { question: 'Verliere ich die Förderung, wenn ich erst im Sommer starte?', answer: 'Nicht allein wegen des Startmonats. Die neue Zulage richtet sich nach den im Beitragsjahr geleisteten Eigenbeiträgen. Berechtigung, Mindestbeitrag und weitere Voraussetzungen müssen erfüllt sein.' },
      { question: 'Reicht es, Ende 2029 Geld für 2027 einzuzahlen?', answer: 'Nein. Die Antragsfrist für die Zulage 2027 und die Einzahlung im Beitragsjahr 2027 sind getrennt. Ein späterer Antrag ersetzt keine rechtzeitige Beitragszahlung.' },
    ],
    sourceIds: ['regierung', 'gesetz', 'estg89', 'riester-kuendigung'],
    relatedSlugs: ['altersvorsorgedepot-foerderung', 'riester-jahresmitteilung-checkliste'],
  });
