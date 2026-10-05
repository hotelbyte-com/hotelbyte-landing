import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, type JsonLd } from '../seo/schema';
import { captureHead } from '../seo/headCapture';
import { productLines, products } from '../data/products';
import { htmlLanguages, indexedLocalesForPath, isIndexedLocale, isPublishedLocale, localizedPath, pathLocale, type Locale } from '../i18n/locale';

export type SeoProps = {
  path: string;                            // canonical path, e.g. "/products/price-intelligence"
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  image?: string;                          // absolute URL; default og-image
  locale?: string;
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];              // arbitrary JSON-LD payload(s)
  children?: ReactNode;
};

const SITE_URL = SITE.url;

// Product lines and products have their own share cards (scripts/generate-og.mjs).
const OG_CARD_SLUGS = new Set([...productLines.map((line) => line.slug), ...products.map((product) => product.slug)]);
function defaultImage(path: string): string {
  const slug = /^\/products\/([^/]+)$/.exec(path)?.[1];
  return slug && OG_CARD_SLUGS.has(slug) ? `${SITE_URL}/og/${slug}.png` : `${SITE_URL}/og-image.png`;
}

// Result pages show roughly 60 Latin characters of a title and 155 of a
// description; CJK characters take about twice the width.
const TITLE_MAX = 65;
const DESCRIPTION_MAX = 160;

function displayWidth(text: string): number {
  let width = 0;
  for (const char of text) width += /[\u2e80-\u9fff\uac00-\ud7af\uff00-\uffef]/.test(char) ? 2 : 1;
  return width;
}

function pickTitle(title: string): string {
  const full = title.includes('HotelByte') ? title : `${title} | HotelByte`;
  if (displayWidth(full) <= TITLE_MAX) return full;
  // A long topic keeps its words; the trailing brand segment goes first.
  return full.replace(/\s+\|\s+[^|]*HotelByte[^|]*$/, '') || full;
}

// Cut an over-long description at the last sentence or clause end that fits,
// so snippets end on a full thought instead of a mid-word ellipsis.
function clampDescription(text: string): string {
  if (displayWidth(text) <= DESCRIPTION_MAX) return text;
  let width = 0;
  let fit = 0;
  let boundary = -1;
  const chars = [...text];
  for (let i = 0; i < chars.length; i += 1) {
    width += displayWidth(chars[i]);
    if (width > DESCRIPTION_MAX - 1) break;
    fit = i + 1;
    if (/[。！？；.!?;]/.test(chars[i])) boundary = i + 1;
    else if (/[，,：:—]/.test(chars[i]) && boundary < 0) boundary = -(i + 1);
  }
  if (boundary > fit / 2) return chars.slice(0, boundary).join('').trim();
  if (boundary < 0 && -boundary > fit / 2) return `${chars.slice(0, -boundary - 1).join('').trim()}…`;
  const cut = chars.slice(0, fit).join('');
  const space = cut.lastIndexOf(' ');
  return `${(space > fit / 2 ? cut.slice(0, space) : cut).trim()}…`;
}

function localizeJsonLd(value: unknown, locale: Locale): unknown {
  if (Array.isArray(value)) return value.map((item) => localizeJsonLd(item, locale));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      key === 'inLanguage' && typeof item === 'string'
        ? htmlLanguages[locale]
        : localizeJsonLd(item, locale),
    ]));
  }
  if (locale === 'zh' && value === SITE.description.en) return SITE.description.zh;
  if (typeof value === 'string' && value.startsWith(`${SITE_URL}/`)) {
    const path = value.slice(SITE_URL.length);
    return isPublishedLocale(path, locale) ? `${SITE_URL}${localizedPath(path, locale)}` : value;
  }
  return value;
}

export function Seo({
  path,
  title,
  description,
  ogType = 'website',
  image,
  noindex = false,
  jsonLd,
  children
}: SeoProps) {
  const location = useLocation();
  const pathLang = pathLocale(location.pathname);
  const activeLocale: Locale = pathLang && isPublishedLocale(location.pathname, pathLang) ? pathLang : 'en';
  const canonicalPath = localizedPath(path, activeLocale);
  const url = `${SITE_URL}${canonicalPath}`;
  const finalTitle = pickTitle(title);
  const finalImage = image ?? defaultImage(path);
  const ogLocale = htmlLanguages[activeLocale].replace('-', '_');
  // html dir must follow the active locale; a hardcoded "ltr" would flip
  // right-to-left pages (ar/he) back on client-side Helmet updates.
  const dir = activeLocale === 'ar' || activeLocale === 'he' ? 'rtl' : 'ltr';
  // Untranslated tier-2 pages (English body under a locale URL) stay out of
  // the index and of hreflang; links on them are still followed.
  const indexable = !noindex && isIndexedLocale(path, activeLocale);
  const robots = noindex
    ? 'noindex,nofollow'
    : indexable ? 'index,follow,max-image-preview:large,max-snippet:-1' : 'noindex,follow';
  const alternates = indexable ? indexedLocalesForPath(path).map((lang) => ({
    lang: htmlLanguages[lang], url: `${SITE_URL}${localizedPath(path, lang)}`,
  })) : [];
  const metaDescription = clampDescription(description);
  const payloads = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])
    .map((payload) => localizeJsonLd(payload, activeLocale) as JsonLd);

  // Prerender-time head capture; Helmet cannot report server-side (see headCapture.ts).
  captureHead({ path: canonicalPath, title: finalTitle, description: metaDescription, ogType, image: finalImage, locale: htmlLanguages[activeLocale], noindex: !indexable, robots, alternates, jsonLd: payloads });

  // Helmet v3 writes these tags into the SSR body. The prerender build injects
  // the captured head separately, so emitting both would duplicate metadata.
  if (typeof window === 'undefined') return <>{children}</>;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={htmlLanguages[activeLocale]} dir={dir} />
      <title>{finalTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={url} />
      {alternates.map(({ lang, url: href }) => <link key={lang} rel="alternate" hrefLang={lang} href={href} />)}
      {indexable && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizedPath(path, 'en')}`} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="HotelByte" />
      <meta property="og:locale" content={ogLocale} />
      {alternates.filter(({ lang }) => lang !== htmlLanguages[activeLocale]).map(({ lang }) => (
        <meta key={lang} property="og:locale:alternate" content={lang.replace('-', '_')} />
      ))}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {payloads.map((p, idx) => (
        <script key={`ld-${idx}`} type="application/ld+json">
          {JSON.stringify(p)}
        </script>
      ))}

      {children}
    </Helmet>
  );
}
