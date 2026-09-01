import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoRoutes } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultDistDir = path.resolve(__dirname, '..', 'dist');
const MIN_INDEXABLE_TEXT_LENGTH = 180;

export function routeToHtmlPath(distDir, routePath) {
  return routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

export function isNoindexRoute(route) {
  return /(?:^|[,\s])noindex(?:$|[,\s])/i.test(route.robots || '');
}

function getMetaRobots(html) {
  return html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["'][^>]*>/i)?.[1]
    || html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']robots["'][^>]*>/i)?.[1]
    || '';
}

function getRootMarkup(html) {
  const rootTag = /<div\s+[^>]*id=["']root["'][^>]*>/i.exec(html);
  if (!rootTag) return null;

  const rootStart = rootTag.index + rootTag[0].length;
  const bodyEnd = html.indexOf('</body>', rootStart);
  if (bodyEnd < 0) return null;

  return html.slice(rootStart, bodyEnd)
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .trim();
}

function getVisibleText(markup) {
  return markup
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validatePrerenderOutput({
  distDir = defaultDistDir,
  routes = seoRoutes,
  minIndexableTextLength = MIN_INDEXABLE_TEXT_LENGTH,
} = {}) {
  const errors = [];
  let checkedIndexable = 0;
  let checkedNoindex = 0;

  for (const route of routes) {
    const htmlPath = routeToHtmlPath(distDir, route.path);
    if (!fs.existsSync(htmlPath)) {
      errors.push(`${route.path}: HTML-Datei fehlt (${path.relative(distDir, htmlPath)})`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const robots = getMetaRobots(html);
    const noindex = isNoindexRoute(route);

    if (noindex) {
      checkedNoindex += 1;
      if (!/(?:^|[,\s])noindex(?:$|[,\s])/i.test(robots)) {
        errors.push(`${route.path}: konfigurierte noindex-Route wird nicht mit noindex ausgeliefert`);
      }
      continue;
    }

    checkedIndexable += 1;
    if (/(?:^|[,\s])noindex(?:$|[,\s])/i.test(robots)) {
      errors.push(`${route.path}: indexierbare Route wird irrtümlich mit noindex ausgeliefert`);
    }

    const rootMarkup = getRootMarkup(html);
    if (!rootMarkup) {
      errors.push(`${route.path}: #root fehlt oder ist leer`);
      continue;
    }

    const h1Count = (rootMarkup.match(/<h1\b/gi) || []).length;
    if (h1Count !== 1) {
      errors.push(`${route.path}: gerenderter #root enthält ${h1Count} H1 statt genau einer`);
    }

    const visibleText = getVisibleText(rootMarkup);
    if (visibleText.length < minIndexableTextLength) {
      errors.push(`${route.path}: gerenderter Inhalt ist zu kurz (${visibleText.length} sichtbare Zeichen)`);
    }
  }

  return { errors, checkedIndexable, checkedNoindex };
}

function main() {
  const result = validatePrerenderOutput();
  if (result.errors.length > 0) {
    console.error(`[prerender-check] FEHLER: ${result.errors.length} ungültige Route(n):`);
    result.errors.forEach((error) => console.error(`  - ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(
    `[prerender-check] ok: ${result.checkedIndexable} indexierbare und ${result.checkedNoindex} noindex-Routen geprüft.`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
