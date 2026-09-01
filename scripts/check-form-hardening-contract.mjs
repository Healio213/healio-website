import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const formFiles = [
  'src/components/sections/ContactFormSection.jsx',
  'src/pages/KontaktPage.jsx',
  'src/components/sections/DentalContactForm.jsx',
  'src/components/sections/HospitalContactForm.jsx',
  'src/components/sections/LeistungenContactForm.jsx',
  'src/components/sections/VeterinaryContactForm.jsx',
  'src/pages/PotenzialanalysePage.jsx',
];

const helper = read('src/components/forms/FormHoneypot.jsx');

if (!helper.includes('type="text"')) throw new Error('Der Honeypot muss ein normales Textfeld sein.');
if (!helper.includes('name={HONEYPOT_FIELD_NAME}')) throw new Error('Dem Honeypot fehlt der stabile Feldname.');
if (!helper.includes('tabIndex={-1}')) throw new Error('Der Honeypot darf nicht per Tastatur erreichbar sein.');
if (!helper.includes('autoComplete="off"')) throw new Error('Autocomplete muss für den Honeypot deaktiviert sein.');
if (!helper.includes('aria-hidden="true"')) throw new Error('Der Honeypot muss für Assistenztechnik verborgen sein.');
if (helper.includes('type="hidden"')) throw new Error('Ein type=hidden wird von einfachen Bots häufig ignoriert.');

for (const path of formFiles) {
  const source = read(path);
  if (!source.includes('FormHoneypot')) throw new Error(`${path}: Honeypot-Feld fehlt.`);
  if (!source.includes('isHoneypotFilled')) throw new Error(`${path}: Honeypot-Abbruch fehlt.`);

  const preventDefaultIndex = source.indexOf('.preventDefault()');
  const honeypotCheckIndex = source.indexOf('isHoneypotFilled(');
  if (preventDefaultIndex === -1 || honeypotCheckIndex < preventDefaultIndex) {
    throw new Error(`${path}: Honeypot muss direkt nach preventDefault geprüft werden.`);
  }
}

const fieldLimits = [
  ['src/components/sections/ContactFormSection.jsx', 'name="vorname"', 100],
  ['src/components/sections/ContactFormSection.jsx', 'name="nachname"', 100],
  ['src/components/sections/ContactFormSection.jsx', 'name="email"', 254],
  ['src/components/sections/ContactFormSection.jsx', 'name="telefon"', 40],
  ['src/components/sections/ContactFormSection.jsx', 'name="nachricht"', 4000],
  ['src/pages/KontaktPage.jsx', 'name="name"', 100],
  ['src/pages/KontaktPage.jsx', 'name="email"', 254],
  ['src/pages/KontaktPage.jsx', 'name="company"', 160],
  ['src/pages/KontaktPage.jsx', 'name="phone"', 40],
  ['src/pages/KontaktPage.jsx', 'name="message"', 4000],
  ['src/components/sections/DentalContactForm.jsx', 'name="name"', 100],
  ['src/components/sections/DentalContactForm.jsx', 'name="email"', 254],
  ['src/components/sections/DentalContactForm.jsx', 'name="phone"', 40],
  ['src/components/sections/HospitalContactForm.jsx', 'name="name"', 100],
  ['src/components/sections/HospitalContactForm.jsx', 'name="email"', 254],
  ['src/components/sections/HospitalContactForm.jsx', 'name="phone"', 40],
  ['src/components/sections/LeistungenContactForm.jsx', 'name="name"', 100],
  ['src/components/sections/LeistungenContactForm.jsx', 'name="email"', 254],
  ['src/components/sections/LeistungenContactForm.jsx', 'name="phone"', 40],
  ['src/components/sections/VeterinaryContactForm.jsx', 'name="name"', 100],
  ['src/components/sections/VeterinaryContactForm.jsx', 'name="email"', 254],
  ['src/components/sections/VeterinaryContactForm.jsx', 'name="breed"', 120],
  ['src/components/sections/VeterinaryContactForm.jsx', 'name="usage"', 200],
  ['src/pages/PotenzialanalysePage.jsx', 'id="name"', 100],
  ['src/pages/PotenzialanalysePage.jsx', 'id="company"', 160],
  ['src/pages/PotenzialanalysePage.jsx', 'id="email"', 254],
  ['src/pages/PotenzialanalysePage.jsx', 'id="phone"', 40],
];

for (const [path, marker, maxLength] of fieldLimits) {
  const source = read(path);
  const fieldStart = source.indexOf(marker);
  const nextField = source.indexOf('/>', fieldStart);
  const fieldSource = source.slice(fieldStart, nextField);
  if (fieldStart === -1 || nextField === -1 || !fieldSource.includes(`maxLength={${maxLength}}`)) {
    throw new Error(`${path}: ${marker} braucht maxLength={${maxLength}}.`);
  }
}

const app = read('src/App.jsx');
if (!app.includes('import.meta.env.DEV && entry.initiatorType')) {
  throw new Error('Slow-image console.warn muss auf import.meta.env.DEV begrenzt sein.');
}

console.log(`Form hardening contract: ${formFiles.length} Formulare geprüft.`);
