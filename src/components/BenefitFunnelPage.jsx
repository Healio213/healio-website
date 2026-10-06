import { Link, useLocation } from 'react-router-dom';
import { Check, Heart, Info } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import PregnancyBonusExample from '@/components/PregnancyBonusExample';
import IkkKassenSiegel from '@/components/sections/shared/IkkKassenSiegel';
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
// Tippfläche mobil mindestens 44 px hoch, ohne den Abstand der Seite zu ändern (Polster innen, gleicher Abzug außen).
const summaryTap = '-my-2.5 py-2.5 md:my-0 md:py-0';

const TOPICS = {
  pregnancy: {
    path: '/schwangerschaft',
    // Kopfzeile nach Eisert: Ergebnis, Bedingung, Einwand gleich vorweg.
    title: 'Schwanger? Laut Satzung sind <highlight>bis zu 1.155\u00a0EUR</highlight> für dich drin.',
    lead: 'So viel Zuschuss kann dir die IKK classic in der Schwangerschaft zahlen. Nutz das Geld und hol dir den Schutz, der jetzt zu dir passt: ambulant für deine Vorsorge, stationär für dich und dein Kind.',
    leadSecondary: 'Der Höchstwert gilt, wenn du alle Vorsorgen und Aktivitäten nachweist. In der breiten Masse sind es 400 bis 700 EUR im Jahr. Wo Schutz jetzt nicht mehr greift, sagen wir dir genauso deutlich.',
    seoTitle: 'Zusatzversicherung in der Schwangerschaft: was jetzt noch geht | Healio',
    seoDescription: 'Der ambulante Vorsorge-Topf greift auch bei bestehender Schwangerschaft. Stationär ist diese Geburt zu spät. Dazu der Kassenbonus, der den Beitrag mitträgt.',
    protectionTitle: 'Vorsorge ohne Wartezeit',
    protectionText: 'Der Vorsorge-Topf zahlt Selbstzahlerleistungen wie Feinultraschall, Toxoplasmose oder die Nackenfaltenmessung, auch wenn deine Schwangerschaft schon festgestellt ist. Wartezeiten gibt es nicht. Im nächsten Schritt siehst du die vier Stufen mit Beitrag.',
    caution: 'Du bist schon schwanger? Beantworte die Gesundheitsfragen im Antrag vollständig, der Versicherer prüft den Antrag. Untersuchungen, die schon angeraten oder begonnen sind, sind nicht automatisch mitversichert.',
    product: '/ambulant', productLabel: 'Ambulante Tarife und Beitrag ansehen',
  },

};

// Drei Angebote im Hero (Frank 30.09.2026: Aufbau wie /stationaer, dazu eine
// Wohlfühl-Atmosphäre). Aussagen aus Titel, Bonus-Abschnitt, paths[0] und
// hospitalArguments[0]; jede Karte springt zu ihrem Abschnitt.
const heroOffers = [
  { href: '#bonus-check', code: 'Kassenbonus', label: 'Bis zu 1.155\u00a0EUR laut Satzung', note: 'IKK classic, jede Vorsorge zählt einzeln', tone: 'rose' },
  { href: '#zusatzschutz', code: 'Ambulant, jetzt', label: 'Vorsorge ohne Wartezeit', note: 'Auch wenn deine Schwangerschaft schon festgestellt ist', tone: 'mint' },
  { href: '#klinikschutz', code: 'Dein Kind', label: 'Ohne Gesundheitsprüfung versichert', note: 'Wenn ein Elternteil rechtzeitig im Klinik-Tarif versichert ist', tone: 'butter' },
];
const offerTone = {
  rose: { border: 'border-[#f2c9d4]', dot: 'bg-[#e27d9b]' },
  mint: { border: 'border-[#b9e6d6]', dot: 'bg-[#25c990]' },
  butter: { border: 'border-[#ead8a7]', dot: 'bg-[#e6b946]' },
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
      'Ein Krankenhauszusatz, den du jetzt abschließt, deckt diese Entbindung nicht. Bei der SDK ist eine Entbindung nicht versichert, wenn die Schwangerschaft beim Antrag schon ärztlich festgestellt ist. Bei der Bayerischen ist eine Entbindung erst versichert, wenn seit Versicherungsbeginn acht Monate vergangen sind. Chefarzt und Familienzimmer bei dieser Geburt bekommst du damit nicht.',
      'Für die Zeit danach zählt der Tarif trotzdem, für dich und für dein Kind.',
    ],
  },
  {
    // #kind gehört der Anzeigengruppe S3 und liegt deshalb auf dem Klinikschutz oben.
    id: 'nachversicherung', kicker: 'Dein Kind',
    title: 'Nachversicherung statt neuer Prüfung',
    body: [
      'Ist ein Elternteil am Tag der Geburt im Klinik-Tarif versichert (bei der Bayerischen seit mindestens drei Monaten) und geht die Anmeldung spätestens zwei Monate nach der Geburt beim Versicherer ein, wirkt sie rückwirkend zum Tag der Geburt, ohne Wartezeit und ohne Zuschlag.',
      'Nach § 198 VVG darf der Schutz des Kindes nicht weiter reichen als der des versicherten Elternteils. Ein rein ambulanter Elternvertrag trägt also keinen stationären Schutz fürs Kind.',
    ],
  },
];

