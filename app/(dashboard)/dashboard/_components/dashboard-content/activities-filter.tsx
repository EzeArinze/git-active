import { ChevronDown } from "lucide-react"

function ActivitiesFilter() {
  return (
    <div className="flex gap-4 text-sm text-muted-foreground">
      <button className="flex items-center gap-1">
        All Repositories <ChevronDown size={14} />
      </button>
      <button className="flex items-center gap-1">
        All Events <ChevronDown size={14} />
      </button>
      <button className="flex items-center gap-1">
        Last 24h <ChevronDown size={14} />
      </button>
    </div>
  )
}

export default ActivitiesFilter
