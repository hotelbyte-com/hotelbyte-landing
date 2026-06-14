import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Network, Activity, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { Seo } from '../components/Seo';
import { SITE_ROUTES } from '../seo/routes';
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema
} from '../seo/schema';

const pillars = [
  { key: 'p1', Icon: Sparkles },
  { key: 'p2', Icon: Network },
  { key: 'p3', Icon: Activity }
] as const;

const stats = [
  { key: 's1' },
  { key: 's2' },
  { key: 's3' },
  { key: 's4' }
] as const;

export default function About() {
  const { locale, t } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.about;
  const title = t('about.title', isEn ? 'About HotelByte' : '关于 HotelByte');
  const subtitle = t('about.subtitle', isEn ? route.description : route.descriptionZh);
  const lede = t(
    'about.lede',
    isEn
      ? 'HotelByte is not a property management system and not an OTA channel manager. It is the engineering OS that lets hotel distribution businesses run an AI-Native stack end to end.'
      : 'HotelByte 不是一家酒店 PMS，也不是 OTA 渠道经理，而是一套“工程化操作系统”，为酒店分销企业提供 AI-Native 基础架构。'
  );
  const missionTitle = t('about.mission.title', isEn ? 'Our mission' : '我们的使命');
  const missionBody = t(
    'about.mission.body',
    isEn
      ? 'Help hotel distribution businesses win the next supply-chain reset by running AI-Native: evidence first, then change, with every step auditable.'
      : '让酒店分销企业用 AI-Native 的方式跑赢下一轮供应链重构：先证据、后变更、每一步可审计。'
  );
  const pillarsTitle = t('about.pillars.title', isEn ? 'Three core stances' : '三个核心立场');
  const statsTitle = t('about.stats.title', isEn ? 'Key statistics' : '关键数字');
  const contactTitle = t('about.contact.title', isEn ? 'Contact' : '联系我们');
  const contactBody = t(
    'about.contact.body',
    isEn
      ? 'Reach out for sales briefings, technical interviews, or press inquiries.'
      : '如需销售咨询、技术访谈或媒体合作，可从以下入口联系。'
  );

  const jsonLd = [
    webPageSchema(route.path, title, subtitle, isEn ? 'en' : 'zh-CN'),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', path: '/' },
      { name: title, path: route.path }
    ]),
    organizationSchema()
  ];

  return (
    <div className="pt-12 pb-24 px-6 lg:px-8 max-w-5xl mx-auto">
      <Seo
        path={route.path}
        title={title}
        description={subtitle}
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-6">
          {isEn ? 'About' : '关于'}
        </div>
        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">{subtitle}</p>
      </motion.header>

      {/* Lede */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
        aria-labelledby="about-lede"
      >
        <p className="text-xl lg:text-2xl text-white/80 leading-relaxed text-center max-w-3xl mx-auto font-light">
          {lede}
        </p>
      </motion.section>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 rounded-3xl border border-white/10 bg-white/[0.025] p-8 lg:p-12"
        aria-labelledby="about-mission"
      >
        <div className="flex items-center gap-3 mb-4 text-cyan-glow">
          <Sparkles className="w-5 h-5" />
          <h2 id="about-mission" className="text-sm font-semibold uppercase tracking-wider">
            {missionTitle}
          </h2>
        </div>
        <p className="text-2xl lg:text-3xl font-display font-bold text-white leading-snug">
          {missionBody}
        </p>
      </motion.section>

      {/* Pillars */}
      <section className="mb-20" aria-labelledby="about-pillars">
        <h2 id="about-pillars" className="text-2xl lg:text-3xl font-display font-bold mb-8 text-center">
          {pillarsTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map(({ key, Icon }, idx) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <Icon className="w-6 h-6 text-cyan-glow mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-2">
                {t(`about.pillars.${key}.title`, key === 'p1'
                  ? (isEn ? 'AI-Native' : 'AI-Native')
                  : key === 'p2'
                    ? (isEn ? 'B2B-first' : 'B2B 优先')
                    : (isEn ? 'Native observability' : '原生可观测性'))}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {t(`about.pillars.${key}.body`, key === 'p1'
                  ? (isEn ? 'LLM orchestration, federated queries, and self-evolving agents integrated from day zero.' : 'LLM 编排、联邦查询、自进化智能体从 Day-0 集成。')
                  : key === 'p2'
                    ? (isEn ? '4-tier entity model with multi-currency credit management and granular RBAC.' : '四级实体架构 + 多币种信用管理 + 细粒度 RBAC。')
                    : (isEn ? 'Session-level tracing folds the four-party ecosystem into one evidence chain, cutting troubleshooting from hours to minutes.' : '会话级追踪串起四方证据链，故障排查从小时级压缩到分钟级。'))}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20" aria-labelledby="about-stats">
        <h2 id="about-stats" className="text-2xl lg:text-3xl font-display font-bold mb-8 text-center">
          {statsTitle}
        </h2>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ key }) => (
            <div
              key={key}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.025] text-center"
            >
              <dt className="text-xs text-white/50 uppercase tracking-wider mb-2">
                {t(`about.stats.${key}.label`, key === 's1'
                  ? (isEn ? 'Pre-integrated suppliers' : '预集成供应商')
                  : key === 's2'
                    ? (isEn ? 'Average implementation cycle' : '平均实施周期')
                    : key === 's3'
                      ? (isEn ? 'Troubleshooting speedup' : '排障提速')
                      : (isEn ? 'Cost advantage vs legacy platforms' : '成本优势 vs 传统分销平台'))}
              </dt>
              <dd className="text-3xl lg:text-4xl font-display font-bold text-cyan-glow">
                {t(`about.stats.${key}.value`, key === 's1' ? '27+'
                  : key === 's2' ? (isEn ? '2-4 weeks' : '2-4 周')
                  : key === 's3' ? '24×'
                  : '10×')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-cyan-glow/[0.04] p-8 lg:p-12"
        aria-labelledby="about-contact"
      >
        <h2 id="about-contact" className="text-2xl font-display font-bold mb-4">
          {contactTitle}
        </h2>
        <p className="text-white/70 mb-8 max-w-2xl">{contactBody}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/compare"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow transition-colors"
          >
            <Mail className="w-4 h-4" />
            {t('about.contact.sales', isEn ? 'Contact sales' : '联系销售')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/hotelbyte-com/hotelbyte-landing/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.82 1.18 3.07 0 4.4-2.68 5.36-5.24 5.65.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            {t('about.contact.github', isEn ? 'Open a GitHub issue' : '在 GitHub 提 issue')}
          </a>
          <a
            href="https://blog.hotelbyte.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {t('about.contact.blog', isEn ? 'Read the engineering blog' : '阅读工程博客')}
          </a>
        </div>
      </motion.section>
    </div>
  );
}
