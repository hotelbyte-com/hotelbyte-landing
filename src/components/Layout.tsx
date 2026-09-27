import { useState } from 'react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n';
import { basePath, isPublishedLocale, localizedPath, publishedLocalesForPath } from '../i18n/locale';
import PreSalesWidget from './presales/PreSalesWidget';

type SiteLink = { en: string; zh: string; to?: string; href?: string };
type SiteGroup = { en: string; zh: string; links: SiteLink[] };

const siteGroups: SiteGroup[] = [
  {
    en: 'Solutions', zh: '解决方案', links: [
      { en: 'Distribution platforms', zh: '分销平台', to: '/solutions/distribution-platforms' },
      { en: 'Travel sellers', zh: '旅行商', to: '/solutions/travel-sellers' },
      { en: 'Consulting', zh: '咨询服务', to: '/services/consulting' },
    ]
  },
  {
    en: 'Products', zh: '产品', links: [
      { en: 'All products', zh: '全部产品', to: '/products' },
      { en: 'B2B distribution', zh: 'B2B 分销底座', to: '/products/b2b-distribution' },
      { en: 'Price intelligence', zh: '价格情报', to: '/products/price-intelligence' },
      { en: 'TraceSight diagnostics', zh: 'TraceSight 诊断', to: '/products/tracesight' },
      { en: 'RevenuePilot', zh: 'RevenuePilot', to: '/products/revenuepilot' },
      { en: 'AI automations', zh: 'AI 自动化', to: '/products/ai-automations' },
      { en: 'Private AI deployment evaluation', zh: '私有 AI 部署评估', to: '/products/deepseek-appliance' },
      { en: 'Online demo', zh: '在线演示', to: '/demo' },
    ]
  },
  {
    en: 'Resources', zh: '资源', links: [
      { en: 'Hotel distribution guide', zh: '酒店分销指南', to: '/guides/hotel-distribution' },
      { en: 'Integration directory', zh: '集成目录', to: '/integrations' },
      { en: 'Case studies', zh: '案例', to: '/case-studies' },
      { en: 'Evaluation checklist', zh: '选型指南', to: '/compare' },
      { en: 'Daily Stories', zh: '每日故事', to: '/stories' },
      { en: 'Developer docs', zh: '开发文档', href: 'https://openapi.hotelbyte.com' },
      { en: 'Engineering blog', zh: '技术博客', href: 'https://blog.hotelbyte.com' },
    ]
  },
  {
    en: 'Company', zh: '公司', links: [
      { en: 'About HotelByte', zh: '关于 HotelByte', to: '/about' },
      { en: 'Contact sales', zh: '联系销售', href: 'mailto:sales@hotelbyte.com' },
      { en: 'Changelog', zh: '更新日志', to: '/changelog' },
      { en: 'Privacy policy', zh: '隐私政策', to: '/privacy' },
      { en: 'Terms of service', zh: '服务条款', to: '/terms' },
    ]
  },
];

