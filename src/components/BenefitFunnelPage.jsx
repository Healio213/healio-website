import { Link, useLocation } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import PregnancyBonusExample from '@/components/PregnancyBonusExample';
import { getPregnancyOnwardPath } from '@/lib/pregnancyBonus';
import { createFAQSchema } from '@/lib/createSchemaMarkup';

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-home-midnight';
const primary = `inline-flex min-h-[48px] items-center justify-center rounded-full bg-home-mint px-7 py-3 text-center font-semibold text-home-midnight hover:bg-home-mint-active ${focus}`;
const textLink = `underline decoration-home-slate/40 underline-offset-4 hover:decoration-home-midnight ${focus}`;
const wrap = 'mx-auto w-full max-w-6xl px-5 sm:px-8';

const TOPICS = {
  pregnancy: {
    path: '/schwangerschaft', title: 'Gut versorgt. Für dich und dein Baby.',
    intro: 'In der Schwangerschaft möchtest du wissen, welche Versorgung zu dir passt. Wir helfen dir, zusätzliche Leistungen und passenden Zusatzschutz einzuordnen.',
    image: 'pregnancy', benefitTitle: 'Was ist dir jetzt wichtig?',
    benefits: [
      ['Zusätzliche Vorsorge verstehen', 'Ein Toxoplasmose-Test beim Frauenarzt? Kläre zuerst, ob deine Kasse die Untersuchung in deinem Fall übernimmt. Für mögliche Eigenkosten lohnt sich ein genauer Blick auf den Zusatzschutz.', 'prevention-vaccination'],
      ['Auch an dich denken', 'Du interessierst dich für Osteopathie? Ob eine Behandlung sinnvoll ist und wer die Kosten übernimmt, klärst du vorab mit deinem Behandler und dem Versicherer.', 'naturopathy'],
    ],
    protectionTitle: 'Zusatzschutz, der zu deiner Situation passt.',
    protectionText: 'Ambulante Tarife können Leistungen für Vorsorge, Naturheilverfahren und Sehhilfen enthalten. Entscheidend ist, welche Leistungen du brauchst und was der konkrete Tarif dafür vorsieht.',
    caution: 'Du bist bereits schwanger? Lass vor dem Abschluss klären, welche Leistungen möglich sind. Bereits angeratene oder begonnene Behandlungen sind nicht automatisch mitversichert.',
    product: '/ambulant', productLabel: 'Ambulante Tarife und Beitrag ansehen',
  },

};

const commonFaq = [
  ['Habe ich hier schon etwas beantragt?', 'Nein. Diese Seite hilft dir bei der Orientierung. Einen Versicherungsantrag stellst du erst in der ausdrücklich gekennzeichneten Antragsstrecke. Deinen Kassenbonus beantragst du getrennt bei deiner Krankenkasse.'],
  ['Kann der Bonus meinen Beitrag bezahlen?', 'Er kann den Beitrag teilweise oder vollständig ausgleichen, wenn anerkannte Maßnahmen und zuschussfähige Kosten ausreichen. Der Versicherungsbeitrag bleibt fällig. Die Krankenkasse prüft deine Nachweise und zahlt den anerkannten Bonus später aus. Geldbonus und zweckgebundener Zuschuss sind Alternativen, nicht zwei zusätzliche Zahlungen.'],
  ['Muss ich die Krankenkasse wechseln?', 'Nein. Passenden Zusatzschutz kannst du unabhängig von einem Kassenwechsel prüfen. Welche Bonusmöglichkeiten du hast, hängt von deiner Krankenkasse und ihren Teilnahmebedingungen ab.'],
];
const film = [['10 gesetzliche Schwangerschaftsvorsorgen', '300 EUR'], ['Ein anerkannter Kurs und aktive Studio-Mitgliedschaft', '150 EUR'], ['Anerkannter BMI und Blutdruck, mit erforderlicher Aktivität', '150 EUR'], ['Zahnvorsorge in beiden Halbjahren', '30 EUR']];

