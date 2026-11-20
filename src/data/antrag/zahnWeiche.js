// Gemeinsame Zahn-Maske mit Weiche zwischen der Bayerischen und der UKV
// (Paket C, Schritte 7 bis 10, 20.11.2026). Grundlage:
// Healio/Antragsstrecken/BAUPLAN-PAKET-C-D-ERGAENZUNG-2026-11-19.md
// Teil 1.0 bis 1.8 (Regeln), Teil 2 (Texte, wortgleich), Teil 5 und 6
// (Voreinstellungen, je eine Konstante).
//
// Ablauf: V1 Geburtsdatum, V2 Krankenversicherung, Einwilligung vor den
// Zahnfragen, V3 Behandlung (V3a Ziehen), V4 fehlende Zähne, V5 nur, wenn die
// Weiche sonst zur Bayerischen ginge. Danach genau ein Ziel: UKV, Bayerische
// (mit oder ohne ZAHN Sofort) oder Telefon und Termin. Keine Wunschfrage, keine
// Stufenvorgabe (1.3). Die Vorfragen werden nie in die Maske übernommen, der
// Kunde beantwortet die Fragen der Gesellschaft selbst (C1). Übernommen werden
// nur Geburtsdatum und PLZ (Teil 5 Nr. 10).
//
// Online geleitet wird nur, was nach 1.0 belegt oder gleichgestellt ist. Jede
// Zeile der Matrix (MATRIX) trägt Klasse und Beleg. Die offenen UKV-Fälle liest
// die Weiche aus der UKV-Definition (UKV_BELEGT, Altersregeln, Mindestbeitrag),
// damit Weiche, Einzelmaske, Dienst und Nita nie auseinanderlaufen.
//
// Reine Regel ohne Abhängigkeiten außer den Definitionen und regeln.js
// (Node-fähig, Kopie im Antragsdienst unter regeln/antrag/zahnWeiche.js).
// Nichts hier wird gespeichert, gezählt oder gesendet.

import zahn from './zahn.js';
import zahnUkv, { UKV_BELEGT } from './zahnUkv.js';
import {
  altersgrenze, beginnOptionenAus, berechneBeitrag, eintrittsalter, tarifAngeboten, wirkungen,
} from '../../lib/antragsmaske/regeln.js';

// ---------------------------------------------------------------------------
// Voreinstellungen (Teil 5, Teil 6). Jede lässt sich mit einer Zeile drehen.
// ---------------------------------------------------------------------------

// Teil 5 Nr. 2: Kommen beide in Frage, zeigt die Weiche die UKV ohne Stufenvorgabe ('ukv') oder beide Gesellschaften ('beide').
export const WAHLREGEL = 'ukv';
// Teil 5 Nr. 1: „gleichgestellt“ (die Gesellschaft fragt es nicht, „alles nein“ gesehen) gilt als belegt.
export const GLEICHGESTELLT_ONLINE = true;
// Teil 5 Nr. 6: Heilfürsorge zur Bayerischen (laut PIB zugelassen, nie gesehen). false: Telefon.
export const WEICHE_HEILFUERSORGE_BAY = false;
// Teil 5 Nr. 5: Eintrittsalter 18 und 19 zur Bayerischen (Annahme in diesem Alter nie gesehen). false: Telefon.
export const WEICHE_BAY_1819 = false;
// Teil 6 Nr. 2 und Teil 5 Nr. 14: UKV-Ziel bei eingeschalteter Weiche und ausgeschaltetem UKV-Schalter: der heutige Weg
// (Online-Abschluss bei der UKV über den Link mit Healios Kennung, wie auf /zahn). 'telefon' stellt auf Telefon und Termin um.
export const UKV_AUS_ZIEL = 'link';

// Bayerische TABELLE Nr. 37: ZAHN Sofort kostet in allen Altern und Regionen 29,90 Euro im Monat.
export const ZAHN_SOFORT_MONAT = 29.9;
const aufCent = (wert) => Math.round(wert * 100) / 100;
// Ebene 1, B1: Die Bayerische rechnet jährlich 12 Monatsbeiträge minus 2 Prozent auf 10 Cent und rundet Tarif und Baustein je für
// sich, dann addiert sie. Dieselbe Funktion nutzt der Antragsdienst (produkte.mjs), damit Seite und Dienst nie auseinanderlaufen.
export const bayerischeJeZahlweise = (betrag, zahlweise = 'monatlich') => (zahlweise === 'jaehrlich'
  ? Math.round(betrag * 12 * 0.98 * 10 + 1e-9) / 10
  : aufCent(betrag));
// Stufe (schon je Zahlweise) plus Baustein (Monatsbeitrag), gerundet wie die Bayerische.
export const bayerischeMitBaustein = (stufe, bausteinMonat, zahlweise = 'monatlich') => aufCent(stufe + bayerischeJeZahlweise(bausteinMonat, zahlweise));

// ---------------------------------------------------------------------------
// Texte (Teil 2, wortgleich). Eckige Klammern aus Teil 2 sind Werte aus dem Code.
// ---------------------------------------------------------------------------

export const EINSTIEG = Object.freeze({
  titel: 'Zahnzusatzversicherung online beantragen',
  punkte: [
    'Ein paar kurze Fragen, dann siehst du, wo du mit deinen Angaben online abschließen kannst und was es kostet.',
    'Du bleibst die ganze Zeit bei Healio.',
    'Die Bestätigung bekommst du per E-Mail.',
  ],
  erstinformation: { vor: 'Wie Healio als Versicherungsmakler arbeitet, steht in unserer ', link: 'Erstinformation', href: '/erstinformation', nach: '.' },
  seitenspalteTitel: 'So geht es weiter',
  seitenspalte: ['Kurze Fragen zu deinen Zähnen', 'Gesellschaft, Tarif und Beitrag', 'Fragen der Gesellschaft beantworten und Antrag absenden'],
  // 2.9 Nr. 7
  seitenspalteFuss: 'Deine Antworten zu deinen Zähnen bleiben auf dieser Seite. Deinen Antrag senden wir erst, wenn du ihn bestätigst.',
});

// Nachbesserung Paket C (W2): Ist die UKV-Maske aus (Teil 6 Nr. 2), führt die Weiche UKV-Kunden per Link zur UKV. Dann gilt
// „Du bleibst die ganze Zeit bei Healio“, „Die Bestätigung bekommst du per E-Mail“ und „Deinen Antrag senden wir …“ nicht für
// jeden. Solange das Ziel nicht feststeht, zeigt die Seite diese Sätze dann nicht.
export const einstiegPunkte = ({ ukvBeiHealio = true } = {}) => (ukvBeiHealio ? EINSTIEG.punkte : EINSTIEG.punkte.slice(0, 1));
export const seitenspalteFuss = ({ ukvBeiHealio = true } = {}) => (ukvBeiHealio ? EINSTIEG.seitenspalteFuss : 'Deine Antworten zu deinen Zähnen bleiben auf dieser Seite.');

