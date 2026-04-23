import ImportRepoHeader from "./_components/import-repo-header"
import ImportRepoSection from "./_components/import-repo-section"
import InformationComponent from "./_components/information"
import ImportRepoFooter from "./_components/import-repo-footer"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import { Suspense } from "react"
import { getUserRepos } from "@/modules/data/get-user-repos"

type SearchParams = {
  searchParams: Promise<{
    import_search?: string
  }>
}

async function ImportReposRoute({ searchParams }: SearchParams) {
  const session = await requireAuth()

  const import_search = (await searchParams).import_search ?? ""

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ImportRepoHeader />
      <Suspense fallback={<div>loading...</div>} key={import_search}>
        <RepoFetchSection search={import_search} sessionId={session.user.id} />
      </Suspense>
      <InformationComponent />
      <ImportRepoFooter />
    </div>
  )
}

async function RepoFetchSection({
  sessionId,
  search,
}: {
  sessionId: string
  search: string
}) {
  const { repos } = await getUserRepos(sessionId, search)

  return <ImportRepoSection repos={repos} />
}

export default ImportReposRoute
