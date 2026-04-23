import { importedRepotype } from "@/modules/data/get-imported-repos"

interface Props {
  repo: importedRepotype
}

function ReposCard({ repo }: Props) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-background p-5">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-md bg-muted" />

        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          Repo
        </span>
      </div>

      {/* Name */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">{repo.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{repo.fullName}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Updated: {new Date(repo.updatedAt).toLocaleString()}</span>

        <a href={repo.url} target="_blank" className="hover:text-white">
          →
        </a>
      </div>
    </div>
  )
}

export default ReposCard
