import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-oder-ruerup',
    cluster: 'selbststaendige',
    audience: 'selbststaendige',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot oder Rürup: Kriterienvergleich | Healio',
    metaDescription: 'Altersvorsorgedepot und Rürup-Basisrente unterscheiden sich bei Förderung, Steuern und Auszahlung. Eine Entscheidungstabelle für Selbstständige ohne Pauschalurteil.',
    headline: 'Altersvorsorgedepot oder Rürup-Rente: Wie vergleichst du die beiden Wege?',
    lead: 'Für Selbstständige kommt ab 2027 ein weiterer geförderter Vorsorgeweg hinzu. Das macht eine vorhandene Rürup-Rente nicht automatisch überflüssig. Die Basisrente und das Altersvorsorgedepot haben unterschiedliche Regeln für Förderung und Auszahlung. Ein sinnvoller Vergleich beginnt mit deinem Budget und Vorsorgeziel, rechnet beide Steuerphasen mit ein und prüft anschließend die konkreten Kosten.',
    listTeaser: 'Zulagen und Sonderausgabenabzug auseinanderhalten, Geldbindung und Auszahlung vergleichen und bestehende Verträge einbeziehen.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Das neue Altersvorsorgedepot kombiniert bei entsprechender Berechtigung einen beitragsabhängigen Zulagenanspruch mit einer steuerlichen Günstigerprüfung.',
          'Bei einer Rürup-Basisrente steht der Sonderausgabenabzug im Rahmen der steuerlichen Regeln für die Basisversorgung im Vordergrund.',
          'Beide Wege binden Geld für das Alter. Diese Wege ersetzen keine zugängliche Reserve für Betrieb und Haushalt.',
          'Die richtige Wahl hängt von Beitragsrahmen, Steuerlage, Kosten und gewünschter späterer Leistung ab. Ein hoher Steuerabzug allein beantwortet sie nicht.',
        ] },
      ] },
      { id: 'vergleich', heading: 'Die wichtigsten Unterschiede nebeneinander', blocks: [
        { type: 'table', caption: 'Kriterien für einen Vergleich, ohne konkretes Anbieterprodukt', head: ['Kriterium', 'Altersvorsorgedepot im neuen System', 'Rürup-Basisrente'], rows: [
          ['Förderung', 'Grundzulage, gegebenenfalls Kinderzulage und zusätzliche Steuerwirkung nach Prüfung', 'Sonderausgabenabzug nach den Regeln der Basisversorgung'],
          ['Berechtigung', 'Bei neuen Selbstständigen unter 67, passende Einkünfte im Beitragsjahr und Steuererklärung prüfen', 'Voraussetzungen des zertifizierten Basisrentenvertrags und steuerliche Abziehbarkeit prüfen'],
          ['Spätere Leistung', 'Je nach Vereinbarung lebenslange Rente oder gesetzlich geregelter Auszahlungsplan', 'Grundsätzlich lebenslange Leibrente'],
          ['Kurzfristige Verfügbarkeit', 'Schädliche Verwendung kann Förderungsrückzahlungen auslösen', 'Grundsätzlich keine freie Kapitalauszahlung'],
          ['Kosten und Risiko', 'Abhängig von Produktweg und Vertrag; Depot ohne Garantie mit Verlustrisiko', 'Abhängig von Vertrag und Anlagegestaltung'],
        ], note: 'Die Tabelle beschreibt die Systeme. Die Eigenschaften eines konkreten Angebots müssen aus dessen Vertragsunterlagen hervorgehen.' },
      ] },
      { id: 'steuer', heading: 'Warum du den Steuerabzug nicht mit Ertrag verwechseln solltest', blocks: [
        { type: 'paragraph', text: 'Ein Sonderausgabenabzug senkt unter den jeweiligen Voraussetzungen dein zu versteuerndes Einkommen. Er ist keine gleich hohe Steuererstattung. Wie viel daraus tatsächlich entsteht, hängt von deiner gesamten Steuerlage ab. Bei der Basisrente gilt außerdem ein gemeinsamer Höchstrahmen für entsprechende Altersvorsorgeaufwendungen; andere Beiträge zur Basisversorgung können ihn mit beanspruchen.' },
        { type: 'paragraph', text: 'Beim neuen Altersvorsorgesystem können bis zu 1.800 EUR Eigenbeitrag zuzüglich Zulageanspruch in die steuerliche Prüfung eingehen. Die Günstigerprüfung berücksichtigt die Zulagen. Du solltest deshalb eine Steuerwirkung nicht unbesehen noch einmal vollständig zu ihnen addieren. Beide Vergleiche müssen auch die spätere Besteuerung der Leistungen betrachten. Die individuelle Berechnung gehört in die Steuerberatung.' },
      ] },
      { id: 'beispiele', heading: 'Zwei verschiedene Ziele führen zu verschiedenen Prüfungen', blocks: [
        { type: 'paragraph', text: 'Beispiel A: Eine unmittelbar berechtigte selbstständige Person mit zwei zugeordneten Kindern kann 25 EUR im Monat dauerhaft beitragen. Im neuen Fördersystem ergeben 300 EUR Eigenbeitrag unter den entsprechenden Voraussetzungen 150 EUR Grundzulage und 600 EUR Kinderzulagen. Die 750 EUR Förderung sind ein konkreter Ausgangspunkt. Danach müssen Kosten, Bindung und der tatsächliche Vorsorgebedarf betrachtet werden.' },
        { type: 'paragraph', text: 'Beispiel B: Eine selbstständige Person ohne Kinder hat bereits eine Basisrente und kann zusätzlich einen größeren Betrag langfristig zurücklegen. Hier sind der schon genutzte steuerliche Höchstrahmen, die tatsächliche Steuerwirkung und die gewünschte lebenslange Versorgung wichtige Vergleichspunkte. Ein kleinerer Vertrag im neuen System kann trotzdem geprüft werden. Aus dem höheren verfügbaren Betrag folgt kein automatischer Vorrang für die Basisrente.' },
      ] },
      { id: 'auszahlung', heading: 'Welche Leistung möchtest du später erhalten?', blocks: [
        { type: 'paragraph', text: 'Die Basisrente nach § 10 EStG dient grundsätzlich einer lebenslangen Leibrente. Eine Rürup-Basisrente lässt sich nicht in ein Altersvorsorgedepot übertragen. Die Ansprüche sind grundsätzlich weder beleihbar noch frei kapitalisierbar. Hinterbliebenenleistungen können innerhalb der gesetzlichen Möglichkeiten vereinbart sein, müssen aber im konkreten Vertrag geprüft werden. Behandle eine vorhandene Basisrente deshalb nicht wie ein frei verfügbares Sparkonto.' },
        { type: 'paragraph', text: 'Im neuen Altersvorsorgesystem können je nach Produkt und Vereinbarung eine lebenslange Rente oder ein gesetzlich geregelter Auszahlungsplan vorgesehen sein. Vergleiche, wann die Leistung beginnt, wie lange sie gezahlt wird und was bei Tod oder Vertragswechsel gilt. Ein angezeigter Kapitalwert allein sagt nicht, welche laufende Zahlung daraus entstehen wird. Kosten der Auszahlungsphase gehören ebenfalls in den Vergleich.' },
      ] },
      { id: 'entscheidung', heading: 'So bereitest du eine belastbare Entscheidung vor', blocks: [
        { type: 'list', ordered: true, items: [
          'Reserve für Betrieb und Haushalt festlegen und erst danach den langfristig verfügbaren Beitrag bestimmen.',
          'Gesetzliche Rentenansprüche und bestehende Basisrenten oder Riester-Verträge mit Beitrag, Kosten und Leistung erfassen.',
          'Neue Förderberechtigung und mögliche Kinderzulagen anhand der tatsächlichen Angaben prüfen.',
          'Mit der Steuerberatung heutige Entlastung und spätere Besteuerung unter nachvollziehbaren Annahmen vergleichen.',
          'Konkrete Angebote bei gleichem Beitragsrahmen nach Effektivkosten, Anlagerisiko, Garantie und Auszahlung beurteilen.',
        ] },
        { type: 'paragraph', text: 'Ändere bestehende Verträge erst, wenn Auswirkungen und Alternativen bekannt sind. Es kann um einen ergänzenden Beitrag gehen, um eine geänderte Verteilung oder um zunächst gar keinen neuen Abschluss. Ein persönlicher Check sollte diese Entscheidung offenlassen und die Vergütung des vermittelten Produkts transparent zeigen.' },
      ] },
    ],
    faqs: [
      { question: 'Ist das Altersvorsorgedepot ab 2027 für Selbstständige immer die bessere Wahl?', answer: 'Nein. Berechtigung, Kinderzulagen, Beitragshöhe, Steuerlage, Kosten und gewünschte Auszahlung ergeben erst zusammen den Vergleich. Eine vorhandene Basisrente wird durch die Reform nicht automatisch ungeeignet.' },
      { question: 'Bekomme ich bei der Basisrente den gesamten Beitrag vom Finanzamt zurück?', answer: 'Nein. Ein zulässiger Sonderausgabenabzug ist keine Erstattung in gleicher Höhe. Die tatsächliche Entlastung hängt von deiner Steuerlage und dem verfügbaren Höchstrahmen ab; auch die spätere Besteuerung gehört dazu.' },
      { question: 'Kann ich eine Basisrente wie ein Depot in Geld auszahlen lassen?', answer: 'Grundsätzlich sieht die steuerlich begünstigte Basisrente eine lebenslange Leibrente und keine frei wählbare Kapitalauszahlung vor. Gesetzliche Sonderfälle und konkrete Hinterbliebenenregelungen müssen gesondert geprüft werden.' },
    ],
    sourceIds: ['gesetz', 'bmf', 'estg10'],
    relatedSlugs: ['altersvorsorgedepot-steuern', 'altersvorsorgedepot-selbststaendige'],
  });
