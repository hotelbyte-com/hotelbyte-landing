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
  profilesTitle: string;
  profiles: { title: string; body: string; points: string[] }[];
  painsTitle: string;
  answerLabel: string;
  pains: Pain[];
  capabilitiesTitle: string;
  capabilities: { title: string; body: string; points: string[] }[];
  cooperationTitle: string;
  cooperation: { title: string; body: string }[];
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
    cardEn: 'Aggregate 27+ suppliers, quote from live rates, confirm group rooms, settle across currencies, and resell to your trade network under your own brand.',
    cardZh: '聚合 27+ 上游，按实时房价报价，确认团队用房，多币种结算，并用自己的品牌转售给同业网络。',
    en: {
      eyebrow: 'For destination management companies',
      title: 'Run every hotel booking in your destination from one workbench',
      description: 'Hotel supply for DMCs and ground operators: 27+ suppliers aggregated in one B2B workbench (optional API, white-label, MCP), with the partnership path, product add-on list, and settlement and compliance requirements spelled out.',
      lead: 'A destination business lives on local delivery: groups arriving in waves, tight response windows, and hotel cost as the biggest procurement line. HotelByte puts 27+ hotel suppliers behind one workbench and one API, so your product team quotes from live rates instead of chasing portals, and rooms are confirmed before the deadline passes.',
      offering: {
        title: 'What you are buying',
        body: 'A B2B hotel distribution workbench, plus an optional API. Log in and you can search, compare, quote, book and run after-sales — over aggregated inventory from 27+ upstream suppliers (Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper, ...), covering the hotels those upstreams hold in your destinations. Live rates, terms attached to every quote, books kept per currency.',
        points: [
          'Search and compare live: one search shows what 27+ upstreams quote for the same hotel and dates, taxes and cancellation policy included.',
          'Quotes: turn search results into a quote you can send the source-market operator as it is, terms riding along.',
          'Booking and after-sales: two-phase confirmation with supplier references on file; changes, cancellations and refunds leave a trail.',
          'Books: the wallet settles per buyer, seller and currency — one ledger across upstreams and currencies.',
          'Optional add-ons: API, MCP (AI assistant access), white-label, Lookout price intelligence — see "Which products you are likely to need" below.'
        ]
      },
      profilesTitle: 'Which one are you',
      profiles: [
        {
          title: 'Smaller DMC: buying is the point',
          body: 'A small team with no engineers needs to buy hotel rooms right, fast, and with grounds. One workbench account is the entire onboarding cost.',
          points: [
            'Sellers search, compare and produce quotes in the workbench — no IT involvement.',
            'Confirmation states are clear, and after-sales keeps supplier references to check against.',
            'Browser login, nothing to integrate, nothing to install.'
          ]
        },
        {
          title: 'Larger DMC: buy and sell',
          body: 'Beyond your own procurement, you serve trade customers. Structure their accounts, price rules and credit lines into the same platform — under your own brand if you choose.',
          points: [
            'A white-labelled workbench opened to your trade customers.',
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
          answer: 'One search reaches 27+ suppliers with live rates and availability. The quote carries taxes, cancellation policy and confirmation type, ready to send as it is.'
        },
        {
          title: 'Overflow season, unknown confirmation',
          body: 'When contracted hotels fill up, you buy from wholesalers you touch a few weeks a year. Whether a booking is truly confirmed — or merely accepted — decides whether a group lands with rooms.',
          answer: 'Two-phase booking separates an accepted request from a supplier-confirmed order, and every order keeps the supplier reference on file.'
        },
        {
          title: 'Rates you cannot see across channels',
          body: 'Contracted rates, wholesaler rates and season pricing live in different places. Nobody can say quickly which source wins for a specific date, and parity gaps surface as customer complaints.',
          answer: 'One search compares what 27+ upstream suppliers quote for the same dates. Lookout price intelligence watches your key hotels on a schedule and reports the gaps.'
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
          body: 'Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper and 20+ more connectors sit behind one interface, with hotel and room mapping checked before release.',
          points: ['Live search across 27+ suppliers.', 'Quotes that keep their supplier evidence.', 'One API when you want this inside your stack.']
        },
        {
          title: 'Buy upstream, sell downstream',
          body: 'A destination company is both a buyer and a seller. The same platform structures your trade customers, their price rules and their access — under your brand if you choose.',
          points: ['White-label the workbench for your trade customers.', 'Customer, account and credit boundaries with explicit ownership.', 'Price rules set per customer, not per spreadsheet.']
        },
        {
          title: 'Operations that survive incidents',
          body: 'Search, booking and after-sales events share identifiers, so when something breaks, the trail reaches the supplier boundary instead of stopping at a support inbox.',
          points: ['Two-phase confirmed bookings with supplier references.', 'TraceSight diagnostics across the full linkage.', 'Lookout price intelligence on your key hotels.']
        }
      ],
      cooperationTitle: 'How the partnership gets done',
      cooperation: [
        { title: 'See the demo', body: 'Walk search, quoting, booking and after-sales in the public workbench demo, and confirm this is the operating surface you want.' },
        { title: 'Sandbox validation', body: 'Bring your destinations and your hotel list: coverage, price level and confirmation speed, tested on the hotels you actually sell.' },
        { title: 'Commercial and compliance alignment', body: 'Agree on the engagement model, settlement currencies and terms, invoicing and entity requirements — the items under "Requirements to line up", one by one.' },
        { title: 'Go live', body: 'Workbench accounts are usable on day one; the API path follows an integration plan.' }
      ],
      productsTitle: 'Which products you are likely to need',
      productsNote: 'One core; the rest are add-ons by your size and route.',
      products: [
        { name: 'Distribution workbench', when: 'Every DMC · core', note: 'The main surface for buying and selling: search, compare, quote, orders, after-sales, books.' },
        { name: 'White-label & customer system', when: 'When you serve trade customers', note: 'Put trade customers inside your own branded workbench, with layered price rules, credit and data.' },
        { name: 'API', when: 'With an engineering team', note: 'The same supply and booking capabilities, integrated into your existing systems through one API.' },
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
        { question: 'We already hold direct hotel contracts. Does this replace them?', answer: 'No. Your contracts keep running as they do today. HotelByte aggregates 27+ upstream suppliers for coverage and overflow, and gives both sides one operating surface.' },
        { question: 'Do we need an engineering team?', answer: 'No. The workbench is the product — teams run search, quotes, bookings and after-sales in it. Engineering only matters if you choose the API path.' },
        { question: 'How do we verify supplier coverage in our destinations?', answer: 'Run a sandbox evaluation with your own hotel list. The integration directory also shows which adapters exist and what must be checked before claiming live coverage.' }
      ],
      primaryLabel: 'Discuss your destination workflow',
      secondaryLabel: 'Open the workbench demo',
      mailtoSubject: 'HotelByte%20DMC%20evaluation'
    },
    zh: {
      eyebrow: '面向地接社',
      title: '一个工作台，管住目的地业务的每一单酒店',
      description: '面向地接社与地面服务商：27+ 上游聚合进一个 B2B 工作台（可选 API、白标、MCP），并写清合作路径、产品怎么按需选配、结算与合规要满足什么。',
      lead: '地接业务靠本地履约吃饭：团队一批批抵达、响应窗口紧、酒店采购又是成本大头。HotelByte 把 27+ 酒店供应上游放进同一个工作台和同一套 API——产品团队用实时房价做报价，不用再挨个门户追价，确认赶得在截止时间之前。',
      offering: {
        title: '你在买什么',
        body: '一个 B2B 酒店分销工作台，外加可选的 API。登录即可搜索、比价、报价、下单、做售后——供应面是 27+ 上游供应商的聚合库存（Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等），覆盖这些上游在你目的地的酒店。价格实时，条款随报价走，账目按币种记。',
        points: [
          '搜索与实时比价：一次搜索看 27+ 上游对同一酒店、同一日期的报价，税费与取消政策都在报价里。',
          '报价：把搜索结果整理成能直接发组团社的报价单，条款随单走，不用来回解释。',
          '预订与售后：两段式确认，供应商单号留档；改期、取消、退款有凭证可查。',
          '账目：钱包按买方、卖方、币种三元组记账，多上游多币种一本账。',
          '可选件：API、MCP（AI 助手接入）、白标、Lookout 价格情报——见下文「什么产品可能是你需要的」。'
        ]
      },
      profilesTitle: '你是哪一种',
      profiles: [
        {
          title: '小型地接社：重点是「买」',
          body: '团队小、没有研发，要的是把酒店买对、买快、买得有依据。一个工作台账号就是全部上手成本。',
          points: [
            '销售在工作台里搜价、比价、出报价单，不需要 IT 参与。',
            '确认状态清楚，售后有供应商单号可对。',
            '浏览器登录即用，不接系统、不装软件。'
          ]
        },
        {
          title: '大型地接社：既「买」也「卖」',
          body: '除了自用采购，你还有同业客户要服务。把他们的账号、价格规则和信用额度结构化到同一套平台——需要的话，挂你自己的品牌。',
          points: [
            '白标工作台开放给同业客户使用。',
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
          answer: '一次搜索覆盖 27+ 上游的实时房价与房态。报价自带税费、取消政策和确认类型，整理好即可发出。'
        },
        {
          title: '旺季溢出，确认没把握',
          body: '协议酒店满了，只能临时找一年打不了几次交道的批发商拿房。订单是真确认还是只是受理，决定了团队落地那天有没有房。',
          answer: '两段式预订把「已受理」和「供应商已确认」分开，订单始终保留供应商单号，随时能对。'
        },
        {
          title: '渠道价看不全',
          body: '协议价、批发价、季节价散落各处，没人能立刻说出某天某酒店用哪个来源最合算；价格倒挂暴露出来，往往已经是客诉。',
          answer: '同一天同一酒店，一次搜索横向对比 27+ 上游报价；Lookout 价格情报按周期盯住重点酒店，差距按时报出来。'
        },
        {
          title: '多上游多币种，对账靠人肉',
          body: '预付与月结混着走，币种一多，每月对账第一遍从来对不平，财务在替每个上游的差异手工买单。',
          answer: '钱包按买方、卖方、币种三元组记账，上游应付与下游应收落在同一本账上。'
        }
      ],
      capabilitiesTitle: '能力',
      capabilities: [
        {
          title: '供应层一次接齐',
          body: 'Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等 27+ 连接器在同一个接口后面，酒店与房型映射经核对后才上架。',
          points: ['一次搜索横跨 27+ 上游。', '报价保留供应商证据。', '需要进系统时，同一套能力就是一套 API。']
        },
        {
          title: '上游买货，下游卖货',
          body: '地接社既是买方也是卖方。同一套平台能结构化你的同业客户、他们的价格规则与访问边界——需要的话，挂你自己的品牌。',
          points: ['工作台可白标给你的同业客户。', '客户、账号与信用边界归属明确。', '价格规则按客户配置，不靠表格。']
        },
        {
          title: '出事扛得住的运营',
          body: '搜索、预订、售后事件共用标识，链路断在哪里，证据追到供应商边界，而不是停在客服邮箱里。',
          points: ['两段式确认预订，保留供应商单号。', 'TraceSight 全链路诊断。', 'Lookout 盯住重点酒店价格。']
        }
      ],
      cooperationTitle: '怎么促成合作',
      cooperation: [
        { title: '看演示', body: '公开工作台 demo 里走一遍搜索、报价、预订与售后，确认这就是你要的作业面。' },
        { title: '沙箱验证', body: '带上你的目的地与酒店清单跑一轮：覆盖、价格水平、确认速度，用你真实在卖的货来验。' },
        { title: '商务与合规对齐', body: '确认合作模式、结算币种与账期、开票与主体要求——即下方「合作要满足的要求」逐项过。' },
        { title: '开通上线', body: '工作台开账号即用；走 API 路线的按对接计划排期。' }
      ],
      productsTitle: '什么产品可能是你需要的',
      productsNote: '核心只有一个；其余按你的规模与路线加配。',
      products: [
        { name: '分销工作台', when: '所有地接社 · 必备', note: '买货卖货的主界面：搜索、比价、报价、订单、售后、账目。' },
        { name: '白标与客户体系', when: '有同业客户要服务时', note: '把同业客户装进你自己品牌的工作台，价格规则、信用与数据分层。' },
        { name: 'API', when: '有技术团队、要进自己系统时', note: '同一套供应与预订能力，以一套 API 接进你现有的作业系统。' },
        { name: 'MCP / AI 分销接口', when: '想让 AI 助手干活时', note: 'AI agent 可搜索、报价、预填订单，交给人工复核；不是黑盒。' },
        { name: 'Lookout 价格情报', when: '要盯价格时', note: '按周期盯重点酒店在跨渠道的价格差距，防倒挂、防客诉。' }
      ],
      requirementsTitle: '合作要满足的要求',
      requirementsNote: '以下事项在商务阶段逐项确认，以合同为准。',
      requirements: [
        { title: '签约主体与账户', body: '以公司主体签约。平台按客户、账号层级开户，权限与数据按边界隔离——谁看得见什么，从第一天就定清楚。' },
        { title: '结算与钱包', body: '结算按买方、卖方、币种三元组进行，支持多币种。具体可用币种、账期与额度在商务阶段确认。' },
        { title: '发票与税务', body: '开票与税务处理按签约主体所在地的商业安排执行，以合同约定为准。' },
        { title: '供应可用性', body: '上游供应商的启用依赖其商业授权与市场范围；沙箱阶段会用你的酒店清单逐项核对，能用的、暂不能用的，先说清。' }
      ],
      questions: [
        { question: '我们有直签协议酒店，会冲突吗？', answer: '不冲突。直签协议照常走原渠道；HotelByte 聚合 27+ 上游补覆盖、接溢出，两边共用一个作业面。' },
        { question: '需要研发团队吗？', answer: '不需要。工作台本身就是产品：搜索、报价、预订、售后都在里面完成。只有选 API 路线时才涉及工程。' },
        { question: '怎么验证目的地的供应商覆盖？', answer: '用自己的酒店清单跑一轮沙箱评估；集成目录也标了哪些适配器存在、宣称真实可用前要核对什么。' }
      ],
      primaryLabel: '聊聊你的地接业务',
      secondaryLabel: '打开工作台演示',
      mailtoSubject: 'HotelByte%20DMC%20evaluation'
    }
  },
  travelAgency: {
    path: '/solutions/travel-agency',
    navEn: 'Travel agencies',
    navZh: '旅行社',
    cardEn: 'Compare net rates in one search, quote with terms attached, book with clear confirmation states, and keep the after-sales evidence.',
    cardZh: '一次搜索比净价，报价带条款，预订有确认状态，售后留证据。',
    en: {
      eyebrow: 'For travel agencies',
      title: 'Hotel supply you can search, book and stand behind',
      description: 'One account across 27+ hotel suppliers for travel agencies: compare net rates in a single search, quote with taxes and cancellation policy attached, book with clear confirmation states, and keep after-sales evidence — with the partnership path, product add-ons, and settlement and compliance requirements spelled out.',
      lead: 'An agency wins on speed and trust: quote fast, book exactly what you quoted, and answer for it when plans change. HotelByte puts 27+ suppliers behind one B2B workbench, so sellers compare and book in one place instead of juggling portals — and every quote carries the terms that back it.',
      offering: {
        title: 'What you are buying',
        body: 'A B2B hotel distribution workbench, plus an optional API. Give your sellers one login and they can search upstream supply, send quotes, place bookings and run after-sales — over aggregated inventory from 27+ upstream suppliers (Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper, ...). Live rates, terms attached to every quote.',
        points: [
          'One search compares net rates across 27+ upstreams, taxes and cancellation policy included in the result.',
          'Quotes go out ready for the customer, with total payable amounts and terms riding along.',
          'Two-phase booking: "accepted" and "supplier-confirmed" are different states, and after-sales references stay on file.',
          'The wallet keeps books across currencies, so reconciliation stops being manual.',
          'Optional add-ons: API, MCP, white-label, Lookout price intelligence — see below.'
        ]
      },
      profilesTitle: 'Which one are you',
      profiles: [
        {
          title: 'Selling yourself: a workbench for your team',
          body: 'One workspace where sellers compare, book and run after-sales — and the manager sees orders and books.',
          points: [
            'Accounts per seller, each responsible for their own orders.',
            'Quoting, booking and after-sales close inside one interface.',
            'No engineering needed; browser login and go.'
          ]
        },
        {
          title: 'Serving a downstream network: white-label resale',
          body: 'Run the workbench under your own brand for sub-agents or corporate customers, with price rules, credit and data layered per customer.',
          points: [
            'The white-labelled workbench is your product, not ours.',
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
          answer: 'Compare 27+ upstream suppliers in one search and pick the source that fits the sale — not the only one you have.'
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
          body: 'Dida, Hotelbeds, Tourmind, Yalago, TBO, Juniper and 20+ more connectors — one login, one search, one booking workflow over all of them.',
          points: ['Live rates and availability across suppliers.', 'Hotel and room identity normalized before release.', 'Failures and latency visible, not hidden.']
        },
        {
          title: 'Your brand, your customers',
          body: 'The workbench can run under your brand for staff and sub-agents, with price rules and access scoped per customer.',
          points: ['White-label the workbench for your network.', 'Per-customer price rules and account boundaries.', 'One wallet across buyers, sellers and currencies.']
        },
        {
          title: 'AI beside your sellers',
          body: 'The same supply layer speaks MCP, so AI assistants can search, quote and pre-draft bookings for your sellers to review — not a black box.',
          points: ['MCP tool surface for AI agents.', 'Quotes that carry their evidence envelope.', 'Human confirmation kept in the loop.']
        }
      ],
      cooperationTitle: 'How the partnership gets done',
      cooperation: [
        { title: 'See the demo', body: 'Walk search, quoting, booking and after-sales in the public workbench demo.' },
        { title: 'Sandbox validation', body: 'Use the hotels and destinations you actually sell; test quoting, booking and one after-sales case.' },
        { title: 'Commercial and compliance alignment', body: 'Agree on the engagement model, settlement currencies and terms, invoicing and entity requirements — the items under "Requirements to line up", one by one.' },
        { title: 'Go live', body: 'Workbench accounts are usable on day one; the API path follows an integration plan.' }
      ],
      productsTitle: 'Which products you are likely to need',
      productsNote: 'One core; the rest are add-ons by your network and route.',
      products: [
        { name: 'Distribution workbench', when: 'Every agency · core', note: 'The main surface for selling: search, compare, quote, orders, after-sales, books.' },
        { name: 'White-label & customer system', when: 'With sub-agents or corporate clients', note: 'Your own branded workbench for the network, with layered price rules, credit and data.' },
        { name: 'API', when: 'With an engineering team', note: 'The same supply and booking capabilities inside your own systems through one API.' },
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
        { question: 'We are a small agency. Is this for us?', answer: 'The workbench is account-based and needs no engineering. Start by validating the hotels you actually sell in a sandbox.' },
        { question: 'How is this different from opening wholesaler accounts directly?', answer: 'You still trade with suppliers under their commercial terms; what changes is that 27+ of them sit behind one interface, with terms, taxes and failure modes staying visible.' },
        { question: 'Can we test before committing?', answer: 'Yes — the public demo first, then a scoped sandbox evaluation with your own scenarios.' }
      ],
      primaryLabel: 'Discuss your agency workflow',
      secondaryLabel: 'Open the workbench demo',
      mailtoSubject: 'HotelByte%20travel%20agency%20evaluation'
    },
    zh: {
      eyebrow: '面向旅行社',
      title: '搜得到、订得下、售后说得清的酒店供应',
      description: '旅行社的一个账号搜全网：27+ 上游集中比价，报价自带税费与取消政策，两段式确认预订，售后证据可查；合作路径、产品按需选配与合规结算要求都写在这页。',
      lead: '旅行社赢在快和稳：报价要快，订的就是报的，计划有变时答得上来。HotelByte 把 27+ 酒店上游放进同一个 B2B 工作台，销售在一个界面里比价、下单，不用在多个门户之间来回切换——每一张报价都带着支撑它的条款。',
      offering: {
        title: '你在买什么',
        body: '一个 B2B 酒店分销工作台，外加可选的 API。给销售团队一个登录，就能搜全网上游、出报价、下预订、做售后——供应面是 27+ 上游供应商的聚合库存（Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等）。价格实时，条款随报价走。',
        points: [
          '一次搜索比 27+ 上游净价，税费与取消政策都在结果里。',
          '报价整理好直接发客户，应付总价与条款随单走。',
          '两段式确认预订：「已受理」和「供应商已确认」分开显示，售后单号留档。',
          '钱包多币种记账，对账不再靠人肉。',
          '可选件：API、MCP、白标、Lookout 价格情报——见下文「什么产品可能是你需要的」。'
        ]
      },
      profilesTitle: '你是哪一种',
      profiles: [
        {
          title: '自用为主：给销售团队用',
          body: '一个工作区，销售在里面比价、下单、做售后；管理者看得到订单与账目。',
          points: [
            '按账号开通，销售各管各的单。',
            '报价、订单、售后在同一界面闭环。',
            '不需要研发，浏览器登录即用。'
          ]
        },
        {
          title: '有下游要服务：白标转售',
          body: '挂你自己的品牌，把工作台开放给下级代理或企业客户；价格规则、额度与数据分层。',
          points: [
            '白标工作台是你的产品，不是我们的。',
            '按客户配置价格与规则。',
            '多级账目在钱包体系里分层对清。'
          ]
        }
      ],
      painsTitle: '痛点与解法',
      answerLabel: 'HotelByte 的回应',
      pains: [
        {
          title: '上游一两家，利润看不透',
          body: '只从一家批发商拿货，毛利就是对方留给你的那部分。客人在公开渠道查到更便宜的价格时，这一单很难解释。',
          answer: '一次搜索横向对比 27+ 上游，按这一单选最合适的货源，而不是只能用手上仅有的那家。'
        },
        {
          title: '手工比价，报价必过期',
          body: '销售在几个供应商门户间切换、把房价抄进文档，发出去的报价是半小时前的快照。客人确认时，价格早就变了。',
          answer: '报价几分钟内从实时搜索重建，应付总价、税费、取消条款随单携带。'
        },
        {
          title: '订单没有确认状态',
          body: '门户里提交的订单先显示「已接收」，房间真正锁定要等供应商确认。这里的含糊，最后会变成客人到店没房。',
          answer: '两段式预订区分「已受理」与「供应商已确认」，售后要用的单号一直都在。'
        },
        {
          title: '售后没有凭证',
          body: '改期、取消、退款，来回扯皮：当时适用哪条政策、供应商回了什么、谁批的退款，谁也说不全。',
          answer: '政策、供应商响应和订单状态留在同一条链上；TraceSight 让从报价到售后的链路可回查。'
        }
      ],
      capabilitiesTitle: '能力',
      capabilities: [
        {
          title: '一张货架铺满市场',
          body: 'Dida、Hotelbeds、Tourmind、Yalago、TBO、Juniper 等 27+ 连接器——一个登录、一次搜索、一套预订流程。',
          points: ['跨上游实时房价与房态。', '酒店与房型身份先归一再上架。', '失败与耗时可见，不被遮挡。']
        },
        {
          title: '你的品牌，你的客户',
          body: '工作台可以挂你的品牌运行，给自己的销售和下级代理使用；价格规则与访问范围按客户划清。',
          points: ['工作台白标给你的网络。', '按客户配置价格规则与账号边界。', '买方、卖方、多币种共用一本钱包账。']
        },
        {
          title: 'AI 站在销售旁边',
          body: '同一层供应能力说 MCP：AI 助手可以搜索、报价、预填订单，交给销售复核——不是黑盒。',
          points: ['面向 AI Agent 的 MCP 工具面。', '报价自带证据信封。', '关键动作保留人工确认。']
        }
      ],
      cooperationTitle: '怎么促成合作',
      cooperation: [
        { title: '看演示', body: '公开工作台 demo 里走一遍搜索、报价与预订。' },
        { title: '沙箱验证', body: '拿你实际在卖的酒店和目的地，测报价、预订和一次售后场景。' },
        { title: '商务与合规对齐', body: '确认合作模式、结算币种与账期、开票与主体要求——即下方「合作要满足的要求」逐项过。' },
        { title: '开通上线', body: '工作台开账号即用；走 API 路线的按对接计划排期。' }
      ],
      productsTitle: '什么产品可能是你需要的',
      productsNote: '核心只有一个；其余按你的网络与路线加配。',
      products: [
        { name: '分销工作台', when: '所有旅行社 · 必备', note: '卖货的主界面：搜索、比价、报价、订单、售后、账目。' },
        { name: '白标与客户体系', when: '有下级代理或企业客户时', note: '挂你自己品牌的工作台开放给网络，价格规则、信用与数据分层。' },
        { name: 'API', when: '有技术团队时', note: '同一套供应与预订能力，接进你自己的系统。' },
        { name: 'MCP / AI 分销接口', when: '想让 AI 帮销售干活时', note: 'AI agent 搜索、报价、预填订单，人工复核；不是黑盒。' },
        { name: 'Lookout 价格情报', when: '要盯重点酒店价格时', note: '按周期盯重点酒店跨渠道价差，差距先于客人发现。' }
      ],
      requirementsTitle: '合作要满足的要求',
      requirementsNote: '以下事项在商务阶段逐项确认，以合同为准。',
      requirements: [
        { title: '签约主体与账户', body: '以公司主体签约。平台按客户、账号层级开户，权限与数据按边界隔离——谁看得见什么，从第一天就定清楚。' },
        { title: '结算与钱包', body: '结算按买方、卖方、币种三元组进行，支持多币种。具体可用币种、账期与额度在商务阶段确认。' },
        { title: '发票与税务', body: '开票与税务处理按签约主体所在地的商业安排执行，以合同约定为准。' },
        { title: '供应可用性', body: '上游供应商的启用依赖其商业授权与市场范围；沙箱阶段会用你的酒店清单逐项核对，能用的、暂不能用的，先说清。' }
      ],
      questions: [
        { question: '我们是小社，适合用吗？', answer: '工作台按账号使用，不需要研发。先用你实际在卖的酒店清单在沙箱里验证一轮。' },
        { question: '和直接找批发商开户有什么区别？', answer: '商业条款仍按各上游走；区别是 27+ 上游在同一个接口后面，条款、税费与故障信息不被遮挡。' },
        { question: '可以先试再决定吗？', answer: '可以。先看公开 demo，再用你自己的场景做一轮限范围沙箱评估。' }
      ],
      primaryLabel: '聊聊你的旅行社业务',
      secondaryLabel: '打开工作台演示',
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
          <Link className="underline hover:text-brass" to={to('/products/b2b-distribution')}>{isZh ? '分销底座' : 'Distribution foundation'}</Link>
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
            扫码，或在小红书 App 内搜索小红书号 <span className="font-semibold text-ink tracking-wide">9568468696</span> 添加。看酒店分销的日常，也随时聊合作。
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
              ? '酒店分销链路上有不同角色：运营目的地、卖旅行产品、运营分销平台。按你的角色进入——每个客群一页，按各自的工作流来写。'
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
