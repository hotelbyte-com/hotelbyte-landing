export type StoryLocale = 'zh' | 'en';

export interface DailyStoryContent {
  title: string;
  mood: string;
  theme: string;
  summary: string;
  body: string[];
  ctaLabel?: string;
}

export interface DailyStoryVisual {
  src: string;
  alt: Record<StoryLocale, string>;
  caption: Record<StoryLocale, string>;
}

export interface DailyStoryCta {
  href: string;
}

export interface DailyStory {
  date: string;
  slug: string;
  content: Record<StoryLocale, DailyStoryContent>;
  visual: DailyStoryVisual;
  nextThemeSeeds: Record<StoryLocale, string[]>;
  cta?: DailyStoryCta;
  generatedBy: string;
  generatedAt: string;
}

export const dailyStoryTimeZone = 'Asia/Dubai';
export const dailyStoryRedirectStorageKey = 'hotelbyte-daily-story-redirect-date';

interface StoryContentInput {
  title: string;
  mood: string;
  theme: string;
  summary: string;
  body: string[];
  ctaLabel: string;
}

function backfillStory(
  date: string,
  slug: string,
  zh: StoryContentInput,
  en: StoryContentInput,
  nextThemeSeeds: Record<StoryLocale, string[]>
): DailyStory {
  return {
    date,
    slug,
    content: { zh, en },
    visual: {
      src: `/daily/${date}.svg`,
      alt: {
        zh: `为 ${date} 的每日故事绘制的抽象小插图，围绕“${zh.theme}”展开。`,
        en: `A small abstract illustration for the ${date} daily story, shaped around “${en.theme}.”`
      },
      caption: {
        zh: `今日图像提示：${zh.theme}`,
        en: `Visual note: ${en.theme}`
      }
    },
    nextThemeSeeds,
    cta: { href: '/' },
    generatedBy: 'codex-backfill',
    generatedAt: `${date}T00:00:00+04:00`
  };
}

