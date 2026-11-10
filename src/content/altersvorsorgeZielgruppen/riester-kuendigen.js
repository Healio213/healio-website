// Anlassseite /altersvorsorgedepot/riester-kuendigen. Zahlen: FAKTENBASIS.md
// und Quellenprüfung vom 08.10.2026. Öffentliche Kernbotschaft bei Riester:
// „Nicht kündigen, erst prüfen.“ Keine Aussage „kostenlos“ zum Check.
export default {
  slug: 'riester-kuendigen',
  seo: {
    title: 'Riester kündigen? Erst prüfen, dann entscheiden | Healio',
    description: 'Bevor du deinen Riester-Vertrag kündigst: Eine Auszahlung kann Zulagen und Steuervorteile kosten. Drei Alternativen, fünf Prüffragen, ein unverbindlicher Check.',
    ogImageAlt: 'Healio: Riester kündigen oder erst prüfen',
  },
  hero: {
    brotkrume: 'Riester kündigen?',
    eyebrow: 'Kurz vor dem Kündigungsschreiben',
    h1: 'Riester-Vertrag kündigen? Nicht kündigen, erst prüfen.',
    unterzeile: 'Wer mit Auszahlung kündigt, muss Zulagen und Steuervorteile grundsätzlich zurückzahlen. Oft gibt es einen Weg, der weniger kostet: weiterlaufen lassen, ruhen lassen oder übertragen.',
    fussnote: 'Allgemeine Information. Welcher Weg für deinen Vertrag passt, hängt von seinen Bedingungen ab.',
    linkInhalt: 'Lesen, was eine Kündigung auslöst',
    vertrauenszeile: 'Belegt mit Quellen der Rentenversicherung · keine allgemeine Wechselfrist · erst rechnen, dann reden',
    karte: {
      titel: 'Was bei einer Kündigung auf dem Spiel steht',
      kacheln: [
        { key: 'rueckforderung', motiv: 'riester', wert: 'Zulagen', text: 'gehen bei Kündigung mit Auszahlung zurück' },
        { key: 'steuer', motiv: 'check', wert: 'Steuervorteile', text: 'werden ebenfalls zurückgefordert' },
        { key: 'wege', motiv: 'entscheidung', wert: '3 Wege', text: 'bei denen die Förderung erhalten bleibt' },
      ],
      hinweis: 'Für gesetzlich geregelte Ausnahmen, etwa die begünstigte Verwendung für die eigene Wohnung, gelten eigene Regeln.',
    },
  },
  fakten: {
    ueberschrift: 'Was eine Kündigung auslöst',
    intro: 'Riester wird gefördert, weil das Geld fürs Alter gedacht ist. Wer vorher an das Geld will, gibt einen Teil der Förderung zurück.',
    karten: [
      { wert: 'zurück', titel: 'Zulagen und Steuervorteile', text: 'Bei einer schädlichen Verwendung, etwa der Kündigung mit Auszahlung, fordert der Staat die erhaltenen Zulagen und die berücksichtigten Steuervorteile zurück.', quelle: 'zfaKuendigen' },
      { wert: 'Erträge', titel: 'können Steuer kosten', text: 'Auf Erträge kann bei einer Auszahlung zusätzlich Steuer anfallen. Wie viel, hängt vom Vertrag ab und gehört in die Prüfung.', quelle: 'zfaKuendigen' },
      { wert: 'Auftrag', titel: 'Übertragen ist keine Kündigung', text: 'Ein ausdrücklicher Übertragungsauftrag in einen anderen zertifizierten Vertrag ist ein anderer Vorgang als die Kündigung aufs eigene Konto. Die Förderung bleibt dabei erhalten.', quelle: 'zfaWechsel' },
      { wert: 'keine Frist', titel: 'Kein Grund zur Eile', text: 'Für den Wechsel gibt es keine allgemeine Frist. Selbst die Zulage für 2027 lässt sich noch bis Ende 2029 beantragen.', quelle: 'estg89' },
    ],
  },
  beispiele: {
    ueberschrift: 'Drei Wege, bei denen die Förderung bleibt',
    karten: [
      { titel: 'Weiterlaufen lassen', text: 'Der Vertrag bleibt, wie er ist, mit alter Förderung und seiner Garantie, falls vereinbart. Sinnvoll, wenn er ordentlich läuft und die alte Förderung für dich gut passt.' },
      { titel: 'Ruhen lassen und neu sparen', text: 'Du stellst den Vertrag beitragsfrei und sparst ab 2027 zusätzlich im neuen Depot. Das Guthaben bleibt gefördert liegen. Mit dem neuen Vertrag wechselst du allerdings ins neue Fördersystem.' },
      { titel: 'Guthaben übertragen', text: 'Das Kapital geht per Übertragungsauftrag in einen neuen Vertrag. Dort gelten gesetzliche Kostengrenzen; die Kosten des alten Vertrags findest du in deinen Unterlagen.' },
    ],
    kleingedruckt: 'Welcher Weg passt, hängt von Kosten, Garantie, Kinderzahl und Einkommen ab. Wer ins neue Fördersystem wechselt, kann nicht zurück.',
  },
  vertiefung: {
    ueberschrift: 'Bevor du kündigst: diese fünf Fragen',
    intro: 'Mit den Antworten weißt du, was dich eine Kündigung kosten würde und welche Alternative besser passt.',
    bloecke: [
      { titel: 'Was steht in deinen Unterlagen?', text: 'Jahresmitteilung und Zulagenbescheinigung zeigen Guthaben, Beiträge und erhaltene Zulagen. Garantie und Kosten findest du in den Vertragsunterlagen. Ohne diese Zahlen lässt sich keine gute Entscheidung treffen.' },
      { titel: 'Was ist dir die alte Förderung wert?', text: 'Bei kleinem Einkommen oder mehreren Kindern kann sie mehr bringen als die neue. Höchstens 175 EUR alte Grundzulage stehen bis zu 540 EUR im neuen System gegenüber, fair ist der Vergleich aber nur bei gleichem Beitrag.' },
      { titel: 'Welche Garantie hast du?', text: 'Viele alte Verträge sagen zum Rentenbeginn die eingezahlten Beiträge zu. Gibst du das auf, trägst du mehr Risiko.' },
      { titel: 'Wofür brauchst du das Geld?', text: 'Für die eigene Wohnung sieht das Gesetz Wege vor, gefördertes Kapital zu nutzen. Ob einer davon passt, prüfen wir einzeln. Für andere Zwecke kostet eine Kündigung die Förderung.' },
      { titel: 'Wie ist dein Vertrag gebaut?', text: 'Riester gibt es als Versicherung, Banksparplan oder Fondssparplan. Healio vermittelt nur Versicherungsvarianten. Die Förderregeln erklären wir dir trotzdem, ganz gleich, wie dein Vertrag gebaut ist.' },
    ],
  },
  rechner: {
    voreinstellung: { monatsbeitrag: 50, kinder: 0, unter25: false, selbststaendig: false, riester: true },
    felder: ['monatsbeitrag', 'kinder'],
    texte: {
      ueberschrift: 'Was ein neuer Vertrag an Zulage hätte',
      unterzeile: 'Rechne aus, welche Zulage ein neuer Vertrag mit deinem heutigen Beitrag hätte. Deinen alten Vertrag vergleichen wir anschließend mit dir.',
      labels: {
        monatsbeitrag: 'Welchen Monatsbeitrag zahlst du heute in deinen Riester-Vertrag?',
        kinder: 'Hast du Kinder, für die eine Kinderzulage in Frage kommt?',
      },
      hinweise: {
        riester: 'Bevor du kündigst, vergleichen wir deinen Vertrag mit dem neuen System. Ist das Geld erst ausgezahlt, lässt sich die Förderung nicht zurückholen.',
        immer: 'Einen möglichen Steuervorteil prüft das Finanzamt mit deiner Steuererklärung.',
      },
      ergebnis: {
        vor: 'Zulage eines neuen Vertrags',
        nach: 'jährlich, ohne deinen bisherigen Vertrag anzutasten.',
        monat: 'Rund {monat} pro Monat. Auf jeden Euro Beitrag kämen {quote} Förderung.',
      },
      tipps: {
        unter25MitKindern: 'Mit Kindern genügen im neuen System 25 EUR im Monat, damit jedes Kind die volle Kinderzulage bringt.',
        unter30KeineKinder: 'Auf die ersten 360 EUR im Jahr gibt es im neuen System 50 Prozent Zulage.',
        unter150: 'Je näher dein Beitrag an 150 EUR im Monat liegt, desto höher die neue Grundzulage.',
        bei150: 'Bei diesem Beitrag wäre die neue Grundzulage am höchsten.',
      },
      hinweisTitel: { riester: 'Erst prüfen, dann entscheiden' },
      teaser: { titel: 'Nach dem Speichern: Modell für ein neues Depot', text: 'Als Beispielrechnung mit Annahmen, die du selbst ändern kannst.' },
      knopfMitBetrag: 'Berechnung speichern & Riester prüfen lassen',
      knopfOhneAnspruch: 'Riester-Prüfung anfragen',
      kleingedruckt: 'Die Rechnung zeigt nur, was ein neuer Vertrag ab 2027 an Zulage hätte. Für deinen bestehenden Vertrag ändert sich dadurch nichts. Kosten und Kursentwicklung fehlen, und auch neues Geld wäre grundsätzlich bis zur Rente gebunden.',
    },
  },
  check: {
    eyebrow: 'Unverbindlich, bevor du etwas abschickst',
    ueberschrift: 'Erst prüfen: dein Riester-Check',
    unterzeile: 'Zehn Minuten am Telefon, bevor du eine Entscheidung triffst, die sich nicht zurücknehmen lässt.',
    karten: [
      { icon: 'rechnung', titel: 'Zahlen festhalten', text: 'Dein Monatsbeitrag aus dem Rechner kommt mit in die Anfrage. Kontakt per E-Mail genügt, eine Nummer kannst du ergänzen.' },
      { icon: 'unterlagen', titel: 'Unterlagen durchgehen', text: 'Im Vorabcheck schauen wir auf Guthaben, Zulagen, Garantie und Kosten deines Vertrags.' },
      { icon: 'entscheiden', titel: 'In Ruhe entscheiden', text: 'Du wählst zwischen behalten, beitragsfrei stellen und übertragen. Gekündigt wird dabei nichts, ein Umzug läuft per schriftlichem Auftrag.' },
    ],
    ablaufzeile: 'Schick die Kündigung erst ab, wenn du alle drei Wege kennst. Healio ruft dich an oder schreibt dir, sobald deine Anfrage da ist.',
    startzeile: 'Für den Wechsel läuft keine allgemeine Frist ab. Neue Zielverträge gibt es ab dem 1. Januar 2027.',
    knopfTermin: 'Riester-Prüfung vormerken',
    knopfRueckruf: 'Rückruf vor der Kündigung',
  },
  vormerkung: {
    ueberschrift: 'Deine Riester-Prüfung anfragen',
    intro: 'Nach dem Absenden siehst du ein Modell für das neue Depot. Deinen alten Vertrag prüfen wir im Vorabcheck.',
  },
  startinfo: {
    eyebrow: 'Du brauchst noch Bedenkzeit?',
    ueberschrift: 'Lass dich informieren, bevor du etwas kündigst',
    text: 'Über Vorname und E-Mail bleibst du auf dem Laufenden. Du bekommst Bescheid, sobald es Zielverträge für eine Übertragung gibt. Ein Abmeldelink ist in jeder Nachricht enthalten.',
    knopf: 'Erst informieren lassen',
    fahrplan: 'Zum Zuschuss-Fahrplan (PDF)',
    rechnerLink: 'Erst nur informieren lassen',
  },
  passt: {
    passtTitel: 'Der Check hilft dir, wenn',
    passtItems: [
      'du gerade überlegst, deinen Riester-Vertrag zu kündigen,',
      'du nicht weißt, wie viel Förderung schon in deinem Vertrag steckt,',
      'du das Geld nicht sofort brauchst und eine Alternative suchst.',
    ],
    passtNichtTitel: 'Eher nicht, wenn',
    passtNichtItems: [
      'du das Geld wirklich jetzt brauchst und die Rückforderung bewusst in Kauf nimmst. Dann prüfe zuerst die gesetzlichen Ausnahmen.',
      'du einen Bank- oder Fondssparplan in ein reines Bankprodukt übertragen willst. Dafür ist ein anderer Vermittler zuständig, Healio arbeitet mit Versicherungsvarianten.',
    ],
  },
  faq: [
    { question: 'Was verliere ich bei einer Kündigung?', answer: 'Bei einer Kündigung mit Auszahlung werden die erhaltenen Zulagen und berücksichtigten Steuervorteile zurückgefordert. Ausgezahlt wird also weniger, als im Vertrag steht.' },
    { question: 'Kann ich den Vertrag einfach ruhen lassen?', answer: 'Ja, beitragsfrei stellen ist eine der Alternativen. Das Guthaben bleibt mit seiner Förderung im Vertrag. Neue Beiträge fließen dann nicht, und damit gibt es auch keine neuen Zulagen.' },
    { question: 'Muss ich bis Ende 2026 entscheiden?', answer: 'Nein. Es gibt keine allgemeine Frist, auch nicht zum Jahreswechsel. Du kannst 2027 in Ruhe vergleichen.' },
    { question: 'Darf ich das Geld für eine Wohnung nutzen?', answer: 'Für die eigene Wohnung sieht das Gesetz besondere Wege vor, die keine schädliche Auszahlung sind. Ob und wie das bei deinem Vertrag geht, prüfen wir einzeln.' },
    { question: 'Wie verdient Healio Geld?', answer: 'Nur wenn du über uns einen neuen Vertrag abschließt. Dann zahlt der Anbieter Healio eine Vergütung, die in den Vertragskosten enthalten ist. Mit dem Check gehst du keine Verpflichtung ein.' },
  ],
  quellen: [
    { id: 'zfaKuendigen', wofuer: 'Rückforderung bei Kündigung' },
    { id: 'zfaWechsel', wofuer: 'Übertragungsauftrag statt Kündigung' },
    { id: 'drvReform', wofuer: 'Alternativen für den Bestand' },
    { id: 'gesetz', wofuer: 'Förderwechsel und Wohnverwendung' },
    { id: 'estg89', wofuer: 'Antragsfrist bis Ende 2029' },
    { id: 'zfaJahr', wofuer: 'Beitragsjahr und Zulagenantrag' },
  ],
  abschlussKnopf: 'Vor dem Kündigen die Zahlen prüfen',
  verwandt: ['riester', 'ehepartner', 'eltern', 'elternzeit', 'unter-25', 'selbststaendige', 'kindergeld-endet'],
  weiterlesen: ['riester-kuendigen-oder-behalten', 'riester-jahresmitteilung-checkliste', 'altersvorsorgedepot-geld-entnehmen'],
  weiterlesenTitel: 'Ratgeber vor der Entscheidung',
  fussHinweis: 'Hier geht es allgemein um die Kündigung geförderter Riester-Verträge. Das ist keine Rechts- oder Steuerberatung, für deinen Vertrag gelten seine eigenen Bedingungen. Wertpapiere in einem neuen Vertrag ohne Garantie schwanken im Kurs.',
};
