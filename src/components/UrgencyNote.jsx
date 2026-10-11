import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

// Dezente Dringlichkeitszeile unter dem Hauptknopf im Kopfbereich (Frank 11.10.2026).
// Jahr und Monatsweiche kommen aus dem Datum im Browser. Beim Vorab-Rendern steht
// ein unsichtbarer Platzhalter mit dem längsten Text, damit nichts springt und es
// keinen Hydrationsfehler gibt.
const TEXTS = {
  zahn: 'Versichert ist nur, was beim Abschluss noch nicht angeraten ist. Jeder Zahnarzttermin kann das ändern.',
  stationaer: 'Den Klinikschutz bekommst du, solange du gesund bist. Eine neue Diagnose kann den Abschluss verhindern.',
  schwangerschaft: 'Vorsorge zahlt der ambulante Schutz ab Abschluss. Für dein Baby muss der Klinikschutz rechtzeitig stehen.',
};

const ambulantText = (date) => (date.getMonth() >= 9
  ? `Bonus ${date.getFullYear()}: Vorsorge, Kurse und Sport zählen nur, wenn sie noch dieses Jahr stattfinden. Der ambulante Schutz hat keine Wartezeit.`
  : 'Der ambulante Schutz hat keine Wartezeit. Vorsorge zahlt er ab dem ersten Versicherungstag.');

const UrgencyNote = ({ surface, tone = 'dark', className = '' }) => {
  const [text, setText] = useState(null);
  useEffect(() => {
    setText(surface === 'ambulant' ? ambulantText(new Date()) : TEXTS[surface] || null);
  }, [surface]);
  if (!TEXTS[surface] && surface !== 'ambulant') return null;
  const colour = tone === 'light' ? 'text-home-slate' : 'text-white/90';
  const placeholder = surface === 'ambulant' ? ambulantText(new Date('2026-10-01T12:00:00')) : TEXTS[surface];
  return (
    <p
      data-urgency-note={surface}
      className={`mt-3 flex max-w-xl items-start gap-2 text-left text-sm leading-6 ${colour} ${className}`}
    >
      <Clock className={`mt-1 h-4 w-4 shrink-0 ${tone === 'light' ? 'text-[#087654]' : 'text-[#5ee0b1]'}`} aria-hidden="true" />
      <span className={text ? undefined : 'invisible'}>{text || placeholder}</span>
    </p>
  );
};

export default UrgencyNote;
