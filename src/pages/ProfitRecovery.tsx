import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  LineChart,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import { HowItWorks } from '../components/HowItWorks';

type Detail = {
  eyebrow: string;
  title: string;
  summary: string;
  sections: Array<{
    label: string;
    body: string;
  }>;
};

const phases = [
  {
    label: 'Phase 1',
    labelZh: '阶段 1',
    name: 'AI Advisory Sprint',
    nameZh: 'AI 咨询诊断冲刺',
    price: 'USD 25,000',
    priceZh: '25,000 美元',
    desc: '2-4 weeks. Find AI savings, profit moves, and ROI.',
    descZh: '2-4 周。找出降本、增利机会和投入产出依据。',
    details: {
      approach: 'Interview operators, inspect approved samples, and score AI opportunities by cost, margin, control risk, and implementation effort.',
      approachZh: '访谈运营团队，检查授权样本，按成本、利润、风险和实施难度给 AI 机会排序。',
      experience: 'Built from hotel distribution work across search, booking, cancellation, supplier, customer, pricing, finance, portal, and reporting flows.',
      experienceZh: '来自搜索、预订、取消、供应商、客户、价格、财务、门户和报表链路的分销经验。',
      capability: 'Produces an executive-ready business case: what to replace, what to automate, what to keep human, and what to build next.',
      capabilityZh: '输出管理层可决策商业论证：替代什么、自动化什么、保留什么人工、下一步做什么。',
    },
  },
  {
    label: 'Phase 2',
    labelZh: '阶段 2',
    name: 'Implementation SOW',
    nameZh: '实施方案交付',
    price: 'SOW',
    priceZh: '按范围报价',
    desc: 'Build agents, workflows, dashboards, and controls.',
    descZh: '交付智能体、流程、看板和控制机制。',
    details: {
      approach: 'Convert the approved business case into agents, workflow changes, dashboards, controls, and operating handover.',
      approachZh: '把已确认的商业论证转成智能体、流程改造、看板、控制机制和运营交接。',
      experience: 'Delivery experience covers supplier action, pricing control, exception handling, workflow automation, and executive visibility.',
      experienceZh: '交付经验覆盖供应商动作、价格控制、异常处理、流程自动化和管理层可视化。',
      capability: 'Keeps the work implementation-shaped: acceptance criteria, owner, data input, control point, and measurable impact.',
      capabilityZh: '把工作做成可实施形态：验收标准、负责人、数据输入、控制点和可衡量效果。',
    },
  },
  {
    label: 'Phase 3',
    labelZh: '阶段 3',
    name: 'Managed AI Operations',
    nameZh: '托管 AI 运营',
    price: 'Monthly',
    priceZh: '按月服务',
    desc: 'Operate, measure, improve, and report impact.',
    descZh: '持续运营、衡量、优化并复盘价值。',
    details: {
      approach: 'Run monthly reviews, tune prompts and rules, monitor exceptions, and keep savings tied to operating metrics.',
      approachZh: '做月度复盘，优化提示词和规则，监控异常，并把节省结果绑定到运营指标。',
      experience: 'Managed operation is designed for travel teams that need control, auditability, and human escalation.',
      experienceZh: '托管运营面向需要可控、可审计、可升级人工判断的旅游分销团队。',
      capability: 'Turns AI from a one-time consulting report into an operating cadence with measurable cost and margin movement.',
      capabilityZh: '把 AI 从一次性咨询报告变成持续运营节奏，持续衡量成本和利润变化。',
    },
  },
];

