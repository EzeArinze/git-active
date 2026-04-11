import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { LucideIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface iAppProps {
  icon: LucideIcon
  title: string
  desc: string
  checked: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

function SettingsNotificationItem({
  icon: Icon,
  title,
  desc,
  checked,
  onChange,
}: iAppProps) {
  return (
    <Card className="rounded-xl border-none shadow-sm">
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
            <Icon className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onChange} />
      </CardContent>
    </Card>
  )
}

export default SettingsNotificationItem
