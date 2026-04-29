import { logger, task } from "@trigger.dev/sdk"
import { backfillRepos } from "../github/sync/trigger-initial-sync"

export const backfillJob = task({
  id: "backfill-repos",
  retry: {
    maxAttempts: 3,
  },

  run: async (payload: {
    installationId: number
    userId: string
    repos: {
      owner: string
      name: string
      githubRepoId: number
    }[]
  }) => {
    await backfillRepos(payload.installationId, payload.userId, payload.repos)
    logger.info("Backfill completed", { repoCount: payload.repos.length })
  },
})
