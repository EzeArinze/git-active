interface iAppProps {
  repo: {
    checked: boolean
    name: string
    visibility: string
    lastCommit: string
    lang: string
    size: string
  }
}

function ImportRepoCard({ repo }: iAppProps) {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          defaultChecked={repo.checked}
          className="h-4 w-4 accent-orange-500"
        />

        <div>
          <p className="font-medium">{repo.name}</p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                repo.visibility === "PUBLIC"
                  ? "bg-muted"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {repo.visibility}
            </span>

            <span>{repo.lastCommit}</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden gap-4 text-sm text-muted-foreground sm:flex">
        <span>{repo.lang}</span>
        <span>•</span>
        <span>{repo.size}</span>
      </div>
    </div>
  )
}

export default ImportRepoCard
