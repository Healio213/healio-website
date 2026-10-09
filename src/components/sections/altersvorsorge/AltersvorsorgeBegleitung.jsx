import React from 'react';
import AltersvorsorgeIllustration from './AltersvorsorgeIllustration';
import { werDahinter } from '@/content/altersvorsorgedepotContent';

/**
 * Abschnitt "Wer dich begleitet". Healio ist der Absender. Zwei Rollenkarten
 * (Webinar, Zuschuss-Check) tragen den Abschnitt allein.
 *
 * Porträts erscheinen nur, wenn content.team Einträge { name, rolle, foto }
 * hat. Dann stehen alle Karten gleich groß nebeneinander über den Rollenkarten.
 * Leer (Standard) = es wird gar nichts davon gezeigt. `content` lässt sich nur
 * für Tests tauschen.
 */
const AltersvorsorgeBegleitung = ({ content = werDahinter }) => {
  const team = Array.isArray(content.team) ? content.team : [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
          {content.ueberschrift}
        </h2>
        <p className="mt-5 text-base leading-7 text-slate-700">{content.text}</p>
      </div>

      {team.length > 0 && (
        <ul
          className="mx-auto mt-8 grid gap-3 sm:gap-5"
          style={{
            gridTemplateColumns: `repeat(${Math.min(team.length, 3)}, minmax(0, 1fr))`,
            maxWidth: `${Math.min(team.length, 3) * 16}rem`,
          }}
        >
          {team.map((person) => (
            <li
              key={person.name}
              className="flex flex-col items-center rounded-2xl border border-emerald-100 bg-[#f4faf7] p-3 text-center sm:p-5"
            >
              <img
                src={person.foto}
                alt={`Porträt von ${person.name}`}
                width={320}
                height={320}
                loading="lazy"
                className="aspect-square w-full max-w-[220px] rounded-2xl object-cover"
              />
              <p className="mt-4 font-display text-base font-extrabold leading-tight text-slate-950 sm:text-lg">{person.name}</p>
              <p className="mt-1 text-base leading-6 text-slate-600">{person.rolle}</p>
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {content.rollen.map((rolle) => {
          return (
            <li key={rolle.titel} className="rounded-2xl border border-emerald-100 bg-[#f4faf7] p-6">
              <AltersvorsorgeIllustration kind={rolle.icon} className="h-20 w-20" />
              <h3 className="mt-4 font-display text-lg font-extrabold text-slate-950">{rolle.titel}</h3>
              <p className="mt-2 text-base leading-7 text-slate-700">{rolle.text}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-center text-base leading-6 text-slate-500">{content.quellenzeile}</p>
    </div>
  );
};

export default AltersvorsorgeBegleitung;
