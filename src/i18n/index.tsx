/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useCallback, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { htmlLanguages, isPublishedLocale, localeStorageKey, pathLocale, queryLocale, type Locale } from './locale';

export { detectBrowserLocale, type Locale } from './locale';

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

function localeForPath(pathname: string): Locale {
  const requested = pathLocale(pathname);
  return requested && isPublishedLocale(pathname, requested) ? requested as Locale : 'en';
}

export function useI18n() {
  return useContext(I18nContext);
}

export function I18nProvider({ children, defaultLocale }: { children: ReactNode; defaultLocale?: Locale }) {
  const location = useLocation();
  // Explicit ?language= (portal checkout handoff, issue #22) wins over the
  // path prefix when published for the route; prerender passes no search.
  const locale = defaultLocale ?? queryLocale(location.search, location.pathname) ?? localeForPath(location.pathname);

  const setLocale = useCallback((l: Locale) => {
    if (typeof window !== 'undefined') {
      try { window.localStorage.setItem(localeStorageKey, l); } catch { /* private mode */ }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLanguages[locale];
    const requested = pathLocale(location.pathname);
    document.documentElement.dir = requested === 'ar' || requested === 'he' ? 'rtl' : 'ltr';
  }, [locale, location.pathname]);

  const t = useCallback(
    (key: string, fallback?: string) => {
      // Tier-2 locales keep partial dictionaries (chrome only); every other
      // key falls back to the English source so bodies never degrade to
      // Chinese under non-zh URLs.
      const dict = dictionaries[locale] ?? {};
      return dict[key] ?? en[key] ?? fallback ?? key;
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

import { ar } from './dict-ar';

const zh: Record<string, string> = {
  // Nav
  'nav.products': '产品',
  'nav.services': '服务',
  'nav.compare': '选型指南',
  'nav.dailyStories': 'Daily',
  'nav.docs': '开发文档',
  'nav.blog': '技术博客',
  'nav.login': '登录',
  'nav.contact': '联系我们',
  'nav.about': '关于',
  'nav.changelog': '更新日志',
  'nav.demo': '在线 Demo',

  // Home Hero
  'hero.badge': '酒店分销技术与 AI 应用',
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
  'product.dist.desc': '通过统一 API 对接酒店供应商适配器，并支持平台、租户、客户及账号层级的权限管理。供应商可用性取决于凭证与配置。',
  'product.dist.link': '查看集成方案',
  'product.tracesight.name': 'TraceSight 追光',
  'product.tracesight.desc': '会话级追踪和诊断证据帮助团队还原酒店分销工作流中的请求与问题。',
  'product.tracesight.link': '了解 TraceSight',
  'product.revenuepilot.name': 'RevenuePilot 益策',
  'product.revenuepilot.desc': 'AI 收益策略引擎。把加价、供应商、市场和客群策略做成可生成、可模拟、可受控保存的赚钱系统，并向收益智能体编排演进。',
  'product.revenuepilot.link': '了解 RevenuePilot',
  'product.consulting.name': '咨询服务',
  'product.consulting.desc': 'AI 顾问找赚钱机会,技术咨询把架构、性能与云做对。两个方向,一套方法论。',
  'product.consulting.link': '了解咨询服务',
  'product.ds4.name': '私有化 AI 部署评估',
  'product.ds4.desc': '结合数据治理、模型、硬件和集成要求，评估酒店分销场景中的私有化 AI 部署方案。',
  'product.ds4.link': '了解评估方式',

  // Home Why Us
  'why.title': '为什么选择 HotelByte？',
  'why.subtitle': '从供应覆盖、接入与稳定性、白标与实体架构、故障诊断到价格情报，逐项拆开看我们给出的答案，以及你可以怎么当场验证。',
  'why.point1': 'AI-Native 架构，而非外挂式 Chatbot',
  'why.point2': '性能化定价，而非固定月费',
  'why.point3': 'B2B 代理生态原生支持',
  'why.point4': '统一 API 对接供应商适配器',
  'why.cta': '查看完整对比',
  'why.stat.ai': 'AI 原生',
  'why.stat.pricing': '按用量付费',
  'why.stat.b2b': '层级实体权限',
  'why.stat.suppliers': '供应商适配器',

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
  'common.viewDetails': '查看详情',

  // AEO — Home Definition Cards (below AI-Native banner)
  'home.def.title': 'AI-Native 核心定义',
  'home.def.lead': '三句话讲清楚 HotelByte 的核心立场，方便你在内部介绍与对客户解释时使用。',
  'home.def.aiNative.term': '什么是 AI-Native?',
  'home.def.aiNative.def': 'HotelByte 将酒店分销工作流与特定的 AI 辅助查询和诊断能力结合；每项能力都应在相应产品演示中验证。',
  'home.def.dist.term': '什么是 B2B 优先的分销底座?',
  'home.def.dist.def': '平台、租户、客户和客户账号形成层级实体关系，并通过范围化权限支持 B2B 代理业务。',
  'home.def.native.term': '为什么是“原生可观测性”?',
  'home.def.native.def': '会话级追踪把平台、租户、客户和供应商请求关联起来，便于团队查看故障证据与处置过程。',

  // AEO — HowItWorks (产品页通用)
  'howto.title': '工作原理',
  'howto.subtitle': '三步把 AI 能力嵌入你现有的酒店分销工作流。',
  'howto.step1.name': '连接数据与权限',
  'howto.step1.text': '通过统一适配器接入现有供应商 API 与业务数据库,HotelByte 的 RBAC 与脱敏立即生效。',
  'howto.step2.name': '配置业务目标',
  'howto.step2.text': '用自然语言描述业务目标,AI 生成可审核的策略草稿、查询语句或诊断建议。',
  'howto.step3.name': '发布前模拟与证据',
  'howto.step3.text': '所有变更在启用前进行命中模拟、收益影响与证据校验,确认后受控保存。',

  // GEO — About page
  'about.title': '关于 HotelByte',
  'about.subtitle': '面向酒店分销的 AI-Native 工程化操作系统。',
  'about.lede': 'HotelByte 不是一家酒店 PMS，也不是 OTA 渠道经理，而是一套“工程化操作系统”，为酒店分销企业提供 AI-Native 基础架构。',
  'about.mission.title': '我们的使命',
  'about.mission.body': '让酒店分销企业用 AI-Native 的方式跑赢下一轮供应链重构：先证据、后变更、每一步可审计。',
  'about.pillars.title': '三个核心立场',
  'about.pillars.p1.title': 'AI-Native',
  'about.pillars.p1.body': '受治理的数据调查与 AI 工作流可结合真实业务数据和访问规则验证。',
  'about.pillars.p2.title': 'B2B 优先',
  'about.pillars.p2.body': '平台、租户、客户和客户账号的层级实体及权限范围。',
  'about.pillars.p3.title': '原生可观测性',
  'about.pillars.p3.body': '会话级追踪关联请求、响应与故障证据，帮助团队还原问题现场。',
  'about.stats.title': '关键数字',
  'about.stats.s1.label': '预集成供应商',
  'about.stats.s1.value': '按环境验证',
  'about.stats.s2.label': '平均实施周期',
  'about.stats.s2.value': '按项目评估',
  'about.stats.s3.label': '排障提速',
  'about.stats.s3.value': '可追踪',
  'about.stats.s4.label': '成本优势 vs 传统分销平台',
  'about.stats.s4.value': '按方案评估',
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

  // Demo page (Stai live demo)
  'demo.badge': '在线演示 · 无需注册',
  'demo.title': 'Stai — HotelByte B2B 酒店分销工作台在线 Demo',
  'demo.subtitle': '面向旅行社与差旅公司的 B2B 酒店分销工作台。',
  'demo.byHotelByte': 'by HotelByte',
  'demo.cta.primary': '进入 Demo',
  'demo.cta.secondary': '工作原理',
  'demo.modules.title': '八个模块,一套工作台',
  'demo.modules.subtitle': '搜索、订单、会话、产品、供应商、客户、规则与 Lookout 价格情报,全部在同一套工作台内。',
  'demo.modules.search': '酒店搜索',
  'demo.modules.bookings': '订单管理',
  'demo.modules.sessions': '会话追踪',
  'demo.modules.products': '产品与库存',
  'demo.modules.suppliers': '供应商聚合',
  'demo.modules.customers': '客户档案',
  'demo.modules.rules': '业务规则',
  'demo.modules.lookout': 'Lookout 价格情报',
  'demo.foundation.title': '由 HotelByte 提供技术底座',
  'demo.foundation.body': 'Stai 与 HotelByte 企业级分销底座共用同一套 AI-Native 工程化操作系统:联邦查询、原生可观测性、B2B 优先的架构作为默认能力。',
  'demo.foundation.cta': '查看企业级分销底座',
  'demo.pillars.multiCurrency.title': '多币种 · 多国家 · 多客户类型',
  'demo.pillars.multiCurrency.body': '内置多币种信用管理、户籍/居所分离与细粒度 RBAC,复杂 B2B 代理生态作为默认能力。',
  'demo.pillars.suppliers.title': '酒店供应商适配器',
  'demo.pillars.suppliers.body': '通过统一 API 对接供应商适配器；实际可用性取决于凭证、配置与目标市场验证。',
  'demo.pillars.observability.title': '会话级全链路证据链',
  'demo.pillars.observability.body': '搜索、报价和订单标识关联请求链路，帮助团队在问题发生时查看证据。',
  'demo.disclaimer': 'Stai 演示站为公开样例,所展示的账号、供应商与订单均为虚构演示数据,并会定期重置。',
};

const en: Record<string, string> = {
  // Nav
  'nav.products': 'Products',
  'nav.services': 'Services',
  'nav.compare': 'Evaluation',
  'nav.dailyStories': 'Daily',
  'nav.docs': 'Docs',
  'nav.blog': 'Blog',
  'nav.login': 'Login',
  'nav.contact': 'Contact',
  'nav.about': 'About',
  'nav.changelog': 'Changelog',
  'nav.demo': 'Online Demo',

  // Home Hero
  'hero.badge': 'Hotel distribution technology and AI',
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
  'product.dist.desc': 'A unified API connects hotel supplier adapters, with scoped permissions across platform, tenant, customer, and account entities. Availability depends on credentials and configuration.',
  'product.dist.link': 'View Integration',
  'product.tracesight.name': 'TraceSight',
  'product.tracesight.desc': 'Session-level tracing and diagnostic evidence help teams reconstruct requests and issues in hotel distribution workflows.',
  'product.tracesight.link': 'Explore TraceSight',
  'product.revenuepilot.name': 'RevenuePilot',
  'product.revenuepilot.desc': 'AI revenue strategy engine. Turn markup, supplier, market, and segment strategies into an AI-generated, simulated, governed-save profit system, evolving toward revenue agent orchestration.',
  'product.revenuepilot.link': 'Explore RevenuePilot',
  'product.consulting.name': 'Consulting',
  'product.consulting.desc': 'AI Advisory finds the money; Technology Consulting gets the architecture, performance, and cloud right. Two tracks, one methodology.',
  'product.consulting.link': 'Explore consulting',
  'product.ds4.name': 'Private AI Deployment Evaluation',
  'product.ds4.desc': 'Evaluate on-prem AI deployment for hotel distribution against data governance, model, hardware, and integration requirements.',
  'product.ds4.link': 'Explore Evaluation',

  // Home Why Us
  'why.title': 'Why HotelByte?',
  'why.subtitle': 'Supply coverage, integration and stability, white-label and entity architecture, diagnostics, price intelligence — see our answer for each, and how you can verify it yourself.',
  'why.point1': 'AI-Native architecture, not bolt-on Chatbot',
  'why.point2': 'Usage-based pricing, not fixed monthly fees',
  'why.point3': 'B2B agency ecosystem natively supported',
  'why.point4': 'Supplier adapters through a unified API',
  'why.cta': 'Full Comparison',
  'why.stat.ai': 'AI-Native',
  'why.stat.pricing': 'Pay-as-you-go',
  'why.stat.b2b': 'Scoped Entity Access',
  'why.stat.suppliers': 'Supplier adapters',

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
  'common.viewDetails': 'View Details',

  // AEO — Home Definition Cards (below AI-Native banner)
  'home.def.title': 'AI-Native, in plain language',
  'home.def.lead': 'Three short definitions you can quote internally and in customer conversations.',
  'home.def.aiNative.term': 'What is AI-Native?',
  'home.def.aiNative.def': 'HotelByte combines hotel distribution workflows with selected AI-assisted querying and diagnostics; evaluate each capability in the relevant product demo.',
  'home.def.dist.term': 'What is a B2B-first distribution base?',
  'home.def.dist.def': 'Platform, tenant, customer, and customer-account entities form a hierarchy with scoped permissions for B2B agency operations.',
  'home.def.native.term': 'Why native observability?',
  'home.def.native.def': 'Session-level tracing connects platform, tenant, customer, and supplier requests so teams can inspect incident evidence and the response path.',

  // AEO — HowItWorks (shared across product pages)
  'howto.title': 'How it works',
  'howto.subtitle': 'Three steps from your current distribution stack to AI-native operations.',
  'howto.step1.name': 'Connect data and permissions',
  'howto.step1.text': 'Plug the unified adapter into your existing supplier APIs and business databases. HotelByte RBAC and masking apply immediately.',
  'howto.step2.name': 'Describe the business goal',
  'howto.step2.text': 'Use natural language to describe the goal. AI generates reviewable strategy drafts, queries, or diagnostic recommendations.',
  'howto.step3.name': 'Simulate and validate before publish',
  'howto.step3.text': 'Every change runs through hit simulation, revenue impact, and evidence validation before enabled save, with audit context preserved.',

  // GEO — About page
  'about.title': 'About HotelByte',
  'about.subtitle': 'The AI-Native engineering operating system for hotel distribution.',
  'about.lede': 'HotelByte is not a property management system and not an OTA channel manager. It is the engineering OS that lets hotel distribution businesses run an AI-Native stack end to end.',
  'about.mission.title': 'Our mission',
  'about.mission.body': 'Help hotel distribution businesses win the next supply-chain reset by running AI-Native: evidence first, then change, with every step auditable.',
  'about.pillars.title': 'Three core stances',
  'about.pillars.p1.title': 'AI-Native',
  'about.pillars.p1.body': 'Governed data investigation and AI workflows can be evaluated against real business data and access rules.',
  'about.pillars.p2.title': 'B2B-first',
  'about.pillars.p2.body': 'Hierarchical platform, tenant, customer, and customer-account entities with scoped permissions.',
  'about.pillars.p3.title': 'Native observability',
  'about.pillars.p3.body': 'Session-level tracing connects requests, responses, and incident evidence so teams can reconstruct a problem.',
  'about.stats.title': 'Key statistics',
  'about.stats.s1.label': 'Pre-integrated suppliers',
  'about.stats.s1.value': 'Per-environment check',
  'about.stats.s2.label': 'Average implementation cycle',
  'about.stats.s2.value': 'Project-specific',
  'about.stats.s3.label': 'Troubleshooting speedup',
  'about.stats.s3.value': 'Traceable',
  'about.stats.s4.label': 'Cost advantage vs legacy platforms',
  'about.stats.s4.value': 'Scope-specific',
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

  // Demo page (Stai live demo)
  'demo.badge': 'Live demo · no signup',
  'demo.title': 'Stai — Online Demo of the HotelByte B2B Distribution Workbench',
  'demo.subtitle': 'A B2B hotel distribution workbench for tour operators and travel agencies.',
  'demo.byHotelByte': 'by HotelByte',
  'demo.cta.primary': 'Open Demo',
  'demo.cta.secondary': 'How it works',
  'demo.modules.title': 'Eight modules, one workbench',
  'demo.modules.subtitle': 'Search, bookings, sessions, products, suppliers, customers, rules, and Lookout pricing — all live in the same workbench.',
  'demo.modules.search': 'Hotel Search',
  'demo.modules.bookings': 'Bookings',
  'demo.modules.sessions': 'Sessions',
  'demo.modules.products': 'Products',
  'demo.modules.suppliers': 'Suppliers',
  'demo.modules.customers': 'Customers',
  'demo.modules.rules': 'Rules',
  'demo.modules.lookout': 'Lookout Pricing',
  'demo.foundation.title': 'Powered by HotelByte',
  'demo.foundation.body': 'Stai runs on the same AI-Native engineering OS that powers HotelByte\'s enterprise distribution base: federated queries, native observability, and B2B-first architecture by default.',
  'demo.foundation.cta': 'View HotelByte distribution base',
  'demo.pillars.multiCurrency.title': 'Multi-currency · Multi-country · Multi-segment',
  'demo.pillars.multiCurrency.body': 'Built-in multi-currency credit, separated nationality/residency, granular RBAC — complex B2B agency ecosystems are a default capability.',
  'demo.pillars.suppliers.title': 'Hotel supplier adapters',
  'demo.pillars.suppliers.body': 'A unified API connects supplier adapters; availability depends on credentials, configuration, and target-market validation.',
  'demo.pillars.observability.title': 'Session-Level Evidence Chain',
  'demo.pillars.observability.body': 'Search, quote, and order identifiers connect the request path so teams can inspect evidence when a problem occurs.',
  'demo.disclaimer': 'The Stai demo is a public sample. All accounts, suppliers, and bookings shown are fictional and reset periodically.',
};

const dictionaries: Partial<Record<Locale, Record<string, string>>> = { zh, en, ar };

// Content locale for bilingual-only subsystems (presales chat, story bodies,
// anything typed 'en' | 'zh'): tier-2 locales read the English side.
export function contentLocaleOf(locale: Locale): 'en' | 'zh' {
  return locale === 'zh' ? 'zh' : 'en';
}
