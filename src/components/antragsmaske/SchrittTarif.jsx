import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  formatiereGeburtsdatum, geburtsdatumEingabeBereinigt, geburtsdatumFehler,
} from '@/data/sdkAmbulantAntrag';
import { euro } from '@/lib/antragsmaske/regeln';
import {
  Aufklapper, Callout, FehlerText, Field, Gruppe, LINK, NeuerTab, OptionCard, buttonClass, cx, eingabeKlasse, fieldAria, schuetze,
} from '@/components/antrag/ui';
import { TERMIN_LINK, TeilKopf, telefonLink } from './teile';

// Schritt 1 „Tarif und Beitrag“: Geburtsdatum, Stufe mit Monatsbeitrag (noch
// ohne Zuschlag), Beginn. Mit Preisregion zusätzlich die Postleitzahl.

function geburtsdatumBeimTippen(feld) {
  const amEnde = feld.selectionStart === null || feld.selectionStart === feld.value.length;
  return amEnde ? formatiereGeburtsdatum(feld.value) : feld.value.replace(/[^0-9./-]/g, '');
}

export const brauchtPlz = (definition) => Boolean(definition.beitrag?.regionen || definition.beitrag?.plz);

export function fehlerTarif(definition, daten, {
  heute, beginn, grenze, dienst,
}) {
  const fehler = [];
  const datumFehler = geburtsdatumFehler(daten.geburtsdatum, heute);
  if (datumFehler) fehler.push({ key: 'geburtsdatum', text: datumFehler });
  else if (grenze) fehler.push({ key: 'geburtsdatum', text: grenze.text || 'Für dieses Alter nehmen wir den Antrag gemeinsam auf.' });
  if (brauchtPlz(definition) && !/^\d{5}$/.test(String(daten.plz || '').trim())) fehler.push({ key: 'plzTarif', text: 'Bitte gib deine fünfstellige PLZ ein.' });
  if (!definition.tarife.some((tarif) => tarif.id === daten.tarif)) fehler.push({ key: 'tarif', text: 'Bitte wähle eine Stufe.' });
  if (definition.zahlweiseImTarif && !definition.zahlung.zahlweisen.some((eintrag) => eintrag.id === daten.zahlweise)) fehler.push({ key: 'zahlweise', text: 'Bitte wähle, wie du zahlen möchtest.' });
  if (!beginn) fehler.push({ key: 'beginn', text: 'Bitte wähle, ab wann dein Schutz beginnen soll.' });
  // Beitrag vom Antragsdienst: ohne Antwort kein Weiter (kein geratener Preis).
  if (definition.beitrag?.art === 'dienst' && fehler.length === 0 && !dienst?.antwort) fehler.push({ key: 'beitragDienst', text: '' });
  return fehler;
}

// Zustand der Beitragsabfrage beim Antragsdienst (nur bei beitrag.art 'dienst').
function DienstBeitrag({ dienst, sparte, zahlweise }) {
  if (!dienst || dienst.leer) return null;
  if (dienst.fehler) {
    return (
      <Callout tone="hinweis" title="Dein Beitrag lädt gerade nicht." data-beitrag-fehler="">
        <p>Versuch es gleich noch einmal oder mach den Antrag zusammen mit uns am Telefon.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={dienst.nochmal} className={buttonClass('secondary')}>Noch einmal versuchen</button>
          <a href={telefonLink(sparte)} data-zaehler-ignorieren="" className={buttonClass('secondary')}>Zusammen am Telefon</a>
        </div>
      </Callout>
    );
  }
  if (!dienst.antwort) return <p className="text-base leading-7 text-home-slate" aria-live="polite" data-beitrag-laedt="">Einen Moment, wir rechnen deinen Beitrag aus …</p>;
  return (
    <div className="rounded-[1.2rem] bg-home-midnight px-4 py-3 text-white" aria-live="polite" data-gesamtbeitrag="">
      <p className="text-base font-bold text-home-mint-active">{zahlweise === 'jaehrlich' ? 'Dein Gesamtbeitrag im Jahr' : 'Dein Gesamtbeitrag im Monat'}</p>
      <p className="font-display text-3xl font-extrabold">{euro(dienst.antwort.beitrag)}</p>
    </div>
  );
}