export const dailyStories: DailyStory[] = [
  backfillStory(
    '2026-06-01',
    'the-first-layer-under-the-homepage',
    {
      title: '主页下面的第一层',
      mood: '像掀开一块地板，看见系统还在安静运转。',
      theme: '把首页当成产品系统的剖面，而不是广告牌',
      summary: '如果 HotelByte 的首页每天都要讲故事，第一天应该先讲清楚：漂亮页面下面真正托住业务的，是一层又一层可验证的系统。',
      body: [
        '一个官网最容易误导人的地方，是它看起来只有一层。标题、按钮、截图、几句价值主张，就像把复杂产品压成一张海报。可 HotelByte 真正想表达的不是一张海报，而是一套酒店分销系统怎样稳定地托住价格、库存、订单和诊断。',
        '所以 6 月 1 日这篇 story 从“下面的一层”开始。我们不急着说自己多智能，而是先承认：AI-native 如果没有数据结构、权限边界、供应商接入、日志证据和财务语义做底，最后只会变成漂亮但悬空的界面。',
        '主页的每日倒流也是同一个逻辑。它不是让品牌更花哨，而是每天露出一小段系统剖面：今天讲底座，明天讲流动，后天讲一次看似微小但足以改变决策的异常。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'The First Layer Under the Homepage',
      mood: 'Like lifting a floor panel and seeing the system quietly running underneath.',
      theme: 'Treating the homepage as a product cross-section, not a billboard',
      summary: 'If HotelByte is going to tell a daily story, day one should state the premise: what supports the business is not a page, but layers of verifiable systems.',
      body: [
        'The easiest trap for a website is that it looks like it has only one layer. A headline, a button, a screenshot, a few value propositions: complexity compressed into a poster. HotelByte needs to say something different. The product is a system that holds pricing, inventory, orders, and diagnostics together.',
        'So the first story starts underneath the surface. Before calling anything AI-native, the foundation has to exist: data structures, permission boundaries, supplier integrations, log evidence, and financial semantics that do not drift when the interface becomes attractive.',
        'The daily detour follows the same principle. It is not decoration for the brand. It is a small product cross-section each day: the foundation today, the flow tomorrow, and eventually the tiny anomaly that changes an operational decision.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么一个字段的命名会影响整个分销链路',
        '当价格不是数字，而是一种责任边界',
        '供应商接口文档里最值得警惕的沉默',
        '从库存同步看系统的耐心边界',
        '为什么 AI-native 先要尊重确定性'
      ],
      en: [
        'Why the name of one field can shape an entire distribution flow',
        'When price is not a number but a responsibility boundary',
        'The most dangerous silence in supplier API documentation',
        'What inventory sync teaches about system patience',
        'Why AI-native systems must respect determinism first'
      ]
    }
  ),
  backfillStory(
    '2026-06-02',
    'when-a-field-name-changes-the-chain',
    {
      title: '一个字段名改变一条链路',
      mood: '今天的故事很小，小到只是一行命名，但它会一路传到结算。',
      theme: '命名不是语法问题，而是业务责任的边界',
      summary: '在酒店分销里，`rate`、`totalRate`、`sellerAmount`、`buyerAmount` 看起来都像价格；真正重要的是它们不能互相假装。',
      body: [
        '工程里最不显眼的风险，常常不是复杂算法，而是一个“差不多”的字段名。单间价格、整单金额、供应商成本、客户应付，如果在接口里都被模糊地叫做 price，系统迟早会把一个人的责任算到另一个人头上。',
        'HotelByte 做分销底座时，最需要抵抗的就是这种便利。便利会让页面更快出来，也会让排查更痛苦。等到订单金额和利润报表对不上时，所有人都会回头问：当时为什么没有把语义切清楚？',
        '今天这篇 story 想说的是，命名不是洁癖。命名是系统对业务说“我知道自己在算什么”的方式。AI 可以解释很多东西，但不能替一个含混字段承担责任。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'When One Field Name Changes a Flow',
      mood: 'Today’s story is small: just a name in a line of code, until it reaches settlement.',
      theme: 'Naming is not syntax; it is the boundary of business responsibility',
      summary: 'In hotel distribution, rate, totalRate, sellerAmount, and buyerAmount may all look like prices. The important part is that they must not pretend to be each other.',
      body: [
        'The quietest risk in software is often not a complex algorithm. It is a field name that feels “close enough.” Room rate, order total, supplier cost, and buyer amount cannot all be vaguely called price without consequences.',
        'Building HotelByte means resisting that convenience. Convenience can ship a page faster, but it makes investigation slower. When order amounts and profit reports stop matching, everyone eventually asks why the meaning was not separated at the start.',
        'This story is not about naming purity. It is about a system being able to say, with confidence, what it is calculating. AI can explain many things, but it cannot take responsibility for a field whose meaning was left blurry.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么日志应该像证词，而不是噪音',
        '订单失败时，谁有资格说“不是我的问题”',
        '把利润算对之前，先把货币来源说清楚',
        '当供应商返回成功但业务仍然失败',
        '为什么客服视角也是系统设计的一部分'
      ],
      en: [
        'Why logs should behave like testimony, not noise',
        'Who gets to say “not my problem” when an order fails',
        'Before calculating profit, clarify where currency comes from',
        'When the supplier returns success but the business still fails',
        'Why the support perspective is part of system design'
      ]
    }
  ),
  backfillStory(
    '2026-06-03',
    'logs-should-sound-like-testimony',
    {
      title: '日志应该像证词',
      mood: '不是更长的日志，而是更能站得住的日志。',
      theme: '排障系统需要可复述的证据链',
      summary: '一条好日志不只是记录发生了什么，它应该帮助不同角色复述同一个事实。',
      body: [
        '很多系统以为自己有日志，因为磁盘里确实写了很多行。可真正排障时，团队需要的不是“更多行”，而是能回答谁、何时、基于什么输入、得到什么输出、在哪里改变了状态。',
        '酒店分销链路天然跨角色：平台、租户、客户、供应商都可能参与同一次问题定位。如果日志只对写代码的人有意义，它就不是证据，只是开发者的私人笔记。',
        'HotelByte 想做的 TraceSight，本质上是让日志变成可复述的证词。不是替人做判断，而是让每个人站在同一条证据链上讨论判断。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Logs Should Sound Like Testimony',
      mood: 'Not longer logs, but logs that can stand up in a conversation.',
      theme: 'Debugging systems need evidence that can be retold',
      summary: 'A good log does more than record what happened. It lets different roles retell the same fact.',
      body: [
        'Many systems believe they have logs because the disk contains many lines. In a real investigation, teams do not need more lines. They need to know who acted, when, from which input, with what output, and where state changed.',
        'Hotel distribution is naturally multi-party. Platform, tenant, customer, and supplier can all be part of the same incident. If logs only make sense to the engineer who wrote the code, they are not evidence. They are private notes.',
        'TraceSight, at its core, is an attempt to turn logs into testimony. It does not replace human judgment. It gives everyone the same evidence chain so the judgment can be shared.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么一次成功响应也可能是失败订单的开始',
        '把会话追踪做成地图，而不是流水账',
        '故障中的时间线，比结论更重要',
        '当客户看到错误时，系统已经迟到了多久',
        '为什么诊断产品要先学会克制'
      ],
      en: [
        'Why a successful response can be the beginning of a failed order',
        'Turning session tracing into a map instead of a ledger',
        'In an incident, the timeline matters more than the conclusion',
        'How late is the system by the time the customer sees the error?',
        'Why diagnostic products must learn restraint first'
      ]
    }
  ),
  backfillStory(
    '2026-06-04',
    'a-success-response-can-still-fail',
    {
      title: '成功响应之后的失败',
      mood: '最难解释的问题，往往不是红色错误，而是绿色成功。',
      theme: '技术成功和业务成功之间隔着一层语义',
      summary: '供应商返回 success，不代表用户得到了可入住、可支付、可解释的订单结果。',
      body: [
        '接口返回 success 的那一刻，工程师很容易松一口气。但在酒店分销里，真正的问题常常从这里才开始：价格是否仍然有效，房型是否映射正确，取消政策是否可展示，支付金额是否和币种来自同一个来源。',
        '这就是为什么 HotelByte 不能只把供应商响应当作终点。响应只是技术链路的一个节点，业务链路还要继续验证可售、可订、可结算、可解释。',
        '今天的故事提醒自己：绿色状态不是结论，只是证据之一。真正的系统要能说清楚，哪一层成功了，哪一层还没有资格宣布成功。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Failure After a Success Response',
      mood: 'The hardest problems are often not red errors, but green success states.',
      theme: 'Business success lives one semantic layer above technical success',
      summary: 'A supplier returning success does not mean the user has a bookable, payable, explainable order result.',
      body: [
        'When an API returns success, engineers naturally relax. In hotel distribution, that is often where the real question starts: is the price still valid, is the room mapping correct, can the cancellation policy be shown, and did amount and currency come from the same source?',
        'That is why HotelByte cannot treat supplier response as the finish line. It is one node in the technical flow. The business flow still has to verify whether the result is sellable, bookable, settleable, and explainable.',
        'The reminder today is simple: green is not a conclusion. It is one piece of evidence. A serious system can say which layer succeeded and which layer is not yet allowed to declare victory.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么取消政策不应该只是文本块',
        '税费字段如何决定客户是否信任价格',
        '一次报价保存背后的记忆模型',
        '当页面很快，数据却还没准备好',
        '为什么可解释性应该出现在预订前'
      ],
      en: [
        'Why cancellation policy should not be treated as a text blob',
        'How tax and fee fields decide whether customers trust a price',
        'The memory model behind saving a quote',
        'When the page is fast but the data is not ready',
        'Why explainability belongs before booking'
      ]
    }
  ),
  backfillStory(
    '2026-06-05',
    'cancellation-policy-is-not-a-text-blob',
    {
      title: '取消政策不是一段文本',
      mood: '它看起来像说明，其实是用户风险的边界。',
      theme: '把政策从文案提升为可计算的产品对象',
      summary: '取消政策如果只是供应商返回的一段话，系统就很难知道何时提醒、何时拦截、何时让用户放心。',
      body: [
        '很多酒店系统把取消政策当成一段展示文本：原样保存，原样渲染，出了问题再让人读。这样做最快，但也最容易把风险推给用户。',
        '真正的取消政策应该能被系统理解。它至少包含时间窗口、罚金规则、币种、时区、是否可退、是否部分可退，以及哪些条件来自供应商原文而不是平台推断。',
        'HotelByte 的方向不是把复杂性藏起来，而是让复杂性可以被计算、被解释、被复核。政策越像对象，用户越不需要在关键时刻猜。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Cancellation Policy Is Not a Text Blob',
      mood: 'It looks like copy, but it is really the boundary of user risk.',
      theme: 'Promoting policy from display text into a computable product object',
      summary: 'If cancellation policy is only a supplier text block, the system cannot reliably know when to warn, block, or reassure a user.',
      body: [
        'Many hotel systems treat cancellation policy as display text: store it as returned, render it as returned, and let people read it when something goes wrong. It is fast, but it pushes risk onto the user.',
        'A serious cancellation policy should be understandable by the system. It needs windows, penalties, currency, timezone, refundability, partial refund rules, and clarity about which facts came from supplier text versus platform inference.',
        'HotelByte’s direction is not to hide complexity. It is to make complexity computable, explainable, and reviewable. The more policy behaves like an object, the less users have to guess at the moment that matters.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么税费不是价格旁边的小字',
        '时区如何悄悄改变取消规则',
        '保存报价时到底保存了什么',
        '把用户风险翻译成系统动作',
        '为什么政策解释需要版本感'
      ],
      en: [
        'Why taxes and fees are not small print next to price',
        'How timezone quietly changes cancellation rules',
        'What exactly is saved when a quote is saved',
        'Translating user risk into system actions',
        'Why policy explanation needs version awareness'
      ]
    }
  ),
  backfillStory(
    '2026-06-06',
    'taxes-are-not-small-print',
    {
      title: '入住前的小仪式',
      mood: '一张房卡、一杯水、一个终于放下行李的动作。',
      theme: '旅行产品最终服务的是抵达的人，而不是一条订单记录',
      summary: '酒店分销讲价格、库存和规则，但客人真正记住的，常常是抵达那一刻有没有被温柔接住。',
      body: [
        '做酒店技术的人很容易把一次入住理解成订单状态：confirmed、checked-in、cancelled、no-show。可旅行者不这样记忆。他们记得出租车停下来的声音，前台递来的水，护照被翻开的那几秒，以及房卡落进掌心时那种“终于到了”的感觉。',
        '所以 HotelByte 偶尔也应该从系统里抬头。我们当然要把价格、库存、税费、取消政策做准确，但这些准确性不是为了证明系统很聪明，而是为了让抵达的人不被错误打扰。一个好系统的终点，不是报表里的一行成功，而是某个人可以安心洗个澡、睡一觉、开始第二天。',
        '今天的故事不讲字段，讲一个动作：放下行李。所有复杂链路最终都应该服务这个动作。客户、供应商、酒店、平台，每个人都在工作，但工作背后是有人想把旅途过好。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'The Small Ritual Before Check-in',
      mood: 'A room key, a glass of water, and the moment a suitcase finally stops moving.',
      theme: 'Travel products ultimately serve arriving people, not order records',
      summary: 'Hotel distribution talks about price, inventory, and rules. Guests often remember whether the moment of arrival held them gently.',
      body: [
        'People who build hotel technology can start seeing a stay as a state machine: confirmed, checked in, cancelled, no-show. Travelers do not remember it that way. They remember the taxi stopping, the water offered at the desk, the few seconds while a passport is opened, and the feeling of a key card landing in the hand.',
        'HotelByte should occasionally look up from the system. Yes, price, inventory, taxes, and cancellation rules must be accurate. But accuracy is not there to prove the system is clever. It is there so the person arriving is not interrupted by avoidable mistakes.',
        'Today’s story is not about a field. It is about setting down a suitcase. Every complex flow should eventually serve that gesture. Customers, suppliers, hotels, and platforms are all working, but behind the work is someone trying to have a good trip.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '一张早餐券为什么也是酒店体验的一部分',
        '供应商客服下班前最希望系统别出什么错',
        '机场到酒店的路上，客人其实在担心什么',
        '为什么旅行行业需要把疲惫也当成需求',
        '房卡、押金和微笑之间的产品语义'
      ],
      en: [
        'Why a breakfast voucher is part of the hotel experience too',
        'What supplier support hopes will not break before the end of the day',
        'What guests worry about on the road from airport to hotel',
        'Why travel products should treat tiredness as a requirement',
        'The product meaning between key cards, deposits, and smiles'
      ]
    }
  ),
  backfillStory(
    '2026-06-07',
    'blank-profit-is-better-than-guessed-profit',
    {
      title: '空白利润比猜出来的利润更诚实',
      mood: '有些数字不出现，反而是在保护系统。',
      theme: '财务展示必须失败关闭，而不是漂亮兜底',
      summary: '如果金额和币种不是来自同一个可靠来源，利润就应该空着，而不是用另一个字段临时补上。',
      body: [
        '产品界面很讨厌空白。空白看起来像没做完，像数据质量不好，像一个会被追问的地方。但在财务场景里，空白有时比一个看似合理的数字更专业。',
        '利润尤其如此。供应商成本、租户卖价、客户买价、币种来源，每一个都可能来自不同层级。如果系统在缺失时随手借用另一个金额或币种，界面会变完整，账会变危险。',
        'HotelByte 的原则应该是：不完整的财务事实不伪装成完整事实。能算就清楚地算，不能算就明确地空。诚实的空白，胜过漂亮的错误。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Blank Profit Is More Honest Than Guessed Profit',
      mood: 'Some numbers protect the system by refusing to appear.',
      theme: 'Financial display must fail closed, not fallback beautifully',
      summary: 'If amount and currency do not come from reliable matching sources, profit should be blank instead of patched with another field.',
      body: [
        'Product interfaces dislike blank spaces. A blank looks unfinished, low quality, and likely to attract questions. In financial surfaces, however, a blank can be more professional than a plausible-looking number.',
        'Profit is exactly that kind of surface. Supplier cost, tenant seller amount, customer buyer amount, and currency source can each belong to different layers. If the system borrows another amount or currency when one is missing, the interface becomes complete and the ledger becomes dangerous.',
        'HotelByte’s principle should be simple: incomplete financial facts must not pretend to be complete facts. Calculate clearly when possible. Stay blank when not. An honest blank is better than an elegant mistake.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么财务页面最需要克制的设计',
        '货币来源错位如何污染一整张报表',
        '当导出文件比页面更加危险',
        '用例外数据测试利润计算逻辑',
        '为什么财务语义应该写进测试名'
      ],
      en: [
        'Why financial pages need restrained design most',
        'How mismatched currency sources pollute an entire report',
        'When exported files are more dangerous than pages',
        'Testing profit logic with exceptional data',
        'Why financial semantics belong in test names'
      ]
    }
  ),
  backfillStory(
    '2026-06-08',
    'exports-are-promises-too',
    {
      title: '早餐券也是承诺',
      mood: '它很小，常被夹在护照里，却会决定一个早晨的心情。',
      theme: '酒店体验里的小凭证，承载着系统之外的信任',
      summary: '一张早餐券看起来不像技术问题，但它连接着房价、权益、前台解释和客人的清晨。',
      body: [
        '早餐券是旅行里很小的东西。它可能是一张纸，也可能只是订单备注里一个被前台看到的权益。可对客人来说，它不是字段，而是第二天早上能不能少解释一句话，能不能在陌生城市里顺利开始一天。',
        '这就是旅游行业迷人的地方：很多重要体验都藏在小凭证里。确认单、房卡、餐券、接送牌、行李寄存牌，它们不宏大，却要求背后的系统诚实。因为一旦前台说“这里没有显示”，客人面对的不是技术异常，而是一次被打断的期待。',
        'HotelByte 讲系统，也应该记得这些纸片。它们提醒我们，分销不是把库存卖出去就结束了。真正的承诺会一路走到餐厅门口、走到电梯里、走到一个人终于坐下来喝咖啡的早晨。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Breakfast Vouchers Are Promises Too',
      mood: 'Small enough to sit inside a passport, large enough to shape a morning.',
      theme: 'Tiny travel tokens carry trust beyond the system',
      summary: 'A breakfast voucher does not look like a technical problem, but it connects room rate, entitlement, front-desk explanation, and a guest’s morning.',
      body: [
        'A breakfast voucher is a small travel object. It may be a piece of paper, or just an entitlement visible in a reservation note. To the guest, it is not a field. It is one less explanation in the morning and one easier start in an unfamiliar city.',
        'That is what makes travel software interesting: many important experiences hide inside tiny tokens. Confirmations, key cards, meal vouchers, airport pickup signs, luggage tags. None of them is grand, but each asks the system behind it to be honest.',
        'HotelByte can talk about systems and still remember these paper-sized promises. Distribution does not end when inventory is sold. The promise keeps walking to the restaurant door, into the elevator, and toward the first quiet coffee of the day.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '一个供应商夜班团队如何理解“稳定”',
        '为什么酒店接送牌是一种古老但有效的接口',
        '当客人太累时，产品文案应该少说什么',
        '把旅行里的小凭证设计得更可靠',
        '为什么确认单应该像一封靠谱的信'
      ],
      en: [
        'How a supplier night-shift team understands stability',
        'Why airport pickup signs are old but effective interfaces',
        'What product copy should stop saying when guests are tired',
        'Designing small travel tokens to be more reliable',
        'Why a confirmation should feel like a trustworthy letter'
      ]
    }
  ),
  backfillStory(
    '2026-06-09',
    'permissions-are-not-menu-visibility',
    {
      title: '权限不是把菜单藏起来',
      mood: '看不见不等于不能做，能点也不等于应该做。',
      theme: '功能入口和数据边界必须分开设计',
      summary: '菜单可见性只是体验层，真正的权限要在动作、资源归属和服务边界里继续成立。',
      body: [
        '很多后台系统把权限理解成“这个人能不能看到菜单”。这当然重要，因为错误入口会制造困惑。但菜单只是门牌，不是门锁。',
        '在 HotelByte 这样的多实体系统里，同一个功能可能对平台、租户、客户有不同含义。用户能进入页面，不代表能操作所有资源；用户看不到按钮，也不能替代服务端的权限判断。',
        '好的权限设计应该把功能访问和数据范围分开。角色决定能做哪类事，资源归属决定能对谁做。前端隐藏负责体验，后端校验负责事实。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Permissions Are Not Menu Visibility',
      mood: 'Invisible does not mean impossible; clickable does not mean allowed.',
      theme: 'Function access and data boundaries must be designed separately',
      summary: 'Menu visibility is an experience layer. Real authorization has to hold across actions, resource ownership, and service boundaries.',
      body: [
        'Many admin systems understand permissions as “can this person see the menu?” That matters because the wrong entry point creates confusion. But a menu is a sign on a door, not the lock.',
        'In a multi-entity system like HotelByte, the same function can mean different things for platform, tenant, and customer users. Entering a page does not mean operating every resource is allowed. Hiding a button does not replace server-side authorization.',
        'Good permission design separates function access from data scope. Roles decide what kind of action is possible. Resource ownership decides who it can be done to. Frontend hiding serves experience; backend checks serve truth.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么实体树比角色名更接近真相',
        '一个客户账号到底应该属于谁',
        '菜单入口如何影响用户对权限的理解',
        '权限错误最应该暴露在哪里',
        '为什么平台用户也需要边界'
      ],
      en: [
        'Why the entity tree is closer to truth than role names',
        'Who exactly owns a customer account?',
        'How menu entry points shape permission understanding',
        'Where authorization errors should be exposed',
        'Why platform users still need boundaries'
      ]
    }
  ),
  backfillStory(
    '2026-06-10',
    'entity-trees-remember-the-business',
    {
      title: '供应商下班前的五分钟',
      mood: '不是所有稳定性都发生在监控大屏上，也发生在一个人合上电脑前。',
      theme: '供应链里的每个系统问题，最后都会落到某个真实的人身上',
      summary: '供应商不是接口的别名。接口背后有运营、客服、财务和夜班同事，他们同样希望一天顺利结束。',
      body: [
        '我们常说“供应商返回了什么”“供应商超时了”“供应商映射错了”。说久了，供应商听起来像一个抽象系统。但真实世界里，供应商也有快下班的人，有正在交接班的人，有收到客户催促后试图把问题说清楚的人。',
        '旅游行业的链路很长，长到任何一个小问题都会穿过很多角色。一个映射错误可能先变成前台疑问，再变成客服工单，再变成供应商运营群里的一句“帮忙看一下”。技术系统如果只看接口，就会错过这条链路里人的压力。',
        'HotelByte 应该记得这一点：稳定性不是让某一方永远承担更多解释，而是让事实更早、更清楚地出现。这样客户、酒店、供应商都能少一点互相猜测，多一点把工作好好收尾的空间。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'The Five Minutes Before a Supplier Logs Off',
      mood: 'Not all stability happens on monitoring screens. Some of it happens before someone closes a laptop.',
      theme: 'Every supply-chain system problem eventually lands on a real person',
      summary: 'A supplier is not an alias for an API. Behind the interface are operations, support, finance, and night-shift teammates who also want the day to end cleanly.',
      body: [
        'We often say that the supplier returned something, timed out, or mapped something wrong. After a while, the supplier starts sounding like an abstract system. In real life, there are people about to leave for the day, people handing over a shift, and people trying to explain a customer issue clearly.',
        'Travel supply chains are long enough that a small issue can pass through many roles. A mapping mistake may become a front-desk question, then a support ticket, then a message in an operations group asking someone to take a look.',
        'HotelByte should remember this: stability is not making one side explain more forever. It is making facts appear earlier and more clearly, so customers, hotels, and suppliers spend less time guessing and more time ending the workday well.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '前台一句“稍等”背后可能有多少系统',
        '为什么供应商也需要被产品体验保护',
        '旅游行业里的交接班，和软件里的状态交接',
        '当客户、酒店和供应商都想早点下班',
        '如何把稳定性写得更像对人的体谅'
      ],
      en: [
        'How many systems can hide behind a front-desk “one moment”',
        'Why suppliers also deserve product experience protection',
        'Shift handover in travel operations and state handover in software',
        'When customers, hotels, and suppliers all want to finish the day',
        'How to write stability as a form of consideration for people'
      ]
    }
  ),
  backfillStory(
    '2026-06-11',
    'configuration-inheritance-needs-a-reason',
    {
      title: '配置继承需要理由',
      mood: '默认值不是魔法，它应该能说出自己从哪里来。',
      theme: '有效配置必须带着来源一起出现',
      summary: '当客户看到一个价格策略或权限规则时，系统最好能解释它是本级配置、上级继承，还是平台默认。',
      body: [
        '配置继承很方便，也很危险。方便在于业务不用重复填写同样的规则；危险在于用户看到结果时，常常不知道这个结果为什么会出现。',
        'HotelByte 的配置不应该只是最终值。有效配置更像一条带来源的结论：本级覆盖了什么，上级提供了什么，平台默认补了什么，哪些字段是故意留空。',
        '这会让界面更诚实，也会让排障更快。因为当一个策略看起来不对时，团队不必先猜“是谁设置的”，系统应该直接把来源说出来。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Configuration Inheritance Needs a Reason',
      mood: 'Defaults are not magic. They should say where they came from.',
      theme: 'Effective configuration should appear with provenance',
      summary: 'When a customer sees a pricing strategy or permission rule, the system should explain whether it is local, inherited, or platform default.',
      body: [
        'Configuration inheritance is useful and dangerous. It is useful because teams do not have to repeat the same rule. It is dangerous because users often see the result without knowing why it appeared.',
        'HotelByte configuration should not be only a final value. Effective configuration is a conclusion with provenance: what was overridden locally, what came from an ancestor, what came from the platform default, and which fields were intentionally empty.',
        'That makes the interface more honest and debugging faster. When a strategy looks wrong, the team should not first guess who set it. The system should say where it came from.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么主页可以偶尔偏离自己的职责',
        '把每日故事变成产品思考的索引',
        '当品牌表达不再只是营销语言',
        '为什么小入口也需要长期维护',
        '如何让自动生成内容不变成噪音'
      ],
      en: [
        'Why a homepage can occasionally step outside its usual job',
        'Turning daily stories into an index of product thinking',
        'When brand expression stops being marketing language',
        'Why a small entry point still needs long-term maintenance',
        'How to keep generated content from becoming noise'
      ]
    }
  ),
  {
    date: '2026-06-12',
    slug: 'why-the-homepage-wandered-away',
    content: {
      zh: {
        title: '为什么主页今天偷偷拐了个弯',
        mood: '一点顽皮，一点认真，还有一点想把每天都过得不一样。',
        theme: '把企业官网从固定橱窗变成有呼吸的日记',
        summary:
          'HotelByte 的首页今天没有急着介绍产品，而是先讲一个小念头：如果系统每天都在变化，主页为什么不能也有一点生命感？',
        body: [
          '很多官网像机场里的指示牌：干净、准确、永远站在原地。它们告诉访客产品是什么、价格在哪、按钮该点哪里。这些都很重要，但我总觉得还少了一点人的温度。',
          '做 HotelByte 的时候，我们天天和酒店、供应商、订单、价格、日志、异常打交道。每一条链路都很理性，每一个字段都要对齐，每一分钱都不能含糊。可是越是严谨的系统，越需要偶尔露出一点情绪，提醒自己技术不是只为了把世界变快，也是为了让世界变得更有意思。',
          '于是就有了今天这个念头：每天让主页倒流到一个小落地页。它可以讲一个故事，宣传一个理念，记录一次心情，也可以只是给路过的人递一张小纸条。',
          '这不是营销活动，更像是一扇每天会换风景的窗。今天它解释自己为什么出现；明天它也许会讲一个价格异常背后的误会；后天它可能写给凌晨还在排查供应商映射的人。',
          '如果你是第一次来，欢迎先读完这一天。读完以后，HotelByte 还是那个 HotelByte：严谨地处理酒店分销里的复杂性，只是偶尔也愿意把门口的灯调成不一样的颜色。'
        ],
        ctaLabel: '返回 HotelByte 首页'
      },
      en: {
        title: 'Why the Homepage Took a Small Detour Today',
        mood: 'A little playful, a little serious, and a little unwilling to let every day look the same.',
        theme: 'Turning a company homepage from a fixed display case into a living journal',
        summary:
          'Today HotelByte does not rush to introduce products first. It starts with a small thought: if systems change every day, why should the homepage feel frozen?',
        body: [
          'Many company websites feel like signs in an airport: clean, accurate, and permanently standing in the same place. They tell visitors what the product is, where the pricing lives, and which button to press. All of that matters, but it can still miss a little human temperature.',
          'Building HotelByte means spending every day with hotels, suppliers, orders, prices, logs, and exceptions. Every flow has to be precise. Every field needs to line up. Every amount of money has to mean exactly what it says. The more rigorous the system becomes, the more it deserves a small human signal now and then.',
          'That is where today’s idea came from: let the homepage flow backward into a small landing page each day. It can tell a story, promote a belief, record a mood, or simply leave a note for whoever happens to pass by.',
          'This is not a campaign. It is closer to a window whose view changes every morning. Today it explains why it exists. Tomorrow it might describe a pricing anomaly that was really a misunderstanding. The next day it might be written for someone debugging supplier mapping after midnight.',
          'If this is your first visit, read this day first. After that, HotelByte is still HotelByte: serious about the complexity of hotel distribution, just willing to change the color of the light at the door from time to time.'
        ],
        ctaLabel: 'Back to the HotelByte homepage'
      }
    },
    visual: {
      src: '/daily/2026-06-12.svg',
      alt: {
        zh: '上下错位的发光层叠方块，像主页从固定轨道里轻轻漂移出来。',
        en: 'Two offset glowing layered blocks, like a homepage gently drifting out of its usual track.'
      },
      caption: {
        zh: '今天的主页没有消失，只是把自己拆成了两层：一层继续做产品入口，另一层每天讲一点人话。',
        en: 'The homepage did not disappear today. It split into two layers: one keeps serving the product, the other says something human each day.'
      }
    },
    nextThemeSeeds: {
      zh: [
        '机场接送牌为什么是一种古老但有效的界面',
        '凌晨两点的价格波动，为什么比白天更诚实',
        '一个供应商映射错误如何教会系统保持谦逊',
        '当客人太累时，产品文案应该少说什么',
        '为什么 B2B 分销也需要一点生活气'
      ],
      en: [
        'Why airport pickup signs are old but effective interfaces',
        'Why a 2 a.m. price movement can be more honest than daytime dashboards',
        'How a supplier mapping mistake teaches a system to stay humble',
        'What product copy should stop saying when guests are tired',
        'Why B2B distribution also needs a little life in it'
      ]
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-seed',
    generatedAt: '2026-06-12T00:00:00+04:00'
  },
  {
    date: '2026-06-15',
    slug: 'airport-pickup-signs-are-interfaces',
    content: {
      zh: {
        title: '接送牌是最古老的接口',
        mood: '一张纸举在人群里，像机场到酒店之间最朴素的握手。',
        theme: '把机场接送牌看成旅行里低技术但高信任的界面',
        summary:
          '机场接送牌没有登录态、没有推送、没有漂亮动效，却能在一个陌生城市里把疲惫的客人、司机、酒店和订单轻轻接上。',
        body: [
          '机场到达口的接送牌很容易被当成背景：一排名字、几个酒店标识、司机伸长手臂，客人拖着行李在人群里找自己的那一块纸。它看起来不像现代产品，却完成了一个极其产品化的任务：在嘈杂、跨语言、低电量、刚落地的场景里，让两个互不认识的人确认“我们在找彼此”。',
          '这张牌厉害的地方不是信息多，而是信息少得刚好。它通常只放一个名字、一个酒店、一个航班或一个预订线索。太少会认不出来，太多会让路过的人也看见不该看见的隐私。好的接送牌像一个克制的界面：让正确的人快速理解，让无关的人自然错过。',
          'HotelByte 做分销基础设施时，也应该尊重这种朴素智慧。很多链路最后都会变成一次交接：供应商把确认交给平台，平台把权益交给酒店，酒店把房卡交给客人。交接做得好，客人不会夸系统聪明；他们只是少慌张一分钟，少问一句“是这里吗”。',
          '所以今天的故事不是怀旧，而是提醒：旅行行业里有些最可靠的接口并不发光。它们站在人群里，承担识别、安抚和承诺。技术越复杂，越要学会像那张接送牌一样，在关键时刻把正确的信息举得清楚一点。'
        ],
        ctaLabel: '返回 HotelByte 首页'
      },
      en: {
        title: 'Pickup Signs Are the Oldest Interfaces',
        mood: 'A sheet of paper held above a crowd, like the simplest handshake between airport and hotel.',
        theme: 'Seeing airport pickup signs as low-tech, high-trust travel interfaces',
        summary:
          'An airport pickup sign has no session, push notification, or polished animation, yet it can connect a tired guest, driver, hotel, and booking in an unfamiliar city.',
        body: [
          'The pickup sign at arrivals is easy to treat as background: names in a row, a few hotel logos, drivers stretching their arms, guests scanning the crowd with luggage behind them. It does not look like a modern product, but it solves a very product-shaped problem: in a noisy, multilingual, low-battery, just-landed moment, two strangers need to confirm that they are looking for each other.',
          'What makes the sign work is not how much information it carries, but how little it needs. Usually it shows a name, a hotel, a flight, or a reservation clue. Too little and the guest cannot recognize it. Too much and every passerby can read details that should stay quiet. A good pickup sign is a restrained interface: fast for the right person, forgettable for everyone else.',
          'HotelByte should respect that kind of plain wisdom when building distribution infrastructure. Many travel flows eventually become a handoff: a supplier passes confirmation to a platform, a platform passes entitlement to a hotel, and a hotel passes a key card to a guest. When the handoff works, guests do not praise the system. They simply spend one less minute worrying and ask one fewer “is this the right place?”',
          'So today’s story is not nostalgia. It is a reminder that some of travel’s most reliable interfaces do not glow. They stand in a crowd and carry identification, reassurance, and promise. The more complex the technology becomes, the more it should learn from the pickup sign: at the critical moment, hold the right information clearly enough.'
        ],
        ctaLabel: 'Back to the HotelByte homepage'
      }
    },
    visual: {
      src: '/daily/2026-06-15.svg',
      alt: {
        zh: '机场到达口场景中，一位司机举着写有 HotelByte 的接送牌，旁边有行李箱、航班屏和通向酒店的小路线。',
        en: 'An airport arrivals scene with a driver holding a HotelByte pickup sign beside luggage, a flight board, and a small route toward a hotel.'
      },
      caption: {
        zh: '一张接送牌把陌生城市里的几个角色临时连成同一条链路：客人、司机、酒店和那笔已经被确认的预订。',
        en: 'A pickup sign briefly joins several roles in an unfamiliar city: guest, driver, hotel, and the booking that already promised the meeting.'
      }
    },
    nextThemeSeeds: {
      zh: [
        '前台一句“稍等”背后可能有多少系统正在互相等待',
        '为什么延误航班抵达后的第一句欢迎比任何通知都重要',
        '把酒店确认单写得像一封真正可靠的信',
        '供应商交接班记录如何避免第二天早上的重复解释',
        '为什么低技术旅行物件常常比新界面更懂信任'
      ],
      en: [
        'How many systems may be waiting behind a front-desk “one moment”',
        'Why the first welcome after a delayed flight matters more than any notification',
        'Writing hotel confirmations like genuinely trustworthy letters',
        'How supplier handover notes prevent the same explanation the next morning',
        'Why low-tech travel objects often understand trust better than new interfaces'
      ]
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-daily-story-publisher',
    generatedAt: '2026-06-15T17:16:00+04:00'
  },
  {
    date: '2026-06-16',
    slug: 'first-welcome-after-delay',
    content: {
      zh: {
        title: '延误之后的第一句欢迎',
        mood: '凌晨的前台灯还亮着，客人只想听见一句不用再解释的话。',
        theme: '把延误航班后的欢迎看成酒店体验里最短也最重要的恢复动作',
        summary:
          '航班延误会把客人的耐心、交通、入住时间和预订信心一起打乱；酒店真正能补回来的，往往从前台第一句话开始。',
        body: [
          '延误航班抵达后的酒店大堂，有一种很特殊的安静。客人已经在登机口等过，在飞机上等过，在行李转盘旁又等过。等他们终于推门进来时，最不需要的不是一套完整说明，而是一个人先承认：你到了，我们知道你晚了，房间还在。',
          '这句话听起来不像产品功能，却比很多通知更有用。通知告诉客人“状态已更新”，欢迎告诉客人“你不必重新证明自己”。前台能不能少问一个问题、少让客人翻一次邮箱、少把延误造成的不确定再转嫁给旅人，决定了这次入住是被接住，还是继续被推着走。',
          'HotelByte 做分销基础设施时，也要记住这类时刻。订单确认、供应商备注、预计到店时间、延误后的夜审规则，最后都会落在前台一句话里。系统如果能把该出现的信息提前放好，工作人员就可以把力气用在欢迎，而不是追问。',
          '所以今天从昨天的接送牌继续往前走一步：交接不只发生在机场人群里，也发生在凌晨的大堂。好的旅行系统不一定让旅途没有延误，但它至少应该让延误之后的第一分钟少一点尴尬，多一点“终于有人等我”。'
        ],
        ctaLabel: '返回 HotelByte 首页'
      },
      en: {
        title: 'The First Welcome After a Delay',
        mood: 'The lobby light is still on after midnight, and the guest only wants one sentence that does not require another explanation.',
        theme: 'Treating the post-delay welcome as the shortest and most important recovery move in a hotel stay',
        summary:
          'A delayed flight disrupts patience, transport, check-in timing, and confidence in the booking. What a hotel can repair often begins with the first sentence at the desk.',
        body: [
          'A hotel lobby after a delayed flight has a particular quietness. The guest has already waited at the gate, waited on the aircraft, and waited again beside the baggage belt. By the time they push through the doors, what they need most is not a full explanation. They need someone to make three things clear: you arrived, we know you are late, and the room is still here.',
          'That sentence does not sound like a product feature, but it can do more than many notifications. A notification says the status changed. A welcome says the guest does not have to prove themselves again. Whether the front desk can ask one fewer question, avoid one more email search, and stop handing the uncertainty of the delay back to the traveler shapes the whole stay.',
          'HotelByte should remember these moments while building distribution infrastructure. Confirmation records, supplier remarks, estimated arrival time, and late-night audit rules all eventually arrive inside one sentence at the desk. If the system has already placed the right facts where staff can see them, staff can spend their energy welcoming instead of interrogating.',
          'So today continues yesterday’s pickup-sign story by taking one step further. Handoffs do not only happen in an airport crowd. They also happen in a lobby after midnight. A good travel system cannot always prevent delay, but it can make the first minute after delay less awkward and more like somebody was waiting.'
        ],
        ctaLabel: 'Back to the HotelByte homepage'
      }
    },
    visual: {
      src: '/daily/2026-06-16.svg',
      alt: {
        zh: '凌晨酒店前台场景：亮着的台灯、行李箱、航班延误提示和一张仍然保留的房卡。',
        en: 'A late-night hotel front desk scene with a glowing lamp, suitcase, delayed-flight notice, and a room key still waiting.'
      },
      caption: {
        zh: '延误之后，最好的系统不是让客人重复解释，而是让前台已经知道该保留什么、该少问什么。',
        en: 'After a delay, the best system does not make the guest explain again. It helps the desk know what to keep ready and what not to ask.'
      }
    },
    nextThemeSeeds: {
      zh: [
        '把酒店确认单写得像一封真正可靠的信，让客人在没电时也能相信它',
        '前台一句“稍等”背后可能有多少系统正在互相等待',
        '供应商交接班记录如何避免第二天早上的重复解释',
        '为什么疲惫旅人的产品文案应该少承诺、多指路',
        '夜审之后的订单状态，为什么需要对酒店和客人说不同的人话'
      ],
      en: [
        'Writing hotel confirmations like genuinely trustworthy letters guests can still trust on low battery',
        'How many systems may be waiting behind a front-desk “one moment”',
        'How supplier handover notes prevent the same explanation the next morning',
        'Why product copy for tired travelers should promise less and point better',
        'Why post-night-audit order status needs different plain language for hotels and guests'
      ]
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-daily-story-publisher',
    generatedAt: '2026-06-16T00:11:32+04:00'
  },
  {
    date: '2026-06-17',
    slug: 'confirmation-that-survives-low-battery',
    content: {
      zh: {
        title: '没电时仍可信的确认单',
        mood: '手机只剩 7% 电，确认单最好不要再像一篇说明书。',
        theme: '把酒店确认单写成低电量场景里的可靠信件',
        summary:
          '一份好的酒店确认单不只是证明订单存在；它应该在客人疲惫、网络不稳、语言不熟时，仍然清楚回答接下来该去哪里、找谁、凭什么入住。',
        body: [
          '酒店确认单最常被打开的时刻，往往不是坐在办公室里慢慢阅读，而是在机场门口、出租车后座、酒店大堂队伍旁，手机电量变红，网络转圈，客人只想确认自己没有走错地方。这个场景里，确认单不是营销文案，也不是数据库打印件，而是一封要在压力里站得住的信。',
          '一封可靠的确认信会先安排顺序。酒店名称、地址、入住日期、住客姓名、预订号、已支付或到店支付、取消边界和紧急联系方式，应该像路标一样出现在最容易看见的位置。内部供应商代码、渠道缩写、结算备注可以存在，但不能抢走客人真正需要的注意力。',
          '它还要经得起截图、转发和翻译。地址应该能被司机看懂，入住说明不该依赖一段含糊的欢迎语，晚到备注要让前台明白客人不是临时闯入。确认单写得好，客人即使离线，也能拿着那一屏内容继续往前走。',
          'HotelByte 做分销基础设施时，很多看似后台的语义最后都会落到这封信里：供应商确认、酒店备注、支付状态、取消政策、预计到店时间。系统越清楚，确认单越像人写给人的承诺；系统越含糊，客人就越像被迫在路边读接口文档。'
        ],
        ctaLabel: '返回 HotelByte 首页'
      },
      en: {
        title: 'The Confirmation That Still Works on Low Battery',
        mood: 'When the phone is at 7%, a confirmation should not read like a manual.',
        theme: 'Writing hotel confirmations as trustworthy low-battery letters',
        summary:
          'A good hotel confirmation does more than prove a booking exists. When a guest is tired, offline, or navigating another language, it should still answer where to go, who to ask for, and why the stay is secure.',
        body: [
          'The hotel confirmation is rarely opened in ideal reading conditions. It appears outside an airport, in the back of a taxi, or beside a lobby queue while the battery turns red and the network spins. In that moment, the confirmation is not marketing copy or a database printout. It is a letter that has to hold up under pressure.',
          'A reliable confirmation letter knows what to put first. Hotel name, address, check-in date, guest name, booking reference, payment status, cancellation boundary, and emergency contact should behave like signposts. Supplier codes, channel abbreviations, and settlement notes may exist, but they should not steal attention from what the guest actually needs.',
          'It also needs to survive screenshots, forwarding, and translation. The address should make sense to a driver. Arrival instructions should not hide behind a vague welcome sentence. Late-arrival notes should help the front desk understand that the guest is expected, not improvising. When a confirmation is written well, one screen can keep the traveler moving even offline.',
          'For HotelByte, many back-office meanings eventually arrive inside this letter: supplier confirmation, hotel remarks, payment state, cancellation policy, and estimated arrival time. The clearer the system, the more the confirmation feels like a promise from one person to another. The blurrier the system, the more the guest is forced to read an API document at the curb.'
        ],
        ctaLabel: 'Back to the HotelByte homepage'
      }
    },
    visual: {
      src: '/daily/2026-06-17.svg',
      alt: {
        zh: '一部低电量手机显示酒店确认单，旁边有出租车路线、酒店位置针和可交给前台的预订卡片。',
        en: 'A low-battery phone showing a hotel confirmation beside a taxi route, hotel pin, and booking card for the front desk.'
      },
      caption: {
        zh: '确认单最重要的读者，可能正站在路边、手机快没电、只需要知道下一步该去哪里。',
        en: 'The most important reader of a confirmation may be standing at the curb with low battery, needing only the next clear step.'
      }
    },
    nextThemeSeeds: {
      zh: [
        '出租车司机看确认单地址时，地名翻译应该帮谁少走弯路',
        '前台怎样读懂供应商备注，而不是翻译一串内部代码',
        '为什么入住时间不是字段，而是一句带例外条件的承诺',
        '旅行产品里“联系酒店”这四个字应该写得更有礼貌',
        '从登机牌、房卡和纸质地图里学习低电量时代的界面设计'
      ],
      en: [
        'When a taxi driver reads the confirmation address, who should the place-name translation help?',
        'How the front desk can read supplier remarks without decoding internal codes',
        'Why check-in time is not a field but a promise with exceptions',
        'How to write “contact the hotel” with more hospitality in travel products',
        'Learning low-battery interface design from boarding passes, key cards, and paper maps'
      ]
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-daily-story-publisher',
    generatedAt: '2026-06-17T10:12:42+04:00'
  },
  {
    date: '2026-06-19',
    slug: 'address-with-two-readers',
    content: {
      zh: {
        title: '一行地址有两个读者',
        mood: '客人在后座盯着手机，司机在红灯前瞄一眼屏幕，真正的确认单要同时照顾他们。',
        theme: '把酒店地址写成客人和司机都能使用的旅行交接',
        summary:
          '酒店确认单里的地址不是静态资料。它要安抚客人，也要帮助司机少绕路；好的地名翻译应该让下一次交接更顺，而不是只让页面看起来完整。',
        body: [
          '酒店地址在确认单里常常被当成一行固定信息：复制官网地址，补上城市和邮编，再加一个地图链接。可旅行中的地址很少只是给客人看的。它经常会被举给出租车司机、转发给接机人员、读给前台、贴进聊天窗口，变成一段临时的跨语言协作。',
          '这时，地址有两个读者。客人需要确认“我去的是不是这家酒店”，司机需要知道“这条路该怎么走，哪个入口更合适”。如果确认单只保留英文品牌名，司机可能要猜；如果只写本地地名，客人又可能担心自己被带去另一个地方。真正有用的地址会把酒店正式名称、本地常用写法、街区线索、入口或地标放在合适的位置，让两个人都少犹豫一次。',
          '这不是把确认单写得更长，而是把读者顺序想清楚。第一眼给客人安全感，第二眼给司机方向感，需要时再提供地图链接和可复制文本。低电量、弱网络、语言不熟的时候，一个能被别人直接使用的地址，比一段漂亮欢迎语更像服务。',
          'HotelByte 做分销基础设施时，这类细节值得被认真对待。供应商给出的酒店名称、地址字段、坐标和备注，最后可能落在出租车后座的一块小屏幕上。系统如果知道这行地址会被不同角色读取，就会少一点“数据库里有”，多一点“路上真的能用”。'
        ],
        ctaLabel: '返回 HotelByte 首页'
      },
      en: {
        title: 'One Address Has Two Readers',
        mood: 'The guest studies a phone in the back seat; the driver glances at it before the light changes. A confirmation has to serve both.',
        theme: 'Writing hotel addresses as travel handoffs for both guests and drivers',
        summary:
          'The address in a hotel confirmation is not static profile data. It reassures the guest and helps the driver avoid a wrong turn; good place-name translation should make the next handoff smoother, not just make the page look complete.',
        body: [
          'A hotel address often gets treated as one fixed line in a confirmation: copy the official address, add city and postal code, then attach a map link. In actual travel, that line is rarely only for the guest. It gets shown to a taxi driver, forwarded to a pickup contact, read aloud at the front desk, or pasted into a chat window. It becomes a small piece of cross-language coordination.',
          'That means the address has two readers. The guest wants to know, “Am I going to the right hotel?” The driver wants to know, “Which road, which entrance, which local name?” If the confirmation keeps only the English brand name, the driver may have to guess. If it shows only the local place name, the guest may worry they are being taken somewhere else. A useful address gives the official hotel name, local naming, neighborhood clue, entrance note, or landmark in the right order, so both people hesitate less.',
          'The answer is not to make confirmations longer. It is to respect the reading sequence. First glance: confidence for the guest. Second glance: direction for the driver. Then, when needed, a map link and copyable text. When the phone is low, the network is weak, or the language is unfamiliar, an address someone else can immediately use feels more like service than a polished welcome sentence.',
          'For HotelByte, this kind of detail belongs inside distribution infrastructure, not only copywriting. Supplier hotel names, address fields, coordinates, and remarks may eventually land on a small screen in the back of a taxi. If the system understands that different roles will read the same line, it can move from “the data exists” toward “the route actually works.”'
        ],
        ctaLabel: 'Back to the HotelByte homepage'
      }
    },
    visual: {
      src: '/daily/2026-06-19.svg',
      alt: {
        zh: '出租车后座里，一部手机显示酒店确认单地址，旁边有司机视角的本地地名、地图路线、酒店入口和地标提示。',
        en: 'Inside a taxi, a phone shows a hotel confirmation address beside driver-facing local place names, a map route, a hotel entrance, and a landmark note.'
      },
      caption: {
        zh: '同一行地址要让客人放心，也要让司机少绕路；翻译真正服务的是下一次交接。',
        en: 'The same address should reassure the guest and help the driver avoid a wrong turn. Translation serves the next handoff.'
      }
    },
    nextThemeSeeds: {
      zh: [
        '前台怎样读懂供应商备注，而不是翻译一串内部代码',
        '为什么入住时间不是字段，而是一句带例外条件的承诺',
        '旅行产品里“联系酒店”这四个字应该写得更有礼貌',
        '从纸质城市地图学习怎样给陌生人指出下一步',
        '酒店门口的雨棚、侧门和装卸区，为什么也是分销数据的一部分'
      ],
      en: [
        'How the front desk can read supplier remarks without decoding internal codes',
        'Why check-in time is not a field but a promise with exceptions',
        'How to write “contact the hotel” with more hospitality in travel products',
        'Learning how to point strangers to the next step from paper city maps',
        'Why hotel canopies, side doors, and loading zones also belong in distribution data'
      ]
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-daily-story-publisher',
    generatedAt: '2026-06-19T10:12:00+04:00'
  }
];

function dateInDailyStoryTimeZone(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: dailyStoryTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(now);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function getDailyStoryDate(now = new Date()): string {
  return dateInDailyStoryTimeZone(now);
}

export function getStoryForDate(date: string): DailyStory | undefined {
  return dailyStories.find((story) => story.date === date);
}

export function getTodayStory(now = new Date()): DailyStory | undefined {
  return getStoryForDate(getDailyStoryDate(now));
}

export function getStoryBySlug(slug: string | undefined): DailyStory | undefined {
  if (!slug) {
    return undefined;
  }
  return dailyStories.find((story) => story.slug === slug);
}

export function getStoryBySlugOrDate(value: string | undefined): DailyStory | undefined {
  if (!value) {
    return undefined;
  }
  return getStoryBySlug(value) ?? getStoryForDate(value);
}

export function getDailyStoriesArchive(): DailyStory[] {
  return [...dailyStories].sort((a, b) => b.date.localeCompare(a.date));
}
