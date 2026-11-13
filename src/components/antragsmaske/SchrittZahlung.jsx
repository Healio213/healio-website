import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { ibanHinweis } from '@/lib/antragsmaske/regeln';
import { ibanInGruppen } from '@/lib/iban';
import {
  Callout, Field, Gruppe, NeuerTab, OptionCard, buttonClass, cx, eingabeKlasse, fieldAria,
} from '@/components/antrag/ui';
import {
  Haken, Karte, TERMIN_LINK, TeilKopf, Volltext,
} from './teile';

// Schritt 5 „Zahlung“: Zahlweise, Kontoinhaber, IBAN (nur im Arbeitsspeicher),
// SEPA-Lastschriftmandat des Versicherers im Wortlaut.

const HAKEN_FEHLT = 'Ohne diesen Haken können wir deinen Antrag nicht stellen.';

export function fehlerZahlung(definition, daten) {
  const fehler = [];
  const z = definition.zahlung;
  if (z.zahlweisen.length > 1 && !definition.zahlweiseImTarif && !z.zahlweisen.some((eintrag) => eintrag.id === daten.zahlweise)) fehler.push({ key: 'zahlweise', text: 'Bitte wähle, wie du zahlen möchtest.' });
  if (daten.kontoinhaber !== 'selbst') {
    fehler.push({ key: 'kontoinhaber', text: daten.kontoinhaber === 'andere' ? '' : 'Bitte beantworte die Frage zum Konto.' });
  } else {
    const text = ibanHinweis(daten.iban);
    if (text) fehler.push({ key: 'iban', text });
    if (z.bankname && !String(daten.bankname || '').trim()) fehler.push({ key: 'bankname', text: z.bankname.fehlerLeer });
    if (daten.erklaerungen[z.sepa.key] !== true) fehler.push({ key: z.sepa.key, text: HAKEN_FEHLT });
  }
  return fehler;
}

export default function SchrittZahlung({
  definition, daten, set, fehler, ueberschriftRef,
}) {
  const [beruehrt, setBeruehrt] = useState(false);
  const z = definition.zahlung;
  const ibanText = fehler.iban || (beruehrt && daten.iban !== '' ? ibanHinweis(daten.iban) : null);
  return (
    <div className="space-y-5">
      <TeilKopf titel="Deine Zahlung" ueberschriftRef={ueberschriftRef} text="Deine IBAN bleibt nur hier auf der Seite, bis du den Antrag abschickst." />
      {!definition.zahlweiseImTarif && z.zahlweisen.length > 1 && (
      <Gruppe legend="Zahlweise" fehlerId="fehler-zahlweise" error={fehler.zahlweise}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {z.zahlweisen.map((zahlweise, stelle) => (
            <OptionCard
              key={zahlweise.id}
              id={stelle === 0 ? 'feld-zahlweise' : undefined}
              kompakt
              name="zahlweise"
              value={zahlweise.id}
              checked={daten.zahlweise === zahlweise.id}
              onChange={() => set({ zahlweise: zahlweise.id })}
              describedBy={fehler.zahlweise ? 'fehler-zahlweise' : undefined}
              invalid={Boolean(fehler.zahlweise)}
            >
              {zahlweise.label}
            </OptionCard>
          ))}
        </div>
      </Gruppe>
      )}

      <Gruppe legend={z.kontoinhaberFrage} hint={z.kontoinhaberHinweis || undefined} fehlerId="fehler-kontoinhaber" error={fehler.kontoinhaber}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <OptionCard id="feld-kontoinhaber" kompakt name="kontoinhaber" value="selbst" checked={daten.kontoinhaber === 'selbst'} onChange={() => set({ kontoinhaber: 'selbst' })} invalid={Boolean(fehler.kontoinhaber)} describedBy={fehler.kontoinhaber ? 'fehler-kontoinhaber' : undefined}>
            Ja, das ist mein Konto
          </OptionCard>
          <OptionCard kompakt name="kontoinhaber" value="andere" checked={daten.kontoinhaber === 'andere'} onChange={() => set({ kontoinhaber: 'andere' })} invalid={Boolean(fehler.kontoinhaber)} describedBy={fehler.kontoinhaber ? 'fehler-kontoinhaber' : undefined}>
            Nein, es gehört jemand anderem
          </OptionCard>
        </div>
      </Gruppe>

      {daten.kontoinhaber === 'andere' && (
        <Callout tone="info" title={z.kontoAndere.titel} data-terminweg="">
          <p>{z.kontoAndere.text}</p>
          <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={cx(buttonClass('primary'), 'mt-3')}>
            Termin vereinbaren<NeuerTab />
          </a>
        </Callout>
      )}

      {daten.kontoinhaber === 'selbst' && (
        <>
          <Field id="feld-iban" label="Deine IBAN" hint="Eine deutsche IBAN, sie beginnt mit DE." error={ibanText}>
            <div className="relative max-w-md">
              <input
                {...fieldAria('feld-iban', { hint: true, error: ibanText })}
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                maxLength={34}
                placeholder="DE00 0000 0000 0000 0000 00"
                value={daten.iban}
                onChange={(event) => set({ iban: event.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '') })}
                onBlur={() => { setBeruehrt(true); set({ iban: ibanInGruppen(daten.iban) }); }}
                className={cx(eingabeKlasse, 'pr-11 font-mono tracking-wide')}
              />
              <Lock className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-home-slate" aria-hidden="true" />
            </div>
          </Field>

          {z.bankname && (
            <Field id="feld-bankname" label={z.bankname.label} error={fehler.bankname}>
              <input
                {...fieldAria('feld-bankname', { error: fehler.bankname })}
                type="text"
                autoComplete="off"
                maxLength={80}
                value={daten.bankname || ''}
                onChange={(event) => set({ bankname: event.target.value })}
                className={cx(eingabeKlasse, 'max-w-md')}
              />
            </Field>
          )}

          <Karte titel={z.sepa.karte}>
            {z.sepa.angaben.length > 0 && (
              <ul className="space-y-1 text-base leading-7 text-home-midnight">
                {z.sepa.angaben.map(([label, wert]) => <li key={label}><span className="text-home-slate">{label}: </span>{wert}</li>)}
              </ul>
            )}
            {z.sepa.absaetze.length > 0 && <Volltext titel={z.sepa.karte} bloecke={[['h', z.sepa.titel], ...z.sepa.absaetze.map((absatz) => ['p', absatz])]} />}
            <Haken
              feldKey={z.sepa.key}
              checked={daten.erklaerungen[z.sepa.key]}
              onChange={(wert) => set((alt) => ({ erklaerungen: { ...alt.erklaerungen, [z.sepa.key]: wert } }))}
              fehler={fehler[z.sepa.key]}
            >
              {z.sepa.haken}
            </Haken>
          </Karte>
        </>
      )}
    </div>
  );
}
