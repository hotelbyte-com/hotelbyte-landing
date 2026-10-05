import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Seo } from '../components/Seo';
import { useI18n } from '../i18n';
import { localizedPath } from '../i18n/locale';
import { contentLocaleOf } from '../i18n';
import { breadcrumbSchema, webPageSchema } from '../seo/schema';

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  lead: string;
  sections: { title: string; body: string; points: string[] }[];
  questions: { question: string; answer: string }[];
  primaryLabel: string;
  secondaryLabel: string;
  mailtoSubject?: string;
};

type Page = {
  path: string;
  en: Copy;
  zh: Copy;
};

const pages = {
  distributionPlatforms: {
    path: '/solutions/distribution-platforms',
    en: {
      eyebrow: 'For distribution platforms',
      title: 'Run hotel distribution as one accountable system',
      description: 'A practical distribution foundation for teams connecting hotel supply, agency customers, pricing rules and booking operations.',
      lead: 'A distributor needs more than a list of suppliers. It needs a way to explain where a rate came from, who could sell it, what policy applied and what happened when a booking failed.',
      sections: [
        { title: 'Connect supply without hiding differences', body: 'A unified API can simplify the buyer-facing contract while retaining each supplier’s cancellation, tax, room and payment terms.', points: ['Inspect the supplier response behind a quote.', 'Check hotel and room mapping before release.', 'Keep cancellation and charge details attached to the offer.'] },
        { title: 'Operate your customer hierarchy', body: 'Distributors often serve multiple brands, agencies and accounts. Access rules, commercial rules and credit need explicit ownership at each boundary.', points: ['Map the actual entity tree before onboarding.', 'Test that an agency cannot see another agency’s data.', 'Verify who can change pricing and credit.'] },
        { title: 'Diagnose the entire booking path', body: 'Search, availability, booking and after-sales events should share identifiers that let support teams reconstruct an incident.', points: ['Request a real trace from quote through booking.', 'Inspect supplier error and latency evidence.', 'Confirm the operational next step is visible.'] }
      ],
      questions: [
        { question: 'Is this a hotel channel manager?', answer: 'No. This page describes the operating foundation used by a distribution business to connect supply, customers and booking workflows.' },
        { question: 'How should we evaluate a supplier integration?', answer: 'Run representative hotel, rate and booking scenarios in the target market, then review the raw response, mapping, cancellation policy, taxes and failure handling.' }
      ],
      primaryLabel: 'Discuss your distribution workflow',
      secondaryLabel: 'Open the evaluation checklist'
    },
    zh: {
      eyebrow: '面向分销平台',
      title: '把酒店分销运营放进一套可追责的系统',
      description: '连接酒店供应、代理客户、价格规则与预订运营的分销底座。',
      lead: '分销商需要的不只是一张供应商名单。团队还要说清报价来自哪里、谁有权销售、适用了什么政策，以及预订失败时发生了什么。',
      sections: [
        { title: '接入供应，同时保留关键差异', body: '统一 API 可以简化对外契约，但不能抹平各供应商在取消、税费、房型和支付条款上的差异。', points: ['从报价追溯供应商原始响应。', '上线前核对酒店与房型映射。', '让取消政策和收费项目始终跟随报价。'] },
        { title: '管理真实的客户层级', body: '分销商可能服务多个品牌、代理商和账号。访问权限、商业规则和信用额度需要明确归属。', points: ['入驻前画出实际实体关系。', '验证代理商无法读取其他代理商数据。', '核对谁可以修改价格与信用。'] },
        { title: '还原完整预订链路', body: '搜索、查价、预订和售后事件需要可关联的标识，让支持团队能够重建问题现场。', points: ['查看从报价到预订的真实追踪。', '检查供应商错误与耗时证据。', '确认后续处置动作清晰可见。'] }
      ],
      questions: [
        { question: '这是酒店渠道管理系统吗？', answer: '不是。本页介绍的是分销企业用于连接供应、客户与预订工作流的运营底座。' },
        { question: '如何评估供应商集成？', answer: '在目标市场运行有代表性的酒店、报价和预订场景，再核对原始响应、映射、取消政策、税费与失败处理。' }
      ],
      primaryLabel: '讨论分销业务流程',
      secondaryLabel: '查看选型清单'
    }
  },
  hotelDistributionGuide: {
    path: '/guides/hotel-distribution',
    en: {
      eyebrow: 'Hotel distribution guide',
      title: 'What is hotel distribution?',
      description: 'A practical guide to hotel distribution: supply, travel sellers, rates, availability, booking, settlement and the questions to ask when choosing a platform.',
      lead: 'Hotel distribution is the process that makes a property’s rooms discoverable, bookable and serviceable through travel-selling channels. It joins commercial agreements with live data and operational responsibility.',
      sections: [
        { title: 'Who participates?', body: 'Properties or their systems provide inventory and terms. Distributors connect supply to travel sellers. Travel agencies, corporate travel platforms and other sellers present offers to customers.', points: ['Supply owns room availability and source terms.', 'Distribution translates and routes offers.', 'The seller owns the customer-facing journey.'] },
        { title: 'What must move through the chain?', body: 'A sellable offer includes more than a nightly price. Hotel and room identity, occupancy, board, taxes, fees, cancellation, payment and confirmation rules affect the customer promise.', points: ['Static hotel and room content.', 'Live rate and availability.', 'Booking, change, cancellation and settlement events.'] },
        { title: 'How do you evaluate a platform?', body: 'Ask for a live path through search, rate check, booking and support. Test the markets and hotel set you actually sell, then inspect both success and failure cases.', points: ['Coverage and mapping quality in target markets.', 'Policy and payable-price fidelity.', 'Traceability, access control and support response.'] }
      ],
      questions: [
        { question: 'Is hotel distribution the same as a booking website?', answer: 'No. A booking website is one selling surface; distribution also includes supplier connectivity, data normalization, commercial rules, booking and after-sales operations.' },
        { question: 'Why do hotel prices differ between channels?', answer: 'Channels can apply different contracts, markups, taxes, currencies and availability rules. The reliable way to investigate a difference is to trace the exact offer and its source terms.' }
      ],
      primaryLabel: 'Evaluate your distribution stack',
      secondaryLabel: 'See Stai API'
    },
    zh: {
      eyebrow: '酒店分销指南',
      title: '什么是酒店分销？',
      description: '解释酒店分销中的供应、旅行商、房价、库存、预订、结算，以及选型时应验证的问题。',
      lead: '酒店分销是让酒店客房通过旅行销售渠道被发现、预订并得到后续服务的过程。它把商业协议、实时数据和运营责任连接起来。',
      sections: [
        { title: '谁参与其中？', body: '酒店或其系统提供库存与条款；分销平台把供应连接到旅行商；旅行社、差旅平台等销售方负责面向客户的体验。', points: ['供应方负责客房库存与原始条款。', '分销平台转换并路由报价。', '销售方负责客户旅程。'] },
        { title: '链路中需要传递什么？', body: '可售报价不只是每晚房价。酒店和房型身份、入住人数、餐食、税费、取消、支付与确认规则都会改变对客户的承诺。', points: ['静态酒店与房型内容。', '实时价格与库存。', '预订、变更、取消与结算事件。'] },
        { title: '如何评估分销平台？', body: '要求现场走通搜索、查价、预订和售后。使用自己实际销售的市场与酒店，检查成功与失败两类场景。', points: ['目标市场的覆盖和映射质量。', '政策及应付总价的准确性。', '链路追踪、权限隔离和支持响应。'] }
      ],
      questions: [
        { question: '酒店分销等于一个预订网站吗？', answer: '不等于。预订网站只是销售界面之一；分销还包括供应商接入、数据标准化、商业规则、预订及售后运营。' },
        { question: '为什么不同渠道的酒店价格会不同？', answer: '不同渠道可能使用不同合同、加价、税费、币种和库存规则。查明差异需要追踪具体报价及其来源条款。' }
      ],
      primaryLabel: '评估现有分销系统',
      secondaryLabel: '了解 Stai API'
    }
  },
  integrations: {
    path: '/integrations',
    en: {
      eyebrow: 'Integration directory',
      title: 'Inspect the integrations, then test the live path',
      description: 'A transparent view of HotelByte supplier adapters and the checks required before claiming live coverage in a target market.',
      lead: 'An adapter in source code is not proof that inventory is enabled for every customer. We publish the distinction so buyers can evaluate the connection they will actually use.',
      sections: [
        { title: 'Supplier adapters registered in the backend', body: 'The backend initializer names adapters for Dida, Hotelbeds, HeyTrip, Tourmind, Yalago, Juniper, TBO and others. Code registration is evidence of an adapter, while live readiness must be checked separately.', points: ['Ask for a walkthrough of the adapter registry.', 'Confirm credentials and commercial access for the target environment.', 'Run hotel, rate and booking tests for the target market.'] },
        { title: 'One evaluation, several checks', body: 'A supplier test should include more than an HTTP success response. Verify content mapping, total payable price, cancellation terms, confirmation and support identifiers.', points: ['Hotel and room identity.', 'Rate, tax, fee and policy fidelity.', 'Failure handling and incident trace.'] }
      ],
      questions: [
        { question: 'Does an adapter mean the supplier is active for my account?', answer: 'No. Activation depends on credentials, commercial permission, market coverage and successful end-to-end validation.' },
        { question: 'How can I verify code-level integration?', answer: 'Ask the HotelByte team to show the supplier initializer and provide environment-specific activation and test evidence.' }
      ],
      primaryLabel: 'Request an integration review',
      secondaryLabel: 'Read the evaluation checklist'
    },
    zh: {
      eyebrow: '集成目录',
      title: '先核对适配器，再验证真实链路',
      description: '透明展示 HotelByte 的供应商适配器，以及在目标市场确认真实可用性需要完成的检查。',
      lead: '源码里有适配器，不等于每位客户都已启用该供应商的库存。我们明确区分这两件事，让采购团队评估自己真正会用到的连接。',
      sections: [
        { title: '后端注册的供应商适配器', body: '后端初始化器列有 Dida、Hotelbeds、HeyTrip、Tourmind、Yalago、Juniper、TBO 等适配器。代码注册可证明存在适配器；线上可用性需要单独验证。', points: ['请团队演示适配器注册表。', '核对目标环境的凭证与商业权限。', '在目标市场运行酒店、报价及预订测试。'] },
        { title: '一次评估，多项检查', body: '供应商测试不能只看 HTTP 成功。还要核对内容映射、应付总价、取消条款、确认结果及售后标识。', points: ['酒店与房型身份。', '房价、税费与政策准确性。', '失败处理与事件追踪。'] }
      ],
      questions: [
        { question: '有适配器就代表我的账号已启用吗？', answer: '不代表。启用取决于凭证、商业授权、市场覆盖及端到端验证结果。' },
        { question: '如何核对代码级接入？', answer: '请 HotelByte 团队展示供应商初始化器，并提供目标环境的启用与测试证据。' }
      ],
      primaryLabel: '申请集成评估',
      secondaryLabel: '查看选型清单'
    }
  },
  sandboxVerification: {
    path: '/guides/sandbox-verification',
    en: {
      eyebrow: 'Sandbox verification guide',
      title: 'Verify us with the hotels you actually sell',
      description: 'How a sandbox verification works: prepare your hotel list, check coverage, price level, confirmation speed and after-sales, then compare the results against your current buying prices line by line.',
      lead: 'We claim a price advantage you can check. This guide shows how: what to prepare, what to test, and how to judge the result — on the hotels you actually sell, not on our demo data.',
      mailtoSubject: 'HotelByte%20sandbox%20access',
      sections: [
        { title: 'Prepare your hotel list', body: 'List the destinations, stay dates, room types and room counts you buy most — ten to twenty lines are enough. This is what we use to provision your sandbox account and supplier scope.', points: ['Destinations and dates you actually sell.', 'Common room types and typical group size.', 'Your current buying price for each line, wherever you have it.'] },
        { title: 'Get a sandbox account', body: 'Email your list to sales@hotelbyte.com (subject: Sandbox). We provision a Stai API account scoped to your markets. It runs in the browser — nothing to install, no engineering.', points: ['Account ready in one to two business days.', 'Sellers and managers work in the same account.', 'Your list pre-loaded, so day one starts with coverage.'] },
        { title: 'Test the four things that matter', body: 'Run the same four checks on every line of your list, and write each result next to your current price for that line.', points: ['Coverage: is the hotel there, is the mapping right?', 'Price: compare with your current buying price — the spread and its source ride on each quote.', 'Confirmation: place one real order and watch the two-phase state and the supplier reference.', 'After-sales: change or cancel once, and check the evidence trail.'] },
        { title: 'Decide on the comparison table', body: 'Every item ends as one row: our result, your current result, the difference. The buying decision runs on that table, not on our pitch.', points: ['One sheet, four columns, all your hotels.', 'Every number traceable back to a quote and its source.', 'Proceed and keep the workspace; pass and discard it.'] }
      ],
      questions: [
        { question: 'Does the sandbox cost anything?', answer: 'No. The evaluation sandbox is free. The subscription only enters the conversation after your verification passes.' },
        { question: 'Will anything touch my real bookings?', answer: 'No. The sandbox is a separate account with separate data; test orders created during verification are cleaned up as agreed.' },
        { question: 'How long does a verification take?', answer: 'With your list ready, usually one to two business days: coverage and prices on day one, confirmation and after-sales on day two.' }
      ],
      primaryLabel: 'Request a sandbox account',
      secondaryLabel: 'See the public demo first'
    },
    zh: {
      eyebrow: '沙箱验证指南',
      title: '用你真实在卖的酒店来验证我们',
      description: '沙箱验证怎么做：准备酒店清单，逐项验证覆盖、价格水平、确认速度与售后，并与现有拿货价逐条对拍。',
      lead: '我们说价格优势可以验证，这一页讲怎么验证：准备什么、验什么、怎么判断。用你真实在卖的酒店，不用我们的演示数据。',
      mailtoSubject: 'HotelByte%20sandbox%20access',
      sections: [
        { title: '准备你的酒店清单', body: '列出你最常采购的目的地、入住日期、房型与间数，十到二十条即可。这份清单是我们开通沙箱账号、划定供应商范围的依据。', points: ['你真实在卖的目的地与日期。', '常见房型与团队规模。', '手头有的现行拿货价，逐条带上。'] },
        { title: '开通沙箱账号', body: '把清单发到 sales@hotelbyte.com，主题注明 Sandbox。我们按你的市场范围开通 Stai API 账号；浏览器登录即用，不需要安装，也不需要研发。', points: ['一到两个工作日开通。', '销售与管理用同一个账号体系。', '你的清单预置进去，第一天就从覆盖查起。'] },
        { title: '逐项验证四件事', body: '清单上每一行都过同样的四项检查，结果写在你现行价格旁边。', points: ['覆盖：酒店搜不搜得到，映射对不对。', '价格：与现行拿货价逐条对拍，价差与来源都在报价里。', '确认：真实下一单，看两段式确认与供应商单号。', '售后：做一次改期或取消，看凭证链路完不完整。'] },
        { title: '用对照表做决定', body: '每个条目最后就是一行：我们的结果、你现在的结果、差多少。做采购决定靠这张表，不靠我们的介绍。', points: ['一张表、四列、全是你的酒店。', '每个数字都追得到报价出处。', '合作就留下这套工作区，不合作就清掉。'] }
      ],
      questions: [
        { question: '沙箱要钱吗？', answer: '评估期免费。按账号订阅，费用在你验证通过之后才进入谈判。' },
        { question: '会碰到我的真实预订吗？', answer: '不会。沙箱是独立账号、独立数据；验证期产生的测试订单按约定清理。' },
        { question: '验证要多久？', answer: '清单就位后，通常一到两个工作日：第一天跑覆盖与价格，第二天走确认与售后。' }
      ],
      primaryLabel: '申请沙箱账号',
      secondaryLabel: '先看公开演示'
    }
  },
  caseStudies: {
    path: '/case-studies',
    en: {
      eyebrow: 'Evidence library',
      title: 'See the workflow before trusting a claim',
      description: 'First-party product walkthroughs and technical evaluation paths for HotelByte. Named customer outcomes require separate publication approval.',
      lead: 'These are product verification paths, not customer testimonials. Use the demo, procurement checklist and a scoped technical walkthrough to test the claims that matter to your business.',
      sections: [
        { title: 'Trace a booking problem', body: 'Start with a search or booking identifier, then ask for the supplier response, per-step timing and the final operational decision.', points: ['Open the TraceSight product explanation.', 'Ask to see a representative trace in a controlled demo.', 'Check whether the evidence reaches the supplier boundary.'] },
        { title: 'Evaluate a distribution workflow', body: 'Use your own hotel set and target markets to test supplier coverage, mapping, policy and booking confirmation.', points: ['Read the procurement checklist.', 'Inspect the integration directory.', 'Run a sandbox scenario with your team.'] }
      ],
      questions: [
        { question: 'Are these customer success stories?', answer: 'No. These are first-party product evaluation paths. A named customer story will appear only after the customer approves its facts and publication.' },
        { question: 'What can we verify today?', answer: 'The demo, evaluation checklist, adapter walkthrough and a scoped sandbox test offer different levels of evidence. Request the test that matches your purchase decision.' }
      ],
      primaryLabel: 'Request a verified walkthrough',
      secondaryLabel: 'Open the public demo'
    },
    zh: {
      eyebrow: '证据与案例',
      title: '先看真实工作流，再判断产品主张',
      description: '用于评估 HotelByte 的产品演示路径与技术验证方式；具名客户成果须另行获得发布授权。',
      lead: '这里展示的是产品验证路径，不是客户评价。可以结合演示、选型清单和技术讲解，检查与你的业务最相关的能力。',
      sections: [
        { title: '追踪一次预订问题', body: '从搜索或预订标识出发，要求查看供应商响应、各环节耗时和最终处置判断。', points: ['阅读 TraceSight 产品说明。', '在受控演示中查看代表性追踪。', '核对证据能否到达供应商边界。'] },
        { title: '评估分销工作流', body: '用自己的酒店集合与目标市场，验证供应覆盖、映射、政策和预订确认。', points: ['阅读采购选型清单。', '查看集成目录。', '和团队共同运行沙箱场景。'] }
      ],
      questions: [
        { question: '这些是客户成功案例吗？', answer: '不是。这些是第一方产品验证路径。具名客户案例必须等客户核准事实并授权发布后才会出现。' },
        { question: '现在能验证什么？', answer: '演示、选型清单、适配器讲解和特定范围的沙箱测试可提供不同层级的证据；按采购问题选择相应测试。' }
      ],
      primaryLabel: '申请可核验的演示',
      secondaryLabel: '打开公开 Demo'
    }
  }
} satisfies Record<string, Page>;

