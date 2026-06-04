import { motion } from 'framer-motion';
import { Layers, Network, BookOpen, Key, Server, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function B2bDistribution() {
  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white mb-6">
          B2B Distribution & Infrastructure
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          构建于坚如磐石的<br />
          <span className="text-white">三层实体架构</span>之上
        </h1>
        <p className="text-lg text-white/60 font-light">
          这不是简单的 API 透传，而是支持复杂代理生态、多层级权限管控与 27+ 顶级供应商无缝对接的工程级操作平台。
        </p>
      </motion.div>

      {/* Architecture Visual */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent blur-3xl -z-10 rounded-full"></div>
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl flex flex-col items-center">
          
          <div className="w-full max-w-3xl space-y-6">
            {/* Platform Level */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <h3 className="text-xl font-bold text-white mb-2">Platform 层 (HotelByte)</h3>
              <p className="text-sm text-white/50">管理系统底层供应商对接、AI 引擎与全局元数据映射</p>
            </div>
            
            <div className="flex justify-center text-white/20">
              <div className="w-px h-6 bg-white/20"></div>
            </div>

            {/* Tenant Level */}
            <div className="p-6 rounded-2xl bg-white/[0.08] border border-white/10 text-center relative group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <h3 className="text-xl font-bold text-white mb-2">Tenant 层 (客户 / 分销商总部)</h3>
              <p className="text-sm text-white/50">拥有独立白标、全局加价规则、财务总账与供应商路由配置权</p>
            </div>

            <div className="flex justify-center gap-24 text-white/20">
              <div className="w-px h-6 bg-white/20 rotate-[20deg] transform origin-bottom"></div>
              <div className="w-px h-6 bg-white/20 -rotate-[20deg] transform origin-bottom"></div>
            </div>

            {/* Customer/Account Level */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.12] border border-white/10 text-center relative group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <h3 className="text-lg font-bold text-white mb-2">B2B 代理商 A</h3>
                <p className="text-sm text-white/50">受限的信用额度与独立的子账号权限</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.12] border border-white/10 text-center relative group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <h3 className="text-lg font-bold text-white mb-2">B2B 代理商 B</h3>
                <p className="text-sm text-white/50">独立的 API 访问令牌与特定加价策略</p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-32">
        {[
          {
            icon: Layers,
            title: "三层实体权限隔离",
            desc: "Tenant -> Customer -> Account。完美的 B2B 隔离体系，从代码源头确保越权访问的物理隔离。支持灵活的上下级代理体系及独立财务核算。"
          },
          {
            icon: Network,
            title: "27+ 全球顶级供应商集成",
            desc: "已完成对 Dida, Tourmind, Yalago, Hotelbeds 等超过 27 家主流供应商的标准接口对接。提供极简的统一查询与预订 API，屏蔽上游复杂逻辑。"
          },
          {
            icon: BookOpen,
            title: "内容即服务 (CaaS)",
            desc: "强大的房型匹配引擎。将复杂的 Hotel Mapping 与 Room Type Mapping 剥离为独立的微服务插件，为您的自有系统提供高精准度的静态数据清洗服务。"
          },
          {
            icon: Key,
            title: "细粒度信用管理",
            desc: "支持复杂的信用（Credit）授权、冻结与扣款流。完美支持预授权支付、B2B 月结额度管理等财务核心场景，确保资金流向清晰可控。"
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
            <feature.icon className="w-8 h-8 text-white mb-6" />
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
          <p className="text-white/60 font-light">为复杂 B2B 分销网络设计的工程级架构</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Server, title: 'Platform -> Tenant -> Customer -> Account 四级实体隔离', desc: '从数据库层面实现物理隔离，确保代理商数据完全独立，杜绝越权访问风险。' },
            { icon: Network, title: '27+ 供应商标准适配器', desc: '统一 API 屏蔽上游差异，新供应商接入仅需 2-4 周，而非传统的 3-6 个月。' },
            { icon: BookOpen, title: 'Hotel/Room Type Mapping 微服务', desc: 'ML 辅助的房型匹配算法，持续学习优化匹配准确率，减少人工维护成本。' },
            { icon: Key, title: '多币种信用额度管理与实时风控', desc: '支持预授权、月结、实时扣款等多种模式，内置风控规则防止信用透支。' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <item.icon className="w-8 h-8 text-white mb-4" />
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
                竞品多为 B2C 或单一酒店设计，而 HotelByte 的分销底座从第一天就是为复杂的 B2B 代理生态构建的。
              </p>
              <div className="space-y-4">
                {[
                  'SiteMinder 仅支持 OTA 渠道管理，无 B2B 代理体系',
                  'DerbySoft 企业级定价高，无中小客户友好方案',
                  'Mews 以 PMS 为主，分销能力为附加功能',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white mt-0.5 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">SiteMinder</div>
                <div className="text-white/80">B2C OTA 渠道管理，无多级代理支持</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">DerbySoft</div>
                <div className="text-white/80">企业级定价，高 setup 成本，不适合中小客户</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">Mews</div>
                <div className="text-white/80">PMS 为核心，分销是附加功能</div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                <div className="text-sm text-white mb-1">HotelByte</div>
                <div className="text-white">原生 B2B 四级架构 + 27+ 供应商 + 信用管理</div>
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
            { title: 'OpenAPI 规范', desc: '完整的 Swagger/OpenAPI 文档，支持自动生成客户端代码。' },
            { title: '多语言 SDK', desc: '提供 Go、Java 官方 SDK，封装认证、重试、错误处理等逻辑。' },
            { title: '沙箱环境', desc: '完整的沙箱环境，支持完整模拟供应商响应，零风险集成测试。' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-display font-bold mb-4">一套 API，对接全球分销网络</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          从 27+ 供应商集成到四级代理权限管理，HotelByte 分销底座让您专注于业务增长，而非基础设施。
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
