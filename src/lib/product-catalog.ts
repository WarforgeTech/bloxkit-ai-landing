export type ProductKey = 'bloxkit_ai_template' | 'bloxkit_ai_updates';

export type Product = {
    key: ProductKey;
    name: string;
    description: string;
    priceId?: string;
    features: string[];
};

/**
 * NOTE:
 * - Price IDs are injected via env or set during Stripe setup.
 * - Keep this catalog marketing-accurate. Don’t promise features we don’t ship.
 */
export const PRODUCTS: Record<ProductKey, Product> = {
    bloxkit_ai_template: {
        key: 'bloxkit_ai_template',
        name: 'BloxKit AI Template (Roblox)',
        description: 'AI-assisted Roblox game template with Rojo + MCP-first runtime testing.',
        // priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TEMPLATE,
        features: [
            'Batteries-included Rojo project structure (server/client/shared)',
            'Automation + validation: one command to build and verify',
            'MCP-first runtime smoke tests (play session + logs capture)',
            'Guides for Repo AI (Codex/Claude Code) vs Studio AI (Roblox Assistant)',
            'Designed to keep architecture clean while moving fast',
        ],
    },

    bloxkit_ai_updates: {
        key: 'bloxkit_ai_updates',
        name: 'BloxKit AI Updates (Optional)',
        description: 'Optional updates/support track for new releases and improvements.',
        // priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_UPDATES,
        features: [
            'Template updates + improvements',
            'New workflow docs as Roblox tooling evolves',
            'Priority fixes for template issues',
        ],
    },
};

export function getProduct(key: ProductKey): Product {
    return PRODUCTS[key];
}
