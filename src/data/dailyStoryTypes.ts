import type { DailyStory, DailyStoryContent, DailyStoryVisual, StoryLocale } from './dailyStories';

// The listing view of a story: everything /stories and the homepage feature
// render, without the body. Generated into src/data/generated/ from
// dailyStories.ts (see scripts/generate-daily-story-data.mjs).
export type DailyStoryListItem = Pick<DailyStory, 'date' | 'slug'> & {
  content: Record<StoryLocale, Pick<DailyStoryContent, 'title' | 'mood' | 'summary'>>;
  visual: Pick<DailyStoryVisual, 'src' | 'alt'>;
};
