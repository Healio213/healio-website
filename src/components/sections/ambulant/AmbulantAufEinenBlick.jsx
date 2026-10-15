import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileDetails from '@/components/ui/MobileDetails';
import { HEALIO_PHONE_DISPLAY, HEALIO_PHONE_TEL } from '@/config/contactChannels';

// „Auf einen Blick“ direkt unter dem Ambulant-Hero. Frank 15.10.2026: Die
// Sektion war zu schlicht. Sie ist die wichtigste der Seite, damit Besucher
// sofort verstehen, worum es geht. Reihenfolge nach Franks Vorgabe: erst der
// Nutzen, zuletzt der Kassenbonus als Geheimtipp, danach der Knopf zur
// Tarifwahl. Mobil ohne Wischen: zwei Kennzahlen, eine kurze Liste, der
// Geheimtipp und der Knopf. Ab md großzügige Karten.
//
// Belege: SDK-AVB Teil II AP-Tarife 1.753a, Stand 01.01.2023 (auf sdk.de am
// 06.10.2026 unverändert): „Es bestehen keine Wartezeiten.“, Töpfe „innerhalb
// von jeweils 2 Kalenderjahren ab Versicherungsbeginn“, Erstattung je Stufe
// 50 bis 100 %, Sehhilfen in allen Stufen 100 %, refraktive Chirurgie je Auge
// und Versicherungsfall, in den ersten vier Kalenderjahren die Hälfte.
// Gesundheitsfragen nach Roter Linie: „ohne Ablehnung“, nie „keine
// Gesundheitsfragen“. Vorerkrankungen per Zuschlag voll mitversichert, keine
// Leistungsausschlüsse (SDK-Broschüre 1.781, Frank 14.10.2026). Makler nach
// § 34d GewO, Vermittlerregister D-C1LE-OVLQH-98 (IHK Hamburg).
const COPY = {
  de: {
    eyebrow: 'Ambulanter SDK-Tarif',
    title: 'Auf einen Blick',
    intro: 'Das solltest du vor der Tarifwahl wissen.',
    upTo: 'bis zu',
    stats: [
      {
        kind: 'naturopathy',
        tone: 'mint',
        card: 'from-[#f4fbf7] to-[#dcf3e8] ring-[#cde8dc]',
        label: 'Erstattung',
        number: '100',
        unit: '%',
        short: 'Heilpraktiker, Osteopathie, Brille, Vorsorge',
        text: 'Für Heilpraktiker, Osteopathie, Brille und Vorsorge. Je nach Stufe erstattet der Tarif 50 bis 100 %, Sehhilfen in jeder Stufe 100 %.',
      },
      {
        kind: 'budget',
        tone: 'butter',
        card: 'from-[#fffcf2] to-[#fcefc8] ring-[#efe0b2]',
        // Weiches Trennzeichen: auf sehr schmalen Handys „Gesundheits-budget“.
        label: 'Gesundheits\u00ADbudget',
        number: '3.000',
        unit: 'EUR',
        footnote: true,
        short: 'in zwei Kalenderjahren',
        text: 'In zwei Kalenderjahren, verteilt auf vier eigene Töpfe. Jeder Topf steht dir ab Beginn in voller Höhe zur Verfügung.',
      },
    ],
    facts: [
      {
        kind: 'calendar',
        tone: 'sky',
        title: 'Keine Wartezeit',
        short: 'Schutz ab Beginn, außer für laufende oder angeratene Behandlungen.',
        text: 'Dein Schutz gilt ab Versicherungsbeginn. Was vor Beginn schon behandelt wird oder angeraten ist, zahlt der Tarif nicht.',
      },
      {
        kind: 'protection',
        tone: 'lavender',
        title: 'Vorerkrankungen mitversichert',
        short: 'Mit Zuschlag statt Leistungsausschluss.',
        text: 'Sie kosten einen Zuschlag und sind dann voll mitversichert. Für Vorerkrankungen gibt es keine Leistungsausschlüsse.',
      },
      {
        kind: 'document',
        tone: 'mint',
        title: 'Gesundheitsfragen ja, keine Ablehnung',
        text: 'Du beantwortest sie im Antrag. Abgelehnt wirst du deswegen nicht.',
      },
      {
        kind: 'support',
        tone: 'coral',
        title: 'Persönlich begleitet',
        short: 'Makler nach § 34d GewO, im Vermittlerregister.',
        text: 'Healio ist Makler mit Erlaubnis nach § 34d GewO und im Vermittlerregister eingetragen. Wir begleiten dich bis zum Antrag.',
        phone: true,
      },
    ],
    phoneLabel: 'Ruf uns an:',
    tip: {
      badge: 'Unser Geheimtipp',
      title: 'Dein Kassenbonus zahlt mit.',
      short: 'Viele Krankenkassen belohnen Vorsorge und Sport mit einem Bonus. Damit kannst du dir deinen Beitrag ganz oder teilweise zurückholen.',
      text: 'Viele Krankenkassen belohnen Vorsorge, Sport und Kurse mit einem Bonus. Damit kannst du dir deinen Beitrag ganz oder teilweise zurückholen. Wie viel, hängt von deiner Kasse und deinen Aktivitäten ab.',
    },
    cta: 'Tarif wählen',
    ctaHint: 'Mit deinem Geburtsjahr siehst du dort sofort deinen Beitrag.',
    ctaHintShort: 'Dort siehst du sofort deinen Beitrag.',
    detailsSummary: 'Bedingungen im Detail',
    notes: [
      '* Die 3.000 EUR gelten in Stufe Ambulant 100 (AP1). Jeder Topf gilt für zwei Kalenderjahre ab Versicherungsbeginn. Startest du im Laufe des Jahres, ist der erste Zeitraum kürzer.',
      'Augenlasern zählt nicht zu den vier Töpfen. In Ambulant 100 (AP1) sind es bis zu 1.000 EUR je Auge und Versicherungsfall, in den anderen Stufen weniger. In den ersten vier Kalenderjahren gibt es die Hälfte.',
      'Den Kassenbonus beantragst du selbst bei deiner Krankenkasse. Wie hoch er ist, hängt von Kasse und Aktivitäten ab. Er wird nicht automatisch mit dem Beitrag verrechnet.',
      'Grundlage sind die SDK-Tarifbedingungen der AP-Tarife (1.753a, Stand 01.01.2023).',
    ],
  },
  en: {
    eyebrow: 'SDK outpatient plan',
    title: 'At a glance',
    intro: 'What to know before you choose your plan.',
    upTo: 'up to',
    stats: [
      {
        kind: 'naturopathy',
        tone: 'mint',
        card: 'from-[#f4fbf7] to-[#dcf3e8] ring-[#cde8dc]',
        label: 'Reimbursement',
        number: '100',
        unit: '%',
        short: 'Naturopaths, osteopathy, glasses, prevention',
        text: 'For naturopaths (Heilpraktiker), osteopathy, glasses and preventive care. Depending on the tier, the plan reimburses 50 to 100%, vision aids 100% in every tier.',
      },
      {
        kind: 'budget',
        tone: 'butter',
        card: 'from-[#fffcf2] to-[#fcefc8] ring-[#efe0b2]',
        label: 'Health budget',
        number: '3,000',
        unit: 'EUR',
        unitFirst: true,
        footnote: true,
        short: 'over two calendar years',
        text: 'Over two calendar years, split into four separate pots. Every pot is available in full from the start of cover.',
      },
    ],
    facts: [
      {
        kind: 'calendar',
        tone: 'sky',
        title: 'No waiting period',
        short: 'Cover from the start, except for ongoing or recommended treatment.',
        text: 'Your cover starts on the policy start date. Treatment already under way or recommended before the start is not covered.',
      },
      {
        kind: 'protection',
        tone: 'lavender',
        title: 'Pre-existing conditions covered',
        short: 'A surcharge instead of an exclusion.',
        text: 'They cost a surcharge and are then fully covered. There are no exclusions for pre-existing conditions.',
      },
      {
        kind: 'document',
        tone: 'mint',
        title: 'Health questions, no rejection',
        text: 'You answer them in the application. You will not be rejected because of them.',
      },
      {
        kind: 'support',
        tone: 'coral',
        title: 'Personal support',
        short: 'Broker under § 34d GewO, in the broker register.',
        text: 'Healio is a broker licensed under § 34d GewO and listed in the German broker register. We support you up to the application.',
        phone: true,
      },
    ],
    phoneLabel: 'Call us:',
    tip: {
      badge: 'Our insider tip',
      title: 'Your health fund bonus helps pay.',
      short: 'Many statutory health funds reward check-ups and sport with a bonus. You can use it to win back all or part of your premium.',
      text: 'Many statutory health funds reward check-ups, sport and courses with a bonus. You can use it to win back all or part of your premium. How much depends on your fund and your activities.',
    },
    cta: 'Choose your plan',
    ctaHint: 'Enter your year of birth there to see your premium straight away.',
    ctaHintShort: 'See your premium there straight away.',
    detailsSummary: 'Conditions in detail',
    notes: [
      '* EUR 3,000 applies to the Ambulant 100 tier (AP1). Each pot applies per two calendar years from the start of cover. If you start during the year, the first period is shorter.',
      'Laser eye surgery is not part of the four pots. In Ambulant 100 (AP1) it is up to EUR 1,000 per eye and insured event, less in the other tiers. In the first four calendar years, half of that applies.',
      'You claim the health fund bonus from your fund yourself. The amount depends on your fund and activities. It is not offset against the premium automatically.',
      'Based on the SDK terms for the AP tariffs (1.753a, as of 1 January 2023).',
    ],
  },
};

