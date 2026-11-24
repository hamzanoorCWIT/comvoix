// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     agentFeedback: true,
//   },
//   cacheComponents: true,
//   partialPrefetching: true,
//   turbopack: {
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const enableHsts = process.env.NODE_ENV === "production" && process.env.ENABLE_HSTS === "true";
if (enableHsts && (!process.env.SITE_URL || new URL(process.env.SITE_URL).protocol !== "https:")) {
  throw new Error("ENABLE_HSTS requires SITE_URL to be the verified public HTTPS origin.");
}

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  /** Hides `X-Powered-By: Next.js` in production (cosmetic / minor hardening). */
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...(enableHsts ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : []),
    ] }];
  },

  /**
   * Avoid repeated browser warnings from <Image quality={100}> usages.
   * Next 16 defaults to [75], so explicitly allow both project qualities.
   */
  images: {
    qualities: [75, 100],
  },

  /**
   * **Development only** (`next dev`). Does not affect `next build` or `next start`.
   * LAN testing: without this, opening `http://<local-IP>:3000` can 403 `/_next/*` and break hydration.
   * Production deploys (VPS, static host, etc.) are unaffected.
   */
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "127.0.0.1",
  ],
};

export default nextConfig;
