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
  asset: 'hero';
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
      asset: 'hero',
      alt: {
        zh: '上下错位的发光层叠方块，像一条故事线从系统底座里浮出来。',
        en: 'Two offset glowing layered blocks, like a story line rising from an operating system foundation.'
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
      title: '税费不是小字',
      mood: '一行灰色说明，可能决定用户是否相信整个平台。',
      theme: '价格信任来自完整的费用语义',
      summary: '酒店价格里的税、费、到店支付和供应商备注，不能只作为附属文案存在；它们是价格是否可信的一部分。',
      body: [
        '很多页面把税费放在价格旁边的小字里，好像它只是一个礼貌提醒。可对用户来说，税费决定了最后到底要付多少钱；对平台来说，它决定了展示价格和结算金额能不能对上。',
        '酒店分销尤其容易在这里出错。供应商可能把 payable charge 写进 rateComment，也可能拆成 taxes、fees、service charge。系统如果只保留文本，不理解结构，就无法在搜索、预订、售后之间保持一致。',
        'HotelByte 对价格的态度应该更严谨：税费不是价格旁边的小字，而是价格本身的一部分。一个真正可信的报价，必须能说明哪些现在付，哪些到店付，哪些只是说明，哪些会进入利润。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Taxes Are Not Small Print',
      mood: 'One gray line of copy can decide whether a user trusts the entire platform.',
      theme: 'Price trust comes from complete fee semantics',
      summary: 'Hotel taxes, fees, payable charges, and supplier remarks cannot live as decoration around the price. They are part of whether the price is believable.',
      body: [
        'Many pages place taxes and fees beside the price as small print, as if they are a polite footnote. To the user, they decide what must actually be paid. To the platform, they decide whether displayed price and settlement amount can reconcile.',
        'Hotel distribution is especially fragile here. A supplier may place payable charges in rateComment, split them into taxes and fees, or add a service charge. If the system preserves only text and not structure, it cannot stay consistent from search to booking to support.',
        'HotelByte should treat price more seriously: taxes and fees are not beside the price; they are part of it. A trustworthy quote explains what is paid now, what is paid at the property, what is only explanatory, and what enters profit.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么到店支付需要被系统明确标记',
        '供应商备注里隐藏的费用应该如何进入报价',
        '利润展示为什么宁愿空白也不能猜',
        '价格解释如何影响客服工单数量',
        '为什么“总价”必须说明它包含了什么'
      ],
      en: [
        'Why pay-at-property charges need explicit system flags',
        'How hidden supplier remark fees should enter a quote',
        'Why profit display should be blank rather than guessed',
        'How price explanation changes support ticket volume',
        'Why total price must say what it includes'
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
      title: '导出文件也是承诺',
      mood: 'CSV 没有界面保护，却会被转发给更多人。',
      theme: '导出不是页面的副产品，而是另一个业务界面',
      summary: '用户导出的报表一旦离开系统，就会进入邮件、会议和财务流程；它必须比页面更谨慎。',
      body: [
        '很多团队把导出当成页面功能的附属品：页面有什么，导出就跟着吐什么。可导出文件一旦离开系统，就不再有 tooltip、权限上下文、实时校验和颜色提醒。',
        '这就是它危险的地方。一个页面上的空白利润，用户还可能理解为“不可用”；一个导出里的错误利润，会被复制进邮件、表格、会议纪要，最后变成看似正式的事实。',
        'HotelByte 做导出时应该反过来想：导出不是更简单的页面，而是更难撤回的承诺。凡是不能解释来源的金额，就不应该因为要填满单元格而出现。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Exports Are Promises Too',
      mood: 'A CSV has no interface protection, yet it travels farther than the page.',
      theme: 'Export is not a byproduct of a page; it is another business interface',
      summary: 'Once a report leaves the system, it enters email, meetings, and finance workflows. It has to be more careful than the page.',
      body: [
        'Many teams treat export as a side effect of the page: whatever the page shows, the file emits. But once an export leaves the system, it loses tooltips, permission context, live validation, and visual warnings.',
        'That is what makes it dangerous. A blank profit on a page may still read as unavailable. A wrong profit in an export can be copied into email, spreadsheets, and meeting notes until it becomes an official-looking fact.',
        'HotelByte should think of export differently: it is not a simpler page. It is a harder-to-retract promise. Any amount whose source cannot be explained should not appear just to fill a cell.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么权限不应该只控制菜单',
        '导出里的字段顺序也是产品设计',
        '报表里的空白应该如何解释',
        '从财务导出看审计友好设计',
        '为什么用户截图也是一种接口'
      ],
      en: [
        'Why permissions should not only control menus',
        'Field order in exports is product design too',
        'How blanks in reports should explain themselves',
        'Audit-friendliness through financial exports',
        'Why user screenshots are also an interface'
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
      title: '实体树记得业务关系',
      mood: 'ID 会变得很冷，树会提醒你谁和谁真正有关。',
      theme: '层级关系是权限、配置和责任的共同地图',
      summary: '租户、品牌、客户、账号不是简单列表；它们组成一棵会影响配置继承和授权判断的业务树。',
      body: [
        '当系统里只剩 ID 时，业务关系会变得很薄。一个 customerId 看起来只是参数，但它可能背后连接着客户根、客户账号、租户品牌、租户集团和平台规则。',
        'HotelByte 不能在每个服务里临时猜这层关系。实体树的价值，就是让配置继承、权限判断、资源归属和页面展示共享同一张地图。',
        '这不是为了做复杂架构而复杂。相反，它是为了避免每个功能都发明自己的祖先关系。树在那里，是提醒系统：业务不是平铺的。'
      ],
      ctaLabel: '返回 HotelByte 首页'
    },
    {
      title: 'Entity Trees Remember the Business',
      mood: 'IDs can become cold; trees remind the system who is actually connected.',
      theme: 'Hierarchy is the shared map for permissions, configuration, and responsibility',
      summary: 'Tenants, brands, customers, and accounts are not just lists. They form a business tree that affects configuration inheritance and authorization.',
      body: [
        'When a system only sees IDs, business relationships become thin. A customerId may look like a parameter, but behind it are customer roots, customer accounts, tenant brands, tenant groups, and platform rules.',
        'HotelByte cannot afford to rediscover that relationship inside every service. The value of the entity tree is that configuration inheritance, authorization, ownership, and page behavior share one map.',
        'This is not complexity for its own sake. It prevents every feature from inventing a private ancestry model. The tree reminds the system that business is not flat.'
      ],
      ctaLabel: 'Back to the HotelByte homepage'
    },
    {
      zh: [
        '为什么配置继承需要可解释',
        '客户根和客户账号为什么不能混用',
        '租户品牌不是租户集团的别名',
        '当页面展示暴露了错误层级',
        '如何让权限测试读起来像业务规则'
      ],
      en: [
        'Why configuration inheritance needs to be explainable',
        'Why customer root and customer account must not be mixed',
        'A tenant brand is not an alias for tenant group',
        'When page display exposes the wrong hierarchy',
        'How to make authorization tests read like business rules'
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
      asset: 'hero',
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
        '凌晨两点的价格波动，为什么比白天更诚实',
        '一个供应商映射错误如何教会系统保持谦逊',
        '如果酒店库存会说话，它最想抱怨哪一个字段',
        '把日志写成故事：故障排查里的第一人称视角',
        '为什么 B2B 分销需要一点慢下来思考的空间'
      ],
      en: [
        'Why a 2 a.m. price movement can be more honest than daytime dashboards',
        'How a supplier mapping mistake teaches a system to stay humble',
        'If hotel inventory could speak, which field would it complain about first?',
        'Turning logs into a story: first-person debugging for distribution systems',
        'Why B2B distribution needs a little room to slow down and think'
      ]
    },
    cta: {
      href: '/'
    },
    generatedBy: 'codex-seed',
    generatedAt: '2026-06-12T00:00:00+04:00'
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
