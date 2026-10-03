import { Cookie, Globe, Lock, Mail, Puzzle, ShieldCheck } from 'lucide-react';
import { Seo } from '../components/Seo';
import { useI18n } from '../i18n';
import { SITE_ROUTES } from '../seo/routes';
import { breadcrumbSchema, webPageSchema } from '../seo/schema';

const effectiveDate = '2026-09-25';

export default function PrivacyPolicy() {
  const { locale } = useI18n();
  const isEn = locale === 'en';
  const route = SITE_ROUTES.privacy;
  const title = isEn ? route.title : route.titleZh;
  const description = isEn ? route.description : route.descriptionZh;
  const path = route.path;
  const breadcrumbs = breadcrumbSchema([
    { name: isEn ? 'Home' : '首页', path: '/' },
    { name: isEn ? 'Privacy Policy' : '隐私政策', path }
  ]);
  const page = webPageSchema(path, title, description, isEn ? 'en' : 'zh-CN');

  const scopeItems = isEn
    ? [
        { icon: Globe, text: 'This website (hotelbyte.com), including presales and contact submissions made through it.' },
        { icon: Puzzle, text: 'The GoTry Session Bridge Chrome extension and the GoTry desktop tools that it serves.' },
        { icon: Lock, text: 'Checkout transactions initiated from the HotelByte Portal and completed through Paddle.' }
      ]
    : [
        { icon: Globe, text: '本网站（hotelbyte.com），包括通过本站提交的售前咨询与联系信息。' },
        { icon: Puzzle, text: 'GoTry Session Bridge 浏览器扩展，及其配套的 GoTry 本地工具。' },
        { icon: Lock, text: '由 HotelByte Portal 发起、经 Paddle 完成的支付交易。' }
      ];

  const extensionPractices = isEn
    ? [
        'The extension runs only inside the browser profile you install it in. It never runs on, reads, or transmits data from browser profiles or devices you did not explicitly authorize.',
        'It reads only the names of cookies set by supplier and travel portals, solely to determine whether you are signed in. It never reads, stores, or transmits cookie values.',
        'At your explicit direction (for example, when you run a search), it reads the search-result responses that the page you are signed in to returns, and relays that text to the GoTry instance on your own machine (localhost) or to the HotelByte portal you are signed in to, over a same-origin, token-scoped channel.',
        'For one-tap sign-in, the HotelByte portal can hand the extension a one-time credential payload. That payload exists only in memory, is typed directly into the destination portal login form, and is discarded immediately. It is never stored, logged, or forwarded anywhere else.',
        'The extension does not collect passwords beyond the in-memory fill described above, does not read payment data, does not embed advertising or third-party trackers, and does not sell, rent, or share your data with anyone.'
      ]
    : [
        '扩展只在你安装它的浏览器配置文件内运行，绝不会读取或传输任何你未明确授权的配置文件或设备上的数据。',
        '扩展只读取供应商与差旅门户写入的 Cookie 名称，且仅用于判断「是否已登录」这一事实；从不读取、存储或传输 Cookie 值。',
        '在你明确发起（例如执行一次检索）时，扩展读取你所登录页面自身返回的检索结果响应，并将文本回传给你自己机器上的 GoTry 实例（localhost），或你所登录的 HotelByte 门户（同源、令牌限定作用域的通道）。',
        '免密进入门户时，HotelByte 门户可向扩展投递一次性凭据载荷。该载荷仅存在于内存中，直接填入目标门户登录表单后立即丢弃；从不存储、记录或转发到任何其他位置。',
        '除上述内存态代填外，扩展不收集密码，不读取支付数据，不内嵌广告或第三方追踪器，不出售、出租或向任何第三方共享你的数据。'
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
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-ink/55 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-300/10 border border-cyan-300/25 text-cyan-200">
                <ShieldCheck className="w-4 h-4" />
                {isEn ? 'Privacy Policy' : '隐私政策'}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-paper-raised border border-line">
                {isEn ? 'Effective' : '生效日期'} {effectiveDate}
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-display leading-[1.14] mb-6 max-w-4xl">
              {isEn ? 'Privacy Policy' : 'HotelByte 隐私政策'}
            </h1>
            <p className="text-lg text-ink/72 leading-[1.85] max-w-3xl">
              {isEn
                ? 'This policy explains what data HotelByte (hotelbyte.com) handles across this website, the GoTry Session Bridge browser extension, and the GoTry local tools — where each piece of data goes, how long it lives, and how you can have it removed.'
                : '本政策说明 HotelByte（hotelbyte.com）在本网站、GoTry Session Bridge 浏览器扩展与 GoTry 本地工具范围内处理哪些数据：每一类数据去向何处、保留多久，以及你如何要求删除。'}
            </p>
          </div>

          <div className="rounded-sm border border-line bg-paper-raised p-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/45">
              {isEn ? 'Covers' : '适用范围'}
            </h2>
            {scopeItems.map(({ icon: Icon, text }, index) => (
              <div key={index} className="flex items-start gap-3 text-sm text-ink/72 leading-relaxed">
                <Icon className="w-5 h-5 shrink-0 text-cyan-300/80 mt-0.5" />
                <span>{text}</span>
              </div>
            ))}
            <p className="text-sm text-ink/50 leading-relaxed border-t border-line pt-4">
              {isEn
                ? 'Questions or deletion requests: support@hotelbyte.com.'
                : '疑问或删除请求请联系：support@hotelbyte.com。'}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl lg:text-3xl font-display mb-6">
              {isEn ? 'Website data' : '网站数据'}
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-ink/72 leading-[1.85]">
                {isEn
                  ? 'When you submit the presales or contact form, we receive the details you chose to provide (such as your name, company, email, and message) and use them only to respond to your inquiry. Checkout is processed by Paddle as payment processor; we receive the transaction outcome, not your card details. The site keeps standard server logs for security and operations.'
                  : '你提交售前咨询或联系表单时，我们仅收到你主动填写的信息（如姓名、公司、邮箱与留言），且只用于回复你的咨询。支付由 Paddle 作为支付服务商处理；我们只收到交易结果，不接触你的银行卡信息。本站保留用于安全与运维的标准服务器日志。'}
              </p>
            </div>
          </section>

          <section className="border-l-4 border-cyan-300/70 pl-6 py-2">
            <h2 className="text-2xl lg:text-3xl font-display mb-6 flex items-center gap-3">
              <Puzzle className="w-7 h-7 text-cyan-300/80" />
              {isEn ? 'GoTry Session Bridge extension' : 'GoTry Session Bridge 扩展'}
            </h2>
            <div className="space-y-4">
              {extensionPractices.map((item, index) => (
                <p key={index} className="text-lg text-ink/72 leading-[1.85]">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-sm border border-line bg-paper-raised p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-display mb-5 flex items-center gap-3">
              <Cookie className="w-7 h-7 text-cyan-300/80" />
              {isEn ? 'Retention' : '数据保留'}
            </h2>
            <p className="text-lg text-ink/78 leading-[1.9]">
              {isEn
                ? 'Data handled by the extension lives in memory for the duration of the session and is cleared when the browser restarts; nothing is persisted by the extension itself. Form submissions are kept only as long as needed to respond, unless you ask us to keep a record of the conversation. Server logs are kept for a standard operational window.'
                : '扩展处理的数据仅存活于会话内存，浏览器重启即清空；扩展自身不持久化任何数据。表单提交仅在回复所需期间保留，除非你要求我们留存沟通记录。服务器日志按常规运维周期保留。'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl lg:text-3xl font-display mb-6">
              {isEn ? 'Your choices' : '你的选择'}
            </h2>
            <p className="text-lg text-ink/72 leading-[1.85] mb-5">
              {isEn
                ? 'Uninstalling the extension stops all extension-side collection immediately. For anything held by us — a form submission, a support conversation, a transaction record — write to support@hotelbyte.com and we will access, correct, or delete it as you request.'
                : '卸载扩展即可立即停止扩展侧的一切数据收集。对于由我们持有的内容（表单提交、支持沟通、交易记录），请致函 support@hotelbyte.com，我们将按你的要求提供、更正或删除。'}
            </p>
            <a
              href="mailto:support@hotelbyte.com"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-sm bg-ink text-paper font-bold hover:bg-ink-deep transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@hotelbyte.com
            </a>
          </section>

          <p className="text-sm text-ink/45 leading-relaxed border-t border-line pt-6">
            {isEn
              ? `Effective ${effectiveDate}. Material changes will be posted on this page with a new effective date. This policy is provided by HotelByte; it is not legal advice and does not create obligations for third-party portals you sign in to.`
              : `自 ${effectiveDate} 起生效。重大变更将在此页面更新并标注新的生效日期。本政策由 HotelByte 提供；不构成法律意见，也不对你所登录的第三方门户设定义务。`}
          </p>
        </div>
      </section>
    </article>
  );
}
