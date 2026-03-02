import { Suspense } from 'react';
import SuccessPage from './success-page';

export default function Page() {
    return (
        <Suspense fallback={
            <div className="flex flex-col min-h-screen bg-background">
                <main className="flex-1 max-w-screen-xl mx-auto w-full">
                    <section className="py-20 md:py-32 bg-background">
                        <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
                            <div className="animate-pulse">
                                <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto mb-6"></div>
                                <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
                                <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
                                <div className="h-6 bg-gray-300 rounded w-80 mx-auto"></div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        }>
            <SuccessPage />
        </Suspense>
    );
} 