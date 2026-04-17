"use client"

import { useState } from "react"
import ImportRepoCard from "./import-repo-card"
import { getUserReposType } from "@/modules/github/actions/get-user-repos"
import { Loader2, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncer } from "@tanstack/react-pacer"
import ImportRepoActionButton from "./import-repo-action-button"

function ImportRepoSection({ repos }: getUserReposType) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [query, setQuery] = useState(searchParams.get("import_search") || "")

  const toggleRepo = (id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectAll = () => {
    if (selectedIds.size === repos.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(repos.map((repo) => repo.id)))
    }
  }

  const debouncedFn = useDebouncer(
    (value: string) => {
      const params = new URLSearchParams(window.location.search)

      if (value) {
        params.set("import_search", value)
      } else {
        params.delete("import_search")
      }

      router.replace(`?${params.toString()}`)
    },
    { wait: 500 },
    (state) => {
      return {
        isPending: state.isPending,
      }
    }
  )

  const isPending = debouncedFn.state.isPending
  const selectedCount = selectedIds.size

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
            onChange={(e) => {
              const value = e.target.value
              setQuery(value)
              debouncedFn.maybeExecute(value)
            }}
            placeholder="Search repositories..."
            className="w-full rounded-md border bg-transparent py-2 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        </div>
        {query && !isPending && repos?.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            No repositories found for &quot;{query}&quot;
          </p>
        )}
      </div>

      <div className="divide-y">
        {repos.map((repo) => (
          <ImportRepoCard
            key={repo.id}
            repo={repo}
            isSelected={selectedIds.has(repo.id)}
            onToggle={() => toggleRepo(repo.id)}
          />
        ))}
      </div>

      <ImportRepoActionButton
        selectedCount={selectedCount}
        selectedIds={selectedIds}
      />
    </div>
  )
}

export default ImportRepoSection
