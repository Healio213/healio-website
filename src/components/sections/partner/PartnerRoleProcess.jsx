import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const PartnerRoleProcess = () => {
  const { t } = useTranslation('partner');
  const reduceMotion = useReducedMotion();

  const roles = [
    {
      kind: 'ambulant',
      tone: 'sky',
      label: t('roleProcess.practiceLabel'),
      title: t('roleProcess.practiceTitle'),
      text: t('roleProcess.practiceText'),
    },
    {
      kind: 'family',
      tone: 'butter',
      label: t('roleProcess.patientLabel'),
      title: t('roleProcess.patientTitle'),
      text: t('roleProcess.patientText'),
    },
    {
      kind: 'protection',
      tone: 'mint',
      label: t('roleProcess.healioLabel'),
      title: t('roleProcess.healioTitle'),
      text: t('roleProcess.healioText'),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#061923] py-10 sm:py-24 lg:py-28 text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#25c990]/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-home-mint-active/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-6 max-w-3xl text-center sm:mb-16"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#75e6bf] sm:mb-4 sm:text-xs sm:tracking-[0.24em]">
            {t('roleProcess.eyebrow')}
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight sm:mb-5 sm:text-4xl lg:text-5xl">
            <HighlightText text={t('roleProcess.title')} className="text-[#75e6bf]" />
          </h2>
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            {t('roleProcess.subtitle')}
          </p>
        </motion.div>

        {/* Mobil wischen die drei Rollen als Karten nebeneinander, ab md das bisherige Raster mit Pfeilen ab lg. */}
        <MobileSwipeRow
          as="ol"
          label={t('roleProcess.eyebrow')}
          className="mx-auto max-w-6xl"
          desktopClassName="md:grid md:gap-5 lg:grid-cols-3 lg:gap-8"
          mobileItemWidth="w-[80vw] max-w-[20rem]"
          dotsTone="dark"
        >
          {roles.map((role, index) => {
            return (
              <motion.div
                key={role.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.1 }}
                className="relative h-full rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8"
              >
                <div className="mb-5 flex items-center justify-between gap-4 sm:mb-8">
                  <FriendlyIcon kind={role.kind} label={role.title} tone={role.tone} size="sm" />
                  <span className="text-sm font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-xs sm:tracking-[0.2em]">
                    {role.label}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">{role.title}</h3>
                <p className="text-base leading-relaxed text-slate-300 sm:leading-6">{role.text}</p>

                {index < roles.length - 1 && (
                  <span
                    className="absolute -right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#75e6bf]/25 bg-[#0a2430] text-[#75e6bf] lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </motion.div>
            );
          })}
        </MobileSwipeRow>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduceMotion ? 0 : 0.35 }}
          className="mx-auto mt-6 max-w-3xl border-t border-white/10 pt-5 text-center text-base font-medium text-[#b9f3df] sm:mt-10 sm:pt-8"
        >
          {t('roleProcess.closing')}
        </motion.p>
      </div>
    </section>
  );
};

export default PartnerRoleProcess;
