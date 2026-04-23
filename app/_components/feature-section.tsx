"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Zap,
  BellOff,
  GitPullRequest,
  LayoutDashboard,
  ZapIcon,
  AlarmClockIcon,
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    title: "Daily Intelligence Summary",
    description:
      "Start your day with a clear picture. We analyze your repositories overnight to give you actionable insights.",
    icon: <Zap className="text-yellow-500" />,
    demo: (
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 shadow-sm">
          <div className="text-xl">
            {" "}
            <ZapIcon className="text-yellow-500" />{" "}
          </div>
          <div className="text-sm font-medium">
            payment-service has unusual activity
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 shadow-sm">
          <div className="text-xl">
            <AlarmClockIcon className="text-red-400" />
          </div>
          <div className="text-sm font-medium">PR #42 waiting 3 days</div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 opacity-60 shadow-sm">
          <div className="text-xl">💤</div>
          <div className="text-sm font-medium">landing-page inactive</div>
        </div>
      </div>
    ),
  },
  {
    title: "Signal Over Noise",
    description:
      "Trade hundreds of contextless notifications for a few meaningful alerts. See exactly what needs your attention right now.",
    icon: <BellOff className="text-red-400" />,
    demo: (
      <div className="relative flex h-full min-h-50 w-full items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-secondary/30">
        <div className="noise-state absolute inset-0 flex flex-col gap-2 p-4 opacity-40 blur-[2px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-full rounded-md bg-border"></div>
          ))}
        </div>
        <div className="signal-state z-10 flex max-w-[80%] items-center gap-4 rounded-xl border border-primary/20 bg-background p-6 shadow-xl">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <GitPullRequest className="size-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-bold">1 Critical PR Review</div>
            <div className="text-xs text-muted-foreground">
              Blocks core release
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Multi-Repo Visibility",
    description:
      "Your team touches multiple services. Get a single pane of glass without opening endless tabs.",
    icon: <LayoutDashboard className="text-primary" />,
    demo: (
      <div className="grid w-full grid-cols-2 gap-3">
        {[
          { name: "api-gateway", status: "Active" },
          { name: "web-client", status: "At Risk" },
          { name: "auth-service", status: "Active" },
          { name: "docs", status: "Inactive" },
        ].map((repo, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3 shadow-sm"
          >
            <div className="truncate text-sm font-semibold">{repo.name}</div>
            <div
              className={`inline-flex w-max rounded border px-2 py-0.5 text-[0.65rem] font-medium ${
                repo.status === "Active"
                  ? "border-green-500/20 bg-green-500/10 text-green-600"
                  : repo.status === "At Risk"
                    ? "border-red-500/20 bg-red-500/10 text-red-600"
                    : "border-gray-500/20 bg-gray-500/10 text-gray-600"
              }`}
            >
              {repo.status}
            </div>
          </div>
        ))}
      </div>
    ),
  },
]

export function FeatureSection() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".feature-row")

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sections.forEach((section: any, i) => {
        const textCol = section.querySelector(".text-col")
        const visualCol = section.querySelector(".visual-col")

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        })

        tl.fromTo(
          textCol,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        ).fromTo(
          visualCol,
          { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )

        // Stagger child elements in visual column
        const children = visualCol.children[0].children
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: visualCol,
                start: "top 75%",
              },
            }
          )
        }
      })
    },
    { scope: container }
  )

  return (
    <section ref={container} className="mx-auto mt-32 w-full px-6 md:px-10">
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
          Intelligence, not just data.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We process the raw events from GitHub so your team doesn&apos;t have
          to.
        </p>
      </div>

      <div className="flex flex-col gap-24 md:gap-32">
        {features.map((opt, i) => (
          <div
            key={i}
            className={`feature-row grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"}`}
          >
            <div
              className={`text-col flex flex-col gap-4 ${i % 2 !== 0 ? "lg:order-2" : ""}`}
            >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-secondary">
                {opt.icon}
              </div>
              <h3 className="font-serif text-2xl font-medium">{opt.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {opt.description}
              </p>
            </div>

            <div
              className={`visual-col relative flex aspect-square w-full items-center justify-center rounded-3xl border border-border/40 bg-secondary/50 p-6 md:aspect-4/3 md:p-10 ${i % 2 !== 0 ? "lg:order-1" : ""}`}
            >
              {opt.demo}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
