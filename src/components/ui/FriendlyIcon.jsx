import React from 'react';
import healioSoftClayIcons, {
  friendlyIconAssets,
  legacyIconKindAliases,
} from '@/components/ui/healioSoftClayIcons';

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
  icon,
  kind,
  src,
  label,
  tone = 'mint',
  size = 'md',
  className = '',
  imageClassName = '',
  decorative = true,
}) => {
  const legacyKind = icon ? legacyIconKindAliases[icon] : undefined;
  const assetSrc = src
    || friendlyIconAssets[kind]
    || friendlyIconAssets[legacyKind]
    || healioSoftClayIcons[icon]
    || friendlyIconAssets[emojiKinds[emoji]];
  const isLabelled = !decorative && Boolean(label);
  const assetScaleClass = assetSrc?.endsWith('/trust-broker-headset.webp') ? 'scale-[1.22]' : '';

  return (
    <span
      className={`relative isolate inline-grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br shadow-[0_12px_28px_rgba(38,61,73,0.11)] ring-1 ${toneClasses[tone] || toneClasses.mint} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      role={isLabelled ? 'img' : undefined}
      aria-label={isLabelled ? label : undefined}
      aria-hidden={isLabelled ? undefined : 'true'}
    >
      <span className="absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/55 blur-[1px]" aria-hidden="true" />
      {assetSrc ? (
        <img
          src={assetSrc}
          alt=""
          aria-hidden="true"
          width="192"
          height="192"
          loading="lazy"
          decoding="async"
          className={`relative h-[94%] w-[94%] select-none object-contain drop-shadow-[0_5px_7px_rgba(25,44,55,0.14)] ${assetScaleClass} ${imageClassName}`}
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
