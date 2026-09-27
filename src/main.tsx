import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { I18nProvider } from './i18n'
import './index.css'
import App from './App.tsx'

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
