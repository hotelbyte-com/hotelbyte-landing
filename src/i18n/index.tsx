/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { detectBrowserLocale, localeStorageKey, type Locale } from './locale';

export { detectBrowserLocale, type Locale } from './locale';

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'zh',
  setLocale: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh';
  }
  const saved = window.localStorage.getItem(localeStorageKey);
  if (saved === 'zh' || saved === 'en') {
    return saved;
  }
  return detectBrowserLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
}

export function useI18n() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(localeStorageKey, l);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }, [locale]);

  const t = useCallback(
    (key: string, fallback?: string) => {
      const dict = dictionaries[locale];
      return dict[key] ?? fallback ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// --- Dictionaries ---

const zh: Record<string, string> = {
  // Nav
  'nav.products': '产品',
  'nav.services': '服务',
  'nav.compare': '竞品对比',
  'nav.dailyStories': 'Daily',
  'nav.docs': '开发文档',
  'nav.blog': '技术博客',
  'nav.login': '登录',
  'nav.contact': '联系我们',
  'nav.about': '关于',
  'nav.changelog': '更新日志',

  // Home Hero
  'hero.badge': 'DeepSeek V4 Pro 深度集成现已上线',
  'hero.title1': 'AI-Native',
  'hero.title2': '工程化操作系统',
  'hero.title3': '专为酒店分销打造。',
  'hero.subtitle': '深耕酒店分销领域，以 AI-Native 技术底座为酒店分销企业赋能智能化升级。从价格情报、故障诊断到数据分析与智能分销，让每一个业务环节都获得 AI 的实时赋能，实现可量化的效率提升与成本优化。',
  'hero.cta.pricing': '探索订阅方案',
  'hero.cta.docs': '查看开发文档',

  // Home Products
  'products.title': '产品矩阵',
  'product.lookout.name': 'Lookout 价格情报',
  'product.lookout.desc': '高并发价格爬虫引擎。提供实时的竞争基准测试与异常波动监控，助力收益最大化。',
  'product.lookout.link': '探索比价引擎',
  'product.dist.name': '企业级分销底座',
  'product.dist.desc': '三层实体架构支撑。已标准集成 27+ 顶级酒店供应商，支持复杂的多层级代理生态与细粒度信用管理。',
  'product.dist.link': '查看集成方案',
  'product.tracesight.name': 'TraceSight 追光',
  'product.tracesight.desc': '全链路智能诊断平台。将会话级追踪、AI 根因分析与自主运维融为一体，让故障排查从小时级降至分钟级。',
  'product.tracesight.link': '了解 TraceSight',
  'product.revenuepilot.name': 'RevenuePilot 益策',
  'product.revenuepilot.desc': 'AI 收益策略引擎。把加价、供应商、市场和客群策略做成可生成、可模拟、可受控保存的赚钱系统，并向收益智能体编排演进。',
  'product.revenuepilot.link': '了解 RevenuePilot',
  'product.consulting.name': '咨询服务',
  'product.consulting.desc': 'AI 顾问找赚钱机会,技术咨询把架构、性能与云做对。两个方向,一套方法论。',
  'product.consulting.link': '了解咨询服务',
  'product.ds4.name': 'DeepSeek V4-Flash 一体机',
  'product.ds4.desc': '内置知识库、数据智能体与自进化引擎的企业 AI 平台。预置垂直场景模板，30 分钟部署，让 AI 真正落地您的业务。',
  'product.ds4.link': '了解一体机方案',

  // Home Why Us
  'why.title': '为什么选择 HotelByte？',
  'why.subtitle': '与 SiteMinder、Cloudbeds、D-EDGE 等主流方案的全面对比。看看为什么越来越多的酒店分销企业正在切换至 HotelByte。',
  'why.point1': 'AI-Native 架构，而非外挂式 Chatbot',
  'why.point2': '性能化定价，而非固定月费',
  'why.point3': 'B2B 代理生态原生支持',
  'why.point4': '27+ 全球供应商预集成',
  'why.cta': '查看完整对比',
  'why.stat.ai': 'AI 原生',
  'why.stat.pricing': '按用量付费',
  'why.stat.b2b': '四级实体架构',
  'why.stat.suppliers': '27+ 供应商',

  // Subscriptions
  'subs.title': '选择您的增长引擎',
  'subs.subtitle': '为不同规模的旅游企业提供可扩展的技术底座。',
  'subs.starter.name': 'Portal Starter',
  'subs.starter.desc': '适合小团队自助完成搜索和预订。',
  'subs.starter.price': 'Custom',
  'subs.starter.f1': '基础门户访问',
  'subs.starter.f2': '标准酒店库存',
  'subs.starter.f3': '基础报表',
  'subs.starter.f4': '社区支持',
  'subs.starter.cta': '联系我们',
  'subs.growth.name': 'API Growth',
  'subs.growth.desc': '增加 API 调用规模与 Lookout 价格洞察。',
  'subs.growth.price': 'Volume',
  'subs.growth.f1': '包含 Starter 所有功能',
  'subs.growth.f2': '高并发 API 接入',
  'subs.growth.f3': 'Lookout 基础版',
  'subs.growth.f4': '高级数据导出',
  'subs.growth.cta': '获取报价',
  'subs.enterprise.name': 'All-in-One Ops',
  'subs.enterprise.desc': '包含 AI Agent 全家桶、白标和高级管控。',
  'subs.enterprise.price': 'Enterprise',
  'subs.enterprise.f1': 'Data Agent 数据智能体',
  'subs.enterprise.f2': 'TraceSight 全功能',
  'subs.enterprise.f3': '定制化 API 专属网关',
  'subs.enterprise.f4': '白标定制 (White Label)',
  'subs.enterprise.f5': '高级 RBAC 权限',
  'subs.enterprise.cta': '申请演示',
  'subs.recommended': 'RECOMMENDED',

  // Common
  'common.learnMore': '了解更多',
  'common.viewDocs': '查看文档',
  'common.contactSales': '联系销售',
  'common.getQuote': '获取报价',
  'common.bookDemo': '申请演示',
  'common.compare': '查看竞品对比',
  'common.viewDetails': '查看详情',

  // AEO — Home Definition Cards (below AI-Native banner)
  'home.def.title': 'AI-Native 核心定义',
  'home.def.lead': '三句话讲清楚 HotelByte 的核心立场，方便你在内部介绍与对客户解释时使用。',
  'home.def.aiNative.term': '什么是 AI-Native?',
  'home.def.aiNative.def': 'AI-Native 指 LLM 编排、多源异构联邦查询、自进化智能体从架构设计之初即被原生集成,而不是把聊天框事后外挂到老系统上。',
  'home.def.dist.term': '什么是 B2B 优先的分销底座?',
  'home.def.dist.def': 'Platform → Tenant → Customer → Account 四级实体架构,内置多币种信用管理与细粒度 RBAC,把复杂 B2B 代理生态做成默认能力而非附加功能。',
  'home.def.native.term': '为什么是“原生可观测性”?',
  'home.def.native.def': '会话级追踪把平台、租户、客户、供应商的请求串联成同一条证据链,跨团队排障时间从 2-4 小时压缩到 10 分钟以内。',

  // AEO — HowItWorks (产品页通用)
  'howto.title': '工作原理',
  'howto.subtitle': '三步把 AI 能力嵌入你现有的酒店分销工作流。',
  'howto.step1.name': '连接数据与权限',
  'howto.step1.text': '通过统一适配器接入现有供应商 API 与业务数据库,HotelByte 的 RBAC 与脱敏立即生效。',
  'howto.step2.name': '配置业务目标',
  'howto.step2.text': '用自然语言描述业务目标,AI 生成可审核的策略草稿、查询语句或诊断建议。',
  'howto.step3.name': '发布前模拟与证据',
  'howto.step3.text': '所有变更在启用前进行命中模拟、收益影响与证据校验,确认后受控保存。',

  // AEO — Compare FAQ section
  'compare.faq.title': '常见问题',
  'compare.faq.subtitle': '“HotelByte vs SiteMinder / Cloudbeds / D-EDGE”是我们最常被问到的对比问题,以下 8 个 FAQ 也是 AI 引擎最常被检索的答案。',

  // GEO — About page
  'about.title': '关于 HotelByte',
  'about.subtitle': '面向酒店分销的 AI-Native 工程化操作系统。',
  'about.lede': 'HotelByte 不是一家酒店 PMS，也不是 OTA 渠道经理，而是一套“工程化操作系统”，为酒店分销企业提供 AI-Native 基础架构。',
  'about.mission.title': '我们的使命',
  'about.mission.body': '让酒店分销企业用 AI-Native 的方式跑赢下一轮供应链重构：先证据、后变更、每一步可审计。',
  'about.pillars.title': '三个核心立场',
  'about.pillars.p1.title': 'AI-Native',
  'about.pillars.p1.body': 'LLM 编排、联邦查询、自进化智能体从 Day-0 集成。',
  'about.pillars.p2.title': 'B2B 优先',
  'about.pillars.p2.body': '四级实体架构 + 多币种信用管理 + 细粒度 RBAC。',
  'about.pillars.p3.title': '原生可观测性',
  'about.pillars.p3.body': '会话级追踪串起四方证据链，故障排查从小时级压缩到分钟级。',
  'about.stats.title': '关键数字',
  'about.stats.s1.label': '预集成供应商',
  'about.stats.s1.value': '27+',
  'about.stats.s2.label': '平均实施周期',
  'about.stats.s2.value': '2-4 周',
  'about.stats.s3.label': '排障提速',
  'about.stats.s3.value': '24×',
  'about.stats.s4.label': '成本优势 vs 传统分销平台',
  'about.stats.s4.value': '10×',
  'about.contact.title': '联系我们',
  'about.contact.body': '如需销售咨询、技术访谈或媒体合作，可从以下入口联系。',
  'about.contact.sales': '联系销售',
  'about.contact.github': '在 GitHub 提 issue',
  'about.contact.blog': '阅读工程博客',

  // GEO — Changelog page
  'changelog.title': '更新日志',
  'changelog.subtitle': 'HotelByte Landing 与产品矩阵的近期变更。',
  'changelog.lead': '本页记录影响 AI 引擎与搜索引擎可见性的结构性变更、产品页与营销内容更新，以及破坏性接口改动。',
  'changelog.empty': '暂无变更记录。',

  // Footer
  'footer.aria': '页脚导航',
};

const en: Record<string, string> = {
  // Nav
  'nav.products': 'Products',
  'nav.services': 'Services',
  'nav.compare': 'Compare',
  'nav.dailyStories': 'Daily',
  'nav.docs': 'Docs',
  'nav.blog': 'Blog',
  'nav.login': 'Login',
  'nav.contact': 'Contact',
  'nav.about': 'About',
  'nav.changelog': 'Changelog',

  // Home Hero
  'hero.badge': 'DeepSeek V4 Pro Integration Now Live',
  'hero.title1': 'AI-Native',
  'hero.title2': 'Engineering OS',
  'hero.title3': 'for Hotel Distribution.',
  'hero.subtitle': 'Deep expertise in hotel distribution, delivering AI-powered solutions that drive measurable efficiency gains and cost optimization. From price intelligence and fault diagnosis to data analytics and smart distribution — every business process is empowered by AI in real time.',
  'hero.cta.pricing': 'Explore Plans',
  'hero.cta.docs': 'View Docs',

  // Home Products
  'products.title': 'Product Suite',
  'product.lookout.name': 'Lookout Price Intelligence',
  'product.lookout.desc': 'High-concurrency price crawler. Real-time competitive benchmarking and anomaly monitoring to maximize revenue.',
  'product.lookout.link': 'Explore Price Engine',
  'product.dist.name': 'Enterprise Distribution Base',
  'product.dist.desc': '3-tier entity architecture. 27+ top hotel suppliers pre-integrated. Complex multi-level agency ecosystem with granular credit management.',
  'product.dist.link': 'View Integration',
  'product.tracesight.name': 'TraceSight',
  'product.tracesight.desc': 'Full-linkage intelligent diagnostics. Session-level tracing, AI root-cause analysis, and autonomous ops — cutting troubleshooting from hours to minutes.',
  'product.tracesight.link': 'Explore TraceSight',
  'product.revenuepilot.name': 'RevenuePilot',
  'product.revenuepilot.desc': 'AI revenue strategy engine. Turn markup, supplier, market, and segment strategies into an AI-generated, simulated, governed-save profit system, evolving toward revenue agent orchestration.',
  'product.revenuepilot.link': 'Explore RevenuePilot',
  'product.consulting.name': 'Consulting',
  'product.consulting.desc': 'AI Advisory finds the money; Technology Consulting gets the architecture, performance, and cloud right. Two tracks, one methodology.',
  'product.consulting.link': 'Explore consulting',
  'product.ds4.name': 'DeepSeek V4-Flash Appliance',
  'product.ds4.desc': 'Enterprise AI platform with built-in knowledge base, Data Agent, and self-evolving engine. Pre-built vertical templates. Deploy in 30 minutes and start delivering value.',
  'product.ds4.link': 'Explore Appliance',

  // Home Why Us
  'why.title': 'Why HotelByte?',
  'why.subtitle': 'Full comparison with SiteMinder, Cloudbeds, D-EDGE and more. See why leading hotel distribution companies are switching.',
  'why.point1': 'AI-Native architecture, not bolt-on Chatbot',
  'why.point2': 'Usage-based pricing, not fixed monthly fees',
  'why.point3': 'B2B agency ecosystem natively supported',
  'why.point4': '27+ global suppliers pre-integrated',
  'why.cta': 'Full Comparison',
  'why.stat.ai': 'AI-Native',
  'why.stat.pricing': 'Pay-as-you-go',
  'why.stat.b2b': '4-Tier Architecture',
  'why.stat.suppliers': '27+ Suppliers',

  // Subscriptions
  'subs.title': 'Choose Your Growth Engine',
  'subs.subtitle': 'Scalable technology foundation for travel businesses of all sizes.',
  'subs.starter.name': 'Portal Starter',
  'subs.starter.desc': 'For small teams to self-serve search and booking.',
  'subs.starter.price': 'Custom',
  'subs.starter.f1': 'Basic portal access',
  'subs.starter.f2': 'Standard hotel inventory',
  'subs.starter.f3': 'Basic reports',
  'subs.starter.f4': 'Community support',
  'subs.starter.cta': 'Contact Us',
  'subs.growth.name': 'API Growth',
  'subs.growth.desc': 'Scale API calls with Lookout price insights.',
  'subs.growth.price': 'Volume',
  'subs.growth.f1': 'Everything in Starter',
  'subs.growth.f2': 'High-concurrency API access',
  'subs.growth.f3': 'Lookout Basic',
  'subs.growth.f4': 'Advanced data export',
  'subs.growth.cta': 'Get Quote',
  'subs.enterprise.name': 'All-in-One Ops',
  'subs.enterprise.desc': 'Full AI Agent suite, white-label, and advanced controls.',
  'subs.enterprise.price': 'Enterprise',
  'subs.enterprise.f1': 'Data Agent intelligence',
  'subs.enterprise.f2': 'TraceSight Full Suite',
  'subs.enterprise.f3': 'Custom API gateway',
  'subs.enterprise.f4': 'White-label customization',
  'subs.enterprise.f5': 'Advanced RBAC',
  'subs.enterprise.cta': 'Book Demo',
  'subs.recommended': 'RECOMMENDED',

  // Common
  'common.learnMore': 'Learn More',
  'common.viewDocs': 'View Docs',
  'common.contactSales': 'Contact Sales',
  'common.getQuote': 'Get Quote',
  'common.bookDemo': 'Book Demo',
  'common.compare': 'Compare',
  'common.viewDetails': 'View Details',

  // AEO — Home Definition Cards (below AI-Native banner)
  'home.def.title': 'AI-Native, in plain language',
  'home.def.lead': 'Three short definitions you can quote internally and in customer conversations.',
  'home.def.aiNative.term': 'What is AI-Native?',
  'home.def.aiNative.def': 'AI-Native means LLM orchestration, multi-source federated queries, and self-evolving agents are built in from day one, instead of bolting a chatbot onto a legacy stack.',
  'home.def.dist.term': 'What is a B2B-first distribution base?',
  'home.def.dist.def': 'The Platform → Tenant → Customer → Account hierarchy ships with multi-currency credit management and granular RBAC, so B2B agency ecosystems are a default capability rather than an add-on.',
  'home.def.native.term': 'Why native observability?',
  'home.def.native.def': 'Session-level tracing folds platform, tenant, customer, and supplier requests into one evidence chain, compressing cross-team troubleshooting from 2-4 hours to under 10 minutes.',

  // AEO — HowItWorks (shared across product pages)
  'howto.title': 'How it works',
  'howto.subtitle': 'Three steps from your current distribution stack to AI-native operations.',
  'howto.step1.name': 'Connect data and permissions',
  'howto.step1.text': 'Plug the unified adapter into your existing supplier APIs and business databases. HotelByte RBAC and masking apply immediately.',
  'howto.step2.name': 'Describe the business goal',
  'howto.step2.text': 'Use natural language to describe the goal. AI generates reviewable strategy drafts, queries, or diagnostic recommendations.',
  'howto.step3.name': 'Simulate and validate before publish',
  'howto.step3.text': 'Every change runs through hit simulation, revenue impact, and evidence validation before enabled save, with audit context preserved.',

  // AEO — Compare FAQ section
  'compare.faq.title': 'Frequently asked questions',
  'compare.faq.subtitle': '“HotelByte vs SiteMinder / Cloudbeds / D-EDGE” is the comparison we get asked most. The eight FAQs below are the answers AI engines surface most often.',

  // GEO — About page
  'about.title': 'About HotelByte',
  'about.subtitle': 'The AI-Native engineering operating system for hotel distribution.',
  'about.lede': 'HotelByte is not a property management system and not an OTA channel manager. It is the engineering OS that lets hotel distribution businesses run an AI-Native stack end to end.',
  'about.mission.title': 'Our mission',
  'about.mission.body': 'Help hotel distribution businesses win the next supply-chain reset by running AI-Native: evidence first, then change, with every step auditable.',
  'about.pillars.title': 'Three core stances',
  'about.pillars.p1.title': 'AI-Native',
  'about.pillars.p1.body': 'LLM orchestration, federated queries, and self-evolving agents integrated from day zero.',
  'about.pillars.p2.title': 'B2B-first',
  'about.pillars.p2.body': '4-tier entity model with multi-currency credit management and granular RBAC.',
  'about.pillars.p3.title': 'Native observability',
  'about.pillars.p3.body': 'Session-level tracing folds the four-party ecosystem into one evidence chain, cutting troubleshooting from hours to minutes.',
  'about.stats.title': 'Key statistics',
  'about.stats.s1.label': 'Pre-integrated suppliers',
  'about.stats.s1.value': '27+',
  'about.stats.s2.label': 'Average implementation cycle',
  'about.stats.s2.value': '2-4 weeks',
  'about.stats.s3.label': 'Troubleshooting speedup',
  'about.stats.s3.value': '24×',
  'about.stats.s4.label': 'Cost advantage vs legacy platforms',
  'about.stats.s4.value': '10×',
  'about.contact.title': 'Contact',
  'about.contact.body': 'Reach out for sales briefings, technical interviews, or press inquiries.',
  'about.contact.sales': 'Contact sales',
  'about.contact.github': 'Open a GitHub issue',
  'about.contact.blog': 'Read the engineering blog',

  // GEO — Changelog page
  'changelog.title': 'Changelog',
  'changelog.subtitle': 'Recent updates to the HotelByte landing site and product suite.',
  'changelog.lead': 'This page records structural changes that affect AI-engine and search-engine visibility, product page and marketing content updates, and breaking interface changes.',
  'changelog.empty': 'No changelog entries yet.',

  // Footer
  'footer.aria': 'Footer navigation',
};

const dictionaries: Record<Locale, Record<string, string>> = { zh, en };
