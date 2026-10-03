export interface Capability {
  id: string;
  name: string;
  nameEn: string;
  hotelbyte: string;
  hotelbyteEn: string;
  ask: string[];
  askEn: string[];
  verify: string;
  verifyEn: string;
}

export interface VerificationStep {
  action: string;
  actionEn: string;
  why: string;
  whyEn: string;
}

/**
 * Evaluation dimensions for buyers choosing a hotel distribution base.
 * Deliberately vendor-neutral: no vendor is named, every row pairs what we
 * provide with the question to ask any supplier and how to check the answer.
 */
export const capabilityMatrix: Capability[] = [
  {
    id: 'coverage',
    name: '供应覆盖与获取能力',
    nameEn: 'Supply coverage and access',
    hotelbyte: 'HotelByte 提供 Dida、Tourmind、Yalago、Hotelbeds 等供应商适配器。实际供应覆盖与可用报价取决于凭证、合同、市场和查询条件，应使用目标酒店实测。',
    hotelbyteEn: 'HotelByte provides adapters for Dida, Tourmind, Yalago and Hotelbeds. Actual coverage and available rates depend on credentials, contracts, markets and query conditions; test with your target hotels.',
    ask: [
      '预集成供应商里，有多少真正覆盖我的客源国？',
      '中国与亚太供应商是原生适配，还是转售别家的库存？',
      '净价还是展示价？加价规则在哪一层生效？',
    ],
    askEn: [
      'Of the pre-integrated suppliers, how many actually cover my source markets?',
      'Are China and APAC suppliers natively adapted, or resold through another bedbank?',
      'Net rates or display rates? At which layer does markup apply?',
    ],
    verify: '要一份审计级供应商清单，然后用你的目标客源国跑一次真实 hotelList / hotelRates，核对覆盖率与报价新鲜度。',
    verifyEn: 'Ask for an auditable supplier list, then run a real hotelList / hotelRates query for your own source markets and check coverage and rate freshness.',
  },
  {
    id: 'integration',
    name: '接入、交付与 API 稳定性',
    nameEn: 'Integration, delivery and API stability',
    hotelbyte: '统一 API 处理供应商接口差异；新供应商接入周期取决于接口、凭证和验收范围。开发文档提供接口说明，限流行为应针对目标供应商实测。',
    hotelbyteEn: 'A unified API handles supplier differences. Onboarding time depends on the partner API, credentials and acceptance scope. Review the API documentation and test rate-limit behavior for your target suppliers.',
    ask: [
      '接入一家新供应商的标准周期是多少？',
      '有没有沙箱、并发压测报告和错误码规范？',
      '上游超时或 429 时，是排队、降级还是直接报错？',
    ],
    askEn: [
      'What is the standard cycle to onboard a new supplier?',
      'Is there a sandbox, concurrency benchmark and error-code spec?',
      'On upstream timeout or 429, does it queue, degrade, or fail the call?',
    ],
    verify: '在沙箱按你的峰值 QPS 压一轮，看延迟分位与错误率；再故意触发一次限流，观察退让行为是否可控。',
    verifyEn: 'Run your peak QPS against the sandbox and read the latency percentiles and error rate; deliberately trip a rate limit and watch whether backoff stays controlled.',
  },
  {
    id: 'b2b',
    name: '白标与 B2B 实体、信用架构',
    nameEn: 'White label, B2B entity and credit architecture',
    hotelbyte: '平台、租户、客户和客户账号形成层级关系，通过实体范围和 RBAC 约束访问；具体信用和结算边界应以代表性账号及交易记录验证。',
    hotelbyteEn: 'Platform, tenant, customer and customer-account entities form a hierarchy with scoped access and RBAC. Verify credit and settlement boundaries with representative accounts and transaction records.',
    ask: [
      '多层级代理是物理隔离还是查询过滤？',
      '信用额度能按层级独立授权与冻结吗？',
      '账单能否分层出账、对账到每个下级账号？',
    ],
    askEn: [
      'Is the multi-tier agency model physically isolated or filtered at query time?',
      'Can credit be authorized and frozen independently per tier?',
      'Can billing be issued and reconciled per downstream account?',
    ],
    verify: '要一个白标演示环境，用下级账号尝试读上级数据、修改上级额度；再要一份真实分层账单样例对账。',
    verifyEn: 'Ask for a white-label demo, then use a downstream account to try reading upstream data or editing upstream credit; also reconcile a real tiered invoice sample.',
  },
  {
    id: 'observability',
    name: '全链路可观测与故障诊断',
    nameEn: 'Full-linkage observability and diagnostics',
    hotelbyte: '会话级上下文有助于关联搜索、预订和供应商交互；可见报文、耗时与保留期限取决于部署配置和账号权限。',
    hotelbyteEn: 'Session context helps correlate search, booking and supplier interactions. Visible payloads, latency and retention depend on deployment configuration and account permissions.',
    ask: [
      '出问题时，能不能看到「这一次请求」的完整链路？',
      '供应商的原始返回能不能看到，还是只有自己这层的日志？',
      '日志与报文保留多久？能不能按 traceId 直接取？',
    ],
    askEn: [
      'When something breaks, can I see the full chain for that one request?',
      'Can I read the supplier raw response, or only my own layer logs?',
      'How long are logs and payloads retained, and are they addressable by traceId?',
    ],
    verify: '给一个真实 logId / traceId，让对方当场还原故障全过程的时间线，包括供应商侧返回与耗时。',
    verifyEn: 'Hand over a real logId / traceId and ask them to reconstruct the incident timeline on the spot, supplier response and latency included.',
  },
  {
    id: 'intelligence',
    name: '价格情报与收益策略',
    nameEn: 'Price intelligence and revenue strategy',
    hotelbyte: 'Lookout 做净价监控：TDengine 时序存储承载海量询价事实，分布式抓取支持高并发比价，命中限流时智能降级。RevenuePilot 把收益策略做成「草稿 → 发布前模拟 → 服务端证据 → 受控保存」的链路。',
    hotelbyteEn: 'Lookout monitors net rates: TDengine time-series storage holds the query facts, distributed crawling handles high-concurrency comparison, and rate-limit hits degrade gracefully. RevenuePilot turns strategy into draft → pre-publish simulation → server-issued evidence → governed save.',
    ask: [
      '比价抓的是公开价还是真实净价？多久更新一次？',
      '策略上线前能不能模拟影响，模拟结果谁签发？',
      '谁有权改价？变更有没有审计与回滚？',
    ],
    askEn: [
      'Does comparison capture public rates or real net rates, and how fresh are they?',
      'Can a strategy be simulated before publishing, and who issues the simulation result?',
      'Who can change pricing, and is every change audited and reversible?',
    ],
    verify: '挑一批酒店和日期跑一次覆盖检查，看覆盖率、延迟与更新频率；再要一份策略模拟的服务端证据样例。',
    verifyEn: 'Run a coverage check over a batch of hotels and dates and read coverage, latency and refresh cadence; then ask for one sample of server-issued simulation evidence.',
  },
];

