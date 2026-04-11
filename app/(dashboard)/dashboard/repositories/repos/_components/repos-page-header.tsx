import { Plus } from "lucide-react"

function ReposPageHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-semibold">Your Repositories</h1>
        <p className="mt-2 text-muted-foreground">
          Curated intelligence and activity monitoring across your digital
          architecture.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Filters */}
        <div className="flex rounded-md border p-1 text-sm">
          <button className="rounded bg-muted px-3 py-1">All</button>
          <button className="px-3 py-1 text-muted-foreground">Active</button>
          <button className="px-3 py-1 text-muted-foreground">At Risk</button>
        </div>

        {/* CTA */}
        <button className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm text-white">
          <Plus size={16} />
          Import Repo
        </button>
      </div>
    </div>
  )
}

export default ReposPageHeader
