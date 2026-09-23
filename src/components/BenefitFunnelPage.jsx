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
    path: '/schwangerschaft',
    // Kopfzeile nach Eisert: Ergebnis, Bedingung, Einwand gleich vorweg.
    title: 'Schwanger? Der Vorsorge-Topf greift jetzt noch.',
    lead: 'Feinultraschall, Labortests wie Toxoplasmose oder Streptokokken, die Nackenfaltenmessung: Diese Selbstzahlerleistungen laufen über den ambulanten Vorsorge-Topf, auch wenn deine Schwangerschaft schon festgestellt ist. Wartezeiten gibt es in diesen Tarifen keine.',
    leadSecondary: 'Den Beitrag kann dein Kassenbonus mittragen, weil bei der IKK classic jede Mutterschaftsvorsorge einzeln zählt. Wo es nicht mehr geht, sagen wir dir das weiter unten genauso deutlich.',
    seoTitle: 'Zusatzversicherung in der Schwangerschaft: was jetzt noch geht | Healio',
    seoDescription: 'Der ambulante Vorsorge-Topf greift auch bei bestehender Schwangerschaft. Stationär ist diese Geburt zu spät. Dazu der Kassenbonus, der den Beitrag mitträgt.',
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

// Drei getrennte Wege, damit Anzeigen direkt auf den passenden Abschnitt zeigen können.
const paths = [
  {
    id: 'ambulant', kicker: 'Ambulant, jetzt',
    title: 'Vorsorge, die du gerade brauchst',
    body: [
      'Der Vorsorge-Topf der SDK AP-Tarife greift auch dann, wenn deine Schwangerschaft bereits festgestellt ist. Wartezeiten gibt es in diesen Tarifen nicht. Je nach Stufe werden 50 bis 100 Prozent erstattet, bei AP1 bis zu 500 EUR je zwei Kalenderjahre.',
      'Bezahlt werden damit die Untersuchungen, die dir deine Praxis als Selbstzahlerleistung anbietet: Feinultraschall, zusätzliche Ultraschalls, Toxoplasmose, Streptokokken, Cytomegalie und die Nackenfaltenmessung.',
      'Nicht dabei sind die Entbindung, Beschwerden wegen der Schwangerschaft und gendiagnostische Tests wie NIPT. Komplikationen, Frühgeburten bis zum Ende der 36. Woche und Fehlgeburten sind ausdrücklich versichert. Deine Schwangerschaft gehört in die Gesundheitsfragen, der Versicherer prüft den Antrag.',
    ],
  },
  {
    id: 'stationaer', kicker: 'Stationär, für die Zeit danach',
    title: 'Diese Geburt ist zu spät',
    body: [
      'Ein Krankenhauszusatz, den du jetzt abschließt, deckt diese Entbindung nicht. Dafür sorgen die besondere Wartezeit von 8 Monaten und der Antragshinweis, dass laufende oder angeratene Behandlungen im Zusammenhang mit Schwangerschaft und Entbindung nicht mitversichert sind. Chefarzt und Familienzimmer bei dieser Geburt bekommst du damit nicht.',
      'Wofür der Tarif trotzdem zählt: für die Zeit danach. Er ist die Grundlage dafür, dass dein Kind nachversichert werden kann.',
      'Dazu kommt deine eigene Versorgung bei Klinikaufenthalten, die nichts mit dieser Schwangerschaft zu tun haben, und das Familienzimmer bei einer späteren Entbindung, nach Ablauf der Wartezeit.',
    ],
  },
  {
    id: 'kind', kicker: 'Dein Kind',
    title: 'Nachversicherung statt neuer Prüfung',
    body: [
      'Innerhalb von zwei Monaten nach der Geburt kann ein Neugeborenes in der Regel ohne erneute Gesundheitsprüfung in den Tarif aufgenommen werden, rückwirkend zum Tag der Geburt (§ 198 VVG). Voraussetzung ist ein bestehender Elternvertrag. Üblich ist, dass ein Elternteil bei der Geburt schon mindestens drei Monate versichert ist.',
      'Nach § 198 VVG darf der Schutz des Kindes nicht weiter reichen als der des versicherten Elternteils. Ein rein ambulanter Elternvertrag trägt also keinen stationären Schutz fürs Kind.',
      'Rooming-in als Begleitperson steckt im Tarif deines Kindes, bis 16 Jahre zu 100 Prozent und bei jedem Klinikaufenthalt. Was dein Versicherer im Einzelnen verlangt, steht in den Bedingungen. Wir prüfen das vor dem Abschluss, nicht danach.',
    ],
  },
];

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
    ['Ich bin in der 20. Woche. Lohnt sich ein ambulanter Tarif überhaupt noch?', 'Für die restlichen Vorsorgetermine ja, denn die AP-Tarife haben keine Wartezeit und der Vorsorge-Topf gilt je zwei Kalenderjahre. Ob sich der Beitrag für dich rechnet, hängt davon ab, wie viele Selbstzahlerleistungen bei dir noch anstehen. Deine bestehende Schwangerschaft gehört in die Gesundheitsfragen, der Versicherer prüft den Antrag.'],
    ['Was ist mit Komplikationen, wenn ich jetzt abschließe?', 'Ambulant sind Komplikationen, Frühgeburten bis zum Ende der 36. Schwangerschaftswoche und Fehlgeburten ausdrücklich als Ausnahme vom Behandlungsausschluss versichert. Die Behandlung wegen der Schwangerschaft selbst und die Entbindung sind es nicht.'],
    ['Zahlt der ambulante Tarif meine Hebamme?', 'Die reguläre Hebammenleistung rechnet deine Krankenkasse ab. Eine privat abrechnende Hebamme ist ein stationäres Thema und bei der Bayerischen in den Varianten Komfort und Prestige enthalten. Für diese Entbindung greift das wegen der besonderen Wartezeit nicht.'],
    ['Muss ich für den Bonus jede Vorsorge einzeln einreichen?', 'Ja. Jede Mutterschaftsvorsorge bekommt ein eigenes Antragsfeld, und ein schriftlicher Nachweis ist Pflicht. Der Mutterpass reicht dafür aus, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen. Alle Maßnahmen müssen in dasselbe Kalenderjahr fallen. Für das Bonusjahr 2026 muss dein vollständiger Antrag bis zum 31.03.2027 bei der IKK classic sein.'],
    ['Wie entstehen die bis zu 3.000 EUR Gesundheitsbudget?', 'Im SDK-Tarif Ambulant 100 (AP1) gibt es je zwei Kalenderjahre vier getrennte Leistungstöpfe: bis zu 1.000 EUR für Naturheilverfahren, 500 EUR für Sehhilfen, 500 EUR für Vorsorge, Impfungen und Präventionskurse sowie 1.000 EUR für Hilfsmittel nach GKV-Vorleistung und gesetzliche Zuzahlungen. Erstattet werden versicherte Kosten innerhalb dieser Grenzen, keine pauschale Barauszahlung. Maßgeblich sind Versicherungsbeginn und Tarifbedingungen. Das 630-EUR-Bonusbeispiel ist davon getrennt: Ein anerkannter Bonuszuschuss kann den Beitrag mitfinanzieren, erhöht aber nicht die Leistungstöpfe.'],
    ...commonFaq,
  ];
  return (
    <>
      <SEOHead title={config.seoTitle} description={config.seoDescription}
        canonicalUrl={`https://healio.de${config.path}`} robots="index, follow"
        schemaMarkup={createFAQSchema(faq.map(([question, answer]) => ({ question, answer })))} />
      <div className="bg-white text-home-midnight" data-funnel-topic="pregnancy">
        <section className="overflow-hidden bg-home-ice pb-12 pt-28 md:pb-20 md:pt-36">
          <div className={`${wrap} grid items-center gap-6 md:grid-cols-[1.2fr_1fr] md:gap-12`}>
            <div>
              <h1 className="max-w-[18ch] font-friendly text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-6xl">{config.title}</h1>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-home-slate">{config.lead}</p>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-home-slate">{config.leadSecondary}</p>
              <a href="#bonus-check" className={`mt-7 ${primary}`}>Bonus und Beitrag prüfen</a>
              <p className="mt-3 text-sm text-home-slate">Erst verstehen. Dann entscheiden. Ohne Terminpflicht.</p>
            </div>
            <img src={`/images/friendly-icons/${config.image}.webp`} alt="" width="420" height="420"
              className="mx-auto w-full max-w-[220px] object-contain md:max-w-[400px]" fetchPriority="high" />
          </div>
        </section>

        <section id="geheimtipp" className={`${wrap} scroll-mt-28 py-12 md:py-20`}>
          <h2 className="max-w-[24ch] font-friendly text-3xl md:text-4xl">Der Geheimtipp: jede Vorsorge zählt einzeln</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.25fr_1fr] md:gap-14">
            <div className="max-w-prose space-y-4 leading-relaxed text-home-slate">
              <p>Im Bonusprogramm der IKK classic steht die Mutterschaftsvorsorge unter Nummer 09. Anders als fast alle anderen Positionen ist sie mehrfach im selben Jahr nachweisbar. Jede gesetzliche Untersuchung zählt als eigene Position, je 10 EUR Geldbonus oder 30 EUR Zuschusswert. Als Nachweis genügt dein Mutterpass, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen.</p>
              <p>Nach der Geburt kommt die Rückbildungsgymnastik unter Nummer 44 dazu, mit 25 EUR Geldbonus oder 75 EUR Zuschusswert. Nur vier Positionen im ganzen Programm sind mehrfach anrechenbar, und Nummer 09 ist eine davon.</p>
              <p>Genau deshalb liegt das Satzungsmaximum von bis zu 1.155 EUR vor allem in der Schwangerschaft in Reichweite. Das ist ein rechnerischer Höchstwert aus der Satzung, in dem alles gleichzeitig zutrifft, und keine Summe, die die IKK classic irgendwo zusagt. In der breiten Masse landen aktive Versicherte bei 400 bis 700 EUR im Jahr.</p>
              <p>Der Zuschuss beträgt das Dreifache des Geldbonus, wird aber höchstens in Höhe deiner tatsächlichen Kosten ausgezahlt. Der Jahresbeitrag einer Krankenzusatzversicherung ist dafür anrechenbar. Aus rechnerisch 405 EUR Zuschuss werden bei 240 EUR Jahresbeitrag also 240 EUR, nie mehr.</p>
              <a href="#bonus-check" className={`mt-2 ${primary}`}>Bonus und Beitrag prüfen</a>
            </div>
            <div className="self-start rounded-2xl bg-home-ice p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold">Was du dafür brauchst</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-home-slate">
                <li>Einen schriftlichen Nachweis je Untersuchung, der Mutterpass reicht aus</li>
                <li>Ein eigenes Antragsfeld je Vorsorge, alle Maßnahmen im selben Kalenderjahr</li>
                <li>Für das Bonusjahr 2026 den vollständigen Antrag bis zum 31.03.2027</li>
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-home-slate">Wie viel bei dir zusammenkommt, hängt von deiner Krankenkasse ab und davon, was du tatsächlich nachweist. Die IKK classic prüft und erkennt an, nicht wir.</p>
            </div>
          </div>
        </section>

        <section id="drei-wege" className="scroll-mt-28 bg-home-ice py-12 md:py-20">
          <div className={wrap}>
            <h2 className="max-w-[26ch] font-friendly text-3xl md:text-4xl">Drei Wege, die du nicht verwechseln solltest</h2>
            <p className="mt-4 max-w-prose leading-relaxed text-home-slate">Ambulant, stationär und der Schutz deines Kindes folgen jeweils eigenen Regeln. Wer das zusammenwirft, verkauft dir etwas, das bei dieser Geburt nicht leistet.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
              {paths.map((item) => (
                <div key={item.id} id={item.id} className="scroll-mt-28 rounded-2xl bg-white p-6 sm:p-8">
                  <p className="font-semibold text-[#076046]">{item.kicker}</p>
                  <h3 className="mt-2 font-display text-xl font-bold">{item.title}</h3>
                  <div className="mt-3 space-y-3 leading-relaxed text-home-slate">
                    {item.body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 max-w-prose leading-relaxed text-home-slate">Die vollständige Abgrenzung mit Tarifstufen und Belegen liest du im Ratgeber <Link to="/ratgeber/schwanger-zusatzversicherung" className={textLink}>welcher Zusatzschutz jetzt noch geht</Link>. Wenn du gerade erst anfängst, hilft dir <Link to="/ratgeber/schwangerschaft-worauf-achten" className={textLink}>worauf du in der Schwangerschaft achten solltest</Link> mit Mutterpass, Hebammensuche und Fristen.</p>
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
            <p className="mt-3 text-sm text-home-slate">Zum Nachlesen: <Link to="/ratgeber/schwanger-zusatzversicherung" className={textLink}>welcher Zusatzschutz jetzt noch geht</Link> und <Link to="/ratgeber/schwangerschaft-worauf-achten" className={textLink}>worauf du in der Schwangerschaft achten solltest</Link>.</p>
          </div>
        </section>
      </div>
    </>
  );
}
