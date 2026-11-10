// Originaltexte der SDK für die Prüfseite /antrag/pruefen (09.11.2026).
//
// Quelle: lokaler SDK-Kurzantrag „Antrag auf Neuabschluss einer ambulanten
// Zusatzversicherung, Version für Makler ohne Beratungsdokumentation“,
// Formular 1.770aai, Fassung 01.24 (Datei
// Healio/SEO-Semrush-Workflow/2026-10-09/quellen/ukv-sdk-2026-10-10/SDK-Antrag-Drittserver-1.770aai-01.24.pdf,
// sha256 b59fa9d0…71d7e5). Einwilligung und Schweigepflichtentbindung:
// Seiten 4 bis 6 des Formulars (PDF-Seiten 4 bis 6), wortgleich. Nur die
// Zeilenumbrüche und Silbentrennungen des Formulars sind aufgelöst, die
// Felder „Person 1 / Person 2“ und die Unterschriftszeilen entfallen.
//
// Vor echten Kunden mit Fassung 10.26 abgleichen.
//
// Nicht im lokalen PDF enthalten (deshalb hier null, die Seite zeigt dann
// nichts statt eines Platzhalters):
// - Mitteilung nach § 19 Abs. 5 VVG („Wichtige Informationen für den
//   Antragsteller“). Der Vorspann verweist auf Seite 8 des Antragshefts, die
//   lokale Fassung hat dort nur das Informationsblatt zum Datenschutz.
// - Der Verzichtssatz der SDK für den Onlineantrag (Konzept Text 9, beginnt
//   mit „Im Zuge des Onlineantrages verzichte ich …“). Die Seite zeigt nur
//   Healios eigenen Text (TEXT_9_HINWEIS, TEXT_9_HAKEN).

export const SDK_TEXTE_QUELLE = 'SDK-Antrag 1.770aai, Fassung 01.24, Seiten 4 bis 6';

export const SDK_VVG_19_MITTEILUNG = null;
export const SDK_VERZICHT_SATZ = null;

// Text 6: Standort des Servers von Healio (Antragsdienst).
export const TEXT_6_STANDORT = 'Deutschland (Rechenzentrum von Hetzner)';

