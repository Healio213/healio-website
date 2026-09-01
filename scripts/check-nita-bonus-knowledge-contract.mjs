import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const fileUrl = new URL("../public/mia-knowledge-base.txt", import.meta.url);
const knowledge = await readFile(fileUrl, "utf8");
const beginPattern = /<!-- BEGIN GENERATED:NITA_BONUS version=([^ ]+) sourceSha256=([a-f0-9]{64}) renderSha256=([a-f0-9]{64}) -->/g;
const endPattern = /<!-- END GENERATED:NITA_BONUS -->/g;
const begins = [...knowledge.matchAll(beginPattern)];
const ends = [...knowledge.matchAll(endPattern)];

assert.equal(begins.length, 1, "Die öffentliche Nita-KB braucht genau einen generierten Bonusblock.");
assert.equal(ends.length, 1, "Der generierte Bonusblock muss genau einmal enden.");

const [beginMarker, version, , expectedRenderHash] = begins[0];
const start = begins[0].index;
const end = ends[0].index + ends[0][0].length;
assert.ok(start < end, "Die Bonusmarker stehen in falscher Reihenfolge.");

const generatedBlock = knowledge.slice(start, end);
const canonicalBlock = generatedBlock.replace(
  beginMarker,
  `<!-- BEGIN GENERATED:NITA_BONUS version=${version} -->`,
);
const actualRenderHash = createHash("sha256").update(canonicalBlock, "utf8").digest("hex");
assert.equal(actualRenderHash, expectedRenderHash, "Der veröffentlichte Bonusblock wurde manuell verändert.");

assert.match(generatedBlock, /700 EUR\+ zweckgebundenes Zuschusspotenzial im passenden Fall/);
assert.match(generatedBlock, /entweder[\s\S]*Geldbonus[\s\S]*oder[\s\S]*zweckgebundenen Zuschuss/i);
assert.match(generatedBlock, /31\. März 2027/);

for (const forbidden of [
  /700 (?:EUR|Euro) Geldbonus/i,
  /einfach angeben und Bonus kassieren/i,
  /komplett steuerfrei/i,
  /Osteopathie[^\n]*(?:120 EUR|120 Euro)/i,
  /Zahnreinigung[^\n]*(?:50 EUR|50 Euro)/i,
  /Apple Watch[^\n]*(?:180 EUR|180 Euro)/i,
  /3\.000 (?:EUR|Euro) für Heilpraktiker/i,
]) {
  assert.doesNotMatch(knowledge, forbidden);
}

console.log(`Nita-Bonuswissen ${version}: Website-Vertrag erfüllt.`);
