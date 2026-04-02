"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Code, GitGraph, GitPullRequestArrowIcon, MessageCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function InteractiveDemo() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".demo-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      ".activity-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.3, ease: "back.out(1.2)" },
      "-=0.4"
    );

    tl.fromTo(
      ".insight-card",
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.4, ease: "power3.out" },
      "-=1.2"
    );
  }, { scope: container });

  return (
    <section ref={container} className="mx-auto mt-32 w-full px-6 md:px-10">
      <div className="demo-header text-center mb-12">
        <h2 className="text-3xl font-serif md:text-4xl font-medium tracking-tight text-foreground">
          See it in Action
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Watch as raw events are transformed into actionable daily intelligence.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] p-6 lg:p-10 border border-border/60 shadow-inner">
        {/* Left Col: Raw Feed */}
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-sm text-muted-foreground px-2">Raw Activity Feed...</div>
          <div className="activity-item p-4 rounded-xl bg-background border border-border shadow-sm flex gap-4 opacity-50">
            <div className="mt-1"><Code className="size-4 text-primary" /></div>
            <div>
              <div className="text-sm font-medium">Pushed 4 commits to <span className="font-mono text-xs">main</span></div>
              <div className="text-xs text-muted-foreground mt-1">user123 • 2m ago</div>
            </div>
          </div>
          <div className="activity-item p-4 rounded-xl bg-background border border-border shadow-sm flex gap-4 opacity-50">
            <div className="mt-1"><MessageCircle className="size-4 text-blue-500" /></div>
            <div>
              <div className="text-sm font-medium">Commented on PR #102</div>
              <div className="text-xs text-muted-foreground mt-1">dev_expert • 15m ago</div>
            </div>
          </div>
          <div className="activity-item p-4 rounded-xl bg-background border border-border shadow-sm flex gap-4 opacity-50">
            <div className="mt-1"><Activity className="size-4 text-red-500" /></div>
            <div>
              <div className="text-sm font-medium">Opened Issue #105: Memory Leak</div>
              <div className="text-xs text-muted-foreground mt-1">qa_team • 1h ago</div>
            </div>
          </div>
        </div>

        {/* Right Col: Intelligent Insights */}
        <div className="flex flex-col gap-4 border-l border-border/50 pl-0 lg:pl-8 pt-8 lg:pt-0">
          <div className="font-semibold text-sm text-primary px-2 flex items-center gap-2">
            Processed Insights
          </div>
          <div className="insight-card p-5 rounded-xl bg-primary/5 border border-primary/20 shadow-md flex gap-4">
            <div className="text-2xl mt-1"> <GitGraph className="size-4 text-primary" /> </div>
            <div>
              <div className="text-[0.95rem] font-bold text-foreground">Deployment Ready</div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                The recent commits on <span className="font-mono text-xs bg-background rounded px-1 border border-border">main</span> resolved Issue #105. PR #102 has been approved. The project is safe to deploy.
              </p>
            </div>
          </div>
          <div className="insight-card p-5 rounded-xl bg-background border border-border shadow-sm flex gap-4">
            <div className="text-2xl mt-1"> <GitPullRequestArrowIcon className="size-4 text-primary" /> </div>
            <div>
              <div className="text-[0.95rem] font-bold text-foreground">Action Required</div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                You have 2 pending reviews that are blocking team progress. Focus on those first today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
