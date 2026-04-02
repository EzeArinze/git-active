import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";
import Image from "next/image";
import heroImage from "@/public/hero-image.png"

export function HeroSection() {
  return (
    <section className="mx-auto mt-12 w-full px-6 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-[3rem] font-serif leading-[1.05] tracking-tight text-foreground sm:text-[3.6rem]">
                Understand what<br />matters across<br />your repositories
              </h1>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground pr-8">
                Git-active distills the noise of GitHub activity into
                actionable insights using rooted, organic data visualization.
              </p>
              <Button size="lg" className="mt-4 h-11 rounded-lg bg-primary px-5 text-[0.95rem] font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md">
                <GitBranch fill="currentColor" strokeWidth={0} className="mr-2 size-4.5" />
                Sign in with GitHub
              </Button>
            </div>

            <div className="relative flex justify-center w-full">
              <div className="w-full aspect-4/3 rounded-4xl p-5 sm:p-7 flex items-center justify-center shadow-lg transition-transform hover:scale-[1.01] duration-500 border border-primary/5">
                <Image
                  src={heroImage}
                  alt="git-active Dashboard"
                  width={800}
                  height={600}
                  priority
                  className="h-auto w-full rounded-xl object-cover shadow-2xl ring-1 ring-primary/5"
                />
              </div>
            </div>
          </div>
 </section>
  )
}
