import { AlertTriangle, Building2, FileText, Mail, Scale, ShieldCheck } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useI18n } from '../i18n';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, webPageSchema } from '../seo/schema';

const noticeDate = '2026-07-02';

export default function PlatformIpRightsNotice() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.platformIpNotice;
  const title = isEn ? route.title : route.titleZh;
  const description = isEn ? route.description : route.descriptionZh;
  const path = route.path;
  const breadcrumbs = breadcrumbSchema([
    { name: isEn ? 'Home' : '首页', path: '/' },
    { name: isEn ? 'Public Notices' : '公开声明', path: '/notices/hotelbyte-platform-ip-rights' },
    { name: title, path }
  ]);
  const page = webPageSchema(path, title, description, isEn ? 'en' : 'zh-CN');

  const facts = isEn
    ? [
        'HotelByte.com built and operates a multi-tenant hotel API distribution platform, including the HotelByte API, website, technical architecture, supplier integrations, operational workflows, and related documentation.',
        'Benjamin / TTDBooking was an early tenant onboarded to the HotelByte platform. The authorization was limited to tenant use of HotelByte API and website capabilities, and to sharing HotelByte API documentation with external partners for legitimate integration cooperation during the valid tenant relationship.',
        'Due to long-overdue and unpaid technical service fees owed to HotelByte.com, HotelByte has terminated cooperation with Benjamin / TTDBooking.',
        'HotelByte has become aware that Benjamin / TTDBooking represented to partners, without prior communication or authorization from HotelByte, that the HotelByte team had been replaced while the API documentation, working platform, and technical architecture remained unchanged.'
      ]
    : [
        'HotelByte.com 打造并运营多租户的酒店 API 分销平台，包括 HotelByte API、网站、技术架构、供应商集成、运营工作流以及相关文档。',
        'Benjamin / TTDBooking 是早期入驻 HotelByte 平台的租户。其授权范围限于在有效租户关系内使用 HotelByte API 与网站能力，并基于合法集成合作目的向外部合作伙伴发布 HotelByte API 文档。',
        '由于 Benjamin 长期拖欠 HotelByte.com 技术服务费迟迟未支付，HotelByte 已经终止与 Benjamin / TTDBooking 的合作。',
        'HotelByte 现已知悉，Benjamin / TTDBooking 在未与 HotelByte 事先沟通、且未获得 HotelByte 授权的情况下，向合作伙伴声称 HotelByte 团队被替换，但 API 文档、工作平台和技术架构保持不变。'
      ];

  const warnings = isEn
    ? [
        'TTDBooking does not own HotelByte API, platform, website, technical architecture, supplier integration framework, or related documentation.',
        'If the API and architecture remain the same after termination, continued use, reproduction, operation, disclosure, or provision of those assets may constitute actual infringement and misappropriation of HotelByte intellectual property and platform assets.',
        'HotelByte reserves all rights to pursue legal responsibility, commercial remedies, technical countermeasures, and any other actions necessary to protect its rights and interests.',
        'Partners should carefully distinguish HotelByte official platform assets from any unauthorized representation, copy, continuation, or derivative use by Benjamin / TTDBooking or any team acting on its behalf.'
      ]
    : [
        'TTDBooking 并不拥有 HotelByte API、平台、网站、技术架构、供应商集成框架或相关文档。',
        '在合作终止后，如果 API 与架构仍然完全不变，继续使用、复制、运营、披露或对外提供这些资产，可能构成对 HotelByte 知识产权与平台资产的事实侵权和不当占用。',
        'HotelByte 保留追究法律责任、寻求商业救济、采取技术反制措施，以及为保护自身权利和利益而采取一切必要行动的权利。',
        '请各位合作伙伴审慎甄别 HotelByte 官方平台资产，与 Benjamin / TTDBooking 或其代表团队作出的任何未经授权表述、复制、延续使用或衍生使用。'
      ];

  return (
    <article className="relative overflow-hidden">
      <Seo
        path={path}
        title={title}
        description={description}
        keywords={route.keywords}
        ogType="article"
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={[page, breadcrumbs]}
      />

      <section className="relative px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(0,240,255,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/55 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/10 border border-amber-300/25 text-amber-200">
                <AlertTriangle className="w-4 h-4" />
                {isEn ? 'Public Notice' : '公开声明'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {noticeDate}
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-display font-bold leading-[1.14] mb-6 max-w-4xl">
              {isEn
                ? 'Important Notice on HotelByte Platform Rights and TTDBooking Representations'
                : '关于 HotelByte 平台权利与 TTDBooking 相关表述的重要声明'}
            </h1>
            <p className="text-lg lg:text-xl text-white/68 leading-relaxed max-w-3xl">
              {isEn
                ? 'HotelByte issues this notice to partners to clarify the ownership boundary of the HotelByte API distribution platform and to prevent confusion caused by unauthorized representations after termination of cooperation.'
                : 'HotelByte 发布本声明，是为了向各位合作伙伴澄清 HotelByte 酒店 API 分销平台的权属边界，并防止合作终止后未经授权的表述造成混淆。'}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Building2, label: isEn ? 'Platform owner' : '平台所有方' },
                { icon: FileText, label: isEn ? 'API docs' : 'API 文档' },
                { icon: ShieldCheck, label: isEn ? 'IP rights' : '知识产权' },
                { icon: Scale, label: isEn ? 'Rights reserved' : '保留权利' }
              ].map((item) => (
                <div key={item.label} className="min-h-24 rounded-xl border border-white/10 bg-abyss-blue/70 p-4">
                  <item.icon className="w-5 h-5 text-cyan-glow mb-3" />
                  <div className="text-sm font-bold text-white/80 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {isEn
                ? 'Official clarification is available only through HotelByte-controlled channels, including support@hotelbyte.com.'
                : '任何正式澄清仅以 HotelByte 官方渠道为准，包括 support@hotelbyte.com。'}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-6">
              {isEn ? 'Facts and Authorization Boundary' : '事实与授权边界'}
            </h2>
            <div className="space-y-4">
              {facts.map((fact, index) => (
                <p key={index} className="text-lg text-white/72 leading-[1.85]">
                  {fact}
                </p>
              ))}
            </div>
          </section>

          <section className="border-l-4 border-amber-300/70 pl-6 py-2">
            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-6">
              {isEn ? 'HotelByte Position' : 'HotelByte 立场'}
            </h2>
            <div className="space-y-4">
              {warnings.map((warning, index) => (
                <p key={index} className="text-lg text-white/76 leading-[1.85]">
                  {warning}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-5">
              {isEn ? 'Warning on Commercial Integrity' : '关于商业信誉与商业道德的正告'}
            </h2>
            <p className="text-lg text-white/78 leading-[1.9]">
              {isEn
                ? 'HotelByte also formally warns the relevant parties: business cooperation must be built on commercial credibility, contractual respect, and basic business ethics. Do not act recklessly, do not mislead partners, do not attempt to appropriate platform assets that do not belong to you, and do not treat a tenant authorization as ownership of the underlying platform. HotelByte will not tolerate arbitrary conduct that damages its rights, reputation, customers, partners, or platform security.'
                : 'HotelByte 同时正告有关人员：商业合作必须建立在商业信誉、契约尊重与基本商业道德之上。不要恣意妄为，不要误导合作伙伴，不要试图占用并不属于自己的平台资产，也不要把租户授权包装成对底层平台的所有权。任何损害 HotelByte 权利、声誉、客户、合作伙伴或平台安全的任意行为，HotelByte 都不会坐视。'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-6">
              {isEn ? 'Partner Verification Request' : '合作伙伴甄别提示'}
            </h2>
            <p className="text-lg text-white/72 leading-[1.85] mb-5">
              {isEn
                ? 'Unless separately confirmed in writing by HotelByte through an official @hotelbyte.com channel, partners should not treat any TTDBooking claim about unchanged HotelByte API documentation, platform, or architecture as authorized by HotelByte.'
                : '除非 HotelByte 通过 @hotelbyte.com 官方渠道另行书面确认，请各位合作伙伴不要将任何关于 HotelByte API 文档、平台或架构“保持不变”的 TTDBooking 表述视为 HotelByte 授权。'}
            </p>
            <a
              href="mailto:support@hotelbyte.com"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white text-abyss-blue font-bold hover:bg-cyan-glow transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@hotelbyte.com
            </a>
          </section>
        </div>
      </section>
    </article>
  );
}
