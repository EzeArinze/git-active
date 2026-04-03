"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FuturisticMonitor } from "./futuristic-Monitor";
import { IconBrandGithub } from "@tabler/icons-react"

export function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-bg",
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      ".word",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(
      ".subhead",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".cta-btn",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      ".dashboard-preview",
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
  }, { scope: container });

  const headline = "Stop drowning in GitHub notifications.";
  const words = headline.split(" ");

  return (
    <section
      ref={container}
      className="relative mx-auto mt-16 md:mt-20 mb-10 w-full max-w-7xl px-6 md:px-10 overflow-hidden"
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0" />

      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">

        {/* LEFT */}
        <div className="flex flex-col items-start gap-5 text-center lg:text-left">

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif leading-[1.1] tracking-tight text-foreground
            text-[clamp(2rem,6vw,3.8rem)]"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="word inline-block opacity-0 translate-y-10 mr-3"
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="subhead mt-2 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl opacity-0 translate-y-10">
            Git Active shows you what actually matters across your repositories
            — commits, PRs, and issues, summarized into actionable insights.
          </p>

          {/* CTA */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">

            <Button
              size="lg"
              className="cta-btn h-12 w-full sm:w-auto rounded-xl bg-primary px-6 text-[0.95rem] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 opacity-0 translate-y-10"
            >
              <IconBrandGithub fill="currentColor" strokeWidth={0} className="mr-2 size-5" />
              Continue with GitHub
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="cta-btn h-12 w-full sm:w-auto rounded-xl px-6 text-[0.95rem] font-medium shadow-sm hover:bg-secondary opacity-0 translate-y-10"
            >
              <Play className="mr-2 size-4 text-primary" />
              See how it works
            </Button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="dashboard-preview relative flex justify-center w-full opacity-0 translate-y-10">

          <div className="w-full max-w-full lg:max-w-none scale-[0.9] sm:scale-100">
            <FuturisticMonitor />
          </div>

        </div>
      </div>
    </section>
  );
}