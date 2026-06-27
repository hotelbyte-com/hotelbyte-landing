// Vite plugin: build-time prerender of the SPA into per-route static HTML.
//
// Why: HotelByte Landing is a React 19 SPA. Without prerender, crawlers
// only see the empty <div id="root">. The plugin reads the bundled
// dist/index.html and emits one <route>/index.html per route with the
// route's full <head> meta + JSON-LD, so SEO engines and AI engines
// (Perplexity, SearchGPT, Claude, Gemini) can index each route directly.
//
// Implementation note: we use direct TypeScript imports of our own
// schema/routes/data modules. Vite compiles this plugin file with the
// same pipeline it uses for vite.config.ts, so the imports are resolved
// at config-load time without needing a separate transpile step.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { SITE_ROUTES } from '../src/seo/routes';
import {
  articleSchema,
  breadcrumbSchema,
  collectionPageSchema,
  comparisonSchema,
  itemListSchema,
  organizationSchema,
  serviceSchema,
  SITE,
  softwareApplicationSchema,
  webPageSchema,
  websiteSchema
} from '../src/seo/schema';
import { getProductBySlug, products } from '../src/data/products';
import { dailyStories } from '../src/data/dailyStories';

type Locale = 'en' | 'zh-CN';
const SITE_URL = SITE.url;
const OG_IMAGE = `${SITE_URL}/og-image.svg`;

function titleFor(routeKey: keyof typeof SITE_ROUTES, locale: Locale): string {
  const r = SITE_ROUTES[routeKey];
  return locale === 'en' ? r.title : r.titleZh;
}

function descFor(routeKey: keyof typeof SITE_ROUTES, locale: Locale): string {
  const r = SITE_ROUTES[routeKey];
  return locale === 'en' ? r.description : r.descriptionZh;
}

function productLocalized(product: ReturnType<typeof getProductBySlug>, locale: Locale) {
  if (!product) {
    return null;
  }
  return {
    name: locale === 'en' ? product.nameEn : product.name,
    description: locale === 'en' ? product.descriptionEn : product.description,
    features: locale === 'en' ? product.techHighlightsEn : product.techHighlights
  };
}

