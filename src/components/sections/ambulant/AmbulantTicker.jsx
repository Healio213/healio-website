import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, Star, Heart, ShieldCheck, Zap } from 'lucide-react';

const tickerDefs = [
  { icon: TrendingUp, key: 'ticker.budget' },
  { icon: ShieldCheck, key: 'ticker.sdk' },
  { icon: Users, key: 'ticker.ikk' },
  { icon: Heart, key: 'ticker.heilpraktiker' },
  { icon: ShieldCheck, key: 'ticker.noWait' },
  { icon: Zap, key: 'ticker.fast' },
  { icon: TrendingUp, key: 'ticker.effective' },
  { icon: Star, key: 'ticker.akupunktur' },
  { icon: Star, key: 'ticker.osteopathie' },
  { icon: Heart, key: 'ticker.video' },
];

const AmbulantTicker = () => {
  const { t } = useTranslation('ambulant');

  return (
    <div className="relative bg-gradient-to-r from-healio-dark via-slate-900 to-healio-dark overflow-hidden py-3 z-30 border-b border-white/5">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-healio-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-healio-dark to-transparent z-10 pointer-events-none" />

      <div className="flex animate-ticker">
        {/* Render items twice for seamless loop */}
        {[...tickerDefs, ...tickerDefs].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-6 flex-shrink-0 whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-healio-primary flex-shrink-0" />
              <span className="text-sm font-medium text-gray-200">{t(item.key)}</span>
              <span className="text-healio-primary/40 mx-2">•</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 35s linear infinite;
          width: max-content;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AmbulantTicker;
