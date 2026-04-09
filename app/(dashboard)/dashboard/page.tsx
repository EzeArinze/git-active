import { ChevronDown, Download, Plus } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-row justify-between gap-4 sm:flex-row sm:items-center">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">
            {"Today's Intelligence"}
          </h1>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Synthesis of your repository network activity.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Export */}
          <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Export Report</span>
          </button>

          {/* Analyze */}
          <button className="flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm text-white">
            <Plus size={16} />
            <span className="hidden sm:inline">Analyze New Repo</span>
          </button>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Golden Synthesis */}
        <div className="rounded-xl border bg-background p-6 md:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-orange-500">
            GOLDEN SYNTHESIS
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="font-medium">
                  payment-service has unusual activity
                </p>
                <span className="text-xs text-orange-500/70">
                  +12 commits in the last 4 hours
                </span>
              </div>

              <div>
                <p className="font-medium">PR #42 waiting for review</p>
                <span className="text-xs text-muted-foreground">
                  Idle for 3 days · Needs attention
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium">landing-page inactive</p>
                <span className="text-xs text-muted-foreground">
                  No activity for 6 days · Consider archiving?
                </span>
              </div>

              <div>
                <p className="font-medium">Overall Velocity increased</p>
                <span className="text-xs text-muted-foreground">
                  15% higher than last week’s average
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border p-4">
            <p className="text-xs text-muted-foreground">COMMITS TODAY</p>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">142</h2>
              <span className="text-xs text-red-500">+12%</span>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-muted-foreground">OPEN PRS</p>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">24</h2>
              <span className="text-xs text-red-500">+2 new</span>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs text-muted-foreground">ACTIVE CONTRIBUTORS</p>
            <h2 className="text-2xl font-semibold">8</h2>
            <span className="text-xs text-muted-foreground">of 12 total</span>
          </div>
        </div>
      </div>

      {/* Activity Feed Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Activity Feed</h2>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
          <button className="flex items-center gap-1">
            <span className="hidden sm:inline">All Repositories</span>
            <span className="sm:hidden">Repos</span>
            <ChevronDown size={14} />
          </button>

          <button className="flex items-center gap-1">
            <span className="hidden sm:inline">All Event Types</span>
            <span className="sm:hidden">Events</span>
            <ChevronDown size={14} />
          </button>

          <button className="flex items-center gap-1">
            <span className="hidden sm:inline">Last 24 Hours</span>
            <span className="sm:hidden">24h</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
      {/* Activity Cards */}
      <div className="space-y-4">
        {/* Repo Card */}
        <div className="rounded-xl border">
          <div className="border-b p-4 text-sm font-medium">
            PAYMENT-SERVICE
          </div>

          <div className="space-y-4 p-4">
            <div>
              <p className="text-sm">
                Refactor stripe webhook handler for better error resilience
              </p>
              <span className="text-xs text-muted-foreground">
                marcus_dev pushed to main · 14m ago
              </span>
            </div>

            <div>
              <p className="text-sm">Merged PR #41: Add Apple Pay support</p>
              <span className="text-xs text-muted-foreground">
                sarah_ops merged into main · 2h ago
              </span>
            </div>
          </div>
        </div>

        {/* Empty Repo */}
        <div className="rounded-xl border">
          <div className="border-b p-4 text-sm font-medium">LANDING-PAGE</div>

          <div className="flex flex-col items-center justify-center gap-2 p-10 text-sm text-muted-foreground">
            <span>No recent activity detected in this repository.</span>
            <button className="text-orange-500">REQUEST HEALTH CHECK</button>
          </div>
        </div>

        {/* Issue Card */}
        <div className="rounded-xl border">
          <div className="border-b p-4 text-sm font-medium">
            INFRASTRUCTURE-CORE
          </div>

          <div className="p-4">
            <p className="text-sm">Issue #88: Redis cluster OOM in staging</p>
            <span className="text-xs text-muted-foreground">
              Assigned to alex_r and marcus_dev · 5h ago
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
