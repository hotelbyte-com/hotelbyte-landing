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

const { detectBrowserLocale } = await import(pathToFileURL(join(outDir, 'locale.js')).href);

assert.equal(detectBrowserLocale(['zh-CN', 'en-US']), 'zh');
assert.equal(detectBrowserLocale(['en-US', 'zh-CN']), 'en');
assert.equal(detectBrowserLocale(['fr-FR', 'zh-Hant-HK']), 'zh');
assert.equal(detectBrowserLocale(['ar-AE', 'de-DE']), 'zh');
assert.equal(detectBrowserLocale([]), 'zh');

await rm(outDir, { force: true, recursive: true });
