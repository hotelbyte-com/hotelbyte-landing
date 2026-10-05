import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useI18n, contentLocaleOf } from '../i18n';
import { localizedPath } from '../i18n/locale';
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from '../seo/schema';

// The /solutions series: one page per customer segment. A new segment is a new
// entry in `solutions` plus a SITE_ROUTES record, a nav link, and a route in
// App.tsx — the hub and the cross-links below pick it up automatically.

type Pain = { title: string; body: string; answer: string };
type SolutionCopy = {
  eyebrow: string;
  title: string;
  description: string;
  lead: string;
  offering: { title: string; body: string; points: string[] };
  price: { title: string; intro: string; mechanisms: { title: string; body: string }[]; closing: string };
  profilesTitle: string;
  profiles: { title: string; body: string; points: string[] }[];
  painsTitle: string;
  answerLabel: string;
  pains: Pain[];
  capabilitiesTitle: string;
  capabilities: { title: string; body: string; points: string[] }[];
  cooperationTitle: string;
  cooperation: { title: string; body: string; link?: { label: string; to: string } }[];
  productsTitle: string;
  productsNote: string;
  products: { name: string; when: string; note: string }[];
  requirementsTitle: string;
  requirementsNote: string;
  requirements: { title: string; body: string }[];
  questions: { question: string; answer: string }[];
  primaryLabel: string;
  secondaryLabel: string;
  mailtoSubject: string;
};