export default function BenefitFunnelPage() {
  const config = TOPICS.pregnancy;
  const location = useLocation();
  // No answers, health information or arbitrary query strings cross into a product page.
  const productPath = getPregnancyOnwardPath(location.search);
  const faq = [
    ['Sind Vorsorgetests und Osteopathie automatisch versichert?', 'Nein. Prüfe zuerst die gesetzliche Leistung. Ob Zusatzschutz verbleibende Kosten übernimmt, hängt unter anderem von Tarif, Leistung, Behandler und Versicherungsbeginn ab. Ein neuer Termin allein bedeutet keinen neuen Versicherungsfall.'],
    ['Wie entstehen die bis zu 3.000 EUR Gesundheitsbudget?', 'Im SDK-Tarif Ambulant 100 (AP1) gibt es je zwei Kalenderjahre vier getrennte Leistungstöpfe: bis zu 1.000 EUR für Naturheilverfahren, 500 EUR für Sehhilfen, 500 EUR für Vorsorge, Impfungen und Präventionskurse sowie 1.000 EUR für Hilfsmittel nach GKV-Vorleistung und gesetzliche Zuzahlungen. Erstattet werden versicherte Kosten innerhalb dieser Grenzen, keine pauschale Barauszahlung. Maßgeblich sind Versicherungsbeginn und Tarifbedingungen. Das 630-EUR-Bonusbeispiel ist davon getrennt: Ein anerkannter Bonuszuschuss kann den Beitrag mitfinanzieren, erhöht aber nicht die Leistungstöpfe.'],
    ...commonFaq,
  ];
  return (
    <>
      <SEOHead title={`${config.title} | Healio`} description={config.intro}
        canonicalUrl={`https://healio.de${config.path}`} robots="index, follow"
        schemaMarkup={createFAQSchema(faq.map(([question, answer]) => ({ question, answer })))} />
      <div className="bg-white text-home-midnight" data-funnel-topic="pregnancy">
        <section className="overflow-hidden bg-home-ice pb-12 pt-28 md:pb-20 md:pt-36">
          <div className={`${wrap} grid items-center gap-6 md:grid-cols-[1.2fr_1fr] md:gap-12`}>
            <div>
              <h1 className="max-w-[15ch] font-friendly text-[2.7rem] leading-[1.05] sm:text-6xl lg:text-7xl">{config.title}</h1>
              <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-home-slate">{config.intro}</p>
              <a href="#zusatzschutz" className={`mt-7 ${primary}`}>Passenden Zusatzschutz ansehen</a>
              <p className="mt-3 text-sm text-home-slate">Erst verstehen. Dann entscheiden. Ohne Terminpflicht.</p>
            </div>
            <img src={`/images/friendly-icons/${config.image}.webp`} alt="" width="420" height="420"
              className="mx-auto w-full max-w-[220px] object-contain md:max-w-[400px]" fetchPriority="high" />
          </div>
        </section>

        <section className={`${wrap} py-12 md:py-20`}>
          <h2 className="font-friendly text-3xl md:text-4xl">{config.benefitTitle}</h2>
          <div className="mt-7 grid gap-9 md:grid-cols-2 md:gap-16">
            {config.benefits.map(([title, description, icon]) => (
              <div key={title} className="flex items-start gap-4">
                <img src={`/images/friendly-icons/${icon}.webp`} alt="" width="72" height="72" className="h-16 w-16 shrink-0" loading="lazy" />
                <div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-2 max-w-prose leading-relaxed text-home-slate">{description}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="zusatzschutz" className="scroll-mt-28 bg-home-ice py-12 md:py-16">
          <div className={`${wrap} grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16`}>
            <div>
              <h2 className="max-w-[22ch] font-friendly text-3xl md:text-4xl">{config.protectionTitle}</h2>
              <p className="mt-4 max-w-prose leading-relaxed text-home-slate">{config.protectionText}</p>
              <Link data-product-link to={productPath} className={`mt-6 ${primary}`}>{config.productLabel}</Link>
              <p className="mt-3 text-sm text-home-slate">Du siehst zuerst die Tarifinformationen. Noch kein Abschluss.</p>
            </div>
            <div className="border-l-4 border-home-mint pl-6">
              <h3 className="font-display text-xl font-bold">Darauf kommt es an</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-home-slate">
                <li>Leistungen, die zu deinen Wünschen passen</li>
                <li>Ein Beitrag, den du auch ohne Bonus tragen kannst</li>
                <li>Klare Grenzen und Voraussetzungen vor dem Abschluss</li>
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-home-slate">{config.caution}</p>
            </div>
          </div>
        </section>

        <section id="bonus-check" className={`${wrap} scroll-mt-28 py-12 md:py-20`}>
          <div className="grid items-center gap-6 md:grid-cols-[240px_1fr] md:gap-14">
            <img src="/images/friendly-icons/bonus-you-mascot.webp" alt="" width="240" height="240" className="mx-auto w-36 md:w-60" loading="lazy" />
            <div>
              <h2 className="font-friendly text-3xl md:text-4xl">Dein Kassenbonus. Was ist bei dir drin?</h2>
              <p className="mt-4 max-w-[60ch] leading-relaxed text-home-slate">Vorsorge, Sport oder ein Gesundheitskurs können sich auch finanziell lohnen. Dein Kassenbonus kann helfen, passenden Zusatzschutz mitzufinanzieren.</p>
              <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-home-slate">Wie viel möglich ist, hängt von deiner Krankenkasse, deinen nachgewiesenen Aktivitäten und den anerkannten Kosten ab. Der Bonus ist eine mögliche Hilfe, keine Voraussetzung für deinen Zusatzschutz.</p>
            </div>
          </div>
          <div className="mt-8">
              <div className="rounded-2xl bg-home-ice p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold">Die 630 EUR aus dem Video</h3>
                <p className="mt-3 max-w-prose text-home-slate">Ein Beispiel für eine Person im Bonusjahr 2026: 630 EUR zweckgebundener Zuschuss oder alternativ 210 EUR Geldbonus. Kein garantierter Betrag und kein Höchstbonus.</p>
                <details className="mt-4">
                  <summary className={`cursor-pointer font-semibold ${focus}`}>Wie setzt sich das Beispiel zusammen?</summary>
                  <dl className="mt-4 max-w-2xl divide-y divide-home-slate/20">{film.map(([label, amount]) => (
                    <div key={label} className="flex justify-between gap-5 py-3"><dt>{label}</dt><dd className="shrink-0 font-semibold">{amount}</dd></div>
                  ))}</dl>
                </details>
                <p className="mt-4 max-w-prose text-sm text-home-slate">Die IKK classic prüft die Voraussetzungen und Nachweise. Der Zuschuss ist auf tatsächlich gezahlte, zuschussfähige Kosten begrenzt. Die Versicherungsleistungen werden davon getrennt nach Tarif geprüft.</p>
              </div>
              <PregnancyBonusExample />
          </div>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-home-slate"><strong>Hier ist noch nichts beantragt.</strong> Deinen Bonus beantragst du später direkt bei deiner Krankenkasse, zum Beispiel in der IKK-classic-App. Eine Auswahl auf Healio ersetzt keine Nachweise.</p>
          <p className="mt-3 text-sm text-home-slate">Du möchtest deine Kasse vergleichen? <Link to="/kassenboost" className={textLink}>KassenBoost kennenlernen</Link>. Das ist freiwillig.</p>
          <p className="mt-3 text-sm text-home-slate">Bonusregeln: <a href="https://www.ikk-classic.de/pk/rv/produkte/bonusprogramm" className={textLink}>IKK classic</a> und <a href="https://cdn.ikk-classic.de/exporter/19125-infoblatt-ikkbonus.pdf" className={textLink}>Infoblatt 2026</a>.</p>
        </section>

        <section className="bg-home-ice py-12 md:py-16">
          <div className={wrap}>
            <h2 className="font-friendly text-3xl md:text-4xl">Ein klarer Weg. Du entscheidest.</h2>
            <ol className="mt-7 grid gap-7 md:grid-cols-3 md:gap-12">
              {[
                ['Bei Healio verstehen', 'Leistungen und Beiträge ansehen. Fragen klären, wenn du Unterstützung möchtest.'],
                ['Zusatzschutz beantragen', 'Nur wenn er passt: den gewünschten Tarif in der Antragsstrecke beantragen. Der Versicherer prüft deinen Antrag.'],
                ['Bonus bei deiner Kasse nutzen', 'Bonusfähige Aktivitäten nachweisen und den Bonus dort separat beantragen. Healio reicht hier keinen Antrag für dich ein.'],
              ].map(([title, description], i) => (
                <li key={title}><span className="font-friendly text-3xl text-[#076046]" aria-hidden="true">{i + 1}.</span><h3 className="mt-2 font-display text-lg font-bold">{title}</h3><p className="mt-2 leading-relaxed text-home-slate">{description}</p></li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-home-slate">Ein Bonus ist auch ohne neuen Zusatzschutz möglich. Beide Entscheidungen bleiben getrennt.</p>
          </div>
        </section>

        <section id="fragen" className={`${wrap} scroll-mt-28 py-12 md:py-20`}>
          <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:gap-16">
            <div><h2 className="font-friendly text-3xl md:text-4xl">Noch eine Frage?</h2><p className="mt-3 text-home-slate">Du musst dich nicht durch alles allein klicken.</p><Link to="/kontakt" className={`mt-5 inline-block ${textLink}`}>Frage an Healio stellen</Link></div>
            <div className="divide-y divide-home-slate/20">{faq.map(([q, a]) => (
              <details key={q} className="py-5 first:pt-0"><summary className={`cursor-pointer font-semibold ${focus}`}>{q}</summary><p className="mt-3 max-w-prose leading-relaxed text-home-slate">{a}</p></details>
            ))}</div>
          </div>
          <div className="mt-8 border-t border-home-slate/20 pt-7">
            <Link data-product-link to={productPath} className={primary}>{config.productLabel}</Link>
            <p className="mt-3 text-sm text-home-slate">Direkt zur Tarifauswahl. Ohne erneuten Bonus-Check oder Pflichttermin.</p>
            <p className="mt-3 text-sm text-home-slate">Leistungsübersicht: <a href="https://www.sdk.de/downloads/Broschueren/Broschuere-Ambulante-Zusatzversicherung-1.781.pdf" className={textLink}>SDK Ambulant, Tarifübersicht (PDF)</a>.</p>
          </div>
        </section>
      </div>
    </>
  );
}
