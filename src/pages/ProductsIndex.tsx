import { motion } from 'framer-motion';
import { Code, Activity, Eye, Cpu, ArrowRight, ShieldCheck, Plug, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { localizedPath } from '../i18n/locale';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { webPageSchema, breadcrumbSchema, itemListSchema } from '../seo/schema';
import { productLines, productsInLine } from '../data/products';

// Card presentation per product; names come from src/data/products.ts.
const cardMeta: Record<string, { icon: LucideIcon; kicker: string; kickerEn: string; desc: string; descEn: string; color: 'seal' | 'brass' }> = {
  'ai-distribution': {
    icon: Plug,
    kicker: 'MCP · One Integration, Every Supplier',
    kickerEn: 'MCP · One Integration, Every Supplier',
    desc: '面向 AI Agent 的统一 MCP 工具面。27+ 供应商连接器聚合在一个接口后面,报价自带证据信封,两段式确认预订,三条接入路(本地网关/静态 key/OAuth)。',
    descEn: 'The unified MCP tool surface for AI agents. 27+ supplier connectors behind one interface, evidence-carrying quotes, two-phase confirmed booking, and three onboarding paths (local gateway / static key / OAuth).',
    color: 'seal',
  },
  'ai-automations': {
    icon: Code,
    kicker: 'Data Agent 智能体',
    kickerEn: 'Data Agent Intelligence',
    desc: '内置 Data Agent 智能体。通过受治理的自然语言交互，实现跨数据库的智能检索与分析。让非技术团队也能像数据工程师一样获取洞察。',
    descEn: 'Built-in Data Agent. Governed natural language interaction for cross-database intelligent retrieval and analysis.',
    color: 'brass',
  },
  'price-intelligence': {
    icon: Activity,
    kicker: 'Price Intelligence Engine',
    kickerEn: 'Price Intelligence Engine',
    desc: '高并发价格爬虫引擎。提供实时的竞争基准测试与异常波动监控，助力收益最大化。将人工比价工作自动化。',
    descEn: 'High-concurrency price crawler. Real-time competitive benchmarking and anomaly monitoring to maximize revenue.',
    color: 'seal',
  },
  tracesight: {
    icon: Eye,
    kicker: 'Full-Linkage Diagnostics',
    kickerEn: 'Full-Linkage Diagnostics',
    desc: '全链路智能诊断平台。结合会话级追踪与诊断上下文，帮助团队调查搜索、预订和供应商请求。',
    descEn: 'Session-level diagnostics provide context for investigating search, booking and supplier interactions.',
    color: 'brass',
  },
  revenuepilot: {
    icon: ShieldCheck,
    kicker: 'AI Revenue Strategy Engine',
    kickerEn: 'AI Revenue Strategy Engine',
    desc: 'AI 收益策略引擎。把加价、供应商、市场和客群策略做成可生成、可模拟、可受控保存的赚钱系统，并向收益 Agent 编排演进。',
    descEn: 'AI revenue strategy engine. Turn markup, supplier, market, and segment strategies into an AI-generated, simulated, governed-save profit system, evolving toward revenue agent orchestration.',
    color: 'seal',
  },
  'deepseek-appliance': {
    icon: Cpu,
    kicker: 'Private AI Inference',
    kickerEn: 'Private AI Inference',
    desc: '根据目标模型、硬件、数据和治理要求评估私有化 AI 方案，并在实际环境中验证。',
    descEn: 'Evaluate an on-premises AI approach against your model, hardware, data and governance requirements in the target environment.',
    color: 'brass',
  },
};

export default function ProductsIndex() {
  const { locale } = useI18n();
  const isEn = locale !== 'zh'; // tier-2 locales render the English body
  const route = SITE_ROUTES.products;
  const to = (path: string) => localizedPath(path, locale);
  const productsListSchema = itemListSchema(
    isEn ? 'Stai product lines' : 'Stai 产品线',
    isEn ? route.description : route.descriptionZh,
    productLines.flatMap((line) => [
      { name: line.name, path: `/products/${line.slug}`, description: isEn ? line.summaryEn : line.summary },
      ...productsInLine(line.key).map((p) => ({
        name: isEn ? p.nameEn : p.name,
        path: `/products/${p.slug}`,
        description: isEn ? p.taglineEn : p.tagline
      })),
    ])
  );
  const jsonLd = [
    webPageSchema(route.path, isEn ? route.title : route.titleZh, isEn ? route.description : route.descriptionZh, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: isEn ? 'Products' : '产品', path: '/products' }
    ]),
    productsListSchema
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
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-line text-xs font-medium text-ink mb-6">
          Stai · by HotelByte
        </div>
        <h1 className="text-4xl lg:text-6xl font-display mb-6 leading-tight">
          {isEn ? 'Choose the Stai for how you sell' : '按你的生意选择 Stai'}
        </h1>
        <nav aria-label={isEn ? 'Product lines' : '产品线'} className="mt-8 flex flex-wrap justify-center gap-3">
          {productLines.map((line) => (
            <a key={line.key} href={`#${line.key}`} className="px-4 py-2 border border-line rounded-sm text-sm hover:border-brass/40">
              {line.name}
            </a>
          ))}
        </nav>
      </motion.div>

      {productLines.map((line) => {
        const lineProducts = productsInLine(line.key);
        return (
          <section key={line.key} id={line.key} aria-labelledby={`${line.key}-heading`} className="scroll-mt-24 border-t border-line pt-14 mb-20">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 mb-10">
              <div>
                <h2 id={`${line.key}-heading`} className="text-4xl font-display mb-2">{line.name}</h2>
                {line.earlyAccess && <p className="inline-block mb-3 px-2.5 py-1 border border-brass/50 text-brass text-xs font-medium rounded-sm">{isEn ? 'Early access' : '早期访问'}</p>}
                <p className="text-brass font-medium mb-4">{isEn ? line.descriptorEn : line.descriptor}</p>
                <Link to={to(`/products/${line.slug}`)} className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:gap-3 transition-all">
                  {isEn ? `Explore ${line.name}` : `了解 ${line.name}`} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <div>
                <p className="text-lg text-ink/70 leading-relaxed mb-3">{isEn ? line.summaryEn : line.summary}</p>
                <p className="text-ink/55 leading-relaxed">{isEn ? line.audienceEn : line.audience}</p>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {line.highlights.map((item) => (
                <li key={item.id}>
                  <Link to={to(`/products/${line.slug}#${item.id}`)} className="block h-full p-7 border border-line bg-paper-raised rounded-sm hover:border-brass/30">
                    <h3 className="font-bold text-lg mb-2">{isEn ? item.titleEn : item.title}</h3>
                    <p className="text-ink/65 leading-relaxed">{isEn ? item.descEn : item.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>

            {lineProducts.length > 0 && (
              <>
                <h3 className="text-2xl font-display mt-14 mb-6">{isEn ? 'Add-on products' : '配套产品'}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {lineProducts.map((product, idx) => {
                    const meta = cardMeta[product.slug];
                    const Icon = meta?.icon ?? Plug;
                    return (
                      <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link
                          to={to(`/products/${product.slug}`)}
                          className="group block p-8 rounded-sm bg-paper-raised border border-line hover:border-brass/30 hover:bg-paper-raised transition-all duration-500 h-full"
                        >
                          <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${
                            meta?.color === 'brass' ? 'bg-brass/10' :
                            meta?.color === 'seal' ? 'bg-seal/10' :
                            'bg-paper-raised'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              meta?.color === 'brass' ? 'text-brass' :
                              meta?.color === 'seal' ? 'text-seal' :
                              'text-ink'
                            }`} />
                          </div>
                          {meta && <div className="text-xs font-medium text-ink/40 mb-2">{isEn ? meta.kickerEn : meta.kicker}</div>}
                          <h4 className="text-2xl font-display mb-4">{isEn ? product.nameEn : product.name}</h4>
                          <p className="text-ink/60 leading-relaxed mb-6">{meta ? (isEn ? meta.descEn : meta.desc) : (isEn ? product.taglineEn : product.tagline)}</p>
                          <div className="inline-flex items-center gap-2 text-brass font-medium group-hover:gap-3 transition-all">
                            {isEn ? 'Learn More' : '了解详情'} <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}
