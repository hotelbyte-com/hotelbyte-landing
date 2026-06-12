import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDailyStoriesArchive } from '../data/dailyStories';

export default function DailyStoriesIndex() {
  const stories = getDailyStoriesArchive();

  return (
    <section className="px-6 lg:px-8 py-16 lg:py-24 min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-8">
            <Sparkles className="w-4 h-4" />
            每日倒流
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
            所有拐过弯的主页
          </h1>
          <p className="text-lg text-white/60 leading-relaxed">
            每天 HotelByte 首页都会把第一次来访带到一个小落地页。这里保留所有故事，也保留它们原本出现的日期。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Link
              key={story.date}
              to={`/stories/${story.slug}`}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-glow/40 hover:bg-white/[0.05] transition-all"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-white/45">
                  <CalendarDays className="w-4 h-4" />
                  {story.date}
                </span>
                <ArrowRight className="w-5 h-5 text-white/35 group-hover:text-cyan-glow group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-2xl font-display font-bold leading-tight mb-4">
                {story.title}
              </h2>
              <p className="text-sm text-cyan-glow/80 leading-relaxed mb-4">
                {story.mood}
              </p>
              <p className="text-white/55 leading-relaxed">
                {story.summary}
              </p>
              <div className="mt-6 text-xs text-white/35">
                日期 URL: /{story.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
