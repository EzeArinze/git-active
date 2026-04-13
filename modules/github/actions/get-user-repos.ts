// import { formatLastCommit } from "@/utils/format-last-commit"
// import { getOctokitForUser } from "../github"
// import { formatSize } from "@/utils/format-repo-size"

// export async function getUserRepos(userId: string) {
//   const octokit = await getOctokitForUser({ userId })

//   const repos = await octokit.paginate(
//     octokit.rest.repos.listForAuthenticatedUser,
//     {
//       per_page: 6,
//       page: 1,
//       sort: "updated",
//       visibility: "all",
//     }
//   )

//   return repos.map((repo) => ({
//     name: repo.name,
//     full_name: repo.full_name,
//     visibility: repo.private ? "PRIVATE" : "PUBLIC",
//     lastCommit: formatLastCommit(repo.pushed_at),
//     lang: repo.language || "Unknown",
//     size: formatSize(repo.size),
//   }))
// }

// export type getUserReposType = Awaited<ReturnType<typeof getUserRepos>>

// modules/github/actions/get-user-repos.ts
import { formatLastCommit } from "@/utils/format-last-commit"
import { getOctokitForUser } from "../github"
import { formatSize } from "@/utils/format-repo-size"

function mapRepo(repo: any) {
  return {
    name: String(repo.name),
    full_name: String(repo.full_name),
    visibility: repo.private ? "PRIVATE" : "PUBLIC",
    lastCommit: String(formatLastCommit(repo.pushed_at) ?? ""), // force string
    lang: String(repo.language || "Unknown"),
    size: String(formatSize(repo.size) ?? ""), // force string
  }
}

export async function getUserRepos(userId: string) {
  const octokit = await getOctokitForUser({ userId })
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated()

  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 10,
    page: 1,
    sort: "updated",
    visibility: "all",
  })

  return {
    repos: repos.data.map(mapRepo),
    username: login,
  }
}

export async function searchUserRepos(userId: string, query: string) {
  const octokit = await getOctokitForUser({ userId })
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated()

  const { data } = await octokit.rest.search.repos({
    q: `${query} user:${login} fork:true`, // fork:true includes forks
    per_page: 10,
    sort: "updated",
  })

  return data.items.map(mapRepo)
}

export type RepoItem = ReturnType<typeof mapRepo>
export type getUserReposType = RepoItem[]