export const VORFRAGEN = Object.freeze({
  V1: {
    id: 'V1', typ: 'datum', text: 'Wann bist du geboren?', hilfe: 'Davon hängt ab, welche Tarife du online abschließen kannst und was sie kosten.', platzhalter: 'TT.MM.JJJJ',
  },
  V2: {
    id: 'V2',
    text: 'Wie bist du krankenversichert?',
    hilfe: 'Eine Zahnzusatzversicherung ergänzt deine Krankenversicherung. Deshalb fragen wir das zuerst.',
    optionen: [
      { id: 'pflicht', label: 'Gesetzlich, pflichtversichert', sub: 'Bei einer Krankenkasse, zum Beispiel als Angestellter unter der Versicherungspflichtgrenze, Azubi oder Rentner' },
      { id: 'freiwillig', label: 'Gesetzlich, freiwillig versichert', sub: 'Bei einer Krankenkasse, zum Beispiel als Selbständiger oder mit Einkommen über der Versicherungspflichtgrenze' },
      { id: 'privat', label: 'Privat', sub: 'Bei einer privaten Krankenversicherung' },
      { id: 'heilfuersorge', label: 'Heilfürsorge', sub: 'Freie Heilfürsorge, zum Beispiel bei Polizei oder Bundeswehr. Beihilfe ist keine Heilfürsorge.' },
    ],
  },
  V3: {
    id: 'V3',
    text: 'Hat dein Zahnarzt in den letzten 2 Jahren eine Behandlung empfohlen, ist eine geplant oder läuft sie gerade?',
    hilfe: 'Dazu zählt alles, was dein Zahnarzt angeraten hat. Etwa eine Füllung, Krone, Brücke, Wurzelbehandlung oder Schiene, auch das Ziehen eines Zahns oder das Erneuern von altem Zahnersatz. Ein Heil- und Kostenplan zählt auch.',
    optionen: [
      { id: 'nein', label: 'Nein, nichts davon', sub: 'In den letzten 2 Jahren wurde nichts empfohlen, und es ist nichts geplant oder in Arbeit' },
      { id: 'steht_an', label: 'Ja, sie steht an oder läuft gerade', sub: 'Sie ist noch nicht abgerechnet' },
      { id: 'fertig', label: 'Ja, sie ist fertig und abgerechnet', sub: 'Und sonst steht nichts an' },
    ],
  },
  V3a: {
    id: 'V3a', text: 'Soll dabei ein Zahn gezogen werden?', hilfe: 'Das gilt auch für Weisheitszähne.', optionen: [{ id: 'ja', label: 'Ja' }, { id: 'nein', label: 'Nein' }],
  },
  V4: {
    id: 'V4',
    text: 'Fehlen dir Zähne, die noch nicht ersetzt sind?',
    hilfe: 'Wie die Gesellschaft genau zählt, steht gleich in ihrer eigenen Frage.',
    optionen: [{ id: '0', label: 'Nein, keiner' }, { id: '1', label: '1 Zahn' }, { id: '2', label: '2 Zähne' }, { id: '3', label: '3 Zähne' }, { id: '>3', label: 'Mehr als 3' }],
  },
  V5: {
    id: 'V5',
    text: 'Trifft eins davon auf dich zu?',
    liste: [
      'Du hast eine herausnehmbare Voll- oder Teilprothese.',
      'Du hast Zahnersatz, der älter als 10 Jahre ist.',
      'Du hattest in den letzten 3 Jahren Parodontose, Parodontitis oder einen Zahnschmelzdefekt.',
    ],
    hilfe: 'Danach fragt eine der beiden Gesellschaften.',
    optionen: [{ id: 'ja', label: 'Ja, mindestens eins davon' }, { id: 'nein', label: 'Nein, nichts davon' }],
  },
});

// 2.3 Einwilligung vor den Zahnfragen. Entwurf bis Anwalt D1.
export const EINWILLIGUNG = Object.freeze({
  key: 'weicheEinwilligung',
  titel: 'Bevor es um deine Zähne geht',
  text: 'Die nächsten Fragen betreffen deine Zähne. Das sind Gesundheitsangaben. Healio nutzt deine Antworten nur, um auszuwählen, bei welcher von zwei Gesellschaften du online abschließen kannst. Die Antworten bleiben auf dieser Seite. Healio speichert sie nicht und gibt sie an keine Gesellschaft weiter. In deinen Antrag übernehmen wir sie nicht, denn die Fragen der Gesellschaft beantwortest du danach selbst. Brichst du ab, ist nichts gespeichert.',
  haken: 'Ich bin einverstanden, dass Healio meine Antworten zu meinen Zähnen für die Auswahl der Gesellschaft verwendet.',
  datenschutz: { label: 'Datenschutzerklärung', href: '/datenschutz' },
  telefon: 'Lieber am Telefon',
  fehler: 'Bitte setz den Haken, sonst können wir dir die Fragen zu deinen Zähnen nicht stellen.',
});

// 2.8 Satz zur Auswahl. Entwurf bis Anwalt B2.
export const SATZ_AUSWAHL = 'Healio wählt hier nur zwischen zwei Gesellschaften aus: der Bayerischen und der UKV. Andere Versicherer haben wir für diese Auswahl nicht verglichen. Möchtest du ein breiteres Angebot sehen, sprich mit uns.';

