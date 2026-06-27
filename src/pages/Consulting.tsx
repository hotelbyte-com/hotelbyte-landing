import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  Brain,
  CheckCircle2,
  ChevronRight,
  Cloud,
  GitBranch,
  Gauge,
  LineChart,
  Network,
  Route as RouteIcon,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { HowItWorks } from '../components/HowItWorks';

type Detail = {
  eyebrow: string;
  title: string;
  summary: string;
  sections: Array<{ label: string; body: string }>;
};

// Unified consulting umbrella. Two tracks share one evidence-first methodology
// and one three-phase engagement, so buyers pick a question, not a vendor.
const tracks = [
  {
    id: 'ai-advisory',
    icon: Brain,
    badge: 'Track A',
    badgeZh: '方向 A',
    name: 'AI Advisory',
    nameZh: 'AI 顾问',
    formerly: 'formerly MarginLift',
    formerlyZh: '原 MarginLift',
    summary:
      'Find where AI can cut labor, save cost, and lift profit — then deliver agents, workflows, dashboards, and managed operations.',
    summaryZh:
      '找出能省人、降本、增利的 AI 机会,再交付智能体、流程、看板与托管运营。',
    pillars: [
      {
        icon: Brain,
        name: 'AI Cost Advisor',
        nameZh: 'AI 成本顾问',
        summary: 'Find avoidable labor, supplier, and workflow cost.',
        summaryZh: '找出可避免的人力、供应商和流程成本。',
        details: {
          approach:
            'Score AI opportunities by cost, margin, control risk, and implementation effort — starting from labor, outsourcing, supplier, and rework cost.',
          approachZh:
            '按成本、利润、风险和实施难度给 AI 机会排序——从人力、外包、供应商和返工成本切入。',
          experience:
            'Built from hotel distribution work across search, booking, cancellation, supplier, customer, pricing, finance, portal, and reporting flows.',
          experienceZh:
            '来自搜索、预订、取消、供应商、客户、价格、财务、门户和报表链路的分销经验。',
          capability:
            'Outputs savings lines, affected scope, pilot boundaries, and success metrics for ROI evaluation.',
          capabilityZh:
            '输出节省项、影响范围、试点边界和成功指标,便于评估投入产出。',
        },
      },
      {
        icon: Network,
        name: 'Workforce Automation Consultant',
        nameZh: '人力替代与提效顾问',
        summary: 'Decide what AI should replace, assist, or redesign.',
        summaryZh: '判断哪些工作该替代、辅助或重构。',
        details: {
          approach:
            'Trace repeated work in search, booking, amendment, cancellation, and exception handling, then decide what to automate, assist, or keep human.',
          approachZh:
            '追踪搜索、预订、改订、取消和异常处理里的重复工作,再决定自动化、辅助还是保留人工。',
          experience:
            'Service teams spend hours checking status, explaining failures, and re-entering decisions — exactly where AI summaries and next-action drafts pay off.',
          experienceZh:
            '客服/运营常在查状态、解释失败、重复录入判断上耗时——正是 AI 总结与下一步动作草稿发挥价值的地方。',
          capability:
            'Delivers candidates for AI summaries, next-action drafts, exception routing, and self-service answers with human review where risk is high.',
          capabilityZh:
            '输出 AI 总结、下一步动作草稿、异常路由和自助问答候选项,在高风险点保留人工复核。',
        },
      },
      {
        icon: GitBranch,
        name: 'AI Transformation Planner',
        nameZh: 'AI 转型路线顾问',
        summary: 'Turn evidence into ROI, owners, and a rollout sequence.',
        summaryZh: '把证据转成 ROI、负责人和落地顺序。',
        details: {
          approach:
            'Convert the approved business case into agents, workflow changes, dashboards, controls, and an operating handover with owners and rollout order.',
          approachZh:
            '把已确认的商业论证转成智能体、流程改造、看板、控制机制和运营交接,明确负责人与落地顺序。',
          experience:
            'Distribution automation cannot be free-form — pricing, routing, suppression, and service decisions need guardrails, triggers, and rollback.',
          experienceZh:
            '分销自动化不能自由发挥——价格、路由、屏蔽和服务决策都需要护栏、触发条件和回滚。',
          capability:
            'Turns consulting output into implementation work instead of a slide deck, with optional continuation into managed AI operations.',
          capabilityZh:
            '让咨询输出变成实施工作而非 PPT,并可选择延伸到托管 AI 运营。',
        },
      },
    ],
  },
  {
    id: 'technology-consulting',
    icon: Boxes,
    badge: 'Track B',
    badgeZh: '方向 B',
    name: 'Technology Consulting',
    nameZh: '技术咨询服务',
    formerly: 'AltexSoft-style',
    formerlyZh: '参考 AltexSoft',
    summary:
      'Enterprise architecture, performance engineering, and cloud migration — the system that runs the business, with or without AI.',
    summaryZh:
      '企业架构、性能工程与云迁移——承托业务的系统,无论有没有 AI 都要先做对。',
    pillars: [
      {
        icon: Boxes,
        name: 'Enterprise Architecture',
        nameZh: '企业架构咨询',
        summary: 'Eliminate bottlenecks. Design a system that scales with the business.',
        summaryZh: '消除瓶颈,设计能随业务扩张的系统。',
        details: {
          approach:
            'Map the distribution journey — search, quote, booking, amendment, cancellation, settlement — and mark where the architecture forces sequential work or cross-team coupling.',
          approachZh:
            '画出完整分销链路(搜索、报价、预订、改订、取消、结算),标记架构在哪里迫使串行或跨团队耦合。',
          experience:
            'HotelByte runs on a Platform → Tenant → Customer → Account entity model with a unified supplier-adapter layer. We bring that operating architecture to your review.',
          experienceZh:
            'HotelByte 运行在 Platform → Tenant → Customer → Account 实体模型之上,配统一供应商适配层。我们把这套运营架构带进你的评审。',
          capability:
            'A target-state architecture: service boundaries, data ownership, tool/platform choices, and a refactor sequence ranked by risk and return.',
          capabilityZh:
            '输出目标态架构:服务边界、数据归属、工具与平台选型,以及按风险与收益排序的重构顺序。',
        },
      },
      {
        icon: Gauge,
        name: 'Performance Improvements',
        nameZh: '性能优化咨询',
        summary: 'See where time and resources go, then fix what moves real metrics.',
        summaryZh: '看清时间与资源花在哪,再修真正影响指标的地方。',
        details: {
          approach:
            'Profile CPU, memory, network, and supplier fan-out hotspots with real samples — where the request budget is wasted on retries, serialization, or redundant fetches.',
          approachZh:
            '用真实样本分析 CPU、内存、网络和供应商扇出热点——找出请求预算被重试、序列化或冗余拉取浪费的地方。',
          experience:
            'We operate Lookout — 10,000+ QPS per node on TDengine time-series storage with credential-budget rate limiting and adaptive backoff. That playbook transfers directly.',
          experienceZh:
            '我们运营 Lookout——单机 10,000+ QPS、基于 TDengine 时序存储、按凭证预算限流并自适应退让。这套打法可直接迁移。',
          capability:
            'A prioritized performance backlog: bottleneck, expected gain, implementation cost, and the metric that proves it shipped.',
          capabilityZh:
            '按优先级排序的性能清单:瓶颈点、预期提升、实施成本,以及证明已落地的指标。',
        },
      },
      {
        icon: Cloud,
        name: 'Cloud Consulting',
        nameZh: '云迁移与架构咨询',
        summary: 'A safe migration path and the right provider services, not a leap of faith.',
        summaryZh: '一条安全的迁移路径与合适的云服务选型,而非孤注一掷。',
        details: {
          approach:
            'Decide what moves, what stays, what gets rebuilt — stateless first, stateful with parallel run, compliance-sensitive onto private or hybrid infrastructure.',
          approachZh:
            '决定什么迁移、保留、重建——无状态先行,有状态并行运行,合规敏感负载放到私有或混合架构。',
          experience:
            'We ship both a cloud-native platform and the DeepSeek V4-Flash on-prem appliance, so we advise where cloud services fit and where private infrastructure is cheaper and safer.',
          experienceZh:
            '我们既交付云原生平台,也交付 DeepSeek V4-Flash 私有化一体机,因此能建议云服务该用在哪、私有化在哪更便宜更安全。',
          capability:
            'A phased cloud roadmap with sandbox validation, cutover gates, rollback, cost modeling, and reliability controls that protect revenue traffic during migration.',
          capabilityZh:
            '分阶段上云路线图:沙箱验证、割接闸口、回滚、成本建模,以及迁移期间保障营收流量的可靠性控制。',
        },
      },
    ],
  },
];

