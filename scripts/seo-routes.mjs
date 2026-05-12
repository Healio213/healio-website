/**
 * SEO-Konfiguration für alle Routen
 * Wird vom Build-Script verwendet, um individuelle HTML-Dateien mit
 * korrekten Meta-Tags pro Seite zu generieren.
 */

export const seoRoutes = [
  // === DEUTSCH ===
  {
    path: '/',
    title: 'Healio B2B – Betriebliche Vorsorge neu gedacht | bAV & bKV',
    description: 'Healio optimiert bAV, bKV und steuerfreie Gesundheitsbenefits für Unternehmen. Mehr Mitarbeiterbindung, klare Beratung und messbarer Nutzen.',
    canonical: 'https://healio.de',
    keywords: 'betriebliche Altersvorsorge, bAV, betriebliche Krankenversicherung, bKV, Gesundheitsbenefits, Mitarbeiterbindung, steuerfreie Benefits, Healio',
    lang: 'de',
    hreflang: { de: 'https://healio.de', en: 'https://healio.de/en' },
  },
  {
    path: '/unternehmen',
    title: 'Betriebliche Vorsorge für Unternehmen | bAV & bKV | Healio',
    description: 'Healio macht bAV, bKV und steuerfreie Gesundheitsbenefits für Unternehmen nutzbar: klare Analyse, bessere Mitarbeiterbindung und moderne Umsetzung.',
    canonical: 'https://healio.de/unternehmen',
    keywords: 'betriebliche Vorsorge, bAV, bKV, betriebliche Krankenversicherung, Benefits Arbeitgeber, Gesundheitsbenefits Unternehmen',
    lang: 'de',
    hreflang: { de: 'https://healio.de/unternehmen', en: 'https://healio.de/en/companies' },
  },
  {
    path: '/ambulant',
    title: 'Ambulante Zusatzversicherung – Bis zu 3.000 € Gesundheitsbudget | Healio',
    description: 'Bis zu 3.000 € Gesundheitsbudget für Heilpraktiker, Osteopathie & Naturheilkunde. Kassenboni + Zusatzversicherung clever kombiniert. Jetzt berechnen!',
    canonical: 'https://healio.de/ambulant',
    keywords: 'ambulante Zusatzversicherung, Gesundheitsbudget, Heilpraktiker Kosten, Osteopathie Erstattung, Naturheilkunde Krankenkasse, Kassenbonus Zusatzversicherung',
    lang: 'de',
    hreflang: { de: 'https://healio.de/ambulant', en: 'https://healio.de/en/outpatient' },
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Healio Gesundheitsbudget für Heilpraktiker, Osteopathie und Naturheilkunde',
          serviceType: 'Ambulante Zusatzversicherung und Gesundheitsbudget',
          url: 'https://healio.de/ambulant',
          description: 'Bis zu 3.000 € Gesundheitsbudget für Heilpraktiker, Osteopathie und Naturheilkunde durch die Kombination aus Kassenbonus und ambulanter Zusatzversicherung.',
          provider: {
            '@type': 'Organization',
            name: 'Healio GmbH',
            url: 'https://healio.de',
            telephone: '+494089755705',
            email: 'info@healio.de'
          },
          areaServed: {
            '@type': 'Country',
            name: 'Germany'
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'EUR',
            description: 'Kostenlose Beratung und Berechnung des möglichen Gesundheitsbudgets'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Gibt es einen Haken? Klingt zu gut um wahr zu sein.',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nein. Das Healio Konzept nutzt bestehende Systeme des deutschen Gesundheitswesens: Kassenboni und passende ambulante Zusatzversicherungen. Voraussetzung ist, dass Versicherte aktiv am Bonusprogramm teilnehmen und die Tarifbedingungen erfüllen.'
              }
            },
            {
              '@type': 'Question',
              name: 'Was kostet eine ambulante Zusatzversicherung monatlich?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die monatlichen Beiträge liegen je nach Alter und Tarif typischerweise zwischen 15 und 50 Euro. Durch ein starkes Kassenbonusprogramm kann der Bonus die Beiträge in vielen Fällen teilweise oder vollständig ausgleichen.'
              }
            },
            {
              '@type': 'Question',
              name: 'Übernimmt die Krankenkasse Heilpraktiker-Kosten?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Die gesetzliche Krankenversicherung übernimmt Heilpraktiker-Kosten in der Regel nicht. Mit einer passenden ambulanten Zusatzversicherung werden Heilpraktiker-Behandlungen je nach Tarif anteilig bis vollständig erstattet.'
              }
            },
            {
              '@type': 'Question',
              name: 'Werden Osteopathie-Behandlungen erstattet?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Osteopathie kann über eine passende Zusatzversicherung und je nach Krankenkasse zusätzlich über Kassenleistungen oder Bonusprogramme abgedeckt werden, sofern die jeweiligen Tarif- und Bonusbedingungen erfüllt sind.'
              }
            }
          ]
        }
      ]
    },
  },
  {
    path: '/partner',
    title: 'Für Heilpraktiker – Mehr Patienten durch Kostenübernahme | Healio',
    description: 'Healio-Partnerprogramm für Heilpraktiker: Therapieabbrüche verhindern, Patientenbindung stärken, Umsatz steigern. Kostenlose Partnerschaft.',
    canonical: 'https://healio.de/partner',
    keywords: 'Healio Partner, Heilpraktiker Partnerprogramm, Patienten Finanzierung Heilpraktiker, Kostenübernahme Naturheilkunde',
    lang: 'de',
    hreflang: { de: 'https://healio.de/partner', en: 'https://healio.de/en/partner' },
  },
  {
    path: '/hebammen',
    title: 'Für Hebammen – Gesundheitsbudget für Familien | Healio',
    description: 'Healio-Partnerprogramm für Hebammen: Familien entlasten, Kurse besser finanzierbar machen und rechtssicher informieren.',
    canonical: 'https://healio.de/hebammen',
    lang: 'de',
  },
  {
    path: '/heilberufe-vorsorge',
    title: 'Heilberufe-Vorsorge für Heilpraktiker und Osteopathen | Healio',
    description: 'Gebündelte Absicherung für Praxis und Leben: Berufshaftpflicht, Praxisausfall, Cyber, Berufsunfähigkeit und Rürup. Exklusive Rahmenkonditionen nur über Healio.',
    canonical: 'https://healio.de/heilberufe-vorsorge',
    lang: 'de',
  },
  {
    path: '/zahn',
    title: 'Zahnzusatzversicherung – Bis zu 100 % Erstattung | Healio',
    description: 'Zahnzusatzversicherung mit bis zu 100 % Erstattung für Zahnersatz. Bis zu 3 fehlende Zähne mitversicherbar. Jetzt Beitrag berechnen!',
    canonical: 'https://healio.de/zahn',
    keywords: 'Zahnzusatzversicherung, Zahnersatz Erstattung, Implantate Versicherung, Zahnversicherung Vergleich',
    lang: 'de',
    hreflang: { de: 'https://healio.de/zahn', en: 'https://healio.de/en/dental' },
  },
  {
    path: '/stationaer',
    title: 'Stationäre Zusatzversicherung – Privatpatient im Krankenhaus | Healio',
    description: 'Stationäre Zusatzversicherung: Einzelzimmer, Chefarztbehandlung, freie Krankenhauswahl. Privatpatienten-Status als Kassenpatient.',
    canonical: 'https://healio.de/stationaer',
    keywords: 'stationäre Zusatzversicherung, Krankenhaus Zusatzversicherung, Chefarztbehandlung, Einbettzimmer Versicherung',
    lang: 'de',
    hreflang: { de: 'https://healio.de/stationaer', en: 'https://healio.de/en/inpatient' },
  },
  {
    path: '/leistungen',
    title: 'Unsere Leistungen – Gesundheitsbudget & Zusatzversicherungen | Healio',
    description: 'Alle Healio-Leistungen im Überblick: Ambulante Zusatzversicherung, Zahnzusatz, stationäre Absicherung und betriebliche Vorsorge.',
    canonical: 'https://healio.de/leistungen',
    lang: 'de',
    hreflang: { de: 'https://healio.de/leistungen', en: 'https://healio.de/en/services' },
  },
  {
    path: '/about',
    title: 'Über Healio – Ganzheitliche Gesundheit neu gedacht | Healio',
    description: 'Healio verbindet Kassenboni mit Zusatzversicherungen zu einem Gesundheitsbudget von bis zu 3.000 €. Für Patienten und Heilpraktiker.',
    canonical: 'https://healio.de/about',
    lang: 'de',
    hreflang: { de: 'https://healio.de/about', en: 'https://healio.de/en/about' },
  },
  {
    path: '/kontakt',
    title: 'Kontakt – Kostenlose Beratung | Healio',
    description: 'Kontaktieren Sie Healio für eine kostenlose Beratung zu Gesundheitsbudget, Zusatzversicherungen und betrieblicher Vorsorge.',
    canonical: 'https://healio.de/kontakt',
    lang: 'de',
    hreflang: { de: 'https://healio.de/kontakt', en: 'https://healio.de/en/contact' },
  },
  {
    path: '/blog',
    title: 'Healio Ratgeber – Gesundheitsbudget, Naturheilkunde & Zusatzversicherung',
    description: 'Expertenwissen zu Gesundheitsbudget, Heilpraktiker-Kosten, IKK Bonus, Naturheilkunde-Erstattung und Zusatzversicherungen.',
    canonical: 'https://healio.de/blog',
    lang: 'de',
    hreflang: { de: 'https://healio.de/blog', en: 'https://healio.de/en/blog' },
  },
  {
    path: '/blog/heilpraktiker-kosten-guide-2026',
    title: 'Heilpraktiker Kosten 2026: Preise, Erstattung & Budget | Healio',
    description: 'Was kostet ein Heilpraktiker 2026? Preise, Beispiele und Wege zur Erstattung durch Zusatzversicherung und Gesundheitsbudget.',
    canonical: 'https://healio.de/blog/heilpraktiker-kosten-guide-2026',
    lang: 'de',
  },
  {
    path: '/blog/ikk-classic-bonus-700-euro',
    title: 'IKK Classic Bonus 700 €+: So nutzt du den Kassenbonus | Healio',
    description: 'So funktioniert der IKK Classic Bonus mit 700 €+ pro Jahr: Aktivitäten, Nachweise und Kombination mit dem Healio Gesundheitsbudget.',
    canonical: 'https://healio.de/blog/ikk-classic-bonus-700-euro',
    lang: 'de',
  },
  {
    path: '/blog/osteopathie-krankenkasse-2026',
    title: 'Osteopathie Krankenkasse 2026: Erstattung & Budget | Healio',
    description: 'Welche Krankenkasse zahlt Osteopathie? Überblick zu Zuschüssen, Grenzen und dem 3.000 € Gesundheitsbudget über Healio.',
    canonical: 'https://healio.de/blog/osteopathie-krankenkasse-2026',
    lang: 'de',
  },
  {
    path: '/blog/naturheilkunde-krankenkasse-2026',
    title: 'Naturheilkunde Krankenkasse 2026: Was wird erstattet? | Healio',
    description: 'Naturheilkunde, Akupunktur, TCM und Heilpraktiker: Was gesetzliche Krankenkassen zahlen und wie ein Gesundheitsbudget hilft.',
    canonical: 'https://healio.de/blog/naturheilkunde-krankenkasse-2026',
    lang: 'de',
  },
  {
    path: '/blog/gesundheitsbudget-3000-euro',
    title: '3.000 € Gesundheitsbudget: Kassenbonus + Zusatzversicherung | Healio',
    description: 'Wie du bis zu 3.000 € Gesundheitsbudget in 2 Jahren nutzt: Kassenbonus, Zusatzversicherung und Erstattung für Naturheilkunde.',
    canonical: 'https://healio.de/blog/gesundheitsbudget-3000-euro',
    lang: 'de',
  },
  {
    path: '/potenzialanalyse',
    title: 'Kostenlose Potenzialanalyse – Betriebliche Vorsorge | Healio B2B',
    description: 'Potenzialanalyse für betriebliche Altersvorsorge (bAV) und Krankenversicherung (bKV). Individuelle Berechnung für Ihr Unternehmen.',
    canonical: 'https://healio.de/potenzialanalyse',
    lang: 'de',
  },
  {
    path: '/klinik-upgrade',
    title: 'Klinik-Upgrade – Privatpatient im Krankenhaus | Healio',
    description: 'Klinik-Upgrade: Chefarzt, Einzelzimmer und freie Krankenhauswahl als Kassenpatient. Jetzt Privatpatienten-Komfort sichern.',
    canonical: 'https://healio.de/klinik-upgrade',
    lang: 'de',
  },
  {
    path: '/healio-zahnzusatz',
    title: 'Healio Zahnzusatz – Premium Zahnversicherung | Healio',
    description: 'Premium Zahnzusatzversicherung von Healio: Bis zu 100 % Erstattung für Zahnersatz, Implantate und Inlays. Bis zu 3 fehlende Zähne mitversicherbar.',
    canonical: 'https://healio.de/healio-zahnzusatz',
    lang: 'de',
  },
  {
    path: '/terminvereinbarung',
    title: 'Termin vereinbaren – Kostenlose Beratung | Healio',
    description: 'Vereinbaren Sie jetzt einen kostenlosen Beratungstermin bei Healio. Persönliche Beratung zu Gesundheitsbudget und Zusatzversicherungen.',
    canonical: 'https://healio.de/terminvereinbarung',
    lang: 'de',
  },
  {
    path: '/confirmation',
    title: 'Bestätigung | Healio',
    description: 'Vielen Dank für Ihre Anfrage bei Healio.',
    canonical: 'https://healio.de/confirmation',
    lang: 'de',
    robots: 'noindex, nofollow',
  },
  {
    path: '/tierkrankenversicherung',
    title: 'Tierkrankenversicherung – Schutz für Hund & Katze | Healio',
    description: 'Tierkrankenversicherung für Hund und Katze: OP-Schutz, Krankenvollversicherung, schnelle Erstattung. Jetzt Tarife vergleichen.',
    canonical: 'https://healio.de/tierkrankenversicherung',
    lang: 'de',
  },
  {
    path: '/impressum',
    title: 'Impressum | Healio GmbH',
    description: 'Impressum der Healio GmbH, Hamburg. Angaben gemäß § 5 TMG.',
    canonical: 'https://healio.de/impressum',
    lang: 'de',
  },
  {
    path: '/agb',
    title: 'AGB – Allgemeine Geschäftsbedingungen | Healio',
    description: 'Allgemeine Geschäftsbedingungen der Healio GmbH.',
    canonical: 'https://healio.de/agb',
    lang: 'de',
  },
  {
    path: '/datenschutz',
    title: 'Datenschutzerklärung | Healio GmbH',
    description: 'Datenschutzerklärung der Healio GmbH. Informationen zum Umgang mit personenbezogenen Daten.',
    canonical: 'https://healio.de/datenschutz',
    lang: 'de',
  },

  // === BLOG-ARTIKEL (Heilpraktiker-Zielgruppe) ===
  {
    path: '/blog/heilpraktiker-patienten-finanzierung-gesundheitsbudget',
    title: 'Heilpraktiker Kostenübernahme: 3.000 € Budget | Healio',
    description: 'Patienten brechen Heilpraktiker-Behandlungen oft aus Kostengründen ab. Das Healio Gesundheitsbudget ermöglicht bis zu 3.000 € in 2 Jahren.',
    canonical: 'https://healio.de/blog/heilpraktiker-patienten-finanzierung-gesundheitsbudget',
    lang: 'de',
  },
  {
    path: '/blog/digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung',
    title: 'Heilpraktiker Abrechnung vereinfachen: Digitale Erstattung App | Healio',
    description: 'Digitale Erstattung per App reduziert Rechnungsdiskussionen. Healio verbindet Zusatzversicherung und Kassenbonus zum 3.000 € Gesundheitsbudget.',
    canonical: 'https://healio.de/blog/digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung',
    lang: 'de',
  },
  {
    path: '/blog/heilpraktiker-kosten-gkv-erstattung-healio',
    title: 'Heilpraktiker-Kosten GKV: Warum alles selbst zahlen + Lösung | Healio',
    description: 'GKV zahlt Heilpraktiker-Kosten meist nicht. Erfahre, wie Healio Kassenbonus und Zusatzversicherung zu bis zu 3.000 € Budget kombiniert.',
    canonical: 'https://healio.de/blog/heilpraktiker-kosten-gkv-erstattung-healio',
    lang: 'de',
  },

  // === ENGLISCH ===
  {
    path: '/en',
    title: 'Healio B2B – Corporate Benefits | bAV & bKV Experts',
    description: 'Optimize corporate pension, health insurance and tax-efficient health benefits with Healio. Clear consulting for stronger employee retention.',
    canonical: 'https://healio.de/en',
    lang: 'en',
    hreflang: { de: 'https://healio.de', en: 'https://healio.de/en' },
  },
  {
    path: '/en/companies',
    title: 'Corporate Benefits for Companies | bAV & bKV | Healio',
    description: 'Healio makes corporate pension, health insurance and tax-efficient health benefits usable for companies: clear analysis and stronger retention.',
    canonical: 'https://healio.de/en/companies',
    lang: 'en',
    hreflang: { de: 'https://healio.de/unternehmen', en: 'https://healio.de/en/companies' },
  },
  {
    path: '/en/outpatient',
    title: 'Outpatient Supplementary Insurance – Up to 3,000 € Health Budget | Healio',
    description: 'Up to 3,000 € health budget for naturopathy, osteopathy & alternative medicine. Smart combination of health insurance bonuses.',
    canonical: 'https://healio.de/en/outpatient',
    lang: 'en',
    hreflang: { de: 'https://healio.de/ambulant', en: 'https://healio.de/en/outpatient' },
  },
  {
    path: '/en/partner',
    title: 'For Practitioners – More Patients Through Cost Coverage | Healio',
    description: 'Healio partner program for practitioners: Prevent therapy dropouts, strengthen patient loyalty, increase revenue.',
    canonical: 'https://healio.de/en/partner',
    lang: 'en',
    hreflang: { de: 'https://healio.de/partner', en: 'https://healio.de/en/partner' },
  },
  {
    path: '/en/dental',
    title: 'Dental Insurance – Up to 100% Coverage | Healio',
    description: 'Dental supplementary insurance with up to 100% coverage for dental prosthetics, prophylaxis and orthodontics.',
    canonical: 'https://healio.de/en/dental',
    lang: 'en',
    hreflang: { de: 'https://healio.de/zahn', en: 'https://healio.de/en/dental' },
  },
  {
    path: '/en/inpatient',
    title: 'Hospital Insurance – Private Patient Status | Healio',
    description: 'Hospital supplementary insurance: Private room, chief physician treatment, free hospital choice.',
    canonical: 'https://healio.de/en/inpatient',
    lang: 'en',
    hreflang: { de: 'https://healio.de/stationaer', en: 'https://healio.de/en/inpatient' },
  },
  {
    path: '/en/services',
    title: 'Our Services – Health Budget & Supplementary Insurance | Healio',
    description: 'All Healio services at a glance: Outpatient insurance, dental, hospital coverage and corporate benefits.',
    canonical: 'https://healio.de/en/services',
    lang: 'en',
    hreflang: { de: 'https://healio.de/leistungen', en: 'https://healio.de/en/services' },
  },
  {
    path: '/en/about',
    title: 'About Healio – Holistic Health Reimagined | Healio',
    description: 'Healio combines insurance bonuses with supplementary coverage for a health budget of up to 3,000 €.',
    canonical: 'https://healio.de/en/about',
    lang: 'en',
    hreflang: { de: 'https://healio.de/about', en: 'https://healio.de/en/about' },
  },
  {
    path: '/en/contact',
    title: 'Contact – Free Consultation | Healio',
    description: 'Contact Healio for a free consultation on health budgets, supplementary insurance and corporate benefits.',
    canonical: 'https://healio.de/en/contact',
    lang: 'en',
    hreflang: { de: 'https://healio.de/kontakt', en: 'https://healio.de/en/contact' },
  },
  {
    path: '/en/blog',
    title: 'Healio Guide – Health Budget, Naturopathy & Insurance',
    description: 'Expert knowledge on health budgets, practitioner costs, insurance bonuses and supplementary coverage.',
    canonical: 'https://healio.de/en/blog',
    lang: 'en',
    hreflang: { de: 'https://healio.de/blog', en: 'https://healio.de/en/blog' },
  },
];
