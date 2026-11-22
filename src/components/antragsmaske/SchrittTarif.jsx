import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  formatiereGeburtsdatum, geburtsdatumEingabeBereinigt, geburtsdatumFehler,
} from '@/data/sdkAmbulantAntrag';
import { euro } from '@/lib/antragsmaske/regeln';
import {
  Aufklapper, Callout, FOKUS, FehlerText, Field, Gruppe, LINK, NeuerTab, OptionCard, TRENNUNG, buttonClass, cx, eingabeKlasse, fieldAria, schuetze,
} from '@/components/antrag/ui';
import { antragTelefonAktiv } from '@/config/contactChannels';
import { TERMIN_LINK, telefonLink } from './teile';
import {
  ALLE_STUFEN_HINWEIS, NICHT, anzeigeZeilen, feldHinweis, feldLabel,
} from './anzeige';

// Schritt 1 „Tarif und Beitrag“: erst Geburtsdatum (und PLZ), dann die
// Stufen als gleich große Vergleichskarten mit echtem Beitrag, Zusatzbaustein
// als eigene Karte, dann der Beginn. Regeln, Felder und Fehler unverändert.

function geburtsdatumBeimTippen(feld) {
  const amEnde = feld.selectionStart === null || feld.selectionStart === feld.value.length;
  return amEnde ? formatiereGeburtsdatum(feld.value) : feld.value.replace(/[^0-9./-]/g, '');
}

export const brauchtPlz = (definition) => Boolean(definition.beitrag?.regionen || definition.beitrag?.plz);

// Paket C (C8): Stufe, die das Original für Geburtsdatum und Beginn nicht anbietet (angeboten[id] === false).
export const STUFE_NICHT_ANGEBOTEN = 'Diese Stufe können wir dir online nicht anbieten. Bitte wähle eine andere Stufe.';

export function fehlerTarif(definition, daten, {
  heute, beginn, grenze, dienst, angeboten = null,
}) {
  const fehler = [];
  const datumFehler = geburtsdatumFehler(daten.geburtsdatum, heute);
  if (datumFehler) fehler.push({ key: 'geburtsdatum', text: datumFehler });
  else if (grenze) fehler.push({ key: 'geburtsdatum', text: grenze.text || 'Für dieses Alter nehmen wir den Antrag gemeinsam auf.' });
  if (brauchtPlz(definition) && !/^\d{5}$/.test(String(daten.plz || '').trim())) fehler.push({ key: 'plzTarif', text: 'Bitte gib deine fünfstellige PLZ ein.' });
  if (!definition.tarife.some((tarif) => tarif.id === daten.tarif)) fehler.push({ key: 'tarif', text: 'Bitte wähle eine Stufe.' });
  else if (!grenze && angeboten?.[daten.tarif] === false) fehler.push({ key: 'tarif', text: STUFE_NICHT_ANGEBOTEN });
  if (definition.zahlweiseImTarif && !definition.zahlung.zahlweisen.some((eintrag) => eintrag.id === daten.zahlweise)) fehler.push({ key: 'zahlweise', text: 'Bitte wähle, wie du zahlen möchtest.' });
  if (!beginn) fehler.push({ key: 'beginn', text: 'Bitte wähle, ab wann dein Schutz beginnen soll.' });
  // Beitrag vom Antragsdienst: ohne Antwort kein Weiter (kein geratener Preis).
  if (definition.beitrag?.art === 'dienst' && fehler.length === 0 && !dienst?.antwort) fehler.push({ key: 'beitragDienst', text: '' });
  return fehler;
}

