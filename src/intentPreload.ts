import { preloadRoute } from './App';

// Pages are separate chunks, so warm the one a link leads to as soon as the
// user shows intent (pointer over, keyboard focus, touch start). By the time of
// the click the chunk is usually cached and the navigation is instant.
//
// If a click still has to wait for a chunk, the old page stays on screen (router
// updates are transitions) and nothing would answer the click, so a thin
// progress bar (html[data-nav-pending], src/index.css) appears after 150 ms.

const PENDING_DELAY_MS = 150;

function internalLink(event: Event): HTMLAnchorElement | null {
  const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
  if (!anchor || anchor.origin !== window.location.origin || anchor.target === '_blank') return null;
  return anchor;
}

export function installIntentPreload(): void {
  const root = document.documentElement;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = Boolean(connection?.saveData);

  const warmed = new Set<string>();
  const warm = (event: Event) => {
    const anchor = internalLink(event);
    if (!anchor || saveData || warmed.has(anchor.pathname)) return;
    const path = anchor.pathname;
    warmed.add(path);
    preloadRoute(path).catch(() => warmed.delete(path)); // retry on the next intent
  };
  document.addEventListener('pointerover', warm, { passive: true });
  document.addEventListener('focusin', warm);
  document.addEventListener('touchstart', warm, { passive: true });

  document.addEventListener('click', (event) => {
    const anchor = internalLink(event);
    // <Link> has already called preventDefault by now, so that is not a usable signal.
    if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const timer = window.setTimeout(() => root.setAttribute('data-nav-pending', ''), PENDING_DELAY_MS);
    const done = () => {
      window.clearTimeout(timer);
      root.removeAttribute('data-nav-pending');
    };
    preloadRoute(anchor.pathname).then(done, done); // already-loaded routes resolve at once
  }, { passive: true });
}
