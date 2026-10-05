import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n, contentLocaleOf } from '../i18n';
import { isPublishedLocale, localizedPath } from '../i18n/locale';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema, itemListSchema } from '../seo/schema';
import { lineEntries, productLines } from '../data/products';
import { latestDailyStory } from '../data/generated/dailyStoryLatest';

export default function Home() {
  const { t, locale } = useI18n();
  const isEn = locale !== 'zh'; // tier-2 locales without a dictionary entry fall back to English via t()
  const loc = SITE_ROUTES.home.localized?.[locale];
  const cl = contentLocaleOf(locale); // tier-2 locales render the English body
  const reduceMotion = useReducedMotion();
  const pathFor = (path: string) => localizedPath(path, isPublishedLocale(path, locale) ? locale : 'en');
  const featuredStory = latestDailyStory;

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay, ease: 'easeOut' as const },
        };

  const route = SITE_ROUTES.home;
  const productListSchema = itemListSchema(
    isEn ? 'Stai product lines' : 'Stai 产品线',
    isEn
      ? 'Stai Retail for independent sellers, Stai API for B2B at scale, and Stai Counselor for travel advisors, on one HotelByte platform.'
      : '同一个 HotelByte 平台上的 Stai Retail（独立卖家）、Stai API（规模化 B2B）与 Stai Counselor（旅行顾问）。',
    productLines.map((line) => ({
      name: line.name,
      path: `/products/${line.slug}`,
      description: isEn ? line.summaryEn : line.summary
    }))
  );
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(route.path, loc?.title ?? (isEn ? route.title : route.titleZh), loc?.description ?? (isEn ? route.description : route.descriptionZh), locale === 'zh' ? 'zh-CN' : locale),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' }
    ]),
    productListSchema
  ];

  return (
    <>
      <Seo
        path={route.path}
        title={loc?.title ?? (isEn ? route.title : route.titleZh)}
        description={loc?.description ?? (isEn ? route.description : route.descriptionZh)}
        locale={locale === 'zh' ? 'zh-CN' : locale}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-[7fr_5fr] gap-14 lg:gap-16 items-center">
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, ease: 'easeOut' as const },
                })}
          >
            <p className="eyebrow flex items-center gap-2.5 mb-7">
              <span className="inline-block w-1.5 h-1.5 bg-seal" aria-hidden="true" />
              {t('home.hero.eyebrow', isEn ? 'Hotel distribution infrastructure' : '酒店分销基础设施')}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.4] tracking-normal mb-8">
              {t('home.hero.title1', isEn ? 'Connect hotel supply.' : '连接酒店供应。')}<br />
              {t('home.hero.title2', isEn ? 'Operate distribution.' : '运营分销业务。')}<br />
              <span className="text-ink/55">{t('home.hero.title3', isEn ? 'Serve travel sellers.' : '服务旅行商。')}</span>
            </h1>
            <p className="text-lg text-ink/65 leading-relaxed mb-8 max-w-xl">
              {t('home.hero.subtitle', isEn
                ? 'HotelByte helps distribution platforms and travel sellers bring supplier connectivity, B2B workflows, price intelligence, and operational diagnostics into one place.'
                : 'HotelByte 帮助分销平台与旅行商把供应商接入、B2B 工作流、价格情报和运营诊断放到同一个体系中。')}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to={pathFor('/demo')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-ink text-paper font-medium hover:bg-ink-deep transition-colors">
                {t('home.hero.cta.demo', isEn ? 'Explore the demo' : '查看在线演示')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a href="mailto:sales@hotelbyte.com?subject=HotelByte%20distribution%20briefing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-ink/25 text-ink font-medium hover:border-ink/60 transition-colors">
                {t('home.hero.cta.sales', isEn ? 'Contact sales' : '联系销售')}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
              <Link to={pathFor('/solutions/dmc')} className="text-brass hover:underline">
                {t('home.hero.link.dmc', isEn ? 'For DMCs & ground operators' : '面向地接社')} →
              </Link>
              <Link to={pathFor('/solutions/travel-agency')} className="text-brass hover:underline">
                {t('home.hero.link.sellers', isEn ? 'For travel agencies' : '面向旅行社')} →
              </Link>
              <Link to={pathFor('/solutions/distribution-platforms')} className="text-brass hover:underline">
                {t('home.hero.link.platforms', isEn ? 'For distribution platforms' : '面向分销平台')} →
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.15, ease: 'easeOut' as const },
                })}
            className="border border-line bg-paper-raised p-6 sm:p-8"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-8">
              {t('home.hero.panel.title', isEn ? 'How the platform fits together' : '平台如何连接业务')}
            </h2>
            <ol className="space-y-6">
              {[
                {
                  number: '01',
                  title: t('home.hero.step1.title', isEn ? 'Connect supply' : '连接供应'),
                  detail: t('home.hero.step1.detail', isEn ? 'Supplier integrations and normalized hotel data.' : '供应商集成与标准化酒店数据。')
                },
                {
                  number: '02',
                  title: t('home.hero.step2.title', isEn ? 'Distribute with control' : '受控分销'),
                  detail: t('home.hero.step2.detail', isEn ? 'B2B search, booking, access, and customer workflows.' : 'B2B 搜索、预订、权限与客户工作流。')
                },
                {
                  number: '03',
                  title: t('home.hero.step3.title', isEn ? 'Investigate and improve' : '诊断与优化'),
                  detail: t('home.hero.step3.detail', isEn ? 'Trace sessions and examine pricing signals.' : '追踪会话，分析价格信号。')
                }
              ].map((step) => (
                <li key={step.number} className="flex gap-5 border-t border-line pt-5 first:border-0 first:pt-0">
                  <span className="font-mono text-brass text-sm">{step.number}</span>
                  <div>
                    <h3 className="font-display text-xl mb-1">{step.title}</h3>
                    <p className="text-sm text-ink/60 leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to={pathFor('/guides/hotel-distribution')}
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-brass hover:underline">
              {t('home.hero.guide', isEn ? 'Read the hotel distribution guide' : '阅读酒店分销指南')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {featuredStory && (
        <section className="border-y border-line bg-paper-raised py-12 px-6 lg:px-8" aria-labelledby="featured-story-heading">
          <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_2fr] gap-8 items-center">
            <img src={featuredStory.visual.src} alt={featuredStory.visual.alt[cl]} loading="lazy"
              className="w-full max-h-44 object-contain" />
            <div>
              <p className="eyebrow mb-3">{t('home.story.eyebrow', isEn ? 'Featured Daily Story' : '精选每日故事')} · {featuredStory.date}</p>
              <h2 id="featured-story-heading" className="font-display text-2xl lg:text-3xl leading-[1.3] mb-3">
                {featuredStory.content[cl].title}
              </h2>
              <p className="text-ink/65 leading-relaxed mb-4">{featuredStory.content[cl].summary}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brass">
                <Link to={pathFor('/stories/' + featuredStory.slug)} className="hover:underline">
                  {t('home.story.read', isEn ? 'Read this story' : '阅读故事')} →
                </Link>
                <Link to={pathFor('/stories')} className="hover:underline">
                  {t('home.story.browse', isEn ? 'Browse all stories' : '浏览全部故事')} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform capabilities */}
      <section className="bg-ink-deep text-paper py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow-dark mb-5">{t('home.cap.eyebrow', isEn ? 'Platform architecture' : '平台架构')}</p>
              <h2 className="font-display text-3xl lg:text-4xl leading-[1.3] tracking-normal mb-5">
                {t('home.cap.title', isEn ? 'What the platform brings together' : '平台能力如何协同')}
              </h2>
              <p className="text-paper/65 leading-relaxed text-lg">
                {t('home.cap.lead', isEn
                  ? 'HotelByte combines distribution infrastructure with query, diagnostic, and governance tools. Explore the relevant product page or demo to evaluate each capability.'
                  : 'HotelByte 将分销基础设施与查询、诊断和治理工具结合。您可以通过相关产品页或演示逐项评估。')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-paper/15 border border-paper/15">
              {[
                { label: t('home.cap.g1.label', isEn ? 'AI Workflows' : 'AI 工作流'), value: t('home.cap.g1.value', isEn ? 'Product-specific capabilities' : '按产品提供具体能力') },
                { label: t('home.cap.g2.label', isEn ? 'Data Queries' : '数据查询'), value: t('home.cap.g2.value', isEn ? 'Review supported sources per deployment' : '按部署环境核对支持的数据源') },
                { label: t('home.cap.g3.label', isEn ? 'Diagnostics' : '诊断'), value: t('home.cap.g3.value', isEn ? 'Session-linked evidence' : '关联会话证据') },
                { label: t('home.cap.g4.label', isEn ? 'Access Review' : '权限验证'), value: t('home.cap.g4.value', isEn ? 'Test with scoped accounts' : '使用限定权限账号测试') },
              ].map((item, i) => (
                <div key={i} className="bg-ink-deep p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass-bright mb-1.5">{item.label}</div>
                  <div className="text-sm text-paper">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO — Definition Cards (semantic <dl>) */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">{t('home.def.eyebrow', isEn ? 'Definitions' : '定义卡')}</p>
            <h2 className="font-display text-3xl lg:text-4xl leading-[1.3] tracking-normal mb-4">{t('home.def.title')}</h2>
            <p className="text-ink/65 leading-relaxed text-lg">{t('home.def.lead')}</p>
          </motion.div>
          <dl className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              { term: t('home.def.aiNative.term'), def: t('home.def.aiNative.def') },
              { term: t('home.def.dist.term'), def: t('home.def.dist.def') },
              { term: t('home.def.native.term'), def: t('home.def.native.def') },
            ].map((item, i) => (
              <motion.div {...fade(0.08 * i)} key={i} className="border-t-2 border-ink pt-6">
                <dt className="font-display text-xl tracking-normal mb-3">{item.term}</dt>
                <dd className="text-sm text-ink/70 leading-relaxed">{item.def}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* Product lines: Stai Retail / Stai API / Stai Counselor */}
      <section id="products" className="py-20 lg:py-24 bg-paper-raised border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="max-w-2xl mb-14">
            <p className="eyebrow mb-5">{t('home.products.eyebrow', isEn ? 'Products' : '产品')}</p>
            <h2 className="font-display text-3xl lg:text-4xl leading-[1.3] tracking-normal">{t('products.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border border-line">
            {productLines.map((line, i) => (
              <motion.article {...fade(0.05 * (i + 1))} key={line.key} className="group flex flex-col bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
                <h3 className="font-display text-3xl tracking-normal mb-2">{line.name}</h3>
                {line.earlyAccess && <p className="self-start mb-3 px-2.5 py-1 border border-brass/50 text-brass text-xs font-medium rounded-sm">{t('home.line.earlyAccess', isEn ? 'Early access' : '早期访问')}</p>}
                <p className="text-brass font-medium mb-4">{t(`nav.hint.line.${line.key}`, isEn ? line.descriptorEn : line.descriptor)}</p>
                <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t(`home.line.${line.key}.audience`, isEn ? line.audienceEn : line.audience)}</p>
                <ul className="mb-8 space-y-2 text-sm">
                  {lineEntries(line).map((entry) => (
                    <li key={entry.key}>
                      <Link to={pathFor(entry.to)} className="text-ink/75 hover:text-ink hover:underline">
                        {t(`nav.link.${entry.key}`, isEn ? entry.nameEn : entry.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={pathFor(`/products/${line.slug}`)} className="mt-auto inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                  {t(`home.line.${line.key}.cta`, isEn ? `Explore ${line.name}` : `了解 ${line.name}`)} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* TraceSight Band */}
      <section className="bg-ink-deep text-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-normal leading-[1.15] mb-6">
                TraceSight<br />
                <span className="text-brass-bright">{t('home.trace.subtitle', isEn ? 'Full-Linkage Diagnostics' : '全链路智能诊断')}</span>
              </h2>
              <p className="text-lg text-paper/65 leading-relaxed mb-8">
                {t('home.trace.lead', isEn
                  ? 'Trace sessions across the distribution workflow so teams can investigate booking issues with shared evidence.'
                  : '在分销工作流中追踪会话，让团队依据共同的证据排查预订问题。')}
              </p>
              <ul className="space-y-3.5 mb-10">
                {[
                  t('home.trace.b1', isEn ? 'Full-linkage request tracing and log aggregation' : '全链路请求追踪与日志聚合'),
                  t('home.trace.b2', isEn ? 'Inspect request and response context during investigations' : '排查时查看请求与响应上下文'),
                  t('home.trace.b3', isEn ? 'Price and mapping anomaly investigation' : '价格与房型映射异常排查'),
                  t('home.trace.b4', isEn ? 'Share evidence between operations and support teams' : '在运营与支持团队之间共享证据'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-paper/80">
                    <span className="mt-2 w-1.5 h-1.5 bg-brass-bright shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={pathFor('/products/tracesight')}
                className="inline-block px-6 py-3 rounded-sm border border-paper/25 hover:bg-paper hover:text-ink transition-colors font-medium"
              >
                {t('home.trace.cta', isEn ? 'Explore TraceSight' : '查看 TraceSight 详情')}
              </Link>
            </div>

            <motion.div {...fade(0.1)} className="border border-paper/15 bg-ink-deep">
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-paper/10">
                <span className="w-2 h-2 rounded-sm bg-brass-bright" aria-hidden="true" />
                <span className="font-mono text-xs text-paper/50">TraceSight · {t('home.trace.panel.tag', isEn ? 'illustrative trace' : '示意追踪')}</span>
              </div>
              <div className="p-6 space-y-4 font-mono text-sm">
                <div className="flex items-center justify-between px-4 py-3 border border-paper/10 bg-paper/[0.04]">
                  <div className="flex items-center gap-4">
                    <span className="text-brass-bright">GET</span>
                    <span className="text-paper/80">/api/v1/search/checkAvail</span>
                  </div>
                  <span className="text-paper/40">{t('home.trace.panel.request', isEn ? 'request' : '请求')}</span>
                </div>
                <div className="ml-4 sm:ml-8 border-l border-paper/15 pl-4 sm:pl-8">
                  <div className="px-4 py-3 border border-paper/10 bg-paper/[0.04]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-seal-bright text-xs tracking-[0.14em]">{t('home.trace.panel.triage', isEn ? 'EXAMPLE TRIAGE' : '排查示例')}</span>
                    </div>
                    <p className="text-paper/70 font-sans text-sm leading-relaxed">
                      {t('home.trace.panel.example', isEn
                        ? "Example: a room mapping mismatch appears between a supplier response and downstream inventory."
                        : '示例：供应商响应与下游库存之间出现房型映射不一致。')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Buyer paths */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">{t('home.paths.eyebrow', isEn ? 'Choose your path' : '按业务场景探索')}</p>
            <h2 className="font-display text-3xl lg:text-4xl leading-[1.3] tracking-normal mb-4">
              {t('home.paths.title', isEn ? 'Hotel distribution for the teams that run it' : '面向实际运营酒店分销的团队')}
            </h2>
            <p className="text-ink/65 leading-relaxed">
              {t('home.paths.lead', isEn
                ? 'Start with the workflow that matches your business, then inspect the product and its integration points.'
                : '先从符合您业务的工作流出发，再查看产品和集成方式。')}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
            {[
              {
                title: t('home.paths.card1.title', isEn ? 'Distribution platforms' : '分销平台'),
                text: t('home.paths.card1.text', isEn ? 'Connect supply, structure customer access, and investigate booking operations.' : '接入供应、管理客户权限并诊断预订链路。'),
                path: '/solutions/distribution-platforms'
              },
              {
                title: t('home.paths.card2.title', isEn ? 'Travel agencies' : '旅行社'),
                text: t('home.paths.card2.text', isEn ? 'Compare net rates in one search and book on a B2B platform built around how agencies work.' : '一次搜索对比净价，在按旅行社业务流程设计的 B2B 平台上完成预订。'),
                path: '/solutions/travel-agency'
              },
              {
                title: t('home.paths.card3.title', isEn ? 'Evaluation checklist' : '选型指南'),
                text: t('home.paths.card3.text', isEn ? 'Questions and demonstrations to use when comparing distribution platforms.' : '比较酒店分销平台时可直接使用的问题与验证方法。'),
                path: '/compare'
              }
            ].map((card) => (
              <article key={card.path} className="bg-paper p-8">
                <h3 className="font-display text-xl mb-3">{card.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-6">{card.text}</p>
                <Link to={pathFor(card.path)} className="inline-flex items-center gap-2 text-sm font-medium text-brass hover:underline">
                  {t('home.paths.explore', isEn ? 'Explore' : '了解更多')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-paper-raised border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{t('home.cta.eyebrow', isEn ? 'See the workflow' : '查看业务工作流')}</p>
            <h2 className="font-display text-3xl lg:text-4xl mb-4">
              {t('home.cta.title', isEn ? 'Evaluate HotelByte with your own requirements' : '根据您的需求评估 HotelByte')}
            </h2>
            <p className="text-ink/65 leading-relaxed">
              {t('home.cta.lead', isEn
                ? 'Try the online demo or contact our team to discuss supplier, customer, and operating requirements.'
                : '体验在线演示，或与团队讨论供应商、客户和运营需求。')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={pathFor('/demo')} className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-medium hover:bg-ink-deep">
              {t('home.cta.demo', isEn ? 'Open demo' : '打开演示')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a href="mailto:sales@hotelbyte.com?subject=HotelByte%20distribution%20briefing"
              className="inline-flex items-center px-6 py-3 border border-ink/25 font-medium hover:border-ink/60">
              {t('home.hero.cta.sales', isEn ? 'Contact sales' : '联系销售')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
