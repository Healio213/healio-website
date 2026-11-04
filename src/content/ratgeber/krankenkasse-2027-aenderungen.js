/**
 * Ratgeber Krankenkasse 2027: alle Änderungen der GKV-Reform als Übersicht.
 * Feld: Krankenkasse und Bonus. Entwurf vom 04.11.2026, Freigabe Frank offen.
 * Grundlage: GKV-Beitragssatzstabilisierungsgesetz vom 24.07.2026 (BGBl. 2026 I
 * Nr. 228), vollständig ausgewertet am 04.11.2026. Belege je Aussage:
 * Healio/Ratgeber-Reform-2027/FAKTEN-REFORM-2027.md.
 * Sperrlisten wie zuzahlung-medikamente (Arzneimittel, Homöopathie, Krankengeld).
 * IKK-Werte nach dem 81. Satzungsnachtrag (Fassung A, gilt ab 01.01.2027).
 * Tarifangaben nach /ambulant und src/data/sdkAmbulantBeitraege.js.
 */
export const article = {
  slug: 'krankenkasse-2027-aenderungen',
  kind: 'ratgeber',
  group: 'kasse-bonus',
  metaTitle: 'Krankenkasse 2027: Alle Änderungen der Reform | Healio',
  metaDescription:
    'Krankenkasse 2027: höhere Zuzahlungen, weniger Zuschuss beim Zahnersatz, keine Homöopathie mehr. Alle Änderungen mit Stichtagen und was du jetzt tun kannst.',
  publishedAt: '2026-11-04',
  publishedAtLabel: '4. November 2026',
  readingTimeMinutes: 12,
  listTitle: 'Krankenkasse 2027: alle Änderungen der Reform auf einen Blick',
  listTeaser:
    'Zuzahlungen, Zahnersatz, Homöopathie, Krankengeld und Familienversicherung: was sich 2027 und 2028 ändert, mit Rechenbeispielen und einer Liste für die letzten Wochen 2026.',
  headline: 'Krankenkasse 2027: Was die Reform für dich ändert',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'comparison',
    facts: [
      { value: '7,50 bis 15 EUR', label: 'Zuzahlung je Medikament ab 1. Januar 2027' },
      { value: '50 statt 60 %', label: 'Kassenzuschuss beim Zahnersatz ohne Bonusheft' },
      { value: '15 EUR am Tag', label: 'Zuzahlung im Krankenhaus, bisher 10 EUR' },
    ],
    text: 'Die meisten Änderungen gelten ab 1. Januar 2027 für alle Kassen gleich. Einen Teil der Mehrkosten fängt ein ambulanter Tarif auf.',
    path: {
      to: '/ambulant',
      text: 'Zuzahlungen und Heilpraktiker mitversichern',
      label: 'Ambulante Tarife bei Healio öffnen',
    },
  },

  lead: '2027 wird es für gesetzlich Versicherte an vielen Stellen teurer. Das GKV-Beitragssatzstabilisierungsgesetz erhöht die Zuzahlungen, senkt den Zuschuss beim Zahnersatz und beendet Homöopathie als Kassenleistung. Hier findest du alle Änderungen auf einen Blick, mit Rechenbeispielen und dem, was du noch 2026 erledigen kannst.',

  sections: [
    {
      id: 'ueberblick',
      heading: 'Was ändert sich 2027 bei der Krankenkasse?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Am stärksten merkst du die Reform bei den Zuzahlungen, beim Zahnersatz und bei der Homöopathie. Ein paar Regeln gelten schon seit dem 30. Juli 2026, die meisten ab dem 1. Januar 2027 und eine erst ab 2028. Das Gesetz steht im Bundesgesetzblatt vom 29. Juli 2026.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Die wichtigsten Änderungen der Reform',
          head: ['Was', 'Bisher', 'Neu', 'Ab wann'],
          rows: [
            ['Zuzahlung je Medikament', '5 bis 10 EUR', '7,50 bis 15 EUR', '1. Januar 2027'],
            ['Krankenhaus und Reha je Tag', '10 EUR', '15 EUR', '1. Januar 2027'],
            ['Physiotherapie und häusliche Pflege je Verordnung', '10 % plus 10 EUR', '10 % plus 15 EUR', '1. Januar 2027'],
            ['Hilfsmittel zum Verbrauch im Monat', 'höchstens 10 EUR', 'höchstens 15 EUR', '30. Juli 2026'],
            ['Festzuschuss Zahnersatz', '60, 70 oder 75 %', '50, 60 oder 65 %', 'Bewilligung ab 1. Januar 2027'],
            ['Homöopathie auf Kassenrezept', 'möglich', 'nicht mehr', '30. Juli 2026'],
            ['Homöopathie als Extra der Kasse', 'möglich', 'nicht mehr erlaubt', '1. Januar 2027'],
            ['Krankengeld nach Wahlerklärung', 'ohne Wartezeit', '3 Monate Wartezeit', '1. Januar 2027'],
            ['Brief der Kasse bei höherem Zusatzbeitrag', 'Pflicht', 'entfällt', '30. Juli 2026'],
            ['Ehepartner in der Familienversicherung', 'beitragsfrei', 'Zuschlag 2,5 Prozentpunkte', '1. Januar 2028'],
          ],
          note: 'Nach dem GKV-Beitragssatzstabilisierungsgesetz vom 24. Juli 2026 (BGBl. 2026 I Nr. 228). Ausnahmen und Einzelheiten stehen in den Abschnitten unten.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'comparison',
          text: 'Zuzahlungen, Heilpraktiker und Brille: bis zu 3.000 EUR in zwei Jahren',
          label: 'Ambulante Tarife bei Healio öffnen',
        },
      ],
    },
    {
      id: 'zuzahlungen',
      heading: 'Wie viel mehr zahlst du 2027 bei Medikamenten, Physio und Krankenhaus?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bei Medikamenten zahlst du ab 2027 weiter 10 Prozent vom Preis, aber mindestens 7,50 EUR und höchstens 15 EUR. Teurer wird es also bei günstigen und bei teuren Mitteln, in der Mitte bleibt alles gleich.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Beispiele: Zuzahlung bis 2026 und ab 2027',
          head: ['Beispiel', 'Bis 2026', 'Ab 2027'],
          rows: [
            ['Medikament für 30 EUR', '5 EUR', '7,50 EUR'],
            ['Medikament für 80 EUR', '8 EUR', '8 EUR'],
            ['Medikament für 120 EUR', '10 EUR', '12 EUR'],
            ['Medikament ab 150 EUR', '10 EUR', '15 EUR'],
            ['Sechsmal Krankengymnastik für zusammen 150 EUR', '25 EUR', '30 EUR'],
            ['28 Tage Krankenhaus in einem Jahr', '280 EUR', '420 EUR'],
          ],
          note: 'Eigene Rechnung nach § 61 SGB V in der Fassung ab 1. Januar 2027. Die Zuzahlung ist nie höher als der Preis des Mittels. Im Krankenhaus zahlst du höchstens für 28 Tage im Jahr.',
        },
        {
          type: 'paragraph',
          text: 'Zwei Dinge ändern sich nicht. Kinder und Jugendliche unter 18 zahlen bei Medikamenten, Heilmitteln und im Krankenhaus weiter nichts zu. Und die Belastungsgrenze bleibt bei 2 Prozent deiner jährlichen Bruttoeinnahmen, bei chronisch Kranken bei 1 Prozent. Kommst du darüber, kannst du dich für den Rest des Jahres befreien lassen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie die Befreiung läuft, liest du im Ratgeber ' },
            { text: 'Zuzahlungsbefreiung', to: '/ratgeber/zuzahlungsbefreiung' },
            { text: '. Alles zur Apothekenquittung steht unter ' },
            { text: 'Zuzahlung von Medikamenten', to: '/ratgeber/zuzahlung-medikamente' },
            { text: '.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Im Tarif Ambulant 100, den Healio bei der SDK vermittelt, gibt es für gesetzliche Zuzahlungen zu Arznei-, Heil- und Hilfsmitteln einen eigenen Topf: bis zu 1.000 EUR in zwei Kalenderjahren. Du reichst Verordnung und Quittung ein und bekommst die Zuzahlung erstattet.',
        },
      ],
    },
    {
      id: 'zahnersatz',
      heading: 'Was zahlt die Kasse 2027 beim Zahnersatz?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Weniger als bisher. Bewilligt deine Kasse den Festzuschuss ab dem 1. Januar 2027, sinkt ihr Anteil an der Regelversorgung von 60 auf 50 Prozent. Mit fünf Jahren Bonusheft sind es 60 statt 70 Prozent, mit zehn Jahren 65 statt 75 Prozent.',
        },
        {
          type: 'paragraph',
          text: 'Es zählt das Datum der Bewilligung, nicht der Behandlung. Hat die Kasse deinen Heil- und Kostenplan noch 2026 bewilligt, gelten die alten Sätze. Im Härtefall zahlt sie weiter die ganze Regelversorgung.',
        },
        {
          type: 'paragraph',
          text: 'Ein Beispiel: Liegt die Regelversorgung für eine Krone bei 400 EUR, gab die Kasse bisher ohne Bonusheft 240 EUR dazu. Ab 2027 sind es noch 200 EUR. Den Rest und alles, was über die Regelversorgung hinausgeht, zahlst du selbst.',
        },
        {
          type: 'paragraph',
          text: 'Neu ist auch: Eine Zahnspange zahlt die Kasse künftig nur noch beim Fachzahnarzt für Kieferorthopädie oder bei Zahnärzten mit gleichwertiger Ausbildung oder genug Erfahrung. Für Behandlungen, die vor dem 29. Juli 2030 beginnen, gilt noch die alte Regel.',
        },
        {
          type: 'paragraph',
          text: 'Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was dein Eigenanteil ist, rechnest du im Ratgeber ' },
            { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
            { text: ' aus. Die Tarife findest du auf ' },
            { text: 'healio.de/zahn', to: '/zahn' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'homoeopathie',
      heading: 'Zahlt die Krankenkasse 2027 noch Homöopathie?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nein. Auf Kassenrezept gibt es homöopathische und anthroposophische Mittel schon seit dem 30. Juli 2026 nicht mehr, auch nicht für Kinder. Ab dem 1. Januar 2027 dürfen die Kassen Mittel und Behandlungen dieser Richtungen auch nicht mehr freiwillig als Extra bezahlen.',
        },
        {
          type: 'paragraph',
          text: 'Bis Ende 2026 kann deine Kasse noch erstatten, wenn ihre Satzung das vorsieht. Reiche offene Rechnungen deshalb rechtzeitig ein. Andere Extras bleiben erlaubt, Zuschüsse zur Osteopathie zum Beispiel. Bei der Akupunktur ändert sich nichts.',
        },
        {
          type: 'paragraph',
          text: 'Privat behandeln lassen kannst du dich weiter. Im Healio Gesundheitsbudget zählt Homöopathie nach den Bedingungen der SDK ausdrücklich zu den Naturheilverfahren. Dafür stehen im Tarif Ambulant 100 bis zu 1.000 EUR in zwei Kalenderjahren bereit, wenn Heilpraktiker nach dem Gebührenverzeichnis für Heilpraktiker oder Ärzte nach der GOÄ abrechnen.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Welche Mittel und Rechnungen erstattet werden, erklärt der Ratgeber ' },
            { text: 'Homöopathie ab 2027', to: '/ratgeber/homoeopathie-krankenkasse-2027' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'krankengeld',
      heading: 'Was ändert sich 2027 beim Krankengeld?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Vor allem Selbstständige müssen aufpassen. Wer Krankengeld per Wahlerklärung neu wählt, bekommt es ab 2027 erst nach drei Monaten Wartezeit. Ohne Wartezeit geht es nur, wenn du zum ersten Mal freiwillig Mitglied wirst oder gerade in die Selbstständigkeit startest und die Erklärung innerhalb von 14 Tagen abgibst. Nach einem Unfall in der Wartezeit zahlt die Kasse vom ersten Tag an.',
        },
        {
          type: 'list',
          items: [
            { lead: 'Job endet während der Krankschreibung:', text: 'Ab dem Tag danach bekommst du 60 Prozent deines Nettolohns, mit Kind 67 Prozent.' },
            { lead: 'Kürzere Frist:', text: 'Für einen Reha- oder Rentenantrag kann dir die Kasse künftig vier statt zehn Wochen Zeit geben.' },
            { lead: 'Kinderkrankentage:', text: 'Die höhere Zahl gilt nur für 2026. Ohne neues Gesetz sind es ab 2027 wieder 10 Tage je Kind und Elternteil, für Alleinerziehende 20 (Stand 4. November 2026).' },
            { lead: 'Ab 2028:', text: 'Dein Arzt oder deine Ärztin kann dich dann auch teilweise krankschreiben, zu 25, 50 oder 75 Prozent. Das geht nur, wenn du und dein Arbeitgeber zustimmen.' },
          ],
        },
      ],
    },
    {
      id: 'beitrag',
      heading: 'Wird die Krankenkasse 2027 teurer?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Beim Zusatzbeitrag hängt das von deiner Kasse ab. Das Bundesgesundheitsministerium hat den durchschnittlichen Zusatzbeitrag für 2027 am 30. Oktober 2026 auf 2,9 Prozent festgelegt, so hoch wie 2026. Den tatsächlichen Satz bestimmt jede Kasse selbst.',
        },
        {
          type: 'paragraph',
          text: 'Wichtig: Seit dem 30. Juli 2026 muss deine Kasse dir keinen Brief mehr schreiben, wenn sie den Zusatzbeitrag erhöht. Dein Sonderkündigungsrecht bleibt aber. Erhöht sie zum 1. Januar 2027, kannst du bis zum 31. Januar 2027 kündigen, die neue Kasse gilt dann ab dem 1. April 2027. Schau deshalb selbst auf deinen Zusatzbeitrag, zum Beispiel auf der Gehaltsabrechnung.',
        },
        {
          type: 'paragraph',
          text: 'Wer gut verdient, zahlt 2027 auch wegen der höheren Beitragsbemessungsgrenze mehr. Die Grenze soll von 5.812,50 auf 6.375 EUR im Monat steigen. Die Bundesregierung hat das beschlossen, der Bundesrat muss noch zustimmen. Auch der Wechsel in die private Krankenversicherung wird schwerer, weil die Grenze dafür auf 84.150 EUR im Jahr steigen soll.',
        },
        {
          type: 'segments',
          segments: [
            { text: 'Welche Kasse 2027 zu dir passt, vergleichst du auf ' },
            { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
            { text: '. Was bei einer Erhöhung gilt, steht im Ratgeber ' },
            { text: 'Beitragserhöhung der Krankenkasse', to: '/ratgeber/beitragserhoehung-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'familienversicherung-2028',
      heading: 'Was ändert sich 2028 für Ehepaare in der Familienversicherung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ab dem 1. Januar 2028 kostet die Familienversicherung für Ehe- und Lebenspartner einen Zuschlag. Das Mitglied zahlt dann 2,5 Prozentpunkte mehr auf seinen Beitragssatz, allein und ohne Anteil des Arbeitgebers. Bei 4.000 EUR brutto sind das rund 100 EUR im Monat. Kinder bleiben beitragsfrei.',
        },
        { type: 'paragraph', text: 'Keinen Zuschlag gibt es, solange' },
        {
          type: 'list',
          items: [
            'ein Kind unter 12 Jahren im Haushalt lebt oder ein Kind mit Behinderung, das sich nicht selbst unterhalten kann,',
            'der mitversicherte Partner einen Angehörigen ab Pflegegrad 2 mindestens zehn Stunden pro Woche zu Hause pflegt,',
            'der Partner die Regelaltersgrenze erreicht hat,',
            'er oder sie selbst mindestens Pflegegrad 3 hat, eine volle Erwerbsminderungsrente bekommt oder einen Grad der Behinderung von mindestens 60 hat.',
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wer heute schon beitragsfrei mitversichert ist, liest im Ratgeber ' },
            { text: 'Familienversicherung', to: '/ratgeber/familienversicherung-krankenkasse' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'gleich-und-neu',
      heading: 'Was bleibt 2027 gleich und was kommt noch dazu?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Vieles bleibt, wie es ist. Die Leistungen in der Schwangerschaft, der Anspruch auf Brille, Fahrkosten und Haushaltshilfe, die Belastungsgrenze und die gesetzlichen Regeln für Bonusprogramme lässt die Reform unverändert.',
        },
        {
          type: 'paragraph',
          text: 'Die Bonusprogramme selbst legt aber jede Kasse in ihrer Satzung fest, und die ändert sich oft zum Jahreswechsel. Die IKK classic zum Beispiel zahlt ab 2027 laut Satzung bis zu 500 EUR Zuschuss im Jahr, in der Regel kommen 400 bis 500 EUR zusammen.',
        },
        {
          type: 'paragraph',
          text: 'Neu ist eine Pflicht zur Zweitmeinung vor bestimmten planbaren Eingriffen. Fehlt sie, zahlt die Kasse nicht und du trägst die Kosten selbst. Dein Arzt muss dich vorher darauf hinweisen. Welche Eingriffe dazugehören, legt der Gemeinsame Bundesausschuss erstmals bis zum 31. März 2027 fest.',
        },
      ],
    },
    {
      id: 'auffangen',
      heading: 'Wie fängst du die höheren Kosten auf?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Am besten in drei Schritten: erst die Kasse prüfen, dann den Bonus nutzen, dann die Lücken gezielt schließen. So zahlst du für nichts doppelt.',
        },
        {
          type: 'steps',
          items: [
            { title: 'Kasse prüfen', text: 'Vergleiche Zusatzbeitrag und Bonus deiner Kasse mit anderen. Beitrag und Bonus rechnest du gegeneinander, nie zusammen.' },
            { title: 'Bonus nutzen', text: 'Viele Kassen belohnen Vorsorge, Impfungen und Sport. Bei manchen kannst du den Bonus als Zuschuss für eine Zusatzversicherung nehmen, höchstens bis zur Höhe deines Beitrags.' },
            { title: 'Lücken schließen', text: 'Ein ambulanter Tarif übernimmt Zuzahlungen, Heilpraktiker, Vorsorge und Brille. Für Zähne und Krankenhaus gibt es eigene Bausteine.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Ein Rechenbeispiel mit dem Tarif Ambulant 100 der SDK: Bis 40 Jahre kostet er höchstens 39,19 EUR im Monat, also 470,28 EUR im Jahr. Kommen bei der IKK classic 500 EUR Zuschuss zusammen, ist der Jahresbeitrag damit ganz bezahlt, von 41 bis 50 Jahren zu rund 94 Prozent. Dafür hast du bis zu 3.000 EUR in zwei Jahren für Heilpraktiker, Vorsorge, Brille und Zuzahlungen.',
        },
        {
          type: 'paragraph',
          text: 'Rechne dagegen, was ein Wechsel beim Zusatzbeitrag kostet oder spart. Welche Kasse du wählst, entscheidest du.',
        },
        {
          type: 'path',
          to: '/ambulant',
          icon: 'comparison',
          text: 'Passende Tarifstufe für 2027 finden',
          label: 'Ambulante Tarife bei Healio öffnen',
        },
      ],
    },
    {
      id: 'vor-jahresende',
      heading: 'Was solltest du noch 2026 erledigen?',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Homöopathie-Rechnungen aus 2026 bei deiner Kasse einreichen, wenn sie bisher gezahlt hat. Frag nach der Frist.',
            'Steht Zahnersatz ohnehin an, sprich mit deiner Zahnarztpraxis über den Heil- und Kostenplan. Bewilligt die Kasse ihn noch 2026, gelten die alten Zuschüsse.',
            'Bonusnachweise für 2026 sammeln und rechtzeitig einreichen. Die Frist steht in der Satzung deiner Kasse.',
            'Den Zusatzbeitrag 2027 deiner Kasse prüfen. Bei einer Erhöhung zum Jahreswechsel kannst du bis zum 31. Januar 2027 kündigen.',
            'Zusatzschutz früh beginnen lassen. Versichert sind neue Behandlungen ab Versicherungsbeginn, was schon läuft, bleibt draußen.',
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Wie die Bewilligung beim Zahnarzt abläuft, steht im Ratgeber ' },
            { text: 'Heil- und Kostenplan', to: '/ratgeber/heil-und-kostenplan' },
            { text: '.' },
          ],
        },
      ],
    },
    {
      id: 'grenzen',
      heading: 'Was du realistisch erwarten kannst',
      blocks: [
        {
          type: 'honest',
          icon: 'document',
          heading: 'Ehrlich gesagt',
          items: [
            'Die Reform gilt für alle gesetzlichen Kassen gleich. Ein Kassenwechsel spart dir keine Zuzahlung, unter Umständen aber Zusatzbeitrag.',
            'Eine Zusatzversicherung zahlt nur neue Behandlungen ab Versicherungsbeginn. Bei den Zähnen zahlt ein normaler Tarif schon angeratene Behandlungen nicht.',
            'Beim ambulanten Tarif gibt es Gesundheitsfragen, aber keine Ablehnung. Vorerkrankungen werden mit einem Zuschlag mitversichert.',
            'Den Bonus gibt es nur für nachgewiesene Maßnahmen und als Zuschuss höchstens bis zur Höhe deines Beitrags. Maßgeblich ist die Satzung deiner Kasse.',
          ],
        },
      ],
    },
    {
      id: 'weiterlesen',
      heading: 'Welche Ratgeber helfen dir beim nächsten Schritt?',
      blocks: [
        {
          type: 'cards',
          heading: 'Das passt dazu',
          items: [
            { title: 'Bonusprogramme der Krankenkassen', text: 'Wie Bonus und Zuschuss bei deiner Kasse funktionieren.', to: '/ratgeber/bonusprogramm-krankenkasse', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Zuzahlung von Medikamenten', text: 'Grenzen, Ausnahmen und Befreiung im Detail.', to: '/ratgeber/zuzahlung-medikamente', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Beitragserhöhung der Krankenkasse', text: 'Sonderkündigung und Fristen beim Zusatzbeitrag.', to: '/ratgeber/beitragserhoehung-krankenkasse', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Krankenkasse wechseln', text: 'Schritt für Schritt zur neuen Kasse.', to: '/ratgeber/krankenkasse-wechseln', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Homöopathie ab 2027', text: 'Was ohne Kassenleistung bleibt und was ein Tarif erstattet.', to: '/ratgeber/homoeopathie-krankenkasse-2027', icon: 'document', linkLabel: 'Ratgeber lesen' },
            { title: 'Zahnersatz Kosten', text: 'Eigenanteil mit den neuen Zuschüssen ausrechnen.', to: '/ratgeber/zahnersatz-kosten', icon: 'document', linkLabel: 'Ratgeber lesen' },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Die GKV-Reform erhöht ab 2027 die Zuzahlungen, senkt den Festzuschuss beim Zahnersatz und beendet Homöopathie als Kassenleistung. Der Tarif Ambulant 100 bietet bis zu 3.000 EUR in zwei Jahren, davon bis zu 1.000 EUR für gesetzliche Zuzahlungen und bis zu 1.000 EUR für Naturheilverfahren.',

  faqs: [
    {
      question: 'Was ändert sich 2027 bei der Krankenkasse?',
      answer:
        'Ab dem 1. Januar 2027 steigen die Zuzahlungen, zum Beispiel auf 7,50 bis 15 EUR je Medikament und 15 EUR je Krankenhaustag. Der Zuschuss zum Zahnersatz sinkt um 10 Prozentpunkte, Homöopathie dürfen die Kassen auch freiwillig nicht mehr bezahlen, und Krankengeld per Wahlerklärung gibt es erst nach drei Monaten Wartezeit.',
    },
    {
      question: 'Wie hoch ist die Zuzahlung für Medikamente 2027?',
      answer:
        '10 Prozent vom Preis, mindestens 7,50 EUR und höchstens 15 EUR, nie mehr als das Medikament kostet. Bis Ende 2026 sind es 5 bis 10 EUR. Kinder und Jugendliche unter 18 zahlen weiter nichts zu.',
    },
    {
      question: 'Zahlt die Krankenkasse 2027 noch Homöopathie?',
      answer:
        'Nein. Auf Kassenrezept gibt es Homöopathie schon seit dem 30. Juli 2026 nicht mehr. Ab dem 1. Januar 2027 dürfen die Kassen homöopathische und anthroposophische Mittel und Behandlungen auch nicht mehr als freiwillige Extraleistung bezahlen.',
    },
    {
      question: 'Wie viel zahlt die Kasse 2027 beim Zahnersatz?',
      answer:
        'Für Festzuschüsse, die ab dem 1. Januar 2027 bewilligt werden, 50 Prozent der Regelversorgung, mit Bonusheft 60 oder 65 Prozent. Bisher waren es 60, 70 oder 75 Prozent. Maßgeblich ist das Datum der Bewilligung.',
    },
    {
      question: 'Muss mich meine Krankenkasse über eine Beitragserhöhung informieren?',
      answer:
        'Nicht mehr per eigenem Brief, diese Pflicht ist seit dem 30. Juli 2026 gestrichen. Dein Sonderkündigungsrecht bleibt: Bei einer Erhöhung zum 1. Januar 2027 kannst du bis zum 31. Januar 2027 kündigen.',
    },
    {
      question: 'Wird die Familienversicherung für Ehepartner teurer?',
      answer:
        'Ja, ab dem 1. Januar 2028. Dann zahlt das Mitglied für einen familienversicherten Ehe- oder Lebenspartner einen Zuschlag von 2,5 Prozentpunkten auf seinen Beitragssatz. Keinen Zuschlag gibt es unter anderem, solange ein Kind unter 12 im Haushalt lebt oder der Partner die Regelaltersgrenze erreicht hat.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welche Tarifstufe zu dir passt, siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Welchen Bonus und Zusatzbeitrag deine Kasse 2027 hat, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-11-04',
    checkedAtLabel: '4. November 2026',
    intro: 'Alle Änderungen stammen aus dem Gesetzestext im Bundesgesetzblatt, die Werte für 2027 aus den Veröffentlichungen von Ministerium und Bundesregierung, die Bonuswerte aus der Satzung der IKK classic und die Tarifregeln aus den Bedingungen der SDK.',
    items: [
      {
        label: 'GKV-Beitragssatzstabilisierungsgesetz vom 24. Juli 2026 (BGBl. 2026 I Nr. 228)',
        publisher: 'Bundesministerium der Justiz, recht.bund.de',
        href: 'https://www.recht.bund.de/bgbl/1/2026/228/regelungstext.pdf?__blob=publicationFile&v=1',
        stand: 'ausgegeben 29.07.2026',
        accessedAt: '04.11.2026',
      },
      {
        label: 'SGB V § 61 Zuzahlungen (Fassung bis 31.12.2026)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__61.html',
        accessedAt: '04.11.2026',
      },
      {
        label: 'SGB V § 55 Leistungsanspruch beim Zahnersatz (Fassung bis 31.12.2026)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__55.html',
        accessedAt: '04.11.2026',
      },
      {
        label: 'SGB V § 175 Ausübung des Wahlrechts (Sonderkündigungsrecht)',
        publisher: 'gesetze-im-internet.de (BMJV)',
        href: 'https://www.gesetze-im-internet.de/sgb_5/__175.html',
        accessedAt: '04.11.2026',
      },
      {
        label: 'Zusatzbeitragssatz bleibt auch 2027 stabil',
        publisher: 'Bundesministerium für Gesundheit',
        href: 'https://www.bundesgesundheitsministerium.de/presse/pressemitteilungen/zusatzbeitragssatz-gkv-2027-festgelegt',
        stand: 'Pressemitteilung vom 30.10.2026',
        accessedAt: '04.11.2026',
      },
      {
        label: 'Beitragsbemessungsgrenzen 2027',
        publisher: 'Bundesregierung',
        href: 'https://www.bundesregierung.de/breg-de/bundesregierung/bundeskanzleramt/beitragsbemessungsgrenzen-2027-2454638',
        stand: 'Kabinettsbeschluss, Stand 12.10.2026',
        accessedAt: '04.11.2026',
      },
      {
        label: 'Homöopathika, Anthroposophika und Cannabisblüten nicht mehr verordnungsfähig',
        publisher: 'Kassenärztliche Bundesvereinigung (KBV)',
        href: 'https://www.kbv.de/praxis/tools-und-services/praxisnachrichten/2026/07-30/homoeopathika-anthroposophika-und-cannabisblueten-nicht-mehr-verordnungsfaehig',
        stand: 'Praxisnachricht vom 30.07.2026',
        accessedAt: '04.11.2026',
      },
      {
        label: 'IKK classic, 81. Nachtrag zur Satzung (§ 34 Bonus)',
        publisher: 'IKK classic',
        href: 'https://cdn.ikk-classic.de/exporter/20153-bekanntmachung81.pdf',
        stand: 'bekannt gemacht 15.10.2026, gilt ab 01.01.2027',
        accessedAt: '04.11.2026',
      },
      {
        label: 'SDK AP-Tarife: Naturheilverfahren, Zuzahlungen und Stufen (AVB Teil II 1.753a)',
        publisher: 'SDK',
        href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf',
        stand: 'Stand 01.01.2023',
        accessedAt: '04.11.2026',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Reform nach dem Bundesgesetzblatt und den genannten Quellen vom 4. November 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind die gesetzlichen Regeln, die aktuelle Satzung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
