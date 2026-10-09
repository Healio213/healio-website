import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-heilpraktiker',
    cluster: 'selbststaendige',
    audience: 'selbststaendige',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot für Heilpraktiker | Healio',
    metaDescription: 'Altersvorsorge für Heilpraktiker ab 2027: Förderberechtigung, Praxisreserve und vorhandene Rentenansprüche prüfen, bevor du einen langfristigen Beitrag wählst.',
    headline: 'Altersvorsorgedepot für Heilpraktiker: Was passt neben die Praxis?',
    lead: 'Eine gut laufende Praxis ist noch kein vollständiger Plan für deine spätere Rente. Ab 2027 kann die neue Förderung für Selbstständige ein weiterer Baustein sein. Für Heilpraktiker lohnt sich zuerst die Trennung von drei Aufgaben: Die Praxis muss liquide bleiben, vorhandene Altersversorgung muss bekannt sein und ein privater Vorsorgebeitrag muss dauerhaft in den Haushalt passen.',
    listTeaser: 'Die Praxis und die private Rente getrennt planen, mit einer Checkliste für Förderstatus, Reserven und vorhandene Vorsorge.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Heilpraktiker können unter den neuen Voraussetzungen für Selbstständige förderberechtigt sein. Die Berufsbezeichnung allein genügt nicht.',
          'Maßgeblich sind insbesondere Alter unter 67, einschlägige Einkünfte im Beitragsjahr und die abgegebene Steuererklärung für dieses Jahr.',
          'Die Reserve für Miete, Personal, Steuern und Ausfälle gehört nicht in einen langfristig gebundenen Altersvorsorgevertrag.',
          'Ein neuer Beitrag ergänzt einen Vorsorgeplan. Er ersetzt keine Bestandsaufnahme deiner bisherigen Rentenansprüche und Absicherungen.',
        ] },
      ] },
      { id: 'foerderstatus', heading: 'Kannst du die neue Förderung nutzen?', blocks: [
        { type: 'paragraph', text: 'Die Reform bezieht neue Selbstständige mit Einkünften nach § 15 oder § 18 Absatz 1 Nummer 1 bis 3 EStG ein, solange sie das 67. Lebensjahr noch nicht vollendet und die Steuererklärung für das Beitragsjahr abgegeben haben. Eine heilpraktische Tätigkeit kann unter den steuerlichen Regeln für selbstständige Arbeit fallen. Entscheidend bleibt die tatsächliche Einordnung deiner Tätigkeit und Einkünfte.' },
        { type: 'paragraph', text: 'Bei einer gemischten Tätigkeit können mehrere Bereiche zusammentreffen: zum Beispiel Praxisarbeit, Verkauf und eine zusätzliche Anstellung. Gib alle wesentlichen Bestandteile an. Ein Angestelltenstatus mit Pflichtbeiträgen kann bereits eine Berechtigungsgrundlage schaffen. Gehe umgekehrt nicht davon aus, dass allein die Erlaubnis als Heilpraktiker jedes Jahr den neuen Förderstatus beweist.' },
      ] },
      { id: 'drei-toepfe', heading: 'Drei Geldtöpfe mit unterschiedlichen Aufgaben', blocks: [
        { type: 'table', caption: 'Praxis und private Vorsorge getrennt planen', head: ['Topf', 'Typische Aufgabe', 'Planungsfrage'], rows: [
          ['Praxisreserve', 'Miete, Personal, Material, Steuern und Ausfälle', 'Wie lange trägt die Praxis ihre festen Verpflichtungen?'],
          ['Private Reserve', 'Haushalt, Familie und ungeplante private Ausgaben', 'Welcher Betrag muss kurzfristig erreichbar bleiben?'],
          ['Langfristige Altersvorsorge', 'Einkommen im späteren Ruhestand', 'Welcher Beitrag ist über viele Jahre entbehrlich?'],
        ], note: 'Die Aufteilung ist eine Planungshilfe, keine steuerliche Buchungsvorgabe und keine Empfehlung für ein bestimmtes Anlageprodukt.' },
        { type: 'paragraph', text: 'Denke bei der Praxisreserve auch an eine vorübergehende Erkrankung oder einen schwächeren Buchungsmonat. Eine Altersvorsorgezulage überweist dir kein Geld für offene Rechnungen. Bei schädlicher vorzeitiger Verwendung geförderter Beiträge können Zulagen und Steuervorteile zurückzuzahlen sein. Deshalb sollte die langfristige Rate aus einem Betrag entstehen, der nach beiden Reserven übrig bleibt.' },
      ] },
      { id: 'bestand', heading: 'Welche Vorsorge hast du bereits?', blocks: [
        { type: 'paragraph', text: 'Sammle zuerst Renteninformationen und bestehende private Vorsorgeunterlagen. Dazu gehören gesetzliche Ansprüche aus früheren Anstellungen, mögliche laufende Pflichtbeiträge, Basisrenten, Riester-Verträge und andere Sparformen. Erfasse für jeden Baustein Beitrag, Kosten, Beginn der Auszahlung und die Art der späteren Leistung. Unterscheide dabei garantiert vereinbarte Leistungen von unverbindlichen Hochrechnungen.' },
        { type: 'paragraph', text: 'Eine mögliche spätere Übergabe oder Veräußerung der Praxis kann in deinem Gesamtplan eine Rolle spielen. Ein Verkaufspreis ist jedoch erst dann verlässlich, wenn entsprechende Tatsachen vorliegen. Plane die persönliche Rente daher nicht allein mit einem erhofften Praxiswert. Prüfe auch, wie sich ein früherer Rückzug aus der Arbeit auf das laufende Einkommen und die Beiträge auswirken würde.' },
      ] },
      { id: 'beispiel', heading: 'Eine Förderrechnung als Ausgangspunkt', blocks: [
        { type: 'paragraph', text: 'Beispiel: Eine unmittelbar berechtigte Heilpraktikerin unter 67 plant im neuen System 50 EUR Monatsbeitrag. Bei zwölf Zahlungen sind das 600 EUR im Jahr. Daraus ergeben sich 180 EUR Grundzulage auf die ersten 360 EUR und 60 EUR auf die übrigen 240 EUR, zusammen 240 EUR. Bei 150 EUR monatlich würden 1.800 EUR Eigenbeitrag die maximale Grundzulage von 540 EUR ergeben.' },
        { type: 'paragraph', text: 'Welche Rate besser passt, entscheidet der verfügbare Betrag nach Kosten, Steuern und Reserven. Die Förderung allein macht aus 50 oder 150 EUR noch keine ausreichende Altersversorgung. Die Höhe deiner späteren Rente hängt von weiteren Bausteinen, der Ansparzeit, den Kosten und der Wertentwicklung ab. Bei einem Depot ohne Garantie sind Wertverluste möglich; eine Beitragsgarantie kann wiederum Renditechancen begrenzen.' },
      ] },
      { id: 'checkvorbereitung', heading: 'So bereitest du einen Vorsorge-Check für deine Praxis vor', blocks: [
        { type: 'list', ordered: true, items: [
          'Einen konservativen privaten Beitragsrahmen aus echten Einnahmen und Verpflichtungen ableiten.',
          'Einkunftsart, Alter und die Steuererklärung für das Beitragsjahr zur Prüfung des Förderstatus vorbereiten.',
          'Bestehende Renten- und Versicherungsunterlagen mit Beitrag, Kosten und Auszahlungsdaten zusammentragen.',
          'Kindergeld und Zuordnung klären, falls Kinderzulagen in die Rechnung eingehen sollen.',
          'Vor einem Abschluss Garantieoption, Effektivkosten, Vergütung und Bedingungen für Beitragsänderungen vergleichen.',
        ] },
        { type: 'paragraph', text: 'Healio begleitet die Versicherungsvarianten und macht die Vergütung über die Vertragskosten vor dem Abschluss nachvollziehbar. Ein guter Startplan zeigt dir sowohl die Förderung als auch den verbleibenden eigenen Beitrag und die offenen Entscheidungen. Die steuerliche Einordnung deiner Praxis und individuelle Steuerfragen klärst du mit deiner Steuerberatung.' },
      ] },
    ],
    faqs: [
      { question: 'Reicht meine Heilpraktikererlaubnis als Fördernachweis?', answer: 'Nein. Für den neuen Zugang kommt es unter anderem auf die tatsächliche Einkunftsart, das Alter und die abgegebene Steuererklärung des Beitragsjahres an. Eine Berufsbezeichnung allein begründet keinen Anspruch.' },
      { question: 'Kann meine Praxisreserve gleichzeitig im Altersvorsorgedepot liegen?', answer: 'Das würde kurzfristigen Geldbedarf mit langfristiger Bindung vermischen. Gefördertes Vorsorgegeld ist grundsätzlich für die spätere Auszahlung bestimmt. Eine schädliche Entnahme kann zur Rückzahlung von Förderung führen.' },
      { question: 'Ist das Altersvorsorgedepot für Heilpraktiker immer besser als eine Basisrente?', answer: 'Das lässt sich nicht pauschal entscheiden. Förderberechtigung, heutige und spätere Steuerwirkung, verfügbare Liquidität, Kosten und gewünschte Auszahlung müssen zusammen verglichen werden.' },
    ],
    sourceIds: ['gesetz', 'bmf', 'estg10'],
    relatedSlugs: ['altersvorsorgedepot-selbststaendige', 'altersvorsorgedepot-oder-ruerup'],
  });
