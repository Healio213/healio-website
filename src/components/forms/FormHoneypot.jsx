import React from 'react';

export const HONEYPOT_FIELD_NAME = 'healio_website';

export const isHoneypotFilled = (form) => {
  const field = form?.elements?.namedItem(HONEYPOT_FIELD_NAME);
  return typeof field?.value === 'string' && field.value.trim().length > 0;
};

const FormHoneypot = () => (
  <div className="sr-only" aria-hidden="true">
    <label htmlFor="healio-website">Website</label>
    <input
      id="healio-website"
      name={HONEYPOT_FIELD_NAME}
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  </div>
);

export default FormHoneypot;
