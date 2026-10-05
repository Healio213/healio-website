import { HEALIO_VOICE_CONTACT_ENABLED } from '@/config/contactChannels';
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Calculator,
  Check,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import { requestNitaConsent } from '@/components/NitaConsentWidget';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import ExplainerVideoCard from '@/components/sections/shared/ExplainerVideoCard';
import ZweiWegeFinanzierung from '@/components/sections/shared/ZweiWegeFinanzierung';
import AmbulantIKKWechsel from '@/components/sections/ambulant/AmbulantIKKWechsel';
import AmbulantVorsorgeBaustein from '@/components/sections/ambulant/AmbulantVorsorgeBaustein';
import { BEISPIEL_GRUPPE, beitragInGruppe, beitragsSpanne, findeAltersgruppe, parseGeburtsjahr, SDK_AMBULANT_BEITRAEGE } from '@/data/sdkAmbulantBeitraege';

const COPY = {
  de: {
    video: {
      eyebrow: 'Das Konzept in 3 Minuten',
      title: 'So funktioniert dein Gesundheitsbudget.',
      label: 'Gesundheitsbudget einfach erklärt',
    },
    compass: {
      eyebrow: 'Dein Budget-Kompass',
      title: 'Wofür zahlst du heute noch selbst?',
      subtitle: 'Wähle deinen wichtigsten Bereich. Du siehst sofort, worauf es beim Tarifvergleich ankommt.',
      resultEyebrow: 'Darauf achten wir für dich',
      resultTitle: 'Dein Vergleich bekommt einen klaren Fokus.',
      resultHint: 'Du legst dich hier noch nicht fest. Im Rechner kannst du alle Tarifstufen und deinen persönlichen Beitrag vergleichen.',
      goals: {
        natur: {
          title: 'Heilpraktiker &\u00a0Osteopathie',
          short: 'Behandlungen nicht länger komplett selbst zahlen.',
          focus: ['Erstattung für Naturheilverfahren', 'Höhe des verfügbaren Teilbudgets', 'Abrechnung nach den Tarifbedingungen'],
        },
        sehen: {
          title: 'Brille & Sehen',
          short: 'Neue Sehhilfe oder Augenleistung besser auffangen.',
          focus: ['Budget für Brille und Kontaktlinsen', 'Mögliche Leistungen für Augenlaser', 'Zeitraum bis zur erneuten Nutzung'],
        },
        vorsorge: {
          title: 'Vorsorge & Impfungen',
          short: 'Mehr Untersuchungen nutzen, bevor etwas fehlt.',
          focus: ['Zusätzliche Vorsorgeleistungen', 'Schutzimpfungen und Reiseimpfungen', 'Erstattungsquote des gewählten Tarifs'],
        },
        alles: {
          title: 'Das volle Gesundheitsbudget',
          short: 'Mehrere Bereiche mit einem starken Tarif verbinden.',
          focus: ['Höchstmögliches Gesamtbudget', 'Bis zu 100 % Erstattung', 'Ausgewogene Leistungen über alle Bereiche'],
        },
      },
    },
    tiers: {
      eyebrow: 'Dein Schutz, deine Höhe',
      title: 'Nicht jeder braucht 100\u00a0%. Aber jeder sollte den Unterschied sehen.',
      subtitle: 'Vergleiche nicht nur die Gesamtsumme. Hier siehst du, wie viel in jedem der vier Leistungstöpfe steckt.',
      refund: 'Erstattung',
      budget: 'Gesundheitsbudget in 2 Jahren',
      ledgerTitle: 'So verteilt sich dein Budget',
      ledgerHint: 'Vier klar getrennte Leistungstöpfe · jeweils innerhalb der Tarifbedingungen',
      perMonth: '/ Monat',
      tierGroupLabel: 'Tarifstufe wählen',
      ageLabel: 'Dein Geburtsjahr',
      agePlaceholder: 'z. B. 1985',
      ageInvalid: 'Bitte ein Geburtsjahr wie 1985 eingeben.',
      groupRange: '{{from}} bis {{to}} Jahre',
      groupOpen: 'ab {{from}} Jahren',
      priceForGroup: 'Dein Monatsbeitrag · {{group}}',
      priceRangeLabel: 'Monatsbeitrag je nach Alter',
      priceRangeJoin: 'bis',
      priceRangeHint: 'Gib oben dein Geburtsjahr ein, dann siehst du deinen Beitrag.',
      groupRule: 'Der Beitrag richtet sich nach deiner Altersgruppe. In dem Jahr, in dem du 21, 31, 41, 51, 61 oder 71 wirst, gilt der Beitrag der nächsten Gruppe.',
      priceSource: 'Beiträge der SDK-Tarife, Stand {{stand}}',
      overviewTitle: 'Alle vier Stufen auf einen Blick',
      overviewTier: 'Stufe',
      overviewBudget: 'Budget in 2 Jahren',
      overviewPriceGroup: 'Dein Beitrag ({{group}})',
      overviewPriceRange: 'Monatsbeitrag je nach Alter',
      groupsTitle: 'Alle Beiträge nach Altersgruppe',
      groupsAge: 'Alter',
      calculatorPrice: 'Persönlichen Beitrag im Rechner sehen',
      calculatorHandoff: 'Im Rechner wählst du dieselbe Stufe: Ambulant {{level}} ({{code}}). Dann siehst du deinen persönlichen Beitrag.',
      priceNote: 'Die Beiträge ersetzen kein persönliches Angebot. Deinen verbindlichen Beitrag siehst du vor dem Antrag im Tarifrechner.',
      pots: {
        vision: { label: 'Sehhilfen', detail: 'Brille & Kontaktlinsen' },
        natural: { label: 'Naturheilverfahren', detail: 'Heilpraktiker & Osteopathie' },
        prevention: { label: 'Vorsorge', detail: 'Zusätzliche Untersuchungen' },
        copay: { label: 'Zuzahlungen', detail: 'Gesetzliche Eigenanteile' },
      },
      cta: 'Budget & Beitrag berechnen',
      disclosure: 'Die Werte zeigen die tariflichen Höchstbeträge über zwei Jahre. Maßgeblich sind Versicherungsbeginn, versicherte Leistungen, Erstattungsgrenzen und die jeweils geltenden Tarifbedingungen.',
    },
    bonus: {
      eyebrow: 'Danach kommt KassenBoost',
      title: 'Lass deinen Kassenbonus mitzahlen.',
      value: 'Ganz oder teilweise',
      valueLabel: 'kann dein Bonus den Beitrag ausgleichen.',
      body: 'Dein Kassenbonus kann deinen Tarifbeitrag je nach Aktivitäten ganz oder teilweise ausgleichen. KassenBoost vergleicht dafür Beitrag, erreichbaren Bonus und Leistungen getrennt.',
      disclosure: 'Wie viel du persönlich erreichst, hängt von deiner Krankenkasse, deinen Aktivitäten, dem gewählten Tarif und den anrechenbaren Kosten ab. Wir rechnen es transparent für dich aus.',
      cta: 'Krankenkasse passend zum Tarif finden',
      mini: ['Beitrag vergleichen', 'Bonus realistisch rechnen', 'Leistungen getrennt sehen'],
    },
    calculator: {
      eyebrow: 'Konkretes Bonus-Beispiel',
      title: 'Wie weit trägt dein Bonus?',
      summary: 'Klappe den Rechner auf und teste eine IKK-classic-Beispielrechnung mit deinen Aktivitäten.',
      hint: 'Vollständig anzeigen',
      disclosure: 'Dieses Rechenmodell bildet das Bonusprogramm der IKK classic ab und ist keine Vorentscheidung für eine Krankenkasse. KassenBoost vergleicht anschließend, welche Kasse zu deinem Tarif und deinem Alltag passt.',
      secondaryCta: 'Krankenkassen mit KassenBoost vergleichen',
    },
    process: {
      eyebrow: 'So kommst du zum Ergebnis',
      title: 'Drei Schritte. Keine Tarifkunde nötig.',
      steps: [
        { title: 'Bedarf einordnen', text: 'Du sagst uns, wofür du heute selbst zahlst.' },
        { title: 'Tarif & Beitrag sehen', text: 'Der Rechner zeigt dir die Stufen passend zu deinem Alter.' },
        { title: 'Kassenbonus optimieren', text: 'KassenBoost prüft danach, welche Krankenkasse finanziell am besten dazu passt.' },
      ],
      trustTitle: 'Du entscheidest. Wir erklären.',
      trustText: 'Healio ist registrierter Versicherungsmakler. Wir zeigen Leistungen, Grenzen und Kosten vor deiner Entscheidung und bleiben danach erreichbar.',
      videoLabel: 'In 3 Minuten ansehen, wie das Gesundheitsbudget funktioniert',
      switchEyebrow: 'Kassenwechsel ohne Umwege',
      switchTitle: 'Der Wechsel ist einfacher, als du denkst.',
      switchText: 'Zusatzschutz und Krankenkasse bleiben zwei getrennte Entscheidungen. KassenBoost zeigt zuerst, ob sich ein Wechsel bei Beitrag, erreichbarem Bonus und Leistungen für dich wirklich lohnt.',
      switchCta: 'Wechselvorteil prüfen',
      assistantEyebrow: 'KI-Hilfe von Healio',
      assistantTitle: 'Noch unsicher? Frag Nita.',
      assistantText: 'Nita hilft dir, Heilpraktiker, Brille, Vorsorge und Tarifstufen in Ruhe einzuordnen. Du entscheidest erst danach.',
      assistantCta: 'Mit Nita sprechen',
    },
    faqTitle: 'Die wichtigsten Fragen vor deiner Entscheidung.',
    finalEyebrow: 'Dein nächster Schritt',
    finalTitle: 'Mach aus Selbstzahlerkosten dein Gesundheitsbudget.',
    finalText: 'Vergleiche Budget und Beitrag. Danach siehst du mit KassenBoost, ob dein Bonus den Beitrag ganz oder teilweise ausgleichen kann.',
    finalCta: 'Budget & Beitrag berechnen',
    finalHelp: 'Noch unsicher? Persönlich einordnen lassen',
    faqs: [
      {
        q: 'Was steckt hinter den 3.000 EUR?',
        a: 'Die 3.000 EUR bezeichnen das mögliche Gesundheitsbudget des leistungsstärksten ambulanten Tarifs über zwei Jahre. Wie viel tatsächlich erstattet wird, hängt vom gewählten Tarif, den eingereichten Rechnungen und den Tarifbedingungen ab.',
      },
      {
        q: 'Wie viel vom Beitrag kann mein Kassenbonus ausgleichen?',
        a: 'Ganz oder teilweise. Entscheidend sind deine Krankenkasse, deine nachgewiesenen Aktivitäten, der gewählte Tarif und die anrechenbaren Kosten. KassenBoost berechnet deshalb deinen realistisch erreichbaren Bonus und stellt ihn dem Beitrag gegenüber.',
      },
      {
        q: 'Muss ich für den Zusatzschutz die Krankenkasse wechseln?',
        a: 'Nein. Zusatzversicherung und gesetzliche Krankenkasse sind zwei getrennte Entscheidungen. Du kannst zuerst den Schutz wählen und danach mit KassenBoost prüfen, ob eine andere Krankenkasse finanziell besser dazu passt.',
      },
      {
        q: 'Gibt es eine Wartezeit?',
        a: 'Die dargestellten ambulanten Tarife haben keine allgemeine Wartezeit. Versicherungsschutz besteht für neue Versicherungsfälle ab dem vereinbarten Beginn im Rahmen der Tarifbedingungen.',
      },
      {
        q: 'Was passiert nach dem Klick auf den Rechner?',
        a: 'Du wechselst in den digitalen Tarifrechner unseres Produktpartners. Dort gibst du dein Alter ein, vergleichst die Tarifstufen und siehst den persönlichen Beitrag, bevor du einen Antrag stellst.',
      },
      {
        q: 'Wie verteilen sich die Budgets auf die Leistungen?',
        a: 'Jede Tarifstufe hat vier eigene Höchstbeträge für Sehhilfen, Naturheilverfahren, Vorsorge und gesetzliche Zuzahlungen. Die genaue Aufteilung siehst du direkt in unserem Budget-Ledger; maßgeblich bleiben die Tarifbedingungen.',
      },
      {
        q: 'Sind Heilpraktiker und Osteopathie mitversichert?',
        a: 'Beide Bereiche werden über den Topf für Naturheilverfahren berücksichtigt. Welche Behandlung und welcher Rechnungsbetrag erstattungsfähig sind, richtet sich nach der gewählten Tarifstufe und den Tarifbedingungen.',
      },
      {
        q: 'Was gilt für Brille und Kontaktlinsen?',
        a: 'Dafür gibt es je Tarifstufe einen eigenen Sehhilfen-Topf von 200 bis 500 EUR über zwei Jahre. Erstattet werden versicherte Leistungen im Rahmen des gewählten Tarifs.',
      },
      {
        q: 'Kann mein Kassenbonus den Beitrag komplett ausgleichen?',
        a: 'Das ist kein garantierter Tarifpreis. Ja, wenn dein anerkannter Kassenbonus mindestens so hoch ist wie dein Jahresbeitrag. Dann bleibt dir vom Beitrag nichts übrig. Kasse, Aktivitäten, Tarif und Bonusbedingungen bestimmen das Ergebnis.',
      },
    ],
  },
  en: {
    video: {
      eyebrow: 'The concept in 3 minutes',
      title: 'How your health budget works.',
      label: 'Health budget explained simply',
    },
    compass: {
      eyebrow: 'Your budget compass',
      title: 'What are you still paying for yourself?',
      subtitle: 'Choose your main priority and see what matters when comparing plans.',
      resultEyebrow: 'What we compare for you',
      resultTitle: 'Your comparison gets a clear focus.',
      resultHint: 'You are not committing yet. The calculator lets you compare every tier and your personal premium.',
      goals: {
        natur: { title: 'Alternative medicine & osteopathy', short: 'Stop paying the full bill yourself.', focus: ['Reimbursement for natural treatments', 'Available sub-budget', 'Billing under the policy terms'] },
        sehen: { title: 'Glasses & vision', short: 'Better cover new eyewear and eye care.', focus: ['Budget for glasses and contact lenses', 'Potential laser-eye benefits', 'Period before the budget renews'] },
        vorsorge: { title: 'Prevention & vaccines', short: 'Use more preventive services.', focus: ['Additional preventive care', 'Vaccinations and travel vaccines', 'Reimbursement rate of the chosen plan'] },
        alles: { title: 'The full health budget', short: 'Combine several areas in one strong plan.', focus: ['Highest available total budget', 'Up to 100% reimbursement', 'Balanced benefits across all areas'] },
      },
    },
    tiers: {
      eyebrow: 'Your level of cover',
      title: 'Not everyone needs 100%. Everyone should see the difference.',
      subtitle: 'Compare more than the total. See how each tier divides its budget across four benefit pots.',
      refund: 'Reimbursement',
      budget: 'Health budget over 2 years',
      ledgerTitle: 'How your budget is allocated',
      ledgerHint: 'Four separate benefit pots · each subject to the policy terms',
      perMonth: '/ month',
      tierGroupLabel: 'Choose a tier',
      ageLabel: 'Your year of birth',
      agePlaceholder: 'e.g. 1985',
      ageInvalid: 'Please enter a year of birth such as 1985.',
      groupRange: 'age {{from}} to {{to}}',
      groupOpen: 'age {{from}} and over',
      priceForGroup: 'Your monthly premium · {{group}}',
      priceRangeLabel: 'Monthly premium by age',
      priceRangeJoin: 'to',
      priceRangeHint: 'Enter your year of birth above to see your premium.',
      groupRule: 'The premium follows your age group. In the year you turn 21, 31, 41, 51, 61 or 71, the next group\'s premium applies.',
      priceSource: 'SDK tariff premiums, as of {{stand}}',
      overviewTitle: 'All four tiers at a glance',
      overviewTier: 'Tier',
      overviewBudget: 'Budget over 2 years',
      overviewPriceGroup: 'Your premium ({{group}})',
      overviewPriceRange: 'Monthly premium by age',
      groupsTitle: 'All premiums by age group',
      groupsAge: 'Age',
      calculatorPrice: 'See your personal premium in the calculator',
      calculatorHandoff: 'In the calculator you pick the same tier: Ambulant {{level}} ({{code}}). Then you see your personal premium. The calculator is in German.',
      priceNote: 'These premiums do not replace a personal quote. You see your binding premium in the calculator before you apply.',
      pots: {
        vision: { label: 'Vision aids', detail: 'Glasses & contact lenses' },
        natural: { label: 'Natural therapies', detail: 'Alternative medicine & osteopathy' },
        prevention: { label: 'Prevention', detail: 'Additional screening' },
        copay: { label: 'Co-payments', detail: 'Statutory out-of-pocket shares' },
      },
      cta: 'Calculate budget & premium',
      disclosure: 'The values are tariff maximums over two years. Policy start, insured benefits, reimbursement limits and current terms apply.',
    },
    bonus: {
      eyebrow: 'Then comes KassenBoost',
      title: 'Let your insurer bonus help pay.',
      value: 'All or part',
      valueLabel: 'of the premium may be offset by your bonus.',
      body: 'Depending on your activities, your statutory insurer bonus may offset all or part of your plan premium. KassenBoost compares contribution, achievable bonus and benefits separately.',
      disclosure: 'Your personal result depends on your insurer, activities, selected tariff and eligible costs. We calculate it transparently.',
      cta: 'Find the insurer that fits the tariff',
      mini: ['Compare contribution', 'Calculate a realistic bonus', 'See benefits separately'],
    },
    calculator: {
      eyebrow: 'A concrete bonus example',
      title: 'How far could your bonus go?',
      summary: 'Open the calculator and test an IKK classic example using your activities.',
      hint: 'Show the full calculator',
      disclosure: 'This model reflects the IKK classic bonus programme and is not a preselection. KassenBoost then compares which statutory insurer fits your plan and routine.',
      secondaryCta: 'Compare statutory insurers with KassenBoost',
    },
    process: {
      eyebrow: 'How you get your result',
      title: 'Three steps. No insurance jargon.',
      steps: [
        { title: 'Set your priority', text: 'Tell us what you currently pay yourself.' },
        { title: 'See plan & premium', text: 'The calculator shows the tiers for your age.' },
        { title: 'Optimise your bonus', text: 'KassenBoost then checks which statutory insurer fits best financially.' },
      ],
      trustTitle: 'You decide. We explain.',
      trustText: 'Healio is a registered insurance broker. We explain benefits, limits and cost before you decide and remain available afterwards.',
      videoLabel: 'Watch the 3-minute health budget explanation',
      switchEyebrow: 'A simple statutory-insurer switch',
      switchTitle: 'Switching is easier than you think.',
      switchText: 'Supplementary cover and statutory insurance remain separate decisions. KassenBoost first shows whether switching improves contribution, achievable bonus and benefits for you.',
      switchCta: 'Check your switching advantage',
      assistantEyebrow: 'Healio AI help',
      assistantTitle: 'Still unsure? Ask Nita.',
      assistantText: 'Nita helps you make sense of natural treatment, vision, prevention and the four tariff tiers before you decide.',
      assistantCta: 'Talk to Nita',
    },
    faqTitle: 'The key questions before you decide.',
    finalEyebrow: 'Your next step',
    finalTitle: 'Turn out-of-pocket costs into a health budget.',
    finalText: 'Compare budget and premium, then use KassenBoost to see whether your bonus may offset all or part of the premium.',
    finalCta: 'Calculate budget & premium',
    finalHelp: 'Not sure yet? Get personal guidance',
    faqs: [
      { q: 'What is behind the EUR 3,000?', a: 'EUR 3,000 is the potential two-year health budget in the strongest outpatient tier. Actual reimbursement depends on the chosen plan, eligible invoices and policy terms.' },
      { q: 'How much of the premium can my insurer bonus offset?', a: 'All or part of it. Your insurer, verified activities, selected plan and eligible costs determine the result. KassenBoost compares your realistically achievable bonus with the premium.' },
      { q: 'Do I have to switch statutory insurer?', a: 'No. Supplementary cover and statutory insurance are separate decisions. Choose cover first, then use KassenBoost to check whether another insurer is a better financial match.' },
      { q: 'Is there a waiting period?', a: 'The displayed outpatient plans have no general waiting period. Cover applies to new insured events from the agreed start under the applicable terms.' },
      { q: 'What happens after I open the calculator?', a: 'You continue to the digital calculator of our product partner, enter your age, compare the tiers and see your personal premium before applying. The calculator is in German.' },
      { q: 'How is the budget divided?', a: 'Each tariff has four separate maximums for vision aids, natural therapies, prevention and statutory co-payments. The ledger shows the exact split; the policy terms remain decisive.' },
      { q: 'Are alternative practitioners and osteopathy covered?', a: 'Both are considered under the natural-therapies pot. Eligible treatments and invoice amounts depend on the selected tariff and policy terms.' },
      { q: 'What applies to glasses and contact lenses?', a: 'Each tariff has a separate vision-aid pot of EUR 200 to EUR 500 over two years. Insured services are reimbursed under the selected tariff.' },
      { q: 'Can my insurer bonus offset the premium completely?', a: 'This is not a guaranteed tariff price. Yes, if your recognised insurer bonus is at least as high as your annual premium. Then none of the premium is left for you to pay. Insurer, activities, tariff and bonus terms determine the result.' },
    ],
  },
};

