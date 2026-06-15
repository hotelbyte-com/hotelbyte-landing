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
    description: 'Seven product lines built on the AI-Native foundation: AI-Native Automations, Lookout Price Intelligence, B2B Distribution Base, TraceSight, RevenuePilot, MarginLift, and DeepSeek V4-Flash Appliance.',
    descriptionZh: '基于 AI-Native 底座构建的七条产品线:AI 原生自动化、Lookout 价格情报、企业级分销底座、TraceSight、RevenuePilot、MarginLift 与 DeepSeek V4-Flash 一体机。'
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
  marginLift: {
    path: '/products/margin-lift',
    title: 'MarginLift — AI Advisory for Hotel Distribution',
    titleZh: 'MarginLift — 面向酒店分销的 AI 顾问',
    description: 'AI advisory service: phase-1 diagnostic sprint to identify AI opportunities, phase-2 implementation SOW for agents, workflows, dashboards, and managed operations.',
    descriptionZh: 'AI 顾问服务:第一阶段诊断冲刺识别 AI 机会,第二阶段实施方案交付智能体、工作流、看板和托管运营。'
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
    title: 'HotelByte vs SiteMinder, Cloudbeds, D-EDGE, and more',
    titleZh: 'HotelByte vs SiteMinder、Cloudbeds、D-EDGE 等对比',
    description: 'Full comparison of HotelByte with SiteMinder, Cloudbeds, D-EDGE, Juniper, Gimmonix, ZentrumHub, and TravelgateX across pricing, integration speed, AI/automation, total cost, implementation, support, and B2B agency support.',
    descriptionZh: 'HotelByte 与 SiteMinder、Cloudbeds、D-EDGE、Juniper、Gimmonix、ZentrumHub、TravelgateX 在定价、接入速度、AI/自动化、总体拥有成本、实施周期、支持模式、B2B 代理支持等维度的全面对比。',
    keywords: ['HotelByte vs SiteMinder', 'HotelByte vs Cloudbeds', 'HotelByte vs D-EDGE', 'SiteMinder alternative', 'Cloudbeds alternative', 'D-EDGE alternative', 'hotel distribution comparison']
  },
  about: {
    path: '/about',
    title: 'About HotelByte — Engineering OS for Hotel Distribution',
    titleZh: '关于 HotelByte — 面向酒店分销的工程化操作系统',
    description: 'HotelByte is the AI-Native engineering OS for hotel distribution. We build the infrastructure, diagnostics, and AI revenue strategy that hotel distribution businesses need to operate at scale.',
    descriptionZh: 'HotelByte 是面向酒店分销的 AI-Native 工程化操作系统。我们提供分销企业规模化运营所需的基础设施、诊断与 AI 收益策略。'
  },
  changelog: {
    path: '/changelog',
    title: 'Changelog — HotelByte Landing Updates',
    titleZh: '更新日志 — HotelByte Landing 变更',
    description: 'Recent updates to the HotelByte landing page: SEO, GEO, AEO foundations, daily stories, product pages, and infrastructure changes.',
    descriptionZh: 'HotelByte Landing 近期更新:SEO/GEO/AEO 基础、每日故事、产品页与基础设施变更。'
  }
};

export function getProductRoute(slug: string, locale: Locale = 'en'): RouteSeo | undefined {
  return Object.values(SITE_ROUTES).find((r) => r.path === `/products/${slug}`);
}

export const DAILY_STORY_BASE_PATH = '/stories';

export const DEFAULT_OG_IMAGE = '/og-image.svg';
export const DEFAULT_OG_IMAGE_ABS = SITE_ROUTES.home ? `https://hotelbyte.com${DEFAULT_OG_IMAGE}` : DEFAULT_OG_IMAGE;

export type ProductSeoContext = {
  product: Product;
  slug: string;
};
