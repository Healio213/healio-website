/**
 * Absicherung des Baus gegen Hänger der Content-API (app.healio.de).
 *
 * Normalfall: Die Antworten kommen wie bisher live von der API.
 * Störfall: Jeder Abruf wird bis zu dreimal mit Zeitgrenze versucht. Bleibt
 * die API stumm oder antwortet mit 5xx, bedient der Bau die Artikelabrufe aus
 * dem im Repo abgelegten Schnappschuss `public/data/blog-articles-cache.json`
 * und schreibt eine deutliche Warnung (welche Abrufe, wie alt der Stand).
 * Fehlt der Schnappschuss oder ein benötigter Artikel darin, wird das als
 * Fehler gemeldet, damit der Bau abbricht statt leere Seiten zu bauen.
 *
 * Aufgefrischt wird der Schnappschuss nur bewusst mit `npm run sync:blog-cache`
 * (schreibt auch den Stand-Zeitstempel). Ein normaler Bau verändert keine
 * Dateien im Arbeitsbaum.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SNAPSHOT_PATH = path.join(rootDir, 'public', 'data', 'blog-articles-cache.json');
export const SNAPSHOT_STAND_PATH = path.join(rootDir, 'scripts', 'data', 'blog-articles-cache-stand.json');

const ARTICLES_PATH = '/api/v1/content/articles';
const DEFAULT_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 8000;
const RETRY_DELAYS_MS = [1000, 2000];
const SNAPSHOT_OLD_DAYS = 14;

/**
 * Testschalter nur für lokale Proben: lenkt die Content-API auf eine andere
 * Adresse (z. B. eine nicht antwortende lokale). Auf Vercel und in CI wird er
 * ignoriert, damit er nie versehentlich einen echten Bau verbiegt.
 */
export function resolveContentApiOrigin(defaultOrigin) {
  const override = process.env.HEALIO_BUILD_TEST_CONTENT_API_ORIGIN;
  if (!override) return defaultOrigin.replace(/\/$/, '');
  if (process.env.VERCEL || process.env.CI) {
    console.warn('[content-api] Testschalter HEALIO_BUILD_TEST_CONTENT_API_ORIGIN wird auf Vercel/CI ignoriert.');
    return defaultOrigin.replace(/\/$/, '');
  }
  console.warn(`[content-api] TESTSCHALTER AKTIV: Content-API zeigt auf ${override}`);
  return override.replace(/\/$/, '');
}

function readStandTimestamp() {
  try {
    const stand = JSON.parse(fs.readFileSync(SNAPSHOT_STAND_PATH, 'utf8'));
    const time = Date.parse(stand?.refreshedAt || '');
    if (Number.isFinite(time)) return { time, source: 'Stand-Datei' };
  } catch {
    // Stand-Datei fehlt oder ist kaputt: auf Git-Zeit ausweichen.
  }
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', SNAPSHOT_PATH], {
      cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const time = Date.parse(out);
    if (Number.isFinite(time)) return { time, source: 'letzter Git-Commit der Datei' };
  } catch {
    // Kein Git verfügbar.
  }
  return null;
}

export function describeSnapshotAge(now = Date.now()) {
  const stand = readStandTimestamp();
  if (!stand) return { text: 'Alter unbekannt (kein Zeitstempel gefunden)', days: null };
  const days = Math.floor((now - stand.time) / 86400000);
  const date = new Date(stand.time).toISOString().slice(0, 16).replace('T', ' ');
  const old = days >= SNAPSHOT_OLD_DAYS ? `, ÄLTER ALS ${SNAPSHOT_OLD_DAYS} TAGE` : '';
  return { text: `Stand ${date} UTC, ${days} Tag(e) alt${old} (Quelle: ${stand.source})`, days };
}

// Der Schnappschuss speichert Zeitpunkte im Postgres-Format
// ("2026-10-27 14:58:27.48+00"), die Content-API liefert ISO 8601
// ("2026-10-27T14:58:27.48+00:00"). Für identisches Markup (z. B. JSON-LD)
// wird im Störfall auf das API-Format gebracht.
const POSTGRES_UTC_TIMESTAMP = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}(?:\.\d+)?)\+00$/;
export function normalizeSnapshotArticle(article) {
  if (!article || typeof article !== 'object') return article;
  const result = { ...article };
  for (const field of ['published_at', 'updated_at', 'created_at']) {
    if (typeof result[field] === 'string') {
      result[field] = result[field].replace(POSTGRES_UTC_TIMESTAMP, '$1T$2+00:00');
    }
  }
  return result;
}

