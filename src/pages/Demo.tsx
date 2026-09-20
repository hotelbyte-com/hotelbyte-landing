import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  CalendarCheck,
  MessageSquare,
  Package,
  UsersRound,
  Sliders,
  Telescope,
  ExternalLink,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Boxes,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import {
  webPageSchema,
  breadcrumbSchema,
} from '../seo/schema';

const DEMO_URL = 'https://demo.staitravel.com/';

const modules = [
  { key: 'search', Icon: Search, fallbackZh: '酒店搜索', fallbackEn: 'Hotel Search' },
  { key: 'bookings', Icon: CalendarCheck, fallbackZh: '订单管理', fallbackEn: 'Bookings' },
  { key: 'sessions', Icon: MessageSquare, fallbackZh: '会话追踪', fallbackEn: 'Sessions' },
  { key: 'products', Icon: Package, fallbackZh: '产品与库存', fallbackEn: 'Products' },
  { key: 'suppliers', Icon: Boxes, fallbackZh: '供应商聚合', fallbackEn: 'Suppliers' },
  { key: 'customers', Icon: UsersRound, fallbackZh: '客户档案', fallbackEn: 'Customers' },
  { key: 'rules', Icon: Sliders, fallbackZh: '业务规则', fallbackEn: 'Rules' },
  { key: 'lookout', Icon: Telescope, fallbackZh: 'Lookout 价格情报', fallbackEn: 'Lookout Pricing' },
] as const;

const pillars = [
  {
    key: 'multiCurrency',
    Icon: Cpu,
    fallbackTitleZh: '多币种 · 多国家 · 多客户类型',
    fallbackTitleEn: 'Multi-currency · Multi-country · Multi-segment',
    fallbackBodyZh: '内置多币种信用管理、户籍/居所分离与细粒度 RBAC,复杂 B2B 代理生态作为默认能力。',
    fallbackBodyEn: 'Built-in multi-currency credit, separated nationality/residency, granular RBAC — complex B2B agency ecosystems are a default capability.',
  },
  {
    key: 'suppliers',
    Icon: Boxes,
    fallbackTitleZh: '27+ 全球供应商聚合',
    fallbackTitleEn: '27+ Global Suppliers Aggregated',
    fallbackBodyZh: 'Platform → Tenant → Customer → Account 三级实体架构,标准化接入主流酒店分销供应链。',
    fallbackBodyEn: 'Platform → Tenant → Customer → Account hierarchy with standardized access to major hotel distribution suppliers.',
  },
  {
    key: 'observability',
    Icon: ShieldCheck,
    fallbackTitleZh: '会话级全链路证据链',
    fallbackTitleEn: 'Session-Level Evidence Chain',
    fallbackBodyZh: '每一次搜索、报价、订单在四方生态里串成同一条证据链,排障从小时级压缩到分钟级。',
    fallbackBodyEn: 'Every search, quote, and order folds the four-party ecosystem into one evidence chain — troubleshooting drops from hours to minutes.',
  },
] as const;

