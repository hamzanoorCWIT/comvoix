# HTTP security headers

## Audit and implementation

Reviewed Next.js 16.4.6's installed CSP, Proxy and headers documentation, app routes,
Next configuration, scripts, public assets, fonts and deployment notes. No reverse
proxy/CDN configuration is checked in, so upstream headers and TLS cannot be verified here.

- `next.config.ts` owns nosniff, SAMEORIGIN, strict-origin-when-cross-origin,
  camera/microphone/geolocation restrictions and optional HSTS on all routes/assets.
  The duplicate route-level nosniff declaration was removed.
- `proxy.ts` owns CSP on pages, APIs, prefetches and error routes. It replaces
  incoming CSP/nonce headers, generates a cryptographically random 256-bit nonce
  and supplies the same policy to Next's renderer and the response.
- The root layout awaits `connection()` so HTML and hydration scripts receive the
  request nonce. HTML must not be cached or replayed by a CDN. This trades static
  page caching for strict script authorization and increases server rendering work.
- Scripts use nonce + strict-dynamic, with no production unsafe-inline/unsafe-eval.
  Script attributes, objects, base elements and embedded frames are blocked.
  `frame-ancestors 'self'` matches the existing `X-Frame-Options: SAMEORIGIN` policy.
- Styles allow unsafe-inline because React style props and GSAP/DOM animation
  code depend on them. This exception does **not** authorize inline scripts.
- Images allow self and data URLs (Next image placeholders); fonts are self-hosted
  by `next/font`, including Ubuntu downloaded at build time. Browser access to Google
  font domains is unnecessary. Bundled particle workers allow self/blob bootstrap URLs.
- Browser fetches are same-origin (`/api/contact`, `/api/contact-reveal`). Brevo is a
  server-side integration and needs no CSP domain allowance. No active third-party
  analytics, auth, maps, payment SDKs or embedded content were found. Cookie preference
  controls do not currently load third-party tracking.
- Development alone permits script unsafe-eval and WebSocket connections for Next's
  debugging/HMR. HTTPS upgrading is enabled only with production HSTS opt-in.

## Deployment

1. Use a Next.js server-capable deployment; static export is incompatible with APIs
   and nonce rendering. Keep HTML out of shared caches; preserve Next's private/no-store
   caching headers. Static assets can remain cached normally.
2. Verify the public hostname has valid HTTPS and HTTP redirects to HTTPS. Set
   `SITE_URL=https://your-actual-host` and `ENABLE_HSTS=true` at **build and runtime**,
   then rebuild and deploy. HSTS is `max-age=31536000`, without includeSubDomains or
   preload. Leave the flag false for local HTTP. The config rejects HSTS without an
   HTTPS SITE_URL; this validates configuration, not the actual TLS certificate.
3. Inspect the hosting/CDN rules: choose one owner for each header and remove
   conflicting injected CSP, X-Frame-Options or HSTS policies. Do not cache nonce HTML.
   Hosting-injected scripts need explicit nonce integration before enabling them.
4. Run `node scripts/check-security-headers.mjs https://your-actual-host --hsts`.
   This verifies raw duplicate counts, policy values, nonce matching/rotation,
   prefetch headers, a 404, static JavaScript and rejected API requests. It sends no
   emails. Follow redirects separately if the tested URL is not canonical.
5. Check browser CSP console messages while navigating, opening demo/contact forms,
   revealing contacts, changing cookie preferences and viewing particle animations.
   Test successful email delivery separately with authorization and configured Brevo.
   Future integrations require a targeted policy review, not broad https: wildcards.

## Local validation

- Production build and TypeScript passed. Build reports an existing unknown `@theme`
  CSS rule warning in `app/globals.css`.
- `npm run lint` passed.
- `node --test scripts/security-policy.test.mjs scripts/contact-api.test.mjs`:
  10 tests passed, including HSTS gating and development/production separation.
- `node scripts/check-security-headers.mjs` passed against a locally running
  production server on port 3100 with HSTS disabled for HTTP. HTML script nonces
  matched the policy on normal, prefetch and error responses and rotated per request.
- Public HTTPS/CDN headers, real browser interactions and live email delivery are
  deployment checks; they were not verified by these HTTP-level tests.
