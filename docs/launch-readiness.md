# Launch readiness

No build, deployment, or live test email was performed during this review.

## Implemented locally

- Homepage, product and solution demo requests use the shared contact form and Brevo delivery endpoint. Demo requests include their product name.
- Contact API rejects cross-origin requests, malformed JSON, non-object bodies and requests larger than 16 KiB. It validates fields, includes a honeypot and limits attempts to five per IP per ten minutes per process.
- Email requests have timeouts. Failure of the confirmation email does not turn an accepted enquiry into a failed submission. Provider response bodies are not logged.
- Contact details remain server-configured and only reveal after visitor interaction.
- Basic security response headers are configured.

## Local checks (do not build or deploy)

- `npm run lint`
- `npx tsc --noEmit`
- `npm run test:contact` (mocked email requests only)
- `npm run check:production` (reports unfinished content/configuration; deliberately fails until resolved)

## Company information still needed

Do not delete the bracketed instructions merely to pass the checks. Replace them with approved facts/text:

- Privacy: sale/sharing policy, retention schedule, hosting countries and transfer safeguards.
- Terms: notice periods, billing and late fees, refunds/termination, emergency calling support, confidentiality, dispute resolution, liability, indemnity and governing law.
- CPNI: service applicability, marketing use and incident notification procedures.
- Cookies: actual cookie/storage inventory, providers, purposes and retention; remove Draft status only after review.
- Trust: verify STIR/SHAKEN deployment and traceback commitments.

The existing policy content has not been rewritten to invent operational or legal facts.

## Before a later production launch

1. Use a Next.js server-capable host. This site uses API routes and cannot work completely as a static export.
2. Configure the variables in `.env.example` in the host's secret/environment settings. Local `.env.local` is not deployed through Git. Verify the Brevo sender and recipient. Never use NEXT_PUBLIC_ for these secrets.
3. Set SITE_URL to the public HTTPS origin if proxy URLs differ from the public URL. Configure the same canonical origin for contact-reveal routing.
4. Apply an ingress/WAF rate limit to both /api/contact and /api/contact-reveal. The in-process limits reset on restart and are not shared across instances. Only trust forwarded IP headers that the hosting proxy replaces.
5. Verify HTTPS, DNS, production build/start and all routes when authorized. A type check does not prove that a production build succeeds.
6. With explicit authorization, submit one enquiry and confirm receipt and confirmation delivery. No messages have been sent by the automated tests.
7. Test keyboard/mobile form use, contact reveals and cookie choices on the real origin. Cookie preferences currently re-open on each page load as requested; optional tracking must respect saved consent if introduced.

A production-ready claim remains blocked on approved policy content and verification of the actual hosting/email environment.
