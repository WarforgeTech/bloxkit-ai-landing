import { getFirebaseFunctionsConfig } from './firebase-functions-config';
import { getStripeConfig } from './stripe-config';

export interface SessionDetails {
    id: string;
    payment_status: string;
    customer_email?: string;
    customer_details?: {
        name?: string;
        email?: string;
    };
    line_items?: {
        data: Array<{
            price: {
                id: string;
                product: string;
                unit_amount: number;
                currency: string;
            };
            quantity: number;
            description?: string;
        }>;
    };
    metadata?: Record<string, string>;
}

export interface SessionVerificationResponse {
    success: boolean;
    session?: SessionDetails;
    error?: string;
}

/**
 * Verify a Stripe checkout session and get purchase details
 */
export async function verifyStripeSession(sessionId: string): Promise<SessionVerificationResponse> {
    try {
        const config = getStripeConfig();
        const firebaseConfig = getFirebaseFunctionsConfig();

        const requestBody = {
            sessionId,
            environment: config.environment,
        };

        console.log('Verifying session:', sessionId);

        // Construct the correct verifySession endpoint
        const verifySessionEndpoint = firebaseConfig.apiEndpoint.replace('stripecheckoutsession', 'verifysession');

        const response = await fetch(verifySessionEndpoint, {
            method: 'POST',
            headers: firebaseConfig.headers,
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.error || `Failed to verify session (${response.status})`);
        }

        return data;
    } catch (error) {
        console.error('Session verification error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to verify session',
        };
    }
}

/**
 * Check if a session includes the asset pack
 */
export function hasAssetPack(session: SessionDetails): boolean {
    // First check metadata (preferred method used by webhook)
    if (session.metadata) {
        const hasAssetPackFromMetadata = session.metadata.product === 'bootcamp_with_asset_pack' ||
            session.metadata.upsell_accepted === 'true' ||
            session.metadata.checkout_type === 'multi_product';

        if (hasAssetPackFromMetadata) {
            return true;
        }
    }

    // Fallback: Check if there are multiple line items (bootcamp + asset pack)
    if (session.line_items?.data) {
        return session.line_items.data.length > 1;
    }

    return false;
}

/**
 * Get the total amount paid in dollars
 */
export function getTotalAmount(session: SessionDetails): number {
    if (!session.line_items?.data) return 0;

    return session.line_items.data.reduce((total, item) => {
        return total + (item.price.unit_amount * item.quantity) / 100; // Convert cents to dollars
    }, 0);
} 