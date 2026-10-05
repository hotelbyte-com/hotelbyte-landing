import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n';
import { basePath, detectBrowserLocale, isFullBodyLocale, isPublishedLocale, isSupportedLocale, localizedPath, pathLocale, publishedLocalesForPath, queryLocale, readSavedLocale } from '../i18n/locale';
import LanguageMenu from './LanguageMenu';
import PreSalesWidget from './presales/PreSalesWidget';
import { getProductBySlug, lineEntries, productLines, productsInLine, type ProductLine } from '../data/products';

type SiteLink = { k: string; en: string; zh: string; to?: string; href?: string };
// A product line in the Products menu: the line page link, its one-line
// descriptor, the entries shown in the header (`links`) and in the footer.
type SiteSection = { head: SiteLink; hintEn: string; hintZh: string; links: SiteLink[]; footerLinks: SiteLink[] };
type SiteGroup = { k: string; en: string; zh: string; links: SiteLink[]; sections?: SiteSection[] };

const productLink = (slug: string): SiteLink => {
  const product = getProductBySlug(slug)!;
  return { k: `product.${slug}`, en: product.nameEn, zh: product.name, to: `/products/${slug}` };
};

const lineSection = (line: ProductLine): SiteSection => ({
  head: { k: `line.${line.key}`, en: line.name, zh: line.name, to: `/products/${line.slug}` },
  hintEn: line.descriptorEn,
  hintZh: line.descriptor,
  links: lineEntries(line).map((entry) => ({ k: entry.key, en: entry.nameEn, zh: entry.name, to: entry.to })),
  footerLinks: productsInLine(line.key).map((product) => productLink(product.slug)),
});

// Nav + footer data. `k` is the i18n key suffix: label lookup is
// t(`nav.link.${k}`, existingLabel) so en/zh render the inline strings and any
// locale with a dictionary entry (ar today) translates in place. Product and
// line labels come from src/data/products.ts so the menu cannot drift from
// the pages it links to.
const siteGroups: SiteGroup[] = [
  {
    k: 'products', en: 'Products', zh: '产品',
    sections: productLines.map(lineSection),
    links: [
      { k: 'allProducts', en: 'All products', zh: '全部产品', to: '/products' },
      { k: 'onlineDemo', en: 'Online demo', zh: '在线演示', to: '/demo' },
    ]
  },
  {
    k: 'solutions', en: 'Solutions', zh: '解决方案', links: [
      { k: 'allSolutions', en: 'All solutions', zh: '全部解决方案', to: '/solutions' },
      { k: 'dmc', en: 'DMCs & ground operators', zh: '地接社', to: '/solutions/dmc' },
      { k: 'travelAgency', en: 'Travel agencies', zh: '旅行社', to: '/solutions/travel-agency' },
      { k: 'distributionPlatforms', en: 'Distribution platforms', zh: '分销平台', to: '/solutions/distribution-platforms' },
      { k: 'consulting', en: 'Consulting', zh: '咨询服务', to: '/services/consulting' },
    ]
  },
  {
    k: 'resources', en: 'Resources', zh: '资源', links: [
      { k: 'distGuide', en: 'Hotel distribution guide', zh: '酒店分销指南', to: '/guides/hotel-distribution' },
      { k: 'sandboxGuide', en: 'Sandbox verification guide', zh: '沙箱验证指南', to: '/guides/sandbox-verification' },
      { k: 'integrations', en: 'Integration directory', zh: '集成目录', to: '/integrations' },
      { k: 'evidence', en: 'Product evidence', zh: '产品验证', to: '/case-studies' },
      { k: 'checklist', en: 'Evaluation checklist', zh: '选型指南', to: '/compare' },
      { k: 'dailyStories', en: 'Daily Stories', zh: '每日故事', to: '/stories' },
      { k: 'devdocs', en: 'Developer docs', zh: '开发文档', href: 'https://openapi.hotelbyte.com' },
      { k: 'blog', en: 'Engineering blog', zh: '技术博客', href: 'https://blog.hotelbyte.com' },
    ]
  },
  {
    k: 'company', en: 'Company', zh: '公司', links: [
      { k: 'about', en: 'About HotelByte', zh: '关于 HotelByte', to: '/about' },
      { k: 'contactSales', en: 'Contact sales', zh: '联系销售', href: 'mailto:sales@hotelbyte.com' },
      { k: 'changelog', en: 'Changelog', zh: '更新日志', to: '/changelog' },
      { k: 'privacy', en: 'Privacy policy', zh: '隐私政策', to: '/privacy' },
      { k: 'terms', en: 'Terms of service', zh: '服务条款', to: '/terms' },
    ]
  },
];

