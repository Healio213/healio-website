/**
 * SEO-Umsetzung 14.10.2026, Thema C3 (Healio/Marktanalyse-2026-10/semrush/
 * UMSETZUNG-AUFTRAG-2026-10-14.md). Suchbegriffe „zahnreinigung krankenkasse“
 * (480) und „professionelle zahnreinigung krankenkasse“ (260).
 *
 * Abgrenzung zu professionelle-zahnreinigung-kosten (Kosten nach GOZ und
 * Tabelle aller 27 Kassen): Diese Seite beantwortet die Kassenfrage kurz,
 * zeigt die großen Kassen mit Satzungsfundstelle und verweist für die
 * vollständige Liste und die Kassenseiten weiter.
 *
 * Kassenwerte nur aus Satzungen mit Stand (wie professionelle-zahnreinigung-
 * kosten.js und den Kassenseiten tk-, dak-, aok-, barmer-, ikk-zahnreinigung,
 * Abruf 06. und 07.10.2026). TK-Leistungsseite (Stand 01.07.2026) und
 * BARMER-Leistungsseite (Stand 13.10.2026) am 14.10.2026 erneut gelesen.
 * Tarifaussagen wortgleich mit src/components/sections/dental/dentalContent.js.
 */
export const article = {
  slug: 'zahnreinigung-krankenkasse',
  kind: 'ratgeber',
  group: 'zaehne',
  metaTitle: 'Zahnreinigung: Was zahlt die Krankenkasse? | Healio',
  metaDescription: 'Zahnreinigung und Krankenkasse: Was TK, BARMER, DAK, AOK und IKK classic laut Satzung zur PZR zahlen, wie du den Zuschuss bekommst und was ein Zahntarif leistet.',
  publishedAt: '2026-10-14',
  publishedAtLabel: '14. Oktober 2026',
  readingTimeMinutes: 7,
  listTitle: 'Zahnreinigung: Was zahlt die Krankenkasse?',
  listTeaser: 'Regelleistung, Satzungszuschuss oder Bonus: was die großen Kassen zur professionellen Zahnreinigung geben.',
  headline: 'Zahnreinigung: Was zahlt die Krankenkasse?',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'dental',
    facts: [
      { value: '1-mal im Jahr', label: 'zahlt die Kasse die Zahnsteinentfernung als Regelleistung' },
      { value: 'bis zu 40 EUR', label: 'gibt die TK laut Satzung jährlich zur PZR dazu' },
      { value: '60 EUR', label: 'im Kalenderjahr zahlt die DAK laut Satzung zur PZR' }
    ],
    text: 'Die professionelle Zahnreinigung ist keine Regelleistung. Viele Kassen geben über ihre Satzung einen Zuschuss, andere nur über das Bonusprogramm.',
    path: { to: '/zahn#zahn-check', text: 'Zahnreinigung im Tarif mitversichern?', label: 'Zahn-Check starten' }
  },
  lead: 'Die gesetzliche Krankenkasse zahlt einmal im Jahr die Zahnsteinentfernung. Die professionelle Zahnreinigung, kurz PZR, gehört nicht zu den Regelleistungen. Viele Kassen geben trotzdem etwas dazu, entweder als Satzungsleistung oder über ihr Bonusprogramm. Wie viel das ist, unterscheidet sich stark. Hier siehst du die großen Kassen im Überblick und wie du den Zuschuss bekommst.',
  sections: [
    {
      id: 'regelleistung',
      heading: 'Zahlt die Krankenkasse die professionelle Zahnreinigung?',
      blocks: [
        { type: 'paragraph', text: 'Als Regelleistung nicht. Laut KZBV ist die Prophylaxe mit PZR keine regelhafte Leistung der gesetzlichen Krankenversicherung. Die Kasse bezahlt dafür die Zahnsteinentfernung, einmal im Kalenderjahr (BEMA-Nummer 107). Bei Versicherten mit Pflegegrad oder Eingliederungshilfe ist sie einmal im Kalenderhalbjahr möglich (BEMA-Nummer 107a).' },
        { type: 'paragraph', text: 'Die PZR geht weiter: Die Praxis entfernt Beläge auch in den Zwischenräumen, poliert die Oberflächen und fluoridiert. Abgerechnet wird nach der privaten Gebührenordnung für Zahnärzte ab, Nummer 1040. Laut KZBV kostet eine Sitzung bei durchschnittlichem Aufwand 80 bis 120 EUR.' },
        { type: 'paragraph', text: 'Darüber hinaus dürfen Kassen in ihrer Satzung Zuschüsse zur Zahnbehandlung vorsehen (§ 11 Abs. 6 SGB V). Eine Pflicht ist das nicht. Deshalb zahlt die eine Kasse 60 EUR im Jahr und die andere nichts.' }
      ]
    },
    {
      id: 'grosse-kassen',
      heading: 'Was zahlen TK, BARMER, DAK, AOK und IKK classic?',
      blocks: [
        { type: 'paragraph', text: 'Die fünf großen Kassen regeln die Zahnreinigung sehr unterschiedlich. Die TK, die DAK und die IKK classic zahlen einen festen Satzungszuschuss. Die BARMER hat für Erwachsene keinen allgemeinen Zuschuss in der Satzung, dort läuft die Reinigung über das Bonusprogramm. Bei der AOK hat jede regionale Kasse ihre eigene Satzung.' },
        { type: 'table', mobile: 'cards', caption: 'Zuschuss zur professionellen Zahnreinigung laut Satzung, große Kassen',
          head: ['Kasse', 'Zuschuss', 'Bedingungen', 'Fundstelle und Stand'],
          rows: [
            ['TK', 'bis zu 40 EUR im Kalenderjahr', 'ab 18 Jahren, nachgewiesene Kosten, Zahnarztpraxis', '§ 27o, 130. Nachtrag, 17.04.2026'],
            ['BARMER', 'kein allgemeiner Satzungszuschuss', 'Bonuspunkte als Zuschuss zur PZR, in der Schwangerschaft eigene Regel', '§ 28d, 38. Nachtrag, 21.07.2026'],
            ['DAK-Gesundheit', '60 EUR im Kalenderjahr', 'Rechnungen des Vorjahres bis 31. März einreichen', '§ 19 Abs. 6, 66. Nachtrag, 01.08.2026'],
            ['IKK classic', 'bis zu 40 EUR im Kalenderjahr', 'Zahl der Sitzungen nicht begrenzt, Rechnung einreichen', '§ 34j Abs. 2, Stand 01.08.2026'],
            ['AOK', 'je nach Region kein Zuschuss bis 120 EUR im Jahr', 'eigene Satzung je AOK, teils Altersgrenzen und geteilte Töpfe', 'elf Satzungen, Stand 2026']
          ],
          note: 'Zuschüsse sind Höchstbeträge und nie mehr als deine Rechnung. Maßgeblich ist die aktuelle Satzung deiner Kasse.' },
        { type: 'table', mobile: 'cards', caption: 'Beispiele regionaler AOKs laut Satzung',
          head: ['AOK', 'Zuschuss', 'Fundstelle und Stand'],
          rows: [
            ['AOK Hessen', 'zweimal je bis zu 60 EUR, bis zu 120 EUR im Jahr, ab 18 Jahren', '§ 16, Lesefassung 01.07.2026'],
            ['AOK Bayern', 'zweimal je bis zu 50 EUR, bis zu 100 EUR im Jahr, ab 15 Jahren', '§ 10o, 71. Nachtrag, 27.02.2026'],
            ['AOK Niedersachsen', '80 % der Rechnung, zwei Behandlungen im Jahr, Gesamtdeckel 500 EUR mit weiteren Leistungen', '§ 10g, 142. Änderung, 10.03.2026'],
            ['AOK Baden-Württemberg', 'kein Zuschuss in der Satzung', '97. Satzungsänderung, 01.01.2026']
          ],
          note: 'Alle elf AOKs mit Bedingungen stehen im Ratgeber zur AOK-Zahnreinigung.' },
        { type: 'segments', segments: [
          { text: 'Mehr zu den einzelnen Kassen: ' },
          { text: 'TK Zahnreinigung', to: '/ratgeber/tk-zahnreinigung' },
          { text: ' und ' },
          { text: 'AOK Zahnreinigung', to: '/ratgeber/aok-zahnreinigung' },
          { text: '. Die Tabelle mit 27 Kassen steht im Ratgeber ' },
          { text: 'Professionelle Zahnreinigung: Kosten', to: '/ratgeber/professionelle-zahnreinigung-kosten' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'zuschuss-holen',
      heading: 'Wie bekommst du den Zuschuss von deiner Kasse?',
      blocks: [
        { type: 'paragraph', text: 'Mit der Rechnung. Du bezahlst die Reinigung in der Praxis, lässt dir eine ordentliche Rechnung nach GOZ geben und reichst sie bei deiner Kasse ein, meist per App oder Upload. Die Kasse erstattet dann den Zuschuss bis zur Höhe ihrer Satzung.' },
        { type: 'steps', heading: 'In vier Schritten zum Zuschuss', items: [
          { title: 'Satzung prüfen', text: 'Schau nach Betrag, Altersgrenze und ob der Topf mit anderen Leistungen geteilt wird.' },
          { title: 'Rechnung verlangen', text: 'Eine Pauschale für mehrere Reinigungen im Voraus ist laut Verbraucherzentrale unzulässig.' },
          { title: 'Fristen beachten', text: 'Die DAK nimmt Rechnungen des Vorjahres bis zum 31. März an, andere Kassen haben eigene Fristen.' },
          { title: 'Bonus mitnehmen', text: 'Bei manchen Kassen zählt die Reinigung zusätzlich im Bonusprogramm.' }
        ] }
      ]
    },
    {
      id: 'bonus',
      heading: 'Was ist der Unterschied zwischen Satzungszuschuss und Bonusprogramm?',
      blocks: [
        { type: 'paragraph', text: 'Ein Satzungszuschuss ist eine Mehrleistung zur konkreten Rechnung. Ein Bonusprogramm nach § 65a SGB V belohnt dagegen gesundheitsbewusstes Verhalten wie Vorsorgeuntersuchungen oder Sport. Bei der BARMER kannst du Bonuspunkte laut Leistungsseite als Zuschuss zur PZR einsetzen. Einen allgemeinen Satzungszuschuss für Erwachsene hat sie nicht.' },
        { type: 'paragraph', text: 'Viele Kassen zahlen ihren Bonus wahlweise auch als zweckgebundenen Zuschuss zu einer privaten Zusatzversicherung. Damit lässt sich der Beitrag eines Zahntarifs mittragen, der die Reinigung regelmäßig übernimmt. Wie viel das bringt, hängt von deiner Kasse und deinen Aktivitäten ab. Gegenzurechnen ist immer der Zusatzbeitrag, und du kannst jede Kasse wählen.' }
      ]
    },
    {
      id: 'zahntarif',
      heading: 'Zahlt eine Zahnzusatzversicherung die Zahnreinigung?',
      blocks: [
        { type: 'paragraph', text: 'Das hängt vom Tarif ab. Bei der UKV ZahnPRIVAT gibt es die professionelle Zahnreinigung in den Top-Stufen. ZahnPRIVAT 100 hat keine Wartezeiten und leistet für die professionelle Zahnreinigung ohne Jahresdeckel. Der Tarif erstattet 100 % der erstattungsfähigen Kosten nach Abzug der Kassenleistung, auch wenn die Kasse nicht vorleistet. In Stufe 75 gilt eine eigene Jahresgrenze.' },
        { type: 'costCard', title: 'Zwei Zahnreinigungen im Jahr', icon: 'calculator',
          tariffLabel: 'Beispiel für das Kalenderjahr 2026 mit UKV ZahnPRIVAT 100, Satzungsstand Oktober 2026, für eine Person ab 18 Jahren.',
          caption: 'Kostenkarte: zwei Zahnreinigungen zu je 100 EUR',
          head: ['Beispiel', 'Kasse zahlt', 'Du ohne Tarif', 'Du mit Tarif'],
          rows: [
            ['DAK, zwei Reinigungen zu je 100 EUR', '60 EUR im Jahr', '140 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['TK, zwei Reinigungen zu je 100 EUR', 'bis zu 40 EUR im Jahr', '160 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest'],
            ['AOK Baden-Württemberg, zwei Reinigungen zu je 100 EUR', 'kein Satzungszuschuss', '200 EUR', 'Der Tarif erstattet den erstattungsfähigen Rest']
          ],
          note: 'Beispiel, keine Preisangabe. 100 EUR je Sitzung liegt in der KZBV-Spanne von 80 bis 120 EUR. Kassenzuschuss laut Satzung DAK (§ 19 Abs. 6, 66. Nachtrag), TK (§ 27o, 130. Nachtrag) und AOK Baden-Württemberg (97. Satzungsänderung). Was im Einzelfall erstattungsfähig ist, steht in den Tarifbedingungen.',
          bonusNote: 'Dein Kassenbonus kann den Beitrag mittragen: Viele Kassen zahlen ihn auf Wunsch als Zuschuss zu einer Zusatzversicherung. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.' },
        { type: 'paragraph', text: 'Schau bei jedem Tarif auf den Deckel. Laut Verbraucherzentrale ist die Reinigung in vielen Tarifen gedeckelt, zum Beispiel auf 100 EUR im Kalenderjahr. Und wie bei jedem Zahntarif gilt: Was in den letzten 2 Jahren angeraten wurde oder schon läuft, ist nicht versichert.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Die Kassenwerte sind eine Momentaufnahme.', text: 'Kassen können ihre Satzung ändern. Maßgeblich ist der Stand bei deiner Rechnung.' },
          { lead: 'Ob eine PZR für dich sinnvoll ist, entscheidet deine Praxis.', text: 'Ob sie besser schützt als die Zahnsteinentfernung, lässt sich laut IQWiG derzeit nicht eindeutig beurteilen.' },
          { lead: 'Ein Zahntarif ist für künftige Kosten da.', text: 'Angeratene oder laufende Behandlungen der letzten 2 Jahre sind nicht versichert.' }
        ] },
        { type: 'path', to: '/zahn#zahn-check', icon: 'dental', text: 'Vier kurze Fragen, dann siehst du, welcher Zahntarifweg zu dir passt.', label: 'Zahn-Check starten' },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Zahnersatz Kosten', text: 'Was die Kasse beim Zahnarzt zahlt und was bei dir bleibt.', to: '/ratgeber/zahnersatz-kosten', icon: 'comparison', linkLabel: 'Zur Übersicht' },
          { title: 'Zahnzusatzversicherung mit Zahnreinigung 2026', text: 'Welche Zahntarife die PZR zahlen und mit welchem Deckel.', to: '/ratgeber/zahnzusatzversicherung-zahnreinigung-2026', icon: 'dental', linkLabel: 'Ratgeber lesen' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Die gesetzliche Kasse zahlt einmal im Jahr die Zahnsteinentfernung; die professionelle Zahnreinigung ist keine Regelleistung. Viele Kassen geben laut Satzung einen Zuschuss, etwa die TK bis zu 40 EUR und die DAK 60 EUR im Kalenderjahr. Für die Zähne vermittelt Healio die UKV ZahnPRIVAT; ZahnPRIVAT 100 leistet für die Reinigung ohne Jahresdeckel.',
  faqs: [
    { question: 'Wie oft zahlt die Krankenkasse die Zahnreinigung?', answer: 'Die Zahnsteinentfernung zahlt die Kasse einmal im Kalenderjahr als Regelleistung. Für die professionelle Zahnreinigung gibt es nur einen Satzungszuschuss, je nach Kasse für eine oder zwei Reinigungen im Jahr, oder gar keinen.' },
    { question: 'Welche Krankenkasse zahlt die professionelle Zahnreinigung?', answer: 'Viele Kassen zahlen einen Zuschuss über ihre Satzung, etwa die TK bis zu 40 EUR, die DAK 60 EUR und die IKK classic bis zu 40 EUR im Kalenderjahr. Einige AOKs zahlen mehr, die AOK Hessen bis zu 120 EUR im Jahr. Die BARMER hat für Erwachsene keinen allgemeinen Satzungszuschuss.' },
    { question: 'Zahlt die BARMER die professionelle Zahnreinigung?', answer: 'Nicht als allgemeine Satzungsleistung. Laut BARMER kannst du Bonuspunkte als Zuschuss zur PZR einsetzen, in der Schwangerschaft gibt es eine eigene Regel.' },
    { question: 'Wie reiche ich die Rechnung bei der Krankenkasse ein?', answer: 'Lass dir eine Rechnung nach GOZ geben und reiche sie per App, Upload oder Post bei deiner Kasse ein. Achte auf die Frist, bei der DAK etwa bis zum 31. März des Folgejahres.' },
    { question: 'Lohnt sich eine Zahnzusatzversicherung für die Zahnreinigung?', answer: 'Wenn die Reinigung bei dir regelmäßig dazugehört, ist ein Tarif mit PZR ein Vergleichsweg. Bei der UKV ZahnPRIVAT 100 gibt es die Reinigung ohne Jahresdeckel. Rechne den Beitrag gegen deine Kosten und deinen möglichen Kassenbonus.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Welcher Zahnweg zu dir passt, siehst du in einer Minute auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: '. Welche Kasse mit Zuschuss und Bonus zu dir passt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-14',
    checkedAtLabel: '14. Oktober 2026',
    intro: 'Kassenleistung, Satzungszuschüsse, Kosten und Tarifangaben stammen aus diesen Quellen.',
    items: [
      { label: 'Professionelle Zahnreinigung (Patienteninfo)', publisher: 'KZBV', href: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/professionelle-zahnreinigung/', stand: 'Mai 2025', accessedAt: '14.10.2026' },
      { label: 'BEMA, Nr. 107 und 107a', publisher: 'KZBV', href: 'https://www.kzbv.de/wp-content/uploads/KZBV_BEMA_2026-01-01.pdf', stand: '01.01.2026', accessedAt: '06.10.2026' },
      { label: 'SGB V § 11 Abs. 6', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/sgb_5/__11.html', stand: 'Geltende Fassung', accessedAt: '14.10.2026' },
      { label: 'Zahlt die TK die professionelle Zahnreinigung?', publisher: 'Techniker Krankenkasse', href: 'https://www.tk.de/techniker/versicherung/tk-leistungen/zaehne/zahnvorsorge-und-bonusheft/zahlt-tk-professionelle-zahnreinigung-2002368', stand: '01.07.2026', accessedAt: '14.10.2026' },
      { label: 'Satzung der TK, § 27o', publisher: 'Techniker Krankenkasse', href: 'https://www.tk.de/resource/blob/2077108/5892771f11e082ade44439e64bbda68c/tk-satzung-data.pdf', stand: '130. Nachtrag, 17.04.2026', accessedAt: '07.10.2026' },
      { label: 'Professionelle Zahnreinigung', publisher: 'BARMER', href: 'https://www.barmer.de/unsere-leistungen/leistungen-a-z/zahngesundheit/professionelle-zahnreinigung-1055474', stand: '13.10.2026', accessedAt: '14.10.2026' },
      { label: 'Satzung der BARMER', publisher: 'BARMER', href: 'https://www.barmer.de/resource/blob/1022552/b2c26cec88be1e70caad268f9961fd09/barmer-satzung-der-barmer-barrierefrei-19-data.pdf', stand: '38. Nachtrag, 21.07.2026', accessedAt: '07.10.2026' },
      { label: 'Satzung der DAK-Gesundheit, § 19 Abs. 6', publisher: 'DAK-Gesundheit', href: 'https://caas.content.dak.de/caas/v1/media/154844/data/8ba8688d145d424a196e94b034a00ed7/satzung-der-dak-gesundheit-in-der-fassung-des-66-nachtrag-stand-01-08-2026.pdf', stand: '66. Nachtrag, Stand 01.08.2026', accessedAt: '07.10.2026' },
      { label: 'Satzung der IKK classic, § 34j', publisher: 'IKK classic', href: 'https://cdn.ikk-classic.de/exporter/19885-satzung-kv-incl-sana-78-80-20260801.pdf', stand: 'Stand 01.08.2026', accessedAt: '07.10.2026' },
      { label: 'Satzung AOK Hessen', publisher: 'AOK', href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/hessen/pdf/satzung-kv.pdf', stand: 'Lesefassung 01.07.2026', accessedAt: '07.10.2026' },
      { label: 'Satzung AOK Bayern', publisher: 'AOK', href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/bayern/pdf/noindex/Satzung/satzung.pdf', stand: '71. Nachtrag, 27.02.2026', accessedAt: '07.10.2026' },
      { label: 'Satzung AOK Niedersachsen', publisher: 'AOK', href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/niedersachsen/pdf/Satzung_AOK_Niedersachsen.pdf', stand: '142. Änderung vom 10.03.2026', accessedAt: '06.10.2026' },
      { label: 'Satzung AOK Baden-Württemberg', publisher: 'AOK', href: 'https://www.aok.de/pk/magazin/cms/fileadmin/pk/baden-wuerttemberg/pdf/Satzung.pdf', stand: '97. Änderung, 01.01.2026', accessedAt: '07.10.2026' },
      { label: 'Was kostet eine professionelle Zahnreinigung?', publisher: 'Verbraucherzentrale', href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerztinnen-und-kliniken/was-kostet-eine-professionelle-zahnreinigung-12916', stand: '28.05.2024', accessedAt: '06.10.2026' },
      { label: 'Zahnzusatzversicherung, Risiken und Vorteile', publisher: 'Verbraucherzentrale', href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zahnzusatzversicherung-risiken-und-vorteile-41293', stand: '23.07.2026', accessedAt: '14.10.2026' },
      { label: 'Welche Vor- und Nachteile hat die professionelle Zahnreinigung?', publisher: 'IQWiG (gesundheitsinformation.de)', href: 'https://www.gesundheitsinformation.de/welche-vor-und-nachteile-hat-die-professionelle-zahnreinigung.html', stand: '23.08.2023', accessedAt: '06.10.2026' },
      { label: 'Tarifunterlagen UKV ZahnPRIVAT, wie auf healio.de/zahn', publisher: 'UKV', href: 'https://healio.de/zahn', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Kassenzuschüsse nach dem Stand der Satzungen im Oktober 2026, Kosten nach den genannten Quellen. Maßgeblich sind immer die Satzung deiner Kasse und die Bedingungen des Versicherers.'
};
