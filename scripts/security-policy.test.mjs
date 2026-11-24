import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
function load(file, env) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(source, { exports, require, Headers, URL, process: { env } });
  return exports;
}
test('HSTS requires production, explicit opt-in and an HTTPS canonical origin', async () => {
  for (const env of [{ NODE_ENV: 'development', ENABLE_HSTS: 'true' }, { NODE_ENV: 'production' }]) {
    const rules = await load('next.config.ts', env).default.headers();
    assert.ok(!rules[0].headers.some(h => h.key === 'Strict-Transport-Security'));
  }
  assert.throws(() => load('next.config.ts', { NODE_ENV: 'production', ENABLE_HSTS: 'true', SITE_URL: 'http://example.test' }));
  const rules = await load('next.config.ts', { NODE_ENV: 'production', ENABLE_HSTS: 'true', SITE_URL: 'https://example.test' }).default.headers();
  assert.equal(rules[0].headers.find(h => h.key === 'Strict-Transport-Security').value, 'max-age=31536000');
});
test('development exceptions never enter production CSP; spoofed nonce is replaced', () => {
  for (const mode of ['development', 'production']) {
    const { proxy } = load('proxy.ts', { NODE_ENV: mode });
    const response = proxy({ headers: new Headers({ 'x-nonce': 'attacker' }) });
    const csp = response.headers.get('content-security-policy');
    assert.equal(csp.includes('unsafe-eval'), mode === 'development');
    assert.equal(csp.includes(' ws:'), mode === 'development');
    assert.ok(!csp.includes('attacker'));
    assert.equal(response.headers.get('x-middleware-request-content-security-policy'), csp);
  }
});