// Einwilligung in die Erhebung und Verwendung von Gesundheitsdaten und
// Schweigepflichtentbindungserklärung. Blöcke in der Reihenfolge des
// Formulars: ['titel', text], ['h', text], ['p', text], ['ul', [punkte]],
// ['wahl', 'I' | 'II', [blöcke]] für die beiden Möglichkeiten,
// ['fussnote', text].
export const SDK_SCHWEIGEPFLICHT_BLOECKE = [
  ['titel', 'EINWILLIGUNG IN DIE ERHEBUNG UND VERWENDUNG VON GESUNDHEITSDATEN UND SCHWEIGEPFLICHTENTBINDUNGSERKLÄRUNG FÜR DIE SÜDDEUTSCHE KRANKENVERSICHERUNG A. G. (SDK)'],
  ['p', 'Die Regelungen des Versicherungsvertragsgesetzes, des Bundesdatenschutzgesetzes sowie anderer Datenschutzvorschriften enthalten keine ausreichenden Rechtsgrundlagen für die Erhebung, Verarbeitung und Nutzung von Gesundheitsdaten durch Versicherungen. Um Ihre Gesundheitsdaten für diesen Antrag und den Vertrag erheben und verwenden zu dürfen, benötigt die Süddeutsche Krankenversicherung a. G. (SDK) daher Ihre datenschutzrechtliche(n) Einwilligung(en). Darüber hinaus benötigen wir Ihre Schweigepflichtentbindungen, um Ihre Gesundheitsdaten bei schweigepflichtigen Stellen, wie z. B. Ärzten, erheben zu dürfen. Wir benötigen Ihre Schweigepflichtentbindung ferner, um Ihre Gesundheitsdaten oder weitere nach § 203 Strafgesetzbuch (StGB) geschützte Daten, wie z. B. die Tatsache, dass ein Vertrag mit Ihnen besteht, an andere Stellen, z. B. medizinische Gutachter weiterleiten zu dürfen.'],
  ['p', 'Es steht Ihnen frei, die Einwilligung/Schweigepflichtentbindung nicht abzugeben oder jederzeit später mit Wirkung für die Zukunft zu widerrufen. Wir weisen jedoch darauf hin, dass ohne Verarbeitung von Gesundheitsdaten der Abschluss oder die Durchführung des Versicherungsvertrages in der Regel nicht möglich sein wird.'],
  ['p', 'Die Erklärungen betreffen den Umgang mit Ihren Gesundheitsdaten und sonstiger nach § 203 StGB geschützter Daten'],
  ['ul', [
    'durch uns selbst (unter 1.),',
    'im Zusammenhang mit der Abfrage bei Dritten (unter 2.),',
    'bei der Weitergabe an Stellen außerhalb der SDK (unter 3.) und',
    'wenn der Vertrag nicht zustande kommt (unter 4.).',
  ]],
  ['p', 'Die Erklärungen gelten für die von Ihnen gesetzlich vertretenen Personen wie Ihre Kinder, soweit diese die Tragweite dieser Einwilligung nicht erkennen und daher keine eigenen Erklärungen abgeben können.'],

  ['h', '1. Erhebung, Speicherung und Nutzung der von Ihnen mitgeteilten Gesundheitsdaten durch die SDK'],
  ['p', 'Ich willige ein, dass die SDK die von mir in diesem Antrag und künftig mitgeteilten Gesundheitsdaten erhebt, speichert und nutzt, soweit dies zur Antragsprüfung sowie zur Begründung, Durchführung oder Beendigung dieses Versicherungsvertrages erforderlich ist.'],

  ['h', '2. Abfrage von Gesundheitsdaten bei Dritten'],
  ['h', '2.1. Abfrage von Gesundheitsdaten bei Dritten zur Risikobeurteilung und zur Prüfung der Leistungspflicht'],
  ['p', 'Für die Beurteilung der zu versichernden Risiken kann es notwendig sein, Informationen von Stellen abzufragen, die über Ihre Gesundheitsdaten verfügen. Außerdem kann es zur Prüfung der Leistungspflicht erforderlich sein, dass wir die Angaben über Ihre gesundheitlichen Verhältnisse prüfen müssen, die Sie zur Begründung von Ansprüchen gemacht haben oder die sich aus eingereichten Unterlagen (z. B. Rechnungen, Verordnungen, Gutachten) oder Mitteilungen, z. B. eines Arztes oder sonstigen Angehörigen eines Heilberufs, ergeben.'],
  ['p', 'Diese Überprüfung erfolgt nur soweit sie erforderlich ist. Wir benötigen hierfür Ihre Einwilligung einschließlich einer Schweigepflichtentbindung für uns sowie für diese Stellen, falls im Rahmen dieser Abfragen Gesundheitsdaten oder weitere nach § 203 Strafgesetzbuch geschützte Informationen weitergegeben werden müssen.'],
  ['p', 'Sie können diese Erklärungen bereits hier (I) oder später im Einzelfall (II) erteilen. Sie können Ihre Entscheidung jederzeit ändern. Bitte entscheiden Sie sich für eine der beiden nachfolgenden Möglichkeiten:'],
  ['wahl', 'I', [
    ['p', 'Ich willige ein, dass die SDK – soweit es für die Risikobeurteilung oder für die Leistungsfallprüfung erforderlich ist – meine Gesundheitsdaten bei Ärzten, Pflegepersonen sowie bei Bediensteten von Krankenhäusern, sonstigen Krankenanstalten, Pflegeheimen, Personenversicherern, gesetzlichen Krankenkassen, Berufsgenossenschaften und Behörden erhebt und für diese Zwecke verwendet.'],
    ['p', 'Ich befreie die genannten Personen und Mitarbeiter der genannten Einrichtungen von ihrer Schweigepflicht, soweit meine zulässigerweise gespeicherten Gesundheitsdaten aus Untersuchungen, Beratungen, Behandlungen sowie Versicherungsanträgen und -verträgen aus einem Zeitraum von bis zu zehn Jahren vor Antragstellung an die SDK übermittelt werden.'],
    ['p', 'Ich bin darüber hinaus damit einverstanden, dass in diesem Zusammenhang – soweit erforderlich – meine Gesundheitsdaten durch die SDK an diese Stellen weitergegeben werden und befreie auch insoweit die für die SDK tätigen Personen von ihrer Schweigepflicht.'],
    ['p', 'Ich werde vor jeder Datenerhebung nach den vorstehenden Absätzen unterrichtet, von wem und zu welchem Zweck die Daten erhoben werden sollen, und ich werde darauf hingewiesen, dass ich widersprechen und die erforderlichen Unterlagen selbst beibringen kann.'],
  ]],
  ['wahl', 'II', [
    ['p', 'Ich wünsche, dass mich die SDK in jedem Einzelfall informiert, von welchen Personen oder Einrichtungen zu welchem Zweck eine Auskunft benötigt wird. Ich werde dann jeweils entscheiden, ob ich'],
    ['ul', [
      'in die Erhebung und Verwendung meiner Gesundheitsdaten durch die SDK einwillige, die genannten Personen oder Einrichtungen sowie deren Mitarbeiter von ihrer Schweigepflicht entbinde und in die Übermittlung meiner Gesundheitsdaten an die SDK einwillige',
      'oder die erforderlichen Unterlagen selbst beibringe.',
    ]],
    ['p', 'Mir ist bekannt, dass dies zu einer Verzögerung der Antragsbearbeitung oder der Prüfung der Leistungspflicht führen kann.'],
  ]],
  ['p', 'Soweit sich die vorstehenden Erklärungen auf meine Angaben bei Antragstellung beziehen, gelten sie für einen Zeitraum von drei Jahren nach Vertragsschluss. Ergeben sich nach Vertragsschluss für die SDK konkrete Anhaltspunkte dafür, dass bei der Antragstellung vorsätzlich unrichtige oder unvollständige Angaben gemacht wurden und damit die Risikobeurteilung beeinflusst wurde, gelten die Erklärungen bis zu zehn Jahre nach Vertragsschluss.'],

  ['h', '2.2. Erklärungen für den Fall Ihres Todes'],
  ['p', 'Zur Prüfung der Leistungspflicht kann es auch nach Ihrem Tod erforderlich sein, gesundheitliche Angaben zu prüfen. Eine Prüfung kann auch erforderlich sein, wenn sich bis zu zehn Jahre nach Vertragsschluss für die SDK konkrete Anhaltspunkte dafür ergeben, dass bei der Antragstellung unrichtige oder unvollständige Angaben gemacht wurden und damit die Risikobeurteilung beeinflusst wurde. Auch dafür bedürfen wir einer Einwilligung und Schweigepflichtentbindung. Bitte entscheiden Sie sich für eine der beiden nachfolgenden Möglichkeiten:'],
  ['wahl', 'I', [
    ['p', 'Für den Fall meines Todes willige ich in die Erhebung meiner Gesundheitsdaten bei Dritten zur Leistungsprüfung bzw. einer erforderlichen erneuten Antragsprüfung ein wie im ersten Ankreuzfeld beschrieben (siehe oben 2.1. – Möglichkeit I).'],
  ]],
  ['wahl', 'II', [
    ['p', 'Soweit zur Prüfung der Leistungspflicht bzw. einer erforderlichen erneuten Antragsprüfung nach meinem Tod Gesundheitsdaten erhoben werden müssen, geht die Entscheidungsbefugnis über Einwilligungen und Schweigepflichtentbindungserklärungen auf meine Erben oder – wenn diese abweichend bestimmt sind – auf die Begünstigten des Vertrags über.'],
  ]],

  ['h', '3. Weitergabe Ihrer Gesundheitsdaten und weiterer nach § 203 StGB geschützter Daten an Stellen außerhalb der SDK'],
  ['p', 'Wir verpflichten die nachfolgenden Stellen vertraglich auf die Einhaltung der Vorschriften über den Datenschutz und die Datensicherheit.'],
  ['h', '3.1. Datenweitergabe zur medizinischen Begutachtung'],
  ['p', 'Für die Beurteilung der zu versichernden Risiken und zur Prüfung der Leistungspflicht kann es notwendig sein medizinische Gutachter einzuschalten. Wir benötigen Ihre Einwilligung und Schweigepflichtentbindung, wenn in diesem Zusammenhang Ihre Gesundheitsdaten und weitere nach § 203 StGB geschützte Daten übermittelt werden. Sie werden über die jeweilige Datenübermittlung unterrichtet.'],
  ['p', 'Ich willige ein, dass die SDK meine Gesundheitsdaten an medizinische Gutachter übermittelt, soweit dies im Rahmen der Risikoprüfung oder der Prüfung der Leistungspflicht erforderlich ist und meine Gesundheitsdaten dort zweckentsprechend verwendet und die Ergebnisse an die SDK zurück übermittelt werden. Im Hinblick auf meine Gesundheitsdaten und weitere nach § 203 StGB geschützte Daten entbinde ich die für die SDK tätigen Personen und die Gutachter von ihrer Schweigepflicht.'],
  ['h', '3.2. Übertragung von Aufgaben auf andere Stellen (Unternehmen oder Personen)'],
  ['p', 'Wir führen bestimmte Aufgaben, wie zum Beispiel die Risikoprüfung oder die Leistungsfallbearbeitung, bei denen es zu einer Erhebung, Verarbeitung oder Nutzung Ihrer Gesundheitsdaten kommen kann, nicht selbst durch, sondern übertragen die Erledigung einer anderen Gesellschaft der SDK-Unternehmensgruppe oder einer anderen Stelle. Werden hierbei Ihre nach § 203 StGB geschützten Daten weitergegeben, benötigen wir Ihre Schweigepflichtentbindung für uns und soweit erforderlich für die anderen Stellen.'],
  ['p', 'Wir führen eine fortlaufend aktualisierte Liste über die Stellen und Kategorien von Stellen, die vereinbarungsgemäß Gesundheitsdaten für uns erheben, verarbeiten oder nutzen unter Angabe der übertragenen Aufgaben. Die zurzeit gültige Liste ist als Anlage der Einwilligungserklärung angefügt. Eine aktuelle Liste kann auch im Internet unter www.sdk.de eingesehen oder bei dem/der Datenschutzbeauftragten der SDK, Raiffeisenplatz 11 in 70736 Fellbach, Telefon: 0711 7372-7777 angefordert werden. Für die Weitergabe Ihrer Gesundheitsdaten an und die Verwendung durch die in der Liste genannten Stellen benötigen wir Ihre Einwilligung.'],
  ['p', 'Ich willige ein, dass die SDK meine Gesundheitsdaten an die in der oben erwähnten Liste genannten Stellen übermittelt und dass die Gesundheitsdaten dort für die angeführten Zwecke im gleichen Umfang erhoben, verarbeitet und genutzt werden, wie die SDK dies tun dürfte. Soweit erforderlich, entbinde ich die Mitarbeiter der SDK-Unternehmensgruppe und sonstiger Stellen im Hinblick auf die Weitergabe von Gesundheitsdaten und anderer nach § 203 StGB geschützter Daten von ihrer Schweigepflicht.'],
  ['h', '3.3. Datenweitergabe an Rückversicherungen'],
  ['p', 'Um die Erfüllung Ihrer Ansprüche abzusichern, können wir Rückversicherungen einschalten, die das Risiko ganz oder teilweise übernehmen. In einigen Fällen bedienen sich die Rückversicherungen dafür weiterer Rückversicherungen, denen sie ebenfalls Ihre Daten übergeben. Damit sich die Rückversicherung ein eigenes Bild über das Risiko oder den Versicherungsfall machen kann, ist es möglich, dass wir Ihren Versicherungsantrag oder Leistungsantrag der Rückversicherung vorlegen. Das ist insbesondere dann der Fall, wenn die Versicherungssumme besonders hoch ist oder es sich um ein schwierig einzustufendes Risiko handelt.'],
  ['p', 'Darüber hinaus ist es möglich, dass die Rückversicherung uns aufgrund ihrer besonderen Sachkunde bei der Risiko- oder Leistungsprüfung sowie bei der Bewertung von Verfahrensabläufen unterstützt.'],
  ['p', 'Haben Rückversicherungen die Absicherung des Risikos übernommen, können sie kontrollieren, ob wir das Risiko bzw. einen Leistungsfall richtig eingeschätzt haben.'],
  ['p', 'Außerdem werden Daten über Ihre bestehenden Verträge und Anträge im erforderlichen Umfang an Rückversicherungen weitergegeben, damit diese überprüfen können, ob und in welcher Höhe sie sich an dem Risiko beteiligen können. Zur Abrechnung von Prämienzahlungen und Leistungsfällen können Daten über Ihre bestehenden Verträge an Rückversicherungen weitergegeben werden.'],
  ['p', 'Zu den oben genannten Zwecken werden möglichst anonymisierte bzw. pseudonymisierte Daten, jedoch auch personenbezogene Gesundheitsangaben verwendet. Ihre personenbezogenen Daten werden von den Rückversicherungen nur zu den vorgenannten Zwecken verwendet. Über die Übermittlung Ihrer Gesundheitsdaten an Rückversicherungen werden Sie durch uns unterrichtet.'],
  ['p', 'Ich willige ein, dass meine Gesundheitsdaten – soweit erforderlich – an Rückversicherungen übermittelt und dort zu den genannten Zwecken verwendet werden. Soweit erforderlich, entbinde ich die für die SDK tätigen Personen im Hinblick auf die Gesundheitsdaten und weiteren nach § 203 StGB geschützter Daten von ihrer Schweigepflicht.'],
  ['h', '3.4. Datenweitergabe an selbstständige Vermittler'],
  ['p', 'Wir geben grundsätzlich keine Angaben zu Ihrer Gesundheit an selbstständige Vermittler weiter. Es kann aber in den folgenden Fällen dazu kommen, dass Daten, die Rückschlüsse auf Ihre Gesundheit zulassen, oder gemäß § 203 StGB geschützte Informationen über Ihren Vertrag Versicherungsvermittlern zur Kenntnis gegeben werden.'],
  ['p', 'Soweit es zu vertragsbezogenen Beratungszwecken erforderlich ist, kann der Sie betreuende Vermittler Informationen darüber erhalten, ob und ggf. unter welchen Voraussetzungen (z. B. Annahme mit Risikozuschlag, Ausschlüsse bestimmter Risiken) Ihr Vertrag angenommen werden kann.'],
  ['p', 'Der Vermittler, der Ihren Vertrag vermittelt hat, erfährt, dass und mit welchem Inhalt der Vertrag abgeschlossen wurde. Dabei erfährt er auch, ob Risikozuschläge oder Ausschlüsse bestimmter Risiken vereinbart wurden.'],
  ['p', 'Bei einem Wechsel des Sie betreuenden Vermittlers auf einen anderen Vermittler kann es zur Übermittlung der Vertragsdaten mit den Informationen über bestehende Risikozuschläge und Ausschlüsse bestimmter Risiken an den neuen Vermittler kommen. Sie werden bei einem Wechsel des Sie betreuenden Vermittlers auf einen anderen Vermittler vor der Weitergabe von Gesundheitsdaten informiert sowie auf Ihre Widerspruchsmöglichkeit hingewiesen.'],
  ['p', 'Ich willige ein, dass die SDK meine Gesundheitsdaten und sonstigen nach § 203 StGB geschützten Daten in den oben genannten Fällen – soweit erforderlich – an den für mich zuständigen selbstständigen Versicherungsvermittler übermittelt und diese dort erhoben, gespeichert und zu Beratungszwecken genutzt werden dürfen.'],

  ['h', '4. Speicherung und Verwendung Ihrer Gesundheitsdaten, wenn der Vertrag nicht zustande kommt'],
  ['p', 'Kommt der Vertrag mit Ihnen nicht zustande, speichern wir Ihre im Rahmen der Risikoprüfung erhobenen Gesundheitsdaten für den Fall, dass Sie erneut Versicherungsschutz beantragen. Wir speichern Ihre Daten auch, um mögliche Anfragen weiterer Versicherungen beantworten zu können. Ihre Daten werden bei uns bis zum Ende des dritten Kalenderjahres nach dem Jahr der Antragstellung gespeichert.'],
  ['p', 'Ich willige ein, dass die SDK meine Gesundheitsdaten – wenn der Vertrag nicht zustande kommt – für einen Zeitraum von drei Jahren ab dem Ende des Kalenderjahres der Antragstellung zu den oben genannten Zwecken speichert und nutzt.'],

  ['fussnote', 'Der Text der Einwilligungs- und Schweigepflichtentbindungserklärung wurde 2011 mit den Datenschutzaufsichtsbehörden inhaltlich abgestimmt.'],
];

// Unterlagen der SDK: Name aus UNTERLAGEN_SDK (sdkAmbulantAntragTexte.js) und
// die lokal vorliegenden Originale der SDK unter public/unterlagen/sdk/
// (unverändert kopiert, Quelle sdk.de, Abruf 10.10.2026). Steht kein
// Eintrag da, zeigt die Seite nur den Namen.
export const UNTERLAGEN_SDK_DATEIEN = {
  Versicherungsbedingungen: [
    { label: 'Teil I, Allgemeiner Teil (1.751)', href: '/unterlagen/sdk/SDK-AVB-Teil-I-1.751.pdf' },
    { label: 'Teil II, Tarife AP5, AP7, AP9 und AP1 (1.753a)', href: '/unterlagen/sdk/SDK-AVB-Teil-II-AP-Tarife-1.753a.pdf' },
  ],
};
