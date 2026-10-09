import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-geld-entnehmen',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot: Geld vor der Rente entnehmen? | Healio',
    metaDescription: 'Was passiert bei einer vorzeitigen Entnahme? Förderfolgen, Alternativen zur Kündigung und den Sonderfall Wohneigentum vor einer Entscheidung prüfen.',
    headline: 'Altersvorsorgedepot: Was gilt, wenn du vor der Rente an dein Geld musst?',
    lead: 'Das Altersvorsorgedepot ist grundsätzlich für Geld gedacht, das du bis zur Rente zurücklegen kannst. Ein kurzfristiger Geldbedarf lässt sich daraus nicht wie aus einer frei verfügbaren Rücklage bedienen. Vor einer Entnahme oder Kündigung solltest du deshalb Förderfolgen, Vertragskosten und Alternativen genau prüfen.',
    listTeaser: 'Warum eine freie Reserve wichtig ist und welche Fragen vor einer vorzeitigen Auszahlung stehen.',
    sections: [
      {
        id: 'bindung',
        heading: 'Förderung verbindet sich mit einer Altersvorsorgeaufgabe',
        blocks: [
          { type: 'paragraph', text: 'Der Staat fördert den Vertrag, damit Vermögen für die spätere Versorgung entsteht. Deshalb gelten besondere Regeln für die Auszahlung. Der reguläre Beginn neuer Verträge liegt grundsätzlich zwischen 65 und 70 Jahren; gesetzlich vorgesehene frühere Altersleistungen können eine Ausnahme ermöglichen. Die Regeln sind nicht mit dem jederzeitigen Verkauf in einem gewöhnlichen Depot gleichzusetzen.' },
          { type: 'paragraph', text: 'Wenn du gefördertes Geld außerhalb der zulässigen Zwecke vorzeitig auszahlen lässt, kann das als schädliche Verwendung gelten. Dann müssen grundsätzlich Zulagen und gewährte Steuerermäßigungen zurückgezahlt werden. Dazu können Vertragskosten und steuerliche Folgen für Erträge kommen. Der angezeigte Vertragswert ist deshalb nicht automatisch der Betrag, der nach einer solchen Auszahlung auf deinem Konto ankommt.' },
        ],
      },
      {
        id: 'handlungswege',
        heading: 'Zahlung verändern ist etwas anderes als Geld entnehmen',
        blocks: [
          { type: 'table', caption: 'Drei Situationen, drei unterschiedliche Prüfungen', head: ['Situation', 'Möglicher Ansatz', 'Vorher prüfen'], rows: [
            ['Der Monatsbeitrag ist zu hoch', 'Beitrag nach Vertragsbedingungen anpassen', 'Restlicher Jahresbeitrag, Zulage und laufende Kosten'],
            ['Du brauchst vorübergehend Luft', 'Gesetzliches Recht auf Ruhenlassen nutzen', 'Kosten während der Pause und Wiederaufnahme'],
            ['Du brauchst vorhandenes Guthaben', 'Vorzeitige Auszahlung oder Sonderfall prüfen', 'Förderrückzahlung, Auszahlungssumme und Steuern'],
          ], note: 'Eine Beitragspause schafft kein frei ausgezahltes Guthaben. Die konkreten Vertragsmöglichkeiten sind gesondert zu prüfen.' },
          { type: 'paragraph', text: 'Bei einem vorübergehenden Engpass kann es helfen, zunächst künftige Zahlungen anzupassen. Dadurch bleibt bereits gebildetes Vermögen im Vertragsrahmen. Du hast grundsätzlich das Recht, den Vertrag bis zum Beginn der Auszahlungsphase ruhen zu lassen. Die Abwicklung, verbleibende Kosten, Regeln für eine Beitragssenkung und eine Wiederaufnahme prüfst du in den Bedingungen. Für neue Zulagen zählt der tatsächliche Jahresbeitrag. Eine Pause ist deshalb nicht automatisch ohne Auswirkungen auf die Förderung.' },
        ],
      },
      {
        id: 'nettoauszahlung',
        heading: 'Lass dir die wirkliche Auszahlungssumme nennen',
        blocks: [
          { type: 'paragraph', text: 'Bevor du einen Auftrag zur Kündigung erteilst, fordere eine schriftliche Berechnung an. Die Berechnung sollte den zugrunde liegenden Vertragswert, mögliche Gebühren, zurückzuzahlende Zulagen und Steuerermäßigungen sowie den erwarteten Auszahlungsbetrag ausweisen. Wenn Angaben nur vorläufig sind, lass dir erklären, warum und zu welchem Zeitpunkt der Betrag endgültig feststeht.' },
          { type: 'paragraph', text: 'Bei Wertpapieranlagen kommt der Marktwert hinzu. Ein kurzfristiger Verkauf kann einen Verlust realisieren, den du ohne den Geldbedarf möglicherweise nicht zu diesem Zeitpunkt realisiert hättest. Eine Garantie zum regulären Beginn der Auszahlungsphase ist keine pauschale Zusage für eine Kündigung davor. Prüfe deshalb den Kündigungswert ausdrücklich, auch wenn dein Vertrag eine Beitragsgarantie enthält.' },
        ],
      },
      {
        id: 'wohneigentum',
        heading: 'Wohneigentum ist ein geregelter Sonderfall',
        blocks: [
          { type: 'paragraph', text: 'Für bestimmte Zwecke rund um selbst genutztes Wohneigentum bestehen gesetzliche Sonderregelungen zur Verwendung geförderten Altersvorsorgevermögens. Das ist kein allgemeiner Zugang zu Geld für jede Immobilie und auch kein beliebiger Ersatz für eine Kündigung. Verwendungszweck, Antrag, Nachweise und steuerliche Behandlung müssen zum konkreten Vorhaben passen.' },
          { type: 'paragraph', text: 'Wenn du einen Kauf, eine Entschuldung oder eine andere Maßnahme planst, kläre den zulässigen Weg vor einem Auszahlungsauftrag mit Anbieter und zuständiger Stelle. Die Förderung einfach auszahlen zu lassen und später eine Immobilie zu kaufen, ist keine belastbare Planung. Sonderregelungen können außerdem eine spätere Besteuerung über das Wohnförderkonto auslösen. Für den Einzelfall brauchst du eine gesonderte Prüfung.' },
        ],
      },
      {
        id: 'reserve',
        heading: 'So planst du von Anfang an mit einer erreichbaren Reserve',
        blocks: [
          { type: 'list', items: [
            'Sammle größere Ausgaben, die in den nächsten Jahren bereits absehbar sind.',
            'Trenne diese Beträge und Geld für unerwartete Ausgaben von langfristiger Altersvorsorge.',
            'Wähle einen Beitrag, den du auch in einem schwächeren Monat tragen kannst.',
            'Prüfe Anpassungsregeln, bevor du einen Vertrag unterschreibst.',
          ] },
          { type: 'paragraph', text: 'Bei bestehendem Geldbedarf beginnt ein sinnvoller Check mit der gesamten Situation, nicht mit einem vorschnellen Kündigungsauftrag. Halte Vertragsunterlagen und die benötigte Summe bereit. So lässt sich klären, ob eine Veränderung der Zahlungen, ein anderer Finanzierungsschritt oder ein gesetzlicher Sonderfall in Betracht kommt. Eine allgemeine Auskunft entscheidet das nicht für dich.' },
        ],
      },
    ],
    faqs: [
      { question: 'Kann ich wie bei einem normalen Depot jederzeit Geld abheben?', answer: 'Der geförderte Vertragsrahmen hat besondere Auszahlungsregeln. Eine vorzeitige Auszahlung kann erhebliche Förderfolgen haben. Kläre den zulässigen Weg und den verbleibenden Betrag vor dem Auftrag.' },
      { question: 'Muss ich bei einer Beitragspause alles zurückzahlen?', answer: 'Eine Pause künftiger Beiträge ist von einer Auszahlung des geförderten Guthabens zu unterscheiden. Prüfe Kosten und Bedingungen. Ob du im betreffenden Jahr weitere Zulagen erhältst, hängt unter anderem vom Jahresbeitrag ab.' },
      { question: 'Kann ich das Guthaben für jede Immobilie verwenden?', answer: 'Nein. Es gelten besondere Anforderungen für zulässige wohnwirtschaftliche Verwendungen. Selbstnutzung, Antrag und steuerliche Folgen müssen im konkreten Fall vorab geprüft werden.' },
    ],
    sourceIds: ['gesetz', 'riester-kuendigung'],
    relatedSlugs: ['altersvorsorgedepot-schwankendes-einkommen', 'altersvorsorgedepot-auszahlung'],
  });
