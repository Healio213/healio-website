import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import {
  Button, Callout, FehlerText, bodyText, buttonClass, cx, schuetze,
} from '@/components/antrag/ui';
import { TeilKopf, telefonLink } from './teile';

// „Ihre Vertragsunterlagen“ wie in der SDK-Strecke: Jedes Dokument muss
// heruntergeladen sein, sonst geht es nicht weiter. Die PDFs kommen über den
// Antragsdienst (keine öffentliche Adresse). Der Zeitpunkt jedes Downloads
// geht mit dem Antrag mit (unterlagenGeoeffnet).

function speichere(unterlage) {
  const roh = atob(unterlage.inhalt || '');
  const bytes = new Uint8Array(roh.length);
  for (let stelle = 0; stelle < roh.length; stelle += 1) bytes[stelle] = roh.charCodeAt(stelle);
  const adresse = URL.createObjectURL(new Blob([bytes], { type: unterlage.mime || 'application/pdf' }));
  const link = document.createElement('a');
  link.href = adresse;
  link.download = unterlage.dateiname || `${unterlage.name}.pdf`;
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
  const lade = (liste) => {
    liste.forEach((unterlage) => { try { speichere(unterlage); } catch { /* Download blockiert, Kunde kann erneut tippen */ } });
    merke(liste);
  };

  return (
    <div className="space-y-4" data-unterlagen-download="">
      <TeilKopf titel="Ihre Vertragsunterlagen" ueberschriftRef={ueberschriftRef} />
      <p className={bodyText}>{schuetze(regel.hinweis)}</p>
      {unterlagen.fehler && (
        <Callout tone="hinweis" title="Die Unterlagen laden gerade nicht.">
          <p>Versuch es gleich noch einmal oder mach den Antrag zusammen mit uns am Telefon.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={unterlagen.nochmal}>Noch einmal versuchen</Button>
            <a href={telefonLink(definition.sparte)} data-zaehler-ignorieren="" className={buttonClass('secondary')}>Zusammen am Telefon</a>
          </div>
        </Callout>
      )}
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
