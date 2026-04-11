import { ChevronDown } from "lucide-react"

function DashboardActivities() {
  return (
    <>
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
    </>
  )
}

export default DashboardActivities
