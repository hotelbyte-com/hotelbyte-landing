import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { webPageSchema, breadcrumbSchema } from '../seo/schema';

type ChangelogEntry = {
  date: string;
  titleEn: string;
  titleZh: string;
  bodyEn: string;
  bodyZh: string;
  tagEn: string;
  tagZh: string;
};

// Public release notes: written for customers, in the same product and
// commercial language as the rest of the site. No internal process, no
// implementation details, no counts that drift as integrations grow.
const ENTRIES: ChangelogEntry[] = [
  {
    date: '2026-10-05',
    titleEn: 'HotelByte in more languages, and faster to open',
    titleZh: '官网支持更多语言，打开更快',
    bodyEn:
      'The home page and the AI Distribution Interface page now read in Hindi, Spanish, French, Arabic, Portuguese, German, Turkish, Filipino and Hebrew, with the menus translated across the site. Pages also load only what they need, so they open faster, especially on mobile.',
    bodyZh:
      '首页与 AI 分销接口页面现已提供印地语、西班牙语、法语、阿拉伯语、葡萄牙语、德语、土耳其语、菲律宾语和希伯来语版本，全站菜单同步翻译。页面只加载自己需要的内容，打开更快，手机上尤其明显。',
    tagEn: 'Site',
    tagZh: '官网'
  },
  {
    date: '2026-10-05',
    titleEn: 'Introducing Stai Retail, Stai API and Stai Counselor',
    titleZh: 'Stai Retail、Stai API、Stai Counselor 上线',
    bodyEn:
      'Choose the Stai that fits how you sell hotels. Stai Retail lets independent sellers open a booking site under their own brand and turn enquiries into quote links guests book from. Stai API connects you to every supplier with one integration, compares net rates in a single search, and adds Lookout price intelligence, TraceSight diagnostics and RevenuePilot revenue strategy when you need them. Stai Counselor gives independent travel advisors a personal booking link that credits every order to them, and is now open for early access.',
    bodyZh:
      '按你卖酒店的方式选择 Stai。Stai Retail 让独立卖家用自己的品牌开店，把私域里的询价变成可以直接下单的报价链接；Stai API 一次接入全部上游，同一次搜索比出更低净价，并可按需加配 Lookout 价格情报、TraceSight 链路诊断与 RevenuePilot 收益策略；Stai Counselor 给独立旅行顾问一条专属下单链接，每一单都记在顾问名下，现已开放早期访问。',
    tagEn: 'Products',
    tagZh: '产品'
  },
  {
    date: '2026-10-04',
    titleEn: 'Verify before you sign: the sandbox verification guide',
    titleZh: '先验证，再签约：沙箱验证指南',
    bodyEn:
      'Bring the hotel list you sell today, check coverage, price level, confirmation speed and after-sales in a sandbox, and decide on one table that sets the results beside your current buying prices. Email your list to sales@hotelbyte.com with the subject "Sandbox" and we open an account scoped to your markets.',
    bodyZh:
      '拿你正在卖的酒店清单，在沙箱里逐项核对覆盖、价格水平、确认速度与售后，最后用一张与现行拿货价并排的对照表做决定。把清单发到 sales@hotelbyte.com，主题注明 Sandbox，我们按你的市场开通沙箱账号。',
    tagEn: 'Guides',
    tagZh: '指南'
  },
  {
    date: '2026-10-03',
    titleEn: 'Solutions for DMCs and travel agencies: buy cheaper, with proof',
    titleZh: '地接社与旅行社解决方案：拿货更便宜，而且有据可查',
    bodyEn:
      'A page each for DMCs and travel agencies: what you are buying, how small and large teams use it, how a partnership moves, and what needs to be in place. Each page explains where the price advantage comes from: every connected supplier bidding in the same search, wholesale net rates, quotes that carry their evidence, Lookout watching for rate parity, and self-serve per-account pricing with no implementation fee. All of it can be checked line by line against your current buying prices in a sandbox.',
    bodyZh:
      '为地接社和旅行社各写了一页：你在买什么、不同规模怎么用、合作怎么推进、需要满足哪些要求。每页都讲清价格优势从哪里来：全部上游同台竞价、批发净价直连、报价自带证据、Lookout 盯价防倒挂、软件按账号自助订阅且无实施费，每一条都可以在沙箱里用你现有的拿货价逐条验证。中文页底部可以直接通过小红书联系我们。',
    tagEn: 'Solutions',
    tagZh: '解决方案'
  },
  {
    date: '2026-06-26',
    titleEn: 'Consulting: AI Advisory and Technology Consulting',
    titleZh: '咨询服务：AI 顾问与技术咨询',
    bodyEn:
      'One engagement, two tracks. AI Advisory finds where AI can cut labor and cost and lift profit, then delivers the agents, workflows and dashboards to get there; Technology Consulting covers enterprise architecture, performance and cloud migration. Both run diagnose, design, operate, and the first phase works on your own data: adopting our platform is not a prerequisite.',
    bodyZh:
      '一次合作，两个方向。AI 顾问找出 AI 能在哪里省人、降本、增利，并交付对应的智能体、流程与看板；技术咨询覆盖企业架构、性能优化与云迁移。两个方向都按「诊断、设计、运营」推进，第一阶段基于你自己的数据，不要求先采用我们的平台。',
    tagEn: 'Services',
    tagZh: '服务'
  },
  {
    date: '2026-06-12',
    titleEn: 'Daily Stories: engineering decisions behind HotelByte',
    titleZh: '每日故事：HotelByte 背后的工程决定',
    bodyEn:
      'Short daily pieces, each on one real decision inside the HotelByte system: why a cancellation policy is not a text blob, why taxes are not small print, why blank profit beats guessed profit. All collected in Daily Stories.',
    bodyZh:
      '每天一篇短文，讲清 HotelByte 系统里的一个真实决定：取消政策为什么不是一段文本，税费为什么不是小字，利润为什么宁可留空也不去猜。全部收录在「每日故事」。',
    tagEn: 'Stories',
    tagZh: '故事'
  },
  {
    date: '2026-06-01',
    titleEn: 'Lookout, TraceSight, RevenuePilot and more',
    titleZh: 'Lookout、TraceSight、RevenuePilot 等产品上线',
    bodyEn:
      'Lookout Price Intelligence watches and compares rates on a schedule. TraceSight Diagnostics rebuilds searches and bookings from session evidence. RevenuePilot Revenue Strategy turns markup and supplier strategy into pricing changes you can simulate and audit before they go live. AI Automations investigates business data within access boundaries, and Private AI Deployment Evaluation validates models and hardware in your own environment.',
    bodyZh:
      'Lookout 价格情报按计划盯价、比价；TraceSight 链路诊断用会话证据还原搜索与预订过程；RevenuePilot 收益策略把加价与供应商策略变成上线前可模拟、可审计的调价；AI 自动化在权限边界内调查业务数据；私有化 AI 部署评估在你自己的环境里验证模型与硬件。',
    tagEn: 'Products',
    tagZh: '产品'
  }
];

