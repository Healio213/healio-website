import React from 'react';
import { CheckCircle2, Link2Off, WifiOff } from 'lucide-react';
import {
  ZAHLWEISEN, findeTarif, formatEuro, tarifName,
} from '@/data/sdkAmbulantAntrag';
import { abschlussPunkte } from '@/data/sdkAmbulantAntragTexte';
import { TERMIN_LINK } from './StepBestaetigen';
import {
  Button, LINK, bodyText, buttonClass, cx, schuetze,
} from './ui';

// Zustände der Prüfseite außerhalb des Ablaufs: lädt, Link ungültig,
// Netzfehler und bestätigt (gerade eben oder schon früher).

function Kopf({ icon: Icon, ton = 'mint', titel, titelRef }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <span className={cx('flex h-14 w-14 items-center justify-center rounded-full', ton === 'mint' ? 'bg-home-mint/20 text-emerald-800' : 'bg-slate-200 text-home-midnight')}>
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 ref={titelRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">{titel}</h1>
    </div>
  );
}

export function Laedt() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center" aria-live="polite" aria-busy="true" data-zustand="laedt">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-home-mint border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
      <p className="text-base font-semibold text-home-midnight">Dein Antrag wird geladen …</p>
    </div>
  );
}

export function LinkUngueltig({ titelRef }) {
  return (
    <div className="space-y-5" data-zustand="ungueltig">
      <Kopf icon={Link2Off} ton="grau" titel="Dieser Link gilt leider nicht mehr" titelRef={titelRef} />
      <p className={bodyText}>
        Vielleicht ist er älter als 7 Tage oder beim Kopieren unvollständig geworden. Kein Problem, wir nehmen deinen Antrag gern noch einmal mit dir auf.
      </p>
      <div className="flex flex-col items-start gap-3">
        <a href={TERMIN_LINK} data-zaehler-ignorieren="" className={buttonClass('primary', 'w-full sm:w-auto')}>Termin vereinbaren</a>
        <p className={bodyText}>
          oder{' '}
          <a href="/ambulant" data-zaehler-ignorieren="" className={LINK}>stell den Antrag online</a>
        </p>
      </div>
    </div>
  );
}

export function Netzfehler({ nochmal, titelRef }) {
  return (
    <div className="space-y-5" data-zustand="netzfehler">
      <Kopf icon={WifiOff} ton="grau" titel="Wir erreichen deinen Antrag gerade nicht" titelRef={titelRef} />
      <p className={bodyText}>Meist hakt nur kurz die Verbindung. Deine Angaben sind sicher bei uns gespeichert.</p>
      <Button onClick={nochmal} className="w-full sm:w-auto">Noch einmal versuchen</Button>
    </div>
  );
}

const datumAusIso = (iso) => {
  const treffer = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  return treffer ? `${treffer[3]}.${treffer[2]}.${treffer[1]}` : '';
};

// Zusammenfassung nach Vertrag Abschnitt 10.3 (vorname, nachname, tarifCode,
// beginnIso, zahlweise, ibanEnde, beitrag). Fehlt ein Feld, entfällt die Zeile.
function Zusammenfassung({ daten }) {
  const beitrag = [daten.beitrag?.beitrag, daten.beitrag].find((wert) => Number.isFinite(wert));
  const tarif = findeTarif(daten.tarifCode);
  const zahlweise = ZAHLWEISEN.find((eintrag) => eintrag.id === daten.zahlweise);
  const ende = String(daten.ibanEnde || '').replace(/\D/g, '').slice(-4);
  const zeilen = [
    ['Name', [daten.vorname, daten.nachname].filter(Boolean).join(' ')],
    ['Stufe', tarif ? tarifName(tarif) : ''],
    ['Beginn', datumAusIso(daten.beginnIso)],
    ['Monatsbeitrag', Number.isFinite(beitrag) ? formatEuro(beitrag) : ''],
    ['Zahlweise', zahlweise?.label || ''],
    ['IBAN', ende ? `DE …${ende}` : ''],
  ].filter(([, wert]) => wert);
  if (zeilen.length === 0) return null;
  return (
    <ul className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1" data-zusammenfassung="">
      {zeilen.map(([label, wert]) => (
        <li key={label} className="border-t border-slate-300 py-2 first:border-t-0">
          <span className="block text-base leading-6 text-home-slate">{label}</span>
          <span className="block break-words text-base font-bold leading-6 text-home-midnight">{wert}</span>
        </li>
      ))}
    </ul>
  );
}

// frisch: gerade eben bestätigt („Dein Antrag ist bei uns“), sonst schon
// früher bestätigt (Neuladen, zweiter Klick auf den Link in der Mail).
export function Bestaetigt({
  frisch, kennung, bestaetigtAm, zusammenfassung, titelRef,
}) {
  const datum = bestaetigtAm ? new Date(bestaetigtAm) : null;
  const datumText = datum && !Number.isNaN(datum.getTime())
    ? datum.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' })
    : null;
  return (
    <div className="space-y-6" data-zustand={frisch ? 'abschluss' : 'bestaetigt'}>
      <Kopf icon={CheckCircle2} titel={frisch ? 'Dein Antrag ist bei uns' : 'Du hast deinen Antrag schon bestätigt'} titelRef={titelRef} />
      <p className={bodyText}>
        {frisch ? 'Danke! Wir kümmern uns jetzt um alles Weitere.' : `Danke! Wir haben deine Bestätigung${datumText ? ` vom ${datumText}` : ''} und kümmern uns um alles Weitere.`}
        {kennung && <span className="block">Deine Antragsnummer bei {schuetze('Healio')}: <strong className="whitespace-nowrap">{kennung}</strong></span>}
      </p>

      <div>
        <h2 className="font-display text-xl font-extrabold text-home-midnight">So geht es weiter</h2>
        <ol className="mt-3 space-y-2">
          {abschlussPunkte({ versand: 'email', kontoinhaber: 'ich' }).map((text, index) => (
            <li key={text} className="flex gap-3 rounded-[1.2rem] border-2 border-slate-300 bg-white p-3">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-home-mint font-display text-base font-extrabold text-home-midnight">{index + 1}</span>
              <span className={bodyText}>{schuetze(text)}</span>
            </li>
          ))}
        </ol>
      </div>

      {zusammenfassung && (
        <div className="space-y-3">
          <h2 className="font-display text-xl font-extrabold text-home-midnight">Deine Angaben</h2>
          <Zusammenfassung daten={zusammenfassung} />
        </div>
      )}

      <p className={bodyText}>
        Fragen? Antworte einfach auf unsere E-Mail oder{' '}
        <a href={TERMIN_LINK} data-zaehler-ignorieren="" className={LINK}>vereinbare einen Termin</a>.
      </p>
    </div>
  );
}
