import { Button } from "@/components/ui/button"
import { Database } from "lucide-react"
import Link from "next/link"

export default function EmptyRepo() {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center gap-6 rounded-xl border bg-card/80 p-8 text-center backdrop-blur">
      <div className="grid size-14 place-items-center rounded-full bg-primary/20">
        <Database className="size-7 text-primary" />
      </div>

      <h3 className="text-xl font-semibold text-foreground">Empty Library</h3>
      <p className="text-muted-foreground">
        You haven&apos;t imported any repositories yet.
      </p>
      <p className="text-muted-foreground">
        Import repositories from GitHub to track your coding activity and get AI
        insights.
      </p>
      <Button className="w-fit">
        <Link href="/dashboard/repositories/import-repos">
          Import Repositories
        </Link>
      </Button>
    </div>
  )
}
