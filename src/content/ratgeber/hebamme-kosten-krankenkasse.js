/**
 * Ratgeberartikel 5: Was die Hebamme macht, was die Krankenkasse zahlt und
 * wo Schwangere selbst zahlen.
 *
 * Auftrag Frank, 05.10.2026. Grundlage ist die gegengepruefte Recherche vom
 * 05.10.2026 (Healio/Krankenhauszusatz-Unterlagen/
 * HEBAMME-LEISTUNGEN-KOSTEN-BAYERISCHE-2026-10-05.md):
 *   - Kassensaetze: Hebammenhilfevertrag nach § 134a SGB V, Fassung ab
 *     01.04.2026, Saetze gueltig seit 01.11.2025, Anlage 1.1 (6,19 EUR je
 *     5 Minuten, Kurse 0,95 EUR je 5 Minuten und Teilnehmerin, Wegegeld
 *     0,97 EUR je km, Materialpauschalen 60100, 60200, 61200).
 *   - Vorsorge-Rhythmus: Mutterschafts-Richtlinie § 2 Abs. 8, Ultraschall
 *     § 2 Abs. 9 (geltende Fassung, zuletzt geaendert 16.07.2026).
 *   - Rufbereitschaft: GKV-Spitzenverband, Zahlen, Daten, Fakten (Okt. 2025)
 *     S. 3; Preis Hamburg laut Website einer Beleghebammen-Praxis, abgerufen
 *     05.10.2026; IKK classic Satzung § 34h (bis 250 EUR), TK bis 250 EUR.
 *   - Bayerische: AVB B 275000 § 2 Abs. 1 und 2, § 3 Abs. 2; Tarifbedingungen
 *     Komfort B 275005 und Prestige B 275006 Ziff. 2.1 und 2.7; IPID;
 *     Produktsteckbrief B 275010 S. 2 (Wiedergabe der Gesundheitsfrage).
 *
 * Eingearbeitete Korrekturen der Gegenpruefer:
 *   - Wegegeld als "10 km gefahrene Strecke je Besuch" beschriftet.
 *   - Privatfaktor 2,0 nur als Modellannahme; als Beleg fuer die Faustformel
 *     dient Bayern (HebGebV § 2), nicht Hamburg.
 *   - Kostenerstattung nur nach vorheriger Wahl, mit Zustimmung der Kasse bei
 *     Hebammen ohne Kassenvertrag und bis zu 5 Prozent Abschlag.
 *   - Telefonberatung im Wochenbett zaehlt auf die 20 Kontakte.
 *   - Materialpauschalen 60100 (2 x 2,84 EUR) und 61200 (35,17 EUR) ergaenzt,
 *     Kassensumme deshalb 1.683,78 EUR statt 1.642,93 EUR.
 *   - Rufbereitschaft getrennt vom Rechenbeispiel (Beleg-Vorsorge liefe in
 *     der Praxis ohne Wegegeld).
 *   - Nachpruefung 06.10.2026 gegen die Original-PDFs: Ziffer 2.7 steht
 *     wortgetreu als Mehrkosten bei Wahl eines anderen Krankenhauses (mit
 *     Kassenvorbehalt), nicht als eigene Hebammenleistung. Laufende
 *     Schwangerschaft nur im Wortlaut der Gesundheitsfrage (Produktsteckbrief
 *     B 275010 S. 2) und AVB § 2 Abs. 1, ohne eigene Schlussfolgerung.
 *     Rufbereitschaft: "mit dem vollen Zuschuss bleiben 750 EUR", weil die
 *     IKK classic bis zu 250 EUR zahlt.
 *
 * Inhaltliche Grenze: Keine Aussage, dass eine Zusatzversicherung ambulante
 * Hebammenkosten oder die Rufbereitschaft zahlt, weil das nicht in den
 * Bedingungen steht. Die Begruendung steht in der Recherchedatei oben.
 */

