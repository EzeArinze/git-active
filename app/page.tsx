import Header from "@/app/_components/header"
import { HeroSection } from "./_components/hero"
import { FeatureSection } from "./_components/feature-section"
import { HowItWorks } from "./_components/how-it-works"
import { InteractiveDemo } from "./_components/interactive-demo"
import { FinalCTA } from "./_components/final-cta"
import Footer from "./_components/footer"
import { Suspense } from "react"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip bg-background text-foreground selection:bg-primary/20">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center pb-8">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <InteractiveDemo />
        <FinalCTA />
        <Suspense>
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}
