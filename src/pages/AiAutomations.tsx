import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import ProductEvaluation from '../components/ProductEvaluation';
import { getProductBySlug } from '../data/products';
import { useI18n } from '../i18n';
import { localizedPath } from '../i18n/locale';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, faqSchema } from '../seo/schema';

export default function AiAutomations() {
  const { locale } = useI18n();
  const en = locale !== 'zh'; // tier-2 locales render the English body
  const route = SITE_ROUTES.aiAutomations;
  const product = getProductBySlug('ai-automations')!;
  const questions = en ? [
    { q: 'How should we evaluate AI automation for hotel distribution?', a: 'Use a real workflow and representative data. Check source permissions, query review, sensitive-field handling, audit records, and a human approval step before any operational change.' },
    { q: 'Which integrations are available?', a: 'Integration scope depends on the existing systems, credentials, and approved use case. Ask HotelByte to demonstrate the requested connector and access controls against your environment.' },
  ] : [
    { q: '如何评估酒店分销场景的 AI 自动化？', a: '选择真实流程和代表性数据，检查数据源权限、查询复核、敏感字段处理、审计记录，以及执行运营变更前的人工审批。' },
    { q: '可以接入哪些系统？', a: '集成范围取决于现有系统、凭证与获批场景。请让 HotelByte 在您的环境中演示所需连接器与权限控制。' },
  ];
  const checks = en ? [
    ['Access', 'Show the exact data and actions available to each role.'],
    ['Evidence', 'Inspect a query, its source, and the audit trail behind the answer.'],
    ['Control', 'Require a reviewer before any action changes live distribution data.'],
  ] : [
    ['访问权限', '展示每个角色能读取的数据和能执行的操作。'],
    ['结果证据', '检查查询语句、数据来源和答案背后的审计记录。'],
    ['操作控制', '生产分销数据发生变更前应由人员复核。'],
  ];

  return (
    <main className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <Seo
        path={route.path}
        title={en ? route.title : route.titleZh}
        description={en ? route.description : route.descriptionZh}
        jsonLd={[
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
        <p className="text-xs uppercase tracking-[0.2em] text-brass mb-4">AI &amp; automation</p>
        <h1 className="text-4xl lg:text-6xl font-display mb-6">
          {en ? 'Evaluate AI automation in your distribution workflow' : '在分销工作流中评估 AI 自动化'}
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed">
          {en
            ? 'Start with a concrete investigation or repetitive task. Review access, source data, outputs, and the approval path together before expanding the scope.'
            : '从一项具体的数据调查或重复任务开始，共同检查访问权限、数据来源、输出结果和审批路径，再决定是否扩大范围。'}
        </p>
      </header>

      <section aria-labelledby="evaluation-heading" className="mb-20">
        <h2 id="evaluation-heading" className="text-3xl font-display mb-8">
          {en ? 'Three questions for a useful pilot' : '试点需要回答的三个问题'}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {checks.map(([title, detail]) => (
            <article key={title} className="p-7 border border-line bg-paper-raised rounded-sm">
              <h3 className="font-bold text-xl mb-3">{title}</h3>
              <p className="text-ink/65 leading-relaxed">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductEvaluation
        rows={product.evaluation}
        rowsEn={product.evaluationEn}
        eyebrow="采购视角"
        eyebrowEn="Procurement view"
        title="评估 AI 自动化时看什么"
        titleEn="What to check when evaluating AI automation"
        lead="要求供应商用您的真实数据和权限模型演示，并提供可供复核的结果。"
        leadEn="Ask for a demonstration using your data and permission model, with outputs your team can review."
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
          {en ? 'Discuss a pilot' : '沟通试点'}
        </Link>
        <Link to={localizedPath('/compare', locale)} className="px-7 py-4 border border-line rounded-sm">
          {en ? 'View evaluation guide' : '查看选型指南'}
        </Link>
      </div>
    </main>
  );
}