const proofRows = [
  {
    signal: 'Labor',
    signalZh: '人力',
    issue: 'Reports, follow-up, triage',
    issueZh: '报表、跟进、异常分拣',
    impact: '- hours',
    impactZh: '省工时',
  },
  {
    signal: 'Ops',
    signalZh: '运营',
    issue: 'Repeat checks and handoffs',
    issueZh: '重复检查与交接等待',
    impact: '- cost',
    impactZh: '降成本',
  },
  {
    signal: 'Supplier',
    signalZh: '供应商',
    issue: 'Price gaps and slow response',
    issueZh: '价差与响应慢',
    impact: '+ margin',
    impactZh: '提利润',
  },
  {
    signal: 'Workflow',
    signalZh: '流程',
    issue: 'AI drafts next actions',
    issueZh: 'AI 草拟下一步动作',
    impact: '+ speed',
    impactZh: '提速度',
  },
];

const credibilitySignals = [
  {
    metric: 'End-to-end',
    label: 'Operating depth',
    labelZh: '运营纵深',
    proof: 'Search to finance, not generic AI advice.',
    proofZh: '从搜索到财务，不是泛 AI 课程。',
    details: {
      approach: 'Map the full distribution journey, then mark where work is manual, repeated, risky, or already ready for automation.',
      approachZh: '先画完整分销链路，再标记哪里依赖人工、哪里重复、哪里有风险、哪里已经适合自动化。',
      experience: 'Search, quote, booking, cancellation, supplier, customer, finance, portal, API, and reporting are treated as one operating system.',
      experienceZh: '把搜索、报价、预订、取消、供应商、客户、财务、门户、API 和报表当成一个运营系统看。',
      capability: 'This lets us find AI opportunities that improve real work, not isolated demo tasks.',
      capabilityZh: '因此能找到改善真实业务的 AI 机会，而不是孤立演示案例。',
    },
  },
  {
    metric: 'Price',
    label: 'Commercial evidence',
    labelZh: '商业证据',
    proof: 'Turn price gaps into supplier action.',
    proofZh: '把价格差异转成供应商动作。',
    details: {
      approach: 'Compare price evidence, response patterns, and conversion impact before recommending negotiation or routing changes.',
      approachZh: '先比较价格证据、响应模式和转化影响，再建议谈判或路由调整。',
      experience: 'Pricing work is evaluated as commercial leverage: supplier gap, customer impact, operational cost, and margin upside.',
      experienceZh: '价格工作按商业杠杆评估：供应商差异、客户影响、运营成本和利润空间。',
      capability: 'AI helps cluster anomalies and draft actions; advisors decide priority and negotiation posture.',
      capabilityZh: 'AI 负责聚类异常和草拟动作，顾问负责优先级和谈判姿态。',
    },
  },
  {
    metric: 'Ops',
    label: 'Operational intelligence',
    labelZh: '运营诊断能力',
    proof: 'Expose wasted manual work and repeat failures.',
    proofZh: '暴露人工浪费和重复失败。',
    details: {
      approach: 'Find where teams chase status, repeat checks, investigate exceptions, or manually explain failures.',
      approachZh: '找出团队在哪里追状态、重复检查、排查异常、人工解释失败。',
      experience: 'Operational diagnosis covers supplier behavior, booking outcomes, cancellation friction, pricing mismatch, and service handoff.',
      experienceZh: '运营诊断覆盖供应商行为、预订结果、取消摩擦、价格不一致和服务交接。',
      capability: 'Turns hidden workload into candidates for agents, alerts, summaries, and self-service answers.',
      capabilityZh: '把隐藏工作量转成智能体、提醒、总结和自助问答候选项。',
    },
  },
  {
    metric: 'Control',
    label: 'Automation controls',
    labelZh: '自动化控制',
    proof: 'Make advisory decisions executable.',
    proofZh: '让顾问建议变成可执行动作。',
    details: {
      approach: 'Every recommendation is paired with control design: trigger, data source, owner, approval path, rollback, and metric.',
      approachZh: '每个建议都配控制设计：触发条件、数据源、负责人、审批路径、回滚和指标。',
      experience: 'Automation in distribution cannot be free-form; pricing, routing, suppression, and service decisions need guardrails.',
      experienceZh: '分销自动化不能自由发挥；价格、路由、屏蔽和服务决策都需要护栏。',
      capability: 'This is how the consulting output becomes implementation work instead of a slide deck.',
      capabilityZh: '这让咨询输出变成实施工作，而不是一份 PPT。',
    },
  },
];

