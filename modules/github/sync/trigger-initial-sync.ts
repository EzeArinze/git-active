"use server"

import { db } from "@/lib/server/db"
import { githubApp } from "../github-app-instance"
import { activities } from "@/lib/server/db/schema"
import pLimit from "p-limit"

const limit = pLimit(3)

export async function backfillRepos(
  installationId: number,
  userId: string,
  repos: {
    owner: string
    name: string
    githubRepoId: number
  }[]
) {
  const octokit = await githubApp.getInstallationOctokit(installationId)

  const tasks = repos.map((repo) =>
    limit(async () => {
      try {
        // 🔥 Parallel fetch inside repo
        const [commits, prs, issues] = await Promise.all([
          octokit.rest.repos.listCommits({
            owner: repo.owner,
            repo: repo.name,
            per_page: 5,
          }),
          octokit.rest.pulls.list({
            owner: repo.owner,
            repo: repo.name,
            per_page: 5,
            state: "all",
          }),
          octokit.rest.issues.listForRepo({
            owner: repo.owner,
            repo: repo.name,
            per_page: 5,
            state: "all",
          }),
        ])

        const commitActivities = commits.data.map((commit) => ({
          githubRepoId: repo.githubRepoId,
          externalId: commit.sha,
          type: "push",
          actor: commit.commit.author?.name || "unknown",
          message: commit.commit.message,
          url: commit.html_url,
          eventCreatedAt: new Date(commit.commit.author?.date || ""),
        }))

        const prActivities = prs.data.map((pr) => ({
          githubRepoId: repo.githubRepoId,
          externalId: String(pr.id),
          type: "pull_request",
          actor: pr.user?.login || "unknown",
          message: `PR: ${pr.title}`,
          url: pr.html_url,
          eventCreatedAt: new Date(pr.created_at),
        }))

        const issueActivities = issues.data
          .filter((i) => !i.pull_request)
          .map((issue) => ({
            githubRepoId: repo.githubRepoId,
            externalId: String(issue.id),
            type: "issue",
            actor: issue.user?.login || "unknown",
            message: `Issue: ${issue.title}`,
            url: issue.html_url,
            eventCreatedAt: new Date(issue.created_at),
          }))

        const allActivities = [
          ...commitActivities,
          ...prActivities,
          ...issueActivities,
        ]

        if (allActivities.length > 0) {
          await db
            .insert(activities)
            .values(allActivities)
            .onConflictDoNothing()
        }

        // revalidatePath("/dashboard")
      } catch (error) {
        console.error(`Backfill failed for ${repo.name}`, error)
      }
    })
  )

  await Promise.all(tasks)
}
