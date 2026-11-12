import React, { useState } from 'react';
import { ladeUnterlagenDatei } from '@/lib/antragApi';
import { CheckCircle2, Download } from 'lucide-react';
import {
  Button, Callout, FehlerText, bodyText, buttonClass, cx, schuetze,
} from '@/components/antrag/ui';
import { TeilKopf, telefonLink } from './teile';
import { UNTERLAGEN_HINWEIS, unterlagenUnvollstaendig } from './unterlagenPflicht';

// „Ihre Vertragsunterlagen“ wie in der SDK-Strecke: Jedes Dokument muss
// heruntergeladen sein, sonst geht es nicht weiter. Die PDFs kommen über den
// Antragsdienst (keine öffentliche Adresse). Der Zeitpunkt jedes Downloads
// geht mit dem Antrag mit (unterlagenGeoeffnet).

function speichere(blob, unterlage) {
  const adresse = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = adresse;
  link.download = unterlage.dateiname || `${String(unterlage.name).replace(/^[^:]+:\s*/, '').replace(/[^A-Za-z0-9._-]+/g, '_')}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(adresse), 4000);
}

export default function SchrittUnterlagenDownload({
  definition, daten, set, fehler, ueberschriftRef, unterlagen,
}) {
  const regel = definition.unterlagenDownload;
  const schluessel = (unterlage) => `dienst:${unterlage.id ?? unterlage.name}`;
  const merke = (liste) => set((alt) => {
    const neu = { ...alt.unterlagenGeoeffnet };
    liste.forEach((unterlage) => { if (!neu[schluessel(unterlage)]) neu[schluessel(unterlage)] = new Date().toISOString(); });
    return { unterlagenGeoeffnet: neu };
  });
  const [ladeFehler, setLadeFehler] = useState(false);
  // Das PDF kommt vom Antragsdienst; als heruntergeladen gilt es erst, wenn es da ist.
  const lade = async (liste) => {
    setLadeFehler(false);
    const geschafft = [];
    for (const unterlage of liste) {
      try {
        const blob = await ladeUnterlagenDatei({ produkt: regel.produkt, tarifCode: daten.tarif, id: unterlage.id });
        speichere(blob, unterlage);
        geschafft.push(unterlage);
      } catch { setLadeFehler(true); }
    }
    if (geschafft.length) merke(geschafft);
  };

  return (
    <div className="space-y-4" data-unterlagen-download="">
      <TeilKopf titel="Ihre Vertragsunterlagen" ueberschriftRef={ueberschriftRef} />
      <p className={bodyText}>{schuetze(regel.hinweis)}</p>
      {(unterlagen.fehler || (unterlagen.liste && unterlagenUnvollstaendig(unterlagen.erwartet, unterlagen.liste))) && (
        <Callout tone="hinweis" data-unterlagen-hinweis="">
          <p>{UNTERLAGEN_HINWEIS}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={unterlagen.nochmal}>Noch einmal versuchen</Button>
            <a href={telefonLink(definition.sparte)} data-zaehler-ignorieren="" className={buttonClass('secondary')}>Lieber zusammen am Telefon</a>
          </div>
        </Callout>
      )}
      {ladeFehler && <p className="text-base font-semibold leading-6 text-rose-700" role="alert">Ein Dokument ließ sich gerade nicht laden. Tippe bitte noch einmal darauf.</p>}
      {!unterlagen.fehler && !unterlagen.liste && <p className={bodyText} aria-live="polite">Einen Moment, wir laden deine Unterlagen …</p>}
      {unterlagen.liste && (
        <>
          <ul className="space-y-2">
            {unterlagen.liste.map((unterlage) => {
              const geladen = Boolean(daten.unterlagenGeoeffnet?.[schluessel(unterlage)]);
              const key = `download-${unterlage.id ?? unterlage.name}`;
              return (
                <li key={key} data-fehlerblock="" className={cx('rounded-[1.2rem] border-2 bg-white p-3', fehler[key] ? 'border-rose-600' : 'border-slate-300')}>
                  <p className="break-words text-base font-semibold leading-6 text-home-midnight">{unterlage.name}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <button
                      id={`feld-${key}`}
                      type="button"
                      onClick={() => lade([unterlage])}
                      data-download=""
                      aria-describedby={fehler[key] ? `fehler-${key}` : undefined}
                      className={buttonClass(geladen ? 'secondary' : 'primary', '!min-h-11 !px-4')}
                    >
                      <Download className="h-5 w-5" aria-hidden="true" />
                      Dokument herunterladen
                    </button>
                    {geladen && <span className="inline-flex items-center gap-1 text-base font-semibold text-emerald-800"><CheckCircle2 className="h-5 w-5" aria-hidden="true" />heruntergeladen</span>}
                  </div>
                  <FehlerText id={`fehler-${key}`}>{fehler[key]}</FehlerText>
                </li>
              );
            })}
          </ul>
          <Button variant="secondary" onClick={() => lade(unterlagen.liste)} data-alle-downloads="">
            <Download className="h-5 w-5" aria-hidden="true" />
            Alle Dokumente herunterladen
          </Button>
        </>
      )}
    </div>
  );
}
