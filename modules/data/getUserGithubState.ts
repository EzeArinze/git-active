"use server"

import { db } from "@/lib/server/db"
import { eq } from "drizzle-orm"
import { githubInstallations, repositories } from "@/lib/server/db/schema"

const LIMIT = 1

export async function getUserGithubState(userId: string) {
  try {
    const [installationRecord, repos] = await Promise.all([
      db.query.githubInstallations.findFirst({
        where: eq(githubInstallations.userId, userId),
        columns: {
          installationId: true,
          accountLogin: true,
        },
      }),

      db.query.repositories.findMany({
        where: eq(repositories.userId, userId),
        columns: { id: true },
        limit: LIMIT,
      }),
    ])

    return {
      hasInstallation: !!installationRecord,
      hasRepos: repos.length > 0,
      installationRecord,
    }
  } catch (error) {
    console.error("GitHub state check failed:", error)
    throw error
  }
}
