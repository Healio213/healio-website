import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
          title: 'Heilpraktiker & Osteopathie',
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
      title: 'Nicht jeder braucht 100 %. Aber jeder sollte den Unterschied sehen.',
      subtitle: 'Vergleiche nicht nur die Gesamtsumme. Hier siehst du, wie viel in jedem der vier Leistungstöpfe steckt.',
      refund: 'Erstattung',
      budget: 'Gesundheitsbudget in 2 Jahren',
      ledgerTitle: 'So verteilt sich dein Budget',
      ledgerHint: 'Vier klar getrennte Leistungstöpfe · jeweils innerhalb der Tarifbedingungen',
      examplePrice: 'Veröffentlichter SDK-Orientierungswert',
      perMonth: '/ Monat',
      calculatorPrice: 'Persönlichen Beitrag im Rechner sehen',
      priceNote: 'Die veröffentlichten Orientierungswerte ersetzen kein persönliches Angebot. Dein Beitrag hängt insbesondere von Eintrittsalter, Gesundheitsangaben und Tarifstufe ab.',
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
      title: 'Hol dir deinen Beitrag zurück.',
      value: 'Bis zu 100 %',
      valueLabel: 'deines Beitrags sind ausgleichbar.',
      body: 'Dein Kassenbonus kann deinen effektiven Tarifbeitrag bis zu 100 % ausgleichen. KassenBoost vergleicht dafür Beitrag, erreichbaren Bonus und Leistungen getrennt.',
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
    finalText: 'Vergleiche Budget und Beitrag. Danach siehst du mit KassenBoost, ob dein Bonus den Beitrag teilweise oder bis zu 100 % ausgleichen kann.',
    finalCta: 'Budget & Beitrag berechnen',
    finalHelp: 'Noch unsicher? Persönlich einordnen lassen',
    faqs: [
      {
        q: 'Was steckt hinter den 3.000 EUR?',
        a: 'Die 3.000 EUR bezeichnen das mögliche Gesundheitsbudget des leistungsstärksten ambulanten Tarifs über zwei Jahre. Wie viel tatsächlich erstattet wird, hängt vom gewählten Tarif, den eingereichten Rechnungen und den Tarifbedingungen ab.',
      },
      {
        q: 'Kann mein Kassenbonus wirklich 100 % des Beitrags ausgleichen?',
        a: 'Ja, bis zu 100 % sind möglich. Entscheidend sind deine Krankenkasse, deine nachgewiesenen Aktivitäten, der gewählte Tarif und die anrechenbaren Kosten. KassenBoost berechnet deshalb deinen realistisch erreichbaren Bonus und stellt ihn dem Beitrag gegenüber.',
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
        q: 'Was bedeutet „effektiv ab 0 EUR“?',
        a: 'Das ist kein garantierter Tarifpreis. Wenn dein persönlich erreichbarer Kassenbonus mindestens so hoch ist wie dein anrechenbarer Jahresbeitrag, kann deine effektive Belastung bis auf 0 EUR sinken. Kasse, Aktivitäten, Tarif und Bonusbedingungen bestimmen das Ergebnis.',
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
      examplePrice: 'Published SDK orientation value',
      perMonth: '/ month',
      calculatorPrice: 'See your personal premium in the calculator',
      priceNote: 'Published orientation values do not replace a personal quote. Your premium depends in particular on entry age, health information and the selected tariff.',
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
      title: 'Get your premium back.',
      value: 'Up to 100%',
      valueLabel: 'of the premium may be offset.',
      body: 'Your statutory insurer bonus may offset up to 100% of your effective premium. KassenBoost compares contribution, achievable bonus and benefits separately.',
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
    finalText: 'Compare budget and premium, then use KassenBoost to see whether your bonus may offset part or up to 100% of the premium.',
    finalCta: 'Calculate budget & premium',
    finalHelp: 'Not sure yet? Get personal guidance',
    faqs: [
      { q: 'What is behind the EUR 3,000?', a: 'EUR 3,000 is the potential two-year health budget in the strongest outpatient tier. Actual reimbursement depends on the chosen plan, eligible invoices and policy terms.' },
      { q: 'Can my insurer bonus really offset 100% of the premium?', a: 'Yes, up to 100% may be possible. Your insurer, verified activities, selected plan and eligible costs determine the result. KassenBoost compares your realistically achievable bonus with the premium.' },
      { q: 'Do I have to switch statutory insurer?', a: 'No. Supplementary cover and statutory insurance are separate decisions. Choose cover first, then use KassenBoost to check whether another insurer is a better financial match.' },
      { q: 'Is there a waiting period?', a: 'The displayed outpatient plans have no general waiting period. Cover applies to new insured events from the agreed start under the applicable terms.' },
      { q: 'What happens after I open the calculator?', a: 'You continue to the digital calculator of our product partner, enter your age, compare the tiers and see your personal premium before applying. The calculator is in German.' },
      { q: 'How is the budget divided?', a: 'Each tariff has four separate maximums for vision aids, natural therapies, prevention and statutory co-payments. The ledger shows the exact split; the policy terms remain decisive.' },
      { q: 'Are alternative practitioners and osteopathy covered?', a: 'Both are considered under the natural-therapies pot. Eligible treatments and invoice amounts depend on the selected tariff and policy terms.' },
      { q: 'What applies to glasses and contact lenses?', a: 'Each tariff has a separate vision-aid pot of EUR 200 to EUR 500 over two years. Insured services are reimbursed under the selected tariff.' },
      { q: 'What does “effectively from EUR 0” mean?', a: 'It is not a guaranteed tariff price. If your achievable statutory-insurer bonus reaches the eligible annual premium, your effective cost may fall to EUR 0. Insurer, activities, tariff and bonus terms determine the result.' },
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
  { id: 50, code: 'AP5', refund: '50 %', budget: 1400, price: 14.14, pots: { vision: 200, natural: 500, prevention: 200, copay: 500 } },
  { id: 70, code: 'AP7', refund: '70 %', budget: 2000, price: 23.10, pots: { vision: 300, natural: 700, prevention: 300, copay: 700 } },
  { id: 90, code: 'AP9', refund: '90 %', budget: 2600, price: 37.95, pots: { vision: 400, natural: 900, prevention: 400, copay: 900 } },
  { id: 100, code: 'AP1', refund: '100 %', budget: 3000, price: 44.13, pots: { vision: 500, natural: 1000, prevention: 500, copay: 1000 } },
];

const POT_KEYS = ['vision', 'natural', 'prevention', 'copay'];

export const getAmbulantCompactFaqs = (language = 'de') => COPY[language === 'en' ? 'en' : 'de'].faqs;

const AmbulantConversionFlow = () => {
  const { lang, getPath } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });
  const [selectedGoal, setSelectedGoal] = useState('natur');
  const [selectedTier, setSelectedTier] = useState(100);
  const goal = copy.compass.goals[selectedGoal];
  const tier = TIERS.find((item) => item.id === selectedTier) || TIERS[3];
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

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
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
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)]">
            <div>
              <p className="home-eyebrow">{copy.tiers.eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl lg:text-5xl">{copy.tiers.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-home-slate sm:text-lg">{copy.tiers.subtitle}</p>
            </div>
            <div className="grid grid-cols-4 gap-2 rounded-[1.4rem] bg-slate-100 p-2" aria-label={copy.tiers.title}>
              {TIERS.map((item) => (
                <button key={item.id} type="button" onClick={() => setSelectedTier(item.id)} aria-pressed={selectedTier === item.id} className={`home-focus rounded-[1rem] px-2 py-3 font-display text-sm font-extrabold transition sm:text-base ${selectedTier === item.id ? 'bg-home-midnight text-white shadow-lg' : 'text-home-slate hover:bg-white'}`}>
                  <span className="block text-[10px] uppercase tracking-[0.14em] opacity-65 sm:text-xs">{item.code}</span>
                  <span className="mt-0.5 block">{item.id} %</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-emerald-50 shadow-[0_24px_70px_rgba(7,17,31,0.10)]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative overflow-hidden bg-home-midnight p-7 text-white sm:p-9">
                <div className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full bg-home-mint/10 blur-2xl" />
                <p className="relative font-display text-xs font-extrabold uppercase tracking-[0.2em] text-home-mint-active">Ambulant {tier.id} · {tier.code}</p>
                <p className="relative mt-4 font-display text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">{euro.format(tier.budget)}</p>
                <p className="relative mt-2 text-sm text-slate-300">{copy.tiers.budget}</p>
                <div className="relative mt-8 inline-flex items-baseline gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                  <strong className="font-display text-2xl text-home-mint-active">{tier.refund}</strong>
                  <span className="text-sm text-slate-300">{copy.tiers.refund}</span>
                </div>
                <div className="relative mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{copy.tiers.examplePrice}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-white">{monthlyEuro.format(tier.price)} <span className="text-sm font-semibold text-slate-300">{copy.tiers.perMonth}</span></p>
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
                <p className="mt-4 text-sm font-semibold text-home-slate">{copy.tiers.calculatorPrice}</p>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">{copy.tiers.priceNote}</p>
                <p className="mt-5 max-w-2xl text-xs leading-5 text-slate-500">{copy.tiers.disclosure}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <Link to={language === 'en' ? '/en/kassenboost' : '/kassenboost'} className="home-focus mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none">
              {copy.bonus.cta}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-home-ice px-4 py-16 sm:px-6 md:py-20 lg:px-8">
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
                defaultMonatsbeitrag={44.13}
                tariffInfoText={language === 'de' ? 'Tarif Ambulant 100 (AP1) · veröffentlichter SDK-Orientierungswert 44,13 EUR/Monat' : 'Ambulant 100 (AP1) · published SDK orientation value EUR 44.13/month'}
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

          <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#eaf8f2] via-[#f4fbf8] to-[#fff8e5] p-6 sm:p-8">
            <div className="grid min-w-0 items-center gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="min-w-0">
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">{copy.process.switchEyebrow}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-home-midnight sm:text-3xl">{copy.process.switchTitle}</h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-home-slate">{copy.process.switchText}</p>
                <Link to={language === 'en' ? '/en/kassenboost' : '/kassenboost'} className="home-focus mt-5 inline-flex min-h-11 items-center font-display text-sm font-extrabold text-emerald-800 underline decoration-home-mint/40 decoration-2 underline-offset-4 transition hover:text-emerald-950">
                  {copy.process.switchCta}<ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <img src="/images/friendly-icons/decision-choice.webp" alt="" className="mx-auto hidden h-48 w-48 object-contain md:block" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
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
            <div className="grid gap-4">
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
            </div>
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
            <h2 className="relative mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">{copy.finalTitle}</h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{copy.finalText}</p>
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
