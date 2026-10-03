/* eslint-disable react-refresh/only-export-components -- build-only SSR entry */
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { I18nProvider } from './i18n';
import type { Locale } from './i18n';
import { isPublishedLocale, pathLocale, publishedLocalesForPath, reviewedTranslations, localizedPath, htmlLanguages } from './i18n/locale';
import { dailyStories } from './data/dailyStories';
import { startHeadCapture, stopHeadCapture, headToHtml } from './seo/headCapture';
import { SITE_ROUTES } from './seo/routes';

export { dailyStories };
export { SITE_ROUTES };
export { publishedLocalesForPath, reviewedTranslations, localizedPath, htmlLanguages };

// The app legitimately assumes a browser (client-only SPA); build-time
// rendering is the only non-browser context, so stub storage here instead of
// threading SSR guards through client code.
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  (globalThis as Record<string, unknown>).localStorage = {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => void store.set(key, String(value)),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  };
}

export interface PrerenderedRoute {
  html: string;
  langAttributes: string;
  headHtml: string;
}

export function renderRoute(path: string): PrerenderedRoute {
  const routeLocale = pathLocale(path) ?? 'en';
  if (!isPublishedLocale(path, routeLocale)) {
    throw new Error(`unreviewed locale route: ${path}`);
  }
  const locale = routeLocale as Locale;
  startHeadCapture();
  let html: string;
  let captured: ReturnType<typeof stopHeadCapture>;
  try {
    html = renderToString(
      <HelmetProvider>
        <MemoryRouter initialEntries={[path]}>
          <I18nProvider defaultLocale={locale}>
            <App />
          </I18nProvider>
        </MemoryRouter>
      </HelmetProvider>,
    );
  } finally {
    captured = stopHeadCapture();
  }
  // Last <Seo> mounted wins (routes render exactly one; not-found branches too).
  const head = captured[captured.length - 1];
  return {
    html,
    langAttributes: head ? ` lang="${head.locale}" dir="${routeLocale === 'ar' || routeLocale === 'he' ? 'rtl' : 'ltr'}"` : '',
    headHtml: head ? headToHtml(head) : '',
  };
}
