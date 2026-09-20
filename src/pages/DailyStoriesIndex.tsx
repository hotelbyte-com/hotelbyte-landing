import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDailyStoriesArchive } from '../data/dailyStories';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { webPageSchema, breadcrumbSchema, collectionPageSchema } from '../seo/schema';

export default function DailyStoriesIndex() {
  const stories = getDailyStoriesArchive();
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.stories;
  const collection = collectionPageSchema({
    name: isEn ? route.title : route.titleZh,
    description: isEn ? route.description : route.descriptionZh,
    path: route.path,
    hasPart: stories.map((s) => ({
      name: s.content[locale].title,
      path: `/stories/${s.slug}`
    }))
  });
  const jsonLd = [
    webPageSchema(route.path, isEn ? route.title : route.titleZh, isEn ? route.description : route.descriptionZh, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: isEn ? 'Daily Stories' : '每日故事', path: '/stories' }
    ]),
    collection
  ];

  return (
    <section className="px-6 lg:px-8 py-16 lg:py-24 min-h-[70vh]">
      <Seo
        path={route.path}
        title={isEn ? route.title : route.titleZh}
        description={isEn ? route.description : route.descriptionZh}
        keywords={route.keywords}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brass/10 border border-brass/20 text-xs font-medium text-brass mb-8">
            <Sparkles className="w-4 h-4" />
            {isEn ? 'Daily Detour' : '每日倒流'}
          </div>
          <h1 className="text-4xl lg:text-5xl font-display leading-tight mb-6">
            {isEn ? 'Every homepage that took a turn' : '所有拐过弯的主页'}
          </h1>
          <p className="text-lg text-ink/60 leading-relaxed">
            {isEn
              ? 'Each day, the HotelByte homepage can bring a first visit into a small landing page. This archive keeps every story and the date it first appeared.'
              : '每天 HotelByte 首页都会把第一次来访带到一个小落地页。这里保留所有故事，也保留它们原本出现的日期。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Link
              key={story.date}
              to={`/stories/${story.slug}`}
              className="group overflow-hidden rounded-sm bg-paper-raised border border-line hover:border-brass/40 hover:bg-paper-raised transition-all"
            >
              <div className="aspect-[16/9] bg-paper-raised border-b border-line p-6 flex items-center justify-center">
                <img
                  src={story.visual.src}
                  alt={story.visual.alt[locale]}
                  className="h-full max-h-44 object-contain drop-shadow-[0_14px_32px_rgba(176,38,255,0.22)]"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-ink/45">
                    <CalendarDays className="w-4 h-4" />
                    {story.date}
                  </span>
                  <ArrowRight className="w-5 h-5 text-ink/35 group-hover:text-brass group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-xl font-display leading-snug mb-4">
                  {story.content[locale].title}
                </h2>
                <p className="text-sm text-brass/80 leading-relaxed mb-4">
                  {story.content[locale].mood}
                </p>
                <p className="text-ink/55 leading-relaxed">
                  {story.content[locale].summary}
                </p>
                <div className="mt-6 text-xs text-ink/35">
                  {isEn ? 'Date URL' : '日期 URL'}: /{story.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
