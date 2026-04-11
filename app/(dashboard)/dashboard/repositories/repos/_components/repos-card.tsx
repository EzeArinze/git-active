interface iAppProps {
  status: string
  name: string
  desc: string
  stats: string[]
  updated: string
}

function ReposCard({ repo }: { repo: iAppProps }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-background p-5">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-md bg-muted" />
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            repo.status === "ACTIVE"
              ? "bg-green-100 text-green-600"
              : repo.status === "AT RISK"
                ? "bg-red-100 text-red-600"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {repo.status}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium">{repo.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{repo.desc}</p>
      </div>

      <div className="mt-6 flex justify-between border-t pt-4 text-sm">
        {repo.stats.map((s, idx) => (
          <span key={idx} className="text-muted-foreground">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{repo.updated}</span>
        <span>→</span>
      </div>
    </div>
  )
}

export default ReposCard
