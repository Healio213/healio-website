import { useState } from 'react';
import { calculatePregnancyBonus } from '@/lib/pregnancyBonus';

const eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2 });
const money = (v) => (typeof v === 'number' && Number.isFinite(v) ? eur.format(v) : null);
const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-midnight';
const btnPrimary = `inline-flex items-center justify-center rounded-full bg-home-mint px-6 py-3 font-semibold text-home-midnight hover:bg-home-mint-active ${focus}`;
const btnSecondary = `inline-flex items-center justify-center rounded-full border-2 border-home-midnight px-6 py-3 font-semibold text-home-midnight hover:bg-white ${focus}`;
const field = `mt-1 w-full rounded-xl border border-home-slate/40 bg-white px-3 py-2 text-home-midnight ${focus}`;

function parsePremium(raw) {
  const s = raw.trim();
  if (s === '') return { value: undefined, error: null };
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(s)) {
    return { value: undefined, error: 'Bitte ohne Tausendertrennzeichen eingeben, zum Beispiel 1240,50.' };
  }
  return { value: s, error: null };
}

const blockedText = (blocked) => blocked ? 'BMI und Blutdruck zählen in diesem Modell nur zusammen mit einem anerkannten Kurs oder einer aktiven Studio-Mitgliedschaft. Ohne eines davon bleiben sie unberücksichtigt.' : null;

const CHECKS = [
  ['course', 'Gesundheitskurs'],
  ['studio', 'Fitnessstudio'],
  ['bmi', 'BMI im passenden Bereich'],
  ['bloodPressure', 'Blutdruck im passenden Bereich'],
  ['dentalFirst', 'Zahnvorsorge im ersten Halbjahr'],
  ['dentalSecond', 'Zahnvorsorge im zweiten Halbjahr'],
];


