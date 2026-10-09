/**
 * Texte für /altersvorsorgedepot, für den Release09.10.2026 präzisiert.
 * Amtliche Faktenprüfung08.10.2026; Kalender und Webinar noch nicht bereit.
 * Persönliche Anfragen nutzen den bestehenden Kontaktweg.
 *
 * Die beiden Rechner-Ergebnissätze mit echten Platzhaltern ({Zulage},
 * {Zulage/12}, {Quote}) stehen nicht hier als Textbaustein, sondern werden
 * in ZulagenRechner.jsx direkt aus den Rechenwerten zusammengesetzt. Ihr
 * Wortlaut folgt trotzdem exakt Abschnitt 3 der Vorlage.
 */

// Noch keine organisatorisch bestätigte Webinar- oder Kalenderbuchung.
// Die öffentliche Seite nutzt bis dahin den bestehenden Kontaktweg.
export const WEBINAR_LINK = '';

// Ein späterer Kalenderlink wird erst nach organisatorischer Prüfung aktiviert.
export const CHECK_BUCHUNG_URL = '';
export const CHECK_BUCHUNG_BEREIT = false;
export const CHECK_KONTAKT_URL = '/kontakt#kontaktformular';

export const CANONICAL_URL = 'https://healio.de/altersvorsorgedepot';

// Keine unbestätigten Termine als buchbare Auswahl veröffentlichen.
export const WEBINAR_TERMINE = [];

export const WEBINAR_SLOT_IDS = WEBINAR_TERMINE.map((termin) => termin.id);

export const getWebinarTermin = (webinarSlot) => (
  WEBINAR_TERMINE.find((termin) => termin.id === webinarSlot) || null
);

const STANDARD_VOREINSTELLUNG = {
  monatsbeitrag: 50, kinder: 0, unter25: false, selbststaendig: false, riester: false,
};

// Abschnitt 1: Hero. Varianten tauschen nur Eyebrow, H1, Unterzeile, Fußnote,
// die Reihenfolge der Kacheln in der Angebotskarte (kachelFokus: diese Kachel
// steht vorn) und die Rechner-Voreinstellung, alles andere bleibt gleich.
export const VARIANTEN = {
  standard: {
    eyebrow: 'Neu ab 1. Januar 2027: das Altersvorsorgedepot',
    h1: 'Bis zu 540 EUR im Jahr vom Staat für deine Rente. Plus bis zu 300 EUR je zugeordnetem Kind.',
    unterzeile: 'Auf jeden Euro, den du fürs Alter zurücklegst, legt der Staat bis zu 50 Cent drauf. Ab Januar gilt das auch für Selbstständige. Wie viel für dich drin ist, rechnest du hier in einer Minute aus.',
    fussnote: 'Für unmittelbar Förderberechtigte. Kinderzulage bei Kindergeldanspruch und gesetzlicher Zuordnung.',
    kachelFokus: null,
    voreinstellung: STANDARD_VOREINSTELLUNG,
  },
  selbststaendige: {
    eyebrow: 'Neu für Selbstständige ab 2027',
    h1: 'Selbstständig? Ab 2027 ist die Zulage auch für weitere Selbstständige möglich.',
    unterzeile: 'Bis zu 540 EUR Zulage im Jahr. Ab 2027 sind Selbstständige unter 67 grundsätzlich dabei, wenn sie im Beitragsjahr selbstständige Einkünfte erzielen und dafür eine Einkommensteuererklärung abgeben.',
    fussnote: null,
    kachelFokus: 'neu',
    voreinstellung: {
      monatsbeitrag: 150, kinder: 0, unter25: false, selbststaendig: true, riester: false,
    },
  },
  eltern: {
    eyebrow: 'Für Eltern: die neue Kinderzulage',
    h1: 'Zwei Kinder, 25 EUR im Monat: Der Staat legt 750 EUR im Jahr drauf.',
    unterzeile: 'Beispiel im neuen Fördersystem ab 1. Januar 2027: Auf 300 EUR Eigenbeitrag kommen 150 EUR Grundzulage und 600 EUR Kinderzulage.',
    fussnote: 'Bei unmittelbarer Förderberechtigung und zwei zugeordneten zulagenberechtigten Kindern mit Kindergeldanspruch. Vor Kosten und Wertentwicklung.',
    kachelFokus: 'kinderzulage',
    voreinstellung: {
      monatsbeitrag: 25, kinder: 2, unter25: false, selbststaendig: false, riester: false,
    },
  },
  riester: {
    eyebrow: 'Riester-Vertrag? Das ändert sich 2027',
    h1: 'Dein Riester-Vertrag kann ab 2027 ins neue Depot umziehen. Erst prüfen, dann entscheiden.',
    unterzeile: 'Eine Kündigung mit Auszahlung kann Zulagen und Steuerermäßigungen kosten. Ob Behalten, Ruhenlassen oder geregeltes Übertragen für dich passt, prüfen wir anhand der Verträge.',
    fussnote: null,
    kachelFokus: null,
    voreinstellung: {
      monatsbeitrag: 50, kinder: 0, unter25: false, selbststaendig: false, riester: true,
    },
  },
  einsteiger: {
    eyebrow: 'Unter 25? Dann gibt es einen Startbonus',
    h1: '200 EUR Startbonus vom Staat, wenn du zu Jahresbeginn unter 25 bist.',
    unterzeile: 'Dazu legt der Staat auf jeden Euro bis zu 50 Cent drauf. Schon ab 10 EUR im Monat.',
    fussnote: null,
    kachelFokus: 'startbonus',
    voreinstellung: {
      monatsbeitrag: 30, kinder: 0, unter25: true, selbststaendig: false, riester: false,
    },
  },
};

