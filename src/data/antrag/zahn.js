// Produktdefinition der Antragsmaske Zahn: Die Bayerische, Zahn Smart,
// Komfort, Prestige mit Baustein ZAHN Sofort (12.11.2026).
//
// Quelle: Erfassung der Online-Strecke vom 12.11.2026,
// Healio/Antragsstrecken/originale/bayerische-zahn/ (BAYERISCHE-ZAHN-ERFASSUNG.md,
// bayerische-zahn.json). Fragen, Hinweise, Einwilligungen und Unterlagen im
// Wortlaut der Strecke (Sie-Form wie im Original, inklusive der Schreibweise
// „Paradontose/Paradontitis“). Franks Entscheidungen 12.11.2026:
// - Smart, Komfort, Prestige plus ZAHN Sofort; Prestige Plus nicht (im Original aus).
// - Zahlweise nur monatlich oder jährlich (jährlich 2 % Rabatt laut Strecke).
// - Ja bei Frage 1 bis 4 heißt bei der Bayerischen Ablehnung: freundlich
//   abfangen mit den Auswegen der Zahnseite, kein Barmenia-Hinweis. Die im
//   Original nicht angezeigten Folgefragen nach der Anzahl auch hier nicht.
// - Preisregion Stadt/Land kennt nur der Server der Bayerischen: Beitrag nur
//   vom Antragsdienst (beitrag.art 'dienst'), nie geraten.
// - Beginn: nächster Monatserster vorbelegt, nichts Rückwirkendes.
// - Werbeeinwilligung leer und freiwillig (im Original vorab angehakt).
// - Online bis 70 Jahre (Eintrittsalter), darüber Telefonweg.
// Markierung ungesehen: true heißt „nur aus dem Programmcode der Strecke
// gelesen, nicht selbst gesehen“ (Erfassung [C]).
//
// Healio-eigene Texte (Auswahl, Vollmacht, Gesundheitsangaben, Auftrag,
// Vorbehalt) sind die Texte der Prüfseite, nur mit dem Namen der Bayerischen
// statt der SDK. Rechtliche Prüfung für Zahn offen.

import { ANREDEN, HINWEIS_MINDERJAEHRIG } from '../sdkAmbulantAntrag.js';
import {
  BEITRAG_VORBEHALT,
  ERKLAERUNG_KURZ,
  KNOPF_BEANTRAGEN,
  TEIL_3_TITEL,
  TEXT_10_VOLLMACHT,
  TEXT_12_KNOPF,
  TEXT_13_FRAGE,
  TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER,
  TEXT_9_HAKEN,
  TEXT_9_HINWEIS,
  UNTERLAGEN_HEALIO,
} from '../sdkAmbulantAntragTexte.js';
import { TEXT_6_STANDORT } from '../sdkAmbulantAntragSdkTexte.js';

const BA = 'BA die Bayerische Allgemeine Versicherung AG';
const ASSET = (id) => `https://bayculator.diebayerische.de/cms/assets/${id}?download`;

// Name der SDK in den Healio-Texten durch die Bayerische ersetzen. Prüft,
// dass danach nichts von der SDK übrig ist.
function fuerBayerische(text) {
  const neu = text
    .replace('die ambulante Zusatzversicherung bei der Süddeutschen Krankenversicherung a. G. (SDK)', `die Zahnzusatzversicherung bei der ${BA} (die Bayerische)`)
    .replace('in die Online-Antragsstrecke der SDK, die die cpit comparit GmbH (Level Nine) für die SDK betreibt', 'in die Online-Antragsstrecke der Bayerischen')
    .replace(/Online-Antragsstrecke der SDK/g, 'Online-Antragsstrecke der Bayerischen')
    .replace(/Post der SDK/g, 'Post der Bayerischen')
    .replace(/bei der SDK/g, 'bei der Bayerischen')
    .replace(/an die SDK/g, 'an die Bayerische')
    .replace(/Stellt die SDK/g, 'Stellt die Bayerische')
    .replace(/Nennt die SDK/g, 'Nennt die Bayerische');
  if (/SDK|Süddeutsche|Level Nine|cpit/.test(neu)) throw new Error(`zahn.js: SDK-Rest im Text: ${neu.slice(0, 80)}`);
  return neu;
}

