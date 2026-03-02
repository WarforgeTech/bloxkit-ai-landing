/**
 * Firebase Functions Gen 2 Configuration
 * Handles environment-specific API endpoints and headers for Firebase Functions Gen 2
 */

import { getStripeConfig } from './stripe-config';

export interface FirebaseFunctionsConfig {
    apiEndpoint: string;
    headers: Record<string, string>;
    environment: 'development' | 'production';
    isProduction: boolean;
}

/**
 * Get Firebase Functions Gen 2 configuration
 * Supports proper secret management through Firebase CLI
 */
export function getFirebaseFunctionsConfig(): FirebaseFunctionsConfig {
    const stripeConfig = getStripeConfig();

    // Get API endpoint based on environment
    const apiEndpoint = getApiEndpoint();

    // Standard headers for Firebase Functions Gen 2
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Add any custom headers from environment variables
    const customHeaders = process.env.NEXT_PUBLIC_API_HEADERS;
    if (customHeaders) {
        try {
            const parsedHeaders = JSON.parse(customHeaders);
            Object.assign(headers, parsedHeaders);
        } catch (error) {
            console.warn('Failed to parse custom API headers:', error);
        }
    }

    return {
        apiEndpoint,
        headers,
        environment: stripeConfig.environment,
        isProduction: stripeConfig.isProduction,
    };
}

/**
 * Get the appropriate API endpoint based on environment
 */
function getApiEndpoint(): string {
    // Check for explicit API endpoint override
    const customEndpoint = process.env.NEXT_PUBLIC_STRIPE_API_ENDPOINT;
    if (customEndpoint) {
        return customEndpoint;
    }

    // Single API endpoint for both development and production
    return process.env.NEXT_PUBLIC_API_ENDPOINT ||
        'https://stripecheckoutsession-fg73st64ka-uc.a.run.app';
}

/**
 * Validate Firebase Functions Gen 2 configuration
 */
export function validateFirebaseFunctionsConfig(): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];
    const config = getFirebaseFunctionsConfig();

    // Check if API endpoint is configured
    if (!process.env.NEXT_PUBLIC_API_ENDPOINT && !process.env.NEXT_PUBLIC_STRIPE_API_ENDPOINT) {
        warnings.push('⚠️  No API endpoint configured. Using default.');
    }

    // Check if endpoints are accessible (basic URL validation)
    try {
        new URL(config.apiEndpoint);
    } catch (error) {
        warnings.push('⚠️  Invalid API endpoint URL format.');
    }

    return {
        valid: warnings.length === 0,
        warnings,
    };
}

/**
 * Generate a configuration report for debugging
 */
export function generateFirebaseFunctionsReport(): string {
    const config = getFirebaseFunctionsConfig();
    const validation = validateFirebaseFunctionsConfig();

    let report = '# Firebase Functions Gen 2 Configuration Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;

    report += `## Environment\n`;
    report += `- **Current Environment:** ${config.environment}\n`;
    report += `- **Is Production:** ${config.isProduction}\n`;
    report += `- **API Endpoint:** ${config.apiEndpoint}\n\n`;

    report += `## Headers\n`;
    for (const [key, value] of Object.entries(config.headers)) {
        report += `- **${key}:** ${value}\n`;
    }
    report += '\n';

    report += `## Validation\n`;
    report += `- **Valid:** ${validation.valid ? '✅' : '❌'}\n`;
    if (validation.warnings.length > 0) {
        report += `- **Warnings:**\n`;
        for (const warning of validation.warnings) {
            report += `  - ${warning}\n`;
        }
    }

    return report;
} 