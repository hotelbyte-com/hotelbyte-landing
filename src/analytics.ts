// Google Analytics 4 (gtag.js), configured at build time via
// VITE_GA_MEASUREMENT_ID (public browser configuration, like the other VITE_*
// values). When the variable is unset the site ships with no analytics code
// at all; the measurement ID is never hardcoded here.
//
// Imported for side effects from src/main.tsx only — the prerender SSR entry
// must never pull this in, so static HTML stays free of third-party scripts.

/* eslint-disable prefer-rest-params -- gtag.js's boot scan ignores array entries; the official snippet requires `arguments` */

const GA4_ID_PATTERN = /^G-[A-Z0-9]{6,12}$/;

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

function currentPath(): string {
  return window.location.pathname + window.location.search;
}

function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;
  if (w.gtag) return;

  const id = measurementId;
  if (!id) return;
  if (!GA4_ID_PATTERN.test(id)) {
    console.warn(`[analytics] ignoring malformed VITE_GA_MEASUREMENT_ID: ${id}`);
    return;
  }

  // Standard gtag.js bootstrap (https://support.google.com/analytics/answer/9304153).
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  w.dataLayer = w.dataLayer || [];
  // Must mirror the official snippet exactly: dataLayer entries are Arguments
  // objects — gtag.js's boot scan ignores plain arrays, so a rest-args wrapper
  // (pushing an array) leaves config silently unprocessed and nothing is
  // ever reported.
  w.gtag = function gtag() {
    (w.dataLayer as unknown[]).push(arguments);
  };
  w.gtag('js', new Date());
  // send_page_view defaults to true, so the initial load is tracked by config.
  w.gtag('config', id);

  // SPA navigation: gtag.js only auto-tracks the first load, so forward
  // client-side route changes as page_view events.
  let lastPath = currentPath();
  const trackRouteChange = () => {
    const path = currentPath();
    if (path === lastPath) return;
    lastPath = path;
    w.gtag!('event', 'page_view', { page_path: path });
  };
  const pushState = history.pushState.bind(history);
  const replaceState = history.replaceState.bind(history);
  history.pushState = (...args) => {
    pushState(...args);
    trackRouteChange();
  };
  history.replaceState = (...args) => {
    replaceState(...args);
    trackRouteChange();
  };
  window.addEventListener('popstate', trackRouteChange);
}

initAnalytics();
