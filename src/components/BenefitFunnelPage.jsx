import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import PregnancyBonusExample from '@/components/PregnancyBonusExample';
import WhatsAppHelpHint, { useWhatsAppHelp, whatsAppHelpReply, WHATSAPP_HELP_TITLE } from '@/components/sections/shared/WhatsAppHelpHint';
import { BAYERISCHE_STATIONAER_URL } from '@/components/sections/hospital/hospitalLinks';
import { useReferrer } from '@/hooks/useReferrer';
import { getPregnancyOnwardPath } from '@/lib/pregnancyBonus';
import { buildSdkUrl } from '@/lib/sdk-url';
import { createFAQSchema } from '@/lib/createSchemaMarkup';

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-home-midnight';
const primary = `inline-flex min-h-[48px] items-center justify-center rounded-full bg-home-mint px-7 py-3 text-center font-semibold text-home-midnight hover:bg-home-mint-active ${focus}`;
const secondary = `inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-home-midnight px-7 py-3 text-center font-semibold text-home-midnight hover:bg-white ${focus}`;
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
    image: 'pregnancy',
    protectionTitle: 'Dein ambulanter Tarif für die Vorsorge jetzt',
    protectionText: 'Der Vorsorge-Topf zahlt Selbstzahlerleistungen wie Feinultraschall, Toxoplasmose oder die Nackenfaltenmessung, auch wenn deine Schwangerschaft schon festgestellt ist. Wartezeiten gibt es nicht. Im nächsten Schritt siehst du die vier Stufen mit Beitrag.',
    caution: 'Du bist schon schwanger? Das gibst du im Antrag bei den Gesundheitsfragen an, der Versicherer prüft den Antrag. Untersuchungen, die schon angeraten oder begonnen sind, sind nicht automatisch mitversichert.',
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
      'Nicht dabei sind die Entbindung, die Behandlung von Beschwerden und Komplikationen wegen der Schwangerschaft und gendiagnostische Tests wie NIPT. Nur auf Auslandsreisen zahlt der Tarif auch bei Komplikationen, Frühgeburten bis zum Ende der 36. Woche und Fehlgeburten. Deine Schwangerschaft gehört in die Gesundheitsfragen, der Versicherer prüft den Antrag.',
    ],
  },
  {
    id: 'stationaer', kicker: 'Stationär, für die Zeit danach',
    title: 'Diese Geburt ist zu spät',
    body: [
      'Ein Krankenhauszusatz, den du jetzt abschließt, deckt diese Entbindung nicht. Bei der SDK und bei der Bayerischen ist eine Entbindung nicht versichert, wenn die Schwangerschaft beim Antrag schon ärztlich festgestellt ist. Bei der Bayerischen gilt für die Entbindung zusätzlich eine Wartezeit von acht Monaten, bei der SDK gibt es keine Wartezeit. Chefarzt und Familienzimmer bei dieser Geburt bekommst du damit nicht.',
      'Für die Zeit danach zählt der Tarif trotzdem, für dich und für dein Kind.',
    ],
  },
  {
    // #kind gehört der Anzeigengruppe S3 und liegt deshalb auf dem Klinikschutz oben.
    id: 'nachversicherung', kicker: 'Dein Kind',
    title: 'Nachversicherung statt neuer Prüfung',
    body: [
      'Die Anmeldung wirkt rückwirkend zum Tag der Geburt, ohne Wartezeit und ohne Zuschlag.',
      'Nach § 198 VVG darf der Schutz des Kindes nicht weiter reichen als der des versicherten Elternteils. Ein rein ambulanter Elternvertrag trägt also keinen stationären Schutz fürs Kind.',
    ],
  },
];

