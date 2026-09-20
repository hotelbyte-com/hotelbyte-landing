import { motion } from 'framer-motion';
import { Layers, Network, BookOpen, Key, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import ProductEvaluation from '../components/ProductEvaluation';
import { useI18n } from '../i18n';
import { HowItWorks } from '../components/HowItWorks';

export default function B2bDistribution() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const product = getProductBySlug('b2b-distribution')!;
  const route = SITE_ROUTES.b2bDistribution;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is the Enterprise Distribution Base?', a: product.descriptionEn },
          { q: 'How many suppliers are pre-integrated?', a: 'HotelByte ships with 27+ pre-integrated hotel suppliers, including Dida, Tourmind, Yalago, and Hotelbeds, exposing one unified API.' },
          { q: 'How is the 4-tier entity architecture designed?', a: 'The Platform → Tenant → Customer → Account hierarchy isolates credit, RBAC, and financial accounting at every level for B2B agency ecosystems.' }
        ]
      : [
          { q: '企业级分销底座是什么?', a: product.description },
          { q: 'HotelByte 预集成了多少供应商?', a: 'HotelByte 默认预集成 27+ 全球酒店供应商,包括 Dida、Tourmind、Yalago、Hotelbeds 等,通过统一 API 对外暴露。' },
          { q: '四级实体架构是如何设计的?', a: 'Platform → Tenant → Customer → Account 四级架构在每一层都隔离信用、RBAC 与财务核算,支撑复杂 B2B 代理生态。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Stand up the Enterprise Distribution Base in three steps'
      : '三步上线企业级分销底座',
    isEn
      ? 'From entity setup to supplier activation to multi-currency credit, the distribution base turns complex B2B operations into a default capability.'
      : '从实体架构、供应商激活到多币种信用,分销底座把复杂 B2B 运营变成默认能力。',
    isEn
      ? [
          { name: 'Model the entity tree', text: 'Configure Platform → Tenant → Customer → Account with multi-currency credit and RBAC. Entity isolation is enforced at the code level.' },
          { name: 'Activate suppliers', text: 'Switch on 27+ pre-integrated hotel suppliers (Dida, Tourmind, Yalago, Hotelbeds, and more) through the unified adapter.' },
          { name: 'Operate with audit context', text: 'Booking, credit, and financial flows share the same evidence chain. Supplier mappings and credit changes ship with audit context.' }
        ]
      : [
          { name: '建模实体架构', text: '配置 Platform → Tenant → Customer → Account 四级实体与多币种信用、RBAC。实体隔离在代码层被强制执行。' },
          { name: '激活供应商', text: '通过统一适配器启用 27+ 预集成酒店供应商(Dida、Tourmind、Yalago、Hotelbeds 等)。' },
          { name: '带审计上下文的运营', text: '预订、信用与财务流共享同一条证据链,供应商映射和信用变更都带审计上下文。' }
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-ink/25 text-xs font-medium text-ink mb-6">
          B2B Distribution & Infrastructure
        </div>
        <h1 className="text-4xl lg:text-6xl font-display mb-6 leading-tight">
          构建于坚如磐石的<br />
          <span className="text-ink">三层实体架构</span>之上
        </h1>
        <p className="text-lg text-ink/60 font-light">
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
        
        <div className="rounded-sm border border-line bg-paper-raised p-8 flex flex-col items-center">
          
          <div className="w-full max-w-3xl space-y-6">
            {/* Platform Level */}
            <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
              <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
              <h3 className="text-xl font-bold text-ink mb-2">Platform 层 (HotelByte)</h3>
              <p className="text-sm text-ink/50">管理系统底层供应商对接、AI 引擎与全局元数据映射</p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-px h-6 bg-ink/25"></div>
            </div>

            {/* Tenant Level */}
            <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
              <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
              <h3 className="text-xl font-bold text-ink mb-2">Tenant 层 (客户 / 分销商总部)</h3>
              <p className="text-sm text-ink/50">拥有独立白标、全局加价规则、财务总账与供应商路由配置权</p>
            </div>

            <div className="flex justify-center gap-24">
              <div className="w-px h-6 bg-ink/25"></div>
              <div className="w-px h-6 bg-ink/25"></div>
            </div>

            {/* Customer/Account Level */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
                <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
                <h3 className="text-lg font-bold text-ink mb-2">B2B 代理商 A</h3>
                <p className="text-sm text-ink/50">受限的信用额度与独立的子账号权限</p>
              </div>
              <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
                <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
                <h3 className="text-lg font-bold text-ink mb-2">B2B 代理商 B</h3>
                <p className="text-sm text-ink/50">独立的 API 访问令牌与特定加价策略</p>
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
            className="p-8 rounded-sm border border-line bg-paper-raised hover:bg-paper-raised transition-colors"
          >
            <feature.icon className="w-8 h-8 text-ink mb-6" />
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-ink/60 leading-relaxed">{feature.desc}</p>
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
          <h2 className="text-3xl font-display mb-4">技术架构亮点</h2>
          <p className="text-ink/60 font-light">为复杂 B2B 分销网络设计的工程级架构</p>
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
              className="p-6 rounded-sm border border-line bg-paper-raised hover:bg-paper-raised transition-colors"
            >
              <item.icon className="w-8 h-8 text-ink mb-4" />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ProductEvaluation
        rows={product.evaluation}
        rowsEn={product.evaluationEn}
        eyebrow="采购视角"
        eyebrowEn="Procurement view"
        title="评估分销底座时看什么"
        titleEn="What to check when evaluating a distribution base"
        lead="不点名任何厂商。下面三件事决定一个 B2B 分销底座能不能撑住你的代理体系，以及你可以怎么当场验证。"
        leadEn="No vendor is named. Three things decide whether a B2B distribution base can carry your agency network — and how to verify each on the spot."
      />

      {/* Integration Notes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display mb-4">集成方式</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'OpenAPI 规范', desc: '完整的 Swagger/OpenAPI 文档，支持自动生成客户端代码。' },
            { title: '多语言 SDK', desc: '提供 Go、Java 官方 SDK，封装认证、重试、错误处理等逻辑。' },
            { title: '沙箱环境', desc: '完整的沙箱环境，支持完整模拟供应商响应，零风险集成测试。' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-sm border border-line bg-paper-raised text-center">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-ink/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AEO — How it works */}
      <HowItWorks
        title={isEn ? 'How the Distribution Base ships' : '分销底座如何落地'}
        subtitle={isEn
          ? 'Model the entity tree, activate suppliers, and operate with audit context.'
          : '建模实体架构、激活供应商、带审计上下文的运营。'}
        steps={isEn
          ? [
              { name: 'Model the entity tree', text: 'Configure Platform → Tenant → Customer → Account with multi-currency credit and RBAC. Entity isolation is enforced at the code level.' },
              { name: 'Activate suppliers', text: 'Switch on 27+ pre-integrated hotel suppliers (Dida, Tourmind, Yalago, Hotelbeds, and more) through the unified adapter.' },
              { name: 'Operate with audit context', text: 'Booking, credit, and financial flows share the same evidence chain. Supplier mappings and credit changes ship with audit context.' }
            ]
          : [
              { name: '建模实体架构', text: '配置 Platform → Tenant → Customer → Account 四级实体与多币种信用、RBAC。实体隔离在代码层被强制执行。' },
              { name: '激活供应商', text: '通过统一适配器启用 27+ 预集成酒店供应商(Dida、Tourmind、Yalago、Hotelbeds 等)。' },
              { name: '带审计上下文的运营', text: '预订、信用与财务流共享同一条证据链,供应商映射和信用变更都带审计上下文。' }
            ]}
      />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-display mb-4">一套 API，对接全球分销网络</h2>
        <p className="text-ink/60 mb-8 max-w-2xl mx-auto">
          从 27+ 供应商集成到四级代理权限管理，HotelByte 分销底座让您专注于业务增长，而非基础设施。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/compare" className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-all duration-300">
            查看选型指南 <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 rounded-sm bg-paper-raised border border-line text-ink font-medium hover:bg-paper transition-all duration-300">
            查看 API 文档
          </button>
        </div>
      </motion.div>
    </div>
  );
}