const advisoryWorkstreams = [
  {
    title: 'Search, booking & cancellation operations',
    titleZh: '搜索、预订与取消运营',
    modules: 'Operations advisory',
    modulesZh: '运营咨询',
    desc: 'Remove repetitive service work.',
    descZh: '移除重复客服/运营工作。',
    details: {
      approach: 'Trace repeated work in search, booking, amendment, cancellation, and exception handling.',
      approachZh: '追踪搜索、预订、改订、取消和异常处理里的重复工作。',
      experience: 'These flows are where service teams often spend time checking status, explaining failures, and re-entering decisions.',
      experienceZh: '这些链路通常消耗客服/运营大量时间：查状态、解释失败、重复录入判断。',
      capability: 'Deliver candidates for AI summaries, next-action drafts, exception routing, and self-service answers.',
      capabilityZh: '输出 AI 总结、下一步动作草稿、异常路由和自助问答候选项。',
    },
  },
  {
    title: 'Supplier, customer & portal workflow',
    titleZh: '供应商、客户与门户流程',
    modules: 'Workflow advisory',
    modulesZh: '流程咨询',
    desc: 'Automate setup, validation, and support.',
    descZh: '自动化配置、校验和支持。',
    details: {
      approach: 'Review supplier setup, customer configuration, distribution rules, portal support, and approval handoffs.',
      approachZh: '检查供应商配置、客户配置、分销规则、门户支持和审批交接。',
      experience: 'Workflow friction often hides in onboarding, configuration validation, unclear ownership, and repeated support questions.',
      experienceZh: '流程摩擦通常藏在接入、配置校验、职责不清和重复支持问题里。',
      capability: 'Turn setup and support into guided AI workflows with human review where risk is high.',
      capabilityZh: '把配置和支持转成 AI 引导流程，在高风险点保留人工复核。',
    },
  },
  {
    title: 'Contract, pricing & finance control',
    titleZh: '合同、定价与财务控制',
    modules: 'Margin advisory',
    modulesZh: '利润咨询',
    desc: 'Reduce leakage in pricing and finance.',
    descZh: '减少定价和财务漏损。',
    details: {
      approach: 'Follow contract, tax, pricing, billing, reconciliation, and audit work to locate leakage and manual control gaps.',
      approachZh: '沿着合同、税费、定价、账单、对账和审计工作找漏损与人工控制缺口。',
      experience: 'Margin loss is usually cross-functional: commercial policy, supplier cost, customer price, operations, and finance.',
      experienceZh: '利润损失通常跨部门：商业政策、供应商成本、客户价格、运营和财务。',
      capability: 'Prioritize actions that either reduce cost immediately or create evidence for a larger implementation SOW.',
      capabilityZh: '优先推动能立刻降成本，或能形成更大实施方案证据的动作。',
    },
  },
  {
    title: 'Content, API platform & reporting',
    titleZh: '内容、API 平台与报表',
    modules: 'Self-service advisory',
    modulesZh: '自助化咨询',
    desc: 'Use AI for answers, reports, and self-service.',
    descZh: '用 AI 承接问答、报表和自助服务。',
    details: {
      approach: 'Identify questions that customers, suppliers, developers, and operating teams repeatedly ask.',
      approachZh: '识别客户、供应商、开发者和运营团队反复询问的问题。',
      experience: 'Self-service is strongest when content, API context, logs, dashboards, exports, and support are connected.',
      experienceZh: '当内容、API 上下文、日志、看板、导出和支持连起来，自助化价值最高。',
      capability: 'Create AI answer flows, report drafts, dashboard narratives, and support deflection patterns.',
      capabilityZh: '形成 AI 问答流、报表草稿、看板解读和支持分流模式。',
    },
  },
];