// Nur belegte Punkte aus den AVB-Prüfungen der Bayerischen und der SDK (Healio/Vertraege, 09/2026).
const hospitalArguments = [
  'Dein Kind wird nach der Geburt ohne Gesundheitsprüfung aufgenommen, auch bei Geburtsschäden und angeborenen Krankheiten. Du meldest es innerhalb von zwei Monaten an.',
  'Muss dein Kind ins Krankenhaus, zahlt sein Tarif Unterkunft und Verpflegung für dich als Begleitperson, solange es jünger als 16 ist und soweit die Krankenkasse sie nicht trägt.',
  'Dein Kind bekommt im Krankenhaus Chefarzt und Ein- oder Zweibettzimmer, je nach Tarif.',
  'Du selbst bist bei jedem medizinisch notwendigen Klinikaufenthalt versichert, der nichts mit dieser Schwangerschaft zu tun hat: bei der SDK ab Versicherungsbeginn, bei der Bayerischen nach drei Monaten Wartezeit, nach einem Unfall sofort.',
  'Bei einer späteren Geburt: Familienzimmer bei der SDK im SP1, bei der Bayerischen nach acht Monaten Wartezeit im Prestige und im Komfort bis zur Höhe des Zweibettzimmers.',
  'Für dein Kind ab 3,20 EUR im Monat (Bayerische Komfort) oder 3,37 EUR (SDK SP2). Den Beitrag kann dein Kassenbonus mittragen.',
];

const commonFaq = [
  ['Habe ich hier schon etwas beantragt?', 'Nein. Diese Seite hilft dir bei der Orientierung. Einen Versicherungsantrag stellst du erst in der ausdrücklich gekennzeichneten Antragsstrecke. Deinen Kassenbonus beantragst du getrennt bei deiner Krankenkasse.'],
  ['Kann der Bonus meinen Beitrag bezahlen?', 'Er kann den Beitrag teilweise oder vollständig ausgleichen, wenn anerkannte Maßnahmen und zuschussfähige Kosten ausreichen. Der Versicherungsbeitrag bleibt fällig. Die Krankenkasse prüft deine Nachweise und zahlt den anerkannten Bonus später aus. Geldbonus und zweckgebundener Zuschuss sind Alternativen, nicht zwei zusätzliche Zahlungen.'],
  ['Muss ich die Krankenkasse wechseln?', 'Nein. Passenden Zusatzschutz kannst du unabhängig von einem Kassenwechsel prüfen. Welche Bonusmöglichkeiten du hast, hängt von deiner Krankenkasse und ihren Teilnahmebedingungen ab.'],
];
const film = [['10 gesetzliche Schwangerschaftsvorsorgen', '300 EUR'], ['Ein anerkannter Kurs und aktive Studio-Mitgliedschaft', '150 EUR'], ['Anerkannter BMI und Blutdruck, mit erforderlicher Aktivität', '150 EUR'], ['Zahnvorsorge in beiden Halbjahren', '30 EUR']];

// Beide Klinik-Rechner, bewusst ohne data-product-link und ohne Tracking.
function HospitalCalculatorLinks({ sdkUrl, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <a href={sdkUrl} target="_blank" rel="noopener noreferrer" aria-label="Klinik-Tarif der SDK berechnen (neuer Tab)" className={primary}>Klinik-Tarif der SDK berechnen</a>
      <a href={BAYERISCHE_STATIONAER_URL} target="_blank" rel="noopener noreferrer" aria-label="Klinik-Tarif der Bayerischen berechnen (neuer Tab)" className={primary}>Klinik-Tarif der Bayerischen berechnen</a>
    </div>
  );
}

