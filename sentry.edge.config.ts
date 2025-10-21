// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { SENTRY_DEBUG, SENTRY_ENVIRONMENT } from '@/consts/monitoring';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: SENTRY_DEBUG,

  // Sets the distribution of the application. Distributions are used to disambiguate build or deployment variants of the same release of an application.
  environment: SENTRY_ENVIRONMENT,
});
