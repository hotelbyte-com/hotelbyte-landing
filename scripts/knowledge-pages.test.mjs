import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pageText, pageChunks } from './knowledge-pages.mjs';
test('exports the actual visible page including late client setup, without chrome or scripts', () => {
 const html = '<header>PRIVATE CHROME</header><main><h1>API</h1><script>BAD</script><svg>ICON</svg><p>' + 'MCP clients &amp; tools. '.repeat(210) + '</p><h2>ChatGPT</h2><p>Pick API key, not OAuth.</p></main><footer>FOOTER</footer>';
 const chunks = pageChunks({html,path:'/products/api',locale:'en',key:'api',title:'Stai API'});
 assert.ok(chunks.length > 1);
 const all = chunks.map(c => c.content).join('\n');
 assert.match(all, /Pick API key, not OAuth/);
 assert.match(all, /MCP clients & tools/);
 assert.match(all, /Source: https:\/\/hotelbyte.com\/products\/api/);
 assert.doesNotMatch(all, /PRIVATE CHROME|BAD|ICON|FOOTER/);
 assert.ok(chunks.every(c => c.content.length < 2000));
});
test('fails instead of publishing a SPA shell as knowledge', () => {
 assert.throws(() => pageText('<div id="root"></div>'), /no main/);
 assert.throws(() => pageChunks({html:'<main>empty</main>',path:'/'}), /too small/);
});
test('keeps a named section with its description and setup requirements at a chunk boundary', () => {
 const html = '<main><h2>Integrations</h2><p>' + 'Introduction. '.repeat(120) + '</p><h3>Alpha client</h3><p>Acme manufactures Alpha. Alpha runs in the host platform.</p><pre>Platform-side setup only.</pre><h3>Beta client</h3><p>Beta needs a local configuration file.</p></main>';
 const chunks = pageChunks({html,path:'/integrations',locale:'en',key:'integrations',title:'Integrations'});
 const alpha = chunks.find(c => c.content.includes('Acme manufactures'));
 assert.match(alpha.content, /### Alpha client\n/);
 assert.match(alpha.content, /Platform-side setup only/);
 assert.ok(!chunks.some(c => c.content.includes('Platform-side setup only') && !c.content.includes('### Alpha client')));
});
test('repeats the section heading when a long section must continue in another chunk', () => {
 const html = '<main><h3>Long named client</h3><p>' + 'Configuration detail. '.repeat(210) + '</p></main>';
 const chunks = pageChunks({html,path:'/integrations',locale:'en',key:'integrations',title:'Integrations'});
 assert.ok(chunks.length > 1);
 for (const c of chunks) { assert.match(c.content, /### Long named client\n/); assert.ok(c.content.length < 2000); }
 const body = chunks.map(c => c.content.split('\n').filter(l => !l.startsWith('#') && !l.startsWith('Source:')).join('')).join('');
 assert.equal(body.replace(/\s/g, ''), 'Configurationdetail.'.repeat(210));
});

test('does not promote shell comments to headings and balances continued code blocks', () => {
 const html = '<main><h2>Integrations</h2><h3>Alpha client</h3><pre># command comment\n' + 'Configure Alpha. '.repeat(230) + '</pre><h3>Generic integration</h3><p>Use JSON RPC. ' + 'Example. '.repeat(15) + '</p></main>';
 const chunks = pageChunks({html,path:'/integrations',locale:'en',key:'integrations',title:'Integrations'});
 for (const c of chunks.filter(c => c.content.includes('Configure Alpha'))) {
  assert.match(c.content, /## Integrations\n### Alpha client\n/);
  assert.equal(c.content.split('```').length % 2, 1);
  assert.ok(c.content.length < 2000);
 }
 const generic = chunks.find(c => c.content.includes('Use JSON RPC'));
 assert.match(generic.content, /### Generic integration/);
 assert.ok(!chunks.some(c => /# command comment\n```\n/.test(c.content)));
});
