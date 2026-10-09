import React, { useId } from 'react';

// Eigene, gefüllte Illustrationen für den Vorsorgebereich. Bedien-Icons wie
// Pfeile und Plus/Minus bleiben im bestehenden Lucide-System.
const AltersvorsorgeIllustration = ({ kind = 'zulage', className = 'h-20 w-20' }) => {
  const id = `vorsorge-${useId().replace(/:/g, '')}`;
  const mint = `url(#${id}-mint)`;
  const gold = `url(#${id}-gold)`;
  const paper = `url(#${id}-paper)`;
  const Coin = ({ x, y, size = 18 }) => (
    <g>
      <circle cx={x + 1} cy={y + 2} r={size} fill="#b77d26" />
      <circle cx={x} cy={y} r={size} fill={gold} stroke="#c69238" strokeWidth="1" />
      <circle cx={x} cy={y} r={size - 4} fill="none" stroke="#fff4ca" strokeWidth="1.5" />
      <path d={`M${x + 4} ${y - 7}c-8-4-13 10-4 14l4-1M${x - 8} ${y - 2}h10M${x - 8} ${y + 2}h9`} fill="none" stroke="#88601c" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  const Document = () => (
    <g>
      <path d="M22 14h27l13 13v39a5 5 0 0 1-5 5H22a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5Z" fill="#b8d5cb" transform="translate(2 2)" />
      <path d="M22 14h27l13 13v39a5 5 0 0 1-5 5H22a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5Z" fill={paper} stroke="#9cbbaf" strokeWidth="1.2" />
      <path d="M49 14v10a3 3 0 0 0 3 3h10" fill="#d9eee4" stroke="#9cbbaf" strokeWidth="1.2" />
      <path d="M27 32h13M27 40h24M27 48h20" stroke="#658c7e" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );

  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false" fill="none">
      <defs>
        <linearGradient id={`${id}-mint`} x1="18" y1="8" x2="62" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#91efd0" /><stop offset=".55" stopColor="#25c990" /><stop offset="1" stopColor="#078462" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="28" y1="21" x2="59" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff0b3" /><stop offset=".45" stopColor="#efc35e" /><stop offset="1" stopColor="#d59c38" />
        </linearGradient>
        <linearGradient id={`${id}-paper`} x1="22" y1="14" x2="61" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" /><stop offset="1" stopColor="#edf8f2" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="#e9f7ef" />
      <ellipse cx="41" cy="70" rx="27" ry="3.5" fill="#0b6048" opacity=".12" />

      {['zulage', 'grundzulage', 'depot'].includes(kind) && (
        <g>
          <rect x="12" y="37" width="44" height="28" rx="7" fill="#0d5348" />
          <path d="M12 46h44M19 55h14" stroke="#8bd9bf" strokeWidth="2" strokeLinecap="round" />
          <rect x="43" y="45" width="16" height="13" rx="4" fill={mint} stroke="#087b5d" />
          <circle cx="50" cy="51.5" r="1.7" fill="#0d5348" />
          <Coin x={48} y={28} size={18} />
          <path d="m17 22 3-5 3 5 5 3-5 3-3 5-3-5-5-3 5-3Z" fill={mint} />
        </g>
      )}
      {['kinderzulage', 'familien'].includes(kind) && (
        <g>
          <path d="M10 62c0-15 4-24 16-24s17 9 17 24" fill="#105b4d" />
          <circle cx="27" cy="25" r="12" fill={mint} stroke="#087b5d" />
          <path d="M36 66c0-12 4-19 13-19s13 7 13 19" fill={mint} stroke="#087b5d" />
          <circle cx="49" cy="37" r="9" fill={paper} stroke="#a8cebc" />
          <path d="M21 50c5 5 10 5 15 0" stroke="#8bd9bf" strokeWidth="2" strokeLinecap="round" />
          <Coin x={65} y={22} size={11} />
        </g>
      )}
      {['startbonus', 'neu', 'startplan'].includes(kind) && (
        <g>
          <rect x="13" y="20" width="51" height="47" rx="6" fill={paper} stroke="#9cbbaf" strokeWidth="1.2" />
          <path d="M19 20h39a6 6 0 0 1 6 6v9H13v-9a6 6 0 0 1 6-6Z" fill="#105b4d" />
          <path d="M25 15v13M52 15v13" stroke="#8bd9bf" strokeWidth="4" strokeLinecap="round" />
          <path d="M25 47h8M25 56h8M42 47h8" stroke="#a4c8b8" strokeWidth="3" strokeLinecap="round" />
          {kind === 'startbonus' ? <Coin x={58} y={55} size={16} /> : (
            <g><circle cx="56" cy="56" r="16" fill={mint} stroke="#087b5d" /><path d="m49 56 5 5 9-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></g>
          )}
        </g>
      )}
      {['riester', 'entscheidung'].includes(kind) && (
        <g>
          <Document />
          <circle cx="57" cy="57" r="13" fill={mint} stroke="#087b5d" />
          <path d="M50 54h14l-4-4M64 60H50l4 4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {['webinar', 'wissen', 'grundlagen'].includes(kind) && (
        <g>
          <rect x="10" y="18" width="60" height="40" rx="6" fill="#0d5348" />
          <rect x="14" y="22" width="52" height="31" rx="3" fill={paper} />
          <path d="m34 29 14 9-14 9V29Z" fill={mint} stroke="#087b5d" strokeLinejoin="round" />
          <path d="M35 59v8h10v-8M26 69h28" stroke="#0d5348" strokeWidth="3" strokeLinecap="round" />
          <path d="m65 11 2-4 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" fill={gold} />
        </g>
      )}
      {['check', 'selbststaendige'].includes(kind) && (
        <g>
          <rect x="29" y="14" width="42" height="31" rx="7" fill={paper} stroke="#9cbbaf" strokeWidth="1.2" />
          <path d="m47 44-7 9v-9" fill={paper} stroke="#9cbbaf" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="m42 29 6 6 11-13" stroke="#0a946b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23" cy="39" r="11" fill={mint} stroke="#087b5d" />
          <path d="M7 66c0-13 4-20 16-20s17 7 17 20" fill="#105b4d" />
          <path d="M15 56c6 5 10 5 16 0" stroke="#8bd9bf" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

export default AltersvorsorgeIllustration;
