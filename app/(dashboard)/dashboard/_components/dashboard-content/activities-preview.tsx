import { Insight } from "@/types/dashboard"

type Props = {
  stats: {
    commitsToday: number
    openPRs: number
    activeContributors: number
  }
  insights: Insight[]
}

function ActivitiesPreview({ stats, insights }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Golden Synthesis */}
      <div className="rounded-xl border bg-background p-6 md:col-span-2">
        <div className="mb-4 text-sm font-medium text-orange-500">
          GOLDEN SYNTHESIS
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {insights.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No insights available yet.
            </p>
          ) : (
            insights.slice(0, 4).map((insight) => (
              <div key={insight.id}>
                <p className="font-medium">{insight.title}</p>
                <span className="text-xs text-muted-foreground">
                  {insight.description}
                </span>
                <span className="pl-2 text-xs font-semibold text-orange-500/70">
                  REPO-NAME: {insight.repoName.join(", ").toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">COMMITS TODAY</p>
          <h2 className="text-2xl font-semibold">{stats.commitsToday}</h2>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">OPEN PRS</p>
          <h2 className="text-2xl font-semibold">{stats.openPRs}</h2>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-xs text-muted-foreground">ACTIVE CONTRIBUTORS</p>
          <h2 className="text-2xl font-semibold">{stats.activeContributors}</h2>
        </div>
      </div>
    </div>
  )
}

export default ActivitiesPreview
