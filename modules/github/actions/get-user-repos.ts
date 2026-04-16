"use server"

import { formatLastCommit } from "@/utils/format-last-commit"
import { getOctokitForUser } from "../github"
import { formatSize } from "@/utils/format-repo-size"

export async function getUserRepos(userId: string, query: string) {
  const octokit = await getOctokitForUser({ userId })
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated()

  if (query) {
    const { data } = await octokit.rest.search.repos({
      q: `${query} user:${login} fork:true`,
      per_page: 10,
      sort: "updated",
    })

    return {
      repos: data.items.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        owner: repo.owner?.name,
        visibility: repo.private ? "PRIVATE" : "PUBLIC",
        lastCommit: formatLastCommit(repo.pushed_at),
        lang: repo.language || "Unknown",
        size: formatSize(repo.size),
      })),
    }
  }

  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 10,
    page: 1,
    sort: "updated",
    visibility: "all",
  })

  return {
    repos: repos.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: repo.owner.name,
      visibility: repo.private ? "PRIVATE" : "PUBLIC",
      lastCommit: formatLastCommit(repo.pushed_at),
      lang: repo.language || "Unknown",
      size: formatSize(repo.size),
    })),
  }
}

export type RepoItem = Awaited<ReturnType<typeof getUserRepos>>
export type getUserReposType = RepoItem
