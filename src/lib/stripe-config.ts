/**
 * Stripe Configuration Management
 * Handles environment-specific Stripe settings for development and production
 */

import { getPriceId as getCatalogPriceId, validateProductCatalog } from './product-catalog';
import { isFirebaseProduction } from './firebase-config';

export interface StripeConfig {
    // API Keys
    publishableKey: string;
    secretKey: string;

    // Environment Info
    isProduction: boolean;
    environment: 'development' | 'production';
}

/**
 * Development Configuration
 * Uses Stripe test mode with test keys and test price IDs
 */
const developmentConfig: StripeConfig = {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST || '',
    secretKey: process.env.STRIPE_SECRET_KEY_TEST || '',
    isProduction: false,
    environment: 'development',
};

/**
 * Production Configuration
 * Uses Stripe live mode with live keys and live price IDs
 */
const productionConfig: StripeConfig = {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE || '',
    secretKey: process.env.STRIPE_SECRET_KEY_LIVE || '',
    isProduction: true,
    environment: 'production',
};

/**
 * Get the appropriate Stripe configuration based on environment
 */
export function getStripeConfig(): StripeConfig {
    // Check for explicit environment override first
    const forceEnvironment = process.env.STRIPE_ENVIRONMENT;

    // Check for production indicators including Firebase
    const isProduction =
        forceEnvironment === 'production' ||
        process.env.NODE_ENV === 'production' ||
        process.env.VERCEL_ENV === 'production' ||
        isFirebaseProduction();

    if (isProduction) {
        return productionConfig;
    }

    return developmentConfig;
}

/**
 * Get a specific product configuration
 * @deprecated Use getProduct from product-catalog.ts instead
 */
export function getProductConfig(productKey: string) {
    console.warn('getProductConfig is deprecated. Use getProduct from product-catalog.ts instead.');
    return null;
}

/**
 * Get the current price ID for a product
 * Now uses the product catalog system
 */
export function getPriceId(productKey: string): string {
    const config = getStripeConfig();
    const priceId = getCatalogPriceId(productKey, config.isProduction);

    if (!priceId) {
        throw new Error(`Price ID not found for product: ${productKey}`);
    }

    return priceId;
}

/**
 * Validate that all required environment variables are set
 */
export function validateStripeConfig(): void {
    const config = getStripeConfig();

    if (!config.publishableKey) {
        throw new Error(`Missing ${config.environment} Stripe publishable key`);
    }

    if (!config.secretKey) {
        throw new Error(`Missing ${config.environment} Stripe secret key`);
    }

    // Validate product catalog
    const catalogValidation = validateProductCatalog();
    if (!catalogValidation.valid) {
        console.error('Product catalog validation errors:', catalogValidation.errors);
    }
}

/**
 * Helper to check if we're in test mode
 */
export function isTestMode(): boolean {
    const config = getStripeConfig();
    return !config.isProduction;
}

/**
 * Get environment-specific URLs
 */
export function getEnvironmentUrls() {
    const config = getStripeConfig();

    return {
        baseUrl: config.isProduction
            ? 'https://fortnite.playugc.com'
            : 'http://localhost:9002',
        successUrl: config.isProduction
            ? 'https://fortnite.playugc.com/success?session_id={CHECKOUT_SESSION_ID}'
            : 'http://localhost:9002/success?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: config.isProduction
            ? 'https://fortnite.playugc.com/cancel'
            : 'http://localhost:9002/cancel',
    };
} 