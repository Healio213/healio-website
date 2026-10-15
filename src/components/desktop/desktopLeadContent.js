import { GUIDED_CALLBACK_ENABLED } from '@/lib/guided-callback';
import { getGuidedHomeContent } from '@/components/home/guidedHomeContent';

const content = {
  de: {
    home: {
      titleLead: 'Warum lässt du jedes Jahr hunderte Euro',
      titleAccent: 'bei deiner Krankenkasse liegen?',
      description: 'Mit dem Bonus deiner Krankenkasse kannst du deinen Zusatzschutz ganz oder teilweise finanzieren: ambulant bis zu 3.000 EUR Gesundheitsbudget in 2 Jahren, dazu passende Wege für Zähne und Krankenhaus.',
      budgetLink: 'So setzt sich das zusammen',
      knowTitle: 'Was du wissen musst',
      knowItems: [
        'Kassenboni werden nicht automatisch ausgezahlt. Erfüllst du die Voraussetzungen, kannst du sie aktiv beantragen.',
        'Dein Ergebnis hängt von Kasse, Aktivitäten, Tarif und anrechenbaren Kosten ab. Die 3.000 EUR sind getrennte Tarifhöchstbeträge, kein auszahlbares Guthaben.',
      ],
      cta: 'Kassenpotenzial in 90 Sekunden prüfen',
      hint: '100 % kostenfrei · Keine Kündigungspflicht · Kein Vertreterbesuch',
      panelTitle: 'Die Rechnung beginnt bei deiner Kasse.',
      panelText: 'Beispielrechnung: was dein Zusatzschutz nach Bonusausgleich tatsächlich kostet.',
      // Beitrag: SDK Ambulant 100 (AP1), Altersgruppe 31 bis 40, 39,19 EUR im Monat
      // (src/data/sdkAmbulantBeitraege.js). Bonus: unterer Wert der üblichen
      // 400 EUR als Rechenannahme; tatsächlicher Zuschuss individuell nachweisen.
      calculation: [
        { sign: '', label: 'Jahresbeitrag Zusatzversicherung', value: '470,28 EUR', detail: 'Beispiel: 35 Jahre, SDK Ambulant 100 (AP1) mit 39,19 EUR im Monat. Den Beitrag zahlst du zunächst selbst.' },
        { sign: '−', label: 'Erreichter Kassenbonus', value: '400,00 EUR', detail: 'Rechenannahme für den IKK-classic-Zuschuss, kein garantierter Betrag. Erfüllte Bonusbedingungen, anerkannte Maßnahmen und eigene Kosten entscheiden.' },
        { sign: '=', label: 'Dein Jahresaufwand nach Bonus', value: '70,28 EUR', detail: 'Rechnerisch rund 5,86 EUR im Monat, wenn du den angenommenen Bonus tatsächlich erhältst.' },
      ],
      panelNote: 'Du zahlst den Versicherungsbeitrag monatlich selbst. Den Bonus beantragst du danach mit Aktivitäts- und Kostennachweisen bei deiner Kasse. Es gibt keine automatische Verrechnung; Tarif- und Bonusbedingungen gelten.',
    },
    ambulant: {
      // Frank 15.10.2026: Nutzen zuerst, der Kassenbonus folgt als Geheimtipp.
      // Gleicher Wortlaut wie hero.title/hero.subtitle in de/ambulant.json.
      titleLead: 'Warum zahlst du Heilpraktiker und Brille noch selbst?',
      titleAccent: 'Bis zu 3.000 EUR zurück, ohne Wartezeit.',
      description: 'Bis zu 3.000 EUR Gesundheitsbudget in zwei Kalenderjahren für Heilpraktiker, Osteopathie, Brille, Vorsorge und Zuzahlungen. Keine Wartezeit, Vorerkrankungen werden mit Zuschlag mitversichert. <highlight>Unser Geheimtipp:</highlight> Dein Kassenbonus kann den Beitrag ganz oder teilweise zurückholen.',
      condition: 'SDK AP1: vier getrennte Höchstbeträge für 2 Kalenderjahre ab Versicherungsbeginn. Erstattungsfähige Kosten, Gesundheitsangaben und Tarifbedingungen gelten.',
      cta: 'Ambulantes Budget prüfen',
      hint: 'Tarifleistungen, Beitrag und persönliches Bonuspotenzial nachvollziehbar gegenüberstellen.',
      panelTitle: 'Bis zu 3.000 EUR in 2 Jahren.',
      panelText: 'SDK Ambulant 100 / AP1. Vier getrennte Leistungstöpfe.',
      benefits: [
        { label: 'Sehhilfen', value: '500 EUR' },
        { label: 'Naturheilverfahren', value: '1.000 EUR' },
        { label: 'Vorsorge', value: '500 EUR' },
        { label: 'Hilfsmittel & Zuzahlungen', value: '1.000 EUR' },
      ],
      panelNote: 'Kein frei verfügbares Guthaben. Die Erstattung setzt versicherte Leistungen und Rechnungen voraus. Bei Hilfsmitteln ist eine Vorleistung deiner gesetzlichen Kasse erforderlich.',
    },
    zahn: {
      titleLead: 'Dein Lächeln ist dein stärkstes Statussignal.',
      titleAccent: 'Warum überlässt du es dem Kassenstandard?',
      description: 'Bis zu 100 % der erstattungsfähigen Kosten für Implantate, Kronen und Prophylaxe im Tarif ZahnPRIVAT 100, einschließlich Kassenleistung. So reduzierst du deinen Eigenanteil tarifgemäß. Dein Kassenbonus kann den Versicherungsbeitrag je nach Kasse und Aktivitäten ganz oder teilweise ausgleichen.',
      condition: 'Bis zu 100 % Erstattung nach Tarif und Kassenleistung. Annahme, Leistungsstaffeln und bereits empfohlene oder laufende Behandlungen werden gesondert geprüft.',
      cta: 'Passenden Zahnschutz prüfen',
      hint: 'Vier kurze Fragen. Ohne Kontaktdaten. Die verbindliche Annahme erfolgt im Antrag.',
      panelTitle: 'Deine Situation entscheidet.',
      panelText: '',
      benefits: [
        { label: 'Vorsorgen, bevor etwas ansteht', value: 'UKV ZahnPRIVAT', detail: 'Erstattung von 75, 90 oder 100 % je nach Stufe. Fehlende Zähne und Vorgeschichte im Check berücksichtigen.' },
        { label: 'Eine Behandlung steht bereits an', value: 'ZAHN Sofort prüfen', detail: 'Die Bayerische: bis zu 750 EUR je Kalenderjahr, insgesamt bis zu 1.500 EUR. Nur mit passendem neuen Zahntarif.' },
      ],
      panelNote: 'Empfohlene, laufende und bereits abgerechnete Behandlungen sind unterschiedliche Fälle. Der Check ordnet deinen nächsten Prüfungsschritt ein.',
    },
    stationaer: {
      titleLead: 'Wenn es um deine Gesundheit geht,',
      titleAccent: 'sind Arztwahl und Privatsphäre keine Nebensache.',
      description: 'Nur ein Einbettzimmer oder zusätzlich freie Arztwahl? DKV UZ1 versichert das Zimmer, SDK SP1 und SP2 auch wahlärztliche Behandlung. SDK SPU bietet Wahlleistungen ausschließlich nach einem Unfall. Vergleiche den Schutz, der zu dir passt.',
      condition: 'Leistungsumfang, Annahme und Zimmerverfügbarkeit sind maßgeblich. Der Unfalltarif SPU gilt ausschließlich nach einem Unfall.',
      cta: 'Klinikschutz vergleichen',
      hint: 'Zimmer, Arztwahl und Beitrag nebeneinander sehen. Bonusprüfung freiwillig.',
      panelTitle: 'Vier Wege. Klarer Leistungsumfang.',
      panelText: 'Zimmer, Arztwahl und Unfallschutz im Überblick.',
      benefits: [
        { label: 'Nur Einbettzimmer', value: 'DKV UZ1', detail: 'Bei Krankheit und Unfall, ohne Wahlarzt. Gesundheitsprüfung; allgemeine Wartezeit 3 Monate, bei Entbindung 8 Monate.' },
        { label: 'Einbettzimmer & Wahlarzt', value: 'SP1', detail: 'Bei Krankheit und Unfall. Mit Gesundheitsprüfung.' },
        { label: 'Zweibettzimmer & Wahlarzt', value: 'SP2', detail: 'Bei Krankheit und Unfall. Mit Gesundheitsprüfung.' },
        { label: 'Wahlleistungen nach Unfall', value: 'SPU', detail: 'Einbettzimmer und Wahlarzt nach Unfall. Ohne Gesundheitsprüfung.' },
      ],
      panelNote: 'Es gelten die jeweiligen Tarifbedingungen. Wahlleistungen ergänzen die gesetzliche Krankenhausversorgung.',
    },
    trust: ['Versicherungsmakler nach § 34d GewO', 'Tarifgrenzen vor Abschluss erklärt', 'Persönliche Begleitung'],
    registration: 'Erlaubnis nach § 34d Abs. 1 GewO',
    externalHint: 'Öffnet KassenBoost in einem neuen Tab.',
    bonusEntry: {
      titleLead: 'Leistungen und Beitrag.',
      titleAccent: 'Klar im Blick.',
      description: 'Vergleiche den ambulanten Zusatzschutz, der zu deinem Bedarf passt. Ein Kassenwechsel oder Abschluss ist dafür keine Voraussetzung.',
      cta: 'Leistungen und Beitrag ansehen',
      hint: 'Bereits angeratene oder begonnene Untersuchungen und Behandlungen sind nicht automatisch abgedeckt. Entscheidend sind Versicherungsbeginn, Gesundheitsangaben und Tarifbedingungen.',
    },
  },
  en: {
    home: {
      titleLead: 'Why leave hundreds of euros',
      titleAccent: 'with your health fund every year?',
      description: 'With your health fund bonus you can offset some or all of your supplementary insurance premium: up to EUR 3,000 in outpatient benefits over 2 years, plus suitable dental and hospital options.',
      budgetLink: 'How this adds up',
      knowTitle: 'What you should know',
      knowItems: [
        'Health fund bonuses are not paid automatically. If you meet the conditions, you can claim them.',
        'Your fund, activities, plan and eligible expenses determine the result. EUR 3,000 is the sum of separate plan limits, not a cash balance.',
      ],
      cta: 'Check health fund potential in 90 seconds',
      hint: '100% free · No obligation to switch · No home visit',
      panelTitle: 'Start the calculation with your health fund.',
      panelText: 'Example: what your supplementary cover actually costs after the bonus offset.',
      calculation: [
        { sign: '', label: 'Annual supplementary premium', value: 'EUR 470.28', detail: 'Example: age 35, SDK Ambulant 100 (AP1) at EUR 39.19 per month. You pay the premium first.' },
        { sign: '−', label: 'Bonus achieved', value: 'EUR 400.00', detail: 'Illustrative assumption for the IKK classic subsidy, not a guaranteed amount. Bonus conditions, recognised activities and your own eligible costs determine the result.' },
        { sign: '=', label: 'Annual cost after the bonus', value: 'EUR 70.28', detail: 'Equivalent to about EUR 5.86 per month, if you actually receive the assumed bonus.' },
      ],
      panelNote: 'You pay the monthly insurance premium yourself. Then claim your bonus with activity and expense evidence from your health fund. There is no automatic deduction; plan and bonus conditions apply.',
    },
    ambulant: {
      titleLead: 'Why are you still paying for naturopaths and glasses yourself?',
      titleAccent: 'Get up to EUR 3,000 back, with no waiting period.',
      description: 'Up to EUR 3,000 health budget over two calendar years for naturopaths (Heilpraktiker), osteopathy, glasses, preventive care and co-payments. No waiting period, pre-existing conditions are covered with a surcharge. <highlight>Our insider tip:</highlight> your health fund bonus can win back all or part of the premium.',
      condition: 'SDK AP1: four separate limits for 2 calendar years from the start of cover. Eligible expenses, health declarations and plan conditions apply.',
      cta: 'Check outpatient benefits',
      hint: 'Compare plan benefits, premiums and your own bonus potential clearly.',
      panelTitle: 'Up to EUR 3,000 over 2 years.',
      panelText: 'SDK Ambulant 100 / AP1. Four separate benefit limits.',
      benefits: [
        { label: 'Vision aids', value: 'EUR 500' },
        { label: 'Naturopathic treatment', value: 'EUR 1,000' },
        { label: 'Preventive care', value: 'EUR 500' },
        { label: 'Medical aids & co-payments', value: 'EUR 1,000' },
      ],
      panelNote: 'Not a freely available balance. Reimbursement requires insured services and invoices. Medical aids require a prior contribution from your statutory health fund.',
    },
    zahn: {
      titleLead: 'Your smile is your strongest status signal.',
      titleAccent: 'Why let statutory coverage set the standard?',
      description: 'Up to 100% of eligible costs for implants, crowns and preventive dental care under ZahnPRIVAT 100, including statutory benefits. Reduce your share under the plan terms. Depending on your fund and activities, your bonus may offset some or all of the insurance premium.',
      condition: 'Up to 100% reimbursement subject to the plan and statutory contribution. Benefit scales, acceptance and recommended or ongoing treatment are checked separately.',
      cta: 'Check suitable dental cover',
      hint: 'Four short questions. No contact details. Binding acceptance takes place in the application.',
      panelTitle: 'Your situation determines the pathway.',
      panelText: 'Two options with different requirements.',
      benefits: [
        { label: 'Arrange cover before treatment is needed', value: 'UKV ZahnPRIVAT', detail: '75, 90 or 100% reimbursement depending on the tier. Consider missing teeth and dental history in the check.' },
        { label: 'Treatment has already been recommended', value: 'Check ZAHN Sofort', detail: 'Die Bayerische: up to EUR 750 per calendar year, up to EUR 1,500 overall. Only with an appropriate new dental plan.' },
      ],
      panelNote: 'Recommended, ongoing and already invoiced treatment are different situations. The check identifies your next assessment step.',
    },
    stationaer: {
      titleLead: 'When your health is at stake,',
      titleAccent: 'doctor choice and privacy matter.',
      description: 'Just a single room, or a choice of doctor too? DKV UZ1 covers the room; SDK SP1 and SP2 also cover privately billed medical care. SDK SPU provides additional benefits only after an accident. Compare the cover that fits your needs.',
      condition: 'Benefits, acceptance and room availability apply. SPU accident cover only applies after an accident.',
      cta: 'Compare hospital cover',
      hint: 'Compare rooms, doctor choice and premiums. The bonus check is optional.',
      panelTitle: 'Four options. Clear benefits.',
      panelText: 'Rooms, doctor choice and accident cover at a glance.',
      benefits: [
        { label: 'Single room only', value: 'DKV UZ1', detail: 'For illness and accidents, without privately billed doctors. Health assessment; general waiting period 3 months, childbirth 8 months.' },
        { label: 'Single room & privately billed doctor', value: 'SP1', detail: 'For illness and accidents. Health assessment required.' },
        { label: 'Double room & privately billed doctor', value: 'SP2', detail: 'For illness and accidents. Health assessment required.' },
        { label: 'Additional benefits after an accident', value: 'SPU', detail: 'Single room and privately billed doctor after an accident. No health assessment.' },
      ],
      panelNote: 'The respective plan conditions apply. Optional benefits supplement statutory hospital care.',
    },
    trust: ['Insurance broker under § 34d GewO', 'Plan limits explained before you commit', 'Personal support'],
    registration: 'Authorised under § 34d (1) GewO',
    externalHint: 'Opens KassenBoost in a new tab.',
    bonusEntry: {
      titleLead: 'Benefits and premiums.',
      titleAccent: 'Clearly set out.',
      description: 'Compare outpatient supplementary cover that fits your needs. Changing health funds or taking out cover is not required to compare.',
      cta: 'Explore benefits and premiums',
      hint: 'Already recommended or started examinations and treatments are not automatically covered. The start of cover, health declarations and plan conditions determine eligibility.',
    },
  },
};

export const getDesktopLeadContent = (surface, language = 'de', fromBonusTopic = false) => {
  const locale = content[language] || content.de;
  const page = locale[surface] || locale.home;
  return {
    ...locale,
    ...page,
    ...(surface === 'ambulant' && fromBonusTopic ? locale.bonusEntry : {}),
    ...(GUIDED_CALLBACK_ENABLED && surface === 'home' ? getGuidedHomeContent(language) : {}),
  };
};
