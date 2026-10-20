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
