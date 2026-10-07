import React from 'react';
import { CalendarRange, ClipboardList, Clock3, Wallet } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Kasten „Auf einen Blick“ unter dem Ambulant-Hero (Marktanalyse 06.10.2026,
// W4): die vier Fragen, die vor dem Abschluss am häufigsten offen bleiben.
// Grundlage SDK-AVB Teil II AP-Tarife 1.753a, Stand 01.01.2023 (auf sdk.de am
// 06.10.2026 unverändert): „Es bestehen keine Wartezeiten.“, Töpfe „innerhalb
// von jeweils 2 Kalenderjahren ab Versicherungsbeginn“, Sehhilfen in allen
// Stufen 100 %, refraktive Chirurgie je Auge und Versicherungsfall, in den
// ersten vier Kalenderjahren die Hälfte. Gesundheitsfragen nach Roter Linie:
// „ohne Ablehnung“, nie „keine Gesundheitsfragen“.
const COPY = {
  de: {
    title: 'Auf einen Blick',
    intro: 'Das gilt in allen vier Stufen des ambulanten SDK-Tarifs.',
    facts: [
      {
        icon: Clock3,
        title: 'Keine allgemeine Wartezeit',
        text: 'Dein Schutz gilt ab Versicherungsbeginn. Was dann schon behandelt wird oder angeraten ist, bleibt ausgenommen.',
      },
      {
        icon: CalendarRange,
        title: 'Keine Anlaufstaffel',
        footnote: true,
        text: 'Jeder Topf steht dir sofort in voller Höhe zur Verfügung und gilt je zwei Kalenderjahre ab Versicherungsbeginn. Startest du im Laufe des Jahres, ist der erste Zeitraum kürzer.',
      },
      {
        icon: ClipboardList,
        title: 'Gesundheitsfragen ohne Ablehnung',
        text: 'Im Antrag beantwortest du Gesundheitsfragen. Abgelehnt wirst du grundsätzlich nicht, bei Vorerkrankungen kann ein Zuschlag oder ein einzelner Ausschluss dazukommen.',
      },
      {
        icon: Wallet,
        title: 'Erstattung je Topf',
        text: 'Jeder der vier Töpfe hat eine eigene Grenze. Je nach Stufe erstattet der Tarif 50 bis 100 % der Rechnung, Sehhilfen immer zu 100 %.',
      },
    ],
    footnote: 'Augenlasern zählt nicht zu den vier Töpfen. In Ambulant 100 (AP1) sind es bis zu 1.000 EUR je Auge und Versicherungsfall, in den anderen Stufen weniger. In den ersten vier Kalenderjahren gibt es die Hälfte. Grundlage sind die SDK-Tarifbedingungen der AP-Tarife (1.753a, Stand 01.01.2023).',
  },
  en: {
    title: 'At a glance',
    intro: 'This applies to all four tiers of the SDK outpatient tariff.',
    facts: [
      {
        icon: Clock3,
        title: 'No general waiting period',
        text: 'Your cover starts on the policy start date. Treatment already under way or recommended by then remains excluded.',
      },
      {
        icon: CalendarRange,
        title: 'No ramp-up period',
        footnote: true,
        text: 'Every pot is available in full right away and applies per two calendar years from the policy start. If you start during the year, the first period is shorter.',
      },
      {
        icon: ClipboardList,
        title: 'Health questions without rejection',
        text: 'You answer health questions in the application. As a rule you are not rejected; pre-existing conditions may add a surcharge or a single exclusion.',
      },
      {
        icon: Wallet,
        title: 'Reimbursement per pot',
        text: 'Each of the four pots has its own limit. Depending on the tier, the tariff reimburses 50 to 100% of the invoice, vision aids always at 100%.',
      },
    ],
    footnote: 'Laser eye surgery is not part of the four pots. In Ambulant 100 (AP1) it is up to EUR 1,000 per eye and insured event, less in the other tiers. In the first four calendar years, half of that applies. Based on the SDK terms for the AP tariffs (1.753a, as of 1 January 2023).',
  },
};

// Frank 07.10.2026: Karten liebevoller gestalten. Die vier Fakten bekommen
// reihum sanfte Pastelltöne; die Linien-Symbole sitzen in einer weichen,
// runden Marke im passenden Ton.
const TONES = [
  { card: 'bg-[#f4fbf7]', badge: 'bg-[#d6f1e4] text-[#0b7a5a]' },
  { card: 'bg-[#f5faff]', badge: 'bg-[#d9eafa] text-[#245f83]' },
  { card: 'bg-[#f9f7ff]', badge: 'bg-[#e6e1f8] text-[#4b4485]' },
  { card: 'bg-[#fffcf2]', badge: 'bg-[#fbeab4] text-[#70520b]' },
];

const AmbulantAufEinenBlick = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];

  return (
    <section className="bg-white px-4 pb-12 pt-2 sm:px-6 md:pb-16 lg:px-8" aria-labelledby="ambulant-auf-einen-blick" data-healio-ambulant="auf-einen-blick">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-900/10 bg-white p-5 shadow-[0_18px_44px_rgba(7,17,31,0.05)] sm:p-8">
        <h2 id="ambulant-auf-einen-blick" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-home-midnight sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-2 text-base leading-7 text-home-slate">{copy.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {copy.facts.map(({ icon: Icon, title, text, footnote }, index) => {
            const tone = TONES[index % TONES.length];
            return (
              <li key={title} className={`rounded-[1.4rem] border border-[#07111f]/[0.07] p-5 shadow-[0_10px_26px_rgba(7,17,31,0.05)] ${tone.card}`}>
                <div className="flex items-center gap-3">
                  <span className={`inline-grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-[0_6px_14px_rgba(7,17,31,0.08)] ring-2 ring-white/80 ${tone.badge}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-extrabold leading-tight text-home-midnight">
                    {title}{footnote && <span aria-hidden="true">*</span>}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-home-slate">{text}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-xs leading-5 text-slate-500">* {copy.footnote}</p>
      </div>
    </section>
  );
};

export default AmbulantAufEinenBlick;
