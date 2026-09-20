import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Database, Activity, Cpu, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema, itemListSchema } from '../seo/schema';
import { products } from '../data/products';

const LIVE_PRICES = [1024, 998, 1042, 1010, 1036];

export default function Home() {
  const { t, locale } = useI18n();
  const isEn = locale === 'en';
  const reduceMotion = useReducedMotion();
  const [liveIdx, setLiveIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setLiveIdx((i) => (i + 1) % LIVE_PRICES.length), 3200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const livePrice = LIVE_PRICES[liveIdx];
  const prevPrice = LIVE_PRICES[(liveIdx + LIVE_PRICES.length - 1) % LIVE_PRICES.length];
  const liveDelta = ((livePrice - prevPrice) / prevPrice) * 100;

  const fade = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay, ease: 'easeOut' as const },
        };

  const route = SITE_ROUTES.home;
  const productListSchema = itemListSchema(
    isEn ? 'HotelByte Product Suite' : 'HotelByte 产品矩阵',
    isEn
      ? 'AI-Native hotel distribution product suite: AI-Native Automations, Lookout Price Intelligence, Enterprise Distribution Base, TraceSight, RevenuePilot, and DeepSeek V4-Flash Appliance — plus consulting services (AI advisory + technology consulting).'
      : 'AI-Native 酒店分销产品矩阵:AI 原生自动化、Lookout 价格情报、企业级分销底座、TraceSight、RevenuePilot 与 DeepSeek V4-Flash 一体机,并附咨询服务(AI 顾问 + 技术咨询)。',
    products.map((p) => ({
      name: isEn ? p.nameEn : p.name,
      path: `/products/${p.slug}`,
      description: isEn ? p.taglineEn : p.tagline
    }))
  );
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(route.path, isEn ? route.title : route.titleZh, isEn ? route.description : route.descriptionZh, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' }
    ]),
    productListSchema
  ];

  const ledgerRows: { supplier: string; hotel: string; room: string; plan: string; price: number | null }[] = [
    { supplier: 'DIDA', hotel: 'HTL-1042', room: isEn ? 'Deluxe King' : '豪华大床', plan: 'BB', price: 486 },
    { supplier: 'TOURMIND', hotel: 'HTL-2276', room: isEn ? 'Twin' : '标准双床', plan: 'RO', price: 312 },
    { supplier: 'YALAGO', hotel: 'HTL-0871', room: isEn ? 'Suite' : '套房', plan: 'BB', price: null },
    { supplier: 'HOTELBEDS', hotel: 'HTL-3390', room: isEn ? 'Double' : '双床房', plan: 'RO', price: 655 },
  ];

  const fmt = (n: number) => `¥${n.toLocaleString('en-US')}`;

  return (
    <>
      <Seo
        path={route.path}
        title={isEn ? route.title : route.titleZh}
        description={isEn ? route.description : route.descriptionZh}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-[7fr_5fr] gap-14 lg:gap-16 items-center">
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, ease: 'easeOut' as const },
                })}
          >
            <p className="eyebrow flex items-center gap-2.5 mb-7">
              <span className="inline-block w-1.5 h-1.5 bg-seal" aria-hidden="true" />
              {t('hero.badge')}
            </p>
            <h1 className="font-display text-5xl lg:text-[3.6rem] leading-[1.14] tracking-wide mb-8">
              {t('hero.title1')}<br />
              {t('hero.title2')}<br />
              <span className="text-ink/55">{t('hero.title3')}</span>
            </h1>
            <p className="text-lg text-ink/65 leading-relaxed mb-10 max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#subscriptions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-ink text-paper font-medium hover:bg-ink-deep transition-colors group"
              >
                {t('hero.cta.pricing')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://openapi.hotelbyte.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-sm border border-ink/25 text-ink font-medium hover:border-ink/60 transition-colors"
              >
                {t('hero.cta.docs')}
              </a>
            </div>
          </motion.div>

          {/* Signature: live net-rate sheet */}
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.15, ease: 'easeOut' as const },
                })}
            className="border border-ink/25 bg-paper-raised shadow-[0_2px_16px_rgba(28,40,35,0.07)]"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-ink/25">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                {isEn ? 'Net Rate Sheet' : '净价单'}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
                <span className="w-1.5 h-1.5 bg-seal" aria-hidden="true" />
                Live
              </span>
            </div>
            <table className="w-full text-left">
              <caption className="sr-only">{isEn ? 'Sample net rates across suppliers' : '多供应商净价示例'}</caption>
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45 border-b border-line">
                  <th scope="col" className="px-5 py-2.5 font-medium">{isEn ? 'Supplier' : '供应商'}</th>
                  <th scope="col" className="px-2 py-2.5 font-medium hidden sm:table-cell">{isEn ? 'Hotel' : '酒店'}</th>
                  <th scope="col" className="px-2 py-2.5 font-medium">{isEn ? 'Room' : '房型'}</th>
                  <th scope="col" className="px-2 py-2.5 font-medium">{isEn ? 'Plan' : '餐型'}</th>
                  <th scope="col" className="px-5 py-2.5 font-medium text-right">{isEn ? 'Net' : '净价'}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {ledgerRows.map((row) => {
                  const isLive = row.price === null;
                  return (
                    <tr
                      key={row.hotel}
                      className={`border-b border-line/70 last:border-b-0 transition-colors duration-700 ${isLive ? 'bg-brass/[0.08]' : ''}`}
                    >
                      <td className="px-5 py-3 text-ink/70">{row.supplier}</td>
                      <td className="px-2 py-3 text-ink/45 hidden sm:table-cell">{row.hotel}</td>
                      <td className="px-2 py-3 font-sans text-ink/80">{row.room}</td>
                      <td className="px-2 py-3 text-ink/50">{row.plan}</td>
                      <td className="px-5 py-3 text-right tabular-nums">
                        {isLive ? (
                          <span className="text-brass font-semibold">
                            {fmt(livePrice)}
                            <span className="ml-1.5 text-[10px] text-ink/45 font-normal">
                              {liveDelta >= 0 ? '+' : ''}{liveDelta.toFixed(1)}%
                            </span>
                          </span>
                        ) : (
                          <span className="text-ink/80">{fmt(row.price!)}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-5 py-3 border-t border-ink/25 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              <span>{isEn ? '27+ suppliers · one API' : '27+ 供应商 · 一套 API'}</span>
              <span>UAT Feed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI-Native Foundation Band */}
      <section className="bg-ink-deep text-paper py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow-dark mb-5">{isEn ? 'Our Technology Belief' : '我们的技术信仰'}</p>
              <h2 className="font-display text-3xl lg:text-4xl tracking-wide mb-5">
                {isEn ? 'AI-Native by Design' : 'AI-Native 原生架构'}
              </h2>
              <p className="text-paper/65 leading-relaxed text-lg">
                {isEn
                  ? 'Every product is built on a unified AI-Native foundation: model-agnostic LLM orchestration, multi-source federated queries, and self-evolving agents. These capabilities are woven into the architecture from day one.'
                  : '所有产品均构建于统一的 AI-Native 底座之上：模型无关的 LLM 编排、多源异构联邦查询、自进化智能体。这些能力从架构设计之初即原生融入，而非后期叠加。'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-paper/15 border border-paper/15">
              {[
                { label: isEn ? 'Model-Agnostic' : '模型无关', value: isEn ? 'OpenAI / Anthropic / Any SOTA' : 'OpenAI / Anthropic / 任意 SOTA' },
                { label: isEn ? 'Federated Query' : '联邦查询', value: 'MySQL / TDengine / Redis / ES' },
                { label: isEn ? 'Self-Evolving' : '自进化', value: isEn ? 'Continuous learning from feedback' : '持续学习业务反馈' },
                { label: isEn ? 'Data Governance' : '数据治理', value: isEn ? 'Built-in masking & RBAC' : '内置脱敏与权限隔离' },
              ].map((item, i) => (
                <div key={i} className="bg-ink-deep p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass-bright mb-1.5">{item.label}</div>
                  <div className="text-sm text-paper">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AEO — Definition Cards (semantic <dl>) */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">{isEn ? 'Definitions' : '定义卡'}</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-wide mb-4">{t('home.def.title')}</h2>
            <p className="text-ink/65 leading-relaxed text-lg">{t('home.def.lead')}</p>
          </motion.div>
          <dl className="grid md:grid-cols-3 gap-10 md:gap-8">
            {[
              { term: t('home.def.aiNative.term'), def: t('home.def.aiNative.def') },
              { term: t('home.def.dist.term'), def: t('home.def.dist.def') },
              { term: t('home.def.native.term'), def: t('home.def.native.def') },
            ].map((item, i) => (
              <motion.div {...fade(0.08 * i)} key={i} className="border-t-2 border-ink pt-6">
                <dt className="font-display text-xl tracking-wide mb-3">{item.term}</dt>
                <dd className="text-sm text-ink/70 leading-relaxed">{item.def}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* Product Lines Grid */}
      <section id="products" className="py-20 lg:py-24 bg-paper-raised border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="max-w-2xl mb-14">
            <p className="eyebrow mb-5">{isEn ? 'Product Suite' : '产品矩阵'}</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-wide mb-4">{t('products.title')}</h2>
            <p className="text-ink/65 leading-relaxed">
              {isEn
                ? 'Six product lines built on the AI-Native foundation. Purpose-built for hotel distribution, ready for the enterprise.'
                : '六大产品线，基于 AI-Native 底座构建。为酒店分销而生，为企业级场景而备。'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
            {/* Lookout */}
            <motion.article {...fade(0.05)} className="group bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
              <div className="w-10 h-10 rounded-sm border border-ink/25 flex items-center justify-center mb-6">
                <Activity className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{t('product.lookout.name')}</h3>
              <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t('product.lookout.desc')}</p>
              <Link to="/products/price-intelligence" className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                {t('product.lookout.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>

            {/* Distribution */}
            <motion.article {...fade(0.1)} className="group bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
              <div className="w-10 h-10 rounded-sm border border-ink/25 flex items-center justify-center mb-6">
                <Database className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{t('product.dist.name')}</h3>
              <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t('product.dist.desc')}</p>
              <Link to="/products/b2b-distribution" className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                {t('product.dist.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>

            {/* TraceSight */}
            <motion.article {...fade(0.15)} className="group bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
              <div className="w-10 h-10 rounded-sm border border-ink/25 flex items-center justify-center mb-6">
                <Activity className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{t('product.tracesight.name')}</h3>
              <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t('product.tracesight.desc')}</p>
              <Link to="/products/tracesight" className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                {t('product.tracesight.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>

            {/* RevenuePilot */}
            <motion.article {...fade(0.2)} className="group bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
              <div className="w-10 h-10 rounded-sm border border-ink/25 flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{t('product.revenuepilot.name')}</h3>
              <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t('product.revenuepilot.desc')}</p>
              <Link to="/products/revenuepilot" className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                {t('product.revenuepilot.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>

            {/* Consulting */}
            <motion.article {...fade(0.25)} className="group bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
              <div className="w-10 h-10 rounded-sm border border-ink/25 flex items-center justify-center mb-6">
                <Sparkles className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display text-2xl tracking-wide mb-3">{t('product.consulting.name')}</h3>
              <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t('product.consulting.desc')}</p>
              <Link to="/services/consulting" className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                {t('product.consulting.link')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>

            {/* DeepSeek Appliance */}
            <motion.article {...fade(0.3)} className="group bg-paper-raised hover:bg-paper p-8 lg:p-10 transition-colors">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-sm border border-ink/25 flex items-center justify-center mb-6">
                    <Cpu className="w-5 h-5 text-ink" />
                  </div>
                  <h3 className="font-display text-2xl tracking-wide mb-3">{t('product.ds4.name')}</h3>
                  <p className="text-ink/65 leading-relaxed mb-6 text-[15px]">{t('product.ds4.desc')}</p>
                  <Link to="/products/deepseek-appliance" className="inline-flex items-center gap-1.5 text-brass font-medium text-sm group-hover:gap-2.5 transition-all">
                    {t('product.ds4.link')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 gap-px bg-line border border-line">
                    {[
                      { label: isEn ? 'Model Size' : '模型体积', value: '76GB' },
                      { label: isEn ? 'Min Memory' : '最低内存', value: '128GB' },
                      { label: isEn ? 'Parameters' : '参数量', value: '284B' },
                      { label: isEn ? 'First deployment' : '首次部署', value: '30 min' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-paper-raised px-3 py-3 text-center">
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45 mb-1">{stat.label}</div>
                        <div className="font-mono text-base font-medium text-ink">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* TraceSight Band */}
      <section className="bg-ink-deep text-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-wide leading-[1.15] mb-6">
                TraceSight <span className="text-paper/40">追光</span><br />
                <span className="text-brass-bright">{isEn ? 'Full-Linkage Diagnostics' : '全链路智能诊断'}</span>
              </h2>
              <p className="text-lg text-paper/65 leading-relaxed mb-8">
                {isEn
                  ? 'Break down information silos. Compress cross-team troubleshooting from 2-4 hours to under 10 minutes.'
                  : '打破信息孤岛。将原本需要 2-4 小时的跨团队故障排查时间，压缩至 10 分钟以内。'}
              </p>
              <ul className="space-y-3.5 mb-10">
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
                  <li key={i} className="flex items-start gap-3 text-paper/80">
                    <span className="mt-2 w-1.5 h-1.5 bg-brass-bright shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/products/tracesight"
                className="inline-block px-6 py-3 rounded-sm border border-paper/25 hover:bg-paper hover:text-ink transition-colors font-medium"
              >
                {isEn ? 'Explore TraceSight' : '查看 TraceSight 详情'}
              </Link>
            </div>

            <motion.div {...fade(0.1)} className="border border-paper/15 bg-ink-deep">
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-paper/10">
                <span className="w-2 h-2 rounded-sm bg-brass-bright" aria-hidden="true" />
                <span className="font-mono text-xs text-paper/50">tracesight · {isEn ? 'session replay' : '会话回放'}</span>
              </div>
              <div className="p-6 space-y-4 font-mono text-sm">
                <div className="flex items-center justify-between px-4 py-3 border border-paper/10 bg-paper/[0.04]">
                  <div className="flex items-center gap-4">
                    <span className="text-brass-bright">GET</span>
                    <span className="text-paper/80">/api/v1/search/checkAvail</span>
                  </div>
                  <span className="text-paper/40">142ms</span>
                </div>
                <div className="ml-4 sm:ml-8 border-l border-paper/15 pl-4 sm:pl-8">
                  <div className="px-4 py-3 border border-paper/10 bg-paper/[0.04]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-seal-bright text-xs tracking-[0.14em]">AI DIAGNOSIS</span>
                      <span className="text-paper/40 text-xs">LLM</span>
                    </div>
                    <p className="text-paper/70 font-sans text-sm leading-relaxed">
                      {isEn
                        ? "Identified supplier mapping mismatch. Room type ID 'RT-892' is missing in the downstream inventory for property 'HTL-1042'."
                        : '定位到供应商映射不一致：酒店 HTL-1042 的房型 RT-892 在下游库存中缺失。'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why HotelByte */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-wide leading-[1.15] mb-6">
                {isEn ? 'Why ' : '为什么选择 '}<span className="text-brass">HotelByte</span>{isEn ? '?' : '？'}
              </h2>
              <p className="text-lg text-ink/65 leading-relaxed mb-8">
                {t('why.subtitle')}
              </p>
              <ul className="space-y-3.5 mb-10">
                {[t('why.point1'), t('why.point2'), t('why.point3'), t('why.point4')].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/80">
                    <span className="mt-2 w-1.5 h-1.5 bg-brass shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-ink/25 hover:border-ink/60 transition-colors font-medium"
              >
                {t('why.cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-line border border-line">
              {[
                { label: t('why.stat.ai'), value: 'HotelByte' },
                { label: t('why.stat.pricing'), value: isEn ? 'Usage-based' : '按用量付费' },
                { label: t('why.stat.b2b'), value: isEn ? '4-Tier' : '四级实体' },
                { label: t('why.stat.suppliers'), value: '27+' },
              ].map((stat, i) => (
                <div key={i} className="bg-paper p-6 lg:p-8 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 mb-2">{stat.label}</div>
                  <div className="font-mono text-xl lg:text-2xl font-medium text-ink">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscriptions */}
      <section id="subscriptions" className="py-20 lg:py-28 bg-paper-raised border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fade()} className="max-w-2xl mb-16">
            <p className="eyebrow mb-5">{isEn ? 'Plans' : '订阅方案'}</p>
            <h2 className="font-display text-3xl lg:text-4xl tracking-wide mb-4">{t('subs.title')}</h2>
            <p className="text-ink/65 leading-relaxed text-lg">{t('subs.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Starter */}
            <motion.div {...fade(0.05)} className="border border-line bg-paper p-8 flex flex-col">
              <h3 className="font-display text-xl tracking-wide mb-2">{t('subs.starter.name')}</h3>
              <p className="text-sm text-ink/55 mb-7">{t('subs.starter.desc')}</p>
              <div className="font-mono text-3xl mb-8">{t('subs.starter.price')}</div>
              <ul className="space-y-3.5 mb-8 text-sm text-ink/70">
                {[t('subs.starter.f1'), t('subs.starter.f2'), t('subs.starter.f3'), t('subs.starter.f4')].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-ink/35" aria-hidden="true">—</span> {item}
                  </li>
                ))}
              </ul>
              <button className="mt-auto w-full py-3 rounded-sm border border-ink/30 font-medium hover:bg-ink hover:text-paper transition-colors">
                {t('subs.starter.cta')}
              </button>
            </motion.div>

            {/* Growth */}
            <motion.div {...fade(0.1)} className="border border-line bg-paper p-8 flex flex-col">
              <h3 className="font-display text-xl tracking-wide mb-2">{t('subs.growth.name')}</h3>
              <p className="text-sm text-ink/55 mb-7">{t('subs.growth.desc')}</p>
              <div className="font-mono text-3xl mb-8">{t('subs.growth.price')}</div>
              <ul className="space-y-3.5 mb-8 text-sm text-ink/70">
                {[t('subs.growth.f1'), t('subs.growth.f2'), t('subs.growth.f3'), t('subs.growth.f4')].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-ink/35" aria-hidden="true">—</span> {item}
                  </li>
                ))}
              </ul>
              <button className="mt-auto w-full py-3 rounded-sm border border-ink/30 font-medium hover:bg-ink hover:text-paper transition-colors">
                {t('subs.growth.cta')}
              </button>
            </motion.div>

            {/* All-in-One */}
            <motion.div {...fade(0.15)} className="relative border-2 border-ink bg-paper p-8 flex flex-col">
              <span className="absolute -top-3.5 right-6 -rotate-3 border border-seal text-seal bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]">
                {t('subs.recommended')}
              </span>
              <h3 className="font-display text-xl tracking-wide mb-2">{t('subs.enterprise.name')}</h3>
              <p className="text-sm text-ink/55 mb-7">{t('subs.enterprise.desc')}</p>
              <div className="font-mono text-3xl mb-8">{t('subs.enterprise.price')}</div>
              <ul className="space-y-3.5 mb-8 text-sm text-ink/80">
                {[t('subs.enterprise.f1'), t('subs.enterprise.f2'), t('subs.enterprise.f3'), t('subs.enterprise.f4'), t('subs.enterprise.f5')].map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-brass" aria-hidden="true">—</span> {item}
                  </li>
                ))}
              </ul>
              <button className="mt-auto w-full py-3 rounded-sm bg-ink text-paper font-medium hover:bg-ink-deep transition-colors">
                {t('subs.enterprise.cta')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