export default function Demo() {
  const { locale, t } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.demo;

  const title = t('demo.title', isEn ? route.title : route.titleZh);
  const subtitle = t('demo.subtitle', isEn ? route.description : route.descriptionZh);

  const badge = t('demo.badge', isEn ? 'Live demo · no signup' : '在线演示 · 无需注册');
  const ctaPrimary = t('demo.cta.primary', isEn ? 'Open Demo' : '进入 Demo');
  const ctaSecondary = t('demo.cta.secondary', isEn ? 'How it works' : '工作原理');
  const modulesTitle = t('demo.modules.title', isEn ? 'Eight modules, one workbench' : '八个模块,一套工作台');
  const modulesSubtitle = t(
    'demo.modules.subtitle',
    isEn
      ? 'Search, bookings, sessions, products, suppliers, customers, rules, and Lookout pricing — all live in the same workbench.'
      : '搜索、订单、会话、产品、供应商、客户、规则与 Lookout 价格情报,全部在同一套工作台内。'
  );
  const foundationTitle = t('demo.foundation.title', isEn ? 'Powered by HotelByte' : '由 HotelByte 提供技术底座');
  const foundationBody = t(
    'demo.foundation.body',
    isEn
      ? 'Stai runs on the same AI-Native engineering OS that powers HotelByte\'s enterprise distribution base: federated queries, native observability, and B2B-first architecture by default.'
      : 'Stai 与 HotelByte 企业级分销底座共用同一套 AI-Native 工程化操作系统:联邦查询、原生可观测性、B2B 优先的架构作为默认能力。'
  );
  const foundationCta = t('demo.foundation.cta', isEn ? 'View HotelByte distribution base' : '查看企业级分销底座');
  const disclaimer = t(
    'demo.disclaimer',
    isEn
      ? 'The Stai demo is a public sample. All accounts, suppliers, and bookings shown are fictional and reset periodically.'
      : 'Stai 演示站为公开样例,所展示的账号、供应商与订单均为虚构演示数据,并会定期重置。'
  );

  const jsonLd = [
    webPageSchema(route.path, title, subtitle, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: title, path: route.path },
    ]),
  ];

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={title}
        description={subtitle}
        keywords={route.keywords}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brass/10 border border-brass/30 text-xs font-medium text-brass mb-8">
          <span className="relative flex h-2 w-2">
            
            <span className="relative inline-flex rounded-sm h-2 w-2 bg-brass"></span>
          </span>
          {badge}
        </div>

        <h1 className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
          <span className="text-5xl lg:text-7xl font-display leading-[1.05] tracking-tight text-brass">
            Stai
          </span>
          <span className="text-base lg:text-lg font-medium tracking-[0.2em] uppercase text-ink/45">
            {t('demo.byHotelByte', isEn ? 'by HotelByte' : 'by HotelByte')}
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-ink/70 font-light max-w-2xl mb-10 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-ink text-paper font-bold transition-all duration-300 group"
          >
            {ctaPrimary}
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <Link
            to="/products/b2b-distribution"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-paper-raised border border-line text-ink font-medium hover:bg-paper hover:border-ink/40 transition-all duration-300"
          >
            {ctaSecondary}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.header>

      {/* Live demo screenshots — Search / Bookings / Lookout */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24"
        aria-labelledby="demo-screens"
      >
        <h2 id="demo-screens" className="sr-only">
          {isEn ? 'Stai live demo screenshots' : 'Stai 在线演示截图'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {([
            {
              src: '/demo/search-results.png',
              alt: isEn ? 'Search results: 50 hotels across Hotelbeds, Expedia, Booking.com, Agoda with multi-currency pricing' : '搜索结果:跨 Hotelbeds、Expedia、Booking.com、Agoda 多供应商的 50 家酒店,多币种报价',
              caption: t('demo.screens.search.caption', isEn ? 'Search' : '搜索'),
              desc: t(
                'demo.screens.search.desc',
                isEn
                  ? '50 hotels across 27+ suppliers with multi-currency pricing in one view.'
                  : '27+ 供应商 50 家酒店同窗对比,多币种报价自动换算。'
              ),
            },
            {
              src: '/demo/bookings.png',
              alt: isEn ? 'Bookings dashboard: 80 orders with KPI cards and multi-supplier channels' : '订单看板:80 笔订单含 KPI 卡片与多供应商渠道',
              caption: t('demo.screens.bookings.caption', isEn ? 'Bookings' : '订单'),
              desc: t(
                'demo.screens.bookings.desc',
                isEn
                  ? '80 bookings with live KPI cards across suppliers and channels.'
                  : '80 笔订单聚合 KPI 看板,跨供应商/渠道一屏可读。'
              ),
            },
            {
              src: '/demo/lookout.png',
              alt: isEn ? 'Lookout price intelligence job: Europe Market Comparison across Hotelbeds + Expedia' : 'Lookout 价格情报任务:跨 Hotelbeds + Expedia 的欧洲市场对比',
              caption: t('demo.screens.lookout.caption', isEn ? 'Lookout' : 'Lookout'),
              desc: t(
                'demo.screens.lookout.desc',
                isEn
                  ? 'Scheduled price intelligence jobs across supplier catalogs.'
                  : '跨供应商目录的定时价格情报任务。'
              ),
            },
          ] as const).map((shot, idx) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-sm border border-line bg-paper-raised overflow-hidden hover:border-brass/40 transition-colors"
            >
              <div className="relative">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto aspect-[16/10] object-cover object-top"
                />
                <div className="absolute inset-x-0 top-0 px-4 py-3 bg-gradient-to-b from-ink/85 to-transparent">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-ink text-paper text-xs font-bold tracking-wide">
                    {shot.caption}
                  </span>
                </div>
              </div>
              <figcaption className="px-5 py-4">
                <p className="text-sm text-ink/70 leading-relaxed">{shot.desc}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.section>

      {/* Modules */}
      <section className="mb-24" aria-labelledby="demo-modules">
        <div className="text-center mb-12">
          <h2 id="demo-modules" className="text-3xl lg:text-4xl font-display mb-4">
            {modulesTitle}
          </h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">{modulesSubtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map(({ key, Icon }, idx) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-sm border border-line bg-paper-raised hover:bg-paper-raised hover:border-brass/30 transition-colors"
            >
              <Icon className="w-6 h-6 text-brass mb-4" aria-hidden="true" />
              <h3 className="text-base font-bold">
                {t(`demo.modules.${key}`, isEn ? Icon === Search ? 'Hotel Search' : Icon === CalendarCheck ? 'Bookings' : Icon === MessageSquare ? 'Sessions' : Icon === Package ? 'Products' : Icon === Boxes ? 'Suppliers' : Icon === UsersRound ? 'Customers' : Icon === Sliders ? 'Rules' : 'Lookout Pricing' : (Icon === Search ? '酒店搜索' : Icon === CalendarCheck ? '订单管理' : Icon === MessageSquare ? '会话追踪' : Icon === Package ? '产品与库存' : Icon === Boxes ? '供应商聚合' : Icon === UsersRound ? '客户档案' : Icon === Sliders ? '业务规则' : 'Lookout 价格情报'))}
              </h3>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Foundation — Stai runs on HotelByte */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 rounded-sm border border-line bg-paper-raised p-8 lg:p-12"
        aria-labelledby="demo-foundation"
      >
        <div className="flex items-center gap-3 mb-4 text-brass">
          <Cpu className="w-5 h-5" />
          <h2 id="demo-foundation" className="text-sm font-semibold uppercase tracking-wider">
            {foundationTitle}
          </h2>
        </div>
        <p className="text-xl lg:text-2xl text-ink/85 leading-relaxed mb-8 max-w-3xl font-light">
          {foundationBody}
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {pillars.map(({ key, Icon }) => (
            <div key={key} className="p-5 rounded-sm border border-line bg-paper-raised">
              <Icon className="w-5 h-5 text-brass mb-3" aria-hidden="true" />
              <h3 className="text-sm font-bold mb-2">
                {t(`demo.pillars.${key}.title`, isEn ? Icon === Cpu ? 'Multi-currency · Multi-country · Multi-segment' : Icon === Boxes ? '27+ Global Suppliers Aggregated' : 'Session-Level Evidence Chain' : (Icon === Cpu ? '多币种 · 多国家 · 多客户类型' : Icon === Boxes ? '27+ 全球供应商聚合' : '会话级全链路证据链'))}
              </h3>
              <p className="text-xs text-ink/55 leading-relaxed">
                {t(`demo.pillars.${key}.body`, isEn ? Icon === Cpu ? 'Built-in multi-currency credit, separated nationality/residency, granular RBAC — complex B2B agency ecosystems are a default capability.' : Icon === Boxes ? 'Platform → Tenant → Customer → Account hierarchy with standardized access to major hotel distribution suppliers.' : 'Every search, quote, and order folds the four-party ecosystem into one evidence chain — troubleshooting drops from hours to minutes.' : (Icon === Cpu ? '内置多币种信用管理、户籍/居所分离与细粒度 RBAC,复杂 B2B 代理生态作为默认能力。' : Icon === Boxes ? 'Platform → Tenant → Customer → Account 三级实体架构,标准化接入主流酒店分销供应链。' : '每一次搜索、报价、订单在四方生态里串成同一条证据链,排障从小时级压缩到分钟级。'))}
              </p>
            </div>
          ))}
        </div>
        <Link
          to="/products/b2b-distribution"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-colors"
        >
          {foundationCta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.section>

      {/* Disclaimer */}
      <p className="text-xs text-ink/40 text-center max-w-2xl mx-auto leading-relaxed">
        {disclaimer}
      </p>
    </div>
  );
}
