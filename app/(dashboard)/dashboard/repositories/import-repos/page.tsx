import ImportRepoHeader from "./_components/import-repo-header"
import ImportRepoSection from "./_components/import-repo-section"
import InformationComponent from "./_components/information"
import ImportRepoFooter from "./_components/import-repo-footer"
import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import { getUserRepos } from "@/modules/github/actions/get-user-repos"

type SearchParams = {
  searchParams: Promise<{
    import_search?: string
  }>
}

async function ImportReposRoute({ searchParams }: SearchParams) {
  const import_search = (await searchParams).import_search ?? ""

  const session = await requireAuth()
  const { repos } = await getUserRepos(session.user.id, import_search)

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ImportRepoHeader />
      <ImportRepoSection repos={repos} />
      <InformationComponent />
      <ImportRepoFooter />
    </div>
  )
}

export default ImportReposRoute
