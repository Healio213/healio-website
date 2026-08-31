const FULL_SHA = /^[a-f0-9]{40}$/;

export function assertVercelReleaseContext(env) {
  if (env.VERCEL_ENV !== 'production') return;

  const reasons = [];
  if (env.VERCEL_GIT_PROVIDER !== 'github') reasons.push('kein GitHub-Deployment');
  if (env.VERCEL_GIT_REPO_OWNER !== 'Healio213') reasons.push('falscher Repository-Inhaber');
  if (env.VERCEL_GIT_REPO_SLUG !== 'healio-website') reasons.push('falsches Repository');
  if (env.VERCEL_GIT_COMMIT_REF !== 'main') reasons.push('Branch ist nicht main');
  if (!FULL_SHA.test(env.VERCEL_GIT_COMMIT_SHA || '')) reasons.push('Commit-SHA fehlt oder ist ungültig');
  if (!(env.VERCEL_GIT_COMMIT_MESSAGE || '').includes('[production-approved]')) {
    reasons.push('visuelle Produktionsfreigabe fehlt');
  }

  if (reasons.length) {
    throw new Error(`Produktionsbuild gesperrt: ${reasons.join('; ')}`);
  }
}

export function createReleaseBuildPlan() {
  return [
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
  ];
}
