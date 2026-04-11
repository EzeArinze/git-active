"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Inbox } from "lucide-react"
import { IconChartSankey, IconEdit, IconSparkles } from "@tabler/icons-react"

export default function NotificationPageRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Intelligence Alerts</h1>
          <p className="mt-2 text-muted-foreground">
            Stay informed on critical repository states, peer reviews, and
            performance anomalies across your workspace.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex rounded-md border p-1 text-sm">
          <button className="rounded bg-muted px-3 py-1">Real-time</button>
          <button className="px-3 py-1 text-muted-foreground">
            Daily Digest
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-md bg-muted p-2">
              <Bell size={16} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">OPEN PRS</p>
              <h2 className="text-xl font-semibold">12</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-md bg-red-100 p-2">
              <AlertTriangle size={16} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ACTIVE ANOMALIES</p>
              <h2 className="text-xl font-semibold">3</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-md bg-muted p-2">
              <Inbox size={16} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">INACTIVE HUBS</p>
              <h2 className="text-xl font-semibold">8</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Feed Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Critical Feed</h2>
        <button className="text-sm text-orange-500">Mark all as read</button>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {/* PR Alert */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <IconEdit className="size-5 rounded-full" />

              <div>
                <p className="font-medium">PRs needing review</p>
                <p className="text-sm text-muted-foreground">
                  There are <b>4 pull requests</b> in the “Core-Engine”
                  repository waiting for your review. Oldest was opened 3 days
                  ago.
                </p>

                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="bg-orange-500">
                    Review Now
                  </Button>
                  <Button size="sm" variant="secondary">
                    Snooze
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Badge className="bg-orange-100 text-orange-600">
                ACTION REQUIRED
              </Badge>
              <span className="text-muted-foreground">2h ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Spike */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <IconChartSankey className="size-5 rounded-full" />

              <div>
                <p className="font-medium">Unusual activity spikes</p>
                <p className="text-sm text-muted-foreground">
                  Detected a{" "}
                  <span className="font-medium text-red-600">
                    300% increase
                  </span>{" "}
                  in API calls from unverified endpoints.
                </p>

                {/* Fake chart */}
                <div className="mt-3 h-12 w-full rounded-md bg-linear-to-r from-red-200 to-red-400" />
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Badge variant="destructive">SECURITY ALERT</Badge>
              <span className="text-muted-foreground">5h ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Inactive */}
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="rounded-full bg-muted p-3">🗂</div>

              <div>
                <p className="font-medium">Inactive repositories</p>
                <p className="text-sm text-muted-foreground">
                  8 repositories have had no commits in the last 6 months.
                  Consider archiving older projects.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Badge variant="secondary">MAINTENANCE</Badge>
              <span className="text-muted-foreground">1d ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Insight Box */}
      <div className="flex flex-col items-center rounded-xl border border-dashed p-10 text-center">
        <IconSparkles className="mb-4 size-8" />

        <h3 className="text-lg font-semibold">Refining your Intelligence</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our model is analyzing your recent interactions to prioritize alerts
          that matter most to your workflow.
        </p>

        <Button className="mt-4" variant="outline">
          Configure AI Filters
        </Button>
      </div>
    </div>
  )
}
