'use client';

import { Button } from "@/components/ui/button";
import { getPriceId, getEnvironmentUrls, isTestMode } from "@/lib/stripe-config";
import { redirectToStripeCheckout } from "@/lib/stripe-checkout";
import { useUpsell } from "@/hooks/use-upsell";
import { useState } from "react";

interface EnvironmentAwareCheckoutButtonProps {
    productKey: 'bootcamp' | 'asset_pack'; // Add more products as needed
    quantity?: number;
    customerEmail?: string;
    metadata?: Record<string, string>;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function EnvironmentAwareCheckoutButton({
    productKey,
    quantity = 1,
    customerEmail,
    metadata = {},
    children,
    className,
    disabled = false,
    variant = 'default',
    size = 'default',
}: EnvironmentAwareCheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { openUpsell } = useUpsell();

    const handleCheckout = async () => {
        // For bootcamp product, show upsell popup first
        if (productKey === 'bootcamp') {
            openUpsell();
            return;
        }

        // For other products (like asset_pack), proceed directly to checkout
        setIsLoading(true);
        setError(null);

        try {
            const priceId = getPriceId(productKey);
            const urls = getEnvironmentUrls();

            // Add environment info to metadata
            const enhancedMetadata = {
                ...metadata,
                product: productKey,
                environment: isTestMode() ? 'test' : 'production',
            };

            await redirectToStripeCheckout({
                priceId,
                quantity,
                successUrl: urls.successUrl,
                cancelUrl: urls.cancelUrl,
                customerEmail,
                metadata: enhancedMetadata,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Checkout failed');
            console.error('Checkout error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button
                onClick={handleCheckout}
                disabled={disabled || isLoading}
                className={className}
                variant={variant}
                size={size}
            >
                {isLoading ? 'Processing...' : children}
            </Button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
} 