export default function BenefitFunnelPage() {
  const config = TOPICS.pregnancy;
  const location = useLocation();
  // No answers, health information or arbitrary query strings cross into a product page.
  const productPath = getPregnancyOnwardPath(location.search);
  const helpVisible = useWhatsAppHelp();
  const referrer = useReferrer();
  // Dieselbe SDK-Klinikstrecke wie auf /stationaer, Ref-Code wie dort.
  const sdkHospitalUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Stationär' });
  const faq = [
    ['Sind Vorsorgetests und Osteopathie automatisch versichert?', 'Nein. Prüfe zuerst die gesetzliche Leistung. Ob Zusatzschutz verbleibende Kosten übernimmt, hängt unter anderem von Tarif, Leistung, Behandler und Versicherungsbeginn ab. Ein neuer Termin allein bedeutet keinen neuen Versicherungsfall.'],
    ['Ich bin in der 20. Woche. Lohnt sich ein ambulanter Tarif überhaupt noch?', 'Für die restlichen Vorsorgetermine ja, denn die AP-Tarife haben keine Wartezeit und der Vorsorge-Topf gilt je zwei Kalenderjahre. Ob sich der Beitrag für dich rechnet, hängt davon ab, wie viele Selbstzahlerleistungen bei dir noch anstehen. Deine bestehende Schwangerschaft gehört in die Gesundheitsfragen, der Versicherer prüft den Antrag.'],
    ['Was ist mit Komplikationen, wenn ich jetzt abschließe?', 'In Deutschland zahlt der ambulante Tarif weder die Entbindung noch die Behandlung von Beschwerden oder Komplikationen wegen der Schwangerschaft. Auf Auslandsreisen sind Komplikationen in der Schwangerschaft, Frühgeburten bis zum Ende der 36. Schwangerschaftswoche und Fehlgeburten dagegen versichert.'],
    ['Zahlt der ambulante Tarif meine Hebamme?', 'Die reguläre Hebammenhilfe rechnet deine Krankenkasse ab. Bei der Bayerischen ergänzt der Krankenhauszusatz in Komfort und Prestige diese Leistung, bei Vorsorge, Geburtshilfe, Nachsorge mit Wochenbettbesuchen und Rückbildung. Rechnet deine Hebamme privat ab und liegt ihre Rechnung über dem Kassensatz, trägt der Tarif den Teil darüber. Bei der SDK übernehmen die Klinik-Tarife SP1 und SP2 die gesondert berechneten Leistungen einer Beleghebamme während des Klinikaufenthalts, Hausbesuche und Wochenbett gehören dort nicht dazu. Für eine Schwangerschaft, die beim Abschluss schon besteht, gilt beides nicht.'],
    ['Muss ich für den Bonus jede Vorsorge einzeln einreichen?', 'Ja. Jede Mutterschaftsvorsorge bekommt ein eigenes Antragsfeld, und ein schriftlicher Nachweis ist Pflicht. Der Mutterpass reicht dafür aus, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen. Alle Maßnahmen müssen in dasselbe Kalenderjahr fallen. Für das Bonusjahr 2026 muss dein vollständiger Antrag bis zum 31.03.2027 bei der IKK classic sein.'],
    ['Wie entstehen die bis zu 3.000 EUR Gesundheitsbudget?', 'Im SDK-Tarif Ambulant 100 (AP1) gibt es je zwei Kalenderjahre vier getrennte Leistungstöpfe: bis zu 1.000 EUR für Naturheilverfahren, 500 EUR für Sehhilfen, 500 EUR für Vorsorge, Impfungen und Präventionskurse sowie 1.000 EUR für Hilfsmittel nach GKV-Vorleistung und gesetzliche Zuzahlungen. Erstattet werden versicherte Kosten innerhalb dieser Grenzen, keine pauschale Barauszahlung. Maßgeblich sind Versicherungsbeginn und Tarifbedingungen. Das 630-EUR-Bonusbeispiel ist davon getrennt: Ein anerkannter Bonuszuschuss kann den Beitrag mitfinanzieren, erhöht aber nicht die Leistungstöpfe.'],
    ['Wie läuft der Antrag ab?', 'Du wählst auf der nächsten Seite deine Stufe und öffnest den Rechner der SDK in einem neuen Tab. Dort gibst du Versicherungsbeginn, Geburtsdatum und Geschlecht ein und siehst deinen Beitrag. Danach folgen deine Antragsdaten mit den Gesundheitsfragen und eine Zusammenfassung, bevor du den Antrag abschickst. Einen Termin brauchst du nicht.'],
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
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#zusatzschutz" className={primary}>Zusatzschutz und Beitrag ansehen</a>
                <a href="#klinikschutz" className={secondary}>Klinikschutz für dein Kind</a>
              </div>
              <p className="mt-3 text-sm text-home-slate">Erst verstehen, dann selbst online abschließen. Ohne Termin.</p>
            </div>
            <img src={`/images/friendly-icons/${config.image}.webp`} alt="" width="420" height="420"
              className="mx-auto w-full max-w-[220px] object-contain md:max-w-[400px]" fetchPriority="high" />
          </div>
        </section>

        {/* Klinikschutz direkt nach dem Hero: Anzeigen für Schwangere werben stationär.
            #kind (Anzeigengruppe S3) zeigt auf Mobil Kind-Argument und beide Rechner im ersten Bildschirm. */}
        <section id="klinikschutz" aria-labelledby="klinikschutz-heading" className="scroll-mt-28 py-12 md:py-20">
          <div className={`${wrap} grid gap-8 md:grid-cols-[1fr_1.15fr] md:gap-14`}>
            <div id="kind" className="scroll-mt-28 md:sticky md:top-28 md:self-start">
              <p className="font-semibold text-[#076046]">Stationär, für dein Kind und dich</p>
              <h2 id="klinikschutz-heading" className="mt-2 max-w-[20ch] font-friendly text-3xl md:text-4xl">Klinikschutz für dich und dein Kind</h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-home-slate">Dein eigener Klinik-Tarif ist die Grundlage, damit dein Kind nach der Geburt ohne Gesundheitsprüfung aufgenommen wird.</p>
              <HospitalCalculatorLinks sdkUrl={sdkHospitalUrl} className="mt-6 md:flex-col lg:flex-row" />
              <p className="mt-3 text-sm leading-relaxed text-home-slate">Beide Rechner öffnen sich in einem neuen Tab. Welcher Versicherer zu dir passt, zeigt dir die <a href="#klinik-wahl" className={textLink}>Entscheidungshilfe</a>.</p>
            </div>
            <div className="rounded-2xl bg-home-ice p-6 sm:p-8">
              <p className="font-semibold">Die Geburt, die jetzt ansteht, zahlt kein Klinik-Tarif mehr.</p>
              <p className="mt-1 leading-relaxed text-home-slate">Was er dir und deinem Kind trotzdem bringt:</p>
              <ul className="mt-5 space-y-4 leading-relaxed text-home-slate">
                {hospitalArguments.map((argument) => (
                  <li key={argument.slice(0, 40)} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#076046]" strokeWidth={2.5} />
                    <span>{argument}</span>
                  </li>
                ))}
              </ul>
              <div id="klinik-wahl" className="mt-8 scroll-mt-28 border-t border-home-slate/20 pt-7">
                <h3 className="font-display text-xl font-bold">Welcher Versicherer passt zu dir?</h3>
                <div className="mt-5 space-y-5">
                  <div className="border-l-4 border-home-mint pl-5">
                    <p className="font-semibold">Bis zur Geburt sind es weniger als drei Monate?</p>
                    <p className="mt-2 leading-relaxed text-home-slate">Dann passt die SDK: Dort genügt es, dass du am Tag der Geburt versichert bist.</p>
                  </div>
                  <div className="border-l-4 border-home-mint pl-5">
                    <p className="font-semibold">Bis zur Geburt sind es mehr als drei Monate?</p>
                    <p className="mt-2 leading-relaxed text-home-slate">Dann hast du die Wahl: Die Bayerische verlangt drei Monate Vorversicherung und ist für dein Kind günstiger, im Prestige 4,10 EUR und im Komfort 3,20 EUR im Monat. Die SDK hat keine Wartezeiten, dort kostet dein Kind im SP1 5,60 EUR und im SP2 3,37 EUR im Monat.</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-home-slate">Dein Kind meldest du beim selben Versicherer an, bei dem du versichert bist.</p>
                {/* Auf Mobil liegen die Rechner oben weit weg, deshalb hier noch einmal. */}
                <HospitalCalculatorLinks sdkUrl={sdkHospitalUrl} className="mt-6 md:hidden" />
              </div>
            </div>
          </div>
        </section>

        <section id="geheimtipp" className={`${wrap} scroll-mt-28 border-t border-home-slate/15 py-12 md:py-20`}>
          <h2 className="max-w-[24ch] font-friendly text-3xl md:text-4xl">Der Geheimtipp: jede Vorsorge zählt einzeln</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.25fr_1fr] md:gap-14">
            <div className="max-w-prose space-y-4 leading-relaxed text-home-slate">
              <p>Im Bonusprogramm der IKK classic steht die Mutterschaftsvorsorge unter Nummer 09. Anders als fast alle anderen Positionen ist sie mehrfach im selben Jahr nachweisbar. Jede gesetzliche Untersuchung zählt als eigene Position, je 10 EUR Geldbonus oder 30 EUR Zuschusswert. Als Nachweis genügt dein Mutterpass, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen.</p>
              <p>Nach der Geburt kommt die Rückbildungsgymnastik unter Nummer 44 dazu, mit 25 EUR Geldbonus oder 75 EUR Zuschusswert. Nur vier Positionen im ganzen Programm sind mehrfach anrechenbar, und Nummer 09 ist eine davon.</p>
              <p>Genau deshalb liegt das Satzungsmaximum von bis zu 1.155 EUR vor allem in der Schwangerschaft in Reichweite. Das ist ein rechnerischer Höchstwert aus der Satzung, in dem alles gleichzeitig zutrifft, und keine Summe, die die IKK classic irgendwo zusagt. In der breiten Masse landen aktive Versicherte bei 400 bis 700 EUR im Jahr.</p>
              <p>Der Zuschuss beträgt das Dreifache des Geldbonus, wird aber höchstens in Höhe deiner tatsächlichen Kosten ausgezahlt. Der Jahresbeitrag einer Krankenzusatzversicherung ist dafür anrechenbar. Aus rechnerisch 405 EUR Zuschuss werden bei 240 EUR Jahresbeitrag also 240 EUR, nie mehr.</p>
              <a href="#bonus-check" className={`mt-2 ${primary}`}>Dein Bonus-Beispiel ansehen</a>
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
                  {item.id === 'ambulant' && <a href="#zusatzschutz" className={`mt-6 ${primary}`}>Ambulanten Tarif ansehen</a>}
                  {item.id === 'stationaer' && <a href="#klinikschutz" className={`mt-6 ${secondary}`}>Zum Klinikschutz</a>}
                </div>
              ))}
            </div>
            <WhatsAppHelpHint
              placement="schwangerschaft-wege"
              title="Welcher Weg passt zu dir?"
              text={`Zögere nicht und frag uns. ${whatsAppHelpReply('Vorsorge, Klinikschutz und der Nachversicherung deines Kindes')}`}
              className="mt-6"
            />
            <p className="mt-7 max-w-prose leading-relaxed text-home-slate">Die vollständige Abgrenzung mit Tarifstufen und Belegen liest du im Ratgeber <Link to="/ratgeber/schwanger-zusatzversicherung" className={textLink}>welcher Zusatzschutz jetzt noch geht</Link>. Wenn du gerade erst anfängst, hilft dir <Link to="/ratgeber/schwangerschaft-worauf-achten" className={textLink}>worauf du in der Schwangerschaft achten solltest</Link> mit Mutterpass, Hebammensuche und Fristen.</p>
          </div>
        </section>

        <section id="zusatzschutz" className="scroll-mt-28 bg-home-ice py-12 md:py-16">
          <div className={`${wrap} grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16`}>
            <div>
              <h2 className="max-w-[22ch] font-friendly text-3xl md:text-4xl">{config.protectionTitle}</h2>
              <p className="mt-4 max-w-prose leading-relaxed text-home-slate">{config.protectionText}</p>
              <Link data-product-link to={productPath} className={`mt-6 ${primary}`}>{config.productLabel}</Link>
              <p className="mt-3 text-sm text-home-slate">Du siehst zuerst die vier Stufen mit Beitrag. Den Antrag startest du danach selbst online.</p>
              <WhatsAppHelpHint placement="schwangerschaft-tarif" variant="line" text="Unsicher, welche Stufe zu dir passt? Zögere nicht und frag uns." className="mt-5" />
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
                <h3 className="font-display text-xl font-bold">Das Rechenbeispiel mit 630 EUR</h3>
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
                ['Bei Healio verstehen', helpVisible ? 'Leistungen und Beiträge ansehen. Deine Fragen stellst du uns jederzeit per WhatsApp.' : 'Leistungen und Beiträge in Ruhe ansehen.'],
                ['Zusatzschutz beantragen', 'Passt der Schutz, beantragst du ihn selbst online beim Versicherer. Bei der SDK gibst du dafür Versicherungsbeginn, Geburtsdatum und Geschlecht ein, siehst deinen Beitrag und beantwortest danach die Gesundheitsfragen. Der Versicherer prüft deinen Antrag.'],
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
            {helpVisible ? (
              <div>
                <h2 className="font-friendly text-3xl md:text-4xl">{WHATSAPP_HELP_TITLE}</h2>
                <WhatsAppHelpHint placement="schwangerschaft-fragen" surface="bg-home-ice" className="mt-5" />
                <p className="mt-5 text-sm text-home-slate">Lieber per E-Mail? <Link to="/kontakt" className={textLink}>Zur Kontaktseite</Link></p>
              </div>
            ) : (
              <div><h2 className="font-friendly text-3xl md:text-4xl">Noch eine Frage?</h2><p className="mt-3 text-home-slate">Du musst dich nicht durch alles allein klicken.</p><Link to="/kontakt" className={`mt-5 inline-block ${textLink}`}>Frage an Healio stellen</Link></div>
            )}
            <div className="divide-y divide-home-slate/20">{faq.map(([q, a]) => (
              <details key={q} className="py-5 first:pt-0"><summary className={`cursor-pointer font-semibold ${focus}`}>{q}</summary><p className="mt-3 max-w-prose leading-relaxed text-home-slate">{a}</p></details>
            ))}</div>
          </div>
          <div className="mt-8 border-t border-home-slate/20 pt-7">
            <Link data-product-link to={productPath} className={primary}>{config.productLabel}</Link>
            <p className="mt-3 text-sm text-home-slate">Direkt zur Tarifauswahl. Ohne erneuten Bonus-Check oder Pflichttermin.</p>
            <WhatsAppHelpHint placement="schwangerschaft-abschluss" variant="line" text="Auf der nächsten Seite wählst du deine Stufe. Kommst du nicht weiter, frag uns per WhatsApp." className="mt-4" />
            <p className="mt-3 text-sm text-home-slate">Leistungsübersicht: <a href="https://www.sdk.de/downloads/Broschueren/Broschuere-Ambulante-Zusatzversicherung-1.781.pdf" className={textLink}>SDK Ambulant, Tarifübersicht (PDF)</a>.</p>
            <p className="mt-3 text-sm text-home-slate">Zum Nachlesen: <Link to="/ratgeber/schwanger-zusatzversicherung" className={textLink}>welcher Zusatzschutz jetzt noch geht</Link> und <Link to="/ratgeber/schwangerschaft-worauf-achten" className={textLink}>worauf du in der Schwangerschaft achten solltest</Link>.</p>
          </div>
        </section>
      </div>
    </>
  );
}
