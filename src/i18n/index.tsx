import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Locale = 'zh' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'zh',
  setLocale: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export function useI18n() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('hb-locale') : null;
    return (saved as Locale) || 'zh';
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hb-locale', l);
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      const dict = dictionaries[locale];
      return dict[key] ?? fallback ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// --- Dictionaries ---

const zh: Record<string, string> = {
  // Nav
  'nav.products': '产品',
  'nav.compare': '竞品对比',
  'nav.docs': '开发文档',
  'nav.blog': '技术博客',
  'nav.login': '登录',
  'nav.contact': '联系我们',

  // Home Hero
  'hero.badge': 'DeepSeek V4 Pro 深度集成现已上线',
  'hero.title1': 'AI-Native',
  'hero.title2': '工程化操作系统',
  'hero.title3': '专为酒店分销打造。',
  'hero.subtitle': '深耕酒店分销领域，以 AI-Native 技术底座为酒店分销企业赋能智能化升级。从价格情报、故障诊断到数据分析与智能分销，让每一个业务环节都获得 AI 的实时赋能，实现可量化的效率提升与成本优化。',
  'hero.cta.pricing': '探索订阅方案',
  'hero.cta.docs': '查看开发文档',

  // Home Products
  'products.title': '产品矩阵',
  'product.lookout.name': 'Lookout 价格情报',
  'product.lookout.desc': '高并发价格爬虫引擎。提供实时的竞争基准测试与异常波动监控，助力收益最大化。',
  'product.lookout.link': '探索比价引擎',
  'product.dist.name': '企业级分销底座',
  'product.dist.desc': '三层实体架构支撑。已标准集成 27+ 顶级酒店供应商，支持复杂的多层级代理生态与细粒度信用管理。',
  'product.dist.link': '查看集成方案',
  'product.tracesight.name': 'TraceSight 追光',
  'product.tracesight.desc': '全链路智能诊断平台。将会话级追踪、AI 根因分析与自主运维融为一体，让故障排查从小时级降至分钟级。',
  'product.tracesight.link': '了解 TraceSight',
  'product.ds4.name': 'DeepSeek V4-Flash 一体机',
  'product.ds4.desc': '内置知识库、Data Agent 与自进化引擎的企业 AI 平台。预置垂直场景模板，30 分钟部署，让 AI 真正落地您的业务。',
  'product.ds4.link': '了解一体机方案',

  // Home Why Us
  'why.title': '为什么选择 HotelByte？',
  'why.subtitle': '与 SiteMinder、Cloudbeds、D-EDGE 等主流方案的全面对比。看看为什么越来越多的酒店分销企业正在切换至 HotelByte。',
  'why.point1': 'AI-Native 架构，而非外挂式 Chatbot',
  'why.point2': '性能化定价，而非固定月费',
  'why.point3': 'B2B 代理生态原生支持',
  'why.point4': '27+ 全球供应商预集成',
  'why.cta': '查看完整对比',
  'why.stat.ai': 'AI 原生',
  'why.stat.pricing': '按用量付费',
  'why.stat.b2b': '四级实体架构',
  'why.stat.suppliers': '27+ 供应商',

  // Subscriptions
  'subs.title': '选择您的增长引擎',
  'subs.subtitle': '为不同规模的旅游企业提供可扩展的技术底座。',
  'subs.starter.name': 'Portal Starter',
  'subs.starter.desc': '适合小团队自助完成搜索和预订。',
  'subs.starter.price': 'Custom',
  'subs.starter.f1': '基础门户访问',
  'subs.starter.f2': '标准酒店库存',
  'subs.starter.f3': '基础报表',
  'subs.starter.f4': '社区支持',
  'subs.starter.cta': '联系我们',
  'subs.growth.name': 'API Growth',
  'subs.growth.desc': '增加 API 调用规模与 Lookout 价格洞察。',
  'subs.growth.price': 'Volume',
  'subs.growth.f1': '包含 Starter 所有功能',
  'subs.growth.f2': '高并发 API 接入',
  'subs.growth.f3': 'Lookout 基础版',
  'subs.growth.f4': '高级数据导出',
  'subs.growth.cta': '获取报价',
  'subs.enterprise.name': 'All-in-One Ops',
  'subs.enterprise.desc': '包含 AI Agent 全家桶、白标和高级管控。',
  'subs.enterprise.price': 'Enterprise',
  'subs.enterprise.f1': 'Data Agent 数据智能体',
  'subs.enterprise.f2': 'TraceSight 全功能',
  'subs.enterprise.f3': '定制化 API 专属网关',
  'subs.enterprise.f4': '白标定制 (White Label)',
  'subs.enterprise.f5': '高级 RBAC 权限',
  'subs.enterprise.cta': '申请演示',
  'subs.recommended': 'RECOMMENDED',

  // Common
  'common.learnMore': '了解更多',
  'common.viewDocs': '查看文档',
  'common.contactSales': '联系销售',
  'common.getQuote': '获取报价',
  'common.bookDemo': '申请演示',
  'common.compare': '查看竞品对比',
  'common.viewDetails': '查看详情',
};

