import { motion } from 'framer-motion';
import { ChevronRight, Database, Activity, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Home() {
  const { t, locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-28 lg:pb-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-glow mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-glow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-glow"></span>
            </span>
            {t('hero.badge')}
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-8">
            {t('hero.title1')} <br />
            <span className="text-gradient">{t('hero.title2')}</span> <br />
            {t('hero.title3')}
          </h1>
          
          <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl font-light">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="#subscriptions" className="px-8 py-4 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 flex items-center gap-2 group">
              {t('hero.cta.pricing')}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300">
              {t('hero.cta.docs')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* AI-Native Foundation Banner */}
      <section className="py-16 relative bg-gradient-to-b from-cyan-glow/5 to-transparent border-y border-cyan-glow/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-4">
                {isEn ? 'Our Technology Belief' : '我们的技术信仰'}
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                {isEn ? 'AI-Native by Design' : 'AI-Native 原生架构'}
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                {isEn 
                  ? 'Every product is built on a unified AI-Native foundation: model-agnostic LLM orchestration, multi-source federated queries, and self-evolving agents. These capabilities are woven into the architecture from day one.'
                  : '所有产品均构建于统一的 AI-Native 底座之上：模型无关的 LLM 编排、多源异构联邦查询、自进化智能体。这些能力从架构设计之初即原生融入，而非后期叠加。'}
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 w-full lg:w-auto">
              {[
                { label: isEn ? 'Model-Agnostic' : '模型无关', value: isEn ? 'OpenAI / Anthropic / Any SOTA' : 'OpenAI / Anthropic / 任意 SOTA' },
                { label: isEn ? 'Federated Query' : '联邦查询', value: isEn ? 'MySQL / TDengine / Redis / ES...' : 'MySQL / TDengine / Redis / ES...' },
                { label: isEn ? 'Self-Evolving' : '自进化', value: isEn ? 'Continuous learning from feedback' : '持续学习业务反馈' },
                { label: isEn ? 'Data Governance' : '数据治理', value: isEn ? 'Built-in masking & RBAC' : '内置脱敏与权限隔离' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-white/50 mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Lines Grid */}
      <section id="products" className="py-24 relative bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">{t('products.title')}</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {isEn 
                ? 'Five product lines built on the AI-Native foundation. Purpose-built for hotel distribution, ready for the enterprise.'
                : '五大产品线，基于 AI-Native 底座构建。为酒店分销而生，为企业级场景而备。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Card 1 - Lookout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-electric-purple/30 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-electric-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-6 h-6 text-electric-purple" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t('product.lookout.name')}</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('product.lookout.desc')}
              </p>
              <Link to="/products/price-intelligence" className="inline-flex items-center gap-2 text-electric-purple font-medium group-hover:gap-3 transition-all">
                {t('product.lookout.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Product Card 2 - Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t('product.dist.name')}</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('product.dist.desc')}
              </p>
              <Link to="/products/b2b-distribution" className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                {t('product.dist.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Product Card 3 - TraceSight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-glow/30 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-6 h-6 text-cyan-glow" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t('product.tracesight.name')}</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('product.tracesight.desc')}
              </p>
              <Link to="/products/tracesight" className="inline-flex items-center gap-2 text-cyan-glow font-medium group-hover:gap-3 transition-all">
                {t('product.tracesight.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Product Card 4 - RevenuePilot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-electric-purple/30 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-electric-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-6 h-6 text-electric-purple" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t('product.revenuepilot.name')}</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('product.revenuepilot.desc')}
              </p>
              <Link to="/products/revenuepilot" className="inline-flex items-center gap-2 text-electric-purple font-medium group-hover:gap-3 transition-all">
                {t('product.revenuepilot.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Product Card 5 - DeepSeek Appliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-glow/30 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Cpu className="w-6 h-6 text-cyan-glow" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{t('product.ds4.name')}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {t('product.ds4.desc')}
                  </p>
                  <Link to="/products/deepseek-appliance" className="inline-flex items-center gap-2 text-cyan-glow font-medium group-hover:gap-3 transition-all">
                    {t('product.ds4.link')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: isEn ? 'Model Size' : '模型体积', value: '76GB' },
                      { label: isEn ? 'Min Memory' : '最低内存', value: '128GB' },
                      { label: isEn ? 'Parameters' : '参数量', value: '284B' },
                      { label: isEn ? 'vs. Competitor' : '竞品成本比', value: '1/10' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-cyan-glow/5 border border-cyan-glow/10 text-center">
                        <div className="text-sm text-white/50 mb-1">{stat.label}</div>
                        <div className="text-lg font-bold text-cyan-glow">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TraceSight Teaser */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 lg:pr-12">
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                TraceSight <span className="text-white/40">追光</span><br />
                <span className="text-gradient">{isEn ? 'Full-Linkage Diagnostics' : '全链路智能诊断'}</span>
              </h2>
              <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
                {isEn 
                  ? 'Break down information silos. Compress cross-team troubleshooting from 2-4 hours to under 10 minutes.'
                  : '打破信息孤岛。将原本需要 2-4 小时的跨团队故障排查时间，压缩至惊人的 10 分钟以内。'}
              </p>
              <ul className="space-y-4 mb-10">
                {(isEn ? [
                  'Full-linkage request tracing and log aggregation',
                  'LLM-powered automated root-cause analysis',
                  'Sub-second price and mapping anomaly detection',
                  '4-party (platform/tenant/customer/supplier) collaboration',
                ] : [
                  '全链路请求追踪与日志聚合',
                  '基于大模型的自动化智能诊断',
                  '价格与房型映射异常秒级定位',
                  '支持多方（平台/租户/客户/供应商）协同排查',
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-glow"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/products/tracesight" className="inline-block px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-abyss-blue transition-colors font-medium">
                {isEn ? 'Explore TraceSight' : '查看 TraceSight 详情'}
              </Link>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-glow to-electric-purple"></div>
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="ml-4 text-xs font-mono text-white/40">tracesight-trace-view.tsx</div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group-hover:border-cyan-glow/30 transition-colors">
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
          </div>
        </div>
      </section>

      {/* Competitor Teaser */}
      <section className="py-24 relative bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                {isEn ? 'Why ' : '为什么选择 '}<span className="text-gradient">HotelByte</span>{isEn ? '?' : '？'}
              </h2>
              <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
                {t('why.subtitle')}
              </p>
              <ul className="space-y-4 mb-10">
                {[t('why.point1'), t('why.point2'), t('why.point3'), t('why.point4')].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-glow"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/compare" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-abyss-blue transition-colors font-medium">
                {t('why.cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: t('why.stat.ai'), value: 'HotelByte', highlight: true },
                  { label: t('why.stat.pricing'), value: isEn ? 'Usage-based' : '按用量付费', highlight: true },
                  { label: t('why.stat.b2b'), value: isEn ? '4-Tier' : '四级实体架构', highlight: true },
                  { label: t('why.stat.suppliers'), value: '27+', highlight: true },
                ].map((stat, i) => (
                  <div key={i} className={`p-6 rounded-2xl text-center ${
                    stat.highlight ? 'bg-cyan-glow/5 border border-cyan-glow/20' : 'bg-white/5'
                  }`}>
                    <div className="text-sm text-white/50 mb-2">{stat.label}</div>
                    <div className="text-lg font-bold text-cyan-glow">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscriptions */}
      <section id="subscriptions" className="py-32 relative bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">{t('subs.title')}</h2>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
              {t('subs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-2xl font-bold mb-2">{t('subs.starter.name')}</h3>
              <p className="text-white/50 mb-8 h-12">{t('subs.starter.desc')}</p>
              <div className="text-4xl font-display font-bold mb-8">
                {t('subs.starter.price')}
              </div>
              <ul className="space-y-4 mb-8">
                {[t('subs.starter.f1'), t('subs.starter.f2'), t('subs.starter.f3'), t('subs.starter.f4')].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <ChevronRight className="w-4 h-4 text-white/40" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white hover:text-abyss-blue transition-colors font-medium">
                {t('subs.starter.cta')}
              </button>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-2xl font-bold mb-2">{t('subs.growth.name')}</h3>
              <p className="text-white/50 mb-8 h-12">{t('subs.growth.desc')}</p>
              <div className="text-4xl font-display font-bold mb-8">
                {t('subs.growth.price')}
              </div>
              <ul className="space-y-4 mb-8">
                {[t('subs.growth.f1'), t('subs.growth.f2'), t('subs.growth.f3'), t('subs.growth.f4')].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <ChevronRight className="w-4 h-4 text-white/40" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white hover:text-abyss-blue transition-colors font-medium">
                {t('subs.growth.cta')}
              </button>
            </div>

            {/* All-in-One */}
            <div className="p-8 rounded-3xl border border-cyan-glow/50 bg-cyan-glow/[0.05] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-glow to-electric-purple text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                {t('subs.recommended')}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-cyan-glow">{t('subs.enterprise.name')}</h3>
              <p className="text-white/70 mb-8 h-12">{t('subs.enterprise.desc')}</p>
              <div className="text-4xl font-display font-bold mb-8">
                {t('subs.enterprise.price')}
              </div>
              <ul className="space-y-4 mb-8">
                {[t('subs.enterprise.f1'), t('subs.enterprise.f2'), t('subs.enterprise.f3'), t('subs.enterprise.f4'), t('subs.enterprise.f5')].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <ChevronRight className="w-4 h-4 text-cyan-glow" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-glow to-electric-purple text-white font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-shadow">
                {t('subs.enterprise.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
