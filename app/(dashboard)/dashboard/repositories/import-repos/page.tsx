import { requireAuth } from "@/lib/server/auth-guard/require-auth"
import ImportRepoHeader from "./_components/import-repo-header"
import ImportRepoSection from "./_components/import-repo-section"
import InformationComponent from "./_components/information"
import { getUserRepos } from "@/modules/github/actions/get-user-repos"

async function ImportReposRoute() {
  const query = "AI-leetCoach"

  const session = await requireAuth()
  const { repos } = await getUserRepos(session.user.id, query)

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ImportRepoHeader />
      <ImportRepoSection repos={repos} />
      <InformationComponent />
      <div className="text-center text-xs text-muted-foreground">
        Git Active © 2024 • BUILT FOR CLARITY
      </div>
    </div>
  )
}

export default ImportReposRoute
