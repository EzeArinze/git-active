import { Skeleton } from "@/components/ui/skeleton"

function ReposSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col justify-between rounded-xl border bg-background p-5"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>

          {/* Name */}
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReposSkeleton
