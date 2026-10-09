import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-garantie',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'webinar',
    metaTitle: 'Altersvorsorgedepot mit oder ohne Garantie? | Healio',
    metaDescription: 'Was bedeuten 80 oder 100 Prozent Beitragsgarantie? Welche Grenzen gelten bei Verlusten, vorzeitigem Wechsel und Kaufkraft? Verständlich erklärt.',
    headline: 'Altersvorsorgedepot mit oder ohne Garantie: Was der Unterschied für dich bedeutet',
    lead: 'Beim neuen Altersvorsorgedepot sind Verluste möglich. Daneben sieht die Reform Produkte mit einer Garantie von 80 oder 100 Prozent der Beiträge einschließlich Zulagen vor. Entscheidend sind der garantierte Betrag, der Zeitpunkt der Zusage und die Frage, welche Schwankungen du während der Laufzeit tragen kannst.',
    listTeaser: 'Was eine Beitragsgarantie abdeckt und warum sie weder Rendite noch Kaufkraft garantiert.',
    sections: [
      {
        id: 'garantieumfang',
        heading: 'Die Zusage betrifft einen bestimmten Zeitpunkt',
        blocks: [
          { type: 'paragraph', text: 'Bei einem Garantieprodukt sagt der Anbieter zu, dass zu Beginn der Auszahlungsphase mindestens der vereinbarte Anteil der eingezahlten Altersvorsorgebeiträge einschließlich Zulagen zur Verfügung steht. Die gesetzlich vorgesehenen Varianten sind 80 und 100 Prozent. Ein Altersvorsorgedepot ohne diese Garantie hat keinen solchen Mindestbetrag. Sein Wert hängt unter anderem von der Entwicklung der Anlagen und den Kosten ab.' },
          { type: 'paragraph', text: 'Die Zusage zum Auszahlungsbeginn bedeutet nicht, dass der Kontostand jeden Tag mindestens diesen Betrag zeigen muss. Auch ein Produkt mit Garantie kann während der Laufzeit anders bewertet sein. Für einen vorzeitigen Wechsel oder eine Kündigung brauchst du deshalb eine gesonderte Auskunft. Verlass dich dabei nicht auf einen Werbesatz, sondern auf die Bedingungen und den konkret geltenden Übertragungswert.' },
        ],
      },
      {
        id: 'beispiel',
        heading: '80 und 100 Prozent an einem einfachen Beispiel',
        blocks: [
          { type: 'paragraph', text: 'Angenommen, bis zur Auszahlung sind insgesamt 20.000 EUR an eigenen Beiträgen und Zulagen eingezahlt worden. Bei einer vereinbarten Garantie von 80 Prozent läge der entsprechende Mindestbetrag bei 16.000 EUR, bei 100 Prozent bei 20.000 EUR. Das ist eine reine Erklärung der Garantiehöhe. Die Erklärung sagt nichts darüber, wie hoch das tatsächliche Vertragsvermögen später sein wird.' },
          { type: 'table', caption: 'Drei Wege im Vergleich', head: ['Weg', 'Mindestzusage zum Auszahlungsbeginn', 'Offene Frage'], rows: [
            ['Depot ohne Garantie', 'Keine Beitragsgarantie', 'Wie viel Schwankung und möglichen Verlust kannst du tragen?'],
            ['80 Prozent Garantie', '80 Prozent der Beiträge einschließlich Zulagen', 'Passt der verbleibende mögliche Fehlbetrag zu deiner Planung?'],
            ['100 Prozent Garantie', '100 Prozent der Beiträge einschließlich Zulagen', 'Wie wirken Kosten und Anlagekonzept auf die Chancen?'],
          ], note: 'Die Zusage ist keine Renditeprognose. Konkrete Bedingungen ergeben sich aus dem Vertrag.' },
        ],
      },
      {
        id: 'kaufkraft',
        heading: 'Ein Eurobetrag garantiert keine spätere Kaufkraft',
        blocks: [
          { type: 'paragraph', text: 'Eine nominale Garantie schützt einen festgelegten Geldbetrag nach den Vertragsbedingungen. Die Garantie verspricht nicht, dass du damit in zwanzig Jahren genauso viel kaufen kannst wie heute. Wenn Preise steigen, verliert ein unveränderter Betrag an Kaufkraft. Deshalb ist die Frage nach der Garantie von der Frage zu trennen, wie du langfristig deinen Lebensunterhalt finanzierst.' },
          { type: 'paragraph', text: 'Auch eine garantierte Beitragssumme garantiert keine bestimmte monatliche Rente und keine positive Rendite. Die spätere Leistung hängt von mehreren Faktoren ab, etwa Kosten, tatsächlicher Wertentwicklung und Auszahlungsform. Achte darauf, welche Angaben im Angebot zugesagt werden und welche lediglich Beispielwerte sind. Nur so vergleichst du Erwartungen mit Erwartungen und Zusagen mit Zusagen.' },
        ],
      },
      {
        id: 'chancen',
        heading: 'Die Garantie ist Teil des Anlagekonzepts',
        blocks: [
          { type: 'paragraph', text: 'Um eine Mindestzusage einzuhalten, muss ein Anbieter seine Anlage und sein Risikomanagement darauf ausrichten. Das kann die Verteilung des Geldes und damit die Renditechancen beeinflussen. Wie stark, lässt sich nicht allein aus dem Wort Garantie ableiten. Vergleiche deshalb Anlageübersicht, Kosten, Garantiebedingungen und Beispielrechnungen gemeinsam. Eine pauschale Aussage, dass eine Variante immer überlegen ist, hilft bei deiner Entscheidung nicht.' },
          { type: 'paragraph', text: 'Deine restliche Altersvorsorge spielt ebenfalls mit. Wer später bestimmte laufende Ausgaben bereits aus anderen lebenslangen Einnahmen deckt, beurteilt Schwankungen möglicherweise anders als jemand, dessen zusätzliche Vorsorge die einzige Ergänzung ist. Ein langer Zeitraum kann mehr Handlungsspielraum bieten, beseitigt aber das Verlustrisiko eines Depots nicht.' },
        ],
      },
      {
        id: 'fragen',
        heading: 'Vier Fragen für deine eigene Abwägung',
        blocks: [
          { type: 'list', items: [
            'Welcher Betrag muss zum geplanten Auszahlungsbeginn nach meiner Vorstellung mindestens da sein?',
            'Wie würde ich reagieren, wenn mein Vertragswert zeitweise deutlich unter meinen Einzahlungen liegt?',
            'Welche lebenslangen Einnahmen und welche freien Rücklagen habe ich zusätzlich?',
            'Habe ich Garantiebedingungen, Kosten und mögliche Folgen eines vorzeitigen Wechsels verstanden?',
          ] },
          { type: 'paragraph', text: 'Nimm deine Antworten zum Webinar oder zum persönlichen Check mit. Dort lässt sich das Prinzip an deinen Fragen erläutern. Eine allgemeine Tabelle trifft noch keine Entscheidung für dich. Die passende Lösung ergibt sich erst aus deiner Situation und aus den später tatsächlich vorliegenden Angeboten.' },
        ],
      },
    ],
    faqs: [
      { question: 'Kann ein Altersvorsorgedepot ohne Garantie Verluste machen?', answer: 'Ja. Wertpapiere schwanken, und zum Auszahlungsbeginn kann weniger als die Summe der Beiträge und Zulagen vorhanden sein. Die staatliche Förderung beseitigt das Anlagerisiko nicht.' },
      { question: 'Bezieht sich die Garantie auch auf die Zulagen?', answer: 'Bei den vorgesehenen Garantieprodukten wird der Mindestbetrag aus den eingezahlten Altersvorsorgebeiträgen einschließlich Altersvorsorgezulagen berechnet. Maßgeblich sind Garantiehöhe und Vertragsbedingungen zum Auszahlungsbeginn.' },
      { question: 'Sind 100 Prozent Garantie automatisch die beste Wahl?', answer: 'Das lässt sich allgemein nicht entscheiden. Prüfe deine Risikotragfähigkeit, die Kosten und das Anlagekonzept. Eine nominale Beitragssumme ist kein Versprechen für Rendite, Kaufkraft oder eine bestimmte monatliche Auszahlung.' },
    ],
    sourceIds: ['gesetz'],
    relatedSlugs: ['altersvorsorgedepot-kosten', 'altersvorsorgedepot-passt-das-zu-mir'],
  });
