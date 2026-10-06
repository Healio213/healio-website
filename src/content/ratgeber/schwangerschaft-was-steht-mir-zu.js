/**
 * Ratgeberartikel 10: Was steht mir in der Schwangerschaft zu?
 * Ansprueche, Kassen-Extras, Kassenwechsel und Fristen.
 *
 * Quelle: Healio/Marktanalyse-2026-10/schwangere-suchabsicht.md, Abschnitt 4
 * (Rahmen 4.1, Gliederung 4.2, Healio-Bruecken 4.3, Verlinkung 4.4), 5.2
 * (belegte Kassenwerte) und 6.2 (Fristen-Checkliste), Stand 06.10.2026, dazu
 * Healio/Marktanalyse-2026-10/rohdaten/schwangere-fragen-recherche.md.
 * Organischer Ratgeber, indexiert, ohne internen Button (nur die drei Artikel
 * aus INTERNAL_BUTTONS in scripts/check-ratgeber-contract.mjs tragen einen).
 *
 * Fundstellen, alle am 06.10.2026 abgerufen und gegengelesen:
 *   - § 24c SGB V (Leistungskatalog, kein Entbindungsgeld darin),
 *     § 24d (Hebammenhilfe einschliesslich Schwangerenvorsorge, Wochenbett bis
 *     zwoelf Wochen), § 24e (keine Zuzahlung nach §§ 31 Abs. 3, 32 Abs. 2,
 *     33 Abs. 8 bei Schwangerschaftsbeschwerden und Entbindung), § 24h und
 *     § 38 Abs. 4 (Haushaltshilfe, selbst beschaffte Kraft, Verwandte bis zum
 *     zweiten Grad), § 24i (Mutterschaftsgeld, hoechstens 13 Euro je
 *     Kalendertag, aerztliches oder hebammliches Zeugnis), § 175 Abs. 1 und 4
 *     (Erklaerung gegenueber der gewaehlten Kasse, Ablehnungsverbot, zwoelf
 *     Monate Bindung, Ende des uebernaechsten Kalendermonats):
 *     https://www.gesetze-im-internet.de/sgb_5/
 *   - § 19 MuSchG (Abs. 2: Nichtmitglieder hoechstens 210 Euro vom Bund):
 *     https://www.gesetze-im-internet.de/muschg_2018/__19.html
 *   - Nachtrag Pruefrunde 06.10.2026: § 20 MuSchG (Arbeitgeberzuschuss, auch
 *     bei Mutterschaftsgeld nach § 19 Abs. 2), § 24i Abs. 2 SGB V (andere
 *     Mitglieder in Hoehe des Krankengeldes), § 38 Abs. 1 SGB V (Kind unter
 *     zwoelf nur bei Krankenhausbehandlung, Kur u. ae.; bei schwerer Krankheit
 *     bis vier Wochen auch ohne Kind), § 175 Abs. 4 SGB V
 *     (Sonderkuendigungsrecht bei Zusatzbeitragserhoehung), § 7 Abs. 1 BEEG
 *     (Lebensmonat der Antragstellung), aok.de/pk/hessen/schwangerschaftspaket
 *     (Begleitperson selbst bei der AOK Hessen versichert).
 *   - § 10 NiSV (kein Ultraschall am Foetus zu nichtmedizinischen Zwecken):
 *     https://www.gesetze-im-internet.de/nisv/__10.html
 *   - Mutterschafts-Richtlinie des G-BA, zuletzt geaendert 16.07.2026, in Kraft
 *     25.08.2026 (PDF gelesen): § 1 Nr. 3 (Toxoplasmose nur bei begruendetem
 *     Verdacht), § 2 Abs. 8 ("im Allgemeinen im Abstand von vier Wochen", "In
 *     den letzten zwei Schwangerschaftsmonaten sind im Allgemeinen je zwei
 *     Untersuchungen angezeigt"), § 2 Abs. 9 (Screenings 8+0 bis 11+6, 18+0
 *     bis 21+6, 28+0 bis 31+6 SSW), § 2 Abs. 11 und 11a (Diabetes-Screening
 *     24+0 bis 27+6 SSW). B-Streptokokken kommen darin nicht vor.
 *     https://www.g-ba.de/downloads/62-492-4201/Mu-RL_2026-07-16_iK-2026-08-25.pdf
 *   - IGeL-Monitor, Toxoplasmose-Test bei Schwangeren (16,90 bis 20,40 Euro,
 *     Stand 04.10.2021):
 *     https://igel-monitor.de/igel-a-z/igel/show/toxoplasmose-test-bei-schwangeren.html
 *   - Aus der Analyse uebernommen, dort am 06.10.2026 gegen die Primaerquelle
 *     geprueft (Abschnitt 0 und 8): Hebammenhilfevertrag in Kraft 01.11.2025
 *     (20 Kontakte bis 10. Lebenstag, 16 Kontakttage bis 12. Woche, danach
 *     bis 8 bei Still- oder Ernaehrungsproblemen; Kurse 14 und 10 Stunden),
 *     § 3 MuSchG, § 15 MuSchG, § 198 VVG, § 18 PStG, §§ 7, 16 BEEG, §§ 66, 70
 *     EStG (259 Euro), § 53 Abs. 8 und § 19 Abs. 1 SGB V, Bundesstiftung
 *     Mutter und Kind (FAQ), AOK-Haushaltshilfe (keine Zuzahlung, vorher
 *     abstimmen), Kassenseiten IKK classic, TK, Barmer, mkk, AOK Bayern,
 *     Hessen, NordWest, PLUS und Rheinland/Hamburg (Tabelle 5.2).
 *   - Im Repo gegengeprueft: Vorsorge-Topf AP1 (Ambulant 100) 500 EUR je zwei
 *     Kalenderjahre (src/components/sections/ambulant/AmbulantConversionFlow.jsx,
 *     TIERS, pots.prevention; src/i18n/locales/de/ambulant.json "SDK
 *     Vorsorge-Topf im Tarif AP1"), IKK-Werte je Vorsorge und Rueckbildung
 *     (ikk-classic-bonusprogramm-2026.js), TK- und Barmer-Punkte
 *     (tk-/barmer-bonusprogramm-2026.js), IKK-Frist 31.03.2027.
 *
 * Bewusste Festlegungen:
 *   - Ehrliche Wechsel-Rechnung (4.3) ohne Euro-Spanne und ohne Terminzahl:
 *     Wie viele Vorsorgen die IKK classic anerkennt, ist [Annahme] (4.3,
 *     Abschnitt 7 Nr. 7, IKK-Ratgeber). Genannt werden nur 30 EUR Zuschuss je
 *     Vorsorge ab Mitgliedsbeginn, hoechstens bis zur Beitragshoehe. Spanne
 *     erst nach Pruefung gegen IKK-Infoblatt Nr. 09 wieder aufnehmen.
 *   - Bonusspalte der Extras-Tabelle als Zuschuss bzw. Gesundheitsdividende,
 *     nicht als Geldbonus. Fuer die fuenf AOKs "hier nicht verglichen": Der
 *     AOK-Ratgeber nennt Schwangerschaftswerte nur fuer NordWest (Geldpraemie
 *     nach § 10d Satzung), Niedersachsen und Sachsen-Anhalt, nicht fuer
 *     Bayern, Hessen, PLUS und Rheinland/Hamburg.
 *   - Nur die neun in 5.2 geprueften Kassen in der Tabelle. Die sechs
 *     uebrigen AOKs und die DAK fehlen (5.2: erst nach Pruefung).
 *   - Weggelassen mangels Beleg: Preise fuer Feinultraschall und
 *     Zusatz-Ultraschall, die Entbindungsgeld-Historie (77 EUR, 2004, nur
 *     Sekundaerquellen; die FAQ stuetzt sich nur auf § 24c SGB V), Elterngeld-
 *     Hoehe, "Bonus der alten Kasse nur bei ungekuendigter Mitgliedschaft"
 *     (nur fuer den mkk-Arbeitnehmerbonus belegt), Haushaltshilfe als
 *     Satzungsleistung, Stundensaetze fuer selbst beschaffte Kraefte,
 *     AOK-Geschenk.
 *   - Gesperrt: NIPT, Ersttrimester-Screening, Nackenfalte (Franks
 *     Entscheidung offen), Kinderwunsch, ERGO, DA Direkt, LKH. Die 3.000 EUR
 *     bleiben draussen, fuer Schwangere zaehlt nur der Vorsorge-Topf (4.3).
 *   - Healio-Bruecken nur aus 4.3 (Vorsorge-Topf, Kind, Bonus, Wechsel-
 *     Rechnung). Kein Satz, Healio verdiene am Kassenwechsel nichts: Fuer
 *     IKK-classic-Wechsel sind rund 95 EUR ueber Makleraktiv vorgesehen, dazu
 *     der IKK-Werbezuschuss (GKV-Vergleichskampagne/TASKS.md,
 *     KASSEN-STARTMATRIX.md, Healio/Finanzen). Ob und wie das offengelegt
 *     wird, entscheidet Frank.
 *   - Tracking: Der Pfad steht wie die beiden anderen Schwangerschafts-
 *     Ratgeber in den Sperrlisten von Meta (src/lib/meta-pixel.js, serverseitig
 *     api/meta-events.js) und Google Ads (src/lib/google-ads.js).
 */

