import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/lib/presales/api.ts', import.meta.url), 'utf8');
const javascript = ts.transpileModule(source.replaceAll('import.meta.env', '({})'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const api = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`);
const text = value => `data: ${JSON.stringify({version:'v0.9',updateDataModel:{path:'/streamingText',value}})}\n\n`;
const completed = `data: ${JSON.stringify({version:'v0.9',updateDataModel:{path:'/status',value:'completed'}})}\n\n`;
const failure = `data: ${JSON.stringify({version:'v0.9',updateComponents:{components:[{id:'error',component:'Card'},{id:'error-text',component:'Text',text:'Incomplete answer'}]}})}\n\n`;
async function collect(body) {
 const original = globalThis.fetch;
 globalThis.fetch = async () => new Response(body, { headers: {'Content-Type':'text/event-stream'} });
 try {
  return await new Promise(resolve => {
   let tokens = '';
   api.streamPresalesChat({sessionId:'test',visitorId:'test',message:'Public question',locale:'en',pageContext:'/'}, {
    onToken: token => { tokens += token; },
    onDone: () => resolve({tokens,done:true}),
    onError: error => resolve({tokens,done:false,error:error.message}),
   });
  });
 } finally { globalThis.fetch = original; }
}
test('accepts a complete nonempty stream', async () => { assert.deepEqual(await collect(text('Answer.')+completed), {tokens:'Answer.',done:true}); });
test('reports an error component after partial text instead of completing it', async () => { const result=await collect(text('Partial')+failure); assert.equal(result.tokens,'Partial'); assert.equal(result.done,false); assert.ok(result.error); });
test('reports an error component before any text', async () => { const result=await collect(failure); assert.equal(result.done,false); assert.ok(result.error); });
test('does not complete an empty or malformed response', async () => { for(const body of ['', 'data: not-json\n\n']) { const result=await collect(body); assert.equal(result.done,false); assert.ok(result.error); } });

test('does not treat a nonempty partial response followed by EOF as complete', async () => { const result=await collect(text('Partial answer, first point:')); assert.equal(result.done,false); assert.ok(result.error); });
