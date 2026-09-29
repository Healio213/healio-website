import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse, PiggyBank } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Zwei Wege, den Zusatzschutz zu bezahlen (Auftrag Frank, 29.09.2026):
// Gut verdienen heißt Beitrag sparen und damit den Schutz bezahlen, weniger
// verdienen und aktiv sein heißt Kassenbonus nutzen. Bewusst ohne Kassennamen
// und ohne Bonusbeträge; das Rechenbeispiel ist reine Arithmetik (halber
// Zusatzbeitrag als Arbeitnehmer, 5.500 EUR x 12 x 0,5 %).
const SCHUTZ = {
  de: { ambulant: 'deinen ambulanten Schutz', zahn: 'deinen Zahnschutz', stationaer: 'deinen Klinikschutz' },
  en: { ambulant: 'your outpatient cover', zahn: 'your dental cover', stationaer: 'your hospital cover' },
};

const COPY = {
  de: {
    eyebrow: 'Zwei Wege, ein Ziel',
    title: 'So bezahlst du {{schutz}}',
    lead: 'Wir schauen zuerst auf deine ganze Lage: Krankenkasse, Bonus und Zusatzschutz. Welcher Weg dir mehr bringt, hängt vor allem an deinem Einkommen.',
    ways: [
      {
        label: 'Weg 1 · Beitrag sparen',
        title: 'Du verdienst gut',
        text: 'Dein Kassenbeitrag hängt an deinem Brutto. Mit einer Krankenkasse mit niedrigem Zusatzbeitrag sparst du deshalb umso mehr, je mehr du verdienst. Das gesparte Geld bezahlt {{schutz}}.',
        example: 'Rechenbeispiel als Arbeitnehmer: 1 Prozentpunkt weniger Zusatzbeitrag sind bei 5.500 EUR brutto 330 EUR im Jahr.',
      },
      {
        label: 'Weg 2 · Bonus nutzen',
        title: 'Du bist aktiv',
        text: 'Du verdienst weniger, gehst aber zum Sport, zur Vorsorge und zur Zahnkontrolle? Dann bringt dir der Bonus deiner Krankenkasse oft mehr als ein günstigerer Beitrag. Er finanziert {{schutz}} ganz oder zum Teil.',
        example: 'Bei manchen Kassen wird der Bonus sogar höher, wenn du ihn für eine Zusatzversicherung einsetzt.',
      },
    ],
    note: 'Du verdienst gut und bist aktiv? Dann lohnt sich ein Blick auf beides.',
    cta: 'Beide Wege mit KassenBoost prüfen',
  },
  en: {
    eyebrow: 'Two ways, one goal',
    title: 'How to pay for {{schutz}}',
    lead: 'We start with your whole situation: health insurance fund, bonus and supplementary cover. Which way brings you more depends mainly on your income.',
    ways: [
      {
        label: 'Way 1 · Save on contributions',
        title: 'You earn well',
        text: 'Your statutory contribution depends on your gross pay. A fund with a low additional contribution therefore saves you more the more you earn. The money you save pays for {{schutz}}.',
        example: 'Example for an employee: 1 percentage point less additional contribution is worth 330 EUR a year at 5,500 EUR gross.',
      },
      {
        label: 'Way 2 · Use your bonus',
        title: 'You stay active',
        text: 'You earn less but do sport, go to check-ups and see the dentist? Then your fund\'s bonus often brings you more than a lower contribution. It pays for all or part of {{schutz}}.',
        example: 'With some funds, the bonus is even higher if you use it for supplementary insurance.',
      },
    ],
    note: 'You earn well and stay active? Then look at both.',
    cta: 'Check both ways with KassenBoost',
  },
};

const ICONS = [PiggyBank, HeartPulse];

const ZweiWegeFinanzierung = ({ produkt = 'ambulant', className = 'bg-white' }) => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const copy = COPY[language];
  const schutz = SCHUTZ[language][produkt] || SCHUTZ[language].ambulant;
  const fill = (text) => text.replace('{{schutz}}', schutz);

  return (
    <section className={`px-4 py-16 sm:px-6 md:py-20 lg:px-8 ${className}`} aria-labelledby={`zwei-wege-${produkt}-heading`} data-healio-zwei-wege={produkt}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="home-eyebrow">{copy.eyebrow}</p>
          <h2 id={`zwei-wege-${produkt}-heading`} className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight [text-wrap:balance] sm:text-4xl">{fill(copy.title)}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-home-slate sm:text-lg">{copy.lead}</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {copy.ways.map((way, index) => {
            const Icon = ICONS[index];
            return (
              <article key={way.label} className={`flex flex-col rounded-[1.75rem] border p-6 sm:p-8 ${index === 0 ? 'border-emerald-900/10 bg-home-ice' : 'border-[#f0dfb8] bg-[#fffaf0]'}`}>
                <div className="flex items-center gap-3">
                  <Icon className="h-7 w-7 shrink-0 text-emerald-700" aria-hidden="true" />
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-800">{way.label}</p>
                </div>
                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.03em] text-home-midnight">{way.title}</h3>
                <p className="mt-3 text-base leading-7 text-home-slate">{fill(way.text)}</p>
                <p className="mt-5 border-t border-dashed border-home-midnight/15 pt-4 text-sm leading-6 text-slate-500">{way.example}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base font-semibold leading-7 text-home-midnight">{copy.note}</p>
          <Link to={language === 'en' ? '/en/kassenboost' : '/kassenboost'} className="home-focus inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-full border border-emerald-900/15 bg-white px-6 font-display text-sm font-extrabold text-home-midnight transition hover:border-home-mint hover:bg-home-ice sm:self-auto">
            {copy.cta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ZweiWegeFinanzierung;
