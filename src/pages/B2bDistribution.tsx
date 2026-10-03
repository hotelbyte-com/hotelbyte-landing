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
          { q: 'Which hotel suppliers can I connect?', a: 'HotelByte has adapters for suppliers including Dida, Tourmind, Yalago and Hotelbeds. Availability depends on credentials, configuration and the supplier contract; confirm coverage with a real query.' },
          { q: 'How is the agency hierarchy modeled?', a: 'Platform, tenant, customer and customer-account entities form a configurable hierarchy. Access is governed by entity scope and role permissions; test the exact account boundaries during evaluation.' }
        ]
      : [
          { q: '企业级分销底座是什么?', a: product.description },
          { q: '可以连接哪些酒店供应商？', a: 'HotelByte 有 Dida、Tourmind、Yalago、Hotelbeds 等供应商适配器。实际可用性取决于凭证、配置和供应商合同；建议通过真实查询核对覆盖。' },
          { q: '代理层级如何建模？', a: '平台、租户、客户和客户账号构成可配置的层级。访问受实体范围与角色权限约束；选型时应实测账号边界。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Stand up the Enterprise Distribution Base in three steps'
      : '三步上线企业级分销底座',
    isEn
      ? 'Configure the entity hierarchy, validate supplier credentials and test the booking and credit flows in your own environment.'
      : '配置实体层级、验证供应商凭证，并在自己的环境中测试预订与信用流程。',
    isEn
      ? [
          { name: 'Model the entity tree', text: 'Configure tenant, customer and customer-account relationships, then verify permissions with representative users.' },
          { name: 'Validate supplier access', text: 'Configure credentials for the suppliers you contract with and test hotel search and rates for your markets.' },
          { name: 'Review operations', text: 'Trace a sample search and booking, then inspect the related credit and audit records.' }
        ]
      : [
          { name: '建模实体层级', text: '配置租户、客户与客户账号关系，再用代表性账号验证权限范围。' },
          { name: '验证供应商访问', text: '为已签约供应商配置凭证，并针对目标市场测试酒店搜索与报价。' },
          { name: '检查运营链路', text: '追踪一次搜索和预订样例，再查看相关信用与审计记录。' }
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
          {isEn ? 'Hotel distribution built for' : '面向复杂代理关系的'}<br />
          <span className="text-ink">{isEn ? 'agency operations' : '酒店分销底座'}</span>
        </h1>
        <p className="text-lg text-ink/60 font-light">
          {isEn
            ? 'Configure agency relationships, supplier credentials and access controls around one distribution API. Validate coverage and booking flows with your own markets and accounts.'
            : '围绕统一分销 API 配置代理关系、供应商凭证和访问权限，再用自己的市场与账号验证覆盖和预订流程。'}
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
              <h3 className="text-xl font-bold text-ink mb-2">{isEn ? 'Platform' : '平台'}</h3>
              <p className="text-sm text-ink/50">{isEn ? 'Shared platform services and supplier adapters' : '共享平台服务与供应商适配器'}</p>
            </div>
            
            <div className="flex justify-center">
              <div className="w-px h-6 bg-ink/25"></div>
            </div>

            {/* Tenant Level */}
            <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
              <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
              <h3 className="text-xl font-bold text-ink mb-2">{isEn ? 'Tenant' : '租户'}</h3>
              <p className="text-sm text-ink/50">{isEn ? 'Distribution settings and policy scope for the tenant' : '租户范围内的分销配置与策略'}</p>
            </div>

            <div className="flex justify-center gap-24">
              <div className="w-px h-6 bg-ink/25"></div>
              <div className="w-px h-6 bg-ink/25"></div>
            </div>

            {/* Customer/Account Level */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
                <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
                <h3 className="text-lg font-bold text-ink mb-2">{isEn ? 'Customer' : '客户'}</h3>
                <p className="text-sm text-ink/50">{isEn ? 'Customer-specific access and commercial settings' : '客户范围内的访问和商务配置'}</p>
              </div>
              <div className="p-6 rounded-sm bg-paper-raised border border-line text-center relative group">
                <div className="absolute inset-0 bg-paper-raised opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
                <h3 className="text-lg font-bold text-ink mb-2">{isEn ? 'Customer account' : '客户账号'}</h3>
                <p className="text-sm text-ink/50">{isEn ? 'Account-level users and access checks' : '账号级用户与访问检查'}</p>
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
            title: isEn ? 'Scoped agency access' : '代理层级与权限范围',
            desc: isEn ? 'Tenant, customer and customer-account entities provide a hierarchy for access checks and distribution settings.' : '租户、客户与客户账号构成权限检查和分销配置的层级。'
          },
          {
            icon: Network,
            title: isEn ? 'Supplier adapters' : '供应商适配器',
            desc: isEn ? 'Adapters for Dida, Tourmind, Yalago, Hotelbeds and other partners use a unified interface. Confirm live availability with credentials and a real query.' : 'Dida、Tourmind、Yalago、Hotelbeds 等适配器接入统一接口。实际可用性须通过凭证和真实查询确认。'
          },
          {
            icon: BookOpen,
            title: isEn ? 'Hotel and room mapping' : '酒店与房型映射',
            desc: isEn ? 'Mapping workflows connect supplier hotel and room identifiers to your own catalog. Check sample matches before relying on coverage.' : '映射流程将供应商酒店和房型标识关联到您的目录；使用样例核对匹配结果。'
          },
          {
            icon: Key,
            title: isEn ? 'Credit controls' : '信用控制',
            desc: isEn ? 'Configure credit limits and authorization by entity and inspect the corresponding transaction records.' : '按实体配置信用额度和授权，并核对相应的交易记录。'
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
          <h2 className="text-3xl font-display mb-4">{isEn ? 'Architecture at a glance' : '技术架构概览'}</h2>
          <p className="text-ink/60 font-light">{isEn ? 'Capabilities to validate against your own requirements' : '可按自身需求逐项验证的能力'}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Server, title: isEn ? 'Hierarchical entities' : '层级实体', desc: isEn ? 'Platform, tenant, customer and customer-account relationships carry scoped access rules.' : '平台、租户、客户和客户账号关系承载权限范围。' },
            { icon: Network, title: isEn ? 'Unified supplier interface' : '统一供应商接口', desc: isEn ? 'Adapters normalize partner-specific search and booking behavior; availability varies by credential and contract.' : '适配器统一上游搜索和预订差异；实际可用性取决于凭证和合同。' },
            { icon: BookOpen, title: isEn ? 'Hotel and room mapping' : '酒店与房型映射', desc: isEn ? 'Review source identifiers, match decisions and exceptions against your catalog.' : '对照自己的目录检查源标识、匹配决策与异常。' },
            { icon: Key, title: isEn ? 'Credit configuration' : '信用配置', desc: isEn ? 'Review authorization and balance changes with representative accounts before rollout.' : '上线前用代表性账号检查授权和额度变化。' },
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
          <h2 className="text-3xl font-display mb-4">{isEn ? 'How to evaluate integration' : '如何评估集成'}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: isEn ? 'API documentation' : 'API 文档', desc: isEn ? 'Review request fields, authentication and error responses before implementation.' : '实施前检查请求字段、认证和错误响应。' },
            { title: isEn ? 'Supplier credentials' : '供应商凭证', desc: isEn ? 'Confirm which contracted supplier accounts can be configured in your environment.' : '确认自身环境能配置哪些已签约的供应商账号。' },
            { title: isEn ? 'Representative tests' : '代表性测试', desc: isEn ? 'Run search, rates and booking checks for your target markets and account hierarchy.' : '针对目标市场和账号层级测试搜索、报价与预订。' },
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
          ? 'Model entities, validate supplier access and inspect operations.'
          : '建模实体、验证供应商访问并检查运营链路。'}
        steps={isEn
          ? [
              { name: 'Model the entity tree', text: 'Configure tenant, customer and customer-account relationships, then verify permissions with representative users.' },
              { name: 'Validate supplier access', text: 'Configure credentials for the suppliers you contract with and test hotel search and rates for your markets.' },
              { name: 'Review operations', text: 'Trace a sample search and booking, then inspect the related credit and audit records.' }
            ]
          : [
              { name: '建模实体层级', text: '配置租户、客户与客户账号关系，再用代表性账号验证权限范围。' },
              { name: '验证供应商访问', text: '为已签约供应商配置凭证，并针对目标市场测试酒店搜索与报价。' },
              { name: '检查运营链路', text: '追踪一次搜索和预订样例，再查看相关信用与审计记录。' }
            ]}
      />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-display mb-4">{isEn ? 'Evaluate your distribution flow' : '验证您的分销链路'}</h2>
        <p className="text-ink/60 mb-8 max-w-2xl mx-auto">
          {isEn ? 'Bring your supplier contracts, target markets and account model to a technical review.' : '带上供应商合同、目标市场和账号模型，开展一次技术评估。'}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/compare" className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-all duration-300">
            {isEn ? 'Read evaluation guide' : '查看选型指南'} <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="https://openapi.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-sm bg-paper-raised border border-line text-ink font-medium hover:bg-paper transition-all duration-300">
            {isEn ? 'API documentation' : '查看 API 文档'}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
