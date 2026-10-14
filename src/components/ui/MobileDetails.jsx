import React from 'react';
import { ChevronDown } from 'lucide-react';

// Nur ergänzende Texte: IDs, Formulare und interaktive Zustände nicht duplizieren.
const MobileDetails = ({ summary, children, className = '', contentClassName = '' }) => (
  <>
    <details className={`group/mobile-details md:hidden ${className}`}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/mobile-details:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
      </summary>
      <div className={`pb-3 pt-1 ${contentClassName}`}>{children}</div>
    </details>
    <div className={`hidden md:contents ${contentClassName}`}>{children}</div>
  </>
);

export default MobileDetails;
