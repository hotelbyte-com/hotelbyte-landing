import { motion } from 'framer-motion';
import { Code, Brain, Bot, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { getProductBySlug } from '../data/products';
import { HowItWorks } from '../components/HowItWorks';

const tiers = [
  {
    icon: Code,
    name: 'RevenuePilot Strategy',
    focus: '收益策略配置与模拟',
    focusEn: 'Revenue strategy configuration and simulation',
    description: '面向商业团队的策略配置层。支持加价、客群、市场和供应商条件策略模板，以及命中预览和发布前模拟证据。',
    descriptionEn: 'A strategy configuration layer for commercial teams. It supports markup, segment, market, and supplier-condition templates with hit previews and pre-publish simulation evidence.',
    features: [
      '收益策略模板与条件构建器',
      '新增策略与既有策略编辑',
      '发布前命中与收益模拟',
      '草稿保存与变更差异',
    ],
    featuresEn: [
      'Revenue strategy templates and condition builder',
      'New strategy creation and existing strategy edits',
      'Pre-publish hit and revenue simulation',
      'Draft saving and change diffs',
    ],
  },
  {
    icon: Brain,
    name: 'RevenuePilot Quant',
    focus: 'AI 策略生成与证据校验',
    focusEn: 'AI strategy generation and evidence gates',
    description: '用自然语言描述收益目标，AI 自动识别策略意图、补齐必要字段、生成可审核草稿，并要求通过模拟证据后才能启用保存。',
    descriptionEn: 'Describe revenue goals in natural language. AI recognizes strategy intent, completes required fields, generates reviewable drafts, and requires simulation evidence before enabled saves.',
    features: [
      '自然语言收益策略生成',
      '多轮澄清与字段补全',
      '启用前模拟风险提示',
      '草稿应用前变更摘要',
    ],
    featuresEn: [
      'Natural-language revenue strategy generation',
      'Multi-turn clarification and field completion',
      'Simulation-before-enable risk warnings',
      'Change summary before applying drafts',
    ],
  },
  {
    icon: Bot,
    name: 'RevenuePilot Agent',
    focus: '收益策略运营助手',
    focusEn: 'Revenue strategy operations assistant',
    description: '收益 Agent 串联赚钱机会识别、策略建议、多轮澄清、模拟证据、保存确认和审计上下文；当前已产品化草稿、模拟和保存确认链路，并向主动机会发现扩展。',
    descriptionEn: 'The revenue agent connects profit-opportunity detection, strategy suggestions, multi-turn clarification, simulation evidence, save confirmation, and audit context. The current productized workflow covers drafts, simulation, and save confirmation, with expansion toward proactive opportunity discovery.',
    features: [
      '赚钱机会识别与策略建议',
      '保存前模拟证据校验',
      '既有策略修改上下文',
      '审计与治理能力预留',
    ],
    featuresEn: [
      'Profit opportunity detection and strategy suggestions',
      'Simulation evidence checks before save',
      'Existing-strategy edit context',
      'Audit and governance extension points',
    ],
  },
];

const workflow = [
  {
    label: 'Recognized Revenue Strategy',
    title: '识别收益策略意图',
    titleEn: 'Recognize revenue strategy intent',
    desc: '从自然语言中抽取目标客群、市场、供应商、入住日期、金额区间、利润目标和转化约束。',
    descEn: 'Extract target segments, markets, suppliers, stay dates, amount ranges, margin goals, and conversion constraints from natural language.',
  },
  {
    label: 'Simulation evidence gate',
    title: '发布前模拟证据',
    titleEn: 'Simulation evidence before publishing',
    desc: '在启用保存前运行策略模拟，并把服务端签发的 condition/aim 证据绑定到当前草稿。',
    descEn: 'Before enabled saves, run a strategy simulation and bind server-issued condition/aim evidence to the current draft.',
  },
  {
    label: 'Apply strategy draft',
    title: '应用策略草稿',
    titleEn: 'Apply strategy draft',
    desc: '按新增或修改路径写入策略草稿，并保留审计上下文供后续治理扩展。',
    descEn: 'Write the strategy draft through the create or edit path and keep audit context for future governance extensions.',
  },
];

const comparisonItems = [
  {
    title: '传统规则引擎',
    titleEn: 'Traditional rule engines',
    desc: '解决的是“能不能配置”，很少回答“这条策略能不能赚钱”。',
    descEn: 'They answer whether something can be configured, but rarely whether the strategy can make money.',
  },
  {
    title: '收益管理建议工具',
    titleEn: 'Revenue recommendation tools',
    desc: '多停留在推荐层，无法安全写入分销规则、供应路由和发布闭环。',
    descEn: 'They often stop at recommendations and cannot safely write distribution rules, supplier routing, and publish workflows.',
  },
  {
    title: 'HotelByte RevenuePilot',
    titleEn: 'HotelByte RevenuePilot',
    desc: '策略生成、模拟证据验证、草稿应用和审计上下文在同一条链路中完成。',
    descEn: 'Strategy generation, simulation evidence validation, draft application, and audit context happen in one governed workflow.',
  },
];

export default function RevenuePilot() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const pick = (zh: string, en: string) => (isEn ? en : zh);
  const product = getProductBySlug('revenuepilot')!;
  const route = SITE_ROUTES.revenuePilot;
  const faq = faqSchema(
    isEn
      ? [
          { q: 'What is RevenuePilot?', a: product.descriptionEn },
          { q: 'How does RevenuePilot validate a pricing change before save?', a: 'RevenuePilot runs simulation-before-enable with hit simulation, revenue impact, server-issued evidence, and audit context before any enabled save.' },
          { q: 'Can RevenuePilot orchestrate multiple revenue agents?', a: 'Yes. RevenuePilot Agent connects profit-opportunity detection, strategy suggestions, multi-turn clarification, simulation evidence, save confirmation, and audit context with governance extension points.' }
        ]
      : [
          { q: 'RevenuePilot 益策是什么?', a: product.description },
          { q: 'RevenuePilot 如何在保存前验证调价?', a: 'RevenuePilot 在启用保存前运行命中模拟、收益影响、服务端签发证据与审计上下文,避免凭感觉调价。' },
          { q: 'RevenuePilot 能否编排多个收益 Agent?', a: '可以。RevenuePilot Agent 串联赚钱机会识别、策略建议、多轮澄清、模拟证据、保存确认和审计上下文,治理能力通过扩展点接入。' }
        ]
  );
  const howTo = howToSchema(
    isEn
      ? 'Run RevenuePilot across three evidence-bound steps'
      : 'RevenuePilot 益策的三步证据闭环',
    isEn
      ? 'RevenuePilot turns natural-language intent into governed saves. Strategy generation, simulation, and confirmation share one evidence chain.'
      : 'RevenuePilot 把自然语言意图转化为受控保存。策略生成、模拟与确认共用同一条证据链。',
    isEn
      ? [
          { name: 'Describe the intent', text: 'Commercial teams describe the goal in natural language. RevenuePilot identifies the strategy intent and fills required fields.' },
          { name: 'Run the simulation', text: 'Simulation-before-enable validates hits, revenue impact, supplier conditions, RBAC, and save confirmation evidence before any save.' },
          { name: 'Confirm with audit context', text: 'Save confirmation is the gate. Existing strategies reuse revision context. Audit and governance extension points preserve the trail.' }
        ]
      : [
          { name: '描述意图', text: '商业团队用自然语言描述目标,RevenuePilot 识别策略意图并补齐必要字段。' },
          { name: '运行模拟', text: '启用前模拟会校验命中、收益影响、供应商条件、RBAC 与保存确认证据,凭感觉调价被屏蔽。' },
          { name: '带审计上下文的确认', text: '保存确认是最后一道闸门。既有策略复用修改上下文,审计与治理扩展点保留全部链路。' }
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brass/10 border border-brass/20 text-xs font-medium text-brass mb-6">
          AI Revenue Strategy Engine
        </div>
        <h1 className="text-4xl lg:text-6xl font-display mb-6 leading-tight">
          RevenuePilot <span className="text-ink/40 text-3xl lg:text-5xl">{isEn ? 'Revenue' : '益策'}</span><br />
          <span className="text-brass">{pick('AI 收益策略引擎', 'AI Revenue Strategy Engine')}</span>
        </h1>
        <p className="text-lg text-ink/60 font-light">
          {pick('像量化策略一样运营酒店分销收益。', 'Run hotel distribution revenue like a quantitative strategy.')}
        </p>
        <p className="text-ink/60 leading-relaxed mt-4">
          {pick(
            'RevenuePilot 将加价、供应商、客群和市场策略从静态规则升级为 AI 可生成、可模拟、可受控保存的赚钱系统。当前已产品化自然语言草稿、模拟证据和保存确认链路，并沿着赚钱机会识别与收益 Agent 编排继续演进。',
            'RevenuePilot upgrades markup, supplier, segment, and market strategies from static rules into an AI-generated, simulated, governed-save profit system. The current workflow productizes natural-language drafts, simulation evidence, and save confirmation while evolving toward profit-opportunity detection and revenue agent orchestration.'
          )}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
      >
        {[
          { value: pick('3档', '3 tiers'), label: pick('Strategy / Quant / Agent 收益层级', 'Strategy / Quant / Agent revenue tiers') },
          { value: pick('2类', '2 paths'), label: pick('新增策略与既有策略修改路径', 'Create-new and edit-existing strategy paths') },
          { value: pick('模拟', 'Simulate'), label: pick('启用前命中与收益校验', 'Pre-enable hit and revenue checks') },
          { value: pick('受控', 'Governed'), label: pick('草稿、证据、保存确认', 'Draft, evidence, and save confirmation') },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-sm bg-paper-raised border border-line text-center">
            <div className="text-3xl font-display text-brass mb-2">{stat.value}</div>
            <div className="text-sm text-ink/60">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mb-32"
      >
        
        <div className="rounded-sm border border-line bg-paper-raised overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3 border-b border-line">
            <span className="w-2 h-2 rounded-full bg-brass" aria-hidden="true" />
            <span className="font-mono text-xs text-ink/50">revenuepilot · strategy-evidence</span>
          </div>
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-4">
              {workflow.map((item, i) => (
                <div key={item.label} className={`p-5 rounded-sm border ${
                  i === 1 ? 'bg-brass/5 border-brass/20' : 'bg-paper-raised border-line'
                }`}>
                  <div className={`text-xs font-mono mb-3 ${i === 1 ? 'text-brass' : 'text-seal'}`}>
                    {item.label}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{isEn ? item.titleEn : item.title}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{isEn ? item.descEn : item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-sm bg-paper-raised border border-line">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-brass" />
                <span className="text-sm font-medium text-brass">Governed publish gate</span>
              </div>
              <p className="text-ink/70 text-sm leading-relaxed">
                {pick(
                  '新策略和既有策略修改都必须带着服务端签发的模拟证据进入启用保存；缺少关键字段或证据与当前草稿不匹配时，RevenuePilot 只保留草稿，不允许直接发布。',
                  'Both new strategies and existing-strategy edits need server-issued simulation evidence for enabled saves. If required fields are missing or evidence no longer matches the current draft, RevenuePilot keeps the change as a draft and blocks direct publishing.'
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display mb-4">{pick('三层能力架构', 'Three-Layer Capability Architecture')}</h2>
          <p className="text-ink/60 max-w-2xl mx-auto">
            {pick(
              '从策略配置到 AI 草稿生成，再到收益 Agent 编排，RevenuePilot 为不同成熟度的商业团队提供匹配的能力层级。',
              'From strategy configuration to AI draft generation and revenue-agent orchestration, RevenuePilot gives commercial teams the right capability layer for their maturity.'
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`p-8 rounded-sm border bg-paper-raised hover:bg-paper-raised transition-all duration-500 ${
                idx === 2 ? 'border-brass/50' : 'border-line'
              }`}
            >
              <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 ${
                idx === 2 ? 'bg-brass/10' : 'bg-paper-raised'
              }`}>
                <tier.icon className={`w-6 h-6 ${
                  idx === 2 ? 'text-brass' : idx === 1 ? 'text-seal' : 'text-ink/70'
                }`} />
              </div>
              <div className={`text-xs font-medium mb-3 ${
                idx === 1 ? 'text-seal' : 'text-brass'
              }`}>
                {isEn ? tier.focusEn : tier.focus}
              </div>
              <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
              <p className="text-ink/60 leading-relaxed mb-8 text-sm">
                {isEn ? tier.descriptionEn : tier.description}
              </p>
              <ul className="space-y-3">
                {(isEn ? tier.featuresEn : tier.features).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink/80 text-sm">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      idx === 1 ? 'text-seal' : 'text-brass'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-sm border border-line bg-paper-raised mb-16"
      >
        <h3 className="text-2xl font-bold mb-6">{pick('与传统规则引擎的差异', 'How RevenuePilot Differs From Traditional Rule Engines')}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {comparisonItems.map((item, i) => (
            <div key={i} className={`p-6 rounded-sm ${
              i === 2 ? 'bg-brass/5 border border-brass/20' : 'bg-paper-raised'
            }`}>
              <div className={`text-sm font-medium mb-2 ${i === 2 ? 'text-brass' : 'text-ink/50'}`}>
                {isEn ? item.titleEn : item.title}
              </div>
              <p className="text-ink/70 text-sm">{isEn ? item.descEn : item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AEO — How it works */}
      <HowItWorks
        title={isEn ? 'How RevenuePilot ships governed savings' : 'RevenuePilot 益策如何落地受控调价'}
        subtitle={isEn
          ? 'Describe the intent, run the simulation, and confirm the save with audit context.'
          : '描述意图、运行模拟、带审计上下文确认保存,三步走完调价闭环。'}
        steps={isEn
          ? [
              { name: 'Describe the intent', text: 'Commercial teams describe the goal in natural language. RevenuePilot identifies the strategy intent and fills required fields.' },
              { name: 'Run the simulation', text: 'Simulation-before-enable validates hits, revenue impact, supplier conditions, RBAC, and save confirmation evidence before any save.' },
              { name: 'Confirm with audit context', text: 'Save confirmation is the gate. Existing strategies reuse revision context. Audit and governance extension points preserve the trail.' }
            ]
          : [
              { name: '描述意图', text: '商业团队用自然语言描述目标,RevenuePilot 识别策略意图并补齐必要字段。' },
              { name: '运行模拟', text: '启用前模拟会校验命中、收益影响、供应商条件、RBAC 与保存确认证据,凭感觉调价被屏蔽。' },
              { name: '带审计上下文的确认', text: '保存确认是最后一道闸门。既有策略复用修改上下文,审计与治理扩展点保留全部链路。' }
            ]}
      />

      <div className="text-center">
        <Link
          to="/compare"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-sm border border-ink/25 hover:bg-ink hover:text-paper transition-all font-medium mr-4"
        >
          {pick('查看完整竞品对比', 'View Full Comparison')} <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-ink text-paper font-bold transition-colors">
          {pick('申请演示', 'Book a Demo')}
        </button>
      </div>
    </div>
  );
}