const NAME = { zahn: 'Bayerischen', 'zahn-ukv': 'UKV' };
const NOMINATIV = { zahn: 'Bayerische', 'zahn-ukv': 'UKV' };
export const WEICHE_TEXTE = Object.freeze({
  oben: 'Dein Ergebnis',
  titel: (produkt) => `Mit deinen Angaben kannst du online bei der ${NAME[produkt]} abschließen.`,
  karte: 'Tarife mit Beitrag im Monat',
  beginn: (datum) => `Beitrag bei Beginn am ${datum}`,
  amPreis: 'Deine Stufe wählst du im nächsten Schritt.',
  warumTitel: 'Warum diese Gesellschaft',
  gutTitel: 'Gut zu wissen',
  bruecke: (produkt) => `Gleich stellt dir die ${NOMINATIV[produkt]} ihre eigenen Fragen zu deinen Zähnen, im genauen Wortlaut. Einige kennst du schon. Beantworte sie trotzdem neu. Für deinen Vertrag zählen nur diese Antworten. Verbindlich entscheidet die ${NOMINATIV[produkt]} nach deinen Antworten.`,
  knopf: 'Weiter zum Antrag',
  plzFrage: 'Der Beitrag der Bayerischen hängt vom Wohnort ab. Wie lautet deine Postleitzahl?',
  ohneSofort: 'Ohne ZAHN Sofort siehst du die Beiträge im nächsten Schritt.',
  warum: {
    fertig: 'Deine Behandlung ist abgerechnet. Die UKV fragt nach Empfehlungen der letzten zwei Jahre und bietet dir deshalb online keinen Vertrag an. Die Bayerische fragt danach nicht.',
    kv: 'Bei deiner Art der Krankenversicherung bieten wir die UKV online nicht an. Bei der Bayerischen geht es online.',
    sofort: 'Bei dir steht eine Behandlung an oder läuft schon. Die UKV bietet dir dann online keinen Vertrag an. Die Bayerische fragt nicht danach und hat dafür den Baustein ZAHN Sofort.',
    // Entwurf, bis Frank die Wahlregel festlegt.
    ukv: 'Nach deinen Angaben kannst du bei der UKV online abschließen. In diesem Fall zeigt Healio dir die UKV. Ob die Bayerische auch in Frage käme, prüfen wir dann nicht.',
    luecke: (anzahl) => `Dir ${anzahl === '1' ? 'fehlt 1 Zahn' : `fehlen ${anzahl} Zähne`}, ${anzahl === '1' ? 'der' : 'die'} noch nicht ersetzt ${anzahl === '1' ? 'ist' : 'sind'}. Bei der Bayerischen ist dann online kein Abschluss möglich. Bei der UKV geht es mit einem Zuschlag je fehlendem Zahn.`,
  },
  gut: {
    fertig: ['Deine abgerechnete Behandlung ist nicht versichert.'],
    // results.sofort des Zahn-Checks (dentalContent.js), hier kopiert, nicht verlinkt.
    sofort: [
      'ZAHN Sofort kostet 29,90 Euro im Monat zusätzlich zum Zahntarif. Der Baustein endet nach 24 Monaten, der Zahntarif läuft weiter.',
      'Er zahlt bis zu 750 Euro je Kalenderjahr, insgesamt bis zu 1.500 Euro.',
      'Der Versicherungsbeginn laut Versicherungsschein muss vor der Rechnung liegen. Die Behandlung darf noch nicht abgeschlossen oder abgerechnet sein.',
    ],
    luecke: [
      'Zuschlag je fehlendem Zahn und Monat: 10,90 Euro bei ZahnPRIVAT 100, 9,00 Euro bei 90, 6,10 Euro bei 75.',
      'Die UKV fragt die fehlenden Zähne gleich noch einmal. Gibst du dort eine andere Zahl an, ändert sich dein Beitrag.',
    ],
  },
  beide: {
    titel: 'Mit deinen Angaben kannst du online bei beiden Gesellschaften abschließen.',
    text: 'Du wählst selbst. Beide Karten zeigen Tarife und Beiträge für dein Alter. Healio sagt dir nicht, welcher Tarif besser zu dir passt. Möchtest du dazu beraten werden, vereinbare einen Termin.',
    knopf: (produkt) => `Bei der ${NAME[produkt]} weiter`,
  },
  telefon: {
    titel: 'Das klären wir am besten zusammen',
    text: 'Mit deinen Angaben bieten wir dir online gerade keinen Vertrag an. Am Telefon oder in einem Termin schauen wir mit dir, welcher Schutz möglich ist.',
    darunter: 'Deine Antworten von hier nehmen wir nicht mit. Im Gespräch fangen wir neu an.',
    termin: 'Termin vereinbaren',
  },
  ukvAus: 'Online bei der UKV berechnen',
});

// Ein Satz je Grund (2.5 e und 2.2).
export const GRUND_TEXTE = Object.freeze({
  privat: 'Die beiden Zahntarife hier ergänzen eine gesetzliche Krankenversicherung.',
  heilfuersorge: 'Mit Heilfürsorge nehmen wir den Antrag gemeinsam mit dir auf.',
  unter18: 'Für Kinder und Jugendliche nehmen wir den Antrag gemeinsam auf.',
  ab81: 'Ab 81 Jahren nehmen wir den Antrag gemeinsam mit dir auf.',
  mehrAls3: 'Fehlen mehr als 3 Zähne, ist online bei keiner der beiden Gesellschaften ein Abschluss möglich.',
  ziehen: 'Soll ein Zahn gezogen werden, bieten wir online keinen Abschluss an.',
  behandlungMitLuecke: 'Kommen eine anstehende Behandlung und fehlende Zähne oder eine Vorgeschichte zusammen, bieten wir online keinen Abschluss an.',
  // Nachbesserung Paket C (K4), neu ohne Vorlage in Teil 2, Frank sieht ihn an.
  fertigMitLuecke: 'Kommen eine abgerechnete Behandlung und fehlende Zähne oder eine Vorgeschichte zusammen, bieten wir online keinen Abschluss an.',
  offen: 'Für deine Angaben nehmen wir den Antrag gemeinsam mit dir auf.',
  region: 'Deinen Beitrag können wir gerade nicht bestätigen. Versuch es später noch einmal oder vereinbare einen Termin.',
});

