import { motion } from 'framer-motion';
import { useI18n } from '../i18n';
import type { EvaluationRow } from '../data/products';

interface ProductEvaluationProps {
  rows?: EvaluationRow[];
  rowsEn?: EvaluationRow[];
  eyebrow: string;
  eyebrowEn: string;
  title: string;
  titleEn: string;
  lead: string;
  leadEn: string;
}

/**
 * Vendor-neutral evaluation block for product pages: what to interrogate,
 * what we do, and how the buyer proves it. Replaces named competitor
 * scorecards that made claims we could not substantiate.
 */
export default function ProductEvaluation({
  rows,
  rowsEn,
  eyebrow,
  eyebrowEn,
  title,
  titleEn,
  lead,
  leadEn,
}: ProductEvaluationProps) {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const list = (isEn ? rowsEn : rows) ?? [];

  if (list.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-32 border-t-2 border-ink pt-10"
    >
      <div className="max-w-2xl mb-12">
        <p className="eyebrow mb-5">{isEn ? eyebrowEn : eyebrow}</p>
        <h2 className="font-display text-3xl mb-4">{isEn ? titleEn : title}</h2>
        <p className="text-ink/60 leading-relaxed">{isEn ? leadEn : lead}</p>
      </div>

      <div className="space-y-10">
        {list.map((row, idx) => (
          <div key={idx} className="border-t border-line pt-6 grid lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-3">
                {isEn ? 'What to check' : '看什么'}
              </div>
              <h3 className="text-lg text-ink leading-snug">{row.check}</h3>
            </div>
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-3">
                {isEn ? 'What we do' : '我们怎么做'}
              </div>
              <p className="text-sm text-ink/80 leading-relaxed">{row.ours}</p>
            </div>
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-3">
                {isEn ? 'How to verify' : '怎么验证'}
              </div>
              <div className="border-l-2 border-brass pl-4">
                <p className="text-sm text-ink/80 leading-relaxed">{row.verify}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