export const FUER_WERTE = ['selbststaendige', 'eltern', 'riester', 'einsteiger'];

/** Unbekannter oder fehlender ?fuer=-Wert fällt auf die Standardvariante zurück. */
export const getVariante = (fuer) => (FUER_WERTE.includes(fuer) ? VARIANTEN[fuer] : VARIANTEN.standard);

export const hero = {
  knopfRechner: 'Meinen Zuschuss berechnen',
  linkCheck: 'Oder direkt einen Zuschuss-Check anfragen',
  vertrauenszeile: 'Gesetz beschlossen · gilt ab 01.01.2027 · Rechnen ohne Anmeldung',
  // Rechte Seite des Hero: helle Angebotskarte nach dem Muster von /stationaer,
  // ohne Foto und ohne Person. Wert groß, Text klein. Der Schlüssel (key) legt
  // Farbe und Vorrang fest, die Reihenfolge je Variante steht bei VARIANTEN.
  angebotskarte: {
    titel: 'Das legt der Staat ab 2027 drauf',
    kacheln: [
      { key: 'grundzulage', wert: 'bis zu 540 EUR', text: 'Grundzulage im Jahr' },
      { key: 'kinderzulage', wert: 'bis zu 300 EUR', text: 'extra je Kind und Jahr' },
      { key: 'startbonus', wert: '200 EUR', text: 'Startbonus, zu Jahresbeginn unter 25' },
      { key: 'neu', wert: 'Neu', text: 'auch für Selbstständige' },
    ],
    hinweis: '540 EUR Grundzulage bei 150 EUR Monatsbeitrag und unmittelbarer Förderberechtigung. Kinderzulage nur mit Kindergeldanspruch und gesetzlicher Zuordnung. Startbonus einmalig bei erfüllten Voraussetzungen.',
  },
};

/**
 * Kacheln der Angebotskarte in der Reihenfolge der Variante: Die Kachel, die
 * zur Variante passt (kachelFokus), steht vorn, der Rest behält die
 * Grundreihenfolge. Ohne Fokus bleibt alles wie in hero.angebotskarte.
 */
export const getHeroKacheln = (variante) => {
  const { kacheln } = hero.angebotskarte;
  const erste = kacheln.find((kachel) => kachel.key === variante?.kachelFokus);
  return erste ? [erste, ...kacheln.filter((kachel) => kachel !== erste)] : kacheln;
};

