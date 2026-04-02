"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, BellOff, GitPullRequest, LayoutDashboard,ZapIcon, AlarmClockIcon} from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "Daily Intelligence Summary",
    description: "Start your day with a clear picture. We analyze your repositories overnight to give you actionable insights.",
    icon: <Zap className="text-yellow-500" />,
    demo: (
      <div className="flex flex-col gap-3 w-full">
        <div className="rounded-lg border border-border bg-background p-4 shadow-sm flex items-center gap-3">
          <div className="text-xl"> <ZapIcon className="text-yellow-500" /> </div>
          <div className="text-sm font-medium">payment-service has unusual activity</div>
        </div>
        <div className="rounded-lg border border-border bg-background p-4 shadow-sm flex items-center gap-3">
          <div className="text-xl"><AlarmClockIcon className="text-red-400" /></div>
          <div className="text-sm font-medium">PR #42 waiting 3 days</div>
        </div>
        <div className="rounded-lg border border-border bg-background p-4 shadow-sm flex items-center gap-3 opacity-60">
          <div className="text-xl">💤</div>
          <div className="text-sm font-medium">landing-page inactive</div>
        </div>
      </div>
    )
  },
  {
    title: "Signal Over Noise",
    description: "Trade hundreds of contextless notifications for a few meaningful alerts. See exactly what needs your attention right now.",
    icon: <BellOff className="text-red-400" />,
    demo: (
      <div className="relative w-full h-full min-h-[200px] flex items-center justify-center bg-secondary/30 rounded-xl overflow-hidden border border-border/50">
        <div className="noise-state absolute inset-0 flex flex-col gap-2 p-4 blur-[2px] opacity-40">
          {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-full bg-border rounded-md"></div>)}
        </div>
        <div className="signal-state z-10 p-6 bg-background rounded-xl border border-primary/20 shadow-xl flex items-center gap-4 max-w-[80%]">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <GitPullRequest className="text-primary size-5" />
          </div>
          <div>
            <div className="text-sm font-bold">1 Critical PR Review</div>
            <div className="text-xs text-muted-foreground">Blocks core release</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Multi-Repo Visibility",
    description: "Your team touches multiple services. Get a single pane of glass without opening endless tabs.",
    icon: <LayoutDashboard className="text-primary" />,
    demo: (
      <div className="grid grid-cols-2 gap-3 w-full">
        {[
          { name: "api-gateway", status: "Active" },
          { name: "web-client", status: "At Risk" },
          { name: "auth-service", status: "Active" },
          { name: "docs", status: "Inactive" },
        ].map((repo, i) => (
          <div key={i} className="rounded-lg border border-border bg-background p-3 flex flex-col gap-2 shadow-sm">
            <div className="text-sm font-semibold truncate">{repo.name}</div>
            <div className={`text-[0.65rem] font-medium px-2 py-0.5 rounded border inline-flex w-max ${
              repo.status === 'Active' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
              repo.status === 'At Risk' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
              'bg-gray-500/10 text-gray-600 border-gray-500/20'
            }`}>
              {repo.status}
            </div>
          </div>
        ))}
      </div>
    )
  }
];

export function FeatureSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.feature-row');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections.forEach((section: any, i) => {
      const textCol = section.querySelector('.text-col');
      const visualCol = section.querySelector('.visual-col');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(textCol, 
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(visualCol,
        { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Stagger child elements in visual column
      const children = visualCol.children[0].children;
      if (children.length > 0) {
        gsap.fromTo(children,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, y: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: visualCol,
              start: "top 75%",
            }
          }
        );
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="mx-auto mt-32 w-full px-6 md:px-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
          Intelligence, not just data.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          We process the raw events from GitHub so your team doesn&apos;t have to.
        </p>
      </div>

      <div className="flex flex-col gap-24 md:gap-32">
        {features.map((opt, i) => (
          <div key={i} className={`feature-row grid gap-10 md:gap-16 items-center lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:grid-cols-[1.1fr_1fr]' : 'lg:grid-cols-[1fr_1.1fr]'}`}>
            
            <div className={`text-col flex flex-col gap-4 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center border border-border">
                {opt.icon}
              </div>
              <h3 className="text-2xl font-serif font-medium">{opt.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {opt.description}
              </p>
            </div>

            <div className={`visual-col relative flex items-center justify-center w-full aspect-square md:aspect-4/3 rounded-3xl bg-secondary/50 border border-border/40 p-6 md:p-10 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
               {opt.demo}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}