const phases = [
  {
    label: 'Phase 1',
    labelZh: '阶段 1',
    name: 'Diagnose & Audit',
    nameZh: '诊断与审计',
    timeline: '2-4 weeks',
    timelineZh: '2-4 周',
    desc: 'Read the system and map the opportunities — with evidence, before any build.',
    descZh: '先读懂系统、摸清机会——带着证据,再谈建设。',
    ai: 'AI opportunity map with ROI evidence.',
    aiZh: '附 ROI 证据的 AI 机会地图。',
    tech: 'Architecture & performance audit with real samples.',
    techZh: '基于真实样本的架构与性能审计。',
    details: {
      approach:
        'For AI Advisory: interview operators, inspect approved samples, and score AI opportunities. For Technology Consulting: review code, data, and traffic and profile hot paths. Both end in an evidence-ranked findings report.',
      approachZh:
        'AI 顾问:访谈运营、检查授权样本、给 AI 机会排序。技术咨询:审阅代码、数据和流量,分析热点路径。两者都产出按证据排序的发现报告。',
      experience:
        'The diagnostic runs on your data — approved exports, operating samples, price evidence, configuration snapshots, code, and traffic. No platform migration required to start.',
      experienceZh:
        '诊断基于你的数据——授权导出、运营样本、价格证据、配置快照、代码与流量。无需先迁移平台。',
      capability:
        'A findings report ranked by impact and effort, with enough evidence to justify every recommendation.',
      capabilityZh:
        '按影响和难度排序的发现报告,每条建议都有足够证据支撑。',
    },
  },
  {
    label: 'Phase 2',
    labelZh: '阶段 2',
    name: 'Design & SOW',
    nameZh: '设计与方案',
    timeline: '1-3 weeks',
    timelineZh: '1-3 周',
    desc: 'Turn findings into a concrete plan sequenced by risk and return.',
    descZh: '把发现转成按风险与收益排序的具体计划。',
    ai: 'Agents, workflows, dashboards, controls.',
    aiZh: '智能体、流程、看板、控制机制。',
    tech: 'Target-state architecture and cloud roadmap.',
    techZh: '目标态架构与上云路线图。',
    details: {
      approach:
        'Convert findings into a concrete plan: AI Advisory produces an implementation SOW (agents, workflows, dashboards, controls); Technology Consulting produces a target-state architecture and phased rollout.',
      approachZh:
        '把发现转成具体计划:AI 顾问产出实施方案 SOW(智能体、流程、看板、控制机制);技术咨询产出目标态架构与分阶段落地。',
      experience:
        'Every item is implementation-shaped — scope, deliverables, acceptance criteria, data input, owner, control point, and rollback.',
      experienceZh:
        '每项都按实施形态组织——范围、交付物、验收标准、数据输入、负责人、控制点和回滚。',
      capability:
        'A plan sequenced by risk and return, with owners, gates, and metrics, ready to build.',
      capabilityZh:
        '按风险与收益排序的计划,含负责人、闸口和指标,可直接开工。',
    },
  },
  {
    label: 'Phase 3',
    labelZh: '阶段 3',
    name: 'Operate & Guide',
    nameZh: '运营与指导',
    timeline: 'Monthly / SOW',
    timelineZh: '按月 / SOW',
    desc: 'Run it, measure it, and hand the system to your team.',
    descZh: '运营、衡量,并把系统交接给你的团队。',
    ai: 'Managed AI operations with monthly reviews.',
    aiZh: '托管 AI 运营,按月复盘。',
    tech: 'Implementation guidance and team handover.',
    techZh: '实施指导与团队交接。',
    details: {
      approach:
        'AI Advisory runs managed operations — tune prompts and rules, monitor exceptions, keep savings tied to metrics. Technology Consulting pairs with your engineers on the highest-risk refactors and hands over runbooks.',
      approachZh:
        'AI 顾问做托管运营——优化提示词与规则、监控异常、把节省绑定到指标。技术咨询与你的工程师一起啃下最高风险的重构,并交接运维手册。',
      experience:
        'Designed for travel teams that need control, auditability, and human escalation. Your team owns the system afterward.',
      experienceZh:
        '面向需要可控、可审计、可升级人工判断的旅游分销团队。之后系统由你的团队掌控。',
      capability:
        'Turns consulting from a one-time report into an operating cadence with measurable cost, margin, and reliability movement.',
      capabilityZh:
        '把咨询从一次性报告变成持续运营节奏,持续衡量成本、利润与可靠性的变化。',
    },
  },
];

