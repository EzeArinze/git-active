import ImportRepoCard from "./import-repo-card"

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

function ImportRepoSection() {
  return (
    <div className="rounded-xl border bg-background">
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
          <ImportRepoCard key={i} repo={repo} />
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
  )
}

export default ImportRepoSection