export default function ProfitRecovery() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const pick = (zh: string, en: string) => (isEn ? en : zh);
  const [selectedDetail, setSelectedDetail] = useState<Detail | null>(null);
  const product = getProductBySlug('margin-lift')!;
  const route = SITE_ROUTES.marginLift;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is MarginLift AI?', a: product.descriptionEn },
          { q: 'How long is the AI advisory sprint?', a: 'The AI Advisory Sprint is a 2-4 week paid diagnostic that maps labor replacement, workflow automation, supplier cost, and profit-lift opportunities with ROI evidence.' },
          { q: 'Does MarginLift require a platform migration?', a: 'No. The first sprint runs on approved exports, operating samples, price evidence, and configuration snapshots. Follow-on implementation can connect HotelByte modules if and when ROI is proven.' }
        ]
      : [
          { q: 'MarginLift AI 顾问是什么?', a: product.description },
          { q: 'AI 咨询 Sprint 多长?', a: 'AI Advisory Sprint 是 2-4 周的付费诊断冲刺,围绕人力替代、流程自动化、供应商成本和利润提升机会,产出 ROI 证据。' },
          { q: 'MarginLift 是否要求迁移平台?', a: '不要求。第一个 Sprint 可以基于授权导出、运营样本、价格证据和配置快照运行,后续实施可在 ROI 证明后接入 HotelByte 平台模块。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Run the MarginLift AI advisory in three evidence-bound steps'
      : 'MarginLift AI 顾问的三步证据闭环',
    isEn
      ? 'MarginLift proves which labor, workflow, supplier, and profit actions are worth AI before any implementation. The advisory, implementation, and managed operations are three explicit stages.'
      : 'MarginLift 先证明哪些人力、流程、供应商、利润动作值得用 AI,再进入实施。咨询、实施、托管运营是显式的三阶段。',
    isEn
      ? [
          { name: 'Diagnose the AI opportunity map', text: 'A 2-4 week paid sprint maps labor replacement, workflow automation, supplier cost, and profit-lift opportunities with ROI evidence.' },
          { name: 'Deliver agents and dashboards', text: 'Implementation SOW delivers AI agents, workflow redesign, supplier actions, dashboards, and operating controls with audit context.' },
          { name: 'Operate and measure', text: 'Managed AI operations continuously improves deployed workflows with monthly executive reviews and value tracking. Optional expansion into HotelByte platform modules only after ROI is proven.' }
        ]
      : [
          { name: '诊断 AI 机会地图', text: '2-4 周付费 Sprint 围绕人力替代、流程自动化、供应商成本、利润机会产出 ROI 证据。' },
          { name: '交付智能体与看板', text: '实施方案 SOW 交付 AI 智能体、流程重构、供应商动作、看板与控制机制,并附带审计上下文。' },
          { name: '持续运营与衡量', text: '托管 AI 运营持续优化已部署工作流,提供月度管理层复盘与价值追踪。ROI 验证后才可选择扩展到 HotelByte 平台模块。' }
        ]
  );
  const jsonLd = [
    softwareApplicationSchema(product, route.path, isEn ? 'en' : 'zh'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: isEn ? 'Products' : '产品', path: '/products' },
      { name: isEn ? product.nameEn : product.name, path: route.path }
    ]),
    faq,
    howTo
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
      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)] pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.08] mb-8">
              MarginLift AI<br />
              <span className="text-gradient">{pick('AI 咨询顾问', 'AI Consulting Advisors')}</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-6 font-light">
              {pick(
                'AI 顾问团队，帮酒店分销企业少用人、少返工、降成本、提利润。',
                'An AI advisory team that helps hotel distributors cut manual work, reduce cost, and lift profit.'
              )}
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              {pick(
                '先诊断机会，再交付智能体、流程和托管运营。',
                'Diagnose first. Then deliver agents, workflows, and managed operations.'
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:sales@hotelbyte.com?subject=MarginLift%20AI%20briefing"
                className="px-7 py-4 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow hover:shadow-[0_0_32px_rgba(0,240,255,0.35)] transition-all duration-300 flex items-center gap-2"
              >
                {pick('预约 MarginLift 简报', 'Book a MarginLift briefing')}
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
                    <div className="text-sm font-semibold">{pick('AI 咨询驾驶舱', 'AI Advisory Cockpit')}</div>
                    <div className="text-xs text-white/40 mt-1">{pick('咨询诊断冲刺', 'ADVISORY-SPRINT')}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cyan-glow">
                    <Sparkles className="w-4 h-4" />
                    {pick('人审证据', 'Human-reviewed')}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[0.9fr_1.1fr] gap-5">
                  <div className="space-y-3">
                    {[
                      [pick('人工工作', 'Labor work'), pick('可替代/可辅助', 'automate / assist')],
                      [pick('运营流程', 'Ops workflow'), pick('重复与等待', 'repeat / wait')],
                      [pick('供应商成本', 'Supplier cost'), pick('谈判与选择', 'negotiate / select')],
                      [pick('利润动作', 'Margin actions'), pick('定价与转化', 'price / convert')],
                    ].map(([title, meta], i) => (
                      <div key={title} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{title}</span>
                          <span className={`h-2 w-2 rounded-full ${i % 2 ? 'bg-electric-purple' : 'bg-cyan-glow'}`} />
                        </div>
                        <div className="text-xs text-white/40">{meta}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-cyan-glow/20 bg-cyan-glow/[0.035] p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <LineChart className="w-5 h-5 text-cyan-glow" />
                      <span className="text-sm font-semibold text-cyan-glow">{pick('AI 顾问路线图', 'AI advisory roadmap')}</span>
                    </div>
                    <div className="space-y-3">
                      {proofRows.map((row) => (
                        <div key={row.signal} className="grid grid-cols-[5rem_1fr_auto] gap-3 items-start text-xs rounded-xl border border-white/5 bg-black/20 p-3">
                          <span className="text-white/80 font-mono">{isEn ? row.signal : row.signalZh}</span>
                          <span className="text-white/55 leading-relaxed">{isEn ? row.issue : row.issueZh}</span>
                          <span className="text-cyan-glow">{isEn ? row.impact : row.impactZh}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    [pick('诊断场景', 'Workstreams'), pick('四类', '4')],
                    [pick('诊断周期', 'Window'), pick('2-4周', '2-4w')],
                    [pick('交付输出', 'Output'), pick('实施方案', 'SOW')],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.035] p-4 text-center">
                      <div className="text-2xl font-display font-bold text-white">{value}</div>
                      <div className="text-xs text-white/40 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-black/20 py-14 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              {pick('先证明哪里值得用 AI 改', 'Prove where AI is worth applying')}
            </h2>
            <p className="text-white/60 leading-relaxed">
              {pick(
                '用可衡量的成本、效率和利润证据，判断哪些工作适合先诊断、先试点、先落地。',
                'Use measurable cost, efficiency, and margin evidence to decide what to diagnose, pilot, and implement first.'
              )}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                title: pick('可衡量的成本依据', 'Measurable cost case'),
                summary: pick('先把 AI 机会转成可计算的成本与效率指标。', 'Translate AI opportunity into measurable cost and efficiency metrics.'),
                details: {
                  approach: pick('从人力、外包、供应商和返工成本开始，识别 AI 最可能带来确定收益的区域。', 'Start from labor, outsourcing, supplier, and rework cost to identify where AI can create measurable return.'),
                  experience: pick('酒店分销的成本通常分散在运营、商业、供应商和财务之间，需要把它们放在同一张业务账里看。', 'Distribution cost is spread across operations, commercial work, suppliers, and finance, so it needs one business view.'),
                  capability: pick('输出节省项、影响范围、试点边界和成功指标，便于评估投入产出。', 'Outputs savings lines, affected scope, pilot boundaries, and success metrics for ROI evaluation.'),
                },
              },
              {
                title: pick('业务负责人可控试点', 'Low-risk pilot for ops'),
                summary: pick('让业务先看到小范围可控结果。', 'Let operators see a controlled win first.'),
                details: {
                  approach: pick('选择报表、对账、异常、供应商跟进、重复检查这类低风险高频工作做试点。', 'Pick high-frequency, lower-risk work: reporting, reconciliation, exceptions, supplier follow-up, repeated checks.'),
                  experience: pick('酒店分销团队最怕影响订单和客户体验，所以试点必须带人审、回滚和清晰边界。', 'Distribution teams fear order and customer-impact risk, so pilots need review, rollback, and a narrow boundary.'),
                  capability: pick('把“可以试试”的想法变成可展示、可复盘、可扩展的试点结果。', 'Turns a promising idea into pilot results that can be reviewed, demonstrated, and expanded.'),
                },
              },
              {
                title: pick('清晰的实施方案', 'Clear implementation plan'),
                summary: pick('把咨询结果变成可执行的下一步。', 'Turn advisory output into an executable next step.'),
                details: {
                  approach: pick('每个建议都落到范围、交付物、验收标准、数据输入、负责人和扩展路径。', 'Every recommendation maps to scope, deliverables, acceptance criteria, data input, owner, and expansion path.'),
                  experience: pick('AI 咨询不能停在报告，必须能转成低风险、可验收、可复盘的落地路径。', 'AI advisory should not stop at a report; it should become a low-risk, testable, reviewable implementation path.'),
                  capability: pick('从咨询诊断冲刺延伸到实施方案、托管运营和后续平台模块。', 'Extends the Advisory Sprint into implementation SOW, managed operations, and later platform modules.'),
                },
              },
            ].map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => openDetail(pick('经营结果', 'Operating outcome'), item.title, item.summary, item.details)}
                className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-3 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.04] transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-glow shrink-0" />
                <h3 className="font-bold text-sm">{item.title}</h3>
                <ChevronRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-cyan-glow transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-5">
              {pick('咨询顾问产品，先看真实履历', 'Advisory credibility starts with operating record')}
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              {pick(
                '判断一项 AI 咨询是否靠谱，要看它是否理解酒店分销、是否能拿出证据、是否能落成交付。',
                'A credible AI advisory offer needs distribution depth, evidence, and the ability to deliver.'
              )}
            </p>
            <div className="rounded-3xl border border-cyan-glow/20 bg-cyan-glow/[0.035] p-6">
              <div className="flex items-center gap-3 text-cyan-glow mb-4">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-semibold">{pick('来自真实分销运营经验', 'Built from real distribution operations')}</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {pick(
                  '不是通用 AI 培训，而是从价格、运营、自动化和交付经验反推 AI 机会。',
                  'Not a generic AI workshop. We work backward from price, operations, automation, and delivery experience.'
                )}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {credibilitySignals.map((item) => (
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
                className="group text-left rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.04] transition-colors"
              >
                <div className="text-3xl font-display font-bold text-white mb-2">{item.metric}</div>
                <h3 className="font-bold mb-3">{isEn ? item.label : item.labelZh}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{isEn ? item.proof : item.proofZh}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-cyan-glow">
                  {pick('查看详情', 'View details')}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-y border-white/5 py-20">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-5">
                {pick('4 个优先诊断场景', '4 priority diagnostic areas')}
              </h2>
              <p className="text-white/60 leading-relaxed">
                {pick(
                  '从最容易省人、省钱、减少风险或提升利润的地方开始。',
                  'Start where AI can reduce manual work, save cost, lower risk, or lift margin fastest.'
                )}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {advisoryWorkstreams.map((stream) => (
                <button
                  key={stream.title}
                  type="button"
                  onClick={() =>
                    openDetail(
                      isEn ? stream.modules : stream.modulesZh,
                      isEn ? stream.title : stream.titleZh,
                      isEn ? stream.desc : stream.descZh,
                      {
                        approach: isEn ? stream.details.approach : stream.details.approachZh,
                        experience: isEn ? stream.details.experience : stream.details.experienceZh,
                        capability: isEn ? stream.details.capability : stream.details.capabilityZh,
                      },
                    )
                  }
                  className="group text-left rounded-3xl border border-white/10 bg-white/[0.025] p-6 hover:border-cyan-glow/40 hover:bg-cyan-glow/[0.04] transition-colors"
                >
                  <div className="text-xs font-mono text-cyan-glow mb-4">{isEn ? stream.modules : stream.modulesZh}</div>
                  <h3 className="font-bold text-lg mb-3">{isEn ? stream.title : stream.titleZh}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{isEn ? stream.desc : stream.descZh}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-cyan-glow">
                    {pick('查看详情', 'View details')}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            {pick('从诊断到实施运营', 'From diagnosis to operated implementation')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {pick(
              '先用低风险诊断证明价值，再进入实施和托管运营。',
              'Use a low-risk diagnostic sprint to prove value, then move into implementation and managed operations.'
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
                  {isEn ? phase.price : phase.priceZh}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{isEn ? phase.name : phase.nameZh}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{isEn ? phase.desc : phase.descZh}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-glow">
                {pick('看交付细节', 'View delivery detail')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* AEO — How it works */}
      <HowItWorks
        title={isEn ? 'How the MarginLift AI advisory runs' : 'MarginLift AI 顾问如何运行'}
        subtitle={isEn
          ? 'Diagnose, deliver, and operate — three evidence-bound stages that protect ROI before platform migration.'
          : '诊断、交付、运营,三个证据闭环阶段,先证明 ROI 再谈平台迁移。'}
        steps={isEn
          ? [
              { name: 'Diagnose the AI opportunity map', text: 'A 2-4 week paid sprint maps labor replacement, workflow automation, supplier cost, and profit-lift opportunities with ROI evidence.' },
              { name: 'Deliver agents and dashboards', text: 'Implementation SOW delivers AI agents, workflow redesign, supplier actions, dashboards, and operating controls with audit context.' },
              { name: 'Operate and measure', text: 'Managed AI operations continuously improves deployed workflows with monthly executive reviews and value tracking. Optional expansion into HotelByte platform modules only after ROI is proven.' }
            ]
          : [
              { name: '诊断 AI 机会地图', text: '2-4 周付费 Sprint 围绕人力替代、流程自动化、供应商成本、利润机会产出 ROI 证据。' },
              { name: '交付智能体与看板', text: '实施方案 SOW 交付 AI 智能体、流程重构、供应商动作、看板与控制机制,并附带审计上下文。' },
              { name: '持续运营与衡量', text: '托管 AI 运营持续优化已部署工作流,提供月度管理层复盘与价值追踪。ROI 验证后才可选择扩展到 HotelByte 平台模块。' }
            ]}
      />

      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-cyan-glow/[0.04] p-8 lg:p-12">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5 text-cyan-glow">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-sm font-semibold">Evidence-first AI</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-5">
                {pick('不先迁移平台，先证明经营收益', 'Prove operating value before platform migration')}
              </h2>
              <p className="text-white/60 leading-relaxed max-w-3xl">
                {pick(
                  '每个建议都说明：能省什么成本、提升什么利润、如何验收、需要什么智能体或流程落地。',
                  'Every recommendation states the cost saved, profit lifted, acceptance criteria, and agent or workflow needed to execute.'
                )}
              </p>
            </div>
            <a
              href="mailto:sales@hotelbyte.com?subject=MarginLift%20AI%20briefing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-abyss-blue font-bold hover:bg-cyan-glow transition-colors"
            >
              <Wrench className="w-5 h-5" />
              {pick('启动 MarginLift', 'Start MarginLift')}
            </a>
          </div>
        </div>
      </section>

      {selectedDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm px-4 py-6 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="marginlift-detail-title"
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
                <h3 id="marginlift-detail-title" className="text-2xl sm:text-3xl font-display font-bold text-white">
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
