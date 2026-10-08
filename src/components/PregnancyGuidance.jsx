import { useState } from 'react';
import { Link } from 'react-router-dom';

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-home-midnight';
const textLink = `inline-flex min-h-[44px] items-center py-2 font-semibold underline underline-offset-4 ${focus}`;
const clinicNote = 'Nur wenn der Klinikschutz abgeschlossen ist, bevor die Schwangerschaft besteht oder bekannt ist. Für die Entbindung gilt eine Wartezeit von 8 Monaten.';

// Leistungen aus /ambulant (SDK AP1) und /stationaer, keine eigene Tarifzusage.
const coverage = [
  { label: 'Vorsorge laut Mutterpass, drei Ultraschall', statutory: 'Ja.', extra: 'Ja.' },
  {
    label: 'Extra-Untersuchungen: Feinultraschall, Toxoplasmose, Streptokokken',
    statutory: 'Meist nicht.',
    extra: 'Ambulanter Vorsorge-Topf, zum Beispiel SDK AP1: 100 % bis 500 EUR in zwei Kalenderjahren. Greift auch bei schon bestehender Schwangerschaft.',
  },
  { label: 'Zimmer bei der Geburt', statutory: 'Mehrbettzimmer.', extra: 'Ein- oder Zweibettzimmer, Chefarzt, Familienzimmer je nach Tarif.', clinic: true },
  { label: 'Baby im Krankenhaus', statutory: 'Begleitperson nur in bestimmten Fällen.', extra: 'Elternteil beim versicherten Kind unter 16, soweit die Kasse die Kosten nicht trägt.', clinic: true },
  {
    label: 'Kassenbonus',
    statutory: 'Je nach Kasse.',
    extra: 'IKK classic in der Schwangerschaft laut Satzung bis 1.155 EUR, realistisch 400 bis 700 EUR, als Zuschuss für deinen Schutz.',
  },
];

export function AlreadyPregnantNotice() {
  return (
    <aside aria-labelledby="schon-schwanger-heading" className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 md:pt-8">
      <div className="rounded-2xl border border-[#f2c9d4] bg-[#fff5f8] p-5 sm:p-7">
        <h2 id="schon-schwanger-heading" className="font-display text-xl font-bold sm:text-2xl">Schon schwanger?</h2>
        <p className="mt-2 max-w-prose leading-relaxed text-home-slate">Dann zählt jetzt der Vorsorgeschutz und dein Kassenbonus. Die Geburt selbst lässt sich nicht mehr nachträglich versichern.</p>
        <Link to="/ratgeber/schwanger-zusatzversicherung" className={`mt-2 ${textLink}`}>Was jetzt noch geht</Link>
      </div>
    </aside>
  );
}

