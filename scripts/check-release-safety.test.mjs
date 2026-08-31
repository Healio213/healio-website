import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  assertVercelReleaseContext,
  createReleaseBuildPlan,
} from './lib/release-safety.mjs';

const SHA = 'a'.repeat(40);

test('Vercel production accepts only approved GitHub main commits from the Healio repository', () => {
  assert.doesNotThrow(() => assertVercelReleaseContext({
    VERCEL_ENV: 'production',
    VERCEL_GIT_PROVIDER: 'github',
    VERCEL_GIT_REPO_OWNER: 'Healio213',
    VERCEL_GIT_REPO_SLUG: 'healio-website',
    VERCEL_GIT_COMMIT_REF: 'main',
    VERCEL_GIT_COMMIT_SHA: SHA,
    VERCEL_GIT_COMMIT_MESSAGE: 'chore: add release guard [production-approved]',
  }));

  const invalid = [
    { VERCEL_GIT_COMMIT_REF: 'feature/redesign' },
    { VERCEL_GIT_PROVIDER: '' },
    { VERCEL_GIT_REPO_OWNER: 'someone-else' },
    { VERCEL_GIT_REPO_SLUG: 'copied-site' },
    { VERCEL_GIT_COMMIT_SHA: 'not-a-sha' },
    { VERCEL_GIT_COMMIT_MESSAGE: 'deploy without approval' },
  ];

  for (const override of invalid) {
    assert.throws(() => assertVercelReleaseContext({
      VERCEL_ENV: 'production',
      VERCEL_GIT_PROVIDER: 'github',
      VERCEL_GIT_REPO_OWNER: 'Healio213',
      VERCEL_GIT_REPO_SLUG: 'healio-website',
      VERCEL_GIT_COMMIT_REF: 'main',
      VERCEL_GIT_COMMIT_SHA: SHA,
      VERCEL_GIT_COMMIT_MESSAGE: 'approved [production-approved]',
      ...override,
    }), /Produktionsbuild gesperrt/);
  }
});

test('preview and local verification do not require a production approval marker', () => {
  assert.doesNotThrow(() => assertVercelReleaseContext({ VERCEL_ENV: 'preview' }));
  assert.doesNotThrow(() => assertVercelReleaseContext({}));
});

test('release build is fail-closed and rebuilds every generated artifact before all checks', () => {
  assert.deepEqual(createReleaseBuildPlan(), [
    'clean:dist',
    'generate:llms',
    'lint',
    'vite:build',
    'generate:seo-pages',
    'prerender',
    'check:prerender-output',
    'check:schema-index-recovery',
    'check:release-artifacts',
    'run:all-contract-tests',
  ]);
});

test('every rendered browser contract has the Vercel Chromium fallback', async () => {
  const source = await readFile(
    new URL('./check-ambulant-bonus-calculator-rendered.mjs', import.meta.url),
    'utf8',
  );

  assert.match(source, /@sparticuz\/chromium/);
  assert.match(source, /puppeteer-core/);
  assert.match(source, /chromium\.executablePath\(\)/);
});
