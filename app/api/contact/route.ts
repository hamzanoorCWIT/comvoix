import { countries } from "countries-list";

/*
 * Contact form delivery through Brevo's transactional email API (not SMTP).
 * Required environment variables:
 *   BREVO_API_KEY       an API key from Brevo > SMTP & API > API keys
 *   CONTACT_FROM_EMAIL  a sender verified in Brevo, e.g. no-reply@comvoix.com
 *   CONTACT_TO_EMAIL    where enquiries land, e.g. sales@comvoix.com
 * Optional: CONTACT_FROM_NAME (default "Comvoix Website").
 */
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type Payload = { name?: unknown; email?: unknown; company?: unknown; country?: unknown; phoneCode?: unknown; phone?: unknown; notes?: unknown; website?: unknown; subject?: unknown };

// Per-process defence; use a trusted ingress limiter for multi-instance deployments.
const attempts = new Map<string, { count: number; expires: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 16_384;

async function readPayload(request: Request): Promise<Payload> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Invalid body');
  const decoder = new TextDecoder();
  let raw = '', size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError('Body too large'); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body');
    return body as Payload;
  } finally { reader.releaseLock(); }
}

const NAME = /^[\p{L}][\p{L}\p{M}' .-]{1,79}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const text = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const expectedOrigin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(request.url).origin;
  if (!origin || origin !== expectedOrigin) return Response.json({ error: 'Forbidden.' }, { status: 403 });
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return Response.json({ error: 'JSON required.' }, { status: 415 });
  }
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) return Response.json({ error: 'Request too large.' }, { status: 413 });
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const attempt = attempts.get(ip);
  if ((attempt && attempt.count >= 5) || (!attempt && attempts.size >= 10_000)) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(Math.ceil(((attempt?.expires ?? now + WINDOW_MS) - now) / 1000)) } });
  }
  attempts.set(ip, { count: (attempt?.count ?? 0) + 1, expires: attempt?.expires ?? now + WINDOW_MS });
  let body: Payload;
  try { body = await readPayload(request); } catch (error) { return Response.json({ error: "Invalid request." }, { status: error instanceof RangeError ? 413 : 400 }); }

  // Honeypot: real visitors never fill this hidden field.
  if (text(body.website)) return Response.json({ ok: true });

  const name = text(body.name, 80), email = text(body.email, 120), company = text(body.company, 120);
  const countryCode = text(body.country, 2).toUpperCase(), phoneCode = text(body.phoneCode, 5).replace(/\D/g, ""), phone = text(body.phone, 20).replace(/\D/g, ""), notes = text(body.notes, 1000);
  const country = (countries as Record<string, { name: string }>)[countryCode]?.name;

  const errors: Record<string, string> = {};
  if (typeof body.notes === 'string' && body.notes.length > 1000) errors.notes = 'Please keep your notes under 1,000 characters.';
  if (!NAME.test(name)) errors.name = "Please enter a valid name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (company.length < 2) errors.company = "Please enter your company name.";
  if (!country) errors.country = "Please choose your country.";
  if (!/^\d{1,4}$/.test(phoneCode)) errors.phoneCode = "Choose a dialling code.";
  if (!/^\d{6,15}$/.test(phone)) errors.phone = "Phone numbers must be 6 to 15 digits.";
  if (Object.keys(errors).length) return Response.json({ error: "Please check the highlighted fields.", errors }, { status: 422 });

  const apiKey = process.env.BREVO_API_KEY?.trim(), from = process.env.CONTACT_FROM_EMAIL?.trim(), to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !from || !to) {
    const missing = [!apiKey && 'BREVO_API_KEY', !from && 'CONTACT_FROM_EMAIL', !to && 'CONTACT_TO_EMAIL'].filter(Boolean);
    console.error(`Contact form: missing required environment variables: ${missing.join(', ')}.`);
    return Response.json({ error: "The contact form is not configured yet. Please use the contact details on our Contact page." }, { status: 503 });
  }

  const rows: [string, string][] = [["Request", text(body.subject, 120) || "Website enquiry"], ["Name", name], ["Work email", email], ["Company", company], ["Country", country!], ["Phone", `+${phoneCode} ${phone}`], ["Notes", notes || "—"]];
  const htmlContent = `<h2 style="font-family:Arial,sans-serif;margin:0 0 16px">New contact request</h2><table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#64748b;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`).join("")}</table>`;
  const textContent = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  let response: Response;
  try {
    response = await fetch(BREVO_ENDPOINT, {
    signal: AbortSignal.timeout(10_000),
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { email: from, name: process.env.CONTACT_FROM_NAME || "Comvoix Website" },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Contact request from ${name}${country ? ` · ${country}` : ""}`,
      htmlContent,
      textContent,
      tags: ["website-contact"],
    }),
  });

  } catch {
    console.error("Contact form: delivery request failed.");
    return Response.json({ error: "Delivery could not be confirmed. Please try again later or contact our team." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Contact form: Brevo rejected the message.", response.status);
    return Response.json({ error: "We couldn’t send your message right now. Please try again or use the contact details on our Contact page." }, { status: 502 });
  }

  // Thank-you email to the person who wrote in. A failure here is logged but never shown as an error: their message already reached the team.
  const firstName = name.split(/\s+/)[0];
  try {
  const thanks = await fetch(BREVO_ENDPOINT, {
    signal: AbortSignal.timeout(5_000),
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { email: from, name: process.env.CONTACT_FROM_NAME || "Comvoix" },
      to: [{ email, name }],
      replyTo: { email: to, name: "Comvoix" },
      subject: "Thanks for contacting Comvoix",
      htmlContent: thankYouHtml(firstName, rows),
      textContent: `Hi ${firstName},

Thanks for getting in touch with Comvoix. We have received your message and a member of our team will get back to you shortly.

What you sent us:
${textContent}

If anything changes in the meantime, just reply to this email.

Comvoix
Global communication solutions`,
      tags: ["website-contact-autoreply"],
    }),
  });
  if (!thanks.ok) console.error("Contact form: thank-you email was not sent.", thanks.status);

  } catch { console.error("Contact form: confirmation email failed after enquiry was accepted."); }

  return Response.json({ ok: true });
}

function thankYouHtml(firstName: string, rows: [string, string][]) {
  const summary = rows.map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;color:#64748b;font-size:13px;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:8px 0;font-size:14px;color:#111827;white-space:pre-wrap">${escape(v)}</td></tr>`).join("");
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f6f9;font-family:Helvetica,Arial,sans-serif;color:#111827">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f9;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
  <tr><td style="background:#0b0d0c;padding:22px 32px"><span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:.5px">Comvoix</span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f9a21e;margin-left:8px;vertical-align:middle"></span></td></tr>
  <tr><td style="padding:32px 32px 8px">
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3">Thanks for reaching out, ${escape(firstName)}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155">We’ve received your message and a member of our team will get back to you shortly. In the meantime, here is a copy of what you sent us.</p>
  </td></tr>
  <tr><td style="padding:0 32px 24px"><table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb">${summary}</table></td></tr>
  <tr><td style="padding:0 32px 32px"><p style="margin:0;font-size:14px;line-height:1.6;color:#334155">Need to add anything? Just reply to this email.</p></td></tr>
  <tr><td style="background:#f8fafc;padding:18px 32px;font-size:12px;color:#64748b;line-height:1.6">Comvoix · Global communication solutions<br>ComVoix, LLC, 1000 N West St, Suite 1200, Wilmington, DE 19801</td></tr>
</table></td></tr></table></body></html>`;
}
