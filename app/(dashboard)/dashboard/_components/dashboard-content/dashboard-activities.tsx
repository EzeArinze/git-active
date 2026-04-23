import { DBActivity } from "@/lib/server/db/schema"
import { formatTimeAgo } from "@/utils/format-time-ago"
import ActivitiesFilter from "./activities-filter"
import Link from "next/link"

type RepoGroup = {
  repoId: number
  repoName: string
  activities: DBActivity[]
}

type Props = {
  repoGroups: RepoGroup[]
}

function DashboardActivities({ repoGroups }: Props) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Activity Feed</h2>

        <ActivitiesFilter />
      </div>

      <div className="space-y-4">
        {repoGroups.map((repo) => (
          <div key={repo.repoId} className="rounded-xl border">
            <div className="flex items-center justify-between border-b p-4 text-sm font-medium">
              {repo.repoName.toUpperCase()}

              <Link href={`/dashboard/repositories/repo/${repo.repoId}`}>
                Details
              </Link>
            </div>

            {repo.activities.length === 0 ? (
              <div className="flex flex-col items-center p-10 text-sm text-muted-foreground">
                No recent activity detected.
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {repo.activities.slice(0, 5).map((activity) => (
                  <div key={activity.id}>
                    <p className="text-sm">{activity.message}</p>
                    <span className="text-xs text-muted-foreground">
                      {activity.actor} ·{" "}
                      {formatTimeAgo(activity.eventCreatedAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default DashboardActivities