// Tier-2 locales publish localized chrome with English bodies; say so
// in-language so the rollout is explicit, never silent. Routes listed in
// fullBodyRoutes suppress this notice — the body is translated there.
const rolloutNotice: Partial<Record<Locale, string>> = {
  hi: 'यह पेज अभी अंग्रेज़ी में दिखाया जा रहा है — पूरी हिन्दी अनुवाद क्रमिक रूप से आ रही है।',
  es: 'Esta página se muestra en inglés por ahora; la traducción completa al español llegará progresivamente.',
  fr: 'Cette page est affichée en anglais pour l’instant ; la traduction française complète arrive progressivement.',
  ar: 'تُعرض هذه الصفحة بالإنجليزية حاليًا، والترجمة العربية الكاملة تصل تدريجيًا.',
  pt: 'Esta página é exibida em inglês por enquanto; a tradução completa em português chega progressivamente.',
  de: 'Diese Seite wird vorerst auf Englisch angezeigt; die vollständige deutsche Übersetzung folgt schrittweise.',
  tr: 'Bu sayfa şimdilik İngilizce gösteriliyor; eksiksiz Türkçe çeviri aşamalı olarak geliyor.',
  fil: 'Ipapakita muna ang pahinang ito sa Ingles; dahan-dahang dumarating ang kumpletong salin sa Filipino.',
  he: 'עמוד זה מוצג לעת עתה באנגלית; התרגום המלא לעברית יגיע בהדרגה.',
};

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const isZh = locale === 'zh';
  // t(key, fallback): en/zh keep the inline strings; locales with dictionary
  // entries (ar) translate. See dict-ar.ts.
  const label = (item: { k: string; en: string; zh: string }) => t(`nav.link.${item.k}`, isZh ? item.zh : item.en);
  const groupLabel = (group: SiteGroup) => t(`nav.group.${group.k}`, isZh ? group.zh : group.en);
  const pathFor = (path: string) => localizedPath(path, isPublishedLocale(path, locale) ? locale : 'en');
  const publishedLocales = publishedLocalesForPath(location.pathname);

  useEffect(() => {
    if (location.hash) {
      const anchor = document.getElementById(location.hash.slice(1));
      if (anchor) {
        anchor.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  // Deep links without a locale prefix used to ignore the saved preference and
  // the browser language — only "/" redirected. Apply the same detection on
  // every locale-less route so a zh visitor opening a shared /solutions link
  // lands on the Chinese page. An explicit prefix or ?language= handoff wins
  // and is left alone. Crawlers that render JS still report an en navigator
  // language and the unprefixed canonical URL stays the one they index.
  useEffect(() => {
    if (pathLocale(location.pathname)) return;
    if (queryLocale(location.search, location.pathname)) return;
    const saved = readSavedLocale();
    const preferred = saved && isSupportedLocale(saved) ? saved : detectBrowserLocale();
    if (preferred === 'en' || !isPublishedLocale(location.pathname, preferred)) return;
    navigate(`${localizedPath(location.pathname, preferred)}${location.search}${location.hash}`, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

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

  // Line heading: name plus its descriptor (omitted in the footer).
  const renderLine = (section: SiteSection, className: string, hintClassName?: string, onClick?: () => void) => (
    <Link key={section.head.to} to={pathFor(section.head.to!)} onClick={onClick} className={className}
      aria-current={basePath(location.pathname) === section.head.to ? 'page' : undefined}>
      <span className="block">{label(section.head)}</span>
      {hintClassName && <span className={hintClassName}>{t(`nav.hint.${section.head.k}`, isZh ? section.hintZh : section.hintEn)}</span>}
    </Link>
  );

  const languageControl = () => publishedLocales.length > 1 ? (
    <LanguageMenu
      locales={publishedLocales}
      current={locale}
      chooseLabel={t('layout.chooseLanguage', isZh ? '选择语言' : 'Choose language')}
      onChange={changeLocale}
    />
  ) : null;

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-brass/20">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-paper focus:p-3">
        {t('layout.skip', isZh ? '跳转到正文' : 'Skip to content')}
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-5">
            <Link to={pathFor('/')} className="flex items-center gap-3 shrink-0" aria-label={t('layout.home', isZh ? 'HotelByte 首页' : 'HotelByte home')}>
              <span className="w-8 h-8 rounded-sm bg-ink text-paper font-display flex items-center justify-center text-sm" aria-hidden="true">HB</span>
              <span className="font-display text-lg tracking-wide">HotelByte</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-5" aria-label={t('layout.mainNav', isZh ? '主导航' : 'Main navigation')}>
              {siteGroups.map((group) => (
                <details key={`${location.pathname}-${group.en}`} name="desktop-site-nav" className={group.sections ? 'group' : 'relative group'}
                  onKeyDown={(event) => { if (event.key === 'Escape') (event.currentTarget as HTMLDetailsElement).open = false; }}>
                  <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer inline-flex items-center gap-1 py-5 text-sm text-ink/70 hover:text-ink focus-visible:outline-2 focus-visible:outline-brass group-open:text-ink">
                    {groupLabel(group)} <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  {group.sections ? (
                    // Product lines: one column per line, centred under the header.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[min(54rem,calc(100vw-3rem))] max-h-[80vh] overflow-y-auto bg-paper shadow-xl border border-line">
                      <div className="grid grid-cols-3 gap-px bg-line">
                        {group.sections.map((section) => (
                          <div key={section.head.k} className="bg-paper p-3">
                            {renderLine(section, 'block px-3 py-2.5 text-base font-semibold text-ink hover:bg-paper-raised focus-visible:outline-2 focus-visible:outline-brass', 'block mt-0.5 text-xs font-normal text-ink/55')}
                            <div className="mt-1 grid">
                              {section.links.map((item) => renderLink(item, 'block px-3 py-2 text-sm text-ink/70 hover:text-ink hover:bg-paper-raised focus-visible:outline-2 focus-visible:outline-brass'))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line bg-paper-raised px-6 py-3">
                        {group.links.map((item) => renderLink(item, 'text-sm font-medium text-ink/75 hover:text-ink focus-visible:outline-2 focus-visible:outline-brass'))}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-full left-0 w-64 max-h-[75vh] overflow-y-auto bg-paper shadow-xl border border-line p-2">
                      {group.links.map((item) => renderLink(item, 'block px-3 py-2.5 text-sm text-ink/75 hover:text-ink hover:bg-paper-raised focus-visible:outline-2 focus-visible:outline-brass'))}
                    </div>
                  )}
                </details>
              ))}
              <Link to={pathFor('/demo')} className="text-sm font-medium px-4 py-2 rounded-sm bg-ink text-paper hover:bg-ink-deep">
                {t('layout.viewDemo', isZh ? '查看演示' : 'View demo')}
              </Link>
              {languageControl()}
            </nav>

            <button type="button" className="lg:hidden p-2" aria-label={mobileMenuOpen ? t('layout.closeMenu', isZh ? '关闭菜单' : 'Close menu') : t('layout.openMenu', isZh ? '打开菜单' : 'Open menu')}
              aria-expanded={mobileMenuOpen} aria-controls="mobile-site-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav id="mobile-site-menu" aria-label={t('layout.mobileNav', isZh ? '手机导航' : 'Mobile navigation')}
            onKeyDown={(event) => { if (event.key === 'Escape') setMobileMenuOpen(false); }}
            className="lg:hidden bg-paper border-b border-line overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="px-6 py-4 space-y-2">
              {siteGroups.map((group) => (
                <details key={`${location.pathname}-${group.en}`} className="border-b border-line py-2">
                  <summary className="cursor-pointer flex items-center justify-between py-2 text-sm font-semibold">
                    {groupLabel(group)} <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </summary>
                  <div className="pb-2 pl-3 grid gap-1">
                    {group.sections?.map((section) => (
                      <div key={section.head.k} className="py-1">
                        {renderLine(section, 'block py-2 text-sm font-medium text-ink', 'block text-xs font-normal text-ink/55', () => setMobileMenuOpen(false))}
                        <div className="pl-3 grid">
                          {section.links.map((item) => renderLink(item, 'block py-1.5 text-sm text-ink/70', () => setMobileMenuOpen(false)))}
                        </div>
                      </div>
                    ))}
                    {group.links.map((item) => renderLink(item, 'block py-2 text-sm text-ink/70', () => setMobileMenuOpen(false)))}
                  </div>
                </details>
              ))}
              <Link to={pathFor('/demo')} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-semibold text-brass">
                {t('layout.viewDemo', isZh ? '查看演示' : 'View demo')}
              </Link>
              {languageControl()}
            </div>
          </nav>
        )}
      </header>

      {rolloutNotice[locale] && !isFullBodyLocale(locale, location.pathname) && (
        <div className="bg-ink/5 border-b border-line px-6 py-2 text-center text-xs text-ink/60" role="note">
          {rolloutNotice[locale]}
        </div>
      )}

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
                {t('layout.footerTagline', isZh ? '帮助分销平台与旅行商构建可验证的酒店分销工作流。' : 'Hotel distribution workflows for platforms and travel sellers.')}
              </p>
              <a href="mailto:sales@hotelbyte.com" className="inline-block mt-5 text-sm text-paper hover:underline">sales@hotelbyte.com</a>
            </div>
            {siteGroups.map((group) => (
              <nav key={group.en} aria-label={`${groupLabel(group)} ${isZh ? '页脚链接' : 'footer links'}`}>
                <h2 className="text-sm font-semibold mb-4">{groupLabel(group)}</h2>
                <div className="flex flex-col gap-2.5">
                  {group.sections?.map((section) => (
                    <div key={section.head.k} className="flex flex-col gap-2.5">
                      {renderLine(section, 'text-sm text-paper/85 hover:text-paper focus-visible:outline-2 focus-visible:outline-brass')}
                      {section.footerLinks.map((item) => renderLink(item, 'pl-3 text-sm text-paper/55 hover:text-paper focus-visible:outline-2 focus-visible:outline-brass'))}
                    </div>
                  ))}
                  {group.links.map((item) => renderLink(item, 'text-sm text-paper/55 hover:text-paper focus-visible:outline-2 focus-visible:outline-brass'))}
                </div>
              </nav>
            ))}
          </div>
          <div className="border-t border-paper/10 mt-12 pt-6 text-sm text-paper/45 flex flex-wrap justify-between gap-4">
            <span>&copy; {new Date().getFullYear()} HotelByte. {t('layout.rights', isZh ? '保留所有权利。' : 'All rights reserved.')}</span>
            <a href="https://portal.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              {t('layout.customerLogin', isZh ? '客户登录' : 'Customer login')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