// 2.6 Rückweiche.
export const RUECKWEICHE_TEXTE = Object.freeze({
  zurBayerischen: {
    titel: 'Mit dieser Antwort geht es bei der UKV online nicht weiter.',
    // Nachbesserung (K2): Anzahl aus der Lage; bei einer Angabe Einzahl (neu, Frank sieht sie an).
    text: (anzahl) => `Bei der Bayerischen kannst du vielleicht trotzdem online abschließen. ${anzahl === 1 ? 'Dafür brauchen wir noch eine kurze Angabe.' : `Dafür brauchen wir noch ${{ 2: 'zwei', 3: 'drei', 4: 'vier' }[anzahl] || anzahl} kurze Angaben.`}`,
    knopf: 'Angaben machen',
    ergebnisTitel: 'Bei der Bayerischen kannst du mit deinen Angaben online abschließen.',
    ergebnisText: 'Deine Antworten auf die Fragen der UKV nehmen wir nicht mit. Die Bayerische stellt dir gleich ihre eigenen Fragen. Name und Geburtsdatum übernehmen wir. Die Erklärungen und die Vollmacht für die Bayerische bestätigst du neu.',
    wechseln: 'Zur Bayerischen wechseln',
  },
  zurUkv: {
    titel: 'Mit dieser Antwort geht es bei der Bayerischen online nicht weiter.',
    text: (mitZuschlag) => `Bei der UKV kannst du mit deinen Angaben online abschließen${mitZuschlag ? ', mit einem Zuschlag je fehlendem Zahn' : ''}. Die UKV stellt dir ihre eigenen Fragen. Deine Antworten an die Bayerische nehmen wir nicht mit. Die Erklärungen und die Vollmacht für die UKV bestätigst du neu.`,
    wechseln: 'Zur UKV wechseln',
  },
  stufe: {
    // Erster Satz: vorhandener Wortlaut (zahn.js SMART_FRAGE5_TEXT ohne den Zusatz), zweiter neu.
    text: 'In den Stufen Komfort und Prestige kannst du mit dieser Antwort online weitermachen. Du kannst die Stufe wechseln oder mit uns sprechen.',
    knopf: 'Stufe wechseln',
  },
  telefon: 'Lieber am Telefon',
  zusatz: {
    abgerechnet: {
      id: 'W1', text: 'Ist die Behandlung schon fertig und abgerechnet?', optionen: [{ id: 'fertig', label: 'Ja, fertig und abgerechnet' }, { id: 'steht_an', label: 'Nein, sie steht an oder läuft' }],
    },
    plz: 'Postleitzahl',
  },
});

// 2.7 Hinweise in der Maske bei geändertem Beitrag.
export const HINWEIS_BEITRAG = Object.freeze({
  zaehne: (alt, neu, anzahl) => `Dein Beitrag hat sich geändert. Vorher ${alt}, jetzt ${neu} im Monat, weil du bei der Frage zu fehlenden Zähnen ${anzahl} angegeben hast.`,
  beginn: (datum, alt, neu) => `Dein Beitrag hat sich geändert. Bei Beginn am ${datum} gilt für dich eine andere Altersgruppe. Vorher ${alt}, jetzt ${neu} im Monat.`,
});

// ---------------------------------------------------------------------------
// Matrix (Ergänzung 1.0) als Daten: Klasse, Ziel ohne Sperre, Grund, Beleg.
// klasse: 'belegt' | 'gleichgestellt' | 'offen' | 'grenze' (Healio-Grenze).
// Online führt eine Zeile nur bei belegt oder gleichgestellt (mit GLEICHGESTELLT_ONLINE).
// ---------------------------------------------------------------------------

export const MATRIX = Object.freeze({
  unter18: { klasse: 'grenze', ziel: 'telefon', grund: 'unter18', beleg: 'Healio-Grenze; UKV online nur ab 18 für sich selbst (zahnUkv.js alter.min)' },
  ab81: { klasse: 'grenze', ziel: 'telefon', grund: 'ab81', beleg: 'Healio-Grenze wie B12, Original rechnet (raender); Teil 5 Nr. 23' },
  alter71bis80: { klasse: 'offen', ziel: 'ukv', grund: 'offen', beleg: 'UKV Preis bis 80 gesehen, Annahme nie (raender A11/B10, UKV_BELEGT.alter71bis80); Bayerische Healio-Grenze 70' },
  alter1819: { klasse: 'offen', ziel: 'ukv', grund: 'offen', beleg: 'UKV KFO-Frage 6.2.4 bei 90/100 nie geprüft (TABELLE Nr. 25, UKV_BELEGT.kfo1819), Z75 bis 5 Euro nicht angeboten (C8); Bayerische nie gesehen (WEICHE_BAY_1819)' },
  privat: { klasse: 'belegt', ziel: 'telefon', grund: 'privat', beleg: 'UKV lehnt ab (netz lauf4 wh3); Bayerische laut PIB nur GKV oder freie Heilfürsorge' },
  heilfuersorge: { klasse: 'belegt', ziel: 'telefon', grund: 'heilfuersorge', beleg: 'UKV lehnt ab (lauf4); Bayerische gleichgestellt, nie gesehen (WEICHE_HEILFUERSORGE_BAY)' },
  heilfuersorgeBay: { klasse: 'gleichgestellt', ziel: 'bayerische', grund: null, beleg: 'Bayerische fragt die Krankenversicherung nicht, PIB lässt freie Heilfürsorge zu (nur mit WEICHE_HEILFUERSORGE_BAY)' },
  freiwilligBay: { klasse: 'gleichgestellt', ziel: 'bayerische', grund: null, beleg: 'Bayerische fragt die Art der GKV nicht, „alles nein“ gesehen (Lauf 5); UKV offen (TABELLE Nr. 14)' },
  freiwilligOffen: { klasse: 'offen', ziel: 'ukv', grund: 'offen', beleg: 'UKV „freiwillig gesetzlich“ online nie gefahren (TABELLE Nr. 14, UKV_BELEGT.freiwilligGkv)' },
  regelfall: { klasse: 'belegt', ziel: 'ukv', grund: null, beleg: 'Alles nein gesehen bei 36 und 61 (UKV lauf1, Bayerische Lauf 5); Wahlregel 1.3' },
  regelfallBeide: { klasse: 'belegt', ziel: 'beide', grund: null, beleg: 'Alles nein gesehen bei beiden; nur mit WAHLREGEL „beide“' },
  luecke: { klasse: 'belegt', ziel: 'ukv', grund: null, beleg: 'Online gesehen: 100er 1/2/3, 90er 1/2, 75er 1/3 (nachrechnen 4.2, TABELLE Nr. 4 und 6); offene Kombinationen sperrt die UKV-Definition je Tarif' },
  lueckeOffen: { klasse: 'offen', ziel: 'ukv', grund: 'offen', beleg: '90er mit 3 und 75er mit 2 Zähnen nur nach Papierantrag 5084 (UKV_BELEGT.z90DreiZaehne, z75ZweiZaehne), keine andere Stufe angeboten' },
  mehrAls3: { klasse: 'belegt', ziel: 'telefon', grund: 'mehrAls3', beleg: 'Beide lehnen ab (UKV TF0021 „>3“, Bayerische Frage 1)' },
  behandlungSofort: { klasse: 'gleichgestellt', ziel: 'bayerische-sofort', grund: null, beleg: 'Bayerische fragt nicht nach Behandlungen, „alles nein“ mit ZAHN Sofort gesehen (Lauf 5); UKV GF0073 lehnt ab (lauf4)' },
  behandlungFertig: { klasse: 'gleichgestellt', ziel: 'bayerische', grund: null, beleg: 'Bayerische fragt nicht nach abgerechneten Behandlungen; UKV GF0073 fragt die letzten zwei Jahre' },
  ziehen: { klasse: 'belegt', ziel: 'telefon', grund: 'ziehen', beleg: 'Komfort/Prestige lehnen ab (Lauf 4), UKV GF0073 lehnt ab; Smart mit Sofort nicht belegt' },
  vorgeschichteUkv: { klasse: 'gleichgestellt', ziel: 'ukv', grund: null, beleg: 'UKV fragt Prothese, alten Zahnersatz und Zahnschmelzdefekt nicht; Parodontitis belegt (lauf4, lauf6, Ausschluss aus GF0074)' },
  behandlungMitLuecke: { klasse: 'belegt', ziel: 'telefon', grund: 'behandlungMitLuecke', beleg: 'Bayerische lehnt fehlende Zähne und Vorgeschichte ab (Fragen 1 bis 4), UKV lehnt die Behandlung ab (GF0073)' },
  fertigMitLuecke: { klasse: 'belegt', ziel: 'telefon', grund: 'fertigMitLuecke', beleg: 'Bayerische lehnt fehlende Zähne und Vorgeschichte ab (Fragen 1 bis 4), UKV GF0073 fragt die letzten zwei Jahre' },
  ohneGesellschaft: { klasse: 'belegt', ziel: 'telefon', grund: null, beleg: 'Weder UKV noch Bayerische nehmen nach ihren Regeln an' },
});

