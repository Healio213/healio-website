// Anfrageseite /altersvorsorgedepot/riester (Umzug ins neue Depot).
// Zahlen: FAKTENBASIS.md und Quellenprüfung vom 08.10.2026.
// Öffentliche Kernbotschaft bei Riester: „Nicht kündigen, erst prüfen.“
export default {
  slug: 'riester',
  seo: {
    title: 'Riester ins Altersvorsorgedepot übertragen? Erst prüfen | Healio',
    description: 'Ab 2027 kann dein Riester-Vertrag ins neue Depot umziehen. Vergleiche Förderung, Kosten und Garantie, bevor du etwas änderst. Nicht kündigen, erst prüfen.',
    ogImageAlt: 'Healio: Riester-Vertrag ins Altersvorsorgedepot übertragen',
  },
  hero: {
    brotkrume: 'Riester-Vertrag',
    eyebrow: 'Für alle mit Riester-Vertrag',
    h1: 'Dein Riester-Vertrag kann ins neue Depot umziehen. Ob sich das lohnt, prüfen wir vorher.',
    unterzeile: 'Ab 2027 hast du drei Möglichkeiten: weiterführen, beitragsfrei stellen und neu sparen oder das Guthaben übertragen. Der Schritt ins neue Fördersystem ist endgültig. Deshalb gehört vorher ein Vergleich auf den Tisch.',
    fussnote: 'Nicht kündigen, erst prüfen: Eine Kündigung mit Auszahlung kann Zulagen und Steuervorteile kosten.',
    linkInhalt: 'Erst die Regeln für den Umzug lesen',
    vertrauenszeile: 'Umzug per Übertragungsauftrag · Kostengrenzen im Gesetz · Vergleich mit deinen Unterlagen',
    karte: {
      titel: 'Alte und neue Förderung im Vergleich',
      kacheln: [
        { key: 'grundzulage', wert: 'bis zu 540 EUR', text: 'neue Grundzulage, unabhängig vom Einkommen' },
        { key: 'alt', motiv: 'riester', wert: '175 EUR', text: 'alte Grundzulage, höchstens' },
        { key: 'kosten', motiv: 'check', wert: '150 EUR', text: 'höchstens für die Übertragung beim neuen Vertrag' },
      ],
      hinweis: 'Neue Grundzulage bei 150 EUR Monatsbeitrag, alte Grundzulage bei vollem Mindesteigenbeitrag. Was dein alter Vertrag für die Übertragung verlangt, kann abweichen.',
    },
  },
  fakten: {
    ueberschrift: 'Was beim Umzug gilt',
    intro: 'Fünf Punkte gehören bei jedem Riester-Vertrag geprüft, bevor er umzieht. Zu jedem steht die Fundstelle dabei.',
    karten: [
      { wert: '3 Wege', titel: 'Behalten, ruhen, umziehen', text: 'Du kannst den Vertrag weiterführen, ihn beitragsfrei stellen und zusätzlich neu sparen oder das Guthaben samt Zulagen in einen neuen Vertrag übertragen.', quelle: 'drvReform' },
      { wert: 'endgültig', titel: 'Der Förderwechsel', text: 'Ein neuer geförderter Vertrag ab 2027 bringt alle deine Riester-Verträge ins neue Fördersystem. Zur alten Förderung führt kein Weg zurück.', quelle: 'gesetz' },
      { wert: 'Auftrag', titel: 'Übertragen statt kündigen', text: 'Das Guthaben wandert per ausdrücklichem Übertragungsauftrag direkt in den neuen Vertrag. Lass dir das Geld nicht erst selbst auszahlen.', quelle: 'zfaWechsel' },
      { wert: '150 EUR', titel: 'Kostengrenze beim neuen Vertrag', text: 'Auf das übertragene geförderte Kapital darf der neue Vertrag keine neuen Abschlusskosten nehmen, für die Übertragung höchstens 150 EUR Verwaltungskosten. Was der alte Vertrag verlangt, steht in seinen Bedingungen.', quelle: 'gesetz' },
      { wert: '80 oder 100 %', titel: 'Garantie im Blick', text: 'Alte Riester-Verträge haben meist eine volle Beitragsgarantie. Ein Depot ohne Garantie schwankt. Garantieprodukte sagen 80 oder 100 Prozent der Beiträge samt Zulagen zum Beginn der Auszahlung zu.', quelle: 'gesetz' },
    ],
  },
  beispiele: {
    ueberschrift: 'Alt und neu bei gleichem Beitrag',
    labels: { beitrag: 'Beitrag jährlich', zulage: 'Neue Zulage pro Jahr', quote: 'neue Förderquote {quote}' },
    karten: [
      { titel: 'Alte Riester-Förderung', festwerte: { eigenbeitrag: '4 %', eigenbeitragRest: 'Gesamtbeitrag in Prozent des Vorjahreseinkommens', zulage: '175 EUR', zulageRest: 'Grundzulage höchstens' }, text: 'Für die volle Zulage mussten Beitrag und Zulagen zusammen 4 Prozent des Vorjahreseinkommens erreichen, höchstens 2.100 EUR. Mindestens 60 EUR im Jahr.' },
      { titel: 'Neue Förderung, 100 EUR im Monat', eingabe: { monatsbeitrag: 100 }, text: 'Unabhängig vom Einkommen. Die ersten 360 EUR werden mit 50 Prozent gefördert, der Rest bis 1.800 EUR mit 25 Prozent.' },
      { titel: 'Neue Förderung, ein Kind', eingabe: { monatsbeitrag: 150, kinder: 1 }, text: 'Je Kind bis zu 300 EUR. Bei Riester gab es je nach Geburtsjahr 185 oder 300 EUR.' },
    ],
    kleingedruckt: 'Gegenüberstellung bei gleichem Eigenbeitrag für unmittelbar Förderberechtigte. Mit kleinem Einkommen oder vielen Kindern kann im Einzelfall die alte Förderung vorn liegen. Nicht eingerechnet sind Vertragskosten, Garantiekosten und Wertentwicklung.',
  },
  vertiefung: {
    ueberschrift: 'Was wir vor einem Umzug vergleichen',
    intro: 'Ein Umzug lohnt sich nur, wenn die neue Lösung bei deinem Beitrag mehr bringt, als du aufgibst.',
    bloecke: [
      { titel: 'Deine Unterlagen', text: 'In Jahresmitteilung und Zulagenbescheinigung siehst du Guthaben, Beiträge und Zulagen. Garantie und Kosten stehen in deinen Vertragsunterlagen. Mit diesen Papieren lässt sich ehrlich vergleichen.' },
      { titel: 'Förderung bei gleichem Beitrag', text: 'Wir stellen gegenüber, was dir die alte und die neue Förderung bei deinem Beitrag bringen. Wer wenig verdient oder mehrere Kinder hat, fährt mit der alten Förderung manchmal besser.' },
      { titel: 'Kosten auf beiden Seiten', text: 'Was der alte Anbieter für die Übertragung verlangt, regelt dein Vertrag. Beim neuen Vertrag gelten die gesetzlichen Grenzen. Erst wenn beide Zahlen schriftlich vorliegen, ergibt ein Umzug Sinn.' },
      { titel: 'Garantie oder Chance', text: 'Willst du die Garantie behalten, kommt ein Garantieprodukt mit 80 oder 100 Prozent in Frage. Ein Depot ohne Garantie hat mehr Chancen und mehr Schwankung. Diese Abwägung triffst du, nicht der Rechner.' },
      { titel: 'Partner mit mittelbarer Förderung', text: 'Wird dein Ehepartner über dich mittelbar gefördert, wirkt sich der Wechsel auch auf ihn aus. Das gehört vor der Entscheidung auf den Tisch.' },
      { titel: 'Kein Zeitdruck', text: 'Eine allgemeine Wechselfrist gibt es nicht. Für 2027 zählen Beiträge, die im Jahr 2027 geleistet werden, und den Zulagenantrag für 2027 kannst du bis 31.12.2029 stellen.' },
    ],
  },
  rechner: {
    voreinstellung: { monatsbeitrag: 100, kinder: 0, unter25: false, selbststaendig: false, riester: true },
    felder: ['monatsbeitrag', 'kinder'],
    texte: {
      ueberschrift: 'Was bringt die neue Förderung bei deinem Beitrag?',
      unterzeile: 'Rechne die neue Zulage aus. Den Vergleich mit deinem alten Vertrag machen wir anhand deiner Unterlagen.',
      labels: {
        monatsbeitrag: 'Wie viel zahlst du heute im Monat ein, oder möchtest du einzahlen?',
        kinder: 'Für wie viele Kinder bekäme dein Vertrag Kinderzulage?',
      },
      ergebnis: {
        vor: 'Neue Förderung bei deinem Beitrag',
        nach: 'im Jahr, nach den Regeln ab 2027.',
        monat: 'Je Monat {monat}. Für jeden eingezahlten Euro bekommst du {quote} Zulage.',
      },
      tipps: {
        unter25MitKindern: 'Schon 25 EUR im Monat bringen im neuen System die volle Kinderzulage.',
        unter30KeineKinder: 'Bis 30 EUR im Monat fördert das neue System jeden Euro mit 50 Cent.',
        unter150: 'Für die höchste neue Grundzulage braucht es 150 EUR im Monat.',
        bei150: 'Das ist die höchste Grundzulage im neuen System, mehr als dreimal so viel wie die alte.',
      },
      hinweisTitel: { riester: 'Vor dem Umzug: dein Vertrag im Vergleich' },
      hinweise: {
        riester: 'Nicht kündigen, erst prüfen. Wir legen deinen Vertrag neben die neue Förderung und zeigen dir Kosten und Garantie beider Wege.',
        immer: 'Ob zusätzlich Steuern sinken, prüft das Finanzamt automatisch.',
      },
      teaser: { titel: 'Nach dem Speichern: dein Depotmodell', text: 'Alter und Steuersatz stellst du selbst ein. Eine Rendite sagen wir damit nicht zu.' },
      knopfMitBetrag: 'Berechnung speichern & Riester-Vergleich anfragen',
      knopfOhneAnspruch: 'Riester-Vergleich anfragen',
      kleingedruckt: 'Gerechnet ist nur die neue Förderung für unmittelbar Berechtigte. Dein alter Vertrag behält seine vereinbarten Bedingungen. Auch im neuen Vertrag liegt das Geld bis zum Rentenbeginn fest. Eine Anlage- oder Steuerberatung ist das nicht.',
    },
  },
  check: {
    eyebrow: 'Unverbindlich, mit deinem Vertrag',
    ueberschrift: 'Dein Riester-Check vor dem Umzug',
    unterzeile: 'Wir vergleichen deinen Vertrag mit der neuen Förderung, bevor du irgendetwas unterschreibst.',
    karten: [
      { icon: 'zulage', titel: 'Neue Zulage festhalten', text: 'Das Ergebnis des Rechners übernimmst du mit einem Klick. Für den Rückweg zu dir reichen Vorname und E-Mail.' },
      { icon: 'riester', titel: 'Vertrag nebeneinanderlegen', text: 'Im Vorabcheck, rund 10 Minuten, schauen wir auf Jahresmitteilung, Kosten und Garantie deines Vertrags.' },
      { icon: 'entscheidung', titel: 'Weg wählen', text: 'Weiterführen, ruhen lassen oder übertragen. Für einen Umzug in eine Versicherungsvariante bereiten wir den schriftlichen Übertragungsauftrag vor.' },
    ],
    ablaufzeile: 'Wir melden uns nach deiner Vormerkung. Leg dir bis dahin deine letzte Jahresmitteilung bereit.',
    startzeile: 'Zielverträge für einen Umzug sind ab dem 1. Januar 2027 abschließbar. Eine allgemeine Wechselfrist existiert nicht.',
    knopfTermin: 'Riester-Vergleich vormerken',
    knopfRueckruf: 'Rückruf zum Riester-Vertrag',
  },
  vormerkung: {
    ueberschrift: 'Deine Riester-Prüfung vormerken',
    intro: 'Nach dem Absenden siehst du dein Depotmodell. Den Vergleich mit deinem Vertrag machen wir im Vorabcheck.',
  },
  passt: {
    passtTitel: 'Ein Umzug kann passen, wenn',
    passtItems: [
      'dein Riester-Vertrag wenig Zulage bringt oder hohe Kosten hat,',
      'du mit deinem Beitrag nach der neuen Formel auf mehr Zulage kommst,',
      'du die Chancen eines Depots nutzen willst und dafür Schwankungen akzeptierst,',
      'du vor der Entscheidung beide Fördersysteme sehen willst.',
    ],
    passtNichtTitel: 'Eher nicht, wenn',
    passtNichtItems: [
      'du die volle Beitragsgarantie behalten willst und kein Garantieprodukt möchtest. Dann ist Weiterführen oft der ruhigere Weg.',
      'du ein kleines Einkommen oder mehrere Kinder hast und die alte Förderung dir mehr bringt.',
      'dein Ziel ein Bank- oder Fondssparplan ist. Diese Produkte vermittelt Healio nicht.',
    ],
  },
  faq: [
    { question: 'Muss ich meinen Riester-Vertrag 2027 wechseln?', answer: 'Nein. Es gibt keinen Zwang und keine allgemeine Wechselfrist. Bestehende Verträge behalten grundsätzlich ihre alte Förderung, solange du nicht selbst wechselst oder einen neuen geförderten Vertrag abschließt.' },
    { question: 'Was passiert mit meinen bisherigen Zulagen?', answer: 'Bei einer Übertragung in einen neuen zertifizierten Vertrag gehen Guthaben und Zulagen mit. Eine Kündigung mit Auszahlung kostet dich dagegen die Förderung. Deshalb gilt: nicht kündigen, erst prüfen.' },
    { question: 'Kann ich zurück, wenn mir die neue Förderung nicht gefällt?', answer: 'Nein. Der Wechsel ins neue Fördersystem ist unwiderruflich und gilt für alle deine Riester-Verträge zusammen.' },
    { question: 'Wie lange dauert eine Übertragung?', answer: 'Für die Übertragung gilt in der Regel eine Frist von drei Monaten zum Quartalsende. Annahme, Frist und Kosten lassen wir uns vorher schriftlich bestätigen.' },
    { question: 'Ich habe zwei Riester-Verträge. Was gilt dann?', answer: 'Der Förderwechsel gilt einheitlich für alle Bestandsverträge. Einen Vertrag in der alten und einen in der neuen Förderung zu führen, ist nicht vorgesehen.' },
    { question: 'Prüft Healio auch Bank- und Fondssparpläne?', answer: 'Die Förderregeln erklären wir dir für jeden Riester-Vertrag. Vermitteln kann Healio aber nur Versicherungsvarianten. Für einen Umzug in ein reines Bank- oder Fondsprodukt brauchst du einen dafür zugelassenen Anbieter oder Vermittler.' },
  ],
  quellen: [
    { id: 'drvReform', wofuer: 'Drei Wege für den Riester-Bestand' },
    { id: 'gesetz', wofuer: 'Förderwechsel, Kostengrenzen und Garantie' },
    { id: 'zfaWechsel', wofuer: 'Ablauf einer Übertragung' },
    { id: 'zfaKuendigen', wofuer: 'Folgen einer Kündigung' },
    { id: 'zfa', wofuer: 'Alte und neue Förderung' },
    { id: 'estg89', wofuer: 'Frist für den Zulagenantrag' },
  ],
  weiterlesen: ['riester-altersvorsorgedepot-wechsel', 'riester-alte-oder-neue-foerderung', 'altersvorsorgedepot-garantie'],
  weiterlesenTitel: 'Weiterlesen zum Riester-Wechsel',
  abschlussKnopf: 'Neue Förderung für meinen Beitrag rechnen',
  verwandt: ['riester-kuendigen', 'selbststaendige', 'ehepartner', 'eltern', 'unter-25', 'elternzeit', 'kindergeld-endet'],
  fussHinweis: 'Hinweis zu bestehenden Riester-Verträgen und zur Reform. Eine Prüfung deines konkreten Vertrags ersetzt sie nicht. Ohne Garantie kann ein Depot Verluste machen.',
};
