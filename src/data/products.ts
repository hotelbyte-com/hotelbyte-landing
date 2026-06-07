export interface ProductTier {
  name: string;
  nameEn: string;
  focus: string;
  focusEn: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
}

export interface Product {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  features: { icon: string; title: string; titleEn: string; desc: string; descEn: string }[];
  valueProposition: string;
  valuePropositionEn: string;
  techHighlights: string[];
  techHighlightsEn: string[];
  integrationNotes: string;
  integrationNotesEn: string;
  competitorEdge: string[];
  competitorEdgeEn: string[];
  tiers?: ProductTier[];
}

export const products: Product[] = [
  {
    slug: 'ai-automations',
    name: 'AI 原生自动化',
    nameEn: 'AI-Native Automations',
    tagline: '将大模型能力深度注入分销系统',
    taglineEn: 'Deep LLM capabilities injected into your distribution stack',
    description: '这不是一个外挂的聊天框，而是原生地运行在 HotelByte 底层的数据与工程智能体。让非技术团队也能像数据工程师一样获取洞察，将数据分析周期从数天缩短至数分钟。',
    descriptionEn: 'Not a bolt-on chat widget — a native data and engineering agent running inside HotelByte. Enable non-technical teams to get insights like data engineers, cutting analysis cycles from days to minutes.',
    features: [
      { icon: 'Database', title: '多源异构联邦查询', titleEn: 'Multi-source heterogeneous federated query', desc: '支持 MySQL、TDengine、Redis、MongoDB、Elasticsearch 等多种数据源的统一查询。插件化架构，新数据源可快速接入，无需改动上层业务。', descEn: 'Unified query across MySQL, TDengine, Redis, MongoDB, Elasticsearch and more. Plugin architecture lets you add new sources without touching business logic.' },
      { icon: 'ShieldAlert', title: '严格的数据脱敏与权限隔离', titleEn: 'Governed data masking', desc: '受治理的自然语言数据调查工具，确保敏感数据在查询过程中自动脱敏。', descEn: 'Governed NL data investigation with automatic PII masking and RBAC-enforced access control.' },
      { icon: 'Code2', title: '自动生成可视化图表与洞察报告', titleEn: 'Auto-generated visualizations', desc: 'AI 自动将查询结果转化为直观的图表和可执行的洞察报告。', descEn: 'AI transforms query results into intuitive charts and actionable insight reports automatically.' },
    ],
    valueProposition: '让非技术团队也能像数据工程师一样获取洞察，将数据分析周期从数天缩短至数分钟。',
    valuePropositionEn: 'Empower non-technical teams with data-engineer-level insights. Cut analysis cycles from days to minutes.',
    techHighlights: [
      '模型无关的 LLM 编排层：OpenAI / Anthropic 协议兼容，Day-0 支持所有开源 SOTA 模型',
      '多源异构联邦查询引擎（MySQL / TDengine / Redis / MongoDB / ES 等）',
      '插件化数据源适配层，新数据源可快速扩展',
      '自动 SQL 生成与执行计划优化',
      '实时数据脱敏与权限校验',
    ],
    techHighlightsEn: [
      'Model-agnostic LLM orchestration: OpenAI / Anthropic protocol compatible, Day-0 support for all open-source SOTA models',
      'Multi-source heterogeneous federated query engine (MySQL / TDengine / Redis / MongoDB / ES and more)',
      'Plugin-based data source adapter layer for rapid extension',
      'Auto SQL generation with execution plan optimization',
      'Real-time data masking and permission validation',
    ],
    integrationNotes: '通过标准 REST API 接入，支持 WebSocket 流式响应。与 HotelByte 现有 RBAC 体系完全兼容。',
    integrationNotesEn: 'Standard REST API with WebSocket streaming. Fully compatible with HotelByte RBAC.',
    competitorEdge: [
      '竞品多为外挂式 Chatbot，我们是原生集成',
      '支持多源异构联邦查询，竞品通常只支持单一数据源',
      '插件化架构，新数据源可快速扩展',
      '内置数据脱敏，无需额外配置',
    ],
    competitorEdgeEn: [
      'Competitors bolt on Chatbots; we are natively integrated',
      'Multi-source heterogeneous federated queries vs. single-source only',
      'Plugin architecture for rapid data source extension',
      'Built-in data masking, zero extra configuration',
    ],
  },
  {
    slug: 'price-intelligence',
    name: 'Lookout 价格情报',
    nameEn: 'Lookout Price Intelligence',
    tagline: '洞悉市场，守护您的利润空间',
    taglineEn: 'Know the market. Protect your margins.',
    description: 'Lookout 提供工业级的高并发价格情报抓取、时序存储与自动化比价服务，专为大规模 B2B 酒店分销设计。将人工比价工作自动化，实时监控市场价格波动，确保您的报价始终具有竞争力。',
    descriptionEn: 'Industrial-grade high-concurrency price intelligence crawling, time-series storage, and automated benchmarking. Purpose-built for large-scale B2B hotel distribution.',
    features: [
      { icon: 'LineChart', title: 'TDengine 时序事实存储', titleEn: 'TDengine time-series storage', desc: '抛弃传统关系型数据库的性能瓶颈。所有供应商询价事实、延迟、速率限制命中率及报价套餐均存储于高性能 TDengine 中，支持海量数据秒级聚合。', descEn: 'Break free from relational DB bottlenecks. All supplier rate facts, latency, rate-limit hit rates stored in high-performance TDengine.' },
      { icon: 'Zap', title: '高并发智能爬虫', titleEn: 'High-concurrency smart crawler', desc: '依托 HotelByte 底层的 HotelRates 接口引擎，Lookout 可并发处理多供应商、多客源国、多提前预订期的笛卡尔积式海量比价请求。', descEn: 'Leverage the HotelRates engine to concurrently process massive Cartesian-product comparison requests across suppliers, markets, and lead times.' },
      { icon: 'Clock', title: '全自动化监控闭环', titleEn: 'Fully automated monitoring loop', desc: '支持 pay_per_run 与 monthly_quota 订阅模式。通过分布式的 Cron Job 管理，实现无缝的任务调度、覆盖检查、Excel 报表生成及通知下发。', descEn: 'Pay-per-run and monthly-quota modes. Distributed cron job management for seamless scheduling, coverage checks, Excel reports, and alerts.' },
      { icon: 'ShieldCheck', title: '生产级速率熔断保护', titleEn: 'Production-grade rate limiting', desc: '严格的 API 限流策略，基于凭证预算和 learned limit，在面对上游供应商 429 报错时智能降级退让，保障系统整体稳定性。', descEn: 'Credential-budget-based rate limiting with learned limits. Graceful degradation on upstream 429s to protect system stability.' },
    ],
    valueProposition: '将人工比价工作自动化，实时监控市场价格波动，确保您的报价始终具有竞争力。',
    valuePropositionEn: 'Automate manual price comparison. Monitor market fluctuations in real time. Keep your rates competitive 24/7.',
    techHighlights: [
      '基于 TDengine 的时序数据存储，支持亿级数据秒级聚合',
      '分布式爬虫集群，单机可达 10,000+ QPS',
      '智能速率限制学习与自适应退让算法',
      '多维度价格异常检测与预警',
    ],
    techHighlightsEn: [
      'TDengine time-series storage: billion-row aggregation in seconds',
      'Distributed crawler cluster: 10,000+ QPS per node',
      'Intelligent rate-limit learning with adaptive backoff',
      'Multi-dimensional price anomaly detection and alerting',
    ],
    integrationNotes: '提供 REST API 和 Webhook 回调。支持导出 Excel、PDF 报表。可与 Slack、钉钉等 IM 工具集成。',
    integrationNotesEn: 'REST API and Webhook callbacks. Excel/PDF export. Integrates with Slack, DingTalk, and more.',
    competitorEdge: [
      'SiteMinder 无原生价格情报功能，需第三方集成',
      'Cloudbeds 的定价工具仅支持基础规则，无 AI 驱动的动态定价',
      'D-EDGE 价格工具欧洲 focused，不支持中国供应商',
    ],
    competitorEdgeEn: [
      'SiteMinder has no native price intelligence; requires third-party add-ons',
      'Cloudbeds pricing tools only support basic rules, no AI-driven dynamic pricing',
      'D-EDGE pricing tools are Europe-focused, no China supplier support',
    ],
  },
  {
    slug: 'b2b-distribution',
    name: '企业级分销底座',
    nameEn: 'Enterprise Distribution Base',
    tagline: '构建于坚如磐石的三层实体架构之上',
    taglineEn: 'Built on a rock-solid 3-tier entity architecture',
    description: '这不是简单的 API 透传，而是支持复杂代理生态、多层级权限管控与 27+ 顶级供应商无缝对接的工程级操作平台。一套 API 对接全球 27+ 供应商，让技术团队专注于业务创新而非基础设施。',
    descriptionEn: 'Not simple API passthrough — an engineering-grade operations platform supporting complex agency ecosystems, multi-tier permission control, and seamless integration with 27+ top suppliers.',
    features: [
      { icon: 'Layers', title: '三层实体权限隔离', titleEn: '3-tier entity isolation', desc: 'Tenant -> Customer -> Account。完美的 B2B 隔离体系，从代码源头确保越权访问的物理隔离。支持灵活的上下级代理体系及独立财务核算。', descEn: 'Tenant → Customer → Account. Perfect B2B isolation with physical separation at the code level. Flexible sub-agency hierarchies with independent financial accounting.' },
      { icon: 'Network', title: '27+ 全球顶级供应商集成', titleEn: '27+ global supplier integrations', desc: '已完成对 Dida, Tourmind, Yalago, Hotelbeds 等超过 27 家主流供应商的标准接口对接。提供极简的统一查询与预订 API，屏蔽上游复杂逻辑。', descEn: 'Pre-built adapters for 27+ suppliers including Dida, Tourmind, Yalago, Hotelbeds. One unified API abstracts upstream complexity.' },
      { icon: 'BookOpen', title: '内容即服务 (CaaS)', titleEn: 'Content-as-a-Service (CaaS)', desc: '强大的房型匹配引擎。将复杂的 Hotel Mapping 与 Room Type Mapping 剥离为独立的微服务插件，为您的自有系统提供高精准度的静态数据清洗服务。', descEn: 'Powerful room-type matching engine. Hotel Mapping and Room Type Mapping as independent microservices for high-accuracy static data cleansing.' },
      { icon: 'Key', title: '细粒度信用管理', titleEn: 'Granular credit management', desc: '支持复杂的信用（Credit）授权、冻结与扣款流。完美支持预授权支付、B2B 月结额度管理等财务核心场景，确保资金流向清晰可控。', descEn: 'Complex credit authorization, freeze, and deduction flows. Pre-auth payments, B2B monthly settlement quotas — all with clear fund traceability.' },
    ],
    valueProposition: '一套 API 对接全球 27+ 供应商，三层架构完美支撑 B2B 代理生态，让技术团队专注于业务创新而非基础设施。',
    valuePropositionEn: 'One API for 27+ global suppliers. 3-tier architecture powers B2B agency ecosystems. Let your team focus on business innovation, not infrastructure.',
    techHighlights: [
      'Platform -> Tenant -> Customer -> Account 四级实体隔离',
      '27+ 供应商标准适配器，统一 API 屏蔽上游差异',
      'Hotel/Room Type Mapping 微服务，ML 辅助匹配',
      '多币种信用额度管理与实时风控',
    ],
    techHighlightsEn: [
      'Platform → Tenant → Customer → Account 4-tier entity isolation',
      '27+ supplier standard adapters with unified API abstraction',
      'Hotel/Room Type Mapping microservice with ML-assisted matching',
      'Multi-currency credit quota management with real-time risk control',
    ],
    integrationNotes: '提供 OpenAPI 规范文档、SDK（Go/Java）和 Postman 集合。支持沙箱环境完整模拟。',
    integrationNotesEn: 'OpenAPI spec, SDKs (Go/Java), and Postman collections. Full sandbox environment for zero-risk integration testing.',
    competitorEdge: [
      'SiteMinder 仅支持 OTA 渠道管理，无 B2B 代理体系',
      'DerbySoft 企业级定价高，无中小客户友好方案',
      'Mews 以 PMS 为主，分销能力为附加功能',
    ],
    competitorEdgeEn: [
      'SiteMinder only supports OTA channel management, no B2B agency system',
      'DerbySoft enterprise pricing is high, no SMB-friendly options',
      'Mews is PMS-first; distribution is a secondary feature',
    ],
  },
  {
    slug: 'tracesight',
    name: 'TraceSight 追光',
    nameEn: 'TraceSight',
    tagline: '全链路可见，故障无处遁形',
    taglineEn: 'Full-linkage visibility. Failures have nowhere to hide.',
    description: 'TraceSight 是专为复杂的四方（平台、租户、客户、供应商）分销生态打造的一站式智能诊断平台。打破信息孤岛，将原本需要 2-4 小时的跨团队故障排查时间，压缩至 10 分钟以内。',
    descriptionEn: 'TraceSight is an intelligent diagnostics platform purpose-built for the complex 4-party (platform/tenant/customer/supplier) distribution ecosystem. Break down information silos and compress cross-team troubleshooting from 2-4 hours to under 10 minutes.',
    features: [],
    valueProposition: '打破信息孤岛。将原本需要 2-4 小时的跨团队故障排查时间，压缩至惊人的 10 分钟以内。',
    valuePropositionEn: 'Break information silos. Compress cross-team troubleshooting from 2-4 hours to under 10 minutes.',
    techHighlights: [
      '基于 SessionAgent 架构的会话级诊断',
      '全链路 TraceID 追踪与日志聚合',
      '模型无关的 AI 根因分析：兼容 OpenAI / Anthropic 协议，Day-0 支持所有开源 SOTA 模型',
      '多方协同排查与诊断验证矩阵',
    ],
    techHighlightsEn: [
      'SessionAgent-based session-level diagnostics',
      'Full-linkage TraceID tracing and log aggregation',
      'Model-agnostic AI root-cause analysis: OpenAI / Anthropic protocol compatible, Day-0 support for all open-source SOTA models',
      'Multi-party collaborative diagnostics with verification matrix',
    ],
    integrationNotes: '原生集成 HotelByte 所有服务，无需额外部署。支持通过 Web 界面和 API 两种方式访问诊断结果。',
    integrationNotesEn: 'Natively integrated with all HotelByte services. No extra deployment needed. Access via web UI and API.',
    competitorEdge: [
      'SiteMinder / Cloudbeds 无原生运维诊断工具',
      '传统 APM 工具（如 Datadog）无法理解酒店分销业务语义',
      'TraceSight 将业务上下文与技术指标深度融合',
    ],
    competitorEdgeEn: [
      'SiteMinder / Cloudbeds have no native ops diagnostics',
      'Traditional APM tools (Datadog) cannot understand hotel distribution semantics',
      'TraceSight fuses business context with technical metrics',
    ],
    tiers: [
      {
        name: 'TraceSight Viewer',
        nameEn: 'TraceSight Viewer',
        focus: '会话级可观测性',
        focusEn: 'Session-level observability',
        description: '实时会话追踪、请求/响应检查、酒店分销 API 调用的日志关联。精确还原每一次搜索、预订或映射请求的全貌。',
        descriptionEn: 'Real-time session tracing, request/response inspection, log correlation for hotel distribution API calls. See exactly what happened in every search, booking, or mapping request.',
        features: ['全链路请求追踪与日志聚合', 'TraceID 级别的会话还原', '多方（平台/租户/客户/供应商）视角切换', '实时请求/响应报文查看'],
        featuresEn: ['Full-linkage request tracing and log aggregation', 'TraceID-level session reconstruction', 'Multi-party (platform/tenant/customer/supplier) perspective switching', 'Real-time request/response payload inspection'],
      },
      {
        name: 'TraceSight LLM',
        nameEn: 'TraceSight LLM',
        focus: 'AI 智能诊断',
        focusEn: 'AI-powered diagnostics',
        description: '用自然语言查询运维数据。问"昨天预订量为什么下降？"，即可从会话日志、指标和异常中获取 AI 生成的洞察。',
        descriptionEn: 'Natural language querying of operational data. Ask "Why did bookings drop yesterday?" and get AI-generated insights from session logs, metrics, and anomalies.',
        features: ['自然语言故障排查', '基于大模型的自动化根因分析', '价格与房型映射异常秒级定位', '智能诊断建议与验证矩阵'],
        featuresEn: ['Natural language troubleshooting', 'LLM-powered automated root-cause analysis', 'Sub-second price and room-type mapping anomaly detection', 'Intelligent diagnosis suggestions with verification matrix'],
      },
      {
        name: 'TraceSight Agent',
        nameEn: 'TraceSight Agent',
        focus: '自主运维',
        focusEn: 'Autonomous operations',
        description: 'AI 智能体主动监控、诊断和修复分销问题。自动检测合作伙伴 API 降级、触发故障转移、自愈映射差异。',
        descriptionEn: 'AI agents that proactively monitor, diagnose, and remediate distribution issues. Auto-detect partner API degradation, trigger failover, and self-heal mapping discrepancies.',
        features: ['7x24 主动监控与异常检测', '自动故障隔离与降级', '自愈式映射修复', '预测性维护与容量规划'],
        featuresEn: ['24/7 proactive monitoring and anomaly detection', 'Auto fault isolation and degradation', 'Self-healing mapping repair', 'Predictive maintenance and capacity planning'],
      },
    ],
  },
  {
    slug: 'revenuepilot',
    name: 'RevenuePilot 益策',
    nameEn: 'RevenuePilot',
    tagline: '像量化策略一样运营酒店分销收益',
    taglineEn: 'Operate hotel distribution revenue like a quantitative strategy desk.',
    description: 'RevenuePilot 是面向酒店分销的 AI 收益策略引擎。当前链路已覆盖自然语言策略草稿、发布前模拟证据和受控保存确认，并沿着赚钱机会识别与收益 Agent 编排继续演进，帮助客户在转化率、利润率和供应稳定性之间做更快、更有证据的决策。',
    descriptionEn: 'RevenuePilot is an AI revenue strategy engine for hotel distribution. The current workflow covers natural-language strategy drafts, pre-publish simulation evidence, and governed save confirmation, while continuing toward profit-opportunity detection and revenue agent orchestration.',
    features: [
      { icon: 'Code', title: '收益策略生成', titleEn: 'Revenue strategy generation', desc: '将“提高某客群毛利、保护高转化市场、绕开低稳定供应”等业务目标转化为结构化策略草稿。', descEn: 'Convert goals like improving segment margin, protecting high-conversion markets, or avoiding unstable supply into structured strategy drafts.' },
      { icon: 'ShieldCheck', title: '上线前模拟证据', titleEn: 'Simulation evidence before publish', desc: '策略启用保存前校验模拟命中、收益变化和服务端签发证据，避免凭感觉调价。', descEn: 'Before enabled saves, validate simulated hits, revenue changes, and server-issued evidence so teams do not price by instinct.' },
      { icon: 'Bot', title: '收益 Agent 编排', titleEn: 'Revenue agent orchestration', desc: '当前支持多轮澄清、策略草稿应用、既有策略修订上下文和保存确认，并向主动赚钱机会识别扩展。', descEn: 'Today it supports multi-turn clarification, strategy draft application, existing-strategy revision context, and save confirmation, with active expansion toward proactive profit-opportunity detection.' },
    ],
    valueProposition: '把商业策略从“人工经验 + 静态规则”升级为“AI 生成 + 模拟证据 + 受控保存”，让客户更快验证赚钱策略，并控制误配风险。',
    valuePropositionEn: 'Upgrade commercial strategy from manual instinct and static rules to AI generation, simulation evidence, and governed saves so customers validate profitable strategies faster while controlling risk.',
    techHighlights: [
      '收益策略意图识别与结构化草稿生成',
      '支持新增策略与修改既有策略的差异化应用路径',
      'Simulation-before-enable：命中模拟、收益影响、证据绑定与审计上下文',
      '与 HotelByte 加价、供应商条件、RBAC 和保存确认流程原生集成',
    ],
    techHighlightsEn: [
      'Revenue strategy intent recognition with structured draft generation',
      'Separate application paths for creating new strategies and modifying existing strategies',
      'Simulation-before-enable: hit simulation, revenue impact, evidence binding, and audit context',
      'Native integration with HotelByte markup, supplier conditions, RBAC, and save-confirmation flows',
    ],
    integrationNotes: '原生接入 HotelByte 管理后台、加价策略、供应商条件和保存确认流程。支持通过 API 提交策略意图、获取草稿、运行模拟、应用草稿并校验发布证据。',
    integrationNotesEn: 'Natively integrated with HotelByte management console, markup strategies, supplier conditions, and save-confirmation flows. APIs support submitting strategy intent, retrieving drafts, running simulations, applying drafts, and validating publish evidence.',
    competitorEdge: [
      '传统规则引擎偏工程配置，解决的是“能不能配置”，不是“能不能赚钱”',
      '收益管理工具多停留在建议层，无法安全写入分销策略草稿并校验启用证据',
      'RevenuePilot 把策略生成、模拟证据验证和草稿应用放在同一条链路中，并保留收益 Agent 编排方向',
    ],
    competitorEdgeEn: [
      'Traditional rule engines answer whether something can be configured, not whether it will make money',
      'Revenue management tools often stop at recommendations and cannot safely write distribution-strategy drafts with enablement evidence',
      'RevenuePilot combines strategy generation, simulation evidence validation, and draft application in one workflow, while preserving the revenue-agent orchestration roadmap',
    ],
    tiers: [
      {
        name: 'RevenuePilot Strategy',
        nameEn: 'RevenuePilot Strategy',
        focus: '收益策略配置与模拟',
        focusEn: 'Revenue strategy configuration and simulation',
        description: '面向商业团队的策略配置层。支持加价、客群、市场、供应商条件等策略模板，以及命中预览和发布前模拟证据。',
        descriptionEn: 'A strategy configuration layer for commercial teams. Includes templates for markup, segment, market, and supplier-condition strategies, plus match previews and pre-publish simulation evidence.',
        features: ['收益策略模板与条件构建器', '新增策略与既有策略编辑', '发布前命中与收益模拟', '草稿保存与变更差异'],
        featuresEn: ['Revenue strategy templates and condition builder', 'Create new strategies and edit existing strategies', 'Pre-publish hit and revenue simulation', 'Draft saving with change diffs'],
      },
      {
        name: 'RevenuePilot Quant',
        nameEn: 'RevenuePilot Quant',
        focus: 'AI 策略生成与证据校验',
        focusEn: 'AI strategy generation and evidence gates',
        description: '用自然语言描述收益目标，AI 自动识别策略意图、补齐必要字段、生成可审核草稿，并要求通过模拟证据后才能启用保存。',
        descriptionEn: 'Describe revenue goals in natural language. AI recognizes strategy intent, fills required fields, generates reviewable drafts, and requires simulation evidence before enabled saves.',
        features: ['自然语言收益策略生成', '多轮澄清与字段补全', '启用前模拟风险提示', '草稿应用前变更摘要'],
        featuresEn: ['Natural-language revenue strategy generation', 'Multi-turn clarification and field completion', 'Simulation-before-enable risk prompts', 'Change summary before applying drafts'],
      },
      {
        name: 'RevenuePilot Agent',
        nameEn: 'RevenuePilot Agent',
        focus: '收益策略运营助手',
        focusEn: 'Revenue strategy operations assistant',
        description: '收益 Agent 串联赚钱机会识别、策略建议、多轮澄清、模拟证据、保存确认和审计上下文；更深的治理能力通过扩展点接入。',
        descriptionEn: 'The revenue agent connects profit-opportunity detection, strategy suggestions, multi-turn clarification, simulation evidence, save confirmation, and audit context; deeper governance can plug in through extension points.',
        features: ['赚钱机会识别与策略建议', '保存前模拟证据校验', '既有策略修改上下文', '审计与治理扩展点'],
        featuresEn: ['Profit-opportunity detection and strategy suggestions', 'Simulation evidence checks before save', 'Existing-strategy edit context', 'Audit and governance extension points'],
      },
    ],
  },
  {
    slug: 'deepseek-appliance',
    name: 'DeepSeek V4-Flash 一体机',
    nameEn: 'DeepSeek V4-Flash Appliance',
    tagline: '开箱即用的企业 AI 平台',
    taglineEn: 'Enterprise AI platform, ready out-of-the-box.',
    description: '不只是推理硬件，更是一套开箱即用的企业 AI 应用平台。内置知识库、Data Agent 与自进化引擎，预置酒店分销、金融合规、法律审查等垂直场景模板。128GB 内存运行 284B 参数大模型，30 分钟完成首次部署，让 AI 在您的业务中真正落地。',
    descriptionEn: 'More than inference hardware — a complete enterprise AI application platform. Built-in knowledge base, Data Agent, and self-evolving engine with pre-built vertical templates for hotel distribution, finance compliance, and legal review. Run a 284B-parameter model on 128GB memory. Deploy in 30 minutes and start delivering value.',
    features: [
      { icon: 'Cpu', title: 'DS4 专用推理引擎', titleEn: 'DS4 dedicated inference engine', desc: 'Redis 创始人 antirez 专为 DeepSeek V4 Flash 设计。仅数千行 C 代码，极致精简，极致性能。', descEn: 'Designed by antirez (Redis creator) specifically for DeepSeek V4 Flash. Just thousands of lines of C code. Minimal. Fast.' },
      { icon: 'HardDrive', title: '2-bit 不对称量化', titleEn: '2-bit asymmetric quantization', desc: '仅对路由 MoE 专家层激进压缩，共享专家与注意力层保持 Q8 精度。284B 模型压缩至约 76GB。', descEn: 'Aggressive compression only on routed MoE expert layers. Shared experts and attention layers stay at Q8 precision. 284B model compressed to ~76GB.' },
      { icon: 'Zap', title: '多后端原生支持', titleEn: 'Multi-backend native support', desc: '原生支持 Metal（Apple Silicon）、CUDA（NVIDIA）和 ROCm（AMD）三大计算后端。', descEn: 'Native support for Metal (Apple Silicon), CUDA (NVIDIA), and ROCm (AMD) compute backends.' },
      { icon: 'Shield', title: '数据不出设备', titleEn: 'Data never leaves', desc: '私有化部署，满足金融、医疗、法律等行业的数据合规与隐私保护要求。', descEn: 'On-premise deployment satisfies data compliance requirements for finance, healthcare, and legal industries.' },
    ],
    valueProposition: '无需 AI 团队，无需模型调优。插电即用，30 分钟完成部署。内置知识库、Data Agent 和自进化引擎，让 AI 在您的业务中持续创造价值。',
    valuePropositionEn: 'No AI team needed. No model tuning required. Plug in and deploy in 30 minutes. Built-in knowledge base, Data Agent, and self-evolving engine that continuously delivers business value.',
    techHighlights: [
      '内置企业级 RAG 知识库：自动解析文档，部门级权限隔离',
      'Data Agent：自然语言查询业务数据，自动输出洞察报告',
      'Self-Evolving 引擎：持续学习业务反馈，越用越懂您的业务',
      '预置垂直场景模板：酒店分销、金融合规、法律审查，30 分钟部署',
    ],
    techHighlightsEn: [
      'Built-in enterprise RAG knowledge base: auto-parse documents with department-level isolation',
      'Data Agent: natural language business queries with auto-generated insight reports',
      'Self-Evolving engine: continuously learns from business feedback to improve accuracy',
      'Pre-built vertical templates: hotel distribution, finance compliance, legal review. Deploy in 30 min',
    ],
    integrationNotes: '提供标准 OpenAI-compatible API 接口。支持通过 HotelByte 平台统一管理和调度。',
    integrationNotesEn: 'Standard OpenAI-compatible API. Manage and schedule through the HotelByte platform.',
    competitorEdge: [
      '竞品仅提供推理硬件，DS4 内置知识库、Data Agent 等完整应用',
      '竞品需要专业 AI 团队调优，DS4 预置模板 30 分钟即开即用',
      '竞品软件功能固定，DS4 Self-Evolving 引擎持续学习您的业务',
    ],
    competitorEdgeEn: [
      'Competitors only provide inference hardware; DS4 includes built-in knowledge base and Data Agent',
      'Competitors require expert AI teams; DS4 has pre-built templates ready in 30 minutes',
      'Competitor software is static; DS4 Self-Evolving engine continuously learns your business',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