// Abschnitt 2: Drei Beispielkarten.
export const beispiele = {
  ueberschrift: 'Drei Beispiele, was ab Januar drin ist',
  karten: [
    {
      titel: 'Mutter mit zwei Kindern',
      eigenbeitrag: '25 EUR im Monat von ihr.',
      zulage: '750 EUR im Jahr vom Staat.',
      detail: 'Auf 300 EUR Eigenbeitrag kommen 150 EUR Grundzulage und 600 EUR Kinderzulage.',
    },
    {
      titel: 'Selbstständig, keine Kinder',
      eigenbeitrag: '150 EUR im Monat von ihm.',
      zulage: '540 EUR im Jahr vom Staat.',
      detail: 'Das ist die höchste Grundzulage. Dazu kann er Steuern sparen.',
    },
    {
      titel: 'Azubi mit 20',
      eigenbeitrag: '30 EUR im Monat von ihr.',
      zulage: '180 EUR im Jahr vom Staat.',
      detail: 'Weil sie zu Beginn des Beitragsjahres unter 25 und unmittelbar förderberechtigt ist, kommen einmalig 200 EUR dazu.',
    },
  ],
  kleingedruckt: 'Beispiele für unmittelbar Förderberechtigte mit einem vollen Beitragsjahr ab 2027. Kinderzulage nur bei Kindergeldanspruch und gesetzlicher Zuordnung. Ohne zusätzliche Steuerermäßigung, Vertragskosten und Wertentwicklung; Zulagen fließen in den Vorsorgevertrag.',
};

// Abschnitt 3a: Zuschuss-Check, direkt nach dem Rechner (Anker #zuschuss-check).
// Ziel der Seite ist der Termin. Das Webinar bleibt der weiche Weg für alle,
// die noch nicht so weit sind (Abschnitt 8).
export const zuschussCheck = {
  eyebrow: 'Unverbindlich und persönlich',
  ueberschrift: 'Dein persönlicher Zuschuss-Check',
  unterzeile: 'Wir prüfen deine Voraussetzungen, deinen Beitrag und einen vorhandenen Riester-Vertrag. So bereitest du deine Entscheidung mit nachvollziehbaren Zahlen vor.',
  karten: [
    {
      icon: 'zulage',
      titel: 'Deine genaue Zulage',
      text: 'Grundzulage, zugeordnete Kinderzulage und möglicher Startbonus: Wir prüfen deine tatsächlichen Voraussetzungen.',
    },
    {
      icon: 'riester',
      titel: 'Dein Riester-Vertrag',
      text: 'Behalten, ruhen lassen oder übertragen? Kosten, Förderung und Garantien gehören gemeinsam in den Vergleich.',
    },
    {
      icon: 'startplan',
      titel: 'Deine nächsten Schritte',
      text: 'Was du vorbereiten kannst und welche Unterlagen fehlen. Konkrete Angebote prüfen wir erst, wenn sie tatsächlich verfügbar sind.',
    },
  ],
  ablaufzeile: 'Ein unverbindlicher Check ist für etwa 20 Minuten per Video oder Telefon gedacht. Den Termin stimmen wir über deine Kontaktanfrage mit dir ab.',
  startzeile: 'Jetzt in Ruhe prüfen, im neuen Jahr starten. Wer früh im Jahr anfängt, verteilt seinen Beitrag für die volle Zulage auf mehr Monate.',
  knopfTermin: 'Zuschuss-Check anfragen',
  knopfRueckruf: 'Rückruf anfragen',
  // Nur einschalten, wenn es stimmt.
  kapazitaetHinweis: false,
  kapazitaetText: 'Wir sind ein kleines Team und vergeben pro Woche nur eine begrenzte Zahl an Checks.',
};

