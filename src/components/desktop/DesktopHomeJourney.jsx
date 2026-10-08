import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { KASSENBOOST_COMPARE_URL } from '@/config/kassenBoost';
import { useLanguage } from '@/hooks/useLanguage';

// Frank 07.10.2026: dieselben Cartoon-Karten wie am Handy auch am Rechner.
const stepScenes = ['/images/home-cards/schritt1-kasse.webp', '/images/home-cards/schritt2-schutz.webp', '/images/home-cards/schritt3-bonus.webp'];
const productScenes = { ambulant: '/images/home-cards/ambulant.webp', zahn: '/images/home-cards/zahn.webp', stationaer: '/images/home-cards/stationaer.webp' };

const SceneImage = ({ src }) => (
  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071726]">
    <img src={src} alt="" aria-hidden="true" width="720" height="540" loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" />
  </div>
);

const content = {
  de: {
    processTitle: 'Deine Kasse kann mehr. Dein Zusatzschutz auch.',
    processText: 'Erst verstehen, was deine Krankenkasse ermöglicht. Dann entscheiden, welche zusätzlichen Leistungen du brauchst. So wird aus drei einzelnen Entscheidungen ein klarer Weg.',
    steps: [
      {
        title: 'Kassenpotenzial prüfen',
        text: 'Vergleiche Beitrag, Leistungen und erreichbaren Bonus deiner gesetzlichen Krankenkasse. Ob du die Kasse wechselst, entscheidest du selbst.',
      },
      {
        title: 'Leistungen und Beitrag wählen',
        text: 'Wähle den Zusatzschutz, der zu deinem Bedarf passt. Leistungen, Beitrag, Wartezeiten und Grenzen gehören gemeinsam in die Entscheidung.',
      },
      {
        title: 'Bonus mit Nachweisen nutzen',
        text: 'Den Versicherungsbeitrag zahlst du zunächst selbst. Erfüllst du die Bonusbedingungen und reichst die je nach Bonusprogramm nötigen Aktivitäts- und Kostennachweise ein, kann deine Kasse einen Teil oder den ganzen anrechenbaren Beitrag ausgleichen.',
      },
    ],
    productsTitle: 'Welche Leistungen sind dir wichtig?',
    productsText: 'Vertiefe den Bereich, der zu deinem Alltag passt. Du siehst zuerst die Leistungen und ihre Grenzen.',
    products: [
      {
        routeKey: 'ambulant',
        title: 'Heilpraktiker, Brille und Vorsorge.',
        text: 'Ambulanter Zusatzschutz für Heilpraktiker, Osteopathie, Sehhilfen und Vorsorge. Prüfe, welche Erstattung der jeweilige Tarif vorsieht.',
        link: 'Ambulante Leistungen ansehen',
      },
      {
        routeKey: 'zahn',
        title: 'Zahnersatz und Prophylaxe.',
        text: 'Vergleiche Erstattung, Eigenanteil und die Regeln für bereits angeratene Behandlungen. Der Zahn-Check zeigt dir den passenden nächsten Schritt.',
        link: 'Zahnleistungen ansehen',
      },
      {
        routeKey: 'stationaer',
        title: 'Zimmer und Arztwahl im Krankenhaus.',
        text: 'Ein- oder Zweibettzimmer, wahlärztliche Leistungen oder Unfallschutz: Sieh dir an, welche Wahlmöglichkeiten tatsächlich im Vertrag stehen.',
        link: 'Klinikleistungen ansehen',
      },
    ],
    trustTitle: 'Beenden Sie das Verschenken Ihrer Kassenboni.',
    trustText: 'Rechnen Sie nach, fordern Sie Ihren Bonus ein und sichern Sie sich den Zusatzschutz, der zu Ihnen passt.',
    trustItems: [
      {
        title: 'Registrierter Versicherungsmakler',
        text: 'Healio vermittelt mit Erlaubnis nach § 34d Abs. 1 GewO. Die Angaben zum Vermittlerstatus stehen in unserer Erstinformation.',
        link: 'Erstinformation lesen',
      },
      {
        title: 'Persönlich erreichbar',
        text: 'Bei Fragen zu Auswahl, Vertrag und Belegen begleiten wir dich auch nach dem Abschluss.',
      },
      {
        title: 'Grenzen vor dem Abschluss',
        text: 'Leistungen, Beiträge, Voraussetzungen und Tarifgrenzen stellen wir gegenüber, bevor du dich entscheidest.',
      },
    ],
    primaryCta: 'Jetzt Kassenpotenzial berechnen',
    ctaHint: 'Beitrag, Bonus und Leistungen getrennt vergleichen.',
  },
  en: {
    processTitle: 'Your health fund can do more. So can your supplementary cover.',
    processText: 'First understand what your statutory health fund offers. Then decide which additional benefits you need. Three separate decisions become one clear path.',
    steps: [
      {
        title: 'Check your health fund’s potential',
        text: 'Compare contributions, benefits and the bonus you could qualify for through your statutory health fund. Whether to change health funds is your decision.',
      },
      {
        title: 'Choose benefits and a premium',
        text: 'Choose supplementary cover that fits your needs. Consider benefits, premiums, waiting periods and limits together.',
      },
      {
        title: 'Claim your bonus with evidence',
        text: 'You pay your insurance premium first. If you meet the bonus conditions and submit the activity and expense evidence required by the programme, your health fund may offset some or all of the eligible premium.',
      },
    ],
    productsTitle: 'Which benefits matter to you?',
    productsText: 'Explore the area that fits your everyday needs. Understand the benefits and their limits first.',
    products: [
      {
        routeKey: 'ambulant',
        title: 'Naturopathy, glasses and prevention.',
        text: 'Outpatient supplementary cover for alternative practitioners, osteopathy, vision aids and preventive care. Check the reimbursement available under each plan.',
        link: 'Explore outpatient benefits',
      },
      {
        routeKey: 'zahn',
        title: 'Dentures and preventive dental care.',
        text: 'Compare reimbursement, your share of the cost and the rules for treatment already recommended. The dental check shows you the appropriate next step.',
        link: 'Explore dental benefits',
      },
      {
        routeKey: 'stationaer',
        title: 'Hospital rooms and choice of doctor.',
        text: 'Single or double rooms, privately billed medical care or accident cover: see which options are actually included in the contract.',
        link: 'Explore hospital benefits',
      },
    ],
    trustTitle: 'Stop giving away your health fund bonuses.',
    trustText: 'Do the maths, claim your bonus and find supplementary cover that suits you.',
    trustItems: [
      {
        title: 'Registered insurance broker',
        text: 'Healio operates with authorisation under § 34d (1) of the German Trade Regulation Act. Our initial information document explains our intermediary status.',
        link: 'Read our initial information',
      },
      {
        title: 'Personal support',
        text: 'We remain available after you take out cover for questions about your choices, contract and supporting documents.',
      },
      {
        title: 'Limits explained before you commit',
        text: 'We set out benefits, premiums, eligibility requirements and plan limits before you make your decision.',
      },
    ],
    primaryCta: 'Calculate health fund potential now',
    ctaHint: 'Compare contributions, bonuses and benefits separately.',
  },
};