const solutions = {
  dmc: {
    path: '/solutions/dmc',
    navEn: 'DMCs & ground operators',
    navZh: '地接社',
    cardEn: 'Every connected supplier bids in the same search — buy cheaper. Live quotes, confirmed group rooms, multi-currency settlement, and white-label resale under your own brand.',
    cardZh: '全部上游同台竞价，拿货更便宜；实时报价、两段式确认、多币种结算，并可白标转售同业。',
    en: {
      eyebrow: 'For destination management companies',
      title: 'Run every hotel booking in your destination from one platform',
      description: 'Hotel supply for DMCs and ground operators: Stai API brings every connected supplier into one account (optional API access, white-label, MCP), with the partnership path, product add-on list, and settlement and compliance requirements spelled out.',
      lead: 'A destination business lives on local delivery: groups arriving in waves, tight quote deadlines, and hotel cost as the biggest procurement line — every dollar saved on buying is margin. HotelByte puts every connected hotel supplier on one platform: the same hotel and dates, priced by all of them side by side, so you buy cheaper — with live quotes and confirmations that beat the deadline.',
      offering: {
        title: 'What you are buying',
        body: 'Stai API — one account across every connected supplier, plus optional API access. Log in and you can search, compare, quote, book and run after-sales — over their aggregated inventory (Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper, ...), covering the hotels those upstreams hold in your destinations. Live rates, terms attached to every quote, books kept per currency.',
        points: [
          'Search and compare: one search lays quotes from every connected upstream for the same hotel and dates side by side — competition works on your purchase price — with taxes and cancellation policy included.',
          'Quotes: turn search results into a quote you can send the source-market operator as it is, terms riding along.',
          'Booking and after-sales: two-phase confirmation with supplier references on file; changes, cancellations and refunds leave a trail.',
          'Books: the wallet settles per buyer, seller and currency — one ledger across upstreams and currencies.',
          'Optional add-ons: API, MCP (AI assistant access), white-label, Lookout price intelligence — see "Which products you are likely to need" below.'
        ]
      },
      price: {
        title: 'Where the price advantage comes from',
        intro: 'Hotel procurement is the largest cost line of a destination business — and software is a cost too. In a thin-margin trade, both ends need to be lean. The price advantage is not a slogan: five visible mechanisms, each demonstrable on the spot.',
        mechanisms: [
          { title: 'Every connected upstream bids in one search', body: 'Same hotel, same dates: quotes from every connected source laid side by side in a single search. Competition works on your purchase price — account by account, you would never get this density.' },
          { title: 'Wholesale net rates', body: 'Upstreams supply at wholesale net rates: what you see is the price before your own pricing. What you add on top is your commercial decision.' },
          { title: 'The spread stays visible', body: 'Every quote carries its source and tax breakdown. Where a price comes from is traceable — and explainable to your customers.' },
          { title: 'Hear it first when a price is wrong', body: 'Lookout watches key hotels on a schedule: parity breaks and upstream gaps surface before your customers or competitors find them.' },
          { title: 'Software is a cost too', body: 'Thin margins demand visible software spend: the platform is a self-serve subscription per account and runs in the browser — no implementation fee, no open-ended rollout. Only the API route needs engineering.' }
        ],
        closing: 'The advantage is a mechanism, not a promise — search, evidence, price watching. Run the sandbox on the hotels you buy most and compare against your current prices, line by line.'
      },
      profilesTitle: 'Which one are you',
      profiles: [
        {
          title: 'Smaller DMC: buying is the point',
          body: 'A small team with no engineers needs to buy hotel rooms right, fast, and with grounds. One platform account is the entire onboarding cost.',
          points: [
            'Sellers search, compare and produce quotes on the platform — no IT involvement.',
            'Confirmation states are clear, and after-sales keeps supplier references to check against.',
            'Browser login, nothing to integrate, nothing to install.'
          ]
        },
        {
          title: 'Larger DMC: buy and sell',
          body: 'Beyond your own procurement, you serve trade customers. Structure their accounts, price rules and credit lines into the same platform — under your own brand if you choose.',
          points: [
            'The platform under your brand, opened to your trade customers.',
            'Customer and account hierarchy with clear data boundaries.',
            'Price rules configured per customer; books reconciled per currency.'
          ]
        }
      ],
      painsTitle: 'Pain points and answers',
      answerLabel: 'With HotelByte',
      pains: [
        {
          title: 'Quotes that take half a day',
          body: 'A source-market operator asks for 20 rooms across five nights. Your team checks supplier portals one by one, waits for WhatsApp replies, then assembles a spreadsheet. The quote arrives after the customer has booked elsewhere.',
          answer: 'One search reaches every connected supplier with live rates and availability. The quote carries taxes, cancellation policy and confirmation type, ready to send as it is.'
        },
        {
          title: 'Overflow season, unknown confirmation',
          body: 'When contracted hotels fill up, you buy from wholesalers you touch a few weeks a year. Whether a booking is truly confirmed — or merely accepted — decides whether a group lands with rooms.',
          answer: 'Two-phase booking separates an accepted request from a supplier-confirmed order, and every order keeps the supplier reference on file.'
        },
        {
          title: 'Rates you cannot see across channels',
          body: 'Contracted rates, wholesaler rates and season pricing live in different places. Nobody can say quickly which source wins for a specific date, and parity gaps surface as customer complaints.',
          answer: 'One search compares what every connected supplier quotes for the same dates. Lookout price intelligence watches your key hotels on a schedule and reports the gaps.'
        },
        {
          title: 'Settlement across suppliers and currencies',
          body: 'Prepaid and credit terms mix, currencies multiply, and monthly statements never reconcile on the first pass — finance pays for every upstream difference by hand.',
          answer: 'The wallet settles per buyer, seller and currency, so upstream payables and downstream receivables stay on one ledger.'
        }
      ],
      capabilitiesTitle: 'Capabilities',
      capabilities: [
        {
          title: 'One supply layer behind your product',
          body: 'Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper and more sit behind one interface, with hotel and room mapping checked before release.',
          points: ['Live search across every connected supplier.', 'Quotes that keep their supplier evidence.', 'One API when you want this inside your stack.']
        },
        {
          title: 'Buy upstream, sell downstream',
          body: 'A destination company is both a buyer and a seller. The same platform structures your trade customers, their price rules and their access — under your brand if you choose.',
          points: ['White-label the platform for your trade customers.', 'Customer, account and credit boundaries with explicit ownership.', 'Price rules set per customer, not per spreadsheet.']
        },
        {
          title: 'Operations that survive incidents',
          body: 'Search, booking and after-sales events share identifiers, so when something breaks, the trail reaches the supplier boundary instead of stopping at a support inbox.',
          points: ['Two-phase confirmed bookings with supplier references.', 'TraceSight diagnostics across the full linkage.', 'Lookout price intelligence on your key hotels.']
        }
      ],
      cooperationTitle: 'How the partnership gets done',
      cooperation: [
        { title: 'See the demo', body: 'Walk search, quoting, booking and after-sales in the public demo, and confirm it fits how your team works.' },
        { title: 'Sandbox validation', body: 'Bring your destinations and your hotel list: coverage, price level and confirmation speed, tested on the hotels you actually sell.', link: { label: 'Step-by-step: the sandbox verification guide', to: '/guides/sandbox-verification' } },
        { title: 'Commercial and compliance confirmation', body: 'Agree on the engagement model, settlement currencies, invoicing and entity requirements — the items under "Requirements to line up", one by one.' },
        { title: 'Go live', body: 'Platform accounts are usable on day one; the API path follows an integration plan.' }
      ],
      productsTitle: 'Which products you are likely to need',
      productsNote: 'One core; the rest are add-ons by your size and route.',
      products: [
        { name: 'Stai API', when: 'Every DMC · core', note: 'The main surface for buying and selling: search, compare, quote, orders, after-sales, books.' },
        { name: 'White-label & customer system', when: 'When you serve trade customers', note: 'Put trade customers on the platform under your own brand, with layered price rules, credit and data.' },
        { name: 'System integration (API)', when: 'With an engineering team', note: 'The same supply and booking capabilities, integrated into your existing systems through one API.' },
        { name: 'MCP / AI distribution interface', when: 'When you want AI assistants working', note: 'Agents search, quote and pre-draft bookings for human review — not a black box.' },
        { name: 'Lookout price intelligence', when: 'When rates matter', note: 'Watch key hotels across channels on a schedule; catch parity gaps before customers do.' }
      ],
      requirementsTitle: 'Requirements to line up',
      requirementsNote: 'Each item is confirmed during the commercial stage and governed by the contract.',
      requirements: [
        { title: 'Contracting entity and accounts', body: 'You contract as a company. The platform opens customers and accounts in a hierarchy, with permissions and data isolated by boundary — who sees what is fixed from day one.' },
        { title: 'Settlement and wallet', body: 'Settlement runs per buyer, seller and currency, multi-currency supported. Available currencies, credit terms and limits are confirmed commercially.' },
        { title: 'Invoicing and tax', body: 'Invoicing and tax handling follow the commercial arrangement of the contracting entity’s jurisdiction, as agreed in the contract.' },
        { title: 'Supply availability', body: 'Upstream supplier activation depends on their commercial authorization and market scope; the sandbox stage checks each item against your hotel list — what works and what does not yet gets said up front.' }
      ],
      questions: [
        { question: 'We already hold direct hotel contracts. Does this replace them?', answer: 'No. Your contracts keep running as they do today. HotelByte aggregates upstream suppliers for coverage and overflow, and lets you manage both on one platform.' },
        { question: 'Do we need an engineering team?', answer: 'No. The platform is the product — teams run search, quotes, bookings and after-sales in it. Engineering only matters if you choose the API path.' },
        { question: 'How do we verify supplier coverage in our destinations?', answer: 'Run a sandbox evaluation with your own hotel list. The integration directory also shows which adapters exist and what must be checked before claiming live coverage.' },
        { question: 'How can we verify the price advantage?', answer: 'In the sandbox, compare HotelByte quotes against your current buying prices, hotel by hotel. The spread and its source are visible in the evidence attached to each quote.' },
        { question: 'How is the software priced?', answer: 'The platform is a self-serve subscription per account, opened online; the public demo is free. API integration is scoped separately at the commercial stage.' }
      ],
      primaryLabel: 'Discuss your destination workflow',
      secondaryLabel: 'Open the platform demo',
      mailtoSubject: 'HotelByte%20DMC%20evaluation'
    },
    zh: {
      eyebrow: '面向地接社',
      title: '一个平台，管住目的地业务的每一单酒店',
      description: '面向地接社与地面服务商：Stai API 把全部上游聚合进一个账号（可选 API 接入、白标、MCP）。合作怎么走、产品怎么选、结算与合规要满足什么，这一页写清。',
      lead: '地接是一门本地履约的生意：团队一批批抵达，报价讲时效，酒店采购又是成本大头——买价每降一点，都是纯利。HotelByte 把全部酒店上游装进同一个平台：同一酒店、同一日期，各家来源的报价同台摆开，买得更便宜；报价实时，确认赶得上客户的截止时间。',
      offering: {
        title: '你在买什么',
        body: 'Stai API——一个账号接通全部上游，外加可选的 API 接入。登录之后，搜索、比价、报价、下单、售后都在里面完成——背后是各家上游供应商的聚合库存（Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等），覆盖这些上游在你目的地的酒店。价格实时，条款跟着报价走，账目按币种记录。',
        points: [
          '搜索与比价：一次搜索，全部上游对同一酒店、同一日期的报价同台摆开——买价被竞争压下来；税费与取消政策都含在其中。',
          '报价：把搜索结果稍作整理，就是能直接发给组团社的报价单；条款附在单上，不必另行解释。',
          '预订与售后：两段式确认，供应商单号留档；改期、取消、退款都有凭证可查。',
          '账目：钱包按买方、卖方、币种记账；上游再多、币种再多，一本账对清。',
          '可选件：API、MCP（AI 助手接入）、白标、Lookout 价格情报——见下文「什么产品可能是你需要的」。'
        ]
      },
      price: {
        title: '价格优势从哪里来',
        intro: '酒店采购是地接最大的成本项，软件也是成本——利润薄的行当，两头都要省。价格优势不是口号，是五个看得见的机制，每一个都可以当场演示。',
        mechanisms: [
          { title: '全部上游同台竞价', body: '同一酒店、同一日期，各家来源的报价在一次搜索里摆开，谁低谁高一目了然。你的买价被竞争压下来——逐家开户，得不到这样的竞争密度。' },
          { title: '批发净价直连', body: '上游按批发净价供货，你看到的是进入自己定价之前的价格；加多少、怎么加，是你的商业策略。' },
          { title: '价差全程可见', body: '每张报价都带来源与税费明细。贵从哪里贵、省从哪里省，追得到出处，也向客户讲得出道理。' },
          { title: '买贵了，第一时间知道', body: 'Lookout 价格情报按周期盯住重点酒店：跨渠道倒挂、上游价差，先于客人与同行发现。' },
          { title: '软件也是成本', body: '利润薄，软件的钱就要花在明处：平台按账号自助订阅、浏览器即用，没有实施费，也没有看不到头的实施周期；只有走 API 接入才需要工程投入。' }
        ],
        closing: '价格优势不靠承诺，靠机制。搜索、证据、盯价——拿你最常买的酒店跑一轮沙箱，与现有拿货价逐条对拍，即可验证。'
      },
      profilesTitle: '两种规模，两种用法',
      profiles: [
        {
          title: '小型地接社：重点是「买」',
          body: '团队小，没有研发。要的是把酒店买对、买快、买得有依据——一个平台账号就够了。',
          points: [
            '销售在平台上搜价、比价、出报价单，不需要 IT 支持。',
            '确认状态清楚，售后有供应商单号可对。',
            '浏览器登录即用，不接系统，不装软件。'
          ]
        },
        {
          title: '大型地接社：既「买」也「卖」',
          body: '除了自己采购，还要服务同业客户。把他们的账号、价格规则、信用额度放进同一套平台；需要的话，挂上你自己的品牌。',
          points: [
            '把平台挂上你的品牌，开放给同业客户。',
            '客户、账号层级与数据边界清晰。',
            '按客户配置价格规则，钱包按币种对账。'
          ]
        }
      ],
      painsTitle: '痛点与解法',
      answerLabel: 'HotelByte 的回应',
      pains: [
        {
          title: '一张报价单要等半天',
          body: '组团社要 20 间房、连住 5 晚的团队价。同事挨个登录上游门户查价、等 WhatsApp 回复，再手工拼出一张表格——报价发出去时，客人已经在别家下单。',
          answer: '一次搜索覆盖全部上游的实时房价与房态。报价自带税费、取消政策和确认类型，整理好即可发出。'
        },
        {
          title: '旺季溢出，确认没把握',
          body: '协议酒店满了，只能找一年做不上几笔的批发商救急。订单是「确认」还是只「受理」，决定团队落地那天有没有房。',
          answer: '两段式预订把「已受理」和「供应商已确认」分开，订单始终保留供应商单号，随时核对。'
        },
        {
          title: '渠道价看不全',
          body: '协议价、批发价、季节价散落各处，没人能立刻说出某天某酒店用哪个来源最合算；等价格倒挂暴露出来，往往已经是客诉。',
          answer: '同一天、同一酒店，一次搜索横向对比全部上游报价；Lookout 价格情报按周期盯住重点酒店，一有价差就报出来。'
        },
        {
          title: '多上游多币种，对账靠手工',
          body: '预付与月结混着走，币种一多，每月对账第一遍总对不平，财务在替每个上游的差异手工买单。',
          answer: '钱包按买方、卖方、币种记账：上游应付、下游应收，落在同一本账上。'
        }
      ],
      capabilitiesTitle: '能力',
      capabilities: [
        {
          title: '供应层一次接齐',
          body: 'Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等连接器在同一个接口后面，酒店与房型映射经核对后才上架。',
          points: ['一次搜索横跨全部上游。', '报价保留供应商证据。', '需要进系统时，同一套能力就是一套 API。']
        },
        {
          title: '上游买货，下游卖货',
          body: '地接社既是买方也是卖方。同一套平台管好你的同业客户、价格规则与访问边界；需要的话，挂上你自己的品牌。',
          points: ['平台可挂上你的品牌，开放给同业客户。', '客户、账号与信用边界归属明确。', '价格规则按客户配置，不靠表格。']
        },
        {
          title: '出了问题追得到底',
          body: '搜索、预订、售后事件共用一套标识。链路断在哪里，证据可以追到供应商边界，而不是停在客服邮箱里。',
          points: ['两段式确认预订，保留供应商单号。', 'TraceSight 全链路诊断。', 'Lookout 盯住重点酒店价格。']
        }
      ],
      cooperationTitle: '怎么促成合作',
      cooperation: [
        { title: '看演示', body: '在公开 demo 里走一遍搜索、报价、预订与售后，确认它合你团队的用法。' },
        { title: '沙箱验证', body: '带上你的目的地与酒店清单跑一轮：覆盖、价格水平、确认速度，都用你真实在卖的货来验。', link: { label: '具体做法见沙箱验证指南', to: '/guides/sandbox-verification' } },
        { title: '商务与合规确认', body: '把合作模式、结算币种、账期、开票与主体要求逐项谈定——见下方「合作要满足的要求」。' },
        { title: '开通上线', body: '账号开通即用；走 API 路线的，另排对接计划。' }
      ],
      productsTitle: '什么产品可能是你需要的',
      productsNote: '核心只有一个；其余按你的规模与路线加配。',
      products: [
        { name: 'Stai API', when: '所有地接社 · 必备', note: '买货卖货的主界面：搜索、比价、报价、订单、售后、账目。' },
        { name: '白标与客户体系', when: '有同业客户要服务时', note: '把同业客户接入挂着你品牌的平台，价格规则、信用与数据分层管理。' },
        { name: '系统对接（API）', when: '有技术团队、要接入自己系统时', note: '同一套供应与预订能力，以一套 API 接入现有系统。' },
        { name: 'MCP / AI 分销接口', when: '想让 AI 助手帮忙干活时', note: 'AI agent 可以搜索、报价、预填订单，交人工复核；不是黑盒。' },
        { name: 'Lookout 价格情报', when: '需要盯价格时', note: '按周期盯重点酒店的跨渠道价差，防倒挂、防客诉。' }
      ],
      requirementsTitle: '合作要满足的要求',
      requirementsNote: '以下事项在商务阶段逐项确认，以合同为准。',
      requirements: [
        { title: '签约主体与账户', body: '以公司主体签约。平台按客户、账号层级开户，权限与数据按边界隔离——谁看得见什么，第一天就定清楚。' },
        { title: '结算与钱包', body: '结算按买方、卖方、币种进行，支持多币种。可用币种、账期与额度，在商务阶段确认。' },
        { title: '发票与税务', body: '开票与税务，按签约主体所在地的规定与商业安排执行，以合同约定为准。' },
        { title: '供应覆盖', body: '上游能否启用，取决于其商业授权与市场范围。沙箱阶段拿你的酒店清单逐项核对——能用的、暂时不能用的，提前说清。' }
      ],
      questions: [
        { question: '我们有直签协议酒店，会冲突吗？', answer: '不冲突。直签协议照常执行；HotelByte 聚合多家上游补覆盖、接溢出，两边在同一个平台上管理。' },
        { question: '需要研发团队吗？', answer: '不需要。平台本身就是产品：搜索、报价、预订、售后都在里面完成。只有走 API 路线、把能力接进自己的系统时，才用得到研发。' },
        { question: '怎么验证目的地的供应商覆盖？', answer: '拿自己的酒店清单跑一轮沙箱评估；集成目录里也写明了哪些适配器存在、宣称可用之前要核对什么。' },
        { question: '价格优势怎么验证？', answer: '沙箱阶段拿你最常买的酒店，把 HotelByte 的报价与你现有渠道的拿货价逐条对比；价差与来源，在报价证据里都看得到。' },
        { question: '软件本身怎么收费？', answer: '平台按账号自助订阅、在线开通，公开 demo 免费先看；API 路线按对接范围，在商务阶段另议。' }
      ],
      primaryLabel: '聊聊你的地接业务',
      secondaryLabel: '打开平台演示',
      mailtoSubject: 'HotelByte%20DMC%20evaluation'
    }
  },
  travelAgency: {
    path: '/solutions/travel-agency',
    navEn: 'Travel agencies',
    navZh: '旅行社',
    cardEn: 'Net rates compared in one search — source cheaper. Quotes with terms attached, clear confirmation states, and after-sales evidence.',
    cardZh: '一次搜索比净价，拿货更便宜；报价带条款，预订有确认状态，售后留证据。',
    en: {
      eyebrow: 'For travel agencies',
      title: 'Hotel supply you can search, book and stand behind',
      description: 'One account across every connected supplier for travel agencies: compare net rates in a single search, quote with taxes and cancellation policy attached, book with clear confirmation states, and keep after-sales evidence — with the partnership path, product add-ons, and settlement and compliance requirements spelled out.',
      lead: 'An agency wins on speed and trust: quote fast, book exactly what you quoted, and answer for it when plans change. HotelByte puts every connected supplier behind one B2B platform — one search lays their net rates side by side, so you source cheaper — and sellers compare and book in one place, every quote carrying the terms that back it.',
      offering: {
        title: 'What you are buying',
        body: 'Stai API — a B2B hotel distribution platform, plus optional API access. Give your sellers one login and they can search upstream supply, send quotes, place bookings and run after-sales — over aggregated inventory from every connected upstream supplier (Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper, ...). Live rates, terms attached to every quote.',
        points: [
          'One search lays net rates from every connected upstream side by side — competition works on your buying price — with taxes and cancellation policy in the result.',
          'Quotes go out ready for the customer, with total payable amounts and terms riding along.',
          'Two-phase booking: "accepted" and "supplier-confirmed" are different states, and after-sales references stay on file.',
          'The wallet keeps books across currencies, so reconciliation stops being manual.',
          'Optional add-ons: API, MCP, white-label, Lookout price intelligence — see below.'
        ]
      },
      price: {
        title: 'Where the price advantage comes from',
        intro: 'Your buying price sets your margin — and software is a cost too. In a thin-margin trade, both ends need to be lean. The price advantage is not a slogan: five visible mechanisms, each demonstrable on the spot.',
        mechanisms: [
          { title: 'Every connected upstream bids in one search', body: 'Same hotel, same dates: net rates from every connected source laid side by side in a single search. Competition works on your buying price — opening wholesaler accounts one by one never gets you this density.' },
          { title: 'Wholesale net rates', body: 'Upstreams supply at wholesale net rates: what you see is the price before your own pricing. What you add on top is your commercial decision.' },
          { title: 'The spread stays visible', body: 'Every quote carries its source and tax breakdown. Where a price comes from is traceable — and explainable to your customers.' },
          { title: 'Hear it first when a price is wrong', body: 'Lookout watches key hotels on a schedule: parity breaks and upstream gaps surface before your customers or competitors find them.' },
          { title: 'Software is a cost too', body: 'Thin margins demand visible software spend: the platform is a self-serve subscription per account and runs in the browser — no implementation fee, no open-ended rollout. Only the API route needs a technical team.' }
        ],
        closing: 'The advantage is a mechanism, not a promise — search, evidence, price watching. Run the sandbox on the hotels you actually sell and compare against your current buying prices, line by line.'
      },
      profilesTitle: 'Which one are you',
      profiles: [
        {
          title: 'Selling yourself: one platform for your whole team',
          body: 'Sellers compare, book and run after-sales in one place — and the manager sees orders and books.',
          points: [
            'Accounts per seller, each responsible for their own orders.',
            'Quoting, booking and after-sales close inside one interface.',
            'No engineering needed; browser login and go.'
          ]
        },
        {
          title: 'Serving a downstream network: white-label resale',
          body: 'Run the platform under your own brand for sub-agents or corporate customers, with price rules, credit and data layered per customer.',
          points: [
            'Under white label, the platform carries your brand, not ours.',
            'Prices and rules configured per customer.',
            'Multi-level books reconciled inside the wallet system.'
          ]
        }
      ],
      painsTitle: 'Pain points and answers',
      answerLabel: 'With HotelByte',
      pains: [
        {
          title: 'One or two upstreams, opaque margins',
          body: 'Selling from a single wholesaler means selling at whatever margin they leave you. When a customer finds a lower public price, that conversation is hard to win.',
          answer: 'Compare every connected supplier in one search and pick the source that fits the sale — not the only one you have.'
        },
        {
          title: 'Pricing by hand, quotes out of date',
          body: 'Sellers hop between supplier portals, copy rates into documents, and send a quote built half an hour ago. By the time the customer confirms, the rate has moved.',
          answer: 'Quotes are rebuilt from live search in minutes, with total payable amounts, taxes and cancellation terms attached.'
        },
        {
          title: 'Bookings without a confirmation state',
          body: 'Orders submitted into a portal come back as "received" — the room is only really held once the supplier confirms. Ambiguity here becomes a guest standing at the desk without a room.',
          answer: 'Two-phase booking distinguishes an accepted request from a supplier-confirmed booking, and keeps the references support will need.'
        },
        {
          title: 'After-sales with no paper trail',
          body: 'A date change, cancellation or refund turns into back-and-forth: which policy applied, what did the supplier answer, who approved the refund.',
          answer: 'Policy, supplier responses and order status stay on one trail, and TraceSight keeps the path from quote to after-sales inspectable.'
        }
      ],
      capabilitiesTitle: 'Capabilities',
      capabilities: [
        {
          title: 'A shelf that spans the market',
          body: 'Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper and more — one login, one search, one booking workflow over all of them.',
          points: ['Live rates and availability across suppliers.', 'Hotel and room identity normalized before release.', 'Failures and latency visible, not hidden.']
        },
        {
          title: 'Your brand, your customers',
          body: 'The platform can run under your brand for staff and sub-agents, with price rules and access scoped per customer.',
          points: ['White-label the platform for your network.', 'Per-customer price rules and account boundaries.', 'One wallet across buyers, sellers and currencies.']
        },
        {
          title: 'AI beside your sellers',
          body: 'The same supply layer speaks MCP, so AI assistants can search, quote and pre-draft bookings for your sellers to review — not a black box.',
          points: ['MCP tool surface for AI agents.', 'Quotes that carry their evidence envelope.', 'Human confirmation kept in the loop.']
        }
      ],
      cooperationTitle: 'How the partnership gets done',
      cooperation: [
        { title: 'See the demo', body: 'Walk search, quoting, booking and after-sales in the public demo.' },
        { title: 'Sandbox validation', body: 'Use the hotels and destinations you actually sell; test quoting, booking and one after-sales case.', link: { label: 'Step-by-step: the sandbox verification guide', to: '/guides/sandbox-verification' } },
        { title: 'Commercial and compliance alignment', body: 'Agree on the engagement model, settlement currencies and terms, invoicing and entity requirements — the items under "Requirements to line up", one by one.' },
        { title: 'Go live', body: 'Platform accounts are usable on day one; the API path follows an integration plan.' }
      ],
      productsTitle: 'Which products you are likely to need',
      productsNote: 'One core; the rest are add-ons by your network and route.',
      products: [
        { name: 'Stai API', when: 'Every agency · core', note: 'The main surface for selling: search, compare, quote, orders, after-sales, books.' },
        { name: 'White-label & customer system', when: 'With sub-agents or corporate clients', note: 'The platform under your own brand for the network, with layered price rules, credit and data.' },
        { name: 'System integration (API)', when: 'With an engineering team', note: 'The same supply and booking capabilities inside your own systems through one API.' },
        { name: 'MCP / AI distribution interface', when: 'When you want AI assisting sellers', note: 'Agents search, quote and pre-draft bookings for human review — not a black box.' },
        { name: 'Lookout price intelligence', when: 'When you watch key hotels', note: 'Track key hotels across channels on a schedule; catch gaps before customers do.' }
      ],
      requirementsTitle: 'Requirements to line up',
      requirementsNote: 'Each item is confirmed during the commercial stage and governed by the contract.',
      requirements: [
        { title: 'Contracting entity and accounts', body: 'You contract as a company. The platform opens customers and accounts in a hierarchy, with permissions and data isolated by boundary — who sees what is fixed from day one.' },
        { title: 'Settlement and wallet', body: 'Settlement runs per buyer, seller and currency, multi-currency supported. Available currencies, credit terms and limits are confirmed commercially.' },
        { title: 'Invoicing and tax', body: 'Invoicing and tax handling follow the commercial arrangement of the contracting entity’s jurisdiction, as agreed in the contract.' },
        { title: 'Supply availability', body: 'Upstream supplier activation depends on their commercial authorization and market scope; the sandbox stage checks each item against your hotel list — what works and what does not yet gets said up front.' }
      ],
      questions: [
        { question: 'We are a small agency. Is this for us?', answer: 'The platform is account-based and needs no engineering. Start by validating the hotels you actually sell in a sandbox.' },
        { question: 'How is this different from opening wholesaler accounts directly?', answer: 'You still trade with suppliers under their commercial terms; what changes is that they all sit behind one interface, with terms, taxes and failure modes staying visible.' },
        { question: 'Can we test before committing?', answer: 'Yes — the public demo first, then a scoped sandbox evaluation with your own scenarios.' },
        { question: 'How can we verify the price advantage?', answer: 'Run the sandbox on the hotels you actually sell and compare against your current buying prices, line by line. The spread and its source are visible in the evidence attached to each quote.' },
        { question: 'How is the software priced?', answer: 'The platform is a self-serve subscription per account, opened online; the public demo is free. API integration is scoped separately at the commercial stage.' }
      ],
      primaryLabel: 'Discuss your agency workflow',
      secondaryLabel: 'Open the platform demo',
      mailtoSubject: 'HotelByte%20travel%20agency%20evaluation'
    },
    zh: {
      eyebrow: '面向旅行社',
      title: '搜得到、订得准、售后说得清的酒店供应',
      description: '给旅行社的一个账号：一次搜索比全部上游的净价，报价自带税费与取消政策，预订两段式确认，售后凭证可查。合作怎么走、产品怎么选、结算与合规要满足什么，这一页写清。',
      lead: '旅行社赢在快和稳：报价要快，订的就是报的，计划有变时答得上来。HotelByte 把全部酒店上游放进同一个 B2B 平台：一次搜索，各家来源的净价同台可比，拿货更便宜；销售在一个界面里比价、下单，每一张报价，都带着支撑它的条款。',
      offering: {
        title: '你在买什么',
        body: 'Stai API——B2B 酒店分销平台，外加可选的 API 接入。给销售团队开一个账号，搜上游、出报价、下订单、做售后，都在里面完成——背后是全部上游供应商的聚合库存（Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等）。价格实时，条款跟着报价走。',
        points: [
          '一次搜索，全部上游净价同台对比——拿货价被竞争压下来；税费与取消政策都在结果里。',
          '报价稍作整理就能发给客户，应付总价与条款附在单上。',
          '两段式确认预订：「已受理」与「供应商已确认」分开显示，售后单号留档。',
          '钱包支持多币种记账，月底对账不必再靠手工。',
          '可选件：API、MCP、白标、Lookout 价格情报——见下文「什么产品可能是你需要的」。'
        ]
      },
      price: {
        title: '价格优势从哪里来',
        intro: '拿货价直接决定毛利，软件也是成本——利润薄的行当，两头都要省。价格优势不是口号，是五个看得见的机制，每一个都可以当场演示。',
        mechanisms: [
          { title: '全部上游同台竞价', body: '同一酒店、同一日期，各家来源的净价在一次搜索里摆开，谁低谁高一目了然。你的拿货价被竞争压下来——逐家开户，得不到这样的竞争密度。' },
          { title: '批发净价直连', body: '上游按批发净价供货，你看到的是进入自己定价之前的价格；加多少、怎么加，是你的商业策略。' },
          { title: '价差全程可见', body: '每张报价都带来源与税费明细。贵从哪里贵、省从哪里省，追得到出处，也向客户讲得出道理。' },
          { title: '买贵了，第一时间知道', body: 'Lookout 价格情报按周期盯住重点酒店：跨渠道倒挂、上游价差，先于客人与同行发现。' },
          { title: '软件也是成本', body: '利润薄，软件的钱就要花在明处：平台按账号自助订阅、浏览器即用，没有实施费，也没有看不到头的实施周期；只有接 API 才需要技术团队。' }
        ],
        closing: '价格优势不靠承诺，靠机制。拿你实际在卖的酒店跑一轮沙箱，与现在的拿货价逐条对拍，即可验证。'
      },
      profilesTitle: '两种用法：自己卖，或带着网络卖',
      profiles: [
        {
          title: '自己卖：团队共用一个账号体系',
          body: '销售在平台上比价、下单、做售后；管理者看得到订单与账目。',
          points: [
            '按人开账号，各管各的单。',
            '报价、下单、售后在一个界面里完成。',
            '不需要研发，浏览器登录即用。'
          ]
        },
        {
          title: '有下游要服务：白标转售',
          body: '挂上你自己的品牌，把平台开放给下级代理或企业客户；价格规则、额度与数据分层管理。',
          points: [
            '白标之后，平台挂的是你的品牌，不是我们的。',
            '按客户配置价格与规则。',
            '多级账目在钱包里分层对清。'
          ]
        }
      ],
      painsTitle: '痛点与解法',
      answerLabel: 'HotelByte 的回应',
      pains: [
        {
          title: '上游一两家，利润看不透',
          body: '只从一家批发商拿货，毛利就是对方留给你的那部分。客人在公开渠道查到更便宜的价格时，这一单很难解释。',
          answer: '一次搜索横向对比全部上游，按这一单选最合适的货源，而不是只能用手上仅有的那家。'
        },
        {
          title: '手工比价，报价必过期',
          body: '销售在几个供应商门户之间切换，把房价抄进文档；发出去的报价是半小时前的快照，客人确认时，价格早已变了。',
          answer: '报价在几分钟内从实时搜索重建，应付总价、税费、取消条款随单携带。'
        },
        {
          title: '订单没有确认状态',
          body: '门户里提交的订单先显示「已接收」，房间真正锁定要等供应商确认。这里的含糊，最后会变成客人到店没房。',
          answer: '两段式预订区分「已受理」与「供应商已确认」，售后要用的单号一直都在。'
        },
        {
          title: '售后没有凭证',
          body: '改期、取消、退款，来回扯皮：当时适用哪条政策、供应商回了什么、谁批的退款，谁也说不全。',
          answer: '政策、供应商响应和订单状态留在同一条链上；TraceSight 把从报价到售后的链路完整保留，随时回查。'
        }
      ],
      capabilitiesTitle: '能力',
      capabilities: [
        {
          title: '一张货架，铺满市场',
          body: 'Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等连接器——一个登录、一次搜索、一套预订流程。',
          points: ['跨上游实时房价与房态。', '酒店与房型身份先归一再上架。', '失败与耗时可见，不被遮挡。']
        },
        {
          title: '你的品牌，你的客户',
          body: '平台可以挂你的品牌运行，供自己的销售与下级代理使用；价格规则与访问范围按客户划清。',
          points: ['平台以你的品牌开放给代理网络。', '按客户配置价格规则与账号边界。', '买方、卖方、多币种共用一本钱包账。']
        },
        {
          title: 'AI 站在销售旁边',
          body: '同一套供应能力也支持 MCP：AI 助手可以搜索、报价、预填订单，交给销售复核——不是黑盒。',
          points: ['面向 AI Agent 的 MCP 工具面。', '报价自带证据信封。', '关键动作保留人工确认。']
        }
      ],
      cooperationTitle: '怎么促成合作',
      cooperation: [
        { title: '看演示', body: '在公开 demo 里走一遍搜索、报价与预订。' },
        { title: '沙箱验证', body: '拿你实际在卖的酒店和目的地，测报价、预订和一次售后场景。', link: { label: '具体做法见沙箱验证指南', to: '/guides/sandbox-verification' } },
        { title: '商务与合规确认', body: '把合作模式、结算币种、账期、开票与主体要求逐项谈定——见下方「合作要满足的要求」。' },
        { title: '开通上线', body: '账号开通即用；走 API 路线的，另排对接计划。' }
      ],
      productsTitle: '什么产品可能是你需要的',
      productsNote: '核心只有一个；其余按你的网络与路线加配。',
      products: [
        { name: 'Stai API', when: '所有旅行社 · 必备', note: '卖货的主界面：搜索、比价、报价、订单、售后、账目。' },
        { name: '白标与客户体系', when: '有下级代理或企业客户时', note: '把平台挂上你的品牌，开放给代理网络；价格规则、信用与数据分层管理。' },
        { name: '系统对接（API）', when: '有技术团队时', note: '同一套供应与预订能力，接入你自己的系统。' },
        { name: 'MCP / AI 分销接口', when: '想让 AI 帮销售干活时', note: 'AI agent 搜索、报价、预填订单，人工复核；不是黑盒。' },
        { name: 'Lookout 价格情报', when: '需要盯重点酒店价格时', note: '按周期盯重点酒店的跨渠道价差，倒挂先于客人发现。' }
      ],
      requirementsTitle: '合作要满足的要求',
      requirementsNote: '以下事项在商务阶段逐项确认，以合同为准。',
      requirements: [
        { title: '签约主体与账户', body: '以公司主体签约。平台按客户、账号层级开户，权限与数据按边界隔离——谁看得见什么，第一天就定清楚。' },
        { title: '结算与钱包', body: '结算按买方、卖方、币种进行，支持多币种。可用币种、账期与额度，在商务阶段确认。' },
        { title: '发票与税务', body: '开票与税务，按签约主体所在地的规定与商业安排执行，以合同约定为准。' },
        { title: '供应覆盖', body: '上游能否启用，取决于其商业授权与市场范围。沙箱阶段拿你的酒店清单逐项核对——能用的、暂时不能用的，提前说清。' }
      ],
      questions: [
        { question: '我们是小社，适合用吗？', answer: '平台按账号使用，不需要研发。先用你实际在卖的酒店清单，在沙箱里验证一轮。' },
        { question: '和直接找批发商开户有什么区别？', answer: '商业条款仍按各上游执行；区别在于全部上游都在同一个接口后面，条款、税费与故障信息不被遮挡。' },
        { question: '可以先试再决定吗？', answer: '可以。先看公开 demo，再挑几个你在卖的酒店和目的地，跑一轮沙箱验证。' },
        { question: '价格优势怎么验证？', answer: '拿你实际在卖的酒店跑沙箱，把 HotelByte 报价与你现在的拿货价逐条对比；价差与来源，都写在报价证据里。' },
        { question: '软件本身怎么收费？', answer: '平台按账号自助订阅、在线开通，公开 demo 免费先看；API 路线按对接范围，在商务阶段另议。' }
      ],
      primaryLabel: '聊聊你的旅行社业务',
      secondaryLabel: '打开平台演示',
      mailtoSubject: 'HotelByte%20travel%20agency%20evaluation'
    }
  }
} satisfies Record<string, {
  path: string;
  navEn: string;
  navZh: string;
  cardEn: string;
  cardZh: string;
  en: SolutionCopy;
  zh: SolutionCopy;
}>;

