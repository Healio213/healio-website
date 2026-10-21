/**
 * Ambulant-Ratgeber Welle A: Heilpraktiker-Zusatzversicherung, Kriterien ohne
 * Sieger, Gesundheitsfragen im Antrag und der Stand "was schon läuft, zählt
 * nicht".
 *
 * Quellen (Abruf 07.10.2026, Belege in heilpraktiker-zusatzversicherung.belege.md):
 * SDK AVB Teil II AP-Tarife 1.753a (Stand 01.01.2023), SDK AVB Teil I
 * Allgemeiner Teil 1.751 (Stand 01.01.2022), Verbraucherzentrale
 * (Zusatzversicherungen, Stand 19.08.2025), § 19 VVG, § 15 SGB V.
 * Tarifaussagen wortgleich mit dem Inhalt von /ambulant (Vier Töpfe,
 * Ambulant 50, 70, 90 und 100, Beitrag Altersgruppe 21 bis 30 aus
 * src/data/sdkAmbulantBeitraege.js, Stand 29.09.2026).
 *
 * Bewusste Grenzen:
 *   - Keine Rangliste, kein Anbietervergleich: Die Seite nennt Kriterien und
 *     zeigt als Beispiel nur den Tarif, den Healio auf /ambulant vermittelt.
 *   - Keine Zahl zu Risikozuschlägen. Die Bedingungen nennen sie nur als
 *     Möglichkeit (Zuschlag), eine Höhe steht dort nicht. Seit 14.10.2026 nach
 *     Frank und SDK-Broschüre 1.781: keine Leistungsausschlüsse.
 *   - Das Rechenbeispiel arbeitet mit angenommenen Preisen und ist als eigene
 *     Rechnung gekennzeichnet. Eine neutrale Durchschnittsangabe für
 *     Heilpraktikerrechnungen gibt es nicht.
 *   - Keine Aussage zur Wirkung einer Behandlung und keine Behandlungsempfehlung.
 *   - Die Gesundheitsfragen stehen ohne Sperrformulierung als das, was sie
 *     sind: ein Teil des Antrags, der wahrheitsgemäß zu beantworten ist.
 *
 * Prüfung Opus 07.10.2026 (PRÜFBERICHT-ambulant.md): Status in Faktenkasten und
 * Fußzeile wie Zahn-Welle 1; Tarifaussagen gegen healio.de/ambulant, die Dateien
 * im Serien-Worktree und die SDK-AVB gelesen.
 *   - Einbau 07.10.2026: H1 gekürzt (vorher "... und wo ihre Grenzen liegen"),
 *     damit der Kurzantwort-Weg bei 390 px im ersten Bildschirm liegt (vorher
 *     872 px Unterkante).
 *
 * Zusammenlegung 14.10.2026 (Semrush-Analyse, Kannibalisierung): Der
 * Blogartikel heilpraktiker-zusatzversicherung-vergleich-2026 ist in diese
 * Seite übernommen und leitet per 301 hierher (vercel.json). Übernommen nur,
 * was belegt ist: Wartezeit-Abschnitt (SDK AVB Teil II, Abschnitt II),
 * für wen es passt und für wen nicht, Beitragsentwicklung, Kassenbonus mit
 * IKK-Beispiel (Werte aus ikk-classic-bonusprogramm-2026, Beitrag AP1 21 bis
 * 30 Jahre). Suchbegriffe: zusatzversicherung heilpraktiker,
 * heilpraktikerversicherung, versicherung für heilpraktiker, ohne wartezeit.
 *
 * Ausbau 21.10.2026 (SEO, Hauptbegriff "heilpraktiker zusatzversicherung" und
 * "zusatzversicherung heilpraktiker"; Fragen aus der Search Console):
 *   - Neuer Abschnitt "kosten" mit allen Altersgruppen und Stufen. Die Beiträge
 *     kommen unverändert aus src/data/sdkAmbulantBeitraege.js (eine
 *     Datenquelle mit /ambulant und dem Tarifvergleich), auch die bisher von
 *     Hand eingetragenen Werte der Gruppe 21 bis 30. Kein Beitrag steht hier
 *     als feste Zahl.
 *   - Neue FAQ nur mit Beleg: 100 Prozent (AVB 1.753a I.5), Abrechnung nach
 *     GebüH (1.753a I.5, I.8, Glossar "Erstattungsfähige Kosten"; 1.751 A.8
 *     Abs. 2, A.9 Abs. 2), schon beim Heilpraktiker gewesen (1.751 A.1, A.4;
 *     SDK-Broschüre 1.781/07.23), zwei Verträge (1.751 A.8 Abs. 4, A.9 Abs. 1;
 *     ARAG-Antrag A842, Abruf 21.10.2026), steuerlich absetzen (§ 10 Abs. 1
 *     Nr. 3a und Abs. 4 EStG, Abruf 21.10.2026), Kinder (1.753a III.1 Abs. 3
 *     und Versicherungsfähigkeit).
 *   - Vorerkrankung: Nach Frank und SDK-Broschüre 1.781/07.23 werden
 *     Vorerkrankungen über feste Zuschläge mitversichert, ohne Ablehnung und
 *     ohne Leistungsausschluss. Die älteren Sätze zu möglichen Ausschlüssen
 *     (Glossar AVB 1.751) sind deshalb an Franks Regel vom 14.10.2026
 *     angeglichen.
 *   - Kassenbonus als Geheimtipp am Ende (eigener Abschnitt), IKK-Werte nach
 *     Satzung: bis zu 810 EUR, in der Schwangerschaft bis zu 1.155 EUR, breite
 *     Masse 400 bis 700 EUR nach Healio-Einschätzung aus der Beratung.
 *   - Bewusst nicht aufgenommen: einzelne Verfahren als Suchthema (etwa
 *     Ausleitung), Testsieger-Abschnitt, Link auf die Meta-Zielseite
 *     /check/naturheilkunde (noindex, zählt Leads für den Meta-Test).
 *   - Nachbarn der Gruppe ambulant bleiben bei vier (Prüfgrenze), neue Links
 *     gehen auf Zusatzversicherungs-Ratgeber anderer Gruppen.
 */

import { BEISPIEL_GRUPPE, SDK_AMBULANT_BEITRAEGE } from '../../data/sdkAmbulantBeitraege.js';

// Beträge in deutscher Schreibweise mit zwei Nachkommastellen (1.218,24).
const eur = (wert) => {
  const [ganz, cent] = wert.toFixed(2).split('.');
  return `${ganz.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${cent}`;
};
const runden = (wert) => Math.round(wert * 100) / 100;