export function PregnancyCoverageComparison() {
  return (
    <section id="kasse-und-zusatzschutz" aria-labelledby="kasse-und-zusatzschutz-heading" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-12 sm:px-8 md:pb-16">
      <h2 id="kasse-und-zusatzschutz-heading" className="max-w-[30ch] font-friendly text-3xl md:text-4xl">Was die Kasse zahlt und was Zusatzschutz dazu bringt</h2>
      <table className="mt-6 hidden w-full table-fixed text-left md:table" aria-labelledby="kasse-und-zusatzschutz-heading" aria-describedby="klinikschutz-fussnote">
        <thead className="bg-home-ice">
          <tr>
            <th scope="col" className="w-[32%] rounded-tl-2xl p-5 font-display">Leistung</th>
            <th scope="col" className="w-[24%] p-5 font-display">Was die Kasse zahlt</th>
            <th scope="col" className="rounded-tr-2xl p-5 font-display">Mit Zusatzschutz</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-home-slate/15 border-b border-home-slate/15">
          {coverage.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="p-5 align-top font-semibold leading-relaxed">{row.label}{row.clinic && <sup aria-label="Hinweis zum Klinikschutz">*</sup>}</th>
              <td className="p-5 align-top leading-relaxed text-home-slate">{row.statutory}</td>
              <td className="p-5 align-top leading-relaxed text-home-slate">{row.extra}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 space-y-4 md:hidden">
        {coverage.map((row) => (
          <article key={row.label} className="min-w-0 rounded-2xl border border-home-slate/15 p-5" aria-describedby={row.clinic ? 'klinikschutz-fussnote' : undefined}>
            <h3 className="font-display text-lg font-bold leading-snug">{row.label}{row.clinic && <sup aria-label="Hinweis zum Klinikschutz">*</sup>}</h3>
            <dl className="mt-4 space-y-4 leading-relaxed">
              <div><dt className="font-semibold">Was die Kasse zahlt</dt><dd className="mt-1 text-home-slate">{row.statutory}</dd></div>
              <div className="border-t border-home-slate/15 pt-4"><dt className="font-semibold text-[#076046]">Mit Zusatzschutz</dt><dd className="mt-1 text-home-slate">{row.extra}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <p id="klinikschutz-fussnote" className="mt-5 max-w-prose text-base leading-relaxed text-home-slate"><span aria-hidden="true">* </span>{clinicNote}</p>
    </section>
  );
}

const stages = [
  { id: 'planned', label: 'Wir planen ein Baby' },
  { id: 'pregnant', label: 'Ich bin schwanger' },
  { id: 'born', label: 'Unser Baby ist da' },
];

export function PregnancyStageEntry({ ambulantPath }) {
  // Ausschließlich flüchtiger React-Zustand. Keine Speicherung, URL oder Messung.
  const [stage, setStage] = useState(null);
  const openCalculator = () => {
    const example = document.getElementById('bonus-example');
    if (example) example.open = true;
  };

  return (
    <div id="familien-einstieg" className="scroll-mt-28" role="group" aria-labelledby="familien-einstieg-heading">
      <h3 id="familien-einstieg-heading" className="font-friendly text-2xl sm:text-3xl">Wo steht ihr gerade?</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {stages.map(({ id, label }) => (
          <button key={id} type="button" aria-pressed={stage === id} aria-controls="familien-einstieg-hinweis" onClick={() => setStage(id)}
            className={`min-h-[72px] min-w-0 rounded-2xl border-2 px-5 py-5 text-left font-display text-lg font-bold transition-colors ${focus} ${stage === id ? 'border-[#076046] bg-home-ice' : 'border-home-slate/20 bg-white hover:border-[#076046]'}`}>
            {label}
          </button>
        ))}
      </div>
      <div id="familien-einstieg-hinweis" aria-live="polite" aria-atomic="true">
        {stage && (
          <div className="mt-4 rounded-2xl bg-home-ice p-5 sm:p-6">
            {stage === 'planned' && (
              <>
                <p className="max-w-prose leading-relaxed text-home-slate">Schließe den Klinikschutz jetzt ab und wähle eine Kasse mit Bonus.</p>
                <div className="mt-2 flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  <Link to="/stationaer#familie" className={textLink}>Klinikschutz für deine Familie</Link>
                  <Link to="/ratgeber/baby-geplant-zusatzversicherung" className={textLink}>Zusatzschutz vor der Schwangerschaft</Link>
                </div>
              </>
            )}
            {stage === 'pregnant' && (
              <>
                <p className="max-w-prose leading-relaxed text-home-slate">Rechne zuerst deinen möglichen Kassenbonus. Danach kannst du den ambulanten Vorsorgeschutz ansehen.</p>
                <div className="mt-2 flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  <a href="#bonus-example" onClick={openCalculator} className={textLink}>Zum Bonus-Rechner</a>
                  <Link to={ambulantPath} className={textLink}>Danach zum ambulanten Vorsorgeschutz</Link>
                </div>
              </>
            )}
            {stage === 'born' && (
              <>
                <p className="max-w-prose leading-relaxed text-home-slate">Melde dein Kind innerhalb von 2 Monaten beim Versicherer an.</p>
                <Link to="/ratgeber/neugeborenes-versichern" className={`mt-2 ${textLink}`}>Dein Neugeborenes versichern</Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
