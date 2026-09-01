import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const FULL_SHA = /^[a-f0-9]{40}$/;

function git(rootDir, args) {
  const result = spawnSync('git', args, { cwd: rootDir, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : '';
}

export function createReleaseManifest({ rootDir, env = process.env, now = new Date() }) {
  const gitSha = git(rootDir, ['rev-parse', 'HEAD']);
  const commitSha = env.VERCEL_GIT_COMMIT_SHA || gitSha;
  if (!FULL_SHA.test(commitSha)) {
    throw new Error('Release-Nachweis kann ohne vollständige Commit-SHA nicht erzeugt werden.');
  }

  return {
    site: 'healio.de',
    source: 'github.com/Healio213/healio-website',
    commitSha,
    branch: env.VERCEL_GIT_COMMIT_REF || git(rootDir, ['branch', '--show-current']) || 'detached',
    environment: env.VERCEL_ENV || 'local',
    builtAt: now.toISOString(),
  };
}

export function writeReleaseManifest({ rootDir, env = process.env, now = new Date() }) {
  const manifest = createReleaseManifest({ rootDir, env, now });
  const target = path.join(rootDir, 'dist', 'release.json');
  fs.writeFileSync(target, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}
