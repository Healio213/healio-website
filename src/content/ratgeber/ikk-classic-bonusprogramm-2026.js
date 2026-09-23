/**
 * Ratgeberartikel 2 und zugleich die IKK-Bonus-Landingpage fuer die
 * Google-Anzeigengruppe G1-A.
 *
 * Quelle: Healio/Ratgeber/artikel-ratgeber-02-ikk-bonusprogramm-2026.md,
 * Stand 21.09.2026. Die Abschnitte "Belege" und "Offen" der Markdown-Quelle
 * kommen bewusst NICHT auf die Seite.
 *
 * Abweichungen von der Quelle, alle bewusst:
 *   - Anrede durchgehend klein (du, dir, dein), die Quelle schreibt Du gross.
 *   - Zuschussleistung Nr. 67 steht neutral als "Zyklus-App samt Zubehoer".
 *     Der Kinderwunsch ist als Argument im Healio-Content gesperrt. Die
 *     Zweckbindung der Satzung bleibt bestehen und wird hier nur nicht
 *     ausformuliert; in der Spalte "Besonderheit" steht deshalb der Hinweis
 *     auf den Anwendungsfall, den die Satzung nennt.
 *   - Der "Geheimtipp fuer Schwangere" ist ein eigener H2-Abschnitt, weil
 *     die Artikelvorlage nur H2 kennt.
 *
 * Zahlenregel (Frank, 21.09.2026): "bis zu 1.155 EUR laut Satzung" ist ein
 * theoretischer Hoechstwert, "400 bis 700 EUR in der breiten Masse" eine
 * gekennzeichnete Einschaetzung. Keine persoenliche Bonuszahl.
 */