export function loadSnapshotArticles() {
  if (!fs.existsSync(SNAPSHOT_PATH)) return null;
  const articles = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
  return Array.isArray(articles) ? articles.map(normalizeSnapshotArticle) : null;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Holt eine URL mit Zeitgrenze und Wiederholung. 4xx gilt als echte Antwort
 * (kein Wiederholen), Netzfehler, Zeitüberschreitung und 5xx werden wiederholt.
 * Liefert { status, contentType, body } oder wirft nach dem letzten Versuch.
 */
export async function fetchWithRetry(url, {
  attempts = DEFAULT_ATTEMPTS,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  label = 'content-api',
} = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (response.status >= 500) throw new Error(`HTTP ${response.status}`);
      const body = Buffer.from(await response.arrayBuffer());
      return {
        status: response.status,
        contentType: response.headers.get('content-type') || 'application/json',
        body,
      };
    } catch (error) {
      lastError = error;
      const reason = error?.name === 'TimeoutError' ? `keine Antwort nach ${timeoutMs / 1000} s` : error.message;
      if (attempt < attempts) {
        console.warn(`[${label}] ${new URL(url).pathname}${new URL(url).search}: Versuch ${attempt}/${attempts} gescheitert (${reason}), neuer Versuch folgt.`);
        await sleep(RETRY_DELAYS_MS[attempt - 1] ?? 2000);
      } else {
        lastError = new Error(`${attempts} Versuche gescheitert, zuletzt: ${reason}`);
      }
    }
  }
  throw lastError;
}

/**
 * Proxy für die Prerender-Phase: bedient /api/v1/content/* live und weicht
 * im Störfall auf den Schnappschuss aus. Nach dem ersten endgültigen Ausfall
 * werden weitere Artikelabrufe sofort aus dem Schnappschuss bedient, damit die
 * Bauzeit im Störfall überschaubar bleibt.
 */
export function createContentApiProxy({ apiOrigin, label = 'prerender' }) {
  let apiDown = false;
  const substituted = [];
  const fatalErrors = [];
  let snapshotCache;

  const snapshot = () => {
    if (snapshotCache === undefined) snapshotCache = loadSnapshotArticles();
    return snapshotCache;
  };

  const json = (status, payload) => ({
    status,
    contentType: 'application/json',
    body: Buffer.from(JSON.stringify(payload)),
  });

  function fromSnapshot(pathAndQuery, reason) {
    const url = new URL(pathAndQuery, 'http://localhost');
    if (url.pathname !== ARTICLES_PATH) {
      fatalErrors.push(`${pathAndQuery}: Content-API nicht erreichbar (${reason}), kein Schnappschuss für diese Schnittstelle.`);
      return json(502, {});
    }
    const articles = snapshot();
    if (!articles || articles.length === 0) {
      fatalErrors.push(`${pathAndQuery}: Content-API nicht erreichbar (${reason}) und Schnappschuss ${path.relative(rootDir, SNAPSHOT_PATH)} fehlt oder ist leer.`);
      return json(503, { error: 'Content-API nicht erreichbar, kein Schnappschuss.' });
    }
    const slug = url.searchParams.get('slug');
    if (slug) {
      const article = articles.find((entry) => entry?.slug === slug);
      if (!article) {
        fatalErrors.push(`${pathAndQuery}: Content-API nicht erreichbar (${reason}) und Artikel "${slug}" fehlt im Schnappschuss.`);
        return json(503, { error: 'Artikel nicht im Schnappschuss.' });
      }
      substituted.push(`${pathAndQuery} (${reason})`);
      return json(200, { article });
    }
    substituted.push(`${pathAndQuery} (${reason})`);
    // Die API sortiert die Liste nach Anlagedatum, neueste zuerst.
    const ordered = articles.every((entry) => Number.isFinite(Date.parse(entry?.created_at || '')))
      ? [...articles].sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))
      : articles;
    return json(200, { articles: ordered });
  }

  async function handle(pathAndQuery) {
    if (apiDown) return fromSnapshot(pathAndQuery, 'API bereits als ausgefallen erkannt');
    try {
      return await fetchWithRetry(`${apiOrigin}${pathAndQuery}`, { label });
    } catch (error) {
      apiDown = true;
      console.warn(`[${label}] WARNUNG: Content-API ausgefallen (${error.message}). Artikelabrufe kommen ab jetzt aus dem Schnappschuss.`);
      return fromSnapshot(pathAndQuery, error.message);
    }
  }

  function report() {
    if (substituted.length === 0) return;
    const unique = [...new Set(substituted)];
    console.warn(
      `\n[${label}] ================= WARNUNG: SCHNAPPSCHUSS VERWENDET =================\n`
      + `[${label}] Die Content-API (${apiOrigin}) war nicht erreichbar. ${substituted.length} Abruf(e) kamen aus\n`
      + `[${label}] ${path.relative(rootDir, SNAPSHOT_PATH)}, ${describeSnapshotAge().text}.\n`
      + unique.map((entry) => `[${label}]   - ${entry}`).join('\n')
      + `\n[${label}] Sobald die API wieder läuft: neu bauen; bei neuen Artikeln vorher \`npm run sync:blog-cache\`.\n`
      + `[${label}] ======================================================================\n`,
    );
  }

  /** Einmal vor dem ersten Seitenaufruf: erkennt einen Ausfall, bevor eine
   * Seite darauf wartet (sonst laufen dort zeitgesteuerte Elemente weiter). */
  async function preflight() {
    const result = await handle(ARTICLES_PATH);
    // Der Vorab-Abruf selbst baut keine Seite; nur echte Seitenabrufe zählen.
    if (substituted.length > 0) substituted.pop();
    return result;
  }

  return { handle, preflight, report, fatalErrors };
}
