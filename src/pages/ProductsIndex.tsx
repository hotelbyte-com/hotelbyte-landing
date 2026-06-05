import { motion } from 'framer-motion';
import { Code, Activity, Database, Eye, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const productCards = [
  {
    icon: Code,
    slug: 'ai-automations',
    title: 'AI 原生自动化',
    titleEn: 'AI-Native Automations',
    shortDesc: 'Data Agent 智能体',
    shortDescEn: 'Data Agent Intelligence',
    desc: '内置 Data Agent 智能体。通过受治理的自然语言交互，实现跨数据库的智能检索与分析。让非技术团队也能像数据工程师一样获取洞察。',
    descEn: 'Built-in Data Agent. Governed natural language interaction for cross-database intelligent retrieval and analysis.',
    color: 'cyan-glow',
  },
  {
    icon: Activity,
    slug: 'price-intelligence',
    title: 'Lookout 价格情报',
    titleEn: 'Lookout Price Intelligence',
    shortDesc: 'Price Intelligence Engine',
    shortDescEn: 'Price Intelligence Engine',
    desc: '高并发价格爬虫引擎。提供实时的竞争基准测试与异常波动监控，助力收益最大化。将人工比价工作自动化。',
    descEn: 'High-concurrency price crawler. Real-time competitive benchmarking and anomaly monitoring to maximize revenue.',
    color: 'electric-purple',
  },
  {
    icon: Database,
    slug: 'b2b-distribution',
    title: '企业级分销底座',
    titleEn: 'Enterprise Distribution Base',
    shortDesc: 'B2B Distribution Infrastructure',
    shortDescEn: 'B2B Distribution Infrastructure',
    desc: '三层实体架构支撑。已标准集成 27+ 顶级酒店供应商，支持复杂的多层级代理生态与细粒度信用管理。',
    descEn: '3-tier entity architecture. 27+ top hotel suppliers pre-integrated. Complex multi-level agency ecosystem support.',
    color: 'white',
  },
  {
    icon: Eye,
    slug: 'tracesight',
    title: 'TraceSight 追光',
    titleEn: 'TraceSight',
    shortDesc: 'Full-Linkage Diagnostics',
    shortDescEn: 'Full-Linkage Diagnostics',
    desc: '全链路智能诊断平台。将会话级追踪、AI 根因分析与自主运维融为一体，将故障排查从 4 小时压缩至 10 分钟。',
    descEn: 'Full-linkage intelligent diagnostics. Session tracing, AI root-cause analysis, and autonomous ops in one platform.',
    color: 'cyan-glow',
  },
  {
    icon: ShieldCheck,
    slug: 'revenuepilot',
    title: 'RevenuePilot 益策',
    titleEn: 'RevenuePilot',
    shortDesc: 'AI Revenue Strategy Engine',
    shortDescEn: 'AI Revenue Strategy Engine',
    desc: 'AI 收益策略引擎。把加价、供应商、市场和客群策略做成可生成、可模拟、可受控保存的赚钱系统，并向收益 Agent 编排演进。',
    descEn: 'AI revenue strategy engine. Turn markup, supplier, market, and segment strategies into an AI-generated, simulated, governed-save profit system, evolving toward revenue agent orchestration.',
    color: 'electric-purple',
  },
  {
    icon: Cpu,
    slug: 'deepseek-appliance',
    title: 'DeepSeek V4-Flash 一体机',
    titleEn: 'DeepSeek V4-Flash Appliance',
    shortDesc: 'Private AI Inference',
    shortDescEn: 'Private AI Inference',
    desc: '基于 DS4 引擎的私有化 AI 推理方案。128GB 统一内存即可运行 284B 参数大模型，成本仅为竞品的 1/10。',
    descEn: 'Private AI inference powered by DS4 engine. Run 284B params on 128GB memory — at 1/10th competitor cost.',
    color: 'cyan-glow',
  },
];

export default function ProductsIndex() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white mb-6">
          Product Suite
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          {isEn ? 'Complete Product Ecosystem' : '完整产品生态'}
        </h1>
        <p className="text-lg text-white/60 font-light">
          {isEn 
            ? 'From AI automation to price intelligence, from distribution infrastructure to private AI inference. HotelByte covers the full hotel distribution technology stack.'
            : '从 AI 自动化到价格情报，从分销底座到私有化 AI 推理，HotelByte 提供酒店分销全链路的技术能力。'}
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {productCards.map((product, idx) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              to={`/products/${product.slug}`}
              className="group block p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-glow/30 hover:bg-white/[0.04] transition-all duration-500 h-full"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${
                product.color === 'cyan-glow' ? 'bg-cyan-glow/10' :
                product.color === 'electric-purple' ? 'bg-electric-purple/10' :
                'bg-white/10'
              }`}>
                <product.icon className={`w-6 h-6 ${
                  product.color === 'cyan-glow' ? 'text-cyan-glow' :
                  product.color === 'electric-purple' ? 'text-electric-purple' :
                  'text-white'
                }`} />
              </div>
              <div className="text-xs font-medium text-white/40 mb-2">{isEn ? product.shortDescEn : product.shortDesc}</div>
              <h3 className="text-2xl font-display font-bold mb-4">{isEn ? product.titleEn : product.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">{isEn ? product.descEn : product.desc}</p>
              <div className="inline-flex items-center gap-2 text-cyan-glow font-medium group-hover:gap-3 transition-all">
                {isEn ? 'Learn More' : '了解详情'} <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
