import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-kinderzulage-elternteil',
    cluster: 'familien',
    audience: 'eltern',
    nextStep: 'check',
    metaTitle: 'Kinderzulage: Welcher Elternteil bekommt sie? | Healio',
    metaDescription: 'Die Zuordnung der Kinderzulage unterscheidet sich 2027 und ab 2028. Was verheiratete, unverheiratete und getrennte Eltern vor einem Antrag prüfen sollten.',
    headline: 'Welcher Elternteil bekommt die Kinderzulage im Altersvorsorgedepot?',
    lead: 'Du und der andere Elternteil habt beide einen Altersvorsorgevertrag, aber die Kinderzulage gibt es für jedes Kind nur einmal. Wer sie bekommt, hängt vom Beitragsjahr und eurer Familienkonstellation ab. Besonders wichtig: Die neue Zuordnung nach dem Kindergeldempfänger gilt bei zusammenlebenden verheirateten Eltern erst ab 2028. Für den Start 2027 solltest du deshalb nicht einfach die spätere Regel übernehmen.',
    listTeaser: '2027 und 2028 auseinanderhalten, Kindergeldunterlagen prüfen und die Kinderzulage dem richtigen Vertrag zuordnen.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Pro Kind wird die Kinderzulage nur einem berechtigten Elternteil zugeordnet. Eine zweite Anmeldung schafft keinen zweiten Anspruch.',
          '2027 erhält bei zusammenlebenden verheirateten Eltern unterschiedlichen Geschlechts grundsätzlich die Mutter die Kinderzulage. Gemeinsam können die Eltern die Zuordnung zum Vater beantragen.',
          'Ab 2028 ist bei zusammenlebenden verheirateten Eltern grundsätzlich die Kindergeldfestsetzung maßgeblich. Übereinstimmende Erklärungen ermöglichen die Zuordnung zum anderen Elternteil.',
          'Bei Trennung, unverheirateten Eltern und wechselndem Kindergeldempfänger musst du die gesetzlichen Regeln für genau euren Fall prüfen.',
        ] },
      ] },
      { id: 'jahre', heading: 'Warum unterscheiden sich 2027 und 2028?', blocks: [
        { type: 'paragraph', text: 'Das Reformgesetz führt die neue Berechnung der Kinderzulage ab 2027 ein. Die Änderung der Zuordnungsregel für verheiratete Eltern steht jedoch in einem anderen Gesetzesartikel, der erst zum 1. Januar 2028 in Kraft tritt. Die Höhe der Zulage und die Frage, welchem Elternteil sie zugeordnet wird, sind deshalb zwei getrennte Prüfschritte. Eine vereinfachte Aussage wie „Wer Kindergeld bekommt, bekommt ab 2027 immer die Zulage“ reicht nicht.' },
        { type: 'table', caption: 'Orientierung zur Zuordnung bei Eltern', head: ['Situation', 'Für 2027 prüfen', 'Ab 2028 prüfen'], rows: [
          ['Zusammenlebende verheiratete Eltern unterschiedlichen Geschlechts', 'Grundsätzlich Mutter; gemeinsamer Antrag zur Zuordnung zum Vater möglich', 'Grundsätzlich Kindergeldempfänger; übereinstimmende Erklärungen zum anderen Elternteil möglich'],
          ['Unverheiratete oder dauernd getrennte Eltern', 'Kindergeldfestsetzung und geltende gesetzliche Zuordnung', 'Kindergeldfestsetzung und neue Regeln bei Empfängerwechsel'],
          ['Kindergeldempfänger wechselt im Jahr', 'Regel für den betreffenden Anspruchszeitraum prüfen', 'Festsetzung für den letzten Anspruchszeitraum des Jahres maßgeblich'],
        ], note: 'Die Übersicht ersetzt keine Prüfung weiterer Voraussetzungen, etwa Wohnsitz, Förderberechtigung und abweichender Familienkonstellationen.' },
      ] },
      { id: 'beispiel', heading: 'Ein Beispiel für zwei verheiratete Eltern', blocks: [
        { type: 'paragraph', text: 'Zwei zusammenlebende verheiratete Eltern unterschiedlichen Geschlechts sind unmittelbar förderberechtigt und haben je einen Vertrag. Der Vater erhält das Kindergeld. Für 2027 wird die Kinderzulage dennoch grundsätzlich der Mutter zugeordnet, sofern kein gemeinsamer Antrag zur Zuordnung zum Vater vorliegt. Ab 2028 greift grundsätzlich die Kindergeldzuordnung; eine zulässige gemeinsame Erklärung kann wieder zu einem anderen Ergebnis führen.' },
        { type: 'paragraph', text: 'Das Beispiel zeigt, warum ihr nicht nur die Kontonummer des Kindergelds in ein Formular übertragen solltet. Legt für jedes Beitragsjahr fest, welcher Elternteil die Kinderzulage erhalten soll und ob dafür Erklärungen erforderlich sind. Vergleicht dann die eigene Rentensituation und die Beiträge. Ein höheres Gehalt allein macht einen Elternteil nicht automatisch zum passenderen Empfänger.' },
      ] },
      { id: 'trennung', heading: 'Was ist bei getrennten Eltern wichtig?', blocks: [
        { type: 'paragraph', text: 'Getrennte Eltern sollten nicht von der Übertragungsmöglichkeit für zusammenlebende verheiratete Eltern ausgehen. Prüfe zuerst, gegenüber wem Kindergeld festgesetzt wird und ob sich diese Festsetzung im betrachteten Jahr geändert hat. Umgang, geteilte Betreuung oder Unterhaltszahlungen beantworten die Zulagenfrage nicht allein. Auch ein privater Wunsch, die Förderung zu teilen, ersetzt die gesetzliche Zuordnung nicht.' },
        { type: 'paragraph', text: 'Bei einem Wechsel solltest du den Bescheid mit dem wirksamen Zeitraum aufbewahren und den Anbieter informieren. Schreibe dabei das betroffene Kind und Beitragsjahr dazu. Wenn bereits Kinderzulagen beantragt wurden, müssen die Angaben der Eltern zueinander passen. Eine unzutreffende Gutschrift kann später korrigiert oder zurückgefordert werden. Gehe deshalb einer Abweichung in der Jahresbescheinigung zeitnah nach.' },
      ] },
      { id: 'antrag', heading: 'So bereitest du den Antrag vor', blocks: [
        { type: 'list', ordered: true, items: [
          'Kindergeldbescheid, Identifikationsnummern und vorhandene Angaben zur Kinderzulage für das konkrete Jahr zusammentragen.',
          'Bei beiden Eltern unmittelbare oder mittelbare Berechtigung feststellen. Die mittelbare Berechtigung folgt einer eigenen Förderrechnung.',
          'Kind für Kind klären, wer nach dem Gesetz Empfänger ist und ob eine zulässige Übertragung gewünscht wird.',
          'Erforderliche gemeinsame Erklärungen beim zuständigen Anbieter abgeben. Die Zuordnung nicht durch zwei widersprechende Anträge ersetzen.',
          'Nach der Bearbeitung Beitrag, Kinderzahl und Zulage in den Unterlagen vergleichen. Änderungen wie Trennung oder Ende des Kindergelds melden.',
        ] },
        { type: 'paragraph', text: 'Die Zuordnung betrifft echte Altersvorsorge: Das Geld verbleibt im Vertrag des Empfängers und ist grundsätzlich bis zur späteren Auszahlung gebunden. Besprecht deshalb auch, wer wegen Betreuung weniger Rentenansprüche aufbaut. Im persönlichen Check lassen sich Unterlagen und Beiträge nebeneinanderlegen, bevor ihr einen Antrag oder eine Vertragsentscheidung trefft.' },
      ] },
    ],
    faqs: [
      { question: 'Können beide Eltern für dasselbe Kind die Kinderzulage bekommen?', answer: 'Nein. Beide Eltern können bei eigener Berechtigung eine Grundzulage erhalten, aber die Kinderzulage für dasselbe Kind wird nur einmal zugeordnet.' },
      { question: 'Bekommt der Kindergeldempfänger 2027 immer die Kinderzulage?', answer: 'Nein. Bei zusammenlebenden verheirateten Eltern unterschiedlichen Geschlechts gilt 2027 grundsätzlich die Zuordnung zur Mutter. Die neue Zuordnung nach der Kindergeldfestsetzung tritt erst ab 2028 in Kraft.' },
      { question: 'Kann ich die Kinderzulage nach einer Trennung beliebig übertragen?', answer: 'Darauf solltest du dich nicht verlassen. Die gemeinsame Übertragung für zusammenlebende verheiratete Eltern ist keine allgemeine freie Wahl für getrennte Eltern. Maßgeblich sind eure Situation, die Kindergeldfestsetzung und das Beitragsjahr.' },
    ],
    sourceIds: ['gesetz', 'estg85', 'zfa'],
    relatedSlugs: ['altersvorsorgedepot-kinderzulage', 'altersvorsorgedepot-teilzeit-elternzeit'],
  });
