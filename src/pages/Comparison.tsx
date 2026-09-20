import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { capabilityMatrix, verificationSteps } from '../data/procurement';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { webPageSchema, breadcrumbSchema, faqSchema } from '../seo/schema';

export default function Comparison() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.compare;

  const pick = (zh: string, en: string) => (isEn ? en : zh);

  const evaluationFaq: Array<{ q: string; a: string }> = isEn
    ? [
        {
          q: 'How do I verify a distributor really covers my source markets?',
          a: 'Ask for an auditable supplier list, then run a real hotelList / hotelRates query for your own source markets on a sandbox account. Check the coverage rate against the hotels you actually sell, the freshness of the returned rates, and whether the price is a net rate or a display rate.'
        },
        {
          q: 'What should I check before trusting a white-label claim?',
          a: 'Run a white-label demo under your own domain, then use a downstream account to try reading upstream data or editing upstream credit. Confirm whether the agency hierarchy is physically isolated or filtered at query time, and whether billing can be issued and reconciled per downstream account.'
        },
        {
          q: 'What is AI-native hotel distribution?',
          a: 'AI-native hotel distribution embeds LLM orchestration, multi-source federated queries, masking, RBAC and self-evolving agents into the platform from day one, instead of bolting a chatbot onto a legacy stack. The practical test is whether the AI layer can read governed business data and act on it inside the same permission model.'
        },
        {
          q: 'How long does implementation take?',
          a: 'A standard integration takes 2-4 weeks through the unified adapter that already covers 27+ suppliers. Custom workflows, dashboards and managed operations extend the rollout after the first sprint.'
        },
        {
          q: 'How do I judge incident diagnostics?',
          a: 'Hand over a real logId / traceId and ask for the incident timeline: supplier raw response, per-hop latency, and the root-cause reasoning. If the vendor can only show its own layer logs, cross-party troubleshooting stays manual.'
        },
        {
          q: 'How is HotelByte priced?',
          a: 'Performance-based plus tiered subscription. You pay for usage and outcomes rather than a fixed monthly SaaS fee, which lets you start small and scale as distribution volume grows.'
        },
        {
          q: 'Does HotelByte support B2B agency hierarchies?',
          a: 'Yes. The Platform → Tenant → Customer → Account four-tier entity architecture is native, with multi-currency credit management, granular authorization and independent financial accounting at every level.'
        },
        {
          q: 'Can HotelByte run on-premise?',
          a: 'Yes. The DeepSeek V4-Flash Appliance runs a 284B-parameter model on 128GB of memory with a built-in knowledge base, Data Agent and self-evolving engine, deployable in about 30 minutes for on-prem enterprise AI.'
        }
      ]
    : [
        {
          q: '怎么验证一个分销商真的覆盖我的客源市场？',
          a: '要一份可审计的供应商清单，然后用自己的沙箱账号，针对你真正在卖的酒店跑一次真实 hotelList / hotelRates。核对覆盖率、返回报价的新鲜度，以及价格到底是净价还是展示价。'
        },
        {
          q: '白标能力在采信之前该验证什么？',
          a: '在你自己的域名下跑一次白标演示，然后用下级账号尝试读取上级数据、修改上级额度。同时确认多层级代理是物理隔离还是查询期过滤，以及账单能否按每个下级账号分发出账并对账。'
        },
        {
          q: '什么是 AI-Native 酒店分销？',
          a: 'AI-Native 酒店分销把 LLM 编排、多源异构联邦查询、数据脱敏、RBAC 与自进化智能体在架构设计之初就原生集成，而不是把聊天框事后外挂到老系统上。可检验的标准是：AI 层能否在同一个权限模型内读取受治理的业务数据并据此执行动作。'
        },
        {
          q: '实施周期多长？',
          a: '通过已覆盖 27+ 全球供应商的统一适配器，标准集成 2-4 周即可上线。自定义工作流、看板与托管运营可以在第一个 Sprint 之后按需扩展。'
        },
        {
          q: '怎么判断故障诊断能力？',
          a: '给对方一个真实 logId / traceId，要求还原故障发生的时间线：供应商原始返回、每一跳耗时、根因判断依据。如果只能展示自己这一层的日志，跨方排查仍然只能靠人工。'
        },
        {
          q: 'HotelByte 是如何定价的？',
          a: '按效果付费 + 分层订阅。你只为实际使用与业务结果付费，而不是固定月费，这让初创团队可以从小规模开始，随着分销规模增长再扩展。'
        },
        {
          q: '是否支持 B2B 代理层级？',
          a: '支持。Platform → Tenant → Customer → Account 四级实体架构是原生能力，具备多币种信用管理、细粒度权限控制以及每一层独立的财务核算。'
        },
        {
          q: '能否私有化部署？',
          a: '可以。DeepSeek V4-Flash 一体机在 128GB 内存上运行 284B 参数大模型，内置知识库、Data Agent 与自进化引擎，约 30 分钟完成私有化部署，满足金融、医疗、法律等合规要求。'
        }
      ];

  const jsonLd = [
    webPageSchema(route.path, isEn ? route.title : route.titleZh, isEn ? route.description : route.descriptionZh, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: isEn ? 'Evaluation guide' : '选型指南', path: '/compare' }
    ]),
    faqSchema(evaluationFaq)
  ];

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={isEn ? route.title : route.titleZh}
        description={isEn ? route.description : route.descriptionZh}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-16"
      >
        <p className="eyebrow mb-6">{pick('分销采购清单', 'Procurement checklist')}</p>
        <h1 className="font-display text-4xl lg:text-6xl leading-[1.15] mb-6">
          {pick('怎么评估一个酒店分销底座', 'How to evaluate a hotel distribution base')}
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed max-w-2xl">
          {pick(
            '这一页不点名任何厂商。我们把分销采购里真正决定成败的五项能力拆开，每一项都给出「该问什么」和「怎么当场验证」——你可以拿它去问任何一家供应商，包括我们。',
            'No vendor is named on this page. We break down the five capabilities that decide whether a distribution base works for you, each with the questions to ask and how to verify the answer on the spot — take it to any supplier, including us.'
          )}
        </p>
      </motion.div>

      {/* Facts strip */}
      <motion.div
        {...fade(0.1)}
        className="mb-20 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line"
      >
        {[
          { value: '27+', label: pick('预集成供应商', 'Suppliers pre-integrated') },
          { value: pick('2-4 周', '2-4 weeks'), label: pick('标准接入周期', 'Standard integration') },
          { value: pick('4 级', '4-Tier'), label: pick('实体隔离架构', 'Entity isolation') },
          { value: pick('10 分钟', '10 min'), label: pick('故障定位目标', 'Fault localization target') },
        ].map((stat, i) => (
          <div key={i} className="bg-paper p-6 lg:p-8 text-center">
            <div className="font-mono text-xl lg:text-2xl text-ink mb-2">{stat.value}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Capability matrix */}
      <div className="mb-24">
        <motion.div {...fade()} className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">{pick('五项能力', 'Five capabilities')}</p>
          <h2 className="font-display text-3xl lg:text-4xl mb-4">
            {pick('采购时逐条过一遍', 'Walk through these line by line')}
          </h2>
          <p className="text-ink/65 leading-relaxed">
            {pick(
              '左边是我们的答案，右边是你要问对方的问题、以及不听口头承诺时的验证动作。',
              'The left column is our answer; the right column is what to ask any supplier, plus how to verify it without trusting a slide.'
            )}
          </p>
        </motion.div>

        <div className="space-y-14">
          {capabilityMatrix.map((cap, idx) => (
            <motion.article
              key={cap.id}
              {...fade(0.05 * idx)}
              className="border-t-2 border-ink pt-8 grid lg:grid-cols-12 gap-8 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl lg:text-3xl leading-snug mb-4">
                  {isEn ? cap.nameEn : cap.name}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {isEn ? cap.hotelbyteEn : cap.hotelbyte}
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-4">
                  {pick('采购时要问', 'Ask any supplier')}
                </div>
                <ul className="space-y-3">
                  {(isEn ? cap.askEn : cap.ask).map((q, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-ink/80 leading-relaxed">
                      <span className="text-ink/30" aria-hidden="true">?</span> {q}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-4">
                  {pick('怎么验证', 'How to verify')}
                </div>
                <div className="border-l-2 border-brass pl-4">
                  <p className="text-sm text-ink/80 leading-relaxed">
                    {isEn ? cap.verifyEn : cap.verify}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Verification checklist */}
      <div className="mb-24 bg-paper-raised border-y border-line py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fade()} className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">{pick('现场验证清单', 'On-site checklist')}</p>
            <h2 className="font-display text-3xl lg:text-4xl mb-4">
              {pick('五个动作，一轮就能问清楚', 'Five moves that settle most questions')}
            </h2>
            <p className="text-ink/65 leading-relaxed">
              {pick(
                '这些都不需要对方额外准备，只要你开口要。要不到，本身就是答案。',
                'None of these need extra work from the vendor — just ask. If you cannot get one, that is the answer.'
              )}
            </p>
          </motion.div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {verificationSteps.map((step, idx) => (
              <motion.li key={idx} {...fade(0.05 * idx)} className="bg-paper-raised p-6 lg:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass mb-3">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-medium text-ink mb-3 leading-snug">
                  {isEn ? step.actionEn : step.action}
                </h3>
                <p className="text-sm text-ink/65 leading-relaxed">
                  {isEn ? step.whyEn : step.why}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-24">
        <motion.div {...fade()} className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">{pick('常见问答', 'People also ask')}</p>
          <h2 className="font-display text-3xl lg:text-4xl mb-4">
            {pick('选型时会问到的问题', 'Questions that come up during evaluation')}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {evaluationFaq.map((item, idx) => (
            <motion.div
              key={`${item.q}-${idx}`}
              {...fade(0.05 * idx)}
              className="border border-line bg-paper p-6"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="text-base font-medium mb-3 text-ink" itemProp="name">{item.q}</h3>
              <p
                className="text-ink/65 leading-relaxed text-sm"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <span itemProp="text">{item.a}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div {...fade()} className="border border-line bg-paper-raised p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl lg:text-3xl mb-4">
              {pick('拿这份清单来考我们', 'Bring this list to us')}
            </h2>
            <p className="text-ink/65 leading-relaxed">
              {pick(
                '申请沙箱账号后，你可以用真实客源国跑比价、压一次并发、要一个 traceId 回放——也欢迎拿它去对比其他供应商。',
                'With a sandbox account you can run real rate queries for your markets, load-test the API, and ask for a traceId replay — and we are happy for you to take the same list to other suppliers.'
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-ink text-paper font-medium hover:bg-ink-deep transition-colors"
            >
              {pick('申请沙箱 / Demo', 'Request sandbox / demo')} <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://openapi.hotelbyte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-sm border border-ink/25 font-medium hover:border-ink/60 transition-colors"
            >
              {pick('查看 API 文档', 'Read the API docs')}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
