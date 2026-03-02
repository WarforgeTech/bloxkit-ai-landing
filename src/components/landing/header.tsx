'use client';

import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import { EnvironmentAwareCheckoutButton } from "@/components/ui/environment-aware-checkout-button";
import { CountdownTimer } from "@/components/ui/countdown-timer";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-red-600 to-red-500 md:bg-none md:bg-background/95 md:backdrop-blur md:supports-[backdrop-filter]:md:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        {/* Hide title and icon on mobile, show on desktop */}
        <div className="hidden md:flex mr-4 items-center">
          <Gamepad2 className="h-6 w-6 mr-2 text-primary" />
          <a href="#hero" className="font-bold font-headline">The Fortnite UEFN Bootcamp</a>
        </div>

        {/* Mobile: Center countdown and button equally */}
        <div className="flex md:hidden flex-1 items-center justify-between">
          <div className="flex-1 flex justify-center">
            <CountdownTimer />
          </div>
          <div className="flex-1 flex justify-center">
            <EnvironmentAwareCheckoutButton
              productKey="bootcamp"
              quantity={1}
              metadata={{
                source: 'header',
                product: 'bootcamp',
              }}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD447]/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
            >
              Enroll Now
            </EnvironmentAwareCheckoutButton>
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <CountdownTimer />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <nav className="flex items-center">
            <EnvironmentAwareCheckoutButton
              productKey="bootcamp"
              quantity={1}
              metadata={{
                source: 'header',
                product: 'bootcamp',
              }}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD447]/30 bg-[#FFD447] text-accent-foreground hover:bg-[#FFD447]/90"
            >
              Enroll Now
            </EnvironmentAwareCheckoutButton>
          </nav>
        </div>
      </div>
    </header>
  );
}