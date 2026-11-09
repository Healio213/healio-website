import React, { useState } from 'react';
import { FileText, Lock } from 'lucide-react';
import {
  ANREDEN,
  ZAHLWEISEN,
  findeTarif,
  formatEuro,
  tarifName,
} from '@/data/sdkAmbulantAntrag';
import {
  BEITRAG_VORBEHALT,
  EINWILLIGUNGEN_TITEL,
  ERKLAERUNG_KURZ,
  GANZEN_TEXT_LESEN,
  KNOPF_BEANTRAGEN,
  SDK_BONITAET,
  SDK_SCHLUSSERKLAERUNG,
  SDK_SEPA_ANGABEN,
  SDK_SEPA_MANDAT,
  SDK_SEPA_TITEL,
  TEXT_10_VOLLMACHT,
  TEXT_12_KNOPF,
  TEXT_13_FRAGE,
  TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER,
  TEXT_8_AUSWAHL,
  TEXT_9_HAKEN,
  TEXT_9_HINWEIS,
  UNTERLAGEN_HAKEN,
  UNTERLAGEN_HEALIO,
  UNTERLAGEN_SCHLUSS_TITEL,
  UNTERLAGEN_SDK,
} from '@/data/sdkAmbulantAntragTexte';
import {
  SDK_SCHWEIGEPFLICHT_BLOECKE, SDK_VERZICHT_SATZ, TEXT_6_STANDORT, UNTERLAGEN_SDK_DATEIEN,
} from '@/data/sdkAmbulantAntragSdkTexte';
import { ibanBereinigt, ibanEnde, ibanFehler, ibanInGruppen } from '@/lib/iban';
import Antworten, { AendernKnopf } from './Antworten';
import {
  Aufklapper, Button, Callout, FehlerText, Field, Gruppe, LINK, NeuerTab, OptionCard,
  TRENNUNG, bodyText, buttonClass, cx, eingabeKlasse, fieldAria, schuetze,
} from './ui';

// Schritt 4 „Bestätigen“ in vier ruhigen Bildschirmen: 1 Beratung und
// Auftrag, 2 Einwilligungen, 3 Zahlung, 4 Prüfen und bestätigen. Die
// Erklärungen folgen Teil 2 und 3 des Klick-Entwurfs (HealioFormular.jsx),
// die Schlüssel genau dem Vertrag (SCHNITTSTELLE.md 4.2, erklaerungen).

const HAKEN_FEHLT = 'Ohne diesen Haken können wir deinen Antrag nicht stellen.';

export const TERMIN_LINK = '/terminvereinbarung';

// Kurzfassung zur Schweigepflicht für die Wahl I oder II. Der Satz aus dem
// Klick-Entwurf verweist auf eine Wahl „im ganzen Text“; hier steht die Wahl
// sichtbar unter dem Text.
const SCHWEIGEPFLICHT_KURZ = 'Die SDK darf deine Gesundheitsangaben für Antrag und Vertrag nutzen. Darunter wählst du, ob sie bei Ärzten selbst nachfragen darf oder dich jedes Mal vorher fragt. Jederzeit widerrufbar.';
const SCHWEIGEPFLICHT_WAHL = [
  { id: 'I', titel: 'Möglichkeit I', text: 'Die SDK darf bei Ärzten und anderen Stellen selbst nachfragen, wenn es nötig ist. Vorher sagt sie dir Bescheid, und du kannst widersprechen.' },
  { id: 'II', titel: 'Möglichkeit II', text: 'Die SDK fragt dich jedes Mal vorher. Du entscheidest dann, ob sie nachfragen darf, oder schickst die Unterlagen selbst. Das kann etwas länger dauern.' },
];

export function fehlerBestaetigen(teil, daten) {
  const fehler = [];
  const e = daten.erklaerungen;
  if (teil === 1) {
    if (!e.verzicht) fehler.push({ key: 'erkl-verzicht', text: HAKEN_FEHLT });
    if (!e.vollmacht) fehler.push({ key: 'erkl-vollmacht', text: HAKEN_FEHLT });
  }
  if (teil === 2) {
    if (!e.gesundheitsdaten) fehler.push({ key: 'erkl-gesundheitsdaten', text: HAKEN_FEHLT });
    if (e.schweigepflicht !== 'I' && e.schweigepflicht !== 'II') fehler.push({ key: 'erkl-schweigepflicht', text: 'Bitte wähle Möglichkeit I oder II.' });
  }
  if (teil === 3) {
    if (!ZAHLWEISEN.some((eintrag) => eintrag.id === daten.zahlweise)) fehler.push({ key: 'zahlweise', text: 'Bitte wähle, wie du zahlen möchtest.' });
    if (daten.kontoinhaber !== 'selbst') {
      fehler.push({ key: 'kontoinhaber', text: daten.kontoinhaber === 'andere' ? '' : 'Bitte beantworte die Frage zum Konto.' });
    } else {
      const text = ibanFehler(daten.iban);
      if (text) fehler.push({ key: 'iban', text });
      if (!e.sepa) fehler.push({ key: 'erkl-sepa', text: HAKEN_FEHLT });
    }
  }
  if (teil === 4) {
    if (!e.schluss) fehler.push({ key: 'erkl-schluss', text: HAKEN_FEHLT });
  }
  return fehler;
}