const istOnline = (zeile) => zeile.ziel !== 'telefon' && (zeile.klasse === 'belegt' || (zeile.klasse === 'gleichgestellt' && GLEICHGESTELLT_ONLINE));

// ---------------------------------------------------------------------------
// Regeln
// ---------------------------------------------------------------------------

export const PRODUKTE = Object.freeze({ zahn, 'zahn-ukv': zahnUkv });
export const beginnFuer = (produkt, heute = new Date()) => beginnOptionenAus(PRODUKTE[produkt].beginn, heute).naechstmoeglich;

// UKV-Stufen, die das Original für Geburtsdatum, Beginn und Zahl fehlender Zähne anbietet (C8 Mindestbeitrag, C11 offene Fälle),
// je mit Beitrag samt Zuschlag. Nie eine Stufe bis 5,00 Euro Grundbeitrag.
export function ukvStufen({
  geburt, zaehne = '0', heute = new Date(), beginn = beginnFuer('zahn-ukv', heute),
} = {}) {
  if (!geburt || !beginn) return [];
  return zahnUkv.tarife.map((tarif) => {
    if (tarifAngeboten(zahnUkv, {
      tarif: tarif.id, geburtsdatum: geburt, beginn, heute,
    }) !== true) return null;
    const antworten = { TF0021: zaehne };
    if (wirkungen(zahnUkv, { antworten, tarif: tarif.id }).keineAufnahme.length) return null;
    const b = berechneBeitrag(zahnUkv, {
      tarif: tarif.id, geburtsdatum: geburt, beginn, antworten,
    });
    if (!Number.isFinite(b?.beitrag)) return null;
    return {
      id: tarif.id, name: tarif.name, beitrag: b.beitrag, grundbeitrag: b.grundbeitrag,
    };
  }).filter(Boolean);
}

// Nimmt die Bayerische das Alter (Beginn der Maske) an? Online bis Eintrittsalter 70, 18 und 19 nur mit WEICHE_BAY_1819.
export function bayerischeAlterOk({ geburt, heute = new Date(), beginn = beginnFuer('zahn', heute) } = {}) {
  if (!geburt || !beginn) return false;
  if (altersgrenze(zahn, geburt, { heute, beginn })) return false;
  const eintritt = eintrittsalter(zahn.beitrag.alter, geburt, beginn);
  return WEICHE_BAY_1819 || !(eintritt >= 18 && eintritt <= 19);
}

const ukvKv = (v) => v.V2 === 'pflicht' || (v.V2 === 'freiwillig' && UKV_BELEGT.freiwilligGkv);
const bayKv = (v) => v.V2 === 'pflicht' || v.V2 === 'freiwillig' || (v.V2 === 'heilfuersorge' && WEICHE_HEILFUERSORGE_BAY);
const ukvMoeglich = (v, heute, zaehne = '0') => ukvKv(v) && ukvStufen({ geburt: v.geburt, zaehne, heute }).length > 0;
const bayMoeglich = (v, heute) => bayKv(v) && bayerischeAlterOk({ geburt: v.geburt, heute });

// Ausgang schon am Alter (vor V2): unter 18 oder ab 81 nach der UKV-Regel mit dem Beginn, den die Maske vorbelegt.
function alterAusgang(v, heute) {
  const grenze = altersgrenze(zahnUkv, v.geburt, { heute, beginn: beginnFuer('zahn-ukv', heute) });
  if (grenze?.art === 'zuJung') return 'unter18';
  if (grenze?.art === 'zuAlt') return 'ab81';
  return null;
}

// Ausgang nach V2, vor der Einwilligung: keine der beiden Gesellschaften kommt in Frage, ohne dass es auf die Zähne ankommt.
function kvAusgang(v, heute) {
  if (v.V2 === 'privat') return 'privat';
  if (v.V2 === 'heilfuersorge' && !WEICHE_HEILFUERSORGE_BAY) return 'heilfuersorge';
  if (ukvMoeglich(v, heute) || bayMoeglich(v, heute)) return null;
  const beginn = beginnFuer('zahn-ukv', heute);
  const eintritt = eintrittsalter(zahnUkv.beitrag.alter, v.geburt, beginn);
  if (eintritt >= 18 && eintritt <= 19) return 'alter1819';
  if (eintritt >= 71) return 'alter71bis80';
  if (v.V2 === 'heilfuersorge') return 'heilfuersorge';
  if (v.V2 === 'freiwillig') return 'freiwilligOffen';
  return 'ohneGesellschaft';
}

// Vorläufiges Ziel nach V4 (ohne V5), für die Frage, ob V5 gestellt wird.
function brauchtV5(v, heute) {
  if (v.V4 === '>3') return false;
  if (v.V3 === 'steht_an' || v.V3 === 'fertig') return v.V4 === '0' && bayMoeglich(v, heute);
  // V3 nein
  if (v.V4 !== '0') return !GLEICHGESTELLT_ONLINE && ukvMoeglich(v, heute, v.V4);
  const ukv = ukvMoeglich(v, heute);
  const bay = bayMoeglich(v, heute);
  if (!ukv) return bay;
  if (WAHLREGEL === 'beide' && bay) return true;
  return !GLEICHGESTELLT_ONLINE;
}

