import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
const toRelativePath = (absolutePath) => path.relative(rootDir, absolutePath).split(path.sep).join('/');
const walkFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(directory, entry.name);
  return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
});

const expectedIcons = [
  'ambulant-care',
  'dental-protection',
  'hospital-comfort',
  'protection-path',
  'clear-comparison',
  'digital-completion',
  'personal-support',
  'independent-guidance',
  'ongoing-service',
  'pension-growth',
  'health-budget',
  'prevention-care',
  'concept-calculator',
  'team-introduction',
  'business-expense',
  'bonus-reward',
  'family-care',
  'document-check',
  'planet-care',
  'active-wellbeing',
  'pet-care',
];

const expectedFriendlyIcons = [
  'money',
  'bonus',
  'budget',
  'calculator',
  'family',
  'fitness',
  'smartwatch',
  'ambulant',
  'dental',
  'hospital',
  'support',
  'document',
  'region',
  'protection',
  'comparison',
  'switch',
  'privacy',
  'calendar',
  'glasses',
  'pregnancy',
  'prevention',
  'medication',
  'naturopathy',
];

const extractRegistry = (source, exportName) => {
  const registryMatch = source.match(new RegExp(`export const ${exportName} = Object\\.freeze\\(\\{([\\s\\S]*?)\\n\\}\\);`));
  assert.ok(registryMatch, `Die Registry ${exportName} fehlt.`);
  return Object.fromEntries(
    [...registryMatch[1].matchAll(/['"]?([a-z0-9-]+)['"]?\s*:\s*['"]([^'"]+\.webp)['"]/g)]
      .map((match) => [match[1], match[2]]),
  );
};

const registryPath = path.join(rootDir, 'src/components/ui/healioSoftClayIcons.js');
assert.ok(fs.existsSync(registryPath), 'Die Healio-Soft-Clay-Registry fehlt.');

const registrySource = fs.readFileSync(registryPath, 'utf8');
const registeredIcons = extractRegistry(registrySource, 'healioSoftClayIcons');
const registeredFriendlyIcons = extractRegistry(registrySource, 'friendlyIconAssets');

assert.deepEqual(
  Object.keys(registeredIcons).sort(),
  [...expectedIcons].sort(),
  'Die Soft-Clay-Registry muss exakt den freigegebenen ersten Icon-Satz enthalten.',
);

assert.deepEqual(
  Object.keys(registeredFriendlyIcons).sort(),
  [...expectedFriendlyIcons].sort(),
  'Die gemeinsame Friendly-Icon-Registry muss exakt den bestätigten 23er-Satz enthalten.',
);

for (const [iconName, publicPath] of Object.entries(registeredIcons)) {
  assert.match(publicPath, /^\/images\/icons\/healio-clay\/[a-z0-9-]+\.webp$/);
  const assetPath = path.join(rootDir, 'public', publicPath.replace(/^\//, ''));
  assert.ok(fs.existsSync(assetPath), `Das Icon ${iconName} fehlt unter ${publicPath}.`);

  const asset = fs.readFileSync(assetPath);
  assert.ok(asset.length > 0, `Das Icon ${iconName} ist leer.`);
  assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF', `${iconName} ist kein WebP.`);
  assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP', `${iconName} ist kein WebP.`);
  assert.equal(asset.subarray(12, 16).toString('ascii'), 'VP8X', `${iconName} braucht einen erweiterten WebP-Header.`);
  assert.ok(asset[20] & 0x10, `${iconName} braucht einen echten Alphakanal.`);
  const width = asset.readUIntLE(24, 3) + 1;
  const height = asset.readUIntLE(27, 3) + 1;
  assert.equal(width, 192, `${iconName} muss exakt 192 Pixel breit sein.`);
  assert.equal(height, 192, `${iconName} muss exakt 192 Pixel hoch sein.`);
  assert.ok(asset.length <= 30 * 1024, `${iconName} ist mit ${asset.length} Bytes zu groß.`);
}

for (const [iconName, publicPath] of Object.entries(registeredFriendlyIcons)) {
  assert.match(publicPath, /^\/images\/friendly-icons\/[a-z0-9-]+\.webp$/);
  const assetPath = path.join(rootDir, 'public', publicPath.replace(/^\//, ''));
  assert.ok(fs.existsSync(assetPath), `Das Friendly-Icon ${iconName} fehlt unter ${publicPath}.`);

  const asset = fs.readFileSync(assetPath);
  assert.ok(asset.length > 0, `Das Friendly-Icon ${iconName} ist leer.`);
  assert.equal(asset.subarray(0, 4).toString('ascii'), 'RIFF', `${iconName} ist kein WebP.`);
  assert.equal(asset.subarray(8, 12).toString('ascii'), 'WEBP', `${iconName} ist kein WebP.`);
  assert.ok(asset.length <= 64 * 1024, `${iconName} ist mit ${asset.length} Bytes zu groß.`);
}

const friendlyIcon = readText('src/components/ui/FriendlyIcon.jsx');
assert.match(friendlyIcon, /healioSoftClayIcons/);
assert.match(friendlyIcon, /friendlyIconAssets/);
assert.match(friendlyIcon, /legacyIconKindAliases/);
assert.match(friendlyIcon, /<img/);
assert.match(friendlyIcon, /alt=""/);
assert.match(friendlyIcon, /aria-hidden="true"/);
assert.match(friendlyIcon, /width="192"/);
assert.match(friendlyIcon, /height="192"/);
assert.match(friendlyIcon, /loading="lazy"/);
assert.match(friendlyIcon, /decoding="async"/);

const collectRequestedIcons = (source) => [
  ...[...source.matchAll(/\bicon:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]),
  ...[...source.matchAll(/\bicon=['"]([^'"]+)['"]/g)].map((match) => match[1]),
  ...[...source.matchAll(/const\s+\w*Icons\s*=\s*\[([\s\S]*?)\];/g)]
    .flatMap((match) => (
      match[1].includes(':')
        ? []
        : [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((entry) => entry[1])
    )),
];

const collectRequestedKinds = (source) => [
  ...[...source.matchAll(/\bkind=['"]([^'"]+)['"]/g)].map((match) => match[1]),
];

const assertKnownIconRequests = (relativePath, source) => {
  for (const requestedIcon of collectRequestedIcons(source)) {
    assert.ok(registeredIcons[requestedIcon], `${relativePath} fordert die unbekannte Icon-ID ${requestedIcon} an.`);
  }
  for (const requestedKind of collectRequestedKinds(source)) {
    assert.ok(registeredFriendlyIcons[requestedKind], `${relativePath} fordert den unbekannten Friendly-Kind ${requestedKind} an.`);
  }
};

const friendlyIconPath = 'src/components/ui/FriendlyIcon.jsx';
const publicSourceRoots = ['src/components', 'src/pages'];
const friendlyIconConsumerFiles = publicSourceRoots
  .flatMap((relativeDirectory) => walkFiles(path.join(rootDir, relativeDirectory)))
  .filter((absolutePath) => /\.(?:js|jsx)$/.test(absolutePath))
  .map(toRelativePath)
  .filter((relativePath) => relativePath !== friendlyIconPath)
  .filter((relativePath) => readText(relativePath).includes('FriendlyIcon'))
  .sort();

assert.ok(friendlyIconConsumerFiles.length > 0, 'Es wurden keine öffentlichen FriendlyIcon-Verwendungen gefunden.');

for (const targetFile of friendlyIconConsumerFiles) {
  const source = readText(targetFile);
  assert.doesNotMatch(source, /emoji\s*=/, `${targetFile} verwendet noch die alte Emoji-Prop.`);
  assert.doesNotMatch(source, /\p{Extended_Pictographic}/u, `${targetFile} enthält noch ein natives Emoji.`);
  assertKnownIconRequests(targetFile, source);
}

const rawUiIconFiles = [
  'src/components/sections/ambulant/AmbulantBonusCalculator.jsx',
  'src/components/sections/SocialProofSection.jsx',
  'src/components/sections/Videos.jsx',
  'src/pages/TikTokPage.jsx',
  'src/pages/InstagramPage.jsx',
];

for (const targetFile of rawUiIconFiles) {
  const source = readText(targetFile);
  assert.doesNotMatch(source, /\p{Extended_Pictographic}/u, `${targetFile} enthält noch ein rohes sichtbares UI-Emoji.`);
  assertKnownIconRequests(targetFile, source);
}

const socialPageFiles = ['src/pages/TikTokPage.jsx', 'src/pages/InstagramPage.jsx'];
for (const targetFile of socialPageFiles) {
  assert.doesNotMatch(
    readText(targetFile),
    /<span[^>]*>\s*\{card\.icon\}\s*<\/span>/s,
    `${targetFile} rendert card.icon noch als rohes Text-Emoji.`,
  );
}

const socialIconLocaleFiles = [
  'src/i18n/locales/de/tiktok.json',
  'src/i18n/locales/en/tiktok.json',
  'src/i18n/locales/de/instagram.json',
  'src/i18n/locales/en/instagram.json',
];

for (const targetFile of socialIconLocaleFiles) {
  const source = readText(targetFile);
  assert.doesNotMatch(source, /\p{Extended_Pictographic}/u, `${targetFile} enthält noch ein rohes Social-UI-Emoji.`);
  const locale = JSON.parse(source);
  for (const card of Object.values(locale.cards || {})) {
    if (!card.icon) continue;
    assert.ok(registeredIcons[card.icon], `${targetFile} fordert die unbekannte Icon-ID ${card.icon} an.`);
  }
}

const homeSource = [
  'src/components/home/InsurancePathway.jsx',
  'src/components/home/HowHealioWorks.jsx',
  'src/components/home/AmbulantBudgetFeature.jsx',
  'src/components/home/HomeTrust.jsx',
].map(readText).join('\n');
const companySource = [
  'src/components/company/CompanySolutions.jsx',
  'src/components/company/CompanyProcess.jsx',
  'src/components/company/CompanyEconomics.jsx',
].map(readText).join('\n');

const publicSource = friendlyIconConsumerFiles.map(readText).join('\n');
const requiredSemanticKinds = [
  'glasses',
  'pregnancy',
  'naturopathy',
  'prevention',
  'medication',
  'money',
  'bonus',
  'comparison',
  'ambulant',
  'dental',
  'hospital',
];

for (const kind of requiredSemanticKinds) {
  assert.match(publicSource, new RegExp(`['"]${kind}['"]`), `Der semantische Friendly-Kind ${kind} ist auf keiner öffentlichen Seite im Einsatz.`);
}

for (const iconName of expectedIcons) {
  const quotedIconIds = [`'${iconName}'`, `"${iconName}"`];
  const used = quotedIconIds.some((iconId) => homeSource.includes(iconId))
    || quotedIconIds.some((iconId) => companySource.includes(iconId))
    || quotedIconIds.some((iconId) => publicSource.includes(iconId))
    || socialIconLocaleFiles.some((targetFile) => readText(targetFile).includes(`"${iconName}"`));
  assert.ok(used, `${iconName} ist registriert, aber auf keiner öffentlichen Seite im Einsatz.`);
}

console.log('Friendly icon contract passed.');
