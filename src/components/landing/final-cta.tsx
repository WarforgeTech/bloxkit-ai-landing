'use client';

import { Button } from "@/components/ui/button";
import { EnvironmentAwareCheckoutButton } from "@/components/ui/environment-aware-checkout-button";

export default function FinalCta() {
  return (
    <section id="enroll" className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase text-primary">
          Ready to Build Your Fortnite Empire? Don&apos;t Miss Out!
        </h2>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-foreground/80 md:text-xl">
          Watch the video above to see how this bootcamp turns beginners into pro creators. Master UEFN, publish islands, and monetize – all for $37 (save $300+).
        </p>
        <div className="mt-8">
          <EnvironmentAwareCheckoutButton
            productKey="bootcamp"
            quantity={1}
            metadata={{
              source: 'final-cta',
              product: 'bootcamp',
            }}
            size="lg"
            className="h-14 px-10 font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
          >
            Buy Now For $37
          </EnvironmentAwareCheckoutButton>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Discount Ends Soon! | 30-Day Money-Back Guarantee</p>
      </div>
    </section>
  );
}