const DesktopHomeJourney = ({ language = 'de' }) => {
  const copy = content[language] || content.de;
  const { getPath } = useLanguage();

  return (
    <div className="hidden lg:block">
      <section
        id="desktop-home-process"
        className="scroll-mt-24 bg-[#f4f8f6] py-20 xl:py-24"
        aria-labelledby="desktop-home-process-title"
      >
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-[1.05fr_0.95fr] items-end gap-16 xl:gap-24">
            <h2
              id="desktop-home-process-title"
              className="max-w-[20ch] font-display text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-home-midnight xl:text-5xl [text-wrap:balance]"
            >
              {copy.processTitle}
            </h2>
            <p className="max-w-[68ch] text-lg leading-8 text-[#334f46]">
              {copy.processText}
            </p>
          </div>

          <ol className="mt-14 grid grid-cols-3 gap-6 xl:gap-8">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="group min-w-0 overflow-hidden rounded-3xl border border-[#d5e6dd] bg-white shadow-[0_18px_44px_rgba(7,17,31,0.07)]">
                <SceneImage src={stepScenes[index]} />
                <div className="p-7">
                  <h3 className="flex items-center gap-3 font-display text-xl font-extrabold leading-7 text-home-midnight xl:text-2xl">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eef6f2] font-display text-sm font-extrabold tabular-nums text-[#0b6048]" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#334f46]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="desktop-home-products"
        className="scroll-mt-24 bg-white py-20 xl:py-24"
        aria-labelledby="desktop-home-products-title"
      >
        <div className="mx-auto w-full max-w-7xl px-8">
          <h2
            id="desktop-home-products-title"
            className="font-display text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-home-midnight xl:text-5xl [text-wrap:balance]"
          >
            {copy.productsTitle}
          </h2>
          <p className="mt-5 max-w-[68ch] text-lg leading-8 text-[#435767]">
            {copy.productsText}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 xl:gap-8">
            {copy.products.map((product) => (
              <article key={product.routeKey} className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[#d5e0db] bg-white shadow-[0_18px_44px_rgba(7,17,31,0.07)]">
                <SceneImage src={productScenes[product.routeKey]} />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="max-w-[22ch] font-display text-2xl font-extrabold leading-8 tracking-[-0.015em] text-home-midnight [text-wrap:balance]">
                    {product.title}
                  </h3>
                  <p className="mb-6 mt-4 text-base leading-7 text-[#435767]">{product.text}</p>
                  <Link
                    to={getPath(product.routeKey)}
                    className="mt-auto inline-flex min-h-12 items-center gap-2 self-start rounded-sm py-3 font-display text-base font-bold text-[#075f46] underline decoration-[#aec8bc] underline-offset-4 transition-colors hover:text-home-midnight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075f46]"
                  >
                    {product.link}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="desktop-home-trust"
        className="bg-home-midnight py-20 text-white xl:py-24"
        aria-labelledby="desktop-home-trust-title"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_1fr] gap-16 px-8 xl:gap-24">
          <div>
            <h2
              id="desktop-home-trust-title"
              className="max-w-[17ch] font-display text-[2.75rem] font-extrabold leading-[1.1] tracking-[-0.025em] xl:text-5xl [text-wrap:balance]"
            >
              {copy.trustTitle}
            </h2>
            <p className="mt-5 max-w-[45ch] text-lg leading-8 text-[#d4e1e5]">{copy.trustText}</p>
            <a
              href={KASSENBOOST_COMPARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-home-mint px-7 py-4 font-display text-base font-extrabold text-home-midnight transition-colors hover:bg-home-mint-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {copy.primaryCta}
              <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-4 text-sm leading-6 text-[#c5d6de]">{copy.ctaHint}</p>
          </div>

          <ul className="divide-y divide-[#49606d] border-y border-[#49606d]">
            {copy.trustItems.map((item) => (
              <li key={item.title} className="py-6">
                <h3 className="font-display text-xl font-bold leading-7">{item.title}</h3>
                <p className="mt-2 max-w-[65ch] text-base leading-7 text-[#d4e1e5]">{item.text}</p>
                {item.link && (
                  <Link
                    to={getPath('erstinformation')}
                    className="mt-2 inline-flex min-h-12 items-center gap-2 rounded-sm py-3 text-sm font-bold text-home-mint-active underline decoration-[#799d91] underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {item.link}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DesktopHomeJourney;
