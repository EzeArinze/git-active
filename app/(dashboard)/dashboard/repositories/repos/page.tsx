import { Suspense } from "react"
import ReposPageHeader from "./_components/repos-page-header"
import ReposCard from "./_components/repos-card"
import PromoCard from "./_components/promo-card"
import { getImportedRepos } from "@/modules/data/get-imported-repos"
import EmptyRepo from "./_components/empty-repo"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import ReposSkeleton from "./_components/repos-skeleton"

function ReposPageRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ReposPageHeader />
      <div className="flex flex-col gap-6">
        <Suspense fallback={<ReposSkeleton />}>
          <Repos />
        </Suspense>
        <PromoCard />
      </div>
      <div className="flex flex-col gap-3 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span>● System Status: Optimal</span>
          {/* <span>14.2 GB Used</span> */}
        </div>

        <div className="flex gap-4">
          <span>DOCUMENTATION</span>
          <span>API KEYS</span>
          <span>SUPPORT</span>
        </div>
      </div>
    </div>
  )
}

async function Repos() {
  const session = await requireAuth()
  const repositories = await getImportedRepos({ userId: session.user.id })

  return (
    <>
      {repositories.length === 0 && <EmptyRepo />}
      {repositories.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {repositories.map((repo) => (
            <ReposCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </>
  )
}

export default ReposPageRoute
