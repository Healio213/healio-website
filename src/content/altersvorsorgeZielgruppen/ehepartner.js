// Anfrageseite /altersvorsorgedepot/ehepartner (mittelbare Förderung).
// Zahlen: FAKTENBASIS.md und Quellenprüfung vom 08.10.2026. Für den
// mittelbaren Teil gibt es keine allgemeine Rechenformel, deshalb nur die
// gesetzlichen Grenzen (höchstens 175 EUR, mindestens 120 EUR) und keine
// Rechenbeispiele für den mitgeförderten Partner.
export default {
  slug: 'ehepartner',
  seo: {
    title: 'Altersvorsorgedepot für Ehepartner: bis zu 175 EUR | Healio',
    description: 'Dein Partner ist nicht selbst förderberechtigt? Über dich kann er bis zu 175 EUR Zulage im Jahr bekommen, mit eigenem Vertrag ab 120 EUR. So läuft es für Paare.',
    ogImageAlt: 'Healio: Zulage für Ehepartner ohne eigene Förderung',
  },
  hero: {
    brotkrume: 'Ehepartner',
    eyebrow: 'Für Ehepaare mit einem förderberechtigten Partner',
    h1: 'Ein Gehalt, zwei Verträge: Auch dein Partner ohne eigene Förderung kann bis zu 175 EUR Zulage bekommen.',
    unterzeile: 'Ist nur einer von euch selbst förderberechtigt, kann der andere über ihn mitgefördert werden. Das Gesetz nennt das mittelbare Förderung. Dafür braucht der Partner einen eigenen Vertrag mit mindestens 120 EUR im Jahr.',
    fussnote: 'Gilt für Ehe- und Lebenspartner, die nicht dauernd getrennt leben, unter weiteren gesetzlichen Voraussetzungen.',
    linkInhalt: 'Wer mitgefördert wird',
    vertrauenszeile: 'Mittelbare Förderung nach § 79 EStG · eigene Rechnung je Partner · Rechner ohne Konto',
    karte: {
      titel: 'Was ihr zu zweit bekommen könnt',
      kacheln: [
        { key: 'grundzulage', wert: 'bis zu 540 EUR', text: 'für den förderberechtigten Partner' },
        { key: 'partner', motiv: 'familien', wert: 'bis zu 175 EUR', text: 'für den mitgeförderten Partner' },
        { key: 'beitrag', motiv: 'zulage', wert: '120 EUR', text: 'eigener Mindestbeitrag des Partners im Jahr' },
      ],
      hinweis: 'Die 540 EUR erreicht der förderberechtigte Partner mit 150 EUR im Monat. Die Zulage des mitgeförderten Partners richtet sich nach den geförderten Beiträgen des anderen und wird getrennt berechnet.',
    },
  },
  fakten: {
    ueberschrift: 'So funktioniert die mittelbare Förderung',
    intro: 'Vier Punkte entscheiden, ob und wie viel dein Partner über dich bekommt.',
    karten: [
      { wert: '175 EUR', titel: 'Grundzulage, höchstens', text: 'Mehr gibt es für den mitgeförderten Partner nicht. Gerechnet wird mit den geförderten Beiträgen des Partners, der selbst förderberechtigt ist.', quelle: 'gesetz' },
      { wert: '120 EUR', titel: 'eigener Beitrag im Jahr', text: 'Der mitgeförderte Partner zahlt in einen eigenen Vertrag ein, mindestens 120 EUR im Jahr. Die alte Grenze von 60 EUR aus dem bisherigen System gilt dafür nicht mehr.', quelle: 'gesetz' },
      { wert: 'verheiratet', titel: 'oder verpartnert', text: 'Mitgefördert werden Ehe- und Lebenspartner, die nicht dauernd getrennt leben. Für unverheiratete Paare ohne eingetragene Partnerschaft ist das nicht vorgesehen.', quelle: 'zfaFoerderung' },
      { wert: 'kein Bonus', titel: 'für den mitgeförderten Partner', text: 'Den Startbonus von 200 EUR gibt es nur für Menschen, die selbst förderberechtigt sind. Das gilt auch, wenn der mitgeförderte Partner jünger als 25 ist.', quelle: 'rv84' },
    ],
  },
  beispiele: {
    ueberschrift: 'Zwei Verträge, zwei Rechnungen',
    labels: { beitrag: 'Jahresbeitrag', zulage: 'Grundzulage', quote: '{quote} Zuschuss auf den Beitrag' },
    karten: [
      { titel: 'Förderberechtigter Partner', eingabe: { monatsbeitrag: 150 }, text: 'Mit 150 EUR im Monat ist die höchste Grundzulage erreicht.' },
      { titel: 'Mitgeförderter Partner', festwerte: { eigenbeitrag: '120 EUR', eigenbeitragRest: 'Mindestbeitrag im Jahr, eigener Vertrag', zulage: '175 EUR', zulageRest: 'Grundzulage höchstens' }, text: 'Die genaue Höhe hängt an den geförderten Beiträgen des anderen Partners. Wir rechnen sie im Check für euch aus.' },
      { titel: 'Mit Kindern', festwerte: { eigenbeitrag: '300 EUR', eigenbeitragRest: 'Jahresbeitrag für die volle Kinderzulage', zulage: '300 EUR', zulageRest: 'je Kind, höchstens' }, text: 'Die Kinderzulage bekommt der Elternteil, dem das Kind zugeordnet ist. Ist das der mitgeförderte Partner, werden die Beiträge des förderberechtigten Partners zugrunde gelegt.' },
    ],
    kleingedruckt: 'Die erste Rechnung gilt für einen unmittelbar förderberechtigten Partner und ein ganzes Beitragsjahr im neuen System. Für den mitgeförderten Partner nennen wir nur die gesetzlichen Grenzen. Kosten, Steuern und Kurse sind nicht berücksichtigt.',
  },
  vertiefung: {
    ueberschrift: 'Was Ehepaare vorher klären sollten',
    intro: 'Bevor ihr zwei Verträge plant, lohnt ein ehrlicher Blick auf eure Lage.',
    bloecke: [
      { titel: 'Ist dein Partner nicht doch selbst berechtigt?', text: 'Wer rentenversicherungspflichtig arbeitet, auch in Teilzeit, ist selbst förderberechtigt und kann die volle Grundzulage bis 540 EUR bekommen. Ab 2027 gilt das unter Bedingungen auch für Selbstständige. Das prüfen wir zuerst.' },
      { titel: 'Zwei eigene Verträge', text: 'Jeder von euch braucht einen eigenen Vertrag. Der förderberechtigte Partner zahlt seinen Beitrag, der mitgeförderte mindestens 120 EUR im Jahr.' },
      { titel: 'Die Höhe hängt am Partner', text: 'Berechnet wird die Zulage des mitgeförderten Partners anhand der geförderten Beiträge des anderen, höchstens 175 EUR. Zahlt der förderberechtigte Partner wenig ein, kann sie kleiner ausfallen.' },
      { titel: 'Wenn ihr euch trennt', text: 'Leben die Partner dauernd getrennt, fällt die Voraussetzung für die mittelbare Förderung weg. Dann zählt nur noch eine eigene Förderberechtigung.' },
      { titel: 'Riester-Verträge in der Ehe', text: 'Nicht kündigen, erst prüfen. Wechselt der förderberechtigte Partner ins neue Fördersystem, hat das auch Folgen für den mitgeförderten Partner. Das rechnen wir vorher für euch beide durch.', link: { to: '/altersvorsorgedepot/riester', label: 'Riester-Umzug im Überblick' } },
    ],
  },
  rechner: {
    voreinstellung: { monatsbeitrag: 120, kinder: 0, unter25: false, selbststaendig: false, riester: false },
    felder: ['monatsbeitrag', 'kinder'],
    texte: {
      ueberschrift: 'Die Zulage des förderberechtigten Partners ausrechnen',
      unterzeile: 'Der Rechner zeigt die Seite des Partners, der selbst förderberechtigt ist. Den Anteil des mitgeförderten Partners ermitteln wir im Vorabcheck gesondert.',
      labels: {
        monatsbeitrag: 'Wie viel zahlt der förderberechtigte Partner im Monat ein?',
        kinder: 'Für wie viele Kinder bekommt dieser Partner die Kinderzulage?',
      },
      ergebnis: {
        vor: 'Zulage des förderberechtigten Partners',
        nach: 'im Jahr, ohne den Anteil des mitgeförderten Partners.',
        monat: 'Je Monat {monat}. Pro eingezahltem Euro legt der Staat {quote} obendrauf.',
      },
      tipps: {
        unter25MitKindern: 'Für die volle Kinderzulage genügen 25 EUR im Monat.',
        unter30KeineKinder: 'Bis 360 EUR Jahresbeitrag gibt es 50 Prozent Zuschuss.',
        unter150: 'Erst bei 150 EUR im Monat ist die höchste Grundzulage erreicht.',
        bei150: 'Mit diesem Beitrag schöpft der förderberechtigte Partner die Grundzulage aus.',
      },
      hinweise: {
        immer: 'Dazu kann der mitgeförderte Partner bis zu 175 EUR Grundzulage bekommen, wenn er mindestens 120 EUR im Jahr in einen eigenen Vertrag einzahlt.',
      },
      teaser: { titel: 'Nach dem Speichern: Langfristmodell des Partners', text: 'Alter und Steuersatz sind einstellbar. Den Partner rechnen wir gesondert.' },
      knopfMitBetrag: 'Berechnung speichern & Paar-Check anfragen',
      knopfOhneAnspruch: 'Paar-Check anfragen',
      kleingedruckt: 'Gerechnet mit den Regeln ab 2027 für den Partner, der selbst förderberechtigt ist. Der mitgeförderte Partner hat eine eigene Rechnung mit höchstens 175 EUR. Kosten, Kurse und Steuern sind nicht eingerechnet, die Beiträge sind für die Rente bestimmt.',
    },
  },
  check: {
    eyebrow: 'Unverbindlich, für euch beide',
    ueberschrift: 'Euer Zuschuss-Check als Paar',
    unterzeile: 'Wir klären, wer von euch selbst förderberechtigt ist, und stimmen beide Verträge aufeinander ab.',
    karten: [
      { icon: 'zulage', titel: 'Paarrechnung speichern', text: 'Der Beitrag des förderberechtigten Partners geht in die Vormerkung. Für die Rückmeldung genügen dein Vorname und eine Mailadresse.' },
      { icon: 'check', titel: 'Status beider klären', text: 'Im Vorabcheck schauen wir, ob dein Partner nicht doch selbst förderberechtigt ist, und welche Unterlagen ihr braucht.' },
      { icon: 'familien', titel: 'Zwei Verträge abstimmen', text: 'Wir planen beide Beiträge so, dass die Zulage des mitgeförderten Partners nicht liegen bleibt.' },
    ],
    ablaufzeile: 'Nach eurer Vormerkung meldet sich Healio, gern auch für einen Termin mit euch beiden.',
    startzeile: 'Neue Verträge für beide Partner gibt es ab 1. Januar 2027. Gerechnet wird je Beitragsjahr.',
    knopfTermin: 'Paar-Check vormerken',
    knopfRueckruf: 'Rückruf für uns beide',
  },
  vormerkung: {
    ueberschrift: 'Eure Paarrechnung vormerken',
    intro: 'Nach dem Absenden siehst du das Modell für den förderberechtigten Partner. Den mitgeförderten Partner rechnen wir im Vorabcheck.',
  },
  passt: {
    passtTitel: 'Passend für euch, wenn',
    passtItems: [
      'ihr verheiratet seid oder in eingetragener Partnerschaft lebt,',
      'einer von euch selbst förderberechtigt ist und der andere nicht,',
      'der Partner ohne eigene Förderung 10 EUR im Monat in einen eigenen Vertrag zahlen kann,',
      'ihr fürs Alter beide etwas aufbauen wollt.',
    ],
    passtNichtTitel: 'Nicht das Richtige, wenn',
    passtNichtItems: [
      'ihr ohne Trauschein und ohne eingetragene Partnerschaft zusammenlebt. Dann gibt es keine mittelbare Förderung.',
      'ihr an das Geld vor dem Ruhestand heranwollt. Bei vorzeitiger Auszahlung geht die Förderung zurück.',
      'ihr lieber über eine Bank oder einen Onlinebroker anlegen wollt. Über Healio laufen ausschließlich Versicherungsvarianten.',
    ],
  },
  faq: [
    { question: 'Mein Partner arbeitet nicht. Bekommt er trotzdem eine Zulage?', answer: 'Ja, wenn ihr verheiratet seid oder in eingetragener Partnerschaft lebt und du selbst förderberechtigt bist und einzahlst. Dann kann dein Partner mittelbar gefördert werden: höchstens 175 EUR Grundzulage, mit mindestens 120 EUR im Jahr im eigenen Vertrag.' },
    { question: 'Wie hoch ist die Zulage für meinen Partner genau?', answer: 'Höchstens 175 EUR im Jahr. Gerechnet wird anhand der geförderten Beiträge des förderberechtigten Partners. Die genaue Zahl ermitteln wir im Check für euch beide.' },
    { question: 'Gilt das auch ohne Trauschein?', answer: 'Nein. Die mittelbare Förderung ist für Ehe- und Lebenspartner vorgesehen, die nicht dauernd getrennt leben. Ohne Ehe oder eingetragene Partnerschaft braucht jeder eine eigene Förderberechtigung.' },
    { question: 'Bekommt mein Partner auch den Startbonus?', answer: 'Nein. Den Startbonus von 200 EUR bekommt nur, wer eine eigene Förderberechtigung hat und am Anfang des Beitragsjahres noch nicht 25 ist.' },
    { question: 'Was ändert sich, wenn mein Partner wieder arbeitet?', answer: 'Arbeitet er rentenversicherungspflichtig, ist er selbst förderberechtigt. Dann gilt für ihn die volle Rechnung mit bis zu 540 EUR Grundzulage statt höchstens 175 EUR.' },
  ],
  quellen: [
    { id: 'gesetz', wofuer: 'Höchstbetrag 175 EUR und Mindestbeitrag 120 EUR' },
    { id: 'zfaFoerderung', wofuer: 'Wer mittelbar gefördert werden kann' },
    { id: 'rv84', wofuer: 'Startbonus nur bei eigener Berechtigung' },
    { id: 'zfa', wofuer: 'Förderwechsel bei Riester-Verträgen' },
    { id: 'rv10a', wofuer: 'Wer selbst förderberechtigt ist' },
  ],
  weiterlesen: ['altersvorsorgedepot-wer-ist-berechtigt', 'altersvorsorgedepot-was-ist-das'],
  weiterlesenTitel: 'Mehr zur Förderberechtigung',
  abschlussKnopf: 'Zulage für uns beide durchrechnen',
  verwandt: ['eltern', 'riester', 'elternzeit', 'selbststaendige', 'kindergeld-endet', 'riester-kuendigen', 'unter-25'],
  fussHinweis: 'Allgemeine Information für Ehepaare, bei denen nur ein Partner selbst förderberechtigt ist. Keine Steuer- oder Rechtsberatung. Depots können schwanken.',
};