// Kernleistungen einer Stufe als Zeilen [Bezeichnung, Wert]: aus den Zeilen
// der Definition oder, wo es nur den Leistungstext des Versicherers gibt, aus
// dessen ersten Punkten (Wortlaut unverändert).
export function kernZeilen(tarif, versicherer) {
  const anzeige = anzeigeZeilen(versicherer, tarif.id);
  if (anzeige) return { kopf: null, zeilen: anzeige };
  if (tarif.zeilen?.length) return { kopf: null, zeilen: tarif.zeilen };
  if (!tarif.details) return { kopf: null, zeilen: [] };
  const zeilen = String(tarif.details).split('\n').map((zeile) => zeile.trim()).filter(Boolean);
  const punkte = zeilen.filter((zeile) => zeile.startsWith('- ')).map((zeile) => zeile.slice(2));
  if (punkte.length) {
    const kopf = zeilen.find((zeile) => zeile.endsWith(':'))?.replace(/:$/, '') || null;
    return {
      kopf,
      zeilen: punkte.map((punkt) => {
        const teil = /^(.+?):\s(.+)$/.exec(punkt);
        return teil ? [teil[1], teil[2]] : [punkt, ''];
      }),
    };
  }
  const start = zeilen.findIndex((zeile) => /^Tarif /.test(zeile));
  return { kopf: null, zeilen: zeilen.slice(start >= 0 ? start + 1 : 1).filter((zeile) => !/^AVB|Teil I/.test(zeile)).map((zeile) => [zeile, '']) };
}

export const PREIS_NICHT_BESTAETIGT = Object.freeze({
  titel: 'Deinen Beitrag können wir gerade nicht bestätigen.',
  // Neutral (Nachbesserung 20.11.2026): gilt auch, wenn der Rechner antwortet, der Betrag aber zu keiner Region passt.
  text: 'Der Abgleich mit der Bayerischen klappt im Moment nicht. Ohne bestätigten Beitrag nehmen wir keinen Antrag an. Versuch es später noch einmal oder vereinbare einen Termin mit uns.',
});

// Zustand der Beitragsabfrage beim Antragsdienst (nur bei beitrag.art 'dienst').
// Bei Erfolg eine Aufschlüsselung: Stufe + Zusatzbaustein = Gesamt (keine
// Wiederholung der Karte „Dein Schutz“).
function DienstBeitrag({
  dienst, sparte, zahlweise, tarif, preisStufe, bausteine,
}) {
  if (!dienst || dienst.leer) return null;
  // Ebene 1, B3: Preisregion der Bayerischen nicht prüfbar. Ohne bestätigten
  // Beitrag kein Antrag, kein Rückfallpreis.
  if (dienst.fehler === 'antrag_preis_nicht_bestaetigt') {
    return (
      <Callout tone="hinweis" title={PREIS_NICHT_BESTAETIGT.titel} data-beitrag-nicht-bestaetigt="">
        <p>{PREIS_NICHT_BESTAETIGT.text}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={dienst.nochmal} className={buttonClass('secondary')}>Später noch einmal versuchen</button>
          <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('secondary')}>
            Termin vereinbaren<NeuerTab />
          </a>
        </div>
      </Callout>
    );
  }
  if (dienst.fehler) {
    return (
      <Callout tone="hinweis" title="Dein Beitrag lädt gerade nicht." data-beitrag-fehler="">
        {/* Telefonweg nur, wenn er für die Sparte an ist (Nachbesserung 20.11.2026), sonst der Termin. */}
        <p>{antragTelefonAktiv(sparte) ? 'Versuch es gleich noch einmal oder mach den Antrag zusammen mit uns am Telefon.' : 'Versuch es gleich noch einmal oder vereinbare einen Termin mit uns.'}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={dienst.nochmal} className={buttonClass('secondary')}>Noch einmal versuchen</button>
          {antragTelefonAktiv(sparte)
            ? <a href={telefonLink(sparte)} data-zaehler-ignorieren="" className={buttonClass('secondary')}>Zusammen am Telefon</a>
            : (
              <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('secondary')}>
                Termin vereinbaren<NeuerTab />
              </a>
            )}
        </div>
      </Callout>
    );
  }
  if (!dienst.antwort) return <p className="text-base leading-7 text-home-slate" aria-live="polite" data-beitrag-laedt="">Einen Moment, wir rechnen deinen Beitrag aus …</p>;
  const gesamt = dienst.antwort.beitrag;
  // Baustein wie die Strecke einzeln gerundet (Dienst: bausteinBeitrag), sonst Differenz.
  const aufpreis = bausteine.length && Number.isFinite(dienst.antwort.bausteinBeitrag) && dienst.antwort.bausteinBeitrag > 0
    ? dienst.antwort.bausteinBeitrag
    : (Number.isFinite(preisStufe) && bausteine.length ? Math.round((gesamt - preisStufe) * 100) / 100 : null);
  const einheit = zahlweise === 'jaehrlich' ? 'im Jahr' : 'im Monat';
  return (
    <div className="rounded-[1.2rem] bg-white px-5 py-3 ring-1 ring-home-midnight/10" aria-live="polite" data-gesamtbeitrag="">
      <dl className="divide-y divide-home-midnight/10 text-base">
        {Number.isFinite(preisStufe) && (
          <div className="flex justify-between gap-3 py-2"><dt className="text-home-slate">Stufe {tarif?.name}</dt><dd className="whitespace-nowrap font-semibold">{euro(preisStufe)}</dd></div>
        )}
        {bausteine.map((baustein) => (
          <div key={baustein.id} className="flex justify-between gap-3 py-2"><dt className="text-home-slate">+ {baustein.name}</dt><dd className="whitespace-nowrap font-semibold">{Number.isFinite(aufpreis) ? euro(aufpreis) : baustein.preisText}</dd></div>
        ))}
        <div className="flex justify-between gap-3 py-2"><dt className="font-bold text-home-midnight">Gesamt {einheit}</dt><dd className="whitespace-nowrap font-display font-extrabold text-home-midnight">{euro(gesamt)}</dd></div>
      </dl>
    </div>
  );
}

