import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, type JsonLd } from '../seo/schema';
import { captureHead } from '../seo/headCapture';
import { htmlLanguages, isPublishedLocale, localizedPath, pathLocale, publishedLocalesForPath, type Locale } from '../i18n/locale';

export type SeoProps = {
  path: string;                            // canonical path, e.g. "/products/price-intelligence"
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  image?: string;                          // absolute URL; default og-image
  locale?: 'zh-CN' | 'en';
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];              // arbitrary JSON-LD payload(s)
  children?: ReactNode;
};

const SITE_URL = SITE.url;

function pickTitle(title: string): string {
  return title.includes('HotelByte') ? title : `${title} | HotelByte`;
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
  const activeLocale: Locale = pathLocale(location.pathname) === 'zh' ? 'zh' : 'en';
  const canonicalPath = localizedPath(path, activeLocale);
  const url = `${SITE_URL}${canonicalPath}`;
  const finalTitle = pickTitle(title);
  const finalImage = image ?? `${SITE_URL}/og-image.png`;
  const ogLocale = activeLocale === 'en' ? 'en_US' : 'zh_CN';
  const alternates = noindex ? [] : publishedLocalesForPath(path).map((lang) => ({
    lang: htmlLanguages[lang], url: `${SITE_URL}${localizedPath(path, lang)}`,
  }));
  const payloads = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])
    .map((payload) => localizeJsonLd(payload, activeLocale) as JsonLd);

  // Prerender-time head capture; Helmet cannot report server-side (see headCapture.ts).
  captureHead({ path: canonicalPath, title: finalTitle, description, ogType, image: finalImage, locale: htmlLanguages[activeLocale], noindex, alternates, jsonLd: payloads });

  // Helmet v3 writes these tags into the SSR body. The prerender build injects
  // the captured head separately, so emitting both would duplicate metadata.
  if (typeof window === 'undefined') return <>{children}</>;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={htmlLanguages[activeLocale]} dir="ltr" />
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
      )}

      <link rel="canonical" href={url} />
      {alternates.map(({ lang, url: href }) => <link key={lang} rel="alternate" hrefLang={lang} href={href} />)}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizedPath(path, 'en')}`} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="HotelByte" />
      <meta property="og:locale" content={ogLocale} />
      {alternates.filter(({ lang }) => lang !== htmlLanguages[activeLocale]).map(({ lang }) => (
        <meta key={lang} property="og:locale:alternate" content={lang.replace('-', '_')} />
      ))}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
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
