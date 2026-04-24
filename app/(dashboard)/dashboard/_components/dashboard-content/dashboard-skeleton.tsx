import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <>
      {/* Activities Preview Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Golden Synthesis Skeleton */}
        <div className="rounded-xl border bg-background p-6 md:col-span-2">
          <Skeleton className="mb-4 h-5 w-40" />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border p-4">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Activities Skeleton */}
      <div className="mt-2 flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-9 w-[180px]" />
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border">
            <div className="flex items-center justify-between border-b p-4">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div className="space-y-4 p-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-full max-w-[500px]" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