export const article = {
  slug: 'ikk-classic-bonusprogramm-2026',
  kind: 'ratgeber',

  metaTitle: 'IKK classic Bonusprogramm 2026: alle Positionen | Healio',
  metaDescription:
    'IKK classic Bonus 2026: alle Positionen mit Beträgen, Nachweisen und Fristen, plus die Rechnung, wie der dreifache Zuschuss den Beitrag senkt.',

  publishedAt: '2026-09-22',
  publishedAtLabel: '22. September 2026',
  readingTimeMinutes: 7,

  listTitle: 'IKK classic Bonusprogramm 2026: alle Positionen, Nachweise und Fristen',
  listTeaser:
    'Jede bonusfähige Position mit Betrag, die Regeln für den dreifachen Zuschuss und die Gegenrechnung mit dem Zusatzbeitrag.',

  headline:
    'IKK classic Bonusprogramm 2026: alle Positionen, Nachweise und wie der Bonus den Beitrag einer Zusatzversicherung senken kann',
  lead:
    'Die IKK classic zahlt für Vorsorge, Impfungen und Sport einen Geldbonus schon ab der ersten anerkannten Maßnahme, und wer stattdessen den zweckgebundenen Zuschuss wählt, bekommt den dreifachen Betrag, höchstens aber die selbst nachgewiesenen Kosten. Weil der Jahresbeitrag einer privaten Krankenzusatzversicherung ausdrücklich zu den zuschussfähigen Leistungen gehört, kann der Bonus diesen Beitrag je nach nachgewiesenen Maßnahmen und eigenen Kosten ganz oder teilweise tragen. Ausgezahlt wird nie mehr, als du selbst bezahlt hast.',

  sections: [
    {
      id: 'kurz-gesagt',
      heading: 'Kurz gesagt',
      blocks: [
        {
          type: 'list',
          items: [
            {
              lead: 'Bonus ab der ersten Maßnahme.',
              text: 'Vorsorge und Zahnkontrollen bringen 5 bis 10 EUR je Position, Kurse, Studio, Verein und Statuswerte je 25 EUR.',
            },
            {
              lead: 'Zuschuss statt Geld bringt das Dreifache,',
              text: 'aber nur, wenn du im selben Kalenderjahr mindestens eine der Leistungen Nr. 60 bis 67 selbst bezahlt hast. Nr. 63 ist der Jahresbeitrag für Krankenzusatz-, Pflegezusatz- und Auslandsreisekrankenversicherung.',
            },
            {
              lead: 'Gedeckelt auf deine echten Kosten.',
              text: 'Ein rechnerischer Zuschuss von 405 EUR bei 240 EUR Jahresbeitrag ergibt 240 EUR. Ein Plus entsteht nie.',
            },
            {
              lead: 'Laut Satzung sind bis zu 1.155 EUR Zuschusswert im Jahr möglich, ein theoretischer Wert.',
              text: 'Nach unserer Einschätzung aus der Beratung, ausdrücklich keine Belegzahl, kommen in der breiten Masse 400 bis 700 EUR zusammen; belegt durchgerechnet sind 105, 405 und 810 EUR. Wer als Modellfall wirklich jede für ihn geltende Vorsorge in einem Jahr mitnimmt und dazu vier Aktivitäten plus zwei Abzeichen nachweist, kommt auf 810 EUR. Einen Maximalbetrag nennen die Teilnahmebedingungen ausdrücklich nicht.',
            },
            {
              lead: 'Frist 31.03.2027,',
              text: 'und gegenzurechnen ist der Zusatzbeitrag von 3,85 Prozent.',
            },
          ],
        },
      ],
    },
    {
      id: 'funktionsweise',
      heading: 'Wie funktioniert das IKK classic Bonusprogramm 2026?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Du sammelst im Kalenderjahr 2026 Vorsorgeuntersuchungen, Impfungen und sportliche Aktivitäten und weist sie der IKK classic nach. Jede anerkannte Maßnahme hat einen festen Geldbetrag, eine Mindestzahl gibt es nicht: Schon die erste zählt.',
        },
        {
          type: 'paragraph',
          text: 'Beim Antrag entscheidest du dich für genau eine von zwei Auszahlungsarten, den Geldbonus aufs Konto oder den zweckgebundenen Zuschuss in dreifacher Höhe. Beides zusammen geht nicht. Jede Maßnahme muss zwischen dem 01.01.2026 und dem 31.12.2026 stattfinden, der vollständige Antrag muss bis zum 31.03.2027 vorliegen, per App, Onlinefiliale, Post oder persönlich.',
        },
      ],
    },
    {
      id: 'positionen',
      heading: 'Welche Positionen sind 2026 bonusfähig?',
      blocks: [
        {
          type: 'table',
          caption: 'Bonusfähige Positionen der IKK classic 2026',
          head: ['Bereich (Nummern)', 'Geldbonus', 'Zuschuss (3-fach)'],
          rows: [
            ['Schutzimpfung, abgeschlossene Immunisierung (01)', 'je 5 EUR', 'je 15 EUR'],
            ['Gesetzliche Vorsorge: Check-up, Krebsfrüherkennung, Darm, Haut, Mammographie, Lungenkrebs (02 bis 08, 28)', 'je 10 EUR', 'je 30 EUR'],
            ['Mutterschaftsvorsorge (09)', 'je 10 EUR', 'je 30 EUR'],
            ['Zahnvorsorge, je Halbjahr eine Kontrolle ab 6 Jahren (10, 11)', 'je 5 EUR', 'je 15 EUR'],
            ['Kindervorsorge U1 bis U11, J1, J2 (12 bis 25)', 'je 10 EUR', 'je 30 EUR'],
            ['Zahnärztliche Früherkennung Z1 bis Z6 (26)', 'je 5 EUR', 'je 15 EUR'],
            ['Amblyopie-Screening, neu 2026 (27)', 'je 10 EUR', 'je 30 EUR'],
            ['Gesundheitskurs, Studio, Sportverein, angeleiteter Gemeinschaftssport, Rückbildung (40 bis 44)', 'je 25 EUR', 'je 75 EUR'],
            ['Sportabzeichen, Leistungsabzeichen, BMI, Blutdruck (50 bis 53)', 'je 25 EUR', 'je 75 EUR'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Zwei Regeln entscheiden über die Summe. Nur die Nummern 01, 09, 26 und 27 sind mehrfach im selben Jahr nachweisbar, alle anderen zählen einmal je Teilnahmezeitraum. Und die Statuswerte sind gekoppelt: BMI, Blutdruck, Sportabzeichen und Leistungsabzeichen zählen nur, wenn du zusätzlich mindestens eine Maßnahme aus Nr. 40 bis 44 nachweist. Einen Nichtraucher-Status bonifiziert die IKK classic 2026 nicht, die Position steht weder im Infoblatt noch in § 34 der Satzung.',
        },
      ],
    },
    {
      id: 'zuschuss',
      heading: 'Wie bekomme ich den dreifachen Zuschuss?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Der Satzungswortlaut ist klar: Der Zuschuss beträgt das Dreifache der berechneten Bonuszahlung, und bei Kosten unterhalb dieses Zuschusses werden maximal die tatsächlichen Aufwendungen erstattet.',
        },
        {
          type: 'paragraph',
          text: 'Bedingung ist, dass du im Jahr 2026 selbst mindestens eine von acht abschließend aufgezählten Zuschussleistungen bezahlt hast:',
        },
        {
          type: 'table',
          caption: 'Zuschussleistungen Nr. 60 bis 67',
          head: ['Nr.', 'Zuschussleistung', 'Besonderheit'],
          rows: [
            ['60', 'Gerät zur Messung des Fitness- und Gesundheitsstatus', 'Smartphones, Laptops, PCs und Tablets ausgeschlossen'],
            ['61', 'Sportveranstaltungen, Start- und Teilnahmegebühren', 'nicht, wenn schon als Bonusmaßnahme eingetragen'],
            ['62', 'Geburtsvorbereitungskurs für IKK-versicherte Partner', 'nur bei eigener Versicherung und eigenem Antrag'],
            ['63', 'Jahresbeitrag Krankenzusatz-, Pflegezusatz- und Auslandsreisekrankenversicherung', 'Berufsunfähigkeit und Unfall ab 2026 nicht mehr zuschussfähig'],
            ['64', 'Erste-Hilfe-Kurs', ''],
            ['65', 'Baby- oder Kinderschwimmen', 'nur auf den Bonus des Kindes'],
            ['66', 'Eltern-Baby-Kurse', 'Kind oder Elternteil, nicht beides'],
            ['67', 'Zyklus-App samt Zubehör', 'nur im Anwendungsfall, den die Satzung nennt'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Nr. 63 ist der Hebel, um den es hier geht. Du kreuzt auf dem Antrag "Zuschuss" an, trägst Nummer und Gesamtkosten in das Zuschussfeld ein, nicht in die Stempelfelder, und legst die Rechnungsnachweise bei. Der Zuschuss kann nie höher sein als deine eigenen Ausgaben: Erreichst du rechnerisch 405 EUR, zahlst aber nur 240 EUR Jahresbeitrag, bekommst du 240 EUR.',
        },
      ],
    },
    {
      id: 'realistisch',
      heading: 'Wie viel Bonus ist realistisch drin?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Belegbar sind drei durchgerechnete Stufen. Die vierte Zeile ist keine Erfahrung, sondern die rechnerische Obergrenze aus der Satzung:',
        },
        {
          type: 'table',
          caption: 'Durchgerechnete Bonusszenarien',
          head: ['Szenario', 'Geldbonus', 'Zuschusswert'],
          rows: [
            ['Vorsorge-Minimum: Check-up, Krebsfrüherkennung, zwei Zahnkontrollen, eine Impfung', '35 EUR', '105 EUR'],
            ['Sportlich: dazu Studio, Verein, BMI, Blutdruck', '135 EUR', '405 EUR'],
            ['Modellfall, alle Positionen in einem Jahr, ohne Schwangerschaftsvorsorge (Frau, 50 Jahre, rauchend)', '270 EUR', '810 EUR'],
            ['Satzungs-Top-Szenario mit Schwangerschaftsvorsorge (rechnerische Obergrenze, nicht belegt)', '385 EUR', '1.155 EUR'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Das Satzungs-Top-Szenario von bis zu 1.155 EUR setzt voraus, dass wirklich jede Position zusammenkommt, einschließlich der Schwangerschaftsvorsorgen. Das erreicht kaum jemand, deshalb ist es ein theoretischer Wert. Unsere Einschätzung aus der Beratung, ausdrücklich keine Belegzahl: In der breiten Masse landen aktive Versicherte beim Zuschusswert zwischen 400 und 700 EUR im Jahr, also zwischen dem sportlichen und dem voll ausgeschöpften Szenario. Einen Maximalbetrag gibt es nicht, das sagen die Teilnahmebedingungen wörtlich.',
        },
      ],
    },
    {
      id: 'schwangerschaft',
      heading: 'Warum in der Schwangerschaft besonders viele Positionen zusammenkommen',
      blocks: [
        {
          type: 'paragraph',
          text: 'In der Schwangerschaft kommen mehr bonusfähige Positionen zusammen als sonst, weil jede Mutterschaftsvorsorge bei der IKK classic einzeln zählt. Wie viele davon anerkannt werden, nennt die IKK classic in keinem öffentlichen Dokument; der Satzungswert von 1.155 EUR bleibt deshalb auch hier ein theoretischer Rechenwert. Wer schwanger ist, ohnehin zu jeder Vorsorge geht und Zahnarzt, Impfschutz, Sport und Statuswerte mitnimmt, kommt dem Wert näher als andere.',
        },
        {
          type: 'segments',
          segments: [
            {
              text: 'Der Zuschuss fließt dann in die Zusatzversicherung, die während der Schwangerschaft am meisten bringt: den ambulanten Tarif mit Vorsorge-Topf, aus dem je nach Tarifstufe ein Teil von Feinultraschall, zusätzlichen Ultraschalls und Labortests erstattet wird, die die Kasse nicht zahlt. Nicht versichert ist die Entbindung der Mutter; das Kind kommt über die Nachversicherung in den Schutz. Was in der Schwangerschaft versichert ist und was nicht, steht im Ratgeber ',
            },
            { text: 'Schwanger: welcher Zusatzschutz jetzt noch geht', to: '/ratgeber/schwanger-zusatzversicherung' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'nachweise',
      heading: 'Welche Nachweise verlangt die IKK classic wirklich?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Es gibt zwei Klassen. Für Aktivitäten, Statuswerte, Schutzimpfungen, Mutterschaftsvorsorgen, U1 bis U9 und Z1 bis Z6 ist ein schriftlicher Nachweis Pflicht. Für alle übrigen Maßnahmen genügt in der App die Eingabe der Praxisdaten und des Datums; auf dem Papierantrag brauchst du dort Stempel und Unterschrift.',
        },
        {
          type: 'paragraph',
          text: 'Aus jedem Nachweis müssen Vor- und Nachname, die Bezeichnung der Maßnahme, der Leistungserbringer und das Datum hervorgehen. Fehlt eines davon, fehlt der Nachweis. Die IKK classic prüft die Angaben und kann bei falschen Angaben Auszahlungen zurückfordern; die Kosten für die Erstellung eines Nachweises trägt die Kasse nicht.',
        },
        {
          type: 'paragraph',
          text: 'Häufige Stolpersteine: Der Zahnarzttermin vom Dezember des Vorjahres zählt nicht, jedes Familienmitglied stellt einen eigenen Antrag mit eigenem Kostendeckel, und private Aktivitäten ohne Qualifikationsnachweis der Übungsleitung zählen nicht.',
        },
      ],
    },
    {
      id: 'zusatzbeitrag',
      heading: 'Lohnt sich die IKK classic trotz 3,85 Prozent Zusatzbeitrag?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Das muss gegengerechnet werden. Die IKK classic verlangt 3,85 Prozent Zusatzbeitrag. Der Median der 34 bundesweit geöffneten Kassen liegt bei 3,625 Prozent, günstige Kassen aus demselben amtlichen Abzug darunter, etwa die TUI BKK mit 2,50 Prozent oder die hkk mit 2,59 Prozent.',
        },
        {
          type: 'paragraph',
          text: 'Die Formel für pflichtversicherte Angestellte: beitragspflichtiges Bruttojahresentgelt, höchstens bis zur Beitragsbemessungsgrenze, mal Differenz in Prozentpunkten, geteilt durch zwei. Die Halbierung kommt daher, dass Arbeitgeber und Arbeitnehmer den Zusatzbeitrag je zur Hälfte tragen; freiwillig Versicherte und Selbstständige tragen ihn allein.',
        },
        {
          type: 'paragraph',
          text: 'Rechenbeispiel mit 3.500 EUR Monatsbrutto gegenüber der hkk: 42.000 mal 1,26 Prozent geteilt durch zwei ergibt 264,60 EUR Mehrkosten pro Jahr. Damit gilt:',
        },
        {
          type: 'list',
          items: [
            '105 EUR Zuschusswert: lohnt nicht.',
            '405 EUR: lohnt, sofern du auch 405 EUR eigene Kosten nach Nr. 60 bis 67 nachweist.',
            '810 EUR: lohnt deutlich, wieder nur bis zur Höhe der nachgewiesenen Kosten.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Wer den Geldbonus wählt, muss dieselbe Rechnung mit einem Drittel führen. Nicht eingerechnet sind Satzungsleistungen wie professionelle Zahnreinigung, Osteopathie oder homöopathische Arzneimittel.',
        },
      ],
    },
    {
      id: 'gesundheitskonto',
      heading: 'Gibt es ein IKK Gesundheitskonto?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Der Begriff kommt in Satzung, Teilnahmebedingungen und Infoblatt der IKK classic nicht vor. Wo du ihn liest, stammt er nicht aus den Originaldokumenten der Kasse.',
        },
      ],
    },
  ],

  factNugget:
    'Healio kombiniert Kassenbonusprogramme mit Zusatzversicherungen zu einem Gesundheitsbudget bis zu 3.000 EUR in zwei Jahren. Der Kassenbonus ist jährlich und fließt als zweckgebundener Zuschuss in den Zusatzschutz; je nach nachgewiesenen Maßnahmen und eigenen Kosten deckt der Zuschuss den Jahresbeitrag ganz oder teilweise, mehr als die nachgewiesenen Kosten wird nie ausgezahlt. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Bis wann muss der Bonusantrag 2026 gestellt sein?',
      answer:
        'Bis zum 31.03.2027, vollständig. Jede Maßnahme und jede Ausgabe muss ins Kalenderjahr 2026 fallen.',
    },
    {
      question: 'Kann ich Geldbonus und Zuschuss kombinieren?',
      answer:
        'Nein. Du kreuzt genau eines der beiden Felder an, die Wege werden nie addiert.',
    },
    {
      question: 'Zahlt der Bonus meine Zusatzversicherung?',
      answer:
        'Der Jahresbeitrag einer Krankenzusatz-, Pflegezusatz- oder Auslandsreisekrankenversicherung ist als Zuschussleistung Nr. 63 anrechenbar. Ausgezahlt wird höchstens der nachgewiesene Betrag.',
    },
    {
      question: 'Ist der Bonus steuerpflichtig?',
      answer:
        'Bei ausschließlich gezahltem Zuschuss meldet die IKK classic nichts an die Finanzverwaltung. Der Geldbonus wird oberhalb einer Freigrenze von 150 EUR pro Steuerjahr gemeldet.',
    },
    {
      question: 'Zählen BMI und Blutdruck allein?',
      answer:
        'Nein. Statuswerte werden nur mit mindestens einer Aktivität aus Nr. 40 bis 44 anerkannt.',
    },
  ],

  // Einziger Button dieses Artikels. Kein dreifacher Auftritt, keine feste
  // Leiste: Das ist eine indexierte Seite, kein bezahltes Advertorial.
  internalCta: {
    heading: 'Bonus in Zusatzschutz umwandeln',
    to: '/ambulant',
    label: 'Bonus und Beitrag prüfen',
    blocks: [
      {
        type: 'paragraph',
        text: 'Der Bonus wird erst dann zu echtem Schutz, wenn er auf einen Beitrag trifft. Genau dafür ist Zuschussleistung Nr. 63 gedacht: Der Jahresbeitrag einer Krankenzusatzversicherung ist anrechenbar, der Zuschuss läuft in dreifacher Höhe, gedeckelt auf das, was du wirklich gezahlt hast.',
      },
      {
        type: 'paragraph',
        text: 'Auf der Tarifseite siehst du, welches Leistungsbudget je Tarifstufe zusammenkommt und wie viel Beitrag nach Anrechnung eines individuell erreichbaren Bonus übrig bleibt. Bis zu 3.000 EUR Gesundheitsbudget in zwei Jahren sind darüber erreichbar. Der Bonus bleibt eine Entscheidung deiner Krankenkasse, der Tarif eine Entscheidung des Versicherers, beides wird getrennt geprüft.',
      },
    ],
  },

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      {
        text: 'Ob sich der Wechsel oder der Verbleib bei der IKK classic für dich rechnet, hängt an deinem Brutto, deinen Maßnahmen und deinen tatsächlichen Kosten. Auf ',
      },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      {
        text: ' vergleichst du Bonusprogramme quellenbelegt anhand der Satzungen, auf ',
      },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      {
        text: ' rechnest du durch, wie viel Beitrag nach dem individuell anrechenbaren Bonus selbst zu tragen bleibt, und wenn du schwanger bist, lohnt vorher der ',
      },
      { text: 'Ratgeber zum Zusatzschutz in der Schwangerschaft', to: '/ratgeber/schwanger-zusatzversicherung' },
      { text: '.' },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach Satzung, Teilnahmebedingungen und Infoblatt der IKK classic zum Bonusjahr 2026, maßgeblich sind immer die Originaldokumente der Kasse.',
};

export default article;