export default function SchrittTarif({
  definition, daten, set, fehler, ueberschriftRef, heute, beginnWahl, preise, grenze, vorbelegtJahr, dienst,
}) {
  const plzRegel = definition.beitrag?.plz;
  const proJahr = definition.zahlweiseImTarif && daten.zahlweise === 'jaehrlich';
  const [beruehrt, setBeruehrt] = useState(false);
  const datumFehler = fehler.geburtsdatum
    || (beruehrt && daten.geburtsdatum !== '' && !grenze ? geburtsdatumFehler(daten.geburtsdatum, heute) : null);
  const anderer = daten.beginnArt === 'anderer';

  return (
    <div className="space-y-6">
      <TeilKopf titel="Deine Stufe und dein Beginn" ueberschriftRef={ueberschriftRef} />

      <Field id="feld-geburtsdatum" label="Dein Geburtsdatum" error={grenze ? null : datumFehler}>
        <input
          {...fieldAria('feld-geburtsdatum', { error: grenze ? null : datumFehler })}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          maxLength={12}
          value={daten.geburtsdatum}
          onChange={(event) => set({ geburtsdatum: geburtsdatumBeimTippen(event.target) })}
          onBlur={(event) => {
            setBeruehrt(true);
            const bereinigt = geburtsdatumEingabeBereinigt(event.target.value, heute);
            if (bereinigt !== daten.geburtsdatum) set({ geburtsdatum: bereinigt });
          }}
          placeholder={vorbelegtJahr ? `z. B. 05.03.${vorbelegtJahr}` : 'z. B. 05.03.1985'}
          className={`${eingabeKlasse} max-w-[13rem] font-display text-xl font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal`}
        />
        <div aria-live="polite">
          {grenze && (
            <Callout tone="hinweis" className="mt-3" data-altersgrenze="">
              <p className="font-bold">{grenze.text}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a href={telefonLink(definition.sparte)} data-zaehler-ignorieren="" className={buttonClass('primary')}>Zusammen am Telefon</a>
                <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('secondary')}>
                  Termin vereinbaren<NeuerTab />
                </a>
              </div>
            </Callout>
          )}
        </div>
      </Field>

      {brauchtPlz(definition) && (
        <Field id="feld-plzTarif" label={plzRegel?.label || 'Deine PLZ'} hint={plzRegel?.hinweis || 'Der Beitrag hängt von deiner Region ab.'} error={fehler.plzTarif}>
          <input
            {...fieldAria('feld-plzTarif', { hint: true, error: fehler.plzTarif })}
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={daten.plz}
            onChange={(event) => set((alt) => ({ plz: event.target.value.replace(/\D/g, ''), formular: { ...alt.formular, plz: event.target.value.replace(/\D/g, '') } }))}
            className={cx(eingabeKlasse, 'max-w-[9rem]')}
          />
        </Field>
      )}

      <Gruppe id="stufenwahl" legend="Deine Stufe" hint={definition.tarifHinweis} fehlerId="fehler-tarif" error={fehler.tarif}>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {definition.tarife.map((tarif, stelle) => {
            const gewaehlt = daten.tarif === tarif.id;
            const betrag = preise?.[tarif.id];
            return (
              <OptionCard
                key={tarif.id}
                id={stelle === 0 ? 'feld-tarif' : undefined}
                name="tarif"
                value={tarif.id}
                checked={gewaehlt}
                onChange={() => set({ tarif: tarif.id })}
                describedBy={fehler.tarif ? 'fehler-tarif' : undefined}
                invalid={Boolean(fehler.tarif)}
              >
                <span className="block font-display text-lg font-extrabold leading-snug">{tarif.name}</span>
                <span className="block whitespace-nowrap font-display text-lg font-extrabold leading-snug" data-stufe-beitrag={tarif.id}>
                  {Number.isFinite(betrag)
                    ? <>{euro(betrag)}<span className={proJahr ? 'font-sans text-base font-normal' : 'sr-only'}>{proJahr ? ' im Jahr' : ' im Monat'}</span></>
                    : <span className="font-sans text-base font-normal text-home-slate">{brauchtPlz(definition) ? 'Beitrag nach Geburtsdatum und PLZ' : 'Beitrag nach Geburtsdatum'}</span>}
                </span>
                {tarif.zusatz && <span className="mt-1 block">{tarif.zusatz}</span>}
                {gewaehlt && tarif.details && (
                  <span className="relative z-20 -ml-9 mt-2 block border-t border-slate-300 pt-2">
                    <details className="group">
                      <summary className="cursor-pointer list-none font-semibold text-emerald-800 underline underline-offset-4 [&::-webkit-details-marker]:hidden">Tarifdetails anzeigen</summary>
                      <span className="mt-2 block whitespace-pre-line text-home-slate">{tarif.details}</span>
                    </details>
                  </span>
                )}
                {gewaehlt && tarif.zeilen?.length > 0 && (
                  <span className="-ml-9 mt-2 block border-t border-slate-300 pt-2 text-home-slate [hyphens:manual]">
                    {tarif.zeilen.map(([label, wert]) => (
                      <span key={label} className={cx('flex gap-3', wert.length > 12 ? 'flex-col gap-0 pb-1' : 'justify-between')}>
                        <span className="min-w-0">{label}</span>
                        {wert && <span className={wert.length > 12 ? 'text-home-midnight' : 'shrink-0 whitespace-nowrap'}>{wert}</span>}
                      </span>
                    ))}
                  </span>
                )}
              </OptionCard>
            );
          })}
        </div>
        {(definition.bausteine || []).map((baustein) => (
          <div key={baustein.id} className="mt-3" data-baustein={baustein.id}>
            <OptionCard
              id={`feld-baustein-${baustein.id}`}
              type="checkbox"
              name={`baustein-${baustein.id}`}
              checked={daten.bausteine.includes(baustein.id)}
              onChange={(event) => set((alt) => ({ bausteine: event.target.checked ? [...alt.bausteine.filter((id) => id !== baustein.id), baustein.id] : alt.bausteine.filter((id) => id !== baustein.id) }))}
            >
              <span className="block font-display text-lg font-extrabold leading-snug">{baustein.name}</span>
              {baustein.kennzeichen && <span className="block font-bold text-emerald-800">{baustein.kennzeichen}</span>}
              <span className="block font-bold">{baustein.preisText}</span>
              {baustein.leistungen.map((leistung) => <span key={leistung} className="block">{leistung}</span>)}
            </OptionCard>
            {baustein.erklaerungen?.length > 0 && (
              <Aufklapper schlicht titel={`Was heißt das bei ${baustein.name}?`} className="mt-1">
                {baustein.erklaerungen.map((text) => <p key={text.slice(0, 30)}>{text}</p>)}
              </Aufklapper>
            )}
          </div>
        ))}
        <p className="mt-3 text-base leading-7 text-home-slate">
          Du möchtest dich bei der Stufe beraten lassen?{' '}
          <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>Termin vereinbaren<NeuerTab /></a>
        </p>
      </Gruppe>

      {definition.zahlweiseImTarif && (
        <Gruppe legend="Zahlungsweise" fehlerId="fehler-zahlweise" error={fehler.zahlweise}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {definition.zahlung.zahlweisen.map((zahlweise, stelle) => (
              <OptionCard
                key={zahlweise.id}
                id={stelle === 0 ? 'feld-zahlweise' : undefined}
                kompakt
                name="zahlweise"
                value={zahlweise.id}
                checked={daten.zahlweise === zahlweise.id}
                onChange={() => set({ zahlweise: zahlweise.id })}
                invalid={Boolean(fehler.zahlweise)}
              >
                {zahlweise.label}
              </OptionCard>
            ))}
          </div>
        </Gruppe>
      )}

      {definition.beitrag?.art === 'dienst' && <DienstBeitrag dienst={dienst} sparte={definition.sparte} zahlweise={daten.zahlweise} />}
      {definition.tarifFussnote && <p className="text-base leading-7 text-home-slate">{schuetze(definition.tarifFussnote)}</p>}

      <Gruppe legend="Ab wann soll dein Schutz beginnen?" fehlerId="fehler-beginn" error={fehler.beginn}>
        <div className="grid max-w-md grid-cols-1 gap-2">
          <OptionCard
            id="feld-beginn"
            kompakt
            name="beginnArt"
            value="naechstmoeglich"
            checked={daten.beginnArt === 'naechstmoeglich'}
            onChange={() => set({ beginnArt: 'naechstmoeglich' })}
          >
            Nächstmöglich: <span className="whitespace-nowrap font-bold">{beginnWahl.naechstmoeglich?.label}</span>
          </OptionCard>
          {beginnWahl.frueher && (
            <OptionCard
              kompakt
              name="beginnArt"
              value="frueher"
              checked={daten.beginnArt === 'anderer' && daten.beginnIso === beginnWahl.frueher.iso}
              onChange={() => set({ beginnArt: 'anderer', beginnIso: beginnWahl.frueher.iso })}
            >
              Rückwirkend ab <span className="whitespace-nowrap font-bold">{beginnWahl.frueher.label}</span>
            </OptionCard>
          )}
          {beginnWahl.weitere.length > 0 && (
            <OptionCard
              kompakt
              name="beginnArt"
              value="anderer"
              checked={anderer && daten.beginnIso !== beginnWahl.frueher?.iso}
              onChange={() => set({
                beginnArt: 'anderer',
                beginnIso: beginnWahl.weitere.some((option) => option.iso === daten.beginnIso) ? daten.beginnIso : beginnWahl.weitere[0].iso,
              })}
            >
              Später beginnen
            </OptionCard>
          )}
          {anderer && daten.beginnIso !== beginnWahl.frueher?.iso && (
            <div>
              <label htmlFor="feld-beginnDatum" className="sr-only">Beginn am</label>
              <div className="relative">
                <select
                  id="feld-beginnDatum"
                  value={daten.beginnIso || ''}
                  onChange={(event) => set({ beginnIso: event.target.value || null })}
                  className={cx(eingabeKlasse, 'cursor-pointer appearance-none pr-12 font-bold')}
                >
                  {beginnWahl.weitere.map((option) => <option key={option.iso} value={option.iso}>{option.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-home-midnight" aria-hidden="true" />
              </div>
              <FehlerText id="feld-beginnDatum-fehler">{null}</FehlerText>
            </div>
          )}
        </div>
      </Gruppe>
    </div>
  );
}
