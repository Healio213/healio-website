import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'riester-altersvorsorgedepot-wechsel',
    cluster: 'riester',
    audience: 'riester',
    nextStep: 'check',
    metaTitle: 'Riester ins Altersvorsorgedepot übertragen?',
    metaDescription: 'Weiterführen, ruhen lassen oder ab 2027 übertragen: So bereitest du einen Riester-Wechsel vor und trennst Guthabentransfer von Fördersystemwechsel.',
    headline: 'Riester ins Altersvorsorgedepot wechseln: Was bedeutet das?',
    lead: 'Ab 2027 ist ein Wechsel von einem bestehenden Riester-Vertrag in einen neuen geförderten Altersvorsorgevertrag möglich. Du musst dafür nicht zuerst das Guthaben auszahlen lassen. Entscheidend sind ein geeignetes neues Angebot, die geregelte Übertragung und der Vergleich mit deinem Altvertrag. Der Wechsel zur neuen Förderung betrifft auch deine weiteren bestehenden Altersvorsorgeverträge.',
    listTeaser: 'Die drei Wege für den Bestand und eine geordnete Vorbereitung des möglichen Wechsels.',
    sections: [
      {
        id: 'drei-wege',
        heading: 'Du kannst weiterführen, ruhen lassen oder übertragen',
        blocks: [
          { type: 'table', caption: 'Welche Entscheidung welchen Teil deiner Vorsorge verändert', head: ['Weg', 'Was mit dem Guthaben passiert', 'Was du vorher prüfen solltest'], rows: [
            ['Altvertrag weiterführen', 'Bleibt im bestehenden Vertrag', 'Alte Förderung, Kosten und Vertragsleistungen'],
            ['Altvertrag ruhen lassen, neuen Vertrag besparen', 'Altguthaben bleibt; neue Beiträge gehen in den neuen Vertrag', 'Folgen der Beitragsfreistellung und Wechsel zur neuen Fördersystematik'],
            ['Guthaben übertragen', 'Geht im geregelten Verfahren in den neuen Vertrag', 'Übertragungswert, Kosten, Anlagen und Wegfall alter Garantien'],
          ], note: 'Guthabenübertragung und Wechsel des Fördersystems sind verschiedene Vorgänge. Auch ein zusätzlicher neuer Vertrag kann die Förderung der Altverträge verändern.' },
          { type: 'paragraph', text: 'Ein neuer Vertrag bewirkt keine automatische Verschiebung aller Guthaben. Die steuerliche Fördersystematik wird dagegen einheitlich angewendet. Genau deshalb reicht es nicht, nur zu entscheiden, wo deine nächsten Monatsbeiträge hingehen sollen. Du musst zugleich verstehen, was der neue Abschluss für die Förderung deiner anderen Verträge bedeutet.' },
        ],
      },
      {
        id: 'altvertrag-pruefen',
        heading: 'Zuerst den Wert und die Leistungen des Altvertrags ermitteln',
        blocks: [
          { type: 'paragraph', text: 'Besorge die aktuelle Jahresmitteilung und frage nach dem Betrag, der zu einem bestimmten Termin tatsächlich übertragen werden kann. Guthabenstand, Rückkaufswert und Übertragungswert können unterschiedliche Angaben sein. Notiere außerdem garantierte Leistungen, bisherige Zulagen, laufende Kosten und Bedingungen bei einer Beitragsfreistellung. Eine alte Garantie verschwindet nicht dadurch aus dem Vergleich, dass neue Förderung höher aussehen kann.' },
          { type: 'paragraph', text: 'Bei einem Versicherungsvertrag können weitere Leistungsmerkmale relevant sein. Lass dir erklären, welche davon beim Ruhenlassen erhalten bleiben und welche beim vollständigen Transfer enden. Ordne außerdem weitere Riester-Verträge und die Situation eines mittelbar berechtigten Ehepartners ein. So vergleichst du deine gesamte bestehende Vorsorge statt nur einen einzelnen Vertragswert.' },
        ],
      },
      {
        id: 'neues-angebot',
        heading: 'Das neue Angebot muss den Vergleich bestehen',
        blocks: [
          { type: 'paragraph', text: 'Prüfe beim neuen Vertrag die ausgewiesenen Kosten, die zugelassenen Anlagen und das geplante Auszahlungsverfahren. Ein Altersvorsorgedepot enthält keine Beitragsgarantie. Wenn dein bisheriger Vertrag eine Garantie hat, verändert ein Transfer ins Depot also auch das Risiko. Für einen brauchbaren Vergleich sollten beide Wege denselben künftigen Eigenbeitrag und dieselbe verbleibende Laufzeit zugrunde legen.' },
          { type: 'paragraph', text: 'Lass dir zusätzlich die Übernahmekosten nennen. Innerhalb der neuen Produktwelt darf der annehmende Anbieter höchstens 150 EUR Verwaltungspauschale für den Wechsel berechnen. Für den abgebenden neuen Vertrag gelten weitere Grenzen und nach fünf Jahren ein Wechsel ohne abgebende Wechselkosten. Bei einem alten Riester-Vertrag musst du die bestehenden Kostenregelungen gesondert prüfen.' },
        ],
      },
      {
        id: 'uebertragung-organisieren',
        heading: 'So bereitest du die Übertragung geordnet vor',
        blocks: [
          { type: 'list', items: [
            { lead: 'Annahme bestätigen lassen:', text: 'Der neue Anbieter muss das Guthaben aus deinem bestehenden Vertrag aufnehmen können.' },
            { lead: 'Termin und Fristen klären:', text: 'Lass dir Bearbeitungszeit, erforderliche Erklärungen und die Kündigungsfrist für die Übertragung nennen.' },
            { lead: 'Zahlungsweg festhalten:', text: 'Das Guthaben soll auf den neuen geförderten Vertrag übertragen werden; eine Auszahlung an dich ist ein anderer Vorgang.' },
            { lead: 'Beiträge abstimmen:', text: 'Vermeide unbeabsichtigte Lücken oder doppelte Belastungen während der Umstellung.' },
            { lead: 'Zulagenverfahren prüfen:', text: 'Kläre den neuen Zulagenantrag oder die Dauerbevollmächtigung und aktualisiere relevante Angaben.' },
          ] },
          { type: 'paragraph', text: 'Eine Kündigungserklärung kann Teil eines geregelten Transfers sein. Entscheidend ist dabei der Übertragungsauftrag. Lässt du dir das Guthaben stattdessen auszahlen, kann Förderung zurückgefordert werden. Halte dich deshalb an den schriftlich bestätigten Ablauf der beteiligten Anbieter und prüfe anschließend, welcher Betrag beim neuen Vertrag angekommen ist.' },
        ],
      },
      {
        id: 'foerdersystem-und-abschluss',
        heading: 'Die neue Förderung lässt sich nicht später wieder zurückdrehen',
        blocks: [
          { type: 'paragraph', text: 'Der Wechsel zur neuen steuerlichen Förderung wirkt einheitlich auf deine Riester-Bestandsverträge im §-10a-Fördersystem. Ein Rückweg in die alte Fördersystematik ist nicht vorgesehen. Das betrifft die Förderregeln; die vertraglichen Bedingungen weiterer Altverträge werden dadurch nicht automatisch zu Bedingungen eines neuen Depots. Diese Unterscheidung sollte im Vergleich ausdrücklich stehen.' },
          { type: 'paragraph', text: 'Es gibt keinen allgemeinen Zwang, bis Ende 2027 zu wechseln. Eine gute Entscheidung entsteht aus dem Vergleich von Förderung, Kosten, Garantien, Flexibilität und Auszahlung. Wenn für einen dieser Punkte noch Zahlen fehlen, beschaffe sie zuerst. Eine Interessenmeldung oder ein Beratungstermin nimmt dir diese Entscheidung nicht ab und löst keinen automatischen Transfer aus.' },
        ],
      },
    ],
    faqs: [
      { question: 'Muss ich Riester erst kündigen und das Geld auszahlen lassen?', answer: 'Nein. Bei einem geregelten Wechsel wird Guthaben auf den neuen Vertrag übertragen. Eine Auszahlung an dich kann zur Rückforderung der Förderung führen und ist keine notwendige Vorbereitung.' },
      { question: 'Ziehen alle meine Riester-Guthaben automatisch um?', answer: 'Nein. Das neue Fördersystem gilt einheitlich, aber Guthaben wechseln nur durch den entsprechenden Übertragungsvorgang. Andere Altverträge können vertraglich weiterbestehen.' },
      { question: 'Kann ich mein Guthaben behalten und nur neue Beiträge anders anlegen?', answer: 'Das ist grundsätzlich ein möglicher Weg. Ein neuer geförderter Vertrag löst jedoch ebenfalls den Wechsel zur neuen Fördersystematik aus. Prüfe deshalb die Folgen für alle betroffenen Riester-Bestandsverträge.' },
    ],
    sourceIds: ['regierung', 'gesetz', 'bmf', 'zfa', 'riester-kuendigung'],
    relatedSlugs: ['riester-kuendigen-oder-behalten', 'riester-alte-oder-neue-foerderung'],
  });
