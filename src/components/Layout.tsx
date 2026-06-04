import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const location = useLocation();

  const navItems = [
    { label: t('nav.products', '产品'), labelEn: 'Products', to: '/products' },
    { label: t('nav.compare', '竞品对比'), labelEn: 'Compare', to: '/compare' },
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
                    location.pathname === item.to
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
                      location.pathname === item.to
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

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-electric-purple flex items-center justify-center">
              <span className="text-white font-bold text-sm">HB</span>
            </div>
            <span className="font-display font-bold">HotelByte</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://openapi.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              {t('nav.docs', '开发文档')}
            </a>
            <a href="https://blog.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              {t('nav.blog', '技术博客')}
            </a>
            <a href="https://portal.hotelbyte.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              {t('nav.login', '登录')}
            </a>
          </div>
          <div className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} HotelByte. {locale === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}
