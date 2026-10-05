import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { I18nProvider } from './i18n'
import { preloadDictionary } from './i18n/dictionaries'
import { pathLocale, queryLocale } from './i18n/locale'
import './index.css'
import './analytics'
import App, { preloadRoute } from './App.tsx'
import { installIntentPreload } from './intentPreload'

function mount() {
  // Prerender puts crawlable metadata in the HTML. Helmet owns the live head
  // after the client starts; remove the static copies before it mounts.
  document.querySelectorAll('head title, head meta[name="description"], head meta[name="robots"], head link[rel="canonical"], head link[rel="alternate"], head meta[property^="og:"], head meta[name^="twitter:"], head script[type="application/ld+json"]').forEach((node) => node.remove())

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <I18nProvider>
            <App />
          </I18nProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>,
  )
}

// Pages are code-split: fetch the chunk (and story body) for the current URL
// before the first render, so the prerendered page stays on screen until the
// React tree can replace it without a loading state. If the fetch fails the
// prerendered page and its head are left untouched; its links are plain anchors.
const { pathname, search } = window.location
Promise.all([
  preloadRoute(pathname),
  preloadDictionary(pathLocale(pathname) ?? queryLocale(search, pathname)),
]).then(mount, (error: unknown) => {
  console.error('Could not load this page\'s script; leaving the prerendered page in place.', error)
})
installIntentPreload()
