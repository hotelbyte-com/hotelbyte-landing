export const supportedLocales = ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'pt', 'de', 'tr', 'fil', 'he'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

// Content tiers: en and zh ship fully translated page bodies. The other nine
// publish localized chrome (nav, switcher, notice) with English bodies plus an
// in-language progressive-rollout notice — full per-page translation lands
// incrementally by adding those locales per route below.
export type Locale = SupportedLocale;

// Locales whose page bodies render from the English source (tier 2).
export const englishBodyLocales: readonly SupportedLocale[] = ['hi', 'es', 'fr', 'ar', 'pt', 'de', 'tr', 'fil', 'he'];
export const fullContentLocales: readonly Locale[] = ['zh'];
export const localeStorageKey = 'hb-locale';

export const htmlLanguages: Record<SupportedLocale, string> = {
  en: 'en', zh: 'zh-CN', hi: 'hi', es: 'es', fr: 'fr', ar: 'ar',
  pt: 'pt', de: 'de', tr: 'tr', fil: 'fil', he: 'he',
};

export function isSupportedLocale(value: string): value is SupportedLocale {
  return supportedLocales.some((locale) => locale === value);
}

// Approval is route-specific. Add a locale only after every visible string,
// metadata field, and legal statement on that route has been reviewed. The
// build validates this against the content-ready languages and prerenders only
// approved combinations.
//
// 2026-10-03: zh approved site-wide (founder request; complete inline copy,
// verified by CJK-grepping every prerendered /zh body). The nine tier-2
// locales publish localized chrome + English bodies + an in-language notice
// (see englishBodyLocales); /pay (noindex checkout) and daily-story slugs
// stay English-only pending per-slug review.
const tier2Routes = [
  '/', '/about', '/changelog', '/compare', '/demo',
  '/guides/hotel-distribution', '/integrations', '/case-studies',
  '/notices/hotelbyte-platform-ip-rights', '/privacy', '/terms',
  '/solutions/distribution-platforms', '/solutions/travel-sellers',
  '/services/consulting', '/stories', '/products',
  '/products/ai-automations', '/products/ai-distribution',
  '/products/b2b-distribution', '/products/deepseek-appliance',
  '/products/price-intelligence', '/products/revenuepilot',
  '/products/tracesight',
];

export const reviewedTranslations: Partial<Record<string, readonly Locale[]>> = Object.fromEntries(
  tier2Routes.map((path) => [path, [...fullContentLocales, ...englishBodyLocales] as readonly Locale[]])
);

// /pay is a noindex transaction page, not a tier-2 content route: zh ships a
// full inline translation (PaddlePay is bilingual by construction) so a
// Chinese-language portal checkout keeps its language end to end (issue #22).
// No other locale publishes here; the eleven-locale chrome does not apply.
reviewedTranslations['/pay'] = ['zh'];

// Explicit ?language= override (issue #22): the portal checkout URL carries
// the buyer's portal language. The value must pass the same per-route
// publication gate as URL prefixes — an unpublished language falls back to
// the path-derived locale instead of leaking unreviewed pseudo-translations.
export function queryLocale(search: string, pathname: string): Locale | null {
  const requested = new URLSearchParams(search).get('language');
  return requested && isSupportedLocale(requested) && requested !== 'en' && isPublishedLocale(pathname, requested)
    ? requested
    : null;
}

// Tier-2 locales whose full page body has been translated, per route. These
// route+locale combinations render the translated body (see dict-ar.ts and the
// t() calls in the page components) and suppress the rollout notice. Anything
// not listed keeps the localized-chrome + English-body tier.
// 2026-10-03 first pass: Arabic home + AI distribution page.
export const fullBodyRoutes: Partial<Record<Locale, readonly string[]>> = {
  ar: ['/', '/products/ai-distribution'],
};

export function isFullBodyLocale(locale: Locale, pathname: string): boolean {
  return fullBodyRoutes[locale]?.includes(basePath(pathname)) ?? false;
}

export function pathLocale(pathname: string): SupportedLocale | null {
  const first = pathname.split('/')[1];
  return isSupportedLocale(first) && first !== 'en' ? first : null;
}

export function basePath(pathname: string): string {
  const clean = pathname.split(/[?#]/, 1)[0] || '/';
  const locale = pathLocale(clean);
  if (!locale) return clean;
  return clean.slice(locale.length + 1) || '/';
}

export function localizedPath(path: string, locale: SupportedLocale): string {
  const match = /^([^?#]*)(.*)$/.exec(path);
  const base = basePath(match?.[1] || '/');
  return `${locale === 'en' ? '' : `/${locale}`}${base}${match?.[2] ?? ''}`;
}

export function publishedLocalesForPath(path: string): readonly Locale[] {
  const approved = reviewedTranslations[basePath(path)] ?? [];
  return ['en', ...approved.filter((locale) => locale !== 'en')];
}

export function isPublishedLocale(path: string, locale: SupportedLocale): boolean {
  return publishedLocalesForPath(path).some((published) => published === locale);
}

export function detectBrowserLocale(languages?: readonly string[]): SupportedLocale {
  const candidates = languages !== undefined
    ? languages
    : typeof navigator !== 'undefined'
      ? [...(navigator.languages || []), navigator.language]
      : [];

  for (const raw of candidates) {
    const normalized = raw?.trim().toLowerCase();
    if (!normalized) continue;
    const primary = normalized.split('-')[0];
    if (isSupportedLocale(primary)) return primary;
    if (primary === 'tl') return 'fil';
    if (primary === 'iw') return 'he';
  }

  return 'en';
}

export function preferredHomepageLocale(saved: string | null, languages: readonly string[]): Locale {
  const candidate = saved && isSupportedLocale(saved) ? saved : detectBrowserLocale(languages);
  return isPublishedLocale('/', candidate) ? candidate as Locale : 'en';
}
