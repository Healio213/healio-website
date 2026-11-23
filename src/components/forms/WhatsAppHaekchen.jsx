import React from 'react';
import { hatTelefon, whatsappText } from '@/lib/whatsapp-nita';

/**
 * Freiwilliges, nicht vorausgewähltes WhatsApp-Häkchen. Sichtbar erst, wenn eine
 * Telefonnummer eingetragen ist. Die ganze Zeile ist tippbar.
 *
 * variant "tailwind": wie das Einwilligungs-Häkchen der Kurzchecks.
 * variant "rueckruf": nutzt die Klassen des Rückruf-Hinweises.
 */
const WhatsAppHaekchen = ({ phone, checked, onChange, id = 'whatsapp-nita', lang = 'de', variant = 'tailwind', disabled = false }) => {
  if (!hatTelefon(phone)) return null;
  const text = whatsappText(lang);

  if (variant === 'rueckruf') {
    return (
      <div className="healio-rueckruf-consent" data-whatsapp-haekchen>
        <label htmlFor={id}>
          <input id={id} name="whatsapp" type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} />
          <span>{text}</span>
        </label>
      </div>
    );
  }

  return (
    <div data-whatsapp-haekchen>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm leading-6 text-slate-600">
        <input
          id={id}
          name="whatsapp"
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded border-slate-300 text-home-mint focus:ring-home-mint"
        />
        <span>{text}</span>
      </label>
    </div>
  );
};

export default WhatsAppHaekchen;
