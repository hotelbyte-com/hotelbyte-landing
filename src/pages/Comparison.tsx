import { motion } from 'framer-motion';
import { Check, X, ArrowRight, ExternalLink } from 'lucide-react';
import { competitors, comparisonDimensions, hotelbyteAdvantages } from '../data/competitors';
import { useI18n } from '../i18n';

export default function Comparison() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  // Show first 5 competitors in table (fits better), all in cards
  const tableCompetitors = competitors.slice(0, 5);
  const colCount = 2 + tableCompetitors.length;

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-medium text-cyan-glow mb-6">
          Competitive Analysis
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          {isEn ? 'Why ' : '为什么选择 '}<span className="text-gradient">HotelByte</span>{isEn ? '?' : '？'}
        </h1>
        <p className="text-lg text-white/60 font-light">
          {isEn 
            ? 'Full comparison with industry leaders. See why more hotel distribution companies are switching to HotelByte.'
            : '我们与行业主流方案的全面对比。看看为什么越来越多的酒店分销企业选择 HotelByte。'}
        </p>
      </motion.div>

      {/* ROI Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16 p-8 rounded-3xl border border-cyan-glow/20 bg-cyan-glow/[0.03] text-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10x', label: isEn ? 'Cost advantage vs. legacy platforms' : 'vs. 传统平台成本优势' },
            { value: '24x', label: isEn ? 'Faster troubleshooting' : '故障排查速度提升' },
            { value: '27+', label: isEn ? 'Suppliers pre-integrated' : '预集成供应商' },
            { value: '2-4w', label: isEn ? 'Average implementation' : '平均实施周期' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-display font-bold text-cyan-glow mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-24 overflow-x-auto"
      >
        <div className="min-w-[1000px]">
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
            {/* Table Header */}
            <div className="grid gap-4 p-6 border-b border-white/10 bg-white/5" style={{ gridTemplateColumns: `minmax(140px, 1fr) minmax(120px, 1fr) repeat(${colCount - 2}, minmax(100px, 1fr))` }}>
              <div className="text-sm font-bold text-white">{isEn ? 'Dimension' : '对比维度'}</div>
              <div className="text-sm font-bold text-cyan-glow">HotelByte</div>
              {tableCompetitors.map(c => (
                <div key={c.name} className="text-sm font-bold text-white/70">{c.name}</div>
              ))}
            </div>

            {/* Table Rows */}
            {comparisonDimensions.map((dim, idx) => (
              <div
                key={dim.name}
                className={`grid gap-4 p-6 ${idx !== comparisonDimensions.length - 1 ? 'border-b border-white/5' : ''}`}
                style={{ gridTemplateColumns: `minmax(140px, 1fr) minmax(120px, 1fr) repeat(${colCount - 2}, minmax(100px, 1fr))` }}
              >
                <div className="text-sm font-medium text-white/80">{isEn ? dim.nameEn : dim.name}</div>
                <div className="text-sm text-cyan-glow">{isEn ? dim.hotelbyteEn : dim.hotelbyte}</div>
                {tableCompetitors.map(c => (
                  <div key={c.name} className="text-sm text-white/50">
                    {isEn ? dim.competitorsEn[c.name] : dim.competitors[c.name]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* HotelByte Advantages */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            {isEn ? 'Core Advantages' : '核心优势'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {isEn 
              ? 'These are not checkboxes on a feature list. They are the differentiated DNA built into HotelByte from day one.'
              : '这些不是功能列表上的勾选框，而是 HotelByte 从架构设计之初就确立的差异化基因。'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelbyteAdvantages.map((adv, idx) => (
            <motion.div
              key={isEn ? adv.titleEn : adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-glow/30 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-glow/10 flex items-center justify-center mb-6">
                <Check className="w-5 h-5 text-cyan-glow" />
              </div>
              <h3 className="text-xl font-bold mb-4">{isEn ? adv.titleEn : adv.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{isEn ? adv.descEn : adv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitor Deep Dives */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            {isEn ? 'Competitor Deep Dives' : '竞品详解'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {isEn 
              ? 'Understand each competitor\'s positioning and limitations, and how HotelByte fills these gaps.'
              : '了解每个竞争对手的定位与局限，以及 HotelByte 如何填补这些空白。'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {competitors.map((comp, idx) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">{comp.name}</h3>
                  <div className="text-sm text-white/50">{isEn ? comp.typeEn : comp.type}</div>
                </div>
                <a href={comp.website} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="mb-6">
                <div className="text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">
                  {isEn ? 'Strengths' : '优势'}
                </div>
                <ul className="space-y-2">
                  {(isEn ? comp.strengthsEn : comp.strengths).map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">
                  {isEn ? 'Weaknesses vs. HotelByte' : '相对 HotelByte 的不足'}
                </div>
                <ul className="space-y-2">
                  {(isEn ? comp.weaknessesEn : comp.weaknesses).map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Migration CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-12 rounded-3xl border border-cyan-glow/30 bg-cyan-glow/[0.03]"
      >
        <h2 className="text-3xl font-display font-bold mb-4">
          {isEn ? 'Ready to Switch?' : '准备切换？'}
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          {isEn 
            ? 'Our technical team has helped dozens of enterprises migrate smoothly from legacy platforms. Average migration cycle: just 2-4 weeks.'
            : '我们的技术团队已帮助数十家企业从传统平台平滑迁移至 HotelByte。平均迁移周期仅需 2-4 周。'}
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-glow to-electric-purple text-white font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-shadow">
          {isEn ? 'Contact Migration Advisor' : '联系迁移顾问'} <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
