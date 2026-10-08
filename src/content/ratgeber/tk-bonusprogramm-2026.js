/**
 * Ratgeberartikel TK Bonusprogramm 2026. Organischer Ratgeber, keine
 * bezahlte Werbung: Die Seite soll über die Google-Suche gefunden und in
 * KI-Antworten zitiert werden. Eingebaut seit 05.10.2026 in index.js,
 * scripts/seo-routes.mjs, public/sitemap.xml und public/llms.txt.
 * Kein interner Button (internalCta), weil nur die drei Artikel aus
 * INTERNAL_BUTTONS in scripts/check-ratgeber-contract.mjs einen tragen
 * dürfen. Healios Angebot steht nur als Textlinks am Ende des Abschnitts
 * "zusatzversicherung".
 *
 * Frank 05.10.2026: Die TK ist wichtig, weil sie günstig ist und einen sehr
 * guten Ruf hat. Deshalb ein sorgfältiger, fairer Artikel, kein Werbetext
 * für die TK und keine Bewertung der Kasse über die Belege hinaus.
 *
 * Quelle (einzige Faktenquelle): KassenBoost-Belegkette
 * GKV-Vergleichskampagne/website/app/tk-bonus-2026.server.ts, Abruf
 * 23.08.2026, Freigabestand TK_BONUS_DATA_AS_OF 2026-08-23. Primärquelle
 * dort ist die Satzung der TK (PDF, Stand laut TK-Satzungsseite
 * 17.04.2026), Anlagen 2 bis 4 auf den Seiten 32 bis 35:
 *   - Anlage 2 Ziffer 1: Teilnahme aller TK-Versicherten, Ausschluss bei
 *     ruhendem Leistungsanspruch und § 264 SGB V.
 *   - Anlage 2 Ziffer 2: Teilnahmejahr 12 Monate ab Teilnahmeerklärung,
 *     nicht kalenderjahrgebunden; "100 Bonuspunkte haben den Wert von
 *     1,00 Euro"; Dividende "mit dem doppelten Wert"; Zuschuss nur für
 *     selbst in Anspruch genommene Leistungen nach Anlage 4, erst nach
 *     Belegvorlage, gedeckelt auf die tatsächlichen Aufwendungen; kein
 *     Zuschuss bei bestehender Leistungspflicht der TK und für gesetzliche
 *     Zuzahlungen.
 *   - Anlage 2 Ziffer 3: Nachweise spätestens drei Monate nach Ablauf des
 *     Teilnahmejahres, sonst kein Anspruch.
 *   - Anlage 3 (Seite 34): Punkte je Maßnahme, Zahnvorsorge maximal 2x,
 *     Impfung 1x je Immunisierung, Krebsfrüherkennung je Untersuchung,
 *     Mutterschaftsvorsorge 5.000 Punkte, Zuschlag 2.000 Punkte für
 *     lückenlose U1 bis U7.
 *   - Anlage 4 (Seite 35): Verwendungskatalog der Gesundheitsdividende mit
 *     20 Positionen, darunter "Private Kranken- und
 *     Pflegezusatzversicherung (§ 194 Abs. 1a SGB V, § 47 Abs. 2 SGB XI)".
 *   - Sachbonus als dritte Wahl: Review-Notiz
 *     "sachbonus-third-option-unquantified-not-modeled" in
 *     bonus-production.server.ts (Katalog nur auf tk.de und in der App,
 *     unbeziffert). Der Artikel nennt deshalb keinen Wert.
 *   - Szenario "Breit aktiv" (10 Positionen = 10.000 Punkte) entspricht
 *     tkPublicReferenceActivities in bonus-production.server.ts; die übrigen
 *     Szenarien sind reine Rechnung aus den Satzungspunkten.
 *
 * Bewusste Festlegungen:
 *   - Die Programmseite der TK ist ohne fixierten Inhaltshash und nicht Teil
 *     der freigegebenen Belegkette. Ihre "Einmal je Teilnahmejahr"-Regel
 *     steht deshalb nicht als Regel im Text; genannt wird nur, welche
 *     Positionen die Satzung ausdrücklich mehrfach erlaubt. Die Seite ist nur
 *     als Weg zum praktischen Einreichen verlinkt.
 *   - Einreichwege (App, Formular, Upload), Bescheinigungsvorgaben,
 *     Bearbeitungszeit, Zusatzbeitrag, Steuerfragen, TK-Coach und Verfall der
 *     Dividende stehen nicht in tk-bonus-2026.server.ts und sind weggelassen.
 *   - Keine Höchstbetrags-Aussage (weder Zahl noch "ohne Obergrenze"); die
 *     Belegkette nennt keinen pauschalen Jahreshöchstbetrag, die Höhe folgt
 *     aus dem Katalog.
 *   - Durchgehend "Teilnahmejahr" statt "Jahr", weil das TK-Jahr an der
 *     Teilnahmeerklärung hängt (QA-Hinweis tk.a3 der Belegkette).
 *
 * Gegenprüfung 05.10.2026 (gegen tk-bonus-2026.server.ts und den Wortlaut
 * der Satzung, Anlagen 2 bis 4):
 *   - Teilnahmebeginn: Die Satzung lässt das Teilnahmejahr am Ersten des
 *     Monats beginnen, in dem die Erklärung eingeht (Belegkette:
 *     startAlignment "month-start"). "Ab diesem Tag" und das Beispiel
 *     "März 2026 bis März 2027, Frist Juni 2027" waren falsch und sind auf
 *     "1. März 2026 bis Ende Februar 2027, Frist Ende Mai 2027" korrigiert.
 *   - Anlage 4 hat im Satzungswortlaut eine Position mehr als die
 *     Belegkette. Die Tabelle heißt deshalb nicht mehr abschließend
 *     "nur diese Leistungen", sondern "unter anderem". Einzelne Positionen
 *     knüpft die Satzung an weitere Voraussetzungen; der Text sagt das nur
 *     allgemein, ohne die Details aus der Belegkette heraus zu ergänzen.
 *   - Mehrfach zählende Maßnahmen stehen als Beispiele, nicht als
 *     abschließende Liste.
 *   - Der Budgetsatz im Healio-Hinweis lautet wie in der Vorlage: Der
 *     ambulante Tarif bietet das Budget, die Dividende hilft beim Beitrag.
 *
 * Stand des Artikels: 05.10.2026.
 *
 * Suchbegriffe (Semrush DE, Phrase Match, 05.10.2026, Volumen je Monat):
 *   tk bonusprogramm 6.600, bonusprogramm tk 2.900, tk gesundheitsdividende
 *   1.600, gesundheitsdividende tk 260, tk bonusprogramm punkte einlösen 260,
 *   tk bonusprogramm prämien 210, tk bonusprogramm punkte 210,
 *   tk bonusprogramm rückwirkend 210, techniker krankenkasse bonus 170,
 *   tk gesundheitsdividende einlösen 170, tk bonusprogramm auszahlung 170,
 *   tk bonusprogramm nachweis 140, tk bonusprogramm fitnessstudio 90,
 *   tk bonusprogramm zahnreinigung 90, tk bonusprogramm sportverein nachweis
 *   70, tk bonusprogramm 5.000 punkte 70, techniker krankenkasse u heft
 *   bonus 40, tk gesundheitsdividende apple watch 30.
 *
 * 05.10.2026: Abschnitt tipp-ikk-classic (Unser Tipp mit Gegenrechnung des
 * Zusatzbeitrags) vor den Fristen. Beleg: KassenBoost-Prüfung IKK classic gegen
 * den Markt, Zusatzbeiträge aus website/app/funds.ts, Stand 05.10.2026. Frank
 * 05.10.2026: kein Hinweis auf eine Zusammenarbeit mit der IKK classic.
 */

