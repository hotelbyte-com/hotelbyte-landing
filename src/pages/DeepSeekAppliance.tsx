import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Database, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, faqSchema, webPageSchema } from '../seo/schema';

export default function DeepSeekAppliance() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const pick = (zh: string, en: string) => (isEn ? en : zh);
  const route = SITE_ROUTES.deepseekAppliance;
  const title = pick('私有化 AI 部署评估', 'Private AI Deployment Evaluation');
  const description = pick(
    '围绕酒店分销场景评估私有化 AI 的模型、硬件、数据治理和工作流；具体配置与交付条件需在目标环境验证。',
    'Evaluate models, hardware, data governance and workflows for on-premises AI in hotel distribution. Validate configuration and delivery in the target environment.'
  );
  const questions = isEn
    ? [
        { q: 'Which models and hardware are supported?', a: 'Compatibility depends on the selected model, inference runtime and target device. Request a timed test on the hardware you intend to use.' },
        { q: 'Does on-premises deployment satisfy our compliance requirements?', a: 'Data residency alone does not establish compliance. Review network paths, access controls, logs, retention and your applicable requirements during a technical assessment.' },
        { q: 'How long does deployment take?', a: 'Timing depends on hardware procurement, model validation, data integration and security review. Agree an acceptance plan and milestones in writing.' }
      ]
    : [
        { q: '支持哪些模型和硬件？', a: '兼容性取决于所选模型、推理运行时和目标设备。请在计划使用的硬件上进行计时测试。' },
        { q: '私有化部署是否满足我们的合规要求？', a: '数据留在本地本身不等于合规。技术评估时应检查网络路径、访问控制、日志、保留期限和适用要求。' },
        { q: '部署需要多久？', a: '时间取决于硬件采购、模型验证、数据集成和安全评审。应以书面形式约定验收计划与里程碑。' }
      ];
  const checks = [
    {
      Icon: Cpu,
      title: pick('模型与硬件', 'Model and hardware'),
      body: pick('在目标设备上记录模型加载、吞吐量、延迟和内存使用；不要用未经复测的规格估算代替验收。', 'Measure model loading, throughput, latency and memory use on the target device. Use these results for acceptance.')
    },
    {
      Icon: Database,
      title: pick('业务数据与工作流', 'Business data and workflows'),
      body: pick('选择一个真实但获批的酒店分销问题，检查知识检索、数据权限和回答来源。', 'Choose an approved distribution question and review retrieval, data permissions and source attribution.')
    },
    {
      Icon: ShieldCheck,
      title: pick('安全与治理', 'Security and governance'),
      body: pick('确认数据流向、访问边界、审计记录与保留策略，再对照您自己的合规要求评估。', 'Review data flows, access boundaries, audit records and retention against your own compliance requirements.')
    }
  ];

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-5xl mx-auto">
      <Seo
        path={route.path}
        title={title}
        description={description}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={[
          webPageSchema(route.path, title, description, isEn ? 'en' : 'zh-CN'),
          breadcrumbSchema([
            { name: pick('首页', 'Home'), path: '/' },
            { name: pick('产品', 'Products'), path: '/products' },
            { name: title, path: route.path }
          ]),
          faqSchema(questions)
        ]}
      />
      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 text-center">
        <p className="eyebrow mb-5">{pick('酒店分销与私有化 AI', 'Hotel distribution and private AI')}</p>
        <h1 className="text-4xl lg:text-6xl font-display mb-6">{title}</h1>
        <p className="text-lg text-ink/65 max-w-3xl mx-auto">{description}</p>
      </motion.header>

      <section className="mb-20" aria-labelledby="private-ai-checks">
        <h2 id="private-ai-checks" className="text-3xl font-display mb-8 text-center">{pick('采购前验证什么', 'What to validate before purchase')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {checks.map(({ Icon, title: checkTitle, body }) => (
            <article key={checkTitle} className="p-7 rounded-sm border border-line bg-paper-raised">
              <Icon className="w-7 h-7 text-brass mb-5" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-3">{checkTitle}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-20" aria-labelledby="private-ai-faq">
        <h2 id="private-ai-faq" className="text-3xl font-display mb-8">{pick('常见问题', 'Common questions')}</h2>
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
        <h2 className="text-3xl font-display mb-4">{pick('讨论您的目标环境', 'Discuss your target environment')}</h2>
        <p className="text-ink/65 mb-7 max-w-2xl mx-auto">{pick('请提供目标模型、硬件、数据来源和验收要求，以便制定可验证的技术方案。', 'Share your target model, hardware, data sources and acceptance requirements for a reviewable technical proposal.')}</p>
        <a href="mailto:sales@hotelbyte.com?subject=Private%20AI%20deployment%20review" className="inline-flex items-center gap-2 px-7 py-4 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-colors">
          {pick('联系技术团队', 'Contact the technical team')} <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </div>
  );
}
