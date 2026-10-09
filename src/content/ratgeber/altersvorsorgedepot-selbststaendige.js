import { makeAltersvorsorgeArticle } from './altersvorsorge/shared.js';

export const article = makeAltersvorsorgeArticle({
    slug: 'altersvorsorgedepot-selbststaendige',
    cluster: 'selbststaendige',
    audience: 'selbststaendige',
    nextStep: 'check',
    metaTitle: 'Altersvorsorgedepot für Selbstständige ab 2027 | Healio',
    metaDescription: 'Welche Selbstständigen ab 2027 förderberechtigt sind: Alter, Einkunftsart, Steuererklärung und Beitrag prüfen, bevor du mit bis zu 540 EUR Zulage planst.',
    headline: 'Altersvorsorgedepot für Selbstständige: Wer bekommt ab 2027 eine Zulage?',
    lead: 'Die Reform öffnet die geförderte private Altersvorsorge für weitere Selbstständige. „Ich bin selbstständig“ ist trotzdem noch kein vollständiger Fördernachweis. Für die neue Berechtigung kommt es auf Alter, Einkunftsart und die abgegebene Steuererklärung für das Beitragsjahr an. Wenn diese Grundlage passt, kannst du die Förderung mit einem tragbaren Jahresbeitrag berechnen.',
    listTeaser: 'Die neuen Voraussetzungen verständlich prüfen und zwischen betrieblicher Reserve, Altersvorsorgebeitrag und Zulage unterscheiden.',
    sections: [
      { id: 'kurz-gesagt', heading: 'Kurz gesagt', blocks: [
        { type: 'list', items: [
          'Die neue Berechtigung betrifft Selbstständige unter 67 mit Einkünften nach § 15 oder § 18 Absatz 1 Nummer 1 bis 3 EStG im Beitragsjahr und abgegebener Steuererklärung für dieses Jahr.',
          'Die Berufsbezeichnung allein genügt nicht. Die tatsächliche steuerliche Einordnung deiner Einkünfte ist entscheidend.',
          'Für die neue Zulagenförderung sind mindestens 120 EUR Eigenbeitrag im Jahr erforderlich. Die Grundzulage steigt mit dem Beitrag auf höchstens 540 EUR.',
          'Betriebsreserve und langfristiger Vorsorgebeitrag brauchen getrennte Töpfe. Die Förderung ist kein verfügbares Betriebseinkommen.',
        ] },
      ] },
      { id: 'berechtigung', heading: 'Die drei Voraussetzungen für den neuen Zugang', blocks: [
        { type: 'paragraph', text: 'Der Gesetzesbeschluss erweitert den Kreis der Begünstigten um Personen, die das 67. Lebensjahr noch nicht vollendet haben und im Beitragsjahr bestimmte gewerbliche oder selbstständige Einkünfte erzielen. Genannt sind § 15 sowie § 18 Absatz 1 Nummer 1 bis 3 des Einkommensteuergesetzes. Damit kann auch eine freiberufliche Tätigkeit erfasst sein. Ob deine konkreten Einnahmen dazugehören, ist eine steuerliche Frage.' },
        { type: 'paragraph', text: 'Zusätzlich muss die Steuererklärung für das betreffende Beitragsjahr abgegeben worden sein. Eine Erklärung für das Vorjahr ersetzt diese Voraussetzung nicht. Lege daher einen Ablauf für Erklärung, Nachweise und die Zulagenbearbeitung fest. Die Bedingung bedeutet nicht, dass alle Einzelheiten schon vor dem ersten Beitrag abschließend bearbeitet sein müssen; sie muss aber im Verfahren nachgewiesen werden können.' },
      ] },
      { id: 'unterlagen', heading: 'Welche Unterlagen solltest du vorbereiten?', blocks: [
        { type: 'table', caption: 'Prüfunterlagen für die neue Berechtigung', head: ['Punkt', 'Geeignete Vorbereitung', 'Häufiger Denkfehler'], rows: [
          ['Alter und Person', 'Persönliche Angaben für das Beitragsjahr', 'Jede selbstständige Person ist unabhängig vom Alter berechtigt'],
          ['Einkunftsart', 'Steuerliche Einordnung der Tätigkeit und Einkünfte', 'Gewerbeschein oder Berufsbezeichnung genügt allein'],
          ['Steuererklärung', 'Abgabe für das betreffende Beitragsjahr dokumentieren', 'Eine frühere Steuererklärung ersetzt alle späteren'],
          ['Weitere Verträge', 'Riester, Basisrente und sonstige Vorsorge zusammenstellen', 'Ein neuer Vertrag hat keine Folgen für andere geförderte Verträge'],
        ], note: 'Die Liste dient der Vorbereitung. Im persönlichen Fall sind die tatsächlichen Angaben und das Zulagenverfahren maßgeblich.' },
        { type: 'paragraph', text: 'Falls du nebenbei angestellt bist oder schon rentenversicherungspflichtig selbstständig arbeitest, kann bereits eine andere Berechtigungsgrundlage bestehen. Auch diese solltest du angeben. So lässt sich vermeiden, dass du deinen Fall unnötig auf nur einen Zugang verengst oder dieselbe Förderung mehreren Verträgen zurechnest.' },
      ] },
      { id: 'foerderung', heading: 'Wie hoch fällt die Grundzulage aus?', blocks: [
        { type: 'paragraph', text: 'Im neuen System erhalten unmittelbar Berechtigte 50 Prozent Grundzulage auf den Eigenbeitrag bis 360 EUR. Für den Teil oberhalb von 360 EUR bis insgesamt 1.800 EUR werden 25 Prozent gerechnet. Bei 150 EUR im Monat und zwölf Zahlungen ergibt sich dadurch die maximale Grundzulage von 540 EUR. Weniger einzuzahlen kann trotzdem sinnvoll sein, wenn das Geld sonst im Betrieb oder Haushalt fehlt.' },
        { type: 'paragraph', text: 'Beispiel: Du zahlst 50 EUR im Monat, also 600 EUR im Jahr. Auf die ersten 360 EUR kommen 180 EUR Grundzulage, auf die weiteren 240 EUR noch 60 EUR. Zusammen sind das 240 EUR Grundzulage. Bei entsprechendem Kindergeldanspruch und Zuordnung können Kinderzulagen hinzukommen. Die Rechnung sagt noch nichts über Vertragskosten, Anlageentwicklung oder eine zusätzliche Steuerwirkung aus.' },
      ] },
      { id: 'budget', heading: 'Erst Liquidität planen, dann Förderung ausrechnen', blocks: [
        { type: 'paragraph', text: 'Verwechsel den Umsatz eines guten Monats nicht mit dauerhaft verfügbarem Einkommen. Ziehe Betriebskosten, Steuerreserve, Krankenversicherung und private Ausgaben ab. Berücksichtige außerdem saisonale Lücken und größere Ersatzanschaffungen. Aus dem Betrag, der danach langfristig übrig bleibt, entsteht dein möglicher Vorsorgebeitrag. Eine spätere Zulagengutschrift bezahlt keine heutige Rechnung.' },
        { type: 'paragraph', text: 'Wenn Beiträge unregelmäßig anfallen sollen, kläre Sonderzahlungen, Pausen und Fristen beim konkreten Anbieter. Die gesetzliche Jahresrechnung ist keine Zusage, dass jedes Produkt jede Zahlungsform erlaubt. Das Geld ist grundsätzlich für die spätere Auszahlung gebunden. Eine schädliche vorzeitige Verwendung kann Rückzahlungen auslösen; bei einem Depot ohne Garantie besteht zusätzlich das Risiko von Kursverlusten.' },
      ] },
      { id: 'entscheidung', heading: 'Wann lohnt sich ein persönlicher Vergleich?', blocks: [
        { type: 'list', items: [
          'Wenn bereits eine Basisrente oder ein Riester-Vertrag besteht und du Beiträge neu verteilen möchtest.',
          'Wenn dein Einkommen stark schwankt oder sich Beschäftigung und Selbstständigkeit im Jahr abwechseln.',
          'Wenn du eine Beitragsgarantie erwägst und Kosten gegen Renditechancen abwägen möchtest.',
          'Wenn du vor allem Steuerersparnis erwartest. Dafür müssen heutige Steuerwirkung und spätere Besteuerung zusammen betrachtet werden.',
        ] },
        { type: 'paragraph', text: 'Healio begleitet die Versicherungslösungen des neuen Systems. Bring für einen Check zuerst deinen Status, einen realistischen Beitragsrahmen und bestehende Vorsorge mit. Dann kann das Gespräch eine konkrete Entscheidung vorbereiten, statt nur die größtmögliche Zulage auf dem Papier zu zeigen.' },
      ] },
    ],
    faqs: [
      { question: 'Sind ab 2027 alle Selbstständigen automatisch berechtigt?', answer: 'Nein. Für den neuen Zugang sind insbesondere das Alter unter 67, die bezeichneten Einkünfte im Beitragsjahr und die abgegebene Steuererklärung für dieses Jahr maßgeblich. Weitere Berechtigungsgrundlagen können im Einzelfall bestehen.' },
      { question: 'Bekomme ich 540 EUR auch bei 50 EUR Beitrag im Monat?', answer: 'Bei zwölf Zahlungen von 50 EUR sind es im neuen System 600 EUR Eigenbeitrag und 240 EUR Grundzulage. Die maximale Grundzulage von 540 EUR wird bei 1.800 EUR Jahresbeitrag erreicht.' },
      { question: 'Muss ich die Steuererklärung schon für dasselbe Beitragsjahr abgeben?', answer: 'Die neue gesetzliche Voraussetzung bezieht sich auf die Steuererklärung für das Beitragsjahr. Plane die Abgabe und den Nachweis im Verfahren ein; die Erklärung eines anderen Jahres ersetzt diese Bedingung nicht.' },
    ],
    sourceIds: ['gesetz', 'bmf'],
    relatedSlugs: ['altersvorsorgedepot-schwankendes-einkommen', 'altersvorsorgedepot-oder-ruerup'],
  });
