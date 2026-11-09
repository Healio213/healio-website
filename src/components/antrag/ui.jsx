import React from 'react';
import { Check } from 'lucide-react';

// Kleine Bausteine der Prüfseite /antrag/pruefen (übernommen aus dem Klick-Entwurf /antrag-entwurf). Die Klassen folgen dem
// Vokabular der Ambulant-Seite (home-mint, home-slate, runde Karten, font-display).
// Alle Texte mindestens 16 px (text-base), Tippflächen mindestens 44 px.
// Ränder von Bedienelementen mindestens slate-500 (Kontrast über 3:1), der
// Fokusrahmen ist dunkel und breit, damit er sich klar von der Auswahl abhebt.
// Hover-Zustände nur bei echter Maus ([@media(hover:hover)]): Am Handy bleibt
// er sonst nach dem Tipp hängen und färbt den Knopf auf dem nächsten
// Bildschirm, als wäre er deaktiviert.

export const cx = (...teile) => teile.filter(Boolean).join(' ');

// Silbentrennung (Franks Vorgabe 16.10.2026): automatisch nur unter 360 px
// Breite (kleines Handy, starker Zoom), sonst nur an weichen Trennstellen.
export const TRENNUNG = 'hyphens-auto min-[360px]:hyphens-manual';

// Der Markenname Healio wird nie getrennt, und Wörter mit „E-Mail“ brechen
// nie am Bindestrich um. schuetze legt um diese Wörter einen Span ohne
// Trennung und ohne Umbruch; andere Inhalte bleiben unverändert.
const GESCHUETZT = /(Healio\p{L}*|[\p{L}-]*E-Mail[\p{L}-]*)/u;

export function schuetze(inhalt) {
  if (typeof inhalt !== 'string' || !GESCHUETZT.test(inhalt)) return inhalt;
  return inhalt.split(GESCHUETZT).map((teil, stelle) => (stelle % 2 === 1
    ? <span key={stelle} className="whitespace-nowrap hyphens-none">{teil}</span>
    : teil));
}

// Für children: Texte direkt im Baustein schützen (Fragmente bleiben, wie sie sind).
export const schuetzeKinder = (kinder) => React.Children.map(kinder, schuetze);

// Die Website scrollt per CSS weich (scroll-behavior: smooth). Beim Wechsel
// des Bildschirms muss die Position sofort stimmen: Sonst rechnet ein
// scrollIntoView nach scrollTo(0) noch mit der alten Position, und die weiche
// Bewegung endet wieder oben.
export function sofortScrollen(aktion) {
  const root = document.documentElement;
  const vorher = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  aktion();
  root.style.scrollBehavior = vorher;
}

export const FOKUS = 'outline-none focus-visible:ring-[3px] focus-visible:ring-home-midnight focus-visible:ring-offset-2';

const BUTTON_BASIS = `${FOKUS} inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-display text-base font-extrabold leading-snug transition disabled:cursor-not-allowed disabled:opacity-50`;

const BUTTON_VARIANTEN = {
  primary: 'bg-home-mint text-home-midnight shadow-[0_10px_24px_rgba(37,201,144,0.22)] [@media(hover:hover)]:hover:bg-home-mint-active disabled:shadow-none',
  secondary: 'border-2 border-slate-500 bg-white text-home-midnight [@media(hover:hover)]:hover:border-home-midnight',
};

export function buttonClass(variante = 'primary', extra) {
  return cx(BUTTON_BASIS, BUTTON_VARIANTEN[variante], extra);
}

export function Button({ variant = 'primary', className, type = 'button', ...props }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}

// Unterstrichener Textlink mit großer Tippfläche.
export const LINK = `${FOKUS} inline-flex min-h-11 items-center rounded font-semibold text-emerald-800 underline underline-offset-4 [@media(hover:hover)]:hover:text-home-midnight`;

export function NeuerTab() {
  return <span className="sr-only"> (öffnet in neuem Tab)</span>;
}

const CALLOUT_TONEN = {
  info: 'border-emerald-900/20 bg-home-ice text-home-midnight',
  hinweis: 'border-amber-400 bg-amber-50 text-amber-950',
  neutral: 'border-slate-300 bg-slate-50 text-home-midnight',
};

export function Callout({ tone = 'info', title, children, className, ...props }) {
  return (
    <div className={cx('rounded-[1.2rem] border p-4', CALLOUT_TONEN[tone], className)} {...props}>
      {title && <p className="font-display text-base font-extrabold leading-snug">{schuetze(title)}</p>}
      <div className={cx('text-base leading-7', title && 'mt-1')}>{schuetzeKinder(children)}</div>
    </div>
  );
}

export const bodyText = `text-base leading-7 text-home-slate ${TRENNUNG}`;

// Fehlertext unter einem Feld. Die id hängt per aria-describedby am Feld, so
// liest ein Screenreader den Fehler vor, sobald das Feld den Fokus bekommt.
export function FehlerText({ id, children }) {
  if (!children) return null;
  return <p id={id} className="mt-1.5 text-base font-semibold leading-6 text-rose-700">{schuetzeKinder(children)}</p>;
}

