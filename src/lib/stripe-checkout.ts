'use client';

import { useState } from 'react';
import { getStripeConfig, getEnvironmentUrls } from './stripe-config';
import { getFirebaseFunctionsConfig } from './firebase-functions-config';

export interface StripeCheckoutOptions {
  priceId: string;
  quantity?: number;
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface MultiProductCheckoutOptions {
  products: Array<{
    priceId: string;
    quantity?: number;
  }>;
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface StripeCheckoutResponse {
  success: boolean;
  sessionId?: string;
  url?: string;
  error?: string;
}

/**
 * Client-side function to initiate Stripe checkout (single product)
 * Compatible with Firebase Functions Gen 2
 */
export async function createStripeCheckoutSession(
  options: StripeCheckoutOptions
): Promise<StripeCheckoutResponse> {
  try {
    const config = getStripeConfig();
    const firebaseConfig = getFirebaseFunctionsConfig();
    const urls = getEnvironmentUrls();

    const requestBody = {
      priceId: options.priceId,
      quantity: options.quantity || 1,
      successUrl: options.successUrl || urls.successUrl,
      cancelUrl: options.cancelUrl || urls.cancelUrl,
      customerEmail: options.customerEmail,
      environment: config.environment, // Explicitly set environment in request body
      metadata: {
        ...options.metadata,
        environment: config.environment,
        source: 'frontend',
        timestamp: new Date().toISOString(),
      },
    };

    console.log('Stripe checkout request:', {
      endpoint: firebaseConfig.apiEndpoint,
      environment: config.environment,
      requestBody
    });

    const response = await fetch(firebaseConfig.apiEndpoint, {
      method: 'POST',
      headers: firebaseConfig.headers,
      body: JSON.stringify(requestBody),
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      const textResponse = await response.text();
      console.error('Raw response text:', textResponse);
      throw new Error(`Invalid JSON response from server: ${textResponse}`);
    }

    console.log('Stripe checkout response:', {
      status: response.status,
      statusText: response.statusText,
      data
    });

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Failed to create checkout session (${response.status})`;
      throw new Error(errorMessage);
    }

    return {
      success: true,
      sessionId: data.id,
      url: data.url,
    };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Client-side function to initiate Stripe checkout (multiple products)
 * For upsell scenarios with bootcamp + asset pack
 */
export async function createMultiProductStripeCheckoutSession(
  options: MultiProductCheckoutOptions
): Promise<StripeCheckoutResponse> {
  try {
    const config = getStripeConfig();
    const firebaseConfig = getFirebaseFunctionsConfig();
    const urls = getEnvironmentUrls();

    const requestBody = {
      products: options.products,
      successUrl: options.successUrl || urls.successUrl,
      cancelUrl: options.cancelUrl || urls.cancelUrl,
      customerEmail: options.customerEmail,
      environment: config.environment,
      metadata: {
        ...options.metadata,
        environment: config.environment,
        source: 'frontend',
        checkout_type: 'multi_product',
        timestamp: new Date().toISOString(),
      },
    };

    console.log('Multi-product Stripe checkout request:', {
      endpoint: firebaseConfig.apiEndpoint,
      environment: config.environment,
      requestBody
    });

    const response = await fetch(firebaseConfig.apiEndpoint, {
      method: 'POST',
      headers: firebaseConfig.headers,
      body: JSON.stringify(requestBody),
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      const textResponse = await response.text();
      console.error('Raw response text:', textResponse);
      throw new Error(`Invalid JSON response from server: ${textResponse}`);
    }

    console.log('Multi-product Stripe checkout response:', {
      status: response.status,
      statusText: response.statusText,
      data
    });

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Failed to create checkout session (${response.status})`;
      throw new Error(errorMessage);
    }

    return {
      success: true,
      sessionId: data.id,
      url: data.url,
    };
  } catch (error) {
    console.error('Multi-product Stripe checkout error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Redirect to Stripe checkout (single product)
 */
export async function redirectToStripeCheckout(options: StripeCheckoutOptions): Promise<void> {
  const result = await createStripeCheckoutSession(options);

  if (result.success && result.url) {
    window.location.href = result.url;
  } else {
    throw new Error(result.error || 'Failed to create checkout session');
  }
}

/**
 * Redirect to Stripe checkout (multiple products)
 */
export async function redirectToMultiProductStripeCheckout(options: MultiProductCheckoutOptions): Promise<void> {
  const result = await createMultiProductStripeCheckoutSession(options);

  if (result.success && result.url) {
    window.location.href = result.url;
  } else {
    throw new Error(result.error || 'Failed to create checkout session');
  }
}

/**
 * Open Stripe checkout in a new window/tab (single product)
 */
export async function openStripeCheckout(options: StripeCheckoutOptions): Promise<void> {
  const result = await createStripeCheckoutSession(options);

  if (result.success && result.url) {
    window.open(result.url, '_blank', 'noopener,noreferrer');
  } else {
    throw new Error(result.error || 'Failed to create checkout session');
  }
}

/**
 * Open Stripe checkout in a new window/tab (multiple products)
 */
export async function openMultiProductStripeCheckout(options: MultiProductCheckoutOptions): Promise<void> {
  const result = await createMultiProductStripeCheckoutSession(options);

  if (result.success && result.url) {
    window.open(result.url, '_blank', 'noopener,noreferrer');
  } else {
    throw new Error(result.error || 'Failed to create checkout session');
  }
}

/**
 * React hook for Stripe checkout (alternative approach)
 */
export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (options: StripeCheckoutOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createStripeCheckoutSession(options);

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error || 'Checkout failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
}
