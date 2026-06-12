export type StoryLocale = 'zh' | 'en';

export interface DailyStoryContent {
  title: string;
  mood: string;
  theme: string;
  summary: string;
  body: string[];
  ctaLabel?: string;
}

export interface DailyStoryVisual {
  asset: 'hero';
  alt: Record<StoryLocale, string>;
  caption: Record<StoryLocale, string>;
}

export interface DailyStoryCta {
  href: string;
}

export interface DailyStory {
  date: string;
  slug: string;
  content: Record<StoryLocale, DailyStoryContent>;
  visual: DailyStoryVisual;
  cta?: DailyStoryCta;
  generatedBy: string;
  generatedAt: string;
}

export const dailyStoryTimeZone = 'Asia/Dubai';
export const dailyStoryRedirectStorageKey = 'hotelbyte-daily-story-redirect-date';

export const dailyStories: DailyStory[] = [
  {
    date: '2026-06-12',
    slug: 'why-the-homepage-wandered-away',
    content: {
      zh: {
        title: '为什么主页今天偷偷拐了个弯',
        mood: '一点顽皮，一点认真，还有一点想把每天都过得不一样。',
        theme: '把企业官网从固定橱窗变成有呼吸的日记',
        summary:
          'HotelByte 的首页今天没有急着介绍产品，而是先讲一个小念头：如果系统每天都在变化，主页为什么不能也有一点生命感？',
        body: [
          '很多官网像机场里的指示牌：干净、准确、永远站在原地。它们告诉访客产品是什么、价格在哪、按钮该点哪里。这些都很重要，但我总觉得还少了一点人的温度。',
          '做 HotelByte 的时候，我们天天和酒店、供应商、订单、价格、日志、异常打交道。每一条链路都很理性，每一个字段都要对齐，每一分钱都不能含糊。可是越是严谨的系统，越需要偶尔露出一点情绪，提醒自己技术不是只为了把世界变快，也是为了让世界变得更有意思。',
          '于是就有了今天这个念头：每天让主页倒流到一个小落地页。它可以讲一个故事，宣传一个理念，记录一次心情，也可以只是给路过的人递一张小纸条。',
          '这不是营销活动，更像是一扇每天会换风景的窗。今天它解释自己为什么出现；明天它也许会讲一个价格异常背后的误会；后天它可能写给凌晨还在排查供应商映射的人。',
          '如果你是第一次来，欢迎先读完这一天。读完以后，HotelByte 还是那个 HotelByte：严谨地处理酒店分销里的复杂性，只是偶尔也愿意把门口的灯调成不一样的颜色。'
        ],
        ctaLabel: '返回 HotelByte 首页'
      },
      en: {
        title: 'Why the Homepage Took a Small Detour Today',
        mood: 'A little playful, a little serious, and a little unwilling to let every day look the same.',
        theme: 'Turning a company homepage from a fixed display case into a living journal',
        summary:
          'Today HotelByte does not rush to introduce products first. It starts with a small thought: if systems change every day, why should the homepage feel frozen?',
        body: [
          'Many company websites feel like signs in an airport: clean, accurate, and permanently standing in the same place. They tell visitors what the product is, where the pricing lives, and which button to press. All of that matters, but it can still miss a little human temperature.',
          'Building HotelByte means spending every day with hotels, suppliers, orders, prices, logs, and exceptions. Every flow has to be precise. Every field needs to line up. Every amount of money has to mean exactly what it says. The more rigorous the system becomes, the more it deserves a small human signal now and then.',
          'That is where today’s idea came from: let the homepage flow backward into a small landing page each day. It can tell a story, promote a belief, record a mood, or simply leave a note for whoever happens to pass by.',
          'This is not a campaign. It is closer to a window whose view changes every morning. Today it explains why it exists. Tomorrow it might describe a pricing anomaly that was really a misunderstanding. The next day it might be written for someone debugging supplier mapping after midnight.',
          'If this is your first visit, read this day first. After that, HotelByte is still HotelByte: serious about the complexity of hotel distribution, just willing to change the color of the light at the door from time to time.'
        ],
        ctaLabel: 'Back to the HotelByte homepage'
      }
    },
    visual: {
      asset: 'hero',
      alt: {
        zh: '上下错位的发光层叠方块，像主页从固定轨道里轻轻漂移出来。',
        en: 'Two offset glowing layered blocks, like a homepage gently drifting out of its usual track.'
      },
      caption: {
        zh: '今天的主页没有消失，只是把自己拆成了两层：一层继续做产品入口，另一层每天讲一点人话。',
        en: 'The homepage did not disappear today. It split into two layers: one keeps serving the product, the other says something human each day.'
      }
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-seed',
    generatedAt: '2026-06-12T00:00:00+04:00'
  }
];

function dateInDailyStoryTimeZone(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: dailyStoryTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function getDailyStoryDate(now = new Date()): string {
  return dateInDailyStoryTimeZone(now);
}

export function getStoryForDate(date: string): DailyStory | undefined {
  return dailyStories.find((story) => story.date === date);
}

export function getTodayStory(now = new Date()): DailyStory | undefined {
  return getStoryForDate(getDailyStoryDate(now));
}

export function getStoryBySlug(slug: string | undefined): DailyStory | undefined {
  if (!slug) {
    return undefined;
  }
  return dailyStories.find((story) => story.slug === slug);
}

export function getStoryBySlugOrDate(value: string | undefined): DailyStory | undefined {
  if (!value) {
    return undefined;
  }
  return getStoryBySlug(value) ?? getStoryForDate(value);
}

export function getDailyStoriesArchive(): DailyStory[] {
  return [...dailyStories].sort((a, b) => b.date.localeCompare(a.date));
}
