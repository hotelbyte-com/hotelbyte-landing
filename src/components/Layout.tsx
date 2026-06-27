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
    { label: t('nav.compare', '竞品对比'), labelEn: 'Compare', to: '/compare' },
    { label: t('nav.dailyStories', 'Daily'), labelEn: 'Daily', to: '/stories' },
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

  return (
    <div className="min-h-screen bg-abyss-blue text-white font-sans selection:bg-cyan-glow/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-abyss-blue/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-electric-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">HB</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">HotelByte</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.to || (item.to === '/stories' && location.pathname.startsWith('/stories/'))
                      ? 'text-cyan-glow'
                      : 'text-white/60 hover:text-white'
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
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  {displayLabel(item)}
                </a>
              ))}

              {/* Language Switcher */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20"
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
              className="md:hidden bg-abyss-blue/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm font-medium ${
                        location.pathname === item.to || (item.to === '/stories' && location.pathname.startsWith('/stories/'))
                        ? 'text-cyan-glow'
                        : 'text-white/60'
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
                    className="block text-sm font-medium text-white/60"
                  >
                    {displayLabel(item)}
                  </a>
                ))}
                <button
                  onClick={() => { toggleLocale(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-sm font-medium text-white/60"
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
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-electric-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">HB</span>
              </div>
              <span className="font-display font-bold">HotelByte</span>
            </div>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label={t('footer.aria', locale === 'zh' ? '页脚导航' : 'Footer navigation')}>
              <Link to="/about" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.about', locale === 'zh' ? '关于' : 'About')}
              </Link>
              <Link to="/services/consulting" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.services', locale === 'zh' ? '服务' : 'Services')}
              </Link>
              <Link to="/changelog" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.changelog', locale === 'zh' ? '更新日志' : 'Changelog')}
              </Link>
              <Link to="/compare" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.compare', locale === 'zh' ? '竞品对比' : 'Compare')}
              </Link>
              <Link to="/stories" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.dailyStories', 'Daily')}
              </Link>
              <a href="https://openapi.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.docs', locale === 'zh' ? '开发文档' : 'Docs')}
              </a>
              <a href="https://blog.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.blog', locale === 'zh' ? '技术博客' : 'Blog')}
              </a>
              <a href="https://portal.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                {t('nav.login', locale === 'zh' ? '登录' : 'Login')}
              </a>
            </nav>
            <a
              href="https://github.com/hotelbyte-com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
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
          <div className="text-sm text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} HotelByte. {locale === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
