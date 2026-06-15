import { ArrowLeft, ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getStoryBySlugOrDate } from '../data/dailyStories';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { articleSchema, breadcrumbSchema, faqSchema } from '../seo/schema';

export default function DailyStory() {
  const { storyKey, storyDate } = useParams();
  const { locale } = useI18n();
  const story = getStoryBySlugOrDate(storyKey ?? storyDate);
  const isEn = locale === 'en';
  const isDateAlias = Boolean(storyDate && !storyKey);
  const path = story
    ? isDateAlias
      ? `/${story.date}`
      : `/stories/${story.slug}`
    : '/stories';

  if (!story) {
    return (
      <section className="min-h-[70vh] px-6 lg:px-8 py-24 flex items-center">
        <Seo
          path={path}
          title={isEn ? 'Daily Story Not Found — HotelByte' : '未找到每日故事 — HotelByte'}
          description={isEn
            ? 'The requested daily story was not found. Browse the HotelByte daily story archive to read all cross-sections of the system.'
            : '未找到指定的每日故事。可浏览 HotelByte 每日故事合集,阅读系统的完整工程剖面。'}
          locale={isEn ? 'en' : 'zh-CN'}
          noindex
        />
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-glow mb-8">
            <Sparkles className="w-4 h-4" />
            Daily Story
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
            {isEn ? 'Today’s story is still on its way' : '今天的故事还在路上'}
          </h1>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            {isEn
              ? 'This landing page was not found. You can browse the archive first, then wait for the homepage to take another turn.'
              : '这个落地页暂时没有找到。你可以先浏览故事合集，等下一次主页再把你带到新的地方。'}
          </p>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? 'View all stories' : '查看所有故事'}
          </Link>
        </div>
      </section>
    );
  }

  const content = story.content[locale];
  const storyKeywords = story.nextThemeSeeds[locale];
  const article = articleSchema({
    headline: content.title,
    description: content.summary,
    datePublished: story.generatedAt,
    path,
    image: `https://hotelbyte.com${story.visual.src}`,
    inLanguage: isEn ? 'en' : 'zh-CN',
    keywords: storyKeywords
  });
  const storyFaq = faqSchema(
    isEn
      ? [
          { q: `What is the daily story for ${story.date}?`, a: content.summary },
          { q: `Why does this story matter for ${story.theme.toLowerCase()}?`, a: content.body[0] ?? content.summary }
        ]
      : [
          { q: `${story.date} 的每日故事讲了什么?`, a: content.summary },
          { q: `这个故事为什么对“${content.theme}”重要?`, a: content.body[0] ?? content.summary }
        ]
  );
  const breadcrumb = breadcrumbSchema([
    { name: isEn ? 'Home' : '首页', path: '/' },
    { name: isEn ? 'Daily Stories' : '每日故事', path: '/stories' },
    { name: content.title, path }
  ]);
  const seoTitle = isDateAlias
    ? `${content.title} — ${story.date}`
    : `${content.title} | HotelByte Daily Story`;

  return (
    <article className="relative overflow-hidden">
      <Seo
        path={path}
        title={seoTitle}
        description={content.summary}
        keywords={storyKeywords}
        ogType="article"
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={[article, breadcrumb, storyFaq]}
      />
      <section className="relative px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(0,240,255,0.16),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(176,38,255,0.18),transparent_34%)]" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/50 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-cyan-glow">
                <Sparkles className="w-4 h-4" />
                {isEn ? 'Daily Detour' : '每日倒流'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <CalendarDays className="w-4 h-4" />
                {story.date}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-display font-bold leading-[1.16] mb-6 max-w-3xl">
              {content.title}
            </h1>
            <p className="text-lg lg:text-xl text-cyan-glow/90 leading-relaxed max-w-2xl mb-6">
              {content.mood}
            </p>
            <p className="text-base lg:text-lg text-white/60 leading-relaxed max-w-2xl">
              {content.summary}
            </p>
          </div>

          <figure className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <img
                src={story.visual.src}
                alt={story.visual.alt[locale]}
                width={640}
                height={400}
                loading="lazy"
                decoding="async"
                className="mx-auto w-full max-w-80 aspect-[16/10] object-contain rounded-xl drop-shadow-[0_18px_42px_rgba(176,38,255,0.18)]"
              />
            </div>
            <figcaption className="mt-4 text-sm text-white/45 leading-relaxed">
              {story.visual.caption[locale]}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="text-xs uppercase tracking-[0.2em] text-white/35 mb-3">
              {isEn ? "Today's theme" : '今日主题'}
            </div>
            <div className="text-xl font-display font-bold text-gradient leading-snug mb-8">
              {content.theme}
            </div>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-glow hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEn ? 'View all stories' : '查看所有故事'}
            </Link>
            <Link
              to={story.cta?.href ?? '/'}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/55 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {content.ctaLabel ?? (isEn ? 'Back to the HotelByte homepage' : '返回 HotelByte 首页')}
            </Link>

          </aside>

          <div className="space-y-8">
            {content.body.map((paragraph, index) => (
              <p
                key={`${story.slug}-${index}`}
                className="text-lg lg:text-xl text-white/72 leading-[1.9] font-light"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-8">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 px-6 py-4 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white hover:text-abyss-blue transition-all font-bold"
                >
                  {isEn ? 'See what HotelByte is building' : '看看 HotelByte 正在建造什么'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`/${story.date}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/45 hover:text-cyan-glow transition-colors"
                >
                  <CalendarDays className="w-4 h-4" />
                  {isEn ? 'Date URL' : '日期 URL'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
