---
doc_id: hotelbyte-landing-agent-entry
tier: T1
status: active
freshness_score: 100
last_verified: 2026-08-29
code_refs: []
spec_refs: []
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
- Do not add secrets, API tokens, or customer data to the repo or client bundle.
- Keep the repository root limited to durable entry points (`README.md` if
  present, `AGENTS.md`, package manifests). Put one-off notes under `docs/`.

## Verification

Smallest proving check after UI or build config changes:

```bash
npm ci
npm run build
```

Use the package scripts already defined in `package.json`; do not invent a
second toolchain.

## Code Review Rules

- Flag commits that embed credentials or point the marketing site at private
  internal APIs without an explicit product decision.
- Flag root-level investigation dumps (`SUMMARY.md`, PR drafts, screenshots)
  that belong under `docs/` instead.
