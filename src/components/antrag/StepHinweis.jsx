import React from 'react';
import { FRAGEN_ANZAHL, SDK_VORSPANN_ABSAETZE } from '@/data/sdkAmbulantAntrag';
import { MITTEILUNG_GELESEN, VVG_19_AUFKLAPPEN } from '@/data/sdkAmbulantAntragTexte';
import { SDK_VVG_19_MITTEILUNG } from '@/data/sdkAmbulantAntragSdkTexte';
import {
  Aufklapper, FehlerText, OptionCard, TRENNUNG, cx,
} from './ui';

// Schritt 2, erster Bildschirm: Hinweis der SDK vor den Gesundheitsfragen,
// wortgleich, und die Bestätigung, dass die Mitteilung gelesen wurde.
// Die Mitteilung nach § 19 Abs. 5 VVG steht nur da, wenn ihr Wortlaut in
// sdkAmbulantAntragSdkTexte.js vorliegt (sichtbare Platzhalter sind auf der
// Prüfseite verboten).
export default function StepHinweis({ daten, set, fehler, ueberschriftRef }) {
  return (
    <div className="space-y-4">
      <h2 ref={ueberschriftRef} tabIndex={-1} className="font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
        <span className="block text-base font-extrabold text-emerald-900">Vor den {FRAGEN_ANZAHL} Fragen</span>
        Hinweis der SDK
      </h2>
      <p className="text-base leading-7 text-home-slate">
        Jetzt tippst du die Gesundheitsfragen selbst an. Deine Antworten vom Telefon siehst du jeweils klein unter der Frage.
      </p>

      <div className={cx('space-y-3 break-words rounded-[1.2rem] border-2 border-amber-400 bg-amber-50 p-4 text-base leading-7 text-amber-950', TRENNUNG)}>
        {SDK_VORSPANN_ABSAETZE.map((absatz) => <p key={absatz.slice(0, 40)}>{absatz}</p>)}
      </div>

      {SDK_VVG_19_MITTEILUNG && (
        <Aufklapper titel={VVG_19_AUFKLAPPEN}>
          {[].concat(SDK_VVG_19_MITTEILUNG).map((absatz) => <p key={absatz.slice(0, 40)}>{absatz}</p>)}
        </Aufklapper>
      )}

      <div data-fehlerblock="">
        <OptionCard
          id="feld-hinweis"
          type="checkbox"
          name="hinweis-gelesen"
          checked={daten.hinweisOk}
          onChange={(event) => set({ hinweisOk: event.target.checked })}
          describedBy={fehler.hinweis ? 'fehler-hinweis' : undefined}
          invalid={Boolean(fehler.hinweis)}
        >
          {MITTEILUNG_GELESEN}
        </OptionCard>
        <FehlerText id="fehler-hinweis">{fehler.hinweis}</FehlerText>
      </div>
    </div>
  );
}
