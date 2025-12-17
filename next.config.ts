import { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

import { SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } from '@/consts/monitoring';

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/((?!api|_next/static|_next/image|favicon.png).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
      headers: [
        {
          key: 'X-Frame-Options',
          value: `SAMEORIGIN`,
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ],
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  // The slug of the Sentry organization associated with the app.
  org: SENTRY_ORG,

  // The slug of the Sentry project associated with the app
  project: SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Pass the auth token
  authToken: SENTRY_AUTH_TOKEN,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  automaticVercelMonitors: true,
});