const credibilitySignals = [
  {
    icon: RouteIcon,
    metric: 'Distribution depth',
    label: 'We speak hotel distribution, not generic software',
    labelZh: '我们懂酒店分销,而非通用软件',
    proof: '27+ suppliers, 4-party ecosystem, search-to-finance flows.',
    proofZh: '27+ 供应商、四方生态、搜索到财务全链路。',
    details: {
      approach:
        'Reviews are grounded in real distribution work — rate shopping, booking orchestration, hotel/room mapping, markup, credit, reconciliation, and settlement.',
      approachZh:
        '评审扎根于真实分销工作:比价、预订编排、酒店/房型映射、加价、信用、对账与结算。',
      experience:
        'We optimize for the request that carries a booking and the supplier response that decides whether it confirms — not abstract throughput.',
      experienceZh:
        '我们优化的是真正承载订单的请求,以及决定订单能否确认的供应商响应——而非抽象吞吐。',
      capability:
        'Recommendations reference your real suppliers, real bottlenecks, and real revenue impact — not a benchmark deck.',
      capabilityZh:
        '建议基于你真实的供应商、真实瓶颈和真实营收影响,而非基准测试 PPT。',
    },
  },
  {
    icon: Sparkles,
    metric: 'AI-Native experience',
    label: 'Built AI-Native from day zero',
    labelZh: '从第零天就 AI-Native',
    proof: 'Model-agnostic LLM orchestration, federated query, self-evolving agents.',
    proofZh: '模型无关的 LLM 编排、联邦查询、自进化智能体。',
    details: {
      approach:
        'When we design architecture or an AI rollout, we design for LLM orchestration, multi-source federated query, and agent workloads from the start.',
      approachZh:
        '设计架构或 AI 落地时,从一开始就为 LLM 编排、多源联邦查询和智能体负载设计。',
      experience:
        'HotelByte runs model-agnostic orchestration (OpenAI / Anthropic protocol compatible, Day-0 open-source SOTA) and a federated query engine across MySQL, TDengine, Redis, MongoDB, and Elasticsearch.',
      experienceZh:
        'HotelByte 运行模型无关编排(OpenAI / Anthropic 协议兼容,Day-0 开源 SOTA),以及跨 MySQL、TDengine、Redis、MongoDB、Elasticsearch 的联邦查询引擎。',
      capability:
        'Your roadmap can include AI capabilities with realistic data, latency, and governance constraints — evaluated as engineering, not hype.',
      capabilityZh:
        '你的路线图可以纳入 AI 能力,并附现实的数据、延迟与治理约束——按工程而非炒作评估。',
    },
  },
  {
    icon: Gauge,
    metric: 'Performance track record',
    label: 'We run high-concurrency systems in production',
    labelZh: '我们在生产环境运营高并发系统',
    proof: '10,000+ QPS per node on TDengine time-series storage.',
    proofZh: '基于 TDengine 时序存储,单机 10,000+ QPS。',
    details: {
      approach:
        'Performance recommendations come from operating a price crawler that fans out across many suppliers, markets, and lead times under strict rate limits.',
      approachZh:
        '性能建议来自运营一个价格爬虫——在严格限流下跨多供应商、市场和提前预订期做扇出。',
      experience:
        'We own the rate-limit learning, adaptive backoff, time-series aggregation, and caching patterns that keep a distribution stack fast without burning supplier budgets.',
      experienceZh:
        '限流学习、自适应退让、时序聚合与缓存模式都是我们自己的——让分销系统快,又不烧光供应商预算。',
      capability:
        'Findings include the specific lever (caching, fan-out shape, store choice, backoff policy), the expected gain, and the guardrail.',
      capabilityZh:
        '结论包含具体杠杆(缓存、扇出形态、存储选型、退让策略)、预期收益和护栏。',
    },
  },
  {
    icon: ShieldCheck,
    metric: 'Hybrid & on-prem',
    label: 'Cloud, private, or hybrid — by workload',
    labelZh: '按负载选云、私有或混合',
    proof: 'Cloud-native platform + DeepSeek V4-Flash on-prem appliance.',
    proofZh: '云原生平台 + DeepSeek V4-Flash 私有化一体机。',
    details: {
      approach:
        'Workloads are placed by data-residency, cost, and latency needs — not a one-size-fits-all cloud mandate.',
      approachZh:
        '按数据驻留、成本和延迟需求放置负载,而非一刀切全上云。',
      experience:
        'For finance, legal, or healthcare-adjacent distribution we run the DeepSeek appliance on-prem so data never leaves; for elastic search traffic we run cloud-native.',
      experienceZh:
        '面向金融、法律或医疗相关分销,我们用 DeepSeek 一体机私有化运行,数据不出设备;面向弹性搜索流量,我们走云原生。',
      capability:
        'A placement rationale per workload, plus the migration and integration work to make hybrid real.',
      capabilityZh:
        '每个负载的放置依据,以及让混合架构真正落地的迁移与集成工作。',
    },
  },
];

