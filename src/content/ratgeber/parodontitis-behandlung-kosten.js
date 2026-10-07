/**
 * Zahn-Ratgeber Serie, Stapel "zahnkosten", Welle A: "Parodontitis Behandlung Kosten".
 *
 * Quellen (Belege je Zahl in parodontitis-behandlung-kosten.belege.md, Abruf
 * 07.10.2026): PAR-Richtlinie des G-BA (Fassung vom 17.12.2020, zuletzt
 * geändert 19.12.2024, §§ 4, 5, 9 bis 13), Meldung des G-BA vom 30.06.2021,
 * Patienteninformation der KZBV "Behandlung der Parodontitis" (Stand Juli
 * 2025), Verbraucherzentrale "Parodontitis-Therapie: Was zahlt die Kasse?"
 * (Stand 28.03.2025), KZBV zur professionellen Zahnreinigung (Stand Mai
 * 2025). Tarifaussagen wortgleich mit
 * src/components/sections/dental/dentalContent.js.
 *
 * Bewusste Grenzen:
 *   - Keine Euro-Angabe für die Kassenstrecke (sie ist Sachleistung) und keine
 *     Euro-Spanne für Laser, lokale Antibiotika oder regenerative Verfahren:
 *     Dafür gibt es keine neutrale Preisangabe. Die einzige Euro-Zahl ist die
 *     Spanne der KZBV für die professionelle Zahnreinigung (80 bis 120 EUR je
 *     Sitzung bei durchschnittlichem Aufwand).
 *   - Medizinisches nur so weit, wie die Kostenfrage es braucht, mit Quelle.
 *     Keine Behandlungsempfehlung, kein Heilversprechen, kein Nutzenversprechen
 *     für die professionelle Zahnreinigung oder für Laserverfahren.
 *   - Ob ein Zahntarif private Zusatzleistungen der Parodontitis-Behandlung
 *     erstattet, steht nicht auf healio.de/zahn. Die Seite nennt nur die
 *     professionelle Zahnreinigung der UKV (Top-Stufen, ZahnPRIVAT 100 ohne
 *     Jahresdeckel) und verweist sonst auf die Tarifbedingungen.
 *   - Parodontitis zählt auf /zahn zur Zahn-Vorgeschichte: Die Seite sagt das
 *     offen und verspricht keine Annahme.
 *   - Kosten-Seite wie die Wurzelbehandlung der Welle 1, kein Kandidat für die
 *     Sperrlisten in google-ads.js und analytics.js (Entscheidung der
 *     Marktanalyse-Sitzung vom 07.10.2026). Das Krankheitsbild steht nur so
 *     weit, wie die Kassenregeln es brauchen (Sondierungstiefe, Grad A bis C
 *     für die Nachsorge-Frequenz, Erhaltungswürdigkeit). Die Hinweise des IQWiG
 *     zu Rauchen und Diabetes sind bei der Prüfung entfallen, sie sind keine
 *     Kassenregel.
 *
 * Faktenprüfung 07.10.2026: serie/zahn/PRÜFBERICHT-zahnkosten.md
 */