// Nächster Schritt der Vorfragen oder null, wenn das Ziel feststeht.
// v: { geburt: {jahr, monat, tag} | null, V2, einwilligung, V3, V3a, V4, V5 }
export function naechsterSchritt(v = {}, { heute = new Date() } = {}) {
  if (!v.geburt) return 'V1';
  if (alterAusgang(v, heute)) return null;
  if (!v.V2) return 'V2';
  if (kvAusgang(v, heute)) return null;
  if (!v.einwilligung) return 'einwilligung';
  if (!v.V3) return 'V3';
  if (v.V3 === 'steht_an') {
    if (!v.V3a) return 'V3a';
    if (v.V3a === 'ja') return null;
  }
  if (!v.V4) return 'V4';
  if (brauchtV5(v, heute) && !v.V5) return 'V5';
  return null;
}

// Fall der Matrix für vollständige Vorfragen.
export function fallAus(v = {}, { heute = new Date() } = {}) {
  const alter = alterAusgang(v, heute);
  if (alter) return alter;
  const kv = kvAusgang(v, heute);
  if (kv) return kv;
  if (v.V3 === 'steht_an' && v.V3a === 'ja') return 'ziehen';
  if (v.V4 === '>3') return 'mehrAls3';
  const bay = bayMoeglich(v, heute);
  if (v.V3 === 'steht_an' || v.V3 === 'fertig') {
    if (v.V4 !== '0') return v.V3 === 'steht_an' ? 'behandlungMitLuecke' : 'fertigMitLuecke';
    if (!bay) return 'ohneGesellschaft';
    if (v.V5 === 'ja') return v.V3 === 'steht_an' ? 'behandlungMitLuecke' : 'fertigMitLuecke';
    return v.V3 === 'steht_an' ? 'behandlungSofort' : 'behandlungFertig';
  }
  // V3 nein
  if (v.V4 !== '0') {
    if (ukvMoeglich(v, heute, v.V4)) return v.V5 === 'ja' ? 'vorgeschichteUkv' : 'luecke';
    if (ukvMoeglich(v, heute)) return 'lueckeOffen';
    if (v.V2 === 'heilfuersorge') return 'heilfuersorge';
    return v.V2 === 'freiwillig' ? 'freiwilligOffen' : 'ohneGesellschaft';
  }
  const ukv = ukvMoeglich(v, heute);
  if (ukv) {
    if (v.V5 === 'ja') return 'vorgeschichteUkv';
    return WAHLREGEL === 'beide' && bay ? 'regelfallBeide' : 'regelfall';
  }
  if (bay) {
    if (v.V5 === 'ja') return v.V2 === 'heilfuersorge' ? 'heilfuersorge' : 'freiwilligOffen';
    return v.V2 === 'heilfuersorge' ? 'heilfuersorgeBay' : 'freiwilligBay';
  }
  return v.V2 === 'freiwillig' ? 'freiwilligOffen' : 'ohneGesellschaft';
}

// Ziel der Weiche. Liefert null, solange Vorfragen offen sind, sonst
// { ziel, fall, klasse, grund, produkt, bausteine, beginn, stufen?, zaehne }.
// ziel: 'ukv' | 'bayerische' | 'bayerische-sofort' | 'beide' | 'telefon'. Enthält keine Gesundheitsantworten.
export function zielAus(v = {}, { heute = new Date() } = {}) {
  if (naechsterSchritt(v, { heute }) !== null) return null;
  const fall = fallAus(v, { heute });
  const zeile = MATRIX[fall];
  const online = istOnline(zeile);
  const ziel = online ? zeile.ziel : 'telefon';
  let grund = zeile.grund;
  if (!online && !grund && zeile.klasse !== 'belegt') grund = 'offen';
  const ergebnis = {
    ziel, fall, klasse: zeile.klasse, grund: online ? null : grund, produkt: null, bausteine: [], beginn: null, zaehne: v.V4 === '>3' ? null : v.V4 || '0',
  };
  if (ziel === 'ukv' || ziel === 'beide') {
    ergebnis.produkt = 'zahn-ukv';
    ergebnis.beginn = beginnFuer('zahn-ukv', heute);
    ergebnis.stufen = ukvStufen({ geburt: v.geburt, zaehne: ergebnis.zaehne, heute });
  }
  if (ziel === 'bayerische' || ziel === 'bayerische-sofort') {
    ergebnis.produkt = 'zahn';
    ergebnis.bausteine = ziel === 'bayerische-sofort' ? ['ZAHN_SOFORT'] : [];
    ergebnis.beginn = beginnFuer('zahn', heute);
  }
  if (ziel === 'beide') ergebnis.beginnBayerische = beginnFuer('zahn', heute);
  return ergebnis;
}

// Fragen, die für diesen Kunden in dieser Reihenfolge gestellt werden (ohne Einwilligung), mit dem Stand der Antworten.
const FRAGEN_IDS = ['V1', 'V2', 'V3', 'V3a', 'V4', 'V5'];
const OPTIONEN = {
  V2: VORFRAGEN.V2.optionen.map((o) => o.id),
  V3: VORFRAGEN.V3.optionen.map((o) => o.id),
  V3a: ['ja', 'nein'],
  V4: VORFRAGEN.V4.optionen.map((o) => o.id),
  V5: ['ja', 'nein'],
};
// Alle Wege ab einem Stand (für Fortschritt und Tests). Ohne Geburtsdatum mit einem Regelalter (36), nur zum Zählen.
export function alleWege(v = {}, { heute = new Date() } = {}) {
  const wege = [];
  const gehe = (stand, fragen) => {
    const schritt = naechsterSchritt(stand, { heute });
    if (schritt === null) { wege.push({ v: stand, fragen }); return; }
    if (schritt === 'einwilligung') { gehe({ ...stand, einwilligung: true }, fragen); return; }
    if (schritt === 'V1') { gehe({ ...stand, geburt: { jahr: heute.getFullYear() - 36, monat: 1, tag: 1 } }, [...fragen, 'V1']); return; }
    OPTIONEN[schritt].forEach((wert) => gehe({ ...stand, [schritt]: wert }, [...fragen, schritt]));
  };
  gehe(v, []);
  return wege;
}
export function gestellteFragen(v = {}, { heute = new Date() } = {}) {
  const liste = [];
  const stand = {};
  for (let runde = 0; runde < 10; runde += 1) {
    const schritt = naechsterSchritt(stand, { heute });
    if (schritt === null) break;
    if (schritt === 'einwilligung') {
      if (!v.einwilligung) break;
      stand.einwilligung = v.einwilligung;
      continue; // eslint-disable-line no-continue
    }
    liste.push(schritt);
    const wert = schritt === 'V1' ? v.geburt : v[schritt];
    if (!wert) break;
    stand[schritt === 'V1' ? 'geburt' : schritt] = wert;
  }
  return liste;
}
// „Frage n von m“ (1.2 Nr. 8): n ist die aktuelle Frage, m die größte Zahl an Fragen, die für diesen Kunden noch möglich ist.
// Nur für Fragebildschirme (nicht für die Einwilligung): n = Nummer der aktuellen Frage.
export function fortschritt(v = {}, { heute = new Date() } = {}) {
  const aktuell = naechsterSchritt(v, { heute });
  if (!FRAGEN_IDS.includes(aktuell)) return null;
  const vorher = gestellteFragen(v, { heute }).filter((id) => id !== aktuell);
  const stand = {};
  vorher.forEach((id) => { if (id === 'V1') stand.geburt = v.geburt; else stand[id] = v[id]; });
  if (v.einwilligung) stand.einwilligung = v.einwilligung;
  const rest = Math.max(1, ...alleWege(stand, { heute }).map((weg) => weg.fragen.length));
  return { n: vorher.length + 1, m: vorher.length + rest };
}