const STAND_BEITRAEGE = SDK_AMBULANT_BEITRAEGE.stand;
const GRUPPEN = SDK_AMBULANT_BEITRAEGE.gruppen;
const KINDER = GRUPPEN.find((gruppe) => gruppe.von === 0);
const ERWACHSENE = GRUPPEN.filter((gruppe) => gruppe.von > 0);
const GRUPPE_31 = GRUPPEN.find((gruppe) => gruppe.von === 31);
// Beispielgruppe 21 bis 30 Jahre, wie auf /ambulant ohne Geburtsjahr.
const BEISPIEL = BEISPIEL_GRUPPE;
const ERWACHSENE_VON = Math.min(...ERWACHSENE.map((gruppe) => gruppe.AP5));
const ERWACHSENE_BIS = Math.max(...ERWACHSENE.map((gruppe) => gruppe.AP1));
const STUFEN = ['AP5', 'AP7', 'AP9', 'AP1'];
const gruppenName = (gruppe) => {
  if (gruppe.von === 0) return `0 bis ${gruppe.bis} Jahre (Kinderbeitrag)`;
  return gruppe.bis === null ? `ab ${gruppe.von} Jahren` : `${gruppe.von} bis ${gruppe.bis} Jahre`;
};

export const article = {
  slug: 'heilpraktiker-zusatzversicherung',
  kind: 'ratgeber',
  group: 'ambulant',

  metaTitle: 'Heilpraktiker Zusatzversicherung: Kosten & Wartezeit | Healio',
  metaDescription:
    'Zusatzversicherung Heilpraktiker: bis 100 % und 1.000 EUR in zwei Jahren, keine Wartezeit laut Bedingungen, Beiträge nach Alter in der Tabelle, Kassenbonus-Tipp.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  updatedAt: '2026-10-21',
  updatedAtLabel: '21. Oktober 2026',
  readingTimeMinutes: 15,

  listTitle: 'Heilpraktiker-Zusatzversicherung: Kriterien, Grenzen und ein Rechenbeispiel',
  listTeaser:
    'Was eine Heilpraktiker-Zusatzversicherung erstattet, woran du sie prüfst und was ehrlich zu den Gesundheitsfragen im Antrag und zu bestehenden Beschwerden gehört.',

  headline: 'Heilpraktiker Zusatzversicherung: worauf es ankommt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'naturopathy',
    facts: [
      { value: 'bis zu 1.000 EUR', label: 'für Naturheilverfahren in zwei Jahren, 100 Prozent in Ambulant 100' },
      { value: `${eur(ERWACHSENE_VON)} bis ${eur(ERWACHSENE_BIS)} EUR`, label: 'im Monat ab 21 Jahren, je nach Alter und Stufe' },
      { value: 'Was läuft, zählt nicht', label: 'Behandlungen vor Versicherungsbeginn sind nicht versichert' },
    ],
    text: 'Die gesetzliche Kasse zahlt Heilpraktiker in der Regel nicht. Ein Zusatztarif erstattet nach seinen Bedingungen, mit Höchstbetrag, Erstattungssatz und Regeln zu bestehenden Beschwerden. Bei der SDK gilt laut Tarifbedingungen keine Wartezeit. Gesundheitsfragen gibt es, eine Ablehnung wegen Vorerkrankungen nicht.',
    path: { to: '/ambulant', text: 'Heilpraktiker, Brille, Vorsorge?', label: 'Tarifstufen und Beitrag ansehen' },
  },

  lead:
    `Eine Heilpraktiker-Zusatzversicherung erstattet nach ihren Bedingungen einen Teil deiner Heilpraktikerrechnung, denn die gesetzliche Kasse zahlt sie in der Regel nicht. Wie viel das ist, wofür und ab wann, regeln die Tarifbedingungen. Bei den ambulanten SDK-Tarifen, die Healio vermittelt, sind es 50 bis 100 Prozent, höchstens 1.000 EUR in zwei Kalenderjahren, laut Bedingungen ohne Wartezeit. Ab 21 Jahren kostet das ${eur(ERWACHSENE_VON)} bis ${eur(ERWACHSENE_BIS)} EUR im Monat, je nach Alter und Stufe. Eine Rangliste mit einem Sieger gibt es hier nicht, weil sie bei diesem Thema in die Irre führt. Du bekommst stattdessen Kriterien, die Beiträge aller Altersgruppen, ein Rechenbeispiel und die Grenzen, die du vor dem Antrag kennen solltest.`,

  sections: [
    {
      id: 'was-zahlt',
      heading: 'Was zahlt eine Heilpraktiker-Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Tarif zahlt einen Teil der Rechnung, den die Bedingungen als erstattungsfähig einstufen. Die gesetzliche Krankenkasse übernimmt Heilpraktikerbehandlungen dagegen in der Regel nicht. Ärztliche Behandlung wird nach § 15 SGB V von Ärzten erbracht, und die Verbraucherzentrale schreibt etwa zur Akupunktur, dass Sitzungen beim Heilpraktiker aus eigener Tasche zu zahlen sind. Einzelne Kassen zahlen nach ihrer Satzung Zuschüsse in angrenzenden Bereichen, etwa für Osteopathie oder für naturheilkundliche Arzneimittel auf ärztliches Privatrezept.',
        },
        {
          type: 'paragraph',
          text: 'Ob du sie Heilpraktikerversicherung, Zusatzversicherung für den Heilpraktiker oder ambulanten Zusatztarif nennst, gemeint ist dasselbe: eine private Krankenzusatzversicherung, die neben deiner gesetzlichen Kasse läuft und Rechnungen für Naturheilverfahren erstattet. Mit einer Berufshaftpflicht für Heilpraktiker, also einer Versicherung für die Praxis selbst, hat sie nichts zu tun.',
        },
        {
          type: 'paragraph',
          text: 'Wie ein Zusatztarif das ausgestaltet, zeigt der ambulante Tarif der SDK, den Healio auf der Seite Ambulant vermittelt. Er versichert Naturheilverfahren und Behandlungen durch Heilpraktiker, wenn die Heilpraktikerin oder der Heilpraktiker die Anforderungen des Heilpraktikergesetzes erfüllt und nach dem Gebührenverzeichnis für Heilpraktiker (GebüH) abrechnet. Erstattet werden alle Leistungen, die im aktuellen GebüH stehen. Als Naturheilverfahren gelten die Verfahren nach dem Hufelandverzeichnis in der jeweils gültigen Fassung. Ausgenommen ist Psychotherapie durch Heilpraktiker. Geht es dir um ein bestimmtes Verfahren, frag vorher, unter welcher GebüH-Ziffer die Praxis es abrechnet.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Topf Naturheilverfahren der SDK-Tarife AP5 bis AP1 und Beitrag der Altersgruppe 21 bis 30',
          head: ['Stufe', 'Erstattung', 'Naturheilverfahren in zwei Kalenderjahren', 'Beitrag im Monat, 21 bis 30 Jahre'],
          rows: [
            ['Ambulant 50 (AP5)', '50 Prozent', 'bis 500 EUR', `${eur(BEISPIEL.AP5)} EUR`],
            ['Ambulant 70 (AP7)', '70 Prozent', 'bis 700 EUR', `${eur(BEISPIEL.AP7)} EUR`],
            ['Ambulant 90 (AP9)', '90 Prozent', 'bis 900 EUR', `${eur(BEISPIEL.AP9)} EUR`],
            ['Ambulant 100 (AP1)', '100 Prozent', 'bis 1.000 EUR', `${eur(BEISPIEL.AP1)} EUR`],
          ],
          note: `Quelle: SDK, Allgemeine Versicherungsbedingungen Teil II, Tarife AP5, AP7, AP9 und AP1, Stand 01.01.2023, Abschnitt I.5. Die Zeiträume zählen ab Versicherungsbeginn. Die Beiträge hängen vom Alter ab, die Tabelle zeigt die Gruppe 21 bis 30 Jahre, alle Altersgruppen stehen im nächsten Abschnitt. Beiträge der SDK-Tarife, Stand ${STAND_BEITRAEGE}, wortgleich mit healio.de/ambulant. Die Beiträge ersetzen kein persönliches Angebot, deinen Beitrag siehst du im Tarifrechner auf der Seite Ambulant.`,
        },
        {
          type: 'paragraph',
          text: 'Der Topf für Naturheilverfahren ist einer von vier. In der höchsten Stufe kommen Sehhilfen (bis 500 EUR), Vorsorge (bis 500 EUR) und gesetzliche Zuzahlungen (bis 1.000 EUR) hinzu, zusammen bis zu 3.000 EUR in zwei Jahren. Mehr als die Rechnung zahlt der Tarif nie.',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine Heilpraktiker-Zusatzversicherung im Monat?',
      blocks: [
        {
          type: 'paragraph',
          text: `Bei den ambulanten SDK-Tarifen zahlst du ab 21 Jahren zwischen ${eur(ERWACHSENE_VON)} und ${eur(ERWACHSENE_BIS)} EUR im Monat. Für Kinder beginnt der Beitrag bei ${eur(KINDER.AP5)} EUR. Wo du in dieser Spanne landest, entscheiden zwei Dinge: die Stufe, also wie viel Prozent der Tarif erstattet, und dein Alter. Ambulant 100 mit 100 Prozent Erstattung kostet mit 21 bis 30 Jahren ${eur(BEISPIEL.AP1)} EUR im Monat.`,
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: `Monatsbeitrag der SDK-Tarife AP5 bis AP1 nach Altersgruppe, Stand ${STAND_BEITRAEGE}`,
          head: ['Altersgruppe', 'Ambulant 50 (AP5)', 'Ambulant 70 (AP7)', 'Ambulant 90 (AP9)', 'Ambulant 100 (AP1)'],
          rows: GRUPPEN.map((gruppe) => [gruppenName(gruppe), ...STUFEN.map((stufe) => `${eur(gruppe[stufe])} EUR`)]),
          note: `Quelle: Beiträge der SDK-Tarife, Stand ${STAND_BEITRAEGE}, dieselben Werte wie im Tarifrechner auf healio.de/ambulant. Maßgeblich ist das erreichte Alter, also das laufende Kalenderjahr minus dein Geburtsjahr (SDK, Allgemeine Versicherungsbedingungen Teil II, Abschnitt III.1). Bei Vorerkrankungen kommt ein Risikozuschlag dazu. Die Beiträge können angepasst werden und ersetzen kein persönliches Angebot.`,
        },
        {
          type: 'paragraph',
          text: 'Die Altersgruppe wechselt nicht am Geburtstag, sondern zum Jahreswechsel. Nach dem 20., 30., 40., 50., 60. und 70. Geburtstag zahlst du ab dem folgenden Kalenderjahr den Beitrag der nächsten Gruppe. Kinder zahlen bis zum Ende des Kalenderjahres, in dem sie 20 werden, den Kinderbeitrag. Weil der Tarif keine Alterungsrückstellungen bildet, steigt der Beitrag mit den Jahren. Außerdem darf die SDK die Beiträge neu festsetzen, wenn die Leistungsausgaben um mehr als 5 Prozent von der Kalkulation abweichen, das nicht nur vorübergehend ist und ein unabhängiger Treuhänder zustimmt.',
        },
        {
          type: 'paragraph',
          text: `Am günstigsten ist Ambulant 50, mit 21 bis 30 Jahren ${eur(BEISPIEL.AP5)} EUR im Monat. Dafür erstattet die Stufe 50 Prozent und höchstens 500 EUR für Naturheilverfahren in zwei Jahren. Dieser Topf ist mit Rechnungen über 1.000 EUR ausgeschöpft. Leg den Preis deshalb immer neben das, was die Stufe zurückgibt.`,
        },
        {
          type: 'steps',
          heading: 'So rechnest du Beitrag gegen Erstattung',
          items: [
            {
              title: 'Beitrag für zwei Jahre',
              text: `Nimm den Monatsbeitrag deiner Altersgruppe mal 24. Mit 35 Jahren kostet Ambulant 100 ${eur(GRUPPE_31.AP1)} EUR im Monat, in zwei Jahren also ${eur(runden(GRUPPE_31.AP1 * 24))} EUR.`,
            },
            {
              title: 'Erstattung für zwei Jahre',
              text: 'Nimm deine geplanten Heilpraktikerkosten mal den Erstattungssatz, höchstens bis zum Topf deiner Stufe. Bei 800 EUR in zwei Jahren erstattet Ambulant 100 bis zu 800 EUR, Ambulant 50 bis zu 400 EUR, soweit die Rechnungen erstattungsfähig sind.',
            },
            {
              title: 'Weitere Töpfe ehrlich ansetzen',
              text: 'Brille, Vorsorge und gesetzliche Zuzahlungen zählst du nur dazu, wenn du sie wirklich nutzt. In Ambulant 100 sind das bis 500, 500 und 1.000 EUR in zwei Jahren, mit den Naturheilverfahren zusammen bis 3.000 EUR.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie dein Kassenbonus den Beitrag mittragen kann, steht am Ende dieser Seite. Für die anderen Töpfe gibt es eigene Ratgeber: ' },
            { text: 'Brillenversicherung', to: '/ratgeber/brillenversicherung' },
            { text: ' für die Brille, ' },
            { text: 'Vorsorge Zusatzversicherung 2026', to: '/ratgeber/vorsorge-zusatzversicherung-2026' },
            { text: ' zu den Vorsorge-Töpfen verschiedener Anbieter und ' },
            { text: 'Zusatzversicherung für Kinder', to: '/ratgeber/zusatzversicherung-kinder' },
            { text: ' für die Familie.' },
          ],
        },
        {
          type: 'path',
          to: '/ambulant#tarifwahl',
          icon: 'calculator',
          text: 'Gib dein Geburtsjahr ein, dann siehst du deinen Beitrag in jeder Stufe.',
          label: 'Beitrag berechnen',
        },
      ],
    },
    {
      id: 'kriterien',
      heading: 'Woran erkennst du eine passende Heilpraktiker-Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nicht an einem Preis allein und nicht an einer „besten“ Liste. Zwei Tarife mit gleichem Erstattungssatz können sehr unterschiedlich zahlen, wenn Höchstbetrag, Behandlerkreis und Annahmeregeln abweichen. Die Verbraucherzentrale nennt unter anderem Wartezeiten, begrenzte Leistungen in den ersten Versicherungsjahren und dauerhafte Höchstbeträge als Punkte, auf die du achten solltest. Prüf deshalb diese Kriterien, eines nach dem anderen.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Kriterien für eine Heilpraktiker-Zusatzversicherung und was bei den SDK-Bedingungen dazu steht',
          head: ['Kriterium', 'Was du in den Bedingungen suchst', 'So sieht es bei den SDK-Tarifen aus'],
          rows: [
            ['Behandler und Verfahren', 'Welche Heilpraktiker, welche Methoden, welche Ausnahmen', 'Heilpraktiker nach Heilpraktikergesetz, Abrechnung nach GebüH, Verfahren nach Hufelandverzeichnis, Psychotherapie ausgenommen'],
            ['Erstattungssatz', 'Prozent wovon: von der Rechnung oder nur vom erstattungsfähigen Teil', '50 bis 100 Prozent der erstattungsfähigen Kosten, je nach Stufe'],
            ['Höchstbetrag und Zeitraum', 'Euro je Jahr oder je zwei Jahre, gemeinsamer Topf oder je Leistung', '500 bis 1.000 EUR je zwei Kalenderjahre ab Versicherungsbeginn'],
            ['Anlaufstaffel', 'Gilt in den ersten Jahren eine niedrigere Grenze', 'Für Naturheilverfahren nennen die Bedingungen keine Staffel, die Zwei-Jahres-Zeiträume zählen ab Versicherungsbeginn'],
            ['Wartezeit', 'Ab wann der Tarif zahlt', 'Die Tarifbedingungen sehen keine Wartezeiten vor'],
            ['Mehrere Kostenträger', 'Wie Kassenzuschuss oder andere Versicherungen angerechnet werden', 'Die gesamte Erstattung darf nicht höher sein als die gesamten Kosten'],
            ['Annahme', 'Gesundheitsfragen, Zuschlag, Ausschluss', 'Gesundheitsprüfung vor Vertragsbeginn, keine Ablehnung, Vorerkrankungen per Risikozuschlag mitversichert, kein Leistungsausschluss'],
            ['Laufzeit und Beitrag', 'Kündigungsfrist, Beitragsanpassung, Beitrag nach Alter', 'Versicherungsjahr 1. Juli bis 30. Juni, Kündigung mit 3 Monaten Frist zum Ende des Versicherungsjahres, Beitrag nach erreichtem Alter, Anpassungen möglich'],
          ],
          note: 'Quellen: SDK, Allgemeine Versicherungsbedingungen Teil I (Stand 01.01.2022), Abschnitte A.4, A.8 und D.1, und Teil II (Stand 01.01.2023), Abschnitte I.5, II und III. Die Spalte zu den SDK-Tarifen ist ein Beispiel für die Prüfung, kein Vergleich mit anderen Anbietern.',
        },
        {
          type: 'paragraph',
          text: 'Lies außerdem, wie der Versicherer den Begriff Naturheilverfahren abgrenzt. Die SDK trennt im Glossar zwischen klassischen Naturheilverfahren und sogenannten Außenseiterverfahren, die sie als wissenschaftlich nicht anerkannt beschreibt. Ob deine Methode erstattet wird, entscheidet am Ende der Versicherer nach seinen Bedingungen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie die SDK neben Barmenia, ARAG, HanseMerkur, SIGNAL IDUNA, DKV und UKV abschneidet, zeigt der ' },
            { text: 'Heilpraktiker Zusatzversicherung Vergleich 2026', to: '/ratgeber/heilpraktiker-zusatzversicherung-vergleich-2026' },
            { text: ' mit Quelle zu jedem Wert.' },
          ],
        },
      ],
    },
    {
      id: 'wartezeit',
      heading: 'Gibt es eine Heilpraktiker-Zusatzversicherung ohne Wartezeit?',
      blocks: [
        {
          type: 'segments',
          segments: [
            { text: 'Ja. Die ambulanten Tarife der SDK sehen laut ihren ' },
            { text: 'Tarifbedingungen', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf' },
            { text: ' (Teil II, Abschnitt II) keine Wartezeiten vor. Der Schutz gilt ab dem vereinbarten Versicherungsbeginn. Üblich ist das nicht überall: Die Verbraucherzentrale nennt drei Monate als gängige Wartezeit bei Zusatzversicherungen. Lies diesen Punkt deshalb in jedem Angebot nach, bevor du Tarife vergleichst.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Ohne Wartezeit heißt aber nicht, dass schon Begonnenes mitversichert ist. Für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind, leistet der Versicherer nach den Allgemeinen Bedingungen der SDK (Teil I, A.4) nicht. Wer mitten in einer Behandlungsserie abschließt, bekommt diese Serie also nicht erstattet. Gesundheitsfragen stellt der Antrag trotzdem, darum geht es im nächsten Abschnitt.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was der Wegfall der Wartezeit im Alltag bedeutet und ab welchem Tag die erste Rechnung zählt, erklärt der Ratgeber ' },
            { text: 'Heilpraktiker-Zusatzversicherung ohne Wartezeit', to: '/ratgeber/heilpraktiker-zusatzversicherung-ohne-wartezeit' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'gesundheitsfragen',
      heading: 'Warum sind die Gesundheitsfragen im Antrag so wichtig?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Antrag enthält Gesundheitsfragen, und du beantwortest sie vollständig und wahrheitsgemäß. Das ist keine Formalie: Nach § 19 VVG musst du gefahrerhebliche Umstände anzeigen, nach denen der Versicherer in Textform gefragt hat. Wer das verletzt, riskiert Rücktritt oder Kündigung, und im schlimmsten Fall steht die Leistung später infrage.',
        },
        {
          type: 'paragraph',
          text: 'Was nach den Antworten passiert, regeln die Bedingungen. Die SDK führt vor Vertragsbeginn eine Gesundheitsprüfung durch. Laut den Angaben auf der Seite Ambulant wirst du grundsätzlich nicht abgelehnt, auch nicht mit Vorerkrankungen. Vorerkrankungen versichert die SDK über einen Risikozuschlag auf den Beitrag mit, Leistungsausschlüsse gibt es dabei nicht. Eine Heilpraktiker-Zusatzversicherung mit Vorerkrankung ist bei der SDK also möglich: Laut ihrer Broschüre zur ambulanten Zusatzversicherung geht das direkt im Antrag über feste Zuschläge, ohne Arztanfrage. Behandlungen, die vor Versicherungsbeginn schon laufen oder angeraten sind, bleiben trotzdem ausgenommen.',
        },
        {
          type: 'paragraph',
          text: 'Für dich heißt das: Dein Gesundheitszustand entscheidet mit darüber, was du zahlst und was versichert ist. Was bei Versicherungsbeginn schon behandelt wird oder angeraten ist, bleibt laut der Seite Ambulant ausgenommen. Für genau diese Beschwerde hilft ein neuer Vertrag also nicht weiter.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'naturopathy',
          text: 'Du siehst die Tarifstufen und deinen Beitrag, bevor du irgendetwas beantragst.',
          label: 'Tarifstufen ansehen',
        },
      ],
    },
    {
      id: 'bestehende-beschwerden',
      heading: 'Ist eine bestehende Beschwerde automatisch mitversichert?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Nach den Allgemeinen Bedingungen der SDK leistet der Versicherer nicht für Versicherungsfälle, die vor Beginn des Versicherungsschutzes eingetreten sind. Für Versicherungsfälle nach Vertragsabschluss zahlt er die Kosten, die ab dem Versicherungsbeginn entstanden sind.',
        },
        {
          type: 'paragraph',
          text: 'Ein Versicherungsfall ist die medizinisch notwendige Heilbehandlung wegen einer Krankheit oder der Folgen eines Unfalls. Er beginnt mit der Heilbehandlung und endet, wenn nach medizinischem Befund keine Behandlungsbedürftigkeit mehr besteht. Eine Behandlung, die schon vor dem Vertrag lief und weiterläuft, beginnt deshalb nicht neu. Auf der Seite Ambulant heißt es entsprechend, dass Behandlungen, die vor Beginn schon laufen oder angeraten sind, ausgenommen bleiben. Im Einzelfall entscheidet der Versicherer, frag deshalb vor dem Abschluss nach.',
        },
        {
          type: 'list',
          items: [
            'Eine neue Beschwerde, die erst nach dem Versicherungsbeginn auftritt, kann versichert sein.',
            'Eine Behandlung, die vor dem Beginn schon lief oder angeraten war, ist nicht versichert, auch wenn du sie später fortsetzt.',
            'Eine Vorerkrankung versichert die SDK über einen festen Zuschlag mit, einen Leistungsausschluss vereinbart sie dafür laut ihrer Broschüre nicht. Eine laufende Behandlung bleibt trotzdem draußen.',
            'Der Abschluss gehört deshalb vor die Behandlung, nicht mittendrin.',
          ],
        },
      ],
    },
    {
      id: 'lohnt-sich',
      heading: 'Lohnt sich eine Heilpraktiker-Zusatzversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das hängt davon ab, wie viel du tatsächlich beim Heilpraktiker ausgibst, was die übrigen drei Töpfe für dich bedeuten und wie viel von deinem Beitrag ein Kassenbonus tragen kann. Die Karte unten rechnet ein Beispiel durch, damit du die Größenordnung siehst. Die Preise sind angenommen, deine Praxis nennt dir ihre eigenen.',
        },
        {
          type: 'costCard',
          title: 'Heilpraktikerrechnung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit der Stufe Ambulant 100 (AP1): 100 Prozent der erstattungsfähigen Kosten, bis 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Der Vertrag besteht schon, bevor die Behandlung beginnt.',
          caption: 'Kostenkarte: Heilpraktikerrechnung mit und ohne Zusatztarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['8 Sitzungen, angenommen 80 EUR je Sitzung (640 EUR)', 'meist nichts', '640 EUR', 'Der Tarif erstattet bis zu 640 EUR, soweit die Rechnung erstattungsfähig ist'],
            ['Längere Serie, angenommen 1.400 EUR', 'meist nichts', '1.400 EUR', 'Höchstens 1.000 EUR in zwei Kalenderjahren, die übrigen 400 EUR trägst du'],
            [`Beitrag Ambulant 100 über zwei Jahre, 21 bis 30 Jahre (${eur(BEISPIEL.AP1)} EUR im Monat)`, 'nicht betroffen', 'nichts', `${eur(runden(BEISPIEL.AP1 * 24))} EUR Beitrag, den ein Kassenbonus teilweise mittragen kann`],
            ['Behandlung schon vor dem Versicherungsbeginn gestartet', 'meist nichts', 'die ganze Rechnung', 'Nicht versichert, wenn der Versicherungsfall vor dem Beginn eingetreten ist'],
          ],
          note: `Rechenbeispiel mit angenommenen Preisen, keine Preisangabe und kein Durchschnitt. Eigene Rechnung: ${eur(BEISPIEL.AP1)} EUR mal 12 Monate mal 2 Jahre ergibt ${eur(runden(BEISPIEL.AP1 * 24))} EUR. Tarifwerte nach den SDK-Bedingungen Teil II, Stand 01.01.2023, Beitrag nach der Beitragstabelle der SDK wie auf healio.de/ambulant (Stand ${STAND_BEITRAEGE}). Was erstattungsfähig ist, steht in den Bedingungen, verbindlich ist die Entscheidung des Versicherers.`,
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
        {
          type: 'paragraph',
          text: 'Das Beispiel zeigt etwas, das in vielen Vergleichen fehlt: Wenn du nur Heilpraktikerkosten im Blick hast, kann der Beitrag über zwei Jahre höher liegen als das, was der Topf zurückgibt. Anders sieht die Rechnung aus, wenn du auch Brille, Vorsorge oder gesetzliche Zuzahlungen nutzt und ein Bonus einen Teil des Beitrags trägt. Dann gehört alles zusammen auf den Tisch.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Passt eher,', text: 'wenn du mehrere Termine im Jahr beim Heilpraktiker oder in der Osteopathie fest einplanst, wenn der Zuschuss deiner Kasse dafür nicht reicht oder wenn du Vorsorge und Brille ohnehin nutzt.' },
            { lead: 'Passt eher nicht,', text: 'wenn du nur selten privat zahlst. Dann ist der Beitrag oft höher als der Nutzen. Prüf auch genau, wenn eine Behandlung schon läuft oder angeraten ist, denn die ist nicht versichert.' },
            { lead: 'Beitrag über die Jahre.', text: 'Der Monatsbeitrag ist nur der Einstieg. Er richtet sich nach dem erreichten Alter und kann angepasst werden. Rechne deshalb nicht nur mit dem ersten Jahr.' },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: `Der größte Hebel liegt oft beim Bonusprogramm deiner Kasse. Ein Beispiel mit den Satzungswerten der IKK classic: Check-up, Krebsfrüherkennung, zwei Zahnkontrollen, eine Impfung, dazu Fitnessstudio, Sportverein, BMI und Blutdruck ergeben als Zuschuss 405 EUR im Jahr. Der Jahresbeitrag für Ambulant 100 liegt in der Altersgruppe 21 bis 30 bei ${eur(runden(BEISPIEL.AP1 * 12))} EUR. Der Zuschuss kann ihn in diesem Fall ganz tragen, erstattet wird aber höchstens der gezahlte Beitrag. Ausgezahlt wird erst nach dem Antrag im Folgejahr, bis dahin zahlst du den Beitrag selbst. Gegenzurechnen ist der Zusatzbeitrag der IKK classic von 3,85 Prozent. Alle Positionen und die Rechnung dazu stehen im Ratgeber ` },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '.' },
          ],
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            { lead: 'Eine Rangliste würde dich in die Irre führen.', text: 'Ob ein Tarif passt, hängt an Behandlern, Höchstbeträgen, Annahme und deinem Alter. Darum stehen hier Kriterien statt eines Siegers.' },
            { lead: 'Die Gesundheitsfragen sind Teil des Vertrags.', text: 'Falsche oder unvollständige Antworten können Rücktritt oder Kündigung nach sich ziehen. Wer ehrlich antwortet, zahlt bei der SDK im Zweifel einen Zuschlag und hat dafür eine verlässliche Grundlage.' },
            { lead: 'Was vorher lief, zählt nicht.', text: 'Behandlungen vor dem Versicherungsbeginn sind nicht versichert, auch wenn die Vorerkrankung selbst per Zuschlag mitversichert ist.' },
            { lead: 'Der Versicherer prüft die Methode.', text: 'Er leistet für Methoden, die von der Schulmedizin überwiegend anerkannt sind. Dazu kommen Methoden, die sich in der Praxis als ebenso erfolgversprechend bewährt haben oder angewandt werden, weil es keine schulmedizinische gibt. Bei den bewährten darf er auf den Betrag kürzen, der bei schulmedizinischer Behandlung angefallen wäre. Dieser Ratgeber sagt nichts zur Wirkung einer Behandlung.' },
          ],
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft die Erstattung ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du zahlst die Rechnung zunächst selbst und reichst sie danach ein. Der Versicherer leistet erst, wenn die geforderten Nachweise vorliegen.',
        },
        {
          type: 'steps',
          heading: 'In drei Schritten zur Erstattung',
          items: [
            {
              title: 'Rechnung nach GebüH',
              text: 'Die Rechnung nennt deinen Namen, die Krankheit, die erbrachten Leistungen mit den Nummern des Gebührenverzeichnisses und das Behandlungsdatum.',
            },
            {
              title: 'Rechnung einreichen',
              text: 'Du schickst die Rechnung im Original ein, auch in elektronischer Form. Hat schon ein anderer Kostenträger gezahlt, reicht eine Kopie mit dessen Erstattungsnachweis.',
            },
            {
              title: 'Versicherer prüft und zahlt',
              text: 'Er stellt fest, ob und in welcher Höhe er leisten muss. Er erstattet nach Erstattungssatz und bis zum Höchstbetrag des Topfs.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wie die Rechnung aufgebaut ist und was das Gebührenverzeichnis überhaupt ist, erklärt der Ratgeber zur Gebührenordnung für Heilpraktiker.',
        },
      ],
    },
    {
      id: 'kassenbonus',
      heading: 'Geheimtipp: Wie kann dein Kassenbonus den Beitrag mittragen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Erst kommt der Schutz, dann der Bonus. Viele gesetzliche Kassen zahlen ihren Bonus auf Wunsch als zweckgebundenen Zuschuss zu einer privaten Zusatzversicherung aus. So trägt der Bonus einen Teil deines Beitrags, im IKK-Beispiel weiter oben sogar den ganzen. Erstattet wird dabei nie mehr als der Beitrag, den du nachweislich gezahlt hast.',
        },
        {
          type: 'paragraph',
          text: 'Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschusswert im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR. Das sind Höchstwerte. In der breiten Masse kommen nach unserer Erfahrung aus der Beratung 400 bis 700 EUR zusammen. Gegenzurechnen ist immer der Zusatzbeitrag der Kasse.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus. Welche Kasse wie viel dazugibt, vergleichst du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: '.' },
          ],
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'bonus',
          text: 'Auf der Seite Ambulant legst du Beitrag und Bonus nebeneinander.',
          label: 'Bonus und Beitrag prüfen',
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'naturopathy',
              tone: 'mint',
              title: 'Heilpraktiker Kosten: wer zahlt was',
              text: 'Alle Bereiche auf einer Seite: Heilpraktiker, Osteopathie, Akupunktur und mehr.',
              to: '/ratgeber/heilpraktiker-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'document',
              tone: 'butter',
              title: 'Gebührenordnung für Heilpraktiker',
              text: 'Warum das GebüH kein Preisgesetz ist und was auf der Rechnung steht.',
              to: '/ratgeber/gebuehrenordnung-heilpraktiker',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'comparison',
              tone: 'sky',
              title: 'Heilpraktiker Zusatzversicherung Vergleich 2026',
              text: 'Bekannte Tarife mit Erstattung, Wartezeit und Brille nebeneinander.',
              to: '/ratgeber/heilpraktiker-zusatzversicherung-vergleich-2026',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'document',
              tone: 'mint',
              title: 'Zusatzversicherung trotz Vorerkrankung',
              text: 'Wo du mit Vorgeschichte angenommen wirst und wo nicht.',
              to: '/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für Heilpraktiker und Osteopathie, Brille, Vorsorge und gesetzliche Zuzahlungen vermittelt Healio die ambulanten Tarife der SDK, in der höchsten Stufe mit bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was zahlt eine Heilpraktiker-Zusatzversicherung?',
      answer:
        'Eine Heilpraktiker-Zusatzversicherung erstattet einen Teil der Heilpraktikerrechnung nach ihren Bedingungen. Bei den ambulanten SDK-Tarifen sind das 50 bis 100 Prozent der erstattungsfähigen Kosten für Naturheilverfahren, höchstens 500 bis 1.000 EUR in zwei Kalenderjahren, je nach Stufe. Heilpraktiker müssen nach dem GebüH abrechnen, Psychotherapie ist ausgenommen.',
    },
    {
      question: 'Was kostet eine Heilpraktikerversicherung im Monat?',
      answer:
        `Bei den ambulanten SDK-Tarifen zahlst du ab 21 Jahren je nach Alter und Stufe ${eur(ERWACHSENE_VON)} bis ${eur(ERWACHSENE_BIS)} EUR im Monat, für Kinder ab ${eur(KINDER.AP5)} EUR (Stand ${STAND_BEITRAEGE}). Ambulant 100 kostet mit 21 bis 30 Jahren ${eur(BEISPIEL.AP1)} EUR. Bei Vorerkrankungen kann ein Risikozuschlag dazukommen. Deinen Beitrag siehst du auf der Seite Ambulant, sobald du dein Geburtsjahr eingibst.`,
    },
    {
      question: 'Gibt es eine Heilpraktikerversicherung mit 100 Prozent Erstattung?',
      answer:
        `Ja. Die Stufe Ambulant 100 (AP1) der SDK erstattet 100 Prozent der erstattungsfähigen Kosten für Naturheilverfahren, höchstens 1.000 EUR je zwei Kalenderjahre ab Versicherungsbeginn. Erstattungsfähig sind Leistungen, die vom Tarif umfasst sind und im GebüH stehen. Was in zwei Jahren über 1.000 EUR hinausgeht, zahlst du selbst. Mit 21 bis 30 Jahren kostet die Stufe ${eur(BEISPIEL.AP1)} EUR im Monat.`,
    },
    {
      question: 'Welche Heilpraktiker-Zusatzversicherung ist die beste?',
      answer:
        'Eine allgemeingültig beste gibt es nicht. Entscheidend sind Behandlerkreis, Erstattungssatz, Höchstbetrag und Zeitraum, Wartezeit, Annahmeregeln und Beitrag. Vergleiche diese Punkte mit deiner geplanten Nutzung und prüfe, was nach den Bedingungen erstattungsfähig ist.',
    },
    {
      question: 'Muss ich Gesundheitsfragen beantworten?',
      answer:
        'Ja. Der Antrag enthält Gesundheitsfragen, die du vollständig und wahrheitsgemäß beantwortest (§ 19 VVG). Bei der SDK wirst du laut Angaben auf der Seite Ambulant nicht abgelehnt. Vorerkrankungen versichert die SDK über einen Risikozuschlag mit, ohne Leistungsausschluss.',
    },
    {
      question: 'Kann ich abschließen, wenn ich schon beim Heilpraktiker war?',
      answer:
        'Ja. Frühere Besuche beim Heilpraktiker schließen den Antrag nicht aus. Du gibst sie bei den Gesundheitsfragen an, soweit danach gefragt wird. Wegen Vorerkrankungen lehnt die SDK laut ihrer Broschüre niemanden ab, sie versichert sie über feste Zuschläge mit, ohne Leistungsausschluss. Nicht versichert ist eine Behandlung, die vor dem Versicherungsbeginn begonnen hat und weiterläuft. Eine neue Behandlung nach dem Beginn kann dagegen versichert sein.',
    },
    {
      question: 'Ist eine laufende Behandlung beim Heilpraktiker versichert?',
      answer:
        'Nein, nicht für Versicherungsfälle, die vor dem Versicherungsbeginn eingetreten sind. Der Versicherer zahlt für neue Versicherungsfälle die Kosten ab dem Versicherungsbeginn. Wenn du schon in Behandlung bist, frag vor dem Abschluss nach, wie dein Fall eingeordnet wird.',
    },
    {
      question: 'Gibt es eine Wartezeit?',
      answer:
        'Bei den ambulanten SDK-Tarifen sehen die Bedingungen keine Wartezeiten vor. Das ist nicht überall so. Die Verbraucherzentrale nennt drei Monate als übliche Wartezeit bei Zusatzversicherungen, bei Zahnersatz in der Regel acht Monate.',
    },
    {
      question: 'Zahlt der Tarif, wenn die Praxis nicht nach GebüH abrechnet?',
      answer:
        'Bei den ambulanten SDK-Tarifen ist die Abrechnung nach dem gültigen Gebührenverzeichnis für Heilpraktiker (GebüH) eine Voraussetzung. Die Rechnung muss die Leistungen mit den Nummern des Gebührenverzeichnisses nennen. Positionen, die diesen Vorgaben nicht entsprechen, muss der Versicherer nicht zahlen. Ist eine Vergütung unangemessen hoch, darf er auf einen angemessenen Betrag kürzen. Frag deshalb vor dem ersten Termin, ob die Praxis nach GebüH abrechnet.',
    },
    {
      question: 'Zahlt eine Heilpraktikerversicherung alle Heilpraktiker-Kosten?',
      answer:
        'Nein. Erstattet wird nach den Bedingungen des Tarifs: mit einem Erstattungssatz, einem Höchstbetrag für einen festen Zeitraum und nur für Leistungen, die als erstattungsfähig gelten. Bei den ambulanten SDK-Tarifen muss die Rechnung nach dem GebüH gestellt sein, und Behandlungen, die vor dem Versicherungsbeginn begonnen haben, sind nicht versichert.',
    },
    {
      question: 'Darf ich zwei Heilpraktikerversicherungen haben?',
      answer:
        'Das regelt der Antrag des jeweiligen Versicherers. Die ARAG etwa verlangt in ihrem Antrag A 842, dass bei einem anderen privaten Krankenversicherer kein gleichartiger Schutz besteht oder beantragt ist. Hast du zwei Verträge, gilt bei der SDK: Die gesamte Erstattung darf nicht höher sein als die gesamten Kosten. Beim zweiten Versicherer reichst du dann eine Kopie der Rechnung mit dem Erstattungsnachweis des ersten ein. Rechne vorher nach, ob eine höhere Stufe nicht weniger kostet als zwei Beiträge.',
    },
    {
      question: 'Muss ich für eine Zusatzversicherung beim Heilpraktiker die Krankenkasse wechseln?',
      answer:
        'Nein. Die Zusatzversicherung ist ein eigener privater Vertrag und läuft neben jeder gesetzlichen Kasse. Ob dein Kassenbonus als Zuschuss beim Beitrag hilft, hängt aber vom Bonusprogramm deiner Kasse ab.',
    },
    {
      question: 'Ist der günstigste Tarif automatisch schlecht?',
      answer:
        'Nicht unbedingt. Wenn du nur wenige Termine planst, kann eine niedrigere Stufe reichen. Entscheidend ist, dass Erstattungssatz und Höchstbetrag zu dem passen, was du wirklich nutzt.',
    },
    {
      question: 'Was kostet eine Heilpraktikerversicherung für Kinder?',
      answer:
        `Kinder zahlen bis zum Ende des Kalenderjahres, in dem sie 20 werden, den Kinderbeitrag. Bei der SDK sind das ${eur(KINDER.AP5)} EUR in Ambulant 50, ${eur(KINDER.AP7)} EUR in Ambulant 70, ${eur(KINDER.AP9)} EUR in Ambulant 90 und ${eur(KINDER.AP1)} EUR in Ambulant 100 im Monat (Stand ${STAND_BEITRAEGE}). Auch familienversicherte Kinder können den Tarif bekommen, denn die Bedingungen verlangen eine gesetzliche Krankenversicherung oder einen Anspruch auf Familienversicherung. Erstattungssätze und Töpfe sind dieselben wie bei Erwachsenen.`,
    },
    {
      question: 'Kann ich die Beiträge steuerlich absetzen?',
      answer:
        'Grundsätzlich ja, als sonstige Vorsorgeaufwendungen nach § 10 Abs. 1 Nr. 3a EStG. Die Beiträge teilen sich aber einen Höchstbetrag mit deinen Basisbeiträgen zur Kranken- und Pflegeversicherung: 1.900 EUR im Jahr, wenn du Zuschüsse zur Krankenversicherung bekommst, etwa als Arbeitnehmer, oder ohne eigene Beiträge versichert bist, sonst 2.800 EUR (§ 10 Abs. 4 EStG). Die Basisbeiträge zählen immer voll. Liegen sie schon über deinem Höchstbetrag, fällt der Abzug für die Zusatzversicherung weg. Deine Basisbeiträge findest du als Arbeitnehmer auf der Lohnsteuerbescheinigung. Verbindlich klärt das deine Steuerberatung.',
    },
    {
      question: 'Zahlt der Tarif auch Psychotherapie beim Heilpraktiker?',
      answer:
        'Nein. Die Bedingungen der ambulanten SDK-Tarife nehmen Psychotherapie durch Heilpraktiker ausdrücklich von der Erstattung aus.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Sieh dir die Tarifstufen und deinen Beitrag auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: ' an, bevor du einen Antrag stellst. Wie das Gebührenverzeichnis und die Rechnung zusammenhängen, steht im Ratgeber ' },
      { text: 'Gebührenordnung für Heilpraktiker', to: '/ratgeber/gebuehrenordnung-heilpraktiker' },
      { text: '. Einen Überblick über alle Kostenfragen rund um Heilpraktiker gibt die Seite ' },
      { text: 'Heilpraktiker Kosten', to: '/ratgeber/heilpraktiker-kosten' },
      { text: ', und welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-21',
    checkedAtLabel: '21. Oktober 2026',
    intro: 'Die Tarifaussagen stammen aus den Bedingungen und der Broschüre der SDK, die Rechtslage aus den Gesetzen, die Hinweise zu Wartezeiten und Leistungsgrenzen von der Verbraucherzentrale.',
    items: [
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil II: Tarife AP5, AP7, AP9 und AP1 (1.753a/01.23)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: '01.01.2023',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Allgemeine Versicherungsbedingungen für die Kranken-Zusatzversicherung, Teil I: Allgemeiner Teil (1.751)',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://gesundwerker.sdk.de/downloads/Bedingungen/1-751.pdf',
        stand: '01.01.2022',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Broschüre Ambulante Zusatzversicherung: Vorerkrankungen über feste Zuschläge, keine Ablehnungen, keine Leistungsausschlüsse',
        publisher: 'SDK Süddeutsche Krankenversicherung',
        href: 'https://www.sdk.de/downloads/Broschueren/Broschuere-Ambulante-Zusatzversicherung-1.781.pdf',
        stand: '1.781/07.23',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung: Sinnvoll oder nicht?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425',
        stand: '19.08.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Akupunktur: Wann zahlt die Krankenkasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/akupunktur-wann-zahlt-die-krankenkasse-12462',
        stand: '04.06.2024',
        accessedAt: '07.10.2026',
        note: 'Hinweis, dass Akupunktursitzungen beim Heilpraktiker selbst zu zahlen sind',
      },
      {
        label: 'VVG § 19 Anzeigepflicht',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'SGB V § 15 Ärztliche Behandlung, elektronische Gesundheitskarte',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__15.html',
        accessedAt: '07.10.2026',
      },
      {
        label: 'EStG § 10 Sonderausgaben, Abs. 1 Nr. 3a und Abs. 4 (Höchstbetrag 1.900 und 2.800 EUR)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/estg/__10.html',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Antrag Zusatzversicherung A 842, Hinweis zu gleichartigem Schutz bei einem anderen privaten Krankenversicherer',
        publisher: 'ARAG',
        href: 'https://www.arag-partnervertrieb.de/medien/pdf/KV/Antraege/arag_kv_antrag_zusatz_a842.pdf',
        stand: '1.2025',
        accessedAt: '21.10.2026',
      },
      {
        label: 'Satzung der IKK classic, § 34 Bonusprogramm, und Infoblatt zum IKK Bonus 2026',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/19125-infoblatt-ikkbonus.pdf',
        stand: '04/2026',
        accessedAt: '14.10.2026',
        note: 'Beträge des Zuschussbeispiels, Zusatzbeitrag laut Beitragsseite der IKK classic',
      },
      {
        label: 'Beitragstabelle und Tarifstufen der ambulanten SDK-Tarife, alle Altersgruppen, wie auf healio.de/ambulant',
        publisher: 'SDK und Healio',
        stand: STAND_BEITRAEGE,
        note: 'Beiträge aus derselben Datenquelle wie der Tarifrechner auf healio.de/ambulant, Leistungen wortgleich mit der Seite',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zu Tarifen nach dem Stand der genannten Bedingungen vom 7. Oktober 2026. Maßgeblich sind immer dein Antrag, der Versicherungsschein und die Bedingungen des Versicherers.',
};

export default article;