// Abschnitt 3: Rechner. Die Tipps und Hinweise sind reine Textbausteine, die
// Bedingung dafür steckt in ZulagenRechner.jsx (siehe Kommentare dort).
export const rechner = {
  ueberschrift: 'Wie viel Zuschuss könnte zu deinem Beitrag kommen?',
  unterzeile: 'Beispiel für unmittelbar Förderberechtigte. Ohne Anmeldung, Ergebnis sofort.',
  labels: {
    monatsbeitrag: 'Wie viel möchtest du im Monat zurücklegen?',
    kinder: 'Wie viele zulagenberechtigte Kinder sind dir zugeordnet und haben Kindergeldanspruch?',
    unter25: 'Bist du zu Beginn des Beitragsjahres unter 25?',
    selbststaendig: 'Bist du selbstständig?',
    riester: 'Hast du schon einen Riester-Vertrag?',
  },
  ergebnisLabels: {
    grundzulage: 'Grundzulage',
    kinderzulage: 'Kinderzulage',
    startbonus: 'Startbonus (einmalig)',
  },
  unterMindestbetragText: 'Für die Zulage brauchst du mindestens 10 EUR im Monat.',
  tipps: {
    unter30KeineKinder: 'Mit 30 EUR im Monat holst du dir die volle 50-Prozent-Stufe.',
    unter25MitKindern: 'Mit 25 EUR im Monat bekommst du die volle Kinderzulage von 300 EUR je Kind.',
    unter150: 'Die höchste Grundzulage von 540 EUR gibt es ab 150 EUR im Monat.',
    bei150: 'Bei 150 EUR im Monat ist die höchste Grundzulage von 540 EUR erreicht. Ein höherer Beitrag erhöht die Grundzulage nicht.',
  },
  hinweise: {
    selbststaendig: 'Neu für dich: Ab 2027 sind Selbstständige unter 67 grundsätzlich förderberechtigt, wenn sie im Beitragsjahr selbstständige Einkünfte erzielen und dafür eine Einkommensteuererklärung abgeben.',
    riester: 'Bei einem Riester-Vertrag erst Behalten, Ruhenlassen und geregeltes Übertragen vergleichen. Eine Kündigung mit Auszahlung kann Förderung kosten. Ein neuer geförderter Vertrag kann die Fördersystematik weiterer Riester-Bestandsverträge verändern.',
    immer: 'Dazu prüft das Finanzamt, ob du zusätzlich Steuern sparst.',
  },
  // Hauptknopf unter dem Ergebnis. {zulageJahr} setzt ZulagenRechner.jsx ein, im
  // deutschen Format und ohne Nachkommastellen, wenn der Betrag ganzzahlig ist.
  knopfMitBetrag: 'Zuschuss-Check zu meiner Rechnung anfragen',
  knopfOhneAnspruch: 'Zuschuss-Check anfragen',
  webinarLink: 'Erst den Zuschuss-Fahrplan ansehen',
  kleingedruckt: 'Unverbindliches Beispiel für unmittelbar Förderberechtigte im neuen System ab 2027. Kinderzulage nur bei Kindergeldanspruch und gesetzlicher Zuordnung; die Regeln unterscheiden sich für 2027 und ab 2028. Mittelbar berechtigte Partner haben eine eigene Rechnung. Vor Vertragskosten und Wertentwicklung; ohne zusätzliche Steuerermäßigung. Grundsätzlich bis zur Rente gebunden, keine Anlage- oder Steuerberatung.',
};

// Abschnitt 4: Problem, Verstärkung, Lösung.
export const problemLoesung = {
  ueberschrift: 'Hier liegt Geld auf der Straße',
  bloecke: [
    {
      titel: 'Bisher:',
      text: 'Die gesetzliche Rente reicht bei vielen nicht. Riester galt als kompliziert und teuer. Und Selbstständige waren meist ganz außen vor.',
    },
    {
      titel: 'Was liegen bleibt:',
      text: 'Zulagen gibt es nur für Jahre, in denen du einzahlst. Startest du erst 2029, zahlt dir niemand die Zulagen für 2027 und 2028 nach.',
    },
    {
      titel: 'Ab Januar:',
      text: 'Die neue Förderung steigt mit deinem Beitrag, geeignete ETFs sind möglich und die Auszahlung wird flexibler. Ob die neue Förderung für dich besser ist, muss gerade bei Riester-Bestand individuell verglichen werden.',
    },
  ],
};

// Abschnitt 5: Das ist neu.
export const neuerungen = {
  ueberschrift: 'Was sich ab Januar ändert und was du davon hast',
  punkte: [
    {
      titel: 'Schon 10 EUR im Monat bringen dir Geld vom Staat.',
      text: 'Für unmittelbar Förderberechtigte hängt die neue Grundzulage vom Jahresbeitrag ab. Die persönliche Berechtigung muss trotzdem geprüft werden.',
    },
    {
      titel: 'Für jedes Kind bis zu 300 EUR im Jahr extra.',
      text: 'Bei Kindergeldanspruch und gesetzlicher Zuordnung gibt es je Kind bis zu 300 EUR. Dafür reichen im Beispiel 300 EUR eigener Jahresbeitrag.',
    },
    {
      titel: 'Staatsgeld für die Rente, auch ohne Chef.',
      text: 'Neu sind weitere Selbstständige unter 67 mit gesetzlich erfassten Einkünften und abgegebener Steuererklärung für das Beitragsjahr.',
    },
    {
      titel: 'Du vergleichst Anlagechancen und Beitragsgarantie.',
      text: 'Depot und Standarddepot haben keine Beitragsgarantie; Verluste sind möglich. Garantieprodukte sagen zu Beginn der Auszahlungsphase 80 oder 100 Prozent der Beiträge einschließlich Zulagen zu.',
    },
    {
      titel: 'Erträge werden während des Sparens nicht jährlich bei dir besteuert.',
      text: 'Der geförderte Vertrag arbeitet mit nachgelagerter Besteuerung. Die spätere Auszahlung ist grundsätzlich steuerlich relevant; eine Wertsteigerung wird nicht zugesagt.',
    },
    {
      titel: 'Im Alter planst du selbst, wie das Geld kommt.',
      text: 'Lebenslange Rente oder Auszahlplan bis mindestens 85, und zu Beginn bis zu 30 Prozent auf einmal.',
    },
  ],
};

