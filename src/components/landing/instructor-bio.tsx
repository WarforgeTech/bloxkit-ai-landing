import { Badge } from "@/components/ui/badge";
import { Star, MessageSquareQuote, Users, Video } from "lucide-react";

const stats = [
    { icon: Star, value: "4.9", label: "Instructor Rating" },
    { icon: MessageSquareQuote, value: "50,504", label: "Reviews" },
    { icon: Users, value: "311,581", label: "Students" },
    { icon: Video, value: "16", label: "Courses" },
];

const details = [
    "20+ years building and launching games, including top Fortnite hits like SUPER Red vs Blue.",
    "Hands-on experience with UEFN from basics to advanced Verse programming.",
    "Taught Verse and UEFN to thousands, empowering beginners to pros.",
    "Co-founded JOGO with Typical Gamer and MustardPlays, focusing on Fortnite innovation.",
    "Passionate Fortnite enthusiast since launch, dedicated to monetizing creator ideas.",
]

export default function InstructorBio() {
    return (
        <section id="instructor" className="py-12 md:py-24">
            <div className="container max-w-5xl px-4 md:px-6 mx-auto">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-1 flex flex-col items-center text-center">
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-2xl shadow-primary/20 mb-4">
                            <img
                                src="https://placehold.co/300x300.png"
                                alt="Mark Price, UEFN Instructor"
                                className="w-full h-full object-cover"
                                data-ai-hint="male developer"
                            />
                        </div>
                        <h3 className="text-2xl font-bold font-headline">Mark Price</h3>
                        <p className="text-muted-foreground">Game Developer | Fortnite | Co-owner JOGO Games</p>
                        <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center p-2 rounded-lg bg-secondary">
                                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-1" />
                                    <p className="text-lg font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl uppercase text-primary mb-4">
                            Meet Your Guide
                        </h2>
                        <div className="prose prose-invert max-w-none text-foreground/80 space-y-4 text-lg">
                            <p>
                                My name is Mark Price and I've been building games for 20 years and have launched multiple Fortnite games, by myself and with my team, including SUPER Red vs Blue, one of the top games in the world. I'm the Chief Technology Officer at JOGO, a game development studio co-founded with Andre Rebelo (Typical Gamer) and Chad Mustard (MustardPlays).
                            </p>
                            <p>
                                As a leading voice in the Fortnite and UEFN community, I combine technical expertise with a gift for teaching, making complex concepts accessible and inspiring the next generation of developers. My educational content and hands-on mentorship have helped countless creators master cutting-edge tools, transforming ideas into immersive experiences enjoyed by players worldwide.
                            </p>
                            <ul className="list-none p-0 space-y-2 mt-6">
                                {details.map((detail, i) => (
                                    <li key={i} className="flex items-start">
                                        <Star className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}