import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n';
import PreSalesWidget from './presales/PreSalesWidget';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const location = useLocation();

  const navItems = [
    { label: t('nav.products', '产品'), labelEn: 'Products', to: '/products' },
    { label: t('nav.services', '服务'), labelEn: 'Services', to: '/services/consulting' },
    { label: t('nav.compare', '选型指南'), labelEn: 'Evaluation', to: '/compare' },
    { label: t('nav.dailyStories', 'Daily'), labelEn: 'Daily', to: '/stories' },
    { label: t('nav.demo', '在线 Demo'), labelEn: 'Online Demo', to: '/demo' },
    { label: t('nav.about', '关于'), labelEn: 'About', to: '/about' },
  ];

  const externalLinks = [
    { label: t('nav.docs', '开发文档'), labelEn: 'Docs', href: 'https://openapi.hotelbyte.com' },
    { label: t('nav.blog', '技术博客'), labelEn: 'Blog', href: 'https://blog.hotelbyte.com' },
    { label: t('nav.login', '登录'), labelEn: 'Login', href: 'https://portal.hotelbyte.com' },
  ];

  const toggleLocale = () => {
    const next: Locale = locale === 'zh' ? 'en' : 'zh';
    setLocale(next);
  };

  const displayLabel = (item: { label: string; labelEn: string }) => locale === 'zh' ? item.label : item.labelEn;

  const isStoriesActive = location.pathname.startsWith('/stories/');

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-brass/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-sm bg-ink text-paper font-display flex items-center justify-center text-sm" aria-hidden="true">HB</span>
              <span className="font-display text-lg tracking-wide">HotelByte</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => {
                const active = location.pathname === item.to || (item.to === '/stories' && isStoriesActive);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`text-sm pb-0.5 border-b-2 transition-colors ${
                      active
                        ? 'text-ink border-brass'
                        : 'text-ink/55 border-transparent hover:text-ink'
                    }`}
                  >
                    {displayLabel(item)}
                  </Link>
                );
              })}
              {externalLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/55 hover:text-ink transition-colors"
                >
                  {displayLabel(item)}
                </a>
              ))}

              {/* Language Switcher */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink transition-colors px-3 py-1.5 rounded-sm border border-line hover:border-ink/40"
              >
                <Globe className="w-4 h-4" />
                <span>{locale === 'zh' ? 'EN' : '中文'}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-paper border-b border-line overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-medium ${
                        location.pathname === item.to || (item.to === '/stories' && isStoriesActive)
                        ? 'text-brass'
                        : 'text-ink/60'
                    }`}
                  >
                    {displayLabel(item)}
                  </Link>
                ))}
                {externalLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-ink/60"
                  >
                    {displayLabel(item)}
                  </a>
                ))}
                <button
                  onClick={() => { toggleLocale(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-sm font-medium text-ink/60"
                >
                  <Globe className="w-4 h-4" />
                  <span>{locale === 'zh' ? 'Switch to English' : '切换到中文'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* PreSales AI Chat Widget */}
      <PreSalesWidget />

      {/* Footer */}
      <footer className="bg-ink-deep text-paper py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-sm bg-paper text-ink font-display flex items-center justify-center text-sm" aria-hidden="true">HB</span>
              <span className="font-display tracking-wide">HotelByte</span>
            </div>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label={t('footer.aria', locale === 'zh' ? '页脚导航' : 'Footer navigation')}>
              <Link to="/about" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.about', locale === 'zh' ? '关于' : 'About')}
              </Link>
              <Link to="/services/consulting" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.services', locale === 'zh' ? '服务' : 'Services')}
              </Link>
              <Link to="/changelog" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.changelog', locale === 'zh' ? '更新日志' : 'Changelog')}
              </Link>
              <Link to="/privacy" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.privacy', locale === 'zh' ? '隐私政策' : 'Privacy')}
              </Link>
              <Link to="/compare" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.compare', locale === 'zh' ? '选型指南' : 'Evaluation')}
              </Link>
              <Link to="/stories" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.dailyStories', 'Daily')}
              </Link>
              <Link to="/demo" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.demo', locale === 'zh' ? '在线 Demo' : 'Online Demo')}
              </Link>
              <a href="https://openapi.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.docs', locale === 'zh' ? '开发文档' : 'Docs')}
              </a>
              <a href="https://blog.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.blog', locale === 'zh' ? '技术博客' : 'Blog')}
              </a>
              <a href="https://portal.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/55 hover:text-paper transition-colors">
                {t('nav.login', locale === 'zh' ? '登录' : 'Login')}
              </a>
            </nav>
            <a
              href="https://github.com/hotelbyte-com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-paper/55 hover:text-paper transition-colors"
              aria-label="HotelByte on GitHub"
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
              <span>GitHub</span>
            </a>
          </div>
          <div className="border-t border-paper/10 pt-6 text-sm text-paper/45 text-center md:text-left">
            &copy; {new Date().getFullYear()} HotelByte. {locale === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
