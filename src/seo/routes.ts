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
    title: 'HotelByte — AI-Native Engineering OS for Hotel Distribution',
    titleZh: 'HotelByte — 面向酒店分销的 AI-Native 工程化操作系统',
    description: 'AI-Native engineering OS for hotel distribution: price intelligence, full-linkage diagnostics, AI revenue strategy, B2B infrastructure with 27+ supplier integrations.',
    descriptionZh: '面向酒店分销的 AI-Native 工程化操作系统:价格情报、全链路智能诊断、AI 收益策略与 27+ 供应商 B2B 底座。',
    keywords: ['HotelByte', 'hotel distribution', 'AI-native', 'price intelligence', 'B2B', 'revenue management', 'TraceSight', 'RevenuePilot', 'Lookout', 'DeepSeek appliance']
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
    description: 'Six product lines built on the AI-Native foundation: AI-Native Automations, Lookout Price Intelligence, B2B Distribution Base, TraceSight, RevenuePilot, and DeepSeek V4-Flash Appliance. Consulting services (AI advisory + technology consulting) live under /services/consulting.',
    descriptionZh: '基于 AI-Native 底座构建的六条产品线:AI 原生自动化、Lookout 价格情报、企业级分销底座、TraceSight、RevenuePilot 与 DeepSeek V4-Flash 一体机。咨询服务(AI 顾问 + 技术咨询)位于 /services/consulting。'
  },
  aiAutomations: {
    path: '/products/ai-automations',
    title: 'AI-Native Automations — Federated Query & Data Agents',
    titleZh: 'AI 原生自动化 — 联邦查询与数据智能体',
    description: 'Native data and engineering agents running inside HotelByte. Multi-source heterogeneous federated queries across MySQL, TDengine, Redis, MongoDB, Elasticsearch with built-in masking and RBAC.',
    descriptionZh: '原生运行在 HotelByte 内部的数据与工程智能体。MySQL / TDengine / Redis / MongoDB / Elasticsearch 多源异构联邦查询,内置脱敏与 RBAC。'
  },
  priceIntelligence: {
    path: '/products/price-intelligence',
    title: 'Lookout Price Intelligence — High-Concurrency Hotel Price Crawler',
    titleZh: 'Lookout 价格情报 — 高并发酒店价格爬虫',
    description: 'Industrial-grade high-concurrency price intelligence crawling, TDengine time-series storage, and automated benchmarking for B2B hotel distribution.',
    descriptionZh: '工业级高并发价格情报抓取,TDengine 时序存储与自动化比价服务,专为大规模 B2B 酒店分销设计。'
  },
  b2bDistribution: {
    path: '/products/b2b-distribution',
    title: 'Enterprise Distribution Base — 27+ Hotel Supplier Integrations',
    titleZh: '企业级分销底座 — 27+ 全球酒店供应商',
    description: '3-tier entity architecture (Platform → Tenant → Customer → Account) with 27+ pre-integrated hotel suppliers and multi-currency credit management.',
    descriptionZh: 'Platform → Tenant → Customer → Account 三层实体架构,27+ 全球酒店供应商预集成,多币种信用管理。'
  },
  traceSight: {
    path: '/products/tracesight',
    title: 'TraceSight — Full-Linkage Diagnostics & AI Root-Cause',
    titleZh: 'TraceSight 追光 — 全链路诊断与 AI 根因分析',
    description: 'Session-level tracing, AI root-cause analysis, and autonomous ops for the 4-party hotel distribution ecosystem. Cut troubleshooting from hours to minutes.',
    descriptionZh: '面向四方分销生态的会话级追踪、AI 根因分析与自主运维,把跨团队故障排查从小时级压缩到分钟级。'
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
    title: 'DeepSeek V4-Flash Appliance — On-Prem Enterprise AI',
    titleZh: 'DeepSeek V4-Flash 一体机 — 私有化企业 AI 平台',
    description: 'On-prem enterprise AI platform with built-in knowledge base, Data Agent, and self-evolving engine. 128GB memory, 284B model, deploy in 30 minutes.',
    descriptionZh: '私有化部署的企业 AI 平台,内置知识库、Data Agent 与自进化引擎。128GB 内存运行 284B 参数大模型,30 分钟完成部署。'
  },
  compare: {
    path: '/compare',
    title: 'How to evaluate a hotel distribution base — procurement checklist',
    titleZh: '怎么评估一个酒店分销底座 — 分销采购清单',
    description: 'A vendor-neutral checklist for buying hotel distribution infrastructure: supply coverage, integration and API stability, white-label and B2B entity architecture, full-linkage diagnostics, and price intelligence — each with the questions to ask and how to verify the answer.',
    descriptionZh: '不点名厂商的分销采购清单：供应覆盖、接入与 API 稳定性、白标与 B2B 实体架构、全链路诊断、价格情报与收益策略，每项都给出该问的问题与现场验证方法。',
    keywords: ['hotel distribution platform evaluation', 'how to choose a hotel distribution partner', 'hotel distribution procurement checklist', 'B2B hotel distribution requirements', '酒店分销平台 选型', '酒店分销 采购清单']
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