// Nur belegte Punkte aus den AVB-Prüfungen der Bayerischen und der SDK (Healio/Vertraege, 09/2026).
// Bayerische ab 05.10.2026: keine allgemeine Wartezeit, acht Monate für Entbindung und
// Psychotherapie, bei Unfall keine (AVB B 275000 § 3, Annahmerichtlinien B 275012, Auskunft der Bayerischen vom 05.10.2026). Familienzimmer nur über den Vertrag der Mutter (Auskunft der Bayerischen).
const hospitalArguments = [
  'Ist ein Elternteil am Tag der Geburt im Klinik-Tarif versichert (bei der Bayerischen seit mindestens drei Monaten), wird dein Kind ohne Gesundheitsprüfung aufgenommen, auch bei Geburtsschäden und angeborenen Krankheiten. Die Anmeldung muss spätestens zwei Monate nach der Geburt beim Versicherer eingehen.',
  'Muss dein Kind ins Krankenhaus, zahlt sein Klinik-Tarif Unterkunft und Verpflegung für dich als Begleitperson, wenn es zu Beginn der Behandlung jünger als 16 ist und soweit die Krankenkasse sie nicht trägt.',
  'Dein Kind bekommt im Krankenhaus Chefarzt und Ein- oder Zweibettzimmer, je nach Tarif.',
  'Du selbst bist bei neu auftretenden, medizinisch notwendigen Klinikaufenthalten versichert, die nichts mit dieser Schwangerschaft zu tun haben: bei der SDK und bei der Bayerischen im Komfort und im Prestige ab Versicherungsbeginn, bei der Bayerischen stationäre Psychotherapie erst nach acht Monaten. Nach einem Unfall gilt keine Wartezeit.',
  'Bei einer späteren Geburt: Familienzimmer bei der SDK im SP1, bei der Bayerischen über den Vertrag der Mutter nach acht Monaten Wartezeit, im Prestige ohne Begrenzung, im Komfort bis zur Höhe des Zweibettzimmers.',
  'Für dein Kind bis 15 Jahre ab 3,20 EUR im Monat (Bayerische Komfort) oder 3,37 EUR (SDK SP2). Den Beitrag kann dein Kassenbonus mittragen.',
];

const commonFaq = [
  ['Habe ich hier schon etwas beantragt?', 'Nein. Diese Seite hilft dir bei der Orientierung. Einen Versicherungsantrag stellst du erst in der ausdrücklich gekennzeichneten Antragsstrecke. Deinen Kassenbonus beantragst du getrennt bei deiner Krankenkasse.'],
  ['Kann der Bonus meinen Beitrag bezahlen?', 'Er kann den Beitrag teilweise oder vollständig ausgleichen, wenn anerkannte Maßnahmen und zuschussfähige Kosten ausreichen. Der Versicherungsbeitrag bleibt fällig. Die Krankenkasse prüft deine Nachweise und zahlt den anerkannten Bonus später aus. Geldbonus und zweckgebundener Zuschuss sind Alternativen, nicht zwei zusätzliche Zahlungen.'],
  ['Muss ich die Krankenkasse wechseln?', 'Nein. Passenden Zusatzschutz kannst du unabhängig von einem Kassenwechsel prüfen. Welche Bonusmöglichkeiten du hast, hängt von deiner Krankenkasse und ihren Teilnahmebedingungen ab.'],
];
const film = [['10 gesetzliche Schwangerschaftsvorsorgen', '300 EUR'], ['Ein anerkannter Kurs und aktive Studio-Mitgliedschaft', '150 EUR'], ['Anerkannter BMI und Blutdruck, mit erforderlicher Aktivität', '150 EUR'], ['Zahnvorsorge in beiden Halbjahren', '30 EUR']];

