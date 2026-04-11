import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import React from "react"

interface iAppProps {
  icon: LucideIcon
  title: string
  desc: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

function SettingsFrequencyCard({
  icon: Icon,
  title,
  desc,
  active,
  disabled,
  onClick,
}: iAppProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-2xl text-left transition",
        active ? "border-2 border-orange-500" : "border border-transparent",
        disabled && "cursor-not-allowed opacity-50",
        "hover:border-orange-300"
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
    </button>
  )
}

export default SettingsFrequencyCard