// Abschnitt 6: Für wen es passt und für wen nicht.
export const fuerWenEs = {
  passtTitel: 'Passt zu dir, wenn',
  passtItems: [
    'du fürs Alter vorsorgen willst und keinen Zuschuss verschenken möchtest,',
    'du Kinder hast, für die du Kindergeld bekommst,',
    'du selbstständig bist und bisher kaum Rente aufbaust,',
    'du einen Riester-Vertrag hast und wissen willst, was jetzt klug ist.',
  ],
  passtNichtTitel: 'Passt nicht, wenn',
  passtNichtItems: [
    'du das Geld in den nächsten Jahren brauchst. Eine vorzeitige Auszahlung kann zur Rückforderung von Zulagen und Steuerermäßigungen führen; gesetzliche Sonderfälle sind gesondert zu prüfen.',
    'du ausschließlich ein reines Bank- oder Broker-Depot suchst. Healio vermittelt nur Versicherungsvarianten; für andere Wege brauchst du einen dafür zugelassenen Anbieter oder Vermittler.',
  ],
};

// Abschnitt 7: Ablauf in vier Schritten.
export const ablauf = {
  ueberschrift: 'So kommst du an deinen Zuschuss',
  schritte: [
    { titel: 'Zuschuss berechnen.', text: 'Eine Minute, ohne Anmeldung.' },
    { titel: 'Zuschuss-Check anfragen.', text: 'Über unser Kontaktformular. Wir stimmen einen Termin per Video oder Telefon mit dir ab.' },
    { titel: 'Entscheidung vorbereiten.', text: 'Voraussetzungen, Riester-Bestand und offene Fragen gemeinsam ordnen.' },
    { titel: 'Konkretes Angebot prüfen.', text: 'Die neuen Produkte können ab 2027 angeboten werden. Ein Abschluss setzt tatsächlich verfügbare, geprüfte Unterlagen voraus.' },
  ],
};

// Abschnitt 8: Webinar-Anmeldung.
export const webinarAnmeldung = {
  eyebrow: 'Noch nicht so weit?',
  ueberschrift: 'Dein Zuschuss-Fahrplan für den Start 2027',
  punkte: [
    'Wie viel dir zusteht und wie du das Maximum herausholst',
    'Riester behalten, ruhen lassen oder umziehen: die Entscheidung in Ruhe',
    'Die fünf teuersten Fehler beim Start und wie du sie vermeidest',
  ],
  bonus: 'Lies den Fahrplan direkt als PDF, ohne Anmeldung. Persönliche Fragen kannst du über unser bestehendes Kontaktformular stellen.',
  knopf: 'Frage zum Altersvorsorgedepot stellen',
  unterKnopf: 'Ein Webinar-Termin und sein Zugang werden erst angeboten, wenn sie organisatorisch feststehen.',
};

