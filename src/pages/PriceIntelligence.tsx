import { motion } from 'framer-motion';
import { LineChart, Zap, Clock, ShieldCheck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { HowItWorks } from '../components/HowItWorks';
import { getProductBySlug } from '../data/products';
import { useI18n } from '../i18n';

export default function PriceIntelligence() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const product = getProductBySlug('price-intelligence')!;
  const route = SITE_ROUTES.priceIntelligence;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is Lookout Price Intelligence?', a: product.descriptionEn },
          { q: 'How does Lookout store rate facts?', a: 'All supplier rate facts, latency, and rate-limit hit rates are stored in TDengine for billion-row aggregation in seconds.' },
          { q: 'Can Lookout handle supplier rate limits?', a: 'Yes. Lookout learns each supplier’s rate-limit pattern and gracefully backs off on 429s to keep the system stable.' }
        ]
      : [
          { q: 'Lookout 价格情报能做什么?', a: product.description },
          { q: 'Lookout 如何存储价格事实数据?', a: '所有供应商询价事实、延迟与速率限制命中率都存储在 TDengine 中,支持亿级数据秒级聚合。' },
          { q: 'Lookout 如何应对供应商限流?', a: 'Lookout 会学习每个供应商的速率限制模式,在收到 429 报错时智能退让,保障系统整体稳定性。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Stand up Lookout price intelligence in three steps'
      : '三步上线 Lookout 价格情报',
    isEn
      ? 'From supplier adapters to time-series storage to simulation-driven decisions, Lookout plugs into your distribution stack in three steps.'
      : '从供应商适配器、TDengine 时序存储到模拟驱动的决策,Lookout 用三步接入你的分销系统。',
    isEn
      ? [
          { name: 'Connect suppliers', text: 'Activate the unified adapter for 27+ suppliers, set supplier credentials and rate budgets. Lookout learns the rate-limit window per partner.' },
          { name: 'Stream rate facts', text: 'High-concurrency crawlers stream rate facts, latency, and rate-limit hits into TDengine. Billion-row aggregations return in seconds.' },
          { name: 'Simulate pricing decisions', text: 'Anomaly detection and pricing simulations run before any enabled save, with evidence-bound audit context for commercial teams.' }
        ]
      : [
          { name: '连接供应商', text: '启用 27+ 供应商的统一适配器,设置供应商凭证与速率预算。Lookout 自动学习每个合作伙伴的限流窗口。' },
          { name: '流式写入价格事实', text: '高并发爬虫把价格事实、延迟、限流命中率持续写入 TDengine,亿级聚合秒级返回。' },
          { name: '模拟定价决策', text: '异常检测与价格模拟在启用保存前完成,商业团队获得证据绑定的审计上下文。' }
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-purple/10 border border-electric-purple/20 text-xs font-medium text-electric-purple mb-6">
          Price Intelligence & Benchmarking
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          洞悉市场，<br />
          <span className="text-gradient">守护您的利润空间</span>
        </h1>
        <p className="text-lg text-white/60 font-light">
          Lookout 提供工业级的高并发价格情报抓取、时序存储与自动化比价服务，专为大规模 B2B 酒店分销设计。
        </p>
      </motion.div>

      {/* Hero Visual / Dashboard Abstract */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mb-32"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-electric-purple/10 to-transparent blur-3xl -z-10"></div>
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-2 overflow-hidden shadow-2xl">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">竞对价格监控大盘</h3>
                <div className="text-sm text-white/50">Report ID: LKT-20260602-001 | 实时更新</div>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                  监控酒店数: <span className="text-white font-mono ml-2">1,000+</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                  请求量级: <span className="text-cyan-glow font-mono ml-2">900,000+ / 周期</span>
                </div>
              </div>
            </div>
            
            {/* Abstract Chart Area */}
            <div className="h-64 flex items-end gap-2">
              {[40, 60, 45, 80, 55, 90, 70, 100, 65, 85, 50, 75].map((height, i) => (
                <div key={i} className="flex-1 relative group">
                  <div 
                    className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-electric-purple/20 to-cyan-glow/50 transition-all duration-300 group-hover:to-cyan-glow"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-32">
        {[
          {
            icon: LineChart,
            title: "TDengine 时序事实存储",
            desc: "抛弃传统关系型数据库的性能瓶颈。所有供应商询价事实、延迟、速率限制（Rate-Limit）命中率及报价套餐均存储于高性能 TDengine 中，支持海量数据秒级聚合。"
          },
          {
            icon: Zap,
            title: "高并发智能爬虫",
            desc: "依托 HotelByte 底层的 HotelRates 接口引擎，Lookout 可并发处理多供应商（如 Hotelbeds, Dida 等）、多客源国、多提前预订期的笛卡尔积式海量比价请求。"
          },
          {
            icon: Clock,
            title: "全自动化监控闭环",
            desc: "支持 pay_per_run 与 monthly_quota 订阅模式。通过分布式的 Cron Job 管理，实现无缝的任务调度、覆盖检查、Excel 报表生成及通知下发。"
          },
          {
            icon: ShieldCheck,
            title: "生产级速率熔断保护",
            desc: "严格的 API 限流策略，基于凭证预算和 learned limit，在面对上游供应商 429 报错时智能降级退让，保障系统整体稳定性不被比价任务拖垮。"
          }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <feature.icon className="w-8 h-8 text-electric-purple mb-6" />
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-white/60 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
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
          <p className="text-white/60 font-light">专为海量价格数据设计的时序数据处理架构</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: BarChart3, title: '基于 TDengine 的时序数据存储', desc: '支持亿级数据秒级聚合，专为价格时序数据优化，查询性能比传统数据库提升 100 倍。' },
            { icon: Zap, title: '分布式爬虫集群', desc: '单机可达 10,000+ QPS，支持水平扩展。智能任务调度确保高优先级监控任务优先执行。' },
            { icon: ShieldCheck, title: '智能速率限制学习与自适应退让', desc: '自动学习每个供应商的速率限制模式，在触发 429 前主动退让，最大化抓取效率。' },
            { icon: LineChart, title: '多维度价格异常检测与预警', desc: '基于统计模型和机器学习的价格异常检测，自动识别供应商报价异常、价格倒挂等问题。' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-8 h-8 text-electric-purple mb-4" />
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
                大多数竞品将价格监控作为附加功能，而 Lookout 是专为 B2B 酒店分销场景从零构建的价格情报引擎。
              </p>
              <div className="space-y-4">
                {[
                  'SiteMinder 无原生价格情报功能，需第三方集成',
                  'Cloudbeds 的定价工具仅支持基础规则，无 AI 驱动的动态定价',
                  'D-EDGE 价格工具欧洲 focused，不支持中国供应商',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-electric-purple mt-0.5 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">SiteMinder</div>
                <div className="text-white/80">依赖第三方价格工具，无原生时序数据存储</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">Cloudbeds</div>
                <div className="text-white/80">基础定价规则引擎，无大规模并发比价能力</div>
              </div>
              <div className="p-4 rounded-xl bg-electric-purple/5 border border-electric-purple/20">
                <div className="text-sm text-electric-purple mb-1">HotelByte Lookout</div>
                <div className="text-white">原生时序数据库 + 分布式爬虫 + AI 异常检测</div>
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
            { title: 'REST API', desc: '标准 HTTP/JSON 接口，支持查询监控任务、获取比价结果。' },
            { title: 'Webhook 回调', desc: '价格异常时实时推送通知，支持 Slack、钉钉等 IM 工具集成。' },
            { title: '报表导出', desc: '支持 Excel、PDF 格式导出，可按周期自动生成并邮件发送。' },
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
        title={isEn ? 'How Lookout ships' : 'Lookout 的落地步骤'}
        subtitle={isEn
          ? 'Connect suppliers, stream rate facts, simulate pricing decisions.'
          : '连接供应商、流式写入价格事实、模拟定价决策。'}
        steps={isEn
          ? [
              { name: 'Connect suppliers', text: 'Activate the unified adapter for 27+ suppliers, set supplier credentials and rate budgets. Lookout learns the rate-limit window per partner.' },
              { name: 'Stream rate facts', text: 'High-concurrency crawlers stream rate facts, latency, and rate-limit hits into TDengine. Billion-row aggregations return in seconds.' },
              { name: 'Simulate pricing decisions', text: 'Anomaly detection and pricing simulations run before any enabled save, with evidence-bound audit context for commercial teams.' }
            ]
          : [
              { name: '连接供应商', text: '启用 27+ 供应商的统一适配器,设置供应商凭证与速率预算。Lookout 自动学习每个合作伙伴的限流窗口。' },
              { name: '流式写入价格事实', text: '高并发爬虫把价格事实、延迟、限流命中率持续写入 TDengine,亿级聚合秒级返回。' },
              { name: '模拟定价决策', text: '异常检测与价格模拟在启用保存前完成,商业团队获得证据绑定的审计上下文。' }
            ]}
      />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold mb-4">让数据驱动您的定价策略</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          从实时监控到历史趋势分析，Lookout 让您始终掌握市场动态，确保报价竞争力。
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
