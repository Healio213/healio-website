import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-schwankendes-einkommen',
    cluster: 'selbststaendige',
    audience: 'selbststaendige',
    nextStep: 'calculator',
    metaTitle: 'Altersvorsorgedepot bei schwankendem Einkommen | Healio',
    metaDescription: 'Ein konkreter Beitragsplan für Selbstständige mit wechselnden Einnahmen: Jahresbudget, Reserve, Förderrechnung und Vertragsbedingungen getrennt prüfen.',
    headline: 'Schwankendes Einkommen: Wie planst du den Beitrag fürs Altersvorsorgedepot?',
    lead: 'Ein guter Umsatzmonat kann eine hohe Sparrate verlockend aussehen lassen. Drei Monate später fehlt das Geld vielleicht für Steuern oder eine Anschaffung. Für Selbstständige mit wechselnden Einnahmen ist deshalb ein tragbarer Jahresplan hilfreicher als eine Rate aus dem besten Monat. Die Zulage lässt sich danach berechnen; ob der Vertrag deine gewünschte Zahlungsweise erlaubt, prüfst du gesondert.',
    listTeaser: 'Mit Basisbetrag, Reserve und kontrolliertem Jahresbeitrag planen, mit Prüfung der Sonderzahlungsregeln und der Folgen einer Beitragspause.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Plane mit dem nach Kosten und Steuern verfügbaren Geld. Umsatz ist kein Vorsorgebudget.',
          'Die neue Grundzulage richtet sich bei unmittelbarer Berechtigung nach dem Eigenbeitrag im Jahr, nicht nach einer festen Höhe des Vorjahreseinkommens.',
          '120 EUR Jahresbeitrag sind für die neue Zulage erforderlich. Ob ein Anbieter unregelmäßige Zahlungen akzeptiert, steht im Vertrag.',
          'Geld für saisonale Lücken und betriebliche Rechnungen sollte außerhalb der langfristig gebundenen Altersvorsorge bleiben.',
        ] },
      ] },
      { id: 'jahresbudget', heading: 'Wie viel bleibt auch in einem schwächeren Jahr übrig?', blocks: [
        { type: 'paragraph', text: 'Schau auf die letzten zwölf Monate und trenne Einnahmen von dem Betrag, den du privat tatsächlich nutzen kannst. Betriebsausgaben, Steuerzahlungen und Krankenversicherung kommen vor der freiwilligen Sparrate. Liste außerdem unregelmäßige Kosten wie Fortbildung, Wartung, Jahresbeiträge und Urlaub auf. Eine Jahresdurchschnittszahl allein übersieht, dass mehrere Rechnungen im selben schwachen Monat fällig sein können.' },
        { type: 'paragraph', text: 'Lege einen konservativen Basisbetrag fest, den du auch bei weniger Aufträgen tragen könntest. Prüfe zusätzlich einen besseren Jahresverlauf, aber behandle ihn als Planungsfall. Ein Anteil guter Monate kann zunächst auf einem getrennten Reservekonto bleiben. Erst nach Abgleich mit den bekannten Verpflichtungen entscheidest du, ob davon ein weiterer Vorsorgebeitrag entbehrlich ist.' },
      ] },
      { id: 'planbeispiel', heading: 'Ein Beitragsplan mit zwei möglichen Jahresverläufen', blocks: [
        { type: 'paragraph', text: 'Beispiel ohne Kinderzulage: Eine unmittelbar berechtigte Person setzt für ihre Budgetplanung 25 EUR monatlich an. Das ergibt 300 EUR eigenen Jahresbeitrag und 150 EUR Grundzulage. In einem besseren Jahr könnte sie nach allen Rücklagen weitere 600 EUR beitragen. Bei insgesamt 900 EUR beträgt die Grundzulage 180 EUR auf die ersten 360 EUR plus 135 EUR auf die restlichen 540 EUR, also 315 EUR.' },
        { type: 'table', caption: 'Rechenbeispiele für unterschiedliche tatsächlich geleistete Jahresbeiträge', head: ['Planungsfall', 'Eigener Jahresbeitrag', 'Grundzulage', 'Was bleibt zu klären?'], rows: [
          ['Kleiner Basisbeitrag', '300 EUR', '150 EUR', 'Passt die Rate auch in schwachen Monaten?'],
          ['Basis und zusätzlicher Betrag', '900 EUR', '315 EUR', 'Sind Sonderzahlung und rechtzeitige Zuordnung möglich?'],
          ['Maximal geförderter Eigenbeitrag', '1.800 EUR', '540 EUR', 'Bleibt genug Liquidität außerhalb des Vertrags?'],
        ], note: 'Neues Fördersystem und unmittelbare Berechtigung vorausgesetzt. Die Zahlungsformen sind Planungsbeispiele, keine zugesagten Anbieteroptionen.' },
      ] },
      { id: 'vertrag', heading: 'Diese Zahlungsregeln musst du beim Anbieter erfragen', blocks: [
        { type: 'list', items: [
          { lead: 'Änderung der laufenden Rate.', text: 'Welche Frist gilt, ab welchem Betrag kann reduziert werden und entstehen dadurch andere Kosten?' },
          { lead: 'Zusätzliche Beiträge.', text: 'Sind Einmalzahlungen möglich, welcher Mindestbetrag gilt und bis wann müssen sie für das gewünschte Beitragsjahr eingehen?' },
          { lead: 'Pausen.', text: 'Du kannst den Vertrag bis zum Auszahlungsbeginn ruhen lassen. Wie beantragst du das, welche Kosten laufen weiter und was bedeutet es für Zusatzbausteine?' },
          { lead: 'Wiederaufnahme.', text: 'Welche Voraussetzungen gelten für einen späteren Neustart, und verändert sich die Vereinbarung?' },
        ] },
        { type: 'paragraph', text: 'Die Antworten gehören vor der Entscheidung schriftlich in deine Unterlagen. Ein allgemeiner Satz wie „Du bleibst flexibel“ beschreibt diese Bedingungen nicht ausreichend. Wenn du unbedingt unregelmäßig zahlen musst, ist die tatsächliche Zahlungsvereinbarung ein Auswahlkriterium neben den Kosten und der Anlagegestaltung.' },
      ] },
      { id: 'schwaches-jahr', heading: 'Was tun, wenn der geplante Beitrag nicht mehr passt?', blocks: [
        { type: 'paragraph', text: 'Rechne zuerst deinen voraussichtlichen Jahresbeitrag aus den bereits gezahlten und noch tragbaren Beträgen. Unter 120 EUR fehlt im neuen System die erforderliche Mindestzahlung für die Zulagen. Erreichst du die Grenze, folgt die Grundzulage dem tatsächlichen Beitrag. Die größte mögliche Zulage ist kein Grund, wegen laufender Verpflichtungen einen teuren Kredit aufzunehmen.' },
        { type: 'paragraph', text: 'Klär mit dem Anbieter die verfügbaren Änderungen, bevor eine Lastschrift ausfällt. Auch eine Pause ist wirtschaftlich zu prüfen: Kosten können weiterlaufen, Förderung verändert sich und der spätere Vorsorgebetrag wird kleiner. Eine Entnahme aus dem geförderten Vertrag ist keine gewöhnliche Zwischenfinanzierung; schädliche Verwendung kann zur Rückzahlung der Förderung führen.' },
      ] },
      { id: 'routine', heading: 'Eine einfache Quartalsroutine für deinen Plan', blocks: [
        { type: 'paragraph', text: 'Prüfe alle drei Monate drei Zahlen: deine liquide Reserve, die bis Jahresende erwarteten Verpflichtungen und den bisherigen Vorsorgebeitrag. Im Herbst kannst du den Jahresfall rechnen und die Anbieterfristen für zusätzliche Beiträge prüfen. Nutze dafür echte Einnahmen und belegte Ausgaben, keine erhofften Aufträge. Prüfe zugleich, ob die Berechtigungsgrundlage weiter vorliegt und die Steuererklärung für das Beitragsjahr eingeplant ist.' },
        { type: 'paragraph', text: 'Der Plan soll die Altersvorsorge über viele Jahre tragbar machen. Höhere Zulagen können ein Beitrag dazu sein, ersetzen aber weder ausreichend angespartes Vermögen noch die Betrachtung von Vertragskosten und Anlagerisiko. Ein persönlicher Check ist besonders hilfreich, wenn du schon andere Vorsorgeverträge hast und einen weiteren Beitrag darin einordnen möchtest.' },
      ] },
    ],
    faqs: [
      { question: 'Kann ich nur in guten Monaten einzahlen?', answer: 'Die Förderung wird auf Jahresbasis berechnet. Ob dein Vertrag Zahlungen nur in einzelnen Monaten oder zusätzliche Beiträge erlaubt, musst du beim Anbieter klären. Aus der gesetzlichen Jahresrechnung folgt keine bestimmte Zahlungsvereinbarung.' },
      { question: 'Was passiert bei weniger als 120 EUR Jahresbeitrag?', answer: 'Im neuen System wird der erforderliche Mindesteigenbeitrag dann nicht erreicht. Grundzulage und Kinderzulage werden unter dieser Grenze nicht gewährt. Berechtigung und tatsächlich geleistete Beiträge müssen trotzdem zusammen geprüft werden.' },
      { question: 'Sollte ich ein schwaches Jahr durch eine Entnahme ausgleichen?', answer: 'Gefördertes Altersvorsorgegeld ist grundsätzlich für die spätere Auszahlung bestimmt. Eine schädliche Entnahme kann Förderungsrückzahlungen auslösen. Plane saisonale Engpässe über eine zugängliche Reserve außerhalb des Vertrags.' },
    ],
    sourceIds: ['gesetz', 'bmf'],
    relatedSlugs: ['altersvorsorgedepot-selbststaendige', 'altersvorsorgedepot-kosten'],
  });
