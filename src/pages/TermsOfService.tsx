import { FileText, Mail, Scale } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useI18n } from '../i18n';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, webPageSchema } from '../seo/schema';

const effectiveDate = '2026-09-25';

export default function TermsOfService() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.terms;
  const title = isEn ? route.title : route.titleZh;
  const description = isEn ? route.description : route.descriptionZh;
  const path = route.path;
  const breadcrumbs = breadcrumbSchema([
    { name: isEn ? 'Home' : '首页', path: '/' },
    { name: isEn ? 'Terms of Service' : '服务条款', path }
  ]);
  const page = webPageSchema(path, title, description, isEn ? 'en' : 'zh-CN');

  const sections = isEn
    ? [
        {
          h: '1. Agreement and changes',
          p: [
            'These Terms govern your use of hotelbyte.com, the HotelByte platform capabilities exposed to you, the GoTry Session Bridge browser extension, and the GoTry local tools, provided by HotelByte ("we"). By using them you accept these Terms. Material changes are posted on this page with a new effective date; continued use after changes means acceptance.'
          ]
        },
        {
          h: '2. What the services are',
          p: [
            'HotelByte operates a multi-tenant hotel API distribution platform for business customers. The GoTry Session Bridge extension and GoTry local tools are optional convenience components that run on your own equipment and browser, bridging your own signed-in sessions to the platform you are licensed to use.'
          ]
        },
        {
          h: '3. Your responsibilities',
          p: [
            'Use the services only with accounts, credentials, and entitlements that are lawfully yours. You are responsible for complying with the terms of any third-party portal or travel site you sign in to, and for using automated assistance in a manner those terms permit.',
            'Do not use the services to infringe intellectual property, bypass access controls, or violate applicable law. The extension relays data only to your own machine or your licensed HotelByte portal; do not repurpose it to exfiltrate data to third parties.'
          ]
        },
        {
          h: '4. Extension-specific terms',
          p: [
            'The extension handles credential payloads in memory only and discards them after use; we do not warrant uninterrupted capture on third-party portals whose markup or behavior may change at any time. The extension is provided as-is and may be updated or discontinued; you may uninstall it at any time.'
          ]
        },
        {
          h: '5. Fees and payment',
          p: [
            'Platform usage is governed by your commercial agreement with HotelByte. Where checkout is completed through Paddle, Paddle acts as payment processor and its terms apply to the payment itself; our pricing and billing terms apply to the underlying service.'
          ]
        },
        {
          h: '6. Intellectual property',
          p: [
            'HotelByte retains all rights in the platform, API, documentation, architecture, and the GoTry components. These Terms grant a limited, revocable right to use the services for their intended purpose and transfer no ownership. See our public notice on platform rights for the current enforcement position.'
          ]
        },
        {
          h: '7. Warranties, liability, and termination',
          p: [
            'The services are provided without warranties of availability, accuracy of third-party data, or fitness for a particular purpose. To the maximum extent permitted by law, our aggregate liability is limited to the fees you paid in the twelve months preceding the claim. We may suspend or terminate access for breach of these Terms; sections that should survive termination do so.',
            'Questions and notices: support@hotelbyte.com.'
          ]
        }
      ]
    : [
        {
          h: '一、协议与变更',
          p: [
            '本条款适用于你对 hotelbyte.com、HotelByte 向你开放的平期能力、GoTry Session Bridge 浏览器扩展及 GoTry 本地工具的使用，服务由 HotelByte（下称「我们」）提供。使用即视为接受本条款。重大变更将在此页面更新并标注新的生效日期；变更后继续使用视为接受。'
          ]
        },
        {
          h: '二、服务内容',
          p: [
            'HotelByte 运营面向企业客户的多租户酒店 API 分销平台。GoTry Session Bridge 扩展与 GoTry 本地工具是可选的便利组件，运行在你自己的设备与浏览器中，把你自己的登录会话桥接到你所获授权使用的平台。'
          ]
        },
        {
          h: '三、你的责任',
          p: [
            '仅使用你合法拥有的账号、凭据与授权使用本服务。你有责任遵守你所登录的任何第三方门户或差旅网站的条款，并以这些条款允许的方式使用自动化辅助能力。',
            '不得利用本服务侵犯知识产权、绕过访问控制或违反适用法律。扩展仅向你自己的机器或你获授权的 HotelByte 门户回传数据；不得将其改用于向第三方外传数据。'
          ]
        },
        {
          h: '四、扩展专项条款',
          p: [
            '扩展仅在内存中处理凭据载荷，用后即弃；我们不保证第三方门户的页面结构或行为变化后捕获能力持续可用。扩展按「现状」提供，可能更新或停用；你可随时卸载。'
          ]
        },
        {
          h: '五、费用与支付',
          p: [
            '平台使用按你与 HotelByte 的商务协议约定。经 Paddle 完成支付时，Paddle 作为支付服务商、其条款适用于支付环节本身；定价与账务条款适用于底层服务。'
          ]
        },
        {
          h: '六、知识产权',
          p: [
            'HotelByte 保留对平台、API、文档、架构及 GoTry 组件的全部权利。本条款仅授予为预期目的使用服务的有限可撤销许可，不转移任何所有权。关于平台权利的现行立场见公开声明页。'
          ]
        },
        {
          h: '七、保证、责任与终止',
          p: [
            '服务不就可用性、第三方数据准确性或特定用途适用性作任何保证。在法律允许的最大范围内，我们的累计责任以索赔前十二个月内你支付的费用为限。违反本条款时我们可暂停或终止访问；应存续的条款在终止后继续有效。',
            '问题与通知请联系：support@hotelbyte.com。'
          ]
        }
      ];

  return (
    <article className="relative overflow-hidden">
      <Seo
        path={path}
        title={title}
        description={description}
        ogType="article"
        locale={isEn ? 'en' : 'zh-CN'}
        jsonLd={[page, breadcrumbs]}
      />

      <section className="relative px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-line">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(0,240,255,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-ink/55 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-300/10 border border-cyan-300/25 text-cyan-200">
              <Scale className="w-4 h-4" />
              {isEn ? 'Terms of Service' : '服务条款'}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-line">
              {isEn ? 'Effective' : '生效日期'} {effectiveDate}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-display leading-[1.14] mb-6 max-w-4xl">
            {isEn ? 'Terms of Service' : 'HotelByte 服务条款'}
          </h1>
          <p className="text-lg text-ink/72 leading-[1.85] max-w-3xl">
            {isEn
              ? 'The terms under which HotelByte provides hotelbyte.com, the HotelByte platform capabilities licensed to you, and the GoTry Session Bridge extension and local tools. Plain-language summaries; the numbered sections are the operative terms.'
              : 'HotelByte 提供 hotelbyte.com、向你授权的平期能力以及 GoTry Session Bridge 扩展与本地工具的条款。以下为平实语言概述，编号条目为可执行条款。'}
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto space-y-10">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl lg:text-3xl font-display mb-5">{section.h}</h2>
              <div className="space-y-4">
                {section.p.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-ink/72 leading-[1.85]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-sm border border-line bg-paper-raised p-6 lg:p-8 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-cyan-300/80 mt-1 shrink-0" />
              <p className="text-sm text-ink/60 leading-relaxed max-w-xl">
                {isEn
                  ? 'These Terms are provided by HotelByte and do not create obligations for third-party portals you sign in to. For data handling, see our Privacy Policy.'
                  : '本条款由 HotelByte 提供，不对你所登录的第三方门户设定义务。数据处理见隐私政策。'}
              </p>
            </div>
            <a
              href="mailto:support@hotelbyte.com"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-colors"
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
