import { build } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// A review artifact, never a production release. Keep it separate from dist.
process.env.VITE_GUIDED_CALLBACK_PREVIEW = 'true';
const outputDir = path.resolve('dist-guided-preview');
await build({ build: { outDir: outputDir } });
const indexPath = path.join(outputDir, 'index.html');
const html = await readFile(indexPath, 'utf8');
const robotsTag = '<meta name="robots" content="noindex, nofollow">';
const guardedHtml = /<meta\s+name=["']robots["'][^>]*>/i.test(html)
  ? html.replace(/<meta\s+name=["']robots["'][^>]*>/i, robotsTag)
  : html.replace('</head>', `${robotsTag}\n</head>`);
await writeFile(indexPath, guardedHtml, 'utf8');
await writeFile(path.join(outputDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
console.log('Guided preview built in dist-guided-preview. No publishing performed.');
