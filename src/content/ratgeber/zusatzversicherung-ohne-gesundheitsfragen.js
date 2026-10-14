/**
 * SEO-Umsetzung 14.10.2026, Thema C1 (Healio/Marktanalyse-2026-10/semrush/
 * UMSETZUNG-AUFTRAG-2026-10-14.md). Suchbegriffe „krankenzusatzversicherung
 * ohne gesundheitsfragen“ (880) und „krankenhauszusatzversicherung ohne
 * gesundheitsfragen“ (3.600).
 *
 * Frank-Freigabe 14.10.2026: „ohne Gesundheitsfragen“ darf hier ausschließlich
 * als Suchfrage in Anführungszeichen stehen, die aufgeklärt wird. Die
 * Prüfskript-Ausnahme gilt nur für diesen Slug (scripts/check-ratgeber-
 * contract.mjs, OHNE_GF_AUSNAHME). Kein Versprechen für einen Tarif.
 *
 * Belege:
 *   - Verbraucherzentrale 10425 (Stand 19.08.2025): „Fast ausnahmslos ist eine
 *     Gesundheitsprüfung erforderlich“, Ablehnung aus triftigen Gründen,
 *     Zuschläge, Ausschlüsse, Leistungsgrenzen in den ersten Jahren.
 *   - SDK AP-Tarife: Gesundheitsprüfung, grundsätzlich keine Ablehnung,
 *     Zuschlag oder einzelner Ausschluss möglich, keine allgemeine Wartezeit,
 *     laufende oder angeratene Behandlungen ausgenommen. Wortgleich mit
 *     src/components/sections/ambulant/ambulantFaqs.js und
 *     AmbulantAufEinenBlick.jsx (healio.de/ambulant), AVB 1.753a.
 *   - UKV VorsorgePRIVAT: Antrag fragt nach Sehhilfe und Gehör (ambulantFaqs.js,
 *     VKB-Material 322611). Kein Naturheiltarif der UKV nennen.
 *   - ARAG V100: keine Ablehnung wegen Vorerkrankungen, 3 Monate allgemeine
 *     Wartezeit, Tarifkatalog Vorsorge, kein gleichartiger Schutz bei einem
 *     anderen privaten Versicherer (AmbulantAragVorsorge.jsx, Antrag A842).
 *   - Krankenhaus: SP1 und SP2 mit Gesundheitsfragen, SPU nur Unfall und ohne
 *     Gesundheitsprüfung laut stationaer.json; keine Annahmezusage.
 *   - Zahn: UKV-Regeln wortgleich mit dentalContent.js und zahn.json.
 * Datenschutz: Seite steht in den Sperrlisten (google-ads.js, analytics.js,
 * meta-pixel.js, api/meta-events.js), weil Leser Vorerkrankungen mitbringen.
 */
