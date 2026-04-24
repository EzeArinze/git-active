"use client"

import { Activity, useState } from "react"
import ImportRepoCard from "./import-repo-card"
import { getUserReposType } from "@/modules/data/get-user-repos"
import ImportRepoActionButton from "./import-repo-action-button"

function ImportRepoSection({ repos }: getUserReposType) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

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

  const selectedCount = selectedIds.size

  return (
    <>
      <div className="flex items-center justify-end border-b p-4">
        <button
          onClick={selectAll}
          className="cursor-pointer text-sm text-orange-500"
        >
          {selectedCount === repos.length ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div>
        <Activity mode={repos?.length === 0 ? "visible" : "hidden"}>
          <p className="mt-2 pt-3 pb-5 text-center text-xs text-muted-foreground">
            No repositories found
          </p>
        </Activity>
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
    </>
  )
}

export default ImportRepoSection
