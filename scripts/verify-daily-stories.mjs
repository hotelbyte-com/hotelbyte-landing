import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const outDir = join(tmpdir(), `hotelbyte-daily-stories-test-${Date.now()}`);

await rm(outDir, { force: true, recursive: true });
await mkdir(outDir, { recursive: true });

execFileSync(
  'npx',
  [
    'tsc',
    'src/data/dailyStories.ts',
    '--ignoreConfig',
    '--target',
    'ES2023',
    '--module',
    'ES2022',
    '--moduleResolution',
    'bundler',
    '--skipLibCheck',
    '--outDir',
    outDir
  ],
  { stdio: 'inherit' }
);

const {
  dailyStories,
  getStoryBySlug,
  getStoryForDate,
  getTodayStory,
  dailyStoryRedirectStorageKey
} = await import(pathToFileURL(join(outDir, 'dailyStories.js')).href);

assert.ok(dailyStoryRedirectStorageKey.length > 0);
assert.ok(dailyStories.length > 0);

const dates = new Set();
const slugs = new Set();

for (const story of dailyStories) {
  assert.match(story.date, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(story.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(story.title.length >= 4);
  assert.ok(story.mood.length >= 8);
  assert.ok(story.theme.length >= 4);
  assert.ok(story.summary.length >= 20);
  assert.ok(story.body.length >= 3);
  assert.ok(story.body.every((paragraph) => paragraph.length >= 20));
  assert.equal(dates.has(story.date), false, `duplicate story date: ${story.date}`);
  assert.equal(slugs.has(story.slug), false, `duplicate story slug: ${story.slug}`);
  dates.add(story.date);
  slugs.add(story.slug);
  assert.equal(getStoryForDate(story.date)?.slug, story.slug);
  assert.equal(getStoryBySlug(story.slug)?.date, story.date);
}

assert.equal(getStoryForDate('2099-01-01'), undefined);
assert.equal(getStoryBySlug('missing-story'), undefined);
assert.equal(getTodayStory(new Date('2026-06-11T20:00:00.000Z'))?.date, '2026-06-12');

await rm(outDir, { force: true, recursive: true });
