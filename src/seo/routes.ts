// Per-route SEO metadata for HotelByte Landing.
// Use these from page components to drive <Seo /> and structured data.

import type { Product } from '../data/products';

export type Locale = 'en' | 'zh';

export interface RouteSeo {
  path: string;
  title: string;          // English (en) form
  titleZh: string;        // Chinese (zh) form
  description: string;    // English description
  descriptionZh: string;  // Chinese description
  keywords?: string[];
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

export const SITE_ROUTES: Record<string, RouteSeo> = {
  home: {
    path: '/',
    title: 'Hotel Distribution Platform for Distributors & Travel Sellers | HotelByte',
    titleZh: '酒店分销平台｜面向分销商与旅行商 | HotelByte',
    description: 'HotelByte helps distribution platforms and travel sellers evaluate hotel supply connectivity, booking workflows, price intelligence, and diagnostics.',
    descriptionZh: 'HotelByte 帮助分销平台与旅行商评估酒店供应连接、预订工作流、价格情报与诊断能力。',
    keywords: ['HotelByte', 'hotel distribution platform', 'hotel distribution', 'travel sellers', 'distribution platforms', 'price intelligence', 'B2B', 'TraceSight', 'RevenuePilot', 'Lookout']
  },
  stories: {
    path: '/stories',
    title: 'Daily Stories — HotelByte Engineering Cross-Sections',
    titleZh: '每日故事 — HotelByte 工程剖面',
    description: 'Daily editorial cross-sections of how the HotelByte system actually works: pricing, distribution, diagnostics, revenue, and the small decisions that hold the architecture together.',
    descriptionZh: '每日一段 HotelByte 系统的工程剖面:价格、分销、诊断、收益,以及那些托住架构的小决策。'
  },
  products: {
    path: '/products',
    title: 'Product Suite — AI-Native Hotel Distribution',
    titleZh: '产品矩阵 — AI-Native 酒店分销',
    description: 'Explore HotelByte distribution infrastructure, price intelligence, diagnostics, revenue strategy, AI automation, and private AI deployment evaluation.',
    descriptionZh: '了解 HotelByte 的分销基础设施、价格情报、诊断、收益策略、AI 自动化及私有化 AI 部署评估。'
  },
  aiAutomations: {
    path: '/products/ai-automations',
    title: 'AI Automation Evaluation for Hotel Distribution',
    titleZh: '酒店分销场景的 AI 自动化评估',
    description: 'Evaluate HotelByte AI automation workflows with explicit data access, permissions, review, and operational evidence.',
    descriptionZh: '评估 HotelByte AI 自动化工作流中的数据访问、权限、审核与运行证据。'
  },
  priceIntelligence: {
    path: '/products/price-intelligence',
    title: 'Lookout Price Intelligence for Hotel Distribution',
    titleZh: 'Lookout 价格情报 — 酒店分销',
    description: 'Evaluate configured supplier, market, and date coverage using hotel rate facts and comparison workflows.',
    descriptionZh: '结合酒店房价事实和比价工作流，评估已配置供应商、市场与日期的覆盖情况。'
  },
  b2bDistribution: {
    path: '/products/b2b-distribution',
    title: 'Enterprise Distribution Base — Hotel Supplier Connectivity',
    titleZh: '企业级分销底座 — 酒店供应商连接',
    description: 'Hierarchical platform, tenant, customer, and account entities with scoped permissions. Supplier adapter availability depends on credentials and configuration.',
    descriptionZh: '平台、租户、客户及客户账号层级实体与权限范围。供应商适配器的可用性取决于凭证与配置。'
  },
  aiDistribution: {
    path: '/products/ai-distribution',
    title: 'AI Distribution Interface — One MCP Integration, Every Supplier',
    titleZh: 'AI 分销接口 — 一次 MCP 集成,全部供应商',
    description: 'The unified MCP tool surface for AI agents: search, live rates, and two-phase confirmed booking over 27+ aggregated supplier connectors, with evidence-carrying quotes and configurable pricing rules.',
    descriptionZh: '面向 AI Agent 的统一 MCP 工具面:搜索、实时报价与两段式确认预订,27+ 供应商连接器聚合在一个接口后面,报价自带证据信封,价格规则可配置。',
    keywords: ['MCP', 'Model Context Protocol', 'hotel MCP server', 'AI travel agent', 'hotel distribution API', 'AI distribution interface', 'hotel booking MCP', 'Claude MCP', 'agent booking API']
  },
  traceSight: {
    path: '/products/tracesight',
    title: 'TraceSight — Hotel Distribution Diagnostics',
    titleZh: 'TraceSight 追光 — 酒店分销诊断',
    description: 'Inspect session-level request traces and diagnostic evidence across hotel distribution workflows.',
    descriptionZh: '查看酒店分销工作流中的会话级请求追踪与诊断证据。'
  },
  revenuePilot: {
    path: '/products/revenuepilot',
    title: 'RevenuePilot — AI Revenue Strategy Engine',
    titleZh: 'RevenuePilot 益策 — AI 收益策略引擎',
    description: 'Natural-language revenue strategy drafts, pre-publish simulation evidence, governed save confirmation, and revenue agent orchestration.',
    descriptionZh: '自然语言收益策略草稿、发布前模拟证据、受控保存确认,以及收益 Agent 编排。'
  },
  consulting: {
    path: '/services/consulting',
    title: 'Consulting Services — AI Advisory + Technology Consulting for Hotel Distribution',
    titleZh: '咨询服务 — 面向酒店分销的 AI 顾问 + 技术咨询',
    description: 'One consulting engagement, two tracks: AI Advisory (formerly MarginLift) finds where AI cuts labor, cost, and lifts profit; Technology Consulting covers enterprise architecture, performance engineering, and cloud migration. Evidence-first, three-phase methodology.',
    descriptionZh: '一次咨询,两个方向:AI 顾问(原 MarginLift)找出能省人、降本、增利的 AI 机会;技术咨询服务覆盖企业架构、性能工程与云迁移。证据优先、三阶段方法论。',
    keywords: ['hotel distribution consulting', 'hotel AI advisory', 'hotel technology consulting', 'hotel software architecture consulting', 'hotel platform performance optimization', 'hotel cloud migration consulting', 'enterprise architecture consulting']
  },
  deepseekAppliance: {
    path: '/products/deepseek-appliance',
    title: 'Private AI Deployment Evaluation for Hotel Distribution',
    titleZh: '酒店分销场景的私有化 AI 部署评估',
    description: 'Evaluate on-prem AI model, hardware, data governance, and integration requirements for hotel distribution workflows.',
    descriptionZh: '评估酒店分销工作流中私有化 AI 的模型、硬件、数据治理与集成要求。'
  },
  compare: {
    path: '/compare',
    title: 'How to evaluate a hotel distribution base — procurement checklist',
    titleZh: '怎么评估一个酒店分销底座 — 分销采购清单',
    description: 'A vendor-neutral checklist for buying hotel distribution infrastructure: supply coverage, integration and API stability, white-label and B2B entity architecture, full-linkage diagnostics, and price intelligence — each with the questions to ask and how to verify the answer.',
    descriptionZh: '不点名厂商的分销采购清单：供应覆盖、接入与 API 稳定性、白标与 B2B 实体架构、全链路诊断、价格情报与收益策略，每项都给出该问的问题与现场验证方法。',
    keywords: ['hotel distribution platform evaluation', 'how to choose a hotel distribution partner', 'hotel distribution procurement checklist', 'B2B hotel distribution requirements', '酒店分销平台 选型', '酒店分销 采购清单']
  },
  distributionPlatforms: {
    path: '/solutions/distribution-platforms',
    title: 'Hotel Distribution Platform Solution',
    titleZh: '酒店分销平台解决方案',
    description: 'Connect hotel supply, agency customers, pricing rules, booking operations, and incident evidence in one distribution workflow.',
    descriptionZh: '在同一套分销工作流中连接酒店供应、代理客户、价格规则、预订运营与故障证据。'
  },
  travelSellers: {
    path: '/solutions/travel-sellers',
    title: 'Hotel Supply for Travel Sellers',
    titleZh: '面向旅行商的酒店供应',
    description: 'Evaluate hotel search, availability, booking, and after-sales workflows for travel agencies and travel technology teams.',
    descriptionZh: '面向旅行社和旅游技术团队的酒店搜索、查价、预订及售后工作流。'
  },
  hotelDistributionGuide: {
    path: '/guides/hotel-distribution',
    title: 'What Is Hotel Distribution? A Practical Guide',
    titleZh: '什么是酒店分销？实用指南',
    description: 'A practical guide to hotel distribution: suppliers, travel sellers, rates, availability, bookings, settlement, and platform evaluation.',
    descriptionZh: '解释酒店分销中的供应商、旅行商、房价、库存、预订、结算及平台选型。'
  },
  integrations: {
    path: '/integrations',
    title: 'Hotel Supplier Integration Directory',
    titleZh: '酒店供应商集成目录',
    description: 'Inspect HotelByte supplier adapters and the checks required before claiming live coverage in a target market.',
    descriptionZh: '核对 HotelByte 供应商适配器及在目标市场确认真实可用性所需的检查。'
  },
  caseStudies: {
    path: '/case-studies',
    title: 'HotelByte Product Evidence and Walkthroughs',
    titleZh: 'HotelByte 产品证据与验证路径',
    description: 'First-party product walkthroughs and public technical evidence for evaluating HotelByte. Named customer outcomes require approval.',
    descriptionZh: '用于评估 HotelByte 的产品演示路径与公开技术证据；具名客户成果须获授权。'
  },
  about: {
    path: '/about',
    title: 'About HotelByte — Engineering OS for Hotel Distribution',
    titleZh: '关于 HotelByte — 面向酒店分销的工程化操作系统',
    description: 'HotelByte is the AI-Native engineering OS for hotel distribution. We build the infrastructure, diagnostics, and AI revenue strategy that hotel distribution businesses need to operate at scale.',
    descriptionZh: 'HotelByte 是面向酒店分销的 AI-Native 工程化操作系统。我们提供分销企业规模化运营所需的基础设施、诊断与 AI 收益策略。'
  },
  demo: {
    path: '/demo',
    title: 'Stai — Online Demo of the HotelByte B2B Distribution Workbench',
    titleZh: 'Stai — HotelByte B2B 酒店分销工作台在线 Demo',
    description: 'Online demo of the HotelByte B2B hotel distribution workbench. Try search, bookings, sessions, suppliers, customers, rules, and Lookout pricing live.',
    descriptionZh: 'HotelByte B2B 酒店分销工作台在线 Demo:搜索、订单、会话、供应商、客户、规则与 Lookout 价格情报。',
    keywords: ['Stai', 'HotelByte', 'hotel distribution demo', 'B2B hotel workbench', 'online demo', 'travel agency workbench', '酒店分销演示', '在线 Demo']
  },
  paddlePay: {
    path: '/pay',
    title: 'HotelByte Subscription Payment',
    titleZh: 'HotelByte 订阅支付',
    description: 'Secure Paddle payment page for HotelByte portal subscriptions. Transactions are created from the HotelByte portal and completed through Paddle Checkout.',
    descriptionZh: 'HotelByte Portal 订阅的安全 Paddle 支付页面。交易由 Portal 创建，并通过 Paddle Checkout 完成付款。',
    keywords: ['HotelByte payment', 'Paddle checkout', 'HotelByte subscription'],
    noindex: true
  },
  changelog: {
    path: '/changelog',
    title: 'Changelog — HotelByte Landing Updates',
    titleZh: '更新日志 — HotelByte Landing 变更',
    description: 'Recent updates to the HotelByte landing page: SEO, GEO, AEO foundations, daily stories, product pages, and infrastructure changes.',
    descriptionZh: 'HotelByte Landing 近期更新:SEO/GEO/AEO 基础、每日故事、产品页与基础设施变更。'
  },
  terms: {
    path: '/terms',
    title: 'Terms of Service — HotelByte & GoTry Session Bridge',
    titleZh: '服务条款 — HotelByte 与 GoTry Session Bridge',
    description: 'The terms under which HotelByte provides hotelbyte.com, licensed platform capabilities, and the GoTry Session Bridge extension and local tools: scope, responsibilities, extension-specific terms, fees, IP, and liability.',
    descriptionZh: 'HotelByte 提供 hotelbyte.com、授权平期能力以及 GoTry Session Bridge 扩展与本地工具的条款：范围、责任、扩展专项、费用、知识产权与责任限制。',
    keywords: ['HotelByte terms of service', 'GoTry Session Bridge terms', 'hotel API distribution terms', 'hotelbyte.com'],
    ogType: 'article'
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy — HotelByte & GoTry Session Bridge',
    titleZh: '隐私政策 — HotelByte 与 GoTry Session Bridge',
    description: 'How HotelByte handles data across hotelbyte.com, the GoTry Session Bridge browser extension, and GoTry local tools: what is collected, where it goes, how long it lives, and how to have it removed.',
    descriptionZh: 'HotelByte 在本网站、GoTry Session Bridge 浏览器扩展与 GoTry 本地工具范围内的数据处理说明：收集什么、去向何处、保留多久、如何删除。',
    keywords: ['HotelByte privacy policy', 'GoTry Session Bridge privacy', 'chrome extension data practices', 'cookie names only', 'hotelbyte.com'],
    ogType: 'article'
  },
  platformIpNotice: {
    path: '/notices/hotelbyte-platform-ip-rights',
    title: 'Public Notice — HotelByte Platform Rights and TTDBooking Representations',
    titleZh: '公开声明 — HotelByte 平台权利与 TTDBooking 相关表述',
    description: 'HotelByte clarifies its ownership of the multi-tenant hotel API distribution platform, API documentation, website, architecture, and related platform assets, and warns partners to verify unauthorized TTDBooking representations.',
    descriptionZh: 'HotelByte 澄清其对多租户酒店 API 分销平台、API 文档、网站、技术架构及相关平台资产的权利，并提醒合作伙伴甄别未经授权的 TTDBooking 相关表述。',
    keywords: ['HotelByte public notice', 'HotelByte API rights', 'TTDBooking', 'Travel To Discover', 'hotel API distribution platform', 'platform intellectual property', 'commercial integrity'],
    ogType: 'article'
  }
};

export function getProductRoute(slug: string): RouteSeo | undefined {
  return Object.values(SITE_ROUTES).find((r) => r.path === `/products/${slug}`);
}

export const DAILY_STORY_BASE_PATH = '/stories';

export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_OG_IMAGE_ABS = SITE_ROUTES.home ? `https://hotelbyte.com${DEFAULT_OG_IMAGE}` : DEFAULT_OG_IMAGE;

export type ProductSeoContext = {
  product: Product;
  slug: string;
};
