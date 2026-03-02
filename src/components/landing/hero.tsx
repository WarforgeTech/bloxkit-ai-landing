"use client"
import ReactPlayer from 'react-player';
import { Button } from "@/components/ui/button";
// import { PlayCircle } from 'lucide-react'; // Assuming PlayCircle is used elsewhere if not here
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clapperboard, Code2, Infinity, Trophy } from "lucide-react";
import { EnvironmentAwareCheckoutButton } from "@/components/ui/environment-aware-checkout-button";

const trustElements = [
    { icon: Clapperboard, text: "8.5 Hours of On-Demand Video" },
    { icon: Infinity, text: "Lifetime Access" },
    { icon: Trophy, text: "Certificate of Completion" },
    { icon: Code2, text: "No Coding Required" },
];

export default function Hero() {
    return (
        <section id="hero" className="py-8 md:py-20 lg:py-32 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <Badge variant="secondary" className="mb-3 md:mb-4 text-sm">
                            From Passion to Paycheck
                        </Badge>
                        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl uppercase text-primary">
                            MAKE FORTNITE GAMES EARN REAL MONEY
                        </h1>
                        <p className="mx-auto mt-4 md:mt-6 max-w-[700px] text-sm md:text-lg italic md:not-italic text-foreground/80 md:text-xl lg:mx-0">
                            Master Unreal Editor for Fortnite: world-building, devices, gameplay & monetization—no coding
                            experience required.
                        </p>

                        {/* Mobile: Video goes here, below subtitle */}
                        <div className="w-full aspect-video overflow-hidden rounded-xl shadow-xl mt-6 lg:hidden">
                            <ReactPlayer
                                src='https://www.youtube.com/watch?v=d7UQmvmetYQ'
                                width='100%'
                                height='100%'
                                controls={true}
                            />
                        </div>

                        <div className="mt-6 md:mt-8">
                            <EnvironmentAwareCheckoutButton
                                productKey="bootcamp"
                                quantity={1}
                                metadata={{
                                    source: 'hero',
                                    product: 'bootcamp',
                                }}
                                size="lg"
                                className="h-14 px-10 font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
                            >
                                Enroll Now for $37 (Save $300+)
                            </EnvironmentAwareCheckoutButton>
                        </div>
                        <div className="mt-6 md:mt-8 w-full">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-4 md:px-0">
                                {trustElements.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <item.icon className="h-5 w-5 text-accent" />
                                        <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Video stays on the right */}
                    <div className="hidden lg:block w-full aspect-video overflow-hidden rounded-xl shadow-xl">
                        <ReactPlayer
                            src='https://www.youtube.com/watch?v=d7UQmvmetYQ'
                            width='100%'
                            height='100%'
                            controls={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};