export const ABLEHNUNG_TEXT = 'Leider können wir dir online keinen Tarif der Bayerischen anbieten. Lass uns zusammen schauen, welcher Schutz für dich passt.';

// Ja bei Frage 1 bis 4: Ablehnung der Bayerischen (Risikoprüfung REJECTED).
// Auswege wie der Zahn-Check auf /zahn: fehlende Zähne und älterer Zahnersatz
// führen dort zur UKV, angeratenes Ziehen, Prothese und Parodontose zur
// persönlichen Klärung.
const ablehnung = (auswege) => [{ art: 'keineAufnahme', text: ABLEHNUNG_TEXT, auswege }];
const MIT_UKV = ['ukv', 'telefon'];
const PERSOENLICH = ['telefon', 'termin'];

// Original-Kennungen des Fragebogens (KZV id 9, KZV_SMART id 10) für die
// Übermittlung: Antwort-Kennung je ja/nein.
const frage = (id, titel, text, original, wirkungJa, bedingung) => ({
  id, typ: 'janein', titel, kurz: titel, text, original, wirkung: { ja: wirkungJa }, ...(bedingung ? { bedingung } : {}),
});

const FRAGEN = [
  frage('z1', 'Frage 1', 'Haben Sie fehlende Zähne, die noch nicht ersetzt sind oder/ und ist angeraten, einen oder mehrere Zähne zu ziehen?', { frageId: '1', ja: '2', nein: '9' }, ablehnung(PERSOENLICH), { tarif: ['KOMFORT', 'PRESTIGE'] }),
  frage('z1s', 'Frage 1', 'Haben Sie fehlende Zähne, die noch nicht ersetzt sind?', { frageId: '1', ja: '2', nein: '9' }, ablehnung(MIT_UKV), { tarif: ['SMART'] }),
  frage('z2', 'Frage 2', 'Haben Sie eine bestehende, herausnehmbare Voll- oder Teilprothese?', { frageId: '10', ja: '11', nein: '12' }, ablehnung(PERSOENLICH)),
  frage('z3', 'Frage 3', 'Haben Sie Zahnersatz, der älter als 10 Jahre ist?', { frageId: '13', ja: '14', nein: '21' }, ablehnung(MIT_UKV)),
  frage('z4', 'Frage 4', 'Besteht oder bestand in den letzten 3 Jahren eine / mehrere der folgenden Erkrankungen: -Paradontose, -Paradontitis, - Zahnschmelzdefekt?', { frageId: '22', ja: '23', nein: '24' }, ablehnung(PERSOENLICH)),
  // Ja: angenommen, Beitrag unverändert. Die Folgefrage „Wie lange?“ zeigt das
  // Original nicht und schickt „unbekannt“ (Antwort 34).
  frage('z5', 'Frage 5', 'Bestand in den letzten 12 Monaten vor Vertragsabschluss eine Zahnzusatzversicherung bei einem anderen privaten Krankenversicherer?', { frageId: '25', ja: '26', nein: '35', folgeBeiJa: { frageId: '28', antwortId: '34' } }, []),
];