export default function Changelog() {
  const { locale, t } = useI18n();
  const isEn = locale !== 'zh'; // tier-2 locales render the English body
  const route = SITE_ROUTES.changelog;
  const title = t('changelog.title', isEn ? "What's new" : '产品动态');
  const subtitle = t('changelog.subtitle', isEn ? route.description : route.descriptionZh);

  const jsonLd = [
    webPageSchema(route.path, title, subtitle, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: title, path: route.path }
    ])
  ];

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-4xl mx-auto">
      <Seo
        path={route.path}
        title={title}
        description={subtitle}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-line text-xs font-medium text-ink/70 mb-6">
          {isEn ? "What's new" : '产品动态'}
        </div>
        <h1 className="text-4xl lg:text-6xl font-display mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-ink/60 font-light max-w-2xl mx-auto">{subtitle}</p>
      </motion.header>

      {/* Timeline */}
      <ol className="space-y-6">
        {ENTRIES.length === 0 ? (
          <li className="text-center text-ink/50">
            {t('changelog.empty', isEn ? 'No updates yet.' : '暂无动态。')}
          </li>
        ) : (
          ENTRIES.map((entry, idx) => (
            <motion.li
              key={`${entry.date}-${entry.titleEn}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-6 border-l border-line"
            >
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-sm bg-brass" aria-hidden="true" />
              <article className="rounded-sm border border-line bg-paper-raised p-6">
                <header className="flex flex-wrap items-center gap-3 mb-3">
                  <time
                    dateTime={entry.date}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-ink/50"
                  >
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    {entry.date}
                  </time>
                  <span className="px-2 py-0.5 text-xs rounded-sm bg-brass/10 text-brass border border-brass/20">
                    {isEn ? entry.tagEn : entry.tagZh}
                  </span>
                </header>
                <h2 className="text-xl font-display mb-2 text-ink">
                  {isEn ? entry.titleEn : entry.titleZh}
                </h2>
                <p className="text-sm text-ink/65 leading-relaxed">
                  {isEn ? entry.bodyEn : entry.bodyZh}
                </p>
              </article>
            </motion.li>
          ))
        )}
      </ol>
    </div>
  );
}