function TeilKopf({
  teil, titel, ueberschriftRef, text,
}) {
  return (
    <div>
      <h2 ref={ueberschriftRef} tabIndex={-1} className="scroll-mt-4 font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
        <span className="block text-base font-extrabold text-emerald-900">Teil {teil} von 4</span>
        {titel}
      </h2>
      {text && <p className="mt-1 text-base leading-7 text-home-slate">{text}</p>}
    </div>
  );
}

function Haken({
  hakenKey, daten, setzeErklaerung, fehler, children,
}) {
  const key = `erkl-${hakenKey}`;
  return (
    <div data-fehlerblock="">
      <OptionCard
        id={`feld-${key}`}
        type="checkbox"
        name={key}
        checked={Boolean(daten.erklaerungen[hakenKey])}
        onChange={(event) => setzeErklaerung(hakenKey, event.target.checked)}
        describedBy={fehler[key] ? `fehler-${key}` : undefined}
        invalid={Boolean(fehler[key])}
      >
        {children}
      </OptionCard>
      <FehlerText id={`fehler-${key}`}>{fehler[key]}</FehlerText>
    </div>
  );
}

function Karte({ titel, children }) {
  return (
    <section className="space-y-3 rounded-[1.2rem] border-2 border-slate-300 bg-white p-3 sm:p-4">
      <h3 className="font-display text-lg font-extrabold leading-snug text-home-midnight">{titel}</h3>
      {children}
    </section>
  );
}

function Volltext({ titel, children }) {
  return (
    <Aufklapper schlicht titel={<>{GANZEN_TEXT_LESEN}<span className="sr-only">: {titel}</span></>}>
      {children}
    </Aufklapper>
  );
}

const kurzText = (text) => <p className={cx('break-words text-base leading-7 text-home-midnight', TRENNUNG)}>{schuetze(text)}</p>;

// Volltext der SDK-Erklärung (Blöcke aus sdkAmbulantAntragSdkTexte.js).
function SdkBloecke({ bloecke }) {
  return bloecke.map(([art, inhalt, extra], stelle) => {
    const key = `${art}-${stelle}`;
    if (art === 'titel') return <p key={key} className="font-bold [hyphens:auto]">{inhalt}</p>;
    if (art === 'h') return <p key={key} className="font-bold">{inhalt}</p>;
    if (art === 'ul') return <ul key={key} className="list-disc space-y-1 pl-5">{inhalt.map((punkt) => <li key={punkt.slice(0, 30)}>{punkt}</li>)}</ul>;
    if (art === 'wahl') {
      return (
        <div key={key} className="space-y-2 rounded-lg border border-slate-300 p-3">
          <p className="font-bold">Möglichkeit {inhalt}:</p>
          <SdkBloecke bloecke={extra} />
        </div>
      );
    }
    if (art === 'fussnote') return <p key={key} className="text-home-slate">{inhalt}</p>;
    return <p key={key}>{inhalt}</p>;
  });
}

function UnterlageLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={cx(LINK, 'gap-1.5')}>
      <FileText className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
      <NeuerTab />
    </a>
  );
}

function Pruefzeile({
  label, children, aendern, aendernAngabe,
}) {
  return (
    <li className="flex items-start justify-between gap-3 border-t border-slate-300 py-2 first:border-t-0">
      <span className="min-w-0">
        <span className="block text-base leading-6 text-home-slate">{label}</span>
        <span className="block break-words text-base font-bold leading-6 text-home-midnight">{children}</span>
      </span>
      {aendern && <AendernKnopf id={`pruef-aendern-${aendern}`} label={label} onClick={() => aendernAngabe(aendern)} />}
    </li>
  );
}

