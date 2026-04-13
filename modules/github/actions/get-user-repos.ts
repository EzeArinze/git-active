import { formatLastCommit } from "@/utils/format-last-commit"
import { getOctokitForUser } from "../github"
import { formatSize } from "@/utils/format-repo-size"

export async function getUserRepos(userId: string) {
  const octokit = await getOctokitForUser({ userId })

  const repos = await octokit.paginate(
    octokit.rest.repos.listForAuthenticatedUser,
    {
      per_page: 6,
      page: 1,
      sort: "updated",
      visibility: "all",
    }
  )

  return repos.map((repo) => ({
    name: repo.name,
    full_name: repo.full_name,
    visibility: repo.private ? "PRIVATE" : "PUBLIC",
    lastCommit: formatLastCommit(repo.pushed_at),
    lang: repo.language || "Unknown",
    size: formatSize(repo.size),
  }))
}

export type getUserReposType = Awaited<ReturnType<typeof getUserRepos>>