type PageKey = keyof typeof pages;

function ContentPage({ pageKey }: { pageKey: PageKey }) {
  const { locale } = useI18n();
  // Widen to `Page` so optional fields (mailtoSubject) survive the literal
  // union — `satisfies` keeps every entry's literal type otherwise.
  const page: Page = pages[pageKey];
  // Locale publication is controlled by the prerender manifest. A missing
  // translation must never silently render English under a localized URL.
  const copy = page[contentLocaleOf(locale)];
  if (!copy) return null;
  const isZh = locale === 'zh';
  const to = (path: string) => localizedPath(path, locale);
  const secondPath = pageKey === 'caseStudies' || pageKey === 'sandboxVerification'
    ? '/demo'
    : pageKey === 'hotelDistributionGuide'
      ? '/products/api'
      : '/compare';
  const jsonLd = [
    webPageSchema(page.path, copy.title, copy.description, isZh ? 'zh-CN' : 'en'),
    breadcrumbSchema([
      { name: isZh ? '首页' : 'Home', path: '/' },
      { name: copy.title, path: page.path }
    ])
  ];

  return (
    <article className="px-6 lg:px-8 py-16 lg:py-24">
      <Seo path={page.path} title={`${copy.title} | HotelByte`} description={copy.description} locale={isZh ? 'zh-CN' : 'en'} jsonLd={jsonLd} />
      <div className="max-w-6xl mx-auto">
        <header className="max-w-4xl mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass mb-6">{copy.eyebrow}</p>
          <h1 className="font-display text-4xl lg:text-6xl leading-tight mb-7">{copy.title}</h1>
          <p className="text-lg text-ink/70 leading-relaxed max-w-3xl">{copy.lead}</p>
          {pageKey === 'sandboxVerification' ? (
            <div className="mt-8">
              <SandboxRequestForm primaryLabel={copy.primaryLabel} isZh={isZh} />
              <div className="mt-4">
                <Link to={to(secondPath)} className="text-sm text-brass underline hover:text-brass">{copy.secondaryLabel} →</Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 mt-8">
              <a href={`mailto:sales@hotelbyte.com?subject=${copy.mailtoSubject ?? 'HotelByte%20distribution%20evaluation'}`} className="px-6 py-3 bg-ink text-paper font-medium rounded-sm hover:bg-ink-deep">{copy.primaryLabel}</a>
              <Link to={to(secondPath)} className="px-6 py-3 border border-ink/30 text-ink font-medium rounded-sm hover:border-ink">{copy.secondaryLabel}</Link>
            </div>
          )}
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {copy.sections.map((section) => (
            <section key={section.title} className="border border-line bg-paper-raised p-7">
              <h2 className="font-display text-2xl mb-4">{section.title}</h2>
              <p className="text-ink/70 leading-relaxed mb-5">{section.body}</p>
              <ul className="list-disc ps-5 space-y-2 text-sm text-ink/75">
                {section.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <section className="max-w-3xl mb-20" aria-labelledby="growth-questions">
          <h2 id="growth-questions" className="font-display text-3xl mb-6">{isZh ? '常见问题' : 'Questions buyers ask'}</h2>
          <div className="divide-y divide-line border-y border-line">
            {copy.questions.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <h3 className="font-semibold text-lg mb-2">{question}</h3>
                <p className="text-ink/70 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label={isZh ? '继续探索' : 'Continue exploring'} className="border-t border-line pt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link className="underline hover:text-brass" to={to('/products/api')}>Stai API</Link>
          <Link className="underline hover:text-brass" to={to('/compare')}>{isZh ? '选型指南' : 'Evaluation checklist'}</Link>
          <Link className="underline hover:text-brass" to={to('/stories')}>{isZh ? '工程故事' : 'Engineering stories'}</Link>
          <Link className="underline hover:text-brass" to={to('/demo')}>{isZh ? '公开 Demo' : 'Public demo'}</Link>
        </nav>
      </div>
    </article>
  );
}

export function DistributionPlatforms() { return <ContentPage pageKey="distributionPlatforms" />; }
export function HotelDistributionGuide() { return <ContentPage pageKey="hotelDistributionGuide" />; }
export function Integrations() { return <ContentPage pageKey="integrations" />; }
export function CaseStudies() { return <ContentPage pageKey="caseStudies" />; }
export function SandboxVerificationGuide() { return <ContentPage pageKey="sandboxVerification" />; }

// Self-serve sandbox request: collects the requester's email and submits a
// sandbox_request feedback ticket; the backend provisions the account and
// emails the credentials. Provisioning runs on the production gateway (the
// production Test Tenant 7 carries the ONLINE supplier credentials the
// sandbox promises), so visitors signing in at portal.hotelbyte.com find
// their account — override with VITE_SANDBOX_API_BASE_URL if that moves.
type SandboxFormState = 'idle' | 'submitting' | 'success' | 'error';

function SandboxRequestForm({ primaryLabel, isZh }: { primaryLabel: string; isZh: boolean }) {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<SandboxFormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formState === 'submitting') return;
    const normalized = email.trim();
    if (!normalized) return;
    setFormState('submitting');
    setErrorMsg('');
    const base = import.meta.env.VITE_SANDBOX_API_BASE_URL || 'https://api.hotelbyte.com';
    try {
      const resp = await fetch(`${base}/api/feedback/submitFeedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedbackType: 'sandbox_request',
          submitterEmail: normalized,
          submitterName: 'sandbox-guide',
          title: isZh ? '沙箱账号申请' : 'Sandbox access request',
          content: { source: 'sandbox-guide', locale: isZh ? 'zh' : 'en', email: normalized },
        }),
      });
      const data = await resp.json().catch(() => null);
      if (resp.ok && data?.code === 0) {
        setFormState('success');
      } else {
        setErrorMsg(data?.msg || (isZh ? '提交失败，请稍后重试' : 'Submission failed, please retry later'));
        setFormState('error');
      }
    } catch {
      setErrorMsg(isZh ? '网络错误，请稍后重试' : 'Network error, please retry later');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div className="border border-line bg-paper-raised p-7 max-w-xl" role="status">
        <p className="font-semibold text-lg mb-2">{isZh ? '已提交，凭据邮件正在路上。' : 'Submitted — your credentials email is on its way.'}</p>
        <p className="text-sm text-ink/70 leading-relaxed">
          {isZh
            ? '沙箱账号已开通，登录邮箱与初始密码已发送至你的邮箱（通常 1-2 分钟）。未收到请检查垃圾邮件；重复提交会重置密码并重发。'
            : 'Your sandbox account is provisioned and the credentials email has been sent to your inbox (usually within 1-2 minutes). Check spam if it has not arrived; submitting again resets the password and resends.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-xl" aria-label={primaryLabel}>
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={isZh ? '填写你的工作邮箱' : 'Your work email'}
        aria-label={isZh ? '工作邮箱' : 'Work email'}
        className="flex-1 px-4 py-3 border border-line bg-paper text-ink rounded-sm focus:outline-2 focus:outline-brass"
      />
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="px-6 py-3 bg-ink text-paper font-medium rounded-sm hover:bg-ink-deep disabled:opacity-60"
      >
        {formState === 'submitting' ? (isZh ? '提交中…' : 'Submitting…') : primaryLabel}
      </button>
      {formState === 'error' && (
        <div className="sm:basis-full text-sm text-ink/75" role="alert">
          {errorMsg}{' '}
          <a href="mailto:sales@hotelbyte.com?subject=HotelByte%20sandbox%20access" className="text-brass underline hover:text-brass">
            {isZh ? '或邮件联系 sales@hotelbyte.com' : 'or email sales@hotelbyte.com'}
          </a>
        </div>
      )}
    </form>
  );
}
