import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-kinderzulage',
    cluster: 'familien',
    audience: 'eltern',
    nextStep: 'calculator',
    metaTitle: 'Altersvorsorgedepot: Kinderzulage berechnen | Healio',
    metaDescription: 'Bis zu 300 EUR Kinderzulage je Kind ab 2027: Welche Voraussetzungen gelten und wie 25 EUR Monatsbeitrag bei zwei Kindern zu 750 EUR Zulagen führen.',
    headline: 'Kinderzulage im Altersvorsorgedepot: Was bekommen Eltern ab 2027?',
    lead: 'Bei zwei Kindern können 25 EUR Eigenbeitrag im Monat zu 750 EUR Zulagen im Jahr führen. Das setzt eine passende Förderberechtigung, Kindergeld und die richtige Zuordnung der Kinderzulage voraus. Die Förderung fließt in die Altersvorsorge eines Elternteils und steht nicht für den Familienalltag zur Verfügung. Hier siehst du die Rechnung und die Punkte, die davor zu klären sind.',
    listTeaser: 'Die Förderrechnung für ein oder zwei Kinder, die Mindestbeiträge und der Unterschied zwischen Kinderzulage und Kindersparen.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Ab 2027 gibt es je berücksichtigtem Kind bis zu 300 EUR Kinderzulage im Jahr. Die Höhe folgt dem Eigenbeitrag.',
          'Für die neue Förderung sind mindestens 120 EUR Eigenbeitrag im Jahr erforderlich. Die volle Kinderzulage wird bei 300 EUR erreicht.',
          'Jedes Kind wird einem Elternteil zugeordnet. Zwei Verträge der Eltern verdoppeln die Kinderzulage nicht.',
          'Grundzulage und Kinderzulage sind Vertragsgutschriften. Diese Gutschriften sind weder verfügbares Haushaltsgeld noch eine zugesagte Anlagerendite.',
        ] },
      ] },
      { id: 'voraussetzungen', heading: 'Welche Voraussetzungen müssen zusammenkommen?', blocks: [
        { type: 'paragraph', text: 'Zuerst braucht der sparende Elternteil eine Förderberechtigung. Elternschaft allein reicht dafür nicht. Eine rentenversicherungspflichtige Beschäftigung kann die Grundlage sein, ebenso anerkannte Kindererziehungszeiten oder die neuen Voraussetzungen für Selbstständige. Wer nur über seinen Ehepartner mittelbar berechtigt ist, fällt unter andere Berechnungsregeln. Diesen Fall solltest du vor einer Förderrechnung ausdrücklich angeben.' },
        { type: 'paragraph', text: 'Dazu kommen der Kindergeldanspruch, die gesetzliche Zuordnung des Kindes und der erforderliche Eigenbeitrag. Prüfe bei jedem Kind die Kindergeldunterlagen und bei beiden Eltern den Förderstatus. Für 2027 und ab 2028 gelten bei der Zuordnung teilweise unterschiedliche Regeln. Wählt deshalb den Vertrag für die Kinderzulage erst, wenn die Zuordnung für das konkrete Beitragsjahr geklärt ist.' },
      ] },
      { id: 'rechnung', heading: 'So setzt sich die Kinderzulage zusammen', blocks: [
        { type: 'paragraph', text: 'Für unmittelbar Berechtigte beträgt die Grundzulage 50 Prozent auf die ersten 360 EUR Jahresbeitrag. Auf weitere Beiträge bis insgesamt 1.800 EUR kommen 25 Prozent hinzu. Die Kinderzulage ergänzt diese Rechnung: Für jedes zugeordnete, berücksichtigte Kind werden 100 Prozent des Eigenbeitrags gefördert, höchstens 300 EUR im Jahr. Derselbe Eigenbeitrag wird dabei für jedes dieser Kinder zugrunde gelegt.' },
        { type: 'table', caption: 'Beispiele bei unmittelbarer Berechtigung im neuen Fördersystem', head: ['Eigenbeitrag im Jahr', 'Grundzulage', 'Je Kind', 'Zulagen bei zwei Kindern'], rows: [
          ['120 EUR', '60 EUR', '120 EUR', '300 EUR'],
          ['300 EUR', '150 EUR', '300 EUR', '750 EUR'],
          ['360 EUR', '180 EUR', '300 EUR', '780 EUR'],
          ['1.800 EUR', '540 EUR', '300 EUR', '1.140 EUR'],
        ], note: 'Vorausgesetzt sind die Berechtigung und Kinderzulage für beide Kinder im betrachteten Beitragsjahr. Kein Berufseinsteigerbonus, keine zusätzliche Steuerwirkung und keine Anlageerträge berücksichtigt.' },
      ] },
      { id: 'familienbeispiel', heading: 'Was bedeutet die Rechnung für eine Familie?', blocks: [
        { type: 'paragraph', text: 'Ein unmittelbar berechtigter Elternteil zahlt zwölfmal 25 EUR ein. Das sind 300 EUR eigener Beitrag. Bei zwei zugeordneten Kindern mit entsprechendem Kindergeldanspruch kommen 150 EUR Grundzulage und zweimal 300 EUR Kinderzulage hinzu. Beitrag und Zulagen ergeben zusammen 1.050 EUR, die in den Vertrag fließen. Davon sind 750 EUR Förderung. Vertragskosten und Wertentwicklung entscheiden mit darüber, welcher Vertragswert daraus entsteht.' },
        { type: 'paragraph', text: 'Die Rechnung beantwortet die Förderfrage, aber nicht die Frage nach einer ausreichenden Rente. Ein kleiner Beitrag kann gut zum aktuellen Familienbudget passen. Ob er langfristig reicht, hängt von vorhandenen Rentenansprüchen, der Laufzeit und eurem späteren Bedarf ab. Plane deshalb einen zweiten Blick ein, wenn die Betreuungskosten sinken oder wieder mehr Einkommen verfügbar ist.' },
      ] },
      { id: 'kindersparen', heading: 'Ist das ein Depot für mein Kind?', blocks: [
        { type: 'paragraph', text: 'Die Kinderzulage gehört zur Altersvorsorge des berechtigten Elternteils. Die Kinderzulage ist kein Sparguthaben, das dein Kind mit 18 für Ausbildung, Führerschein oder Wohnung bekommt. Für solche Ziele brauchst du eine gesonderte Planung mit einem passenden Zugriff auf das Geld. Auch Kindergeld selbst wird durch die Zulage nicht ersetzt: Es bleibt eine eigene Familienleistung mit eigenen Voraussetzungen.' },
        { type: 'paragraph', text: 'Das Altersvorsorgegeld ist grundsätzlich für deine spätere Auszahlung bestimmt. Eine vorzeitige schädliche Verwendung kann zur Rückzahlung von Zulagen und Steuervorteilen führen. Bei einem Depot ohne Garantie kommen Kursverluste hinzu. Halte deshalb eure Familienreserve außerhalb des Altersvorsorgevertrags und beurteile die Beitragshöhe anhand des Geldes, das länger entbehrlich ist.' },
      ] },
      { id: 'vorbereitung', heading: 'Diese Angaben brauchst du für die erste Rechnung', blocks: [
        { type: 'list', items: [
          { lead: 'Beide Eltern getrennt ansehen.', text: 'Notiere Beschäftigung, Selbstständigkeit oder Kindererziehungszeiten und vorhandene geförderte Verträge.' },
          { lead: 'Kindergeld und Zuordnung klären.', text: 'Halte fest, welche Kinder berücksichtigt werden und welchem Vertrag die Kinderzulage im betreffenden Jahr zugeordnet wird.' },
          { lead: 'Einen tragbaren Jahresbeitrag wählen.', text: 'Vergleiche mindestens eine kleine Rate und deinen späteren Zielbeitrag, statt nur auf den höchsten Zuschuss zu schauen.' },
          { lead: 'Kosten und Bindung prüfen.', text: 'Vor einer Entscheidung gehören Effektivkosten, Anlagerisiko und die spätere Auszahlung auf denselben Zettel wie die Förderung.' },
        ] },
      ] },
    ],
    faqs: [
      { question: 'Bekomme ich mit zwei Kindern automatisch 750 EUR?', answer: 'Nein. Die Beispielrechnung setzt unmittelbare Berechtigung im neuen Fördersystem, 300 EUR Jahresbeitrag und die Kinderzulage für beide Kinder voraus. Mittelbare Berechtigung oder eine andere Zuordnung verändern die Rechnung.' },
      { question: 'Brauche ich für jedes Kind zusätzlich 25 EUR Monatsbeitrag?', answer: 'Bei der gezeigten Rechnung nicht. Derselbe Eigenbeitrag von 300 EUR wird für jedes zugeordnete Kind berücksichtigt. Die Kinderzulage ist je Kind auf 300 EUR begrenzt.' },
      { question: 'Kann ich die Kinderzulage für aktuelle Familienausgaben abheben?', answer: 'Die Zulage fließt in deinen Altersvorsorgevertrag. Eine vorzeitige schädliche Verwendung kann die Rückzahlung von Förderung auslösen. Für laufende Ausgaben und die Familienreserve solltest du anderes Geld einplanen.' },
    ],
    sourceIds: ['gesetz', 'bmf', 'estg85'],
    relatedSlugs: ['altersvorsorgedepot-kinderzulage-elternteil', 'altersvorsorgedepot-foerderung'],
  });