const ZEILEN_SICHTBAR = 5;
const ZEILEN_HANDY = 3;

// Nachbesserung 22.11.2026 (M4): Zuschlag für fehlende Zähne aus der Zahn-Weiche, damit der Betrag der Weiche hier nicht verschwindet.
const zuschlagZaehneText = (anzahl, betrag) => `Mit Zuschlag für ${anzahl === '1' ? '1 fehlenden Zahn' : `${anzahl} fehlende Zähne`}: ${euro(betrag)}`;

function Stufenkarte({
  tarif, stelle, gewaehlt, betrag, proJahr, empfohlen, platzhalter, fehler, onWaehlen, zeigeZeilen, versicherer, platzHalten, mitZuschlag = null, zaehne = null,
}) {
  const { kopf, zeilen } = kernZeilen(tarif, versicherer);
  // Zeilen nur, wenn alle Stufen welche haben (gleich große Karten); sonst unter „Alle Leistungen“.
  const sichtbar = zeigeZeilen ? zeilen.slice(0, ZEILEN_SICHTBAR) : [];
  const mehr = zeilen.length > sichtbar.length || Boolean(tarif.details);
  // Handy: nur drei Kernzeilen in der Karte, der Rest unter „Alle Leistungen“.
  const mehrHandy = !mehr && sichtbar.length > ZEILEN_HANDY;
  return (
    <div className="flex h-full min-w-0 flex-col" data-stufe={tarif.id}>
      <label className="relative block min-w-0 flex-1 cursor-pointer">
        <input
          id={stelle === 0 ? 'feld-tarif' : undefined}
          type="radio"
          name="tarif"
          value={tarif.id}
          checked={gewaehlt}
          onChange={onWaehlen}
          aria-describedby={fehler ? 'fehler-tarif' : undefined}
          aria-invalid={fehler || undefined}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none rounded-[1.4rem] opacity-0"
        />
        {empfohlen && <span className="absolute -top-3.5 left-4 z-0 rounded-full bg-home-midnight px-3 py-0.5 text-base font-bold text-home-mint-active">Empfehlung für dich</span>}
        <span
          className={cx(
            'flex h-full flex-col rounded-[1.4rem] border-2 bg-white p-4 transition peer-focus-visible:ring-[3px] peer-focus-visible:ring-home-midnight peer-focus-visible:ring-offset-2 sm:p-5',
            gewaehlt ? 'border-emerald-600 shadow-[0_16px_32px_-20px_rgba(4,120,87,0.55)]' : 'border-home-midnight/15 [@media(hover:hover)]:peer-hover:border-home-midnight/40',
            fehler && !gewaehlt && 'border-rose-600',
          )}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className={cx('block font-display text-lg font-extrabold leading-snug text-home-midnight', TRENNUNG)}>{tarif.name}</span>
            </span>
            <span aria-hidden="true" className={cx('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition', gewaehlt ? 'border-emerald-700 bg-home-mint' : 'border-slate-400 bg-white')}>
              {gewaehlt && <Check className="h-4 w-4 text-home-midnight" strokeWidth={3} />}
            </span>
          </span>
          <span className="mt-3 block min-h-[3.25rem]" data-stufe-beitrag={tarif.id}>
            {Number.isFinite(betrag)
              ? (
                <>
                  <span className="block whitespace-nowrap font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] text-home-midnight">{euro(betrag)}</span>
                  <span className="mt-1 block text-base text-home-slate">{proJahr ? 'im Jahr' : 'im Monat'}</span>
                  {Number.isFinite(mitZuschlag) && !proJahr && (
                    <span className={cx('mt-1 block text-base font-semibold leading-6 text-home-midnight', TRENNUNG)} data-stufe-mit-zuschlag={tarif.id}>{zuschlagZaehneText(zaehne, mitZuschlag)}</span>
                  )}
                </>
              )
              : <span className="block text-base leading-6 text-home-slate">{platzhalter}</span>}
          </span>
          {tarif.zusatz && <span className={cx('mt-3 block text-base font-semibold leading-6 text-emerald-900', TRENNUNG)}>{tarif.zusatz}</span>}
          {kopf && sichtbar.length > 0 && <span className="mt-3 block text-base font-bold text-home-midnight">{kopf}</span>}
          {sichtbar.length > 0 && (
            <span className={cx('block divide-y divide-home-midnight/10 border-t border-home-midnight/10', kopf ? 'mt-1' : 'mt-3')}>
              {sichtbar.map(([label, wert], stelle) => (
                <span key={label} className={cx('gap-x-3 py-2 text-base leading-6', wert.length > 12 ? 'flex-col' : 'items-start justify-between', stelle >= ZEILEN_HANDY ? 'hidden sm:flex' : 'flex')}>
                  <span className="flex min-w-0 gap-2 text-home-slate">
                    {!wert && <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" strokeWidth={3} aria-hidden="true" />}
                    <span className="min-w-0">{label}</span>
                  </span>
                  {wert && <span className={cx(wert === NICHT ? 'font-normal text-slate-500' : 'font-semibold text-home-midnight', wert.length > 12 && wert !== NICHT ? '' : 'shrink-0 whitespace-nowrap text-right')}>{wert}</span>}
                </span>
              ))}
            </span>
          )}
        </span>
      </label>
      {!mehr && platzHalten && <span className={cx('mt-1 min-h-11', mehrHandy ? 'hidden sm:block' : 'block')} aria-hidden="true" />}
      {(mehr || mehrHandy) && (
        <details className={cx('group mt-1 px-1', mehrHandy && 'sm:hidden')}>
          <summary className={cx(FOKUS, 'inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg text-base font-semibold text-emerald-800 underline underline-offset-4 [&::-webkit-details-marker]:hidden')}>
            Alle Leistungen<span className="sr-only"> von {tarif.name}</span>
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
          </summary>
          <div className={cx('mt-1 max-h-72 overflow-y-auto rounded-[1rem] bg-home-ice p-3 text-base leading-6 text-home-midnight', TRENNUNG)}>
            {tarif.details
              ? <p className="whitespace-pre-line">{tarif.details}</p>
              : (
                <ul className="space-y-1">
                  {zeilen.map(([label, wert]) => <li key={label}><span className="text-home-slate">{label}</span>{wert ? <span className="font-semibold">{`: ${wert}`}</span> : null}</li>)}
                </ul>
              )}
          </div>
        </details>
      )}
    </div>
  );
}

export default function SchrittTarif({
  definition, daten, set, fehler, ueberschriftRef, heute, beginnWahl, preise, grenze, vorbelegtJahr, dienst, empfohlen, angeboten = null, mitZaehnen = null,
}) {
  const plzRegel = definition.beitrag?.plz;
  const proJahr = definition.zahlweiseImTarif && daten.zahlweise === 'jaehrlich';
  const [beruehrt, setBeruehrt] = useState(false);
  const datumFehler = fehler.geburtsdatum
    || (beruehrt && daten.geburtsdatum !== '' && !grenze ? geburtsdatumFehler(daten.geburtsdatum, heute) : null);
  const anderer = daten.beginnArt === 'anderer';
  // Paket C (C8, C11): nur Stufen, die das Original anbietet (solange Geburtsdatum oder Beginn fehlen, alle).
  const stufen = definition.tarife.filter((tarif) => angeboten?.[tarif.id] !== false);
  const anzahl = stufen.length;
  const fehlt = [!daten.geburtsdatum || datumFehler ? 'Geburtsdatum' : null, brauchtPlz(definition) && !/^\d{5}$/.test(String(daten.plz || '')) ? 'PLZ' : null].filter(Boolean);
  let platzhalter = fehlt.length ? `Beitrag nach ${fehlt.join(' und ')}` : 'Beitrag wird berechnet …';
  // Ebene 1, B3: kein „wird berechnet“, wenn der Dienst keinen Beitrag liefern kann.
  if (!fehlt.length && dienst?.fehler) platzhalter = dienst.fehler === 'antrag_preis_nicht_bestaetigt' ? 'Beitrag gerade nicht bestätigt' : 'Beitrag lädt gerade nicht';
  const empfehlung = empfohlen || null;
  // Handy: die gewählte Stufe beim Start in den sichtbaren Bereich der Wischkarten holen.
  const stufenRef = useRef(null);
  const [sichtbareStufe, setSichtbareStufe] = useState(0);
  const beimWischen = () => {
    const leiste = stufenRef.current;
    if (!leiste) return;
    const breite = leiste.firstElementChild?.getBoundingClientRect().width || 1;
    setSichtbareStufe(Math.min(anzahl - 1, Math.round(leiste.scrollLeft / (breite + 12))));
  };
  useEffect(() => {
    const leiste = stufenRef.current;
    const gewaehlt = leiste?.querySelector('input[name="tarif"]:checked')?.closest('[data-stufe]')?.parentElement;
    if (leiste && gewaehlt && leiste.scrollWidth > leiste.clientWidth) leiste.scrollLeft = Math.max(0, gewaehlt.offsetLeft - 16);
    beimWischen();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6 sm:space-y-8">
      <section aria-labelledby="tarif-angaben" className="space-y-3">
        <h2 id="tarif-angaben" ref={ueberschriftRef} tabIndex={-1} className="scroll-mt-4 font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
          {brauchtPlz(definition) ? 'Zwei Angaben für deinen Beitrag' : 'Eine Angabe für deinen Beitrag'}
        </h2>
        <div className={cx('grid gap-4', brauchtPlz(definition) && 'sm:grid-cols-2')}>
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
              placeholder={vorbelegtJahr ? `TT.MM.${vorbelegtJahr}` : 'TT.MM.JJJJ'}
              className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal', !brauchtPlz(definition) && 'sm:max-w-[16rem]')}
            />
          </Field>
          {brauchtPlz(definition) && (
            <Field id="feld-plzTarif" label={feldLabel(plzRegel?.label || 'Deine PLZ')} hint={feldHinweis(plzRegel?.hinweis || 'Der Beitrag hängt von deiner Region ab.')} error={fehler.plzTarif}>
              <input
                {...fieldAria('feld-plzTarif', { hint: true, error: fehler.plzTarif })}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                enterKeyHint="done"
                maxLength={5}
                value={daten.plz}
                placeholder="z. B. 20095"
                onChange={(event) => set((alt) => ({ plz: event.target.value.replace(/\D/g, ''), formular: { ...alt.formular, plz: event.target.value.replace(/\D/g, '') } }))}
                className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')}
              />
            </Field>
          )}
        </div>
        <div aria-live="polite">
          {grenze && (
            <Callout tone="hinweis" data-altersgrenze="">
              <p className="font-bold">{grenze.text}</p>
              {/* Altersgrenze: „Zusammen am Telefon“ nur, wenn der Telefonweg für die Sparte an ist
                  (Nachbesserung 20.11.2026, sonst landete Stationär in Nitas Antrag für ambulant). Sonst ist
                  der Termin der Hauptknopf. */}
              <div className="mt-2 flex flex-wrap gap-2">
                {antragTelefonAktiv(definition.sparte) && (
                  <a href={telefonLink(definition.sparte)} data-zaehler-ignorieren="" className={buttonClass('primary')}>Zusammen am Telefon</a>
                )}
                <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass(antragTelefonAktiv(definition.sparte) ? 'secondary' : 'primary')}>
                  Termin vereinbaren<NeuerTab />
                </a>
              </div>
            </Callout>
          )}
        </div>
        {definition.zahlweiseImTarif && (
          <Gruppe legend="Wie möchtest du zahlen?" fehlerId="fehler-zahlweise" error={fehler.zahlweise}>
            <div className="grid grid-cols-2 gap-2 sm:max-w-2xl">
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
      </section>

      <fieldset id="stufenwahl" className="min-w-0" data-fehlerblock="">
        <legend className="font-display text-xl font-extrabold leading-tight text-home-midnight">Wähle deine Stufe</legend>
        {definition.tarifHinweis && <p className="mt-1 text-base leading-6 text-home-slate" data-tarif-hinweis="">{schuetze(definition.tarifHinweisJe?.[daten.zahlweise] || definition.tarifHinweis)}</p>}
        <FehlerText id="fehler-tarif">{fehler.tarif}</FehlerText>
        {/* Handy: Wischkarten; ab Tablet nebeneinander, gleich groß. */}
        <div
          className={cx(
            'relative -mx-4 mt-2 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 pt-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:scroll-px-0 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden',
            anzahl === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2',
          )}
          data-stufen=""
          ref={stufenRef}
          onScroll={beimWischen}
        >
          {stufen.map((tarif, stelle) => (
            <div key={tarif.id} className="w-[80%] max-w-[20rem] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <Stufenkarte
                tarif={tarif}
                stelle={stelle}
                gewaehlt={daten.tarif === tarif.id}
                betrag={preise?.[tarif.id]}
                proJahr={proJahr}
                empfohlen={empfehlung === tarif.id}
                platzhalter={platzhalter}
                fehler={Boolean(fehler.tarif)}
                onWaehlen={() => set({ tarif: tarif.id })}
                zeigeZeilen={stufen.every((eintrag) => kernZeilen(eintrag, definition.versicherer.id).zeilen.length > 0)}
                versicherer={definition.versicherer.id}
                platzHalten={stufen.some((eintrag) => eintrag.details || kernZeilen(eintrag, definition.versicherer.id).zeilen.length > ZEILEN_SICHTBAR)}
                mitZuschlag={mitZaehnen?.preise?.[tarif.id] ?? null}
                zaehne={mitZaehnen?.anzahl ?? null}
              />
            </div>
          ))}
        </div>
        {anzahl > 1 && (
          <div className="mt-2 flex items-center justify-center gap-2 sm:hidden" aria-hidden="true" data-stufen-punkte="">
            {stufen.map((eintrag, stelle) => (
              <span key={eintrag.id} className={cx('h-2 rounded-full transition-all duration-200', stelle === sichtbareStufe ? 'w-6 bg-emerald-600' : 'w-2 bg-home-midnight/20')} />
            ))}
          </div>
        )}
        {ALLE_STUFEN_HINWEIS[definition.versicherer.id] && <p className="mt-2 flex items-center gap-2 text-base text-home-midnight"><Check className="h-4 w-4 text-emerald-700" strokeWidth={3} aria-hidden="true" />{ALLE_STUFEN_HINWEIS[definition.versicherer.id]}</p>}

        {(definition.bausteine || []).map((baustein) => {
          const an = daten.bausteine.includes(baustein.id);
          return (
            <div key={baustein.id} className="mt-5" data-baustein={baustein.id}>
              <label className="relative block cursor-pointer">
                <input
                  id={`feld-baustein-${baustein.id}`}
                  type="checkbox"
                  name={`baustein-${baustein.id}`}
                  checked={an}
                  onChange={(event) => set((alt) => ({ bausteine: event.target.checked ? [...alt.bausteine.filter((id) => id !== baustein.id), baustein.id] : alt.bausteine.filter((id) => id !== baustein.id) }))}
                  className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none rounded-[1.4rem] opacity-0"
                />
                <span className={cx('flex gap-4 rounded-[1.4rem] border-2 border-dashed p-4 transition peer-focus-visible:ring-[3px] peer-focus-visible:ring-home-midnight peer-focus-visible:ring-offset-2 sm:p-5', an ? 'border-solid border-emerald-600 bg-emerald-50/60' : 'border-home-midnight/25 bg-white')}>
                  <span aria-hidden="true" className={cx('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition', an ? 'border-emerald-700 bg-home-mint' : 'border-slate-500 bg-white')}>
                    {an && <Check className="h-4 w-4 text-home-midnight" strokeWidth={3} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="font-display text-lg font-extrabold text-home-midnight">Dazu: {baustein.name}</span>
                      <span className="whitespace-nowrap font-display text-lg font-extrabold text-home-midnight" data-baustein-preis="">{baustein.preisTextJe?.[daten.zahlweise] || baustein.preisText}</span>
                    </span>
                    {baustein.kennzeichen && <span className="mt-1 inline-flex rounded-full bg-home-mint/20 px-2.5 py-0.5 text-base font-bold text-emerald-900">{baustein.kennzeichen}</span>}
                    <span className="mt-2 block text-base leading-6 text-home-midnight">Schutz auch für Behandlungen, die schon angeraten oder begonnen sind:</span>
                    <span className="mt-1 block space-y-0.5">
                      {baustein.leistungen.map((leistung) => <span key={leistung} className="block text-base leading-6 text-home-slate">{leistung}</span>)}
                    </span>
                  </span>
                </span>
              </label>
              {baustein.erklaerungen?.length > 0 && (
                <Aufklapper schlicht titel={`Was heißt das bei ${baustein.name}?`} className="mt-1">
                  {baustein.erklaerungen.map((text) => <p key={text.slice(0, 30)}>{text}</p>)}
                </Aufklapper>
              )}
            </div>
          );
        })}
      </fieldset>

      {definition.beitrag?.art === 'dienst' && (
        <DienstBeitrag
          dienst={dienst}
          sparte={definition.sparte}
          zahlweise={daten.zahlweise}
          tarif={definition.tarife.find((eintrag) => eintrag.id === daten.tarif)}
          preisStufe={preise?.[daten.tarif]}
          bausteine={(definition.bausteine || []).filter((baustein) => daten.bausteine.includes(baustein.id))}
        />
      )}

      <Gruppe legend="Ab wann soll dein Schutz beginnen?" fehlerId="fehler-beginn" error={fehler.beginn}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
            <div className="sm:col-span-2 sm:max-w-sm">
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

      {definition.tarifFussnote && <p className="rounded-[1rem] bg-home-ice px-4 py-3 text-base leading-7 text-home-slate">{schuetze(definition.tarifFussnote)}</p>}
      <p className="hidden text-base leading-7 text-home-slate sm:block">
        Unsicher bei der Stufe?{' '}
        <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>Lass dich beraten<NeuerTab /></a>
      </p>
    </div>
  );
}
