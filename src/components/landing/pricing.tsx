'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Trophy, Monitor, Wifi, User, BookOpen } from "lucide-react";
import { EnvironmentAwareCheckoutButton } from "@/components/ui/environment-aware-checkout-button";

const requirements = [
  {
    text: "Windows PC that can run Fortnite",
    icon: Monitor
  },
  {
    text: "Stable internet and ≈ 30 GB free disk space",
    icon: Wifi
  },
  {
    text: "Free Epic Games account",
    icon: User
  },
  {
    text: "No coding or game-dev experience needed",
    icon: BookOpen
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary mb-4">
            Get Started Today
          </h2>
          <p className="mx-auto max-w-[600px] text-lg text-foreground/80">
            Join thousands of creators who are already building and monetizing their Fortnite islands.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 max-w-md mx-auto">
          <Card className="relative border-2 border-[#FFD447] shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#FFD447]/20 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-[#FFD447]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-primary">
                Complete Bootcamp
              </CardTitle>
              <CardDescription className="text-lg">
                Everything you need to succeed
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-6">
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">$37</span>
                <span className="text-muted-foreground line-through ml-2">$399</span>
                <span className="text-sm text-muted-foreground block">One-time payment</span>
              </div>

              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>8.5+ hours of step-by-step video content</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Complete UEFN mastery from basics to advanced</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Island publishing and monetization strategies</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Exclusive Discord community access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Lifetime access to all course materials</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <EnvironmentAwareCheckoutButton
                productKey="bootcamp"
                quantity={1}
                metadata={{
                  source: 'pricing',
                  product: 'bootcamp',
                }}
                className="w-full h-14 font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD447]/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
                size="lg"
              >
                Enroll Now - $37
              </EnvironmentAwareCheckoutButton>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h3 className="font-bold text-lg mb-6 text-primary">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {requirements.map((requirement) => (
              <div key={requirement.text} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-foreground/30 flex items-center justify-center">
                  <requirement.icon className="h-4 w-4 text-foreground/60" />
                </div>
                <span className="text-foreground/80 text-sm">{requirement.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}