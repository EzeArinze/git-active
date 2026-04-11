import { Download, Plus } from "lucide-react"

function DashboardHeader() {
  return (
    <div className="flex flex-row justify-between gap-4 sm:flex-row sm:items-center">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">
          {"Today's Intelligence"}
        </h1>
        <p className="hidden text-sm text-muted-foreground sm:block">
          Synthesis of your repository network activity.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Export */}
        <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <Download size={16} />
          <span className="hidden sm:inline">Export Report</span>
        </button>

        {/* Analyze */}
        <button className="flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm text-white">
          <Plus size={16} />
          <span className="hidden sm:inline">Analyze New Repo</span>
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader
