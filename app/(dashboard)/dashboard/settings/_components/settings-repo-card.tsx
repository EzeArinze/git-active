import { Card, CardContent } from "@/components/ui/card"
import { Folder } from "lucide-react"

function SettingsRepoCard({ name, time }: { name: string; time: string }) {
  return (
    <Card className="rounded-xl border-none shadow-none transition hover:opacity-90">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-200">
          <Folder className="h-5 w-5 text-orange-700" />
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SettingsRepoCard