const goToTariffs = (event) => {
  const target = document.getElementById('tarifwahl');
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
};

// Das Sternchen hängt am letzten Teil, damit es auch auf schmalen Handys
// nicht allein in eine eigene Zeile rutscht.
const StatValue = ({ number, unit, unitFirst, footnote, upTo }) => {
  const star = footnote && <sup className="ml-0.5 text-base md:text-2xl" aria-hidden="true">*</sup>;
  return (
    <p className="font-display font-extrabold text-home-midnight">
      <span className="block text-base font-bold text-home-slate md:text-lg">{upTo}</span>
      <span className="mt-0.5 flex flex-wrap items-baseline gap-x-1 leading-none tracking-[-0.04em] md:mt-1 md:gap-x-2">
        {unitFirst && <span className="text-base md:text-3xl">{unit}</span>}
        <span className="whitespace-nowrap text-[1.6rem] min-[360px]:text-[1.75rem] min-[390px]:text-[2rem] md:text-6xl lg:text-7xl">{number}{unitFirst && star}</span>
        {!unitFirst && <span className="whitespace-nowrap text-base md:text-3xl">{unit}{star}</span>}
      </span>
    </p>
  );
};

const AmbulantAufEinenBlick = ({ fromBonusTopic = false }) => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-home-ice via-white to-white px-4 pb-6 pt-8 sm:px-6 md:py-20 lg:px-8"
      aria-labelledby="ambulant-auf-einen-blick"
      data-healio-ambulant="auf-einen-blick"
    >
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-home-mint/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-1/3 -z-10 hidden h-96 w-96 rounded-full bg-[#fbe7a8]/30 blur-3xl md:block" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-[#0b7a5a] md:text-xs md:tracking-[0.22em]">{copy.eyebrow}</p>
          <h2 id="ambulant-auf-einen-blick" className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-4xl md:mt-3 lg:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-2 text-base leading-7 text-home-slate sm:text-lg md:mt-4">{copy.intro}</p>
        </div>

        {/* Die zwei Kernzahlen: mobil zwei kompakte Kacheln nebeneinander, ab md große Karten. */}
        <ul className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:gap-5">
          {copy.stats.map((stat) => (
            <li key={stat.label} className={`relative flex min-w-0 flex-col overflow-hidden rounded-[1.4rem] bg-gradient-to-br p-4 ring-1 shadow-[0_10px_26px_rgba(7,17,31,0.06)] md:rounded-[2rem] md:p-8 lg:p-10 ${stat.card}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-sm font-extrabold text-[#0b6048] md:text-base md:uppercase md:tracking-[0.12em]">{stat.label}</p>
                  <div className="mt-2 md:mt-3">
                    <StatValue {...stat} upTo={copy.upTo} />
                  </div>
                </div>
                <FriendlyIcon kind={stat.kind} tone={stat.tone} size="xl" className="hidden md:inline-grid lg:h-28 lg:w-28" />
              </div>
              <p className="mt-2 text-base leading-6 text-home-slate md:hidden">{stat.short}</p>
              <p className="mt-5 hidden max-w-[44ch] text-lg leading-8 text-home-slate md:block">{stat.text}</p>
            </li>
          ))}
        </ul>

        {/* Die vier Fakten: mobil eine ruhige Liste ohne Wischen, ab md vier Karten. */}
        <ul className="mt-4 divide-y divide-slate-200/80 md:mt-5 md:grid md:grid-cols-2 md:gap-5 md:divide-y-0 lg:grid-cols-4">
          {copy.facts.map((fact) => (
            <li key={fact.title} className="flex items-start gap-4 py-4 md:flex-col md:gap-0 md:rounded-[1.6rem] md:border md:border-[#07111f]/[0.07] md:bg-white md:p-6 md:shadow-[0_14px_34px_rgba(7,17,31,0.06)]">
              <FriendlyIcon kind={fact.kind} tone={fact.tone} size="sm" className="md:hidden" />
              <FriendlyIcon kind={fact.kind} tone={fact.tone} size="lg" className="hidden md:inline-grid" />
              <div className="min-w-0 md:mt-5">
                <h3 className="font-display text-lg font-extrabold leading-snug text-home-midnight md:text-xl">{fact.title}</h3>
                {fact.short && <p className="mt-1 text-base leading-6 text-home-slate md:hidden">{fact.short}</p>}
                <p className="mt-2 hidden text-base leading-7 text-home-slate md:block">{fact.text}</p>
                {fact.phone && (
                  <a
                    href={HEALIO_PHONE_TEL}
                    className="home-focus mt-1 inline-flex min-h-11 items-center gap-2 rounded-md font-display text-base font-extrabold text-[#0b6048] underline decoration-[#0b6048]/40 underline-offset-4 hover:decoration-[#0b6048] md:mt-3"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{copy.phoneLabel} {HEALIO_PHONE_DISPLAY}</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Der Geheimtipp als letzter, hervorgehobener Punkt. Für Besucher aus dem
            Bonus-Check (fromBonusTopic) entfällt er: Kassenbonus und Zusatzschutz
            bleiben dort getrennte Entscheidungen. */}
        {!fromBonusTopic && (
          <div className="relative mt-4 overflow-hidden rounded-[1.6rem] bg-[#071726] p-5 text-white shadow-[0_24px_70px_rgba(7,17,31,0.18)] md:mt-5 md:rounded-[2rem] md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-home-mint/15" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-home-mint/10 blur-3xl" aria-hidden="true" />
            <div className="relative md:flex md:items-center md:gap-8">
              <FriendlyIcon kind="bonus" tone="butter" size="xl" className="hidden md:inline-grid lg:h-28 lg:w-28" />
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="inline-flex rounded-full bg-[#fbe7a8] px-3 py-1 font-display text-sm font-extrabold uppercase tracking-[0.08em] text-[#5c4208]">
                    {copy.tip.badge}
                  </p>
                  <FriendlyIcon kind="bonus" tone="butter" size="sm" className="md:hidden" />
                </div>
                <h3 className="mt-3 font-display text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] md:text-4xl">{copy.tip.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-200 md:hidden">{copy.tip.short}</p>
                <p className="mt-3 hidden max-w-[62ch] text-lg leading-8 text-slate-200 md:block">{copy.tip.text}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:items-center md:gap-6">
          <a
            href="#tarifwahl"
            onClick={goToTariffs}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-8 font-display text-base font-extrabold text-home-midnight shadow-[0_16px_42px_rgba(37,201,144,0.28)] transition hover:-translate-y-0.5 hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 motion-reduce:transform-none md:w-auto md:text-lg"
          >
            {copy.cta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <p className="text-base leading-6 text-home-slate">
            <span className="md:hidden">{copy.ctaHintShort}</span>
            <span className="hidden md:inline">{copy.ctaHint}</span>
          </p>
        </div>

        <MobileDetails summary={copy.detailsSummary} className="mt-4 text-home-midnight">
          <ul className="space-y-2 text-sm leading-6 text-slate-500 md:mt-8 md:max-w-5xl md:text-xs md:leading-5">
            {copy.notes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </MobileDetails>
      </div>
    </section>
  );
};

export default AmbulantAufEinenBlick;
