import React from 'react';
import { FileText } from 'lucide-react';
import { bedingungErfuellt } from '@/lib/antragsmaske/regeln';
import {
  FehlerText, Gruppe, LINK, NeuerTab, OptionCard, TRENNUNG, cx, schuetze,
} from '@/components/antrag/ui';
import {
  Haken, Karte, TERMIN_LINK, TeilKopf, UnterlageLink, Volltext, kurzText,
} from './teile';

// Schritt 6 „Erklärungen und Unterlagen“: ein Bildschirm je Teil der
// Definition. Pflichttexte im Wortlaut, lange Texte mit Kurzfassung und
// „Ganzen Text lesen“ wie auf der Prüfseite.

const HAKEN_FEHLT = 'Ohne diesen Haken können wir deinen Antrag nicht stellen.';

export function fehlerErklaerungen(teil, daten) {
  const fehler = [];
  teil.eintraege.forEach((eintrag) => {
    if (!eintrag.key || !eintrag.pflicht) return;
    const wert = daten.erklaerungen[eintrag.key];
    if (eintrag.art === 'wahl') {
      if (!eintrag.optionen.some((option) => option.id === wert)) fehler.push({ key: eintrag.key, text: eintrag.fehler });
    } else if (wert !== true) fehler.push({ key: eintrag.key, text: HAKEN_FEHLT });
  });
  return fehler;
}

function Unterlagen({ eintrag, kontext, oeffnen }) {
  return (
    <div className="space-y-2 text-base leading-7 text-home-midnight">
      {eintrag.gruppen.map((gruppe) => (
        <div key={gruppe.von}>
          <p className="pt-1 font-bold">{schuetze(gruppe.von)}</p>
          <ul className="space-y-0.5">
            {gruppe.eintraege.filter((unterlage) => bedingungErfuellt(unterlage.bedingung, kontext)).map((unterlage) => {
              if (!unterlage.dateien.length) {
                return <li key={unterlage.name} className="flex min-h-11 items-center gap-1.5 text-home-slate"><FileText className="h-5 w-5 shrink-0" aria-hidden="true" />{unterlage.name}</li>;
              }
              if (unterlage.dateien.length === 1 && unterlage.dateien[0].label === unterlage.name) {
                return <li key={unterlage.dateien[0].href}><UnterlageLink beimOeffnen={oeffnen} href={unterlage.dateien[0].href}>{unterlage.name}</UnterlageLink></li>;
              }
              return (
                <li key={unterlage.dateien[0]?.href || unterlage.name}>
                  <span className="block pt-1">{unterlage.name}</span>
                  <span className="block pl-2">
                    {unterlage.dateien.map((datei) => <span key={datei.href} className="block"><UnterlageLink beimOeffnen={oeffnen} href={datei.href}>{datei.label}</UnterlageLink></span>)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function SchrittErklaerungen({
  teil, nummer, anzahl, daten, set, fehler, ueberschriftRef, kontext,
}) {
  // Zeitpunkt jeder Bestätigung und jedes Öffnens einer Unterlage (für den Antrag).
  const setze = (key, wert) => set((alt) => ({
    erklaerungen: { ...alt.erklaerungen, [key]: wert },
    zeitpunkte: { ...alt.zeitpunkte, [key]: wert ? new Date().toISOString() : undefined },
  }));
  const oeffnen = (href) => set((alt) => ({ unterlagenGeoeffnet: { ...alt.unterlagenGeoeffnet, [href]: alt.unterlagenGeoeffnet?.[href] || new Date().toISOString() } }));
  return (
    <div className="space-y-4">
      <TeilKopf vorTitel={`Teil ${nummer} von ${anzahl}`} titel={teil.teil} ueberschriftRef={ueberschriftRef} />
      {teil.eintraege.map((eintrag) => {
        if (eintrag.art === 'hinweis') {
          return <p key={eintrag.text.slice(0, 30)} className={cx('border-l-4 border-emerald-700 bg-white py-2 pl-3 pr-2 text-base leading-7 text-home-midnight', TRENNUNG)}>{schuetze(eintrag.text)}</p>;
        }
        if (eintrag.art === 'wahl') {
          const text = fehler[eintrag.key];
          return (
            <Karte key={eintrag.key} titel={eintrag.titel}>
              {eintrag.kurz && kurzText(eintrag.kurz)}
              {eintrag.volltext && <Volltext titel={eintrag.titel} bloecke={eintrag.volltext} />}
              <Gruppe legend={eintrag.legend} hint={eintrag.hinweis} fehlerId={`fehler-${eintrag.key}`} error={text}>
                <div className="grid grid-cols-1 gap-2">
                  {eintrag.optionen.map((option, stelle) => (
                    <OptionCard
                      key={option.id}
                      id={stelle === 0 ? `feld-${eintrag.key}` : undefined}
                      name={eintrag.key}
                      value={option.id}
                      checked={daten.erklaerungen[eintrag.key] === option.id}
                      onChange={() => setze(eintrag.key, option.id)}
                      describedBy={text ? `fehler-${eintrag.key}` : undefined}
                      invalid={Boolean(text)}
                    >
                      <span className="block font-bold">{option.titel}</span>
                      {option.text}
                    </OptionCard>
                  ))}
                </div>
              </Gruppe>
            </Karte>
          );
        }
        if (eintrag.art === 'unterlagen') {
          return (
            <Karte key={eintrag.key} titel={eintrag.titel}>
              <Unterlagen eintrag={eintrag} kontext={kontext} oeffnen={oeffnen} />
              <Haken feldKey={eintrag.key} checked={daten.erklaerungen[eintrag.key]} onChange={(wert) => setze(eintrag.key, wert)} fehler={fehler[eintrag.key]}>
                <span className="block font-bold">{eintrag.haken}</span>
                {(eintrag.hakenAbsaetze || []).map((absatz) => <span key={absatz.slice(0, 30)} className="mt-2 block">{absatz}</span>)}
              </Haken>
            </Karte>
          );
        }
        return (
          <Karte key={eintrag.key} titel={eintrag.titel}>
            {eintrag.warnung && <p className="rounded-[1rem] border-2 border-amber-400 bg-amber-50 p-3 text-base leading-7 text-amber-950">{schuetze(eintrag.warnung)}</p>}
            {eintrag.terminLink && (
              <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>Termin vereinbaren<NeuerTab /></a>
            )}
            {eintrag.kurz && kurzText(eintrag.kurz)}
            {eintrag.volltext && <Volltext titel={eintrag.titel} bloecke={eintrag.volltext} />}
            {eintrag.links?.length > 0 && (
              <ul className="space-y-0.5">
                {eintrag.links.map((link) => <li key={link.href}><UnterlageLink beimOeffnen={oeffnen} href={link.href}>{link.label}</UnterlageLink></li>)}
              </ul>
            )}
            {eintrag.dokument && (
              <p className="flex items-start gap-2 text-base leading-7 text-home-slate">
                <FileText className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{eintrag.dokument}</span>
              </p>
            )}
            <Haken feldKey={eintrag.key} checked={daten.erklaerungen[eintrag.key]} onChange={(wert) => setze(eintrag.key, wert)} fehler={fehler[eintrag.key]}>
              {schuetze(eintrag.haken)}
              {eintrag.hakenZusatz && <span className="mt-2 block">{eintrag.hakenZusatz}</span>}
              {eintrag.freiwilligText && <span className="block text-home-slate">{eintrag.freiwilligText}</span>}
            </Haken>
          </Karte>
        );
      })}
      <FehlerText id="erklaerungen-fehler">{null}</FehlerText>
    </div>
  );
}
