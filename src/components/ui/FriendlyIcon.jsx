import React from 'react';

const iconBase = '/images/friendly-icons';

/**
 * Healio's visual icon language. Content components should prefer `kind` over
 * introducing another emoji or one-off SVG. The emoji map below keeps older
 * callsites visually consistent while they are migrated.
 */
export const friendlyIconAssets = {
  money: `${iconBase}/money-note.webp`,
  bonus: `${iconBase}/bonus-medal.webp`,
  budget: `${iconBase}/health-wallet.webp`,
  calculator: `${iconBase}/calculator.webp`,
  family: `${iconBase}/family.webp`,
  fitness: `${iconBase}/fitness.webp`,
  smartwatch: `${iconBase}/smartwatch.webp`,
  ambulant: `${iconBase}/medical-stethoscope.webp`,
  dental: `${iconBase}/dental-shield.webp`,
  hospital: `${iconBase}/hospital-room.webp`,
  support: `${iconBase}/personal-support.webp`,
  document: `${iconBase}/document-check.webp`,
  region: `${iconBase}/germany-region.webp`,
  protection: `${iconBase}/protection-shield.webp`,
  comparison: `${iconBase}/compare-value.webp`,
  switch: `${iconBase}/switch-check.webp`,
  privacy: `${iconBase}/privacy-lock.webp`,
  calendar: `${iconBase}/verified-calendar.webp`,
  glasses: `${iconBase}/vision-glasses.webp`,
  pregnancy: `${iconBase}/pregnancy.webp`,
  prevention: `${iconBase}/prevention-vaccination.webp`,
  medication: `${iconBase}/medication-copay.webp`,
  naturopathy: `${iconBase}/naturopathy.webp`,
  thinking: `${iconBase}/decision-thinking.webp`,
  weighing: `${iconBase}/decision-weighing.webp`,
  choice: `${iconBase}/decision-choice.webp`,
  broker: `${iconBase}/trust-broker.webp`,
  advisor: `${iconBase}/trust-advisor.webp`,
};

const emojiKinds = {
  '💶': 'money',
  '💰': 'money',
  '💵': 'money',
  '💸': 'money',
  '📉': 'money',
  '🪙': 'money',
  '🐷': 'money',
  '🎁': 'bonus',
  '💝': 'bonus',
  '🏅': 'bonus',
  '✨': 'bonus',
  '⚡': 'bonus',
  '⚡️': 'bonus',
  '💚': 'budget',
  '💳': 'budget',
  '🧮': 'calculator',
  '🧾': 'calculator',
  '⚙️': 'calculator',
  '⚙': 'calculator',
  '👨‍👩‍👧': 'family',
  '🙋': 'family',
  '👶': 'family',
  '🤱': 'family',
  '😊': 'family',
  '🏃': 'fitness',
  '🧘': 'fitness',
  '❤️‍🩹': 'prevention',
  '⌚': 'smartwatch',
  '🩺': 'ambulant',
  '🧑‍⚕️': 'ambulant',
  '🦷': 'dental',
  '😁': 'dental',
  '🧩': 'dental',
  '🪥': 'dental',
  '🏥': 'hospital',
  '🛏️': 'hospital',
  '🩹': 'hospital',
  '🚑': 'hospital',
  '🏢': 'protection',
  '💬': 'support',
  '🎧': 'support',
  '🤝': 'support',
  '🙌': 'support',
  '📞': 'support',
  '📱': 'support',
  '✉️': 'document',
  '📄': 'document',
  '📝': 'document',
  '📋': 'document',
  '🗒️': 'document',
  '📲': 'document',
  '✍️': 'document',
  '📦': 'document',
  '🎓': 'document',
  '🗂️': 'document',
  '🗂': 'document',
  '📅': 'calendar',
  '🗓️': 'calendar',
  '📍': 'region',
  '🔎': 'comparison',
  '🔍': 'comparison',
  '🛡️': 'protection',
  '🔒': 'privacy',
  '🔑': 'protection',
  '✅': 'protection',
  '🧭': 'comparison',
  '⚖️': 'comparison',
  '🎯': 'comparison',
  '💡': 'comparison',
  '📈': 'comparison',
  '🔄': 'switch',
  '🚀': 'switch',
  '⏱️': 'switch',
  '⏳': 'switch',
  '👓': 'glasses',
  '🤰': 'pregnancy',
  '💉': 'prevention',
  '💊': 'medication',
  '🌿': 'naturopathy',
  '🌸': 'naturopathy',
  '☯️': 'naturopathy',
  '🦴': 'naturopathy',
  '🌱': 'naturopathy',
  '🌳': 'naturopathy',
  '🌍': 'naturopathy',
  '💧': 'naturopathy',
};

const toneClasses = {
  mint: 'from-[#eefaf5] via-[#dff5eb] to-[#c9eddf] ring-[#bddfd2]',
  lavender: 'from-[#f7f4ff] via-[#eee9fb] to-[#ddd5f4] ring-[#d5cdec]',
  butter: 'from-[#fffdf2] via-[#fff5d5] to-[#fbe7a8] ring-[#eadca9]',
  sky: 'from-[#f1f8ff] via-[#e4f2ff] to-[#cde5f6] ring-[#c5dceb]',
  coral: 'from-[#fff6f2] via-[#ffe8de] to-[#f7cdbd] ring-[#eac3b5]',
};

const sizeClasses = {
  sm: 'h-12 w-12 rounded-[1rem] text-[1.65rem]',
  md: 'h-16 w-16 rounded-[1.25rem] text-[2.15rem]',
  lg: 'h-20 w-20 rounded-[1.55rem] text-[2.75rem]',
  xl: 'h-24 w-24 rounded-[1.75rem] text-[3rem]',
};

const FriendlyIcon = ({
  emoji,
  kind,
  src,
  label,
  tone = 'mint',
  size = 'md',
  className = '',
  imageClassName = '',
  decorative = true,
}) => {
  const resolvedSrc = src || friendlyIconAssets[kind] || friendlyIconAssets[emojiKinds[emoji]];
  const isLabelled = !decorative && Boolean(label);

  return (
    <span
      className={`relative isolate inline-grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br shadow-[0_12px_28px_rgba(38,61,73,0.11)] ring-1 ${toneClasses[tone] || toneClasses.mint} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      role={isLabelled ? 'img' : undefined}
      aria-label={isLabelled ? label : undefined}
      aria-hidden={isLabelled ? undefined : 'true'}
    >
      <span className="absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/55 blur-[1px]" aria-hidden="true" />
      {resolvedSrc ? (
        <img
          src={resolvedSrc}
          alt=""
          className={`relative h-[94%] w-[94%] select-none object-contain drop-shadow-[0_5px_7px_rgba(25,44,55,0.14)] ${imageClassName}`}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      ) : (
        <span
          className="relative translate-y-[1px] select-none leading-none drop-shadow-[0_5px_5px_rgba(25,44,55,0.16)]"
          style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
          aria-hidden="true"
        >
          {emoji}
        </span>
      )}
    </span>
  );
};

export default FriendlyIcon;
