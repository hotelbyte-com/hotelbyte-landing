import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(vercel.cleanUrls, true, 'Vercel must serve extensionless static HTML routes');
assert.equal((vercel.rewrites ?? []).length, 0, 'a SPA catch-all would turn unknown paths into HTTP 200');

const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
assert.ok(blocks.length > 0, 'sitemap contains no URLs');
const locations = new Set(blocks.map((block) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  assert.ok(loc, 'sitemap URL is missing loc');
  return loc;
}));
assert.equal(locations.size, blocks.length, 'duplicate sitemap URL');

const redirects = new Set((vercel.redirects ?? []).map((item) => item.source));
const errors = [];
const count = (source, pattern) => [...source.matchAll(pattern)].length;
const htmlFileFor = (pathname) => pathname === '/'
  ? path.join(dist, 'index.html')
  : pathname.endsWith('/')
    ? path.join(dist, pathname.slice(1), 'index.html')
    : path.join(dist, `${pathname.slice(1)}.html`);
const staticFileFor = (pathname) => path.join(dist, pathname.slice(1));

for (const block of blocks) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const pathname = new URL(loc).pathname;
  const file = htmlFileFor(pathname);
  if (!fs.existsSync(file)) {
    errors.push(`${pathname}: sitemap page has no static HTML`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const head = html.split('</head>', 1)[0];
  if (count(html, /<title>/g) !== 1) errors.push(`${pathname}: expected one title in document`);
  if (count(html, /<meta name="description"/g) !== 1) errors.push(`${pathname}: expected one description in document`);
  if (count(html, /<link rel="canonical"/g) !== 1) errors.push(`${pathname}: expected one canonical in document`);
  if (!html.includes(`<link rel="canonical" href="${loc}"`)) errors.push(`${pathname}: canonical is not self-referential`);
  if (!html.includes(`<div id="root">`) || html.length < 1000) errors.push(`${pathname}: missing prerendered body`);
  const ogImage = /<meta property="og:image" content="https:\/\/hotelbyte\.com(\/[^"]+)"/.exec(head)?.[1];
  if (!ogImage || !fs.existsSync(staticFileFor(ogImage))) errors.push(`${pathname}: og:image ${ogImage ?? '(none)'} missing from build`);

  const htmlAlternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((match) => `${match[1]} ${match[2]}`);
  const xmlAlternates = [...block.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((match) => `${match[1]} ${match[2]}`);
  if (JSON.stringify(htmlAlternates) !== JSON.stringify(xmlAlternates)) errors.push(`${pathname}: head/sitemap alternates differ`);
  if (!htmlAlternates.some((item) => item.endsWith(` ${loc}`))) errors.push(`${pathname}: missing self hreflang`);
  if (!htmlAlternates.some((item) => item.startsWith('x-default https://hotelbyte.com/'))) errors.push(`${pathname}: missing English x-default`);
  const selfLanguage = htmlAlternates.find((item) => item.endsWith(` ${loc}`))?.split(' ')[0];
  const htmlLanguage = /<html\b[^>]*\blang="([^"]+)"/.exec(html)?.[1];
  if (selfLanguage && htmlLanguage !== selfLanguage) errors.push(`${pathname}: html lang differs from self hreflang`);
  if (!head.includes('<meta name="robots" content="index,follow')) errors.push(`${pathname}: indexable page has wrong robots tag`);
  for (const alternate of xmlAlternates) {
    const target = alternate.slice(alternate.indexOf(' ') + 1);
    if (!locations.has(target)) errors.push(`${pathname}: alternate ${target} absent from sitemap`);
  }

  for (const anchor of html.matchAll(/<a\b[^>]*\bhref="(\/[^"]*)"/g)) {
    const targetPath = new URL(anchor[1], 'https://hotelbyte.com').pathname;
    if (targetPath === '/' || redirects.has(targetPath) || fs.existsSync(htmlFileFor(targetPath)) || fs.existsSync(staticFileFor(targetPath))) continue;
    errors.push(`${pathname}: broken internal link ${targetPath}`);
  }
}

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(fullPath) : entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

const allPages = htmlFiles(dist);
for (const file of allPages) {
  const relative = path.relative(dist, file).replaceAll(path.sep, '/');
  const route = relative === 'index.html' ? '/'
    : relative.endsWith('/index.html') ? `/${relative.slice(0, -'/index.html'.length)}/`
      : `/${relative.slice(0, -'.html'.length)}`;
  const html = fs.readFileSync(file, 'utf8');
  if (count(html, /<title>/g) !== 1 || count(html, /<meta name="description"/g) !== 1 || count(html, /<link rel="canonical"/g) !== 1) {
    errors.push(`${route}: duplicate or missing document metadata`);
  }
  const localeMatch = /^\/(zh|hi|es|fr|ar|pt|de|tr|fil|he)(?:\/(.+))?$/.exec(route.replace(/\/+$/, '') || '/');
  const baseRoute = localeMatch ? `/${localeMatch[2] ?? ''}` : route; // '/zh/pay' → '/pay'
  // /pay is noindex by design: kept out of the sitemap but still prerendered
  // for its reviewed locales (zh, issue #22) so checkout keeps its language.
  // Untranslated tier-2 pages (English body) are reachable but must be
  // noindex, so they never sit outside the sitemap as indexable duplicates.
  const head = html.split('</head>', 1)[0];
  const isNoindex = /<meta name="robots" content="noindex/.test(head);
  if (localeMatch && !locations.has(`https://hotelbyte.com${route}`) && baseRoute !== '/pay' && !isNoindex) {
    errors.push(`${route}: indexable locale page exists outside sitemap`);
  }
  if (isNoindex && /<link rel="alternate" hreflang=/.test(head)) {
    errors.push(`${route}: noindex page still declares hreflang alternates`);
  }

  // Localized-body guard: a page published in a full-translation locale must
  // actually carry body text in that language. zh is full-content on every
  // published route; ar full-bodies '/' and '/products/ai-distribution'
  // (fullBodyRoutes in src/i18n/locale.ts). This is the regression net behind
  // the locale.ts note "verified by CJK-grepping every prerendered /zh body"
  // — the grep now actually runs on every build instead of having been a
  // one-off manual pass.
  if (localeMatch?.[1] === 'zh' || (localeMatch?.[1] === 'ar' && (baseRoute === '/' || baseRoute === '/products/ai-distribution'))) {
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' ');
    const expected = localeMatch[1] === 'zh'
      ? { label: 'Chinese', chars: count(visible, /[一-鿿]/g) }
      : { label: 'Arabic', chars: count(visible, /[؀-ۿ]/g) };
    if (expected.chars < 50) {
      errors.push(`${route}: ${localeMatch[1]} page carries almost no ${expected.label} body text (${expected.chars} chars) — a string likely bypassed the dictionaries`);
    }
  }
}

if (errors.length) throw new Error(`${errors.length} SEO artifact error(s):\n${errors.slice(0, 30).join('\n')}`);
console.info(`SEO artifact check passed: ${blocks.length} indexable URLs, ${allPages.length} static pages, metadata, hreflang, and internal links`);
