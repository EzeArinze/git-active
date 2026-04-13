"use client"

import { useState } from "react"
import ImportRepoCard from "./import-repo-card"
import { getUserReposType } from "@/modules/github/actions/get-user-repos"
import { Loader2, Search } from "lucide-react"

function ImportRepoSection({ repos }: getUserReposType) {
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState("")

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

  const isPending = false

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

      <div className="border-b p-3">
        <div className="relative flex items-center">
          {isPending ? (
            <Loader2 className="absolute left-3 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories..."
            className="w-full rounded-md border bg-transparent py-2 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        </div>
        {/*{query && !isPending && searchResults?.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            No repositories found for &quot;{query}&quot;
          </p>
        )}*/}
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
