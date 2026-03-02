/**
 * Stripe Migration Helper
 * Assists with migrating products from test to production environment
 */

import Stripe from 'stripe';
import { getStripeConfig } from './stripe-config';

interface ProductMigrationData {
    name: string;
    description?: string;
    prices: {
        amount: number;
        currency: string;
        recurring?: {
            interval: 'day' | 'week' | 'month' | 'year';
            interval_count?: number;
        };
        metadata?: Record<string, string>;
    }[];
    metadata?: Record<string, string>;
    images?: string[];
    features?: string[];
}

/**
 * Get all products and prices from test environment
 * Use this to document your test setup before migrating
 */
export async function exportTestProducts(): Promise<ProductMigrationData[]> {
    const config = getStripeConfig();

    // Force test mode for export
    const testStripe = new Stripe(config.secretKey, {
        // Keep in sync with the installed stripe SDK types
        apiVersion: '2025-06-30.basil',
    });

    try {
        const products = await testStripe.products.list({ limit: 100 });
        const migrationData: ProductMigrationData[] = [];

        for (const product of products.data) {
            const prices = await testStripe.prices.list({
                product: product.id,
                limit: 100,
            });

            migrationData.push({
                name: product.name,
                description: product.description || undefined,
                prices: prices.data.map(price => ({
                    amount: price.unit_amount || 0,
                    currency: price.currency,
                    recurring: price.recurring ? {
                        interval: price.recurring.interval,
                        interval_count: price.recurring.interval_count,
                    } : undefined,
                    metadata: price.metadata,
                })),
                metadata: product.metadata,
                images: product.images || undefined,
                // Stripe Product does not expose "features" in the public API/types.
                // Keep this field for internal documentation only (populate manually if desired).
                features: undefined,
            });
        }

        return migrationData;
    } catch (error) {
        console.error('Error exporting test products:', error);
        throw error;
    }
}

/**
 * Create products in production environment based on migration data
 * WARNING: This will create real products in your live Stripe account
 */
export async function createProductionProducts(
    migrationData: ProductMigrationData[]
): Promise<{ productId: string; priceIds: string[] }[]> {
    const config = getStripeConfig();

    // Force production mode
    const liveStripe = new Stripe(config.secretKey, {
        // Keep in sync with the installed stripe SDK types
        apiVersion: '2025-06-30.basil',
    });

    const results: { productId: string; priceIds: string[] }[] = [];

    for (const productData of migrationData) {
        try {
            // Create product
            const product = await liveStripe.products.create({
                name: productData.name,
                description: productData.description,
                metadata: productData.metadata,
                images: productData.images,
            });

            const priceIds: string[] = [];

            // Create prices for the product
            for (const priceData of productData.prices) {
                const price = await liveStripe.prices.create({
                    product: product.id,
                    unit_amount: priceData.amount,
                    currency: priceData.currency,
                    recurring: priceData.recurring,
                    metadata: priceData.metadata,
                });

                priceIds.push(price.id);
            }

            results.push({
                productId: product.id,
                priceIds,
            });

            // console.log(`✅ Created product: ${product.name} (${product.id})`); // REMOVED FOR PRODUCTION
            // console.log(`   Prices: ${priceIds.join(', ')}`); // REMOVED FOR PRODUCTION
        } catch (error) {
            console.error(`❌ Failed to create product: ${productData.name}`, error);
        }
    }

    return results;
}

/**
 * Generate a migration report comparing test and production
 */
export async function generateMigrationReport(): Promise<string> {
    const testProducts = await exportTestProducts();

    let report = '# Stripe Migration Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;

    report += '## Test Environment Products\n\n';

    for (const product of testProducts) {
        report += `### ${product.name}\n`;
        if (product.description) {
            report += `**Description:** ${product.description}\n`;
        }
        report += `**Prices:**\n`;

        for (const price of product.prices) {
            const amount = (price.amount / 100).toFixed(2);
            const currency = price.currency.toUpperCase();
            report += `- ${currency} ${amount}`;

            if (price.recurring) {
                report += ` (${price.recurring.interval_count || 1} ${price.recurring.interval}${price.recurring.interval_count && price.recurring.interval_count > 1 ? 's' : ''})`;
            }
            report += '\n';
        }
        report += '\n';
    }

    report += '## Migration Steps\n\n';
    report += '1. Go to [Stripe Dashboard](https://dashboard.stripe.com)\n';
    report += '2. Switch to **Live Mode**\n';
    report += '3. Create products manually or use the migration helper\n';
    report += '4. Update your configuration with new price IDs\n';
    report += '5. Test thoroughly before going live\n\n';

    return report;
}

/**
 * Validate that all required products exist in production
 */
export async function validateProductionSetup(
    expectedProducts: { name: string; priceCount: number }[]
): Promise<{ valid: boolean; missing: string[]; extra: string[] }> {
    const config = getStripeConfig();
    const liveStripe = new Stripe(config.secretKey, {
        // Keep in sync with the installed stripe SDK types
        apiVersion: '2025-06-30.basil',
    });

    try {
        const products = await liveStripe.products.list({ limit: 100 });
        const productNames = products.data.map(p => p.name);

        const missing: string[] = [];
        const extra: string[] = [];

        // Check for missing products
        for (const expected of expectedProducts) {
            if (!productNames.includes(expected.name)) {
                missing.push(expected.name);
            }
        }

        // Check for extra products
        for (const product of products.data) {
            const isExpected = expectedProducts.some(e => e.name === product.name);
            if (!isExpected) {
                extra.push(product.name);
            }
        }

        return {
            valid: missing.length === 0,
            missing,
            extra,
        };
    } catch (error) {
        console.error('Error validating production setup:', error);
        throw error;
    }
}