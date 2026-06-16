import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';
import { SITE, type JsonLd } from '../seo/schema';

export type SeoProps = {
  path: string;                            // canonical path, e.g. "/products/price-intelligence"
  title: string;
  description: string;
  keywords?: string[];
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

export function Seo({
  path,
  title,
  description,
  keywords,
  ogType = 'website',
  image,
  locale = 'zh-CN',
  noindex = false,
  jsonLd,
  children
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const finalTitle = pickTitle(title);
  const finalImage = image ?? `${SITE_URL}/og-image.svg`;
  const ogLocale = locale === 'en' ? 'en_US' : 'zh_CN';
  const ogLocaleAlt = locale === 'en' ? 'zh_CN' : 'en_US';
  const payloads = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang={locale} />
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords.join(', ')} /> : null}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
      )}

      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <link rel="alternate" hrefLang="zh-CN" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="HotelByte" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
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
