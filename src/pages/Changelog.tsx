import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { webPageSchema, breadcrumbSchema } from '../seo/schema';

type ChangelogEntry = {
  date: string;
  titleEn: string;
  titleZh: string;
  bodyEn: string;
  bodyZh: string;
  tagEn: string;
  tagZh: string;
};

const ENTRIES: ChangelogEntry[] = [
  {
    date: '2026-06-13',
    titleEn: 'SEO / GEO / AEO foundation shipped',
    titleZh: 'SEO / GEO / AEO 基础能力上线',
    bodyEn:
      'Added robots.txt, sitemap.xml (38 routes with hreflang), llms.txt, llms-full.txt, manifest.json, OG image, and favicon. Per-route Helmet-driven meta + JSON-LD injection for Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication, ItemList, FAQPage, HowTo, Article, and CollectionPage. AEO surface includes home definition cards, comparison FAQ, and per-product HowItWorks sections. New /about and /changelog pages expose the entity layer that AI engines prefer to cite.',
    bodyZh:
      '新增 robots.txt、sitemap.xml（38 条路由含 hreflang）、llms.txt、llms-full.txt、manifest.json、OG 图与 favicon。按路由的 Helmet meta + JSON-LD 注入覆盖 Organization、WebSite、WebPage、BreadcrumbList、SoftwareApplication、ItemList、FAQPage、HowTo、Article、CollectionPage。AEO 表面包含首页定义卡、竞品对比 FAQ 与每个产品页的 HowItWorks 区。新增 /about 与 /changelog 页面，承接 AI 引擎偏好的实体层引用。',
    tagEn: 'Platform',
    tagZh: '平台'
  },
  {
    date: '2026-06-12',
    titleEn: 'Daily Stories editorial arc completed',
    titleZh: '每日故事编辑弧完成',
    bodyEn:
      'Twelve editorial cross-sections published, each treating the homepage as a product cross-section. Archive available at /stories; each story ships with Article + BreadcrumbList + FAQPage structured data and dual /stories/:slug + /:date URL aliases.',
    bodyZh:
      '完成 12 段编辑剖面，将首页当作产品切面来讲。归档在 /stories；每段均带 Article + BreadcrumbList + FAQPage 结构化数据，并支持 /stories/:slug 与 /:date 两种 URL 别名。',
    tagEn: 'Editorial',
    tagZh: '编辑'
  },
  {
    date: '2026-06-01',
    titleEn: 'Product suite expanded to seven lines',
    titleZh: '产品矩阵扩展至七条产品线',
    bodyEn:
      'AI-Native Automations, Lookout Price Intelligence, Enterprise Distribution Base, TraceSight, RevenuePilot, MarginLift, and DeepSeek V4-Flash Appliance now ship as a coherent suite, each with its own SoftwareApplication schema and bilingual metadata.',
    bodyZh:
      'AI 原生自动化、Lookout 价格情报、企业级分销底座、TraceSight、RevenuePilot、MarginLift 与 DeepSeek V4-Flash 一体机七条产品线统一发布，均带独立的 SoftwareApplication 结构化数据与双语元信息。',
    tagEn: 'Products',
    tagZh: '产品'
  }
];

export default function Changelog() {
  const { locale, t } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.changelog;
  const title = t('changelog.title', isEn ? 'Changelog' : '更新日志');
  const subtitle = t('changelog.subtitle', isEn ? route.description : route.descriptionZh);
  const lead = t(
    'changelog.lead',
    isEn
      ? 'This page records structural changes that affect AI-engine and search-engine visibility, product page and marketing content updates, and breaking interface changes.'
      : '本页记录影响 AI 引擎与搜索引擎可见性的结构性变更、产品页与营销内容更新，以及破坏性接口改动。'
  );

  const jsonLd = [
    webPageSchema(route.path, title, subtitle, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: title, path: route.path }
    ])
  ];

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-4xl mx-auto">
      <Seo
        path={route.path}
        title={title}
        description={subtitle}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-6">
          {isEn ? 'Changelog' : '更新日志'}
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">{subtitle}</p>
      </motion.header>

      {/* Lead */}
      <p className="text-white/70 text-center max-w-2xl mx-auto mb-12 leading-relaxed">{lead}</p>

      {/* Timeline */}
      <ol className="space-y-6">
        {ENTRIES.length === 0 ? (
          <li className="text-center text-white/50">
            {t('changelog.empty', isEn ? 'No changelog entries yet.' : '暂无变更记录。')}
          </li>
        ) : (
          ENTRIES.map((entry, idx) => (
            <motion.li
              key={entry.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-6 border-l border-white/10"
            >
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-glow" aria-hidden="true" />
              <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <header className="flex flex-wrap items-center gap-3 mb-3">
                  <time
                    dateTime={entry.date}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50"
                  >
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    {entry.date}
                  </time>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20">
                    {isEn ? entry.tagEn : entry.tagZh}
                  </span>
                </header>
                <h2 className="text-xl font-display font-bold mb-2 text-white">
                  {isEn ? entry.titleEn : entry.titleZh}
                </h2>
                <p className="text-sm text-white/65 leading-relaxed">
                  {isEn ? entry.bodyEn : entry.bodyZh}
                </p>
              </article>
            </motion.li>
          ))
        )}
      </ol>
    </div>
  );
}
