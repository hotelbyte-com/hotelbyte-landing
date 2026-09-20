---
doc_id: hotelbyte-landing-agent-entry
tier: T1
status: active
freshness_score: 100
last_verified: 2026-09-20
code_refs: []
spec_refs:
  - hotelbyte-com/hotel-be#31069
compaction_level: L1
compacted_from: null
tags: [agent-guidance, entry, hotelbyte-landing]
---

# hotelbyte-landing Agent Entry

This repository is the HotelByte marketing / landing site
(`github.com/hotelbyte-com/hotelbyte-landing`). It is a separate Git root.
When this tree is opened alone, use this file; do not assume a hotel-be parent
instruction chain is loaded.

## Scope

- Owned: Vite/React landing UI under `src/`, static assets under `public/`, and
  site config (`vite.config.ts`, `vercel.json`, Tailwind/PostCSS).
- Out of scope here: hotel-be API services, portal RBAC, trade/wallet money
  paths, UAT deploy, and Lookout incident ops.

## Working rules

- Prefer small reversible diffs; keep the first viewport brand-led and avoid
  inventing dashboard-style chrome on marketing pages.
- Keep the repository root limited to durable entry points (`README.md` if
  present, `AGENTS.md`, package manifests). Put one-off notes under `docs/`.
- Treat `VITE_*` values as public browser configuration. Never put server
  secrets, Paddle secret keys, or privileged API credentials in this repository
  or its client bundle.

## Module-specific boundaries

When touching any of these surfaces, read the listed files together and keep
every representation aligned; the SEO/build/preview path is one system.

- Runtime routes and pages: `src/App.tsx`, `src/components/Seo.tsx`,
  `src/components/Layout.tsx`, and the page under `src/pages/`.
- SEO and prerender: `src/seo/routes.ts`, `src/seo/schema.ts`,
  `src/seo/headCapture.ts`, `src/prerender-entry.tsx`, `scripts/prerender.mjs`,
  `tailwind.config.js`, `vite.config.ts`, and any redirect/discovery assets.
  Do not add a client route that builds as an empty SPA shell for crawlers;
  if `src/seo/routes.ts` lists a URL, the build must contain that body.
- Daily Stories: `src/data/dailyStories.ts`, the corresponding
  `scripts/verify-daily-stories.mjs`, and the visual at the declared path
  under `public/daily/`. Each entry must keep date, slug, bilingual content,
  seeds, and SVG reference as one coherent unit; do not edit past stories
  incidentally.
- Locale: `src/i18n/index.tsx`, `src/i18n/locale.ts`,
  `scripts/verify-locale.mjs`, `public/llms.txt`, `public/llms-full.txt`.
  Keep user-facing copy and metadata complete in both Chinese and English,
  and preserve the locale storage and document-language behavior. Update
  both locales and the shared SEO sources together.
- Paddle checkout hand-off: `src/pages/PaddlePay.tsx`,
  `scripts/verify-paddle-client-token.mjs`, and `prebuild`. The page opens
  a transaction created by the Portal. Accept only the Portal-created
  transaction identifier, keep redirect allow-listing, and fail closed
  with an explicit status. Do not calculate prices, create transactions,
  or trust amount/product data from URL parameters in this client.
- Presales widget: the public SSE/API consumer in `src/pages/`. API failures
  must remain observable. Do not replace failed or malformed SSE/API
  responses with fabricated answers or a successful lead state. Keep any
  example content explicitly non-live.
- Deployment: `scripts/deploy.sh`, `.github/workflows/vercel-deploy.yml`,
  `vercel.json`. Do not run production deployment commands unless the task
  explicitly includes deployment. Production readiness additionally depends
  on the deployment providing `VITE_PADDLE_CLIENT_TOKEN`, as enforced by
  `prebuild`.

## Verification

Use the package scripts already defined in `package.json`; do not invent a
second toolchain. Report commands actually run and any environment-dependent
gap; a successful local build is not production-route proof.

- Documentation-only changes: `git diff --check`.
- General TypeScript, page, route, SEO, or build changes: `npm run lint`
  and `npm run build`.
- Daily Story changes: `npm run test:daily-stories` and `npm run build`.
- Locale detection changes: `npm run test:locale`, `npm run lint`, and
  `npm run build`.
- Checkout/deployment configuration changes: `npm run build`.

Smallest proving check after UI or build config changes:

```bash
npm ci
npm run build
```

## Code Review Rules

- Flag commits that embed credentials or point the marketing site at private
  internal APIs without an explicit product decision.
- Flag root-level investigation dumps (`SUMMARY.md`, PR drafts, screenshots)
  that belong under `docs/` instead.
- Flag route changes that update only the React router or page component
  while leaving SEO metadata, prerender output, redirects, or discovery
  assets stale. Safe path: update every affected representation and prove
  the generated build contains the route.
- Flag checkout changes that accept client-supplied price/product authority,
  weaken transaction or redirect validation, expose secrets, or turn missing
  configuration into apparent success. Safe path: accept only the
  Portal-created transaction identifier, keep redirect allow-listing, and
  fail closed with an explicit status.
- Flag Daily Story entries with duplicate dates/slugs, missing bilingual
  fields, reused/missing SVGs, or a date inconsistent with the repository's
  Asia/Dubai story boundary. Safe path: add one aligned data entry and
  visual, then run the dedicated verifier.
- Flag locale or public-copy changes that cover only one language or leave
  `lang`, canonical, Open Graph, or JSON-LD metadata inconsistent. Safe
  path: update both locales and the shared SEO sources.
- Flag presales handling that silently swallows protocol/API errors or
  presents fallback text as a live model response. Safe path: surface the
  error state and keep any example content explicitly non-live.