export default function Consulting() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const pick = (zh: string, en: string) => (isEn ? en : zh);
  const [selectedDetail, setSelectedDetail] = useState<Detail | null>(null);
  const route = SITE_ROUTES.consulting;

  const faq = faqSchema(
    isEn
      ? [
          {
            q: 'What consulting does HotelByte offer?',
            a: 'One consulting engagement, two tracks. AI Advisory (formerly MarginLift) finds where AI cuts labor, cost, and lifts profit. Technology Consulting covers enterprise architecture, performance engineering, and cloud migration. Both run on the same evidence-first, three-phase methodology.',
          },
          {
            q: 'How do AI Advisory and Technology Consulting relate?',
            a: 'They answer different questions. AI Advisory asks where AI should replace or assist human work. Technology Consulting asks whether the architecture, performance, and cloud underneath are right. A CTO often wants both; a COO may start with AI Advisory. They share one engagement model and one team.',
          },
          {
            q: 'Do I have to migrate to the HotelByte platform?',
            a: 'No. The first phase runs on your own data — approved exports, operating samples, price evidence, configuration snapshots, code, and traffic. HotelByte modules are an option after ROI is proven, not a prerequisite.',
          },
          {
            q: 'How long does an engagement take?',
            a: 'Phase 1 (diagnose/audit) is typically 2-4 weeks, Phase 2 (design/SOW) 1-3 weeks, and Phase 3 (operate/guide) is monthly or scoped by SOW. Focused performance or AI-opportunity sprints can run faster.',
          },
        ]
      : [
          {
            q: 'HotelByte 提供哪些咨询服务?',
            a: '一次咨询,两个方向。AI 顾问(原 MarginLift)找出能省人、降本、增利的 AI 机会;技术咨询服务覆盖企业架构、性能工程与云迁移。两者共用同一套证据优先、三阶段方法论。',
          },
          {
            q: 'AI 顾问和技术咨询是什么关系?',
            a: '它们回答不同问题。AI 顾问问的是 AI 该在哪替代或辅助人工;技术咨询问的是底层的架构、性能与云是否到位。CTO 常常两者都要,COO 可能从 AI 顾问入手。两者共用一个 engagement 模型和一个团队。',
          },
          {
            q: '必须迁移到 HotelByte 平台吗?',
            a: '不要求。第一阶段基于你自己的数据运行——授权导出、运营样本、价格证据、配置快照、代码与流量。ROI 证明后,HotelByte 模块是一个选项,不是前置条件。',
          },
          {
            q: '一次咨询通常多长?',
            a: '阶段 1(诊断/审计)一般 2-4 周,阶段 2(设计/SOW)1-3 周,阶段 3(运营/指导)按月或按 SOW。聚焦的性能或 AI 机会冲刺可以更快。',
          },
        ]
  );

  const howTo = howToSchema(
    isEn ? 'Run HotelByte consulting in three evidence-bound phases' : 'HotelByte 咨询的三阶段证据闭环',
    isEn
      ? 'HotelByte consulting diagnoses, designs, and operates — three explicit phases shared by the AI Advisory and Technology Consulting tracks, protecting ROI before any platform commitment.'
      : 'HotelByte 咨询分诊断、设计、运营三阶段,为 AI 顾问与技术咨询两个方向共享,在任何平台承诺之前先保护 ROI。',
    isEn
      ? [
          { name: 'Diagnose and audit', text: 'A 2-4 week phase maps AI opportunities with ROI evidence and/or audits architecture and performance hotspots with real samples. No platform migration required to start.' },
          { name: 'Design and plan', text: 'Findings become an implementation SOW (agents, workflows, dashboards) and/or a target-state architecture with a phased rollout ranked by risk and return.' },
          { name: 'Operate and guide', text: 'Managed AI operations tune and track deployed workflows monthly; implementation guidance pairs on the highest-risk refactors and hands over runbooks so your team owns the system.' },
        ]
      : [
          { name: '诊断与审计', text: '2-4 周阶段:产出附 ROI 证据的 AI 机会地图,和/或基于真实样本的架构与性能审计。无需先迁移平台。' },
          { name: '设计与方案', text: '把发现转成实施方案 SOW(智能体、流程、看板)和/或目标态架构与按风险收益排序的分阶段落地。' },
          { name: '运营与指导', text: '托管 AI 运营按月优化并追踪已部署工作流;实施指导与工程师一起啃下最高风险重构并交接运维手册,之后系统由你的团队掌控。' },
        ]
  );

  const jsonLd = [
    serviceSchema({
      name: isEn ? 'HotelByte Consulting' : 'HotelByte 咨询服务',
      description: isEn ? route.description : route.descriptionZh,
      path: route.path,
      serviceType: isEn ? 'Consulting' : '咨询服务',
      locale: isEn ? 'en' : 'zh',
    }),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: isEn ? 'Services' : '服务', path: route.path },
      { name: isEn ? 'Consulting' : '咨询服务', path: route.path },
    ]),
    faq,
    howTo,
  ];

  const openDetail = (
    eyebrow: string,
    title: string,
    summary: string,
    details: { approach: string; experience: string; capability: string },
  ) => {
    setSelectedDetail({
      eyebrow,
      title,
      summary,
      sections: [
        { label: pick('业务依据', 'Business rationale'), body: details.approach },
        { label: pick('实践经验', 'Operating experience'), body: details.experience },
        { label: pick('交付方式', 'Delivery path'), body: details.capability },
      ],
    });
  };

  return (
    <div className="pt-12 pb-24 overflow-hidden">
      <Seo
        path={route.path}
        title={isEn ? route.title : route.titleZh}
        description={isEn ? route.description : route.descriptionZh}
        keywords={route.keywords}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)] pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-6">
              {pick('一次咨询 · 两个方向', 'One engagement · Two tracks')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.08] mb-8">
              {pick('咨询服务', 'Consulting')}<br />
              <span className="text-gradient">{pick('咨询服务', 'Services')}</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-6 font-light">
              {pick(
                '由打造 HotelByte 的工程团队交付:AI 顾问找赚钱机会,技术咨询把承托业务的系统做对。',
                'Delivered by the engineering team that built HotelByte: AI Advisory finds the money, Technology Consulting gets the system right.'
              )}
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              {pick(
                '两个方向共用一套证据优先、三阶段方法论——先证明,再落地。',
                'Both tracks share one evidence-first, three-phase methodology — prove first, then build.'
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:sales@hotelbyte.com?subject=HotelByte%20consulting%20briefing"
                className="px-7 py-4 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow hover:shadow-[0_0_32px_rgba(0,240,255,0.35)] transition-all duration-300 flex items-center gap-2"
              >
                {pick('预约咨询简报', 'Book a consulting briefing')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/products"
                className="px-7 py-4 rounded-full border border-white/15 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
              >
                {pick('查看产品矩阵', 'View product suite')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-br from-cyan-glow/10 via-electric-purple/10 to-transparent blur-3xl -z-10" />
            <div className="rounded-3xl border border-white/10 bg-black/45 backdrop-blur-md p-3 shadow-2xl">
              <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-5 mb-6">
                  <div>
                    <div className="text-sm font-semibold">{pick('咨询驾驶舱', 'Consulting Cockpit')}</div>
                    <div className="text-xs text-white/40 mt-1">{pick('两个方向 · 三阶段', 'TWO TRACKS · THREE PHASES')}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-glow">
                    <Sparkles className="w-4 h-4" />
                    {pick('证据驱动', 'Evidence-bound')}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {tracks.map((track, i) => {
                    const Icon = track.icon;
                    return (
                      <div key={track.id} className={`rounded-2xl border p-4 ${i % 2 ? 'border-electric-purple/30 bg-electric-purple/[0.05]' : 'border-cyan-glow/20 bg-cyan-glow/[0.04]'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            <Icon className={`w-4 h-4 ${i % 2 ? 'text-electric-purple' : 'text-cyan-glow'}`} />
                            {isEn ? track.name : track.nameZh}
                          </span>
                          <span className="text-[10px] font-mono text-white/40">{isEn ? track.badge : track.badgeZh}</span>
                        </div>
                        <div className="text-xs text-white/45">{isEn ? track.formerly : track.formerlyZh}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-cyan-glow/20 bg-cyan-glow/[0.035] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <LineChart className="w-5 h-5 text-cyan-glow" />
                    <span className="text-sm font-semibold text-cyan-glow">{pick('共享三阶段', 'Shared engagement')}</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      [pick('阶段 1', 'Phase 1'), pick('诊断 / 审计', 'Diagnose / Audit'), pick('2-4周', '2-4w')],
                      [pick('阶段 2', 'Phase 2'), pick('设计 / 方案', 'Design / SOW'), pick('1-3周', '1-3w')],
                      [pick('阶段 3', 'Phase 3'), pick('运营 / 指导', 'Operate / Guide'), pick('按月', 'Monthly')],
                    ].map(([p, name, t]) => (
                      <div key={p} className="grid grid-cols-[3.5rem_1fr_auto] gap-3 items-center text-xs rounded-xl border border-white/5 bg-black/20 p-3">
                        <span className="text-white/80 font-mono">{p}</span>
                        <span className="text-white/65">{name}</span>
                        <span className="text-cyan-glow">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    [pick('供应商', 'Suppliers'), '27+'],
                    [pick('试点周期', 'Sprint'), pick('2-4周', '2-4w')],
                    [pick('交付物', 'Output'), pick('方案+运营', 'SOW+Ops')],
                  ].map(([label, value]) => (
                    <div key={label as string} className="rounded-2xl border border-white/5 bg-white/[0.035] p-4 text-center">
                      <div className="text-xl font-display font-bold text-white">{value}</div>
                      <div className="text-xs text-white/40 mt-1">{label as string}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two tracks */}
      <section className="border-y border-white/5 bg-black/20 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-5">
              {pick('选你的问题,而不是选供应商', 'Pick your question, not your vendor')}
            </h2>
            <p className="text-white/60 leading-relaxed">
              {pick(
                'AI 顾问回答“该在哪用 AI 省人赚钱”,技术咨询回答“架构、性能、云是否到位”。两个方向,一套方法论,一个团队。',
                'AI Advisory answers where AI should cut labor and make money. Technology Consulting answers whether the architecture, performance, and cloud are right. Two tracks, one methodology, one team.'
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {tracks.map((track) => {
              const TrackIcon = track.icon;
              return (
                <div key={track.id} className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-glow/10 flex items-center justify-center">
                        <TrackIcon className="w-5 h-5 text-cyan-glow" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">{isEn ? track.name : track.nameZh}</div>
                        <div className="text-xs text-white/40">{isEn ? track.formerly : track.formerlyZh}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-white/40">{isEn ? track.badge : track.badgeZh}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{isEn ? track.summary : track.summaryZh}</p>
                  <div className="space-y-3">
                    {track.pillars.map((pillar) => {
                      const Icon = pillar.icon;
                      return (
                        <button
                          key={pillar.name}
                          type="button"
                          onClick={() =>
                            openDetail(
                              isEn ? track.name : track.nameZh,
                              isEn ? pillar.name : pillar.nameZh,
                              isEn ? pillar.summary : pillar.summaryZh,
                              {
                                approach: isEn ? pillar.details.approach : pillar.details.approachZh,
                                experience: isEn ? pillar.details.experience : pillar.details.experienceZh,
                                capability: isEn ? pillar.details.capability : pillar.details.capabilityZh,
                              },
                            )
                          }
                          className="group w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.04] transition-colors flex items-center gap-3"
                        >
                          <Icon className="w-5 h-5 text-cyan-glow shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-sm">{isEn ? pillar.name : pillar.nameZh}</div>
                            <div className="text-xs text-white/50 leading-relaxed mt-0.5">{isEn ? pillar.summary : pillar.summaryZh}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-cyan-glow transition-colors shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shared engagement phases */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            {pick('共享的三阶段 engagement', 'One engagement, three phases')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {pick(
              '两个方向都走诊断、设计、运营——只是每阶段的产物不同。',
              'Both tracks diagnose, design, and operate — each phase just produces different artifacts.'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((phase, idx) => (
            <button
              key={phase.name}
              type="button"
              onClick={() =>
                openDetail(
                  isEn ? phase.label : phase.labelZh,
                  isEn ? phase.name : phase.nameZh,
                  isEn ? phase.desc : phase.descZh,
                  {
                    approach: isEn ? phase.details.approach : phase.details.approachZh,
                    experience: isEn ? phase.details.experience : phase.details.experienceZh,
                    capability: isEn ? phase.details.capability : phase.details.capabilityZh,
                  },
                )
              }
              className={`group text-left rounded-3xl border p-7 bg-white/[0.025] hover:bg-cyan-glow/[0.04] hover:border-cyan-glow/40 transition-colors ${
                idx === 0 ? 'border-cyan-glow/40' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-7">
                <span className={`text-xs font-mono ${idx === 0 ? 'text-cyan-glow' : 'text-white/40'}`}>
                  {isEn ? phase.label : phase.labelZh}
                </span>
                <span className="text-xs rounded-full border border-white/10 px-3 py-1 text-white/60">
                  {isEn ? phase.timeline : phase.timelineZh}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{isEn ? phase.name : phase.nameZh}</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-white/55">
                  <span className="text-electric-purple font-mono shrink-0">A</span>
                  <span>{isEn ? phase.ai : phase.aiZh}</span>
                </div>
                <div className="flex items-start gap-2 text-white/55">
                  <span className="text-cyan-glow font-mono shrink-0">B</span>
                  <span>{isEn ? phase.tech : phase.techZh}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-glow">
                {pick('看交付细节', 'View delivery detail')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Why HotelByte */}
      <section className="border-y border-white/5 bg-black/20 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              {pick('为什么找我们做咨询', 'Why HotelByte for consulting')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {pick(
                '可信的咨询需要分销深度、生产经验和交付能力——而不是一份 PPT。',
                'Credible consulting needs distribution depth, production experience, and the ability to deliver — not a slide deck.'
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {credibilitySignals.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.metric}
                  type="button"
                  onClick={() =>
                    openDetail(
                      item.metric,
                      isEn ? item.label : item.labelZh,
                      isEn ? item.proof : item.proofZh,
                      {
                        approach: isEn ? item.details.approach : item.details.approachZh,
                        experience: isEn ? item.details.experience : item.details.experienceZh,
                        capability: isEn ? item.details.capability : item.details.capabilityZh,
                      },
                    )
                  }
                  className="group text-left rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.04] transition-colors h-full flex flex-col"
                >
                  <Icon className="w-6 h-6 text-cyan-glow mb-4" />
                  <div className="text-base font-display font-bold text-white mb-2">{item.metric}</div>
                  <h3 className="font-bold mb-3 text-sm">{isEn ? item.label : item.labelZh}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{isEn ? item.proof : item.proofZh}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-cyan-glow">
                    {pick('查看详情', 'View details')}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-14 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8 lg:p-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold mb-4">
                {pick('先落地建议,再谈平台', 'Land the advice before any platform pitch')}
              </h2>
              <p className="text-white/60 leading-relaxed">
                {pick(
                  '每条建议都说清楚:动什么、为什么、能拿到什么收益、如何验收。',
                  'Every recommendation states what to change, why, the gain it delivers, and how it is accepted.'
                )}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: pick('可衡量的收益', 'Measurable gain'), summary: pick('把建议转成可计算的成本、效率、延迟或利润指标。', 'Turn advice into measurable cost, efficiency, latency, or margin metrics.'), details: { approach: pick('从热点路径、人工成本和供应商差异开始,识别最可能带来确定收益的改造。', 'Start from hot paths, labor cost, and supplier gaps to find changes most likely to pay off.'), experience: pick('分销的收益通常分散在运营、商业、供应商和财务之间,需要放在同一张账里看。', 'Distribution gains are spread across operations, commercial, suppliers, and finance — one view.'), capability: pick('输出影响范围、试点边界、成功指标和投入产出。', 'Outputs affected scope, pilot boundaries, success metrics, and ROI.'), }, },
                { title: pick('低风险试点先行', 'Low-risk pilot first'), summary: pick('让团队先看到小范围、可控、可回滚的结果。', 'Let the team see a controlled, reversible win first.'), details: { approach: pick('选低风险高频项做先行试点:报表、对账、异常、缓存、限流退让。', 'Pick low-risk, high-frequency items: reports, reconciliation, exceptions, caching, rate-limit backoff.'), experience: pick('分销团队最怕影响订单与营收,所以试点必须带沙箱、并行运行和回滚。', 'Distribution teams fear order and revenue impact, so pilots need sandbox, parallel run, and rollback.'), capability: pick('把“可以试试”变成可展示、可复盘、可扩展的试点结果。', 'Turns a promising idea into pilot results that can be demonstrated, reviewed, and expanded.'), }, },
                { title: pick('清晰的落地路径', 'Clear implementation path'), summary: pick('把咨询结论变成可执行的下一步。', 'Turn consulting output into an executable next step.'), details: { approach: pick('每条建议落到范围、交付物、验收标准、负责人和扩展路径。', 'Every recommendation maps to scope, deliverables, acceptance criteria, owner, and expansion path.'), experience: pick('咨询不能停在报告,必须能转成低风险、可验收、可复盘的落地工作。', 'Consulting should not stop at a report; it should become low-risk, testable, reviewable implementation work.'), capability: pick('从诊断延伸到方案、实施指导和托管运营。', 'Extends diagnosis into design, implementation guidance, and managed operations.'), }, },
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => openDetail(pick('落地结果', 'Operating outcome'), item.title, item.summary, item.details)}
                  className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.04] transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-glow mb-3" />
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{item.summary}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks
        title={isEn ? 'How the engagement runs' : '咨询如何运行'}
        subtitle={isEn
          ? 'Diagnose, design, and operate — three evidence-bound phases shared by both tracks, protecting ROI before any platform commitment.'
          : '诊断、设计、运营,三个证据闭环阶段,两个方向共享,在任何平台承诺之前先保护 ROI。'}
        steps={isEn
          ? [
              { name: 'Diagnose and audit', text: 'A 2-4 week phase maps AI opportunities with ROI evidence and/or audits architecture and performance hotspots with real samples. No platform migration required to start.' },
              { name: 'Design and plan', text: 'Findings become an implementation SOW (agents, workflows, dashboards) and/or a target-state architecture with a phased rollout ranked by risk and return.' },
              { name: 'Operate and guide', text: 'Managed AI operations tune and track deployed workflows monthly; implementation guidance pairs on the highest-risk refactors and hands over runbooks so your team owns the system.' },
            ]
          : [
              { name: '诊断与审计', text: '2-4 周阶段:产出附 ROI 证据的 AI 机会地图,和/或基于真实样本的架构与性能审计。无需先迁移平台。' },
              { name: '设计与方案', text: '把发现转成实施方案 SOW(智能体、流程、看板)和/或目标态架构与按风险收益排序的分阶段落地。' },
              { name: '运营与指导', text: '托管 AI 运营按月优化并追踪已部署工作流;实施指导与工程师一起啃下最高风险重构并交接运维手册,之后系统由你的团队掌控。' },
            ]}
      />

      {/* CTA */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-glow/[0.04] p-8 lg:p-12">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5 text-cyan-glow">
                <Workflow className="w-6 h-6" />
                <span className="text-sm font-semibold">{pick('证据优先', 'Evidence-first consulting')}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-5">
                {pick('AI 找钱,技术兜底——一次搞定', 'AI finds the money. Tech keeps it running. One team.')}
              </h2>
              <p className="text-white/60 leading-relaxed max-w-3xl">
                {pick(
                  '无论从哪个方向开始,都用同一套证据优先的方法论:先证明,再落地,每一步可审计。',
                  'Whichever track you start from, the methodology is the same: prove first, then build, with every step auditable.'
                )}
              </p>
            </div>
            <a
              href="mailto:sales@hotelbyte.com?subject=HotelByte%20consulting%20briefing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-abyss-blue font-bold hover:bg-cyan-glow transition-colors"
            >
              <Server className="w-5 h-5" />
              {pick('启动咨询', 'Start consulting')}
            </a>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {selectedDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm px-4 py-6 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consulting-detail-title"
          onClick={() => setSelectedDetail(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-2xl rounded-3xl border border-white/15 bg-[#111827] p-6 sm:p-8 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <div className="text-xs font-mono text-cyan-glow mb-3">{selectedDetail.eyebrow}</div>
                <h3 id="consulting-detail-title" className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {selectedDetail.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={pick('关闭详情', 'Close details')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-white/75 leading-relaxed mb-6">{selectedDetail.summary}</p>

            <div className="grid gap-3">
              {selectedDetail.sections.map((section) => (
                <div key={section.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-sm font-semibold text-cyan-glow mb-2">{section.label}</div>
                  <p className="text-sm text-white/75 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
