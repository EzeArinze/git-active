"use server"

import { db } from "@/lib/server/db"
import { repositories, githubInstallations } from "@/lib/server/db/schema"
import { getServerSession } from "@/lib/server/auth-guard/session"
import { eq } from "drizzle-orm"
import { githubApp } from "../github-app-instance"
import { backfillJob } from "@/modules/trigger/back-fill-repos"
import { batch } from "@trigger.dev/sdk"
import { revalidatePathTask } from "@/modules/trigger/revalidate-task"

type ReturnType = {
  success: boolean
  importedCount: number
  error?: string
}

export async function importRepos(repoIds: number[]): Promise<ReturnType> {
  if (!repoIds || repoIds.length === 0) {
    throw new Error("No repositories selected")
  }

  if (repoIds.length > 2) {
    throw new Error(
      "You can only import two at a time for now. Please select 2 or fewer repositories."
    )
  }

  const session = await getServerSession()

  const userId = session?.user?.id

  if (!userId) {
    throw new Error("Unauthorized")
  }

  // 1. Get installation for user
  const installation = await db.query.githubInstallations.findFirst({
    where: eq(githubInstallations.userId, userId),
    columns: {
      id: true,
      installationId: true,
    },
  })

  if (!installation) {
    throw new Error("GitHub not connected")
  }

  const installationId = installation.installationId

  const octokit = await githubApp.getInstallationOctokit(installationId)

  const repos = await octokit.paginate(
    octokit.rest.apps.listReposAccessibleToInstallation,
    { per_page: 100 }
  )

  const repoIdSet = new Set(repoIds)

  const selectedRepos = repos.filter((repo) => repoIdSet.has(repo.id))

  if (selectedRepos.length === 0) {
    throw new Error("No valid repositories found")
  }

  // 5. Prepare DB insert
  const values = selectedRepos.map((repo) => ({
    userId: userId,
    installationId,
    githubRepoId: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    private: repo.private,
    url: repo.html_url,
    defaultBranch: repo.default_branch ?? "main",
  }))

  // 6. Insert (idempotent)
  const result = await db
    .insert(repositories)
    .values(values)
    .onConflictDoNothing()
    .returning()

  if (result.length === 0) {
    throw new Error("No repositories imported")
  }

  const reposForBackfill = result.map((repo) => ({
    owner: repo.owner,
    name: repo.name,
    githubRepoId: repo.githubRepoId,
  }))

  await batch.triggerByTask([
    {
      task: backfillJob,
      payload: {
        installationId,
        userId,
        repos: reposForBackfill,
      },
    },
    { task: revalidatePathTask, payload: { path: "/dashboard", type: "page" } },
  ])

  return {
    success: true,
    importedCount: result.length,
  }
}
