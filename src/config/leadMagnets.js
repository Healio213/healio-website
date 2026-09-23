/**
 * Konfiguration der drei LinkedIn-Funnel-Landingpages.
 *
 * Angelegt 23.09.2026 auf Franks Auftrag: "ein gewissen Funnel machen, wo die Leute
 * sich denn da halt so ein E-Book runterladen können, um dann auch mehr dazu zu wissen.
 * Um gegebenenfalls natürlich dann vorqualifizierte Termine zu bekommen."
 *
 * Eine Konfiguration je Zielgruppe: Unternehmen, Heilberufe/Praxen, Zahnärzte.
 *
 * Leitplanken, die in jedem Text eingehalten sind:
 * - Beitrag und Bonus werden nie addiert, sie stehen getrennt nebeneinander.
 * - Keine Ranking- oder Marktsieger-Aussage über Krankenkassen.
 * - Kein Versicherername, kein Tarifname, keine Beiträge, keine Erstattungssätze.
 * - Zahnärzte: nie Provision, nie ungefragtes Aushändigen, nur passive Auslage.
 * - Budget immer als "bis zu 3.000 EUR in zwei Jahren", nie als Zusage.
 * - Keine Gedankenstriche.
 */

export const LEAD_MAGNETS = {
  unternehmen: {
    key: 'unternehmen',
    route: '/unternehmen/team-vorteil',
    canonicalUrl: 'https://healio.de/unternehmen/team-vorteil',
    audienceLabel: 'Für Arbeitgeber und Personalverantwortliche',
    seoTitle: 'Das Geschenk an Ihre Belegschaft, das Sie nichts kostet | Healio',
    seoDescription:
      'Kostenloses E-Book für Arbeitgeber: Was in der gesetzlichen Krankenkasse Ihrer Mitarbeitenden bereitliegt und wie Sie es ihnen zugänglich machen, ohne Budget einzusetzen.',
    headline: 'Das beste Geschenk an Ihre Belegschaft kostet Sie keinen Cent.',
    subline:
      'Jedes Jahr wird über Benefits verhandelt. Und die ganze Zeit liegt in derselben Belegschaft Geld, das längst bezahlt ist. Fast alle Ihre Leute sind gesetzlich versichert, und fast niemand von ihnen weiß, was die eigene Kasse hergibt.',
    ebookTitle: 'Der Belegschafts-Check',
    ebookSubtitle: 'Zwei Hebel in der gesetzlichen Krankenkasse, die Sie Ihrem Team zugänglich machen können',
    ebookFacts: 'PDF · kostenlos · kein Newsletter-Abo',
    problemTitle: 'Warum das jedes Jahr still verfällt',
    problemBody:
      'Auf dem Kontoauszug fehlt nichts, was nie da war. Genau deshalb faellt es niemandem auf. Der Haken ist nicht die Bürokratie, der Haken ist, dass es niemand sagt.',
    contents: [
      'Hebel eins, der Beitrag: Der gesetzliche Leistungskatalog ist weitgehend derselbe, der Zusatzbeitrag nicht. Was das im Monat ausmacht und wie jeder es selbst nachsieht.',
      'Hebel zwei, das Bonusprogramm: Was dort anerkannt wird, steht in der Satzung der jeweiligen Kasse. Welche Nachweise zählen und welche nicht.',
      'Der Unterschied zwischen Geldbonus und Zuschuss gegen nachgewiesene Kosten, damit im Team niemand mit falschen Erwartungen rechnet.',
      'Ein fertiger Absatz für Intranet, Verteiler oder Schwarzes Brett, den Sie unverändert übernehmen können.',
      'Was Beschäftigte mit dem Gesparten sinnvoll schließen können, von ambulant über Zahn bis zum Zimmer im Krankenhaus.',
      'Krankentagegeld: Warum nach sechs Wochen Lohnfortzahlung deutlich weniger als das gewohnte Netto ankommt und warum das die am seltensten geschlossene Lücke ist.',
    ],
    forWhom: [
      'Personalleitung, People and Culture und kaufmännische Leitung',
      'Geschäftsführung im inhabergeführten Mittelstand',
      'Alle, die Benefits verantworten und wissen wollen, was davon tatsächlich ankommt',
    ],
    honesty: [
      'Was bei einer einzelnen Person ankommt, hängt von ihrer Kasse und ihren eigenen Aktivitäten ab. Pauschale Beträge nennt das E-Book deshalb nicht.',
      'Beitragsersparnis und Bonus sind zwei getrennte Dinge. Sie werden im E-Book nirgends zusammengerechnet.',
      'Ob jemand die Kasse wechselt, entscheidet er selbst. Der Vergleich zeigt nur, welche Kasse für die eigene Situation am meisten hergibt. Wir fangen bei der größeren Betrachtung an, der Zusatzschutz kommt danach.',
    ],
    formTitle: 'E-Book anfordern',
    formNote: 'Sie bekommen den Link sofort auf dieser Seite. Wir melden uns nur, wenn Sie es wollen.',
    companyFieldLabel: 'Unternehmen',
    companyFieldPlaceholder: 'Name Ihres Unternehmens',
    downloadPath: '/downloads/healio-belegschafts-check.pdf',
    downloadFileName: 'Healio-Belegschafts-Check.pdf',
    appointmentIntro:
      'Wenn Sie es lieber durchgerechnet haben wollen: Zwanzig Minuten am Telefon reichen, damit Sie wissen, wie das für Ihr Haus aussieht.',
    appointmentUrl:
      'https://healio.de/partner?utm_source=linkedin&utm_medium=funnel&utm_campaign=team-vorteil&utm_content=termin',
    pageSource: 'Funnel Unternehmen Team-Vorteil',
    status: 'entwurf',
  },

  heilberufe: {
    key: 'heilberufe',
    route: '/heilberufe-vorsorge/praxis-material',
    canonicalUrl: 'https://healio.de/heilberufe-vorsorge/praxis-material',
    audienceLabel: 'Für Praxen in Heilberufen',
    seoTitle: 'Wenn Patienten an den Kosten scheitern | Material für Praxen | Healio',
    seoDescription:
      'Kostenloses E-Book für Praxen in Heilberufen: Was Sie zur Finanzierungsfrage sagen dürfen, ohne zu beraten, und wie Sie Therapieabbrüche aus Kostengründen seltener machen.',
    headline: 'Die Lücke in Ihrem Terminkalender hat selten mit Ihnen zu tun.',
    subline:
      'Der Termin wird verschoben. Beim zweiten Mal kommt gar keine neue Anfrage mehr. Offen sagt das am Empfang niemand. Da heißt es „ich melde mich wieder“, und gemeint ist meistens „ich kann das gerade nicht mehr bezahlen“.',
    ebookTitle: 'Die Kostenfrage in der Praxis',
    ebookSubtitle: 'Was Sie sagen dürfen, ohne zu beraten, und wo Ihre Rolle endet',
    ebookFacts: 'PDF · kostenlos · kein Newsletter-Abo',
    problemTitle: 'Der Abbruch kostet zweimal',
    problemBody:
      'Den Patienten die Behandlung und Sie die Stunde im Kalender. Dabei hat kaum jemand aus Überzeugung abgelehnt. Die meisten wissen nur nicht, woher sie das Geld nehmen sollen. Es ist eine Schande, dass Menschen ihre Therapie am Kontostand ausrichten, während bei ihrer Kasse Geld liegen bleibt, das niemand abruft. Sie sind für viele die erste vertraute Ansprechperson. Wer Ihnen Vertrauen und Geld mitbringt, dem dürfen Sie etwas zurückgeben: einen Hinweis, wo er nachsehen kann.',
    contents: [
      'Woran Sie im Gespräch merken, dass es um Geld geht und nicht um Zweifel an der Behandlung.',
      'Die Rollentrennung: Was eine Praxis allgemein sagen darf und ab wo es Versicherungsberatung wäre.',
      'Der erste Schritt, der Ihre Praxis nichts kostet und nichts verspricht: Über kassenboost.de sieht der Patient selbst nach, welche gesetzliche Kasse für ihn am meisten hergibt, und was seine eigene über Bonusprogramm und Satzung schon vorsieht.',
      'Warum Auslegen und Aushändigen zwei verschiedene Dinge sind und warum diese Unterscheidung die saubere Linie ist.',
      'Wie aus Kassenbonus und einem Zusatzschutz je nach Tarif und persönlichen Voraussetzungen ein Gesundheitsbudget von bis zu 3.000 EUR in zwei Jahren werden kann.',
      'Der erste Tag: Eine nach Versicherungsbeginn neu begonnene Behandlung ist ohne Wartezeit mitversichert. Was für eine laufende Behandlung gilt und wer das klärt.',
      'Formulierungshilfen für Empfang und Behandlungsraum, die niemanden überreden.',
    ],
    forWhom: [
      'Heilpraktikerinnen und Heilpraktiker',
      'Osteopathie, Physiotherapie und weitere Therapieberufe in eigener Praxis',
      'Hebammen, die ihre Familien außerhalb eines Wartezimmers begleiten',
    ],
    honesty: [
      'Das E-Book macht Ihre Praxis nicht zur Beratungsstelle. Es zeigt, was Sie ohne Scheu sagen dürfen, und wo die Vertragsdetails beim Patienten und seinem Anbieter liegen. Ob er den Weg nutzt, entscheidet er. Ihn zu verschweigen, ist unsere gemeinsame Verantwortung.',
      'Ein Zusatzschutz ist ein Vertrag mit monatlichem Beitrag und greift ab Vertragsbeginn, ohne Wartezeit. Eine danach neu begonnene Behandlung ist vom ersten Tag an mitversichert. Was vorher angefangen hat, wird nicht nacherstattet.',
      'Was am Ende bei einem Patienten ankommt, hängt von seiner Kasse, seinem Tarif und seinen persönlichen Voraussetzungen ab.',
    ],
    formTitle: 'E-Book anfordern',
    formNote: 'Sie bekommen den Link sofort auf dieser Seite. Wir melden uns nur, wenn Sie es wollen.',
    companyFieldLabel: 'Praxis',
    companyFieldPlaceholder: 'Name Ihrer Praxis',
    downloadPath: '/downloads/healio-kostenfrage-in-der-praxis.pdf',
    downloadFileName: 'Healio-Kostenfrage-in-der-Praxis.pdf',
    appointmentIntro:
      'Wenn Sie es lieber besprechen wollen: Zwanzig Minuten am Telefon oder im Videocall, und Sie wissen, was das für Ihre Praxis heißt.',
    appointmentUrl:
      'https://healio.de/partner?utm_source=linkedin&utm_medium=funnel&utm_campaign=praxis-material&utm_content=termin',
    pageSource: 'Funnel Heilberufe Praxis-Material',
    status: 'entwurf',
  },

  zahnaerzte: {
    key: 'zahnaerzte',
    route: '/zahnaerzte/praxis-material',
    canonicalUrl: 'https://healio.de/zahnaerzte/praxis-material',
    audienceLabel: 'Für Zahnarztpraxen',
    seoTitle: 'Nach dem Heil- und Kostenplan wird es still | Material für Zahnarztpraxen | Healio',
    seoDescription:
      'Kostenloses E-Book für Zahnarztpraxen zur wirtschaftlichen Aufklärung beim Eigenanteil, mit klarer Rollentrennung zwischen Praxis und Versicherungsberatung.',
    headline: 'Der Heil- und Kostenplan liegt auf dem Tisch. Danach wird es still.',
    subline:
      'Der Patient nimmt den Plan mit, sagt, er überlege es sich noch einmal, und danach kommt keine Nachfrage mehr. Die Behandlung wollte er. Er weiß nur nicht, woher er den Eigenanteil nehmen soll.',
    ebookTitle: 'Nach dem Heil- und Kostenplan',
    ebookSubtitle: 'Wirtschaftliche Aufklärung beim Eigenanteil, ohne die Rolle der Praxis zu verlassen',
    ebookFacts: 'PDF · kostenlos · kein Newsletter-Abo',
    problemTitle: 'Die Pflicht besteht ohnehin',
    problemBody:
      'Nach Paragraf 630c Absatz 3 BGB trifft die Praxis eine wirtschaftliche Aufklärungspflicht bei Leistungen, die die Kasse nicht trägt. Eine neutrale Information über Prüfwege flankiert diese Pflicht, statt Fremdwerbung zu sein. Und sie gibt etwas zurück: Wer mit einem Heil- und Kostenplan in der Hand fragt, wie er das stemmen soll, bringt Ihnen Vertrauen entgegen. Eine ehrliche Antwort darauf, wo er nachsehen kann, kostet nichts und verspricht nichts. Und sie liegt im Interesse der Praxis: Ein Patient, der weiß, wie er den Eigenanteil stemmt, nimmt den Plan an, statt ihn liegen zu lassen. Wir sind dabei an keinen einzelnen Anbieter gebunden und schauen je Patient, welcher Weg passt.',
    contents: [
      'Die wirtschaftliche Aufklärungspflicht nach Paragraf 630c Absatz 3 BGB und was sie im Praxisalltag konkret bedeutet.',
      'Die Linie der passiven Auslage: Material liegt aus, das Team spricht niemanden darauf an, und wer fragt, bekommt es in die Hand.',
      'Warum diese Unterscheidung berufsrechtlich die saubere ist und was sie mit der Rechtsprechung zur Werbung in Praxen zu tun hat.',
      'Der erste Prüfweg, der die Praxis nichts kostet und nichts verspricht: Über kassenboost.de sieht der Patient selbst nach, welche gesetzliche Kasse für ihn am meisten hergibt, und was seine eigene über Bonusprogramm und Satzung schon vorsieht.',
      'Wenn die Behandlung schon angeraten ist: der Sofortschutz. Bis zu 1.500 EUR über zwei Kalenderjahre, höchstens 750 EUR je Kalenderjahr, solange die Behandlung nicht abgeschlossen und die Rechnung nicht gestellt ist.',
      'Die Rollentrennung zwischen Praxis und externer Versicherungsberatung, sauber aufgeschrieben.',
      'Fünf Prüfgrenzen, an denen Sie jedes Material und jede Teamansprache messen können.',
    ],
    forWhom: [
      'Niedergelassene Zahnärztinnen und Zahnärzte mit eigener Praxis',
      'Praxismanagement und Abrechnung, die die Kostengespräche führen',
      'Alle, die beim Eigenanteil sauber informieren wollen, ohne berufsrechtlich ins Rutschen zu kommen',
    ],
    honesty: [
      'Für die Weitergabe an Patienten gibt es keine Vergütung, keine Prämie und keine Aufwandsentschädigung. Zuweisung gegen Entgelt ist berufsrechtlich verboten, und daran ändert dieses Material nichts.',
      'Das E-Book ist keine Rechtsberatung. Ob und wie eine Praxis neutrale Information auslegt, entscheidet sie selbst.',
      'Nichts darin fordert Ihre Praxis auf, Patienten ungefragt anzusprechen oder ihnen etwas auszuhändigen. Wer fragt, bekommt eine ehrliche Antwort und den Hinweis, wo er selbst prüfen kann. Dafür muss sich niemand schämen.',
    ],
    formTitle: 'E-Book anfordern',
    formNote: 'Sie bekommen den Link sofort auf dieser Seite. Wir melden uns nur, wenn Sie es wollen.',
    companyFieldLabel: 'Praxis',
    companyFieldPlaceholder: 'Name Ihrer Praxis',
    downloadPath: '/downloads/healio-nach-dem-heil-und-kostenplan.pdf',
    downloadFileName: 'Healio-Nach-dem-Heil-und-Kostenplan.pdf',
    appointmentIntro:
      'Wenn Sie Fragen dazu haben: Zwanzig Minuten am Telefon, ohne dass daraus etwas folgen muss.',
    appointmentUrl:
      'https://healio.de/partner?utm_source=linkedin&utm_medium=funnel&utm_campaign=zahnarztpraxis-material&utm_content=termin',
    pageSource: 'Funnel Zahnärzte Praxis-Material',
    status: 'entwurf',
  },
};

export const LEAD_MAGNET_LIST = Object.values(LEAD_MAGNETS);
