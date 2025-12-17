export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
export const SENTRY_ORG = process.env.NEXT_PUBLIC_SENTRY_ORG;
export const SENTRY_PROJECT = process.env.NEXT_PUBLIC_SENTRY_PROJECT;
export const SENTRY_ENVIRONMENT =
  process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ||
  process.env.VERCEL_ENV ||
  (process.env.NODE_ENV === 'development' ? 'local' : 'production');
export const SENTRY_AUTH_TOKEN = process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN;
export const SENTRY_DEBUG = process.env.NEXT_PUBLIC_SENTRY_DEBUG === 'true';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export const GROWTHBOOK_API_HOST = process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST;
export const GROWTHBOOK_API_KEY = process.env.NEXT_PUBLIC_GROWTHBOOK_API_KEY;
