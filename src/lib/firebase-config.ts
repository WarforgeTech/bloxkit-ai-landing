/**
 * Firebase-specific configuration helpers
 * Ensures proper environment detection in Firebase deployments
 */

/**
 * Check if we're running in Firebase production environment
 */
export function isFirebaseProduction(): boolean {
    // Firebase Hosting sets these environment variables
    const isFirebaseHosting = typeof process !== 'undefined' && process.env.FIREBASE_ENV;
    const isProductionHosting = process.env.FIREBASE_ENV === 'production';

    // Check for other Firebase production indicators
    const hasProductionUrl = typeof window !== 'undefined' &&
        (window.location.hostname.includes('yourdomain.com') ||
            window.location.hostname.includes('firebaseapp.com'));

    // Check for explicit environment override
    const forceProduction = process.env.STRIPE_ENVIRONMENT === 'production';

    return forceProduction || isProductionHosting || hasProductionUrl;
}

/**
 * Get Firebase-specific environment configuration
 */
export function getFirebaseEnvironmentConfig() {
    const isProduction = isFirebaseProduction();

    return {
        isProduction,
        environment: isProduction ? 'production' : 'development',
        // Add any Firebase-specific config here
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        firebaseEnv: process.env.FIREBASE_ENV,
    };
}

/**
 * Validate Firebase environment setup
 */
export function validateFirebaseEnvironment(): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];
    const config = getFirebaseEnvironmentConfig();

    if (!config.isProduction && typeof window !== 'undefined') {
        // Check if we're on a production-like URL but not in production mode
        const hostname = window.location.hostname;
        if (hostname.includes('firebaseapp.com') && !hostname.includes('localhost')) {
            warnings.push('⚠️  App appears to be on Firebase Hosting but not in production mode');
            warnings.push('   Consider setting STRIPE_ENVIRONMENT=production');
        }
    }

    return {
        valid: true,
        warnings,
    };
} 