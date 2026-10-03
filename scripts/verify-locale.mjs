import assert from 'node:assert/strict';
import { mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const outDir = join(tmpdir(), `hotelbyte-locale-test-${Date.now()}`);

await rm(outDir, { force: true, recursive: true });
await mkdir(outDir, { recursive: true });

execFileSync(
  process.execPath,
  [
    'node_modules/typescript/bin/tsc',
    'src/i18n/locale.ts',
    '--ignoreConfig',
    '--target',
    'ES2023',
    '--module',
    'ES2022',
    '--moduleResolution',
    'bundler',
    '--skipLibCheck',
    '--outDir',
    outDir,
  ],
  { stdio: 'inherit' }
);

const {
  detectBrowserLocale, preferredHomepageLocale, localizedPath, basePath,
  pathLocale, publishedLocalesForPath, isPublishedLocale, supportedLocales, reviewedTranslations,
  isFullBodyLocale, fullBodyRoutes,
} = await import(pathToFileURL(join(outDir, 'locale.js')).href);

assert.equal(detectBrowserLocale(['zh-CN', 'en-US']), 'zh');
assert.equal(detectBrowserLocale(['en-US', 'zh-CN']), 'en');
assert.equal(detectBrowserLocale(['fr-FR', 'zh-Hant-HK']), 'fr');
assert.equal(detectBrowserLocale(['ar-AE', 'de-DE']), 'ar');
assert.equal(detectBrowserLocale(['tl-PH']), 'fil');
assert.equal(detectBrowserLocale(['iw-IL']), 'he');
assert.equal(detectBrowserLocale([]), 'en');
assert.equal(supportedLocales.length, 11);

assert.equal(localizedPath('/about', 'zh'), '/zh/about');
assert.equal(localizedPath('/zh/about?ref=nav', 'en'), '/about?ref=nav');
assert.equal(localizedPath('/', 'ar'), '/ar/');
assert.equal(basePath('/he/products/b2b-distribution'), '/products/b2b-distribution');
assert.equal(pathLocale('/fr/about'), 'fr');
assert.equal(pathLocale('/about'), null);
// zh ships full bodies; the nine tier-2 locales publish localized chrome with
// English bodies (see reviewedTranslations / englishBodyLocales in locale.ts).
// /pay and daily-story slugs intentionally stay English-only.
assert.deepEqual(publishedLocalesForPath('/about'), ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'pt', 'de', 'tr', 'fil', 'he']);
assert.equal(isPublishedLocale('/zh/about', 'zh'), true);
assert.equal(isPublishedLocale('/fr/about', 'fr'), true);
assert.deepEqual(publishedLocalesForPath('/pay'), ['en']);
assert.equal(isPublishedLocale('/zh/stories/some-slug', 'zh'), false);
// Full-body tier-2 rollout: Arabic ships translated home + AI distribution
// bodies (notice suppressed there); every other ar route stays chrome-only.
assert.deepEqual(fullBodyRoutes.ar, ['/', '/products/ai-distribution']);
assert.equal(isFullBodyLocale('ar', '/'), true);
assert.equal(isFullBodyLocale('ar', '/ar/products/ai-distribution'), true);
assert.equal(isFullBodyLocale('ar', '/ar'), true);
assert.equal(isFullBodyLocale('ar', '/about'), false);
assert.equal(isFullBodyLocale('ar', '/ar/products/b2b-distribution'), false);
assert.equal(isFullBodyLocale('zh', '/'), false);
assert.equal(isFullBodyLocale('hi', '/'), false);
assert.equal(isFullBodyLocale('en', '/'), false);
// Homepage is published in all 11 locales: browser locale wins when published.
assert.equal(preferredHomepageLocale(null, ['zh-CN']), 'zh');
assert.equal(preferredHomepageLocale('zh', ['en-US']), 'zh');
assert.equal(preferredHomepageLocale('en', ['zh-CN']), 'en');
assert.equal(preferredHomepageLocale(null, ['fr-FR']), 'fr');
assert.equal(preferredHomepageLocale(null, ['he-IL']), 'he');

delete reviewedTranslations['/about'];
assert.deepEqual(publishedLocalesForPath('/about'), ['en']);
assert.equal(isPublishedLocale('/zh/about', 'zh'), false);
reviewedTranslations['/about'] = ['zh'];
assert.deepEqual(publishedLocalesForPath('/about'), ['en', 'zh']);
assert.equal(isPublishedLocale('/zh/pay', 'zh'), false);

await rm(outDir, { force: true, recursive: true });