export const verificationSteps: VerificationStep[] = [
  {
    action: '拿一个能写入的沙箱账号',
    actionEn: 'Get a sandbox account you can actually write to',
    why: '只读 demo 看不出配额、限流与错误处理。用你自己的账号跑通一次 checkAvail 与 book。',
    whyEn: 'Read-only demos hide quotas, rate limits and error handling. Run one checkAvail and one book on your own credentials.',
  },
  {
    action: '用你目标客源国跑真实比价',
    actionEn: 'Run real rate queries for your own source markets',
    why: '覆盖率、报价新鲜度和净价水平是分销生意的地基，演示数据说明不了问题。',
    whyEn: 'Coverage, rate freshness and net price levels are the foundation of the business; demo data proves nothing.',
  },
  {
    action: '要一个真实 traceId 现场回放',
    actionEn: 'Ask them to replay one real traceId',
    why: '诊断能力只能在真实故障上讲清楚——供应商原始返回、每跳耗时、根因判断。',
    whyEn: 'Diagnostics can only be demonstrated on a real incident: supplier raw response, per-hop latency, root-cause reasoning.',
  },
  {
    action: '做一次越权测试',
    actionEn: 'Attempt one cross-tenant access',
    why: '多层级代理体系是不是真隔离，用下级账号试读上级数据最快见分晓。',
    whyEn: 'Whether the agency hierarchy is truly isolated shows fastest when a downstream account tries to read upstream data.',
  },
  {
    action: '要一份分层账单与结算样例',
    actionEn: 'Ask for a tiered invoice and settlement sample',
    why: '信用额度、冻结、扣款与对账是分销财务的核心，样例比 PPT 可信。',
    whyEn: 'Credit, freeze, deduction and reconciliation are the financial core of distribution; a sample beats a slide.',
  },
  {
    action: '把 SLA 与限流条款要到纸面上',
    actionEn: 'Put the SLA and rate-limit terms on paper',
    why: '限流阈值、超时降级承诺和赔偿口径不写进合同，出事时只能各说各话。',
    whyEn: 'If rate-limit thresholds, degradation commitments and remedies are not in the contract, incidents become a matter of opinion.',
  },
];