export default function PregnancyBonusExample() {
  const [selection, setSelection] = useState({});
  const [premium, setPremium] = useState('');
  const [exampleOpen, setExampleOpen] = useState(false);

  const parsed = parsePremium(premium);
  // The single-person/year scenario is an explicit illustration, not a declaration.
  const result = calculatePregnancyBonus({ ...selection, sameYear: true }, parsed.value);

  const update = (e) => {
    const { name, type, checked, value } = e.target;
    setSelection((prev) => {
      const next = { ...prev };
      if (type === 'checkbox') next[name] = checked;
      else if (value === '') delete next[name];
      else next[name] = Number(value);
      return next;
    });
  };
  const reset = () => { setSelection({}); setPremium(''); };

  const needPremium = 'Trage einen Beitrag im Beispiel ein, um den möglichen Ausgleich zu sehen.';
  const outputs = [
    ['Zuschusspotenzial', result.potential, 'Für anerkannte eigene Kosten, zum Beispiel den Beitrag für passenden Zusatzschutz.'],
    ['Geldbonus', result.cash, 'Wahlweise statt des Zuschusses – nicht zusätzlich.'],
    ['Anrechenbarer Zuschuss', result.applied, parsed.value === undefined ? needPremium : 'Höchstens so viel wie der zuschussfähige Beitrag im Beispiel.'],
    ['Verbleibender Eigenanteil', result.remaining, parsed.value === undefined ? needPremium : 'Dieser Teil des Beispielbeitrags bleibt nach dem Zuschuss übrig.'],
  ];

  return (
          <details id="bonus-example" open={exampleOpen} onToggle={(e) => setExampleOpen(e.currentTarget.open)} className="group/example mt-6 overflow-hidden rounded-3xl border border-home-slate/20 bg-white">
            <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8 [&::-webkit-details-marker]:hidden ${focus}`}>
              <span><span className="block font-friendly text-2xl">Beispiel ausprobieren</span><span className="mt-1 block text-sm text-home-slate">Auswählen und den Unterschied direkt sehen.</span></span>
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-home-ice text-2xl text-home-midnight"><span className="group-open/example:hidden">+</span><span className="hidden group-open/example:inline">−</span></span>
            </summary>
            <div className="border-t border-home-slate/15 px-6 pb-6 sm:px-8 sm:pb-8">
              <p className="mt-5 text-sm text-home-slate">Wir rechnen beispielhaft für eine Person im Bonusjahr 2026 nach dem IKK-classic-Modell. Deine Auswahl bleibt nur in diesem Browser und wird nicht an Healio übermittelt.</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[3fr_2fr]" role="group" aria-label="Bonusbeispiel Schwangerschaft">
            <div>
              <label htmlFor="checkups" className="block font-semibold">Schwangerschaftsvorsorgen</label>
              <p id="checkups-hint" className="text-sm text-home-slate">Wie viele gesetzliche Vorsorgeuntersuchungen möchtest du im Beispiel berücksichtigen?</p>
              <input id="checkups" name="checkups" type="number" min="0" step="1" inputMode="numeric" aria-describedby="checkups-hint" value={selection.checkups ?? ''} onChange={update} className={`${field} max-w-[8rem]`} />

              <fieldset className="mt-6">
                <legend className="font-semibold">Was soll noch dazukommen?</legend>
                <div className="mt-3 space-y-3">
                  {CHECKS.map(([name, label]) => (
                    <div key={name} className="flex items-start gap-3">
                      <input id={name} name={name} type="checkbox" checked={selection[name] === true} onChange={update} className={`mt-1 h-5 w-5 shrink-0 rounded accent-home-mint ${focus}`} />
                      <label htmlFor={name}>{label}</label>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-home-slate">BMI und Blutdruck zählen hier zusammen mit Kurs oder Studio. Die Voraussetzungen findest du unter „Gut zu wissen“.</p>
              </fieldset>

              <div className="mt-6">
                <label htmlFor="eligiblePaidPremium" className="block font-semibold">Beitrag im Beispiel (optional, in EUR)</label>
                <p id="premium-hint" className="text-sm text-home-slate">Zuschussfähiger Beitrag, der im selben Kalenderjahr tatsächlich gezahlt wird – bei einem späteren Start nur für die verbleibenden Monate.</p>
                <input id="eligiblePaidPremium" name="eligiblePaidPremium" type="text" inputMode="decimal" autoComplete="off" value={premium} onChange={(e) => setPremium(e.target.value)} aria-invalid={parsed.error ? 'true' : undefined} aria-describedby={parsed.error ? 'premium-hint premium-error' : 'premium-hint'} className={`${field} max-w-[12rem]`} />
                {parsed.error && <p id="premium-error" className="mt-1 text-sm font-medium text-home-midnight">{parsed.error}</p>}
              </div>

              <button type="button" onClick={reset} className={`mt-6 ${btnSecondary}`}>Auswahl zurücksetzen</button>
            </div>

            <div className="self-start rounded-2xl bg-home-ice p-5 sm:p-6" aria-live="polite" aria-atomic="true">
              <h3 className="font-display text-xl font-bold">So sieht dein Beispiel aus</h3>
              <dl className="mt-4 space-y-5">
                {outputs.map(([label, value, hint]) => {
                  const shown = money(value);
                  return (
                    <div key={label}>
                      <dt className="text-sm text-home-slate">{label}</dt>
                      <dd>
                        <output aria-label={label} className="font-display text-2xl font-bold">{shown ?? 'Noch offen'}</output>
                        <p className="mt-1 text-sm text-home-slate">{hint}</p>
                      </dd>
                    </div>
                  );
                })}
              </dl>
              {blockedText(result.blockedStatus) && (
                <p className="mt-5 rounded-2xl bg-home-ice p-4 text-sm">{blockedText(result.blockedStatus)}</p>
              )}
              <p className="mt-5 text-sm text-home-slate">Unverbindliches Rechenbeispiel. Die Auszahlung richtet sich nach den Voraussetzungen und der Anerkennung durch die IKK classic. Tarifleistungen sind hier nicht enthalten.</p>
            </div>
          </div>
              <details id="bonus-conditions" className="mt-6 border-t border-home-slate/20 pt-5">
                <summary className={`cursor-pointer font-semibold ${focus}`}>Gut zu wissen</summary>
                <ul className="mt-4 max-w-prose list-disc space-y-3 pl-5 text-sm text-home-slate">
                  <li>Dieses Beispiel zeigt die Maßnahmen aus dem Reel für eine Person im Bonusjahr 2026, nicht das gesamte Bonusprogramm. Es ist kein Antrag und prüft keinen persönlichen Anspruch.</li>
                  <li>In der Schwangerschaft wird ärztlich beurteilt, welcher BMI angemessen ist. BMI und Blutdruck zählen nur zusammen mit einer regelmäßigen bonusfähigen Aktivität. Hier im Rechner sind das Kurs oder Studio. Die Seite gibt keine Empfehlungen, wie du bestimmte Werte erreichst.</li>
                  <li>Für die Auszahlung gelten die Teilnahmebedingungen und Nachweise der IKK classic. Je nach Maßnahme kann auch innerhalb der IKK-App bestätigt werden. Die IKK kann weitere Nachweise anfordern; die Auswahl hier ersetzt ihre Anerkennung nicht.</li>
                  <li>Gesetzliche Schwangerschaftsvorsorgen zählen, zusätzliche Selbstzahlertests nicht. Kurse müssen anerkannt sein; beim Fitnessstudio zählt eine aktive Mitgliedschaft.</li>
                  <li>Der Zuschuss ist auf anerkannte eigene Kosten begrenzt. Beim Zusatzschutz zählt der zuschussfähige Beitrag, der im selben Kalenderjahr tatsächlich gezahlt wurde. Bei unterjährigem Beginn wird nicht automatisch mit zwölf Monaten gerechnet. Geldbonus und Zuschuss sind Alternativen; Versicherungsleistungen bleiben davon getrennt.</li>
                </ul>
              </details>
            </div>
          </details>
  );
}
