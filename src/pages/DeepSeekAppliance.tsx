import { motion } from 'framer-motion';
import { Cpu, HardDrive, Zap, Shield, ArrowRight, CheckCircle2, Server, Gauge, Database, Code, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import { HowItWorks } from '../components/HowItWorks';

const tiers = [
  {
    icon: Server,
    name: 'DGX Spark 入门版',
    nameEn: 'DGX Spark Entry',
    price: '¥3-4 万',
    priceEn: '¥30-40K',
    specs: '128GB 统一内存 / DS4 Q2 量化',
    specsEn: '128GB Unified Memory / DS4 Q2 Quant',
    perf: '~18 tok/s',
    features: ['NVIDIA DGX Spark GB10', 'DS4 原生 CUDA 支持', '预装 284B 参数模型', '即插即用，开箱即用'],
    featuresEn: ['NVIDIA DGX Spark GB10', 'Native DS4 CUDA backend', 'Pre-loaded 284B model', 'Plug & play'],
    highlight: false,
  },
  {
    icon: Cpu,
    name: 'Mac Studio 性能版',
    nameEn: 'Mac Studio Pro',
    price: '¥8-10 万',
    priceEn: '¥80-100K',
    specs: '512GB 统一内存 / DS4 Q4 量化',
    specsEn: '512GB Unified Memory / DS4 Q4 Quant',
    perf: '~36 tok/s',
    features: ['Apple M3 Ultra 芯片', 'DS4 原生 Metal 支持', '最高推理性能', '静音设计，适合办公环境'],
    featuresEn: ['Apple M3 Ultra chip', 'Native DS4 Metal backend', 'Peak inference speed', 'Silent, office-friendly'],
    highlight: true,
  },
  {
    icon: Shield,
    name: '国产 GPU 合规版',
    nameEn: 'Domestic GPU Compliant',
    price: '¥23-37 万',
    priceEn: '¥230-370K',
    specs: '双卡 48GB×2 / 512GB DDR4',
    specsEn: 'Dual 48GB×2 / 512GB DDR4',
    perf: '~25 tok/s',
    features: ['摩尔线程 MTT S4000 双卡', '完全国产化合规', 'vLLM + DS4 混合后端', '政企金融首选'],
    featuresEn: ['Moore Threads MTT S4000 dual', 'Full domestic compliance', 'vLLM + DS4 hybrid backend', 'Gov/enterprise preferred'],
    highlight: false,
  },
];

const advantages = [
  {
    icon: HardDrive,
    title: '76GB 模型体积',
    titleEn: '76GB Model Size',
    desc: 'DS4 的 2-bit 不对称量化技术将 284B 参数模型压缩至约 76GB，128GB 内存即可流畅运行。',
    descEn: 'DS4\'s 2-bit asymmetric quantization compresses 284B params to ~76GB. Runs smoothly on 128GB memory.',
  },
  {
    icon: Zap,
    title: '1/10 成本优势',
    titleEn: '1/10th the Cost',
    desc: '竞品 DeepSeek 一体机价格普遍在 20-300 万元，DS4 方案入门级仅需 3-4 万元。',
    descEn: 'Competing DeepSeek appliances cost ¥200K-3M. DS4 entry-level starts at just ¥30-40K.',
  },
  {
    icon: Gauge,
    title: '百万 Token 长上下文',
    titleEn: '1M Token Context',
    desc: 'KV 缓存磁盘化技术，使百万 token 长上下文推理的内存需求大幅降低。',
    descEn: 'KV cache disk-offloading slashes memory needs for million-token long-context inference.',
  },
  {
    icon: Shield,
    title: '数据不出设备',
    titleEn: 'Data Never Leaves',
    desc: '私有化部署，满足金融、医疗、法律等行业的数据合规与隐私保护要求。',
    descEn: 'On-premise deployment satisfies data compliance for finance, healthcare, and legal industries.',
  },
];

const enterpriseApps = [
  {
    icon: Database,
    title: '智能知识库 (RAG)',
    titleEn: 'Intelligent Knowledge Base',
    desc: '内置企业级 RAG 系统。自动解析 PDF、Word、Excel 等文档，构建可检索的向量知识库。支持权限隔离，不同部门访问不同知识域。',
    descEn: 'Built-in enterprise RAG system. Auto-parse PDFs, Word, Excel into searchable vector knowledge bases. Department-level access isolation.',
  },
  {
    icon: Code,
    title: 'Data Agent 数据智能体',
    titleEn: 'Data Agent',
    desc: '用自然语言查询业务数据。"上周华东区预订量环比下降的原因"——自动关联多表、生成 SQL、输出洞察报告，无需数据团队介入。',
    descEn: 'Query business data in natural language. "Why did East China bookings drop last week?" — auto-joins tables, generates SQL, outputs insight reports. No data team needed.',
  },
  {
    icon: Activity,
    title: 'Self-Evolving 自进化',
    titleEn: 'Self-Evolving Capability',
    desc: 'Agent 通过持续学习企业内部的问答反馈，自动优化检索策略和回答质量。越用越懂您的业务，真正实现业务级别的开箱即用。',
    descEn: 'Agents continuously learn from internal Q&A feedback to auto-optimize retrieval strategies and response quality. The more you use it, the better it understands your business.',
  },
  {
    icon: Zap,
    title: '深度软件优化',
    titleEn: 'Deep Software Optimization',
    desc: '无需复杂的模型微调或 prompt 工程。预置酒店分销、金融合规、法律审查等垂直场景模板，插电即用，30 分钟完成首次部署。',
    descEn: 'No complex fine-tuning or prompt engineering needed. Pre-built vertical templates for hotel distribution, finance compliance, legal review. Plug in and deploy in 30 minutes.',
  },
];

export default function DeepSeekAppliance() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const pick = (zh: string, en: string) => (isEn ? en : zh);
  const product = getProductBySlug('deepseek-appliance')!;
  const route = SITE_ROUTES.deepseekAppliance;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is the DeepSeek V4-Flash Appliance?', a: product.descriptionEn },
          { q: 'How is the 284B model compressed to 76GB?', a: 'The DS4 inference engine applies 2-bit asymmetric quantization: routed MoE expert layers are aggressively compressed while shared experts and attention layers stay at Q8 precision.' },
          { q: 'Can the appliance be deployed on-prem in 30 minutes?', a: 'Yes. The DeepSeek V4-Flash Appliance runs on 128GB of unified memory, supports Metal / CUDA / ROCm, and ships with a built-in knowledge base, Data Agent, and self-evolving engine for on-prem enterprise AI.' }
        ]
      : [
          { q: 'DeepSeek V4-Flash 一体机是什么?', a: product.description },
          { q: '284B 参数模型如何压缩到 76GB?', a: 'DS4 推理引擎采用 2-bit 不对称量化:对路由 MoE 专家层激进压缩,共享专家与注意力层保持 Q8 精度,实现质量与体积的平衡。' },
          { q: '一体机可以 30 分钟完成私有化部署吗?', a: '可以。DeepSeek V4-Flash 一体机在 128GB 统一内存上即可运行,原生支持 Metal / CUDA / ROCm,内置知识库、Data Agent 与自进化引擎。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Deploy the DeepSeek V4-Flash Appliance in three steps'
      : '三步部署 DeepSeek V4-Flash 一体机',
    isEn
      ? 'From unboxing to first inference to domain-specific fine-tuning, the appliance ships as a turnkey enterprise AI platform.'
      : '从拆箱到首次推理再到垂直场景微调,一体机是开箱即用的企业 AI 平台。',
    isEn
      ? [
          { name: 'Plug in and power on', text: 'Connect the appliance, allocate 128GB of unified memory, and boot. The DS4 inference engine boots in 30 minutes on Apple Silicon, NVIDIA, or AMD.' },
          { name: 'Connect knowledge and data', text: 'The built-in RAG knowledge base parses documents with department-level isolation. The Data Agent federates queries across your business data with RBAC.' },
          { name: 'Run pre-built templates', text: 'Hotel distribution, finance compliance, and legal review templates are pre-installed. The Self-Evolving engine starts learning from day-one feedback.' }
        ]
      : [
          { name: '通电即开机', text: '接入一体机,分配 128GB 统一内存,DS4 推理引擎在 Apple Silicon、NVIDIA、AMD 上 30 分钟内完成冷启动。' },
          { name: '连接知识与数据', text: '内置 RAG 知识库自动解析文档并按部门隔离,Data Agent 跨业务数据做联邦查询,RBAC 全程生效。' },
          { name: '运行预置模板', text: '酒店分销、金融合规、法律审查模板已预置,自进化引擎从第一天起持续学习业务反馈。' }
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
          Private AI Inference Appliance
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          DeepSeek V4-Flash <br />
          <span className="text-gradient">{pick('私有化 AI 一体机', 'Private AI Appliance')}</span>
        </h1>
        <p className="text-lg text-white/60 font-light">
          {pick(
            '不只是推理硬件，更是一套开箱即用的企业 AI 应用平台。内置知识库、Data Agent 与自进化能力，让 AI 在您的业务中真正落地。',
            'More than inference hardware: a business-ready enterprise AI platform with built-in knowledge base, Data Agent, and self-evolving capabilities.'
          )}
        </p>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
      >
        {[
          { value: '284B', label: '模型参数量', labelEn: 'Parameters' },
          { value: '76GB', label: 'Q2 量化后体积', labelEn: 'Q2 Quantized Size' },
          { value: '128GB', label: '最低内存要求', labelEn: 'Min Memory' },
          { value: '1/10', label: '竞品成本比', labelEn: 'vs. Competitor Cost' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-display font-bold text-cyan-glow mb-2">{stat.value}</div>
            <div className="text-sm text-white/60">{isEn ? stat.labelEn : stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Enterprise AI Apps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-6">
            Business-Ready Out-of-the-Box
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">{pick('内置企业级 AI 应用', 'Built-in Enterprise AI Apps')}</h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            {pick(
              '无需复杂配置，无需专业 AI 团队。预置知识库、Data Agent 和自进化引擎，插电即可开始为您的业务创造价值。',
              'No complex setup or specialist AI team. Pre-built knowledge base, Data Agent, and self-evolving engine start creating business value after deployment.'
            )}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {enterpriseApps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-8 h-8 text-cyan-glow mb-4" />
              <h3 className="text-lg font-bold mb-2">{isEn ? item.titleEn : item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{isEn ? item.descEn : item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">{pick('核心技术亮点', 'Core Technology Highlights')}</h2>
          <p className="text-white/60 font-light">
            {pick('DS4 引擎专为 DeepSeek V4 Flash 量身定制的专用推理架构', 'DS4 is a purpose-built inference architecture tuned for DeepSeek V4 Flash')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-8 h-8 text-cyan-glow mb-4" />
              <h3 className="text-lg font-bold mb-2">{isEn ? item.titleEn : item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{isEn ? item.descEn : item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Three Tiers */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">{pick('三档配置方案', 'Three Deployment Tiers')}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {pick(
              '从入门验证到企业合规，为不同预算和场景提供最优硬件组合。',
              'From entry validation to enterprise compliance, choose the right hardware package for budget and scenario.'
            )}
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
              className={`p-8 rounded-3xl border bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden ${
                tier.highlight ? 'border-cyan-glow/50' : 'border-white/10'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-glow to-electric-purple text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  RECOMMENDED
                </div>
              )}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                tier.highlight ? 'bg-cyan-glow/10' : 'bg-white/5'
              }`}>
                <tier.icon className={`w-6 h-6 ${tier.highlight ? 'text-cyan-glow' : 'text-white/70'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{isEn ? tier.nameEn : tier.name}</h3>
              <div className="text-sm text-white/50 mb-4">{isEn ? tier.specsEn : tier.specs}</div>
              <div className="text-3xl font-display font-bold text-cyan-glow mb-2">{isEn ? tier.priceEn : tier.price}</div>
              <div className="text-sm text-white/50 mb-6">{pick('预估零售价（含毛利）', 'Estimated retail price with margin')}</div>
              <div className="p-3 rounded-lg bg-white/5 mb-6 text-center">
                <span className="text-xs text-white/50">{pick('推理速度 ', 'Inference speed ')}</span>
                <span className="text-lg font-bold text-white">{tier.perf}</span>
              </div>
              <ul className="space-y-3">
                {(isEn ? tier.featuresEn : tier.features).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-cyan-glow' : 'text-white/40'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitor Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold mb-4">{pick('与竞品的核心差异', 'Core Difference vs. Competitors')}</h2>
              <p className="text-white/60 mb-8">
                {pick(
                  '市场上 DeepSeek 一体机价格普遍在 20-300 万元，且多为“重硬件、轻软件”。HotelByte DS4 方案通过软件创新实现极致性价比。',
                  'Most DeepSeek appliances are priced around ¥200K-3M and are hardware-heavy, software-light. HotelByte DS4 uses software innovation to deliver stronger cost-performance.'
                )}
              </p>
              <div className="space-y-4">
                {[
                  pick('竞品：20-300 万元，依赖硬件堆叠', 'Competitors: ¥200K-3M, mostly hardware stacking'),
                  pick('竞品：通用推理框架，非针对 DeepSeek 优化', 'Competitors: generic inference frameworks, not DeepSeek-tuned'),
                  pick('竞品：软件功能简单，需额外采购', 'Competitors: basic software, add-ons required'),
                  pick('HotelByte：3-37 万元，软件定义性价比', 'HotelByte: ¥30K-370K, software-defined cost-performance'),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${i === 3 ? 'text-cyan-glow' : 'text-white/40'}`} />
                    <span className={i === 3 ? 'text-white' : 'text-white/80'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">{pick('传统 DeepSeek 一体机', 'Traditional DeepSeek appliance')}</div>
                <div className="text-white/80">{pick('¥20-300 万 / 硬件堆叠 / 软件功能简单', '¥200K-3M / hardware stacking / basic software')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">{pick('公有云 API', 'Public cloud API')}</div>
                <div className="text-white/80">{pick('数据出域风险 / 按 token 计费不可控 / 网络依赖', 'Data residency risk / unpredictable token cost / network dependency')}</div>
              </div>
              <div className="p-4 rounded-xl bg-cyan-glow/5 border border-cyan-glow/20">
                <div className="text-sm text-cyan-glow mb-1">HotelByte DS4 一体机</div>
                <div className="text-white">{pick('¥3-37 万 / 软件定义性价比 / 数据不出设备 / 开箱即用', '¥30K-370K / software-defined cost-performance / on-device data / ready out of the box')}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      {/* AEO — How it works */}
      <HowItWorks
        title={isEn ? 'How the DeepSeek V4-Flash Appliance ships' : 'DeepSeek V4-Flash 一体机如何交付'}
        subtitle={isEn
          ? 'Plug in, connect knowledge and data, and run pre-built templates from day one.'
          : '通电即开机、连接知识与数据、当天即可运行预置模板。'}
        steps={isEn
          ? [
              { name: 'Plug in and power on', text: 'Connect the appliance, allocate 128GB of unified memory, and boot. The DS4 inference engine boots in 30 minutes on Apple Silicon, NVIDIA, or AMD.' },
              { name: 'Connect knowledge and data', text: 'The built-in RAG knowledge base parses documents with department-level isolation. The Data Agent federates queries across your business data with RBAC.' },
              { name: 'Run pre-built templates', text: 'Hotel distribution, finance compliance, and legal review templates are pre-installed. The Self-Evolving engine starts learning from day-one feedback.' }
            ]
          : [
              { name: '通电即开机', text: '接入一体机,分配 128GB 统一内存,DS4 推理引擎在 Apple Silicon、NVIDIA、AMD 上 30 分钟内完成冷启动。' },
              { name: '连接知识与数据', text: '内置 RAG 知识库自动解析文档并按部门隔离,Data Agent 跨业务数据做联邦查询,RBAC 全程生效。' },
              { name: '运行预置模板', text: '酒店分销、金融合规、法律审查模板已预置,自进化引擎从第一天起持续学习业务反馈。' }
            ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold mb-4">{pick('让 AI 在您的业务中真正落地', 'Make AI Real in Your Business')}</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          {pick(
            '无需组建 AI 团队，无需漫长的模型调优。插电即用，30 分钟完成首次部署，持续自进化，越用越懂您的业务。',
            'No need to hire an AI team or run long model-tuning projects. Plug in, deploy in 30 minutes, and let the system learn your business over time.'
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/compare" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow transition-all duration-300">
            {pick('查看竞品对比', 'View Comparison')} <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300">
            {pick('预约技术交流', 'Book Technical Session')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
