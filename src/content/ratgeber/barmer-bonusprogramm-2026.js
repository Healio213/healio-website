/**
 * Ratgeberartikel BARMER Bonusprogramm 2026. Organischer Ratgeber, keine
 * bezahlte Werbung: Die Seite soll über die Google-Suche gefunden und in
 * KI-Antworten zitiert werden. Eingebaut seit 05.10.2026 in index.js,
 * seo-routes.mjs, sitemap.xml und llms.txt. Kein interner Button
 * (internalCta), weil nur die Artikel aus INTERNAL_BUTTONS in
 * scripts/check-ratgeber-contract.mjs einen tragen dürfen. Healios Angebot
 * steht nur als Textlinks am Ende des Abschnitts "zusatzversicherung".
 *
 * Quelle (einzige Faktenquelle): KassenBoost-Belegkette
 * GKV-Vergleichskampagne/website/app/barmer-bonus-2026.server.ts, Abruf und
 * Eigenverifikation 23.08.2026. Rechenquelle dort ist die Satzung der BARMER,
 * Stand 21.07.2026 in der Fassung des 38. Nachtrages. Fundstellen: § 37
 * (Bonus für gesundheitsbewusstes Verhalten) mit Anlage zu § 37 Teil 1 bis 4
 * (Punktwert, Vorsorgebonus, Aktivbonus, Zuschusskatalog), § 37 Abs. 3
 * (Zuschuss als Alternative, Faktor 2, 1.000 Bonuspunkte je Kalenderjahr),
 * § 37 Abs. 4 (Kombination), § 37 Abs. 5 (Treuebonus), § 37 Abs. 6 (Antrag bis
 * 31.12. des Folgejahres, Verfall mit Versicherungsende), § 38 (Erfolgsbonus,
 * 100 EUR bzw. Zuschuss bis 300 EUR für zwei Kalenderjahre), § 38a
 * (Erfolgsbonus Kinder, 60 EUR), § 39 (BGF-Bonus, höchstens 100 EUR).
 *
 * Stand des Artikels: 05.10.2026.
 *
 * Suchbegriffe (Semrush DE, Phrase Match, 05.10.2026, Volumen je Monat):
 *   barmer bonusprogramm 5.400, bonusprogramm barmer 2.400,
 *   barmer bonusprogramm ausdrucken 1.000, barmer bonusprogramm codes 1.000,
 *   barmer bonusprogramm 2026 880, barmer bonus 720,
 *   barmer bonusprogramm code 590, bonus barmer 480,
 *   barmer bonusprogramm maßnahmen 390, barmer bonusprogramm 2025 formular 320,
 *   barmer bonusprogramm rückwirkend 320, barmer bonusprogramm 2026 formular 260,
 *   barmer bonusprogramm stempelkarte 2026 260, barmer bonusprogramm ohne app 170,
 *   barmer bonus auszahlung 110, barmer zahnreinigung bonusprogramm 110,
 *   barmer schwangerschaft bonus 90, barmer zuschuss brille bonusprogramm 90,
 *   barmer baby bonus 70.
 *
 * Bewusste Festlegungen, alle aus der Belegkette abgeleitet:
 *   - Programmseite und Aktivitätenkatalog der BARMER sind laut Belegkette
 *     nicht Teil der freigegebenen Produktionsbelegkette. Deshalb stehen hier
 *     nur Satzungswerte. Codes, Stempelkarte, App, Formular zum Ausdrucken und
 *     Bearbeitungszeit beschreibt der Text nicht inhaltlich, sondern verweist
 *     dafür auf die Bonusseite der BARMER (URL aus der Belegkette).
 *   - Nicht übernommen aus der Programmseite: Punkteübertrag über zwei Jahre
 *     (barmer.k2), der Werbesatz "bis zu 200 Euro im Jahr" als persönlicher
 *     Wert, die Regel zur Grundimmunisierung aus dem Aktivitätenkatalog.
 *     Die 200 EUR stehen nur als Satzungshöchstwert des Zuschusses
 *     (1.000 Punkte mal Faktor 2).
 *   - Kinder-Früherkennung mit 150 Punkten nach Satzung (Web-Katalog nennt
 *     für zwei Untersuchungen 100, per Normhierarchie zugunsten der Satzung
 *     aufgelöst, barmer.w1). Wortlaut "bis zum 17. Lebensjahr" übernommen.
 *   - Geldbonus über 1.000 Punkte: Die Satzung deckelt ausdrücklich nur den
 *     Zuschuss, die Tabelle in Teil 1 endet bei 1.000 Punkten. Der Text sagt
 *     deshalb "mehr sieht die Satzung nicht vor" und rät, mit höchstens
 *     1.000 Punkten zu planen.
 *   - Treuebonus: Der Text empfiehlt 500 Punkte in jedem der drei Jahre
 *     (strenge Lesart barmer.k6), ohne die Auslegungsfrage auszubreiten.
 *   - Erfolgsbonus: Ob 100 EUR (§ 38 Abs. 10) und Zuschuss (§ 38 Abs. 11) im
 *     selben Jahr nebeneinander gehen, regelt die Satzung nicht ausdrücklich;
 *     der Text addiert sie deshalb nie. Grenzwerte der Gesundheitswerte aus
 *     der Anlage zu § 38 stehen nicht in der Belegkette und fehlen.
 *   - § 39 nennt keine Antragsfrist; der Text erfindet keine.
 *   - Rückwirkend: Für 2025 nennt der Text kein Fristdatum, weil die
 *     Belegkette nur die Fassung für das Programmjahr 2026 abbildet.
 *   - Zusatzbeitrag, Steuerfragen und Auszahlungsdauer stehen nicht in der
 *     Belegkette und sind deshalb weggelassen.
 *
 * Gegenprüfung 05.10.2026 gegen die Belegkette: alle Punktwerte, Umrechnungen,
 * Fristen und Caps bestätigt. Korrigiert: Zahnversiegelung nicht mehr als
 * "Zuschuss" (Belegkette nennt nur den Betrag), Wahltarife als Tarife mit
 * Bindungsfristen statt "Verträge mit Mindestbindung", Verfall vor Ende der
 * Versicherung statt "Mitgliedschaft" (gilt auch für Familienversicherte),
 * "schriftliche" Bestätigung gestrichen (§ 37 Abs. 2 sagt nur Bestätigung),
 * Screenshot als allgemeine Nachweisalternative, "wie du die Codes
 * einträgst" gestrichen (nicht belegt), Erfolgsbonus-Beispiel auf 2025/2026
 * umgestellt, Logikfehler "davon nur der Zuschuss aus § 37" behoben,
 * Kombinationsbeispiel um den halben Geldwert der Restpunkte ergänzt,
 * Budgetsatz auf die Vorlagenformulierung zurückgeführt.
 */

