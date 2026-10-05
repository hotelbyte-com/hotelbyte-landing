// After a production deploy, tell IndexNow (Bing, which also feeds ChatGPT
// search and Copilot, plus Yandex, Seznam, Naver) which URLs changed. Reads
// the live sitemap and submits URLs whose <lastmod> is on or after the cutoff
// (default: yesterday, UTC). Usage: node scripts/indexnow.mjs [--since YYYY-MM-DD] [--dry-run]
const HOST = 'hotelbyte.com';
const KEY = '14e1d619a5a741920efd21a2045b5301'; // public by design: served at https://hotelbyte.com/${KEY}.txt

const args = process.argv.slice(2);
const sinceArg = args.includes('--since') ? args[args.indexOf('--since') + 1] : null;
const dryRun = args.includes('--dry-run');
const since = sinceArg ?? new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, block]) => ({ loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1], lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] }))
  .filter(({ loc, lastmod }) => loc && lastmod && lastmod >= since)
  .map(({ loc }) => loc);

if (urls.length === 0) {
  console.log(`indexnow: no URLs changed since ${since}`);
  process.exit(0);
}
console.log(`indexnow: ${urls.length} URL(s) changed since ${since}`);
if (dryRun) {
  console.log(urls.join('\n'));
  process.exit(0);
}
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`indexnow: HTTP ${response.status}`);
if (!response.ok && response.status !== 202) process.exit(1);
