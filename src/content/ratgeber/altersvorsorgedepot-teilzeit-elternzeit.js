import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-teilzeit-elternzeit',
    cluster: 'familien',
    audience: 'eltern',
    nextStep: 'webinar',
    metaTitle: 'Altersvorsorgedepot in Teilzeit und Elternzeit | Healio',
    metaDescription: 'Teilzeit, Elternzeit und Kindererziehungszeiten: Welche Nachweise Eltern für die Förderberechtigung ab 2027 brauchen und wie ein tragbarer Beitrag entsteht.',
    headline: 'Altersvorsorgedepot in Teilzeit oder Elternzeit: Worauf kommt es an?',
    lead: 'Weniger Arbeitsstunden bedeuten nicht automatisch weniger Zulage. Im neuen Fördersystem zählt für die Höhe vor allem dein Eigenbeitrag. Vorher muss aber deine Berechtigung geklärt sein. Elternzeit beim Arbeitgeber und Kindererziehungszeiten in der Rentenversicherung sind unterschiedliche Dinge. Diese Unterscheidung hilft dir, einen passenden Beitrag zu planen und fehlende Nachweise rechtzeitig zu bemerken.',
    listTeaser: 'Berechtigung und Nachweise getrennt vom Familienbudget prüfen, mit einer Beispielrechnung für kleinere Beiträge.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Bei rentenversicherungspflichtiger Teilzeitarbeit besteht grundsätzlich eine unmittelbare Grundlage für die Förderung.',
          'Elternzeit allein beweist diese Berechtigung nicht. Anerkannte Kindererziehungszeiten können die erforderliche rentenrechtliche Grundlage schaffen.',
          'Die neue Förderhöhe folgt dem Jahresbeitrag. Für eine unmittelbar berechtigte Person können auch kleine Beiträge eine Grundzulage auslösen.',
          'Das Familienbudget, die Zuordnung der Kinderzulage und vorhandene Riester-Verträge gehören vor einem neuen Vertrag in dieselbe Prüfung.',
        ] },
      ] },
      { id: 'status', heading: 'Welche Situation liegt bei dir tatsächlich vor?', blocks: [
        { type: 'paragraph', text: 'Bei einem normalen Teilzeitjob mit Pflichtbeiträgen zur gesetzlichen Rentenversicherung ist die Grundlage meist aus der Beschäftigung ersichtlich. Arbeite mit deiner aktuellen Abrechnung und dem Versicherungsverlauf, statt nur die Stundenzahl zu betrachten. Ein Minijob mit Befreiung von der Rentenversicherungspflicht ist nicht dieselbe Situation. Beim neuen Selbstständigenzugang musst du unter 67 sein, im Beitragsjahr passende Einkünfte erzielen und dafür eine Steuererklärung abgeben.' },
        { type: 'table', caption: 'Unterlagen für unterschiedliche Familiensituationen', head: ['Situation', 'Erster Nachweis', 'Was zusätzlich prüfen?'], rows: [
          ['Rentenversicherungspflichtige Teilzeit', 'Aktuelle Abrechnung und Versicherungsstatus', 'Kinderzulage und mögliche Altverträge'],
          ['Elternzeit ohne Beschäftigung', 'Rentenrechtliche Anerkennung der Kindererziehungszeiten', 'Welchem Elternteil die Zeiten zugeordnet sind'],
          ['Selbstständigkeit während der Betreuung', 'Unter 67, passende Einkünfte und Erklärung für das Beitragsjahr', 'Neue Berechtigung und tragbarer Beitrag'],
          ['Keine eigene Berechtigungsgrundlage', 'Situation des Ehepartners', 'Voraussetzungen und Grenzen mittelbarer Berechtigung'],
        ], note: 'Die Tabelle ist eine Vorbereitung für die Prüfung. Die Tabelle begründet keinen Anspruch für eine bestimmte Person.' },
      ] },
      { id: 'erziehungszeiten', heading: 'Elternzeit ist nicht dasselbe wie Kindererziehungszeit', blocks: [
        { type: 'paragraph', text: 'Elternzeit beschreibt deine arbeitsrechtliche Auszeit. Kindererziehungszeiten werden dagegen im Rentenkonto berücksichtigt und einem Elternteil zugeordnet. Nach dem Hinweis der Zulagenstelle sind Eltern ohne rentenversicherungspflichtige Tätigkeit während der Elternzeit nicht automatisch förderberechtigt. Die Berücksichtigung der Erziehungszeiten muss beim zuständigen Rentenversicherungsträger geklärt werden. Dafür steht unter anderem der Antrag V0800 zur Verfügung.' },
        { type: 'paragraph', text: 'Prüfe deshalb deinen eigenen Versicherungsverlauf. Eine Eintragung beim anderen Elternteil hilft nicht automatisch deinem Vertrag. Außerdem laufen eine lange Betreuungsauszeit, der Bezug von Elterngeld und die rentenrechtlichen Kindererziehungszeiten nicht zwingend über dieselben Zeiträume. Wenn du später noch zu Hause bleibst, solltest du deine Berechtigung erneut betrachten, bevor du die bisherige Förderrechnung einfach fortschreibst.' },
      ] },
      { id: 'beitrag', heading: 'Wie viel Beitrag passt zu weniger Einkommen?', blocks: [
        { type: 'paragraph', text: 'Die höchste Zulage ist nicht das erste Ziel, wenn das Familienbudget enger wird. Beginne mit Einkommen nach Steuern und festen Ausgaben, lege dann Geld für unregelmäßige Rechnungen und eine Reserve zurück. Erst der verbleibende Betrag kommt für langfristig gebundene Vorsorge infrage. Zulagen fließen in den Vertrag und können den laufenden Beitrag nicht aus deinem Haushaltskonto bezahlen.' },
        { type: 'paragraph', text: 'Beispiel im neuen Fördersystem: Eine unmittelbar berechtigte Person kann 20 EUR im Monat dauerhaft tragen. Bei zwölf Zahlungen sind das 240 EUR. Die Grundzulage beträgt dann 120 EUR. Ist ihr für das Jahr ein Kind zugeordnet und besteht der entsprechende Anspruch, kommen 240 EUR Kinderzulage hinzu. Insgesamt wären es 360 EUR Zulagen. Vertragskosten und Wertentwicklung sind in dieser Förderrechnung nicht enthalten.' },
        { type: 'paragraph', text: 'Das Beispiel ist keine Empfehlung für einen bestimmten Tarif. Es zeigt, dass du eine kleinere tragbare Rate zuerst rechnen kannst. Bis zum Auszahlungsbeginn kannst du deinen Vertrag ruhen lassen. Prüfe Verfahren, fortlaufende Kosten und Folgen für die Förderung. Beitragssenkungen sind davon getrennt und hängen von den konkreten Bedingungen ab.' },
      ] },
      { id: 'partner', heading: 'Wenn die Förderung nur über den Ehepartner möglich ist', blocks: [
        { type: 'paragraph', text: 'Fehlt eine eigene unmittelbare Berechtigungsgrundlage, kann unter den gesetzlichen Voraussetzungen eine mittelbare Berechtigung über den Ehepartner bestehen. Dafür genügt es nicht, einfach verheiratet zu sein. Auch die Berechtigung und der Vertrag des Partners sowie der eigene Mindestbeitrag spielen eine Rolle. Die Grundzulage beträgt in diesem Fall höchstens 175 EUR und wird anhand der geförderten Beiträge des unmittelbar berechtigten Partners berechnet.' },
        { type: 'paragraph', text: 'Ein Standardbeispiel für unmittelbar Berechtigte kann deshalb deine tatsächliche Förderung verfehlen. Kennzeichne den mittelbaren Fall, halte die Unterlagen beider Verträge bereit und lass die Beiträge gemeinsam berechnen. Bei bestehenden Riester-Verträgen kommen Übergangsregeln hinzu; ein neuer Vertrag kann die Anwendung des neuen Fördersystems auslösen.' },
      ] },
      { id: 'jahrescheck', heading: 'Drei Anlässe für einen neuen Blick auf die Unterlagen', blocks: [
        { type: 'list', items: [
          { lead: 'Beginn oder Ende der Beschäftigung.', text: 'Prüfe, ob die Berechtigungsgrundlage noch dieselbe ist und ob der Beitrag zum neuen Einkommen passt.' },
          { lead: 'Änderung der Betreuung oder Familie.', text: 'Kindererziehungszeiten und Kinderzulage getrennt kontrollieren; bei einer Trennung auch die Zuordnung prüfen.' },
          { lead: 'Jahresbescheinigung des Vertrags.', text: 'Eigenbeitrag, beantragte Förderung und erhaltene Gutschriften mit deinen Nachweisen vergleichen.' },
        ] },
      ] },
    ],
    faqs: [
      { question: 'Sinkt die neue Grundzulage automatisch, wenn ich in Teilzeit gehe?', answer: 'Für unmittelbar Berechtigte richtet sich die neue Grundzulage nach dem Eigenbeitrag. Ein geringeres Einkommen allein senkt sie nicht. Änderst du den Beitrag oder deine Berechtigungsgrundlage, muss die Rechnung neu geprüft werden.' },
      { question: 'Reicht meine Elternzeitbestätigung als Fördernachweis?', answer: 'Die Elternzeit ersetzt die rentenrechtliche Prüfung nicht. Ohne rentenversicherungspflichtige Tätigkeit solltest du insbesondere die Anerkennung und Zuordnung der Kindererziehungszeiten beim Rentenversicherungsträger klären.' },
      { question: 'Kann ich während der Elternzeit einfach auf 10 EUR monatlich reduzieren?', answer: '120 EUR Jahresbeitrag sind eine Fördervoraussetzung des neuen Systems. Ob eine bestehende Vereinbarung auf diese Rate geändert werden kann und welche Kosten folgen, hängt vom konkreten Vertrag ab.' },
    ],
    sourceIds: ['gesetz', 'bmf', 'zfa', 'familien-foerderung'],
    relatedSlugs: ['altersvorsorgedepot-wer-ist-berechtigt', 'altersvorsorgedepot-kinderzulage-elternteil'],
  });
