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
    date: '2026-10-05',
    titleEn: 'Products regrouped into three Stai product lines',
    titleZh: '产品按三条 Stai 产品线重新组织',
    bodyEn:
      'The product catalogue is now organized as three Stai lines: Stai Retail (branded online store for independent sellers), Stai API (enterprise distribution API and B2B workbench) and Stai Counselor (workspace for travel advisors, in early access). Each line has its own page — /products/retail, /products/api, /products/counselor — listing what it includes and what is not live yet. Every existing product now sits under Stai API. The Products menu shows the three lines with their key entries, /products and the home page are grouped by line, product breadcrumbs include the line, and each product keeps one name everywhere: B2B Distribution Base, TraceSight Diagnostics, RevenuePilot Revenue Strategy, AI Automations, Private AI Deployment Evaluation. llms.txt, llms-full.txt and the presales knowledge export follow the same structure.',
    bodyZh:
      '产品目录改为三条 Stai 产品线：Stai Retail（独立卖家的品牌店铺）、Stai API（企业分销 API 与 B2B 工作台）、Stai Counselor（旅行顾问工作台，早期访问）。每条线有独立页面 /products/retail、/products/api、/products/counselor，写明包含哪些能力、哪些尚未上线。现有产品全部归入 Stai API。「产品」菜单按产品线展示重点入口，/products 与首页按产品线分组，产品页面包屑加入产品线，每个产品全站只用一个名字：B2B 分销底座、TraceSight 链路诊断、RevenuePilot 收益策略、AI 自动化、私有化 AI 部署评估。llms.txt、llms-full.txt 与售前知识导出同步调整。',
    tagEn: 'Products',
    tagZh: '产品'
  },
  {
    date: '2026-10-04',
    titleEn: 'Sandbox verification guide connects the solutions funnel',
    titleZh: '沙箱验证指南上线，串起解决方案到验证的链路',
    bodyEn:
      'New bilingual guide at /guides/sandbox-verification: how to verify HotelByte with your own hotel list — prepare the list, get a sandbox account, run the four checks (coverage, price level, confirmation, after-sales), and decide on a comparison table against current buying prices. The funnel now links end to end: both solution pages carry the guide in the partnership step and the footer nav, the public demo page links it under the CTA row, and the Resources nav group lists it. Sandbox accounts are provisioned per prospect via sales@hotelbyte.com; no shared credentials are published.',
    bodyZh:
      '新增双语指南 /guides/sandbox-verification：怎么用你自己的酒店清单验证 HotelByte——准备清单、开通沙箱账号、跑四项检查（覆盖、价格水平、确认、售后）、用与现行拿货价的对照表做决定。链路从此串起来：两个解决方案页在「怎么促成合作」的沙箱步骤和页脚导航挂上指南入口，公开 Demo 页在 CTA 下方链接指南，导航「资源」组收录。沙箱账号按客户逐个开通（sales@hotelbyte.com），不公开共享凭据。',
    tagEn: 'Guides',
    tagZh: '指南'
  },
  {
    date: '2026-10-03',
    titleEn: 'Price advantage section added to the solution pages',
    titleZh: '解决方案页新增「价格优势」专章',
    bodyEn:
      'Founder review flagged the missing core element: price. Each solution page now carries a dedicated "Where the price advantage comes from" section — five verifiable mechanisms (27+ upstreams bidding in one search, wholesale net rates, a spread kept visible by evidence-carrying quotes, Lookout parity watching, and software itself kept a visible cost: self-serve per-account subscription, no implementation fee) closed by an invitation to verify against current buying prices in the sandbox, line by line. Leads, hub cards, price-verification and software-pricing FAQ entries, and SEO titles, descriptions, and keywords now lead with price as well.',
    bodyZh:
      '创始人评审指出漏了核心要素：价格。每个解决方案页新增「价格优势从哪里来」专章——五个可验证的机制（27+ 上游同台竞价、批发净价直连、价差随报价证据可见、Lookout 盯价防倒挂，以及软件本身也是成本：按账号自助订阅、无实施费），并以「沙箱里与现有拿货价逐条对拍」收尾。导语、枢纽卡片、价格验证与软件收费 FAQ，以及 SEO 标题、描述与关键词同步以价格先行。',
    tagEn: 'Solutions',
    tagZh: '解决方案'
  },
  {
    date: '2026-10-03',
    titleEn: 'Solutions series by segment launched (DMC + travel agency one-pagers, series hub)',
    titleZh: '按客群解决方案系列上线(地接社 + 旅行社单页与系列枢纽)',
    bodyEn:
      'Launched the /solutions series: a hub listing one page per customer segment, plus two bilingual one-pagers — /solutions/dmc for destination management companies and /solutions/travel-agency for travel agencies. Each page opens with "What you are buying" (the concrete product: a B2B distribution workbench plus optional API, over 27+ aggregated suppliers), splits entry by profile (smaller DMC buying vs larger DMC buying and selling; self-use agency vs white-label resale), pairs pain points with the HotelByte answer, lists capabilities, spells out how the partnership gets done (demo → sandbox → commercial and compliance alignment → go live), which products each segment is likely to need (workbench core; white-label, API, MCP, Lookout as add-ons), and the requirements to line up (contracting entity, wallet settlement, invoicing and tax, supply availability). Chinese solution pages additionally carry a Xiaohongshu contact block above the footer nav (QR code, account 2b 酒店供销社 hotelbyte, ID 9568468696). Pages ship WebPage, FAQPage, BreadcrumbList, and ItemList structured data. The old /solutions/travel-sellers URL now 301-redirects to /solutions/travel-agency (Vercel + client-side), the Solutions nav group lists the hub and segments, homepage hero and paths link the new pages, and sitemap, llms.txt, and llms-full.txt were updated.',
    bodyZh:
      '上线 /solutions 系列:一个按客群组织的枢纽页,加两个双语单页——面向地接社的 /solutions/dmc 与面向旅行社的 /solutions/travel-agency。每页开门见山「你在买什么」(具体产品:B2B 分销工作台+可选 API,背后是 27+ 聚合上游),按规模分两种姿势进入(小地接社重点买 / 大地接社既买也卖;旅行社自用 / 白标转售),痛点与 HotelByte 回应配对,能力清单,并写清怎么促成合作(看演示→沙箱→商务与合规对齐→开通上线)、什么产品可能是你需要的(工作台为核心;白标、API、MCP、Lookout 按需加配)与合作要满足的要求(签约主体、钱包结算、发票税务、供应可用性)。中文解决方案页底部另附小红书联系区(二维码、账号 2b 酒店供销社 hotelbyte、小红书号 9568468696)。页面带 WebPage、FAQPage、BreadcrumbList、ItemList 结构化数据。旧地址 /solutions/travel-sellers 301 跳转到 /solutions/travel-agency(Vercel + 客户端双通道),解决方案导航组列出枢纽与客群,首页 hero 与路径卡链接新页面,sitemap、llms.txt、llms-full.txt 同步更新。',
    tagEn: 'Solutions',
    tagZh: '解决方案'
  },
  {
    date: '2026-06-26',
    titleEn: 'Unified Consulting umbrella launched (MarginLift + Technology Consulting merged)',
    titleZh: '统一咨询服务页上线(MarginLift 与技术咨询合并)',
    bodyEn:
      'Launched /services/consulting — one consulting engagement with two tracks: AI Advisory (formerly MarginLift, the labor/cost/profit AI advisory) and Technology Consulting (Enterprise Architecture, Performance Improvements, Cloud Consulting). Both share an evidence-first, three-phase methodology (diagnose/audit → design/SOW → operate/guide) and a bilingual detail modal. The page ships with Service, BreadcrumbList, FAQPage, and HowTo structured data, a "Services" nav entry, footer link, sitemap + llms.txt + llms-full.txt references, and Vercel 301 redirects from the old /products/margin-lift, /products/profit-recovery, and /services/technology-consulting URLs. MarginLift graduated out of the product suite (now six product lines) into consulting.',
    bodyZh:
      '上线 /services/consulting——一次咨询、两个方向:AI 顾问(原 MarginLift,聚焦人力/成本/利润的 AI 顾问)与技术咨询服务(企业架构、性能优化、云咨询)。两个方向共享证据优先、三阶段方法论(诊断/审计 → 设计/SOW → 运营/指导)与双语详情弹窗。页面带 Service、BreadcrumbList、FAQPage、HowTo 结构化数据,新增“服务”导航项、页脚链接、sitemap / llms.txt / llms-full.txt 引用,并对旧地址 /products/margin-lift、/products/profit-recovery、/services/technology-consulting 配置 Vercel 301 跳转。MarginLift 从产品矩阵(现为六条产品线)迁出,归入咨询服务。',
    tagEn: 'Services',
    tagZh: '服务'
  },
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
  const isEn = locale !== 'zh'; // tier-2 locales render the English body
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-line text-xs font-medium text-ink/70 mb-6">
          {isEn ? 'Changelog' : '更新日志'}
        </div>
        <h1 className="text-4xl lg:text-6xl font-display mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-ink/60 font-light max-w-2xl mx-auto">{subtitle}</p>
      </motion.header>

      {/* Lead */}
      <p className="text-ink/70 text-center max-w-2xl mx-auto mb-12 leading-relaxed">{lead}</p>

      {/* Timeline */}
      <ol className="space-y-6">
        {ENTRIES.length === 0 ? (
          <li className="text-center text-ink/50">
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
              className="relative pl-6 border-l border-line"
            >
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-sm bg-brass" aria-hidden="true" />
              <article className="rounded-sm border border-line bg-paper-raised p-6">
                <header className="flex flex-wrap items-center gap-3 mb-3">
                  <time
                    dateTime={entry.date}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-ink/50"
                  >
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    {entry.date}
                  </time>
                  <span className="px-2 py-0.5 text-xs rounded-sm bg-brass/10 text-brass border border-brass/20">
                    {isEn ? entry.tagEn : entry.tagZh}
                  </span>
                </header>
                <h2 className="text-xl font-display mb-2 text-ink">
                  {isEn ? entry.titleEn : entry.titleZh}
                </h2>
                <p className="text-sm text-ink/65 leading-relaxed">
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
