/**
 * Inhalt der Seite /zahn/behandlung-steht-an. Alle Texte wortgleich aus
 * Healio/Zahn-Mikroseiten/SEITENPLAN-BEHANDLUNG-STEHT-AN.md (Abschnitt 3 und 4).
 * Reine Daten, kein JSX: Die Datei wird auch von Node-Skripten geladen.
 */

const inhalt = {
  slug: 'behandlung-steht-an',

  seo: {
    title: 'Zahnzusatzversicherung sofort: Zuschuss berechnen | Healio',
    description: 'Heil- und Kostenplan schon da? Rechne aus, was ZAHN Sofort der Bayerischen zahlt: bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR.',
    ogImageAlt: 'Healio: Sofortschutz bei angeratener Zahnbehandlung nachrechnen',
  },

  hero: {
    brotkrume: 'Behandlung steht an',
    eyebrow: 'Sofortschutz der Bayerischen',
    h1: 'Behandlung schon angeraten? Mit Sofortschutz zahlt der Versicherer bis zu 1.500 EUR mit.',
    unterzeile: 'Ein normaler Zahntarif zahlt nichts, was dein Zahnarzt schon angeraten oder begonnen hat. Der Baustein ZAHN Sofort der Bayerischen ist genau dafür da. Trag die Zahlen aus deinem Heil- und Kostenplan ein und sieh, was er übernimmt und was bei dir bleibt.',
    knopfRechner: 'Meinen Plan nachrechnen',
    knopfAbschluss: 'Gleich online abschließen',
    fussnote: 'Nur zusammen mit einem neuen Zahntarif der Bayerischen. Der Baustein endet nach 24 Monaten von selbst.',
    vertrauenszeile: 'Bedingungen der Bayerischen verlinkt · Rechner ohne Anmeldung, nichts wird gespeichert · Healio ist Versicherungsmakler',
    bildAlt: 'Eine Patientin mit Unterlagen und eine Zahnärztin mit Tablet am Tisch',
    karte: {
      titel: 'ZAHN Sofort auf einen Blick',
      kacheln: [
        { key: 'zahn', wert: 'bis zu 750 EUR', text: 'je Kalenderjahr für Behandlungen, die schon angeraten sind oder laufen' },
        { key: 'jahr', wert: 'bis zu 1.500 EUR', text: 'insgesamt, verteilt auf die 24 Monate' },
        { key: 'beitrag', wert: '29,90 EUR', text: 'im Monat für den Baustein, dazu der Zahntarif' },
      ],
      hinweis: 'Wie viel davon bei dir ankommt, hängt vom Zahntarif ab: Smart erstattet 75 %, Komfort 80 bis 100 %, Prestige 100 %, jeweils zusammen mit deiner Kasse.',
    },
  },

  rechner: {
    ueberschrift: 'Rechne deinen Heil- und Kostenplan nach',
    intro: 'Du brauchst zwei Zahlen aus deinem Plan: die geschätzten Gesamtkosten und den Festzuschuss der Kasse. Deine Eingaben bleiben auf deinem Gerät.',
    felder: {
      gesamt: {
        label: 'Geschätzte Gesamtkosten laut Plan',
        hilfe: 'Die Summe aus Praxis- und Laborkosten, wie dein Zahnarzt sie geschätzt hat.',
      },
      kasse: {
        label: 'Festzuschuss der Kasse laut Plan',
        hilfe: 'Ohne diese Zahl wäre das Ergebnis zu hoch. Die Praxis kennt den Betrag.',
      },
      tarif: {
        label: 'Welchen Zahntarif willst du nehmen?',
        optionen: [
          { value: 'smart', label: 'ZAHN Smart · 75 %' },
          { value: 'komfort', label: 'ZAHN Komfort · 80 bis 100 %' },
          { value: 'prestige', label: 'ZAHN Prestige · 100 %' },
        ],
      },
      art: {
        label: 'Was steht in deinem Plan?',
        optionen: [
          { value: 'regel', label: 'Zahnersatz, wie die Kasse ihn vorsieht (Regelversorgung)' },
          { value: 'hoeher', label: 'Zahnersatz, der darüber hinausgeht, zum Beispiel Keramik oder Inlays' },
          { value: 'behandlung', label: 'Zahnbehandlung, zum Beispiel Füllung oder Wurzelbehandlung' },
          { value: 'unbekannt', label: 'Weiß ich nicht' },
        ],
      },
      vorsorge: {
        label: 'Ich war in den letzten 5 Jahren regelmäßig zur Vorsorge und kann das belegen',
        hilfe: 'Dann erstattet Komfort 90 statt 80 %.',
      },
      beginnMonat: {
        label: 'In welchem Monat soll dein Vertrag beginnen?',
        hilfe: 'Der Beginn steht später in deinem Versicherungsschein. Die Rechnung muss danach kommen.',
        monate: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      },
    },
    hinweise: {
      gesamtLeer: 'Trag die Gesamtkosten aus deinem Plan ein.',
      kasseLeer: 'Trag den Festzuschuss ein. Zahlt die Kasse nichts, trag 0 ein.',
      betragPruefen: 'Bitte prüf den Betrag.',
      kasseZuHoch: 'Der Festzuschuss ist höher als die Gesamtkosten. Prüf bitte beide Zahlen im Plan.',
      kasseZahltAlles: 'Nach deinen Zahlen zahlt die Kasse den ganzen Plan. Der Baustein braucht nichts dazuzugeben.',
      tarifDeckt: 'Bei diesem Plan zahlt die Kasse schon so viel, wie ZAHN {Tarifname} zusammen mit ihr erstattet. Mit einem höheren Tarif sieht es anders aus.',
    },
    ergebnis: {
      kopf: 'Dein Ergebnis mit ZAHN {Tarifname}',
      kasse: 'Die Kasse zahlt laut Plan',
      sofortEinJahr: 'ZAHN Sofort zahlt bis zu, wenn alles in einem Kalenderjahr behandelt wird',
      sofortEinzeln: 'ZAHN Sofort zahlt bis zu',
      sofortZweiJahre: 'ZAHN Sofort zahlt bis zu, wenn die Behandlung in zwei Kalenderjahre fällt',
      bleibt: 'Bleibt bei dir',
      bleibtZweiJahre: 'bei zwei Kalenderjahren',
      kosten: 'Der Baustein kostet 29,90 EUR im Monat, in 24 Monaten 717,60 EUR. Dazu kommt der Beitrag für den Zahntarif, der danach weiterläuft.',
      vergleich: 'Zum Vergleich: ZAHN {Tarifname} kostet im Alter von 36 bis 40 Jahren in der Stadt {Stadt} EUR im Monat, auf dem Land {Land} EUR (Stand 07.2026). Dein Beitrag hängt von Alter und Wohnort ab.',
      beitraege: {
        smart: { stadt: '14,60', land: '13,30' },
        komfort: { stadt: '31,10', land: '21,30' },
        prestige: { stadt: '44,10', land: '28,90' },
      },
    },
    pflichtsaetze: {
      p1: 'Das ist eine Beispielrechnung mit deinen Zahlen. Ob du angenommen wirst und was erstattet wird, entscheidet die Bayerische nach deinem Antrag.',
      p2: 'ZAHN Sofort gibt es nur zusammen mit einem neuen Zahntarif der Bayerischen und nur beim ersten Abschluss. Nach 24 Monaten endet der Baustein von selbst.',
      p3: 'Die Rechnung muss nach dem Versicherungsbeginn kommen. Was vorher in Rechnung gestellt wurde, zahlt der Baustein nicht.',
      p4: 'Die Höchstbeträge gelten für alle Behandlungen zusammen, die beim Abschluss schon angeraten sind oder laufen. Erstattet wird bis zum 3,5-fachen Satz der Gebührenordnung.',
      p5: 'Beginnt dein Vertrag nicht im Januar, kürzen die Bedingungen den Höchstbetrag im ersten Kalenderjahr um ein Zwölftel für jeden Monat davor.',
    },
    abschluss: {
      knopf: 'Bei der Bayerischen online abschließen',
      hinweis: 'Du landest im Rechner der Bayerischen. Wähl dort deinen Zahntarif und schalte ZAHN Sofort dazu.',
      rueckrufLink: 'Lieber zurückrufen lassen',
      terminLink: 'oder einen Termin buchen',
    },
  },

  ablauf: {
    ueberschrift: 'In vier Schritten zum Sofortschutz',
    schritte: [
      { nr: 1, motiv: 'document', titel: 'Plan zur Kasse', text: 'Reich den Heil- und Kostenplan wie gewohnt bei deiner Kasse ein. Den Festzuschuss, den sie bewilligt, brauchst du für den Rechner.' },
      { nr: 2, motiv: 'calculator', titel: 'Nachrechnen', text: 'Trag Gesamtkosten und Festzuschuss oben ein und wähl einen Zahntarif. Du siehst sofort, was der Baustein übernimmt.' },
      { nr: 3, motiv: 'choice', titel: 'Online abschließen', text: 'Im Rechner der Bayerischen wählst du Smart, Komfort oder Prestige und schaltest ZAHN Sofort dazu. Später lässt sich der Baustein nicht mehr ergänzen.' },
      { nr: 4, motiv: 'calendar', titel: 'Dann erst die Rechnung', text: 'Schau auf den Beginn in deinem Versicherungsschein. Die Rechnung der Praxis muss danach kommen. Reich sie dann bei der Bayerischen ein.' },
    ],
    knopf: 'Bei der Bayerischen online abschließen',
    kleingedruckt: 'Ob du angenommen wirst und was erstattet wird, entscheidet die Bayerische nach deinem Antrag.',
  },

  // 22.11.2026 (Zahn an): Mit der gemeinsamen Zahn-Maske führen die Abschlussknöpfe direkt in unseren
  // Online-Antrag /antrag/zahn statt in den Rechner der Bayerischen. Dann ersetzen diese Sätze die zwei,
  // die den Rechner der Bayerischen nennen (ZahnAnlassPage.jsx). Ohne Schalter bleibt alles wie oben.
  direkt: {
    // Nachbesserung 22.11.2026 (Franks Vorgabe 19.11.): Die Gesellschaft wählt erst die Weiche, der Knopf nennt sie darum nicht.
    knopf: 'Online abschließen',
    abschlussHinweis: 'Du landest direkt in unserem Online-Antrag. Nach ein paar kurzen Fragen siehst du, wo du mit deinen Angaben online abschließen kannst und was es kostet. Passt ZAHN Sofort zu deinen Angaben, ist der Baustein dort schon dabei.',
    ablaufSchritt3: 'In unserem Online-Antrag beantwortest du zuerst ein paar kurze Fragen. Passt ZAHN Sofort zu deinen Angaben, wählst du Smart, Komfort oder Prestige mit dem Baustein. Später lässt sich der Baustein nicht mehr ergänzen.',
  },

  passt: {
    passtTitel: 'Das passt zu dir, wenn',
    passtItems: [
      'dein Zahnarzt eine Krone, ein Inlay, eine Füllung oder eine Wurzelbehandlung angeraten oder schon damit begonnen hat,',
      'die Praxis dafür noch keine Rechnung gestellt hat,',
      'du gesetzlich versichert bist und in Deutschland wohnst,',
      'dir kein Zahn fehlt, Weisheitszähne ausgenommen,',
      'du nach der Behandlung einen Zahntarif behalten willst, der bei neuen Behandlungen zahlt.',
    ],
    passtNichtTitel: 'Das passt nicht, wenn',
    passtNichtItems: [
      'dir ein Zahn fehlt, der noch nicht ersetzt ist, oder ein Zahn gezogen werden soll,',
      'du eine herausnehmbare Prothese trägst oder Zahnersatz hast, der älter als 10 Jahre ist,',
      'in den letzten 3 Jahren Parodontitis, Parodontose oder ein Zahnschmelzdefekt festgestellt wurde,',
      'die Behandlung schon abgerechnet ist,',
      'es um eine Zahnspange geht, die schon angeraten ist oder läuft. Ausnahme: nach einem Unfall.',
    ],
    anderer: { label: 'Für diese Fälle zeigt dir der Zahn-Check einen anderen Weg', to: '/zahn#zahn-check' },
    kleingedruckt: 'Bis 70 Jahre ist der Abschluss ohne Sonderanfrage möglich. Als Alter zählt das Kalenderjahr minus dein Geburtsjahr.',
  },

  fakten: {
    ueberschrift: 'Was in den Bedingungen steht',
    intro: 'Diese Regeln entscheiden, ob und wie viel der Baustein zahlt. Unter jeder Karte findest du die Stelle zum Nachlesen.',
    karten: [
      {
        wert: 'Beginn vor Rechnung',
        titel: 'Der Versicherungsbeginn zählt',
        text: 'Der Baustein zahlt für Behandlungen, die beim Beginn schon laufen oder angeraten sind. Was vor dem Beginn in Rechnung gestellt wurde, gilt als abgeschlossen und ist nicht dabei.',
        quelle: [{ id: 'bbSofort', stelle: 'Ziffer 1.1' }],
      },
      {
        wert: '75 bis 100 %',
        titel: 'nach dem Satz deines Zahntarifs',
        text: 'ZAHN Sofort erstattet so viel wie der gewählte Tarif, zusammen mit dem, was die Kasse zahlt. Bei Prestige sind das 100 %.',
        quelle: [{ id: 'hbStadt', stelle: 'Tabelle Tarifvarianten' }],
      },
      {
        wert: 'bis zu 750 EUR',
        titel: 'je Kalenderjahr, 1.500 EUR insgesamt',
        text: 'Gezählt wird das Jahr, in dem du behandelt wirst. Was in einem Jahr übrig bleibt, verfällt. Die Leistungsstaffel deines Zahntarifs bleibt unberührt.',
        quelle: [{ id: 'bbSofort', stelle: 'Ziffer 3.1' }],
      },
      {
        wert: 'keine Wartezeit',
        titel: 'im Baustein',
        text: 'Für die angeratene Behandlung musst du nicht warten. Nach 24 Monaten endet ZAHN Sofort ohne Kündigung, dein Zahntarif läuft weiter.',
        quelle: [{ id: 'bbSofort', stelle: 'Ziffer 4 und 6' }],
      },
      {
        wert: '60 bis 75 %',
        titel: 'der Regelversorgung zahlt die Kasse',
        text: 'Das ist der Festzuschuss beim Zahnersatz, mit Bonusheft 70 oder 75 statt 60 %. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50, 60 und 65 %. Im Härtefall trägt die Kasse die Regelversorgung ganz.',
        quelle: [{ id: 'sgb55', stelle: 'Abs. 1 und 2' }, { id: 'bgbl228' }],
      },
    ],
  },

  faq: [
    {
      question: 'Welche Zahlen aus dem Heil- und Kostenplan brauche ich?',
      answer: 'Die geschätzten Gesamtkosten und den Festzuschuss der Kasse. Die Praxis schreibt die Kosten in den Plan, den Festzuschuss trägt die Kasse bei der Genehmigung ein. Für eine Füllung oder Wurzelbehandlung gibt es oft keinen Plan. Dann frag die Praxis nach den Kosten und danach, was die Kasse davon übernimmt.',
    },
    {
      question: 'Zählt der Tag des Antrags oder der Versicherungsbeginn?',
      answer: 'Der Versicherungsbeginn. Er steht in deinem Versicherungsschein und kann später liegen als der Tag, an dem du den Antrag stellst. Der Baustein zahlt nur Behandlungen, die zu diesem Datum noch nicht in Rechnung gestellt sind. Wähl im Antrag deshalb einen frühen Beginn und sprich den Rechnungstermin mit deiner Praxis ab.',
    },
    {
      question: 'Warum zeigt der Rechner zwei Ergebnisse?',
      answer: 'Der Baustein zahlt bis zu 750 EUR je Kalenderjahr. Gezählt wird das Jahr, in dem du behandelt wirst. Liegt ein Teil der Behandlung im nächsten Jahr, greift der Höchstbetrag ein zweites Mal, zusammen bis zu 1.500 EUR. Wann behandelt wird, entscheidet dein Zahnarzt danach, was medizinisch passt.',
    },
    {
      question: 'Wie viel zahlt die Kasse beim Zahnersatz?',
      answer: 'Einen festen Zuschuss je Befund: 60 % der Regelversorgung, mit Bonusheft nach fünf Jahren Kontrollen 70 %, nach zehn Jahren ohne Lücke 75 %. Für Festzuschüsse, die ab dem 01.01.2027 bewilligt werden, gelten 50, 60 und 65 %. Wer wenig verdient, bekommt als Härtefall die Regelversorgung ganz bezahlt. Für deine Rechnung zählt der Betrag, den die Kasse auf deinem Plan bewilligt.',
    },
    {
      question: 'Welcher Zahntarif passt zu ZAHN Sofort?',
      answer: 'Der Baustein erstattet nach dem Satz des Tarifs, immer zusammen mit der Kasse. Smart erstattet 75 %. Komfort zahlt 100 % bei Zahnbehandlung und Regelversorgung, bei höherwertigem Zahnersatz 80 % oder mit Vorsorgenachweis 90 %. Prestige erstattet 100 %. Im Rechner siehst du den Unterschied mit deinen Zahlen. Nach den 24 Monaten bleibt dir der Tarif für neue Behandlungen.',
    },
    {
      question: 'Lohnt sich der Baustein auch bei einer kleinen Behandlung?',
      answer: 'Rechne es mit deinen Zahlen nach. ZAHN Sofort kostet in 24 Monaten 717,60 EUR. Übernimmt er mehr, hast du mehr heraus, als er kostet. Übernimmt er weniger, kann sich der Abschluss trotzdem lohnen, weil der Zahntarif danach weiterläuft und neue Behandlungen trägt.',
    },
    {
      question: 'Wer entscheidet, ob ich angenommen werde?',
      answer: 'Die Bayerische. Im Antrag fragt sie nach fehlenden Zähnen, Prothesen, altem Zahnersatz und Parodontitis. Ob du angenommen wirst und was erstattet wird, entscheidet sie nach deinem Antrag. Willst du vorher mit jemandem sprechen, ruft dich Healio als Versicherungsmakler zurück.',
    },
  ],
  abschlussKnopf: 'Meinen Plan nachrechnen',

  quellenUeberschrift: 'Quellen dieser Seite',
  quellen: [
    { id: 'bbSofort', wofuer: 'Leistung, Grenzen, Laufzeit' },
    { id: 'hbStadt', wofuer: 'Erstattungssätze und Beiträge' },
    { id: 'hbLand', wofuer: 'Beiträge auf dem Land' },
    { id: 'bbKomfort', wofuer: 'Zahntarif Komfort' },
    { id: 'avb', wofuer: 'Kalenderjahr und Beginn' },
    { id: 'sgb55', wofuer: 'Festzuschuss der Kasse' },
    { id: 'bgbl228', wofuer: 'Festzuschuss ab 2027' },
  ],

  weiterlesenTitel: 'Weiterlesen im Ratgeber',
  weiterlesen: [
    'zahnzusatzversicherung-laufende-behandlung',
    'zahnzusatzversicherung-sofort-2026',
    'heil-und-kostenplan',
    'bayerische-zahnzusatzversicherung',
    'bonusheft-zahnarzt',
    'zahnersatz-haertefall',
  ],

  andereWege: {
    ueberschrift: 'Deine Lage ist eine andere?',
    text: 'Fehlt dir ein Zahn, willst du vorsorgen oder deine Familie absichern, findest du auf der Zahnseite den passenden Tarif.',
    knopf: 'Zur Zahnseite mit Zahn-Check',
    to: '/zahn#zahn-check',
  },

  rueckruf: {
    ueberschrift: 'Lieber kurz sprechen?',
    text: 'Schick uns Vorname und Telefonnummer. Wir rufen dich an und schauen mit dir auf deinen Plan.',
    herkunft: '/zahn/behandlung-steht-an',
    startThema: 'angeraten',
  },

  fussHinweis: 'Healio GmbH ist Versicherungsmakler. Alle Angaben zu ZAHN Sofort folgen den Bedingungen der Bayerischen, die oben verlinkt sind. Ob du angenommen wirst und was erstattet wird, entscheidet der Versicherer nach deinem Antrag.',
};

export default inhalt;
