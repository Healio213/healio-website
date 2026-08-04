import React from 'react';

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
};

const FriendlyIcon = ({
  emoji,
  label,
  tone = 'mint',
  size = 'md',
  className = '',
}) => (
  <span
    className={`relative isolate inline-grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br shadow-[0_12px_28px_rgba(38,61,73,0.11)] ring-1 ${toneClasses[tone] || toneClasses.mint} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : 'true'}
  >
    <span className="absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/55 blur-[1px]" aria-hidden="true" />
    <span
      className="relative translate-y-[1px] select-none leading-none drop-shadow-[0_5px_5px_rgba(25,44,55,0.16)]"
      style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
      aria-hidden="true"
    >
      {emoji}
    </span>
  </span>
);

export default FriendlyIcon;
