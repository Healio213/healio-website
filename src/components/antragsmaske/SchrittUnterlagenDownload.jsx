import React, { useState } from 'react';
import { ladeUnterlagenDatei } from '@/lib/antragApi';
import {
  CheckCircle2, Download, FileText, Mail,
} from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import {
  Button, Callout, FehlerText, TRENNUNG, bodyText, buttonClass, cx, schuetze,
} from '@/components/antrag/ui';
import { antragTelefonAktiv } from '@/config/contactChannels';
import { TERMIN_LINK, TeilKopf, telefonLink } from './teile';
import { UNTERLAGEN_HINWEIS, UNTERLAGEN_HINWEIS_TERMIN, unterlagenUnvollstaendig } from './unterlagenPflicht';

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

  const alleGeladen = Boolean(unterlagen.liste?.length) && unterlagen.liste.every((unterlage) => daten.unterlagenGeoeffnet?.[schluessel(unterlage)]);
  return (
    <div className="space-y-5" data-unterlagen-download="">
      <div className="flex items-start gap-4">
        <FriendlyIcon kind="document" size="md" tone="mint" className="hidden sm:inline-grid" />
        <div className="min-w-0">
          <TeilKopf titel="Ihre Vertragsunterlagen" ueberschriftRef={ueberschriftRef} />
          <p className={cx(bodyText, 'mt-1')}>{schuetze(regel.hinweis)}</p>
        </div>
      </div>
      <p className="flex gap-3 rounded-[1rem] bg-home-ice p-3 text-base leading-6 text-home-midnight">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
        <span>Alle Vertragsunterlagen und Produktinformationen bekommst du nach dem Antrag zusätzlich per E-Mail über einen geschützten Link.</span>
      </p>
      {(unterlagen.fehler || (unterlagen.liste && unterlagenUnvollstaendig(unterlagen.erwartet, unterlagen.liste))) && (
        <Callout tone="hinweis" data-unterlagen-hinweis="">
          <p>{antragTelefonAktiv(definition.sparte) ? UNTERLAGEN_HINWEIS : UNTERLAGEN_HINWEIS_TERMIN}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={unterlagen.nochmal}>Noch einmal versuchen</Button>
            {antragTelefonAktiv(definition.sparte)
              ? <a href={telefonLink(definition.sparte)} data-zaehler-ignorieren="" className={buttonClass('secondary')}>Lieber zusammen am Telefon</a>
              : <a href={TERMIN_LINK} data-zaehler-ignorieren="" className={buttonClass('secondary')}>Termin vereinbaren</a>}
          </div>
        </Callout>
      )}
      {ladeFehler && <p className="text-base font-semibold leading-6 text-rose-700" role="alert">Ein Dokument ließ sich gerade nicht laden. Tippe bitte noch einmal darauf.</p>}
      {!unterlagen.fehler && !unterlagen.liste && <p className={bodyText} aria-live="polite">Einen Moment, wir laden deine Unterlagen …</p>}
      {unterlagen.liste && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base font-semibold text-home-midnight" aria-live="polite">
              {unterlagen.liste.filter((unterlage) => daten.unterlagenGeoeffnet?.[schluessel(unterlage)]).length} von {unterlagen.liste.length} heruntergeladen
            </p>
            <Button variant={alleGeladen ? 'secondary' : 'primary'} onClick={() => lade(unterlagen.liste)} data-alle-downloads="">
              <Download className="h-5 w-5" aria-hidden="true" />
              Alle herunterladen
            </Button>
          </div>
          <ul className="space-y-2">
            {unterlagen.liste.map((unterlage) => {
              const geladen = Boolean(daten.unterlagenGeoeffnet?.[schluessel(unterlage)]);
              const key = `download-${unterlage.id ?? unterlage.name}`;
              return (
                <li key={key} data-fehlerblock="" className={cx('flex flex-wrap items-center gap-3 rounded-[1.2rem] bg-white p-3 ring-1 sm:flex-nowrap sm:p-4', fehler[key] ? 'ring-2 ring-rose-600' : geladen ? 'ring-emerald-600/40' : 'ring-home-midnight/15')}>
                  <span aria-hidden="true" className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', geladen ? 'bg-home-mint text-home-midnight' : 'bg-home-ice text-emerald-800')}>
                    {geladen ? <CheckCircle2 className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cx('block break-words text-base font-semibold leading-6 text-home-midnight', TRENNUNG)}>{unterlage.name}</span>
                    <span className={cx('block text-base leading-6', geladen ? 'font-semibold text-emerald-800' : 'text-home-slate')}>{geladen ? 'heruntergeladen' : 'PDF, noch offen'}</span>
                  </span>
                  <button
                    id={`feld-${key}`}
                    type="button"
                    onClick={() => lade([unterlage])}
                    data-download=""
                    aria-describedby={fehler[key] ? `fehler-${key}` : undefined}
                    className={buttonClass(geladen ? 'secondary' : 'primary', '!min-h-11 w-full !px-4 sm:w-auto')}
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    {geladen ? 'Nochmal laden' : 'Herunterladen'}
                    <span className="sr-only">: {unterlage.name}</span>
                  </button>
                  <FehlerText id={`fehler-${key}`}>{fehler[key]}</FehlerText>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