export const article = {
  slug: 'hebamme-kosten-krankenkasse',
  kind: 'ratgeber',

  metaTitle: 'Hebamme Kosten: was die Krankenkasse zahlt | Healio',
  metaDescription:
    'Vorsorge, Wochenbett, Rückbildung: was die Hebamme macht, was die Krankenkasse zahlt und wo du selbst zahlst, etwa bei der Rufbereitschaft. Mit Rechnung.',

  publishedAt: '2026-10-05',
  publishedAtLabel: '5. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Hebamme: was die Krankenkasse zahlt und wo du selbst zahlst',
  listTeaser:
    'Vorsorge zu Hause, Wochenbett, Rückbildung: was die Hebamme in jeder Phase macht, eine Beispielrechnung mit den Kassensätzen und die Stellen, an denen doch Kosten bleiben.',

  headline: 'Hebamme in der Schwangerschaft: Was die Krankenkasse zahlt und wo du selbst zahlst',
  lead:
    'Hat deine Hebamme einen Kassenvertrag, zahlt deine gesetzliche Krankenkasse Vorsorge, Hausbesuche, Kurse, Wochenbett und Rückbildung. Extra verlangen darf die Hebamme dafür nichts. Kosten entstehen nur an wenigen Stellen. Hier liest du, was die Hebamme in jeder Phase macht, wie viel die Kasse in einem Beispiel mit den echten Kassensätzen zahlt und wo du selbst zahlst.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Die Kasse zahlt fast alles.',
              text: 'Mit einer Hebamme mit Kassenvertrag kosten dich Vorsorge, Besuche bei Beschwerden, Geburtsvorbereitung, Wochenbett, Stillberatung und Rückbildung nichts. Eine Zuzahlung gibt es nicht.',
            },
            {
              lead: 'Im Beispiel zahlt die Kasse 1.683,78 EUR.',
              text: 'So viel bekommt die Hebamme für sechs Vorsorgen, zwei Besuche bei Beschwerden, zwei Kurse und 14 Besuche im Wochenbett. Dein Anteil daran: 0 EUR.',
            },
            {
              lead: 'Selbst zahlst du an wenigen Stellen.',
              text: 'Bei der Rufbereitschaft für eine Beleg-, Haus- oder Geburtshausgeburt, bei der Kursgebühr für deinen Partner, bei Besuchen über die Kassengrenzen hinaus und bei einer Hebamme, die privat abrechnet.',
            },
            {
              lead: 'Die Rufbereitschaft ist der teure Posten.',
              text: 'Eine Hamburger Beleghebammen-Praxis nimmt dafür 1.000 EUR, ab 1. November 2026 sind es 1.250 EUR. Manche Kassen geben bis zu 250 EUR dazu, zum Beispiel die IKK classic und die TK.',
            },
            {
              lead: 'Klinikschutz für die Geburt gehört vor die Schwangerschaft.',
              text: 'Im Krankenhauszusatz der Bayerischen gibt es keine allgemeine Wartezeit, für die Entbindung aber acht Monate. Laufende Untersuchungen und Behandlungen in Zusammenhang mit einer Schwangerschaft und Entbindung sind bei einem neuen Vertrag nicht mitversichert.',
            },
          ],
        },
      ],
    },
    {
      id: 'vorsorge',
      heading: 'Was macht die Hebamme bei der Vorsorge?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Vorsorgeuntersuchungen kann auch die Hebamme übernehmen, im Wechsel mit deiner Frauenärztin und auf Wunsch bei dir zu Hause. Die Kasse bezahlt je Termin bis zu 30 Minuten, und das passiert dabei:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Die Grundwerte.',
              text: 'Blutdruck messen, den Urin auf Eiweiß und Zucker prüfen, wiegen.',
            },
            {
              lead: 'Der Bauch.',
              text: 'Beim Abtasten sieht die Hebamme, wie hoch die Gebärmutter steht und wie dein Kind liegt, danach hört sie die Herztöne ab.',
            },
            {
              lead: 'Das Blut.',
              text: 'Blut abnehmen nach der Mutterschafts-Richtlinie, etwa für den Hämoglobinwert, der im Regelfall ab dem 6. Monat bestimmt wird.',
            },
            {
              lead: 'Der Mutterpass.',
              text: 'Jeder Befund wird eingetragen, egal ob die Hebamme oder die Ärztin untersucht hat.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Den Ultraschall macht weiter deine Frauenärztin. Die drei regulären Screenings liegen in den Zeitfenstern 8+0 bis 11+6, 18+0 bis 21+6 und 28+0 bis 31+6 Schwangerschaftswochen. Für den Rhythmus gilt die Mutterschafts-Richtlinie (§ 2 Abs. 8): im Allgemeinen alle vier Wochen eine Vorsorge, in den letzten zwei Schwangerschaftsmonaten je zwei im Monat. Hebamme und Ärztin können sich dabei abwechseln. Bei einer Risikoschwangerschaft übernimmt die Hebamme die Vorsorge auf ärztliche Anordnung.',
        },
      ],
    },
    {
      id: 'beschwerden-und-kurs',
      heading: 'Was macht die Hebamme bei Beschwerden und in der Geburtsvorbereitung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Neben der Vorsorge kommt die Hebamme, wenn etwas nicht stimmt oder du Fragen hast. Typische Anlässe:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Beschwerden.',
              text: 'Rückenschmerzen, Übelkeit, Sodbrennen oder Wassereinlagerungen: Die Hebamme schätzt die Ursache ein und zeigt dir, was hilft.',
            },
            {
              lead: 'Wehen und Blasensprung.',
              text: 'Vorzeitige Wehen oder Senkwehen abklären, bei Bedarf mit dem Wehenschreiber (CTG), und prüfen, ob die Geburt beginnt oder die Fruchtblase geplatzt ist. Wird es ernst, organisiert die Hebamme den Weg in die Klinik.',
            },
            {
              lead: 'Kurze Fragen am Telefon.',
              text: 'Bis zu 10 Minuten je Gespräch, in der Schwangerschaft bis zu 12 Telefonberatungen.',
            },
            {
              lead: 'Stillvorbereitung.',
              text: 'Ein Termin bis 45 Minuten, zum Beispiel nach einer schwierigen Stillzeit beim ersten Kind oder nach einer Brust-OP.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Für diese Hilfe nennt der Hebammenhilfevertrag keine feste Höchstzahl an Besuchen. Pro Tag sind bis zu zwei Kontakte mit zusammen 90 Minuten möglich.',
        },
        {
          type: 'paragraph',
          text: 'Den Geburtsvorbereitungskurs machst du in einer Gruppe mit bis zu zehn Teilnehmerinnen, er dauert bis zu 14 Stunden. Es geht um Atmung und Wehen, Gebärhaltungen, Beckenboden, der Ablauf der Geburt samt Kaiserschnitt, dazu Stillen, Wochenbett und der Umgang mit dem Neugeborenen. Die Kasse zahlt den Kurs für dich, nicht für deinen Partner. Einen Einzelkurs mit bis zu sieben Stunden gibt es nur aus bestimmten Gründen, etwa bei vorzeitigen Wehen oder einem Klinikaufenthalt.',
        },
      ],
    },
    {
      id: 'wochenbett',
      heading: 'Wie oft kommt die Hebamme im Wochenbett?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nach der Geburt kommt die Hebamme zu dir nach Hause. Die Besuche zahlt die Kasse in zwei Abschnitten, dazu kommen Termine bei Stillproblemen:',
        },
        {
          type: 'table',
          caption: 'Hebammenbesuche nach der Geburt, die die Kasse zahlt',
          head: ['Zeitraum', 'Was die Kasse zahlt', 'Grenzen'],
          rows: [
            [
              'Geburt bis 10. Lebenstag',
              'bis zu 20 Kontakte',
              'bis zu zwei Kontakte und 90 Minuten am Tag, an den ersten drei Lebenstagen und am Tag des ersten Hausbesuchs bis 120 Minuten',
            ],
            [
              '11. Lebenstag bis Ende der 12. Woche',
              'bis zu 16 Besuche',
              'einer am Tag, bis 60 Minuten',
            ],
            [
              'Ab der 13. Woche, bei Stillproblemen',
              'bis zu 8 Termine',
              'je bis 45 Minuten, bis zum Ende der Stillzeit, bei Ernährungsproblemen deines Babys bis zum Ende des 9. Lebensmonats',
            ],
          ],
          note: 'Pro Tag ist zusätzlich eine Telefonberatung bis 10 Minuten möglich, sie zählt auf die 20 Kontakte bis zum 10. Lebenstag. Mehr Besuche zahlt die Kasse auf ärztliche Anordnung.',
        },
        {
          type: 'paragraph',
          text: 'Bei dir prüft die Hebamme durch Abtasten, ob sich die Gebärmutter zurückbildet. Dazu beurteilt sie den Wochenfluss, sieht sich Dammnaht oder Kaiserschnittnaht an und zieht bei Bedarf die Fäden. Außerdem hilft sie beim Anlegen, bei Milchstau und wunden Brustwarzen und leitet erste Übungen für den Beckenboden an. Bei deinem Baby kontrolliert sie Gewicht und Nabel, achtet auf Zeichen einer Gelbsucht und zeigt dir Baden, Wickeln und Tragen. Ab dem 11. Lebenstag geht es vor allem um die Gewichtszunahme, Stillen oder Fläschchen und um Fragen zu Schlaf und Weinen.',
        },
      ],
    },
    {
      id: 'rueckbildung',
      heading: 'Was gehört zur Rückbildung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Einen Rückbildungskurs in der Gruppe mit bis zu zehn Stunden zahlt die Kasse. Du lernst, den Beckenboden zu spüren und zu kräftigen, stärkst Rücken und Bauch und übst, mit Baby rückenschonend zu heben und zu tragen. Achte dabei auf die Frist, denn jede Kursstunde muss bis zum Ende des 9. Monats nach der Geburt stattfinden. Spätere Stunden zahlt die Kasse nicht mehr. Einen Einzelkurs mit bis zu fünf Stunden gibt es nur aus bestimmten Gründen, etwa wenn dein Kind schwer krank ist.',
        },
      ],
    },
    {
      id: 'rechnung',
      heading: 'Was zahlt die Kasse? Die Rechnung an einem Beispiel',
      blocks: [
        {
          type: 'paragraph',
          text: 'Seit 1. November 2025 rechnen Hebammen nach Minuten ab: 6,19 EUR je 5 Minuten, also 74,28 EUR für eine Stunde. Eine Vorsorge von 30 Minuten bringt der Hebamme 37,14 EUR, ein Hausbesuch von 45 Minuten 55,71 EUR. Kurse zahlt die Kasse mit 0,95 EUR je 5 Minuten und Teilnehmerin. Diese Sätze gelten bundesweit.',
        },
        {
          type: 'paragraph',
          text: 'Für das Beispiel nehmen wir eine Schwangere in Hamburg, gesetzlich versichert, mit dem ersten Kind und einer Geburt in der Klinik mit dem Team des Kreißsaals. Von ihren rund zwölf Vorsorgen macht die Hebamme sechs bei ihr zu Hause, die übrigen und alle Ultraschalluntersuchungen übernimmt die Frauenärztin. Dazu kommen zwei Besuche bei Beschwerden, beide Kurse und 14 Besuche im Wochenbett, alle werktags tagsüber.',
        },
        {
          type: 'table',
          caption: 'Rechenbeispiel Hebamme: was die Kasse zahlt und was du zahlst',
          head: ['Leistung', 'Kasse zahlt der Hebamme', 'Im Beispiel'],
          rows: [
            ['Vorsorge zu Hause', '246,00 EUR', '6 Termine je 30 Minuten'],
            ['Besuche bei Beschwerden', '117,10 EUR', '2 Besuche je 45 Minuten'],
            ['Kurs zur Geburts\u00ADvorbereitung in der Gruppe', '159,60 EUR', '14 Stunden'],
            ['Wochenbett bis zum 10. Lebenstag', '499,42 EUR', '8 Besuche, der erste 60, die übrigen je 45 Minuten'],
            ['Wochenbett bis Ende der 12. Woche', '334,26 EUR', '6 Besuche je 45 Minuten'],
            ['Rückbildungskurs in der Gruppe', '114,00 EUR', '10 Stunden'],
            ['Wegegeld', '213,40 EUR', '22 Hausbesuche, je 10 km gefahrene Strecke'],
            ['Zusammen', '1.683,78 EUR', 'Du zahlst 0 EUR'],
          ],
          note: 'Du zahlst bei einer Hebamme mit Kassenvertrag für keinen dieser Posten etwas. Kassensätze nach dem Hebammenhilfevertrag nach § 134a SGB V, gültig seit 1. November 2025. Enthalten sind die Materialpauschalen für Vorsorge (3,86 EUR je Termin), Besuche bei Beschwerden (2,84 EUR je Besuch) und das Wochenbett (einmal 35,17 EUR). Wegegeld 0,97 EUR je gefahrenem Kilometer. Zahl, Dauer und Strecke der Besuche sind Beispielwerte, dein Bedarf kann kleiner oder größer sein.',
        },
        {
          type: 'paragraph',
          text: 'Unterm Strich gehen im Beispiel 1.683,78 EUR von deiner Kasse direkt an die Hebamme, du zahlst nichts. Du unterschreibst nur jeden Besuch auf einer Bestätigung für die Kasse. Zum Vergleich: 2024 gaben die Krankenkassen für Hebammenhilfe im Schnitt 1.176 EUR je Geburt aus, damals noch zu den alten Sätzen.',
        },
      ],
    },
    {
      id: 'selbst-zahlen',
      heading: 'Wo zahlst du selbst?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Eine Hebamme mit Kassenvertrag darf für die Leistungen aus dem Kassenkatalog keine Mehrkosten verlangen, auch keine Vorkasse. Privat berechnen darf sie nur, was nicht im Katalog steht oder über die Zeit- und Mengengrenzen hinausgeht, und auch das nur, wenn ihr es vorher schriftlich vereinbart. Daraus ergeben sich diese Posten:',
        },
        {
          type: 'table',
          caption: 'Wo bei der Hebamme Kosten für dich bleiben',
          head: ['Posten', 'Wann er anfällt', 'Was die Kasse zahlt'],
          rows: [
            [
              'Rufbereitschaft',
              'Beleggeburt mit eigener Hebamme, Hausgeburt, Geburtshaus',
              'keine Regelleistung, manche Kassen geben bis zu 250 EUR dazu',
            ],
            [
              'Partner im Geburtsvorbereitungskurs',
              'wenn er mitmacht',
              'den Kurs nur für dich; manche Kassen erstatten einen Teil, wenn der Partner selbst dort versichert ist',
            ],
            [
              'Besuche über die Grenzen hinaus',
              'mehr als 20 Kontakte bis zum 10. Lebenstag oder mehr als 16 Besuche bis Ende der 12. Woche',
              'mit ärztlicher Anordnung die Kasse, sonst privat',
            ],
            [
              'Kurse außerhalb des Katalogs',
              'Babymassage, Yoga, Rückbildungsstunden nach dem 9. Monat',
              'nicht über die Hebammenhilfe',
            ],
            [
              'Hebamme ohne Kassenvertrag',
              'wenn sie privat abrechnet',
              'nur mit vorher gewählter Kostenerstattung, höchstens den Kassensatz',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Richtig ins Geld geht die Rufbereitschaft. Wer mit der eigenen Hebamme in der Klinik, zu Hause oder im Geburtshaus entbindet, bezahlt dafür, dass sie Tag und Nacht abrufbereit ist. Die Geburt selbst zahlt die Kasse, die Bereitschaft davor nicht. In Hamburg nimmt eine Beleghebammen-Praxis zum Beispiel 1.000 EUR, ab 1. November 2026 sind es 1.250 EUR. Dafür ist das Team ab 15 Wochen vor dem Termin in Rufbereitschaft und fährt zur Geburt mit in die Klinik. Bist du bei der IKK classic versichert, gibt deine Kasse bis zu 250 EUR je Schwangerschaft dazu. Mit dem vollen Zuschuss bleiben bei dir 750 EUR, ab November 1.000 EUR. In seinem Rechenbeispiel für eine Geburtshausgeburt setzt der GKV-Spitzenverband 500 EUR Rufbereitschaft an. Entbindest du mit den Hebammen des Kreißsaals, fällt keine Rufbereitschaft an.',
        },
      ],
    },
    {
      id: 'privat',
      heading: 'Was kostet eine Hebamme, die privat abrechnet?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Als Faustformel rechnest du mit bis zum Doppelten des Kassensatzes je Besuch. Die genaue Grenze legt die Gebührenordnung des Bundeslandes fest, in Bayern sind es zum Beispiel bis zum 2,0-Fachen. Ein Hausbesuch von 45 Minuten kostet dann bis zu 111,42 EUR statt 55,71 EUR, eine Stunde bis zu 148,56 EUR statt 74,28 EUR. Wegegeld und Material kommen dazu.',
        },
        {
          type: 'paragraph',
          text: 'Rechnest du das ganze Paket aus unserem Beispiel mit dem doppelten Satz, kostet es 3.090,15 EUR statt 1.683,78 EUR. Eine Privatrechnung zahlt deine Kasse nur, wenn du vorher Kostenerstattung gewählt hast. Daran bist du dann mindestens ein Quartal gebunden, und für eine Hebamme ohne Kassenvertrag muss die Kasse vorher zustimmen. Erstattet wird höchstens der Kassensatz, abzüglich bis zu 5 Prozent für die Verwaltung.',
        },
        {
          type: 'table',
          caption: 'Privat abrechnende Hebamme: was im Beispiel bei dir bleibt',
          head: ['Fall', 'Bei dir bleiben', 'Rechnung', 'Kasse zahlt'],
          rows: [
            ['Hebamme mit Kassenvertrag', '0 EUR', 'geht an die Kasse', '1.683,78 EUR'],
            ['Privatrechnung, Kostenerstattung vorher gewählt', '1.406,37 bis 1.490,56 EUR', '3.090,15 EUR', 'höchstens 1.683,78 EUR, abzüglich bis zu 5 Prozent'],
            ['Privatrechnung ohne Kostenerstattung', '3.090,15 EUR', '3.090,15 EUR', '0 EUR'],
          ],
          note: 'Modellannahme für die Privatrechnung: doppelter Kassensatz auf die Gebühren, Material und Wegegeld zum einfachen Satz. Kostenerstattung nach § 13 Abs. 2 SGB V.',
        },
        {
          type: 'paragraph',
          text: 'Bist du privat versichert, bekommst du von der Hebamme immer eine Privatrechnung. Was deine Krankenversicherung davon erstattet, regelt dein Tarif.',
        },
      ],
    },
    {
      id: 'was-tun',
      heading: 'Was kannst du tun?',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            {
              lead: 'Früh suchen.',
              text: 'Fang im ersten Drittel der Schwangerschaft an. Frag beim ersten Gespräch, ob die Hebamme mit deiner Kasse abrechnet und ob sie eine Rufbereitschaftspauschale nimmt.',
            },
            {
              lead: 'Bei der Kasse nach Zuschüssen fragen.',
              text: 'Vor allem für die Rufbereitschaft. Die IKK classic und die TK geben je bis zu 250 EUR dazu. Lass dir die Bedingungen nennen, bevor du einen Vertrag mit der Hebamme unterschreibst.',
            },
            {
              lead: 'Privates vorher schriftlich klären.',
              text: 'Steht in einem Vertrag ein Aufpreis für eine normale Vorsorge oder einen Wochenbettbesuch, frag nach. Für Kassenleistungen darf eine Hebamme mit Kassenvertrag nichts extra berechnen.',
            },
            {
              lead: 'Den Kassenbonus mitnehmen.',
              text: 'Bei der IKK classic zählt jede gesetzliche Mutterschaftsvorsorge einzeln (Nr. 09), je 10 EUR Geldbonus oder 30 EUR Zuschusswert. Die Rückbildungsgymnastik bringt 25 EUR Geldbonus oder 75 EUR Zuschusswert (Nr. 44). In der breiten Masse liegen aktive Versicherte bei 400 bis 700 EUR im Jahr. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab, wir rechnen es individuell für dich aus.',
            },
            {
              lead: 'Klinikschutz rechtzeitig abschließen.',
              text: 'Für die Geburt muss ein Krankenhauszusatz vor der Schwangerschaft stehen. Was die Bayerische dazu schriftlich festhält, steht im nächsten Abschnitt.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Alle bonusfähigen Positionen mit Beträgen, Nachweisen und der Rechnung, wie der Zuschuss den Beitrag einer Zusatzversicherung senkt, stehen im ',
            },
            { text: 'Ratgeber zum IKK-Bonusprogramm 2026', to: '/ratgeber/ikk-classic-bonusprogramm-2026' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'bayerische',
      heading: 'Was hält die Bayerische für Schwangerschaft und Geburt schriftlich fest?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Krankenhauszusatz ist eine Zusatzversicherung für die Behandlung im Krankenhaus, in Komfort und Prestige auch für die Entbindung in der Klinik. In den Bedingungen der Krankenhauszusatzversicherung 2025 der Bayerischen steht dazu:',
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Keine allgemeine Wartezeit, aber acht Monate für die Entbindung.',
              text: 'Die besondere Wartezeit für eine Entbindung beträgt acht Monate ab Versicherungsbeginn (AVB § 3 Abs. 2).',
            },
            {
              lead: 'Familienzimmer bei der Entbindung.',
              text: 'Im Prestige ohne Begrenzung, im Komfort bis zur Höhe des Zweibettzimmers (Tarifbedingungen Ziffer 2.1). Im Smart ist es nicht enthalten.',
            },
            {
              lead: 'Die Hebamme in der Klinik.',
              text: 'Wählst du ein anderes Krankenhaus als das in der ärztlichen Einweisung, ersetzt der Tarif die Mehrkosten der allgemeinen Krankenhausleistungen, soweit die Kasse sie nicht trägt. Zu diesen Leistungen zählen ausdrücklich auch die einer Hebamme. Zahlt die Kasse für den Aufenthalt gar nichts, ersetzt der Tarif auch nichts (Ziffer 2.7).',
            },
            {
              lead: 'Dein Kind ab der Geburt.',
              text: 'Ist ein Elternteil am Tag der Geburt seit mindestens drei Monaten bei der Bayerischen versichert und meldest du dein Kind spätestens zwei Monate nach der Geburt an, ist es rückwirkend ab Geburt versichert, ohne Wartezeit und ohne Risikozuschlag, auch für Geburtsschäden und angeborene Krankheiten. Sein Schutz reicht höchstens so weit wie der des versicherten Elternteils (AVB § 2 Abs. 2).',
            },
            {
              lead: 'Schon schwanger beim Abschluss.',
              text: 'Unter der Gesundheitsfrage im Produktsteckbrief steht: Laufende oder angeratene Untersuchungen oder Behandlungen, auch in Zusammenhang mit einer Schwangerschaft und Entbindung, sind nicht mitversichert. Die Bedingungen ergänzen: Für Versicherungsfälle, die vor Beginn des Versicherungsschutzes eingetreten sind, wird nicht geleistet (AVB § 2 Abs. 1).',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Den Klinikschutz für eine Geburt schließt du also ab, bevor du schwanger bist. Die acht Monate Wartezeit für die Entbindung zählen ab Versicherungsbeginn, und laufende Untersuchungen und Behandlungen rund um Schwangerschaft und Entbindung sind bei einem neuen Vertrag nicht mitversichert. Bei deinem Kind kommt es auf drei Monate an. Beginnt dein Vertrag oder der deines Partners mindestens drei Monate vor der Geburt, kannst du dein Kind ab Geburt ohne Wartezeit versichern lassen. Vorsorge, Wochenbett und Rückbildung bei dir zu Hause laufen dagegen über deine Krankenkasse, bei einer Hebamme mit Kassenvertrag ohne Kosten für dich.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Was ambulant in der Schwangerschaft noch geht, wie die SDK die Entbindung regelt und welche Tarifstufe fürs Kind passt, steht im Ratgeber ',
            },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio kombiniert Kassenbonusprogramme mit Zusatzversicherungen zu einem Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus ist jährlich und kann als zweckgebundener Zuschuss den Beitrag der Zusatzversicherung ganz oder teilweise mitfinanzieren, höchstens bis zur Höhe des tatsächlich gezahlten Beitrags. Wie viel dein Kassenbonus bringt, hängt von deiner Krankenkasse und deinen Aktivitäten ab, wir rechnen es individuell für dich aus. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet eine Hebamme, wenn ich gesetzlich versichert bin?',
      answer:
        'Für Vorsorge, Hilfe bei Beschwerden, Geburtsvorbereitung, Wochenbett, Stillberatung und Rückbildung nichts, wenn deine Hebamme einen Kassenvertrag hat. Die Hebamme rechnet direkt mit deiner Kasse ab, eine Zuzahlung gibt es nicht. Kosten entstehen bei der Rufbereitschaft, bei der Kursgebühr für deinen Partner und bei Leistungen über die Kassengrenzen hinaus.',
    },
    {
      question: 'Was ist die Rufbereitschaftspauschale und wer zahlt sie?',
      answer:
        'Mit der Pauschale bezahlst du, dass deine eigene Hebamme rund um die Uhr abrufbereit ist und zur Geburt kommt, bei einer Beleggeburt, einer Hausgeburt oder im Geburtshaus. Die Kasse zahlt sie nicht als Regelleistung. Manche Kassen geben als Satzungsleistung bis zu 250 EUR dazu, etwa die IKK classic und die TK. Eine Hamburger Beleghebammen-Praxis nimmt 1.000 EUR, ab 1. November 2026 1.250 EUR.',
    },
    {
      question: 'Wie oft kommt die Hebamme nach der Geburt?',
      answer:
        'Bis zum 10. Lebenstag deines Babys zahlt die Kasse bis zu 20 Kontakte, an einem Tag bis zu zwei. Danach bis zum Ende der 12. Woche noch einmal bis zu 16 Besuche, je bis 60 Minuten. Bei Stillproblemen kommen ab der 13. Woche bis zu acht Termine dazu. Mehr Besuche zahlt die Kasse auf ärztliche Anordnung.',
    },
    {
      question: 'Darf meine Hebamme für Kassenleistungen Geld verlangen?',
      answer:
        'Nein. Für Leistungen aus dem Kassenkatalog darf eine Hebamme mit Kassenvertrag keine Mehrkosten verlangen, auch keine Vorkasse. Privat vereinbaren darf sie nur Leistungen außerhalb des Katalogs oder über die Zeit- und Mengengrenzen hinaus, und zwar schriftlich vor der Leistung.',
    },
    {
      question: 'Zahlt die Kasse auch meinen Partner im Geburtsvorbereitungskurs?',
      answer:
        'Nein, die Kasse zahlt den Kurs für dich. Die Gebühr für deinen Partner legt die Praxis fest. Manche Kassen erstatten einen Teil, wenn der Partner selbst bei ihnen versichert ist.',
    },
    {
      question: 'Was zahlt die Kasse, wenn meine Hebamme keinen Kassenvertrag hat?',
      answer:
        'Nur dann etwas, wenn du vorher Kostenerstattung gewählt hast und die Kasse zustimmt. Dann bekommst du höchstens den Kassensatz zurück, abzüglich bis zu 5 Prozent für die Verwaltung. Den Rest der Privatrechnung zahlst du selbst.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Auf ' },
      { text: 'healio.de/schwangerschaft', to: '/schwangerschaft' },
      { text: ' findest du den Überblick für diese Phase samt Bonusrechner. Welcher Zusatzschutz jetzt noch geht, steht im Ratgeber ' },
      { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
      { text: '. Den Alltag mit Mutterpass, Mutterschutz und Anträgen haben wir im Ratgeber ' },
      { text: 'Worauf du in der Schwangerschaft achten solltest', to: '/ratgeber/schwangerschaft-worauf-achten' },
      { text: ' zusammengestellt. Die Krankenhausleistungen samt Familienzimmer zeigen wir auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '.' },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Kassensätze nach dem Hebammenhilfevertrag nach § 134a SGB V, gültig seit 1. November 2025; Angaben zur Bayerischen nach AVB B 275000, den Tarifbedingungen der Krankenhauszusatzversicherung 2025 und dem Produktsteckbrief B 275010. Dieser Text ersetzt keine medizinische Beratung, maßgeblich sind die Originaldokumente.',
};

export default article;
