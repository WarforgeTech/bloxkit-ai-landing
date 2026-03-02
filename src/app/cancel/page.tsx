'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CancelPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Get error message from URL params if it exists
        const errorMessage = searchParams.get('error');

        // Redirect to homepage with error message as URL parameter
        const redirectUrl = errorMessage
            ? `/?canceled=true&error=${encodeURIComponent(errorMessage)}`
            : '/?canceled=true';

        router.push(redirectUrl);
    }, [router, searchParams]);

    // Show a simple loading message while redirecting
    return (
        <div className="flex flex-col min-h-screen bg-background items-center justify-center">
            <div className="text-center">
                <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl uppercase text-primary mb-4">
                    Redirecting...
                </h1>
                <p className="text-foreground/80">
                    You will be redirected back to the homepage shortly.
                </p>
            </div>
        </div>
    );
}

export default function CancelPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col min-h-screen bg-background items-center justify-center">
                <div className="text-center">
                    <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl uppercase text-primary mb-4">
                        Loading...
                    </h1>
                    <p className="text-foreground/80">
                        Please wait while we process your request.
                    </p>
                </div>
            </div>
        }>
            <CancelPageContent />
        </Suspense>
    );
} 