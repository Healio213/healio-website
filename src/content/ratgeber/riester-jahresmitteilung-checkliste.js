import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'riester-jahresmitteilung-checkliste',
    cluster: 'riester',
    audience: 'riester',
    nextStep: 'check',
    metaTitle: 'Riester-Jahresmitteilung: Deine Checkliste',
    metaDescription: 'Mitteilung prüfen: Beiträge, Zulagen, Kosten, Guthaben und Garantien. Welche Unterlagen und Fragen du für einen möglichen Wechsel ab 2027 brauchst.',
    headline: 'Riester-Jahresmitteilung prüfen: Eine praktische Checkliste',
    lead: 'Deine Riester-Jahresmitteilung ist der erste Baustein für einen Vertragscheck. Prüfe eigene Beiträge, erhaltene Zulagen, ausgewiesene Kosten, Guthaben und garantierte Leistungen getrennt. Für eine Wechselentscheidung brauchst du zusätzlich aktuelle Werte und Vertragsbedingungen. Ein einzelner Guthabenstand zeigt weder die gesamte Förderung noch den Betrag, der übertragen oder ausgezahlt werden könnte.',
    listTeaser: 'Welche Zahlen du markieren und welche Fragen du dem Anbieter stellen solltest.',
    sections: [
      {
        id: 'unterlagen-zusammenlegen',
        heading: 'Lege zuerst die passenden Unterlagen zusammen',
        blocks: [
          { type: 'paragraph', text: 'Nimm die neueste Jahresmitteilung, die Bescheinigung zu Beiträgen und Zulagen, den Versicherungsschein oder Vertrag und die ursprünglichen Produktinformationen zur Hand. Ergänze spätere Vertragsänderungen und aktuelle Kosteninformationen. Falls du mehrere Riester-Verträge hast, lege für jeden dieselben Unterlagen bereit und ordne sie mit Vertragsnummer und Stichtag zu.' },
          { type: 'paragraph', text: 'Eine Jahresmitteilung beschreibt das vergangene Jahr. Die Jahresmitteilung kann daher Informationen enthalten, die für eine Entscheidung heute schon überholt sind. Markiere fehlende oder unklare Werte und frage gezielt nach. Für einen ersten Überblick musst du hier keine vertraulichen Dokumente veröffentlichen. Notiere die Fragen und bring die Unterlagen in das persönliche Gespräch mit.' },
        ],
      },
      {
        id: 'zahlen-markieren',
        heading: 'Diese Felder solltest du markieren',
        blocks: [
          { type: 'table', caption: 'Prüffelder in der Jahresmitteilung und den ergänzenden Unterlagen', head: ['Angabe', 'Was sie zeigt', 'Passende Rückfrage'], rows: [
            ['Eigene Beiträge', 'Deine tatsächlichen Einzahlungen für den Zeitraum', 'Wurden alle Zahlungen dem richtigen Beitragsjahr zugeordnet?'],
            ['Zulagen', 'Gutgeschriebene oder zurückgeforderte Förderung', 'Welche Jahre und Kinder betreffen die Buchungen?'],
            ['Kosten', 'Ausgewiesene Belastungen des Vertrags', 'Welche Kosten fallen künftig weiter an?'],
            ['Guthaben', 'Wert zum angegebenen Stichtag', 'Wie hoch ist der aktuelle Übertragungswert?'],
            ['Garantierte Leistungen', 'Vertragliche Zusagen unter den genannten Bedingungen', 'Was gilt bei Beitragsfreistellung oder Transfer?'],
          ], note: 'Nicht jede Information steht in einem einzigen Dokument. Eine zusätzliche Steuerermäßigung ist keine Zulagengutschrift im Vertrag.' },
          { type: 'paragraph', text: 'Lies stets den Zeitraum und die Bedingungen neben einer Zahl. Eine Prognose bei unveränderten Beiträgen ist etwas anderes als eine garantierte Leistung. Ebenso ist der Vertragswert nicht mit der Summe deiner Einzahlungen gleichzusetzen. Kosten, Anlagenentwicklung und die Zeitpunkte von Zulagenbuchungen können Unterschiede erklären.' },
        ],
      },
      {
        id: 'zulagen-pruefen',
        heading: 'Prüfe Förderung nach Beitragsjahren, nicht nur nach Eingang',
        blocks: [
          { type: 'paragraph', text: 'Zulagen können zeitversetzt eingehen oder nachträglich korrigiert werden. Ordne jede Buchung deshalb dem betreffenden Beitragsjahr zu. Prüfe, ob Grund- und Kinderzulagen vollständig beantragt wurden und ob die Angaben beim Anbieter aktuell sind. Relevant können beispielsweise Beschäftigungswechsel, Kindergeldberechtigung oder eine veränderte Partnersituation sein.' },
          { type: 'paragraph', text: 'Die Zulage wird über den Anbieter beantragt. Eine Dauerbevollmächtigung kann die jährliche Antragstellung übernehmen, ersetzt aber nicht die Mitteilung relevanter Änderungen. Für den Antrag gilt grundsätzlich das Ende des zweiten Kalenderjahres nach dem Beitragsjahr. Fehlende Beiträge für ein abgelaufenes Jahr lassen sich dadurch nicht nachträglich ausgleichen. Bei einem Bescheid mit Abweichungen prüfe die darin genannten Fristen.' },
        ],
      },
      {
        id: 'werte-fuer-wechsel',
        heading: 'Für den Vergleich ab 2027 brauchst du aktuelle Zusatzangaben',
        blocks: [
          { type: 'list', items: [
            { lead: 'Übertragungswert:', text: 'Welcher Betrag geht bei einem Transfer zum gewünschten Termin tatsächlich in den neuen Vertrag?' },
            { lead: 'Kündigungsabrechnung:', text: 'Welcher Betrag bliebe bei Auszahlung nach Kosten und Rückforderung der Förderung?' },
            { lead: 'Beitragsfreistellung:', text: 'Welche Leistungen und Kosten gelten, wenn du keine neuen Beiträge zahlst?' },
            { lead: 'Künftige Belastungen:', text: 'Welche Verwaltungs-, Anlage- und sonstigen Vertragskosten sind noch zu erwarten?' },
            { lead: 'Auszahlung:', text: 'Welche Renten- oder Auszahlungsregeln sind vertraglich vereinbart und welche Änderungen sind möglich?' },
          ] },
          { type: 'paragraph', text: 'Lass diese Werte für einen gemeinsamen Stichtag nennen. Ein aktueller Übertragungswert und eine Jahre alte Guthabenzahl gehören nicht in dieselbe Vergleichsspalte. Für den neuen Vertrag benötigst du dann ebenfalls Kosten, Anlagen und Auszahlungsregeln. Die höhere Zulage allein ersetzt diese Angaben nicht.' },
        ],
      },
      {
        id: 'fragen-zusammenfassen',
        heading: 'Aus den Unterlagen wird eine kurze Fragenliste',
        blocks: [
          { type: 'paragraph', text: 'Schreibe unter deine markierten Werte höchstens fünf offene Fragen. Beispielsweise: Fehlt eine Kinderzulage? Ist die angegebene Rente garantiert oder nur berechnet? Welche Kosten bleiben nach dem Ruhenlassen? Was kostet ein Transfer? Welche Folgen hat die neue Förderung für meinen weiteren Riester-Vertrag? Mit konkreten Fragen wird das Gespräch verständlicher und die Antwort überprüfbar.' },
          { type: 'paragraph', text: 'Bitte bei komplexen Angaben um eine schriftliche Gegenüberstellung. Die Gegenüberstellung sollte Fortführung, Beitragsfreistellung und gegebenenfalls Transfer mit einheitlichen Annahmen vergleichen. Trenne dabei Guthabenbewegung und Fördersystemwechsel: Ein neuer Vertrag kann die Förderregeln weiterer Altverträge ändern, ohne deren Guthaben automatisch zu übertragen. Erteile eine Kündigung oder Übertragung erst, nachdem Zahlungsweg und Folgen geklärt sind.' },
        ],
      },
    ],
    faqs: [
      { question: 'Reicht die letzte Jahresmitteilung für einen Wechselcheck?', answer: 'Die Jahresmitteilung ist ein guter Einstieg. Für die Entscheidung brauchst du zusätzlich aktuelle Übertragungswerte, Kosten und Bedingungen bei Fortführung oder Beitragsfreistellung sowie das konkrete neue Angebot.' },
      { question: 'Warum stimmen eigene Beiträge und Guthaben nicht überein?', answer: 'Das Guthaben berücksichtigt neben Einzahlungen unter anderem Kosten, Zulagen und Wertentwicklung. Entscheidend sind außerdem der Stichtag und die Frage, ob alle erwarteten Zulagen bereits gebucht wurden.' },
      { question: 'Wo sehe ich die gesamte steuerliche Förderung?', answer: 'Zulagen stehen in den entsprechenden Vertragsbescheinigungen. Eine zusätzliche Steuerermäßigung ergibt sich aus deiner steuerlichen Veranlagung. Beide Werte sollten getrennt erfasst werden, damit du sie nicht doppelt zählst.' },
    ],
    sourceIds: ['gesetz', 'zfa', 'bmf', 'estg89', 'riester-kuendigung'],
    relatedSlugs: ['riester-alte-oder-neue-foerderung', 'riester-altersvorsorgedepot-wechsel'],
  });
