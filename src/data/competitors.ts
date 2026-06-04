export interface Competitor {
  name: string;
  type: string;
  typeEn: string;
  strengths: string[];
  strengthsEn: string[];
  weaknesses: string[];
  weaknessesEn: string[];
  website: string;
}

export interface ComparisonDimension {
  name: string;
  nameEn: string;
  hotelbyte: string;
  hotelbyteEn: string;
  competitors: Record<string, string>;
  competitorsEn: Record<string, string>;
}

export const competitors: Competitor[] = [
  {
    name: 'SiteMinder',
    type: '渠道管理',
    typeEn: 'Channel Manager',
    strengths: [
      '450+ OTA 直连，渠道管理领域市占率领先',
      '渠道管理功能成熟完善',
      '酒店业品牌认知度高',
    ],
    strengthsEn: [
      '450+ OTA connections, market leader in channel management',
      'Mature channel management features',
      'Strong brand recognition in hospitality',
    ],
    weaknesses: [
      '高额固定月费，与业务量脱钩',
      '无 AI 驱动的房型映射能力',
      '价格情报功能薄弱',
      '无原生 B2B 代理/分销商支持',
    ],
    weaknessesEn: [
      'High fixed monthly fees regardless of usage',
      'No AI-powered room mapping capability',
      'Limited pricing intelligence features',
      'No native B2B agent/reseller support',
    ],
    website: 'https://www.siteminder.com',
  },
  {
    name: 'Cloudbeds',
    type: '一体化 PMS',
    typeEn: 'All-in-One PMS',
    strengths: [
      '界面现代、直观易用',
      '应用市场集成 400+ 第三方服务',
      '物业管理功能强大',
    ],
    strengthsEn: [
      'Modern, intuitive user interface',
      '400+ integrations in marketplace',
      'Strong property management features',
    ],
    weaknesses: [
      '固定月费模式，非按效果付费',
      '高级配置需要技术背景',
      '复杂集成无托管服务支持',
      'AI/自动化能力有限',
    ],
    weaknessesEn: [
      'Fixed monthly costs, not performance-based',
      'Requires technical expertise for advanced setup',
      'No managed services for complex integrations',
      'Limited AI/automation capabilities',
    ],
    website: 'https://www.cloudbeds.com',
  },
  {
    name: 'D-EDGE',
    type: 'CRS / 分销',
    typeEn: 'CRS / Distribution',
    strengths: [
      '欧洲市场根基深厚',
      '企业级可靠性保障',
      'GDS 全球分销系统连接全面',
    ],
    strengthsEn: [
      'Strong presence in European markets',
      'Enterprise-grade reliability',
      'Comprehensive GDS connectivity',
    ],
    weaknesses: [
      '实施流程复杂冗长',
      '独立酒店成本高昂',
      'AI 与自动化功能匮乏',
      '定制化 B2B 场景灵活性不足',
    ],
    weaknessesEn: [
      'Complex implementation process',
      'Expensive for independent hotels',
      'Limited AI and automation features',
      'Less flexible for custom B2B scenarios',
    ],
    website: 'https://www.d-edge.com',
  },
  {
    name: 'Juniper',
    type: 'B2B 分销平台',
    typeEn: 'B2B Distribution Platform',
    strengths: [
      '专注旅游 B2B 分销多年',
      'Cangooroo 预订引擎知名度高',
      '拉美和欧洲市场覆盖较好',
    ],
    strengthsEn: [
      'Long-standing focus on travel B2B distribution',
      'Cangooroo booking engine well-known in sector',
      'Strong coverage in LATAM and Europe',
    ],
    weaknesses: [
      '技术架构偏传统，API 响应速度受限',
      '无原生 AI 诊断与自动化能力',
      '供应商集成以欧美为主，亚太覆盖弱',
      '价格情报与动态定价功能缺失',
    ],
    weaknessesEn: [
      'Legacy tech architecture limits API responsiveness',
      'No native AI diagnostics or automation',
      'Supplier integrations Europe/Americas-focused, weak APAC',
      'Lacks price intelligence and dynamic pricing',
    ],
    website: 'https://www.juniper.net',
  },
  {
    name: 'Gimmonix',
    type: '酒店映射与分销',
    typeEn: 'Hotel Mapping & Distribution',
    strengths: [
      'Mapping 技术积累深厚，自动化匹配率高',
      '支持多供应商内容聚合',
      'API 文档清晰，开发者体验良好',
    ],
    strengthsEn: [
      'Deep mapping technology with high auto-match rates',
      'Multi-supplier content aggregation support',
      'Clear API docs, good developer experience',
    ],
    weaknesses: [
      '仅聚焦映射与内容，无完整分销闭环',
      '无 AI 驱动的价格情报与诊断能力',
      '缺乏 B2B 代理层级与信用管理体系',
      '无私有化 AI 部署选项',
    ],
    weaknessesEn: [
      'Focused only on mapping/content, no full distribution loop',
      'No AI-driven price intelligence or diagnostics',
      'Lacks B2B agency hierarchy and credit management',
      'No private AI deployment option',
    ],
    website: 'https://www.gimmonix.com',
  },
  {
    name: 'ZentrumHub',
    type: 'B2B 酒店分销',
    typeEn: 'B2B Hotel Distribution',
    strengths: [
      '印度及中东市场 B2B 分销能力强',
      '供应商网络覆盖较广',
      '支持多币种与多语言报价',
    ],
    strengthsEn: [
      'Strong B2B distribution in India and Middle East',
      'Broad supplier network coverage',
      'Multi-currency and multi-language rate support',
    ],
    weaknesses: [
      '技术平台较传统，缺乏 AI-Native 架构',
      '无自研价格监控与异常诊断工具',
      '中国供应商集成有限',
      '实施周期较长，定制化成本高',
    ],
    weaknessesEn: [
      'Legacy platform, lacks AI-Native architecture',
      'No proprietary price monitoring or anomaly diagnostics',
      'Limited China supplier integrations',
      'Long implementation cycles, high customization costs',
    ],
    website: 'https://www.zentrumhub.com',
  },
  {
    name: 'TravelgateX',
    type: '旅游 API 市场',
    typeEn: 'Travel API Marketplace',
    strengths: [
      '庞大的供应商 API 市场，连接数众多',
      '标准化 API 接口降低集成门槛',
      '社区活跃，开发者资源丰富',
    ],
    strengthsEn: [
      'Massive supplier API marketplace with many connections',
      'Standardized API interfaces lower integration barriers',
      'Active community with rich developer resources',
    ],
    weaknesses: [
      '纯连接层，无业务逻辑与智能层',
      '无 AI 诊断、价格情报等增值能力',
      '无 B2B 代理生态与信用管理支持',
      '数据洞察与报表功能薄弱',
    ],
    weaknessesEn: [
      'Pure connectivity layer, no business logic or intelligence',
      'No AI diagnostics, price intelligence, or value-add capabilities',
      'No B2B agency ecosystem or credit management support',
      'Weak data insights and reporting features',
    ],
    website: 'https://www.travelgatex.com',
  },
];

