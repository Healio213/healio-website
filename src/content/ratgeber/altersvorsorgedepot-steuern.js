import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-steuern',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'webinar',
    metaTitle: 'Altersvorsorgedepot und Steuern: die drei Phasen | Healio',
    metaDescription: 'Ansparphase, Sonderausgabenabzug und spätere Auszahlung beim Altersvorsorgedepot: Welche Steuerregeln du auseinanderhalten solltest.',
    headline: 'Altersvorsorgedepot und Steuern: Was beim Sparen und bei der Auszahlung gilt',
    lead: 'Beim Altersvorsorgedepot gehören drei Fragen auseinander: Wie werden Erträge während des Sparens behandelt? Welcher Sonderausgabenabzug ist möglich? Und was passiert bei der Auszahlung? Wer nur den Vorteil in der Ansparphase betrachtet, übersieht einen Teil der Rechnung.',
    listTeaser: 'Zulage, Günstigerprüfung und nachgelagerte Besteuerung verständlich eingeordnet.',
    sections: [
      {
        id: 'phasen',
        heading: 'Der Zeitpunkt der Steuer ist Teil des Konzepts',
        blocks: [
          { type: 'paragraph', text: 'Die geförderte private Altersvorsorge arbeitet mit nachgelagerter Besteuerung. Das bedeutet vereinfacht: Während des Sparens gelten steuerliche Vorteile, während die späteren Leistungen grundsätzlich steuerlich berücksichtigt werden. Die Aussage, dass Erträge im Vertragsrahmen während der Ansparphase nicht jährlich bei dir besteuert werden, ist deshalb kein Versprechen einer lebenslang steuerfreien Anlage.' },
          { type: 'paragraph', text: 'Für deine Planung zählt das Geld, das du im Alter nach Steuern tatsächlich verwenden kannst. Eine Beispielrechnung mit einer Bruttoauszahlung beantwortet diese Frage noch nicht. Du brauchst dafür unter anderem deine weiteren Einkünfte und die voraussichtliche Auszahlungsform. Diese Größen können sich über Jahrzehnte ändern, weshalb eine heute genannte Nettosumme keine feste Zusage ist.' },
        ],
      },
      {
        id: 'sonderausgaben',
        heading: 'Sonderausgabenabzug und Zulage werden abgestimmt',
        blocks: [
          { type: 'paragraph', text: 'Nach den neuen Regeln können unmittelbar förderberechtigte Personen Altersvorsorgebeiträge bis zu 1.800 EUR im Jahr zuzüglich der dafür zustehenden Zulagen als Sonderausgaben berücksichtigen lassen. Das Finanzamt prüft, ob der daraus entstehende Steuervorteil günstiger ist als die Zulagenförderung. Nur ein darüber hinausgehender Vorteil führt zu einer zusätzlichen Steuerermäßigung. Das ist die Günstigerprüfung. Mittelbar Berechtigte haben keinen eigenen Sonderausgabenabzugsbetrag. Deren Beiträge und Zulagen werden unter den gesetzlichen Voraussetzungen beim unmittelbar berechtigten Ehepartner berücksichtigt.' },
          { type: 'paragraph', text: 'Du solltest also nicht eine Zulage von beispielsweise 540 EUR und einen separat ausgerechneten vollen Abzugsvorteil zusammenzählen. Beide Wege werden verrechnet. Wie das Ergebnis in deinem Fall aussieht, hängt unter anderem von deinem Einkommen und deiner steuerlichen Situation ab. Bei besonderen Fragen, etwa grenzüberschreitenden Fällen oder mehreren Vertragsarten, gehört die konkrete Berechnung in fachkundige Hände.' },
        ],
      },
      {
        id: 'grenzen',
        heading: 'Drei Beträge mit unterschiedlichen Aufgaben',
        blocks: [
          { type: 'table', caption: 'Förder- und Einzahlungsgrenzen nicht verwechseln', head: ['Betrag', 'Bedeutung im neuen System'], rows: [
            ['120 EUR im Jahr', 'Mindesteigenbeitrag für die Grund- und Kinderzulage bei erfüllten Voraussetzungen'],
            ['1.800 EUR im Jahr', 'Bei unmittelbarer Berechtigung: Beitragsgrenze für die maximale Grundzulage; Sonderausgabenrahmen zuzüglich zustehender Zulagen'],
            ['6.840 EUR im Jahr', 'Gesetzliche Grenze eigener Einzahlungen in den neuen Vertragsrahmen, keine entsprechend höhere Grundzulage'],
          ], note: 'Mehr einzahlen bedeutet nicht automatisch mehr Förderung oder einen gleich hohen steuerlichen Abzug.' },
          { type: 'paragraph', text: 'Ein Beispiel: Wer unmittelbar förderberechtigt ist und 1.800 EUR im Jahr einzahlt, erreicht nach der neuen Staffel grundsätzlich die maximale Grundzulage von 540 EUR. Eine darüber hinausgehende Einzahlung erhöht diese Grundzulage nicht. Ob zusätzliche Beiträge sinnvoll sind, lässt sich daraus nicht ablesen. Dafür vergleichst du Kosten, Bindung, Anlage und Alternativen.' },
        ],
      },
      {
        id: 'auszahlung',
        heading: 'Auch eine Auszahlung auf einmal ist steuerlich relevant',
        blocks: [
          { type: 'paragraph', text: 'Bei späteren Leistungen aus gefördertem Altersvorsorgevermögen greift grundsätzlich die nachgelagerte Besteuerung. Das betrifft nicht nur laufende Zahlungen. Auch die mögliche Kapitalauszahlung von bis zu 30 Prozent zu Beginn der Auszahlungsphase ist keine allgemeine steuerfreie Entnahme. Eine größere Einmalzahlung kann deine steuerliche Situation in diesem Jahr verändern.' },
          { type: 'paragraph', text: 'Die genaue Behandlung kann sich unterscheiden, wenn ein Vertrag geförderte und nicht geförderte Bestandteile enthält. Verlang daher eine nachvollziehbare Aufschlüsselung und die entsprechende Leistungsbescheinigung. Rechne bei der Planung nicht pauschal mit der Besteuerung eines gewöhnlichen Wertpapierdepots. Ein geförderter Altersvorsorgevertrag hat einen eigenen steuerlichen Rahmen.' },
        ],
      },
      {
        id: 'vorbereitung',
        heading: 'Was du für eine persönliche Einordnung bereithältst',
        blocks: [
          { type: 'list', items: [
            'Deinen geplanten Jahresbeitrag und Informationen zu möglichen Zulagen.',
            'Eine Übersicht bestehender geförderter Verträge und ihrer Beiträge.',
            'Den letzten Steuerbescheid für eine spätere persönliche Prüfung, ohne ihn öffentlich zu teilen.',
            'Deine Vorstellungen zur späteren Rente, Einmalzahlung und weiteren Einkünften.',
          ] },
          { type: 'paragraph', text: 'Im Webinar erklären wir den Zusammenhang mit einfachen Beispielen. Eine konkrete Steuerberatung ersetzt das nicht. Wenn du anschließend Angebote vergleichst, lass dir auch zeigen, welche steuerlichen Annahmen in der Rechnung stecken. So verstehst du, welche Vorteile aus dem Gesetz folgen und welche Ergebnisse von deiner persönlichen Situation abhängen.' },
        ],
      },
    ],
    faqs: [
      { question: 'Sind die Erträge im Altersvorsorgedepot für immer steuerfrei?', answer: 'Nein. Die Vorteile in der Ansparphase gehören zu einem System mit nachgelagerter Besteuerung. Die spätere Auszahlung ist grundsätzlich steuerlich relevant.' },
      { question: 'Bekomme ich Zulage und Steuervorteil immer zusätzlich?', answer: 'Das Finanzamt stimmt beide über die Günstigerprüfung ab. Eine zusätzliche Steuerermäßigung entsteht nur, soweit der errechnete Abzugsvorteil die berücksichtigte Zulagenförderung übersteigt.' },
      { question: 'Kann ich 6.840 EUR als Sonderausgaben abziehen?', answer: 'Die mögliche Einzahlung und der Sonderausgabenrahmen sind verschiedene Grenzen. Bei unmittelbarer Berechtigung beträgt der neue Abzugsrahmen grundsätzlich 1.800 EUR an Beiträgen zuzüglich der dafür zustehenden Zulagen.' },
    ],
    sourceIds: ['gesetz'],
    relatedSlugs: ['altersvorsorgedepot-foerderung', 'altersvorsorgedepot-auszahlung'],
  });