function buildHead(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd: unknown[];
}): string {
  const finalTitle = opts.title.includes('HotelByte') ? opts.title : `${opts.title} | HotelByte`;
  const url = `${SITE_URL}${opts.path}`;
  const ogLocale = opts.locale === 'en' ? 'en_US' : 'zh_CN';
  const ogLocaleAlt = opts.locale === 'en' ? 'zh_CN' : 'en_US';
  const ogType = opts.ogType ?? 'website';
  const robots = opts.noindex
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large,max-snippet:-1';

  const jsonLdScripts = opts.jsonLd
    .map((p) => `    <script type="application/ld+json">\n${JSON.stringify(p)}\n    </script>`)
    .join('\n');

  return `    <title>${escapeHtml(finalTitle)}</title>
    <meta name="description" content="${escapeAttr(opts.description)}" />
    ${opts.keywords?.length ? `<meta name="keywords" content="${escapeAttr(opts.keywords.join(', '))}" />` : ''}
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hrefLang="x-default" href="${url}" />
    <link rel="alternate" hrefLang="zh-CN" href="${url}" />
    <link rel="alternate" hrefLang="en" href="${url}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="HotelByte" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta property="og:locale:alternate" content="${ogLocaleAlt}" />
    <meta property="og:title" content="${escapeAttr(finalTitle)}" />
    <meta property="og:description" content="${escapeAttr(opts.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:secure_url" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeAttr(finalTitle)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(finalTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(opts.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <meta name="twitter:image:alt" content="${escapeAttr(finalTitle)}" />
${jsonLdScripts}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

type RouteSpec = {
  outPath: string;        // file path relative to dist, e.g. "products/ai-automations/index.html"
  locale: Locale;
  path: string;           // URL path, e.g. "/products/ai-automations"
  head: string;           // full <head> inner content
};

function buildRouteSpecs(): RouteSpec[] {
  const specs: RouteSpec[] = [];

  for (const locale of ['zh-CN', 'en'] as Locale[]) {
    const isEn = locale === 'en';

    // Home
    specs.push({
      outPath: 'index.html',
      locale,
      path: '/',
      head: buildHead({
        locale,
        path: '/',
        title: titleFor('home', locale),
        description: descFor('home', locale),
        keywords: SITE_ROUTES.home.keywords,
        jsonLd: [
          organizationSchema(),
          websiteSchema(),
          webPageSchema('/', titleFor('home', locale), descFor('home', locale), locale),
          breadcrumbSchema([{ name: isEn ? 'Home' : '首页', path: '/' }])
        ]
      })
    });

    // /stories
    {
      const route = SITE_ROUTES.stories;
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      const stories = dailyStories.map((s) => ({
        name: s.content[isEn ? 'en' : 'zh'].title,
        path: `/stories/${s.slug}`
      }));
      specs.push({
        outPath: 'stories/index.html',
        locale,
        path: '/stories',
        head: buildHead({
          locale,
          path: '/stories',
          title: t,
          description: d,
          jsonLd: [
            webPageSchema('/stories', t, d, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Daily Stories' : '每日故事', path: '/stories' }
            ]),
            collectionPageSchema({
              name: t,
              description: d,
              path: '/stories',
              hasPart: stories
            })
          ]
        })
      });
    }

    // /stories/:slug
    for (const story of dailyStories) {
      const slugPath = `/stories/${story.slug}`;
      const storyContent = story.content[isEn ? 'en' : 'zh'];
      const datePath = `/${story.date}`;
      specs.push({
        outPath: `stories/${story.slug}/index.html`,
        locale,
        path: slugPath,
        head: buildHead({
          locale,
          path: slugPath,
          title: `${storyContent.title}${isEn ? ' — Daily Story' : ' — 每日故事'}`,
          description: storyContent.summary,
          ogType: 'article',
          jsonLd: [
            webPageSchema(slugPath, storyContent.title, storyContent.summary, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Daily Stories' : '每日故事', path: '/stories' },
              { name: storyContent.title, path: slugPath }
            ]),
            articleSchema({
              headline: storyContent.title,
              description: storyContent.summary,
              datePublished: `${story.date}T00:00:00+04:00`,
              dateModified: `${story.date}T00:00:00+04:00`,
              path: slugPath,
              image: `${SITE_URL}${story.visual.src}`,
              inLanguage: locale,
              keywords: story.nextThemeSeeds[isEn ? 'en' : 'zh']
            })
          ]
        })
      });

      // /:storyDate alias
      specs.push({
        outPath: `${datePath}/index.html`,
        locale,
        path: datePath,
        head: buildHead({
          locale,
          path: datePath,
          title: `${storyContent.title}${isEn ? ' — Daily Story' : ' — 每日故事'}`,
          description: storyContent.summary,
          ogType: 'article',
          jsonLd: [
            webPageSchema(datePath, storyContent.title, storyContent.summary, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Daily Stories' : '每日故事', path: '/stories' },
              { name: storyContent.title, path: slugPath }
            ]),
            articleSchema({
              headline: storyContent.title,
              description: storyContent.summary,
              datePublished: `${story.date}T00:00:00+04:00`,
              dateModified: `${story.date}T00:00:00+04:00`,
              path: datePath,
              image: `${SITE_URL}${story.visual.src}`,
              inLanguage: locale,
              keywords: story.nextThemeSeeds[isEn ? 'en' : 'zh']
            })
          ]
        })
      });
    }

    // /products
    {
      const route = SITE_ROUTES.products;
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      const list = itemListSchema(
        isEn ? 'HotelByte Product Suite' : 'HotelByte 产品矩阵',
        d,
        products.map((p) => ({
          name: isEn ? p.nameEn : p.name,
          path: `/products/${p.slug}`,
          description: isEn ? p.taglineEn : p.tagline
        }))
      );
      specs.push({
        outPath: 'products/index.html',
        locale,
        path: '/products',
        head: buildHead({
          locale,
          path: '/products',
          title: t,
          description: d,
          keywords: route.keywords,
          jsonLd: [
            webPageSchema('/products', t, d, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Products' : '产品', path: '/products' }
            ]),
            list
          ]
        })
      });
    }

    // /products/:slug
    const productRouteKeys: Array<{ slug: string; key: keyof typeof SITE_ROUTES; outPath: string }> = [
      { slug: 'ai-automations', key: 'aiAutomations', outPath: 'products/ai-automations/index.html' },
      { slug: 'price-intelligence', key: 'priceIntelligence', outPath: 'products/price-intelligence/index.html' },
      { slug: 'b2b-distribution', key: 'b2bDistribution', outPath: 'products/b2b-distribution/index.html' },
      { slug: 'tracesight', key: 'traceSight', outPath: 'products/tracesight/index.html' },
      { slug: 'revenuepilot', key: 'revenuePilot', outPath: 'products/revenuepilot/index.html' },
      { slug: 'deepseek-appliance', key: 'deepseekAppliance', outPath: 'products/deepseek-appliance/index.html' }
    ];
    for (const { slug, key, outPath } of productRouteKeys) {
      const product = getProductBySlug(slug);
      if (!product) continue;
      const route = SITE_ROUTES[key];
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      const local = productLocalized(product, locale);
      const productPath = `/products/${slug}`;
      specs.push({
        outPath,
        locale,
        path: productPath,
        head: buildHead({
          locale,
          path: productPath,
          title: t,
          description: d,
          keywords: route.keywords,
          jsonLd: [
            webPageSchema(productPath, t, d, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Products' : '产品', path: '/products' },
              { name: local?.name ?? product.slug, path: productPath }
            ]),
            softwareApplicationSchema(product, productPath, isEn ? 'en' : 'zh')
          ]
        })
      });
    }

    // /products/profit-recovery and /products/margin-lift redirect to /services/consulting
    // (see vercel.json + App.tsx Navigate). No prerendered content for the old paths.


    // /compare
    {
      const route = SITE_ROUTES.compare;
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      specs.push({
        outPath: 'compare/index.html',
        locale,
        path: '/compare',
        head: buildHead({
          locale,
          path: '/compare',
          title: t,
          description: d,
          keywords: route.keywords,
          jsonLd: [
            webPageSchema('/compare', t, d, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Compare' : '竞品对比', path: '/compare' }
            ]),
            comparisonSchema(
              ['SiteMinder', 'Cloudbeds', 'D-EDGE', 'Juniper', 'Gimmonix', 'ZentrumHub', 'TravelgateX'].map((name) => ({
                name
              }))
            )
          ]
        })
      });
    }

    // /services/consulting (unified consulting umbrella)
    {
      const route = SITE_ROUTES.consulting;
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      const servicePath = '/services/consulting';
      specs.push({
        outPath: 'services/consulting/index.html',
        locale,
        path: servicePath,
        head: buildHead({
          locale,
          path: servicePath,
          title: t,
          description: d,
          keywords: route.keywords,
          jsonLd: [
            webPageSchema(servicePath, t, d, locale),
            serviceSchema({
              name: isEn ? 'HotelByte Consulting' : 'HotelByte 咨询服务',
              description: d,
              path: servicePath,
              serviceType: isEn ? 'Consulting' : '咨询服务',
              locale: isEn ? 'en' : 'zh'
            }),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Services' : '服务', path: servicePath },
              { name: isEn ? 'Consulting' : '咨询服务', path: servicePath }
            ])
          ]
        })
      });
    }

    // /about
    {
      const route = SITE_ROUTES.about;
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      specs.push({
        outPath: 'about/index.html',
        locale,
        path: '/about',
        head: buildHead({
          locale,
          path: '/about',
          title: t,
          description: d,
          jsonLd: [
            organizationSchema(),
            webPageSchema('/about', t, d, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'About' : '关于', path: '/about' }
            ])
          ]
        })
      });
    }

    // /changelog
    {
      const route = SITE_ROUTES.changelog;
      const t = isEn ? route.title : route.titleZh;
      const d = isEn ? route.description : route.descriptionZh;
      specs.push({
        outPath: 'changelog/index.html',
        locale,
        path: '/changelog',
        head: buildHead({
          locale,
          path: '/changelog',
          title: t,
          description: d,
          jsonLd: [
            webPageSchema('/changelog', t, d, locale),
            breadcrumbSchema([
              { name: isEn ? 'Home' : '首页', path: '/' },
              { name: isEn ? 'Changelog' : '更新日志', path: '/changelog' }
            ])
          ]
        })
      });
    }
  }

  return specs;
}

function injectHead(indexHtml: string, headContent: string): string {
  // The Vite-built index.html already has <title> and <meta name="description">
  // that point at the canonical Chinese homepage. We replace everything between
  // <head> and </head> with our route-specific head, while preserving the
  // original <head> open/close tags.
  // Skip the static <title>/<meta name="description"> from the original index.html.
  return indexHtml.replace(
    /<head>([\s\S]*?)<\/head>/,
    (_match, inner) => {
      // Keep the first comment and base <meta> tags (charset, viewport, theme-color,
      // manifest, apple-touch-icon, preconnect, OG image fallback) and inject
      // route-specific meta right before </head>.
      const preserved = inner
        .split('\n')
        .filter((line: string) => {
          const t = line.trim();
          if (!t) return true;
          if (t.startsWith('<!--')) return true;
          if (t.startsWith('<meta charset=')) return true;
          if (t.startsWith('<meta name="viewport"')) return true;
          if (t.startsWith('<meta name="theme-color"')) return true;
          if (t.startsWith('<link rel="manifest"')) return true;
          if (t.startsWith('<link rel="apple-touch-icon"')) return true;
          if (t.startsWith('<link rel="icon"')) return true;
          if (t.startsWith('<link rel="preconnect"')) return true;
          if (t.startsWith('<link rel="dns-prefetch"')) return true;
          if (t.startsWith('<link rel="modulepreload"')) return true;
          if (t.startsWith('<link rel="stylesheet"')) return true;
          if (t.startsWith('<link href="https://fonts')) return true;
          if (t.startsWith('<script type="module"')) return true;
          if (t.startsWith('<meta property="og:site_name"')) return true;
          if (t.startsWith('<meta property="og:image"') && !t.includes('og:image:width')) return false;
          if (t.startsWith('<title>')) return false;
          if (t.startsWith('<meta name="description"')) return false;
          if (t.startsWith('<meta name="keywords"')) return false;
          if (t.startsWith('<meta name="robots"')) return false;
          if (t.startsWith('<link rel="canonical"')) return false;
          if (t.startsWith('<link rel="alternate"')) return false;
          if (t.startsWith('<meta property="og:')) return false;
          if (t.startsWith('<meta name="twitter:')) return false;
          if (t.startsWith('<script type="application/ld+json"')) return false;
          return false;
        })
        .join('\n');

      return `<head>\n${preserved}\n${headContent}\n  </head>`;
    }
  );
}

function assertClientAssets(html: string, outPath: string): void {
  if (!html.includes('<script type="module"')) {
    throw new Error(`[prerender] ${outPath} is missing the Vite client module script`);
  }
  if (!html.includes('rel="stylesheet"')) {
    throw new Error(`[prerender] ${outPath} is missing the Vite stylesheet link`);
  }
}

export function prerenderPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'hotelbyte-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir || 'dist';
    },
    async closeBundle() {
      const root = process.cwd();
      const distPath = resolve(root, outDir);
      const indexPath = join(distPath, 'index.html');
      const template = await readFile(indexPath, 'utf8');

      const specs = buildRouteSpecs();
      const seen = new Set<string>();
      let written = 0;

      for (const spec of specs) {
        // De-dupe by output path; the home page (index.html) is written
        // once per locale and we keep the first (zh-CN) version.
        if (seen.has(spec.outPath)) continue;
        seen.add(spec.outPath);

        const html = injectHead(template, spec.head);
        assertClientAssets(html, spec.outPath);
        const file = join(distPath, spec.outPath);
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, html, 'utf8');
        written += 1;
      }

      console.log(`[prerender] wrote ${written} static HTML files to ${outDir}/`);
    }
  };
}
