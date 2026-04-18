"use server"

import { db } from "@/lib/server/db"
import { githubApp } from "../github-app-instance"
import { activities } from "@/lib/server/db/schema"

type RepoInput = {
  owner: string
  name: string
  githubRepoId: number
}

export async function backfillRepos(
  installationId: number,
  repos: RepoInput[]
) {
  if (!repos || repos.length === 0) return

  const octokit = await githubApp.getInstallationOctokit(installationId)

  await Promise.all(
    repos.map(async (repo) => {
      try {
        // 🔥 COMMITS
        const commitsRes = await octokit.rest.repos.listCommits({
          owner: repo.owner,
          repo: repo.name,
          per_page: 5,
        })

        const commitActivities = commitsRes.data.map((commit) => ({
          githubRepoId: repo.githubRepoId,
          externalId: commit.sha,
          type: "push",
          actor:
            commit.author?.login || commit.commit.author?.name || "unknown",
          message: commit.commit.message,
          url: commit.html_url,
        }))

        // 🔥 PRs
        const prsRes = await octokit.rest.pulls.list({
          owner: repo.owner,
          repo: repo.name,
          per_page: 5,
          state: "all",
        })

        const prActivities = prsRes.data.map((pr) => ({
          githubRepoId: repo.githubRepoId,
          externalId: String(pr.id),
          type: "pull_request",
          actor: pr.user?.login || "unknown",
          message: `PR: ${pr.title}`,
          url: pr.html_url,
        }))

        // 🔥 Issues
        const issuesRes = await octokit.rest.issues.listForRepo({
          owner: repo.owner,
          repo: repo.name,
          per_page: 5,
          state: "all",
        })

        const issueActivities = issuesRes.data
          .filter((i) => !i.pull_request) // exclude PRs
          .map((issue) => ({
            githubRepoId: repo.githubRepoId,
            externalId: String(issue.id),
            type: "issue",
            actor: issue.user?.login || "unknown",
            message: `Issue: ${issue.title}`,
            url: issue.html_url,
          }))

        const allActivities = [
          ...commitActivities,
          ...prActivities,
          ...issueActivities,
        ]

        if (allActivities.length === 0) return

        await db.insert(activities).values(allActivities).onConflictDoNothing()
      } catch (error) {
        console.error(`Backfill failed for ${repo.owner}/${repo.name}`, error)
      }
    })
  )
}
