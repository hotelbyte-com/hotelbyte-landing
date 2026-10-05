import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import ProductEvaluation from '../components/ProductEvaluation';
import { getProductBySlug } from '../data/products';
import { useI18n } from '../i18n';
import { localizedPath } from '../i18n/locale';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, faqSchema, softwareApplicationSchema, webPageSchema } from '../seo/schema';

export default function TraceSight() {
  const { locale } = useI18n();
  const en = locale !== 'zh'; // tier-2 locales render the English body
  const route = SITE_ROUTES.traceSight;
  const product = getProductBySlug('tracesight')!;
  const questions = en ? [
    { q: 'What does TraceSight help investigate?', a: 'TraceSight helps teams inspect a distribution request using its trace ID, service logs, and relevant session context. The available view depends on the services and logging configured for the environment.' },
    { q: 'How do we validate a diagnosis?', a: 'Start from a real search or booking trace, compare each hop with the source logs, and have the responsible team confirm the suspected cause before changing production settings.' },
  ] : [
    { q: 'TraceSight 帮助排查什么问题？', a: 'TraceSight 帮助团队根据 Trace ID、服务日志和相关会话上下文检查分销请求。可查看的内容取决于环境中已配置的服务与日志。' },
    { q: '如何验证诊断结论？', a: '从真实搜索或预订链路入手，对照每一跳的源日志，并由负责团队确认疑似原因，再更改生产配置。' },
  ];
  const steps = en ? [
    ['Choose a request', 'Bring a trace ID from a search, availability, or booking issue.'],
    ['Inspect the chain', 'Review service logs and request context for each configured hop.'],
    ['Confirm the cause', 'Compare findings with source evidence and agree on a fix with the owner.'],
  ] : [
    ['选择请求', '准备搜索、查价或预订问题对应的 Trace ID。'],
    ['检查链路', '查看已配置的各服务节点日志及请求上下文。'],
    ['确认原因', '对照源证据，与责任团队确认修复方案。'],
  ];

  return (
    <main className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={en ? route.title : route.titleZh}
        description={en ? route.description : route.descriptionZh}
        jsonLd={[
          webPageSchema(route.path, en ? route.title : route.titleZh, en ? route.description : route.descriptionZh, en ? 'en' : 'zh-CN'),
          softwareApplicationSchema(product, route.path, en ? 'en' : 'zh'),
          breadcrumbSchema([
            { name: en ? 'Home' : '首页', path: '/' },
            { name: en ? 'Products' : '产品', path: '/products' },
            { name: 'Stai API', path: '/products/api' },
            { name: en ? product.nameEn : product.name, path: route.path },
          ]),
          faqSchema(questions),
        ]}
      />
      <header className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-brass mb-4">TraceSight</p>
        <h1 className="text-4xl lg:text-6xl font-display mb-6">
          {en ? 'Investigate distribution requests with session context' : '结合会话上下文排查分销请求'}
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed">
          {en
            ? 'Follow a specific request across configured services, inspect the evidence, and share a reproducible finding with the team responsible for the fix.'
            : '沿已配置的服务追踪具体请求，检查证据，并向负责修复的团队提供可复现的排查结论。'}
        </p>
      </header>

      <section aria-labelledby="workflow-heading" className="mb-20">
        <h2 id="workflow-heading" className="text-3xl font-display mb-8">
          {en ? 'A reviewable investigation' : '可复核的排查流程'}
        </h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {steps.map(([name, detail], index) => (
            <li key={name} className="p-7 border border-line bg-paper-raised rounded-sm">
              <p className="text-brass font-bold mb-3">0{index + 1}</p>
              <h3 className="font-bold text-xl mb-3">{name}</h3>
              <p className="text-ink/65 leading-relaxed">{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <ProductEvaluation
        rows={product.evaluation}
        rowsEn={product.evaluationEn}
        eyebrow="采购视角"
        eyebrowEn="Procurement view"
        title="评估诊断能力时看什么"
        titleEn="What to check when evaluating diagnostics"
        lead="要求用一次真实请求演示追踪范围、可见证据和权限控制。"
        leadEn="Ask for a demonstration using a real request to inspect trace coverage, evidence, and access control."
      />

      <section aria-labelledby="faq-heading" className="my-20 max-w-4xl">
        <h2 id="faq-heading" className="text-3xl font-display mb-8">{en ? 'Frequently asked questions' : '常见问题'}</h2>
        {questions.map(({ q, a }) => (
          <div key={q} className="border-t border-line py-6">
            <h3 className="font-bold text-lg mb-2">{q}</h3>
            <p className="text-ink/65 leading-relaxed">{a}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-4">
        <Link to={localizedPath('/demo', locale)} className="px-7 py-4 bg-ink text-paper font-bold rounded-sm">
          {en ? 'Request a walkthrough' : '申请演示'}
        </Link>
        <Link to={localizedPath('/compare', locale)} className="px-7 py-4 border border-line rounded-sm">
          {en ? 'View evaluation guide' : '查看选型指南'}
        </Link>
      </div>
    </main>
  );
}
