/**
 * Stripe Configuration (BloxKit AI landing)
 *
 * Keys and URLs come from environment variables.
 * We intentionally do NOT hardcode Stripe keys or price IDs in the repo.
 */

import { isFirebaseProduction } from './firebase-config';

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  isProduction: boolean;
  environment: 'development' | 'production';
}

const developmentConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST || '',
  secretKey: process.env.STRIPE_SECRET_KEY_TEST || '',
  isProduction: false,
  environment: 'development',
};

const productionConfig: StripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE || '',
  secretKey: process.env.STRIPE_SECRET_KEY_LIVE || '',
  isProduction: true,
  environment: 'production',
};

export function getStripeConfig(): StripeConfig {
  const forceEnvironment = process.env.STRIPE_ENVIRONMENT;

  const isProduction =
    forceEnvironment === 'production' ||
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL_ENV === 'production' ||
    isFirebaseProduction();

  return isProduction ? productionConfig : developmentConfig;
}

export function isTestMode(): boolean {
  return !getStripeConfig().isProduction;
}

/**
 * Default environment URLs for success/cancel.
 * Override with NEXT_PUBLIC_SITE_URL when deployed.
 */
export function getEnvironmentUrls() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
  return {
    successUrl: `${base}/success`,
    cancelUrl: `${base}/#pricing`,
  };
}

/**
 * Price IDs are supplied via env vars.
 * (Well wire Stripe properly after consent to touch the Stripe account.)
 */
export function getPriceId(productKey: string): string {
  const isProd = getStripeConfig().isProduction;
  const suffix = isProd ? 'LIVE' : 'TEST';
  const envKey = `NEXT_PUBLIC_STRIPE_PRICE_ID_${productKey.toUpperCase()}_${suffix}`;
  const v = process.env[envKey];

  if (!v) {
    throw new Error(`Missing env var ${envKey} for price id`);
  }

  return v;
}
