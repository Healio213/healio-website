import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'riester-alte-oder-neue-foerderung',
    cluster: 'riester',
    audience: 'riester',
    nextStep: 'check',
    metaTitle: 'Riester: Alte oder neue Förderung vergleichen',
    metaDescription: 'Wann die alte Riester-Förderung günstiger sein kann und wie du Zulagen, Eigenbeitrag, Kosten und Garantien vor einem unumkehrbaren Wechsel vergleichst.',
    headline: 'Riester: Ist die alte oder die neue Förderung günstiger?',
    lead: 'Die neue Förderung ist nicht für jeden Riester-Sparer automatisch günstiger. Die neue Förderung wächst mit dem eigenen Beitrag; die alte Förderung hängt stärker vom Vorjahreseinkommen und den Zulagen ab. Besonders bei kleinen Eigenbeiträgen und mehreren Kindern kann der Bestand vorteilhaft sein. Ein Wechsel zur neuen Fördersystematik ist grundsätzlich unumkehrbar und sollte alle bestehenden Verträge einbeziehen.',
    listTeaser: 'Ein ehrlicher Vergleich mit einem Beispiel, in dem die neue Förderung niedriger ausfällt.',
    sections: [
      {
        id: 'unterschiedliche-logik',
        heading: 'Zwei Systeme belohnen unterschiedliche Beitragsentscheidungen',
        blocks: [
          { type: 'paragraph', text: 'Im alten System erhältst du als unmittelbar Berechtigter grundsätzlich 175 EUR Grundzulage. Für die volle Förderung ist ein Mindesteigenbeitrag nötig, der regelmäßig aus vier Prozent der maßgeblichen Vorjahreseinnahmen abzüglich Zulagen berechnet wird. Der Sockelbetrag beträgt 60 EUR im Jahr. Kinderzulagen und Einkommenshöhe beeinflussen damit, wie viel du selbst einzahlen musst.' },
          { type: 'paragraph', text: 'Im neuen System ist die Grundzulage beitragsproportional: 50 Prozent auf die ersten 360 EUR Eigenbeitrag, danach 25 Prozent bis 1.800 EUR. Kinderzulage gibt es mit einem Euro je Eigenbeitrags-Euro bis höchstens 300 EUR pro Kind. Der Mindestbeitrag beträgt 120 EUR jährlich. Ein höherer möglicher Höchstbetrag sagt deshalb wenig darüber, was du mit deinem tatsächlichen Beitrag erhältst.' },
        ],
      },
      {
        id: 'konkreter-vergleich',
        heading: 'Ein Beispiel: Bei gleichem Beitrag kann die neue Zulage niedriger sein',
        blocks: [
          { type: 'paragraph', text: 'Angenommen, eine unmittelbar berechtigte Person hat 26.000 EUR maßgebliche Vorjahreseinnahmen und zwei ihr zugeordnete zulagenberechtigte Kinder, beide nach 2007 geboren. Die alte Förderung ergibt 175 EUR Grundzulage und 600 EUR Kinderzulagen. Vier Prozent der Einnahmen sind 1.040 EUR. Nach Abzug der Zulagen bleiben 265 EUR erforderlicher Eigenbeitrag.' },
          { type: 'table', caption: 'Vereinfachter Zulagenvergleich dieses Beispiels', head: ['Position', 'Alte Förderung', 'Neue Förderung bei gleichem Beitrag'], rows: [
            ['Eigenbeitrag im Jahr', '265 EUR', '265 EUR'],
            ['Grundzulage', '175 EUR', '132,50 EUR'],
            ['Kinderzulagen zusammen', '600 EUR', '530 EUR'],
            ['Zulagen insgesamt', '775 EUR', '662,50 EUR'],
            ['Eigenbeitrag plus Zulagen', '1.040 EUR', '927,50 EUR'],
          ], note: 'Kosten, Wertentwicklung, Berufseinsteigerbonus und zusätzliche Steuerermäßigung sind in diesem Rechenbeispiel nicht berücksichtigt. Alle Berechtigungs- und Zuordnungsvoraussetzungen werden angenommen.' },
          { type: 'paragraph', text: 'Bei 300 EUR Eigenbeitrag wäre die neue Kinderzulage in diesem Beispiel vollständig. Damit wäre aber auch der eigene Beitrag höher. Vergleiche daher zuerst denselben Eigenbeitrag. Eine zweite Rechnung kann anschließend zeigen, wie sich ein anderer, für dich tragbarer Beitrag auswirkt.' },
        ],
      },
      {
        id: 'vergleichskriterien',
        heading: 'Neben der Zulage gehören vier weitere Punkte in den Vergleich',
        blocks: [
          { type: 'list', items: [
            { lead: 'Steuer:', text: 'Eine mögliche zusätzliche Steuerermäßigung hängt von deiner persönlichen Veranlagung ab. Zähle den Zulagenanspruch dabei nicht doppelt.' },
            { lead: 'Kosten:', text: 'Vergleiche künftige Vertrags- und Anlagekosten sowie mögliche Übertragungskosten.' },
            { lead: 'Garantie und Risiko:', text: 'Ein Altvertrag mit Garantie und ein Depot ohne Garantie haben unterschiedliche Eigenschaften.' },
            { lead: 'Auszahlung:', text: 'Beachte lebenslange Zahlungen, mögliche Auszahlungspläne und die nachgelagerte Besteuerung.' },
          ] },
          { type: 'paragraph', text: 'Eine Gegenüberstellung sollte dieselbe Laufzeit und dieselben nachvollziehbaren Wertentwicklungsannahmen verwenden. Prognosen sind keine Zusagen. Wenn ein Angebot nur eine Zulagenspalte zeigt und Kosten oder Garantien fehlen, ist der Vergleich unvollständig. Auch ein möglicherweise höherer Ertrag aus Anlagen darf nicht als feststehender Ausgleich für verlorene Förderung dargestellt werden.' },
        ],
      },
      {
        id: 'einheitliches-foerdersystem',
        heading: 'Ein neuer Vertrag kann die Förderung deines gesamten Bestands verändern',
        blocks: [
          { type: 'paragraph', text: 'Du kannst die Anwendung der neuen Förderung für Bestandsverträge erklären. Ebenso führt der Abschluss eines neuen geförderten Altersvorsorgevertrags ab 2027 grundsätzlich zur einheitlichen Anwendung der neuen Regeln auf deine Riester-Bestandsverträge im §-10a-Fördersystem. Ein zurückbehaltener Altvertrag bleibt dadurch nicht automatisch in der alten Fördersystematik.' },
          { type: 'paragraph', text: 'Der Wechsel ist grundsätzlich unumkehrbar. Auch die mittelbare Berechtigung eines Ehepartners kann betroffen sein. Die Vertragsbedingungen weiterer Altverträge bleiben jedoch grundsätzlich bestehen; ihr Kapital wird durch den Förderwechsel nicht automatisch übertragen. Für eine Familie brauchst du deshalb eine Gegenüberstellung aller betroffenen Verträge und Rollen, bevor ein einzelner neuer Abschluss entschieden wird.' },
        ],
      },
      {
        id: 'entscheidung-vorbereiten',
        heading: 'So wird aus dem Vergleich eine belastbare Entscheidung',
        blocks: [
          { type: 'paragraph', text: 'Beginne mit deinen tatsächlichen Eigenbeiträgen, den relevanten Einkommensdaten und den zugeordneten Kinderzulagen. Rechne die alte und neue Förderung damit getrennt. Danach ergänze Vertragskosten, Garantien und den geplanten Rentenbeginn. Fordere fehlende Angaben beim Anbieter an und lass dir die Folgen der Beitragsfreistellung oder Übertragung erläutern.' },
          { type: 'paragraph', text: 'Das Ergebnis kann Weiterführen, Ruhenlassen oder ein geprüfter Wechsel sein. Es gibt keinen pauschalen Sieger und keine allgemeine Pflicht, bis Ende 2027 umzusteigen. Entscheidend ist, ob die neue Kombination aus Beitrag, Förderung und Vertrag zu deiner Lebensplanung passt. Bei einer Änderung von Einkommen, Kinderzulagen oder Partnersituation kann ein späterer erneuter Vergleich sinnvoll werden.' },
        ],
      },
    ],
    faqs: [
      { question: 'Sind 540 EUR Grundzulage immer besser als 175 EUR?', answer: 'Der Höchstbetrag allein reicht für diesen Vergleich nicht. Die neue Höchstgrundzulage setzt 1.800 EUR Eigenbeitrag voraus. Im alten System kann die volle Förderung bei einem deutlich kleineren Beitrag erreichbar sein.' },
      { question: 'Kann ich die alte Förderung für einen Vertrag behalten und daneben neu sparen?', answer: 'Ein neuer geförderter Altersvorsorgevertrag führt grundsätzlich zur einheitlichen neuen Fördersystematik. Die alten Vertragsbedingungen und der Ort des Guthabens sind davon zu unterscheiden. Prüfe deshalb den gesamten Bestand.' },
      { question: 'Kann ich nach einem Jahr zur alten Förderung zurück?', answer: 'Ein Rückwechsel in die alte steuerliche Förderung ist nicht vorgesehen. Vergleiche die Folgen daher vor dem neuen Abschluss oder der Erklärung, die neue Förderung auf den Bestand anzuwenden.' },
    ],
    sourceIds: ['gesetz', 'bmf', 'zfa', 'regierung'],
    relatedSlugs: ['riester-jahresmitteilung-checkliste', 'altersvorsorgedepot-kosten'],
  });
