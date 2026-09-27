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

export interface EvaluationRow {
  /** what the buyer should interrogate */
  check: string;
  /** what HotelByte does */
  ours: string;
  /** how the buyer proves it without trusting a slide */
  verify: string;
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
  evaluation?: EvaluationRow[];
  evaluationEn?: EvaluationRow[];
  tiers?: ProductTier[];
}

export const products: Product[] = [
  {
    slug: 'ai-automations',
    name: 'AI 原生自动化',
    nameEn: 'AI-Native Automations',
    tagline: '在权限边界内调查业务数据',
    taglineEn: 'Investigate business data within access boundaries',
    description: 'HotelByte 的 Data Agent 为已授权用户提供受治理的数据调查流程。可用数据源、脱敏效果和回答质量应使用真实权限与获批数据现场验证。',
    descriptionEn: 'HotelByte Data Agent offers a governed investigation workflow for authorized users. Verify available data sources, masking and answer quality with real permissions and approved data.',
    features: [
      { icon: 'Database', title: '数据调查', titleEn: 'Data investigation', desc: '针对已接入数据源提出问题，并检查实际查询结果。', descEn: 'Ask questions against connected data sources and inspect the underlying query results.' },
      { icon: 'ShieldAlert', title: '权限与脱敏', titleEn: 'Access and masking', desc: '使用受限账号检查权限边界和输出脱敏效果。', descEn: 'Use a restricted account to test access boundaries and masking in responses.' },
      { icon: 'Code2', title: '可核查的回答', titleEn: 'Reviewable answers', desc: '把智能体回答与源数据和审计记录对照。', descEn: 'Compare agent answers with source data and audit records.' },
    ],
    valueProposition: '让业务团队在已授权的数据范围内提出问题，并用原始结果验证回答。',
    valuePropositionEn: 'Let business teams ask questions within authorized data scope and verify answers against source results.',
    techHighlights: [
      'Data Agent 已注册的 MySQL 与 TDengine 读取工具',
      '查询与输出的权限及脱敏检查',
      '以来源和审计记录核查智能体回答',
    ],
    techHighlightsEn: [
      'Registered MySQL and TDengine read tools in Data Agent',
      'Access and response-masking checks',
      'Answer verification against sources and audit records',
    ],
    integrationNotes: '接入范围取决于已配置的数据源、角色权限和部署环境；请通过受限账号与获批样本验证。',
    integrationNotesEn: 'Available data depends on configured sources, role permissions and deployment. Validate with a restricted account and approved samples.',
    evaluation: [
      { check: '回答是否基于真实数据', ours: '使用受治理的数据调查流程，而不是将生成文字当作事实。', verify: '用已知答案的问题现场查询，核对源数据与回答。' },
      { check: '能访问哪些数据源', ours: '当前 Data Agent 注册了 MySQL 与 TDengine 读取工具；实际可用范围取决于配置。', verify: '逐个检查目标数据源的连接、权限与真实查询结果。' },
      { check: '敏感数据如何处理', ours: '权限和输出脱敏应按角色验证。', verify: '用受限账号请求敏感字段，检查响应与审计记录。' },
    ],
    evaluationEn: [
      { check: 'Are answers based on real data', ours: 'Use a governed investigation workflow rather than treating generated text as fact.', verify: 'Ask a question with a known answer and compare source data with the response.' },
      { check: 'Which data sources are available', ours: 'Data Agent registers MySQL and TDengine read tools; actual availability depends on configuration.', verify: 'Check each target connection, permission and live query result.' },
      { check: 'How is sensitive data handled', ours: 'Access and response masking should be validated by role.', verify: 'Ask for a sensitive field with a restricted account and inspect the response and audit record.' },
    ],
  },
  {
    slug: 'price-intelligence',
    name: 'Lookout 价格情报',
    nameEn: 'Lookout Price Intelligence',
    tagline: '洞悉市场，守护您的利润空间',
    taglineEn: 'Know the market. Protect your margins.',
    description: 'Lookout 提供工业级的高并发价格情报抓取、时序存储与自动化比价服务，专为大规模 B2B 酒店分销设计。支持按计划运行比价与价格监控；报价竞争力须结合实际供应覆盖和市场价格评估。',
    descriptionEn: 'Industrial-grade high-concurrency price intelligence crawling, time-series storage, and automated benchmarking. Purpose-built for large-scale B2B hotel distribution.',
    features: [
      { icon: 'LineChart', title: 'TDengine 时序事实存储', titleEn: 'TDengine time-series storage', desc: '可将供应商报价事实和执行上下文写入 TDengine，供历史价格和查询表现分析；时效应按数据规模验证。', descEn: 'Supplier rate facts and execution context can be stored in TDengine for historical analysis; validate query latency at your data scale.' },
      { icon: 'Zap', title: '高并发智能爬虫', titleEn: 'High-concurrency smart crawler', desc: '依托 HotelByte 底层的 HotelRates 接口引擎，Lookout 可并发处理多供应商、多客源国、多提前预订期的笛卡尔积式海量比价请求。', descEn: 'Leverage the HotelRates engine to concurrently process massive Cartesian-product comparison requests across suppliers, markets, and lead times.' },
      { icon: 'Clock', title: '全自动化监控闭环', titleEn: 'Fully automated monitoring loop', desc: '支持 pay_per_run 与 monthly_quota 订阅模式。通过分布式的 Cron Job 管理，实现无缝的任务调度、覆盖检查、Excel 报表生成及通知下发。', descEn: 'Pay-per-run and monthly-quota modes. Distributed cron job management for seamless scheduling, coverage checks, Excel reports, and alerts.' },
      { icon: 'ShieldCheck', title: '生产级速率熔断保护', titleEn: 'Production-grade rate limiting', desc: '严格的 API 限流策略，基于凭证预算和 learned limit，在面对上游供应商 429 报错时智能降级退让，保障系统整体稳定性。', descEn: 'Credential-budget-based rate limiting with learned limits. Graceful degradation on upstream 429s to protect system stability.' },
    ],
    valueProposition: '支持按计划运行比价与价格监控；报价竞争力须结合实际供应覆盖和市场价格评估。',
    valuePropositionEn: 'Schedule rate comparisons and monitor market changes; validate coverage and rate competitiveness against your own inventory.',
    techHighlights: [
      '基于 TDengine 的时序数据存储，支持按供应商、市场和日期分析历史报价',
      '分布式爬虫集群，并发能力须按供应商配额与实际环境验证',
      '智能速率限制学习与自适应退让算法',
      '多维度价格异常检测与预警',
    ],
    techHighlightsEn: [
      'TDengine time-series storage: time-series analysis of supplier rate facts',
      'Distributed crawler cluster: throughput validated against supplier budgets and deployment conditions',
      'Intelligent rate-limit learning with adaptive backoff',
      'Multi-dimensional price anomaly detection and alerting',
    ],
    integrationNotes: '可通过现有 API 与报表流程评估集成；具体导出格式和通知渠道应在目标环境验证。',
    integrationNotesEn: 'Evaluate integration through available APIs and reports; verify export formats and notification channels in the target environment.',
    evaluation: [
      {
        check: '抓的是公开价还是真实净价',
        ours: '净价事实存入 TDengine 时序库，按供应商 × 客源国 × 提前预订期做笛卡尔积式比价。',
        verify: '挑一批你自己的酒店和日期跑一次覆盖检查，核对覆盖率、报价新鲜度与延迟。',
      },
      {
        check: '上游限流时怎么处理',
        ours: '基于凭证预算的限流与 learned limit，遇到上游 429 智能退让，不把错误直接甩给下游。',
        verify: '把并发打到限流边界，看它是排队、降级还是直接报错。',
      },
      {
        check: '结果能不能直接用',
        ours: '可检查报表和通知流程；导出格式与渠道需现场确认。',
        verify: '要一份真实周期的报表样例，以及一次价格异常推送记录。',
      },
    ],
    evaluationEn: [
      {
        check: 'Public rates or real net rates',
        ours: 'Net-rate facts land in TDengine, and comparison runs across supplier × source market × lead time.',
        verify: 'Run a coverage check over your own hotels and dates and read coverage, rate freshness and latency.',
      },
      {
        check: 'What happens when upstream rate-limits',
        ours: 'Credential-budget limits with learned limits back off adaptively on upstream 429s instead of passing the error downstream.',
        verify: 'Push concurrency to the limit boundary and watch whether it queues, degrades or fails.',
      },
      {
        check: 'Are the outputs usable as-is',
        ours: 'Review the report and notification workflow; confirm supported formats and channels in a live demonstration.',
        verify: 'Ask for one real report from a completed cycle and one anomaly alert record.',
      },
    ],
  },
  {
    slug: 'b2b-distribution',
    name: '企业级分销底座',
    nameEn: 'Enterprise Distribution Base',
    tagline: '面向代理层级的分销架构',
    taglineEn: 'Built for hierarchical B2B distribution',
    description: '通过统一 API、供应商适配器与层级权限支持 B2B 分销。供应商可用性取决于凭证、配置与合作范围，适合用真实酒店和日期验证。',
    descriptionEn: 'A distribution platform with a unified API, supplier adapters and scoped agency access. Validate available supply using your credentials, markets and hotel list.',
    features: [
      { icon: 'Layers', title: '层级实体与权限范围', titleEn: 'Hierarchical entity access', desc: '平台、租户、客户和客户账号采用层级关系；通过实体范围和角色权限控制访问，具体边界应以账号测试验证。', descEn: 'Platform, tenant, customer and customer-account entities form a hierarchy with scoped access and role permissions. Test the exact boundaries with representative accounts.' },
      { icon: 'Network', title: '酒店供应商适配器', titleEn: 'Hotel supplier adapters', desc: 'HotelByte 提供 Dida、Tourmind、Yalago、Hotelbeds 等供应商适配器，通过统一接口处理搜索与预订；实际可用性取决于凭证和配置。', descEn: 'HotelByte provides adapters for Dida, Tourmind, Yalago, Hotelbeds and other suppliers. A unified interface handles search and booking; availability depends on credentials and configuration.' },
      { icon: 'BookOpen', title: '内容即服务 (CaaS)', titleEn: 'Content-as-a-Service (CaaS)', desc: '酒店与房型映射流程可连接供应商标识和自有目录；匹配质量应以目标酒店与房型样本核验。', descEn: 'Hotel and room mapping workflows connect supplier identifiers to your catalog; validate match quality with representative hotels and rooms.' },
      { icon: 'Key', title: '细粒度信用管理', titleEn: 'Granular credit management', desc: '按实体配置信用额度与授权，并结合代表性订单和账户核对冻结、扣减与余额记录。', descEn: 'Configure credit limits and authorization by entity; inspect freeze, deduction and balance records with representative orders and accounts.' },
    ],
    valueProposition: '统一 API 连接供应商适配器，层级实体和权限范围支持 B2B 代理业务；请用自身凭证验证覆盖。',
    valuePropositionEn: 'One API connects supplier adapters. Hierarchical entities and scoped permissions support B2B agency workflows; validate coverage with your credentials.',
    techHighlights: [
      '平台、租户、客户和客户账号层级及权限范围',
      '供应商适配器通过统一 API 处理上游差异',
      '酒店与房型映射流程，按样本核查结果',
      '多币种信用额度与权限范围配置',
    ],
    techHighlightsEn: [
      'Platform, tenant, customer and customer-account entity hierarchy',
      'Supplier adapters behind a unified API',
      'Hotel and room mapping validated with samples',
      'Multi-currency credit and scoped permissions',
    ],
    integrationNotes: '提供 API 文档；可根据实际供应商凭证与测试环境验证搜索、报价和预订流程。',
    integrationNotesEn: 'Review the API documentation, then validate search, rates and booking with your supplier credentials in an appropriate test environment.',
    evaluation: [
      {
        check: '多层级代理的权限边界如何执行',
        ours: '平台、租户、客户和客户账号采用层级实体；通过权限范围和 RBAC 控制访问，应用实际账号测试边界。',
        verify: '用下级账号尝试读上级数据、改上级额度。',
      },
      {
        check: '信用与结算能不能分层',
        ours: '可按实体查看信用授权、冻结和扣减记录；结算边界须用样例账单核对。',
        verify: '要一份分层账单样例，对账到具体的下级账号。',
      },
      {
        check: '中国与亚太供应是原生还是转售',
        ours: 'HotelByte 提供 Dida、Tourmind、Yalago、Hotelbeds 等适配器；实际接入范围和周期需按凭证、接口与测试结果评估。',
        verify: '用你的客源国跑一次真实 hotelList / hotelRates，核对覆盖率与净价，而不是看供应商 Logo 墙。',
      },
    ],
    evaluationEn: [
      {
        check: 'How are agency access boundaries enforced',
        ours: 'Platform, tenant, customer and customer-account entities form a hierarchy; scoped access and RBAC govern requests. Verify boundaries with real accounts.',
        verify: 'Use a downstream account to try reading upstream data and editing upstream credit.',
      },
      {
        check: 'Can credit and settlement be tiered',
        ours: 'Review authorization, freeze and deduction records by entity; confirm settlement boundaries with sample invoices.',
        verify: 'Ask for a tiered invoice sample and reconcile it down to a specific downstream account.',
      },
      {
        check: 'Native China and APAC supply, or resold',
        ours: 'HotelByte provides adapters for Dida, Tourmind, Yalago and Hotelbeds. Confirm live access and onboarding scope against credentials, API behavior and test results.',
        verify: 'Run a real hotelList / hotelRates query for your source markets and check coverage and net rates instead of a logo wall.',
      },
    ],
  },
  {
    slug: 'tracesight',
    name: 'TraceSight 追光',
    nameEn: 'TraceSight',
    tagline: '用会话上下文调查分销问题',
    taglineEn: 'Investigate distribution issues with session context',
    description: 'TraceSight 汇集会话级请求上下文，帮助团队调查搜索、预订与供应商交互。具体可见字段与保留期限应按部署和权限验证。',
    descriptionEn: 'TraceSight brings together session-level request context for investigating search, booking and supplier interactions. Validate visible fields and retention in your deployment and role scope.',
    features: [],
    valueProposition: '从一次真实请求出发，核对时间线、上游响应与权限范围内可见的证据。',
    valuePropositionEn: 'Start from a real request and review its timeline, upstream response and evidence available within your permissions.',
    techHighlights: [
      '会话标识关联请求与日志',
      '供应商交互与耗时上下文',
      '按角色查看可用诊断证据',
    ],
    techHighlightsEn: [
      'Session identifiers connect requests and logs',
      'Supplier interaction and latency context',
      'Role-scoped diagnostic evidence',
    ],
    integrationNotes: '请在实际部署中以 traceId 验证可见字段、原始报文访问、保留策略和诊断流程。',
    integrationNotesEn: 'Use a traceId in the target deployment to verify visible fields, raw-payload access, retention and investigation workflow.',
    evaluation: [
      { check: '能否还原一次请求', ours: '会话上下文可辅助追踪搜索与预订问题。', verify: '提供真实 traceId，检查时间线与各跳耗时。' },
      { check: '能否看到供应商原始返回', ours: '原始报文访问取决于部署配置与权限。', verify: '用有权限的账号查一条真实故障，并核对保留策略。' },
    ],
    evaluationEn: [
      { check: 'Can one request be reconstructed', ours: 'Session context can support search and booking investigations.', verify: 'Provide a real traceId and inspect the timeline and per-hop latency.' },
      { check: 'Is the supplier raw response visible', ours: 'Raw-payload access depends on deployment configuration and permissions.', verify: 'Inspect one real incident with an authorized account and check retention policy.' },
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
    name: '私有化 AI 部署评估',
    nameEn: 'Private AI Deployment Evaluation',
    tagline: '在目标环境验证模型、硬件与数据治理',
    taglineEn: 'Validate models, hardware and governance in your environment',
    description: '围绕酒店分销工作流评估私有化 AI 的模型、硬件、数据来源与访问控制。具体配置和交付条件须在目标环境中验证。',
    descriptionEn: 'Evaluate models, hardware, data sources and access controls for on-premises AI in hotel distribution. Validate configuration and delivery in the target environment.',
    features: [
      { icon: 'Cpu', title: '模型与硬件验证', titleEn: 'Model and hardware validation', desc: '在目标设备上测试模型加载、吞吐量、延迟和内存使用。', descEn: 'Test model loading, throughput, latency and memory use on the target device.' },
      { icon: 'Database', title: '业务数据测试', titleEn: 'Business data test', desc: '用获批的业务问题检查知识检索、权限和回答来源。', descEn: 'Use an approved business question to check retrieval, permissions and source attribution.' },
      { icon: 'Shield', title: '数据治理审查', titleEn: 'Data governance review', desc: '核查网络路径、审计记录和保留策略，并对照适用要求评估。', descEn: 'Review network paths, audit records and retention against applicable requirements.' },
    ],
    valueProposition: '以目标环境中的实测结果决定私有化 AI 方案，而非依赖未经验证的规格与效果承诺。',
    valuePropositionEn: 'Choose an on-premises AI approach using measured results in the target environment.',
    techHighlights: [
      '模型与目标硬件兼容性测试',
      '获批业务数据的检索与权限验证',
      '网络出站、日志和保留策略审查',
    ],
    techHighlightsEn: [
      'Model and target-hardware compatibility testing',
      'Retrieval and permission checks on approved business data',
      'Network egress, logging and retention review',
    ],
    integrationNotes: '部署周期与交付范围由模型、硬件和数据环境决定，须在书面方案中约定。',
    integrationNotesEn: 'Deployment timing and scope depend on the model, hardware and data environment and should be agreed in writing.',
    evaluation: [
      { check: '模型和硬件能否配合', ours: '按目标设备和模型制定验收测试。', verify: '记录加载、延迟、吞吐量与内存使用。' },
      { check: '能否回答实际业务问题', ours: '用获批数据验证检索、权限和回答来源。', verify: '现场提出一个真实问题并检查引用与访问边界。' },
      { check: '数据是否留在约定边界内', ours: '数据流向须在目标环境核验。', verify: '检查出站网络清单、审计记录和保留策略。' },
    ],
    evaluationEn: [
      { check: 'Do model and hardware work together', ours: 'Define acceptance tests for the target device and model.', verify: 'Record loading, latency, throughput and memory use.' },
      { check: 'Can it answer a real business question', ours: 'Validate retrieval, permissions and sources with approved data.', verify: 'Ask a real question live and inspect citations and access boundaries.' },
      { check: 'Does data stay within agreed boundaries', ours: 'Data flows must be verified in the target environment.', verify: 'Inspect outbound network paths, audit records and retention.' },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