// Kurzfassung für die Karten; die vollständigen Texte stehen im Aufklapper.
// Einschränkungen (limit: true) stehen mit Hinweis-Symbol, nie mit Haken.
const ambulantPoints = [
  { text: 'Feinultraschall, Toxoplasmose, Streptokokken, Nackenfaltenmessung: Diese Selbstzahlerleistungen zahlt der Vorsorge-Topf, auch wenn du schon schwanger bist.' },
  { text: 'Keine Wartezeit, je nach Stufe 50 bis 100 Prozent Erstattung.' },
  { text: 'Nicht dabei sind Entbindung und Komplikationen. Beantworte die Gesundheitsfragen im Antrag vollständig.', limit: true },
];
const hospitalPoints = [
  { text: 'Diese Geburt zahlt kein Klinik-Tarif mehr. Für die Zeit danach zählt er trotzdem, für dich und dein Kind.', limit: true },
  { text: 'Ist ein Elternteil am Tag der Geburt im Klinik-Tarif versichert (bei der Bayerischen seit mindestens drei Monaten) und meldest du dein Kind rechtzeitig an, wird es ohne Gesundheitsprüfung aufgenommen, auch bei angeborenen Krankheiten.' },
  { text: 'Für dein Kind bis 15 Jahre ab 3,20 EUR im Monat. Den Beitrag kann dein Kassenbonus mittragen.' },
];

