import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'riester-kuendigen-oder-behalten',
    cluster: 'riester',
    audience: 'riester',
    nextStep: 'check',
    metaTitle: 'Riester kündigen oder behalten? Erst prüfen',
    metaDescription: 'Was eine Riester-Kündigung mit Auszahlung bedeutet und welche Alternativen bei Geldbedarf, hohen Kosten oder einem geplanten Depotwechsel bestehen.',
    headline: 'Riester kündigen oder behalten: Welche Entscheidung passt?',
    lead: 'Wenn du deinen Riester-Vertrag kündigst und das Guthaben auszahlen lässt, werden grundsätzlich die erhaltenen Zulagen und Steuerermäßigungen zurückgefordert. Das kann den verfügbaren Betrag deutlich verringern. Bevor du entscheidest, solltest du den tatsächlichen Auszahlungsbetrag und Alternativen wie Ruhenlassen oder Übertragen kennen. Das Altersvorsorgedepot ist kein Anlass für eine vorschnelle Auszahlung.',
    listTeaser: 'Kündigungsfolgen und Alternativen nach dem eigentlichen Grund für deine Entscheidung ordnen.',
    sections: [
      {
        id: 'was-zurueckgefordert-wird',
        heading: 'Der Guthabenstand ist nicht dein Auszahlungsbetrag',
        blocks: [
          { type: 'paragraph', text: 'In deiner Jahresmitteilung steht meist ein Vertragsguthaben oder ein Wert zum Stichtag. Daraus kannst du nicht ohne Weiteres ablesen, wie viel nach einer Kündigung auf deinem Konto landet. Bei einer Auszahlung außerhalb des vorgesehenen Altersvorsorgezwecks werden die staatliche Zulagenförderung und die über den Sonderausgabenabzug erhaltenen Steuerermäßigungen berücksichtigt und grundsätzlich zurückgefordert.' },
          { type: 'paragraph', text: 'Hinzu kommen die vertraglichen Regeln und gegebenenfalls steuerliche Folgen der Auszahlung. Frage deinen Anbieter deshalb nach einer nachvollziehbaren Abrechnung für den geplanten Kündigungstermin: Wert vor Abzügen, Kosten, rückzuzahlende Förderung und voraussichtlicher Auszahlungsbetrag. Für die Besteuerung im Einzelfall sind Steuerberatung oder Finanzamt zuständig. Eine pauschale Prozentzahl beschreibt deinen Vertrag nicht zuverlässig.' },
        ],
      },
      {
        id: 'anlass-und-alternative',
        heading: 'Der Anlass entscheidet, welche Alternative zuerst zu prüfen ist',
        blocks: [
          { type: 'table', caption: 'Eine Entscheidungsmatrix für häufige Situationen', head: ['Dein Anlass', 'Zuerst prüfen', 'Wichtigster Vergleichspunkt'], rows: [
            ['Der Monatsbeitrag belastet mich', 'Beitrag anpassen oder Vertrag ruhen lassen', 'Entlastung heute und Folgen für Förderung und Leistungen'],
            ['Die Vertragskosten enttäuschen mich', 'Bestehenden Vertrag mit Wechselangebot vergleichen', 'Künftige Kosten statt nur bereits bezahlter Kosten'],
            ['Ich brauche sofort verfügbares Geld', 'Konkrete Kündigungsabrechnung und andere Finanzierungswege', 'Tatsächlicher Erlös nach Rückforderung'],
            ['Ich möchte ab 2027 ins Depot', 'Geregelte Übertragung statt Auszahlung prüfen', 'Neues Risiko, Kosten und Wechsel des Fördersystems'],
            ['Ich möchte Wohneigentum finanzieren', 'Voraussetzungen einer begünstigten Entnahme prüfen', 'Zweckbindung und spätere steuerliche Behandlung'],
          ], note: 'Die Matrix legt keine Entscheidung fest. Die Matrix zeigt, welche Information für deinen Anlass fehlt.' },
          { type: 'paragraph', text: 'Ein Vertrag kann unpassend sein, ohne dass die sofortige Auszahlung der beste Ausweg ist. Andersherum sollte eine bestehende Förderung nicht dazu führen, einen dauerhaft untragbaren Beitrag weiterzuzahlen. Vergleiche die Möglichkeiten anhand deiner aktuellen Situation und der konkreten Beträge.' },
        ],
      },
      {
        id: 'ruhen-lassen',
        heading: 'Ruhenlassen stoppt Beiträge, nicht automatisch den Vertrag',
        blocks: [
          { type: 'paragraph', text: 'Wenn du den Vertrag ruhen lässt, stoppst du weitere Beitragszahlungen. Das bisherige Kapital und die erhaltenen Zulagen bleiben grundsätzlich im Vertrag. Für einen vorübergehenden Engpass kann das ein prüfenswerter Weg sein. Ohne die nötigen Beiträge entsteht allerdings keine entsprechende neue Zulagenförderung für das Jahr.' },
          { type: 'paragraph', text: 'Ruhenlassen bedeutet zudem nicht automatisch, dass alle Kosten entfallen oder jede Leistung unverändert bleibt. Lass dir die laufenden Kosten und die Auswirkungen auf garantierte oder ergänzende Leistungen schriftlich erläutern. Kläre, ob und wie du später wieder Beiträge leisten kannst. Dadurch erkennst du, ob die Entlastung heute mit vertretbaren Folgen für die spätere Vorsorge verbunden ist.' },
        ],
      },
      {
        id: 'uebertragung-statt-auszahlung',
        heading: 'Ein Transfer hat andere Folgen als Geld auf dein Girokonto',
        blocks: [
          { type: 'paragraph', text: 'Bei einer geregelten Übertragung auf einen geeigneten Altersvorsorgevertrag kann die bereits erhaltene Förderung erhalten bleiben. Das Guthaben dient weiter der Altersvorsorge. Eine Kündigung mit Auszahlung an dich löst dagegen grundsätzlich die beschriebenen Rückforderungen aus. Entscheidend ist deshalb der vereinbarte Zahlungsweg und nicht nur das Wort Kündigung auf einem Formular.' },
          { type: 'paragraph', text: 'Ein neuer Vertrag kann Kosten und andere Risiken enthalten. Beim Altersvorsorgedepot gibt es keine Beitragsgarantie. Außerdem ist der Wechsel zur neuen Förderung grundsätzlich unumkehrbar und betrifft weitere bestehende Verträge. Ein Transfer sollte daher das Ergebnis einer Prüfung sein. Die ausführliche Vorbereitung des Wechsels ist eine eigene Aufgabe und ersetzt die Kündigungsabrechnung nicht.' },
        ],
      },
      {
        id: 'entscheidung-in-zahlen',
        heading: 'Lass dir die Entscheidung in drei Zahlen zeigen',
        blocks: [
          { type: 'list', items: [
            { lead: 'Kündigung:', text: 'Welcher Betrag würde nach Kosten und Rückforderung tatsächlich ausgezahlt?' },
            { lead: 'Beitragsfreistellung:', text: 'Wie entwickeln sich Kosten und Vertragsleistungen ohne neue Beiträge?' },
            { lead: 'Fortführung oder Transfer:', text: 'Welcher Eigenbeitrag, welche Förderung und welche Leistungen stehen bei vergleichbaren Annahmen gegenüber?' },
          ] },
          { type: 'paragraph', text: 'Verlange zu jedem Wert einen Stichtag und eine Erklärung der Annahmen. Bereits gezahlte Kosten sind ein Teil der Historie; für die Entscheidung über Fortführung sind zusätzlich die künftigen Kosten wichtig. Bei einem akuten Geldbedarf zählt wiederum der realistische Auszahlungsbetrag heute. Mit getrennten Zahlen vermeidest du, eine Enttäuschung über die Vergangenheit mit einem ungeprüften neuen Vertrag zu beantworten.' },
        ],
      },
    ],
    faqs: [
      { question: 'Muss ich bei jeder Kündigung die Zulagen zurückzahlen?', answer: 'Die Rückforderung betrifft grundsätzlich eine schädliche Auszahlung. Bei einer geregelten Übertragung auf einen geeigneten Altersvorsorgevertrag gelten andere Regeln. Prüfe deshalb ausdrücklich, wohin das Guthaben fließt.' },
      { question: 'Verliere ich beim Ruhenlassen meine bisherigen Zulagen?', answer: 'Die bisherigen Zulagen und das Kapital bleiben grundsätzlich im Vertrag. Neue Förderung setzt entsprechende Voraussetzungen und Beitragszahlungen voraus. Laufende Kosten und Leistungsänderungen solltest du separat erfragen.' },
      { question: 'Ist Kündigen sinnvoll, weil das neue Depot kommt?', answer: 'Die Einführung des Depots allein beantwortet das nicht. Vergleiche deinen Vertrag mit einem konkreten neuen Angebot. Ein ungeprüfter Auszahlungsauftrag kann Förderung kosten, bevor ein möglicher Transfer überhaupt beurteilt wurde.' },
    ],
    sourceIds: ['riester-kuendigung', 'gesetz', 'zfa', 'bmf'],
    relatedSlugs: ['riester-altersvorsorgedepot-wechsel', 'riester-jahresmitteilung-checkliste'],
  });
