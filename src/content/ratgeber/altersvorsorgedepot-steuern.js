import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-steuern',
    cluster: 'entscheidung',
    audience: 'standard',
    nextStep: 'calculator',
    updatedAt: '2026-10-27',
    updatedAtLabel: '27. Oktober 2026',
    metaTitle: 'Altersvorsorgedepot 2027: Steuern und Auszahlung | Healio',
    metaDescription: 'Was du beim Altersvorsorgedepot absetzen kannst, wie Zulagen angerechnet werden und was bei der Auszahlung gilt. Mit Steuerbeispiel und Rechner.',
    headline: 'Altersvorsorgedepot und Steuern: Absetzen und Auszahlung ab 2027',
    lead: 'Beim Altersvorsorgedepot werden Erträge im Vertragsrahmen während des Sparens grundsätzlich nicht jährlich bei dir besteuert. Unmittelbar Förderberechtigte können bis zu 1.800 EUR Jahresbeitrag zuzüglich der berücksichtigten Zulagen als Sonderausgaben abziehen. Das Finanzamt verrechnet den Vorteil mit dem Zulageanspruch; nur ein Mehrbetrag bringt eine zusätzliche Steuerermäßigung. Die spätere Auszahlung ist grundsätzlich steuerpflichtig. Hier siehst du die drei Phasen und ein vereinfachtes Rechenbeispiel.',
    listTeaser: 'Zulage, Günstigerprüfung und nachgelagerte Besteuerung verständlich eingeordnet.',
    sections: [
      {
        id: 'phasen',
        heading: 'Der Zeitpunkt der Steuer ist Teil des Konzepts',
        blocks: [
          { type: 'table', caption: 'Die drei Steuerfragen im Überblick', head: ['Phase', 'Was grundsätzlich gilt'], rows: [
            ['Einzahlung', 'Sonderausgabenabzug und Zulage werden über die Günstigerprüfung abgestimmt'],
            ['Erträge beim Sparen', 'Im geförderten Vertragsrahmen keine jährliche Besteuerung der Erträge bei dir'],
            ['Auszahlung', 'Leistungen aus gefördertem Altersvorsorgevermögen werden grundsätzlich nachgelagert besteuert'],
          ], note: 'Geförderte und nicht geförderte Vertragsanteile können unterschiedlich behandelt werden. Die Übersicht ersetzt keine persönliche Steuerberechnung.' },
          { type: 'paragraph', text: 'Die geförderte private Altersvorsorge arbeitet mit nachgelagerter Besteuerung. Das bedeutet vereinfacht: Während des Sparens gelten steuerliche Vorteile, während die späteren Leistungen grundsätzlich steuerlich berücksichtigt werden. Die Aussage, dass Erträge im Vertragsrahmen während der Ansparphase nicht jährlich bei dir besteuert werden, ist deshalb kein Versprechen einer lebenslang steuerfreien Anlage.' },
          { type: 'paragraph', text: 'Für deine Planung zählt das Geld, das du im Alter nach Steuern tatsächlich verwenden kannst. Eine Beispielrechnung mit einer Bruttoauszahlung beantwortet diese Frage noch nicht. Du brauchst dafür unter anderem deine weiteren Einkünfte und die voraussichtliche Auszahlungsform. Diese Größen können sich über Jahrzehnte ändern, weshalb eine heute genannte Nettosumme keine feste Zusage ist.' },
        ],
      },
      {
        id: 'sonderausgaben',
        heading: 'Sonderausgabenabzug und Zulage werden abgestimmt',
        blocks: [
          { type: 'paragraph', text: 'Nach den neuen Regeln können unmittelbar förderberechtigte Personen Altersvorsorgebeiträge bis zu 1.800 EUR im Jahr zuzüglich der dafür zustehenden Zulagen als Sonderausgaben berücksichtigen lassen. Das Finanzamt prüft, ob der daraus entstehende Steuervorteil günstiger ist als die Zulagenförderung. Nur ein darüber hinausgehender Vorteil führt zu einer zusätzlichen Steuerermäßigung. Das ist die Günstigerprüfung. Mittelbar Berechtigte haben keinen eigenen Sonderausgabenabzugsbetrag. Deren Beiträge und Zulagen werden unter den gesetzlichen Voraussetzungen beim unmittelbar berechtigten Ehepartner berücksichtigt.' },
          { type: 'paragraph', text: 'Du solltest also nicht eine Zulage von beispielsweise 540 EUR und einen separat ausgerechneten vollen Abzugsvorteil zusammenzählen. Beide Wege werden verrechnet. Wie das Ergebnis in deinem Fall aussieht, hängt unter anderem von deinem Einkommen und deiner steuerlichen Situation ab. Bei besonderen Fragen, etwa grenzüberschreitenden Fällen oder mehreren Vertragsarten, gehört die konkrete Berechnung in fachkundige Hände.' },
          { type: 'table', caption: 'Vereinfachtes Beispiel mit 150 EUR Monatsbeitrag und angenommenen 30 Prozent Steuersatz', head: ['Rechenschritt', 'Betrag'], rows: [
            ['Eigener Jahresbeitrag', '1.800 EUR'],
            ['Grundzulage im Jahr', '540 EUR'],
            ['Im Beispiel berücksichtigter Sonderausgabenbetrag', '2.340 EUR'],
            ['Rechnerischer Abzugsvorteil bei pauschal 30 Prozent', '702 EUR'],
            ['Abzüglich berücksichtigter Zulage', '540 EUR'],
            ['Möglicher zusätzlicher Steuervorteil im Modell', '162 EUR'],
          ], note: 'Beispiel bei unmittelbarer Förderberechtigung, ohne Kinderzulage und ohne Berufseinsteigerbonus. Ein fester angenommener Satz vereinfacht den Einkommensteuertarif. Das tatsächliche Ergebnis der Günstigerprüfung hängt von deiner gesamten steuerlichen Situation ab.' },
          { type: 'paragraph', text: 'Der einmalige Berufseinsteigerbonus von 200 EUR bleibt bei der steuerlichen Ermittlung des Zulageanspruchs außer Betracht. Das regelt § 10a Absatz 1 Satz 6 EStG. Du darfst ihn deshalb nicht wie eine zusätzliche jährlich anzurechnende Zulage in dieses Steuerbeispiel einsetzen. Für die Depotgutschrift und die Steuerprüfung gelten hier unterschiedliche Rechenschritte.' },
        ],
      },
      {
        id: 'grenzen',
        heading: 'Drei Beträge mit unterschiedlichen Aufgaben',
        blocks: [
          { type: 'table', caption: 'Förder- und Einzahlungsgrenzen nicht verwechseln', head: ['Betrag', 'Bedeutung im neuen System'], rows: [
            ['120 EUR im Jahr', 'Mindesteigenbeitrag für die Grund- und Kinderzulage bei erfüllten Voraussetzungen'],
            ['1.800 EUR im Jahr', 'Bei unmittelbarer Berechtigung: Beitragsgrenze für die maximale Grundzulage; Sonderausgabenrahmen zuzüglich zustehender Zulagen'],
            ['6.840 EUR im Jahr', 'Gesetzliche Grenze eigener Einzahlungen in den neuen Vertragsrahmen, keine entsprechend höhere Grundzulage'],
          ], note: 'Mehr einzahlen bedeutet nicht automatisch mehr Förderung oder einen gleich hohen steuerlichen Abzug.' },
          { type: 'paragraph', text: 'Ein Beispiel: Wer unmittelbar förderberechtigt ist und 1.800 EUR im Jahr einzahlt, erreicht nach der neuen Staffel grundsätzlich die maximale Grundzulage von 540 EUR. Eine darüber hinausgehende Einzahlung erhöht diese Grundzulage nicht. Ob zusätzliche Beiträge sinnvoll sind, lässt sich daraus nicht ablesen. Dafür vergleichst du Kosten, Bindung, Anlage und Alternativen.' },
        ],
      },
      {
        id: 'auszahlung',
        heading: 'Auch eine Auszahlung auf einmal ist steuerlich relevant',
        blocks: [
          { type: 'paragraph', text: 'Bei späteren Leistungen aus gefördertem Altersvorsorgevermögen greift grundsätzlich die nachgelagerte Besteuerung. Das betrifft nicht nur laufende Zahlungen. Auch die mögliche Kapitalauszahlung von bis zu 30 Prozent zu Beginn der Auszahlungsphase ist keine allgemeine steuerfreie Entnahme. Eine größere Einmalzahlung kann deine steuerliche Situation in diesem Jahr verändern.' },
          { type: 'paragraph', text: 'Die genaue Behandlung kann sich unterscheiden, wenn ein Vertrag geförderte und nicht geförderte Bestandteile enthält. Verlang daher eine nachvollziehbare Aufschlüsselung und die entsprechende Leistungsbescheinigung. Rechne bei der Planung nicht pauschal mit der Besteuerung eines gewöhnlichen Wertpapierdepots. Ein geförderter Altersvorsorgevertrag hat einen eigenen steuerlichen Rahmen.' },
        ],
      },
      {
        id: 'vorbereitung',
        heading: 'Was du für eine persönliche Einordnung bereithältst',
        blocks: [
          { type: 'list', items: [
            'Deinen geplanten Jahresbeitrag und Informationen zu möglichen Zulagen.',
            'Eine Übersicht bestehender geförderter Verträge und ihrer Beiträge.',
            'Den letzten Steuerbescheid für eine spätere persönliche Prüfung, ohne ihn öffentlich zu teilen.',
            'Deine Vorstellungen zur späteren Rente, Einmalzahlung und weiteren Einkünften.',
          ] },
          { type: 'paragraph', text: 'Im Zuschuss-Rechner kannst du zuerst deinen Beitrag und die möglichen Zulagen auswählen. Nach deiner Vormerkung lässt sich auch das vereinfachte Steuer- und Depotmodell ansehen. Eine konkrete Steuerberatung ersetzt das nicht. Wenn du anschließend Angebote vergleichst, lass dir zeigen, welche steuerlichen Annahmen in der Rechnung stecken und welche Ergebnisse von deiner persönlichen Situation abhängen.' },
        ],
      },
    ],
    faqs: [
      { question: 'Sind die Erträge im Altersvorsorgedepot für immer steuerfrei?', answer: 'Nein. Die Vorteile in der Ansparphase gehören zu einem System mit nachgelagerter Besteuerung. Die spätere Auszahlung ist grundsätzlich steuerlich relevant.' },
      { question: 'Bekomme ich Zulage und Steuervorteil immer zusätzlich?', answer: 'Das Finanzamt stimmt beide über die Günstigerprüfung ab. Eine zusätzliche Steuerermäßigung entsteht nur, soweit der errechnete Abzugsvorteil die berücksichtigte Zulagenförderung übersteigt.' },
      { question: 'Kann ich 6.840 EUR als Sonderausgaben abziehen?', answer: 'Die mögliche Einzahlung und der Sonderausgabenrahmen sind verschiedene Grenzen. Bei unmittelbarer Berechtigung beträgt der neue Abzugsrahmen grundsätzlich 1.800 EUR an Beiträgen zuzüglich der dafür zustehenden Zulagen.' },
    ],
    sourceIds: ['gesetz', 'rv10a'],
    sourceReviewNote: 'Ergänzend am 27. Oktober 2026 geprüft: Sonderausgabenrahmen, Günstigerprüfung und die Ausnahme für den einmaligen Berufseinsteigerbonus nach § 10a EStG in der Fassung für 2027. Die übrige Quellenbasis bleibt vom 8. Oktober 2026.',
    relatedSlugs: ['altersvorsorgedepot-foerderung', 'altersvorsorgedepot-auszahlung'],
  });
