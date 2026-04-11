import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Bell, Inbox } from "lucide-react"

function NotificationStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
  )
}

export default NotificationStats