export const article = {
  slug: 'tk-bonusprogramm-2026',
  kind: 'ratgeber',

  metaTitle: 'TK Bonusprogramm 2026: Punkte, Gesundheitsdividende | Healio',
  metaDescription:
    'TK Bonus 2026 laut Satzung: 100 Punkte sind 1 EUR, die Gesundheitsdividende doppelt so viel. Wofür du sie einlöst, Fristen und der Weg zur Zusatzversicherung.',

  publishedAt: '2026-10-05',
  publishedAtLabel: '5. Oktober 2026',
  updatedAt: "2026-10-08",
  updatedAtLabel: "8. Oktober 2026",
  readingTimeMinutes: 9,

  listTitle: 'TK Bonusprogramm 2026: Punkte, Gesundheitsdividende, Nachweise und Fristen',
  listTeaser:
    'Was jede Maßnahme laut Satzung an Punkten bringt, wofür du die doppelte Gesundheitsdividende einlösen kannst und wie sie den Beitrag einer Zusatzversicherung mittragen kann.',

  headline:
    'TK Bonusprogramm 2026: Punkte, Gesundheitsdividende und wie der Bonus eine Zusatzversicherung mitfinanzieren kann',
  lead:
    'Die Techniker Krankenkasse (TK) vergibt für Vorsorge, Impfungen und Sport Bonuspunkte; 100 Punkte sind laut Satzung 1 EUR wert. Gezählt wird in einem Teilnahmejahr von zwölf Monaten, das mit deiner Teilnahmeerklärung beginnt. Statt Geld kannst du die TK-Gesundheitsdividende wählen: Dann gibt es den doppelten Wert als Zuschuss zu Leistungen aus einem festen Katalog, in dem ausdrücklich auch private Kranken- und Pflegezusatzversicherungen stehen. So kann die Dividende deinen Beitrag mitfinanzieren, je nach gesammelten Maßnahmen und höchstens bis zu deinen nachgewiesenen Kosten.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Punkte statt fester Euro-Beträge.',
              text: 'Die meisten Maßnahmen bringen je 1.000 Punkte, also 10 EUR, die vollständige Vorsorge in der Schwangerschaft 5.000 Punkte. 100 Punkte sind 1 EUR wert.',
            },
            {
              lead: 'Doppelter Wert als Gesundheitsdividende.',
              text: 'Statt Geld kannst du die Dividende wählen. 1.000 Punkte sind dann 20 EUR Zuschuss, aber nur für Leistungen aus Anlage 4 der Satzung und nur gegen Beleg.',
            },
            {
              lead: 'Private Kranken- und Pflegezusatzversicherungen stehen ausdrücklich im Katalog.',
              text: 'Die Dividende kann deshalb deinen Beitrag ganz oder teilweise tragen. Erstattet werden höchstens deine tatsächlichen Kosten, ein Plus entsteht nie.',
            },
            {
              lead: 'Teilnahmejahr statt Kalenderjahr.',
              text: 'Es beginnt mit dem Monat deiner Teilnahmeerklärung und läuft zwölf Monate. Deine Nachweise müssen spätestens drei Monate nach dessen Ende eingereicht sein.',
            },
            {
              lead: 'Was zusammenkommt, hängt von deinen Maßnahmen ab.',
              text: 'Zehn Positionen aus Vorsorge und Sport ergeben 10.000 Punkte, also 100 EUR Geld oder 200 EUR Dividende. Bei anderen Kassen gelten andere Beträge und Regeln.',
            },
          ],
        },
      ],
    },
    {
      id: 'funktionsweise',
      heading: 'Wie funktioniert das TK Bonusprogramm 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du erklärst gegenüber der TK, dass du teilnimmst. Dein persönliches Teilnahmejahr beginnt am Ersten des Monats, in dem deine Erklärung bei der TK eingeht, und dauert zwölf Monate, unabhängig vom Kalenderjahr. In dieser Zeit sammelst du Punkte für Vorsorgeuntersuchungen, Zahnkontrollen, Impfungen und sportliche Aktivitäten. Die Punkte aller anerkannten Maßnahmen werden addiert.',
        },
        {
          type: 'paragraph',
          text: 'Den Wert der Punkte legt die Satzung fest: "100 Bonuspunkte haben den Wert von 1,00 Euro". Für deinen Bonus wählst du eine von drei Formen: Geld, die TK-Gesundheitsdividende mit doppeltem Wert oder einen Sachbonus. Die drei Formen schließen sich gegenseitig aus.',
        },
        {
          type: 'paragraph',
          text: 'Teilnehmen können alle Versicherten der TK, auch familienversicherte Angehörige. Ausgenommen ist, wessen Leistungsanspruch ruht oder wer von der TK nur auftragsweise Leistungen nach § 264 SGB V erhält.',
        },
      ],
    },
    {
      id: 'massnahmen',
      heading: 'Welche Maßnahmen zählen und wie viele Punkte bringen sie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Punkte je Maßnahme stehen in Anlage 3 der TK-Satzung. In Euro umgerechnet ergibt sich diese Übersicht:',
        },
        {
          type: 'table',
          caption: 'Bonusfähige Maßnahmen der TK 2026 mit Punkten und Gegenwert',
          head: ['Maßnahme', 'Punkte', 'Geldbonus', 'Gesundheitsdividende'],
          rows: [
            ['Gesundheits-Check-up', '1.000', '10 EUR', '20 EUR'],
            ['Krebsfrüherkennung, je Untersuchung', 'je 1.000', 'je 10 EUR', 'je 20 EUR'],
            ['Zahnvorsorge, höchstens zweimal im Teilnahmejahr', 'je 1.000', 'je 10 EUR', 'je 20 EUR'],
            ['Schutzimpfung, je Immunisierung', 'je 1.000', 'je 10 EUR', 'je 20 EUR'],
            ['Vollständige Vorsorge nach den Mutterschafts-Richtlinien', '5.000', '50 EUR', '100 EUR'],
            ['Kinder: U1 und U2 zusammen', '1.000', '10 EUR', '20 EUR'],
            ['Kinder: U3 bis U11 einschließlich U7a, je Untersuchung', 'je 1.000', 'je 10 EUR', 'je 20 EUR'],
            ['Zuschlag für lückenlose U1 bis U7', '2.000', '20 EUR', '40 EUR'],
            ['Jugenduntersuchung J1 und J2, je Untersuchung', 'je 1.000', 'je 10 EUR', 'je 20 EUR'],
            ['Präventionskurs', '1.000', '10 EUR', '20 EUR'],
            ['TK-Challenge', '1.000', '10 EUR', '20 EUR'],
            ['Fitnessstudio, Fitnessangebot, Sportverein, Betriebs- oder Hochschulsport', '1.000', '10 EUR', '20 EUR'],
            ['Sportveranstaltung unter qualifizierter Anleitung', '1.000', '10 EUR', '20 EUR'],
            ['Sportabzeichen (DOSB, DLRG)', '1.000', '10 EUR', '20 EUR'],
            ['Rückbildungsgymnastik nach der Schwangerschaft', '1.000', '10 EUR', '20 EUR'],
            ['Babyschwimmkurs für Kinder bis 2 Jahre', '1.000', '10 EUR', '20 EUR'],
            ['Eltern-Kind-Turnen für Kinder bis 6 Jahre', '1.000', '10 EUR', '20 EUR'],
          ],
          note: 'Die Dividende ist der rechnerische Wert und wird höchstens bis zu deinen nachgewiesenen Kosten gezahlt. Wie viel du insgesamt bekommst, hängt davon ab, welche Maßnahmen für dich infrage kommen und welche du nachweist.',
        },
        {
          type: 'paragraph',
          text: 'Mehrfach im selben Teilnahmejahr zählen laut Satzung zum Beispiel diese Positionen: die Zahnvorsorge bis zu zweimal, Schutzimpfungen einmal je Immunisierung (ein Kombinationsimpfstoff gilt als eine Impfung) und die Krebsfrüherkennung für jede durchgeführte Untersuchung. Fitnessstudio, Fitnessangebote, Sportverein sowie Betriebs- und Hochschulsport stehen dagegen als eine gemeinsame Position in der Satzung.',
        },
        {
          type: 'paragraph',
          text: 'Für Kinder zählen eigene Maßnahmen wie die U-Untersuchungen aus dem gelben Heft, die J1 und J2, der Babyschwimmkurs und das Eltern-Kind-Turnen. Wer alle Untersuchungen von U1 bis U7 lückenlos wahrnimmt, bekommt 2.000 Punkte extra.',
        },
      ],
    },
    {
      id: 'auszahlung',
      heading: 'Geld, Gesundheitsdividende oder Sachbonus: Wie zahlt die TK den Bonus aus?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Geldbonus.',
              text: 'Du bekommst den einfachen Punktwert als Geld, 1.000 Punkte sind 10 EUR.',
            },
            {
              lead: 'TK-Gesundheitsdividende.',
              text: 'Laut Satzung gibt es den Bonus alternativ "mit dem doppelten Wert", 1.000 Punkte sind dann 20 EUR. Die Dividende ist zweckgebunden: Die TK zahlt sie als Zuschuss zu Kosten für Leistungen aus Anlage 4 und erst, wenn du Belege vorlegst.',
            },
            {
              lead: 'Sachbonus.',
              text: 'Als dritte Wahl nennt die Satzung einen Sachbonus. Welche Prämien es gibt, zeigt die TK auf tk.de und in ihrer App. Einen festen Euro-Wert nennt die Satzung dafür nicht.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Wer viel Geld für Leistungen aus dem Katalog ausgibt, etwa für eine Zusatzversicherung, Brillengläser oder die Zahnreinigung, holt mit der Dividende den doppelten Wert seiner Punkte heraus, solange die Kosten mindestens so hoch sind. Nutzt du keine dieser Leistungen, bleibt der Geldbonus mit dem einfachen Wert.',
        },
      ],
    },
    {
      id: 'gesundheitsdividende',
      heading: 'Wofür kann ich die TK-Gesundheitsdividende einlösen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Dividende gibt es nur für Leistungen aus dem Katalog in Anlage 4 der Satzung. Zuschussfähig sind dort unter anderem:',
        },
        {
          type: 'table',
          caption: 'Zuschussfähige Leistungen der TK-Gesundheitsdividende nach Anlage 4 der Satzung',
          head: ['Bereich', 'Zuschussfähig laut Anlage 4'],
          rows: [
            ['Zusatzversicherung', 'Private Kranken- und Pflegezusatzversicherung'],
            ['Zähne', 'Professionelle Zahnreinigung, erweiterte zahnmedizinische Leistungen, Zahnersatz und Zahnkronen'],
            ['Augen', 'Brillengläser und Kontaktlinsen, Sehtest'],
            ['Sport und Bewegung', 'Mitgliedschaft im Sportverein oder Fitnessstudio, Sport- und Fitnessausrüstung, Sport- und Fitnesskurs, Sportveranstaltung, sportmedizinische Untersuchung'],
            ['Geräte', 'Gerät zur Messung des Fitness- und Gesundheitsstatus'],
            ['Behandlungen', 'Akupunktur, Osteopathie, Leistungen nach dem Hufeland-Leistungsverzeichnis'],
            ['Vorsorge', 'Vorsorge- und Früherkennungsuntersuchungen als IGeL, Osteodensitometrie'],
            ['Kurse', 'Gesundheitskurs'],
            ['Schwangerschaft', 'Hebammen-Leistungen, zusätzliche Leistungen bei Schwangerschaft'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Für jede Position gilt: Du musst die Leistung selbst in Anspruch genommen haben, und der Anspruch entsteht erst, wenn du die Belege vorlegst. Liegen deine Kosten unter der Dividende, erstattet die TK höchstens die tatsächlichen Aufwendungen. Keinen Zuschuss gibt es, wenn die TK die Leistung schon nach anderen Vorschriften bezahlt oder ein anderer Anspruch noch nicht ausgeschöpft ist, und auch nicht für gesetzliche Zuzahlungen. Einzelne Positionen knüpft Anlage 4 an weitere Voraussetzungen, maßgeblich ist dort der genaue Wortlaut.',
        },
        {
          type: 'paragraph',
          text: 'Bei drei Leistungen lohnt ein genauer Blick. Die Mitgliedschaft im Fitnessstudio oder Sportverein taucht zweimal auf, als Maßnahme mit Punkten und im Katalog der Dividende. Die professionelle Zahnreinigung bringt dagegen keine Punkte, bonifiziert wird die Zahnvorsorge; die Kosten der Zahnreinigung stehen aber im Katalog der Dividende. Für Fitness-Tracker und Smartwatches nennt der Katalog nur die allgemeine Position Gerät zur Messung des Fitness- und Gesundheitsstatus. Ob ein bestimmtes Modell darunter fällt, klärst du am besten vor dem Kauf mit der TK.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Kann die TK-Gesundheitsdividende eine Zusatzversicherung mitfinanzieren?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, das sieht die Satzung vor. Anlage 4 nennt private Kranken- und Pflegezusatzversicherungen ausdrücklich als zuschussfähig, mit Verweis auf § 194 Abs. 1a SGB V und § 47 Abs. 2 SGB XI. Gemeint sind Zusatzversicherungen, die deinen gesetzlichen Schutz ergänzen, zum Beispiel für Krankenhaus, Zahn oder Pflege. Einen bestimmten Versicherer nennt die Satzung nicht: Bis Mitte 2023 galt der Posten nur für Verträge über den Kooperationspartner der TK, diese Bindung hat die TK zum 1. Juli 2023 gestrichen. Den Beitrag belegst du wie jede andere Ausgabe aus dem Katalog.',
        },
        {
          type: 'paragraph',
          text: 'Die Grenze setzt die Satzung selbst: Erstattet werden höchstens die Kosten, die du belegst. Eine Dividende von 200 EUR bei 150 EUR nachgewiesenem Beitrag ergibt 150 EUR. Ein Plus entsteht nie, und ohne Beleg gibt es keinen Zuschuss.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Bevor du dich zwischen Geld und Dividende entscheidest, lohnt der Blick auf deinen Zusatzschutz. Für genau diesen Moment haben wir bei Healio ein Angebot zusammengestellt: Wählst du die Gesundheitsdividende, kann sie den Beitrag einer Zusatzversicherung ganz oder teilweise tragen, ob ',
            },
            { text: 'ambulant für Heilpraktiker, Osteopathie, Brille und Vorsorge', to: '/ambulant' },
            { text: ', ' },
            { text: 'für die Zähne', to: '/zahn' },
            { text: ' oder ' },
            { text: 'fürs Krankenhaus', to: '/stationaer' },
            { text: '. Der ambulante Tarif selbst bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, die Dividende hilft beim Beitrag. Wie viel sie beiträgt, hängt von deinen Maßnahmen und deinen eigenen Kosten ab; das rechnest du auf der jeweiligen Seite individuell durch.' },
          ],
        },
      ],
    },
    {
      id: 'nachweise',
      heading: 'Wie reiche ich Nachweise ein und gilt das rückwirkend?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Satzung regelt, was zählt und bis wann: Maßnahmen aus deinem Teilnahmejahr, eingereicht spätestens drei Monate nach dessen Ablauf. Wer später einreicht, hat laut Satzung keinen Anspruch mehr.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie du Teilnahme und Nachweise praktisch einreichst, beschreibt die TK auf ihrer ' },
            { text: 'Seite zum Bonusprogramm', href: 'https://www.tk.de/techniker/gesundheit-foerdern/tk-bonusprogramm/bonusprogramm-2010356' },
            { text: '. Für die Bescheinigung von Fitnessstudio, Sportverein oder Kurs gelten die Vorgaben der TK.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Rückwirkend heißt bei der TK deshalb: Nachweise aus einem abgelaufenen Teilnahmejahr kannst du noch bis zu drei Monate nach dessen Ende nachreichen. Zählen können aber nur Maßnahmen aus deinem Teilnahmejahr, und das beginnt erst mit dem Monat, in dem deine Teilnahmeerklärung bei der TK eingeht. Erkläre die Teilnahme also, bevor du Termine sammelst.',
        },
        {
          type: 'paragraph',
          text: 'Für die Gesundheitsdividende brauchst du zusätzlich Belege über deine Kosten, etwa den Beitragsnachweis deiner Zusatzversicherung oder die Rechnung für Brillengläser oder Zahnreinigung. Erst mit diesen Belegen entsteht der Anspruch auf den Zuschuss.',
        },
      ],
    },
    {
      id: 'realistisch',
      heading: 'Wie viel Bonus ist im Teilnahmejahr realistisch drin?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die folgenden Werte sind direkt aus den Punkten der Satzung gerechnet. Welche Vorsorge für dich ansteht, hängt unter anderem von deinem Alter ab, deshalb ist das keine persönliche Zusage:',
        },
        {
          type: 'table',
          caption: 'Durchgerechnete Szenarien für ein Teilnahmejahr bei der TK',
          head: ['Szenario', 'Punkte', 'Geldbonus', 'Gesundheitsdividende'],
          rows: [
            ['Vorsorge: Check-up, Krebsfrüherkennung, zwei Zahnkontrollen', '4.000', '40 EUR', '80 EUR'],
            ['Vorsorge und Bewegung: dazu eine Impfung, Fitnessstudio oder Verein und ein Präventionskurs', '7.000', '70 EUR', '140 EUR'],
            ['Breit aktiv: zusätzlich Sportveranstaltung, Sportabzeichen und TK-Challenge', '10.000', '100 EUR', '200 EUR'],
            ['Schwangerschaft: vollständige Vorsorge nach den Mutterschafts-Richtlinien', '5.000', '50 EUR', '100 EUR'],
          ],
          note: 'Die Dividende wird nur bis zur Höhe der Kosten gezahlt, die du für Leistungen aus dem Katalog nachweist.',
        },
        {
          type: 'paragraph',
          text: '5.000 Punkte erreichst du entweder allein mit der vollständigen Vorsorge in der Schwangerschaft oder mit fünf Maßnahmen zu je 1.000 Punkten. Das sind 50 EUR Geld oder 100 EUR Dividende.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was in der Schwangerschaft an Zusatzschutz noch geht und was nicht, steht im Ratgeber ' },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'tipp-ikk-classic',
      heading: 'Unser Tipp: Die IKK classic gegen die TK rechnen',
      blocks: [
        {
          type: 'paragraph',
          text: 'Unsere Einschätzung bei Healio: Wenn du Bonus und Zusatzschutz verbinden willst, ist die IKK classic für uns ein besonders starker Weg. Unter den von kassenboost.de geprüften Satzungen ist sie die einzige Kasse, die ihren gesamten Bonus wahlweise in dreifacher Höhe und ohne Höchstbetrag als Zuschuss zahlt, auch für den Jahresbeitrag einer privaten Zusatzversicherung; ausgezahlt wird dabei höchstens der Beitrag, den du tatsächlich gezahlt hast.',
        },
        {
          type: 'paragraph',
          text: 'Dagegen steht der Zusatzbeitrag: 3,85 Prozent bei der IKK classic, 2,69 Prozent bei der TK (Stand 05.10.2026), also 1,16 Prozentpunkte mehr, bei 4.000 EUR Bruttogehalt im Monat rund 278 EUR Arbeitnehmeranteil im Jahr; diesen Mehrbeitrag musst du gegen den Zuschuss rechnen. Fair gerechnet spricht für die TK nicht nur der niedrigere Zusatzbeitrag: Bei Zahnvorsorge und Impfungen bringt die Gesundheitsdividende der TK je Maßnahme sogar etwas mehr als die IKK classic (20 statt 15 EUR), bei Vorsorgeuntersuchungen (20 statt 30 EUR) und bei Sport (20 statt 75 EUR) liegt die IKK classic vorn.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die Rechnung steht im Ratgeber ' },
            { text: 'IKK classic Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', den Vergleich der Satzungen findest du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: ', und du kannst deshalb genauso bei der TK bleiben, denn ein Wechsel lohnt sich nicht für jeden.' },
          ],
        },
      ],
    },
    {
      id: 'fristen',
      heading: 'Welche Fristen gelten beim TK Bonusprogramm?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Beginn.',
              text: 'Dein Teilnahmejahr beginnt am Ersten des Monats, in dem deine Teilnahmeerklärung bei der TK eingeht.',
            },
            {
              lead: 'Dauer.',
              text: 'Zwölf Monate, unabhängig vom Kalenderjahr.',
            },
            {
              lead: 'Maßnahmen.',
              text: 'Jede Maßnahme muss in dein Teilnahmejahr fallen.',
            },
            {
              lead: 'Einreichen.',
              text: 'Spätestens drei Monate nach Ablauf des Teilnahmejahres, sonst besteht laut Satzung kein Anspruch.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel: Geht deine Teilnahmeerklärung im März 2026 bei der TK ein, beginnt dein Teilnahmejahr am 1. März 2026 und endet Ende Februar 2027. Deine Nachweise müssen dann spätestens drei Monate später eingereicht sein, also bis Ende Mai 2027. Notiere dir den Beginn deines Teilnahmejahres, denn daran hängen alle Fristen.',
        },
      ],
    },

