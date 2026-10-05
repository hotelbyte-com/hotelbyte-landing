// Last-modified dates for sitemap <lastmod>, taken from the git history of the
// files that render each route. Vercel builds without .git, so CI runs
// `node scripts/seo-lastmod.mjs --write` before deploying and the build reads
// the snapshot; a local build asks git directly. No date beats a wrong date:
// a route whose sources are unknown gets no <lastmod>.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotFile = path.join(repoRoot, '.seo-lastmod.json');

const ROUTE_SOURCES = [
  [/^\/$/, ['src/pages/Home.tsx', 'src/data/products.ts']],
  [/^\/products$/, ['src/pages/ProductsIndex.tsx', 'src/data/products.ts']],
  [/^\/products\/(retail|api|counselor)$/, ['src/pages/ProductLine.tsx', 'src/data/products.ts']],
  [/^\/products\/ai-distribution$/, ['src/pages/AiDistribution.tsx', 'src/data/products.ts']],
  [/^\/products\/ai-automations$/, ['src/pages/AiAutomations.tsx', 'src/data/products.ts']],
  [/^\/products\/price-intelligence$/, ['src/pages/PriceIntelligence.tsx', 'src/data/products.ts']],
  [/^\/products\/tracesight$/, ['src/pages/TraceSight.tsx', 'src/data/products.ts']],
  [/^\/products\/revenuepilot$/, ['src/pages/RevenuePilot.tsx', 'src/data/products.ts']],
  [/^\/products\/deepseek-appliance$/, ['src/pages/DeepSeekAppliance.tsx', 'src/data/products.ts']],
  [/^\/solutions(\/(dmc|travel-agency))?$/, ['src/pages/SolutionPages.tsx']],
  [/^\/(solutions\/distribution-platforms|guides\/.+|integrations|case-studies)$/, ['src/pages/GrowthPages.tsx']],
  [/^\/services\/consulting$/, ['src/pages/Consulting.tsx']],
  [/^\/compare$/, ['src/pages/Comparison.tsx', 'src/data/procurement.ts']],
  [/^\/about$/, ['src/pages/About.tsx']],
  [/^\/changelog$/, ['src/pages/Changelog.tsx']],
  [/^\/demo$/, ['src/pages/Demo.tsx']],
  [/^\/privacy$/, ['src/pages/PrivacyPolicy.tsx']],
  [/^\/terms$/, ['src/pages/TermsOfService.tsx']],
  [/^\/notices\/.+$/, ['src/pages/PlatformIpRightsNotice.tsx']],
  [/^\/stories$/, ['src/pages/DailyStoriesIndex.tsx', 'src/data/dailyStories.ts']],
];

const allSources = [...new Set(ROUTE_SOURCES.flatMap(([, files]) => files))];

function gitDate(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

function readSnapshot() {
  try {
    return JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
  } catch {
    return null;
  }
}

export function createLastmodResolver() {
  const snapshot = readSnapshot();
  const fileDate = (file) => (snapshot ? snapshot[file] ?? null : gitDate(file));
  const cache = new Map();
  return (route) => {
    if (cache.has(route)) return cache.get(route);
    const files = ROUTE_SOURCES.find(([pattern]) => pattern.test(route))?.[1] ?? [];
    const dates = files.map(fileDate).filter(Boolean).sort();
    const date = dates.at(-1) ?? null;
    cache.set(route, date);
    return date;
  };
}

if (process.argv.includes('--write')) {
  const snapshot = Object.fromEntries(allSources.map((file) => [file, gitDate(file)]).filter(([, date]) => date));
  fs.writeFileSync(snapshotFile, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`seo-lastmod: wrote ${Object.keys(snapshot).length} file dates to ${path.relative(repoRoot, snapshotFile)}`);
}
