import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-kosten',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot: Kosten richtig vergleichen | Healio',
    metaDescription: 'Welche Kosten zählen beim Altersvorsorgedepot? Effektivkosten, Fondsgebühren, Vergütung und Wechselkosten mit einer praktischen Checkliste vergleichen.',
    headline: 'Altersvorsorgedepot: Welche Kosten du vor dem Abschluss prüfen solltest',
    lead: 'Die Zulage steht schnell auf dem Papier. Ob ein Vertrag zu dir passt, entscheidet sich auch an seinen Kosten. Vergleiche deshalb die gesamte Belastung über deine geplante Laufzeit, die Anlage und die Leistungen. Eine einzelne niedrige Fondsgebühr beantwortet diese Frage noch nicht.',
    listTeaser: 'Eine Kostencheckliste für Verträge, Fonds, Beratung und spätere Veränderungen.',
    sections: [
      {
        id: 'gesamtkosten',
        heading: 'Eine Gebühr ist noch kein vollständiger Preis',
        blocks: [
          { type: 'paragraph', text: 'Ein Altersvorsorgedepot kann mehrere Kostenebenen haben. Der Anbieter verwaltet den Vertrag, die eingesetzten Fonds haben eigene Kosten, und bei einem vermittelten Vertrag kann eine Vergütung für Abschluss und Vertrieb enthalten sein. Welche Positionen tatsächlich anfallen, steht erst im konkreten Angebot. Aus der gesetzlichen Förderung folgt weder ein einheitlicher Preis noch ein bestimmtes Vergütungsmodell für alle Anbieter.' },
          { type: 'paragraph', text: 'Lege deshalb Angebote mit denselben Annahmen nebeneinander: gleicher Beitrag, gleiche Laufzeit und möglichst vergleichbare Anlage. Ein Vertrag mit zusätzlicher Beitragsgarantie lässt sich nicht allein über eine Fondsgebühr gegen ein Depot ohne Garantie bewerten. Prüfe zuerst, welche Leistung du vergleichst. Eine Beispielrechnung ist außerdem eine Modellrechnung und keine zugesagte Wertentwicklung.' },
        ],
      },
      {
        id: 'effektivkosten',
        heading: 'Was Effektivkosten zeigen und was nicht',
        blocks: [
          { type: 'paragraph', text: 'Effektivkosten beschreiben, wie stark die Vertragskosten die berechnete jährliche Rendite bis zur Auszahlungsphase mindern. Das ist ein Vergleichsmaß und nicht automatisch die Summe der Gebühren, die dir jedes Jahr vom Konto abgezogen werden. Die Berechnung arbeitet mit festgelegten Annahmen. Die Berechnung hilft beim Vergleich ähnlicher Angebote, ersetzt aber keinen Blick auf das Preisverzeichnis und die einzelnen Kosten.' },
          { type: 'paragraph', text: 'Für das gesetzlich definierte Standarddepot gilt ein Effektivkostendeckel von 1,0 Prozent. Diese Grenze gilt nicht pauschal für jedes Altersvorsorgedepot oder Garantieprodukt. Diese Grenze bedeutet auch nicht, dass alle Fonds jeweils genau ein Prozent kosten. Frage beim Angebot ausdrücklich, ob es das Standarddepot ist und welche Effektivkosten im individuellen Produktinformationsblatt stehen.' },
        ],
      },
      {
        id: 'kostencheckliste',
        heading: 'Diese Positionen gehören in deinen Vergleich',
        blocks: [
          {
            type: 'table',
            caption: 'Kostencheckliste für zwei konkrete Angebote',
            head: ['Position', 'Das solltest du erfragen'],
            rows: [
              ['Abschluss und Vertrieb', 'Betrag, Verteilung über die Laufzeit und Behandlung bei einer Beitragspause'],
              ['Vertragsverwaltung', 'Feste Beträge und prozentuale Kosten auf Beiträge oder Vermögen'],
              ['Anlage', 'Laufende Fondskosten sowie mögliche Transaktionskosten'],
              ['Effektivkosten', 'Wert im individuellen Produktinformationsblatt bei gleicher Laufzeit'],
              ['Veränderungen', 'Kosten für Übertragung, Tarifänderung oder spätere Auszahlungsphase'],
            ],
            note: 'Die Tabelle nennt Prüffragen. Die Tabelle behauptet keine bereits verfügbaren Anbieterpreise.',
          },
          { type: 'paragraph', text: 'Lass dir Antworten schriftlich geben. Bei Prozentangaben gehört die Bezugsgröße dazu: ein Prozent des Beitrags ist etwas anderes als ein Prozent des gesamten Guthabens. Bei festen Jahresgebühren macht die Beitragshöhe einen Unterschied. So kannst du erkennen, welche Position bei deinem eigenen Sparbetrag besonders ins Gewicht fällt.' },
        ],
      },
      {
        id: 'verguetung',
        heading: 'Wie Healio vergütet wird',
        blocks: [
          { type: 'paragraph', text: 'Healio vermittelt die Versicherungsvarianten der geförderten Altersvorsorge. Wenn du über Healio einen Versicherungsvertrag abschließt, zahlt das Versicherungsunternehmen Healio eine Vergütung, die in den Vertragskosten enthalten ist. Deshalb sprechen wir vom unverbindlichen Zuschuss-Check. Du solltest vor deiner Entscheidung sowohl die gesamten Vertragskosten als auch die Vergütungsinformation kennen. Die persönliche Begleitung ist ein Bestandteil des Angebots, den du zusammen mit Preis und Leistung bewertest.' },
          { type: 'paragraph', text: 'Frage konkret, welche Begleitung nach dem Abschluss vorgesehen ist: Hilfe beim Zulagenantrag, Änderungen deiner Familiensituation oder ein späterer Vertragsvergleich. Umfang und Zuständigkeit sollten verständlich feststehen. Ein niedriger Preis ist ein wichtiger Faktor, aber keine Antwort darauf, ob Anlage, Bindung und Betreuung zu deinem Bedarf passen.' },
        ],
      },
      {
        id: 'vorbereitung',
        heading: 'So bereitest du einen Kostencheck vor',
        blocks: [
          { type: 'list', items: [
            'Notiere deinen tragbaren Jahresbeitrag und die Jahre bis zum geplanten Auszahlungsbeginn.',
            'Besorge Produktinformationsblatt, Preisverzeichnis und Anlageübersicht für jedes Angebot.',
            'Markiere unklare Gebühren und lass dir erklären, wann und worauf sie berechnet werden.',
            'Vergleiche auch eine Beitragspause und einen möglichen späteren Wechsel.',
          ] },
          { type: 'paragraph', text: 'Erst anschließend gehört die Förderung in die Gesamtrechnung. Ziehe nicht einfach jede Gebühr von der Zulage ab und erkläre den Rest zum Gewinn. Kosten wirken über die Laufzeit, die Anlage kann im Wert schwanken, und die Auszahlung hat eigene steuerliche Folgen. Im persönlichen Check lassen sich diese Punkte gemeinsam ordnen.' },
        ],
      },
    ],
    faqs: [
      { question: 'Gilt die Ein-Prozent-Grenze für jeden neuen Altersvorsorgevertrag?', answer: 'Nein. Der gesetzliche Deckel von 1,0 Prozent Effektivkosten gilt für das Standarddepot. Bei anderen Produktformen prüfst du die ausgewiesenen Kosten des konkreten Angebots.' },
      { question: 'Sind Effektivkosten und Fondskosten dasselbe?', answer: 'Nein. Fondskosten betreffen die Anlage. Effektivkosten zeigen die berechnete Renditeminderung durch die Vertragskosten insgesamt. Für einen belastbaren Vergleich brauchst du beide Informationen.' },
      { question: 'Kann ich vor dem Zuschuss-Check schon Anbieterpreise vergleichen?', answer: 'Sobald konkrete Angebote samt Produktunterlagen vorliegen. Eine allgemeine Gesetzesbeschreibung ersetzt kein Angebot. Bestehende Unterlagen und offene Fragen kannst du bereits zum Check mitbringen.' },
    ],
    sourceIds: ['gesetz'],
    relatedSlugs: ['altersvorsorgedepot-garantie', 'altersvorsorgedepot-anbieterwechsel'],
  });