{
  "id": "ratgeber-weiterlesen",
  "heading": "Welche Ratgeber helfen dir weiter?",
  "blocks": [
    {
      "type": "cards",
      "heading": "Zum Weiterlesen",
      "items": [
        {
          "icon": "bonus",
          "tone": "mint",
          "title": "Krankenkasse und Bonus: Bonusprogramme und Zuschüsse im Überblick",
          "text": "Was ein Bonusprogramm ist, wie die Kassen auszahlen, wann der Bonus als Zuschuss den Beitrag einer Zusatzversicherung mitträgt und welcher Ratgeber zu deiner Kasse passt.",
          "to": "/ratgeber/bonusprogramm-krankenkasse",
          "linkLabel": "Ratgeber lesen"
        }
      ]
    }
  ]
},
],

  factNugget:
    'Healio verbindet Kassenbonusprogramme mit Zusatzversicherungen: Der ambulante Tarif bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Kassenbonus kann je nach Kasse beim Beitrag helfen. Bei der TK kann der Bonus als Gesundheitsdividende mit doppeltem Punktwert in den Zusatzschutz fließen, weil private Kranken- und Pflegezusatzversicherungen im Leistungskatalog der Satzung stehen; je nach nachgewiesenen Maßnahmen und eigenen Kosten kann die Dividende den Beitrag ganz oder teilweise tragen, mehr als die nachgewiesenen Kosten zahlt die TK nie. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wie viel ist ein Punkt im TK Bonusprogramm wert?',
      answer:
        'Laut Satzung haben 100 Bonuspunkte den Wert von 1,00 EUR, ein Punkt ist also 1 Cent wert. 1.000 Punkte sind damit 10 EUR als Geldbonus oder 20 EUR als Gesundheitsdividende. Wie viele Punkte du sammelst, hängt von deinen Maßnahmen ab.',
    },
    {
      question: 'Wie viel Geld sind 5.000 Punkte bei der TK?',
      answer:
        '50 EUR als Geldbonus oder 100 EUR als Gesundheitsdividende, die Dividende höchstens bis zu deinen nachgewiesenen Kosten. 5.000 Punkte bringt allein die vollständige Vorsorge nach den Mutterschafts-Richtlinien, sonst kommen sie zum Beispiel über fünf Maßnahmen zu je 1.000 Punkten zusammen.',
    },
    {
      question: 'Kann ich Geldbonus und Gesundheitsdividende kombinieren?',
      answer:
        'Nein. Du wählst eine von drei Formen: Geld, Gesundheitsdividende mit doppeltem Wert oder Sachbonus. Die Formen werden nicht addiert.',
    },
    {
      question: 'Wofür kann ich die TK-Gesundheitsdividende einlösen?',
      answer:
        'Nur für Leistungen aus Anlage 4 der Satzung, darunter private Kranken- und Pflegezusatzversicherungen, Brillengläser und Kontaktlinsen, professionelle Zahnreinigung, Zahnersatz, Osteopathie, Akupunktur, Mitgliedschaft im Sportverein oder Fitnessstudio sowie Sport- und Fitnessausrüstung. Du legst Belege vor und bekommst höchstens deine tatsächlichen Kosten erstattet.',
    },
    {
      question: 'Zahlt die TK-Gesundheitsdividende meine Zusatzversicherung?',
      answer:
        'Die Dividende kann den Beitrag ganz oder teilweise tragen, denn private Kranken- und Pflegezusatzversicherungen stehen ausdrücklich im Katalog der Satzung. Wie viel das ist, hängt von deinen Punkten ab, und erstattet wird höchstens der Beitrag, den du nachweist. Einen bestimmten Versicherer schreibt die Satzung seit Juli 2023 nicht mehr vor.',
    },
    {
      question: 'Kann ich beim TK Bonusprogramm rückwirkend einreichen?',
      answer:
        'Ja, innerhalb der Frist: Nachweise müssen spätestens drei Monate nach Ablauf deines Teilnahmejahres eingereicht sein, danach besteht laut Satzung kein Anspruch mehr. Zählen können nur Maßnahmen aus dem Teilnahmejahr, und das beginnt mit dem Monat, in dem deine Teilnahmeerklärung bei der TK eingeht.',
    },
    {
      question: 'Zählen Fitnessstudio und Zahnreinigung beim TK Bonusprogramm?',
      answer:
        'Fitnessstudio, Sportverein sowie Betriebs- und Hochschulsport bringen als gemeinsame Position 1.000 Punkte. Die professionelle Zahnreinigung bringt keine Punkte, bonifiziert wird die Zahnvorsorge mit höchstens zwei Kontrollen im Teilnahmejahr. Die Kosten für Zahnreinigung und Studiomitgliedschaft stehen aber im Katalog der Gesundheitsdividende.',
    },
  ],

  // Bewusst kein internalCta: Nur die drei Artikel aus INTERNAL_BUTTONS im
  // Vertragstest dürfen einen Button tragen.

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      {
        text: 'Ob die TK mit ihrem Bonusprogramm zu dir passt, hängt an deinen Maßnahmen, deinen Kosten und an dem, was andere Kassen bieten. Auf ',
      },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' vergleichst du Bonusprogramme quellenbelegt anhand der Satzungen, auf ',
      },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' rechnest du durch, wie viel Beitrag nach der individuell anrechenbaren Dividende selbst zu tragen bleibt, und wenn du schwanger bist, lohnt vorher der ',
      },
      { text: 'Ratgeber zum Zusatzschutz in der Schwangerschaft', to: '/ratgeber/schwanger-zusatzversicherung' },
      { text: '.' },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach der Satzung der Techniker Krankenkasse, Anlagen 2 bis 4, Stand laut Satzungsseite der TK 17.04.2026, maßgeblich sind immer die Originaldokumente der Kasse.',
};

export default article;
