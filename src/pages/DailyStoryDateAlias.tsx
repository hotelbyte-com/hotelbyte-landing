import DailyStory from './DailyStory';

export default function DailyStoryDateAlias({ date }: { date: string }) {
  return <DailyStory storyDateOverride={date} />;
}
