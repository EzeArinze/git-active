"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    word: "Connect Account",
    label: "Securely link your identity",
    offset: "ml-0",
  },
  {
    word: "Select Repos",
    label: "Choose the projects that matter",
    offset: "ml-4 md:ml-16 lg:ml-32",
  },
  {
    word: "Get Insights",
    label: "Receive daily intelligence",
    offset: "ml-8 md:ml-32 lg:ml-64",
  },
];

export function HowItWorks() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate each row (word + label) one after another
    tl.fromTo(
      ".step-row",
      { opacity: 0, y: 60, rotationX: -10 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1.2, 
        stagger: 0.5, 
        ease: "power3.out",
        transformOrigin: "center bottom"
      }
    ).fromTo(
      ".bg-line",
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
      0
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative mx-auto mt-20 mb-10 w-full px-6 md:px-10 max-w-5xl py-10 md:py-20 lg:py-32" style={{ perspective: "1000px" }}>
      <div className="text-center mb-16">
        <h2 className="text-[2rem] font-medium tracking-tight text-foreground">How it Works</h2>
        <p className="mt-3 text-muted-foreground">Three seconds to setup, hours saved every day.</p>
      </div>
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <svg className="w-full h-full stroke-border/60" fill="none" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
          <path className="bg-line" d="M 0 150 L 250 300 L 250 1000" strokeWidth="1" />
          <path className="bg-line" d="M 1000 500 L 700 400 L 700 -100" strokeWidth="1" />
          <path className="bg-line" d="M 150 700 L 350 800" strokeWidth="1" />
          <path className="bg-line" d="M 850 100 L 650 200 L 650 800" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 mx-auto max-w-4xl">
        {steps.map((step, i) => (
          <div key={i} className={`step-row flex flex-col md:flex-row md:items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-4 md:gap-6 ${step.offset}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground leading-[0.9]">
              {step.word}
            </h2>
            <div className="relative mb-2 md:mb-5 lg:mb-8 group flex items-center ml-2 md:ml-0">
              <div className="hidden md:block w-8 lg:w-12 h-px bg-border/80 mr-2"></div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border/80 bg-background/50 backdrop-blur-md shadow-sm">
                <span className="text-[0.55rem] md:text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