const GOALS = [
  { id: 'natur', kind: 'naturopathy', tone: 'butter' },
  { id: 'sehen', kind: 'glasses', tone: 'sky' },
  { id: 'vorsorge', kind: 'prevention', tone: 'mint' },
  { id: 'alles', kind: 'budget', tone: 'lavender' },
];

const TIERS = [
  { id: 50, code: 'AP5', refund: '50 %', budget: 1400, pots: { vision: 200, natural: 500, prevention: 200, copay: 500 } },
  { id: 70, code: 'AP7', refund: '70 %', budget: 2000, pots: { vision: 300, natural: 700, prevention: 300, copay: 700 } },
  { id: 90, code: 'AP9', refund: '90 %', budget: 2600, pots: { vision: 400, natural: 900, prevention: 400, copay: 900 } },
  { id: 100, code: 'AP1', refund: '100 %', budget: 3000, pots: { vision: 500, natural: 1000, prevention: 500, copay: 1000 } },
];

const POT_KEYS = ['vision', 'natural', 'prevention', 'copay'];

const BONUS_TOPIC_COPY = {
  ...COPY.de,
  process: {
    ...COPY.de.process,
    steps: [
      COPY.de.process.steps[0],
      COPY.de.process.steps[1],
      { title: 'In Ruhe entscheiden', text: 'Prüfe Leistungen und Bedingungen. Wenn der Schutz passt, kannst du online weitermachen. Ein Pflichttermin ist nicht nötig.' },
    ],
    switchEyebrow: 'Zwei getrennte Entscheidungen',
    switchTitle: 'Dein Schutz braucht keinen Kassenwechsel.',
    switchText: 'Du kannst deinen persönlichen Tarifbeitrag direkt prüfen. Ob du zusätzlich Krankenkassen vergleichen möchtest, entscheidest du unabhängig davon.',
  },
  finalText: 'Vergleiche Leistungen und deinen persönlichen Beitrag. Du kannst direkt im Tarifrechner weitermachen oder dir auf Wunsch etwas erklären lassen. Ein weiterer Bonuscheck ist dafür nicht nötig.',
  faqs: COPY.de.faqs.map((faq) => {
    if (faq.q === 'Wie viel vom Beitrag kann mein Kassenbonus ausgleichen?') {
      return { ...faq, a: 'Ganz oder teilweise, je nach Einzelfall. Ein Zuschuss ist jedoch nicht höher als dein tatsächlich gezahlter, anerkannter Beitrag. Bonusbedingungen, nachgewiesene Aktivitäten und die Anerkennung durch deine Krankenkasse entscheiden. Hier wird kein persönlicher Bonus bestätigt; der Tarifbeitrag und das Leistungsbudget werden getrennt dargestellt.' };
    }
    if (faq.q === 'Muss ich für den Zusatzschutz die Krankenkasse wechseln?') {
      return { ...faq, a: 'Nein. Zusatzschutz und gesetzliche Krankenkasse sind getrennte Entscheidungen. Du kannst hier Leistungen und Beitrag vergleichen und direkt im Tarifrechner weitermachen. Dafür brauchst du weder einen weiteren Bonuscheck noch einen Beratungstermin.' };
    }
    return faq;
  }),
};

