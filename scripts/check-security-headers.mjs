import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';

// Read-only checks: API POSTs intentionally omit Origin so no email can be sent.
const base = new URL(process.argv[2] || 'http://127.0.0.1:3100');
const expectHsts = process.argv.includes('--hsts');
function request(path, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, base);
    const req = (url.protocol === 'https:' ? https : http).request(url, { method, headers }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => resolve({ headers: res.headers, rawHeaders: res.rawHeaders, body, status: res.statusCode }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error('Response timed out')));
    req.end();
  });
}
function check(response, document = true) {
  const h = response.headers;
  for (const key of ['content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'strict-transport-security']) {
    assert.ok(response.rawHeaders.filter((x, i) => i % 2 === 0 && x.toLowerCase() === key).length <= 1, `duplicate ${key}`);
  }
  assert.equal(h['x-frame-options'], 'SAMEORIGIN');
  assert.equal(h['x-content-type-options'], 'nosniff');
  assert.equal(h['referrer-policy'], 'strict-origin-when-cross-origin');
  assert.equal(h['permissions-policy'], 'camera=(), microphone=(), geolocation=()');
  assert.equal(h['strict-transport-security'], expectHsts ? 'max-age=31536000' : undefined);
  assert.equal(h['x-powered-by'], undefined);
  if (!document) return;
  const csp = h['content-security-policy'];
  assert.ok(csp);
  assert.match(csp, /frame-ancestors 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /form-action 'self'/);
  const scripts = csp.split(';').find(x => x.trim().startsWith('script-src '));
  assert.ok(!scripts.includes('unsafe-inline') && !scripts.includes('unsafe-eval'));
  assert.ok(!csp.includes(' ws:') && !csp.includes(' wss:'));
  assert.equal(csp.includes('upgrade-insecure-requests'), expectHsts);
  const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
  assert.ok(nonce && Buffer.from(nonce, 'base64').length === 32);
  const tags = [...response.body.matchAll(/<script\b[^>]*>/g)];
  if (tags.length) {
    assert.match(h['cache-control'] || '', /private/);
    assert.match(h['cache-control'] || '', /no-store/);
  }
  for (const [tag] of tags) assert.ok(tag.includes(`nonce="${nonce}"`), `script missing matching nonce: ${tag}`);
  return nonce;
}
const first = await request('/');
assert.equal(first.status, 200);
const nonce = check(first);
assert.notEqual(check(await request('/', 'GET', { 'x-nonce': 'attacker', 'content-security-policy': "script-src 'unsafe-inline'" })), nonce);
for (const path of ['/contact', '/about', '/products/cloud-pbx', '/security-header-check-not-found']) {
  const response = await request(path);
  assert.equal(response.status, path.endsWith('not-found') ? 404 : 200);
  check(response);
}
check(await request('/contact', 'GET', { 'next-router-prefetch': '1', purpose: 'prefetch' }));
for (const path of ['/api/contact', '/api/contact-reveal']) {
  const response = await request(path, 'POST');
  assert.equal(response.status, 403);
  check(response);
}
const asset = first.body.match(/src="([^" ]*\/_next\/static\/[^" ]+\.js)"/)?.[1];
assert.ok(asset, 'No framework script found');
const staticResponse = await request(asset);
assert.equal(staticResponse.status, 200);
check(staticResponse, false);
console.log('Production headers, nonce matching/rotation, prefetch, 404, APIs and static asset checks passed.');
