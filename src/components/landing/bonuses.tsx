import { Sparkles, Users, TrendingUp, Code, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bonuses = [
  {
    icon: Sparkles,
    text: "AI tools guide for level ideas, 3D meshes, concept art, and thumbnails."
  },
  {
    icon: Users,
    text: "Community access for resources, help, and networking."
  },
  {
    icon: TrendingUp,
    text: "Marketing tips to boost island discovery and player retention."
  },
  {
    icon: Code,
    text: "Optional Verse programming section for building advanced, 'crazy' features."
  },
];

const whoIsThisFor = [
  "Fortnite players who want to turn creative ideas into published, playable islands.",
  "Absolute beginners who want to build games FAST.",
  "Indie or Roblox/Unity devs exploring UEFN’s cross-platform reach and Creator payouts.",
  "Teachers, mentors, & after-school clubs looking for engaging STEAM projects.",
  "Content creators aiming to expand their brand with interactive experiences and events.",
  "Indie game developers who want a new way to build and monetize games.",
];

export default function Bonuses() {
  return (
    <section id="bonuses" className="py-12 md:py-24">
      <div className="container max-w-5xl px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl uppercase text-primary mb-6">
              Exclusive Bonuses to Accelerate Your Success
            </h2>
            <div className="space-y-4">
              {bonuses.map((bonus, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border border-primary/20 bg-secondary p-4">
                  <bonus.icon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <p className="text-lg font-semibold text-foreground/90">{bonus.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl uppercase text-primary mb-6">
              Who This Is For
            </h3>
            <ul className="space-y-4">
              {whoIsThisFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <UserCheck className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-foreground/80 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}