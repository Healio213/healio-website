/**
 * Welle C, Ambulant, CSV-Thema 136. Originalsatzung am 07.10.2026 gelesen.
 * § 10b Abs. 8 Nr. 1, Seiten 17/18, Stand 01.01.2026, Nachträge 37 bis 39.
 * Drei Sitzungen bis 60 EUR innerhalb des gemeinsamen 200-EUR-Topfs.
 * Keine Behandlungspreise, Wirksamkeitszusage oder automatische Doppelerstattung.
 * Medizinischer Bezug: Sperrlisten-Kandidat für Google Ads und Analytics beim Einbau.
 * Belege: mobil-krankenkasse-osteopathie.belege.md.
 */
export const article = {
  slug: 'mobil-krankenkasse-osteopathie', kind: 'ratgeber', group: 'ambulant',
  metaTitle: 'Mobil Krankenkasse: Osteopathie und Zuschuss | Healio',
  metaDescription: 'Mobil erstattet Osteopathie unter Satzungsbedingungen: drei Sitzungen bis 60 EUR im gemeinsamen Jahrestopf. Prüfe Verordnung, Qualifikation und Frist.',
  publishedAt: '2026-10-07', publishedAtLabel: '7. Oktober 2026', readingTimeMinutes: 5,
  listTitle: 'Mobil Krankenkasse und Osteopathie',
  listTeaser: 'Sitzungsgrenze, gemeinsamer Topf und benötigte Nachweise vor dem Termin prüfen.',
  headline: 'Mobil Krankenkasse und Osteopathie: Was wird erstattet?',
  author: 'frank-steinfurt', toc: 'auto', faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze', icon: 'naturopathy',
    facts: [
      { value: '3 Sitzungen', label: 'Höchstens je Kalenderjahr und versicherter Person' },
      { value: 'Bis 60 EUR', label: 'Je Sitzung, höchstens die anerkannten tatsächlichen Kosten' },
      { value: '200 EUR gemeinsam', label: 'Jahrestopf mit Zahnreinigung und festsitzenden Retainern' }
    ],
    text: 'Die Mobil Krankenkasse erstattet nach Satzung höchstens drei Osteopathie-Sitzungen je Kalenderjahr mit bis zu 60 EUR je Sitzung. Ärztliche Verordnung und qualifizierter Behandler sind erforderlich; die Leistung teilt sich einen 200-EUR-Jahrestopf mit Zahnreinigung und festsitzenden Retainern.',
    path: { to: '/ambulant', text: 'Private Ergänzung für Naturheilverfahren prüfen', label: 'Zum ambulanten Vergleich' }
  },
  lead: 'Die Mobil Krankenkasse erstattet nach Satzung höchstens drei Osteopathie-Sitzungen je Kalenderjahr mit bis zu 60 EUR je Sitzung. Ärztliche Verordnung und qualifizierter Behandler sind erforderlich; die Leistung teilt sich einen 200-EUR-Jahrestopf mit Zahnreinigung und festsitzenden Retainern.',
  sections: [
    { id: 'erstattung', heading: 'Wie hoch ist der Osteopathie-Zuschuss bei Mobil?', blocks: [
      { type: 'paragraph', text: 'Die aktuelle Satzung regelt Osteopathie in § 10b Absatz 8 Nummer 1. Die Kasse berücksichtigt 100 Prozent des anerkannten Rechnungsbetrags, jedoch höchstens 60 EUR pro Sitzung und höchstens drei Sitzungen im Kalenderjahr. Wenn die Rechnung unter dem Sitzungsdeckel liegt, steigt die Erstattung dadurch nicht auf 60 EUR. Maßgeblich bleiben die tatsächlichen Kosten und die erfüllten Voraussetzungen.' },
      { type: 'paragraph', text: 'Drei vollständig anerkannte Sitzungen mit entsprechend hohen Rechnungen ergeben rechnerisch höchstens 180 EUR. Dieser Wert folgt aus drei mal 60 EUR. Er ist kein Behandlungspreis und kein zusätzlicher Anspruch neben dem gemeinsamen Topf. Wenn andere Leistungen diesen Topf bereits beansprucht haben, kann der verbleibende Zuschuss kleiner sein.' },
      { type: 'paragraph', text: '§ 11 SGB V erlaubt zusätzliche Leistungen nach Kassensatzung. Damit ist der Mobil-Zuschuss eine konkrete Satzungsleistung. Die Bedingungen anderer Krankenkassen können anders aussehen. Übertrage deshalb weder die Sitzungszahl noch die Behandlerregel einer anderen Kasse auf deinen Antrag bei Mobil. Prüfe die aktuell geltende Satzung und deine tatsächlich geplante Behandlung zusammen.' }
    ] },
    { id: 'gemeinsamer-topf', heading: 'Warum bedeuten 200 EUR nicht 200 EUR nur für Osteopathie?', blocks: [
      { type: 'paragraph', text: 'Der gemeinsame Jahresrahmen umfasst nach § 10b Absatz 8 die dort genannten Leistungen für Osteopathie, professionelle Zahnreinigung und festsitzende Retainer. Jede Leistungsart behält ihre eigenen Voraussetzungen und Grenzen. Der gemeinsame Betrag hebt die Grenze von drei Sitzungen bis 60 EUR für Osteopathie nicht auf. Ebenso entstehen nicht drei getrennte Töpfe mit jeweils 200 EUR.' },
      { type: 'paragraph', text: 'Ein Rechenbeispiel zeigt den Unterschied: Angenommen, für andere anerkannte Leistungen dieses Topfs sind bereits 120 EUR berücksichtigt. Dann bleiben vom gemeinsamen Rahmen 80 EUR. Das ist eine Annahme über die bereits anerkannte Budgetnutzung, kein erfundener Praxispreis. Auch bei noch vorhandenen Osteopathie-Sitzungen ist der verbleibende gemeinsame Betrag zu beachten.' },
      { type: 'table', mobile: 'cards', caption: 'Kostenrahmen nach Mobil-Satzung, Abruf 7. Oktober 2026',
        head: ['Position', 'Betrag oder Grenze', 'Was daraus folgt'], rows: [
          ['Eine anerkannte Osteopathie-Sitzung', '100 Prozent, höchstens 60 EUR', 'Keine Erstattung oberhalb tatsächlicher anerkannter Kosten'],
          ['Osteopathie im Kalenderjahr', 'Höchstens drei Sitzungen', 'Rechnerisch bis 180 EUR bei entsprechend hohen Rechnungen'],
          ['Gemeinsamer Topf', '200 EUR im Kalenderjahr', 'Osteopathie, Zahnreinigung und festsitzende Retainer teilen ihn'],
          ['Angenommene bereits anerkannte Nutzung', '120 EUR', 'Reines Budgetbeispiel, kein Behandlungspreis'],
          ['Rest im genannten Beispiel', '80 EUR', '200 minus 120 EUR, weitere Sitzungsbedingungen gelten'],
          ['Private Behandlungskosten', 'Nach Kosteninformation der Praxis', 'Kein allgemeiner Praxispreis aus dem Zuschuss ableitbar']
        ], note: 'Rechnerische Oberwerte setzen anerkannte Leistungen und ausreichend hohe tatsächliche Rechnungen voraus. Die Satzung erlaubt keine Übertragung ungenutzter Beträge auf das Folgejahr oder andere Versicherte.' },
      { type: 'paragraph', text: 'Frage vor einer weiteren Behandlung nach dem aktuellen Stand deines gemeinsamen Rahmens. Das ist besonders hilfreich, wenn Rechnungen für Zahnreinigung oder Retainer bereits eingereicht oder noch in Prüfung sind. Eine eigene Liste dient der Orientierung; die Kasse entscheidet, welche Positionen unter den jeweiligen Bedingungen anerkannt werden.' }
    ] },
    { id: 'voraussetzungen', heading: 'Welche Verordnung und Behandlerqualifikation verlangt die Satzung?', blocks: [
      { type: 'paragraph', text: 'Die Osteopathie muss auf ärztlicher Verordnung beruhen. Zusätzlich verlangt die Satzung medizinische Eignung und eine Methode, die nicht durch den G-BA ausgeschlossen ist. Diese Erstattungsvoraussetzung ist keine allgemeine Aussage über die Wirksamkeit jeder osteopathischen Behandlung. Ob die geplante Leistung in deinem Fall passt, klärst du mit der behandelnden Praxis und der Kasse.' },
      { type: 'paragraph', text: 'Der Behandler muss ein zugelassener oder nach § 13 Absatz 4 SGB V berechtigter Leistungserbringer sein. Dazu gehört die in der Satzung genannte Osteopathiequalifikation: Mitgliedschaft in einem Berufsverband der Osteopathen oder eine abgeschlossene Ausbildung, die zum Beitritt berechtigt. Die bloße Berufsbezeichnung ersetzt diese Voraussetzungen nicht.' },
      { type: 'paragraph', text: 'Die Verbandsmitgliedschaft ist dabei nicht die einzige genannte Möglichkeit. Eine entsprechend abgeschlossene Ausbildung mit Beitrittsberechtigung ist ausdrücklich als Alternative aufgeführt. Lass dir vor dem Termin erklären, wie die Praxis diesen Nachweis erfüllt. Kläre eine Unsicherheit vor der Behandlung mit Mobil, damit du deine Kostenentscheidung auf die tatsächlichen Voraussetzungen stützt.' }
    ] },
    { id: 'nachweise', heading: 'Wie reichst du die Rechnung ein und welche Frist gilt?', blocks: [
      { type: 'paragraph', text: 'Für die Erstattung sind die ärztliche Verordnung und die spezifizierte Rechnung des Leistungserbringers vorzulegen. Bewahre die Unterlagen zusammen auf und prüfe, ob die abgerechnete Leistung nachvollziehbar ist. Aus dieser Satzungsregel ergibt sich keine hier beschriebene bestimmte App-Menüfolge. Erfrage den für dich passenden Einreichungsweg direkt bei der Kasse.' },
      { type: 'paragraph', text: 'Die erforderlichen Unterlagen müssen spätestens bis zum Ende des ersten Quartals des Folgejahres vorliegen. Für eine dem Kalenderjahr 2026 zugeordnete Leistung ergibt das den 31. März 2027. Reiche die Unterlagen mit Zeit für Rückfragen ein und bewahre eine Eingangsbestätigung auf, wenn du eine erhältst. Die Empfehlung schafft keine zusätzliche Kassenfrist.' },
      { type: 'paragraph', text: 'Für die Jahreszuordnung stellt die Satzung grundsätzlich auf den tatsächlichen Zeitpunkt der Leistungsinanspruchnahme ab. Bei kalenderjahrübergreifenden Behandlungen ist nach der Regel der Abschluss maßgeblich. Wenn dein Verlauf über den Jahreswechsel geht, kläre die Zuordnung konkret. Die Kasse übernimmt außerdem keine zusätzlichen Kosten für das Ausstellen einer detaillierten Rechnung aus diesem Leistungsweg.' }
    ] },
    { id: 'private-ergaenzung', heading: 'Was solltest du bei einer privaten Ergänzung beachten?', blocks: [
      { type: 'paragraph', text: 'Ein privater Vertrag ist ein eigener Kostenweg neben der Mobil-Satzung. Auf Healio nennt Ambulant 100, AP1, einen Naturheilverfahren-Topf von bis zu 1.000 EUR in zwei Kalenderjahren ab Versicherungsbeginn. Heilpraktiker und Osteopathie werden dort im vereinbarten Umfang gemeinsam berücksichtigt. Ob deine konkrete Rechnung erstattungsfähig ist, richtet sich nach Tarifstufe und Bedingungen. Beginnt der Vertrag im laufenden Kalenderjahr, ist der erste Zweijahreszeitraum kürzer.' },
      { type: 'paragraph', text: 'Die aktuelle Produkt-FAQ nennt keine allgemeine Wartezeit für neue Versicherungsfälle ab dem vereinbarten Beginn. Daraus folgt keine rückwirkende Übernahme eines früheren Falls. Kläre vor dem Antrag und dem Termin außerdem, wie eine Kassenleistung bei deiner konkreten Rechnung berücksichtigt wird. Satzungszuschuss und privater Höchstbetrag werden hier nicht pauschal addiert.' },
      { type: 'paragraph', text: 'Vergleiche den persönlichen Beitrag mit den gewünschten versicherten Leistungen. Die Verbraucherzentrale empfiehlt eine bedarfsbezogene Prüfung privater Ergänzungen. Ein hoher Topf allein ersetzt diese Entscheidung nicht. Bitte die Praxis um konkrete Kosteninformation und stelle den bestätigten Kassenanteil sowie eine tatsächlich bestätigte private Leistung daneben, wenn du deinen verbleibenden Anteil planst.' },
      { type: 'honest', heading: 'Ehrlich gesagt', items: [
        { lead: 'Der gemeinsame Topf kann schon genutzt sein.', text: 'Andere anerkannte Leistungen senken den verbleibenden Rahmen.' },
        { lead: 'Der Zuschuss ist kein Behandlungspreis.', text: 'Die Praxisrechnung kann von dem satzungsmäßigen Sitzungsdeckel abweichen.' },
        { lead: 'Eine Ergänzung braucht eigene Prüfung.', text: 'Neue Fälle, versicherte Behandlung, Beitrag und Kassenanrechnung klärst du anhand deines Vertrags.' }
      ] }
    ] },
    { id: 'vorgehen', heading: 'Was klärst du vor deinem nächsten Termin?', blocks: [
      { type: 'paragraph', text: 'Prüfe zuerst die ärztliche Verordnung und den Behandlernachweis. Frage dann nach der geplanten Behandlung und ihren voraussichtlichen Kosten. § 630c BGB sieht bei Kenntnis oder hinreichenden Anhaltspunkten für unvollständige Kostenübernahme grundsätzlich eine vorherige Kosteninformation in Textform vor; gesetzliche Ausnahmen bleiben bestehen. Diese Information ist keine Erstattungsbewilligung.' },
      { type: 'paragraph', text: 'Kläre anschließend die bereits verbrauchten Sitzungen und den verbleibenden gemeinsamen Jahrestopf. Nach der Behandlung legst du Verordnung und Rechnung zusammen und beachtest die Einreichungsfrist. Falls ein privater Vertrag bestehen soll, prüfst du dessen Beitrag, Beginn und konkrete Leistung separat. So behältst du die unterschiedlichen Kostenwege im Blick.' },
      { type: 'path', to: '/ambulant', icon: 'naturopathy', text: 'Den privaten Naturheilverfahren-Topf passend zu deinem Bedarf prüfen.', label: 'Zum ambulanten Vergleich' },
      { type: 'cards', heading: 'Weitere Ratgeber für deine Kostenentscheidung', items: [
        { title: 'Heilpraktiker und Kosten', text: 'Private Kosten und unterschiedliche Kostenträger verstehen.', to: '/ratgeber/heilpraktiker-kosten', icon: 'money', linkLabel: 'Zur Übersicht' },
        { title: 'Osteopathie bei der Krankenkasse', text: 'Satzungsleistungen verschiedener Kassen vergleichen.', to: '/ratgeber/osteopathie-krankenkasse', icon: 'comparison', linkLabel: 'Ratgeber lesen' },
        { title: 'Osteopathie und Kosten', text: 'Kostenplanung vor einer privaten Behandlung.', to: '/ratgeber/osteopathie-kosten', icon: 'document', linkLabel: 'Ratgeber lesen' },
        { title: 'Private Zusatzversicherung für Osteopathie', text: 'Vertrag, Behandler und Erstattungsgrenzen prüfen.', to: '/ratgeber/zusatzversicherung-osteopathie', icon: 'ambulant', linkLabel: 'Ratgeber lesen' }
      ] }
    ] }
  ],
  factNugget: "Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Mobil begrenzt Osteopathie auf drei Sitzungen bis jeweils 60 EUR im Kalenderjahr. Die rechnerischen 180 EUR stehen zugleich innerhalb eines gemeinsamen 200-EUR-Rahmens mit Zahnreinigung und festsitzenden Retainern. Eine bereits anerkannte andere Nutzung kann deshalb den verbleibenden Osteopathie-Zuschuss verringern.",
  faqs: [
    { question: 'Kann ich 200 EUR allein für Osteopathie erhalten?', answer: 'Der gemeinsame Jahresrahmen beträgt 200 EUR, aber Osteopathie hat eine eigene Grenze von drei Sitzungen bis 60 EUR. Daraus ergeben sich rechnerisch höchstens 180 EUR, wenn alle Bedingungen und Rechnungen passen und der gemeinsame Rahmen ausreicht.' },
    { question: 'Reicht die Mitgliedschaft in einem Osteopathieverband?', answer: 'Die Satzung verlangt auch den berechtigten Leistungserbringer und die weiteren Voraussetzungen. Verbandsmitgliedschaft oder eine abgeschlossene Ausbildung mit Beitrittsberechtigung sind die genannten Qualifikationswege. Lass den gesamten Nachweis vor dem Termin prüfen.' },
    { question: 'Brauche ich eine ärztliche Verordnung?', answer: 'Die Mobil-Satzung verlangt die ärztliche Verordnung für diesen Osteopathieweg. Für die Erstattung ist sie zusammen mit der spezifizierten Rechnung vorzulegen.' },
    { question: 'Bis wann müssen die Unterlagen vorliegen?', answer: 'Spätestens bis zum Ende des ersten Quartals des Folgejahres. Bei Zuordnung zum Kalenderjahr 2026 ist das der 31. März 2027. Bei Behandlung über den Jahreswechsel klärst du die maßgebliche Jahreszuordnung gesondert.' },
    { question: 'Wird ungenutztes Budget ins nächste Jahr übertragen?', answer: 'Die Satzung erlaubt für diesen gemeinsamen Rahmen keine Übertragung auf das Folgejahr oder andere Versicherte. Die Einreichungsfrist im Folgejahr verändert diese Jahresgrenze nicht.' }
  ],
  sources: { checkedAt: '2026-10-07', checkedAtLabel: '7. Oktober 2026',
    intro: 'Sitzungsgrenzen, gemeinsamer Topf und Nachweise anhand der Originalsatzung geprüft; private Ergänzung getrennt eingeordnet.',
    items: [
      {"label": "SDK AP-Tarife: Naturheilverfahren und Wartezeiten", "publisher": "SDK", "href": "https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf", "stand": "1.753a/01.23, Stand 1. Januar 2023, I.5/6/10 und II; frisch 07.10.2026 abgeglichen", "accessedAt": "07.10.2026"},
      { label: 'Satzung, § 10b Absatz 8', publisher: 'Mobil Krankenkasse', href: 'https://mobil-krankenkasse.de/dam/jcr:a3a5e774-f11a-4137-abf1-9e0bace283bf/Satzung%20i.%20d.%20F.%20d.%20Nachtr%C3%A4ge%20Nr.%2037%20bis%20Nr.%2039_Stand%2001.01.2026.pdf', stand: '1. Januar 2026, Nachträge 37 bis 39', accessedAt: '07.10.2026' },
      { label: 'Zusätzliche Satzungsleistungen, § 11 SGB V', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html', stand: 'Geltende Fassung, Absatz 6', accessedAt: '07.10.2026' },
      { label: 'Kosteninformation, § 630c BGB', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/bgb/__630c.html', stand: 'Geltende Fassung', accessedAt: '07.10.2026' },
      { label: 'Private Ergänzungen nach Bedarf vergleichen', publisher: 'Verbraucherzentrale', href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425', stand: '19. August 2025', accessedAt: '07.10.2026' },
      { label: 'Aktuelle Naturheilverfahren-Töpfe und Beginn', publisher: 'Healio', href: 'https://healio.de/ambulant', stand: 'Live-Abruf 7. Oktober 2026', accessedAt: '07.10.2026' }
    ]
  },
  "footnote": "Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen vom 7. Oktober 2026. Maßgeblich sind die gesetzlichen Voraussetzungen, die aktuelle Kassensatzung und bei privaten Verträgen die vereinbarten Bedingungen."
};