function PointList({ points }) {
  return (
    <ul className="mt-5 space-y-3 leading-relaxed text-home-slate">
      {points.map(({ text, limit }) => (
        <li key={text.slice(0, 40)} className="flex gap-3">
          {limit
            ? <Info aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-home-slate" strokeWidth={2.25} />
            : <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#076046]" strokeWidth={2.5} />}
          <span className={limit ? 'text-home-midnight' : undefined}>{text}</span>
        </li>
      ))}
    </ul>
  );
}
const steps = [
  ['Vorsorge nachweisen', 'Jede Mutterschaftsvorsorge zählt bei der IKK classic einzeln. Der Mutterpass reicht als Nachweis.'],
  ['Schutz wählen', 'Ambulant für die Vorsorge jetzt, stationär für dich und dein Kind nach der Geburt.'],
  ['Bonus einsetzen', 'Der Zuschuss bezahlt deinen Beitrag ganz oder zum Teil. Den Antrag stellst du selbst bei deiner Kasse.'],
];

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
    ['Wer zahlt meine Hebamme?', 'Die Hebammenhilfe in der Schwangerschaft, bei der Geburt und im Wochenbett zahlt deine Krankenkasse, auch den Rückbildungskurs. Bei der SDK übernehmen die Klinik-Tarife SP1 und SP2 zusätzlich die gesondert berechenbaren Leistungen einer Beleghebamme bei der Geburt im Krankenhaus, ohne Wartezeit. Die Betreuung zu Hause, Hausgeburt und Geburtshaus gehören dort nicht dazu. Ist die Schwangerschaft beim Antrag schon ärztlich festgestellt, gilt das bei der SDK nicht. Bei der Bayerischen erstatten die Klinik-Tarife Komfort und Prestige laut Produktunterlagen Hebammenkosten, die über die Leistungen der Krankenkasse hinausgehen, auch für privat abrechnende Hebammen. Dort gibt es keine allgemeine Wartezeit, für die Entbindung gilt eine Wartezeit von acht Monaten, und eine beim Antrag schon bestehende Schwangerschaft ist nicht mitversichert.'],
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
      {/* Kurzfassung (Frank 29.09.2026): Erst die Zahl, dann drei Schritte,
          dann zwei Wege. Alle Einschränkungen bleiben vollständig, stehen aber
          in Aufklappern statt als Textwand. Sprungmarken der Anzeigen bleiben. */}
      <div className="bg-white text-home-midnight" data-funnel-topic="pregnancy">
        {/* Hero mit Wohlfühl-Atmosphäre (Frank 30.09.2026: Aufbau wie /stationaer,
            "süß", die Schwangeren sollen sich wohlfühlen): warme Creme- und
            Rosétöne, weiche Lichtflecken, die Schwangeren-Figur groß in der
            Karte und daneben die drei Angebote. */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff8f3] via-[#fdf0f2] to-[#f1f8f4] pb-10 pt-24 md:pb-20 md:pt-32">
          <div className="absolute -left-24 top-20 -z-10 h-80 w-80 rounded-full bg-[#f7c9d4]/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -right-16 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#bfe9d8]/40 blur-3xl" aria-hidden="true" />
          <div className="absolute left-1/2 top-8 -z-10 h-64 w-64 rounded-full bg-[#ffe3c2]/45 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_center,#f3c6d0_1px,transparent_1px)] [background-size:26px_26px]" aria-hidden="true" />
          <div className={`${wrap} grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12`}>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#b0476a] md:text-xs shadow-[0_6px_18px_rgba(176,71,106,0.10)]">
                <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Für dich und dein Baby
              </p>
              <h1 className="mt-4 max-w-[16ch] font-friendly text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.035em] [text-wrap:balance] sm:mt-5 sm:text-5xl lg:text-[3.4rem]">
                <HighlightText text={config.title} className="text-[#087654]" />
              </h1>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-home-slate sm:mt-5 sm:text-xl">{config.lead}</p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <a href="#zusatzschutz" className={primary}>Zusatzschutz und Beitrag ansehen</a>
                <a href="#klinikschutz" className={`${secondary} bg-white/60`}>Klinikschutz für dein Kind</a>
              </div>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-home-slate">{config.leadSecondary}</p>
            </div>

            <div className="relative mx-auto min-w-0 w-full max-w-[35rem]" aria-label="Was jetzt für dich drin ist">
              <Heart className="absolute -left-3 top-6 z-30 h-7 w-7 -rotate-12 fill-[#f5b8c6] text-[#f5b8c6]" aria-hidden="true" />
              <Heart className="absolute -right-2 -top-3 z-30 h-5 w-5 rotate-12 fill-[#f7cdd6] text-[#f7cdd6]" aria-hidden="true" />
              <Heart className="absolute -bottom-3 right-16 z-30 h-4 w-4 rotate-6 fill-[#bfe9d8] text-[#bfe9d8]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-[#f3d6de] bg-gradient-to-br from-[#fff6f8] via-white to-[#fff8ec] p-5 shadow-[0_30px_80px_rgba(176,71,106,0.16)] sm:p-7">
                <div className="relative grid grid-cols-1 items-end gap-2 md:min-h-[27rem] md:grid-cols-[0.85fr_1.15fr]">
                  <div className="relative z-10 mx-auto min-w-0 self-end md:mx-0">
                    <img
                      src="/images/friendly-icons/pregnancy.webp"
                      alt=""
                      width="512"
                      height="512"
                      loading="eager"
                      decoding="async"
                      {...{ fetchpriority: 'high' }}
                      className="w-[8.5rem] max-w-none md:-ml-6 md:w-[17rem]"
                    />
                  </div>
                  <div className="relative z-20 flex min-w-0 flex-col gap-3 self-center py-2 md:py-4">
                    <p className="mb-1 font-display text-base font-extrabold leading-tight text-[#b0476a] sm:text-lg">Was jetzt für dich drin ist</p>
                    {/* Experiment 06.10.2026: die drei Angebote wischen mobil
                        nebeneinander, ab md stehen sie wie bisher untereinander. */}
                    <MobileSwipeRow
                      label="Was jetzt für dich drin ist"
                      desktopClassName="-mx-5 scroll-pl-5 px-5 sm:-mx-7 sm:scroll-pl-7 sm:px-7 md:mx-0 md:px-0 md:scroll-pl-0 md:flex md:flex-col md:gap-3"
                      mobileItemWidth="w-[76vw] max-w-[19rem]"
                      bleed={false}
                    >
                      {heroOffers.map((offer) => (
                        <a
                          key={offer.href}
                          href={offer.href}
                          className={`block h-full rounded-2xl border bg-white/95 p-3.5 shadow-[0_12px_30px_rgba(176,71,106,0.10)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_rgba(176,71,106,0.14)] motion-reduce:transform-none ${focus} ${offerTone[offer.tone].border}`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500 md:text-xs">{offer.code}</span>
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${offerTone[offer.tone].dot}`} aria-hidden="true" />
                          </span>
                          <span className="mt-1 block font-display text-base font-extrabold leading-tight text-home-midnight sm:text-lg">{offer.label}</span>
                          <span className="mt-1 block text-base leading-snug text-home-slate sm:text-base">{offer.note}</span>
                        </a>
                      ))}
                    </MobileSwipeRow>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiment 06.10.2026: mobil stehen die Testsiegel direkt unter dem Einstieg
            (Reihenfolge: Einstieg, Siegel, Ablauf, Wege, Bonus, Fragen). Ab md bleiben sie
            wie bisher im Bonus-Abschnitt; die Hälfte hier ist dort ausgeblendet und
            umgekehrt, es steht also nie dasselbe Siegel zweimal sichtbar auf der Seite. */}
        <div className="bg-white px-5 pb-2 pt-6 md:hidden">
          <IkkKassenSiegel order="parents" />
        </div>

        <section id="so-gehts" aria-labelledby="so-gehts-heading" className={`${wrap} scroll-mt-28 py-12 md:py-16`}>
          <h2 id="so-gehts-heading" className="font-friendly text-3xl md:text-4xl">So einfach geht es</h2>
          {/* Experiment 06.10.2026: die drei Schritte wischen mobil als Karten
              nebeneinander, ab md bleiben sie wie bisher in drei Spalten. */}
          <MobileSwipeRow
            as="ol"
            label="So einfach geht es"
            className="mt-5 md:mt-7"
            desktopClassName="-mx-5 scroll-pl-5 px-5 sm:-mx-8 sm:scroll-pl-8 sm:px-8 md:mx-0 md:px-0 md:scroll-pl-0 md:grid md:grid-cols-3 md:gap-10"
            mobileItemWidth="w-[78vw] max-w-[20rem]"
            bleed={false}
          >
            {steps.map(([title, description], i) => (
              <div key={title} className="h-full rounded-2xl border border-home-slate/15 bg-home-ice p-5 md:h-auto md:rounded-none md:border-0 md:bg-transparent md:p-0">
                <span className="font-friendly text-3xl text-[#076046]" aria-hidden="true">{i + 1}.</span>
                <h3 className="mt-1 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-home-slate">{description}</p>
              </div>
            ))}
          </MobileSwipeRow>
        </section>

        <section id="drei-wege" aria-labelledby="drei-wege-heading" className="scroll-mt-28 bg-home-ice py-12 md:py-20">
          <div className={wrap}>
            <h2 id="drei-wege-heading" className="font-friendly text-3xl md:text-4xl">Was jetzt noch geht</h2>
            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 md:gap-8">
              <article id="zusatzschutz" className="flex scroll-mt-28 flex-col rounded-2xl bg-white p-5 sm:p-8">
                <span id="ambulant" className="scroll-mt-28" aria-hidden="true" />
                <p className="font-semibold text-[#076046]">Ambulant, jetzt</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{config.protectionTitle}</h3>
                <PointList points={ambulantPoints} />
                <div className="mt-auto pt-5 sm:pt-7">
                  <Link data-product-link to={productPath} className={primary}>{config.productLabel}</Link>
                  <p className="mt-3 text-base leading-relaxed text-home-slate">Du siehst zuerst die vier Stufen mit Beitrag. Den Antrag startest du danach selbst online.</p>
                </div>
                <details className="mt-5 border-t border-home-slate/15 pt-4">
                  <summary className={`${summaryTap} cursor-pointer font-semibold ${focus}`}>Genauer nachlesen</summary>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-home-slate">
                    {paths[0].body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                    <p>{config.caution}</p>
                  </div>
                </details>
              </article>

              <article id="klinikschutz" aria-labelledby="klinikschutz-heading" className="flex scroll-mt-28 flex-col rounded-2xl bg-white p-5 sm:p-8">
                <span id="kind" className="scroll-mt-28" aria-hidden="true" />
                <span id="stationaer" className="scroll-mt-28" aria-hidden="true" />
                <p className="font-semibold text-[#076046]">Stationär, für die Zeit danach</p>
                <h3 id="klinikschutz-heading" className="mt-2 font-display text-2xl font-bold">Klinikschutz für dich und dein Kind</h3>
                <PointList points={hospitalPoints} />
                <div className="mt-auto pt-5 sm:pt-7">
                  <HospitalCalculatorLinks sdkUrl={sdkHospitalUrl} />
                  <p className="mt-3 text-base leading-relaxed text-home-slate">Beide Rechner öffnen sich in einem neuen Tab.</p>
                </div>
                <details id="klinik-wahl" className="mt-5 scroll-mt-28 border-t border-home-slate/15 pt-4">
                  <summary className={`${summaryTap} cursor-pointer font-semibold ${focus}`}>SDK oder Bayerische? Genauer nachlesen</summary>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-home-slate">
                    <p><strong>Zwischen Versicherungsbeginn und Geburt weniger als drei Monate:</strong> Dann passt die SDK. Dort genügt es, dass ein Elternteil am Tag der Geburt versichert ist.</p>
                    <p><strong>Mindestens drei Monate:</strong> Dann hast du die Wahl. Die Bayerische verlangt drei Monate Vorversicherung und ist für dein Kind bis 15 Jahre günstiger, im Prestige 4,10 EUR und im Komfort 3,20 EUR im Monat. Die Entbindung selbst versichert sie erst nach acht Monaten. Die SDK hat keine Wartezeiten, schließt aber eine beim Antrag schon festgestellte Schwangerschaft aus. Dort kostet dein Kind bis 15 Jahre im SP1 5,60 EUR und im SP2 3,37 EUR im Monat.</p>
                    <p>Dein Kind meldest du beim selben Versicherer an, bei dem du versichert bist.</p>
                    <ul className="list-disc space-y-2 pl-5">
                      {hospitalArguments.map((argument) => <li key={argument.slice(0, 40)}>{argument}</li>)}
                    </ul>
                    {paths[1].body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                    <p id="nachversicherung" className="scroll-mt-28"><strong>{paths[2].title}:</strong> {paths[2].body.join(' ')}</p>
                  </div>
                </details>
              </article>
            </div>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-home-slate sm:mt-7">Alles ausführlich im Ratgeber: <Link to="/ratgeber/schwanger-zusatzversicherung" className={textLink}>welcher Zusatzschutz jetzt noch geht</Link>, <Link to="/ratgeber/schwangerschaft-worauf-achten" className={textLink}>worauf du in der Schwangerschaft achten solltest</Link> und <Link to="/ratgeber/hebamme-kosten-krankenkasse" className={textLink}>was die Hebamme kostet und was die Kasse zahlt</Link>.</p>
          </div>
        </section>

        <section id="bonus-check" aria-labelledby="bonus-heading" className={`${wrap} scroll-mt-28 py-12 md:py-20`}>
          <span id="geheimtipp" className="scroll-mt-28" aria-hidden="true" />
          <div className="grid items-center gap-4 sm:gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <img src="/images/friendly-icons/bonus-you-mascot.webp" alt="" width="240" height="240" className="mx-auto w-20 md:w-48" loading="lazy" />
            <div>
              <h2 id="bonus-heading" className="font-friendly text-3xl md:text-4xl">Dein Bonus: jede Vorsorge zählt einzeln</h2>
              <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-home-slate">Bei der IKK classic bringt jede Mutterschaftsvorsorge 10 EUR Geldbonus oder 30 EUR Zuschuss, die Rückbildung später 25 oder 75 EUR. Der Zuschuss bezahlt deinen Versicherungsbeitrag, höchstens bis zu deinen tatsächlichen Kosten.</p>
              {/* Testsiegel der Krankenkasse IKK classic (Stand 09/2026), nur
                  eigene Bilddateien, nichts von Dritten (Messsperre auf dieser Seite). */}
              <div className="mt-6 hidden md:block">
                <IkkKassenSiegel order="parents" align="start" />
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <PregnancyBonusExample />
            <details className="mt-4 rounded-2xl bg-home-ice p-5 sm:p-8">
              <summary className={`${summaryTap} cursor-pointer font-semibold ${focus}`}>Was du dafür brauchst und wie gerechnet wird</summary>
              <div className="mt-4 max-w-prose space-y-3 text-base leading-relaxed text-home-slate">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Einen schriftlichen Nachweis je Untersuchung, der Mutterpass reicht aus, wenn Name, Maßnahme, Praxis und Datum daraus hervorgehen</li>
                  <li>Ein eigenes Antragsfeld je Vorsorge, alle Maßnahmen im selben Kalenderjahr</li>
                  <li>Für das Bonusjahr 2026 den vollständigen Antrag bis zum 31.03.2027</li>
                </ul>
                <p>Die bis zu 1.155 EUR sind ein rechnerischer Höchstwert aus der Satzung, in dem alles gleichzeitig zutrifft, und keine Summe, die die IKK classic irgendwo zusagt. In der breiten Masse landen aktive Versicherte bei 400 bis 700 EUR im Jahr.</p>
                <p>Der Zuschuss beträgt das Dreifache des Geldbonus, wird aber höchstens in Höhe deiner tatsächlichen Kosten ausgezahlt. Aus rechnerisch 405 EUR Zuschuss werden bei 240 EUR Jahresbeitrag also 240 EUR, nie mehr.</p>
                <p className="font-semibold text-home-midnight">Rechenbeispiel für eine Person im Bonusjahr 2026: 630 EUR Zuschuss oder alternativ 210 EUR Geldbonus</p>
                <dl className="divide-y divide-home-slate/20 hyphens-auto [hyphenate-limit-chars:10_4_4]">{film.map(([label, amount]) => (
                  <div key={label} className="flex justify-between gap-5 py-2"><dt className="min-w-0">{label}</dt><dd className="shrink-0 font-semibold">{amount}</dd></div>
                ))}</dl>
                <p>Die IKK classic prüft die Voraussetzungen und Nachweise, nicht wir. Deinen Bonus beantragst du später direkt bei deiner Krankenkasse, zum Beispiel in der IKK-classic-App. Bonusregeln: <a href="https://www.ikk-classic.de/pk/rv/produkte/bonusprogramm" className={textLink}>IKK classic</a> und <a href="https://cdn.ikk-classic.de/exporter/19125-infoblatt-ikkbonus.pdf" className={textLink}>Infoblatt 2026</a>.</p>
              </div>
            </details>
          </div>
          <p className="mt-6 text-base leading-relaxed text-home-slate">Du möchtest deine Kasse vergleichen? <Link to="/kassenboost" className={textLink}>KassenBoost kennenlernen</Link>. Das ist freiwillig.</p>
        </section>

        <section id="fragen" className={`${wrap} scroll-mt-28 border-t border-home-slate/15 py-12 md:py-20`}>
          <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:gap-16">
            {helpVisible ? (
              <div>
                <h2 className="font-friendly text-3xl md:text-4xl">{WHATSAPP_HELP_TITLE}</h2>
                <WhatsAppHelpHint placement="schwangerschaft-fragen" surface="bg-home-ice" className="mt-5" />
                <p className="mt-5 text-base text-home-slate">Lieber per E-Mail? <Link to="/kontakt" className={textLink}>Zur Kontaktseite</Link></p>
              </div>
            ) : (
              <div><h2 className="font-friendly text-3xl md:text-4xl">Noch eine Frage?</h2><p className="mt-3 text-home-slate">Du musst dich nicht durch alles allein klicken.</p><Link to="/kontakt" className={`-mb-2.5 mt-2.5 inline-block py-2.5 md:mb-0 md:mt-5 md:py-0 ${textLink}`}>Frage an Healio stellen</Link></div>
            )}
            <div className="divide-y divide-home-slate/20">{faq.map(([q, a]) => (
              <details key={q} className="py-4 first:pt-0 md:py-5"><summary className={`${summaryTap} cursor-pointer font-semibold ${focus}`}>{q}</summary><p className="mt-3 max-w-prose leading-relaxed text-home-slate">{a}</p></details>
            ))}</div>
          </div>
          <div className="mt-8 border-t border-home-slate/20 pt-7">
            <Link data-product-link to={productPath} className={primary}>{config.productLabel}</Link>
            <p className="mt-3 text-base leading-relaxed text-home-slate">Direkt zur Tarifauswahl. Ohne erneuten Bonus-Check oder Pflichttermin. Leistungsübersicht: <a href="https://www.sdk.de/downloads/Broschueren/Broschuere-Ambulante-Zusatzversicherung-1.781.pdf" className={textLink}>SDK Ambulant, Tarifübersicht (PDF)</a>.</p>
            <WhatsAppHelpHint placement="schwangerschaft-abschluss" variant="line" text="Auf der nächsten Seite wählst du deine Stufe. Kommst du nicht weiter, frag uns per WhatsApp." className="mt-4" />
          </div>
        </section>
      </div>
    </>
  );
}
