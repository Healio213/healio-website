export const PRERENDER_BROWSER_RESTART_INTERVAL = 8;

const BLOCKED_RESOURCE_TYPES = new Set(['image', 'media', 'font']);

export function shouldAbortPrerenderRequest({
  hostname,
  pathname = '',
  resourceType,
  allowedExternalHosts,
}) {
  if (pathname.startsWith('/_vercel/')) {
    return true;
  }

  if (BLOCKED_RESOURCE_TYPES.has(resourceType)) {
    return true;
  }

  return !(
    hostname === '127.0.0.1'
    || hostname === 'localhost'
    || allowedExternalHosts.has(hostname)
  );
}
