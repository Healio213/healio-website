import React from 'react';
import { Lock } from 'lucide-react';

/**
 * Schlanke Hülle für Meta-Zielseiten: nur Logo, ein Vertrauenssatz,
 * Impressum und Datenschutz. Kein Menü, keine weiterführenden Links.
 * Impressum und Datenschutz öffnen in einem neuen Tab, damit der Check
 * nicht verloren geht.
 */
const CampaignShell = ({ trustNote = 'Unverbindlich, in 45 Sekunden', children }) => (
  <div className="flex min-h-screen w-full flex-col bg-home-ice text-slate-700">
    <header className="bg-home-midnight">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <img
          src="/healio-logo-white-web.svg"
          alt="Healio"
          width="250"
          height="100"
          className="h-9 w-auto sm:h-10"
        />
        {trustNote ? (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 sm:text-sm">
            <Lock className="h-3.5 w-3.5 text-home-mint" aria-hidden="true" />
            {trustNote}
          </p>
        ) : null}
      </div>
    </header>

    <div className="flex-grow">{children}</div>

    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-6 text-sm text-slate-500">
        <span>© Healio GmbH</span>
        <a href="/impressum" target="_blank" rel="noopener" className="font-semibold text-slate-600 underline underline-offset-2">
          Impressum
        </a>
        <a href="/datenschutz" target="_blank" rel="noopener" className="font-semibold text-slate-600 underline underline-offset-2">
          Datenschutz
        </a>
      </div>
    </footer>
  </div>
);

export default CampaignShell;
