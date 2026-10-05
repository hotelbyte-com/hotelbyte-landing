// Renders the 1200×630 Open Graph cards: the site default (public/og-image.png),
// one per product line and one per product (public/og/<slug>.png). Copy comes
// from src/data/products.ts so cards never drift from the pages.
//
// Needs Chromium and playwright-core, which are deliberately not project
// dependencies — install them ad hoc when the copy changes:
//   npm i --no-save playwright-core
//   CHROMIUM_PATH=/path/to/chrome node scripts/generate-og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = await import('playwright-core');
const { products, productLines } = await import(pathToFileURL(path.join(root, 'src', 'data', 'products.ts')).href);

const fontDir = path.join(root, 'public', 'fonts');
// Inlined as data URIs: a page set via setContent cannot read file:// fonts.
const fontFace = (family, file, weight) => fs.existsSync(path.join(fontDir, file))
  ? `@font-face { font-family: '${family}'; src: url(data:font/woff2;base64,${fs.readFileSync(path.join(fontDir, file)).toString('base64')}) format('woff2'); font-weight: ${weight}; }`
  : '';
const fonts = fs.existsSync(fontDir) ? fs.readdirSync(fontDir) : [];
const pick = (prefix, weight) => fonts.find((f) => f.startsWith(prefix) && f.includes(String(weight)) && f.endsWith('.woff2'))
  ?? fonts.find((f) => f.startsWith(prefix) && f.endsWith('.woff2'));
const faces = [
  pick('marcellus', 400) && fontFace('Marcellus', pick('marcellus', 400), 400),
  pick('schibsted-grotesk', 400) && fontFace('Schibsted Grotesk', pick('schibsted-grotesk', 400), 400),
  pick('schibsted-grotesk', 600) && fontFace('Schibsted Grotesk', pick('schibsted-grotesk', 600), 600),
  pick('spline-sans-mono', 500) && fontFace('Spline Sans Mono', pick('spline-sans-mono', 500), 500),
].filter(Boolean).join('\n');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function card({ eyebrow, title, subtitle, rows = [] }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${faces}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #F2EEE2; color: #1C2823; font-family: 'Schibsted Grotesk', 'Liberation Sans', sans-serif; position: relative; overflow: hidden; }
.bar { position: absolute; inset: 0 0 auto 0; height: 8px; background: #1C2823; }
.wrap { position: absolute; inset: 72px 96px 64px 96px; display: flex; flex-direction: column; }
.brand { display: flex; align-items: center; gap: 18px; font-family: 'Marcellus', 'DejaVu Serif', serif; font-size: 34px; }
.mark { width: 56px; height: 56px; border-radius: 4px; background: #1C2823; color: #F2EEE2; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.eyebrow { margin-top: 64px; font-family: 'Spline Sans Mono', 'DejaVu Sans Mono', monospace; font-size: 20px; letter-spacing: 3px; text-transform: uppercase; color: #7E5D19; }
h1 { margin-top: 18px; font-family: 'Marcellus', 'DejaVu Serif', serif; font-weight: 400; font-size: ${title.length > 26 ? 64 : 84}px; line-height: 1.08; max-width: 1000px; }
.sub { margin-top: 22px; font-size: 32px; line-height: 1.3; color: rgba(28,40,35,.72); max-width: 980px; }
.rows { margin-top: 34px; display: grid; gap: 14px; }
.row { display: flex; gap: 22px; font-size: 26px; align-items: baseline; }
.row b { font-family: 'Marcellus', 'DejaVu Serif', serif; font-weight: 400; font-size: 30px; min-width: 250px; }
.row span { color: rgba(28,40,35,.7); }
.foot { margin-top: auto; display: flex; justify-content: space-between; align-items: center; font-family: 'Spline Sans Mono', 'DejaVu Sans Mono', monospace; font-size: 20px; color: #7E5D19; }
.rule { position: absolute; left: 96px; bottom: 120px; width: 112px; height: 3px; background: #7E5D19; }
</style></head><body>
<div class="bar"></div>
<div class="wrap">
  <div class="brand"><div class="mark">HB</div>HotelByte</div>
  <div class="eyebrow">${esc(eyebrow)}</div>
  <h1>${esc(title)}</h1>
  ${subtitle ? `<div class="sub">${esc(subtitle)}</div>` : ''}
  ${rows.length ? `<div class="rows">${rows.map(([name, text]) => `<div class="row"><b>${esc(name)}</b><span>${esc(text)}</span></div>`).join('')}</div>` : ''}
  <div class="foot"><span>hotelbyte.com</span><span>Stai by HotelByte</span></div>
</div>
</body></html>`;
}

const jobs = [
  { out: 'og-image.png', html: card({ eyebrow: 'Stai by HotelByte', title: 'Sell hotels your way', rows: productLines.map((line) => [line.name, line.descriptorEn]) }) },
  ...productLines.map((line) => ({ out: `og/${line.slug}.png`, html: card({ eyebrow: line.earlyAccess ? 'Stai · early access' : 'Stai', title: line.name, subtitle: line.descriptorEn }) })),
  ...products.map((p) => {
    const line = productLines.find((l) => l.key === p.line);
    return { out: `og/${p.slug}.png`, html: card({ eyebrow: line?.name ?? 'Stai', title: p.nameEn, subtitle: p.taglineEn }) };
  }),
];

fs.mkdirSync(path.join(root, 'public', 'og'), { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const job of jobs) {
  await page.setContent(job.html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, 'public', job.out), type: 'png' });
  console.log(`og: public/${job.out}`);
}
await browser.close();
