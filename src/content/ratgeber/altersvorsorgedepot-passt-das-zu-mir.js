import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-passt-das-zu-mir',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'check',
    metaTitle: 'Passt das Altersvorsorgedepot zu mir? 5 Fragen | Healio',
    metaDescription: 'Mit fünf Fragen Förderung, Geldbindung, tragbaren Beitrag, Risiko und Kosten einordnen. Eine Entscheidungshilfe ohne pauschale Produktempfehlung.',
    headline: 'Passt das Altersvorsorgedepot zu mir? Fünf Fragen vor deiner Entscheidung',
    lead: 'Ein hoher Zuschuss macht einen Vertrag interessant. Ob er zu dir passt, hängt zusätzlich von deinem Geldbedarf, deinem Beitrag, deinem Umgang mit Schwankungen und dem konkreten Angebot ab. Diese fünf Fragen helfen dir, die wichtigsten Punkte für ein persönliches Gespräch zu ordnen.',
    listTeaser: 'Eine praktische Entscheidungshilfe, die Förderung und deine Lebenssituation zusammenbringt.',
    sections: [
      {
        id: 'foerderung',
        heading: '1. Welche Förderung kommt für mich tatsächlich infrage?',
        blocks: [
          { type: 'paragraph', text: 'Beginne mit deinem eigenen Status, nicht mit dem höchsten Werbebetrag. Die Reform erweitert den Kreis der Förderberechtigten; dennoch gelten Voraussetzungen. Die Grundzulage hängt außerdem vom tatsächlich geleisteten Jahresbeitrag ab. Kinderzulage und Startbonus haben eigene Bedingungen. Ein Rechner kann dir eine erste Orientierung geben, aber eine Beispielrechnung bestätigt noch keinen persönlichen Anspruch.' },
          { type: 'paragraph', text: 'Halte deshalb Beschäftigungsstatus, geplanten Beitrag und gegebenenfalls Kindergeldzuordnung bereit. Bei bestehenden Riester-Verträgen gehört der bisherige Förderweg dazu. Wenn eine Bedingung unklar ist, kläre sie vor dem Abschluss. So vermeidest du, mit einer Summe zu planen, die auf deinen Fall gar nicht oder nur teilweise zutrifft.' },
        ],
      },
      {
        id: 'geldbedarf',
        heading: '2. Kann ich diesen Teil des Geldes bis zur Rente zurücklegen?',
        blocks: [
          { type: 'paragraph', text: 'Das Altersvorsorgedepot ist für spätere Versorgung gedacht. Wenn du das Geld in wenigen Jahren für einen Umzug, eine größere Anschaffung oder einen Einkommensausfall brauchen könntest, muss diese Aufgabe gesondert geplant werden. Eine vorzeitige Verwendung geförderten Vermögens kann Zulagen und Steuervorteile kosten. Gesetzliche Sonderfälle ersetzen keine frei verfügbare Reserve.' },
          { type: 'paragraph', text: 'Schreibe bekannte Ausgaben und mögliche Engpässe auf. Es geht nicht darum, jede Überraschung vorherzusagen. Du willst erkennen, ob dein geplanter Beitrag aus Geld besteht, das langfristig frei ist, oder ob derselbe Betrag bereits mehrere Aufgaben erfüllen soll. Das ist auch dann wichtig, wenn die Förderung besonders attraktiv wirkt.' },
        ],
      },
      {
        id: 'beitrag',
        heading: '3. Welcher Beitrag ist für mich dauerhaft tragbar?',
        blocks: [
          { type: 'paragraph', text: 'Der Mindestjahresbeitrag für Grund- und Kinderzulage beträgt im neuen System 120 EUR. Die maximale Grundzulage von 540 EUR wird bei unmittelbar Förderberechtigten mit 1.800 EUR Eigenbeitrag im Jahr erreicht. Daraus folgt keine Pflicht, diesen Höchstbetrag zu wählen. Ein Beitrag, der dein laufendes Budget überfordert, passt nicht allein wegen einer hohen Zulage besser.' },
          { type: 'paragraph', text: 'Rechne mit gewöhnlichen und schwächeren Monaten. Bei schwankendem Einkommen ist ein nachvollziehbarer Jahresplan hilfreicher als eine optimistische Momentaufnahme. Lass dir zeigen, wie Beitragsanpassungen, Sonderzahlungen oder Pausen im späteren Vertrag funktionieren und welche Kosten bleiben. Entscheidend ist der tatsächliche Jahresbeitrag; ein früher Einstieg verteilt ihn lediglich auf mehr Monate.' },
        ],
      },
      {
        id: 'risiko',
        heading: '4. Welche Schwankungen und welche Zusage passen zu meiner Planung?',
        blocks: [
          { type: 'paragraph', text: 'Ein Altersvorsorgedepot ohne Beitragsgarantie kann Verluste machen. Daneben sieht das Gesetz Garantieprodukte mit 80 oder 100 Prozent der Beiträge einschließlich Zulagen zum Auszahlungsbeginn vor. Diese Varianten sind keine Zusage für Rendite oder Kaufkraft. Prüfe deshalb nicht nur, ob dir ein schwankender Kontostand unangenehm wäre, sondern welche Folgen ein geringerer Endbetrag für deine Versorgung hätte.' },
          { type: 'paragraph', text: 'Deine weiteren Einnahmen und Rücklagen spielen mit. Eine vorhandene lebenslange Rente kann bestimmte Ausgaben bereits decken; anderes Vermögen kann ebenfalls schwanken. Vergleiche die gesamten Aufgaben deiner Vorsorge. Welche Mischung geeignet ist, lässt sich aus einem Onlineartikel nicht individuell ableiten.' },
        ],
      },
      {
        id: 'angebot',
        heading: '5. Habe ich Kosten, Leistungen und Auszahlung verstanden?',
        blocks: [
          { type: 'table', caption: 'Dein Ergebnis nach den fünf Fragen', head: ['Wenn dieser Punkt offen ist', 'Sinnvoller nächster Schritt'], rows: [
            ['Mein Anspruch ist unklar', 'Voraussetzungen und Beitrag im Zuschuss-Check prüfen'],
            ['Ich brauche das Geld möglicherweise vorher', 'Reserve und andere Sparziele zuerst ordnen'],
            ['Mein Beitrag ist zu hoch angesetzt', 'Jahresbudget und Anpassungsregeln durchgehen'],
            ['Ich verstehe Garantie und Verluste noch nicht', 'Grundprinzipien im Webinar klären'],
            ['Ein konkretes Angebot fehlt', 'Informationen sammeln; keine Anbieterentscheidung vorwegnehmen'],
          ], note: 'Diese Zuordnung strukturiert deine Fragen und ist keine persönliche Anlageempfehlung.' },
          { type: 'paragraph', text: 'Vor einem Abschluss gehören vollständige Kosten, Vergütung, Anlage, Garantie und Auszahlungswege auf den Tisch. Auch die spätere Besteuerung zählt. Vergleiche konkrete Angebote, sobald sie tatsächlich vorliegen. Das Gesetz allein sagt nicht, welcher Anbieter dein Geld passend verwaltet oder welchen Preis du dafür zahlst.' },
          { type: 'paragraph', text: 'Im unverbindlichen Zuschuss-Check kannst du deine offenen Punkte und einen bestehenden Riester-Vertrag besprechen. Du entscheidest danach in Ruhe, ob und wann ein Abschluss infrage kommt. Wenn zunächst eine Reserve, eine andere Verpflichtung oder mehr Verständnis nötig ist, gehört auch dieses Ergebnis zu einer brauchbaren Vorbereitung.' },
        ],
      },
    ],
    faqs: [
      { question: 'Passt das Depot automatisch, wenn ich viel Zulage bekomme?', answer: 'Die Förderung ist nur ein Teil der Entscheidung. Du solltest den Beitrag tragen können, die Bindung verstehen und Anlage, Kosten sowie Auszahlung mit deiner Situation abgleichen.' },
      { question: 'Muss ich mich schon jetzt für einen Anbieter entscheiden?', answer: 'Nein. Du kannst Fragen, Unterlagen und deinen Jahresbeitrag vorbereiten. Eine konkrete Anbieterentscheidung braucht ein tatsächlich vorliegendes Angebot mit vollständigen Bedingungen.' },
      { question: 'Muss ich nach einem Zuschuss-Check etwas abschließen?', answer: 'Der Check ist unverbindlich. Du erhältst eine Einordnung deiner Fragen und entscheidest anschließend selbst, ob und wann du einen Vertrag möchtest.' },
    ],
    sourceIds: ['gesetz'],
    relatedSlugs: ['altersvorsorgedepot-wer-ist-berechtigt', 'altersvorsorgedepot-kosten'],
  });