// ---------------------------------------------------------------------------
// Rückweiche (1.7): Führt eine Originalantwort zur Ablehnung, wird die Lage nach der Matrix neu bewertet.
// Liefert { art: 'telefon' } | { art: 'zusatz', fehlt: [ids] } | { art: 'wechsel', zu, ziel }.
// ---------------------------------------------------------------------------

// Welche Vorfrage eine Originalantwort neu belegt. Gesundheitsantworten der ersten Gesellschaft werden danach verworfen.
function lageNachAntwort(v, vonProdukt, frageId, wert) {
  const neu = { ...v };
  if (vonProdukt === 'zahn-ukv') {
    if (frageId === 'GF0073' && wert === 'ja') { delete neu.V3; delete neu.V3a; return { neu, fehlt: ['V3', 'V3a'] }; }
    if (frageId === 'TF0021') return { neu: { ...neu, V4: wert }, fehlt: [] };
    if (frageId === 'AF_AD_0005') return { neu: { ...neu, V2: wert === 'private Krankenversicherung/Heilfürsorge' ? 'privat' : wert === 'freiwillig gesetzlich versichert in deutscher GKV' ? 'freiwillig' : 'pflicht' }, fehlt: [] };
    return null;
  }
  if (vonProdukt === 'zahn') {
    if (['z2', 'z3', 'z4'].includes(frageId) && wert === 'ja') return { neu: { ...neu, V5: 'ja' }, fehlt: [] };
    // Frage 1: fehlende Zähne oder angeratenes Ziehen; die UKV zählt in TF0021 selbst. Mit V3 „nein“ war nichts angeraten.
    if ((frageId === 'z1' || frageId === 'z1s') && wert === 'ja') return { neu, fehlt: [] };
    return null;
  }
  return null;
}

export function rueckweiche({
  v = {}, vonProdukt, frageId, wert, zusatz = {}, heute = new Date(),
} = {}) {
  // Bayerische zur UKV nur, wenn V3 „nein“ und V4 höchstens 3 war (1.7).
  if (vonProdukt === 'zahn' && !(v.V3 === 'nein' && ['0', '1', '2', '3'].includes(v.V4))) return { art: 'telefon' };
  // UKV zur Bayerischen: GF0073 „Ja“ nur, wenn V4 „keiner“ war.
  if (vonProdukt === 'zahn-ukv' && frageId === 'GF0073' && v.V4 !== '0') return { art: 'telefon' };
  const lage = lageNachAntwort(v, vonProdukt, frageId, wert);
  if (!lage) return { art: 'telefon' };
  const neu = { ...lage.neu };
  if (zusatz.V3) neu.V3 = zusatz.V3;
  if (zusatz.V3a) neu.V3a = zusatz.V3a;
  if (zusatz.V5 && !neu.V5) neu.V5 = zusatz.V5;
  const fehlt = [];
  if (!neu.V3) fehlt.push('W1');
  else if (neu.V3 === 'steht_an' && !neu.V3a) fehlt.push('V3a');
  if (fehlt.length === 0) {
    const schritt = naechsterSchritt(neu, { heute });
    if (schritt === 'V5') fehlt.push('V5');
    else if (schritt !== null) return { art: 'telefon' };
  }
  const zielProdukt = vonProdukt === 'zahn' ? 'zahn-ukv' : 'zahn';
  if (fehlt.length === 0) {
    const ziel = zielAus(neu, { heute });
    const passt = zielProdukt === 'zahn' ? ['bayerische', 'bayerische-sofort'].includes(ziel?.ziel) : ['ukv', 'beide'].includes(ziel?.ziel);
    if (!passt) return { art: 'telefon' };
    // PLZ fragt die Seite für die Bayerische zuletzt (2.6 Nr. 4).
    if (zielProdukt === 'zahn' && !/^\d{5}$/.test(String(zusatz.plz || ''))) return { art: 'zusatz', fehlt: ['plz'], ziel: { ...ziel, ziel: ziel.ziel } };
    return { art: 'wechsel', zu: zielProdukt, ziel: zielProdukt === 'zahn-ukv' ? { ...ziel, ziel: 'ukv' } : ziel };
  }
  return { art: 'zusatz', fehlt };
}

// Höchstzahl der Zusatzangaben für den Text „Dafür brauchen wir noch [zwei | drei | vier] kurze Angaben.“
// Nachbesserung (K2): aus der Lage nach der Originalantwort gerechnet. Gezählt werden die Bildschirme bis zum Ergebnis
// (abgerechnet, Ziehen, V5, PLZ) auf dem längsten Weg, der bei der Bayerischen endet.
const ZUSATZ_WERTE = {
  W1: ['V3', ['fertig', 'steht_an']], V3a: ['V3a', ['ja', 'nein']], V5: ['V5', ['ja', 'nein']], plz: ['plz', ['20095']],
};
export function zusatzAnzahl({
  v = {}, vonProdukt = 'zahn-ukv', frageId = 'GF0073', wert = 'ja', heute = new Date(),
} = {}) {
  const laenge = (zusatz, tiefe) => {
    const lage = rueckweiche({
      v, vonProdukt, frageId, wert, zusatz, heute,
    });
    if (lage.art === 'wechsel') return tiefe;
    if (lage.art !== 'zusatz' || tiefe > 4) return -1;
    const [key, werte] = ZUSATZ_WERTE[lage.fehlt[0]] || [];
    if (!key) return -1;
    return Math.max(...werte.map((x) => laenge({ ...zusatz, [key]: x }, tiefe + 1)));
  };
  return Math.max(0, laenge({}, 0));
}

