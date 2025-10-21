export const SENTRY_ORG = process.env.SENTRY_ORG;

export const SENTRY_PROJECT = process.env.SENTRY_PROJECT;

export const SENTRY_ENVIRONMENT =
  process.env.SENTRY_ENVIRONMENT ||
  process.env.VERCEL_ENV ||
  (process.env.NODE_ENV === 'development' ? 'local' : 'production');

export const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;

export const SENTRY_DEBUG = process.env.SENTRY_DEBUG === 'true';

export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export const AMPLITUDE_API_KEY = process.env.AMPLITUDE_API_KEY;

export const CLARITY_PROJECT_ID = process.env.CLARITY_PROJECT_ID;

export const GROWTHBOOK_API_HOST = process.env.GROWTHBOOK_API_HOST;
export const GROWTHBOOK_API_KEY = process.env.GROWTHBOOK_API_KEY;
