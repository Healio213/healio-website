import React from 'react';
import { ArrowUpRight, Check, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

// Gleiche Figuren und Farbtöne wie auf der Startseite, damit jeder Bereich überall gleich aussieht.
const pathVisuals = {
  ambulant: { kind: 'ambulant', tone: 'mint' },
  dental: { kind: 'dental', tone: 'butter' },
  hospital: { kind: 'hospital', tone: 'sky' },
  pet: { kind: 'pet', tone: 'lavender' },
};

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

        <div className="mt-12 grid gap-5 sm:gap-6 lg:mt-14 lg:gap-7">
          {items.map((item, index) => {
            const visual = pathVisuals[item.key] || pathVisuals.ambulant;

            return (
              <motion.article
                id={item.anchor}
                key={item.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group scroll-mt-24 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-9 lg:p-11"
              >
                <div className="grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
                  <div className="min-w-0">
                    <FriendlyIcon kind={visual.kind} tone={visual.tone} size="xl" />
                    <p className="mt-7 flex items-center gap-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-slate-600">
                      <span className="shrink-0 tracking-[0.2em] text-emerald-700">{item.number}</span>
                      <span className="h-px w-6 shrink-0 bg-slate-300" aria-hidden="true" />
                      <span className="min-w-0">{item.kicker}</span>
                    </p>
                    <h3 className="mt-4 max-w-[18ch] font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#10202A] [text-wrap:balance] sm:text-4xl">
                      {item.title}
                    </h3>
                  </div>
                  <div className="min-w-0 lg:pt-1">
                    <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{item.description}</p>
                    <p className="mt-5 max-w-2xl font-display text-sm font-extrabold leading-6 text-[#10202A]">{item.decision}</p>
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
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25C990] text-[#07111F]">
                            <Zap className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                          </span>
                          <p className="min-w-0 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#8EE7CA]">{item.highlight.label}</p>
                        </div>
                        <h4 className="mt-4 break-words font-display text-xl font-extrabold leading-tight tracking-[-0.025em] text-white [text-wrap:balance] sm:text-2xl">
                          {item.highlight.title}
                        </h4>
                        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{item.highlight.description}</p>
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
                      className="home-focus mt-7 inline-block font-display text-sm font-extrabold leading-6 text-emerald-700 transition hover:text-emerald-900"
                    >
                      {item.cta}
                      <ArrowUpRight className="ml-2 inline-block h-4 w-4 align-[-0.2em] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProtectionNavigator;
