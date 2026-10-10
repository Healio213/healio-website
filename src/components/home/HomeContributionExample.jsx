import React from 'react';
import { getDesktopLeadContent } from '@/components/desktop/desktopLeadContent';

const HomeContributionExample = ({ language }) => {
  const copy = getDesktopLeadContent('home', language);
  const english = language === 'en';

  return (
    <section className="bg-[#eef6f2] px-4 py-7 text-home-midnight lg:hidden" aria-labelledby="home-contribution-example">
      <div className="mx-auto max-w-2xl">
        <h2 id="home-contribution-example" className="font-display text-xl font-extrabold leading-7">
          {english ? 'An example: premium minus bonus' : 'Ein Beispiel: Beitrag minus Bonus'}
        </h2>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-lg font-extrabold tabular-nums" aria-label={english ? 'EUR 470.28 annual premium minus EUR 400 assumed bonus equals EUR 70.28 annual cost' : '470,28 EUR Jahresbeitrag minus 400 EUR angenommener Bonus ergibt 70,28 EUR Jahresaufwand'}>
          {copy.calculation.map((row) => (
            <span key={row.label} className={row.sign === '=' ? 'text-[#075f46]' : undefined}>
              {row.sign && <span className="mr-2">{row.sign}</span>}{row.value}
            </span>
          ))}
        </p>
        <p className="mt-3 text-sm leading-6 text-[#334f46]">
          {english
            ? 'Example: age 35, SDK AP1 at EUR 39.19 per month. You pay that premium first. The EUR 400 bonus is an assumption, subject to qualifying activities and eligible expenses.'
            : 'Beispiel: 35 Jahre, SDK AP1 mit 39,19 EUR im Monat. Diesen Beitrag zahlst du zunächst selbst. Die 400 EUR Bonus sind eine Annahme und hängen von Aktivitäten und anrechenbaren Kosten ab.'}
        </p>
        <details className="mt-3">
          <summary className="min-h-11 cursor-pointer py-3 font-bold text-[#075f46] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            {english ? 'How the bonus offset works' : 'So funktioniert der Bonusausgleich'}
          </summary>
          <dl className="space-y-3 pb-2">
            {copy.calculation.map((row) => (
              <div key={row.label}>
                <dt className="text-sm font-bold">{row.label}: {row.value}</dt>
                <dd className="mt-1 text-sm leading-6 text-[#334f46]">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm leading-6 text-[#334f46]">{copy.panelNote}</p>
        </details>
      </div>
    </section>
  );
};

export default HomeContributionExample;
