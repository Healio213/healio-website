export const ALTERSVORSORGE_HUB_PATH = '/ratgeber/altersvorsorgedepot';
export const ALTERSVORSORGE_REVIEW_DATE = '2026-10-08';

export const altersvorsorgeClusters = [
  { id: 'grundlagen', title: 'Das neue Depot verstehen', description: 'Start, Voraussetzungen und Förderung verständlich erklärt.' },
  { id: 'riester', title: 'Mit einem Riester-Vertrag entscheiden', description: 'Behalten, übertragen oder pausieren: die Unterschiede und die Unterlagen dafür.' },
  { id: 'familien', title: 'Als Familie planen', description: 'Kinderzulage, Elternzeit und Veränderungen beim Kindergeld.' },
  { id: 'selbststaendige', title: 'Als Selbstständiger vorsorgen', description: 'Förderberechtigung, schwankende Einnahmen und die Reserve für deine Praxis.' },
  { id: 'entscheidung', title: 'Kosten, Anlage und Auszahlung prüfen', description: 'Kosten und Risiken abwägen, Alternativen vergleichen und die Auszahlung verstehen.' },
];

const SOURCE_URLS = {
  regierung: ['Bundesregierung: Reform der privaten Altersvorsorge', 'https://www.bundesregierung.de/breg-de/aktuelles/reform-private-altersvorsorge-2400072'],
  gesetz: ['Bundestag: finaler Gesetzesbeschluss, BR-Drs. 206/26', 'https://dserver.bundestag.de/brd/2026/0206-26.pdf'],
  bmf: ['Bundesfinanzministerium: Fragen zur Altersvorsorgereform', 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/reform-der-privaten-altersvorsorge.html'],
  zfa: ['Deutsche Rentenversicherung: Reform und Zulagen', 'https://riester.deutsche-rentenversicherung.de/DE/FAQ/FAQ_artikel'],
  'riester-kuendigung': ['Deutsche Rentenversicherung: Riester kündigen und Alternativen', 'https://riester.deutsche-rentenversicherung.de/DE/Riester-optimieren/Kuendigen-oder-nicht-kuendigen'],
  'familien-foerderung': ['Deutsche Rentenversicherung: Förderung, Elternzeit und Kindererziehungszeiten', 'https://riester.deutsche-rentenversicherung.de/DE/Lohnt-sich-Riester/Staatliche-Foerderung-fuer-Sie/staatliche-foerderung-fuer-sie'],
  estg10: ['Einkommensteuergesetz: Basisrente und Sonderausgaben, § 10', 'https://www.gesetze-im-internet.de/estg/__10.html'],
  estg85: ['Einkommensteuergesetz: Kinderzulage, § 85', 'https://www.gesetze-im-internet.de/estg/__85.html'],
  estg89: ['Einkommensteuergesetz: Zulagenantrag, § 89', 'https://www.gesetze-im-internet.de/estg/__89.html'],
  rv84: ['Deutsche Rentenversicherung: Grundzulage ab 2027, § 84', 'https://rvrecht.deutsche-rentenversicherung.de/SharedDocs/rvRecht/05_Normen_und_Vertraege/02_C-K/EStG/0084/0084_2027_01_01.html'],
  kindergeld: ['Familienportal: Kindergeld und Altersgrenzen', 'https://familienportal.de/familienportal/familienleistungen/kindergeld/faq/bis-zu-welchem-alter-meines-kindes-bekomme-ich-kindergeld--124966'],
};

const NEXT_STEPS = {
  webinar: { label: 'Zuschuss-Fahrplan und Startinfos ansehen', heading: 'Die nächsten Fragen gemeinsam klären', anchor: 'webinar', text: 'Auf der nächsten Seite findest du den Zuschuss-Fahrplan zum Herunterladen. Du kannst dich für neue Details und den Start vormerken oder eine persönliche Frage stellen. Webinar-Einladungen folgen, sobald Termine feststehen.' },
  check: { label: 'Persönlichen Zuschuss-Check ansehen', heading: 'Deinen eigenen Fall durchgehen', anchor: 'zuschuss-check', text: 'Wenn du schon einen konkreten Vertrag oder eine Entscheidung vor dir hast, kannst du den persönlichen Zuschuss-Check ansehen. Wir besprechen die Unterlagen, Kosten und Voraussetzungen. Du entscheidest anschließend in Ruhe.' },
  calculator: { label: 'Meinen Zuschuss berechnen', heading: 'Die Beispielrechnung für dich ausprobieren', anchor: 'rechner', text: 'Unser Rechner zeigt Grund- und Kinderzulage für unterschiedliche Eigenbeiträge. Er ist ohne Anmeldung zugänglich und ersetzt keine Prüfung deiner persönlichen Förderberechtigung.' },
};

export function makeAltersvorsorgeArticle(raw) {
  const { sourceIds, relatedSlugs, nextStep = 'webinar', audience = 'standard', ...content } = raw;
  const step = NEXT_STEPS[nextStep];
  if (!step) throw new Error(`Unbekannter nächster Schritt: ${nextStep}`);
  const sources = {
    checkedAt: ALTERSVORSORGE_REVIEW_DATE,
    checkedAtLabel: '8. Oktober 2026',
    items: sourceIds.map((id) => {
      const source = SOURCE_URLS[id];
      if (!source) throw new Error(`Unbekannte Quelle: ${id}`);
      return { id, label: source[0], href: source[1] };
    }),
  };
  const variant = audience === 'standard' ? '' : `?fuer=${audience}`;
  const wordCount = JSON.stringify([content.lead, content.sections, content.faqs]).split(/\s+/).length;
  return {
    ...content,
    kind: 'ratgeber',
    topic: 'altersvorsorge',
    contentStatus: 'published',
    audience,
    nextStep,
    listTitle: content.headline,
    publishedAt: '2026-10-09',
    publishedAtLabel: '9. Oktober 2026',
    updatedAt: '2026-10-09',
    updatedAtLabel: '9. Oktober 2026',
    readingTimeMinutes: Math.max(3, Math.ceil(wordCount / 210)),
    factNuggetHeading: 'Was Healio mit dir klärt',
    factNugget: 'Healio begleitet die Versicherungsvarianten der geförderten Altersvorsorge und hilft dir, Förderung, vorhandene Verträge, Kosten und Risiken zusammen zu betrachten. Die Ratgeber erklären auch andere Produktwege allgemein. Bei einem von Healio vermittelten Versicherungsabschluss wird Healio vom Versicherungsunternehmen über die Vertragskosten vergütet. Konkrete Angebote werden erst besprochen, wenn sie tatsächlich verfügbar und geprüft sind.',
    internalCta: {
      id: 'altersvorsorge-naechster-schritt',
      heading: step.heading,
      label: step.label,
      to: `/altersvorsorgedepot${variant}#${step.anchor}`,
      utmCampaign: 'altersvorsorge-ratgeber',
      blocks: [{ type: 'paragraph', text: step.text }],
    },
    onward: {
      heading: 'Passende Ratgeber zum Weiterlesen',
      segments: [
        { text: 'Alle Themen findest du in der ', },
        { text: 'Ratgeberübersicht zum Altersvorsorgedepot', to: ALTERSVORSORGE_HUB_PATH },
        { text: '. Vertiefe anschließend die Fragen, die für deine Entscheidung offen sind.' },
      ],
    },
    sources,
    relatedSlugs,
    footnote: 'Redaktion: Healio GmbH. Quellenstand: 8. Oktober 2026. Allgemeine Information zur privaten Altersvorsorge, keine individuelle Anlage- oder Steuerempfehlung. Beispielrechnungen sind keine Renditezusagen. Anbieterbedingungen und persönliche Voraussetzungen müssen vor einem Abschluss geprüft werden.',
  };
}
