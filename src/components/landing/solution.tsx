'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { redirectToStripeCheckout } from "@/lib/stripe-checkout";
import { getPriceId } from "@/lib/product-catalog";
import { getStripeConfig } from "@/lib/stripe-config";
import { useUpsell } from "@/hooks/use-upsell";

const benefits = [
    "Publish a complete Fortnite island—from first block-out to live release—using UEFN's built-in workflow.",
    "Sculpt terrain, place assets, & light worlds to create visually rich, console-ready environments.",
    "Create gameplay with Verse & devices, adding enemy NPCs, checkpoints, win conditions, and XP rewards.",
    "Produce cinematic cut-scenes with Sequencer, plus custom music, SFX, and materials for polish.",
    "Leverage AI tools to generate level ideas, 3-D meshes, concept art, and high-click thumbnails.",
    "Optimize memory, analytics, & matchmaking to retain players and unlock higher revenue tiers.",
    "Navigate UEFN like a pro: viewport, transforms, layers & world partition.",
    "Sculpt landscapes, add water volumes, and light vibrant Fortnite-style worlds.",
    "Use thousands of free assets, including tools themed after LEGO, TMNT, Squid Game & The Walking Dead.",
    "Produce cinematic end-game cutscenes with the Sequencer device.",
    "Spawn and script enemy NPCs for PvE and survival challenges.",
    "Leverage AI & ChatGPT for game and level design, concept art, thumbnails, and ideation.",
    "Generate custom 3D meshes with AI and import them into your island.",
    "Configure gameplay devices: Round Manager, Scoreboards, Mutator Zones, Volume triggers.",
    "Design an Oddly Obby parkour game start-to-finish, with checkpoints & XP rewards.",
    "Create custom materials, plus adaptive music and SFX for immersive audio.",
    "Keep players engaged with smart XP loops, metadata ratings, and lobby images.",
    "Apply straightforward island-marketing tips to boost discovery.",
    "Optimize memory & performance for smooth console and mobile play.",
    "Publish your island and set up Epic payout credentials.",
];

const extraHighlights = [
    {
        type: 'image',
        src: '/images/lego-peely.png',
        alt: 'Lego Peely character',
        text: "Build inside official Fortnite crossovers—from LEGO escape rooms to TMNT sewer battles—using 100% legal IP content."
    },
    {
        type: 'image',
        src: '/images/uefn-logo.png',
        alt: 'UEFN Logo',
        text: "Additional Extra Verse programming section at the end for those who want to build crazy things!"
    }
]

export default function Solution() {
    const { openUpsell } = useUpsell();

    const handleEnroll = () => {
        openUpsell();
    };

    return (
        <section id="solution" className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <Badge variant="secondary" className="mb-4 text-sm">
                        The Solution
                    </Badge>
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary">
                        Introducing Fortnite UEFN Bootcamp: Your Fast Track to Building, Publishing, and Earning from Pro Islands
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
                        Welcome to the fastest on-ramp into Fortnite game creation. Epic Games has already paid creators over $700 million for fun, engaging islands—now it's your turn to step onto the stage with UEFN (Unreal Editor for Fortnite). In this hands-on bootcamp, veteran developer Mark Price—developer on hit Fortnite maps like SUPER Red vs Blue—guides you from total beginner to published creator.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg shadow-primary/10">
                        <img
                            src="/images/ninja-turtles.png"
                            alt="Screenshot of an Obby parkour game in UEFN"
                            className="w-full h-full object-cover"
                            data-ai-hint="fortnite obby"
                        />
                    </div>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg shadow-primary/10">
                        <img
                            src="/images/lego-uefn.png"
                            alt="Screenshot of a cinematic scene in UEFN"
                            className="w-full h-full object-cover"
                            data-ai-hint="fortnite cinematic"
                        />
                    </div>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg shadow-primary/10 md:col-span-2 lg:col-span-1">
                        <img
                            src="/images/creator-payment.png"
                            alt="Screenshot of AI tools being used for UEFN"
                            className="w-full h-full object-cover"
                            data-ai-hint="fortnite ai"
                        />
                    </div>
                </div>

                <div className="mt-16 grid gap-4 md:grid-cols-2">
                    {benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-3 p-4 rounded-md border border-primary/20 bg-background/50 hover:border-primary/40 transition-colors duration-200">
                            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <p className="text-foreground/80">{benefit}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {extraHighlights.map((highlight) => (
                        <div key={highlight.text} className="flex items-start gap-4 rounded-lg border border-primary/20 bg-secondary p-4">
                            <img
                                src={highlight.src}
                                alt={highlight.alt}
                                width={75}
                                height={75}
                                className="mt-1 flex-shrink-0 rounded-full"
                            />
                            <p className="text-lg font-semibold">{highlight.text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        onClick={handleEnroll}
                        size="lg"
                        className="h-14 px-10 font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD447]/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
                    >
                        Get Instant Access for Just $37
                    </Button>
                </div>
            </div>
        </section>
    );
}