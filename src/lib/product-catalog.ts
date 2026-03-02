/**
 * Product Catalog Management
 * Best practice approach for managing Stripe products and prices
 */

export interface Product {
    id: string;
    name: string;
    description?: string;
    prices: {
        test: string;    // Test price ID
        live: string;    // Live price ID
    };
    metadata?: Record<string, string>;
    features?: string[];
    active: boolean;
}

/**
 * Product Catalog - Single source of truth for all products
 * This is where you define your product structure
 */
export const PRODUCT_CATALOG: Record<string, Product> = {
    bootcamp: {
        id: 'bootcamp',
        name: 'UEFN Bootcamp',
        description: 'Complete Fortnite UEFN Bootcamp Course',
        prices: {
            test: 'price_1Ro8S9FLURkqo4dLeu01uHxi',  // Sandbox price ID for prod_ShOgeKLdguhjPU
            live: 'price_1Ro8MrFE18Yjant94CAUAZPA',  // Production price ID for prod_ShjPO9Ji9fuVcF
        },
        features: [
            '8.5+ hours of video content',
            'Complete UEFN mastery',
            'Island publishing strategies',
            'Exclusive Discord community',
            'Lifetime access',
            'Certificate of completion',
        ],
        active: true,
    },

    asset_pack: {
        id: 'asset_pack',
        name: 'Ultimate Game Asset Pack',
        description: 'Complete game asset collection for Fortnite creators',
        prices: {
            test: 'price_1RnjyVFLURkqo4dLwJrFURoj',  // Sandbox/test price ID
            live: 'price_1RnjzUFE18Yjant9nrr62Eyc',  // Live/production price ID
        },
        features: [
            'Hundreds of 3D game assets',
            '2D UI elements and HUD components',
            'Audio files and sound effects',
            'Complete starter kit for game development',
            'Worth over $750 in value',
            'Exclusive to bootcamp students',
        ],
        metadata: {
            category: 'assets',
            upsell: 'true',
            original_value: '750',
            product_id_test: 'prod_SjCNtKKavRYwGL',
            product_id_live: 'prod_SjCOgtlRF1USTC',
        },
        active: true,
    },
};

/**
 * Get product by ID
 */
export function getProduct(productId: string): Product | null {
    return PRODUCT_CATALOG[productId] || null;
}

/**
 * Get all active products
 */
export function getActiveProducts(): Product[] {
    return Object.values(PRODUCT_CATALOG).filter(product => product.active);
}

/**
 * Get price ID for current environment
 */
export function getPriceId(productId: string, isProduction: boolean = false): string | null {
    const product = getProduct(productId);
    if (!product) return null;

    return isProduction ? product.prices.live : product.prices.test;
}

/**
 * Validate that all products have both test and live price IDs
 */
export function validateProductCatalog(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const [id, product] of Object.entries(PRODUCT_CATALOG)) {
        if (!product.prices.test) {
            errors.push(`Product ${id} missing test price ID`);
        }
        if (!product.prices.live) {
            errors.push(`Product ${id} missing live price ID`);
        }
        if (product.prices.test === product.prices.live) {
            console.warn(`⚠️  Product ${id} has same test and live price ID - this might be intentional`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Generate a product catalog report
 */
export function generateProductReport(): string {
    let report = '# Product Catalog Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;

    for (const [id, product] of Object.entries(PRODUCT_CATALOG)) {
        report += `## ${product.name} (${id})\n`;
        report += `**Status:** ${product.active ? '✅ Active' : '❌ Inactive'}\n`;
        if (product.description) {
            report += `**Description:** ${product.description}\n`;
        }
        report += `**Test Price ID:** \`${product.prices.test}\`\n`;
        report += `**Live Price ID:** \`${product.prices.live}\`\n`;

        if (product.features && product.features.length > 0) {
            report += `**Features:**\n`;
            for (const feature of product.features) {
                report += `- ${feature}\n`;
            }
        }
        report += '\n';
    }

    return report;
} 