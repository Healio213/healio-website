import assert from 'node:assert/strict';
import { article as frauen } from '../src/content/ratgeber/vorsorgeuntersuchung-frauen.js';
import { article as ohneWartezeit } from '../src/content/ratgeber/zahnzusatzversicherung-ohne-wartezeit.js';
import { article as lohntSich } from '../src/content/ratgeber/zahnzusatzversicherung-lohnt-sich.js';
import { article as gesundheitsfragen } from '../src/content/ratgeber/krankenzusatzversicherung-ohne-gesundheitsfragen-2026.js';
import { article as vorsorge } from '../src/content/ratgeber/vorsorgeuntersuchung.js';
import { article as einzelzimmer } from '../src/content/ratgeber/zusatzversicherung-einzelzimmer.js';

const sdkAvb = 'https://gesundwerker.sdk.de/downloads/Bedingungen/1-751.pdf';
const sofortQuelle = 'https://www.diebayerische.de/zahn-sofort/laufende-behandlung/';
assert.doesNotMatch(JSON.stringify(frauen), /Für eine schon festgestellte Schwangerschaft ist laut Seite der Vorsorge-Topf der SDK der richtige Weg/, 'Bestehende Schwangerschaft ist kein pauschaler neuer SDK-Deckungsweg');
const schwangerschaft = frauen.sections.flatMap((section) => section.blocks).find((block) => block.text?.includes('bereits bestehenden Schwangerschaft'))?.text || '';
assert.match(schwangerschaft, /individuell/);
assert.match(schwangerschaft, /bereits eingetretene Versicherungsfälle/);
assert.ok(frauen.sources.items.some((source) => source.href === sdkAvb));
assert.equal(frauen.updatedAt, '2026-10-27');
assert.doesNotMatch(JSON.stringify(gesundheitsfragen), /in keinem neuen Vertrag|zahlt kein neuer Vertrag|findet keinen Vertrag/, 'SDK-Grenze darf nicht zu einem Verbot aller spezialisierten Tarife werden');
const laufend = gesundheitsfragen.sections.find((section) => section.id === 'laufende-behandlung');
assert.match(JSON.stringify(laufend), /SDK/);
assert.match(JSON.stringify(laufend), /ZAHN Sofort/);
assert.match(JSON.stringify(laufend), /Bedingungen/);
assert.match(gesundheitsfragen.faqs.find((faq) => faq.question.startsWith('Zahlt die Versicherung meine laufende')).answer, /SDK/);
assert.ok(gesundheitsfragen.sources.items.some((source) => source.href === sofortQuelle));
assert.equal(gesundheitsfragen.updatedAt, '2026-10-27');
for (const article of [ohneWartezeit, lohntSich]) {
  assert.equal(/(?:länger|laenger).*?wieder versichert|liegt das länger zurück, ist sie wieder versichert/i.test(JSON.stringify(article)), false, article.slug + ': ältere Empfehlung ist keine automatische Deckung');
  assert.match(JSON.stringify(article), /aktuell beabsichtigte oder laufende Behandlung nicht automatisch versichert/);
  assert.equal(article.updatedAt, '2026-10-27');
  assert.ok(article.sources.items.some((source) => source.href === 'https://www.ukv.de/v/krankenversicherung/krankenzusatzversicherung/zahnzusatzversicherung.html'));
}
for (const article of [vorsorge, frauen]) {
  const text = JSON.stringify(article);
  assert.doesNotMatch(text, /Beschlossen ist (?:sie|das) nicht|beschlossen ist sie nicht|Ob die Altersgrenze sinkt, ist nicht entschieden/);
  assert.match(text, /15\.10\.2026/);
  assert.match(text, /noch nicht in Kraft/);
  assert.match(text, /voraussichtlich ab 1\. August 2027/);
  assert.ok(article.sources.items.some((source) => source.href === 'https://www.g-ba.de/beschluesse/8061/'));
  assert.ok(article.sources.items.some((source) => source.href === 'https://www.g-ba.de/presse/pressemitteilungen-meldungen/1356/'));
  assert.equal(article.updatedAt, '2026-10-27');
}
assert.equal(einzelzimmer.sections[0].blocks[0].text.includes('im nächstgelegenen Krankenhaus'), false, 'GKV-Klinikwahl nicht auf das nächste Krankenhaus begrenzen');
assert.match(einzelzimmer.sections[0].blocks[0].text, /zugelassenen Krankenhäusern/);
assert.match(einzelzimmer.sections[0].blocks[0].text, /Mehrkosten/);
assert.ok(einzelzimmer.sources.items.some((source) => source.href === 'https://www.gesetze-im-internet.de/sgb_5/__39.html'));
console.log('Ratgeber-Beginn: Schwangerschaft, Sondertarife, UKV-Grenzen, Mammographie-Beschluss und gesetzliche Klinikwahl mit Primärbelegen geprüft.');