export const comparisonDimensions: ComparisonDimension[] = [
  {
    name: '定价模式',
    nameEn: 'Pricing Model',
    hotelbyte: '按效果付费 + 分层订阅',
    hotelbyteEn: 'Performance-based + tiered subscription',
    competitors: {
      'SiteMinder': '固定月费 SaaS',
      'Cloudbeds': '按房间数固定月费',
      'D-EDGE': '企业合同定价',
      'Juniper': '固定订阅 + 交易费',
      'Gimmonix': '按调用量计费',
      'ZentrumHub': '固定月费 + 定制费',
      'TravelgateX': '按 API 调用量计费',
    },
    competitorsEn: {
      'SiteMinder': 'Fixed monthly SaaS fee',
      'Cloudbeds': 'Fixed monthly per room',
      'D-EDGE': 'Enterprise contract pricing',
      'Juniper': 'Fixed subscription + transaction fees',
      'Gimmonix': 'Usage-based per API call',
      'ZentrumHub': 'Fixed monthly + customization fees',
      'TravelgateX': 'Per API call volume',
    },
  },
  {
    name: '接入速度',
    nameEn: 'Connectivity Speed',
    hotelbyte: '标准适配器 2-4 周接入新供应商',
    hotelbyteEn: 'New supplier in 2-4 weeks via standard adapter',
    competitors: {
      'SiteMinder': 'OTA 直连已预置',
      'Cloudbeds': '依赖应用市场可用性',
      'D-EDGE': '定制连接需 3-6 个月',
      'Juniper': '预置供应商较多，新接入较慢',
      'Gimmonix': '映射快，但分销闭环需自建',
      'ZentrumHub': '2-3 个月实施周期',
      'TravelgateX': '市场已有连接即插即用',
    },
    competitorsEn: {
      'SiteMinder': 'Standard OTA connections pre-built',
      'Cloudbeds': 'Depends on marketplace availability',
      'D-EDGE': '3-6 months for custom connections',
      'Juniper': 'Many pre-built suppliers, slow new onboarding',
      'Gimmonix': 'Fast mapping, but distribution loop self-built',
      'ZentrumHub': '2-3 months implementation cycle',
      'TravelgateX': 'Marketplace connections plug-and-play',
    },
  },
  {
    name: 'AI / 自动化',
    nameEn: 'AI / Automation',
    hotelbyte: '原生 AI Agent、LLM 诊断、自动映射',
    hotelbyteEn: 'Native AI agents, LLM diagnostics, auto-mapping',
    competitors: {
      'SiteMinder': '仅基础规则自动化',
      'Cloudbeds': '有限的工作流自动化',
      'D-EDGE': '无 AI 功能',
      'Juniper': '无 AI 能力',
      'Gimmonix': '无 AI 驱动功能',
      'ZentrumHub': '无 AI 功能',
      'TravelgateX': '无 AI 能力',
    },
    competitorsEn: {
      'SiteMinder': 'Basic rule-based automation only',
      'Cloudbeds': 'Limited workflow automation',
      'D-EDGE': 'No AI features',
      'Juniper': 'No AI capabilities',
      'Gimmonix': 'No AI-driven features',
      'ZentrumHub': 'No AI features',
      'TravelgateX': 'No AI capabilities',
    },
  },
  {
    name: '总体拥有成本',
    nameEn: 'Total Cost of Ownership',
    hotelbyte: '低门槛进入，随用量弹性扩展',
    hotelbyteEn: 'Low entry cost, scales with usage',
    competitors: {
      'SiteMinder': '高固定成本 + 隐藏集成费',
      'Cloudbeds': '可预测但僵化的月费',
      'D-EDGE': '高昂的企业级定价',
      'Juniper': '中等订阅费 + 交易抽成',
      'Gimmonix': '按量计费，用量大时成本高',
      'ZentrumHub': '定制费用高',
      'TravelgateX': '调用量大时费用显著',
    },
    competitorsEn: {
      'SiteMinder': 'High fixed costs + hidden integration fees',
      'Cloudbeds': 'Predictable but inflexible monthly cost',
      'D-EDGE': 'High enterprise pricing',
      'Juniper': 'Medium subscription + transaction commission',
      'Gimmonix': 'Usage-based, expensive at high volume',
      'ZentrumHub': 'High customization fees',
      'TravelgateX': 'Significant costs at high call volume',
    },
  },
  {
    name: '实施周期',
    nameEn: 'Implementation Time',
    hotelbyte: '标准集成 2-4 周',
    hotelbyteEn: '2-4 weeks for standard integration',
    competitors: {
      'SiteMinder': '基础配置 1-2 周',
      'Cloudbeds': '完整迁移 4-8 周',
      'D-EDGE': '企业级上线 3-6 个月',
      'Juniper': '2-3 个月',
      'Gimmonix': '映射接入 1-2 周，完整闭环需自建',
      'ZentrumHub': '2-3 个月',
      'TravelgateX': '已有连接即时，定制需数周',
    },
    competitorsEn: {
      'SiteMinder': '1-2 weeks for basic setup',
      'Cloudbeds': '4-8 weeks for full migration',
      'D-EDGE': '3-6 months enterprise rollout',
      'Juniper': '2-3 months',
      'Gimmonix': 'Mapping in 1-2 weeks, full loop self-built',
      'ZentrumHub': '2-3 months',
      'TravelgateX': 'Existing connections instant, custom takes weeks',
    },
  },
  {
    name: '支持模式',
    nameEn: 'Support Model',
    hotelbyte: '自助服务 + 托管服务可选',
    hotelbyteEn: 'Self-service + managed services option',
    competitors: {
      'SiteMinder': '工单支持',
      'Cloudbeds': '社区 + 工单支持',
      'D-EDGE': '企业专属客户经理',
      'Juniper': '区域代理支持',
      'Gimmonix': '开发者文档 + 工单',
      'ZentrumHub': '专属客户经理',
      'TravelgateX': '社区 + 工单支持',
    },
    competitorsEn: {
      'SiteMinder': 'Ticket support',
      'Cloudbeds': 'Community + ticket support',
      'D-EDGE': 'Dedicated account manager (enterprise)',
      'Juniper': 'Regional agent support',
      'Gimmonix': 'Developer docs + ticket support',
      'ZentrumHub': 'Dedicated account manager',
      'TravelgateX': 'Community + ticket support',
    },
  },
  {
    name: 'B2B 代理支持',
    nameEn: 'B2B Agent Support',
    hotelbyte: '原生四级实体架构',
    hotelbyteEn: 'Native 4-tier entity architecture',
    competitors: {
      'SiteMinder': '不支持',
      'Cloudbeds': '有限的分销商功能',
      'D-EDGE': '仅企业定制方案',
      'Juniper': '支持但配置复杂',
      'Gimmonix': '无 B2B 层级管理',
      'ZentrumHub': '基础 B2B 功能',
      'TravelgateX': '无代理生态支持',
    },
    competitorsEn: {
      'SiteMinder': 'Not supported',
      'Cloudbeds': 'Limited reseller features',
      'D-EDGE': 'Enterprise-only custom solutions',
      'Juniper': 'Supported but complex setup',
      'Gimmonix': 'No B2B hierarchy management',
      'ZentrumHub': 'Basic B2B features',
      'TravelgateX': 'No agency ecosystem support',
    },
  },
];

