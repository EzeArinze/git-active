import ImportRepoHeader from "./_components/import-repo-header"
import ImportRepoSection from "./_components/import-repo-section"
import InformationComponent from "./_components/information"
import ImportRepoFooter from "./_components/import-repo-footer"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import { Suspense } from "react"
import { getUserRepos } from "@/modules/data/get-user-repos"
import { requireAccessToken } from "@/lib/server/auth-guard/access-token"
import ImportRepoSearchBar from "./_components/import-search-components"

type SearchParams = {
  searchParams: Promise<{
    import_search?: string
  }>
}

async function ImportReposRoute({ searchParams }: SearchParams) {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ImportRepoHeader />
      <Suspense>
        <ImportRepoSearchBar />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <RepoFetchSection searchParams={searchParams} />
      </Suspense>
      <InformationComponent />
      <ImportRepoFooter />
    </div>
  )
}

async function RepoFetchSection({ searchParams }: SearchParams) {
  const session = await requireAuth()
  const search = (await searchParams).import_search ?? ""

  const accessToken = await requireAccessToken({ userId: session.user.id })
  const { repos } = await getUserRepos(session.user.id, search, accessToken)

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
        </div>
      </div>
      <ImportRepoSection repos={repos} />
    </div>
  )
}

export default ImportReposRoute
