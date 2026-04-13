"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface iAppProps {
  repo: {
    name: string
    visibility: string
    lastCommit: string
    lang: string
    size: string
  }
  isSelected: boolean
  onToggle: () => void
}

function ImportRepoCard({ repo, isSelected, onToggle }: iAppProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isSelected} // always a boolean, no undefined
          onCheckedChange={onToggle}
          className="h-4 w-4 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
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
      <div className="hidden gap-4 text-sm text-muted-foreground sm:flex">
        <span>{repo.lang}</span>
        <span>•</span>
        <span>{repo.size}</span>
      </div>
    </div>
  )
}

export default ImportRepoCard