type SolutionKey = keyof typeof solutions;

// Non-solution-series pages that still belong in the hub and the
// "more segments" cross-link row.
const extraEntries = [
  {
    path: '/solutions/distribution-platforms',
    navEn: 'Distribution platforms',
    navZh: '分销平台',
    cardEn: 'Connect supply, structure customer access, and investigate booking operations.',
    cardZh: '接入供应、管理客户权限并诊断预订链路。'
  },
  {
    path: '/services/consulting',
    navEn: 'Consulting',
    navZh: '咨询服务',
    cardEn: 'AI advisory and technology consulting from the team that built HotelByte.',
    cardZh: '由建设 HotelByte 的团队提供 AI 顾问与技术咨询。'
  }
];

function SolutionPage({ solutionKey }: { solutionKey: SolutionKey }) {
  const { locale } = useI18n();
  const solution = solutions[solutionKey];
  // Locale publication is controlled by the prerender manifest. A missing
  // translation must never silently render English under a localized URL.
  const copy = solution[contentLocaleOf(locale)];
  if (!copy) return null;
  const isZh = locale === 'zh';
  const to = (path: string) => localizedPath(path, locale);
  const jsonLd = [
    webPageSchema(solution.path, copy.title, copy.description, isZh ? 'zh-CN' : 'en'),
    faqSchema(copy.questions.map(({ question, answer }) => ({ q: question, a: answer }))),
    breadcrumbSchema([
      { name: isZh ? '首页' : 'Home', path: '/' },
      { name: isZh ? '解决方案' : 'Solutions', path: '/solutions' },
      { name: copy.title, path: solution.path }
    ])
  ];

  return (
    <article className="px-6 lg:px-8 py-16 lg:py-24">
      <Seo path={solution.path} title={`${copy.title} | HotelByte`} description={copy.description} locale={isZh ? 'zh-CN' : 'en'} jsonLd={jsonLd} />
      <div className="max-w-6xl mx-auto">
        <header className="max-w-4xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass mb-6">{copy.eyebrow}</p>
          <h1 className="font-display text-4xl lg:text-6xl leading-tight mb-7">{copy.title}</h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-3xl">{copy.lead}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={`mailto:sales@hotelbyte.com?subject=${copy.mailtoSubject}`} className="px-6 py-3 bg-ink text-paper font-medium rounded-sm hover:bg-ink-deep">{copy.primaryLabel}</a>
            <Link to={to('/demo')} className="px-6 py-3 border border-ink/30 text-ink font-medium rounded-sm hover:border-ink">{copy.secondaryLabel}</Link>
          </div>
        </header>

        <section className="mb-16 max-w-4xl" aria-labelledby="solution-offering">
          <h2 id="solution-offering" className="font-display text-3xl mb-6">{copy.offering.title}</h2>
          <p className="text-ink/70 leading-relaxed mb-6">{copy.offering.body}</p>
          <ul className="list-disc ps-5 space-y-2 text-ink/85">
            {copy.offering.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </section>

        <section className="mb-16" aria-labelledby="solution-price">
          <h2 id="solution-price" className="font-display text-3xl mb-6">{copy.price.title}</h2>
          <p className="text-ink/70 leading-relaxed max-w-4xl mb-8">{copy.price.intro}</p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {copy.price.mechanisms.map((mechanism, index) => (
              <article key={mechanism.title} className="border border-line bg-paper-raised p-7">
                <span className="font-display text-2xl text-brass block mb-3" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl mb-3">{mechanism.title}</h3>
                <p className="text-ink/70 leading-relaxed">{mechanism.body}</p>
              </article>
            ))}
          </div>
          <p className="text-ink/85 leading-relaxed max-w-4xl border-t border-line pt-6">{copy.price.closing}</p>
        </section>

        <section className="mb-16" aria-labelledby="solution-profiles">
          <h2 id="solution-profiles" className="font-display text-3xl mb-8">{copy.profilesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {copy.profiles.map((profile) => (
              <article key={profile.title} className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-2xl mb-4">{profile.title}</h3>
                <p className="text-ink/70 leading-relaxed mb-5">{profile.body}</p>
                <ul className="list-disc ps-5 space-y-2 text-sm text-ink/75">
                  {profile.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="solution-pains">
          <h2 id="solution-pains" className="font-display text-3xl mb-8">{copy.painsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {copy.pains.map((pain) => (
              <article key={pain.title} className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-2xl mb-4">{pain.title}</h3>
                <p className="text-ink/70 leading-relaxed">{pain.body}</p>
                <div className="border-t border-line mt-5 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass mb-2">{copy.answerLabel}</p>
                  <p className="text-ink/85 leading-relaxed">{pain.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="solution-capabilities">
          <h2 id="solution-capabilities" className="font-display text-3xl mb-8">{copy.capabilitiesTitle}</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {copy.capabilities.map((capability) => (
              <section key={capability.title} className="border border-line bg-paper-raised p-7">
                <h3 className="font-display text-2xl mb-4">{capability.title}</h3>
                <p className="text-ink/70 leading-relaxed mb-5">{capability.body}</p>
                <ul className="list-disc ps-5 space-y-2 text-sm text-ink/75">
                  {capability.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="solution-cooperation">
          <h2 id="solution-cooperation" className="font-display text-3xl mb-8">{copy.cooperationTitle}</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.cooperation.map((step, index) => (
              <li key={step.title} className="border border-line bg-paper-raised p-7">
                <span className="font-display text-3xl text-brass block mb-3" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{step.body}</p>
                {step.link && (
                  <Link to={to(step.link.to)} className="inline-block mt-3 text-sm text-brass underline hover:text-brass">
                    {step.link.label} →
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16" aria-labelledby="solution-products">
          <h2 id="solution-products" className="font-display text-3xl mb-8">{copy.productsTitle}</h2>
          <p className="text-sm text-ink/60 mb-6">{copy.productsNote}</p>
          <div className="border-y border-line divide-y divide-line">
            {copy.products.map((product) => (
              <div key={product.name} className="grid lg:grid-cols-[260px_1fr] gap-x-8 gap-y-2 py-6">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-brass mt-1">{product.when}</p>
                </div>
                <p className="text-ink/70 leading-relaxed">{product.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 max-w-4xl" aria-labelledby="solution-requirements">
          <h2 id="solution-requirements" className="font-display text-3xl mb-4">{copy.requirementsTitle}</h2>
          <p className="text-sm text-ink/60 mb-8">{copy.requirementsNote}</p>
          <div className="divide-y divide-line border-y border-line">
            {copy.requirements.map((requirement, index) => (
              <div key={requirement.title} className="py-6 flex gap-5">
                <span className="font-display text-2xl text-brass shrink-0" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{requirement.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{requirement.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mb-16" aria-labelledby="solution-questions">
          <h2 id="solution-questions" className="font-display text-3xl mb-6">{isZh ? '常见问题' : 'Questions buyers ask'}</h2>
          <div className="divide-y divide-line border-y border-line">
            {copy.questions.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <h3 className="font-semibold text-lg mb-2">{question}</h3>
                <p className="text-ink/70 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {isZh && <XiaohongshuContact />}

        <nav aria-label={isZh ? '继续探索' : 'Continue exploring'} className="border-t border-line pt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link className="underline hover:text-brass" to={to('/guides/sandbox-verification')}>{isZh ? '沙箱验证指南' : 'Sandbox verification guide'}</Link>
          <Link className="underline hover:text-brass" to={to('/products/api')}>Stai API</Link>
          <Link className="underline hover:text-brass" to={to('/compare')}>{isZh ? '选型指南' : 'Evaluation checklist'}</Link>
          <Link className="underline hover:text-brass" to={to('/stories')}>{isZh ? '工程故事' : 'Engineering stories'}</Link>
          <Link className="underline hover:text-brass" to={to('/demo')}>{isZh ? '公开 Demo' : 'Public demo'}</Link>
        </nav>
      </div>
    </article>
  );
}

// Chinese-only contact block: the Xiaohongshu account targets
// Chinese-speaking buyers, so tier-2 locales do not render it.
function XiaohongshuContact({ className = '' }: { className?: string }) {
  return (
    <section className={`mb-16 max-w-4xl ${className}`} aria-labelledby="solution-xiaohongshu">
      <h2 id="solution-xiaohongshu" className="font-display text-3xl mb-8">在小红书找到我们</h2>
      <div className="border border-line bg-paper-raised p-7 flex flex-col md:flex-row items-center gap-8">
        <img
          src="/contact-xiaohongshu-qr.jpg"
          alt="HotelByte 小红书二维码（2b 酒店供销社）"
          width={290}
          height={290}
          loading="lazy"
          className="w-48 h-48 bg-white p-2 border border-line shrink-0"
        />
        <div className="text-center md:text-start">
          <p className="font-semibold text-lg mb-2">2b 酒店供销社 hotelbyte</p>
          <p className="text-ink/70 leading-relaxed mb-4">
            扫码关注，或在小红书 App 内搜索 9568468696。我们在上面记录酒店分销的日常，也随时欢迎来聊合作。
          </p>
          <a href="/contact-xiaohongshu.jpg" target="_blank" rel="noopener noreferrer" className="text-sm text-brass underline hover:text-brass">
            查看完整名片 →
          </a>
        </div>
      </div>
    </section>
  );
}

export function DmcSolution() { return <SolutionPage solutionKey="dmc" />; }
export function TravelAgencySolution() { return <SolutionPage solutionKey="travelAgency" />; }

export function SolutionsIndex() {
  const { locale } = useI18n();
  const isZh = locale === 'zh';
  const to = (path: string) => localizedPath(path, locale);
  const cards = [
    ...Object.values(solutions).map((solution) => ({
      path: solution.path,
      title: isZh ? solution.navZh : solution.navEn,
      text: isZh ? solution.cardZh : solution.cardEn
    })),
    ...extraEntries.map((entry) => ({
      path: entry.path,
      title: isZh ? entry.navZh : entry.navEn,
      text: isZh ? entry.cardZh : entry.cardEn
    }))
  ];
  const title = isZh ? '从你在链路上的位置进入' : 'Start from your seat in the chain';
  const description = isZh
    ? '按客群组织的 HotelByte 解决方案：地接社、旅行社、分销平台与咨询服务，每个客群一个页面。'
    : 'HotelByte solutions by segment: destination management companies, travel agencies, distribution platforms, and consulting — one page per segment.';
  const jsonLd = [
    webPageSchema('/solutions', title, description, isZh ? 'zh-CN' : 'en'),
    itemListSchema(
      isZh ? '按客群的解决方案' : 'Solutions by segment',
      description,
      cards.map((card) => ({ name: card.title, path: card.path, description: card.text }))
    ),
    breadcrumbSchema([
      { name: isZh ? '首页' : 'Home', path: '/' },
      { name: isZh ? '解决方案' : 'Solutions', path: '/solutions' }
    ])
  ];

  return (
    <article className="px-6 lg:px-8 py-16 lg:py-24">
      <Seo path="/solutions" title={`${title} | HotelByte`} description={description} locale={isZh ? 'zh-CN' : 'en'} jsonLd={jsonLd} />
      <div className="max-w-6xl mx-auto">
        <header className="max-w-4xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass mb-6">{isZh ? '解决方案' : 'Solutions'}</p>
          <h1 className="font-display text-4xl lg:text-6xl leading-tight mb-7">{title}</h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-3xl">
            {isZh
              ? '酒店分销链路上有不同的角色：有人运营目的地，有人销售旅行产品，有人经营分销平台。按你的角色进入——每个客群一页，写各自的工作流。'
              : 'Hotel distribution involves different jobs: running a destination, selling travel, operating a distribution platform. Pick your seat — each segment gets its own page, written for its own workflow.'}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {cards.map((card) => (
            <Link key={card.path} to={to(card.path)} className="group border border-line bg-paper-raised p-8 hover:border-ink/40">
              <h2 className="font-display text-2xl mb-3">{card.title}</h2>
              <p className="text-ink/70 leading-relaxed mb-6">{card.text}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-brass">
                {isZh ? '查看这一客群' : 'Read this segment'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <p className="text-sm text-ink/60">
          {isZh ? '更多客群会以单页形式持续补充——没看到你的角色？' : 'More segments are added as one-pagers — yours is missing? '}
          <a href="mailto:sales@hotelbyte.com?subject=HotelByte%20solutions%20segment%20request" className="underline hover:text-brass">
            {isZh ? '告诉我们。' : 'Tell us.'}
          </a>
        </p>

        {isZh && <XiaohongshuContact className="mt-16" />}
      </div>
    </article>
  );
}