// Abschnitt 9: Wer dich begleitet. Healio ist der Absender, keine einzelne
// Person steht im Vordergrund. Die Rollenkarten tragen den Abschnitt allein.
export const werDahinter = {
  ueberschrift: 'Wer dich begleitet',
  text: 'Healio kommt aus Hamburg. Wir helfen Menschen, Kassenboni und passende Vorsorge zu verstehen. Beim Altersvorsorgedepot vermittelt Healio nur Versicherungsvarianten. Reine Bank- und Broker-Depots gehören nicht zu unserem Vermittlungsangebot.',
  rollen: [
    {
      icon: 'webinar',
      titel: 'In Ratgeber und Fahrplan',
      text: 'Wir erklären Förderung, Kosten und Risiken an nachvollziehbaren Beispielen. Die Inhalte sind ohne Registrierung zugänglich.',
    },
    {
      icon: 'check',
      titel: 'Im Zuschuss-Check',
      text: 'Wir prüfen deine Voraussetzungen und ordnen die nächsten Schritte. Eine Produktentscheidung braucht konkrete, tatsächlich verfügbare Angebote.',
    },
  ],
  // Porträts, gleich groß nebeneinander über den Rollenkarten.
  // Erst füllen, wenn beide Personen zugestimmt haben.
  // Leer = nichts wird angezeigt.
  // Eintrag: { name: 'Vorname Nachname', rolle: 'Moderation im Webinar', foto: '/images/….webp' }
  team: [],
  quellenzeile: 'Gesetzliche Grundlagen und amtliche Quellen geprüft, Stand 8. Oktober 2026.',
};

// Abschnitt 10: Häufige Fragen. question/answer, damit createFAQSchema()
// aus src/lib/createSchemaMarkup.js die Felder direkt verwenden kann.
export const faq = [
  {
    question: 'Was ist das Altersvorsorgedepot?',
    answer: 'Ein neuer, staatlich geförderter Vertrag für deine private Rente. Für neue Verträge ersetzt er ab 2027 die Riester-Rente. Du sparst monatlich, der Staat zahlt Zulagen dazu, und dein Geld kann in Fonds und ETFs wachsen.',
  },
  {
    question: 'Was passiert im Zuschuss-Check?',
    answer: 'Wir prüfen deine Fördervoraussetzungen, deinen Beitrag und einen vorhandenen Riester-Vertrag. Den unverbindlichen Termin stimmen wir nach deiner Kontaktanfrage ab. Konkrete Anbieterangebote vergleichen wir erst, wenn sie tatsächlich verfügbar sind.',
  },
  {
    question: 'Muss ich nach dem Check etwas abschließen?',
    answer: 'Nein. Der Check ist unverbindlich. Du entscheidest danach in Ruhe, ob und wann du startest.',
  },
  {
    question: 'Ab wann gibt es das?',
    answer: 'Die Reform ist beschlossen. Neue Produkte können ab 1. Januar 2027 angeboten werden. Bis dahin kannst du dich informieren, rechnen und deine Fragen vorbereiten. Die Verfügbarkeit eines konkreten Angebots muss gesondert geprüft werden.',
  },
  {
    question: 'Wie hoch ist die Zulage?',
    answer: 'Für unmittelbar Förderberechtigte gibt es 50 Prozent auf die ersten 360 EUR Eigenbeitrag im Jahr und 25 Prozent auf den Teil bis 1.800 EUR. Höchstens 540 EUR Grundzulage werden bei 150 EUR Monatsbeitrag erreicht. Mindestens 120 EUR Jahresbeitrag sind nötig. Mittelbar berechtigte Partner haben andere Regeln.',
  },
  {
    question: 'Wie funktioniert die Kinderzulage?',
    answer: 'Für jedes dir gesetzlich zugeordnete zulagenberechtigte Kind mit Kindergeldanspruch gibt es im neuen System bis zu 300 EUR im Jahr. Dafür reichen im Beispiel 300 EUR Eigenbeitrag im Jahr. Die Zuordnungsregeln unterscheiden sich für 2027 und ab 2028; dieselbe Kinderzulage geht nicht gleichzeitig an beide Eltern.',
  },
  {
    question: 'Können Selbstständige mitmachen?',
    answer: 'Ja, das ist neu. Selbstständige unter 67 mit Einkünften aus Gewerbe oder aus den gesetzlich erfassten freien Berufen sind ab 2027 grundsätzlich förderberechtigt, wenn sie für das Beitragsjahr eine Einkommensteuererklärung abgeben. Für Pflichtmitglieder berufsständischer Altersversorgung unter 67 gelten eigene Voraussetzungen zu Beschäftigung, Versorgungsabgabe und rechtzeitiger Einwilligung zur Datenübermittlung. Die Berufsbezeichnung allein reicht nicht.',
  },
  {
    question: 'Was passiert mit meinem Riester-Vertrag?',
    answer: 'Bestehende Riester-Verträge können weiterlaufen. Behalten, Ruhenlassen oder geregeltes Übertragen müssen anhand von Kosten, Förderung und Garantien verglichen werden. Eine Kündigung mit Auszahlung kann Förderung kosten. Ein neuer geförderter Vertrag ab 2027 führt grundsätzlich einheitlich für deine Riester-Bestandsverträge zur neuen Fördersystematik, ohne alle Guthaben automatisch zu übertragen. Ein Rückwechsel zur alten Förderung ist nicht vorgesehen.',
  },
  {
    question: 'Komme ich vor der Rente an mein Geld?',
    answer: 'Das Geld ist fürs Alter gedacht. Die Auszahlung beginnt grundsätzlich zwischen 65 und 70. Wer vorher eine gesetzliche Altersleistung erhält, kann unter den gesetzlichen Voraussetzungen früher starten. Bei einer vorzeitigen Kündigung werden grundsätzlich Zulagen und Steuervorteile zurückgefordert; gesetzliche Sonderfälle müssen getrennt geprüft werden.',
  },
  {
    question: 'Wie wird später ausgezahlt?',
    answer: 'Du wählst zwischen einer lebenslangen Rente und einem Auszahlplan bis mindestens 85. Zu Beginn kannst du dir bis zu 30 Prozent auf einmal auszahlen lassen.',
  },
  {
    question: 'Welche Verluste und Garantien sind möglich?',
    answer: 'Depot und Standarddepot enthalten keine Beitragsgarantie. Kurse schwanken, Verluste sind möglich, Gewinne nicht garantiert. Bei einem Garantieprodukt sagt der Anbieter zu Beginn der Auszahlungsphase 80 oder 100 Prozent der Beiträge einschließlich Zulagen zu. Das garantiert weder Rendite noch Kaufkraft und gilt nicht pauschal bei einer vorzeitigen Kündigung.',
  },
  {
    question: 'Welche Produktwege vermittelt Healio?',
    answer: 'Healio vermittelt nur Versicherungsvarianten innerhalb der erlaubten Vermittlungstätigkeit. Reine Bank- oder Broker-Depots gehören nicht dazu. Ein konkretes Produktangebot setzt verfügbare, geprüfte Anbieterunterlagen voraus.',
  },
  {
    question: 'Wie verdient Healio Geld?',
    answer: 'Nur wenn du über uns einen Vertrag abschließt. Dann zahlt der Anbieter Healio eine Vergütung, die in den Vertragskosten enthalten ist. Alle Kosten deines Vertrags siehst du vor dem Abschluss schwarz auf weiß.',
  },
];

