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

const AmbulantAufEinenBlick = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];

  return (
    <section className="bg-white px-4 pb-12 pt-2 sm:px-6 md:pb-16 lg:px-8" aria-labelledby="ambulant-auf-einen-blick" data-healio-ambulant="auf-einen-blick">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-900/10 bg-home-ice p-5 sm:p-8">
        <h2 id="ambulant-auf-einen-blick" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-home-midnight sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-2 text-base leading-7 text-home-slate">{copy.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {copy.facts.map(({ icon: Icon, title, text, footnote }) => (
            <li key={title} className="rounded-[1.4rem] border border-emerald-950/[0.06] bg-white p-5 shadow-[0_12px_30px_rgba(7,17,31,0.06)]">
              <div className="flex items-center gap-3">
                <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-full bg-home-midnight text-home-mint-active">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-extrabold leading-tight text-home-midnight">
                  {title}{footnote && <span aria-hidden="true">*</span>}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-home-slate">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-5 text-slate-500">* {copy.footnote}</p>
      </div>
    </section>
  );
};

export default AmbulantAufEinenBlick;
