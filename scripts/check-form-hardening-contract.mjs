import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const traverse = traverseModule.default || traverseModule;
const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const sourceRoot = path.join(projectRoot, 'src');

const collectSourceFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(absolutePath);
    return /\.[jt]sx$/.test(entry.name) ? [absolutePath] : [];
  });

const formFiles = collectSourceFiles(sourceRoot)
  .filter((absolutePath) => /<form\b/.test(fs.readFileSync(absolutePath, 'utf8')))
  .map((absolutePath) => path.relative(projectRoot, absolutePath))
  .sort();

if (formFiles.length === 0) {
  throw new Error('Im produktiven Quellcode wurde kein HTML-Formular gefunden.');
}

const getStringAttribute = (openingElement, attributeName) => {
  const attribute = openingElement.attributes.find((candidate) => (
    candidate.type === 'JSXAttribute' && candidate.name.name === attributeName
  ));
  return attribute?.value?.type === 'StringLiteral' ? attribute.value.value : null;
};

const helper = read('src/components/forms/FormHoneypot.jsx');

if (!helper.includes('type="text"')) throw new Error('Der Honeypot muss ein normales Textfeld sein.');
if (!helper.includes('name={HONEYPOT_FIELD_NAME}')) throw new Error('Dem Honeypot fehlt der stabile Feldname.');
if (!helper.includes('tabIndex={-1}')) throw new Error('Der Honeypot darf nicht per Tastatur erreichbar sein.');
if (!helper.includes('autoComplete="off"')) throw new Error('Autocomplete muss für den Honeypot deaktiviert sein.');
if (!helper.includes('aria-hidden="true"')) throw new Error('Der Honeypot muss für Assistenztechnik verborgen sein.');
if (helper.includes('type="hidden"')) throw new Error('Ein type=hidden wird von einfachen Bots häufig ignoriert.');

for (const path of formFiles) {
  const source = read(path);
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  const forms = [];

  traverse(ast, {
    JSXElement(formPath) {
      if (formPath.node.openingElement.name.type !== 'JSXIdentifier'
        || formPath.node.openingElement.name.name !== 'form') return;

      let honeypotCount = 0;
      formPath.traverse({
        JSXOpeningElement(childPath) {
          if (childPath.node.name.type === 'JSXIdentifier'
            && childPath.node.name.name === 'FormHoneypot') honeypotCount += 1;
        },
      });

      forms.push({
        openingElement: formPath.node.openingElement,
        honeypotCount,
      });
    },
  });

  if (forms.length === 0) throw new Error(`${path}: Form-Erkennung ist inkonsistent.`);
  if (!source.includes('isHoneypotFilled')) throw new Error(`${path}: Honeypot-Abbruch fehlt.`);

  forms.forEach(({ openingElement, honeypotCount }, index) => {
    const formLabel = forms.length === 1 ? 'Formular' : `Formular ${index + 1}`;
    if (honeypotCount !== 1) {
      throw new Error(`${path}: ${formLabel} braucht genau ein Honeypot-Feld.`);
    }
    if (getStringAttribute(openingElement, 'method') !== 'post') {
      throw new Error(`${path}: ${formLabel} muss bei fehlendem JavaScript per POST absenden.`);
    }
    if (getStringAttribute(openingElement, 'action') !== '/kontakt') {
      throw new Error(`${path}: ${formLabel} braucht die sichere Same-Origin-Fallback-Action /kontakt.`);
    }
    const hasSubmitHandler = openingElement.attributes.some((attribute) => (
      attribute.type === 'JSXAttribute' && attribute.name.name === 'onSubmit'
    ));
    if (!hasSubmitHandler) {
      throw new Error(`${path}: ${formLabel} braucht einen JavaScript-Submit-Handler.`);
    }
  });

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
  ['src/components/sections/Contact.jsx', 'name="name"', 100],
  ['src/components/sections/Contact.jsx', 'name="company"', 160],
  ['src/components/sections/Contact.jsx', 'name="email"', 254],
  ['src/components/sections/Contact.jsx', 'name="phone"', 40],
  ['src/components/sections/veterinary/VeterinaryContact.jsx', 'name="name"', 100],
  ['src/components/sections/veterinary/VeterinaryContact.jsx', 'name="email"', 254],
  ['src/components/sections/veterinary/VeterinaryContact.jsx', 'name="animalType"', 120],
  ['src/components/sections/veterinary/VeterinaryContact.jsx', 'name="age"', 40],
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
