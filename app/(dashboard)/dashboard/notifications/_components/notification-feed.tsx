import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconChartSankey, IconEdit, IconFile } from "@tabler/icons-react"

function NotificationFeed() {
  return (
    <div className="space-y-4">
      {/* PR Alert */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3 sm:gap-4">
            <IconEdit className="mt-1 size-5 shrink-0 rounded-full" />
            <div>
              <p className="font-medium">PRs needing review</p>
              <p className="text-sm text-muted-foreground">
                There are <b>4 pull requests</b> in the “Core-Engine” repository
                waiting for your review. Oldest was opened 3 days ago.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" className="bg-orange-500">
                  Review Now
                </Button>
                <Button size="sm" variant="secondary">
                  Snooze
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:flex-col md:items-end">
            <Badge className="bg-orange-100 text-orange-600">
              ACTION REQUIRED
            </Badge>
            <span className="text-muted-foreground">2h ago</span>
          </div>
        </CardContent>
      </Card>

      {/* Activity Spike */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3 sm:gap-4">
            <IconChartSankey className="mt-1 size-5 shrink-0 rounded-full" />
            <div>
              <p className="font-medium">Unusual activity spikes</p>
              <p className="text-sm text-muted-foreground">
                Detected a{" "}
                <span className="font-medium text-red-600">300% increase</span>{" "}
                in API calls from unverified endpoints.
              </p>
              {/* Fake chart - full width on mobile */}
              <div className="mt-3 h-8 w-full rounded-md bg-linear-to-r from-red-200 to-red-400" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:flex-col md:items-end">
            <Badge variant="destructive">SECURITY ALERT</Badge>
            <span className="text-muted-foreground">5h ago</span>
          </div>
        </CardContent>
      </Card>

      {/* Inactive */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3 sm:gap-4">
            <IconFile className="mt-1 size-6 shrink-0 rounded-full bg-muted" />
            <div>
              <p className="font-medium">Inactive repositories</p>
              <p className="text-sm text-muted-foreground">
                8 repositories have had no commits in the last 6 months.
                Consider archiving older projects.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:flex-col md:items-end">
            <Badge variant="secondary">MAINTENANCE</Badge>
            <span className="text-muted-foreground">1d ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationFeed
