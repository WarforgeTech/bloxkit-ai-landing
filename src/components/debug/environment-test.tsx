'use client';

import { useEffect, useState } from 'react';
import { getStripeConfig } from '@/lib/stripe-config';
import { getFirebaseEnvironmentConfig, validateFirebaseEnvironment } from '@/lib/firebase-config';
import { getPriceId } from '@/lib/product-catalog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export function EnvironmentTest() {
    const [environmentInfo, setEnvironmentInfo] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Collect all environment information
        const info = {
            // Stripe configuration
            stripeConfig: getStripeConfig(),

            // Firebase environment
            firebaseConfig: getFirebaseEnvironmentConfig(),

            // Environment variables
            envVars: {
                NODE_ENV: process.env.NODE_ENV,
                STRIPE_ENVIRONMENT: process.env.STRIPE_ENVIRONMENT,
                FIREBASE_ENV: process.env.FIREBASE_ENV,
                VERCEL_ENV: process.env.VERCEL_ENV,
            },

            // Product information
            bootcampPriceId: getPriceId('bootcamp'),

            // Browser information
            browser: {
                hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
                url: typeof window !== 'undefined' ? window.location.href : 'server',
                userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
            },

            // Validation results
            firebaseValidation: validateFirebaseEnvironment(),

            // Timestamp
            timestamp: new Date().toISOString(),
        };

        setEnvironmentInfo(info);

        // Log to console for debugging - REMOVED FOR PRODUCTION
        // console.log('🔍 Environment Test Results:', info);
        // console.log('🎯 Current Stripe Environment:', info.stripeConfig.environment);
        // console.log('💰 Bootcamp Price ID:', info.bootcampPriceId);
        // console.log('🏗️ Firebase Environment:', info.firebaseConfig.environment);

    }, []);

    if (!environmentInfo) {
        return null; // Don't show loading state in production
    }

    const isProduction = environmentInfo.stripeConfig.isProduction;
    const hasWarnings = environmentInfo.firebaseValidation.warnings.length > 0;

    // Hide completely in production
    if (isProduction) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Show red TESTING MODE button only in dev mode */}
            <Button
                variant="destructive"
                size="sm"
                className="mb-2 bg-red-600 hover:bg-red-700 text-white font-bold"
                disabled
            >
                TESTING MODE
            </Button>

            {/* Environment Info Panel */}
            {isVisible && (
                <Card className="w-96 max-h-96 overflow-y-auto">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Environment Test
                            <Badge variant="secondary">
                                DEVELOPMENT
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-xs">

                        {/* Stripe Configuration */}
                        <div>
                            <h4 className="font-semibold mb-1">Stripe Config:</h4>
                            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                                <div>Environment: {environmentInfo.stripeConfig.environment}</div>
                                <div>Is Production: {environmentInfo.stripeConfig.isProduction ? '✅ Yes' : '❌ No'}</div>
                                <div>Price ID: {environmentInfo.bootcampPriceId}</div>
                            </div>
                        </div>

                        {/* Firebase Configuration */}
                        <div>
                            <h4 className="font-semibold mb-1">Firebase Config:</h4>
                            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                                <div>Environment: {environmentInfo.firebaseConfig.environment}</div>
                                <div>Is Production: {environmentInfo.firebaseConfig.isProduction ? '✅ Yes' : '❌ No'}</div>
                                <div>Project ID: {environmentInfo.firebaseConfig.firebaseProjectId || 'Not set'}</div>
                            </div>
                        </div>

                        {/* Environment Variables */}
                        <div>
                            <h4 className="font-semibold mb-1">Environment Variables:</h4>
                            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                                {Object.entries(environmentInfo.envVars).map(([key, value]) => {
                                    const displayValue =
                                        value == null
                                            ? 'undefined'
                                            : typeof value === 'string'
                                                ? value
                                                : JSON.stringify(value);

                                    return (
                                        <div key={key}>
                                            {key}: {displayValue}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Browser Information */}
                        <div>
                            <h4 className="font-semibold mb-1">Browser Info:</h4>
                            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                                <div>Hostname: {environmentInfo.browser.hostname}</div>
                                <div>URL: {environmentInfo.browser.url}</div>
                            </div>
                        </div>

                        {/* Warnings */}
                        {hasWarnings && (
                            <div>
                                <h4 className="font-semibold mb-1 text-orange-600 flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    Warnings:
                                </h4>
                                <div className="bg-orange-50 p-2 rounded text-xs">
                                    {environmentInfo.firebaseValidation.warnings.map((warning: string, index: number) => (
                                        <div key={index} className="text-orange-700">{warning}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Timestamp */}
                        <div className="text-gray-500 text-xs">
                            Generated: {environmentInfo.timestamp}
                        </div>

                    </CardContent>
                </Card>
            )}
        </div>
    );
} 