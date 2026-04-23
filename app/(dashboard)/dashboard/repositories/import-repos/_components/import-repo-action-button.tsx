"use client"

import { importRepos } from "@/modules/github/actions/import-repos"
import { tryCatch } from "@/utils/try-catch"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

function ImportRepoActionButton({
  selectedCount,
  selectedIds,
}: {
  selectedCount: number
  selectedIds: Set<number>
}) {
  const router = useRouter()
  const [isImporting, startTransition] = useTransition()

  const handleImport = async () => {
    if (selectedCount === 0) return

    startTransition(async () => {
      const { data, error } = await tryCatch(
        importRepos(Array.from(selectedIds))
      )
      if (data?.success) {
        router.push("/dashboard")
      }
      if (error) {
        console.error(error.message)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 border-t bg-accent-foreground/5 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        You can change these selections later in your settings.
      </p>
      <div className="flex gap-3">
        {/* <button className="rounded-md border px-4 py-2 text-sm">Cancel</button> */}
        <button
          disabled={isImporting}
          onClick={handleImport}
          className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white"
        >
          {isImporting
            ? "Importing..."
            : `Import Selected (${selectedCount}) Repositories`}
        </button>
      </div>
    </div>
  )
}

export default ImportRepoActionButton
