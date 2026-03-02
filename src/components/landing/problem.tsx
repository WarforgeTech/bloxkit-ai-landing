import { Button } from "@/components/ui/button";
import { XCircle, DollarSign, Settings, ImageIcon, BarChart, AlertTriangle, ArrowRight } from "lucide-react";

const problems = [
    {
        icon: XCircle,
        text: "You didn't know you could build Fortnite games—right now—for free—and get paid.",
    },
    {
        icon: DollarSign,
        text: "You assumed you'd need to code. You don't.",
    },
    {
        icon: Settings,
        text: "You thought it would be hard to get started. It's not—with the right steps.",
    },
    {
        icon: ImageIcon,
        text: "You've wasted time chasing clients or affiliate programs when you could build a world ONCE and earn passively from players.",
    },
    {
        icon: BarChart,
        text: "You didn't realize the secret to discoverability is not just the island—it's the thumbnail, the name, the hook, and the story.",
    },
    {
        icon: AlertTriangle,
        text: "You've never had a step-by-step shortcut that takes you from zero to published and monetized—in a weekend.",
    }
];

export default function Problem() {
    return (
        <section id="problem" className="py-12 md:py-24 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary">
                        You're Missing Out on the Easiest Game Dev Money on the Internet
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                        You've been grinding tutorials, learning to code, or trying to start something online—but no one told you <span className="font-bold text-[#FFD447]">Fortnite has a built-in system that pays creators just for building fun maps</span>. No client hunting. No ad spend. Just launch the editor, build your world, publish—and get paid based on how many people play.
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                        Epic Games has already paid out over <span className="font-bold text-green-600">$700 million</span> to creators.
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                        Most people think you need to be a pro game developer or have years of experience. That's wrong. With the right system, anyone can start from scratch, build a simple fun island, and start earning. Even if you've never made a game before.
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold text-primary">
                        But here's the catch: You don't know what you don't know.
                    </p>
                </div>

                <div className="mt-12">
                    <h3 className="text-xl font-bold text-center mb-6 text-foreground">
                        Here's what's stopping you:
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {problems.map((problem) => (
                            <div key={problem.text} className="flex items-start gap-4 p-4 rounded-md border border-primary/20 bg-background/50 hover:border-primary/40 transition-colors duration-200">
                                <problem.icon className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                                <p className="text-foreground/80">{problem.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg" variant="ghost" className="font-bold text-[#FFD447] transition-all duration-300 hover:text-[#FFD447]/80 group">
                        <a href="#solution">
                            See How This Bootcamp Fixes That
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}