export const article = {
  slug: 'parodontitis-behandlung-kosten',
  kind: 'ratgeber',
  group: 'zaehne',

  metaTitle: 'Parodontitis Behandlung Kosten: was die Kasse zahlt | Healio',
  metaDescription:
    'Parodontitis-Behandlung: Wie sie abläuft, wie lange sie dauert, was die Kasse nach der PAR-Richtlinie zahlt und was du für Zusatzleistungen privat trägst.',

  publishedAt: '2026-10-07',
  publishedAtLabel: '7. Oktober 2026',
  readingTimeMinutes: 10,

  listTitle: 'Parodontitis-Behandlung: Ablauf, Kosten und was die Kasse zahlt',
  listTeaser:
    'Was die PAR-Richtlinie als Kassenleistung vorsieht, wie lange Behandlung und Nachsorge dauern und was du für Zusatzleistungen selbst zahlst.',

  headline: 'Parodontitis-Behandlung: Ablauf, Kosten und was die Kasse zahlt',

  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',

  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: 'Kassenleistung', label: 'die systematische Behandlung nach PAR-Richtlinie, vorab genehmigt' },
      { value: '2 Jahre', label: 'Nachsorge (UPT) als Kassenleistung nach der aktiven Behandlung' },
      { value: 'Privatleistung', label: 'professionelle Zahnreinigung, Laser, lokale Antibiotika' },
    ],
    text: 'Der Antrag deiner Praxis geht vor der Behandlung an die Kasse. Was sie nicht zahlt, vereinbarst du privat, etwa Laser oder lokale Antibiotika.',
    path: { to: '/zahn#zahn-check', text: 'Welcher Zahn-Weg ist bei dir offen?', label: 'Zahn-Check starten' },
  },

  lead: 'Die Behandlung einer Parodontitis ist Kassenleistung, wenn deine Krankenkasse den Antrag deiner Praxis vorab genehmigt. Seit dem 1. Juli 2021 regelt das die PAR-Richtlinie des Gemeinsamen Bundesausschusses (G-BA), von der Aufklärung über die antiinfektiöse Therapie bis zur zweijährigen Nachsorge. Privat bezahlst du Zusatzleistungen wie die professionelle Zahnreinigung, Laseranwendungen oder lokale Antibiotika.',

  sections: [
    {
      id: 'kasse',
      heading: 'Zahlt die Krankenkasse die Parodontitis-Behandlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ja, wenn der Zahnhalteapparat behandlungsbedürftig ist und die Kasse zugestimmt hat. Nach der Richtlinie ist die systematische Behandlung angezeigt, wenn eine der beschriebenen Diagnosen gestellt wird und dabei eine Sondierungstiefe von 4 mm oder mehr vorliegt. Die Durchführung bedarf der vorherigen Genehmigung durch die Krankenkasse. Deine Praxis stellt dafür vor Beginn einen Antrag, und die Kasse kann vor ihrer Entscheidung die Unterlagen und dich begutachten lassen (§ 4 und § 5 PAR-Richtlinie).',
        },
        {
          type: 'paragraph',
          text: 'Für Versicherte mit Pflegegrad oder Eingliederungshilfe gibt es nach der KZBV eine angepasste Behandlungsstrecke. Dort reicht statt der Genehmigung eine Information der Praxis an die Kasse. Ein erstes Screening, den Parodontalen Screening Index, zahlt die Kasse nach der Verbraucherzentrale alle zwei Jahre.',
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'Wie läuft eine Parodontitis-Behandlung ab?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die KZBV gliedert die systematische Behandlung in Schritte, deren Kosten die Krankenkassen übernehmen. Ob alle für dich nötig sind, entscheidet deine Praxis nach dem Befund.',
        },
        {
          type: 'steps',
          heading: 'In drei Abschnitten durch die Behandlung',
          items: [
            {
              title: 'Planung und Antrag',
              text: 'Befund, Diagnose und Antrag, dann ein Aufklärungs- und Therapiegespräch und eine Mundhygieneunterweisung.',
            },
            {
              title: 'Behandlung',
              text: 'Antiinfektiöse Therapie, danach eine Befundevaluation. Bei Taschen ab 6 mm gegebenenfalls eine chirurgische Therapie.',
            },
            {
              title: 'Nachsorge',
              text: 'Die unterstützende Parodontitistherapie (UPT) über zwei Jahre, angepasst an dein individuelles Risiko.',
            },
          ],
        },
      ],
    },
    {
      id: 'dauer',
      heading: 'Wie lange dauert eine Parodontitis-Behandlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die antiinfektiöse Therapie soll nach Möglichkeit in vier Wochen abgeschlossen sein, der gesamte Weg mit Kontrollen und Nachsorge dauert aber Jahre. Die Richtlinie nennt feste Zeiträume. Wie lange es bei dir genau dauert, hängt vom Verlauf ab.',
        },
        {
          type: 'table',
          mobile: 'cards',
          caption: 'Zeitrahmen der systematischen Parodontitis-Behandlung nach der PAR-Richtlinie des G-BA',
          head: ['Schritt', 'Zeitrahmen laut Richtlinie', 'Fundstelle'],
          rows: [
            ['Antiinfektiöse Therapie', 'nach Möglichkeit innerhalb von 4 Wochen abgeschlossen', '§ 9'],
            ['Erste Befundevaluation', '3 bis 6 Monate nach Ende der antiinfektiösen Therapie', '§ 11'],
            ['Chirurgische Therapie, falls nötig', 'bei Sondierungstiefen ab 6 mm, erneute Evaluation 3 bis 6 Monate danach', '§ 12'],
            ['Beginn der Nachsorge (UPT)', '3 bis 6 Monate nach Abschluss der Therapie', '§ 13 Abs. 1'],
            ['Dauer der Nachsorge (UPT)', '2 Jahre, je nach Grad A, B oder C bis zu zweimal, viermal oder sechsmal je Leistung', '§ 13 Abs. 3'],
            ['Verlängerung der Nachsorge', 'in der Regel höchstens 6 Monate, nur mit vorheriger Genehmigung der Kasse', '§ 13 Abs. 4'],
          ],
          note: 'Quelle: G-BA, PAR-Richtlinie in der Fassung vom 17. Dezember 2020, zuletzt geändert am 19. Dezember 2024 (BAnz AT 29.01.2025 B3). Der Grad A bis C beschreibt die Progressionsrate der Erkrankung (§ 4).',
        },
      ],
    },
    {
      id: 'kosten',
      heading: 'Was kostet eine Parodontitis-Behandlung?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Für die Kassenstrecke übernehmen die gesetzlichen Krankenkassen die Kosten, sobald die Kasse genehmigt hat. Das gilt nach der KZBV für Aufklärung, Mundhygieneunterweisung, antiinfektiöse Therapie, Befundevaluation, gegebenenfalls die chirurgische Therapie und die zweijährige Nachsorge. Seit Juli 2021 entfallen laut Verbraucherzentrale die Privatkosten für die Anleitung zur Mundhygiene. Auch die Zahnsteinentfernung zahlt die Kasse, einmal im Kalenderjahr.',
        },
        {
          type: 'paragraph',
          text: 'Selbst trägst du, was die Kasse nicht zahlt. Die KZBV nennt als Beispiele für privat vereinbarte Leistungen die professionelle Zahnreinigung, die 3-D-Röntgendiagnostik, Biomarker-Tests, mikrobiologische Diagnostik, Laseranwendungen, die lokale Anwendung von Antibiotika, Verfahren bei Zahnfleischrückgang, Verfahren zur Wiederherstellung von Gewebe und Knochen und die Versorgung von Entzündungen an Implantaten. Wie viel das kostet, legt deine Praxis fest, eine neutrale Preisliste gibt es nicht.',
        },
        {
          type: 'paragraph',
          text: 'Eine professionelle Zahnreinigung kostet laut KZBV bei durchschnittlichem Aufwand 80 bis 120 EUR. Nach der Verbraucherzentrale darf sie nicht zur Vorbedingung einer Parodontalbehandlung gemacht werden. Manche Kassen geben freiwillig einen Zuschuss, welche und wie viel, zeigt der Ratgeber zur professionellen Zahnreinigung.',
        },
      ],
    },
    {
      id: 'beispiel',
      heading: 'Was bleibt bei einer Parodontitis-Behandlung an dir hängen?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die Karte zeigt, wer welchen Teil trägt. Euro-Beträge stehen nur dort, wo es eine neutrale Angabe gibt.',
        },
        {
          type: 'costCard',
          title: 'Parodontitis-Behandlung: wer was trägt',
          icon: 'calculator',
          tariffLabel: 'Gerechnet mit UKV ZahnPRIVAT 100: 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, die professionelle Zahnreinigung ohne Jahresdeckel. Der Vertrag besteht schon, bevor die Behandlung angeraten wird. Parodontitis in den letzten 3 Jahren zählt auf healio.de/zahn zur Zahn-Vorgeschichte.',
          caption: 'Kostenkarte: Parodontitis-Behandlung mit und ohne Zahntarif',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['Aufklärung, Mundhygieneunterweisung, antiinfektiöse Therapie, Befundevaluation', 'die Kosten nach vorheriger Genehmigung', 'nichts dazu für die Kassenleistung', 'Nichts zu erstatten'],
            ['Chirurgische Therapie, wenn sie nach der Evaluation nötig ist', 'die Kosten, wenn die Richtlinie sie vorsieht', 'nichts dazu für die Kassenleistung', 'Nichts zu erstatten'],
            ['Unterstützende Parodontitistherapie über 2 Jahre', 'die Kosten der Nachsorge', 'nichts dazu für die Kassenleistung', 'Nichts zu erstatten'],
            ['Professionelle Zahnreinigung, 80 bis 120 EUR je Sitzung bei durchschnittlichem Aufwand', 'keine Regelleistung, manche Kassen geben freiwillig einen Zuschuss', '80 bis 120 EUR minus Zuschuss deiner Kasse', 'Der Tarif erstattet die erstattungsfähigen Kosten'],
            ['Laser, lokale Antibiotika, Verfahren zur Wiederherstellung von Gewebe und Knochen', 'keine Kassenleistung', 'der Preis deiner Praxis', 'Was erstattungsfähig ist, steht in den Tarifbedingungen'],
          ],
          note: 'Rechenbeispiel, keine Preisangabe. Quellen: KZBV Patienteninformation Behandlung der Parodontitis (Stand Juli 2025), PAR-Richtlinie des G-BA, KZBV zur professionellen Zahnreinigung (Stand Mai 2025, 80 bis 120 EUR bei durchschnittlichem Aufwand). Für die Kassenleistungen gibt es keine Euro-Angabe, weil sie als Sachleistung abgerechnet werden. Tarif nach den Unterlagen auf healio.de/zahn.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
        },
      ],
    },
    {
      id: 'zusatz',
      heading: 'Was erstattet eine Zahnzusatzversicherung bei Parodontitis?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Die systematische Behandlung zahlt die Kasse, ein Tarif kommt bei privat vereinbarten Leistungen ins Spiel. Bei der UKV ZahnPRIVAT gibt es die professionelle Zahnreinigung in den Top-Stufen, ZahnPRIVAT 100 hat keine Wartezeiten und leistet dafür ohne Jahresdeckel. In ZahnPRIVAT 100 erstattet der Tarif 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. In ZahnPRIVAT 75 sind es 75 % der erstattungsfähigen Kosten, ebenfalls nach Abzug der Kassenleistung.',
        },
        {
          type: 'honest',
          heading: 'Ehrlich gesagt',
          items: [
            {
              lead: 'Die Genehmigung kommt vor der Behandlung.',
              text: 'Der Antrag geht vor Beginn an die Kasse. Auch eine Verlängerung der Nachsorge braucht vorab ihre Genehmigung. Ob und wie behandelt wird, entscheidet deine Praxis nach dem Befund. Dieser Ratgeber gibt keine Behandlungsempfehlung.',
            },
            {
              lead: 'Nicht jeder Zahn wird auf Kassenkosten behandelt.',
              text: 'Die Verbraucherzentrale nennt eine Parodontitis-Therapie bei Zähnen, die nicht als erhaltungswürdig gelten, Privatleistung, etwa wenn der Knochenabbau schon bei mehr als 75 Prozent liegt. Für solche Fälle enthält auch die Richtlinie eine eigene Regel (§ 4). Ob ein Zahn erhaltungswürdig ist, beurteilt deine Praxis.',
            },
            {
              lead: 'Parodontitis zählt für den Zahntarif zur Vorgeschichte.',
              text: 'Nach fehlenden Zähnen und Parodontitis fragt der Antrag. Auf healio.de/zahn zählt Parodontitis in den letzten 3 Jahren zur Zahn-Vorgeschichte, ebenso eine herausnehmbare Prothese. Für den Baustein ZAHN Sofort der Bayerischen gilt als Voraussetzung: Es fehlen keine Zähne und es gibt keine Zahn-Vorgeschichte, zum Beispiel keine Parodontitis in den letzten 3 Jahren und keine herausnehmbare Prothese. Verbindlich entscheidet der Versicherer im Antrag.',
            },
            {
              lead: 'Angeratenes ist nicht versichert.',
              text: 'Gab es in den letzten 2 Jahren einen Heil- und Kostenplan oder wurde die Behandlung angeraten, ist genau diese Behandlung nicht versichert. Liegt das länger als 2 Jahre zurück, ist sie wieder versichert. Was schon läuft, zählt immer.',
            },
            {
              lead: 'Die Zahnstaffel begrenzt die ersten Jahre.',
              text: 'In ZahnPRIVAT 90 und 100 gilt in den ersten drei Kalenderjahren eine Zahnstaffel: bis 1.000 EUR im ersten Jahr, zusammen bis 3.000 EUR in den ersten zwei und bis 6.000 EUR in den ersten drei Jahren, danach endet die Staffel und es gelten allein die Erstattungssätze des Tarifs. Bei Unfall gilt keine Staffel. In ZahnPRIVAT 75 sind es bis 1.000 EUR im ersten Kalenderjahr, zusammen bis 2.000 EUR in den ersten zwei und bis 3.000 EUR in den ersten drei Jahren.',
            },
            {
              lead: 'Fehlen schon Zähne, gelten die Regeln von healio.de/zahn.',
              text: 'Bei 1 bis 3 fehlenden, noch nicht ersetzten Zähnen sieht der UKV-Antrag eine Aufnahme mit Risikozuschlag je Zahn vor. Ab 4 fehlenden Zähnen ist keine Aufnahme möglich.',
            },
          ],
        },
        {
          type: 'segments',
          segments: [
            { text: 'Was die professionelle Zahnreinigung kostet und welche Kasse etwas dazugibt, steht im Ratgeber ' },
            { text: 'Professionelle Zahnreinigung Kosten', to: '/ratgeber/professionelle-zahnreinigung-kosten' },
            { text: '. Was ab Tag eins gilt und wo die Staffel greift, zeigt der Ratgeber ' },
            { text: 'Zahnzusatzversicherung ohne Wartezeit', to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit' },
            { text: '. Geht ein Zahn verloren, vergleicht der Ratgeber ' },
            { text: 'Zahnersatz: welche Möglichkeiten es gibt', to: '/ratgeber/zahnersatz-moeglichkeiten' },
            { text: ' die Wege.' },
          ],
        },
        {
          type: 'path',
          to: '/zahn#zahn-check',
          icon: 'dental',
          text: 'Vier kurze Fragen, keine Kontaktdaten und keine Weitergabe deiner Antworten: Der Zahn-Check zeigt, welcher Weg bei deiner Zahnsituation offen ist.',
          label: 'Zahn-Check starten',
        },
        {
          type: 'cards',
          heading: 'Das passt dazu',
          hint: 'Zum Weiterblättern seitlich wischen',
          items: [
            {
              icon: 'comparison',
              tone: 'mint',
              title: 'Zahnersatz Kosten',
              text: 'Was die Kasse zahlt und was bei dir bleibt.',
              to: '/ratgeber/zahnersatz-kosten',
              linkLabel: 'Zur Übersicht',
            },
            {
              icon: 'prevention',
              tone: 'lavender',
              title: 'Professionelle Zahnreinigung',
              text: 'Was sie kostet und was deine Kasse dazugibt.',
              to: '/ratgeber/professionelle-zahnreinigung-kosten',
              linkLabel: 'Ratgeber lesen',
            },
            {
              icon: 'calendar',
              tone: 'butter',
              title: 'Zahnzusatzversicherung ohne Wartezeit',
              text: 'Was ab dem ersten Tag gilt und wo die Staffel greift.',
              to: '/ratgeber/zahnzusatzversicherung-ohne-wartezeit',
              linkLabel: 'Ratgeber lesen',
            },
          ],
        },
      ],
    },
  ],

  factNugget:
    'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT, für schon angeratene Behandlungen ohne fehlenden Zahn den Baustein ZAHN Sofort der Bayerischen. Der Kassenbonus kann je nach Kasse als zweckgebundener Zuschuss beim Beitrag helfen; mehr als die nachgewiesenen eigenen Kosten wird nie erstattet. kassenboost.de vergleicht Bonusprogramme quellenbelegt anhand der Satzungen.',

  faqs: [
    {
      question: 'Was kostet eine Parodontitis-Behandlung?',
      answer:
        'Die systematische Behandlung nach der PAR-Richtlinie übernehmen die gesetzlichen Krankenkassen, wenn sie den Antrag deiner Praxis vorab genehmigen. Privat trägst du Zusatzleistungen wie die professionelle Zahnreinigung, die laut KZBV bei durchschnittlichem Aufwand 80 bis 120 EUR kostet, Laseranwendungen oder lokale Antibiotika. Deren Preise legt deine Praxis fest.',
    },
    {
      question: 'Zahlt die Krankenkasse die Parodontitis-Behandlung?',
      answer:
        'Ja, wenn die Behandlung angezeigt ist und die Kasse sie vorab genehmigt hat. Angezeigt ist sie bei einer der beschriebenen Diagnosen mit einer Sondierungstiefe von 4 mm oder mehr. Die Kasse kann vor ihrer Entscheidung die Unterlagen und dich begutachten lassen.',
    },
    {
      question: 'Wie lange dauert eine Parodontitis-Behandlung?',
      answer:
        'Die antiinfektiöse Therapie soll nach Möglichkeit innerhalb von 4 Wochen abgeschlossen sein. Drei bis sechs Monate danach folgt die erste Befundevaluation, bei Bedarf eine chirurgische Therapie. Die unterstützende Nachsorge dauert zwei Jahre und kann in der Regel um bis zu sechs Monate verlängert werden, wenn die Kasse es vorab genehmigt.',
    },
    {
      question: 'Was ist die unterstützende Parodontitistherapie und zahlt die Kasse sie?',
      answer:
        'Die UPT ist die Nachsorge nach der aktiven Behandlung. Dazu gehören unter anderem die Mundhygienekontrolle, die Reinigung aller Zähne von Belägen und die Messung der Taschentiefen. Die Kasse übernimmt sie für zwei Jahre, die Häufigkeit richtet sich nach dem Grad A, B oder C der Erkrankung.',
    },
    {
      question: 'Muss ich vor der Parodontitis-Behandlung eine professionelle Zahnreinigung bezahlen?',
      answer:
        'Nein. Nach der Verbraucherzentrale darf eine herkömmliche professionelle Zahnreinigung nicht zur Vorbedingung einer Parodontalbehandlung gemacht werden. Wenn deine Praxis eine Reinigung empfiehlt, ist sie eine private Leistung, bei der manche Kassen freiwillig einen Zuschuss geben.',
    },
    {
      question: 'Zahlt eine Zahnzusatzversicherung bei Parodontitis?',
      answer:
        'Die systematische Behandlung zahlt die Kasse. Für privat vereinbarte Leistungen steht in den Tarifbedingungen, was erstattungsfähig ist. Parodontitis in den letzten 3 Jahren zählt auf healio.de/zahn zur Zahn-Vorgeschichte, und nach Parodontitis fragt der Antrag. Über die Annahme entscheidet der Versicherer.',
    },
  ],

  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Lass dir in deiner Praxis erklären, welche Schritte in deinem Fall anstehen und was davon die Kasse zahlt, und frag, welche Zusatzleistungen privat sind, bevor du zustimmst. Welcher Weg bei deiner Zahnsituation offen ist, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Alle Zahnkosten auf einen Blick findest du im Ratgeber ' },
      { text: 'Zahnersatz Kosten', to: '/ratgeber/zahnersatz-kosten' },
      { text: '. Welche Kasse zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' },
    ],
  },

  sources: {
    checkedAt: '2026-10-07',
    checkedAtLabel: '7. Oktober 2026',
    intro: 'Die Regeln der Kasse stammen aus der Richtlinie des G-BA und den Patienteninformationen von KZBV, Verbraucherzentrale und IQWiG.',
    items: [
      {
        label: 'Richtlinie zur systematischen Behandlung von Parodontitis und anderer Parodontalerkrankungen (PAR-Richtlinie), §§ 4, 5, 9 bis 13',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/downloads/62-492-3848/PAR-RL_2024-12-19_iK-2025-01-01_2025-07-01.pdf',
        stand: 'Fassung vom 17.12.2020, zuletzt geändert 19.12.2024',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Systematische Behandlung von Parodontitis ist ab 1. Juli neue GKV-Leistung',
        publisher: 'Gemeinsamer Bundesausschuss (G-BA)',
        href: 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/962/',
        stand: '30.06.2021',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Behandlung der Parodontitis (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/parodontitis/behandlung-der-parodontitis/',
        stand: 'Juli 2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Parodontitis-Therapie: Was zahlt die Kasse?',
        publisher: 'Verbraucherzentrale',
        href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/parodontitistherapie-was-zahlt-die-kasse-12903',
        stand: '28.03.2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Professionelle Zahnreinigung (Patienteninformation)',
        publisher: 'Kassenzahnärztliche Bundesvereinigung (KZBV)',
        href: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/',
        stand: 'Mai 2025',
        accessedAt: '07.10.2026',
      },
      {
        label: 'Tarifunterlagen UKV ZahnPRIVAT und Highlightblatt ZAHN Sofort, wie auf healio.de/zahn',
        publisher: 'UKV und die Bayerische',
        note: 'Leistungen und Bedingungen wortgleich mit der Seite healio.de/zahn.',
      },
    ],
  },

  footnote:
    'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben zur Kassenleistung nach den genannten Quellen vom 7. Oktober 2026, zu Tarifen nach dem Stand der Unterlagen. Maßgeblich sind immer dein Befund, die Entscheidung deiner Kasse und die Bedingungen des Versicherers.',
};

export default article;