const getAmbulantCopy = (language, fromBonusTopic) => (
  language === 'en' ? COPY.en : fromBonusTopic ? BONUS_TOPIC_COPY : COPY.de
);

export const getAmbulantCompactFaqs = (language = 'de', fromBonusTopic = false) => (
  getAmbulantCopy(language, fromBonusTopic).faqs
);

// Angebotskarte im Ambulant-Hero (Frank 30.09.2026, Vorbild /stationaer):
// höchste Stufe mit ihren vier Töpfen aus denselben Daten wie die Tarifwahl.
export const getAmbulantHeroBudget = (language = 'de') => {
  const top = TIERS[TIERS.length - 1];
  const copy = getAmbulantCopy(language, false);
  return {
    code: top.code,
    refund: top.refund,
    budget: top.budget,
    pots: POT_KEYS.map((key) => ({ key, amount: top.pots[key], ...copy.tiers.pots[key] })),
    disclosure: copy.tiers.disclosure,
  };
};

const AmbulantConversionFlow = ({ fromBonusTopic = false }) => {
  const { lang, getPath } = useLanguage();
  const { pathname } = useLocation();
  // UKV-Vorsorge-Baustein nur auf /ambulant und /en/outpatient, nie auf der
  // Heilpraktiker-Adresse und nie auf dem neutralen Themen-Anschluss.
  const vorsorgePath = pathname.replace(/\/+$/, '');
  const showVorsorgeBaustein = !fromBonusTopic
    && (vorsorgePath === '/ambulant' || vorsorgePath === '/en/outpatient');
  const language = lang === 'en' ? 'en' : 'de';
  const copy = getAmbulantCopy(language, fromBonusTopic);
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });
  const [selectedGoal, setSelectedGoal] = useState('natur');
  const [selectedTier, setSelectedTier] = useState(100);
  const [geburtsjahrEingabe, setGeburtsjahrEingabe] = useState('');
  const goal = copy.compass.goals[selectedGoal];
  const tier = TIERS.find((item) => item.id === selectedTier) || TIERS[3];
  // Beiträge nie pauschal: ohne Geburtsjahr zeigt die Seite die Spanne über
  // alle Altersgruppen, mit Geburtsjahr den Beitrag der eigenen Gruppe.
  const geburtsjahr = parseGeburtsjahr(geburtsjahrEingabe);
  const geburtsjahrUngueltig = geburtsjahrEingabe.length === 4 && geburtsjahr === null;
  const altersgruppe = findeAltersgruppe(geburtsjahr);
  const gruppenName = (gruppe) => (gruppe.bis === null ? copy.tiers.groupOpen : copy.tiers.groupRange)
    .replace('{{from}}', gruppe.von)
    .replace('{{to}}', gruppe.bis);
  const beitragFuer = (item) => beitragInGruppe(altersgruppe, item.code);
  const spanneText = (item) => {
    const { min, max } = beitragsSpanne(item.code);
    return `${monthlyEuro.format(min)} ${copy.tiers.priceRangeJoin} ${monthlyEuro.format(max)}`;
  };
  const tierBeitrag = beitragFuer(tier);
  // Der Bonusrechner braucht immer einen belegten Betrag: eigene Gruppe, sonst
  // die Beispielgruppe. Die Gruppe steht jeweils in der Tarifzeile dabei.
  const rechnerGruppe = altersgruppe ?? BEISPIEL_GRUPPE;
  const rechnerBeitrag = beitragInGruppe(rechnerGruppe, tier.code);
  const euro = useMemo(() => new Intl.NumberFormat(language === 'en' ? 'en-GB' : 'de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }), [language]);
  const monthlyEuro = useMemo(() => new Intl.NumberFormat(language === 'en' ? 'en-GB' : 'de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }), [language]);
  const calculatorHint = copy.tiers.calculatorHandoff
    .replace('{{level}}', tier.id)
    .replace('{{code}}', tier.code);

  return (
    <>
      {language === 'de' && (
        <ExplainerVideoCard
          id="erklaervideo"
          videoSrc="/erklaervideo-ambulant.mp4"
          poster="/images/erklaervideo-ambulant-poster.jpg"
          eyebrow={copy.video.eyebrow}
          title={copy.video.title}
          ariaLabel={copy.video.label}
          className="bg-home-ice"
        />
      )}

      <section id="budget-kompass" className="scroll-mt-20 bg-home-ice px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="home-eyebrow">{copy.compass.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">{copy.compass.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-home-slate sm:text-lg">{copy.compass.subtitle}</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {GOALS.map((item) => {
                const itemCopy = copy.compass.goals[item.id];
                const active = selectedGoal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedGoal(item.id)}
                    className={`home-focus group flex min-h-[150px] items-start gap-4 rounded-[1.6rem] border p-5 text-left transition duration-300 motion-reduce:transform-none ${active ? 'border-home-mint bg-white shadow-[0_20px_55px_rgba(7,17,31,0.10)] -translate-y-0.5' : 'border-emerald-950/10 bg-white/70 hover:border-home-mint/50 hover:bg-white'}`}
                  >
                    <FriendlyIcon kind={item.kind} tone={item.tone} size="md" />
                    <span>
                      <span className="block font-display text-lg font-extrabold leading-tight text-home-midnight">{itemCopy.title}</span>
                      <span className="mt-2 block text-sm leading-6 text-home-slate">{itemCopy.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-home-midnight p-6 text-white shadow-[0_24px_70px_rgba(7,17,31,0.18)] sm:p-8">
              <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-home-mint/15" />
              <img src="/images/friendly-icons/decision-thinking.webp" alt="" className="absolute right-3 top-3 h-28 w-28 object-contain opacity-95 sm:h-32 sm:w-32" aria-hidden="true" />
              <div className="relative max-w-[72%] sm:max-w-[68%]">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-home-mint-active">{copy.compass.resultEyebrow}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight">{goal.title}</h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={selectedGoal} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="relative mt-10">
                  <p className="text-lg font-bold text-white">{copy.compass.resultTitle}</p>
                  <ul className="mt-5 space-y-3">
                    {goal.focus.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-home-mint" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-slate-400">{copy.compass.resultHint}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section id="tarifwahl" className="scroll-mt-20 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {fromBonusTopic && (
            <div className="mb-10 rounded-[1.6rem] border border-emerald-900/10 bg-home-ice p-5 sm:p-7" role="note" aria-labelledby="bonus-topic-continuation-heading">
              <h2 id="bonus-topic-continuation-heading" className="font-display text-xl font-extrabold leading-tight text-home-midnight sm:text-2xl">Jetzt geht es um Leistungen und Beitrag.</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-home-slate">Vergleiche den Schutz, der zu dir passt. Du musst dafür weder die Krankenkasse wechseln noch einen Termin buchen.</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-home-slate">Ein möglicher Kassenbonus bleibt eine separate Prüfung und ist hier nicht bestätigt. Es werden keine Ergebnisse aus einem Bonuscheck übernommen.</p>
            </div>
          )}
          <div className="max-w-4xl">
            <p className="home-eyebrow">{copy.tiers.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight [text-wrap:balance] sm:text-4xl lg:text-5xl">{copy.tiers.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-home-slate sm:text-lg">{copy.tiers.subtitle}</p>
          </div>

          <div className="mt-9 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(15rem,18rem)]">
            <div className="grid grid-cols-4 gap-2 rounded-[1.4rem] bg-slate-100 p-2" role="group" aria-label={copy.tiers.tierGroupLabel}>
              {TIERS.map((item) => (
                <button key={item.id} type="button" onClick={() => setSelectedTier(item.id)} aria-pressed={selectedTier === item.id} className={`home-focus rounded-[1rem] px-2 py-3 font-display text-sm font-extrabold transition sm:text-base ${selectedTier === item.id ? 'bg-home-midnight text-white shadow-lg' : 'text-home-slate hover:bg-white'}`}>
                  <span className="block text-[10px] uppercase tracking-[0.14em] opacity-65 sm:text-xs">{item.code}</span>
                  <span className="mt-0.5 block">{item.id}{'\u00a0'}%</span>
                </button>
              ))}
            </div>
            <div className={`flex flex-col justify-center rounded-[1.4rem] border-2 bg-white px-5 py-3 transition focus-within:border-home-mint ${geburtsjahrUngueltig ? 'border-rose-300' : 'border-slate-200'}`}>
              <label htmlFor="ambulant-geburtsjahr" className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-home-slate">{copy.tiers.ageLabel}</label>
              <input
                id="ambulant-geburtsjahr"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={4}
                value={geburtsjahrEingabe}
                onChange={(event) => setGeburtsjahrEingabe(event.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder={copy.tiers.agePlaceholder}
                aria-invalid={geburtsjahrUngueltig || undefined}
                aria-describedby={geburtsjahrUngueltig ? 'ambulant-geburtsjahr-fehler' : undefined}
                className="mt-1 w-full min-w-0 bg-transparent font-display text-2xl font-extrabold text-home-midnight placeholder:text-base placeholder:font-semibold placeholder:text-slate-400 focus:outline-none"
              />
              {geburtsjahrUngueltig && <p id="ambulant-geburtsjahr-fehler" className="mt-1 text-xs font-semibold text-rose-600">{copy.tiers.ageInvalid}</p>}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-emerald-50 shadow-[0_24px_70px_rgba(7,17,31,0.10)]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative flex flex-col overflow-hidden bg-home-midnight p-7 text-white sm:p-9">
                <div className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-home-mint/10 blur-2xl" />
                <p className="relative font-display text-xs font-extrabold uppercase tracking-[0.2em] text-home-mint-active">Ambulant {tier.id} · {tier.code}</p>
                <p className="relative mt-4 font-display text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">{euro.format(tier.budget)}</p>
                <p className="relative mt-2 text-sm text-slate-300">{copy.tiers.budget}</p>
                <div className="relative mt-8 inline-flex self-start items-baseline gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                  <strong className="font-display text-2xl text-home-mint-active">{tier.refund}</strong>
                  <span className="text-sm text-slate-300">{copy.tiers.refund}</span>
                </div>
                <div className="relative mt-8 border-t border-white/10 pt-6 lg:mt-auto" aria-live="polite">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                    {altersgruppe ? copy.tiers.priceForGroup.replace('{{group}}', gruppenName(altersgruppe)) : copy.tiers.priceRangeLabel}
                  </p>
                  {tierBeitrag !== null ? (
                    <p className="mt-2 font-display text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl" data-healio-ambulant="age-price">
                      {monthlyEuro.format(tierBeitrag)} <span className="text-base font-semibold tracking-normal text-slate-300">{copy.tiers.perMonth}</span>
                    </p>
                  ) : (
                    <p className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl" data-healio-ambulant="age-price">
                      {spanneText(tier)} <span className="text-sm font-semibold text-slate-300">{copy.tiers.perMonth}</span>
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-6 text-slate-300">{altersgruppe ? copy.tiers.groupRule : copy.tiers.priceRangeHint}</p>
                  <p className="mt-3 text-xs text-slate-400">{copy.tiers.priceSource.replace('{{stand}}', SDK_AMBULANT_BEITRAEGE.stand)}</p>
                </div>
              </div>
              <div className="p-7 sm:p-9">
                <p className="font-display text-xl font-extrabold text-home-midnight">{copy.tiers.ledgerTitle}</p>
                <p className="mt-2 text-sm leading-6 text-home-slate">{copy.tiers.ledgerHint}</p>
                <AnimatePresence mode="wait">
                  <motion.div key={tier.code} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                    {POT_KEYS.map((potKey, index) => {
                      const pot = copy.tiers.pots[potKey];
                      const amount = tier.pots[potKey];
                      return (
                        <div key={potKey} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${['bg-[#61cfa5]', 'bg-[#eab95f]', 'bg-[#92bfe4]', 'bg-[#b3a1df]'][index]}`} aria-hidden="true" />
                              <p className="truncate font-display text-base font-extrabold text-home-midnight">{pot.label}</p>
                            </div>
                            <p className="mt-1 truncate pl-[18px] text-xs text-home-slate sm:text-sm">{pot.detail}</p>
                            <div className="ml-[18px] mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-home-mint transition-[width] duration-500" style={{ width: `${Math.max(20, amount / 10)}%` }} />
                            </div>
                          </div>
                          <strong className="whitespace-nowrap font-display text-xl font-extrabold text-home-midnight">{euro.format(amount)}</strong>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
                <a href={sdkUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackSdkClick('ambulant-compact-tariff', referrer)} className="home-focus mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_35px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none">
                  <Calculator className="mr-2 h-5 w-5" aria-hidden="true" />
                  {copy.tiers.cta}
                </a>
                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-home-slate" data-healio-ambulant="calculator-handoff">{calculatorHint}</p>
                <p className="mt-5 max-w-2xl text-xs leading-5 text-slate-500">{copy.tiers.disclosure}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white">
            <p className="border-b border-slate-200 bg-slate-50 px-5 py-3 font-display text-sm font-extrabold text-home-midnight sm:px-6">
              {copy.tiers.overviewTitle}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left sm:min-w-[34rem]">
                <caption className="sr-only">{copy.tiers.overviewTitle}</caption>
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    <th scope="col" className="px-5 py-3 sm:px-6">{copy.tiers.overviewTier}</th>
                    <th scope="col" className="hidden px-5 py-3 sm:table-cell sm:px-6">{copy.tiers.refund}</th>
                    <th scope="col" className="px-5 py-3 sm:px-6">{copy.tiers.overviewBudget}</th>
                    <th scope="col" className="px-5 py-3 text-right sm:px-6">{altersgruppe ? copy.tiers.overviewPriceGroup.replace('{{group}}', gruppenName(altersgruppe)) : copy.tiers.overviewPriceRange}</th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((item) => (
                    <tr
                      key={item.code}
                      aria-current={item.id === tier.id ? 'true' : undefined}
                      className={`border-b border-slate-100 text-sm last:border-b-0 ${item.id === tier.id ? 'bg-emerald-50/70' : ''}`}
                    >
                      <th scope="row" className="px-5 py-3.5 font-display text-base font-extrabold text-home-midnight sm:px-6">
                        Ambulant {item.id} · {item.code}
                      </th>
                      <td className="hidden px-5 py-3.5 text-home-slate sm:table-cell sm:px-6">{item.refund}</td>
                      <td className="px-5 py-3.5 text-home-slate sm:px-6">{euro.format(item.budget)}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right font-display font-extrabold text-home-midnight sm:px-6">
                        {beitragFuer(item) !== null
                          ? monthlyEuro.format(beitragFuer(item))
                          : <span className="font-semibold">{spanneText(item)}</span>} <span className="text-xs font-semibold text-slate-500">{copy.tiers.perMonth}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <details className="group border-t border-slate-200" data-healio-ambulant="age-groups">
              <summary className="home-focus flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 font-display text-sm font-extrabold text-home-midnight sm:px-6 [&::-webkit-details-marker]:hidden">
                {copy.tiers.groupsTitle}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="overflow-x-auto border-t border-slate-100">
                <table className="w-full border-collapse text-left text-xs sm:min-w-[34rem] sm:text-sm">
                  <caption className="sr-only">{copy.tiers.groupsTitle}</caption>
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      <th scope="col" className="px-3 py-3 sm:px-6">{copy.tiers.groupsAge}</th>
                      {TIERS.map((item) => (
                        <th key={item.code} scope="col" className="px-2 py-3 text-right sm:px-6">{item.code}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SDK_AMBULANT_BEITRAEGE.gruppen.map((gruppe) => (
                      <tr key={gruppe.von} aria-current={gruppe === altersgruppe ? 'true' : undefined} className={`border-b border-slate-100 last:border-b-0 ${gruppe === altersgruppe ? 'bg-emerald-50/70' : ''}`}>
                        <th scope="row" className="px-3 py-3 font-semibold text-home-midnight sm:whitespace-nowrap sm:px-6">{gruppenName(gruppe)}</th>
                        {TIERS.map((item) => (
                          <td key={item.code} className={`whitespace-nowrap px-2 py-3 text-right sm:px-6 ${item.id === tier.id ? 'font-extrabold text-home-midnight' : 'text-home-slate'}`}>{monthlyEuro.format(gruppe[item.code])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            <p className="border-t border-slate-100 px-5 py-3 text-xs leading-5 text-slate-500 sm:px-6">{copy.tiers.priceNote} {copy.tiers.priceSource.replace('{{stand}}', SDK_AMBULANT_BEITRAEGE.stand)}.</p>
          </div>

          {/* Vorsorge-Baustein der UKV (Frank 05.10.2026): kleine Zusatzoption
              unter der SDK-Tarifwahl, bewusst innerhalb dieses Abschnitts, damit
              die IKK-Wechsel-Strecke direkt nach der Tarifwahl bleibt. Auf dem
              neutralen Themen-Anschluss (src=reel-f05/bonus-check) und nicht auf
              der Heilpraktiker-Adresse; showVorsorgeBaustein gilt nur für
              /ambulant und /en/outpatient. */}
          {showVorsorgeBaustein && <AmbulantVorsorgeBaustein />}
        </div>
      </section>

      {!fromBonusTopic && (
        <>
      {/* Die IKK-Wechsel-Strecke mit der Brücke (bis 29.08. auf allen drei
          Produktseiten, auf Franks Wunsch zurück). Seit 30.09. direkt nach der
          Tarifwahl als erster Teil der Kassen-Geschichte (Frank: die Szene soll
          im Fokus stehen); die Regel „erst Tarif, dann Kasse“ bleibt. */}
      <AmbulantIKKWechsel variant="ambulant" />

      <ZweiWegeFinanzierung produkt="ambulant" className="bg-home-ice" />

      <section className="bg-[#071722] px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-home-mint/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-[#123241] to-home-midnight p-6 shadow-2xl">
              <img src="/images/friendly-icons/decision-weighing.webp" alt="" className="mx-auto h-56 w-56 object-contain sm:h-64 sm:w-64" aria-hidden="true" />
              <div className="rounded-2xl border border-home-mint/25 bg-home-mint/10 px-5 py-4 text-center">
                <p className="font-display text-4xl font-extrabold tracking-[-0.04em] text-home-mint-active">{copy.bonus.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-200">{copy.bonus.valueLabel}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-home-mint-active">{copy.bonus.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{copy.bonus.title}</h2>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white">{copy.bonus.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {copy.bonus.mini.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-200">{item}</span>)}
            </div>
            <p className="mt-6 max-w-2xl border-l-2 border-home-mint/50 pl-4 text-sm leading-6 text-slate-400">{copy.bonus.disclosure}</p>
            {language !== 'en' && (
              /* Ein Satz mit Link auf die IKK-Bonus-Landingpage, damit die
                 Positionen und Nachweise nachlesbar sind. Kein zweiter Button. */
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                Alle bonusfähigen Positionen der IKK classic mit Beträgen, Nachweisen und Fristen stehen im{' '}
                <Link to="/ratgeber/ikk-classic-bonusprogramm-2026" className="font-bold text-white underline underline-offset-4 hover:text-home-mint-active">
                  Ratgeber zum Bonusprogramm 2026
                </Link>.
              </p>
            )}
            <Link to={language === 'en' ? '/en/kassenboost' : '/kassenboost'} className="home-focus mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none">
              {copy.bonus.cta}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-home-ice px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <details className="group overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white shadow-[0_20px_60px_rgba(7,17,31,0.08)]">
            <summary className="home-focus flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-6 sm:px-8 sm:py-7 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 items-center gap-4">
                <FriendlyIcon kind="calculator" tone="butter" size="md" />
                <span className="min-w-0">
                  <span className="block font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">{copy.calculator.eyebrow}</span>
                  <span className="mt-1 block font-display text-xl font-extrabold leading-tight text-home-midnight sm:text-2xl">{copy.calculator.title}</span>
                  <span className="mt-1 hidden text-sm leading-6 text-home-slate sm:block">{copy.calculator.summary}</span>
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 font-display text-xs font-extrabold text-home-midnight sm:text-sm">
                <span className="hidden md:inline">{copy.calculator.hint}</span>
                <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-home-midnight text-home-mint-active"><ChevronDown className="h-5 w-5 transition group-open:rotate-180" /></span>
              </span>
            </summary>
            <div className="border-t border-slate-200 px-4 py-7 sm:px-7 sm:py-9">
              <p className="mx-auto mb-7 max-w-4xl border-l-2 border-home-mint pl-4 text-sm leading-6 text-home-slate">{copy.calculator.disclosure}</p>
              <AmbulantBonusCalculator
                embedded
                defaultMonatsbeitrag={rechnerBeitrag}
                tariffInfoText={language === 'de' ? `Tarif Ambulant ${tier.id} (${tier.code}) · ${monthlyEuro.format(rechnerBeitrag)}/Monat, ${gruppenName(rechnerGruppe)}` : `Ambulant ${tier.id} (${tier.code}) · ${monthlyEuro.format(rechnerBeitrag)}/month, ${gruppenName(rechnerGruppe)}`}
                effectiveValue={language === 'de' ? `bis zu ${euro.format(tier.budget)}` : `up to ${euro.format(tier.budget)}`}
                calculatorHint={calculatorHint}
                effectiveNote={language === 'de' ? 'Beispielrechnung mit dem Bonusmodell der IKK classic. Der Zuschuss ist auf den nachgewiesenen Jahresbeitrag begrenzt; maßgeblich sind die aktuellen Bonus- und Tarifbedingungen.' : 'Example using the IKK classic bonus model. The subsidy is capped at the documented annual premium and subject to current bonus and tariff terms.'}
                secondaryCtaOverride={{
                  href: language === 'en' ? '/en/kassenboost' : '/kassenboost',
                  label: copy.calculator.secondaryCta,
                }}
              />
            </div>
          </details>
        </div>
      </section>

        </>
      )}

      <section className="bg-[#fbfaf7] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="home-eyebrow">{copy.process.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">{copy.process.title}</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.process.steps.map((step, index) => (
              <article key={step.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(7,17,31,0.06)]">
                <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-home-midnight font-display text-sm font-extrabold text-home-mint-active">{index + 1}</span>
                <h3 className="mt-5 font-display text-xl font-extrabold text-home-midnight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-home-slate">{step.text}</p>
              </article>
            ))}
          </div>

          {fromBonusTopic && <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#eaf8f2] via-[#f4fbf8] to-[#fff8e5] p-6 sm:p-8">
            <div className="grid min-w-0 items-center gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="min-w-0">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">{copy.process.switchEyebrow}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-home-midnight sm:text-3xl">{copy.process.switchTitle}</h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-home-slate">{copy.process.switchText}</p>
                {!fromBonusTopic && (
                  <Link to={language === 'en' ? '/en/kassenboost' : '/kassenboost'} className="home-focus mt-5 inline-flex min-h-11 items-center font-display text-sm font-extrabold text-emerald-800 underline decoration-home-mint/40 decoration-2 underline-offset-4 transition hover:text-emerald-950">
                    {copy.process.switchCta}<ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
              <img src="/images/friendly-icons/decision-choice.webp" alt="" className="mx-auto hidden h-48 w-48 object-contain md:block" aria-hidden="true" />
            </div>
          </div>}

          <div className={`mt-6 grid grid-cols-1 gap-6 ${HEALIO_VOICE_CONTACT_ENABLED ? 'lg:grid-cols-[1.08fr_0.92fr]' : ''}`}>
            <div className="rounded-[1.8rem] border border-emerald-900/10 bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FriendlyIcon kind="broker" tone="mint" size="lg" />
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-home-midnight">{copy.process.trustTitle}</h3>
                  <p className="mt-3 text-base leading-7 text-home-slate">{copy.process.trustText}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-home-ice px-3 py-2 text-xs font-bold text-emerald-900"><BadgeCheck className="h-4 w-4 text-home-mint" /> § 34d GewO</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-home-ice px-3 py-2 text-xs font-bold text-emerald-900"><ShieldCheck className="h-4 w-4 text-home-mint" /> SDK Produktpartner</span>
                  </div>
                </div>
              </div>
            </div>
            {HEALIO_VOICE_CONTACT_ENABLED && <div className="grid gap-4">
              <div className="flex items-center gap-4 rounded-[1.8rem] border border-violet-200 bg-[#f6f1ff] p-5 sm:p-6">
                <img src="/images/friendly-icons/personal-support.webp" alt="" className="h-20 w-20 shrink-0 object-contain drop-shadow-[0_10px_18px_rgba(82,53,122,0.18)]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-700">{copy.process.assistantEyebrow}</p>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-home-midnight">{copy.process.assistantTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-home-slate">{copy.process.assistantText}</p>
                  <button type="button" onClick={() => requestNitaConsent('global_launcher')} className="home-focus mt-4 inline-flex min-h-11 items-center rounded-full bg-home-midnight px-5 font-display text-sm font-extrabold text-white transition hover:bg-[#143247]">
                    <Bot className="mr-2 h-4 w-4 text-home-mint-active" />{copy.process.assistantCta}
                  </button>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8" itemScope itemType="https://schema.org/FAQPage">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl font-extrabold tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">{copy.faqTitle}</h2>
          <div className="mt-10 space-y-3">
            {copy.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-[#fbfcfc] px-5 py-1" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="home-focus flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-extrabold text-home-midnight sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span itemProp="name">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-home-mint transition group-open:rotate-180" />
                </summary>
                <div className="pb-5 pr-8 text-sm leading-7 text-home-slate sm:text-base" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><span itemProp="text">{faq.a}</span></div>
              </details>
            ))}
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[2.2rem] bg-home-midnight px-6 py-10 text-center text-white shadow-[0_25px_70px_rgba(7,17,31,0.20)] sm:px-10 sm:py-14">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-home-mint/15" />
            <p className="relative font-display text-xs font-extrabold uppercase tracking-[0.22em] text-home-mint-active">{copy.finalEyebrow}</p>
            <h2 className="relative mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] [text-wrap:balance] hyphens-auto sm:text-4xl sm:hyphens-none lg:text-5xl">{copy.finalTitle}</h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{copy.finalText}</p>
            <p className="relative mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-200" data-healio-ambulant="calculator-handoff">{calculatorHint}</p>
            <a href={sdkUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackSdkClick('ambulant-compact-final', referrer)} className="home-focus relative mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none">
              <Calculator className="mr-2 h-5 w-5" />
              {copy.finalCta}
            </a>
            <div className="relative mt-5">
              <Link to={getPath('kontakt')} className="text-sm font-semibold text-slate-300 underline decoration-white/25 underline-offset-4 transition hover:text-white">{copy.finalHelp}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AmbulantConversionFlow;
