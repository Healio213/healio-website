import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-foerderung',
    cluster: 'grundlagen',
    audience: 'standard',
    nextStep: 'calculator',
    metaTitle: 'Altersvorsorgedepot: Förderung mit Beispielen',
    metaDescription: '10, 25, 30 oder 150 EUR monatlich: So berechnen sich Grundzulage und Kinderzulage ab 2027. Voraussetzungen, Höchstbeträge und Geldbindung.',
    headline: 'Altersvorsorgedepot: Wie viel Förderung bekommst du?',
    lead: 'Im neuen Fördersystem erhältst du 50 Cent Grundzulage je Eigenbeitrags-Euro bis 360 EUR im Jahr und 25 Cent für den weiteren Beitrag bis 1.800 EUR. Das ergibt höchstens 540 EUR Grundzulage jährlich. Für zugeordnete zulagenberechtigte Kinder kommen bis zu 300 EUR je Kind hinzu. Voraussetzung sind Förderberechtigung und mindestens 120 EUR Eigenbeitrag im Jahr.',
    listTeaser: 'Die Zulagenrechnung mit vier Beiträgen und einem klar abgegrenzten Familienbeispiel.',
    sections: [
      {
        id: 'grundzulage-rechnen',
        heading: 'Die Grundzulage besteht aus zwei Beitragsstufen',
        blocks: [
          { type: 'paragraph', text: 'Bis zu einem Jahresbeitrag von 360 EUR beträgt die Grundzulage die Hälfte deiner eigenen Einzahlung. Auf weitere Eigenbeiträge bis zur Jahresgrenze von 1.800 EUR kommen jeweils 25 Prozent. Die Höchstzulage berechnet sich deshalb aus 180 EUR für die erste Stufe und 360 EUR für die zweite Stufe. Zusammen sind das 540 EUR.' },
          { type: 'paragraph', text: 'Die Rechnung betrifft unmittelbar Förderberechtigte. Mittelbar berechtigte Ehepartner haben eigene Regeln; ihre Grundzulage ist auf 175 EUR begrenzt und orientiert sich an den Beiträgen des unmittelbar Berechtigten. Du darfst deshalb eine Standardrechnung nicht unverändert auf beide Partner übertragen. Auch die Kinderzulage wird nicht gleichzeitig an beide Eltern für dasselbe Kind gezahlt.' },
        ],
      },
      {
        id: 'vier-beitragsbeispiele',
        heading: 'Was 10, 25, 30 oder 150 EUR monatlich bewirken',
        blocks: [
          { type: 'table', caption: 'Beispiele für ein volles Beitragsjahr im neuen System', head: ['Eigenbeitrag im Monat', 'Eigenbeitrag im Jahr', 'Grundzulage im Jahr', 'Mit zwei zugeordneten zulagenberechtigten Kindern insgesamt'], rows: [
            ['10 EUR', '120 EUR', '60 EUR', '300 EUR'],
            ['25 EUR', '300 EUR', '150 EUR', '750 EUR'],
            ['30 EUR', '360 EUR', '180 EUR', '780 EUR'],
            ['150 EUR', '1.800 EUR', '540 EUR', '1.140 EUR'],
          ], note: 'Beispiele bei unmittelbarer Förderberechtigung; zwölf Monatsbeiträge, kein Berufseinsteigerbonus und keine zusätzliche Steuerermäßigung. Die letzte Spalte enthält Grund- und Kinderzulagen zusammen.' },
          { type: 'paragraph', text: 'Die Zahlen sind Jahresbeträge, die in den Vorsorgevertrag fließen. Diese Beträge sind kein monatlich ausgezahltes Haushaltsgeld. Ein Beitrag von 25 EUR im Monat ergibt im Beispiel 300 EUR Eigenbeitrag und 750 EUR Zulagen. Damit gehen zusammen 1.050 EUR in den Vertrag, bevor Kosten und Wertentwicklung berücksichtigt werden. Der spätere Depotwert kann davon abweichen.' },
        ],
      },
      {
        id: 'kinderzulage-verstehen',
        heading: 'Die Kinderzulage wird je Kind gerechnet',
        blocks: [
          { type: 'paragraph', text: 'Für jedes zugeordnete zulagenberechtigte Kind erhältst du 100 Prozent deines Eigenbeitrags, höchstens 300 EUR jährlich. Bei 120 EUR Eigenbeitrag sind das 120 EUR je Kind. Bei 300 EUR sind es 300 EUR je Kind. Zwei Kinder erfordern für die volle Kinderzulage also nicht automatisch 600 EUR Eigenbeitrag. Derselbe eigene Jahresbeitrag wird für jedes berechtigte Kind zugrunde gelegt.' },
          { type: 'paragraph', text: 'Entscheidend sind Kindergeldberechtigung und die gesetzliche Zuordnung der Kinderzulage. Das Alter des Kindes allein genügt nicht. Für 2027 und ab 2028 unterscheiden sich die Zuordnungsregeln bei verheirateten Eltern. Kläre deshalb für das konkrete Beitragsjahr, welcher Elternteil die Zulage erhält. Die Kinderzulage fließt in die Altersvorsorge dieses Elternteils und ist kein eigenes Kinderdepot.' },
        ],
      },
      {
        id: 'bonus-steuern-grenzen',
        heading: 'Bonus, Steuerprüfung und Einzahlungshöchstbetrag getrennt betrachten',
        blocks: [
          { type: 'paragraph', text: 'Unmittelbar Berechtigte, die zu Beginn des Beitragsjahres unter 25 sind, können einen einmaligen Berufseinsteigerbonus von 200 EUR erhalten. Er ist keine jährlich wiederkehrende Zusatzförderung. Prüfe, ob die Voraussetzungen erfüllt sind und ob der Bonus bereits genutzt wurde, bevor du ihn in eine Rechnung einbeziehst.' },
          { type: 'paragraph', text: 'Daneben kann das Finanzamt über die Günstigerprüfung eine zusätzliche Steuerermäßigung feststellen. Der Sonderausgabenrahmen beträgt 1.800 EUR zuzüglich Zulagenanspruch. Die Steuerermäßigung wird nicht pauschal zur Zulage addiert; sie hängt von der persönlichen Steuerlage ab. Einzahlungen bis 6.840 EUR im Jahr sind möglich, erhöhen die Zulage oberhalb von 1.800 EUR aber nicht weiter.' },
        ],
      },
      {
        id: 'foerderung-ist-keine-rendite',
        heading: 'Eine hohe Förderquote ist noch keine gute Gesamtentscheidung',
        blocks: [
          { type: 'paragraph', text: 'Wenn du Zulagen durch Eigenbeitrag teilst, erhältst du eine Förderquote. Die Förderquote ist keine jährliche Anlagerendite. Die Zulage gehört zur Einzahlung, während Rendite die Entwicklung des angelegten Geldes beschreibt. Kosten und schwankende Kurse können das Ergebnis beeinflussen. Beim Depot gibt es keine Beitragsgarantie.' },
          { type: 'paragraph', text: 'Plane deshalb zuerst einen tragbaren Beitrag und ausreichende verfügbare Rücklagen. Das geförderte Guthaben ist grundsätzlich für die Rente gebunden. Eine vorzeitige Auszahlung kann zur Rückforderung der Förderung führen; spätere geförderte Leistungen werden nachgelagert besteuert. Nutze die Zulagenrechnung als Einstieg und prüfe anschließend das konkrete Angebot mit Kosten, Risiko und Auszahlung.' },
        ],
      },
    ],
    faqs: [
      { question: 'Warum bekomme ich mit 30 EUR im Monat nicht 540 EUR?', answer: '30 EUR monatlich ergeben 360 EUR jährlich. Darauf beträgt die Grundzulage 50 Prozent, also 180 EUR. Die Höchstgrundzulage von 540 EUR setzt 1.800 EUR eigenen Jahresbeitrag voraus.' },
      { question: 'Bekomme ich mit zwei Kindern immer 750 EUR?', answer: 'Nein. Das Beispiel setzt 300 EUR Eigenbeitrag, unmittelbare Förderberechtigung und zwei dir zugeordnete zulagenberechtigte Kinder voraus. Andere Beiträge oder eine andere Zuordnung verändern das Ergebnis.' },
      { question: 'Ist die Zulage Geld, das ich sofort ausgeben kann?', answer: 'Nein. Die Zulage wird dem Vorsorgevertrag gutgeschrieben und bleibt grundsätzlich für die Altersvorsorge gebunden. Eine mögliche zusätzliche Steuerermäßigung ist davon zu unterscheiden.' },
    ],
    sourceIds: ['regierung', 'gesetz', 'bmf', 'zfa', 'rv84'],
    relatedSlugs: ['altersvorsorgedepot-kinderzulage', 'altersvorsorgedepot-wer-ist-berechtigt'],
  });
