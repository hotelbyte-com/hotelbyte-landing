// Build-time head capture. react-helmet-async v3 manages the document head via
// componentDidMount + direct DOM writes, which never run under SSR, so
// prerendering cannot read heads back from its context. Instead, <Seo> also
// records its props here when capture is active (prerender only; the client
// keeps using Helmet exactly as before).
import { basePath } from '../i18n/locale';

export type CapturedHead = {
  path: string;
  title: string;
  description: string;
  ogType: 'website' | 'article';
  image: string;
  locale: string;
  noindex: boolean;
  robots: string;
  alternates: Array<{ lang: string; url: string }>;
  jsonLd: unknown[];
};

let capture: CapturedHead[] | null = null;

export function startHeadCapture(): void {
  capture = [];
}

export function stopHeadCapture(): CapturedHead[] {
  const captured = capture ?? [];
  capture = null;
  return captured;
}

export function captureHead(head: CapturedHead): void {
  capture?.push(head);
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// The canonical page URL, kept in sync with what <Seo> emits client-side.
function canonicalUrl(path: string): string {
  return `https://hotelbyte.com${path}`;
}

export function headToHtml(head: CapturedHead): string {
  const url = canonicalUrl(head.path);
  const ogLocale = head.locale.replace('-', '_');
  const robots = head.robots;
  const jsonLdScripts = head.jsonLd
    .map((p) => `    <script type="application/ld+json">${JSON.stringify(p)}</script>`)
    .join('\n');
  const alternateLinks = head.noindex ? '' : [
    ...head.alternates.map(({ lang, url: href }) => `    <link rel="alternate" hreflang="${escapeHtml(lang)}" href="${escapeHtml(href)}" />`),
    `    <link rel="alternate" hreflang="x-default" href="${canonicalUrl(basePath(head.path))}" />`,
  ].join('\n');
  const ogAlternates = head.alternates
    .filter(({ lang }) => lang !== head.locale)
    .map(({ lang }) => `    <meta property="og:locale:alternate" content="${escapeHtml(lang.replace('-', '_'))}" />`)
    .join('\n');

  return `    <title>${escapeHtml(head.title)}</title>
    <meta name="description" content="${escapeHtml(head.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
${alternateLinks}
    <meta property="og:type" content="${head.ogType}" />
    <meta property="og:site_name" content="HotelByte" />
    <meta property="og:locale" content="${ogLocale}" />
${ogAlternates}
    <meta property="og:title" content="${escapeHtml(head.title)}" />
    <meta property="og:description" content="${escapeHtml(head.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${head.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(head.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(head.title)}" />
    <meta name="twitter:description" content="${escapeHtml(head.description)}" />
    <meta name="twitter:image" content="${head.image}" />
${jsonLdScripts}`;
}