const en: Record<string, string> = {
  // Nav
  'nav.products': 'Products',
  'nav.compare': 'Compare',
  'nav.docs': 'Docs',
  'nav.blog': 'Blog',
  'nav.login': 'Login',
  'nav.contact': 'Contact',

  // Home Hero
  'hero.badge': 'DeepSeek V4 Pro Integration Now Live',
  'hero.title1': 'AI-Native',
  'hero.title2': 'Engineering OS',
  'hero.title3': 'for Hotel Distribution.',
  'hero.subtitle': 'Deep expertise in hotel distribution, delivering AI-powered solutions that drive measurable efficiency gains and cost optimization. From price intelligence and fault diagnosis to data analytics and smart distribution — every business process is empowered by AI in real time.',
  'hero.cta.pricing': 'Explore Plans',
  'hero.cta.docs': 'View Docs',

  // Home Products
  'products.title': 'Product Suite',
  'product.lookout.name': 'Lookout Price Intelligence',
  'product.lookout.desc': 'High-concurrency price crawler. Real-time competitive benchmarking and anomaly monitoring to maximize revenue.',
  'product.lookout.link': 'Explore Price Engine',
  'product.dist.name': 'Enterprise Distribution Base',
  'product.dist.desc': '3-tier entity architecture. 27+ top hotel suppliers pre-integrated. Complex multi-level agency ecosystem with granular credit management.',
  'product.dist.link': 'View Integration',
  'product.tracesight.name': 'TraceSight',
  'product.tracesight.desc': 'Full-linkage intelligent diagnostics. Session-level tracing, AI root-cause analysis, and autonomous ops — cutting troubleshooting from hours to minutes.',
  'product.tracesight.link': 'Explore TraceSight',
  'product.ds4.name': 'DeepSeek V4-Flash Appliance',
  'product.ds4.desc': 'Enterprise AI platform with built-in knowledge base, Data Agent, and self-evolving engine. Pre-built vertical templates. Deploy in 30 minutes and start delivering value.',
  'product.ds4.link': 'Explore Appliance',

  // Home Why Us
  'why.title': 'Why HotelByte?',
  'why.subtitle': 'Full comparison with SiteMinder, Cloudbeds, D-EDGE and more. See why leading hotel distribution companies are switching.',
  'why.point1': 'AI-Native architecture, not bolt-on Chatbot',
  'why.point2': 'Usage-based pricing, not fixed monthly fees',
  'why.point3': 'B2B agency ecosystem natively supported',
  'why.point4': '27+ global suppliers pre-integrated',
  'why.cta': 'Full Comparison',
  'why.stat.ai': 'AI-Native',
  'why.stat.pricing': 'Pay-as-you-go',
  'why.stat.b2b': '4-Tier Architecture',
  'why.stat.suppliers': '27+ Suppliers',

  // Subscriptions
  'subs.title': 'Choose Your Growth Engine',
  'subs.subtitle': 'Scalable technology foundation for travel businesses of all sizes.',
  'subs.starter.name': 'Portal Starter',
  'subs.starter.desc': 'For small teams to self-serve search and booking.',
  'subs.starter.price': 'Custom',
  'subs.starter.f1': 'Basic portal access',
  'subs.starter.f2': 'Standard hotel inventory',
  'subs.starter.f3': 'Basic reports',
  'subs.starter.f4': 'Community support',
  'subs.starter.cta': 'Contact Us',
  'subs.growth.name': 'API Growth',
  'subs.growth.desc': 'Scale API calls with Lookout price insights.',
  'subs.growth.price': 'Volume',
  'subs.growth.f1': 'Everything in Starter',
  'subs.growth.f2': 'High-concurrency API access',
  'subs.growth.f3': 'Lookout Basic',
  'subs.growth.f4': 'Advanced data export',
  'subs.growth.cta': 'Get Quote',
  'subs.enterprise.name': 'All-in-One Ops',
  'subs.enterprise.desc': 'Full AI Agent suite, white-label, and advanced controls.',
  'subs.enterprise.price': 'Enterprise',
  'subs.enterprise.f1': 'Data Agent intelligence',
  'subs.enterprise.f2': 'TraceSight Full Suite',
  'subs.enterprise.f3': 'Custom API gateway',
  'subs.enterprise.f4': 'White-label customization',
  'subs.enterprise.f5': 'Advanced RBAC',
  'subs.enterprise.cta': 'Book Demo',
  'subs.recommended': 'RECOMMENDED',

  // Common
  'common.learnMore': 'Learn More',
  'common.viewDocs': 'View Docs',
  'common.contactSales': 'Contact Sales',
  'common.getQuote': 'Get Quote',
  'common.bookDemo': 'Book Demo',
  'common.compare': 'Compare',
  'common.viewDetails': 'View Details',
};

const dictionaries: Record<Locale, Record<string, string>> = { zh, en };