// Auswahlkarte als echtes Radio oder Checkbox. Der native Input liegt
// unsichtbar über der ganzen Karte: Tastatur und Screenreader bedienen ihn
// direkt, und der Browser holt beim Fokus die ganze Karte ins Bild.
export function OptionCard({
  id,
  type = 'radio',
  name,
  value,
  checked,
  onChange,
  disabled = false,
  children,
  className,
  describedBy,
  invalid = false,
  kompakt = false,
  // eng: schmalere Polsterung ab 340 px, für drei kurze Karten nebeneinander (Anrede).
  eng = false,
}) {
  const rund = type === 'radio';
  return (
    <label className={cx('relative block min-w-0', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer', className)}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none rounded-[1.2rem] opacity-0 disabled:cursor-not-allowed"
      />
      <span
        className={cx(
          'flex items-start rounded-[1.2rem] border-2 bg-white transition peer-checked:border-emerald-700 peer-checked:bg-emerald-50 peer-focus-visible:ring-[3px] peer-focus-visible:ring-home-midnight peer-focus-visible:ring-offset-2',
          invalid ? 'border-rose-600' : 'border-slate-400 [@media(hover:hover)]:peer-hover:border-slate-500',
          kompakt ? 'min-h-11 px-3 py-2.5' : 'min-h-12 p-3.5',
          eng ? 'gap-3 min-[340px]:gap-2 min-[340px]:px-2' : 'gap-3',
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 transition',
            rund ? 'rounded-full' : 'rounded-md',
            checked ? 'border-emerald-700 bg-home-mint text-home-midnight' : 'border-slate-500 bg-white',
          )}
        >
          {checked && (rund ? <span className="h-2.5 w-2.5 rounded-full bg-home-midnight" /> : <Check className="h-4 w-4" strokeWidth={3} />)}
        </span>
        <span className={cx('min-w-0 flex-1 break-words text-base leading-6 text-home-midnight', TRENNUNG)}>{schuetzeKinder(children)}</span>
      </span>
    </label>
  );
}

export const eingabeKlasse = `${FOKUS} block min-h-12 w-full min-w-0 rounded-xl border-2 border-slate-500 bg-white px-4 py-3 text-base text-home-midnight placeholder:text-slate-500 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-600 aria-[invalid=true]:border-rose-600`;

// data-fehlerblock: Bei offenen Punkten holt die Seite diesen ganzen Block
// samt Fehlertext über die feste Leiste ins Bild. nachFehler steht hinter dem
// Fehlertext (etwa ein Link, der zum Fehler gehört).
export function Field({ id, label, hint, error, children, nachFehler }) {
  return (
    <div className="min-w-0" data-fehlerblock="">
      <label htmlFor={id} className="block font-display text-base font-extrabold text-home-midnight">{schuetze(label)}</label>
      {hint && <p id={`${id}-hinweis`} className="mt-0.5 text-base leading-6 text-home-slate">{schuetze(hint)}</p>}
      <div className="mt-1.5">{children}</div>
      <FehlerText id={`${id}-fehler`}>{error}</FehlerText>
      {nachFehler}
    </div>
  );
}

export function fieldAria(id, { hint, error }) {
  const ids = [hint && `${id}-hinweis`, error && `${id}-fehler`].filter(Boolean).join(' ');
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': ids || undefined,
  };
}

// Abschnitt mit fetter Überschrift für Auswahlgruppen (Radio oder Checkbox).
// fehlerId gehört an jedes Feld der Gruppe (describedBy), damit der Fehler
// beim Fokus vorgelesen wird. Der Fehler steht direkt unter der Legende, damit
// er bei langen Listen und am kleinen Handy nicht unter der Leiste liegt.
// nachHinweis steht unter dem Hinweis (etwa eine ruhige Zeile ohne Fehlerfarbe).
export function Gruppe({
  id, legend, hint, fehlerId, error, children, className, nachHinweis,
}) {
  return (
    <fieldset id={id} className={cx('min-w-0', className)} data-fehlerblock="">
      <legend className="font-display text-base font-extrabold leading-snug text-home-midnight">{schuetze(legend)}</legend>
      {hint && <p className="mt-0.5 text-base leading-6 text-home-slate">{schuetze(hint)}</p>}
      {nachHinweis}
      <FehlerText id={fehlerId}>{error}</FehlerText>
      <div className="mt-2">{children}</div>
    </fieldset>
  );
}

// Aufklappbarer Text (natives details): Tastatur und Screenreader bedienen
// ihn ohne eigene Logik.
// schlicht: als ruhiger Textlink ohne Kastenrahmen, damit er in Teil 2 nicht
// wie ein Haken aussieht (Frank-Blick 16.10.2026). Tippfläche bleibt ab 48 px.
export function Aufklapper({
  titel, children, className, schlicht = false,
}) {
  if (schlicht) {
    return (
      <details className={cx('group', className)}>
        <summary className={`${FOKUS} inline-flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-lg font-semibold text-emerald-800 underline underline-offset-4 [&::-webkit-details-marker]:hidden`}>
          <span className={cx('min-w-0 break-words', TRENNUNG)}>{schuetzeKinder(titel)}</span>
          <span aria-hidden="true" className="no-underline transition group-open:rotate-180 motion-reduce:transition-none">▾</span>
        </summary>
        <div className={cx('mt-1 space-y-3 break-words border-l-4 border-slate-300 pl-3 text-base leading-7 text-home-midnight', TRENNUNG)}>{children}</div>
      </details>
    );
  }
  return (
    <details className={cx('group rounded-[1.2rem] border-2 border-slate-400 bg-white', className)}>
      <summary className={`${FOKUS} flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-[1.1rem] px-4 py-2 font-display text-base font-extrabold leading-snug text-home-midnight [&::-webkit-details-marker]:hidden`}>
        <span className={cx('min-w-0 break-words', TRENNUNG)}>{schuetzeKinder(titel)}</span>
        <span aria-hidden="true" className="text-xl leading-none transition group-open:rotate-45 motion-reduce:transition-none">+</span>
      </summary>
      <div className={cx('space-y-3 break-words px-4 pb-4 text-base leading-7 text-home-midnight', TRENNUNG)}>{children}</div>
    </details>
  );
}
