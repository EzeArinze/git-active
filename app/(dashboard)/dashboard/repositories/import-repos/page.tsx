import { Shield, Sparkles, GitBranch } from "lucide-react"

const importRepos = [
  {
    name: "nebula-core-engine",
    visibility: "PUBLIC",
    lastCommit: "Last commit: 2 hours ago",
    lang: "TypeScript",
    size: "1.2MB",
    checked: true,
  },
  {
    name: "sahara-ui-framework",
    visibility: "PRIVATE",
    lastCommit: "Last commit: Yesterday",
    lang: "JavaScript",
    size: "456KB",
    checked: true,
  },
  {
    name: "legacy-data-migrations",
    visibility: "PRIVATE",
    lastCommit: "Last commit: 3 days ago",
    lang: "Python",
    size: "8.4MB",
    checked: false,
  },
  {
    name: "documentation-portal",
    visibility: "PUBLIC",
    lastCommit: "Last commit: 1 week ago",
    lang: "Markdown",
    size: "124KB",
    checked: true,
  },
  {
    name: "mobile-app-flutter",
    visibility: "PRIVATE",
    lastCommit: "Last commit: 2 weeks ago",
    lang: "Dart",
    size: "15.2MB",
    checked: false,
  },
]

function ImportReposRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {/* Heading */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Connect Your Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Select the repositories you&apos;d like Git to monitor for
          intelligence. We&apos;ll analyze your commit history and patterns to
          provide actionable insights.
        </p>
      </div>

      {/* Repo Card */}
      <div className="rounded-xl border bg-background">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            📁 GITHUB REPOSITORIES
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">8 repositories found</span>
            <button className="text-orange-500">Select All</button>
          </div>
        </div>

        {/* Repo List */}
        <div className="divide-y">
          {importRepos.map((repo, i) => (
            <div key={i} className="flex items-center justify-between p-4">
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
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t bg-accent-foreground/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            You can change these selections later in your settings.
          </p>

          <div className="flex gap-3">
            <button className="rounded-md border px-4 py-2 text-sm">
              Cancel
            </button>
            <button className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white">
              Import Selected Repositories
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="space-y-2">
          <Shield className="text-orange-500" />
          <h3 className="font-medium">Secure Access</h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            Git uses read-only access to analyze code patterns without modifying
            your sources.
          </p>
        </div>

        <div className="space-y-2">
          <Sparkles className="text-orange-500" />
          <h3 className="font-medium">Auto-Discovery</h3>
          <p className="text-sm text-muted-foreground">
            Newly created repositories can be automatically imported based on
            your naming conventions.
          </p>
        </div>

        <div className="space-y-2">
          <GitBranch className="text-orange-500" />
          <h3 className="font-medium">Smart Mapping</h3>
          <p className="text-sm text-muted-foreground">
            Repositories are automatically grouped by language and team for
            better navigation.
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground">
        Git Active © 2024 • BUILT FOR CLARITY
      </div>
    </div>
  )
}

export default ImportReposRoute
