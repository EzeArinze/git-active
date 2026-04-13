"use client"

import { useState } from "react"
import ImportRepoCard from "./import-repo-card"
import { getUserReposType } from "@/modules/github/actions/get-user-repos"

// Static GitHub repo data (no 'checked' field)
// const reposFromGitHub = [
//   {
//     name: "nebula-core-engine",
//     visibility: "PUBLIC",
//     lastCommit: "Last commit: 2 hours ago",
//     lang: "TypeScript",
//     size: "1.2MB",
//   },
//   {
//     name: "sahara-ui-framework",
//     visibility: "PRIVATE",
//     lastCommit: "Last commit: Yesterday",
//     lang: "JavaScript",
//     size: "456KB",
//   },
//   {
//     name: "legacy-data-migrations",
//     visibility: "PRIVATE",
//     lastCommit: "Last commit: 3 days ago",
//     lang: "Python",
//     size: "8.4MB",
//   },
//   {
//     name: "documentation-portal",
//     visibility: "PUBLIC",
//     lastCommit: "Last commit: 1 week ago",
//     lang: "Markdown",
//     size: "124KB",
//   },
//   {
//     name: "mobile-app-flutter",
//     visibility: "PRIVATE",
//     lastCommit: "Last commit: 2 weeks ago",
//     lang: "Dart",
//     size: "15.2MB",
//   },
// ]

function ImportRepoSection({ repos }: { repos: getUserReposType }) {
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set())

  const toggleRepo = (name: string) => {
    setSelectedNames((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }
      return newSet
    })
  }

  const selectAll = () => {
    if (selectedNames.size === repos.length) {
      setSelectedNames(new Set())
    } else {
      setSelectedNames(new Set(repos.map((repo) => repo.name)))
    }
  }

  const selectedCount = selectedNames.size

  return (
    <div className="rounded-xl border bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          📁 GITHUB REPOSITORIES
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            {repos.length} repositories found
          </span>
          <button onClick={selectAll} className="text-orange-500">
            {selectedCount === repos.length ? "Deselect All" : "Select All"}
          </button>
        </div>
      </div>

      <div className="divide-y">
        {repos.map((repo) => (
          <ImportRepoCard
            key={repo.name}
            repo={repo}
            isSelected={selectedNames.has(repo.name)} // always boolean
            onToggle={() => toggleRepo(repo.name)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t bg-accent-foreground/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          You can change these selections later in your settings.
        </p>
        <div className="flex gap-3">
          <button className="rounded-md border px-4 py-2 text-sm">
            Cancel
          </button>
          <button className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white">
            Import Selected ({selectedCount}) Repositories
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportRepoSection
