import { Plus } from "lucide-react"

function ReposPageRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {/* Header */}
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

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Card */}
        {[
          {
            name: "core-engine-v4",
            desc: "Main processing backbone for sahara-intel-services.",
            status: "ACTIVE",
            stats: ["142 COMMITS", "12 PRS", "4 ISSUES"],
            updated: "Updated 2h ago",
          },
          {
            name: "legacy-auth-module",
            desc: "Security framework for vintage user environments.",
            status: "AT RISK",
            stats: ["2 COMMITS", "0 PRS", "28 ISSUES"],
            updated: "Updated 14d ago",
          },
          {
            name: "docs-portal-static",
            desc: "Generated documentation for public API endpoints.",
            status: "INACTIVE",
            stats: ["0 COMMITS", "1 PRS", "0 ISSUES"],
            updated: "Updated 2mo ago",
          },
          {
            name: "infra-as-code-aws",
            desc: "Terraform modules for cloud orchestration.",
            status: "ACTIVE",
            stats: ["89 COMMITS", "5 PRS", "2 ISSUES"],
            updated: "Updated 10m ago",
          },
          {
            name: "ml-model-registry",
            desc: "Versioned AI models for Sahara inference engines.",
            status: "ACTIVE",
            stats: ["31 COMMITS", "3 PRS", "1 ISSUES"],
            updated: "Updated 1d ago",
          },
        ].map((repo, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border bg-background p-5"
          >
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

            {/* Content */}
            <div className="mt-4">
              <h3 className="text-lg font-medium">{repo.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{repo.desc}</p>
            </div>

            {/* Stats */}
            <div className="mt-6 flex justify-between border-t pt-4 text-sm">
              {repo.stats.map((s, idx) => (
                <span key={idx} className="text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{repo.updated}</span>
              <span>→</span>
            </div>
          </div>
        ))}

        {/* Promo Card */}
        <div className="col-span-1 rounded-xl border bg-muted p-6 md:col-span-2 xl:col-span-2">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="text-xs font-medium text-orange-500">
                SAHARA INSIGHT
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                Integrate AI Reviewer
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Let Sahara’s intelligence layer scan your code for architectural
                improvements and performance bottlenecks automatically.
              </p>

              <button className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white">
                Learn More
              </button>
            </div>

            {/* Image Placeholder */}
            <div className="h-40 w-40 rounded-lg bg-background shadow-sm" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span>● System Status: Optimal</span>
          <span>14.2 GB Used</span>
        </div>

        <div className="flex gap-4">
          <span>DOCUMENTATION</span>
          <span>API KEYS</span>
          <span>SUPPORT</span>
        </div>
      </div>
    </div>
  )
}

export default ReposPageRoute