const languageNames: Record<Locale, string> = {
  en: 'English', zh: '中文'
};

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const isZh = locale === 'zh';
  const label = (item: { en: string; zh: string }) => isZh ? item.zh : item.en;
  const pathFor = (path: string) => localizedPath(path, isPublishedLocale(path, locale) ? locale : 'en');
  const publishedLocales = publishedLocalesForPath(location.pathname);

  const changeLocale = (next: Locale) => {
    if (!publishedLocales.includes(next)) return;
    setLocale(next);
    navigate(`${localizedPath(location.pathname, next)}${location.search}${location.hash}`);
    setMobileMenuOpen(false);
  };

  const renderLink = (item: SiteLink, className: string, onClick?: () => void) => item.to ? (
    <Link key={item.to} to={pathFor(item.to)} onClick={onClick} className={className}
      aria-current={basePath(location.pathname) === item.to ? 'page' : undefined}>{label(item)}</Link>
  ) : (
    <a key={item.href} href={item.href} onClick={onClick} className={className}
      target={item.href?.startsWith('https:') ? '_blank' : undefined}
      rel={item.href?.startsWith('https:') ? 'noopener noreferrer' : undefined}>{label(item)}</a>
  );

  const languageControl = (id: string) => publishedLocales.length > 1 ? (
    <label className="inline-flex items-center gap-2 text-sm text-ink/65">
      <Globe className="w-4 h-4" aria-hidden="true" />
      <span className="sr-only">{isZh ? '选择语言' : 'Choose language'}</span>
      <select id={id} aria-label={isZh ? '选择语言' : 'Choose language'} value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        className="bg-paper border border-line rounded-sm px-2 py-1.5 text-ink focus-visible:outline-2 focus-visible:outline-brass">
        {publishedLocales.map((code) => <option value={code} key={code}>{languageNames[code]}</option>)}
      </select>
    </label>
  ) : null;

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-brass/20">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-paper focus:p-3">
        {isZh ? '跳转到正文' : 'Skip to content'}
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-5">
            <Link to={pathFor('/')} className="flex items-center gap-3 shrink-0" aria-label={isZh ? 'HotelByte 首页' : 'HotelByte home'}>
              <span className="w-8 h-8 rounded-sm bg-ink text-paper font-display flex items-center justify-center text-sm" aria-hidden="true">HB</span>
              <span className="font-display text-lg tracking-wide">HotelByte</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-5" aria-label={isZh ? '主导航' : 'Main navigation'}>
              {siteGroups.map((group) => (
                <details key={`${location.pathname}-${group.en}`} name="desktop-site-nav" className="relative group"
                  onKeyDown={(event) => { if (event.key === 'Escape') (event.currentTarget as HTMLDetailsElement).open = false; }}>
                  <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer inline-flex items-center gap-1 py-5 text-sm text-ink/70 hover:text-ink focus-visible:outline-2 focus-visible:outline-brass group-open:text-ink">
                    {label(group)} <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="absolute top-full left-0 w-64 max-h-[75vh] overflow-y-auto bg-paper shadow-xl border border-line p-2">
                    {group.links.map((item) => renderLink(item, 'block px-3 py-2.5 text-sm text-ink/75 hover:text-ink hover:bg-paper-raised focus-visible:outline-2 focus-visible:outline-brass'))}
                  </div>
                </details>
              ))}
              <Link to={pathFor('/demo')} className="text-sm font-medium px-4 py-2 rounded-sm bg-ink text-paper hover:bg-ink-deep">
                {isZh ? '查看演示' : 'View demo'}
              </Link>
              {languageControl('desktop-language')}
            </nav>

            <button type="button" className="lg:hidden p-2" aria-label={mobileMenuOpen ? (isZh ? '关闭菜单' : 'Close menu') : (isZh ? '打开菜单' : 'Open menu')}
              aria-expanded={mobileMenuOpen} aria-controls="mobile-site-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav id="mobile-site-menu" aria-label={isZh ? '手机导航' : 'Mobile navigation'}
            onKeyDown={(event) => { if (event.key === 'Escape') setMobileMenuOpen(false); }}
            className="lg:hidden bg-paper border-b border-line overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="px-6 py-4 space-y-2">
              {siteGroups.map((group) => (
                <details key={`${location.pathname}-${group.en}`} className="border-b border-line py-2">
                  <summary className="cursor-pointer flex items-center justify-between py-2 text-sm font-semibold">
                    {label(group)} <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </summary>
                  <div className="pb-2 pl-3 grid gap-1">
                    {group.links.map((item) => renderLink(item, 'block py-2 text-sm text-ink/70', () => setMobileMenuOpen(false)))}
                  </div>
                </details>
              ))}
              <Link to={pathFor('/demo')} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-semibold text-brass">
                {isZh ? '查看演示' : 'View demo'}
              </Link>
              {languageControl('mobile-language')}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="pt-16"><Outlet /></main>
      <PreSalesWidget />

      <footer className="bg-ink-deep text-paper py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(4,1fr)]">
            <div>
              <Link to={pathFor('/')} className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-sm bg-paper text-ink font-display flex items-center justify-center text-sm" aria-hidden="true">HB</span>
                <span className="font-display tracking-wide">HotelByte</span>
              </Link>
              <p className="text-sm text-paper/55 leading-relaxed max-w-xs">
                {isZh ? '帮助分销平台与旅行商构建可验证的酒店分销工作流。' : 'Hotel distribution workflows for platforms and travel sellers.'}
              </p>
              <a href="mailto:sales@hotelbyte.com" className="inline-block mt-5 text-sm text-paper hover:underline">sales@hotelbyte.com</a>
            </div>
            {siteGroups.map((group) => (
              <nav key={group.en} aria-label={`${label(group)} ${isZh ? '页脚链接' : 'footer links'}`}>
                <h2 className="text-sm font-semibold mb-4">{label(group)}</h2>
                <div className="flex flex-col gap-2.5">
                  {group.links.map((item) => renderLink(item, 'text-sm text-paper/55 hover:text-paper focus-visible:outline-2 focus-visible:outline-brass'))}
                </div>
              </nav>
            ))}
          </div>
          <div className="border-t border-paper/10 mt-12 pt-6 text-sm text-paper/45 flex flex-wrap justify-between gap-4">
            <span>&copy; {new Date().getFullYear()} HotelByte. {isZh ? '保留所有权利。' : 'All rights reserved.'}</span>
            <a href="https://portal.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              {isZh ? '客户登录' : 'Customer login'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
