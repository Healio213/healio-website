import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useLanguage } from '@/hooks/useLanguage';

// Zwei Wege, den Zusatzschutz zu bezahlen, als kleine Anmerkung auf den
// Produktseiten (Frank 29.09.2026). Bewusst ohne Wertung des Einkommens
// ("Du verdienst gut" war unglücklich): Weg 1 ist eine günstigere Kasse,
// Weg 2 der Kassenbonus. Ohne Kassennamen und ohne Bonusbeträge.
const SCHUTZ = {
  de: { ambulant: 'deinen ambulanten Schutz', zahn: 'deinen Zahnschutz', stationaer: 'deinen Klinikschutz' },
  en: { ambulant: 'your outpatient cover', zahn: 'your dental cover', stationaer: 'your hospital cover' },
};

const COPY = {
  de: {
    title: 'So kannst du {{schutz}} finanzieren',
    lead: 'Zwei Wege, die sich auch kombinieren lassen:',
    ways: [
      {
        title: 'Günstigere Krankenkasse',
        text: 'Mit niedrigerem Zusatzbeitrag bleibt dir jeden Monat mehr. Das gesparte Geld bezahlt {{schutz}}. Je höher dein Gehalt, desto mehr macht das aus.',
      },
      {
        title: 'Bonus deiner Krankenkasse',
        text: 'Für Sport, Vorsorge und Zahnkontrolle zahlt deine Kasse einen Bonus, unabhängig vom Einkommen. Er kann {{schutz}} ganz oder zum Teil finanzieren.',
      },
    ],
    cta: 'Welcher Weg bringt dir mehr? Mit KassenBoost prüfen',
  },
  en: {
    title: 'How to finance {{schutz}}',
    lead: 'Two ways, which you can also combine:',
    ways: [
      {
        title: 'A cheaper health insurance fund',
        text: 'A lower additional contribution leaves you more each month. The money you save pays for {{schutz}}. The higher your salary, the more it adds up.',
      },
      {
        title: 'Your fund\'s bonus',
        text: 'Your fund pays a bonus for sport, check-ups and dental check-ups, regardless of income. It can pay for all or part of {{schutz}}.',
      },
    ],
    cta: 'Which way brings you more? Check with KassenBoost',
  },
};

// Dieselben plastischen Healio-Icons wie im Rest der Seite.
const ICONS = [{ kind: 'money', tone: 'mint' }, { kind: 'bonus', tone: 'butter' }];

// Klassen für die kompakte Handy-Anordnung (mobileSwipe) und den bisherigen
// Stand. Es gibt nur zwei Wege, daher kein Wischen, sondern kompakt
// untereinander: engere Abstände, Icon klein neben der Überschrift und der
// Text über die volle Breite darunter. Ab md (768 px) sind beide Sätze
// identisch; ohne mobileSwipe bleibt jede Seite wie zuvor.
const LAYOUT = {
  standard: {
    section: 'px-4 py-10 sm:px-6 md:py-12 lg:px-8',
    card: 'p-6 sm:p-8',
    grid: 'gap-6',
    lead: 'mt-2 text-base leading-7 text-home-slate',
    cta: 'mt-4',
    ways: 'gap-5',
    way: 'flex gap-4',
    icon: '',
    wayBody: 'min-w-0',
    wayText: 'mt-1.5 text-base leading-7 text-home-slate',
  },
  kompakt: {
    section: 'px-4 py-6 sm:px-6 md:py-12 lg:px-8',
    card: 'p-5 sm:p-8',
    grid: 'gap-4 md:gap-6',
    lead: 'mt-2 text-base leading-6 text-home-slate md:leading-7',
    cta: 'mt-3 min-h-11 md:mt-4 md:min-h-0',
    ways: 'gap-4 md:gap-5',
    // Mobil: Icon und Überschrift in einer Zeile, der Text (display: contents am
    // Wrapper) spannt darunter über beide Spalten. Ab md wieder Flex wie zuvor.
    way: 'grid grid-cols-[auto_minmax(0,1fr)] content-start items-center gap-x-3 gap-y-2 md:flex md:items-stretch md:gap-4',
    icon: '!h-10 !w-10 md:!h-12 md:!w-12',
    wayBody: 'contents md:block md:min-w-0',
    wayText: 'col-span-2 text-base leading-6 text-home-slate md:col-span-1 md:mt-1.5 md:leading-7',
  },
};

// mobileSwipe (Standard false): nur die Zahnseite schaltet die kompakte
// Handy-Anordnung ein (Experiment 05.10.2026).
const ZweiWegeFinanzierung = ({ produkt = 'ambulant', className = 'bg-white', mobileSwipe = false }) => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];
  const schutz = SCHUTZ[language][produkt] || SCHUTZ[language].ambulant;
  const fill = (text) => text.replace('{{schutz}}', schutz);
  const ui = mobileSwipe ? LAYOUT.kompakt : LAYOUT.standard;

  return (
    <section className={`${ui.section} ${className}`} aria-labelledby={`zwei-wege-${produkt}-heading`} data-healio-zwei-wege={produkt}>
      <div className={`mx-auto max-w-7xl rounded-[1.75rem] border border-emerald-900/10 bg-white shadow-[0_12px_32px_rgba(7,17,31,0.05)] ${ui.card}`}>
        <div className={`grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10 ${ui.grid}`}>
          <div>
            <h2 id={`zwei-wege-${produkt}-heading`} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight [text-wrap:balance] sm:text-3xl">{fill(copy.title)}</h2>
            <p className={ui.lead}>{copy.lead}</p>
            <Link to={language === 'en' ? '/en/kassenboost' : '/kassenboost'} className={`home-focus inline-flex items-center font-display text-base font-extrabold text-emerald-800 underline decoration-home-mint/50 decoration-2 underline-offset-4 transition hover:text-emerald-950 ${ui.cta}`}>
              {copy.cta}
              <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 ${ui.ways}`}>
            {copy.ways.map((way, index) => (
              <article key={way.title} className={ui.way}>
                <FriendlyIcon kind={ICONS[index].kind} tone={ICONS[index].tone} size="sm" className={ui.icon} />
                <div className={ui.wayBody}>
                  <h3 className="font-display text-lg font-extrabold leading-snug text-home-midnight">{way.title}</h3>
                  <p className={ui.wayText}>{fill(way.text)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZweiWegeFinanzierung;
