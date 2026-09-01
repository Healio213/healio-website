import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BadgeCheck,
  Baby,
  Building2,
  CheckCircle2,
  HeartPulse,
  MessageCircle,
  PlayCircle,
  ClipboardCheck,
  Timer,
  Users,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  WalletCards,
  Zap,
} from 'lucide-react';

const tickerSets = {
  ambulant: [
    { icon: WalletCards, key: 'ticker.budget' },
    { icon: ShieldCheck, key: 'ticker.sdk' },
    { icon: BadgeCheck, key: 'ticker.ikk' },
    { icon: HeartPulse, key: 'ticker.heilpraktiker' },
    { icon: Zap, key: 'ticker.noWait' },
    { icon: CheckCircle2, key: 'ticker.fast' },
    { icon: WalletCards, key: 'ticker.effective' },
    { icon: Sparkles, key: 'ticker.akupunktur' },
    { icon: HeartPulse, key: 'ticker.osteopathie' },
    { icon: PlayCircle, key: 'ticker.video' },
  ],
  home: [
    { icon: Zap, key: 'ticker.kassenBoost' },
    { icon: ShieldCheck, key: 'ticker.privateCover' },
    { icon: WalletCards, key: 'ticker.healthBudget' },
    { icon: WalletCards, key: 'ticker.bav' },
    { icon: HeartPulse, key: 'ticker.bkv' },
    { icon: Users, key: 'ticker.bgm' },
    { icon: Stethoscope, key: 'ticker.practiceNetwork' },
    { icon: MessageCircle, key: 'ticker.personalService' },
  ],
  leistungen: [
    { icon: ShieldCheck, key: 'ticker.threeAreas' },
    { icon: CheckCircle2, key: 'ticker.notEverything' },
    { icon: Users, key: 'ticker.needsFirst' },
    { icon: BadgeCheck, key: 'ticker.clearConditions' },
    { icon: MessageCircle, key: 'ticker.personalSupport' },
  ],
  about: [
    { icon: BadgeCheck, key: 'ticker.broker' },
    { icon: Building2, key: 'ticker.hamburg' },
    { icon: Users, key: 'ticker.threeAudiences' },
    { icon: CheckCircle2, key: 'ticker.needsFirst' },
    { icon: ShieldCheck, key: 'ticker.clearRoles' },
  ],
  unternehmen: [
    { icon: Building2, key: 'ticker.oneSystem' },
    { icon: ShieldCheck, key: 'ticker.existingSolutions' },
    { icon: CheckCircle2, key: 'ticker.openReview' },
    { icon: MessageCircle, key: 'ticker.ongoing' },
    { icon: MessageCircle, key: 'ticker.contact' },
  ],
  contact: [
    { icon: MessageCircle, key: 'contactTicker.personal' },
    { icon: Building2, key: 'contactTicker.hamburg' },
    { icon: MessageCircle, key: 'contactTicker.channels' },
    { icon: CheckCircle2, key: 'contactTicker.form' },
    { icon: Timer, key: 'contactTicker.response' },
  ],
  terminvereinbarung: [
    { icon: CheckCircle2, key: 'appointmentTicker.chooseTime' },
    { icon: BadgeCheck, key: 'appointmentTicker.free' },
    { icon: ShieldCheck, key: 'appointmentTicker.nonBinding' },
    { icon: MessageCircle, key: 'appointmentTicker.personal' },
    { icon: Zap, key: 'appointmentTicker.confirmation' },
  ],
  blog: [
    { icon: BadgeCheck, key: 'ticker.expertKnowledge' },
    { icon: WalletCards, key: 'ticker.healthBudgets' },
    { icon: ShieldCheck, key: 'ticker.supplementaryInsurance' },
    { icon: Building2, key: 'ticker.employerBenefits' },
    { icon: HeartPulse, key: 'ticker.audiences' },
  ],
  veterinary: [
    { icon: Zap, key: 'ticker.emergencyRates' },
    { icon: HeartPulse, key: 'ticker.surgeryCosts' },
    { icon: WalletCards, key: 'ticker.surgeryCover' },
    { icon: Stethoscope, key: 'ticker.freeChoice' },
    { icon: ShieldCheck, key: 'ticker.coverOptions' },
  ],
  lebenshilfe: [
    { icon: Building2, key: 'lebenshilfeTicker.employerContribution' },
    { icon: WalletCards, key: 'lebenshilfeTicker.employeeContribution' },
    { icon: ShieldCheck, key: 'lebenshilfeTicker.socialSecurity' },
    { icon: BadgeCheck, key: 'lebenshilfeTicker.taxFree' },
    { icon: Stethoscope, key: 'lebenshilfeTicker.freeAnalysis' },
  ],
  zahn: [
    { icon: Zap, key: 'ticker.sofortschutz' },
    { icon: ShieldCheck, key: 'ticker.fehlendeZaehne' },
    { icon: CheckCircle2, key: 'ticker.lueckenschluss' },
    { icon: Sparkles, key: 'ticker.pzr' },
    { icon: WalletCards, key: 'ticker.lkhPreis' },
    { icon: BadgeCheck, key: 'ticker.zahnersatz' },
    { icon: HeartPulse, key: 'ticker.noWait' },
    { icon: WalletCards, key: 'ticker.ikkBonus' },
    { icon: ClipboardCheck, key: 'ticker.check' },
  ],
  stationaer: [
    { icon: Building2, key: 'ticker.privateRoom' },
    { icon: Stethoscope, key: 'ticker.privateDoctor' },
    { icon: ShieldCheck, key: 'ticker.clinicChoice' },
    { icon: Zap, key: 'ticker.noWait' },
    { icon: Baby, key: 'ticker.roomingIn' },
    { icon: ShieldCheck, key: 'ticker.accidentCover' },
    { icon: BadgeCheck, key: 'ticker.replacementAllowance' },
    { icon: WalletCards, key: 'ticker.ikkBonus' },
  ],
  partner: [
    { icon: WalletCards, key: 'ticker.healthBudget' },
    { icon: ShieldCheck, key: 'ticker.neutralInformation' },
    { icon: MessageCircle, key: 'ticker.healioAdvice' },
    { icon: BadgeCheck, key: 'ticker.freeParticipation' },
    { icon: MessageCircle, key: 'ticker.directContact' },
  ],
  zahnaerzte: [
    { icon: Zap, key: 'ticker.immediateCover' },
    { icon: Sparkles, key: 'ticker.cleaning' },
    { icon: BadgeCheck, key: 'ticker.reimbursement' },
    { icon: ShieldCheck, key: 'ticker.missingTeeth' },
    { icon: Stethoscope, key: 'ticker.clearRoles' },
  ],
  hebammen: [
    { icon: WalletCards, key: 'ticker.healthBudget' },
    { icon: HeartPulse, key: 'ticker.naturopathy' },
    { icon: Baby, key: 'ticker.onCall' },
    { icon: ShieldCheck, key: 'ticker.newbornCover' },
    { icon: Stethoscope, key: 'ticker.clearRoles' },
  ],
  heilberufe: [
    { icon: ShieldCheck, key: 'ticker.completeProtection' },
    { icon: BadgeCheck, key: 'ticker.liability' },
    { icon: CheckCircle2, key: 'ticker.flexibleModules' },
    { icon: HeartPulse, key: 'ticker.contractCheck' },
    { icon: Stethoscope, key: 'ticker.freeCheck' },
  ],
};

