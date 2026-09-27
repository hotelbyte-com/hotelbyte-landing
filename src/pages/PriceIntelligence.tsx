import { motion } from 'framer-motion';
import { BarChart3, Clock, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { softwareApplicationSchema, breadcrumbSchema, faqSchema, howToSchema } from '../seo/schema';
import { HowItWorks } from '../components/HowItWorks';
import { getProductBySlug } from '../data/products';
import ProductEvaluation from '../components/ProductEvaluation';
import { useI18n } from '../i18n';

export default function PriceIntelligence() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const pick = (zh: string, en: string) => (isEn ? en : zh);
  const product = getProductBySlug('price-intelligence')!;
  const route = SITE_ROUTES.priceIntelligence;
  const questions = isEn
    ? [
        { q: 'What does Lookout compare?', a: 'Lookout supports rate comparisons for configured supplier credentials, hotels, source markets and stay dates. Confirm actual coverage with your own inventory.' },
        { q: 'Where are rate facts stored?', a: 'Supplier rate facts and execution context can be stored in TDengine for time-series analysis. Query latency depends on the deployed data path and workload.' },
        { q: 'How are supplier limits handled?', a: 'Supplier quotas and credential budgets constrain comparison jobs. Test timeout and 429 behavior with the partner accounts you plan to use.' }
      ]
    : [
        { q: 'Lookout 比较哪些报价？', a: 'Lookout 可针对已配置的供应商凭证、酒店、客源市场和入住日期进行报价比较；实际覆盖请用自己的目录核对。' },
        { q: '报价事实存在哪里？', a: '供应商报价事实和执行上下文可写入 TDengine 做时序分析。查询时效取决于实际部署的数据链路和负载。' },
        { q: '如何处理供应商限流？', a: '供应商配额和凭证预算约束比价任务。应使用计划接入的合作伙伴账号测试超时和 429 行为。' }
      ];
  const steps = isEn
    ? [
        { name: 'Configure supply', text: 'Set up credentials for contracted suppliers and choose representative hotels, markets and dates.' },
        { name: 'Run comparisons', text: 'Run a bounded rate comparison and inspect coverage, freshness, latency and upstream errors.' },
        { name: 'Review evidence', text: 'Check time-series facts and report output before making a commercial decision.' }
      ]
    : [
        { name: '配置供应', text: '为已签约供应商配置凭证，选取代表性的酒店、市场和日期。' },
        { name: '运行比价', text: '执行有边界的报价比较，检查覆盖、新鲜度、延迟和上游错误。' },
        { name: '核对证据', text: '在作出商务决策前核查时序事实与报表输出。' }
      ];
  const features = [
    {
      Icon: Network,
      title: pick('供应商感知的比价', 'Supplier-aware comparison'),
      body: pick('按目标市场和提前预订期比较已签约供应商报价，并遵守合作伙伴配额。', 'Compare contracted supplier rates across target markets and lead times, subject to partner quotas.')
    },
    {
      Icon: BarChart3,
      title: pick('时序事实分析', 'Time-series rate analysis'),
      body: pick('报价事实和执行上下文可用于历史分析；请按自身数据规模验证查询时效。', 'Rate facts and execution context can support historical analysis; validate latency at your data scale.')
    },
    {
      Icon: Clock,
      title: pick('定时监控', 'Scheduled monitoring'),
      body: pick('配置比价任务，并在目标环境检查覆盖、报表和通知流程。', 'Configure comparison jobs and inspect coverage, reports and notifications in your environment.')
    }
  ];
  const title = pick('Lookout 价格情报', 'Lookout Price Intelligence');
  const description = pick(
    '针对已配置供应商、市场和日期运行报价比较，并用可检查的时序事实评估覆盖与价格变化。',
    'Compare rates for configured suppliers, markets and dates, then review time-series facts for coverage and price changes.'
  );

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-6xl mx-auto">
      <Seo
        path={route.path}
        title={title}
        description={description}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={[
          softwareApplicationSchema(product, route.path, isEn ? 'en' : 'zh'),
          breadcrumbSchema([
            { name: pick('首页', 'Home'), path: '/' },
            { name: pick('产品', 'Products'), path: '/products' },
            { name: title, path: route.path }
          ]),
          faqSchema(questions),
          howToSchema(pick('如何评估 Lookout', 'How to evaluate Lookout'), description, steps)
        ]}
      />
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 text-center max-w-3xl mx-auto">
        <p className="eyebrow mb-5">{pick('酒店价格情报', 'Hotel price intelligence')}</p>
        <h1 className="text-4xl lg:text-6xl font-display mb-6">{title}</h1>
        <p className="text-lg text-ink/65">{description}</p>
      </motion.header>

      <section className="mb-24" aria-labelledby="lookout-capabilities">
        <h2 id="lookout-capabilities" className="text-3xl font-display mb-8 text-center">{pick('核心工作流', 'Core workflow')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ Icon, title: featureTitle, body }) => (
            <article key={featureTitle} className="p-7 rounded-sm border border-line bg-paper-raised">
              <Icon className="w-7 h-7 text-seal mb-5" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-3">{featureTitle}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductEvaluation
        rows={product.evaluation}
        rowsEn={product.evaluationEn}
        eyebrow="采购视角"
        eyebrowEn="Procurement view"
        title="评估价格情报时看什么"
        titleEn="What to check in price intelligence"
        lead="用自己的酒店和日期核对净价、覆盖、限流行为与报表输出。"
        leadEn="Use your own hotels and dates to check rates, coverage, rate-limit behavior and report output."
      />

      <HowItWorks
        title={pick('如何评估 Lookout', 'How to evaluate Lookout')}
        subtitle={description}
        steps={steps}
      />

      <section className="mb-24" aria-labelledby="lookout-faq">
        <h2 id="lookout-faq" className="text-3xl font-display mb-8">{pick('常见问题', 'Common questions')}</h2>
        <div className="space-y-5">
          {questions.map(({ q, a }) => (
            <article key={q} className="p-6 rounded-sm border border-line bg-paper-raised">
              <h3 className="font-bold mb-2">{q}</h3>
              <p className="text-ink/65 leading-relaxed">{a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="text-center rounded-sm border border-line bg-paper-raised p-8 lg:p-12">
        <h2 className="text-3xl font-display mb-4">{pick('用真实供应验证价格情报', 'Validate price intelligence with real supply')}</h2>
        <p className="text-ink/65 mb-8 max-w-2xl mx-auto">{pick('选取目标市场、酒店和供应商账号，对照真实报价与执行记录。', 'Choose your markets, hotels and supplier accounts, then compare real rates and execution records.')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/compare" className="inline-flex items-center gap-2 px-7 py-4 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-colors">
            {pick('查看选型指南', 'Read evaluation guide')} <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="mailto:sales@hotelbyte.com?subject=Lookout%20evaluation" className="inline-flex items-center gap-2 px-7 py-4 rounded-sm border border-line text-ink font-medium hover:bg-paper transition-colors">
            {pick('讨论评估方案', 'Discuss an evaluation')}
          </a>
        </div>
      </section>
    </div>
  );
}