export const hotelbyteAdvantages = [
  {
    title: 'AI-Native 原生架构',
    titleEn: 'AI-Native from Ground Up',
    desc: '竞品将 AI 作为事后补丁，HotelByte 从设计之初就以 AI Agent 为核心。Data Agent、TraceSight LLM 和自主运维智能体都是原生能力，而非第三方插件。',
    descEn: 'Unlike competitors who bolt on AI as an afterthought, HotelByte was designed with AI agents at its core. Data Agent, TraceSight LLM, and autonomous agents are native capabilities, not third-party add-ons.',
  },
  {
    title: '按效果付费',
    titleEn: 'Performance-Based Pricing',
    desc: '按实际用量付费，而非固定月费。定价随业务弹性扩展，既适合初创企业，也能满足大型企业的规模需求。',
    descEn: 'Pay for what you use, not a flat monthly fee. Our pricing scales with your business, making us accessible to startups while still powerful enough for enterprise.',
  },
  {
    title: 'B2B 优先架构',
    titleEn: 'B2B-First Architecture',
    desc: 'Platform -> Tenant -> Customer -> Account 四级层级为复杂 B2B 分销网络而生。竞品以 B2C 为核心，B2B 只是附加功能。',
    descEn: 'Our Platform → Tenant → Customer → Account hierarchy is built for complex B2B distribution networks. Competitors are B2C-focused and treat B2B as an afterthought.',
  },
  {
    title: '27+ 供应商预集成',
    titleEn: '27+ Supplier Integrations',
    desc: '已预置 27+ 全球供应商适配器，包括 Dida、Tourmind 等中国本土合作伙伴——这正是西方竞品普遍缺失的能力。',
    descEn: 'Pre-built adapters for 27+ global suppliers including China-focused partners like Dida and Tourmind that Western competitors often lack.',
  },
  {
    title: '会话级可观测性',
    titleEn: 'Session-Level Observability',
    desc: 'TraceSight 提供全链路 Trace 级可见性，深入每一次 API 调用。传统 APM 工具无法理解酒店分销的业务语义。',
    descEn: 'TraceSight provides trace-level visibility into every API call across the entire distribution chain. Traditional APM tools cannot understand hotel distribution business semantics.',
  },
];
