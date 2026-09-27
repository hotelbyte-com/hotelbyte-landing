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
assert.deepEqual(publishedLocalesForPath('/about'), ['en']);
assert.equal(isPublishedLocale('/zh/about', 'zh'), false);
assert.equal(preferredHomepageLocale(null, ['zh-CN']), 'en');
assert.equal(preferredHomepageLocale('zh', ['en-US']), 'en');
assert.equal(preferredHomepageLocale('en', ['zh-CN']), 'en');

reviewedTranslations['/about'] = ['zh'];
assert.deepEqual(publishedLocalesForPath('/about'), ['en', 'zh']);
assert.deepEqual(publishedLocalesForPath('/zh/about'), ['en', 'zh']);
assert.equal(isPublishedLocale('/zh/about', 'zh'), true);
assert.equal(isPublishedLocale('/zh/privacy', 'zh'), false);
delete reviewedTranslations['/about'];

await rm(outDir, { force: true, recursive: true });
