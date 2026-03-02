"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Mail, Download, Users, Clock, Trophy, Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyStripeSession, hasAssetPack, getTotalAmount, type SessionDetails } from "@/lib/session-verification";

const nextSteps = [
    {
        icon: Mail,
        title: "Complete Course Redemption",
        description: "Follow the steps above to redeem your course access using the coupon code UEFNSLOPES.",
    },
    {
        icon: Download,
        title: "Download UEFN",
        description: "Install Unreal Editor for Fortnite from Epic Games Launcher to get started building.",
    },
    {
        icon: Users,
        title: "Join the Community",
        description: "Connect with fellow creators in our exclusive Discord community for support and collaboration.",
    },
    {
        icon: Clock,
        title: "Start Learning",
        description: "Complete the 8+ hours of video content and build your first Fortnite island.",
    },
];

const courseHighlights = [
    { icon: Clock, text: "8.5 Hours of Video Content" },
    { icon: Trophy, text: "Certificate of Completion" },
    { icon: Users, text: "Lifetime Access" },
    { icon: Download, text: "Downloadable Resources" },
];

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [session, setSession] = useState<SessionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function verifySession() {
            if (!sessionId) {
                setError("No session ID found");
                setLoading(false);
                return;
            }

            try {
                const result = await verifyStripeSession(sessionId);
                if (result.success && result.session) {
                    setSession(result.session);
                } else {
                    setError(result.error || "Failed to verify session");
                }
            } catch (err) {
                setError("Failed to verify session");
            } finally {
                setLoading(false);
            }
        }

        verifySession();
    }, [sessionId]);

    // Secure email construction to prevent scraping
    const handleContactSupport = () => {
        // Email address split and encoded to prevent easy scraping
        const emailParts = [
            'mark',
            '@',
            'warforge',
            '.',
            'tech'
        ];
        const email = emailParts.join('');
        window.location.href = `mailto:${email}`;
    };

    if (loading) {
        return (
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
        );
    }

    if (error || !session) {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <main className="flex-1 max-w-screen-xl mx-auto w-full">
                    <section className="py-20 md:py-32 bg-background">
                        <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
                            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl uppercase text-primary mb-6">
                                Verification Failed
                            </h1>
                            <p className="mx-auto max-w-[700px] text-lg text-foreground/80 md:text-xl mb-8">
                                {error || "Unable to verify your purchase. Please contact support if you believe this is an error."}
                            </p>
                            <Button asChild size="lg" className="h-14 px-10 font-bold text-xl">
                                <Link href="/">Back to Homepage</Link>
                            </Button>
                        </div>
                    </section>
                </main>
            </div>
        );
    }

    const purchasedAssetPack = hasAssetPack(session);
    const totalAmount = getTotalAmount(session);
    const customerName = session.customer_details?.name || session.customer_email?.split('@')[0] || 'there';

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1 max-w-screen-xl mx-auto w-full">
                {/* Success Hero Section */}
                <section className="py-20 md:py-32 bg-background">
                    <div className="container px-4 md:px-6 max-w-screen-lg mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <CheckCircle2 className="h-20 w-20 text-[#FFD447] animate-pulse" />
                                <div className="absolute inset-0 bg-[#FFD447]/20 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        <Badge variant="secondary" className="mb-4 text-sm">
                            Welcome to the Bootcamp!
                        </Badge>

                        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl uppercase text-primary mb-6">
                            Purchase Successful!
                        </h1>

                        <p className="mx-auto max-w-[700px] text-lg text-foreground/80 md:text-xl mb-8">
                            Congratulations, {customerName}! You're now enrolled in the Fortnite UEFN Bootcamp.
                            {purchasedAssetPack && " You also purchased the Ultimate Game Asset Pack!"}
                            Your course access will be delivered to your email within the next few minutes.
                        </p>

                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                            {courseHighlights.map((highlight) => (
                                <div key={highlight.text} className="flex items-center gap-2">
                                    <highlight.icon className="h-5 w-5 text-accent" />
                                    <span className="text-sm font-medium text-muted-foreground">{highlight.text}</span>
                                </div>
                            ))}
                        </div>

                        {purchasedAssetPack && (
                            <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 max-w-md mx-auto mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <Package className="h-6 w-6 text-purple-600" />
                                    <h3 className="font-bold text-lg text-purple-800">Ultimate Game Asset Pack Included!</h3>
                                </div>
                                <p className="text-sm text-purple-700 mb-3">
                                    You'll receive access to hundreds of 3D assets, 2D UI elements, and audio files to supercharge your game development.
                                </p>
                                <a
                                    href="https://www.dropbox.com/scl/fo/83toiaw3k46e4zxoupt4m/AAoT7Svy5NAZweUzRzH_EcI?rlkey=wvg4e8ibimt13ek51u5fcmqsi&st=yg9ep8xh&dl=0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Download Asset Pack
                                </a>
                            </div>
                        )}

                        {/* Course Redemption Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
                            <h3 className="font-bold text-lg mb-4 text-blue-800">📋 Your Bootcamp Redemption Steps:</h3>
                            <p className="text-sm text-blue-700 mb-4">
                                To get started with your UEFN Bootcamp, please follow these simple steps:
                            </p>

                            <ol className="space-y-4 text-sm text-blue-700">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                    <div>
                                        <strong>Visit the Course Page:</strong> Click the button below to access your course:<br />
                                        <div className="mt-3">
                                            <a
                                                href="https://playugc.learnworlds.com/payment?product_id=fortnite&type=course&packageId=package_687fc17911808"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors text-base"
                                            >
                                                START COURSE NOW
                                            </a>
                                        </div>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                    <div>
                                        <strong>Enroll in the Course:</strong> On the course page, you'll see an "Enroll" button. Click this button to proceed.
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                    <div>
                                        <strong>Apply Your Coupon:</strong> During the checkout process, you will find a field to enter a coupon code. Please enter the following code exactly as it appears:
                                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mt-2 text-center">
                                            <strong className="text-lg text-blue-800">Coupon Code: UEFNSLOPES</strong>
                                        </div>
                                        This coupon will grant you full access to the bootcamp.
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-secondary/50 rounded-lg p-6 max-w-md mx-auto mb-8">
                            <h3 className="font-bold text-lg mb-2 text-primary">What's Next?</h3>
                            <p className="text-sm text-muted-foreground">
                                Complete the redemption steps above, then check your email for additional instructions and community access details.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Next Steps Section */}
                <section className="py-12 md:py-24 bg-secondary">
                    <div className="container max-w-4xl px-4 md:px-6 mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary mb-4">
                                Your Next Steps
                            </h2>
                            <p className="mx-auto max-w-[600px] text-lg text-foreground/80">
                                Here's everything you need to do to get started with your Fortnite UEFN journey.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {nextSteps.map((step, index) => (
                                <div key={step.title} className="flex items-start gap-4 p-6 rounded-lg bg-background/50 border border-primary/20">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#FFD447]/20 flex items-center justify-center">
                                            <step.icon className="h-6 w-6 text-[#FFD447]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-2 text-primary">
                                            {index + 1}. {step.title}
                                        </h3>
                                        <p className="text-foreground/80">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Support Section */}
                <section className="py-12 md:py-24 bg-background">
                    <div className="container max-w-2xl px-4 md:px-6 mx-auto text-center">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary mb-6">
                            Need Help?
                        </h2>
                        <p className="mx-auto max-w-[600px] text-lg text-foreground/80 mb-8">
                            Our support team is here to help you succeed. Don't hesitate to reach out if you have any questions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={handleContactSupport}
                                size="lg"
                                className="h-14 px-10 font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD447]/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
                            >
                                Contact Support
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold text-xl transition-all duration-300 hover:scale-105">
                                <Link href="/">
                                    Back to Homepage
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
} 