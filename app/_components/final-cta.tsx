"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buttonVariants } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".cta-content",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <section ref={container} className="mx-auto mt-32 mb-20 w-full px-6 md:px-10">
      <div className="cta-content rounded-4xl bg-foreground text-background p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle background gradient inside the dark card */}
        <div className="absolute inset-0 bg-linear-to-tr from-primary/30 via-transparent to-transparent opacity-90" />
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-[2.5rem] md:text-[4rem] font-serif font-medium tracking-tight leading-tight">
            Start focusing on<br />what matters.
          </h2>
          <p className="mt-6 text-lg text-background/70 max-w-lg">
            Join thousands of developers turning noisy repositories into clear daily intelligence.
          </p>
          <Link href={"/login"} className={buttonVariants({size:"lg", className:"mt-10 h-14 rounded-2xl bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300"})}>
            <IconBrandGithub fill="currentColor" strokeWidth={0} className="mr-3 size-5" />
            Continue with GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
