// Export product knowledge for the presales AI agent (OpenViking sync).
//
// Bundles src/data/products.ts with esbuild (type stripping for pure-data
// TS), then emits public/knowledge-export.json — one chunk per product line
// and per product, per locale — which the hotel-be presales-kb-sync tool
// ingests into OpenViking.
// Run: npm run export:knowledge

import { writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);

// Node >=23.6 strips erasable TS natively; products.ts is pure data.
const mod = await import(pathToFileURL(join(root, 'src', 'data', 'products.ts')).href);
const products = mod.products;
const productLines = mod.productLines;
if (!Array.isArray(products) || products.length === 0) {
  throw new Error('products.ts exported no products');
}
if (!Array.isArray(productLines) || productLines.length === 0) {
  throw new Error('products.ts exported no product lines');
}
const lineName = (key) => productLines.find((line) => line.key === key)?.name ?? key;

function lineChunkContent(line, locale) {
  const zh = locale === 'zh';
  const lines = [];
  lines.push(`# ${line.name} — ${zh ? line.descriptor : line.descriptorEn} (/products/${line.slug})`);
  if (line.earlyAccess) lines.push(zh ? '状态：早期访问，尚未作为生产服务销售。' : 'Status: early access, not yet sold as a production service.');
  lines.push(zh ? line.audience : line.audienceEn);
  lines.push(zh ? line.summary : line.summaryEn);
  lines.push('');
  lines.push(zh ? '## 包含的能力' : "## What's included");
  for (const item of line.highlights) {
    lines.push(`- **${zh ? item.title : item.titleEn}**: ${zh ? item.desc : item.descEn}`);
  }
  const lineProducts = products.filter((p) => p.line === line.key);
  if (lineProducts.length) {
    lines.push('');
    lines.push(zh ? '## 包含的产品' : '## Products in this line');
    for (const p of lineProducts) lines.push(`- ${zh ? p.name : p.nameEn} (/products/${p.slug})`);
  }
  lines.push('');
  lines.push(zh ? '## 边界说明' : '## Scope notes');
  for (const note of zh ? line.scopeNotes : line.scopeNotesEn) lines.push(`- ${note}`);
  return lines.join('\n');
}

function chunkContent(p, locale) {
  const zh = locale === 'zh';
  const lines = [];
  lines.push(`# ${zh ? p.name : p.nameEn} (${p.slug})`);
  lines.push(`${zh ? '产品线' : 'Product line'}: ${lineName(p.line)}`);
  lines.push(zh ? p.tagline : p.taglineEn);
  lines.push(zh ? p.description : p.descriptionEn);
  lines.push('');
  lines.push(zh ? '## 核心价值' : '## Value proposition');
  lines.push(zh ? p.valueProposition : p.valuePropositionEn);
  const tech = zh ? p.techHighlights : p.techHighlightsEn;
  if (tech?.length) {
    lines.push('');
    lines.push(zh ? '## 技术亮点' : '## Technical highlights');
    for (const t of tech) lines.push(`- ${t}`);
  }
  if (p.tiers?.length) {
    lines.push('');
    lines.push(zh ? '## 套餐' : '## Tiers');
    for (const tier of p.tiers) {
      lines.push(
        `- **${zh ? tier.name : tier.nameEn}**: ${zh ? tier.focus : tier.focusEn} — ${
          zh ? tier.description : tier.descriptionEn
        }`
      );
    }
  }
  return lines.join('\n');
}

const chunks = [];
for (const line of productLines) {
  for (const locale of ['zh', 'en']) {
    chunks.push({
      id: `product-lines/${locale}/${line.slug}`,
      locale,
      kind: 'product-line',
      slug: line.slug,
      title: line.name,
      content: lineChunkContent(line, locale),
    });
  }
}
for (const p of products) {
  for (const locale of ['zh', 'en']) {
    chunks.push({
      id: `products/${locale}/${p.slug}`,
      locale,
      kind: 'product',
      slug: p.slug,
      title: locale === 'zh' ? p.name : p.nameEn,
      content: chunkContent(p, locale),
    });
  }
}

const out = {
  schema: 1,
  exportedAt: new Date().toISOString(),
  source: 'src/data/products.ts',
  chunks,
};

const outPath = join(root, 'public', 'knowledge-export.json');
mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`exported ${chunks.length} chunks (${productLines.length} lines + ${products.length} products × zh/en) → ${outPath}`);