// Übersicht der Angaben, auch für die Bestätigungsansicht (ohne „ändern“).
export function Uebersicht({
  angaben, geburtsdatumText, beginnText, beitrag, zahlweise, ibanAnzeige, aendernAngabe,
}) {
  const tarif = findeTarif(angaben.tarifCode);
  const anrede = ANREDEN.find((eintrag) => eintrag.id === angaben.anrede);
  const zahl = ZAHLWEISEN.find((eintrag) => eintrag.id === zahlweise);
  const f = angaben.formular || {};
  const zeile = { aendernAngabe };
  const mitAendern = (was) => (aendernAngabe ? was : undefined);
  return (
    <ul className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1">
      <Pruefzeile {...zeile} label="Stufe" aendern={mitAendern('tarif')}>{tarifName(tarif)}</Pruefzeile>
      <Pruefzeile {...zeile} label="Beginn" aendern={mitAendern('beginn')}>{beginnText}</Pruefzeile>
      {Number.isFinite(beitrag) && <Pruefzeile label="Monatsbeitrag">{formatEuro(beitrag)}</Pruefzeile>}
      <Pruefzeile {...zeile} label="Name" aendern={mitAendern('name')}>{[anrede?.label, f.vorname, f.nachname].filter(Boolean).join(' ')}</Pruefzeile>
      <Pruefzeile {...zeile} label="Geburtsdatum" aendern={mitAendern('geburtsdatum')}>{geburtsdatumText}</Pruefzeile>
      <Pruefzeile {...zeile} label="Adresse" aendern={mitAendern('adresse')}>{f.strasse}, {f.plz} {f.ort}</Pruefzeile>
      <Pruefzeile {...zeile} label="Kontakt" aendern={mitAendern('kontakt')}>
        <span className="break-all">{f.email}</span>
        <span className="block whitespace-nowrap font-bold">{f.telefon}</span>
      </Pruefzeile>
      <Pruefzeile {...zeile} label="Krankenversicherung" aendern={mitAendern('kasse')}>
        Gesetzlich versichert{angaben.krankenkasse ? `, ${angaben.krankenkasse}` : ''}
      </Pruefzeile>
      {zahl && <Pruefzeile {...zeile} label="Zahlweise" aendern={mitAendern('zahlung')}>{zahl.label}</Pruefzeile>}
      {ibanAnzeige && <Pruefzeile {...zeile} label="IBAN" aendern={mitAendern('zahlung')}>{ibanAnzeige}</Pruefzeile>}
    </ul>
  );
}

