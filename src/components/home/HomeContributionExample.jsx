import React from 'react';
import { useTranslation } from 'react-i18next';
import { getDesktopLeadContent } from '@/components/desktop/desktopLeadContent';

const HomeContributionExample = ({ language }) => {
  const { t } = useTranslation('home');
  const copy = getDesktopLeadContent('home', language);
  const english = language === 'en';

  const exampleContent = (mobile = false) => {
    const Conditions = mobile ? 'div' : 'details';
    const ConditionsHeading = mobile ? 'h3' : 'summary';
    return (
      <>
        <h2 id={mobile ? 'home-contribution-mobile-example' : 'home-contribution-example'} className="font-display text-xl font-extrabold leading-7">
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
        <Conditions className="mt-3">
          <ConditionsHeading className={mobile ? 'py-3 font-bold text-[#075f46]' : 'min-h-11 cursor-pointer py-3 font-bold text-[#075f46] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'}>
            {copy.knowTitle}
          </ConditionsHeading>
          <div className="space-y-2 pb-2 text-sm leading-6 text-[#334f46]">
            {copy.knowItems.map((item) => <p key={item}>{item}</p>)}
          </div>
          <dl className="space-y-3 pb-2">
            {copy.calculation.map((row) => (
              <div key={row.label}>
                <dt className="text-sm font-bold">{row.label}: {row.value}</dt>
                <dd className="mt-1 text-sm leading-6 text-[#334f46]">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm leading-6 text-[#334f46]">{copy.panelNote}</p>
        </Conditions>
      </>
    );
  };

  return (
    <section className="bg-[#eef6f2] px-4 py-4 text-home-midnight md:py-7 lg:hidden" aria-label={t('mobile.contribution.title')}>
      <div className="mx-auto max-w-2xl">
        <details className="md:hidden">
          <summary className="home-focus min-h-[44px] cursor-pointer py-2 font-display font-bold text-[#075f46]">
            {t('mobile.contribution.title')}
            <span className="mt-1 block text-sm font-normal text-[#334f46]">{t('mobile.contribution.hint')}</span>
          </summary>
          <div className="pb-2 pt-5">{exampleContent(true)}</div>
        </details>
        <div className="hidden md:block">{exampleContent()}</div>
      </div>
    </section>
  );
};

export default HomeContributionExample;
