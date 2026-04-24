"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncer } from "@tanstack/react-pacer"
import { Loader2, Search } from "lucide-react"

export default function ImportRepoSearchBar() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState(searchParams.get("import_search") || "")

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
    (state) => ({
      isPending: state.isPending,
    })
  )

  return (
    <div className="border-b p-1">
      <div className="relative flex items-center">
        {debouncedFn.state.isPending ? (
          <Loader2 className="absolute left-3 h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        )}

        <input
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
    </div>
  )
}
