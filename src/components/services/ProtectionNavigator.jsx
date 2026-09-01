import React from 'react';
import { ArrowUpRight, Check, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const ProtectionNavigator = () => {
  const { t } = useTranslation('leistungen');
  const { getPath } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const items = t('paths.items', { returnObjects: true });

  return (
    <section id="schutz-kompass" className="scroll-mt-20 bg-[#F5F8F6] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="protection-navigator-title">
      <div className="healio-container">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700">{t('paths.eyebrow')}</p>
            <h2 id="protection-navigator-title" className="mt-4 max-w-[14ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#10202A] sm:text-5xl">
              {t('paths.title')}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('paths.description')}</p>
        </div>

        <div className="mt-14 border-b border-slate-300/80">
          {items.map((item, index) => (
            <motion.article
              id={item.anchor}
              key={item.key}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="group scroll-mt-24 border-t border-slate-300/80 py-9 sm:py-11"
            >
              <div className="grid gap-7 lg:grid-cols-[5rem_0.8fr_1.2fr] lg:gap-10">
                <span className="font-display text-xs font-extrabold tracking-[0.2em] text-emerald-700">{item.number}</span>
                <div>
                  <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-slate-600">{item.kicker}</p>
                  <h3 className="mt-4 max-w-[15ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#10202A] sm:text-4xl">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:pt-7">
                  <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{item.description}</p>
                  <p className="mt-5 font-display text-sm font-extrabold text-[#10202A]">{item.decision}</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#DDEFE8] text-emerald-800">
                          <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {item.highlight && (
                    <aside className="mt-7 overflow-hidden rounded-2xl bg-[#10202A] p-5 text-white shadow-[0_18px_50px_rgba(16,32,42,0.14)] sm:p-6" aria-label={item.highlight.label}>
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25C990] text-[#07111F]">
                          <Zap className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#8EE7CA]">{item.highlight.label}</p>
                          <h4 className="mt-2 break-words [hyphens:auto] font-display text-xl font-extrabold leading-tight tracking-[-0.025em] text-white sm:text-2xl">
                            {item.highlight.title}
                          </h4>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{item.highlight.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.highlight.facts.map((fact) => (
                          <li key={fact} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-slate-200">
                            {fact}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 border-t border-white/10 pt-4 text-[0.7rem] leading-5 text-slate-400">{item.highlight.note}</p>
                    </aside>
                  )}
                  <Link
                    to={getPath(item.routeKey)}
                    className="home-focus mt-7 inline-flex items-center gap-2 font-display text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900"
                  >
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProtectionNavigator;
