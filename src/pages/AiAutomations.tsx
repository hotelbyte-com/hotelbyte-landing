import { motion } from 'framer-motion';
import { Terminal, Database, Code2, ShieldAlert, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import { useI18n } from '../i18n';
import { HowItWorks } from '../components/HowItWorks';

export default function AiAutomations() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const product = getProductBySlug('ai-automations')!;
  const route = SITE_ROUTES.aiAutomations;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is AI-Native Automations in HotelByte?', a: product.descriptionEn },
          { q: 'Which data sources does the Data Agent federate?', a: 'The Data Agent runs federated queries across MySQL, TDengine, Redis, MongoDB, and Elasticsearch with built-in PII masking and RBAC.' },
          { q: 'Does AI-Native Automations support any LLM?', a: 'Yes. The orchestration layer is model-agnostic and OpenAI / Anthropic protocol compatible, so any SOTA model can be plugged in on day zero.' }
        ]
      : [
          { q: 'HotelByte 的 AI 原生自动化是什么?', a: product.description },
          { q: 'Data Agent 支持哪些数据源的联邦查询?', a: 'Data Agent 联邦查询覆盖 MySQL、TDengine、Redis、MongoDB、Elasticsearch 等数据源,内置脱敏与 RBAC 权限控制。' },
          { q: 'AI 原生自动化是否支持任意大模型?', a: '支持。编排层模型无关,兼容 OpenAI / Anthropic 协议,Day-0 即可接入任意开源或商用 SOTA 模型。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Bring AI-Native Automations to your distribution stack'
      : '把 AI 原生自动化接入你的分销系统',
    isEn
      ? 'HotelByte embeds LLM orchestration, federated queries, and self-evolving agents into your distribution stack in three steps.'
      : 'HotelByte 用三步把 LLM 编排、联邦查询与自进化智能体嵌入你的分销系统。',
    isEn
      ? [
          { name: 'Connect data sources', text: 'Plug the federated query engine into MySQL, TDengine, Redis, MongoDB, and Elasticsearch. HotelByte RBAC and masking apply immediately.' },
          { name: 'Ask in natural language', text: 'Non-technical teams ask the Data Agent in natural language. SQL is auto-generated, optimized, and masked before execution.' },
          { name: 'Publish reviewable insights', text: 'Each insight ships with audit context, masking evidence, and lineage so commercial, ops, and finance teams can share the same answer.' }
        ]
      : [
          { name: '连接数据源', text: '把联邦查询引擎接入 MySQL、TDengine、Redis、MongoDB、Elasticsearch。HotelByte 的 RBAC 与脱敏立即生效。' },
          { name: '用自然语言提问', text: '非技术团队以自然语言向 Data Agent 提问,SQL 自动生成并优化,在执行前完成脱敏。' },
          { name: '发布可审核的洞察', text: '每条洞察都附带审计上下文、脱敏证据与字段血缘,让商业、运营、财务团队基于同一份答案协作。' }
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
          AI-Native & Automations
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          将 <span className="text-gradient">大模型能力</span><br />
          深度注入分销系统
        </h1>
        <p className="text-lg text-white/60 font-light">
          这不是一个外挂的聊天框，而是原生地运行在 HotelByte 底层的数据与工程智能体。
        </p>
      </motion.div>

      {/* Data Agent Section */}
      <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-glow to-electric-purple"></div>
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <Terminal className="w-4 h-4 text-white/40" />
              <div className="text-xs font-mono text-white/40">data-agent-terminal</div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="text-white/60">
                <span className="text-cyan-glow mr-2">&gt;</span>
                找出过去 24 小时 Dida 供应商超时超过 3 秒的订单
              </div>
              <div className="p-4 rounded bg-white/5 border border-white/5">
                <div className="text-electric-purple text-xs mb-2">Executing SQL on TDengine...</div>
                <div className="text-white/80">Found 12 instances. Average latency: 4.2s.</div>
                <div className="mt-2 text-white/40">Visualizing data... [Graph generated]</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-3xl font-display font-bold mb-4">Data Agent 数据智能体</h2>
          <p className="text-white/60 leading-relaxed mb-8">
            受治理的自然语言数据调查工具。支持 MySQL、TDengine、Redis、MongoDB、Elasticsearch 等多种数据源的统一联邦查询。插件化架构让新数据源可快速接入，无需改动上层业务。
          </p>
          <ul className="space-y-4">
            {[
              { icon: Database, text: '跨数据源联合查询' },
              { icon: ShieldAlert, text: '严格的数据脱敏与权限隔离' },
              { icon: Code2, text: '自动生成可视化图表与洞察报告' }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <item.icon className="w-5 h-5 text-cyan-glow" />
                </div>
                <span className="text-white/80">{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Tech Architecture Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">技术架构亮点</h2>
          <p className="text-white/60 font-light">原生 AI 架构，从底层设计而非外挂集成</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Cpu, title: '模型无关的 LLM 编排层', desc: '通过 OpenAI 与 Anthropic 标准协议接入任意大模型。Day-0 支持所有开源 SOTA 模型，不被单一厂商锁定。' },
            { icon: Database, title: '多源异构联邦查询引擎', desc: '支持 MySQL、TDengine、Redis、MongoDB、Elasticsearch 等多种数据源的统一查询。插件化适配层让新数据源可快速扩展。' },
            { icon: Code2, title: '自动 SQL 生成与执行计划优化', desc: 'AI 自动生成最优查询语句，并针对各数据库特性进行执行计划重写与优化。' },
            { icon: ShieldAlert, title: '实时数据脱敏与权限校验', desc: '查询执行前自动注入脱敏规则，确保敏感字段（如客人 PII）在返回前被安全处理。' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-8 h-8 text-cyan-glow mb-4" />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Competitor Comparison Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold mb-4">与竞品的核心差异</h2>
              <p className="text-white/60 mb-8">
                市场上大多数"AI 助手"只是将 ChatGPT 嵌入到现有系统中。HotelByte 的 AI 自动化是从架构层面原生设计的。
              </p>
              <div className="space-y-4">
                {[
                  '竞品多为外挂式 Chatbot，我们是原生集成',
                  '支持多源异构联邦查询，竞品通常只支持单一数据源',
                  '插件化架构，新数据源可快速扩展，无需改动业务代码',
                  '内置数据脱敏，无需额外配置',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-glow mt-0.5 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">SiteMinder / Cloudbeds</div>
                <div className="text-white/80">外挂式 AI 聊天窗口，无法访问底层业务数据</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">D-EDGE / DerbySoft</div>
                <div className="text-white/80">无 AI 功能，依赖人工报表分析</div>
              </div>
              <div className="p-4 rounded-xl bg-cyan-glow/5 border border-cyan-glow/20">
                <div className="text-sm text-cyan-glow mb-1">HotelByte</div>
                <div className="text-white">Data Agent 原生运行于底层，统一联邦查询 MySQL / TDengine / Redis / MongoDB / ES 等多源数据</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Integration Notes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">集成方式</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'REST API', desc: '标准 HTTP/JSON 接口，支持所有主流编程语言调用。' },
            { title: 'WebSocket 流式', desc: '实时流式响应，适合长查询和持续数据监控场景。' },
            { title: 'RBAC 兼容', desc: '与 HotelByte 现有权限体系完全兼容，无需额外配置。' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AEO — How it works */}
      <HowItWorks
        title={isEn ? 'How AI-Native Automations ship' : 'AI 原生自动化如何落地'}
        subtitle={isEn
          ? 'Connect your data, ask in natural language, and ship reviewable insights.'
          : '接入数据、用自然语言提问、发布可审核的洞察。'}
        steps={isEn
          ? [
              { name: 'Connect data sources', text: 'Plug the federated query engine into MySQL, TDengine, Redis, MongoDB, and Elasticsearch. HotelByte RBAC and masking apply immediately.' },
              { name: 'Ask in natural language', text: 'Non-technical teams ask the Data Agent in natural language. SQL is auto-generated, optimized, and masked before execution.' },
              { name: 'Publish reviewable insights', text: 'Each insight ships with audit context, masking evidence, and lineage so commercial, ops, and finance teams share the same answer.' }
            ]
          : [
              { name: '连接数据源', text: '把联邦查询引擎接入 MySQL、TDengine、Redis、MongoDB、Elasticsearch。HotelByte 的 RBAC 与脱敏立即生效。' },
              { name: '用自然语言提问', text: '非技术团队以自然语言向 Data Agent 提问,SQL 自动生成并优化,在执行前完成脱敏。' },
              { name: '发布可审核的洞察', text: '每条洞察都附带审计上下文、脱敏证据与字段血缘,让商业、运营、财务团队基于同一份答案协作。' }
            ]}
      />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold mb-4">准备好让 AI 驱动您的数据洞察了吗？</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          从自然语言查询到自动化报告生成，Data Agent 将彻底改变您的团队与数据交互的方式。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/compare" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow transition-all duration-300">
            查看竞品对比 <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300">
            查看 API 文档
          </button>
        </div>
      </motion.div>
    </div>
  );
}