export default function StepBestaetigen({
  teil, daten, set, fehler, ueberschriftRef, uebersicht, aendernAngabe, absenden, sendet, sendeFehler, beitragNeu,
}) {
  const [ibanBeruehrt, setIbanBeruehrt] = useState(false);
  const setzeErklaerung = (key, wert) => set((alt) => ({ erklaerungen: { ...alt.erklaerungen, [key]: wert } }));
  const props = { daten, setzeErklaerung, fehler };

  if (teil === 1) {
    return (
      <div className="space-y-4">
        <TeilKopf teil={1} titel="Beratung und Auftrag" ueberschriftRef={ueberschriftRef} />
        <p className={cx('border-l-4 border-emerald-700 bg-white py-2 pl-3 pr-2 text-base leading-7 text-home-midnight', TRENNUNG)}>{schuetze(TEXT_8_AUSWAHL)}</p>

        <Karte titel="Verzicht auf Beratung">
          <p className="rounded-[1rem] border-2 border-amber-400 bg-amber-50 p-3 text-base leading-7 text-amber-950">{schuetze(TEXT_9_HINWEIS)}</p>
          <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>
            Termin vereinbaren<NeuerTab />
          </a>
          <Haken {...props} hakenKey="verzicht">
            {schuetze(TEXT_9_HAKEN)}
            {SDK_VERZICHT_SATZ && <span className="mt-2 block">{SDK_VERZICHT_SATZ}</span>}
          </Haken>
        </Karte>

        <Karte titel="Auftrag und Vollmacht">
          {kurzText(ERKLAERUNG_KURZ.vollmacht)}
          <Volltext titel="Auftrag und Vollmacht"><p>{schuetze(TEXT_10_VOLLMACHT)}</p></Volltext>
          <p className="flex items-start gap-2 text-base leading-7 text-home-slate">
            <FileText className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Maklervertrag</span>
          </p>
          <Haken {...props} hakenKey="vollmacht">Ich erteile Healio diesen Auftrag und diese Vollmacht.</Haken>
        </Karte>
      </div>
    );
  }

  if (teil === 2) {
    const schweigeFehler = fehler['erkl-schweigepflicht'];
    return (
      <div className="space-y-4">
        <TeilKopf teil={2} titel={EINWILLIGUNGEN_TITEL} ueberschriftRef={ueberschriftRef} />

        <Karte titel="Gesundheitsangaben bei Healio">
          {kurzText(ERKLAERUNG_KURZ.gesundheitsdaten)}
          <Volltext titel="Gesundheitsangaben bei Healio">
            <p>{TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join('')}</p>
          </Volltext>
          <Haken {...props} hakenKey="gesundheitsdaten">Ich bin einverstanden.</Haken>
        </Karte>

        <Karte titel="Einwilligung und Schweigepflichtentbindung der SDK">
          {kurzText(SCHWEIGEPFLICHT_KURZ)}
          <Volltext titel="Einwilligung und Schweigepflichtentbindung der SDK">
            <SdkBloecke bloecke={SDK_SCHWEIGEPFLICHT_BLOECKE} />
          </Volltext>
          <Gruppe
            legend="Deine Wahl"
            hint="Sie gilt für 2.1 und 2.2 der Erklärung. Mit deiner Wahl gibst du die ganze Erklärung ab."
            fehlerId="fehler-erkl-schweigepflicht"
            error={schweigeFehler}
          >
            <div className="grid grid-cols-1 gap-2">
              {SCHWEIGEPFLICHT_WAHL.map((wahl, stelle) => (
                <OptionCard
                  key={wahl.id}
                  id={stelle === 0 ? 'feld-erkl-schweigepflicht' : undefined}
                  name="schweigepflicht"
                  value={wahl.id}
                  checked={daten.erklaerungen.schweigepflicht === wahl.id}
                  onChange={() => setzeErklaerung('schweigepflicht', wahl.id)}
                  describedBy={schweigeFehler ? 'fehler-erkl-schweigepflicht' : undefined}
                  invalid={Boolean(schweigeFehler)}
                >
                  <span className="block font-bold">{wahl.titel}</span>
                  {wahl.text}
                </OptionCard>
              ))}
            </div>
          </Gruppe>
        </Karte>

        <Karte titel="Einwilligung zur Bonitätsprüfung">
          {kurzText(ERKLAERUNG_KURZ.bonitaet)}
          <Volltext titel="Einwilligung zur Bonitätsprüfung"><p>{SDK_BONITAET}</p></Volltext>
          <Haken {...props} hakenKey="bonitaet">
            Ich bin einverstanden.
            <span className="block text-home-slate">Freiwillig. Dein Antrag geht auch ohne diesen Haken.</span>
          </Haken>
        </Karte>
      </div>
    );
  }

  if (teil === 3) {
    const ibanText = fehler.iban || (ibanBeruehrt && daten.iban !== '' ? ibanFehler(daten.iban) : null);
    return (
      <div className="space-y-5">
        <TeilKopf teil={3} titel="Zahlung" ueberschriftRef={ueberschriftRef} text="Deine IBAN tippst du nur hier ein. Am Telefon fragen wir nie danach." />
        <Gruppe legend="Zahlweise" fehlerId="fehler-zahlweise" error={fehler.zahlweise}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ZAHLWEISEN.map((zahlweise, stelle) => (
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

        <Gruppe legend={TEXT_13_FRAGE} fehlerId="fehler-kontoinhaber" error={fehler.kontoinhaber}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <OptionCard
              id="feld-kontoinhaber"
              kompakt
              name="kontoinhaber"
              value="selbst"
              checked={daten.kontoinhaber === 'selbst'}
              onChange={() => set({ kontoinhaber: 'selbst' })}
              invalid={Boolean(fehler.kontoinhaber)}
            >
              Ja, das ist mein Konto
            </OptionCard>
            <OptionCard
              kompakt
              name="kontoinhaber"
              value="andere"
              checked={daten.kontoinhaber === 'andere'}
              onChange={() => set({ kontoinhaber: 'andere' })}
              invalid={Boolean(fehler.kontoinhaber)}
            >
              Nein, es gehört jemand anderem
            </OptionCard>
          </div>
        </Gruppe>

        {daten.kontoinhaber === 'andere' && (
          <Callout tone="info" title="Das klären wir am besten kurz zusammen." data-terminweg="">
            <p>Gehört das Konto jemand anderem, muss diese Person das Lastschriftmandat selbst erteilen. Vereinbare einfach einen Termin, dann machen wir den Rest gemeinsam.</p>
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
                  onBlur={() => { setIbanBeruehrt(true); set({ iban: ibanInGruppen(daten.iban) }); }}
                  className={cx(eingabeKlasse, 'pr-11 font-mono tracking-wide')}
                />
                <Lock className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-home-slate" aria-hidden="true" />
              </div>
            </Field>

            <Karte titel="SEPA-Lastschriftmandat der SDK">
              <ul className="space-y-1 text-base leading-7 text-home-midnight">
                {SDK_SEPA_ANGABEN.map(([label, wert]) => (
                  <li key={label}><span className="text-home-slate">{label}: </span>{wert}</li>
                ))}
              </ul>
              <Volltext titel="SEPA-Lastschriftmandat der SDK">
                <p className="font-bold">{SDK_SEPA_TITEL}</p>
                {SDK_SEPA_MANDAT.map((absatz) => <p key={absatz.slice(0, 30)}>{absatz}</p>)}
              </Volltext>
              <Haken {...props} hakenKey="sepa">Ich erteile der SDK dieses SEPA-Lastschriftmandat für mein Konto.</Haken>
            </Karte>
          </>
        )}
      </div>
    );
  }

  // Teil 4: Prüfen und bestätigen
  return (
    <div className="space-y-4">
      <TeilKopf teil={4} titel="Prüfen und bestätigen" ueberschriftRef={ueberschriftRef} text="Bis du bestätigst, ist nichts abgeschlossen." />

      <Uebersicht {...uebersicht} ibanAnzeige={ibanEnde(daten.iban) ? `${ibanBereinigt(daten.iban).slice(0, 2)} ${ibanEnde(daten.iban)}` : ''} aendernAngabe={aendernAngabe} />

      <div className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-extrabold text-home-midnight">Deine Antworten</h3>
          <AendernKnopf id="pruef-aendern-antworten" label="Deine Antworten" onClick={() => aendernAngabe('antworten')} />
        </div>
        <Antworten daten={daten} kompakt className="mt-1 border-t border-slate-300" />
      </div>

      <Karte titel={UNTERLAGEN_SCHLUSS_TITEL}>
        <div className="space-y-2 text-base leading-7 text-home-midnight">
          <p className="font-bold">Von der SDK</p>
          <ul className="space-y-0.5">
            {UNTERLAGEN_SDK.map((name) => {
              const dateien = UNTERLAGEN_SDK_DATEIEN[name];
              if (!dateien) return <li key={name} className="flex min-h-11 items-center gap-1.5 text-home-slate"><FileText className="h-5 w-5 shrink-0" aria-hidden="true" />{name}</li>;
              return (
                <li key={name}>
                  <span className="block pt-1">{name}</span>
                  <span className="block pl-2">
                    {dateien.map((datei) => <span key={datei.href} className="block"><UnterlageLink href={datei.href}>{datei.label}</UnterlageLink></span>)}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="pt-2 font-bold">Von {schuetze('Healio')}</p>
          <ul className="space-y-0.5">
            <li><UnterlageLink href="/erstinformation">Erstinformation</UnterlageLink></li>
            {UNTERLAGEN_HEALIO.map((name) => <li key={name} className="flex min-h-11 items-center gap-1.5 text-home-slate"><FileText className="h-5 w-5 shrink-0" aria-hidden="true" />{name}</li>)}
          </ul>
        </div>
        <Haken {...props} hakenKey="schluss">
          <span className="block font-bold">{UNTERLAGEN_HAKEN}</span>
          {SDK_SCHLUSSERKLAERUNG.map((absatz) => <span key={absatz.slice(0, 30)} className="mt-2 block">{absatz}</span>)}
        </Haken>
      </Karte>

      {beitragNeu && (
        <Callout tone="hinweis" title={`Dein Beitrag ist jetzt ${formatEuro(beitragNeu)} im Monat.`} data-beitrag-neu="">
          <p>Die Berechnung hat sich gerade geändert. Wenn das für dich passt, bestätige bitte noch einmal.</p>
        </Callout>
      )}
      {sendeFehler && (
        <Callout tone="hinweis" title={sendeFehler.titel} data-sendefehler="" role="alert">
          {sendeFehler.text && <p>{sendeFehler.text}</p>}
          {sendeFehler.felder?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {sendeFehler.felder.map((feld) => (
                <li key={feld.was} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">{feld.label}</span>
                  <AendernKnopf id={`fehler-aendern-${feld.was}`} label={feld.label} onClick={() => aendernAngabe(feld.was)} />
                </li>
              ))}
            </ul>
          )}
        </Callout>
      )}

      <div>
        <p className="text-base font-bold leading-7 text-home-midnight">{schuetze(TEXT_12_KNOPF)}</p>
        <p className={bodyText}>{schuetze(BEITRAG_VORBEHALT)}</p>
      </div>
      <Button className="w-full sm:w-auto" onClick={absenden} disabled={sendet} aria-busy={sendet || undefined} id="knopf-beantragen">
        {sendet ? 'Wird gesendet …' : KNOPF_BEANTRAGEN}
      </Button>
    </div>
  );
}
