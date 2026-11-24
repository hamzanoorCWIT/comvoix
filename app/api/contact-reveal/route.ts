import { NextResponse, type NextRequest } from 'next/server';
import { contactKeys, getContactValue, type ContactKey } from '../../lib/contact-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Best-effort per-process throttle. Use a shared edge/WAF/Redis limiter in production
// when running multiple instances or serverless functions.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const headers = {
  'Cache-Control': 'private, no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

function json(body: object, status: number) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  // Browsers include Origin for a JSON POST; reject cross-origin requests.
  const expectedOrigin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : request.nextUrl.origin;
  if (!origin || origin !== expectedOrigin) {
    return json({ error: 'Forbidden' }, 403);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  if (hits.size > 10_000) {
    for (const [key, record] of hits) if (record.reset <= now) hits.delete(key);
  }
  const record = hits.get(ip);
  if (record && record.reset > now && record.count >= MAX_REQUESTS) {
    return json({ error: 'Too many requests' }, 429);
  }
  hits.set(ip, record && record.reset > now
    ? { count: record.count + 1, reset: record.reset }
    : { count: 1, reset: now + WINDOW_MS });

  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  if (!body || typeof body !== 'object' || !('key' in body)) {
    return json({ error: 'Invalid request' }, 400);
  }
  const key = (body as { key: unknown }).key;
  if (typeof key !== 'string' || !contactKeys.includes(key as ContactKey)) {
    return json({ error: 'Invalid contact' }, 400);
  }
  const value = getContactValue(key as ContactKey);
  if (!value) return json({ error: 'Contact is not configured' }, 503);
  return json({ value }, 200);
}