export const article = {
  slug: 'barmer-bonusprogramm-2026',
  kind: 'ratgeber',

  metaTitle: 'BARMER Bonusprogramm 2026: Punkte, Maßnahmen, Frist | Healio',
  metaDescription:
    'BARMER Bonus 2026 laut Satzung: Punkte je Maßnahme, je nach Aktivität bis zu 100 EUR Geld oder 200 EUR Zuschuss, auch für die Zusatzversicherung, Fristen.',

  publishedAt: '2026-10-05',
  publishedAtLabel: '5. Oktober 2026',
  updatedAt: '2026-10-05',
  updatedAtLabel: '5. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'BARMER Bonusprogramm 2026: Maßnahmen, Punkte, Nachweise und Fristen',
  listTeaser:
    'Was die BARMER laut Satzung je Maßnahme an Punkten gibt, wie der doppelte Zuschuss funktioniert und wie er den Beitrag einer Zusatzversicherung mitfinanzieren kann.',

  headline:
    'BARMER Bonusprogramm 2026: alle Maßnahmen, Punkte und wie der Zuschuss eine Zusatzversicherung mitfinanzieren kann',
  lead:
    'Bei der BARMER sammelst du 2026 Bonuspunkte für Vorsorge, Impfungen, Zahnkontrollen und Sport. 10 Punkte entsprechen 1 EUR Geldbonus. Wählst du statt Geld den zweckgebundenen Zuschuss, bekommst du laut Satzung das Doppelte, höchstens 200 EUR im Jahr. Weil die private Krankenzusatzversicherung ausdrücklich im Zuschusskatalog steht, kann der Bonus den Beitrag dafür mitfinanzieren; wie viel zusammenkommt, hängt von deinen Maßnahmen und deinen nachgewiesenen Kosten ab.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: '10 Punkte sind 1 EUR Geldbonus.',
              text: 'Früherkennung, Impfungen und Zahnkontrollen bringen je 100 Punkte, Kinder und Jugendliche bekommen für Früherkennung 150 Punkte. Sport, Kurse und Challenges zählen je 150 Punkte.',
            },
            {
              lead: 'Zuschuss statt Geld bringt das Doppelte,',
              text: 'also 20 EUR statt 10 EUR je 100 Punkte. Den Zuschuss gibt es nur gegen Nachweis deiner Kosten und nie über diese Kosten hinaus.',
            },
            {
              lead: 'Bei 1.000 Punkten endet die Rechnung.',
              text: 'Das sind 100 EUR Geldbonus oder 200 EUR Zuschuss im Jahr, mehr sieht die Satzung für das Bonusprogramm nicht vor. Wie viel du erreichst, hängt von deinen Maßnahmen ab.',
            },
            {
              lead: 'Die Zusatzversicherung steht im Katalog.',
              text: 'Private Kranken- und Pflegezusatzversicherungen gehören laut Anlage zu § 37 zu den zuschussfähigen Aufwendungen, ebenso etwa Osteopathie, Sehhilfen und der Beitrag fürs Fitnessstudio.',
            },
            {
              lead: 'Antrag für 2026 bis 31.12.2027,',
              text: 'für den Erfolgsbonus bis 31.03.2027. Endet deine Versicherung bei der BARMER, verfallen alle Ansprüche.',
            },
          ],
        },
      ],
    },
    {
      id: 'funktionsweise',
      heading: 'Wie funktioniert das BARMER Bonusprogramm 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Grundlage ist § 37 der Satzung. Du sammelst im Kalenderjahr 2026 Punkte für Vorsorge, Schutzimpfungen, Zahnvorsorge und sportliche Aktivitäten. Anmelden musst du dich dafür nicht, den Anspruch hast du als Versicherte oder Versicherter der BARMER direkt aus der Satzung. Ausgezahlt wird aber nur auf Antrag.',
        },
        {
          type: 'paragraph',
          text: 'Am Ende rechnet die BARMER deine Punkte in Euro um. Die Tabelle dafür steht in Teil 1 der Anlage zu § 37:',
        },
        {
          type: 'table',
          caption: 'Umrechnung der Bonuspunkte laut Anlage zu § 37 Teil 1',
          head: ['Bonuspunkte', 'Geldbonus', 'Zuschuss (doppelt)'],
          rows: [
            ['50', '5 EUR', '10 EUR'],
            ['100', '10 EUR', '20 EUR'],
            ['500', '50 EUR', '100 EUR'],
            ['1.000', '100 EUR', '200 EUR'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Neben diesem Punkteprogramm kennt die Satzung drei weitere Boni mit eigenen Regeln: den Erfolgsbonus nach § 38 ab 15 Jahren, den Erfolgsbonus für Kinder von 6 bis 14 Jahren nach § 38a und den Bonus für betriebliche Gesundheitsförderung nach § 39. Mehr dazu weiter unten.',
        },
      ],
    },
    {
      id: 'massnahmen',
      heading: 'Welche Maßnahmen zählen beim BARMER Bonusprogramm und was bringen sie?',
      blocks: [
        {
          type: 'table',
          caption: 'Bonusmaßnahmen der BARMER 2026 laut Anlage zu § 37 Teil 2 und 3',
          head: ['Maßnahme', 'Punkte', 'Geldbonus', 'Zuschuss'],
          rows: [
            ['Früherkennung nach §§ 25, 25a, 26 SGB V, etwa Check-up oder Krebsfrüherkennung', '100 je Leistung', '10 EUR', '20 EUR'],
            ['Früherkennung und zusätzliche Kinder- und Jugenduntersuchungen U1 bis J2, für Kinder und Jugendliche bis zum 17. Lebensjahr', '150 je Leistung', '15 EUR', '30 EUR'],
            ['Schutzimpfung nach § 20i SGB V', '100 je Leistung', '10 EUR', '20 EUR'],
            ['Zahnvorsorge, bis zu zweimal im Jahr', '100 je Kontrolle', '10 EUR', '20 EUR'],
            ['Professionelle Zahnreinigung, einmal im Jahr', '100', '10 EUR', '20 EUR'],
            ['Vollständige Schwangerschafts- und Mutterschaftsvorsorge', '100', '10 EUR', '20 EUR'],
            ['Sportverein unter dem Dach des DOSB, qualitätsgesichertes Sport- oder Fitnessstudio, Hochschul- oder Betriebssport', '150 je Maßnahme', '15 EUR', '30 EUR'],
            ['Sportabzeichen oder anderer sportlicher Leistungsnachweis, Sportveranstaltung unter fachlicher Anleitung, mehrtägige qualitätsgesicherte Sport- und Gesundheitschallenge', '150 je Maßnahme', '15 EUR', '30 EUR'],
            ['Präventionskurs nach § 20 Abs. 5 SGB V, etwa Bewegung, Entspannung, Ernährung, Raucher- oder Suchtentwöhnung, auch online, höchstens zwei im Jahr', '150 je Kurs', '15 EUR', '30 EUR'],
            ['Vier Wochen mit je 50.000 Schritten oder je 40 Kilometern Radfahren pro Woche, über eine qualitätsgesicherte Gesundheitsapp', '150 je Challenge', '15 EUR', '30 EUR'],
            ['Rückbildungsgymnastik, Babyschwimmkurs oder Schwimmkurs für Kinder ab 3 Jahren, Eltern-Baby- oder Eltern-Kind-Kurs', '150 je Maßnahme', '15 EUR', '30 EUR'],
            ['Treuebonus: drei Kalenderjahre in Folge mindestens 500 Bonuspunkte', '500 zusätzlich', '50 EUR', '100 EUR'],
          ],
          note: 'Den Zuschuss zahlt die BARMER höchstens bis zur Höhe der Kosten, die du nachweist.',
        },
        {
          type: 'paragraph',
          text: 'Jede sportliche Maßnahme zählt einmal im Jahr, Präventionskurse höchstens zweimal, die Zahnvorsorge zweimal und die professionelle Zahnreinigung einmal. Für Früherkennung und Schutzimpfungen gibt die Satzung die Punkte je Leistung und nennt keine eigene Höchstzahl. Insgesamt endet die Rechnung aber bei 1.000 Punkten im Jahr.',
        },
        {
          type: 'paragraph',
          text: 'Beim Treuebonus schreibt dir die BARMER weitere 500 Punkte gut, wenn du in drei aufeinanderfolgenden Kalenderjahren mindestens 500 Punkte erreichst. Plane dafür am besten in jedem der drei Jahre mindestens 500 Punkte ein. Weil die Rechnung bei 1.000 Punkten endet, hilft der Treuebonus vor allem dann, wenn du sonst darunter bleibst.',
        },
      ],
    },
    {
      id: 'nachweis',
      heading: 'Codes, Stempelkarte oder App: Wie weise ich die Maßnahmen bei der BARMER nach?',
      blocks: [
        {
          type: 'segments',
          segments: [
            { text: 'Viele suchen nach den Codes, einer Stempelkarte oder einem Formular zum Ausdrucken. Die Codes gehören zum Aktivitätenkatalog der BARMER. Wofür sie stehen und welche Antragswege es gibt, erklärt die Kasse auf ihrer ' },
            { text: 'Bonusseite', href: 'https://www.barmer.de/unsere-leistungen/leistungen-a-z/barmer-bonus' },
            { text: '. Für Punkte und Beträge ist die Satzung maßgeblich, und in § 37 Abs. 2 legt sie fest, was als Nachweis zählt:' },
          ],
        },
        {
          type: 'list',
          items: [
            {
              lead: 'Bestätigung der Praxis oder des Anbieters.',
              text: 'Arztpraxis, Zahnarztpraxis, Sportverein, Studio oder Kursanbieter bestätigen dir die Maßnahme.',
            },
            {
              lead: 'Screenshot aus der Gesundheitsapp.',
              text: 'Die Satzung lässt auch einen Screenshot aus der jeweiligen Gesundheitsapp als Nachweis zu, etwa für die Schritt- oder die Radchallenge.',
            },
            {
              lead: 'Rechnung oder Beitragsnachweis für den Zuschuss.',
              text: 'Wer den Zuschuss wählt, legt zusätzlich die Rechnung bei. Bei einer Zusatzversicherung genügt der Abschluss des Versicherungsvertrages oder die bezahlte Beitragsrechnung.',
            },
          ],
        },
        {
          type: 'paragraph',
          text: 'Für den Nachweis brauchst du nach der Satzung also keine App, die Bestätigung der Praxis oder des Anbieters reicht. Eine Gesundheitsapp brauchst du nur für die beiden Challenges, weil Schritte und Kilometer dort über die App erfasst werden. Teilnehmen kann laut § 37 jede und jeder Versicherte der BARMER, auch familienversicherte Kinder.',
        },
      ],
    },
    {
      id: 'zusatzversicherung',
      heading: 'Geld oder Zuschuss: Kann der BARMER Bonus meine Zusatzversicherung mitfinanzieren?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja. Nach § 37 Abs. 3 kannst du "alternativ zum Geldbonus einen Zuschuss" zu den Kosten einer Leistung oder Aufwendung aus dem Katalog in Teil 4 der Anlage bekommen. Der Zuschuss ist doppelt so hoch wie der Geldbonus. Je Kalenderjahr gibt es ihn bis zum Erreichen von 1.000 Bonuspunkten, also höchstens 200 EUR, und nie mehr als die Kosten, die du nachweist.',
        },
        {
          type: 'table',
          caption: 'Zuschussfähige Aufwendungen laut Anlage zu § 37 Teil 4',
          head: ['Bereich', 'Aufwendungen'],
          rows: [
            ['Behandlungen, Untersuchungen, Sehhilfen und Heilmittel', 'Osteopathie, Akupunktur, professionelle Zahnreinigung, Krebsfrüherkennungsleistungen, Sehhilfen, großes Blutbild, Bestimmung von Vitamin B12 und D, sportmedizinische Untersuchung, kinesiologisches Taping, erweiterte zahnmedizinische Leistungen, anthroposophische Heilmittel'],
            ['Sport und Gesundheit im Alltag, soweit nicht anderweitig übernommen', 'Mitgliedsbeiträge für Sportverein und Fitnessstudio, Geräte zur Messung des Fitness- und Gesundheitsstatus, Sport- und Fitnessausrüstung, Sport- und Gesundheitsapps, Home-Testkits zur Gesundheitskontrolle'],
            ['Versicherungen, soweit nicht anderweitig übernommen', 'private Krankenzusatzversicherung nach § 194 Abs. 1a SGB V, private Pflegezusatzversicherung nach § 47 Abs. 2 SGB XI'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Für die Zusatzversicherung heißt das: Du wählst im Antrag den Zuschuss und reichst als Nachweis den Versicherungsvertrag oder die bezahlte Beitragsrechnung ein. Laut § 37 Abs. 4 darfst du Geld und Zuschuss im selben Jahr auch kombinieren, jeder Punkt wird dabei nur einmal eingelöst. Ein Beispiel: Mit 800 Punkten wären rechnerisch 160 EUR Zuschuss drin. Kostet dein Tarif 120 EUR im Jahr, bekommst du dafür 120 EUR, dafür reichen 600 Punkte. Die übrigen 200 Punkte bringen dir als Zuschuss zu weiteren Kosten aus dem Katalog bis zu 40 EUR oder als Geld 20 EUR.',
        },
        {
          type: 'paragraph',
          text: 'Der Zuschuss aus dem Erfolgsbonus nach § 38 Abs. 11 gilt dagegen nicht für Versicherungen, sondern nur für professionelle Zahnreinigung, Osteopathie, Akupunktur und sportmedizinische Untersuchung. Dieselbe Rechnung darf nicht in beiden Programmen erstattet werden.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Bevor du den Antrag stellst und dich zwischen Geld und Zuschuss entscheidest, lohnt der Blick auf den Beitrag, in den der Zuschuss fließen soll. Dafür haben wir bei Healio ein Angebot zusammengestellt: Wählst du den Zuschuss, kann er den Jahresbeitrag einer Zusatzversicherung ganz oder teilweise tragen, ob ',
            },
            { text: 'ambulant für Heilpraktiker, Osteopathie, Brille und Vorsorge', to: '/ambulant' },
            { text: ', ' },
            { text: 'für die Zähne', to: '/zahn' },
            { text: ' oder ' },
            { text: 'fürs Krankenhaus', to: '/stationaer' },
            { text: '. Der ambulante Tarif selbst bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Zuschuss hilft beim Beitrag. Wie viel dein Bonus beiträgt, hängt von deiner Kasse, deinen Maßnahmen und deinen eigenen Kosten ab; das rechnest du auf der jeweiligen Seite individuell durch.' },
          ],
        },
      ],
    },
    {
      id: 'realistisch',
      heading: 'Wie viel BARMER Bonus ist 2026 realistisch drin?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Durchgerechnet mit den Punktwerten der Satzung, jeweils für eine erwachsene Versicherte ohne Treuebonus:',
        },
        {
          type: 'table',
          caption: 'Durchgerechnete Bonusszenarien BARMER 2026',
          head: ['Szenario', 'Punkte', 'Geldbonus', 'Zuschuss'],
          rows: [
            ['Vorsorge-Einstieg: Check-up, zwei Zahnkontrollen, eine Schutzimpfung', '400', '40 EUR', 'bis zu 80 EUR'],
            ['Aktiv: dazu professionelle Zahnreinigung, Fitnessstudio und Sportverein', '800', '80 EUR', 'bis zu 160 EUR'],
            ['Sehr aktiv: dazu ein Präventionskurs und die Schrittchallenge', '1.100, die Rechnung endet bei 1.000', '100 EUR', 'bis zu 200 EUR'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Die Umrechnungstabelle der Satzung endet bei 1.000 Punkten, für den Zuschuss ist diese Grenze je Kalenderjahr ausdrücklich festgelegt. Plane deshalb mit höchstens 100 EUR Geldbonus oder 200 EUR Zuschuss aus dem Punkteprogramm. Beim Zuschuss zählt zusätzlich, wie hoch die Kosten aus dem Katalog sind, die du nachweist.',
        },
        {
          type: 'paragraph',
          text: 'Der Erfolgsbonus nach § 38, der Kinder-Erfolgsbonus nach § 38a und der Bonus für betriebliche Gesundheitsförderung nach § 39 sind eigene Ansprüche und können hinzukommen. Einen Zuschuss zum Beitrag deiner Zusatzversicherung gibt es aber nur aus dem Punkteprogramm nach § 37. Wie viel du tatsächlich bekommst, hängt von deinen Maßnahmen ab. Die Beträge gelten nur für die BARMER, andere Kassen haben eigene Programme mit eigenen Beträgen und Regeln.',
        },
      ],
    },
    {
      id: 'erfolgsbonus',
      heading: 'Was ist der BARMER Erfolgsbonus und wer bekommt ihn?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Den Erfolgsbonus nach § 38 können Versicherte ab dem vollendeten 15. Lebensjahr bekommen. Er belohnt nicht einzelne Termine, sondern Erfolge bei fünf Faktoren:',
        },
        {
          type: 'list',
          items: [
            'regelmäßige qualitätsgesicherte sportliche Betätigung, sie muss immer dabei sein',
            'Gesundheitswerte im Normbereich laut Anlage zu § 38, also Blutdruck, Blutzucker und BMI oder Taille-Hüfte-Verhältnis',
            'ein nachgewiesener Versorgungsstatus',
            'Nichtraucherstatus',
            'vollständige verhaltensbezogene Prävention',
          ],
        },
        {
          type: 'paragraph',
          text: 'Weist du Sport und einen weiteren Faktor nach, bekommst du insgesamt 100 EUR für das Kalenderjahr. Danach gibt es ihn frühestens für das übernächste Kalenderjahr wieder. Wer ihn für 2025 bekommen hat, kann ihn also für 2026 nicht beantragen, sondern erst wieder für 2027. Bei vier Faktoren, darunter der Sport, gibt es einen Zuschuss von höchstens 300 EUR für zwei Kalenderjahre, und zwar nur für professionelle Zahnreinigung, Osteopathie, Akupunktur oder sportmedizinische Untersuchung.',
        },
        {
          type: 'paragraph',
          text: 'Für Kinder von 6 bis 14 Jahren gibt es nach § 38a 60 EUR im Kalenderjahr, wenn sie regelmäßig qualitätsgesichert Sport treiben und eine vollständige verhaltensbezogene Prävention nach § 20 Abs. 5 SGB V nachweisen. Für beide Erfolgsboni gilt eine kürzere Frist: Der Antrag für 2026 muss bis zum 31.03.2027 gestellt sein.',
        },
      ],
    },
    {
      id: 'weitere-leistungen',
      heading: 'Welche weiteren Boni und Leistungen gibt es bei der BARMER?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hat dein Arbeitgeber mit der BARMER einen Vertrag über betriebliche Gesundheitsförderung geschlossen, gibt es nach § 39 einen eigenen Bonus. Voraussetzung sind mindestens zwei Maßnahmen einer Kategorie. Sensibilisierungsmaßnahmen bringen 25 EUR, verhaltensorientierte Maßnahmen 50 EUR, verhältnisorientierte oder multimodale Maßnahmen 75 EUR, zusammen höchstens 100 EUR. Eine eigene Antragsfrist nennt § 39 nicht, frag deshalb im Lauf des Jahres bei deinem Arbeitgeber oder der BARMER nach.',
        },
        {
          type: 'paragraph',
          text: 'Außerhalb des Bonusprogramms stehen in der Satzung weitere Leistungen mit eigenen Voraussetzungen, etwa Barmer Familie Plus mit 200 EUR je Schwangerschaft nach §§ 28a und 28d, eine Leistung zur Zahnversiegelung bei kieferorthopädischer Behandlung von einmalig höchstens 50 EUR und ein Haut-Check für Versicherte unter 35 Jahren. Diese Leistungen fließen nicht in die Bonuspunkte ein.',
        },
        {
          type: 'paragraph',
          text: 'Auch die Wahltarife der BARMER, etwa Selbstbehalt- oder Prämientarife, gehören nicht zum Bonus. Das sind eigene Tarife mit Bindungsfristen. Bei Tarifen nach § 23 der Satzung beträgt die Bindung drei Jahre, und die Kasse kannst du erst zum Ende dieser Frist kündigen.',
        },
      ],
    },
    {
      id: 'fristen',
      heading: 'Bis wann muss ich den BARMER Bonus 2026 einreichen?',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: '01.01. bis 31.12.2026.',
              text: 'In diesem Kalenderjahr müssen deine Maßnahmen stattfinden, die BARMER rechnet den Bonus je Kalenderjahr.',
            },
            {
              lead: 'Keine Anmeldung nötig.',
              text: 'Jede bonusfähige Maßnahme aus 2026 zählt, auch wenn du erst später vom Bonus erfährst. Gezahlt wird aber nur auf Antrag.',
            },
            {
              lead: '31.12.2027.',
              text: 'Bis spätestens zu diesem Tag muss dein Antrag für das Bonusprogramm 2026 nach § 37 bei der BARMER sein, für Geldbonus wie für Zuschuss.',
            },
            {
              lead: '31.03.2027.',
              text: 'Bis dahin läuft die Frist für den Erfolgsbonus nach § 38 und den Erfolgsbonus für Kinder nach § 38a.',
            },
            {
              lead: 'Vor einem Kassenwechsel einreichen.',
              text: 'Mit dem Ende der Versicherung bei der BARMER verfallen laut § 37 Abs. 6 sämtliche Ansprüche. Stell den Antrag deshalb, bevor deine Versicherung bei der BARMER endet.',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio verbindet Kassenbonusprogramme mit Zusatzversicherungen: Der ambulante Tarif bietet ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren, der Kassenbonus kann je nach Kasse beim Beitrag helfen. Bei der BARMER kann der zweckgebundene Zuschuss aus dem Bonusprogramm, laut Satzung höchstens 200 EUR im Jahr, in den Beitrag einer privaten Krankenzusatzversicherung fließen; je nach nachgewiesenen Maßnahmen und eigenen Kosten trägt er den Beitrag ganz oder teilweise, mehr als die nachgewiesenen Kosten zahlt die BARMER nie. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Wo bekomme ich die Codes für das BARMER Bonusprogramm?',
      answer:
        'Die Codes gehören zum Aktivitätenkatalog der BARMER. Wofür sie stehen und welche Antragswege es gibt, erklärt die Kasse auf ihrer Bonusseite. Maßgeblich für Punkte, Beträge und Nachweise ist die Satzung: Als Nachweis zählt dort die Bestätigung der Praxis oder des Anbieters oder ein Screenshot aus der Gesundheitsapp.',
    },
    {
      question: 'Geht das BARMER Bonusprogramm auch ohne App?',
      answer:
        'Für den Nachweis brauchst du laut Satzung keine App, die Bestätigung der Praxis, des Vereins oder des Kursanbieters reicht. Nur die Schritt- und die Radchallenge setzen eine qualitätsgesicherte Gesundheitsapp voraus. Welche Antragswege es gibt, erklärt die BARMER auf ihrer Bonusseite.',
    },
    {
      question: 'Wie viel Geld gibt es beim BARMER Bonusprogramm 2026?',
      answer:
        '10 Punkte entsprechen 1 EUR. Die Umrechnung endet bei 1.000 Punkten, das sind 100 EUR Geldbonus oder 200 EUR Zuschuss. Dazu können der Erfolgsbonus mit 100 EUR und bei einem Arbeitgeber mit Vertrag zur Gesundheitsförderung bis zu 100 EUR kommen. Wie viel es bei dir wird, hängt von deinen Maßnahmen ab.',
    },
    {
      question: 'Kann ich den BARMER Bonus rückwirkend beantragen?',
      answer:
        'Für 2026 ja, in einem festen Rahmen: Du musst dich nicht vorab anmelden, jede bonusfähige Maßnahme aus 2026 zählt, und den Antrag kannst du bis zum 31.12.2027 stellen. Maßnahmen aus 2025 zählen nicht für 2026, sie gehören in den Antrag für das Bonusjahr 2025. Bis wann das noch geht, klärst du am besten direkt mit der BARMER.',
    },
    {
      question: 'Zahlt die BARMER einen Zuschuss zur Zusatzversicherung?',
      answer:
        'Ja. Private Kranken- und Pflegezusatzversicherungen stehen im Zuschusskatalog der Satzung. Der Zuschuss ist doppelt so hoch wie der Geldbonus, höchstens 200 EUR im Jahr, und nie höher als der Beitrag, den du mit Vertrag oder bezahlter Beitragsrechnung nachweist. Wie viel du bekommst, hängt von deinen Maßnahmen ab.',
    },
    {
      question: 'Zählt die professionelle Zahnreinigung beim BARMER Bonus?',
      answer:
        'Ja, einmal im Jahr mit 100 Punkten. Außerdem kannst du die Rechnung für eine professionelle Zahnreinigung als Kosten für den Zuschuss einreichen, dieselbe Rechnung aber nicht zusätzlich beim Zuschuss aus dem Erfolgsbonus.',
    },
    {
      question: 'Gibt es bei der BARMER einen Bonus in der Schwangerschaft?',
      answer:
        'Die vollständige Schwangerschafts- und Mutterschaftsvorsorge bringt 100 Punkte, Rückbildungsgymnastik, Babyschwimmkurs und Eltern-Baby-Kurs je 150 Punkte. Außerhalb des Bonusprogramms nennt die Satzung Barmer Familie Plus mit 200 EUR je Schwangerschaft, mit eigenen Voraussetzungen.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      {
        text: 'Ob sich der Zuschuss für dich rechnet, hängt an deinen Maßnahmen und an den Kosten, die du nachweisen kannst. Auf ',
      },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' vergleichst du Bonusprogramme quellenbelegt anhand der Satzungen, auf ',
      },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' rechnest du durch, wie viel Beitrag nach dem individuell anrechenbaren Bonus selbst zu tragen bleibt.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach der Satzung der BARMER, Stand 21.07.2026 in der Fassung des 38. Nachtrages, vor allem §§ 37, 38, 38a und 39 samt Anlagen, zum Bonusjahr 2026. Maßgeblich sind immer die Originaldokumente der Kasse.',
};

export default article;
