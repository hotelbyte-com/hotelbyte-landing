# HotelByte Public Site Guidance

## Responsibility

This repository owns the public `hotelbyte.com` React/Vite site: product and service pages, bilingual presentation and SEO, Daily Stories, the Paddle checkout hand-off, and the public presales widget.

## Read Before Editing

- Start with `package.json` for supported commands and `src/App.tsx` for runtime routes.
- For pages or routes, read `src/seo/routes.ts`, `src/seo/schema.ts`, and `vite/prerender.ts` together.
- For Daily Stories, read `src/data/dailyStories.ts` and `scripts/verify-daily-stories.mjs`; each entry's visual lives at the declared path under `public/daily/`.
- For locale behavior, read `src/i18n/index.tsx`, `src/i18n/locale.ts`, and `scripts/verify-locale.mjs`.
- For checkout work, read `src/pages/PaddlePay.tsx` and `scripts/verify-paddle-client-token.mjs` before changing query parameters, redirects, or environment handling.

## Boundaries

- Keep runtime routing, `SITE_ROUTES`, prerender output, redirects, and public discovery files aligned when a URL changes. Do not add a client route that builds as an empty SPA shell for crawlers.
- Keep user-facing copy and metadata complete in both Chinese and English. Preserve the locale storage and document-language behavior.
- Treat `VITE_*` values as public browser configuration. Never put server secrets, Paddle secret keys, or privileged API credentials in this repository.
- The checkout page opens a Paddle transaction created by the Portal. Do not calculate prices, create transactions, or trust amount/product data from URL parameters in this client.
- Daily Story changes must keep the date, slug, bilingual content, seeds, and SVG reference as one coherent entry. Do not edit past stories incidentally.
- Presales API failures must remain observable. Do not replace failed or malformed SSE/API responses with fabricated answers or a successful lead state.
- Do not run production deployment commands unless the task explicitly includes deployment.

## Smallest Real Verification

- Documentation-only changes: `git diff --check`.
- General TypeScript, page, route, SEO, or build changes: `npm run lint` and `npm run build`.
- Daily Story changes: `npm run test:daily-stories` and `npm run build`.
- Locale detection changes: `npm run test:locale`, `npm run lint`, and `npm run build`.
- Checkout/deployment configuration changes: `npm run build`; production readiness additionally depends on the deployment providing `VITE_PADDLE_CLIENT_TOKEN`, as enforced by `prebuild`.
- Report commands actually run and any environment-dependent gap; a successful local build is not production-route proof.

## Code Review Rules

- Flag route changes that update only the React router or page component while leaving SEO metadata, prerender output, redirects, or discovery assets stale. Safe path: update every affected representation and prove the generated build contains the route.
- Flag checkout changes that accept client-supplied price/product authority, weaken transaction or redirect validation, expose secrets, or turn missing configuration into apparent success. Safe path: accept only the Portal-created transaction identifier, keep redirect allow-listing, and fail closed with an explicit status.
- Flag Daily Story entries with duplicate dates/slugs, missing bilingual fields, reused/missing SVGs, or a date inconsistent with the repository's Asia/Dubai story boundary. Safe path: add one aligned data entry and visual, then run the dedicated verifier.
- Flag locale or public-copy changes that cover only one language or leave `lang`, canonical, Open Graph, or JSON-LD metadata inconsistent. Safe path: update both locales and the shared SEO sources.
- Flag presales handling that silently swallows protocol/API errors or presents fallback text as a live model response. Safe path: surface the error state and keep any example content explicitly non-live.