// Vorfragen nach einem Wechsel (Rückweiche): die Lage nach der Originalantwort plus die Zusatzangaben, nur im Speicher der Seite.
// Nachbesserung (K3): Was nicht neu gefragt wurde, bleibt wie in den Vorfragen (zum Beispiel V3 nach AF_AD_0005).
export function vorfragenNachWechsel({
  v = {}, vonProdukt, frageId, wert, zusatz = {},
} = {}) {
  const lage = lageNachAntwort(v, vonProdukt, frageId, wert);
  const neu = { ...(lage ? lage.neu : v) };
  if (zusatz.V3) neu.V3 = zusatz.V3;
  if (zusatz.V3a) neu.V3a = zusatz.V3a;
  if (zusatz.V5 && !neu.V5) neu.V5 = zusatz.V5;
  return neu;
}

// ---------------------------------------------------------------------------
// Texte der Maske auf dem Weg über die Weiche (2.9). Die Einzelmasken und die
// Prüfseite behalten ihre Sätze. Dieselbe Funktion nutzt der Antragsdienst,
// wenn ein Antrag „weiche: true“ trägt (Prüfung der Erklärungen, „Mein Antrag“).
// ---------------------------------------------------------------------------

// 2.9 Nr. 1 und 2
export const HINWEIS_AUSWAHL = Object.freeze({
  'zahn-ukv': 'Gut zu wissen: Healio hat für deine Angaben nur zwischen der Bayerischen und der UKV ausgewählt. Dieser Antrag betrifft die Zahntarife ZahnPRIVAT 75, 90 und 100 der UKV. Grundlage sind die Bedingungen und Beiträge der UKV. Andere Versicherer haben wir nicht verglichen.',
  zahn: (sofort) => `Gut zu wissen: Healio hat für deine Angaben nur zwischen der Bayerischen und der UKV ausgewählt. Dieser Antrag betrifft die Zahntarife Smart, Komfort und Prestige der Bayerischen${sofort ? ' mit dem Baustein ZAHN Sofort' : ''}. Grundlage sind die Bedingungen und Beiträge der Bayerischen. Andere Versicherer haben wir nicht verglichen.`,
});
export const HINWEIS_AUSWAHL_TITEL = 'Hinweis zur Auswahl von Gesellschaft und Tarif';
// 2.9 Nr. 3, Entwurf bis Anwalt A3.
export const VERZICHT_WEICHE = 'Ich verzichte für diesen Antrag gegenüber Healio auf eine Beratung und deren Dokumentation. Healio hat die Gesellschaft nur nach deren Annahmeregeln und meinen Angaben ausgewählt und mich nicht beraten. Den Hinweis auf die möglichen Nachteile habe ich gelesen.';
// 2.9 Nr. 6
export const TEXT6_WEICHE = 'Meine Antworten auf die Vorfragen zur Auswahl der Gesellschaft speichert Healio nicht.';
// 2.9 Nr. 12
export const VORBEHALT_WEICHE = 'Zu einer anderen Gesellschaft wechselt Healio nur, wenn du es neu bestätigst.';
const MEIN_ANTRAG_ALT = 'Darin stehen auch der Hinweis zur Tarifauswahl,';
const MEIN_ANTRAG_NEU = `Darin stehen auch der ${HINWEIS_AUSWAHL_TITEL},`;

const mitSatz = (text, satz) => (text ? `${text} ${satz}` : text);
const speicher = new Map();
export function definitionFuerWeiche(definition) {
  if (!definition || !PRODUKTE[definition.produkt]) return definition;
  if (definition.weiche) return definition;
  if (speicher.has(definition)) return speicher.get(definition);
  const ukv = definition.produkt === 'zahn-ukv';
  const nachweis = {
    art: 'nachweis', key: EINWILLIGUNG.key, titel: 'Einwilligung vor den Zahnfragen', text: EINWILLIGUNG.text, haken: EINWILLIGUNG.haken, pflicht: true,
  };
  const eintrag = (e) => {
    if (e.art === 'hinweis' && /Andere Versicherer vergleichen wir hier nicht/.test(e.text)) {
      if (ukv) return [{ art: 'hinweis', titel: HINWEIS_AUSWAHL_TITEL, text: HINWEIS_AUSWAHL['zahn-ukv'], absaetze: [SATZ_AUSWAHL] }];
      return [
        {
          art: 'hinweis', titel: HINWEIS_AUSWAHL_TITEL, text: HINWEIS_AUSWAHL.zahn(true), absaetze: [SATZ_AUSWAHL], bedingung: { baustein: 'ZAHN_SOFORT' },
        },
        {
          art: 'hinweis', titel: HINWEIS_AUSWAHL_TITEL, text: HINWEIS_AUSWAHL.zahn(false), absaetze: [SATZ_AUSWAHL], bedingung: { nicht: { baustein: 'ZAHN_SOFORT' } },
        },
      ];
    }
    if (e.key === 'verzicht') return [{ ...e, haken: VERZICHT_WEICHE }];
    if (e.key === 'gesundheitsdaten') return [{ ...e, volltext: [...(e.volltext || []), ['p', TEXT6_WEICHE]] }];
    if (e.art === 'unterlagen' && typeof e.text === 'string' && e.text.includes(MEIN_ANTRAG_ALT)) return [{ ...e, text: e.text.replace(MEIN_ANTRAG_ALT, MEIN_ANTRAG_NEU) }];
    return [e];
  };
  const erklaerungen = definition.erklaerungen.map((teil, stelle) => {
    const eintraege = teil.eintraege.flatMap(eintrag);
    return { ...teil, eintraege: stelle === 0 ? [nachweis, ...eintraege] : eintraege };
  });
  const neu = {
    ...definition,
    weiche: true,
    erklaerungen,
    beitrag: { ...definition.beitrag, vorbehalt: mitSatz(definition.beitrag?.vorbehalt, VORBEHALT_WEICHE) },
    absenden: { ...definition.absenden, vorbehalt: mitSatz(definition.absenden?.vorbehalt, VORBEHALT_WEICHE) },
  };
  speicher.set(definition, neu);
  return neu;
}
