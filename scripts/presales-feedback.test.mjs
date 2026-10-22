import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/presales/api.ts', import.meta.url), 'utf8');
const javascript = ts.transpileModule(source.replaceAll('import.meta.env', '({})'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { submitPresalesFeedback } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`);
const request = { visitorId: 'issue34247', sessionId: 'disposable', messageType: 'lead', message: 'test', locale: 'en' };

async function submit(body, status = 200) {
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    assert.ok(url.endsWith('/api/public/presales/feedback'));
    assert.deepEqual(JSON.parse(options.body), request);
    return new Response(JSON.stringify(body), { status });
  };
  try { return await submitPresalesFeedback(request); }
  finally { globalThis.fetch = original; }
}

test('keeps acknowledgements from the old and standard response contracts', async () => {
  assert.deepEqual(await submit({ success: true, message: 'Thank you!' }), { message: 'Thank you!' });
  assert.deepEqual(await submit({ code: 0, msg: 'Thank you!', data: {} }), { message: 'Thank you!' });
});

test('rejects HTTP errors, business failures and malformed success bodies', async () => {
  for (const body of [{ success: false, message: 'Failed' }, { code: 100000500, msg: 'Failed' }, {}, null, { code: 0 }, { success: true }, { code: 0, msg: '' }]) {
    await assert.rejects(submit(body));
  }
  await assert.rejects(submit({ code: 100000500, msg: 'Failed' }, 503));
});
