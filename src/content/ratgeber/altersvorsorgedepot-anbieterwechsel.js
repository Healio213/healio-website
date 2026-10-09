import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-anbieterwechsel',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot: Anbieterwechsel und Kosten | Healio',
    metaDescription: 'Anbieterwechsel beim neuen Altersvorsorgedepot: Fünfjahresregel, Kosten beim alten und neuen Anbieter sowie eine Checkliste vor der Übertragung.',
    headline: 'Altersvorsorgedepot wechseln: Welche Regeln und Kosten du prüfen musst',
    lead: 'Ein Anbieterwechsel ist eine Übertragung in einen anderen Altersvorsorgevertrag, keine Auszahlung auf dein Girokonto. Die Reform begrenzt bestimmte Wechselkosten und erleichtert damit den Vergleich. Trotzdem musst du vor einer Entscheidung Übertragungswert, neues Angebot und mögliche Veränderungen der Leistungen kennen.',
    listTeaser: 'Neue Wechselregeln, Kostenlimits und ein geordneter Ablauf vor der Übertragung.',
    sections: [
      {
        id: 'uebertragung',
        heading: 'Das Kapital bleibt im Altersvorsorgerahmen',
        blocks: [
          { type: 'paragraph', text: 'Beim geordneten Wechsel wird Kapital auf einen anderen zulässigen Altersvorsorgevertrag übertragen. Es wird nicht zunächst frei an dich ausgezahlt und anschließend nach Belieben verwendet. Das ist wichtig, weil eine vorzeitige Auszahlung andere Förderfolgen haben kann. Erkundige dich beim neuen Anbieter vorab, ob und zu welchen Bedingungen er die Übertragung annimmt.' },
          { type: 'paragraph', text: 'Ein Wechsel kann sinnvoll erscheinen, wenn Anlage, Kosten oder Betreuung nicht mehr zu deinem Bedarf passen. Daraus folgt aber kein automatischer Vorteil. Auch ein günstigeres Angebot kann andere Leistungen oder eine andere Garantie haben. Vergleiche deshalb den künftig verfügbaren Betrag und die Bedingungen beider Wege statt nur die neue monatliche Gebühr.' },
        ],
      },
      {
        id: 'kostenregeln',
        heading: 'Was die Fünfjahresregel tatsächlich begrenzt',
        blocks: [
          { type: 'table', caption: 'Kostenrahmen für Übertragungen bei neuen Verträgen', head: ['Beteiligter oder Situation', 'Gesetzlicher Rahmen'], rows: [
            ['Bisheriger Anbieter innerhalb der ersten fünf Jahre', 'Für die Übertragung zu einem anderen Anbieter höchstens 150 EUR'],
            ['Bisheriger Anbieter nach Ablauf von fünf Jahren', 'Keine Kosten für die Übertragung'],
            ['Übertragung beim selben Anbieter oder bei einer Kostenänderung nach der gesetzlichen Regel', 'Keine Übertragungsgebühr beim bisherigen Anbieter'],
            ['Neuer Anbieter', 'Einmalige Verwaltungspauschale für die Übertragung höchstens 150 EUR'],
          ], note: 'Die neuen Regeln nicht ungeprüft auf einen alten Riester-Vertrag übertragen. Dessen Vertrags- und Übergangsregeln gesondert prüfen.' },
          { type: 'paragraph', text: 'Beim neuen Anbieter darf das übertragene geförderte Kapital nicht erneut in die Berechnung der Abschluss- und Vertriebskosten einbezogen werden. Die mögliche Verwaltungspauschale ist davon zu unterscheiden. Für künftige eigene Beiträge und die weitere Verwaltung brauchst du trotzdem die vollständige Kosteninformation des neuen Angebots. Das Limit für die Übertragung beschreibt nicht sämtliche Kosten des neuen Vertrags.' },
        ],
      },
      {
        id: 'vergleich',
        heading: 'Welche Leistungen du beim Vergleich mitnehmen musst',
        blocks: [
          { type: 'paragraph', text: 'Prüfe Anlageauswahl, Garantie, Auszahlungswege und laufende Kosten. Bei einer Beitragsgarantie ist besonders wichtig, welcher Betrag beim Wechsel tatsächlich übertragen wird und welche Zusage im neuen Vertrag gilt. Eine alte Garantie läuft nicht allein deshalb unverändert weiter, weil beide Produkte Altersvorsorge heißen. Lass dir die Auswirkungen auf die verbleibende Laufzeit nachvollziehbar erklären.' },
          { type: 'paragraph', text: 'Bei einem Depot ohne Garantie kommt der aktuelle Marktwert hinzu. Frage, wie die Übertragung technisch erfolgt: Werden Wertpapiere übertragen oder Anlagen verkauft, wie lange dauert der Vorgang, und was geschieht in der Zwischenzeit? Der gesetzliche Kostenrahmen beantwortet diese praktischen Fragen nicht. Ein Wechsel sollte deshalb nach einem konkreten Ablauf geplant werden.' },
        ],
      },
      {
        id: 'unterlagen',
        heading: 'Vier Unterlagen helfen dir weiter',
        blocks: [
          { type: 'list', items: [
            { lead: 'Aktuelle Vertragsübersicht:', text: 'Guthaben, Laufzeit, Beitrag und vereinbarte Leistungen des bisherigen Vertrags.' },
            { lead: 'Übertragungsauskunft:', text: 'Voraussichtlicher Übertragungswert, Kosten, Fristen und Gültigkeit der Berechnung.' },
            { lead: 'Neues Angebot:', text: 'Produktinformationsblatt, Kosten, Anlage und Garantiebedingungen.' },
            { lead: 'Annahmebestätigung:', text: 'Schriftliche Information, dass der neue Anbieter das Kapital annimmt, samt geplantem Ablauf.' },
          ] },
          { type: 'paragraph', text: 'Vergleiche danach zwei vollständige Szenarien: weiterführen und wechseln. Verwende denselben künftigen Eigenbeitrag und nachvollziehbare Annahmen. Ein Unterschied in den Beispielwerten ist kein zugesagter Mehrertrag. Für einen alten Riester-Vertrag kommt die Frage hinzu, welche Folgen der Übergang in das neue Fördersystem hat; dafür gibt es einen eigenen Ratgeber.' },
        ],
      },
      {
        id: 'ablauf',
        heading: 'Erst prüfen, dann den Wechselauftrag erteilen',
        blocks: [
          { type: 'paragraph', text: 'Lass beide Anbieter den vorgesehenen Übertragungsweg bestätigen. Prüfe anschließend alle Kosten und veränderten Rechte. Erst wenn das neue Angebot, die Annahme und die Fristen zusammenpassen, ist ein Auftrag nachvollziehbar vorbereitet. Eine eigenständige Kündigung mit Auszahlung ist dafür kein gleichwertiger Ersatz.' },
          { type: 'paragraph', text: 'Bewahre die Bestätigungen auf und kontrolliere nach dem Wechsel den angekommenen Betrag, die Beitragszahlung und die Daten für die Förderung. Bei Unstimmigkeiten hilft eine dokumentierte Rechnung mehr als eine mündliche Zusage. Im persönlichen Zuschuss-Check kannst du vorhandene Unterlagen und offene Fragen ordnen, bevor du eine verbindliche Veränderung beauftragst.' },
        ],
      },
    ],
    faqs: [
      { question: 'Entfallen nach fünf Jahren sämtliche Kosten des neuen Vertrags?', answer: 'Nein. Nach Ablauf der Frist darf der bisherige Anbieter für die Übertragung keine Wechselkosten verlangen. Der neue Anbieter kann die begrenzte Verwaltungspauschale berechnen; außerdem gelten die laufenden Kosten seines Produkts.' },
      { question: 'Kann der neue Anbieter auf das übertragene Kapital erneut Abschlusskosten berechnen?', answer: 'Das übertragene geförderte Kapital darf nach den neuen Regeln nicht in die Berechnung der Abschluss- und Vertriebskosten einbezogen werden. Eine einmalige Verwaltungspauschale bis 150 EUR bleibt möglich.' },
      { question: 'Gelten die Limits auch für meinen alten Riester-Vertrag?', answer: 'Übertrage die neue Regel nicht pauschal auf einen Bestandsvertrag. Prüfe dessen Bedingungen und die gesetzlichen Übergangsregeln. Der Ratgeber zum Riester-Wechsel behandelt diesen eigenen Entscheidungsfall.' },
    ],
    sourceIds: ['gesetz'],
    relatedSlugs: ['riester-altersvorsorgedepot-wechsel', 'altersvorsorgedepot-kosten'],
  });
