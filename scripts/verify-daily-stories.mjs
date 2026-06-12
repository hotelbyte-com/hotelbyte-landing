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
  getDailyStoriesArchive,
  getStoryBySlug,
  getStoryBySlugOrDate,
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
  assert.equal(story.visual.asset, 'hero');
  assert.ok(story.visual.alt.zh.length >= 8);
  assert.ok(story.visual.alt.en.length >= 8);
  assert.ok(story.visual.caption.zh.length >= 20);
  assert.ok(story.visual.caption.en.length >= 20);
  for (const locale of ['zh', 'en']) {
    const content = story.content[locale];
    assert.ok(content.title.length >= 4);
    assert.ok(content.mood.length >= 8);
    assert.ok(content.theme.length >= 4);
    assert.ok(content.summary.length >= 20);
    assert.ok(content.body.length >= 3);
    assert.ok(content.body.every((paragraph) => paragraph.length >= 20));
  }
  assert.equal(dates.has(story.date), false, `duplicate story date: ${story.date}`);
  assert.equal(slugs.has(story.slug), false, `duplicate story slug: ${story.slug}`);
  dates.add(story.date);
  slugs.add(story.slug);
  assert.equal(getStoryForDate(story.date)?.slug, story.slug);
  assert.equal(getStoryBySlug(story.slug)?.date, story.date);
  assert.equal(getStoryBySlugOrDate(story.slug)?.date, story.date);
  assert.equal(getStoryBySlugOrDate(story.date)?.slug, story.slug);
}

assert.equal(getStoryForDate('2099-01-01'), undefined);
assert.equal(getStoryBySlug('missing-story'), undefined);
assert.equal(getStoryBySlugOrDate('missing-story'), undefined);
assert.equal(getTodayStory(new Date('2026-06-11T20:00:00.000Z'))?.date, '2026-06-12');
assert.deepEqual(
  getDailyStoriesArchive().map((story) => story.date),
  [...dailyStories].map((story) => story.date).sort((a, b) => b.localeCompare(a))
);

await rm(outDir, { force: true, recursive: true });
