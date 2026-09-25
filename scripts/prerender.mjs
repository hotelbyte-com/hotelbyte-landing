import { build as viteBuild } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(repoRoot, 'dist');
const ssrOutDir = path.join(repoRoot, 'dist-prerender');

// Routes that must exist as prerendered HTML. /pay is noindex but prerendered so
// the crawler never meets the bare SPA shell; date aliases canonicalize to
// /stories/<slug> (see DailyStory.tsx).
const staticRoutes = [
  '/',
  '/about',
  '/changelog',
  '/compare',
  '/demo',
  '/notices/hotelbyte-platform-ip-rights',
  '/pay',
  '/privacy',
  '/terms',
  '/products',
  '/products/ai-automations',
  '/products/b2b-distribution',
  '/products/deepseek-appliance',
  '/products/price-intelligence',
  '/products/revenuepilot',
  '/products/tracesight',
  '/services/consulting',
  '/stories',
];

// Tags in dist/index.html that are per-route SEO defaults. Prerendered pages get
// their own from Helmet; keeping these would shadow the Helmet output.
const seoDefaultPatterns = [
  /<title[^>]*>[\s\S]*?<\/title>/,
  /<meta\s+name="description"[^>]*>/,
  /<meta\s+name="robots"[^>]*>/,
  /<meta\s+name="googlebot"[^>]*>/,
  /<meta\s+name="author"[^>]*>/,
  /<meta\s+name="rating"[^>]*>/,
  /<meta\s+name="referrer"[^>]*>/,
  /<link\s+rel="canonical"[^>]*>/,
  /<meta\s+property="og:[^"]*"[^>]*>/g,
  /<meta\s+name="twitter:[^"]*"[^>]*>/g,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
];

function buildPage(template, rendered) {
  let page = template;
  for (const pattern of seoDefaultPatterns) {
    page = page.replace(pattern, '');
  }

  page = page.replace('</head>', `${rendered.headHtml}\n  </head>`);
  if (rendered.langAttributes) {
    page = page.replace(/<html([^>]*)>/, (_match, attrs) =>
      `<html${attrs.replace(/\s+lang="[^"]*"/, '')}${rendered.langAttributes}>`);
  }
  page = page.replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
  return page;
}

// 1. Client bundle with the clean shell (dist/index.html is the page template).
await viteBuild({ root: repoRoot, logLevel: 'error' });
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is not a clean shell (root div not empty)');
}

// 2. SSR bundle of the render entry. A production bundle keeps one deterministic
//    module graph; loading source through vite's dev server made Helmet/router
//    context wiring nondeterministic across runs.
await viteBuild({
  root: repoRoot,
  logLevel: 'error',
  build: {
    ssr: path.join(repoRoot, 'src', 'prerender-entry.tsx'),
    outDir: path.relative(repoRoot, ssrOutDir),
    emptyOutDir: true,
    rollupOptions: { output: { format: 'es' } },
  },
});

// 3. Render every route with plain node and write dist/<route>/index.html.
const { renderRoute, dailyStories } = await import(path.join(ssrOutDir, 'prerender-entry.js'));

const routes = [
  ...staticRoutes,
  ...dailyStories.map((story) => `/stories/${story.slug}`),
  ...dailyStories.map((story) => `/${story.date}`),
];

let failed = 0;
for (const route of routes) {
  try {
    const rendered = renderRoute(route, 'en');
    if (!rendered.html || rendered.html.length < 200) {
      throw new Error(`suspiciously small render output (${rendered.html.length} chars)`);
    }
    if (!rendered.headHtml || !rendered.headHtml.includes('rel="canonical"')) {
      throw new Error('captured head is empty (title/canonical missing)');
    }
    const page = buildPage(template, rendered);
    const outFile =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, page);
    console.log(`prerendered ${route} -> ${path.relative(distDir, outFile)} (${page.length} bytes)`);
  } catch (error) {
    failed += 1;
    console.error(`FAILED ${route}:`, error.message);
  }
}

if (failed > 0) {
  throw new Error(`${failed} route(s) failed to prerender`);
}

// 4. Sitemap is generated here (not hand-maintained) so it can never drift from
//    the real story list. Only canonical, indexable routes: /pay is noindex and
//    date aliases canonicalize to their /stories/<slug> URL.
const sitemapRoutes = [
  ...staticRoutes.filter((route) => route !== '/pay'),
  ...dailyStories.map((story) => `/stories/${story.slug}`),
];
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map(
    (route) => `  <url>\n    <loc>https://hotelbyte.com${route}</loc>\n  </url>`,
  ),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);

console.log(`prerender complete: ${routes.length} routes, sitemap: ${sitemapRoutes.length} urls`);
