import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');

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
];

const registryPath = path.join(rootDir, 'src/components/ui/healioSoftClayIcons.js');
assert.ok(fs.existsSync(registryPath), 'Die Healio-Soft-Clay-Registry fehlt.');

const registrySource = fs.readFileSync(registryPath, 'utf8');
const registeredIcons = Object.fromEntries(
  [...registrySource.matchAll(/'([^']+)':\s*'([^']+\.webp)'/g)].map((match) => [match[1], match[2]]),
);

assert.deepEqual(
  Object.keys(registeredIcons).sort(),
  [...expectedIcons].sort(),
  'Die Soft-Clay-Registry muss exakt den freigegebenen ersten Icon-Satz enthalten.',
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

const friendlyIcon = readText('src/components/ui/FriendlyIcon.jsx');
assert.match(friendlyIcon, /healioSoftClayIcons/);
assert.match(friendlyIcon, /<img/);
assert.match(friendlyIcon, /alt=""/);
assert.match(friendlyIcon, /aria-hidden="true"/);
assert.match(friendlyIcon, /width="192"/);
assert.match(friendlyIcon, /height="192"/);
assert.match(friendlyIcon, /loading="lazy"/);
assert.match(friendlyIcon, /decoding="async"/);

const targetFiles = [
  'src/components/home/InsurancePathway.jsx',
  'src/components/home/HowHealioWorks.jsx',
  'src/components/home/AmbulantBudgetFeature.jsx',
  'src/components/home/HomeTrust.jsx',
  'src/components/company/CompanySolutions.jsx',
  'src/components/company/CompanyProcess.jsx',
  'src/components/company/CompanyEconomics.jsx',
];

for (const targetFile of targetFiles) {
  const source = readText(targetFile);
  assert.match(source, /(?:<FriendlyIcon|productIllustrations)/, `${targetFile} bindet keine Soft-Clay-Icons ein.`);
  assert.doesNotMatch(source, /emoji\s*=/, `${targetFile} verwendet noch die alte Emoji-Prop.`);
  assert.doesNotMatch(source, /\p{Extended_Pictographic}/u, `${targetFile} enthält noch ein natives Emoji.`);

  const requestedIcons = [
    ...[...source.matchAll(/\bicon:\s*'([^']+)'/g)].map((match) => match[1]),
    ...[...source.matchAll(/\bicon="([^"]+)"/g)].map((match) => match[1]),
    ...[...source.matchAll(/const\s+\w*Icons\s*=\s*\[([\s\S]*?)\];/g)]
      .flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1])),
  ];
  for (const requestedIcon of requestedIcons) {
    assert.ok(registeredIcons[requestedIcon], `${targetFile} fordert die unbekannte Icon-ID ${requestedIcon} an.`);
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

for (const iconName of expectedIcons) {
  const used = homeSource.includes(`'${iconName}'`) || companySource.includes(`'${iconName}'`);
  assert.ok(used, `${iconName} ist registriert, aber in der ersten Ausbaustufe ungenutzt.`);
}

console.log('Friendly icon contract passed.');
