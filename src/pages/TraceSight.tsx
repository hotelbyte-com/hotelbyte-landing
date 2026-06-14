import { motion } from 'framer-motion';
import { Eye, Brain, Bot, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import { useI18n } from '../i18n';
import { HowItWorks } from '../components/HowItWorks';

const tiers = [
  {
    icon: Eye,
    name: 'TraceSight Viewer',
    nameEn: 'TraceSight Viewer',
    focus: '会话级可观测性',
    focusEn: 'Session-level observability',
    description: '实时会话追踪、请求/响应检查、酒店分销 API 调用的日志关联。精确还原每一次搜索、预订或映射请求的全貌。',
    descriptionEn: 'Real-time session tracing, request/response inspection, log correlation for hotel distribution API calls. See exactly what happened in every search, booking, or mapping request.',
    features: [
      '全链路请求追踪与日志聚合',
      'TraceID 级别的会话还原',
      '多方（平台/租户/客户/供应商）视角切换',
      '实时请求/响应报文查看',
    ],
    featuresEn: ['Full-linkage request tracing', 'TraceID-level session reconstruction', 'Multi-party perspective switching', 'Real-time payload inspection'],
  },
  {
    icon: Brain,
    name: 'TraceSight LLM',
    nameEn: 'TraceSight LLM',
    focus: 'AI 智能诊断',
    focusEn: 'AI-powered diagnostics',
    description: '用自然语言查询运维数据。问"昨天预订量为什么下降？"，即可从会话日志、指标和异常中获取 AI 生成的洞察。',
    descriptionEn: 'Natural language querying of operational data. Ask "Why did bookings drop yesterday?" and get AI-generated insights from session logs, metrics, and anomalies.',
    features: [
      '自然语言故障排查',
      '基于大模型的自动化根因分析',
      '价格与房型映射异常秒级定位',
      '智能诊断建议与验证矩阵',
    ],
    featuresEn: ['Natural language troubleshooting', 'LLM-powered root-cause analysis', 'Sub-second anomaly detection', 'Smart diagnosis with verification matrix'],
  },
  {
    icon: Bot,
    name: 'TraceSight Agent',
    nameEn: 'TraceSight Agent',
    focus: '自主运维',
    focusEn: 'Autonomous operations',
    description: 'AI 智能体主动监控、诊断和修复分销问题。自动检测合作伙伴 API 降级、触发故障转移、自愈映射差异。',
    descriptionEn: 'AI agents that proactively monitor, diagnose, and remediate distribution issues. Auto-detect partner API degradation, trigger failover, and self-heal mapping discrepancies.',
    features: [
      '7x24 主动监控与异常检测',
      '自动故障隔离与降级',
      '自愈式映射修复',
      '预测性维护与容量规划',
    ],
    featuresEn: ['24/7 proactive monitoring', 'Auto fault isolation', 'Self-healing mapping repair', 'Predictive maintenance'],
  },
];

export default function TraceSight() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const product = getProductBySlug('tracesight')!;
  const route = SITE_ROUTES.traceSight;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is TraceSight?', a: product.descriptionEn },
          { q: 'How fast can TraceSight diagnose failures?', a: 'TraceSight compresses cross-team troubleshooting from 2-4 hours to under 10 minutes using session-level tracing and LLM-powered root-cause analysis.' },
          { q: 'Does TraceSight support autonomous operations?', a: 'Yes. TraceSight Agent can proactively monitor, isolate, and self-heal distribution issues including supplier API degradation and mapping discrepancies.' }
        ]
      : [
          { q: 'TraceSight 是什么?', a: product.description },
          { q: 'TraceSight 多久能定位一次故障?', a: 'TraceSight 通过会话级追踪与 LLM 驱动的根因分析,将跨团队故障排查从 2-4 小时压缩到 10 分钟以内。' },
          { q: 'TraceSight 支持自主运维吗?', a: '支持。TraceSight Agent 能主动监控、隔离并自愈分销问题,包括供应商 API 降级和映射差异修复。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Roll out TraceSight across the four-party ecosystem'
      : '在四方生态中部署 TraceSight',
    isEn
      ? 'TraceSight turns hours of cross-team troubleshooting into minutes. From tracing to AI diagnosis to autonomous ops, the rollout is three steps.'
      : 'TraceSight 把跨团队数小时的故障排查压缩到分钟级。从全链路追踪、AI 诊断到自主运维,部署只需三步。',
    isEn
      ? [
          { name: 'Trace the session', text: 'HotelByte services emit trace IDs and structured logs across platform, tenant, customer, and supplier hops. TraceSight Viewer reconstructs the session.' },
          { name: 'Diagnose with the LLM', text: 'The Data Agent answers natural-language questions across session logs, metrics, and anomalies, with masking and RBAC applied.' },
          { name: 'Hand off to agents', text: 'TraceSight Agent monitors, isolates, and self-heals distribution issues. Anomalies, mapping drift, and supplier degradation are auto-remediated.' }
        ]
      : [
          { name: '追踪会话', text: 'HotelByte 服务在平台、租户、客户、供应商之间统一发出 TraceID 与结构化日志。TraceSight Viewer 还原整次会话。' },
          { name: '让 LLM 诊断', text: 'Data Agent 用自然语言回答跨会话日志、指标、异常的问题,全程受脱敏与 RBAC 保护。' },
          { name: '交给 Agent', text: 'TraceSight Agent 主动监控、隔离、自愈分销问题。异常、映射漂移与供应商降级都会被自动修复。' }
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

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={isEn ? route.title : route.titleZh}
        description={isEn ? route.description : route.descriptionZh}
        keywords={route.keywords}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-6">
          Full-Linkage Operations Intelligence
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          TraceSight <span className="text-white/40 text-3xl lg:text-5xl">追光</span><br />
          <span className="text-gradient">全链路智能诊断平台</span>
        </h1>
        <p className="text-lg text-white/60 font-light">
          全链路可见，故障无处遁形。
        </p>
        <p className="text-white/60 leading-relaxed mt-4">
          TraceSight 是专为复杂的四方（平台、租户、客户、供应商）分销生态打造的一站式智能诊断平台。
          打破信息孤岛，将原本需要 2-4 小时的跨团队故障排查时间，压缩至惊人的 <span className="text-cyan-glow font-medium">10 分钟</span> 以内。
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
      >
        {[
          { value: '10m', label: '平均排查耗时（从 4h 降低）', labelEn: 'Avg troubleshooting (from 4h)' },
          { value: '99%', label: '自动化根因定位准确率', labelEn: 'Auto root-cause accuracy' },
          { value: '4方', label: '平台/租户/客户/供应商协同', labelEn: '4-party collaboration' },
          { value: '24/7', label: '全天候主动监控', labelEn: '24/7 proactive monitoring' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-display font-bold text-cyan-glow mb-2">{stat.value}</div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Terminal Visual */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mb-32"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-glow/10 to-transparent blur-3xl -z-10"></div>
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-2 overflow-hidden shadow-2xl">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="ml-4 text-xs font-mono text-white/40">tracesight-trace-view.tsx</div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-cyan-glow">GET</span>
                  <span className="text-white/80">/api/v1/search/checkAvail</span>
                </div>
                <span className="text-white/40">142ms</span>
              </div>
              <div className="ml-8 border-l border-white/10 pl-8 space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-electric-purple">AI DIAGNOSIS</span>
                    <span className="text-white/60 text-xs">LLM-Powered</span>
                  </div>
                  <p className="text-white/70 font-sans">
                    Identified supplier mapping mismatch. Room type ID 'RT-892' is missing in the downstream inventory for property 'HTL-1042'.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Three Tiers */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">三层能力架构</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            从会话级观测到 AI 诊断，再到自主运维，TraceSight 为不同成熟度的团队提供匹配的能力层级。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`p-8 rounded-3xl border bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 ${
                idx === 2 ? 'border-cyan-glow/50' : 'border-white/10'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                idx === 2 ? 'bg-cyan-glow/10' : 'bg-white/5'
              }`}>
                <tier.icon className={`w-6 h-6 ${
                  idx === 2 ? 'text-cyan-glow' : idx === 1 ? 'text-electric-purple' : 'text-white/70'
                }`} />
              </div>
              <div className={`text-xs font-medium mb-3 ${
                idx === 1 ? 'text-electric-purple' : 'text-cyan-glow'
              }`}>
                {tier.focus}
              </div>
              <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
              <p className="text-white/60 leading-relaxed mb-8 text-sm">
                {tier.description}
              </p>
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      idx === 1 ? 'text-electric-purple' : 'text-cyan-glow'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitor Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] mb-16"
      >
        <h3 className="text-2xl font-bold mb-6">与竞品的差异</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'SiteMinder / Cloudbeds', desc: '无原生运维诊断工具，问题排查依赖人工日志分析。' },
            { title: '传统 APM 工具', desc: 'Datadog / New Relic 无法理解酒店分销业务语义，缺乏 TraceID 与会话关联。' },
            { title: 'HotelByte TraceSight', desc: '业务上下文与技术指标深度融合，四方协同一站式诊断。' },
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl ${
              i === 2 ? 'bg-cyan-glow/5 border border-cyan-glow/20' : 'bg-white/5'
            }`}>
              <div className={`text-sm font-medium mb-2 ${i === 2 ? 'text-cyan-glow' : 'text-white/50'}`}>
                {item.title}
              </div>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AEO — How it works */}
      <HowItWorks
        title={isEn ? 'How TraceSight ships' : 'TraceSight 怎么落地'}
        subtitle={isEn
          ? 'Trace the session, diagnose with the LLM, hand off to agents.'
          : '追踪会话、让 LLM 诊断、交给 Agent。'}
        steps={isEn
          ? [
              { name: 'Trace the session', text: 'HotelByte services emit trace IDs and structured logs across platform, tenant, customer, and supplier hops. TraceSight Viewer reconstructs the session.' },
              { name: 'Diagnose with the LLM', text: 'The Data Agent answers natural-language questions across session logs, metrics, and anomalies, with masking and RBAC applied.' },
              { name: 'Hand off to agents', text: 'TraceSight Agent monitors, isolates, and self-heals distribution issues. Anomalies, mapping drift, and supplier degradation are auto-remediated.' }
            ]
          : [
              { name: '追踪会话', text: 'HotelByte 服务在平台、租户、客户、供应商之间统一发出 TraceID 与结构化日志。TraceSight Viewer 还原整次会话。' },
              { name: '让 LLM 诊断', text: 'Data Agent 用自然语言回答跨会话日志、指标、异常的问题,全程受脱敏与 RBAC 保护。' },
              { name: '交给 Agent', text: 'TraceSight Agent 主动监控、隔离、自愈分销问题。异常、映射漂移与供应商降级都会被自动修复。' }
            ]}
      />

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/compare"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-abyss-blue transition-all font-medium mr-4"
        >
          查看完整竞品对比 <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-glow to-electric-purple text-white font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-shadow">
          申请演示
        </button>
      </div>
    </div>
  );
}
