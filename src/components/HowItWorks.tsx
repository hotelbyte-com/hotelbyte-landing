import { motion } from 'framer-motion';
import { useI18n } from '../i18n';

export interface HowItWorksStep {
  name: string;
  text: string;
}

export type HowItWorksProps = {
  /** Optional override of the steps (e.g. product-specific copy). */
  steps?: HowItWorksStep[];
  /** Optional heading override. Defaults to the shared i18n keys. */
  title?: string;
  subtitle?: string;
};

/**
 * AEO content block. Renders the shared "how it works" 3-step card grid.
 * The component emits no JSON-LD on its own — the parent page should call
 * `howToSchema(...)` and pass the resulting payload to <Seo />.
 */
export function HowItWorks({ steps, title, subtitle }: HowItWorksProps) {
  const { t, locale } = useI18n();
  const isEn = locale === 'en';
  const resolvedSteps: HowItWorksStep[] =
    steps ??
    (isEn
      ? [
          { name: t('howto.step1.name'), text: t('howto.step1.text') },
          { name: t('howto.step2.name'), text: t('howto.step2.text') },
          { name: t('howto.step3.name'), text: t('howto.step3.text') }
        ]
      : [
          { name: t('howto.step1.name'), text: t('howto.step1.text') },
          { name: t('howto.step2.name'), text: t('howto.step2.text') },
          { name: t('howto.step3.name'), text: t('howto.step3.text') }
        ]);
  const resolvedTitle = title ?? t('howto.title');
  const resolvedSubtitle = subtitle ?? t('howto.subtitle');

  return (
    <section className="py-20 relative bg-black/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-4">
            {isEn ? 'How it works' : '工作原理'}
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">{resolvedTitle}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">{resolvedSubtitle}</p>
        </div>
        <ol className="grid md:grid-cols-3 gap-6">
          {resolvedSteps.map((step, idx) => (
            <motion.li
              key={`${step.name}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-cyan-glow text-abyss-blue text-sm font-bold flex items-center justify-center">
                {idx + 1}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{step.name}</h3>
              <p className="text-white/65 leading-relaxed text-sm">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