// Abschnitt 11: Fuß-Hinweis der Seite.
export const fussHinweis = 'Diese Seite gibt allgemeine Informationen zur Reform der geförderten privaten Altersvorsorge (Stand 8. Oktober 2026). Sie ersetzt keine persönliche Beratung und keine Steuerberatung. Wertpapiere schwanken im Wert, frühere Wertentwicklungen sind kein verlässlicher Hinweis auf künftige Ergebnisse.';

// Abschnitt 12: Dankeseite /altersvorsorgedepot/danke (noindex).
export const danke = {
  h1Mit: (vorname) => `Dein nächster Schritt, ${vorname}`,
  h1Ohne: 'Dein nächster Schritt',
  text: 'Hier findest du den Zuschuss-Fahrplan. Eine Kontaktanfrage oder Webinar-Anmeldung ist durch den Aufruf dieser Seite noch nicht erfolgt.',
  // Hervorgehobener Kasten über den Knöpfen. {zulageJahr} kommt aus dem Rechner
  // (Navigations-State), im deutschen Format ohne Nachkommastellen bei ganzen Beträgen.
  checkKastenMitBetrag: 'Deine Beispielrechnung: {zulageJahr} EUR Zulagen im Jahr. Lass uns deine tatsächlichen Voraussetzungen gemeinsam prüfen.',
  checkKastenOhneBetrag: 'Möchtest du deine Fördervoraussetzungen gemeinsam prüfen? Frag einen unverbindlichen Zuschuss-Check an.',
  checkKastenKnopf: 'Zuschuss-Check anfragen',
  fahrplanKnopf: 'Zuschuss-Fahrplan 2027 herunterladen',
  teilenBlockTitel: 'Kennst du jemanden, der Geld liegen lässt?',
  teilenText: 'Schau mal, ab Januar legt der Staat auf die Rente drauf, sogar für Selbstständige und Eltern: healio.de/altersvorsorgedepot',
  teilenKnopf: 'Per WhatsApp teilen',
};