export const article = {
  slug: 'zusatzversicherung-ohne-gesundheitsfragen',
  kind: 'ratgeber',
  group: 'ambulant',
  metaTitle: 'Zusatzversicherung „ohne Gesundheitsfragen“? Was gilt | Healio',
  metaDescription: 'Zusatzversicherung „ohne Gesundheitsfragen“: Was Tarife wirklich fragen, wo es keine Ablehnung gibt und warum laufende Behandlungen nicht versichert sind.',
  publishedAt: '2026-10-14',
  publishedAtLabel: '14. Oktober 2026',
  readingTimeMinutes: 8,
  listTitle: 'Zusatzversicherung ohne Ablehnung',
  listTeaser: 'Was hinter der Suche nach Tarifen ohne Fragen steckt und welche Tarife Vorerkrankte trotzdem aufnehmen.',
  headline: 'Zusatzversicherung ohne Ablehnung: Was hinter „ohne Gesundheitsfragen“ wirklich steckt',
  author: 'frank-steinfurt',
  toc: 'auto',
  faqStyle: 'accordion',
  quickAnswer: {
    title: 'Das Wichtigste in Kürze',
    icon: 'document',
    facts: [
      { value: 'Fast immer', label: 'fragt eine Zusatzversicherung nach deiner Gesundheit' },
      { value: 'Keine Ablehnung', label: 'wegen Vorerkrankungen im ambulanten SDK-Tarif' },
      { value: 'Ab Beginn', label: 'nur neue Fälle, laufende Behandlungen bleiben draußen' }
    ],
    text: 'Gesundheitsfragen stellt fast jeder Tarif. Was Vorerkrankte wirklich brauchen, ist ein Tarif ohne Ablehnung. Den gibt es im ambulanten Tarif der SDK. Du beantwortest Gesundheitsfragen, wirst aber grundsätzlich nicht abgelehnt.',
    path: { to: '/ambulant#tarifwahl', text: 'Beitrag nach Alter und Stufe ausrechnen', label: 'Zum ambulanten Rechner' }
  },
  lead: 'Wer „ohne Gesundheitsfragen“ sucht, will meistens nur eins: trotz Vorerkrankung aufgenommen werden. Tarife, die wirklich gar nicht fragen, sind die Ausnahme und meist eng geschnitten. Besser ist oft ein Tarif, der fragt und trotzdem nicht ablehnt. Hier erfährst du, wo es das gibt, was ein Zuschlag bedeutet und warum eine schon laufende Behandlung in keinem neuen Vertrag steckt.',
  sections: [
    {
      id: 'suchfrage',
      heading: 'Gibt es eine Zusatzversicherung „ohne Gesundheitsfragen“?',
      blocks: [
        { type: 'paragraph', text: 'Selten. Die Verbraucherzentrale schreibt zu privaten Zusatzversicherungen: Fast ausnahmslos ist eine Gesundheitsprüfung erforderlich. Der Versicherer will wissen, welches Risiko er übernimmt, und fragt deshalb im Antrag nach Beschwerden, Behandlungen und Befunden der letzten Jahre.' },
        { type: 'paragraph', text: 'Fragt ein Tarif nicht nach der Gesundheit, muss er das Risiko an anderer Stelle begrenzen. Prüfe dann besonders genau, wie er das tut: über einen engen Leistungsumfang, eine Wartezeit, niedrige Höchstbeträge in den ersten Jahren oder den Ausschluss von allem, was vor Vertragsbeginn schon bekannt war. Ein Beispiel aus dem Healio-Angebot ist der Klinik-Tarif SPU der SDK. Er verzichtet auf die Gesundheitsprüfung, leistet aber ausschließlich nach einem Unfall.' },
        { type: 'paragraph', text: 'Für die meisten Suchenden ist die Frage nach den Fragen deshalb die falsche. Entscheidend ist, was mit deinen Antworten passiert. Ein Tarif, der fragt und trotzdem aufnimmt, bringt dir oft mehr Leistung als ein Tarif, der nicht fragt und dafür wenig zahlt.' }
      ]
    },
    {
      id: 'ablehnung',
      heading: 'Was ist der Unterschied zwischen Gesundheitsfragen und Ablehnung?',
      blocks: [
        { type: 'paragraph', text: 'Die Fragen sind nur der erste Schritt. Mit deinen Antworten entscheidet der Versicherer, ob und zu welchen Bedingungen er dich aufnimmt. Laut Verbraucherzentrale dürfen private Versicherer aus triftigen Gründen ablehnen, etwa wegen einer Vorerkrankung. Statt abzulehnen, können Versicherer auch einen Risikozuschlag verlangen oder einzelne Risiken ausschließen.' },
        { type: 'table', mobile: 'cards', caption: 'Was nach den Gesundheitsfragen passieren kann',
          head: ['Ergebnis', 'Was es bedeutet', 'Worauf du achtest'],
          rows: [
            ['Annahme zum normalen Beitrag', 'Du bist zu den Tarifbedingungen versichert', 'Neue Fälle ab Versicherungsbeginn'],
            ['Annahme mit Risikozuschlag', 'Du zahlst einen höheren Beitrag', 'Gesamtbeitrag gegen Leistung rechnen'],
            ['Annahme mit Ausschluss', 'Eine bestimmte Erkrankung ist nicht versichert', 'Was außerhalb des Ausschlusses bleibt'],
            ['Ablehnung', 'Kein Vertrag zu diesem Tarif', 'Gibt es einen Tarif ohne Ablehnung?']
          ],
          note: 'Grundlage: Verbraucherzentrale, Zusatzversicherungen zur gesetzlichen Krankenversicherung, Stand 19.08.2025. Welche Folge eintritt, steht im konkreten Angebot des Versicherers.' },
        { type: 'paragraph', text: 'Wer eine Vorerkrankung hat, sucht also eigentlich einen Tarif ohne Ablehnung. Ein Zuschlag oder ein einzelner Ausschluss ist dann oft der bessere Tausch als ein Vertrag mit wenig Leistung, der gar nicht erst fragt.' }
      ]
    },
    {
      id: 'ambulant',
      heading: 'Welche ambulanten Tarife lehnen wegen Vorerkrankungen nicht ab?',
      blocks: [
        { type: 'paragraph', text: 'Im ambulanten SDK-Tarif, den Healio vermittelt, beantwortest du Gesundheitsfragen vollständig und wahrheitsgemäß. Abgelehnt wirst du deshalb grundsätzlich nicht, auch nicht mit Vorerkrankungen. Je nach Angaben kann ein Risikozuschlag dazukommen, in Einzelfällen auch ein Ausschluss für eine bestimmte Erkrankung. Eine allgemeine Wartezeit gibt es in den SDK-AP-Tarifen nicht.' },
        { type: 'paragraph', text: 'In der höchsten Stufe Ambulant 100 (AP1) stehen bis zu 3.000 EUR in zwei Jahren bereit, verteilt auf vier eigene Töpfe: 1.000 EUR für Naturheilverfahren wie Heilpraktiker und Osteopathie, 500 EUR für Sehhilfen, 500 EUR für Vorsorge und 1.000 EUR für Hilfsmittel und gesetzliche Zuzahlungen. Das ist kein frei verfügbares Guthaben, erstattet werden versicherte Rechnungen nach den Tarifbedingungen.' },
        { type: 'table', mobile: 'cards', caption: 'Ambulante Wege bei Healio, Stand 14. Oktober 2026',
          head: ['Tarif', 'Gesundheitsangaben', 'Wartezeit und Grenzen'],
          rows: [
            ['SDK Ambulant (AP1, AP9, AP7, AP5)', 'Gesundheitsfragen ohne Ablehnung, Zuschlag oder einzelner Ausschluss möglich', 'Keine allgemeine Wartezeit, vier Töpfe je zwei Kalenderjahre'],
            ['UKV VorsorgePRIVAT, zubuchbar', 'Der Antrag fragt nach Sehhilfe und Gehör', 'Keine allgemeine Wartezeit, Vorsorge nach Tarif'],
            ['ARAG V100, eigener Vorsorgeweg', 'Keine Ablehnung wegen Vorerkrankungen', '3 Monate allgemeine Wartezeit, nur Vorsorge aus dem Tarifkatalog']
          ],
          note: 'Angaben wie auf healio.de/ambulant. Bei ARAG V100 darf kein gleichartiger Schutz bei einem anderen privaten Versicherer bestehen oder beantragt sein. Maßgeblich sind Antrag und Tarifbedingungen.' },
        { type: 'paragraph', text: 'Der Beitrag hängt bei der SDK von Alter und Stufe ab. Für Ambulant 100 sind es in der Altersgruppe 31 bis 40 Jahre 39,19 EUR im Monat, Beitragsstand 29. September 2026, ein möglicher Risikozuschlag kommt dazu. Viele Krankenkassen zahlen ihren Bonus auf Wunsch als zweckgebundenen Zuschuss zu einer Zusatzversicherung. Wie viel davon beim Beitrag hilft, hängt von deiner Kasse und deinen Aktivitäten ab.' },
        { type: 'path', to: '/ambulant#tarifwahl', icon: 'calculator', text: 'Stufe wählen, Geburtsjahr eingeben, Beitrag sehen. Die Gesundheitsfragen folgen erst im Antrag.', label: 'Zum ambulanten Rechner' }
      ]
    },
    {
      id: 'laufende-behandlung',
      heading: 'Zahlt ein neuer Tarif für Beschwerden, die du schon hast?',
      blocks: [
        { type: 'paragraph', text: 'Für eine schon laufende Behandlung nicht. Was vor Versicherungsbeginn schon behandelt wird oder angeraten ist, bleibt bei der SDK ausgenommen. Das gilt auch ohne Wartezeit: Der Schutz beginnt mit dem vereinbarten Datum und wirkt nicht zurück.' },
        { type: 'paragraph', text: 'Eine angenommene Vorerkrankung und ein schon begonnener Behandlungsfall sind zwei verschiedene Dinge. Wirst du mit Rückenbeschwerden aufgenommen, ist deine bereits laufende Behandlungsserie trotzdem nicht versichert. Ein neuer Versicherungsfall nach Beginn kann dagegen erstattet werden, im Rahmen der Töpfe, der Bedingungen und eines eventuell vereinbarten Ausschlusses.' },
        { type: 'paragraph', text: 'Daraus folgt eine einfache Regel: Schließe den Tarif ab, bevor du ihn brauchst. Wer erst nach dem Befund sucht, findet keinen Vertrag, der die Rechnung rückwirkend übernimmt.' }
      ]
    },
    {
      id: 'krankenhaus',
      heading: 'Gibt es eine Krankenhauszusatzversicherung „ohne Gesundheitsfragen“?',
      blocks: [
        { type: 'paragraph', text: 'Bei den Krankenhaus-Tarifen auf Healio nur für Unfälle. Die SDK-Tarife SP1 und SP2 leisten bei Krankheit und Unfall, dort gehören Gesundheitsfragen zum Antrag. Ob und zu welchen Bedingungen du angenommen wirst, entscheidet der Versicherer im Antrag. Eine pauschale Zusage für Vorerkrankte gibt es für diese Tarife nicht.' },
        { type: 'paragraph', text: 'Der Tarif SPU verzichtet auf die Gesundheitsprüfung, leistet aber ausschließlich nach einem Unfall. Für eine Krankenhausbehandlung wegen Krankheit ist er keine Alternative. Das zeigt den typischen Tausch: Weniger Fragen bedeuten hier deutlich weniger Leistung.' },
        { type: 'table', mobile: 'cards', caption: 'Klinik-Tarife der SDK auf healio.de/stationaer, Beispielbeiträge mit 30 Jahren',
          head: ['Tarif', 'Leistet bei', 'Antrag'],
          rows: [
            ['SP2, 33,41 EUR im Monat', 'Krankheit und Unfall, Zweibettzimmer, private ärztliche Behandlung', 'Mit Gesundheitsfragen, individuelle Annahme'],
            ['SP1, 50,72 EUR im Monat', 'Krankheit und Unfall, Ein- oder Zweibettzimmer, private ärztliche Behandlung', 'Mit Gesundheitsfragen, individuelle Annahme'],
            ['SPU, 7,00 EUR im Monat', 'Nur nach einem Unfall', 'Verzichtet laut Produktseite auf die Gesundheitsprüfung']
          ],
          note: 'Beispielbeiträge für das Alter 30 laut healio.de/stationaer, Abruf 14. Oktober 2026. Der persönliche Beitrag hängt vom Eintrittsalter ab, bei SP1 und SP2 auch von den Gesundheitsangaben.' },
        { type: 'segments', segments: [
          { text: 'Wie der Antrag mit Vorerkrankung abläuft, steht im Ratgeber ' },
          { text: 'Krankenhauszusatzversicherung mit Vorerkrankung', to: '/ratgeber/krankenhauszusatzversicherung-vorerkrankung' },
          { text: '. Die Tarife vergleichst du auf ' },
          { text: 'healio.de/stationaer', to: '/stationaer' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'zahn',
      heading: 'Wie ist das bei der Zahnzusatzversicherung?',
      blocks: [
        { type: 'paragraph', text: 'Auch hier fragt der Antrag nach deiner Vorgeschichte. Häufig geht es um fehlende Zähne, laufende oder angeratene Behandlungen und bestimmte Vorerkrankungen. Bei der UKV ZahnPRIVAT haben die Fragen jeweils eigene Zeiträume. Bei 1 bis 3 fehlenden Zähnen prüft die UKV die Aufnahme mit Zuschlag je Zahn. Selbst bei Parodontitis innerhalb der letzten 2 Jahre gibt es die Annahme mit Ausschluss nur für Parodontose-Behandlungen statt Ablehnung.' },
        { type: 'paragraph', text: 'Eine Behandlung, die in den letzten 2 Jahren angeraten wurde oder schon läuft, ist im normalen Zahntarif nicht versichert. Für solche Fälle ohne fehlenden Zahn gibt es den Baustein ZAHN Sofort der Bayerischen, wenn der Abschluss vor der Rechnung erfolgt. Annahme und Leistungsumfang werden im Antrag geprüft.' },
        { type: 'segments', segments: [
          { text: 'Mehr dazu im Ratgeber ' },
          { text: 'Zahnzusatzversicherung bei laufender Behandlung', to: '/ratgeber/zahnzusatzversicherung-laufende-behandlung' },
          { text: '. Welcher Zahnweg zu dir passt, zeigt der Zahn-Check auf ' },
          { text: 'healio.de/zahn', to: '/zahn' },
          { text: '.' }
        ] }
      ]
    },
    {
      id: 'antrag',
      heading: 'Wie beantwortest du die Gesundheitsfragen richtig?',
      blocks: [
        { type: 'paragraph', text: 'Vollständig und so, wie es in deinen Unterlagen steht. Nach § 19 VVG musst du die Umstände angeben, nach denen der Versicherer in Textform fragt und die du kennst. Maßgeblich sind die konkreten Fragen und ihre Zeiträume, nicht deine Einschätzung, ob etwas wichtig war.' },
        { type: 'steps', heading: 'So gehst du vor', items: [
          { title: 'Fragen zuerst lesen', text: 'Notiere dir die Zeiträume, nach denen gefragt wird, etwa drei oder fünf Jahre.' },
          { title: 'Unterlagen holen', text: 'Weißt du etwas nicht mehr genau, hilft eine Auskunft deiner Praxis oder deiner Krankenkasse über die abgerechneten Behandlungen.' },
          { title: 'Ehrlich antworten', text: 'Auch eine scheinbar kleine Behandlung gehört in den Antrag, wenn danach gefragt wird.' },
          { title: 'Angebot prüfen', text: 'Lies, ob ein Zuschlag oder Ausschluss vereinbart ist, bevor du den Vertrag annimmst.' }
        ] },
        { type: 'paragraph', text: 'Falsche oder fehlende Angaben können teuer werden. Die Verbraucherzentrale warnt: Bei nachweislich falsch beantworteten Fragen droht eine Leistungsverweigerung, der Vertrag kann gekündigt werden. Wer heute etwas weglässt, riskiert also genau den Schutz, für den er zahlt.' },
        { type: 'honest', heading: 'Ehrlich gesagt', items: [
          { lead: 'Gesundheitsfragen gibt es fast immer.', text: 'Wichtig ist, ob der Tarif dich danach aufnimmt und zu welchem Beitrag.' },
          { lead: 'Keine Ablehnung heißt nicht alles versichert.', text: 'Ein Zuschlag oder ein Ausschluss für eine bestimmte Erkrankung bleibt möglich.' },
          { lead: 'Laufende Behandlungen zahlt kein neuer Vertrag.', text: 'Versichert sind neue Fälle ab dem vereinbarten Beginn.' }
        ] }
      ]
    },
    {
      id: 'naechster-schritt',
      heading: 'Wie findest du den passenden Weg?',
      blocks: [
        { type: 'paragraph', text: 'Fang mit dem Bedarf an. Gehst du zum Heilpraktiker oder Osteopathen, brauchst du eine Brille oder willst du mehr Vorsorge, ist der ambulante SDK-Tarif der Weg ohne Ablehnung. Geht es um Zähne, entscheidet die Zahn-Vorgeschichte über den Tarif. Für das Krankenhaus prüfst du SP1 oder SP2 im Antrag.' },
        { type: 'path', to: '/ambulant', icon: 'naturopathy', text: 'Leistungen, Töpfe und Gesundheitsfragen im ambulanten Tarif ansehen.', label: 'Zum ambulanten Schutz' },
        { type: 'cards', heading: 'Das passt dazu', items: [
          { title: 'Heilpraktiker Kosten', text: 'Was Behandlungen kosten und wer was zahlt.', to: '/ratgeber/heilpraktiker-kosten', icon: 'money', linkLabel: 'Zur Übersicht' },
          { title: 'Ambulante Zusatzversicherung', text: 'Was der ambulante Schutz neben der Kasse leistet.', to: '/ratgeber/ambulante-zusatzversicherung', icon: 'naturopathy', linkLabel: 'Ratgeber lesen' },
          { title: 'Heilpraktiker-Zusatz ohne Wartezeit', text: 'Ab wann der Schutz für neue Fälle gilt.', to: '/ratgeber/heilpraktiker-zusatzversicherung-ohne-wartezeit', icon: 'calendar', linkLabel: 'Ratgeber lesen' },
          { title: 'Krankenzusatzversicherung vergleichen', text: 'Die Kriterien, die beim Vergleich wirklich zählen.', to: '/ratgeber/krankenzusatzversicherung-vergleichen', icon: 'comparison', linkLabel: 'Ratgeber lesen' }
        ] }
      ]
    }
  ],
  factNugget: 'Healio ist ein unabhängiger Versicherungsmakler und verbindet Zusatzversicherungen mit dem Bonusprogramm der Krankenkasse. Private Zusatzversicherungen fragen fast immer nach der Gesundheit. Im ambulanten SDK-Tarif, den Healio vermittelt, gibt es Gesundheitsfragen, aber grundsätzlich keine Ablehnung wegen Vorerkrankungen; ein Risikozuschlag oder ein einzelner Ausschluss ist möglich. Behandlungen, die vor Versicherungsbeginn laufen oder angeraten sind, sind in keinem neuen Vertrag versichert.',
  faqs: [
    { question: 'Welche Krankenzusatzversicherung lehnt trotz Vorerkrankung nicht ab?', answer: 'Bei Healio der ambulante Tarif der SDK. Du beantwortest Gesundheitsfragen, wirst aber grundsätzlich nicht abgelehnt. Je nach Angaben kann ein Risikozuschlag oder ein Ausschluss für eine bestimmte Erkrankung dazukommen.' },
    { question: 'Gibt es eine Krankenhauszusatzversicherung, die nicht nach der Gesundheit fragt?', answer: 'Bei Healio nur für Unfälle: Der SDK-Tarif SPU verzichtet auf die Gesundheitsprüfung, leistet aber nur nach einem Unfall. Die Tarife SP1 und SP2 für Krankheit und Unfall haben Gesundheitsfragen, die Annahme entscheidet der Versicherer im Antrag.' },
    { question: 'Was passiert, wenn ich eine Vorerkrankung im Antrag verschweige?', answer: 'Das kann dich den Schutz kosten. Laut Verbraucherzentrale droht bei nachweislich falsch beantworteten Fragen eine Leistungsverweigerung, und der Versicherer kann den Vertrag kündigen. Beantworte die Fragen deshalb vollständig nach § 19 VVG.' },
    { question: 'Zahlt die Versicherung meine laufende Behandlung, wenn ich jetzt abschließe?', answer: 'Nein. Behandlungen, die vor Versicherungsbeginn schon laufen oder angeraten sind, bleiben ausgenommen, auch in Tarifen ohne Wartezeit. Versichert sind neue Fälle ab dem vereinbarten Beginn.' },
    { question: 'Was ist ein Risikozuschlag?', answer: 'Ein Aufschlag auf den Beitrag, den der Versicherer wegen deiner Gesundheitsangaben verlangen kann. Seine Höhe steht in deinem persönlichen Angebot. Rechne den Gesamtbeitrag gegen die Leistung, bevor du annimmst.' }
  ],
  onward: {
    heading: 'So gehst du weiter vor',
    segments: [
      { text: 'Den ambulanten Tarif ohne Ablehnung und deinen Beitrag siehst du auf ' },
      { text: 'healio.de/ambulant', to: '/ambulant' },
      { text: '. Für die Zähne startest du den Zahn-Check auf ' },
      { text: 'healio.de/zahn', to: '/zahn' },
      { text: ', für das Krankenhaus vergleichst du auf ' },
      { text: 'healio.de/stationaer', to: '/stationaer' },
      { text: '. Welche Kasse den Beitrag mit ihrem Bonus mitträgt, vergleichst du auf ' },
      { text: 'kassenboost.de', href: 'https://kassenboost.de/' },
      { text: '.' }
    ]
  },
  sources: {
    checkedAt: '2026-10-14',
    checkedAtLabel: '14. Oktober 2026',
    intro: 'Gesundheitsprüfung, Annahmefolgen und die Tarifangaben stammen aus diesen Quellen.',
    items: [
      { label: 'Zusatzversicherungen zur gesetzlichen Krankenversicherung', publisher: 'Verbraucherzentrale', href: 'https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/krankenversicherung/zusatzversicherungen-zur-gesetzlichen-krankenversicherung-sinnvoll-oder-nicht-10425', stand: '19. August 2025', accessedAt: '14.10.2026' },
      { label: 'Anzeigepflicht, § 19 VVG', publisher: 'Gesetze im Internet', href: 'https://www.gesetze-im-internet.de/vvg_2008/__19.html', stand: 'Geltende Fassung', accessedAt: '14.10.2026' },
      { label: 'AVB Zusatzversicherung AP-Tarife', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Bedingungen/AVB-Zusatzversicherung-AP-Tarife-1.753a.pdf', stand: '1.753a, Stand 1. Januar 2023', accessedAt: '14.10.2026' },
      { label: 'Ambulanter Schutz: Gesundheitsfragen, Wartezeit, UKV und ARAG V100', publisher: 'Healio', href: 'https://healio.de/ambulant', stand: 'Live-Abruf 14. Oktober 2026, Beiträge 29. September 2026', accessedAt: '14.10.2026' },
      { label: 'Antrag Zusatzversicherung A842 mit Tarif V100', publisher: 'ARAG', href: 'https://www.arag-partnervertrieb.de/medien/pdf/KV/Antraege/arag_kv_antrag_zusatz_a842.pdf', stand: 'Abruf 14. Oktober 2026', accessedAt: '14.10.2026' },
      { label: 'Tarifbeschreibung Krankenhauszusatzversicherung SPU', publisher: 'SDK', href: 'https://www.sdk.de/downloads/Bedingungen/Tarifbeschreibung-Krankenhauszusatzversicherung-SPU-1.671g.pdf', stand: '1.671g', accessedAt: '14.10.2026' },
      { label: 'Klinik-Tarife SP1, SP2 und SPU', publisher: 'Healio', href: 'https://healio.de/stationaer', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' },
      { label: 'Zahn-Check und Annahmeregeln UKV und Bayerische', publisher: 'Healio', href: 'https://healio.de/zahn', stand: 'Live-Abruf 14. Oktober 2026', accessedAt: '14.10.2026' }
    ]
  },
  footnote: 'Healio GmbH, unabhängiger Versicherungsmakler nach Paragraf 93 HGB. Kein Vertreter einer einzelnen Gesellschaft. Angaben nach den genannten Quellen vom 14. Oktober 2026. Maßgeblich sind der Antrag und die vereinbarten Bedingungen des Versicherers.'
};