const zahn = {
  sparte: 'zahn',
  bereit: true,
  stand: '2026-11-12',
  textfassung: '2026-11-12-bayerische-zahn',
  quelle: 'Online-Strecke der Bayerischen (Bayculator release-1.53.24), erfasst 12.11.2026',
  versicherer: {
    id: 'bayerische', name: BA, kurz: 'Bayerische', beiDer: 'der Bayerischen',
  },
  kennzeile: 'Zahnzusatzschutz der Bayerischen',
  seitentitel: 'Antrag Zahnzusatzschutz | Healio',
  beschreibung: 'Dein Antrag auf den Zahnzusatzschutz.',

  tarife: [
    { id: 'SMART', name: 'Smart', zusatz: 'Einsteigertarif', original: { typ: 'KZV_SMART/SMART', sku: '00101' } },
    {
      id: 'KOMFORT', name: 'Komfort', zusatz: 'Top Preis-Leistung · Inkl. 15€ happybrush Gutschein', original: { typ: 'KZV_KOMFORT/KOMFORT', sku: '00102' },
    },
    {
      id: 'PRESTIGE',
      name: 'Prestige',
      zusatz: 'Mehrfacher Testsieger · Bestnote! · Inkl. happybrush Zahnbürste',
      original: { typ: 'KZV_PRESTIGE/PRESTIGE', sku: '00103' },
      zeilen: [
        ['keine Wartezeiten', ''],
        ['Professionelle Zahnreinigung', '100 EUR je Behandlung; max. 200 EUR je Kalenderjahr'],
        ['Zahnbehandlung', '100% Erstattung'],
        ['Zahnersatz', '100% Erstattung'],
        ['Kieferorthopädie', '1.500 EUR inkl. GKV-Leistung, 2.000 EUR ohne GKV-Leistung'],
        ['Bleaching', ''],
      ],
    },
  ],
  tarifVorgabe: 'PRESTIGE',
  tarifHinweis: 'Monatlicher Gesamtbeitrag der versicherten Person',
  tarifFussnote: 'Sie sind bei uns immer für zunächst zwei Jahre versichert. Nach Ablauf der zwei Jahre verlängert sich der Vertrag automatisch, wenn Sie nicht mit einer Frist von einem Monat kündigen.',
  bausteine: [{
    id: 'ZAHN_SOFORT',
    name: 'ZAHN Sofort',
    kennzeichen: 'Unsere Empfehlung',
    preisText: '+ 29,90 € monatlich',
    original: 'KZV_ZAHN_SOFORT',
    leistungen: ['bereits angeratene Behandlungen (rückwirkender Schutz)', 'bereits begonnene Behandlungen (rückwirkender Schutz)'],
    erklaerungen: [
      'Eine Beratung gilt als angeraten, wenn bereits vor Vertragsabschluss bekannt ist, dass Sie die Behandlung durchführen müssen oder sollen, bzw. dies in Ihrer Krankenakte dokumentiert ist. Der Baustein ZAHN Sofort ermöglicht Ihnen hierfür Versicherungsschutz. Ohne den Baustein ZAHN Sofort sind angeratene Behandlungen ausgeschlossen.',
      'Eine Beratung gilt als begonnen, wenn sie bereits vor Vertragsabschluss angefangen, aber noch nicht in Rechnung gestellt wurde. Der Baustein ZAHN Sofort ermöglich Ihnen hierfür Versicherungsschutz. Ohne den Baustein ZAHN Sofort sind begonnene Behandlungen ausgeschlossen.',
    ],
  }],
  zahlweiseImTarif: true,

  // Original: laufender Monat plus fünf (01.11.2026 bis 01.04.2027), rückwirkend vorbelegt.
  // Healio: nächster Monatserster vorbelegt, nichts in der Vergangenheit.
  beginn: { art: 'monatsErster', abMonat: 1, bisMonat: 5 },
  alter: {
    min: 18, max: 70, maxZaehlung: 'kalenderjahr', stichtag: 'beginn', hinweisZuJung: HINWEIS_MINDERJAEHRIG, hinweisZuAlt: 'Ab 71 Jahren nehmen wir den Antrag gemeinsam mit dir auf.',
  },
  beitrag: {
    art: 'dienst',
    alter: 'kalenderjahr',
    plz: {
      label: 'Wie lautet Ihre Postleitzahl?',
      hinweis: 'Hinweis: Unser Tarif gewährt je nach Wohnort einen günstigeren Beitrag. Bitte geben Sie für die Berechnung des Beitrags die Postleitzahl Ihres Wohnortes an.',
    },
    vorbehalt: fuerBayerische(BEITRAG_VORBEHALT),
  },

  gesundheit: {
    titel: 'Angaben zum Gesundheitszustand Ihrer Zähne',
    vorspann: {
      vorTitel: 'Vor den 5 Fragen',
      titel: 'Wichtiger Hinweis',
      absaetze: [
        'Bitte beantworten Sie die folgenden Fragen wahrheitsgemäß.',
        {
          text: 'Es ist sehr wichtig, dass Sie die folgenden Fragen vollständig und wahrheitsgemäß beantworten. Achten Sie unbedingt auf die zutreffende Erfassung Ihrer Angaben. Andernfalls gefährden Sie Ihren Versicherungsschutz. Wir als Versicherer können bei unvollständigen oder falschen Angaben vom Vertrag zurücktreten bzw. die Leistung verweigern, den Vertrag komplett kündigen oder anpassen. Die ausführliche Belehrung gem. § 19 Abs. 5 VVG über die Folgen einer Verletzung der gesetzlichen Anzeigepflicht finden Sie',
          link: { text: 'hier', href: ASSET('7249e1d4-8a50-4b5d-bf5a-9ef18a74d7a6') },
          nachLink: '.',
        },
        '- Auf die gesonderte Mitteilung gem. § 19 Abs. 5 VVG über die Folgen einer Verletzung der gesetzlichen Anzeigepflicht weisen wir ausdrücklich hin. -',
      ],
    },
    fragen: FRAGEN,
  },

  person: {
    anreden: [ANREDEN[1], ANREDEN[0], ANREDEN[2]],
    felder: [
      { id: 'vorname', label: 'Vorname', typ: 'name', autoComplete: 'given-name', fehlerLeer: 'Bitte gib deinen Vornamen ein.' },
      { id: 'nachname', label: 'Nachname', typ: 'name', autoComplete: 'family-name', fehlerLeer: 'Bitte gib deinen Nachnamen ein.' },
    ],
    // Wie im Original: Postleitzahl aus Schritt 1 gesperrt, Straße und
    // Hausnummer getrennt, kein Telefonfeld im Original (bei Healio freiwillig).
    anschrift: [
      { id: 'plz', label: 'Postleitzahl', typ: 'plz', gesperrt: true, fehlerLeer: 'Bitte gib eine fünfstellige PLZ ein.' },
      { id: 'ort', label: 'Stadt', typ: 'name', autoComplete: 'address-level2', fehlerLeer: 'Bitte gib deinen Wohnort ein.' },
      { id: 'strasse', label: 'Straße', typ: 'strassenname', autoComplete: 'address-line1', fehlerLeer: 'Bitte gib deine Straße ein.' },
      { id: 'hausnummer', label: 'Hausnummer', typ: 'hausnummer', maxLength: 12, fehlerLeer: 'Bitte gib deine Hausnummer ein.' },
      { id: 'email', label: 'E-Mail-Adresse', typ: 'email', type: 'email', autoComplete: 'email', inputMode: 'email', fehlerLeer: 'Bitte gib deine E-Mail-Adresse ein.' },
      {
        id: 'telefon', label: 'Telefon', hinweis: 'Freiwillig, für Rückfragen von Healio.', typ: 'telefon', type: 'tel', autoComplete: 'tel', inputMode: 'tel', pflicht: false, fehlerLeer: 'Bitte gib eine Telefonnummer ein.',
      },
    ],
    bestaetigungen: [],
  },

  zahlung: {
    zahlweisen: [{ id: 'monatlich', label: 'Monatlich', original: 'MONTHLY' }, { id: 'jaehrlich', label: 'Jährlich (am günstigsten)', original: 'YEARLY' }],
    kontoinhaberFrage: TEXT_13_FRAGE,
    kontoAndere: {
      titel: 'Das klären wir am besten kurz zusammen.',
      text: 'Gehört das Konto jemand anderem, muss diese Person das Lastschriftmandat selbst erteilen. Vereinbare einfach einen Termin, dann machen wir den Rest gemeinsam.',
    },
    sepa: {
      karte: 'SEPA-Lastschriftmandat der Bayerischen',
      titel: 'Ermächtigung zum Beitragseinzug',
      // Nur aus dem Programmcode gelesen (Erfassung [C]); {insurer} durch den Namen ersetzt.
      ungesehen: true,
      absaetze: [
        `Ich ermächtige die ${BA} Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von der ${BA} von meinem Konto gezogenen Lastschriften einzulösen. Der Lastschrifteinzug wird mir spätestens fünf Kalendertage vor dem ersten Einzug angekündigt.`,
        'Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.',
      ],
      angaben: [['Empfänger', BA], ['Gläubiger-ID', 'DE16ZZZ00000106478']],
      key: 'sepa',
      haken: 'Bitte ziehen Sie den Beitrag ein.',
    },
  },

  erklaerungen: [
    {
      teil: 'Beratung und Auftrag',
      eintraege: [
        { art: 'hinweis', text: 'Gut zu wissen: In diesem Antrag geht es nur um die Zahntarife Smart, Komfort und Prestige der Bayerischen mit dem Baustein ZAHN Sofort. Grundlage sind die Bedingungen und Beiträge der Bayerischen. Andere Versicherer vergleichen wir hier nicht.' },
        {
          art: 'haken', key: 'verzicht', titel: 'Verzicht auf Beratung', warnung: TEXT_9_HINWEIS, terminLink: true, haken: TEXT_9_HAKEN, pflicht: true,
        },
        {
          art: 'haken',
          key: 'beratungsverzichtVersicherer',
          original: 'ADVICE_WAIVED',
          ungesehen: true,
          titel: 'Beratungsverzicht gegenüber der Bayerischen',
          kurz: 'Mir ist bewusst, dass sich der Beratungsverzicht nachteilig auf die Möglichkeit auswirken kann, gegen den Versicherer und gegebenenfalls gegen den Versicherungsvermittler einen Schadenersatzanspruch wegen Verletzung von Beratungs- und Dokumentationspflichten geltend zu machen.',
          haken: 'Mit dem Online-Abschluss verzichte ich bewusst auf eine umfassende Beratung zur Bayerische Zahnzusatzversicherung.',
          pflicht: true,
        },
        {
          art: 'haken', key: 'vollmacht', titel: 'Auftrag und Vollmacht', kurz: fuerBayerische(ERKLAERUNG_KURZ.vollmacht), volltext: [['p', fuerBayerische(TEXT_10_VOLLMACHT)]], dokument: 'Maklervertrag', haken: 'Ich erteile Healio diesen Auftrag und diese Vollmacht.', pflicht: true,
        },
      ],
    },
    {
      teil: 'Deine Einwilligungen',
      eintraege: [
        {
          art: 'haken',
          key: 'gesundheitsdaten',
          titel: 'Gesundheitsangaben bei Healio',
          kurz: fuerBayerische(ERKLAERUNG_KURZ.gesundheitsdaten),
          volltext: [['p', fuerBayerische(TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join(''))]],
          haken: 'Ich bin einverstanden.',
          pflicht: true,
        },
        {
          art: 'haken',
          key: 'schweigepflicht',
          original: 'CONFIDENTIALITY_WAIVED',
          ungesehen: true,
          titel: 'Gesundheitsdaten und Schweigepflichtentbindung der Bayerischen',
          links: [
            { label: 'Schweigepflichtentbindungserklärung', href: ASSET('de3cea1f-6145-4a2c-989c-d47e08a55cfa') },
            { label: 'Weitere Informationen zur Datenverarbeitung', href: ASSET('9b960eae-f97d-4de5-8338-e766f9d91a7a') },
          ],
          volltext: [['p', '*Bonitätsauskunft: Der Versicherer darf Informationen von der infoscore Consumer Data GmbH, Rheinstraße 99, 76532 Baden-Baden beziehen und nutzen. Diese Informationen betreffen mein bisheriges Zahlungsverhalten sowie Melderegisterauskünfte. Sie werden für den Vertragsabschluss und bei Bedarf auch während unserer Geschäftsbeziehung benötigt.']],
          haken: 'Ich habe die Einwilligungserklärung in die Erhebung und Verwendung von Gesundheitsdaten und Schweigepflichtentbindungserklärung heruntergeladen und zur Kenntnis genommen. Mit den dort erläuterten Datenverarbeitungen und der Einholung einer Bonitätsauskunft* erkläre ich mich einverstanden.',
          pflicht: true,
        },
        {
          art: 'haken',
          key: 'vvg',
          original: 'VVG_AGREED',
          ungesehen: true,
          titel: 'Belehrung nach § 19 Abs. 5 VVG',
          links: [{ label: '§ 19 Abs. 5 VVG', href: ASSET('7249e1d4-8a50-4b5d-bf5a-9ef18a74d7a6') }],
          haken: 'Ich bestätige, dass ich vor Abgabe meiner Vertragserklärung die Belehrung gem. § 19 Abs. 5 VVG über die Folgen einer Verletzung der gesetzlichen Anzeigepflicht in Textform erhalten und gespeichert oder ausgedruckt habe.',
          pflicht: true,
        },
        {
          art: 'haken',
          key: 'werbung',
          original: 'ADVERTISING_ALLOWED',
          ungesehen: true,
          titel: 'Informationen der Bayerischen',
          haken: 'Ich gestatte den Unternehmen der Bayerischen bzw. dem/der zuständigen Betreuer/in, mich auch telefonisch und mittels elektronischer Post über Angebote zu Versicherungen und Finanzdienstleistungen der Unternehmensgruppe der Bayerischen zu informieren, zu beraten und mir auf diesem Wege Angebote zu Versicherungen und Finanzdienstleistungen der Unternehmensgruppe der Bayerischen zu unterbreiten. Meine Kontaktdaten dürfen zu diesem Zweck von der Unternehmensgruppe der Bayerischen gespeichert und genutzt werden. Meine Einwilligung ist freiwillig, hat keinen Einfluss auf bestehende oder zukünftige Verträge und ich kann sie jederzeit z.B. per E-Mail an info@diebayerische.de widerrufen.',
          freiwilligText: 'Freiwillig. Dein Antrag geht auch ohne diesen Haken.',
          pflicht: false,
        },
        {
          art: 'haken', key: 'policePost', original: 'POLICY_BY_POST', ungesehen: true, titel: 'Police per Post', haken: 'Ich möchte die Police nicht per E-Mail, sondern auf postalischem Wege erhalten.', pflicht: false,
        },
      ],
    },
    {
      teil: 'Unterlagen',
      eintraege: [
        {
          art: 'unterlagen',
          key: 'unterlagen',
          original: 'DOCUMENTS_SECURED',
          ungesehen: true,
          titel: 'Deine Unterlagen',
          // Allgemeine Versicherungs- und Tarifbedingungen sind in der Strecke nicht verlinkt
          // (laut Code liefert der Antrag sie als PDF nach). Hier nur, was das Original verlinkt.
          gruppen: [
            {
              von: 'Von der Bayerischen',
              eintraege: [
                { name: 'Produktinformationsblatt', bedingung: { tarif: ['SMART'] }, dateien: [{ label: 'Produktinformationsblatt Zahn Smart', href: ASSET('80d8041f-8cc1-449f-9a9f-b54d2429323b') }] },
                { name: 'Produktinformationsblatt', bedingung: { tarif: ['KOMFORT'] }, dateien: [{ label: 'Produktinformationsblatt Zahn Komfort', href: ASSET('87ae410f-0b8b-4e32-ad2b-1413329c1d04') }] },
                { name: 'Produktinformationsblatt', bedingung: { tarif: ['PRESTIGE'] }, dateien: [{ label: 'Produktinformationsblatt Zahn Prestige', href: ASSET('9a995fe1-b52a-4cf3-9f8a-64931cb4a95b') }] },
                { name: 'Produktinformationsblatt ZAHN Sofort', bedingung: { baustein: 'ZAHN_SOFORT' }, dateien: [{ label: 'Produktinformationsblatt ZAHN Sofort', href: ASSET('02ac8283-2468-4a37-969a-dd85028a95ea') }] },
                { name: 'Highlightblatt', dateien: [{ label: 'Highlightblatt', href: ASSET('342e7342-bca0-4d64-89be-a30995eb4ce4') }] },
                { name: 'Schweigepflichtentbindungserklärung', dateien: [{ label: 'Schweigepflichtentbindungserklärung', href: ASSET('de3cea1f-6145-4a2c-989c-d47e08a55cfa') }] },
                { name: '§ 19 Abs. 5 VVG', dateien: [{ label: '§ 19 Abs. 5 VVG', href: ASSET('7249e1d4-8a50-4b5d-bf5a-9ef18a74d7a6') }] },
              ],
            },
            { von: 'Von Healio', eintraege: [{ name: 'Erstinformation', dateien: [{ label: 'Erstinformation', href: '/erstinformation' }] }, ...UNTERLAGEN_HEALIO.map((name) => ({ name, dateien: [] }))] },
          ],
          haken: 'Ich bestätige, dass ich vor Abgabe meiner Vertragserklärung folgende Informationen in Textform erhalten und gespeichert oder ausgedruckt habe:',
          hakenAbsaetze: ['Sie können alle Vertragsunterlagen natürlich auch nach Abschluss jederzeit abrufen. Dafür richten wir Ihnen nach Abschluss den Versicherungs- und Vertragsmanager "Meine Bayerische" ein. Weitere Details dazu sowie Ihre Zugangsdaten erhalten Sie per E-Mail.'],
          pflicht: true,
        },
      ],
    },
  ],

  zusammenfassung: { titel: TEIL_3_TITEL },
  absenden: { satz: fuerBayerische(TEXT_12_KNOPF), vorbehalt: fuerBayerische(BEITRAG_VORBEHALT), knopf: KNOPF_BEANTRAGEN },

  // Zuordnung zur Original-Strecke (Franks Vorgabe 12.11.2026): je Feld
  // Schritt und Feldname bzw. Kennung wie in bayerische-zahn.json, Wert so,
  // wie ihn das Original annimmt. Der Server füllt damit die Strecke ohne
  // Raten. ungesehen: Feld nur aus dem Programmcode gelesen.
  originalFuerVertrag: (daten, { beginn } = {}) => {
    const f = daten.formular || {};
    const iso = (text) => { const t = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(text || '')); return t ? `${t[3]}-${t[2]}-${t[1]}` : null; };
    const tarif = zahn.tarife.find((eintrag) => eintrag.id === daten.tarif);
    const zahlweise = zahn.zahlung.zahlweisen.find((eintrag) => eintrag.id === daten.zahlweise);
    const anrede = { herr: 'MALE', frau: 'FEMALE', divers: 'DIVERS' }[daten.anrede] || null;
    const ja = (key) => daten.erklaerungen?.[key] === true;
    const g = zahn.gesundheitFuerVertrag(daten.antworten, { tarif: daten.tarif });
    return [
      { schritt: 1, feld: 'policyBegin', wert: beginn ? beginn.label : null },
      { schritt: 1, feld: 'postcode', wert: String(daten.plz || '') },
      { schritt: 1, feld: 'firstname', wert: String(f.vorname || '').trim() },
      { schritt: 1, feld: 'birthday', wert: iso(daten.geburtsdatumText || '') },
      { schritt: 2, feld: 'tarif', wert: tarif?.original.sku || null },
      { schritt: 2, feld: 'ZAHN_SOFORT', wert: (daten.bausteine || []).includes('ZAHN_SOFORT') },
      { schritt: 2, feld: 'paymentRhythm', wert: zahlweise?.original || null },
      ...g.antworten.map((eintrag) => ({ schritt: 3, feld: `frage:${eintrag.frageId}`, wert: eintrag.antwortId })),
      { schritt: 4, feld: 'salutation', wert: anrede },
      { schritt: 4, feld: 'lastname', wert: String(f.nachname || '').trim() },
      { schritt: 4, feld: 'versichertePersonIstVersicherungsnehmer', wert: true },
      { schritt: 5, feld: 'city', wert: String(f.ort || '').trim() },
      { schritt: 5, feld: 'street', wert: String(f.strasse || '').trim() },
      { schritt: 5, feld: 'houseNumber', wert: String(f.hausnummer || '').trim() },
      { schritt: 5, feld: 'email', wert: String(f.email || '').trim() },
      { schritt: 6, feld: 'kontoinhaberWeichtAb', wert: false },
      { schritt: 6, feld: 'accountHolder', wert: [f.vorname, f.nachname].map((teil) => String(teil || '').trim()).join(' ') },
      { schritt: 6, feld: 'iban', wert: String(daten.iban || '').replace(/\s/g, '').toUpperCase() },
      { schritt: 6, feld: 'sepaEinzug', wert: ja('sepa'), ungesehen: true },
      { schritt: 7, feld: 'VVG_AGREED', wert: ja('vvg'), ungesehen: true },
      { schritt: 7, feld: 'DOCUMENTS_SECURED', wert: ja('unterlagen'), ungesehen: true },
      { schritt: 7, feld: 'ADVICE_WAIVED', wert: ja('beratungsverzichtVersicherer'), ungesehen: true },
      { schritt: 7, feld: 'CONFIDENTIALITY_WAIVED', wert: ja('schweigepflicht'), ungesehen: true },
      { schritt: 7, feld: 'ADVERTISING_ALLOWED', wert: ja('werbung'), ungesehen: true },
      { schritt: 7, feld: 'POLICY_BY_POST', wert: ja('policePost'), ungesehen: true },
    ];
  },

  // Antworten im Format der Risikoprüfung der Bayerischen
  // (POST /api/risk/evaluation): Fragebogen KZV oder KZV_SMART, je Frage die
  // Antwort-Kennung. Bei Frage 5 „ja“ wie im Original mit „unbekannt“.
  gesundheitFuerVertrag: (antworten = {}, { tarif } = {}) => {
    const smart = tarif === 'SMART';
    const liste = [];
    FRAGEN.forEach((eintrag) => {
      if (eintrag.id === 'z1' && smart) return;
      if (eintrag.id === 'z1s' && !smart) return;
      const wert = antworten[eintrag.id];
      if (wert !== 'ja' && wert !== 'nein') return;
      liste.push({ frageId: eintrag.original.frageId, antwortId: eintrag.original[wert], antwort: wert });
      if (wert === 'ja' && eintrag.original.folgeBeiJa) liste.push({ ...eintrag.original.folgeBeiJa, antwort: 'unbekannt' });
    });
    return { fragebogen: smart ? 'KZV_SMART' : 'KZV', fragebogenId: smart ? '10' : '9', antworten: liste };
  },
};

export default zahn;