export const article = {
  slug: 'schwangerschaft-was-steht-mir-zu',
  kind: 'ratgeber',

  metaTitle: 'Was steht mir in der Schwangerschaft zu? Leistungen | Healio',
  metaDescription:
    'Was steht dir in der Schwangerschaft zu? Kassenleistungen, Extras von AOK, TK, Barmer, IKK classic und mkk, dazu die Fristen.',

  publishedAt: '2026-10-06',
  publishedAtLabel: '6. Oktober 2026',
  readingTimeMinutes: 15,

  listTitle: 'Was steht mir in der Schwangerschaft zu? Leistungen, Extras und Fristen',
  listTeaser:
    'Pflichtleistungen jeder Kasse, Haushaltshilfe, Hebamme, Mutterschaftsgeld, die Extras der großen Kassen und eine Checkliste mit allen Fristen bis zum ersten Geburtstag.',

  headline: 'Was steht mir in der Schwangerschaft zu? Leistungen, Extras und Fristen im Überblick',
  lead:
    'Was dir in der Schwangerschaft zusteht, steht an drei Stellen: im Gesetz, in der Satzung deiner Krankenkasse und in einer Handvoll Fristen, die leicht untergehen. Hier findest du alles der Reihe nach, von den Pflichtleistungen über Haushaltshilfe, Hebamme und Mutterschaftsgeld bis zu den Extras der großen Kassen, dem Kassenwechsel und einer Checkliste mit allen Anträgen.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Die Grundleistungen sind überall gleich.',
              text: 'Vorsorge, Ultraschall-Screenings, Hebamme, Entbindung und Mutterschaftsgeld stehen im Gesetz und gelten bei jeder gesetzlichen Kasse. Zuzahlen musst du dafür in der Regel nichts.',
            },
            {
              lead: 'Die Extras unterscheiden sich stark.',
              text: 'Was darüber hinausgeht, regelt jede Kasse in ihrer Satzung, von einzelnen Zuschüssen bis zu Paketen von einigen hundert Euro. Die Tabelle weiter unten zeigt große Kassen im Vergleich.',
            },
            {
              lead: 'Haushaltshilfe gibt es nur unter Bedingungen.',
              text: 'Du kannst den Haushalt wegen Schwangerschaft oder Entbindung nicht führen, und niemand sonst im Haushalt kann einspringen.',
            },
            {
              lead: 'Ein Kassenwechsel ist erlaubt, wirkt aber nicht sofort.',
              text: 'Die neue Kasse darf dich nicht ablehnen. Wirksam wird der Wechsel zum Ende des übernächsten Monats, und erst ab dann zählen Bonus und Extras der neuen Kasse.',
            },
            {
              lead: 'Fristen nicht verpassen.',
              text: 'Kindergeld, Elterngeld, die Geburtsanzeige und die Anmeldung beim privaten Zusatzversicherer haben Fristen, beim Mutterschaftsgeld zählt der richtige Zeitpunkt. Die Checkliste weiter unten fasst alles zusammen.',
            },
          ],
        },
      ],
    },
    {
      id: 'kassenleistungen',
      heading: 'Was zahlt jede Krankenkasse in der Schwangerschaft?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Grundleistungen sind gesetzlich festgelegt und bei jeder gesetzlichen Kasse gleich. § 24c SGB V zählt sie auf: ärztliche Betreuung und Hebammenhilfe, Arznei-, Verband-, Heil- und Hilfsmittel samt digitaler Gesundheitsanwendungen, die Entbindung, häusliche Pflege, Haushaltshilfe und Mutterschaftsgeld. Im Alltag heißt das:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Vorsorge nach festem Rhythmus.',
              text: 'Laut Mutterschafts-Richtlinie finden die Untersuchungen im Allgemeinen alle vier Wochen statt, in den letzten zwei Schwangerschaftsmonaten sind im Allgemeinen je zwei Untersuchungen im Monat vorgesehen. Dazu gehören unter anderem Blutdruck, Gewicht, Urin und die Kontrolle der Herzaktionen deines Kindes.',
            },
            {
              lead: 'Drei Ultraschall-Screenings',
              text: 'in den Zeitfenstern 8+0 bis 11+6, 18+0 bis 21+6 und 28+0 bis 31+6 Schwangerschaftswochen.',
            },
            {
              lead: 'Bluttests und Zuckertest.',
              text: 'Untersucht wird unter anderem auf Hepatitis B, Lues und, wenn keine zweimalige Impfung dokumentiert ist, auf Röteln, dazu kommen Blutgruppe und Antikörper. Den HIV-Test gibt es freiwillig nach Beratung. Einen Test auf Schwangerschaftsdiabetes bekommst du zwischen 24+0 und 27+6 Schwangerschaftswochen angeboten, wenn bei dir kein Diabetes bekannt ist.',
            },
            {
              lead: 'Hebammenhilfe',
              text: 'in der Schwangerschaft, bei der Geburt und im Wochenbett. Die meisten Untersuchungen zur Schwangerenvorsorge kann auch deine Hebamme übernehmen (§ 24d SGB V), die Ultraschall-Screenings macht deine Ärztin oder dein Arzt.',
            },
            {
              lead: 'Arznei-, Heil- und Hilfsmittel',
              text: 'bei Schwangerschaftsbeschwerden und im Zusammenhang mit der Entbindung ohne die sonst üblichen Zuzahlungen (§ 24e SGB V).',
            },
            {
              lead: 'Die Entbindung',
              text: 'in der Klinik oder ambulant, zum Beispiel im Geburtshaus oder zu Hause.',
            },
            {
              lead: 'Häusliche Pflege, Haushaltshilfe und Mutterschaftsgeld,',
              text: 'wenn die Voraussetzungen erfüllt sind. Die stehen in den nächsten Abschnitten.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Für diese Pflichtleistungen zahlst du in der Regel nichts zu. Was nicht auf dieser Liste steht, zahlst du selbst, sofern deine Kasse es nicht über ihre Satzung bezuschusst. Welche Untersuchungen das typischerweise sind, steht im Abschnitt ',
            },
            { text: 'Welche Untersuchungen muss ich selbst bezahlen?', to: '/ratgeber/schwangerschaft-was-steht-mir-zu#selbst-zahlen' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'haushaltshilfe',
      heading: 'Wann bekomme ich eine Haushaltshilfe in der Schwangerschaft und nach der Geburt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine Haushaltshilfe gibt es nicht automatisch nach jeder Geburt. Das Gesetz knüpft sie an zwei Bedingungen: Du kannst den Haushalt wegen der Schwangerschaft oder der Entbindung nicht weiterführen, und eine andere Person, die mit dir im Haushalt lebt, kann ihn auch nicht übernehmen (§ 24h SGB V).',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Auch in der Schwangerschaft.',
              text: 'Der Anspruch gilt nicht erst nach der Geburt, sondern zum Beispiel auch bei Beschwerden während der Schwangerschaft.',
            },
            {
              lead: 'Kein Kind unter zwölf nötig.',
              text: 'Anders als bei der Haushaltshilfe wegen Krankenhausbehandlung oder Kur (§ 38 Abs. 1 SGB V) ist das hier keine Voraussetzung.',
            },
            {
              lead: 'Vorher abstimmen.',
              text: 'Du brauchst eine ärztliche Bescheinigung, und die Kostenübernahme klärst du mit deiner Kasse, bevor die Hilfe anfängt.',
            },
            {
              lead: 'Keine Zuzahlung.',
              text: 'Für die Haushaltshilfe wegen Schwangerschaft oder Entbindung zahlst du nichts dazu.',
            },
            {
              lead: 'Selbst gesuchte Hilfe.',
              text: 'Stellt die Kasse keine Kraft, erstattet sie die Kosten für eine selbst gesuchte Haushaltshilfe in angemessener Höhe. Für Verwandte und Verschwägerte bis zum zweiten Grad gibt es keine Kostenerstattung, die Kasse kann aber Fahrkosten und Verdienstausfall erstatten (§ 38 Abs. 4 SGB V).',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Viele Dienstleister werben mit dem Satz, die Kasse zahle. Entscheidend sind die beiden Bedingungen oben. Klär sie mit deiner Kasse, bevor du jemanden beauftragst.',
        },
      ],
    },
    {
      id: 'hebamme',
      heading: 'Was zahlt die Krankenkasse für die Hebamme?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hebammenhilfe ist eine Pflichtleistung jeder Kasse. Dazu gehören Beratung und Vorsorgeuntersuchungen in der Schwangerschaft, die Hilfe bei der Geburt und die Betreuung im Wochenbett bis zum Ablauf von zwölf Wochen nach der Geburt. Was darüber hinausgeht, braucht eine ärztliche Anordnung (§ 24d SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Den Umfang im Wochenbett regelt der Hebammenhilfevertrag, der seit dem 1. November 2025 gilt:',
        },
        {
          type: 'list',
          items: [
            'bis zu 20 Kontakte bis zum zehnten Lebenstag deines Kindes,',
            'bis zu 16 Kontakttage vom elften Tag bis zum Ende der zwölften Woche,',
            'danach bis zu acht Kontakttage bei Stillproblemen bis zum Ende der Abstillphase, bei Ernährungsproblemen deines Kindes bis zum Ende des neunten Lebensmonats.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nicht im gesetzlichen Katalog steht die Rufbereitschaft, also die Pauschale dafür, dass sich eine Hebamme für deine Geburt bereithält. Das ist eine Satzungsleistung, und ob und wie viel deine Kasse dazugibt, ist sehr unterschiedlich. Die Werte großer Kassen stehen in der Extras-Tabelle weiter unten. Fang mit der Suche nach einer Hebamme früh an, gerade für das Wochenbett.',
        },
      ],
    },
    {
      id: 'kurse',
      heading: 'Zahlt die Kasse Geburtsvorbereitungs- und Rückbildungskurs, auch für den Partner?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für dich ja, beide Kurse gehören zur Hebammenhilfe. Laut Hebammenhilfevertrag sind es bei der Geburtsvorbereitung bis zu 14 Stunden in Gruppen mit bis zu zehn Teilnehmerinnen, bei der Rückbildung bis zu zehn Stunden.',
        },
        {
          type: 'paragraph',
          text: 'Für den Partner oder die Partnerin ist der Kurs keine Pflichtleistung. Einige Kassen geben über ihre Satzung etwas dazu:',
        },
        {
          type: 'list',
          items: [
            { lead: 'AOK Bayern:', text: 'bis zu 75 EUR für die Geburtsvorbereitung des Partners.' },
            { lead: 'AOK Hessen:', text: 'bis zu 200 EUR für die Geburtsvorbereitung deiner Begleitperson, wenn sie selbst bei der AOK Hessen versichert ist.' },
            { lead: 'Barmer:', text: 'aus dem Budget Familie Plus von 200 EUR je Schwangerschaft.' },
            { lead: 'AOK NordWest:', text: 'anteilig aus dem Gesundheitsbudget, das für das ganze Kalenderjahr gilt.' },
            { lead: 'IKK classic:', text: 'Ist dein Partner oder deine Partnerin selbst bei der IKK classic versichert, kann er oder sie den eigenen Kurs als Zuschussleistung im Bonusprogramm einreichen.' },
          ],
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Im Bonusprogramm zählen die Kurse oft zusätzlich: Bei der IKK classic bringt der Rückbildungskurs bis zu 75 EUR als Zuschuss, nur gegen nachgewiesene Kosten wie den Beitrag einer Zusatzversicherung, bei der TK die Rückbildungsgymnastik 1.000 Punkte, bei der Barmer 150 Punkte. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Was die Punkte wert sind, steht in unseren Ratgebern zur ',
            },
            { text: 'IKK classic', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: ', zur ' },
            { text: 'TK', to: '/ratgeber/tk-bonusprogramm-2026' },
            { text: ' und zur ' },
            { text: 'Barmer', to: '/ratgeber/barmer-bonusprogramm-2026' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'mutterschaftsgeld',
      heading: 'Wie viel Mutterschaftsgeld bekomme ich und wo beantrage ich es?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mutterschaftsgeld gibt es für die Schutzfristen: sechs Wochen vor dem errechneten Termin, den Tag der Entbindung und acht Wochen danach, in bestimmten Fällen wie Früh- und Mehrlingsgeburten zwölf Wochen (§ 3 MuSchG).',
        },
        {
          type: 'paragraph',
          text: 'Bist du angestellt und selbst Mitglied einer gesetzlichen Kasse, zahlt deine Kasse. Grundlage ist dein durchschnittliches Nettoentgelt der letzten drei abgerechneten Monate, die Kasse zahlt davon höchstens 13 EUR am Tag. Liegt dein Netto darüber, zahlt dein Arbeitgeber den Unterschied (§ 20 MuSchG). Bist du ohne Arbeitsverhältnis mit Anspruch auf Krankengeld versichert, etwa selbstständig, bekommst du Mutterschaftsgeld in Höhe des Krankengeldes (§ 24i SGB V).',
        },
        {
          type: 'paragraph',
          text: 'Beantragen musst du es bei deiner Kasse, zusammen mit einem Zeugnis deiner Ärztin, deines Arztes oder deiner Hebamme über den voraussichtlichen Entbindungstermin. Reich den Antrag ein, bevor die Schutzfrist beginnt.',
        },
        {
          type: 'paragraph',
          text: 'Bist du nicht selbst Mitglied einer gesetzlichen Kasse, etwa weil du familienversichert oder privat versichert bist, gilt § 19 Abs. 2 MuSchG: Fällst du als Beschäftigte unter das Mutterschutzgesetz, bekommst du auf Antrag beim Bundesamt für Soziale Sicherung insgesamt höchstens 210 EUR. Dazu zahlt dein Arbeitgeber den Zuschuss zum Mutterschaftsgeld, also den Unterschied zwischen 13 EUR und deinem durchschnittlichen Netto am Tag (§ 20 MuSchG).',
        },
      ],
    },
    {
      id: 'extras',
      heading: 'Welche Extras zahlt meine Krankenkasse zusätzlich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Alles, was über das Gesetz hinausgeht, regelt jede Kasse in ihrer Satzung. Die Tabelle zeigt große Kassen mit dem Stand vom 6. Oktober 2026, nachgelesen auf den Seiten der Kassen. Maßgeblich ist immer die aktuelle Satzung deiner Kasse.',
        },
        {
          type: 'table',
          caption: 'Schwangerschafts-Extras großer Krankenkassen, Stand 06.10.2026',
          head: ['Kasse', 'Extras in der Schwangerschaft', 'Hebammen-Rufbereitschaft', 'Bonus für die Vorsorge'],
          rows: [
            [
              'IKK classic',
              'Ergänzende Vorsorge (B-Streptokokken, Ringelröteln, Windpocken, Toxoplasmose, Zytomegalie) bis 100 EUR je Schwangerschaft; Folsäure, Eisen, Magnesium bis 100 EUR je Kalenderjahr',
              'bis 250 EUR je Schwangerschaft',
              '30 EUR Zuschuss je gesetzlich vorgesehener Vorsorge; Rückbildungskurs bis 75 EUR Zuschuss; Zuschuss nur bis zur Höhe nachgewiesener Kosten',
            ],
            [
              'TK',
              'Zusätzliche Untersuchungen zahlt die TK laut eigener Seite in der Regel nicht',
              'bis 250 EUR je Schwangerschaft',
              'vollständige Vorsorge 5.000 Punkte, als Gesundheitsdividende 100 EUR bis zur Höhe nachgewiesener Kosten',
            ],
            [
              'Barmer',
              'Familie Plus: 200 EUR je Schwangerschaft, etwa für Osteopathie, Toxoplasmose, B-Streptokokken, Zytomegalie (Satzung §§ 28a und 28d)',
              'aus den 200 EUR',
              'vollständige Vorsorge 100 Punkte, als Zuschuss 20 EUR bis zur Höhe nachgewiesener Kosten; Rückbildung 150 Punkte',
            ],
            [
              'mkk',
              'Laut Satzung (§ 13) Gesamtanspruch von 600 EUR für Leistungen in der Schwangerschaft',
              'anteilig bis 600 EUR',
              'Babybonus laut Satzung (§ 15 Abs. 3) einmalig 190 EUR, wenn Mutter und Kind bei der mkk sind und Vorsorgen, U1 bis U6 und Impfungen im ersten Lebensjahr nachgewiesen sind; nicht zusätzlich zum regulären Bonusprogramm; Antrag bis zum 14. Lebensmonat',
            ],
            [
              'AOK Bayern',
              'Einzelzuschüsse je Schwangerschaft: Folsäure, Magnesium, Eisen bis 100 EUR; Toxoplasmose, B-Streptokokken, pH-Test, Antikörper je bis 25 EUR; Osteopathie 6 Behandlungen je bis 50 EUR; Partner-Geburtsvorbereitung bis 75 EUR',
              'bis 250 EUR',
              'eigenes Bonusprogramm der AOK, hier nicht verglichen',
            ],
            [
              'AOK Hessen',
              'Schwangerschaftspaket bis 400 EUR je Schwangerschaft; Begleitperson Geburtsvorbereitung bis 200 EUR, wenn die Begleitperson selbst bei der AOK Hessen versichert ist',
              'bis 300 EUR, innerhalb des Pakets',
              'eigenes Bonusprogramm der AOK, hier nicht verglichen',
            ],
            [
              'AOK NordWest',
              'Gesundheitsbudget: 80 Prozent bis 500 EUR je Kalenderjahr, geteilt mit Zahnreinigung, Osteopathie, Impfungen und weiteren Extras; darin auch Partnerkurs, Folsäure, Eisen, Magnesium, Tests und Begleitperson im Familienzimmer',
              'aus dem Gesundheitsbudget',
              'eigenes Bonusprogramm der AOK, hier nicht verglichen',
            ],
            [
              'AOK PLUS',
              'SchwangerschaftPLUS bis 500 EUR',
              'bis 250 EUR, innerhalb des Pakets',
              'eigenes Bonusprogramm der AOK, hier nicht verglichen',
            ],
            [
              'AOK Rheinland/Hamburg',
              'Baby-Bonus: 80 Prozent bis 250 EUR je Schwangerschaft, wenn Mutter und Kind bei der AOK sind',
              'nicht genannt',
              'eigenes Bonusprogramm der AOK, hier nicht verglichen',
            ],
          ],
          note: 'Stand 06.10.2026 nach den Seiten der Kassen. Maßgeblich sind Satzung und Leistungsbedingungen deiner Krankenkasse. Weitere Kassen regeln ihre Extras anders, die Angaben stehen in deren Satzung.',
        },
        {
          type: 'paragraph',
          text: 'So liest du die Tabelle: Meist zahlst du zuerst selbst und reichst danach die Rechnung ein. Viele Töpfe gelten je Schwangerschaft, manche je Kalenderjahr, etwa das Gesundheitsbudget der AOK NordWest und der Topf für Folsäure, Eisen und Magnesium bei der IKK classic. Getrennt davon läuft das Bonusprogramm deiner Kasse: Bei der IKK classic zählt jede gesetzlich vorgesehene Vorsorge einzeln, bei TK und Barmer gibt es einen Betrag einmal für die vollständige Vorsorge.',
        },
        {
          type: 'paragraph',
          text: 'Deinen Kassenbonus kannst du bei manchen Kassen als Zuschuss zur Zusatzversicherung nehmen. Bei der IKK classic sind laut Satzung bis zu 810 EUR Zuschuss im Jahr möglich, in der Schwangerschaft bis zu 1.155 EUR, weil jede gesetzliche Vorsorge einzeln zählt. Nach unserer Einschätzung aus der Beratung landen viele zwischen 400 und 700 EUR. Erstattet wird höchstens so viel, wie du an Beitrag nachweist. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Alle Positionen, Nachweise und Fristen findest du in unseren Ratgebern zur ' },
            { text: 'IKK classic in der Schwangerschaft', to: '/ratgeber/ikk-classic-bonusprogramm-2026#schwangerschaft' },
            { text: ', zu ' },
            { text: 'allen elf AOKs', to: '/ratgeber/aok-bonusprogramm-2026' },
            { text: ', zur ' },
            { text: 'TK', to: '/ratgeber/tk-bonusprogramm-2026' },
            { text: ', zur ' },
            { text: 'Barmer', to: '/ratgeber/barmer-bonusprogramm-2026' },
            { text: ' und zur ' },
            { text: 'mkk', to: '/ratgeber/mkk-bonusprogramm-2026' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'selbst-zahlen',
      heading: 'Welche Untersuchungen muss ich selbst bezahlen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Was nicht in der Mutterschafts-Richtlinie steht oder dort nur bei einem bestimmten Anlass vorgesehen ist, bietet dir die Praxis als Selbstzahlerleistung an, oft IGeL genannt. Die häufigsten:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Toxoplasmose-Test.',
              text: 'Die Kasse zahlt ihn bei begründetem Verdacht auf eine Infektion. Ohne Anlass kostet er laut IGeL-Monitor 16,90 bis 20,40 EUR, dazu können Beratung und Blutabnahme kommen (Stand Oktober 2021).',
            },
            {
              lead: 'Tests auf weitere Infektionen',
              text: 'wie Ringelröteln, Windpocken oder Zytomegalie zahlt die Kasse ebenfalls bei begründetem Verdacht. Ohne Anlass zahlst du sie selbst.',
            },
            {
              lead: 'Feinultraschall.',
              text: 'Gibt es einen medizinischen Anlass, überweist dich deine Praxis zur weiterführenden Untersuchung, dann zahlt die Kasse. Ohne Anlass zahlst du ihn selbst.',
            },
            {
              lead: 'Zusätzlicher Ultraschall.',
              text: 'Die Kasse zahlt die drei Screenings und weitere Untersuchungen, wenn es einen medizinischen Grund gibt. Ultraschall ohne medizinischen Zweck, das sogenannte Babyfernsehen, ist verboten (§ 10 NiSV).',
            },
            {
              lead: 'Abstrich auf B-Streptokokken.',
              text: 'Er gehört nicht zur Mutterschafts-Richtlinie. Viele Kassen geben aus ihren Satzungstöpfen etwas dazu, siehe Tabelle oben.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Ob eine Untersuchung für dich sinnvoll ist, klärst du mit deiner Praxis. Wer sie bezahlt, ist eine zweite Frage.',
        },
        {
          type: 'paragraph',
          text: 'Was die Kasse nicht zahlt, kann ein ambulanter Zusatztarif mittragen. Bei der SDK greift der Vorsorge-Topf ohne Wartezeit, auch bei bereits festgestellter Schwangerschaft, für Untersuchungen ab Versicherungsbeginn wie Feinultraschall oder einen Toxoplasmose-Test. Im Tarif Ambulant 100 stehen dafür bis zu 500 EUR je zwei Kalenderjahre bereit. Die Gesundheitsfragen im Antrag beantwortest du vollständig, auch zur Schwangerschaft. Die Entbindung selbst ist bei bestehender Schwangerschaft nicht mehr versicherbar, das sagen wir dir vorher.',
        },
      ],
    },
    {
      id: 'kassenwechsel',
      heading: 'Darf ich in der Schwangerschaft die Krankenkasse wechseln?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja. Die neue Kasse darf dich nicht ablehnen, auch nicht wegen der Schwangerschaft (§ 175 Abs. 1 SGB V). Den Wechsel erklärst du bei der neuen Kasse. Drei Punkte bestimmen, wann er wirkt:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Bindung.',
              text: 'An deine bisherige Kasse bist du mindestens zwölf Monate gebunden. Erhöht sie ihren Zusatzbeitrag, kannst du auch vorher kündigen, spätestens bis zum Ende des Monats, ab dem der höhere Beitrag gilt (§ 175 Abs. 4 SGB V). Hast du einen Wahltarif, kann die Bindung länger sein (§ 53 Abs. 8 SGB V).',
            },
            {
              lead: 'Wirkung.',
              text: 'Der Wechsel wirkt zum Ende des übernächsten Kalendermonats, gerechnet ab dem Monat, in dem du ihn erklärst. Zwischen Erklärung und neuer Mitgliedschaft liegen also gut zwei bis knapp drei Monate.',
            },
            {
              lead: 'Zeitpunkt.',
              text: 'Soll der Wechsel wirken, bevor die Schutzfrist sechs Wochen vor dem Termin beginnt, erklärst du ihn rechnerisch spätestens um die 21. Woche.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Zwei verbreitete Annahmen stimmen nicht mehr: Gewechselt wird nicht nur zum Quartal, und die Bindung beträgt nicht mehr 18 Monate.',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Die Pflichtleistungen laufen weiter.',
              text: 'Mutterpass und Hebamme bleiben dieselben.',
            },
            {
              lead: 'Extras und Bonus der neuen Kasse',
              text: 'gelten erst ab dem ersten Tag der Mitgliedschaft. Rechnungen aus der Zeit davor zahlt die neue Kasse nicht.',
            },
            {
              lead: 'Bei der bisherigen Kasse nachfragen,',
              text: 'ob sie Bonus und Extras für die Zeit bis zum Wechsel noch erstattet und bis wann du einreichen musst.',
            },
            {
              lead: 'Mutterschaftsgeld vorher klären,',
              text: 'mit beiden Kassen. Der Leistungsanspruch gegen die alte Kasse endet mit der Mitgliedschaft (§ 19 Abs. 1 SGB V).',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Bevor du wegen des Bonus wechselst, rechne ehrlich. Bonus und Extras zählen erst ab dem ersten Tag bei der neuen Kasse. Erklärst du den Wechsel in der 10. Woche, bist du je nach Tag im Monat etwa ab der 19. bis 23. Woche Mitglied. Bei der IKK classic zählen dann nur die Vorsorgen ab diesem Tag, jede mit 30 EUR als Zuschuss zur Zusatzversicherung, höchstens bis zur Höhe deines Beitrags, dazu die Extras, die ab dann anfallen. Die Vorsorgen davor bringen dir dort nichts. Bist du schon bei der IKK classic, zählt jede Vorsorge. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab. Wir rechnen es individuell für dich aus.',
        },
        {
          type: 'paragraph',
          text: 'Ob sich ein Wechsel für dich lohnt, hängt auch am Zusatzbeitrag der neuen Kasse.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Kann ich jetzt noch eine Zusatzversicherung abschließen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, aber nicht für alles. Die Grenze verläuft zwischen Vorsorge und Entbindung.',
        },
        {
          type: 'paragraph',
          text: 'Die Entbindung ist bei einer bestehenden Schwangerschaft nicht versicherbar, auch Chefarzt und Familienzimmer bei dieser Geburt nicht. Ein Krankenhaustarif, den du jetzt abschließt, zählt für die Zeit danach und als Grundlage für den Tarif deines Kindes.',
        },
        {
          type: 'paragraph',
          text: 'Ambulant geht noch etwas: Der Vorsorge-Topf der SDK greift ohne Wartezeit auch bei bestehender Schwangerschaft, für Untersuchungen ab Versicherungsbeginn (siehe oben bei den Selbstzahlerleistungen). Die Gesundheitsfragen beantwortest du vollständig. Eine Aufnahme ist auch mit Vorerkrankungen möglich, unter Umständen mit Risikozuschlag.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was im Detail versichert ist und was nicht, steht im Ratgeber ' },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '. Den Überblick für diese Phase findest du auf ' },
            { text: 'healio.de/schwangerschaft', to: '/schwangerschaft' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'baby',
      heading: 'Wie versichere ich mein Baby nach der Geburt?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei der gesetzlichen Kasse ist dein Kind in der Regel über die Familienversicherung beitragsfrei mitversichert. Melde es dafür möglichst bald nach der Geburt bei deiner Kasse an.',
        },
        {
          type: 'paragraph',
          text: 'Für dein Baby zählt der Tag der Geburt. Ist ein Elternteil an diesem Tag versichert und meldest du dein Kind spätestens zwei Monate danach an, nimmt der Versicherer es rückwirkend ab Geburt auf, ohne Risikozuschlag und ohne Wartezeit. Das Kind bekommt dabei höchstens den Schutz des Elternteils: Ist kein Elternteil beim selben Versicherer im Klinik-Tarif versichert, kommt das Baby nicht ohne Prüfung in einen Klinik-Tarif.',
        },
        {
          type: 'paragraph',
          text: 'Manche Versicherer verlangen zusätzlich, dass der Elternteil am Tag der Geburt schon eine Weile versichert ist. Das Gesetz erlaubt dafür höchstens drei Monate (§ 198 VVG). Bei der Bayerischen sind es drei Monate, bei der SDK genügt es, dass ein Elternteil am Tag der Geburt versichert ist.',
        },
      ],
    },
    {
      id: 'checkliste',
      heading: 'Checkliste: Was muss ich wann beantragen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die wichtigsten Fristen von der Schwangerschaft bis zum ersten Geburtstag. Am besten trägst du sie dir gleich in den Kalender ein.',
        },
        {
          type: 'table',
          caption: 'Fristen von der Schwangerschaft bis zum ersten Geburtstag',
          head: ['Wann', 'Was', 'Grundlage'],
          rows: [
            ['Sobald du es weißt', 'Arbeitgeber informieren, eine feste Frist gibt es nicht', '§ 15 MuSchG'],
            ['Während der Schwangerschaft', 'Bei finanzieller Notlage Hilfe der Bundesstiftung Mutter und Kind beantragen, nur vor der Geburt und über eine Beratungsstelle in deinem Bundesland', 'Bundesstiftung Mutter und Kind'],
            ['Früh', 'Hebamme suchen und die Extras deiner Kasse prüfen, etwa Rufbereitschaft, Tests und Kurse', '§ 24d SGB V, Satzung deiner Kasse'],
            ['Vor der Schutzfrist', 'Mutterschaftsgeld bei deiner Kasse beantragen, mit Zeugnis über den voraussichtlichen Termin; ohne eigene Mitgliedschaft beim Bundesamt für Soziale Sicherung', '§ 24i SGB V, §§ 3 und 19 MuSchG'],
            ['Spätestens um die 21. Woche', 'Kassenwechsel erklären, falls gewünscht und die Bindung abgelaufen ist, damit er vor der Schutzfrist wirkt', '§ 175 SGB V'],
            ['Bevor die Hilfe beginnt', 'Haushaltshilfe mit ärztlicher Bescheinigung bei der Kasse abstimmen', '§ 24h SGB V'],
            ['Spätestens 7 Wochen vor Beginn', 'Elternzeit beim Arbeitgeber in Textform verlangen', '§ 16 BEEG'],
            ['Innerhalb einer Woche nach der Geburt', 'Geburt beim Standesamt anzeigen, meist über die Klinik', '§ 18 PStG'],
            ['Möglichst bald nach der Geburt', 'Kind bei deiner Krankenkasse zur Familienversicherung anmelden', '§ 10 SGB V'],
            ['Spätestens 2 Monate nach der Geburt', 'Kind beim privaten Zusatzversicherer eines Elternteils anmelden. Ist der Elternteil am Tag der Geburt dort versichert, wird es rückwirkend ab Geburt ohne Risikozuschläge und Wartezeiten aufgenommen. Manche Versicherer verlangen, dass der Elternteil schon eine Weile versichert ist, laut Gesetz höchstens drei Monate, bei der Bayerischen drei Monate', '§ 198 VVG'],
            ['In den ersten 3 Lebensmonaten', 'Elterngeld beantragen, rückwirkend wird es nur für drei Lebensmonate gezahlt', '§ 7 BEEG'],
            ['In den ersten 6 Monaten', 'Kindergeld beantragen, rückwirkend wird es nur für sechs Monate gezahlt', '§ 70 EStG'],
            ['Bis 12 Wochen nach der Geburt', 'Hebammenhilfe im Wochenbett nutzen; danach bis zu acht Kontakte bei Still- oder Ernährungsproblemen, alles Weitere auf ärztliche Anordnung', '§ 24d SGB V, Hebammenhilfevertrag'],
            ['Bis 31.03.2027', 'Nur IKK classic: Bonusantrag für 2026 einreichen, jede Mutterschaftsvorsorge einzeln mit Nachweis aus dem Mutterpass', 'Bonusprogramm der IKK classic'],
            ['Bis zum 14. Lebensmonat', 'Nur mkk: Babybonus beantragen', 'Satzung der mkk'],
          ],
        },
      ],
    },
    {
      id: 'staat',
      heading: 'Welches Geld gibt es vom Staat?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Kindergeld:',
              text: '259 EUR im Monat je Kind. Beantrag es zügig, denn rückwirkend wird es nur für die letzten sechs Monate vor dem Monat gezahlt, in dem dein Antrag eingeht (§ 70 Abs. 1 EStG).',
            },
            {
              lead: 'Elterngeld:',
              text: 'Den Antrag stellst du bei der Elterngeldstelle, in der Praxis nach der Geburt. Rückwirkend gibt es Elterngeld nur für die letzten drei Lebensmonate vor dem Lebensmonat, in dem dein Antrag eingeht (§ 7 Abs. 1 BEEG).',
            },
            {
              lead: 'Bundesstiftung Mutter und Kind:',
              text: 'Hilfe für Schwangere in einer finanziellen Notlage. Der Antrag geht nur während der Schwangerschaft, über eine Schwangerschaftsberatungsstelle in deinem Bundesland.',
            },
            {
              lead: 'Mutterschaftsgeld ohne eigene Kassenmitgliedschaft:',
              text: 'insgesamt höchstens 210 EUR vom Bundesamt für Soziale Sicherung; bist du beschäftigt, zahlt dein Arbeitgeber zusätzlich den Zuschuss zum Mutterschaftsgeld (§ 20 MuSchG), siehe oben.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Die aktuellen Antragswege für Kindergeld, Elterngeld und Mutterschaftsleistungen beschreibt das ' },
            { text: 'Familienportal des Bundes', href: 'https://familienportal.de/' },
            { text: '.' },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio verbindet den Bonus deiner Krankenkasse mit einer Zusatzversicherung. Wo deine Kasse es erlaubt, fließt der Bonus als Zuschuss in den Beitrag, höchstens bis zu dessen Höhe. In der Schwangerschaft zählt dabei vor allem der Vorsorge-Topf eines ambulanten Tarifs; die Entbindung ist bei bestehender Schwangerschaft nicht mehr versicherbar. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab, wir rechnen es individuell für dich aus.',

  faqs: [
    {
      question: 'Zahlt die Kasse die Haushaltshilfe auch ohne Kaiserschnitt?',
      answer:
        'Ja, wenn die Voraussetzungen erfüllt sind. Das Gesetz knüpft die Haushaltshilfe nicht an die Art der Geburt, sondern daran, dass du den Haushalt wegen der Schwangerschaft oder der Entbindung nicht weiterführen kannst und niemand im Haushalt einspringen kann. Eine ärztliche Bescheinigung brauchst du in jedem Fall, und die Kostenübernahme klärst du vorher mit deiner Kasse.',
    },
    {
      question: 'Bekomme ich Mutterschaftsgeld, wenn ich familienversichert bin?',
      answer:
        'Nicht von der Krankenkasse. Bist du nicht selbst Mitglied einer gesetzlichen Kasse und fällst als Beschäftigte unter das Mutterschutzgesetz, zahlt das Bundesamt für Soziale Sicherung auf Antrag insgesamt höchstens 210 EUR (§ 19 Abs. 2 MuSchG). Dazu zahlt dein Arbeitgeber den Zuschuss zum Mutterschaftsgeld, also den Unterschied zwischen 13 EUR und deinem durchschnittlichen Netto am Tag (§ 20 MuSchG).',
    },
    {
      question: 'Gibt es noch ein Entbindungsgeld?',
      answer:
        'Von der gesetzlichen Krankenkasse nicht. § 24c SGB V zählt die Leistungen bei Schwangerschaft und Mutterschaft auf: ärztliche Betreuung und Hebammenhilfe, Arznei-, Verband-, Heil- und Hilfsmittel samt digitaler Gesundheitsanwendungen, Entbindung, häusliche Pflege, Haushaltshilfe und Mutterschaftsgeld. Ein Entbindungsgeld steht nicht darin. Finanziell helfen das Mutterschaftsgeld und, je nach Kasse, die Extras aus der Satzung.',
    },
    {
      question: 'Welche Kasse zahlt in der Schwangerschaft am meisten?',
      answer:
        'Pauschal lässt sich das nicht sagen. Die Pflichtleistungen sind überall gleich, die Extras reichen von einzelnen Zuschüssen bis zu Paketen von mehreren hundert Euro, und dazu kommen Bonusprogramm und Zusatzbeitrag. Bei der IKK classic zählt im Bonusprogramm jede gesetzlich vorgesehene Vorsorge einzeln. Vor einem Wechsel lohnt die ehrliche Rechnung, denn Extras und Bonus gibt es erst ab dem ersten Tag bei der neuen Kasse. Ob sich ein Wechsel für dich lohnt, hängt auch am Zusatzbeitrag der neuen Kasse.',
    },
    {
      question: 'Muss ich die Extras meiner Kasse vorher beantragen?',
      answer:
        'Meist nicht. Bei den meisten Extras zahlst du zuerst selbst und reichst danach die Rechnung ein. Prüf trotzdem vorher die Bedingungen in der Satzung deiner Kasse, etwa ob die Leistung je Schwangerschaft oder je Kalenderjahr gilt und ob Mutter und Kind bei derselben Kasse versichert sein müssen. Die Haushaltshilfe stimmst du immer vorher mit deiner Kasse ab.',
    },
    {
      question: 'Wie oft muss ich zur Vorsorge?',
      answer:
        'Laut Mutterschafts-Richtlinie im Allgemeinen alle vier Wochen, in den letzten zwei Schwangerschaftsmonaten im Allgemeinen zweimal im Monat. Dazu kommen drei Ultraschall-Screenings. Bei Beschwerden oder besonderem Überwachungsbedarf können es mehr Termine sein.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Was ein Zusatztarif in der Schwangerschaft noch leisten kann, steht im Ratgeber ' },
      { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
      { text: '. Den Alltag dieser Monate von Mutterpass bis Job haben wir im Ratgeber ' },
      { text: 'Worauf du in der Schwangerschaft achten solltest', to: '/ratgeber/schwangerschaft-worauf-achten' },
      { text: ' zusammengestellt, und auf ' },
      { text: 'healio.de/schwangerschaft', to: '/schwangerschaft' },
      { text: ' rechnest du aus, was dein Kassenbonus als Zuschuss zum Beitrag bringen kann.' },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Kassenwerte Stand 06.10.2026 nach den Seiten der Kassen, maßgeblich sind immer Satzung und Leistungsbedingungen deiner Krankenkasse sowie die geltenden Gesetze. Dieser Text ersetzt keine medizinische Beratung.',
};

export default article;
