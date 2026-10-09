import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-auszahlung',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'webinar',
    metaTitle: 'Altersvorsorgedepot: Rente oder Auszahlplan? | Healio',
    metaDescription: 'Auszahlungsbeginn, lebenslange Rente, Auszahlplan bis mindestens 85 und bis zu 30 Prozent Startkapital: Welche Fragen du vor der Entscheidung klärst.',
    headline: 'Altersvorsorgedepot auszahlen: Lebenslange Rente oder Auszahlplan?',
    lead: 'Die spätere Auszahlung ist ein eigener Teil deiner Vorsorgeentscheidung. Die Reform ermöglicht neben einer lebenslangen Rente einen Auszahlplan, der mindestens bis zum 85. Geburtstag reicht. Beide Wege erfüllen unterschiedliche Aufgaben. Hinzu kommt die Möglichkeit, zu Beginn bis zu 30 Prozent des Kapitals auf einmal zu erhalten.',
    listTeaser: 'Die Auszahlungswege und ihre Grenzen für deine spätere Einkommensplanung.',
    sections: [
      {
        id: 'beginn',
        heading: 'Wann die reguläre Auszahlung beginnen kann',
        blocks: [
          { type: 'paragraph', text: 'Bei neuen geförderten Verträgen beginnt die Auszahlung grundsätzlich nicht vor dem 65. und nicht nach dem 70. Geburtstag. Eine Ausnahme ist vorgesehen, wenn eine Leistung aus einem gesetzlichen Alterssicherungssystem bereits vor dem 65. Geburtstag beginnt. Der vertragliche Start und die gesetzlichen Voraussetzungen müssen zusammenpassen. Ein frei gewähltes früheres Ende des Berufslebens genügt dafür nicht automatisch.' },
          { type: 'paragraph', text: 'Denk auch an die Zeit bis zu diesem Beginn. Wenn du früher weniger arbeiten möchtest, brauchst du für diese Jahre eine andere Finanzierung. Das Altersvorsorgedepot ist nicht allein deshalb schon verfügbar, weil du es Rente nennst. Bestehende Riester-Verträge können andere Regeln haben und gehören gesondert geprüft.' },
        ],
      },
      {
        id: 'wege',
        heading: 'Laufende Zahlungen können unterschiedlich organisiert sein',
        blocks: [
          { type: 'table', caption: 'Zwei Auszahlungswege, unterschiedliche Planungsfragen', head: ['Weg', 'Grundprinzip', 'Was du prüfen solltest'], rows: [
            ['Lebenslange Rente', 'Zahlungen grundsätzlich für deine gesamte Lebensdauer', 'Zugesagte Leistung, Kosten und Folgen bei frühem Tod'],
            ['Auszahlplan', 'Verteilung über eine Laufzeit bis mindestens zum 85. Geburtstag', 'Ende der Laufzeit, mögliche Veränderungen und Einkommen danach'],
            ['Startkapital', 'Bis zu 30 Prozent zu Beginn außerhalb laufender Leistungen', 'Steuer im Auszahlungsjahr und geringer verbleibendes Vermögen'],
          ], note: 'Die genaue Ausgestaltung steht im jeweiligen Angebot. Ein Auszahlplan ist keine automatische lebenslange Zahlung.' },
          { type: 'paragraph', text: 'Eine lebenslange Rente beantwortet die Frage, wie regelmäßiges Einkommen bis zum Lebensende organisiert wird. Ein Auszahlplan verteilt Vermögen über eine festgelegte Zeit. Wenn dieser endet, besteht daraus nicht automatisch derselbe Zahlungsanspruch weiter. Frage deshalb ausdrücklich, bis zu welchem Alter der Plan läuft und welche anderen Einnahmen du anschließend hast.' },
        ],
      },
      {
        id: 'hoehe',
        heading: 'Ein Auszahlplan bedeutet nicht zwingend einen konstanten Betrag',
        blocks: [
          { type: 'paragraph', text: 'Der gesetzliche Rahmen sieht beim Auszahlplan eine wiederkehrende Neufestlegung der monatlichen Leistung vor. Dabei spielen das verbleibende Kapital und die Restlaufzeit eine Rolle. Du solltest daher nicht allein auf die erste Monatszahlung schauen. Lass dir erklären, wann neu gerechnet wird und welche Entwicklung zu höheren oder niedrigeren Zahlungen führen kann.' },
          { type: 'paragraph', text: 'Auch bei Rentenangeboten musst du garantierte Beträge und mögliche zusätzliche Leistungen unterscheiden. Ein Beispielwert mit angenommener Wertentwicklung ist keine Zusage. Vergleiche außerdem die Kosten der Auszahlungsphase. Eine günstige Ansparphase allein sagt noch nicht, wie viel dir später regelmäßig zur Verfügung steht.' },
        ],
      },
      {
        id: 'einmalzahlung',
        heading: 'Die Einmalzahlung gehört in deine gesamte Rentenrechnung',
        blocks: [
          { type: 'paragraph', text: 'Bis zu 30 Prozent des Kapitals können zu Beginn der Auszahlungsphase außerhalb der monatlichen Leistungen ausgezahlt werden. Bei einem rein rechnerischen Guthaben von 60.000 EUR wären 30 Prozent 18.000 EUR. Danach blieben 42.000 EUR als Ausgangspunkt für weitere Leistungen. Dieses Beispiel erklärt die Aufteilung, ohne Steuern, Kosten oder die konkrete Leistungsberechnung zu prognostizieren.' },
          { type: 'paragraph', text: 'Überlege vor der Wahl, welche Aufgabe das Startkapital erfüllen soll. Eine geplante größere Ausgabe ist etwas anderes als laufender Lebensunterhalt. Die Zahlung ist grundsätzlich steuerlich relevant; ein höherer Zufluss in einem Jahr kann die steuerliche Situation beeinflussen. Rechne deshalb nicht nur mit dem Bruttobetrag. Prüfe die Einmalzahlung gemeinsam mit deinen übrigen Einnahmen und Verpflichtungen.' },
        ],
      },
      {
        id: 'planung',
        heading: 'Mit diesen Fragen bereitest du die Entscheidung vor',
        blocks: [
          { type: 'list', items: [
            'Welche laufenden Ausgaben müssen auch in sehr hohem Alter gedeckt sein?',
            'Welche Einnahmen stehen lebenslang zur Verfügung, welche enden zu einem bestimmten Zeitpunkt?',
            'Welche Schwankung der monatlichen Zahlung kann ich tragen?',
            'Wie wichtig sind mir eine Einmalzahlung und die vertraglichen Regeln bei frühem Tod?',
            'Welche Kosten und Steuern sind in der ausgewiesenen Auszahlung bereits berücksichtigt?',
          ] },
          { type: 'paragraph', text: 'Du musst heute nicht jede Entscheidung für deinen späteren Ruhestand festlegen. Aber du solltest schon beim Abschluss verstehen, welche Wege der Vertrag ermöglicht und wann die Auswahl erfolgt. Das Webinar erklärt die Grundprinzipien. Einen konkreten Auszahlungsplan erstellt man anhand deiner Situation und der dann gültigen Produktbedingungen.' },
        ],
      },
    ],
    faqs: [
      { question: 'Zahlt der Auszahlplan automatisch lebenslang?', answer: 'Nein. Er muss mindestens bis zum 85. Geburtstag reichen. Die vereinbarte Laufzeit kann länger sein, eine lebenslange Zahlung folgt daraus aber nicht automatisch.' },
      { question: 'Sind die 30 Prozent Startkapital steuerfrei?', answer: 'Die Kapitalauszahlung ist grundsätzlich steuerlich relevant. Wie sie sich auswirkt, hängt von deinen Einkünften und den geförderten beziehungsweise nicht geförderten Vertragsbestandteilen ab.' },
      { question: 'Kann ich einfach schon mit 60 beginnen?', answer: 'Der reguläre Beginn liegt bei neuen Verträgen grundsätzlich zwischen 65 und 70. Für frühere gesetzliche Altersleistungen ist eine Ausnahme vorgesehen. Ob sie greift, muss im konkreten Fall geprüft werden.' },
    ],
    sourceIds: ['gesetz'],
    relatedSlugs: ['altersvorsorgedepot-steuern', 'altersvorsorgedepot-garantie'],
  });
