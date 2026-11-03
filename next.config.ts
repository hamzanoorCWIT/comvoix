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

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  /** Hides `X-Powered-By: Next.js` in production (cosmetic / minor hardening). */
  poweredByHeader: false,

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
