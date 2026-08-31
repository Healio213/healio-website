import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const modulePath = fileURLToPath(import.meta.url);
const defaultRootDir = path.resolve(path.dirname(modulePath), '..');

export const RELEASE_ROUTES = [
  { path: '/', canonical: 'https://healio.de' },
  { path: '/ambulant', canonical: 'https://healio.de/ambulant' },
  { path: '/zahn', canonical: 'https://healio.de/zahn' },
  { path: '/stationaer', canonical: 'https://healio.de/stationaer' },
  { path: '/tierkrankenversicherung', canonical: 'https://healio.de/tierkrankenversicherung' },
  { path: '/unternehmen', canonical: 'https://healio.de/unternehmen' },
  { path: '/kassenboost', canonical: 'https://healio.de/kassenboost' },
  { path: '/kassenbonus', canonical: 'https://healio.de/kassenbonus' },
  { path: '/about', canonical: 'https://healio.de/about' },
  { path: '/zahnaerzte', canonical: 'https://healio.de/zahnaerzte' },
];

const AI_SEARCH_AGENTS = ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot'];

function routeFile(distDir, routePath) {
  return routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

function read(file, errors, label) {
  if (!fs.existsSync(file)) {
    errors.push(`${label} fehlt: ${path.basename(file)}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function canonicalLinks(html) {
  return [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)].map((match) => (
    match[0].match(/href=["']([^"']+)["']/i)?.[1] || ''
  ));
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function agentIsAllowed(robots, agent) {
  const blocks = robots.split(/(?=^User-agent:\s*)/gim);
  return blocks.some((block) => {
    const declaredAgent = block.match(/^User-agent:\s*([^\r\n]+)/im)?.[1]?.trim();
    if (declaredAgent !== agent) return false;
    return /^Allow:\s*\/\s*$/im.test(block) && !/^Disallow:\s*\/\s*$/im.test(block);
  });
}

export function validateReleaseArtifacts({ rootDir = defaultRootDir, routes = RELEASE_ROUTES } = {}) {
  const errors = [];
  const distDir = path.join(rootDir, 'dist');
  const robots = read(path.join(distDir, 'robots.txt'), errors, 'robots.txt');
  const sitemap = read(path.join(distDir, 'sitemap.xml'), errors, 'sitemap.xml');
  const llms = read(path.join(distDir, 'llms.txt'), errors, 'llms.txt');
  const releaseJson = read(path.join(distDir, 'release.json'), errors, 'Release-Nachweis');

  if (releaseJson) {
    try {
      const release = JSON.parse(releaseJson);
      if (
        release.site !== 'healio.de'
        || release.source !== 'github.com/Healio213/healio-website'
        || !/^[a-f0-9]{40}$/.test(release.commitSha || '')
        || typeof release.branch !== 'string'
        || release.branch.length === 0
        || !Number.isFinite(Date.parse(release.builtAt))
      ) {
        errors.push('Release-Nachweis enthält nicht die erwartete Quelle und Commit-SHA.');
      }
    } catch {
      errors.push('Release-Nachweis ist kein gültiges JSON.');
    }
  }

  for (const agent of AI_SEARCH_AGENTS) {
    if (!agentIsAllowed(robots, agent)) {
      errors.push(`KI-Suchcrawler ${agent} ist nicht ausdrücklich erlaubt.`);
    }
  }

  if (!/Sitemap:\s*https:\/\/healio\.de\/sitemap\.xml/i.test(robots)) {
    errors.push('robots.txt verweist nicht auf die kanonische Sitemap.');
  }

  for (const route of routes) {
    const html = read(routeFile(distDir, route.path), errors, `HTML für ${route.path}`);
    if (!html) continue;

    const canonicals = canonicalLinks(html);
    if (canonicals.length !== 1 || canonicals[0] !== route.canonical) {
      errors.push(`${route.path}: Canonical ist nicht eindeutig ${route.canonical}.`);
    }
    if (/<meta\b[^>]*(?:name=["']robots["'][^>]*content=["'][^"']*noindex|content=["'][^"']*noindex[^>]*name=["']robots["'])/i.test(html)) {
      errors.push(`${route.path}: kritische Verkaufsseite ist noindex.`);
    }
    if ((html.match(/<h1\b/gi) || []).length !== 1) {
      errors.push(`${route.path}: es muss genau eine H1 vorhanden sein.`);
    }
    if (visibleText(html).length < 180) {
      errors.push(`${route.path}: vorgerenderter Inhalt ist zu kurz.`);
    }

    const sitemapUrl = route.canonical === 'https://healio.de'
      ? 'https://healio.de/'
      : route.canonical;
    const escapedUrl = sitemapUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sitemapEntry = new RegExp(
      `<url>[\\s\\S]*?<loc>${escapedUrl}<\\/loc>[\\s\\S]*?<lastmod>\\d{4}-\\d{2}-\\d{2}<\\/lastmod>[\\s\\S]*?<\\/url>`,
      'i',
    );
    if (!sitemapEntry.test(sitemap)) {
      errors.push(`${route.path}: fehlt mit gültigem lastmod in der Sitemap.`);
    }
    if (!llms.includes(route.canonical)) {
      errors.push(`${route.path}: fehlt in llms.txt.`);
    }
  }

  if (!/^#\s+HEALIO\b/im.test(llms) || llms.length < 500) {
    errors.push('llms.txt enthält keine belastbare Healio-Zusammenfassung.');
  }

  return { errors, checkedRoutes: routes.length };
}

function main() {
  const result = validateReleaseArtifacts();
  if (result.errors.length) {
    console.error(`[release-artifacts] FEHLER (${result.errors.length}):`);
    result.errors.forEach((error) => console.error(`  - ${error}`));
    process.exitCode = 1;
    return;
  }
  console.log(`[release-artifacts] ok: ${result.checkedRoutes} kritische Seiten sowie SEO-/GEO-Dateien geprüft.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  main();
}
