import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const nonce = randomBytes(32).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    // React style props and GSAP animations require inline styles, not inline scripts.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    // Turbopack can bootstrap the bundled particle worker through a blob URL.
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-src 'none'",
    "frame-ancestors 'self'",
    ...(process.env.NODE_ENV === "production" && process.env.ENABLE_HSTS === "true"
      ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

  // Next reads the request CSP to nonce its runtime and hydration scripts.
  // Always overwrite client-provided values.
  const headers = new Headers(request.headers);
  headers.set("Content-Security-Policy", csp);
  headers.set("x-nonce", nonce);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Include APIs, error pages and prefetches; never bypass policy based on a client header.
  matcher: ["/((?!_next/static|_next/image|assets/|favicon.ico).*)"],
};
