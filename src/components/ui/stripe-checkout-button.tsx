'use client';

import { Button } from './button';
import { redirectToStripeCheckout, openStripeCheckout, useStripeCheckout } from '@/lib/stripe-checkout';
import { useState } from 'react';

interface StripeCheckoutButtonProps {
    priceId: string;
    quantity?: number;
    successUrl?: string;
    cancelUrl?: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
    variant?: 'redirect' | 'popup';
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export function StripeCheckoutButton({
    priceId,
    quantity = 1,
    successUrl,
    cancelUrl,
    customerEmail,
    metadata,
    variant = 'redirect',
    children,
    className,
    disabled = false,
}: StripeCheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const options = {
                priceId,
                quantity,
                successUrl,
                cancelUrl,
                customerEmail,
                metadata,
            };

            if (variant === 'popup') {
                await openStripeCheckout(options);
            } else {
                await redirectToStripeCheckout(options);
            }
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
            >
                {isLoading ? 'Processing...' : children}
            </Button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}

// Alternative hook-based component
export function StripeCheckoutButtonWithHook({
    priceId,
    quantity = 1,
    successUrl,
    cancelUrl,
    customerEmail,
    metadata,
    children,
    className,
    disabled = false,
}: Omit<StripeCheckoutButtonProps, 'variant'>) {
    const { checkout, isLoading, error } = useStripeCheckout();

    const handleCheckout = () => {
        checkout({
            priceId,
            quantity,
            successUrl,
            cancelUrl,
            customerEmail,
            metadata,
        });
    };

    return (
        <div>
            <Button
                onClick={handleCheckout}
                disabled={disabled || isLoading}
                className={className}
            >
                {isLoading ? 'Processing...' : children}
            </Button>
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
} 