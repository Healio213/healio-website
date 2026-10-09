import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-was-ist-das',
    cluster: 'grundlagen',
    audience: 'standard',
    nextStep: 'webinar',
    metaTitle: 'Was ist das Altersvorsorgedepot? Konzept ab 2027',
    metaDescription: 'Das Altersvorsorgedepot verständlich erklärt: Förderung, Anlage ohne Garantie, Geldbindung und Unterschiede zum gewöhnlichen ETF-Depot.',
    headline: 'Was ist das Altersvorsorgedepot und wie funktioniert es?',
    lead: 'Das Altersvorsorgedepot ist ein neuer Rahmen für staatlich gefördertes Sparen für die Rente. Ab 1. Januar 2027 können Anbieter solche Verträge anbieten. Du legst darin Geld in zugelassene Anlagen an und kannst bei erfüllten Voraussetzungen Zulagen erhalten. Das Depot hat keine Beitragsgarantie; dein Geld bleibt grundsätzlich für die Altersvorsorge gebunden.',
    listTeaser: 'Das Konzept, die drei Produktwege und der Unterschied zu einem gewöhnlichen Wertpapierdepot.',
    sections: [
      {
        id: 'vertrag-und-anlage',
        heading: 'Ein Vertrag gibt den Rahmen vor, die Anlage bestimmt das Risiko',
        blocks: [
          { type: 'paragraph', text: 'Beim Altersvorsorgedepot gehören zwei Entscheidungen zusammen: der Vorsorgevertrag mit seinen Regeln und die darin verwendeten Anlagen. Zu den zugelassenen Möglichkeiten gehören bestimmte Fonds und ETFs. Welche Auswahl du tatsächlich hast und wie viel du selbst entscheidest, steht im konkreten Angebot. Ein Anbieter kann eine Auswahl vorgeben oder vertraglich vereinbarte Wahlmöglichkeiten eröffnen.' },
          { type: 'paragraph', text: 'Ein ETF bildet beispielsweise die Entwicklung eines Marktes nach. Er verhindert keine Kursverluste. Auch ein breit gestreuter Fonds kann zeitweise deutlich an Wert verlieren. Die staatliche Förderung verändert daran nichts. Die Förderung fließt in deinen Vertrag und ist kein Ausgleich für eine ungünstige Wertentwicklung. Deshalb solltest du Vertragskosten und Anlagerisiko getrennt betrachten.' },
        ],
      },
      {
        id: 'drei-produktwege',
        heading: 'Depot, Standarddepot oder Garantieprodukt',
        blocks: [
          { type: 'table', caption: 'Die wichtigsten Unterschiede der neuen Produktwege', head: ['Produktweg', 'Wesentliche Eigenschaft', 'Deine wichtigste Frage'], rows: [
            ['Altersvorsorgedepot', 'Keine Beitragsgarantie; zugelassene Anlagen nach Vertrag', 'Welche Anlagen, Entscheidungsmöglichkeiten und Kosten gibt es?'],
            ['Standarddepot', 'Zwei vorgegebene Fonds; höchstens 1 % Effektivkosten', 'Passt die vorgesehene Aufteilung zu meiner Risikobereitschaft?'],
            ['Garantieprodukt', '80 % oder 100 % Beitrags- und Zulagengarantie zum Auszahlungsbeginn', 'Welche Garantien und Renditechancen bietet der konkrete Vertrag?'],
          ], note: 'Die Effektivkostengrenze gehört zum Standarddepot. Diese Grenze gilt nicht pauschal für jeden neuen Vorsorgevertrag.' },
          { type: 'paragraph', text: 'Eine Garantie bezieht sich auf den vertraglich bestimmten Zeitpunkt und Umfang. Die Garantie bedeutet nicht, dass dein Guthaben jederzeit verfügbar ist oder deine spätere Kaufkraft erhalten bleibt. Beim Standarddepot werden Anlageentscheidungen vereinfacht. Trotzdem musst du verstehen, wie sich schwankende Kurse und die verbleibende Zeit bis zur Rente auf deinen Plan auswirken.' },
        ],
      },
      {
        id: 'abgrenzung-etf-depot',
        heading: 'Warum ein gewöhnliches ETF-Depot etwas anderes ist',
        blocks: [
          { type: 'paragraph', text: 'In einem gewöhnlichen Wertpapierdepot kannst du Anlagen grundsätzlich verkaufen und über den Erlös verfügen. Es erhält nicht die Zulagenförderung des neuen Vorsorgevertrags. Beim Altersvorsorgedepot übernimmt der Vertrag dagegen die Aufgabe, Geld für deine spätere Versorgung zurückzulegen. Die Förderung ist mit dieser Zweckbindung verbunden.' },
          { type: 'paragraph', text: 'Das macht die beiden Wege nicht austauschbar. Geld für die nächste Wohnung, eine geplante Anschaffung oder eine kurzfristige Rücklage gehört in eine andere Planung als Geld für das Alter. Wer beides braucht, sollte die Beträge bewusst aufteilen. Ein vorhandenes ETF-Depot wird durch einen neuen Vorsorgevertrag nicht automatisch zu einem geförderten Altersvorsorgedepot.' },
        ],
      },
      {
        id: 'foerderung-und-auszahlung',
        heading: 'Die Förderung gehört zur Rente, nicht zum heutigen Haushaltsgeld',
        blocks: [
          { type: 'paragraph', text: 'Die neue Grundzulage steigt mit deinen Eigenbeiträgen. Für zulagenberechtigte Kinder kann eine Kinderzulage dazukommen. Ob du Förderung erhältst, hängt von deinem Status und weiteren Voraussetzungen ab. Eine zusätzliche Steuerermäßigung wird bei der Günstigerprüfung des Finanzamts ermittelt. Die Zulagen selbst bleiben im Vertrag.' },
          { type: 'paragraph', text: 'Die spätere Auszahlung beginnt grundsätzlich im Alter zwischen 65 und 70 Jahren. Möglich sind eine lebenslange Rente oder ein Auszahlungsplan, der mindestens bis zum 85. Lebensjahr reicht. Ein endender Plan schützt nicht automatisch gegen ein sehr langes Leben. Auszahlungen auf geförderte Beiträge unterliegen der nachgelagerten Besteuerung. Eine vorzeitige Auszahlung kann die Rückforderung der Förderung auslösen.' },
        ],
      },
      {
        id: 'entscheidung-vorbereiten',
        heading: 'Diese vier Fragen helfen dir beim Einstieg',
        blocks: [
          { type: 'list', items: [
            { lead: 'Ziel:', text: 'Welcher Betrag ist für die Rente gedacht und welcher muss vorher verfügbar bleiben?' },
            { lead: 'Förderung:', text: 'Bin ich unmittelbar oder mittelbar berechtigt und wem ist die Kinderzulage zugeordnet?' },
            { lead: 'Vertrag:', text: 'Welche Kosten, Anlagen, Garantien und Möglichkeiten zum Ruhenlassen enthält das Angebot?' },
            { lead: 'Auszahlung:', text: 'Brauche ich eine lebenslange Zahlung oder passt ein zeitlich begrenzter Plan zu meinen übrigen Alterseinkünften?' },
          ] },
          { type: 'paragraph', text: 'Mit diesen Antworten kannst du Angebote vergleichen, ohne dich allein von einer hohen Zulagenzahl leiten zu lassen. Bis zum Produktstart lassen sich Unterlagen ordnen und Grundlagen klären. Eine Vormerkung für Informationen oder ein Webinar ersetzt weder die Prüfung deiner Förderberechtigung noch einen späteren Vertragsabschluss.' },
        ],
      },
    ],
    faqs: [
      { question: 'Ist das Altersvorsorgedepot ein Depot beim Staat?', answer: 'Nicht automatisch. Die neue Produktwelt umfasst Angebote verschiedener zugelassener Anbieter. Das Gesetz ermöglicht auch ein Standarddepot eines öffentlichen Trägers; daraus folgt noch kein konkretes, bereits verfügbares Angebot.' },
      { question: 'Kann ich trotz Förderung Geld verlieren?', answer: 'Ja. Das Altersvorsorgedepot enthält keine Beitragsgarantie. Kursentwicklung und Kosten wirken auf das Guthaben. Eine Zulage ist kein Renditeversprechen.' },
      { question: 'Muss ich meinen Riester-Vertrag ersetzen?', answer: 'Nein. Bestehende Riester-Verträge können weiterlaufen. Ob Behalten, Ruhenlassen oder Übertragen sinnvoll ist, verlangt einen eigenen Vergleich von Förderung, Kosten und Vertragsleistungen.' },
    ],
    sourceIds: ['regierung', 'gesetz', 'bmf', 'zfa'],
    relatedSlugs: ['altersvorsorgedepot-foerderung', 'altersvorsorgedepot-garantie'],
  });
