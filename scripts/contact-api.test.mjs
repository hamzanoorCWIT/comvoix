import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const source = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const valid = { name: 'Test User', email: 'user@example.test', company: 'Test Company', country: 'US', phoneCode: '1', phone: '3024855838', notes: '<script>test</script>', subject: 'Cloud PBX demo request' };
function setup(replies = [200, 200], env = {}) {
  const calls = [];
  const exports = {};
  vm.runInNewContext(source, { exports, require, Request, Response, TextDecoder, RangeError, URL, AbortSignal, console: { error() {} }, process: { env: { BREVO_API_KEY: 'mock', CONTACT_FROM_EMAIL: 'sender@example.test', CONTACT_TO_EMAIL: 'team@example.test', ...env } }, fetch: async (_url, init) => {
    calls.push(init); const reply = replies.shift(); if (reply instanceof Error) throw reply;
    return new Response('{}', { status: reply ?? 200 });
  } });
  const send = (body = valid, headers = {}) => exports.POST(new Request('https://example.test/api/contact', { method: 'POST', headers: { origin: 'https://example.test', 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }));
  return { send, calls };
}
test('rejects foreign origins without sending email', async () => {
  const { send, calls } = setup(); assert.equal((await send(valid, { origin: 'https://other.test' })).status, 403); assert.equal(calls.length, 0);
});
test('rejects null, arrays, malformed JSON, invalid fields and oversized payloads', async () => {
  for (const [payload, status] of [[null,400], [[],400], ['{',400], [{},422], ['x'.repeat(17000),413]]) {
    const { send, calls } = setup(); assert.equal((await send(payload)).status,status); assert.equal(calls.length,0);
  }
});
test('honeypot never sends email', async () => {
  const { send, calls } = setup(); assert.equal((await send({ ...valid, website: 'bot' })).status,200); assert.equal(calls.length,0);
});
test('rate limits the sixth request', async () => {
  const { send } = setup(); for(let i=0;i<5;i++) await send({});
  const response = await send({}); assert.equal(response.status,429); assert.ok(response.headers.get('retry-after'));
});
test('missing mail configuration fails without sending', async () => {
  const { send, calls } = setup([], { BREVO_API_KEY: '' }); assert.equal((await send()).status,503); assert.equal(calls.length,0);
});
test('handles network errors and provider rejection', async () => {
  for(const failure of [new Error('network'), 429]) { const {send,calls}=setup([failure]); assert.equal((await send()).status,502); assert.equal(calls.length,1); }
});
test('accepted enquiry succeeds even if confirmation email fails', async () => {
  for(const failure of [new Error('network'),500]) { const {send,calls}=setup([200,failure]); const response=await send(); assert.equal(response.status,200); assert.equal((await response.json()).ok,true); assert.equal(calls.length,2); }
});
test('escapes message content and preserves demo context', async () => {
  const {send,calls}=setup(); assert.equal((await send()).status,200);
  const payload=JSON.parse(calls[0].body); assert.ok(payload.htmlContent.includes('&lt;script&gt;')); assert.ok(payload.textContent.includes('Cloud PBX demo request')); assert.ok(calls[0].signal);
});
