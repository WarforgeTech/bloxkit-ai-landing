'use client';

import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Problem from "@/components/landing/problem";
import Solution from "@/components/landing/solution";
import Curriculum from "@/components/landing/curriculum";
import SocialProof from "@/components/landing/social-proof";
import EstimateEarnings from "@/components/landing/estimate-earnings";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCta from "@/components/landing/final-cta";
import Footer from "@/components/landing/footer";
import { EnvironmentTest } from "@/components/debug/environment-test";
import { UpsellProvider } from "@/hooks/use-upsell";
import { GlobalUpsellPopup } from "@/components/ui/global-upsell-popup";

export default function Home() {
  return (
    <UpsellProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Problem />
        <Solution />
        <Curriculum />
        <SocialProof />
        <EstimateEarnings />
        <Pricing />
        <FAQ />
        <FinalCta />
        <Footer />

        {/* Environment Test Component - Remove after testing */}
        <EnvironmentTest />
      </div>

      {/* Global Upsell Popup */}
      <GlobalUpsellPopup />
    </UpsellProvider>
  );
}