const namespaceByVariant = {
  terminvereinbarung: 'contact',
  lebenshilfe: 'common',
};

const ariaKeyByVariant = {
  contact: 'contactTicker.ariaLabel',
  terminvereinbarung: 'appointmentTicker.ariaLabel',
  lebenshilfe: 'lebenshilfeTicker.ariaLabel',
};

const ProductTicker = ({ variant }) => {
  const selectedVariant = tickerSets[variant] ? variant : 'stationaer';
  const namespace = namespaceByVariant[selectedVariant] || selectedVariant;
  const { t } = useTranslation(namespace);
  const tickerItems = tickerSets[selectedVariant];
  const ariaKey = ariaKeyByVariant[selectedVariant] || 'ticker.ariaLabel';

  return (
    <div
      className="relative z-30 overflow-hidden border-b border-white/5 bg-gradient-to-r from-healio-dark via-slate-900 to-healio-dark py-3"
      aria-label={t(ariaKey)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-healio-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-healio-dark to-transparent" />

      <div className="animate-product-ticker flex w-max">
        {[...tickerItems, ...tickerItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.key}-${index}`}
              className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap px-6"
              aria-hidden={index >= tickerItems.length ? 'true' : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-healio-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-200">{t(item.key)}</span>
              <span className="mx-2 text-healio-primary/40" aria-hidden="true">•</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes product-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-product-ticker {
          animation: product-ticker 38s linear infinite;
        }
        .animate-product-ticker:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-product-ticker {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }
          .animate-product-ticker > [aria-hidden='true'] { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ProductTicker;
