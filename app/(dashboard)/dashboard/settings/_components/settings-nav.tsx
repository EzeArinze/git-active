import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

interface iAppProps {
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

function SettingsNav({ active, setActive }: iAppProps) {
  const items = [
    { id: "repositories", label: "Repositories" },
    { id: "notifications", label: "Notifications" },
    { id: "digest", label: "Digest Frequency" },
    { id: "security", label: "Security" },
  ]

  return (
    <div className="w-56 space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={cn(
            "w-full rounded-lg px-3 py-2 text-left text-sm transition",
            active === item.id
              ? "font-medium text-orange-700"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SettingsNav
