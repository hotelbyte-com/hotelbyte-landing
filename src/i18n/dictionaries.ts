// Tier-2 dictionaries, translated from the English source (LLM translation is
// the agreed process). They cover the site chrome, the home page and the AI
// distribution page. Each locale is its own chunk, loaded only for visitors of
// that locale: the client preloads it before the first render (src/main.tsx),
// prerender preloads all of them, and t() falls back to English until loaded.
import type { Locale } from './locale';
import { tier2SeoMeta } from './seoMeta';

type Dictionary = Record<string, string>;

const loaders: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  hi: () => import('./dict-hi').then((m) => m.hi),
  es: () => import('./dict-es').then((m) => m.es),
  fr: () => import('./dict-fr').then((m) => m.fr),
  ar: () => import('./dict-ar').then((m) => m.ar),
  pt: () => import('./dict-pt').then((m) => m.pt),
  de: () => import('./dict-de').then((m) => m.de),
  tr: () => import('./dict-tr').then((m) => m.tr),
  fil: () => import('./dict-fil').then((m) => m.fil),
  he: () => import('./dict-he').then((m) => m.he),
};

const loaded: Partial<Record<Locale, Dictionary>> = {};

export function tier2Dictionary(locale: Locale): Dictionary | undefined {
  return loaded[locale];
}

export function needsDictionary(locale: Locale): boolean {
  return Boolean(loaders[locale]) && !loaded[locale];
}

export async function preloadDictionary(locale: Locale | null | undefined): Promise<void> {
  const load = locale ? loaders[locale] : undefined;
  if (!locale || !load || loaded[locale]) return;
  loaded[locale] = await load();
}

export function preloadAllDictionaries(): Promise<unknown> {
  return Promise.all((Object.keys(loaders) as Locale[]).map((locale) => preloadDictionary(locale)));
}

// Localized SEO title/description for a full-body tier-2 route.
export function localizedSeo(key: 'home' | 'aiDistribution'): Partial<Record<string, { title: string; description: string }>> {
  return Object.fromEntries(Object.entries(tier2SeoMeta).map(([locale, meta]) => [locale, meta[key]]));
}
