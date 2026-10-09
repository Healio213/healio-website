import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-etf-sparplan',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'webinar',
    metaTitle: 'Altersvorsorgedepot oder ETF-Sparplan? | Healio',
    metaDescription: 'Förderung, Geldbindung, Kosten und Auszahlung: So vergleichst du das Altersvorsorgedepot mit einem freien ETF-Sparplan, ohne Renditeversprechen.',
    headline: 'Altersvorsorgedepot oder ETF-Sparplan: Erst das Ziel, dann der Vertrag',
    lead: 'Ein ETF kann in beiden Wegen vorkommen. Der Unterschied liegt vor allem im Rahmen: Ein Altersvorsorgedepot verbindet Anlage und Förderung mit Regeln für die Altersvorsorge. Ein freier ETF-Sparplan bietet andere Möglichkeiten, über dein Geld zu verfügen. Welcher Weg passt, hängt deshalb auch von deinen Plänen vor der Rente ab.',
    listTeaser: 'Ein Vergleich von Förderung, Verfügbarkeit, Kosten und Auszahlungsregeln.',
    sections: [
      {
        id: 'rahmen',
        heading: 'Die Anlage und der Vertrag sind zwei verschiedene Dinge',
        blocks: [
          { type: 'paragraph', text: 'ETF beschreibt eine Anlageform. Das Altersvorsorgedepot beschreibt einen geförderten Vertragsrahmen mit gesetzlich geregelten Anforderungen. Auch darin können geeignete ETFs eingesetzt werden. Du vergleichst also nicht zwangsläufig zwei unterschiedliche Anlagen. Derselbe Anlagetyp kann in einem anderen Vertragsrahmen andere Kosten, Förderbedingungen und Auszahlungsregeln haben.' },
          { type: 'paragraph', text: 'Ein freier ETF-Sparplan ist kein geförderter Altersvorsorgevertrag allein deshalb, weil du persönlich für die Rente sparst. Für seine Beiträge erhältst du nicht die Zulagen des neuen Altersvorsorgedepots. Dafür kannst du normalerweise Anteile verkaufen und das Geld auch für andere Ziele einsetzen. Der Verkaufswert hängt vom Markt ab. Verfügbarkeit bedeutet deshalb nicht, dass zu jedem Zeitpunkt dein gewünschter Betrag vorhanden ist.' },
        ],
      },
      {
        id: 'vergleich',
        heading: 'Die wichtigsten Unterschiede auf einen Blick',
        blocks: [
          { type: 'table', caption: 'Geförderter Vertragsrahmen und freies Depot', head: ['Frage', 'Altersvorsorgedepot', 'Freier ETF-Sparplan'], rows: [
            ['Staatliche Zulagen', 'Bei erfüllten Voraussetzungen und Beiträgen', 'Keine Zulagen aus diesem Fördersystem'],
            ['Zweck', 'Private Altersvorsorge mit geregelter Auszahlung', 'Frei bestimmbares Sparziel'],
            ['Zugriff vor der Rente', 'Förderfolgen und Sonderregeln beachten', 'Verkauf von Anteilen grundsätzlich möglich'],
            ['Verlustrisiko', 'Ohne Beitragsgarantie möglich', 'Bei Wertpapieranlagen möglich'],
            ['Kosten und Steuer', 'Vertragskosten und nachgelagerte Besteuerung prüfen', 'Depot-, Anlagekosten und Besteuerung der Kapitalanlage prüfen'],
          ], note: 'Der Vergleich bewertet keine konkreten Anbieter. Die Bedingungen des jeweiligen Vertrags bleiben maßgeblich.' },
          { type: 'paragraph', text: 'Aus dieser Tabelle folgt kein Sieger. Wer in wenigen Jahren Eigenkapital braucht, bewertet Geldbindung anders als jemand, der ausschließlich eine spätere Rentenergänzung aufbauen möchte. Schreibe zuerst dein Sparziel und den frühesten möglichen Bedarf auf. Danach kannst du beurteilen, ob eine geförderte Bindung zu diesem Geld passt.' },
        ],
      },
      {
        id: 'foerderung',
        heading: 'Die Zulage ist ein Vorteil, aber noch keine Gesamtrechnung',
        blocks: [
          { type: 'paragraph', text: 'Für unmittelbar Förderberechtigte sieht das neue System eine Grundzulage bis zu 540 EUR im Jahr vor. Hinzukommen können Kinderzulagen und ein einmaliger Startbonus. Wie viel du erhältst, hängt von den Voraussetzungen und deinem Jahresbeitrag ab. Der zusätzliche Sonderausgabenabzug wird über die Günstigerprüfung mit der Zulage abgestimmt. Zulage und voller rechnerischer Steuervorteil lassen sich deshalb nicht einfach addieren.' },
          { type: 'paragraph', text: 'Eine Prozentzahl zur Förderung ist außerdem keine jährliche Anlagerendite. Die Zulage bezieht sich auf Beiträge; die Wertentwicklung betrifft das angelegte Vermögen. Für einen Vergleich gehören deshalb Kosten, Laufzeit, mögliche Verluste und spätere Steuerfolgen dazu. Zwei Beispielrechnungen sollten denselben eigenen Sparbetrag und vergleichbare Annahmen verwenden.' },
        ],
      },
      {
        id: 'reserve',
        heading: 'Trenne Geld für Überraschungen von Geld für die Rente',
        blocks: [
          { type: 'paragraph', text: 'Wenn die Waschmaschine ausfällt oder dein Einkommen vorübergehend sinkt, hilft eine erreichbare Reserve. Ein geförderter Altersvorsorgevertrag ist dafür grundsätzlich nicht gedacht. Aber auch ein Aktien-ETF im freien Depot ersetzt nicht automatisch eine Reserve: Ausgerechnet bei einem kurzfristigen Bedarf könnten die Kurse niedrig sein. Verfügbarkeit und Wertschwankung musst du gemeinsam beurteilen.' },
          { type: 'paragraph', text: 'Du musst deine gesamte Vorsorge nicht in einen einzigen Weg legen. Unterschiedliche Geldtöpfe können unterschiedliche Aufgaben haben. Ob und in welchem Verhältnis du geförderte Altersvorsorge und freie Anlage kombinierst, erfordert jedoch eine persönliche Betrachtung. Entscheidend ist, dass du einen Beitrag langfristig tragen kannst und deine kurz- und mittelfristigen Ausgaben berücksichtigt hast.' },
        ],
      },
      {
        id: 'checkliste',
        heading: 'So gehst du in einen sinnvollen Vergleich',
        blocks: [
          { type: 'list', items: [
            'Notiere, welcher Teil des Geldes ausdrücklich bis zur Rente gedacht ist.',
            'Prüfe deine Förderberechtigung und rechne mit deinem tatsächlichen Beitrag.',
            'Vergleiche alle Kosten statt nur die Gebühren des ausgewählten ETFs.',
            'Berücksichtige den Zugriff vor der Rente und die späteren Auszahlungsregeln.',
            'Lass dir Annahmen und steuerliche Grenzen jeder Beispielrechnung erklären.',
          ] },
          { type: 'paragraph', text: 'Das Webinar hilft dir, diese Unterschiede zu verstehen. Eine Empfehlung für eine bestimmte Anlage oder die Aufteilung deines Vermögens ergibt sich daraus noch nicht. Diese Entscheidung braucht deine vollständige Situation und konkrete Produktunterlagen.' },
        ],
      },
    ],
    faqs: [
      { question: 'Ist ein Altersvorsorgedepot automatisch ein ETF-Sparplan?', answer: 'Nein. Es ist ein geförderter Vertragsrahmen, in dem geeignete Anlagen genutzt werden können. Welche Fonds oder ETFs angeboten werden, hängt vom konkreten Produkt ab.' },
      { question: 'Macht die Zulage das Verlustrisiko wett?', answer: 'Die Zulage ist keine Garantie gegen Anlageverluste. Ob sie einen Rückgang des Vermögens rechnerisch ausgleicht, hängt vom Verlauf der Anlage, den Beiträgen und den Kosten ab und lässt sich nicht versprechen.' },
      { question: 'Kann ich beide Wege nebeneinander nutzen?', answer: 'Grundsätzlich kannst du verschiedene Sparwege kombinieren. Welche Beiträge tragbar sind und welche Aufgabe jeder Geldtopf erfüllt, solltest du vor einer Entscheidung klären.' },
    ],
    sourceIds: ['gesetz', 'regierung'],
    relatedSlugs: ['altersvorsorgedepot-geld-entnehmen', 'altersvorsorgedepot-foerderung'],
  });
