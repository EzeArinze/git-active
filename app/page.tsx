import Header from "@/app/_components/header";
import { HeroSection } from "./_components/hero";
import { FeatureSection } from "./_components/feature-section";
import { HowItWorks } from "./_components/how-it-works";
import { InteractiveDemo } from "./_components/interactive-demo";
import { FinalCTA } from "./_components/final-cta";
import Footer from "./_components/footer";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col selection:bg-primary/20 bg-background text-foreground overflow-x-clip">
      <Header />

      <main className="flex-1 pb-8 w-full max-w-7xl mx-auto flex flex-col items-center">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <InteractiveDemo />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
