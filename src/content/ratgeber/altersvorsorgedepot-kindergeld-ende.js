import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-kindergeld-ende',
    cluster: 'familien',
    audience: 'eltern',
    nextStep: 'calculator',
    metaTitle: 'Kindergeld endet: Altersvorsorge neu rechnen | Healio',
    metaDescription: 'Wenn der Kindergeldanspruch endet, muss die Kinderzulage neu geprüft werden. Beispiele für die Förderung danach und eine Checkliste für deinen Beitrag.',
    headline: 'Kindergeld endet: Was ändert sich bei der Förderung deiner Altersvorsorge?',
    lead: 'Dein Kind wird erwachsen und der Kindergeldanspruch endet irgendwann. Dadurch verändert sich auch die Planung der Kinderzulage im Altersvorsorgedepot. Dein Vertrag muss deshalb nicht automatisch beendet werden. Sinnvoll ist eine neue Rechnung: Welche Förderung bleibt, welchen Beitrag kannst du tragen und was brauchst du später im Ruhestand?',
    listTeaser: 'Den letzten Kindergeldzeitraum prüfen, das Folgejahr berechnen und die Beitragshöhe an eure neue Lebensphase anpassen.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Die Kinderzulage hängt an der gesetzlichen Berücksichtigung des Kindes und dem Kindergeld. Die Kinderzulage läuft nicht einfach bis zur Rente der Eltern weiter.',
          'Kindergeld endet nicht in jedem Fall mit dem 18. Geburtstag. Bei Ausbildung oder Studium kann unter Voraussetzungen ein längerer Anspruch bestehen.',
          'Ein Jahr mit teilweise bestehendem Kindergeldanspruch muss anhand der Jahresregel geprüft werden. Teile die Kinderzulage nicht ungeprüft durch zwölf.',
          'Wenn für das ganze Folgejahr keine Kinderzulage mehr besteht, können Grundzulage und gegebenenfalls zusätzliche Steuerwirkung weiterhin relevant sein.',
        ] },
      ] },
      { id: 'ende', heading: 'Wann fällt der Kindergeldanspruch tatsächlich weg?', blocks: [
        { type: 'paragraph', text: 'Bis zum 18. Geburtstag besteht Kindergeld grundsätzlich für Kinder. Danach hängt der weitere Anspruch von zusätzlichen Voraussetzungen ab. Dazu können Schule, Ausbildung oder Studium gehören; in entsprechenden Fällen reicht der Anspruch grundsätzlich bis zum 25. Geburtstag. Einzelheiten etwa zu Übergangszeiten und einer weiteren Ausbildung müssen anhand der tatsächlichen Situation geprüft werden. Der Geburtstag allein beantwortet die Frage deshalb nicht.' },
        { type: 'paragraph', text: 'Nutze den Bescheid und die Angaben der Familienkasse als Ausgangspunkt. Notiere, bis zu welchem Anspruchszeitraum Kindergeld festgesetzt ist und ob noch Nachweise einzureichen sind. Wenn du nur eine Vermutung zum Ende hast, baue darauf keinen dauerhaften Vorsorgeplan. Kläre zuerst die Familienleistung und gib die daraus folgende Änderung anschließend an den Altersvorsorgeanbieter weiter.' },
      ] },
      { id: 'jahr', heading: 'Was gilt für das letzte Jahr mit Kindergeld?', blocks: [
        { type: 'paragraph', text: 'Kindergeld wird nach Anspruchszeiträumen betrachtet, die Kinderzulage ist jedoch eine jährliche Förderung. Daraus folgt nicht automatisch eine Kürzung von 300 EUR auf beispielsweise sechs Zwölftel. Außerdem können ein Wechsel des Kindergeldempfängers und die Zuordnungsregeln eine Rolle spielen. Lass das Übergangsjahr anhand des Kindergeldbescheids und des betreffenden Beitragsjahres prüfen.' },
        { type: 'paragraph', text: 'Für die längerfristige Planung kannst du anschließend einen einfacheren Fall betrachten: ein vollständiges Kalenderjahr, in dem für das Kind kein berücksichtigungsfähiger Kindergeldanspruch mehr besteht. Dafür setzt du dessen Kinderzulage in der Rechnung mit null an. Das ist eine Planung für das Folgejahr und keine Aussage, dass bereits im Monat nach dem letzten Kindergeld dieselbe jährliche Kürzung greift.' },
      ] },
      { id: 'rechnung', heading: 'Wie sieht die Förderung ohne dieses Kind aus?', blocks: [
        { type: 'table', caption: 'Jahresbeispiel: unmittelbar berechtigte Person mit 300 EUR Eigenbeitrag', head: ['Berücksichtigte Kinder im ganzen Beispieljahr', 'Grundzulage', 'Kinderzulagen', 'Gesamte Zulagen'], rows: [
          ['Zwei Kinder', '150 EUR', '600 EUR', '750 EUR'],
          ['Ein Kind', '150 EUR', '300 EUR', '450 EUR'],
          ['Kein Kind', '150 EUR', '0 EUR', '150 EUR'],
        ], note: 'Neues Fördersystem, unmittelbare Berechtigung und jeweils entsprechende Zuordnung vorausgesetzt. Keine Zusatzsteuern, Rendite oder Kosten berechnet. Keine Rechnung für ein angebrochenes Anspruchsjahr.' },
        { type: 'paragraph', text: 'Beispiel: Ein Elternteil zahlt weiterhin 25 EUR im Monat. Für sein inzwischen erwachsenes einziges Kind besteht im gesamten betrachteten Jahr kein Kindergeldanspruch mehr. Die Kinderzulage entfällt in diesem Beispiel. Die Grundzulage von 150 EUR kann bei unveränderter unmittelbarer Berechtigung bleiben. Die bisherige Zahl von 450 EUR Förderung wäre für dieses volle Folgejahr nicht mehr passend.' },
      ] },
      { id: 'plan', heading: 'Beitrag halten, erhöhen oder verringern?', blocks: [
        { type: 'paragraph', text: 'Entscheide nicht allein anhand der kleineren Zulage. Vielleicht entfallen Betreuungskosten; vielleicht unterstützt du jetzt ein studierendes Kind stärker. Stelle zuerst den neuen Haushaltsplan auf und prüfe, welcher Betrag tatsächlich langfristig entbehrlich ist. Wenn eine höhere Rate möglich wird, kann auch die Grundzulage steigen: Bei 1.800 EUR Jahresbeitrag beträgt sie für unmittelbar Berechtigte höchstens 540 EUR.' },
        { type: 'paragraph', text: 'Eine höhere Rate ersetzt nicht automatisch die weggefallene Kinderzulage und ist kein Selbstzweck. Ein höherer Beitrag bindet mehr Geld bis zur späteren Auszahlung. Betrachte daneben deine aktuellen Rentenansprüche, noch offene Schulden, die Familienreserve und Vertragskosten. Du kannst den Vertrag bis zum Auszahlungsbeginn ruhen lassen. Prüfe dafür die fortlaufenden Kosten und Förderfolgen; mögliche Beitragssenkungen hängen zusätzlich von den Bedingungen ab.' },
      ] },
      { id: 'checkliste', heading: 'Diese vier Dinge solltest du festhalten', blocks: [
        { type: 'list', items: [
          { lead: 'Letzten Anspruchszeitraum dokumentieren.', text: 'Bescheid und Ausbildungsnachweise sammeln, statt die Förderberechnung nur an einen Geburtstag zu knüpfen.' },
          { lead: 'Anbieter informieren.', text: 'Änderung des Kindergeldanspruchs oder der Zuordnung mit Kind und Beitragsjahr angeben.' },
          { lead: 'Zwei Jahre getrennt rechnen.', text: 'Das Übergangsjahr prüfen lassen und für das vollständige Folgejahr eine neue Förderrechnung erstellen.' },
          { lead: 'Vertrag und Vorsorgeziel gemeinsam ansehen.', text: 'Die kleinere Förderung bedeutet nicht automatisch, dass eine Kündigung wirtschaftlich sinnvoll wäre. Eine schädliche Entnahme kann Rückzahlungen auslösen.' },
        ] },
      ] },
    ],
    faqs: [
      { question: 'Endet die Kinderzulage grundsätzlich am 18. Geburtstag?', answer: 'Nein. Entscheidend sind der berücksichtigungsfähige Kindergeldanspruch und die gesetzlichen Zulagenregeln. Bei einer Ausbildung oder einem Studium kann unter Voraussetzungen nach dem 18. Geburtstag weiter Kindergeld bestehen.' },
      { question: 'Wird die Kinderzulage beim Ende des Kindergelds immer monatsweise gekürzt?', answer: 'Das solltest du nicht pauschal annehmen. Die Kinderzulage ist eine Jahresförderung. Das Übergangsjahr muss anhand der gesetzlichen Regeln, der Anspruchszeiträume und der Zuordnung geprüft werden.' },
      { question: 'Muss ich meinen Vertrag ohne Kinderzulage kündigen?', answer: 'Nein. Rechne die verbleibende Förderung und deinen Bedarf neu. Eine Kündigung mit schädlicher Verwendung kann Zulagen und Steuervorteile kosten; sie folgt nicht automatisch aus dem Ende des Kindergelds.' },
    ],
    sourceIds: ['gesetz', 'estg85', 'kindergeld', 'zfa'],
    relatedSlugs: ['altersvorsorgedepot-kinderzulage', 'altersvorsorgedepot-passt-das-zu-mir'],
  });
