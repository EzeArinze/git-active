import { getImportedRepos } from "@/modules/data/get-imported-repos"
import PromoCard from "./promo-card"
import ReposCard from "./repos-card"

export default async function Repos() {
  const repositories = await getImportedRepos()

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {repositories.map((repo) => (
        <ReposCard key={repo.id} repo={repo} />
      ))}

      <PromoCard />
    </div>
  )
}
