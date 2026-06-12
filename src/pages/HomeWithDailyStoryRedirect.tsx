import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import {
  dailyStoryRedirectStorageKey,
  getDailyStoryDate,
  getTodayStory
} from '../data/dailyStories';

function shouldRedirectToDailyStory(date: string): boolean {
  try {
    return window.localStorage.getItem(dailyStoryRedirectStorageKey) !== date;
  } catch {
    return true;
  }
}

function markDailyStoryRedirected(date: string) {
  try {
    window.localStorage.setItem(dailyStoryRedirectStorageKey, date);
  } catch {
    // Storage can be unavailable in private or locked-down browsers.
  }
}

export default function HomeWithDailyStoryRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const today = getDailyStoryDate();
    const story = getTodayStory();

    if (!story || !shouldRedirectToDailyStory(today)) {
      return;
    }

    markDailyStoryRedirected(today);
    navigate(`/stories/${story.slug}`, { replace: true });
  }, [navigate]);

  return <Home />;
}
